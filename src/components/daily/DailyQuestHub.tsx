import React, { useState, useEffect } from 'react';
import { useCourse } from '../../context/CourseContext';
import { ByteAvatar, ProfessorAvatar, BugsyAvatar, ComicBubble } from '../characters/Characters';
import {
  Sparkles,
  Lock,
  Unlock,
  CheckCircle,
  Clock,
  Zap,
  ArrowRight,
  Calendar,
  AlertTriangle,
  Code,
  Flame,
  Shield,
  Target,
  Rocket,
  ArrowDown
} from 'lucide-react';
import { Problem } from '../../types';
import { sound } from '../../utils/soundEffects';
import { StructuredStudyPipeline } from './StructuredStudyPipeline';

export const DailyQuestHub: React.FC = () => {
  const {
    stats,
    scheduleState,
    loadProblemInIDE,
    simulatedDate,
    setSimulatedDate,
    dailyTargetStatus,
    realStreak,
    cohortConfig,
    updateCohortConfig,
    resetCohortToToday,
    setManualCohortDay,
  } = useCourse();
  const [now, setNow] = useState(new Date());
  const [sequenceWarning, setSequenceWarning] = useState<string | null>(null);

  // Tick clock for live countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format countdown string
  const formatCountdown = (ms: number) => {
    const totalSecs = Math.max(0, Math.floor(ms / 1000));
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const isPotdSolved = stats.solvedProblemIds.includes(scheduleState.potdProblem.id);

  const getDifficultyBadge = (diff: Problem['difficulty']) => {
    const colors = {
      Easy: 'bg-[#7ED957]/20 text-[#7ED957] border-[#7ED957]/40',
      Medium: 'bg-[#FFDE59]/20 text-[#FFDE59] border-[#FFDE59]/40',
      Hard: 'bg-[#FF5757]/20 text-[#FF5757] border-[#FF5757]/40',
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${colors[diff]}`}>
        {diff}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-fadeIn">
      {/* Pre-Launch Cohort Alert (shown if today is before user's start date) */}
      {scheduleState.isPreLaunch && (
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-400/40 rounded-2xl p-6 sm:p-8 shadow-comic flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="px-3 py-1 bg-amber-400/15 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-full border border-amber-400/30 flex items-center gap-1 font-mono">
                <Rocket className="w-3.5 h-3.5" /> Scheduled Cohort Start
              </span>
              <span className="text-xs text-amber-300 font-semibold">{scheduleState.cohortStartDateStr} at 05:00 AM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Your Scheduled Cohort Adventure Awaits
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Your Day 1 is scheduled to unlock on <strong>{scheduleState.cohortStartDateStr}</strong> at 5:00 AM with <strong>Two Sum &amp; Foundational Arrays</strong>. Want to start today or self-pace your schedule?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                resetCohortToToday();
                sound.playCelebration();
              }}
              className="btn-comic-push px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Rocket className="w-4 h-4" /> Start Today (Day 1) Now →
            </button>
            <button
              onClick={() => {
                updateCohortConfig({ isUnlockedAll: true, mode: 'self_paced' });
                sound.playSuccess();
              }}
              className="btn-comic-push px-5 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Zap className="w-4 h-4" /> Self-Paced Unlock
            </button>
          </div>
        </div>
      )}

      {/* Hero Classic Studio Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0a0e19] via-[#10172b] to-[#0c1222] border border-slate-800/80 p-6 sm:p-8 shadow-comic-lg bg-halftone">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 font-extrabold text-xs border border-amber-400/30 font-mono tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {scheduleState.isPreLaunch ? 'COHORT PRE-LAUNCH LAUNCHPAD' : `COHORT DAY ${scheduleState.dayNumber || 1} QUEST STATION`}
            </div>
            <h1 className="font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              DAY OF THE QUESTION &amp; SEQUENTIAL QUESTS
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Every morning at <strong className="text-amber-400">05:00 AM sharp</strong>, the legendary POTD vault
              unlocks. Your ongoing homework dynamically adapts to the hours remaining before midnight and{' '}
              <strong className="text-sky-400 font-medium">must be solved in sequential order</strong>.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-[#070a12] px-3 py-1.5 rounded-lg border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                POTD Gate: <span className="text-amber-400 font-bold">5:00 AM Daily</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-[#070a12] px-3 py-1.5 rounded-lg border border-slate-800">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                Homework Quota:{' '}
                <span className="text-white font-bold">{scheduleState.homeworkQuota} Problems (In Order)</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-[#070a12] px-3 py-1.5 rounded-lg border border-slate-800">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                Active Focus: <span className="text-emerald-300 font-bold">{scheduleState.potdProblem.category}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ByteAvatar size="lg" mood="happy" />
            <ProfessorAvatar size="lg" mood="wise" />
          </div>
        </div>
      </div>

      {/* Live Digital Chronometer & Dates Command Bar */}
      <div className="bg-[#090d18] rounded-2xl border border-slate-800/80 p-4 sm:p-5 shadow-comic flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xl shadow-sm border border-amber-300 shrink-0">
            ⏰
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Chronometer • {Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local'}
            </div>
            <div className="text-sm sm:text-base font-black text-white">
              {(simulatedDate || now).toLocaleDateString([], {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="text-xl sm:text-2xl font-mono font-black text-amber-300">
              {(simulatedDate || now).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs w-full md:w-auto justify-end">
          <div className="px-3 py-1.5 rounded-xl bg-[#12182b] border border-[#1f2a4a] text-slate-300">
            <span className="text-[10px] text-slate-400 block font-sans">Cohort Launch</span>
            <span className="text-amber-400 font-bold">{scheduleState.cohortStartDateStr} (Day {scheduleState.dayNumber || 1})</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#12182b] border border-[#1f2a4a] text-slate-300">
            <span className="text-[10px] text-slate-400 block font-sans">POTD Vault</span>
            <span className={scheduleState.isPotdUnlocked ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
              {scheduleState.isPotdUnlocked ? 'UNLOCKED (5 AM)' : 'SEALED (Opens 5 AM)'}
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#12182b] border border-[#1f2a4a] text-slate-300">
            <span className="text-[10px] text-slate-400 block font-sans">HW Sequence</span>
            <span className="text-sky-300 font-bold">{scheduleState.homeworkQuota} Quests in Order</span>
          </div>
        </div>
      </div>

      {/* Definitive Standard 5-Stage Daily Study Pipeline */}
      <StructuredStudyPipeline />

      {/* Real Streak & Daily Target Verification HUD */}
      <div className="bg-[#0c101d] rounded-2xl border-2 border-[#1c243a] p-5 shadow-comic-sm">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
          {/* Streak Flame Counter */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="p-3 bg-[#181109] rounded-2xl border-2 border-[#FB923C]/50 shadow-comic-sm flex-shrink-0 animate-flame">
              <Flame className="w-8 h-8 text-[#FB923C]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bangers text-3xl text-[#FBBF24] leading-none">
                  {realStreak.currentStreak}
                </span>
                <span className="font-bangers text-xl text-white">DAY REAL STREAK</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    dailyTargetStatus.isTargetComplete
                      ? 'bg-[#071d14] text-[#34D399] border-[#10B981]'
                      : 'bg-[#241805] text-[#FBBF24] border-[#FBBF24]/50'
                  }`}
                >
                  {dailyTargetStatus.isTargetComplete ? '🔥 TODAY SECURED (+1d)' : '⚠️ TARGET INCOMPLETE'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {dailyTargetStatus.statusMessage}
              </p>
            </div>
          </div>

          {/* Target Progress Bar & Checklist */}
          <div className="w-full lg:w-96 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-[#FBBF24]" />
                Daily Target Tasks ({dailyTargetStatus.tasksCompleted}/{dailyTargetStatus.totalTasks})
              </span>
              <span className="font-mono text-slate-400 font-bold">
                {dailyTargetStatus.progressPercent}%
              </span>
            </div>

            <div className="w-full bg-[#080d19] h-2.5 rounded-full overflow-hidden border border-[#1b233a]">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  dailyTargetStatus.isTargetComplete
                    ? 'bg-gradient-to-r from-[#10B981] to-[#34D399]'
                    : 'bg-gradient-to-r from-[#FBBF24] via-[#FB923C] to-[#F43F5E]'
                }`}
                style={{ width: `${dailyTargetStatus.progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] pt-0.5 font-mono">
              <span className={dailyTargetStatus.isPotdSolved ? 'text-[#34D399] font-bold' : 'text-slate-400'}>
                {dailyTargetStatus.isPotdSolved ? '✓ 5 AM POTD Solved' : '○ 5 AM POTD Pending'}
              </span>
              <span className={dailyTargetStatus.isHomeworkComplete ? 'text-[#34D399] font-bold' : 'text-slate-400'}>
                {dailyTargetStatus.isHomeworkComplete ? '✓ HW Quota Done' : `○ HW ${dailyTargetStatus.solvedHomeworkCount}/${dailyTargetStatus.homeworkQuota}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sequential Warning Alert Banner (if user clicks a locked homework) */}
      {sequenceWarning && (
        <div className="bg-rose-950/80 border-2 border-rose-500 p-4 rounded-2xl flex items-center justify-between gap-4 animate-shake">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <p className="text-xs sm:text-sm font-bold text-rose-200">{sequenceWarning}</p>
          </div>
          <button
            onClick={() => setSequenceWarning(null)}
            className="text-xs text-rose-400 hover:text-white font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Grid: 5 AM POTD Vault & Dynamic Homework Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: 5:00 AM POTD Vault (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bangers text-2xl text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-[#FBBF24]" />
              DAY OF THE QUESTION (POTD)
            </h2>
            <span className="text-xs font-mono text-slate-400 font-medium">
              {scheduleState.isPotdUnlocked ? 'UNLOCKED' : 'SEALED UNTIL 5:00 AM'}
            </span>
          </div>

          {scheduleState.isPotdUnlocked ? (
            /* POTD UNLOCKED STATE */
            <div className="bg-[#0c101d] border-3 border-[#FBBF24] rounded-2xl p-6 shadow-comic-yellow relative overflow-hidden animate-comic-pop hover-comic-lift">
              <div className="absolute top-0 right-0 bg-[#FBBF24] text-black font-bangers text-xs px-3 py-1 rounded-bl-xl border-l-2 border-b-2 border-black flex items-center gap-1 animate-pulse">
                <Unlock className="w-3.5 h-3.5" />
                VAULT OPENED AT 5:00 AM
              </div>

              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {getDifficultyBadge(scheduleState.potdProblem.difficulty)}
                    <span className="text-xs text-slate-300 font-medium">
                      {scheduleState.potdProblem.category}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono font-bold">
                      Sequence #1 of the Day
                    </span>
                  </div>
                  <h3 className="font-bangers text-2xl text-white hover:text-[#FBBF24] transition">
                    {scheduleState.potdProblem.title}
                  </h3>
                </div>

                {isPotdSolved && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/40">
                    <CheckCircle className="w-4 h-4" />
                    Solved & Committed
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-200 line-clamp-2 mb-4 leading-relaxed font-normal">
                {scheduleState.potdProblem.description}
              </p>

              {/* Comic dialogue from Professor */}
              <div className="mb-5">
                <ComicBubble
                  speaker="professor"
                  text={scheduleState.potdProblem.hints.professorInsight}
                  subtext="Daily Lecture"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Reward:</span>
                  <span className="text-xs font-bold text-[#FFDE59] bg-[#FFDE59]/10 px-2 py-0.5 rounded border border-[#FFDE59]/30">
                    +50 XP & Git Commit
                  </span>
                </div>

                <button
                  onClick={() => loadProblemInIDE(scheduleState.potdProblem)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bangers text-sm tracking-wide bg-[#FFDE59] text-black hover:bg-[#ffe680] border-2 border-black shadow-comic-sm transition active:translate-y-0.5"
                >
                  <Code className="w-4 h-4" />
                  {isPotdSolved ? 'Open in VS Code IDE' : 'Solve Today’s POTD'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* POTD SEALED VAULT (Before 5:00 AM or Pre-Launch) */
            <div className="bg-[#151322] border-3 border-[#FF5757] rounded-2xl p-8 shadow-comic-lg text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-comic-stripes opacity-20 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#FF5757]/15 border-2 border-[#FF5757] flex items-center justify-center text-[#FF5757] shadow-comic-sm">
                  <Lock className="w-8 h-8 animate-pulse" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-bangers text-2xl text-white tracking-wide">
                    {scheduleState.isPreLaunch ? 'OFFICIAL LAUNCH TOMORROW AT 5:00 AM' : 'POTD VAULT SEALED TILL 5:00 AM'}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {scheduleState.isPreLaunch
                      ? 'The cohort officially launches tomorrow! Byte and Professor are preparing the curriculum.'
                      : 'Byte and Professor are preparing today’s challenge. It unlocks automatically at 5:00 AM sharp!'}
                  </p>
                </div>

                {/* Countdown Display */}
                <div className="p-4 bg-[#0e101a] rounded-2xl border-2 border-black shadow-comic-sm w-full">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                    COUNTDOWN TO 5:00 AM UNLOCK
                  </span>
                  <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#FFDE59] tracking-wider">
                    {formatCountdown(scheduleState.msUntilPotdUnlock)}
                  </div>
                </div>

                {/* Comic Scene */}
                <div className="w-full text-left mt-2">
                  <ComicBubble
                    speaker="bugsy"
                    text="Hehehe! I placed a giant cryptographic padlock on the 5:00 AM vault! No early peeking!"
                    subtext="Sneaky Bugsy"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      resetCohortToToday();
                      sound.playCelebration();
                    }}
                    className="btn-comic-push text-xs text-amber-300 font-bold hover:underline cursor-pointer"
                  >
                    🚀 Start Day 1 Today
                  </button>
                  <span className="text-slate-500">•</span>
                  <button
                    onClick={() => {
                      updateCohortConfig({ isUnlockedAll: true });
                      sound.playSuccess();
                    }}
                    className="btn-comic-push text-xs text-purple-300 font-bold hover:underline cursor-pointer"
                  >
                    ⚡ Unlock Now (Self-Paced)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Dynamic Daily Homework (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bangers text-2xl text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#38BDF8]" />
              DYNAMIC DAILY HOMEWORK
            </h2>
            <span className="text-xs font-bold text-[#38BDF8] bg-[#38BDF8]/15 px-2.5 py-0.5 rounded-full border border-[#38BDF8]/30">
              {scheduleState.homeworkQuota} Quests in Sequence
            </span>
          </div>

          {/* Sequential Path Flow Pipeline */}
          <div className="bg-[#090d1a] border-2 border-[#1c243a] rounded-xl p-3 shadow-comic-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Sequential Quest Path
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Solve in order: P1 ➔ P2 ➔ P3
              </span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold no-scrollbar">
              <span
                className={`px-2 py-0.5 rounded-lg border flex items-center gap-1 shrink-0 ${
                  isPotdSolved
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                    : 'bg-amber-950/60 border-amber-500 text-amber-300'
                }`}
              >
                {isPotdSolved ? '✓' : '1.'} 5 AM POTD
              </span>
              <span className="text-slate-600">➔</span>
              {scheduleState.homeworkProblems.map((hw, i) => {
                const solved = stats.solvedProblemIds.includes(hw.id);
                const prevSolved = i === 0 || stats.solvedProblemIds.includes(scheduleState.homeworkProblems[i - 1].id);
                const active = !solved && prevSolved;
                return (
                  <React.Fragment key={hw.id}>
                    <span
                      className={`px-2 py-0.5 rounded-lg border flex items-center gap-1 shrink-0 ${
                        solved
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                          : active
                          ? 'bg-sky-950/80 border-sky-400 text-sky-300 ring-1 ring-sky-400 animate-pulse'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                    >
                      {solved ? '✓' : !prevSolved ? '🔒' : `${i + 2}.`} HW #{i + 1}
                    </span>
                    {i < scheduleState.homeworkProblems.length - 1 && <span className="text-slate-600">➔</span>}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Dynamic Rule Explainer Box */}
          <div className="bg-[#0c101d] border-2 border-[#1c243a] rounded-xl p-3.5 shadow-comic-sm text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center gap-2 text-white font-bold">
              <Clock className="w-3.5 h-3.5 text-[#FBBF24]" />
              Sequence Rule:
            </div>
            <p className="text-slate-300 leading-relaxed font-medium">
              Homework is pedagogical: each quest builds directly on the previous. You must solve{' '}
              <strong className="text-amber-400">HW #1</strong> before unlocking <strong className="text-sky-400">HW #2</strong>!
            </p>
            {scheduleState.isWeekendRush && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-[#FB923C]/20 text-[#FB923C] border border-[#FB923C]/40 font-semibold text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Weekend Rush Active! +2 Bonus problems assigned in sequence!</span>
              </div>
            )}
          </div>

          {/* Homework Problems List in Strict Sequence */}
          <div className="space-y-3">
            {scheduleState.homeworkProblems.map((hw, idx) => {
              const isSolved = stats.solvedProblemIds.includes(hw.id);
              const prevProblem = idx > 0 ? scheduleState.homeworkProblems[idx - 1] : null;
              const isPreviousSolved = idx === 0 || (prevProblem && stats.solvedProblemIds.includes(prevProblem.id));
              const isLocked = !isSolved && !isPreviousSolved;

              return (
                <div
                  key={hw.id}
                  onClick={() => {
                    if (isLocked) {
                      sound.playError();
                      setSequenceWarning(
                        `🔒 Sequence Locked: Complete HW #${idx} (${prevProblem?.title}) first to unlock this quest in order!`
                      );
                      return;
                    }
                    setSequenceWarning(null);
                    loadProblemInIDE(hw);
                  }}
                  className={`group p-4 rounded-xl border-2 transition-all ${
                    isSolved
                      ? 'bg-[#0c2217] border-[#10B981]/50 shadow-comic-sm cursor-pointer hover-comic-lift'
                      : isLocked
                      ? 'bg-[#090c17]/60 border-[#1a2033] opacity-60 cursor-not-allowed'
                      : 'bg-[#0e1322] border-[#38BDF8]/60 hover:border-[#38BDF8] shadow-comic-sm cursor-pointer hover-comic-lift'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bangers text-sm text-slate-400">HW #{idx + 1}</span>
                      {getDifficultyBadge(hw.difficulty)}
                    </div>
                    {isSolved ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-300">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    ) : isLocked ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                        <Lock className="w-3.5 h-3.5" />
                        Locked (Step {idx + 2})
                      </span>
                    ) : (
                      <span className="text-xs text-[#38BDF8] font-bold group-hover:underline flex items-center gap-1">
                        <Unlock className="w-3.5 h-3.5" /> Solve Next →
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-white text-sm group-hover:text-[#38BDF8] transition">
                    {hw.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-medium">{hw.category}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
