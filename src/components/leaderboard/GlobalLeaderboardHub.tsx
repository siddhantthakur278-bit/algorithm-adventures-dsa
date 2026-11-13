import React, { useState, useEffect, useMemo } from 'react';
import {
  Trophy,
  Medal,
  Award,
  Crown,
  Flame,
  Globe,
  Sparkles,
  Zap,
  Search,
  Filter,
  User,
  CheckCircle2,
  ExternalLink,
  Shield,
  RefreshCw,
  Rocket,
  SlidersHorizontal,
} from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { useCourse } from '../../context/CourseContext';
import {
  UniversalUserProfile,
  getGlobalLeaderboard,
  getStoredUserProfile,
  syncActiveScores,
} from '../../utils/universalLeaderboardService';
import { isSupabaseConfigured } from '../../utils/supabaseClient';
import { sound } from '../../utils/soundEffects';
import { GlobalOnboardingModal } from '../common/GlobalOnboardingModal';

export const GlobalLeaderboardHub: React.FC = () => {
  const { stats, realStreak, scheduleState } = useCourse();

  const [leaderboard, setLeaderboard] = useState<UniversalUserProfile[]>([]);
  const [isLiveCloud, setIsLiveCloud] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<'xp' | 'codeforces' | 'problems' | 'streak'>('xp');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);

  const myProfile = useMemo(() => getStoredUserProfile(), [showOnboardingModal]);

  const loadData = async () => {
    setIsLoading(true);
    // Sync current active in-app stats first
    await syncActiveScores(
      stats.xp,
      stats.solvedProblemIds.length,
      realStreak.currentStreak,
      scheduleState.dayNumber || 1
    );

    const res = await getGlobalLeaderboard(sortBy);
    setLeaderboard(res.list);
    setIsLiveCloud(res.isLiveCloud);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [sortBy]);

  // Codeforces color mapping according to real CF titles
  const getCfColor = (rating: number) => {
    if (rating >= 3000) return 'text-red-500 font-black'; // Legendary Grandmaster
    if (rating >= 2400) return 'text-red-400 font-bold'; // Grandmaster
    if (rating >= 2100) return 'text-amber-400 font-bold'; // Master
    if (rating >= 1900) return 'text-purple-400 font-bold'; // Candidate Master
    if (rating >= 1600) return 'text-blue-400 font-bold'; // Expert
    if (rating >= 1400) return 'text-cyan-400 font-bold'; // Specialist
    if (rating >= 1200) return 'text-emerald-400 font-bold'; // Pupil
    if (rating > 0) return 'text-slate-400 font-medium'; // Newbie
    return 'text-slate-500';
  };

  // Filtered leaderboard
  const filteredList = useMemo(() => {
    if (!searchQuery.trim()) return leaderboard;
    const q = searchQuery.toLowerCase();
    return leaderboard.filter(
      (u) =>
        u.handle.toLowerCase().includes(q) ||
        u.displayName.toLowerCase().includes(q) ||
        u.githubUsername.toLowerCase().includes(q) ||
        u.codeforcesHandle.toLowerCase().includes(q) ||
        u.country.toLowerCase().includes(q)
    );
  }, [leaderboard, searchQuery]);

  // Find user's own rank
  const myRank = leaderboard.findIndex((u) => u.handle === myProfile.handle) + 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-fadeIn font-comic">
      {/* Hero Comic Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d1222] via-[#141b34] to-[#1a142c] border-3 border-black p-6 sm:p-8 shadow-comic-lg bg-halftone">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider border-2 border-black shadow-comic-sm">
              <Globe className="w-4 h-4" /> Worldwide Competitive Arena
            </div>
            <h1 className="font-bangers text-3xl sm:text-5xl text-white tracking-wide">
              GLOBAL ALGORITHM LEADERBOARD
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-medium">
              Real-time rankings across all developers worldwide! Connect your <strong>GitHub</strong> &amp;{' '}
              <strong>Codeforces</strong> handles to display your real rating, solve daily quests in your own pace, and compete globally.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  setShowOnboardingModal(true);
                  sound.playPop();
                }}
                className="btn-comic-push px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider border-2 border-slate-900 shadow-comic flex items-center gap-2 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Edit My Identity &amp; Handles</span>
              </button>

              <button
                onClick={loadData}
                className="px-4 py-2.5 rounded-2xl bg-[#1a2340] hover:bg-[#222e54] text-slate-300 hover:text-white text-xs font-bold border border-[#2b3a67] transition flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh Rankings</span>
              </button>
            </div>
          </div>

          {/* User Spot Card */}
          <div className="p-5 rounded-2xl bg-[#111728]/90 border-2 border-amber-400/60 shadow-comic flex flex-col items-center justify-center text-center min-w-[240px] space-y-2">
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-bold">
              Your World Rank
            </span>
            <div className="font-bangers text-4xl sm:text-5xl text-white flex items-center gap-2">
              <span>#{myRank > 0 ? myRank : '—'}</span>
              <Crown className="w-8 h-8 text-amber-400" />
            </div>
            <div className="text-xs font-bold text-slate-300">
              @{myProfile.handle} ({myProfile.displayName})
            </div>
            <div className="flex items-center gap-3 text-xs font-mono pt-1">
              <span className="text-amber-300 font-black">{stats.xp} XP</span>
              <span className="text-slate-500">•</span>
              <span className="text-sky-300 font-bold">{stats.solvedProblemIds.length} Solved</span>
              <span className="text-slate-500">•</span>
              <span className="text-rose-400 font-bold flex items-center gap-0.5">
                <Flame className="w-3.5 h-3.5" /> {realStreak.currentStreak}d
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cloud Status Info Strip */}
      <div className="p-3.5 rounded-2xl bg-[#0c101d] border border-[#1b233a] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isLiveCloud ? 'bg-emerald-400 animate-pulse' : 'bg-sky-400'
            }`}
          />
          <span className="font-bold">
            {isLiveCloud ? '⚡ Live Cloud Database Active (Supabase)' : '🌐 Community Leaderboard (Simulated + Local Sync)'}
          </span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-400 text-[11px]">
            {isLiveCloud
              ? 'Synced across all users worldwide via Supabase PostgreSQL.'
              : 'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel to broadcast live across everyone.'}
          </span>
        </div>

        <div className="text-[11px] font-mono text-amber-400 font-bold">
          {leaderboard.length} Adventurers Ranked
        </div>
      </div>

      {/* Podium for Top 3 */}
      {filteredList.length >= 3 && !searchQuery && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* #2 Silver */}
          <div className="order-2 md:order-1 p-5 rounded-3xl bg-gradient-to-b from-[#12182c] to-[#0a0e1c] border-2 border-slate-400/50 shadow-comic flex flex-col items-center text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-slate-300 text-slate-950 font-black flex items-center justify-center text-lg border-2 border-black">
              2
            </div>
            <div className="relative">
              <img
                src={filteredList[1].avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt=""
                className="w-16 h-16 rounded-2xl border-2 border-slate-300 object-cover"
              />
              <span className="absolute -bottom-2 -right-1 text-xs bg-slate-800 px-1.5 py-0.5 rounded border border-slate-600 font-mono">
                {filteredList[1].country}
              </span>
            </div>
            <div>
              <div className="font-black text-white text-base">{filteredList[1].displayName}</div>
              <div className="text-xs font-mono text-slate-400">@{filteredList[1].handle}</div>
            </div>
            <div className="text-xs font-mono text-slate-300 space-y-1">
              <div><strong className="text-amber-400">{filteredList[1].totalXp}</strong> XP</div>
              {filteredList[1].codeforcesRating > 0 && (
                <div className={`text-[11px] ${getCfColor(filteredList[1].codeforcesRating)}`}>
                  CF: {filteredList[1].codeforcesRating} ({filteredList[1].codeforcesRank})
                </div>
              )}
            </div>
          </div>

          {/* #1 Gold */}
          <div className="order-1 md:order-2 p-6 rounded-3xl bg-gradient-to-b from-[#1a182e] via-[#1c1833] to-[#0d0c1c] border-3 border-amber-400 shadow-comic-lg flex flex-col items-center text-center space-y-3 scale-[1.03]">
            <Crown className="w-8 h-8 text-amber-400 animate-bounce" />
            <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xl border-2 border-black shadow-comic-sm">
              1
            </div>
            <div className="relative">
              <img
                src={filteredList[0].avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt=""
                className="w-20 h-20 rounded-2xl border-3 border-amber-400 object-cover"
              />
              <span className="absolute -bottom-2 -right-1 text-xs bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded border border-black font-mono">
                {filteredList[0].country}
              </span>
            </div>
            <div>
              <div className="font-black text-white text-lg">{filteredList[0].displayName}</div>
              <div className="text-xs font-mono text-amber-300">@{filteredList[0].handle}</div>
            </div>
            <div className="text-xs font-mono text-slate-200 space-y-1">
              <div className="text-sm font-black text-amber-300">{filteredList[0].totalXp} XP</div>
              {filteredList[0].codeforcesRating > 0 && (
                <div className={`text-xs font-bold ${getCfColor(filteredList[0].codeforcesRating)}`}>
                  CF: {filteredList[0].codeforcesRating} ({filteredList[0].codeforcesRank})
                </div>
              )}
            </div>
          </div>

          {/* #3 Bronze */}
          <div className="order-3 p-5 rounded-3xl bg-gradient-to-b from-[#12182c] to-[#0a0e1c] border-2 border-amber-700/50 shadow-comic flex flex-col items-center text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-700 text-amber-100 font-black flex items-center justify-center text-lg border-2 border-black">
              3
            </div>
            <div className="relative">
              <img
                src={filteredList[2].avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'}
                alt=""
                className="w-16 h-16 rounded-2xl border-2 border-amber-600 object-cover"
              />
              <span className="absolute -bottom-2 -right-1 text-xs bg-slate-800 px-1.5 py-0.5 rounded border border-slate-600 font-mono">
                {filteredList[2].country}
              </span>
            </div>
            <div>
              <div className="font-black text-white text-base">{filteredList[2].displayName}</div>
              <div className="text-xs font-mono text-slate-400">@{filteredList[2].handle}</div>
            </div>
            <div className="text-xs font-mono text-slate-300 space-y-1">
              <div><strong className="text-amber-400">{filteredList[2].totalXp}</strong> XP</div>
              {filteredList[2].codeforcesRating > 0 && (
                <div className={`text-[11px] ${getCfColor(filteredList[2].codeforcesRating)}`}>
                  CF: {filteredList[2].codeforcesRating} ({filteredList[2].codeforcesRank})
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sort & Search Controls */}
      <div className="p-4 rounded-2xl bg-[#0f1426] border border-[#1e2a4a] flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Sort Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-amber-400" /> Sort By:
          </span>
          <button
            onClick={() => {
              setSortBy('xp');
              sound.playPop();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
              sortBy === 'xp'
                ? 'bg-amber-400 text-slate-950 border-slate-900 shadow-comic-sm font-black'
                : 'bg-[#141b33] text-slate-300 border-[#222e54] hover:bg-[#1b2547]'
            }`}
          >
            ⚡ Total XP
          </button>
          <button
            onClick={() => {
              setSortBy('codeforces');
              sound.playPop();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
              sortBy === 'codeforces'
                ? 'bg-amber-400 text-slate-950 border-slate-900 shadow-comic-sm font-black'
                : 'bg-[#141b33] text-slate-300 border-[#222e54] hover:bg-[#1b2547]'
            }`}
          >
            🏆 Codeforces Rating
          </button>
          <button
            onClick={() => {
              setSortBy('problems');
              sound.playPop();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
              sortBy === 'problems'
                ? 'bg-amber-400 text-slate-950 border-slate-900 shadow-comic-sm font-black'
                : 'bg-[#141b33] text-slate-300 border-[#222e54] hover:bg-[#1b2547]'
            }`}
          >
            🎯 Problems Solved
          </button>
          <button
            onClick={() => {
              setSortBy('streak');
              sound.playPop();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
              sortBy === 'streak'
                ? 'bg-amber-400 text-slate-950 border-slate-900 shadow-comic-sm font-black'
                : 'bg-[#141b33] text-slate-300 border-[#222e54] hover:bg-[#1b2547]'
            }`}
          >
            🔥 Streak Days
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search handle, country..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0a0e1c] border border-[#222e54] text-xs text-white focus:border-amber-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Main Leaderboard Table */}
      <div className="rounded-3xl bg-[#0c101e] border-2 border-[#1c2642] overflow-hidden shadow-comic">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#12182c] border-b border-[#1e2a4a] text-slate-400 uppercase font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Adventurer</th>
                <th className="py-3 px-4">Handles</th>
                <th className="py-3 px-4 text-center">CF Rating</th>
                <th className="py-3 px-4 text-center">Problems</th>
                <th className="py-3 px-4 text-center">Streak</th>
                <th className="py-3 px-4 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#172038]">
              {filteredList.map((user, idx) => {
                const isMe = user.handle === myProfile.handle;
                const rankNum = idx + 1;

                return (
                  <tr
                    key={user.id || user.handle}
                    className={`transition ${
                      isMe
                        ? 'bg-amber-400/10 hover:bg-amber-400/15 border-l-4 border-l-amber-400 font-semibold'
                        : 'hover:bg-[#11172a]'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-4 font-mono font-bold">
                      <div className="flex items-center gap-1.5">
                        {rankNum === 1 ? (
                          <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                            1
                          </span>
                        ) : rankNum === 2 ? (
                          <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-950 flex items-center justify-center font-black">
                            2
                          </span>
                        ) : rankNum === 3 ? (
                          <span className="w-6 h-6 rounded-full bg-amber-700 text-amber-100 flex items-center justify-center font-black">
                            3
                          </span>
                        ) : (
                          <span className="text-slate-400 pl-1">#{rankNum}</span>
                        )}
                      </div>
                    </td>

                    {/* Adventurer Identity */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={
                              user.avatarUrl ||
                              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
                            }
                            alt=""
                            className="w-9 h-9 rounded-xl border border-slate-700 object-cover"
                          />
                          {user.country && (
                            <span className="absolute -bottom-1 -right-1 text-[9px] bg-black/80 px-1 rounded font-mono border border-slate-600">
                              {user.country}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-black text-white text-xs flex items-center gap-1.5">
                            <span>{user.displayName}</span>
                            {isMe && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-black">
                                YOU
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400">
                            @{user.handle}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* External Handles */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {user.githubUsername ? (
                          <a
                            href={`https://github.com/${user.githubUsername}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-0.5 rounded bg-[#171f38] hover:bg-[#202b4d] text-slate-300 text-[10px] font-mono border border-[#283761] flex items-center gap-1"
                            title={`GitHub: ${user.githubUsername}`}
                          >
                            <GithubIcon className="w-3 h-3 text-slate-400" />
                            <span>{user.githubUsername}</span>
                          </a>
                        ) : (
                          <span className="text-slate-600 text-[10px] font-mono">—</span>
                        )}

                        {user.codeforcesHandle && (
                          <a
                            href={`https://codeforces.com/profile/${user.codeforcesHandle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-0.5 rounded bg-[#171f38] hover:bg-[#202b4d] text-amber-300 text-[10px] font-mono border border-[#283761] flex items-center gap-1"
                            title={`Codeforces: ${user.codeforcesHandle}`}
                          >
                            <Trophy className="w-3 h-3 text-amber-400" />
                            <span>{user.codeforcesHandle}</span>
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Codeforces Rating */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold">
                      {user.codeforcesRating > 0 ? (
                        <div className={getCfColor(user.codeforcesRating)}>
                          {user.codeforcesRating}
                          <span className="block text-[9px] opacity-75 capitalize font-sans">
                            {user.codeforcesRank}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-600">Unrated</span>
                      )}
                    </td>

                    {/* Problems Solved */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-sky-300">
                      {user.problemsSolved}
                    </td>

                    {/* Streak */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-rose-400">
                      <span className="inline-flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" />
                        {user.streakDays}d
                      </span>
                    </td>

                    {/* Total XP */}
                    <td className="py-3.5 px-4 text-right font-mono font-black text-amber-300 text-sm">
                      {user.totalXp} XP
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Onboarding / Edit Profile Modal */}
      <GlobalOnboardingModal
        isOpen={showOnboardingModal}
        onClose={() => setShowOnboardingModal(false)}
      />
    </div>
  );
};
