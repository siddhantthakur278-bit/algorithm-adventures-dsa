import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendEmail } from './utils/emailService';

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
