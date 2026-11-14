-- ==============================================================================
-- ALGORITHM ADVENTURES DSA: COMPREHENSIVE SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/wxwouzjjeshzsyfflulo/sql/new
--
-- This script safely updates the `profiles` table to store all user work,
-- email verification, GitHub commits, solved problems, and inventory,
-- and creates the `email_otps` table for persistent OTP tracking.
-- ==============================================================================

-- 1. Ensure public.profiles table exists with core columns
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_handle text UNIQUE NOT NULL,
  display_name text NOT NULL,
  avatar_url text,
  country_code text DEFAULT 'GLOBAL',
  github_username text,
  codeforces_handle text,
  leetcode_username text,
  codeforces_rating integer DEFAULT 0,
  codeforces_rank text DEFAULT 'unrated',
  total_xp integer DEFAULT 0,
  problems_solved integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  highest_streak integer DEFAULT 0,
  cohort_mode text DEFAULT 'automatic',
  cohort_start_date date DEFAULT CURRENT_DATE,
  active_day integer DEFAULT 1,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 2. Add Email Security & Schedule Columns
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_email_verified boolean DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email_notifications boolean DEFAULT true;

-- 3. Add Comprehensive User Work & Performance Telemetry
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio text DEFAULT 'Conquering Data Structures & Algorithms one quest at a time.';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS solved_problem_ids text[] DEFAULT '{}';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS completed_daily_targets text[] DEFAULT '{}';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS git_commits_count integer DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS git_commits_log jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS inventory jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bug_hunt_defeated text[] DEFAULT '{}';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS blitz_high_score integer DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS badges text[] DEFAULT '{}';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_active_at timestamp with time zone DEFAULT now();

-- 4. Create email_otps table for persistent OTP delivery tracking
CREATE TABLE IF NOT EXISTS public.email_otps (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  otp_code text NOT NULL,
  expires_at timestamp with time zone NOT NULL,
  verified boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Create index on email and code for fast lookup
CREATE INDEX IF NOT EXISTS idx_email_otps_email ON public.email_otps(email);
CREATE INDEX IF NOT EXISTS idx_email_otps_code ON public.email_otps(otp_code);

-- 5. Configure Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_otps ENABLE ROW LEVEL SECURITY;

-- Profiles: Allow public read, insert, and update
DROP POLICY IF EXISTS "Public profiles read" ON public.profiles;
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public profiles insert" ON public.profiles;
CREATE POLICY "Public profiles insert" ON public.profiles FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public profiles update" ON public.profiles;
CREATE POLICY "Public profiles update" ON public.profiles FOR UPDATE USING (true);

-- Email OTPs: Allow public access for verification API
DROP POLICY IF EXISTS "Public email_otps read" ON public.email_otps;
CREATE POLICY "Public email_otps read" ON public.email_otps FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public email_otps insert" ON public.email_otps;
CREATE POLICY "Public email_otps insert" ON public.email_otps FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public email_otps update" ON public.email_otps;
CREATE POLICY "Public email_otps update" ON public.email_otps FOR UPDATE USING (true);
