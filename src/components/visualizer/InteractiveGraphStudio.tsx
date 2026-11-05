import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Plus, Trash2, Sparkles, Network, Compass } from 'lucide-react';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
}

interface StepState {
  currentNode: string | null;
  visited: string[];
  queueOrStack: string[];
  path: string[];
  explanation: string;
  codeLine: number;
}

const PRESET_GRAPH: { nodes: GraphNode[]; edges: GraphEdge[] } = {
  nodes: [
    { id: 'A', label: 'A', x: 80, y: 150 },
    { id: 'B', label: 'B', x: 200, y: 80 },
    { id: 'C', label: 'C', x: 200, y: 220 },
    { id: 'D', label: 'D', x: 330, y: 80 },
    { id: 'E', label: 'E', x: 330, y: 220 },
    { id: 'F', label: 'F', x: 450, y: 150 },
  ],
  edges: [
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'C', weight: 2 },
    { from: 'B', to: 'D', weight: 5 },
    { from: 'C', to: 'E', weight: 3 },
    { from: 'B', to: 'C', weight: 1 },
    { from: 'D', to: 'F', weight: 2 },
    { from: 'E', to: 'F', weight: 6 },
    { from: 'C', to: 'D', weight: 8 },
  ],
};

export const InteractiveGraphStudio: React.FC = () => {
  const [nodes, setNodes] = useState<GraphNode[]>([...PRESET_GRAPH.nodes]);
  const [edges, setEdges] = useState<GraphEdge[]>([...PRESET_GRAPH.edges]);
  const [selectedAlgo, setSelectedAlgo] = useState<'bfs' | 'dfs' | 'dijkstra'>('bfs');

  // Interactive dragging / creation
  const [startNodeId, setStartNodeId] = useState<string>('A');
  const [targetNodeId, setTargetNodeId] = useState<string>('F');
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);

  // Stepper state
  const [steps, setSteps] = useState<StepState[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Compute algorithm execution steps
  useEffect(() => {
    computeAlgorithmSteps();
  }, [nodes, edges, selectedAlgo, startNodeId, targetNodeId]);

  const computeAlgorithmSteps = () => {
    const adj: Record<string, { to: string; weight: number }[]> = {};
    nodes.forEach(n => { adj[n.id] = []; });
    edges.forEach(e => {
      if (adj[e.from]) adj[e.from].push({ to: e.to, weight: e.weight || 1 });
      if (adj[e.to]) adj[e.to].push({ to: e.from, weight: e.weight || 1 }); // undirected
    });

    const newSteps: StepState[] = [];

    if (selectedAlgo === 'bfs') {
      const visited = new Set<string>();
      const queue: string[] = [startNodeId];
      visited.add(startNodeId);

      newSteps.push({
        currentNode: startNodeId,
        visited: [startNodeId],
        queueOrStack: [startNodeId],
        path: [startNodeId],
        explanation: `Initialize BFS: Enqueue source node ${startNodeId} and mark as visited.`,
        codeLine: 2,
      });

      while (queue.length > 0) {
        const u = queue.shift()!;
        const neighbors = (adj[u] || []).map(edge => edge.to).sort();

        newSteps.push({
          currentNode: u,
          visited: Array.from(visited),
          queueOrStack: [...queue],
          path: Array.from(visited),
          explanation: `Dequeued ${u}. Inspecting neighboring nodes: [${neighbors.join(', ')}].`,
          codeLine: 5,
        });

        for (const v of neighbors) {
          if (!visited.has(v)) {
            visited.add(v);
            queue.push(v);
            newSteps.push({
              currentNode: v,
              visited: Array.from(visited),
              queueOrStack: [...queue],
              path: Array.from(visited),
              explanation: `Discovered unvisited neighbor ${v}. Added to queue wavefront.`,
              codeLine: 8,
            });
          }
        }
      }

      newSteps.push({
        currentNode: null,
        visited: Array.from(visited),
        queueOrStack: [],
        path: Array.from(visited),
        explanation: `BFS Complete: Traversed all reachable nodes in breadth layers!`,
        codeLine: 12,
      });
    } else if (selectedAlgo === 'dfs') {
      const visited = new Set<string>();
      const stack: string[] = [startNodeId];

      newSteps.push({
        currentNode: startNodeId,
        visited: [],
        queueOrStack: [startNodeId],
        path: [],
        explanation: `Initialize DFS: Push starting node ${startNodeId} onto the recursion stack.`,
        codeLine: 2,
      });

      while (stack.length > 0) {
        const u = stack.pop()!;
        if (!visited.has(u)) {
          visited.add(u);
          const neighbors = (adj[u] || []).map(edge => edge.to).sort().reverse();

          newSteps.push({
            currentNode: u,
            visited: Array.from(visited),
            queueOrStack: [...stack],
            path: Array.from(visited),
            explanation: `Popped ${u} from call stack. Diving deep into neighbors.`,
            codeLine: 6,
          });

          for (const v of neighbors) {
            if (!visited.has(v)) {
              stack.push(v);
            }
          }
        }
      }

      newSteps.push({
        currentNode: null,
        visited: Array.from(visited),
        queueOrStack: [],
        path: Array.from(visited),
        explanation: `DFS Complete: Depth recursion finished traversing component!`,
        codeLine: 11,
      });
    } else {
      // Dijkstra's Shortest Path
      const dist: Record<string, number> = {};
      const prev: Record<string, string | null> = {};
      nodes.forEach(n => {
        dist[n.id] = Infinity;
        prev[n.id] = null;
      });
      dist[startNodeId] = 0;

      const unvisited = new Set(nodes.map(n => n.id));

      newSteps.push({
        currentNode: startNodeId,
        visited: [],
        queueOrStack: nodes.map(n => `${n.id}:${dist[n.id] === Infinity ? '∞' : dist[n.id]}`),
        path: [startNodeId],
        explanation: `Initialize Dijkstra: dist[${startNodeId}] = 0, all others = ∞.`,
        codeLine: 3,
      });

      while (unvisited.size > 0) {
        // Node with smallest dist
        let u: string | null = null;
        for (const node of unvisited) {
          if (u === null || dist[node] < dist[u]) {
            u = node;
          }
        }

        if (!u || dist[u] === Infinity) break;
        unvisited.delete(u);

        const currentPath: string[] = [];
        let curr: string | null = u;
        while (curr) {
          currentPath.unshift(curr);
          curr = prev[curr];
        }

        newSteps.push({
          currentNode: u,
          visited: nodes.filter(n => !unvisited.has(n.id)).map(n => n.id),
          queueOrStack: Array.from(unvisited).map(n => `${n}:${dist[n] === Infinity ? '∞' : dist[n]}`),
          path: currentPath,
          explanation: `Settled node ${u} with minimum cost ${dist[u]}. Relaxing incident edges.`,
          codeLine: 7,
        });

        for (const neighbor of adj[u] || []) {
          const alt = dist[u] + neighbor.weight;
          if (alt < dist[neighbor.to]) {
            dist[neighbor.to] = alt;
            prev[neighbor.to] = u;
          }
        }
      }

      // Reconstruct final path to target
      const finalPath: string[] = [];
      let step: string | null = targetNodeId;
      while (step) {
        finalPath.unshift(step);
        step = prev[step];
      }

      newSteps.push({
        currentNode: targetNodeId,
        visited: nodes.map(n => n.id),
        queueOrStack: [],
        path: finalPath,
        explanation: `Dijkstra Complete: Shortest Path from ${startNodeId} to ${targetNodeId} is [${finalPath.join(' -> ')}] with cost ${dist[targetNodeId]}!`,
        codeLine: 14,
      });
    }

    setSteps(newSteps);
    setCurrentStepIdx(0);
  };

  // Playback timer
  useEffect(() => {
    let timer: number;
    if (isPlaying) {
      timer = window.setInterval(() => {
        setCurrentStepIdx(prev => {
          if (prev < steps.length - 1) {
            sound.playPop();
            return prev + 1;
          } else {
            setIsPlaying(false);
            sound.playSuccess();
            confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
            return prev;
          }
        });
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const currentStep = steps[currentStepIdx] || {
    currentNode: null,
    visited: [],
    queueOrStack: [],
    path: [],
    explanation: 'Ready to run.',
    codeLine: 1,
  };

  const handleSvgMouseDown = (nodeId: string) => {
    setDraggingNodeId(nodeId);
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggingNodeId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(30, Math.min(rect.width - 30, e.clientX - rect.left));
    const y = Math.max(30, Math.min(rect.height - 30, e.clientY - rect.top));

    setNodes(prev =>
      prev.map(n => (n.id === draggingNodeId ? { ...n, x, y } : n))
    );
  };

  const handleSvgMouseUp = () => {
    setDraggingNodeId(null);
  };

  const getPythonSnippet = () => {
    if (selectedAlgo === 'bfs') {
      return `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return visited`;
    }
    if (selectedAlgo === 'dfs') {
      return `def dfs(graph, start):
    visited = set()
    stack = [start]
    
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            for neighbor in reversed(graph[node]):
                if neighbor not in visited:
                    stack.append(neighbor)
    return visited`;
    }
    return `import heapq

def dijkstra(graph, start):
    dist = {n: float('inf') for n in graph}
    dist[start] = 0
    pq = [(0, start)]
    
    while pq:
        curr_d, u = heapq.heappop(pq)
        if curr_d > dist[u]: continue
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))
    return dist`;
  };

  return (
    <div className="bg-[#0b0e18] rounded-3xl border-3 border-black p-6 shadow-comic-lg space-y-6 font-comic text-slate-100">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#1c243a] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full border border-black shadow-comic-sm flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5" /> Interactive Graph & Tree Studio
            </span>
            <span className="text-xs font-mono text-slate-400">Drag Nodes Anywhere!</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            GRAPH & TREE ALGORITHM PLAYGROUND
          </h2>
        </div>

        {/* Algorithm Tabs */}
        <div className="flex items-center gap-2 bg-[#141b2d] p-1.5 rounded-2xl border border-slate-700">
          {(['bfs', 'dfs', 'dijkstra'] as const).map(algo => (
            <button
              key={algo}
              onClick={() => {
                setSelectedAlgo(algo);
                setIsPlaying(false);
                sound.playPop();
              }}
              className={`px-3 py-1.5 rounded-xl font-bangers text-xs uppercase tracking-wider transition cursor-pointer border ${
                selectedAlgo === algo
                  ? 'bg-amber-400 text-slate-950 border-black shadow-comic-sm font-black'
                  : 'text-slate-400 hover:text-white border-transparent'
              }`}
            >
              {algo === 'bfs' ? 'Breadth-First (BFS)' : algo === 'dfs' ? 'Depth-First (DFS)' : "Dijkstra's Shortest"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive SVG Canvas (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative bg-[#060810] rounded-2xl border-2 border-black overflow-hidden shadow-comic">
            {/* SVG Interactive Area */}
            <svg
              className="w-full h-80 sm:h-96 cursor-crosshair select-none"
              onMouseMove={handleSvgMouseMove}
              onMouseUp={handleSvgMouseUp}
              onMouseLeave={handleSvgMouseUp}
            >
              {/* Edges */}
              {edges.map((e, idx) => {
                const u = nodes.find(n => n.id === e.from);
                const v = nodes.find(n => n.id === e.to);
                if (!u || !v) return null;

                const isPathEdge =
                  currentStep.path.includes(e.from) &&
                  currentStep.path.includes(e.to) &&
                  Math.abs(currentStep.path.indexOf(e.from) - currentStep.path.indexOf(e.to)) === 1;

                return (
                  <g key={idx}>
                    <line
                      x1={u.x}
                      y1={u.y}
                      x2={v.x}
                      y2={v.y}
                      stroke={isPathEdge ? '#FFDE59' : '#1e2844'}
                      strokeWidth={isPathEdge ? 4 : 2}
                      className="transition-colors duration-300"
                    />
                    {e.weight !== undefined && (
                      <text
                        x={(u.x + v.x) / 2}
                        y={(u.y + v.y) / 2 - 6}
                        fill="#94a3b8"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                        textAnchor="middle"
                        className="bg-black/80 px-1"
                      >
                        {e.weight}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.map(n => {
                const isCurrent = currentStep.currentNode === n.id;
                const isVisited = currentStep.visited.includes(n.id);
                const isStart = n.id === startNodeId;
                const isTarget = n.id === targetNodeId;

                return (
                  <g
                    key={n.id}
                    onMouseDown={() => handleSvgMouseDown(n.id)}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r="22"
                      fill={
                        isCurrent
                          ? '#FBBF24'
                          : isVisited
                          ? '#10B981'
                          : isStart
                          ? '#38BDF8'
                          : '#12182c'
                      }
                      stroke={isCurrent ? '#FFFFFF' : '#000000'}
                      strokeWidth={isCurrent ? 3 : 2}
                      className="transition-all duration-300 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    />
                    <text
                      x={n.x}
                      y={n.y + 4}
                      fill={isCurrent || isVisited ? '#000000' : '#ffffff'}
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {n.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Canvas Hint */}
            <div className="absolute bottom-2 left-3 text-[10px] text-slate-500 font-mono">
              💡 Tip: Click and drag any node to reposition the graph in real time!
            </div>
          </div>

          {/* Stepper Controls Bar */}
          <div className="bg-[#121629] p-4 rounded-2xl border-2 border-black shadow-comic flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playPop();
                  setIsPlaying(!isPlaying);
                }}
                className={`btn-comic-push px-4 py-2 rounded-xl font-bangers text-sm border-2 border-black flex items-center gap-1.5 shadow-comic-sm cursor-pointer ${
                  isPlaying ? 'bg-rose-500 text-white' : 'bg-emerald-400 text-slate-950 font-black'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'PAUSE' : 'PLAY STEPPER'}</span>
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  setCurrentStepIdx(c => Math.max(0, c - 1));
                  setIsPlaying(false);
                }}
                disabled={currentStepIdx <= 0}
                className="p-2 rounded-xl bg-[#1b223c] text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
                title="Previous Step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  setCurrentStepIdx(c => Math.min(steps.length - 1, c + 1));
                  setIsPlaying(false);
                }}
                disabled={currentStepIdx >= steps.length - 1}
                className="p-2 rounded-xl bg-[#1b223c] text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
                title="Next Step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  setCurrentStepIdx(0);
                  setIsPlaying(false);
                }}
                className="p-2 rounded-xl bg-[#1b223c] text-slate-300 hover:text-white cursor-pointer"
                title="Reset Steps"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="font-mono text-xs text-amber-300">
              Step {currentStepIdx + 1} of {steps.length}
            </div>
          </div>
        </div>

        {/* Right Column: State Inspector & Code Sync (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Step Explanation Card */}
          <div className="p-4 bg-[#11172a] rounded-2xl border-2 border-[#1e2744] shadow-comic space-y-2">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
              EXECUTION EXPLANATION
            </span>
            <p className="text-xs sm:text-sm text-white font-medium leading-relaxed font-sans">
              {currentStep.explanation}
            </p>
          </div>

          {/* Queue / Stack State Inspector */}
          <div className="p-4 bg-[#0a0d18] rounded-2xl border-2 border-black shadow-comic space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bangers text-amber-400">
                {selectedAlgo === 'bfs' ? 'QUEUE (FIFO)' : selectedAlgo === 'dfs' ? 'CALL STACK (LIFO)' : 'PRIORITY QUEUE (MIN)'}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Size: {currentStep.queueOrStack.length}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto p-2 bg-[#05070e] rounded-xl border border-slate-800 min-h-[46px]">
              {currentStep.queueOrStack.length === 0 ? (
                <span className="text-[11px] text-slate-600 font-mono italic">Empty</span>
              ) : (
                currentStep.queueOrStack.map((item, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-amber-400 text-slate-950 font-bold font-mono text-xs rounded-lg border border-slate-900 shadow-sm shrink-0"
                  >
                    {item}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Visited Set Inspector */}
          <div className="p-4 bg-[#0a0d18] rounded-2xl border-2 border-black shadow-comic space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bangers text-emerald-400">VISITED SET (O(1) LOOKUP)</span>
              <span className="text-[10px] font-mono text-slate-400">
                {currentStep.visited.length} Nodes
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 p-2 bg-[#05070e] rounded-xl border border-slate-800 min-h-[46px]">
              {currentStep.visited.map(v => (
                <span
                  key={v}
                  className="px-2 py-0.5 bg-emerald-950 text-emerald-300 font-mono text-xs font-bold rounded-md border border-emerald-500/40"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Python Code Sync Frame */}
          <div className="p-3 bg-[#060810] rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto shadow-comic">
            <span className="text-[10px] text-slate-500 block mb-1">PYTHON IMPLEMENTATION:</span>
            <pre className="text-cyan-300 leading-relaxed text-[11px]">
              <code>{getPythonSnippet()}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
