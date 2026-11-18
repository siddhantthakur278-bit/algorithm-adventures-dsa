import React, { useState, useEffect, useMemo } from 'react';
import {
  CALCULUS_SUBJECT,
  CALCULUS_UNITS,
  CALCULUS_PRACTICE_QUESTIONS,
  CALCULUS_FORMULAS,
  CalculusPracticeQuestion,
  CalculusDifficulty,
} from '../../data/calculusData';
import { useCourse } from '../../context/CourseContext';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  Video,
  Play,
  BookOpen,
  Sparkles,
  Trophy,
  CheckCircle2,
  Circle,
  HelpCircle,
  Code2,
  Sliders,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Flame,
  Award,
  Zap,
  TrendingUp,
  RotateCcw,
  Search,
  Sigma,
  ArrowRight,
} from 'lucide-react';

const STORAGE_KEY_CALC_SOLVED = 'ada_calculus_solved_questions';
const STORAGE_KEY_CALC_LECTURES = 'ada_calculus_completed_lectures';

export const CalculusHub: React.FC = () => {
  const { addXP, triggerBurst } = useCourse();

  // Active Hub Tab
  const [activeTab, setActiveTab] = useState<'lectures' | 'practice' | 'visualizer' | 'formulas'>('practice');

  // Persistence State
  const [solvedQuestions, setSolvedQuestions] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CALC_SOLVED);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [completedLectures, setCompletedLectures] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CALC_LECTURES);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Lectures Tab State
  const [selectedUnitId, setSelectedUnitId] = useState<string>('all');
  const [activeLectureId, setActiveLectureId] = useState<string>(CALCULUS_SUBJECT.lectures[0].id);
  const [lectureSearch, setLectureSearch] = useState<string>('');

  // Practice Tab State
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | CalculusDifficulty>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [practiceSearch, setPracticeSearch] = useState<string>('');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({});
  const [userSelectedOption, setUserSelectedOption] = useState<Record<string, string>>({});
  const [questionFeedback, setQuestionFeedback] = useState<Record<string, { ok: boolean; msg: string }>>({});

  // Visualizer Tab State (Riemann Sum & Tangent Simulator)
  const [simMode, setSimMode] = useState<'tangent' | 'riemann'>('riemann');
  // Tangent parameters
  const [tangentFunc, setTangentFunc] = useState<'x2' | 'sin' | 'x3'>('x2');
  const [tangentX, setTangentX] = useState<number>(1.5);
  const [tangentH, setTangentH] = useState<number>(1.0);
  // Riemann parameters
  const [riemannFunc, setRiemannFunc] = useState<'x2' | 'sqrt' | 'parabola'>('x2');
  const [riemannN, setRiemannN] = useState<number>(8);
  const [riemannMethod, setRiemannMethod] = useState<'left' | 'right' | 'midpoint' | 'trapezoid'>('midpoint');
  const [riemannA, setRiemannA] = useState<number>(0);
  const [riemannB, setRiemannB] = useState<number>(3);

  // Active Lecture Lookup
  const activeLecture = useMemo(() => {
    return (
      CALCULUS_SUBJECT.lectures.find((l) => l.id === activeLectureId) ||
      CALCULUS_SUBJECT.lectures[0]
    );
  }, [activeLectureId]);

  // Filtered Lectures
  const filteredLectures = useMemo(() => {
    return CALCULUS_SUBJECT.lectures.filter((lec) => {
      if (selectedUnitId !== 'all') {
        const unit = CALCULUS_UNITS.find((u) => u.id === selectedUnitId);
        if (unit && !unit.lectureIds.includes(lec.id)) return false;
      }
      if (lectureSearch.trim()) {
        const q = lectureSearch.toLowerCase();
        return (
          lec.title.toLowerCase().includes(q) ||
          lec.topics.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedUnitId, lectureSearch]);

  // Filtered Practice Questions
  const filteredQuestions = useMemo(() => {
    return CALCULUS_PRACTICE_QUESTIONS.filter((q) => {
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;
      if (selectedTopic !== 'All' && q.topic !== selectedTopic) return false;
      if (practiceSearch.trim()) {
        const query = practiceSearch.toLowerCase();
        return (
          q.title.toLowerCase().includes(query) ||
          q.statement.toLowerCase().includes(query) ||
          q.topic.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedDifficulty, selectedTopic, practiceSearch]);

  // Unique Topics
  const allTopics = useMemo(() => {
    const set = new Set<string>();
    CALCULUS_PRACTICE_QUESTIONS.forEach((q) => set.add(q.topic));
    return Array.from(set);
  }, []);

  // Handlers
  const handleToggleLectureComplete = (id: string) => {
    sound.playSuccess();
    setCompletedLectures((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        next.add(id);
        addXP(50);
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
        if (triggerBurst) {
          triggerBurst('🎓 Calculus Lecture Watched!', '+50 XP awarded for mastering single variable calculus!', 'zap');
        }
      }
      try {
        localStorage.setItem(STORAGE_KEY_CALC_LECTURES, JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  const handleSelectOption = (qid: string, optId: string) => {
    setUserSelectedOption((prev) => ({ ...prev, [qid]: optId }));
    const question = CALCULUS_PRACTICE_QUESTIONS.find((q) => q.id === qid);
    if (!question || !question.options) return;

    const opt = question.options.find((o) => o.id === optId);
    if (opt?.isCorrect) {
      sound.playSuccess();
      setQuestionFeedback((prev) => ({
        ...prev,
        [qid]: { ok: true, msg: '🎉 Correct! Mathematical derivation verified.' },
      }));
      handleMarkQuestionSolved(qid, question.xp);
    } else {
      sound.playThud?.();
      setQuestionFeedback((prev) => ({
        ...prev,
        [qid]: { ok: false, msg: 'Incorrect choice. Review hints or check the step-by-step walkthrough!' },
      }));
    }
  };

  const handleMarkQuestionSolved = (id: string, xpReward: number) => {
    if (solvedQuestions.has(id)) return;
    confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
    setSolvedQuestions((prev) => {
      const next = new Set(prev);
      next.add(id);
      try {
        localStorage.setItem(STORAGE_KEY_CALC_SOLVED, JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
    addXP(xpReward);
  };

  // Toggle Solution / Hint
  const toggleSolution = (qid: string) => {
    sound.playPop();
    setExpandedSolutions((prev) => ({ ...prev, [qid]: !prev[qid] }));
  };

  const toggleHint = (qid: string) => {
    sound.playPop();
    setExpandedHints((prev) => ({ ...prev, [qid]: !prev[qid] }));
  };

  // ==============================================================
  // MATHEMATICAL SIMULATOR CALCULATIONS
  // ==============================================================
  const evaluateFunc = (fType: string, x: number): number => {
    switch (fType) {
      case 'x2':
        return x * x;
      case 'sin':
        return Math.sin(x) * 2;
      case 'x3':
        return 0.25 * (x * x * x - 3 * x);
      case 'sqrt':
        return Math.sqrt(Math.max(0, x)) * 2;
      case 'parabola':
        return Math.max(0, 4 * x - x * x);
      default:
        return x * x;
    }
  };

  const evaluateDerivative = (fType: string, x: number): number => {
    switch (fType) {
      case 'x2':
        return 2 * x;
      case 'sin':
        return 2 * Math.cos(x);
      case 'x3':
        return 0.25 * (3 * x * x - 3);
      default:
        return 2 * x;
    }
  };

  // Exact Definite Integral for Riemann Demo
  const exactRiemannIntegral = useMemo(() => {
    const a = riemannA;
    const b = riemannB;
    if (riemannFunc === 'x2') {
      return (b ** 3 - a ** 3) / 3;
    } else if (riemannFunc === 'sqrt') {
      return (2 / 3) * 2 * (b ** 1.5 - a ** 1.5);
    } else if (riemannFunc === 'parabola') {
      // 4x - x^2 -> 2x^2 - x^3 / 3
      const F = (x: number) => 2 * x * x - (x ** 3) / 3;
      return F(b) - F(a);
    }
    return 9;
  }, [riemannFunc, riemannA, riemannB]);

  // Riemann Numerical Calculation & Rectangles
  const riemannRectangles = useMemo(() => {
    const rects: { x: number; width: number; height: number; sampleX: number }[] = [];
    const dx = (riemannB - riemannA) / riemannN;
    let sum = 0;

    for (let i = 0; i < riemannN; i++) {
      const left = riemannA + i * dx;
      const right = left + dx;
      let sampleX = left;

      if (riemannMethod === 'left') sampleX = left;
      else if (riemannMethod === 'right') sampleX = right;
      else if (riemannMethod === 'midpoint') sampleX = (left + right) / 2;
      else if (riemannMethod === 'trapezoid') {
        const h = (evaluateFunc(riemannFunc, left) + evaluateFunc(riemannFunc, right)) / 2;
        rects.push({ x: left, width: dx, height: h, sampleX: (left + right) / 2 });
        sum += h * dx;
        continue;
      }

      const h = Math.max(0, evaluateFunc(riemannFunc, sampleX));
      rects.push({ x: left, width: dx, height: h, sampleX });
      sum += h * dx;
    }

    return { rects, sum, dx };
  }, [riemannFunc, riemannA, riemannB, riemannN, riemannMethod]);

  const riemannPercentageError = useMemo(() => {
    if (Math.abs(exactRiemannIntegral) < 1e-6) return 0;
    return Math.abs((riemannRectangles.sum - exactRiemannIntegral) / exactRiemannIntegral) * 100;
  }, [riemannRectangles.sum, exactRiemannIntegral]);

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Course Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-950 via-[#131131] to-[#090b1c] border border-violet-500/30 p-5 sm:p-7 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/40 text-xs font-mono font-bold flex items-center gap-1.5">
                <Sigma className="w-3.5 h-3.5 text-violet-400" />
                MATH 101 · University Calculus 1
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                Instructor: Professor Leonard
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              Calculus 1: Limits, Derivatives &amp; Integrals
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Complete college-level single-variable calculus based on Professor Leonard's renowned 32 full-length lecture series. Master limits, differentiation rules, implicit rates, MVT, curve sketching, optimization, Riemann sums, FTC, and volume integrals.
            </p>
          </div>

          {/* Quick Progress Cards */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-center min-w-[100px]">
              <div className="text-xs text-slate-400 font-medium">Lectures</div>
              <div className="text-lg font-bold text-violet-400 font-mono">
                {completedLectures.size} / 32
              </div>
              <div className="text-[10px] text-slate-500">Watched</div>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-center min-w-[100px]">
              <div className="text-xs text-slate-400 font-medium">Practice Qs</div>
              <div className="text-lg font-bold text-amber-400 font-mono">
                {solvedQuestions.size} / {CALCULUS_PRACTICE_QUESTIONS.length}
              </div>
              <div className="text-[10px] text-slate-500">Solved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 overflow-x-auto gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('practice');
              sound.playPop();
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'practice'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Practice Arena ({CALCULUS_PRACTICE_QUESTIONS.length} Qs)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('lectures');
              sound.playPop();
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'lectures'
                ? 'bg-violet-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>All 32 Lectures</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('visualizer');
              sound.playPop();
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'visualizer'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Interactive Simulator</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('formulas');
              sound.playPop();
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
              activeTab === 'formulas'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Formula Vault</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: PRACTICE ARENA (Easy, Medium, Hard, Extreme)           */}
      {/* ============================================================== */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          {/* Difficulty Filter Bar */}
          <div className="bg-[#0b0e1c] p-4 rounded-2xl border border-white/10 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-xs font-mono font-bold text-slate-400 mr-1 hidden sm:inline">
                  Tiers:
                </span>
                {(['All', 'Easy', 'Medium', 'Hard', 'Extreme'] as const).map((tier) => {
                  const count =
                    tier === 'All'
                      ? CALCULUS_PRACTICE_QUESTIONS.length
                      : CALCULUS_PRACTICE_QUESTIONS.filter((q) => q.difficulty === tier).length;
                  const isSelected = selectedDifficulty === tier;
                  const tierColors: Record<string, string> = {
                    All: 'bg-white/10 text-white',
                    Easy: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
                    Medium: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
                    Hard: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
                    Extreme: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
                  };

                  return (
                    <button
                      key={tier}
                      onClick={() => {
                        setSelectedDifficulty(tier);
                        sound.playPop();
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 border whitespace-nowrap ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                          : `border-white/10 text-slate-300 hover:text-white ${tierColors[tier]}`
                      }`}
                    >
                      <span>
                        {tier === 'Easy' && '🟢'}
                        {tier === 'Medium' && '🟡'}
                        {tier === 'Hard' && '🔴'}
                        {tier === 'Extreme' && '🟣'}
                        {tier === 'All' && '⚡'}
                      </span>
                      <span>{tier}</span>
                      <span className="text-[10px] font-mono opacity-80">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={practiceSearch}
                  onChange={(e) => setPracticeSearch(e.target.value)}
                  placeholder="Search problem, theorem, rule..."
                  className="bg-black/40 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 w-full sm:w-64"
                />
              </div>
            </div>

            {/* Topic Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 text-xs">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider hidden sm:inline">
                Topic:
              </span>
              <button
                onClick={() => setSelectedTopic('All')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedTopic === 'All'
                    ? 'bg-white/20 text-white'
                    : 'text-slate-400 hover:text-white bg-white/5'
                }`}
              >
                All Topics
              </button>
              {allTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => {
                    setSelectedTopic(topic);
                    sound.playPop();
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    selectedTopic === topic
                      ? 'bg-violet-500/30 text-violet-300 border border-violet-400/40'
                      : 'text-slate-400 hover:text-white bg-white/5'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Question Cards Grid */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const isSolved = solvedQuestions.has(q.id);
              const isSolutionOpen = expandedSolutions[q.id];
              const isHintOpen = expandedHints[q.id];
              const feedback = questionFeedback[q.id];
              const userOpt = userSelectedOption[q.id];

              const badgeColors: Record<CalculusDifficulty, string> = {
                Easy: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
                Medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
                Hard: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
                Extreme: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
              };

              return (
                <div
                  key={q.id}
                  className={`rounded-2xl border transition p-5 space-y-4 ${
                    isSolved
                      ? 'bg-[#0d161a] border-emerald-500/30'
                      : 'bg-[#0a0d1a] border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Top Bar: Difficulty, Topic, XP, Solved */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono border ${badgeColors[q.difficulty]}`}
                      >
                        {q.difficulty.toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/5">
                        {q.topic}
                      </span>
                      <span className="text-xs text-amber-400 font-mono font-bold flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        +{q.xp} XP
                      </span>
                    </div>

                    <button
                      onClick={() => handleMarkQuestionSolved(q.id, q.xp)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                        isSolved
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                      }`}
                    >
                      {isSolved ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Solved</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-3.5 h-3.5 text-slate-500" />
                          <span>Mark Solved</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Title & Statement */}
                  <div>
                    <h3 className="text-base font-bold text-white mb-2">{q.title}</h3>
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-slate-200 text-sm font-mono whitespace-pre-wrap leading-relaxed">
                      {q.statement}
                    </div>
                  </div>

                  {/* Interactive Multiple Choice Options */}
                  {q.options && q.options.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-slate-400">
                        Select Answer:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt) => {
                          const isPicked = userOpt === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleSelectOption(q.id, opt.id)}
                              className={`p-2.5 rounded-xl border text-xs text-left font-mono font-semibold transition cursor-pointer flex items-center justify-between ${
                                isPicked
                                  ? opt.isCorrect
                                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                                    : 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                                  : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/10 text-slate-300'
                              }`}
                            >
                              <span>{opt.label}</span>
                              {isPicked && (
                                <span>{opt.isCorrect ? '✅' : '❌'}</span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {feedback && (
                        <div
                          className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                            feedback.ok
                              ? 'bg-emerald-500/10 text-emerald-300'
                              : 'bg-rose-500/10 text-rose-300'
                          }`}
                        >
                          <span>{feedback.msg}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Hints & Solution Toggles */}
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                    <button
                      onClick={() => toggleHint(q.id)}
                      className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isHintOpen ? 'Hide Hints' : 'View Hints'}</span>
                    </button>

                    <button
                      onClick={() => toggleSolution(q.id)}
                      className="px-3 py-1 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 text-xs font-semibold text-violet-300 border border-violet-500/30 transition cursor-pointer flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{isSolutionOpen ? 'Hide Full Solution' : 'View Step-by-Step Proof'}</span>
                    </button>
                  </div>

                  {/* Accordion: Hints */}
                  {isHintOpen && (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-2 text-xs text-amber-200 animate-in fade-in">
                      <strong className="text-amber-300 font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Mathematical Hints:
                      </strong>
                      <ul className="list-disc list-inside space-y-1">
                        {q.hints.map((h, idx) => (
                          <li key={idx}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Accordion: Step-by-Step Solution & SymPy Code */}
                  {isSolutionOpen && (
                    <div className="p-4 rounded-xl bg-[#070914] border border-violet-500/30 space-y-3 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <strong className="text-violet-400 text-xs font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          Complete Analytical Solution Walkthrough
                        </strong>
                        <span className="text-xs text-emerald-400 font-mono font-bold">
                          Final Answer: {q.finalAnswer}
                        </span>
                      </div>

                      <div className="space-y-2 text-xs text-slate-300 leading-relaxed font-mono">
                        {q.solutionSteps.map((step, idx) => (
                          <p key={idx} className="bg-white/[0.02] p-2 rounded border border-white/5">
                            {step}
                          </p>
                        ))}
                      </div>

                      {/* Python SymPy Verification Code Box */}
                      <div className="p-3 rounded-lg bg-black border border-white/10 space-y-1">
                        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Executable Python SymPy Verification</span>
                        </div>
                        <pre className="text-[11px] text-cyan-300 font-mono overflow-x-auto">
                          {q.verificationCode}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: ALL 32 LECTURES BY PROFESSOR LEONARD                    */}
      {/* ============================================================== */}
      {activeTab === 'lectures' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Video Player & Active Lecture Notes (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl relative">
              <iframe
                src={`https://www.youtube.com/embed/${activeLecture.videoId}?autoplay=0&rel=0`}
                title={activeLecture.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Video Meta & Action */}
            <div className="p-5 rounded-2xl bg-[#0b0e1c] border border-white/10 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 text-xs font-mono font-bold">
                      Lecture #{activeLecture.lectureNumber}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      ⏱️ {activeLecture.duration}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white mt-1">{activeLecture.title}</h2>
                </div>

                <button
                  onClick={() => handleToggleLectureComplete(activeLecture.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0 ${
                    completedLectures.has(activeLecture.id)
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg'
                  }`}
                >
                  {completedLectures.has(activeLecture.id) ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Mark Watched (+50 XP)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Topics Covered */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-slate-400 font-semibold mr-1">Topics:</span>
                {activeLecture.topics.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Detailed Academic Notes */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Professor Leonard's Board Notes &amp; Formulas
                </h4>
                <div className="text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
                  {activeLecture.detailedNotes}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Syllabus Units & 32 Lecture List (1 Col) */}
          <div className="space-y-4">
            {/* Unit Selector */}
            <div className="p-4 rounded-2xl bg-[#0b0e1c] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Course Units
                </h3>
                <span className="text-[11px] font-mono text-violet-400 font-bold">
                  {completedLectures.size}/32 Done
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setSelectedUnitId('all')}
                  className={`p-2 rounded-xl text-xs font-bold transition cursor-pointer text-left ${
                    selectedUnitId === 'all'
                      ? 'bg-violet-500 text-white'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  All 32 Lectures
                </button>
                {CALCULUS_UNITS.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => setSelectedUnitId(u.id)}
                    className={`p-2 rounded-xl text-xs font-semibold transition cursor-pointer text-left truncate ${
                      selectedUnitId === u.id
                        ? 'bg-violet-500 text-white font-bold'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                    title={u.title}
                  >
                    {u.icon} Unit {u.number}
                  </button>
                ))}
              </div>

              {/* Search */}
              <input
                type="text"
                value={lectureSearch}
                onChange={(e) => setLectureSearch(e.target.value)}
                placeholder="Search 32 lectures..."
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-400"
              />
            </div>

            {/* Lecture Playlist Scrollbox */}
            <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
              {filteredLectures.map((lec) => {
                const isActive = lec.id === activeLectureId;
                const isDone = completedLectures.has(lec.id);
                return (
                  <button
                    key={lec.id}
                    onClick={() => {
                      setActiveLectureId(lec.id);
                      sound.playPop();
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition cursor-pointer flex items-start gap-2.5 ${
                      isActive
                        ? 'bg-violet-500/20 border-violet-400 text-white shadow-md'
                        : isDone
                        ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-300 hover:bg-emerald-500/10'
                        : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="pt-0.5">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : isActive ? (
                        <Play className="w-4 h-4 text-violet-400 fill-violet-400 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{lec.title}</div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                        <span>⏱️ {lec.duration}</span>
                        <span>•</span>
                        <span>{lec.difficulty}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: INTERACTIVE CALCULUS GRAPHING SIMULATOR                */}
      {/* ============================================================== */}
      {activeTab === 'visualizer' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[#0b0e1c] border border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Calculus Interactive Grapher &amp; Numerical Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Visualize how limits converge to tangent lines, and how Riemann sums approximate definite integrals.
              </p>
            </div>

            <div className="flex items-center gap-2 p-1 bg-black/40 rounded-xl border border-white/10">
              <button
                onClick={() => setSimMode('riemann')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  simMode === 'riemann'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Riemann Sums (Area Under Curve)
              </button>
              <button
                onClick={() => setSimMode('tangent')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  simMode === 'tangent'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Tangent &amp; Secant Convergence
              </button>
            </div>
          </div>

          {/* SIMULATOR: RIEMANN SUMS */}
          {simMode === 'riemann' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Controls */}
              <div className="p-5 rounded-2xl bg-[#0b0e1c] border border-white/10 space-y-4">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Riemann Configuration
                </h3>

                {/* Function Choice */}
                <div>
                  <label className="text-xs text-slate-400 font-semibold">Function f(x):</label>
                  <select
                    value={riemannFunc}
                    onChange={(e) => setRiemannFunc(e.target.value as any)}
                    className="w-full mt-1 bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="x2">f(x) = x² (Parabola)</option>
                    <option value="sqrt">f(x) = 2√x (Square Root)</option>
                    <option value="parabola">f(x) = 4x - x² (Inverted Parabola)</option>
                  </select>
                </div>

                {/* Riemann Method */}
                <div>
                  <label className="text-xs text-slate-400 font-semibold">Summation Method:</label>
                  <div className="grid grid-cols-2 gap-1.5 mt-1">
                    {(['left', 'right', 'midpoint', 'trapezoid'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setRiemannMethod(m)}
                        className={`p-2 rounded-lg text-xs font-semibold capitalize transition cursor-pointer ${
                          riemannMethod === m
                            ? 'bg-cyan-500 text-slate-950 font-bold'
                            : 'bg-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {m} Sum
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number of Rectangles Slider (n) */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Number of Partitions (n):</span>
                    <span className="font-bold font-mono text-cyan-400 text-sm">{riemannN}</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="40"
                    value={riemannN}
                    onChange={(e) => setRiemannN(parseInt(e.target.value, 10))}
                    className="w-full mt-2 accent-cyan-400 cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-500 mt-1">
                    Δx = ({riemannB} - {riemannA}) / {riemannN} = {(riemannRectangles.dx).toFixed(3)}
                  </div>
                </div>

                {/* Telemetry Results Box */}
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Exact Integral (FTC):</span>
                    <span className="text-emerald-400 font-bold">{exactRiemannIntegral.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Riemann Sum (S_n):</span>
                    <span className="text-cyan-400 font-bold">{riemannRectangles.sum.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Error:</span>
                    <span className="text-amber-400 font-bold">{riemannPercentageError.toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              {/* Interactive SVG Canvas (2 Cols) */}
              <div className="lg:col-span-2 p-5 rounded-2xl bg-black border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2 text-xs font-mono text-slate-400">
                  <span>Graph of f(x) over [{riemannA}, {riemannB}]</span>
                  <span className="text-cyan-400">
                    lim_{'{n→∞}'} Σ f(x_i*) Δx = ∫_{riemannA}^{riemannB} f(x) dx
                  </span>
                </div>

                <div className="w-full h-80 relative flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 500 300">
                    {/* Grid lines */}
                    <line x1="40" y1="260" x2="480" y2="260" stroke="#334155" strokeWidth="2" />
                    <line x1="40" y1="20" x2="40" y2="260" stroke="#334155" strokeWidth="2" />

                    {/* Riemann Rectangles */}
                    {riemannRectangles.rects.map((r, i) => {
                      const scaleX = (x: number) => 40 + (x / 3.5) * 420;
                      const scaleY = (y: number) => 260 - (y / 10) * 230;
                      const xPos = scaleX(r.x);
                      const width = (r.width / 3.5) * 420;
                      const rectHeight = (r.height / 10) * 230;
                      const yPos = 260 - rectHeight;

                      return (
                        <rect
                          key={i}
                          x={xPos}
                          y={yPos}
                          width={width}
                          height={rectHeight}
                          fill="rgba(6, 182, 212, 0.25)"
                          stroke="#06b6d4"
                          strokeWidth="1.5"
                        />
                      );
                    })}

                    {/* Smooth Function Curve */}
                    <path
                      d={(() => {
                        let path = '';
                        for (let px = 0; px <= 3.5; px += 0.05) {
                          const sx = 40 + (px / 3.5) * 420;
                          const sy = 260 - (evaluateFunc(riemannFunc, px) / 10) * 230;
                          path += px === 0 ? `M ${sx} ${sy}` : ` L ${sx} ${sy}`;
                        }
                        return path;
                      })()}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                    />

                    {/* Labels */}
                    <text x="40" y="280" fill="#94a3b8" fontSize="12" fontFamily="monospace">x = 0</text>
                    <text x="400" y="280" fill="#94a3b8" fontSize="12" fontFamily="monospace">x = 3</text>
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* SIMULATOR: TANGENT & SECANT */}
          {simMode === 'tangent' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-[#0b0e1c] border border-white/10 space-y-4">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Tangent Convergence
                </h3>

                <div>
                  <label className="text-xs text-slate-400 font-semibold">Function f(x):</label>
                  <select
                    value={tangentFunc}
                    onChange={(e) => setTangentFunc(e.target.value as any)}
                    className="w-full mt-1 bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="x2">f(x) = x²</option>
                    <option value="sin">f(x) = 2 sin(x)</option>
                    <option value="x3">f(x) = 0.25(x³ - 3x)</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Point of Tangency (x₀):</span>
                    <span className="font-bold font-mono text-amber-400">{tangentX.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-2.0"
                    max="2.5"
                    step="0.1"
                    value={tangentX}
                    onChange={(e) => setTangentX(parseFloat(e.target.value))}
                    className="w-full mt-2 accent-amber-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Delta x (h → 0):</span>
                    <span className="font-bold font-mono text-cyan-400">{tangentH.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="2.0"
                    step="0.05"
                    value={tangentH}
                    onChange={(e) => setTangentH(parseFloat(e.target.value))}
                    className="w-full mt-2 accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Mathematical Slopes */}
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Secant Slope (m_sec):</span>
                    <span className="text-cyan-400 font-bold">
                      {((evaluateFunc(tangentFunc, tangentX + tangentH) - evaluateFunc(tangentFunc, tangentX)) / tangentH).toFixed(4)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Instantaneous f'(x₀):</span>
                    <span className="text-amber-400 font-bold">
                      {evaluateDerivative(tangentFunc, tangentX).toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tangent Canvas */}
              <div className="lg:col-span-2 p-5 rounded-2xl bg-black border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>Secant line (blue) converging to tangent line (yellow)</span>
                  <span className="text-amber-400">
                    f'(x₀) = lim_{'{h→0}'} [f(x₀+h) - f(x₀)] / h
                  </span>
                </div>

                <div className="w-full h-80 relative flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 500 300">
                    <line x1="250" y1="20" x2="250" y2="280" stroke="#334155" strokeWidth="1" />
                    <line x1="40" y1="150" x2="460" y2="150" stroke="#334155" strokeWidth="1" />

                    {/* Smooth Curve */}
                    <path
                      d={(() => {
                        let path = '';
                        for (let px = -3; px <= 3; px += 0.1) {
                          const sx = 250 + px * 60;
                          const sy = 150 - evaluateFunc(tangentFunc, px) * 25;
                          path += px === -3 ? `M ${sx} ${sy}` : ` L ${sx} ${sy}`;
                        }
                        return path;
                      })()}
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="3"
                    />

                    {/* Point (x0, f(x0)) */}
                    <circle
                      cx={250 + tangentX * 60}
                      cy={150 - evaluateFunc(tangentFunc, tangentX) * 25}
                      r="6"
                      fill="#f59e0b"
                    />

                    {/* Point (x0+h, f(x0+h)) */}
                    <circle
                      cx={250 + (tangentX + tangentH) * 60}
                      cy={150 - evaluateFunc(tangentFunc, tangentX + tangentH) * 25}
                      r="5"
                      fill="#06b6d4"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: FORMULA VAULT & THEOREMS CHEAT SHEET                    */}
      {/* ============================================================== */}
      {activeTab === 'formulas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CALCULUS_FORMULAS.map((cat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0a0d1a] border border-white/10 space-y-3"
            >
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {cat.category}
              </h3>

              <div className="space-y-2">
                {cat.formulas.map((f, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-slate-300">{f.name}</span>
                    <code className="text-cyan-300 font-mono font-bold bg-white/5 px-2 py-1 rounded">
                      {f.latex}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
