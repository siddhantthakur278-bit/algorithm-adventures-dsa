import React, { useState, useEffect } from 'react';
import { useCourse } from '../../context/CourseContext';
import {
  linearAlgebraChapters,
  linearAlgebraMCQs,
  linearAlgebraBrainGym,
  linearAlgebra80Problems,
  linearAlgebraMythBusters,
  linearAlgebraGlossary,
} from '../../data/linearAlgebraData';
import {
  LinearAlgebraChapter,
  LinearAlgebraMCQ,
  LinearAlgebraBrainGym,
  LinearAlgebraClassicalProblem,
} from '../../types/linearAlgebraTypes';
import {
  ProfPivotAvatar,
  VeeAvatar,
  GaussBotAvatar,
  ComicBubble,
} from '../characters/Characters';
import {
  BookOpen,
  HelpCircle,
  Trophy,
  Brain,
  Layers,
  Sparkles,
  Calculator,
  Search,
  Check,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sliders,
  Play,
  ArrowRight,
  Shield,
  Zap,
  Info,
  Lock,
  Unlock,
  Star,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/soundEffects';

export const LinearAlgebraHub: React.FC = () => {
  const { setActiveSaga, addXP, triggerBurst } = useCourse();

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    'chapters' | 'studio' | 'mcqs' | 'braingym' | 'problems80' | 'myths' | 'glossary' | 'mastery'
  >('chapters');

  // Sequence Locking Persistence
  const [completedChapters, setCompletedChapters] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ada_la_completed_chapters');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completed80Problems, setCompleted80Problems] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ada_la_completed_80');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedBrainGym, setCompletedBrainGym] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ada_la_completed_braingym');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Page 90: Mastery Tracker Matrix Persistence
  const [trackerRead, setTrackerRead] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ada_la_tracker_read');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  const [trackerMCQs, setTrackerMCQs] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ada_la_tracker_mcqs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [trackerGym, setTrackerGym] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ada_la_tracker_gym');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [trackerTeach, setTrackerTeach] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('ada_la_tracker_teach');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ada_la_tracker_read', JSON.stringify(trackerRead));
    } catch {}
  }, [trackerRead]);

  useEffect(() => {
    try {
      localStorage.setItem('ada_la_tracker_mcqs', JSON.stringify(trackerMCQs));
    } catch {}
  }, [trackerMCQs]);

  useEffect(() => {
    try {
      localStorage.setItem('ada_la_tracker_gym', JSON.stringify(trackerGym));
    } catch {}
  }, [trackerGym]);

  useEffect(() => {
    try {
      localStorage.setItem('ada_la_tracker_teach', JSON.stringify(trackerTeach));
    } catch {}
  }, [trackerTeach]);

  const toggleTrackerRead = (id: number) => {
    sound.playPop();
    setTrackerRead(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleTrackerMCQ = (id: number) => {
    sound.playPop();
    setTrackerMCQs(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleTrackerGym = (id: number) => {
    sound.playPop();
    setTrackerGym(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleTrackerTeach = (id: number) => {
    const isNew = !trackerTeach.includes(id);
    if (isNew) {
      sound.playSuccess();
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
      addXP(50);
      triggerBurst('STAR MASTERED!', '+50 XP Gained', 'star');
    } else {
      sound.playPop();
    }
    setTrackerTeach(prev =>
      isNew ? [...prev, id] : prev.filter(x => x !== id)
    );
  };

  const [sequenceWarning, setSequenceWarning] = useState<string | null>(null);

  // Persistence helpers
  const markChapterCompleted = (chapterId: number) => {
    sound.playSuccess();
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    setCompletedChapters(prev => {
      const next = prev.includes(chapterId) ? prev : [...prev, chapterId];
      localStorage.setItem('ada_la_completed_chapters', JSON.stringify(next));
      return next;
    });
    if (chapterId < 20) {
      setSelectedChapterId(chapterId + 1);
    }
    setSequenceWarning(null);
  };

  const toggle80ProblemSolved = (probId: number) => {
    setCompleted80Problems(prev => {
      const exists = prev.includes(probId);
      const next = exists ? prev.filter(id => id !== probId) : [...prev, probId];
      localStorage.setItem('ada_la_completed_80', JSON.stringify(next));
      if (!exists) {
        sound.playSuccess();
        confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
      } else {
        sound.playPop();
      }
      return next;
    });
    setSequenceWarning(null);
  };

  const markBrainGymCompleted = (gymId: number) => {
    sound.playSuccess();
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    setCompletedBrainGym(prev => {
      const next = prev.includes(gymId) ? prev : [...prev, gymId];
      localStorage.setItem('ada_la_completed_braingym', JSON.stringify(next));
      return next;
    });
    if (gymId < 20) {
      setSelectedBrainGymId(gymId + 1);
      setRevealBrainGymSolution(false);
    }
    setSequenceWarning(null);
  };

  // Chapter state
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const currentChapter: LinearAlgebraChapter =
    linearAlgebraChapters.find(c => c.id === selectedChapterId) || linearAlgebraChapters[0];

  // I CAN Checklist local progress
  const [checkedICan, setCheckedICan] = useState<Record<string, boolean>>({});

  const toggleICan = (key: string) => {
    sound.playPop();
    const updated = { ...checkedICan, [key]: !checkedICan[key] };
    setCheckedICan(updated);
    if (!checkedICan[key]) {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  // MCQ State
  const [mcqFilterChapter, setMcqFilterChapter] = useState<number | 'all'>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});

  const filteredMCQs =
    mcqFilterChapter === 'all'
      ? linearAlgebraMCQs
      : linearAlgebraMCQs.filter(m => m.chapterId === mcqFilterChapter);

  const handleSelectAnswer = (mcqId: string, optionLabel: string, correct: string) => {
    if (selectedAnswers[mcqId]) return; // locked
    setSelectedAnswers(prev => ({ ...prev, [mcqId]: optionLabel }));
    setRevealedExplanations(prev => ({ ...prev, [mcqId]: true }));

    if (optionLabel === correct) {
      sound.playSuccess();
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
      });
    } else {
      sound.playError();
    }
  };

  // Brain Gym State
  const [selectedBrainGymId, setSelectedBrainGymId] = useState<number>(1);
  const [revealBrainGymSolution, setRevealBrainGymSolution] = useState<boolean>(false);
  const currentBrainGym =
    linearAlgebraBrainGym.find(b => b.id === selectedBrainGymId) || linearAlgebraBrainGym[0];

  // 80 Classical Problems State
  const [problemSectionFilter, setProblemSectionFilter] = useState<string>('all');
  const [revealedProblemIds, setRevealedProblemIds] = useState<Record<number, boolean>>({});

  const toggleRevealProblem = (id: number) => {
    sound.playPop();
    setRevealedProblemIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const sectionsList = [
    'all',
    'A. Systems and their solutions',
    'B. Row picture and column picture',
    'C. Matrix multiplication',
    'D. Vectors',
    'E. Linear combinations and span',
    'F. Elimination & Row Operations',
    'G. LU Factorisation',
    'H. Linear Dependence',
    'I. Column Space & Rank',
    'J. Complete Solutions',
    'K. Subspaces & Four Fundamental Subspaces',
  ];

  const filtered80Problems =
    problemSectionFilter === 'all'
      ? linearAlgebra80Problems
      : linearAlgebra80Problems.filter(p => p.section === problemSectionFilter);

  // Glossary Search
  const [glossarySearch, setGlossarySearch] = useState<string>('');
  const filteredGlossary = linearAlgebraGlossary.filter(
    g =>
      g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      g.meaning.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  // --- INTERACTIVE MATRIX STUDIO STATES ---
  const [matrixA, setMatrixA] = useState<number[][]>([
    [1, 2],
    [3, 4],
  ]);
  const [matrixRrefSteps, setMatrixRrefSteps] = useState<string[]>([]);
  const [calculatedRref, setCalculatedRref] = useState<number[][] | null>(null);

  // Vector Lab States
  const [vecU, setVecU] = useState<[number, number, number]>([3, 4, 0]);
  const [vecV, setVecV] = useState<[number, number, number]>([4, -3, 0]);

  // Dimension Explorer
  const [dimM, setDimM] = useState<number>(4);
  const [dimN, setDimN] = useState<number>(6);
  const [dimR, setDimR] = useState<number>(3);

  // Matrix Solver Execution
  const runElimination2x2 = () => {
    sound.playPop();
    const a = matrixA[0][0];
    const b = matrixA[0][1];
    const c = matrixA[1][0];
    const d = matrixA[1][1];

    const steps: string[] = [];
    steps.push(`Start matrix A = [[${a}, ${b}], [${c}, ${d}]]`);

    if (a === 0 && c === 0) {
      steps.push('Column 1 is all zeros. Matrix is already in echelon form.');
      setCalculatedRref([
        [0, 0],
        [0, 0],
      ]);
      setMatrixRrefSteps(steps);
      return;
    }

    let r1 = [a, b];
    let r2 = [c, d];

    if (r1[0] === 0) {
      steps.push('Pivot 1 is 0! Swapping row 1 and row 2.');
      const temp = r1;
      r1 = r2;
      r2 = temp;
      steps.push(`After swap: Row 1 = [${r1}], Row 2 = [${r2}]`);
    }

    const pivot1 = r1[0];
    const mult = r2[0] / pivot1;
    steps.push(`Pivot 1 = ${pivot1}. Multiplier l₂₁ = entry / pivot = ${r2[0]} / ${pivot1} = ${mult.toFixed(2)}`);

    const newR2 = [r2[0] - mult * r1[0], r2[1] - mult * r1[1]];
    steps.push(`Row 2 - (${mult.toFixed(2)})×Row 1 = [${newR2[0].toFixed(2)}, ${newR2[1].toFixed(2)}]`);

    // Normalize to RREF
    const rrefR1 = [r1[0] / pivot1, r1[1] / pivot1];
    steps.push(`Normalize Row 1 by pivot ${pivot1}: [${rrefR1[0].toFixed(2)}, ${rrefR1[1].toFixed(2)}]`);

    let finalR1 = [...rrefR1];
    let finalR2 = [...newR2];

    if (Math.abs(newR2[1]) > 0.0001) {
      const pivot2 = newR2[1];
      finalR2 = [0, 1];
      steps.push(`Pivot 2 = ${pivot2.toFixed(2)}. Normalize Row 2 to [0, 1].`);
      finalR1 = [1, 0];
      steps.push(`Eliminate above pivot 2: Row 1 - (${rrefR1[1].toFixed(2)})×Row 2 = [1, 0].`);
    } else {
      steps.push('Row 2 is all zeros. Rank = 1.');
      finalR2 = [0, 0];
    }

    setCalculatedRref([finalR1, finalR2]);
    setMatrixRrefSteps(steps);
  };

  // Vector metrics
  const lenU = Math.sqrt(vecU[0] ** 2 + vecU[1] ** 2 + vecU[2] ** 2);
  const lenV = Math.sqrt(vecV[0] ** 2 + vecV[1] ** 2 + vecV[2] ** 2);
  const dotUV = vecU[0] * vecV[0] + vecU[1] * vecV[1] + vecU[2] * vecV[2];
  const cosTheta = lenU > 0 && lenV > 0 ? dotUV / (lenU * lenV) : 0;
  const angleDeg = Math.acos(Math.max(-1, Math.min(1, cosTheta))) * (180 / Math.PI);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-[#12162a] border-2 border-black rounded-3xl p-5 sm:p-7 shadow-comic relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FBBF24]/15 via-[#06B6D4]/10 to-transparent pointer-events-none rounded-full blur-2xl" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase bg-[#FBBF24] text-black border border-black shadow-comic-sm">
                20 Chapters Comic Adventure
              </span>
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono text-cyan-300 bg-[#08222b] border border-[#06B6D4]/40">
                60 MCQs • 20 Brain-Gym • 80 Problems
              </span>
            </div>
            <h1 className="font-bangers text-3xl sm:text-5xl text-white tracking-wide drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              LINEAR ALGEBRA: THE COMIC ADVENTURE
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Master the entire progression from systems of equations to the beautiful{' '}
              <strong className="text-[#38BDF8]">Four Fundamental Subspaces</strong> through visual comics,
              interactive matrix labs, and step-by-step proofs!
            </p>
          </div>

          {/* Guide Avatars Trio */}
          <div className="flex items-center gap-3 bg-[#0a0d18] p-3 rounded-2xl border-2 border-[#1c243c] shadow-comic-sm">
            <div className="text-center">
              <ProfPivotAvatar size="sm" mood="wise" />
              <span className="block text-[10px] font-bangers text-[#FBBF24] mt-1">Prof. Pivot</span>
            </div>
            <div className="text-center">
              <VeeAvatar size="sm" mood="curious" />
              <span className="block text-[10px] font-bangers text-[#FB923C] mt-1">Vee</span>
            </div>
            <div className="text-center">
              <GaussBotAvatar size="sm" mood="active" />
              <span className="block text-[10px] font-bangers text-[#06B6D4] mt-1">Gauss-bot</span>
            </div>
          </div>
        </div>

        {/* Sub-Tabs Navigation Bar */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-[#1e2742]">
          {[
            { id: 'chapters', label: '📖 20 Chapters & Comics', count: 20 },
            { id: 'studio', label: '⚡ Matrix & Vector Studio', badge: 'Interactive' },
            { id: 'mcqs', label: '🎯 60 Quick-fire MCQs', count: 60 },
            { id: 'braingym', label: '🧠 20 Brain-Gym Scenarios', count: 20 },
            { id: 'problems80', label: '⚔️ 80 Classical Problems', count: 80 },
            { id: 'myths', label: '🛡️ Myth-Buster Clinic', count: 10 },
            { id: 'glossary', label: '📚 Glossary & Formulas', count: 25 },
            { id: 'mastery', label: '⭐ Mastery Tracker & Beyond', badge: 'Page 90' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPop();
                setActiveTab(tab.id as any);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bangers tracking-wide transition border cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-[#FBBF24] text-black border-black shadow-comic-sm scale-105'
                  : 'bg-[#0f1424] text-slate-300 border-[#1c253e] hover:text-white hover:bg-[#161d33]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[9px] bg-cyan-900/80 text-cyan-200 px-1.5 py-0.2 rounded border border-cyan-400/40">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sequential Warning Alert Banner */}
      {sequenceWarning && (
        <div className="bg-rose-950/80 border-2 border-rose-500 p-4 rounded-2xl flex items-center justify-between gap-3 text-rose-200 text-xs sm:text-sm font-bold shadow-comic-sm animate-shake">
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
      {activeTab === 'chapters' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Chapter Selector Rail (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-[#0e1222] p-4 rounded-2xl border-2 border-[#1c243a] shadow-comic-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bangers text-base text-white">MAP OF LINEAR ALGEBRA</h3>
                <span className="text-xs font-mono text-[#FBBF24] font-bold">Ch. {selectedChapterId}/20</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Follow the 20-chapter story arc in strict pedagogical sequence: master each chapter to unlock the next!
              </p>

              {/* Chapter Buttons List */}
              <div className="space-y-1.5 max-h-[620px] overflow-y-auto pr-1">
                {linearAlgebraChapters.map(chap => {
                  const isSelected = chap.id === selectedChapterId;
                  const isUnlocked = chap.id === 1 || completedChapters.includes(chap.id - 1);
                  const isDone = completedChapters.includes(chap.id);

                  return (
                    <button
                      key={chap.id}
                      onClick={() => {
                        if (!isUnlocked) {
                          sound.playError();
                          setSequenceWarning(`🔒 Chapter ${chap.id} is locked! Complete Chapter ${chap.id - 1} first to advance.`);
                          return;
                        }
                        sound.playPop();
                        setSelectedChapterId(chap.id);
                        setSequenceWarning(null);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-mono transition border flex items-center justify-between cursor-pointer ${
                        !isUnlocked
                          ? 'bg-[#060810] border-[#131826] text-slate-600 opacity-60'
                          : isSelected
                          ? 'bg-[#1e2846] border-[#FBBF24] text-white shadow-comic-sm font-bold'
                          : 'bg-[#090d18] border-[#182035] text-slate-400 hover:text-white hover:bg-[#12172a]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                            !isUnlocked
                              ? 'bg-[#121622] text-slate-600'
                              : isDone
                              ? 'bg-emerald-500 text-black font-extrabold'
                              : isSelected
                              ? 'bg-[#FBBF24] text-black font-extrabold'
                              : 'bg-[#161c30] text-slate-400'
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
                        <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#FBBF24]' : 'text-slate-600'}`} />
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
            <div className="bg-[#0f1424] p-5 sm:p-6 rounded-2xl border-2 border-black shadow-comic space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-[#FBBF24] text-black font-bangers text-xs border border-black shadow-comic-sm">
                  CHAPTER {currentChapter.id} OF 20
                </span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={selectedChapterId <= 1}
                    onClick={() => {
                      setSelectedChapterId(c => Math.max(1, c - 1));
                      sound.playPop();
                    }}
                    className="p-1.5 rounded-lg bg-[#182036] hover:bg-[#222c4a] text-slate-300 disabled:opacity-40 cursor-pointer"
                    title="Previous Chapter"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={selectedChapterId >= 20 || !completedChapters.includes(selectedChapterId)}
                    onClick={() => {
                      if (!completedChapters.includes(selectedChapterId)) {
                        sound.playError();
                        setSequenceWarning(`🔒 Complete Chapter ${selectedChapterId} first to unlock Chapter ${selectedChapterId + 1}!`);
                        return;
                      }
                      setSelectedChapterId(c => Math.min(20, c + 1));
                      sound.playPop();
                    }}
                    className="p-1.5 rounded-lg bg-[#182036] hover:bg-[#222c4a] text-slate-300 disabled:opacity-40 cursor-pointer"
                    title={!completedChapters.includes(selectedChapterId) ? "Complete current chapter to advance" : "Next Chapter"}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h2 className="font-bangers text-2xl sm:text-3xl text-white tracking-wide">
                {currentChapter.title}
              </h2>
              <p className="text-xs text-[#38BDF8] font-mono">{currentChapter.subtitle}</p>

              {/* Comic Strip Dialogues */}
              <div className="space-y-3 pt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Comic Storyboard
                </span>
                <div className="space-y-2.5">
                  {currentChapter.comicDialogue.map((line, idx) => (
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
            <div className="bg-[#090d18] p-5 sm:p-6 rounded-2xl border border-[#1b233a] shadow-comic-sm space-y-4">
              <h3 className="font-bangers text-lg text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#FBBF24]" />
                THEORY & CORE INSIGHTS
              </h3>

              <div className="space-y-4">
                {currentChapter.theory.map((sec, idx) => (
                  <div key={idx} className="space-y-2 border-b border-[#151c2e] pb-3 last:border-b-0">
                    <h4 className="font-bold text-sm text-[#38BDF8] font-mono">{sec.heading}</h4>
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-xs text-slate-300 leading-relaxed font-sans">
                        {p}
                      </p>
                    ))}
                    {sec.bullets && (
                      <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 font-mono pt-1">
                        {sec.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* BIG IDEA Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FBBF24]/15 via-[#FB923C]/10 to-transparent border-2 border-[#FBBF24] shadow-comic-yellow space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FBBF24]" />
                <h4 className="font-bangers text-base text-[#FBBF24] tracking-wide">
                  ★ BIG IDEA TO MEMORIZE
                </h4>
              </div>
              <p className="text-xs font-bold text-white font-mono">{currentChapter.bigIdea.title}</p>
              <p className="text-xs text-slate-200">{currentChapter.bigIdea.content}</p>
            </div>

            {/* ✎ Worked Example */}
            <div className="bg-[#0e1424] p-5 rounded-2xl border border-[#1d2742] space-y-3">
              <h4 className="font-bangers text-base text-[#10B981] flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                WORKED STEP-BY-STEP EXAMPLE: {currentChapter.workedExample.title}
              </h4>
              <div className="space-y-2">
                {currentChapter.workedExample.steps.map((st, sIdx) => (
                  <div key={sIdx} className="p-2.5 rounded-xl bg-[#080d19] border border-[#1b233a] text-xs font-mono text-slate-300">
                    {st}
                  </div>
                ))}
              </div>
              <div className="p-3 bg-[#071d14] rounded-xl border border-[#10B981]/50 text-xs font-bold font-mono text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Result: {currentChapter.workedExample.result}</span>
              </div>
            </div>

            {/* ✖ Oops Corner: Myths & Traps */}
            <div className="bg-[#1f1015] p-5 rounded-2xl border-2 border-[#F43F5E] shadow-comic-rose space-y-3">
              <h4 className="font-bangers text-base text-[#F43F5E] flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                ✖ OOPS CORNER — COMMON STUDENT TRAPS & FIXES
              </h4>
              <div className="space-y-2.5">
                {currentChapter.oopsCorner.map((oops, oIdx) => (
                  <div key={oIdx} className="p-3 bg-[#12090c] rounded-xl border border-[#3b1219] space-y-1">
                    <p className="text-xs text-rose-300 font-semibold line-through">
                      Myth: {oops.myth}
                    </p>
                    <p className="text-xs text-emerald-300 font-mono">
                      Truth: {oops.truth}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* I CAN Checklist */}
            <div className="bg-[#0b0e1a] p-5 rounded-2xl border border-[#1d253c] space-y-3">
              <h4 className="font-bangers text-base text-cyan-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                I CAN… MASTERY SELF-CHECK
              </h4>
              <p className="text-[11px] text-slate-400">
                Tick each box only when you feel confident enough to explain it to a peer!
              </p>
              <div className="space-y-2">
                {currentChapter.iCanList.map((item, idx) => {
                  const key = `ch${currentChapter.id}-ican-${idx}`;
                  const isChecked = !!checkedICan[key];
                  return (
                    <label
                      key={idx}
                      onClick={() => toggleICan(key)}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition cursor-pointer ${
                        isChecked
                          ? 'bg-[#0a2318] border-[#10B981] text-emerald-200'
                          : 'bg-[#0e1322] border-[#1c243a] text-slate-300 hover:text-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-[#10B981] focus:ring-0 cursor-pointer"
                      />
                      <span className="text-xs font-medium leading-snug">{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Sequential Chapter Completion Footer */}
            <div className="bg-[#12182c] border-2 border-black rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-comic">
              <div className="flex items-center gap-3">
                {completedChapters.includes(currentChapter.id) ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
                ) : (
                  <Sparkles className="w-7 h-7 text-[#FBBF24] shrink-0" />
                )}
                <div>
                  <h4 className="font-bangers text-lg text-white">
                    {completedChapters.includes(currentChapter.id)
                      ? `Chapter ${currentChapter.id} Mastered!`
                      : `Complete Chapter ${currentChapter.id} & Unlock Next`}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {completedChapters.includes(currentChapter.id)
                      ? currentChapter.id < 20
                        ? `Next in sequence: Chapter ${currentChapter.id + 1} is now accessible.`
                        : `Congratulations! You conquered all 20 chapters of Linear Algebra!`
                      : `Follow the sequence: complete this chapter to unlock Chapter ${Math.min(20, currentChapter.id + 1)}.`}
                  </p>
                </div>
              </div>

              <button
                onClick={() => markChapterCompleted(currentChapter.id)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#FBBF24] hover:bg-[#f59e0b] text-black font-bangers text-xs border-2 border-black shadow-comic-sm transition active:translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                {completedChapters.includes(currentChapter.id) ? (
                  currentChapter.id < 20 ? (
                    <>Go To Chapter {currentChapter.id + 1} <ArrowRight className="w-4 h-4" /></>
                  ) : (
                    <>All Chapters Mastered! 🏆</>
                  )
                ) : (
                  <>Complete & Unlock Chapter {Math.min(20, currentChapter.id + 1)} <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. INTERACTIVE MATRIX & VECTOR STUDIO */}
      {activeTab === 'studio' && (
        <div className="space-y-6">
          <div className="bg-[#0e1220] p-6 rounded-2xl border-2 border-black shadow-comic space-y-6">
            <div>
              <h3 className="font-bangers text-2xl text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#FBBF24]" />
                GAUSS-BOT STEP-BY-STEP ELIMINATION & RREF ENGINE
              </h3>
              <p className="text-xs text-slate-400">
                Input any 2×2 matrix and watch Gauss-bot calculate multipliers, clear entries, and compute RREF!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Matrix Inputs */}
              <div className="space-y-3 bg-[#080c18] p-4 rounded-xl border border-[#1b233a]">
                <span className="text-xs font-bangers text-[#38BDF8] block">Input Matrix A (2 × 2)</span>
                <div className="grid grid-cols-2 gap-3 max-w-xs">
                  <input
                    type="number"
                    value={matrixA[0][0]}
                    onChange={e =>
                      setMatrixA([
                        [Number(e.target.value), matrixA[0][1]],
                        matrixA[1],
                      ])
                    }
                    className="p-2 bg-[#12172a] rounded-lg border border-[#232d4b] text-center font-mono font-bold text-white text-sm"
                  />
                  <input
                    type="number"
                    value={matrixA[0][1]}
                    onChange={e =>
                      setMatrixA([
                        [matrixA[0][0], Number(e.target.value)],
                        matrixA[1],
                      ])
                    }
                    className="p-2 bg-[#12172a] rounded-lg border border-[#232d4b] text-center font-mono font-bold text-white text-sm"
                  />
                  <input
                    type="number"
                    value={matrixA[1][0]}
                    onChange={e =>
                      setMatrixA([
                        matrixA[0],
                        [Number(e.target.value), matrixA[1][1]],
                      ])
                    }
                    className="p-2 bg-[#12172a] rounded-lg border border-[#232d4b] text-center font-mono font-bold text-white text-sm"
                  />
                  <input
                    type="number"
                    value={matrixA[1][1]}
                    onChange={e =>
                      setMatrixA([
                        matrixA[0],
                        [matrixA[1][0], Number(e.target.value)],
                      ])
                    }
                    className="p-2 bg-[#12172a] rounded-lg border border-[#232d4b] text-center font-mono font-bold text-white text-sm"
                  />
                </div>

                <button
                  onClick={runElimination2x2}
                  className="px-4 py-2 rounded-xl bg-[#06B6D4] hover:bg-[#22d3ee] text-black font-bangers text-xs border border-black shadow-comic-sm transition cursor-pointer flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" /> Run Gauss-bot Elimination
                </button>
              </div>

              {/* RREF Outputs */}
              <div className="space-y-3 bg-[#080c18] p-4 rounded-xl border border-[#1b233a]">
                <span className="text-xs font-bangers text-[#10B981] block">RREF Result</span>
                {calculatedRref ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-[#0c1424] rounded-xl border border-[#1e2a48] font-mono text-center text-emerald-300 text-sm font-bold">
                      [[{calculatedRref[0][0].toFixed(2)}, {calculatedRref[0][1].toFixed(2)}], [
                      {calculatedRref[1][0].toFixed(2)}, {calculatedRref[1][1].toFixed(2)}]]
                    </div>
                    <div className="space-y-1.5 max-h-40 overflow-y-auto">
                      {matrixRrefSteps.map((st, i) => (
                        <p key={i} className="text-[11px] font-mono text-slate-300">
                          {i + 1}. {st}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">Click "Run Gauss-bot Elimination" to inspect steps.</p>
                )}
              </div>
            </div>
          </div>

          {/* Vector Lab: Dot Product, Angle & Orthogonality */}
          <div className="bg-[#0e1220] p-6 rounded-2xl border-2 border-black shadow-comic space-y-6">
            <div>
              <h3 className="font-bangers text-2xl text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#38BDF8]" />
                VECTOR LAB: DOT PRODUCT, LENGTH & ORTHOGONALITY
              </h3>
              <p className="text-xs text-slate-400">
                Explore the geometry of vectors: compute lengths ||u||, ||v||, the dot product u · v, and test if they meet at 90°!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vector inputs */}
              <div className="space-y-4 bg-[#080c18] p-4 rounded-xl border border-[#1b233a]">
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-[#FBBF24] font-bold">Vector u = (x, y, z)</span>
                  <div className="flex gap-2">
                    {[0, 1, 2].map(idx => (
                      <input
                        key={idx}
                        type="number"
                        value={vecU[idx]}
                        onChange={e => {
                          const updated = [...vecU] as [number, number, number];
                          updated[idx] = Number(e.target.value);
                          setVecU(updated);
                        }}
                        className="w-16 p-2 bg-[#12172a] rounded-lg border border-[#232d4b] text-center font-mono font-bold text-white text-xs"
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-[#38BDF8] font-bold">Vector v = (x, y, z)</span>
                  <div className="flex gap-2">
                    {[0, 1, 2].map(idx => (
                      <input
                        key={idx}
                        type="number"
                        value={vecV[idx]}
                        onChange={e => {
                          const updated = [...vecV] as [number, number, number];
                          updated[idx] = Number(e.target.value);
                          setVecV(updated);
                        }}
                        className="w-16 p-2 bg-[#12172a] rounded-lg border border-[#232d4b] text-center font-mono font-bold text-white text-xs"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Vector Results */}
              <div className="bg-[#080c18] p-4 rounded-xl border border-[#1b233a] space-y-2.5 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-[#182036]">
                  <span className="text-slate-400">||u|| (Length):</span>
                  <span className="text-white font-bold">{lenU.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#182036]">
                  <span className="text-slate-400">||v|| (Length):</span>
                  <span className="text-white font-bold">{lenV.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#182036]">
                  <span className="text-slate-400">u · v (Dot Product):</span>
                  <span className="text-[#FBBF24] font-bold">{dotUV.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#182036]">
                  <span className="text-slate-400">Angle θ:</span>
                  <span className="text-[#38BDF8] font-bold">{angleDeg.toFixed(1)}°</span>
                </div>
                <div className="pt-2">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bangers block text-center border ${
                      Math.abs(dotUV) < 0.0001
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                        : 'bg-[#141b2e] text-slate-300 border-[#222d48]'
                    }`}
                  >
                    {Math.abs(dotUV) < 0.0001
                      ? '⚡ ORTHOGONAL (u ⊥ v — Angle is exactly 90°!)'
                      : dotUV > 0
                      ? 'Acute Angle (u · v > 0)'
                      : 'Obtuse Angle (u · v < 0)'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dimension & Fundamental Subspaces Explorer */}
          <div className="bg-[#0e1220] p-6 rounded-2xl border-2 border-black shadow-comic space-y-6">
            <div>
              <h3 className="font-bangers text-2xl text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#FBBF24]" />
                FOUR FUNDAMENTAL SUBSPACES DIMENSION THEOREM EXPLORER
              </h3>
              <p className="text-xs text-slate-400">
                Adjust matrix parameters m (rows), n (cols), and rank r. Watch how the dimension counts partition ℝⁿ and ℝᵐ!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-300">m (Equations / Rows): {dimM}</span>
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={dimM}
                  onChange={e => setDimM(Number(e.target.value))}
                  className="w-full accent-[#FBBF24]"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-300">n (Unknowns / Columns): {dimN}</span>
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={dimN}
                  onChange={e => setDimN(Number(e.target.value))}
                  className="w-full accent-[#38BDF8]"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-300">
                  Rank r: {Math.min(dimR, Math.min(dimM, dimN))}
                </span>
                <input
                  type="range"
                  min={0}
                  max={Math.min(dimM, dimN)}
                  value={Math.min(dimR, Math.min(dimM, dimN))}
                  onChange={e => setDimR(Number(e.target.value))}
                  className="w-full accent-[#10B981]"
                />
              </div>
            </div>

            {/* Subspace Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input Space ℝⁿ */}
              <div className="p-4 rounded-xl bg-[#090e1c] border border-[#1b2644] space-y-2">
                <span className="font-bangers text-sm text-[#38BDF8] block">
                  INPUT SPACE ℝ^{dimN} ({dimN} Dimensions)
                </span>
                <div className="space-y-1 text-xs font-mono text-slate-300">
                  <p>• Row Space C(Aᵀ): Dimension = r = {Math.min(dimR, Math.min(dimM, dimN))}</p>
                  <p>• Null Space N(A): Dimension = n - r = {dimN - Math.min(dimR, Math.min(dimM, dimN))}</p>
                  <div className="p-2 bg-[#0c152a] rounded border border-sky-500/30 text-sky-200 mt-2">
                    Orthogonal Complements: {Math.min(dimR, Math.min(dimM, dimN))} + {dimN - Math.min(dimR, Math.min(dimM, dimN))} = {dimN} ✓
                  </div>
                </div>
              </div>

              {/* Output Space ℝᵐ */}
              <div className="p-4 rounded-xl bg-[#090e1c] border border-[#1b2644] space-y-2">
                <span className="font-bangers text-sm text-[#FBBF24] block">
                  OUTPUT SPACE ℝ^{dimM} ({dimM} Dimensions)
                </span>
                <div className="space-y-1 text-xs font-mono text-slate-300">
                  <p>• Column Space C(A): Dimension = r = {Math.min(dimR, Math.min(dimM, dimN))}</p>
                  <p>• Left Null Space N(Aᵀ): Dimension = m - r = {dimM - Math.min(dimR, Math.min(dimM, dimN))}</p>
                  <div className="p-2 bg-[#1f1908] rounded border border-amber-500/30 text-amber-200 mt-2">
                    Orthogonal Complements: {Math.min(dimR, Math.min(dimM, dimN))} + {dimM - Math.min(dimR, Math.min(dimM, dimN))} = {dimM} ✓
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. 60 QUICK-FIRE MCQS VIEW */}
      {activeTab === 'mcqs' && (
        <div className="space-y-6">
          <div className="bg-[#0e1220] p-6 rounded-2xl border-2 border-black shadow-comic space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bangers text-2xl text-white">60 QUICK-FIRE MCQ CHALLENGE</h3>
                <p className="text-xs text-slate-400">
                  3 questions per chapter with instant feedback and complete conceptual reasons.
                </p>
              </div>

              {/* Chapter filter selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Filter Chapter:</span>
                <select
                  value={mcqFilterChapter}
                  onChange={e =>
                    setMcqFilterChapter(e.target.value === 'all' ? 'all' : Number(e.target.value))
                  }
                  className="bg-[#141a2e] border border-[#232d4b] rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none"
                >
                  <option value="all">All 20 Chapters (60 MCQs)</option>
                  {linearAlgebraChapters.map(c => (
                    <option key={c.id} value={c.id}>
                      Ch. {c.id}: {c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4 pt-2">
              {filteredMCQs.map((mcq, idx) => {
                const userAns = selectedAnswers[mcq.id];
                const isRevealed = revealedExplanations[mcq.id];
                const isCorrect = userAns === mcq.correctOption;

                return (
                  <div
                    key={mcq.id}
                    className="p-4 rounded-xl bg-[#080d19] border border-[#1b233a] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#FBBF24]">
                        Question {mcq.id.replace('mcq-', '').replace('-', '.')} (Ch. {mcq.chapterId})
                      </span>
                      {userAns && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isCorrect ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                          }`}
                        >
                          {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-semibold text-white">{mcq.question}</p>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mcq.options.map(opt => {
                        const isChosen = userAns === opt.label;
                        const isThisCorrect = opt.label === mcq.correctOption;

                        return (
                          <button
                            key={opt.label}
                            disabled={!!userAns}
                            onClick={() => handleSelectAnswer(mcq.id, opt.label, mcq.correctOption)}
                            className={`p-2.5 rounded-xl border text-left text-xs font-mono transition flex items-center gap-2 cursor-pointer ${
                              userAns
                                ? isThisCorrect
                                  ? 'bg-[#0a2618] border-[#10B981] text-emerald-200'
                                  : isChosen
                                  ? 'bg-[#2b0e12] border-[#EF4444] text-rose-200'
                                  : 'bg-[#121626] border-[#1e2538] text-slate-500 opacity-60'
                                : 'bg-[#121626] border-[#1e2538] text-slate-300 hover:text-white hover:bg-[#181e33]'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-md bg-[#080b14] flex items-center justify-center font-bold text-[10px]">
                              {opt.label}
                            </span>
                            <span>{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Reason / Explanation */}
                    {isRevealed && (
                      <div className="p-3 bg-[#0d1424] rounded-xl border border-[#1d2948] text-xs font-mono text-slate-300 space-y-1">
                        <span className="text-[#38BDF8] font-bold">Why:</span>
                        <p>{mcq.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4. 20 BRAIN GYM WORD PROBLEMS VIEW */}
      {activeTab === 'braingym' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Problem List (4 cols) */}
          <div className="lg:col-span-4 space-y-2 max-h-[600px] overflow-y-auto">
            {linearAlgebraBrainGym.map(bg => {
              const isSelected = bg.id === selectedBrainGymId;
              const isUnlocked = bg.id === 1 || completedBrainGym.includes(bg.id - 1);
              const isDone = completedBrainGym.includes(bg.id);

              return (
                <button
                  key={bg.id}
                  onClick={() => {
                    if (!isUnlocked) {
                      sound.playError();
                      setSequenceWarning(`🔒 Brain Gym #${bg.id} is locked! Complete Gym #${bg.id - 1} first to advance.`);
                      return;
                    }
                    sound.playPop();
                    setSelectedBrainGymId(bg.id);
                    setRevealBrainGymSolution(false);
                    setSequenceWarning(null);
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition cursor-pointer flex items-center justify-between ${
                    !isUnlocked
                      ? 'bg-[#060810] border-[#131826] text-slate-600 opacity-60'
                      : isSelected
                      ? 'bg-[#1c243e] border-[#38BDF8] text-white shadow-comic-sm font-bold'
                      : 'bg-[#0b0f1c] border-[#182035] text-slate-400 hover:text-white hover:bg-[#12182b]'
                  }`}
                >
                  <div className="truncate flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        !isUnlocked
                          ? 'bg-[#101420] text-slate-600'
                          : isDone
                          ? 'bg-emerald-500 text-black font-extrabold'
                          : isSelected
                          ? 'bg-[#38BDF8] text-black font-extrabold'
                          : 'bg-[#161c30] text-slate-400'
                      }`}
                    >
                      {!isUnlocked ? <Lock className="w-3 h-3 text-slate-500" /> : isDone ? '✓' : bg.id}
                    </span>
                    <div className="truncate">
                      <span className="text-[10px] text-[#38BDF8] block">Ch. {bg.id}</span>
                      <span className="truncate">{bg.title}</span>
                    </div>
                  </div>
                  {!isUnlocked ? (
                    <span className="text-[10px] text-slate-600 font-bold flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> Locked
                    </span>
                  ) : (
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#38BDF8]' : 'text-slate-600'}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Problem Stage (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-[#0e1220] p-6 rounded-2xl border-2 border-black shadow-comic space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#38BDF8] text-black font-bangers text-xs border border-black shadow-comic-sm">
                  BRAIN GYM CH. {currentBrainGym.id}
                </span>
                <span className="text-xs font-mono text-slate-400">Real-World Scenario</span>
              </div>

              <h3 className="font-bangers text-2xl text-white">{currentBrainGym.title}</h3>

              <div className="p-4 bg-[#080d19] rounded-xl border border-[#1b233a] text-xs text-slate-200 leading-relaxed font-sans">
                {currentBrainGym.scenario}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    sound.playPop();
                    setRevealBrainGymSolution(!revealBrainGymSolution);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#FBBF24] hover:bg-[#f59e0b] text-black font-bangers text-xs border border-black shadow-comic-sm transition cursor-pointer"
                >
                  {revealBrainGymSolution ? 'Hide Step-by-Step Solution' : 'Reveal Complete Solution'}
                </button>

                <button
                  onClick={() => markBrainGymCompleted(currentBrainGym.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bangers border border-black shadow-comic-sm transition cursor-pointer flex items-center gap-1.5 ${
                    completedBrainGym.includes(currentBrainGym.id)
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#10B981] hover:bg-[#059669] text-black'
                  }`}
                >
                  {completedBrainGym.includes(currentBrainGym.id) ? (
                    <>✓ Completed & Unlocked Next Gym</>
                  ) : (
                    <>Mark Complete & Unlock Next Gym ➔</>
                  )}
                </button>
              </div>

              {revealBrainGymSolution && (
                <div className="space-y-3 pt-3 border-t border-[#1c243a]">
                  <span className="text-xs font-bangers text-[#10B981] block">
                    STEP-BY-STEP MATHEMATICAL SOLUTION
                  </span>
                  <div className="space-y-2">
                    {currentBrainGym.solutionSteps.map((st, i) => (
                      <div key={i} className="p-3 bg-[#080c18] rounded-xl border border-[#1a2338] text-xs font-mono text-slate-300">
                        {st}
                      </div>
                    ))}
                  </div>
                  <div className="p-3.5 bg-[#0a2318] rounded-xl border border-[#10B981] text-xs font-bold font-mono text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Answer: {currentBrainGym.finalAnswer}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. 80 CLASSICAL BRAIN-STORMING PROBLEMS */}
      {activeTab === 'problems80' && (
        <div className="space-y-6">
          <div className="bg-[#0e1220] p-6 rounded-2xl border-2 border-black shadow-comic space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bangers text-2xl text-white">80 CLASSICAL BRAIN-STORMING PROBLEMS</h3>
                <p className="text-xs text-slate-400">
                  Strict sequential progression: Solve Problem 1 to unlock Problem 2, and master the full 80-problem curriculum!
                </p>
              </div>

              {/* Section Filter & Progress Badge */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-500/30 font-bold">
                  Solved: {completed80Problems.length} / 80
                </span>
                <select
                  value={problemSectionFilter}
                  onChange={e => setProblemSectionFilter(e.target.value)}
                  className="bg-[#141a2e] border border-[#232d4b] rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none max-w-xs"
                >
                  {sectionsList.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Problem Cards List */}
            <div className="space-y-3 pt-2">
              {filtered80Problems.map(prob => {
                const isRevealed = !!revealedProblemIds[prob.id];
                const isProbUnlocked = prob.id === 1 || completed80Problems.includes(prob.id - 1);
                const isProbCompleted = completed80Problems.includes(prob.id);

                return (
                  <div
                    key={prob.id}
                    className={`p-4 rounded-xl border space-y-3 transition ${
                      !isProbUnlocked
                        ? 'bg-[#060810] border-[#151c2e] opacity-65'
                        : isProbCompleted
                        ? 'bg-[#07131e] border-emerald-500/50'
                        : 'bg-[#080d19] border-[#1b233a]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          disabled={!isProbUnlocked}
                          onClick={() => isProbUnlocked && toggle80ProblemSolved(prob.id)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono border transition ${
                            !isProbUnlocked
                              ? 'bg-[#101422] border-slate-800 text-slate-600 cursor-not-allowed'
                              : isProbCompleted
                              ? 'bg-emerald-500 border-emerald-400 text-black shadow-comic-sm cursor-pointer'
                              : 'bg-[#141a2c] border-[#242e4c] text-[#FBBF24] hover:border-amber-400 cursor-pointer'
                          }`}
                          title={!isProbUnlocked ? 'Locked' : isProbCompleted ? 'Solved! Click to unmark' : 'Click to mark solved'}
                        >
                          {!isProbUnlocked ? <Lock className="w-3.5 h-3.5" /> : isProbCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : `#${prob.id}`}
                        </button>
                        <span className="text-[10px] font-mono text-slate-400 truncate max-w-xs">
                          {prob.section}
                        </span>
                        {isProbCompleted && (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            SOLVED
                          </span>
                        )}
                        {!isProbUnlocked && (
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800 flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> Solve #{prob.id - 1} to unlock
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-amber-400">
                        {'★'.repeat(prob.difficulty)}
                        <span className="text-slate-600">{'★'.repeat(3 - prob.difficulty)}</span>
                      </span>
                    </div>

                    <p className={`text-sm font-semibold font-sans ${!isProbUnlocked ? 'text-slate-400' : 'text-white'}`}>
                      {prob.problem}
                    </p>

                    <div>
                      {isProbUnlocked ? (
                        <button
                          onClick={() => {
                            toggleRevealProblem(prob.id);
                            if (!isProbCompleted) {
                              toggle80ProblemSolved(prob.id);
                            }
                          }}
                          className="text-xs font-mono font-bold text-[#38BDF8] hover:underline cursor-pointer"
                        >
                          {isRevealed ? '▲ Hide Solution' : '▼ Reveal Solution & Unlock Next'}
                        </button>
                      ) : (
                        <p className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-slate-600" />
                          Locked in sequence: Solve Problem #{prob.id - 1} first to unlock.
                        </p>
                      )}
                    </div>

                    {isProbUnlocked && isRevealed && (
                      <div className="p-3 bg-[#0c1424] rounded-xl border border-[#1d2b4a] text-xs font-mono text-emerald-200">
                        <span className="text-[#10B981] font-bold block mb-1">Solution:</span>
                        <p>{prob.solution}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 6. MYTH-BUSTER CLINIC */}
      {activeTab === 'myths' && (
        <div className="bg-[#0e1220] p-6 rounded-2xl border-2 border-black shadow-comic space-y-6">
          <div>
            <h3 className="font-bangers text-2xl text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#F43F5E]" />
              THE LINEAR ALGEBRA MYTH-BUSTER CLINIC
            </h3>
            <p className="text-xs text-slate-400">
              The 10 most common misconceptions that trip students on exams — and the crisp mathematical truth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {linearAlgebraMythBusters.map((mb, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#090d18] border border-[#1b233a] space-y-2 hover:border-[#FBBF24]/40 transition"
              >
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold font-mono">
                  <XCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Myth: {mb.myth}</span>
                </div>
                <div className="flex items-start gap-2 text-emerald-300 text-xs font-mono pt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Truth: {mb.truth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. GLOSSARY & FORMULAS */}
      {activeTab === 'glossary' && (
        <div className="bg-[#0e1220] p-6 rounded-2xl border-2 border-black shadow-comic space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bangers text-2xl text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#06B6D4]" />
                LINEAR ALGEBRA GLOSSARY & FORMULAS
              </h3>
              <p className="text-xs text-slate-400">
                25 concise definitions for big mathematical concepts.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={glossarySearch}
                onChange={e => setGlossarySearch(e.target.value)}
                placeholder="Search terms..."
                className="w-full bg-[#121626] border border-[#232c45] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#090d18] border border-[#1b233a] space-y-1 hover:border-[#06B6D4]/40 transition"
              >
                <span className="font-bangers text-sm text-[#06B6D4] block">{item.term}</span>
                <p className="text-xs text-slate-300 font-sans leading-snug">{item.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. MASTERY TRACKER & BEYOND (PAGE 90) */}
      {activeTab === 'mastery' && (
        <div className="space-y-6">
          {/* Comic Finale Banner */}
          <div className="bg-gradient-to-r from-[#141b36] via-[#1a2347] to-[#0d1226] border-2 border-[#2b3966] p-6 sm:p-8 rounded-3xl shadow-comic space-y-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#FBBF24] text-black font-bangers text-xs rounded-lg border border-black shadow-comic-sm">
                    PAGE 90 FINALE
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#06B6D4]/20 text-cyan-300 font-bold text-xs rounded border border-[#06B6D4]/40">
                    Mastery Tracker &amp; What Comes Next
                  </span>
                </div>
                <h2 className="font-bangers text-3xl sm:text-5xl text-white tracking-wide drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  YOU DID IT! TWENTY CHAPTERS CONQUERED!
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  You journeyed from systems of equations to the Four Fundamental Subspaces. Track your mastery across all four learning checkpoints for each chapter and colour a golden star for every concept you can teach to a friend!
                </p>
              </div>

              {/* Character Trio Speech Bubbles */}
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#080c1a] p-4 rounded-2xl border-2 border-[#1c243c] shadow-comic-sm">
                <div className="flex items-center -space-x-2">
                  <ProfPivotAvatar size="sm" mood="wise" />
                  <VeeAvatar size="sm" mood="happy" />
                  <GaussBotAvatar size="sm" mood="active" />
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-bold text-[#FBBF24]">Prof. Pivot: &ldquo;Twenty chapters conquered, Vee!&rdquo;</div>
                  <div className="text-slate-300">Vee: &ldquo;Rows, columns, subspaces… I actually understand them!&rdquo;</div>
                  <div className="text-cyan-400 font-mono text-[11px]">Gauss-bot: &ldquo;BEEP! Next quests: eigenvalues &amp; SVD!&rdquo;</div>
                </div>
              </div>
            </div>

            {/* Overall Mastery Stats Bar */}
            <div className="bg-[#090d1c] p-4 rounded-2xl border border-[#1e2646] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <div className="flex justify-between items-center text-slate-300 mb-1">
                  <span className="font-bold">Total Mastery Score</span>
                  <span className="text-[#FBBF24] font-bangers text-sm">
                    {trackerRead.length + trackerMCQs.length + trackerGym.length + trackerTeach.length} / 80 Pts
                  </span>
                </div>
                <div className="w-full bg-[#141b33] h-2.5 rounded-full overflow-hidden border border-black/40">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-[#FBBF24] h-full transition-all duration-500"
                    style={{
                      width: `${Math.round(
                        ((trackerRead.length + trackerMCQs.length + trackerGym.length + trackerTeach.length) / 80) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-slate-300 mb-1">
                  <span className="font-bold">Golden Stars (&ldquo;Can Teach It&rdquo;)</span>
                  <span className="text-amber-400 font-bangers text-sm">{trackerTeach.length} / 20 Stars</span>
                </div>
                <div className="w-full bg-[#141b33] h-2.5 rounded-full overflow-hidden border border-black/40">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full transition-all duration-500"
                    style={{ width: `${(trackerTeach.length / 20) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => {
                    sound.playSuccess();
                    setTrackerRead(linearAlgebraChapters.map(c => c.id));
                  }}
                  className="px-3 py-1.5 bg-[#17203b] hover:bg-[#202c52] text-slate-200 text-xs font-bold rounded-lg border border-[#2c3d6e] transition cursor-pointer"
                >
                  Mark All Read
                </button>
                <button
                  onClick={() => {
                    sound.playPop();
                    setTrackerRead([]);
                    setTrackerMCQs([]);
                    setTrackerGym([]);
                    setTrackerTeach([]);
                  }}
                  className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-bold rounded-lg border border-rose-500/30 transition cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Page 90 20-Chapter Matrix Table */}
          <div className="bg-[#0b0e1b] rounded-2xl border-2 border-black shadow-comic overflow-hidden">
            <div className="p-4 bg-[#101528] border-b border-[#1b233d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bangers text-xl text-white tracking-wide">
                  MASTERY TRACKER — 20 CHAPTERS CHECKLIST
                </h3>
                <p className="text-xs text-slate-400">
                  Tick each milestone as you conquer it. Click the star when you can confidently explain the concept without notes!
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400">
                {trackerTeach.length === 20 ? '🏆 GRANDMASTER TEACHER' : `${20 - trackerTeach.length} stars remaining`}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#141b33] text-slate-300 font-bangers text-sm uppercase">
                  <tr>
                    <th className="px-4 py-3 text-center w-14">Ch</th>
                    <th className="px-4 py-3">Topic</th>
                    <th className="px-4 py-3 text-center w-24">Read</th>
                    <th className="px-4 py-3 text-center w-24">MCQs</th>
                    <th className="px-4 py-3 text-center w-28">Brain Gym</th>
                    <th className="px-4 py-3 text-center w-32">Can Teach It</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#151c36] bg-[#0c1020]">
                  {linearAlgebraChapters.map(chap => {
                    const isRead = trackerRead.includes(chap.id);
                    const isMCQ = trackerMCQs.includes(chap.id);
                    const isGym = trackerGym.includes(chap.id);
                    const isTeach = trackerTeach.includes(chap.id);

                    return (
                      <tr
                        key={chap.id}
                        className={`hover:bg-[#12182e] transition ${
                          isTeach ? 'bg-[#131b33]/40' : ''
                        }`}
                      >
                        <td className="px-4 py-3 text-center">
                          <span className="w-6 h-6 rounded-md bg-[#182038] text-white font-bangers inline-flex items-center justify-center border border-[#2b375b]">
                            {chap.id}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-white">{chap.title}</div>
                          <div className="text-[11px] text-slate-400">{chap.subtitle}</div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => toggleTrackerRead(chap.id)}
                            className={`w-7 h-7 rounded-lg border flex items-center justify-center mx-auto transition cursor-pointer ${
                              isRead
                                ? 'bg-cyan-500 text-black border-black shadow-comic-sm'
                                : 'bg-[#121626] border-[#222c45] text-transparent hover:border-slate-500'
                            }`}
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                          </button>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => toggleTrackerMCQ(chap.id)}
                            className={`w-7 h-7 rounded-lg border flex items-center justify-center mx-auto transition cursor-pointer ${
                              isMCQ
                                ? 'bg-emerald-500 text-black border-black shadow-comic-sm'
                                : 'bg-[#121626] border-[#222c45] text-transparent hover:border-slate-500'
                            }`}
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                          </button>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => toggleTrackerGym(chap.id)}
                            className={`w-7 h-7 rounded-lg border flex items-center justify-center mx-auto transition cursor-pointer ${
                              isGym
                                ? 'bg-purple-500 text-white border-black shadow-comic-sm'
                                : 'bg-[#121626] border-[#222c45] text-transparent hover:border-slate-500'
                            }`}
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                          </button>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => toggleTrackerTeach(chap.id)}
                            className={`px-3 py-1 rounded-xl border flex items-center gap-1.5 mx-auto transition cursor-pointer ${
                              isTeach
                                ? 'bg-[#FBBF24] text-black font-bangers border-black shadow-comic-sm scale-105'
                                : 'bg-[#121626] border-[#222c45] text-slate-500 hover:text-amber-400 hover:border-amber-400/50'
                            }`}
                            title="Click if you can explain this chapter without peeking!"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                isTeach ? 'fill-black text-black' : 'text-slate-500'
                              }`}
                            />
                            <span className="text-[11px] font-bold">
                              {isTeach ? 'TEACH' : '☆'}
                            </span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Where Next? The Advanced Quests (from Page 90) */}
          <div className="bg-[#0e1324] p-6 sm:p-7 rounded-2xl border-2 border-[#1e2746] shadow-comic space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bangers text-[#38BDF8] uppercase tracking-wider block">
                  BEYOND CHAPTER 20 • PAGE 90
                </span>
                <h3 className="font-bangers text-2xl sm:text-3xl text-white tracking-wide">
                  WHERE NEXT? THE CONTINUATION ROADMAP
                </h3>
                <p className="text-xs text-slate-300">
                  Every advanced concept in machine learning, graphics, and computer science is built on the 20 foundations in this book:
                </p>
              </div>

              <button
                onClick={() => {
                  sound.playPop();
                  setActiveSaga('roadmap');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-black font-bangers text-xs rounded-xl border-2 border-black shadow-comic-sm transition cursor-pointer shrink-0"
              >
                <span>OPEN 40-WEEK MASTER ROADMAP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 7 Continuation Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {[
                {
                  step: '01',
                  title: 'Determinants',
                  formula: 'det(A) = ∏ λᵢ',
                  desc: 'Volume scaling factor, test for invertibility, and Cramer’s rule.',
                },
                {
                  step: '02',
                  title: 'Eigenvalues & Eigenvectors',
                  formula: 'Ax = λx',
                  desc: 'Special directions that only scale, solving differential equations & steady states.',
                },
                {
                  step: '03',
                  title: 'Orthogonality & Projections',
                  formula: 'P = A(AᵀA)⁻¹Aᵀ',
                  desc: 'Perpendicular subspaces, projection matrices, and nearest-point approximations.',
                },
                {
                  step: '04',
                  title: 'Least Squares',
                  formula: 'AᵀA x̂ = Aᵀb',
                  desc: 'Fitting lines and polynomials to noisy real-world data points.',
                },
                {
                  step: '05',
                  title: 'Gram-Schmidt & QR',
                  formula: 'A = QR',
                  desc: 'Orthonormal basis conversion and stable numerical algorithms.',
                },
                {
                  step: '06',
                  title: 'Diagonalization & Powers',
                  formula: 'A = XΛX⁻¹',
                  desc: 'Fast calculation of A¹⁰⁰ and discrete dynamical systems.',
                },
                {
                  step: '07',
                  title: 'Singular Value Decomposition (SVD)',
                  formula: 'A = UΣVᵀ',
                  desc: 'The pinnacle of linear algebra: PCA, data compression, and modern AI embeddings.',
                },
                {
                  step: '08',
                  title: 'AI & Neural Tensors',
                  formula: 'Y = σ(WX + b)',
                  desc: 'Weight matrices, backpropagation, and Transformer attention mechanisms.',
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-[#070a14] p-4 rounded-xl border border-[#1a223a] space-y-2 hover:border-[#38BDF8]/40 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bangers text-xs text-amber-400">QUEST #{card.step}</span>
                    <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-500/30">
                      {card.formula}
                    </span>
                  </div>
                  <h4 className="font-bangers text-base text-white tracking-wide">{card.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
