import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { sendEmail } from './utils/emailService';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    let recipients: Array<{ email: string; handle: string; streak: number; solved: number }> = [];

    if (supabase) {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('email, user_handle, current_streak, problems_solved')
          .not('email', 'is', null);

        if (data && data.length > 0) {
          recipients = data.map((d: any) => ({
            email: d.email,
            handle: d.user_handle,
            streak: d.current_streak || 1,
            solved: d.problems_solved || 0,
          }));
        }
      } catch (err: any) {
        console.warn('Could not load evening emails:', err.message);
      }
    }

    if (recipients.length === 0 && process.env.ADMIN_EMAIL) {
      recipients.push({ email: process.env.ADMIN_EMAIL, handle: 'Adventurer', streak: 1, solved: 0 });
    }

    const appUrl = 'https://algorithm-adventures-dsa.vercel.app';
    let sentCount = 0;

    for (const user of recipients) {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #070913; color: #f1f5f9; padding: 20px; }
            .card { max-width: 540px; margin: 0 auto; background: #0f1527; border: 2px solid #fb923c; border-radius: 20px; padding: 28px; }
            .badge { display: inline-block; background: #fb923c; color: #000; font-weight: 900; font-size: 11px; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; }
            .title { font-size: 22px; font-weight: 900; margin: 12px 0; color: #ffffff; }
            .deadline-card { background: #1a100d; border: 2px dashed #fb923c; border-radius: 16px; padding: 20px; margin: 20px 0; text-align: center; }
            .countdown { font-family: monospace; font-size: 32px; font-weight: 900; color: #fb923c; }
            .cta-btn { display: inline-block; background: #fb923c; color: #000; font-weight: 900; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 14px; text-transform: uppercase; margin-top: 16px; }
            .footer { margin-top: 24px; font-size: 11px; color: #64748b; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <span class="badge">🔥 Evening Streak Alert</span>
            <div class="title">Don't Lose Your Streak, @${user.handle}! ⏳</div>
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.6;">
              This is your evening checkpoint. The midnight deadline (23:59:59) is approaching! Finish your sequential homework quests to lock in today's flame streak.
            </p>

            <div class="deadline-card">
              <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: bold; margin-bottom: 4px;">
                Remaining Time Until Midnight
              </div>
              <div class="countdown">4h 30m Remaining</div>
              <div style="margin-top: 8px; font-size: 13px; color: #fb923c; font-weight: bold;">
                Active Flame Streak: ${user.streak} Days 🔥
              </div>
            </div>

            <div style="text-align: center;">
              <a href="${appUrl}" class="cta-btn">Complete Homework Before Midnight →</a>
            </div>

            <div class="footer">
              Algorithm Adventures • Twice-Daily Study Schedule • Evening Edition
            </div>
          </div>
        </body>
        </html>
      `;

      await sendEmail({
        to: user.email,
        subject: `🔥 [Evening Checkpoint] Protect your ${user.streak}-day streak before midnight!`,
        html,
        text: `Evening reminder @${user.handle}! 4 hours remain before the midnight deadline. Complete your daily homework quests at ${appUrl}`,
      });
      sentCount++;
    }

    return res.status(200).json({
      success: true,
      message: `Evening dispatch sent to ${sentCount} adventurers.`,
    });
  } catch (err: any) {
    console.error('cron-evening failed:', err);
    return res.status(500).json({ error: err.message });
  }
}
