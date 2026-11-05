import React, { useState, useRef, useEffect } from 'react';
import {
  SupportedLanguage,
  executeUniversalCode,
  CodeExecutionOutcome,
} from '../../utils/universalCodeRunner';
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
} from 'lucide-react';
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
}) => {
  const { addXP, triggerBurst, stats, unlockBadge } = useCourse();
  const [code, setCode] = useState<string>(starterCode);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<CodeExecutionOutcome | null>(null);
  const [activeOutputTab, setActiveOutputTab] = useState<'console' | 'preview' | 'ai' | 'git'>('console');
  const [copied, setCopied] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [gitCommitMsg, setGitCommitMsg] = useState<string>('');
  const [gitStatus, setGitStatus] = useState<string>('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Default file names based on language
  const defaultFileName =
    fileName ||
    (language === 'python'
      ? 'solution.py'
      : language === 'sql'
      ? 'query.sql'
      : language === 'html'
      ? 'index.html'
      : language === 'css'
      ? 'styles.css'
      : language === 'react'
      ? 'App.tsx'
      : 'solution.ts');

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
      const outcome = await executeUniversalCode(language, code, {
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

          <div className="flex items-center gap-2 bg-[#0d1117] px-3 py-1 rounded-md border border-[#30363d] text-xs font-mono text-slate-200">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{defaultFileName}</span>
            <span className="px-1.5 py-0.2 bg-cyan-950 text-cyan-300 font-extrabold text-[9px] rounded uppercase">
              {language}
            </span>
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
