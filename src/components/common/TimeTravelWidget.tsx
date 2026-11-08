import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { Clock, RefreshCw, Sparkles, ChevronDown, ChevronUp, Calendar, Rocket, Lock } from 'lucide-react';

export const TimeTravelWidget: React.FC = () => {
  const {
    simulatedDate,
    setSimulatedDate,
    scheduleState,
    cohortConfig,
    resetCohortToToday,
    setManualCohortDay,
    updateCohortConfig,
  } = useCourse();
  const [isOpen, setIsOpen] = useState(false);

  const setTime = (hours: number, minutes: number, dayOfWeek?: number) => {
    const d = new Date(simulatedDate || new Date());
    if (dayOfWeek !== undefined) {
      const currentDay = d.getDay();
      const distance = (dayOfWeek + 7 - currentDay) % 7;
      d.setDate(d.getDate() + distance);
    }
    d.setHours(hours, minutes, 0, 0);
    setSimulatedDate(d);
  };

  const jumpToCohortDay = (day: number) => {
    if (cohortConfig.mode === 'manual_day') {
      setManualCohortDay(day);
    } else {
      const start = new Date(cohortConfig.startDate);
      const target = new Date(start);
      target.setDate(target.getDate() + (day - 1));
      target.setHours(5, 0, 0, 0);
      setSimulatedDate(target);
    }
  };

  const resetToReal = () => {
    setSimulatedDate(null);
  };

  return (
    <div className="bg-[#070912] border-b border-[#1b2236] text-xs px-4 py-2 text-slate-300">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#FBBF24]/10 text-[#FBBF24] font-bold border border-[#FBBF24]/30">
            <Clock className="w-3.5 h-3.5" />
            Time Engine:
          </span>
          <span className="text-slate-300">
            {simulatedDate ? (
              <span className="text-[#FB923C] font-mono font-bold">
                {simulatedDate.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}{' '}
                {simulatedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            ) : (
              <span className="text-emerald-400 font-mono font-medium">Live Clock (Real-Time)</span>
            )}
          </span>
          <span className="hidden sm:inline-block text-slate-500">•</span>
          <span className="hidden sm:inline-block text-slate-300">
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold">
              {cohortConfig.isUnlockedAll || cohortConfig.mode === 'self_paced'
                ? '⚡ Self-Paced (All Open)'
                : scheduleState.isPreLaunch
                ? `⏳ Pre-Launch (${scheduleState.cohortStartDateStr})`
                : `🚀 Cohort Day ${scheduleState.dayNumber || 1}`}
            </span>
          </span>
          <span className="hidden sm:inline-block text-slate-500">•</span>
          <span className="hidden sm:inline-block text-slate-300">
            POTD:{' '}
            {scheduleState.isPotdUnlocked ? (
              <span className="text-emerald-400 font-bold">UNLOCKED (5:00 AM)</span>
            ) : (
              <span className="text-rose-400 font-bold">SEALED (Opens 5:00 AM)</span>
            )}
          </span>
          <span className="hidden md:inline-block text-slate-500">•</span>
          <span className="hidden md:inline-block text-slate-300">
            HW Quota: <strong className="text-white font-bold">{scheduleState.homeworkQuota} problems (In Sequence)</strong>{' '}
            {scheduleState.isWeekendRush && <span className="text-[#FBBF24] font-semibold">(Weekend Rush!)</span>}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#131728] hover:bg-[#1c223a] text-slate-200 transition font-medium text-xs border border-[#2b3552] cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-[#FBBF24]" />
            Cohort & Time Controls
            {isOpen ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
          </button>

          {simulatedDate && (
            <button
              onClick={resetToReal}
              className="flex items-center gap-1 px-2 py-1 rounded bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition text-xs font-semibold border border-rose-500/40 cursor-pointer"
              title="Reset back to your system clock"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Real Time
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-[#1b2236] flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-medium">Cohort Timeline Jumps:</span>
          <button
            onClick={() => resetCohortToToday()}
            className="px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-xs border border-slate-900 cursor-pointer flex items-center gap-1 shadow-sm hover:bg-amber-300"
          >
            <Rocket className="w-3 h-3" /> Start Day 1 Today
          </button>
          <button
            onClick={() => jumpToCohortDay(2)}
            className="px-2.5 py-0.5 rounded bg-[#131728] hover:bg-[#1d233c] text-xs text-sky-300 border border-sky-500/30 cursor-pointer flex items-center gap-1"
          >
            <Calendar className="w-3 h-3" /> Day 2
          </button>
          <button
            onClick={() => jumpToCohortDay(3)}
            className="px-2.5 py-0.5 rounded bg-[#131728] hover:bg-[#1d233c] text-xs text-emerald-300 border border-emerald-500/30 cursor-pointer flex items-center gap-1"
          >
            <Calendar className="w-3 h-3" /> Day 3
          </button>
          <button
            onClick={() => jumpToCohortDay(4)}
            className="px-2.5 py-0.5 rounded bg-[#131728] hover:bg-[#1d233c] text-xs text-purple-300 border border-purple-500/30 cursor-pointer flex items-center gap-1"
          >
            <Calendar className="w-3 h-3" /> Day 4
          </button>
          <button
            onClick={() => updateCohortConfig({ isUnlockedAll: !cohortConfig.isUnlockedAll })}
            className={`px-2.5 py-0.5 rounded text-xs border cursor-pointer flex items-center gap-1 ${
              cohortConfig.isUnlockedAll
                ? 'bg-purple-600 text-white border-purple-400 font-bold'
                : 'bg-[#131728] hover:bg-[#1d233c] text-purple-300 border-purple-500/30'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            {cohortConfig.isUnlockedAll ? '⚡ Self-Paced: ON' : 'Self-Paced: OFF'}
          </button>
          <button
            onClick={() => setTime(4, 30)}
            className="px-2 py-0.5 rounded bg-[#131728] hover:bg-[#1d233c] text-xs text-slate-400 border border-slate-700"
          >
            4:30 AM (Sealed)
          </button>
        </div>
      )}
    </div>
  );
};
