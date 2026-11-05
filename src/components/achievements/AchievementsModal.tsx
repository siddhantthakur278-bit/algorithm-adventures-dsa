import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import {
  COMPREHENSIVE_ACHIEVEMENTS,
  AchievementCategory,
  AchievementItem,
} from '../../data/achievementsData';
import {
  Trophy,
  X,
  Sparkles,
  Lock,
  CheckCircle2,
  Filter,
  Flame,
  Award,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { stats } = useCourse();
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'All'>('All');
  const [filterUnlockedOnly, setFilterUnlockedOnly] = useState<boolean>(false);

  if (!isOpen) return null;

  const unlockedIds = stats.badges || [];
  const totalCount = COMPREHENSIVE_ACHIEVEMENTS.length;
  const unlockedCount = COMPREHENSIVE_ACHIEVEMENTS.filter(a => unlockedIds.includes(a.id)).length;
  const totalScore = COMPREHENSIVE_ACHIEVEMENTS.filter(a => unlockedIds.includes(a.id)).reduce(
    (sum, a) => sum + a.xpReward,
    0
  );

  const categories: (AchievementCategory | 'All')[] = [
    'All',
    'Streaks',
    'Coding & Git',
    'DSA Mastery',
    'Web Dev Universe',
    'SQL & Prisma',
    'Linear Algebra',
    'Boss & Combat',
  ];

  const filteredAchievements = COMPREHENSIVE_ACHIEVEMENTS.filter(a => {
    if (selectedCategory !== 'All' && a.category !== selectedCategory) return false;
    if (filterUnlockedOnly && !unlockedIds.includes(a.id)) return false;
    return true;
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze':
        return 'text-amber-600 bg-amber-950/40 border-amber-700/50';
      case 'Silver':
        return 'text-slate-300 bg-slate-800/40 border-slate-500/50';
      case 'Gold':
        return 'text-yellow-400 bg-yellow-950/40 border-yellow-500/50';
      case 'Diamond':
        return 'text-cyan-400 bg-cyan-950/40 border-cyan-400/50';
      case 'Legendary':
        return 'text-purple-400 bg-purple-950/40 border-purple-400/50';
      default:
        return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0e1220] border-4 border-black rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-comic-lg overflow-hidden text-slate-100">
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#151c36] via-[#1d274c] to-[#12162a] border-b-2 border-black flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-black border-2 border-black shadow-comic-sm flex items-center justify-center text-2xl font-bangers shrink-0">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bangers text-2xl sm:text-3xl text-white tracking-wide">
                  ACHIEVEMENTS &amp; TROPHIES VAULT
                </h2>
                <span className="px-2.5 py-0.5 bg-amber-400/20 text-amber-300 font-bold text-xs rounded border border-amber-400/40">
                  {unlockedCount} / {totalCount} Unlocked
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Gamer Score: <strong className="text-amber-400">{totalScore} XP</strong> earned from comic achievements
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-[#1b223a] hover:bg-rose-900 text-slate-300 hover:text-white border border-[#2d3a5e] flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills Strip */}
        <div className="p-3 bg-[#0a0d18] border-b border-[#1c243c] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap gap-1.5 overflow-x-auto py-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  sound.playPop();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-black shadow-comic-sm'
                    : 'bg-[#141b30] text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filterUnlockedOnly}
              onChange={e => setFilterUnlockedOnly(e.target.checked)}
              className="rounded text-amber-400 focus:ring-0 cursor-pointer"
            />
            <span>Unlocked Only</span>
          </label>
        </div>

        {/* Achievements Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 max-h-[60vh] bg-[#090c16]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAchievements.map(ach => {
              const isUnlocked = unlockedIds.includes(ach.id);

              return (
                <div
                  key={ach.id}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-4 ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-[#121933] to-[#0d1226] border-amber-400/60 shadow-comic-sm'
                      : 'bg-[#0b0e1a]/80 border-[#1a2238] opacity-75'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center text-2xl shrink-0 ${
                      isUnlocked
                        ? 'bg-amber-400/20 border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.25)]'
                        : 'bg-[#101426] border-slate-700 grayscale'
                    }`}
                  >
                    {ach.icon}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bangers text-base text-white tracking-wide">
                        {ach.title}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${getTierColor(
                          ach.tier
                        )}`}
                      >
                        {ach.tier}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-snug">{ach.description}</p>

                    <div className="pt-2 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 italic">
                        {isUnlocked ? 'Unlocked' : `Goal: ${ach.conditionDescription}`}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-amber-400 font-mono">+{ach.xpReward} XP</span>
                        {isUnlocked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-slate-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#121628] border-t-2 border-black flex items-center justify-between text-xs text-slate-400">
          <span>Complete daily POTD, dynamic homework, and coding problems to unlock all badges!</span>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="px-5 py-1.5 bg-[#FBBF24] hover:bg-amber-300 text-black font-bangers rounded-xl border border-black shadow-comic-sm cursor-pointer"
          >
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
};
