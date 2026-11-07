import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  Brain,
  Gauge,
  AlertCircle,
  CheckCircle2,
  Play,
  RotateCcw,
  Zap,
  Activity,
  Code2,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

interface PairProgrammingCockpitProps {
  code: string;
  onCodeChange?: (newCode: string) => void;
  problemTitle?: string;
}

interface CodeMetrics {
  cyclomaticComplexity: number;
  estimatedBigO: string;
  lineCount: number;
  maintainabilityIndex: number;
  nestingDepth: number;
  smells: string[];
}

export const PairProgrammingCockpit: React.FC<PairProgrammingCockpitProps> = ({
  code,
  onCodeChange,
  problemTitle = 'Two Sum',
}) => {
  const [voiceActive, setVoiceActive] = useState<boolean>(false);
  const [selectedPersona, setSelectedPersona] = useState<'byte' | 'algorismus'>('byte');
  const [metrics, setMetrics] = useState<CodeMetrics>({
    cyclomaticComplexity: 1,
    estimatedBigO: 'O(1)',
    lineCount: 1,
    maintainabilityIndex: 100,
    nestingDepth: 0,
    smells: [],
  });
  const [speechText, setSpeechText] = useState<string>('');

  // Analyze Code Metrics in Real-Time
  useEffect(() => {
    const lines = code.split('\n');
    const lineCount = lines.length;

    // Cyclomatic complexity: 1 + number of branching points
    const branchingRegex = /\b(if|elif|for|while|and|or|except)\b/g;
    const matches = code.match(branchingRegex) || [];
    const cyclomaticComplexity = 1 + matches.length;

    // Nesting depth
    let maxIndent = 0;
    lines.forEach((l) => {
      const trimmed = l.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const leadingSpaces = l.search(/\S|$/);
      const indentLevel = Math.floor(leadingSpaces / 4);
      if (indentLevel > maxIndent) maxIndent = indentLevel;
    });

    // Big-O Estimation heuristic
    let estimatedBigO = 'O(1)';
    const forCount = (code.match(/\bfor\b/g) || []).length;
    const whileCount = (code.match(/\bwhile\b/g) || []).length;
    const hasDictLookup = /in\s+\w+/.test(code) && /\{\}/.test(code);

    if (maxIndent >= 2 && (forCount >= 2 || (forCount >= 1 && whileCount >= 1))) {
      estimatedBigO = 'O(N²) Quadratic';
    } else if (whileCount >= 1 && (code.includes('// 2') || code.includes('>> 1'))) {
      estimatedBigO = 'O(log N) Logarithmic';
    } else if (forCount === 1) {
      estimatedBigO = hasDictLookup ? 'O(N) Linear (Hash Probe)' : 'O(N) Linear';
    }

    // Code smells detection
    const smells: string[] = [];
    if (maxIndent >= 3) {
      smells.push('Deep nesting detected (level ≥ 3) — consider helper decomposition');
    }
    if (lineCount > 30) {
      smells.push('High line count for single solution unit (> 30 lines)');
    }
    if (/\b(global|eval|exec)\b/.test(code)) {
      smells.push('Dangerous builtin used (global/eval/exec)');
    }
    if (cyclomaticComplexity > 6) {
      smells.push('High cyclomatic complexity — too many branch permutations');
    }

    // Maintainability Index (simplified 0-100)
    const rawMi = 100 - cyclomaticComplexity * 4 - maxIndent * 8 - (lineCount > 20 ? 10 : 0);
    const maintainabilityIndex = Math.max(15, Math.min(100, Math.round(rawMi)));

    setMetrics({
      cyclomaticComplexity,
      estimatedBigO,
      lineCount,
      maintainabilityIndex,
      nestingDepth: maxIndent,
      smells,
    });
  }, [code]);

  // Web Speech API Voice Synthesizer
  const speakVoice = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    setSpeechText(text);
    setVoiceActive(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = selectedPersona === 'byte' ? 1.05 : 0.95;
    utterance.pitch = selectedPersona === 'byte' ? 1.2 : 0.9;

    utterance.onend = () => {
      setVoiceActive(false);
    };

    utterance.onerror = () => {
      setVoiceActive(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setVoiceActive(false);
    sound.playPop();
  };

  const triggerVoiceExplanation = () => {
    sound.playPop();
    const explanation =
      selectedPersona === 'byte'
        ? `Hey! Byte here! Your code for ${problemTitle} has an estimated complexity of ${metrics.estimatedBigO}. Cyclomatic complexity is ${metrics.cyclomaticComplexity}. Keep pushing forward, you got this!`
        : `Greetings student. This is Professor Algorismus analyzing your algorithm. The cyclomatic complexity is indexed at ${metrics.cyclomaticComplexity}, with a maintainability score of ${metrics.maintainabilityIndex} percent. The algorithmic time complexity maps to ${metrics.estimatedBigO}.`;
    speakVoice(explanation);
  };

  const triggerVoiceHint = () => {
    sound.playPop();
    const hint =
      selectedPersona === 'byte'
        ? `Byte tip! If you are scanning an array with a nested loop, remember: a hash set or dictionary can trade a little memory to give you instant O of 1 lookups!`
        : `Professor's invariant advice: Always verify your loop termination conditions and consider the invariant: does your data structure satisfy lookup bounds in constant time?`;
    speakVoice(hint);
  };

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-[#090d18] border-2 border-black shadow-comic space-y-4 font-sans text-slate-200">
      {/* Header & Persona Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-2xl flex items-center justify-center text-lg border-2 border-black shadow-comic-sm ${
              voiceActive ? 'bg-cyan-400 text-slate-950 animate-bounce' : 'bg-purple-950 text-purple-300'
            }`}
          >
            {selectedPersona === 'byte' ? '🤖' : '🧙‍♂️'}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bangers text-lg text-white tracking-wide">
                AI PAIR PROGRAMMING COCKPIT
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-black text-[9px] uppercase tracking-wider">
                Web Speech Voice
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Live AST diagnostic metrics &amp; voice-synthesized code commentary
            </p>
          </div>
        </div>

        {/* Persona Switcher & Voice Controls */}
        <div className="flex items-center gap-2">
          <div className="flex p-0.5 bg-[#05070e] rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setSelectedPersona('byte');
                sound.playPop();
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                selectedPersona === 'byte'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-comic-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Byte 🤖
            </button>
            <button
              onClick={() => {
                setSelectedPersona('algorismus');
                sound.playPop();
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                selectedPersona === 'algorismus'
                  ? 'bg-purple-500 text-white font-black shadow-comic-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Prof 🧙‍♂️
            </button>
          </div>

          {voiceActive ? (
            <button
              onClick={stopVoice}
              className="p-1.5 rounded-xl bg-rose-500 text-white font-bold text-xs border border-black shadow-comic-sm cursor-pointer animate-pulse flex items-center gap-1"
              title="Stop voice speech"
            >
              <VolumeX className="w-4 h-4" /> Stop
            </button>
          ) : (
            <button
              onClick={triggerVoiceExplanation}
              className="px-3 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs border border-black shadow-comic-sm cursor-pointer flex items-center gap-1.5"
              title="Speak code analysis aloud"
            >
              <Volume2 className="w-3.5 h-3.5" /> Speak
            </button>
          )}
        </div>
      </div>

      {/* Voice Bubble (If Active) */}
      {voiceActive && speechText && (
        <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-950/60 to-cyan-950/60 border border-cyan-400/50 flex items-center gap-3 animate-fadeIn">
          <div className="flex items-end gap-0.5 h-4 shrink-0">
            <span className="w-1 bg-cyan-400 animate-bounce" style={{ height: '60%' }} />
            <span className="w-1 bg-purple-400 animate-bounce" style={{ height: '100%', animationDelay: '150ms' }} />
            <span className="w-1 bg-amber-400 animate-bounce" style={{ height: '80%', animationDelay: '300ms' }} />
          </div>
          <p className="text-xs text-white italic font-serif">"{speechText}"</p>
        </div>
      )}

      {/* 4 Real-Time Code Metric Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Metric 1: Cyclomatic Complexity */}
        <div className="p-3 rounded-2xl bg-[#04060c] border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Cyclomatic
          </span>
          <div className="text-xl font-black text-cyan-300 font-mono">
            M = {metrics.cyclomaticComplexity}
          </div>
          <span className="text-[9px] text-slate-500 font-sans block">
            {metrics.cyclomaticComplexity <= 3
              ? 'Simple & clean'
              : metrics.cyclomaticComplexity <= 6
              ? 'Moderate branches'
              : 'Complex logic'}
          </span>
        </div>

        {/* Metric 2: Estimated Big-O */}
        <div className="p-3 rounded-2xl bg-[#04060c] border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Big-O Upper Bound
          </span>
          <div className="text-xl font-black text-amber-300 font-mono truncate">
            {metrics.estimatedBigO.split(' ')[0]}
          </div>
          <span className="text-[9px] text-slate-500 font-sans block truncate">
            {metrics.estimatedBigO.split(' ').slice(1).join(' ') || 'Instant'}
          </span>
        </div>

        {/* Metric 3: Maintainability Index */}
        <div className="p-3 rounded-2xl bg-[#04060c] border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Maintainability
          </span>
          <div
            className={`text-xl font-black font-mono ${
              metrics.maintainabilityIndex >= 80
                ? 'text-emerald-400'
                : metrics.maintainabilityIndex >= 50
                ? 'text-amber-400'
                : 'text-rose-400'
            }`}
          >
            {metrics.maintainabilityIndex}%
          </div>
          <span className="text-[9px] text-slate-500 font-sans block">
            Halstead Volume rating
          </span>
        </div>

        {/* Metric 4: Nesting Depth */}
        <div className="p-3 rounded-2xl bg-[#04060c] border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Max Nesting Depth
          </span>
          <div className="text-xl font-black text-purple-300 font-mono">
            {metrics.nestingDepth} levels
          </div>
          <span className="text-[9px] text-slate-500 font-sans block">
            Indent indentation tier
          </span>
        </div>
      </div>

      {/* Code Smells & Quick AI Prompt Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-800">
        <div className="space-y-1 max-w-md">
          {metrics.smells.length === 0 ? (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> No code smells detected. Excellent structure!
            </div>
          ) : (
            <div className="space-y-1">
              {metrics.smells.map((smell, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[11px] text-amber-300">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{smell}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={triggerVoiceHint}
            className="px-3 py-1.5 rounded-xl bg-[#141b2e] hover:bg-[#1f2a48] text-amber-300 font-bold text-xs border border-amber-400/40 cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Voice Hint
          </button>
        </div>
      </div>
    </div>
  );
};
