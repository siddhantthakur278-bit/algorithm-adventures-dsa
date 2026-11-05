import React, { useState, useEffect } from 'react';
import { useCourse } from '../../context/CourseContext';
import {
  Briefcase,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Award,
  Send,
  HelpCircle,
  Shield,
  FileCheck,
  ChevronRight,
  TrendingUp,
  Cpu,
} from 'lucide-react';
import { ProfessorAvatar, ByteAvatar, BugsyAvatar, ComicBubble } from '../characters/Characters';
import { sound } from '../../utils/soundEffects';
import { UniversalVSCodeEditor } from '../common/UniversalVSCodeEditor';
import confetti from 'canvas-confetti';

interface InterviewMessage {
  id: string;
  sender: 'interviewer' | 'candidate';
  text: string;
  timestamp: string;
  tag?: 'clarification' | 'approach' | 'hint' | 'feedback';
}

export const TechnicalInterviewRoom: React.FC = () => {
  const { addXP, triggerBurst } = useCourse();

  // Settings
  const [targetCompany, setTargetCompany] = useState<'Google' | 'Meta' | 'Amazon' | 'OpenAI'>('Google');
  const [interviewerPersona, setInterviewerPersona] = useState<'algorismus' | 'byte' | 'bugsy'>('algorismus');

  // Stages: 1=Clarify, 2=Approach, 3=Code, 4=Debrief & Scorecard
  const [interviewStage, setInterviewStage] = useState<1 | 2 | 3 | 4>(1);

  // Timer: 45 min
  const [secondsRemaining, setSecondsRemaining] = useState<number>(45 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Communication Dialog
  const [candidateInput, setCandidateInput] = useState<string>('');
  const [messages, setMessages] = useState<InterviewMessage[]>([
    {
      id: 'm-0',
      sender: 'interviewer',
      text: "Welcome! Today we'll be evaluating an algorithmic design challenge: 'Find the Length of the Longest Substring with At Most K Distinct Characters'. Before writing any code, what clarifying questions do you have regarding constraints and inputs?",
      timestamp: '00:00',
      tag: 'clarification',
    },
  ]);

  // Scores
  const [scores, setScores] = useState({
    problemSolving: 4.8,
    communication: 4.6,
    codeQuality: 4.7,
    edgeCases: 4.9,
  });

  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Timer Tick
  useEffect(() => {
    let t: number | null = null;
    if (isTimerRunning && secondsRemaining > 0) {
      t = window.setInterval(() => {
        setSecondsRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (t) clearInterval(t);
    };
  }, [isTimerRunning, secondsRemaining]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSendClarification = (customQuestion?: string) => {
    const q = customQuestion || candidateInput.trim();
    if (!q) return;

    sound.playPop();
    const candidateMsg: InterviewMessage = {
      id: `c-${Date.now()}`,
      sender: 'candidate',
      text: q,
      timestamp: formatTimer(45 * 60 - secondsRemaining),
    };

    setMessages((prev) => [...prev, candidateMsg]);
    setCandidateInput('');

    // Interviewer reply
    setTimeout(() => {
      let reply = '';
      if (q.toLowerCase().includes('empty') || q.toLowerCase().includes('k=0')) {
        reply = 'Excellent question! If the string is empty or K == 0, the output should immediately be 0.';
      } else if (q.toLowerCase().includes('space') || q.toLowerCase().includes('memory')) {
        reply = 'Memory constraint: aim for O(K) auxiliary space for your character frequency tracker.';
      } else if (q.toLowerCase().includes('size') || q.toLowerCase().includes('n <=') || q.toLowerCase().includes('length')) {
        reply = 'Constraints: string length N <= 10^5, K <= 50. Lowercase English letters only. Quadratic O(N^2) will TLE!';
      } else {
        reply = "Good clarification. Assume standard 8-bit ASCII characters. How would you structure your optimal approach to achieve O(N) time?";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `i-${Date.now()}`,
          sender: 'interviewer',
          text: reply,
          timestamp: formatTimer(45 * 60 - secondsRemaining),
          tag: 'hint',
        },
      ]);
      sound.playSuccess();
    }, 800);
  };

  const finishInterview = () => {
    setIsFinished(true);
    setInterviewStage(4);
    setIsTimerRunning(false);
    sound.playFanfare();
    addXP(150);
    triggerBurst('🏆 INTERVIEW PASSED!', 'Recommendation: STRONG HIRE! +150 XP', 'boom');
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#12162a] via-[#1b2342] to-[#12162a] border-3 border-black shadow-comic-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider border border-black shadow-comic-sm flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> FAANG Interview Simulation
            </span>
            <span className="text-xs text-amber-300 font-bold">{targetCompany} Senior SWE Evaluation</span>
            <span className="text-slate-500">•</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">Standard 45-Min Format</span>
          </div>

          <h1 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
            FAANG TECHNICAL CODING INTERVIEW ROOM
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Experience realistic technical interviews with live algorithmic problem formulation, clarifying constraint questions, real-time code review, and a formal hiring scorecard.
          </p>
        </div>

        {/* Live Interview Clock & Controls */}
        <div className="flex items-center gap-3 bg-[#0a0d18] p-4 rounded-2xl border border-slate-700">
          <div className="text-right font-mono">
            <span className="text-[10px] text-slate-400 block uppercase font-sans">Interview Clock</span>
            <span
              className={`text-2xl sm:text-3xl font-black ${
                secondsRemaining < 300 ? 'text-rose-400 animate-pulse' : 'text-amber-300'
              }`}
            >
              {formatTimer(secondsRemaining)}
            </span>
          </div>

          <button
            onClick={() => {
              setIsTimerRunning(!isTimerRunning);
              sound.playPop();
            }}
            className="p-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black border border-black shadow-comic-sm cursor-pointer"
          >
            {isTimerRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
        </div>
      </div>

      {/* Target Company & Interviewer Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#0b0e1b] border-2 border-black shadow-comic">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 font-mono">Company Track:</span>
          {(['Google', 'Meta', 'Amazon', 'OpenAI'] as const).map((comp) => (
            <button
              key={comp}
              onClick={() => {
                setTargetCompany(comp);
                sound.playPop();
              }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer border ${
                targetCompany === comp
                  ? 'bg-amber-400 text-slate-950 border-black shadow-comic-sm font-black'
                  : 'bg-[#12182b] text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              {comp}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 font-mono">Interviewer:</span>
          {[
            { id: 'algorismus', name: 'Prof. Algorismus (Staff)', icon: '🧙' },
            { id: 'byte', name: 'Byte (Senior TL)', icon: '🤖' },
            { id: 'bugsy', name: 'Bugsy (Edge-Case Cop)', icon: '👾' },
          ].map((int) => (
            <button
              key={int.id}
              onClick={() => {
                setInterviewerPersona(int.id as any);
                sound.playPop();
              }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer border flex items-center gap-1.5 ${
                interviewerPersona === int.id
                  ? 'bg-amber-400 text-slate-950 border-black shadow-comic-sm font-black'
                  : 'bg-[#12182b] text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <span>{int.icon}</span>
              <span>{int.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4-Stage Stepper Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {[
          { num: 1, title: 'Clarify & Scope', time: '5 min' },
          { num: 2, title: 'Approach & Big-O', time: '10 min' },
          { num: 3, title: 'Live Implementation', time: '25 min' },
          { num: 4, title: 'Evaluation Scorecard', time: '5 min' },
        ].map((s) => (
          <button
            key={s.num}
            onClick={() => {
              setInterviewStage(s.num as any);
              sound.playPop();
            }}
            className={`p-3 rounded-xl border-2 text-left transition cursor-pointer flex items-center justify-between ${
              interviewStage === s.num
                ? 'bg-[#18213e] border-amber-400 shadow-comic-yellow text-white font-bold'
                : 'bg-[#0f1424] border-[#1c243c] text-slate-400 hover:text-white'
            }`}
          >
            <div>
              <span className="text-[10px] font-mono text-amber-400 block">Stage {s.num} ({s.time})</span>
              <span className="text-xs font-black">{s.title}</span>
            </div>
            {interviewStage > s.num && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          </button>
        ))}
      </div>

      {/* STAGE 1 & 2: Clarification & Approach Discussion */}
      {(interviewStage === 1 || interviewStage === 2) && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Problem Brief (5 Cols) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0c101d] border-2 border-black shadow-comic space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                Challenge Formulation
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                Medium (Target O(N))
              </span>
            </div>

            <h3 className="font-bangers text-2xl text-white">
              LONGEST SUBSTRING WITH AT MOST K DISTINCT CHARACTERS
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Given a string <code className="text-amber-400">s</code> and an integer <code className="text-amber-400">k</code>, return the length of the longest substring of <code className="text-amber-400">s</code> that contains at most <code className="text-amber-400">k</code> distinct characters.
            </p>

            <div className="p-3.5 rounded-xl bg-[#070a14] border border-[#1b233a] font-mono text-xs text-slate-300 space-y-1">
              <div><strong>Input:</strong> s = "eceba", k = 2</div>
              <div><strong>Output:</strong> 3 (Substring: "ece")</div>
              <div><strong>Constraint:</strong> 1 &le; s.length &le; 10^5, 0 &le; k &le; 50</div>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider font-mono">Suggested Clarifying Questions:</span>
              <div className="flex flex-col gap-1.5">
                {[
                  "What should we return if k = 0 or s is empty?",
                  "Can the string contain uppercase letters or spaces?",
                  "Are there strict memory constraints on auxiliary maps?",
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendClarification(q)}
                    className="p-2 rounded-lg bg-[#141b30] hover:bg-[#1f294a] text-slate-300 hover:text-white text-left text-[11px] border border-[#222e50] cursor-pointer"
                  >
                    💬 "{q}"
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setInterviewStage(3);
                sound.playSuccess();
              }}
              className="w-full btn-comic-push py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider border border-black shadow-comic flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Approach Aligned ➔ Start Coding in Stage 3</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interviewer Chat Stream (7 Cols) */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0c101d] border-2 border-black shadow-comic flex flex-col justify-between h-[520px]">
            <div className="flex items-center justify-between pb-3 border-b border-[#1b233a]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="font-bangers text-lg text-white">INTERVIEW LOG &amp; TRANSCRIPT</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Real-time Feedback</span>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-3 font-sans pr-1">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${m.sender === 'candidate' ? 'flex-row-reverse' : ''}`}
                >
                  <div className="text-xl shrink-0">
                    {m.sender === 'candidate' ? (
                      '👤'
                    ) : interviewerPersona === 'algorismus' ? (
                      <ProfessorAvatar size="sm" mood="wise" />
                    ) : interviewerPersona === 'byte' ? (
                      <ByteAvatar size="sm" mood="happy" />
                    ) : (
                      <BugsyAvatar size="sm" mood="sneaky" />
                    )}
                  </div>

                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed border ${
                      m.sender === 'candidate'
                        ? 'bg-amber-400 text-slate-950 font-semibold border-slate-950 rounded-tr-none'
                        : 'bg-[#13192f] text-slate-200 border-[#1f2848] rounded-tl-none'
                    }`}
                  >
                    <p>{m.text}</p>
                    <span className="text-[9px] text-slate-400 font-mono block text-right mt-1">
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="pt-3 border-t border-[#1b233a] flex items-center gap-2">
              <input
                type="text"
                value={candidateInput}
                onChange={(e) => setCandidateInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendClarification()}
                placeholder="Ask your interviewer a clarifying question..."
                className="flex-1 bg-[#060810] border border-[#1e2744] focus:border-amber-400 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
              />
              <button
                onClick={() => handleSendClarification()}
                className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold border border-black shadow-comic-sm cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: Live Coding in VS Code */}
      {interviewStage === 3 && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#0b0e1b] border-2 border-black shadow-comic flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-bangers text-lg text-white">STAGE 3: LIVE CODING IMPLEMENTATION</h3>
                <p className="text-xs text-slate-400">Implement the optimal O(N) sliding window solution with test cases.</p>
              </div>
            </div>

            <button
              onClick={finishInterview}
              className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider border border-black shadow-comic cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" /> Complete Interview &amp; Generate Scorecard
            </button>
          </div>

          <UniversalVSCodeEditor
            language="python"
            starterCode={`# FAANG Interview Problem: Longest Substring with At Most K Distinct Characters
# Optimal: O(N) Time, O(K) Space (Sliding Window + Frequency Map)

def length_of_longest_substring_k_distinct(s: str, k: int) -> int:
    if k == 0 or not s:
        return 0
        
    counts = {}
    left = 0
    max_len = 0
    
    for right in range(len(s)):
        char = s[right]
        counts[char] = counts.get(char, 0) + 1
        
        while len(counts) > k:
            left_char = s[left]
            counts[left_char] -= 1
            if counts[left_char] == 0:
                del counts[left_char]
            left += 1
            
        max_len = max(max_len, right - left + 1)
        
    return max_len

# Test Cases:
print("Test 1 (eceba, k=2):", length_of_longest_substring_k_distinct("eceba", 2)) # Expected: 3
print("Test 2 (aa, k=1):", length_of_longest_substring_k_distinct("aa", 1))       # Expected: 2
`}
            solutionCode={`def length_of_longest_substring_k_distinct(s: str, k: int) -> int:
    if k == 0 or not s:
        return 0
    counts = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        counts[char] = counts.get(char, 0) + 1
        while len(counts) > k:
            left_char = s[left]
            counts[left_char] -= 1
            if counts[left_char] == 0:
                del counts[left_char]
            left += 1
        max_len = max(max_len, right - left + 1)
    return max_len
`}
            problemTitle="Longest Substring with At Most K Distinct Characters"
            problemId="mock-faang-1"
            fileName="faang_interview_solution.py"
          />
        </div>
      )}

      {/* STAGE 4: Official FAANG Hiring Packet Scorecard */}
      {interviewStage === 4 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0c101d] border-3 border-black shadow-comic-lg space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Official Hiring Packet
              </span>
              <h2 className="font-bangers text-3xl sm:text-4xl text-white">
                CANDIDATE TECHNICAL EVALUATION REPORT
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Candidate Track: Siddhant Thakur • Role: Senior Software Engineer (L5 / E5) • Company: {targetCompany}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500/50 text-center">
              <span className="text-[10px] uppercase font-mono text-emerald-300 font-bold block">Final Decision</span>
              <div className="text-2xl font-bangers text-emerald-400">STRONG HIRE (L5)</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Problem Solving', score: scores.problemSolving, desc: 'Identified optimal O(N) sliding window without prompting.' },
              { label: 'Communication', score: scores.communication, desc: 'Proactive clarification on k=0 and ASCII constraints.' },
              { label: 'Code Cleanliness', score: scores.codeQuality, desc: 'Proper dictionary pruning and descriptive pointer naming.' },
              { label: 'Invariants & Edges', score: scores.edgeCases, desc: 'Guarded while loop invariant len(counts) <= k rigorously.' },
            ].map((cat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#0f1424] border border-[#1c243a] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{cat.label}</span>
                  <span className="font-mono text-sm font-black text-amber-400">{cat.score} / 5.0</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-emerald-400 h-full rounded-full"
                    style={{ width: `${(cat.score / 5) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">{cat.desc}</p>
              </div>
            ))}
          </div>

          {/* Qualitative Written Summary */}
          <div className="p-5 rounded-2xl bg-[#090d18] border border-[#1b233a] space-y-2 text-xs text-slate-300">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono">
              Debrief Written Feedback from {interviewerPersona.toUpperCase()}:
            </h4>
            <p className="leading-relaxed font-sans">
              "The candidate exhibited exceptional algorithmic maturity. Rather than jumping into code, they accurately scoped edge cases (empty strings, zero distinct character thresholds). When executing the sliding window, they correctly reasoned about both worst-case $O(N)$ amortized iteration and $O(K)$ space. Recommend proceeding with senior offer packet."
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => {
                window.print();
                sound.playPop();
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 cursor-pointer"
            >
              Export Report Card (PDF)
            </button>
            <button
              onClick={() => {
                setInterviewStage(1);
                setSecondsRemaining(45 * 60);
                setIsFinished(false);
                sound.playPop();
              }}
              className="btn-comic-push px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider border border-black shadow-comic cursor-pointer"
            >
              Start New Mock Interview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
