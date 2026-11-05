export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  slug: string;
  chapterId: number;
  category: string; // e.g. 'Arrays', 'Two Pointers', 'Trees', 'DP'
  difficulty: Difficulty;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: string;
  solutionCode: string;
  testCases: TestCase[];
  hints: {
    byteHint: string;
    professorInsight: string;
    bugsyTrap: string;
  };
  tags: string[];
  codeforcesId?: string;
  source?: 'Curated' | 'Codeforces' | 'POTD' | 'Homework';
}

export interface Subtopic {
  id: string;
  title: string;
  timeEstimate?: string;
  summary?: string;
  content?: string; // Rich markdown-like or styled text
  keyTakeaway?: string;
  codeSnippet?: string;
  watchOut?: string;
  sectionNumber?: string;
  overview?: string;
  keyIdea?: string;
  trick?: string;
  realLife?: string;
  codeSnippets?: {
    title: string;
    code: string;
    explanation?: string;
  }[];
  quizzes?: {
    id: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
  }[];
  mythBusters?: {
    myth: string;
    fact: string;
  }[];
  powerCard?: {
    topic: string;
    remember: string;
  }[];
}

export interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  isLinked?: boolean;
  folder?: string;
}

export interface MythBuster {
  id: string;
  myth: string;
  reality: string;
  comicDialogue: string;
  character: 'byte' | 'professor' | 'bugsy';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  xpReward: number;
}

export interface PowerCard {
  id: string;
  title: string;
  category: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  frontText: string;
  backDetail: string;
  formula?: string;
  codePreview?: string;
}

export interface Chapter {
  id: number;
  title: string;
  subtitle?: string;
  tagline?: string;
  badge?: string;
  color: string;
  description?: string;
  comicDialogue?: {
    speaker: string;
    text: string;
    reaction?: string;
  }[];
  subtopics: Subtopic[];
  mythBusters?: MythBuster[];
  quiz?: QuizQuestion[];
  powerCards?: PowerCard[];
}

export interface GitCommit {
  hash: string;
  sha?: string;
  message: string;
  timestamp: string;
  problemId: string;
  problemTitle: string;
  fileChanged: string;
  status: 'committed' | 'pushed' | 'synced';
  diffPreview: string;
  author: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'shield' | 'potion' | 'spray' | 'title';
  description: string;
  quantity: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  icon: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  category: 'Streaks' | 'Problem Solving' | 'Mastery' | 'Combat';
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  xpReward: number;
}

export interface BlitzQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'potd' | 'streak' | 'weekend' | 'loot' | 'github' | 'general';
  read: boolean;
  actionTab?: string;
  speaker?: 'byte' | 'professor' | 'bugsy';
}

export interface CodeforcesProfile {
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  avatar?: string;
  solvedCount?: number;
  loading?: boolean;
  error?: string;
}

export interface LeetCodeProfile {
  username: string;
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  acceptanceRate?: number;
  ranking?: number;
  loading?: boolean;
  error?: string;
}

export interface GitHubProfileData {
  username: string;
  name?: string;
  avatarUrl?: string;
  publicRepos?: number;
  followers?: number;
  bio?: string;
  htmlUrl?: string;
  recentCommits?: Array<{
    sha: string;
    message: string;
    date: string;
    url: string;
  }>;
  loading?: boolean;
  error?: string;
}

export interface UserStats {
  xp: number;
  level: number;
  streakCount: number;
  bestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  shieldCount: number;
  solvedProblemIds: string[];
  completedDailyTargetDates?: string[]; // Array of YYYY-MM-DD dates where 5 AM POTD + Homework were 100% completed
  completedSubtopics: string[];
  completedQuizzes: Record<string, number>; // quizId -> score
  bugHuntDefeated: string[];
  powerCardsCollected: string[];
  bossBeaten: boolean;
  gitCommits: GitCommit[];
  blitzHighScore: number;
  inventory: InventoryItem[];
  badges: string[];
  lastLootChestDate: string;
  activeXpMultiplier: number;
  activeTitle: string;
  notifications: AppNotification[];
  browserNotificationsEnabled: boolean;
}

export interface DailyScheduleState {
  isPotdUnlocked: boolean;
  potdUnlockTimeStr: string;
  msUntilPotdUnlock: number;
  potdProblem: Problem;
  homeworkQuota: number;
  homeworkProblems: Problem[];
  hoursRemainingToday: number;
  isWeekendRush: boolean; // Tomorrow is Sat or Sun
  dayNumber: number;
  isPreLaunch: boolean;
  daysUntilLaunch: number;
  cohortStartDateStr: string;
}

export interface BugHuntChallenge {
  id: string;
  title: string;
  chapterTitle: string;
  buggyCode: string;
  language: string;
  lineBugIndex: number; // 1-based index of faulty line
  description: string;
  bugType: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  fixedCode: string;
  bugsyComment: string;
  xpReward: number;
}

export interface Flashcard {
  id: string;
  topic: string;
  question: string;
  answer: string;
  codeSnippet?: string;
  box: 1 | 2 | 3 | 4; // Leitner box
  lastReviewed?: string;
}
