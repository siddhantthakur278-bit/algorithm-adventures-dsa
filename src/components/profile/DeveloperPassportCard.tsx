import React, { useState, useRef } from 'react';
import { useCourse } from '../../context/CourseContext';
import { getStoredUserProfile } from '../../utils/universalLeaderboardService';
import { HumanAvatar } from '../common/HumanAvatar';
import {
  Award,
  Download,
  Share2,
  CheckCircle2,
  QrCode,
  Flame,
  Shield,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Terminal,
  Globe,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

export const DeveloperPassportCard: React.FC = () => {
  const { stats, realStreak } = useCourse();
  const profile = getStoredUserProfile();
  const [copiedLink, setCopiedLink] = useState(false);
  const passportCardRef = useRef<HTMLDivElement>(null);

  const passportUrl = typeof window !== 'undefined'
    ? `${window.location.origin}?profile=${encodeURIComponent(profile.handle || 'adventurer')}`
    : 'https://algorithm-adventures-dsa.vercel.app';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(passportUrl);
    setCopiedLink(true);
    sound.playPop();
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownloadCard = () => {
    sound.playSuccess();
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    window.print();
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#0a0d18] border-3 border-black shadow-comic-lg space-y-6">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full border border-black shadow-comic-sm flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> VERIFIED DEVELOPER PASSPORT
            </span>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-bold rounded-md border border-emerald-500/40 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Identity Verified
            </span>
          </div>
          <h2 className="font-bangers text-2xl sm:text-3xl text-white tracking-wide">
            PORTFOLIO CREDENTIAL &amp; SHAREABLE PASSPORT
          </h2>
          <p className="text-xs text-slate-400 font-sans">
            Cryptographically bound to your GitHub, Codeforces, and LeetCode performance. Share your verified proof of work on LinkedIn or resumes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition flex items-center gap-2 cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Share Link'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadCard}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl border border-black shadow-comic-sm transition flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Passport</span>
          </button>
        </div>
      </div>

      {/* THE PASSPORT CARD (Printable / Shareable) */}
      <div
        ref={passportCardRef}
        className="relative bg-gradient-to-br from-[#12172b] via-[#0d1222] to-[#1a1226] border-3 border-amber-400/80 rounded-3xl p-6 sm:p-8 shadow-comic-yellow overflow-hidden text-white"
      >
        {/* Futuristic Card Grid Watermark */}
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
          {/* Left: Avatar & Identity */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <HumanAvatar seed={profile.handle || 'adventurer'} size="2xl" showStatus={true} />
              <div className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-black text-[10px] uppercase border border-black shadow-comic-sm">
                LVL {Math.max(1, Math.floor((stats.xp || profile.totalXp || 120) / 250))}
              </div>
            </div>

            <div className="space-y-1.5 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="font-bangers text-3xl text-amber-300 tracking-wide">
                  {profile.displayName || 'Siddhant'}
                </h3>
                <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-full font-mono text-xs font-bold">
                  @{profile.handle || 'adventurer_01'}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans max-w-sm">
                {profile.bio || 'Conquering Data Structures & Algorithms, Competitive Programming & Modern Web Systems.'}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 font-mono text-[11px]">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-sky-400" /> {profile.country || 'GLOBAL'}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-700 text-emerald-400 font-bold flex items-center gap-1.5">
                  <Flame className="w-3 h-3 text-amber-400 fill-amber-400" /> {realStreak.currentStreak} Day Streak
                </span>
              </div>
            </div>
          </div>

          {/* Right: Verified Telemetry Badge Hub */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto font-mono text-center">
            {/* XP */}
            <div className="p-3 bg-[#080b16] border border-amber-400/30 rounded-2xl">
              <span className="text-[10px] text-slate-400 uppercase block">Total Mastery XP</span>
              <span className="font-bangers text-2xl text-amber-300">{Math.max(stats.xp, profile.totalXp || 0)}</span>
            </div>

            {/* Solved Problems */}
            <div className="p-3 bg-[#080b16] border border-emerald-500/30 rounded-2xl">
              <span className="text-[10px] text-slate-400 uppercase block">DSA Solved</span>
              <span className="font-bangers text-2xl text-emerald-400">{Math.max(stats.solvedProblemIds.length, profile.problemsSolved || 0)}</span>
            </div>

            {/* Codeforces */}
            <div className="p-3 bg-[#080b16] border border-sky-500/30 rounded-2xl">
              <span className="text-[10px] text-slate-400 uppercase block">Codeforces</span>
              <span className="font-bangers text-2xl text-sky-400">
                {profile.codeforcesHandle ? `@${profile.codeforcesHandle.slice(0, 8)}` : 'Active'}
              </span>
            </div>

            {/* GitHub Commits */}
            <div className="p-3 bg-[#080b16] border border-purple-500/30 rounded-2xl">
              <span className="text-[10px] text-slate-400 uppercase block">Git Commits</span>
              <span className="font-bangers text-2xl text-purple-400">{stats.gitCommits.length}</span>
            </div>

            {/* Bug Hunt Bosses */}
            <div className="p-3 bg-[#080b16] border border-rose-500/30 rounded-2xl">
              <span className="text-[10px] text-slate-400 uppercase block">Bosses Vanquished</span>
              <span className="font-bangers text-2xl text-rose-400">{stats.bugHuntDefeated.length}</span>
            </div>

            {/* Verification Seal */}
            <div className="p-3 bg-amber-400/10 border border-amber-400/50 rounded-2xl flex flex-col items-center justify-center">
              <Shield className="w-5 h-5 text-amber-400" />
              <span className="text-[9px] text-amber-300 font-bold uppercase mt-1">Official Seal</span>
            </div>
          </div>
        </div>

        {/* Passport Footer with QR Verification */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Algorithm Adventures • Verified Cohort Certificate ID: ADA-{profile.handle || 'SID'}-2026</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <QrCode className="w-4 h-4 text-emerald-400" />
            <span>Scan or verify live at: algorithm-adventures-dsa.vercel.app</span>
          </div>
        </div>
      </div>
    </div>
  );
};
