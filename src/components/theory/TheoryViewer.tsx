import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { chaptersData } from '../../data/chaptersData';
import { ComicBubble } from '../characters/Characters';
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  RotateCw,
  Award,
  Layers,
  ChevronDown,
  ChevronUp,
  Lock,
  Code2,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';
import { UniversalVSCodeEditor } from '../common/UniversalVSCodeEditor';

export const TheoryViewer: React.FC = () => {
  const { stats, toggleSubtopicComplete, recordQuizScore, collectPowerCard } = useCourse();
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [flippedMythIds, setFlippedMythIds] = useState<Record<string, boolean>>({});
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [activeIdeSubtopicId, setActiveIdeSubtopicId] = useState<string | null>(null);
  const [chapterLockWarning, setChapterLockWarning] = useState<string | null>(null);

  const currentChapter =
    chaptersData.find(c => c.id === selectedChapterId) || chaptersData[0];

  const isChapterUnlocked = (chId: number): boolean => {
    if (chId === 1) return true;
    const prevCh = chaptersData.find(c => c.id === chId - 1);
    if (!prevCh) return true;
    const masteredInPrev = prevCh.subtopics.filter(s => stats.completedSubtopics.includes(s.id)).length;
    return masteredInPrev >= 1;
  };

  const getChapterProgress = (chId: number) => {
    const ch = chaptersData.find(c => c.id === chId);
    if (!ch) return 0;
    const done = ch.subtopics.filter(s => stats.completedSubtopics.includes(s.id)).length;
    return Math.round((done / ch.subtopics.length) * 100);
  };

  const toggleMythFlip = (id: string) => {
    sound.playPop();
    setFlippedMythIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    setSelectedQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleQuizSubmit = (questionId: string, correctIndex: number) => {
    const chosen = selectedQuizAnswers[questionId];
    if (chosen === undefined) return;
    setQuizSubmitted(prev => ({ ...prev, [questionId]: true }));
    if (chosen === correctIndex) {
      recordQuizScore(questionId, 1);
    } else {
      sound.playError();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Chapter Lock Warning Alert */}
      {chapterLockWarning && (
        <div className="bg-rose-950/80 border-2 border-rose-500 p-4 rounded-2xl flex items-center justify-between gap-4 animate-shake">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <p className="text-xs sm:text-sm font-bold text-rose-200">{chapterLockWarning}</p>
          </div>
          <button
            onClick={() => setChapterLockWarning(null)}
            className="text-xs text-rose-400 hover:text-white font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Chapter Selection Pills with Sequential Locking */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {chaptersData.map(ch => {
          const isSelected = ch.id === currentChapter.id;
          const unlocked = isChapterUnlocked(ch.id);
          const progress = getChapterProgress(ch.id);

          return (
            <button
              key={ch.id}
              onClick={() => {
                if (!unlocked) {
                  sound.playError();
                  setChapterLockWarning(
                    `🔒 Sequence Locked: Complete subtopics in Chapter ${ch.id - 1} first to unlock Chapter ${ch.id} (${ch.title.split(':')[0]})!`
                  );
                  return;
                }
                setChapterLockWarning(null);
                setSelectedChapterId(ch.id);
                sound.playPop();
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bangers text-xs tracking-wider whitespace-nowrap border-2 transition ${
                isSelected
                  ? 'bg-[#FFDE59] text-black border-black shadow-comic-sm -translate-y-0.5'
                  : !unlocked
                  ? 'bg-[#0f1220]/80 text-gray-500 border-gray-800 opacity-60 cursor-not-allowed'
                  : 'bg-[#15192c] text-gray-300 border-gray-700 hover:border-gray-500 hover:text-white'
              }`}
            >
              {!unlocked ? (
                <Lock className="w-3.5 h-3.5 text-gray-500 shrink-0" />
              ) : (
                <span>{ch.badge}</span>
              )}
              <span className="font-sans font-medium text-xs">{ch.title.split(':')[0]}</span>
              {unlocked && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${progress === 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                  {progress}%
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Chapter Header Banner */}
      <div className="bg-[#121626] rounded-3xl border-3 border-black p-6 sm:p-8 shadow-comic-lg bg-halftone">
        <div className="flex items-center gap-2 text-xs font-bold text-[#FFDE59] uppercase tracking-wider mb-1">
          <span>{currentChapter.badge}</span>
          <span>•</span>
          <span>CURRICULUM CHAPTER</span>
        </div>
        <h1 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
          {currentChapter.title}
        </h1>
        <p className="text-sm font-medium text-[#38B6FF] mt-1">{currentChapter.subtitle}</p>
        <p className="text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
          {currentChapter.description}
        </p>
      </div>

      {/* Section 1: Detailed Subtopics */}
      <div className="space-y-4">
        <h2 className="font-bangers text-2xl text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[#FFDE59]" />
          DETAILED SUBTOPIC MASTERY
        </h2>

        <div className="space-y-4">
          {currentChapter.subtopics.map((sub, sIdx) => {
            const isCompleted = stats.completedSubtopics.includes(sub.id);
            const prevSub = sIdx > 0 ? currentChapter.subtopics[sIdx - 1] : null;
            const isPrevCompleted = sIdx === 0 || (prevSub && stats.completedSubtopics.includes(prevSub.id));
            const isLocked = !isCompleted && !isPrevCompleted;

            return (
              <div
                key={sub.id}
                className={`rounded-2xl border-2 p-6 shadow-comic-sm space-y-4 transition-all ${
                  isLocked ? 'bg-[#0a0d18]/70 border-[#1a2135] opacity-75' : 'bg-[#121626] border-black'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                      {sIdx + 1}
                    </span>
                    <div>
                      <span className="text-[11px] font-mono text-[#FFDE59]">
                        {sub.timeEstimate} read • Step {sIdx + 1} of {currentChapter.subtopics.length}
                      </span>
                      <h3 className="font-bangers text-xl text-white">{sub.title}</h3>
                    </div>
                  </div>

                  {isLocked ? (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs bg-slate-800 text-slate-400 border border-slate-700">
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                      Locked (Complete Step {sIdx} first)
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          sound.playPop();
                          setActiveIdeSubtopicId(prev => (prev === sub.id ? null : sub.id));
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs border-2 transition cursor-pointer shadow-comic-sm ${
                          activeIdeSubtopicId === sub.id
                            ? 'bg-amber-400 text-slate-950 border-amber-300'
                            : 'bg-indigo-600/80 hover:bg-indigo-600 text-white border-indigo-500'
                        }`}
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>{activeIdeSubtopicId === sub.id ? 'Close IDE' : '💻 Code in VS Code'}</span>
                      </button>
                      <button
                        onClick={() => toggleSubtopicComplete(sub.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs border-2 transition cursor-pointer ${
                          isCompleted
                            ? 'bg-[#7ED957] text-black border-black shadow-comic-sm'
                            : 'bg-[#1b2035] text-gray-300 border-gray-700 hover:text-white'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {isCompleted ? 'Mastered (+20 XP)' : 'Mark as Mastered'}
                      </button>
                    </div>
                  )}
                </div>

                {isLocked ? (
                  <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      Sequential Progression: Complete <strong>{prevSub?.title}</strong> above to unlock this concept!
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line font-sans">
                      {sub.content}
                    </div>

                    {/* Interactive VS Code Sandbox for this Subtopic */}
                    {activeIdeSubtopicId === sub.id && (
                      <div className="pt-2 animate-fadeIn">
                        <UniversalVSCodeEditor
                          language="python"
                          starterCode={`# Concept Lab: ${currentChapter.title}\n# Subtopic: ${sub.title}\n\ndef experiment():\n    print("Testing ${sub.title}...")\n    # Try out code for this concept here\n    return "Success"\n\nprint(experiment())\n`}
                          solutionCode={`# Reference solution for ${sub.title}\ndef solve():\n    return "Mastered ${sub.title}"\n\nprint(solve())\n`}
                          problemTitle={`[Ch ${currentChapter.id}] ${sub.title}`}
                          problemId={`subtopic-${sub.id}`}
                          fileName="concept_demo.py"
                          onSolve={() => {
                            if (!isCompleted) {
                              toggleSubtopicComplete(sub.id);
                            }
                          }}
                          nextProblemTitle={
                            sIdx < currentChapter.subtopics.length - 1
                              ? currentChapter.subtopics[sIdx + 1].title
                              : undefined
                          }
                          onGoNext={
                            sIdx < currentChapter.subtopics.length - 1
                              ? () => setActiveIdeSubtopicId(currentChapter.subtopics[sIdx + 1].id)
                              : undefined
                          }
                        />
                      </div>
                    )}

                    {/* Key Takeaway & Watch Out */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <div className="p-3 bg-[#0e1f13] rounded-xl border border-[#7ED957]/30 text-xs text-green-200">
                        <strong className="text-[#7ED957] block font-bold mb-1">Key Takeaway:</strong>
                        {sub.keyTakeaway}
                      </div>
                      {sub.watchOut && (
                        <div className="p-3 bg-[#261317] rounded-xl border border-[#FF5757]/30 text-xs text-red-200">
                          <strong className="text-[#FF5757] block font-bold mb-1">Watch Out:</strong>
                          {sub.watchOut}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: 3D Flip Myth-Buster Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bangers text-2xl text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#FF914D]" />
            3D FLIP MYTH-BUSTERS
          </h2>
          <span className="text-xs text-gray-400">Click any card to flip and reveal reality!</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(currentChapter.mythBusters || []).map(mb => {
            const isFlipped = !!flippedMythIds[mb.id];
            return (
              <div
                key={mb.id}
                onClick={() => toggleMythFlip(mb.id)}
                className="cursor-pointer perspective-1000 min-h-[220px]"
              >
                <div
                  className={`w-full h-full relative transform-style-3d transition-transform duration-500 rounded-2xl border-3 border-black shadow-comic-sm ${
                    isFlipped ? 'rotate-y-180 bg-[#142318]' : 'bg-[#221319]'
                  } p-6 flex flex-col justify-between`}
                >
                  {!isFlipped ? (
                    /* FRONT: The Myth */
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FF5757] text-white font-bangers text-xs border border-black">
                          MYTH TRAP
                        </span>
                        <RotateCw className="w-4 h-4 text-gray-400" />
                      </div>
                      <h4 className="font-bangers text-xl text-white tracking-wide leading-snug">
                        "{mb.myth}"
                      </h4>
                      <p className="text-xs text-gray-400 italic">Click card to bust this myth!</p>
                    </div>
                  ) : (
                    /* BACK: Busted Reality */
                    <div className="space-y-3 rotate-y-180">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#7ED957] text-black font-bangers text-xs border border-black">
                          BUSTED REALITY!
                        </span>
                        <RotateCw className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-200 leading-relaxed font-medium">
                        {mb.reality}
                      </p>
                      <div className="pt-2 border-t border-gray-700/50">
                        <ComicBubble speaker={mb.character} text={mb.comicDialogue} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Topic Quiz */}
      {(currentChapter.quiz || []).length > 0 && (
        <div className="space-y-4">
          <h2 className="font-bangers text-2xl text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#38B6FF]" />
            CHAPTER CHECKPOINT QUIZ
          </h2>

          <div className="space-y-4">
            {(currentChapter.quiz || []).map(q => {
              const selectedIdx = selectedQuizAnswers[q.id];
              const isSubmitted = !!quizSubmitted[q.id];
              const isCorrect = isSubmitted && selectedIdx === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="bg-[#121626] rounded-2xl border-2 border-black p-6 shadow-comic-sm space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-bold text-white text-sm">{q.question}</h4>
                    <span className="text-xs font-bold text-[#FFDE59] bg-[#FFDE59]/10 px-2 py-0.5 rounded border border-[#FFDE59]/30 whitespace-nowrap">
                      +{q.xpReward} XP
                    </span>
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt, idx) => {
                      const isOptionSelected = selectedIdx === idx;
                      return (
                        <button
                          key={idx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectOptionQuiz(q.id, idx)}
                          className={`w-full text-left p-3 rounded-xl border-2 font-medium text-xs transition ${
                            isOptionSelected
                              ? 'bg-[#38B6FF] text-black border-black font-bold shadow-comic-sm'
                              : 'bg-[#15192c] border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white'
                          }`}
                        >
                          <span className="font-mono mr-2 font-bold">{String.fromCharCode(65 + idx)}.</span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {!isSubmitted ? (
                    <button
                      onClick={() => handleQuizSubmit(q.id, q.correctIndex)}
                      disabled={selectedIdx === undefined}
                      className="px-4 py-2 rounded-xl font-bangers text-xs bg-[#FFDE59] text-black border-2 border-black shadow-comic-sm disabled:opacity-50"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <div
                      className={`p-3 rounded-xl border-2 text-xs font-medium leading-relaxed ${
                        isCorrect
                          ? 'bg-[#152e1a] border-[#7ED957] text-[#7ED957]'
                          : 'bg-[#381619] border-[#FF5757] text-[#FF5757]'
                      }`}
                    >
                      {isCorrect ? 'Correct! ' : 'Incorrect! '} {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Section 4: Power Cards */}
      {(currentChapter.powerCards || []).length > 0 && (
        <div className="space-y-4">
          <h2 className="font-bangers text-2xl text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#8C52FF]" />
            COLLECTIBLE POWER CARDS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(currentChapter.powerCards || []).map(pc => {
              const isCollected = stats.powerCardsCollected.includes(pc.id);
              return (
                <div
                  key={pc.id}
                  onClick={() => collectPowerCard(pc.id)}
                  className={`p-5 rounded-2xl border-3 border-black shadow-comic-sm space-y-2 cursor-pointer transition hover:-translate-y-1 ${
                    isCollected ? 'bg-[#1e1733] border-[#8C52FF]' : 'bg-[#141829]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8C52FF]/20 text-[#8C52FF] border border-[#8C52FF]/40">
                      {pc.rarity}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {isCollected ? 'COLLECTED (+30 XP)' : 'CLICK TO COLLECT'}
                    </span>
                  </div>
                  <h4 className="font-bangers text-xl text-white">{pc.title}</h4>
                  <p className="text-xs text-gray-300 font-medium">{pc.frontText}</p>
                  <div className="pt-2 text-[11px] text-gray-400 border-t border-gray-800">
                    {pc.backDetail}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  function handleSelectOptionQuiz(questionId: string, idx: number) {
    handleSelectQuizOption(questionId, idx);
    sound.playPop();
  }
};
