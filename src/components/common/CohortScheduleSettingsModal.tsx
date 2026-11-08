import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  Rocket,
  Lock,
  Unlock,
  CheckCircle2,
  Sliders,
  ChevronRight,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { useCourse } from '../../context/CourseContext';
import { sound } from '../../utils/soundEffects';

interface CohortScheduleSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CohortScheduleSettingsModal: React.FC<CohortScheduleSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    cohortConfig,
    updateCohortConfig,
    resetCohortToToday,
    setManualCohortDay,
    scheduleState,
  } = useCourse();

  const [selectedMode, setSelectedMode] = useState<'automatic' | 'manual_day' | 'self_paced'>(
    cohortConfig.mode
  );
  const [customDate, setCustomDate] = useState<string>(() => {
    try {
      return new Date(cohortConfig.startDate).toISOString().split('T')[0];
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  });
  const [selectedDayNum, setSelectedDayNum] = useState<number>(cohortConfig.manualDayNumber || 1);
  const [unlockedAll, setUnlockedAll] = useState<boolean>(cohortConfig.isUnlockedAll || false);
  const [savedFeedback, setSavedFeedback] = useState<string>('');

  if (!isOpen) return null;

  const handleStartToday = () => {
    resetCohortToToday();
    setSelectedMode('automatic');
    setCustomDate(new Date().toISOString().split('T')[0]);
    setSelectedDayNum(1);
    setUnlockedAll(false);
    setSavedFeedback('🚀 Cohort reset: Day 1 begins TODAY!');
    setTimeout(() => {
      setSavedFeedback('');
      onClose();
    }, 1200);
  };

  const handleApplySettings = () => {
    sound.playSuccess();
    const newStartDate = new Date(`${customDate}T05:00:00`);

    updateCohortConfig({
      mode: selectedMode,
      startDate: newStartDate.toISOString(),
      manualDayNumber: selectedDayNum,
      isUnlockedAll: unlockedAll,
    });

    setSavedFeedback('✓ Schedule preferences saved successfully!');
    setTimeout(() => {
      setSavedFeedback('');
      onClose();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn font-sans"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#090d18] border-3 border-black rounded-3xl shadow-comic-lg p-6 space-y-6 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider border border-black shadow-comic-sm">
                Self-Governed Timeline
              </span>
              <span className="text-xs text-amber-300 font-bold font-mono">
                Currently: Day {scheduleState.dayNumber}
              </span>
            </div>
            <h2 className="font-bangers text-2xl sm:text-3xl text-white tracking-wide">
              COHORT SCHEDULE &amp; PACING CONTROLLER
            </h2>
            <p className="text-xs text-slate-400">
              You are never bound to fixed calendar dates. Start whenever you want or set your own custom pace!
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#141b2e] hover:bg-[#1f2844] text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer border border-slate-700"
          >
            ✕
          </button>
        </div>

        {/* Option 1: Start My Journey Today (1-Click) */}
        <div className="p-4 rounded-2xl bg-[#0e1424] border-2 border-amber-400/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4 text-amber-400" />
              <h4 className="font-bangers text-base text-white tracking-wide">
                START MY JOURNEY TODAY
              </h4>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Sets Day 1 to today's date. Your 5:00 AM POTD and sequential homework unlock starting now!
            </p>
          </div>

          <button
            onClick={handleStartToday}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs border border-black shadow-comic-sm shrink-0 cursor-pointer transition transform hover:scale-105"
          >
            🚀 Set Day 1 to Today
          </button>
        </div>

        {/* Pacing Modes Radio Grid */}
        <div className="space-y-3">
          <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
            Choose Your Pacing Mode:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Mode 1: Automatic from Date */}
            <button
              onClick={() => {
                setSelectedMode('automatic');
                sound.playPop();
              }}
              className={`p-3 rounded-2xl border-2 text-left transition cursor-pointer flex flex-col justify-between ${
                selectedMode === 'automatic'
                  ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-comic-sm'
                  : 'bg-[#0f1424] border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="font-bangers text-sm flex items-center justify-between text-cyan-300">
                <span>🗓️ Automatic Daily</span>
                {selectedMode === 'automatic' && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Advances +1 day automatically every midnight from your start date.
              </span>
            </button>

            {/* Mode 2: Manual Day Selection */}
            <button
              onClick={() => {
                setSelectedMode('manual_day');
                sound.playPop();
              }}
              className={`p-3 rounded-2xl border-2 text-left transition cursor-pointer flex flex-col justify-between ${
                selectedMode === 'manual_day'
                  ? 'bg-purple-950/40 border-purple-400 text-white shadow-comic-sm'
                  : 'bg-[#0f1424] border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="font-bangers text-sm flex items-center justify-between text-purple-300">
                <span>⏩ Manual Day Pick</span>
                {selectedMode === 'manual_day' && <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                You decide your active day number manually (Day 1, 2, 3... 30).
              </span>
            </button>

            {/* Mode 3: Self-Paced Free Study */}
            <button
              onClick={() => {
                setSelectedMode('self_paced');
                setUnlockedAll(true);
                sound.playPop();
              }}
              className={`p-3 rounded-2xl border-2 text-left transition cursor-pointer flex flex-col justify-between ${
                selectedMode === 'self_paced' || unlockedAll
                  ? 'bg-emerald-950/40 border-emerald-400 text-white shadow-comic-sm'
                  : 'bg-[#0f1424] border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="font-bangers text-sm flex items-center justify-between text-emerald-300">
                <span>🔓 Self-Paced (Free)</span>
                {(selectedMode === 'self_paced' || unlockedAll) && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Unlock all POTDs and homeworks immediately with zero time wait!
              </span>
            </button>
          </div>
        </div>

        {/* Sub-Controls: Custom Start Date or Manual Day Picker */}
        {selectedMode === 'automatic' && (
          <div className="p-4 rounded-2xl bg-[#04060c] border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 font-mono">
                📅 Choose Cohort Start Date (Day 1):
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Unlocks at 05:00 AM</span>
            </div>
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#0c101d] border border-slate-700 text-white font-mono text-xs focus:border-cyan-400 outline-none cursor-pointer"
            />
          </div>
        )}

        {selectedMode === 'manual_day' && (
          <div className="p-4 rounded-2xl bg-[#04060c] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 font-mono">
                ⏩ Choose Your Active Cohort Day:
              </span>
              <span className="text-xs font-black text-purple-300 font-mono">
                Day {selectedDayNum} Selected
              </span>
            </div>

            {/* Quick Day Chips */}
            <div className="flex flex-wrap gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 21, 30].map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setSelectedDayNum(d);
                    sound.playPop();
                  }}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition cursor-pointer ${
                    selectedDayNum === d
                      ? 'bg-purple-500 text-white border-black shadow-comic-sm font-black'
                      : 'bg-[#101424] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Day {d}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Unlock All Challenges Switch */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#070b16] border border-slate-800">
          <div className="flex items-center gap-2.5">
            {unlockedAll ? (
              <Unlock className="w-4 h-4 text-emerald-400" />
            ) : (
              <Lock className="w-4 h-4 text-slate-500" />
            )}
            <div>
              <span className="text-xs font-bold text-white block">
                Instant Unlock Override (Skip 5 AM Vault Lock)
              </span>
              <span className="text-[10px] text-slate-400">
                Lets you view and solve all daily challenges without waiting for morning unlocks
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setUnlockedAll(!unlockedAll);
              sound.playPop();
            }}
            className={`w-12 h-6 rounded-full transition p-1 cursor-pointer border ${
              unlockedAll ? 'bg-emerald-500 border-emerald-400' : 'bg-slate-800 border-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                unlockedAll ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Feedback message */}
        {savedFeedback && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold text-xs text-center animate-fadeIn">
            {savedFeedback}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <button
            onClick={handleStartToday}
            className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-mono font-bold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset to Today
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#141b2e] hover:bg-[#1e2640] text-slate-300 text-xs font-bold border border-slate-700 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleApplySettings}
              className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs border border-black shadow-comic-sm cursor-pointer transition transform hover:scale-105"
            >
              Save Schedule Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
