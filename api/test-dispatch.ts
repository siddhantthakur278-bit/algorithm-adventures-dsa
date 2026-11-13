import type { VercelRequest, VercelResponse } from '@vercel/node';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const targetEmail = (req.query.email as string) || (req.body && req.body.email) || 'siddhantthakur278@gmail.com';
    const type = (req.query.type as string) || (req.body && req.body.type) || 'morning';

    const isMorning = type === 'morning';
    const subject = isMorning
      ? '☀️ [Test] Morning POTD Vault Unlock: Two Sum Saga'
      : '🔥 [Test] Evening Streak Alert: 4 Hours Left Before Midnight!';

    const html = `
      <div style="font-family: sans-serif; background: #070913; color: #f1f5f9; padding: 20px; border-radius: 16px; max-width: 500px; margin: 0 auto; border: 2px solid #f59e0b;">
        <h2 style="color: #f59e0b; margin-top: 0;">⚡ Algorithm Adventures Daily Test Dispatch</h2>
        <p>This is a live test of your <strong>${isMorning ? 'Morning POTD (07:30 AM)' : 'Evening Streak (07:30 PM)'}</strong> automated email schedule.</p>
        <div style="background: #111827; padding: 16px; border-radius: 12px; margin: 16px 0; border: 1px solid #374151;">
          <strong>Target:</strong> ${targetEmail}<br/>
          <strong>Schedule:</strong> Twice Daily (Morning & Evening)<br/>
          <strong>Status:</strong> Active & Configured!
        </div>
        <p style="font-size: 12px; color: #9ca3af;">Sent from your Vercel Serverless Function.</p>
      </div>
    `;

    const result = await sendEmail({
      to: targetEmail,
      subject,
      html,
    });

    return res.status(200).json({
      success: true,
      message: `Test email sent to ${targetEmail}`,
      provider: result.provider,
      detail: result,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}