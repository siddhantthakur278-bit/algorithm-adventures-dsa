import { supabase, isSupabaseConfigured } from './supabaseClient';
import { queryProfessorAI } from './aiService';

export interface ChatChannel {
  id: string;
  name: string;
  topic: string;
  category: 'DSA' | 'Contests' | 'Interviews' | 'System Design';
  unreadCount?: number;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderHandle: string;
  senderDisplayName: string;
  senderAvatarUrl?: string;
  senderRole?: 'Adventurer' | 'Grandmaster' | 'Master' | 'Byte AI' | 'Professor AI';
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  audioNoteUrl?: string;
  audioDurationSeconds?: number;
  timestamp: string;
  reactions: Record<string, number>;
  isAiResponse?: boolean;
}

export const CHAT_CHANNELS: ChatChannel[] = [
  {
    id: 'general-dsa',
    name: 'general-dsa',
    topic: 'Global developer sanctuary: data structures, algorithmic puzzles & study sessions',
    category: 'DSA',
  },
  {
    id: 'potd-solutions',
    name: 'potd-solutions',
    topic: '5:00 AM POTD approaches, proofs, O(1) space optimizations & peer reviews',
    category: 'DSA',
  },
  {
    id: 'codeforces-cp',
    name: 'codeforces-cp',
    topic: 'Contest discussions, Div 2/3 speed strategies, Segment Trees & rating climb',
    category: 'Contests',
  },
  {
    id: 'system-design',
    name: 'system-design',
    topic: 'Distributed caching, Rate limiting, Raft consensus & high-scale architecture',
    category: 'System Design',
  },
  {
    id: 'mock-interviews',
    name: 'mock-interviews',
    topic: 'FAANG mock pairings, whiteboard communication & behavioral interview tips',
    category: 'Interviews',
  },
];

const SEED_MESSAGES: Record<string, ChatMessage[]> = {
  'general-dsa': [
    {
      id: 'gen-1',
      channelId: 'general-dsa',
      senderHandle: 'tourist_fan',
      senderDisplayName: 'Gennady Tribute',
      senderRole: 'Grandmaster',
      content: 'Welcome everyone! Reminder: when dealing with two-pointers or sliding windows, always double check boundary conditions on empty arrays!',
      timestamp: 'Today at 10:14 AM',
      reactions: { '🔥': 7, '💡': 4 },
    },
    {
      id: 'gen-2',
      channelId: 'general-dsa',
      senderHandle: 'neo_matrix',
      senderDisplayName: 'Neo Matrix',
      senderRole: 'Master',
      content: 'Just solved the DP knapsack variation with rolling arrays to reduce memory from O(N*W) to O(W). The speedup in Wasm is insane!',
      timestamp: 'Today at 11:30 AM',
      reactions: { '🚀': 5, '👍': 8 },
    },
    {
      id: 'gen-3',
      channelId: 'general-dsa',
      senderHandle: 'byte_sorcerer',
      senderDisplayName: 'Aarav Patel',
      senderRole: 'Adventurer',
      content: 'Hey guys! You can now use the microphone button in the input bar to voice-type your questions, or click the speaker icon on any message to listen to it read aloud! 🎙️🔊',
      timestamp: 'Today at 12:05 PM',
      reactions: { '❤️': 12, '🔥': 9 },
    },
  ],
  'potd-solutions': [
    {
      id: 'potd-1',
      channelId: 'potd-solutions',
      senderHandle: 'sakura_algo',
      senderDisplayName: 'Sakura Tanaka',
      senderRole: 'Grandmaster',
      content: 'For today\'s Two Sum, notice how storing seen values in a dictionary gives an instant O(1) average lookup instead of O(N^2) brute force:',
      codeSnippet: {
        language: 'python',
        code: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
      },
      timestamp: 'Today at 5:02 AM',
      reactions: { '🔥': 15, '💡': 11 },
    },
  ],
  'codeforces-cp': [
    {
      id: 'cf-1',
      channelId: 'codeforces-cp',
      senderHandle: 'tourist_fan',
      senderDisplayName: 'Gennady Tribute',
      senderRole: 'Grandmaster',
      content: 'Codeforces Round 990 is coming up this weekend! Who wants to form a virtual contest study group in the 1v1 Code Duel arena?',
      timestamp: 'Yesterday at 8:40 PM',
      reactions: { '🚀': 6, '👍': 10 },
    },
  ],
  'system-design': [
    {
      id: 'sd-1',
      channelId: 'system-design',
      senderHandle: 'lucas_dsa',
      senderDisplayName: 'Lucas Silva',
      senderRole: 'Master',
      content: 'Quick architecture poll: for rate limiters with high write throughput, do you prefer Redis Token Bucket or Leaky Bucket with sliding logs?',
      timestamp: 'Today at 9:15 AM',
      reactions: { '💡': 8 },
    },
  ],
  'mock-interviews': [
    {
      id: 'int-1',
      channelId: 'mock-interviews',
      senderHandle: 'elena_byte',
      senderDisplayName: 'Elena Rostova',
      senderRole: 'Adventurer',
      content: 'Finished a Google L4 mock interview today! Key takeaway: clarify all constraints (negative values, integer overflows, duplicates) BEFORE writing a single line of code.',
      timestamp: 'Today at 2:20 PM',
      reactions: { '🎯': 9, '👏': 14 },
    },
  ],
};

const STORAGE_PREFIX = 'ada_chat_messages_';

/**
 * Load channel messages from local cache and seed defaults
 */
export function getChannelMessages(channelId: string): ChatMessage[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${channelId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}

  const defaults = SEED_MESSAGES[channelId] || [];
  saveChannelMessages(channelId, defaults);
  return defaults;
}

/**
 * Save messages to local cache
 */
export function saveChannelMessages(channelId: string, messages: ChatMessage[]): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${channelId}`, JSON.stringify(messages));
  } catch {}
}

/**
 * Subscribe to Supabase real-time broadcast messages
 */
export function subscribeToRealtimeChat(
  channelId: string,
  onMessageReceived: (message: ChatMessage) => void
): () => void {
  if (!isSupabaseConfigured || !supabase) {
    return () => {};
  }

  try {
    const realtimeChannel = supabase.channel(`ada-chat-${channelId}`, {
      config: {
        broadcast: { ack: true },
      },
    });

    realtimeChannel
      .on('broadcast', { event: 'new-message' }, (payload: any) => {
        if (payload?.payload && payload.payload.channelId === channelId) {
          onMessageReceived(payload.payload as ChatMessage);
        }
      })
      .subscribe();

    return () => {
      supabase?.removeChannel(realtimeChannel);
    };
  } catch (err) {
    console.warn('Realtime chat subscribe fallback:', err);
    return () => {};
  }
}

/**
 * Broadcast message to other active peers on the web via Supabase
 */
export async function broadcastChatMessage(message: ChatMessage): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    return;
  }

  try {
    const realtimeChannel = supabase.channel(`ada-chat-${message.channelId}`);
    await realtimeChannel.send({
      type: 'broadcast',
      event: 'new-message',
      payload: message,
    });
  } catch (err) {
    console.warn('Could not broadcast message via Supabase:', err);
  }
}

/**
 * Handle AI Assistant Auto-Reply if mentioned in chat (@Professor or @Byte or @ai)
 */
export async function checkAndTriggerAiReply(
  channelId: string,
  incomingContent: string,
  onAiMessage: (message: ChatMessage) => void
): Promise<void> {
  const lower = incomingContent.toLowerCase();
  const isAiTriggered =
    lower.includes('@professor') ||
    lower.includes('@byte') ||
    lower.includes('@ai') ||
    lower.startsWith('/ai') ||
    lower.includes('explain') ||
    lower.includes('help');

  if (!isAiTriggered) return;

  try {
    const isProfessor = lower.includes('@professor') || !lower.includes('@byte');
    const speaker = isProfessor ? 'Professor AI' : 'Byte AI';
    const handle = isProfessor ? 'professor_ai' : 'byte_ai';

    const aiPrompt = `You are ${speaker} responding in the competitive coding community chat channel #${channelId}. 
A fellow student asked:
"${incomingContent}"

Keep your response friendly, concise, technically rigorous, under 3-4 sentences. Include time/space complexity or code snippets if relevant.`;

    const aiReplyText = await queryProfessorAI(aiPrompt, {
      problem: {
        id: 100,
        title: 'Community Chat Discussion',
        difficulty: 'Medium',
        category: 'Algorithms',
        starterCode: '',
        testCases: [],
      } as any,
      userCode: incomingContent,
    });

    const aiMessage: ChatMessage = {
      id: `ai-${Date.now()}`,
      channelId,
      senderHandle: handle,
      senderDisplayName: speaker,
      senderRole: isProfessor ? 'Professor AI' : 'Byte AI',
      content: aiReplyText,
      timestamp: 'Just now',
      reactions: { '💡': 1, '🤖': 1 },
      isAiResponse: true,
    };

    onAiMessage(aiMessage);
  } catch (e) {
    console.warn('AI reply generation warning:', e);
  }
}
