import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { SidAvatar, BuggyAvatar } from '../characters/Characters';
import { Flag, Play, RotateCcw, Zap, Gauge, Flame, Trophy } from 'lucide-react';

interface AlgorithmProfile {
  id: string;
  name: string;
  complexity: 'O(1)' | 'O(log N)' | 'O(N)' | 'O(N log N)' | 'O(N^2)' | 'O(2^N)';
  calculateSteps: (n: number) => number;
  description: string;
}

export const BigORaceTrack: React.FC = () => {
  const algorithms: AlgorithmProfile[] = [
    {
      id: 'hash',
      name: 'Hash Map Lookup',
      complexity: 'O(1)',
      calculateSteps: () => 1,
      description: 'Instant constant time lookup.',
    },
    {
      id: 'bisect',
      name: 'Binary Search',
      complexity: 'O(log N)',
      calculateSteps: n => Math.ceil(Math.log2(n)),
      description: 'Halves search space each step.',
    },
    {
      id: 'linear',
      name: 'Linear Search / One Pass',
      complexity: 'O(N)',
      calculateSteps: n => n,
      description: 'Visits every element once.',
    },
    {
      id: 'mergesort',
      name: 'Merge Sort / Timsort',
      complexity: 'O(N log N)',
      calculateSteps: n => Math.round(n * Math.log2(n)),
      description: 'Optimal divide-and-conquer sorting.',
    },
    {
      id: 'bubble',
      name: 'Bubble Sort / Nested Loops',
      complexity: 'O(N^2)',
      calculateSteps: n => n * n,
      description: 'Quadratic pair comparisons.',
    },
    {
      id: 'recfib',
      name: 'Naive Recursion (Fibonacci)',
      complexity: 'O(2^N)',
      calculateSteps: n => Math.min(1000000000, Math.pow(2, Math.min(n, 30))),
      description: 'Exponential branching tree explosion.',
    },
  ];

  const [runnerA, setRunnerA] = useState<AlgorithmProfile>(algorithms[1]); // Binary Search
  const [runnerB, setRunnerB] = useState<AlgorithmProfile>(algorithms[4]); // Bubble Sort
  const [inputN, setInputN] = useState<number>(100);

  const [racing, setRacing] = useState<boolean>(false);
  const [progressA, setProgressA] = useState<number>(0);
  const [progressB, setProgressB] = useState<number>(0);
  const [winner, setWinner] = useState<string | null>(null);

  const stepsA = runnerA.calculateSteps(inputN);
  const stepsB = runnerB.calculateSteps(inputN);

  const startRace = () => {
    sound.playPop();
    setRacing(true);
    setProgressA(0);
    setProgressB(0);
    setWinner(null);

    // Calculate normalized race durations based on step ratio
    const minSteps = Math.min(stepsA, stepsB);
    const maxSteps = Math.max(stepsA, stepsB);

    // Speed ratio: the faster one finishes in ~1.2s, the slower one in proportional time
    const ratio = Math.min(15, maxSteps / (minSteps || 1));

    let timerA: any;
    let timerB: any;

    if (stepsA <= stepsB) {
      // Runner A wins
      setProgressA(100);
      setProgressB(Math.max(10, Math.round(100 / Math.max(2, ratio))));
      setTimeout(() => {
        setWinner(`${runnerA.name} (${runnerA.complexity}) WINS!`);
        sound.playSuccess();
        sound.playFanfare();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        setRacing(false);
      }, 1200);
    } else {
      // Runner B wins
      setProgressB(100);
      setProgressA(Math.max(10, Math.round(100 / Math.max(2, ratio))));
      setTimeout(() => {
        setWinner(`${runnerB.name} (${runnerB.complexity}) WINS!`);
        sound.playSuccess();
        sound.playFanfare();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        setRacing(false);
      }, 1200);
    }
  };

  const resetRace = () => {
    sound.playPop();
    setRacing(false);
    setProgressA(0);
    setProgressB(0);
    setWinner(null);
  };

  return (
    <div className="bg-[#0b1320] border-3 border-black rounded-3xl p-6 sm:p-8 shadow-comic relative overflow-hidden space-y-6">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#FBBF24] text-black font-bangers text-xs border border-black shadow-comic-sm">
              Big-O Benchmark Arena
            </span>
            <span className="text-xs font-mono text-amber-300 font-bold">
              Real-Time Algorithmic Racing
            </span>
          </div>
          <h2 className="font-bangers text-2xl sm:text-4xl text-white tracking-wide mt-1">
            THE BIG-O BENCHMARK RACE TRACK
          </h2>
          <p className="text-xs text-slate-400">
            Select two algorithms, set input size N, and watch them race across the finish line!
          </p>
        </div>

        {/* Input N Selector */}
        <div className="flex items-center gap-2 bg-[#070e17] px-4 py-2 rounded-2xl border-2 border-[#1c2e44]">
          <Gauge className="w-4 h-4 text-[#FBBF24]" />
          <span className="text-xs font-mono text-slate-300 font-bold">Input N:</span>
          {[10, 100, 1000, 10000].map(val => (
            <button
              key={val}
              onClick={() => {
                setInputN(val);
                resetRace();
              }}
              className={`px-2 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer transition ${
                inputN === val ? 'bg-[#FBBF24] text-black shadow-comic-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {val.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Algorithm Selection Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Runner A Selection */}
        <div className="bg-[#07131e] p-4 rounded-2xl border-2 border-[#19334d] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bangers text-[#38BDF8] tracking-wider">RUNNER 1: SID</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded border border-cyan-500/30">
              {runnerA.complexity}
            </span>
          </div>
          <select
            value={runnerA.id}
            onChange={e => {
              setRunnerA(algorithms.find(a => a.id === e.target.value)!);
              resetRace();
            }}
            className="w-full p-2 bg-[#091624] border border-[#1d3c5e] rounded-xl text-xs text-white font-mono focus:outline-none"
          >
            {algorithms.map(a => (
              <option key={a.id} value={a.id}>
                {a.name} — {a.complexity}
              </option>
            ))}
          </select>
          <div className="text-[11px] font-mono text-slate-300 flex justify-between pt-1">
            <span>Operations for N={inputN.toLocaleString()}:</span>
            <strong className="text-[#38BDF8]">{stepsA.toLocaleString()} steps</strong>
          </div>
        </div>

        {/* Runner B Selection */}
        <div className="bg-[#1a0a0f] p-4 rounded-2xl border-2 border-[#4d1927] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bangers text-[#F43F5E] tracking-wider">RUNNER 2: BUGGY</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-rose-950 text-rose-300 rounded border border-rose-500/30">
              {runnerB.complexity}
            </span>
          </div>
          <select
            value={runnerB.id}
            onChange={e => {
              setRunnerB(algorithms.find(a => a.id === e.target.value)!);
              resetRace();
            }}
            className="w-full p-2 bg-[#240910] border border-[#5e1d2e] rounded-xl text-xs text-white font-mono focus:outline-none"
          >
            {algorithms.map(a => (
              <option key={a.id} value={a.id}>
                {a.name} — {a.complexity}
              </option>
            ))}
          </select>
          <div className="text-[11px] font-mono text-slate-300 flex justify-between pt-1">
            <span>Operations for N={inputN.toLocaleString()}:</span>
            <strong className="text-[#F43F5E]">{stepsB.toLocaleString()} steps</strong>
          </div>
        </div>
      </div>

      {/* Animated Racetrack Visual Stage */}
      <div className="bg-[#050911] border-3 border-black rounded-2xl p-6 sm:p-8 space-y-6 shadow-comic-lg relative overflow-hidden">
        {/* Track Lanes */}
        <div className="space-y-6">
          {/* Lane 1: Runner A (Sid) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#38BDF8]">
                🏃 {runnerA.name} ({runnerA.complexity})
              </span>
              <span className="text-slate-400">{progressA}% Distance</span>
            </div>
            <div className="h-14 bg-[#0a121e] rounded-2xl border-2 border-[#1c2e44] relative flex items-center px-4 overflow-hidden">
              {/* Checkered Finish Line */}
              <div className="absolute right-2 top-0 bottom-0 w-4 bg-[repeating-linear-gradient(45deg,#000,#000_6px,#fff_6px,#fff_12px)] opacity-60 z-0" />
              <motion.div
                animate={{ x: `${progressA * 3.8}px` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="relative z-10 flex items-center gap-2"
              >
                <SidAvatar size="sm" mood={progressA >= 100 ? 'happy' : 'curious'} />
              </motion.div>
            </div>
          </div>

          {/* Lane 2: Runner B (Buggy) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#F43F5E]">
                🐛 {runnerB.name} ({runnerB.complexity})
              </span>
              <span className="text-slate-400">{progressB}% Distance</span>
            </div>
            <div className="h-14 bg-[#14080c] rounded-2xl border-2 border-[#381622] relative flex items-center px-4 overflow-hidden">
              {/* Checkered Finish Line */}
              <div className="absolute right-2 top-0 bottom-0 w-4 bg-[repeating-linear-gradient(45deg,#000,#000_6px,#fff_6px,#fff_12px)] opacity-60 z-0" />
              <motion.div
                animate={{ x: `${progressB * 3.8}px` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="relative z-10 flex items-center gap-2"
              >
                <BuggyAvatar size="sm" mood={progressB >= 100 ? 'sneaky' : 'defeated'} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Winner Banner */}
        {winner && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 bg-gradient-to-r from-emerald-950/80 via-[#0a1422] to-amber-950/80 border-2 border-[#10B981] rounded-2xl text-center space-y-1 shadow-comic"
          >
            <div className="flex items-center justify-center gap-2 text-[#FBBF24] font-bangers text-xl sm:text-2xl">
              <Trophy className="w-6 h-6 fill-current" />
              <span>{winner}</span>
            </div>
            <p className="text-xs font-mono text-slate-300">
              The winner required {Math.min(stepsA, stepsB).toLocaleString()} steps vs{' '}
              {Math.max(stepsA, stepsB).toLocaleString()} steps. That is a{' '}
              <strong className="text-emerald-400 font-bold">
                {Math.round(Math.max(stepsA, stepsB) / Math.max(1, Math.min(stepsA, stepsB))).toLocaleString()}x
              </strong>{' '}
              speed advantage!
            </p>
          </motion.div>
        )}

        {/* Race Controls */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={startRace}
            disabled={racing}
            className="px-6 py-3 rounded-2xl bg-[#FBBF24] hover:bg-amber-400 text-black font-bangers text-sm sm:text-base border-3 border-black shadow-comic transition active:translate-y-1 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>START BIG-O RACE!</span>
          </button>
          <button
            onClick={resetRace}
            className="px-4 py-3 rounded-2xl bg-[#142336] hover:bg-[#1d334e] text-slate-200 font-bangers text-xs border border-black shadow-comic-sm flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Reset Track
          </button>
        </div>
      </div>
    </div>
  );
};
