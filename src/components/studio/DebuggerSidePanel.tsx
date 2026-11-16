import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  RotateCcw,
  Terminal,
  Bug,
  Code2,
  FileText,
  Copy,
  Check,
  ChevronRight,
  StepForward,
  CornerDownRight,
  Sparkles,
  Send,
  Trash2,
  Clock,
  Layers,
  Activity,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { SupportedLanguage } from '../../utils/languageTemplates';
import { LanguageSelectorDropdown } from '../common/LanguageSelectorDropdown';
import { executeUniversalCode, CodeExecutionOutcome } from '../../utils/universalCodeRunner';
import { DebugStep } from '../../data/coderArmyData';
import { sound } from '../../utils/soundEffects';

interface DebuggerSidePanelProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  code: string;
  onCodeChange: (code: string) => void;
  debugSteps?: DebugStep[];
  lectureTitle: string;
  lectureNotes: string;
}

export const DebuggerSidePanel: React.FC<DebuggerSidePanelProps> = ({
  currentLanguage,
  onLanguageChange,
  code,
  onCodeChange,
  debugSteps = [],
  lectureTitle,
  lectureNotes,
}) => {
  // Mode Tab: 'code' | 'debug' | 'terminal' | 'notes'
  const [activeTab, setActiveTab] = useState<'code' | 'debug' | 'terminal' | 'notes'>('code');

  // Execution & Interpreter States
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<CodeExecutionOutcome | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Terminal & REPL States
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Coder Army High-Performance Multi-Compiler Terminal Ready.',
    'Type code in Interpreter and click "Run Code" or step with Debugger.',
  ]);
  const [stdinInput, setStdinInput] = useState<string>('');

  // Debugger States
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isDebugging, setIsDebugging] = useState<boolean>(false);
  const [breakpoints, setBreakpoints] = useState<Set<number>>(new Set());

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (activeTab === 'terminal') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs, activeTab]);

  // Run Code Interpreter
  const handleRunCode = async () => {
    setIsRunning(true);
    sound.playPop();

    const timestamp = new Date().toLocaleTimeString();
    setTerminalLogs((prev) => [
      ...prev,
      `[${timestamp}] 🚀 Compiling & Executing with ${currentLanguage.toUpperCase()}...`,
    ]);

    try {
      const outcome = await executeUniversalCode(currentLanguage, code, {
        testCases: stdinInput ? [{ input: stdinInput, expectedOutput: '' }] : undefined,
      });

      setExecutionResult(outcome);
      setIsRunning(false);

      if (outcome.success) {
        sound.playSuccess();
        setTerminalLogs((prev) => [
          ...prev,
          outcome.output || '(Program completed with return code 0 - No stdout)',
          `✨ Finished in ${outcome.executionTimeMs}ms`,
        ]);
      } else {
        sound.playError();
        setTerminalLogs((prev) => [
          ...prev,
          `❌ Error: ${outcome.error || outcome.output}`,
          `Exit code 1 (${outcome.executionTimeMs}ms)`,
        ]);
      }

      // Automatically switch to terminal if on code view
      if (activeTab === 'code') {
        setActiveTab('terminal');
      }
    } catch (err: any) {
      setIsRunning(false);
      sound.playError();
      setTerminalLogs((prev) => [...prev, `❌ Fatal: ${err.message}`]);
    }
  };

  // Start Debugger Session
  const handleStartDebugger = () => {
    sound.playPop();
    setIsDebugging(true);
    setCurrentStepIndex(0);
    setActiveTab('debug');
  };

  // Step Over (Next Instruction)
  const handleStepOver = () => {
    if (debugSteps.length === 0) return;
    sound.playPop();
    if (currentStepIndex < debugSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      sound.playSuccess();
      setIsDebugging(false);
      setTerminalLogs((prev) => [...prev, '🏁 Debugging Session Completed: Reached end of program.']);
    }
  };

  // Continue to Next Breakpoint or End
  const handleContinueDebug = () => {
    if (debugSteps.length === 0) return;
    sound.playPop();
    for (let i = currentStepIndex + 1; i < debugSteps.length; i++) {
      if (breakpoints.has(debugSteps[i].line)) {
        setCurrentStepIndex(i);
        return;
      }
    }
    // No breakpoint found ahead -> run to end
    setCurrentStepIndex(debugSteps.length - 1);
    sound.playSuccess();
  };

  // Reset Debugger
  const handleResetDebugger = () => {
    sound.playPop();
    setCurrentStepIndex(0);
    setIsDebugging(false);
  };

  // Toggle Breakpoint on Line
  const toggleBreakpoint = (line: number) => {
    sound.playPop();
    setBreakpoints((prev) => {
      const next = new Set(prev);
      if (next.has(line)) next.delete(line);
      else next.add(line);
      return next;
    });
  };

  // Send Stdin into Program
  const handleSendStdin = () => {
    if (!stdinInput.trim()) return;
    sound.playPop();
    setTerminalLogs((prev) => [...prev, `> ${stdinInput.trim()}`]);
    handleRunCode();
    setStdinInput('');
  };

  const handleCopyCode = () => {
    sound.playPop();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeDebugStep = debugSteps[currentStepIndex];
  const codeLines = code.split('\n');

  return (
    <div className="h-full flex flex-col bg-[#0b0f1d] border-l border-white/10 overflow-hidden font-sans select-none">
      {/* Top Controls Toolbar */}
      <div className="px-4 py-2.5 bg-[#0e1326] border-b border-white/10 flex flex-wrap items-center justify-between gap-2.5">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('code');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'code'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Interpreter</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('debug');
              if (!isDebugging) setIsDebugging(true);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'debug'
                ? 'bg-purple-500 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bug className="w-3.5 h-3.5 text-purple-300" />
            <span>Debugger</span>
            {isDebugging && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('terminal');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'terminal'
                ? 'bg-sky-500 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('notes');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Notes</span>
          </button>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2">
          {/* Multi-Language Dropdown */}
          <LanguageSelectorDropdown
            currentLanguage={currentLanguage}
            onSelectLanguage={onLanguageChange}
            size="sm"
          />

          {/* Run Code Button */}
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-md shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
            title="Execute Code in Live Sandbox"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-hidden relative flex flex-col">
        {/* 1. INTERPRETER / CODE EDITOR TAB */}
        {activeTab === 'code' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-4 py-2 bg-[#090d18] border-b border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Lecture Code Sandbox</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="p-1 hover:text-white transition cursor-pointer"
                  title="Copy code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={handleStartDebugger}
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] transition cursor-pointer"
                >
                  <Bug className="w-3 h-3" />
                  <span>Debug</span>
                </button>
              </div>
            </div>

            <div className="flex-1 relative flex overflow-hidden">
              {/* Line Numbers */}
              <div className="w-10 bg-[#070a12] border-r border-white/5 py-4 select-none font-mono text-[11px] text-slate-600 text-right pr-2 leading-relaxed">
                {codeLines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Textarea Code Input */}
              <textarea
                value={code}
                onChange={(e) => onCodeChange(e.target.value)}
                spellCheck={false}
                className="flex-1 p-4 bg-[#080c18] font-mono text-xs text-slate-100 focus:outline-none resize-none leading-relaxed selection:bg-amber-400/30 selection:text-white"
                style={{ tabSize: 4 }}
              />
            </div>
          </div>
        )}

        {/* 2. STEP-BY-STEP DEBUGGER TAB */}
        {activeTab === 'debug' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#070a14]">
            {/* Debugger Action Controls */}
            <div className="px-4 py-2.5 bg-[#0d1224] border-b border-purple-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStepOver}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition shadow cursor-pointer text-xs"
                  title="Step Over (Execute Next Instruction)"
                >
                  <StepForward className="w-3.5 h-3.5" />
                  <span>Step Over</span>
                </button>

                <button
                  onClick={handleContinueDebug}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition cursor-pointer text-xs"
                  title="Continue to Next Breakpoint"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
                  <span>Continue</span>
                </button>

                <button
                  onClick={handleResetDebugger}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                  title="Reset Debugger to Start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-[11px] font-mono text-purple-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                <span>
                  Step {currentStepIndex + 1} of {Math.max(1, debugSteps.length)}
                </span>
              </div>
            </div>

            {/* Split Debug View: Top = Traced Code, Bottom = Variables & Stack */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
              {/* Traced Code Panel (7 cols) */}
              <div className="md:col-span-7 border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto font-mono text-xs p-3 space-y-1 custom-scrollbar">
                {codeLines.map((lineText, idx) => {
                  const lineNum = idx + 1;
                  const isCurrent = activeDebugStep?.line === lineNum;
                  const hasBreakpoint = breakpoints.has(lineNum);

                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 py-0.5 px-2 rounded transition ${
                        isCurrent
                          ? 'bg-purple-500/25 border-l-4 border-purple-400 text-white font-bold shadow'
                          : 'hover:bg-white/[0.03] text-slate-300'
                      }`}
                    >
                      {/* Breakpoint Dot */}
                      <button
                        onClick={() => toggleBreakpoint(lineNum)}
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center cursor-pointer shrink-0 ${
                          hasBreakpoint ? 'bg-rose-500 shadow-sm shadow-rose-500/50' : 'hover:bg-rose-500/30'
                        }`}
                        title="Click to toggle breakpoint"
                      >
                        {hasBreakpoint && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </button>

                      {/* Line Number */}
                      <span className="text-[10px] text-slate-500 w-6 text-right shrink-0">
                        {lineNum}
                      </span>

                      {/* Arrow Pointer */}
                      <span className="w-4 text-purple-400 shrink-0 font-bold">
                        {isCurrent ? '➜' : ''}
                      </span>

                      {/* Code Content */}
                      <span className="whitespace-pre overflow-x-auto">{lineText || ' '}</span>
                    </div>
                  );
                })}
              </div>

              {/* Variables Inspector & Call Stack (5 cols) */}
              <div className="md:col-span-5 flex flex-col overflow-hidden bg-[#0a0e1c]">
                {/* Step Explanation Card */}
                {activeDebugStep && (
                  <div className="p-3 bg-purple-950/30 border-b border-purple-500/20 text-xs text-purple-200">
                    <span className="font-bold text-amber-300 block mb-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Step Execution Insight:
                    </span>
                    <p className="leading-relaxed">{activeDebugStep.explanation}</p>
                  </div>
                )}

                {/* Variables Watch Table */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 font-mono text-xs custom-scrollbar">
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Variables (Watch Inspector)</span>
                    </h4>

                    {activeDebugStep?.variables ? (
                      <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
                        <table className="w-full text-left text-[11px]">
                          <thead className="bg-white/[0.04] text-slate-400 border-b border-white/10">
                            <tr>
                              <th className="py-1.5 px-3">Variable</th>
                              <th className="py-1.5 px-3">Value</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {Object.entries(activeDebugStep.variables).map(([key, val]) => (
                              <tr key={key} className="hover:bg-white/[0.04]">
                                <td className="py-1.5 px-3 font-bold text-amber-300">{key}</td>
                                <td className="py-1.5 px-3 text-emerald-300">
                                  {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-slate-500 italic text-[11px] p-2">
                        No active variables in current scope. Click &quot;Step Over&quot; to begin.
                      </div>
                    )}
                  </div>

                  {/* Call Stack Hierarchy */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-sky-400" />
                      <span>Call Stack</span>
                    </h4>
                    <div className="space-y-1">
                      {(activeDebugStep?.callStack || ['main()']).map((frame, i) => (
                        <div
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-[11px] text-sky-300 flex items-center justify-between"
                        >
                          <span>{frame}</span>
                          <span className="text-[9px] text-slate-500">Frame #{i}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. TERMINAL / CONSOLE TAB */}
        {activeTab === 'terminal' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#070a14] font-mono text-xs">
            {/* Terminal Header */}
            <div className="px-4 py-2 bg-[#090d18] border-b border-white/10 flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-slate-200 font-bold">Bash REPL / Interactive Console</span>
              </div>
              <div className="flex items-center gap-3">
                {executionResult && (
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    {executionResult.executionTimeMs}ms
                  </span>
                )}
                <button
                  onClick={() => setTerminalLogs(['Terminal cleared.'])}
                  className="p-1 text-slate-400 hover:text-white transition cursor-pointer"
                  title="Clear Terminal"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Terminal Stream Output */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar text-slate-200">
              {terminalLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed whitespace-pre-wrap ${
                    log.startsWith('❌')
                      ? 'text-rose-400'
                      : log.startsWith('🚀') || log.startsWith('✨')
                      ? 'text-emerald-400 font-bold'
                      : log.startsWith('>')
                      ? 'text-amber-300 font-bold'
                      : 'text-slate-200'
                  }`}
                >
                  {log}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Interactive Stdin Input Bar */}
            <div className="p-3 bg-[#0a0e1c] border-t border-white/10 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <input
                type="text"
                value={stdinInput}
                onChange={(e) => setStdinInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendStdin()}
                placeholder="Type stdin input or press Enter to run..."
                className="flex-1 bg-transparent border-none text-slate-100 placeholder-slate-500 focus:outline-none text-xs"
              />
              <button
                onClick={handleSendStdin}
                className="p-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition cursor-pointer"
                title="Send Input"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* 4. LECTURE NOTES & CHEATSHEET TAB */}
        {activeTab === 'notes' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#090d18] text-slate-300 text-xs custom-scrollbar">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">{lectureTitle}</h3>
                <span className="text-[11px] text-amber-400 font-mono">
                  Rohit Negi Coder Army Study Blueprint
                </span>
              </div>
              <button
                onClick={() => {
                  sound.playPop();
                  navigator.clipboard.writeText(lectureNotes);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 border border-white/10 text-xs transition cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Notes'}</span>
              </button>
            </div>

            <div className="prose prose-invert prose-xs max-w-none space-y-3 leading-relaxed whitespace-pre-line font-mono text-[11px]">
              {lectureNotes}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
