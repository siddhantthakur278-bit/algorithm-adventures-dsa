import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../utils/soundEffects';

interface ProblemData {
  id: string;
  title: string;
  descHtml: string;
  chips: string[];
  constraints: string;
  byteTip: string;
  code: string[];
  terminalLogs: { text: string; isPend?: boolean }[];
}

const PROBLEMS: Record<string, ProblemData> = {
  'bin-search': {
    id: 'bin-search',
    title: 'Binary Search',
    descHtml: 'Given a sorted array <code>nums</code> and a <code>target</code>, return its index or -1.',
    chips: ['arrays', 'Amazon', 'Google', 'acceptance 62%'],
    constraints: '1 ≤ n ≤ 10⁴, values are unique.',
    byteTip: 'Halve the range each step. That is why it runs in O(log n).',
    code: [
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
      { text: '$ run tests', isPend: true },
      { text: '✓ sample 1  nums=[-1,0,3,5,9,12] target=9  → 4' },
      { text: '✓ sample 2  nums=[-1,0,3,5,9,12] target=2  → -1' },
      { text: '✓ hidden 28/28 passed · 0 ms · O(log n)' },
      { text: '⟶ committed to GitHub · a3f9c21' },
    ],
  },
  'two-sum': {
    id: 'two-sum',
    title: 'Two Sum',
    descHtml: 'Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of two numbers adding to target.',
    chips: ['two-pointers', 'Apple', 'Meta', 'acceptance 54%'],
    constraints: '2 ≤ nums.length ≤ 10⁴, exactly one solution exists.',
    byteTip: 'Store complement values in a hash table for an instant O(n) single pass!',
    code: [
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
      { text: '$ run tests', isPend: true },
      { text: '✓ sample 1  nums=[2,7,11,15] target=9  → [0, 1]' },
      { text: '✓ sample 2  nums=[3,2,4] target=6  → [1, 2]' },
      { text: '✓ hidden 25/25 passed · 1 ms · O(n)' },
      { text: '⟶ committed to GitHub · 9f2c8d4' },
    ],
  },
  'contains-dup': {
    id: 'contains-dup',
    title: 'Array Contains Duplicate',
    descHtml: 'Given an integer array <code>nums</code>, return true if any value appears at least twice in the array.',
    chips: ['hash-table', 'Google', 'acceptance 61%'],
    constraints: '1 ≤ nums.length ≤ 10⁵, -10⁹ ≤ nums[i] ≤ 10⁹.',
    byteTip: 'A hash set gives O(1) average lookup time for instant duplicate checking!',
    code: [
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
      { text: '$ run tests', isPend: true },
      { text: '✓ sample 1  nums=[1,2,3,1]  → True' },
      { text: '✓ sample 2  nums=[1,2,3,4]  → False' },
      { text: '✓ hidden 30/30 passed · 12 ms · O(n)' },
      { text: '⟶ committed to GitHub · 8b4e190' },
    ],
  },
};

const THEMES: [string, string][] = [
  ['#06B6D4', '#38BDF8'],
  ['#8B5CF6', '#38BDF8'],
  ['#10B981', '#34D399'],
  ['#F43F5E', '#FB7185'],
  ['#FBBF24', '#FB923C'],
];

export const GlossyStudioHero: React.FC = () => {
  const [activeProblemId, setActiveProblemId] = useState<string>('bin-search');
  const [activeNavTab, setActiveNavTab] = useState<string>('Problems');

  // DOM Refs
  const stageRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const bubRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const palRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const xpRef = useRef<HTMLElement>(null);
  const xpnRef = useRef<HTMLDivElement>(null);

  const runIdRef = useRef<number>(0);
  const currentProb = PROBLEMS[activeProblemId] || PROBLEMS['bin-search'];

  const setTheme = (i: number) => {
    const pair = THEMES[i];
    if (!pair) return;
    if (appRef.current) {
      appRef.current.style.setProperty('--a', pair[0]);
      appRef.current.style.setProperty('--a2', pair[1]);
    }
    if (stageRef.current) {
      stageRef.current.style.setProperty('--a', pair[0]);
      stageRef.current.style.setProperty('--a2', pair[1]);
    }
  };

  const plain = (h: string) => {
    const d = document.createElement('div');
    d.innerHTML = h;
    return d.textContent || '';
  };

  const render = (codeLines: string[], n: number, partial?: string | null) => {
    if (!codeRef.current) return;
    const completed = codeLines
      .slice(0, n)
      .map((l) => `<span class="ln">${l}</span>`)
      .join('');
    const curLine =
      partial !== null && partial !== undefined
        ? `<span class="ln">${partial}<i class="cur"></i></span>`
        : '';
    codeRef.current.innerHTML = completed + curLine;
  };

  const play = async (prob: ProblemData) => {
    const myRun = ++runIdRef.current;
    const isLive = () => myRun === runIdRef.current;

    const termChildren = termRef.current?.children;

    setTheme(1);
    if (xpRef.current) xpRef.current.style.width = '62%';
    if (xpnRef.current) xpnRef.current.textContent = '1,240 XP';

    if (termChildren) {
      Array.from(termChildren).forEach((t) => t.classList.remove('show'));
    }
    bubRef.current?.classList.remove('show');
    popRef.current?.classList.remove('show');
    palRef.current?.classList.remove('show');
    render(prob.code, 0, '');

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    const wait = (ms: number) =>
      new Promise((r) => setTimeout(r, reduce ? 0 : ms));

    if (reduce) {
      render(prob.code, prob.code.length);
      if (termChildren) {
        Array.from(termChildren).forEach((t) => t.classList.add('show'));
      }
      if (xpRef.current) xpRef.current.style.width = '100%';
      if (xpnRef.current) xpnRef.current.textContent = '1,290 XP';
      return;
    }

    await wait(500);

    // Progressive line typing
    for (let i = 0; i < prob.code.length && isLive(); i++) {
      const txt = plain(prob.code[i]);
      const step = Math.ceil(txt.length / 9);
      for (let c = step; c < txt.length && isLive(); c += step) {
        render(prob.code, i, txt.slice(0, c));
        await wait(45);
      }
      if (!isLive()) return;
      render(prob.code, i + 1);
      await wait(90);
      if (i === 3) bubRef.current?.classList.add('show');
    }

    if (!isLive()) return;
    await wait(500);

    // Sequential terminal tests
    if (termChildren) {
      for (let i = 0; i < termChildren.length && isLive(); i++) {
        termChildren[i].classList.add('show');
        await wait(650);
      }
    }

    if (!isLive()) return;
    if (xpRef.current) xpRef.current.style.width = '100%';
    if (xpnRef.current) xpnRef.current.textContent = '1,290 XP';
    popRef.current?.classList.add('show');

    await wait(1800);
    if (!isLive()) return;

    popRef.current?.classList.remove('show');
    palRef.current?.classList.add('show');

    const q = '> theme midnight';
    if (pinRef.current) pinRef.current.textContent = '> ';
    for (const ch of q.slice(2)) {
      if (!isLive()) return;
      if (pinRef.current) pinRef.current.textContent += ch;
      await wait(70);
    }

    await wait(600);
    if (!isLive()) return;
    setTheme(3);

    await wait(500);
    palRef.current?.classList.remove('show');

    await wait(2800);
    if (isLive()) play(prob);
  };

  useEffect(() => {
    play(currentProb);
    return () => {
      runIdRef.current++;
    };
  }, [activeProblemId]);

  const handleReplay = () => {
    sound.playPop();
    play(currentProb);
  };

  const handleThemeClick = (i: number) => {
    sound.playPop();
    setTheme(i);
  };

  const handleSelectProblem = (id: string) => {
    sound.playPop();
    setActiveProblemId(id);
  };

  const handleTabClick = (t: string) => {
    sound.playPop();
    setActiveNavTab(t);
  };

  const handleTogglePalette = () => {
    sound.playPop();
    palRef.current?.classList.toggle('show');
  };

  return (
    <div className="wrap">
      <div className="top">
        <h1>ADA Hub: interface preview</h1>
        <button id="replay" type="button" onClick={handleReplay}>
          Replay
        </button>
      </div>
      <div className="scroll">
        <div className="stage" id="stage" ref={stageRef}>
          <div className="orb o1" />
          <div className="orb o2" />
          <div className="orb o3" />
          <div className="app" id="app" ref={appRef}>
            <div className="nav">
              <div
                className="logo cursor-pointer"
                onClick={() => handleTabClick('Problems')}
              >
                <b>⚡</b>Algorithm Adventures
              </div>
              <div className="tabs">
                {[
                  'Problems',
                  'Sagas',
                  'Research Lab',
                  'Duel Arena',
                  'Mock Interview',
                ].map((tab) => (
                  <span
                    key={tab}
                    className={activeNavTab === tab ? 'on' : ''}
                    onClick={() => handleTabClick(tab)}
                  >
                    {tab}
                  </span>
                ))}
              </div>
              <div className="sp" />
              <div className="k" onClick={handleTogglePalette}>
                ⌘K Search
              </div>
              <div className="dots" aria-hidden="true">
                <i
                  style={{ background: '#06B6D4', color: '#06B6D4' }}
                  onClick={() => handleThemeClick(0)}
                  title="Teal"
                />
                <i
                  style={{ background: '#FFDE59', color: '#FFDE59' }}
                  onClick={() => handleThemeClick(4)}
                  title="Amber"
                />
                <i
                  style={{ background: '#10B981', color: '#10B981' }}
                  onClick={() => handleThemeClick(2)}
                  title="Emerald"
                />
                <i
                  style={{ background: '#8B5CF6', color: '#8B5CF6' }}
                  onClick={() => handleThemeClick(1)}
                  title="Midnight"
                />
                <i
                  style={{ background: '#F43F5E', color: '#F43F5E' }}
                  onClick={() => handleThemeClick(3)}
                  title="Rose"
                />
              </div>
              <div className="stat">🔥 12 days</div>
              <div className="xp">
                <b id="xp" ref={xpRef} />
              </div>
              <div className="stat" id="xpn" ref={xpnRef}>
                1,240 XP
              </div>
            </div>
            <div className="main">
              <div className="side glass">
                <h3>Ch 1: Searching</h3>
                <div
                  className={`pr done ${
                    activeProblemId === 'contains-dup' ? 'on' : ''
                  }`}
                  onClick={() => handleSelectProblem('contains-dup')}
                >
                  Array Contains Duplicate<em className="E">Easy</em>
                </div>
                <div
                  className={`pr ${
                    activeProblemId === 'bin-search' ? 'on' : ''
                  }`}
                  onClick={() => handleSelectProblem('bin-search')}
                >
                  Binary Search<em className="E">Easy</em>
                </div>
                <div
                  className={`pr ${activeProblemId === 'two-sum' ? 'on' : ''}`}
                  onClick={() => handleSelectProblem('two-sum')}
                >
                  Two Sum<em className="E">Easy</em>
                </div>
                <div
                  className="pr"
                  onClick={() => handleSelectProblem('bin-search')}
                >
                  Course Schedule<em className="M">Med</em>
                </div>
                <div
                  className="pr"
                  onClick={() => handleSelectProblem('bin-search')}
                >
                  Array Pair Sum Divisibility<em className="M">Med</em>
                </div>
                <div
                  className="pr"
                  onClick={() => handleSelectProblem('bin-search')}
                >
                  Kth Largest in Stream<em className="M">Med</em>
                </div>
                <div
                  className="pr"
                  onClick={() => handleSelectProblem('bin-search')}
                >
                  Word Ladder<em className="H">Hard</em>
                </div>
              </div>
              <div className="ide glass">
                <div className="etabs">
                  <span
                    className={activeProblemId === 'bin-search' ? 'on' : ''}
                    onClick={() => handleSelectProblem('bin-search')}
                  >
                    binary-search.py
                  </span>
                  <span
                    className={activeProblemId === 'two-sum' ? 'on' : ''}
                    onClick={() => handleSelectProblem('two-sum')}
                  >
                    two-sum.py
                  </span>
                </div>
                <pre
                  id="code"
                  ref={codeRef}
                  aria-label="Python editor"
                />
                <div className="term" id="term" ref={termRef}>
                  {currentProb.terminalLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={log.isPend ? 'pend' : 'ok'}
                    >
                      {log.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="right glass">
                <h3>{currentProb.title}</h3>
                <p
                  dangerouslySetInnerHTML={{ __html: currentProb.descHtml }}
                />
                {currentProb.chips.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
                <p style={{ marginTop: '10px' }}>
                  Constraints: {currentProb.constraints}
                </p>
                <div className="byte">
                  <div className="bot">🤖</div>
                  <div className="bub" id="bub" ref={bubRef}>
                    {currentProb.byteTip}
                  </div>
                </div>
              </div>
            </div>
            <div className="pop" id="pop" ref={popRef}>
              +50 XP!
            </div>
            <div className="pal" id="pal" ref={palRef}>
              <div className="pbox">
                <div className="pin" id="pin" ref={pinRef}>
                  &gt;{' '}
                </div>
                <div
                  className="pit on"
                  onClick={() => {
                    handleThemeClick(1);
                    palRef.current?.classList.remove('show');
                  }}
                >
                  Theme: Tokyo Midnight<small>theme</small>
                </div>
                <div
                  className="pit"
                  onClick={() => {
                    handleTabClick('Research Lab');
                    palRef.current?.classList.remove('show');
                  }}
                >
                  Open Raft Consensus Lab<small>lab</small>
                </div>
                <div
                  className="pit"
                  onClick={() => {
                    handleTabClick('Duel Arena');
                    palRef.current?.classList.remove('show');
                  }}
                >
                  Start 1v1 Duel vs Bugsy<small>arena</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cap">
        Animated mock-up: write a solution, run the tests, earn XP, then switch
        themes with the command palette.
      </div>
    </div>
  );
};
