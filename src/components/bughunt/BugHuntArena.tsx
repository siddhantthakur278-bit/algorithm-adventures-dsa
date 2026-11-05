import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { bugHuntChallenges } from '../../data/bugHuntData';
import { BugsyAvatar, ByteAvatar, ComicBubble } from '../characters/Characters';
import { Bug, CheckCircle, AlertTriangle, Sparkles, ShieldAlert, Trophy, Lock } from 'lucide-react';
import { sound } from '../../utils/soundEffects';

export const BugHuntArena: React.FC = () => {
  const { stats, defeatBugHunt } = useCourse();
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(bugHuntChallenges[0].id);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const currentChallenge =
    bugHuntChallenges.find(c => c.id === selectedChallengeId) || bugHuntChallenges[0];

  const isAlreadyDefeated = stats.bugHuntDefeated.includes(currentChallenge.id);

  const handleSelectOption = (idx: number) => {
    setSelectedOptionIndex(idx);
    const option = currentChallenge.options[idx];
    if (option.isCorrect) {
      sound.playSuccess();
      defeatBugHunt(currentChallenge.id);
      setFeedback({
        isCorrect: true,
        text: `Bullseye! Bugsy has been banished! ${option.explanation}`,
      });
    } else {
      sound.playError();
      setFeedback({
        isCorrect: false,
        text: `Ouch! Bugsy's trap remains intact. ${option.explanation}`,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Hero Header */}
      <div className="bg-[#0c101d] border-2 border-[#1c243a] rounded-3xl p-6 sm:p-8 shadow-comic-lg bg-halftone">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981] text-black font-bangers text-xs border border-black shadow-comic-sm">
              <Bug className="w-3.5 h-3.5" />
              SPOT-THE-BUG ARENA
            </div>
            <h1 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
              BUGSY’S BUG HUNT ARENA
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Bugsy has sabotaged classic DSA algorithms with sneaky off-by-one errors, infinite loops,
              and memory explosions! Inspect the buggy code, pick the precise fix, and vanquish Bugsy!
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#080d19] px-6 py-4 rounded-2xl border border-[#1b233a] shadow-comic-sm">
            <BugsyAvatar size="lg" mood={isAlreadyDefeated ? 'defeated' : 'sneaky'} />
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Bugs Exterminated
              </div>
              <div className="font-bangers text-3xl text-[#34D399]">
                {stats.bugHuntDefeated.length} / {bugHuntChallenges.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Challenge Selector & Code Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Challenge Index (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="font-bangers text-xl text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#F43F5E]" />
            ACTIVE SABOTAGE REPORTS
          </h2>

          <div className="space-y-2.5">
            {bugHuntChallenges.map((ch, idx) => {
              const defeated = stats.bugHuntDefeated.includes(ch.id);
              const isPrevDefeated = idx === 0 || stats.bugHuntDefeated.includes(bugHuntChallenges[idx - 1].id);
              const isLocked = !defeated && !isPrevDefeated;
              const isSelected = ch.id === currentChallenge.id;

              return (
                <div
                  key={ch.id}
                  onClick={() => {
                    if (isLocked) {
                      sound.playError();
                      alert(`🔒 Sequence Locked: Defeat Sabotage #${idx} (${bugHuntChallenges[idx - 1].title}) first to unlock this challenge!`);
                      return;
                    }
                    setSelectedChallengeId(ch.id);
                    setSelectedOptionIndex(null);
                    setFeedback(null);
                    sound.playPop();
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isLocked
                      ? 'bg-[#090c17]/50 border-[#1a2033] opacity-60 cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#131b2e] border-[#10B981] shadow-comic-sm -translate-y-0.5 cursor-pointer'
                      : 'bg-[#0c101d] border-[#1c243a] hover:border-[#2b3756] shadow-comic-sm cursor-pointer'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bangers text-xs text-slate-400">Sabotage #{idx + 1}</span>
                    {defeated ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[#34D399]">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Defeated
                      </span>
                    ) : isLocked ? (
                      <span className="flex items-center gap-1 text-[11px] text-slate-500 font-bold">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#F43F5E] font-bold">Next in Sequence</span>
                    )}
                  </div>
                  <h4 className="font-bold text-white text-sm leading-snug">{ch.title}</h4>
                  <span className="text-[11px] text-slate-400 block mt-1">{ch.bugType}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Code Inspector & Fix Choice (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#0c101d] rounded-2xl border border-[#1c243a] p-6 shadow-comic-sm space-y-5">
            {/* Challenge Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs text-[#34D399] font-semibold">{currentChallenge.chapterTitle}</span>
                <h3 className="font-bangers text-2xl text-white tracking-wide mt-0.5">
                  {currentChallenge.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">{currentChallenge.description}</p>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400 block font-bold">Reward</span>
                <span className="text-xs font-bold text-[#FBBF24] bg-[#241805] px-2.5 py-1 rounded border border-[#FBBF24]/40">
                  +{currentChallenge.xpReward} XP
                </span>
              </div>
            </div>

            {/* Bugsy Speech Bubble */}
            <ComicBubble
              speaker="bugsy"
              text={currentChallenge.bugsyComment}
              subtext="Sneaky Bugsy Taunt"
            />

            {/* Buggy Code Inspector */}
            <div className="bg-[#080d18] rounded-xl border border-[#1c243a] overflow-hidden font-code text-xs">
              <div className="bg-[#0e1322] px-4 py-2 border-b border-[#1b233a] flex items-center justify-between">
                <span className="text-slate-400 font-mono">buggy_algorithm.py</span>
                <span className="text-[#F43F5E] font-bold text-[11px]">FAULTY EXECUTION</span>
              </div>
              <div className="p-4 overflow-x-auto text-slate-200">
                <pre>
                  {currentChallenge.buggyCode.split('\n').map((line, idx) => {
                    const isBugLine = idx + 1 === currentChallenge.lineBugIndex;
                    return (
                      <div
                        key={idx}
                        className={`flex gap-3 px-2 py-0.5 rounded ${
                          isBugLine ? 'bg-[#240b10] text-rose-200 border-l-4 border-[#F43F5E] font-bold' : ''
                        }`}
                      >
                        <span className="w-6 text-slate-500 text-right select-none">{idx + 1}</span>
                        <span>{line}</span>
                      </div>
                    );
                  })}
                </pre>
              </div>
            </div>

            {/* Fix Selection */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bangers text-lg text-white">CHOOSE THE REMEDY TO BANISH BUGSY:</h4>
              <div className="space-y-2">
                {currentChallenge.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border-2 transition font-medium text-xs leading-relaxed ${
                      selectedOptionIndex === idx
                        ? opt.isCorrect
                          ? 'bg-[#071c14] border-[#10B981] text-emerald-100 shadow-comic-sm'
                          : 'bg-[#240b10] border-[#F43F5E] text-rose-100 shadow-comic-sm'
                        : 'bg-[#0f1424] border-[#1c243a] text-slate-200 hover:border-[#2b3756] hover:bg-[#151c30]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bangers text-sm text-slate-400">Option {idx + 1}:</span>
                      <span>{opt.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Alert */}
            {feedback && (
              <div
                className={`p-4 rounded-xl border-2 font-medium text-xs leading-relaxed ${
                  feedback.isCorrect
                    ? 'bg-[#071c14] border-[#10B981] text-[#34D399] animate-comic-pop'
                    : 'bg-[#240b10] border-[#F43F5E] text-[#F43F5E] animate-comic-shake'
                }`}
              >
                {feedback.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
