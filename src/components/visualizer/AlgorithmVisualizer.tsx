import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Sparkles, Plus, Search, Eye, Network, Cpu } from 'lucide-react';
import { ByteAvatar, ProfessorAvatar, ComicBubble } from '../characters/Characters';
import { sound } from '../../utils/soundEffects';
import { InteractiveGraphStudio } from './InteractiveGraphStudio';
import { MemoryLayoutVisualizer } from './MemoryLayoutVisualizer';

export const AlgorithmVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<
    'lomuto' | 'bst' | 'heap' | 'slidingWindow' | 'mergeSort' | 'dijkstra' | 'interactiveGraph' | 'memoryLayout'
  >('lomuto');

  // --- LOMUTO PARTITION STATE ---
  const initialLomutoArray = [7, 2, 9, 4, 3, 8, 5];
  const [lomutoArray, setLomutoArray] = useState<number[]>([...initialLomutoArray]);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Lomuto Steps Precomputation
  // Initial array: [7, 2, 9, 4, 3, 8, 5], Pivot = 5
  const lomutoSteps = [
    {
      arr: [7, 2, 9, 4, 3, 8, 5],
      i: -1,
      j: 0,
      pivotIdx: 6,
      desc: 'Initialize: Pivot is arr[6] = 5. Pointer i starts at -1 (empty small zone). Scanner j starts at 0.',
    },
    {
      arr: [7, 2, 9, 4, 3, 8, 5],
      i: -1,
      j: 0,
      pivotIdx: 6,
      desc: 'Check arr[j=0] = 7. Is 7 <= 5? NO! 7 belongs to Big Zone. i stays at -1. j moves forward.',
    },
    {
      arr: [7, 2, 9, 4, 3, 8, 5],
      i: -1,
      j: 1,
      pivotIdx: 6,
      desc: 'Check arr[j=1] = 2. Is 2 <= 5? YES! Increment i to 0. Swap arr[i=0] (7) with arr[j=1] (2)!',
    },
    {
      arr: [2, 7, 9, 4, 3, 8, 5],
      i: 0,
      j: 1,
      pivotIdx: 6,
      desc: 'Swapped! Array is now [2, 7, 9, 4, 3, 8, 5]. Small zone is [2]. Big zone is [7].',
    },
    {
      arr: [2, 7, 9, 4, 3, 8, 5],
      i: 0,
      j: 2,
      pivotIdx: 6,
      desc: 'Check arr[j=2] = 9. Is 9 <= 5? NO! 9 belongs to Big Zone. i stays at 0. j moves forward.',
    },
    {
      arr: [2, 7, 9, 4, 3, 8, 5],
      i: 0,
      j: 3,
      pivotIdx: 6,
      desc: 'Check arr[j=3] = 4. Is 4 <= 5? YES! Increment i to 1. Swap arr[i=1] (7) with arr[j=3] (4)!',
    },
    {
      arr: [2, 4, 9, 7, 3, 8, 5],
      i: 1,
      j: 3,
      pivotIdx: 6,
      desc: 'Swapped! Array is now [2, 4, 9, 7, 3, 8, 5]. Small zone is [2, 4].',
    },
    {
      arr: [2, 4, 9, 7, 3, 8, 5],
      i: 1,
      j: 4,
      pivotIdx: 6,
      desc: 'Check arr[j=4] = 3. Is 3 <= 5? YES! Increment i to 2. Swap arr[i=2] (9) with arr[j=4] (3)!',
    },
    {
      arr: [2, 4, 3, 7, 9, 8, 5],
      i: 2,
      j: 4,
      pivotIdx: 6,
      desc: 'Swapped! Array is now [2, 4, 3, 7, 9, 8, 5]. Small zone is [2, 4, 3].',
    },
    {
      arr: [2, 4, 3, 7, 9, 8, 5],
      i: 2,
      j: 5,
      pivotIdx: 6,
      desc: 'Check arr[j=5] = 8. Is 8 <= 5? NO! 8 belongs to Big Zone. Scanner j reached end of partition range!',
    },
    {
      arr: [2, 4, 3, 7, 9, 8, 5],
      i: 2,
      j: 6,
      pivotIdx: 6,
      desc: 'Final Step: Place Pivot! Swap arr[i+1=3] (7) with arr[pivotIdx=6] (5)!',
    },
    {
      arr: [2, 4, 3, 5, 9, 8, 7],
      i: 3,
      j: 6,
      pivotIdx: 3,
      desc: 'Partition Complete! Pivot 5 is in its exact final sorted position (index 3). Left are <= 5; Right are > 5!',
    },
  ];

  const currentLomuto = lomutoSteps[stepIndex];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setStepIndex(prev => {
          if (prev < lomutoSteps.length - 1) {
            sound.playPop();
            return prev + 1;
          } else {
            setIsPlaying(false);
            sound.playSuccess();
            return prev;
          }
        });
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [isPlaying, lomutoSteps.length]);

  // --- BST STATE ---
  interface BSTNode {
    id: number;
    val: number;
    left?: BSTNode;
    right?: BSTNode;
    x: number;
    y: number;
  }

  const initialTree: BSTNode = {
    id: 1,
    val: 8,
    x: 200,
    y: 40,
    left: {
      id: 2,
      val: 3,
      x: 120,
      y: 110,
      left: { id: 3, val: 1, x: 70, y: 180 },
      right: { id: 4, val: 6, x: 160, y: 180 },
    },
    right: {
      id: 5,
      val: 10,
      x: 280,
      y: 110,
      right: { id: 6, val: 14, x: 330, y: 180 },
    },
  };

  const [treeSearchTarget, setTreeSearchTarget] = useState<number | null>(6);
  const [highlightedNodeIds, setHighlightedNodeIds] = useState<number[]>([1, 2, 4]);

  const handleSearchBST = (target: number) => {
    setTreeSearchTarget(target);
    sound.playPop();
    // Simulate path: 8 -> 3 -> 6
    if (target === 6) setHighlightedNodeIds([1, 2, 4]);
    else if (target === 1) setHighlightedNodeIds([1, 2, 3]);
    else if (target === 14) setHighlightedNodeIds([1, 5, 6]);
    else if (target === 10) setHighlightedNodeIds([1, 5]);
    else setHighlightedNodeIds([1]);
  };

  // --- HEAP MAPPER STATE ---
  const heapArray = [10, 15, 20, 17, 25, 30, 40];
  const [selectedHeapIndex, setSelectedHeapIndex] = useState<number>(1); // node 15

  const getParent = (i: number) => (i === 0 ? null : Math.floor((i - 1) / 2));
  const getLeftChild = (i: number) => (2 * i + 1 < heapArray.length ? 2 * i + 1 : null);
  const getRightChild = (i: number) => (2 * i + 2 < heapArray.length ? 2 * i + 2 : null);

  // --- SLIDING WINDOW STATE ---
  const stringSample = 'a b c a b c b b'.split(' ');
  const [windowLeft, setWindowLeft] = useState<number>(0);
  const [windowRight, setWindowRight] = useState<number>(2);

  // --- MERGE SORT STATE ---
  const [mergeStep, setMergeStep] = useState<number>(0);
  const mergeSteps = [
    {
      left: [38, 27, 43, 3],
      right: [9, 82, 10],
      desc: 'Step 1: Divide problem of size N=7 into two halves: Left of size 4 and Right of size 3.',
      phase: 'DIVIDE',
    },
    {
      left: [[38, 27], [43, 3]],
      right: [[9], [82, 10]],
      desc: 'Step 2: Recurse! T(N/2) splits again into pairs until single base-case elements are reached.',
      phase: 'DIVIDE',
    },
    {
      left: [27, 38],
      right: [3, 43],
      desc: 'Step 3: Base cases merge! [38] & [27] merge into [27, 38]. [43] & [3] merge into [3, 43].',
      phase: 'CONQUER & MERGE',
    },
    {
      left: [3, 27, 38, 43],
      right: [9, 10, 82],
      desc: 'Step 4: Two-finger pointer sweep merges two sorted halves in linear O(N) time!',
      phase: 'TWO-POINTER MERGE',
    },
    {
      left: [3, 9, 10, 27, 38, 43, 82],
      right: [],
      desc: 'Final Result: Array is sorted! Recurrence T(N) = 2T(N/2) + O(N) solved in O(N log N) by Master Theorem!',
      phase: 'SORTED COMPLETE',
    },
  ];

  // --- DIJKSTRA STATE ---
  const [dijkstraStep, setDijkstraStep] = useState<number>(0);
  const dijkstraSteps = [
    {
      currentNode: 'A',
      currentDist: 0,
      distances: { A: 0, B: 4, C: 2, D: '∞', E: '∞' },
      pq: ['(0, A)'],
      log: 'Initialize: Start at A (dist 0). Relax edges A->B (wt 4) and A->C (wt 2).',
    },
    {
      currentNode: 'C',
      currentDist: 2,
      distances: { A: 0, B: 3, C: 2, D: 6, E: '∞' },
      pq: ['(2, C)', '(3, B)'],
      log: 'Extract Min from PQ: Node C (dist 2). Relax C->B (2+1=3 < 4! Dist to B shortened to 3!) Relax C->D (2+4=6).',
    },
    {
      currentNode: 'B',
      currentDist: 3,
      distances: { A: 0, B: 3, C: 2, D: 4, E: '∞' },
      pq: ['(3, B)', '(4, D)'],
      log: 'Extract Min: Node B (dist 3). Relax B->D (3+1=4 < 6! Dist to D shortened to 4!).',
    },
    {
      currentNode: 'D',
      currentDist: 4,
      distances: { A: 0, B: 3, C: 2, D: 4, E: 6 },
      pq: ['(4, D)', '(6, E)'],
      log: 'Extract Min: Node D (dist 4). Relax D->E (4+2=6). Target E discovered!',
    },
    {
      currentNode: 'E',
      currentDist: 6,
      distances: { A: 0, B: 3, C: 2, D: 4, E: 6 },
      pq: ['(6, E)'],
      log: 'Target Reached! Shortest Path: A -> C -> B -> D -> E with minimal total cost of 6!',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Visualizer Header */}
      <div className="bg-[#0c101d] border-2 border-[#1c243a] rounded-3xl p-6 sm:p-8 shadow-comic-lg bg-halftone">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBBF24] text-black font-bangers text-xs border border-black shadow-comic-sm">
              <Sparkles className="w-3.5 h-3.5" />
              INTERACTIVE ALGORITHM STUDIO
            </span>
            <h1 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
              ALGORITHM VISUALIZER & DYNAMICS
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Step through Lomuto Partition, see Binary Heaps mapped from arrays, search Binary Search Trees,
              and watch Sliding Windows glide in real time!
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveMode('lomuto');
                sound.playPop();
              }}
              className={`px-4 py-2 rounded-xl font-bangers text-xs tracking-wider border-2 transition ${
                activeMode === 'lomuto'
                  ? 'bg-[#FBBF24] text-black border-black shadow-comic-sm'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              1. Lomuto QuickSort Stepper
            </button>
            <button
              onClick={() => {
                setActiveMode('bst');
                sound.playPop();
              }}
              className={`px-4 py-2 rounded-xl font-bangers text-xs tracking-wider border-2 transition ${
                activeMode === 'bst'
                  ? 'bg-[#38BDF8] text-black border-black shadow-comic-sm'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              2. BST Search Path
            </button>
            <button
              onClick={() => {
                setActiveMode('heap');
                sound.playPop();
              }}
              className={`px-4 py-2 rounded-xl font-bangers text-xs tracking-wider border-2 transition ${
                activeMode === 'heap'
                  ? 'bg-[#10B981] text-black border-black shadow-comic-sm'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              3. Heap Array-Tree Mapper
            </button>
            <button
              onClick={() => {
                setActiveMode('slidingWindow');
                sound.playPop();
              }}
              className={`px-4 py-2 rounded-xl font-bangers text-xs tracking-wider border-2 transition ${
                activeMode === 'slidingWindow'
                  ? 'bg-[#FB923C] text-black border-black shadow-comic-sm'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              4. Sliding Window Stepper
            </button>
            <button
              onClick={() => {
                setActiveMode('mergeSort');
                sound.playPop();
              }}
              className={`px-4 py-2 rounded-xl font-bangers text-xs tracking-wider border-2 transition ${
                activeMode === 'mergeSort'
                  ? 'bg-[#8B5CF6] text-white border-black shadow-comic-sm'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              5. Merge Sort Divide & Conquer
            </button>
            <button
              onClick={() => {
                setActiveMode('dijkstra');
                sound.playPop();
              }}
              className={`px-4 py-2 rounded-xl font-bangers text-xs tracking-wider border-2 transition ${
                activeMode === 'dijkstra'
                  ? 'bg-[#F43F5E] text-white border-black shadow-comic-sm'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              6. Dijkstra Shortest Path
            </button>
            <button
              onClick={() => {
                setActiveMode('interactiveGraph');
                sound.playPop();
              }}
              className={`px-4 py-2 rounded-xl font-bangers text-xs tracking-wider border-2 transition flex items-center gap-1.5 ${
                activeMode === 'interactiveGraph'
                  ? 'bg-cyan-400 text-slate-950 border-black shadow-comic-sm font-black'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              7. Interactive Graph Studio
            </button>
            <button
              onClick={() => {
                setActiveMode('memoryLayout');
                sound.playPop();
              }}
              className={`px-4 py-2 rounded-xl font-bangers text-xs tracking-wider border-2 transition flex items-center gap-1.5 ${
                activeMode === 'memoryLayout'
                  ? 'bg-amber-400 text-slate-950 border-black shadow-comic-sm font-black'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              8. RAM Stack vs Heap Pointer Sandbox
            </button>
          </div>
        </div>
      </div>

      {/* 1. LOMUTO PARTITION STEPPER */}
      {activeMode === 'lomuto' && (
        <div className="bg-[#0c101d] border-2 border-[#1c243a] rounded-2xl p-6 shadow-comic-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-bangers text-2xl text-white">LOMUTO PARTITION INVARIANT (Page 19)</h2>
              <p className="text-xs text-slate-300">
                Pointers: <strong className="text-[#34D399]">i</strong> maintains the boundary of elements &le; Pivot (Small Zone);{' '}
                <strong className="text-[#38BDF8]">j</strong> scans unexplored territory.
              </p>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setStepIndex(Math.max(0, stepIndex - 1));
                  sound.playPop();
                }}
                disabled={stepIndex === 0}
                className="p-2 rounded-lg bg-[#13182b] hover:bg-[#1d243c] text-slate-200 border border-[#232c45] disabled:opacity-40 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FBBF24] text-black font-bangers text-xs border border-black shadow-comic-sm hover:bg-[#f59e0b] transition"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isPlaying ? 'Pause' : 'Play Stepper'}
              </button>
              <button
                onClick={() => {
                  setStepIndex(Math.min(lomutoSteps.length - 1, stepIndex + 1));
                  sound.playPop();
                }}
                disabled={stepIndex === lomutoSteps.length - 1}
                className="p-2 rounded-lg bg-[#13182b] hover:bg-[#1d243c] text-slate-200 border border-[#232c45] disabled:opacity-40 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setStepIndex(0);
                  setIsPlaying(false);
                  sound.playPop();
                }}
                className="p-2 rounded-lg bg-[#13182b] hover:bg-[#1d243c] text-slate-400 hover:text-white border border-[#232c45] transition"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Array Blocks */}
          <div className="py-6 flex flex-col items-center justify-center bg-[#080d19] rounded-2xl border border-[#1b233a] p-6 space-y-8">
            <div className="flex items-end gap-3 sm:gap-4 overflow-x-auto pb-4">
              {currentLomuto.arr.map((val, idx) => {
                const isPivot = idx === currentLomuto.pivotIdx;
                const isI = idx === currentLomuto.i;
                const isJ = idx === currentLomuto.j;
                const inSmallZone = idx <= currentLomuto.i;
                const inBigZone = idx > currentLomuto.i && idx < currentLomuto.j;

                return (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    {/* Top Pointer Indicators */}
                    <div className="h-6 flex items-center justify-center">
                      {isI && isJ ? (
                        <span className="text-[11px] font-bold text-white bg-[#8B5CF6] px-1.5 py-0.5 rounded shadow">
                          i, j
                        </span>
                      ) : isI ? (
                        <span className="text-[11px] font-bold text-black bg-[#10B981] px-1.5 py-0.5 rounded shadow font-mono">
                          i={idx}
                        </span>
                      ) : isJ ? (
                        <span className="text-[11px] font-bold text-black bg-[#38BDF8] px-1.5 py-0.5 rounded shadow font-mono">
                          j={idx}
                        </span>
                      ) : null}
                    </div>

                    {/* Array Box */}
                    <motion.div
                      layout
                      className={`w-14 h-16 rounded-xl flex flex-col items-center justify-center border-2 font-bangers text-2xl transition-all shadow-comic-sm ${
                        isPivot
                          ? 'bg-[#FBBF24] text-black border-black ring-4 ring-[#FBBF24]/40'
                          : inSmallZone
                          ? 'bg-[#071c14] text-[#34D399] border-[#10B981]'
                          : inBigZone
                          ? 'bg-[#240b10] text-[#F43F5E] border-[#F43F5E]'
                          : 'bg-[#13182b] text-slate-200 border-[#222c48]'
                      }`}
                    >
                      <span>{val}</span>
                      <span className="text-[9px] font-mono text-slate-400 font-sans">idx {idx}</span>
                    </motion.div>

                    {/* Bottom Status Tag */}
                    <span className="text-[10px] font-mono text-slate-400">
                      {isPivot ? 'PIVOT' : inSmallZone ? '≤ PIVOT' : inBigZone ? '> PIVOT' : 'UNEXPLORED'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Current Step Narration */}
            <div className="w-full max-w-xl">
              <ComicBubble
                speaker={currentLomuto.pivotIdx === currentLomuto.i ? 'byte' : 'professor'}
                text={currentLomuto.desc}
                subtext={`Step ${stepIndex + 1} of ${lomutoSteps.length}`}
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. MERGE SORT RECURSION TREE */}
      {activeMode === 'mergeSort' && (
        <div className="bg-[#121626] border-2 border-black rounded-2xl p-6 shadow-comic-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-bangers text-2xl text-white">MERGE SORT DIVIDE & CONQUER (Page 24)</h2>
              <p className="text-xs text-gray-400">
                Phase: <strong className="text-[#8C52FF]">{mergeSteps[mergeStep].phase}</strong>. T(N) = 2T(N/2) + O(N) = O(N log N).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setMergeStep(Math.max(0, mergeStep - 1));
                  sound.playPop();
                }}
                disabled={mergeStep === 0}
                className="px-3 py-1.5 rounded-lg bg-[#1e2337] text-xs font-mono text-gray-300 disabled:opacity-40"
              >
                &larr; Prev Step
              </button>
              <button
                onClick={() => {
                  setMergeStep(Math.min(mergeSteps.length - 1, mergeStep + 1));
                  sound.playPop();
                }}
                disabled={mergeStep === mergeSteps.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#8C52FF] text-white font-bangers text-xs shadow-comic-sm disabled:opacity-40"
              >
                Next Step &rarr;
              </button>
            </div>
          </div>

          <div className="py-6 flex flex-col items-center justify-center bg-[#0d101d] rounded-2xl border border-gray-800 p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="p-4 bg-[#181328] rounded-xl border border-[#8C52FF]/40 text-center">
                <span className="text-[10px] text-gray-400 block font-mono">LEFT SUBPROBLEM T(N/2)</span>
                <div className="flex gap-2 justify-center mt-2">
                  {(Array.isArray(mergeSteps[mergeStep].left[0])
                    ? (mergeSteps[mergeStep].left as number[][]).flat()
                    : (mergeSteps[mergeStep].left as number[])
                  ).map((val, idx) => (
                    <div
                      key={idx}
                      className="w-10 h-12 rounded-lg bg-[#8C52FF] text-white flex items-center justify-center font-bangers text-lg border border-black shadow-comic-sm"
                    >
                      {val}
                    </div>
                  ))}
                </div>
              </div>

              {mergeSteps[mergeStep].right.length > 0 && (
                <div className="p-4 bg-[#181328] rounded-xl border border-[#38B6FF]/40 text-center">
                  <span className="text-[10px] text-gray-400 block font-mono">RIGHT SUBPROBLEM T(N/2)</span>
                  <div className="flex gap-2 justify-center mt-2">
                    {(Array.isArray(mergeSteps[mergeStep].right[0])
                      ? (mergeSteps[mergeStep].right as number[][]).flat()
                      : (mergeSteps[mergeStep].right as number[])
                    ).map((val, idx) => (
                      <div
                        key={idx}
                        className="w-10 h-12 rounded-lg bg-[#38B6FF] text-black flex items-center justify-center font-bangers text-lg border border-black shadow-comic-sm"
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full max-w-xl">
              <ComicBubble
                speaker="professor"
                text={mergeSteps[mergeStep].desc}
                subtext={`Phase: ${mergeSteps[mergeStep].phase}`}
              />
            </div>
          </div>
        </div>
      )}

      {/* 6. DIJKSTRA SHORTEST PATH */}
      {activeMode === 'dijkstra' && (
        <div className="bg-[#121626] border-2 border-black rounded-2xl p-6 shadow-comic-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-bangers text-2xl text-white">DIJKSTRA SHORTEST PATH STEPPER (Page 84)</h2>
              <p className="text-xs text-gray-400">
                Greedy edge relaxation via Min-Priority Queue. Runs in O((V + E) log V).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setDijkstraStep(Math.max(0, dijkstraStep - 1));
                  sound.playPop();
                }}
                disabled={dijkstraStep === 0}
                className="px-3 py-1.5 rounded-lg bg-[#1e2337] text-xs font-mono text-gray-300 disabled:opacity-40"
              >
                &larr; Prev Step
              </button>
              <button
                onClick={() => {
                  setDijkstraStep(Math.min(dijkstraSteps.length - 1, dijkstraStep + 1));
                  sound.playPop();
                }}
                disabled={dijkstraStep === dijkstraSteps.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#FF5757] text-white font-bangers text-xs shadow-comic-sm disabled:opacity-40"
              >
                Next Step &rarr;
              </button>
            </div>
          </div>

          <div className="py-6 flex flex-col items-center justify-center bg-[#0d101d] rounded-2xl border border-gray-800 p-6 space-y-6">
            {/* Graph Node Distance Table */}
            <div className="grid grid-cols-5 gap-3 max-w-lg w-full font-mono text-center">
              {Object.entries(dijkstraSteps[dijkstraStep].distances).map(([node, dist]) => {
                const isCurrent = node === dijkstraSteps[dijkstraStep].currentNode;
                return (
                  <div
                    key={node}
                    className={`p-3 rounded-xl border-2 transition ${
                      isCurrent
                        ? 'bg-[#FFDE59] text-black border-black font-bold shadow-comic-sm scale-105'
                        : 'bg-[#15192c] text-white border-gray-700'
                    }`}
                  >
                    <span className="text-[10px] block opacity-75">Node {node}</span>
                    <strong className="text-base font-bangers">{dist}</strong>
                  </div>
                );
              })}
            </div>

            {/* PQ Status */}
            <div className="p-3 bg-[#111424] rounded-xl border border-gray-700 text-xs font-mono text-gray-300">
              Min-Heap Priority Queue: <strong className="text-[#7ED957]">{dijkstraSteps[dijkstraStep].pq.join(', ')}</strong>
            </div>

            <div className="w-full max-w-xl">
              <ComicBubble
                speaker="byte"
                text={dijkstraSteps[dijkstraStep].log}
                subtext={`Visiting Node ${dijkstraSteps[dijkstraStep].currentNode}`}
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. BST INTERACTIVE SEARCH PATH */}
      {activeMode === 'bst' && (
        <div className="bg-[#121626] border-2 border-black rounded-2xl p-6 shadow-comic-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-bangers text-2xl text-white">BINARY SEARCH TREE PATH EXPLORER (Page 28)</h2>
              <p className="text-xs text-gray-400">
                Left Subtree &lt; Node &lt; Right Subtree. Click a target number to trace the search trajectory!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Search Target:</span>
              {[1, 6, 10, 14].map(val => (
                <button
                  key={val}
                  onClick={() => handleSearchBST(val)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                    treeSearchTarget === val
                      ? 'bg-[#38B6FF] text-black shadow-comic-sm'
                      : 'bg-[#1e2337] text-gray-300 hover:text-white'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div className="py-6 flex flex-col items-center justify-center bg-[#0d101d] rounded-2xl border border-gray-800 p-6">
            <svg viewBox="0 0 400 240" className="w-full max-w-md h-auto">
              {/* Edges */}
              <line x1="200" y1="50" x2="120" y2="110" stroke="#374151" strokeWidth="3" />
              <line x1="200" y1="50" x2="280" y2="110" stroke="#374151" strokeWidth="3" />
              <line x1="120" y1="120" x2="70" y2="180" stroke="#374151" strokeWidth="3" />
              <line x1="120" y1="120" x2="160" y2="180" stroke="#374151" strokeWidth="3" />
              <line x1="280" y1="120" x2="330" y2="180" stroke="#374151" strokeWidth="3" />

              {/* Highlighted Search Path Glow */}
              {highlightedNodeIds.includes(1) && highlightedNodeIds.includes(2) && (
                <line x1="200" y1="50" x2="120" y2="110" stroke="#7ED957" strokeWidth="4" />
              )}
              {highlightedNodeIds.includes(2) && highlightedNodeIds.includes(4) && (
                <line x1="120" y1="120" x2="160" y2="180" stroke="#7ED957" strokeWidth="4" />
              )}
              {highlightedNodeIds.includes(2) && highlightedNodeIds.includes(3) && (
                <line x1="120" y1="120" x2="70" y2="180" stroke="#7ED957" strokeWidth="4" />
              )}
              {highlightedNodeIds.includes(1) && highlightedNodeIds.includes(5) && (
                <line x1="200" y1="50" x2="280" y2="110" stroke="#7ED957" strokeWidth="4" />
              )}
              {highlightedNodeIds.includes(5) && highlightedNodeIds.includes(6) && (
                <line x1="280" y1="120" x2="330" y2="180" stroke="#7ED957" strokeWidth="4" />
              )}

              {/* Node Circles */}
              {[
                { id: 1, val: 8, x: 200, y: 50 },
                { id: 2, val: 3, x: 120, y: 110 },
                { id: 5, val: 10, x: 280, y: 110 },
                { id: 3, val: 1, x: 70, y: 180 },
                { id: 4, val: 6, x: 160, y: 180 },
                { id: 6, val: 14, x: 330, y: 180 },
              ].map(n => {
                const isHighlighted = highlightedNodeIds.includes(n.id);
                const isTarget = n.val === treeSearchTarget;
                return (
                  <g key={n.id} className="cursor-pointer" onClick={() => handleSearchBST(n.val)}>
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r="18"
                      fill={isTarget ? '#FFDE59' : isHighlighted ? '#7ED957' : '#1e2337'}
                      stroke={isTarget ? '#000' : isHighlighted ? '#4ade80' : '#4b5563'}
                      strokeWidth="3"
                    />
                    <text
                      x={n.x}
                      y={n.y + 5}
                      textAnchor="middle"
                      fill={isTarget || isHighlighted ? '#000' : '#FFF'}
                      fontFamily="Bangers"
                      fontSize="14"
                    >
                      {n.val}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="mt-4 text-center">
              <span className="text-xs text-gray-400">
                Active Trajectory:{' '}
                <strong className="text-[#7ED957] font-mono">
                  {highlightedNodeIds.map(id => (id === 1 ? '8' : id === 2 ? '3' : id === 4 ? '6' : id === 3 ? '1' : id === 5 ? '10' : '14')).join(' → ')}
                </strong>{' '}
                (Found in {highlightedNodeIds.length} steps: O(log N) efficiency)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5. MERGE SORT RECURSION TREE */}
      {activeMode === 'mergeSort' && (
        <div className="bg-[#121626] border-2 border-black rounded-2xl p-6 shadow-comic-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-bangers text-2xl text-white">MERGE SORT DIVIDE & CONQUER (Page 24)</h2>
              <p className="text-xs text-gray-400">
                Phase: <strong className="text-[#8C52FF]">{mergeSteps[mergeStep].phase}</strong>. T(N) = 2T(N/2) + O(N) = O(N log N).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setMergeStep(Math.max(0, mergeStep - 1));
                  sound.playPop();
                }}
                disabled={mergeStep === 0}
                className="px-3 py-1.5 rounded-lg bg-[#1e2337] text-xs font-mono text-gray-300 disabled:opacity-40"
              >
                &larr; Prev Step
              </button>
              <button
                onClick={() => {
                  setMergeStep(Math.min(mergeSteps.length - 1, mergeStep + 1));
                  sound.playPop();
                }}
                disabled={mergeStep === mergeSteps.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#8C52FF] text-white font-bangers text-xs shadow-comic-sm disabled:opacity-40"
              >
                Next Step &rarr;
              </button>
            </div>
          </div>

          <div className="py-6 flex flex-col items-center justify-center bg-[#0d101d] rounded-2xl border border-gray-800 p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="p-4 bg-[#181328] rounded-xl border border-[#8C52FF]/40 text-center">
                <span className="text-[10px] text-gray-400 block font-mono">LEFT SUBPROBLEM T(N/2)</span>
                <div className="flex gap-2 justify-center mt-2">
                  {(Array.isArray(mergeSteps[mergeStep].left[0])
                    ? (mergeSteps[mergeStep].left as number[][]).flat()
                    : (mergeSteps[mergeStep].left as number[])
                  ).map((val, idx) => (
                    <div
                      key={idx}
                      className="w-10 h-12 rounded-lg bg-[#8C52FF] text-white flex items-center justify-center font-bangers text-lg border border-black shadow-comic-sm"
                    >
                      {val}
                    </div>
                  ))}
                </div>
              </div>

              {mergeSteps[mergeStep].right.length > 0 && (
                <div className="p-4 bg-[#181328] rounded-xl border border-[#38B6FF]/40 text-center">
                  <span className="text-[10px] text-gray-400 block font-mono">RIGHT SUBPROBLEM T(N/2)</span>
                  <div className="flex gap-2 justify-center mt-2">
                    {(Array.isArray(mergeSteps[mergeStep].right[0])
                      ? (mergeSteps[mergeStep].right as number[][]).flat()
                      : (mergeSteps[mergeStep].right as number[])
                    ).map((val, idx) => (
                      <div
                        key={idx}
                        className="w-10 h-12 rounded-lg bg-[#38B6FF] text-black flex items-center justify-center font-bangers text-lg border border-black shadow-comic-sm"
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full max-w-xl">
              <ComicBubble
                speaker="professor"
                text={mergeSteps[mergeStep].desc}
                subtext={`Phase: ${mergeSteps[mergeStep].phase}`}
              />
            </div>
          </div>
        </div>
      )}

      {/* 6. DIJKSTRA SHORTEST PATH */}
      {activeMode === 'dijkstra' && (
        <div className="bg-[#121626] border-2 border-black rounded-2xl p-6 shadow-comic-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-bangers text-2xl text-white">DIJKSTRA SHORTEST PATH STEPPER (Page 84)</h2>
              <p className="text-xs text-gray-400">
                Greedy edge relaxation via Min-Priority Queue. Runs in O((V + E) log V).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setDijkstraStep(Math.max(0, dijkstraStep - 1));
                  sound.playPop();
                }}
                disabled={dijkstraStep === 0}
                className="px-3 py-1.5 rounded-lg bg-[#1e2337] text-xs font-mono text-gray-300 disabled:opacity-40"
              >
                &larr; Prev Step
              </button>
              <button
                onClick={() => {
                  setDijkstraStep(Math.min(dijkstraSteps.length - 1, dijkstraStep + 1));
                  sound.playPop();
                }}
                disabled={dijkstraStep === dijkstraSteps.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#FF5757] text-white font-bangers text-xs shadow-comic-sm disabled:opacity-40"
              >
                Next Step &rarr;
              </button>
            </div>
          </div>

          <div className="py-6 flex flex-col items-center justify-center bg-[#0d101d] rounded-2xl border border-gray-800 p-6 space-y-6">
            {/* Graph Node Distance Table */}
            <div className="grid grid-cols-5 gap-3 max-w-lg w-full font-mono text-center">
              {Object.entries(dijkstraSteps[dijkstraStep].distances).map(([node, dist]) => {
                const isCurrent = node === dijkstraSteps[dijkstraStep].currentNode;
                return (
                  <div
                    key={node}
                    className={`p-3 rounded-xl border-2 transition ${
                      isCurrent
                        ? 'bg-[#FFDE59] text-black border-black font-bold shadow-comic-sm scale-105'
                        : 'bg-[#15192c] text-white border-gray-700'
                    }`}
                  >
                    <span className="text-[10px] block opacity-75">Node {node}</span>
                    <strong className="text-base font-bangers">{dist}</strong>
                  </div>
                );
              })}
            </div>

            {/* PQ Status */}
            <div className="p-3 bg-[#111424] rounded-xl border border-gray-700 text-xs font-mono text-gray-300">
              Min-Heap Priority Queue: <strong className="text-[#7ED957]">{dijkstraSteps[dijkstraStep].pq.join(', ')}</strong>
            </div>

            <div className="w-full max-w-xl">
              <ComicBubble
                speaker="byte"
                text={dijkstraSteps[dijkstraStep].log}
                subtext={`Visiting Node ${dijkstraSteps[dijkstraStep].currentNode}`}
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. HEAP ARRAY-TREE MAPPER */}
      {activeMode === 'heap' && (
        <div className="bg-[#121626] border-2 border-black rounded-2xl p-6 shadow-comic-sm space-y-6">
          <div>
            <h2 className="font-bangers text-2xl text-white">ARRAY-TO-BINARY-HEAP MAPPER (Page 38)</h2>
            <p className="text-xs text-gray-400">
              Binary heaps require no pointers! Click any index in the array to view its parent and children.
            </p>
          </div>

          <div className="py-6 flex flex-col items-center justify-center bg-[#0d101d] rounded-2xl border border-gray-800 p-6 space-y-6">
            {/* Array representation */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {heapArray.map((val, idx) => {
                const isSelected = idx === selectedHeapIndex;
                const isParent = idx === getParent(selectedHeapIndex);
                const isLeft = idx === getLeftChild(selectedHeapIndex);
                const isRight = idx === getRightChild(selectedHeapIndex);

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedHeapIndex(idx);
                      sound.playPop();
                    }}
                    className={`w-14 h-16 rounded-xl flex flex-col items-center justify-center border-2 font-bangers text-xl transition shadow-comic-sm ${
                      isSelected
                        ? 'bg-[#7ED957] text-black border-black scale-105'
                        : isParent
                        ? 'bg-[#FFDE59]/20 text-[#FFDE59] border-[#FFDE59]'
                        : isLeft || isRight
                        ? 'bg-[#38B6FF]/20 text-[#38B6FF] border-[#38B6FF]'
                        : 'bg-[#1a1f33] text-gray-300 border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <span>{val}</span>
                    <span className="text-[10px] font-mono font-sans opacity-70">i = {idx}</span>
                  </button>
                );
              })}
            </div>

            {/* Pointer Relationship Breakdown */}
            <div className="p-4 bg-[#141829] rounded-xl border border-gray-700 text-xs text-gray-300 space-y-2 max-w-lg w-full">
              <div className="font-bold text-white flex items-center justify-between">
                <span>Selected Node: arr[{selectedHeapIndex}] = {heapArray[selectedHeapIndex]}</span>
                <span className="text-[#7ED957] font-mono">Index {selectedHeapIndex}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono">
                <div className="p-2 bg-[#0e111d] rounded border border-yellow-500/30">
                  <span className="text-gray-400 block text-[10px]">Parent (i-1)//2</span>
                  <span className="text-[#FFDE59] font-bold">
                    {getParent(selectedHeapIndex) !== null
                      ? `arr[${getParent(selectedHeapIndex)}] = ${heapArray[getParent(selectedHeapIndex)!]}`
                      : 'None (Root)'}
                  </span>
                </div>
                <div className="p-2 bg-[#0e111d] rounded border border-blue-500/30">
                  <span className="text-gray-400 block text-[10px]">Left 2i+1</span>
                  <span className="text-[#38B6FF] font-bold">
                    {getLeftChild(selectedHeapIndex) !== null
                      ? `arr[${getLeftChild(selectedHeapIndex)}] = ${heapArray[getLeftChild(selectedHeapIndex)!]}`
                      : 'None'}
                  </span>
                </div>
                <div className="p-2 bg-[#0e111d] rounded border border-blue-500/30">
                  <span className="text-gray-400 block text-[10px]">Right 2i+2</span>
                  <span className="text-[#38B6FF] font-bold">
                    {getRightChild(selectedHeapIndex) !== null
                      ? `arr[${getRightChild(selectedHeapIndex)}] = ${heapArray[getRightChild(selectedHeapIndex)!]}`
                      : 'None'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. MERGE SORT RECURSION TREE */}
      {activeMode === 'mergeSort' && (
        <div className="bg-[#121626] border-2 border-black rounded-2xl p-6 shadow-comic-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-bangers text-2xl text-white">MERGE SORT DIVIDE & CONQUER (Page 24)</h2>
              <p className="text-xs text-gray-400">
                Phase: <strong className="text-[#8C52FF]">{mergeSteps[mergeStep].phase}</strong>. T(N) = 2T(N/2) + O(N) = O(N log N).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setMergeStep(Math.max(0, mergeStep - 1));
                  sound.playPop();
                }}
                disabled={mergeStep === 0}
                className="px-3 py-1.5 rounded-lg bg-[#1e2337] text-xs font-mono text-gray-300 disabled:opacity-40"
              >
                &larr; Prev Step
              </button>
              <button
                onClick={() => {
                  setMergeStep(Math.min(mergeSteps.length - 1, mergeStep + 1));
                  sound.playPop();
                }}
                disabled={mergeStep === mergeSteps.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#8C52FF] text-white font-bangers text-xs shadow-comic-sm disabled:opacity-40"
              >
                Next Step &rarr;
              </button>
            </div>
          </div>

          <div className="py-6 flex flex-col items-center justify-center bg-[#0d101d] rounded-2xl border border-gray-800 p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="p-4 bg-[#181328] rounded-xl border border-[#8C52FF]/40 text-center">
                <span className="text-[10px] text-gray-400 block font-mono">LEFT SUBPROBLEM T(N/2)</span>
                <div className="flex gap-2 justify-center mt-2">
                  {(Array.isArray(mergeSteps[mergeStep].left[0])
                    ? (mergeSteps[mergeStep].left as number[][]).flat()
                    : (mergeSteps[mergeStep].left as number[])
                  ).map((val, idx) => (
                    <div
                      key={idx}
                      className="w-10 h-12 rounded-lg bg-[#8C52FF] text-white flex items-center justify-center font-bangers text-lg border border-black shadow-comic-sm"
                    >
                      {val}
                    </div>
                  ))}
                </div>
              </div>

              {mergeSteps[mergeStep].right.length > 0 && (
                <div className="p-4 bg-[#181328] rounded-xl border border-[#38B6FF]/40 text-center">
                  <span className="text-[10px] text-gray-400 block font-mono">RIGHT SUBPROBLEM T(N/2)</span>
                  <div className="flex gap-2 justify-center mt-2">
                    {(Array.isArray(mergeSteps[mergeStep].right[0])
                      ? (mergeSteps[mergeStep].right as number[][]).flat()
                      : (mergeSteps[mergeStep].right as number[])
                    ).map((val, idx) => (
                      <div
                        key={idx}
                        className="w-10 h-12 rounded-lg bg-[#38B6FF] text-black flex items-center justify-center font-bangers text-lg border border-black shadow-comic-sm"
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full max-w-xl">
              <ComicBubble
                speaker="professor"
                text={mergeSteps[mergeStep].desc}
                subtext={`Phase: ${mergeSteps[mergeStep].phase}`}
              />
            </div>
          </div>
        </div>
      )}

      {/* 6. DIJKSTRA SHORTEST PATH */}
      {activeMode === 'dijkstra' && (
        <div className="bg-[#121626] border-2 border-black rounded-2xl p-6 shadow-comic-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-bangers text-2xl text-white">DIJKSTRA SHORTEST PATH STEPPER (Page 84)</h2>
              <p className="text-xs text-gray-400">
                Greedy edge relaxation via Min-Priority Queue. Runs in O((V + E) log V).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setDijkstraStep(Math.max(0, dijkstraStep - 1));
                  sound.playPop();
                }}
                disabled={dijkstraStep === 0}
                className="px-3 py-1.5 rounded-lg bg-[#1e2337] text-xs font-mono text-gray-300 disabled:opacity-40"
              >
                &larr; Prev Step
              </button>
              <button
                onClick={() => {
                  setDijkstraStep(Math.min(dijkstraSteps.length - 1, dijkstraStep + 1));
                  sound.playPop();
                }}
                disabled={dijkstraStep === dijkstraSteps.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#FF5757] text-white font-bangers text-xs shadow-comic-sm disabled:opacity-40"
              >
                Next Step &rarr;
              </button>
            </div>
          </div>

          <div className="py-6 flex flex-col items-center justify-center bg-[#0d101d] rounded-2xl border border-gray-800 p-6 space-y-6">
            {/* Graph Node Distance Table */}
            <div className="grid grid-cols-5 gap-3 max-w-lg w-full font-mono text-center">
              {Object.entries(dijkstraSteps[dijkstraStep].distances).map(([node, dist]) => {
                const isCurrent = node === dijkstraSteps[dijkstraStep].currentNode;
                return (
                  <div
                    key={node}
                    className={`p-3 rounded-xl border-2 transition ${
                      isCurrent
                        ? 'bg-[#FFDE59] text-black border-black font-bold shadow-comic-sm scale-105'
                        : 'bg-[#15192c] text-white border-gray-700'
                    }`}
                  >
                    <span className="text-[10px] block opacity-75">Node {node}</span>
                    <strong className="text-base font-bangers">{dist}</strong>
                  </div>
                );
              })}
            </div>

            {/* PQ Status */}
            <div className="p-3 bg-[#111424] rounded-xl border border-gray-700 text-xs font-mono text-gray-300">
              Min-Heap Priority Queue: <strong className="text-[#7ED957]">{dijkstraSteps[dijkstraStep].pq.join(', ')}</strong>
            </div>

            <div className="w-full max-w-xl">
              <ComicBubble
                speaker="byte"
                text={dijkstraSteps[dijkstraStep].log}
                subtext={`Visiting Node ${dijkstraSteps[dijkstraStep].currentNode}`}
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. SLIDING WINDOW STEPPER */}
      {activeMode === 'slidingWindow' && (
        <div className="bg-[#121626] border-2 border-black rounded-2xl p-6 shadow-comic-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-bangers text-2xl text-white">SLIDING WINDOW ENGINE (Page 98)</h2>
              <p className="text-xs text-gray-400">
                Window range: [{windowLeft} ... {windowRight}]. Length = {windowRight - windowLeft + 1}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setWindowLeft(Math.max(0, windowLeft - 1));
                  sound.playPop();
                }}
                className="px-2.5 py-1 rounded bg-[#1e2337] text-xs font-mono text-gray-300"
              >
                Left -1
              </button>
              <button
                onClick={() => {
                  setWindowLeft(Math.min(windowRight, windowLeft + 1));
                  sound.playPop();
                }}
                className="px-2.5 py-1 rounded bg-[#1e2337] text-xs font-mono text-gray-300"
              >
                Left +1
              </button>
              <button
                onClick={() => {
                  setWindowRight(Math.min(stringSample.length - 1, windowRight + 1));
                  sound.playPop();
                }}
                className="px-2.5 py-1 rounded bg-[#FF914D] text-xs font-mono text-black font-bold"
              >
                Expand Right +1
              </button>
            </div>
          </div>

          <div className="py-6 flex flex-col items-center justify-center bg-[#0d101d] rounded-2xl border border-gray-800 p-6 space-y-4">
            <div className="flex gap-3">
              {stringSample.map((ch, idx) => {
                const inWindow = idx >= windowLeft && idx <= windowRight;
                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-12 h-14 rounded-xl flex items-center justify-center font-bangers text-2xl border-2 transition ${
                        inWindow
                          ? 'bg-[#FF914D] text-black border-black shadow-comic-sm scale-105'
                          : 'bg-[#1b1f33] text-gray-400 border-gray-700'
                      }`}
                    >
                      {ch}
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">idx {idx}</span>
                  </div>
                );
              })}
            </div>

            <div className="text-xs text-gray-300">
              Current Substring Window:{' '}
              <strong className="text-[#FF914D] font-mono">
                "{stringSample.slice(windowLeft, windowRight + 1).join('')}"
              </strong>{' '}
              (Length: {windowRight - windowLeft + 1})
            </div>
          </div>
        </div>
      )}

      {/* 5. MERGE SORT RECURSION TREE */}
      {activeMode === 'mergeSort' && (
        <div className="bg-[#121626] border-2 border-black rounded-2xl p-6 shadow-comic-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-bangers text-2xl text-white">MERGE SORT DIVIDE & CONQUER (Page 24)</h2>
              <p className="text-xs text-gray-400">
                Phase: <strong className="text-[#8C52FF]">{mergeSteps[mergeStep].phase}</strong>. T(N) = 2T(N/2) + O(N) = O(N log N).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setMergeStep(Math.max(0, mergeStep - 1));
                  sound.playPop();
                }}
                disabled={mergeStep === 0}
                className="px-3 py-1.5 rounded-lg bg-[#1e2337] text-xs font-mono text-gray-300 disabled:opacity-40"
              >
                &larr; Prev Step
              </button>
              <button
                onClick={() => {
                  setMergeStep(Math.min(mergeSteps.length - 1, mergeStep + 1));
                  sound.playPop();
                }}
                disabled={mergeStep === mergeSteps.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#8C52FF] text-white font-bangers text-xs shadow-comic-sm disabled:opacity-40"
              >
                Next Step &rarr;
              </button>
            </div>
          </div>

          <div className="py-6 flex flex-col items-center justify-center bg-[#0d101d] rounded-2xl border border-gray-800 p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="p-4 bg-[#181328] rounded-xl border border-[#8C52FF]/40 text-center">
                <span className="text-[10px] text-gray-400 block font-mono">LEFT SUBPROBLEM T(N/2)</span>
                <div className="flex gap-2 justify-center mt-2">
                  {(Array.isArray(mergeSteps[mergeStep].left[0])
                    ? (mergeSteps[mergeStep].left as number[][]).flat()
                    : (mergeSteps[mergeStep].left as number[])
                  ).map((val, idx) => (
                    <div
                      key={idx}
                      className="w-10 h-12 rounded-lg bg-[#8C52FF] text-white flex items-center justify-center font-bangers text-lg border border-black shadow-comic-sm"
                    >
                      {val}
                    </div>
                  ))}
                </div>
              </div>

              {mergeSteps[mergeStep].right.length > 0 && (
                <div className="p-4 bg-[#181328] rounded-xl border border-[#38B6FF]/40 text-center">
                  <span className="text-[10px] text-gray-400 block font-mono">RIGHT SUBPROBLEM T(N/2)</span>
                  <div className="flex gap-2 justify-center mt-2">
                    {(Array.isArray(mergeSteps[mergeStep].right[0])
                      ? (mergeSteps[mergeStep].right as number[][]).flat()
                      : (mergeSteps[mergeStep].right as number[])
                    ).map((val, idx) => (
                      <div
                        key={idx}
                        className="w-10 h-12 rounded-lg bg-[#38B6FF] text-black flex items-center justify-center font-bangers text-lg border border-black shadow-comic-sm"
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full max-w-xl">
              <ComicBubble
                speaker="professor"
                text={mergeSteps[mergeStep].desc}
                subtext={`Phase: ${mergeSteps[mergeStep].phase}`}
              />
            </div>
          </div>
        </div>
      )}

      {/* 6. DIJKSTRA SHORTEST PATH */}
      {activeMode === 'dijkstra' && (
        <div className="bg-[#121626] border-2 border-black rounded-2xl p-6 shadow-comic-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-bangers text-2xl text-white">DIJKSTRA SHORTEST PATH STEPPER (Page 84)</h2>
              <p className="text-xs text-gray-400">
                Greedy edge relaxation via Min-Priority Queue. Runs in O((V + E) log V).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setDijkstraStep(Math.max(0, dijkstraStep - 1));
                  sound.playPop();
                }}
                disabled={dijkstraStep === 0}
                className="px-3 py-1.5 rounded-lg bg-[#1e2337] text-xs font-mono text-gray-300 disabled:opacity-40"
              >
                &larr; Prev Step
              </button>
              <button
                onClick={() => {
                  setDijkstraStep(Math.min(dijkstraSteps.length - 1, dijkstraStep + 1));
                  sound.playPop();
                }}
                disabled={dijkstraStep === dijkstraSteps.length - 1}
                className="px-3 py-1.5 rounded-lg bg-[#FF5757] text-white font-bangers text-xs shadow-comic-sm disabled:opacity-40"
              >
                Next Step &rarr;
              </button>
            </div>
          </div>

          <div className="py-6 flex flex-col items-center justify-center bg-[#0d101d] rounded-2xl border border-gray-800 p-6 space-y-6">
            {/* Graph Node Distance Table */}
            <div className="grid grid-cols-5 gap-3 max-w-lg w-full font-mono text-center">
              {Object.entries(dijkstraSteps[dijkstraStep].distances).map(([node, dist]) => {
                const isCurrent = node === dijkstraSteps[dijkstraStep].currentNode;
                return (
                  <div
                    key={node}
                    className={`p-3 rounded-xl border-2 transition ${
                      isCurrent
                        ? 'bg-[#FFDE59] text-black border-black font-bold shadow-comic-sm scale-105'
                        : 'bg-[#15192c] text-white border-gray-700'
                    }`}
                  >
                    <span className="text-[10px] block opacity-75">Node {node}</span>
                    <strong className="text-base font-bangers">{dist}</strong>
                  </div>
                );
              })}
            </div>

            {/* PQ Status */}
            <div className="p-3 bg-[#111424] rounded-xl border border-gray-700 text-xs font-mono text-gray-300">
              Min-Heap Priority Queue: <strong className="text-[#7ED957]">{dijkstraSteps[dijkstraStep].pq.join(', ')}</strong>
            </div>

            <div className="w-full max-w-xl">
              <ComicBubble
                speaker="byte"
                text={dijkstraSteps[dijkstraStep].log}
                subtext={`Visiting Node ${dijkstraSteps[dijkstraStep].currentNode}`}
              />
            </div>
          </div>
        </div>
      )}

      {/* 7. INTERACTIVE GRAPH & TREE STUDIO */}
      {activeMode === 'interactiveGraph' && <InteractiveGraphStudio />}

      {/* 8. RAM STACK VS HEAP POINTER SANDBOX */}
      {activeMode === 'memoryLayout' && <MemoryLayoutVisualizer />}
    </div>
  );
};
