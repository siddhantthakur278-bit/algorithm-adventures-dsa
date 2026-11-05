import React, { useState } from 'react';
import {
  Cpu,
  Terminal,
  Zap,
  Play,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  Code2,
  Layers,
  Search,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

interface BytecodeInstruction {
  offset: number;
  opcode: string;
  arg: string | number;
  argVal: string;
  description: string;
  stackEffect: string;
}

export const BytecodeDisassemblerStudio: React.FC = () => {
  const presets = [
    {
      id: 'lookup-cmp',
      title: 'List Lookup vs Set Lookup (O(N) vs O(1))',
      code: `# List vs Set Membership Bytecode\n# Case A: target in my_list (Linear O(N) traversal)\nres_list = target in my_list\n\n# Case B: target in my_set (O(1) Hash Table Probe)\nres_set = target in my_set`,
      instructions: [
        {
          offset: 0,
          opcode: 'RESUME',
          arg: 0,
          argVal: '0',
          description: 'No-op entry point for CPython evaluation loop generator tracing.',
          stackEffect: '[]',
        },
        {
          offset: 2,
          opcode: 'LOAD_NAME',
          arg: 0,
          argVal: 'target',
          description: 'Pushes name "target" onto CPython evaluation value stack.',
          stackEffect: '[target]',
        },
        {
          offset: 4,
          opcode: 'LOAD_NAME',
          arg: 1,
          argVal: 'my_list',
          description: 'Pushes reference to "my_list" (PyListObject*) onto stack.',
          stackEffect: '[target, my_list]',
        },
        {
          offset: 6,
          opcode: 'CONTAINS_OP',
          arg: 0,
          argVal: '0 (in)',
          description: 'Invokes PySequence_Contains(). Scans every list pointer sequentially O(N)!',
          stackEffect: '[bool_res]',
        },
        {
          offset: 8,
          opcode: 'STORE_NAME',
          arg: 2,
          argVal: 'res_list',
          description: 'Pops top-of-stack boolean into local namespace variable.',
          stackEffect: '[]',
        },
        {
          offset: 10,
          opcode: 'LOAD_NAME',
          arg: 0,
          argVal: 'target',
          description: 'Pushes name "target" for set query.',
          stackEffect: '[target]',
        },
        {
          offset: 12,
          opcode: 'LOAD_NAME',
          arg: 3,
          argVal: 'my_set',
          description: 'Pushes reference to "my_set" (PySetObject*) onto stack.',
          stackEffect: '[target, my_set]',
        },
        {
          offset: 14,
          opcode: 'CONTAINS_OP',
          arg: 0,
          argVal: '0 (in)',
          description: 'Invokes set_contains(). Uses perturb hash algorithm: O(1) table lookup!',
          stackEffect: '[bool_res]',
        },
        {
          offset: 16,
          opcode: 'STORE_NAME',
          arg: 4,
          argVal: 'res_set',
          description: 'Pops result into res_set. Finished.',
          stackEffect: '[]',
        },
      ],
      insight:
        'Both lines use the identical CONTAINS_OP opcode in Python 3.12! However, under the CPython C-API, PyListObject calls a sequential pointer scan (memcmp), while PySetObject calculates the SipHash hash index and probes table slots directly in O(1) time.',
    },
    {
      id: 'two-sum-loop',
      title: 'Two Sum Single-Pass Hash Map (CPython 3.12 Loop)',
      code: `def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        comp = target - num\n        if comp in seen:\n            return [seen[comp], i]\n        seen[num] = i\n    return []`,
      instructions: [
        {
          offset: 0,
          opcode: 'BUILD_MAP',
          arg: 0,
          argVal: '0 elements',
          description: 'Allocates new empty PyDictObject on Heap.',
          stackEffect: '[dict_ptr]',
        },
        {
          offset: 2,
          opcode: 'STORE_FAST',
          arg: 2,
          argVal: 'seen',
          description: 'Stores dictionary pointer in fast local variable array slot 2.',
          stackEffect: '[]',
        },
        {
          offset: 4,
          opcode: 'LOAD_GLOBAL',
          arg: 1,
          argVal: 'enumerate',
          description: 'Pushes built-in enumerate generator onto evaluation stack.',
          stackEffect: '[enumerate_fn]',
        },
        {
          offset: 6,
          opcode: 'LOAD_FAST',
          arg: 0,
          argVal: 'nums',
          description: 'Pushes nums array pointer onto stack.',
          stackEffect: '[enumerate_fn, nums]',
        },
        {
          offset: 8,
          opcode: 'CALL',
          arg: 1,
          argVal: '1 arg',
          description: 'Invokes enumerate(nums), returning iterator object.',
          stackEffect: '[iter_obj]',
        },
        {
          offset: 12,
          opcode: 'GET_ITER',
          arg: 0,
          argVal: '',
          description: 'Extracts iterator object protocol for CPython evaluation loop.',
          stackEffect: '[iter_obj]',
        },
        {
          offset: 14,
          opcode: 'FOR_ITER',
          arg: 32,
          argVal: 'to offset 80',
          description: 'Fetches next (i, num) pair or jumps to end when exhausted.',
          stackEffect: '[iter_obj, (i, num)]',
        },
        {
          offset: 16,
          opcode: 'UNPACK_SEQUENCE',
          arg: 2,
          argVal: '2 elements',
          description: 'Unpacks tuple into individual i and num values.',
          stackEffect: '[iter_obj, i, num]',
        },
        {
          offset: 20,
          opcode: 'BINARY_OP',
          arg: 10,
          argVal: 'SUB (-)',
          description: 'Executes fast PyNumber_Subtract(target, num) -> comp.',
          stackEffect: '[iter_obj, comp]',
        },
      ],
      insight:
        'CPython 3.12 uses adaptive specialized bytecodes! In hot loops, BINARY_OP specializes to BINARY_OP_SUBTRACT_FLOAT or BINARY_OP_SUBTRACT_INT, bypassing generic object dispatch for 30% faster execution.',
    },
  ];

  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);
  const [selectedInstructionIndex, setSelectedInstructionIndex] = useState<number | null>(null);
  const currentPreset = presets[activePresetIndex];

  return (
    <div className="p-6 rounded-3xl bg-[#0c101d] border-2 border-black shadow-comic space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#1b233a]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider border border-black shadow-comic-sm">
              <Cpu className="w-3.5 h-3.5 inline mr-1" /> CPython 3.12 Wasm Engine
            </span>
            <span className="text-xs text-cyan-300 font-bold">Virtual Machine Bytecode Disassembler</span>
          </div>
          <h3 className="font-bangers text-2xl text-white">
            CPYTHON BYTECODE &amp; OP-STACK PROFILER
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Peek under the hood of Python’s Virtual Machine. Inspect exact bytecode offsets, evaluation stack effects, and see why $O(1)$ operations execute in fewer machine cycles than $O(N)$ scans.
          </p>
        </div>

        <div className="flex gap-2">
          {presets.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setActivePresetIndex(idx);
                setSelectedInstructionIndex(null);
                sound.playPop();
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                activePresetIndex === idx
                  ? 'bg-cyan-400 text-slate-950 border-black shadow-comic-sm font-black'
                  : 'bg-[#12182b] text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              {p.title.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Code (Left) vs Bytecode Instruction Table (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Python Source Code (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-[#070912] border-2 border-black shadow-comic space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
              <span className="flex items-center gap-1.5 text-white font-bold">
                <Code2 className="w-4 h-4 text-cyan-400" /> Python 3.12 Source
              </span>
              <span>UTF-8 Script</span>
            </div>

            <pre className="font-mono text-xs text-emerald-300 overflow-x-auto p-3 rounded-xl bg-[#03060c] border border-slate-800 leading-relaxed">
              {currentPreset.code}
            </pre>
          </div>

          {/* VM Architectural Insight */}
          <div className="p-4 rounded-2xl bg-[#091522] border border-cyan-500/40 text-xs text-cyan-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-cyan-300 font-mono">
              <Zap className="w-4 h-4 text-cyan-400" />
              CPython Evaluation Stack Architecture:
            </div>
            <p className="leading-relaxed font-sans text-slate-300">
              {currentPreset.insight}
            </p>
          </div>
        </div>

        {/* Right: Disassembled Bytecode Matrix (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-slate-400 uppercase tracking-wider">
              Disassembled Instructions (dis.dis)
            </span>
            <span className="text-[10px] text-slate-500">Click any opcode to inspect stack effect</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#070a14]">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-[#0d1222]">
                  <th className="py-2 px-3">Offset</th>
                  <th className="py-2 px-3">Opcode</th>
                  <th className="py-2 px-3">Argument</th>
                  <th className="py-2 px-3">Stack Effect</th>
                </tr>
              </thead>
              <tbody>
                {currentPreset.instructions.map((inst, i) => {
                  const isSelected = selectedInstructionIndex === i;
                  return (
                    <tr
                      key={inst.offset}
                      onClick={() => {
                        setSelectedInstructionIndex(i);
                        sound.playPop();
                      }}
                      className={`border-b border-slate-800/60 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-cyan-500/20 text-white font-bold border-l-4 border-l-cyan-400'
                          : 'hover:bg-slate-900/40 text-slate-300'
                      }`}
                    >
                      <td className="py-2 px-3 text-slate-500">{inst.offset}</td>
                      <td className="py-2 px-3 font-bold text-cyan-300">{inst.opcode}</td>
                      <td className="py-2 px-3 text-amber-300">{inst.argVal}</td>
                      <td className="py-2 px-3 text-emerald-400">{inst.stackEffect}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Opcode Inspector Detail */}
          {selectedInstructionIndex !== null && (
            <div className="p-4 rounded-2xl bg-[#091220] border-2 border-cyan-400/50 shadow-comic-sm space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-white">
                  Opcode: {currentPreset.instructions[selectedInstructionIndex].opcode} (Offset {currentPreset.instructions[selectedInstructionIndex].offset})
                </span>
                <span className="text-cyan-400 font-mono">
                  Stack: {currentPreset.instructions[selectedInstructionIndex].stackEffect}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {currentPreset.instructions[selectedInstructionIndex].description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
