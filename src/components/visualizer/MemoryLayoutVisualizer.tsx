import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Layers,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Info,
  Shield,
  Zap,
  CornerDownRight,
  CheckCircle2,
} from 'lucide-react';
import { ProfessorAvatar, ByteAvatar, ComicBubble } from '../characters/Characters';
import { sound } from '../../utils/soundEffects';

interface MemoryStep {
  step: number;
  title: string;
  explanation: string;
  stackFrames: {
    name: string;
    address: string;
    variables: { name: string; type: string; value: string; pointsTo?: string }[];
  }[];
  heapObjects: {
    address: string;
    type: string;
    label: string;
    data: string[] | { key: string; val: string }[];
    highlightIndex?: number;
    isDeallocated?: boolean;
    isNewlyAllocated?: boolean;
  }[];
}

interface MemoryPreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  steps: MemoryStep[];
}

export const MemoryLayoutVisualizer: React.FC = () => {
  const presets: MemoryPreset[] = [
    {
      id: 'array-growth',
      name: 'Dynamic Array Geometric Doubling (CPython List)',
      badge: 'Array Amortization',
      description: 'Observe contiguous heap allocation, buffer exhaustion, new block allocation at new address, and pointer retargeting.',
      steps: [
        {
          step: 1,
          title: 'Initial State: Array Capacity 2 (Full)',
          explanation: 'Stack variable "nums" holds a 64-bit pointer (0x00A0) pointing to a contiguous Heap buffer of size 2 containing [10, 20]. Capacity = 2, Length = 2.',
          stackFrames: [
            {
              name: 'main()',
              address: '0x7FFE_0010',
              variables: [
                { name: 'nums', type: 'list*', value: '0x00A0', pointsTo: '0x00A0' },
                { name: 'val', type: 'int', value: '30' },
              ],
            },
          ],
          heapObjects: [
            {
              address: '0x00A0',
              type: 'int[2]',
              label: 'Contiguous Heap Buffer A (Cap: 2, Len: 2)',
              data: ['10', '20'],
            },
          ],
        },
        {
          step: 2,
          title: 'Buffer Overflow Detected -> Allocate New Block (Cap: 4)',
          explanation: 'nums.append(30) is called. Buffer at 0x00A0 has zero free slots! The CPython allocator requests a new contiguous block with doubled capacity (Cap: 4) at heap address 0x01B0.',
          stackFrames: [
            {
              name: 'list_resize()',
              address: '0x7FFE_0028',
              variables: [
                { name: 'old_buf', type: 'void*', value: '0x00A0', pointsTo: '0x00A0' },
                { name: 'new_buf', type: 'void*', value: '0x01B0', pointsTo: '0x01B0' },
              ],
            },
            {
              name: 'main()',
              address: '0x7FFE_0010',
              variables: [
                { name: 'nums', type: 'list*', value: '0x00A0', pointsTo: '0x00A0' },
                { name: 'val', type: 'int', value: '30' },
              ],
            },
          ],
          heapObjects: [
            {
              address: '0x00A0',
              type: 'int[2]',
              label: 'Old Buffer (Full)',
              data: ['10', '20'],
            },
            {
              address: '0x01B0',
              type: 'int[4]',
              label: 'New Doubled Buffer (Cap: 4)',
              data: ['None', 'None', 'None', 'None'],
              isNewlyAllocated: true,
            },
          ],
        },
        {
          step: 3,
          title: 'Copy Existing Elements & Append New Value',
          explanation: 'Elements [10, 20] are copied from 0x00A0 into the first 2 slots of 0x01B0. The new value 30 is placed in slot 2. Slot 3 remains uninitialized.',
          stackFrames: [
            {
              name: 'list_resize()',
              address: '0x7FFE_0028',
              variables: [
                { name: 'new_buf', type: 'void*', value: '0x01B0', pointsTo: '0x01B0' },
              ],
            },
            {
              name: 'main()',
              address: '0x7FFE_0010',
              variables: [
                { name: 'nums', type: 'list*', value: '0x00A0', pointsTo: '0x00A0' },
                { name: 'val', type: 'int', value: '30' },
              ],
            },
          ],
          heapObjects: [
            {
              address: '0x00A0',
              type: 'int[2]',
              label: 'Old Buffer (Pending Free)',
              data: ['10', '20'],
            },
            {
              address: '0x01B0',
              type: 'int[4]',
              label: 'New Buffer (Values Copied)',
              data: ['10', '20', '30', 'None'],
              highlightIndex: 2,
            },
          ],
        },
        {
          step: 4,
          title: 'Rewire Pointer & Free Old Buffer',
          explanation: 'The stack variable nums is updated to point to 0x01B0! The old buffer at 0x00A0 is reclaimed by the garbage collector. Amortized cost: O(1)!',
          stackFrames: [
            {
              name: 'main()',
              address: '0x7FFE_0010',
              variables: [
                { name: 'nums', type: 'list*', value: '0x01B0', pointsTo: '0x01B0' },
                { name: 'val', type: 'int', value: '30' },
              ],
            },
          ],
          heapObjects: [
            {
              address: '0x01B0',
              type: 'int[4]',
              label: 'Active Contiguous Heap Buffer (Cap: 4, Len: 3)',
              data: ['10', '20', '30', 'None'],
              highlightIndex: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'linked-list',
      name: 'Linked List In-Place Reversal (Pointer Rewiring)',
      badge: 'Pointer Invariants',
      description: 'Trace 3 stack pointers (prev, curr, next) in real memory rewiring discontiguous heap node references in O(N) time and O(1) space.',
      steps: [
        {
          step: 1,
          title: 'Initial State: Head at 0x10 (Node 1 -> Node 2)',
          explanation: 'Stack pointers initialized: prev = NULL, curr = 0x10. Node 1 at 0x10 points to Node 2 at 0x20 in the Heap.',
          stackFrames: [
            {
              name: 'reverse_list()',
              address: '0x7FFE_0050',
              variables: [
                { name: 'prev', type: 'Node*', value: 'NULL' },
                { name: 'curr', type: 'Node*', value: '0x10', pointsTo: '0x10' },
                { name: 'next_node', type: 'Node*', value: 'NULL' },
              ],
            },
          ],
          heapObjects: [
            {
              address: '0x10',
              type: 'ListNode',
              label: 'Node 1 (val: 1)',
              data: ['val: 1', 'next: 0x20'],
            },
            {
              address: '0x20',
              type: 'ListNode',
              label: 'Node 2 (val: 2)',
              data: ['val: 2', 'next: 0x30'],
            },
            {
              address: '0x30',
              type: 'ListNode',
              label: 'Node 3 (val: 3)',
              data: ['val: 3', 'next: NULL'],
            },
          ],
        },
        {
          step: 2,
          title: 'Save Next & Rewire Node 1 next to prev (NULL)',
          explanation: 'next_node = curr.next (0x20). Rewire curr.next = prev (NULL). Node 1 now points to NULL!',
          stackFrames: [
            {
              name: 'reverse_list()',
              address: '0x7FFE_0050',
              variables: [
                { name: 'prev', type: 'Node*', value: 'NULL' },
                { name: 'curr', type: 'Node*', value: '0x10', pointsTo: '0x10' },
                { name: 'next_node', type: 'Node*', value: '0x20', pointsTo: '0x20' },
              ],
            },
          ],
          heapObjects: [
            {
              address: '0x10',
              type: 'ListNode',
              label: 'Node 1 (Reversed!)',
              data: ['val: 1', 'next: NULL'],
              highlightIndex: 1,
            },
            {
              address: '0x20',
              type: 'ListNode',
              label: 'Node 2',
              data: ['val: 2', 'next: 0x30'],
            },
            {
              address: '0x30',
              type: 'ListNode',
              label: 'Node 3',
              data: ['val: 3', 'next: NULL'],
            },
          ],
        },
        {
          step: 3,
          title: 'Advance Pointers: prev = 0x10, curr = 0x20',
          explanation: 'Slide both pointers forward: prev moves to 0x10, curr moves to 0x20. Now process Node 2.',
          stackFrames: [
            {
              name: 'reverse_list()',
              address: '0x7FFE_0050',
              variables: [
                { name: 'prev', type: 'Node*', value: '0x10', pointsTo: '0x10' },
                { name: 'curr', type: 'Node*', value: '0x20', pointsTo: '0x20' },
                { name: 'next_node', type: 'Node*', value: '0x20' },
              ],
            },
          ],
          heapObjects: [
            {
              address: '0x10',
              type: 'ListNode',
              label: 'Node 1 (Reversed)',
              data: ['val: 1', 'next: NULL'],
            },
            {
              address: '0x20',
              type: 'ListNode',
              label: 'Node 2 (Active Target)',
              data: ['val: 2', 'next: 0x30'],
            },
            {
              address: '0x30',
              type: 'ListNode',
              label: 'Node 3',
              data: ['val: 3', 'next: NULL'],
            },
          ],
        },
        {
          step: 4,
          title: 'Rewire Node 2 next to Node 1 (0x10)',
          explanation: 'Rewire curr.next = prev (0x10). Now Node 2 points backward to Node 1! Invariant holds.',
          stackFrames: [
            {
              name: 'reverse_list()',
              address: '0x7FFE_0050',
              variables: [
                { name: 'prev', type: 'Node*', value: '0x10', pointsTo: '0x10' },
                { name: 'curr', type: 'Node*', value: '0x20', pointsTo: '0x20' },
                { name: 'next_node', type: 'Node*', value: '0x30', pointsTo: '0x30' },
              ],
            },
          ],
          heapObjects: [
            {
              address: '0x10',
              type: 'ListNode',
              label: 'Node 1',
              data: ['val: 1', 'next: NULL'],
            },
            {
              address: '0x20',
              type: 'ListNode',
              label: 'Node 2 (Reversed!)',
              data: ['val: 2', 'next: 0x10'],
              highlightIndex: 1,
            },
            {
              address: '0x30',
              type: 'ListNode',
              label: 'Node 3',
              data: ['val: 3', 'next: NULL'],
            },
          ],
        },
      ],
    },
    {
      id: 'recursion-stack',
      name: 'Call Stack Depth & Activation Frames (fib(3))',
      badge: 'Recursion Memory',
      description: 'Watch stack activation frames push onto the call stack, allocate stack space, evaluate base cases, return values, and pop off.',
      steps: [
        {
          step: 1,
          title: 'Call fib(3) -> Stack Frame Pushed',
          explanation: 'main() invokes fib(3). A new activation record is pushed at address 0x7FFE_0040 with parameter n = 3 and space for return value.',
          stackFrames: [
            {
              name: 'fib(n=3)',
              address: '0x7FFE_0040',
              variables: [
                { name: 'n', type: 'int', value: '3' },
                { name: 'ret_addr', type: 'code*', value: 'main+12' },
              ],
            },
            {
              name: 'main()',
              address: '0x7FFE_0010',
              variables: [{ name: 'res', type: 'int', value: '?' }],
            },
          ],
          heapObjects: [],
        },
        {
          step: 2,
          title: 'fib(3) calls fib(2) -> Second Stack Frame Pushed',
          explanation: 'fib(3) must calculate fib(2) + fib(1). It pushes fib(2) onto the top of the call stack at address 0x7FFE_0060.',
          stackFrames: [
            {
              name: 'fib(n=2)',
              address: '0x7FFE_0060',
              variables: [
                { name: 'n', type: 'int', value: '2' },
                { name: 'ret_addr', type: 'code*', value: 'fib(3)+8' },
              ],
            },
            {
              name: 'fib(n=3)',
              address: '0x7FFE_0040',
              variables: [
                { name: 'n', type: 'int', value: '3' },
                { name: 'ret_addr', type: 'code*', value: 'main+12' },
              ],
            },
            {
              name: 'main()',
              address: '0x7FFE_0010',
              variables: [{ name: 'res', type: 'int', value: '?' }],
            },
          ],
          heapObjects: [],
        },
        {
          step: 3,
          title: 'Base Case Reached -> Frame Pops & Returns 1',
          explanation: 'fib(1) hits base case n <= 1 and immediately returns 1. Its stack frame is popped, freeing memory on the call stack.',
          stackFrames: [
            {
              name: 'fib(n=2)',
              address: '0x7FFE_0060',
              variables: [
                { name: 'n', type: 'int', value: '2' },
                { name: 'left_res', type: 'int', value: '1' },
              ],
            },
            {
              name: 'fib(n=3)',
              address: '0x7FFE_0040',
              variables: [{ name: 'n', type: 'int', value: '3' }],
            },
            {
              name: 'main()',
              address: '0x7FFE_0010',
              variables: [{ name: 'res', type: 'int', value: '?' }],
            },
          ],
          heapObjects: [],
        },
      ],
    },
  ];

  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);
  const currentPreset = presets[activePresetIndex];
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const currentStep = currentPreset.steps[currentStepIndex] || currentPreset.steps[0];

  useEffect(() => {
    let timer: number | null = null;
    if (isPlaying) {
      timer = window.setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= currentPreset.steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2200);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, currentPreset.steps.length]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Preset Selector */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {presets.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => {
              setActivePresetIndex(idx);
              setCurrentStepIndex(0);
              setIsPlaying(false);
              sound.playPop();
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap border-2 transition cursor-pointer flex items-center gap-2 ${
              activePresetIndex === idx
                ? 'bg-amber-400 text-slate-950 border-black shadow-comic-sm -translate-y-0.5'
                : 'bg-[#121626] text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{p.name.split('(')[0]}</span>
          </button>
        ))}
      </div>

      {/* Preset Info Banner */}
      <div className="p-5 rounded-2xl bg-[#0c101d] border-2 border-black shadow-comic flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40">
              {currentPreset.badge}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Step {currentStep.step} of {currentPreset.steps.length}
            </span>
          </div>
          <h3 className="font-bangers text-2xl text-white">{currentStep.title}</h3>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed font-sans">
            {currentStep.explanation}
          </p>
        </div>

        {/* Stepper Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
              sound.playPop();
            }}
            className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black border border-black shadow-comic-sm cursor-pointer"
            title={isPlaying ? 'Pause Animation' : 'Play Animation'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
          <button
            onClick={() => {
              setCurrentStepIndex((prev) => Math.max(0, prev - 1));
              sound.playPop();
            }}
            disabled={currentStepIndex === 0}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-slate-300 border border-slate-700 cursor-pointer"
          >
            &larr; Prev
          </button>
          <button
            onClick={() => {
              setCurrentStepIndex((prev) => Math.min(currentPreset.steps.length - 1, prev + 1));
              sound.playPop();
            }}
            disabled={currentStepIndex === currentPreset.steps.length - 1}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-slate-300 border border-slate-700 cursor-pointer"
          >
            Next &rarr;
          </button>
          <button
            onClick={() => {
              setCurrentStepIndex(0);
              setIsPlaying(false);
              sound.playPop();
            }}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Dual Memory Layout: Stack (Left) vs Heap (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Stack Frames (High Memory 0x7FFE...) (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-3xl bg-[#090d18] border-2 border-black shadow-comic space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-400"></span>
              <h4 className="font-bangers text-lg text-white">CALL STACK (LIFO MEMORY)</h4>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Grows Downward ↓</span>
          </div>

          <div className="space-y-3">
            {currentStep.stackFrames.map((frame, fIdx) => (
              <div
                key={fIdx}
                className="p-3.5 rounded-2xl bg-[#10172c] border-2 border-sky-500/40 space-y-2 relative"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-sky-300 font-sans">{frame.name}</span>
                  <span className="text-[10px] text-slate-500">{frame.address}</span>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  {frame.variables.map((v, vIdx) => (
                    <div
                      key={vIdx}
                      className="p-2 rounded-xl bg-[#080c16] border border-slate-800 flex items-center justify-between text-[11px]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-bold">{v.name}</span>
                        <span className="text-slate-500 text-[10px]">({v.type})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-white font-bold">{v.value}</span>
                        {v.pointsTo && (
                          <span className="text-[9px] px-1 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-0.5">
                            ➔ {v.pointsTo}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Heap Dynamic Allocation (0x00A0...) (7 Cols) */}
        <div className="lg:col-span-7 p-5 rounded-3xl bg-[#090d18] border-2 border-black shadow-comic space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
              <h4 className="font-bangers text-lg text-white">HEAP MEMORY (DYNAMIC POOL)</h4>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Managed by Garbage Collector</span>
          </div>

          {currentStep.heapObjects.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 italic">
              Pure primitives on Stack. Zero dynamic Heap objects allocated.
            </div>
          ) : (
            <div className="space-y-3">
              {currentStep.heapObjects.map((obj, oIdx) => (
                <div
                  key={oIdx}
                  className={`p-4 rounded-2xl border-2 transition-all space-y-2 ${
                    obj.isNewlyAllocated
                      ? 'bg-[#0b1f14] border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                      : 'bg-[#12182c] border-[#1e284a]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-emerald-400">{obj.address}</span>
                      <span className="text-slate-400 text-[10px]">({obj.type})</span>
                    </div>
                    <span className="text-xs text-slate-300 font-bold">{obj.label}</span>
                  </div>

                  {/* Contiguous Data Slots */}
                  {Array.isArray(obj.data) && (
                    <div className="flex gap-2 overflow-x-auto pt-1 font-mono text-xs">
                      {obj.data.map((slot, sIdx) => {
                        const isHighlighted = obj.highlightIndex === sIdx;
                        return (
                          <div
                            key={sIdx}
                            className={`p-2.5 rounded-xl border text-center min-w-[64px] ${
                              isHighlighted
                                ? 'bg-amber-400 text-slate-950 font-black border-black shadow-comic-sm scale-105'
                                : slot === 'None'
                                ? 'bg-[#080b14] text-slate-600 border-slate-800'
                                : 'bg-[#172038] text-white border-slate-700'
                            }`}
                          >
                            <span className="block text-[9px] text-slate-500">[{sIdx}]</span>
                            <span className="font-bold">{typeof slot === 'string' ? slot : `${slot.key}: ${slot.val}`}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
