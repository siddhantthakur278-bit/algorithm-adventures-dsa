import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserStats,
  Problem,
  DailyScheduleState,
  GitCommit,
  InventoryItem,
  AppNotification,
} from '../types';
import { hallOfFameProblems } from '../data/hallOfFameData';
import { initialInventory, initialBadges } from '../data/gameData';
import {
  computeDailySchedule,
  selectDailyProblems,
  UserCohortConfig,
  getUserCohortConfig,
  saveUserCohortConfig,
  getDefaultCohortConfig,
} from '../utils/dailySchedule';
import { commitProblemSolution, loadStoredCommits, saveStoredCommits, CommitResult, loadGitHubConfig, saveGitHubConfig, GitHubConfig } from '../utils/githubService';
import {
  createPotdBroadcast,
  createStreakAlertBroadcast,
  createWeekendRushBroadcast,
  requestDesktopNotificationPermission,
} from '../utils/notificationService';
import {
  evaluateDailyTarget,
  computeRealStreak,
  DailyTargetStatus,
  RealStreakCalculation,
  getDateKey,
} from '../utils/streakEngine';
import { sound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { syncActiveScores } from '../utils/universalLeaderboardService';

export type ActiveSaga = 'dsa' | 'sql' | 'prisma' | 'linear-algebra' | 'web-dev' | 'python-dsa' | 'roadmap';
export type LayoutMode = 'vertical-panel' | 'top-bar';

interface CourseContextType {
  activeSaga: ActiveSaga;
  setActiveSaga: (saga: ActiveSaga) => void;
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  roadmapCheckedTopics: string[];
  toggleRoadmapTopic: (topicId: string) => void;
  readinessChecked: string[];
  toggleReadinessItem: (id: string) => void;
  projectStatuses: Record<number, 'locked' | 'in-progress' | 'shipped'>;
  updateProjectStatus: (id: number, status: 'locked' | 'in-progress' | 'shipped') => void;
  prismaCompletedTopics: string[];
  togglePrismaTopicComplete: (topicId: string) => void;
  prismaXP: number;
  addPrismaXP: (amount: number) => void;
  actionBurst: { text: string; subtext?: string; type?: 'pow' | 'zap' | 'boom' | 'star' } | null;
  triggerBurst: (text: string, subtext?: string, type?: 'pow' | 'zap' | 'boom' | 'star') => void;
  stats: UserStats;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedProblem: Problem | null;
  setSelectedProblem: (problem: Problem | null) => void;
  scheduleState: DailyScheduleState;
  dailyTargetStatus: DailyTargetStatus;
  realStreak: RealStreakCalculation;
  simulatedDate: Date | null;
  setSimulatedDate: (d: Date | null) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  addXP: (amount: number, reason?: string) => void;
  markProblemSolved: (problem: Problem, code: string) => Promise<CommitResult>;
  toggleSubtopicComplete: (subtopicId: string) => void;
  recordQuizScore: (quizId: string, score: number) => void;
  defeatBugHunt: (challengeId: string) => void;
  collectPowerCard: (cardId: string) => void;
  loadProblemInIDE: (problem: Problem) => void;
  setBossDefeated: () => void;
  useShield: () => boolean;
  recordBlitzScore: (score: number) => void;
  openDailyLootChest: () => { item: InventoryItem; xp: number } | null;
  useInventoryItem: (itemId: string) => boolean;
  equipTitle: (title: string) => void;
  unlockBadge: (badgeId: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  broadcastAlert: (type: 'potd' | 'streak' | 'weekend') => void;
  toggleBrowserNotifications: () => Promise<boolean>;
  githubConfig: GitHubConfig;
  updateGitHubConfig: (config: GitHubConfig) => void;
  recentCommits: GitCommit[];
  cohortConfig: UserCohortConfig;
  updateCohortConfig: (newCfg: Partial<UserCohortConfig>) => void;
  resetCohortToToday: () => void;
  setManualCohortDay: (day: number) => void;
}

const STORAGE_KEY_STATS = 'ada_course_stats';

const initialStats: UserStats = {
  xp: 150,
  level: 1,
  streakCount: 0,
  bestStreak: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  shieldCount: 2,
  solvedProblemIds: [],
  completedDailyTargetDates: [],
  completedSubtopics: ['1-1'],
  completedQuizzes: {},
  bugHuntDefeated: [],
  powerCardsCollected: ['pc-1'],
  bossBeaten: false,
  gitCommits: [],
  blitzHighScore: 350,
  inventory: initialInventory,
  badges: initialBadges.filter(b => b.isUnlocked).map(b => b.id),
  lastLootChestDate: '',
  activeXpMultiplier: 1,
  activeTitle: 'Byte Novice',
  notifications: [
    {
      id: 'welcome-1',
      title: '☀️ 5:00 AM POTD Vault Open!',
      message: 'Professor: "Welcome to Algorithm Adventures! The 5:00 AM vault is primed with Two Sum. Start your daily streak now!"',
      timestamp: new Date().toISOString(),
      type: 'potd',
      read: false,
      actionTab: 'quest',
      speaker: 'professor',
    },
    {
      id: 'welcome-2',
      title: '🎁 Daily Mystery Chest Ready',
      message: 'Byte: "Professor prepared a daily loot chest in your Arsenal backpack! Open it for shields and power cards!"',
      timestamp: new Date().toISOString(),
      type: 'loot',
      read: false,
      actionTab: 'inventory',
      speaker: 'byte',
    },
  ],
  browserNotificationsEnabled: false,
};

const CourseContext = createContext<CourseContextType | null>(null);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_STATS);
      if (stored) {
        const parsed = JSON.parse(stored);
        parsed.gitCommits = loadStoredCommits();
        parsed.completedDailyTargetDates = parsed.completedDailyTargetDates || [];
        const realCalc = computeRealStreak(parsed.completedDailyTargetDates, new Date(), parsed.shieldCount || 0);
        parsed.streakCount = realCalc.currentStreak;
        parsed.bestStreak = realCalc.bestStreak;
        return parsed;
      }
    } catch {
      // fallback
    }
    const withCommits = { ...initialStats, gitCommits: loadStoredCommits() };
    return withCommits;
  });

  const [activeSaga, setActiveSaga] = useState<ActiveSaga>(() => {
    try {
      const saved = localStorage.getItem('ada_active_saga');
      if (saved && ['dsa', 'sql', 'prisma', 'linear-algebra', 'web-dev', 'python-dsa', 'roadmap'].includes(saved)) {
        return saved as ActiveSaga;
      }
    } catch {}
    return 'dsa';
  });

  useEffect(() => {
    try {
      localStorage.setItem('ada_active_saga', activeSaga);
    } catch {}
  }, [activeSaga]);

  // Master Roadmap State Persistence
  const [roadmapCheckedTopics, setRoadmapCheckedTopics] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ada_roadmap_checked_topics');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ada_roadmap_checked_topics', JSON.stringify(roadmapCheckedTopics));
    } catch {}
  }, [roadmapCheckedTopics]);

  const toggleRoadmapTopic = (topicId: string) => {
    setRoadmapCheckedTopics(prev =>
      prev.includes(topicId) ? prev.filter(t => t !== topicId) : [...prev, topicId]
    );
  };

  const [readinessChecked, setReadinessChecked] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ada_roadmap_readiness');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ada_roadmap_readiness', JSON.stringify(readinessChecked));
    } catch {}
  }, [readinessChecked]);

  const toggleReadinessItem = (id: string) => {
    setReadinessChecked(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const [projectStatuses, setProjectStatuses] = useState<Record<number, 'locked' | 'in-progress' | 'shipped'>>(() => {
    try {
      const saved = localStorage.getItem('ada_roadmap_project_statuses');
      return saved ? JSON.parse(saved) : { 1: 'in-progress' };
    } catch {
      return { 1: 'in-progress' };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ada_roadmap_project_statuses', JSON.stringify(projectStatuses));
    } catch {}
  }, [projectStatuses]);

  const updateProjectStatus = (id: number, status: 'locked' | 'in-progress' | 'shipped') => {
    setProjectStatuses(prev => ({
      ...prev,
      [id]: status,
    }));
  };
  const [prismaCompletedTopics, setPrismaCompletedTopics] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ada_prisma_completed_topics');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [prismaXP, setPrismaXP] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('ada_prisma_xp');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    localStorage.setItem('ada_prisma_completed_topics', JSON.stringify(prismaCompletedTopics));
  }, [prismaCompletedTopics]);

  useEffect(() => {
    localStorage.setItem('ada_prisma_xp', String(prismaXP));
  }, [prismaXP]);

  const [actionBurst, setActionBurst] = useState<{
    text: string;
    subtext?: string;
    type?: 'pow' | 'zap' | 'boom' | 'star';
  } | null>(null);

  const triggerBurst = (text: string, subtext?: string, type: 'pow' | 'zap' | 'boom' | 'star' = 'pow') => {
    setActionBurst({ text, subtext, type });
    setTimeout(() => {
      setActionBurst(current => (current?.text === text ? null : current));
    }, 1800);
  };

  const addPrismaXP = (amount: number) => {
    setPrismaXP(prev => prev + amount);
    addXP(amount, 'Prisma ORM Quest XP');
  };

  const togglePrismaTopicComplete = (topicId: string) => {
    setPrismaCompletedTopics(prev => {
      const exists = prev.includes(topicId);
      if (exists) {
        return prev.filter(t => t !== topicId);
      } else {
        sound.playFanfare();
        triggerBurst('⚡ ZAP!', '+100 XP Quest Mastered!', 'zap');
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#06B6D4', '#14B8A6', '#FB923C', '#FFDE59'],
        });
        return [...prev, topicId];
      }
    });
  };

  const [activeTab, setActiveTab] = useState<string>('quest');

  // Vertical Panel vs Classic Top Bar layout state
  const [layoutMode, setLayoutModeState] = useState<LayoutMode>(() => {
    try {
      const saved = localStorage.getItem('ada_layout_mode');
      if (saved === 'vertical-panel' || saved === 'top-bar') return saved;
    } catch {}
    return 'vertical-panel'; // Primary default is Vertical Panel Layout!
  });

  const setLayoutMode = (mode: LayoutMode) => {
    setLayoutModeState(mode);
    try {
      localStorage.setItem('ada_layout_mode', mode);
    } catch {}
  };

  const [isSidebarCollapsed, setIsSidebarCollapsedState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('ada_sidebar_collapsed');
      if (saved !== null) return JSON.parse(saved);
    } catch {}
    return false;
  });

  const setIsSidebarCollapsed = (collapsed: boolean | ((prev: boolean) => boolean)) => {
    setIsSidebarCollapsedState((prev) => {
      const nextVal = typeof collapsed === 'function' ? collapsed(prev) : collapsed;
      try {
        localStorage.setItem('ada_sidebar_collapsed', JSON.stringify(nextVal));
      } catch {}
      return nextVal;
    });
  };

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(() => hallOfFameProblems[0]);
  const [simulatedDate, setSimulatedDate] = useState<Date | null>(() => {
    try {
      const saved = localStorage.getItem('ada_simulated_date');
      if (saved) return new Date(saved);
    } catch {}
    return null; // By default, follows the user's real local machine clock!
  });

  // User-configurable schedule: unbound from any arbitrary static date!
  const [cohortConfig, setCohortConfigState] = useState<UserCohortConfig>(() => getUserCohortConfig());

  const updateCohortConfig = (newCfg: Partial<UserCohortConfig>) => {
    setCohortConfigState((prev) => {
      const updated: UserCohortConfig = { ...prev, ...newCfg };
      saveUserCohortConfig(updated);
      return updated;
    });
  };

  const resetCohortToToday = () => {
    const def = getDefaultCohortConfig();
    setCohortConfigState(def);
    saveUserCohortConfig(def);
    setSimulatedDate(null);
    sound.playSuccess();
  };

  const setManualCohortDay = (day: number) => {
    updateCohortConfig({
      mode: 'manual_day',
      manualDayNumber: day,
    });
    sound.playPop();
  };

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Sync sound engine
  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    if (simulatedDate) {
      localStorage.setItem('ada_simulated_date', simulatedDate.toISOString());
    } else {
      localStorage.removeItem('ada_simulated_date');
    }
  }, [simulatedDate]);

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const [githubConfig, setGithubConfig] = useState<GitHubConfig>(() => loadGitHubConfig());
  const updateGitHubConfig = (cfg: GitHubConfig) => {
    setGithubConfig(cfg);
    saveGitHubConfig(cfg);
  };

  // Persist stats on update
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
  }, [stats]);

  // Compute schedule state based on user's own start date and chosen pace
  const effectiveDate = simulatedDate || new Date();
  const scheduleCalc = computeDailySchedule(effectiveDate, cohortConfig);
  const { potd, homework } = selectDailyProblems(hallOfFameProblems, effectiveDate, cohortConfig);

  const scheduleState: DailyScheduleState = {
    isPotdUnlocked: scheduleCalc.isPotdUnlocked,
    potdUnlockTimeStr: scheduleCalc.unlockTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    msUntilPotdUnlock: scheduleCalc.msUntilUnlock,
    potdProblem: potd,
    homeworkQuota: scheduleCalc.totalHomeworkQuota,
    homeworkProblems: homework,
    hoursRemainingToday: scheduleCalc.hoursRemainingToday,
    isWeekendRush: scheduleCalc.isTomorrowWeekend,
    dayNumber: scheduleCalc.dayNumber,
    isPreLaunch: scheduleCalc.isPreLaunch,
    daysUntilLaunch: scheduleCalc.daysUntilLaunch,
    cohortStartDateStr: scheduleCalc.cohortStartDateStr,
  };

  // Compute Real-time Daily Target Status and Real Streak
  const dailyTargetStatus = evaluateDailyTarget(effectiveDate, stats.solvedProblemIds, scheduleState);
  const realStreak = computeRealStreak(stats.completedDailyTargetDates || [], effectiveDate, stats.shieldCount);

  // Auto-sync stats and completed work to Supabase cloud in background
  useEffect(() => {
    const timer = setTimeout(() => {
      syncActiveScores(
        stats.xp,
        stats.solvedProblemIds.length,
        realStreak.currentStreak,
        scheduleState.dayNumber || 1,
        {
          solvedProblemIds: stats.solvedProblemIds,
          completedDailyTargetDates: stats.completedDailyTargetDates,
          gitCommits: stats.gitCommits,
          bugHuntDefeated: stats.bugHuntDefeated,
          blitzHighScore: stats.blitzHighScore,
          inventory: stats.inventory,
        }
      );
    }, 1500);
    return () => clearTimeout(timer);
  }, [stats.xp, stats.solvedProblemIds.length, stats.gitCommits.length, realStreak.currentStreak, scheduleState.dayNumber]);

  const addXP = (amount: number, reason?: string) => {
    setStats(prev => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 300) + 1;
      const leveledUp = newLevel > prev.level;

      if (leveledUp) {
        sound.playFanfare();
        triggerBurst('🌟 LEVEL UP!', `Reached Level ${newLevel}!`, 'star');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFDE59', '#38B6FF', '#7ED957', '#FF5757'],
        });
      } else {
        sound.playPop();
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
      };
    });
  };

  const loadProblemInIDE = (problem: Problem) => {
    setSelectedProblem(problem);
    setActiveTab('ide');
    sound.playPop();
  };

  const markProblemSolved = async (problem: Problem, code: string): Promise<CommitResult> => {
    // 1. Commit to GitHub or Local Git Engine
    const result = await commitProblemSolution(problem, code, {
      xp: 50,
      streak: stats.streakCount,
    });

    // 2. Play sound & celebratory confetti
    sound.playSuccess();
    triggerBurst('💥 POW!', '+50 XP Code Committed!', 'pow');
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFDE59', '#7ED957', '#38B6FF'],
    });

    // 3. Update stats & real streak engine
    setStats(prev => {
      const isFirstSolve = !prev.solvedProblemIds.includes(problem.id);
      const updatedSolved = isFirstSolve ? [...prev.solvedProblemIds, problem.id] : prev.solvedProblemIds;
      const xpEarned = isFirstSolve ? 50 : 15;
      const newXp = prev.xp + xpEarned;
      const newLevel = Math.floor(newXp / 300) + 1;
      const updatedCommits = [result.commit, ...prev.gitCommits].slice(0, 50);

      // Save commit to localStorage
      saveStoredCommits(updatedCommits);

      // Check Real Daily Target completion (5:00 AM POTD + Dynamic Homework Quota)
      const dateKey = getDateKey(effectiveDate);
      const currentCompleted = prev.completedDailyTargetDates || [];
      const updatedTargetEval = evaluateDailyTarget(effectiveDate, updatedSolved, scheduleState);

      let newCompletedDates = currentCompleted;
      let targetJustCompleted = false;

      if (updatedTargetEval.isTargetComplete && !currentCompleted.includes(dateKey)) {
        newCompletedDates = [...currentCompleted, dateKey];
        targetJustCompleted = true;
      }

      const updatedRealStreak = computeRealStreak(newCompletedDates, effectiveDate, prev.shieldCount);

      // Auto-award badges
      const newBadges = [...prev.badges];
      const awardBadge = (bId: string) => {
        if (!newBadges.includes(bId)) {
          newBadges.push(bId);
        }
      };

      awardBadge('badge-code-run');
      if (result.commit.hash) awardBadge('badge-git');
      if (problem.id === scheduleState.potdProblem.id) awardBadge('badge-potd');
      if (scheduleState.isWeekendRush) awardBadge('badge-weekend');
      if (problem.title.toLowerCase().includes('two sum') || problem.id === 'p1') awardBadge('badge-two-sum');
      if (updatedRealStreak.currentStreak >= 3) awardBadge('badge-streak-3');
      if (updatedRealStreak.currentStreak >= 7) awardBadge('badge-streak-7');

      if (targetJustCompleted) {
        sound.playFanfare();
        triggerBurst('🔥 STREAK EXTENDED!', `Daily Target 100% Complete! Real Streak: ${updatedRealStreak.currentStreak}d!`, 'boom');
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FBBF24', '#FB923C', '#10B981', '#38BDF8'],
        });
      }

      return {
        ...prev,
        xp: targetJustCompleted ? newXp + 100 : newXp,
        level: newLevel,
        solvedProblemIds: updatedSolved,
        gitCommits: updatedCommits,
        completedDailyTargetDates: newCompletedDates,
        streakCount: updatedRealStreak.currentStreak,
        bestStreak: updatedRealStreak.bestStreak,
        badges: newBadges,
        lastActiveDate: dateKey,
      };
    });

    return result;
  };

  const toggleSubtopicComplete = (subtopicId: string) => {
    setStats(prev => {
      const exists = prev.completedSubtopics.includes(subtopicId);
      const updated = exists
        ? prev.completedSubtopics.filter(id => id !== subtopicId)
        : [...prev.completedSubtopics, subtopicId];

      if (!exists) {
        sound.playPop();
      }

      return {
        ...prev,
        completedSubtopics: updated,
        xp: exists ? prev.xp : prev.xp + 20,
      };
    });
  };

  const recordQuizScore = (quizId: string, score: number) => {
    setStats(prev => {
      const prevScore = prev.completedQuizzes[quizId] || 0;
      const best = Math.max(prevScore, score);
      sound.playSuccess();
      return {
        ...prev,
        completedQuizzes: { ...prev.completedQuizzes, [quizId]: best },
        xp: prev.xp + score * 10,
      };
    });
  };

  const defeatBugHunt = (challengeId: string) => {
    setStats(prev => {
      if (prev.bugHuntDefeated.includes(challengeId)) return prev;
      sound.playSuccess();
      triggerBurst('🎯 BUSTED!', 'Bugsy Exterminated! +100 XP', 'boom');
      confetti({
        particleCount: 60,
        spread: 55,
        colors: ['#7ED957', '#FFDE59', '#38B6FF'],
      });
      return {
        ...prev,
        bugHuntDefeated: [...prev.bugHuntDefeated, challengeId],
        xp: prev.xp + 75,
      };
    });
  };

  const collectPowerCard = (cardId: string) => {
    setStats(prev => {
      if (prev.powerCardsCollected.includes(cardId)) return prev;
      sound.playPop();
      return {
        ...prev,
        powerCardsCollected: [...prev.powerCardsCollected, cardId],
        xp: prev.xp + 30,
      };
    });
  };

  const setBossDefeated = () => {
    setStats(prev => ({
      ...prev,
      bossBeaten: true,
      xp: prev.xp + 250,
    }));
    sound.playFanfare();
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#FFDE59', '#FF5757', '#38B6FF', '#7ED957'],
    });
  };

  const useShield = (): boolean => {
    if (stats.shieldCount <= 0) return false;
    setStats(prev => ({
      ...prev,
      shieldCount: prev.shieldCount - 1,
    }));
    sound.playPop();
    return true;
  };

  const recordBlitzScore = (score: number) => {
    setStats(prev => {
      const isNewHigh = score > prev.blitzHighScore;
      const xpEarned = Math.round(score / 5);
      if (isNewHigh) {
        sound.playFanfare();
        confetti({
          particleCount: 100,
          spread: 80,
          colors: ['#FFDE59', '#38B6FF', '#FF5757'],
        });
      }
      return {
        ...prev,
        blitzHighScore: Math.max(prev.blitzHighScore, score),
        xp: prev.xp + xpEarned,
      };
    });
  };

  const openDailyLootChest = (): { item: InventoryItem; xp: number } | null => {
    const today = (simulatedDate || new Date()).toISOString().split('T')[0];
    if (stats.lastLootChestDate === today) return null;

    sound.playChestOpen();
    confetti({
      particleCount: 120,
      spread: 75,
      colors: ['#FFDE59', '#FF914D', '#7ED957', '#38B6FF'],
    });

    const possibleDrops: InventoryItem[] = [
      {
        id: 'drop-shield-' + Date.now(),
        name: 'Streak Freeze Shield',
        type: 'shield',
        description: 'Protects your streak flame if you miss a daily quest.',
        quantity: 1,
        rarity: 'Rare',
        icon: '🛡️',
      },
      {
        id: 'drop-potion-' + Date.now(),
        name: 'Byte’s Overclock Potion',
        type: 'potion',
        description: '2x XP multiplier applied to your next solves!',
        quantity: 1,
        rarity: 'Epic',
        icon: '🧪',
      },
      {
        id: 'drop-spray-' + Date.now(),
        name: 'Professor’s Anti-Bug Spray',
        type: 'spray',
        description: 'Instantly reveals Bugsy’s hidden traps!',
        quantity: 1,
        rarity: 'Rare',
        icon: '🧴',
      },
      {
        id: 'drop-title-' + Date.now(),
        name: 'Title: "Algorithm Grandmaster"',
        type: 'title',
        description: 'Rare cosmetic title for your developer profile!',
        quantity: 1,
        rarity: 'Legendary',
        icon: '👑',
      },
    ];

    const dropped = possibleDrops[Math.floor(Math.random() * possibleDrops.length)];
    const bonusXp = 100;

    setStats(prev => {
      // Add or merge into inventory
      const existing = prev.inventory.find(i => i.name === dropped.name);
      let updatedInv: InventoryItem[];
      if (existing) {
        updatedInv = prev.inventory.map(i =>
          i.name === dropped.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updatedInv = [...prev.inventory, dropped];
      }

      // If shield, also increment shield count
      const newShields = dropped.type === 'shield' ? prev.shieldCount + 1 : prev.shieldCount;

      return {
        ...prev,
        inventory: updatedInv,
        shieldCount: newShields,
        xp: prev.xp + bonusXp,
        lastLootChestDate: today,
      };
    });

    return { item: dropped, xp: bonusXp };
  };

  const useInventoryItem = (itemId: string): boolean => {
    const item = stats.inventory.find(i => i.id === itemId);
    if (!item || item.quantity <= 0) return false;

    sound.playPop();

    setStats(prev => {
      const updatedInv = prev.inventory
        .map(i => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter(i => i.quantity > 0 || i.type === 'title');

      let newShields = prev.shieldCount;
      let newMultiplier = prev.activeXpMultiplier;

      if (item.type === 'shield') {
        newShields += 1;
      } else if (item.type === 'potion') {
        newMultiplier = 2;
      }

      return {
        ...prev,
        inventory: updatedInv,
        shieldCount: newShields,
        activeXpMultiplier: newMultiplier,
      };
    });

    return true;
  };

  const equipTitle = (title: string) => {
    sound.playPop();
    setStats(prev => ({ ...prev, activeTitle: title }));
  };

  const unlockBadge = (badgeId: string) => {
    setStats(prev => {
      if (prev.badges.includes(badgeId)) return prev;
      sound.playFanfare();
      return {
        ...prev,
        badges: [...prev.badges, badgeId],
        xp: prev.xp + 50,
      };
    });
  };

  const markNotificationAsRead = (id: string) => {
    setStats(prev => ({
      ...prev,
      notifications: (prev.notifications || []).map(n =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  };

  const clearAllNotifications = () => {
    sound.playPop();
    setStats(prev => ({
      ...prev,
      notifications: [],
    }));
  };

  const broadcastAlert = (type: 'potd' | 'streak' | 'weekend') => {
    let notif: AppNotification;
    if (type === 'potd') {
      notif = createPotdBroadcast(scheduleState.potdProblem);
    } else if (type === 'streak') {
      notif = createStreakAlertBroadcast(scheduleState.hoursRemainingToday, stats.streakCount);
    } else {
      notif = createWeekendRushBroadcast();
    }

    setStats(prev => ({
      ...prev,
      notifications: [notif, ...(prev.notifications || [])].slice(0, 20),
    }));
  };

  const toggleBrowserNotifications = async (): Promise<boolean> => {
    sound.playPop();
    const granted = await requestDesktopNotificationPermission();
    setStats(prev => ({
      ...prev,
      browserNotificationsEnabled: granted,
    }));
    return granted;
  };

  return (
    <CourseContext.Provider
      value={{
        activeSaga,
        setActiveSaga,
        layoutMode,
        setLayoutMode,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        roadmapCheckedTopics,
        toggleRoadmapTopic,
        readinessChecked,
        toggleReadinessItem,
        projectStatuses,
        updateProjectStatus,
        prismaCompletedTopics,
        togglePrismaTopicComplete,
        prismaXP,
        addPrismaXP,
        actionBurst,
        triggerBurst,
        stats,
        activeTab,
        setActiveTab,
        selectedProblem,
        setSelectedProblem,
        scheduleState,
        dailyTargetStatus,
        realStreak,
        simulatedDate,
        setSimulatedDate,
        soundEnabled,
        toggleSound,
        addXP,
        markProblemSolved,
        toggleSubtopicComplete,
        recordQuizScore,
        defeatBugHunt,
        collectPowerCard,
        loadProblemInIDE,
        setBossDefeated,
        useShield,
        recordBlitzScore,
        openDailyLootChest,
        useInventoryItem,
        equipTitle,
        unlockBadge,
        markNotificationAsRead,
        clearAllNotifications,
        broadcastAlert,
        toggleBrowserNotifications,
        githubConfig,
        updateGitHubConfig,
        cohortConfig,
        updateCohortConfig,
        resetCohortToToday,
        setManualCohortDay,
        recentCommits: stats.gitCommits && stats.gitCommits.length > 0 ? stats.gitCommits : loadStoredCommits(),
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};
