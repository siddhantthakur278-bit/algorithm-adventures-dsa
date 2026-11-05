import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PythonDsaBossQuestion } from '../../types/pythonDsaTypes';
import { pythonDsaBossBattle } from '../../data/pythonDsaData';
import {
  SidAvatar,
  ProfessorPyAvatar,
  BuggyAvatar,
} from '../characters/Characters';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  Swords,
  Shield,
  Heart,
  Flame,
  RotateCcw,
  Trophy,
  Zap,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface DamageNumber {
  id: number;
  text: string;
  type: 'hit' | 'crit' | 'miss' | 'heal';
  x: number;
}

export const BossBattleArena: React.FC<{
  onDefeated?: () => void;
}> = ({ onDefeated }) => {
  // Battle States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [bossHp, setBossHp] = useState<number>(200);
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [shieldCount, setShieldCount] = useState<number>(2);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [battleLog, setBattleLog] = useState<string[]>([
    '⚔️ Buggy the Myth Kaiju has entered the arena! Answer DSA riddles to strike him down!',
  ]);

  // Visual FX States
  const [buggyHit, setBuggyHit] = useState<boolean>(false);
  const [playerHit, setPlayerHit] = useState<boolean>(false);
  const [spellAnim, setSpellAnim] = useState<string | null>(null);
  const [damageNumbers, setDamageNumbers] = useState<DamageNumber[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [roundFilter, setRoundFilter] = useState<number | 'all'>('all');
  const [answeredMap, setAnsweredMap] = useState<Record<string, { choice: string; isCorrect: boolean }>>({});

  const activeQuestions =
    roundFilter === 'all'
      ? pythonDsaBossBattle
      : pythonDsaBossBattle.filter(q => q.round === roundFilter);

  const currentQ = activeQuestions[currentQuestionIndex] || activeQuestions[0];
  const isBossDefeated = bossHp <= 0;
  const isPlayerDefeated = playerHp <= 0;

  // Spell names pool
  const spells = [
    { name: 'TIMSORT SLICE', sound: 'slash' },
    { name: 'TWO-POINTER STRIKE', sound: 'hit' },
    { name: 'MONOTONIC HAMMER', sound: 'whack' },
    { name: 'HASH COLLIDER', sound: 'laser' },
    { name: 'DP MEMO BEAM', sound: 'powerup' },
    { name: 'BINARY SEARCH TRACER', sound: 'pop' },
  ];

  const addDamageNumber = (text: string, type: 'hit' | 'crit' | 'miss' | 'heal') => {
    const id = Date.now() + Math.random();
    const x = Math.floor(Math.random() * 40) - 20;
    setDamageNumbers(prev => [...prev, { id, text, type, x }]);
    setTimeout(() => {
      setDamageNumbers(prev => prev.filter(d => d.id !== id));
    }, 1200);
  };

  const handleAnswer = (choice: string) => {
    if (selectedOption || isBossDefeated || isPlayerDefeated) return;
    setSelectedOption(choice);

    const isCorrect = choice === currentQ.correct;
    const isCrit = combo >= 2;

    setAnsweredMap(prev => ({
      ...prev,
      [currentQ.id]: { choice, isCorrect },
    }));

    if (isCorrect) {
      // Player lands attack
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);

      const spell = spells[Math.floor(Math.random() * spells.length)];
      setSpellAnim(spell.name);

      const damage = isCrit ? 25 : 15;
      const nextBossHp = Math.max(0, bossHp - damage);
      setBossHp(nextBossHp);

      // Trigger animations & sounds
      setBuggyHit(true);
      setTimeout(() => setBuggyHit(false), 500);

      sound.playHit();
      sound.playCombo(newCombo);
      addDamageNumber(`-${damage} HP ${isCrit ? 'CRIT!' : ''}`, isCrit ? 'crit' : 'hit');

      confetti({
        particleCount: isCrit ? 45 : 25,
        spread: 55,
        origin: { x: 0.7, y: 0.5 },
        colors: ['#FBBF24', '#10B981', '#38BDF8'],
      });

      setBattleLog(prev => [
        `⚡ Sid & Py cast ${spell.name}! Hit Buggy for -${damage} HP! (Combo x${newCombo})`,
        ...prev.slice(0, 4),
      ]);

      if (nextBossHp === 0) {
        sound.playExplosion();
        setTimeout(() => sound.playFanfare(), 400);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10B981', '#FBBF24', '#F43F5E', '#38BDF8'],
        });
        setBattleLog(prev => [
          '🏆 VICTORY! BUGGY THE MYTH KAIJU HAS BEEN VANQUISHED!',
          ...prev.slice(0, 4),
        ]);
        if (onDefeated) onDefeated();
      }
    } else {
      // Buggy counters
      setCombo(0);
      sound.playError();

      if (shieldCount > 0) {
        setShieldCount(s => s - 1);
        addDamageNumber('SHIELD BLOCKED!', 'heal');
        setBattleLog(prev => [
          `🛡️ Buggy cast 'Off-By-One Sting'! Your Streak Shield absorbed the blow!`,
          ...prev.slice(0, 4),
        ]);
      } else {
        const damage = 20;
        setPlayerHp(h => Math.max(0, h - damage));
        setPlayerHit(true);
        setTimeout(() => setPlayerHit(false), 450);
        addDamageNumber(`-${damage} HP`, 'miss');
        setBattleLog(prev => [
          `💥 Buggy cast 'Recursion Limit Exceeded'! Hero took -${damage} damage!`,
          ...prev.slice(0, 4),
        ]);
      }
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setSpellAnim(null);
    sound.playPop();
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    } else {
      // Loop or finish
      setCurrentQuestionIndex(0);
    }
  };

  const restartBattle = () => {
    sound.playPop();
    setBossHp(200);
    setPlayerHp(100);
    setShieldCount(2);
    setCombo(0);
    setSelectedOption(null);
    setSpellAnim(null);
    setCurrentQuestionIndex(0);
    setAnsweredMap({});
    setBattleLog(['⚔️ The arena has reset! Buggy returns with full health! Prepare your spells!']);
  };

  return (
    <div className="bg-[#0b1320] border-3 border-black rounded-3xl p-5 sm:p-7 shadow-comic relative overflow-hidden space-y-6">
      {/* Background Halftone & Glow */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-80 bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-rose-500/15 blur-3xl pointer-events-none" />

      {/* Arena Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#F43F5E] text-white font-bangers text-xs border border-black shadow-comic-sm uppercase">
              Turn-Based RPG Arena
            </span>
            <span className="text-xs font-mono text-[#FBBF24] font-bold">
              Riddle #{currentQuestionIndex + 1} of {activeQuestions.length}
            </span>
          </div>
          <h2 className="font-bangers text-2xl sm:text-4xl text-white tracking-wide mt-1 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            DEFEAT BUGGY: THE MYTH KAIJU
          </h2>
          <p className="text-xs text-slate-400">
            Select the correct algorithmic counter-spell to deplete Buggy's 200 HP and earn the Legend Badge!
          </p>
        </div>

        {/* Round Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-[#070e17] p-1 rounded-xl border border-[#1b2b40]">
          {[
            { id: 'all', label: 'All Rounds' },
            { id: 1, label: 'R1: Basics' },
            { id: 2, label: 'R2: Structs' },
            { id: 3, label: 'R3: Algos' },
            { id: 4, label: 'R4: Final' },
          ].map(r => (
            <button
              key={r.id}
              onClick={() => {
                setRoundFilter(r.id as any);
                setCurrentQuestionIndex(0);
                setSelectedOption(null);
                sound.playPop();
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition cursor-pointer ${
                roundFilter === r.id
                  ? 'bg-[#10B981] text-black shadow-comic-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* RPG Combat Stage (Split Arena) */}
      <div className="bg-[#060c15] border-2 border-black rounded-2xl p-5 relative overflow-hidden shadow-comic-lg">
        {/* Arena Ring Floor Grid */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0e1b2b] to-transparent pointer-events-none border-b-4 border-[#1e3450]" />

        {/* Flying Spell Animation */}
        <AnimatePresence>
          {spellAnim && (
            <motion.div
              initial={{ x: -100, opacity: 0, scale: 0.5 }}
              animate={{ x: [0, 200, 380], opacity: [0, 1, 0], scale: [0.8, 1.3, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/4 -translate-y-1/2 z-30 pointer-events-none"
            >
              <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FBBF24] via-[#F43F5E] to-[#38BDF8] text-black font-bangers text-lg border-2 border-black shadow-comic-lg tracking-wider flex items-center gap-2">
                <Zap className="w-5 h-5 fill-current" />
                <span>{spellAnim}!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Combatants Row */}
        <div className="grid grid-cols-2 gap-4 relative z-10 items-end min-h-[220px]">
          {/* LEFT: HERO TEAM (Sid & Prof. Py) */}
          <div className="space-y-3">
            {/* Player HP Bar */}
            <div className="space-y-1 max-w-[240px]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-current text-rose-500" /> HERO TEAM
                </span>
                <span className="text-slate-300 font-bold">{playerHp} / 100 HP</span>
              </div>
              <div className="w-full bg-[#121c29] h-3.5 rounded-full overflow-hidden border border-black p-0.5">
                <motion.div
                  animate={{ width: `${(playerHp / 100) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                />
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-cyan-400" /> {shieldCount} Shields
                </span>
                {combo > 1 && (
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    className="text-[10px] font-bangers text-amber-300 bg-amber-950/80 px-2 py-0.2 rounded border border-amber-500 flex items-center gap-0.5"
                  >
                    <Flame className="w-3 h-3 text-amber-400" /> COMBO x{combo}!
                  </motion.span>
                )}
              </div>
            </div>

            {/* Hero Team Avatars */}
            <motion.div
              animate={playerHit ? { x: [-10, 10, -5, 5, 0], opacity: [0.6, 1] } : {}}
              className="flex items-end gap-3 pt-2"
            >
              <div className="text-center">
                <ProfessorPyAvatar size="md" mood="teaching" />
                <span className="block text-[10px] font-bangers text-[#10B981] mt-0.5">Prof. Py</span>
              </div>
              <div className="text-center">
                <SidAvatar size="md" mood={combo > 1 ? 'happy' : 'curious'} />
                <span className="block text-[10px] font-bangers text-[#FBBF24] mt-0.5">Sid (Lv 3)</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: BOSS MONSTER (Buggy the Myth Kaiju) */}
          <div className="flex flex-col items-end space-y-3">
            {/* Boss HP Bar */}
            <div className="space-y-1 w-full max-w-[260px]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-rose-400 flex items-center gap-1">
                  <Swords className="w-3.5 h-3.5 text-rose-500" /> BUGGY THE KAIJU
                </span>
                <span className="text-slate-300 font-bold">{bossHp} / 200 HP</span>
              </div>
              <div className="w-full bg-[#1b0d12] h-4 rounded-full overflow-hidden border-2 border-black p-0.5 relative">
                <motion.div
                  animate={{ width: `${(bossHp / 200) * 100}%` }}
                  transition={{ duration: 0.35 }}
                  className={`h-full rounded-full transition-colors ${
                    bossHp > 100
                      ? 'bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500'
                      : bossHp > 40
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                      : 'bg-rose-600 animate-pulse'
                  }`}
                />
              </div>
              <div className="flex items-center justify-end gap-1 text-[10px] font-mono text-slate-400">
                <span>Phase {bossHp > 120 ? '1: Trickster' : bossHp > 50 ? '2: Fiend' : '3: Enraged!'}</span>
              </div>
            </div>

            {/* Boss Avatar & Floating Damage Numbers */}
            <div className="relative pt-2">
              {/* Damage Floating Particles */}
              <AnimatePresence>
                {damageNumbers.map(d => (
                  <motion.div
                    key={d.id}
                    initial={{ y: 0, opacity: 1, scale: 0.6 }}
                    animate={{ y: -65, opacity: 0, scale: 1.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    style={{ left: `${d.x}px` }}
                    className={`absolute -top-4 font-bangers text-xl sm:text-2xl drop-shadow-[2px_2px_0px_#000] pointer-events-none z-30 ${
                      d.type === 'crit'
                        ? 'text-amber-300'
                        : d.type === 'hit'
                        ? 'text-rose-400'
                        : d.type === 'heal'
                        ? 'text-sky-300'
                        : 'text-slate-400'
                    }`}
                  >
                    {d.text}
                  </motion.div>
                ))}
              </AnimatePresence>

              <BuggyAvatar
                size="xl"
                mood={isBossDefeated ? 'defeated' : bossHp < 60 ? 'angry' : 'mischievous'}
                isHit={buggyHit}
              />
            </div>
          </div>
        </div>

        {/* Live Combat Broadcast Ticker */}
        <div className="mt-4 pt-3 border-t border-[#1a2d44] flex items-center gap-2 text-xs font-mono text-slate-300 overflow-hidden">
          <span className="text-[#FBBF24] font-bold shrink-0">⚔️ COMBAT LOG:</span>
          <p className="truncate text-slate-300">{battleLog[0]}</p>
        </div>
      </div>

      {/* Interactive Question Card / Game Stage Controls */}
      {!isBossDefeated && !isPlayerDefeated ? (
        <div className="bg-[#070e17] border-2 border-[#1c2c42] rounded-2xl p-5 space-y-4 shadow-comic">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#10B981] text-black font-bangers text-[11px]">
                {currentQ.roundName}
              </span>
              <span className="text-xs font-mono text-slate-400 font-bold">{currentQ.id}</span>
            </div>
            <span className="text-xs font-mono text-[#FBBF24]">Target: {currentQ.chapterRef}</span>
          </div>

          <h3 className="text-sm sm:text-base font-semibold text-white font-sans leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Spell Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {currentQ.options.map(opt => {
              const answered = answeredMap[currentQ.id];
              const isSelected = selectedOption === opt.label || answered?.choice === opt.label;
              const isCorrect = opt.label === currentQ.correct;

              return (
                <button
                  key={opt.label}
                  disabled={!!selectedOption}
                  onClick={() => handleAnswer(opt.label)}
                  className={`p-3.5 rounded-xl border-2 text-xs font-mono text-left transition flex items-center gap-3 cursor-pointer ${
                    selectedOption
                      ? isCorrect
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-comic-sm'
                        : isSelected
                        ? 'bg-rose-950/90 border-rose-500 text-rose-200 shadow-comic-sm'
                        : 'bg-[#09111c] border-[#142236] text-slate-500 opacity-50'
                      : 'bg-[#0b1422] border-[#1a2d46] text-slate-200 hover:text-white hover:border-[#10B981] hover:bg-[#101e32]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border ${
                      selectedOption
                        ? isCorrect
                          ? 'bg-emerald-500 text-black border-black'
                          : isSelected
                          ? 'bg-rose-500 text-white border-black'
                          : 'bg-[#152336] text-slate-400 border-transparent'
                        : 'bg-[#152336] text-[#FBBF24] border-black'
                    }`}
                  >
                    {opt.label}
                  </span>
                  <span className="leading-snug">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Answer Explanation & Next Spell Button */}
          {selectedOption && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-[#091524] border border-[#173050] space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span
                  className={`font-bold flex items-center gap-1.5 ${
                    selectedOption === currentQ.correct ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {selectedOption === currentQ.correct ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Spell Hit! Critical Knowledge Unlocked!
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4" /> Attack Missed! Buggy Absorbed the Spell!
                    </>
                  )}
                </span>
                <span className="text-[#38BDF8] font-bold">Correct was: {currentQ.correct}</span>
              </div>

              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                <strong className="text-[#FBBF24]">Insight:</strong> {currentQ.explanation}
              </p>

              <div className="flex justify-end pt-1">
                <button
                  onClick={nextQuestion}
                  className="px-5 py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-black font-bangers text-xs border border-black shadow-comic-sm transition active:translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next Riddle ➔</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      ) : isBossDefeated ? (
        /* VICTORY SCREEN */
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-b from-[#082a1e] to-[#0b1624] border-3 border-[#10B981] rounded-3xl p-8 text-center space-y-4 shadow-comic-lg"
        >
          <div className="w-16 h-16 rounded-full bg-[#10B981] text-black flex items-center justify-center mx-auto text-3xl font-bangers border-2 border-black shadow-comic-sm">
            🏆
          </div>
          <h2 className="font-bangers text-4xl sm:text-5xl text-white tracking-wide">
            BUGGY HAS BEEN VANQUISHED!
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200 max-w-xl mx-auto font-mono">
            You conquered all 20 Boss Battle riddles with a Max Combo streak of x{maxCombo}! Buggy is
            dizzily retreating back into the myth dimension.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-full bg-[#FBBF24] text-black font-bangers text-xs border border-black shadow-comic-sm">
              +500 Quest XP Awarded
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 font-mono text-xs border border-emerald-500/40">
              Legendary "Bug Slayer" Title Unlocked
            </span>
          </div>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={restartBattle}
              className="px-6 py-2.5 rounded-xl bg-[#FBBF24] hover:bg-amber-400 text-black font-bangers text-xs border-2 border-black shadow-comic-sm flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Rematch with Buggy
            </button>
          </div>
        </motion.div>
      ) : (
        /* HERO DEFEATED SCREEN */
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-b from-[#2a0808] to-[#0b1624] border-3 border-rose-500 rounded-3xl p-8 text-center space-y-4 shadow-comic-lg"
        >
          <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto text-3xl font-bangers border-2 border-black shadow-comic-sm">
            💀
          </div>
          <h2 className="font-bangers text-4xl text-white tracking-wide">HERO HP DEPLETED!</h2>
          <p className="text-xs sm:text-sm text-rose-200 max-w-xl mx-auto font-mono">
            Buggy overwhelmed your defenses with tricky recursion limits and index errors! Review the
            chapters and try again.
          </p>
          <div className="pt-2">
            <button
              onClick={restartBattle}
              className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bangers text-xs border-2 border-black shadow-comic-sm flex items-center gap-2 mx-auto cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Revive & Retry Boss Fight
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
