import React, { useState } from 'react';
import {
  Gauge,
  Play,
  RotateCcw,
  Sparkles,
  BarChart3,
  TrendingUp,
  Cpu,
  Zap,
  Info,
  CheckCircle2,
  Code2,
  Sliders,
  Award,
} from 'lucide-react';
import { ProfessorAvatar, ByteAvatar, ComicBubble } from '../characters/Characters';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface BenchmarkAlgorithm {
  id: string;
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  color: string;
  run: (n: number) => { timeMs: number; operations: number };
}

interface BenchmarkSuite {
  id: string;
  title: string;
  description: string;
  theory: string;
  algorithms: BenchmarkAlgorithm[];
  sizes: number[];
}

export const AlgorithmBenchmarkStudio: React.FC = () => {
  const suites: BenchmarkSuite[] = [
    {
      id: 'twosum',
      title: 'Two Sum: O(N²) Brute Force vs O(N) Hash Map',
      description: 'Find two numbers that add up to a target in an array of size N.',
      theory: 'The Brute Force approach checks every pair (N*(N-1)/2 comparisons). The Hash Map approach stores complements in O(1) average lookup time, trading O(N) auxiliary space for dramatic speedup as N grows!',
      sizes: [100, 500, 1000, 2500, 5000],
      algorithms: [
        {
          id: 'ts-brute',
          name: 'Brute Force Nested Loops',
          timeComplexity: 'O(N²)',
          spaceComplexity: 'O(1)',
          color: '#F43F5E',
          run: (n: number) => {
            const arr = Array.from({ length: n }, (_, i) => i + 1);
            const target = n * 2;
            let ops = 0;
            const t0 = performance.now();
            for (let i = 0; i < arr.length; i++) {
              for (let j = i + 1; j < arr.length; j++) {
                ops++;
                if (arr[i] + arr[j] === target) break;
              }
            }
            const t1 = performance.now();
            return { timeMs: Math.max(0.01, t1 - t0), operations: ops };
          },
        },
        {
          id: 'ts-hash',
          name: 'Hash Map (Single Pass)',
          timeComplexity: 'O(N)',
          spaceComplexity: 'O(N)',
          color: '#10B981',
          run: (n: number) => {
            const arr = Array.from({ length: n }, (_, i) => i + 1);
            const target = n * 2;
            const seen = new Map<number, number>();
            let ops = 0;
            const t0 = performance.now();
            for (let i = 0; i < arr.length; i++) {
              ops++;
              const comp = target - arr[i];
              if (seen.has(comp)) break;
              seen.set(arr[i], i);
            }
            const t1 = performance.now();
            return { timeMs: Math.max(0.005, t1 - t0), operations: ops };
          },
        },
      ],
    },
    {
      id: 'search',
      title: 'Search: O(N) Linear Search vs O(log N) Binary Search',
      description: 'Locate a target value in a sorted array of up to 100,000 elements.',
      theory: 'Linear Search inspects every element one by one. Binary Search divides the search space in half at each iteration, requiring at most log₂(N) steps (only ~17 comparisons for 100,000 items!).',
      sizes: [1000, 5000, 15000, 50000, 100000],
      algorithms: [
        {
          id: 'linear-search',
          name: 'Linear Search',
          timeComplexity: 'O(N)',
          spaceComplexity: 'O(1)',
          color: '#FB923C',
          run: (n: number) => {
            const arr = Array.from({ length: n }, (_, i) => i);
            const target = n - 1; // worst case
            let ops = 0;
            const t0 = performance.now();
            for (let i = 0; i < arr.length; i++) {
              ops++;
              if (arr[i] === target) break;
            }
            const t1 = performance.now();
            return { timeMs: Math.max(0.01, t1 - t0), operations: ops };
          },
        },
        {
          id: 'binary-search',
          name: 'Binary Search (Sorted)',
          timeComplexity: 'O(log N)',
          spaceComplexity: 'O(1)',
          color: '#38BDF8',
          run: (n: number) => {
            const arr = Array.from({ length: n }, (_, i) => i);
            const target = n - 1;
            let ops = 0;
            let low = 0;
            let high = arr.length - 1;
            const t0 = performance.now();
            while (low <= high) {
              ops++;
              const mid = (low + high) >> 1;
              if (arr[mid] === target) break;
              if (arr[mid] < target) low = mid + 1;
              else high = mid - 1;
            }
            const t1 = performance.now();
            return { timeMs: Math.max(0.002, t1 - t0), operations: ops };
          },
        },
      ],
    },
    {
      id: 'sorting',
      title: 'Sorting: O(N²) Bubble Sort vs O(N log N) Merge Sort',
      description: 'Sort an array of randomly shuffled integers.',
      theory: 'Bubble Sort repeatedly swaps adjacent pairs in quadratic time. Merge Sort utilizes Divide-and-Conquer to guarantee O(N log N) comparisons in all cases.',
      sizes: [50, 200, 500, 1000, 2000],
      algorithms: [
        {
          id: 'bubble-sort',
          name: 'Bubble Sort',
          timeComplexity: 'O(N²)',
          spaceComplexity: 'O(1)',
          color: '#F43F5E',
          run: (n: number) => {
            const arr = Array.from({ length: n }, () => Math.floor(Math.random() * 10000));
            let ops = 0;
            const t0 = performance.now();
            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < arr.length - i - 1; j++) {
                ops++;
                if (arr[j] > arr[j + 1]) {
                  const tmp = arr[j];
                  arr[j] = arr[j + 1];
                  arr[j + 1] = tmp;
                }
              }
            }
            const t1 = performance.now();
            return { timeMs: Math.max(0.01, t1 - t0), operations: ops };
          },
        },
        {
          id: 'merge-sort',
          name: 'Merge Sort',
          timeComplexity: 'O(N log N)',
          spaceComplexity: 'O(N)',
          color: '#A855F7',
          run: (n: number) => {
            const arr = Array.from({ length: n }, () => Math.floor(Math.random() * 10000));
            let ops = 0;
            const merge = (left: number[], right: number[]): number[] => {
              const res: number[] = [];
              let l = 0;
              let r = 0;
              while (l < left.length && r < right.length) {
                ops++;
                if (left[l] <= right[r]) res.push(left[l++]);
                else res.push(right[r++]);
              }
              return res.concat(left.slice(l)).concat(right.slice(r));
            };
            const sort = (a: number[]): number[] => {
              if (a.length <= 1) return a;
              const mid = Math.floor(a.length / 2);
              return merge(sort(a.slice(0, mid)), sort(a.slice(mid)));
            };
            const t0 = performance.now();
            sort(arr);
            const t1 = performance.now();
            return { timeMs: Math.max(0.01, t1 - t0), operations: ops };
          },
        },
      ],
    },
  ];

  const [activeSuiteIndex, setActiveSuiteIndex] = useState<number>(0);
  const currentSuite = suites[activeSuiteIndex];

  const [benchmarkResults, setBenchmarkResults] = useState<{
    [algoId: string]: { size: number; timeMs: number; ops: number }[];
  } | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const runBenchmark = async () => {
    setIsRunning(true);
    sound.playSwoosh();
    setBenchmarkResults(null);

    // Yield to UI to show running state
    await new Promise((r) => setTimeout(r, 100));

    const results: { [algoId: string]: { size: number; timeMs: number; ops: number }[] } = {};
    for (const algo of currentSuite.algorithms) {
      results[algo.id] = [];
      for (const size of currentSuite.sizes) {
        // Run 3 iterations and take median for statistical accuracy
        const runs = [algo.run(size), algo.run(size), algo.run(size)];
        runs.sort((a, b) => a.timeMs - b.timeMs);
        results[algo.id].push({
          size,
          timeMs: Number(runs[1].timeMs.toFixed(3)),
          ops: runs[1].operations,
        });
      }
    }

    setBenchmarkResults(results);
    setIsRunning(false);
    sound.playSuccess();
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
  };

  // Find max time for SVG scaling
  const maxTime = benchmarkResults
    ? Math.max(
        ...Object.values(benchmarkResults)
          .flat()
          .map((r) => r.timeMs),
        1
      )
    : 10;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#12162a] via-[#1b223c] to-[#12162a] border-3 border-black shadow-comic-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider border border-black shadow-comic-sm">
              <Gauge className="w-3.5 h-3.5 inline mr-1" /> Big-O Profiler
            </span>
            <span className="text-xs text-amber-300 font-bold">Real In-Browser Execution Benchmarking</span>
          </div>
          <h1 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
            ALGORITHM SPEED &amp; BIG-O BENCHMARK STUDIO
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Test actual millisecond performance curves across scaling input sizes $N$. Verify theoretical Big-O complexity curves live!
          </p>
        </div>

        <button
          onClick={runBenchmark}
          disabled={isRunning}
          className={`btn-comic-push px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-wider border-3 border-black shadow-comic flex items-center gap-2 cursor-pointer ${
            isRunning
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
              : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
          }`}
        >
          {isRunning ? (
            <>
              <RotateCcw className="w-4 h-4 animate-spin" />
              <span>Benchmarking N={currentSuite.sizes.join(', ')}...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Run Live Benchmark</span>
            </>
          )}
        </button>
      </div>

      {/* Benchmark Suite Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {suites.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => {
              setActiveSuiteIndex(idx);
              setBenchmarkResults(null);
              sound.playPop();
            }}
            className={`px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap border-2 transition cursor-pointer flex items-center gap-2 ${
              activeSuiteIndex === idx
                ? 'bg-[#FFDE59] text-black border-black shadow-comic-sm -translate-y-0.5'
                : 'bg-[#121626] text-slate-300 border-slate-700 hover:text-white hover:border-slate-500'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{s.title.split(':')[0]}</span>
          </button>
        ))}
      </div>

      {/* Main Suite Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Chart & Visualizer (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-[#0d1222] border-2 border-black shadow-comic space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bangers text-xl text-white">{currentSuite.title}</h3>
                <p className="text-xs text-slate-400">{currentSuite.description}</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/40">
                Wasm Microsecond Timer
              </span>
            </div>

            {/* SVG Interactive Time Curve Chart */}
            <div className="p-4 rounded-xl bg-[#070a14] border border-[#1b233a] relative min-h-[280px] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pb-2 border-b border-slate-800">
                <span>Execution Time (ms) vs Input Size (N)</span>
                <span>Max: {maxTime.toFixed(2)} ms</span>
              </div>

              {benchmarkResults ? (
                <div className="relative h-56 w-full flex items-end pt-4 pb-6 px-2">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 py-6">
                    <div className="border-b border-slate-600 w-full"></div>
                    <div className="border-b border-slate-600 w-full"></div>
                    <div className="border-b border-slate-600 w-full"></div>
                  </div>

                  {/* SVG Curves */}
                  <svg className="absolute inset-0 w-full h-full p-6 overflow-visible">
                    {currentSuite.algorithms.map((algo) => {
                      const data = benchmarkResults[algo.id];
                      if (!data) return null;
                      const points = data
                        .map((pt, i) => {
                          const x = (i / (data.length - 1)) * 100;
                          const y = 100 - (pt.timeMs / maxTime) * 100;
                          return `${x}%,${Math.max(5, Math.min(95, y))}%`;
                        })
                        .join(' ');

                      return (
                        <g key={algo.id}>
                          <polyline
                            fill="none"
                            stroke={algo.color}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={points}
                          />
                          {data.map((pt, i) => {
                            const cx = `${(i / (data.length - 1)) * 100}%`;
                            const cy = `${Math.max(5, Math.min(95, 100 - (pt.timeMs / maxTime) * 100))}%`;
                            return (
                              <circle
                                key={i}
                                cx={cx}
                                cy={cy}
                                r="5"
                                fill={algo.color}
                                stroke="#000"
                                strokeWidth="2"
                              />
                            );
                          })}
                        </g>
                      );
                    })}
                  </svg>

                  {/* X-Axis Labels */}
                  <div className="absolute bottom-1 inset-x-6 flex justify-between text-[10px] text-slate-500 font-mono">
                    {currentSuite.sizes.map((s) => (
                      <span key={s}>N={s}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-2 text-slate-400">
                  <BarChart3 className="w-10 h-10 text-amber-400/60 animate-bounce" />
                  <p className="text-xs">
                    Hit <strong>"Run Live Benchmark"</strong> to compute real execution curves!
                  </p>
                </div>
              )}

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-3 border-t border-slate-800 text-xs">
                {currentSuite.algorithms.map((algo) => (
                  <div key={algo.id} className="flex items-center gap-1.5 font-medium">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: algo.color }}></span>
                    <span className="text-white font-bold">{algo.name}</span>
                    <span className="text-slate-400 font-mono">({algo.timeComplexity})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Table */}
            {benchmarkResults && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 px-3">Algorithm</th>
                      <th className="py-2 px-3">Complexity</th>
                      {currentSuite.sizes.map((s) => (
                        <th key={s} className="py-2 px-3">
                          N={s}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentSuite.algorithms.map((algo) => (
                      <tr key={algo.id} className="border-b border-slate-800/60 hover:bg-slate-900/50">
                        <td className="py-2 px-3 font-bold text-white flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: algo.color }}></span>
                          {algo.name}
                        </td>
                        <td className="py-2 px-3 text-amber-400 font-bold">{algo.timeComplexity}</td>
                        {benchmarkResults[algo.id]?.map((pt, i) => (
                          <td key={i} className="py-2 px-3 text-slate-200">
                            {pt.timeMs} ms
                            <span className="block text-[9px] text-slate-500">{pt.ops} ops</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Professor Algorismus Big-O Masterclass (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#0e1424] border-2 border-black shadow-comic space-y-4">
            <div className="flex items-center gap-3">
              <ProfessorAvatar size="md" mood="wise" />
              <div>
                <h4 className="font-bangers text-xl text-white">PROFESSOR ALGORISMUS</h4>
                <p className="text-[11px] text-amber-400 font-mono">Department of Asymptotic Analysis</p>
              </div>
            </div>

            <ComicBubble
              speaker="professor"
              text={currentSuite.theory}
              subtext="Asymptotic Scaling Insight"
            />

            <div className="p-3.5 rounded-xl bg-[#070b16] border border-[#1b233c] text-xs text-slate-300 space-y-2">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-400" />
                Why Asymptotics Matter in Industry:
              </div>
              <p className="text-slate-300 leading-relaxed font-sans text-xs">
                When $N=100$, an $O(N^2)$ algorithm runs in fractions of a millisecond. But when $N=100,000$, $N^2$ requires{' '}
                <strong className="text-rose-400">10,000,000,000 operations</strong> (several seconds or browser freeze), while{' '}
                <strong className="text-emerald-400">$O(N \log N)$ takes only ~1,700,000 operations</strong> (10 milliseconds)!
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Complexity Reference Card:</div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-[#0a1510] border border-emerald-500/30 text-emerald-300">
                  <span className="font-black">O(1)</span> Constant
                </div>
                <div className="p-2 rounded bg-[#0a1520] border border-sky-500/30 text-sky-300">
                  <span className="font-black">O(log N)</span> Logarithmic
                </div>
                <div className="p-2 rounded bg-[#151c10] border border-lime-500/30 text-lime-300">
                  <span className="font-black">O(N)</span> Linear
                </div>
                <div className="p-2 rounded bg-[#1d152a] border border-purple-500/30 text-purple-300">
                  <span className="font-black">O(N log N)</span> Log-Linear
                </div>
                <div className="p-2 rounded bg-[#2a1515] border border-rose-500/30 text-rose-300">
                  <span className="font-black">O(N²)</span> Quadratic
                </div>
                <div className="p-2 rounded bg-[#2e0e0e] border border-red-600/40 text-red-400">
                  <span className="font-black">O(2ⁿ)</span> Exponential
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
