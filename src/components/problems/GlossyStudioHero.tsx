import React, { useState, useEffect, useRef } from 'react';
import { useCourse } from '../../context/CourseContext';
import {
  QUICK_THEME_DOTS,
  applyTheme,
  getStoredTheme,
  ThemePresetId,
} from '../../utils/themeEngine';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  Code2,
  Terminal,
  Cpu,
  Zap,
  ExternalLink,
  Flame,
} from 'lucide-react';

interface HeroProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Med' | 'Hard';
  diffClass: 'E' | 'M' | 'H';
  isDone: boolean;
  fileName: string;
  code: string[];
  terminalLogs: string[];
  description: string;
  chips: string[];
  constraints: string;
  byteTip: string;
}

const HERO_PROBLEMS: HeroProblem[] = [
  {
    id: 'bin-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    diffClass: 'E',
    isDone: false,
    fileName: 'binary-search.py',
    code: [
      'def search(nums: list[int], target: int) -> int:',
      '    l, r = 0, len(nums) - 1',
      '    while l <= r:',
      '        m = (l + r) // 2',
      '        if nums[m] == target:',
      '            return m',
      '        elif nums[m] > target:',
      '            r = m - 1',
      '        else:',
      '            l = m + 1',
      '    return -1',
    ],
    terminalLogs: [
      '$ run tests',
      '✓ sample 1  nums=[-1,0,3,5,9,12] target=9  → 4',
      '✓ sample 2  nums=[-1,0,3,5,9,12] target=2  → -1',
      '✓ hidden 28/28 passed · 0 ms · O(log n)',
      '⟶ committed to GitHub · a3f9c21',
    ],
    description: 'Given a sorted array nums and a target, return its index or -1 if target is not found in nums.',
    chips: ['arrays', 'Amazon', 'Google', 'acceptance 62%'],
    constraints: '1 ≤ n ≤ 10⁴, values are unique, runtime must be O(log n).',
    byteTip: 'Halve the range each step. That is why it runs in O(log n).',
  },
  {
    id: 'contains-dup',
    title: 'Array Contains Duplicate',
    difficulty: 'Easy',
    diffClass: 'E',
    isDone: true,
    fileName: 'contains-duplicate.py',
    code: [
      'class Solution:',
      '    def containsDuplicate(self, nums: list[int]) -> bool:',
      '        seen = set()',
      '        for x in nums:',
      '            if x in seen:',
      '                return True',
      '            seen.add(x)',
      '        return False',
    ],
    terminalLogs: [
      '$ run tests',
      '✓ sample 1  nums=[1,2,3,1]  → True',
      '✓ sample 2  nums=[1,2,3,4]  → False',
      '✓ hidden 30/30 passed · 12 ms · O(n)',
      '⟶ committed to GitHub · 8b4e190',
    ],
    description: 'Given an integer array nums, return true if any value appears at least twice in the array.',
    chips: ['hash-table', 'Apple', 'Meta', 'acceptance 61%'],
    constraints: '1 ≤ nums.length ≤ 10⁵, -10⁹ ≤ nums[i] ≤ 10⁹.',
    byteTip: 'A hash set gives O(1) average lookup time for instant duplicate checking!',
  },
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    diffClass: 'E',
    isDone: false,
    fileName: 'two-sum.py',
    code: [
      'class Solution:',
      '    def twoSum(self, nums: list[int], target: int) -> list[int]:',
      '        seen = {}',
      '        for i, n in enumerate(nums):',
      '            diff = target - n',
      '            if diff in seen:',
      '                return [seen[diff], i]',
      '            seen[n] = i',
      '        return []',
    ],
    terminalLogs: [
      '$ run tests',
      '✓ sample 1  nums=[2,7,11,15] target=9  → [0, 1]',
      '✓ sample 2  nums=[3,2,4] target=6  → [1, 2]',
      '✓ hidden 25/25 passed · 1 ms · O(n)',
      '⟶ committed to GitHub · 9f2c8d4',
    ],
    description: 'Return indices of the two numbers such that they add up to target. Each input has exactly one solution.',
    chips: ['two-pointers', 'Microsoft', 'Bloomberg', 'acceptance 54%'],
    constraints: '2 ≤ nums.length ≤ 10⁴, exactly one valid answer exists.',
    byteTip: 'Store complement values (target - n) in a dictionary for a single O(n) pass!',
  },
  {
    id: 'course-sched',
    title: 'Course Schedule',
    difficulty: 'Med',
    diffClass: 'M',
    isDone: false,
    fileName: 'course-schedule.py',
    code: [
      'class Solution:',
      '    def canFinish(self, numCourses: int, prerequisites: list) -> bool:',
      '        from collections import defaultdict, deque',
      '        adj = defaultdict(list)',
      '        in_degree = [0] * numCourses',
      '        for crs, pre in prerequisites:',
      '            adj[pre].append(crs)',
      '            in_degree[crs] += 1',
      '        q = deque([i for i in range(numCourses) if in_degree[i] == 0])',
      '        count = 0',
      '        while q:',
      '            node = q.popleft()',
      '            count += 1',
      '            for neighbor in adj[node]:',
      '                in_degree[neighbor] -= 1',
      '                if in_degree[neighbor] == 0:',
      '                    q.append(neighbor)',
      '        return count == numCourses',
    ],
    terminalLogs: [
      '$ run tests',
      '✓ sample 1  numCourses=2 prereqs=[[1,0]]  → True',
      '✓ sample 2  numCourses=2 prereqs=[[1,0],[0,1]]  → False',
      '✓ hidden 42/42 passed · 8 ms · O(V+E)',
      '⟶ committed to GitHub · 5a81e33',
    ],
    description: 'Determine if you can finish all courses given prerequisite dependencies (Kahn Topological Sort).',
    chips: ['graphs', 'Google', 'Meta', 'Uber', 'acceptance 46%'],
    constraints: '1 ≤ numCourses ≤ 2000, 0 ≤ prerequisites.length ≤ 5000.',
    byteTip: 'Use in-degree array for Kahn algorithm: any cycle will leave in-degree > 0!',
  },
  {
    id: 'kth-largest',
    title: 'Kth Largest in Stream',
    difficulty: 'Med',
    diffClass: 'M',
    isDone: false,
    fileName: 'kth-largest.py',
    code: [
      'import heapq',
      'class KthLargest:',
      '    def __init__(self, k: int, nums: list[int]):',
      '        self.k = k',
      '        self.min_heap = nums',
      '        heapq.heapify(self.min_heap)',
      '        while len(self.min_heap) > k:',
      '            heapq.heappop(self.min_heap)',
      '    def add(self, val: int) -> int:',
      '        heapq.heappush(self.min_heap, val)',
      '        if len(self.min_heap) > self.k:',
      '            heapq.heappop(self.min_heap)',
      '        return self.min_heap[0]',
    ],
    terminalLogs: [
      '$ run tests',
      '✓ sample 1  k=3 nums=[4,5,8,2] add(3)  → 4',
      '✓ sample 2  add(5) → 5, add(10) → 5, add(9) → 8',
      '✓ hidden 20/20 passed · 4 ms · O(log k)',
      '⟶ committed to GitHub · 3d7c41a',
    ],
    description: 'Design a class to find the kth largest element in a stream of integers using a Min Heap of size k.',
    chips: ['heap', 'Amazon', 'Adobe', 'acceptance 56%'],
    constraints: '1 ≤ k ≤ 10⁴, 0 ≤ nums.length ≤ 10⁴.',
    byteTip: 'A min-heap of size k ensures the root element is always the kth largest!',
  },
  {
    id: 'word-ladder',
    title: 'Word Ladder',
    difficulty: 'Hard',
    diffClass: 'H',
    isDone: false,
    fileName: 'word-ladder.py',
    code: [
      'from collections import deque',
      'def ladderLength(beginWord: str, endWord: str, wordList: list[str]) -> int:',
      '    words = set(wordList)',
      '    if endWord not in words: return 0',
      '    q = deque([(beginWord, 1)])',
      '    while q:',
      '        word, dist = q.popleft()',
      '        if word == endWord: return dist',
      '        for i in range(len(word)):',
      '            for c in "abcdefghijklmnopqrstuvwxyz":',
      '                next_w = word[:i] + c + word[i+1:]',
      '                if next_w in words:',
      '                    words.remove(next_w)',
      '                    q.append((next_w, dist + 1))',
      '    return 0',
    ],
    terminalLogs: [
      '$ run tests',
      '✓ sample 1  "hit" → "cog" words=["hot","dot","dog","lot","log","cog"]  → 5',
      '✓ sample 2  "hit" → "cog" words=["hot","dot","dog","lot","log"]  → 0',
      '✓ hidden 35/35 passed · 48 ms · O(M²×N)',
      '⟶ committed to GitHub · 7e11f09',
    ],
    description: 'Given two words and a dictionary, find the length of shortest transformation sequence from begin to end.',
    chips: ['bfs', 'Amazon', 'Google', 'Meta', 'acceptance 38%'],
    constraints: '1 ≤ beginWord.length ≤ 10, all words have identical length.',
    byteTip: 'Queue shortest path level by level. Removing visited words prevents infinite cycles!',
  },
];

export const GlossyStudioHero: React.FC = () => {
  const { stats, addXP, triggerBurst } = useCourse();

  // State
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [partialLine, setPartialLine] = useState<string | null>(null);
  const [visibleLogsCount, setVisibleLogsCount] = useState<number>(0);
  const [showByteBubble, setShowByteBubble] = useState<boolean>(false);
  const [showPop, setShowPop] = useState<boolean>(false);
  const [isInteractiveMode, setIsInteractiveMode] = useState<boolean>(false);
  const [userCode, setUserCode] = useState<string>('');
  const [activeTheme, setActiveTheme] = useState<ThemePresetId>(() => getStoredTheme());
  const [currentXpDisplay, setCurrentXpDisplay] = useState<number>(stats.xp);
  const [xpFillPercent, setXpFillPercent] = useState<number>(62);

  const activeProblem = HERO_PROBLEMS[selectedIdx];
  const runIdRef = useRef<number>(0);

  // Sync with active theme
  useEffect(() => {
    const handleThemeChange = (e: any) => {
      if (e?.detail?.id) setActiveTheme(e.detail.id);
    };
    window.addEventListener('theme-changed', handleThemeChange);
    return () => window.removeEventListener('theme-changed', handleThemeChange);
  }, []);

  const handleSelectTheme = (id: ThemePresetId) => {
    sound.playPop();
    applyTheme(id);
    setActiveTheme(id);
  };

  // Run the typing & execution animation sequence
  const playAnimation = async (prob: HeroProblem) => {
    const currentRun = ++runIdRef.current;
    const isLive = () => currentRun === runIdRef.current;

    // Reset UI states
    setDisplayedLines([]);
    setPartialLine('');
    setVisibleLogsCount(0);
    setShowByteBubble(false);
    setShowPop(false);
    setXpFillPercent(62);
    setCurrentXpDisplay(stats.xp);

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(400);

    // Type lines progressively
    for (let i = 0; i < prob.code.length && isLive(); i++) {
      const fullText = prob.code[i];
      const chunk = Math.max(3, Math.ceil(fullText.length / 8));

      for (let c = chunk; c < fullText.length && isLive(); c += chunk) {
        setPartialLine(fullText.slice(0, c));
        await sleep(35);
      }

      if (!isLive()) return;
      setDisplayedLines(prob.code.slice(0, i + 1));
      setPartialLine(null);
      await sleep(70);

      // Trigger Byte speech bubble halfway through typing
      if (i === 3) {
        setShowByteBubble(true);
      }
    }

    if (!isLive()) return;
    await sleep(400);

    // Stream terminal logs
    for (let j = 0; j < prob.terminalLogs.length && isLive(); j++) {
      setVisibleLogsCount(j + 1);
      sound.playHit();
      await sleep(550);
    }

    if (!isLive()) return;

    // Trigger celebration & XP pop
    sound.playSuccess();
    setXpFillPercent(100);
    setCurrentXpDisplay((prev) => prev + 50);
    setShowPop(true);

    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.5 },
      colors: ['#38BDF8', '#8B5CF6', '#10B981'],
    });

    await sleep(2500);
    if (!isLive()) return;
    setShowPop(false);
  };

  // Initial mount or problem switch animation
  useEffect(() => {
    if (!isInteractiveMode) {
      playAnimation(activeProblem);
    } else {
      setUserCode(activeProblem.code.join('\n'));
      setVisibleLogsCount(activeProblem.terminalLogs.length);
      setShowByteBubble(true);
    }
  }, [selectedIdx, isInteractiveMode]);

  // Handle problem selection from left list
  const handleSelectProblem = (idx: number) => {
    sound.playPop();
    setSelectedIdx(idx);
  };

  // Replay handler
  const handleReplay = () => {
    sound.playPop();
    setIsInteractiveMode(false);
    playAnimation(activeProblem);
  };

  return (
    <div className="ambient-stage rounded-3xl p-4 sm:p-6 shadow-2xl relative select-none">
      {/* 3 Floating Drifting Ambient Orbs */}
      <div className="orb o1" />
      <div className="orb o2" />
      <div className="orb o3" />

      {/* Top Controls Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-base sm:text-lg text-white tracking-tight flex items-center gap-2">
            <span className="text-[var(--a2,#38BDF8)]">⚡</span>
            <span>ADA Hub: glossy interface preview</span>
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.08] text-slate-300 border border-white/10 hidden sm:inline">
            Interactive Live Sandbox
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Toggle Interactive Code Edit Mode */}
          <button
            onClick={() => {
              sound.playPop();
              setIsInteractiveMode(!isInteractiveMode);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              isInteractiveMode
                ? 'bg-gradient-to-r from-[var(--a,#8B5CF6)] to-[var(--a2,#38BDF8)] text-white border-white/40 shadow-md'
                : 'bg-white/[0.08] text-slate-300 hover:text-white border-white/15'
            }`}
          >
            {isInteractiveMode ? 'Interactive Editing ON' : 'Edit Code Directly'}
          </button>

          {/* Replay Animation Button */}
          <button
            onClick={handleReplay}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white cursor-pointer bg-gradient-to-b from-[#8f6bff] to-[#5b34e0] border border-white/30 shadow-[0_6px_18px_rgba(110,70,255,0.45),inset_0_1px_0_rgba(255,255,255,0.55)] hover:brightness-110 active:scale-95 transition-all"
            title="Replay code typing & test execution sequence"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay</span>
          </button>
        </div>
      </div>

      {/* Glossy App Container */}
      <div className="glossy-app">
        {/* Navigation Header inside App */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-white/10 bg-[#0a0b18]/40 text-xs">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <b className="logo-badge">⚡</b>
            <span className="font-extrabold text-sm tracking-tight bg-gradient-to-r from-white to-[var(--a2,#38BDF8)] bg-clip-text text-transparent">
              Algorithm Adventures
            </span>
          </div>

          {/* Pill Tabs */}
          <div className="hidden lg:flex items-center tabs-capsule">
            <span className="on">Problems</span>
            <span>Sagas</span>
            <span>Research Lab</span>
            <span>Duel Arena</span>
            <span>Mock Interview</span>
          </div>

          {/* Right Tools: ⌘K, Dots, Streak, XP */}
          <div className="flex items-center gap-3">
            <div className="glossy-k hidden sm:inline-flex">⌘K Search</div>

            {/* 5 Theme Dots */}
            <div className="dots" title="Switch Theme Accent">
              {QUICK_THEME_DOTS.map((dot) => (
                <button
                  key={dot.id}
                  onClick={() => handleSelectTheme(dot.id)}
                  style={{ background: dot.color, color: dot.color }}
                  className={`theme-dot ${activeTheme === dot.id ? 'active-dot' : ''}`}
                  title={dot.label}
                  aria-label={dot.label}
                />
              ))}
            </div>

            {/* Streak */}
            <div className="font-bold text-white whitespace-nowrap">🔥 12 days</div>

            {/* Shimmer XP */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="xp-track">
                <div className="xp-fill" style={{ width: `${xpFillPercent}%` }} />
              </div>
              <span className="font-bold font-mono text-white whitespace-nowrap">
                {currentXpDisplay.toLocaleString()} XP
              </span>
            </div>
          </div>
        </div>

        {/* 3-Column Studio Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 p-3.5 min-h-[460px]">
          {/* Column 1: Chapter Problem List (3 cols on md, 2.5 on lg) */}
          <div className="md:col-span-4 lg:col-span-3 glass p-3 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-white/90 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>Ch 1: Searching &amp; Arrays</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {HERO_PROBLEMS.filter((p) => p.isDone).length}/{HERO_PROBLEMS.length}
                </span>
              </h3>

              <div className="space-y-1">
                {HERO_PROBLEMS.map((prob, idx) => {
                  const isSelected = idx === selectedIdx;
                  return (
                    <div
                      key={prob.id}
                      onClick={() => handleSelectProblem(idx)}
                      className={`pr ${isSelected ? 'on' : ''} ${prob.isDone ? 'done' : ''}`}
                    >
                      <span className="truncate pr-1">{prob.title}</span>
                      <em className={prob.diffClass}>{prob.difficulty}</em>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chapter Progress Footer */}
            <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between font-mono">
              <span>Chapter 1 Mastery</span>
              <span className="text-emerald-400 font-bold">85%</span>
            </div>
          </div>

          {/* Column 2: IDE & Live Terminal (5 cols on md, 6 on lg) */}
          <div className="md:col-span-8 lg:col-span-6 glass flex flex-col min-w-0 bg-[#080914]/70">
            {/* File Tabs */}
            <div className="etabs">
              <span className="on">{activeProblem.fileName}</span>
              <span
                onClick={() => handleSelectProblem((selectedIdx + 1) % HERO_PROBLEMS.length)}
                className="opacity-70 hover:opacity-100"
              >
                {HERO_PROBLEMS[(selectedIdx + 1) % HERO_PROBLEMS.length].fileName}
              </span>
            </div>

            {/* Python Code Display */}
            <div className="flex-1 p-3.5 font-mono text-xs overflow-x-auto bg-white/[0.02] flex flex-col justify-start">
              {isInteractiveMode ? (
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  spellCheck={false}
                  className="w-full flex-1 bg-transparent text-emerald-300 font-mono text-xs focus:outline-none resize-none leading-relaxed selection:bg-amber-400/30"
                  style={{ tabSize: 4, minHeight: '220px' }}
                />
              ) : (
                <pre className="m-0 leading-relaxed text-[#d6dbee] select-text">
                  {displayedLines.map((line, lIdx) => (
                    <div key={lIdx} className="flex">
                      <span className="w-8 text-right pr-3 select-none text-[#59607a] text-[11px]">
                        {lIdx + 1}
                      </span>
                      <span className="flex-1 whitespace-pre">{formatSyntaxCode(line)}</span>
                    </div>
                  ))}
                  {partialLine !== null && (
                    <div className="flex">
                      <span className="w-8 text-right pr-3 select-none text-[#59607a] text-[11px]">
                        {displayedLines.length + 1}
                      </span>
                      <span className="flex-1 whitespace-pre">
                        {formatSyntaxCode(partialLine)}
                        <span className="blinking-cursor" />
                      </span>
                    </div>
                  )}
                </pre>
              )}
            </div>

            {/* Interactive Terminal */}
            <div className="term">
              {activeProblem.terminalLogs.slice(0, visibleLogsCount).map((log, logIdx) => {
                const isCmd = log.startsWith('$');
                const isCommit = log.startsWith('⟶');
                return (
                  <div
                    key={logIdx}
                    className={`text-[11px] font-mono leading-relaxed transition-all ${
                      isCmd
                        ? 'text-slate-400'
                        : isCommit
                        ? 'text-sky-300 font-bold'
                        : 'text-emerald-400 font-semibold'
                    }`}
                  >
                    {log}
                  </div>
                );
              })}
              {visibleLogsCount === 0 && (
                <div className="text-slate-500 text-xs italic flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Waiting for execution run...</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Problem Specs & Byte Mascot (3 cols) */}
          <div className="md:col-span-12 lg:col-span-3 glass p-4 flex flex-col justify-between relative min-h-[300px]">
            <div>
              <h3 className="text-sm font-bold text-white mb-2">{activeProblem.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {activeProblem.description}
              </p>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {activeProblem.chips.map((chip, cIdx) => (
                  <span
                    key={cIdx}
                    className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.08] text-slate-200 border border-white/15"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Constraints */}
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/10 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Constraints:</span>{' '}
                {activeProblem.constraints}
              </div>
            </div>

            {/* Byte Companion Mascot & Speech Bubble */}
            <div className="pt-4 flex items-end gap-2.5">
              <div className="byte-hop text-3xl shrink-0" title="Byte AI Mentor">
                🤖
              </div>
              {showByteBubble && (
                <div className="bub flex-1 text-xs">
                  {activeProblem.byteTip}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comic Pop Bangers Celebration (+50 XP!) */}
        {showPop && (
          <div className="absolute right-12 top-20 z-20 pop-bangers pointer-events-none">
            +50 XP!
          </div>
        )}
      </div>
    </div>
  );
};

// Syntax highlighter helper
function formatSyntaxCode(raw: string): React.ReactNode {
  // Simple token matching
  const parts = raw.split(/(\b(?:def|class|while|if|elif|else|return|for|in|import|from)\b|\b\d+\b|"[^"]*"|'[^']*'|->|list|int|str|bool|set|dict)/g);

  return parts.map((part, i) => {
    if (['def', 'class', 'while', 'if', 'elif', 'else', 'return', 'for', 'in', 'import', 'from'].includes(part)) {
      return <span key={i} className="text-[#d19bff] font-bold">{part}</span>;
    }
    if (['list', 'int', 'str', 'bool', 'set', 'dict'].includes(part)) {
      return <span key={i} className="text-[#7fe3ff] font-semibold">{part}</span>;
    }
    if (/^\d+$/.test(part)) {
      return <span key={i} className="text-[#9ef0c0]">{part}</span>;
    }
    if (part.startsWith('"') || part.startsWith("'")) {
      return <span key={i} className="text-[#ffe9a6]">{part}</span>;
    }
    return part;
  });
}
