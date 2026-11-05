import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourse } from '../../context/CourseContext';
import {
  PriAvatar,
  NovaAvatar,
  BugAvatar,
  ComicBubble,
} from '../characters/Characters';
import {
  prismaQuestLevels,
  prismaBossChallenges,
  prismaQuickFireQuestions,
  prismaWordSearchGrid,
  prismaHiddenWords,
  prismaMatchPairs,
  prismaFlashcards,
  prismaPosters,
  prismaGlossary,
} from '../../data/prismaData';
import { PrismaTopic } from '../../types/prismaTypes';
import {
  Sparkles,
  BookOpen,
  Code2,
  Terminal,
  Trophy,
  Layers,
  FileSpreadsheet,
  Award,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Search,
  Printer,
  ChevronRight,
  ChevronLeft,
  Flame,
  Shield,
  HelpCircle,
  Copy,
  Check,
  Eye,
  EyeOff,
  Lock,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UniversalVSCodeEditor } from '../common/UniversalVSCodeEditor';

export const PrismaHub: React.FC = () => {
  const {
    prismaCompletedTopics,
    togglePrismaTopicComplete,
    prismaXP,
    addPrismaXP,
    soundEnabled,
    triggerBurst,
    unlockBadge,
  } = useCourse();

  // Sub-tabs
  const [subTab, setSubTab] = useState<
    'quest' | 'playground' | 'boss' | 'puzzles' | 'flashcards' | 'posters' | 'certificate'
  >('quest');

  // Quest Map State
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [selectedTopic, setSelectedTopic] = useState<PrismaTopic>(() => prismaQuestLevels[0].topics[0]);
  const [openCodingQuest, setOpenCodingQuest] = useState<boolean>(false);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [revealedFactChecks, setRevealedFactChecks] = useState<Record<string, boolean>>({});
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Quick-Fire True/False State
  const [quickFireUserAnswers, setQuickFireUserAnswers] = useState<Record<string, boolean>>({});

  // Boss Battle State
  const [defeatedBosses, setDefeatedBosses] = useState<number[]>([]);
  const [revealedBossCode, setRevealedBossCode] = useState<Record<number, boolean>>({});

  // Puzzle: Word Search State
  const [selectedCells, setSelectedCells] = useState<{ r: number; c: number }[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [wordSearchSuccessMsg, setWordSearchSuccessMsg] = useState<string>('');

  // Puzzle: Match Pairs State
  const [selectedMatches, setSelectedMatches] = useState<Record<number, string>>({});
  const [matchScore, setMatchScore] = useState<number | null>(null);

  // Flashcards State
  const [flashcardIdx, setFlashcardIdx] = useState<number>(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState<boolean>(false);
  const [masteredCards, setMasteredCards] = useState<string[]>([]);

  // Playground State
  const [selectedQueryType, setSelectedQueryType] = useState<string>('findManyUsers');
  const [queryOutput, setQueryOutput] = useState<any>(null);
  const [simulatedSql, setSimulatedSql] = useState<string>('');
  const [queryRunning, setQueryRunning] = useState<boolean>(false);

  // Helper copy function
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Current Level Topics
  const currentLevelData = useMemo(() => {
    return prismaQuestLevels.find(l => l.level === selectedLevel) || prismaQuestLevels[0];
  }, [selectedLevel]);

  // Total topics count
  const allTopicsCount = useMemo(() => {
    return prismaQuestLevels.reduce((acc, lvl) => acc + lvl.topics.length, 0);
  }, []);

  // Quick-Fire Score
  const quickFireScore = useMemo(() => {
    let score = 0;
    prismaQuickFireQuestions.forEach(q => {
      if (quickFireUserAnswers[q.id] === q.isTrue) score++;
    });
    return score;
  }, [quickFireUserAnswers]);

  // Confetti on Certificate tab
  React.useEffect(() => {
    if (subTab === 'certificate') {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#06B6D4', '#FFDE59', '#22C55E', '#FB923C'],
      });
    }
  }, [subTab]);

  // Handle MCQ selection
  const handleSelectMCQ = (mcqId: string, optionIdx: number, correctIdx: number, topicXp: number) => {
    if (mcqAnswers[mcqId] !== undefined) return;
    setMcqAnswers(prev => ({ ...prev, [mcqId]: optionIdx }));
    if (optionIdx === correctIdx) {
      addPrismaXP(20);
      triggerBurst('💥 POW!', '+20 XP Correct Answer!', 'pow');
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#22C55E', '#FFDE59', '#06B6D4'],
      });
    } else {
      triggerBurst('💀 OUCH!', "Bugsy Gotcha! Check Pri's Note", 'boom');
    }
  };

  // Toggle Boss Defeated
  const handleToggleBoss = (id: number) => {
    if (defeatedBosses.includes(id)) {
      setDefeatedBosses(prev => prev.filter(b => b !== id));
    } else {
      setDefeatedBosses(prev => [...prev, id]);
      addPrismaXP(50);
      triggerBurst('🏆 BOSS DOWN!', `Boss #${id} Vanquished! +50 XP`, 'star');
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EF4444', '#FFDE59', '#38B6FF'],
      });
    }
  };

  // Word Search Cell Click
  const handleCellClick = (r: number, c: number) => {
    const isAlready = selectedCells.some(cell => cell.r === r && cell.c === c);
    let nextCells = isAlready
      ? selectedCells.filter(cell => !(cell.r === r && cell.c === c))
      : [...selectedCells, { r, c }];

    setSelectedCells(nextCells);

    // Form word from selected cells
    const formed = nextCells.map(cell => prismaWordSearchGrid[cell.r][cell.c]).join('');
    const reversed = formed.split('').reverse().join('');

    const matched = prismaHiddenWords.find(
      w => (w === formed || w === reversed) && !foundWords.includes(w)
    );

    if (matched) {
      setFoundWords(prev => [...prev, matched]);
      setWordSearchSuccessMsg(`Found keyword: "${matched}"! (+20 XP)`);
      addPrismaXP(20);
      triggerBurst('✨ WORD FOUND!', `"${matched}" +20 XP!`, 'zap');
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#06B6D4', '#22C55E', '#FFDE59'],
      });
      setSelectedCells([]);
      setTimeout(() => setWordSearchSuccessMsg(''), 3000);
    }
  };

  // Run Playground Query
  const handleRunPlayground = () => {
    setQueryRunning(true);
    setTimeout(() => {
      if (selectedQueryType === 'findManyUsers') {
        setSimulatedSql('SELECT id, email, name, role FROM "User" ORDER BY id ASC;');
        setQueryOutput([
          { id: 1, email: 'siddhant@adventures.io', name: 'Siddhant Thakur', role: 'ADMIN' },
          { id: 2, email: 'nova@prisma.io', name: 'Nova Buddy', role: 'USER' },
          { id: 3, email: 'pri@prisma.io', name: 'Pri Robot', role: 'USER' },
        ]);
      } else if (selectedQueryType === 'userWithPosts') {
        setSimulatedSql(
          'SELECT u.id, u.name, u.email, p.id AS post_id, p.title, p.views FROM "User" u LEFT JOIN "Post" p ON p.authorId = u.id WHERE u.id = 1;'
        );
        setQueryOutput({
          id: 1,
          name: 'Siddhant Thakur',
          email: 'siddhant@adventures.io',
          posts: [
            { id: 101, title: 'Prisma v7 Driver Adapters Explained', views: 1420 },
            { id: 102, title: 'Express 5 Centralized Error Handling', views: 890 },
          ],
        });
      } else if (selectedQueryType === 'createPost') {
        setSimulatedSql('INSERT INTO "Post" (title, content, authorId) VALUES ($1, $2, $3) RETURNING *;');
        setQueryOutput({
          id: 103,
          title: 'Scaling Node.js Event Loop with Worker Threads',
          content: 'Keep CPU heavy work off the main thread.',
          authorId: 1,
          published: false,
          views: 0,
          createdAt: new Date().toISOString(),
        });
      } else if (selectedQueryType === 'groupByAuthors') {
        setSimulatedSql(
          'SELECT authorId, COUNT(*) AS count, SUM(views) AS total_views FROM "Post" WHERE published = true GROUP BY authorId HAVING SUM(views) > 100 ORDER BY total_views DESC;'
        );
        setQueryOutput([
          { authorId: 1, _count: { _all: 2 }, _sum: { views: 2310 } },
          { authorId: 2, _count: { _all: 1 }, _sum: { views: 420 } },
        ]);
      } else if (selectedQueryType === 'guardedUpdate') {
        setSimulatedSql(
          'UPDATE "Product" SET stock = stock - 1 WHERE id = 1 AND stock >= 1 RETURNING *;'
        );
        setQueryOutput({
          count: 1,
          status: 'SUCCESS: Inventory decremented safely in 1 atomic statement.',
        });
      } else if (selectedQueryType === 'omitPassword') {
        setSimulatedSql('SELECT id, email, role FROM "User" WHERE id = 1;');
        setQueryOutput({
          id: 1,
          email: 'siddhant@adventures.io',
          role: 'ADMIN',
          note: 'passwordHash is omitted safely!',
        });
      }
      setQueryRunning(false);
      triggerBurst('⚡ QUERY EXECUTED!', 'Prisma Client → PostgreSQL SQL', 'zap');
    }, 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner: Comic Book Title & Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#071926] via-[#0a1424] to-[#0e1f18] border-3 border-black rounded-2xl p-6 sm:p-8 shadow-comic">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <PriAvatar size="xl" mood="teaching" className="transform -rotate-3" />
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="bg-[#06B6D4] text-black font-extrabold text-xs uppercase px-2.5 py-0.5 rounded-full border border-black shadow-comic-sm">
                  Full Comic Book • 223 Pages
                </span>
                <span className="bg-[#FB923C] text-black font-extrabold text-xs uppercase px-2.5 py-0.5 rounded-full border border-black shadow-comic-sm">
                  Prisma ORM v7
                </span>
                <span className="bg-[#10B981] text-black font-extrabold text-xs uppercase px-2.5 py-0.5 rounded-full border border-black shadow-comic-sm">
                  Node.js + Express
                </span>
              </div>
              <h1 className="font-bangers text-3xl sm:text-5xl text-white tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                PRISMA ORM v7 COMIC SAGA
              </h1>
              <p className="text-sm sm:text-base text-slate-200 max-w-2xl font-medium mt-1">
                Master modern backend engineering with <strong className="text-[#06B6D4]">Pri the Prism-bot</strong>,{' '}
                <strong className="text-[#FB923C]">Nova</strong>, and outsmart every exam trap set by{' '}
                <strong className="text-[#F43F5E]">Bug</strong>!
              </p>
            </div>
          </div>

          {/* Quick Stats Widget */}
          <div className="flex items-center gap-3 bg-[#080d1a] p-3.5 rounded-xl border-2 border-[#1c253c] shadow-comic-sm">
            <div className="text-center px-3 border-r border-[#202940]">
              <div className="text-xs text-slate-400 font-semibold uppercase">Prisma XP</div>
              <div className="font-bangers text-2xl text-[#06B6D4]">+{prismaXP}</div>
            </div>
            <div className="text-center px-3 border-r border-[#202940]">
              <div className="text-xs text-slate-400 font-semibold uppercase">Mastery</div>
              <div className="font-bangers text-2xl text-[#FB923C]">
                {prismaCompletedTopics.length}/{allTopicsCount}
              </div>
            </div>
            <div className="text-center px-3">
              <div className="text-xs text-slate-400 font-semibold uppercase">Bosses</div>
              <div className="font-bangers text-2xl text-[#10B981]">{defeatedBosses.length}/11</div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b-2 border-[#1b2236]">
        {[
          { id: 'quest', label: '14-Level Quest Map', icon: Sparkles, count: `${prismaCompletedTopics.length}/${allTopicsCount}` },
          { id: 'playground', label: 'Schema & Query Studio', icon: Terminal, count: 'Interactive' },
          { id: 'boss', label: 'Mixed Mock Contest', icon: Trophy, count: '11 Bosses + 15 T/F' },
          { id: 'puzzles', label: 'Puzzle Zone', icon: Search, count: 'Word Search & Pairs' },
          { id: 'flashcards', label: 'Rapid-Fire Flashcards', icon: Layers, count: `${prismaFlashcards.length} Cards` },
          { id: 'posters', label: 'Cheat-Sheet Posters', icon: FileSpreadsheet, count: '3 Posters' },
          { id: 'certificate', label: 'Winner Certificate', icon: Award, count: 'Mastery' },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition cursor-pointer border-2 ${
                isActive
                  ? 'bg-[#06B6D4] text-black border-black shadow-comic-sm font-extrabold'
                  : 'bg-[#0e1322] text-slate-300 border-[#1c243a] hover:border-cyan-500/50 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold border ${
                    isActive ? 'bg-black text-[#06B6D4] border-black' : 'bg-[#151b2e] text-slate-300 border-[#26314d]'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: 14-LEVEL QUEST MAP & TOPICS READER */}
      {subTab === 'quest' && (
        <div className="space-y-6">
          {/* Level Selector Carousel */}
          <div className="bg-[#0c1120] p-4 rounded-2xl border-2 border-[#1c243a] shadow-comic-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bangers text-xl text-[#06B6D4] tracking-wide">
                  YOUR QUEST ROADMAP (14 LEVELS)
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Follow the dashed path from Node.js runtime to production Blog API capstone.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-300 bg-black/50 px-3 py-1 rounded-lg border border-[#232c45]">
                Level {selectedLevel} of 14
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {prismaQuestLevels.map(lvl => {
                const isSelected = selectedLevel === lvl.level;
                const levelTopicsCompleted = lvl.topics.filter(t => prismaCompletedTopics.includes(t.id)).length;
                const allDone = levelTopicsCompleted === lvl.topics.length;
                const isUnlocked = lvl.level === 1 || allDone || prismaQuestLevels[lvl.level - 2].topics.some(t => prismaCompletedTopics.includes(t.id));

                return (
                  <button
                    key={lvl.level}
                    onClick={() => {
                      if (!isUnlocked) {
                        alert(`🔒 Sequential Path: Complete Level ${lvl.level - 1} topics first to unlock Level ${lvl.level}!`);
                        return;
                      }
                      setSelectedLevel(lvl.level);
                      setSelectedTopic(lvl.topics[0]);
                    }}
                    className={`flex flex-col items-center justify-center min-w-[90px] p-2.5 rounded-xl border-2 transition ${
                      !isUnlocked
                        ? 'bg-[#0a0d18]/60 text-slate-500 border-[#151a2d] opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#06B6D4] text-black border-black shadow-comic-sm scale-105 font-bold cursor-pointer'
                        : allDone
                        ? 'bg-[#0b2116] text-[#34D399] border-[#10B981]/50 hover:border-[#10B981] cursor-pointer'
                        : 'bg-[#12172a] text-slate-300 border-[#1e253e] hover:border-slate-500 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="font-bangers text-lg">L{lvl.level}</span>
                      {allDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                      ) : !isUnlocked ? (
                        <Lock className="w-3 h-3 text-slate-500" />
                      ) : null}
                    </div>
                    <span className="text-[10px] font-bold truncate max-w-[80px]">
                      {lvl.title.split(' ')[0]}
                    </span>
                    <span className="text-[9px] opacity-80">
                      {isUnlocked ? `${levelTopicsCompleted}/${lvl.topics.length} done` : 'Locked'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level Header and Topic Pills */}
          <div className="bg-[#0c1120] p-5 rounded-2xl border-2 border-[#1c243a] shadow-comic-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1b2236] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bangers text-2xl text-[#FBBF24]">
                    LEVEL {currentLevelData.level}: {currentLevelData.title.toUpperCase()}
                  </span>
                  <span className="text-xs bg-[#FB923C]/20 text-[#FB923C] border border-[#FB923C]/40 px-2 py-0.5 rounded-md font-bold">
                    Day {currentLevelData.day}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium mt-0.5">{currentLevelData.subtitle}</p>
              </div>
              <div className="text-xs text-slate-300 bg-black/60 px-3 py-1.5 rounded-lg border border-[#232c45]">
                <strong className="text-white">Battle Plan:</strong> {currentLevelData.focus}
              </div>
            </div>

            {/* Topic Switcher Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {currentLevelData.topics.map((t, tIdx) => {
                const isSelected = selectedTopic.id === t.id;
                const isMastered = prismaCompletedTopics.includes(t.id);
                const prevTopic = tIdx > 0 ? currentLevelData.topics[tIdx - 1] : null;
                const isUnlocked = tIdx === 0 || (prevTopic && prismaCompletedTopics.includes(prevTopic.id)) || isMastered;

                return (
                  <button
                    key={t.id}
                    disabled={!isUnlocked}
                    onClick={() => {
                      if (!isUnlocked) {
                        triggerBurst('🔒 TOPIC LOCKED!', `Master ${prevTopic?.title} first in sequence!`, 'boom');
                        return;
                      }
                      setSelectedTopic(t);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition border-2 ${
                      !isUnlocked
                        ? 'bg-[#0a0d18] text-slate-600 border-[#151c30] opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#FBBF24] text-black border-black shadow-comic-sm cursor-pointer'
                        : isMastered
                        ? 'bg-[#0b2116] text-[#34D399] border-[#10B981]/50 cursor-pointer'
                        : 'bg-[#12172a] text-slate-300 border-[#1f2742] hover:border-slate-500 cursor-pointer'
                    }`}
                  >
                    <span>{t.code}. {t.title}</span>
                    {isMastered ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    ) : !isUnlocked ? (
                      <Lock className="w-3 h-3 text-slate-500" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Topic Deep Dive Reader */}
          <div className="bg-[#090d1a] border-3 border-black rounded-2xl p-6 shadow-comic space-y-6">
            {/* Header: Title, Stars, XP & Mastered Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#1c243a] pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-bangers text-2xl text-[#06B6D4]">
                    {selectedTopic.code} — {selectedTopic.title}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-[#141b2d] text-slate-300 rounded font-semibold border border-[#232c45]">
                    Difficulty: {'★'.repeat(selectedTopic.difficulty)}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-[#141b2d] text-amber-300 rounded font-semibold border border-[#232c45]">
                    Exam Weight: {'★'.repeat(selectedTopic.examWeight)}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full font-extrabold border border-emerald-500/40">
                    +{selectedTopic.xp} XP
                  </span>
                </div>
              </div>

              <button
                onClick={() => togglePrismaTopicComplete(selectedTopic.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bangers text-base tracking-wider transition cursor-pointer border-2 shadow-comic-sm btn-comic-push ${
                  prismaCompletedTopics.includes(selectedTopic.id)
                    ? 'bg-[#10B981] text-black border-black font-extrabold'
                    : 'bg-[#151c30] text-white border-black hover:bg-[#1d2744]'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>
                  {prismaCompletedTopics.includes(selectedTopic.id)
                    ? 'TOPIC MASTERED! (✓)'
                    : 'MARK AS MASTERED'}
                </span>
              </button>
            </div>

            {/* 3-Panel Comic Scene */}
            <div>
              <div className="text-xs font-bangers uppercase tracking-wider text-slate-400 mb-2">
                Comic Scene (Pri, Nova, Bug)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {selectedTopic.comicPanels.map((panel, idx) => (
                  <ComicBubble
                    key={idx}
                    speaker={panel.speaker}
                    text={panel.speech}
                    subtext={
                      panel.speaker === 'pri'
                        ? 'Your Teacher'
                        : panel.speaker === 'nova'
                        ? 'Your Buddy'
                        : 'The Trap Setter'
                    }
                  />
                ))}
              </div>
            </div>

            {/* In Simple Words (Everyday Metaphor) */}
            <div className="bg-[#181305] border-2 border-[#FBBF24] rounded-xl p-4 shadow-comic-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bangers text-lg text-[#FBBF24] tracking-wide">
                  💡 IN SIMPLE WORDS (EVERYDAY COMPARISON)
                </span>
              </div>
              <p className="text-sm text-amber-100 font-medium leading-relaxed">
                {selectedTopic.inSimpleWords.comparison}
              </p>
              {selectedTopic.inSimpleWords.danger && (
                <div className="mt-2.5 pt-2 border-t border-amber-700/40 text-xs text-rose-300 font-medium">
                  <strong>⚠️ The Danger:</strong> {selectedTopic.inSimpleWords.danger}
                </div>
              )}
            </div>

            {/* Detailed Theory */}
            <div className="bg-[#0d1222] border-2 border-[#1c243a] rounded-xl p-5 space-y-3">
              <h4 className="font-bangers text-lg text-white tracking-wide flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#06B6D4]" />
                DETAILED THEORY & ENGINE MECHANICS
              </h4>
              <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line font-normal">
                {selectedTopic.detailedTheory}
              </div>
            </div>

            {/* Dark Code Lab with VS Code Frame */}
            <div className="bg-[#0b0e17] border-2 border-black rounded-xl overflow-hidden shadow-comic-sm">
              <div className="bg-[#141a29] px-4 py-2 border-b border-black flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs text-gray-400 font-mono ml-2">
                    {selectedTopic.codeLab.title}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(selectedTopic.codeLab.code, selectedTopic.id)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-white px-2 py-0.5 rounded bg-gray-800 cursor-pointer"
                >
                  {copiedCode === selectedTopic.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 overflow-x-auto">
                <pre className="text-xs sm:text-sm font-mono text-cyan-300 leading-relaxed">
                  <code>{selectedTopic.codeLab.code}</code>
                </pre>
              </div>

              {selectedTopic.codeLab.output && (
                <div className="bg-[#07090f] p-3 border-t border-gray-900 font-mono text-xs text-gray-400">
                  <span className="text-green-400">$ Output:</span>
                  <pre className="mt-1 text-gray-300">{selectedTopic.codeLab.output}</pre>
                </div>
              )}

              {selectedTopic.codeLab.explanation && (
                <div className="p-3 bg-[#111726] border-t border-gray-800 text-xs text-gray-300">
                  <strong className="text-[#06B6D4]">Key Takeaway:</strong>{' '}
                  {selectedTopic.codeLab.explanation}
                </div>
              )}
            </div>

            {/* Did You Know & Memory Trick Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#071828] border-2 border-[#38BDF8] rounded-xl p-4 shadow-comic-sm">
                <div className="text-xs font-bangers text-[#38BDF8] tracking-wide mb-1">
                  ⭐ DID YOU KNOW?
                </div>
                <p className="text-xs text-sky-100 font-medium leading-relaxed">{selectedTopic.didYouKnow}</p>
              </div>

              <div className="bg-[#180d26] border-2 border-[#A78BFA] rounded-xl p-4 shadow-comic-sm">
                <div className="text-xs font-bangers text-[#A78BFA] tracking-wide mb-1">
                  🧠 MEMORY TRICK
                </div>
                <p className="text-xs text-purple-100 font-medium leading-relaxed">{selectedTopic.memoryTrick}</p>
              </div>
            </div>

            {/* Quick Revision Checklist */}
            <div className="bg-[#071c14] border-2 border-[#10B981] rounded-xl p-4 shadow-comic-sm">
              <div className="font-bangers text-base text-[#10B981] tracking-wide mb-2">
                ✓ REMEMBER (QUICK REVISION CHECKLIST)
              </div>
              <ul className="space-y-1.5 text-xs text-emerald-100 font-medium">
                {selectedTopic.remember.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#10B981] font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* QUEST TIME: MCQs, Coding Quest, and Bug's Myth Trap */}
            <div className="space-y-4 pt-2">
              <h4 className="font-bangers text-xl text-[#FBBF24] tracking-wider border-b border-[#1c243a] pb-2">
                QUEST TIME: TEST YOUR MASTERY
              </h4>

              {/* MCQs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedTopic.mcqs.map(mcq => {
                  const userAnswer = mcqAnswers[mcq.id];
                  const hasAnswered = userAnswer !== undefined;
                  const isCorrect = userAnswer === mcq.answerIndex;

                  return (
                    <div
                      key={mcq.id}
                      className="bg-[#0d1222] border-2 border-[#1c253c] rounded-xl p-4 shadow-comic-sm space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bangers text-xs text-[#06B6D4]">{mcq.id}</span>
                        {hasAnswered && (
                          <span
                            className={`text-xs font-bold flex items-center gap-1 ${
                              isCorrect ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+20 XP)
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3.5 h-3.5" /> Incorrect
                              </>
                            )}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-white">
                        {mcq.question}
                      </p>

                      <div className="space-y-2">
                        {mcq.options.map((opt, oIdx) => {
                          const isOptionSelected = userAnswer === oIdx;
                          const isOptionCorrect = oIdx === mcq.answerIndex;

                          let btnStyle = 'bg-[#141b2f] border-[#25304e] text-slate-200 hover:border-slate-400';
                          if (hasAnswered) {
                            if (isOptionCorrect) {
                              btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                            } else if (isOptionSelected) {
                              btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                            } else {
                              btnStyle = 'bg-[#0f1424] border-[#1a2135] text-slate-500 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={hasAnswered}
                              onClick={() => handleSelectMCQ(mcq.id, oIdx, mcq.answerIndex, selectedTopic.xp)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-xs border transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                            >
                              <span>
                                <strong className="mr-1.5">{String.fromCharCode(65 + oIdx)}.</strong> {opt}
                              </span>
                              {hasAnswered && isOptionCorrect && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <div className="p-2.5 rounded-lg bg-black/60 border border-[#1e2740] text-xs text-slate-300">
                          <strong className="text-[#06B6D4]">Pri explains:</strong> {mcq.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bug's Myth Trap */}
              {selectedTopic.mythTraps.map(trap => {
                const isRevealed = revealedFactChecks[trap.id];
                return (
                  <div
                    key={trap.id}
                    className="bg-[#1f0d13] border-2 border-[#F43F5E] rounded-xl p-4 shadow-comic-sm space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <BugAvatar size="sm" mood="sneaky" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bangers text-xs text-[#F43F5E]">
                            BUG'S MYTH TRAP {trap.id}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">(Classic Exam Trap!)</span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-rose-100">
                          Bug says: "{trap.statement}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-rose-900/50">
                      <span className="text-xs text-slate-300 font-medium">
                        Your mission: Can you bust Bug's myth?
                      </span>
                      <button
                        onClick={() =>
                          setRevealedFactChecks(prev => ({ ...prev, [trap.id]: !prev[trap.id] }))
                        }
                        className="flex items-center gap-1 px-3 py-1 bg-[#F43F5E] text-white font-bangers text-xs rounded-lg hover:bg-rose-400 cursor-pointer shadow-comic-sm font-bold"
                      >
                        {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{isRevealed ? 'HIDE FACT-CHECK' : "REVEAL PRI'S FACT-CHECK"}</span>
                      </button>
                    </div>

                    {isRevealed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-3 bg-[#081b19] border border-[#14B8A6] rounded-lg text-xs text-cyan-200 leading-relaxed font-medium"
                      >
                        <strong className="text-[#06B6D4] font-bold">Pri's Fact-Check:</strong>{' '}
                        {trap.factCheck}
                      </motion.div>
                    )}
                  </div>
                );
              })}

              {/* Coding Quest & Think It Through */}
              <div className="bg-[#121829] border-2 border-black rounded-xl p-4 shadow-comic-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-bangers text-sm text-[#FFDE59]">
                    CODING QUEST {selectedTopic.codingQuest.id}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setOpenCodingQuest(prev => !prev)}
                      className={`btn-comic-push flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg cursor-pointer border shadow-comic-sm transition ${
                        openCodingQuest
                          ? 'bg-amber-400 text-slate-950 border-amber-300'
                          : 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-400'
                      }`}
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>{openCodingQuest ? 'Close IDE' : '💻 Code in VS Code'}</span>
                    </button>
                    <button
                      onClick={() =>
                        setRevealedSolutions(prev => ({
                          ...prev,
                          [selectedTopic.codingQuest.id]: !prev[selectedTopic.codingQuest.id],
                        }))
                      }
                      className="btn-comic-push flex items-center gap-1 px-3 py-1 bg-[#1e2740] hover:bg-[#283556] text-xs font-bold text-gray-200 rounded-lg cursor-pointer border border-gray-700 shadow-comic-sm"
                    >
                      {revealedSolutions[selectedTopic.codingQuest.id] ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" /> Hide Model Solution
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" /> View Solution & Steps
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-200 font-medium">
                  {selectedTopic.codingQuest.prompt}
                </p>

                {openCodingQuest && (
                  <div className="pt-2 animate-fadeIn">
                    <UniversalVSCodeEditor
                      language="typescript"
                      starterCode={`// Prisma Quest ${selectedTopic.codingQuest.id}: ${selectedTopic.title}\n// Prompt: ${selectedTopic.codingQuest.prompt}\n\nimport { PrismaClient } from '@prisma/client';\nconst prisma = new PrismaClient();\n\nasync function runQuest() {\n  // Write your Prisma client code below:\n  \n}\n\nrunQuest().then(console.log).catch(console.error);\n`}
                      solutionCode={selectedTopic.codingQuest.solution}
                      problemTitle={`[Prisma] ${selectedTopic.code} — ${selectedTopic.title}`}
                      problemId={`prisma-${selectedTopic.id}`}
                      fileName="query.ts"
                      onSolve={() => {
                        if (!prismaCompletedTopics.includes(selectedTopic.id)) {
                          togglePrismaTopicComplete(selectedTopic.id);
                        }
                        unlockBadge('badge-code-run');
                      }}
                    />
                  </div>
                )}

                {revealedSolutions[selectedTopic.codingQuest.id] && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 pt-2"
                  >
                    {/* Steps (Think It Through) */}
                    <div className="bg-[#1b233a] p-3 rounded-lg border border-gray-700 space-y-1.5">
                      <div className="text-xs font-bangers text-[#06B6D4]">
                        PRI'S "THINK IT THROUGH" STEPS:
                      </div>
                      <ol className="list-decimal list-inside text-xs text-gray-300 space-y-1">
                        {selectedTopic.codingQuest.steps.map((st, i) => (
                          <li key={i}>{st}</li>
                        ))}
                      </ol>
                    </div>

                    {/* Solution Code */}
                    <div className="bg-[#0b0e17] p-3 rounded-lg border border-black font-mono text-xs text-cyan-300">
                      <pre>
                        <code>{selectedTopic.codingQuest.solution}</code>
                      </pre>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE SCHEMA & QUERY PLAYGROUND */}
      {subTab === 'playground' && (
        <div className="space-y-6">
          <div className="bg-[#0c101d] p-5 rounded-2xl border-2 border-[#1c243a] shadow-comic space-y-4">
            <div>
              <h2 className="font-bangers text-2xl text-[#06B6D4] tracking-wide">
                PRISMA SCHEMA & QUERY STUDIO
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Run simulated Prisma queries against the reference Blog API database. Inspect how Prisma
                Client creates parameterised SQL and shapes returned objects!
              </p>
            </div>

            {/* Query Selector Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'findManyUsers', label: '1. findMany (Users)', desc: 'SELECT id, email, name, role' },
                { id: 'userWithPosts', label: '2. Nested Include', desc: 'User + published posts' },
                { id: 'createPost', label: '3. Create Post', desc: 'Insert new row with authorId' },
                { id: 'groupByAuthors', label: '4. GroupBy & Having', desc: 'Aggregated view counts' },
                { id: 'guardedUpdate', label: '5. Guarded Concurrency', desc: 'Atomic inventory decrement' },
                { id: 'omitPassword', label: '6. Global Omit', desc: 'Hide sensitive passwordHash' },
              ].map(q => (
                <button
                  key={q.id}
                  onClick={() => {
                    setSelectedQueryType(q.id);
                    setQueryOutput(null);
                    setSimulatedSql('');
                  }}
                  className={`text-left p-3 rounded-xl border-2 transition cursor-pointer ${
                    selectedQueryType === q.id
                      ? 'bg-[#06B6D4] text-black border-black shadow-comic-sm font-bold'
                      : 'bg-[#12172a] text-slate-300 border-[#1e253e] hover:border-slate-400'
                  }`}
                >
                  <div className="font-bold text-xs">{q.label}</div>
                  <div className="text-[10px] opacity-80">{q.desc}</div>
                </button>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-300 font-medium">
                Current query: <strong className="text-white font-mono">{selectedQueryType}()</strong>
              </span>
              <button
                onClick={handleRunPlayground}
                disabled={queryRunning}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#10B981] hover:bg-emerald-400 text-black font-bangers text-base rounded-xl border-2 border-black shadow-comic-sm cursor-pointer transition btn-comic-push"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>{queryRunning ? 'EXECUTING...' : 'RUN QUERY'}</span>
              </button>
            </div>
          </div>

          {/* Results Panes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SQL Translation */}
            <div className="bg-[#080b14] border-2 border-[#1c243a] rounded-xl p-4 shadow-comic-sm space-y-2">
              <div className="flex items-center justify-between border-b border-[#1c243a] pb-2">
                <span className="font-bangers text-xs text-[#FBBF24]">
                  TRANSLATED SQL (WHAT POSTGRES RECEIVES)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">log: ['query']</span>
              </div>
              <pre className="text-xs font-mono text-amber-200 min-h-[140px] whitespace-pre-wrap p-2.5 bg-[#0d1220] rounded-lg border border-[#1b233a]">
                {simulatedSql || '-- Click "RUN QUERY" to see the parameterised SQL query'}
              </pre>
            </div>

            {/* Formatted JSON Output */}
            <div className="bg-[#080b14] border-2 border-[#1c243a] rounded-xl p-4 shadow-comic-sm space-y-2">
              <div className="flex items-center justify-between border-b border-[#1c243a] pb-2">
                <span className="font-bangers text-xs text-[#06B6D4]">
                  TYPED RESULT (PRISMA CLIENT OUTPUT)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">JSON</span>
              </div>
              <pre className="text-xs font-mono text-cyan-200 min-h-[140px] whitespace-pre-wrap p-2.5 bg-[#0d1220] rounded-lg overflow-x-auto border border-[#1b233a]">
                {queryOutput ? JSON.stringify(queryOutput, null, 2) : '// Result will appear here'}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BOSS FIGHT (MIXED MOCK CONTEST) */}
      {subTab === 'boss' && (
        <div className="space-y-6">
          <div className="bg-[#18090d] border-3 border-[#F43F5E] rounded-2xl p-6 shadow-comic space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <BugAvatar size="lg" mood="laughing" />
                <div>
                  <h2 className="font-bangers text-3xl text-[#F43F5E] tracking-wider">
                    BOSS FIGHT: MIXED MOCK CONTEST
                  </h2>
                  <p className="text-xs sm:text-sm text-rose-200 font-medium">
                    Test your comprehensive Prisma skills in one sitting. 11 Boss coding challenges + 15 Quick-Fire
                    True/False checks!
                  </p>
                </div>
              </div>

              <div className="bg-[#100508] p-3 rounded-xl border border-rose-900/60 text-center">
                <div className="text-[10px] text-rose-300 font-bold uppercase">Mock Score</div>
                <div className="font-bangers text-2xl text-[#FBBF24]">
                  {quickFireScore} / 15 True-False
                </div>
              </div>
            </div>
          </div>

          {/* 15 Quick-Fire True/False Section */}
          <div className="bg-[#0c101d] p-5 rounded-2xl border-2 border-[#1c243a] shadow-comic-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#1c243a] pb-3">
              <div>
                <h3 className="font-bangers text-xl text-[#FBBF24]">
                  15 QUICK-FIRE CHECKS (TRUE OR FALSE)
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  Instant one-line reasons. Score: {quickFireScore}/15
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {prismaQuickFireQuestions.map(q => {
                const userChoice = quickFireUserAnswers[q.id];
                const hasAnswered = userChoice !== undefined;
                const isCorrect = userChoice === q.isTrue;

                return (
                  <div
                    key={q.id}
                    className="p-3 rounded-xl bg-[#12172a] border border-[#1f2742] space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bangers text-xs text-[#06B6D4]">{q.id}</span>
                      <p className="text-xs text-slate-200 font-medium flex-1">{q.statement}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        disabled={hasAnswered}
                        onClick={() => {
                          setQuickFireUserAnswers(prev => ({ ...prev, [q.id]: true }));
                          if (q.isTrue) addPrismaXP(15);
                        }}
                        className={`px-3 py-1 rounded text-xs font-bold transition cursor-pointer border ${
                          hasAnswered
                            ? q.isTrue
                              ? 'bg-green-900/60 border-green-500 text-green-300'
                              : userChoice === true
                              ? 'bg-red-900/60 border-red-500 text-red-300'
                              : 'bg-gray-800 border-gray-700 text-gray-500'
                            : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        True
                      </button>

                      <button
                        disabled={hasAnswered}
                        onClick={() => {
                          setQuickFireUserAnswers(prev => ({ ...prev, [q.id]: false }));
                          if (!q.isTrue) addPrismaXP(15);
                        }}
                        className={`px-3 py-1 rounded text-xs font-bold transition cursor-pointer border ${
                          hasAnswered
                            ? !q.isTrue
                              ? 'bg-green-900/60 border-green-500 text-green-300'
                              : userChoice === false
                              ? 'bg-red-900/60 border-red-500 text-red-300'
                              : 'bg-gray-800 border-gray-700 text-gray-500'
                            : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        False
                      </button>

                      {hasAnswered && (
                        <span
                          className={`text-xs font-bold ml-auto ${
                            isCorrect ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {isCorrect ? '✓ Correct' : '✗ Wrong'}
                        </span>
                      )}
                    </div>

                    {hasAnswered && (
                      <p className="text-[11px] text-gray-400 bg-black/40 p-2 rounded">
                        <strong>Reason:</strong> {q.reason}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Boss 1 to 11 Challenges */}
          <div className="space-y-4">
            <h3 className="font-bangers text-2xl text-white tracking-wide">
              BOSS CODING CHALLENGES (1 TO 11)
            </h3>

            {prismaBossChallenges.map(boss => {
              const isDefeated = defeatedBosses.includes(boss.id);
              const isRevealed = revealedBossCode[boss.id];

              return (
                <div
                  key={boss.id}
                  className="bg-[#121727] border-2 border-black rounded-2xl p-5 shadow-comic-sm space-y-3"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-bangers text-lg text-[#06B6D4]">{boss.title}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setRevealedBossCode(prev => ({ ...prev, [boss.id]: !prev[boss.id] }))
                        }
                        className="px-3 py-1 bg-[#1c243d] hover:bg-[#283556] text-xs font-bold text-gray-200 rounded-lg border border-gray-700 cursor-pointer"
                      >
                        {isRevealed ? 'Hide Solution' : 'Reveal Solution'}
                      </button>

                      <button
                        onClick={() => handleToggleBoss(boss.id)}
                        className={`px-3 py-1 font-bangers text-xs rounded-lg border cursor-pointer ${
                          isDefeated
                            ? 'bg-[#22C55E] text-black border-black'
                            : 'bg-gray-800 text-gray-300 border-gray-700 hover:text-white'
                        }`}
                      >
                        {isDefeated ? 'DEFEATED (✓)' : 'MARK DEFEATED (+50 XP)'}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-200">{boss.prompt}</p>

                  {isRevealed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2 pt-2"
                    >
                      <pre className="p-3 bg-[#0a0d14] border border-black rounded-lg text-xs font-mono text-cyan-300 overflow-x-auto">
                        <code>{boss.solutionCode}</code>
                      </pre>
                      <p className="text-xs text-gray-400 bg-black/30 p-2.5 rounded-lg border border-gray-800">
                        <strong className="text-[#06B6D4]">Pri explains:</strong> {boss.explanation}
                      </p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: PUZZLE ZONE */}
      {subTab === 'puzzles' && (
        <div className="space-y-6">
          {/* Game 1: Word Search */}
          <div className="bg-[#101422] p-5 rounded-2xl border-2 border-black shadow-comic space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-bangers text-2xl text-[#FFDE59] tracking-wide">
                  GAME 1: PRISMA WORD SEARCH (16×16)
                </h3>
                <p className="text-xs text-gray-400">
                  Find all 21 hidden Prisma keywords! Click letters to select them.
                </p>
              </div>

              <div className="bg-black/50 px-3 py-1.5 rounded-xl border border-gray-700 text-xs">
                Found:{' '}
                <strong className="text-[#22C55E]">
                  {foundWords.length} / {prismaHiddenWords.length}
                </strong>
              </div>
            </div>

            {wordSearchSuccessMsg && (
              <div className="p-2.5 bg-green-900/60 border border-green-500 rounded-xl text-xs text-green-200 font-bold text-center">
                🎉 {wordSearchSuccessMsg}
              </div>
            )}

            {/* Word Search 16x16 Interactive Grid */}
            <div className="overflow-x-auto py-2">
              <div className="inline-grid grid-cols-16 gap-1 bg-[#090b12] p-3 rounded-xl border-2 border-black mx-auto">
                {prismaWordSearchGrid.map((row, rIdx) =>
                  row.map((letter, cIdx) => {
                    const isSelected = selectedCells.some(cell => cell.r === rIdx && cell.c === cIdx);

                    return (
                      <button
                        key={`${rIdx}-${cIdx}`}
                        onClick={() => handleCellClick(rIdx, cIdx)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-mono font-bold text-xs sm:text-sm rounded transition cursor-pointer border ${
                          isSelected
                            ? 'bg-[#FFDE59] text-black border-black shadow-comic-sm scale-110 font-extrabold z-10'
                            : 'bg-[#151a2a] text-gray-300 border-gray-800 hover:border-gray-500'
                        }`}
                      >
                        {letter}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Hidden Word Badges */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {prismaHiddenWords.map(word => {
                const isFound = foundWords.includes(word);
                return (
                  <span
                    key={word}
                    className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border ${
                      isFound
                        ? 'bg-green-950/80 border-green-500 text-green-300 font-bold line-through'
                        : 'bg-gray-800/60 border-gray-700 text-gray-400'
                    }`}
                  >
                    {isFound ? '✓ ' : '☐ '}
                    {word}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Game 2: Match the Pairs */}
          <div className="bg-[#101422] p-5 rounded-2xl border-2 border-black shadow-comic space-y-4">
            <h3 className="font-bangers text-2xl text-[#06B6D4] tracking-wide">
              GAME 2: MATCH THE PAIRS (10 TERMS)
            </h3>
            <p className="text-xs text-gray-400">
              Match each database/Prisma term with its correct definition!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {prismaMatchPairs.map(p => {
                const selected = selectedMatches[p.id];
                const isCorrect = selected === p.definitionLetter;

                return (
                  <div
                    key={p.id}
                    className="p-3 bg-[#151a2d] border border-gray-800 rounded-xl space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-white">
                        {p.id}. {p.term}
                      </span>
                      {selected && (
                        <span
                          className={`text-xs font-bold ${
                            isCorrect ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {isCorrect ? '✓ Correct' : `✗ Correct was ${p.definitionLetter}`}
                        </span>
                      )}
                    </div>

                    {/* Options selection */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map(letter => (
                        <button
                          key={letter}
                          onClick={() => {
                            setSelectedMatches(prev => ({ ...prev, [p.id]: letter }));
                            if (letter === p.definitionLetter) addPrismaXP(15);
                          }}
                          className={`w-7 h-7 rounded text-xs font-bold transition border cursor-pointer ${
                            selected === letter
                              ? letter === p.definitionLetter
                                ? 'bg-green-600 text-black border-black'
                                : 'bg-red-600 text-white border-black'
                              : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          {letter}
                        </button>
                      ))}
                    </div>

                    <p className="text-[11px] text-gray-400 bg-black/40 p-2 rounded">
                      <strong>Option {p.definitionLetter}:</strong> {p.definition}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: RAPID-FIRE FLASHCARDS */}
      {subTab === 'flashcards' && (
        <div className="space-y-6">
          <div className="bg-[#101422] p-5 rounded-2xl border-2 border-black shadow-comic flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="font-bangers text-2xl text-[#06B6D4] tracking-wide">
                RAPID-FIRE FLASHCARDS DECK
              </h2>
              <p className="text-xs text-gray-400">
                43 high-yield question cards from the comic book. Flip to test your recall!
              </p>
            </div>
            <div className="text-xs bg-black/40 px-3 py-1.5 rounded-xl border border-gray-800 text-gray-300">
              Card {flashcardIdx + 1} of {prismaFlashcards.length} • Mastered:{' '}
              <strong className="text-[#22C55E]">{masteredCards.length}</strong>
            </div>
          </div>

          {/* Flashcard Container */}
          <div className="flex flex-col items-center justify-center py-6">
            <motion.div
              onClick={() => setFlashcardFlipped(!flashcardFlipped)}
              className={`w-full max-w-xl min-h-[260px] p-6 rounded-2xl border-3 border-black shadow-comic cursor-pointer flex flex-col justify-between transition transform ${
                flashcardFlipped ? 'bg-[#0f241a] border-[#22C55E]' : 'bg-[#151c2f] border-[#06B6D4]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bangers text-xs text-gray-400">
                  TOPIC {prismaFlashcards[flashcardIdx].topicCode}
                </span>
                <span className="text-xs font-bold text-gray-400">
                  {flashcardFlipped ? 'ANSWER (CLICK TO FLIP)' : 'QUESTION (CLICK TO FLIP)'}
                </span>
              </div>

              <div className="my-auto text-center py-6">
                {flashcardFlipped ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-base sm:text-lg text-green-300 font-bold"
                  >
                    {prismaFlashcards[flashcardIdx].answer}
                  </motion.p>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-bangers text-xl sm:text-2xl text-white tracking-wide"
                  >
                    {prismaFlashcards[flashcardIdx].question}
                  </motion.p>
                )}
              </div>

              <div className="text-center text-[11px] text-gray-400">
                Click anywhere to flip
              </div>
            </motion.div>

            {/* Flashcard Controls */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => {
                  setFlashcardIdx(prev => (prev > 0 ? prev - 1 : prismaFlashcards.length - 1));
                  setFlashcardFlipped(false);
                }}
                className="flex items-center gap-1 px-4 py-2 bg-[#19223a] text-white rounded-xl border-2 border-black shadow-comic-sm hover:bg-[#222e4f] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>

              <button
                onClick={() => {
                  const cardId = prismaFlashcards[flashcardIdx].id;
                  if (!masteredCards.includes(cardId)) {
                    setMasteredCards(prev => [...prev, cardId]);
                    addPrismaXP(25);
                  }
                  setFlashcardIdx(prev => (prev < prismaFlashcards.length - 1 ? prev + 1 : 0));
                  setFlashcardFlipped(false);
                }}
                className="flex items-center gap-1 px-5 py-2 bg-[#22C55E] text-black font-bangers text-sm rounded-xl border-2 border-black shadow-comic-sm hover:bg-green-400 cursor-pointer"
              >
                <Check className="w-4 h-4" /> Mastered (+25 XP)
              </button>

              <button
                onClick={() => {
                  setFlashcardIdx(prev => (prev < prismaFlashcards.length - 1 ? prev + 1 : 0));
                  setFlashcardFlipped(false);
                }}
                className="flex items-center gap-1 px-4 py-2 bg-[#19223a] text-white rounded-xl border-2 border-black shadow-comic-sm hover:bg-[#222e4f] cursor-pointer"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: CHEAT-SHEET POSTERS */}
      {subTab === 'posters' && (
        <div className="space-y-6">
          <div className="bg-[#101422] p-5 rounded-2xl border-2 border-black shadow-comic flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="font-bangers text-2xl text-[#FFDE59] tracking-wide">
                CHEAT-SHEET POSTERS (FROM THE COMIC)
              </h2>
              <p className="text-xs text-gray-400">
                Tear out, print, stick on the wall. Relations, error codes and CLI commands in one place.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-[#FFDE59] text-black font-bangers text-sm rounded-xl border-2 border-black shadow-comic-sm cursor-pointer hover:bg-yellow-400"
            >
              <Printer className="w-4 h-4" /> PRINT POSTERS
            </button>
          </div>

          <div className="space-y-6">
            {prismaPosters.map(poster => (
              <div
                key={poster.id}
                className="bg-[#101524] border-3 border-black rounded-2xl overflow-hidden shadow-comic"
              >
                <div className="bg-[#161d31] p-4 border-b-2 border-black">
                  <h3 className="font-bangers text-xl text-[#06B6D4] tracking-wide">
                    {poster.title}
                  </h3>
                  <p className="text-xs text-gray-400">{poster.subtitle}</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#0b0e17] text-gray-300 font-bangers text-sm tracking-wide border-b border-gray-800">
                        {poster.headers.map((h, i) => (
                          <th key={i} className="p-3">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800 font-mono">
                      {poster.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="hover:bg-white/5 transition"
                        >
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 text-gray-200">
                              {cIdx === 0 ? (
                                <strong className="text-[#FFDE59] font-sans font-bold">
                                  {cell}
                                </strong>
                              ) : (
                                cell
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: WINNER CERTIFICATE OF PRISMA ORM MASTERY */}
      {subTab === 'certificate' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bangers text-2xl text-[#FFDE59]">
              OFFICIAL CERTIFICATE OF PRISMA ORM MASTERY
            </h2>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-[#22C55E] text-black font-bangers text-sm rounded-xl border-2 border-black shadow-comic-sm hover:bg-green-400 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> PRINT CERTIFICATE
            </button>
          </div>

          {/* Certificate Board */}
          <div className="bg-[#fefce8] text-black p-8 sm:p-12 rounded-3xl border-8 border-dashed border-[#F59E0B] shadow-2xl max-w-3xl mx-auto space-y-6 text-center select-none">
            {/* Top Badge with rubber stamp animation */}
            <div className="inline-block bg-[#EF4444] text-white font-bangers text-2xl px-6 py-2 rounded-2xl border-3 border-black shadow-comic animate-comic-stamp">
              ★ OFFICIAL WINNER CERTIFICATE ★
            </div>

            <h1 className="font-bangers text-4xl sm:text-6xl text-[#1e293b] tracking-wider drop-shadow-sm">
              CERTIFICATE OF PRISMA ORM MASTERY
            </h1>

            <p className="text-base text-gray-600 font-medium italic">
              This officially certifies that
            </p>

            <div className="border-b-4 border-black pb-2 max-w-md mx-auto">
              <span className="font-bangers text-4xl sm:text-5xl text-[#0D9488] tracking-wider">
                Siddhant Thakur
              </span>
              <div className="text-xs font-mono text-gray-500 mt-1">
                GitHub: siddhantthakur278-bit
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-700 font-medium max-w-lg mx-auto">
              has beaten Bug, conquered all 14 Quest Levels, mastered Prisma v7 driver adapters, and built
              the full production Blog API capstone:
            </p>

            <div className="inline-block bg-[#06B6D4] text-black font-bangers text-xl sm:text-2xl px-5 py-1.5 rounded-xl border-2 border-black shadow-comic-sm">
              NODE.JS + EXPRESS + PRISMA ORM v7
            </div>

            <div className="text-xs text-gray-600 font-medium">
              Event Loop • Express 5 • Schema • Queries • Migrate • Auth • Vitest • Docker Deploy
            </div>

            {/* Crew Avatars */}
            <div className="flex items-center justify-center gap-6 pt-4">
              <NovaAvatar size="lg" mood="happy" />
              <PriAvatar size="xl" mood="teaching" />
              <BugAvatar size="lg" mood="shocked" />
            </div>

            {/* Date and Signature Footer */}
            <div className="flex items-center justify-between pt-8 border-t-2 border-gray-300 max-w-lg mx-auto text-xs font-medium text-gray-600">
              <div>
                <div className="font-mono">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div className="border-t border-gray-400 mt-1 pt-0.5">Date of Award</div>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bangers text-lg text-[#06B6D4]">Pri the Prism-Bot</span>
                <div className="border-t border-gray-400 mt-1 pt-0.5">Official Verification Seal</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
