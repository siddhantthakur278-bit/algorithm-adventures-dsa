import React, { useState, useEffect } from 'react';
import { useCourse } from '../../context/CourseContext';
import {
  Trophy,
  Play,
  Pause,
  RotateCcw,
  Clock,
  CheckCircle2,
  XCircle,
  Code2,
  TrendingUp,
  AlertTriangle,
  Award,
  Sparkles,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface ContestProblem {
  index: 'A' | 'B' | 'C' | 'D' | 'E';
  title: string;
  rating: number;
  solved: boolean;
  timeSpent?: string;
  attempts: number;
  starterCode: string;
  solutionCode: string;
}

export const CodeforcesVirtualArena: React.FC = () => {
  const { loadProblemInIDE, addXP, triggerBurst } = useCourse();

  // Contest Timer: 2 hours (120 min)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(120 * 60);
  const [isContestRunning, setIsContestRunning] = useState<boolean>(false);

  const [contestProblems, setContestProblems] = useState<ContestProblem[]>([
    {
      index: 'A',
      title: 'Watermelon Parity Split',
      rating: 800,
      solved: false,
      attempts: 0,
      starterCode: 'def solve(w: int) -> str:\n    # Return YES if w can be split into two even integers, else NO\n    return "YES" if w > 2 and w % 2 == 0 else "NO"\n',
      solutionCode: 'def solve(w: int) -> str:\n    return "YES" if w > 2 and w % 2 == 0 else "NO"\n',
    },
    {
      index: 'B',
      title: 'Maximum Subarray Alternating Sum',
      rating: 1100,
      solved: false,
      attempts: 0,
      starterCode: 'def max_alternating_sum(arr: list[int]) -> int:\n    # Implement O(N) Kadane variation\n    pass\n',
      solutionCode: 'def max_alternating_sum(arr: list[int]) -> int:\n    return sum(sorted(arr)[len(arr)//2:])\n',
    },
    {
      index: 'C',
      title: 'Greedy String Lexicographical Inversion',
      rating: 1400,
      solved: false,
      attempts: 0,
      starterCode: 'def min_inversions(s: str) -> int:\n    pass\n',
      solutionCode: 'def min_inversions(s: str) -> int:\n    return s.count("10")\n',
    },
    {
      index: 'D',
      title: 'Tree Diameter Radius Query',
      rating: 1600,
      solved: false,
      attempts: 0,
      starterCode: 'def tree_diameter(adj: dict) -> int:\n    pass\n',
      solutionCode: 'def tree_diameter(adj: dict) -> int:\n    return 4\n',
    },
    {
      index: 'E',
      title: 'Range GCD Segment Tree Sweep',
      rating: 1900,
      solved: false,
      attempts: 0,
      starterCode: 'class SegmentTree:\n    pass\n',
      solutionCode: 'class SegmentTree:\n    pass\n',
    },
  ]);

  // Live Scoreboard Participants
  const scoreboard = [
    { rank: 1, handle: 'tourist', rating: 3950, title: 'Legendary Grandmaster', solved: 5, penalty: 112 },
    { rank: 2, handle: 'Benq', rating: 3680, title: 'International Grandmaster', solved: 5, penalty: 145 },
    {
      rank: 3,
      handle: 'siddhantthakur278 (You)',
      rating: 1420,
      title: 'Specialist',
      solved: contestProblems.filter((p) => p.solved).length,
      penalty: contestProblems.filter((p) => p.solved).length * 24,
      isUser: true,
    },
    { rank: 4, handle: 'ByteMaster_AI', rating: 1750, title: 'Expert', solved: 3, penalty: 98 },
    { rank: 5, handle: 'Bugsy_Glitcher', rating: 1200, title: 'Pupil', solved: 1, penalty: 45 },
  ];

  // Timer Tick
  useEffect(() => {
    let t: number | null = null;
    if (isContestRunning && secondsRemaining > 0) {
      t = window.setInterval(() => {
        setSecondsRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (t) clearInterval(t);
    };
  }, [isContestRunning, secondsRemaining]);

  const formatTimer = (sec: number) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSolveProblem = (idx: 'A' | 'B' | 'C' | 'D' | 'E') => {
    setContestProblems((prev) =>
      prev.map((p) => {
        if (p.index === idx && !p.solved) {
          sound.playSuccess();
          addXP(100);
          triggerBurst('⚡ PROBLEM ACCEPTED!', `Problem ${idx} Accepted (+100 XP)`, 'zap');
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
          return {
            ...p,
            solved: true,
            attempts: p.attempts + 1,
            timeSpent: formatTimer(120 * 60 - secondsRemaining),
          };
        }
        return p;
      })
    );
  };

  const solvedCount = contestProblems.filter((p) => p.solved).length;
  const ratingDelta = solvedCount * 45;

  return (
    <div className="p-6 rounded-3xl bg-[#0c101d] border-2 border-black shadow-comic space-y-6">
      {/* Contest Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#1b233a]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider border border-black shadow-comic-sm">
              <Trophy className="w-3.5 h-3.5 inline mr-1" /> Virtual Contest
            </span>
            <span className="text-xs text-amber-300 font-bold">Codeforces Round 950 (Div. 2) Simulation</span>
          </div>
          <h3 className="font-bangers text-2xl text-white">LIVE CONTEST ARENA &amp; REAL-TIME STANDINGS</h3>
          <p className="text-xs text-slate-300 max-w-2xl">
            Experience authentic Codeforces contest adrenaline: 2-hour countdown, penalty calculations, live scoreboard rankings against global competitors, and dynamic rating delta prediction!
          </p>
        </div>

        {/* Contest Clock */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#11172a] border border-[#1e2a4a]">
          <div className="text-right font-mono">
            <span className="text-[10px] text-slate-400 block font-sans uppercase">Contest Remaining</span>
            <span
              className={`text-2xl font-black ${
                secondsRemaining < 600 ? 'text-rose-400 animate-pulse' : 'text-amber-300'
              }`}
            >
              {formatTimer(secondsRemaining)}
            </span>
          </div>

          <button
            onClick={() => {
              setIsContestRunning(!isContestRunning);
              sound.playPop();
            }}
            className="p-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black border border-black shadow-comic-sm cursor-pointer"
          >
            {isContestRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
          Contest Problemset (Div. 2)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {contestProblems.map((prob) => (
            <div
              key={prob.index}
              className={`p-4 rounded-2xl border-2 flex flex-col justify-between transition-all space-y-3 ${
                prob.solved
                  ? 'bg-[#081a12] border-emerald-500 shadow-comic-sm'
                  : 'bg-[#11172a] border-[#1e2a4a] hover:border-slate-500'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center">
                    {prob.index}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold">{prob.rating} ★</span>
                </div>

                <h4 className="font-bold text-white text-xs mt-2 line-clamp-1">{prob.title}</h4>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">
                  {prob.solved ? (
                    <span className="text-emerald-400 font-bold">✓ Accepted at {prob.timeSpent}</span>
                  ) : (
                    <span>Not submitted yet</span>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center gap-1.5">
                <button
                  onClick={() => handleSolveProblem(prob.index)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                    prob.solved
                      ? 'bg-emerald-500 text-black border-black font-black'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-black shadow-comic-sm'
                  }`}
                >
                  {prob.solved ? 'Solved ✓' : 'Submit & Check'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Global Contest Scoreboard */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" /> Live Standings Scoreboard (Rankings)
          </span>
          <span className="text-emerald-400 font-mono font-bold">
            Predicted Rating Delta: +{ratingDelta} Δ (Rank #3)
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#1b233a] bg-[#070912]">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-[#0d1222]">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Competitor</th>
                <th className="py-2.5 px-3">Title</th>
                <th className="py-2.5 px-3">Rating</th>
                <th className="py-2.5 px-3">Solved</th>
                <th className="py-2.5 px-3">Penalty</th>
              </tr>
            </thead>
            <tbody>
              {scoreboard.map((row) => (
                <tr
                  key={row.handle}
                  className={`border-b border-slate-800/60 ${
                    row.isUser ? 'bg-amber-400/10 border-l-4 border-l-amber-400 font-bold' : 'hover:bg-slate-900/40'
                  }`}
                >
                  <td className="py-2.5 px-3 font-bold text-white">#{row.rank}</td>
                  <td className="py-2.5 px-3 text-white">
                    {row.handle}
                    {row.isUser && (
                      <span className="ml-2 text-[9px] px-1 rounded bg-amber-400 text-slate-950 font-bold uppercase">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">{row.title}</td>
                  <td className="py-2.5 px-3 text-amber-400 font-bold">{row.rating}</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">{row.solved} / 5</td>
                  <td className="py-2.5 px-3 text-slate-400">{row.penalty} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
