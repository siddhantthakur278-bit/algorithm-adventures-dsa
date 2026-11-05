import React, { useState } from 'react';
import {
  pythonDsaChapters,
  pythonDsa80Problems,
  pythonDsaCheatSheets,
  pythonDsaBossBattle,
  pythonDsaGlossary,
} from '../../data/pythonDsaData';
import {
  PythonDsaChapter,
  PythonDsaClassicalProblem,
  PythonDsaWorldId,
} from '../../types/pythonDsaTypes';
import {
  SidAvatar,
  ProfessorPyAvatar,
  BuggyAvatar,
  ComicBubble,
} from '../characters/Characters';
import { SagaWorldMap } from './SagaWorldMap';
import { BossBattleArena } from './BossBattleArena';
import { MythSmasherArcade } from './MythSmasherArcade';
import { CodeStepVisualizer } from './CodeStepVisualizer';
import { VisualDsaPlayground } from './VisualDsaPlayground';
import { BigORaceTrack } from './BigORaceTrack';
import { PowerCardShop } from './PowerCardShop';
import { SpeedBlitzArena } from './SpeedBlitzArena';
import {
  BookOpen,
  Trophy,
  Layers,
  Sparkles,
  Search,
  Check,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Copy,
  Lock,
  ArrowRight,
  Shield,
  Zap,
  Code2,
  HelpCircle,
  Flame,
  FileSpreadsheet,
  Award,
  RefreshCw,
  Printer,
  Coins,
  Play,
  Map,
  Hammer,
  Sliders,
  ShoppingBag,
  Timer,
  Flag,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/soundEffects';
import { useCourse } from '../../context/CourseContext';
import { UniversalVSCodeEditor } from '../common/UniversalVSCodeEditor';

export const PythonDsaHub: React.FC = () => {
  const { setActiveTab: setAppTab, unlockBadge, triggerBurst, addXP } = useCourse();

  // Navigation Tabs
  const [activeSubTab, setActiveSubTab] = useState<
    | 'chapters'
    | 'brainstormers'
    | 'playground'
    | 'race'
    | 'blitz'
    | 'shop'
    | 'mythsmasher'
    | 'boss'
    | 'cheatsheets'
    | 'glossary'
    | 'certificate'
  >('chapters');

  // Chapter View Mode (Overworld Map vs Detailed Reader)
  const [chapterViewMode, setChapterViewMode] = useState<'map' | 'reader'>('map');

  // Chapter Navigation
  const [selectedChapterId, setSelectedChapterId] = useState<number>(0);
  const currentChapter: PythonDsaChapter =
    pythonDsaChapters.find(c => c.id === selectedChapterId) || pythonDsaChapters[0];

  // Coins & Gamified Inventory
  const [coins, setCoins] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('ada_pydsa_coins') || 150);
    } catch {
      return 150;
    }
  });

  // Code Visualizer Modal / Drawer
  const [activeCodeVisualizer, setActiveCodeVisualizer] = useState<{
    code: string;
    output?: string;
    title?: string;
  } | null>(null);

  // Sequential Tracking
  const [completedChapters, setCompletedChapters] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ada_pydsa_completed_chapters');
      return saved ? JSON.parse(saved) : [0];
    } catch {
      return [0];
    }
  });

  const [completed80Problems, setCompleted80Problems] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ada_pydsa_completed_80');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [revealedProblemIds, setRevealedProblemIds] = useState<Record<number, boolean>>({});
  const [sequenceWarning, setSequenceWarning] = useState<string | null>(null);

  // Quizzes State
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 80 Problems Filter & Coding IDE State
  const [selectedWorld, setSelectedWorld] = useState<PythonDsaWorldId | 'all'>('all');
  const [activeCoding80Id, setActiveCoding80Id] = useState<number | null>(null);

  // Boss Battle State
  const [bossAnswers, setBossAnswers] = useState<Record<string, string>>({});
  const [bossSubmitted, setBossSubmitted] = useState<boolean>(false);

  // Glossary Search
  const [glossaryQuery, setGlossaryQuery] = useState<string>('');

  // Certificate Name
  const [heroName, setHeroName] = useState<string>('Sid the Algorithmic Hero');

  // Gamified Level and XP computation
  const totalXp =
    completedChapters.length * 150 +
    completed80Problems.length * 75 +
    Object.keys(quizAnswers).length * 25;
  const heroLevel = Math.floor(totalXp / 450) + 1;
  const levelTitles = [
    'Byte Novice',
    'Memory Apprentice',
    'Pointer Squire',
    'Tree Whisperer',
    'Graph Navigator',
    'DP Sorcerer',
    'Algorithm Grandmaster',
  ];
  const heroTitle = levelTitles[Math.min(levelTitles.length - 1, heroLevel - 1)];

  const addCoins = (amount: number) => {
    setCoins(prev => {
      const next = prev + amount;
      localStorage.setItem('ada_pydsa_coins', String(next));
      return next;
    });
  };

  const spendCoins = (amount: number): boolean => {
    if (coins < amount) {
      sound.playError();
      return false;
    }
    setCoins(prev => {
      const next = prev - amount;
      localStorage.setItem('ada_pydsa_coins', String(next));
      return next;
    });
    return true;
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    sound.playPop();
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const markChapterCompleted = (chapterId: number) => {
    sound.playSuccess();
    sound.playCoin();
    confetti({ particleCount: 45, spread: 65, origin: { y: 0.7 } });
    addCoins(100);
    setCompletedChapters(prev => {
      const next = prev.includes(chapterId) ? prev : [...prev, chapterId];
      localStorage.setItem('ada_pydsa_completed_chapters', JSON.stringify(next));
      return next;
    });
    if (chapterId < pythonDsaChapters.length - 1) {
      setSelectedChapterId(chapterId + 1);
    }
    setSequenceWarning(null);
  };

  const getPythonStarterCode = (prob: { id: number; title: string; problem: string; solutionCode: string }): string => {
    const firstLine = prob.solutionCode.trim().split('\n')[0];
    if (firstLine.startsWith('def ')) {
      return `# Problem #${prob.id}: ${prob.title}\n# ${prob.problem}\n\n${firstLine}\n    # Write your solution below\n    pass\n\n# Test call\nprint(${firstLine.replace('def ', '').split(':')[0]})\n`;
    }
    return `# Problem #${prob.id}: ${prob.title}\n# ${prob.problem}\n\n# Write your Python solution below:\n\n`;
  };

  const toggle80ProblemSolved = (probId: number) => {
    setCompleted80Problems(prev => {
      const exists = prev.includes(probId);
      const next = exists ? prev.filter(id => id !== probId) : [...prev, probId];
      localStorage.setItem('ada_pydsa_completed_80', JSON.stringify(next));
      if (!exists) {
        sound.playSuccess();
        sound.playCoin();
        addCoins(50);
        confetti({ particleCount: 30, spread: 55, origin: { y: 0.8 } });
        triggerBurst('🐍 PYTHON SOLVED!', `Brainstormer #${probId} Completed! +75 XP`, 'zap');
        addXP(75, `Solved Python DSA #${probId}`);
        unlockBadge('badge-code-run');

        if (next.length >= 10) unlockBadge('badge-dsa-10');
        if (next.length >= 25) unlockBadge('badge-dsa-25');
        if (next.length >= 80) unlockBadge('badge-dsa-80');
      } else {
        sound.playPop();
      }
      return next;
    });
    setSequenceWarning(null);
  };

  const handleQuizSelect = (qId: string, label: string, correct: string) => {
    if (quizAnswers[qId]) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: label }));
    if (label === correct) {
      sound.playSuccess();
      sound.playCoin();
      addCoins(25);
      confetti({ particleCount: 20, spread: 45, origin: { y: 0.75 } });
    } else {
      sound.playError();
    }
  };

  const handleBossSelect = (qId: string, label: string) => {
    if (bossSubmitted) return;
    setBossAnswers(prev => ({ ...prev, [qId]: label }));
    sound.playPop();
  };

  const bossScore = pythonDsaBossBattle.filter(q => bossAnswers[q.id] === q.correct).length;
  const filtered80Problems =
    selectedWorld === 'all'
      ? pythonDsa80Problems
      : pythonDsa80Problems.filter(p => p.world === selectedWorld);

  const worldsList: { id: PythonDsaWorldId | 'all'; name: string; range: string }[] = [
    { id: 'all', name: 'All 8 Worlds', range: '1 - 80' },
    { id: 'A', name: 'World A: Arrays & Strings', range: '1 - 10' },
    { id: 'B', name: 'World B: Hashing & Windows', range: '11 - 20' },
    { id: 'C', name: 'World C: Recursion & Backtrack', range: '21 - 30' },
    { id: 'D', name: 'World D: Searching & Sorting', range: '31 - 40' },
    { id: 'E', name: 'World E: Lists, Stacks, Queues', range: '41 - 50' },
    { id: 'F', name: 'World F: Trees & BST', range: '51 - 60' },
    { id: 'G', name: 'World G: Heaps & Graphs', range: '61 - 70' },
    { id: 'H', name: 'World H: DP & Greedy', range: '71 - 80' },
  ];

  const filteredGlossary = pythonDsaGlossary.filter(
    g =>
      g.term.toLowerCase().includes(glossaryQuery.toLowerCase()) ||
      g.meaning.toLowerCase().includes(glossaryQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6 font-comic">
      {/* Top Header Banner */}
      <div className="bg-[#101925] border-3 border-black rounded-3xl p-5 sm:p-7 shadow-comic relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#10B981]/15 via-[#FBBF24]/10 to-transparent pointer-events-none rounded-full blur-3xl" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase bg-[#10B981] text-black border border-black shadow-comic-sm">
                The Comic Guide • Vol. 1
              </span>
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono text-emerald-300 bg-[#082319] border border-[#10B981]/40">
                15 Chapters • 80 Brain-Busters • 20 Boss Riddles
              </span>
            </div>
            <h1 className="font-bangers text-3xl sm:text-5xl text-white tracking-wide drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              PYTHON + DSA: THE COMIC GUIDE
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Join <strong className="text-[#FBBF24]">Sid</strong> and{' '}
              <strong className="text-[#10B981]">Professor Py</strong> to defeat{' '}
              <strong className="text-[#F43F5E]">Buggy the Myth Monster</strong> through visual stories,
              diagrams, code labs, quizzes, and 80 classic interview brainstormers!
            </p>
          </div>

          {/* Gamified Hero Level & Coins Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#09111c] p-3.5 rounded-2xl border-2 border-[#1c2e42] shadow-comic-sm shrink-0">
            {/* Guide Avatars Trio */}
            <div className="flex items-center gap-3 pr-3 border-r border-[#19273a]">
              <div className="text-center">
                <SidAvatar size="sm" mood={heroLevel > 2 ? 'happy' : 'surprised'} />
                <span className="block text-[10px] font-bangers text-[#FBBF24] mt-1">Sid</span>
              </div>
              <div className="text-center">
                <ProfessorPyAvatar size="sm" mood="wise" />
                <span className="block text-[10px] font-bangers text-[#10B981] mt-1">Prof. Py</span>
              </div>
              <div className="text-center">
                <BuggyAvatar size="sm" mood="mischievous" />
                <span className="block text-[10px] font-bangers text-[#F43F5E] mt-1">Buggy</span>
              </div>
            </div>

            {/* Level & Stats */}
            <div className="space-y-1 text-left min-w-[130px]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bangers text-[#FBBF24] text-sm">LV. {heroLevel}</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">{totalXp} XP</span>
              </div>
              <div className="text-[10px] font-mono text-slate-300 font-bold truncate">
                {heroTitle}
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-[11px] font-mono font-bold text-amber-300 flex items-center gap-1 bg-amber-950/60 px-2 py-0.2 rounded border border-amber-500/30">
                  <Coins className="w-3 h-3 text-amber-400" /> {coins}
                </span>
                <span className="text-[10px] font-mono text-rose-400 font-bold flex items-center gap-0.5">
                  <Flame className="w-3 h-3 fill-current" /> Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Tabs Bar */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-[#1a2d42]">
          {[
            { id: 'chapters', label: '📖 15 Chapters', count: pythonDsaChapters.length },
            { id: 'brainstormers', label: '⚔️ 80 Classics', count: 80 },
            { id: 'playground', label: '🧪 DSA Playground', badge: 'Interactive' },
            { id: 'race', label: '🏁 Big-O Race Track', badge: 'Animated' },
            { id: 'blitz', label: '⚡ Speed Blitz', badge: '60s Rush' },
            { id: 'shop', label: '🛍️ Power Shop', badge: 'Holo Cards' },
            { id: 'mythsmasher', label: '🔨 Myth Smasher', badge: 'Arcade' },
            { id: 'boss', label: '👹 RPG Boss Arena', badge: 'Turn-Based' },
            { id: 'cheatsheets', label: '⚡ Cheat Sheets', badge: 'Cost Tables' },
            { id: 'glossary', label: '📚 Glossary', count: pythonDsaGlossary.length },
            { id: 'certificate', label: '🏆 Certificate', badge: 'Official' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSubTab(tab.id as any);
                setSequenceWarning(null);
                sound.playPop();
              }}
              className={`px-3 py-1.5 rounded-xl font-bangers text-xs transition flex items-center gap-2 cursor-pointer ${
                activeSubTab === tab.id
                  ? 'bg-[#10B981] text-black shadow-comic-sm font-bold scale-105'
                  : 'bg-[#09111d] text-slate-400 hover:text-white hover:bg-[#111e30]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    activeSubTab === tab.id ? 'bg-black text-[#10B981]' : 'bg-[#152336] text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              )}
              {tab.badge && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#FBBF24] text-black">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sequential Warning Alert Banner */}
      {sequenceWarning && (
        <div className="bg-rose-950/85 border-2 border-rose-500 p-4 rounded-2xl flex items-center justify-between gap-3 text-rose-200 text-xs sm:text-sm font-bold shadow-comic animate-shake">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{sequenceWarning}</span>
          </div>
          <button
            onClick={() => setSequenceWarning(null)}
            className="text-rose-400 hover:text-white text-xs underline font-mono shrink-0 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 1. CHAPTERS & COMICS VIEW */}
      {activeSubTab === 'chapters' && (
        <div className="space-y-6">
          {/* View Mode Switcher: Overworld Map vs Detailed Reader */}
          <div className="flex items-center justify-between bg-[#0b1320] p-3 rounded-2xl border-2 border-black shadow-comic">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setChapterViewMode('map');
                  sound.playPop();
                }}
                className={`px-4 py-2 rounded-xl font-bangers text-xs transition flex items-center gap-2 cursor-pointer ${
                  chapterViewMode === 'map'
                    ? 'bg-[#10B981] text-black shadow-comic-sm scale-102 font-bold'
                    : 'bg-[#070e17] text-slate-400 hover:text-white'
                }`}
              >
                <Map className="w-4 h-4" />
                <span>🗺️ SAGA OVERWORLD MAP</span>
              </button>
              <button
                onClick={() => {
                  setChapterViewMode('reader');
                  sound.playPop();
                }}
                className={`px-4 py-2 rounded-xl font-bangers text-xs transition flex items-center gap-2 cursor-pointer ${
                  chapterViewMode === 'reader'
                    ? 'bg-[#10B981] text-black shadow-comic-sm scale-102 font-bold'
                    : 'bg-[#070e17] text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>📖 CHAPTER {selectedChapterId} COMIC READER</span>
              </button>
            </div>

            <span className="hidden sm:inline text-xs font-mono text-[#FBBF24]">
              Station {selectedChapterId}: {currentChapter.title}
            </span>
          </div>

          {chapterViewMode === 'map' ? (
            <SagaWorldMap
              selectedChapterId={selectedChapterId}
              completedChapters={completedChapters}
              onSelectChapter={id => {
                setSelectedChapterId(id);
                setChapterViewMode('reader');
              }}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Chapter Selector Rail (4 cols) */}
              <div className="lg:col-span-4 space-y-3">
                <div className="bg-[#0b1320] p-4 rounded-2xl border-2 border-[#19293e] shadow-comic-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bangers text-base text-white">CHAPTERS MISSION MAP</h3>
                    <span className="text-xs font-mono text-[#10B981] font-bold">
                      {selectedChapterId} / {pythonDsaChapters.length - 1}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Master the 7-step comic loop chapter by chapter. Each chapter unlocks as you complete the previous!
                  </p>

                  {/* Chapter Buttons List */}
                  <div className="space-y-1.5 max-h-[620px] overflow-y-auto pr-1">
                    {pythonDsaChapters.map(chap => {
                      const isSelected = chap.id === selectedChapterId;
                      const isUnlocked = chap.id <= 1 || completedChapters.includes(chap.id - 1);
                      const isDone = completedChapters.includes(chap.id);

                      return (
                        <button
                          key={chap.id}
                          onClick={() => {
                            if (!isUnlocked) {
                              sound.playError();
                              setSequenceWarning(
                                `🔒 Chapter ${chap.id} is locked! Complete Chapter ${chap.id - 1} first to advance.`
                              );
                              return;
                            }
                            sound.playPop();
                            setSelectedChapterId(chap.id);
                            setSequenceWarning(null);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs font-mono transition border flex items-center justify-between cursor-pointer ${
                            !isUnlocked
                              ? 'bg-[#060c14] border-[#101b2a] text-slate-600 opacity-60'
                              : isSelected
                              ? 'bg-[#122336] border-[#10B981] text-white shadow-comic-sm font-bold'
                              : 'bg-[#09111c] border-[#17273d] text-slate-400 hover:text-white hover:bg-[#101e30]'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span
                              className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                !isUnlocked
                                  ? 'bg-[#101a28] text-slate-600'
                                  : isDone
                                  ? 'bg-[#10B981] text-black font-extrabold'
                                  : isSelected
                                  ? 'bg-[#FBBF24] text-black font-extrabold'
                                  : 'bg-[#16253a] text-slate-400'
                              }`}
                            >
                              {!isUnlocked ? <Lock className="w-3 h-3 text-slate-500" /> : isDone ? '✓' : chap.id}
                            </span>
                            <span className="truncate">{chap.title}</span>
                          </div>
                          {!isUnlocked ? (
                            <span className="text-[10px] text-slate-600 font-bold flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" /> Locked
                            </span>
                          ) : (
                            <ChevronRight
                              className={`w-3.5 h-3.5 ${isSelected ? 'text-[#10B981]' : 'text-slate-600'}`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Chapter Content Stage (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                {/* Chapter Header */}
                <div className="bg-[#0b1320] p-5 sm:p-6 rounded-2xl border-2 border-black shadow-comic space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#10B981] text-black font-bangers text-xs border border-black shadow-comic-sm">
                      {currentChapter.numberLabel}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={selectedChapterId <= 0}
                        onClick={() => {
                          setSelectedChapterId(c => Math.max(0, c - 1));
                          sound.playPop();
                        }}
                        className="p-1.5 rounded-lg bg-[#152336] hover:bg-[#1f334d] text-slate-300 disabled:opacity-40 cursor-pointer"
                        title="Previous Chapter"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        disabled={
                          selectedChapterId >= pythonDsaChapters.length - 1 ||
                          !completedChapters.includes(selectedChapterId)
                        }
                        onClick={() => {
                          if (!completedChapters.includes(selectedChapterId)) {
                            sound.playError();
                            setSequenceWarning(
                              `🔒 Complete Chapter ${selectedChapterId} first to unlock Chapter ${selectedChapterId + 1}!`
                            );
                            return;
                          }
                          setSelectedChapterId(c => Math.min(pythonDsaChapters.length - 1, c + 1));
                          sound.playPop();
                        }}
                        className="p-1.5 rounded-lg bg-[#152336] hover:bg-[#1f334d] text-slate-300 disabled:opacity-40 cursor-pointer"
                        title={
                          !completedChapters.includes(selectedChapterId)
                            ? 'Complete current chapter to advance'
                            : 'Next Chapter'
                        }
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h2 className="font-bangers text-2xl sm:text-3xl text-white tracking-wide">
                    {currentChapter.title}
                  </h2>
                  <p className="text-xs text-[#10B981] font-mono">{currentChapter.subtitle}</p>

                  {/* Comic Storyboard Dialogue Panels */}
                  <div className="space-y-3 pt-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Comic Storyboard
                    </span>
                    <div className="space-y-2.5">
                      {currentChapter.comicHook.map((line, idx) => (
                        <ComicBubble
                          key={idx}
                          speaker={line.speaker}
                          text={line.text}
                          subtext={line.subtext}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Theory Sections */}
                {currentChapter.sections.map((sec, sIdx) => (
                  <div
                    key={sIdx}
                    className="bg-[#0b1320] p-5 sm:p-6 rounded-2xl border-2 border-black shadow-comic space-y-4"
                  >
                    <h3 className="font-bangers text-xl text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-[#FBBF24] text-black text-xs flex items-center justify-center font-bold">
                        {sIdx + 1}
                      </span>
                      {sec.heading}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">{sec.theory}</p>

                    {sec.bulletPoints && (
                      <ul className="space-y-2 pt-1">
                        {sec.bulletPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 text-xs font-mono text-slate-300">
                            <span className="text-[#10B981] font-bold">▸</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {sec.codeSnippet && (
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold text-[#FBBF24]">Python Code Lab</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                sound.playPop();
                                setActiveCodeVisualizer(prev =>
                                  prev?.code === sec.codeSnippet!.code
                                    ? null
                                    : {
                                        code: sec.codeSnippet!.code,
                                        output: sec.codeSnippet!.output,
                                        title: `${sec.heading} — Execution Trace`,
                                      }
                                );
                              }}
                              className={`text-[10px] font-mono px-2.5 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer border transition ${
                                activeCodeVisualizer?.code === sec.codeSnippet!.code
                                  ? 'bg-[#10B981] text-black border-black font-bold shadow-comic-sm'
                                  : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900'
                              }`}
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>
                                {activeCodeVisualizer?.code === sec.codeSnippet!.code
                                  ? 'Hide Visualizer'
                                  : '▶ Trace & Animate'}
                              </span>
                            </button>
                            <button
                              onClick={() => handleCopy(sec.codeSnippet!.code, `code-${selectedChapterId}-${sIdx}`)}
                              className="btn-comic-push text-[10px] font-mono px-2 py-1 rounded bg-[#17273c] hover:bg-[#203652] text-slate-300 flex items-center gap-1 cursor-pointer"
                            >
                              {copiedKey === `code-${selectedChapterId}-${sIdx}` ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" /> Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" /> Copy
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Interactive Code Stepper Drawer */}
                        {activeCodeVisualizer?.code === sec.codeSnippet.code && (
                          <div className="pt-2">
                            <CodeStepVisualizer
                              code={activeCodeVisualizer.code}
                              output={activeCodeVisualizer.output}
                              title={activeCodeVisualizer.title}
                              onClose={() => setActiveCodeVisualizer(null)}
                            />
                          </div>
                        )}

                        <pre className="p-3.5 bg-[#060b13] rounded-xl border border-[#1b2b40] font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                          <code>{sec.codeSnippet.code}</code>
                        </pre>

                        {sec.codeSnippet.output && (
                          <div className="p-3 bg-[#06121c] rounded-xl border border-[#0d2a3d] text-xs font-mono">
                            <span className="text-[#38BDF8] font-bold block mb-1">Terminal Output:</span>
                            <pre className="text-slate-300 whitespace-pre-wrap">{sec.codeSnippet.output}</pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

            {/* Myth Busters Clinic for Chapter */}
            {currentChapter.mythBusters.length > 0 && (
              <div className="bg-[#0b1320] p-5 rounded-2xl border-2 border-black shadow-comic space-y-4">
                <h3 className="font-bangers text-lg text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#F43F5E]" />
                  BUGGY'S MYTH BUSTERS
                </h3>
                <div className="space-y-3">
                  {currentChapter.mythBusters.map(mb => (
                    <div
                      key={mb.id}
                      className="p-3.5 rounded-xl bg-[#070e17] border border-[#19283d] space-y-1.5"
                    >
                      <div className="flex items-center gap-2 text-rose-400 text-xs font-bold font-mono">
                        <XCircle className="w-4 h-4 shrink-0" />
                        <span>MYTH: "{mb.myth}"</span>
                      </div>
                      <div className="flex items-start gap-2 text-emerald-300 text-xs font-mono pl-6">
                        <span>TRUTH: {mb.truth}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Quizzes & Fix-It */}
            {currentChapter.quizzes.length > 0 && (
              <div className="bg-[#0b1320] p-5 rounded-2xl border-2 border-black shadow-comic space-y-4">
                <h3 className="font-bangers text-lg text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FBBF24]" />
                  QUICK QUIZ & FIX-IT QUESTIONS
                </h3>
                <div className="space-y-4">
                  {currentChapter.quizzes.map(q => {
                    const chosen = quizAnswers[q.id];
                    const isCorrect = chosen === q.correct;
                    return (
                      <div
                        key={q.id}
                        className="p-4 rounded-xl bg-[#060b13] border border-[#19273c] space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[#FBBF24]">{q.id}</span>
                          {chosen && (
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                isCorrect ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                              }`}
                            >
                              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-white font-sans">{q.question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map(opt => {
                            const isSelected = chosen === opt.label;
                            const isThisCorrect = opt.label === q.correct;
                            return (
                              <button
                                key={opt.label}
                                onClick={() => handleQuizSelect(q.id, opt.label, q.correct)}
                                className={`p-2.5 rounded-lg border text-xs font-mono text-left transition cursor-pointer flex items-center gap-2 ${
                                  chosen
                                    ? isThisCorrect
                                      ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                      : isSelected
                                      ? 'bg-rose-950 border-rose-500 text-rose-200'
                                      : 'bg-[#0a121e] border-[#152336] text-slate-500 opacity-60'
                                    : 'bg-[#09111c] border-[#16253a] text-slate-300 hover:text-white hover:bg-[#121f30]'
                                }`}
                              >
                                <span className="w-4 h-4 rounded bg-[#152336] flex items-center justify-center font-bold text-[10px] shrink-0">
                                  {opt.label}
                                </span>
                                <span>{opt.text}</span>
                              </button>
                            );
                          })}
                        </div>
                        {chosen && (
                          <div className="p-2.5 rounded-lg bg-[#0a1624] text-[11px] font-mono text-slate-300 border border-[#1a2f48]">
                            <strong className="text-[#38BDF8]">Reason:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Fix-it Question */}
                  {currentChapter.fixItQuestion && (
                    <div className="p-4 rounded-xl bg-[#141208] border border-amber-500/40 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#FBBF24] text-black font-bangers text-[10px]">
                          FIX-IT QUESTION (CLEARS #1 CONFUSION)
                        </span>
                        <span className="text-xs font-mono text-amber-300">
                          {currentChapter.fixItQuestion.id}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-amber-100 font-sans">
                        {currentChapter.fixItQuestion.question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentChapter.fixItQuestion.options.map(opt => {
                          const chosen = quizAnswers[currentChapter.fixItQuestion!.id];
                          const isSelected = chosen === opt.label;
                          const isThisCorrect = opt.label === currentChapter.fixItQuestion!.correct;

                          return (
                            <button
                              key={opt.label}
                              onClick={() =>
                                handleQuizSelect(
                                  currentChapter.fixItQuestion!.id,
                                  opt.label,
                                  currentChapter.fixItQuestion!.correct
                                )
                              }
                              className={`p-2.5 rounded-lg border text-xs font-mono text-left transition cursor-pointer flex items-center gap-2 ${
                                chosen
                                  ? isThisCorrect
                                    ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                    : isSelected
                                    ? 'bg-rose-950 border-rose-500 text-rose-200'
                                    : 'bg-[#0a121e] border-[#152336] text-slate-500 opacity-60'
                                  : 'bg-[#1e1b10] border-[#383017] text-amber-200 hover:text-white'
                              }`}
                            >
                              <span className="w-4 h-4 rounded bg-black/40 flex items-center justify-center font-bold text-[10px] shrink-0">
                                {opt.label}
                              </span>
                              <span>{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Brain Blasts */}
            {currentChapter.brainBlasts.length > 0 && (
              <div className="bg-[#0b1320] p-5 rounded-2xl border-2 border-black shadow-comic space-y-4">
                <h3 className="font-bangers text-lg text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#38BDF8]" />
                  BRAIN BLAST WORD PROBLEMS
                </h3>
                <div className="space-y-4">
                  {currentChapter.brainBlasts.map(bb => (
                    <div
                      key={bb.id}
                      className="p-4 rounded-xl bg-[#060b13] border border-[#19273c] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#38BDF8]">
                          {bb.id} • {bb.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Word Problem</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 font-sans">{bb.problem}</p>
                      <div className="p-2.5 rounded-lg bg-[#09121d] text-xs font-mono text-cyan-200 border border-[#142336]">
                        💡 <strong>Hint:</strong> {bb.hint}
                      </div>
                      {bb.solutionCode && (
                        <div className="pt-2">
                          <pre className="p-3 bg-[#04080e] rounded-lg border border-[#142133] font-mono text-xs text-emerald-300 overflow-x-auto">
                            <code>{bb.solutionCode}</code>
                          </pre>
                        </div>
                      )}
                      <p className="text-xs font-mono text-slate-400">{bb.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sequential Chapter Completion Footer */}
            <div className="bg-[#0d1726] border-2 border-black rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-comic">
              <div className="flex items-center gap-3">
                {completedChapters.includes(currentChapter.id) ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
                ) : (
                  <Sparkles className="w-7 h-7 text-[#10B981] shrink-0" />
                )}
                <div>
                  <h4 className="font-bangers text-lg text-white">
                    {completedChapters.includes(currentChapter.id)
                      ? `Chapter ${currentChapter.id} Completed!`
                      : `Master Chapter ${currentChapter.id} & Advance`}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {completedChapters.includes(currentChapter.id)
                      ? currentChapter.id < pythonDsaChapters.length - 1
                        ? `Next in sequence: Chapter ${currentChapter.id + 1} is now accessible.`
                        : `Congratulations! You conquered all chapters of Python + DSA!`
                      : `Click below to mark complete and unlock Chapter ${Math.min(
                          pythonDsaChapters.length - 1,
                          currentChapter.id + 1
                        )}.`}
                  </p>
                </div>
              </div>

              <button
                onClick={() => markChapterCompleted(currentChapter.id)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-black font-bangers text-xs border-2 border-black shadow-comic-sm transition active:translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                {completedChapters.includes(currentChapter.id) ? (
                  currentChapter.id < pythonDsaChapters.length - 1 ? (
                    <>
                      Go To Chapter {currentChapter.id + 1} <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>All Chapters Mastered! 🏆</>
                  )
                ) : (
                  <>
                    Complete & Unlock Chapter{' '}
                    {Math.min(pythonDsaChapters.length - 1, currentChapter.id + 1)}{' '}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )}

      {/* 2. 80 CLASSICAL BRAINSTORMERS (8 WORLDS) */}
      {activeSubTab === 'brainstormers' && (
        <div className="space-y-6">
          <div className="bg-[#0b1320] p-6 rounded-2xl border-2 border-black shadow-comic space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bangers text-2xl text-white">80 CLASSICAL BRAINSTORMERS (8 WORLDS)</h3>
                <p className="text-xs text-slate-400">
                  Strict sequential progression: Solve Problem #1 to unlock #2. Think first, write on paper,
                  then open the Solution Vault!
                </p>
              </div>

              {/* Progress & World Select */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-500/30 font-bold">
                  Solved: {completed80Problems.length} / 80
                </span>
                <select
                  value={selectedWorld}
                  onChange={e => setSelectedWorld(e.target.value as any)}
                  className="bg-[#121f31] border border-[#1e3452] rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none"
                >
                  {worldsList.map(w => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({w.range})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Problem Cards List */}
            <div className="space-y-3 pt-2">
              {filtered80Problems.map(prob => {
                const isRevealed = !!revealedProblemIds[prob.id];
                const isUnlocked = prob.id === 1 || completed80Problems.includes(prob.id - 1);
                const isSolved = completed80Problems.includes(prob.id);

                return (
                  <div
                    key={prob.id}
                    className={`p-4 rounded-xl border space-y-3 transition ${
                      !isUnlocked
                        ? 'bg-[#050a11] border-[#101b2a] opacity-65'
                        : isSolved
                        ? 'bg-[#07131e] border-emerald-500/50'
                        : 'bg-[#070e17] border-[#18273c]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          disabled={!isUnlocked}
                          onClick={() => isUnlocked && toggle80ProblemSolved(prob.id)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono border transition ${
                            !isUnlocked
                              ? 'bg-[#0e1724] border-slate-800 text-slate-600 cursor-not-allowed'
                              : isSolved
                              ? 'bg-[#10B981] border-emerald-400 text-black shadow-comic-sm cursor-pointer'
                              : 'bg-[#121f30] border-[#223755] text-[#FBBF24] hover:border-amber-400 cursor-pointer'
                          }`}
                          title={
                            !isUnlocked
                              ? 'Locked'
                              : isSolved
                              ? 'Solved! Click to unmark'
                              : 'Click to mark solved'
                          }
                        >
                          {!isUnlocked ? (
                            <Lock className="w-3.5 h-3.5" />
                          ) : isSolved ? (
                            <Check className="w-4 h-4 stroke-[3]" />
                          ) : (
                            `#${prob.id}`
                          )}
                        </button>
                        <span className="text-[10px] font-mono text-slate-400 truncate max-w-xs">
                          {prob.worldName}
                        </span>
                        {isSolved && (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            SOLVED
                          </span>
                        )}
                        {!isUnlocked && (
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800 flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> Solve #{prob.id - 1} to unlock
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-amber-400">
                        {'★'.repeat(prob.difficultyStars)}
                        <span className="text-slate-600">{'★'.repeat(3 - prob.difficultyStars)}</span>
                      </span>
                    </div>

                    <div>
                      <h4 className={`text-sm font-bold ${!isUnlocked ? 'text-slate-400' : 'text-white'}`}>
                        #{prob.id} {prob.title}
                      </h4>
                      <p className={`text-xs mt-1 leading-relaxed ${!isUnlocked ? 'text-slate-500' : 'text-slate-300'}`}>
                        {prob.problem}
                      </p>
                      {prob.example && (
                        <p className="text-[11px] font-mono text-amber-300 mt-1">
                          Example: {prob.example}
                        </p>
                      )}
                    </div>

                    {isUnlocked ? (
                      <div className="space-y-2">
                        <div className="p-2.5 bg-[#09121d] rounded-lg border border-[#16273e] text-xs font-mono text-cyan-200">
                          💡 <strong>Hint:</strong> {prob.hint}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <button
                            onClick={() => {
                              sound.playPop();
                              setActiveCoding80Id(prev => (prev === prob.id ? null : prob.id));
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer border shadow-comic-sm transition ${
                              activeCoding80Id === prob.id
                                ? 'bg-amber-400 text-slate-950 border-amber-300'
                                : 'bg-[#152336] text-amber-300 border-amber-500/40 hover:bg-[#1f334d]'
                            }`}
                          >
                            <Code2 className="w-3.5 h-3.5" />
                            <span>{activeCoding80Id === prob.id ? 'Close Python IDE' : '💻 Code in Python VS Code'}</span>
                          </button>

                          <button
                            onClick={() => {
                              sound.playPop();
                              setRevealedProblemIds(prev => ({ ...prev, [prob.id]: !prev[prob.id] }));
                              if (!isSolved) {
                                toggle80ProblemSolved(prob.id);
                              }
                            }}
                            className="text-xs font-mono font-bold text-[#10B981] hover:underline cursor-pointer"
                          >
                            {isRevealed ? '▲ Hide Solution' : '▼ Reveal Solution & Unlock Next'}
                          </button>
                        </div>

                        {activeCoding80Id === prob.id && (
                          <div className="pt-3 animate-fadeIn">
                            <UniversalVSCodeEditor
                              language="python"
                              starterCode={getPythonStarterCode(prob)}
                              solutionCode={prob.solutionCode}
                              problemTitle={`#${prob.id} ${prob.title}`}
                              problemId={`pydsa-80-${prob.id}`}
                              fileName={`solution_${prob.id}.py`}
                              expectedOutputSubstring={prob.output.trim().split('\n')[0]}
                              onSolve={() => {
                                if (!isSolved) {
                                  toggle80ProblemSolved(prob.id);
                                }
                              }}
                              nextProblemTitle={
                                prob.id < pythonDsa80Problems.length
                                  ? `#${prob.id + 1} ${pythonDsa80Problems[prob.id]?.title || ''}`
                                  : undefined
                              }
                              onGoNext={
                                prob.id < pythonDsa80Problems.length
                                  ? () => setActiveCoding80Id(prob.id + 1)
                                  : undefined
                              }
                            />
                          </div>
                        )}

                        {isRevealed && (
                          <div className="p-3.5 bg-[#04080e] rounded-xl border border-[#16253a] space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-300">
                              <div>
                                <strong className="text-[#FBBF24]">Core Idea:</strong> {prob.idea}
                              </div>
                              <button
                                onClick={() => {
                                  sound.playPop();
                                  setActiveCodeVisualizer(prev =>
                                    prev?.code === prob.solutionCode
                                      ? null
                                      : {
                                          code: prob.solutionCode,
                                          output: prob.output,
                                          title: `#${prob.id} ${prob.title} — Visual Execution Trace`,
                                        }
                                  );
                                }}
                                className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900 flex items-center gap-1.5 cursor-pointer shrink-0"
                              >
                                <Play className="w-3 h-3 fill-current" />
                                <span>
                                  {activeCodeVisualizer?.code === prob.solutionCode
                                    ? 'Hide Trace'
                                    : '▶ Trace Solution'}
                                </span>
                              </button>
                            </div>

                            {activeCodeVisualizer?.code === prob.solutionCode && (
                              <div className="pt-2">
                                <CodeStepVisualizer
                                  code={activeCodeVisualizer.code}
                                  output={activeCodeVisualizer.output}
                                  title={activeCodeVisualizer.title}
                                  onClose={() => setActiveCodeVisualizer(null)}
                                />
                              </div>
                            )}

                            <pre className="p-3 bg-[#020508] rounded-lg border border-[#0d1724] font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                              <code>{prob.solutionCode}</code>
                            </pre>
                            <div className="text-[11px] font-mono text-slate-400">
                              <strong>Output:</strong> {prob.output}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-slate-600" />
                        Locked in sequence: Solve Problem #{prob.id - 1} first to unlock.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. VISUAL DSA PLAYGROUND */}
      {activeSubTab === 'playground' && <VisualDsaPlayground />}

      {/* 4. BIG-O BENCHMARK RACE TRACK */}
      {activeSubTab === 'race' && <BigORaceTrack />}

      {/* 5. 60-SECOND SPEED BLITZ */}
      {activeSubTab === 'blitz' && (
        <SpeedBlitzArena onRewardCoins={amt => addCoins(amt)} />
      )}

      {/* 6. HOLOGRAPHIC POWER CARD SHOP & ARSENAL */}
      {activeSubTab === 'shop' && (
        <PowerCardShop
          coins={coins}
          onSpendCoins={spendCoins}
          onAddXp={amt => {
            sound.playPowerUp();
            confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
          }}
        />
      )}

      {/* 7. CHEAT SHEETS & ONE-LINERS */}
      {activeSubTab === 'cheatsheets' && (
        <div className="space-y-6">
          {/* Data Structure Cost Table */}
          <div className="bg-[#0b1320] p-6 rounded-2xl border-2 border-black shadow-comic space-y-4">
            <h3 className="font-bangers text-xl text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#10B981]" />
              16.1 DATA STRUCTURE COST TABLE
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-[#1b2b40] text-white bg-[#0e1828]">
                    <th className="p-2.5">Structure</th>
                    <th className="p-2.5">Access</th>
                    <th className="p-2.5">Search</th>
                    <th className="p-2.5">Insert</th>
                    <th className="p-2.5">Delete</th>
                    <th className="p-2.5">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {pythonDsaCheatSheets.dataStructureCostTable.map((row, idx) => (
                    <tr key={idx} className="border-b border-[#132032] hover:bg-[#0e1929]">
                      <td className="p-2.5 font-bold text-white">{row.structure}</td>
                      <td className="p-2.5 text-emerald-300">{row.access}</td>
                      <td className="p-2.5 text-amber-300">{row.search}</td>
                      <td className="p-2.5 text-cyan-300">{row.insert}</td>
                      <td className="p-2.5 text-rose-300">{row.delete}</td>
                      <td className="p-2.5 text-slate-400">{row.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pattern Spotter */}
          <div className="bg-[#0b1320] p-6 rounded-2xl border-2 border-black shadow-comic space-y-4">
            <h3 className="font-bangers text-xl text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FBBF24]" />
              16.4 PATTERN SPOTTER: "IF YOU SEE... THINK..."
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pythonDsaCheatSheets.patternSpotter.map((ps, idx) => (
                <div key={idx} className="p-3 bg-[#070e17] rounded-xl border border-[#16273d] text-xs font-mono">
                  <span className="text-[#FBBF24] font-bold block mb-1">Clue: {ps.clue}</span>
                  <span className="text-emerald-300 font-bold">→ Think: {ps.think}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bug Survival Guide */}
          <div className="bg-[#0b1320] p-6 rounded-2xl border-2 border-black shadow-comic space-y-4">
            <h3 className="font-bangers text-xl text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#F43F5E]" />
              16.5 BUG SURVIVAL GUIDE
            </h3>
            <div className="space-y-2.5">
              {pythonDsaCheatSheets.bugSurvivalGuide.map((bs, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#070e17] rounded-xl border border-[#16273d] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
                >
                  <div className="space-y-0.5">
                    <span className="text-rose-400 font-bold">{bs.symptom}:</span>{' '}
                    <span className="text-slate-300">{bs.cause}</span>
                  </div>
                  <span className="text-emerald-300 font-bold bg-[#092218] px-2.5 py-1 rounded-lg border border-emerald-500/30 shrink-0">
                    Fix: {bs.fix}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Handy One-Liners Copy-Paste Kit */}
          <div className="bg-[#0b1320] p-6 rounded-2xl border-2 border-black shadow-comic space-y-4">
            <h3 className="font-bangers text-xl text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#38BDF8]" />
              16.6 HANDY PYTHON ONE-LINERS (COPY-PASTE KIT)
            </h3>
            <div className="space-y-3">
              {pythonDsaCheatSheets.handyOneLiners.map((hol, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#060b13] rounded-xl border border-[#17273c] space-y-1.5 font-mono"
                >
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-bold text-white">{hol.title}</span>
                    <button
                      onClick={() => handleCopy(hol.code, `hol-${idx}`)}
                      className="btn-comic-push text-[10px] px-2 py-0.5 rounded bg-[#132133] hover:bg-[#1a2d45] text-slate-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === `hol-${idx}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-2 bg-[#020508] rounded-lg text-emerald-300 text-xs overflow-x-auto">
                    <code>{hol.code}</code>
                  </pre>
                  <p className="text-[11px] text-slate-400"># {hol.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. BUGGY'S MYTH SMASHER ARCADE */}
      {activeSubTab === 'mythsmasher' && <MythSmasherArcade />}

      {/* 5. TURN-BASED RPG BOSS BATTLE ARENA */}
      {activeSubTab === 'boss' && (
        <BossBattleArena
          onDefeated={() => {
            sound.playFanfare();
            addCoins(500);
          }}
        />
      )}

      {/* 5. GLOSSARY & TRACKER */}
      {activeSubTab === 'glossary' && (
        <div className="bg-[#0b1320] p-6 rounded-2xl border-2 border-black shadow-comic space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bangers text-2xl text-white">CHAPTER 18: GLOSSARY & PROGRESS TRACKER</h3>
              <p className="text-xs text-slate-400">
                Essential algorithmic terminology with quick definitions and live progress checklist.
              </p>
            </div>
            <div className="w-full sm:w-64">
              <input
                type="text"
                value={glossaryQuery}
                onChange={e => setGlossaryQuery(e.target.value)}
                placeholder="Search glossary terms..."
                className="w-full p-2 bg-[#060b13] border border-[#19273c] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#10B981]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-[#070e17] rounded-xl border border-[#16273d] space-y-1 hover:border-[#10B981]/50 transition"
              >
                <h4 className="text-xs font-bold text-[#10B981] font-mono">{item.term}</h4>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">{item.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. HERO CERTIFICATE */}
      {activeSubTab === 'certificate' && (
        <div className="bg-[#0b1320] p-6 rounded-2xl border-2 border-black shadow-comic space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bangers text-2xl text-white">CERTIFICATE OF AWESOMENESS</h3>
              <p className="text-xs text-slate-400">Personalize and print your official comic completion diploma.</p>
            </div>
            <button
              onClick={() => {
                sound.playPop();
                window.print();
              }}
              className="px-4 py-2 rounded-xl bg-[#FBBF24] hover:bg-[#f59e0b] text-black font-bangers text-xs border border-black shadow-comic-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
          </div>

          <div className="max-w-xs space-y-1">
            <label className="text-xs font-mono text-slate-400">Enter Your Name:</label>
            <input
              type="text"
              value={heroName}
              onChange={e => setHeroName(e.target.value)}
              className="w-full p-2 bg-[#060b13] border border-[#19273c] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#10B981]"
            />
          </div>

          {/* Certificate Frame */}
          <div className="bg-[#FFFBEB] text-[#1E293B] p-8 sm:p-12 rounded-3xl border-8 border-[#F59E0B] shadow-comic-lg text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-3 left-3 w-8 h-8 rounded-full border-4 border-[#F59E0B] flex items-center justify-center font-bold text-xs">
              ★
            </div>
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full border-4 border-[#F59E0B] flex items-center justify-center font-bold text-xs">
              ★
            </div>

            <div className="inline-block px-4 py-1 rounded-full bg-[#EF4444] text-white font-bangers text-xs border-2 border-black tracking-widest shadow-comic-sm uppercase">
              Hero Graduate
            </div>

            <h2 className="font-bangers text-4xl sm:text-6xl text-[#1E293B] tracking-wide drop-shadow-sm">
              CERTIFICATE OF AWESOMENESS
            </h2>

            <p className="text-sm font-mono text-slate-600">This certifies that</p>

            <div className="text-2xl sm:text-4xl font-extrabold text-[#D97706] underline decoration-wavy decoration-[#F59E0B] py-2">
              {heroName || 'Sid the Algorithmic Hero'}
            </div>

            <p className="text-sm sm:text-base font-semibold max-w-2xl mx-auto leading-relaxed">
              has successfully completed <strong>Python + DSA: The Comic Guide</strong>,
              vanquished <strong>Buggy the Myth Monster</strong> across 14 chapters, conquered the{' '}
              <strong>Boss Battle</strong>, and solved all <strong>80 Classical Brainstormers</strong>!
            </p>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-around gap-6 border-t-2 border-[#FDE68A]">
              <div className="flex items-center gap-3">
                <ProfessorPyAvatar size="sm" mood="wise" />
                <div className="text-left font-mono text-xs">
                  <span className="block font-bold text-slate-900">Signed: Professor Py</span>
                  <span className="text-slate-500 text-[10px]">(and your future coding self)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <SidAvatar size="sm" mood="happy" />
                <div className="text-left font-mono text-xs">
                  <span className="block font-bold text-slate-900">Co-signed: Sid</span>
                  <span className="text-slate-500 text-[10px]">Algorithm Grandmaster</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
