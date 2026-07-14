'use server';

import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().trim(),
  message: z.string().min(10).max(5000).trim(),
});

export type ContactResult = { success: boolean; error?: string };

export async function sendContactEmail(formData: FormData): Promise<ContactResult> {
  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return { success: false, error: 'Please fill in all required fields correctly.' };
  }

  const { name, email, message } = parsed.data;

  // Require SMTP to be configured before attempting send
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[contact] SMTP env vars not configured — email not sent.');
    return { success: false, error: 'Email service is not configured yet. Please reach out directly.' };
  }

  try {
    const nodemailer = (await import('nodemailer')).default;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"GambleZone Contact" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL ?? 'info@gamblezone.com',
      replyTo: email,
      subject: `New contact message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <hr/>
        <p>${esc(message).replace(/\n/g, '<br/>')}</p>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error('[contact] Failed to send email:', err);
    return { success: false, error: 'Failed to send your message. Please try again later.' };
  }
}

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
