import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscribeBody = {
  email?: unknown;
  language?: unknown;
  consent?: unknown;
  website?: unknown;
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as SubscribeBody;

    // Honeypot field. Bots often fill every field.
    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    const language =
      typeof body.language === "string"
        ? body.language.trim().slice(0, 10)
        : "en";

    if (!EMAIL_PATTERN.test(email) || email.length > 254) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    if (body.consent !== true) {
      return NextResponse.json(
        {
          success: false,
          error: "Newsletter consent is required.",
        },
        { status: 400 },
      );
    }

    //const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;

    if (!process.env.RESEND_API_KEY) { //|| !segmentId
      console.error("Missing Resend environment variables.");

      return NextResponse.json(
        {
          success: false,
          error: "Newsletter service is unavailable.",
        },
        { status: 503 },
      );
    }

    const consentTimestamp = new Date().toISOString();

    const { data, error } = await resend.contacts.create({
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

    if (error) {
      console.error("Resend contact creation failed", {
        name: error.name,
        message: error.message,
      });

      /*
       * Use a generic public response.
       * Do not expose internal Resend errors.
       */
      return NextResponse.json(
        {
          success: false,
          error: "We could not complete your subscription.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "You have successfully joined the newsletter.",
      contactId: data?.id,
    });
  } catch (error) {
    console.error("Newsletter subscription failed", error);

    return NextResponse.json(
      {
        success: false,
        error: "Invalid subscription request.",
      },
      { status: 400 },
    );
  }
}
