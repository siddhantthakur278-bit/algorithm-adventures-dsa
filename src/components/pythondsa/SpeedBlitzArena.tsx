import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Zap, Timer, Flame, Trophy, RotateCcw, Play, CheckCircle2, XCircle } from 'lucide-react';

interface BlitzQuestion {
  q: string;
  options: string[];
  correct: string;
}

export const SpeedBlitzArena: React.FC<{
  onRewardCoins?: (amount: number) => void;
}> = ({ onRewardCoins }) => {
  const blitzBank: BlitzQuestion[] = [
    { q: 'list.pop(0) time complexity in Python:', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'], correct: 'O(N)' },
    { q: 'collections.deque.popleft() time complexity:', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'], correct: 'O(1)' },
    { q: 'Python Timsort worst-case time complexity:', options: ['O(N log N)', 'O(N^2)', 'O(N)', 'O(log N)'], correct: 'O(N log N)' },
    { q: 'Binary Search search time on sorted array:', options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'], correct: 'O(log N)' },
    { q: 'dict key lookup average time complexity:', options: ['O(1)', 'O(N)', 'O(log N)', 'O(K)'], correct: 'O(1)' },
    { q: 'heapq.heappush() time complexity on a heap:', options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'], correct: 'O(log N)' },
    { q: 'heapq.heapify() build time for list of size N:', options: ['O(N log N)', 'O(N)', 'O(log N)', 'O(N^2)'], correct: 'O(N)' },
    { q: 'Are Python strings mutable after creation?', options: ['Yes', 'No', 'Only ASCII', 'Only in Python 3.12+'], correct: 'No' },
    { q: 'Which data structure enforces LIFO ordering?', options: ['Queue', 'Stack', 'Heap', 'Tree'], correct: 'Stack' },
    { q: 'In an unweighted graph, shortest path is found by:', options: ['DFS', 'BFS', 'Quicksort', 'Heapify'], correct: 'BFS' },
    { q: 'Detecting a cycle in a linked list with O(1) space:', options: ['Two Pointers', 'Hashing', 'Recursion', 'Binary Search'], correct: 'Two Pointers' },
    { q: 'What does -7 // 2 evaluate to in Python?', options: ['-3', '-4', '-3.5', '3'], correct: '-4' },
    { q: 'Monotonic stack finding Next Greater Element takes:', options: ['O(N^2)', 'O(N)', 'O(log N)', 'O(N log N)'], correct: 'O(N)' },
    { q: 'Hash collision resolution with linked lists per bucket:', options: ['Chaining', 'Open Addressing', 'Timsort', 'Bisect'], correct: 'Chaining' },
  ];

  const [active, setActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [qIndex, setQIndex] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('ada_pydsa_blitz_hi') || 0);
    } catch {
      return 0;
    }
  });

  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Timer countdown
  useEffect(() => {
    let timer: any = null;
    if (active && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 5 && t > 1) sound.playTimerTick();
          if (t <= 1) {
            // End of Blitz
            setActive(false);
            sound.playBuzzer();
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [active, timeLeft]);

  // Handle score updates & high score persistence
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('ada_pydsa_blitz_hi', String(score));
    }
  }, [score, highScore]);

  const startBlitz = () => {
    sound.playPowerUp();
    setActive(true);
    setTimeLeft(60);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setQIndex(0);
    setFeedback(null);
  };

  const currentQ = blitzBank[qIndex % blitzBank.length];

  const handleChoice = (choice: string) => {
    if (!active || feedback) return;

    if (choice === currentQ.correct) {
      const newCombo = combo + 1;
      const pts = 50 * newCombo;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      setScore(s => s + pts);
      sound.playHit();
      sound.playCombo(newCombo);
      setFeedback('correct');

      if (onRewardCoins && newCombo % 3 === 0) {
        onRewardCoins(25);
      }
    } else {
      setCombo(0);
      sound.playError();
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setQIndex(i => i + 1);
    }, 280);
  };

  return (
    <div className="bg-[#0b1320] border-3 border-black rounded-3xl p-6 sm:p-8 shadow-comic relative overflow-hidden space-y-6">
      {/* Background glow */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-10 w-80 h-80 bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#FBBF24] text-black font-bangers text-xs border border-black shadow-comic-sm">
              60s Rapid Blitz
            </span>
            <span className="text-xs font-mono text-amber-300 font-bold">
              Time-Attack Algorithmic Challenge
            </span>
          </div>
          <h2 className="font-bangers text-2xl sm:text-4xl text-white tracking-wide mt-1">
            PYTHON + DSA SPEED BLITZ
          </h2>
          <p className="text-xs text-slate-400">
            Answer as many Big-O complexities and Python trivia questions in 60 seconds as possible!
          </p>
        </div>

        {/* Live Blitz HUD */}
        <div className="flex items-center gap-3 bg-[#070e17] px-4 py-2.5 rounded-2xl border-2 border-[#1c2e44] shadow-comic-sm">
          <div className="flex items-center gap-1.5 text-rose-400">
            <Timer className={`w-5 h-5 ${active && timeLeft <= 10 ? 'animate-ping' : ''}`} />
            <span className="font-bangers text-2xl text-white">{timeLeft}s</span>
          </div>
          <div className="h-7 w-[1px] bg-[#1a2b3f]" />
          <div>
            <span className="text-[10px] font-mono text-slate-400 block uppercase">SCORE</span>
            <span className="font-bangers text-xl text-[#FBBF24] leading-none">{score}</span>
          </div>
          {combo > 1 && (
            <div className="flex items-center gap-1 text-amber-400 animate-pulse">
              <Flame className="w-4 h-4 fill-current" />
              <span className="font-bangers text-lg">x{combo}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Blitz Stage */}
      <div className="bg-[#060c15] border-3 border-black rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-comic-lg text-center space-y-6">
        {!active && timeLeft === 60 ? (
          /* Start Screen */
          <div className="py-8 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#FBBF24] text-black text-3xl font-bangers flex items-center justify-center mx-auto border-2 border-black shadow-comic">
              ⚡
            </div>
            <h3 className="font-bangers text-3xl text-white">READY FOR THE BLITZ RUSH?</h3>
            <p className="text-xs text-slate-300 font-mono">
              60 seconds on the clock. Build your combo streak to multiply points. Fast decisions = Massive XP!
            </p>
            <div className="pt-2">
              <button
                onClick={startBlitz}
                className="px-8 py-3 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-black font-bangers text-base sm:text-lg border-3 border-black shadow-comic transition active:translate-y-1 flex items-center gap-2 mx-auto cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" /> START 60s BLITZ!
              </button>
            </div>
          </div>
        ) : active ? (
          /* Active Question Stage */
          <div className="space-y-6 max-w-xl mx-auto py-2">
            {/* Feedback Flash */}
            {feedback && (
              <div
                className={`py-1 px-4 rounded-full font-bangers text-sm inline-block ${
                  feedback === 'correct' ? 'bg-emerald-500 text-black' : 'bg-rose-500 text-white'
                }`}
              >
                {feedback === 'correct' ? '✓ STRIKE! +COMBO!' : '✗ MISS! STREAK RESET!'}
              </div>
            )}

            {/* Question Text */}
            <h3 className="text-lg sm:text-2xl font-bold text-white font-sans leading-snug">
              {currentQ.q}
            </h3>

            {/* Rapid Choices */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChoice(opt)}
                  className="p-4 rounded-xl bg-[#091524] hover:bg-[#102238] hover:border-[#10B981] text-white font-mono font-bold text-sm sm:text-base border-2 border-[#192f4c] shadow-comic-sm transition active:scale-95 cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Game Over Summary Screen */
          <div className="py-6 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#10B981] text-black text-3xl font-bangers flex items-center justify-center mx-auto border-2 border-black shadow-comic">
              🏁
            </div>
            <h3 className="font-bangers text-3xl sm:text-4xl text-white">BLITZ TIME'S UP!</h3>
            <div className="p-4 bg-[#08121f] rounded-2xl border border-[#172e48] space-y-1 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Final Score:</span>
                <strong className="text-[#FBBF24] font-bangers text-lg">{score} pts</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Max Combo Streak:</span>
                <strong className="text-emerald-400 font-bangers text-lg">x{maxCombo}</strong>
              </div>
              <div className="flex justify-between text-slate-300 border-t border-[#14263b] pt-1 mt-1">
                <span>All-Time High Score:</span>
                <strong className="text-amber-300 font-bold">{highScore} pts</strong>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={startBlitz}
                className="px-6 py-2.5 rounded-xl bg-[#FBBF24] hover:bg-amber-400 text-black font-bangers text-sm border-2 border-black shadow-comic-sm flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
