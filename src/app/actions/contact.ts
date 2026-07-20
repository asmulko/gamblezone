'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import {
  getClientIpFromHeaders,
  verifyTurnstile,
} from '@/lib/turnstile';

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email(),
  message: z.string().trim().min(10).max(5000),
  turnstileToken: z.string().trim().min(1),
});

export type ContactResult = {
  success: boolean;
  error?: string;
};

export async function sendContactEmail(
  formData: FormData,
): Promise<ContactResult> {
  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    turnstileToken: formData.get('turnstileToken'),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: 'Please fill in all required fields correctly.',
    };
  }

  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.error('[contact] Missing TURNSTILE_SECRET_KEY.');

    return {
      success: false,
      error: 'Security verification is unavailable.',
    };
  }

  const requestHeaders = await headers();
  const turnstileVerified = await verifyTurnstile(
    parsed.data.turnstileToken,
    getClientIpFromHeaders(requestHeaders),
  );

  if (!turnstileVerified) {
    return {
      success: false,
      error:
        'Security verification failed. Please refresh and try again.',
    };
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM ?? smtpUser;
  const contactEmail =
    process.env.CONTACT_EMAIL ?? 'info@gamblezone.vip';

  if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
    console.error('[contact] Required SMTP environment variables are missing.');

    return {
      success: false,
      error:
        'The email service is temporarily unavailable. Please email info@gamblezone.vip directly.',
    };
  }

  const { name, email, message } = parsed.data;
  const safeSubjectName = name.replace(/[\r\n]+/g, ' ').trim();

  try {
    const nodemailer = (await import('nodemailer')).default;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT ?? '587'),
      secure: process.env.SMTP_SECURE === 'true',
      requireTLS: process.env.SMTP_SECURE !== 'true',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"GambleZone Contact" <${smtpFrom}>`,
      to: contactEmail,
      replyTo: {
        name,
        address: email,
      },
      subject: `New contact message from ${safeSubjectName}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <hr>
        <p>${escapeHtml(message).replace(/\r?\n/g, '<br>')}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('[contact] Failed to send email:', error);

    return {
      success: false,
      error:
        'Failed to send your message. Please try again later.',
    };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
