import { Problem, DailyScheduleState } from '../types';

/**
 * Real Streak Engine
 * 
 * Rules:
 * Streaks ONLY count when the user:
 * 1. Logs in / is active on the date.
 * 2. Solves the scheduled 5:00 AM POTD quest for that date.
 * 3. Completes their assigned Dynamic Homework quota for that date.
 * 
 * When both requirements are met, that date is officially stamped
 * in `completedDailyTargetDates`. Consecutive completed days form the real streak!
 */

export interface DailyTargetStatus {
  dateKey: string;
  isPotdSolved: boolean;
  potdTitle: string;
  solvedHomeworkCount: number;
  homeworkQuota: number;
  isHomeworkComplete: boolean;
  isTargetComplete: boolean;
  tasksCompleted: number;
  totalTasks: number;
  progressPercent: number;
  statusMessage: string;
}

export interface RealStreakCalculation {
  currentStreak: number;
  bestStreak: number;
  isTodayCompleted: boolean;
  isYesterdayCompleted: boolean;
  isStreakAtRisk: boolean;
  streakSecuredToday: boolean;
  completedTargetDates: string[];
}

/**
 * Formats a Date object to YYYY-MM-DD using local time
 */
export function getDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Returns the YYYY-MM-DD for the day prior to given date
 */
export function getYesterdayKey(date: Date): string {
  const prev = new Date(date);
  prev.setDate(prev.getDate() - 1);
  return getDateKey(prev);
}

/**
 * Evaluates the real-time daily target completion for a given date
 */
export function evaluateDailyTarget(
  currentDate: Date,
  solvedProblemIds: string[],
  scheduleState: DailyScheduleState
): DailyTargetStatus {
  const dateKey = getDateKey(currentDate);

  const isPotdSolved = solvedProblemIds.includes(scheduleState.potdProblem.id);
  const solvedHomeworkCount = scheduleState.homeworkProblems.filter(hw =>
    solvedProblemIds.includes(hw.id)
  ).length;

  const homeworkQuota = Math.max(1, scheduleState.homeworkQuota);
  const isHomeworkComplete = solvedHomeworkCount >= homeworkQuota;
  const isTargetComplete = isPotdSolved && isHomeworkComplete;

  const tasksCompleted = (isPotdSolved ? 1 : 0) + solvedHomeworkCount;
  const totalTasks = 1 + homeworkQuota;
  const progressPercent = Math.min(100, Math.round((tasksCompleted / totalTasks) * 100));

  let statusMessage = '';
  if (isTargetComplete) {
    statusMessage = '🔥 Daily Target 100% Complete! Real streak counted & secured for today!';
  } else if (!isPotdSolved && solvedHomeworkCount === 0) {
    statusMessage = `Target Pending: Solve 5:00 AM POTD & ${homeworkQuota} homework quests before midnight to claim today's streak!`;
  } else if (!isPotdSolved) {
    statusMessage = `Almost there! 5:00 AM POTD is still pending. Solve it to complete today's target!`;
  } else {
    const remainingHw = homeworkQuota - solvedHomeworkCount;
    statusMessage = `POTD solved! Complete ${remainingHw} more homework question${remainingHw > 1 ? 's' : ''} to secure your streak!`;
  }

  return {
    dateKey,
    isPotdSolved,
    potdTitle: scheduleState.potdProblem.title,
    solvedHomeworkCount,
    homeworkQuota,
    isHomeworkComplete,
    isTargetComplete,
    tasksCompleted,
    totalTasks,
    progressPercent,
    statusMessage,
  };
}

/**
 * Calculates genuine consecutive streak days based on strictly completed target dates
 */
export function computeRealStreak(
  completedTargetDates: string[] = [],
  currentDate: Date = new Date(),
  shieldCount: number = 0
): RealStreakCalculation {
  const todayKey = getDateKey(currentDate);
  const yesterdayKey = getYesterdayKey(currentDate);

  const completedSet = new Set(completedTargetDates);
  const isTodayCompleted = completedSet.has(todayKey);
  const isYesterdayCompleted = completedSet.has(yesterdayKey);

  // If completedTargetDates is completely empty, real streak is strictly 0
  if (completedTargetDates.length === 0) {
    return {
      currentStreak: 0,
      bestStreak: 0,
      isTodayCompleted: false,
      isYesterdayCompleted: false,
      isStreakAtRisk: false,
      streakSecuredToday: false,
      completedTargetDates: [],
    };
  }

  // Count backwards consecutively
  let streak = 0;
  const checkDate = new Date(currentDate);

  // If today's target is completed, streak starts counting from today
  if (isTodayCompleted) {
    while (completedSet.has(getDateKey(checkDate))) {
      streak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
    }
  } else if (isYesterdayCompleted) {
    // If today is not yet completed, but yesterday was completed, the streak from yesterday is still alive!
    checkDate.setDate(checkDate.getDate() - 1); // Start from yesterday
    while (completedSet.has(getDateKey(checkDate))) {
      streak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
    }
  } else {
    // Neither today nor yesterday was completed. Streak is broken (0), unless protected
    streak = 0;
  }

  // Compute all-time best consecutive streak from the history of completed dates
  let bestStreak = 0;
  if (completedTargetDates.length > 0) {
    // Sort unique dates ascending
    const sortedDates = Array.from(new Set(completedTargetDates)).sort();
    let currentRun = 0;
    let prevDate: Date | null = null;

    for (const dStr of sortedDates) {
      const parts = dStr.split('-').map(Number);
      const cur = new Date(parts[0], parts[1] - 1, parts[2]);

      if (prevDate) {
        const diffMs = cur.getTime() - prevDate.getTime();
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          currentRun += 1;
        } else if (diffDays > 1) {
          currentRun = 1;
        }
      } else {
        currentRun = 1;
      }

      if (currentRun > bestStreak) {
        bestStreak = currentRun;
      }
      prevDate = cur;
    }
  }

  bestStreak = Math.max(bestStreak, streak);

  return {
    currentStreak: streak,
    bestStreak,
    isTodayCompleted,
    isYesterdayCompleted,
    isStreakAtRisk: !isTodayCompleted && streak > 0,
    streakSecuredToday: isTodayCompleted,
    completedTargetDates,
  };
}
