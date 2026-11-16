import React, { useState, useMemo } from 'react';
import {
  STRIVERS_A2Z_THEORIES,
  StriverStepTheory,
  getTheoryByStepId,
} from '../../data/striversTheoryData';
import {
  BookOpen,
  Target,
  Sparkles,
  Layers,
  Search,
  CheckCircle2,
  HelpCircle,
  Code2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Award,
  Zap,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Bookmark,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';
import { SupportedLanguage } from '../../utils/languageTemplates';
import { UniversalVSCodeEditor } from '../common/UniversalVSCodeEditor';

interface StriversTheoryViewerProps {
  initialStepId?: string;
  onGoToProblems?: (stepId: string) => void;
}

export const StriversTheoryViewer: React.FC<StriversTheoryViewerProps> = ({
  initialStepId = 'step-1',
  onGoToProblems,
}) => {
  const [selectedStepId, setSelectedStepId] = useState<string>(initialStepId);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCodeLang, setActiveCodeLang] = useState<Record<string, 'cpp' | 'python'>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [expandedQAs, setExpandedQAs] = useState<Set<number>>(new Set([0]));
  const [sandboxCode, setSandboxCode] = useState<{ title: string; code: string; lang: SupportedLanguage } | null>(null);

  const currentTheory: StriverStepTheory = useMemo(() => {
    return getTheoryByStepId(selectedStepId) || STRIVERS_A2Z_THEORIES[0];
  }, [selectedStepId]);

  // Filtered theories for search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return STRIVERS_A2Z_THEORIES.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.topics.some((topic) => topic.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const handleCopy = (key: string, code: string) => {
    navigator.clipboard.writeText(code);
    sound.playPop();
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleQuizSelect = (quizId: string, optionIdx: number) => {
    sound.playPop();
    setSelectedQuizAnswers((prev) => ({ ...prev, [quizId]: optionIdx }));
  };

  const handleQuizSubmit = (quizId: string, correctIdx: number) => {
    const selected = selectedQuizAnswers[quizId];
    if (selected === undefined) return;
    setQuizSubmitted((prev) => ({ ...prev, [quizId]: true }));
    if (selected === correctIdx) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
  };

  const toggleQA = (idx: number) => {
    sound.playPop();
    setExpandedQAs((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Step Selector Carousel */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="font-mono text-xs uppercase font-bold text-slate-300">
              Select Theory Step (1 to 18)
            </span>
          </div>

          {/* Quick Theory Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts (e.g. Kadane, Dijkstra, BST)..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition"
            />
          </div>
        </div>

        {/* Search Results Dropdown (if searching) */}
        {searchResults.length > 0 && (
          <div className="p-3 bg-[#0d1222] border border-purple-500/30 rounded-2xl space-y-2 shadow-xl animate-in fade-in duration-150">
            <span className="text-[10px] font-mono font-bold text-purple-300 uppercase">
              Matching Steps ({searchResults.length}):
            </span>
            <div className="flex flex-wrap gap-2">
              {searchResults.map((res) => (
                <button
                  key={res.stepId}
                  onClick={() => {
                    sound.playPop();
                    setSelectedStepId(res.stepId);
                    setSearchQuery('');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-xs text-white flex items-center gap-2 transition cursor-pointer"
                >
                  <span>{res.icon}</span>
                  <span className="font-semibold">{res.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Carousel Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {STRIVERS_A2Z_THEORIES.map((theory) => {
            const isSelected = theory.stepId === selectedStepId;
            return (
              <button
                key={theory.stepId}
                onClick={() => {
                  sound.playPop();
                  setSelectedStepId(theory.stepId);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl whitespace-nowrap text-xs transition cursor-pointer shrink-0 border ${
                  isSelected
                    ? 'bg-purple-600 text-white font-bold border-purple-400 shadow-md scale-[1.02]'
                    : 'bg-[#0a0d18] text-slate-300 border-white/10 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                <span>{theory.icon}</span>
                <span>Step {theory.stepNumber}</span>
                <span className="text-[10px] opacity-75 font-mono">({theory.readingTime.split(' ')[0]}m)</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Step Hero Deck */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#110e24] via-[#0c1020] to-[#09152b] border border-purple-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mb-20" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1.5 shadow-sm">
                <span>{currentTheory.icon}</span>
                <span>STEP {currentTheory.stepNumber} MASTERCLASS</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-slate-300 bg-white/[0.06] border border-white/10">
                ⏱️ {currentTheory.readingTime}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/30">
                Take U Forward Verified
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {currentTheory.title}
            </h1>

            <p className="text-sm sm:text-base text-purple-200/90 font-medium leading-relaxed">
              {currentTheory.tagline}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {currentTheory.overview}
            </p>

            {/* Subtopics Covered Pills */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {currentTheory.topics.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-lg bg-white/[0.05] border border-white/10 text-[11px] text-slate-300 font-mono"
                >
                  ✓ {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right Action: Go to Step Problems */}
          {onGoToProblems && (
            <div className="shrink-0 flex flex-col gap-3 sm:min-w-[240px]">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2 text-center">
                <span className="text-xs text-slate-400 font-mono">Ready to test intuition?</span>
                <button
                  onClick={() => {
                    sound.playPop();
                    onGoToProblems(currentTheory.stepId);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-400/20 transition cursor-pointer"
                >
                  <Target className="w-4 h-4" />
                  <span>Solve Step {currentTheory.stepNumber} Problems ↗</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Core Theoretical Invariants & Mathematical Proofs */}
      {currentTheory.invariants.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <span className="p-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Zap className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
              Mathematical Invariants &amp; Core Proofs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentTheory.invariants.map((inv, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#090d1a] border border-amber-500/25 space-y-3 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <h3 className="font-bold text-sm text-white">{inv.title}</h3>
                  </div>
                  {inv.formula && (
                    <div className="p-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-300 font-mono text-xs overflow-x-auto">
                      {inv.formula}
                    </div>
                  )}
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                    {inv.explanation}
                  </p>
                </div>
                {inv.example && (
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-slate-400 font-mono">
                    <strong className="text-slate-300">Concrete Example: </strong>
                    {inv.example}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Deep Dive: Key Concepts Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <span className="p-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Lightbulb className="w-4 h-4" />
          </span>
          <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
            Key Concepts &amp; Mental Models
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentTheory.keyConcepts.map((concept, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#080b16] border border-white/10 space-y-3 hover:border-cyan-500/40 transition shadow-lg flex flex-col"
            >
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span className="text-cyan-400">§{idx + 1}</span>
                <span>{concept.title}</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {concept.description}
              </p>
              <ul className="space-y-1.5 pt-2 mt-auto border-t border-white/10">
                {concept.bulletPoints.map((bp, bIdx) => (
                  <li key={bIdx} className="text-[11px] text-slate-400 flex items-start gap-2">
                    <span className="text-cyan-400 text-xs shrink-0">•</span>
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Algorithm Walkthroughs & Pseudocode */}
      {currentTheory.algorithmWalkthroughs.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <span className="p-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Cpu className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
              Algorithm Walkthrough &amp; Pseudocode
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {currentTheory.algorithmWalkthroughs.map((algo, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#070b14] border border-emerald-500/30 space-y-3 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-emerald-300">{algo.algorithmName}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    Step-by-Step
                  </span>
                </div>
                <p className="text-xs text-slate-300 italic">{algo.intuition}</p>
                <div className="space-y-1.5">
                  {algo.steps.map((st, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        {sIdx + 1}
                      </span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
                {algo.pseudocode && (
                  <pre className="p-3 rounded-xl bg-black/70 border border-white/10 text-[11px] font-mono text-emerald-200 overflow-x-auto">
                    {algo.pseudocode}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Runnable Code Implementations & Sandbox Launcher */}
      {currentTheory.codeSnippets.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Code2 className="w-4 h-4" />
              </span>
              <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
                Verified Code Implementations
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Interactive Multi-Language Sandbox Ready
            </span>
          </div>

          <div className="space-y-4">
            {currentTheory.codeSnippets.map((snippet, idx) => {
              const snippetKey = `${currentTheory.stepId}-${idx}`;
              const isCopied = copiedKey === snippetKey;

              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#070912] border border-white/10 overflow-hidden shadow-xl"
                >
                  {/* Snippet Header */}
                  <div className="px-4 py-2.5 bg-white/[0.03] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white font-mono">{snippet.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {snippet.language}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(snippetKey, snippet.code)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 text-[11px] transition cursor-pointer"
                        title="Copy code to clipboard"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          sound.playPop();
                          setSandboxCode({
                            title: snippet.title,
                            code: snippet.code,
                            lang: snippet.language as SupportedLanguage,
                          });
                        }}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-sm transition cursor-pointer"
                        title="Open and run in interactive compiler sandbox"
                      >
                        <Zap className="w-3 h-3 fill-slate-950" />
                        <span>Run in Sandbox ↗</span>
                      </button>
                    </div>
                  </div>

                  {/* Code Block */}
                  <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto custom-scrollbar leading-relaxed">
                    {snippet.code}
                  </pre>

                  {/* Snippet Explanation */}
                  <div className="px-4 py-2 bg-white/[0.02] border-t border-white/10 text-[11px] text-slate-400">
                    💡 <span className="text-slate-300 font-medium">{snippet.explanation}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. Big-O Complexity Matrix Table */}
      {currentTheory.complexityMatrix.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <span className="p-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Award className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
              Rigorous Asymptotic Complexity Matrix
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#070a14] shadow-xl overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-slate-400 font-mono text-[11px]">
                  <th className="p-3">Operation / Algorithm</th>
                  <th className="p-3 text-emerald-400">Best Time</th>
                  <th className="p-3 text-amber-400">Average Time</th>
                  <th className="p-3 text-rose-400">Worst Time</th>
                  <th className="p-3 text-cyan-400">Auxiliary Space</th>
                  <th className="p-3">Key Technical Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-slate-300">
                {currentTheory.complexityMatrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition">
                    <td className="p-3 font-bold text-white">{item.operation}</td>
                    <td className="p-3 text-emerald-300 font-bold">{item.best}</td>
                    <td className="p-3 text-amber-300 font-bold">{item.average}</td>
                    <td className="p-3 text-rose-300 font-bold">{item.worst}</td>
                    <td className="p-3 text-cyan-300 font-bold">{item.space}</td>
                    <td className="p-3 text-slate-400 font-sans text-xs">{item.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 8. Common Pitfalls & Interview Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pitfalls */}
        <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2.5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <h3 className="font-bold text-xs uppercase font-mono text-rose-300">
              Common Pitfalls to Avoid in Code
            </h3>
          </div>
          <ul className="space-y-1.5 text-xs text-rose-200/90">
            {currentTheory.commonPitfalls.map((pitfall, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-400">✘</span>
                <span>{pitfall}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pro Tips */}
        <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-xs uppercase font-mono text-emerald-300">
              FAANG Interviewer Pro-Tips
            </h3>
          </div>
          <ul className="space-y-1.5 text-xs text-emerald-200/90">
            {currentTheory.interviewTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400">✔</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 9. Tier-1 Interview Questions & Model Answers */}
      {currentTheory.interviewQAs.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <span className="p-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <HelpCircle className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
              Frequent Interview Discussion Questions
            </h2>
          </div>

          <div className="space-y-2.5">
            {currentTheory.interviewQAs.map((qa, idx) => {
              const isOpen = expandedQAs.has(idx);
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#080b16] overflow-hidden shadow-md"
                >
                  <button
                    onClick={() => toggleQA(idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-white/[0.02] transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-amber-400/15 text-amber-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        Q{idx + 1}
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white">{qa.question}</h4>
                        <div className="flex items-center gap-1.5 mt-1">
                          {qa.companyTags.map((co, cIdx) => (
                            <span
                              key={cIdx}
                              className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-white/[0.06] text-slate-300 border border-white/10"
                            >
                              {co}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-1 border-t border-white/10 bg-white/[0.01] text-xs text-slate-300 leading-relaxed whitespace-pre-line animate-in fade-in duration-100">
                      <strong className="text-amber-300 font-mono">Model Answer: </strong>
                      {qa.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 10. Interactive Knowledge Check Quiz */}
      {currentTheory.quiz.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <span className="p-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
              Instant Step {currentTheory.stepNumber} Knowledge Check
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentTheory.quiz.map((q) => {
              const selectedOpt = selectedQuizAnswers[q.id];
              const isSubmitted = quizSubmitted[q.id];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-[#090d1c] border border-purple-500/30 space-y-3 shadow-xl"
                >
                  <p className="text-sm font-bold text-white">{q.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => {
                      let btnClass = 'bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.08]';
                      if (selectedOpt === oIdx) {
                        btnClass = 'bg-purple-600/30 text-purple-200 border-purple-500 shadow-sm';
                      }
                      if (isSubmitted) {
                        if (oIdx === q.correctIndex) {
                          btnClass = 'bg-emerald-600/30 text-emerald-300 border-emerald-500 font-bold';
                        } else if (selectedOpt === oIdx) {
                          btnClass = 'bg-rose-600/30 text-rose-300 border-rose-500';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isSubmitted}
                          onClick={() => handleQuizSelect(q.id, oIdx)}
                          className={`p-3 rounded-xl border text-xs text-left transition cursor-pointer flex items-center gap-2 ${btnClass}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-white/[0.08] flex items-center justify-center font-mono text-[10px] shrink-0">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {!isSubmitted ? (
                      <button
                        onClick={() => handleQuizSubmit(q.id, q.correctIndex)}
                        disabled={selectedOpt === undefined}
                        className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs disabled:opacity-40 transition cursor-pointer shadow-sm"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <div className="text-xs">
                        {isCorrect ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" /> Correct! {q.explanation}
                          </span>
                        ) : (
                          <span className="text-rose-400 font-bold flex items-center gap-1.5">
                            ✘ Incorrect. {q.explanation}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Code Sandbox Modal */}
      {sandboxCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl h-[85vh] bg-[#0c101d] border border-amber-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            <div className="px-5 py-3.5 bg-[#080b14] border-b border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white font-mono">{sandboxCode.title}</h3>
              </div>
              <button
                onClick={() => setSandboxCode(null)}
                className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white text-xs transition cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="flex-1 overflow-hidden p-2">
              <UniversalVSCodeEditor
                language={sandboxCode.lang}
                starterCode={sandboxCode.code}
                problemTitle={sandboxCode.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
