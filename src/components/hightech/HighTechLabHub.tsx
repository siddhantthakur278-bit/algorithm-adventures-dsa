import React, { useState } from 'react';
import {
  Cpu,
  Brain,
  Network,
  Terminal,
  Sparkles,
  Zap,
  Activity,
  Layers,
} from 'lucide-react';
import { BytecodeDisassemblerStudio } from './BytecodeDisassemblerStudio';
import { NeuralCodeSpaceVisualizer } from './NeuralCodeSpaceVisualizer';
import { RaftConsensusSimulator } from './RaftConsensusSimulator';
import { sound } from '../../utils/soundEffects';

export const HighTechLabHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bytecode' | 'neural' | 'raft'>('bytecode');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0d1428] via-[#162142] to-[#0d1428] border-3 border-black shadow-comic-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider border border-black shadow-comic-sm flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> High-Tech Cybernetics Lab
            </span>
            <span className="text-xs text-cyan-300 font-bold">Deep Engineering &amp; Systems Architecture</span>
          </div>

          <h1 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
            ADVANCED HIGH-TECH RESEARCH LAB
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Direct hardware and systems insight: Disassemble CPython 3.12 bytecode, project code vectors in neural AST embedding spaces, and simulate distributed consensus clusters under network partitions.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#070b16] p-4 rounded-2xl border border-cyan-500/30">
          <div className="w-12 h-12 rounded-xl bg-cyan-400 text-slate-950 font-black flex items-center justify-center text-xl shadow-comic-sm border border-black">
            ⚡
          </div>
          <div className="font-mono text-xs">
            <span className="text-slate-400 block text-[10px] uppercase">Telemetry Status</span>
            <span className="text-emerald-400 font-bold">Wasm JIT &amp; Raft Active</span>
            <span className="text-slate-500 block text-[9px]">100% In-Browser</span>
          </div>
        </div>
      </div>

      {/* Sub-Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'bytecode', label: 'CPython Bytecode Disassembler', icon: Cpu },
          { id: 'neural', label: 'Neural Code Vector Space (AST)', icon: Brain },
          { id: 'raft', label: 'Distributed Raft Consensus', icon: Network },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                sound.playPop();
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap border-2 transition cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-cyan-400 text-slate-950 border-black shadow-comic-sm -translate-y-0.5 font-black'
                  : 'bg-[#121626] text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Body */}
      {activeTab === 'bytecode' && <BytecodeDisassemblerStudio />}
      {activeTab === 'neural' && <NeuralCodeSpaceVisualizer />}
      {activeTab === 'raft' && <RaftConsensusSimulator />}
    </div>
  );
};
