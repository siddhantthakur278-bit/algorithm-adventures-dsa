import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import { sound } from '../../utils/soundEffects';

interface PreviewProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Med' | 'Hard';
  diffClass: 'E' | 'M' | 'H';
  isDone?: boolean;
  fileName: string;
  codeHtml: string[];
  terminalLogs: string[];
  descHtml: string;
  chips: string[];
  constraints: string;
  byteTip: string;
}

const PREVIEW_THEMES: [string, string][] = [
  ['#06B6D4', '#38BDF8'], // 0: Teal
  ['#8B5CF6', '#38BDF8'], // 1: Tokyo Midnight Purple
  ['#10B981', '#34D399'], // 2: Emerald Green
  ['#F43F5E', '#FB7185'], // 3: Crimson Rose
  ['#FBBF24', '#FB923C'], // 4: Amber Gold
];

const PREVIEW_PROBLEMS: PreviewProblem[] = [
  {
    id: 'bin-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    diffClass: 'E',
    isDone: false,
    fileName: 'binary-search.py',
    codeHtml: [
      '<span class="kw">def</span> <span class="fn">search</span>(nums: <span class="ty">list</span>[<span class="ty">int</span>], target: <span class="ty">int</span>) -&gt; <span class="ty">int</span>:',
      '    l, r = <span class="nu">0</span>, <span class="fn">len</span>(nums) - <span class="nu">1</span>',
      '    <span class="kw">while</span> l &lt;= r:',
      '        m = (l + r) // <span class="nu">2</span>',
      '        <span class="kw">if</span> nums[m] == target:',
      '            <span class="kw">return</span> m',
      '        <span class="kw">elif</span> nums[m] &gt; target:',
      '            r = m - <span class="nu">1</span>',
      '        <span class="kw">else</span>:',
      '            l = m + <span class="nu">1</span>',
      '    <span class="kw">return</span> -<span class="nu">1</span>',
    ],
    terminalLogs: [
      '$ run tests',
      '✓ sample 1  nums=[-1,0,3,5,9,12] target=9  → 4',
      '✓ sample 2  nums=[-1,0,3,5,9,12] target=2  → -1',
      '✓ hidden 28/28 passed · 0 ms · O(log n)',
      '⟶ committed to GitHub · a3f9c21',
    ],
    descHtml: 'Given a sorted array <code>nums</code> and a <code>target</code>, return its index or -1.',
    chips: ['arrays', 'Amazon', 'Google', 'acceptance 62%'],
    constraints: '1 ≤ n ≤ 10⁴, values are unique.',
    byteTip: 'Halve the range each step. That is why it runs in O(log n).',
  },
  {
    id: 'contains-dup',
    title: 'Array Contains Duplicate',
    difficulty: 'Easy',
    diffClass: 'E',
    isDone: true,
    fileName: 'contains-duplicate.py',
    codeHtml: [
      '<span class="kw">class</span> <span class="fn">Solution</span>:',
      '    <span class="kw">def</span> <span class="fn">containsDuplicate</span>(nums: <span class="ty">list</span>[<span class="ty">int</span>]) -&gt; <span class="ty">bool</span>:',
      '        seen = <span class="ty">set</span>()',
      '        <span class="kw">for</span> x <span class="kw">in</span> nums:',
      '            <span class="kw">if</span> x <span class="kw">in</span> seen:',
      '                <span class="kw">return</span> <span class="nu">True</span>',
      '            seen.<span class="fn">add</span>(x)',
      '        <span class="kw">return</span> <span class="nu">False</span>',
    ],
    terminalLogs: [
      '$ run tests',
      '✓ sample 1  nums=[1,2,3,1]  → True',
      '✓ sample 2  nums=[1,2,3,4]  → False',
      '✓ hidden 30/30 passed · 12 ms · O(n)',
      '⟶ committed to GitHub · 8b4e190',
    ],
    descHtml: 'Given an integer array <code>nums</code>, return true if any value appears at least twice in the array.',
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
    codeHtml: [
      '<span class="kw">class</span> <span class="fn">Solution</span>:',
      '    <span class="kw">def</span> <span class="fn">twoSum</span>(nums: <span class="ty">list</span>[<span class="ty">int</span>], target: <span class="ty">int</span>) -&gt; <span class="ty">list</span>[<span class="ty">int</span>]:',
      '        seen = {}',
      '        <span class="kw">for</span> i, n <span class="kw">in</span> <span class="fn">enumerate</span>(nums):',
      '            diff = target - n',
      '            <span class="kw">if</span> diff <span class="kw">in</span> seen:',
      '                <span class="kw">return</span> [seen[diff], i]',
      '            seen[n] = i',
      '        <span class="kw">return</span> []',
    ],
    terminalLogs: [
      '$ run tests',
      '✓ sample 1  nums=[2,7,11,15] target=9  → [0, 1]',
      '✓ sample 2  nums=[3,2,4] target=6  → [1, 2]',
      '✓ hidden 25/25 passed · 1 ms · O(n)',
      '⟶ committed to GitHub · 9f2c8d4',
    ],
    descHtml: 'Return indices of the two numbers such that they add up to target. Each input has exactly one solution.',
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
    codeHtml: [
      '<span class="kw">class</span> <span class="fn">Solution</span>:',
      '    <span class="kw">def</span> <span class="fn">canFinish</span>(numCourses: <span class="ty">int</span>, prerequisites: <span class="ty">list</span>) -&gt; <span class="ty">bool</span>:',
      '        <span class="kw">from</span> collections <span class="kw">import</span> defaultdict, deque',
      '        adj = defaultdict(<span class="ty">list</span>)',
      '        in_degree = [<span class="nu">0</span>] * numCourses',
      '        <span class="kw">for</span> crs, pre <span class="kw">in</span> prerequisites:',
      '            adj[pre].append(crs)',
      '            in_degree[crs] += <span class="nu">1</span>',
      '        q = deque([i <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(numCourses) <span class="kw">if</span> in_degree[i] == <span class="nu">0</span>])',
      '        count = <span class="nu">0</span>',
      '        <span class="kw">while</span> q:',
      '            node = q.popleft()',
      '            count += <span class="nu">1</span>',
      '            <span class="kw">for</span> neighbor <span class="kw">in</span> adj[node]:',
      '                in_degree[neighbor] -= <span class="nu">1</span>',
      '                <span class="kw">if</span> in_degree[neighbor] == <span class="nu">0</span>:',
      '                    q.append(neighbor)',
      '        <span class="kw">return</span> count == numCourses',
    ],
    terminalLogs: [
      '$ run tests',
      '✓ sample 1  numCourses=2 prereqs=[[1,0]]  → True',
      '✓ sample 2  numCourses=2 prereqs=[[1,0],[0,1]]  → False',
      '✓ hidden 42/42 passed · 8 ms · O(V+E)',
      '⟶ committed to GitHub · 5a81e33',
    ],
    descHtml: 'Determine if you can finish all courses given prerequisite dependencies (Kahn Topological Sort).',
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
    codeHtml: [
      '<span class="kw">import</span> heapq',
      '<span class="kw">class</span> <span class="fn">KthLargest</span>:',
      '    <span class="kw">def</span> <span class="fn">__init__</span>(self, k: <span class="ty">int</span>, nums: <span class="ty">list</span>[<span class="ty">int</span>]):',
      '        self.k = k',
      '        self.min_heap = nums',
      '        heapq.heapify(self.min_heap)',
      '        <span class="kw">while</span> <span class="fn">len</span>(self.min_heap) &gt; k:',
      '            heapq.heappop(self.min_heap)',
      '    <span class="kw">def</span> <span class="fn">add</span>(self, val: <span class="ty">int</span>) -&gt; <span class="ty">int</span>:',
      '        heapq.heappush(self.min_heap, val)',
      '        <span class="kw">if</span> <span class="fn">len</span>(self.min_heap) &gt; self.k:',
      '            heapq.heappop(self.min_heap)',
      '        <span class="kw">return</span> self.min_heap[<span class="nu">0</span>]',
    ],
    terminalLogs: [
      '$ run tests',
      '✓ sample 1  k=3 nums=[4,5,8,2] add(3)  → 4',
      '✓ sample 2  add(5) → 5, add(10) → 5, add(9) → 8',
      '✓ hidden 20/20 passed · 4 ms · O(log k)',
      '⟶ committed to GitHub · 3d7c41a',
    ],
    descHtml: 'Design a class to find the kth largest element in a stream of integers using a Min Heap of size k.',
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
    codeHtml: [
      '<span class="kw">from</span> collections <span class="kw">import</span> deque',
      '<span class="kw">def</span> <span class="fn">ladderLength</span>(beginWord: <span class="ty">str</span>, endWord: <span class="ty">str</span>, wordList: <span class="ty">list</span>[<span class="ty">str</span>]) -&gt; <span class="ty">int</span>:',
      '    words = <span class="ty">set</span>(wordList)',
      '    <span class="kw">if</span> endWord <span class="kw">not</span> <span class="kw">in</span> words: <span class="kw">return</span> <span class="nu">0</span>',
      '    q = deque([(beginWord, <span class="nu">1</span>)])',
      '    <span class="kw">while</span> q:',
      '        word, dist = q.popleft()',
      '        <span class="kw">if</span> word == endWord: <span class="kw">return</span> dist',
      '        <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(word)):',
      '            <span class="kw">for</span> c <span class="kw">in</span> <span class="nu">"abcdefghijklmnopqrstuvwxyz"</span>:',
      '                next_w = word[:i] + c + word[i+<span class="nu">1</span>:]',
      '                <span class="kw">if</span> next_w <span class="kw">in</span> words:',
      '                    words.remove(next_w)',
      '                    q.append((next_w, dist + <span class="nu">1</span>))',
      '    <span class="kw">return</span> <span class="nu">0</span>',
    ],
    terminalLogs: [
      '$ run tests',
      '✓ sample 1  "hit" → "cog" words=["hot","dot","dog","lot","log","cog"]  → 5',
      '✓ sample 2  "hit" → "cog" words=["hot","dot","dog","lot","log"]  → 0',
      '✓ hidden 35/35 passed · 48 ms · O(M²×N)',
      '⟶ committed to GitHub · 7e11f09',
    ],
    descHtml: 'Given two words and a dictionary, find the length of shortest transformation sequence from begin to end.',
    chips: ['bfs', 'Amazon', 'Google', 'Meta', 'acceptance 38%'],
    constraints: '1 ≤ beginWord.length ≤ 10, all words have identical length.',
    byteTip: 'Queue shortest path level by level. Removing visited words prevents infinite cycles!',
  },
];

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function renderCode(codeLines: string[], n: number, partial: string | null): string {
  const completed = codeLines.slice(0, n).map((l) => `<span class="ln">${l}</span>`).join('');
  if (partial !== null) {
    return completed + `<span class="ln">${partial}<i class="cur"></i></span>`;
  }
  return completed;
}

export const GlossyStudioHero: React.FC = () => {
  const [selectedProbId, setSelectedProbId] = useState<string>('bin-search');
  const [themeIdx, setThemeIdx] = useState<number>(1); // 1 = #8B5CF6 / #38BDF8
  const [activeNavTab, setActiveNavTab] = useState<string>('Problems');
  const [activeFileTab, setActiveFileTab] = useState<string>('binary-search.py');

  // Animation states
  const [codeHtml, setCodeHtml] = useState<string>('');
  const [visibleLogsCount, setVisibleLogsCount] = useState<number>(0);
  const [xpWidth, setXpWidth] = useState<number>(62);
  const [xpText, setXpText] = useState<string>('1,240 XP');
  const [showByteBubble, setShowByteBubble] = useState<boolean>(false);
  const [showPop, setShowPop] = useState<boolean>(false);
  const [showPalette, setShowPalette] = useState<boolean>(false);
  const [paletteTyped, setPaletteTyped] = useState<string>('> ');

  const runRef = useRef<number>(0);
  const activeProblem =
    PREVIEW_PROBLEMS.find((p) => p.id === selectedProbId) || PREVIEW_PROBLEMS[0];

  const currentTheme = PREVIEW_THEMES[themeIdx];

  // Helper wait function
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // The Exact Choreographed Animation Sequence from the User's HTML Preview
  const play = async (prob: PreviewProblem) => {
    const myRun = ++runRef.current;
    const isLive = () => myRun === runRef.current;

    // 1. Reset state
    setThemeIdx(1);
    setXpWidth(62);
    setXpText('1,240 XP');
    setVisibleLogsCount(0);
    setShowByteBubble(false);
    setShowPop(false);
    setShowPalette(false);
    setPaletteTyped('> ');
    setCodeHtml(renderCode(prob.codeHtml, 0, ''));

    await wait(500);

    // 2. Type code line by line (45ms per step, 90ms per line)
    for (let i = 0; i < prob.codeHtml.length && isLive(); i++) {
      const fullText = stripHtml(prob.codeHtml[i]);
      const step = Math.max(1, Math.ceil(fullText.length / 9));

      for (let c = step; c < fullText.length && isLive(); c += step) {
        setCodeHtml(renderCode(prob.codeHtml, i, fullText.slice(0, c)));
        await wait(45);
      }

      if (!isLive()) return;
      setCodeHtml(renderCode(prob.codeHtml, i + 1, null));
      await wait(90);

      // Byte bubble appears on line 3
      if (i === 3) {
        setShowByteBubble(true);
      }
    }

    if (!isLive()) return;
    await wait(500);

    // 3. Sequential terminal logs (650ms delay each)
    for (let i = 0; i < prob.terminalLogs.length && isLive(); i++) {
      setVisibleLogsCount(i + 1);
      await wait(650);
    }

    if (!isLive()) return;

    // 4. XP bar to 100% and +50 XP! Pop banner
    setXpWidth(100);
    setXpText('1,290 XP');
    setShowPop(true);

    await wait(1800);
    if (!isLive()) return;

    // 5. Hide pop, show Command Palette simulation
    setShowPop(false);
    setShowPalette(true);

    const command = '> theme midnight';
    setPaletteTyped('> ');
    for (const ch of command.slice(2)) {
      if (!isLive()) return;
      setPaletteTyped((prev) => prev + ch);
      await wait(70);
    }

    await wait(600);
    if (!isLive()) return;

    // 6. Theme switches to Tokyo Midnight / Rose Theme
    setThemeIdx(3);

    await wait(500);
    setShowPalette(false);

    // 7. Pause and auto loop
    await wait(2800);
    if (isLive()) {
      play(prob);
    }
  };

  // Start on mount or when problem changes
  useEffect(() => {
    play(activeProblem);
    return () => {
      runRef.current++;
    };
  }, [selectedProbId]);

  // Manual replay button
  const handleReplay = () => {
    sound.playPop();
    play(activeProblem);
  };

  // Theme dot click
  const handleThemeClick = (idx: number) => {
    sound.playPop();
    setThemeIdx(idx);
  };

  // Problem click from left list
  const handleSelectProblem = (id: string, fileName: string) => {
    sound.playPop();
    setSelectedProbId(id);
    setActiveFileTab(fileName);
  };

  // Tab switch
  const handleTabClick = (tabName: string) => {
    sound.playPop();
    setActiveNavTab(tabName);
  };

  // Toggle Command Palette
  const handleTogglePalette = () => {
    sound.playPop();
    setShowPalette((prev) => !prev);
  };

  return (
    <div className="w-full max-w-[1120px] mx-auto my-2 select-none">
      {/* Top Header bar with exact title and Replay button */}
      <div className="flex justify-between items-center mb-3 gap-2 flex-wrap">
        <h1 className="font-bold text-xl tracking-tight text-white m-0">
          ADA Hub: interface preview
        </h1>
        <button
          onClick={handleReplay}
          type="button"
          className="flex items-center gap-1.5 font-bold text-xs text-white border border-white/35 py-2 px-4 rounded-full cursor-pointer bg-gradient-to-b from-[#8f6bff] to-[#5b34e0] shadow-[0_6px_18px_rgba(110,70,255,0.45),inset_0_1px_0_rgba(255,255,255,0.55)] hover:brightness-110 active:scale-95 transition-all outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#38B6FF]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay</span>
        </button>
      </div>

      {/* Responsive Horizontal Scroll Container */}
      <div className="overflow-x-auto p-1">
        <div
          className="stage"
          id="stage"
          style={
            {
              '--a': currentTheme[0],
              '--a2': currentTheme[1],
              minWidth: '900px',
            } as React.CSSProperties
          }
        >
          {/* 3 Contained Floating Orbs */}
          <div className="orb o1" />
          <div className="orb o2" />
          <div className="orb o3" />

          {/* App Card Container with Specular Top Sheen */}
          <div
            className="app"
            id="app"
            style={
              {
                '--a': currentTheme[0],
                '--a2': currentTheme[1],
              } as React.CSSProperties
            }
          >
            {/* Nav Header */}
            <div className="nav">
              <div className="logo cursor-pointer">
                <b>⚡</b>
                <span>Algorithm Adventures</span>
              </div>

              {/* Pill Tabs */}
              <div className="tabs">
                {['Problems', 'Sagas', 'Research Lab', 'Duel Arena', 'Mock Interview'].map(
                  (tab) => (
                    <span
                      key={tab}
                      className={activeNavTab === tab ? 'on' : ''}
                      onClick={() => handleTabClick(tab)}
                    >
                      {tab}
                    </span>
                  )
                )}
              </div>

              <div className="sp" />

              {/* ⌘K Search Trigger */}
              <div className="k" onClick={handleTogglePalette}>
                ⌘K Search
              </div>

              {/* 5 Theme Dots */}
              <div className="dots" aria-label="Themes">
                <i
                  style={{ background: '#06B6D4', color: '#06B6D4' }}
                  onClick={() => handleThemeClick(0)}
                  title="Cyber Teal"
                />
                <i
                  style={{ background: '#FFDE59', color: '#FFDE59' }}
                  onClick={() => handleThemeClick(4)}
                  title="Imperial Amber"
                />
                <i
                  style={{ background: '#10B981', color: '#10B981' }}
                  onClick={() => handleThemeClick(2)}
                  title="Emerald Matrix"
                />
                <i
                  style={{ background: '#8B5CF6', color: '#8B5CF6' }}
                  onClick={() => handleThemeClick(1)}
                  title="Tokyo Midnight"
                />
                <i
                  style={{ background: '#F43F5E', color: '#F43F5E' }}
                  onClick={() => handleThemeClick(3)}
                  title="Crimson Rose"
                />
              </div>

              {/* Streak */}
              <div className="stat">🔥 12 days</div>

              {/* XP Track with Shimmer Sweep */}
              <div className="xp">
                <b id="xp" style={{ width: `${xpWidth}%` }} />
              </div>

              {/* XP Number */}
              <div className="stat" id="xpn">
                {xpText}
              </div>
            </div>

            {/* Main 3-Column Studio Grid */}
            <div className="main-preview-grid">
              {/* Left Column: Chapter 1 Problems */}
              <div className="side glass">
                <h3>Ch 1: Searching</h3>
                <div
                  className={`pr ${PREVIEW_PROBLEMS[1].isDone ? 'done' : ''} ${
                    selectedProbId === 'contains-dup' ? 'on' : ''
                  }`}
                  onClick={() =>
                    handleSelectProblem(
                      PREVIEW_PROBLEMS[1].id,
                      PREVIEW_PROBLEMS[1].fileName
                    )
                  }
                >
                  <span className="truncate pr-1">Array Contains Duplicate</span>
                  <em className="E">Easy</em>
                </div>

                <div
                  className={`pr ${selectedProbId === 'bin-search' ? 'on' : ''}`}
                  onClick={() =>
                    handleSelectProblem(
                      PREVIEW_PROBLEMS[0].id,
                      PREVIEW_PROBLEMS[0].fileName
                    )
                  }
                >
                  <span className="truncate pr-1">Binary Search</span>
                  <em className="E">Easy</em>
                </div>

                <div
                  className={`pr ${selectedProbId === 'two-sum' ? 'on' : ''}`}
                  onClick={() =>
                    handleSelectProblem(
                      PREVIEW_PROBLEMS[2].id,
                      PREVIEW_PROBLEMS[2].fileName
                    )
                  }
                >
                  <span className="truncate pr-1">Two Sum</span>
                  <em className="E">Easy</em>
                </div>

                <div
                  className={`pr ${selectedProbId === 'course-sched' ? 'on' : ''}`}
                  onClick={() =>
                    handleSelectProblem(
                      PREVIEW_PROBLEMS[3].id,
                      PREVIEW_PROBLEMS[3].fileName
                    )
                  }
                >
                  <span className="truncate pr-1">Course Schedule</span>
                  <em className="M">Med</em>
                </div>

                <div
                  className={`pr ${selectedProbId === 'array-div' ? 'on' : ''}`}
                  onClick={() =>
                    handleSelectProblem(
                      PREVIEW_PROBLEMS[0].id,
                      PREVIEW_PROBLEMS[0].fileName
                    )
                  }
                >
                  <span className="truncate pr-1">Array Pair Sum Divisibility</span>
                  <em className="M">Med</em>
                </div>

                <div
                  className={`pr ${selectedProbId === 'kth-largest' ? 'on' : ''}`}
                  onClick={() =>
                    handleSelectProblem(
                      PREVIEW_PROBLEMS[4].id,
                      PREVIEW_PROBLEMS[4].fileName
                    )
                  }
                >
                  <span className="truncate pr-1">Kth Largest in Stream</span>
                  <em className="M">Med</em>
                </div>

                <div
                  className={`pr ${selectedProbId === 'word-ladder' ? 'on' : ''}`}
                  onClick={() =>
                    handleSelectProblem(
                      PREVIEW_PROBLEMS[5].id,
                      PREVIEW_PROBLEMS[5].fileName
                    )
                  }
                >
                  <span className="truncate pr-1">Word Ladder</span>
                  <em className="H">Hard</em>
                </div>
              </div>

              {/* Center Column: IDE & Live Terminal */}
              <div className="ide glass">
                <div className="etabs">
                  <span
                    className={activeFileTab === 'binary-search.py' ? 'on' : ''}
                    onClick={() =>
                      handleSelectProblem(
                        PREVIEW_PROBLEMS[0].id,
                        'binary-search.py'
                      )
                    }
                  >
                    binary-search.py
                  </span>
                  <span
                    className={activeFileTab === 'two-sum.py' ? 'on' : ''}
                    onClick={() =>
                      handleSelectProblem(
                        PREVIEW_PROBLEMS[2].id,
                        'two-sum.py'
                      )
                    }
                  >
                    two-sum.py
                  </span>
                </div>

                {/* Preformatted Line-Numbered Code Block */}
                <pre
                  className="code-pre"
                  id="code"
                  aria-label="Python editor"
                  dangerouslySetInnerHTML={{ __html: codeHtml }}
                />

                {/* Terminal Window with Sequential Passes */}
                <div className="term" id="term">
                  {activeProblem.terminalLogs.map((log, lIdx) => (
                    <div
                      key={lIdx}
                      className={`${lIdx < visibleLogsCount ? 'show' : ''} ${
                        log.startsWith('$') ? 'pend' : 'ok'
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Problem Specs & Byte Companion */}
              <div className="right glass">
                <h3>{activeProblem.title}</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: activeProblem.descHtml,
                  }}
                />

                <div>
                  {activeProblem.chips.map((chip, cIdx) => (
                    <span key={cIdx} className="chip">
                      {chip}
                    </span>
                  ))}
                </div>

                <p style={{ marginTop: '10px' }}>
                  Constraints: {activeProblem.constraints}
                </p>

                {/* Byte AI Mentor & Hop Animation */}
                <div className="byte">
                  <div className="bot">🤖</div>
                  <div className={`bub ${showByteBubble ? 'show' : ''}`} id="bub">
                    {activeProblem.byteTip}
                  </div>
                </div>
              </div>
            </div>

            {/* Bangers +50 XP! Pop Overlay */}
            <div className={`pop ${showPop ? 'show' : ''}`} id="pop">
              +50 XP!
            </div>

            {/* In-Preview Command Palette Overlay */}
            <div
              className={`pal ${showPalette ? 'show' : ''}`}
              id="pal"
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowPalette(false);
              }}
            >
              <div className="pbox">
                <div className="pin" id="pin">
                  {paletteTyped}
                </div>
                <div
                  className="pit on"
                  onClick={() => {
                    handleThemeClick(1);
                    setShowPalette(false);
                  }}
                >
                  <span>Theme: Tokyo Midnight</span>
                  <small>theme</small>
                </div>
                <div
                  className="pit"
                  onClick={() => {
                    setActiveNavTab('Research Lab');
                    setShowPalette(false);
                  }}
                >
                  <span>Open Raft Consensus Lab</span>
                  <small>lab</small>
                </div>
                <div
                  className="pit"
                  onClick={() => {
                    setActiveNavTab('Duel Arena');
                    setShowPalette(false);
                  }}
                >
                  <span>Start 1v1 Duel vs Bugsy</span>
                  <small>arena</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exact Caption */}
      <div className="cap">
        Animated mock-up: write a solution, run the tests, earn XP, then switch
        themes with the command palette.
      </div>
    </div>
  );
};
