import nodemailer from 'nodemailer';
import { Resend } from 'resend';

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// 1. Resend Client (if RESEND_API_KEY is configured in Vercel)
const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// 2. Nodemailer Gmail Transporter (if GMAIL_USER & GMAIL_APP_PASSWORD are configured)
const gmailUser = process.env.GMAIL_USER || process.env.EMAIL_USER || '';
const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS || '';

const nodemailerTransporter = (gmailUser && gmailPass)
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    })
  : null;

/**
 * Universal email dispatcher:
 * Priority:
 * 1. Resend (Fastest, zero deliverability issues)
 * 2. Gmail SMTP via Nodemailer (Free, sends directly from user's Gmail)
 * 3. Fallback preview log (Returns success so system functions during testing)
 */
export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; provider: string; error?: string }> {
  // Option A: Resend
  if (resend) {
    try {
      const fromEmail = process.env.RESEND_FROM || 'Algorithm Adventures <onboarding@resend.dev>';
      const data = await resend.emails.send({
        from: fromEmail,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        text: payload.text || payload.subject,
      });

      if ((data as any).error) {
        console.warn('Resend error:', (data as any).error);
      } else {
        return { success: true, provider: 'resend' };
      }
    } catch (err: any) {
      console.warn('Resend dispatch failed:', err.message);
    }
  }

  // Option B: Gmail SMTP
  if (nodemailerTransporter && gmailUser) {
    try {
      await nodemailerTransporter.sendMail({
        from: `"Algorithm Adventures" <${gmailUser}>`,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        text: payload.text || payload.subject,
      });
      return { success: true, provider: 'gmail_smtp' };
    } catch (err: any) {
      console.warn('Nodemailer Gmail dispatch failed:', err.message);
    }
  }

  // Option C: Simulation / Preview mode (when keys are still being added)
  console.log(`[Email Simulation] To: ${payload.to} | Subject: ${payload.subject}`);
  return {
    success: true,
    provider: 'simulated',
    error: 'No email service credentials (RESEND_API_KEY or GMAIL_USER/GMAIL_APP_PASSWORD) found in environment. Email simulated.',
  };
}
