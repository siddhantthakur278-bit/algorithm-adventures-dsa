import React, { useState } from 'react';
import {
  practiceDepartments,
  practiceEmployees,
  practiceSales,
  setupSqlScript,
  sql80Problems,
  postgresErrors,
  finalBossQuiz,
  sqlChapters,
} from '../../data/sqlData';
import { runSqlQuery } from '../../utils/sqlRunner';
import { SqlProblem, SqlQueryResult, SqlBelt } from '../../types/sqlTypes';
import {
  ProfTupleAvatar,
  SamAvatar,
  NullyAvatar,
  BugsyAvatar,
  ComicBubble,
} from '../characters/Characters';
import {
  Database,
  Table,
  Terminal,
  BookOpen,
  Zap,
  AlertTriangle,
  Trophy,
  Sparkles,
  Copy,
  Check,
  Play,
  RotateCcw,
  Search,
  ChevronRight,
  HelpCircle,
  Code2,
  CheckCircle2,
  XCircle,
  Download,
  Info,
  Layers,
  Lock,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCourse } from '../../context/CourseContext';
import { SqlExplainStudio } from './SqlExplainStudio';

export const SqlHub: React.FC = () => {
  const { triggerBurst } = useCourse();
  const [activeSubTab, setActiveSubTab] = useState<
    'dataset' | 'belts' | 'studio' | 'chapters' | 'nully' | 'normalization' | 'errors' | 'boss' | 'explain'
  >('belts');

  // Active Belt Filter
  const [selectedBelt, setSelectedBelt] = useState<SqlBelt | 'all'>('white');
  const [activeProblem, setActiveProblem] = useState<SqlProblem>(sql80Problems[0]);

  // SQL Studio State
  const [sqlQuery, setSqlQuery] = useState<string>(sql80Problems[0].solutionSql);
  const [queryResult, setQueryResult] = useState<SqlQueryResult | null>(() =>
    runSqlQuery(sql80Problems[0].solutionSql)
  );
  const [copiedSetup, setCopiedSetup] = useState(false);
  const [solvedProblemIds, setSolvedProblemIds] = useState<string[]>([]);

  // Dataset Viewer State
  const [datasetTable, setDatasetTable] = useState<'employees' | 'departments' | 'sales'>('employees');

  // Chapters Reader State
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [selectedMcqAnswers, setSelectedMcqAnswers] = useState<Record<string, number>>({});

  // Boss Battle State
  const [bossAnswers, setBossAnswers] = useState<Record<number, number>>({});
  const [bossSubmitted, setBossSubmitted] = useState(false);

  // Nully 3-Valued Logic Sandbox
  const [nullyExpr, setNullyExpr] = useState<'eq' | 'is' | 'coalesce' | 'distinct' | 'math'>('eq');

  // Run user query
  const handleRunQuery = () => {
    const res = runSqlQuery(sqlQuery, activeProblem.id);
    setQueryResult(res);
    if (!res.error && !solvedProblemIds.includes(activeProblem.id)) {
      setSolvedProblemIds(prev => [...prev, activeProblem.id]);
      triggerBurst('⚡ SQL PASSED!', 'Belt Problem Solved! +50 XP', 'zap');
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleSelectProblem = (prob: SqlProblem) => {
    setActiveProblem(prob);
    setSqlQuery(prob.solutionSql);
    const res = runSqlQuery(prob.solutionSql, prob.id);
    setQueryResult(res);
  };

  const handleCopySetup = () => {
    navigator.clipboard.writeText(setupSqlScript);
    setCopiedSetup(true);
    setTimeout(() => setCopiedSetup(false), 2000);
  };

  // Belt badge style helper
  const getBeltBadge = (belt: SqlBelt) => {
    switch (belt) {
      case 'white':
        return 'bg-white text-black border-slate-300 font-bold';
      case 'yellow':
        return 'bg-[#FBBF24] text-black border-amber-600 font-bold';
      case 'blue':
        return 'bg-[#38BDF8] text-black border-sky-600 font-bold';
      case 'black':
        return 'bg-black text-[#FBBF24] border-[#FBBF24] font-bold';
    }
  };

  const filteredProblems =
    selectedBelt === 'all'
      ? sql80Problems
      : sql80Problems.filter(p => p.belt === selectedBelt);

  // Boss Quiz Score Computation
  const bossScore = finalBossQuiz.reduce((acc, q) => {
    return acc + (bossAnswers[q.questionNumber] === q.answerIndex ? 1 : 0);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Banner / Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0d1222] via-[#141a34] to-[#0a0f1d] border-2 border-black shadow-comic relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center -space-x-3">
              <ProfTupleAvatar size="lg" mood="wise" />
              <SamAvatar size="md" mood="curious" />
              <NullyAvatar size="md" mood="floating" />
              <BugsyAvatar size="sm" mood="sneaky" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bangers text-3xl sm:text-4xl text-[#FBBF24] tracking-wide drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  SQL & DATA ENGINEERING
                </span>
                <span className="bg-[#8B5CF6] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-black shadow-comic-sm">
                  PostgreSQL Edition
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 leading-relaxed">
                Semester 3 Survival Guide • The Comic Classic. Master relational schemas, 3-valued logic, window functions, and 80 classic problems with{' '}
                <strong className="text-[#FBBF24]">Prof. Tuple</strong>, <strong className="text-[#FB923C]">Sam</strong> &{' '}
                <strong className="text-[#C084FC]">Nully</strong>!
              </p>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-[#080b14] p-3 rounded-xl border border-[#1b2236] shadow-comic-sm">
            <div className="text-center px-3 border-r border-[#1e2538]">
              <div className="text-xl font-bangers text-[#FBBF24]">80</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Problems</div>
            </div>
            <div className="text-center px-3 border-r border-[#1e2538]">
              <div className="text-xl font-bangers text-[#38BDF8]">13</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Chapters</div>
            </div>
            <div className="text-center px-3">
              <div className="text-xl font-bangers text-[#10B981]">{solvedProblemIds.length} / 80</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Solved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#1b2236] no-scrollbar">
        {[
          { id: 'belts', label: '80 Classic Belts', icon: Trophy, badge: `${solvedProblemIds.length}/80` },
          { id: 'studio', label: 'SQL Query Studio', icon: Terminal, badge: 'Live Runner' },
          { id: 'dataset', label: 'Practice Dataset', icon: Table, badge: '3 Tables' },
          { id: 'chapters', label: '13 Comic Chapters', icon: BookOpen, badge: 'Theory & MCQs' },
          { id: 'nully', label: "Nully's NULL Chamber", icon: Sparkles, badge: '3-Valued' },
          { id: 'normalization', label: 'Normalization Staircase', icon: Layers, badge: '1NF to BCNF' },
          { id: 'errors', label: "Bugsy's Error Dictionary", icon: AlertTriangle, badge: '15 Traps' },
          { id: 'explain', label: 'EXPLAIN & Index Tuner', icon: Search, badge: 'Optimizer' },
          { id: 'boss', label: 'Final Boss Quiz', icon: Zap, badge: '20 MCQs' },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border-2 cursor-pointer ${
                isActive
                  ? 'bg-[#F59E0B] text-black border-black shadow-comic-sm -translate-y-0.5 font-extrabold'
                  : 'bg-[#0e1222] text-slate-300 border-[#1c243a] hover:bg-[#161c32] hover:text-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded font-mono border ${
                    isActive ? 'bg-black text-[#FBBF24] border-black' : 'bg-[#151b2e] text-slate-300 border-[#26314d]'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: 80 CLASSIC BELTS DOJO */}
      {activeSubTab === 'belts' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Belts Selector & Problem List */}
          <div className="lg:col-span-5 space-y-4">
            {/* Belt Filter Pills */}
            <div className="p-3 bg-[#131627] rounded-xl border-2 border-black flex items-center justify-between gap-1 overflow-x-auto">
              {(
                [
                  { id: 'white', label: 'White (P1-P20)', count: 20 },
                  { id: 'yellow', label: 'Yellow (P21-P40)', count: 20 },
                  { id: 'blue', label: 'Blue (P41-P60)', count: 20 },
                  { id: 'black', label: 'Black (P61-P80)', count: 20 },
                  { id: 'all', label: 'All 80', count: 80 },
                ] as const
              ).map(b => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBelt(b.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                    selectedBelt === b.id
                      ? 'bg-[#FFDE59] text-black shadow-comic-sm'
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1f36]'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Problem List */}
            <div className="bg-[#131627] rounded-2xl border-2 border-black p-3 max-h-[620px] overflow-y-auto space-y-2 no-scrollbar">
              {filteredProblems.map(prob => {
                const isSelected = activeProblem.id === prob.id;
                const isSolved = solvedProblemIds.includes(prob.id);
                const isUnlocked = prob.number === 1 || isSolved || prob.number <= solvedProblemIds.length + 1;

                return (
                  <div
                    key={prob.id}
                    onClick={() => {
                      if (!isUnlocked) {
                        alert(`🔒 Sequential Path: Complete problem P${prob.number - 1} first to unlock P${prob.number} in sequence!`);
                        return;
                      }
                      handleSelectProblem(prob);
                    }}
                    className={`p-3 rounded-xl border-2 transition flex items-center justify-between ${
                      !isUnlocked
                        ? 'bg-[#0d0f1b]/50 border-gray-900 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#1e233d] border-[#FFB703] shadow-comic-sm cursor-pointer'
                        : 'bg-[#101322] border-transparent hover:border-gray-700 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${getBeltBadge(
                          prob.belt
                        )}`}
                      >
                        P{prob.number}
                      </span>
                      <div className="truncate">
                        <div className="text-xs font-bold text-gray-200 truncate">{prob.title}</div>
                        <div className="text-[10px] text-gray-400">{prob.category}</div>
                      </div>
                    </div>
                    {isSolved ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    ) : !isUnlocked ? (
                      <Lock className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Problem Detail & Integrated SQL Runner */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-2xl bg-[#131627] border-2 border-black shadow-comic space-y-4">
              {/* Problem Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded border uppercase ${getBeltBadge(
                      activeProblem.belt
                    )}`}
                  >
                    Problem #{activeProblem.number} • {activeProblem.belt.toUpperCase()} BELT
                  </span>
                  <span className="text-xs text-gray-400 font-mono">{activeProblem.category}</span>
                </div>
                {solvedProblemIds.includes(activeProblem.id) && (
                  <span className="flex items-center gap-1 text-xs text-green-400 font-bold bg-green-950/60 px-2 py-0.5 rounded border border-green-800">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                  </span>
                )}
              </div>

              <div>
                <h2 className="text-lg font-bold text-white font-sans">{activeProblem.title}</h2>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">{activeProblem.description}</p>
              </div>

              {/* Character Advice Bubbles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <ComicBubble
                  speaker="tuple"
                  text={activeProblem.hint || 'Check row counts and column projections carefully.'}
                  subtext="Prof. Hint"
                />
                <ComicBubble
                  speaker="bugsy"
                  text={
                    activeProblem.bugsyTrap ||
                    'Remember: Isha has NULL department and Dev has NULL salary! Watch your join!'
                  }
                  subtext="Bugsy's Trap"
                />
              </div>

              {/* SQL Code Editor Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-300 flex items-center gap-1.5 font-mono">
                    <Terminal className="w-3.5 h-3.5 text-[#FFB703]" />
                    PostgreSQL Query Editor
                  </span>
                  <button
                    onClick={() => setSqlQuery(activeProblem.solutionSql)}
                    className="text-[11px] text-[#38B6FF] hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset to Solution
                  </button>
                </div>
                <textarea
                  value={sqlQuery}
                  onChange={e => setSqlQuery(e.target.value)}
                  rows={4}
                  className="w-full bg-[#0d0f1b] font-mono text-xs text-yellow-300 p-3 rounded-xl border-2 border-black focus:outline-none focus:border-[#FFB703] resize-none"
                  placeholder="Enter your SQL query here..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3">
                <div className="text-[11px] text-gray-400">
                  Expected:{' '}
                  <span className="text-gray-200 font-medium">{activeProblem.expectedResultSummary}</span>
                </div>
                <button
                  onClick={handleRunQuery}
                  className="px-5 py-2 bg-[#7ED957] hover:bg-[#6ecb47] text-black font-bangers text-base tracking-wider rounded-xl border-2 border-black shadow-comic-sm flex items-center gap-2 transition cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-black" />
                  Execute Query
                </button>
              </div>

              {/* Live Query Results Table */}
              {queryResult && (
                <div className="mt-4 pt-4 border-t border-gray-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-200">Execution Output</span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        ({queryResult.rowCount} rows in {queryResult.executionTimeMs} ms)
                      </span>
                    </div>
                  </div>

                  {queryResult.error ? (
                    <div className="p-3 bg-red-950/60 border-2 border-red-800 text-red-200 rounded-xl text-xs font-mono flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>{queryResult.error}</div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#0d0f1a] max-h-56 no-scrollbar">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-[#181c30] text-gray-300 border-b border-gray-700">
                          <tr>
                            {queryResult.columns.map((col, idx) => (
                              <th key={idx} className="p-2 font-bold uppercase tracking-wider text-[11px]">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          {queryResult.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-[#15192c]">
                              {queryResult.columns.map((col, cIdx) => {
                                const val = row[col];
                                return (
                                  <td key={cIdx} className="p-2 text-gray-300">
                                    {val === null || val === undefined ? (
                                      <span className="text-[#C77DFF] font-bold italic">NULL</span>
                                    ) : (
                                      String(val)
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SQL QUERY STUDIO */}
      {activeSubTab === 'studio' && (
        <div className="space-y-5">
          <div className="p-6 bg-[#131627] rounded-2xl border-2 border-black shadow-comic space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bangers text-[#FFDE59] tracking-wider">
                  INTERACTIVE POSTGRESQL CONSOLE
                </h3>
                <p className="text-xs text-gray-400">
                  Run arbitrary queries against the live dataset (departments, employees, sales)
                </p>
              </div>

              {/* Sample Queries Shortcuts */}
              <div className="flex items-center gap-2 overflow-x-auto">
                {[
                  { label: 'SELECT * All', q: 'SELECT * FROM employees;' },
                  { label: 'Left Join', q: 'SELECT e.emp_name, d.dept_name FROM employees e LEFT JOIN departments d ON d.dept_id = e.dept_id;' },
                  { label: '3-Rankers', q: 'SELECT sale_id, amount, ROW_NUMBER() OVER (ORDER BY amount DESC), RANK() OVER (ORDER BY amount DESC), DENSE_RANK() OVER (ORDER BY amount DESC) FROM sales;' },
                  { label: 'P80 Leaderboard', q: 'WITH t AS (SELECT e.emp_name, d.dept_name, SUM(s.amount) AS total FROM sales s JOIN employees e ON e.emp_id = s.emp_id JOIN departments d ON d.dept_id = e.dept_id GROUP BY e.emp_name, d.dept_name) SELECT emp_name, dept_name, total, RANK() OVER (ORDER BY total DESC) AS rnk, ROUND(100.0 * total / SUM(total) OVER (), 2) AS share_pct FROM t ORDER BY rnk;' },
                ].map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSqlQuery(s.q);
                      setQueryResult(runSqlQuery(s.q));
                    }}
                    className="px-2.5 py-1 bg-[#1a1f36] hover:bg-[#232948] text-gray-200 text-xs font-medium rounded-lg border border-gray-700 whitespace-nowrap transition"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Editor Textarea */}
            <textarea
              value={sqlQuery}
              onChange={e => setSqlQuery(e.target.value)}
              rows={6}
              className="w-full bg-[#0d0f1b] font-mono text-sm text-[#FFDE59] p-4 rounded-xl border-2 border-black focus:outline-none focus:border-[#FFB703] resize-y"
              placeholder="SELECT * FROM employees WHERE salary > 50000;"
            />

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-mono">
                PostgreSQL 16 Semantics • Transactional DDL • 3-Valued Logic
              </span>
              <button
                onClick={handleRunQuery}
                className="px-6 py-2.5 bg-[#7ED957] hover:bg-[#6ecb47] text-black font-bangers text-lg tracking-wider rounded-xl border-2 border-black shadow-comic-sm flex items-center gap-2 transition cursor-pointer"
              >
                <Play className="w-5 h-5 fill-black" />
                Run Query
              </button>
            </div>

            {/* Table Result Display */}
            {queryResult && (
              <div className="mt-4 pt-4 border-t border-gray-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-200">
                    Results ({queryResult.rowCount} rows • {queryResult.executionTimeMs} ms)
                  </span>
                </div>

                {queryResult.error ? (
                  <div className="p-4 bg-red-950/70 border-2 border-red-800 text-red-200 rounded-xl text-xs font-mono flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>{queryResult.error}</div>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border-2 border-black bg-[#0d0f1a] max-h-80 no-scrollbar">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#181c30] text-gray-300 border-b-2 border-black">
                        <tr>
                          {queryResult.columns.map((col, idx) => (
                            <th key={idx} className="p-2.5 font-bold uppercase tracking-wider text-[11px]">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {queryResult.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[#15192c]">
                            {queryResult.columns.map((col, cIdx) => {
                              const val = row[col];
                              return (
                                <td key={cIdx} className="p-2.5 text-gray-300">
                                  {val === null || val === undefined ? (
                                    <span className="text-[#C77DFF] font-bold italic">NULL</span>
                                  ) : (
                                    String(val)
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: PRACTICE DATASET INSPECTOR */}
      {activeSubTab === 'dataset' && (
        <div className="space-y-6">
          {/* Table Tabs */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {(['employees', 'departments', 'sales'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setDatasetTable(t)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border-2 transition ${
                    datasetTable === t
                      ? 'bg-[#FFDE59] text-black border-black shadow-comic-sm'
                      : 'bg-[#131627] text-gray-300 border-transparent hover:bg-[#1c213a]'
                  }`}
                >
                  {t} ({t === 'employees' ? '8 rows' : t === 'departments' ? '4 rows' : '10 rows'})
                </button>
              ))}
            </div>

            <button
              onClick={handleCopySetup}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1b2038] hover:bg-[#252c4e] text-xs font-bold text-gray-200 rounded-xl border border-gray-700 transition"
            >
              {copiedSetup ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSetup ? 'Copied SETUP.SQL!' : 'Copy SETUP.SQL'}</span>
            </button>
          </div>

          {/* Active Table Viewer */}
          <div className="bg-[#131627] rounded-2xl border-2 border-black p-5 shadow-comic space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bangers text-xl text-white tracking-wider uppercase">
                  TABLE: {datasetTable}
                </h4>
                <p className="text-xs text-gray-400">
                  {datasetTable === 'employees' && '8 records • Primary key emp_id • Foreign key dept_id'}
                  {datasetTable === 'departments' && '4 records • Primary key dept_id'}
                  {datasetTable === 'sales' && '10 records • Primary key sale_id • Foreign key emp_id'}
                </p>
              </div>

              {/* Traps Callout */}
              <div className="bg-yellow-950/40 border border-yellow-700/60 p-2.5 rounded-xl max-w-md text-xs text-yellow-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Intentional Trap: </span>
                  {datasetTable === 'employees' && 'Isha has dept_id = NULL, Dev has salary = NULL.'}
                  {datasetTable === 'departments' && 'Legal (dept 40) has NO employees.'}
                  {datasetTable === 'sales' && 'Two sales tie at 1000 and two tie at 600.'}
                </div>
              </div>
            </div>

            {/* Table Display */}
            <div className="overflow-x-auto rounded-xl border-2 border-black bg-[#0d0f1a] no-scrollbar">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#181c30] text-gray-300 border-b-2 border-black">
                  <tr>
                    {datasetTable === 'employees' &&
                      practiceEmployees.columns.map(c => (
                        <th key={c.name} className="p-2.5 font-bold">
                          {c.name}{' '}
                          <span className="text-[9px] text-gray-400 font-normal">
                            ({c.type}
                            {c.isPk ? ', PK' : ''}
                            {c.isFk ? ', FK' : ''})
                          </span>
                        </th>
                      ))}
                    {datasetTable === 'departments' &&
                      practiceDepartments.columns.map(c => (
                        <th key={c.name} className="p-2.5 font-bold">
                          {c.name}{' '}
                          <span className="text-[9px] text-gray-400 font-normal">
                            ({c.type}
                            {c.isPk ? ', PK' : ''})
                          </span>
                        </th>
                      ))}
                    {datasetTable === 'sales' &&
                      practiceSales.columns.map(c => (
                        <th key={c.name} className="p-2.5 font-bold">
                          {c.name}{' '}
                          <span className="text-[9px] text-gray-400 font-normal">
                            ({c.type}
                            {c.isPk ? ', PK' : ''}
                            {c.isFk ? ', FK' : ''})
                          </span>
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {(datasetTable === 'employees'
                    ? practiceEmployees.rows
                    : datasetTable === 'departments'
                    ? practiceDepartments.rows
                    : practiceSales.rows
                  ).map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#15192c]">
                      {Object.keys(row).map((k, colIdx) => {
                        const val = (row as any)[k];
                        const isTrapCell =
                          (k === 'dept_id' && val === null) ||
                          (k === 'salary' && val === null) ||
                          (k === 'dept_name' && val === 'Legal');

                        return (
                          <td
                            key={colIdx}
                            className={`p-2.5 ${
                              isTrapCell ? 'bg-yellow-950/30 text-yellow-300 font-bold' : 'text-gray-300'
                            }`}
                          >
                            {val === null || val === undefined ? (
                              <span className="text-[#C77DFF] font-bold italic">NULL</span>
                            ) : (
                              String(val)
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: 13 COMIC CHAPTERS */}
      {activeSubTab === 'chapters' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chapter Selector */}
          <div className="lg:col-span-4 bg-[#131627] rounded-2xl border-2 border-black p-3 space-y-1.5 max-h-[680px] overflow-y-auto no-scrollbar">
            <h4 className="text-xs font-bold uppercase text-gray-400 px-3 py-1 font-mono">
              Curriculum (13 Chapters)
            </h4>
            {sqlChapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => setActiveChapterIndex(idx)}
                className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between border-2 ${
                  activeChapterIndex === idx
                    ? 'bg-[#FFDE59] text-black border-black shadow-comic-sm'
                    : 'bg-transparent text-gray-300 border-transparent hover:bg-[#1c213a]'
                }`}
              >
                <div className="truncate">
                  <span className="font-mono text-[10px] opacity-75">CH {ch.number}: </span>
                  <span>{ch.title}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
              </button>
            ))}
          </div>

          {/* Chapter Content Display */}
          <div className="lg:col-span-8 bg-[#131627] rounded-2xl border-2 border-black p-6 shadow-comic space-y-6">
            {(() => {
              const ch = sqlChapters[activeChapterIndex];
              return (
                <div className="space-y-6">
                  {/* Chapter Header */}
                  <div className="border-b border-gray-800 pb-4">
                    <span className="text-xs font-bold text-[#FFB703] uppercase tracking-wider font-mono">
                      Chapter {ch.number}
                    </span>
                    <h2 className="text-2xl font-bangers text-white tracking-wide mt-0.5">{ch.title}</h2>
                    <p className="text-xs text-gray-400">{ch.subtitle}</p>
                  </div>

                  {/* Sections */}
                  {ch.sections.map(sec => (
                    <div key={sec.id} className="space-y-3 bg-[#0f1220] p-4 rounded-xl border border-gray-800">
                      <h3 className="text-sm font-bold text-[#38B6FF] font-mono">{sec.title}</h3>
                      <p className="text-xs text-gray-300 leading-relaxed">{sec.theory}</p>

                      {sec.dialogue && (
                        <ComicBubble
                          speaker={sec.dialogue.speaker}
                          text={sec.dialogue.text}
                          subtext={sec.dialogue.speaker === 'tuple' ? 'Prof. Tuple' : sec.dialogue.speaker === 'nully' ? 'Nully' : 'Bugsy'}
                        />
                      )}

                      {sec.noteBox && (
                        <div className="p-3 bg-purple-950/40 border border-purple-800 rounded-xl text-xs text-purple-200 flex items-start gap-2">
                          <Info className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">{sec.noteBox.title}: </span>
                            {sec.noteBox.text}
                          </div>
                        </div>
                      )}

                      {/* Section MCQs */}
                      {sec.mcqs && sec.mcqs.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-gray-800">
                          <div className="text-[11px] font-bold text-yellow-300 uppercase tracking-wider flex items-center gap-1 font-mono">
                            <Sparkles className="w-3.5 h-3.5" /> Quick MCQ Check
                          </div>
                          {sec.mcqs.map(mcq => {
                            const userAns = selectedMcqAnswers[mcq.id];
                            const isAnswered = userAns !== undefined;
                            return (
                              <div key={mcq.id} className="p-3 bg-[#161a2e] rounded-xl space-y-2 border border-gray-700/60">
                                <div className="text-xs font-semibold text-gray-200">{mcq.question}</div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                  {mcq.options.map((opt, oIdx) => {
                                    let btnStyle = 'bg-[#0f1220] text-gray-300 hover:bg-[#1e233d]';
                                    if (isAnswered) {
                                      if (oIdx === mcq.answerIndex) {
                                        btnStyle = 'bg-green-600 text-white font-bold';
                                      } else if (userAns === oIdx) {
                                        btnStyle = 'bg-red-600 text-white font-bold';
                                      }
                                    }
                                    return (
                                      <button
                                        key={oIdx}
                                        disabled={isAnswered}
                                        onClick={() => {
                                          setSelectedMcqAnswers(prev => ({ ...prev, [mcq.id]: oIdx }));
                                          if (oIdx === mcq.answerIndex) {
                                            triggerBurst('💥 POW!', 'Correct Concept Answered!', 'pow');
                                            confetti({ particleCount: 20 });
                                          } else {
                                            triggerBurst('⚠️ WATCH OUT!', 'Check Prof. Tuple\'s Note', 'boom');
                                          }
                                        }}
                                        className={`p-2 rounded-lg text-left text-xs transition border border-gray-800 ${btnStyle}`}
                                      >
                                        {opt}
                                      </button>
                                    );
                                  })}
                                </div>
                                {isAnswered && (
                                  <div className="text-[11px] text-gray-400 italic pt-1">
                                    💡 {mcq.explanation}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Misunderstanding Fixer */}
                  {ch.misunderstandingFixer && ch.misunderstandingFixer.length > 0 && (
                    <div className="bg-[#121626] rounded-xl border border-gray-800 p-4 space-y-2">
                      <h4 className="text-xs font-bold text-[#FF5757] uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> Misunderstanding Fixer
                      </h4>
                      <div className="divide-y divide-gray-800 text-xs">
                        {ch.misunderstandingFixer.map((item, mIdx) => (
                          <div key={mIdx} className="py-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="text-red-300 font-medium">❌ {item.wrong}</div>
                            <div className="text-green-300 font-medium">✔ {item.truth}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Chapter Cheat Sheet */}
                  {ch.cheatSheet && (
                    <div className="p-4 bg-yellow-950/20 border border-yellow-800/60 rounded-xl space-y-1.5">
                      <h4 className="text-xs font-bold text-[#FFDE59] uppercase font-mono">
                        Chapter {ch.number} Cheat Sheet
                      </h4>
                      <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                        {ch.cheatSheet.map((cs, cIdx) => (
                          <li key={cIdx}>{cs}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: NULLY'S NULL CHAMBER */}
      {activeSubTab === 'nully' && (
        <div className="bg-[#131627] rounded-2xl border-2 border-black p-6 shadow-comic space-y-6">
          <div className="flex items-center gap-4">
            <NullyAvatar size="lg" mood="floating" />
            <div>
              <h3 className="font-bangers text-2xl text-[#C77DFF] tracking-wider">
                NULLY&apos;S THREE-VALUED LOGIC CHAMBER
              </h3>
              <p className="text-xs text-gray-300">
                &quot;Boo! I am Nully, the ghost of NULL. I mean &apos;unknown&apos;. I am not zero, not empty, and I never equal anyone!&quot;
              </p>
            </div>
          </div>

          {/* Interactive Demo Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#101322] rounded-xl border border-gray-800 space-y-2">
              <span className="text-xs font-bold text-gray-400 font-mono">1. Equality Trap</span>
              <div className="bg-black p-2.5 rounded font-mono text-xs text-yellow-300">
                SELECT NULL = NULL;
              </div>
              <div className="text-xs text-gray-300">
                Evaluates to <span className="text-[#C77DFF] font-bold">UNKNOWN (NULL)</span>! WHERE drops UNKNOWN, so nothing matches.
              </div>
            </div>

            <div className="p-4 bg-[#101322] rounded-xl border border-gray-800 space-y-2">
              <span className="text-xs font-bold text-gray-400 font-mono">2. IS NULL / IS NOT NULL</span>
              <div className="bg-black p-2.5 rounded font-mono text-xs text-green-300">
                SELECT NULL IS NULL;
              </div>
              <div className="text-xs text-gray-300">
                Evaluates to <span className="text-green-400 font-bold">TRUE</span>! Always use <code className="text-yellow-300">IS NULL</code> to test for missing data.
              </div>
            </div>

            <div className="p-4 bg-[#101322] rounded-xl border border-gray-800 space-y-2">
              <span className="text-xs font-bold text-gray-400 font-mono">3. NULL-Safe Equality</span>
              <div className="bg-black p-2.5 rounded font-mono text-xs text-blue-300">
                SELECT NULL IS DISTINCT FROM NULL;
              </div>
              <div className="text-xs text-gray-300">
                Evaluates to <span className="text-red-400 font-bold">FALSE</span>! Safe &apos;not equal&apos; operator in PostgreSQL.
              </div>
            </div>
          </div>

          {/* Practice Trap Sandbox */}
          <div className="p-4 bg-[#0d0f1b] rounded-xl border border-gray-800 space-y-3">
            <h4 className="text-sm font-bold text-gray-200 font-mono">
              Live Experiment: Why Dev vanished from WHERE salary &lt;&gt; 70000
            </h4>
            <p className="text-xs text-gray-400">
              When Dev has salary = NULL, evaluating <code className="text-yellow-300">NULL &lt;&gt; 70000</code> produces <code className="text-[#C77DFF]">UNKNOWN</code>. SQL WHERE only keeps rows that evaluate to TRUE!
            </p>
            <button
              onClick={() => {
                setActiveSubTab('studio');
                setSqlQuery("SELECT emp_name, salary FROM employees WHERE salary <> 70000;\n-- Notice Dev (NULL) is missing! To include Dev, write:\n-- WHERE salary <> 70000 OR salary IS NULL;");
              }}
              className="px-4 py-2 bg-[#C77DFF] hover:bg-[#b86df5] text-black font-bold text-xs rounded-xl border border-black shadow-comic-sm transition"
            >
              Test in SQL Studio →
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: NORMALIZATION STAIRCASE */}
      {activeSubTab === 'normalization' && (
        <div className="bg-[#131627] rounded-2xl border-2 border-black p-6 shadow-comic space-y-6">
          <div>
            <h3 className="font-bangers text-2xl text-[#FFB703] tracking-wider">
              THE NORMALIZATION STAIRCASE (1NF → BCNF)
            </h3>
            <p className="text-xs text-gray-400">
              Climb the staircase step by step. Each level removes specific data anomalies and redundancies!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                step: '1NF',
                name: 'First Normal Form',
                rule: 'Atomic values in every cell; unique rows.',
                removes: 'Repeating groups & comma-separated lists.',
                rhyme: 'The Key',
                example: 'Separate "DBMS, OS" into two distinct rows.',
              },
              {
                step: '2NF',
                name: 'Second Normal Form',
                rule: '1NF + no partial dependency on a composite key.',
                removes: 'Attributes depending on only PART of composite key.',
                rhyme: 'The Whole Key',
                example: 'course_id determines course_name, not (student, course).',
              },
              {
                step: '3NF',
                name: 'Third Normal Form',
                rule: '2NF + no transitive dependency.',
                removes: 'Non-key determining non-key (A→B, B→C).',
                rhyme: 'Nothing But The Key',
                example: 'dept_id determines dept_name. Move to departments table!',
              },
              {
                step: 'BCNF',
                name: 'Boyce-Codd Normal Form',
                rule: 'Every determinant X in X→Y must be a super key.',
                removes: 'Overlapping candidate key anomalies.',
                rhyme: 'Strict Super Key',
                example: 'Each teacher teaches 1 subject; student has many teachers.',
              },
            ].map(nf => (
              <div
                key={nf.step}
                className="p-4 bg-[#101322] rounded-xl border-2 border-black shadow-comic-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bangers text-2xl text-[#FFDE59]">{nf.step}</span>
                  <span className="text-[10px] font-bold uppercase bg-black text-[#FFB703] px-2 py-0.5 rounded border border-gray-700">
                    {nf.rhyme}
                  </span>
                </div>
                <div className="text-xs font-bold text-gray-200">{nf.name}</div>
                <div className="text-xs text-gray-300">
                  <span className="text-gray-400">Rule: </span> {nf.rule}
                </div>
                <div className="text-[11px] text-green-300">
                  <span className="text-gray-500">Fixes: </span> {nf.removes}
                </div>
                <div className="text-[10px] text-gray-400 bg-black/60 p-2 rounded border border-gray-800">
                  {nf.example}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-yellow-950/20 border border-yellow-700/60 rounded-xl text-xs text-yellow-200 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <div>
              <span className="font-bold">Codd&apos;s Memory Rhyme: </span>
              &quot;Every non-key attribute must depend on <strong>the key</strong> (1NF), <strong>the whole key</strong> (2NF), and <strong>nothing but the key</strong> (3NF), so help me Codd!&quot;
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: BUGSY'S POSTGRESQL ERROR DICTIONARY */}
      {activeSubTab === 'errors' && (
        <div className="space-y-4">
          <div className="p-5 bg-[#131627] rounded-2xl border-2 border-black shadow-comic flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BugsyAvatar size="md" mood="sneaky" />
              <div>
                <h3 className="font-bangers text-2xl text-[#7ED957] tracking-wider">
                  BUGSY&apos;S POSTGRESQL ERROR DICTIONARY (15 CONFESSIONS)
                </h3>
                <p className="text-xs text-gray-400">
                  The most notorious runtime errors students face in Semester 3 exams & assignments
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {postgresErrors.map(err => (
              <div
                key={err.id}
                className="p-4 bg-[#131627] rounded-xl border-2 border-black shadow-comic-sm space-y-2.5"
              >
                <div className="font-mono text-xs font-bold text-red-400 bg-red-950/40 p-2 rounded border border-red-900/60">
                  {err.errorMessage}
                </div>

                <div className="text-xs text-gray-300">
                  <span className="text-gray-400 font-bold">What it really means: </span>
                  {err.whatItReallyMeans}
                </div>

                <div className="text-xs text-green-300 bg-green-950/30 p-2 rounded border border-green-900/50">
                  <span className="font-bold text-green-400">Fix: </span> {err.fix}
                </div>

                {err.bugsyConfession && (
                  <div className="text-[11px] text-gray-400 italic bg-black/40 p-2 rounded flex items-start gap-1.5">
                    <span className="text-[#7ED957] font-bold">Bugsy:</span>
                    <span>&quot;{err.bugsyConfession}&quot;</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 8: FINAL BOSS 20 MCQS */}
      {activeSubTab === 'boss' && (
        <div className="bg-[#131627] rounded-2xl border-2 border-black p-6 shadow-comic space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-800 pb-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-[#FFDE59]" />
              <div>
                <h3 className="font-bangers text-3xl text-white tracking-wider">
                  CHAPTER 13: FINAL BOSS QUIZ (20 MIXED MCQS)
                </h3>
                <p className="text-xs text-gray-400">
                  Comprehensive exam covering Codd&apos;s rules, SQL syntax, transactions, Node.js & Prisma
                </p>
              </div>
            </div>

            {bossSubmitted && (
              <div className="text-right">
                <div className="text-2xl font-bangers text-[#7ED957]">
                  SCORE: {bossScore} / 20 ({Math.round((bossScore / 20) * 100)}%)
                </div>
                <div className="text-xs text-gray-400 font-semibold">
                  {bossScore >= 16 ? '🏆 Legendary Master Rank!' : 'Keep practicing with Prof. Tuple!'}
                </div>
              </div>
            )}
          </div>

          {/* 20 Questions List */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto no-scrollbar pr-2">
            {finalBossQuiz.map(q => {
              const selectedAns = bossAnswers[q.questionNumber];
              const isAnswered = selectedAns !== undefined;

              return (
                <div
                  key={q.id}
                  className="p-4 bg-[#0e111e] rounded-xl border border-gray-800 space-y-3"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-bold text-[#FFB703] font-mono">Q{q.questionNumber}.</span>
                    <span className="text-xs font-semibold text-gray-200">{q.question}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => {
                      let btnStyle = 'bg-[#15192c] text-gray-300 hover:bg-[#1d223c]';
                      if (bossSubmitted) {
                        if (oIdx === q.answerIndex) {
                          btnStyle = 'bg-green-600 text-white font-bold';
                        } else if (selectedAns === oIdx) {
                          btnStyle = 'bg-red-600 text-white font-bold';
                        }
                      } else if (selectedAns === oIdx) {
                        btnStyle = 'bg-[#FFDE59] text-black font-bold';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={bossSubmitted}
                          onClick={() => setBossAnswers(prev => ({ ...prev, [q.questionNumber]: oIdx }))}
                          className={`p-2.5 rounded-lg text-left text-xs transition border border-gray-800 ${btnStyle}`}
                        >
                          <span className="font-mono mr-1.5 opacity-60">
                            {String.fromCharCode(65 + oIdx)}.
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {bossSubmitted && (
                    <div className="text-xs text-gray-400 italic bg-black/40 p-2.5 rounded border border-gray-800">
                      💡 {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <span className="text-xs text-gray-400">
              Answered: {Object.keys(bossAnswers).length} / 20 questions
            </span>
            {!bossSubmitted ? (
              <button
                disabled={Object.keys(bossAnswers).length < 20}
                onClick={() => {
                  setBossSubmitted(true);
                  triggerBurst('🏆 BOSS VANQUISHED!', 'Semester 3 Exam Conquered!', 'star');
                  confetti({ particleCount: 50, spread: 80 });
                }}
                className="px-6 py-2.5 bg-[#FFDE59] hover:bg-[#ffd633] text-black font-bangers text-lg tracking-wider rounded-xl border-2 border-black shadow-comic-sm disabled:opacity-50 transition cursor-pointer"
              >
                Submit & Score Exam
              </button>
            ) : (
              <button
                onClick={() => {
                  setBossSubmitted(false);
                  setBossAnswers({});
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold text-xs rounded-xl border border-black transition"
              >
                Retake Exam
              </button>
            )}
          </div>
        </div>
      )}

      {/* 9. EXPLAIN & INDEX TUNER */}
      {activeSubTab === 'explain' && <SqlExplainStudio />}
    </div>
  );
};
