import React, { useState, useEffect } from 'react';
import {
  Activity,
  Cpu,
  Wifi,
  Clock,
  Flame,
  GitCommit,
  Radio,
  ChevronDown,
  ChevronUp,
  Zap,
  Terminal,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { realTimeEngine, RealTimeEngineState, RealTimeTelemetryEvent } from '../../utils/realTimeEngine';
import { useCourse } from '../../context/CourseContext';
import { HumanAvatar } from './HumanAvatar';

export const RealTimeStatusBar: React.FC = () => {
  const { simulatedDate, scheduleState, githubConfig } = useCourse();
  const [engineState, setEngineState] = useState<RealTimeEngineState>(() =>
    realTimeEngine.getState(simulatedDate || undefined)
  );
  const [showEventDrawer, setShowEventDrawer] = useState<boolean>(false);
  const [activeEventIndex, setActiveEventIndex] = useState<number>(0);

  // Subscribe to real-time engine ticks
  useEffect(() => {
    const unsubscribe = realTimeEngine.subscribe((state) => {
      setEngineState(realTimeEngine.getState(simulatedDate || undefined));
    });
    return unsubscribe;
  }, [simulatedDate]);

  // Rotate active ticker event every 4.5 seconds
  useEffect(() => {
    if (engineState.recentEvents.length === 0) return;
    const interval = window.setInterval(() => {
      setActiveEventIndex((prev) => (prev + 1) % engineState.recentEvents.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [engineState.recentEvents.length]);

  const activeEvent: RealTimeTelemetryEvent | undefined =
    engineState.recentEvents[activeEventIndex] || engineState.recentEvents[0];

  const formatStopwatch = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  const getTagBadge = (tag: string) => {
    switch (tag) {
      case 'github':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'codeforces':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
      case 'bugsy':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'prisma':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'potd':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default:
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
    }
  };

  return (
    <aside aria-label="Live Telemetry Bar" className="bg-[#05070d] border-b border-[#1b2236] text-[11px] text-slate-300 select-none">
      <div className="max-w-7xl mx-auto px-3 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Engine Health, Ping & WebAssembly */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Wifi className="w-3 h-3 ml-0.5" />
            <span>REAL-TIME ENGINE</span>
            <span className="text-[10px] text-emerald-300/70 font-normal">({engineState.pingMs}ms)</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-slate-400 font-mono">
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-slate-300">CPython 3.12 (Wasm)</span>
            <span className="text-emerald-400 font-bold">● ONLINE</span>
          </div>

          {githubConfig.owner && (
            <div className="hidden lg:flex items-center gap-1 text-slate-400 font-mono">
              <GitCommit className="w-3 h-3 text-purple-400" />
              <span className="text-purple-300 font-medium truncate max-w-[140px]">{githubConfig.owner}</span>
              <span className="text-emerald-400 text-[10px]">✓ Sync Ready</span>
            </div>
          )}
        </div>

        {/* Center: Live Rolling Multiverse Telemetry Ticker */}
        {activeEvent && (
          <div
            onClick={() => setShowEventDrawer((prev) => !prev)}
            className="flex-1 max-w-xl mx-2 hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-[#0b0f1d] hover:bg-[#12192e] border border-[#1d2640] transition-colors cursor-pointer group"
            title="Click to view full Multiverse Telemetry feed"
          >
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
            <span className="text-slate-400 font-semibold shrink-0 text-[10px] uppercase tracking-wider">
              Multiverse Stream:
            </span>
            <span
              className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase border shrink-0 ${getTagBadge(
                activeEvent.tag
              )}`}
            >
              {activeEvent.tag}
            </span>
            <span className="text-slate-200 font-medium truncate">{activeEvent.action}:</span>
            <span className="text-slate-400 truncate">{activeEvent.detail}</span>
            <span className="ml-auto text-[10px] text-amber-400/80 shrink-0 group-hover:text-amber-300 flex items-center gap-0.5">
              Live Feed
              {showEventDrawer ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </span>
          </div>
        )}

        {/* Right: Live Timers (POTD Countdown, Midnight Limit, Coding Stopwatch) */}
        <div className="flex items-center gap-2.5 font-mono ml-auto">
          {/* Active Coding Stopwatch */}
          <div
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded border ${
              engineState.isCodingActive
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 animate-pulse'
                : 'bg-[#101424] border-[#1d233c] text-slate-400'
            }`}
            title="Active Coding Focus Time today (rewards focus XP!)"
          >
            <Zap className={`w-3 h-3 ${engineState.isCodingActive ? 'text-amber-400' : 'text-slate-500'}`} />
            <span className="font-semibold text-slate-300">Focus:</span>
            <span className="font-bold text-amber-300">{formatStopwatch(engineState.codingSecondsToday)}</span>
            {engineState.activeApm > 0 && (
              <span className="text-[10px] text-amber-400/80 hidden xl:inline">({engineState.activeApm} APM)</span>
            )}
          </div>

          {/* 5:00 AM POTD Countdown */}
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300"
            title="Next 05:00:00 AM Daily Morning Challenge Unlock"
          >
            <Clock className="w-3 h-3 text-sky-400" />
            <span className="text-slate-400 font-sans hidden sm:inline">5AM POTD:</span>
            <span className="font-bold font-mono text-sky-200">{engineState.potdCountdown.formatted}</span>
          </div>

          {/* Midnight Countdown */}
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300"
            title="Time remaining before midnight to submit daily homework quota"
          >
            <Flame className="w-3 h-3 text-rose-400" />
            <span className="text-slate-400 font-sans hidden sm:inline">Midnight:</span>
            <span className="font-bold font-mono text-rose-200">{engineState.midnightCountdown.formatted}</span>
          </div>
        </div>
      </div>

      {/* Expandable Telemetry Drawer */}
      {showEventDrawer && (
        <div className="border-t border-[#1b2236] bg-[#080b14] px-4 py-3 animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span className="font-black text-xs text-amber-300 uppercase tracking-wider font-mono">
                  Live Multiverse Peer Feed (Simulated Global Cohort)
                </span>
                <span className="text-slate-500 text-[10px]">• 1,420 students coding now</span>
              </div>
              <button
                onClick={() => setShowEventDrawer(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded hover:bg-slate-800"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {engineState.recentEvents.slice(0, 4).map((ev) => (
                <div
                  key={ev.id}
                  className="p-2.5 rounded-lg bg-[#0e1322] border border-[#1b2236] hover:border-amber-500/40 transition-colors flex items-start gap-2.5"
                >
                  <HumanAvatar seed={ev.user} name={ev.user} size="xs" showStatus={true} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-slate-200 truncate">{ev.user}</span>
                      <span
                        className={`text-[9px] px-1 py-0.2 rounded font-bold uppercase border ${getTagBadge(ev.tag)}`}
                      >
                        {ev.tag}
                      </span>
                    </div>
                    <p className="text-amber-400/90 font-medium text-[10px] mt-0.5">{ev.action}</p>
                    <p className="text-slate-400 text-[10px] leading-relaxed truncate mt-0.5">{ev.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
