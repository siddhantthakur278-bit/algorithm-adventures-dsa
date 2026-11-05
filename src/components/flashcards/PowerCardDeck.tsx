import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { flashcardsData } from '../../data/flashcardsData';
import { Layers, RotateCw, Check, X, Sparkles, BookOpen } from 'lucide-react';
import { sound } from '../../utils/soundEffects';

export const PowerCardDeck: React.FC = () => {
  const { addXP } = useCourse();
  const [deck, setDeck] = useState(flashcardsData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [boxFilter, setBoxFilter] = useState<number | 'all'>('all');

  const filteredDeck = boxFilter === 'all' ? deck : deck.filter(c => c.box === boxFilter);
  const currentCard = filteredDeck[currentIndex] || filteredDeck[0];

  const handleFlip = () => {
    sound.playPop();
    setIsFlipped(!isFlipped);
  };

  const handleReview = (success: boolean) => {
    if (!currentCard) return;

    if (success) {
      sound.playSuccess();
      addXP(15, 'Flashcard mastered');
    } else {
      sound.playError();
    }

    // Update Leitner box: success -> box+1 (max 4), fail -> box 1
    setDeck(prev =>
      prev.map(c => {
        if (c.id === currentCard.id) {
          const newBox = success ? (Math.min(4, c.box + 1) as 1 | 2 | 3 | 4) : 1;
          return { ...c, box: newBox, lastReviewed: new Date().toISOString() };
        }
        return c;
      })
    );

    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % filteredDeck.length);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0c101d] border-2 border-[#1c243a] rounded-3xl p-6 sm:p-8 shadow-comic-lg bg-halftone">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6] text-white font-bangers text-xs border border-black shadow-comic-sm">
              <Layers className="w-3.5 h-3.5" />
              LEITNER SPACED REPETITION (SRS)
            </span>
            <h1 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
              POWER CARDS MEMORY VAULT
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Cement Big-O bounds, pointer invariants, and DP recurrence formulas into long-term memory.
              Cards you know graduate to Box 4; cards you miss drop back to Box 1 for review.
            </p>
          </div>

          {/* Leitner Box Badges */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(boxNum => {
              const count = deck.filter(c => c.box === boxNum).length;
              return (
                <button
                  key={boxNum}
                  onClick={() => {
                    setBoxFilter(boxFilter === boxNum ? 'all' : boxNum);
                    setCurrentIndex(0);
                    setIsFlipped(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl border-2 text-center transition ${
                    boxFilter === boxNum
                      ? 'bg-[#FBBF24] text-black border-black font-bold shadow-comic-sm'
                      : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
                  }`}
                >
                  <span className="text-[10px] block opacity-75">Box {boxNum}</span>
                  <span className="font-bangers text-sm">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3D Flip Card */}
      {currentCard ? (
        <div className="space-y-6">
          <div
            onClick={handleFlip}
            className="cursor-pointer perspective-1000 min-h-[300px] sm:min-h-[340px]"
          >
            <div
              className={`w-full h-full relative transform-style-3d transition-transform duration-500 rounded-3xl border-2 border-[#1c243a] shadow-comic-lg ${
                isFlipped ? 'rotate-y-180 bg-[#071c14] border-[#10B981]' : 'bg-[#0f1426]'
              } p-8 flex flex-col justify-between`}
            >
              {!isFlipped ? (
                /* FRONT */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#38BDF8] text-black font-bangers text-xs border border-black shadow-comic-sm">
                      {currentCard.topic}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Box {currentCard.box} / 4</span>
                  </div>

                  <div className="py-6">
                    <h3 className="font-bangers text-2xl sm:text-3xl text-white tracking-wide leading-snug">
                      {currentCard.question}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#1b233a] text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <RotateCw className="w-4 h-4 text-[#FBBF24]" />
                      Click card to flip and verify answer
                    </span>
                    <span>
                      Card {currentIndex + 1} of {filteredDeck.length}
                    </span>
                  </div>
                </div>
              ) : (
                /* BACK */
                <div className="space-y-4 rotate-y-180">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#10B981] text-black font-bangers text-xs border border-black shadow-comic-sm">
                      ANSWER VERIFIED
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Box {currentCard.box} / 4</span>
                  </div>

                  <div className="py-4 space-y-3">
                    <p className="text-sm sm:text-base text-emerald-100 font-medium leading-relaxed whitespace-pre-line">
                      {currentCard.answer}
                    </p>
                    {currentCard.codeSnippet && (
                      <div className="p-3 bg-[#060810] rounded-xl border border-[#10B981]/40 font-mono text-xs text-[#34D399]">
                        <pre>{currentCard.codeSnippet}</pre>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-slate-400 pt-2 border-t border-[#10B981]/30">
                    Did you recall this correctly? Rate below!
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons: Pass or Miss */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => handleReview(false)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#F43F5E] hover:bg-[#e11d48] text-white font-bangers text-sm border-2 border-black shadow-comic-sm transition active:translate-y-0.5"
            >
              <X className="w-4 h-4" />
              Forgot / Again (Reset to Box 1)
            </button>
            <button
              onClick={() => handleReview(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#10B981] hover:bg-[#34D399] text-black font-bangers text-sm border-2 border-black shadow-comic-sm transition active:translate-y-0.5"
            >
              <Check className="w-4 h-4" />
              Recalled Perfect! (+15 XP)
            </button>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-slate-400 bg-[#0c101d] rounded-2xl border-2 border-[#1c243a]">
          No cards in this filter! Click another box or reset to all.
        </div>
      )}
    </div>
  );
};
