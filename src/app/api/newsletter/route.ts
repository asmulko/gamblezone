import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  getClientIpFromHeaders,
  verifyTurnstile,
} from "@/lib/turnstile";

export const runtime = "nodejs";

const resend = new Resend(
  process.env.RESEND_API_KEY,
);

const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscribeBody = {
  email?: unknown;
  language?: unknown;
  consent?: unknown;
  website?: unknown;
  turnstileToken?: unknown;
};

export async function POST(
  request: Request,
): Promise<NextResponse> {
  try {
    const contentType =
      request.headers.get("content-type");

    if (
      !contentType?.includes(
        "application/json",
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported request.",
        },
        { status: 415 },
      );
    }

    const body =
      (await request.json()) as SubscribeBody;

    // Honeypot field. Bots often fill every field.
    if (
      typeof body.website === "string" &&
      body.website.trim().length > 0
    ) {
      /*
       * Return fake success so the bot does not
       * learn that the honeypot detected it.
       */
      return NextResponse.json({
        success: true,
        status: "subscribed",
        message:
          "You have successfully joined the newsletter.",
      });
    }

    const email =
      typeof body.email === "string"
        ? body.email
            .trim()
            .toLowerCase()
        : "";

    const language =
      typeof body.language === "string"
        ? body.language
            .trim()
            .slice(0, 10)
        : "en";

    const turnstileToken =
      typeof body.turnstileToken ===
      "string"
        ? body.turnstileToken.trim()
        : "";

    if (
      !EMAIL_PATTERN.test(email) ||
      email.length > 254
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    if (body.consent !== true) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Newsletter consent is required.",
        },
        { status: 400 },
      );
    }

    if (!turnstileToken) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Security verification is required.",
        },
        { status: 400 },
      );
    }

    if (
      !process.env.TURNSTILE_SECRET_KEY
    ) {
      console.error(
        "Missing TURNSTILE_SECRET_KEY.",
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Security verification is unavailable.",
        },
        { status: 503 },
      );
    }

    //const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;

    if (!process.env.RESEND_API_KEY) {
      //|| !segmentId
      console.error(
        "Missing Resend environment variables.",
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Newsletter service is unavailable.",
        },
        { status: 503 },
      );
    }

    const ipAddress =
      getClientIpFromHeaders(
        request.headers,
      );

    /*
     * Turnstile tokens are single-use and
     * expire quickly. Always validate before
     * accessing or modifying Resend contacts.
     */
    const turnstileVerified =
      await verifyTurnstile(
        turnstileToken,
        ipAddress,
      );

    if (!turnstileVerified) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Security verification failed. Please refresh and try again.",
        },
        { status: 403 },
      );
    }

    const consentTimestamp =
      new Date().toISOString();

    /*
     * These values will be used when the
     * Resend custom properties section below
     * is enabled.
     */
    void language;
    void consentTimestamp;

    /*
     * Check Resend before creating the contact.
     *
     * This prevents duplicate contacts and lets
     * us handle previously unsubscribed contacts.
     */
    const {
      data: existingContact,
      error: contactLookupError,
    } = await resend.contacts.get({
      email,
    });

    if (existingContact) {
      if (
        existingContact.unsubscribed === true
      ) {
        /*
         * The person explicitly checked the
         * consent box again, so resubscribe them.
         */
        const {
          error: contactUpdateError,
        } = await resend.contacts.update({
          email,
          unsubscribed: false,

          /*
          properties: {
            language,
            consent_source:
              "gamblezone.vip newsletter form",
            consent_timestamp:
              consentTimestamp,
            consent_version:
              "newsletter-v1",
          },
          */
        });

        if (contactUpdateError) {
          console.error(
            "Resend contact resubscription failed",
            {
              name:
                contactUpdateError.name,
              message:
                contactUpdateError.message,
            },
          );

          return NextResponse.json(
            {
              success: false,
              error:
                "We could not complete your subscription.",
            },
            { status: 502 },
          );
        }

        /*
         * Add the contact to your newsletter
         * segment here later if needed.
         *
         * Resend also supports adding an existing
         * contact to a segment by email.
         */

        // if (segmentId) {
        //   const { error: segmentError } =
        //     await resend.contacts.segments.add({
        //       email,
        //       segmentId,
        //     });
        //
        //   if (segmentError) {
        //     console.error(
        //       "Failed to add existing contact to segment",
        //       segmentError,
        //     );
        //   }
        // }

        return NextResponse.json({
          success: true,
          status: "resubscribed",
          message:
            "Welcome back! You have successfully rejoined the newsletter.",
        });
      }

      /*
       * The contact already exists and is active.
       * Do not create it again or send anything.
       */
      return NextResponse.json({
        success: true,
        status: "already_subscribed",
        message:
          "You have successfully joined the newsletter.",
      });
    }

    /*
     * A not-found response is expected for a new
     * email. Any other lookup error means we cannot
     * safely determine whether the contact exists.
     */
    if (
      contactLookupError &&
      contactLookupError.name !==
        "not_found"
    ) {
      console.error(
        "Resend contact lookup failed",
        {
          name:
            contactLookupError.name,
          message:
            contactLookupError.message,
        },
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "We could not verify your subscription status.",
        },
        { status: 502 },
      );
    }

    const {
      data,
      error: contactCreationError,
    } = await resend.contacts.create({
      email,
      unsubscribed: false,

      //   segments: [
      //     {
      //       id: segmentId,
      //     },
      //   ],

      /*
        Important note about custom properties

        Create the property definitions in the Resend dashboard first if Resend requires them in your account:

        language
        consent_source
        consent_timestamp
        consent_version

        Use string values for all of them.
      */

      //   properties: {
      //     language,
      //     consent_source: "gamblezone.vip newsletter form",
      //     consent_timestamp: consentTimestamp,
      //     consent_version: "newsletter-v1",
      //   },
    });

    if (contactCreationError) {
      console.error(
        "Resend contact creation failed",
        {
          name:
            contactCreationError.name,
          message:
            contactCreationError.message,
        },
      );

      /*
       * There is a small possibility of a race:
       * two identical submissions could both pass
       * the lookup before one creates the contact.
       *
       * Re-check before showing an error.
       */
      const {
        data: contactAfterFailure,
      } = await resend.contacts.get({
        email,
      });

      if (contactAfterFailure) {
        return NextResponse.json({
          success: true,
          status:
            "already_subscribed",
          message:
            "This email is already subscribed to the newsletter.",
        });
      }

      /*
       * Use a generic public response.
       * Do not expose internal Resend errors.
       */
      return NextResponse.json(
        {
          success: false,
          error:
            "We could not complete your subscription.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      status: "subscribed",
      message:
        "You have successfully joined the newsletter.",
      contactId: data?.id,
    });
  } catch (error) {
    console.error(
      "Newsletter subscription failed",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Invalid subscription request.",
      },
      { status: 400 },
    );
  }
}
