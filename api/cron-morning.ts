import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { sendEmail } from './utils/emailService';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// Problem of the Day roster
const MORNING_POTD_SCHEDULE = [
  { day: 1, title: 'Two Sum Saga', diff: 'Easy', time: 'O(N)', space: 'O(N)', topic: 'Arrays & Hashing', hint: 'Store target - num in a hash map as you iterate!' },
  { day: 2, title: 'Valid Palindrome & Pointers', diff: 'Easy', time: 'O(N)', space: 'O(1)', topic: 'Two Pointers', hint: 'Two pointers moving inward skipping non-alphanumeric chars.' },
  { day: 3, title: 'Reverse Linked List Duel', diff: 'Easy', time: 'O(N)', space: 'O(1)', topic: 'Linked Lists', hint: 'Keep track of prev, curr, and next pointers.' },
  { day: 4, title: 'Invert Binary Tree Quest', diff: 'Easy', time: 'O(N)', space: 'O(H)', topic: 'Trees', hint: 'Recursively swap left and right subtrees.' },
  { day: 5, title: 'Climbing Stairs Dynamic Leap', diff: 'Easy', time: 'O(N)', space: 'O(1)', topic: 'Dynamic Programming', hint: 'Fibonacci recurrence: ways(n) = ways(n-1) + ways(n-2).' },
  { day: 6, title: 'Valid Parentheses Vault', diff: 'Easy', time: 'O(N)', space: 'O(N)', topic: 'Stack', hint: 'Push open brackets to stack, pop on close bracket match.' },
  { day: 7, title: 'Binary Search Mastery', diff: 'Easy', time: 'O(log N)', space: 'O(1)', topic: 'Binary Search', hint: 'Calculate mid = low + (high - low) // 2 to avoid overflow.' },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const potd = MORNING_POTD_SCHEDULE[dayOfWeek % MORNING_POTD_SCHEDULE.length];

    // Fetch all users with email registered
    let recipients: Array<{ email: string; handle: string }> = [];

    if (supabase) {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('email, user_handle')
          .not('email', 'is', null);

        if (data && data.length > 0) {
          recipients = data.map((d: any) => ({ email: d.email, handle: d.user_handle }));
        }
      } catch (err: any) {
        console.warn('Could not load emails from Supabase:', err.message);
      }
    }

    // Fallback recipient from environment if table is empty
    if (recipients.length === 0 && process.env.ADMIN_EMAIL) {
      recipients.push({ email: process.env.ADMIN_EMAIL, handle: 'Adventurer' });
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
            .card { max-width: 540px; margin: 0 auto; background: #0f1527; border: 2px solid #38bdf8; border-radius: 20px; padding: 28px; }
            .badge { display: inline-block; background: #38bdf8; color: #000; font-weight: 900; font-size: 11px; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; }
            .title { font-size: 22px; font-weight: 900; margin: 12px 0; color: #ffffff; }
            .potd-card { background: #131b35; border: 2px solid #22325e; border-radius: 16px; padding: 20px; margin: 20px 0; }
            .cta-btn { display: inline-block; background: #facc15; color: #000; font-weight: 900; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 14px; text-transform: uppercase; margin-top: 16px; }
            .footer { margin-top: 24px; font-size: 11px; color: #64748b; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <span class="badge">☀️ Morning POTD Vault Unlock</span>
            <div class="title">Good Morning, @${user.handle}! 🚀</div>
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.6;">
              The <strong>5:00 AM POTD Vault</strong> has officially unlocked today's featured algorithmic challenge.
            </p>

            <div class="potd-card">
              <div style="font-size: 12px; font-weight: bold; color: #facc15; text-transform: uppercase;">
                ${potd.topic} • ${potd.diff}
              </div>
              <div style="font-size: 18px; font-weight: 900; color: #ffffff; margin: 6px 0;">
                ${potd.title}
              </div>
              <div style="font-size: 12px; color: #94a3b8;">
                Target Complexity: <strong>${potd.time}</strong> Time | <strong>${potd.space}</strong> Space
              </div>
              <div style="margin-top: 12px; font-size: 12px; color: #38bdf8; background: rgba(56,189,248,0.1); padding: 8px 12px; border-radius: 8px;">
                💡 <strong>Byte's Hint:</strong> ${potd.hint}
              </div>
            </div>

            <div style="text-align: center;">
              <a href="${appUrl}" class="cta-btn">Solve Today's Quest in IDE →</a>
            </div>

            <div class="footer">
              Algorithm Adventures • Twice-Daily Study Schedule • Morning Edition
            </div>
          </div>
        </body>
        </html>
      `;

      await sendEmail({
        to: user.email,
        subject: `☀️ [Morning POTD] ${potd.title} is Unlocked!`,
        html,
        text: `Good morning @${user.handle}! Today's POTD is: ${potd.title} (${potd.diff}). Solve it now at ${appUrl}`,
      });
      sentCount++;
    }

    return res.status(200).json({
      success: true,
      message: `Morning dispatch sent to ${sentCount} adventurers.`,
      potd: potd.title,
    });
  } catch (err: any) {
    console.error('cron-morning failed:', err);
    return res.status(500).json({ error: err.message });
  }
}
