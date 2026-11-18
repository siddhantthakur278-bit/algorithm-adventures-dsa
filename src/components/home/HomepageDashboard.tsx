import React, { useState, useEffect, useMemo } from 'react';
import { useCourse } from '../../context/CourseContext';
import {
  Sparkles,
  Target,
  Flame,
  Shield,
  Clock,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Play,
  Code2,
  BookOpen,
  Video,
  Award,
  Zap,
  ChevronRight,
  TrendingUp,
  Sliders,
  Check,
  Search,
  ExternalLink,
  Layers,
  BarChart3,
  ListTodo,
  Rocket,
  CheckCircle,
  ArrowRight,
  Filter,
  RefreshCw,
  Trophy,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  STRIVERS_A2Z_STEPS,
  STRIVERS_A2Z_QUESTIONS,
  getA2ZDifficultyStats,
} from '../../data/striversA2ZData';
import { CODER_ARMY_MODULES, CODER_ARMY_LECTURES } from '../../data/coderArmyData';
import { OTHER_ACADEMIC_SUBJECTS } from '../../data/otherSubjectsData';
import { hallOfFameProblems } from '../../data/hallOfFameData';

export interface CustomTodoTask {
  id: string;
  title: string;
  category: 'DSA' | 'Striver Sheet' | 'Theory' | 'Lecture' | 'Revision' | 'Interview' | 'Project' | 'General';
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  createdAt: number;
  completed: boolean;
  completedAt?: number;
  autoDetected?: boolean;
  autoDetectionReason?: string;
  targetLink?: {
    tab: string;
    label: string;
    param?: string;
  };
}

const STORAGE_KEY_TODOS = 'ada_user_custom_todos';
const STORAGE_KEY_STRIVER_SOLVED = 'ada_strivers_a2z_solved';
const STORAGE_KEY_LECTURES_COMPLETED = 'ada_coder_army_completed_lectures';

export const HomepageDashboard: React.FC = () => {
  const {
    stats,
    setActiveTab,
    setActiveSaga,
    scheduleState,
    dailyTargetStatus,
    realStreak,
    loadProblemInIDE,
    triggerBurst,
  } = useCourse();

  // 1. Striver Solved IDs State
  const [striverSolvedIds, setStriverSolvedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STRIVER_SOLVED);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // 2. Completed Coder Army Lectures State
  const [completedLectureIds, setCompletedLectureIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LECTURES_COMPLETED);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Sync with localStorage on window events
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const sSolved = localStorage.getItem(STORAGE_KEY_STRIVER_SOLVED);
        if (sSolved) setStriverSolvedIds(new Set(JSON.parse(sSolved)));

        const sLec = localStorage.getItem(STORAGE_KEY_LECTURES_COMPLETED);
        if (sLec) setCompletedLectureIds(new Set(JSON.parse(sLec)));
      } catch {}
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 3. To-Do Tasks State
  const [tasks, setTasks] = useState<CustomTodoTask[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TODOS);
      if (saved) return JSON.parse(saved);
    } catch {}
    // Initial Seed Tasks
    return [
      {
        id: 'seed-1',
        title: 'Solve Two Sum (Striver #1)',
        category: 'Striver Sheet',
        priority: 'High',
        createdAt: Date.now() - 3600000,
        completed: false,
      },
      {
        id: 'seed-2',
        title: 'Watch Lecture 1: Flowcharts & Variables (Coder Army)',
        category: 'Lecture',
        priority: 'Medium',
        createdAt: Date.now() - 7200000,
        completed: false,
      },
      {
        id: 'seed-3',
        title: 'Climbing Stairs (1D DP)',
        category: 'DSA',
        priority: 'High',
        createdAt: Date.now() - 10800000,
        completed: false,
      },
      {
        id: 'seed-4',
        title: 'Complete Step 1 Basics in Striver Sheet',
        category: 'Striver Sheet',
        priority: 'Medium',
        createdAt: Date.now() - 14400000,
        completed: false,
      },
    ];
  });

  // New Task Form State
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<CustomTodoTask['category']>('DSA');
  const [newTaskPriority, setNewTaskPriority] = useState<CustomTodoTask['priority']>('High');
  const [todoFilter, setTodoFilter] = useState<'all' | 'pending' | 'auto' | 'completed'>('all');

  // Save tasks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  // Intelligent Automatic Task Completion Evaluator
  const evaluatedTasks = useMemo(() => {
    return tasks.map((task) => {
      const norm = task.title.toLowerCase().trim();

      // If user already manually checked it and it wasn't auto-detected, keep completed
      let autoCompleted = false;
      let reason = '';
      let targetLink: CustomTodoTask['targetLink'] | undefined = undefined;

      // 1. Check POTD
      if (norm.includes('potd') || norm.includes('problem of the day')) {
        const isPotdSolved = stats.solvedProblemIds.includes(scheduleState.potdProblem.id);
        if (isPotdSolved) {
          autoCompleted = true;
          reason = `Daily POTD "${scheduleState.potdProblem.title}" Solved!`;
        } else {
          reason = `Today's Target: ${scheduleState.potdProblem.title}`;
          targetLink = { tab: 'quest', label: 'Solve Daily POTD' };
        }
      }

      // 2. Check Striver Questions (by Title, Number, or Slug)
      if (!autoCompleted) {
        for (const q of STRIVERS_A2Z_QUESTIONS) {
          const qTitle = q.title.toLowerCase();
          const qNumStr = `#${q.questionNumber}`;
          const qStrId = `str-${q.questionNumber}`;
          const qSlug = q.slug.toLowerCase().replace(/-/g, ' ');

          if (
            norm.includes(qTitle) ||
            norm.includes(qNumStr) ||
            norm.includes(qStrId) ||
            (norm.length > 5 && qTitle.includes(norm))
          ) {
            const isSolved = striverSolvedIds.has(q.id);
            if (isSolved) {
              autoCompleted = true;
              reason = `Solved on Striver A2Z Sheet (#${q.questionNumber}: ${q.title})`;
            } else {
              reason = `Unsolved in Step ${q.stepNumber}: ${q.title}`;
              targetLink = { tab: 'strivers-sheet', label: 'Solve in Striver Sheet', param: q.id };
            }
            break;
          }
        }
      }

      // 3. Check Coder Army Lectures (by Lecture Number, Lxx, or Title)
      if (!autoCompleted) {
        for (const lec of CODER_ARMY_LECTURES) {
          const lNum = `l${lec.lectureNumber}`;
          const lecNum = `lecture ${lec.lectureNumber}`;
          const lecTitle = lec.title.toLowerCase();

          if (
            norm.includes(lNum) ||
            norm.includes(lecNum) ||
            (lecTitle.length > 6 && norm.includes(lecTitle))
          ) {
            const isWatched = completedLectureIds.has(lec.id);
            if (isWatched) {
              autoCompleted = true;
              reason = `Lecture ${lec.lectureNumber} Watched in Studio`;
            } else {
              reason = `Lecture ${lec.lectureNumber} Pending in Studio`;
              targetLink = { tab: 'lecture-studio', label: 'Watch in Studio', param: lec.id };
            }
            break;
          }
        }
      }

      // 4. Check Problem Library Hall of Fame Problems
      if (!autoCompleted) {
        for (const p of hallOfFameProblems) {
          const pTitle = p.title.toLowerCase();
          if (norm.includes(pTitle) || (norm.length > 5 && pTitle.includes(norm))) {
            const isSolved = stats.solvedProblemIds.includes(p.id);
            if (isSolved) {
              autoCompleted = true;
              reason = `Solved in Practice Arena: ${p.title}`;
            } else {
              reason = `Unsolved: ${p.title}`;
              targetLink = { tab: 'ide', label: 'Solve in IDE', param: p.id };
            }
            break;
          }
        }
      }

      // 5. Check Step Mastery (e.g. "Complete Step 1" or "Step 16")
      if (!autoCompleted) {
        const stepMatch = norm.match(/step\s*(\d+)/i);
        if (stepMatch) {
          const stepNum = parseInt(stepMatch[1], 10);
          const stepQs = STRIVERS_A2Z_QUESTIONS.filter((q) => q.stepNumber === stepNum);
          if (stepQs.length > 0) {
            const solvedCount = stepQs.filter((q) => striverSolvedIds.has(q.id)).length;
            const isAllSolved = solvedCount === stepQs.length && stepQs.length > 0;
            if (isAllSolved) {
              autoCompleted = true;
              reason = `100% Complete: All ${stepQs.length} Questions in Step ${stepNum} Solved!`;
            } else {
              reason = `${solvedCount} / ${stepQs.length} Solved in Step ${stepNum}`;
              targetLink = { tab: 'strivers-sheet', label: `Open Step ${stepNum}` };
            }
          }
        }
      }

      // 6. Check Calculus Challenges
      if (!autoCompleted && (norm.includes('calculus') || norm.includes('derivative') || norm.includes('integral') || norm.includes('riemann') || norm.includes('limit'))) {
        try {
          const calcSolved = new Set(JSON.parse(localStorage.getItem('ada_calculus_solved_questions') || '[]'));
          if (calcSolved.size > 0) {
            autoCompleted = true;
            reason = `Calculus Solved: ${calcSolved.size} practice challenges solved!`;
            targetLink = { tab: 'calculus', label: 'Open Calculus Hub' };
          }
        } catch {}
      }

      // 7. Check Auth / Verification
      if (!autoCompleted && (norm.includes('auth') || norm.includes('jwt') || norm.includes('otp') || norm.includes('google') || norm.includes('phone') || norm.includes('email verification'))) {
        try {
          const session = JSON.parse(localStorage.getItem('ada_auth_session_v2') || 'null');
          if (session && (session.user.isEmailVerified || session.user.isPhoneVerified)) {
            autoCompleted = true;
            reason = `Verified: Signed in with ${session.user.provider.toUpperCase()} (JWT Active)!`;
            targetLink = { tab: 'auth-modal', label: 'View JWT Security' };
          }
        } catch {}
      }

      const isEffectivelyCompleted = task.completed || autoCompleted;

      return {
        ...task,
        completed: isEffectivelyCompleted,
        autoDetected: autoCompleted,
        autoDetectionReason: reason,
        targetLink: targetLink || task.targetLink,
      };
    });
  }, [tasks, striverSolvedIds, completedLectureIds, stats.solvedProblemIds, scheduleState.potdProblem]);

  // Handle Add Task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    sound.playPop();
    const newTask: CustomTodoTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      priority: newTaskPriority,
      createdAt: Date.now(),
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setNewTaskTitle('');
    triggerBurst('✨ Task Added!', 'To-Do item added and evaluated.', 'star');
  };

  // Toggle Task Completion
  const toggleTask = (taskId: string) => {
    sound.playPop();
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextState = !t.completed;
          if (nextState) {
            sound.playSuccess();
          }
          return {
            ...t,
            completed: nextState,
            completedAt: nextState ? Date.now() : undefined,
          };
        }
        return t;
      })
    );
  };

  // Delete Task
  const deleteTask = (taskId: string) => {
    sound.playPop();
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Clear Completed
  const clearCompletedTasks = () => {
    sound.playPop();
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  // Quick preset adder
  const addPresetTask = (title: string, category: CustomTodoTask['category'], priority: CustomTodoTask['priority']) => {
    sound.playPop();
    const newTask: CustomTodoTask = {
      id: `task-${Date.now()}`,
      title,
      category,
      priority,
      createdAt: Date.now(),
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    triggerBurst('⚡ Quick Task Added!', title, 'zap');
  };

  // --- STATS CALCULATIONS ---
  const totalStriverCount = STRIVERS_A2Z_QUESTIONS.length; // 346
  const solvedStriverCount = striverSolvedIds.size;
  const striverPercent = ((solvedStriverCount / totalStriverCount) * 100).toFixed(1);

  const totalLecturesCount = CODER_ARMY_LECTURES.length; // 78
  const watchedLecturesCount = completedLectureIds.size;
  const lecturePercent = ((watchedLecturesCount / totalLecturesCount) * 100).toFixed(1);

  const streakMultiplier = realStreak.currentStreak >= 30 ? 3 : realStreak.currentStreak >= 7 ? 2 : realStreak.currentStreak >= 3 ? 1.5 : 1;

  const isPotdDone = stats.solvedProblemIds.includes(scheduleState.potdProblem.id);

  // Daily Tasks Calculation (4 core daily quests)
  const dailyTasks = [
    {
      id: 'daily-potd',
      title: `Solve Daily POTD: ${scheduleState.potdProblem.title}`,
      subtitle: `${scheduleState.potdProblem.difficulty} • +150 XP`,
      done: isPotdDone,
      badge: scheduleState.potdProblem.difficulty,
      actionLabel: isPotdDone ? 'Completed' : 'Solve in IDE',
      onAction: () => {
        loadProblemInIDE(scheduleState.potdProblem);
        setActiveTab('ide');
      },
    },
    {
      id: 'daily-striver',
      title: 'Striver A2Z Milestone Goal',
      subtitle: `${solvedStriverCount} / ${totalStriverCount} Questions Completed (${striverPercent}%)`,
      done: solvedStriverCount >= 2,
      badge: 'Curriculum',
      actionLabel: 'Open Sheet',
      onAction: () => setActiveTab('strivers-sheet'),
    },
    {
      id: 'daily-lecture',
      title: 'Lecture Studio Masterclass',
      subtitle: `${watchedLecturesCount} / ${totalLecturesCount} Coder Army Lectures Watched (${lecturePercent}%)`,
      done: watchedLecturesCount >= 1,
      badge: 'Studio',
      actionLabel: 'Watch in Studio',
      onAction: () => setActiveTab('lecture-studio'),
    },
    {
      id: 'daily-agility',
      title: 'Coding Agility: Speed Blitz / Bug Hunt',
      subtitle: `High Score: ${stats.blitzHighScore} • ${stats.bugHuntDefeated.length} Bugs Smashed`,
      done: stats.bugHuntDefeated.length > 0 || stats.blitzHighScore > 0,
      badge: 'Challenge',
      actionLabel: 'Take Challenge',
      onAction: () => setActiveTab('blitz'),
    },
  ];

  const dailyTasksCompletedCount = dailyTasks.filter((t) => t.done).length;
  const dailyTasksProgressPercent = Math.round((dailyTasksCompletedCount / dailyTasks.length) * 100);

  // Filtered To-Do List
  const filteredTasks = evaluatedTasks.filter((task) => {
    if (todoFilter === 'pending') return !task.completed;
    if (todoFilter === 'auto') return task.autoDetected;
    if (todoFilter === 'completed') return task.completed;
    return true;
  });

  const completedTodosCount = evaluatedTasks.filter((t) => t.completed).length;
  const autoDetectedCount = evaluatedTasks.filter((t) => t.autoDetected).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. HERO & WELCOME BANNER                                                  */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1022] via-[#0f152d] to-[#151c3a] border border-white/10 shadow-2xl p-6 sm:p-8">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 font-mono text-xs font-bold border border-amber-400/30 flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Algorithm Adventures Command Center
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-[11px] font-semibold border border-emerald-500/30 flex items-center gap-1">
                <Flame className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                {realStreak.currentStreak} Day Streak ({streakMultiplier}x Multiplier)
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome to Your DSA Journey,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200">
                {stats.activeTitle || 'Code Architect'}
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Track your daily quest milestones, live curriculum coverage, performance stats, and your smart auto-verified to-do list in one centralized workspace.
            </p>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <button
              onClick={() => {
                sound.playPop();
                loadProblemInIDE(scheduleState.potdProblem);
                setActiveTab('ide');
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-comic-sm transition cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Solve Today&apos;s POTD</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                setActiveTab('strivers-sheet');
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/10 text-xs font-semibold transition cursor-pointer"
            >
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span>Striver A2Z Sheet</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                setActiveTab('lecture-studio');
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/10 text-xs font-semibold transition cursor-pointer"
            >
              <Video className="w-3.5 h-3.5 text-cyan-400" />
              <span>Studio Hub</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                setActiveTab('visualizer');
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 hover:text-white border border-purple-500/40 text-xs font-semibold transition cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>DP Visualizer</span>
            </button>
          </div>
        </div>

        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. STATS & ANALYTICS HUD                                                  */}
      {/* ========================================================================= */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-amber-400/15 text-amber-300 border border-amber-400/30">
              <BarChart3 className="w-4 h-4" />
            </span>
            <h2 className="font-bangers text-xl sm:text-2xl text-white tracking-wide">
              LIVE STATS &amp; PROGRESS MATRIX
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Real-Time Experience, Streaks &amp; Solves
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total XP & Level */}
          <div className="p-5 rounded-2xl bg-[#090d19] border border-white/10 space-y-3 relative overflow-hidden group hover:border-amber-400/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Total Experience</span>
              <span className="p-1.5 rounded-lg bg-amber-400/15 text-amber-300 border border-amber-400/30 text-xs font-bold font-mono">
                Lvl {stats.level}
              </span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {stats.xp.toLocaleString()}{' '}
                <span className="text-xs text-amber-400 font-sans">XP</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                {stats.activeTitle || 'Algorithm Novice'}
              </p>
            </div>
            {/* Progress to next level */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>Next Rank</span>
                <span>Level {stats.level + 1}</span>
              </div>
              <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (stats.xp % 1000) / 10)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Streak & Consistency */}
          <div className="p-5 rounded-2xl bg-[#090d19] border border-white/10 space-y-3 relative overflow-hidden group hover:border-emerald-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Streak &amp; Shields</span>
              <span className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono flex items-center gap-1">
                <Flame className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                {realStreak.currentStreak}d
              </span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-center gap-2">
                <span>{realStreak.currentStreak}</span>
                <span className="text-xs text-emerald-400 font-sans font-semibold">Days Active</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Best Record: <strong className="text-white">{stats.bestStreak} days</strong>
              </p>
            </div>
            <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-slate-400 border-t border-white/5">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-cyan-400" />
                {stats.shieldCount} Shields
              </span>
              <span className="text-amber-300 font-semibold">{streakMultiplier}x XP Boost</span>
            </div>
          </div>

          {/* Card 3: Solved Problems Breakdown */}
          <div className="p-5 rounded-2xl bg-[#090d19] border border-white/10 space-y-3 relative overflow-hidden group hover:border-purple-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Solved Problems</span>
              <span className="p-1.5 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold font-mono">
                {stats.solvedProblemIds.length + solvedStriverCount} Total
              </span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {solvedStriverCount}
                <span className="text-xs text-slate-400 font-normal"> / {totalStriverCount}</span>
              </div>
              <p className="text-[11px] text-purple-300 font-mono mt-0.5">
                Striver A2Z Sheet ({striverPercent}%)
              </p>
            </div>
            {/* Visual Difficulty Bars */}
            <div className="space-y-1">
              <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-emerald-400"
                  style={{ width: `${Math.min(100, (solvedStriverCount / totalStriverCount) * 100)}%` }}
                  title="Striver Solved"
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span className="text-emerald-400 font-bold">{solvedStriverCount} Solved</span>
                <span>{totalStriverCount - solvedStriverCount} Remaining</span>
              </div>
            </div>
          </div>

          {/* Card 4: Daily Target & Quests */}
          <div className="p-5 rounded-2xl bg-[#090d19] border border-white/10 space-y-3 relative overflow-hidden group hover:border-cyan-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Today&apos;s Target</span>
              <span
                className={`p-1.5 rounded-lg border text-xs font-bold font-mono ${
                  dailyTargetStatus.isTargetComplete
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                }`}
              >
                {dailyTargetStatus.isTargetComplete ? 'Completed' : 'In Progress'}
              </span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {dailyTasksCompletedCount}{' '}
                <span className="text-xs text-slate-400 font-normal">/ {dailyTasks.length} Done</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {dailyTargetStatus.isTargetComplete
                  ? 'All daily targets met! Streak locked in.'
                  : `${scheduleState.hoursRemainingToday}h remaining before 5:00 AM reset`}
              </p>
            </div>
            {/* Mini Progress Bar */}
            <div className="space-y-1">
              <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${dailyTasksProgressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>{dailyTasksProgressPercent}% of Daily Tasks</span>
                <span className="text-cyan-400 font-semibold">{dailyTasksCompletedCount}/4</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. TWO COLUMN GRID: TASKS PIPELINE (LEFT) & SMART TO-DO LIST (RIGHT)      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* LEFT COLUMN: DAILY QUEST TASKS */}
        <div className="bg-[#090d19] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                <Rocket className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bangers text-xl text-white tracking-wide">
                  TODAY&apos;S TASKS &amp; QUESTS
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {dailyTasksCompletedCount} of {dailyTasks.length} Quests Finished Today
                </p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
              {dailyTasksProgressPercent}% Done
            </span>
          </div>

          {/* Daily Task List */}
          <div className="space-y-3">
            {dailyTasks.map((task) => (
              <div
                key={task.id}
                className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
                  task.done
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0">
                    {task.done ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm truncate">
                        {task.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-white/[0.06] text-slate-400 border border-white/10 hidden sm:inline">
                        {task.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono truncate mt-0.5">
                      {task.subtitle}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playPop();
                    task.onAction();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 flex items-center gap-1 ${
                    task.done
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm'
                  }`}
                >
                  <span>{task.actionLabel}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Quick Motivational Tip from Professor */}
          <div className="p-3.5 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed font-mono flex items-start gap-2.5">
            <span className="text-base select-none">💡</span>
            <div>
              <strong className="text-amber-300 block mb-0.5">Daily Rhythm Advisory:</strong>
              Completing the 5:00 AM POTD and watching at least 1 module lecture protects your streak against time resets!
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SMART TO-DO LIST (WITH AUTO-DETECTION) */}
        <div className="bg-[#090d19] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/30">
                <ListTodo className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bangers text-xl text-white tracking-wide">
                  SMART TO-DO LIST
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Auto-detects solved DSA problems &amp; completed lectures
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                {completedTodosCount}/{evaluatedTasks.length} Done
              </span>
              {autoDetectedCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[11px] font-bold hidden sm:inline" title="Identified as solved in platform">
                  {autoDetectedCount} Auto-Detected
                </span>
              )}
            </div>
          </div>

          {/* Add Task Form */}
          <form onSubmit={handleAddTask} className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="e.g. Solve Two Sum, Watch DP Lecture 71, Revise Graphs..."
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono transition"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer shadow-sm flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </div>

            {/* Quick Category & Priority Selectors */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Tag:</span>
                {(['DSA', 'Striver Sheet', 'Lecture', 'Revision'] as CustomTodoTask['category'][]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setNewTaskCategory(cat)}
                    className={`px-2 py-0.5 rounded-lg border transition cursor-pointer ${
                      newTaskCategory === cat
                        ? 'bg-purple-600 text-white border-purple-400 font-bold'
                        : 'bg-white/[0.04] text-slate-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Priority:</span>
                {(['Urgent', 'High', 'Medium', 'Low'] as CustomTodoTask['priority'][]).map((pri) => (
                  <button
                    key={pri}
                    type="button"
                    onClick={() => setNewTaskPriority(pri)}
                    className={`px-2 py-0.5 rounded-lg border transition cursor-pointer ${
                      newTaskPriority === pri
                        ? pri === 'Urgent'
                          ? 'bg-rose-500 text-white border-rose-400 font-bold'
                          : pri === 'High'
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                          : 'bg-white/20 text-white border-white/40'
                        : 'bg-white/[0.04] text-slate-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {pri}
                  </button>
                ))}
              </div>
            </div>
          </form>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono border-t border-white/5">
            <span className="text-slate-400 text-[10px]">Quick Ideas:</span>
            <button
              onClick={() => addPresetTask(`Solve Daily POTD: ${scheduleState.potdProblem.title}`, 'DSA', 'High')}
              className="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-amber-300 border border-amber-400/20 transition cursor-pointer"
            >
              + Daily POTD
            </button>
            <button
              onClick={() => addPresetTask('Solve 3 Dynamic Programming Questions', 'Striver Sheet', 'High')}
              className="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-purple-300 border border-purple-500/20 transition cursor-pointer"
            >
              + 3 DP Questions
            </button>
            <button
              onClick={() => addPresetTask('Watch Lecture 71: DP Masterclass', 'Lecture', 'Medium')}
              className="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-cyan-300 border border-cyan-500/20 transition cursor-pointer"
            >
              + DP Lecture 71
            </button>
          </div>

          {/* Filter Bar & Clear Completed */}
          <div className="flex items-center justify-between text-xs font-mono pt-1">
            <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/10">
              {(['all', 'pending', 'auto', 'completed'] as const).map((filterKey) => (
                <button
                  key={filterKey}
                  onClick={() => setTodoFilter(filterKey)}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition cursor-pointer capitalize ${
                    todoFilter === filterKey
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {filterKey}
                </button>
              ))}
            </div>

            {completedTodosCount > 0 && (
              <button
                onClick={clearCompletedTasks}
                className="text-slate-400 hover:text-rose-400 text-[11px] font-mono transition cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear Done</span>
              </button>
            )}
          </div>

          {/* Task Items List */}
          <div className="space-y-2.5 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
            {filteredTasks.length === 0 ? (
              <div className="p-8 text-center space-y-2 rounded-2xl bg-white/[0.02] border border-white/5">
                <CheckCircle className="w-8 h-8 text-emerald-400/50 mx-auto" />
                <p className="text-xs text-slate-400 font-mono">
                  {todoFilter === 'all'
                    ? 'No to-do tasks added yet! Add your goals above.'
                    : `No tasks matching filter "${todoFilter}".`}
                </p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                    task.completed
                      ? 'bg-emerald-950/15 border-emerald-500/30'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                    <button
                      type="button"
                      onClick={() => toggleTask(task.id)}
                      className="mt-0.5 sm:mt-0 text-slate-500 hover:text-emerald-400 transition cursor-pointer shrink-0"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600" />
                      )}
                    </button>

                    <div className="min-w-0 space-y-0.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`text-xs font-semibold leading-tight ${
                            task.completed ? 'line-through text-slate-400' : 'text-slate-100'
                          }`}
                        >
                          {task.title}
                        </span>

                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {task.category}
                        </span>

                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                            task.priority === 'Urgent'
                              ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                              : task.priority === 'High'
                              ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                              : 'bg-white/[0.05] text-slate-400 border-white/10'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      {/* Auto-Detection Verification Pill */}
                      {task.autoDetectionReason && (
                        <div className="flex items-center gap-1.5 text-[10px] font-mono">
                          {task.autoDetected ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              <CheckCircle2 className="w-3 h-3" />
                              {task.autoDetectionReason}
                            </span>
                          ) : (
                            <span className="text-amber-300/90 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                              <Clock className="w-3 h-3" />
                              {task.autoDetectionReason}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Link & Delete Button */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {task.targetLink && !task.completed && (
                      <button
                        onClick={() => {
                          sound.playPop();
                          setActiveTab(task.targetLink!.tab);
                        }}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[10px] transition cursor-pointer shadow-sm"
                      >
                        <span>{task.targetLink.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-white/[0.05] transition cursor-pointer"
                      title="Delete Task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. CURRICULUM COVERAGE BREAKDOWN                                          */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              <Layers className="w-4 h-4" />
            </span>
            <div>
              <h2 className="font-bangers text-xl sm:text-2xl text-white tracking-wide">
                CURRICULUM COVERAGE BREAKDOWN
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                18 Striver Steps, 78 Coder Army Lectures &amp; 12 Academic Core Subjects
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-slate-400">
              Overall Striver Coverage:{' '}
              <strong className="text-amber-400">
                {solvedStriverCount} / {totalStriverCount} ({striverPercent}%)
              </strong>
            </span>
          </div>
        </div>

        {/* Step-by-Step Striver Sheet Grid (All 18 Steps) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {STRIVERS_A2Z_STEPS.map((step) => {
            const stepQuestions = STRIVERS_A2Z_QUESTIONS.filter((q) => q.stepNumber === step.stepNumber);
            const totalInStep = stepQuestions.length;
            const solvedInStep = stepQuestions.filter((q) => striverSolvedIds.has(q.id)).length;
            const stepPercent = totalInStep > 0 ? Math.round((solvedInStep / totalInStep) * 100) : 0;
            const isFinished = solvedInStep === totalInStep && totalInStep > 0;

            return (
              <div
                key={step.id}
                onClick={() => {
                  sound.playPop();
                  setActiveTab('strivers-sheet');
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer group space-y-2.5 ${
                  isFinished
                    ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400 shadow-sm'
                    : solvedInStep > 0
                    ? 'bg-[#0a0e1c] border-amber-500/30 hover:border-amber-400/60'
                    : 'bg-[#090d19] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base select-none">{step.icon}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.06] text-slate-300 font-bold border border-white/10">
                      Step {step.stepNumber}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] font-mono font-bold ${
                      isFinished
                        ? 'text-emerald-400'
                        : solvedInStep > 0
                        ? 'text-amber-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {stepPercent}%
                  </span>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition truncate">
                    {step.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {solvedInStep} / {totalInStep} Solved
                  </p>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isFinished
                        ? 'bg-emerald-400'
                        : solvedInStep > 0
                        ? 'bg-amber-400'
                        : 'bg-slate-700'
                    }`}
                    style={{ width: `${Math.max(solvedInStep > 0 ? 5 : 0, stepPercent)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
