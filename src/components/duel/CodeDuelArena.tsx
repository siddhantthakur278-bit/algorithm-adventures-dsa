import React, { useState, useEffect, useRef } from 'react';
import { useCourse } from '../../context/CourseContext';
import { ByteAvatar, BugsyAvatar, ComicBubble } from '../characters/Characters';
import { UniversalVSCodeEditor } from '../common/UniversalVSCodeEditor';
import {
  Swords,
  Shield,
  Zap,
  Clock,
  Flame,
  Trophy,
  RotateCcw,
  AlertTriangle,
  Play,
  Heart,
  Skull,
  Award,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface DuelProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  starterCode: string;
  solutionCode: string;
  testCases: { input: string; expectedOutput: string }[];
  bugsyBuggyCode: string;
}

const DUEL_PROBLEMS: DuelProblem[] = [
  {
    id: 'duel-1',
    title: 'Two Sum Lightning Strike',
    difficulty: 'Easy',
    description: 'Find two indices in nums that sum to target. Return their indices in ascending order.',
    starterCode: `def two_sum(nums, target):\n    # Defeat Bugsy with an O(N) hash map solution!\n    seen = {}\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in seen:\n            return [seen[diff], i]\n        seen[n] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))\n`,
    solutionCode: `def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in seen:\n            return [seen[diff], i]\n        seen[n] = i\n    return []\n`,
    testCases: [
      { input: '[2, 7, 11, 15], 9', expectedOutput: '[0, 1]' },
      { input: '[3, 2, 4], 6', expectedOutput: '[1, 2]' },
      { input: '[3, 3], 6', expectedOutput: '[0, 1]' },
      { input: '[1, 5, 8, 3], 11', expectedOutput: '[2, 3]' },
    ],
    bugsyBuggyCode: `def two_sum(nums, target):\n    # Bugsy's buggy quadratic attempt\n    for i in range(len(nums)):\n        for j in range(len(nums)): # BUG: checks same index!\n            if nums[i] + nums[j] == target:\n                return [i, j]\n`,
  },
  {
    id: 'duel-2',
    title: 'Valid Parentheses Barrier',
    difficulty: 'Medium',
    description: 'Verify if the bracket string contains balanced pairs of (), [], and {}. Return True or False.',
    starterCode: `def is_valid(s):\n    # Bugsy is trying to inject unmatched brackets!\n    stack = []\n    pairs = {')': '(', ']': '[', '}': '{'}\n    for char in s:\n        if char in pairs.values():\n            stack.append(char)\n        elif char in pairs:\n            if not stack or stack.pop() != pairs[char]:\n                return False\n    return len(stack) == 0\n\nprint(is_valid("()[]{}"))\n`,
    solutionCode: `def is_valid(s):\n    stack = []\n    pairs = {')': '(', ']': '[', '}': '{'}\n    for char in s:\n        if char in pairs.values():\n            stack.append(char)\n        elif char in pairs:\n            if not stack or stack.pop() != pairs[char]:\n                return False\n    return len(stack) == 0\n`,
    testCases: [
      { input: '"()[]{}"', expectedOutput: 'True' },
      { input: '"(]"', expectedOutput: 'False' },
      { input: '"([{}])"', expectedOutput: 'True' },
      { input: '"]"', expectedOutput: 'False' },
    ],
    bugsyBuggyCode: `def is_valid(s):\n    # Bugsy just counts lengths!\n    return len(s) % 2 == 0 # WRONG: "(]" has length 2!\n`,
  },
  {
    id: 'duel-3',
    title: 'Binary Search Overdrive',
    difficulty: 'Medium',
    description: 'Find target in a sorted array in O(log N) time. Return index or -1 if not found.',
    starterCode: `def search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\nprint(search([-1, 0, 3, 5, 9, 12], 9))\n`,
    solutionCode: `def search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n`,
    testCases: [
      { input: '[-1, 0, 3, 5, 9, 12], 9', expectedOutput: '4' },
      { input: '[-1, 0, 3, 5, 9, 12], 2', expectedOutput: '-1' },
      { input: '[5], 5', expectedOutput: '0' },
      { input: '[1, 3, 5, 7, 9], 7', expectedOutput: '3' },
    ],
    bugsyBuggyCode: `def search(nums, target):\n    # Bugsy has an infinite loop bug!\n    left, right = 0, len(nums)\n    while left < right:\n        mid = (left + right) // 2\n        if nums[mid] == target: return mid\n        # Missing update! Infinite Loop!\n`,
  },
];

export const CodeDuelArena: React.FC = () => {
  const { triggerBurst, addXP, unlockBadge } = useCourse();

  // Match state
  const [selectedDuelIdx, setSelectedDuelIdx] = useState<number>(0);
  const duel = DUEL_PROBLEMS[selectedDuelIdx];

  const [playerHp, setPlayerHp] = useState<number>(100);
  const [bugsyHp, setBugsyHp] = useState<number>(100);
  const [timeLeft, setTimeLeft] = useState<number>(180); // 3 minutes
  const [isBattleActive, setIsBattleActive] = useState<boolean>(true);
  const [battleResult, setBattleResult] = useState<'victory' | 'defeat' | null>(null);

  // Powerups state
  const [syntaxShield, setSyntaxShield] = useState<boolean>(false);
  const [overclock, setOverclock] = useState<boolean>(false);
  const [timeFrozen, setTimeFrozen] = useState<boolean>(false);

  // Bugsy simulated chatter
  const [bugsyDialogue, setBugsyDialogue] = useState<string>(
    "Mwahaha! My buggy code will overload your compiler before you can finish Two Sum!"
  );

  // Timer loop
  useEffect(() => {
    if (!isBattleActive || battleResult) return;
    const interval = window.setInterval(() => {
      if (!timeFrozen) {
        setTimeLeft(t => {
          if (t <= 1) {
            handleDefeat('Time Expired! Bugsy overwhelmed the mainframe!');
            return 0;
          }
          return t - 1;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isBattleActive, battleResult, timeFrozen]);

  // Periodic Bugsy attacks (every 25 seconds)
  useEffect(() => {
    if (!isBattleActive || battleResult) return;
    const bugsyAttackTimer = window.setInterval(() => {
      const quotes = [
        "IndexError strike! Did you forget boundary checks?!",
        "Stack Overflow blast incoming! Recurse forever!",
        "O(N^3) memory leak deployed! Feel the lag!",
        "Off-by-one trap triggered!",
      ];
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setBugsyDialogue(randomQuote);

      if (syntaxShield) {
        setSyntaxShield(false);
        triggerBurst('🛡️ SHIELD BLOCKED!', "Syntax Shield absorbed Bugsy's attack!", 'zap');
        sound.playPop();
      } else {
        setPlayerHp(hp => {
          const nextHp = Math.max(0, hp - 15);
          sound.playError();
          triggerBurst('💥 OUCH!', '-15 HP from Bugsy Attack!', 'boom');
          if (nextHp <= 0) {
            handleDefeat("Bugsy's glitch defeated you!");
          }
          return nextHp;
        });
      }
    }, 24000);

    return () => clearInterval(bugsyAttackTimer);
  }, [isBattleActive, battleResult, syntaxShield]);

  const handleDefeat = (reason: string) => {
    setIsBattleActive(false);
    setBattleResult('defeat');
    sound.playError();
    triggerBurst('💀 DEFEAT', reason, 'boom');
  };

  const handlePlayerAttack = (damageMultiplier: number = 1) => {
    const baseDamage = 25;
    const actualDamage = Math.round(baseDamage * (overclock ? 1.5 : 1) * damageMultiplier);
    if (overclock) setOverclock(false);

    sound.playExplosion();
    triggerBurst('⚡ CRITICAL HIT!', `-${actualDamage} HP to Bugsy!`, 'pow');

    setBugsyHp(hp => {
      const nextHp = Math.max(0, hp - actualDamage);
      if (nextHp <= 0) {
        // Victory!
        setIsBattleActive(false);
        setBattleResult('victory');
        sound.playFanfare();
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        addXP(250, 'Defeated Bugsy in 1v1 Code Duel!');
        unlockBadge('badge-boss-bugsy');
        setBugsyDialogue("NOOO! My infinite loop was untangled! You win this round, coder!");
      } else {
        const reactions = [
          "Argh! That test case pierced my armor!",
          "Impossible! Your time complexity is actually O(N)?!",
          "My stack pointer is wobbling!",
        ];
        setBugsyDialogue(reactions[Math.floor(Math.random() * reactions.length)]);
      }
      return nextHp;
    });
  };

  const resetBattle = (newIdx: number = selectedDuelIdx) => {
    setSelectedDuelIdx(newIdx);
    setPlayerHp(100);
    setBugsyHp(100);
    setTimeLeft(180);
    setIsBattleActive(true);
    setBattleResult(null);
    setSyntaxShield(false);
    setOverclock(false);
    setTimeFrozen(false);
    setBugsyDialogue("Back for more? Prepare to taste pure Runtime Exception!");
    sound.playPop();
  };

  const activateShield = () => {
    if (syntaxShield) return;
    setSyntaxShield(true);
    sound.playPop();
    triggerBurst('🛡️ SHIELD UP!', 'Next Bugsy attack blocked!', 'zap');
  };

  const activateOverclock = () => {
    if (overclock) return;
    setOverclock(true);
    sound.playPop();
    triggerBurst('⚡ OVERCLOCK!', '+50% Attack Damage on next test run!', 'pow');
  };

  const activateTimeFreeze = () => {
    if (timeFrozen) return;
    setTimeFrozen(true);
    sound.playPop();
    triggerBurst('⏳ TIME WARP!', 'Match clock paused for 20 seconds!', 'star');
    setTimeout(() => setTimeFrozen(false), 20000);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 font-comic">
      {/* Duel Arena Header */}
      <div className="relative bg-gradient-to-r from-[#170a1e] via-[#0d1226] to-[#1c080e] border-3 border-black rounded-3xl p-6 shadow-comic overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-rose-500 text-white font-black text-xs uppercase tracking-wider rounded-full border-2 border-black shadow-comic-sm flex items-center gap-1.5">
                <Swords className="w-3.5 h-3.5" /> 1v1 CODE DUEL ARENA
              </span>
              <span className="px-2.5 py-1 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full border border-black shadow-comic-sm">
                ROUND {selectedDuelIdx + 1} OF {DUEL_PROBLEMS.length}
              </span>
            </div>
            <h1 className="font-bangers text-3xl sm:text-5xl text-white tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              BYTE VS BUGSY: BATTLE FOR THE MAINFRAME
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              Code real-time solutions against Bugsy. Every passed test case deals damage to the boss!
            </p>
          </div>

          {/* Match Timer */}
          <div className="flex items-center gap-3 bg-[#0a0d18] px-5 py-3 rounded-2xl border-2 border-black shadow-comic">
            <Clock className={`w-6 h-6 ${timeLeft < 45 ? 'text-rose-500 animate-spin' : 'text-amber-400'}`} />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Time Remaining</div>
              <div className={`font-bangers text-2xl tracking-wider ${timeLeft < 45 ? 'text-rose-400 animate-pulse' : 'text-white'}`}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>

        {/* Duel Problem Switcher */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#261f38] overflow-x-auto pb-1">
          {DUEL_PROBLEMS.map((dp, idx) => (
            <button
              key={dp.id}
              onClick={() => resetBattle(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                selectedDuelIdx === idx
                  ? 'bg-amber-400 text-black border-black shadow-comic-sm font-black'
                  : 'bg-[#15192c] text-slate-300 border-[#262f4d] hover:text-white'
              }`}
            >
              <Swords className="w-3 h-3" />
              <span>Duel #{idx + 1}: {dp.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Health Bars HUD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Player Bar */}
        <div className="bg-[#0b1220] p-4 rounded-2xl border-2 border-cyan-500/60 shadow-comic flex items-center gap-4">
          <ByteAvatar size="lg" mood={playerHp > 40 ? 'happy' : 'shocked'} />
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="text-cyan-300 font-bangers text-lg">YOU (BYTE)</span>
              <span className="text-white font-mono">{playerHp} / 100 HP</span>
            </div>
            <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-700 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${playerHp}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bugsy Boss Bar */}
        <div className="bg-[#1a0a10] p-4 rounded-2xl border-2 border-rose-500/60 shadow-comic flex items-center gap-4">
          <BugsyAvatar size="lg" mood={bugsyHp > 0 ? 'sneaky' : 'defeated'} />
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="text-rose-400 font-bangers text-lg">BUGSY (GLITCH OVERLORD)</span>
              <span className="text-white font-mono">{bugsyHp} / 100 HP</span>
            </div>
            <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-700 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 rounded-full transition-all duration-300"
                style={{ width: `${bugsyHp}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Combat Power-ups Toolbar */}
      <div className="bg-[#0e1322] p-3 rounded-2xl border-2 border-black shadow-comic flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-bold">
          <Flame className="w-4 h-4 text-amber-400" />
          <span>Combat Boosters:</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={activateShield}
            disabled={syntaxShield}
            className={`px-3 py-1.5 rounded-xl border-2 font-bold flex items-center gap-1.5 transition cursor-pointer ${
              syntaxShield
                ? 'bg-cyan-500 text-black border-cyan-300 shadow-comic-sm font-black'
                : 'bg-[#182035] text-cyan-300 border-cyan-500/40 hover:bg-cyan-900/40'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{syntaxShield ? 'Shield Active' : 'Syntax Shield'}</span>
          </button>

          <button
            onClick={activateOverclock}
            disabled={overclock}
            className={`px-3 py-1.5 rounded-xl border-2 font-bold flex items-center gap-1.5 transition cursor-pointer ${
              overclock
                ? 'bg-amber-400 text-black border-amber-300 shadow-comic-sm font-black'
                : 'bg-[#182035] text-amber-300 border-amber-500/40 hover:bg-amber-900/40'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{overclock ? 'Overclock +50% Ready' : 'Overclock Strike'}</span>
          </button>

          <button
            onClick={activateTimeFreeze}
            disabled={timeFrozen}
            className={`px-3 py-1.5 rounded-xl border-2 font-bold flex items-center gap-1.5 transition cursor-pointer ${
              timeFrozen
                ? 'bg-purple-400 text-black border-purple-300 shadow-comic-sm font-black'
                : 'bg-[#182035] text-purple-300 border-purple-500/40 hover:bg-purple-900/40'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{timeFrozen ? 'Clock Frozen (20s)' : 'Time Warp'}</span>
          </button>
        </div>
      </div>

      {/* Duel Arena Split: VS Code Combat Stage vs Bugsy Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Player IDE (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="bg-[#0b101d] p-4 rounded-2xl border-2 border-black shadow-comic">
            <h3 className="font-bangers text-xl text-yellow-300 mb-1">
              MISSION: {duel.title.toUpperCase()}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-3">
              {duel.description}
            </p>

            <UniversalVSCodeEditor
              language="python"
              starterCode={duel.starterCode}
              solutionCode={duel.solutionCode}
              problemTitle={duel.title}
              problemId={duel.id}
              fileName="duel_solution.py"
              testCases={duel.testCases}
              onSolve={() => {
                handlePlayerAttack(1.5);
              }}
            />
          </div>
        </div>

        {/* Right Column: Bugsy Terminal & Trash-Talk Stage (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Bugsy Speech Bubble */}
          <div className="bg-[#1c0a12] p-4 rounded-2xl border-2 border-rose-500/60 shadow-comic space-y-2">
            <div className="flex items-center gap-2">
              <BugsyAvatar size="sm" mood="sneaky" />
              <span className="font-bangers text-sm text-rose-400">BUGSY BROADCAST</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-rose-100 italic bg-[#0f0509] p-3 rounded-xl border border-rose-900/60">
              "{bugsyDialogue}"
            </p>
          </div>

          {/* Bugsy's Glitched Screen */}
          <div className="bg-[#08060a] p-4 rounded-2xl border-2 border-[#2b101b] shadow-comic space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-500 flex items-center gap-1.5">
                <Skull className="w-3.5 h-3.5 text-rose-500" /> Bugsy's Terminal
              </span>
              <span className="text-[10px] font-mono text-rose-400 animate-pulse">GLITCHING</span>
            </div>
            <pre className="p-3 bg-[#040206] rounded-xl font-mono text-xs text-rose-300/80 leading-relaxed overflow-x-auto border border-rose-950">
              <code>{duel.bugsyBuggyCode}</code>
            </pre>
          </div>

          {/* Manual Strike Trigger for Quick Combat Testing */}
          <div className="bg-[#0b101e] p-4 rounded-2xl border-2 border-black shadow-comic space-y-2">
            <div className="text-xs font-bold text-slate-300 font-bangers">
              COMBAT STRIKE LAUNCHER
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Passed your tests in the VS Code editor? Click below to unleash your test-case combo attack!
            </p>
            <button
              onClick={() => handlePlayerAttack(1)}
              disabled={!isBattleActive || bugsyHp <= 0}
              className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-bangers text-base rounded-xl border-2 border-black shadow-comic-sm hover:scale-102 transition cursor-pointer disabled:opacity-50"
            >
              💥 LAUNCH TEST-CASE ATTACK (-25 HP)
            </button>
          </div>

          {/* Result Banner if finished */}
          {battleResult && (
            <div className={`p-4 rounded-2xl border-3 border-black shadow-comic text-center space-y-2 animate-bounce ${
              battleResult === 'victory' ? 'bg-[#0b2416] border-emerald-400' : 'bg-[#290a12] border-rose-500'
            }`}>
              <div className="text-3xl">{battleResult === 'victory' ? '🏆' : '💀'}</div>
              <h3 className="font-bangers text-2xl text-white">
                {battleResult === 'victory' ? 'VICTORY! BUGSY DEFEATED!' : 'GAME OVER! BUGSY WON!'}
              </h3>
              <p className="text-xs text-slate-300">
                {battleResult === 'victory'
                  ? 'Mainframe liberated! +250 XP & Boss Badge unlocked!'
                  : 'Bugsy corrupted the runtime memory. Try again!'}
              </p>
              <button
                onClick={() => resetBattle()}
                className="mt-2 px-4 py-2 bg-amber-400 text-slate-950 font-bangers text-sm rounded-xl border-2 border-black shadow-comic-sm hover:bg-amber-300 cursor-pointer"
              >
                Rematch Bugsy &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
