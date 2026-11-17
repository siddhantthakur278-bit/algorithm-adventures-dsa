import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Zap,
  Target,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Table,
} from 'lucide-react';
import { ComicBubble } from '../characters/Characters';
import { sound } from '../../utils/soundEffects';

type DPProblemType = 'knapsack' | 'lcs' | 'gridPaths' | 'climbingStairs';

interface StepState {
  row: number;
  col: number;
  value: number;
  formula: string;
  sourceCells: { r: number; c: number; label: string }[];
  explanation: string;
}

export const DynamicProgrammingVisualizer: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<DPProblemType>('knapsack');
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- 1. 0/1 KNAPSACK PROBLEM DATA ---
  const knapsackItems = [
    { name: 'Item 1', wt: 1, val: 1 },
    { name: 'Item 2', wt: 3, val: 4 },
    { name: 'Item 3', wt: 4, val: 5 },
    { name: 'Item 4', wt: 5, val: 7 },
  ];
  const knapsackCap = 7;

  // --- 2. LCS DATA ---
  const s1 = 'AGGTAB';
  const s2 = 'GXTXAYB';

  // --- 3. GRID PATHS DATA ---
  const gridRows = 3;
  const gridCols = 4;
  const obstacles: Record<string, boolean> = { '1-2': true }; // obstacle at row 1, col 2

  // --- 4. CLIMBING STAIRS DATA ---
  const stairsN = 6;

  // Precomputed computation steps for active problem
  const [computedSteps, setComputedSteps] = useState<StepState[]>([]);
  const [matrixState, setMatrixState] = useState<(number | null)[][]>([]);

  // Generate Steps Generator
  useEffect(() => {
    setIsPlaying(false);
    setCurrentStepIdx(0);

    if (selectedProblem === 'knapsack') {
      const n = knapsackItems.length;
      const w = knapsackCap;
      const steps: StepState[] = [];
      const dp: number[][] = Array.from({ length: n + 1 }, () => Array(w + 1).fill(0));

      // Row 0 base cases
      for (let c = 0; c <= w; c++) {
        dp[0][c] = 0;
      }

      for (let i = 1; i <= n; i++) {
        const item = knapsackItems[i - 1];
        for (let cap = 0; cap <= w; cap++) {
          const sources: { r: number; c: number; label: string }[] = [];
          const notTake = dp[i - 1][cap];
          sources.push({ r: i - 1, c: cap, label: `Skip item: ${notTake}` });

          let take = -1;
          if (item.wt <= cap) {
            take = item.val + dp[i - 1][cap - item.wt];
            sources.push({
              r: i - 1,
              c: cap - item.wt,
              label: `Take item (val ${item.val} + dp[${i - 1}][${cap - item.wt}] = ${take})`,
            });
          }

          dp[i][cap] = Math.max(notTake, take);
          const formulaStr =
            item.wt <= cap
              ? `dp[${i}][${cap}] = max(skip: ${notTake}, take: ${item.val} + ${dp[i - 1][cap - item.wt]} = ${take}) = ${dp[i][cap]}`
              : `Item wt ${item.wt} > cap ${cap}. Must skip: dp[${i}][${cap}] = dp[${i - 1}][${cap}] = ${notTake}`;

          steps.push({
            row: i,
            col: cap,
            value: dp[i][cap],
            formula: formulaStr,
            sourceCells: sources,
            explanation:
              item.wt <= cap
                ? `Deciding on ${item.name} (wt: ${item.wt}, val: ${item.val}) for capacity ${cap}. We choose the max of excluding it (${notTake}) or including it (${take}).`
                : `${item.name} weighs ${item.wt} which exceeds current capacity ${cap}. We must inherit answer from row above.`,
          });
        }
      }
      setComputedSteps(steps);
      setMatrixState(Array.from({ length: n + 1 }, () => Array(w + 1).fill(null)));
    } else if (selectedProblem === 'lcs') {
      const n = s1.length;
      const m = s2.length;
      const steps: StepState[] = [];
      const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
          const char1 = s1[i - 1];
          const char2 = s2[j - 1];
          const sources: { r: number; c: number; label: string }[] = [];

          if (char1 === char2) {
            dp[i][j] = 1 + dp[i - 1][j - 1];
            sources.push({
              r: i - 1,
              c: j - 1,
              label: `Match '${char1}'! 1 + dp[${i - 1}][${j - 1}] = ${dp[i][j]}`,
            });
            steps.push({
              row: i,
              col: j,
              value: dp[i][j],
              formula: `s1[${i - 1}] == s2[${j - 1}] ('${char1}'). dp[${i}][${j}] = 1 + dp[${i - 1}][${j - 1}] = ${dp[i][j]}`,
              sourceCells: sources,
              explanation: `Characters match ('${char1}')! Extend the optimal common subsequence length from diagonal cell by +1.`,
            });
          } else {
            const up = dp[i - 1][j];
            const left = dp[i][j - 1];
            dp[i][j] = Math.max(up, left);
            sources.push({ r: i - 1, c: j, label: `Ignore s1 char: ${up}` });
            sources.push({ r: i, c: j - 1, label: `Ignore s2 char: ${left}` });

            steps.push({
              row: i,
              col: j,
              value: dp[i][j],
              formula: `s1[${i - 1}] != s2[${j - 1}]. dp[${i}][${j}] = max(up: ${up}, left: ${left}) = ${dp[i][j]}`,
              sourceCells: sources,
              explanation: `Characters mismatch ('${char1}' vs '${char2}'). Propagate maximum subsequence length from either top or left.`,
            });
          }
        }
      }
      setComputedSteps(steps);
      setMatrixState(Array.from({ length: n + 1 }, () => Array(m + 1).fill(null)));
    } else if (selectedProblem === 'gridPaths') {
      const steps: StepState[] = [];
      const dp: number[][] = Array.from({ length: gridRows }, () => Array(gridCols).fill(0));

      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          if (obstacles[`${r}-${c}`]) {
            dp[r][c] = 0;
            steps.push({
              row: r,
              col: c,
              value: 0,
              formula: `Obstacle at (${r}, ${c})! Paths = 0`,
              sourceCells: [],
              explanation: `Cell (${r}, ${c}) contains an impassable rock obstacle. 0 paths can traverse through here.`,
            });
            continue;
          }

          if (r === 0 && c === 0) {
            dp[0][0] = 1;
            steps.push({
              row: 0,
              col: 0,
              value: 1,
              formula: `Start cell dp[0][0] = 1 path`,
              sourceCells: [],
              explanation: `Starting position. Exactly 1 way to be standing at the origin.`,
            });
            continue;
          }

          let up = r > 0 ? dp[r - 1][c] : 0;
          let left = c > 0 ? dp[r][c - 1] : 0;
          dp[r][c] = up + left;
          const sources: { r: number; c: number; label: string }[] = [];
          if (r > 0) sources.push({ r: r - 1, c, label: `From top: ${up}` });
          if (c > 0) sources.push({ r, c: c - 1, label: `From left: ${left}` });

          steps.push({
            row: r,
            col: c,
            value: dp[r][c],
            formula: `dp[${r}][${c}] = top (${up}) + left (${left}) = ${dp[r][c]}`,
            sourceCells: sources,
            explanation: `Robot can move only Right or Down. Total paths reaching (${r}, ${c}) is sum of paths from top and left neighbors.`,
          });
        }
      }
      setComputedSteps(steps);
      setMatrixState(Array.from({ length: gridRows }, () => Array(gridCols).fill(null)));
    } else if (selectedProblem === 'climbingStairs') {
      const steps: StepState[] = [];
      const dp: number[] = Array(stairsN + 1).fill(0);
      dp[0] = 1;
      dp[1] = 1;

      for (let i = 2; i <= stairsN; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
        steps.push({
          row: 0,
          col: i,
          value: dp[i],
          formula: `dp[${i}] = dp[${i - 1}] (${dp[i - 1]}) + dp[${i - 2}] (${dp[i - 2]}) = ${dp[i]}`,
          sourceCells: [
            { r: 0, c: i - 1, label: `1-step jump: ${dp[i - 1]}` },
            { r: 0, c: i - 2, label: `2-step jump: ${dp[i - 2]}` },
          ],
          explanation: `To reach step ${i}, we could take a 1-step leap from step ${i - 1} or a 2-step leap from step ${i - 2}. Total distinct ways = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}.`,
        });
      }
      setComputedSteps(steps);
      setMatrixState([[1, 1, ...Array(stairsN - 1).fill(null)]]);
    }
  }, [selectedProblem]);

  // Update visible table matrix as steps progress
  useEffect(() => {
    if (computedSteps.length === 0) return;
    const currentStep = computedSteps[currentStepIdx];
    if (!currentStep) return;

    setMatrixState((prev) => {
      const copy = prev.map((row) => [...row]);
      for (let i = 0; i <= currentStepIdx; i++) {
        const s = computedSteps[i];
        if (copy[s.row]) {
          copy[s.row][s.col] = s.value;
        }
      }
      return copy;
    });
  }, [currentStepIdx, computedSteps]);

  // Autoplay ticker
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= computedSteps.length - 1) {
            setIsPlaying(false);
            sound.playCelebration();
            return prev;
          }
          sound.playPop();
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, computedSteps.length, playbackSpeed]);

  const activeStep = computedSteps[currentStepIdx];

  const isSourceCell = (r: number, c: number) => {
    if (!activeStep) return false;
    return activeStep.sourceCells.some((sc) => sc.r === r && sc.c === c);
  };

  const getSourceLabel = (r: number, c: number) => {
    if (!activeStep) return '';
    const found = activeStep.sourceCells.find((sc) => sc.r === r && sc.c === c);
    return found ? found.label : '';
  };

  return (
    <div className="bg-[#0b0e1b] border-2 border-slate-700/80 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* 1. Header & Problem Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Table className="w-4 h-4" />
            </span>
            <h2 className="font-bangers text-2xl sm:text-3xl text-white tracking-wide">
              DYNAMIC PROGRAMMING 2D TABLE &amp; RECURRENCE STUDIO
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Watch subproblem table states compute cell-by-cell with live dependency arrows and optimal substructure.
          </p>
        </div>

        {/* Problem Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              sound.playPop();
              setSelectedProblem('knapsack');
            }}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition cursor-pointer border ${
              selectedProblem === 'knapsack'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-105'
                : 'bg-white/[0.05] text-slate-300 hover:text-white border-white/10'
            }`}
          >
            0/1 Knapsack (2D)
          </button>
          <button
            onClick={() => {
              sound.playPop();
              setSelectedProblem('lcs');
            }}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition cursor-pointer border ${
              selectedProblem === 'lcs'
                ? 'bg-purple-500 text-white border-purple-400 shadow-md scale-105'
                : 'bg-white/[0.05] text-slate-300 hover:text-white border-white/10'
            }`}
          >
            LCS Matrix (2D)
          </button>
          <button
            onClick={() => {
              sound.playPop();
              setSelectedProblem('gridPaths');
            }}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition cursor-pointer border ${
              selectedProblem === 'gridPaths'
                ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow-md scale-105'
                : 'bg-white/[0.05] text-slate-300 hover:text-white border-white/10'
            }`}
          >
            Unique Paths (Grid)
          </button>
          <button
            onClick={() => {
              sound.playPop();
              setSelectedProblem('climbingStairs');
            }}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition cursor-pointer border ${
              selectedProblem === 'climbingStairs'
                ? 'bg-emerald-400 text-slate-950 border-emerald-300 shadow-md scale-105'
                : 'bg-white/[0.05] text-slate-300 hover:text-white border-white/10'
            }`}
          >
            Climbing Stairs (1D)
          </button>
        </div>
      </div>

      {/* 2. Interactive Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-black/40 rounded-xl border border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playPop();
              setIsPlaying(!isPlaying);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition cursor-pointer shadow-sm"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Play Auto'}</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setCurrentStepIdx(Math.max(0, currentStepIdx - 1));
            }}
            disabled={currentStepIdx === 0}
            className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white disabled:opacity-30 border border-white/10 transition cursor-pointer"
            title="Previous Cell"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setCurrentStepIdx(Math.min(computedSteps.length - 1, currentStepIdx + 1));
            }}
            disabled={currentStepIdx >= computedSteps.length - 1}
            className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white disabled:opacity-30 border border-white/10 transition cursor-pointer"
            title="Next Cell"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setIsPlaying(false);
              setCurrentStepIdx(0);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white border border-white/10 transition cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Step Progress & Speed */}
        <div className="flex items-center gap-3">
          <span className="text-slate-400">
            Step <strong className="text-amber-300">{currentStepIdx + 1}</strong> / {computedSteps.length}
          </span>
          <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-lg border border-white/10">
            {[0.5, 1, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                  playbackSpeed === spd ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Live 2D Matrix Rendering */}
      <div className="p-4 sm:p-6 bg-[#070913] rounded-2xl border border-white/10 space-y-4 overflow-x-auto custom-scrollbar">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>DP Table Grid State:</span>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-400 ring-2 ring-amber-300" /> Current Computing Cell
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-cyan-500/30 border border-cyan-400" /> Source Dependents
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/40" /> Completed
            </span>
          </div>
        </div>

        {/* Grid Display */}
        <div className="inline-block min-w-full">
          <table className="border-collapse font-mono text-xs mx-auto">
            <thead>
              <tr>
                <th className="p-2 border border-slate-800 bg-[#0e1326] text-slate-400 font-bold">i \ j</th>
                {selectedProblem === 'knapsack' &&
                  Array.from({ length: knapsackCap + 1 }).map((_, c) => (
                    <th key={c} className="p-2 border border-slate-800 bg-[#0e1326] text-amber-300 font-bold text-center min-w-[50px]">
                      w={c}
                    </th>
                  ))}
                {selectedProblem === 'lcs' &&
                  ['Ø', ...s2.split('')].map((char, c) => (
                    <th key={c} className="p-2 border border-slate-800 bg-[#0e1326] text-purple-300 font-bold text-center min-w-[50px]">
                      {char} ({c})
                    </th>
                  ))}
                {selectedProblem === 'gridPaths' &&
                  Array.from({ length: gridCols }).map((_, c) => (
                    <th key={c} className="p-2 border border-slate-800 bg-[#0e1326] text-cyan-300 font-bold text-center min-w-[60px]">
                      col {c}
                    </th>
                  ))}
                {selectedProblem === 'climbingStairs' &&
                  Array.from({ length: stairsN + 1 }).map((_, c) => (
                    <th key={c} className="p-2 border border-slate-800 bg-[#0e1326] text-emerald-300 font-bold text-center min-w-[60px]">
                      step {c}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {matrixState.map((rowArr, rIdx) => {
                let rowLabel = `row ${rIdx}`;
                if (selectedProblem === 'knapsack') {
                  rowLabel = rIdx === 0 ? 'Base' : `${knapsackItems[rIdx - 1]?.name} (wt:${knapsackItems[rIdx - 1]?.wt})`;
                } else if (selectedProblem === 'lcs') {
                  rowLabel = rIdx === 0 ? 'Ø (0)' : `${s1[rIdx - 1]} (${rIdx})`;
                } else if (selectedProblem === 'gridPaths') {
                  rowLabel = `row ${rIdx}`;
                } else if (selectedProblem === 'climbingStairs') {
                  rowLabel = 'Ways';
                }

                return (
                  <tr key={rIdx}>
                    <td className="p-2 border border-slate-800 bg-[#0e1326] text-slate-400 font-bold text-right pr-3 whitespace-nowrap">
                      {rowLabel}
                    </td>
                    {rowArr.map((cellVal, cIdx) => {
                      const isCurrent = activeStep?.row === rIdx && activeStep?.col === cIdx;
                      const isSource = isSourceCell(rIdx, cIdx);
                      const isObstacle = selectedProblem === 'gridPaths' && obstacles[`${rIdx}-${cIdx}`];

                      let cellBg = 'bg-[#0f1424] text-slate-500';
                      if (isObstacle) {
                        cellBg = 'bg-red-950/40 text-red-400 border-red-500/50';
                      } else if (isCurrent) {
                        cellBg = 'bg-amber-400 text-slate-950 font-black ring-4 ring-amber-300 scale-105 z-10 shadow-lg';
                      } else if (isSource) {
                        cellBg = 'bg-cyan-500/25 text-cyan-300 font-bold border-cyan-400 ring-2 ring-cyan-500/40';
                      } else if (cellVal !== null) {
                        cellBg = 'bg-emerald-950/30 text-emerald-300 font-semibold border-slate-800';
                      }

                      return (
                        <td
                          key={cIdx}
                          className={`p-3 border border-slate-800 text-center transition-all duration-200 relative ${cellBg}`}
                          title={isSource ? getSourceLabel(rIdx, cIdx) : undefined}
                        >
                          {isObstacle ? '🪨' : cellVal !== null ? cellVal : '—'}
                          {isSource && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Active Cell Recurrence Relation & Source Dependencies */}
      {activeStep && (
        <div className="p-4 rounded-xl bg-amber-500/[0.07] border border-amber-500/30 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-amber-300 font-bold">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Current Recurrence Transition:</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-black/40 border border-amber-400/30">
              Cell [{activeStep.row}][{activeStep.col}]
            </span>
          </div>

          <pre className="p-3 rounded-lg bg-black/60 border border-white/10 text-amber-200 overflow-x-auto whitespace-pre-wrap leading-relaxed text-xs sm:text-sm">
            {activeStep.formula}
          </pre>

          {activeStep.sourceCells.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-slate-400 text-[11px]">Inputs:</span>
              {activeStep.sourceCells.map((sc, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-[11px]"
                >
                  [{sc.r}][{sc.c}] ➔ {sc.label}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. Comic Character Commentary */}
      <div className="w-full">
        <ComicBubble
          speaker="professor"
          text={
            activeStep?.explanation ||
            'Dynamic Programming builds global optimums from overlapping subproblem optimal substructures.'
          }
          subtext={`Recurrence Invariant: ${selectedProblem.toUpperCase()}`}
        />
      </div>
    </div>
  );
};
