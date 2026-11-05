import React, { useState } from 'react';
import {
  Database,
  Search,
  Zap,
  TrendingDown,
  Layers,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  Table,
  Play,
  RotateCcw,
} from 'lucide-react';
import { ProfTupleAvatar, SamAvatar, ComicBubble } from '../characters/Characters';
import { sound } from '../../utils/soundEffects';

export const SqlExplainStudio: React.FC = () => {
  const [hasIndex, setHasIndex] = useState<boolean>(false);
  const [queryType, setQueryType] = useState<'filter' | 'join'>('filter');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const toggleIndex = () => {
    setHasIndex(!hasIndex);
    sound.playPop();
  };

  const runExplain = () => {
    setIsRunning(true);
    sound.playSwoosh();
    setTimeout(() => {
      setIsRunning(false);
      sound.playSuccess();
    }, 400);
  };

  return (
    <div className="p-6 rounded-3xl bg-[#0c101d] border-2 border-black shadow-comic space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#1b233a]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider border border-black shadow-comic-sm">
              <Database className="w-3.5 h-3.5 inline mr-1" /> EXPLAIN ANALYZE
            </span>
            <span className="text-xs text-amber-300 font-bold">PostgreSQL Engine Query Plan Visualizer</span>
          </div>
          <h3 className="font-bangers text-2xl text-white">
            QUERY EXECUTION PLAN &amp; B-TREE INDEX TUNER
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl">
            See how PostgreSQL's query optimizer plans and executes your queries. Compare $O(N)$ Sequential Table Scans against $O(\log N)$ B-Tree Index Scans live!
          </p>
        </div>

        {/* Index Toggle Switch */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#12182b] border border-[#1f2a4a]">
          <div className="text-right text-xs font-mono">
            <span className="text-slate-400 block text-[10px]">B-Tree Index:</span>
            <span className={hasIndex ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
              {hasIndex ? 'idx_emp_salary (ENABLED)' : 'NO INDEX (TABLE SCAN)'}
            </span>
          </div>

          <button
            onClick={toggleIndex}
            className={`px-4 py-2 rounded-xl font-bold text-xs border-2 transition cursor-pointer shadow-comic-sm ${
              hasIndex
                ? 'bg-emerald-400 text-slate-950 border-black'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
            }`}
          >
            {hasIndex ? 'Drop Index' : 'CREATE INDEX'}
          </button>
        </div>
      </div>

      {/* Query Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            setQueryType('filter');
            sound.playPop();
          }}
          className={`px-4 py-2 rounded-xl font-bold text-xs border-2 transition cursor-pointer ${
            queryType === 'filter'
              ? 'bg-amber-400 text-slate-950 border-black shadow-comic-sm'
              : 'bg-[#12182b] text-slate-300 border-slate-700'
          }`}
        >
          1. Range Filter: WHERE salary &gt; 90,000
        </button>
        <button
          onClick={() => {
            setQueryType('join');
            sound.playPop();
          }}
          className={`px-4 py-2 rounded-xl font-bold text-xs border-2 transition cursor-pointer ${
            queryType === 'join'
              ? 'bg-amber-400 text-slate-950 border-black shadow-comic-sm'
              : 'bg-[#12182b] text-slate-300 border-slate-700'
          }`}
        >
          2. Hash Join: employees ⨝ departments
        </button>
      </div>

      {/* SQL Query Box */}
      <div className="p-4 rounded-2xl bg-[#070912] border border-[#1a233c] font-mono text-xs text-amber-300 flex items-center justify-between">
        <code>
          {queryType === 'filter'
            ? 'EXPLAIN ANALYZE SELECT * FROM employees WHERE salary > 90000;'
            : 'EXPLAIN ANALYZE SELECT e.name, d.name FROM employees e JOIN departments d ON e.dept_id = d.id;'}
        </code>
        <button
          onClick={runExplain}
          className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs border border-black shadow-comic-sm cursor-pointer flex items-center gap-1"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Execute Plan</span>
        </button>
      </div>

      {/* Execution Plan Nodes Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Execution Tree (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            PostgreSQL Physical Operator Tree:
          </div>

          {queryType === 'filter' ? (
            hasIndex ? (
              /* Index Scan Nodes */
              <div className="space-y-3 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-[#091a10] border-2 border-emerald-500 shadow-comic space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-emerald-400">Bitmap Heap Scan on employees</span>
                    <span className="text-slate-400">Cost: 4.12..15.30 • Rows: 24</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans">
                    Fetches physical disk blocks containing matching tuples identified by the bitmap index.
                  </p>
                </div>

                <div className="ml-6 pl-4 border-l-2 border-emerald-500/50 space-y-2">
                  <div className="p-4 rounded-2xl bg-[#091a10] border-2 border-emerald-400 shadow-comic-sm space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-emerald-300">➔ Bitmap Index Scan on idx_emp_salary</span>
                      <span className="text-emerald-400 font-black">0.24 ms</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans">
                      Traverses the balanced B-Tree root-to-leaf in O(log N). Scanned exactly 24 leaf entries!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Seq Scan Nodes */
              <div className="space-y-3 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-[#260e12] border-2 border-rose-500 shadow-comic space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-rose-400">Seq Scan on employees (Table Scan)</span>
                    <span className="text-rose-300 font-black">Cost: 0.00..45.00 • Rows: 1,000</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans">
                    No index found! PostgreSQL must perform a full linear table scan, reading every single disk page from start to finish.
                  </p>
                </div>
              </div>
            )
          ) : (
            /* Hash Join Nodes */
            <div className="space-y-3 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-[#141b34] border-2 border-sky-500 shadow-comic space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-sky-300">Hash Join (e.dept_id = d.id)</span>
                  <span className="text-slate-400">Cost: 1.15..32.40 • Rows: 1,000</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  Probes the hash table using streaming employee tuples in O(1) average lookup per row.
                </p>
              </div>

              <div className="ml-6 pl-4 border-l-2 border-sky-500/50 space-y-2">
                <div className="p-3.5 rounded-xl bg-[#0f1426] border border-sky-500/30 text-xs font-mono">
                  <span className="text-sky-400 font-bold">➔ Hash (Build Phase)</span>
                  <p className="text-[11px] text-slate-300 font-sans mt-0.5">
                    Builds in-memory hash table of smaller table (departments: 6 rows) in 0.02 ms.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Metrics Comparison Banner */}
          <div className="p-4 rounded-2xl bg-[#090d18] border border-[#1b233a] flex items-center justify-between font-mono text-xs">
            <div>
              <span className="text-slate-400 text-[10px] block">Execution Time:</span>
              <span className={`text-base font-black ${hasIndex ? 'text-emerald-400' : 'text-rose-400'}`}>
                {hasIndex ? '0.38 ms (Instant)' : '35.40 ms (Slow)'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Disk Blocks Read:</span>
              <span className="text-white font-bold">{hasIndex ? '4 Blocks' : '384 Blocks'}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Speedup Multiplier:</span>
              <span className="text-amber-400 font-black text-base">{hasIndex ? '93x Faster' : '1x Baseline'}</span>
            </div>
          </div>
        </div>

        {/* Right: Prof. Tuple Analysis (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-5 rounded-2xl bg-[#0f1424] border-2 border-black shadow-comic space-y-3">
            <div className="flex items-center gap-3">
              <ProfTupleAvatar size="md" mood="teaching" />
              <div>
                <h4 className="font-bangers text-lg text-white">PROFESSOR TUPLE</h4>
                <p className="text-[10px] text-amber-400 font-mono">Relational Optimizer Insights</p>
              </div>
            </div>

            <ComicBubble
              speaker="tuple"
              text={
                hasIndex
                  ? 'Eureka! By creating a B-Tree index on salary, we bypassed 99% of table pages. The engine jumped directly to the matching leaf nodes in logarithmic O(log N) time!'
                  : 'Notice that without an index, the planner has no choice but to examine every single row sequentially (O(N) cost). On 10 million rows, this query would choke the server!'
              }
              subtext="Optimizer Insight"
            />

            <div className="p-3 rounded-xl bg-[#090d18] border border-slate-800 text-xs text-slate-300 space-y-1.5 font-sans">
              <div className="font-bold text-amber-300 font-mono text-[11px]">When NOT to Index:</div>
              <p className="text-[11px] leading-relaxed">
                Indexes aren't free! Every <code>INSERT</code>, <code>UPDATE</code>, and <code>DELETE</code> must also update the B-Tree structure. Only index columns frequently used in <code>WHERE</code>, <code>JOIN</code>, or <code>ORDER BY</code> clauses!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
