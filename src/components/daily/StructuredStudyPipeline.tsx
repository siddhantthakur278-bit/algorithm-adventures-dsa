import React from 'react';
import { useCourse } from '../../context/CourseContext';
import {
  BookOpen,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  Flame,
  GitCommit,
  Bug,
  ShieldCheck,
  ChevronRight,
  Play,
  Award,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

export const StructuredStudyPipeline: React.FC = () => {
  const {
    stats,
    scheduleState,
    dailyTargetStatus,
    setActiveTab,
    loadProblemInIDE,
    githubConfig,
  } = useCourse();

  const isPotdSolved = stats.solvedProblemIds.includes(scheduleState.potdProblem.id);
  const isHomeworkDone = dailyTargetStatus.isHomeworkComplete;
  const isTheoryReviewed = stats.completedSubtopics.length > 0;
  const hasCombat = stats.bugHuntDefeated.length > 0;
  const hasGitCommit = stats.gitCommits.length > 0;

  const steps = [
    {
      id: 'step-1',
      number: 1,
      title: 'Concept & Invariants',
      subtitle: 'Read Theory & Experiment',
      icon: BookOpen,
      time: '20 min',
      isCompleted: isTheoryReviewed,
      isActive: !isTheoryReviewed,
      action: () => {
        sound.playPop();
        setActiveTab('theory');
      },
    },
    {
      id: 'step-2',
      number: 2,
      title: '5:00 AM POTD Vault',
      subtitle: scheduleState.potdProblem.title,
      icon: Zap,
      time: '25 min',
      isCompleted: isPotdSolved,
      isActive: isTheoryReviewed && !isPotdSolved,
      action: () => {
        sound.playPop();
        loadProblemInIDE(scheduleState.potdProblem);
      },
    },
    {
      id: 'step-3',
      number: 3,
      title: 'Sequential Homework',
      subtitle: `${dailyTargetStatus.solvedHomeworkCount} / ${dailyTargetStatus.homeworkQuota} Solved`,
      icon: Clock,
      time: '30 min',
      isCompleted: isHomeworkDone,
      isActive: isPotdSolved && !isHomeworkDone,
      action: () => {
        sound.playPop();
        // find first unsolved homework problem in order
        const firstUnsolved = scheduleState.homeworkProblems.find(
          (hw) => !stats.solvedProblemIds.includes(hw.id)
        );
        if (firstUnsolved) loadProblemInIDE(firstUnsolved);
      },
    },
    {
      id: 'step-4',
      number: 4,
      title: 'Combat & Bug Hunt',
      subtitle: `${stats.bugHuntDefeated.length}/5 Exterminated`,
      icon: Bug,
      time: '15 min',
      isCompleted: hasCombat,
      isActive: isHomeworkDone && !hasCombat,
      action: () => {
        sound.playPop();
        setActiveTab('bughunt');
      },
    },
    {
      id: 'step-5',
      number: 5,
      title: 'GitHub Commit Sync',
      subtitle: githubConfig.owner ? `${githubConfig.owner} Synced` : 'Verified on Git',
      icon: GitCommit,
      time: 'Instant',
      isCompleted: hasGitCommit,
      isActive: hasCombat && !hasGitCommit,
      action: () => {
        sound.playPop();
        setActiveTab('profile');
      },
    },
  ];

  const completedCount = steps.filter((s) => s.isCompleted).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#0d1222] via-[#141b34] to-[#0d1222] border-3 border-black shadow-comic space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#1d2744]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider border border-black shadow-comic-sm">
              Standardized Pipeline
            </span>
            <span className="text-xs text-amber-300 font-bold">5-Stage Daily Study Progression</span>
          </div>
          <h3 className="font-bangers text-2xl text-white tracking-wide">
            DEFINITIVE DAILY STUDY ROADMAP (TODAY'S RHYTHM)
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right font-mono text-xs">
            <span className="text-slate-400 block text-[10px]">Study Completion</span>
            <span className="text-amber-400 font-black text-sm">
              {completedCount} / {steps.length} Stages ({progressPercent}%)
            </span>
          </div>
          <div className="w-16 bg-[#080d19] h-3 rounded-full overflow-hidden border border-[#1b233a]">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stepper Pipeline Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <button
              key={step.id}
              onClick={step.action}
              className={`p-3.5 rounded-2xl text-left transition-all border-2 flex flex-col justify-between cursor-pointer group ${
                step.isCompleted
                  ? 'bg-[#0a1a14] border-emerald-500/50 hover:border-emerald-400'
                  : step.isActive
                  ? 'bg-[#182038] border-amber-400 shadow-comic-yellow ring-1 ring-amber-400 -translate-y-0.5'
                  : 'bg-[#0a0e1c] border-[#1a233c] hover:border-slate-600 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center font-mono ${
                    step.isCompleted
                      ? 'bg-emerald-500 text-black'
                      : step.isActive
                      ? 'bg-amber-400 text-slate-950 animate-pulse'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {step.isCompleted ? '✓' : step.number}
                </span>

                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {step.time}
                </span>
              </div>

              <div className="my-2 space-y-0.5 min-w-0">
                <div className="flex items-center gap-1.5">
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 ${
                      step.isCompleted
                        ? 'text-emerald-400'
                        : step.isActive
                        ? 'text-amber-400'
                        : 'text-slate-400'
                    }`}
                  />
                  <span className="text-xs font-black text-white truncate">{step.title}</span>
                </div>
                <p className="text-[10px] text-slate-300 truncate font-sans">{step.subtitle}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-bold">
                <span
                  className={
                    step.isCompleted
                      ? 'text-emerald-400 font-mono'
                      : step.isActive
                      ? 'text-amber-400 font-mono'
                      : 'text-slate-500 font-mono'
                  }
                >
                  {step.isCompleted ? 'COMPLETED' : step.isActive ? '▶ IN PROGRESS' : 'PENDING'}
                </span>

                <span className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform">
                  &rarr;
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
