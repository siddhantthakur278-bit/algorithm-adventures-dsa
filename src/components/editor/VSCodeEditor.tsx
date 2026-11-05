// Python 3 Studio Editor with Live Syntax Highlighting & IntelliSense Suite
import React, { useState, useEffect, useRef } from 'react';
import { useCourse } from '../../context/CourseContext';
import { runPythonTests, RunResult } from '../../utils/pythonRunner';
import { CommitResult } from '../../utils/githubService';
import { queryProfessorAI } from '../../utils/aiService';
import { ByteAvatar, ProfessorAvatar, BugsyAvatar, ComicBubble } from '../characters/Characters';
import { GithubIcon } from '../common/Icons';
import {
  Play,
  Send,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Terminal,
  FileCode,
  Sparkles,
  GitCommit as GitCommitIcon,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Bot,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  ZoomIn,
  ZoomOut,
  AlignLeft,
  Braces,
  AlertCircle,
  CheckCheck,
  Cpu,
  Layers,
  Puzzle,
  Code2,
  Wrench,
  BookOpen,
} from 'lucide-react';
import { Problem } from '../../types';
import {
  ALGORITHM_SNIPPETS,
  INSTALLED_EXTENSIONS,
  formatPythonCode,
  lintPythonCode,
  CodeDiagnostic,
  AlgorithmicSnippet,
} from '../../utils/codeExtensions';
import {
  tokenizePythonLine,
  getTokenClassName,
  INTELLISENSE_ITEMS,
  IntelliSenseItem,
} from '../../utils/pythonTokenizer';
import { sound } from '../../utils/soundEffects';

export const VSCodeEditor: React.FC = () => {
  const { selectedProblem, markProblemSolved, stats } = useCourse();

  const [code, setCode] = useState<string>('');
  const [activeTab, setActiveTab] = useState<
    'problem' | 'hints' | 'aiProfessor' | 'snippets' | 'extensions' | 'gitLog'
  >('problem');

  // Compiler & Execution States
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [latestCommit, setLatestCommit] = useState<CommitResult | null>(null);
  const [openHintLevel, setOpenHintLevel] = useState<number>(0);
  const [activeTestIndex, setActiveTestIndex] = useState<number>(0);
  const [copiedCli, setCopiedCli] = useState<boolean>(false);

  // AI Professor Assistant States
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [customAiPrompt, setCustomAiPrompt] = useState<string>('');

  // Extensions Suite States
  const [fontSize, setFontSize] = useState<number>(13);
  const [wordWrap, setWordWrap] = useState<boolean>(false);
  const [selectedSnippetCategory, setSelectedSnippetCategory] = useState<string>('all');
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [formatSuccess, setFormatSuccess] = useState<boolean>(false);
  const [cursorPos, setCursorPos] = useState<{ line: number; col: number }>({ line: 1, col: 1 });
  const [activeConsoleTab, setActiveConsoleTab] = useState<'cases' | 'custom' | 'terminal'>('cases');
  const [customInputText, setCustomInputText] = useState<string>('');
  const [customRunOutput, setCustomRunOutput] = useState<{
    result: string;
    stdout: string;
    timeMs: number;
    error?: string;
  } | null>(null);
  const [isCustomRunning, setIsCustomRunning] = useState<boolean>(false);

  // IntelliSense & Highlighting States & Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  const [showIntelliSense, setShowIntelliSense] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<IntelliSenseItem[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(0);
  const [intelliSenseCoords, setIntelliSenseCoords] = useState<{ top: number; left: number }>({ top: 32, left: 24 });

  // Compute live diagnostics (Error Lens)
  const diagnostics: CodeDiagnostic[] = lintPythonCode(code);
  const errorCount = diagnostics.filter(d => d.severity === 'error').length;
  const warningCount = diagnostics.filter(d => d.severity === 'warning').length;

  // Sync starter code when problem changes
  useEffect(() => {
    if (selectedProblem) {
      setCode(selectedProblem.starterCode);
      setRunResult(null);
      setLatestCommit(null);
      setOpenHintLevel(0);
      setActiveTestIndex(0);
      setCustomInputText(selectedProblem.testCases[0]?.input || '');
      setCustomRunOutput(null);
      setShowIntelliSense(false);
    }
  }, [selectedProblem]);

  if (!selectedProblem) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center text-slate-400">
        <p className="text-lg">No problem selected. Pick a problem from Quests or Theory!</p>
      </div>
    );
  }

  // Track cursor position (Line, Column)
  const updateCursorPos = () => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const lines = code.substring(0, start).split('\n');
    const line = lines.length;
    const col = lines[lines.length - 1].length + 1;
    setCursorPos({ line, col });
  };

  // Synchronize scrolling between textarea, syntax highlight layer, and gutter
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const { scrollTop, scrollLeft } = e.currentTarget;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = scrollTop;
      highlightRef.current.scrollLeft = scrollLeft;
    }
    if (gutterRef.current) {
      gutterRef.current.scrollTop = scrollTop;
    }
  };

  // Trigger IntelliSense keyword and function suggestions
  const triggerIntelliSense = (currentCode: string, curPos: number) => {
    const before = currentCode.substring(0, curPos);
    const wordMatch = before.match(/([a-zA-Z_][a-zA-Z0-9_]*)$/);
    if (!wordMatch) {
      setShowIntelliSense(false);
      return;
    }
    const currentWord = wordMatch[1];
    if (currentWord.length === 0) {
      setShowIntelliSense(false);
      return;
    }

    const matched = INTELLISENSE_ITEMS.filter(item => {
      const labelLower = item.label.toLowerCase();
      const wordLower = currentWord.toLowerCase();
      return labelLower.startsWith(wordLower) || (wordLower.length >= 2 && labelLower.includes(wordLower));
    }).slice(0, 7);

    if (matched.length > 0) {
      setSuggestions(matched);
      setSelectedSuggestionIndex(0);

      // Compute coordinates near cursor
      const lines = before.split('\n');
      const curLineIndex = lines.length - 1;
      const curColIndex = lines[lines.length - 1].length;
      const scrollTop = textareaRef.current ? textareaRef.current.scrollTop : 0;
      const scrollLeft = textareaRef.current ? textareaRef.current.scrollLeft : 0;

      const charWidth = fontSize * 0.6;
      const calculatedTop = curLineIndex * 24 + 28 - scrollTop;
      const calculatedLeft = curColIndex * charWidth + 12 - scrollLeft;

      setIntelliSenseCoords({
        top: Math.max(8, Math.min(calculatedTop, 280)),
        left: Math.max(8, Math.min(calculatedLeft, 380)),
      });
      setShowIntelliSense(true);
    } else {
      setShowIntelliSense(false);
    }
  };

  // Commit selected IntelliSense suggestion
  const handleAcceptSuggestion = (item: IntelliSenseItem) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    sound.playPop();

    const start = textarea.selectionStart;
    const before = code.substring(0, start);
    const after = code.substring(start);
    const wordMatch = before.match(/([a-zA-Z_][a-zA-Z0-9_]*)$/);
    const prefixLen = wordMatch ? wordMatch[1].length : 0;
    const wordStart = start - prefixLen;

    const insert = item.insertText;
    const newCode = code.substring(0, wordStart) + insert + after;
    setCode(newCode);
    setShowIntelliSense(false);

    const targetPos = item.cursorOffset !== undefined
      ? wordStart + item.cursorOffset
      : wordStart + insert.length;

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = targetPos;
        textareaRef.current.focus();
        updateCursorPos();
      }
    }, 0);
  };

  // Prettier PEP 8 Code Formatter
  const handleFormatCode = () => {
    sound.playPop();
    const formatted = formatPythonCode(code);
    setCode(formatted);
    setFormatSuccess(true);
    setTimeout(() => setFormatSuccess(false), 2200);
  };

  // Algorithmic Snippet Injection
  const handleInsertSnippet = (snippet: AlgorithmicSnippet) => {
    sound.playSuccess();
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const snippetWithNewline = `\n${snippet.code}\n`;
      const newCode = code.substring(0, start) + snippetWithNewline + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + snippetWithNewline.length;
      }, 50);
    } else {
      setCode(prev => `${prev}\n\n${snippet.code}\n`);
    }

    setCopiedSnippetId(snippet.id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  // Keyboard Shortcuts (Tab, Shift+Tab, Ctrl+/, Ctrl+Enter, Alt+Shift+F, Auto-Indent, Pairs)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // 1. IntelliSense Navigation & Selection
    if (showIntelliSense && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestionIndex(i => (i + 1) % suggestions.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestionIndex(i => (i - 1 + suggestions.length) % suggestions.length);
        return;
      }
      if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault();
        handleAcceptSuggestion(suggestions[selectedSuggestionIndex]);
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowIntelliSense(false);
        return;
      }
    }

    // 2. Alt+Shift+F -> Format Code
    if (e.altKey && e.shiftKey && (e.key === 'F' || e.key === 'f')) {
      e.preventDefault();
      handleFormatCode();
      return;
    }

    // 3. Ctrl+Enter or Cmd+Enter -> Run Tests
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRun();
      return;
    }

    // 4. Ctrl+/ or Cmd+/ -> Comment Line(s) with #
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      const before = code.substring(0, start);
      const after = code.substring(end);
      const lineStart = before.lastIndexOf('\n') + 1;
      const lineEnd = end + (after.indexOf('\n') === -1 ? after.length : after.indexOf('\n'));
      const targetLines = code.substring(lineStart, lineEnd).split('\n');

      const areAllCommented = targetLines.every(l => l.trimStart().startsWith('#'));
      const toggledLines = targetLines.map(l => {
        if (areAllCommented) {
          return l.replace(/^(\s*)#\s?/, '$1');
        } else {
          return l.replace(/^(\s*)/, '$1# ');
        }
      });

      const newCode = code.substring(0, lineStart) + toggledLines.join('\n') + code.substring(lineEnd);
      setCode(newCode);
      return;
    }

    // 5. Enter Key -> Auto-Indentation & Colon Detection
    if (e.key === 'Enter') {
      e.preventDefault();
      const before = code.substring(0, start);
      const after = code.substring(end);
      const lastNewline = before.lastIndexOf('\n');
      const currentLine = before.substring(lastNewline + 1);

      // Detect current line's leading indentation
      const indentMatch = currentLine.match(/^(\s*)/);
      const currentIndent = indentMatch ? indentMatch[1] : '';

      // Check if line ends with colon ':' (ignoring trailing whitespace)
      const trimmedLine = currentLine.trimEnd();
      const isColonEnding = trimmedLine.endsWith(':');

      // Auto-indent +4 spaces after colon, otherwise preserve current indentation
      const nextIndent = currentIndent + (isColonEnding ? '    ' : '');
      const insertion = '\n' + nextIndent;
      const newCode = before + insertion + after;
      setCode(newCode);
      setShowIntelliSense(false);

      setTimeout(() => {
        if (textareaRef.current) {
          const targetPos = start + insertion.length;
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = targetPos;
          updateCursorPos();
        }
      }, 0);
      return;
    }

    // 6. Backspace Key -> Smart 4-Space Un-Indent & Pair Deletion
    if (e.key === 'Backspace' && start === end && start > 0) {
      const before = code.substring(0, start);
      const lastNewline = before.lastIndexOf('\n');
      const lineBeforeCursor = before.substring(lastNewline + 1);

      // If cursor is on indentation consisting only of spaces and ends with 4 spaces
      if (/^\s+$/.test(lineBeforeCursor) && lineBeforeCursor.endsWith('    ')) {
        e.preventDefault();
        const newCode = code.substring(0, start - 4) + code.substring(end);
        setCode(newCode);
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start - 4;
            updateCursorPos();
          }
        }, 0);
        return;
      }

      // Auto-close pair deletion ((), [], {}, "", '')
      const charBefore = code[start - 1];
      const charAfter = code[start];
      if (
        (charBefore === '(' && charAfter === ')') ||
        (charBefore === '[' && charAfter === ']') ||
        (charBefore === '{' && charAfter === '}') ||
        (charBefore === '"' && charAfter === '"') ||
        (charBefore === "'" && charAfter === "'")
      ) {
        e.preventDefault();
        const newCode = code.substring(0, start - 1) + code.substring(start + 1);
        setCode(newCode);
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start - 1;
            updateCursorPos();
          }
        }, 0);
        return;
      }
    }

    // 7. Auto-Closing Pairs: (), [], {}, "", ''
    const pairMap: Record<string, string> = {
      '(': ')',
      '[': ']',
      '{': '}',
      '"': '"',
      "'": "'",
    };

    // Skip over closing character if already present immediately after cursor
    if ((e.key === ')' || e.key === ']' || e.key === '}' || e.key === '"' || e.key === "'") && code[start] === e.key && start === end) {
      e.preventDefault();
      textarea.selectionStart = textarea.selectionEnd = start + 1;
      return;
    }

    // Insert pair if typing opening character
    if (pairMap[e.key] && !e.ctrlKey && !e.metaKey && !e.altKey && start === end) {
      e.preventDefault();
      const closing = pairMap[e.key];
      const newCode = code.substring(0, start) + e.key + closing + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1;
          updateCursorPos();
        }
      }, 0);
      return;
    }

    // 8. Tab & Shift+Tab Indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        // Shift+Tab Outdent
        const before = code.substring(0, start);
        const lineStart = before.lastIndexOf('\n') + 1;
        const currentLine = code.substring(lineStart);
        if (currentLine.startsWith('    ')) {
          const newCode = code.substring(0, lineStart) + currentLine.substring(4);
          setCode(newCode);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = Math.max(lineStart, start - 4);
            updateCursorPos();
          }, 0);
        }
      } else {
        // Tab Indent (4 spaces)
        const newCode = code.substring(0, start) + '    ' + code.substring(end);
        setCode(newCode);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 4;
          updateCursorPos();
        }, 0);
      }
    }
  };

  const codeLines = code.split('\n');
  const lineCount = codeLines.length;
  const isSolved = stats.solvedProblemIds.includes(selectedProblem.id);

  // Standard Test Cases Execution
  const handleRun = async () => {
    setIsRunning(true);
    setRunResult(null);
    setActiveConsoleTab('cases');
    try {
      const res = await runPythonTests(code, selectedProblem.testCases);
      setRunResult(res);
      if (res.allPassed) {
        sound.playSuccess();
      } else {
        sound.playError();
      }
    } finally {
      setIsRunning(false);
    }
  };

  // Submit and Commit
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setActiveConsoleTab('cases');
    try {
      const res = await runPythonTests(code, selectedProblem.testCases);
      setRunResult(res);

      if (res.allPassed) {
        const commitRes = await markProblemSolved(selectedProblem, code);
        setLatestCommit(commitRes);
      } else {
        sound.playError();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Run Custom Input in REPL
  const handleRunCustomInput = async () => {
    if (!customInputText.trim()) return;
    setIsCustomRunning(true);
    sound.playPop();
    const start = performance.now();
    try {
      const customTestCase = {
        id: 'custom-io',
        input: customInputText.trim(),
        expectedOutput: '',
      };
      const res = await runPythonTests(code, [customTestCase]);
      const tc = res.results[0];
      setCustomRunOutput({
        result: tc?.actualOutput || 'None',
        stdout: tc?.stdout || res.globalStdout || '',
        timeMs: Math.round(performance.now() - start),
        error: tc?.error || res.syntaxError,
      });
      setActiveConsoleTab('custom');
    } finally {
      setIsCustomRunning(false);
    }
  };

  const downloadSolution = () => {
    const blob = new Blob([code], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `solution_${selectedProblem.slug}.py`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyGitCommand = () => {
    const cmd = `git add . && git commit -m "feat(dsa): Byte solved ${selectedProblem.title} with ${selectedProblem.timeComplexity} solution"`;
    navigator.clipboard.writeText(cmd);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const askProfessor = async (type: 'complexity' | 'trap' | 'pattern' | 'solution') => {
    if (type === 'solution') {
      setCode(selectedProblem.solutionCode);
      setAiMessage('Professor: "I have injected the canonical reference solution into your editor. Step through it and observe how it guarantees optimal complexity!"');
      return;
    }

    setIsAiThinking(true);
    setAiMessage(null);
    try {
      let promptQuery = '';
      if (type === 'complexity') {
        promptQuery = `Analyze the time and space complexity of my current Python solution for "${selectedProblem.title}". Compare it with target ${selectedProblem.timeComplexity} / ${selectedProblem.spaceComplexity} and suggest improvements.`;
      } else if (type === 'trap') {
        promptQuery = `What tricky edge cases, boundary conditions, and traps would Bugsy plant for "${selectedProblem.title}"?`;
      } else if (type === 'pattern') {
        promptQuery = `What algorithm paradigm (Two Pointers, DP, Monotonic Stack, etc.) best solves "${selectedProblem.title}" and why?`;
      }

      const response = await queryProfessorAI(promptQuery, {
        problem: selectedProblem,
        userCode: code,
        errorContext: runResult?.syntaxError || (runResult?.allPassed === false ? JSON.stringify(runResult.results) : undefined),
      });
      setAiMessage(response);
    } finally {
      setIsAiThinking(false);
    }
  };

  const askCustomProfessor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAiPrompt.trim() || isAiThinking) return;

    setIsAiThinking(true);
    const query = customAiPrompt.trim();
    setCustomAiPrompt('');
    try {
      const response = await queryProfessorAI(query, {
        problem: selectedProblem,
        userCode: code,
        errorContext: runResult?.syntaxError || (runResult?.allPassed === false ? JSON.stringify(runResult.results) : undefined),
      });
      setAiMessage(response);
    } finally {
      setIsAiThinking(false);
    }
  };

  const filteredSnippets =
    selectedSnippetCategory === 'all'
      ? ALGORITHM_SNIPPETS
      : ALGORITHM_SNIPPETS.filter(s => s.category.toLowerCase().includes(selectedSnippetCategory.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      {/* Top Breadcrumb & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0c101d] px-4 py-2.5 rounded-xl border-2 border-[#1c243a] shadow-comic-sm">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-[#38BDF8]" />
          <span className="font-bangers text-lg text-white tracking-wide">
            {selectedProblem.title}
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-[#13182b] text-slate-300 border border-[#232c45]">
            {selectedProblem.category}
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-[#241805] text-[#FBBF24] border border-[#FBBF24]/40 font-bold">
            {selectedProblem.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Linter Status Pill */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition ${
              errorCount > 0
                ? 'bg-[#240b10] text-[#F43F5E] border-[#F43F5E]/40'
                : warningCount > 0
                ? 'bg-[#241805] text-[#FBBF24] border-[#FBBF24]/40'
                : 'bg-[#071d14] text-[#34D399] border-[#10B981]/40'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>
              {errorCount > 0
                ? `${errorCount} Error${errorCount > 1 ? 's' : ''}`
                : warningCount > 0
                ? `${warningCount} Warning${warningCount > 1 ? 's' : ''}`
                : '0 Errors (Clean Syntax)'}
            </span>
          </div>

          {isSolved && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071d14] text-[#34D399] font-bold text-xs border border-[#10B981]/40">
              <CheckCircle2 className="w-4 h-4" />
              Solved & Synced with Git
            </div>
          )}
        </div>
      </div>

      {/* Main IDE Workspace: Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[660px]">
        {/* Left Drawer (5 cols): Description, Hints, AI Professor, Snippets Vault, Extensions, Git */}
        <div className="lg:col-span-5 bg-[#0c101d] rounded-2xl border-2 border-[#1c243a] shadow-comic-sm flex flex-col overflow-hidden">
          {/* Drawer Tabs */}
          <div className="flex items-center border-b border-[#1b233a] bg-[#070a14] px-2 pt-2 gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('problem')}
              className={`px-2.5 py-2 text-xs font-bold rounded-t-lg transition border-t-2 border-x-2 whitespace-nowrap ${
                activeTab === 'problem'
                  ? 'bg-[#0c101d] text-white border-black border-b-transparent'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-white'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('snippets')}
              className={`flex items-center gap-1 px-2.5 py-2 text-xs font-bold rounded-t-lg transition border-t-2 border-x-2 whitespace-nowrap ${
                activeTab === 'snippets'
                  ? 'bg-[#0c101d] text-[#06B6D4] border-black border-b-transparent'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <Braces className="w-3.5 h-3.5 text-[#06B6D4]" />
              Snippets
            </button>
            <button
              onClick={() => setActiveTab('extensions')}
              className={`flex items-center gap-1 px-2.5 py-2 text-xs font-bold rounded-t-lg transition border-t-2 border-x-2 whitespace-nowrap ${
                activeTab === 'extensions'
                  ? 'bg-[#0c101d] text-[#FB923C] border-black border-b-transparent'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <Puzzle className="w-3.5 h-3.5 text-[#FB923C]" />
              Extensions
            </button>
            <button
              onClick={() => setActiveTab('hints')}
              className={`flex items-center gap-1 px-2.5 py-2 text-xs font-bold rounded-t-lg transition border-t-2 border-x-2 whitespace-nowrap ${
                activeTab === 'hints'
                  ? 'bg-[#0c101d] text-[#FBBF24] border-black border-b-transparent'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#FBBF24]" />
              Hints (3)
            </button>
            <button
              onClick={() => setActiveTab('aiProfessor')}
              className={`flex items-center gap-1 px-2.5 py-2 text-xs font-bold rounded-t-lg transition border-t-2 border-x-2 whitespace-nowrap ${
                activeTab === 'aiProfessor'
                  ? 'bg-[#0c101d] text-[#10B981] border-black border-b-transparent'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-[#10B981]" />
              AI Copilot
            </button>
            <button
              onClick={() => setActiveTab('gitLog')}
              className={`flex items-center gap-1 px-2.5 py-2 text-xs font-bold rounded-t-lg transition border-t-2 border-x-2 whitespace-nowrap ${
                activeTab === 'gitLog'
                  ? 'bg-[#0c101d] text-[#38BDF8] border-black border-b-transparent'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-white'
              }`}
            >
              <GitCommitIcon className="w-3.5 h-3.5 text-[#38BDF8]" />
              Git
            </button>
          </div>

          {/* Drawer Content */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4 text-slate-200 text-sm">
            {/* 1. Problem Description */}
            {activeTab === 'problem' && (
              <div className="space-y-4">
                <p className="leading-relaxed text-slate-200">{selectedProblem.description}</p>

                {/* Examples */}
                <div className="space-y-2">
                  <h4 className="font-bangers text-base text-[#FBBF24] tracking-wide">Examples</h4>
                  {selectedProblem.examples.map((ex, i) => (
                    <div key={i} className="p-3 bg-[#080d19] rounded-xl border border-[#1b233a] font-mono text-xs space-y-1">
                      <div>
                        <strong className="text-slate-400">Input:</strong> <span className="text-slate-200">{ex.input}</span>
                      </div>
                      <div>
                        <strong className="text-[#34D399]">Output:</strong> <span className="text-emerald-300">{ex.output}</span>
                      </div>
                      {ex.explanation && (
                        <div className="text-slate-400 italic font-sans text-[11px] pt-1">
                          Explanation: {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-1.5">
                  <h4 className="font-bangers text-base text-[#38BDF8] tracking-wide">Constraints</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 font-mono">
                    {selectedProblem.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Target Complexities */}
                <div className="flex gap-4 pt-2">
                  <div className="text-xs">
                    <span className="text-slate-400">Target Time:</span>{' '}
                    <strong className="text-[#FBBF24] font-mono">{selectedProblem.timeComplexity}</strong>
                  </div>
                  <div className="text-xs">
                    <span className="text-slate-400">Target Space:</span>{' '}
                    <strong className="text-[#38BDF8] font-mono">{selectedProblem.spaceComplexity}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Algorithmic Snippets Vault */}
            {activeTab === 'snippets' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bangers text-base text-white">INTELLISENSE SNIPPETS VAULT</h4>
                    <p className="text-[11px] text-slate-400">
                      Click any snippet below to insert production algorithm templates directly into your code!
                    </p>
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {['all', 'arrays', 'searching', 'graphs', 'heaps', 'dynamic'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedSnippetCategory(cat)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold capitalize transition border ${
                        selectedSnippetCategory === cat
                          ? 'bg-[#06B6D4] text-black border-black shadow-comic-sm'
                          : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Snippets List */}
                <div className="space-y-2.5">
                  {filteredSnippets.map(snippet => (
                    <div
                      key={snippet.id}
                      className="p-3 bg-[#080d19] rounded-xl border border-[#1b233a] hover:border-[#06B6D4]/50 transition space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bangers text-sm text-white block">{snippet.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{snippet.category}</span>
                        </div>
                        <button
                          onClick={() => handleInsertSnippet(snippet)}
                          className="px-2.5 py-1 rounded-lg bg-[#06B6D4] hover:bg-[#22d3ee] text-black font-bangers text-xs border border-black shadow-comic-sm transition flex items-center gap-1 cursor-pointer"
                        >
                          {copiedSnippetId === snippet.id ? (
                            <>
                              <Check className="w-3 h-3" /> Inserted!
                            </>
                          ) : (
                            <>
                              <Braces className="w-3 h-3" /> Insert Code
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-300">{snippet.description}</p>
                      <pre className="p-2 bg-[#05070d] rounded-lg text-[10px] font-mono text-[#38BDF8] overflow-x-auto max-h-24">
                        {snippet.code}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Installed Extensions Marketplace */}
            {activeTab === 'extensions' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-bangers text-base text-white flex items-center gap-2">
                    <Puzzle className="w-4 h-4 text-[#FB923C]" />
                    INSTALLED COMPILER EXTENSIONS ({INSTALLED_EXTENSIONS.length})
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    High-performance developer plugins active in this workspace session.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {INSTALLED_EXTENSIONS.map(ext => (
                    <div
                      key={ext.id}
                      className="p-3 bg-[#080d19] rounded-xl border border-[#1b233a] flex items-start gap-3"
                    >
                      <div className="text-2xl p-2 rounded-xl bg-[#13182b] border border-[#232c45]">
                        {ext.icon}
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs truncate">{ext.name}</span>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold bg-[#071d14] px-1.5 py-0.5 rounded border border-[#10B981]/40">
                            v{ext.version}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug">{ext.description}</p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono pt-1">
                          <span>{ext.category}</span>
                          <span>•</span>
                          <span>{ext.author}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Progressive Hints */}
            {activeTab === 'hints' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-300">
                  Stuck? Unlock hints progressively without spoiling the full solution!
                </div>

                {/* Hint 1: Byte */}
                <div className="p-3.5 bg-[#071628] rounded-xl border border-[#38BDF8]/40 space-y-2">
                  <button
                    onClick={() => setOpenHintLevel(openHintLevel === 1 ? 0 : 1)}
                    className="flex items-center justify-between w-full text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <ByteAvatar size="sm" mood="thinking" />
                      <span className="font-bangers text-[#38BDF8] tracking-wider text-sm">
                        Hint 1: Byte’s Starter Clue
                      </span>
                    </div>
                    {openHintLevel >= 1 ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                  </button>
                  {openHintLevel >= 1 && (
                    <p className="text-xs text-sky-200 pt-2 border-t border-[#1b2b40] leading-relaxed">
                      {selectedProblem.hints.byteHint}
                    </p>
                  )}
                </div>

                {/* Hint 2: Professor */}
                <div className="p-3.5 bg-[#181305] rounded-xl border border-[#FBBF24]/40 space-y-2">
                  <button
                    onClick={() => setOpenHintLevel(openHintLevel === 2 ? 0 : 2)}
                    className="flex items-center justify-between w-full text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <ProfessorAvatar size="sm" mood="teaching" />
                      <span className="font-bangers text-[#FBBF24] tracking-wider text-sm">
                        Hint 2: Professor’s Deep Insight
                      </span>
                    </div>
                    {openHintLevel >= 2 ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                  </button>
                  {openHintLevel >= 2 && (
                    <p className="text-xs text-amber-200 pt-2 border-t border-[#3a2e0a] leading-relaxed">
                      {selectedProblem.hints.professorInsight}
                    </p>
                  )}
                </div>

                {/* Hint 3: Bugsy's Trap */}
                <div className="p-3.5 bg-[#1f0b12] rounded-xl border border-[#F43F5E]/40 space-y-2">
                  <button
                    onClick={() => setOpenHintLevel(openHintLevel === 3 ? 0 : 3)}
                    className="flex items-center justify-between w-full text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <BugsyAvatar size="sm" mood="sneaky" />
                      <span className="font-bangers text-[#F43F5E] tracking-wider text-sm">
                        Hint 3: Bugsy’s Trap & Edge Cases
                      </span>
                    </div>
                    {openHintLevel >= 3 ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                  </button>
                  {openHintLevel >= 3 && (
                    <p className="text-xs text-rose-200 pt-2 border-t border-[#40121d] leading-relaxed">
                      {selectedProblem.hints.bugsyTrap}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 5. AI Copilot */}
            {activeTab === 'aiProfessor' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ProfessorAvatar size="sm" mood="teaching" />
                  <div>
                    <h4 className="font-bangers text-white text-base">AI PROFESSOR CODE ASSISTANT</h4>
                    <p className="text-[11px] text-slate-400">Ask the Professor for real-time guidance!</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    disabled={isAiThinking}
                    onClick={() => askProfessor('complexity')}
                    className="p-2.5 rounded-xl bg-[#081a2e] hover:bg-[#0e2744] border border-[#38BDF8]/40 text-left text-xs font-semibold text-sky-200 transition disabled:opacity-50 cursor-pointer"
                  >
                    🧠 Time & Space Goals
                  </button>
                  <button
                    disabled={isAiThinking}
                    onClick={() => askProfessor('trap')}
                    className="p-2.5 rounded-xl bg-[#240b10] hover:bg-[#34121a] border border-[#F43F5E]/40 text-left text-xs font-semibold text-rose-200 transition disabled:opacity-50 cursor-pointer"
                  >
                    🐛 Spot Bugsy's Trap
                  </button>
                  <button
                    disabled={isAiThinking}
                    onClick={() => askProfessor('pattern')}
                    className="p-2.5 rounded-xl bg-[#1e1705] hover:bg-[#2d2208] border border-[#FBBF24]/40 text-left text-xs font-semibold text-amber-200 transition disabled:opacity-50 cursor-pointer"
                  >
                    ⚡ Optimal Algorithm
                  </button>
                  <button
                    disabled={isAiThinking}
                    onClick={() => askProfessor('solution')}
                    className="p-2.5 rounded-xl bg-[#071d14] hover:bg-[#0c2a1e] border border-[#10B981]/40 text-left text-xs font-semibold text-emerald-200 transition disabled:opacity-50 cursor-pointer"
                  >
                    📜 Load Reference Code
                  </button>
                </div>

                {/* Custom Question Input Form */}
                <form onSubmit={askCustomProfessor} className="flex gap-2">
                  <input
                    type="text"
                    value={customAiPrompt}
                    onChange={e => setCustomAiPrompt(e.target.value)}
                    placeholder="Ask Professor anything about your code..."
                    disabled={isAiThinking}
                    className="flex-1 bg-[#080d19] border border-[#232c45] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#10B981] disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isAiThinking || !customAiPrompt.trim()}
                    className="px-3 py-2 rounded-xl bg-[#10B981] hover:bg-[#34D399] text-black font-bangers text-xs border border-black shadow-comic-sm disabled:opacity-50 transition cursor-pointer"
                  >
                    Ask
                  </button>
                </form>

                {isAiThinking ? (
                  <div className="p-4 bg-[#0f1424] rounded-xl border border-[#1c243a] flex items-center justify-center gap-3 text-xs text-slate-300">
                    <ProfessorAvatar size="sm" mood="teaching" className="animate-bounce" />
                    <span>Professor Algorismus is analyzing your algorithm...</span>
                  </div>
                ) : aiMessage ? (
                  <div className="p-4 bg-[#0f1424] rounded-xl border-2 border-black space-y-2">
                    <ComicBubble speaker="professor" text={aiMessage} subtext="Gemini Live Intelligence" />
                  </div>
                ) : (
                  <div className="p-4 bg-[#080d19] rounded-xl border border-[#1b233a] text-xs text-slate-400 italic text-center">
                    Click any query above or type a custom question to receive live counsel from Professor Algorismus.
                  </div>
                )}

                {/* Developer Utilities */}
                <div className="pt-2 border-t border-[#1b233a] space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Developer Utilities
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={downloadSolution}
                      className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-lg bg-[#13182b] hover:bg-[#1d243c] text-xs font-semibold text-slate-200 border border-[#232c45] transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#38BDF8]" />
                      Download .py
                    </button>
                    <button
                      onClick={copyGitCommand}
                      className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-lg bg-[#13182b] hover:bg-[#1d243c] text-xs font-semibold text-slate-200 border border-[#232c45] transition cursor-pointer"
                    >
                      {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#FBBF24]" />}
                      {copiedCli ? 'Copied CLI!' : 'Copy Git CLI'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 6. Git Commit Log */}
            {activeTab === 'gitLog' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bangers text-base text-white tracking-wide">Direct Git Commits</h4>
                  <span className="text-xs text-slate-400 font-mono">
                    {stats.gitCommits.length} commits logged
                  </span>
                </div>

                {latestCommit && (
                  <div className="p-3.5 bg-green-500/10 border-2 border-green-500/40 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-green-300 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      {latestCommit.message}
                    </div>
                    <div className="text-[11px] font-mono text-gray-300 bg-black/40 p-2 rounded">
                      SHA: {latestCommit.commit.hash.slice(0, 10)}
                    </div>
                    {latestCommit.commitUrl && (
                      <a
                        href={latestCommit.commitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#38B6FF] hover:underline flex items-center gap-1"
                      >
                        View Commit on GitHub <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  {stats.gitCommits.slice(0, 5).map((cmt, idx) => (
                    <div key={idx} className="p-3 bg-[#0d101c] rounded-xl border border-gray-800 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-[#FFDE59] font-bold">
                          {cmt.hash.slice(0, 8)}
                        </span>
                        <span className="text-gray-400 text-[10px]">
                          {new Date(cmt.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-200 font-medium truncate">{cmt.message}</p>
                      <span className="text-[10px] text-gray-400 block font-mono">
                        file: {cmt.fileChanged}
                      </span>
                    </div>
                  ))}
                  {stats.gitCommits.length === 0 && (
                    <p className="text-xs text-gray-400 italic">No commits yet. Solve a problem to create your first commit!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane (7 cols): VS Code Studio Editor with Extension Bar & Console */}
        <div className="lg:col-span-7 flex flex-col bg-[#0a0d17] rounded-2xl border-2 border-[#1c243a] shadow-comic-lg overflow-hidden">
          {/* VS Code Window Header & Tab Toolbar */}
          <div className="bg-[#131728] px-4 py-2 flex flex-wrap items-center justify-between gap-2 border-b border-[#1b233a] select-none">
            {/* Window Traffic Lights & Tab File */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#f43f5e]" />
              <span className="w-3 h-3 rounded-full bg-[#fbbf24]" />
              <span className="w-3 h-3 rounded-full bg-[#10b981]" />
              <span className="text-xs text-slate-200 font-mono ml-2 font-semibold">
                solution_{selectedProblem.slug}.py
              </span>
            </div>

            {/* Extension Badges & Quick Format */}
            <div className="flex items-center gap-2">
              {formatSuccess && (
                <span className="text-[10px] font-mono text-[#34D399] font-bold animate-comic-pop bg-[#071d14] px-2 py-0.5 rounded border border-[#10B981]/50">
                  ✨ Prettier Formatted!
                </span>
              )}

              <button
                onClick={handleFormatCode}
                className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-[#1c243c] hover:bg-[#283556] text-slate-200 border border-[#2f3c60] transition cursor-pointer"
                title="Format Code (Alt+Shift+F)"
              >
                <AlignLeft className="w-3 h-3 text-[#38BDF8]" />
                Format
              </button>

              {/* Word wrap toggle */}
              <button
                onClick={() => setWordWrap(!wordWrap)}
                className={`text-[11px] font-mono px-2 py-0.5 rounded border transition cursor-pointer ${
                  wordWrap ? 'bg-[#1c243c] text-[#38BDF8] border-[#38BDF8]/40' : 'bg-[#121626] text-slate-400 border-[#1e2538]'
                }`}
                title="Toggle Word Wrap"
              >
                Wrap
              </button>

              {/* Font Zoom Controls */}
              <div className="flex items-center bg-[#121626] rounded border border-[#1e2538] text-[10px] font-mono">
                <button
                  onClick={() => setFontSize(f => Math.max(11, f - 1))}
                  className="px-1.5 py-0.5 hover:bg-[#1a2034] text-slate-300 cursor-pointer"
                  title="Zoom Out"
                >
                  A-
                </button>
                <span className="px-1 text-slate-400">{fontSize}px</span>
                <button
                  onClick={() => setFontSize(f => Math.min(20, f + 1))}
                  className="px-1.5 py-0.5 hover:bg-[#1a2034] text-slate-300 cursor-pointer"
                  title="Zoom In"
                >
                  A+
                </button>
              </div>

              <span className="text-[10px] font-mono text-[#38BDF8] bg-[#07192a] px-2 py-0.5 rounded border border-[#38BDF8]/30">
                Python 3.12 Wasm
              </span>
            </div>
          </div>

          {/* Editor Body: Synchronized Syntax Highlighter + Transparent Textarea + Gutter */}
          <div
            ref={editorContainerRef}
            className="flex flex-1 relative min-h-[380px] max-h-[520px] bg-[#090c16] font-mono text-sm overflow-hidden select-none"
          >
            {/* Line Numbers Gutter with Diagnostic Indicators */}
            <div
              ref={gutterRef}
              className="w-12 bg-[#0c0f1c] text-slate-500 text-right pr-2 pt-3 select-none text-xs font-mono border-r border-[#1c243a] overflow-hidden flex-shrink-0 z-10"
            >
              {Array.from({ length: Math.max(14, lineCount) }).map((_, i) => {
                const lineNum = i + 1;
                const lineDiag = diagnostics.find(d => d.line === lineNum);
                const isError = lineDiag?.severity === 'error';
                const isWarning = lineDiag?.severity === 'warning';
                const isCurrent = cursorPos.line === lineNum;

                return (
                  <div key={i} className="h-6 leading-6 flex items-center justify-end gap-1">
                    {isError && (
                      <span
                        className="w-2 h-2 rounded-full bg-rose-500 animate-pulse inline-block"
                        title={lineDiag?.message}
                      />
                    )}
                    {isWarning && !isError && (
                      <span
                        className="w-2 h-2 rounded-full bg-amber-400 inline-block"
                        title={lineDiag?.message}
                      />
                    )}
                    <span className={isCurrent ? 'text-[#38BDF8] font-bold' : ''}>
                      {lineNum}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Editor Canvas Container */}
            <div className="relative flex-1 h-full overflow-hidden">
              {/* Underlying Syntax Highlighting Layer */}
              <div
                ref={highlightRef}
                aria-hidden="true"
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight: '24px',
                  tabSize: 4,
                }}
                className={`absolute inset-0 p-3 pointer-events-none select-none font-mono ${
                  wordWrap ? 'whitespace-pre-wrap break-words overflow-hidden' : 'whitespace-pre overflow-hidden'
                }`}
              >
                {codeLines.map((lineText, idx) => {
                  const lineNum = idx + 1;
                  const tokens = tokenizePythonLine(lineText, lineNum, diagnostics);
                  return (
                    <div key={idx} className="h-6 leading-6 whitespace-pre">
                      {tokens.length === 0 || (tokens.length === 1 && tokens[0].text === ' ' && lineText.length === 0) ? (
                        <span>&nbsp;</span>
                      ) : (
                        tokens.map((token, tIdx) => (
                          <span
                            key={tIdx}
                            className={getTokenClassName(token.type, token.error, token.warning)}
                            title={token.error || token.warning}
                          >
                            {token.text}
                          </span>
                        ))
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Top Interactive Transparent Textarea Overlay */}
              <textarea
                ref={textareaRef}
                value={code}
                onChange={e => {
                  const val = e.target.value;
                  setCode(val);
                  updateCursorPos();
                  triggerIntelliSense(val, e.target.selectionStart);
                }}
                onKeyUp={e => {
                  updateCursorPos();
                  triggerIntelliSense(code, e.currentTarget.selectionStart);
                }}
                onClick={e => {
                  updateCursorPos();
                  triggerIntelliSense(code, e.currentTarget.selectionStart);
                }}
                onScroll={handleScroll}
                onKeyDown={handleKeyDown}
                onBlur={() => setTimeout(() => setShowIntelliSense(false), 250)}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight: '24px',
                  tabSize: 4,
                }}
                className={`code-editor-textarea absolute inset-0 p-3 font-mono leading-6 resize-none outline-none border-none bg-transparent ${
                  wordWrap ? 'whitespace-pre-wrap break-words overflow-y-auto' : 'whitespace-pre overflow-auto'
                }`}
                placeholder="# Write your Python 3 solution here..."
              />

              {/* Floating IntelliSense Autocomplete Popover */}
              {showIntelliSense && suggestions.length > 0 && (
                <div
                  style={{
                    top: `${intelliSenseCoords.top}px`,
                    left: `${intelliSenseCoords.left}px`,
                  }}
                  className="absolute z-50 w-80 max-w-[calc(100%-20px)] bg-[#101424] border-2 border-[#2b395e] rounded-xl shadow-comic-lg p-1.5 space-y-1 animate-comic-pop"
                >
                  <div className="flex items-center justify-between px-2 py-0.5 border-b border-[#1c243a] text-[10px] font-mono text-slate-400">
                    <span className="text-[#38BDF8] font-bold">✨ IntelliSense Options</span>
                    <span>Tab / ↵ to accept</span>
                  </div>
                  <div className="max-h-52 overflow-y-auto space-y-0.5">
                    {suggestions.map((item, idx) => {
                      const isSelected = idx === selectedSuggestionIndex;
                      return (
                        <button
                          key={item.label}
                          type="button"
                          onMouseDown={e => {
                            e.preventDefault();
                            handleAcceptSuggestion(item);
                          }}
                          className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between text-xs font-mono transition cursor-pointer ${
                            isSelected
                              ? 'bg-[#1e2c4d] border-l-4 border-l-[#38BDF8] text-white shadow-comic-sm'
                              : 'text-slate-300 hover:bg-[#161c30]'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span
                              className={`text-[9px] px-1 py-0.2 rounded font-bold uppercase ${
                                item.kind === 'keyword'
                                  ? 'bg-purple-900/60 text-purple-300 border border-purple-500/40'
                                  : item.kind === 'function'
                                  ? 'bg-yellow-900/60 text-yellow-300 border border-yellow-500/40'
                                  : item.kind === 'method'
                                  ? 'bg-orange-900/60 text-orange-300 border border-orange-500/40'
                                  : item.kind === 'snippet'
                                  ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-500/40'
                                  : 'bg-blue-900/60 text-blue-300 border border-blue-500/40'
                              }`}
                            >
                              {item.kind === 'keyword'
                                ? 'kw'
                                : item.kind === 'function'
                                ? 'fn'
                                : item.kind === 'method'
                                ? 'm'
                                : item.kind === 'snippet'
                                ? 'snip'
                                : 'val'}
                            </span>
                            <span className="font-bold text-white truncate">{item.label}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 truncate max-w-[130px] font-sans">
                            {item.detail}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="bg-[#0e1220] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border-t border-[#1c243a]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCode(selectedProblem.starterCode)}
                className="text-xs text-slate-400 hover:text-white transition font-mono cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Starter
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleRun}
                disabled={isRunning || isSubmitting}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#1c243c] hover:bg-[#253052] text-slate-100 transition border border-[#2f3c60] disabled:opacity-50 btn-comic-push cursor-pointer"
                title="Run Tests (Ctrl+Enter)"
              >
                <Play className={`w-3.5 h-3.5 text-[#38BDF8] ${isRunning ? 'animate-spin' : ''}`} />
                {isRunning ? 'Running (Pyodide Wasm)...' : 'Run Tests'}
              </button>

              <button
                onClick={handleSubmit}
                disabled={isRunning || isSubmitting}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-[#FBBF24] text-black hover:bg-[#f59e0b] transition shadow-comic-sm border-2 border-black disabled:opacity-50 btn-comic-push cursor-pointer"
              >
                <Send className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                {isSubmitting ? 'Submitting & Committing...' : 'Submit & Git Commit'}
              </button>
            </div>
          </div>

          {/* Console / Output Engine with Tabs: Test Cases | Custom REPL | Terminal */}
          <div className="bg-[#060810] border-t-2 border-[#1c243a] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#1b233a] pb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveConsoleTab('cases')}
                  className={`text-xs font-bangers px-3 py-1 rounded-lg border transition cursor-pointer ${
                    activeConsoleTab === 'cases'
                      ? 'bg-[#1c253e] text-white border-[#38BDF8]'
                      : 'bg-[#0f1424] text-slate-400 border-[#1c243a] hover:text-white'
                  }`}
                >
                  🧪 Test Cases ({selectedProblem.testCases.length})
                </button>
                <button
                  onClick={() => setActiveConsoleTab('custom')}
                  className={`text-xs font-bangers px-3 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1 ${
                    activeConsoleTab === 'custom'
                      ? 'bg-[#1c253e] text-[#06B6D4] border-[#06B6D4]'
                      : 'bg-[#0f1424] text-slate-400 border-[#1c243a] hover:text-white'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  Custom I/O REPL
                </button>
                <button
                  onClick={() => setActiveConsoleTab('terminal')}
                  className={`text-xs font-bangers px-3 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1 ${
                    activeConsoleTab === 'terminal'
                      ? 'bg-[#1c253e] text-[#FBBF24] border-[#FBBF24]'
                      : 'bg-[#0f1424] text-slate-400 border-[#1c243a] hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Terminal Stdout
                </button>
              </div>

              {runResult && (
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    runResult.allPassed
                      ? 'bg-[#071d14] text-[#34D399] border border-[#10B981]/40 animate-comic-pop'
                      : 'bg-[#240b10] text-[#F43F5E] border border-[#F43F5E]/40 animate-comic-shake'
                  }`}
                >
                  {runResult.allPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'} ({runResult.totalTimeMs}ms)
                </span>
              )}
            </div>

            {/* TAB 1: Predefined Problem Test Cases */}
            {activeConsoleTab === 'cases' && (
              <div className="space-y-3">
                <div className="flex gap-2 overflow-x-auto">
                  {selectedProblem.testCases.map((tc, idx) => {
                    const tcResult = runResult?.results.find(r => r.testId === tc.id);
                    return (
                      <button
                        key={tc.id}
                        onClick={() => setActiveTestIndex(idx)}
                        className={`px-3 py-1 text-xs rounded-lg font-mono flex items-center gap-1.5 transition cursor-pointer ${
                          activeTestIndex === idx
                            ? 'bg-[#1c253e] text-white font-bold border border-[#38BDF8]/60'
                            : 'bg-[#0f1424] text-slate-400 hover:text-white border border-[#1c243a]'
                        }`}
                      >
                        <span>Case {idx + 1}</span>
                        {tcResult && (
                          tcResult.passed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399]" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-[#F43F5E]" />
                          )
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedProblem.testCases[activeTestIndex] && (
                  <div className="p-3 bg-[#080d19] rounded-xl border border-[#1b233a] font-mono text-xs space-y-1.5">
                    <div>
                      <span className="text-slate-400">Input:</span>{' '}
                      <span className="text-slate-200">
                        {selectedProblem.testCases[activeTestIndex].input}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Expected Output:</span>{' '}
                      <span className="text-[#34D399]">
                        {selectedProblem.testCases[activeTestIndex].expectedOutput}
                      </span>
                    </div>

                    {runResult?.results[activeTestIndex] && (
                      <div>
                        <span className="text-slate-400">Actual Output:</span>{' '}
                        <span
                          className={
                            runResult.results[activeTestIndex].passed
                              ? 'text-[#34D399] font-bold'
                              : 'text-[#F43F5E] font-bold'
                          }
                        >
                          {runResult.results[activeTestIndex].actualOutput}
                        </span>
                        {runResult.results[activeTestIndex].error && (
                          <div className="text-red-400 text-[11px] mt-1 font-mono">
                            {runResult.results[activeTestIndex].error}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Custom Interactive Input REPL */}
            {activeConsoleTab === 'custom' && (
              <div className="space-y-3 font-mono text-xs">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customInputText}
                    onChange={e => setCustomInputText(e.target.value)}
                    placeholder="Enter custom input arguments (e.g. [2,7,11,15], 9)..."
                    className="flex-1 bg-[#080d19] border border-[#232c45] rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#06B6D4]"
                  />
                  <button
                    onClick={handleRunCustomInput}
                    disabled={isCustomRunning || !customInputText.trim()}
                    className="px-4 py-2 rounded-xl bg-[#06B6D4] hover:bg-[#22d3ee] text-black font-bangers text-xs border border-black shadow-comic-sm transition disabled:opacity-50 cursor-pointer flex items-center gap-1"
                  >
                    <Play className={`w-3.5 h-3.5 ${isCustomRunning ? 'animate-spin' : ''}`} />
                    {isCustomRunning ? 'Evaluating...' : 'Run Custom'}
                  </button>
                </div>

                {customRunOutput && (
                  <div className="p-3 bg-[#080d19] rounded-xl border border-[#1b233a] space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-[#1b233a]">
                      <span>Execution Time: {customRunOutput.timeMs}ms</span>
                      <span className="text-emerald-400 font-bold">Custom Run Evaluated</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Return Value:</span>{' '}
                      <span className="text-[#34D399] font-bold">{customRunOutput.result}</span>
                    </div>
                    {customRunOutput.stdout && (
                      <div>
                        <span className="text-slate-400">Stdout:</span>{' '}
                        <pre className="text-slate-200 mt-1 p-2 bg-[#05070d] rounded text-[11px]">
                          {customRunOutput.stdout}
                        </pre>
                      </div>
                    )}
                    {customRunOutput.error && (
                      <div className="text-[#F43F5E] text-[11px]">
                        Error: {customRunOutput.error}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Terminal Output Console */}
            {activeConsoleTab === 'terminal' && (
              <div className="p-3 bg-[#080d19] rounded-xl border border-[#1b233a] font-mono text-xs space-y-1 max-h-36 overflow-y-auto">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">
                  Pyodide Wasm Python 3.12 Standard Output Stream
                </span>
                {runResult?.globalStdout ? (
                  <pre className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {runResult.globalStdout}
                  </pre>
                ) : (
                  <span className="text-slate-500 italic">
                    No print outputs captured yet. Use print(...) in your code to inspect variables here!
                  </span>
                )}
              </div>
            )}

            {runResult?.syntaxError && (
              <div className="p-2.5 rounded-lg bg-[#240b10] text-rose-300 font-mono text-xs border border-[#F43F5E]/30">
                {runResult.syntaxError}
              </div>
            )}
          </div>

          {/* VS Code Bottom Status Bar */}
          <div className="bg-[#0e1220] px-3 py-1 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-[#1c243a] select-none">
            <div className="flex items-center gap-3">
              <span className="hover:text-white cursor-pointer">
                Ln {cursorPos.line}, Col {cursorPos.col}
              </span>
              <span>Spaces: 4</span>
              <span>UTF-8</span>
              <span className="text-[#38BDF8] flex items-center gap-1">
                <Code2 className="w-3 h-3" />
                Python 3.12
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span
                onClick={handleFormatCode}
                className="hover:text-white cursor-pointer flex items-center gap-1"
                title="Click to format code"
              >
                <CheckCheck className="w-3 h-3 text-emerald-400" /> Prettier: Active
              </span>
              <span
                onClick={() => setActiveTab('snippets')}
                className="text-[#06B6D4] hover:underline cursor-pointer"
              >
                IntelliSense: 8 Snippets
              </span>
              <span className="text-slate-500">git: main</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
