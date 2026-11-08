import { Problem } from '../types';

/**
 * Calculates POTD unlock status and Dynamic Homework quota.
 * 
 * Cohort Timeline:
 * - Official Cohort Launch: Tomorrow, November 1, 2026 at 05:00 AM (local time).
 * - Day 1: Nov 1, 2026
 * - Day 2: Nov 2, 2026
 * - Day 3: Nov 3, 2026, etc.
 * 
 * Rules:
 * 1. POTD unlocks strictly at 05:00 AM local time.
 *    If currentTime < 05:00 AM (or before official start date), it is locked with a real countdown.
 * 2. Homework quota is based on hours remaining until midnight:
 *    - > 14 hours left: 4 questions
 *    - 8 - 14 hours left: 3 questions
 *    - 4 - 8 hours left: 2 questions
 *    - < 4 hours left: 1 question
 * 3. Weekend surge:
 *    If tomorrow is Saturday or Sunday, add +2 extra questions for the Weekend Rush!
 * 4. Strictly Sequential Curriculum Progression:
 *    Problems advance in exact order across days and within homework.
 */

export interface UserCohortConfig {
  startDate: string; // ISO string for Day 1
  mode: 'automatic' | 'manual_day' | 'self_paced';
  manualDayNumber: number; // e.g. 1, 2, 3...
  isUnlockedAll: boolean; // if true, all POTD and HW are immediately unlocked
}

const STORAGE_KEY_COHORT_CONFIG = 'ada_user_cohort_config';

export function getDefaultCohortConfig(): UserCohortConfig {
  const now = new Date();
  // By default, Day 1 starts TODAY at 05:00:00 AM! Unbound from hardcoded calendar dates.
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 5, 0, 0);
  return {
    startDate: start.toISOString(),
    mode: 'automatic',
    manualDayNumber: 1,
    isUnlockedAll: false,
  };
}

export function getUserCohortConfig(): UserCohortConfig {
  if (typeof window === 'undefined') return getDefaultCohortConfig();
  try {
    const saved = localStorage.getItem(STORAGE_KEY_COHORT_CONFIG);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.startDate) {
        return parsed;
      }
    }
  } catch {}
  const def = getDefaultCohortConfig();
  saveUserCohortConfig(def);
  return def;
}

export function saveUserCohortConfig(config: UserCohortConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_COHORT_CONFIG, JSON.stringify(config));
  } catch {}
}

export const COHORT_START_DATE = new Date(); // Dynamic fallback reference

export interface ScheduleCalculation {
  isPotdUnlocked: boolean;
  unlockTime: Date;
  msUntilUnlock: number;
  hoursUntilUnlock: number;
  minutesUntilUnlock: number;
  secondsUntilUnlock: number;
  hoursRemainingToday: number;
  minutesRemainingToday: number;
  isTomorrowWeekend: boolean;
  tomorrowDayName: string;
  baseHomeworkQuota: number;
  weekendBonusQuota: number;
  totalHomeworkQuota: number;
  quotaReason: string;
  dayNumber: number;
  isPreLaunch: boolean;
  daysUntilLaunch: number;
  cohortStartDateStr: string;
}

export function computeDailySchedule(
  simulatedDate?: Date,
  userConfig?: UserCohortConfig
): ScheduleCalculation {
  const now = simulatedDate ? new Date(simulatedDate) : new Date();
  const config = userConfig || getUserCohortConfig();
  const cohortStartDate = new Date(config.startDate);

  let dayNumber = 1;
  let isPreLaunch = false;
  let daysUntilLaunch = 0;
  let isPotdUnlocked = false;

  if (config.isUnlockedAll || config.mode === 'self_paced') {
    // User chose self-paced mode: all days and challenges are unlocked immediately!
    dayNumber = Math.max(1, config.manualDayNumber || 1);
    isPotdUnlocked = true;
    isPreLaunch = false;
    daysUntilLaunch = 0;
  } else if (config.mode === 'manual_day') {
    // User decided by himself which day he is on!
    dayNumber = Math.max(1, config.manualDayNumber || 1);
    isPotdUnlocked = true;
    isPreLaunch = false;
    daysUntilLaunch = 0;
  } else {
    // Automatic schedule from user's chosen start date onwards
    const msUntilLaunch = cohortStartDate.getTime() - now.getTime();
    if (msUntilLaunch > 0) {
      isPreLaunch = true;
      dayNumber = 0;
      daysUntilLaunch = Math.max(1, Math.ceil(msUntilLaunch / (1000 * 60 * 60 * 24)));
    } else {
      const startMidnight = new Date(cohortStartDate.getFullYear(), cohortStartDate.getMonth(), cohortStartDate.getDate(), 0, 0, 0);
      const currentMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      const diffDays = Math.round((currentMidnight.getTime() - startMidnight.getTime()) / (1000 * 60 * 60 * 24));
      dayNumber = Math.max(1, diffDays + 1);
    }

    const potdUnlockToday = new Date(now);
    potdUnlockToday.setHours(5, 0, 0, 0);
    isPotdUnlocked = !isPreLaunch && now.getTime() >= potdUnlockToday.getTime();
  }

  let unlockTarget: Date;
  if (isPreLaunch) {
    unlockTarget = cohortStartDate;
  } else if (isPotdUnlocked) {
    const potdUnlockToday = new Date(now);
    potdUnlockToday.setHours(5, 0, 0, 0);
    unlockTarget = new Date(potdUnlockToday);
    unlockTarget.setDate(unlockTarget.getDate() + 1);
  } else {
    const potdUnlockToday = new Date(now);
    potdUnlockToday.setHours(5, 0, 0, 0);
    unlockTarget = potdUnlockToday;
  }

  const msUntilUnlock = Math.max(0, unlockTarget.getTime() - now.getTime());
  const totalSecondsUntil = Math.floor(msUntilUnlock / 1000);
  const hoursUntilUnlock = Math.floor(totalSecondsUntil / 3600);
  const minutesUntilUnlock = Math.floor((totalSecondsUntil % 3600) / 60);
  const secondsUntilUnlock = totalSecondsUntil % 60;

  // End of day (Midnight 23:59:59.999)
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  const msRemainingToday = Math.max(0, midnight.getTime() - now.getTime());
  const hoursRemainingToday = msRemainingToday / (1000 * 60 * 60);
  const minutesRemainingToday = Math.floor(msRemainingToday / (1000 * 60));

  // Determine if tomorrow is Saturday (6) or Sunday (0)
  const currentDay = now.getDay(); // 0 = Sun, 1 = Mon, ..., 5 = Fri, 6 = Sat
  const tomorrowDay = (currentDay + 1) % 7;
  const isTomorrowWeekend = tomorrowDay === 0 || tomorrowDay === 6; // Sunday or Saturday

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const tomorrowDayName = dayNames[tomorrowDay];

  // Base homework quota calculation
  let baseHomeworkQuota = 1;
  let timeBracketDesc = '';

  if (hoursRemainingToday > 14) {
    baseHomeworkQuota = 4;
    timeBracketDesc = '>14h left in day (Peak Focus Mode)';
  } else if (hoursRemainingToday >= 8) {
    baseHomeworkQuota = 3;
    timeBracketDesc = '8–14h left in day (Standard Pace)';
  } else if (hoursRemainingToday >= 4) {
    baseHomeworkQuota = 2;
    timeBracketDesc = '4–8h left in day (Sprint Mode)';
  } else {
    baseHomeworkQuota = 1;
    timeBracketDesc = '<4h left in day (Night Owl Emergency)';
  }

  const weekendBonusQuota = isTomorrowWeekend ? 2 : 0;
  const totalHomeworkQuota = baseHomeworkQuota + weekendBonusQuota;

  const quotaReason = isTomorrowWeekend
    ? `${timeBracketDesc} + Weekend Rush (+2 for ${tomorrowDayName}) = ${totalHomeworkQuota} Quests`
    : `${timeBracketDesc} = ${totalHomeworkQuota} Quests`;

  return {
    isPotdUnlocked,
    unlockTime: unlockTarget,
    msUntilUnlock,
    hoursUntilUnlock,
    minutesUntilUnlock,
    secondsUntilUnlock,
    hoursRemainingToday,
    minutesRemainingToday,
    isTomorrowWeekend,
    tomorrowDayName,
    baseHomeworkQuota,
    weekendBonusQuota,
    totalHomeworkQuota,
    quotaReason,
    dayNumber,
    isPreLaunch,
    daysUntilLaunch,
    cohortStartDateStr: `${cohortStartDate.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })} 05:00 AM`,
  };
}

/**
 * Selects POTD and Homework problems in a STRICT PEDAGOGICAL SEQUENCE:
 * Day 1: Starts at index 0 (Foundations / Arrays)
 * Homework: Strictly the next items in order
 * Day 2: Next batch (Pointers, Lists, Stacks)
 * Day 3: Next batch (Trees, Heaps, Graphs)
 * Day 4: Next batch (Dynamic Programming)
 */
export function selectDailyProblems(
  allProblems: Problem[],
  simulatedDate?: Date,
  userConfig?: UserCohortConfig
): { potd: Problem; homework: Problem[] } {
  const now = simulatedDate ? new Date(simulatedDate) : new Date();
  const schedule = computeDailySchedule(now, userConfig);

  if (allProblems.length === 0) {
    const dummy: Problem = {
      id: 'potd-dummy',
      title: 'Two Sum Saga',
      slug: 'two-sum',
      chapterId: 2,
      category: 'Arrays & Hashing',
      difficulty: 'Easy',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      description: 'Find two indices that sum up to target.',
      examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0, 1]' }],
      constraints: ['2 <= nums.length <= 10^4'],
      starterCode: 'def two_sum(nums: list[int], target: int) -> list[int]:\n    pass',
      solutionCode: 'def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return [seen[target - n], i]\n        seen[n] = i\n    return []',
      testCases: [{ id: '1', input: '[2,7,11,15], 9', expectedOutput: '[0, 1]' }],
      hints: {
        byteHint: 'Can you remember numbers you have seen before?',
        professorInsight: 'A hash map gives O(1) lookup for complement target - num.',
        bugsyTrap: 'Watch out: do not use the same element twice!'
      },
      tags: ['Array', 'Hash Map'],
      source: 'POTD'
    };
    return { potd: dummy, homework: [dummy] };
  }

  // Pre-launch previews Day 1; otherwise uses current cohort day
  const effectiveDay = Math.max(1, schedule.dayNumber || 1);
  const dayIndex = effectiveDay - 1;

  // STRICT PEDAGOGICAL PROGRESSION:
  // Each day starts at offset = (dayIndex * 5) % allProblems.length
  const PROBLEMS_PER_DAY = 5;
  const startIndex = (dayIndex * PROBLEMS_PER_DAY) % allProblems.length;

  // 1. POTD is the lead challenge for today
  const potd = { ...allProblems[startIndex], source: 'POTD' as const };

  // 2. Homework tasks are strictly the subsequent challenges in sequence
  const homeworkCount = schedule.totalHomeworkQuota;
  const homework: Problem[] = [];
  for (let i = 1; i <= homeworkCount; i++) {
    const hwIndex = (startIndex + i) % allProblems.length;
    homework.push({
      ...allProblems[hwIndex],
      source: 'Homework' as const
    });
  }

  return { potd, homework };
}
