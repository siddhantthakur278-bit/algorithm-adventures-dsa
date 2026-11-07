import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  Code2,
  Terminal,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  FileCode,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

interface PresetAlgo {
  id: string;
  name: string;
  complexity: string;
  sourceCode: string;
  tokens: { type: string; val: string; color: string }[];
  ast: {
    type: string;
    label: string;
    detail: string;
    children?: { type: string; label: string; detail: string; children?: any[] }[];
  };
  wat: string[];
  stackSteps: { step: number; op: string; stack: (string | number)[]; desc: string }[];
}

const PRESET_ALGOS: PresetAlgo[] = [
  {
    id: 'twosum',
    name: 'Two Sum (Hash Map O(N))',
    complexity: 'O(N) Time • O(N) Space',
    sourceCode: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    tokens: [
      { type: 'KEYWORD', val: 'def', color: 'text-purple-400' },
      { type: 'IDENTIFIER', val: 'two_sum', color: 'text-blue-300' },
      { type: 'DELIMITER', val: '(', color: 'text-slate-400' },
      { type: 'PARAM', val: 'nums', color: 'text-amber-300' },
      { type: 'DELIMITER', val: ',', color: 'text-slate-400' },
      { type: 'PARAM', val: 'target', color: 'text-amber-300' },
      { type: 'DELIMITER', val: '):', color: 'text-slate-400' },
      { type: 'IDENTIFIER', val: 'seen', color: 'text-cyan-300' },
      { type: 'OPERATOR', val: '=', color: 'text-rose-400' },
      { type: 'LITERAL', val: '{}', color: 'text-emerald-400' },
      { type: 'KEYWORD', val: 'for', color: 'text-purple-400' },
      { type: 'IDENTIFIER', val: 'i, num', color: 'text-amber-200' },
      { type: 'KEYWORD', val: 'in', color: 'text-purple-400' },
      { type: 'BUILTIN', val: 'enumerate', color: 'text-blue-400' },
    ],
    ast: {
      type: 'Module',
      label: 'Module (Root)',
      detail: 'CPython AST Root Node',
      children: [
        {
          type: 'FunctionDef',
          label: 'FunctionDef: two_sum',
          detail: 'args=[nums, target]',
          children: [
            {
              type: 'Assign',
              label: 'Assign (seen = {})',
              detail: 'HashTable Allocation',
            },
            {
              type: 'For',
              label: 'ForLoop (enumerate(nums))',
              detail: 'Iterator protocol over array',
              children: [
                {
                  type: 'Assign',
                  label: 'Assign (complement = target - num)',
                  detail: 'SubOp(target, num)',
                },
                {
                  type: 'If',
                  label: 'IfCondition (complement in seen)',
                  detail: 'O(1) Hash Map Probe',
                  children: [
                    {
                      type: 'Return',
                      label: 'Return [seen[comp], i]',
                      detail: 'Pair found in single pass',
                    },
                  ],
                },
              ],
            },
            {
              type: 'Return',
              label: 'Return []',
              detail: 'Default empty fallback',
            },
          ],
        },
      ],
    },
    wat: [
      '(module',
      '  (type $t_func (func (param i32 i32) (result i32)))',
      '  (import "env" "memory" (memory 1))',
      '  (func $two_sum (param $nums i32) (param $target i32) (result i32)',
      '    ;; Allocate local table pointer on Linear Memory',
      '    (local $i i32)',
      '    (local $num i32)',
      '    (local $comp i32)',
      '    local.get $target',
      '    local.get $num',
      '    i32.sub             ;; complement = target - num',
      '    local.set $comp',
      '    ;; Hash map probe in Linear Memory',
      '    local.get $comp',
      '    call $hash_lookup',
      '    br_if 1             ;; Exit loop if complement exists',
      '    i32.const 0',
      '    return',
      '  )',
      '  (export "two_sum" (func $two_sum))',
      ')',
    ],
    stackSteps: [
      { step: 1, op: 'local.get $target', stack: ['9'], desc: 'Push target parameter (9) onto evaluation stack' },
      { step: 2, op: 'local.get $num', stack: ['9', '2'], desc: 'Push current array item nums[0]=2' },
      { step: 3, op: 'i32.sub', stack: ['7'], desc: 'Pop 2 and 9, subtract: complement is 7' },
      { step: 4, op: 'local.set $comp', stack: [], desc: 'Store 7 in local register $comp' },
      { step: 5, op: 'local.get $comp', stack: ['7'], desc: 'Push complement 7 to check hash map' },
      { step: 6, op: 'call $hash_lookup', stack: ['1 (FOUND)'], desc: 'Probe hash table: key 7 points to index 1!' },
    ],
  },
  {
    id: 'binsearch',
    name: 'Binary Search O(log N)',
    complexity: 'O(log N) Time • O(1) Space',
    sourceCode: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    tokens: [
      { type: 'KEYWORD', val: 'def', color: 'text-purple-400' },
      { type: 'IDENTIFIER', val: 'binary_search', color: 'text-blue-300' },
      { type: 'DELIMITER', val: '(', color: 'text-slate-400' },
      { type: 'PARAM', val: 'arr, target', color: 'text-amber-300' },
      { type: 'DELIMITER', val: '):', color: 'text-slate-400' },
      { type: 'KEYWORD', val: 'while', color: 'text-purple-400' },
      { type: 'OPERATOR', val: '<=', color: 'text-rose-400' },
      { type: 'IDENTIFIER', val: 'mid', color: 'text-cyan-300' },
      { type: 'OPERATOR', val: '//', color: 'text-rose-400' },
    ],
    ast: {
      type: 'Module',
      label: 'Module (Root)',
      detail: 'CPython AST Root Node',
      children: [
        {
          type: 'FunctionDef',
          label: 'FunctionDef: binary_search',
          detail: 'args=[arr, target]',
          children: [
            {
              type: 'Assign',
              label: 'Assign (left=0, right=len-1)',
              detail: 'Boundary pointers',
            },
            {
              type: 'While',
              label: 'WhileLoop (left <= right)',
              detail: 'Halves search space each step',
              children: [
                {
                  type: 'Assign',
                  label: 'Assign mid = (left + right) // 2',
                  detail: 'Integer division arithmetic',
                },
                {
                  type: 'If',
                  label: 'Compare: arr[mid] == target',
                  detail: 'Exact match check',
                  children: [
                    { type: 'Return', label: 'Return mid', detail: 'Found index' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    wat: [
      '(module',
      '  (func $bin_search (param $arr i32) (param $target i32) (result i32)',
      '    (local $left i32)',
      '    (local $right i32)',
      '    (local $mid i32)',
      '    loop $search_loop',
      '      local.get $left',
      '      local.get $right',
      '      i32.add',
      '      i32.const 1',
      '      i32.shr_u         ;; Fast bitwise right shift (// 2)',
      '      local.set $mid',
      '    end',
      '    i32.const -1',
      '    return',
      '  )',
      ')',
    ],
    stackSteps: [
      { step: 1, op: 'local.get $left', stack: ['0'], desc: 'Push left pointer index 0' },
      { step: 2, op: 'local.get $right', stack: ['0', '9'], desc: 'Push right pointer index 9' },
      { step: 3, op: 'i32.add', stack: ['9'], desc: 'Add boundary bounds (0 + 9 = 9)' },
      { step: 4, op: 'i32.const 1', stack: ['9', '1'], desc: 'Push 1 bit shift amount' },
      { step: 5, op: 'i32.shr_u', stack: ['4'], desc: 'Bitwise shift right 9 >> 1 = 4 (mid index)' },
    ],
  },
];

export const WasmJitAstStudio: React.FC = () => {
  const [selectedAlgo, setSelectedAlgo] = useState<PresetAlgo>(PRESET_ALGOS[0]);
  const [activeSubTab, setActiveSubTab] = useState<'ast' | 'wat' | 'stack' | 'tokens'>('ast');
  const [currentStackIndex, setCurrentStackIndex] = useState<number>(0);

  const handleSelectAlgo = (algo: PresetAlgo) => {
    setSelectedAlgo(algo);
    setCurrentStackIndex(0);
    sound.playPop();
  };

  const handleStepForward = () => {
    if (currentStackIndex < selectedAlgo.stackSteps.length - 1) {
      setCurrentStackIndex((prev) => prev + 1);
      sound.playPop();
    }
  };

  const handleStepReset = () => {
    setCurrentStackIndex(0);
    sound.playSwoosh();
  };

  const currentStep = selectedAlgo.stackSteps[currentStackIndex];

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* Algorithm Preset Switcher */}
      <div className="p-4 rounded-2xl bg-[#0b101e] border-2 border-[#1c2642] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Choose Algorithm:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_ALGOS.map((algo) => (
              <button
                key={algo.id}
                onClick={() => handleSelectAlgo(algo)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  selectedAlgo.id === algo.id
                    ? 'bg-amber-400 text-slate-950 border-black shadow-comic-sm font-black'
                    : 'bg-[#141b2e] text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                {algo.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-bold">
            ⚡ {selectedAlgo.complexity}
          </span>
        </div>
      </div>

      {/* Main Grid: Code + High-Tech Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 Cols): Source Code Viewer */}
        <div className="lg:col-span-5 p-5 rounded-3xl bg-[#090d18] border-2 border-black shadow-comic space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Source Code (Python 3.12)
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">CPython Parser Input</span>
          </div>

          <pre className="p-4 rounded-2xl bg-[#04060c] border border-slate-850 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
            <code>{selectedAlgo.sourceCode}</code>
          </pre>

          {/* Compilation Pipeline Steps Indicator */}
          <div className="p-3.5 rounded-2xl bg-[#0e1424] border border-slate-800 space-y-2">
            <div className="text-[11px] font-bold text-slate-300 font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> JIT Compilation Stages:
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="px-2 py-1 rounded bg-[#182138] text-purple-300">1. Lexer</span>
              <span>➔</span>
              <span className="px-2 py-1 rounded bg-[#182138] text-cyan-300">2. AST</span>
              <span>➔</span>
              <span className="px-2 py-1 rounded bg-[#182138] text-amber-300">3. Wasm Bytecode</span>
              <span>➔</span>
              <span className="px-2 py-1 rounded bg-[#182138] text-emerald-300">4. Stack VM</span>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Tabbed High-Tech Visualizer */}
        <div className="lg:col-span-7 p-5 rounded-3xl bg-[#090d18] border-2 border-black shadow-comic space-y-4">
          {/* Visualizer Mode Tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex gap-1.5">
              {[
                { id: 'ast', label: '🌳 AST Tree', icon: Layers },
                { id: 'wat', label: '⚙️ Wasm WAT', icon: Cpu },
                { id: 'stack', label: '🥞 Stack VM', icon: Terminal },
                { id: 'tokens', label: '🏷️ Lexer Tokens', icon: Code2 },
              ].map((subTab) => (
                <button
                  key={subTab.id}
                  onClick={() => {
                    setActiveSubTab(subTab.id as any);
                    sound.playPop();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    activeSubTab === subTab.id
                      ? 'bg-cyan-400 text-slate-950 font-black shadow-comic-sm'
                      : 'bg-[#12182b] text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{subTab.label}</span>
                </button>
              ))}
            </div>

            <span className="text-[10px] font-mono text-emerald-400 font-bold hidden sm:inline">
              ✓ Validated
            </span>
          </div>

          {/* VIEW 1: AST Tree Explorer */}
          {activeSubTab === 'ast' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                The Abstract Syntax Tree captures nested grammatical structure without concrete punctuation:
              </p>

              <div className="p-4 rounded-2xl bg-[#04060c] border border-slate-850 font-mono text-xs space-y-2 max-h-80 overflow-y-auto">
                <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-200">
                  <span className="font-bold">{selectedAlgo.ast.label}</span>
                  <span className="text-[10px] text-slate-400 block">{selectedAlgo.ast.detail}</span>
                </div>

                {selectedAlgo.ast.children?.map((child, idx) => (
                  <div key={idx} className="ml-4 pl-3 border-l-2 border-cyan-500/40 space-y-2">
                    <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200">
                      <span className="font-bold">{child.label}</span>
                      <span className="text-[10px] text-slate-400 block">{child.detail}</span>
                    </div>

                    {child.children?.map((subChild, subIdx) => (
                      <div key={subIdx} className="ml-4 pl-3 border-l-2 border-amber-500/40 space-y-1.5">
                        <div className="p-2 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200">
                          <span className="font-bold">{subChild.label}</span>
                          <span className="text-[10px] text-slate-400 block">{subChild.detail}</span>
                        </div>

                        {subChild.children?.map((leaf: any, leafIdx: number) => (
                          <div key={leafIdx} className="ml-4 pl-3 border-l-2 border-emerald-500/40">
                            <div className="p-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-[11px]">
                              {leaf.label} • {leaf.detail}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 2: WebAssembly WAT Representation */}
          {activeSubTab === 'wat' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Compiled WebAssembly Text (WAT) representation with linear memory and i32 opcodes:
              </p>

              <pre className="p-4 rounded-2xl bg-[#04060c] border border-slate-850 font-mono text-xs text-cyan-300 max-h-80 overflow-y-auto leading-relaxed">
                <code>{selectedAlgo.wat.join('\n')}</code>
              </pre>
            </div>
          )}

          {/* VIEW 3: Interactive Virtual Stack Machine Step-Through */}
          {activeSubTab === 'stack' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white font-mono uppercase">
                    Step {currentStep.step} of {selectedAlgo.stackSteps.length}:{' '}
                    <span className="text-amber-300">{currentStep.op}</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 font-sans">{currentStep.desc}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleStepReset}
                    className="p-1.5 rounded-lg bg-[#141b2e] border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
                    title="Reset to step 1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleStepForward}
                    disabled={currentStackIndex >= selectedAlgo.stackSteps.length - 1}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs border border-black shadow-comic-sm cursor-pointer disabled:opacity-40 flex items-center gap-1"
                  >
                    Next Step <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Animated Stack Bucket */}
              <div className="p-4 rounded-2xl bg-[#04060c] border-2 border-slate-800 flex flex-col items-center justify-center min-h-[160px]">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                  ▲ Top of Operand Stack
                </div>

                {currentStep.stack.length === 0 ? (
                  <div className="text-xs text-slate-600 font-mono py-6">[ Stack is Empty ]</div>
                ) : (
                  <div className="flex flex-col-reverse gap-1.5 w-full max-w-xs">
                    {currentStep.stack.map((item, idx) => (
                      <div
                        key={idx}
                        className="py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-mono font-bold text-center border border-cyan-400 shadow-comic-sm animate-fadeIn"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}

                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-2 border-t border-slate-800 pt-1 w-full max-w-xs text-center">
                  ▼ Bottom of Stack (Memory Base)
                </div>
              </div>
            </div>
          )}

          {/* VIEW 4: Lexer Tokenizer Stream */}
          {activeSubTab === 'tokens' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Lexical analysis token stream produced before grammar reduction:
              </p>

              <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-[#04060c] border border-slate-850 font-mono text-xs max-h-80 overflow-y-auto">
                {selectedAlgo.tokens.map((tok, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center px-2.5 py-1.5 rounded-xl bg-[#0e1424] border border-slate-800 text-center"
                  >
                    <span className={`font-bold ${tok.color}`}>{tok.val}</span>
                    <span className="text-[8px] text-slate-500 uppercase tracking-wider">
                      {tok.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
