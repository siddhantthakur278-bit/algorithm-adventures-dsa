import React, { useState, useEffect } from 'react';
import { useCourse } from '../../context/CourseContext';
import { blitzQuestions } from '../../data/gameData';
import { ByteAvatar, BugsyAvatar, ComicBubble } from '../characters/Characters';
import { Zap, Clock, Trophy, Flame, RotateCcw, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { sound } from '../../utils/soundEffects';

export const SpeedBlitzArena: React.FC = () => {
  const { stats, recordBlitzScore, triggerBurst } = useCourse();

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [lastAnswerStatus, setLastAnswerStatus] = useState<'correct' | 'wrong' | null>(null);

  // Timer loop
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameover');
            return 0;
          }
          if (prev <= 10) {
            sound.playTimerTick();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // When game finishes, record score
  useEffect(() => {
    if (gameState === 'gameover') {
      recordBlitzScore(score);
    }
  }, [gameState]);

  const startGame = () => {
    setTimeLeft(60);
    setScore(0);
    setCombo(0);
    setCorrectCount(0);
    setWrongCount(0);
    setCurrentIdx(0);
    setLastAnswerStatus(null);
    setGameState('playing');
    sound.playPop();
  };

  const handleAnswer = (optionIdx: number) => {
    if (gameState !== 'playing') return;

    const currentQ = blitzQuestions[currentIdx % blitzQuestions.length];
    const isCorrect = optionIdx === currentQ.correctIndex;

    if (isCorrect) {
      const newCombo = combo + 1;
      const multiplier = newCombo >= 10 ? 5 : newCombo >= 7 ? 4 : newCombo >= 4 ? 3 : newCombo >= 2 ? 2 : 1;
      const points = 50 * multiplier;
      setScore(prev => prev + points);
      setCombo(newCombo);
      setCorrectCount(prev => prev + 1);
      setLastAnswerStatus('correct');
      sound.playCombo(newCombo);
      if (newCombo >= 3) {
        triggerBurst(`⚡ ${newCombo}x COMBO!`, `+${points} PTS!`, 'zap');
      }
    } else {
      setCombo(0);
      setWrongCount(prev => prev + 1);
      setLastAnswerStatus('wrong');
      sound.playBuzzer();
      triggerBurst('💥 BUZZER!', 'Combo Reset!', 'boom');
    }

    // Advance to next question immediately
    setCurrentIdx(prev => prev + 1);
  };

  const currentQ = blitzQuestions[currentIdx % blitzQuestions.length];
  const timerPercent = (timeLeft / 60) * 100;
  const multiplier = combo >= 10 ? 5 : combo >= 7 ? 4 : combo >= 4 ? 3 : combo >= 2 ? 2 : 1;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#1b1528] border-3 border-black rounded-3xl p-6 sm:p-8 shadow-comic-lg bg-halftone">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFDE59] text-black font-bangers text-xs border border-black shadow-comic-sm">
              <Zap className="w-3.5 h-3.5" />
              60-SECOND TIME ATTACK
            </span>
            <h1 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
              BUGSY’S SPEED RUN BLITZ
            </h1>
            <p className="text-sm text-gray-300 max-w-lg">
              Solve as many rapid-fire algorithmic questions as you can in 60 seconds! Keep your combo
              alive for up to <strong className="text-[#FFDE59]">5x Multiplier Madness</strong>!
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#110e1c] px-6 py-4 rounded-2xl border-2 border-black shadow-comic-sm">
            <Trophy className="w-8 h-8 text-[#FFDE59]" />
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                All-Time High Score
              </span>
              <span className="font-bangers text-3xl text-white">{stats.blitzHighScore} PTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* GAME ARENA */}
      {gameState === 'idle' && (
        <div className="bg-[#121626] rounded-3xl border-3 border-black p-8 sm:p-12 text-center shadow-comic-sm space-y-6">
          <div className="flex justify-center items-center gap-6">
            <ByteAvatar size="lg" mood="happy" />
            <div className="font-bangers text-3xl text-[#FFDE59]">VS TIME</div>
            <BugsyAvatar size="lg" mood="sneaky" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="font-bangers text-2xl text-white">ARE YOU READY FOR THE BLITZ?</h3>
            <p className="text-xs text-gray-400">
              Answer fast! Every correct answer fuels your combo multiplier. Every wrong answer resets
              your combo back to 1x!
            </p>
          </div>

          <button
            onClick={startGame}
            className="px-8 py-3.5 rounded-2xl bg-[#FFDE59] hover:bg-[#ffe680] text-black font-bangers text-lg border-3 border-black shadow-comic-sm transition active:translate-y-1"
          >
            START 60-SEC BLITZ NOW! ⚡
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="bg-[#121626] rounded-3xl border-3 border-black p-6 sm:p-8 shadow-comic-lg space-y-6">
          {/* Top HUD: Timer, Score, Combo */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {/* Timer */}
            <div className="p-3 bg-[#171b2d] rounded-2xl border-2 border-black">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">Time Remaining</span>
              <div
                className={`font-mono text-2xl sm:text-3xl font-extrabold ${
                  timeLeft <= 10 ? 'text-[#FF5757] animate-pulse' : 'text-white'
                }`}
              >
                {timeLeft}s
              </div>
            </div>

            {/* Score */}
            <div className="p-3 bg-[#171b2d] rounded-2xl border-2 border-black">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">Score</span>
              <div className="font-bangers text-2xl sm:text-3xl text-[#FFDE59]">{score}</div>
            </div>

            {/* Combo Multiplier */}
            <div className="p-3 bg-[#171b2d] rounded-2xl border-2 border-black">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">Combo Multiplier</span>
              <div className="flex items-center justify-center gap-1">
                <Flame className={`w-5 h-5 ${combo >= 2 ? 'text-[#FF914D] animate-bounce' : 'text-gray-500'}`} />
                <span className="font-bangers text-2xl sm:text-3xl text-[#38B6FF]">{multiplier}x</span>
              </div>
            </div>
          </div>

          {/* Timer Progress Bar */}
          <div className="w-full bg-[#1b2038] h-3 rounded-full overflow-hidden border border-black p-[1px]">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                timeLeft <= 10 ? 'bg-[#FF5757]' : 'bg-gradient-to-r from-[#FFDE59] to-[#FF914D]'
              }`}
              style={{ width: `${timerPercent}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="p-6 bg-[#0e111d] rounded-2xl border-2 border-black space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400">
              <span className="text-[#38B6FF] font-bold">Category: {currentQ.category}</span>
              <span>Question #{currentIdx + 1}</span>
            </div>

            <h3 className="font-bangers text-xl sm:text-2xl text-white tracking-wide leading-snug">
              {currentQ.prompt}
            </h3>
          </div>

          {/* Rapid-Fire Answer Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="p-4 rounded-2xl border-2 bg-[#171b2d] hover:bg-[#252b47] border-gray-700 hover:border-[#FFDE59] text-left text-sm font-bold text-white transition active:scale-95 shadow-comic-sm"
              >
                <span className="font-mono text-[#FFDE59] mr-2">[{idx + 1}]</span>
                <span>{opt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="bg-[#121626] rounded-3xl border-3 border-black p-8 sm:p-12 text-center shadow-comic-lg space-y-6">
          <Trophy className="w-16 h-16 text-[#FFDE59] mx-auto animate-bounce" />

          <div className="space-y-1">
            <h2 className="font-bangers text-3xl sm:text-4xl text-white">TIME’S UP! BLITZ COMPLETED!</h2>
            <p className="text-sm text-gray-300">
              {score >= stats.blitzHighScore
                ? 'NEW ALL-TIME RECORD SET! You are an Algorithm Speed God!'
                : 'Awesome effort! Your reflexes and complexity intuition are razor sharp!'}
            </p>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto p-4 bg-[#0e111d] rounded-2xl border-2 border-black text-center font-mono">
            <div>
              <span className="text-[10px] text-gray-400 block">FINAL SCORE</span>
              <strong className="font-bangers text-2xl text-[#FFDE59]">{score}</strong>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block">CORRECT</span>
              <strong className="font-bangers text-2xl text-[#7ED957]">{correctCount}</strong>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block">XP REWARD</span>
              <strong className="font-bangers text-2xl text-[#38B6FF]">+{Math.round(score / 5)} XP</strong>
            </div>
          </div>

          <button
            onClick={startGame}
            className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-[#FFDE59] text-black font-bangers text-sm border-2 border-black shadow-comic-sm mx-auto transition active:translate-y-1"
          >
            <RotateCcw className="w-4 h-4" />
            PLAY ANOTHER BLITZ RUN!
          </button>
        </div>
      )}
    </div>
  );
};
