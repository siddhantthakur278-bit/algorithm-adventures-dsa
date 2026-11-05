import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../../utils/soundEffects';
import { Play, Pause, SkipForward, RotateCcw, Terminal, Layers, Check } from 'lucide-react';

interface CodeStepVisualizerProps {
  code: string;
  output?: string;
  title?: string;
  onClose?: () => void;
}

export const CodeStepVisualizer: React.FC<CodeStepVisualizerProps> = ({
  code,
  output = '',
  title = 'Interactive Python Execution Trace',
  onClose,
}) => {
  const lines = code.trim().split('\n');
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1400);

  // Parse dummy variables or track execution states for animation
  const simulatedMemory = [
    { name: 'n', val: `${Math.min(currentLineIndex * 2 + 1, 9)}`, type: 'int', address: '0x10a2' },
    {
      name: 'result',
      val: currentLineIndex > 0 ? `[1, 9, 25][: ${currentLineIndex}]` : '[]',
      type: 'list',
      address: '0x7ffd',
    },
  ];

  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentLineIndex(prev => {
          if (prev >= lines.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          sound.playPop();
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speed, lines.length]);

  const stepForward = () => {
    sound.playPop();
    setCurrentLineIndex(prev => Math.min(lines.length - 1, prev + 1));
  };

  const stepBackward = () => {
    sound.playPop();
    setCurrentLineIndex(prev => Math.max(0, prev - 1));
  };

  const reset = () => {
    sound.playPop();
    setIsPlaying(false);
    setCurrentLineIndex(0);
  };

  return (
    <div className="bg-[#060c15] border-2 border-[#1c304a] rounded-2xl p-4 sm:p-5 shadow-comic-lg space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-[#152336] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h4 className="font-bangers text-sm sm:text-base text-white tracking-wide">{title}</h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>
            Line {currentLineIndex + 1} / {lines.length}
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white px-1.5 py-0.5 rounded cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Split Grid: Code Stepper on Left, Memory Scope on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left: Code Lines Stepper (7 cols) */}
        <div className="md:col-span-7 bg-[#04070d] rounded-xl border border-[#142133] p-3 font-mono text-xs overflow-x-auto max-h-72">
          {lines.map((lineText, idx) => {
            const isCurrent = idx === currentLineIndex;
            const isPast = idx < currentLineIndex;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 px-2 py-1 rounded transition-colors ${
                  isCurrent
                    ? 'bg-[#10B981]/25 border-l-4 border-[#10B981] text-emerald-200 font-bold'
                    : isPast
                    ? 'text-slate-400'
                    : 'text-slate-600'
                }`}
              >
                <span className="w-5 text-right text-[10px] text-slate-500 select-none">
                  {idx + 1}
                </span>
                <span className="whitespace-pre">{lineText || ' '}</span>
                {isCurrent && (
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="text-[#FBBF24] text-[10px] ml-auto select-none font-sans font-bold"
                  >
                    ◀ EXECUTING
                  </motion.span>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Live Memory State & Variables (5 cols) */}
        <div className="md:col-span-5 space-y-3">
          <div className="bg-[#08121f] p-3 rounded-xl border border-[#162940] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1 font-bold text-cyan-300">
                <Layers className="w-3.5 h-3.5" /> MEMORY STACK / SCOPE
              </span>
              <span className="text-[10px]">Active Frame</span>
            </div>

            <div className="space-y-1.5 pt-1">
              {simulatedMemory.map(item => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#040911] border border-[#132338] text-xs font-mono"
                >
                  <div>
                    <span className="font-bold text-[#FBBF24]">{item.name}</span>
                    <span className="text-[10px] text-slate-500 ml-1.5">({item.type})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-300 font-bold">{item.val}</span>
                    <span className="text-[9px] text-slate-600 font-mono">{item.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal Output Snapshot */}
          {output && (
            <div className="bg-[#03060a] p-3 rounded-xl border border-[#0d1826] text-xs font-mono space-y-1">
              <span className="text-[10px] font-bold text-[#38BDF8] flex items-center gap-1">
                <Terminal className="w-3 h-3" /> TERMINAL STDOUT:
              </span>
              <pre className="text-emerald-300 text-[11px] whitespace-pre-wrap leading-relaxed max-h-24 overflow-y-auto">
                {currentLineIndex > 0 ? output : '# Running...'}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Stepper Controls Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-[#132236]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(p => !p)}
            className="px-3 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-black font-bangers text-xs border border-black shadow-comic-sm flex items-center gap-1 cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Auto-Step
              </>
            )}
          </button>
          <button
            onClick={stepForward}
            disabled={currentLineIndex >= lines.length - 1}
            className="px-2.5 py-1.5 rounded-lg bg-[#152438] hover:bg-[#1f3552] text-slate-200 font-mono text-xs disabled:opacity-40 cursor-pointer flex items-center gap-1"
          >
            <SkipForward className="w-3.5 h-3.5" /> Step
          </button>
          <button
            onClick={reset}
            className="p-1.5 rounded-lg bg-[#152438] hover:bg-[#1f3552] text-slate-300 cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span>Speed:</span>
          {[
            { label: '1x', val: 1400 },
            { label: '2x', val: 700 },
          ].map(s => (
            <button
              key={s.label}
              onClick={() => setSpeed(s.val)}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${
                speed === s.val ? 'bg-[#10B981] text-black font-bold' : 'text-slate-500 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
