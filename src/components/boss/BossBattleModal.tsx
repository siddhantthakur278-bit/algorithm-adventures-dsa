import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { bossBattleQuestions } from '../../data/bossBattleData';
import { ByteAvatar, BugsyAvatar, ComicBubble } from '../characters/Characters';
import { Trophy, Swords, Zap, Shield, RotateCcw, Sparkles } from 'lucide-react';
import { sound } from '../../utils/soundEffects';

export const BossBattleModal: React.FC = () => {
  const { stats, setBossDefeated } = useCourse();

  const [byteHp, setByteHp] = useState<number>(100);
  const [bugsyHp, setBugsyHp] = useState<number>(100);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [battleLog, setBattleLog] = useState<string>('Bugsy enters the arena with malicious code!');
  const [isFinished, setIsFinished] = useState<boolean>(stats.bossBeaten);

  const currentQ = bossBattleQuestions[questionIndex] || bossBattleQuestions[0];

  const handleAnswer = (optionIdx: number) => {
    setSelectedOption(optionIdx);
    const isCorrect = optionIdx === currentQ.correctIndex;

    if (isCorrect) {
      sound.playSlash();
      const newBugsyHp = Math.max(0, bugsyHp - currentQ.damage);
      setBugsyHp(newBugsyHp);
      setBattleLog(`Byte counter-attacks! "${currentQ.byteCounter}" (-${currentQ.damage} DMG)`);

      if (newBugsyHp <= 0) {
        setIsFinished(true);
        setBossDefeated();
      } else {
        setTimeout(() => {
          setSelectedOption(null);
          setQuestionIndex((questionIndex + 1) % bossBattleQuestions.length);
        }, 1200);
      }
    } else {
      sound.playError();
      const newByteHp = Math.max(0, byteHp - 25);
      setByteHp(newByteHp);
      setBattleLog(`Bugsy sneers! "${currentQ.bugsyInsult}" Byte takes 25 DMG!`);

      if (newByteHp <= 0) {
        setIsFinished(true);
      } else {
        setTimeout(() => {
          setSelectedOption(null);
          setQuestionIndex((questionIndex + 1) % bossBattleQuestions.length);
        }, 1200);
      }
    }
  };

  const resetBattle = () => {
    setByteHp(100);
    setBugsyHp(100);
    setQuestionIndex(0);
    setSelectedOption(null);
    setIsFinished(false);
    setBattleLog('Fight restarted! Byte is ready to battle Bugsy again.');
    sound.playPop();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Boss Battle Arena HUD */}
      <div className="bg-[#1b1222] border-3 border-black rounded-3xl p-6 sm:p-8 shadow-comic-lg bg-halftone">
        {/* Top Battle Banner */}
        <div className="text-center space-y-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5757] text-white font-bangers text-xs border border-black shadow-comic-sm">
            <Swords className="w-3.5 h-3.5" />
            EPIC BOSS BATTLE ARENA
          </span>
          <h1 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
            BYTE VS BUGSY: THE FINAL EXAM
          </h1>
        </div>

        {/* Health Bars HUD */}
        <div className="grid grid-cols-2 gap-6 p-4 bg-[#100b16] rounded-2xl border-2 border-black mb-8 shadow-comic-sm">
          {/* Byte Health */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bangers text-sm text-[#38B6FF]">BYTE (HERO)</span>
              <span className="font-mono text-xs font-bold text-white">{byteHp} / 100 HP</span>
            </div>
            <div className="w-full bg-[#2a1d36] h-3.5 rounded-full overflow-hidden border border-black p-[1px]">
              <div
                className="bg-gradient-to-r from-blue-500 to-[#38B6FF] h-full rounded-full transition-all duration-300"
                style={{ width: `${byteHp}%` }}
              />
            </div>
          </div>

          {/* Bugsy Health */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bangers text-sm text-[#7ED957]">BUGSY (BOSS)</span>
              <span className="font-mono text-xs font-bold text-white">{bugsyHp} / 100 HP</span>
            </div>
            <div className="w-full bg-[#2a1d36] h-3.5 rounded-full overflow-hidden border border-black p-[1px]">
              <div
                className="bg-gradient-to-r from-[#FF5757] via-[#FF914D] to-[#7ED957] h-full rounded-full transition-all duration-300"
                style={{ width: `${bugsyHp}%` }}
              />
            </div>
          </div>
        </div>

        {/* Duel Avatars Stage */}
        <div className="flex items-center justify-between px-8 py-4 mb-6">
          <div className="text-center">
            <ByteAvatar size="lg" mood={byteHp <= 0 ? 'shocked' : 'victory'} />
            <span className="text-xs font-bangers text-gray-300 block mt-1">Byte</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="font-bangers text-2xl text-[#FFDE59] animate-pulse">VS</div>
            <span className="text-[10px] text-gray-500 font-mono">Round {questionIndex + 1}</span>
          </div>

          <div className="text-center">
            <BugsyAvatar size="lg" mood={bugsyHp <= 0 ? 'defeated' : 'sneaky'} />
            <span className="text-xs font-bangers text-gray-300 block mt-1">Bugsy</span>
          </div>
        </div>

        {/* Battle Log Box */}
        <div className="p-3 bg-[#110d18] rounded-xl border border-gray-800 text-xs font-medium text-gray-300 mb-6 text-center">
          {battleLog}
        </div>

        {/* Question & Combat Choices */}
        {!isFinished ? (
          <div className="space-y-4">
            <div className="p-4 bg-[#23172e] rounded-xl border-2 border-black">
              <h3 className="font-bold text-white text-sm sm:text-base leading-snug">
                {currentQ.question}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="p-3.5 rounded-xl border-2 bg-[#1a1224] hover:bg-[#281a38] border-gray-700 hover:border-[#FFDE59] text-gray-200 text-xs font-medium text-left transition"
                >
                  <span className="font-mono text-[#FFDE59] mr-2 font-bold">{idx + 1}.</span>
                  <span>{opt}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Battle Over Screen */
          <div className="text-center p-8 bg-[#160e1d] rounded-2xl border-2 border-black space-y-4">
            {bugsyHp <= 0 ? (
              <>
                <Trophy className="w-16 h-16 text-[#FFDE59] mx-auto animate-bounce" />
                <h2 className="font-bangers text-3xl text-white">BUGSY HAS BEEN VANQUISHED!</h2>
                <p className="text-xs text-gray-300 max-w-md mx-auto">
                  You cracked every algorithmic trick Bugsy threw at you! You earned the +250 XP Boss Slayer Trophy.
                </p>
              </>
            ) : (
              <>
                <h2 className="font-bangers text-3xl text-[#FF5757]">BYTE WAS KNOCKED OUT!</h2>
                <p className="text-xs text-gray-300 max-w-md mx-auto">
                  Bugsy's traps were too sneaky this time. Review the chapters and try again!
                </p>
              </>
            )}

            <button
              onClick={resetBattle}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FFDE59] text-black font-bangers text-xs border-2 border-black shadow-comic-sm mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              Rematch Battle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
