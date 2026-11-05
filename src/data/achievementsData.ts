// Comprehensive Achievements & Badges Registry

export type AchievementCategory =
  | 'Streaks'
  | 'Coding & Git'
  | 'DSA Mastery'
  | 'Web Dev Universe'
  | 'SQL & Prisma'
  | 'Linear Algebra'
  | 'Boss & Combat';

export type AchievementTier = 'Bronze' | 'Silver' | 'Gold' | 'Diamond' | 'Legendary';

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  tier: AchievementTier;
  icon: string;
  xpReward: number;
  conditionDescription: string;
}

export const COMPREHENSIVE_ACHIEVEMENTS: AchievementItem[] = [
  // 1. Coding & Git
  {
    id: 'badge-code-run',
    title: 'First Compilation',
    description: 'Executed your first script in the VS Code browser compiler.',
    category: 'Coding & Git',
    tier: 'Bronze',
    icon: '⚡',
    xpReward: 50,
    conditionDescription: 'Run any Python, Web Dev, or SQL code in the editor.',
  },
  {
    id: 'badge-git',
    title: 'Git Pioneer',
    description: 'Directly committed a verified solution to your GitHub repository.',
    category: 'Coding & Git',
    tier: 'Silver',
    icon: '🐙',
    xpReward: 100,
    conditionDescription: 'Push a solution using the GitHub Direct Commit Engine.',
  },
  {
    id: 'badge-polyglot',
    title: 'Polyglot Engineer',
    description: 'Ran and tested code across Python, TypeScript, SQL, and HTML.',
    category: 'Coding & Git',
    tier: 'Gold',
    icon: '🛠️',
    xpReward: 200,
    conditionDescription: 'Execute code in at least 3 distinct programming environments.',
  },

  // 2. Streaks & Attendance
  {
    id: 'badge-potd',
    title: 'Dawn Patrol (5:00 AM)',
    description: 'Unlocked and solved a 5:00 AM Day of the Question challenge.',
    category: 'Streaks',
    tier: 'Silver',
    icon: '🌅',
    xpReward: 80,
    conditionDescription: 'Complete a POTD after its 05:00:00 AM morning unlock.',
  },
  {
    id: 'badge-streak-3',
    title: 'Flaming Momentum',
    description: 'Maintained an unbroken 3-day streak flame.',
    category: 'Streaks',
    tier: 'Bronze',
    icon: '🔥',
    xpReward: 100,
    conditionDescription: 'Keep a streak of 3 consecutive active days.',
  },
  {
    id: 'badge-streak-7',
    title: 'Streak Titan (7 Days)',
    description: 'Maintained a flawless 7-day streak without dropping shields.',
    category: 'Streaks',
    tier: 'Gold',
    icon: '⚡',
    xpReward: 250,
    conditionDescription: 'Reach a streak count of 7 days.',
  },
  {
    id: 'badge-weekend',
    title: 'Weekend Rush Raider',
    description: 'Conquered extra bonus problems during the Saturday/Sunday rush.',
    category: 'Streaks',
    tier: 'Silver',
    icon: '🚀',
    xpReward: 120,
    conditionDescription: 'Complete homework on a weekend when quota is surged.',
  },

  // 3. DSA Mastery
  {
    id: 'badge-two-sum',
    title: 'Hash Map Alchemist',
    description: 'Solved Two Sum in optimal O(N) time using complement hashing.',
    category: 'DSA Mastery',
    tier: 'Bronze',
    icon: '🧩',
    xpReward: 60,
    conditionDescription: 'Solve Two Sum or Two Pointers in Python DSA.',
  },
  {
    id: 'badge-binary-search',
    title: 'Binary Splitter',
    description: 'Cut search spaces in half with O(log N) precision.',
    category: 'DSA Mastery',
    tier: 'Silver',
    icon: '🔍',
    xpReward: 100,
    conditionDescription: 'Solve Binary Search or Rotated Array challenge.',
  },
  {
    id: 'badge-dp-wizard',
    title: 'Dynamic Programming Sage',
    description: 'Mastered memoization and state transitions in DP problems.',
    category: 'DSA Mastery',
    tier: 'Diamond',
    icon: '🔮',
    xpReward: 300,
    conditionDescription: 'Solve 1D or 2D Dynamic Programming challenges.',
  },
  {
    id: 'badge-80-brainstormers',
    title: 'Python DSA Grandmaster',
    description: 'Conquered brainstormer problems across all 8 Python worlds.',
    category: 'DSA Mastery',
    tier: 'Legendary',
    icon: '🐍',
    xpReward: 500,
    conditionDescription: 'Solve at least 20 Python Brainstormers.',
  },

  // 4. Web Dev Universe (5 Books)
  {
    id: 'badge-html-semantic',
    title: 'HTML5 Semantic Architect',
    description: 'Structured modern accessible layouts using pure HTML semantics.',
    category: 'Web Dev Universe',
    tier: 'Bronze',
    icon: '🌐',
    xpReward: 75,
    conditionDescription: 'Solve HTML Comic build problems.',
  },
  {
    id: 'badge-tailwind-v4',
    title: 'Tailwind Utility Ninja',
    description: 'Crafted sleek responsive layouts with modern utility classes.',
    category: 'Web Dev Universe',
    tier: 'Silver',
    icon: '🎨',
    xpReward: 100,
    conditionDescription: 'Solve Tailwind build challenges.',
  },
  {
    id: 'badge-react-hooks',
    title: 'React Hook Virtuoso',
    description: 'Built reactive UIs with useState, useEffect, and custom hooks.',
    category: 'Web Dev Universe',
    tier: 'Gold',
    icon: '⚛️',
    xpReward: 150,
    conditionDescription: 'Solve React build problems in the compiler.',
  },
  {
    id: 'badge-ts-strict',
    title: 'TypeScript Type Wizard',
    description: 'Narrowed complex unions and generics without using "any".',
    category: 'Web Dev Universe',
    tier: 'Diamond',
    icon: '🛡️',
    xpReward: 200,
    conditionDescription: 'Solve TypeScript type challenges.',
  },

  // 5. SQL & Prisma
  {
    id: 'badge-sql-ninja',
    title: 'PostgreSQL Query Samurai',
    description: 'Executed multi-table JOINs, subqueries, and window functions.',
    category: 'SQL & Prisma',
    tier: 'Silver',
    icon: '💾',
    xpReward: 120,
    conditionDescription: 'Solve 5 or more SQL belt challenges.',
  },
  {
    id: 'badge-prisma-v7',
    title: 'Prisma Schema Architect',
    description: 'Modeled relational schemas and migrations with Prisma v7.',
    category: 'SQL & Prisma',
    tier: 'Gold',
    icon: '🔺',
    xpReward: 200,
    conditionDescription: 'Complete Prisma Quest Level challenges.',
  },

  // 6. Linear Algebra
  {
    id: 'badge-pivot-finder',
    title: 'Gauss Eliminator',
    description: 'Calculated row multipliers and reduced systems to clean RREF.',
    category: 'Linear Algebra',
    tier: 'Bronze',
    icon: '🤖',
    xpReward: 80,
    conditionDescription: 'Run Gaussian Elimination in the Matrix Studio.',
  },
  {
    id: 'badge-four-subspaces',
    title: 'Four Subspaces Master',
    description: 'Mastered the complete geometric duality of row, column & null spaces.',
    category: 'Linear Algebra',
    tier: 'Gold',
    icon: '📐',
    xpReward: 250,
    conditionDescription: 'Master Chapter 20 of Linear Algebra.',
  },
  {
    id: 'badge-teach-star',
    title: 'Peer Teacher (5 Stars)',
    description: 'Earned 5 golden teaching stars on the Linear Algebra mastery tracker.',
    category: 'Linear Algebra',
    tier: 'Diamond',
    icon: '⭐',
    xpReward: 300,
    conditionDescription: 'Mark 5 chapters as "Can Teach It" on Page 90.',
  },

  // 7. Boss & Combat
  {
    id: 'badge-bughunt',
    title: 'Bugsy Exterminator',
    description: 'Tracked down and crushed Bugsy sabotage bugs in the arena.',
    category: 'Boss & Combat',
    tier: 'Silver',
    icon: '🐛',
    xpReward: 150,
    conditionDescription: 'Vanquish Bugsy in Bug Hunt Arena.',
  },
  {
    id: 'badge-boss',
    title: 'Grand Boss Slayer',
    description: 'Vanquished the Exam Boss in an epic coding showdown.',
    category: 'Boss & Combat',
    tier: 'Legendary',
    icon: '👑',
    xpReward: 500,
    conditionDescription: 'Defeat the final boss battle.',
  },
];
