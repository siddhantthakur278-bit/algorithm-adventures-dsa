import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const OTP_SECRET = process.env.OTP_SECRET || process.env.VITE_SUPABASE_ANON_KEY || 'ada-super-secret-key-2026';

function generateOtpToken(email: string, code: string, expiresAt: number): string {
  const data = `${email.trim().toLowerCase()}:${code.trim()}:${expiresAt}`;
  const hmac = crypto.createHmac('sha256', OTP_SECRET).update(data).digest('hex');
  return `${expiresAt}.${hmac}`;
}

// Supabase client for serverless functions
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// Lightweight robust email dispatcher
async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<{ success: boolean; provider: string; error?: string }> {
  // 1. Resend API via native fetch (zero dependencies)
  const resendApiKey = (process.env.RESEND_API_KEY || '').trim();
  if (resendApiKey) {
    try {
      const fromEmail = process.env.RESEND_FROM || 'Algorithm Adventures <onboarding@resend.dev>';
      const resp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [to],
          subject,
          html,
          text: text || subject,
        }),
      });
      if (resp.ok) {
        return { success: true, provider: 'resend' };
      }
    } catch (e: any) {
      console.warn('Resend direct fetch failed:', e.message);
    }
  }

  // 2. Gmail SMTP via nodemailer (if credentials exist in Vercel)
  const gmailUser = (process.env.GMAIL_USER || process.env.EMAIL_USER || '').trim();
  const gmailPass = (process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS || '').replace(/\s+/g, '').trim();
  if (gmailUser && gmailPass) {
    try {
      const nodemailer = (await import('nodemailer')).default;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: gmailUser, pass: gmailPass },
      });
      await transporter.sendMail({
        from: `"Algorithm Adventures" <${gmailUser}>`,
        to,
        subject,
        html,
        text: text || subject,
      });
      return { success: true, provider: 'gmail_smtp' };
    } catch (e: any) {
      console.error('Gmail SMTP failed:', e.message);
      return { success: false, provider: 'gmail_smtp_error', error: e.message };
    }
  }

  // 3. Fallback simulation mode
  console.log(`[Simulated Email to ${to}] Subject: ${subject}`);
  return { success: true, provider: 'simulated' };
}

// In-memory fallback OTP storage
const memoryOtpCache = new Map<string, { code: string; expiresAt: number }>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { email, handle, purpose = 'account verification' } = req.body || {};

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Please provide a valid Gmail / email address.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Generate secure 6-digit OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes validity

    // Store in memory cache
    memoryOtpCache.set(cleanEmail, { code: otpCode, expiresAt });

    // Store in Supabase if table exists
    if (supabase) {
      try {
        await supabase.from('email_otps').insert({
          email: cleanEmail,
          otp_code: otpCode,
          expires_at: new Date(expiresAt).toISOString(),
          verified: false,
        });
      } catch (err: any) {
        console.warn('Could not persist OTP in Supabase table (using memory cache):', err.message);
      }
    }

    // HTML Email Template
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #070913; color: #f1f5f9; padding: 24px; }
          .card { max-width: 520px; margin: 0 auto; background: #0f1527; border: 2px solid #f59e0b; border-radius: 20px; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { text-align: center; margin-bottom: 24px; }
          .badge { display: inline-block; background: #f59e0b; color: #000; font-weight: 900; font-size: 11px; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px; }
          .title { font-size: 24px; font-weight: 900; margin-top: 12px; color: #ffffff; letter-spacing: 0.5px; }
          .code-box { background: #070a14; border: 2px dashed #f59e0b; border-radius: 16px; padding: 20px; text-align: center; margin: 24px 0; }
          .code { font-family: monospace; font-size: 38px; font-weight: 900; color: #facc15; letter-spacing: 8px; }
          .text { font-size: 14px; color: #94a3b8; line-height: 1.6; }
          .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <span class="badge">Algorithm Adventures Security</span>
            <div class="title">Verify Your Universal Identity</div>
          </div>
          <p class="text">
            Hello <strong>${handle ? `@${handle}` : 'Adventurer'}</strong>,
          </p>
          <p class="text">
            Here is your one-time verification code to securely connect your <strong>GitHub, Codeforces & LeetCode</strong> accounts to Algorithm Adventures:
          </p>
          <div class="code-box">
            <div class="code">${otpCode}</div>
            <div style="font-size: 11px; color: #f59e0b; margin-top: 6px; font-weight: bold;">Valid for 10 minutes</div>
          </div>
          <p class="text">
            Never share this OTP with anyone. Once verified, you will receive your daily problem sets and morning & evening streak reminders.
          </p>
          <div class="footer">
            Algorithm Adventures DSA • Gamified Advanced Problem Solving • Sent to ${cleanEmail}
          </div>
        </div>
      </body>
      </html>
    `;

    const sendRes = await sendEmail({
      to: cleanEmail,
      subject: `⚡ Your 6-Digit DSA Code: ${otpCode}`,
      html,
      text: `Your Algorithm Adventures verification code is: ${otpCode}. It is valid for 10 minutes.`,
    });

    const otpToken = generateOtpToken(cleanEmail, otpCode, expiresAt);

    return res.status(200).json({
      success: true,
      message: `Verification code sent to ${cleanEmail}!`,
      provider: sendRes.provider,
      otpToken,
      debugOtp: sendRes.provider === 'simulated' ? otpCode : undefined,
    });
  } catch (err: any) {
    console.error('send-otp failed:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}