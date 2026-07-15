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
  turnstileToken?: unknown;
};

type TurnstileVerificationResponse = {
  success: boolean;
  hostname?: string;
  action?: string;
  challenge_ts?: string;
  "error-codes"?: string[];
};

async function verifyTurnstile(
  token: string,
  ipAddress: string | null,
): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error("Missing TURNSTILE_SECRET_KEY.");
    return false;
  }

  const formData = new FormData();

  formData.append("secret", secretKey);
  formData.append("response", token);

  if (ipAddress) {
    formData.append("remoteip", ipAddress);
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
        cache: "no-store",
        signal: AbortSignal.timeout(5_000),
      },
    );

    if (!response.ok) {
      console.error("Turnstile verification request failed", {
        status: response.status,
      });

      return false;
    }

    const result = (await response.json()) as TurnstileVerificationResponse;

    if (!result.success) {
      console.warn("Turnstile verification failed", {
        errorCodes: result["error-codes"],
      });

      return false;
    }

    /*
     * The Cloudflare development test key may return a test hostname.
     * Only enforce the real hostname in production.
     */
    if (
      process.env.NODE_ENV === "production" &&
      result.hostname !== "gamblezone.vip" &&
      result.hostname !== "www.gamblezone.vip"
    ) {
      console.warn("Unexpected Turnstile hostname", {
        hostname: result.hostname,
      });

      return false;
    }

    return true;
  } catch (error) {
    console.error("Turnstile verification error", error);
    return false;
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const contentType = request.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported request.",
        },
        { status: 415 },
      );
    }

    const body = (await request.json()) as SubscribeBody;

    // Honeypot field. Bots often fill every field.
    if (typeof body.website === "string" && body.website.trim().length > 0) {
      /*
       * Return fake success so the bot does not learn
       * that the honeypot detected it.
       */
      return NextResponse.json({
        success: true,
        message: "You have successfully joined the newsletter.",
      });
    }

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    const language =
      typeof body.language === "string"
        ? body.language.trim().slice(0, 10)
        : "en";

    const turnstileToken =
      typeof body.turnstileToken === "string" ? body.turnstileToken.trim() : "";

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

    if (!turnstileToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Security verification is required.",
        },
        { status: 400 },
      );
    }

    if (!process.env.TURNSTILE_SECRET_KEY) {
      console.error("Missing TURNSTILE_SECRET_KEY.");

      return NextResponse.json(
        {
          success: false,
          error: "Security verification is unavailable.",
        },
        { status: 503 },
      );
    }

    //const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;

    if (!process.env.RESEND_API_KEY) {
      //|| !segmentId
      console.error("Missing Resend environment variables.");

      return NextResponse.json(
        {
          success: false,
          error: "Newsletter service is unavailable.",
        },
        { status: 503 },
      );
    }

    const forwardedFor = request.headers.get("x-forwarded-for");

    const ipAddress =
      forwardedFor?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      null;

    /*
     * Turnstile tokens are single-use and expire quickly.
     * Always verify the token before calling Resend.
     */
    const turnstileVerified = await verifyTurnstile(turnstileToken, ipAddress);

    if (!turnstileVerified) {
      return NextResponse.json(
        {
          success: false,
          error: "Security verification failed. Please refresh and try again.",
        },
        { status: 403 },
      );
    }

    const consentTimestamp = new Date().toISOString();

    /*
     * These values will be used when the Resend custom
     * properties section below is enabled.
     *
     * This prevents strict TypeScript/ESLint configurations
     * from reporting them as unused for now.
     */
    void language;
    void consentTimestamp;

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
