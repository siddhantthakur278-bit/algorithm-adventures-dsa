import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pythonDsaChapters } from '../../data/pythonDsaData';
import { BuggyAvatar, SidAvatar } from '../characters/Characters';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Hammer, ShieldCheck, Flame, RotateCcw, Trophy, Sparkles } from 'lucide-react';

interface MythCard {
  id: string;
  statement: string;
  isMyth: boolean; // true if it is a bogus myth, false if it's a verified truth
  explanation: string;
}

export const MythSmasherArcade: React.FC = () => {
  // Pre-generate pool of myth/truth cards
  const [mythPool] = useState<MythCard[]>(() => {
    const list: MythCard[] = [];
    pythonDsaChapters.forEach(c => {
      c.mythBusters.forEach(mb => {
        // Add the myth statement
        list.push({
          id: mb.id,
          statement: mb.myth,
          isMyth: true,
          explanation: mb.truth,
        });
      });
    });

    // Add some verified algorithmic truths
    list.push(
      {
        id: 'truth-1',
        statement: 'collections.deque offers O(1) popleft() and appendleft() via circular blocks.',
        isMyth: false,
        explanation: 'True! Deque uses double-ended blocks avoiding the O(N) shift of standard list.pop(0).',
      },
      {
        id: 'truth-2',
        statement: 'Timsort runs in O(N) linear time on nearly-sorted data.',
        isMyth: false,
        explanation: 'True! Python Timsort identifies natural ascending runs to complete in O(N).',
      },
      {
        id: 'truth-3',
        statement: 'Tuples are immutable; you cannot modify elements in-place after creation.',
        isMyth: false,
        explanation: 'True! Tuples guarantee fixed length and contents, making hashable keys possible.',
      },
      {
        id: 'truth-4',
        statement: 'Binary search requires the input array to be strictly sorted or monotonic.',
        isMyth: false,
        explanation: 'True! The divide-and-conquer invariant fails if the target range is not ordered.',
      },
      {
        id: 'truth-5',
        statement: 'In Python, default function arguments are evaluated once at definition time, not call time.',
        isMyth: false,
        explanation: 'True! def f(x=[]): causes persistent shared state across invocations.',
      }
    );

    // Shuffle pool
    return list.sort(() => Math.random() - 0.5);
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('ada_mythsmasher_hi') || 0);
    } catch {
      return 0;
    }
  });

  const [hammerActive, setHammerActive] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    status: 'correct' | 'wrong';
    text: string;
    points: number;
  } | null>(null);

  const currentCard = mythPool[currentIndex % mythPool.length];

  const handleDecision = (userGuessedMyth: boolean) => {
    if (feedback) return;

    const isCorrect = userGuessedMyth === currentCard.isMyth;

    if (userGuessedMyth) {
      // Trigger comic hammer animation
      setHammerActive(true);
      sound.playWhack();
      setTimeout(() => setHammerActive(false), 400);
    }

    if (isCorrect) {
      const newCombo = combo + 1;
      const points = 100 * newCombo;
      const newScore = score + points;
      setScore(newScore);
      setCombo(newCombo);

      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('ada_mythsmasher_hi', String(newScore));
      }

      sound.playCoin();
      sound.playCombo(newCombo);
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.65 },
        colors: ['#FBBF24', '#10B981', '#F43F5E'],
      });

      setFeedback({
        status: 'correct',
        text: userGuessedMyth ? '💥 SMASHED! BOGUS MYTH DESTROYED!' : '🛡️ VERIFIED! TRUTH PROTECTED!',
        points,
      });
    } else {
      setCombo(0);
      sound.playError();
      setFeedback({
        status: 'wrong',
        text: userGuessedMyth ? '❌ OOPS! THAT WAS ACTUALLY A FACT!' : '❌ OOPS! THAT WAS A DANGEROUS MYTH!',
        points: 0,
      });
    }
  };

  const nextCard = () => {
    setFeedback(null);
    setCurrentIndex(i => i + 1);
    sound.playPop();
  };

  const resetGame = () => {
    sound.playPop();
    setScore(0);
    setCombo(0);
    setFeedback(null);
    setCurrentIndex(0);
  };

  return (
    <div className="bg-[#0b1320] border-3 border-black rounded-3xl p-6 sm:p-8 shadow-comic relative overflow-hidden space-y-6">
      {/* Background Halftone Glow */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-gradient-to-b from-[#F43F5E]/15 to-transparent blur-3xl pointer-events-none" />

      {/* Arcade Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#FBBF24] text-black font-bangers text-xs border border-black shadow-comic-sm">
              Arcade Mini-Game
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              Card {currentIndex + 1} / {mythPool.length}
            </span>
          </div>
          <h2 className="font-bangers text-2xl sm:text-4xl text-white tracking-wide mt-1">
            BUGGY'S MYTH SMASHER
          </h2>
          <p className="text-xs text-slate-400">
            Is Buggy holding a bogus myth or a genuine Python truth? Smash the myths with your comic hammer!
          </p>
        </div>

        {/* Gamified Scoreboard */}
        <div className="flex items-center gap-3 bg-[#070e17] px-4 py-2.5 rounded-2xl border-2 border-[#1c2e44] shadow-comic-sm shrink-0">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">SCORE</span>
            <span className="font-bangers text-xl text-[#FBBF24] leading-none">{score}</span>
          </div>
          <div className="h-7 w-[1px] bg-[#1a2b3f]" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">HIGH SCORE</span>
            <span className="font-bangers text-xl text-emerald-400 leading-none">{highScore}</span>
          </div>
          {combo > 1 && (
            <div className="ml-1 pl-2 border-l border-[#1a2b3f] flex items-center gap-1 text-[#F43F5E] animate-pulse">
              <Flame className="w-4 h-4 fill-current" />
              <span className="font-bangers text-lg">x{combo}</span>
            </div>
          )}
        </div>
      </div>

      {/* Arcade Interactive Stage */}
      <div className="bg-[#060c15] border-3 border-black rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-comic-lg text-center space-y-6">
        {/* Animated Hammer Overlay */}
        <AnimatePresence>
          {hammerActive && (
            <motion.div
              initial={{ rotate: -55, scale: 0.5, y: -100, opacity: 0 }}
              animate={{ rotate: [ -55, 30, 0 ], scale: [0.8, 1.4, 1], y: [-60, 20, 0], opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
            >
              <div className="text-6xl drop-shadow-[4px_4px_0px_#000]">🔨</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buggy Presenting the Plaque */}
        <div className="flex flex-col items-center justify-center space-y-2 relative">
          <BuggyAvatar
            size="lg"
            mood={hammerActive ? 'defeated' : feedback?.status === 'correct' ? 'angry' : 'mischievous'}
            isHit={hammerActive}
          />
          <span className="text-[11px] font-bangers text-[#F43F5E] tracking-wider">
            {hammerActive ? 'OUCH! MY MYTH!' : 'BUGGY CLAIMS:'}
          </span>
        </div>

        {/* Statement Billboard */}
        <motion.div
          key={currentCard.id}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#0b1524] border-2 border-black rounded-2xl p-5 sm:p-7 max-w-2xl mx-auto shadow-comic text-center space-y-3"
        >
          <span className="inline-block px-3 py-0.5 rounded-full bg-[#18273c] text-slate-300 font-mono text-[10px] font-bold uppercase tracking-wider">
            Statement #{currentIndex + 1}
          </span>
          <p className="text-base sm:text-xl font-bold text-white font-sans leading-relaxed">
            "{currentCard.statement}"
          </p>
        </motion.div>

        {/* Dual Action Comic Arcade Buttons */}
        {!feedback ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto pt-2">
            <button
              onClick={() => handleDecision(true)}
              className="p-4 rounded-2xl bg-[#F43F5E] hover:bg-[#e11d48] text-white font-bangers text-base sm:text-lg border-3 border-black shadow-comic transition active:translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Hammer className="w-5 h-5" />
              <span>SMASH BOGUS MYTH!</span>
            </button>
            <button
              onClick={() => handleDecision(false)}
              className="p-4 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-black font-bangers text-base sm:text-lg border-3 border-black shadow-comic transition active:translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>VERIFIED TRUTH!</span>
            </button>
          </div>
        ) : (
          /* Result & Explanation Drawer */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border-2 max-w-2xl mx-auto space-y-3 ${
              feedback.status === 'correct'
                ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                : 'bg-rose-950/90 border-rose-500 text-rose-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bangers text-lg tracking-wide">{feedback.text}</span>
              {feedback.points > 0 && (
                <span className="font-bangers text-lg text-[#FBBF24]">+{feedback.points} XP!</span>
              )}
            </div>

            <p className="text-xs sm:text-sm font-mono text-left leading-relaxed text-slate-200">
              <strong className="text-white">Explanation:</strong> {currentCard.explanation}
            </p>

            <div className="flex justify-end pt-1">
              <button
                onClick={nextCard}
                className="px-6 py-2 rounded-xl bg-white text-black font-bangers text-xs border border-black shadow-comic-sm hover:bg-slate-200 transition cursor-pointer"
              >
                Next Statement ➔
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2">
        <span>Arcade Streak Multiplier increases points up to 5x!</span>
        <button
          onClick={resetGame}
          className="flex items-center gap-1.5 hover:text-white cursor-pointer underline"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Game
        </button>
      </div>
    </div>
  );
};
