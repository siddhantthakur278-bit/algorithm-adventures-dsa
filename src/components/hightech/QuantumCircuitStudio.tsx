import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  RotateCcw,
  Activity,
  Layers,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

type QuantumGate = 'H' | 'X' | 'Z' | 'CNOT' | 'M';

interface QubitState {
  alpha: number; // Amplitude of |0>
  beta: number;  // Amplitude of |1>
  measured: 0 | 1 | null;
  history: QuantumGate[];
}

export const QuantumCircuitStudio: React.FC = () => {
  const [qubits, setQubits] = useState<QubitState[]>([
    { alpha: 1, beta: 0, measured: null, history: [] },
    { alpha: 1, beta: 0, measured: null, history: [] },
  ]);

  const [activeTab, setActiveTab] = useState<'circuit' | 'grover' | 'bloch'>('circuit');
  const [groverN, setGroverN] = useState<number>(1048576); // 1 Million elements

  // Apply Quantum Gate to target qubit index
  const applyGate = (targetQubit: number, gate: QuantumGate) => {
    sound.playPop();

    setQubits((prev) =>
      prev.map((q, idx) => {
        if (idx !== targetQubit) return q;

        let newAlpha = q.alpha;
        let newBeta = q.beta;
        let measured = q.measured;

        if (gate === 'H') {
          // Hadamard Gate: H|0> = (|0> + |1>)/sqrt(2)
          const invSqrt2 = 1 / Math.SQRT2;
          newAlpha = (q.alpha + q.beta) * invSqrt2;
          newBeta = (q.alpha - q.beta) * invSqrt2;
          measured = null;
        } else if (gate === 'X') {
          // Pauli-X (Quantum NOT)
          newAlpha = q.beta;
          newBeta = q.alpha;
        } else if (gate === 'Z') {
          // Pauli-Z (Phase Flip)
          newBeta = -q.beta;
        } else if (gate === 'M') {
          // Measurement: Collapses according to Born Rule
          const prob0 = Math.pow(q.alpha, 2);
          const outcome = Math.random() < prob0 ? 0 : 1;
          measured = outcome;
          newAlpha = outcome === 0 ? 1 : 0;
          newBeta = outcome === 1 ? 1 : 0;
          sound.playCelebration();
        }

        return {
          alpha: Number(newAlpha.toFixed(4)),
          beta: Number(newBeta.toFixed(4)),
          measured,
          history: [...q.history, gate],
        };
      })
    );
  };

  const resetCircuit = () => {
    sound.playSwoosh();
    setQubits([
      { alpha: 1, beta: 0, measured: null, history: [] },
      { alpha: 1, beta: 0, measured: null, history: [] },
    ]);
  };

  // Grover calculations
  const classicalSteps = Math.round(groverN / 2);
  const quantumGroverSteps = Math.round((Math.PI / 4) * Math.sqrt(groverN));
  const speedupFactor = Math.round(classicalSteps / Math.max(1, quantumGroverSteps));

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* Header & Sub-Tab Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#090d18] border-2 border-black shadow-comic flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold border border-purple-500/40 uppercase">
              Quantum Complexity Lab
            </span>
            <span className="text-xs text-slate-400">Hilbert Space State Visualizer</span>
          </div>
          <h2 className="font-bangers text-2xl sm:text-3xl text-white tracking-wide mt-1">
            QUANTUM CIRCUIT &amp; QUBIT SUPERPOSITION
          </h2>
        </div>

        <div className="flex gap-1.5 p-1 bg-[#05070e] rounded-2xl border border-slate-800">
          {[
            { id: 'circuit', label: '⚡ Quantum Gates' },
            { id: 'grover', label: '🔍 Grover Speedup' },
            { id: 'bloch', label: '🌐 Bloch Sphere' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                sound.playPop();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-purple-500 text-white shadow-comic-sm font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: QUANTUM CIRCUIT & GATES */}
      {activeTab === 'circuit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Circuit Canvas (8 Cols) */}
          <div className="lg:col-span-8 p-5 rounded-3xl bg-[#090d18] border-2 border-black shadow-comic space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Quantum Wire Registry (2 Qubits)
                </span>
              </div>
              <button
                onClick={resetCircuit}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white font-mono cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Circuit
              </button>
            </div>

            {/* Qubit Wires */}
            <div className="space-y-4">
              {qubits.map((q, qIdx) => {
                const prob0 = Math.min(100, Math.max(0, Math.round(Math.pow(q.alpha, 2) * 100)));
                const prob1 = Math.min(100, Math.max(0, 100 - prob0));

                return (
                  <div
                    key={qIdx}
                    className="p-4 rounded-2xl bg-[#04060c] border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-purple-950/60 text-purple-300 font-mono font-bold flex items-center justify-center border border-purple-500/40 text-xs">
                          |q_{qIdx}⟩
                        </span>
                        <div className="font-mono text-xs">
                          <span className="text-white font-bold">
                            |ψ⟩ = {q.alpha}|0⟩ + {q.beta}|1⟩
                          </span>
                          <span className="block text-[10px] text-slate-400">
                            P(|0⟩): {prob0}% • P(|1⟩): {prob1}%
                          </span>
                        </div>
                      </div>

                      {q.measured !== null && (
                        <span className="px-2.5 py-1 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs border border-black shadow-comic-sm">
                          Collapsed ➔ |{q.measured}⟩
                        </span>
                      )}
                    </div>

                    {/* Gate Pipeline Wire */}
                    <div className="flex items-center gap-2 overflow-x-auto py-2">
                      <span className="text-xs font-mono text-slate-500">|0⟩ ───</span>

                      {q.history.map((hGate, hIdx) => (
                        <div
                          key={hIdx}
                          className="w-8 h-8 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center border border-black shadow-comic-sm shrink-0"
                        >
                          {hGate}
                        </div>
                      ))}

                      <div className="h-0.5 flex-1 bg-purple-500/40 min-w-[30px]" />

                      {/* Gate Insertion Controls */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => applyGate(qIdx, 'H')}
                          className="px-2.5 py-1 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs border border-black shadow-comic-sm cursor-pointer"
                          title="Hadamard: Create Superposition"
                        >
                          +H
                        </button>
                        <button
                          onClick={() => applyGate(qIdx, 'X')}
                          className="px-2.5 py-1 rounded-lg bg-rose-400 hover:bg-rose-300 text-slate-950 font-black text-xs border border-black shadow-comic-sm cursor-pointer"
                          title="Pauli-X: Bit Flip (NOT)"
                        >
                          +X
                        </button>
                        <button
                          onClick={() => applyGate(qIdx, 'Z')}
                          className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs border border-black shadow-comic-sm cursor-pointer"
                          title="Pauli-Z: Phase Flip"
                        >
                          +Z
                        </button>
                        <button
                          onClick={() => applyGate(qIdx, 'M')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs border border-black shadow-comic-sm cursor-pointer"
                          title="Measure: Wave Function Collapse"
                        >
                          +M
                        </button>
                      </div>
                    </div>

                    {/* Probability Gauge Bar */}
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden flex">
                      <div
                        className="bg-purple-500 transition-all duration-300"
                        style={{ width: `${prob0}%` }}
                        title={`|0>: ${prob0}%`}
                      />
                      <div
                        className="bg-cyan-400 transition-all duration-300"
                        style={{ width: `${prob1}%` }}
                        title={`|1>: ${prob1}%`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Info Dossier (4 Cols) */}
          <div className="lg:col-span-4 p-5 rounded-3xl bg-[#090d18] border-2 border-black shadow-comic space-y-4">
            <h3 className="font-bangers text-lg text-white tracking-wide flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> QUANTUM INVARIANTS
            </h3>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
              <div className="p-3 rounded-xl bg-[#0e1424] border border-slate-800">
                <span className="font-bold text-cyan-300 block font-mono">1. Superposition:</span>
                A classical bit is strictly $0$ or $1$. A qubit lives in a complex superposition $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ until measured!
              </div>

              <div className="p-3 rounded-xl bg-[#0e1424] border border-slate-800">
                <span className="font-bold text-amber-300 block font-mono">2. Born Rule ($|\alpha|^2 + |\beta|^2 = 1$):</span>
                The probability of collapsing to state $|0\rangle$ is $|\alpha|^2$ and to $|1\rangle$ is $|\beta|^2$. The sum must strictly equal $1.00$.
              </div>

              <div className="p-3 rounded-xl bg-[#0e1424] border border-slate-800">
                <span className="font-bold text-purple-300 block font-mono">3. Entanglement (EPR Pair):</span>
                Combining $H$ on $q_0$ followed by a $CNOT(q_0, q_1)$ creates the entangled Bell state:
                <code className="block mt-1 font-mono text-[11px] text-purple-200">
                  (|00⟩ + |11⟩) / √2
                </code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: GROVER'S ALGORITHM SPEEDUP */}
      {activeTab === 'grover' && (
        <div className="p-6 rounded-3xl bg-[#090d18] border-2 border-black shadow-comic space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-bangers text-2xl text-white tracking-wide">
                GROVER'S SEARCH: QUADRATIC SPEEDUP O(√N)
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Finding a specific cryptographic key or needle in an unsorted database of size $N$:
              </p>
            </div>

            {/* Scale Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 font-bold">Database Size N:</span>
              {[10000, 1048576, 16777216].map((nVal) => (
                <button
                  key={nVal}
                  onClick={() => {
                    setGroverN(nVal);
                    sound.playPop();
                  }}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition cursor-pointer ${
                    groverN === nVal
                      ? 'bg-purple-500 text-white border-black shadow-comic-sm font-black'
                      : 'bg-[#12182b] text-slate-400 border-slate-700'
                  }`}
                >
                  {nVal.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Metric Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Classical O(N) */}
            <div className="p-4 rounded-2xl bg-[#0c1222] border-2 border-rose-500/40 space-y-1">
              <span className="text-[10px] font-mono uppercase text-rose-400 font-bold">
                Classical Linear Search
              </span>
              <div className="text-2xl font-black text-rose-300 font-mono">
                {classicalSteps.toLocaleString()} steps
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Complexity: $O(N)$ • Average $N/2$ probes required to find element
              </p>
            </div>

            {/* Quantum Grover O(sqrt(N)) */}
            <div className="p-4 rounded-2xl bg-[#0c1222] border-2 border-cyan-500/40 space-y-1">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                Grover Quantum Search
              </span>
              <div className="text-2xl font-black text-cyan-300 font-mono">
                {quantumGroverSteps.toLocaleString()} iterations
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Complexity: $O(\sqrt{'{N}'})$ • Amplitude amplification rotations
              </p>
            </div>

            {/* Speedup Factor */}
            <div className="p-4 rounded-2xl bg-[#0c1222] border-2 border-amber-500/40 space-y-1">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                Quantum Speedup Multiplier
              </span>
              <div className="text-2xl font-black text-amber-300 font-mono">
                {speedupFactor.toLocaleString()}× Faster!
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Quadratic algorithmic acceleration in Hilbert state space
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: BLOCH SPHERE 3D REPRESENTATION */}
      {activeTab === 'bloch' && (
        <div className="p-6 rounded-3xl bg-[#090d18] border-2 border-black shadow-comic flex flex-col items-center justify-center space-y-4 text-center">
          <h3 className="font-bangers text-2xl text-white tracking-wide">
            BLOCH SPHERE GEOMETRIC PROJECTION
          </h3>
          <p className="text-xs text-slate-400 max-w-md font-sans">
            Every pure qubit state $|\psi\rangle$ maps to a point on the surface of a unit sphere in 3D Euclidean space:
          </p>

          <svg width="240" height="240" viewBox="-120 -120 240 240" className="my-2">
            {/* Sphere Contour */}
            <circle cx="0" cy="0" r="90" fill="none" stroke="#6b21a8" strokeWidth="2" strokeDasharray="4 4" />
            <ellipse cx="0" cy="0" rx="90" ry="30" fill="none" stroke="#4c1d95" strokeWidth="1.5" />
            
            {/* Axes */}
            <line x1="0" y1="-100" x2="0" y2="100" stroke="#a855f7" strokeWidth="2" />
            <line x1="-100" y1="0" x2="100" y2="0" stroke="#38bdf8" strokeWidth="1.5" />
            
            {/* State Poles */}
            <text x="-8" y="-105" fill="#f1f5f9" fontSize="12" fontWeight="bold" fontFamily="monospace">|0⟩</text>
            <text x="-8" y="115" fill="#f1f5f9" fontSize="12" fontWeight="bold" fontFamily="monospace">|1⟩</text>
            <text x="105" y="4" fill="#38bdf8" fontSize="11" fontFamily="monospace">+x</text>
            <text x="-115" y="4" fill="#38bdf8" fontSize="11" fontFamily="monospace">-x</text>

            {/* Qubit State Vector Arrow */}
            <line
              x1="0"
              y1="0"
              x2={Math.round(qubits[0].beta * 75)}
              y2={Math.round(-qubits[0].alpha * 75)}
              stroke="#facc15"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle
              cx={Math.round(qubits[0].beta * 75)}
              cy={Math.round(-qubits[0].alpha * 75)}
              r="5"
              fill="#facc15"
            />
          </svg>

          <div className="font-mono text-xs text-amber-300 font-bold bg-[#04060c] px-4 py-2 rounded-xl border border-slate-800">
            Vector Point: (θ = {(Math.acos(qubits[0].alpha) * 2 * (180 / Math.PI)).toFixed(1)}°, φ = 0.0°)
          </div>
        </div>
      )}
    </div>
  );
};
