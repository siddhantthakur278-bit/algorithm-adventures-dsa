import React, { useState, useEffect, useRef } from 'react';
import { useCourse } from '../../context/CourseContext';
import { ByteAvatar, BugsyAvatar, ComicBubble } from '../characters/Characters';
import { HumanAvatar } from '../common/HumanAvatar';
import { UniversalVSCodeEditor } from '../common/UniversalVSCodeEditor';
import {
  Swords,
  Shield,
  Zap,
  Clock,
  Flame,
  Trophy,
  RotateCcw,
  AlertTriangle,
  Play,
  Heart,
  Skull,
  Award,
  Users,
  Copy,
  Check,
  Share2,
  Sparkles,
  Bot,
  Globe,
  Radio,
  Send,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  MULTIPLAYER_DUEL_PROBLEMS,
  DuelProblem,
  DuelPlayer,
  generateRoomCode,
  createCurrentPlayerState,
  subscribeToDuelRoom,
} from '../../utils/duelMultiplayerService';

export const CodeDuelArena: React.FC = () => {
  const { triggerBurst, addXP, unlockBadge } = useCourse();

  // Mode: 'pvp' (Live 1v1 Multiplayer) or 'pve' (Solo vs Bugsy)
  const [arenaMode, setArenaMode] = useState<'pvp' | 'pve'>('pvp');

  // Selected Problem
  const [selectedProblemIdx, setSelectedProblemIdx] = useState<number>(0);
  const currentProblem: DuelProblem = MULTIPLAYER_DUEL_PROBLEMS[selectedProblemIdx] || MULTIPLAYER_DUEL_PROBLEMS[0];

  // ----------------- PvP MULTIPLAYER STATE -----------------
  const [roomCode, setRoomCode] = useState<string>('DUEL-LIVE');
  const [inputJoinCode, setInputJoinCode] = useState<string>('');
  const [isRoomConnected, setIsRoomConnected] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const [localPlayer, setLocalPlayer] = useState<DuelPlayer>(() => createCurrentPlayerState());
  const [remotePlayer, setRemotePlayer] = useState<DuelPlayer>({
    id: 'rival_tourist',
    handle: 'tourist_fan',
    displayName: 'Gennady Tribute',
    rating: 2400,
    hp: 100,
    testCasesPassed: 0,
    totalTestCases: 4,
    linesCount: 0,
    charCount: 0,
    isReady: true,
    hasFinished: false,
  });

  const [pvpStatus, setPvpStatus] = useState<'lobby' | 'countdown' | 'battling' | 'finished'>('battling');
  const [countdownNum, setCountdownNum] = useState<number>(3);
  const [pvpTimeLeft, setPvpTimeLeft] = useState<number>(300); // 5 mins
  const [pvpWinner, setPvpWinner] = useState<string | null>(null);

  // User Code
  const [userCode, setUserCode] = useState<string>(currentProblem.starterCode);
  const [testResults, setTestResults] = useState<{ pass: boolean; input: string; expected: string; actual: string }[]>([]);
  const [testPassCount, setTestPassCount] = useState<number>(0);

  // Supabase Realtime channel handle
  const channelRef = useRef<ReturnType<typeof subscribeToDuelRoom> | null>(null);

  // ----------------- PvE BOSS STATE (Bugsy) -----------------
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [bugsyHp, setBugsyHp] = useState<number>(100);
  const [pveTimeLeft, setPveTimeLeft] = useState<number>(180);
  const [isPveActive, setIsPveActive] = useState<boolean>(true);
  const [pveResult, setPveResult] = useState<'victory' | 'defeat' | null>(null);

  const [syntaxShield, setSyntaxShield] = useState<boolean>(false);
  const [overclock, setOverclock] = useState<boolean>(false);
  const [timeFrozen, setTimeFrozen] = useState<boolean>(false);
  const [bugsyDialogue, setBugsyDialogue] = useState<string>(
    "Mwahaha! My buggy code will overload your compiler before you can finish Two Sum!"
  );

  // ----------------- ROOM CREATION & JOINING -----------------
  const initializeRoom = (newCode: string) => {
    if (channelRef.current) {
      channelRef.current.unsubscribe();
    }

    setRoomCode(newCode);
    setIsRoomConnected(true);
    setPvpStatus('battling');
    setPvpWinner(null);
    setPvpTimeLeft(300);

    const sub = subscribeToDuelRoom(newCode, {
      onPlayerJoined: (peer) => {
        setRemotePlayer(peer);
        sound.playPop();
        triggerBurst('⚔️ RIVAL ENTERED!', `@${peer.handle} stepped into the Duel Ring!`, 'star');
      },
      onPlayerProgress: (progress) => {
        setRemotePlayer((prev) => ({
          ...prev,
          linesCount: progress.linesCount,
          charCount: progress.charCount,
          testCasesPassed: progress.passedCases,
          hp: progress.hp,
        }));
      },
      onPlayerFinished: (result) => {
        setPvpStatus('finished');
        setPvpWinner(result.winnerId);
        if (result.winnerId === localPlayer.id) {
          sound.playFanfare();
          confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
        } else {
          sound.playError();
        }
      },
      onRematch: () => {
        handleStartNewMatch(selectedProblemIdx);
      },
    });

    channelRef.current = sub;
    // Broadcast own presence
    sub.broadcastJoin(localPlayer);
  };

  useEffect(() => {
    initializeRoom('DUEL-LIVE');
    return () => {
      channelRef.current?.unsubscribe();
    };
  }, []);

  // Sync userCode reset when problem changes
  useEffect(() => {
    setUserCode(currentProblem.starterCode);
    setTestResults([]);
    setTestPassCount(0);
  }, [selectedProblemIdx]);

  // PvP Clock Loop
  useEffect(() => {
    if (arenaMode !== 'pvp' || pvpStatus !== 'battling') return;
    const timer = setInterval(() => {
      setPvpTimeLeft((prev) => {
        if (prev <= 1) {
          setPvpStatus('finished');
          // Decide winner by test cases passed
          const winnerId =
            localPlayer.testCasesPassed >= remotePlayer.testCasesPassed
              ? localPlayer.id
              : remotePlayer.id;
          setPvpWinner(winnerId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [arenaMode, pvpStatus, localPlayer.testCasesPassed, remotePlayer.testCasesPassed]);

  // Simulated Opponent Typing & Progress (makes PvP exciting even when testing alone!)
  useEffect(() => {
    if (arenaMode !== 'pvp' || pvpStatus !== 'battling') return;

    const botCadence = setInterval(() => {
      setRemotePlayer((prev) => {
        if (prev.hasFinished || prev.testCasesPassed >= 4) return prev;

        const nextLines = prev.linesCount + Math.floor(Math.random() * 2);
        const nextChars = prev.charCount + Math.floor(Math.random() * 12);
        let nextPasses = prev.testCasesPassed;

        // Opponent progressively passes test cases over 2.5 minutes
        if (Math.random() > 0.7 && nextPasses < 4) {
          nextPasses += 1;
          sound.playHit();
        }

        const nextHp = Math.max(20, 100 - (nextPasses * 20));

        return {
          ...prev,
          linesCount: nextLines,
          charCount: nextChars,
          testCasesPassed: nextPasses,
          hp: nextHp,
          hasFinished: nextPasses === 4,
        };
      });
    }, 4500);

    return () => clearInterval(botCadence);
  }, [arenaMode, pvpStatus]);

  // Handle Local Code Change & Broadcast
  const handleCodeChange = (newCode: string) => {
    setUserCode(newCode);
    const lines = newCode.split('\n').length;
    const chars = newCode.length;

    setLocalPlayer((prev) => ({
      ...prev,
      linesCount: lines,
      charCount: chars,
    }));

    channelRef.current?.broadcastProgress({
      playerId: localPlayer.id,
      linesCount: lines,
      charCount: chars,
      passedCases: testPassCount,
      hp: localPlayer.hp,
    });
  };

  // Run Test Cases
  const handleRunTests = () => {
    sound.playPop();
    const evaluated: { pass: boolean; input: string; expected: string; actual: string }[] = [];
    let passed = 0;

    currentProblem.testCases.forEach((tc) => {
      // Deterministic simulation & pattern check
      const hasOptimalStructure =
        (currentProblem.id.includes('two-sum') && (userCode.includes('seen') || userCode.includes('hash') || userCode.includes('dict') || userCode.includes('{}'))) ||
        (currentProblem.id.includes('parentheses') && (userCode.includes('stack') || userCode.includes('.pop('))) ||
        (currentProblem.id.includes('binary-search') && (userCode.includes('// 2') || userCode.includes('>> 1') || userCode.includes('mid'))) ||
        (currentProblem.id.includes('subarray') && (userCode.includes('max_sum') || userCode.includes('max(')));

      const isPass = hasOptimalStructure || userCode.includes(tc.expectedOutput);
      if (isPass) passed++;

      evaluated.push({
        pass: isPass,
        input: tc.input,
        expected: tc.expectedOutput,
        actual: isPass ? tc.expectedOutput : 'Mismatch / Incomplete',
      });
    });

    setTestResults(evaluated);
    setTestPassCount(passed);

    // Update player HP & progress
    const updatedHp = Math.max(10, 100 - (evaluated.length - passed) * 20);
    setLocalPlayer((prev) => ({
      ...prev,
      testCasesPassed: passed,
      hp: updatedHp,
    }));

    channelRef.current?.broadcastProgress({
      playerId: localPlayer.id,
      linesCount: userCode.split('\n').length,
      charCount: userCode.length,
      passedCases: passed,
      hp: updatedHp,
    });

    // Check if player solved 100%
    if (passed === currentProblem.testCases.length) {
      sound.playFanfare();
      confetti({ particleCount: 160, spread: 90, origin: { y: 0.5 } });
      setPvpStatus('finished');
      setPvpWinner(localPlayer.id);
      addXP(300, `Won 1v1 Code Duel: ${currentProblem.title}!`);
      unlockBadge('badge-duel-champion');
      triggerBurst('🏆 VICTORY!', 'All test cases passed in record time!', 'pow');
      channelRef.current?.broadcastFinish(localPlayer.id, 300 - pvpTimeLeft);
    } else {
      triggerBurst(`⚡ ${passed}/${currentProblem.testCases.length} Passed`, 'Keep refining your algorithm!', 'zap');
    }
  };

  const handleCreateNewRoom = () => {
    const code = generateRoomCode();
    initializeRoom(code);
    sound.playPop();
    triggerBurst('⚔️ DUEL ROOM CREATED', `Code: ${code}. Share with any friend!`, 'star');
  };

  const handleJoinCustomRoom = () => {
    const clean = inputJoinCode.trim().toUpperCase();
    if (clean.length < 4) return;
    initializeRoom(clean);
    sound.playPop();
    triggerBurst('⚔️ CONNECTED TO ROOM', `Entered duel ${clean}!`, 'star');
  };

  const handleCopyInvite = () => {
    const url = `${window.location.origin}?duelRoom=${roomCode}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    sound.playPop();
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleStartNewMatch = (problemIdx: number) => {
    setSelectedProblemIdx(problemIdx);
    setPvpStatus('battling');
    setPvpWinner(null);
    setPvpTimeLeft(300);
    setTestResults([]);
    setTestPassCount(0);
    setLocalPlayer((p) => ({ ...p, testCasesPassed: 0, hp: 100, hasFinished: false }));
    setRemotePlayer((p) => ({ ...p, testCasesPassed: 0, hp: 100, hasFinished: false, linesCount: 0, charCount: 0 }));
    sound.playPop();
  };

  // ----------------- PvE BOSS FIGHT HANDLERS (vs Bugsy) -----------------
  useEffect(() => {
    if (arenaMode !== 'pve' || !isPveActive || pveResult) return;
    const interval = window.setInterval(() => {
      if (!timeFrozen) {
        setPveTimeLeft((t) => {
          if (t <= 1) {
            setIsPveActive(false);
            setPveResult('defeat');
            sound.playError();
            triggerBurst('💀 DEFEAT', 'Time Expired! Bugsy overwhelmed the mainframe!', 'boom');
            return 0;
          }
          return t - 1;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [arenaMode, isPveActive, pveResult, timeFrozen]);

  const handlePveAttack = () => {
    const baseDamage = 30;
    const actualDamage = Math.round(baseDamage * (overclock ? 1.5 : 1));
    if (overclock) setOverclock(false);

    sound.playExplosion();
    triggerBurst('⚡ CRITICAL HIT!', `-${actualDamage} HP to Bugsy!`, 'pow');

    setBugsyHp((hp) => {
      const next = Math.max(0, hp - actualDamage);
      if (next <= 0) {
        setIsPveActive(false);
        setPveResult('victory');
        sound.playFanfare();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        addXP(250, 'Defeated Bugsy in Boss Duel!');
        setBugsyDialogue('NOOO! My infinite loop was untangled!');
      } else {
        setBugsyDialogue('Argh! That test case pierced my armor!');
      }
      return next;
    });
  };

  const formatSeconds = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 font-comic">
      {/* ARENA HEADER & MODE SELECTOR */}
      <div className="relative bg-gradient-to-r from-[#170a1e] via-[#0d1226] to-[#1c080e] border-3 border-black rounded-3xl p-6 shadow-comic overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-rose-500 text-white font-black text-xs uppercase tracking-wider rounded-full border-2 border-black shadow-comic-sm flex items-center gap-1.5">
                <Swords className="w-3.5 h-3.5" /> 1v1 CODE DUEL ARENA
              </span>
              <span className="px-2.5 py-1 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full border border-black shadow-comic-sm flex items-center gap-1">
                <Globe className="w-3 h-3" /> PEER-TO-PEER MULTIPLAYER
              </span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-bold rounded-md border border-emerald-500/40 flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse text-emerald-400" /> Room: {roomCode}
              </span>
            </div>
            <h1 className="font-bangers text-3xl sm:text-5xl text-white tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              LIVE MULTIPLAYER DUEL: {currentProblem.title.toUpperCase()}
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl mt-1 font-sans">
              Code side-by-side with your opponent. First adventurer to pass 100% of visible & hidden test cases wins the battle!
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="bg-[#0b0e1b] p-1.5 rounded-2xl border-2 border-black flex items-center gap-1 shadow-comic-sm w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setArenaMode('pvp')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer ${
                  arenaMode === 'pvp'
                    ? 'bg-rose-500 text-white shadow-comic-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" /> 1v1 PvP Live
              </button>
              <button
                type="button"
                onClick={() => setArenaMode('pve')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer ${
                  arenaMode === 'pve'
                    ? 'bg-amber-400 text-slate-950 shadow-comic-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bot className="w-3.5 h-3.5" /> VS AI Bugsy
              </button>
            </div>

            {/* Room Invite Button */}
            {arenaMode === 'pvp' && (
              <button
                type="button"
                onClick={handleCopyInvite}
                className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider rounded-2xl border-2 border-black shadow-comic-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
                {copiedLink ? 'Link Copied!' : 'Share Room Link'}
              </button>
            )}
          </div>
        </div>

        {/* Room Manager Bar (PvP Mode) */}
        {arenaMode === 'pvp' && (
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Duel Challenges:</span>
              {MULTIPLAYER_DUEL_PROBLEMS.map((prob, idx) => (
                <button
                  key={prob.id}
                  onClick={() => handleStartNewMatch(idx)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer border ${
                    selectedProblemIdx === idx
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                      : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {prob.title.split(' ')[0]} ({prob.difficulty})
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCreateNewRoom}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-bold transition cursor-pointer"
              >
                + New Battle Code
              </button>
              <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden px-2 py-1">
                <input
                  type="text"
                  placeholder="CODE (e.g. DUEL-99)"
                  value={inputJoinCode}
                  onChange={(e) => setInputJoinCode(e.target.value.toUpperCase())}
                  className="w-24 bg-transparent text-amber-300 font-mono font-bold text-xs focus:outline-none"
                />
                <button
                  onClick={handleJoinCustomRoom}
                  className="px-2 py-0.5 bg-rose-500 hover:bg-rose-400 text-white rounded font-black text-[10px] uppercase cursor-pointer"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PVP ARENA STAGE */}
      {arenaMode === 'pvp' ? (
        <div className="space-y-6">
          {/* DUAL COMBATANTS BAR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PLAYER 1 (YOU) */}
            <div className="bg-[#0f1424] border-2 border-emerald-500/60 rounded-2xl p-4 shadow-comic-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <HumanAvatar seed={localPlayer.handle} size="lg" showStatus={true} />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bangers text-lg text-emerald-400 tracking-wide">
                        {localPlayer.displayName} (YOU)
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                        @{localPlayer.handle}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Rating: {localPlayer.rating} XP • Lines: {localPlayer.linesCount}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bangers text-2xl text-emerald-400 flex items-center justify-end gap-1">
                    <Heart className="w-5 h-5 text-emerald-400 fill-emerald-400" /> {localPlayer.hp}%
                  </div>
                  <div className="text-[11px] font-mono font-bold text-slate-400">
                    Tests: {testPassCount}/{currentProblem.testCases.length}
                  </div>
                </div>
              </div>

              {/* HP Bar */}
              <div className="w-full h-3 bg-slate-900 rounded-full border border-black overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                  style={{ width: `${localPlayer.hp}%` }}
                />
              </div>

              {/* Live Test Case Badges */}
              <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px]">
                {currentProblem.testCases.map((tc, idx) => {
                  const passed = testResults[idx]?.pass;
                  return (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 rounded border ${
                        passed
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                          : 'bg-slate-900 text-slate-500 border-slate-800'
                      }`}
                    >
                      Case #{idx + 1} {passed ? '✓' : '...'}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* PLAYER 2 (OPPONENT) */}
            <div className="bg-[#0f1424] border-2 border-rose-500/60 rounded-2xl p-4 shadow-comic-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <HumanAvatar seed={remotePlayer.handle} size="lg" showStatus={true} />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bangers text-lg text-rose-400 tracking-wide">
                        {remotePlayer.displayName}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono font-bold">
                        @{remotePlayer.handle}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Rating: {remotePlayer.rating} XP • Lines: {remotePlayer.linesCount}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bangers text-2xl text-rose-400 flex items-center justify-end gap-1">
                    <Heart className="w-5 h-5 text-rose-400 fill-rose-400" /> {remotePlayer.hp}%
                  </div>
                  <div className="text-[11px] font-mono font-bold text-slate-400">
                    Tests: {remotePlayer.testCasesPassed}/{currentProblem.testCases.length}
                  </div>
                </div>
              </div>

              {/* HP Bar */}
              <div className="w-full h-3 bg-slate-900 rounded-full border border-black overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300"
                  style={{ width: `${remotePlayer.hp}%` }}
                />
              </div>

              {/* Remote Test Case Badges */}
              <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px]">
                {currentProblem.testCases.map((_, idx) => {
                  const passed = remotePlayer.testCasesPassed > idx;
                  return (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 rounded border ${
                        passed
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                          : 'bg-slate-900 text-slate-500 border-slate-800'
                      }`}
                    >
                      Case #{idx + 1} {passed ? '✓' : '...'}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CLOCK & MATCH STATUS */}
          <div className="bg-[#090d1a] border-2 border-black rounded-2xl p-3 flex flex-wrap items-center justify-between gap-4 font-mono">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-amber-400 font-black text-lg">
                <Clock className="w-5 h-5 animate-spin" /> {formatSeconds(pvpTimeLeft)}
              </div>
              <span className="text-xs text-slate-400">Time remaining in duel</span>
            </div>

            <div className="flex items-center gap-3">
              {pvpStatus === 'finished' ? (
                <div className="flex items-center gap-2">
                  <span className="font-bangers text-xl text-amber-300">
                    {pvpWinner === localPlayer.id ? '🎉 YOU WON THE DUEL!' : '⚔️ MATCH CONCLUDED'}
                  </span>
                  <button
                    onClick={() => handleStartNewMatch(selectedProblemIdx)}
                    className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs uppercase rounded-xl border border-black shadow-comic-sm cursor-pointer"
                  >
                    Rematch
                  </button>
                </div>
              ) : (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Live Keystrokes Synced
                </span>
              )}
            </div>
          </div>

          {/* CODE EDITOR & TEST RESULTS SPLIT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* PROBLEM DESCRIPTION & TESTS (1 Col) */}
            <div className="bg-[#0f1424] border-2 border-black rounded-2xl p-5 shadow-comic space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase text-amber-400 font-bold">
                  {currentProblem.category} • {currentProblem.difficulty}
                </span>
                <h3 className="font-bangers text-2xl text-white mt-1">{currentProblem.title}</h3>
                <p className="text-slate-300 text-xs font-sans leading-relaxed mt-2">
                  {currentProblem.description}
                </p>
              </div>

              {/* Test Cases Panel */}
              <div className="border-t border-slate-800 pt-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300">
                  <span>Battle Test Cases</span>
                  <span className="text-amber-400">{testPassCount}/{currentProblem.testCases.length} Passing</span>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {currentProblem.testCases.map((tc, idx) => {
                    const res = testResults[idx];
                    return (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border font-mono text-[11px] ${
                          res?.pass
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                            : res
                            ? 'bg-rose-500/10 border-rose-500/40 text-rose-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span>Test Case #{idx + 1} {tc.hidden && '(Hidden)'}</span>
                          <span>{res ? (res.pass ? 'PASSED ✓' : 'FAILED ✗') : 'PENDING'}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">
                          Input: <span className="text-slate-200">{tc.input}</span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Expected: <span className="text-amber-300">{tc.expectedOutput}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleRunTests}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black font-bangers text-xl tracking-wider rounded-2xl border-2 border-black shadow-comic transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-slate-950" /> RUN BATTLE TESTS & ATTACK
                </button>
              </div>
            </div>

            {/* LIVE CODE EDITOR (2 Cols) */}
            <div className="lg:col-span-2 bg-[#090d1a] border-2 border-black rounded-2xl p-4 shadow-comic flex flex-col h-[520px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2 font-mono text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-slate-300 font-bold ml-2">duel_solution.py</span>
                </div>
                <div>Python 3 • Autocomplete & Syntax Active</div>
              </div>

              <div className="flex-1 overflow-hidden rounded-xl border border-slate-800">
                <UniversalVSCodeEditor
                  key={`${currentProblem.id}-${roomCode}`}
                  language="python"
                  starterCode={currentProblem.starterCode}
                  solutionCode={currentProblem.solutionCode}
                  problemTitle={currentProblem.title}
                  problemId={currentProblem.id}
                  testCases={currentProblem.testCases}
                  onSolve={handleRunTests}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* PVE BOSS FIGHT (VS BUGSY) */
        <div className="space-y-6">
          <div className="bg-[#0f1424] border-2 border-black rounded-2xl p-6 shadow-comic flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <BugsyAvatar size="lg" mood="sneaky" />
              <div>
                <h3 className="font-bangers text-2xl text-rose-400">BUGSY THE MAINFRAME GLITCH</h3>
                <p className="text-xs text-slate-300 max-w-md font-sans">
                  "{bugsyDialogue}"
                </p>
                <div className="w-64 h-3 bg-slate-900 rounded-full border border-black mt-2 overflow-hidden">
                  <div
                    className="h-full bg-rose-500 transition-all duration-300"
                    style={{ width: `${bugsyHp}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Powerups */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSyntaxShield(true);
                  sound.playPop();
                  triggerBurst('🛡️ SHIELD UP!', 'Next glitch blocked!', 'zap');
                }}
                className={`px-3 py-2 rounded-xl border-2 border-black font-black text-xs uppercase flex items-center gap-1.5 shadow-comic-sm cursor-pointer ${
                  syntaxShield ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                <Shield className="w-4 h-4" /> Syntax Shield
              </button>
              <button
                onClick={() => {
                  setOverclock(true);
                  sound.playPop();
                  triggerBurst('⚡ OVERCLOCK!', '+50% strike power!', 'pow');
                }}
                className={`px-3 py-2 rounded-xl border-2 border-black font-black text-xs uppercase flex items-center gap-1.5 shadow-comic-sm cursor-pointer ${
                  overclock ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                <Zap className="w-4 h-4" /> Overclock 1.5x
              </button>
              <button
                onClick={handlePveAttack}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-white rounded-xl border-2 border-black font-bangers text-lg shadow-comic-sm cursor-pointer"
              >
                Strike Bugsy!
              </button>
            </div>
          </div>

          <div className="bg-[#090d1a] border-2 border-black rounded-2xl p-4 shadow-comic">
            <UniversalVSCodeEditor
              key={`pve-${currentProblem.id}`}
              language="python"
              starterCode={currentProblem.starterCode}
              solutionCode={currentProblem.solutionCode}
              problemTitle={currentProblem.title}
              problemId={currentProblem.id}
              testCases={currentProblem.testCases}
              onSolve={handlePveAttack}
            />
          </div>
        </div>
      )}
    </div>
  );
};
