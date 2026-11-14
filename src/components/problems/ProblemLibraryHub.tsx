import React, { useState, useEffect, useMemo } from 'react';
import { useCourse } from '../../context/CourseContext';
import {
  getDSAProblemsIndex,
  getDSAProblemDetail,
  getCompanyStats,
  getPatternStats,
  formatCategoryName,
  DSAProblemIndexItem,
  DSAProblemDetail,
} from '../../utils/dsaProblemService';
import { ProblemMarkdownViewer } from './ProblemMarkdownViewer';
import { UniversalVSCodeEditor } from '../common/UniversalVSCodeEditor';
import { runPythonTests, RunResult } from '../../utils/pythonRunner';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  Building2,
  Sparkles,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Code2,
  X,
  Play,
  Send,
  Zap,
  HelpCircle,
  Shield,
  Layers,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Award,
} from 'lucide-react';
import { Problem, Difficulty } from '../../types';

// Company pill styling helper
const getCompanyBadgeClass = (company: string): string => {
  const c = company.toLowerCase();
  if (c.includes('amazon')) return 'bg-amber-950/40 text-amber-300 border-amber-800/60';
  if (c.includes('google')) return 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60';
  if (c.includes('microsoft')) return 'bg-sky-950/40 text-sky-300 border-sky-800/60';
  if (c.includes('meta') || c.includes('facebook')) return 'bg-blue-950/40 text-blue-300 border-blue-800/60';
  if (c.includes('apple')) return 'bg-zinc-800/60 text-zinc-200 border-zinc-700/60';
  if (c.includes('flipkart')) return 'bg-yellow-950/40 text-yellow-300 border-yellow-800/60';
  if (c.includes('adobe')) return 'bg-rose-950/40 text-rose-300 border-rose-800/60';
  if (c.includes('uber')) return 'bg-slate-900 text-slate-200 border-slate-700';
  if (c.includes('bloomberg')) return 'bg-purple-950/40 text-purple-300 border-purple-800/60';
  if (c.includes('goldman') || c.includes('morgan')) return 'bg-indigo-950/40 text-indigo-300 border-indigo-800/60';
  return 'bg-slate-800/60 text-slate-300 border-slate-700/60';
};

export const ProblemLibraryHub: React.FC = () => {
  const { stats, markProblemSolved, setActiveTab, triggerBurst } = useCourse();

  // State
  const [problems, setProblems] = useState<DSAProblemIndexItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [selectedPattern, setSelectedPattern] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'solved' | 'unsolved'>('all');
  const [sortBy, setSortBy] = useState<'id_asc' | 'id_desc' | 'diff_asc' | 'diff_desc' | 'ac_desc' | 'title'>('id_asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);

  // Active Problem Solver Studio Modal / Split View
  const [activeProblem, setActiveProblem] = useState<DSAProblemDetail | null>(null);
  const [loadingProblemDetail, setLoadingProblemDetail] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [isRunningTests, setIsRunningTests] = useState<boolean>(false);
  const [testRunResult, setTestRunResult] = useState<RunResult | null>(null);
  const [testMode, setTestMode] = useState<'example' | 'all'>('example');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isSolvingSuccess, setIsSolvingSuccess] = useState<boolean>(false);

  // Load index data on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getDSAProblemsIndex();
      setProblems(data);
      setLoading(false);
    }
    loadData();
  }, []);

  // Compute solved status helper
  const isProblemSolved = (id: number): boolean => {
    return (
      stats.solvedProblemIds.includes(String(id)) ||
      stats.solvedProblemIds.includes(`dsa-${id}`) ||
      stats.solvedProblemIds.includes(`prob-${id}`)
    );
  };

  // Company and Pattern Stats for dropdowns
  const companyStats = useMemo(() => getCompanyStats(problems), [problems]);
  const patternStats = useMemo(() => getPatternStats(problems), [problems]);

  // Solved Count across 1,010 problems
  const totalSolvedCount = useMemo(() => {
    return problems.filter((p) => isProblemSolved(p.id)).length;
  }, [problems, stats.solvedProblemIds]);

  // Filtered and Sorted Problems
  const filteredProblems = useMemo(() => {
    let result = problems;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const isNumSearch = /^\d+$/.test(q);
      const isHashNumSearch = /^#\d+$/.test(q);

      if (isNumSearch || isHashNumSearch) {
        const targetId = parseInt(q.replace('#', ''), 10);
        result = result.filter((p) => p.frontend_id === targetId || p.id === targetId);
      } else {
        result = result.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.slug.toLowerCase().includes(q) ||
            p.pattern_category.toLowerCase().includes(q) ||
            p.company_tags.some((c) => c.toLowerCase().includes(q))
        );
      }
    }

    // Company filter
    if (selectedCompany !== 'all') {
      result = result.filter((p) => p.company_tags.includes(selectedCompany));
    }

    // Pattern category filter
    if (selectedPattern !== 'all') {
      result = result.filter((p) => p.pattern_category === selectedPattern);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      result = result.filter((p) => p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());
    }

    // Status filter
    if (selectedStatus === 'solved') {
      result = result.filter((p) => isProblemSolved(p.id));
    } else if (selectedStatus === 'unsolved') {
      result = result.filter((p) => !isProblemSolved(p.id));
    }

    // Sorting
    const diffWeight: Record<string, number> = { Easy: 1, Medium: 2, Hard: 3 };
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'id_asc':
          return a.frontend_id - b.frontend_id;
        case 'id_desc':
          return b.frontend_id - a.frontend_id;
        case 'diff_asc':
          return (diffWeight[a.difficulty] || 2) - (diffWeight[b.difficulty] || 2);
        case 'diff_desc':
          return (diffWeight[b.difficulty] || 2) - (diffWeight[a.difficulty] || 2);
        case 'ac_desc':
          return parseFloat(b.ac_rate) - parseFloat(a.ac_rate);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return a.frontend_id - b.frontend_id;
      }
    });

    return result;
  }, [
    problems,
    searchQuery,
    selectedCompany,
    selectedPattern,
    selectedDifficulty,
    selectedStatus,
    sortBy,
    stats.solvedProblemIds,
  ]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProblems.length / pageSize) || 1;
  const paginatedProblems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProblems.slice(start, start + pageSize);
  }, [filteredProblems, currentPage, pageSize]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCompany, selectedPattern, selectedDifficulty, selectedStatus, sortBy]);

  // Open Problem Solver Studio
  const handleOpenSolver = async (id: number) => {
    setLoadingProblemDetail(true);
    sound.playPop();

    const detail = await getDSAProblemDetail(id);
    if (detail) {
      setActiveProblem(detail);
      setCode(detail.starter_code_python);
      setTestRunResult(null);
      setIsSolvingSuccess(false);
      setShowHint(false);
    }
    setLoadingProblemDetail(false);
  };

  // Close Problem Solver Studio
  const handleCloseSolver = () => {
    setActiveProblem(null);
    setTestRunResult(null);
    setIsSolvingSuccess(false);
  };

  // Feeling Lucky / Pick Random Problem
  const handleFeelingLucky = async () => {
    sound.playPop();
    const unsolvedList = filteredProblems.filter((p) => !isProblemSolved(p.id));
    const targetPool = unsolvedList.length > 0 ? unsolvedList : filteredProblems;
    if (targetPool.length === 0) return;

    const randomIndex = Math.floor(Math.random() * targetPool.length);
    const chosen = targetPool[randomIndex];
    await handleOpenSolver(chosen.id);
  };

  // Run Tests (Example or All)
  const handleRunTests = async (mode: 'example' | 'all') => {
    if (!activeProblem) return;

    setIsRunningTests(true);
    setTestMode(mode);
    sound.playPop();

    try {
      const targetCases =
        mode === 'example'
          ? activeProblem.example_test_cases
          : [...activeProblem.example_test_cases, ...activeProblem.hidden_test_cases];

      const mappedCases = targetCases.map((tc, idx) => ({
        id: `tc-${idx}`,
        input: tc.stdin,
        expectedOutput: tc.expected_stdout,
      }));

      const res = await runPythonTests(code, mappedCases);
      setTestRunResult(res);

      if (res.allPassed) {
        sound.playSuccess();

        if (mode === 'all') {
          // Complete Problem Solve!
          setIsSolvingSuccess(true);
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10B981', '#38BDF8', '#F59E0B'],
          });

          const xpAward = activeProblem.difficulty === 'Easy' ? 50 : activeProblem.difficulty === 'Medium' ? 100 : 150;
          triggerBurst('🎯 ALL TESTS PASSED!', `+${xpAward} XP Earned!`, 'pow');

          // Construct Problem entity for context
          const problemObj: Problem = {
            id: `dsa-${activeProblem.id}`,
            title: activeProblem.title,
            slug: activeProblem.slug,
            chapterId: 1,
            category: formatCategoryName(activeProblem.pattern_category),
            difficulty: activeProblem.difficulty as Difficulty,
            timeComplexity: 'O(N)',
            spaceComplexity: 'O(1)',
            description: activeProblem.statement,
            examples: [],
            constraints: [],
            starterCode: activeProblem.starter_code_python,
            solutionCode: '',
            testCases: mappedCases,
            hints: {
              byteHint: activeProblem.hints[0] || 'Analyze time & space bounds.',
              professorInsight: 'Look for overlapping subproblems or optimal sub-structure.',
              bugsyTrap: 'Watch out for boundary conditions and empty inputs!',
            },
            tags: [...activeProblem.tags, ...activeProblem.company_tags],
            source: 'Curated',
          };

          await markProblemSolved(problemObj, code);
        }
      } else {
        sound.playHit();
      }
    } catch (err: any) {
      console.error('Test execution error:', err);
      sound.playHit();
    } finally {
      setIsRunningTests(false);
    }
  };

  // Next Problem Solver Shortcut
  const handleNextProblem = async () => {
    if (!activeProblem) return;
    const currentIndex = filteredProblems.findIndex((p) => p.id === activeProblem.id);
    if (currentIndex !== -1 && currentIndex + 1 < filteredProblems.length) {
      const nextProb = filteredProblems[currentIndex + 1];
      await handleOpenSolver(nextProb.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 p-4 md:p-6 lg:p-8 space-y-6">
      {/* 1. Header & Live Stats Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c121e] via-[#090e17] to-[#120f1f] border border-slate-800/80 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mb-20" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              1,010 Questions • 10,604 Verified Test Cases
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-sky-300">
              1,000+ DSA & FAANG Problem Library
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Solve real technical interview problems curated from top tech leaders with instant Python execution,
              hidden test validation, and automatic Git commits to your passport.
            </p>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Solved Progress Box */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 min-w-[200px] flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Your Solved Rate</span>
                <span className="text-emerald-400 font-bold font-mono">
                  {((totalSolvedCount / 1010) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="text-2xl font-black text-white font-mono flex items-baseline gap-1.5">
                <span className="text-emerald-400">{totalSolvedCount}</span>
                <span className="text-slate-500 text-base font-normal">/ 1,010</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-sky-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(1, (totalSolvedCount / 1010) * 100)}%` }}
                />
              </div>
            </div>

            {/* Random Pick Button */}
            <button
              onClick={handleFeelingLucky}
              className="flex items-center justify-center gap-2.5 px-5 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Pick Random Problem</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Search, Filter, and Sort Toolbar */}
      <div className="bg-[#0a0e17] border border-slate-800/80 rounded-2xl p-4 md:p-5 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5">
          {/* Search Bar (5 cols) */}
          <div className="relative lg:col-span-4">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, #ID (e.g. #1), or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/80 transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Company Filter (3 cols) */}
          <div className="lg:col-span-3">
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-400/80 transition-all cursor-pointer"
            >
              <option value="all">🏢 All Companies ({companyStats.length} Tags)</option>
              {companyStats.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} ({c.count})
                </option>
              ))}
            </select>
          </div>

          {/* Pattern Category Filter (3 cols) */}
          <div className="lg:col-span-3">
            <select
              value={selectedPattern}
              onChange={(e) => setSelectedPattern(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-400/80 transition-all cursor-pointer"
            >
              <option value="all">🧩 All Topics & Patterns ({patternStats.length})</option>
              {patternStats.map((p) => (
                <option key={p.name} value={p.name}>
                  {formatCategoryName(p.name)} ({p.count})
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter (2 cols) */}
          <div className="lg:col-span-2">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-400/80 transition-all cursor-pointer"
            >
              <option value="all">⚡ All Difficulties</option>
              <option value="easy">Easy (150)</option>
              <option value="medium">Medium (520)</option>
              <option value="hard">Hard (340)</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter Row: Status Pills & Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60 text-xs">
          {/* Status Pills */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 mr-1">Status:</span>
            {(['all', 'unsolved', 'solved'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedStatus === status
                    ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {status === 'all' && `All (${filteredProblems.length})`}
                {status === 'unsolved' && `Unsolved (${problems.length - totalSolvedCount})`}
                {status === 'solved' && `Solved (${totalSolvedCount})`}
              </button>
            ))}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="id_asc">Problem # (1 → 1010)</option>
              <option value="id_desc">Problem # (1010 → 1)</option>
              <option value="diff_asc">Difficulty (Easy → Hard)</option>
              <option value="diff_desc">Difficulty (Hard → Easy)</option>
              <option value="ac_desc">Acceptance Rate (High → Low)</option>
              <option value="title">Title (A → Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Problem Table / Grid */}
      {loading ? (
        <div className="bg-[#0a0e17] border border-slate-800/80 rounded-2xl p-16 flex flex-col items-center justify-center text-center space-y-4">
          <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
          <p className="text-slate-400 text-sm">Loading 1,010 algorithm challenges & test cases...</p>
        </div>
      ) : filteredProblems.length === 0 ? (
        <div className="bg-[#0a0e17] border border-slate-800/80 rounded-2xl p-16 flex flex-col items-center justify-center text-center space-y-3">
          <HelpCircle className="w-10 h-10 text-slate-500" />
          <h3 className="text-lg font-bold text-white">No problems found</h3>
          <p className="text-xs text-slate-400 max-w-sm">
            Try adjusting your search terms or relaxing the company / pattern filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCompany('all');
              setSelectedPattern('all');
              setSelectedDifficulty('all');
              setSelectedStatus('all');
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg transition-all"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="bg-[#0a0e17] border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-mono">
                  <th className="py-3.5 px-4 w-12 text-center">Status</th>
                  <th className="py-3.5 px-3 w-16">#</th>
                  <th className="py-3.5 px-4">Title & Topic</th>
                  <th className="py-3.5 px-4 w-32">Difficulty</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Target Companies</th>
                  <th className="py-3.5 px-4 w-28 text-center hidden sm:table-cell">Acceptance</th>
                  <th className="py-3.5 px-4 w-28 text-center hidden lg:table-cell">Tests</th>
                  <th className="py-3.5 px-4 w-28 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
                {paginatedProblems.map((prob) => {
                  const solved = isProblemSolved(prob.id);
                  const isEasy = prob.difficulty === 'Easy';
                  const isMed = prob.difficulty === 'Medium';

                  return (
                    <tr
                      key={prob.id}
                      onClick={() => handleOpenSolver(prob.id)}
                      className={`hover:bg-slate-800/40 cursor-pointer transition-colors ${
                        solved ? 'bg-emerald-950/10' : ''
                      }`}
                    >
                      {/* Solved Status */}
                      <td className="py-3 px-4 text-center">
                        {solved ? (
                          <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-5 h-5 text-slate-600">
                            <Circle className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </td>

                      {/* Problem Number */}
                      <td className="py-3 px-3 text-slate-400 font-bold">#{prob.frontend_id}</td>

                      {/* Title & Topic */}
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-slate-100 font-sans hover:text-amber-300 transition-colors">
                            {prob.title}
                          </span>
                          <span className="text-[11px] text-cyan-400/90 font-mono">
                            {formatCategoryName(prob.pattern_category)}
                          </span>
                        </div>
                      </td>

                      {/* Difficulty Badge */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            isEasy
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                              : isMed
                              ? 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
                              : 'bg-rose-950/60 text-rose-400 border border-rose-800/60'
                          }`}
                        >
                          {prob.difficulty}
                        </span>
                      </td>

                      {/* Companies */}
                      <td className="py-3 px-4 hidden md:table-cell">
                        <div className="flex flex-wrap items-center gap-1.5 max-w-md">
                          {prob.company_tags.slice(0, 3).map((comp) => (
                            <span
                              key={comp}
                              className={`px-2 py-0.5 rounded text-[10px] font-medium border ${getCompanyBadgeClass(
                                comp
                              )}`}
                            >
                              {comp}
                            </span>
                          ))}
                          {prob.company_tags.length > 3 && (
                            <span className="text-[10px] text-slate-500 font-mono">
                              +{prob.company_tags.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Acceptance Rate */}
                      <td className="py-3 px-4 text-center text-slate-300 font-mono hidden sm:table-cell">
                        {prob.ac_rate}
                      </td>

                      {/* Test cases count */}
                      <td className="py-3 px-4 text-center text-slate-400 font-mono text-[11px] hidden lg:table-cell">
                        {prob.total_test_cases} cases
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenSolver(prob.id);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            solved
                              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                              : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-400/10'
                          }`}
                        >
                          {solved ? 'Review' : 'Solve'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="bg-slate-950/90 border-t border-slate-800/80 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
            <div>
              Showing <span className="text-white font-bold">{(currentPage - 1) * pageSize + 1}</span> to{' '}
              <span className="text-white font-bold">
                {Math.min(currentPage * pageSize, filteredProblems.length)}
              </span>{' '}
              of <span className="text-amber-400 font-bold">{filteredProblems.length}</span> problems
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Per page:</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-2 font-bold text-white">
                {currentPage} / {totalPages}
              </span>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Interactive In-Hub Split-Screen Solver Studio (Modal) */}
      {activeProblem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 md:p-6 animate-in fade-in duration-200">
          <div className="bg-[#080d1a] border border-slate-700/80 rounded-2xl w-full max-w-7xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Studio Top Header Bar */}
            <div className="bg-[#0b1122] border-b border-slate-800 px-5 py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-800/80 text-amber-300 border border-slate-700 font-bold">
                  #{activeProblem.frontend_id}
                </span>
                <h2 className="text-base md:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <span>{activeProblem.title}</span>
                  {isProblemSolved(activeProblem.id) && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-medium">
                      Solved
                    </span>
                  )}
                </h2>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    activeProblem.difficulty === 'Easy'
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                      : activeProblem.difficulty === 'Medium'
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                      : 'bg-rose-950/80 text-rose-400 border border-rose-800'
                  }`}
                >
                  {activeProblem.difficulty}
                </span>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleCloseSolver();
                    setActiveTab('ide');
                  }}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-all"
                  title="Open in full screen VS Code IDE"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Full IDE</span>
                </button>
                <button
                  onClick={handleCloseSolver}
                  className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-900/40 text-slate-400 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Split Content: Left = Statement, Right = Code & Test Runner */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
              {/* Left Column: Problem Statement & Hints (5 cols) */}
              <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-800/80 overflow-y-auto p-5 md:p-6 space-y-5 bg-[#090e1b]">
                {/* Company & Pattern Tags */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-slate-400 mr-1 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-500" /> Companies:
                  </span>
                  {activeProblem.company_tags.map((c) => (
                    <span
                      key={c}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium border ${getCompanyBadgeClass(c)}`}
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {/* Markdown Problem Statement */}
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                  <ProblemMarkdownViewer content={activeProblem.statement} />
                </div>

                {/* Test Cases Summary Info */}
                <div className="bg-slate-900/60 border border-slate-800/70 rounded-xl p-3.5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Public Examples: {activeProblem.num_example_test_cases}</span>
                  <span>Hidden Tests: {activeProblem.num_hidden_test_cases}</span>
                  <span className="text-amber-400 font-bold">Total: {activeProblem.total_test_cases} Cases</span>
                </div>

                {/* Hints Section */}
                {activeProblem.hints && activeProblem.hints.length > 0 && (
                  <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold text-amber-300 hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-amber-400" />
                        Need a Hint?
                      </span>
                      {showHint ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {showHint && (
                      <div className="px-4 py-3 border-t border-slate-800 text-xs text-slate-300 space-y-2">
                        {activeProblem.hints.map((h, i) => (
                          <p key={i} className="leading-relaxed">
                            💡 {h}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: Code Editor & Live Test Runner (7 cols) */}
              <div className="lg:col-span-7 flex flex-col overflow-hidden bg-[#0a0f21]">
                {/* Editor Container */}
                <div className="flex-1 flex flex-col overflow-hidden border-b border-slate-800/80">
                  <div className="bg-[#0b1020] px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-mono text-slate-300 font-semibold">solution.py (Python 3.11)</span>
                    </div>
                    <button
                      onClick={() => setCode(activeProblem.starter_code_python)}
                      className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-mono"
                    >
                      <RefreshCw className="w-3 h-3" /> Reset
                    </button>
                  </div>

                  {/* Monaco / Universal Editor Textarea */}
                  <div className="flex-1 overflow-hidden relative">
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      spellCheck={false}
                      className="w-full h-full p-4 font-mono text-xs bg-[#070b16] text-emerald-300 focus:outline-none resize-none leading-relaxed selection:bg-amber-400/30 selection:text-white"
                      style={{ tabSize: 4 }}
                    />
                  </div>
                </div>

                {/* Bottom Action Bar & Test Results */}
                <div className="h-64 flex flex-col bg-[#070b16]">
                  {/* Buttons Toolbar */}
                  <div className="px-4 py-2.5 bg-[#0b1122] border-b border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {/* Run Examples */}
                      <button
                        onClick={() => handleRunTests('example')}
                        disabled={isRunningTests}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-all disabled:opacity-50"
                      >
                        <Play className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
                        <span>Run Examples</span>
                      </button>

                      {/* Submit All */}
                      <button
                        onClick={() => handleRunTests('all')}
                        disabled={isRunningTests}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-slate-950 transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Submit Solution</span>
                      </button>
                    </div>

                    {/* Next Problem Button (if solved) */}
                    {isSolvingSuccess && (
                      <button
                        onClick={handleNextProblem}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all animate-bounce"
                      >
                        <span>Next Problem</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Results Panel */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
                    {isRunningTests ? (
                      <div className="flex items-center justify-center h-full text-slate-400 gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                        <span>Running tests against Python 3 Wasm Sandbox...</span>
                      </div>
                    ) : testRunResult ? (
                      <div className="space-y-3">
                        {/* Overall Result Banner */}
                        <div
                          className={`p-3 rounded-xl border flex items-center justify-between ${
                            testRunResult.allPassed
                              ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                              : 'bg-rose-950/40 border-rose-800 text-rose-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {testRunResult.allPassed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <X className="w-4 h-4 text-rose-400" />
                            )}
                            <span className="font-bold">
                              {testRunResult.allPassed
                                ? `All ${testRunResult.results.length} Test Cases Passed!`
                                : `Failed: Passed ${testRunResult.results.filter((r) => r.passed).length} / ${
                                    testRunResult.results.length
                                  }`}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400">
                            {testRunResult.totalTimeMs}ms execution time
                          </span>
                        </div>

                        {/* Syntax or Runtime Error if any */}
                        {testRunResult.syntaxError && (
                          <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs whitespace-pre-wrap">
                            {testRunResult.syntaxError}
                          </div>
                        )}

                        {/* Individual test case results (up to first 5 shown) */}
                        <div className="space-y-2">
                          {testRunResult.results.slice(0, 5).map((r, idx) => (
                            <div
                              key={r.testId}
                              className={`p-2.5 rounded-lg border text-[11px] ${
                                r.passed
                                  ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                                  : 'bg-rose-950/30 border-rose-900/60 text-slate-200'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5 font-bold">
                                <span className={r.passed ? 'text-emerald-400' : 'text-rose-400'}>
                                  Test Case #{idx + 1} — {r.passed ? 'PASSED' : 'FAILED'}
                                </span>
                                <span className="text-slate-500 font-normal">{r.executionTimeMs}ms</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] text-slate-400">
                                <div>
                                  <span className="text-slate-500">Expected:</span>{' '}
                                  <span className="text-emerald-300">{r.expectedOutput}</span>
                                </div>
                                <div>
                                  <span className="text-slate-500">Actual:</span>{' '}
                                  <span className={r.passed ? 'text-emerald-300' : 'text-rose-300'}>
                                    {r.actualOutput || '(no output)'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                          {testRunResult.results.length > 5 && (
                            <div className="text-center text-[10px] text-slate-500 pt-1">
                              +{testRunResult.results.length - 5} additional hidden test cases evaluated
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-1">
                        <Play className="w-5 h-5 opacity-40" />
                        <p className="text-xs">Click "Run Examples" or "Submit Solution" to test your code.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
