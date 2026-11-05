import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Zap,
  Code2,
  Copy,
  Check,
  RotateCcw,
  ShieldAlert,
} from 'lucide-react';
import {
  ByteAvatar,
  ProfessorAvatar,
  BugsyAvatar,
  ComicBubble,
} from '../characters/Characters';
import { sound } from '../../utils/soundEffects';

interface Message {
  id: string;
  sender: 'user' | 'byte' | 'professor' | 'bugsy';
  text: string;
  codeSnippet?: string;
  timestamp: string;
}

export const AiMentorDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activePersona, setActivePersona] = useState<'byte' | 'professor' | 'bugsy'>('byte');
  const [inputQuestion, setInputQuestion] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'byte',
      text: "Beep boop! 👋 I'm Byte, your AI coding co-pilot! How can I help you conquer today's algorithmic quest or debug your code?",
      timestamp: '16:30',
    },
    {
      id: 'm-2',
      sender: 'professor',
      text: 'Greetings, scholar. Remember: always analyze your loop invariants and time-space constraints before putting ink to code!',
      timestamp: '16:30',
    },
  ]);

  const quickPrompts = [
    'Explain Two Sum: Hash Map vs Nested Loops',
    'How do Two Pointers achieve O(1) space?',
    'Why does Binary Search divide by 2?',
    'What edge cases usually trigger Bugsy glitches?',
  ];

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputQuestion.trim();
    if (!textToSend) return;

    sound.playPop();
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsThinking(true);

    // Simulated / Gemini API generation
    setTimeout(() => {
      let replyText = '';
      let snippet: string | undefined = undefined;

      if (activePersona === 'byte') {
        if (textToSend.toLowerCase().includes('two sum')) {
          replyText =
            "POW! 💥 In Two Sum, brute force checks all pairs $O(N^2)$. But with a Hash Map, as you iterate, you calculate `complement = target - num`. If `complement` is in your map, BOOM: you solved it in one pass $O(N)$!";
          snippet =
            "def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []";
        } else if (textToSend.toLowerCase().includes('two pointer')) {
          replyText =
            "Two pointers work like two pincers moving inward! Left starts at 0, Right starts at len-1. Because the array is sorted, if sum < target, increment left. If sum > target, decrement right. Zero extra memory $O(1)$ space!";
        } else {
          replyText = `Great question! Here's Byte's golden tip: always write out a 3-element example on paper first. Watch out for off-by-one errors on array indices!`;
        }
      } else if (activePersona === 'professor') {
        replyText = `Under rigorous asymptotic analysis: the divide-and-conquer recurrence relation is given by $T(N) = T(N/2) + O(1)$. By the Master Theorem (Case 2), this yields $O(\\log N)$ time. Invariant verification guarantees termination in strictly $\\lfloor\\log_2 N\\rfloor + 1$ iterations.`;
        snippet = "# Formal Invariant: target in nums[low..high]\nwhile low <= high:\n    mid = (low + high) >> 1\n    if nums[mid] == target:\n        return mid";
      } else {
        // Bugsy
        replyText = `Hehehe! 👾 You think your solution works?! Did you test: 1) Empty array []? 2) All negative numbers? 3) Array with 1 element? 4) Integer overflow? I love injecting IndexErrors into unchecked bounds!`;
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: activePersona,
        text: replyText,
        codeSnippet: snippet,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsThinking(false);
      sound.playSuccess();
    }, 900);
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    sound.playPop();
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating Quick Dock Button */}
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
          sound.playPop();
        }}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider border-3 border-black shadow-comic-lg flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950"></span>
        </span>
        <MessageSquare className="w-4 h-4 fill-current" />
        <span>Ask AI Mentors Live</span>
      </button>

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-50 w-[95vw] sm:w-[420px] max-h-[640px] h-[80vh] bg-[#0c101d] border-4 border-black rounded-3xl shadow-comic-lg flex flex-col overflow-hidden text-slate-100 animate-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#171f38] via-[#1f2a4c] to-[#171f38] border-b-2 border-black flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <h3 className="font-bangers text-lg text-white leading-tight">AI MENTOR SANCTUARY</h3>
                <p className="text-[10px] text-amber-400 font-mono">Real-time Code &amp; Concept Explanations</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Persona Switcher Tabs */}
          <div className="grid grid-cols-3 p-1.5 bg-[#080b14] border-b border-[#1c243a] text-xs font-bold">
            <button
              onClick={() => {
                setActivePersona('byte');
                sound.playPop();
              }}
              className={`py-1.5 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activePersona === 'byte'
                  ? 'bg-amber-400 text-slate-950 border border-black shadow-comic-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🤖</span> Byte (Co-Pilot)
            </button>
            <button
              onClick={() => {
                setActivePersona('professor');
                sound.playPop();
              }}
              className={`py-1.5 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activePersona === 'professor'
                  ? 'bg-amber-400 text-slate-950 border border-black shadow-comic-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🧙</span> Professor
            </button>
            <button
              onClick={() => {
                setActivePersona('bugsy');
                sound.playPop();
              }}
              className={`py-1.5 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activePersona === 'bugsy'
                  ? 'bg-rose-500 text-white border border-black shadow-comic-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>👾</span> Bugsy
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                  <div className="shrink-0 text-lg">
                    {isUser ? (
                      '👤'
                    ) : m.sender === 'byte' ? (
                      <ByteAvatar size="sm" mood="happy" />
                    ) : m.sender === 'professor' ? (
                      <ProfessorAvatar size="sm" mood="wise" />
                    ) : (
                      <BugsyAvatar size="sm" mood="sneaky" />
                    )}
                  </div>

                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed space-y-2 border ${
                      isUser
                        ? 'bg-amber-400 text-slate-950 font-medium border-slate-950 rounded-tr-none'
                        : 'bg-[#12182c] text-slate-200 border-[#1f2946] rounded-tl-none'
                    }`}
                  >
                    <p>{m.text}</p>
                    {m.codeSnippet && (
                      <div className="relative pt-1 font-mono text-[11px] bg-[#070912] p-2.5 rounded-xl border border-slate-700 text-emerald-300">
                        <button
                          onClick={() => handleCopyCode(m.id, m.codeSnippet!)}
                          className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white text-[9px] flex items-center gap-1 border border-slate-700"
                        >
                          {copiedId === m.id ? (
                            <>
                              <Check className="w-2.5 h-2.5 text-emerald-400" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-2.5 h-2.5" /> Copy
                            </>
                          )}
                        </button>
                        <pre className="overflow-x-auto">{m.codeSnippet}</pre>
                      </div>
                    )}
                    <span className="text-[9px] text-slate-400 block text-right font-mono">
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isThinking && (
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono animate-pulse">
                <span>🤖</span> {activePersona.toUpperCase()} is analyzing invariants...
              </div>
            )}
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-1.5 bg-[#090c16] border-t border-[#1a2238] flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="px-2 py-1 rounded-lg bg-[#141b30] hover:bg-[#1e2848] text-slate-300 hover:text-white text-[10px] whitespace-nowrap border border-[#222e50] cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-[#0d1222] border-t-2 border-black flex items-center gap-2">
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Ask ${activePersona === 'byte' ? 'Byte' : activePersona === 'professor' ? 'Professor' : 'Bugsy'} anything...`}
              className="flex-1 bg-[#060810] border border-[#1e2744] focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white outline-none font-sans"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputQuestion.trim() || isThinking}
              className="p-2 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-bold transition cursor-pointer border border-black shadow-comic-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
