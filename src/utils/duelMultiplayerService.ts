import { supabase, isSupabaseConfigured } from './supabaseClient';
import { getStoredUserProfile } from './universalLeaderboardService';

export interface DuelPlayer {
  id: string;
  handle: string;
  displayName: string;
  rating: number;
  hp: number;
  testCasesPassed: number;
  totalTestCases: number;
  linesCount: number;
  charCount: number;
  isReady: boolean;
  hasFinished: boolean;
  finishTimeSeconds?: number;
}

export interface DuelProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  starterCode: string;
  solutionCode: string;
  testCases: { input: string; expectedOutput: string; hidden?: boolean }[];
  bugsyBuggyCode: string;
}

export const MULTIPLAYER_DUEL_PROBLEMS: DuelProblem[] = [
  {
    id: 'duel-two-sum',
    title: 'Two Sum Lightning Strike',
    difficulty: 'Easy',
    category: 'Hash Map & Arrays',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Each input has exactly one solution, and you may not use the same element twice.',
    starterCode: `def two_sum(nums, target):\n    # Write an O(N) hash map solution\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))\n`,
    solutionCode: `def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []\n`,
    testCases: [
      { input: '[2, 7, 11, 15], 9', expectedOutput: '[0, 1]' },
      { input: '[3, 2, 4], 6', expectedOutput: '[1, 2]' },
      { input: '[3, 3], 6', expectedOutput: '[0, 1]' },
      { input: '[1, 5, 8, 3], 11', expectedOutput: '[2, 3]', hidden: true },
      { input: '[0, 4, 3, 0], 0', expectedOutput: '[0, 3]', hidden: true },
    ],
    bugsyBuggyCode: `def two_sum(nums, target):\n    for i in range(len(nums)):\n        for j in range(len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]\n`,
  },
  {
    id: 'duel-valid-parentheses',
    title: 'Valid Parentheses Barrier',
    difficulty: 'Medium',
    category: 'Stack',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. Open brackets must be closed by the same type of brackets in the correct order.',
    starterCode: `def is_valid(s):\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in mapping:\n            top_element = stack.pop() if stack else '#'\n            if mapping[char] != top_element:\n                return False\n        else:\n            stack.append(char)\n    return not stack\n\nprint(is_valid("()[]{}"))\n`,
    solutionCode: `def is_valid(s):\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in mapping:\n            top_element = stack.pop() if stack else '#'\n            if mapping[char] != top_element:\n                return False\n        else:\n            stack.append(char)\n    return not stack\n`,
    testCases: [
      { input: '"()[]{}"', expectedOutput: 'True' },
      { input: '"(]"', expectedOutput: 'False' },
      { input: '"([{}])"', expectedOutput: 'True' },
      { input: '"]"', expectedOutput: 'False' },
      { input: '""', expectedOutput: 'True', hidden: true },
    ],
    bugsyBuggyCode: `def is_valid(s):\n    return len(s) % 2 == 0\n`,
  },
  {
    id: 'duel-binary-search',
    title: 'Binary Search Overdrive',
    difficulty: 'Easy',
    category: 'Divide & Conquer',
    description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums in O(log n) runtime. If target exists, return its index. Otherwise, return -1.',
    starterCode: `def search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\nprint(search([-1, 0, 3, 5, 9, 12], 9))\n`,
    solutionCode: `def search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n`,
    testCases: [
      { input: '[-1, 0, 3, 5, 9, 12], 9', expectedOutput: '4' },
      { input: '[-1, 0, 3, 5, 9, 12], 2', expectedOutput: '-1' },
      { input: '[5], 5', expectedOutput: '0' },
      { input: '[1, 3, 5, 7, 9], 7', expectedOutput: '3', hidden: true },
    ],
    bugsyBuggyCode: `def search(nums, target):\n    left, right = 0, len(nums)\n    while left < right:\n        mid = (left + right) // 2\n        if nums[mid] == target: return mid\n`,
  },
  {
    id: 'duel-max-subarray',
    title: 'Kadane Max Subarray Rush',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum using Kadane's Algorithm in O(N) linear time.",
    starterCode: `def max_sub_array(nums):\n    max_sum = nums[0]\n    current_sum = 0\n    for n in nums:\n        current_sum = max(n, current_sum + n)\n        max_sum = max(max_sum, current_sum)\n    return max_sum\n\nprint(max_sub_array([-2,1,-3,4,-1,2,1,-5,4]))\n`,
    solutionCode: `def max_sub_array(nums):\n    max_sum = nums[0]\n    current_sum = 0\n    for n in nums:\n        current_sum = max(n, current_sum + n)\n        max_sum = max(max_sum, current_sum)\n    return max_sum\n`,
    testCases: [
      { input: '[-2, 1, -3, 4, -1, 2, 1, -5, 4]', expectedOutput: '6' },
      { input: '[1]', expectedOutput: '1' },
      { input: '[5, 4, -1, 7, 8]', expectedOutput: '23' },
      { input: '[-1, -2, -3]', expectedOutput: '-1', hidden: true },
    ],
    bugsyBuggyCode: `def max_sub_array(nums):\n    return sum(nums)\n`,
  },
];

export interface DuelRoomState {
  roomCode: string;
  problem: DuelProblem;
  host: DuelPlayer;
  guest?: DuelPlayer;
  status: 'waiting' | 'countdown' | 'in_progress' | 'finished';
  winnerId?: string;
  startedAt?: number;
}

/**
 * Generate a random 6-character duel room code
 */
export function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'DUEL-';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Creates the initial player state from current user profile
 */
export function createCurrentPlayerState(): DuelPlayer {
  const profile = getStoredUserProfile();
  return {
    id: profile.id || `p_${Date.now()}`,
    handle: profile.handle || 'adventurer',
    displayName: profile.displayName || 'Adventurer',
    rating: profile.totalXp || 1200,
    hp: 100,
    testCasesPassed: 0,
    totalTestCases: 4,
    linesCount: 0,
    charCount: 0,
    isReady: true,
    hasFinished: false,
  };
}

/**
 * Subscribe to a live Duel Room channel on Supabase
 */
export function subscribeToDuelRoom(
  roomCode: string,
  callbacks: {
    onPlayerJoined?: (player: DuelPlayer) => void;
    onPlayerProgress?: (progress: { playerId: string; linesCount: number; charCount: number; passedCases: number; hp: number }) => void;
    onPlayerFinished?: (result: { winnerId: string; timeTakenSeconds: number }) => void;
    onRematch?: () => void;
  }
): {
  broadcastJoin: (player: DuelPlayer) => Promise<void>;
  broadcastProgress: (progress: { playerId: string; linesCount: number; charCount: number; passedCases: number; hp: number }) => Promise<void>;
  broadcastFinish: (winnerId: string, timeTakenSeconds: number) => Promise<void>;
  broadcastRematch: () => Promise<void>;
  unsubscribe: () => void;
} {
  const channelName = `ada-duel-${roomCode.trim().toUpperCase()}`;

  if (!isSupabaseConfigured || !supabase) {
    return {
      broadcastJoin: async () => {},
      broadcastProgress: async () => {},
      broadcastFinish: async () => {},
      broadcastRematch: async () => {},
      unsubscribe: () => {},
    };
  }

  const channel = supabase.channel(channelName, {
    config: { broadcast: { ack: true } },
  });

  channel
    .on('broadcast', { event: 'player-joined' }, (payload: any) => {
      if (payload?.payload) {
        callbacks.onPlayerJoined?.(payload.payload as DuelPlayer);
      }
    })
    .on('broadcast', { event: 'player-progress' }, (payload: any) => {
      if (payload?.payload) {
        callbacks.onPlayerProgress?.(payload.payload);
      }
    })
    .on('broadcast', { event: 'player-finished' }, (payload: any) => {
      if (payload?.payload) {
        callbacks.onPlayerFinished?.(payload.payload);
      }
    })
    .on('broadcast', { event: 'rematch' }, () => {
      callbacks.onRematch?.();
    })
    .subscribe();

  return {
    broadcastJoin: async (player: DuelPlayer) => {
      try {
        await channel.send({
          type: 'broadcast',
          event: 'player-joined',
          payload: player,
        });
      } catch (e) {
        console.warn('Duel broadcast join fallback:', e);
      }
    },
    broadcastProgress: async (progress) => {
      try {
        await channel.send({
          type: 'broadcast',
          event: 'player-progress',
          payload: progress,
        });
      } catch (e) {
        console.warn('Duel broadcast progress fallback:', e);
      }
    },
    broadcastFinish: async (winnerId, timeTakenSeconds) => {
      try {
        await channel.send({
          type: 'broadcast',
          event: 'player-finished',
          payload: { winnerId, timeTakenSeconds },
        });
      } catch (e) {
        console.warn('Duel broadcast finish fallback:', e);
      }
    },
    broadcastRematch: async () => {
      try {
        await channel.send({
          type: 'broadcast',
          event: 'rematch',
          payload: {},
        });
      } catch (e) {
        console.warn('Duel broadcast rematch fallback:', e);
      }
    },
    unsubscribe: () => {
      supabase?.removeChannel(channel);
    },
  };
}
