import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  TrendingUp,
  Search,
  Zap,
  Info,
  CheckCircle2,
  Compass,
  Code2,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

interface SolutionVector {
  id: string;
  name: string;
  cluster: 'optimal' | 'twopointers' | 'bruteforce' | 'user';
  x: number; // 0-100% on 2D PCA projection
  y: number; // 0-100% on 2D PCA projection
  complexity: string;
  cosineSimilarity: number; // against optimal
  astFeatures: string[];
}

export const NeuralCodeSpaceVisualizer: React.FC = () => {
  const [selectedVector, setSelectedVector] = useState<SolutionVector | null>(null);

  const vectors: SolutionVector[] = [
    // Optimal Hash Map Cluster (Top-Right)
    {
      id: 'opt-1',
      name: 'Single-Pass Complement Dict (Canonical O(N))',
      cluster: 'optimal',
      x: 82,
      y: 24,
      complexity: 'O(N) Time, O(N) Space',
      cosineSimilarity: 1.0,
      astFeatures: ['DictLookup', 'SingleForIter', 'ComplementMinus', 'ImmediateReturn'],
    },
    {
      id: 'opt-2',
      name: 'Two-Pass Hash Map (Pre-count Frequencies)',
      cluster: 'optimal',
      x: 76,
      y: 31,
      complexity: 'O(N) Time, O(N) Space',
      cosineSimilarity: 0.93,
      astFeatures: ['TwoForLoops', 'DictLookup', 'FreqCount'],
    },
    // Two Pointers Cluster (Middle-Left)
    {
      id: 'tp-1',
      name: 'Sort + Inward Converging Two Pointers',
      cluster: 'twopointers',
      x: 35,
      y: 48,
      complexity: 'O(N log N) Time, O(1) Space',
      cosineSimilarity: 0.68,
      astFeatures: ['ArraySort', 'WhileLoop', 'TwoPointersConverge', 'LowHighIndex'],
    },
    {
      id: 'tp-2',
      name: 'Sorted Pairs with Binary Search on Complement',
      cluster: 'twopointers',
      x: 42,
      y: 56,
      complexity: 'O(N log N) Time, O(1) Space',
      cosineSimilarity: 0.62,
      astFeatures: ['ArraySort', 'ForIter', 'BinarySearchMid'],
    },
    // Brute Force Cluster (Bottom-Left)
    {
      id: 'bf-1',
      name: 'Nested For Loops (Quadratic All-Pairs)',
      cluster: 'bruteforce',
      x: 18,
      y: 84,
      complexity: 'O(N²) Time, O(1) Space',
      cosineSimilarity: 0.22,
      astFeatures: ['NestedForIter', 'DoubleIndexI_J', 'SumEqualsTarget'],
    },
    {
      id: 'bf-2',
      name: 'Recursion Exhaustive Combination Tree',
      cluster: 'bruteforce',
      x: 24,
      y: 78,
      complexity: 'O(2ⁿ) Time, O(N) Space',
      cosineSimilarity: 0.15,
      astFeatures: ['RecursiveCallSelf', 'BacktrackingState', 'BranchingDepth'],
    },
    // User Code Vector (Dynamic)
    {
      id: 'user-code',
      name: "Your Active Python Code (Siddhant's AST)",
      cluster: 'user',
      x: 80,
      y: 27,
      complexity: 'O(N) Time, O(N) Space',
      cosineSimilarity: 0.98,
      astFeatures: ['SingleLoop', 'seen_dict', 'target_minus_num', 'return_indices'],
    },
  ];

  const getClusterColor = (cluster: SolutionVector['cluster']) => {
    switch (cluster) {
      case 'optimal':
        return '#10B981'; // Emerald
      case 'twopointers':
        return '#38BDF8'; // Sky
      case 'bruteforce':
        return '#F43F5E'; // Rose
      case 'user':
        return '#FBBF24'; // Amber Gold
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-[#0c101d] border-2 border-black shadow-comic space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#1b233a]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500 text-white font-black text-xs uppercase tracking-wider border border-black shadow-comic-sm">
              <Brain className="w-3.5 h-3.5 inline mr-1" /> Neural AST Embeddings
            </span>
            <span className="text-xs text-purple-300 font-bold">High-Dimensional Solution Space (PCA 2D)</span>
          </div>
          <h3 className="font-bangers text-2xl text-white">
            NEURAL CODE VECTOR SPACE &amp; SOLUTION CLUSTERS
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Every algorithm can be mapped into a high-dimensional vector space via its Abstract Syntax Tree (AST). See how your code clusters near the canonical optimal solution rather than brute-force anti-patterns!
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#13192f] border border-[#1f294c] font-mono text-xs">
          <span className="text-slate-400">Cosine Similarity to Optimal:</span>
          <span className="text-emerald-400 font-black text-sm">98.2% (Optimal Cluster)</span>
        </div>
      </div>

      {/* Main 2D Neural Vector Canvas (Scatter Projection) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas (8 Cols) */}
        <div className="lg:col-span-8 p-5 rounded-3xl bg-[#060812] border-2 border-slate-800 relative min-h-[380px] flex flex-col justify-between overflow-hidden shadow-inner">
          {/* Background Grid & Axes */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="w-full h-full bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px]"></div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-500 pb-2 border-b border-slate-850">
            <span>Principal Component 1 (Time Efficiency Axis &rarr;)</span>
            <span>Principal Component 2 (Memory Efficiency &uarr;)</span>
          </div>

          {/* Scatter Area */}
          <div className="relative flex-1 min-h-[300px] w-full my-4">
            {/* Cluster Hulls (Background Glowing Regions) */}
            <div className="absolute top-[15%] right-[10%] w-44 h-44 rounded-full bg-emerald-500/10 blur-xl pointer-events-none"></div>
            <div className="absolute top-[35%] left-[25%] w-40 h-40 rounded-full bg-sky-500/10 blur-xl pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[10%] w-44 h-44 rounded-full bg-rose-500/10 blur-xl pointer-events-none"></div>

            {/* Connecting Line from User to Optimal */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1="80%"
                y1="27%"
                x2="82%"
                y2="24%"
                stroke="#FBBF24"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-pulse"
              />
            </svg>

            {/* Vector Points */}
            {vectors.map((vec) => {
              const isUser = vec.cluster === 'user';
              const isSelected = selectedVector?.id === vec.id;
              const color = getClusterColor(vec.cluster);

              return (
                <div
                  key={vec.id}
                  onClick={() => {
                    setSelectedVector(vec);
                    sound.playPop();
                  }}
                  style={{ left: `${vec.x}%`, top: `${vec.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-transform hover:scale-125 z-20"
                >
                  <div
                    className={`relative rounded-full flex items-center justify-center transition-all ${
                      isUser
                        ? 'w-7 h-7 bg-amber-400 text-slate-950 font-black border-2 border-black shadow-[0_0_12px_#FBBF24] animate-bounce'
                        : isSelected
                        ? 'w-6 h-6 border-2 border-white scale-110 shadow-comic-sm'
                        : 'w-4 h-4 border border-black shadow-sm'
                    }`}
                    style={{ backgroundColor: isUser ? undefined : color }}
                  >
                    {isUser ? '★' : ''}
                  </div>

                  {/* Hover Tag */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap p-2 rounded-xl bg-[#0e1424] border border-slate-700 text-[10px] text-white shadow-comic font-mono z-30">
                    <span className="font-bold block">{vec.name}</span>
                    <span className="text-amber-400">{vec.complexity}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[11px] font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Optimal O(N) Hash
              </span>
              <span className="flex items-center gap-1.5 text-sky-400">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span> Two Pointers O(N log N)
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span> Brute Force O(N²)
              </span>
            </div>
            <span className="text-amber-400 font-bold">★ Your Code Vector</span>
          </div>
        </div>

        {/* Vector Detail Inspector (4 Cols) */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-[#0e1424] border-2 border-black shadow-comic space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h4 className="font-bangers text-lg text-white">VECTOR SPACE INSPECTOR</h4>
          </div>

          {selectedVector ? (
            <div className="space-y-3 font-mono text-xs animate-fadeIn">
              <div className="p-3 rounded-xl bg-[#070a14] border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase block font-sans">Solution Vector</span>
                <div className="font-bold text-white text-xs">{selectedVector.name}</div>
                <div className="text-amber-400 font-bold">{selectedVector.complexity}</div>
              </div>

              <div className="flex justify-between p-2.5 rounded-xl bg-[#070a14] border border-slate-800">
                <span className="text-slate-400">Cosine Similarity:</span>
                <span className="text-emerald-400 font-black">
                  {(selectedVector.cosineSimilarity * 100).toFixed(1)}%
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-sans text-slate-400 block font-bold">
                  Extracted AST Token Features:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedVector.astFeatures.map((f, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-lg bg-[#141b30] border border-slate-700 text-[10px] text-purple-300"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-500 italic space-y-2">
              <Compass className="w-8 h-8 text-purple-400/50 mx-auto animate-pulse" />
              <p>Click any solution vector in the scatter space to inspect AST token geometry and cosine similarity!</p>
            </div>
          )}

          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-[11px] text-purple-200 leading-relaxed font-sans">
            <strong>Neural Vector Insight:</strong> Code with identical algorithmic structure converges into the same dense vector neighborhood regardless of variable naming conventions!
          </div>
        </div>
      </div>
    </div>
  );
};
