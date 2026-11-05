import React, { useState, useEffect } from 'react';
import { useCourse } from '../../context/CourseContext';
import { fetchLiveCodeforcesProblems, fallbackCodeforcesProblems } from '../../data/codeforcesData';
import { Problem } from '../../types';
import { Globe, RefreshCw, ExternalLink, Code2, Sparkles, Filter, Lock, Check, Trophy } from 'lucide-react';
import { sound } from '../../utils/soundEffects';
import { CodeforcesVirtualArena } from './CodeforcesVirtualArena';

export const CodeforcesHub: React.FC = () => {
  const { loadProblemInIDE, stats } = useCourse();
  const [subView, setSubView] = useState<'radar' | 'virtual'>('radar');
  const [problems, setProblems] = useState<Problem[]>(fallbackCodeforcesProblems);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTag, setActiveTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadProblems = async () => {
    setIsLoading(true);
    sound.playPop();
    try {
      const data = await fetchLiveCodeforcesProblems();
      setProblems(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProblems();
  }, []);

  const tags = ['all', 'greedy', 'math', 'strings', 'dp', 'brute force', 'arrays'];

  const filteredProblems = problems.filter(p => {
    const matchesTag = activeTag === 'all' || p.tags.some(t => t.toLowerCase().includes(activeTag));
    const matchesQuery =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.codeforcesId && p.codeforcesId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Banner */}
      <div className="bg-[#121628] border-3 border-black rounded-3xl p-6 sm:p-8 shadow-comic-lg bg-halftone">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38B6FF] text-black font-bangers text-xs border border-black shadow-comic-sm">
              <Globe className="w-3.5 h-3.5" />
              AUTO-INTEGRATED COMPETITIVE ARENA
            </span>
            <h1 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
              CODEFORCES PROBLEM RADAR
            </h1>
            <p className="text-sm text-gray-300 max-w-xl">
              Codeforces problems automatically pulled into Algorithm Adventures! Practice legendary
              competitive programming problems directly inside our VS Code Python IDE.
            </p>
          </div>

          <button
            onClick={loadProblems}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFDE59] text-black font-bangers text-xs border-2 border-black shadow-comic-sm transition active:translate-y-0.5 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Fetching Codeforces...' : 'Refresh Live Problems'}
          </button>
        </div>
      </div>

      {/* Sub-View Switcher: Live Radar vs 2-Hour Virtual Contest */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            setSubView('radar');
            sound.playPop();
          }}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs border-2 transition cursor-pointer flex items-center gap-2 ${
            subView === 'radar'
              ? 'bg-amber-400 text-slate-950 border-black shadow-comic-sm font-black'
              : 'bg-[#12182b] text-slate-300 border-slate-700 hover:text-white'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Live Problem Radar ({filteredProblems.length})</span>
        </button>
        <button
          onClick={() => {
            setSubView('virtual');
            sound.playPop();
          }}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs border-2 transition cursor-pointer flex items-center gap-2 ${
            subView === 'virtual'
              ? 'bg-amber-400 text-slate-950 border-black shadow-comic-sm font-black'
              : 'bg-[#12182b] text-slate-300 border-slate-700 hover:text-white'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>2-Hour Virtual Contest Simulation</span>
        </button>
      </div>

      {subView === 'virtual' ? (
        <CodeforcesVirtualArena />
      ) : (
        <>
          {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#141829] p-4 rounded-2xl border-2 border-black shadow-comic-sm">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Filter className="w-4 h-4 text-gray-400 mr-1" />
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => {
                setActiveTag(tag);
                sound.playPop();
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition ${
                activeTag === tag
                  ? 'bg-[#38B6FF] text-black shadow-comic-sm'
                  : 'bg-[#1e2337] text-gray-300 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search Codeforces ID or title..."
          className="bg-[#0f121e] border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#38B6FF] w-full sm:w-64"
        />
      </div>

      {/* Problem Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProblems.map((p, idx) => {
          const isSolved = stats.solvedProblemIds.includes(p.id);
          const isUnlocked = idx === 0 || stats.solvedProblemIds.includes(filteredProblems[idx - 1].id);

          return (
            <div
              key={p.id}
              className={`rounded-2xl border-2 p-5 shadow-comic-sm flex flex-col justify-between space-y-4 transition group ${
                !isUnlocked
                  ? 'bg-[#0d101d] border-gray-800 opacity-65'
                  : isSolved
                  ? 'bg-[#10192a] border-emerald-500/50'
                  : 'bg-[#121626] border-black hover:border-[#38B6FF]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#FFDE59]">
                    CF #{p.codeforcesId || 'Special'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isSolved && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/60 flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> Solved
                      </span>
                    )}
                    {!isUnlocked && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-500 border border-slate-800 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Solve #{filteredProblems[idx - 1].codeforcesId || idx}
                      </span>
                    )}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1e2337] text-gray-300 border border-gray-700">
                      {p.difficulty}
                    </span>
                  </div>
                </div>

                <h3 className={`font-bold text-base transition ${!isUnlocked ? 'text-gray-400' : 'text-white group-hover:text-[#38B6FF]'}`}>
                  {p.title}
                </h3>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {p.tags.slice(0, 3).map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#191f33] text-gray-300"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                {p.codeforcesId && (
                  <a
                    href={`https://codeforces.com/problemset/problem/${p.codeforcesId.slice(0, -1)}/${p.codeforcesId.slice(-1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1"
                  >
                    Codeforces Link <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {isUnlocked ? (
                  <button
                    onClick={() => loadProblemInIDE(p)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bangers text-xs bg-[#38B6FF] text-black hover:bg-[#52c2ff] border border-black shadow-comic-sm transition active:translate-y-0.5 ml-auto cursor-pointer"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    Solve in IDE
                  </button>
                ) : (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-lg font-mono text-[11px] text-slate-500 bg-slate-900 border border-slate-800 ml-auto">
                    <Lock className="w-3 h-3 text-slate-600" /> Locked in Sequence
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
        </>
      )}
    </div>
  );
};
