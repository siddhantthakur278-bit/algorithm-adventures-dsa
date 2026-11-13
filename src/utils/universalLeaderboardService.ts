import { supabase, isSupabaseConfigured } from './supabaseClient';
import { fetchCodeforcesProfile, fetchGitHubProfile } from './competitiveProfileService';

export interface UniversalUserProfile {
  id: string;
  handle: string;
  displayName: string;
  avatarUrl?: string;
  email?: string;
  isEmailVerified?: boolean;
  emailNotifications?: boolean;
  githubUsername: string;
  codeforcesHandle: string;
  leetcodeUsername: string;
  country: string;
  bio: string;
  totalXp: number;
  problemsSolved: number;
  streakDays: number;
  codeforcesRating: number;
  codeforcesRank: string;
  cohortMode: 'automatic' | 'manual_day' | 'self_paced';
  activeDay: number;
  lastActive: string;
}

const LOCAL_PROFILE_KEY = 'ada_universal_user_profile';

// Seed community adventurers worldwide for offline / instant leaderboard preview
const DEFAULT_COMMUNITY_LEADERS: UniversalUserProfile[] = [
  {
    id: 'user-001',
    handle: 'tourist_fan',
    displayName: 'Gennady Korotkevich Tribute',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    githubUsername: 'tourist',
    codeforcesHandle: 'tourist',
    leetcodeUsername: 'tourist_lc',
    country: 'BY',
    bio: 'Competitive programming enthusiast & graph theory fanatic.',
    totalXp: 14850,
    problemsSolved: 84,
    streakDays: 42,
    codeforcesRating: 3820,
    codeforcesRank: 'legendary grandmaster',
    cohortMode: 'automatic',
    activeDay: 28,
    lastActive: '2 mins ago',
  },
  {
    id: 'user-002',
    handle: 'neo_matrix',
    displayName: 'Neo Matrix',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    githubUsername: 'neo-coder',
    codeforcesHandle: 'Um_nik',
    leetcodeUsername: 'matrix_solver',
    country: 'US',
    bio: 'Dynamic programming speedrunner. O(1) space or bust.',
    totalXp: 11200,
    problemsSolved: 65,
    streakDays: 24,
    codeforcesRating: 3120,
    codeforcesRank: 'international grandmaster',
    cohortMode: 'self_paced',
    activeDay: 30,
    lastActive: '12 mins ago',
  },
  {
    id: 'user-003',
    handle: 'sakura_algo',
    displayName: 'Sakura Tanaka',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    githubUsername: 'sakura-dev',
    codeforcesHandle: 'chokudai',
    leetcodeUsername: 'sakura_t',
    country: 'JP',
    bio: 'AtCoder fan & tree algorithms specialist from Tokyo.',
    totalXp: 9800,
    problemsSolved: 58,
    streakDays: 19,
    codeforcesRating: 2750,
    codeforcesRank: 'grandmaster',
    cohortMode: 'automatic',
    activeDay: 19,
    lastActive: '45 mins ago',
  },
  {
    id: 'user-004',
    handle: 'byte_sorcerer',
    displayName: 'Aarav Patel',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    githubUsername: 'aarav-algo',
    codeforcesHandle: 'Errichto',
    leetcodeUsername: 'aarav_p',
    country: 'IN',
    bio: 'Data structures mentor & bit manipulation explorer.',
    totalXp: 8650,
    problemsSolved: 51,
    streakDays: 16,
    codeforcesRating: 2540,
    codeforcesRank: 'international master',
    cohortMode: 'automatic',
    activeDay: 16,
    lastActive: '1 hour ago',
  },
  {
    id: 'user-005',
    handle: 'elena_byte',
    displayName: 'Elena Rostova',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
    githubUsername: 'elena-code',
    codeforcesHandle: 'ecnerwala',
    leetcodeUsername: 'elena_r',
    country: 'DE',
    bio: 'Segment trees, Fenwick trees & amortized analysis.',
    totalXp: 7400,
    problemsSolved: 44,
    streakDays: 14,
    codeforcesRating: 2380,
    codeforcesRank: 'master',
    cohortMode: 'automatic',
    activeDay: 14,
    lastActive: '3 hours ago',
  },
  {
    id: 'user-006',
    handle: 'lucas_dsa',
    displayName: 'Lucas Silva',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    githubUsername: 'lucassilva',
    codeforcesHandle: 'Benq',
    leetcodeUsername: 'lucas_s',
    country: 'BR',
    bio: 'Graphs, BFS/DFS, Disjoint Set Union master.',
    totalXp: 6200,
    problemsSolved: 38,
    streakDays: 11,
    codeforcesRating: 2150,
    codeforcesRank: 'candidate master',
    cohortMode: 'self_paced',
    activeDay: 12,
    lastActive: '5 hours ago',
  },
];

/**
 * Generate a clean default profile for a new visitor
 */
export function getDefaultUserProfile(): UniversalUserProfile {
  return {
    id: 'local-' + Math.random().toString(36).substring(2, 9),
    handle: 'adventurer_' + Math.floor(100 + Math.random() * 900),
    displayName: 'New DSA Adventurer',
    avatarUrl: '',
    email: '',
    isEmailVerified: false,
    emailNotifications: true,
    githubUsername: '',
    codeforcesHandle: '',
    leetcodeUsername: '',
    country: 'GLOBAL',
    bio: 'Conquering Data Structures & Algorithms one quest at a time.',
    totalXp: 0,
    problemsSolved: 0,
    streakDays: 1,
    codeforcesRating: 0,
    codeforcesRank: 'unrated',
    cohortMode: 'automatic',
    activeDay: 1,
    lastActive: 'Just now',
  };
}

/**
 * Load the active user's profile from localStorage
 */
export function getStoredUserProfile(): UniversalUserProfile {
  try {
    const raw = localStorage.getItem(LOCAL_PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...getDefaultUserProfile(), ...parsed };
    }
  } catch (err) {
    console.warn('Failed to parse local profile:', err);
  }
  return getDefaultUserProfile();
}

/**
 * Check if the user has completed their initial profile setup
 */
export function isProfileSetupComplete(): boolean {
  try {
    const raw = localStorage.getItem(LOCAL_PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return Boolean(parsed.handle && parsed.handle !== '' && (parsed.githubUsername || parsed.codeforcesHandle || parsed.displayName));
    }
  } catch {
    // ignore
  }
  return false;
}

/**
 * Check if a username/handle is available or already claimed by another adventurer
 */
export async function checkHandleAvailability(
  handle: string,
  currentProfileId?: string
): Promise<{ available: boolean; message: string }> {
  const clean = handle.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
  if (!clean || clean.length < 3) {
    return { available: false, message: 'Handle must be at least 3 characters.' };
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, user_handle')
        .eq('user_handle', clean);

      if (!error && Array.isArray(data) && data.length > 0) {
        const existing = data[0];
        // If it matches current user's profile ID, they own it
        if (currentProfileId && existing.id === currentProfileId) {
          return { available: true, message: '✓ This is your current registered handle.' };
        }
        return { available: false, message: `✗ @${clean} is already taken! Please choose another.` };
      }
      return { available: true, message: `✓ @${clean} is available!` };
    } catch {
      // Offline fallback
    }
  }

  // Check against default simulated roster if offline
  const existsInLocal = DEFAULT_COMMUNITY_LEADERS.some(
    (u) => u.handle.toLowerCase() === clean && u.id !== currentProfileId
  );
  if (existsInLocal) {
    return { available: false, message: `✗ @${clean} is already claimed in the community.` };
  }

  return { available: true, message: `✓ @${clean} is available!` };
}

/**
 * Save user profile locally and sync to Supabase if available (Strict Uniqueness Enforced)
 */
export async function saveUniversalProfile(
  profile: UniversalUserProfile
): Promise<{ success: boolean; cloudSynced: boolean; message?: string }> {
  try {
    const cleanHandle = profile.handle.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (!cleanHandle || cleanHandle.length < 3) {
      return { success: false, cloudSynced: false, message: 'Username must be at least 3 characters long.' };
    }
    profile.handle = cleanHandle;

    // 1. Strict Uniqueness Check in Cloud Database
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: existingRows } = await supabase
          .from('profiles')
          .select('id, user_handle')
          .eq('user_handle', cleanHandle);

        if (existingRows && existingRows.length > 0) {
          const match = existingRows[0];
          // If the handle exists under a different ID, refuse!
          if (profile.id !== match.id) {
            return {
              success: false,
              cloudSynced: false,
              message: `The username @${cleanHandle} is already taken by another person! Please choose a unique handle.`,
            };
          }
        }
      } catch (checkErr: any) {
        console.warn('Handle uniqueness pre-check warning:', checkErr.message);
      }
    }

    // 2. Fetch live Codeforces & GitHub avatars/stats if handles are provided
    if (profile.codeforcesHandle && profile.codeforcesHandle.trim() !== '') {
      try {
        const cf = await fetchCodeforcesProfile(profile.codeforcesHandle.trim());
        if (!cf.error && cf.rating) {
          profile.codeforcesRating = cf.rating;
          profile.codeforcesRank = cf.rank || 'specialist';
          if (!profile.avatarUrl && cf.avatar) {
            profile.avatarUrl = cf.avatar;
          }
        }
      } catch (e) {
        console.warn('CF fetch failed in save profile:', e);
      }
    }

    if (profile.githubUsername && profile.githubUsername.trim() !== '' && !profile.avatarUrl) {
      try {
        const gh = await fetchGitHubProfile(profile.githubUsername.trim());
        if (gh.avatarUrl) {
          profile.avatarUrl = gh.avatarUrl;
        }
      } catch (e) {
        console.warn('GH fetch failed in save profile:', e);
      }
    }

    // 3. Persist locally
    localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(profile));

    // 4. Sync to Supabase without risk of overwriting other users
    let cloudSynced = false;
    if (isSupabaseConfigured && supabase) {
      try {
        const profilePayload = {
          user_handle: profile.handle,
          display_name: profile.displayName,
          avatar_url: profile.avatarUrl,
          email: profile.email || null,
          is_email_verified: profile.isEmailVerified || false,
          email_notifications: profile.emailNotifications !== false,
          github_username: profile.githubUsername,
          codeforces_handle: profile.codeforcesHandle,
          leetcode_username: profile.leetcodeUsername,
          country_code: profile.country,
          codeforces_rating: profile.codeforcesRating,
          codeforces_rank: profile.codeforcesRank,
          total_xp: profile.totalXp,
          problems_solved: profile.problemsSolved,
          current_streak: profile.streakDays,
          cohort_mode: profile.cohortMode,
          active_day: profile.activeDay,
          updated_at: new Date().toISOString(),
        };

        if (profile.id && !profile.id.startsWith('local-')) {
          // Existing user with known UUID -> update own record
          const { error } = await supabase
            .from('profiles')
            .update(profilePayload)
            .eq('id', profile.id);

          if (!error) {
            cloudSynced = true;
          } else if (error.code === '23505') {
            return {
              success: false,
              cloudSynced: false,
              message: `Username @${profile.handle} is already taken by another person.`,
            };
          }
        } else {
          // New visitor registration -> INSERT
          const { data: inserted, error } = await supabase
            .from('profiles')
            .insert(profilePayload)
            .select('id')
            .single();

          if (!error && inserted) {
            profile.id = inserted.id; // Store official Supabase UUID
            localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(profile));
            cloudSynced = true;
          } else if (error?.code === '23505') {
            return {
              success: false,
              cloudSynced: false,
              message: `Username @${profile.handle} is already taken by another person. Please choose a unique handle.`,
            };
          }
        }
      } catch (cloudErr: any) {
        console.warn('Cloud sync exception:', cloudErr.message);
      }
    }

    return {
      success: true,
      cloudSynced,
      message: cloudSynced
        ? 'Profile & unique handle verified & synced to World Leaderboard!'
        : 'Profile saved locally! (Configure Supabase keys in Vercel to broadcast live)',
    };
  } catch (err: any) {
    return { success: false, cloudSynced: false, message: err.message };
  }
}

/**
 * Sync active in-app stats (XP, solved count, streak) into the universal profile
 */
export async function syncActiveScores(
  xp: number,
  solvedCount: number,
  streak: number,
  dayNumber: number
): Promise<void> {
  const profile = getStoredUserProfile();
  profile.totalXp = Math.max(profile.totalXp, xp);
  profile.problemsSolved = Math.max(profile.problemsSolved, solvedCount);
  profile.streakDays = Math.max(profile.streakDays, streak);
  profile.activeDay = dayNumber;
  profile.lastActive = 'Just now';

  localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(profile));

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('profiles').upsert(
        {
          user_handle: profile.handle,
          display_name: profile.displayName,
          total_xp: profile.totalXp,
          problems_solved: profile.problemsSolved,
          current_streak: profile.streakDays,
          active_day: profile.activeDay,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_handle' }
      );
    } catch {
      // ignore offline sync
    }
  }
}

/**
 * Fetch the global leaderboard ranking (from Supabase if configured, otherwise simulated world board)
 */
export async function getGlobalLeaderboard(
  sortBy: 'xp' | 'codeforces' | 'problems' | 'streak' = 'xp'
): Promise<{ list: UniversalUserProfile[]; isLiveCloud: boolean }> {
  const current = getStoredUserProfile();

  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('profiles').select('*');
      if (sortBy === 'codeforces') {
        query = query.order('codeforces_rating', { ascending: false });
      } else if (sortBy === 'problems') {
        query = query.order('problems_solved', { ascending: false });
      } else if (sortBy === 'streak') {
        query = query.order('current_streak', { ascending: false });
      } else {
        query = query.order('total_xp', { ascending: false });
      }

      const { data, error } = await query.limit(50);
      if (!error && Array.isArray(data) && data.length > 0) {
        const cloudProfiles: UniversalUserProfile[] = data.map((d: any) => ({
          id: d.id,
          handle: d.user_handle,
          displayName: d.display_name,
          avatarUrl: d.avatar_url,
          githubUsername: d.github_username || '',
          codeforcesHandle: d.codeforces_handle || '',
          leetcodeUsername: d.leetcode_username || '',
          country: d.country_code || 'GLOBAL',
          bio: '',
          totalXp: d.total_xp || 0,
          problemsSolved: d.problems_solved || 0,
          streakDays: d.current_streak || 0,
          codeforcesRating: d.codeforces_rating || 0,
          codeforcesRank: d.codeforces_rank || 'unrated',
          cohortMode: d.cohort_mode || 'automatic',
          activeDay: d.active_day || 1,
          lastActive: 'Live Cloud Sync',
        }));

        // Ensure current user is in the list
        const exists = cloudProfiles.some((p) => p.handle === current.handle);
        if (!exists) {
          cloudProfiles.push(current);
        }

        return { list: sortProfiles(cloudProfiles, sortBy), isLiveCloud: true };
      }
    } catch (e) {
      console.warn('Falling back to local leaderboard:', e);
    }
  }

  // Fallback to vibrant simulated global roster with the current user merged in
  const combined = [...DEFAULT_COMMUNITY_LEADERS];
  const myIndex = combined.findIndex((p) => p.handle === current.handle);
  if (myIndex >= 0) {
    combined[myIndex] = current;
  } else {
    combined.push(current);
  }

  return { list: sortProfiles(combined, sortBy), isLiveCloud: false };
}

function sortProfiles(
  list: UniversalUserProfile[],
  sortBy: 'xp' | 'codeforces' | 'problems' | 'streak'
): UniversalUserProfile[] {
  return [...list].sort((a, b) => {
    if (sortBy === 'codeforces') {
      return (b.codeforcesRating || 0) - (a.codeforcesRating || 0);
    }
    if (sortBy === 'problems') {
      return (b.problemsSolved || 0) - (a.problemsSolved || 0);
    }
    if (sortBy === 'streak') {
      return (b.streakDays || 0) - (a.streakDays || 0);
    }
    return (b.totalXp || 0) - (a.totalXp || 0);
  });
}
