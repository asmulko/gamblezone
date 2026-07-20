type TurnstileVerificationResponse = {
  success: boolean;
  hostname?: string;
  action?: string;
  challenge_ts?: string;
  'error-codes'?: string[];
};

export function getClientIpFromHeaders(headers: Headers): string | null {
  const forwardedFor = headers.get('x-forwarded-for');

  return (
    forwardedFor?.split(',')[0]?.trim() ??
    headers.get('x-real-ip') ??
    null
  );
}

export async function verifyTurnstile(
  token: string,
  ipAddress: string | null,
): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error('Missing TURNSTILE_SECRET_KEY.');
    return false;
  }

  const formData = new FormData();

  formData.append('secret', secretKey);
  formData.append('response', token);

  if (ipAddress) {
    formData.append('remoteip', ipAddress);
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: formData,
        cache: 'no-store',
        signal: AbortSignal.timeout(5_000),
      },
    );

    if (!response.ok) {
      console.error('Turnstile verification request failed', {
        status: response.status,
      });

      return false;
    }

    const result = (await response.json()) as TurnstileVerificationResponse;

    if (!result.success) {
      console.warn('Turnstile verification failed', {
        errorCodes: result['error-codes'],
      });

      return false;
    }

    if (
      process.env.NODE_ENV === 'production' &&
      result.hostname !== 'gamblezone.vip' &&
      result.hostname !== 'www.gamblezone.vip'
    ) {
      console.warn('Unexpected Turnstile hostname', {
        hostname: result.hostname,
      });

      return false;
    }

    return true;
  } catch (error) {
    console.error('Turnstile verification error', error);
    return false;
  }
}
