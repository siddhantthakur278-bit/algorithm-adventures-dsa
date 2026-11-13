import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  Calendar,
  Sparkles,
  Rocket,
  Flame,
  Zap,
  RefreshCw,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  Globe,
  CheckCircle2,
  Lock,
  Unlock,
  SlidersHorizontal,
} from 'lucide-react';
import { useCourse } from '../../context/CourseContext';
import { realTimeEngine, RealTimeEngineState } from '../../utils/realTimeEngine';
import { sound } from '../../utils/soundEffects';
import { CohortScheduleSettingsModal } from './CohortScheduleSettingsModal';

interface MasterClockHudProps {
  variant?: 'banner' | 'modal' | 'compact';
  onClose?: () => void;
}

export const MasterClockHud: React.FC<MasterClockHudProps> = ({ variant = 'banner', onClose }) => {
  const {
    simulatedDate,
    setSimulatedDate,
    scheduleState,
    cohortConfig,
    resetCohortToToday,
    setManualCohortDay,
  } = useCourse();
  const [realNow, setRealNow] = useState<Date>(new Date());
  const [use24Hour, setUse24Hour] = useState<boolean>(false);
  const [showPacingModal, setShowPacingModal] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [engineState, setEngineState] = useState<RealTimeEngineState>(() =>
    realTimeEngine.getState(simulatedDate || undefined)
  );

  // Timezone Detection
  const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local';

  // Live 1-second ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setRealNow(new Date());
    }, 1000);
    const unsubscribe = realTimeEngine.subscribe((st) => {
      setEngineState(realTimeEngine.getState(simulatedDate || undefined));
    });
    return () => {
      clearInterval(timer);
      unsubscribe();
    };
  }, [simulatedDate]);

  const effectiveDate = simulatedDate || realNow;

  // Format Helpers
  const formatTimeStr = (d: Date, withSeconds = true) => {
    return d.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: withSeconds ? '2-digit' : undefined,
      hour12: !use24Hour,
    });
  };

  const formatDateStr = (d: Date) => {
    return d.toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatShortDate = (d: Date) => {
    return d.toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  // User-configured Cohort Start Date (unbound from hardcoded calendar dates!)
  const userStartDate = new Date(cohortConfig.startDate);
  const msUntilLaunch = userStartDate.getTime() - effectiveDate.getTime();
  const isLaunched =
    cohortConfig.isUnlockedAll ||
    cohortConfig.mode === 'self_paced' ||
    cohortConfig.mode === 'manual_day' ||
    msUntilLaunch <= 0;

  const formatDelta = (ms: number) => {
    if (ms <= 0) return '00:00:00';
    const totalSecs = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Cohort Schedule Days Strip generated dynamically from user's starting date
  const cohortDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, idx) => {
      const d = new Date(userStartDate);
      d.setDate(d.getDate() + idx);
      const dayNum = idx + 1;
      const dayOfWeek = d.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      return {
        day: dayNum,
        date: d,
        label: `Day ${dayNum}`,
        dateFormatted: d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }),
        sub: idx === 0 ? 'Day 1 • Two Sum' : isWeekend ? 'Weekend Rush (+2 HW)' : `Day ${dayNum} Challenge`,
        isWeekend,
        isLaunch: idx === 0,
      };
    });
  }, [userStartDate]);

  const isCurrentActiveDay = (d: Date, dayNum: number) => {
    if (cohortConfig.mode === 'manual_day') {
      return cohortConfig.manualDayNumber === dayNum;
    }
    return (
      effectiveDate.getFullYear() === d.getFullYear() &&
      effectiveDate.getMonth() === d.getMonth() &&
      effectiveDate.getDate() === d.getDate()
    );
  };

  return (
    <div className="bg-[#080b13] border-b border-slate-800/80 text-slate-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Compact Executive Studio Bar */}
        <div className="py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Clock & Date */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-sm sm:text-base font-extrabold text-amber-300 tracking-wider">
                {formatTimeStr(effectiveDate, false)}
              </span>
              <button
                onClick={() => setUse24Hour((prev) => !prev)}
                className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                title="Toggle 12h/24h"
              >
                {use24Hour ? '24H' : '12H'}
              </button>
            </div>

            <div className="hidden md:flex items-center gap-2 text-slate-300 border-l border-slate-800 pl-3">
              <span className="font-semibold text-slate-200">{formatDateStr(effectiveDate)}</span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800/80">
                {timeZoneName}
              </span>
            </div>

            {simulatedDate && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40">
                ⚡ SIMULATED TIMELINE
              </span>
            )}
          </div>

          {/* Center: Live Timers Pill */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 bg-[#0d121e] px-2.5 py-1 rounded-lg border border-slate-800">
              <Rocket className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Cohort:</span>
              <span className="text-amber-300 font-bold">
                {cohortConfig.isUnlockedAll || cohortConfig.mode === 'self_paced'
                  ? 'Self-Paced'
                  : `Day ${scheduleState.dayNumber || 1}`}
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#0d121e] px-2.5 py-1 rounded-lg border border-slate-800">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-slate-400">POTD:</span>
              <span className="text-sky-300 font-bold">{engineState.potdCountdown.formatted}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#0d121e] px-2.5 py-1 rounded-lg border border-slate-800">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-slate-400">Deadline:</span>
              <span className="text-rose-300 font-bold">{engineState.midnightCountdown.formatted}</span>
            </div>
          </div>

          {/* Right: Controls & Expand Toggle */}
          <div className="flex items-center gap-2">
            {simulatedDate && (
              <button
                onClick={() => {
                  setSimulatedDate(null);
                  sound.playPop();
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[11px] font-semibold transition cursor-pointer"
                title="Sync back to real machine clock"
              >
                <RefreshCw className="w-3 h-3" />
                <span className="hidden sm:inline">Real Clock</span>
              </button>
            )}

            <button
              onClick={() => setShowPacingModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] font-medium transition cursor-pointer"
            >
              <SlidersHorizontal className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">Pacing</span>
            </button>

            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer border ${
                isExpanded
                  ? 'bg-amber-400/10 text-amber-300 border-amber-400/40 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
              }`}
            >
              <Calendar className="w-3 h-3 text-amber-400" />
              <span>Timeline Matrix</span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Collapsible Rich 7-Day Matrix Strip */}
        {isExpanded && (
          <div className="py-3 border-t border-slate-800/80 animate-fadeIn space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Select any cohort day to preview scheduled problem sets &amp; homework limits:
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                Active Date: {formatShortDate(effectiveDate)}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {cohortDays.map((item) => {
                const active = isCurrentActiveDay(item.date, item.day);
                return (
                  <button
                    key={item.day}
                    onClick={() => {
                      if (cohortConfig.mode === 'manual_day') {
                        setManualCohortDay(item.day);
                      } else {
                        setSimulatedDate(item.date);
                      }
                      sound.playPop();
                    }}
                    className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                      active
                        ? 'bg-amber-400/15 text-white border-amber-400/60 shadow-comic-sm font-bold scale-[1.02]'
                        : 'bg-[#0d111a] hover:bg-[#141b2a] text-slate-300 border-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className={`font-mono font-bold ${active ? 'text-amber-300' : 'text-slate-400'}`}>
                        Day {item.day}
                      </span>
                      {item.isWeekend && (
                        <span className="text-[9px] px-1 rounded font-bold uppercase bg-orange-500/20 text-orange-300">
                          +2 HW
                        </span>
                      )}
                      {item.isLaunch && (
                        <span className="text-[9px] px-1 rounded font-bold uppercase bg-emerald-500/20 text-emerald-300">
                          Launch
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold truncate mt-1">{item.label}</div>
                    <div className="text-[10px] truncate mt-0.5 text-slate-400">
                      {item.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Cohort Schedule & Pacing Configuration Modal */}
      <CohortScheduleSettingsModal
        isOpen={showPacingModal}
        onClose={() => setShowPacingModal(false)}
      />
    </div>
  );
};
