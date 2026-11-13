import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Globe,
  Trophy,
  CheckCircle2,
  Calendar,
  Flame,
  Zap,
  Rocket,
  Shield,
  ArrowRight,
  User,
  ExternalLink,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import {
  UniversalUserProfile,
  getStoredUserProfile,
  saveUniversalProfile,
} from '../../utils/universalLeaderboardService';
import { useCourse } from '../../context/CourseContext';
import { sound } from '../../utils/soundEffects';

interface GlobalOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInitialWelcome?: boolean;
}

export const GlobalOnboardingModal: React.FC<GlobalOnboardingModalProps> = ({
  isOpen,
  onClose,
  isInitialWelcome = false,
}) => {
  const { stats, realStreak, scheduleState, resetCohortToToday, updateCohortConfig } = useCourse();

  const [formData, setFormData] = useState<UniversalUserProfile>(() => getStoredUserProfile());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const p = getStoredUserProfile();
      setFormData({
        ...p,
        totalXp: Math.max(p.totalXp, stats.xp),
        problemsSolved: Math.max(p.problemsSolved, stats.solvedProblemIds.length),
        streakDays: Math.max(p.streakDays, realStreak.currentStreak),
        activeDay: scheduleState.dayNumber || 1,
      });
      setStatusMessage(null);
    }
  }, [isOpen, stats.xp, stats.solvedProblemIds.length, realStreak.currentStreak, scheduleState.dayNumber]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('Connecting to GitHub, Codeforces & syncing leaderboard...');

    // Apply schedule mode to CourseContext if changed
    if (formData.cohortMode === 'self_paced') {
      updateCohortConfig({ isUnlockedAll: true, mode: 'self_paced' });
    } else if (formData.cohortMode === 'manual_day') {
      updateCohortConfig({ mode: 'manual_day', manualDayNumber: formData.activeDay });
    }

    const res = await saveUniversalProfile({
      ...formData,
      totalXp: Math.max(formData.totalXp, stats.xp),
      problemsSolved: Math.max(formData.problemsSolved, stats.solvedProblemIds.length),
      streakDays: Math.max(formData.streakDays, realStreak.currentStreak),
    });

    setIsSubmitting(false);
    if (res.success) {
      sound.playCelebration();
      setStatusMessage(res.message || 'Profile saved successfully!');
      setTimeout(() => {
        onClose();
      }, 1200);
    } else {
      setStatusMessage(`Error: ${res.message}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#0d1326] via-[#101730] to-[#0a0e1c] border-3 border-amber-400/80 rounded-3xl p-6 sm:p-8 shadow-comic-lg text-slate-200 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        {!isInitialWelcome && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-[#1b2542] hover:bg-[#253359] text-slate-300 hover:text-white border border-[#2d3d6b] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Modal Header */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider border-2 border-black shadow-comic-sm">
            <Globe className="w-3.5 h-3.5" />
            {isInitialWelcome ? 'Welcome New Adventurer!' : 'Universal Adventurer Profile'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bangers text-white tracking-wide">
            {isInitialWelcome
              ? 'CLAIM YOUR UNIVERSAL DSA PASSPORT'
              : 'EDIT WORLD LEADERBOARD IDENTITY'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Fill your handles below to show your live <strong>GitHub commits</strong>, <strong>Codeforces rating</strong>, and rank alongside competitive coders across the globe!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Section 1: Core Identity */}
          <div className="p-4 rounded-2xl bg-[#131b35] border border-[#223059] space-y-4">
            <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> 1. Adventurer Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Global Handle <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-500">@</span>
                  <input
                    type="text"
                    required
                    value={formData.handle}
                    onChange={(e) =>
                      setFormData({ ...formData, handle: e.target.value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '') })
                    }
                    placeholder="algo_ninja"
                    className="w-full pl-7 pr-3 py-2 rounded-xl bg-[#090d1a] border border-[#2b3a67] text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <span className="text-[10px] text-slate-400">Unique identifier on the world leaderboard</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Display Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  placeholder="Alex Chen"
                  className="w-full px-3 py-2 rounded-xl bg-[#090d1a] border border-[#2b3a67] text-white text-xs focus:border-amber-400 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400">Your name shown on certificates & rankings</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Country / Region (2-letter code)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value.toUpperCase() })}
                  placeholder="US, IN, JP, DE, BR"
                  className="w-full px-3 py-2 rounded-xl bg-[#090d1a] border border-[#2b3a67] text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Bio / Motivation
                </label>
                <input
                  type="text"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Mastering Dynamic Programming in 30 days!"
                  className="w-full px-3 py-2 rounded-xl bg-[#090d1a] border border-[#2b3a67] text-white text-xs focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: External Coding Handles */}
          <div className="p-4 rounded-2xl bg-[#131b35] border border-[#223059] space-y-4">
            <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> 2. Live Competitive &amp; Git Handles
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* GitHub */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                  <GithubIcon className="w-3.5 h-3.5 text-slate-400" /> GitHub Handle
                </label>
                <input
                  type="text"
                  value={formData.githubUsername}
                  onChange={(e) => setFormData({ ...formData, githubUsername: e.target.value.trim() })}
                  placeholder="octocat"
                  className="w-full px-3 py-2 rounded-xl bg-[#090d1a] border border-[#2b3a67] text-white text-xs font-mono focus:border-sky-400 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400">Pulls public avatar &amp; repos</span>
              </div>

              {/* Codeforces */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" /> Codeforces Handle
                </label>
                <input
                  type="text"
                  value={formData.codeforcesHandle}
                  onChange={(e) => setFormData({ ...formData, codeforcesHandle: e.target.value.trim() })}
                  placeholder="tourist"
                  className="w-full px-3 py-2 rounded-xl bg-[#090d1a] border border-[#2b3a67] text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400">Live rating, rank &amp; title</span>
              </div>

              {/* LeetCode */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-400" /> LeetCode Handle
                </label>
                <input
                  type="text"
                  value={formData.leetcodeUsername}
                  onChange={(e) => setFormData({ ...formData, leetcodeUsername: e.target.value.trim() })}
                  placeholder="leet_master"
                  className="w-full px-3 py-2 rounded-xl bg-[#090d1a] border border-[#2b3a67] text-white text-xs font-mono focus:border-orange-400 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400">DSA profile reference</span>
              </div>
            </div>
          </div>

          {/* Section 3: Study Pacing & Schedule */}
          <div className="p-4 rounded-2xl bg-[#131b35] border border-[#223059] space-y-3">
            <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> 3. Your Personal Study Pacing
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, cohortMode: 'automatic', activeDay: 1 });
                  sound.playPop();
                }}
                className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                  formData.cohortMode === 'automatic'
                    ? 'bg-amber-400 text-slate-950 border-slate-900 shadow-comic-sm font-bold'
                    : 'bg-[#090d1a] text-slate-300 border-[#2b3a67] hover:bg-[#12192e]'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-black">
                  <Rocket className="w-3.5 h-3.5" /> Start Today (Day 1)
                </div>
                <div className="text-[10px] opacity-80 mt-1">
                  Automatic daily progression from today onwards.
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, cohortMode: 'self_paced' });
                  sound.playPop();
                }}
                className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                  formData.cohortMode === 'self_paced'
                    ? 'bg-purple-600 text-white border-purple-400 shadow-comic-sm font-bold'
                    : 'bg-[#090d1a] text-slate-300 border-[#2b3a67] hover:bg-[#12192e]'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-black">
                  <Zap className="w-3.5 h-3.5 text-amber-300" /> Self-Paced
                </div>
                <div className="text-[10px] opacity-80 mt-1">
                  Unlock all POTDs and tasks with zero waiting.
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, cohortMode: 'manual_day' });
                  sound.playPop();
                }}
                className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                  formData.cohortMode === 'manual_day'
                    ? 'bg-sky-500 text-slate-950 border-slate-900 shadow-comic-sm font-bold'
                    : 'bg-[#090d1a] text-slate-300 border-[#2b3a67] hover:bg-[#12192e]'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-black">
                  <Shield className="w-3.5 h-3.5" /> Pick Day (1–30)
                </div>
                <div className="text-[10px] opacity-80 mt-1">
                  Directly choose which day's problem set to solve.
                </div>
              </button>
            </div>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-[11px] text-slate-400">
              Your details are instantly saved locally and shared to the global leaderboard.
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider border-2 border-slate-900 shadow-comic flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  {isInitialWelcome ? 'Launch My Adventure →' : 'Save & Sync Leaderboard'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
