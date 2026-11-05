import React, { useState } from 'react';
import {
  Globe,
  Palette,
  Wind,
  Atom,
  FileCode2,
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
  Bug,
  HelpCircle,
  Code,
  Flame,
  Layout,
  Layers,
  Search,
  Lock,
  Unlock,
  ArrowRight,
  Code2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/soundEffects';
import { webDevBooks } from '../../data/webDevBooksData';
import { WebDevBookId, WebComicChapter } from '../../types/webDevComicTypes';
import { ProfTupleAvatar, SamAvatar, NullyAvatar, BugsyAvatar, ComicBubble } from '../characters/Characters';
import { useCourse } from '../../context/CourseContext';
import { UniversalVSCodeEditor } from '../common/UniversalVSCodeEditor';

export const WebDevHub: React.FC = () => {
  const { unlockBadge, triggerBurst, addXP } = useCourse();
  const [activeBookId, setActiveBookId] = useState<WebDevBookId>('html');
  const [activeTab, setActiveTab] = useState<'chapters' | 'sandbox' | 'problems' | 'boss' | 'dictionary'>('chapters');
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [userMcqAnswers, setUserMcqAnswers] = useState<Record<string, string>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeCodingProblemId, setActiveCodingProblemId] = useState<number | null>(1);
  const [openChapterLab, setOpenChapterLab] = useState<boolean>(false);

  // Sequential progression persistence
  const [completedWebChapters, setCompletedWebChapters] = useState<Record<string, number[]>>(() => {
    try {
      const saved = localStorage.getItem('ada_web_completed_chapters');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [sequenceWarning, setSequenceWarning] = useState<string | null>(null);

  // Boss Quiz state
  const [bossAnswers, setBossAnswers] = useState<Record<number, string>>({});
  const [bossSubmitted, setBossSubmitted] = useState<boolean>(false);

  // Live Sandbox state
  const [sandboxCode, setSandboxCode] = useState<string>(
    `<div class="p-6 max-w-sm mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex items-center space-x-4 border-2 border-slate-900">
  <div class="shrink-0 text-3xl">🚀</div>
  <div>
    <div class="text-xl font-bold text-black dark:text-white">Antigravity Web Dev</div>
    <p class="text-slate-500 dark:text-slate-400 text-sm">HTML + CSS + Tailwind Live Playground</p>
    <button onclick="alert('Supercharged!')" class="mt-3 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs shadow-md">
      Test Me!
    </button>
  </div>
</div>`
  );

  // Flexbox visualizer state
  const [flexDir, setFlexDir] = useState<'row' | 'column' | 'row-reverse'>('row');
  const [justifyContent, setJustifyContent] = useState<'flex-start' | 'center' | 'space-between' | 'space-around'>('center');
  const [alignItems, setAlignItems] = useState<'stretch' | 'center' | 'flex-start' | 'flex-end'>('center');
  const [flexGap, setFlexGap] = useState<number>(16);

  // Dictionary search
  const [dictSearch, setDictSearch] = useState<string>('');

  // Solved problems tracking with persistence
  const [solvedProblems, setSolvedProblems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ada_web_solved_problems');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const book = webDevBooks[activeBookId];
  const chapter: WebComicChapter = book.chapters.find((c) => c.id === selectedChapterId) || book.chapters[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    sound.playPop();
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSelectBook = (id: WebDevBookId) => {
    setActiveBookId(id);
    setSelectedChapterId(1);
    setBossSubmitted(false);
    setBossAnswers({});
    setSequenceWarning(null);
    sound.playPop();
  };

  const handleMcqSelect = (qId: string, label: string, isCorrect: boolean) => {
    setUserMcqAnswers((prev) => ({ ...prev, [qId]: label }));
    if (isCorrect) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
  };

  const toggleSolution = (key: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [key]: !prev[key] }));
    sound.playPop();
  };

  const markChapterCompleted = (chapterId: number) => {
    sound.playSuccess();
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    setCompletedWebChapters((prev) => {
      const currentList = prev[activeBookId] || [];
      const updatedList = currentList.includes(chapterId) ? currentList : [...currentList, chapterId];
      const next = { ...prev, [activeBookId]: updatedList };
      localStorage.setItem('ada_web_completed_chapters', JSON.stringify(next));
      return next;
    });
    if (chapterId < book.chapters.length) {
      setSelectedChapterId(chapterId + 1);
    }
    setSequenceWarning(null);
  };

  const getStarterCode = (bookId: WebDevBookId, p: { id: number; title: string; problem: string }): string => {
    if (bookId === 'html') {
      return `<!-- ${p.title} -->\n<!-- Problem: ${p.problem} -->\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>${p.title}</title>\n</head>\n<body>\n  <!-- Write your solution below -->\n  \n</body>\n</html>`;
    }
    if (bookId === 'css') {
      return `/* ${p.title} */\n/* Problem: ${p.problem} */\n\n/* Write your CSS rules below */\n`;
    }
    if (bookId === 'tailwind') {
      return `<!-- ${p.title} -->\n<!-- Problem: ${p.problem} -->\n<div class="p-6 max-w-md mx-auto bg-slate-900 text-white rounded-2xl shadow-xl space-y-4">\n  <!-- Apply Tailwind utility classes here -->\n  \n</div>`;
    }
    if (bookId === 'react') {
      return `import React, { useState } from 'react';\n\n// ${p.title}\n// Problem: ${p.problem}\nexport default function App() {\n  return (\n    <div className="p-6 bg-slate-900 text-white min-h-screen font-sans">\n      <h1 className="text-2xl font-bold mb-4">${p.title}</h1>\n      {/* Write your component logic and JSX below */}\n      \n    </div>\n  );\n}`;
    }
    return `// ${p.title}\n// Problem: ${p.problem}\n\n// Write your TypeScript solution below:\n`;
  };

  const toggleProblemSolved = (id: number) => {
    const key = `${activeBookId}-p${id}`;
    setSolvedProblems((prev) => {
      const nextVal = !prev[key];
      const next = { ...prev, [key]: nextVal };
      localStorage.setItem('ada_web_solved_problems', JSON.stringify(next));
      if (nextVal) {
        sound.playSuccess();
        confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
        triggerBurst('⚡ PROBLEM SOLVED!', `P${id} Verified & Next Unlocked! +50 XP`, 'pow');
        addXP(50, `Solved ${activeBookId.toUpperCase()} P${id}`);
        unlockBadge('badge-code-run');

        const allSolved = book.problems20.every(prob => (prob.id === id ? true : !!next[`${activeBookId}-p${prob.id}`]));
        if (allSolved) {
          if (activeBookId === 'html') unlockBadge('badge-web-html');
          if (activeBookId === 'react') unlockBadge('badge-web-react');
          if (activeBookId === 'typescript') unlockBadge('badge-web-ts');
        }
      } else {
        sound.playPop();
      }
      return next;
    });
    setSequenceWarning(null);
  };

  // Boss Quiz score calculation
  const bossScore = book.finalBoss.filter((q) => bossAnswers[q.id] === q.correct).length;
  const bossTotal = book.finalBoss.length;
  const bossPct = Math.round((bossScore / bossTotal) * 100);

  const getBookIcon = (id: WebDevBookId) => {
    switch (id) {
      case 'html': return <Globe className="w-5 h-5 text-orange-500" />;
      case 'css': return <Palette className="w-5 h-5 text-sky-500" />;
      case 'tailwind': return <Wind className="w-5 h-5 text-cyan-400" />;
      case 'react': return <Atom className="w-5 h-5 text-cyan-400" />;
      case 'typescript': return <FileCode2 className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 space-y-8 animate-fadeIn font-comic">
      {/* Top Banner: Web Universe Selector */}
      <div className="bg-slate-800/90 border-4 border-slate-700 rounded-3xl p-6 shadow-comic relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 via-sky-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full border-2 border-slate-900 shadow-sm flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Web Dev Universe
              </span>
              <span className="text-xs text-slate-400 font-bold">5 Classic Comic Books</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              Web Developer Comic Vault
            </h1>
            <p className="text-slate-400 text-sm md:text-base mt-1 max-w-2xl">
              Master the full modern web stack with Prof. Tuple, Sam, Nully, and Bugsy. Real code snippets, 100+ MCQs, 100 classic build challenges, and live sandboxes.
            </p>
          </div>

          {/* Book Switcher Pills */}
          <div className="flex flex-wrap gap-2">
            {(['html', 'css', 'tailwind', 'react', 'typescript'] as WebDevBookId[]).map((id) => {
              const b = webDevBooks[id];
              const isActive = activeBookId === id;
              return (
                <button
                  key={id}
                  onClick={() => handleSelectBook(id)}
                  className={`btn-comic-push flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-sm border-3 transition-all ${
                    isActive
                      ? 'bg-slate-950 text-white border-amber-400 shadow-comic ring-2 ring-amber-400/50'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {getBookIcon(id)}
                  <span className="uppercase">{b.id}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Meet the Gang Bar for Active Subject */}
        <div className="mt-6 pt-6 border-t-2 border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-2xl border-2 border-slate-700">
            <ProfTupleAvatar size="sm" mood="wise" />
            <div>
              <p className="text-xs font-black text-amber-400">Prof. Tuple</p>
              <p className="text-xs text-slate-300 leading-snug">{book.gangNotes.tuple}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-2xl border-2 border-slate-700">
            <SamAvatar size="sm" mood="curious" />
            <div>
              <p className="text-xs font-black text-emerald-400">Sam</p>
              <p className="text-xs text-slate-300 leading-snug">{book.gangNotes.sam}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-2xl border-2 border-slate-700">
            <NullyAvatar size="sm" mood="floating" />
            <div>
              <p className="text-xs font-black text-purple-400">Nully</p>
              <p className="text-xs text-slate-300 leading-snug">{book.gangNotes.nully}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-2xl border-2 border-slate-700">
            <BugsyAvatar size="sm" mood="sneaky" />
            <div>
              <p className="text-xs font-black text-rose-400">Bugsy</p>
              <p className="text-xs text-slate-300 leading-snug">{book.gangNotes.bugsy}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Book Title & Navigation Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-slate-800 border-2 border-slate-700">
              {getBookIcon(activeBookId)}
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">{book.title}</h2>
              <p className="text-xs text-slate-400 font-bold">{book.tagline}</p>
            </div>
          </div>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap gap-2 bg-slate-800 p-1.5 rounded-2xl border-2 border-slate-700">
          <button
            onClick={() => { setActiveTab('chapters'); sound.playPop(); }}
            className={`btn-comic-push flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wide transition-all ${
              activeTab === 'chapters'
                ? 'bg-amber-400 text-slate-950 border-2 border-slate-900 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Chapters
          </button>
          <button
            onClick={() => { setActiveTab('sandbox'); sound.playPop(); }}
            className={`btn-comic-push flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wide transition-all ${
              activeTab === 'sandbox'
                ? 'bg-cyan-400 text-slate-950 border-2 border-slate-900 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layout className="w-3.5 h-3.5" /> Live Sandbox
          </button>
          <button
            onClick={() => { setActiveTab('problems'); sound.playPop(); }}
            className={`btn-comic-push flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wide transition-all ${
              activeTab === 'problems'
                ? 'bg-emerald-400 text-slate-950 border-2 border-slate-900 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" /> 20 Problems ({book.problems20.length})
          </button>
          <button
            onClick={() => { setActiveTab('boss'); sound.playPop(); }}
            className={`btn-comic-push flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wide transition-all ${
              activeTab === 'boss'
                ? 'bg-rose-500 text-white border-2 border-slate-900 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> Final Boss
          </button>
          <button
            onClick={() => { setActiveTab('dictionary'); sound.playPop(); }}
            className={`btn-comic-push flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wide transition-all ${
              activeTab === 'dictionary'
                ? 'bg-purple-400 text-slate-950 border-2 border-slate-900 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bug className="w-3.5 h-3.5" /> Bug Dictionary
          </button>
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

      {/* TAB 1: CHAPTERS & COMIC CONTENT */}
      {activeTab === 'chapters' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chapter Selector Sidebar */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 px-2">Chapters</h3>
            <div className="space-y-2">
              {book.chapters.map((ch) => {
                const isSelected = ch.id === selectedChapterId;
                const completedList = completedWebChapters[activeBookId] || [];
                const isUnlocked = ch.id === 1 || completedList.includes(ch.id - 1);
                const isDone = completedList.includes(ch.id);

                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      if (!isUnlocked) {
                        sound.playError();
                        setSequenceWarning(`🔒 Chapter ${ch.id} is locked! Complete Chapter ${ch.id - 1} of ${book.title} first to advance.`);
                        return;
                      }
                      setSelectedChapterId(ch.id);
                      setSequenceWarning(null);
                      sound.playPop();
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${
                      !isUnlocked
                        ? 'bg-slate-950/70 text-slate-600 border-slate-900 opacity-60'
                        : isSelected
                        ? 'bg-slate-800 text-white border-amber-400 shadow-comic'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/80 hover:text-slate-200'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs border-2 shrink-0 ${
                      !isUnlocked
                        ? 'bg-slate-900 text-slate-600 border-slate-800'
                        : isDone
                        ? 'bg-emerald-400 text-slate-950 border-slate-900 font-extrabold'
                        : isSelected
                        ? 'bg-amber-400 text-slate-950 border-slate-900 font-extrabold'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {!isUnlocked ? <Lock className="w-3.5 h-3.5" /> : isDone ? '✓' : ch.id}
                    </span>
                    <div className="truncate">
                      <p className="text-xs font-black leading-tight text-white truncate">{ch.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                        {!isUnlocked ? 'Locked in sequence' : ch.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chapter Reading Pane */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-slate-800 border-4 border-slate-700 rounded-3xl p-6 shadow-comic space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full text-[10px] font-black uppercase">
                    Chapter {chapter.id}
                  </span>
                  <span className="text-xs text-slate-400">{chapter.subtitle}</span>
                </div>
                <h2 className="text-2xl font-black text-white">{chapter.title}</h2>
              </div>

              {/* Sections */}
              <div className="space-y-6">
                {chapter.sections.map((sec, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-5 rounded-2xl border-2 border-slate-700 space-y-3">
                    <h4 className="text-sm font-black text-amber-300 flex items-center gap-2">
                      <Code className="w-4 h-4 text-amber-400" /> {sec.heading}
                    </h4>

                    {sec.codeSnippet && (
                      <div className="relative rounded-xl overflow-hidden border-2 border-slate-800 bg-slate-950 p-4 font-mono text-xs">
                        <button
                          onClick={() => handleCopy(sec.codeSnippet!.code, `sec-${idx}`)}
                          className="btn-comic-push absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 text-xs flex items-center gap-1"
                          title="Copy snippet"
                        >
                          {copiedKey === `sec-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <pre className="overflow-x-auto text-emerald-400 leading-relaxed">
                          <code>{sec.codeSnippet.code}</code>
                        </pre>
                      </div>
                    )}

                    <div className="space-y-2 text-xs md:text-sm text-slate-300 leading-relaxed">
                      {sec.explanation.map((exp, eIdx) => (
                        <p key={eIdx}>{exp}</p>
                      ))}
                    </div>

                    {sec.bullets && (
                      <ul className="space-y-1 pl-4 list-disc text-xs text-slate-300">
                        {sec.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* MCQ Zone */}
              {chapter.mcqZone && chapter.mcqZone.length > 0 && (
                <div className="bg-amber-400/5 border-2 border-amber-400/40 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase tracking-wide">
                    <HelpCircle className="w-4 h-4" /> Quick-Fire MCQ Zone
                  </div>

                  <div className="space-y-4">
                    {chapter.mcqZone.map((mcq) => {
                      const selected = userMcqAnswers[mcq.id];
                      const isSubmitted = !!selected;
                      return (
                        <div key={mcq.id} className="bg-slate-900 p-4 rounded-xl border border-slate-700 space-y-3">
                          <p className="text-xs md:text-sm font-bold text-white">{mcq.question}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {mcq.options.map((opt) => {
                              const isThisSelected = selected === opt.label;
                              const isCorrectOpt = opt.label === mcq.correct;
                              let btnClass = 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700';

                              if (isSubmitted) {
                                if (isCorrectOpt) {
                                  btnClass = 'bg-emerald-900/60 border-emerald-500 text-emerald-300 font-bold';
                                } else if (isThisSelected) {
                                  btnClass = 'bg-rose-900/60 border-rose-500 text-rose-300';
                                }
                              }

                              return (
                                <button
                                  key={opt.label}
                                  onClick={() => handleMcqSelect(mcq.id, opt.label, isCorrectOpt)}
                                  className={`btn-comic-push text-left p-2.5 rounded-xl border text-xs flex items-center gap-2 transition-all ${btnClass}`}
                                >
                                  <span className="w-5 h-5 rounded-md bg-slate-950 flex items-center justify-center font-black text-[10px] shrink-0">
                                    {opt.label}
                                  </span>
                                  <span>{opt.text}</span>
                                </button>
                              );
                            })}
                          </div>
                          {isSubmitted && (
                            <p className="text-xs text-amber-300 font-semibold pt-1">
                              💡 {mcq.explanation}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Code Lab */}
              {chapter.codeLab && (
                <div className="bg-emerald-500/10 border-2 border-emerald-500/40 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-emerald-400 font-black text-sm uppercase flex items-center gap-2">
                      <Code className="w-4 h-4" /> Code Lab Challenge
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          sound.playPop();
                          setOpenChapterLab(prev => !prev);
                        }}
                        className="btn-comic-push px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg border-2 border-indigo-400 flex items-center gap-1.5 cursor-pointer shadow-comic-sm"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        {openChapterLab ? 'Close VS Code' : '💻 Code in VS Code'}
                      </button>
                      <button
                        onClick={() => toggleSolution(`lab-${chapter.id}`)}
                        className="btn-comic-push px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-lg border-2 border-slate-900 cursor-pointer shadow-comic-sm"
                      >
                        {revealedSolutions[`lab-${chapter.id}`] ? 'Hide Solution' : 'Reveal Solution'}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-white">{chapter.codeLab.task}</p>

                  {openChapterLab && (
                    <div className="pt-2 animate-fadeIn">
                      <UniversalVSCodeEditor
                        language={
                          activeBookId === 'html'
                            ? 'html'
                            : activeBookId === 'css'
                            ? 'css'
                            : activeBookId === 'tailwind'
                            ? 'html'
                            : activeBookId === 'react'
                            ? 'react'
                            : 'typescript'
                        }
                        starterCode={getStarterCode(activeBookId, {
                          id: chapter.id,
                          title: `Ch ${chapter.id} Lab`,
                          problem: chapter.codeLab.task,
                        })}
                        solutionCode={chapter.codeLab.solution}
                        problemTitle={`[Ch ${chapter.id}] ${chapter.codeLab.task}`}
                        problemId={`web-${activeBookId}-ch${chapter.id}-lab`}
                        fileName={
                          activeBookId === 'html' || activeBookId === 'tailwind'
                            ? 'index.html'
                            : activeBookId === 'css'
                            ? 'styles.css'
                            : activeBookId === 'react'
                            ? 'App.tsx'
                            : 'solution.ts'
                        }
                        onSolve={() => {
                          markChapterCompleted(chapter.id);
                        }}
                      />
                    </div>
                  )}

                  {revealedSolutions[`lab-${chapter.id}`] && (
                    <div className="space-y-2 pt-2 animate-fadeIn">
                      <div className="relative rounded-xl overflow-hidden border-2 border-slate-800 bg-slate-950 p-4 font-mono text-xs">
                        <button
                          onClick={() => handleCopy(chapter.codeLab!.solution, `lab-copy-${chapter.id}`)}
                          className="btn-comic-push absolute top-3 right-3 p-1.5 bg-slate-800 text-slate-300 rounded-lg border border-slate-700 text-xs"
                        >
                          {copiedKey === `lab-copy-${chapter.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
                          <code>{chapter.codeLab.solution}</code>
                        </pre>
                      </div>
                      {chapter.codeLab.note && (
                        <p className="text-xs text-emerald-300">→ {chapter.codeLab.note}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Misunderstanding Fixer */}
              {chapter.misunderstandings && chapter.misunderstandings.length > 0 && (
                <div className="bg-slate-900/90 rounded-2xl border-2 border-slate-700 p-5 space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <Bug className="w-4 h-4" /> Misunderstanding Fixer (Myth vs Truth)
                  </h4>
                  <div className="space-y-2">
                    {chapter.misunderstandings.map((m, mIdx) => (
                      <div key={mIdx} className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        <div className="text-rose-400 flex items-start gap-1.5">
                          <span className="font-black text-rose-500">✘</span>
                          <span>{m.myth}</span>
                        </div>
                        <div className="text-emerald-400 flex items-start gap-1.5">
                          <span className="font-black text-emerald-500">✔</span>
                          <span>{m.truth}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cheat Sheet */}
              {chapter.cheatSheet && chapter.cheatSheet.length > 0 && (
                <div className="bg-indigo-950/40 border-2 border-indigo-700/60 rounded-2xl p-4">
                  <p className="text-xs font-black uppercase text-indigo-300 mb-2">⚡ Quick Cheat Sheet</p>
                  <ul className="list-disc pl-5 text-xs text-indigo-200 space-y-1">
                    {chapter.cheatSheet.map((item, cIdx) => (
                      <li key={cIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sequential Chapter Completion Footer */}
              <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-comic">
                <div className="flex items-center gap-3">
                  {(completedWebChapters[activeBookId] || []).includes(chapter.id) ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
                  ) : (
                    <Sparkles className="w-7 h-7 text-amber-400 shrink-0" />
                  )}
                  <div>
                    <h4 className="font-black text-base text-white">
                      {(completedWebChapters[activeBookId] || []).includes(chapter.id)
                        ? `Chapter ${chapter.id} Mastered!`
                        : `Complete Chapter ${chapter.id} & Progress`}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {(completedWebChapters[activeBookId] || []).includes(chapter.id)
                        ? chapter.id < book.chapters.length
                          ? `Next in sequence: Chapter ${chapter.id + 1} is unlocked.`
                          : `All chapters in ${book.title} completed!`
                        : `Follow the sequence: complete this chapter to unlock Chapter ${Math.min(book.chapters.length, chapter.id + 1)}.`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => markChapterCompleted(chapter.id)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs border-2 border-slate-900 shadow-comic-sm transition active:translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  {(completedWebChapters[activeBookId] || []).includes(chapter.id) ? (
                    chapter.id < book.chapters.length ? (
                      <>Go To Chapter {chapter.id + 1} <ArrowRight className="w-4 h-4" /></>
                    ) : (
                      <>Book Chapters Mastered! 🏆</>
                    )
                  ) : (
                    <>Complete & Unlock Chapter {Math.min(book.chapters.length, chapter.id + 1)} <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE WEB PLAYGROUND & CSS VISUALIZER */}
      {activeTab === 'sandbox' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Section 1: Live HTML + Tailwind Preview Sandbox */}
          <div className="bg-slate-800 border-4 border-slate-700 rounded-3xl p-6 shadow-comic space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full border-2 border-slate-900 shadow-sm">
                  Live Web Sandbox
                </span>
                <h3 className="text-xl font-black text-white mt-2">Instant HTML & Tailwind Renderer</h3>
                <p className="text-xs text-slate-400">Type or paste HTML with Tailwind CSS utilities and see the live render instantly.</p>
              </div>

              {/* Preset Templates */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSandboxCode(`<div class="max-w-md mx-auto bg-gradient-to-r from-rose-500 to-indigo-600 p-1 rounded-2xl shadow-2xl">
  <div class="bg-slate-900 p-6 rounded-xl text-white space-y-3">
    <div class="flex items-center justify-between">
      <span class="text-xs uppercase font-black tracking-widest text-amber-400">Pro Feature</span>
      <span class="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full font-bold">Active</span>
    </div>
    <h3 class="text-xl font-bold">Speed of Light</h3>
    <p class="text-xs text-slate-300">Built with pure HTML & modern Tailwind utility classes.</p>
    <button class="w-full py-2 bg-white text-slate-900 font-black rounded-lg hover:bg-slate-200 transition">Get Started</button>
  </div>
</div>`);
                    sound.playPop();
                  }}
                  className="btn-comic-push px-2.5 py-1 bg-slate-900 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 text-xs font-bold"
                >
                  Gradient Card
                </button>
                <button
                  onClick={() => {
                    setSandboxCode(`<nav class="flex items-center justify-between p-4 bg-slate-950 text-white rounded-xl border border-slate-800">
  <div class="font-black text-amber-400 flex items-center gap-1.5">⚡ DailyDev</div>
  <div class="flex gap-4 text-xs font-semibold text-slate-400">
    <a href="#" class="text-white hover:text-amber-400">Home</a>
    <a href="#" class="hover:text-amber-400">Explore</a>
    <a href="#" class="hover:text-amber-400">Rankings</a>
  </div>
  <button class="px-3 py-1 bg-amber-400 text-slate-950 rounded-md font-bold text-xs hover:bg-amber-300">Sign In</button>
</nav>`);
                    sound.playPop();
                  }}
                  className="btn-comic-push px-2.5 py-1 bg-slate-900 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 text-xs font-bold"
                >
                  Navbar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Code Editor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
                  <span>HTML / TAILWIND SOURCE</span>
                  <button
                    onClick={() => handleCopy(sandboxCode, 'sandbox-code')}
                    className="hover:text-white flex items-center gap-1"
                  >
                    {copiedKey === 'sandbox-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} Copy
                  </button>
                </div>
                <textarea
                  value={sandboxCode}
                  onChange={(e) => setSandboxCode(e.target.value)}
                  className="w-full h-80 bg-slate-950 border-2 border-slate-700 rounded-2xl p-4 font-mono text-xs text-emerald-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 resize-none leading-relaxed"
                  spellCheck={false}
                />
              </div>

              {/* Rendered Preview Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
                  <span>LIVE BROWSER RENDER</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">Sandboxed</span>
                </div>
                <div className="h-80 bg-slate-900 border-2 border-slate-700 rounded-2xl p-6 overflow-auto flex items-center justify-center">
                  <div
                    className="w-full"
                    dangerouslySetInnerHTML={{ __html: sandboxCode }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Interactive Flexbox Visualizer */}
          <div className="bg-slate-800 border-4 border-slate-700 rounded-3xl p-6 shadow-comic space-y-4">
            <span className="px-3 py-1 bg-sky-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full border-2 border-slate-900 shadow-sm">
              Interactive CSS Flexbox Lab
            </span>
            <h3 className="text-xl font-black text-white mt-1">Flexbox Playground</h3>
            <p className="text-xs text-slate-400">Tweak flex properties and inspect how the layout reflows in real time.</p>

            {/* Controls */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900 p-4 rounded-2xl border-2 border-slate-700 text-xs">
              <div>
                <label className="text-slate-400 font-bold block mb-1">flex-direction</label>
                <select
                  value={flexDir}
                  onChange={(e) => setFlexDir(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                >
                  <option value="row">row</option>
                  <option value="column">column</option>
                  <option value="row-reverse">row-reverse</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">justify-content</label>
                <select
                  value={justifyContent}
                  onChange={(e) => setJustifyContent(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                >
                  <option value="flex-start">flex-start</option>
                  <option value="center">center</option>
                  <option value="space-between">space-between</option>
                  <option value="space-around">space-around</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">align-items</label>
                <select
                  value={alignItems}
                  onChange={(e) => setAlignItems(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                >
                  <option value="stretch">stretch</option>
                  <option value="center">center</option>
                  <option value="flex-start">flex-start</option>
                  <option value="flex-end">flex-end</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">gap ({flexGap}px)</label>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={flexGap}
                  onChange={(e) => setFlexGap(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer mt-1"
                />
              </div>
            </div>

            {/* Visual Box */}
            <div
              className="min-h-56 bg-slate-950 border-2 border-dashed border-slate-700 rounded-2xl p-4 transition-all"
              style={{
                display: 'flex',
                flexDirection: flexDir,
                justifyContent: justifyContent,
                alignItems: alignItems,
                gap: `${flexGap}px`
              }}
            >
              <div className="w-20 h-20 bg-amber-400 text-slate-950 font-black flex items-center justify-center rounded-xl shadow-md border-2 border-slate-900 transition-all">
                #1
              </div>
              <div className="w-24 h-16 bg-sky-400 text-slate-950 font-black flex items-center justify-center rounded-xl shadow-md border-2 border-slate-900 transition-all">
                #2
              </div>
              <div className="w-16 h-24 bg-emerald-400 text-slate-950 font-black flex items-center justify-center rounded-xl shadow-md border-2 border-slate-900 transition-all">
                #3
              </div>
            </div>

            {/* Generated CSS Snippet */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 flex items-center justify-between">
              <code>{`display: flex; flex-direction: ${flexDir}; justify-content: ${justifyContent}; align-items: ${alignItems}; gap: ${flexGap}px;`}</code>
              <button
                onClick={() => handleCopy(`display: flex; flex-direction: ${flexDir}; justify-content: ${justifyContent}; align-items: ${alignItems}; gap: ${flexGap}px;`, 'flex-css')}
                className="p-1 hover:text-white"
              >
                {copiedKey === 'flex-css' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 20 CLASSIC PROBLEMS BANK */}
      {activeTab === 'problems' && (
        <div className="bg-slate-800 border-4 border-slate-700 rounded-3xl p-6 shadow-comic space-y-6 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full border-2 border-slate-900 shadow-sm">
                Practice Bank
              </span>
              <h3 className="text-xl font-black text-white mt-1">20 Classic {book.id.toUpperCase()} Build Problems</h3>
              <p className="text-xs text-slate-400">Verbatim exercises from the comic book with verified code solutions.</p>
            </div>
            <div className="text-xs font-bold text-emerald-400 bg-slate-900 px-4 py-2 rounded-xl border border-slate-700">
              Completed: {book.problems20.filter((p) => solvedProblems[`${book.id}-p${p.id}`]).length} / 20
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {book.problems20.map((p) => {
              const pKey = `${book.id}-p${p.id}`;
              const prevKey = `${book.id}-p${p.id - 1}`;
              const isUnlocked = p.id === 1 || !!solvedProblems[prevKey];
              const isSolved = !!solvedProblems[pKey];
              const isRevealed = !!revealedSolutions[pKey];

              return (
                <div
                  key={p.id}
                  className={`p-4 rounded-2xl border-2 space-y-3 transition-all ${
                    !isUnlocked
                      ? 'bg-slate-950/60 border-slate-900 opacity-65'
                      : isSolved
                      ? 'bg-slate-900/90 border-emerald-500/50'
                      : 'bg-slate-900/90 border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        disabled={!isUnlocked}
                        onClick={() => {
                          if (!isUnlocked) {
                            sound.playError();
                            setSequenceWarning(`🔒 Problem P${p.id} is locked! Solve Problem P${p.id - 1} first.`);
                            return;
                          }
                          toggleProblemSolved(p.id);
                        }}
                        className={`btn-comic-push w-7 h-7 rounded-xl flex items-center justify-center border-2 transition-all ${
                          !isUnlocked
                            ? 'bg-slate-950 border-slate-800 text-slate-600 cursor-not-allowed'
                            : isSolved
                            ? 'bg-emerald-400 text-slate-950 border-slate-900 font-black'
                            : 'bg-slate-800 text-slate-500 border-slate-700 hover:border-amber-400 cursor-pointer'
                        }`}
                        title={!isUnlocked ? 'Locked' : isSolved ? 'Mark as unsolved' : 'Mark as solved'}
                      >
                        {!isUnlocked ? <Lock className="w-3.5 h-3.5" /> : isSolved ? <Check className="w-4 h-4 stroke-[3]" /> : p.id}
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-black ${!isUnlocked ? 'text-slate-400' : 'text-white'}`}>
                            P{p.id}. {p.title}
                          </h4>
                          {isSolved && (
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                              SOLVED
                            </span>
                          )}
                          {!isUnlocked && (
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800 flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" /> Solve P{p.id - 1} to unlock
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mt-0.5 ${!isUnlocked ? 'text-slate-500' : 'text-slate-300'}`}>{p.problem}</p>
                      </div>
                    </div>

                    {isUnlocked ? (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            sound.playPop();
                            setActiveCodingProblemId(prev => (prev === p.id ? null : p.id));
                          }}
                          className={`btn-comic-push px-3 py-1 font-bold text-xs rounded-xl border flex items-center gap-1.5 cursor-pointer shadow-comic-sm ${
                            activeCodingProblemId === p.id
                              ? 'bg-amber-400 text-slate-950 border-amber-300'
                              : 'bg-indigo-600/90 hover:bg-indigo-600 text-white border-indigo-500'
                          }`}
                        >
                          <Code2 className="w-3.5 h-3.5" />
                          <span>{activeCodingProblemId === p.id ? 'Close IDE' : '💻 Code in VS Code'}</span>
                        </button>
                        <button
                          onClick={() => toggleSolution(pKey)}
                          className="btn-comic-push px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl border border-slate-700 cursor-pointer shadow-comic-sm"
                        >
                          {isRevealed ? 'Hide Solution' : 'Solution'}
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1 shrink-0 px-2 py-1">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    )}
                  </div>

                  {isUnlocked && activeCodingProblemId === p.id && (
                    <div className="pt-3 animate-fadeIn">
                      <UniversalVSCodeEditor
                        language={
                          book.id === 'html'
                            ? 'html'
                            : book.id === 'css'
                            ? 'css'
                            : book.id === 'tailwind'
                            ? 'html'
                            : book.id === 'react'
                            ? 'react'
                            : 'typescript'
                        }
                        starterCode={getStarterCode(book.id, p)}
                        solutionCode={p.solution}
                        problemTitle={`[${book.id.toUpperCase()}] P${p.id}. ${p.title}`}
                        problemId={`${book.id}-p${p.id}`}
                        fileName={
                          book.id === 'html' || book.id === 'tailwind'
                            ? 'index.html'
                            : book.id === 'css'
                            ? 'styles.css'
                            : book.id === 'react'
                            ? 'App.tsx'
                            : 'solution.ts'
                        }
                        onSolve={() => {
                          if (!isSolved) {
                            toggleProblemSolved(p.id);
                          }
                        }}
                        nextProblemTitle={
                          p.id < 20 ? `P${p.id + 1}. ${book.problems20[p.id]?.title || ''}` : undefined
                        }
                        onGoNext={
                          p.id < 20
                            ? () => setActiveCodingProblemId(p.id + 1)
                            : undefined
                        }
                      />
                    </div>
                  )}

                  {isUnlocked && isRevealed && (
                    <div className="relative rounded-xl overflow-hidden border-2 border-slate-800 bg-slate-950 p-4 font-mono text-xs animate-fadeIn">
                      <button
                        onClick={() => handleCopy(p.solution, `prob-${pKey}`)}
                        className="btn-comic-push absolute top-3 right-3 p-1.5 bg-slate-800 text-slate-300 rounded-lg border border-slate-700 text-xs cursor-pointer"
                      >
                        {copiedKey === `prob-${pKey}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <pre className="text-emerald-400 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                        <code>{p.solution}</code>
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: FINAL BOSS BATTLE QUIZ */}
      {activeTab === 'boss' && (
        <div className="bg-slate-800 border-4 border-slate-700 rounded-3xl p-6 shadow-comic space-y-6 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 bg-rose-500 text-white font-black text-xs uppercase tracking-wider rounded-full border-2 border-slate-900 shadow-sm flex items-center gap-1 w-fit">
                <Flame className="w-3.5 h-3.5" /> Final Boss Arena
              </span>
              <h3 className="text-2xl font-black text-white mt-2">{book.id.toUpperCase()} Final Boss Exam</h3>
              <p className="text-xs text-slate-400">Test your mastery of all concepts in the book. Beat the Boss and earn your title!</p>
            </div>

            {bossSubmitted && (
              <div className="bg-slate-950 px-5 py-3 rounded-2xl border-2 border-amber-400 shadow-comic flex items-center gap-4">
                <Trophy className="w-8 h-8 text-amber-400" />
                <div>
                  <p className="text-xs font-bold text-slate-400">Score</p>
                  <p className="text-xl font-black text-amber-400">{bossScore} / {bossTotal} ({bossPct}%)</p>
                </div>
              </div>
            )}
          </div>

          {/* Quiz Questions */}
          <div className="space-y-4">
            {book.finalBoss.map((q) => {
              const selected = bossAnswers[q.id];
              const isCorrect = selected === q.correct;

              return (
                <div key={q.id} className="bg-slate-900 p-5 rounded-2xl border-2 border-slate-700 space-y-3">
                  <p className="text-sm font-bold text-white">
                    Q{q.id}. {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt) => {
                      const isThisSelected = selected === opt.label;
                      let btnClass = 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700';

                      if (bossSubmitted) {
                        if (opt.label === q.correct) {
                          btnClass = 'bg-emerald-900/60 border-emerald-500 text-emerald-300 font-bold';
                        } else if (isThisSelected) {
                          btnClass = 'bg-rose-900/60 border-rose-500 text-rose-300 font-bold';
                        }
                      } else if (isThisSelected) {
                        btnClass = 'bg-amber-400 text-slate-950 font-bold border-slate-900';
                      }

                      return (
                        <button
                          key={opt.label}
                          disabled={bossSubmitted}
                          onClick={() => {
                            setBossAnswers((prev) => ({ ...prev, [q.id]: opt.label }));
                            sound.playPop();
                          }}
                          className={`btn-comic-push text-left p-3 rounded-xl border text-xs flex items-center gap-2.5 transition-all ${btnClass}`}
                        >
                          <span className="w-5 h-5 rounded-md bg-slate-950 flex items-center justify-center font-black text-[10px] shrink-0">
                            {opt.label}
                          </span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {bossSubmitted && (
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      <p className={`font-black ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isCorrect ? '✔ Correct!' : `✘ Incorrect (Answer: Option ${q.correct})`}
                      </p>
                      <p className="text-slate-300 mt-1">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            {bossSubmitted ? (
              <button
                onClick={() => {
                  setBossAnswers({});
                  setBossSubmitted(false);
                  sound.playPop();
                }}
                className="btn-comic-push px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-black text-xs uppercase rounded-xl border-2 border-slate-900 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Retake Quiz
              </button>
            ) : (
              <button
                onClick={() => {
                  setBossSubmitted(true);
                  if (bossPct >= 70) sound.playSuccess();
                  else sound.playError();
                }}
                disabled={Object.keys(bossAnswers).length === 0}
                className="btn-comic-push px-8 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase rounded-xl border-2 border-slate-900 shadow-comic flex items-center gap-2 disabled:opacity-50"
              >
                <Trophy className="w-4 h-4" /> Submit Answers
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: BUG & ERROR DICTIONARY */}
      {activeTab === 'dictionary' && (
        <div className="bg-slate-800 border-4 border-slate-700 rounded-3xl p-6 shadow-comic space-y-6 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 bg-purple-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full border-2 border-slate-900 shadow-sm flex items-center gap-1 w-fit">
                <Bug className="w-3.5 h-3.5" /> Bug Dictionary
              </span>
              <h3 className="text-xl font-black text-white mt-2">{book.id.toUpperCase()} Bug & Error Dictionary</h3>
              <p className="text-xs text-slate-400">Instant explanations and verified solutions for common bugs and compiler errors.</p>
            </div>

            {/* Search filter */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search error messages..."
                value={dictSearch}
                onChange={(e) => setDictSearch(e.target.value)}
                className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {book.bugDictionary
              .filter((b) => b.bug.toLowerCase().includes(dictSearch.toLowerCase()) || b.causeAndFix.toLowerCase().includes(dictSearch.toLowerCase()))
              .map((b, idx) => (
                <div key={idx} className="bg-slate-900 p-4 rounded-2xl border-2 border-slate-700 space-y-2">
                  <div className="flex items-start gap-2 text-rose-400 font-bold text-xs md:text-sm">
                    <span className="font-black text-rose-500">✘</span>
                    <span>{b.bug}</span>
                  </div>
                  <div className="text-xs text-slate-300 pl-5 leading-relaxed">
                    <span className="text-emerald-400 font-bold">Fix: </span>
                    {b.causeAndFix}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
