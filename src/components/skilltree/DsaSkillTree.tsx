import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import {
  Layers,
  Sparkles,
  Lock,
  Unlock,
  CheckCircle2,
  Code2,
  Zap,
  ArrowRight,
  ChevronRight,
  Compass,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

interface SkillNode {
  id: string;
  name: string;
  tier: number;
  icon: string;
  category: string;
  totalProblems: number;
  prerequisites: string[];
  description: string;
  keyTechnique: string;
}

export const DsaSkillTree: React.FC = () => {
  const { stats, setActiveTab } = useCourse();
  const [selectedNodeId, setSelectedNodeId] = useState<string>('arrays');

  const nodes: SkillNode[] = [
    {
      id: 'arrays',
      name: 'Arrays & Hashing',
      tier: 1,
      icon: '🧩',
      category: 'Arrays',
      totalProblems: 12,
      prerequisites: [],
      description: 'Continuous memory contiguous storage, O(1) random indexing, and hash tables for O(1) amortized complement lookups.',
      keyTechnique: 'Complement Hashing & Frequency Buckets',
    },
    {
      id: 'twopointers',
      name: 'Two Pointers',
      tier: 2,
      icon: '🏹',
      category: 'Two Pointers',
      totalProblems: 8,
      prerequisites: ['arrays'],
      description: 'Colliding or sliding pointer pairs to avoid quadratic brute force comparisons on sorted arrays.',
      keyTechnique: 'Opposite Ends Inward Shrinking',
    },
    {
      id: 'slidingwindow',
      name: 'Sliding Window',
      tier: 2,
      icon: '🪟',
      category: 'Sliding Window',
      totalProblems: 8,
      prerequisites: ['arrays'],
      description: 'Maintain a continuous subarray window [left..right] expanding right and contracting left to satisfy constraints in O(N).',
      keyTechnique: 'Dynamic Shrink/Expand Window Invariant',
    },
    {
      id: 'stackqueue',
      name: 'Stack & Monotonic Queue',
      tier: 3,
      icon: '🥞',
      category: 'Stack',
      totalProblems: 10,
      prerequisites: ['twopointers'],
      description: 'LIFO evaluation, parentheses matching, and monotonic stacks to find Next Greater Element in linear time.',
      keyTechnique: 'Monotonic Order Invariant Preservation',
    },
    {
      id: 'binarysearch',
      name: 'Binary Search',
      tier: 3,
      icon: '🔍',
      category: 'Binary Search',
      totalProblems: 10,
      prerequisites: ['twopointers'],
      description: 'Logarithmic O(log N) decision search space pruning. Applicable to sorted arrays and monotonic predicate functions.',
      keyTechnique: 'Search on Predicate Condition',
    },
    {
      id: 'linkedlists',
      name: 'Linked Lists & Fast/Slow',
      tier: 3,
      icon: '🔗',
      category: 'Linked List',
      totalProblems: 8,
      prerequisites: ['arrays'],
      description: 'Discontiguous pointer chaining. Floyd’s Cycle Finding Tortoise & Hare algorithm.',
      keyTechnique: 'Dummy Head & Fast-Slow Pointer Step',
    },
    {
      id: 'trees',
      name: 'Binary Trees & BST',
      tier: 4,
      icon: '🌳',
      category: 'Trees',
      totalProblems: 14,
      prerequisites: ['stackqueue', 'binarysearch'],
      description: 'Hierarchical node traversal: Preorder, Inorder, Postorder, and BFS level order. Invert and validate BSTs.',
      keyTechnique: 'Recursive Divide & Conquer Subtree Invariants',
    },
    {
      id: 'heaps',
      name: 'Heap / Priority Queue',
      tier: 4,
      icon: '🌋',
      category: 'Heap',
      totalProblems: 8,
      prerequisites: ['trees'],
      description: 'Complete binary tree backing min/max heap arrays. O(1) peek, O(log K) push/pop for Top-K elements.',
      keyTechnique: 'Min-Heap of Size K for Top-K Elements',
    },
    {
      id: 'backtracking',
      name: 'Backtracking & Pruning',
      tier: 4,
      icon: '🧭',
      category: 'Backtracking',
      totalProblems: 8,
      prerequisites: ['trees'],
      description: 'State space search tree exploration: choose, explore recursively, and un-choose (revert state) with aggressive pruning.',
      keyTechnique: 'Decision Tree State Rollback',
    },
    {
      id: 'graphs',
      name: 'Graph BFS, DFS & Dijkstra',
      tier: 5,
      icon: '🕸️',
      category: 'Graphs',
      totalProblems: 12,
      prerequisites: ['trees'],
      description: 'Adjacency lists, visited sets, shortest paths via BFS and Dijkstra with Min-Heap, topological sort.',
      keyTechnique: 'Queue BFS vs PriorityQueue Dijkstra',
    },
    {
      id: 'dp',
      name: 'Dynamic Programming (1D & 2D)',
      tier: 5,
      icon: '🔮',
      category: 'Dynamic Programming',
      totalProblems: 16,
      prerequisites: ['backtracking', 'graphs'],
      description: 'Optimal substructure and overlapping subproblems. Memoized top-down recursion to bottom-up iterative table transitions.',
      keyTechnique: 'State Transition Equation dp[i] = ...',
    },
    {
      id: 'apex',
      name: 'Apex: Greedy & System Design',
      tier: 6,
      icon: '👑',
      category: 'Advanced',
      totalProblems: 10,
      prerequisites: ['dp', 'graphs'],
      description: 'Locally optimal choice yields global optimum. Scalable architecture design for distributed systems.',
      keyTechnique: 'Proof by Exchange Argument',
    },
  ];

  // Helper to check node lock/unlocked
  const isNodeUnlocked = (node: SkillNode): boolean => {
    if (node.tier === 1) return true;
    return node.prerequisites.every((preId) => {
      // Unlocked if prereq is attempted or user is level 2+
      return stats.level >= node.tier - 1;
    });
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#12162a] via-[#1d274c] to-[#12162a] border-3 border-black shadow-comic-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider border border-black shadow-comic-sm">
              <Compass className="w-3.5 h-3.5 inline mr-1" /> RPG Progression
            </span>
            <span className="text-xs text-amber-300 font-bold">12 Algorithmic Spheres of Power</span>
          </div>
          <h1 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
            DSA SKILL TREE &amp; MASTERY GRID
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Watch your constellation illuminate as you solve problems! Each mastered sphere unlocks advanced downstream algorithmic techniques.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('ide')}
          className="btn-comic-push px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider border-3 border-black shadow-comic flex items-center gap-2 cursor-pointer"
        >
          <Code2 className="w-4 h-4" /> Open Python IDE →
        </button>
      </div>

      {/* Grid Layout: Constellation Tree (8 Cols) & Node Inspector (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Skill Nodes Constellation (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#0c101d] border-2 border-black shadow-comic space-y-6">
          <div className="flex items-center justify-between border-b border-[#1b233a] pb-3 text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider font-mono">
              Constellation Nodes (Tiers 1 to 6)
            </span>
            <span className="text-amber-400 font-mono font-bold">
              Level {stats.level} Coder • {stats.xp} Total XP
            </span>
          </div>

          {/* Tier Rows */}
          {[1, 2, 3, 4, 5, 6].map((tier) => {
            const tierNodes = nodes.filter((n) => n.tier === tier);
            return (
              <div key={tier} className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-amber-400/50"></span>
                  <span>Tier {tier} Realm</span>
                  <div className="flex-1 border-b border-slate-800"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {tierNodes.map((node) => {
                    const unlocked = isNodeUnlocked(node);
                    const isSelected = selectedNode.id === node.id;
                    return (
                      <button
                        key={node.id}
                        onClick={() => {
                          setSelectedNodeId(node.id);
                          sound.playPop();
                        }}
                        className={`p-3.5 rounded-2xl text-left transition-all border-2 cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'bg-[#1b2444] border-amber-400 shadow-comic-yellow -translate-y-0.5'
                            : unlocked
                            ? 'bg-[#11172a] hover:bg-[#18213b] border-[#1e2a4a] text-slate-200'
                            : 'bg-[#080b14] border-slate-800 text-slate-500 opacity-60'
                        }`}
                      >
                        <span className="text-2xl shrink-0 p-1 rounded-xl bg-slate-900 border border-slate-800">
                          {node.icon}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-black text-white truncate">{node.name}</span>
                            {!unlocked && <Lock className="w-3 h-3 text-slate-500 shrink-0" />}
                          </div>
                          <p className="text-[10px] text-amber-400 font-mono mt-0.5">{node.keyTechnique}</p>
                          <div className="flex items-center justify-between text-[9px] text-slate-400 mt-2 font-mono">
                            <span>{node.totalProblems} Quests</span>
                            <span className={unlocked ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                              {unlocked ? '● ACTIVE' : 'LOCKED'}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Node Inspector & Launch Quest (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-[#0f1424] border-2 border-black shadow-comic space-y-4 sticky top-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl p-2 rounded-2xl bg-amber-400/10 border border-amber-400/30">
                {selectedNode.icon}
              </span>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-amber-400">
                  Tier {selectedNode.tier} Sphere
                </span>
                <h3 className="font-bangers text-2xl text-white">{selectedNode.name}</h3>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="font-bold text-white uppercase tracking-wider text-[11px]">Domain Description:</div>
              <p className="leading-relaxed bg-[#080a14] p-3 rounded-xl border border-[#1b233a] font-sans">
                {selectedNode.description}
              </p>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-mono">
                Key Algorithmic Technique:
              </span>
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 font-mono font-medium">
                {selectedNode.keyTechnique}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#1b233a]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Sphere Quests:</span>
                <span className="font-bold text-white">{selectedNode.totalProblems} Challenges</span>
              </div>
              <button
                onClick={() => {
                  sound.playSuccess();
                  setActiveTab('quest');
                }}
                className="w-full btn-comic-push py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider border-2 border-black shadow-comic flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Practice {selectedNode.name} Now →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
