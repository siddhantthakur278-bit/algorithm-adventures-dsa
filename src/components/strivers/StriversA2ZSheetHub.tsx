import React, { useState, useEffect, useMemo } from 'react';
import { useCourse } from '../../context/CourseContext';
import {
  STRIVERS_A2Z_STEPS,
  STRIVERS_A2Z_QUESTIONS,
  StriverStep,
  StriverQuestion,
  getA2ZDifficultyStats,
} from '../../data/striversA2ZData';
import {
  Target,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  Star,
  Play,
  Code2,
  ExternalLink,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Award,
  Layers,
  ArrowUpDown,
  RotateCcw,
  Zap,
  HelpCircle,
  X,
  Share2,
  Shuffle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { UniversalVSCodeEditor } from '../common/UniversalVSCodeEditor';
import { SupportedLanguage } from '../../utils/languageTemplates';
import { StriversTheoryViewer } from './StriversTheoryViewer';

const STORAGE_KEY_SOLVED = 'ada_strivers_a2z_solved';
const STORAGE_KEY_STARRED = 'ada_strivers_a2z_starred';

export const StriversA2ZSheetHub: React.FC = () => {
  const { stats, triggerBurst } = useCourse();

  // Solved & Starred State
  const [solvedIds, setSolvedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SOLVED);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [starredIds, setStarredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STARRED);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // View Mode: 'sheet' (Problems) vs 'theory' (Concept Masterclasses)
  const [viewMode, setViewMode] = useState<'sheet' | 'theory'>('sheet');

  // Filter & Search State
  const [selectedStepId, setSelectedStepId] = useState<string>('all');
  const [selectedSubStepId, setSelectedSubStepId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'solved' | 'unsolved' | 'starred'>('all');
  const [expandedHints, setExpandedHints] = useState<Set<string>>(new Set());

  // Video Tutorial Modal State
  const [activeVideoQuestion, setActiveVideoQuestion] = useState<StriverQuestion | null>(null);

  // Coding Sandbox Modal State
  const [activeCodeQuestion, setActiveCodeQuestion] = useState<StriverQuestion | null>(null);
  const [codeLanguage, setCodeLanguage] = useState<SupportedLanguage>('cpp');

  const statsMeta = useMemo(() => getA2ZDifficultyStats(), []);

  // Save to localStorage
  const toggleSolved = (id: string) => {
    sound.playPop();
    setSolvedIds((prev) => {
      const next = new Set(prev);
      const isNowSolved = !next.has(id);
      if (isNowSolved) {
        next.add(id);
        sound.playSuccess();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
        if (triggerBurst) triggerBurst('SOLVED!');
      } else {
        next.delete(id);
      }
      try {
        localStorage.setItem(STORAGE_KEY_SOLVED, JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  const toggleStarred = (id: string) => {
    sound.playPop();
    setStarredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(STORAGE_KEY_STARRED, JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  const toggleHint = (id: string) => {
    sound.playPop();
    setExpandedHints((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Reset Progress
  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset your Striver's A2Z sheet solved progress?")) {
      setSolvedIds(new Set());
      try {
        localStorage.removeItem(STORAGE_KEY_SOLVED);
      } catch {}
      sound.playPop();
    }
  };

  // Pick Random Question
  const handlePickRandom = () => {
    sound.playPop();
    const unsolved = STRIVERS_A2Z_QUESTIONS.filter((q) => !solvedIds.has(q.id));
    const pool = unsolved.length > 0 ? unsolved : STRIVERS_A2Z_QUESTIONS;
    const randomQ = pool[Math.floor(Math.random() * pool.length)];
    if (randomQ) {
      setSelectedStepId(randomQ.stepId);
      setSearchQuery(randomQ.title);
      setActiveCodeQuestion(randomQ);
    }
  };

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return STRIVERS_A2Z_QUESTIONS.filter((q) => {
      // Step filter
      if (selectedStepId !== 'all' && q.stepId !== selectedStepId) return false;
      // SubStep filter
      if (selectedSubStepId !== 'all' && q.subStepId !== selectedSubStepId) return false;
      // Difficulty filter
      if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;
      // Status filter
      if (statusFilter === 'solved' && !solvedIds.has(q.id)) return false;
      if (statusFilter === 'unsolved' && solvedIds.has(q.id)) return false;
      if (statusFilter === 'starred' && !starredIds.has(q.id)) return false;
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = q.title.toLowerCase().includes(query);
        const matchesSub = q.subStepTitle.toLowerCase().includes(query);
        const matchesHint = q.hint.toLowerCase().includes(query);
        const matchesTag = q.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesSub && !matchesHint && !matchesTag) return false;
      }
      return true;
    });
  }, [selectedStepId, selectedSubStepId, difficultyFilter, statusFilter, searchQuery, solvedIds, starredIds]);

  const selectedStepObj = useMemo(
    () => STRIVERS_A2Z_STEPS.find((s) => s.id === selectedStepId),
    [selectedStepId]
  );

  // Overall Solved Percent
  const overallPercent = Math.round((solvedIds.size / STRIVERS_A2Z_QUESTIONS.length) * 100);

  // Difficulty classes
  const getDifficultyBadge = (diff: 'Easy' | 'Medium' | 'Hard') => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Medium':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Hard':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
    }
  };

  return (
    <div className="max-w-[1780px] mx-auto px-2 sm:px-6 pt-4 pb-16 space-y-6 font-sans select-none animate-in fade-in duration-200">
      {/* 1. Glossy Hero Deck */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d1326] via-[#0b0e1b] to-[#140e24] border border-amber-500/20 p-5 sm:p-7 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-72 h-72 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Hero Info */}
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center gap-1.5 shadow-sm">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                <span>OFFICIAL TAKE U FORWARD</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-slate-300 bg-white/[0.06] border border-white/10">
                Created by Raj Vikramaditya (Striver)
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/30">
                18 Steps • 346+ Curated Problems
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Striver's A2Z DSA Sheet
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The world-renowned comprehensive DSA curriculum structured systematically from Step 1 (Basics &amp; Patterns) to Step 18 (Advanced Strings &amp; Hard Dynamic Programming), complete with video tutorials, complexities, and live code runners.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={handlePickRandom}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer"
                title="Pick a random problem to solve"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Pick Random Challenge</span>
              </button>

              <button
                onClick={() => setStatusFilter((prev) => (prev === 'starred' ? 'all' : 'starred'))}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                  statusFilter === 'starred'
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                    : 'bg-white/[0.04] text-slate-300 border-white/10 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${statusFilter === 'starred' ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
                <span>Revision Starred ({starredIds.size})</span>
              </button>

              <a
                href="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                <span>Official TUF Page</span>
              </a>

              {solvedIds.size > 0 && (
                <button
                  onClick={handleResetProgress}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs transition cursor-pointer ml-auto"
                  title="Reset your solved checkmarks"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Solved</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Progress Card */}
          <div className="bg-[#080b14]/90 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4 min-w-[280px] sm:min-w-[320px] shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">A2Z Completion</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono">{solvedIds.size}</span>
                  <span className="text-xs text-slate-400 font-mono">/ {STRIVERS_A2Z_QUESTIONS.length} Questions</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">{overallPercent}%</span>
              </div>
            </div>

            {/* Main Progress Bar */}
            <div className="w-full bg-white/[0.06] rounded-full h-2.5 overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${Math.max(2, overallPercent)}%` }}
              />
            </div>

            {/* Difficulty Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono pt-1 border-t border-white/10">
              <div className="p-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                <span className="block text-[9px] text-slate-400 uppercase">Easy</span>
                <span className="font-bold">
                  {STRIVERS_A2Z_QUESTIONS.filter((q) => q.difficulty === 'Easy' && solvedIds.has(q.id)).length} / {statsMeta.easy}
                </span>
              </div>
              <div className="p-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
                <span className="block text-[9px] text-slate-400 uppercase">Medium</span>
                <span className="font-bold">
                  {STRIVERS_A2Z_QUESTIONS.filter((q) => q.difficulty === 'Medium' && solvedIds.has(q.id)).length} / {statsMeta.medium}
                </span>
              </div>
              <div className="p-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300">
                <span className="block text-[9px] text-slate-400 uppercase">Hard</span>
                <span className="font-bold">
                  {STRIVERS_A2Z_QUESTIONS.filter((q) => q.difficulty === 'Hard' && solvedIds.has(q.id)).length} / {statsMeta.hard}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Navigation Switcher: Problems Sheet vs Theory Masterclass */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center p-1 bg-[#05070e] rounded-2xl border border-white/15 shadow-inner">
          <button
            onClick={() => {
              sound.playPop();
              setViewMode('sheet');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              viewMode === 'sheet'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Problems Sheet ({STRIVERS_A2Z_QUESTIONS.length})</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setViewMode('theory');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              viewMode === 'theory'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>A2Z Theory Masterclass (18 Steps)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-purple-500/30 text-purple-200 text-[10px] font-mono border border-purple-400/40">
              NEW
            </span>
          </button>
        </div>

        {viewMode === 'sheet' && selectedStepId !== 'all' && (
          <button
            onClick={() => {
              sound.playPop();
              setViewMode('theory');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 hover:text-white border border-purple-500/40 text-xs font-semibold transition cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Read Step {selectedStepObj?.stepNumber} Theory Masterclass ↗</span>
          </button>
        )}
      </div>

      {viewMode === 'theory' ? (
        <StriversTheoryViewer
          initialStepId={selectedStepId === 'all' ? 'step-1' : selectedStepId}
          onGoToProblems={(stepId) => {
            setSelectedStepId(stepId);
            setSelectedSubStepId('all');
            setViewMode('sheet');
          }}
        />
      ) : (
        <>
          {/* 3. Step Selector Horizontal Carousel */}
          <div className="space-y-2">
        <div className="flex items-center justify-between text-xs px-1">
          <span className="font-mono text-slate-400 uppercase font-semibold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Select Step (1 to 18)</span>
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            {selectedStepId === 'all' ? 'Showing All 18 Steps' : selectedStepObj?.title}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          <button
            onClick={() => {
              sound.playPop();
              setSelectedStepId('all');
              setSelectedSubStepId('all');
            }}
            className={`px-3.5 py-2 rounded-2xl whitespace-nowrap text-xs font-bold transition cursor-pointer shrink-0 border ${
              selectedStepId === 'all'
                ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md scale-[1.02]'
                : 'bg-[#0a0d18] text-slate-300 border-white/10 hover:bg-white/[0.08] hover:text-white'
            }`}
          >
            All Steps ({STRIVERS_A2Z_QUESTIONS.length})
          </button>

          {STRIVERS_A2Z_STEPS.map((step) => {
            const stepQuestions = STRIVERS_A2Z_QUESTIONS.filter((q) => q.stepId === step.id);
            const stepSolved = stepQuestions.filter((q) => solvedIds.has(q.id)).length;
            const isSelected = selectedStepId === step.id;

            return (
              <button
                key={step.id}
                onClick={() => {
                  sound.playPop();
                  setSelectedStepId(step.id);
                  setSelectedSubStepId('all');
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl whitespace-nowrap text-xs transition cursor-pointer shrink-0 border text-left ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-md scale-[1.02]'
                    : 'bg-[#0a0d18] text-slate-300 border-white/10 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                <span>{step.icon}</span>
                <span className="max-w-[170px] truncate">{step.title.replace('Step ', '')}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-slate-950/20 text-slate-950 font-black'
                      : 'bg-white/[0.06] text-slate-400 border border-white/10'
                  }`}
                >
                  {stepSolved}/{stepQuestions.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Sub-Step Filter Pills (if a specific step is selected) */}
      {selectedStepObj && selectedStepId !== 'all' && (
        <div className="bg-[#090c17] border border-white/10 rounded-2xl p-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-mono text-amber-400 font-bold shrink-0">Sub-Topic:</span>
          <button
            onClick={() => {
              sound.playPop();
              setSelectedSubStepId('all');
            }}
            className={`px-3 py-1 rounded-xl transition cursor-pointer text-xs ${
              selectedSubStepId === 'all'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'bg-white/[0.04] text-slate-300 border border-white/10 hover:text-white'
            }`}
          >
            All Sub-Topics
          </button>
          {selectedStepObj.subSteps.map((sub) => {
            const subCount = STRIVERS_A2Z_QUESTIONS.filter((q) => q.subStepId === sub.id).length;
            const subSolved = STRIVERS_A2Z_QUESTIONS.filter((q) => q.subStepId === sub.id && solvedIds.has(q.id)).length;
            const isSubSelected = selectedSubStepId === sub.id;

            return (
              <button
                key={sub.id}
                onClick={() => {
                  sound.playPop();
                  setSelectedSubStepId(sub.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl transition cursor-pointer text-xs ${
                  isSubSelected
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'bg-white/[0.04] text-slate-300 border border-white/10 hover:text-white'
                }`}
              >
                <span>{sub.title}</span>
                <span className="text-[10px] font-mono opacity-80">
                  ({subSolved}/{subCount})
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* 4. Search and Toolbar Deck */}
      <div className="bg-[#0a0d18] border border-white/10 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems by name, topic, or tag (e.g. 'Kadane', 'Two Sum')..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Difficulty Dropdown */}
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as any)}
            className="bg-[#0b0e1c] text-slate-200 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy ({statsMeta.easy})</option>
            <option value="Medium">Medium ({statsMeta.medium})</option>
            <option value="Hard">Hard ({statsMeta.hard})</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-[#0b0e1c] text-slate-200 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="unsolved">Unsolved Only</option>
            <option value="solved">Solved Only ({solvedIds.size})</option>
            <option value="starred">Revision Starred ({starredIds.size})</option>
          </select>

          {/* Result Count Badge */}
          <span className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-400 font-mono text-xs">
            {filteredQuestions.length} Questions
          </span>
        </div>
      </div>

      {/* 5. Questions Table / Card List */}
      <div className="bg-[#090b16] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 mx-auto flex items-center justify-center text-xl">
              🔍
            </div>
            <h3 className="text-base font-bold text-white">No Matching Questions Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search query, difficulty, or step filter to reveal more problems.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStepId('all');
                setSelectedSubStepId('all');
                setDifficultyFilter('all');
                setStatusFilter('all');
              }}
              className="px-4 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.06]">
            {filteredQuestions.map((q) => {
              const isSolved = solvedIds.has(q.id);
              const isStarred = starredIds.has(q.id);
              const isHintOpen = expandedHints.has(q.id);

              return (
                <div
                  key={q.id}
                  className={`p-3.5 sm:p-4.5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                    isSolved
                      ? 'bg-emerald-950/[0.08] hover:bg-emerald-950/[0.14]'
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Left: Checkbox, Number, Title & Sub-Topic */}
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    {/* Solve Checkbox */}
                    <button
                      onClick={() => toggleSolved(q.id)}
                      className="mt-0.5 text-slate-400 hover:text-emerald-400 transition cursor-pointer shrink-0"
                      title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved (+10 XP)'}
                    >
                      {isSolved ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>

                    {/* Star / Revision Button */}
                    <button
                      onClick={() => toggleStarred(q.id)}
                      className="mt-0.5 text-slate-500 hover:text-amber-400 transition cursor-pointer shrink-0"
                      title={isStarred ? 'Remove from Revision' : 'Add to Revision List'}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          isStarred ? 'fill-amber-400 text-amber-400' : 'text-slate-600 hover:text-amber-400'
                        }`}
                      />
                    </button>

                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400 bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/10">
                          #{q.questionNumber}
                        </span>

                        <span className="text-[10px] font-mono text-amber-300 font-semibold">
                          {q.subStepTitle}
                        </span>

                        <span
                          className={`text-[10px] font-mono px-2 py-0.2 rounded-full border ${getDifficultyBadge(
                            q.difficulty
                          )}`}
                        >
                          {q.difficulty}
                        </span>

                        <span className="text-[9px] font-mono text-slate-400">
                          ⏱️ {q.timeComplexity} | 💾 {q.spaceComplexity}
                        </span>
                      </div>

                      <h4
                        className={`text-sm font-bold tracking-tight ${
                          isSolved ? 'line-through text-slate-400' : 'text-white'
                        }`}
                      >
                        {q.title}
                      </h4>

                      {/* Expandable Hint */}
                      {isHintOpen && (
                        <div className="p-2.5 rounded-xl bg-amber-400/[0.08] border border-amber-400/20 text-xs text-amber-200/90 font-mono mt-1 animate-in fade-in duration-150">
                          <span className="font-bold text-amber-400">💡 Key Intuition: </span>
                          {q.hint}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions (Hint, Video, Solve, LeetCode) */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0 pt-1 md:pt-0">
                    {/* Hint Toggle */}
                    <button
                      onClick={() => toggleHint(q.id)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs transition cursor-pointer"
                      title="Reveal Algorithmic Hint"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isHintOpen ? 'Hide Hint' : 'Hint'}</span>
                    </button>

                    {/* Video Tutorial or Editorial Button */}
                    {q.youtubeId ? (
                      <button
                        onClick={() => {
                          sound.playPop();
                          setActiveVideoQuestion(q);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 hover:text-white border border-red-500/30 text-xs font-semibold transition cursor-pointer shadow-sm"
                        title="Watch Striver's Video Editorial"
                      >
                        <Play className="w-3 h-3 fill-red-400 text-red-400" />
                        <span>Video</span>
                      </button>
                    ) : (
                      <a
                        href={q.tufUrl || `https://www.youtube.com/results?search_query=take+u+forward+${encodeURIComponent(q.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-semibold transition cursor-pointer shadow-sm"
                        title="Open TakeUForward Editorial Guide"
                      >
                        <ExternalLink className="w-3 h-3 text-purple-400" />
                        <span>Editorial</span>
                      </a>
                    )}

                    {/* Code & Solve Button */}
                    <button
                      onClick={() => {
                        sound.playPop();
                        setActiveCodeQuestion(q);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer"
                      title="Open Multi-Language Code Editor"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Code &amp; Solve</span>
                    </button>

                    {/* External LeetCode / Article Links */}
                    {q.leetcodeUrl && (
                      <a
                        href={q.leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/10 transition cursor-pointer"
                        title="Practice on LeetCode / External Judge"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      </>
      )}

      {/* 6. Embedded Video Tutorial Modal */}
      {activeVideoQuestion && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150">
          <div className="bg-[#0b0e1b] border border-white/15 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-4 bg-white/[0.04] border-b border-white/10 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                  <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                    Take U Forward Editorial
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs text-slate-400 font-mono">
                    #{activeVideoQuestion.questionNumber} {activeVideoQuestion.subStepTitle}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                  {activeVideoQuestion.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveVideoQuestion(null)}
                className="p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white border border-white/10 transition cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Responsive Video Frame */}
            <div className="relative w-full aspect-video bg-black overflow-hidden">
              <iframe
                title="striver-video-tutorial"
                src={`https://www.youtube.com/embed/${activeVideoQuestion.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                className="absolute inset-0 w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Direct Playback Fallback Ribbon */}
            <div className="px-4 py-2 bg-slate-900 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300">Striver's Take U Forward Editorial</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideoQuestion.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 cursor-pointer"
                >
                  <span>Open on YouTube ↗</span>
                </a>
                {activeVideoQuestion.tufUrl && (
                  <a
                    href={activeVideoQuestion.tufUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 cursor-pointer"
                  >
                    <span>TUF Article ↗</span>
                  </a>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white/[0.02] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSolved(activeVideoQuestion.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    solvedIds.has(activeVideoQuestion.id)
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-white/[0.06] text-slate-300 border-white/10 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    {solvedIds.has(activeVideoQuestion.id) ? 'Marked as Solved' : 'Mark as Solved (+10 XP)'}
                  </span>
                </button>

                <button
                  onClick={() => toggleStarred(activeVideoQuestion.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 border border-white/10 transition cursor-pointer text-xs"
                >
                  <Star
                    className={`w-3.5 h-3.5 ${
                      starredIds.has(activeVideoQuestion.id) ? 'fill-amber-400 text-amber-400' : 'text-slate-400'
                    }`}
                  />
                  <span>{starredIds.has(activeVideoQuestion.id) ? 'Starred' : 'Star for Revision'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideoQuestion.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 cursor-pointer"
                >
                  <span>Open directly on YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Code Sandbox Modal */}
      {activeCodeQuestion && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 animate-in fade-in duration-150">
          <div className="bg-[#0b0e1b] border border-white/15 rounded-3xl max-w-5xl w-full h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="p-3.5 sm:p-4 bg-white/[0.04] border-b border-white/10 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-400/30">
                    Striver A2Z #{activeCodeQuestion.questionNumber}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getDifficultyBadge(
                      activeCodeQuestion.difficulty
                    )}`}
                  >
                    {activeCodeQuestion.difficulty}
                  </span>
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                    {activeCodeQuestion.subStepTitle}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                  {activeCodeQuestion.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSolved(activeCodeQuestion.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    solvedIds.has(activeCodeQuestion.id)
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-white/[0.06] text-slate-300 border-white/10 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">
                    {solvedIds.has(activeCodeQuestion.id) ? 'Solved' : 'Mark Done'}
                  </span>
                </button>

                <button
                  onClick={() => setActiveCodeQuestion(null)}
                  className="p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white border border-white/10 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Editor Body */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <UniversalVSCodeEditor
                language={codeLanguage}
                problemTitle={activeCodeQuestion.title}
                problemId={activeCodeQuestion.id}
                starterCode={`// Striver's A2Z DSA Sheet: ${activeCodeQuestion.title}
// Difficulty: ${activeCodeQuestion.difficulty} | ${activeCodeQuestion.subStepTitle}
// Time Complexity: ${activeCodeQuestion.timeComplexity} | Space Complexity: ${activeCodeQuestion.spaceComplexity}
// Key Intuition: ${activeCodeQuestion.hint}

#include <iostream>
#include <vector>
#include <algorithm>
#include <unordered_map>
using namespace std;

class Solution {
public:
    // Implement your optimal solution below:
    void solve() {
        cout << "Testing solution for ${activeCodeQuestion.title}..." << endl;
    }
};

int main() {
    Solution s;
    s.solve();
    return 0;
}
`}
                onSolve={() => toggleSolved(activeCodeQuestion.id)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
