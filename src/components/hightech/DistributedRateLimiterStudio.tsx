import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  Zap,
  RotateCcw,
  Play,
  Pause,
  Server,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Database,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

type RateLimiterAlgo = 'token_bucket' | 'leaky_bucket' | 'sliding_window';

export const DistributedRateLimiterStudio: React.FC = () => {
  const [algo, setAlgo] = useState<RateLimiterAlgo>('token_bucket');
  const [capacity, setCapacity] = useState<number>(20); // Bucket max capacity
  const [refillRate, setRefillRate] = useState<number>(5); // Tokens/sec
  const [tokens, setTokens] = useState<number>(20);
  const [incomingReqRate, setIncomingReqRate] = useState<number>(4); // Req/sec
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Telemetry metrics
  const [totalRequests, setTotalRequests] = useState<number>(0);
  const [passedRequests, setPassedRequests] = useState<number>(0);
  const [blockedRequests, setBlockedRequests] = useState<number>(0);
  const [history, setHistory] = useState<{ time: number; passed: number; blocked: number }[]>([]);

  // Telemetry history recording
  useEffect(() => {
    if (!isRunning) return;

    // Timer loop for token refill and incoming requests
    const interval = setInterval(() => {
      // 1. Refill tokens
      setTokens((prev) => Math.min(capacity, prev + refillRate * 0.2));

      // 2. Process incoming requests proportional to 200ms tick
      const reqThisTick = incomingReqRate * 0.2;
      const wholeReqs = Math.random() < reqThisTick ? 1 : 0;

      if (wholeReqs > 0) {
        setTotalRequests((t) => t + 1);
        setTokens((currTokens) => {
          if (currTokens >= 1) {
            setPassedRequests((p) => p + 1);
            return currTokens - 1;
          } else {
            setBlockedRequests((b) => b + 1);
            sound.playThud();
            return currTokens;
          }
        });
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isRunning, capacity, refillRate, incomingReqRate]);

  // History tracking ticker (every 1s)
  useEffect(() => {
    if (!isRunning) return;
    const historyInterval = setInterval(() => {
      setHistory((prev) => {
        const next = [
          ...prev.slice(-15),
          { time: Date.now(), passed: passedRequests, blocked: blockedRequests },
        ];
        return next;
      });
    }, 1000);
    return () => clearInterval(historyInterval);
  }, [isRunning, passedRequests, blockedRequests]);

  const handleBurst = (count: number) => {
    sound.playSwoosh();
    setTotalRequests((t) => t + count);

    let allowed = 0;
    let dropped = 0;

    setTokens((currTokens) => {
      if (currTokens >= count) {
        allowed = count;
        setPassedRequests((p) => p + allowed);
        return currTokens - count;
      } else {
        allowed = Math.floor(currTokens);
        dropped = count - allowed;
        setPassedRequests((p) => p + allowed);
        setBlockedRequests((b) => b + dropped);
        sound.playThud();
        return 0;
      }
    });
  };

  const handleReset = () => {
    sound.playPop();
    setTokens(capacity);
    setTotalRequests(0);
    setPassedRequests(0);
    setBlockedRequests(0);
    setHistory([]);
  };

  const dropRatePct =
    totalRequests > 0 ? Math.round((blockedRequests / totalRequests) * 100) : 0;

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#090d18] border-2 border-black shadow-comic flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-black text-[10px] uppercase tracking-wider border border-black shadow-comic-sm">
              Distributed Systems Lab
            </span>
            <span className="text-xs text-slate-400">High-Concurrency API Gateway &amp; Redis Rate Limiter</span>
          </div>
          <h2 className="font-bangers text-2xl sm:text-3xl text-white tracking-wide mt-1">
            DISTRIBUTED RATE LIMITER SIMULATOR
          </h2>
        </div>

        {/* Algorithm Switcher */}
        <div className="flex gap-1.5 p-1 bg-[#05070e] rounded-2xl border border-slate-800">
          {[
            { id: 'token_bucket', label: '🪣 Token Bucket (Stripe)' },
            { id: 'leaky_bucket', label: '💧 Leaky Bucket (Nginx)' },
            { id: 'sliding_window', label: '⏱️ Sliding Window (Cloudflare)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setAlgo(tab.id as any);
                sound.playPop();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                algo === tab.id
                  ? 'bg-cyan-400 text-slate-950 font-black shadow-comic-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Visual Simulation & Live Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 Cols): Visual Bucket Simulation */}
        <div className="lg:col-span-7 p-5 rounded-3xl bg-[#090d18] border-2 border-black shadow-comic space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Memory Bucket State: {Math.floor(tokens)} / {capacity} Tokens
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`p-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                  isRunning
                    ? 'bg-amber-400 text-slate-950 border-black'
                    : 'bg-emerald-400 text-slate-950 border-black'
                }`}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 rounded-xl bg-[#141b2e] border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Reset counters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Visual Bucket Chamber */}
          <div className="p-6 rounded-2xl bg-[#04060c] border-2 border-cyan-500/30 flex flex-col items-center justify-center relative min-h-[220px]">
            {/* Inflow Faucet */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[11px] font-mono text-cyan-300">
              <span className="animate-bounce">▼</span> Inflow Refill: +{refillRate} tokens/sec
            </div>

            {/* Token Grid */}
            <div className="w-full max-w-sm border-2 border-slate-750 bg-[#070b16] rounded-2xl p-4 flex flex-wrap gap-2 justify-center min-h-[120px] items-end mt-6">
              {Array.from({ length: capacity }).map((_, i) => {
                const isFilled = i < Math.floor(tokens);
                return (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all duration-200 border ${
                      isFilled
                        ? 'bg-cyan-400 text-slate-950 border-cyan-200 shadow-[0_0_8px_rgba(6,182,212,0.5)] scale-100'
                        : 'bg-slate-900/60 border-slate-800 text-slate-700 scale-90'
                    }`}
                  >
                    {isFilled ? '🪙' : '·'}
                  </div>
                );
              })}
            </div>

            {/* Outflow Drain */}
            <div className="mt-3 text-[11px] font-mono text-slate-400">
              Drain: 1 token consumed per incoming HTTP Request
            </div>
          </div>

          {/* Burst Fire Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#0c1222] border border-slate-800">
            <div>
              <span className="text-xs font-bold text-white font-mono block">
                Simulate Traffic Spike (Burst Attack / Viral Surge):
              </span>
              <span className="text-[10px] text-slate-400">
                Immediately floods the gateway with concurrent requests
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBurst(5)}
                className="px-3 py-1.5 rounded-xl bg-[#172038] hover:bg-[#202c4c] text-white font-mono text-xs font-bold border border-slate-700 cursor-pointer"
              >
                +5 Req
              </button>
              <button
                onClick={() => handleBurst(15)}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs border border-black shadow-comic-sm cursor-pointer"
              >
                💥 +15 Burst!
              </button>
              <button
                onClick={() => handleBurst(30)}
                className="px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs border border-black shadow-comic-sm cursor-pointer"
              >
                ⚡ +30 DDoS
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Telemetry & Production Redis Lua Dossier */}
        <div className="lg:col-span-5 space-y-4">
          {/* Live Telemetry Scorecard */}
          <div className="p-5 rounded-3xl bg-[#090d18] border-2 border-black shadow-comic space-y-4">
            <h3 className="font-bangers text-lg text-white tracking-wide flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> LIVE CONCURRENCY TELEMETRY
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-[#04060c] border border-emerald-500/30">
                <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase">
                  HTTP 200 OK (Passed)
                </span>
                <span className="text-2xl font-black text-emerald-300 font-mono">
                  {passedRequests}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#04060c] border border-rose-500/30">
                <span className="text-[10px] font-mono text-rose-400 font-bold block uppercase">
                  HTTP 429 Dropped
                </span>
                <span className="text-2xl font-black text-rose-300 font-mono">
                  {blockedRequests}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#0c1222] border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Rejection Drop Rate:</span>
              <span
                className={`font-black ${
                  dropRatePct > 30 ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {dropRatePct}%
              </span>
            </div>

            {/* Adjustable Sliders */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                  <span>Inflow Refill Rate:</span>
                  <span className="font-bold text-cyan-300">{refillRate} tokens/sec</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={refillRate}
                  onChange={(e) => setRefillRate(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-[#171e33] rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                  <span>Client Request Load:</span>
                  <span className="font-bold text-amber-300">{incomingReqRate} req/sec</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={incomingReqRate}
                  onChange={(e) => setIncomingReqRate(Number(e.target.value))}
                  className="w-full accent-amber-400 h-1.5 bg-[#171e33] rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Redis Lua Script Dossier */}
          <div className="p-4 rounded-3xl bg-[#090d18] border-2 border-black shadow-comic space-y-2">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-bold text-white uppercase font-mono">
                Production Redis Atomic Lua
              </span>
            </div>
            <pre className="p-3 rounded-xl bg-[#04060c] border border-slate-850 font-mono text-[10px] text-slate-300 overflow-x-auto leading-relaxed">
              <code>{`-- Atomic Token Bucket EVALSHA
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local current = tonumber(redis.call('get', key) or "0")
if current + 1 > limit then
  return 0 -- Reject 429
else
  redis.call('incrby', key, 1)
  if current == 0 then
    redis.call('expire', key, 1)
  end
  return 1 -- Allow 200
end`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
