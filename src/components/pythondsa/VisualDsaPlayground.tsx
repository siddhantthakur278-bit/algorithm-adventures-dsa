import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  Compass,
  Sliders,
  Play,
  RotateCcw,
  SkipForward,
  Layers,
  Search,
  ArrowRight,
  GitBranch,
  Sparkles,
  Zap,
} from 'lucide-react';

export const VisualDsaPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'twopointers' | 'binsearch' | 'bst' | 'stack'>('twopointers');

  // --- Two Pointers State ---
  const tpArray = [1, 2, 4, 6, 8, 11, 15, 19];
  const [targetSum, setTargetSum] = useState<number>(14);
  const [leftPtr, setLeftPtr] = useState<number>(0);
  const [rightPtr, setRightPtr] = useState<number>(tpArray.length - 1);
  const [tpStatus, setTpStatus] = useState<string>('Click "Step Pointer" to begin searching.');
  const [tpFound, setTpFound] = useState<boolean>(false);

  const resetTwoPointers = () => {
    sound.playPop();
    setLeftPtr(0);
    setRightPtr(tpArray.length - 1);
    setTpStatus('Pointers reset to ends.');
    setTpFound(false);
  };

  const stepTwoPointers = () => {
    if (leftPtr >= rightPtr) {
      setTpStatus('No pair found with the given target sum!');
      sound.playError();
      return;
    }
    const currentSum = tpArray[leftPtr] + tpArray[rightPtr];
    sound.playPop();

    if (currentSum === targetSum) {
      setTpFound(true);
      setTpStatus(`🎉 Pair Found! ${tpArray[leftPtr]} + ${tpArray[rightPtr]} = ${targetSum}`);
      sound.playSuccess();
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    } else if (currentSum < targetSum) {
      setTpStatus(`${currentSum} < ${targetSum}: Sum is too small! Move Left pointer right.`);
      setLeftPtr(l => l + 1);
    } else {
      setTpStatus(`${currentSum} > ${targetSum}: Sum is too large! Move Right pointer left.`);
      setRightPtr(r => r - 1);
    }
  };

  // --- Binary Search State ---
  const bsArray = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
  const [bsTarget, setBsTarget] = useState<number>(23);
  const [bsLow, setBsLow] = useState<number>(0);
  const [bsHigh, setBsHigh] = useState<number>(bsArray.length - 1);
  const [bsMid, setBsMid] = useState<number>(Math.floor((0 + bsArray.length - 1) / 2));
  const [bsStatus, setBsStatus] = useState<string>('Search range initialized [0 ... 9].');
  const [bsFound, setBsFound] = useState<boolean>(false);

  const resetBinarySearch = () => {
    sound.playPop();
    setBsLow(0);
    setBsHigh(bsArray.length - 1);
    setBsMid(Math.floor((0 + bsArray.length - 1) / 2));
    setBsStatus('Binary search window reset.');
    setBsFound(false);
  };

  const stepBinarySearch = () => {
    if (bsLow > bsHigh) {
      setBsStatus(`Target ${bsTarget} not found in array!`);
      sound.playError();
      return;
    }
    const mid = Math.floor((bsLow + bsHigh) / 2);
    setBsMid(mid);
    sound.playPop();

    if (bsArray[mid] === bsTarget) {
      setBsFound(true);
      setBsStatus(`🎯 Target ${bsTarget} FOUND at index ${mid}!`);
      sound.playSuccess();
      confetti({ particleCount: 40, spread: 55, origin: { y: 0.7 } });
    } else if (bsArray[mid] < bsTarget) {
      setBsStatus(`arr[${mid}] = ${bsArray[mid]} < ${bsTarget}: Discard left half, low = mid + 1`);
      setBsLow(mid + 1);
    } else {
      setBsStatus(`arr[${mid}] = ${bsArray[mid]} > ${bsTarget}: Discard right half, high = mid - 1`);
      setBsHigh(mid - 1);
    }
  };

  // --- BST Tree Sprouter State ---
  interface TreeNode {
    val: number;
    left?: TreeNode;
    right?: TreeNode;
  }
  const [bstNodes, setBstNodes] = useState<number[]>([50, 30, 70, 20, 40, 60, 80]);
  const [bstInput, setBstInput] = useState<string>('');

  const insertBst = () => {
    const val = parseInt(bstInput.trim(), 10);
    if (isNaN(val) || bstNodes.includes(val)) {
      sound.playError();
      return;
    }
    sound.playPop();
    setBstNodes(prev => [...prev, val]);
    setBstInput('');
    confetti({ particleCount: 20, spread: 40, origin: { y: 0.7 } });
  };

  const resetBst = () => {
    sound.playPop();
    setBstNodes([50, 30, 70, 20, 40, 60, 80]);
  };

  // --- Stack Visualizer State ---
  const [stackItems, setStackItems] = useState<string[]>(['Plate A', 'Plate B', 'Plate C']);
  const [stackInput, setStackInput] = useState<string>('');

  const pushStack = () => {
    const item = stackInput.trim() || `Plate ${String.fromCharCode(65 + stackItems.length)}`;
    sound.playPop();
    setStackItems(prev => [...prev, item]);
    setStackInput('');
  };

  const popStack = () => {
    if (stackItems.length === 0) {
      sound.playError();
      return;
    }
    sound.playSwoosh();
    setStackItems(prev => prev.slice(0, prev.length - 1));
  };

  return (
    <div className="bg-[#0b1320] border-3 border-black rounded-3xl p-6 sm:p-8 shadow-comic relative overflow-hidden space-y-6">
      {/* Background glow */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-10 w-80 h-80 bg-cyan-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#38BDF8] text-black font-bangers text-xs border border-black shadow-comic-sm">
              Interactive Lab
            </span>
            <span className="text-xs font-mono text-cyan-300 font-bold">
              Real-time Algorithmic Visualizer
            </span>
          </div>
          <h2 className="font-bangers text-2xl sm:text-4xl text-white tracking-wide mt-1">
            VISUAL DSA PLAYGROUND
          </h2>
          <p className="text-xs text-slate-400">
            Step through Two Pointers, Binary Search, Trees, and Stacks with live animation and pointer tracers!
          </p>
        </div>

        {/* Visualizer Mode Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-[#070e17] p-1.5 rounded-2xl border-2 border-[#1c2e44] shadow-comic-sm">
          {[
            { id: 'twopointers', label: '🏃 Two Pointers', icon: Sliders },
            { id: 'binsearch', label: '🔍 Binary Search', icon: Search },
            { id: 'bst', label: '🌳 BST Sprouter', icon: GitBranch },
            { id: 'stack', label: '🥞 Stack & Trays', icon: Layers },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id as any);
                sound.playPop();
              }}
              className={`px-3 py-1.5 rounded-xl font-bangers text-xs transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === t.id
                  ? 'bg-[#38BDF8] text-black shadow-comic-sm font-bold scale-102'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. TWO POINTERS INTERACTIVE LAB */}
      {activeTab === 'twopointers' && (
        <div className="bg-[#060c15] border-2 border-black rounded-2xl p-6 sm:p-8 space-y-6 shadow-comic-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bangers text-xl text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#38BDF8]" />
                TWO POINTERS TARGET SUM (O(N) vs O(N²))
              </h3>
              <p className="text-xs text-slate-400">
                Sorted array. Left pointer moves right if sum &lt; target; Right pointer moves left if sum &gt; target.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Target Sum:</span>
              <input
                type="number"
                value={targetSum}
                onChange={e => {
                  setTargetSum(Number(e.target.value));
                  resetTwoPointers();
                }}
                className="w-16 p-1.5 bg-[#0a121e] border border-[#1b2f48] rounded-lg text-white font-bold text-center focus:outline-none focus:border-[#38BDF8]"
              />
            </div>
          </div>

          {/* Array Visual Display with Floating Pointers */}
          <div className="pt-8 pb-4 overflow-x-auto">
            <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-[500px]">
              {tpArray.map((val, idx) => {
                const isLeft = idx === leftPtr;
                const isRight = idx === rightPtr;
                const isInPair = tpFound && (isLeft || isRight);

                return (
                  <div key={idx} className="relative flex flex-col items-center">
                    {/* Top Pointer Badges */}
                    {isLeft && (
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="absolute -top-7 px-2 py-0.5 rounded-full bg-[#38BDF8] text-black font-bangers text-[10px] shadow-comic-sm whitespace-nowrap z-20"
                      >
                        LEFT (L)
                      </motion.div>
                    )}
                    {isRight && (
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="absolute -top-7 px-2 py-0.5 rounded-full bg-[#FBBF24] text-black font-bangers text-[10px] shadow-comic-sm whitespace-nowrap z-20"
                      >
                        RIGHT (R)
                      </motion.div>
                    )}

                    {/* Array Cell */}
                    <motion.div
                      animate={
                        isInPair
                          ? { scale: [1, 1.15, 1], rotate: [-4, 4, 0] }
                          : isLeft || isRight
                          ? { scale: 1.08 }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.4 }}
                      className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border-3 flex flex-col items-center justify-center font-mono font-bold transition shadow-comic ${
                        isInPair
                          ? 'bg-[#10B981] border-black text-black shadow-comic-lg'
                          : isLeft
                          ? 'bg-[#0b2938] border-[#38BDF8] text-cyan-300'
                          : isRight
                          ? 'bg-[#33220b] border-[#FBBF24] text-amber-300'
                          : 'bg-[#09121d] border-[#18283d] text-slate-300'
                      }`}
                    >
                      <span className="text-base sm:text-lg">{val}</span>
                      <span className="text-[9px] text-slate-500">[{idx}]</span>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Message */}
          <div className="p-3.5 bg-[#0a1422] rounded-xl border border-[#182d46] text-xs font-mono text-center text-slate-200">
            <span className="text-[#38BDF8] font-bold">STATUS:</span> {tpStatus}
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={stepTwoPointers}
              disabled={tpFound || leftPtr >= rightPtr}
              className="px-5 py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#0284c7] text-black font-bangers text-xs border-2 border-black shadow-comic-sm transition active:translate-y-0.5 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <SkipForward className="w-4 h-4" /> Step Pointer
            </button>
            <button
              onClick={resetTwoPointers}
              className="px-4 py-2.5 rounded-xl bg-[#142336] hover:bg-[#1d334e] text-slate-200 font-bangers text-xs border border-black shadow-comic-sm flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Reset Pointers
            </button>
          </div>
        </div>
      )}

      {/* 2. BINARY SEARCH SLICER */}
      {activeTab === 'binsearch' && (
        <div className="bg-[#060c15] border-2 border-black rounded-2xl p-6 sm:p-8 space-y-6 shadow-comic-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bangers text-xl text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-[#10B981]" />
                BINARY SEARCH WINDOW SLICER (O(log N))
              </h3>
              <p className="text-xs text-slate-400">
                Divides array in half each step. Observe how non-viable halves gray out instantly!
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Find Target:</span>
              <input
                type="number"
                value={bsTarget}
                onChange={e => {
                  setBsTarget(Number(e.target.value));
                  resetBinarySearch();
                }}
                className="w-16 p-1.5 bg-[#0a121e] border border-[#1b2f48] rounded-lg text-white font-bold text-center focus:outline-none focus:border-[#10B981]"
              />
            </div>
          </div>

          {/* Sliced Array Elements */}
          <div className="pt-8 pb-4 overflow-x-auto">
            <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-[550px]">
              {bsArray.map((val, idx) => {
                const inRange = idx >= bsLow && idx <= bsHigh;
                const isMid = idx === bsMid;
                const isFound = bsFound && isMid;

                return (
                  <div key={idx} className="relative flex flex-col items-center">
                    {/* Mid Pointer Tag */}
                    {isMid && inRange && (
                      <motion.div
                        initial={{ y: -8 }}
                        animate={{ y: 0 }}
                        className="absolute -top-7 px-2 py-0.5 rounded-full bg-[#10B981] text-black font-bangers text-[10px] shadow-comic-sm z-20 whitespace-nowrap"
                      >
                        MID [{idx}]
                      </motion.div>
                    )}

                    <div
                      className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border-3 flex flex-col items-center justify-center font-mono font-bold transition shadow-comic ${
                        isFound
                          ? 'bg-[#10B981] border-black text-black shadow-comic-lg scale-110'
                          : isMid && inRange
                          ? 'bg-[#082a1d] border-[#10B981] text-emerald-300'
                          : inRange
                          ? 'bg-[#0f1d2e] border-[#223955] text-white'
                          : 'bg-[#05080e] border-[#0e1622] text-slate-600 opacity-40'
                      }`}
                    >
                      <span className="text-base sm:text-lg">{val}</span>
                      <span className="text-[9px] text-slate-500">[{idx}]</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Message */}
          <div className="p-3.5 bg-[#0a1422] rounded-xl border border-[#182d46] text-xs font-mono text-center text-slate-200">
            <span className="text-[#10B981] font-bold">DISCOVERY:</span> {bsStatus}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={stepBinarySearch}
              disabled={bsFound || bsLow > bsHigh}
              className="px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-black font-bangers text-xs border-2 border-black shadow-comic-sm transition active:translate-y-0.5 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <SkipForward className="w-4 h-4" /> Slice Half & Check Mid
            </button>
            <button
              onClick={resetBinarySearch}
              className="px-4 py-2.5 rounded-xl bg-[#142336] hover:bg-[#1d334e] text-slate-200 font-bangers text-xs border border-black shadow-comic-sm flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Reset Search Window
            </button>
          </div>
        </div>
      )}

      {/* 3. BST SPROUTER */}
      {activeTab === 'bst' && (
        <div className="bg-[#060c15] border-2 border-black rounded-2xl p-6 sm:p-8 space-y-6 shadow-comic-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bangers text-xl text-white flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-[#FBBF24]" />
                BINARY SEARCH TREE SPROUTER (O(h))
              </h3>
              <p className="text-xs text-slate-400">
                Left child &lt; Parent &lt; Right child. Type a number to sprout a new node dynamically!
              </p>
            </div>

            {/* Node Insertion Input */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="New node val"
                value={bstInput}
                onChange={e => setBstInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && insertBst()}
                className="w-32 p-2 bg-[#09111c] border border-[#1a2d46] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#FBBF24]"
              />
              <button
                onClick={insertBst}
                className="px-4 py-2 rounded-xl bg-[#FBBF24] hover:bg-amber-400 text-black font-bangers text-xs border border-black shadow-comic-sm cursor-pointer"
              >
                + Sprout
              </button>
              <button
                onClick={resetBst}
                className="p-2 rounded-xl bg-[#142336] hover:bg-[#1d334e] text-slate-200 text-xs cursor-pointer"
                title="Reset Tree"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive SVG Tree Visualizer */}
          <div className="bg-[#04080e] rounded-2xl border border-[#142336] p-6 text-center overflow-x-auto min-h-[220px] flex items-center justify-center">
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl">
              {bstNodes.map((n, idx) => (
                <motion.div
                  key={n}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.15, rotate: 4 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#047857] text-black font-bangers text-lg border-2 border-black flex flex-col items-center justify-center shadow-comic-sm cursor-pointer"
                >
                  <span>{n}</span>
                  <span className="text-[8px] font-mono font-bold text-black/70">
                    {idx === 0 ? 'ROOT' : n < bstNodes[0] ? 'LEFT' : 'RIGHT'}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-[#0a1422] rounded-xl border border-[#16273e] flex items-center justify-between text-xs font-mono text-slate-300">
            <span>
              <strong>In-Order Traversal (Always Sorted):</strong> [
              {bstNodes
                .slice()
                .sort((a, b) => a - b)
                .join(', ')}
              ]
            </span>
            <span className="text-[#FBBF24] font-bold">{bstNodes.length} Nodes</span>
          </div>
        </div>
      )}

      {/* 4. STACK TRAY VISUALIZER */}
      {activeTab === 'stack' && (
        <div className="bg-[#060c15] border-2 border-black rounded-2xl p-6 sm:p-8 space-y-6 shadow-comic-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bangers text-xl text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#F43F5E]" />
                CAFETERIA STACK TRAY (LIFO: LAST IN, FIRST OUT)
              </h3>
              <p className="text-xs text-slate-400">
                Elements push to the top and pop from the top in O(1) time.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Plate label"
                value={stackInput}
                onChange={e => setStackInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && pushStack()}
                className="w-28 p-2 bg-[#09111c] border border-[#1a2d46] rounded-xl text-xs text-white font-mono focus:outline-none"
              />
              <button
                onClick={pushStack}
                className="px-3.5 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-black font-bangers text-xs border border-black shadow-comic-sm cursor-pointer"
              >
                + Push
              </button>
              <button
                onClick={popStack}
                disabled={stackItems.length === 0}
                className="px-3.5 py-2 rounded-xl bg-[#F43F5E] hover:bg-[#e11d48] text-white font-bangers text-xs border border-black shadow-comic-sm cursor-pointer disabled:opacity-40"
              >
                - Pop
              </button>
            </div>
          </div>

          {/* Vertical Stack Tube Stage */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-56 sm:w-64 min-h-[220px] bg-[#070e17] border-3 border-t-0 border-[#1c3048] rounded-b-3xl p-3 flex flex-col-reverse gap-2 relative shadow-inner">
              <AnimatePresence>
                {stackItems.map((item, idx) => {
                  const isTop = idx === stackItems.length - 1;
                  return (
                    <motion.div
                      key={item + idx}
                      initial={{ y: -50, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -60, opacity: 0, scale: 0.8 }}
                      className={`p-3 rounded-xl border-2 font-mono text-xs flex items-center justify-between shadow-comic-sm ${
                        isTop
                          ? 'bg-[#10B981] border-black text-black font-bold'
                          : 'bg-[#0d1c2d] border-[#1e3b5e] text-slate-200'
                      }`}
                    >
                      <span>{item}</span>
                      {isTop && (
                        <span className="text-[9px] font-bangers px-1.5 py-0.5 rounded bg-black text-[#10B981]">
                          TOP (PEEK)
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {stackItems.length === 0 && (
                <div className="text-center text-xs font-mono text-slate-500 my-auto">
                  [Empty Stack — LIFO Tube]
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
