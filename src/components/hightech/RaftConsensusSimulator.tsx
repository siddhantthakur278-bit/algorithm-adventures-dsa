import React, { useState, useEffect } from 'react';
import {
  Server,
  Network,
  Zap,
  Play,
  RotateCcw,
  Shield,
  Split,
  CheckCircle2,
  AlertTriangle,
  Send,
  Sparkles,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

interface RaftNode {
  id: string;
  name: string;
  role: 'Leader' | 'Follower' | 'Candidate';
  term: number;
  votedFor: string | null;
  log: string[];
  commitIndex: number;
  partition: 1 | 2; // 1 = main, 2 = isolated
  isAlive: boolean;
}

export const RaftConsensusSimulator: React.FC = () => {
  const [nodes, setNodes] = useState<RaftNode[]>([
    { id: 'node-A', name: 'Node A', role: 'Leader', term: 1, votedFor: 'node-A', log: ['SET user="Siddhant"'], commitIndex: 0, partition: 1, isAlive: true },
    { id: 'node-B', name: 'Node B', role: 'Follower', term: 1, votedFor: 'node-A', log: ['SET user="Siddhant"'], commitIndex: 0, partition: 1, isAlive: true },
    { id: 'node-C', name: 'Node C', role: 'Follower', term: 1, votedFor: 'node-A', log: ['SET user="Siddhant"'], commitIndex: 0, partition: 1, isAlive: true },
    { id: 'node-D', name: 'Node D', role: 'Follower', term: 1, votedFor: 'node-A', log: ['SET user="Siddhant"'], commitIndex: 0, partition: 1, isAlive: true },
    { id: 'node-E', name: 'Node E', role: 'Follower', term: 1, votedFor: 'node-A', log: ['SET user="Siddhant"'], commitIndex: 0, partition: 1, isAlive: true },
  ]);

  const [isPartitioned, setIsPartitioned] = useState<boolean>(false);
  const [clientInput, setClientInput] = useState<string>('SET streak = 7');
  const [consensusLog, setConsensusLog] = useState<string[]>([
    'Cluster initialized: Node A elected Leader for Term 1.',
  ]);

  const currentLeader = nodes.find((n) => n.role === 'Leader' && n.partition === 1) || nodes[0];

  const handleClientWrite = () => {
    if (!clientInput.trim()) return;
    const cmd = clientInput.trim();
    sound.playPop();

    // Leader receives command
    const quorumSize = Math.floor(nodes.filter((n) => n.partition === currentLeader.partition).length / 2) + 1;
    const totalPartitionNodes = nodes.filter((n) => n.partition === currentLeader.partition).length;

    if (totalPartitionNodes < 3) {
      sound.playError();
      setConsensusLog((prev) => [
        `❌ Write rejected by Leader (${currentLeader.name}): Partition has only ${totalPartitionNodes}/5 nodes (No Quorum)!`,
        ...prev,
      ]);
      return;
    }

    // Quorum achieved (>=3 nodes)
    setNodes((prev) =>
      prev.map((node) => {
        if (node.partition === currentLeader.partition) {
          return {
            ...node,
            log: [...node.log, cmd],
            commitIndex: node.commitIndex + 1,
          };
        }
        return node;
      })
    );

    sound.playSuccess();
    setConsensusLog((prev) => [
      `✓ Quorum achieved (${totalPartitionNodes}/5 nodes replicated). Entry "${cmd}" committed to state machine at index ${currentLeader.commitIndex + 1}!`,
      ...prev,
    ]);
  };

  const togglePartition = () => {
    sound.playSwoosh();
    if (!isPartitioned) {
      // Split into {A, B} (minority) and {C, D, E} (majority)
      setIsPartitioned(true);
      setNodes((prev) =>
        prev.map((n) => {
          if (n.id === 'node-A' || n.id === 'node-B') {
            return { ...n, partition: 2 };
          }
          if (n.id === 'node-C') {
            // Node C becomes Leader of majority partition
            return { ...n, role: 'Leader', term: n.term + 1, partition: 1 };
          }
          return { ...n, partition: 1, term: n.term + 1 };
        })
      );
      setConsensusLog((prev) => [
        '⚡ NETWORK PARTITION TRIGGERED: Split into {A, B} (Minority) and {C, D, E} (Majority). Node C elected new Leader for Term 2!',
        ...prev,
      ]);
    } else {
      // Heal partition
      setIsPartitioned(false);
      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          partition: 1,
          role: n.id === 'node-C' ? 'Leader' : 'Follower',
          term: 2,
        }))
      );
      setConsensusLog((prev) => [
        '🤝 Network Partition Healed! Nodes A & B reconcile logs with majority Leader Node C.',
        ...prev,
      ]);
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-[#0c101d] border-2 border-black shadow-comic space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#1b233a]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500 text-white font-black text-xs uppercase tracking-wider border border-black shadow-comic-sm">
              <Network className="w-3.5 h-3.5 inline mr-1" /> Distributed Systems
            </span>
            <span className="text-xs text-indigo-300 font-bold">Raft Consensus Algorithm (5-Node Cluster)</span>
          </div>
          <h3 className="font-bangers text-2xl text-white">
            RAFT CONSENSUS &amp; SPLIT-BRAIN QUORUM SIMULATOR
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Observe Leader Election, Log Replication across majority quorums, and how modern distributed databases (etcd, CockroachDB, Kafka KRaft) maintain consistency during network partitions.
          </p>
        </div>

        {/* Partition Trigger Button */}
        <button
          onClick={togglePartition}
          className={`px-4 py-2 rounded-xl font-bold text-xs border-2 transition cursor-pointer shadow-comic-sm flex items-center gap-2 ${
            isPartitioned
              ? 'bg-emerald-400 text-slate-950 border-black'
              : 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
          }`}
        >
          <Split className="w-3.5 h-3.5" />
          <span>{isPartitioned ? 'Heal Partition (Reconcile)' : 'Simulate Network Partition (Split-Brain)'}</span>
        </button>
      </div>

      {/* Cluster Nodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {nodes.map((node) => {
          const isLeader = node.role === 'Leader';
          const isMinority = node.partition === 2;

          return (
            <div
              key={node.id}
              className={`p-4 rounded-2xl border-2 flex flex-col justify-between transition-all space-y-3 ${
                isMinority
                  ? 'bg-[#1f0f14] border-rose-500/60 opacity-80'
                  : isLeader
                  ? 'bg-[#15233e] border-amber-400 shadow-comic-yellow -translate-y-0.5'
                  : 'bg-[#0f1424] border-[#1c243a]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-slate-400" />
                    {node.name}
                  </span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                      isLeader
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {node.role}
                  </span>
                </div>

                <div className="text-[10px] text-slate-400 font-mono mt-2 space-y-0.5">
                  <div>Term: <strong className="text-white">{node.term}</strong></div>
                  <div>
                    Partition:{' '}
                    <strong className={isMinority ? 'text-rose-400' : 'text-emerald-400'}>
                      {isMinority ? 'Minority {A, B}' : 'Majority {C, D, E}'}
                    </strong>
                  </div>
                </div>

                {/* Node Log Entries */}
                <div className="mt-3 space-y-1">
                  <span className="text-[9px] uppercase font-mono text-slate-500 block">Replicated Log:</span>
                  <div className="p-2 rounded-xl bg-[#070912] border border-slate-800 text-[10px] font-mono text-emerald-300 max-h-20 overflow-y-auto space-y-0.5">
                    {node.log.map((entry, idx) => (
                      <div key={idx} className="truncate">
                        [{idx}] {entry}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[9px] font-mono">
                <span className="text-slate-500">Commit: {node.commitIndex}</span>
                <span className="text-emerald-400 font-bold">● ONLINE</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Client Write Command Terminal & Cluster Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Client Write Box (5 Cols) */}
        <div className="lg:col-span-5 p-4 rounded-2xl bg-[#090d18] border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-white font-mono flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Client State Machine Mutation:
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={clientInput}
              onChange={(e) => setClientInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleClientWrite()}
              placeholder="SET key = value"
              className="flex-1 bg-[#060810] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
            />
            <button
              onClick={handleClientWrite}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs border border-black shadow-comic-sm cursor-pointer"
            >
              Submit Write
            </button>
          </div>

          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            The client submits writes to the active Leader. Writes require a strict majority quorum (&gt; 50%, or ≥ 3 of 5 nodes) to commit.
          </p>
        </div>

        {/* Live Cluster Consensus Event Log (7 Cols) */}
        <div className="lg:col-span-7 p-4 rounded-2xl bg-[#070912] border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            Raft Protocol Telemetry Stream:
          </div>

          <div className="p-3 rounded-xl bg-[#03060c] border border-slate-850 font-mono text-xs text-slate-300 max-h-28 overflow-y-auto space-y-1">
            {consensusLog.map((log, i) => (
              <div key={i} className="text-[11px] leading-relaxed">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
