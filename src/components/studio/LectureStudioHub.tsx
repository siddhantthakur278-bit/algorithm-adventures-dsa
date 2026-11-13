import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  Play,
  Code2,
  FolderPlus,
  FilePlus,
  Upload,
  Download,
  Trash2,
  Edit3,
  Save,
  Columns2,
  Maximize2,
  Minimize2,
  RotateCcw,
  FileText,
  Sparkles,
  Terminal,
  Check,
  Copy,
  Plus,
  ExternalLink,
  BookOpen,
  Bookmark,
  CheckCircle2,
  XCircle,
  FileCode,
  Sliders,
  RefreshCw,
  Search,
  Eye,
  GitCommit,
  Bot,
} from 'lucide-react';
import { executeUniversalCode, SupportedLanguage, CodeExecutionOutcome } from '../../utils/universalCodeRunner';
import { pushSolutionToGitHub, loadGitHubConfig } from '../../utils/githubService';
import { queryProfessorAI } from '../../utils/aiService';
import { sound } from '../../utils/soundEffects';

interface StudioFile {
  id: string;
  name: string;
  language: SupportedLanguage;
  content: string;
  isModified?: boolean;
}

interface LecturePreset {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  videoId: string;
  category: 'Core DSA' | 'Algorithms' | 'CS Fundamentals' | 'System Design';
  starterFile?: string;
  starterCode?: string;
  starterLang?: SupportedLanguage;
}

const CURATED_LECTURES: LecturePreset[] = [
  {
    id: 'neetcode-two-sum',
    title: 'Two Sum & Hash Maps - Optimal O(N) Proof',
    instructor: 'NeetCode',
    duration: '11:42',
    videoId: 'KLlXCFG5TnA',
    category: 'Core DSA',
    starterFile: 'two_sum.py',
    starterLang: 'python',
    starterCode: `def two_sum(nums, target):
    # Hash Map approach: O(N) Time, O(N) Space
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []

# Test with live inputs
nums = [2, 7, 11, 15]
target = 9
result = two_sum(nums, target)
print(f"Input: nums={nums}, target={target}")
print(f"Indices: {result} -> Values: {[nums[i] for i in result]}")
`,
  },
  {
    id: 'abdul-bari-big-o',
    title: 'Asymptotic Notations & Big-O Masterclass',
    instructor: 'Abdul Bari',
    duration: '22:15',
    videoId: 'A03oI0znAoc',
    category: 'Algorithms',
    starterFile: 'asymptotic_analysis.py',
    starterLang: 'python',
    starterCode: `import time

def linear_search(arr, target):
    # O(N) Linear Time
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

def binary_search(arr, target):
    # O(log N) Logarithmic Time
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

# Benchmark Comparison
test_arr = list(range(100000))
target = 99999

t0 = time.perf_counter()
linear_search(test_arr, target)
t1 = time.perf_counter()

t2 = time.perf_counter()
binary_search(test_arr, target)
t3 = time.perf_counter()

print(f"Linear Search O(N):     {(t1 - t0)*1000:.4f} ms")
print(f"Binary Search O(log N): {(t3 - t2)*1000:.4f} ms")
`,
  },
  {
    id: 'striver-recursion',
    title: 'Recursion Tree & Backtracking Fundamentals',
    instructor: 'Take U Forward (Striver)',
    duration: '28:10',
    videoId: 'yVdKa8dnKiE',
    category: 'Core DSA',
    starterFile: 'recursion_backtrack.py',
    starterLang: 'python',
    starterCode: `def generate_subsets(nums):
    result = []
    
    def backtrack(index, current):
        if index == len(nums):
            result.append(list(current))
            return
        
        # Include current element
        current.append(nums[index])
        backtrack(index + 1, current)
        
        # Exclude current element (Backtrack step)
        current.pop()
        backtrack(index + 1, current)
        
    backtrack(0, [])
    return result

sample = [1, 2, 3]
subsets = generate_subsets(sample)
print(f"All 2^N subsets of {sample}:")
for s in subsets:
    print(s)
`,
  },
  {
    id: 'mit-algorithms',
    title: 'MIT 6.006: Introduction to Algorithms & Data Structures',
    instructor: 'MIT OpenCourseWare',
    duration: '48:30',
    videoId: 'ZA-tUyM_y7s',
    category: 'CS Fundamentals',
    starterFile: 'peak_finding.py',
    starterLang: 'python',
    starterCode: `def find_1d_peak(arr):
    # Divide & Conquer 1D Peak Finding: O(log N)
    n = len(arr)
    low = 0
    high = n - 1
    
    while low <= high:
        mid = (low + high) // 2
        left_neighbor = arr[mid - 1] if mid > 0 else float('-inf')
        right_neighbor = arr[mid + 1] if mid < n - 1 else float('-inf')
        
        if arr[mid] >= left_neighbor and arr[mid] >= right_neighbor:
            return (mid, arr[mid])
        elif left_neighbor > arr[mid]:
            high = mid - 1
        else:
            low = mid + 1
            
    return (-1, -1)

data = [1, 3, 20, 4, 1, 0]
idx, val = find_1d_peak(data)
print(f"Array: {data}")
print(f"Peak detected at index {idx} with value {val}")
`,
  },
  {
    id: 'neetcode-linked-list',
    title: 'Reverse Linked List & Pointer Reversal',
    instructor: 'NeetCode',
    duration: '09:20',
    videoId: 'G0_I-ZF0S38',
    category: 'Core DSA',
    starterFile: 'linked_list.py',
    starterLang: 'python',
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev

def print_list(node):
    res = []
    while node:
        res.append(str(node.val))
        node = node.next
    return " -> ".join(res)

# Build: 1 -> 2 -> 3 -> 4 -> 5
head = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5)))))
print("Original List:", print_list(head))
rev = reverse_list(head)
print("Reversed List:", print_list(rev))
`,
  },
  {
    id: 'freecodecamp-system-design',
    title: 'System Design Interview - Rate Limiter & Caching',
    instructor: 'freeCodeCamp',
    duration: '35:40',
    videoId: 'bUHFg8CZFws',
    category: 'System Design',
    starterFile: 'rate_limiter.py',
    starterLang: 'python',
    starterCode: `import time

class TokenBucket:
    def __init__(self, capacity, fill_rate_per_sec):
        self.capacity = capacity
        self.fill_rate = fill_rate_per_sec
        self.tokens = capacity
        self.last_update = time.time()
        
    def allow_request(self, tokens_needed=1):
        now = time.time()
        elapsed = now - self.last_update
        self.last_update = now
        
        # Add tokens accumulated over elapsed time
        self.tokens = min(self.capacity, self.tokens + elapsed * self.fill_rate)
        
        if self.tokens >= tokens_needed:
            self.tokens -= tokens_needed
            return True
        return False

bucket = TokenBucket(capacity=5, fill_rate_per_sec=2)
print("Simulating Token Bucket Rate Limiter (Capacity: 5, Rate: 2 req/s):")
for i in range(8):
    allowed = bucket.allow_request()
    status = "ALLOWED" if allowed else "BLOCKED (429 Too Many Requests)"
    print(f"Request #{i+1}: {status} | Tokens left: {bucket.tokens:.2f}")
`,
  },
];

const DEFAULT_FILES: StudioFile[] = [
  {
    id: 'file-1',
    name: 'solution.py',
    language: 'python',
    content: `# Python 3 DSA Solution & Algorithm Playground
def solve():
    nums = [2, 7, 11, 15]
    target = 9
    
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []

print("Result:", solve())
`,
  },
  {
    id: 'file-2',
    name: 'script.js',
    language: 'javascript',
    content: `// JavaScript Data Structures & Logic
function findMaxSubarraySum(arr, k) {
  let maxSum = 0;
  let windowSum = 0;
  
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;
  
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}

const data = [2, 1, 5, 1, 3, 2];
console.log("Max Sum Subarray (k=3):", findMaxSubarraySum(data, 3));
`,
  },
  {
    id: 'file-3',
    name: 'lecture-notes.md',
    language: 'python',
    content: `# 🎓 Lecture Notes & Algorithmic Insights

## Problem: Two Sum
- **Brute Force:** O(N^2) using nested loops.
- **Hash Map Optimal:** O(N) time with one-pass dictionary lookup.
- **Key Equation:** \`diff = target - num\`

## Complexity Cheatsheet
| Operation | Average | Worst |
| :--- | :--- | :--- |
| Hash Lookup | O(1) | O(N) |
| Binary Search | O(log N) | O(log N) |
| QuickSort | O(N log N) | O(N^2) |
`,
  },
];

const STORAGE_KEY_FILES = 'ada_studio_workspace_files';
const STORAGE_KEY_LAST_VIDEO = 'ada_studio_last_video_id';

function extractYouTubeVideoId(url: string): string {
  if (!url) return 'KLlXCFG5TnA';
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);
  return match && match[2].length === 11 ? match[2] : trimmed;
}

function detectLanguage(fileName: string): SupportedLanguage {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'py':
      return 'python';
    case 'js':
    case 'jsx':
    case 'mjs':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'html':
    case 'htm':
      return 'html';
    case 'css':
      return 'css';
    case 'sql':
      return 'sql';
    default:
      return 'python';
  }
}

export const LectureStudioHub: React.FC = () => {
  // Files State
  const [files, setFiles] = useState<StudioFile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FILES);
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_FILES;
  });

  const [activeFileId, setActiveFileId] = useState<string>(() => files[0]?.id || 'file-1');
  const [newFileName, setNewFileName] = useState<string>('');
  const [showNewFileModal, setShowNewFileModal] = useState<boolean>(false);
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState<string>('');

  // Video State
  const [activeVideoId, setActiveVideoId] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_LAST_VIDEO) || 'KLlXCFG5TnA';
    } catch {
      return 'KLlXCFG5TnA';
    }
  });
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Layout View State: 'balanced' (50/50), 'video-focus' (65/35), 'code-focus' (35/65), 'video-only', 'code-only'
  const [splitMode, setSplitMode] = useState<'balanced' | 'video-focus' | 'code-focus' | 'video-only' | 'code-only'>('balanced');
  const [swapSides, setSwapSides] = useState<boolean>(false);

  // Execution & Output State
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [terminalOutput, setTerminalOutput] = useState<string>('Console ready. Write code and click "Run Code" (Ctrl/Cmd+Enter).');
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [executionError, setExecutionError] = useState<string | null>(null);
  const [stdinInput, setStdinInput] = useState<string>('');
  const [domPreviewHtml, setDomPreviewHtml] = useState<string | null>(null);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'output' | 'stdin' | 'preview'>('output');

  // Git & AI State
  const [isCommitting, setIsCommitting] = useState<boolean>(false);
  const [gitStatusMsg, setGitStatusMsg] = useState<string | null>(null);
  const [isAiExplaining, setIsAiExplaining] = useState<boolean>(false);

  // File Upload input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active file
  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  // Persist files to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FILES, JSON.stringify(files));
    } catch {}
  }, [files]);

  // Persist video ID to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LAST_VIDEO, activeVideoId);
    } catch {}
  }, [activeVideoId]);

  // Keyboard shortcut Ctrl+Enter / Cmd+Enter to run
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFile]);

  // Handle Code Changes
  const handleCodeChange = (newCode: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === activeFileId ? { ...f, content: newCode, isModified: true } : f))
    );
  };

  // Run Code
  const handleRunCode = async () => {
    if (!activeFile) return;
    setIsRunning(true);
    setTerminalOutput('Compiling and executing in WebAssembly / Sandbox engine...');
    setExecutionError(null);
    setDomPreviewHtml(null);

    sound.playPop();

    try {
      const outcome: CodeExecutionOutcome = await executeUniversalCode(
        activeFile.language,
        activeFile.content
      );

      setIsRunning(false);
      setExecutionTime(outcome.executionTimeMs);

      if (outcome.success) {
        sound.playSuccess();
        setTerminalOutput(outcome.output || '(Execution finished with return code 0)');
        if (outcome.domPreview) {
          setDomPreviewHtml(outcome.domPreview);
          setActiveConsoleTab('preview');
        } else {
          setActiveConsoleTab('output');
        }
      } else {
        sound.playError();
        setExecutionError(outcome.error || 'Execution failed');
        setTerminalOutput(outcome.output || outcome.error || 'Execution error');
      }
    } catch (err: any) {
      setIsRunning(false);
      sound.playError();
      const msg = err.message || String(err);
      setExecutionError(msg);
      setTerminalOutput(`Runtime Exception: ${msg}`);
    }
  };

  // Create New File
  const handleCreateFile = () => {
    if (!newFileName.trim()) return;
    const name = newFileName.trim();
    const lang = detectLanguage(name);
    const newFile: StudioFile = {
      id: `file-${Date.now()}`,
      name,
      language: lang,
      content: lang === 'python' ? `# ${name}\nprint("Hello from ${name}")\n` : `// ${name}\nconsole.log("Hello from ${name}");\n`,
    };

    setFiles((prev) => [...prev, newFile]);
    setActiveFileId(newFile.id);
    setNewFileName('');
    setShowNewFileModal(false);
    sound.playSuccess();
  };

  // Upload Local File from User's Computer
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = (event.target?.result as string) || '';
      const lang = detectLanguage(file.name);
      const newFile: StudioFile = {
        id: `file-${Date.now()}`,
        name: file.name,
        language: lang,
        content,
      };

      setFiles((prev) => [...prev, newFile]);
      setActiveFileId(newFile.id);
      sound.playCelebration();
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Drag & Drop File into Editor
  const handleDropFile = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = (event.target?.result as string) || '';
      const lang = detectLanguage(file.name);
      const newFile: StudioFile = {
        id: `file-${Date.now()}`,
        name: file.name,
        language: lang,
        content,
      };

      setFiles((prev) => [...prev, newFile]);
      setActiveFileId(newFile.id);
      sound.playCelebration();
    };
    reader.readAsText(file);
  };

  // Download Active File to User's Hard Drive
  const handleDownloadFile = () => {
    if (!activeFile) return;
    const blob = new Blob([activeFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.name;
    a.click();
    URL.revokeObjectURL(url);
    sound.playPop();
  };

  // Download All Files as Workspace Backup
  const handleDownloadAll = () => {
    const payload = JSON.stringify(files, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `algorithm-adventures-workspace-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    sound.playCelebration();
  };

  // Delete File
  const handleDeleteFile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (files.length <= 1) {
      alert('You must have at least one file in your workspace.');
      return;
    }
    const remaining = files.filter((f) => f.id !== id);
    setFiles(remaining);
    if (activeFileId === id) {
      setActiveFileId(remaining[0].id);
    }
    sound.playPop();
  };

  // Rename File
  const handleStartRename = (file: StudioFile, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingFileId(file.id);
    setRenameValue(file.name);
  };

  const handleFinishRename = (id: string) => {
    if (!renameValue.trim()) {
      setEditingFileId(null);
      return;
    }
    const cleanName = renameValue.trim();
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, name: cleanName, language: detectLanguage(cleanName) } : f
      )
    );
    setEditingFileId(null);
    sound.playPop();
  };

  // Push Active Code to GitHub
  const handlePushToGitHub = async () => {
    if (!activeFile) return;
    setIsCommitting(true);
    setGitStatusMsg(null);

    const cfg = loadGitHubConfig();
    const commitMsg = `feat(studio): update ${activeFile.name} from Lecture Studio`;
    const result = await pushSolutionToGitHub(`studio/${activeFile.name}`, activeFile.content, commitMsg);

    setIsCommitting(false);
    if (result.success) {
      sound.playCelebration();
      setGitStatusMsg(`✓ Pushed to GitHub (${cfg.owner}/${cfg.repo})!`);
    } else {
      sound.playError();
      setGitStatusMsg(`⚠️ ${result.error || 'Push failed. Check GitHub token.'}`);
    }
    setTimeout(() => setGitStatusMsg(null), 5000);
  };

  // AI Explain
  const handleAiExplain = async () => {
    if (!activeFile) return;
    setIsAiExplaining(true);
    sound.playPop();

    const response = await queryProfessorAI(
      `Please explain the time complexity, edge cases, and code walkthrough for this ${activeFile.language} implementation:\n\n\`\`\`${activeFile.language}\n${activeFile.content}\n\`\`\``,
      {
        problem: {
          id: 999,
          title: activeFile.name,
          description: `User workspace file: ${activeFile.name}`,
          difficulty: 'Medium',
          category: 'Algorithms',
          starterCode: activeFile.content,
          testCases: [],
        } as any,
        userCode: activeFile.content,
      }
    );

    setIsAiExplaining(false);
    setTerminalOutput(`🤖 Byte & Professor AI Analysis:\n\n${response}`);
    setActiveConsoleTab('output');
  };

  // Load Custom Video URL
  const handleLoadCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;
    const vId = extractYouTubeVideoId(customUrlInput);
    setActiveVideoId(vId);
    setCustomUrlInput('');
    sound.playCelebration();
  };

  // Select Preset Lecture
  const handleSelectPreset = (lecture: LecturePreset) => {
    setActiveVideoId(lecture.videoId);
    sound.playPop();

    // If lecture has associated starter file and code, create or switch to it!
    if (lecture.starterFile && lecture.starterCode) {
      const existing = files.find((f) => f.name === lecture.starterFile);
      if (existing) {
        setActiveFileId(existing.id);
      } else {
        const newFile: StudioFile = {
          id: `file-${Date.now()}`,
          name: lecture.starterFile,
          language: lecture.starterLang || 'python',
          content: lecture.starterCode,
        };
        setFiles((prev) => [newFile, ...prev]);
        setActiveFileId(newFile.id);
      }
    }
  };

  // Filter lectures
  const filteredLectures = CURATED_LECTURES.filter((lec) => {
    const matchesCat = activeCategory === 'All' || lec.category === activeCategory;
    const matchesQuery =
      lec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lec.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  // Calculate Pane Widths based on splitMode
  const getVideoWidthClass = () => {
    switch (splitMode) {
      case 'balanced':
        return 'w-full lg:w-1/2';
      case 'video-focus':
        return 'w-full lg:w-[62%]';
      case 'code-focus':
        return 'w-full lg:w-[38%]';
      case 'video-only':
        return 'w-full';
      case 'code-only':
        return 'hidden';
      default:
        return 'w-full lg:w-1/2';
    }
  };

  const getCodeWidthClass = () => {
    switch (splitMode) {
      case 'balanced':
        return 'w-full lg:w-1/2';
      case 'video-focus':
        return 'w-full lg:w-[38%]';
      case 'code-focus':
        return 'w-full lg:w-[62%]';
      case 'video-only':
        return 'hidden';
      case 'code-only':
        return 'w-full';
      default:
        return 'w-full lg:w-1/2';
    }
  };

  return (
    <div className="max-w-[1720px] mx-auto px-2 sm:px-4 py-4 space-y-4">
      {/* Studio Header Toolbar */}
      <div className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-3 sm:p-4 shadow-comic flex flex-wrap items-center justify-between gap-3">
        {/* Left: Insignia & Quick Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-lg shadow-sm border border-amber-300">
            🎬
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>Lecture Theater &amp; VS Code Studio</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
                  Side-by-Side
                </span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400">
              Watch algorithms, FAANG lectures &amp; MIT masterclasses while coding in a live compiler with local file access.
            </p>
          </div>
        </div>

        {/* Center: Split Ratio & Layout View Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-[#070a12] rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setSplitMode('video-focus')}
            className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
              splitMode === 'video-focus'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Video Priority (62% Video / 38% Code)"
          >
            Video 60%
          </button>
          <button
            onClick={() => setSplitMode('balanced')}
            className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
              splitMode === 'balanced'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Balanced (50% Video / 50% Code)"
          >
            50 / 50
          </button>
          <button
            onClick={() => setSplitMode('code-focus')}
            className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
              splitMode === 'code-focus'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Code Priority (38% Video / 62% Code)"
          >
            Code 60%
          </button>
          <button
            onClick={() => setSplitMode(splitMode === 'video-only' ? 'balanced' : 'video-only')}
            className={`px-2 py-1 rounded-lg transition cursor-pointer ${
              splitMode === 'video-only' ? 'bg-sky-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
            title="Theater Fullscreen Video"
          >
            <Video className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setSplitMode(splitMode === 'code-only' ? 'balanced' : 'code-only')}
            className={`px-2 py-1 rounded-lg transition cursor-pointer ${
              splitMode === 'code-only' ? 'bg-emerald-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
            title="Full IDE Mode"
          >
            <Code2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setSwapSides((prev) => !prev)}
            className="px-2 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer ml-1"
            title="Swap Left & Right Panes"
          >
            <Columns2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".py,.js,.ts,.html,.css,.sql,.md,.json,.txt,.cpp,.java"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition cursor-pointer shadow-sm"
            title="Upload local code file from your computer"
          >
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Upload File</span>
          </button>

          <button
            onClick={handleDownloadAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition cursor-pointer shadow-sm"
            title="Download entire workspace as a JSON bundle"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Export Workspace</span>
          </button>
        </div>
      </div>

      {/* Main Split-Pane Workspace */}
      <div
        className={`flex flex-col lg:flex-row gap-4 items-stretch ${
          swapSides ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* =================================================================== */}
        {/* LEFT / LECTURE PANE: YouTube Video Player & Curated Lecture Library */}
        {/* =================================================================== */}
        <div className={`${getVideoWidthClass()} flex flex-col space-y-4`}>
          {/* YouTube Video Embed Frame */}
          <div className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl overflow-hidden shadow-comic">
            {/* Top Bar for Video */}
            <div className="px-4 py-2.5 bg-[#070a12] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-extrabold text-white tracking-wide uppercase font-mono">
                  Lecture Theater
                </span>
              </div>

              {/* Custom YouTube URL Loader */}
              <form onSubmit={handleLoadCustomVideo} className="flex items-center gap-1.5 flex-1 max-w-md ml-auto">
                <input
                  type="text"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  placeholder="Paste any YouTube video URL or ID..."
                  className="w-full bg-[#0d121f] text-xs text-slate-200 placeholder-slate-500 px-3 py-1 rounded-lg border border-slate-800 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer shadow-sm"
                >
                  Load
                </button>
              </form>
            </div>

            {/* 16:9 Aspect Ratio YouTube Embed */}
            <div className="relative w-full pt-[56.25%] bg-black">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=0&rel=0&modestbranding=1`}
                title="Lecture Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Curated DSA Lecture Library Accordion */}
          <div className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-4 shadow-comic space-y-3 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-extrabold text-white tracking-wide uppercase">
                  Curated Lecture Vault
                </span>
                <span className="text-[10px] text-slate-400">({filteredLectures.length} Available)</span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 text-[11px] font-semibold">
                {['All', 'Core DSA', 'Algorithms', 'CS Fundamentals', 'System Design'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lectures by topic or instructor (e.g. Two Sum, NeetCode, Abdul Bari)..."
                className="w-full bg-[#070a12] text-xs text-slate-200 placeholder-slate-500 pl-8 pr-3 py-1.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Lecture Grid / List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-1">
              {filteredLectures.map((lec) => {
                const isActive = activeVideoId === lec.videoId;
                return (
                  <div
                    key={lec.id}
                    onClick={() => handleSelectPreset(lec)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'bg-amber-400/15 border-amber-400/60 shadow-comic-sm'
                        : 'bg-[#070a12] hover:bg-[#0f1424] border-slate-800/80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="font-mono text-amber-400 font-bold">{lec.category}</span>
                        <span>{lec.duration}</span>
                      </div>
                      <div className="text-xs font-bold text-white line-clamp-2 leading-tight">
                        {lec.title}
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-medium">{lec.instructor}</span>
                      <span className={`flex items-center gap-1 font-bold ${isActive ? 'text-amber-300' : 'text-slate-400'}`}>
                        {isActive ? '● Playing' : 'Play & Code →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* RIGHT / IDE PANE: Local File Explorer + VS Code Compiler + Terminal */}
        {/* =================================================================== */}
        <div className={`${getCodeWidthClass()} flex flex-col space-y-4`}>
          {/* File Explorer & Editor Window */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDropFile}
            className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl overflow-hidden shadow-comic flex flex-col flex-1"
          >
            {/* Top Workspace Tab Bar & File Controls */}
            <div className="px-3 py-2 bg-[#070a12] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
              {/* File Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {files.map((file) => {
                  const isActive = file.id === activeFileId;
                  const isRenaming = editingFileId === file.id;

                  return (
                    <div
                      key={file.id}
                      onClick={() => setActiveFileId(file.id)}
                      className={`group flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-medium transition cursor-pointer border ${
                        isActive
                          ? 'bg-amber-400/15 text-amber-300 border-amber-400/40 shadow-sm'
                          : 'bg-[#0d121f] text-slate-400 hover:text-white border-slate-800'
                      }`}
                    >
                      <FileCode className="w-3.5 h-3.5 text-amber-400" />
                      {isRenaming ? (
                        <input
                          type="text"
                          value={renameValue}
                          autoFocus
                          onChange={(e) => setRenameValue(e.target.value)}
                          onBlur={() => handleFinishRename(file.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleFinishRename(file.id);
                            if (e.key === 'Escape') setEditingFileId(null);
                          }}
                          className="bg-black text-amber-300 px-1 py-0.2 rounded border border-amber-400 focus:outline-none text-xs w-24"
                        />
                      ) : (
                        <span onDoubleClick={(e) => handleStartRename(file, e)} title="Double click to rename">
                          {file.name}
                        </span>
                      )}

                      {/* Rename Icon */}
                      <button
                        onClick={(e) => handleStartRename(file, e)}
                        className="opacity-0 group-hover:opacity-100 hover:text-white text-slate-500 transition ml-1"
                        title="Rename file"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>

                      {/* Delete File */}
                      {files.length > 1 && (
                        <button
                          onClick={(e) => handleDeleteFile(file.id, e)}
                          className="opacity-0 group-hover:opacity-100 hover:text-rose-400 text-slate-500 transition"
                          title="Delete file"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}

                {/* Add New File Button */}
                <button
                  onClick={() => setShowNewFileModal(true)}
                  className="flex items-center gap-1 px-2 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs transition cursor-pointer"
                  title="Create new file"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">New File</span>
                </button>
              </div>

              {/* Right: File Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleDownloadFile}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition cursor-pointer"
                  title={`Download ${activeFile?.name} to your local drive`}
                >
                  <Download className="w-3.5 h-3.5 text-sky-400" />
                </button>

                <button
                  onClick={handlePushToGitHub}
                  disabled={isCommitting}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition cursor-pointer disabled:opacity-50"
                  title="Push solution to your GitHub repository"
                >
                  <GitCommit className="w-3.5 h-3.5 text-purple-400" />
                  <span className="hidden md:inline">{isCommitting ? 'Pushing...' : 'GitHub'}</span>
                </button>

                <button
                  onClick={handleAiExplain}
                  disabled={isAiExplaining}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold transition cursor-pointer disabled:opacity-50"
                  title="Ask Professor & Byte AI to explain this solution"
                >
                  <Bot className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden md:inline">{isAiExplaining ? 'Analyzing...' : 'AI Explain'}</span>
                </button>
              </div>
            </div>

            {/* Git Status notification toast */}
            {gitStatusMsg && (
              <div className="px-4 py-1.5 bg-slate-900 border-b border-slate-800 text-xs font-medium text-amber-300 flex items-center justify-between">
                <span>{gitStatusMsg}</span>
                <button onClick={() => setGitStatusMsg(null)} className="text-slate-500 hover:text-white">✕</button>
              </div>
            )}

            {/* Code Editor Body */}
            <div className="relative flex-1 min-h-[380px] bg-[#070a12] flex">
              {/* Line Numbers */}
              <div className="w-11 py-3 bg-[#05070d] text-slate-600 font-mono text-xs select-none text-right pr-2.5 border-r border-slate-800/80 shrink-0">
                {(activeFile?.content || '').split('\n').map((_, idx) => (
                  <div key={idx} className="leading-6">
                    {idx + 1}
                  </div>
                ))}
              </div>

              {/* Textarea Code Input */}
              <textarea
                value={activeFile?.content || ''}
                onChange={(e) => handleCodeChange(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[380px] p-3 bg-transparent text-slate-100 font-mono text-xs sm:text-sm leading-6 resize-none focus:outline-none selection:bg-amber-400/30 selection:text-white"
                placeholder="Write your code or drop a local file here..."
              />
            </div>

            {/* Editor Action Bottom Bar */}
            <div className="px-4 py-2.5 bg-[#070a12] border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span>Language: <strong className="text-amber-400 uppercase">{activeFile?.language || 'python'}</strong></span>
                <span>Lines: <strong className="text-slate-200">{(activeFile?.content || '').split('\n').length}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleCodeChange(DEFAULT_FILES[0].content);
                    sound.playPop();
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition cursor-pointer border border-slate-800"
                  title="Reset code template"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="btn-comic-push flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition cursor-pointer shadow-sm disabled:opacity-50"
                  title="Run code (Ctrl/Cmd + Enter)"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>{isRunning ? 'Compiling...' : 'Run Code'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Integrated Interactive Terminal & Output Console */}
          <div className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl overflow-hidden shadow-comic">
            {/* Terminal Tab Bar */}
            <div className="px-4 py-2 bg-[#070a12] border-b border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <button
                  onClick={() => setActiveConsoleTab('output')}
                  className={`font-mono font-bold uppercase transition cursor-pointer ${
                    activeConsoleTab === 'output' ? 'text-amber-300' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Terminal (stdout)
                </button>
                <button
                  onClick={() => setActiveConsoleTab('stdin')}
                  className={`font-mono font-bold uppercase ml-3 transition cursor-pointer ${
                    activeConsoleTab === 'stdin' ? 'text-amber-300' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Input (stdin)
                </button>
                {domPreviewHtml && (
                  <button
                    onClick={() => setActiveConsoleTab('preview')}
                    className={`font-mono font-bold uppercase ml-3 transition cursor-pointer ${
                      activeConsoleTab === 'preview' ? 'text-amber-300' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    HTML Preview
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 font-mono text-[11px]">
                {executionTime !== null && (
                  <span className="text-emerald-400 font-bold">
                    ⏱️ {executionTime.toFixed(1)} ms
                  </span>
                )}
                {executionError && (
                  <span className="text-rose-400 font-bold flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Error
                  </span>
                )}
                <button
                  onClick={() => {
                    setTerminalOutput('');
                    setExecutionTime(null);
                    setExecutionError(null);
                  }}
                  className="text-slate-400 hover:text-white transition cursor-pointer"
                  title="Clear terminal"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-3 bg-[#05070d] font-mono text-xs sm:text-sm min-h-[140px] max-h-[220px] overflow-y-auto">
              {activeConsoleTab === 'output' && (
                <pre
                  className={`whitespace-pre-wrap leading-relaxed ${
                    executionError ? 'text-rose-300' : 'text-emerald-300'
                  }`}
                >
                  {terminalOutput}
                </pre>
              )}

              {activeConsoleTab === 'stdin' && (
                <div className="space-y-2">
                  <div className="text-[11px] text-slate-400 font-sans">
                    Provide mock inputs for standard input functions like Python \`input()\` or Node.js \`readline\`:
                  </div>
                  <textarea
                    value={stdinInput}
                    onChange={(e) => setStdinInput(e.target.value)}
                    placeholder="Enter interactive input values (one per line)..."
                    className="w-full h-24 p-2 bg-[#0d121f] text-slate-100 rounded-lg border border-slate-800 focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>
              )}

              {activeConsoleTab === 'preview' && domPreviewHtml && (
                <iframe
                  srcDoc={domPreviewHtml}
                  title="Live HTML DOM Preview"
                  className="w-full h-36 bg-white rounded-lg border-0"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* New File Modal */}
      {showNewFileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl max-w-md w-full p-5 shadow-comic space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FilePlus className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-base text-white">Create New Studio File</h3>
              </div>
              <button onClick={() => setShowNewFileModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-slate-400">
              Enter file name with extension (e.g. <code className="text-amber-300">binary_tree.py</code>, <code className="text-sky-300">app.js</code>, <code className="text-emerald-300">schema.sql</code>, <code className="text-purple-300">notes.md</code>).
            </p>

            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="e.g. quicksort.py"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateFile();
                if (e.key === 'Escape') setShowNewFileModal(false);
              }}
              className="w-full bg-[#070a12] text-sm text-white px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400 font-mono"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowNewFileModal(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFile}
                className="btn-comic-push px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition shadow-sm"
              >
                Create File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};