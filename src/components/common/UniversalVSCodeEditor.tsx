import React, { useState, useRef, useEffect } from 'react';
import {
  SupportedLanguage,
  executeUniversalCode,
  CodeExecutionOutcome,
} from '../../utils/universalCodeRunner';
import {
  LANGUAGE_REGISTRY,
  generateStarterCode,
} from '../../utils/languageTemplates';
import { LanguageSelectorDropdown } from './LanguageSelectorDropdown';
import {
  Play,
  RotateCcw,
  Check,
  Copy,
  Terminal,
  Globe,
  Database,
  Sparkles,
  Bot,
  Flame,
  CheckCircle2,
  XCircle,
  Clock,
  Code2,
  ArrowRight,
  GitCommit as GitCommitIcon,
  Zap,
  BookOpen,
  Sliders,
  Layers,
} from 'lucide-react';
import {
  convertCppToPython,
  convertPythonToCpp,
  detectCodeLanguage,
  generateQuestionStarterCode,
} from '../../utils/codeConverter';
import { GithubIcon } from './Icons';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { useCourse } from '../../context/CourseContext';
import { queryProfessorAI } from '../../utils/aiService';
import { pushSolutionToGitHub, loadGitHubConfig } from '../../utils/githubService';

interface UniversalVSCodeEditorProps {
  language: SupportedLanguage;
  starterCode: string;
  solutionCode?: string;
  problemTitle?: string;
  problemId?: string | number;
  expectedKeywords?: string[];
  expectedOutputSubstring?: string;
  testCases?: { input: string; expectedOutput: string }[];
  fileName?: string;
  onSolve?: () => void;
  nextProblemTitle?: string;
  onGoNext?: () => void;
  onOpenTopicTheory?: () => void;
  topicSubStep?: string;
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

export const UniversalVSCodeEditor: React.FC<UniversalVSCodeEditorProps> = ({
  language,
  starterCode,
  solutionCode,
  problemTitle = 'Coding Problem',
  problemId = 'p-1',
  expectedKeywords = [],
  expectedOutputSubstring = '',
  testCases = [],
  fileName,
  onSolve,
  nextProblemTitle,
  onGoNext,
  onOpenTopicTheory,
  topicSubStep,
  onLanguageChange,
}) => {
  const { addXP, triggerBurst, stats, unlockBadge } = useCourse();

  // Helper to ensure initial code matches the target compiler language
  const getResolvedInitialCode = (targetLang: SupportedLanguage, rawCode: string) => {
    const detected = detectCodeLanguage(rawCode);
    if (targetLang === 'python' && detected === 'cpp') {
      return convertCppToPython(rawCode, problemTitle);
    }
    if (targetLang === 'cpp' && detected === 'python') {
      return convertPythonToCpp(rawCode, problemTitle);
    }
    return rawCode;
  };

  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(language);
  const [code, setCode] = useState<string>(() => getResolvedInitialCode(language, starterCode));
  const [codeByLang, setCodeByLang] = useState<Record<string, string>>(() => ({
    [language]: getResolvedInitialCode(language, starterCode),
  }));
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<CodeExecutionOutcome | null>(null);
  const [activeOutputTab, setActiveOutputTab] = useState<
    'console' | 'preview' | 'ai' | 'git' | 'complexity' | 'testcases'
  >('console');
  const [copied, setCopied] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [gitCommitMsg, setGitCommitMsg] = useState<string>('');
  const [gitStatus, setGitStatus] = useState<string>('');
  const [customInput, setCustomInput] = useState<string>('5\n1 2 3 4 5');
  const [expectedOutput, setExpectedOutput] = useState<string>('');
  const [showSnippets, setShowSnippets] = useState<boolean>(false);

  // Static Complexity & Big-O Heuristic Auditor
  const complexityAudit = React.useMemo(() => {
    let estimatedTime = 'O(1)';
    let estimatedSpace = 'O(1)';
    const findings: string[] = [];

    const hasNestedLoops =
      /for\s*\(.*?\)\s*\{[\s\S]*?for\s*\(/.test(code) ||
      /for\s+.*?:\s*[\s\S]*?for\s+.*?:/.test(code);
    const hasLogarithmic =
      /binary_search|lower_bound|upper_bound|\/=\s*2|>>=\s*1|mid\s*=|range\(.*?\/\/\s*2\)/.test(
        code
      );
    const hasSorting = /sort\(|\.sort\(|sorted\(/.test(code);
    const hasRecursion =
      /def\s+([a-zA-Z0-9_]+)[\s\S]*?\1\(/.test(code) ||
      /([a-zA-Z0-9_]+)\s*\([^)]*\)\s*\{[\s\S]*?\1\(/.test(code);

    const forMatches = code.match(/for\s*\(|for\s+[a-zA-Z0-9_]+\s+in/g) || [];
    const whileMatches = code.match(/while\s*\(|while\s+/g) || [];
    const loopCount = forMatches.length + whileMatches.length;

    if (hasNestedLoops) {
      estimatedTime = 'O(N²) Quadratic';
      findings.push(
        'Nested loops detected: Safe for N <= 10⁴ operations. May TLE if N >= 10⁵.'
      );
    } else if (hasSorting) {
      estimatedTime = 'O(N log N) Quasi-Linear';
      findings.push(
        'Comparison-based sorting (Introsort/Timsort) detected: Optimal comparison boundary.'
      );
    } else if (loopCount > 0) {
      if (hasLogarithmic) {
        estimatedTime = 'O(log N) Logarithmic';
        findings.push('Binary search / divide-and-conquer logarithmic step detected.');
      } else {
        estimatedTime = 'O(N) Linear';
        findings.push(
          'Single-pass iteration: Runs in ~10ms for N = 10⁶. Highly optimal for competitive programming.'
        );
      }
    } else if (hasRecursion) {
      estimatedTime = 'O(2ⁿ) or O(N) Memoized';
      findings.push(
        'Recursive branching calls detected. Check if overlapping subproblems are memoized to avoid exponential explosion.'
      );
    } else {
      estimatedTime = 'O(1) Constant Time';
      findings.push('No unbounded loop structures found. Direct arithmetic evaluation.');
    }

    const hasCollections =
      /vector|unordered_map|unordered_set|map|set|priority_queue|list|deque|\[\]|set\(\)|\{\}/.test(
        code
      );
    if (hasCollections) {
      estimatedSpace = 'O(N) Auxiliary Memory';
      findings.push('Dynamic memory containers allocated on heap.');
    } else if (hasRecursion) {
      estimatedSpace = 'O(H) Call Stack Frame';
      findings.push('Recursion stack memory scales with recursion depth H.');
    } else {
      estimatedSpace = 'O(1) In-Place';
      findings.push('Zero extra allocations. In-place memory efficiency.');
    }

    return { estimatedTime, estimatedSpace, findings };
  }, [code]);

  // Curated Code Snippets
  const CODE_SNIPPETS = [
    {
      label: '⚡ Fast I/O',
      desc: 'Unsync C++ streams / bulk read in Python',
      cpp: 'ios_base::sync_with_stdio(false);\ncin.tie(NULL);',
      python: 'import sys\ninput = sys.stdin.read',
    },
    {
      label: '🎯 Binary Search Template',
      desc: 'Inclusive [low, high] search',
      cpp: 'int low = 0, high = n - 1;\nwhile (low <= high) {\n    int mid = low + (high - low) / 2;\n    if (arr[mid] == target) return mid;\n    else if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n}',
      python: 'low, high = 0, len(arr) - 1\nwhile low <= high:\n    mid = (low + high) // 2\n    if arr[mid] == target:\n        return mid\n    elif arr[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1',
    },
    {
      label: '🌐 Disjoint Set Union (DSU)',
      desc: 'Union by size with path compression',
      cpp: 'class DSU {\n    vector<int> parent, size;\npublic:\n    DSU(int n) {\n        parent.resize(n + 1);\n        iota(parent.begin(), parent.end(), 0);\n        size.assign(n + 1, 1);\n    }\n    int find(int u) { return parent[u] == u ? u : parent[u] = find(parent[u]); }\n    bool unionBySize(int u, int v) {\n        int rootU = find(u), rootV = find(v);\n        if (rootU == rootV) return false;\n        if (size[rootU] < size[rootV]) swap(rootU, rootV);\n        parent[rootV] = rootU; size[rootU] += size[rootV];\n        return true;\n    }\n};',
      python: 'class DSU:\n    def __init__(self, n):\n        self.parent = list(range(n + 1))\n        self.size = [1] * (n + 1)\n    def find(self, u):\n        if self.parent[u] != u:\n            self.parent[u] = self.find(self.parent[u])\n        return self.parent[u]\n    def union(self, u, v):\n        ru, rv = self.find(u), self.find(v)\n        if ru == rv: return False\n        if self.size[ru] < self.size[rv]: ru, rv = rv, ru\n        self.parent[rv] = ru\n        self.size[ru] += self.size[rv]\n        return True',
    },
  ];

  const handleInsertSnippet = (snipText: string) => {
    sound.playPop();
    setCode((prev) => prev + '\n\n' + snipText + '\n');
    setShowSnippets(false);
    triggerBurst('✨ Snippet Inserted!', 'Code boilerplate added to editor.', 'zap');
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const currentProblemIdRef = useRef<string | number>(problemId);

  // Sync when problemId changes (user navigated to a different problem)
  useEffect(() => {
    if (currentProblemIdRef.current !== problemId) {
      currentProblemIdRef.current = problemId;
      setSelectedLang(language);
      const resolved = getResolvedInitialCode(language, starterCode);
      setCode(resolved);
      setCodeByLang({ [language]: resolved });
    }
  }, [problemId, language, starterCode, problemTitle]);

  // Sync when parent externally changes the language prop
  useEffect(() => {
    if (language !== selectedLang) {
      handleLanguageChange(language);
    }
  }, [language]);

  // Active self-healing guard: ensure code syntax and compiler language are 100% synchronized
  useEffect(() => {
    if (!code || !code.trim()) return;
    const detected = detectCodeLanguage(code);
    if (selectedLang === 'python' && detected === 'cpp') {
      const converted = convertCppToPython(code, problemTitle);
      if (converted && converted.trim()) {
        setCode(converted);
        setCodeByLang((prev) => ({ ...prev, python: converted }));
      }
    } else if (selectedLang === 'cpp' && detected === 'python') {
      const converted = convertPythonToCpp(code, problemTitle);
      if (converted && converted.trim()) {
        setCode(converted);
        setCodeByLang((prev) => ({ ...prev, cpp: converted }));
      }
    }
  }, [selectedLang, code, problemTitle]);

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setCodeByLang((prev) => ({ ...prev, [selectedLang]: code }));

    const currentDetected = detectCodeLanguage(code);
    const currentIsCpp = currentDetected === 'cpp' || selectedLang === 'cpp';
    const currentIsPython = currentDetected === 'python' || selectedLang === 'python';

    setSelectedLang(newLang);
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }

    const cached = codeByLang[newLang];
    const cachedDetected = cached ? detectCodeLanguage(cached) : null;
    const cachedIsInvalid =
      (newLang === 'python' && cachedDetected === 'cpp') ||
      (newLang === 'cpp' && cachedDetected === 'python');

    if (cached && !cachedIsInvalid) {
      setCode(cached);
    } else {
      let converted = '';
      if (newLang === 'python' && currentIsCpp) {
        converted = convertCppToPython(code, problemTitle);
      } else if (newLang === 'cpp' && currentIsPython) {
        converted = convertPythonToCpp(code, problemTitle);
      } else {
        converted = generateQuestionStarterCode(newLang, { title: problemTitle });
      }
      setCode(converted);
      setCodeByLang((prev) => ({ ...prev, [newLang]: converted }));
    }
  };

  // Dedicated 1-Click C++ <-> Python Syntax Translator
  const handleConvertCppPython = () => {
    sound.playPop();
    const currentDetected = detectCodeLanguage(code);
    const shouldConvertToPython = selectedLang === 'cpp' || currentDetected === 'cpp';

    if (shouldConvertToPython) {
      const converted = convertCppToPython(code, problemTitle);
      setSelectedLang('python');
      if (onLanguageChange) onLanguageChange('python');
      setCode(converted);
      setCodeByLang((prev) => ({ ...prev, cpp: code, python: converted }));
      triggerBurst('⚡ Syntax Converted!', 'Translated C++ ➔ Python 3.12 syntax!', 'star');
    } else {
      const converted = convertPythonToCpp(code, problemTitle);
      setSelectedLang('cpp');
      if (onLanguageChange) onLanguageChange('cpp');
      setCode(converted);
      setCodeByLang((prev) => ({ ...prev, python: code, cpp: converted }));
      triggerBurst('⚡ Syntax Converted!', 'Translated Python ➔ C++20 syntax!', 'star');
    }
  };

  // Dynamic file name based on current selected compiler
  const activeLangConfig = LANGUAGE_REGISTRY[selectedLang] || LANGUAGE_REGISTRY.python;
  const defaultFileName = fileName || activeLangConfig.defaultFile;

  // Handle Tab key and Auto-Indentation after colon or curly braces
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    } else if (e.key === 'Enter') {
      const target = e.currentTarget;
      const cursor = target.selectionStart;
      const textBefore = code.substring(0, cursor);
      const lines = textBefore.split('\n');
      const currentLine = lines[lines.length - 1];

      // Detect current indentation
      const match = currentLine.match(/^(\s*)/);
      const currentIndent = match ? match[1] : '';

      // Check if line ends with a colon or open brace
      const trimmedLine = currentLine.trim();
      let extraIndent = '';
      if (
        (language === 'python' && trimmedLine.endsWith(':')) ||
        trimmedLine.endsWith('{') ||
        trimmedLine.endsWith('(')
      ) {
        extraIndent = '    ';
      }

      e.preventDefault();
      const insert = '\n' + currentIndent + extraIndent;
      const newCode = code.substring(0, cursor) + insert + code.substring(cursor);
      setCode(newCode);

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = cursor + insert.length;
      }, 0);
    }
  };

  // Run Code
  const handleRun = async () => {
    setIsRunning(true);
    sound.playPop();

    try {
      const outcome = await executeUniversalCode(selectedLang, code, {
        expectedKeywords,
        expectedOutputSubstring,
        testCases,
      });

      setExecutionResult(outcome);
      if (outcome.domPreview) {
        setActiveOutputTab('preview');
      } else {
        setActiveOutputTab('console');
      }

      // Check if code executed successfully and unlock First Code Run achievement
      unlockBadge('badge-code-run');

      if (outcome.success && !outcome.error) {
        sound.playSuccess();
      } else {
        sound.playError();
      }
    } catch (err: any) {
      setExecutionResult({
        success: false,
        output: '',
        error: err.message || String(err),
        executionTimeMs: 0,
      });
      sound.playError();
    } finally {
      setIsRunning(false);
    }
  };

  // Verify Solution and Unlock Next Topic/Problem
  const handleVerifyAndUnlock = async () => {
    setIsRunning(true);
    sound.playPop();

    const outcome = await executeUniversalCode(language, code, {
      expectedKeywords,
      expectedOutputSubstring,
      testCases,
    });

    setExecutionResult(outcome);
    setIsRunning(false);

    const isPassed = outcome.testPassed || (outcome.success && !outcome.error);

    if (isPassed) {
      sound.playFanfare();
      confetti({ particleCount: 45, spread: 65, origin: { y: 0.7 } });
      addXP(50);
      triggerBurst('CHALLENGE SOLVED!', '+50 XP • Next Topic Unlocked 🔓', 'star');

      // Trigger achievement check
      unlockBadge('badge-git');
      unlockBadge('badge-potd');

      if (onSolve) {
        onSolve();
      }
    } else {
      sound.playError();
      triggerBurst('TESTS FAILED', 'Check error console or ask Professor AI', 'boom');
    }
  };

  // Query Professor AI (Gemini API)
  const handleAskAI = async () => {
    setAiLoading(true);
    setActiveOutputTab('ai');
    sound.playPop();

    try {
      const mockProblem = {
        id: String(problemId),
        title: problemTitle,
        slug: problemTitle.toLowerCase().replace(/\s+/g, '-'),
        chapterId: 1,
        category: language.toUpperCase(),
        difficulty: 'Medium' as any,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        description: `Solve the problem: ${problemTitle}`,
        examples: [],
        constraints: [],
        starterCode,
        solutionCode: solutionCode || '',
        testCases: [],
        hints: { byteHint: '', professorInsight: '', bugsyTrap: '' },
        tags: [language],
      };

      const response = await queryProfessorAI(
        `Please analyze my code for "${problemTitle}". If there is a bug or mistake, explain why and guide me towards the correct solution without just spoiling the entire code immediately!`,
        {
          problem: mockProblem,
          userCode: code,
          errorContext: executionResult?.error || executionResult?.output,
        }
      );

      setAiResponse(response);
    } catch (err: any) {
      setAiResponse(`Professor: "I ran into a connection glitch: ${err.message}. Check your internet connection or Gemini API key!"`);
    } finally {
      setAiLoading(false);
    }
  };

  // Direct GitHub Push
  const handleGitCommit = async () => {
    const gitConfig = loadGitHubConfig();
    if (!gitConfig.token) {
      setGitStatus('⚠️ No GitHub Personal Access Token configured! Configure in navbar.');
      setActiveOutputTab('git');
      return;
    }

    setGitStatus('⏳ Pushing commit to GitHub remote repository...');
    setActiveOutputTab('git');
    sound.playPop();

    try {
      const targetPath = fileName
        ? (fileName.startsWith('solutions/') ? fileName : `solutions/${fileName}`)
        : `solutions/${language}/${problemId}.${
            language === 'python'
              ? 'py'
              : language === 'typescript'
              ? 'ts'
              : language === 'javascript'
              ? 'js'
              : language === 'html'
              ? 'html'
              : language === 'css'
              ? 'css'
              : 'tsx'
          }`;

      const msg = gitCommitMsg || `feat: solve ${problemTitle} in ${language}`;
      const commitResult = await pushSolutionToGitHub(targetPath, code, msg);

      if (commitResult.success) {
        setGitStatus(`✅ Committed and pushed to GitHub!`);
        sound.playSuccess();
        unlockBadge('badge-git');
        triggerBurst('GIT COMMITTED!', 'Live on personal GitHub repo', 'star');
      } else {
        setGitStatus(`❌ Git push note: ${commitResult.error}`);
        sound.playError();
      }
    } catch (err: any) {
      setGitStatus(`❌ Git error: ${err.message}`);
      sound.playError();
    }
  };

  const handleCopy = () => {
    sound.playPop();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border-2 border-black bg-[#0d1117] shadow-comic overflow-hidden font-sans">
      {/* VS Code Top Window Header */}
      <div className="bg-[#161b22] px-4 py-2.5 border-b border-[#30363d] flex flex-wrap items-center justify-between gap-3">
        {/* Window Controls & File Tab */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block border border-[#e0443e]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block border border-[#dea123]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block border border-[#1aab29]" />
          </div>

          <LanguageSelectorDropdown
            currentLanguage={selectedLang}
            onSelectLanguage={handleLanguageChange}
            size="sm"
          />

          <div className="hidden sm:flex items-center gap-2 bg-[#0d1117] px-3 py-1 rounded-md border border-[#30363d] text-xs font-mono text-slate-200">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{defaultFileName}</span>
          </div>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-slate-300 hover:text-white bg-[#21262d] rounded border border-[#30363d] transition cursor-pointer"
            title="Copy code to clipboard"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setCode(solutionCode || starterCode);
            }}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-amber-300 hover:text-amber-200 bg-[#21262d] rounded border border-[#30363d] transition cursor-pointer"
            title="Reset code or fill solution"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{solutionCode ? 'Solution' : 'Reset'}</span>
          </button>

          {/* Snippets Palette Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSnippets((prev) => !prev)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] rounded border border-white/10 transition cursor-pointer"
              title="Insert competitive programming code snippet"
            >
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Snippets</span>
            </button>

            {showSnippets && (
              <div className="absolute right-0 mt-1 w-64 rounded-xl bg-[#0c1020]/95 backdrop-blur-2xl border border-slate-700 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
                <div className="text-[10px] uppercase font-mono font-bold text-slate-400 px-2 py-1 border-b border-slate-800">
                  Insert Algorithm Snippet
                </div>
                {CODE_SNIPPETS.map((snip, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const snipText = selectedLang === 'cpp' ? snip.cpp : snip.python;
                      handleInsertSnippet(snipText);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-white/[0.08] transition text-xs font-mono text-slate-200 group cursor-pointer"
                  >
                    <div className="font-bold text-amber-300 group-hover:text-amber-200">
                      {snip.label}
                    </div>
                    <div className="text-[10px] text-slate-400">{snip.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 1-Click C++ <-> Python Converter */}
          <button
            onClick={handleConvertCppPython}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold text-amber-300 hover:text-white bg-gradient-to-r from-purple-950 to-indigo-950 hover:from-purple-900 hover:to-indigo-900 rounded-lg border border-purple-500/50 transition cursor-pointer shadow-sm"
            title={
              selectedLang === 'python'
                ? 'Convert current Python code to C++20 syntax'
                : 'Convert current C++ code to Python 3.12 syntax'
            }
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{selectedLang === 'python' ? '⚡ Py ➔ C++' : '⚡ C++ ➔ Py'}</span>
          </button>

          {/* Optional Topic Theory Button */}
          {onOpenTopicTheory && (
            <button
              onClick={() => {
                sound.playPop();
                onOpenTopicTheory();
              }}
              className="hidden md:flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-semibold text-cyan-300 hover:text-white bg-cyan-950/70 hover:bg-cyan-900/90 rounded border border-cyan-500/40 transition cursor-pointer shadow-sm"
              title="Open full topic theory masterclass"
            >
              <BookOpen className="w-3 h-3 text-cyan-400" />
              <span>Theory</span>
            </button>
          )}

          <button
            onClick={handleAskAI}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-bangers text-black bg-[#FBBF24] hover:bg-amber-300 rounded border border-black shadow-comic-sm transition cursor-pointer"
            title="Get hint and diagnosis from Professor Algorismus"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI</span>
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-bangers text-white bg-[#238636] hover:bg-[#2ea043] rounded border border-black shadow-comic-sm transition cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>

          <button
            onClick={handleVerifyAndUnlock}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-bangers text-black bg-[#38BDF8] hover:bg-sky-300 rounded border border-black shadow-comic-sm transition cursor-pointer disabled:opacity-50"
            title="Run tests and unlock next topic"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Submit &amp; Unlock</span>
          </button>
        </div>
      </div>

      {/* Editor & Line Numbers Area */}
      <div className="relative flex bg-[#0d1117] min-h-[220px] max-h-[460px] overflow-auto">
        {/* Line Numbers Gutter */}
        <div className="w-10 py-3 select-none text-right pr-2 text-slate-600 font-mono text-xs border-r border-[#30363d] bg-[#090d16]">
          {code.split('\n').map((_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea Editor */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={e => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="flex-1 p-3 bg-transparent font-mono text-xs text-slate-100 leading-6 resize-none focus:outline-none selection:bg-[#388bfd]/30"
          rows={Math.max(8, code.split('\n').length)}
          placeholder={`Write your ${language.toUpperCase()} code here... (press Tab to indent, colons auto-indent)`}
        />
      </div>

      {/* Output Console / Tabs Drawer */}
      <div className="border-t border-[#30363d] bg-[#161b22]">
        {/* Sub-tabs for output */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#30363d] text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveOutputTab('console')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold transition cursor-pointer ${
                activeOutputTab === 'console'
                  ? 'bg-[#21262d] text-white border border-[#30363d]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Output Console</span>
              {executionResult && (
                <span
                  className={`w-2 h-2 rounded-full ${
                    executionResult.success && !executionResult.error ? 'bg-emerald-400' : 'bg-rose-400'
                  }`}
                />
              )}
            </button>

            {(language === 'html' || language === 'css' || language === 'react') && (
              <button
                onClick={() => setActiveOutputTab('preview')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold transition cursor-pointer ${
                  activeOutputTab === 'preview'
                    ? 'bg-[#21262d] text-white border border-[#30363d]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Live Browser Preview</span>
              </button>
            )}

            <button
              onClick={() => setActiveOutputTab('ai')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold transition cursor-pointer ${
                activeOutputTab === 'ai'
                  ? 'bg-[#21262d] text-amber-300 border border-[#30363d]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-amber-400" />
              <span>Professor AI Advice</span>
            </button>

            <button
              onClick={() => setActiveOutputTab('git')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold transition cursor-pointer ${
                activeOutputTab === 'git'
                  ? 'bg-[#21262d] text-purple-300 border border-[#30363d]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GithubIcon className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span>Git Direct Commit</span>
            </button>

            {/* Complexity Auditor Tab */}
            <button
              onClick={() => setActiveOutputTab('complexity')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold transition cursor-pointer ${
                activeOutputTab === 'complexity'
                  ? 'bg-[#21262d] text-yellow-300 border border-[#30363d]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>Complexity Auditor</span>
            </button>

            {/* Custom Testcase Runner Tab */}
            <button
              onClick={() => setActiveOutputTab('testcases')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold transition cursor-pointer ${
                activeOutputTab === 'testcases'
                  ? 'bg-[#21262d] text-emerald-300 border border-[#30363d]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span>Testcase Runner</span>
            </button>
          </div>

          {executionResult && (
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {executionResult.executionTimeMs}ms
            </span>
          )}
        </div>

        {/* Console Content */}
        {activeOutputTab === 'console' && (
          <div className="p-3 max-h-48 overflow-y-auto font-mono text-xs">
            {executionResult ? (
              <div className="space-y-1.5">
                {executionResult.error && (
                  <div className="p-2 bg-rose-950/60 rounded border border-rose-500/40 text-rose-300">
                    <span className="font-bold block">❌ Runtime / Syntax Error:</span>
                    <pre className="whitespace-pre-wrap">{executionResult.error}</pre>
                  </div>
                )}

                {executionResult.output && (
                  <div className="text-slate-200 whitespace-pre-wrap leading-relaxed">
                    {executionResult.output}
                  </div>
                )}

                {executionResult.sqlResult && executionResult.sqlResult.columns.length > 0 && (
                  <div className="overflow-x-auto rounded border border-[#30363d] mt-2">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-[#21262d] text-slate-300 font-bold">
                        <tr>
                          {executionResult.sqlResult.columns.map((col, i) => (
                            <th key={i} className="px-3 py-1.5 border-b border-[#30363d]">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#30363d]">
                        {executionResult.sqlResult.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[#21262d]/50">
                            {executionResult.sqlResult!.columns.map((col, cIdx) => (
                              <td key={cIdx} className="px-3 py-1 text-slate-200">
                                {String(row[col] ?? 'NULL')}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-slate-500 italic">
                Terminal ready. Click &quot;Run&quot; or press Submit to test your code.
              </div>
            )}
          </div>
        )}

        {/* Live Browser Preview (for HTML/CSS/Tailwind/React) */}
        {activeOutputTab === 'preview' && (
          <div className="p-3 bg-[#090d16]">
            {executionResult?.domPreview ? (
              <iframe
                title="live-preview"
                srcDoc={executionResult.domPreview}
                className="w-full h-44 rounded-xl border border-[#30363d] bg-slate-900"
                sandbox="allow-scripts"
              />
            ) : (
              <div className="text-xs text-slate-400 p-4 text-center">
                Click &quot;Run&quot; to build and render the HTML/CSS/Tailwind preview!
              </div>
            )}
          </div>
        )}

        {/* AI Professor Advice Tab */}
        {activeOutputTab === 'ai' && (
          <div className="p-4 space-y-3 font-sans text-xs bg-[#090d16] max-h-48 overflow-y-auto">
            {aiLoading ? (
              <div className="flex items-center gap-2 text-amber-300 font-mono animate-pulse">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Professor Algorismus is analyzing your code syntax and logic...</span>
              </div>
            ) : aiResponse ? (
              <div className="bg-[#121626] p-3 rounded-xl border border-amber-500/30 text-slate-200 leading-relaxed whitespace-pre-wrap">
                {aiResponse}
              </div>
            ) : (
              <div className="text-slate-400 flex items-center justify-between">
                <span>Need a hint or debugging assistance? Click &quot;Ask AI&quot; above!</span>
                <button
                  onClick={handleAskAI}
                  className="px-3 py-1 bg-amber-400 text-black font-bangers text-xs rounded-lg border border-black shadow-comic-sm"
                >
                  Ask Professor AI
                </button>
              </div>
            )}
          </div>
        )}

        {/* Git Direct Commit Tab */}
        {activeOutputTab === 'git' && (
          <div className="p-4 space-y-3 font-sans text-xs bg-[#090d16]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <input
                type="text"
                value={gitCommitMsg}
                onChange={e => setGitCommitMsg(e.target.value)}
                placeholder={`feat: solve ${problemTitle} in ${language}`}
                className="flex-1 w-full bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={handleGitCommit}
                className="px-4 py-1.5 bg-[#8957e5] hover:bg-[#7a48d4] text-white font-bangers text-xs rounded-lg border border-black shadow-comic-sm transition cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <GitCommitIcon className="w-3.5 h-3.5" />
                <span>Push Real Commit</span>
              </button>
            </div>
            {gitStatus && (
              <div className="p-2.5 bg-[#121626] rounded-lg border border-purple-500/30 text-purple-200 font-mono text-[11px]">
                {gitStatus}
              </div>
            )}
          </div>
        )}

        {/* Complexity & Heuristics Auditor Tab */}
        {activeOutputTab === 'complexity' && (
          <div className="p-4 space-y-3 font-mono text-xs bg-[#090d16] max-h-52 overflow-y-auto custom-scrollbar">
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-yellow-500/15 border border-yellow-500/30 text-yellow-300">
                <span className="text-[10px] text-slate-400 block font-sans">Estimated Time:</span>
                <strong className="text-sm font-mono">{complexityAudit.estimatedTime}</strong>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                <span className="text-[10px] text-slate-400 block font-sans">Estimated Space:</span>
                <strong className="text-sm font-mono">{complexityAudit.estimatedSpace}</strong>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-slate-400 text-[11px] font-sans font-bold uppercase tracking-wider">
                Static Heuristic Findings:
              </span>
              {complexityAudit.findings.map((f, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-300 text-xs">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Testcase Runner Tab */}
        {activeOutputTab === 'testcases' && (
          <div className="p-4 space-y-3 font-mono text-xs bg-[#090d16] max-h-56 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 font-sans block mb-1">
                  Custom Input (stdin):
                </label>
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="w-full h-20 p-2 rounded-lg bg-[#161b22] border border-[#30363d] text-slate-200 font-mono text-xs focus:outline-none resize-none"
                  placeholder="Enter custom input arguments..."
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 font-sans block mb-1">
                  Expected Output (optional diff check):
                </label>
                <textarea
                  value={expectedOutput}
                  onChange={(e) => setExpectedOutput(e.target.value)}
                  className="w-full h-20 p-2 rounded-lg bg-[#161b22] border border-[#30363d] text-slate-200 font-mono text-xs focus:outline-none resize-none"
                  placeholder="Expected output substring to verify against..."
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bangers text-xs rounded-lg border border-black shadow-comic-sm transition cursor-pointer flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? 'Executing...' : 'Run with Custom Input'}</span>
              </button>

              {expectedOutput && executionResult?.output && (
                <div className="text-xs font-mono">
                  {executionResult.output.includes(expectedOutput.trim()) ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Output Matches Expected!
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Output Mismatch
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Success Banner & Unlock Next Action */}
      {executionResult?.testPassed && (
        <div className="bg-emerald-950/90 border-t-2 border-emerald-500 p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-200 text-xs">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Passed! Next challenge in sequence is now unlocked!</span>
          </div>
          {onGoNext && nextProblemTitle && (
            <button
              onClick={() => {
                sound.playPop();
                onGoNext();
              }}
              className="flex items-center gap-1 px-3 py-1 bg-emerald-400 hover:bg-emerald-300 text-black font-bangers text-xs rounded-lg border border-black shadow-comic-sm transition cursor-pointer shrink-0"
            >
              <span>Next: {nextProblemTitle}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
