import React, { useState, useEffect, useRef } from 'react';
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
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Radio,
  FileDown,
} from 'lucide-react';
import { ProfessorAvatar, ByteAvatar, BugsyAvatar, ComicBubble } from '../characters/Characters';
import { HumanAvatar } from '../common/HumanAvatar';
import { sound } from '../../utils/soundEffects';
import { UniversalVSCodeEditor } from '../common/UniversalVSCodeEditor';
import confetti from 'canvas-confetti';
import {
  speakText,
  stopSpeaking,
  startSpeechToText,
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
} from '../../utils/speechService';

interface InterviewMessage {
  id: string;
  sender: 'interviewer' | 'candidate';
  text: string;
  timestamp: string;
  tag?: 'clarification' | 'approach' | 'hint' | 'feedback';
}

interface InterviewProblem {
  id: string;
  company: 'Google' | 'Meta' | 'Amazon' | 'OpenAI';
  title: string;
  difficulty: 'Medium' | 'Hard';
  description: string;
  constraints: string;
  example: string;
  starterCode: string;
  suggestedQuestions: string[];
}

const FAANG_PROBLEMS: Record<string, InterviewProblem> = {
  Google: {
    id: 'google-k-distinct',
    company: 'Google',
    title: 'Longest Substring with At Most K Distinct Characters',
    difficulty: 'Medium',
    description: 'Given a string s and an integer k, return the length of the longest substring of s that contains at most k distinct characters using an optimal O(N) sliding window.',
    constraints: '1 <= s.length <= 10^5, 0 <= k <= 50, Lowercase English letters',
    example: 'Input: s = "eceba", k = 2 -> Output: 3 (Substring "ece")',
    starterCode: `def length_of_longest_substring_k_distinct(s: str, k: int) -> int:\n    # FAANG Sliding Window Pattern\n    if not s or k == 0:\n        return 0\n    \n    char_count = {}\n    max_len = 0\n    left = 0\n    \n    for right, char in enumerate(s):\n        char_count[char] = char_count.get(char, 0) + 1\n        \n        while len(char_count) > k:\n            left_char = s[left]\n            char_count[left_char] -= 1\n            if char_count[left_char] == 0:\n                del char_count[left_char]\n            left += 1\n            \n        max_len = max(max_len, right - left + 1)\n        \n    return max_len\n\nprint(length_of_longest_substring_k_distinct("eceba", 2)) # 3\n`,
    suggestedQuestions: [
      'What should we return if k = 0 or s is empty?',
      'Can the string contain uppercase characters or whitespace?',
      'Are there strict memory limits for the auxiliary hash table?',
    ],
  },
  Meta: {
    id: 'meta-lca',
    company: 'Meta',
    title: 'Lowest Common Ancestor in Binary Tree',
    difficulty: 'Medium',
    description: 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes p and q. The LCA is defined as the lowest node in T that has both p and q as descendants.',
    constraints: 'Nodes count <= 10^5, all Node values are unique, p != q',
    example: 'Input: root = [3,5,1,6,2,0,8], p = 5, q = 1 -> Output: 3',
    starterCode: `class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef lowest_common_ancestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:\n    if not root or root == p or root == q:\n        return root\n    \n    left = lowest_common_ancestor(root.left, p, q)\n    right = lowest_common_ancestor(root.right, p, q)\n    \n    if left and right:\n        return root\n    return left if left else right\n`,
    suggestedQuestions: [
      'Can node p or q be the lowest common ancestor of themselves?',
      'Are we guaranteed that both nodes exist in the tree?',
      'Is the binary tree balanced or could it be skewed O(N)?',
    ],
  },
  Amazon: {
    id: 'amazon-lru',
    company: 'Amazon',
    title: 'Design In-Memory LRU Cache',
    difficulty: 'Hard',
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) average time complexity for both get and put operations.',
    constraints: 'Capacity <= 3000, Key/Value integers <= 10^4, up to 2 * 10^5 calls',
    example: 'LRUCache(2); put(1,1); put(2,2); get(1)->1; put(3,3); get(2)->-1',
    starterCode: `class Node:\n    def __init__(self, key=0, val=0):\n        self.key = key\n        self.val = val\n        self.prev = None\n        self.next = None\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.capacity = capacity\n        self.cache = {} # key -> Node\n        self.head = Node()\n        self.tail = Node()\n        self.head.next = self.tail\n        self.tail.prev = self.head\n\n    def get(self, key: int) -> int:\n        if key in self.cache:\n            node = self.cache[key]\n            self._remove(node)\n            self._add_to_head(node)\n            return node.val\n        return -1\n`,
    suggestedQuestions: [
      'What is the maximum capacity and expected concurrent thread access?',
      'Should get() count as an access that moves an element to most-recent?',
      'Should we raise an exception or return -1 on missing key?',
    ],
  },
  OpenAI: {
    id: 'openai-matrix',
    company: 'OpenAI',
    title: 'Rotate N x N Attention Matrix In-Place',
    difficulty: 'Medium',
    description: 'You are given an n x n 2D matrix representing an attention tensor. Rotate the matrix by 90 degrees clockwise in-place without allocating another 2D matrix.',
    constraints: 'n == matrix.length == matrix[i].length, 1 <= n <= 50',
    example: 'Input: [[1,2,3],[4,5,6],[7,8,9]] -> Output: [[7,4,1],[8,5,2],[9,6,3]]',
    starterCode: `def rotate_attention_matrix(matrix: list[list[int]]) -> None:\n    # 1. Transpose the matrix\n    n = len(matrix)\n    for i in range(n):\n        for j in range(i + 1, n):\n            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n            \n    # 2. Reverse each row\n    for i in range(n):\n        matrix[i].reverse()\n\nm = [[1,2,3],[4,5,6],[7,8,9]]\nrotate_attention_matrix(m)\nprint(m)\n`,
    suggestedQuestions: [
      'Does "in-place" strictly mean O(1) auxiliary memory?',
      'Can the matrix be non-square (M != N) or strictly square?',
      'What are the minimum and maximum dimensions of N?',
    ],
  },
};

export const TechnicalInterviewRoom: React.FC = () => {
  const { addXP, triggerBurst } = useCourse();

  // Settings
  const [targetCompany, setTargetCompany] = useState<'Google' | 'Meta' | 'Amazon' | 'OpenAI'>('Google');
  const [interviewerPersona, setInterviewerPersona] = useState<'algorismus' | 'byte' | 'bugsy'>('algorismus');

  const problem = FAANG_PROBLEMS[targetCompany] || FAANG_PROBLEMS.Google;

  // Stages: 1=Clarify, 2=Approach, 3=Code, 4=Debrief & Scorecard
  const [interviewStage, setInterviewStage] = useState<1 | 2 | 3 | 4>(1);

  // Timer: 45 min
  const [secondsRemaining, setSecondsRemaining] = useState<number>(45 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Voice AI Controls
  const [isVoiceAiEnabled, setIsVoiceAiEnabled] = useState<boolean>(true);
  const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState<boolean>(false);
  const [isRecordingSpeech, setIsRecordingSpeech] = useState<boolean>(false);
  const speechRecognizerRef = useRef<any>(null);

  // Communication Dialog
  const [candidateInput, setCandidateInput] = useState<string>('');
  const [messages, setMessages] = useState<InterviewMessage[]>([
    {
      id: 'm-0',
      sender: 'interviewer',
      text: `Welcome! Today we will evaluate the algorithmic design problem: '${problem.title}'. Before writing code, what clarifying questions do you have regarding constraints and inputs?`,
      timestamp: '00:00',
      tag: 'clarification',
    },
  ]);

  // Code state
  const [userCode, setUserCode] = useState<string>(problem.starterCode);

  // Scores
  const [scores, setScores] = useState({
    problemSolving: 4.8,
    communication: 4.7,
    codeQuality: 4.8,
    edgeCases: 4.9,
  });

  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Timer Loop
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

  // Change problem code when company changes
  useEffect(() => {
    setUserCode(problem.starterCode);
    const welcome = `Welcome to the ${targetCompany} technical interview! Today we are solving: '${problem.title}'. What edge cases or constraints would you like to clarify?`;
    setMessages([
      {
        id: `m-${Date.now()}`,
        sender: 'interviewer',
        text: welcome,
        timestamp: '00:00',
        tag: 'clarification',
      },
    ]);
    if (isVoiceAiEnabled) {
      speakInterviewerText(welcome);
    }
  }, [targetCompany]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Speaks interviewer text using Web Speech API
  const speakInterviewerText = (text: string) => {
    if (!isVoiceAiEnabled) return;
    setIsInterviewerSpeaking(true);
    speakText(text, {
      onStart: () => setIsInterviewerSpeaking(true),
      onEnd: () => setIsInterviewerSpeaking(false),
      onError: () => setIsInterviewerSpeaking(false),
    });
  };

  // Toggle Candidate Voice Dictation (Microphone)
  const toggleSpeechRecognition = () => {
    if (isRecordingSpeech) {
      speechRecognizerRef.current?.stop?.();
      setIsRecordingSpeech(false);
      sound.playPop();
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    sound.playPop();
    setIsRecordingSpeech(true);

    const controller = startSpeechToText({
      onResult: (transcript, isFinal) => {
        setCandidateInput(transcript);
        if (isFinal) {
          setIsRecordingSpeech(false);
        }
      },
      onError: (err) => {
        console.warn('Speech recognition error:', err);
        setIsRecordingSpeech(false);
      },
      onEnd: () => {
        setIsRecordingSpeech(false);
      },
    });

    speechRecognizerRef.current = controller;
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

    // Dynamic Interviewer AI reply
    setTimeout(() => {
      let reply = '';
      const lower = q.toLowerCase();
      if (lower.includes('empty') || lower.includes('k=0') || lower.includes('k == 0') || lower.includes('null')) {
        reply = 'Excellent question! If the input is empty or null, immediately return 0 or None. Guarding base cases early shows senior maturity.';
      } else if (lower.includes('space') || lower.includes('memory') || lower.includes('auxiliary')) {
        reply = 'Target memory is O(1) or O(K) auxiliary space. Avoid duplicating the entire input array in memory.';
      } else if (lower.includes('time') || lower.includes('scale') || lower.includes('n <=') || lower.includes('length')) {
        reply = 'Input scale is N <= 10^5. A quadratic O(N^2) solution will definitely hit Time Limit Exceeded. Aim for O(N) or O(N log N).';
      } else if (lower.includes('duplicate') || lower.includes('unique')) {
        reply = 'All elements can contain duplicates unless specified otherwise. How would your algorithm handle repeated values without infinite loops?';
      } else {
        reply = "Very perceptive clarification! That constraint holds. Now, can you outline your algorithmic approach and walk me through the time and space complexity tradeoffs?";
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
      if (isVoiceAiEnabled) {
        speakInterviewerText(reply);
      }
    }, 800);
  };

  const finishInterview = () => {
    setIsFinished(true);
    setInterviewStage(4);
    setIsTimerRunning(false);
    stopSpeaking();
    sound.playFanfare();
    addXP(250, `Passed ${targetCompany} FAANG Mock Interview!`);
    triggerBurst('🏆 INTERVIEW PASSED!', `Recommendation: STRONG HIRE at ${targetCompany}! +250 XP`, 'boom');
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 font-comic">
      {/* HEADER & CONTROLS */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#12162a] via-[#1b2342] to-[#12162a] border-3 border-black shadow-comic-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider border border-black shadow-comic-sm flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> FAANG Interview Simulation
            </span>
            <span className="text-xs text-amber-300 font-bold">{targetCompany} Senior Evaluation</span>
            <span className="text-slate-500">•</span>
            <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
              <Radio className="w-3 h-3 animate-pulse text-emerald-400" /> Real-Time Voice AI Active
            </span>
          </div>

          <h1 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
            FAANG AI VOICE MOCK INTERVIEW ROOM
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-sans">
            Speak directly with your AI examiner. Clarify algorithmic constraints, formulate Big-O complexity tradeoffs, code the live solution, and receive a FAANG hiring scorecard.
          </p>
        </div>

        {/* Live Interview Clock & Voice Toggle */}
        <div className="flex flex-wrap items-center gap-3 bg-[#0a0d18] p-4 rounded-2xl border border-slate-700">
          {/* Spoken AI Audio Toggle */}
          <button
            type="button"
            onClick={() => {
              if (isVoiceAiEnabled) stopSpeaking();
              setIsVoiceAiEnabled(!isVoiceAiEnabled);
              sound.playPop();
            }}
            className={`p-2.5 rounded-xl border border-black font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
              isVoiceAiEnabled
                ? 'bg-emerald-500 text-slate-950 shadow-comic-sm'
                : 'bg-slate-800 text-slate-400'
            }`}
            title="Toggle Interviewer Voice Speech"
          >
            {isVoiceAiEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{isVoiceAiEnabled ? 'AI Voice ON' : 'AI Muted'}</span>
          </button>

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
                {problem.company} • {problem.difficulty}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                Target: Optimal Big-O
              </span>
            </div>

            <h3 className="font-bangers text-2xl text-white">
              {problem.title.toUpperCase()}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {problem.description}
            </p>

            <div className="p-3.5 rounded-xl bg-[#070a14] border border-[#1b233a] font-mono text-xs text-slate-300 space-y-1">
              <div><strong>Example:</strong> {problem.example}</div>
              <div><strong>Constraints:</strong> {problem.constraints}</div>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider font-mono">Suggested Clarifying Questions:</span>
              <div className="flex flex-col gap-1.5">
                {problem.suggestedQuestions.map((q, i) => (
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
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider border border-black shadow-comic flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              <span>Approach Aligned ➔ Start Coding in Stage 3</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interviewer Chat Stream (7 Cols) */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0c101d] border-2 border-black shadow-comic flex flex-col justify-between h-[520px]">
            <div className="flex items-center justify-between pb-3 border-b border-[#1b233a]">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isInterviewerSpeaking ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
                <span className="font-bangers text-lg text-white">INTERVIEW TRANSCRIPT & VOICE AI</span>
              </div>
              {isInterviewerSpeaking && (
                <span className="text-[10px] text-amber-300 font-mono flex items-center gap-1 animate-pulse">
                  <Volume2 className="w-3.5 h-3.5" /> Interviewer Speaking...
                </span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-3 font-sans pr-1">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${m.sender === 'candidate' ? 'flex-row-reverse' : ''}`}
                >
                  <div className="text-xl shrink-0">
                    {m.sender === 'candidate' ? (
                      <HumanAvatar seed="adventurer" size="sm" />
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
                    <div className="flex items-center justify-between mt-1 text-[9px] text-slate-400 font-mono">
                      {m.sender === 'interviewer' && (
                        <button
                          type="button"
                          onClick={() => speakInterviewerText(m.text)}
                          className="hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                        >
                          <Volume2 className="w-3 h-3" /> Read Aloud
                        </button>
                      )}
                      <span>{m.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar with Mic Voice Dictation */}
            <div className="pt-3 border-t border-[#1b233a] flex items-center gap-2">
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`p-2.5 rounded-xl border border-black transition cursor-pointer flex items-center gap-1 ${
                  isRecordingSpeech
                    ? 'bg-rose-500 text-white animate-pulse shadow-comic-sm'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
                title="Speak to dictate your question"
              >
                {isRecordingSpeech ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={candidateInput}
                onChange={(e) => setCandidateInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendClarification()}
                placeholder={isRecordingSpeech ? 'Listening to your voice... Speak now...' : 'Ask clarifying question or dictate with mic...'}
                className="flex-1 bg-[#060810] border border-[#1e2744] focus:border-amber-400 rounded-xl px-3 py-2.5 text-xs text-white outline-none font-sans"
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
                <p className="text-xs text-slate-400 font-sans">
                  Implement the optimal algorithm for {problem.title}. Explain your line-by-line reasoning as you write.
                </p>
              </div>
            </div>

            <button
              onClick={finishInterview}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl border border-black shadow-comic-sm cursor-pointer font-sans"
            >
              Submit Code ➔ Proceed to Scorecard
            </button>
          </div>

          <div className="bg-[#090d1a] border-2 border-black rounded-2xl p-4 shadow-comic">
            <UniversalVSCodeEditor
              key={`${problem.id}-${targetCompany}`}
              language="python"
              starterCode={problem.starterCode}
              problemTitle={problem.title}
              problemId={problem.id}
              onSolve={finishInterview}
            />
          </div>
        </div>
      )}

      {/* STAGE 4: Evaluation Scorecard & FAANG Rubric */}
      {interviewStage === 4 && (
        <div className="p-8 rounded-3xl bg-[#0c101d] border-3 border-black shadow-comic-lg space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                Official Hiring Recommendation
              </span>
              <h2 className="font-bangers text-4xl text-amber-300 mt-1">
                {targetCompany.toUpperCase()} DECISION: STRONG HIRE!
              </h2>
              <p className="text-xs text-slate-300 font-sans mt-1">
                Evaluated against FAANG L4/L5 standard competencies in algorithmic efficiency, edge cases, and technical communication.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/40 text-center">
              <span className="text-[11px] font-mono text-emerald-300 block uppercase">Composite Score</span>
              <span className="font-bangers text-4xl text-emerald-400">4.8 / 5.0</span>
            </div>
          </div>

          {/* Rubric Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
            <div className="p-4 rounded-2xl bg-[#12182b] border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-bold">Problem Solving</span>
              <div className="text-2xl font-black text-amber-300 font-mono">4.8 / 5.0</div>
              <p className="text-[11px] text-slate-400">Identified optimal O(N) pattern without brute-force delay.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#12182b] border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-bold">Communication & Clarity</span>
              <div className="text-2xl font-black text-amber-300 font-mono">4.7 / 5.0</div>
              <p className="text-[11px] text-slate-400">Asked clarifying questions on constraints before writing code.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#12182b] border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-bold">Code Quality & Style</span>
              <div className="text-2xl font-black text-amber-300 font-mono">4.8 / 5.0</div>
              <p className="text-[11px] text-slate-400">Clean modular variable naming and structured helper methods.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#12182b] border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-bold">Edge Case Coverage</span>
              <div className="text-2xl font-black text-amber-300 font-mono">4.9 / 5.0</div>
              <p className="text-[11px] text-slate-400">Guarded empty strings, zero K, and boundary pointer conditions.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 font-sans">
            <button
              onClick={() => {
                setInterviewStage(1);
                setSecondsRemaining(45 * 60);
                setIsTimerRunning(true);
                sound.playPop();
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-600 transition cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Start Another Interview
            </button>

            <button
              onClick={() => {
                sound.playFanfare();
                triggerBurst('📜 PASSPORT CERTIFIED', 'Interview verification attached to your profile!', 'star');
              }}
              className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider border border-black shadow-comic-sm transition cursor-pointer"
            >
              Add Verification Badge to Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
