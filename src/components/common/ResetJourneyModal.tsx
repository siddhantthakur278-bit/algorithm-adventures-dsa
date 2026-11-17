import React, { useState } from 'react';
import {
  RotateCcw,
  X,
  AlertTriangle,
  Sparkles,
  Check,
  ShieldAlert,
  Flame,
  Trophy,
  Zap,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useCourse } from '../../context/CourseContext';
import { getStoredUserProfile } from '../../utils/universalLeaderboardService';
import { sound } from '../../utils/soundEffects';

interface ResetJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResetJourneyModal: React.FC<ResetJourneyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { stats, resetJourney, setActiveTab } = useCourse();
  const profile = getStoredUserProfile();

  const [keepIdentity, setKeepIdentity] = useState<boolean>(true);
  const [keepGitConfig, setKeepGitConfig] = useState<boolean>(true);
  const [confirmationWord, setConfirmationWord] = useState<string>('');
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleConfirmReset = () => {
    if (confirmationWord.trim().toUpperCase() !== 'RESET') {
      sound.playThud?.();
      return;
    }

    sound.playPop();
    setIsResetting(true);

    setTimeout(() => {
      resetJourney({ keepIdentity, keepGitConfig });
      setIsResetting(false);
      setIsDone(true);

      setTimeout(() => {
        setIsDone(false);
        setConfirmationWord('');
        onClose();
        setActiveTab('quest');
      }, 1400);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-[#0b0e1b] border border-red-500/30 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col relative">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-red-950/20 border-b border-red-500/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5 animate-spin-reverse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Reset Journey &amp; Start with 0 XP
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Wipe all completed problems, XP, and streaks for a 100% fresh start
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              setConfirmationWord('');
              onClose();
            }}
            className="p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white border border-white/10 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        {isDone ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center text-3xl animate-bounce">
              ⚡
            </div>
            <h4 className="text-lg font-bold text-white">
              Journey Reset to 0 XP!
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Welcome back to Day 1, Adventurer. Your journey starts now with a clean slate.
            </p>
          </div>
        ) : (
          <div className="p-4 sm:p-6 space-y-4 text-xs">
            {/* Current Balance Notice */}
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-400">Current Progress to be Reset:</span>
                <div className="flex items-center gap-3 font-mono font-bold text-sm text-white">
                  <span className="text-amber-300">⚡ {stats.xp.toLocaleString()} XP</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-orange-400">🔥 {stats.streakCount} days</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-400">✅ {stats.solvedProblemIds.length} Solved</span>
                </div>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-red-500/15 text-red-400 border border-red-500/30 font-bold">
                → 0 XP
              </span>
            </div>

            {/* Checklist of What Gets Reset */}
            <div className="space-y-2 p-3.5 rounded-2xl bg-red-950/15 border border-red-500/20 text-slate-300">
              <h5 className="font-bold text-white flex items-center gap-1.5 text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>What will happen upon reset:</span>
              </h5>
              <ul className="space-y-1.5 text-[11px] text-slate-300 pl-1">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>XP balance will be set strictly to <strong>0 XP</strong> (Level 1).</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>All solved problems in the Problem Library and Striver's A2Z Sheet will be cleared.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>Daily POTD streak, homework history, and badges will be reset to Day 1.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>World Leaderboard score will immediately reflect <strong>0 XP</strong>.</span>
                </li>
              </ul>
            </div>

            {/* Options Toggle */}
            <div className="space-y-2.5 pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer text-slate-300 hover:text-white transition">
                <input
                  type="checkbox"
                  checked={keepIdentity}
                  onChange={(e) => setKeepIdentity(e.target.checked)}
                  className="rounded border-slate-700 text-amber-400 focus:ring-0 focus:ring-offset-0 bg-slate-900 cursor-pointer"
                />
                <span>
                  Keep my username and avatar (<strong>@{profile.handle}</strong>)
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-slate-300 hover:text-white transition">
                <input
                  type="checkbox"
                  checked={keepGitConfig}
                  onChange={(e) => setKeepGitConfig(e.target.checked)}
                  className="rounded border-slate-700 text-amber-400 focus:ring-0 focus:ring-offset-0 bg-slate-900 cursor-pointer"
                />
                <span>Keep my GitHub direct-commit sync configuration</span>
              </label>
            </div>

            {/* Safety Confirmation Word Input */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="block text-[11px] text-slate-400">
                To prevent accidental resets, type <strong className="text-red-400 font-mono">RESET</strong> below:
              </label>
              <input
                type="text"
                value={confirmationWord}
                onChange={(e) => setConfirmationWord(e.target.value)}
                placeholder="Type RESET here..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 focus:border-red-500 focus:outline-none text-white font-mono text-xs uppercase tracking-wider transition"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setConfirmationWord('');
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white font-semibold transition cursor-pointer"
              >
                Cancel &amp; Keep Progress
              </button>

              <button
                type="button"
                onClick={handleConfirmReset}
                disabled={confirmationWord.trim().toUpperCase() !== 'RESET' || isResetting}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold transition cursor-pointer shadow-lg shadow-red-950/50"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
                <span>{isResetting ? 'Resetting to 0 XP...' : 'Confirm Reset to 0 XP'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
