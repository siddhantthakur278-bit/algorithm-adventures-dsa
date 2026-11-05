import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PythonDsaChapter } from '../../types/pythonDsaTypes';
import { pythonDsaChapters } from '../../data/pythonDsaData';
import { SidAvatar } from '../characters/Characters';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Lock, Check, Gift, Sparkles, Star, ChevronRight } from 'lucide-react';

interface SagaWorldMapProps {
  selectedChapterId: number;
  completedChapters: number[];
  onSelectChapter: (id: number) => void;
  onOpenChest?: (chestId: string) => void;
}

export const SagaWorldMap: React.FC<SagaWorldMapProps> = ({
  selectedChapterId,
  completedChapters,
  onSelectChapter,
}) => {
  const [openedChests, setOpenedChests] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('ada_pydsa_chests') || '[]');
    } catch {
      return [];
    }
  });

  const [lootModal, setLootModal] = useState<{
    title: string;
    item: string;
    xp: number;
  } | null>(null);

  const handleChestClick = (chestId: string, minChapter: number, title: string, item: string) => {
    if (!completedChapters.includes(minChapter)) {
      sound.playError();
      return;
    }
    if (openedChests.includes(chestId)) {
      sound.playPop();
      return;
    }

    sound.playChestOpen();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FBBF24', '#10B981', '#38BDF8', '#F43F5E'],
    });

    const next = [...openedChests, chestId];
    setOpenedChests(next);
    localStorage.setItem('ada_pydsa_chests', JSON.stringify(next));

    setLootModal({ title, item, xp: 200 });
  };

  const chapterIcons = [
    '⛺', // 0: Welcome
    '🧪', // 1: Power-up
    '🎪', // 2: Containers
    '🦁', // 3: Big-O Safari
    '🏃', // 4: Two Pointers
    '🪞', // 5: Recursion
    '🔍', // 6: Search
    '🎪', // 7: Sorting
    '🚂', // 8: Linked Lists
    '🥞', // 9: Stacks
    '🏦', // 10: Queues
    '🗝️', // 11: Hashing
    '🌳', // 12: Trees
    '🏥', // 13: Heaps
    '🚇', // 14: Graphs & DP
  ];

  return (
    <div className="bg-[#0b1320] border-3 border-black rounded-3xl p-6 sm:p-8 shadow-comic relative overflow-hidden space-y-8">
      {/* Halftone & Ambient Biome Glows */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#10B981] text-black font-bangers text-xs border border-black shadow-comic-sm">
              RPG Saga Overworld Map
            </span>
            <span className="text-xs font-mono text-emerald-300 font-bold">
              {completedChapters.length} / {pythonDsaChapters.length} Stations Conquered
            </span>
          </div>
          <h2 className="font-bangers text-2xl sm:text-4xl text-white tracking-wide mt-1">
            THE 30-DAY MISSION MAP
          </h2>
          <p className="text-xs text-slate-400">
            Follow the winding comic quest path. Each station unlocks as you complete its prerequisite!
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-mono bg-[#070e17] px-3 py-1.5 rounded-xl border border-[#1b2b40]">
          <span className="flex items-center gap-1 text-emerald-400">
            <Check className="w-3.5 h-3.5" /> Completed
          </span>
          <span className="flex items-center gap-1 text-[#FBBF24]">
            <Star className="w-3.5 h-3.5 fill-current" /> Active
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <Lock className="w-3.5 h-3.5" /> Locked
          </span>
        </div>
      </div>

      {/* Winding Map Pathway Container */}
      <div className="relative py-8 px-2 max-w-4xl mx-auto">
        <div className="space-y-12 relative">
          {pythonDsaChapters.map((chap, idx) => {
            const isUnlocked = chap.id <= 1 || completedChapters.includes(chap.id - 1);
            const isCompleted = completedChapters.includes(chap.id);
            const isCurrent = chap.id === selectedChapterId;
            const icon = chapterIcons[chap.id] || '📖';

            // Zigzag alignment for Mario-style winding trail
            const isLeft = idx % 2 === 0;

            // Milestones for Loot Chests
            const hasChest = [0, 5, 10, 14].includes(chap.id);
            const chestId = `chest-ch-${chap.id}`;
            const isChestOpen = openedChests.includes(chestId);

            return (
              <div key={chap.id} className="relative">
                {/* Connecting Trail Line between nodes */}
                {idx < pythonDsaChapters.length - 1 && (
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 top-16 w-1 h-14 border-l-3 border-dashed z-0 ${
                      isCompleted ? 'border-[#10B981]' : 'border-[#1e3048]'
                    }`}
                  />
                )}

                <div
                  className={`flex items-center gap-4 sm:gap-6 ${
                    isLeft ? 'flex-row' : 'flex-row-reverse'
                  } justify-center`}
                >
                  {/* Interactive Chapter Node Button */}
                  <div className="relative z-10">
                    {/* Sid Avatar Standing on Active Node */}
                    {isCurrent && (
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: [ -22, -28, -22 ], opacity: 1 }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30"
                      >
                        <span className="px-2 py-0.2 bg-[#FBBF24] text-black font-bangers text-[9px] rounded-full border border-black shadow-comic-sm whitespace-nowrap mb-0.5">
                          YOU ARE HERE!
                        </span>
                        <SidAvatar size="sm" mood="happy" />
                      </motion.div>
                    )}

                    <motion.button
                      whileHover={isUnlocked ? { scale: 1.1, rotate: isLeft ? 3 : -3 } : {}}
                      whileTap={isUnlocked ? { scale: 0.95 } : {}}
                      disabled={!isUnlocked}
                      onClick={() => {
                        sound.playPop();
                        onSelectChapter(chap.id);
                      }}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl border-3 flex flex-col items-center justify-center transition-all cursor-pointer relative shadow-comic ${
                        !isUnlocked
                          ? 'bg-[#08101a] border-[#152336] text-slate-600 opacity-60 cursor-not-allowed'
                          : isCurrent
                          ? 'bg-[#10B981] border-black text-black font-extrabold shadow-comic-lg ring-4 ring-[#10B981]/40'
                          : isCompleted
                          ? 'bg-[#0b291d] border-[#10B981] text-emerald-300'
                          : 'bg-[#121f31] border-[#253d5e] text-white hover:border-[#FBBF24]'
                      }`}
                    >
                      <span className="text-xl sm:text-2xl leading-none">{icon}</span>
                      <span className="text-[10px] sm:text-xs font-bangers mt-1">
                        Ch. {chap.id}
                      </span>

                      {/* Status Badges */}
                      {isCompleted && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#10B981] text-black border border-black flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                      )}
                      {!isUnlocked && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-800 text-slate-400 border border-black flex items-center justify-center text-[10px]">
                          <Lock className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </motion.button>
                  </div>

                  {/* Chapter Info Card */}
                  <div
                    onClick={() => isUnlocked && onSelectChapter(chap.id)}
                    className={`max-w-xs sm:max-w-sm p-4 rounded-2xl border-2 transition cursor-pointer ${
                      isCurrent
                        ? 'bg-[#122336] border-[#10B981] shadow-comic'
                        : isUnlocked
                        ? 'bg-[#070e17] border-[#17273d] hover:border-[#10B981]/60'
                        : 'bg-[#050a11] border-[#101b2a] opacity-50 cursor-not-allowed'
                    } ${isLeft ? 'text-left' : 'text-right'}`}
                  >
                    <div className={`flex items-center gap-2 ${isLeft ? 'justify-start' : 'justify-end'}`}>
                      <span className="text-[10px] font-mono text-[#FBBF24] font-bold">
                        {chap.numberLabel}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{chap.timeEstimate}</span>
                    </div>

                    <h4 className="font-bangers text-base sm:text-lg text-white tracking-wide mt-0.5">
                      {chap.title}
                    </h4>

                    <p className="text-[11px] text-slate-400 font-sans line-clamp-1 mt-0.5">
                      {chap.subtitle}
                    </p>

                    {/* Star Rating on Completion */}
                    {isCompleted && (
                      <div className={`flex items-center gap-1 mt-1.5 text-amber-400 text-xs ${isLeft ? 'justify-start' : 'justify-end'}`}>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span className="text-[10px] font-mono text-emerald-400 ml-1 font-bold">Conquered!</span>
                      </div>
                    )}
                  </div>

                  {/* Milestone Treasure Chest */}
                  {hasChest && (
                    <motion.button
                      whileHover={{ scale: 1.15, rotate: 6 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        handleChestClick(
                          chestId,
                          chap.id,
                          `Chapter ${chap.id} Milestone Chest`,
                          chap.id === 0
                            ? 'Pythonic Beginner Scroll'
                            : chap.id === 5
                            ? 'Recursion Tree Compass'
                            : chap.id === 10
                            ? 'LIFO/FIFO Master Badge'
                            : 'Grandmaster Algorithm Crown'
                        )
                      }
                      className={`p-2.5 rounded-2xl border-2 cursor-pointer transition ${
                        isChestOpen
                          ? 'bg-[#1b2210] border-amber-500/50 text-amber-400'
                          : isCompleted
                          ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-black border-black shadow-comic animate-bounce'
                          : 'bg-[#09111c] border-[#18283d] text-slate-600 cursor-not-allowed opacity-50'
                      }`}
                      title={
                        isChestOpen
                          ? 'Chest Claimed!'
                          : isCompleted
                          ? 'Click to Open Milestone Chest!'
                          : 'Complete chapter to unlock chest'
                      }
                    >
                      <Gift className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Loot Reward Modal */}
      {lootModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0b1320] border-3 border-[#FBBF24] rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-comic-lg text-white"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#FBBF24] text-black text-3xl font-bangers flex items-center justify-center mx-auto border-2 border-black shadow-comic-sm">
              🎁
            </div>
            <h3 className="font-bangers text-2xl text-white">{lootModal.title}</h3>
            <p className="text-xs text-slate-300 font-mono">You unlocked the rare artifact:</p>
            <div className="p-3 bg-[#070e17] rounded-xl border border-amber-500/40 text-amber-300 font-bangers text-lg">
              ✨ {lootModal.item}
            </div>
            <span className="inline-block px-3 py-1 bg-emerald-950 text-emerald-300 font-mono text-xs rounded-full border border-emerald-500/40 font-bold">
              +{lootModal.xp} Bonus Saga XP
            </span>

            <div className="pt-2">
              <button
                onClick={() => setLootModal(null)}
                className="w-full py-2.5 rounded-xl bg-[#FBBF24] hover:bg-amber-400 text-black font-bangers text-sm border-2 border-black shadow-comic-sm cursor-pointer"
              >
                Claim & Continue ➔
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
