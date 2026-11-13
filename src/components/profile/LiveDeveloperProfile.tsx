import React, { useState, useEffect } from 'react';
import { useCourse } from '../../context/CourseContext';
import {
  CodeforcesProfile,
  LeetCodeProfile,
  GitHubProfileData,
} from '../../types';
import {
  fetchGitHubProfile,
  fetchCodeforcesProfile,
  fetchLeetCodeProfile,
} from '../../utils/competitiveProfileService';
import { loadGitHubConfig } from '../../utils/githubService';
import {
  getStoredUserProfile,
} from '../../utils/universalLeaderboardService';
import { GlobalOnboardingModal } from '../common/GlobalOnboardingModal';
import { HumanAvatar } from '../common/HumanAvatar';
import {
  Globe,
  ExternalLink,
  GitCommit as GitCommitIcon,
  RefreshCw,
  Award,
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  Code2,
  UserCheck,
  Sun,
  BookOpen,
  Bug,
  Swords,
  ArrowRight,
  SlidersHorizontal,
  Clock,
  Calendar,
  Check,
  Zap,
} from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { ByteAvatar, ProfessorAvatar, BugsyAvatar } from '../characters/Characters';
import { sound } from '../../utils/soundEffects';
import { hallOfFameProblems } from '../../data/hallOfFameData';
import { SkillRadarAndCertificate } from './SkillRadarAndCertificate';
import { ContributionHeatmap } from './ContributionHeatmap';
import { DeveloperPassportCard } from './DeveloperPassportCard';

export const LiveDeveloperProfile: React.FC = () => {
  const {
    stats,
    setActiveTab,
    scheduleState,
    loadProblemInIDE,
    realStreak,
    dailyTargetStatus,
  } = useCourse();
  const gitConfig = loadGitHubConfig();

  // Universal Identity & Handles
  const initialProfile = getStoredUserProfile();
  const [githubUser, setGithubUser] = useState<string>(
    initialProfile.githubUsername || gitConfig.owner || 'siddhantthakur278-bit'
  );
  const [cfHandle, setCfHandle] = useState<string>(
    initialProfile.codeforcesHandle || 'siddhantthakur278'
  );
  const [lcHandle, setLcHandle] = useState<string>(
    initialProfile.leetcodeUsername || 'siddhantkthakur'
  );
  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);
  const [inAppTab, setInAppTab] = useState<'today' | 'solved' | 'commits' | 'radar' | 'heatmap' | 'passport'>('today');

  const [githubData, setGithubData] = useState<GitHubProfileData | null>(null);
  const [cfData, setCfData] = useState<CodeforcesProfile | null>(null);
  const [lcData, setLcData] = useState<LeetCodeProfile | null>(null);

  const [isLoadingGh, setIsLoadingGh] = useState<boolean>(false);
  const [isLoadingCf, setIsLoadingCf] = useState<boolean>(false);
  const [isLoadingLc, setIsLoadingLc] = useState<boolean>(false);

  // In-app task calculations
  const isPotdSolved = stats.solvedProblemIds.includes(scheduleState.potdProblem.id);
  const solvedHomeworkCount = scheduleState.homeworkProblems.filter(hw =>
    stats.solvedProblemIds.includes(hw.id)
  ).length;
  const solvedProblemsList = hallOfFameProblems.filter(p => stats.solvedProblemIds.includes(p.id));

  // Load initial profile data
  const loadGitHub = async (username = githubUser) => {
    setIsLoadingGh(true);
    try {
      const data = await fetchGitHubProfile(username, gitConfig.token, gitConfig.repo);
      setGithubData(data);
    } finally {
      setIsLoadingGh(false);
    }
  };

  const loadCodeforces = async (handle = cfHandle) => {
    setIsLoadingCf(true);
    try {
      const data = await fetchCodeforcesProfile(handle);
      setCfData(data);
    } finally {
      setIsLoadingCf(false);
    }
  };

  const loadLeetCode = async (username = lcHandle) => {
    setIsLoadingLc(true);
    try {
      const data = await fetchLeetCodeProfile(username);
      setLcData(data);
    } finally {
      setIsLoadingLc(false);
    }
  };

  useEffect(() => {
    loadGitHub();
    loadCodeforces();
    loadLeetCode();
  }, []);

  const totalCombinedSolved =
    stats.solvedProblemIds.length +
    (cfData?.solvedCount || 0) +
    (lcData?.totalSolved || 0);

  const getCfRankColor = (rank?: string) => {
    if (!rank) return 'text-gray-400 border-gray-700 bg-gray-800';
    const r = rank.toLowerCase();
    if (r.includes('grandmaster')) return 'text-red-400 border-red-500/50 bg-red-950/40';
    if (r.includes('master')) return 'text-orange-400 border-orange-500/50 bg-orange-950/40';
    if (r.includes('candidate')) return 'text-purple-400 border-purple-500/50 bg-purple-950/40';
    if (r.includes('expert')) return 'text-blue-400 border-blue-500/50 bg-blue-950/40';
    if (r.includes('specialist')) return 'text-cyan-400 border-cyan-500/50 bg-cyan-950/40';
    if (r.includes('pupil')) return 'text-green-400 border-green-500/50 bg-green-950/40';
    return 'text-gray-300 border-gray-600 bg-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Hero Developer Command Center Card */}
      <div className="bg-[#0c101d] border-2 border-[#1c243a] rounded-3xl p-6 sm:p-8 shadow-comic-lg bg-halftone">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <HumanAvatar
              seed={githubUser || 'adventurer'}
              name={githubData?.name || githubUser || 'Adventurer'}
              avatarUrl={githubData?.avatarUrl}
              size="2xl"
              aura="amber"
              showStatus={true}
            />

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
                  {githubData?.name || githubUser}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FBBF24] text-black border border-black shadow-comic-sm">
                  {stats.activeTitle}
                </span>
                <button
                  onClick={() => setShowOnboardingModal(true)}
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400 shadow-comic-sm flex items-center gap-1 cursor-pointer transition"
                  title="Configure your GitHub, Codeforces & LeetCode handles"
                >
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>Edit Universal Identity</span>
                </button>
              </div>
              <p className="text-xs text-slate-300 font-mono">
                @{githubUser} • Level {stats.level} Algorithm Adventurer
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <a
                  href={`https://github.com/${githubUser}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#131728] text-slate-200 border border-[#232c45] hover:text-white hover:border-[#38BDF8] transition"
                >
                  <GithubIcon className="w-3 h-3 text-[#FBBF24]" />
                  github.com/{githubUser}
                </a>
                <a
                  href={`https://codeforces.com/profile/${cfHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#0c182b] text-[#38BDF8] border border-[#38BDF8]/40 hover:underline transition"
                >
                  <Globe className="w-3 h-3" />
                  codeforces.com/{cfHandle}
                </a>
                <a
                  href={`https://leetcode.com/u/${lcHandle}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#20150d] text-[#FB923C] border border-[#FB923C]/40 hover:underline transition"
                >
                  <Code2 className="w-3 h-3" />
                  leetcode.com/{lcHandle}
                </a>
              </div>
              {githubData?.bio && (
                <p className="text-xs text-slate-400 max-w-md pt-0.5">{githubData.bio}</p>
              )}
            </div>
          </div>

          {/* Quick Aggregate Stats HUD */}
          <div className="grid grid-cols-3 gap-3 w-full lg:w-auto font-mono text-center">
            <div className="p-3 bg-[#080d19] rounded-2xl border border-[#1b233a] shadow-comic-sm">
              <span className="text-[10px] text-slate-400 block font-bold">TOTAL SOLVED</span>
              <strong className="font-bangers text-2xl text-[#FBBF24]">{totalCombinedSolved}</strong>
              <span className="text-[9px] text-slate-500 block">Cross-Platform</span>
            </div>

            <div className="p-3 bg-[#080d19] rounded-2xl border border-[#1b233a] shadow-comic-sm">
              <span className="text-[10px] text-slate-400 block font-bold">REAL STREAK</span>
              <div className="flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-[#FB923C]" />
                <strong className="font-bangers text-2xl text-[#FB923C]">{realStreak.currentStreak}d</strong>
              </div>
              <span className="text-[9px] text-slate-400 block font-semibold">
                {dailyTargetStatus.isTargetComplete ? '🔥 Today Secured' : '⏳ Today Pending'}
              </span>
            </div>

            <div className="p-3 bg-[#080d19] rounded-2xl border border-[#1b233a] shadow-comic-sm">
              <span className="text-[10px] text-slate-400 block font-bold">GIT COMMITS</span>
              <strong className="font-bangers text-2xl text-[#38BDF8]">{stats.gitCommits.length}</strong>
              <span className="text-[9px] text-slate-500 block">Recorded SHA</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Column Competitive Platform Radar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. GITHUB LIVE WORK & COMMITS */}
        <div className="bg-[#0c101d] rounded-2xl border border-[#1c243a] p-5 shadow-comic-sm flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1b233a]">
              <div className="flex items-center gap-2">
                <GithubIcon className="w-5 h-5 text-[#FBBF24]" />
                <h3 className="font-bangers text-lg text-white">GITHUB LIVE</h3>
              </div>
              <button
                onClick={() => loadGitHub()}
                disabled={isLoadingGh}
                className="text-slate-400 hover:text-white transition"
                title="Refresh GitHub data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingGh ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* GitHub Profile Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Public Repos:</span>
                <span className="font-mono text-white font-bold">{githubData?.publicRepos ?? '—'}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Followers:</span>
                <span className="font-mono text-white font-bold">{githubData?.followers ?? '—'}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Target Repo:</span>
                <span className="font-mono text-[#38BDF8] font-bold truncate max-w-[170px]">
                  {gitConfig.repo}
                </span>
              </div>
            </div>

            {/* Live Commits Stream */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Recent Pushes ({githubData?.recentCommits?.length || 0})
              </span>

              {githubData?.recentCommits && githubData.recentCommits.length > 0 ? (
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {githubData.recentCommits.map((c, i) => (
                    <a
                      key={i}
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-[#080d19] hover:bg-[#12172a] rounded-lg border border-[#1b233a] flex items-center justify-between text-[11px] transition block"
                    >
                      <div className="truncate pr-2">
                        <span className="text-white font-medium block truncate">{c.message}</span>
                        <span className="text-[9px] text-slate-500 font-mono">
                          {new Date(c.date).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="font-mono text-[#FBBF24] text-[10px] font-bold">
                        {c.sha}
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-[#080d19] rounded-lg border border-[#1b233a] text-[11px] text-slate-400 italic">
                  Solve a problem in Python IDE to trigger your first commit push!
                </div>
              )}
            </div>
          </div>

          <a
            href={`https://github.com/${githubUser}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-[#141b2e] hover:bg-[#1d2740] text-xs font-bold text-white border border-[#25314e] transition"
          >
            Visit GitHub Profile <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 2. CODEFORCES LIVE STATUS */}
        <div className="bg-[#0c101d] rounded-2xl border border-[#1c243a] p-5 shadow-comic-sm flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1b233a]">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#38BDF8]" />
                <h3 className="font-bangers text-lg text-white">CODEFORCES RADAR</h3>
              </div>
              <button
                onClick={() => loadCodeforces()}
                disabled={isLoadingCf}
                className="text-slate-400 hover:text-white transition"
                title="Refresh Codeforces data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingCf ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Handle Input & Sync */}
            <div className="flex gap-2">
              <input
                type="text"
                value={cfHandle}
                onChange={e => setCfHandle(e.target.value)}
                placeholder="Codeforces handle..."
                className="flex-1 bg-[#080d19] border border-[#232c45] rounded-lg px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:border-[#38BDF8]"
              />
              <button
                onClick={() => loadCodeforces(cfHandle)}
                disabled={isLoadingCf}
                className="px-3 py-1 rounded-lg bg-[#38BDF8] hover:bg-[#5bc8fa] text-black font-bangers text-xs border border-black transition"
              >
                Sync
              </button>
            </div>

            {/* Stats Display */}
            <div className="space-y-3 pt-1">
              <div className="p-3 bg-[#080d19] rounded-xl border border-[#1b233a] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">CURRENT RATING</span>
                  <span className="font-bangers text-2xl text-white">
                    {cfData?.rating ?? 'Unrated'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-bold">MAX RATING</span>
                  <span className="font-mono text-sm text-[#FBBF24] font-bold">
                    {cfData?.maxRating ?? '—'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Official Rank:</span>
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-bold border capitalize ${getCfRankColor(
                    cfData?.rank
                  )}`}
                >
                  {cfData?.rank || 'Newbie'}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Problems Solved:</span>
                <span className="font-mono text-[#34D399] font-bold">
                  {cfData?.solvedCount ?? 0} Solved
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('codeforces')}
              className="flex-1 p-2 rounded-xl bg-[#141b2e] hover:bg-[#1d2740] text-xs font-bold text-slate-200 border border-[#25314e] transition"
            >
              Solve CF Problems
            </button>
            {cfData?.handle && (
              <a
                href={`https://codeforces.com/profile/${cfData.handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-[#38BDF8] text-black font-bold text-xs flex items-center justify-center border border-black shadow-comic-sm hover:bg-[#5bc8fa] transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* 3. LEETCODE LIVE STATUS */}
        <div className="bg-[#0c101d] rounded-2xl border border-[#1c243a] p-5 shadow-comic-sm flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1b233a]">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#FB923C]" />
                <h3 className="font-bangers text-lg text-white">LEETCODE RADAR</h3>
              </div>
              <button
                onClick={() => loadLeetCode()}
                disabled={isLoadingLc}
                className="text-slate-400 hover:text-white transition"
                title="Refresh LeetCode data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLc ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Handle Input & Sync */}
            <div className="flex gap-2">
              <input
                type="text"
                value={lcHandle}
                onChange={e => setLcHandle(e.target.value)}
                placeholder="LeetCode username..."
                className="flex-1 bg-[#080d19] border border-[#232c45] rounded-lg px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:border-[#FB923C]"
              />
              <button
                onClick={() => loadLeetCode(lcHandle)}
                disabled={isLoadingLc}
                className="px-3 py-1 rounded-lg bg-[#FB923C] hover:bg-[#fca566] text-black font-bangers text-xs border border-black transition"
              >
                Sync
              </button>
            </div>

            {/* Solved Counter & Breakdown */}
            <div className="space-y-3 pt-1">
              <div className="p-3 bg-[#080d19] rounded-xl border border-[#1b233a] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">TOTAL SOLVED</span>
                  <span className="font-bangers text-2xl text-white">
                    {lcData?.totalSolved ?? 0}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-bold">GLOBAL RANK</span>
                  <span className="font-mono text-sm text-[#38BDF8] font-bold">
                    #{lcData?.ranking?.toLocaleString() || '100,000+'}
                  </span>
                </div>
              </div>

              {/* Easy / Med / Hard Pills */}
              <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                <div className="p-2 rounded-lg bg-[#071d14] border border-[#10B981]/40">
                  <span className="text-[9px] text-slate-400 block font-bold">Easy</span>
                  <strong className="text-[#34D399]">{lcData?.easySolved ?? 0}</strong>
                </div>
                <div className="p-2 rounded-lg bg-[#241805] border border-[#FBBF24]/40">
                  <span className="text-[9px] text-slate-400 block font-bold">Medium</span>
                  <strong className="text-[#FBBF24]">{lcData?.mediumSolved ?? 0}</strong>
                </div>
                <div className="p-2 rounded-lg bg-[#240b10] border border-[#F43F5E]/40">
                  <span className="text-[9px] text-slate-400 block font-bold">Hard</span>
                  <strong className="text-[#F43F5E]">{lcData?.hardSolved ?? 0}</strong>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400">Acceptance Rate:</span>
                <span className="font-mono text-white font-bold">
                  {lcData?.acceptanceRate ? `${lcData.acceptanceRate}%` : '65.0%'}
                </span>
              </div>
            </div>
          </div>

          <a
            href={`https://leetcode.com/u/${lcHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-[#20150d] hover:bg-[#2b1b11] text-xs font-bold text-[#FB923C] border border-[#FB923C]/40 transition"
          >
            Open LeetCode Profile <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 4. IN-APP SAGA QUESTS & HOMEWORK MASTERY */}
      <div className="bg-[#0c101d] rounded-3xl border-2 border-[#1c243a] p-6 sm:p-8 shadow-comic-lg space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#1b233a]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBBF24] text-black font-bangers text-xs border border-black shadow-comic-sm mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              IN-APP QUEST & HOMEWORK MASTERY
            </div>
            <h2 className="font-bangers text-2xl sm:text-3xl text-white tracking-wide">
              YOUR IN-APP WORK & SOLVED TASKS
            </h2>
            <p className="text-xs text-slate-300">
              Live ledger of today’s 5:00 AM POTD, dynamic homework sets, and Bugsy extermination challenges.
            </p>
          </div>

          {/* Sub-Tabs for In-App Tasks */}
          <div className="flex gap-2">
            <button
              onClick={() => setInAppTab('today')}
              className={`px-3 py-1.5 rounded-xl font-bangers text-xs transition border-2 ${
                inAppTab === 'today'
                  ? 'bg-[#FBBF24] text-black border-black shadow-comic-sm'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              Today’s Quests
            </button>
            <button
              onClick={() => setInAppTab('solved')}
              className={`px-3 py-1.5 rounded-xl font-bangers text-xs transition border-2 ${
                inAppTab === 'solved'
                  ? 'bg-[#10B981] text-black border-black shadow-comic-sm'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              All Solved ({stats.solvedProblemIds.length})
            </button>
            <button
              onClick={() => setInAppTab('commits')}
              className={`px-3 py-1.5 rounded-xl font-bangers text-xs transition border-2 ${
                inAppTab === 'commits'
                  ? 'bg-[#38BDF8] text-black border-black shadow-comic-sm'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              Git Commits ({stats.gitCommits.length})
            </button>
            <button
              onClick={() => setInAppTab('passport')}
              className={`px-3 py-1.5 rounded-xl font-bangers text-xs transition border-2 flex items-center gap-1.5 ${
                inAppTab === 'passport'
                  ? 'bg-amber-400 text-black border-black shadow-comic-sm font-black'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Verified Passport
            </button>
            <button
              onClick={() => setInAppTab('radar')}
              className={`px-3 py-1.5 rounded-xl font-bangers text-xs transition border-2 flex items-center gap-1.5 ${
                inAppTab === 'radar'
                  ? 'bg-[#C084FC] text-black border-black shadow-comic-sm font-black'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Skill Radar & Certificate
            </button>
            <button
              onClick={() => setInAppTab('heatmap')}
              className={`px-3 py-1.5 rounded-xl font-bangers text-xs transition border-2 flex items-center gap-1.5 ${
                inAppTab === 'heatmap'
                  ? 'bg-emerald-400 text-black border-black shadow-comic-sm font-black'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Annual Heatmap
            </button>
          </div>
        </div>

        {/* In-App Tasks Quick Metrics HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* 5:00 AM POTD Status */}
          <div className="p-4 rounded-2xl bg-[#0f1424] border border-[#1c243a] shadow-comic-sm space-y-2">
            <div className="flex items-center justify-between">
              <Sun className="w-5 h-5 text-[#FBBF24]" />
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                  isPotdSolved
                    ? 'bg-[#071d14] text-[#34D399] border-[#10B981]/40'
                    : 'bg-[#241805] text-[#FBBF24] border-[#FBBF24]/40'
                }`}
              >
                {isPotdSolved ? 'SOLVED' : 'PENDING'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">5:00 AM POTD</span>
              <span className="font-bangers text-lg text-white truncate block">
                {scheduleState.potdProblem.title}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Reward: <strong className="text-[#FBBF24]">+50 XP & Git Push</strong>
            </div>
          </div>

          {/* Dynamic Homework Tracker */}
          <div className="p-4 rounded-2xl bg-[#0f1424] border border-[#1c243a] shadow-comic-sm space-y-2">
            <div className="flex items-center justify-between">
              <BookOpen className="w-5 h-5 text-[#38BDF8]" />
              {scheduleState.isWeekendRush && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#FB923C]/20 text-[#FB923C] border border-[#FB923C]/30">
                  +2 Weekend
                </span>
              )}
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">DAILY HOMEWORK</span>
              <span className="font-bangers text-lg text-white">
                {solvedHomeworkCount} / {scheduleState.homeworkQuota} Done
              </span>
            </div>
            <div className="w-full bg-[#080d19] h-2 rounded-full overflow-hidden border border-[#1b233a]">
              <div
                className="bg-[#38BDF8] h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(100, Math.round((solvedHomeworkCount / scheduleState.homeworkQuota) * 100))}%`,
                }}
              />
            </div>
          </div>

          {/* Bug Hunt Exterminations */}
          <div className="p-4 rounded-2xl bg-[#0f1424] border border-[#1c243a] shadow-comic-sm space-y-2">
            <div className="flex items-center justify-between">
              <Bug className="w-5 h-5 text-[#10B981]" />
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#071d14] text-[#34D399] border border-[#10B981]/40">
                ARENA
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">BUGSY BUGS HUNTED</span>
              <span className="font-bangers text-lg text-white">
                {stats.bugHuntDefeated.length} / 5 Exterminated
              </span>
            </div>
            <button
              onClick={() => setActiveTab('bughunt')}
              className="text-[10px] text-[#34D399] hover:underline font-bold"
            >
              Exterminate More &rarr;
            </button>
          </div>

          {/* Boss Mock Exam */}
          <div className="p-4 rounded-2xl bg-[#0f1424] border border-[#1c243a] shadow-comic-sm space-y-2">
            <div className="flex items-center justify-between">
              <Swords className="w-5 h-5 text-[#F43F5E]" />
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#240b10] text-[#F43F5E] border border-[#F43F5E]/40">
                FINAL BOSS
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">MOCK EXAM BOSS</span>
              <span className="font-bangers text-lg text-white truncate block">
                {stats.bossBeaten ? 'Bugsy Vanquished! 🏆' : 'Ready to Challenge'}
              </span>
            </div>
            <button
              onClick={() => setActiveTab('boss')}
              className="text-[10px] text-[#F43F5E] hover:underline font-bold"
            >
              {stats.bossBeaten ? 'Rematch Battle &rarr;' : 'Fight Boss &rarr;'}
            </button>
          </div>
        </div>

        {/* Tab 1: Today's Quests (POTD + Dynamic Homework) */}
        {inAppTab === 'today' && (
          <div className="space-y-4 pt-2">
            <h3 className="font-bangers text-xl text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#FBBF24]" />
              TODAY'S ACTIVE DAILY TASKS (5 AM POTD & HOMEWORK SET)
            </h3>

            {/* 5:00 AM POTD Hero Card */}
            <div className="p-5 rounded-2xl border-2 border-[#FBBF24]/60 bg-[#0f1424] shadow-comic-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FBBF24] text-black">
                    5:00 AM POTD
                  </span>
                  <span className="text-xs font-bold text-[#FBBF24] border border-[#FBBF24]/40 px-2 py-0.5 rounded">
                    {scheduleState.potdProblem.difficulty}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {scheduleState.potdProblem.category}
                  </span>
                </div>
                <h4 className="font-bangers text-2xl text-white">
                  {scheduleState.potdProblem.title}
                </h4>
                <p className="text-xs text-slate-300 max-w-xl line-clamp-1">
                  {scheduleState.potdProblem.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {isPotdSolved ? (
                  <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#071d14] text-[#34D399] font-bold text-xs border border-[#10B981]/40">
                    <CheckCircle2 className="w-4 h-4" />
                    Solved Today
                  </span>
                ) : (
                  <span className="text-xs text-amber-300 font-bold">Unsolved</span>
                )}

                <button
                  onClick={() => loadProblemInIDE(scheduleState.potdProblem)}
                  className="px-4 py-2 rounded-xl bg-[#FBBF24] hover:bg-[#f59e0b] text-black font-bangers text-xs border border-black shadow-comic-sm transition active:translate-y-0.5"
                >
                  {isPotdSolved ? 'Review in IDE' : 'Solve in IDE &rarr;'}
                </button>
              </div>
            </div>

            {/* Dynamic Homework List */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Dynamic Homework Set ({scheduleState.homeworkQuota} Assigned Today)
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scheduleState.homeworkProblems.map((hw, idx) => {
                  const isHwSolved = stats.solvedProblemIds.includes(hw.id);
                  return (
                    <div
                      key={hw.id}
                      className={`p-4 rounded-xl border flex items-center justify-between gap-3 transition ${
                        isHwSolved
                          ? 'bg-[#071c14] border-[#10B981]/50'
                          : 'bg-[#0f1424] border-[#1c243a] hover:border-[#38BDF8]'
                      }`}
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-slate-400">HW #{idx + 1}</span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              hw.difficulty === 'Easy'
                                ? 'bg-green-500/20 text-green-300'
                                : hw.difficulty === 'Medium'
                                ? 'bg-yellow-500/20 text-yellow-300'
                                : 'bg-red-500/20 text-red-300'
                            }`}
                          >
                            {hw.difficulty}
                          </span>
                        </div>
                        <h5 className="font-bold text-white text-sm truncate">{hw.title}</h5>
                        <span className="text-[11px] text-slate-400 font-mono block truncate">
                          {hw.category} • {hw.timeComplexity}
                        </span>
                      </div>

                      <div className="flex-shrink-0">
                        <button
                          onClick={() => loadProblemInIDE(hw)}
                          className={`px-3 py-1.5 rounded-lg font-bangers text-xs border border-black shadow-comic-sm transition ${
                            isHwSolved
                              ? 'bg-[#10B981] text-black hover:bg-[#34D399]'
                              : 'bg-[#38BDF8] text-black hover:bg-[#5bc8fa]'
                          }`}
                        >
                          {isHwSolved ? 'Review' : 'Solve'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: All In-App Solved Problems */}
        {inAppTab === 'solved' && (
          <div className="space-y-3 pt-2">
            <h3 className="font-bangers text-xl text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
              MASTERED IN-APP ALGORITHMIC CHALLENGES ({solvedProblemsList.length})
            </h3>

            {solvedProblemsList.length === 0 ? (
              <div className="p-8 text-center bg-[#0f1424] rounded-2xl border border-[#1c243a] space-y-3">
                <ByteAvatar size="md" mood="thinking" className="mx-auto" />
                <p className="text-xs text-slate-300">
                  No in-app problems solved yet! Head over to the Python IDE or today’s 5:00 AM POTD to earn your first solve!
                </p>
                <button
                  onClick={() => loadProblemInIDE(scheduleState.potdProblem)}
                  className="px-4 py-2 rounded-xl bg-[#FBBF24] text-black font-bangers text-xs border border-black shadow-comic-sm hover:bg-[#f59e0b]"
                >
                  Solve Today’s POTD Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {solvedProblemsList.map(prob => (
                  <div
                    key={prob.id}
                    className="p-4 rounded-xl bg-[#071c14] border border-[#10B981]/50 flex items-center justify-between gap-3 shadow-comic-sm"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#34D399]" />
                        <span className="font-bold text-white text-sm truncate">{prob.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-300 font-mono">
                        <span>{prob.category}</span>
                        <span>•</span>
                        <span className="text-[#FBBF24]">{prob.timeComplexity}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => loadProblemInIDE(prob)}
                      className="px-3 py-1.5 rounded-lg bg-[#10B981] text-black font-bangers text-xs border border-black shadow-comic-sm hover:bg-[#34D399]"
                    >
                      Review IDE
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Git Commit History */}
        {inAppTab === 'commits' && (
          <div className="space-y-3 pt-2">
            <h3 className="font-bangers text-xl text-white flex items-center gap-2">
              <GitCommitIcon className="w-5 h-5 text-[#38BDF8]" />
              DIRECT GIT COMMIT LOGS ({stats.gitCommits.length})
            </h3>

            {stats.gitCommits.length === 0 ? (
              <div className="p-8 text-center bg-[#0f1424] rounded-2xl border border-[#1c243a] text-xs text-slate-400">
                No Git commits recorded yet. Solved problems will automatically commit here with authentic SHA-1 hashes and push to GitHub!
              </div>
            ) : (
              <div className="space-y-2">
                {stats.gitCommits.map((cmt, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#0f1424] rounded-xl border border-[#1c243a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#FBBF24]">
                          {cmt.hash.slice(0, 8)}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(cmt.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-xs text-white font-medium truncate">{cmt.message}</p>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        File: {cmt.fileChanged}
                      </span>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#071d14] text-[#34D399] border border-[#10B981]/40 whitespace-nowrap">
                      Pushed & Recorded
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Skill Radar & Official Certificate */}
        {inAppTab === 'radar' && (
          <div className="pt-2 animate-fadeIn">
            <SkillRadarAndCertificate />
          </div>
        )}

        {/* Tab 5: Annual Habit & Git Commit Heatmap */}
        {inAppTab === 'heatmap' && (
          <div className="pt-2 animate-fadeIn">
            <ContributionHeatmap />
          </div>
        )}

        {/* Tab 6: Verified Developer Passport */}
        {inAppTab === 'passport' && (
          <div className="pt-2 animate-fadeIn">
            <DeveloperPassportCard />
          </div>
        )}
      </div>

      {/* Global Onboarding & Universal Identity Modal */}
      <GlobalOnboardingModal
        isOpen={showOnboardingModal}
        onClose={() => {
          setShowOnboardingModal(false);
          const p = getStoredUserProfile();
          if (p.githubUsername) setGithubUser(p.githubUsername);
          if (p.codeforcesHandle) setCfHandle(p.codeforcesHandle);
          if (p.leetcodeUsername) setLcHandle(p.leetcodeUsername);
          if (p.githubUsername) loadGitHub(p.githubUsername);
          if (p.codeforcesHandle) loadCodeforces(p.codeforcesHandle);
          if (p.leetcodeUsername) loadLeetCode(p.leetcodeUsername);
        }}
      />
    </div>
  );
};
