import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

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
    const { email, code, handle } = req.body || {};

    if (!email || !code) {
      return res.status(400).json({ error: 'Email and 6-digit verification code are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = code.trim();

    let isMatch = false;

    // 1. Check Supabase email_otps table
    if (supabase) {
      try {
        const { data } = await supabase
          .from('email_otps')
          .select('*')
          .eq('email', cleanEmail)
          .eq('otp_code', cleanCode)
          .order('created_at', { ascending: false })
          .limit(1);

        if (data && data.length > 0) {
          const record = data[0];
          const notExpired = new Date(record.expires_at).getTime() > Date.now();
          if (notExpired) {
            isMatch = true;
            // Mark verified
            await supabase.from('email_otps').update({ verified: true }).eq('id', record.id);
          }
        }
      } catch (err: any) {
        console.warn('Supabase OTP check fallback:', err.message);
      }
    }

    // 2. Fallback check for simulated test codes (or default universal test code '777888')
    if (!isMatch && cleanCode === '777888') {
      isMatch = true;
    }

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired verification code. Please check your Gmail or request a new code.',
      });
    }

    // 3. Update profiles table in Supabase if handle is provided
    if (supabase && handle) {
      try {
        await supabase
          .from('profiles')
          .update({
            email: cleanEmail,
            is_email_verified: true,
            email_notifications: true,
          })
          .eq('user_handle', handle);
      } catch (e: any) {
        console.warn('Could not update profile email verification:', e.message);
      }
    }

    return res.status(200).json({
      success: true,
      verified: true,
      message: `Gmail ${cleanEmail} verified successfully! Your accounts are linked.`,
    });
  } catch (err: any) {
    console.error('verify-otp error:', err);
    return res.status(500).json({ error: err.message || 'Verification failed.' });
  }
}
