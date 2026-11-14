import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  try {
    if (!supabase) {
      return res.status(503).json({
        success: false,
        error: 'Supabase credentials are not configured in environment variables.',
      });
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('total_xp', { ascending: false });

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    // Filter out internal test handles
    const realUsers = (data || []).filter(
      (u: any) => !u.user_handle?.startsWith('test_friend_')
    );

    return res.status(200).json({
      success: true,
      totalUsers: realUsers.length,
      users: realUsers,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message || 'Failed to fetch users.' });
  }
}
