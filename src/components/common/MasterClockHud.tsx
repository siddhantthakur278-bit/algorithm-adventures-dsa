import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { useCourse } from '../../context/CourseContext';
import { realTimeEngine, RealTimeEngineState } from '../../utils/realTimeEngine';
import { sound } from '../../utils/soundEffects';

interface MasterClockHudProps {
  variant?: 'banner' | 'modal' | 'compact';
  onClose?: () => void;
}

export const MasterClockHud: React.FC<MasterClockHudProps> = ({ variant = 'banner', onClose }) => {
  const { simulatedDate, setSimulatedDate, scheduleState } = useCourse();
  const [realNow, setRealNow] = useState<Date>(new Date());
  const [use24Hour, setUse24Hour] = useState<boolean>(false);
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

  // Target Launch Date: Nov 6, 2026 at 05:00:00 AM
  const launchDate = new Date(2026, 10, 6, 5, 0, 0);
  const msUntilLaunch = launchDate.getTime() - effectiveDate.getTime();
  const isLaunched = msUntilLaunch <= 0;

  const formatDelta = (ms: number) => {
    if (ms <= 0) return '00:00:00';
    const totalSecs = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Cohort Schedule Days Strip
  const cohortDays = [
    { day: 0, date: new Date(2026, 10, 5, 16, 30, 0), label: 'Today (Nov 5)', sub: 'Pre-Launch Countdown', isToday: true },
    { day: 1, date: new Date(2026, 10, 6, 5, 0, 0), label: 'Tomorrow (Nov 6)', sub: 'Day 1 Launch • Two Sum', isLaunch: true },
    { day: 2, date: new Date(2026, 10, 7, 5, 0, 0), label: 'Sat (Nov 7)', sub: 'Weekend Rush +2 HW', isWeekend: true },
    { day: 3, date: new Date(2026, 10, 8, 5, 0, 0), label: 'Sun (Nov 8)', sub: 'Weekend Rush +2 HW', isWeekend: true },
    { day: 4, date: new Date(2026, 10, 9, 5, 0, 0), label: 'Mon (Nov 9)', sub: 'Day 4 • Dynamic Prog', isWeekday: true },
    { day: 5, date: new Date(2026, 10, 10, 5, 0, 0), label: 'Tue (Nov 10)', sub: 'Day 5 • Trees & BST', isWeekday: true },
    { day: 6, date: new Date(2026, 10, 11, 5, 0, 0), label: 'Wed (Nov 11)', sub: 'Day 6 • Graphs BFS', isWeekday: true },
  ];

  const isCurrentActiveDay = (d: Date) => {
    return (
      effectiveDate.getFullYear() === d.getFullYear() &&
      effectiveDate.getMonth() === d.getMonth() &&
      effectiveDate.getDate() === d.getDate()
    );
  };

  return (
    <div className="bg-gradient-to-r from-[#070a14] via-[#0d1222] to-[#070a14] border-b-2 border-[#1c243c] p-3 sm:p-4 text-slate-200">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Top Header Row: Dual Clocks & Dates */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left: Real-Time Machine Wall Clock & Calendar Date */}
          <div className="flex items-center gap-3.5 w-full lg:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-2xl shadow-comic-sm border-2 border-black shrink-0">
              <Clock className="w-6 h-6 text-slate-950" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30 flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Live Clock ({timeZoneName})
                </span>
                {simulatedDate && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40 animate-pulse">
                    ⚡ SIMULATED TIMELINE ACTIVE
                  </span>
                )}
              </div>

              {/* Full Date Display */}
              <div className="text-sm sm:text-base font-extrabold text-white tracking-wide truncate">
                {formatDateStr(effectiveDate)}
              </div>

              {/* Digital Clock Display */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-xl sm:text-2xl font-black text-amber-300 tracking-wider">
                  {formatTimeStr(effectiveDate)}
                </span>
                <button
                  onClick={() => setUse24Hour((prev) => !prev)}
                  className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#151c33] hover:bg-[#1f294a] text-slate-400 hover:text-white border border-[#232f54]"
                  title="Toggle 12h/24h format"
                >
                  {use24Hour ? '24H' : '12H'}
                </button>
              </div>
            </div>
          </div>

          {/* Center: Live Timers Matrix (Launch Countdown, 5 AM POTD, Midnight Limit) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full lg:w-auto font-mono text-xs">
            {/* Launch / Cohort Day Countdown */}
            <div className="p-2.5 rounded-xl bg-[#11172a] border border-[#1e2a4a] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 text-amber-400 font-bold font-sans">
                  <Rocket className="w-3 h-3" /> Day 1 Launch:
                </span>
                <span>Nov 6, 5 AM</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className={`text-base font-black ${isLaunched ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {isLaunched ? '🚀 LAUNCHED!' : formatDelta(msUntilLaunch)}
                </span>
                <span className="text-[9px] text-slate-400 font-sans">
                  {isLaunched ? 'Cohort Day 1' : 'Remaining'}
                </span>
              </div>
            </div>

            {/* 5:00 AM POTD Countdown */}
            <div className="p-2.5 rounded-xl bg-[#11172a] border border-[#1e2a4a] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 text-sky-400 font-bold font-sans">
                  <Zap className="w-3 h-3" /> Next 5 AM POTD:
                </span>
                <span>{scheduleState.isPotdUnlocked ? 'UNLOCKED' : 'SEALED'}</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-base font-black text-sky-300">
                  {engineState.potdCountdown.formatted}
                </span>
                <span className="text-[9px] text-slate-400 font-sans">
                  {scheduleState.isPotdUnlocked ? 'Vault Open' : 'Until Unlock'}
                </span>
              </div>
            </div>

            {/* Midnight Homework Deadline */}
            <div className="p-2.5 rounded-xl bg-[#11172a] border border-[#1e2a4a] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 text-rose-400 font-bold font-sans">
                  <Flame className="w-3 h-3" /> Midnight Deadline:
                </span>
                <span>23:59:59</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-base font-black text-rose-300">
                  {engineState.midnightCountdown.formatted}
                </span>
                <span className="text-[9px] text-slate-400 font-sans">
                  HW Quota: {scheduleState.homeworkQuota}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
            {simulatedDate && (
              <button
                onClick={() => {
                  setSimulatedDate(null);
                  sound.playPop();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition cursor-pointer"
                title="Sync back to your real machine clock"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Sync to Real Clock</span>
              </button>
            )}

            <button
              onClick={() => {
                setSimulatedDate(new Date(2026, 10, 6, 5, 0, 0));
                sound.playSuccess();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs border border-slate-900 shadow-comic-sm transition cursor-pointer"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Tomorrow (Day 1)</span>
            </button>
          </div>
        </div>

        {/* Bottom Strip: Interactive 7-Day Cohort Timeline Matrix */}
        <div className="pt-2 border-t border-[#172036]">
          <div className="flex items-center justify-between mb-1.5 text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Cohort Timeline &amp; Dates: Click any day to simulate &amp; view problemsets
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              Selected: {formatShortDate(effectiveDate)}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {cohortDays.map((item) => {
              const active = isCurrentActiveDay(item.date);
              return (
                <button
                  key={item.day}
                  onClick={() => {
                    setSimulatedDate(item.date);
                    sound.playPop();
                  }}
                  className={`p-2 rounded-xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                    active
                      ? 'bg-amber-400 text-slate-950 border-slate-950 shadow-comic-sm font-bold scale-[1.02]'
                      : 'bg-[#0f1424] hover:bg-[#171f36] text-slate-300 border-[#1c243c]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className={`font-mono font-bold ${active ? 'text-slate-950' : 'text-amber-400'}`}>
                      Day {item.day}
                    </span>
                    {item.isWeekend && (
                      <span
                        className={`text-[9px] px-1 rounded font-bold uppercase ${
                          active ? 'bg-slate-900 text-amber-300' : 'bg-orange-500/20 text-orange-300'
                        }`}
                      >
                        +2 HW
                      </span>
                    )}
                    {item.isLaunch && (
                      <span
                        className={`text-[9px] px-1 rounded font-bold uppercase ${
                          active ? 'bg-slate-900 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        Launch
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-black truncate mt-1">{item.label}</div>
                  <div
                    className={`text-[10px] truncate mt-0.5 ${
                      active ? 'text-slate-800 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {item.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
