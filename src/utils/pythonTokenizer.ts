/**
 * Python Tokenizer & Syntax Highlighter for VS Code Studio
 * 
 * High-performance regex tokenizer that extracts Python lexical tokens:
 * - Keywords (def, return, class, if, for, while, in, lambda, etc.)
 * - Built-in functions (len, range, print, enumerate, min, max, etc.)
 * - Function & Class declarations
 * - Constants (True, False, None) and self
 * - Numbers (integers, floats, scientific)
 * - Strings (single, double, f-strings, docstrings)
 * - Comments (# ...)
 * - Operators (+, -, *, /, ==, !=, ->, etc.)
 * - Inline diagnostic squiggly errors (let/const traps, .length, missing colons, unbalanced brackets)
 */

import { CodeDiagnostic } from './codeExtensions';

export type TokenType =
  | 'keyword'
  | 'builtin'
  | 'func-name'
  | 'class-name'
  | 'constant'
  | 'self'
  | 'string'
  | 'number'
  | 'comment'
  | 'operator'
  | 'punctuation'
  | 'identifier'
  | 'error-trap'
  | 'warning-trap'
  | 'whitespace'
  | 'text';

export interface Token {
  text: string;
  type: TokenType;
  error?: string;
  warning?: string;
}

export interface IntelliSenseItem {
  label: string;
  kind: 'keyword' | 'function' | 'method' | 'constant' | 'snippet';
  detail: string;
  documentation?: string;
  insertText: string;
  cursorOffset?: number; // Offset from start of insertText where cursor should go
}

export const INTELLISENSE_ITEMS: IntelliSenseItem[] = [
  // Python Keywords
  { label: 'def', kind: 'keyword', detail: 'def function_name(args):', insertText: 'def ():', cursorOffset: 4 },
  { label: 'return', kind: 'keyword', detail: 'return [value]', insertText: 'return ' },
  { label: 'if', kind: 'keyword', detail: 'if condition:', insertText: 'if :' },
  { label: 'elif', kind: 'keyword', detail: 'elif condition:', insertText: 'elif :' },
  { label: 'else', kind: 'keyword', detail: 'else:', insertText: 'else:\n    ' },
  { label: 'for', kind: 'keyword', detail: 'for item in iterable:', insertText: 'for  in :' },
  { label: 'while', kind: 'keyword', detail: 'while condition:', insertText: 'while :' },
  { label: 'in', kind: 'keyword', detail: 'in [collection]', insertText: 'in ' },
  { label: 'class', kind: 'keyword', detail: 'class ClassName:', insertText: 'class :' },
  { label: 'import', kind: 'keyword', detail: 'import [module]', insertText: 'import ' },
  { label: 'from', kind: 'keyword', detail: 'from [module] import [name]', insertText: 'from  import ' },
  { label: 'lambda', kind: 'keyword', detail: 'lambda args: expr', insertText: 'lambda : ' },
  { label: 'pass', kind: 'keyword', detail: 'pass (null operation)', insertText: 'pass' },
  { label: 'break', kind: 'keyword', detail: 'break (exit loop)', insertText: 'break' },
  { label: 'continue', kind: 'keyword', detail: 'continue (next iteration)', insertText: 'continue' },
  { label: 'yield', kind: 'keyword', detail: 'yield [value]', insertText: 'yield ' },
  { label: 'raise', kind: 'keyword', detail: 'raise Exception()', insertText: 'raise ' },
  { label: 'try', kind: 'keyword', detail: 'try ... except', insertText: 'try:\n    \nexcept Exception as e:\n    ' },
  { label: 'except', kind: 'keyword', detail: 'except Exception as e:', insertText: 'except Exception as e:' },
  { label: 'finally', kind: 'keyword', detail: 'finally block', insertText: 'finally:\n    ' },
  { label: 'with', kind: 'keyword', detail: 'with context_manager as name:', insertText: 'with  as :' },
  { label: 'and', kind: 'keyword', detail: 'logical and', insertText: 'and ' },
  { label: 'or', kind: 'keyword', detail: 'logical or', insertText: 'or ' },
  { label: 'not', kind: 'keyword', detail: 'logical not', insertText: 'not ' },
  { label: 'is', kind: 'keyword', detail: 'identity comparison', insertText: 'is ' },

  // Constants & Identifiers
  { label: 'True', kind: 'constant', detail: 'Boolean True', insertText: 'True' },
  { label: 'False', kind: 'constant', detail: 'Boolean False', insertText: 'False' },
  { label: 'None', kind: 'constant', detail: 'Python null object', insertText: 'None' },
  { label: 'self', kind: 'constant', detail: 'Current class instance reference', insertText: 'self' },

  // Built-in Functions
  { label: 'len', kind: 'function', detail: 'len(s) -> int', documentation: 'Returns length of string, list, tuple, or dict.', insertText: 'len()', cursorOffset: 4 },
  { label: 'range', kind: 'function', detail: 'range(stop) or range(start, stop[, step])', insertText: 'range()', cursorOffset: 6 },
  { label: 'print', kind: 'function', detail: 'print(*values)', insertText: 'print()', cursorOffset: 6 },
  { label: 'enumerate', kind: 'function', detail: 'enumerate(iterable, start=0)', insertText: 'enumerate()', cursorOffset: 10 },
  { label: 'zip', kind: 'function', detail: 'zip(*iterables)', insertText: 'zip()', cursorOffset: 4 },
  { label: 'sorted', kind: 'function', detail: 'sorted(iterable, key=None, reverse=False)', insertText: 'sorted()', cursorOffset: 7 },
  { label: 'min', kind: 'function', detail: 'min(arg1, arg2, *args)', insertText: 'min()', cursorOffset: 4 },
  { label: 'max', kind: 'function', detail: 'max(arg1, arg2, *args)', insertText: 'max()', cursorOffset: 4 },
  { label: 'sum', kind: 'function', detail: 'sum(iterable, start=0)', insertText: 'sum()', cursorOffset: 4 },
  { label: 'abs', kind: 'function', detail: 'abs(x) -> absolute value', insertText: 'abs()', cursorOffset: 4 },
  { label: 'list', kind: 'function', detail: 'list([iterable])', insertText: 'list()' },
  { label: 'dict', kind: 'function', detail: 'dict() -> empty hash map', insertText: 'dict()' },
  { label: 'set', kind: 'function', detail: 'set() -> empty unique set', insertText: 'set()' },
  { label: 'tuple', kind: 'function', detail: 'tuple([iterable])', insertText: 'tuple()' },
  { label: 'int', kind: 'function', detail: 'int(x) -> integer', insertText: 'int()' },
  { label: 'str', kind: 'function', detail: 'str(object) -> string', insertText: 'str()' },
  { label: 'float', kind: 'function', detail: 'float(x) -> float', insertText: 'float()' },
  { label: 'bool', kind: 'function', detail: 'bool(x) -> boolean', insertText: 'bool()' },
  { label: 'reversed', kind: 'function', detail: 'reversed(sequence)', insertText: 'reversed()' },
  { label: 'any', kind: 'function', detail: 'any(iterable) -> bool', insertText: 'any()' },
  { label: 'all', kind: 'function', detail: 'all(iterable) -> bool', insertText: 'all()' },
  { label: 'map', kind: 'function', detail: 'map(function, iterable)', insertText: 'map()' },
  { label: 'filter', kind: 'function', detail: 'filter(function, iterable)', insertText: 'filter()' },

  // Common Methods
  { label: 'append', kind: 'method', detail: 'list.append(x)', insertText: 'append()', cursorOffset: 7 },
  { label: 'pop', kind: 'method', detail: 'list.pop([index]) / dict.pop(key)', insertText: 'pop()' },
  { label: 'get', kind: 'method', detail: 'dict.get(key, default=None)', insertText: 'get(, )', cursorOffset: 4 },
  { label: 'items', kind: 'method', detail: 'dict.items() -> (key, val) pairs', insertText: 'items()' },
  { label: 'keys', kind: 'method', detail: 'dict.keys()', insertText: 'keys()' },
  { label: 'values', kind: 'method', detail: 'dict.values()', insertText: 'values()' },
  { label: 'add', kind: 'method', detail: 'set.add(elem)', insertText: 'add()', cursorOffset: 4 },
  { label: 'remove', kind: 'method', detail: 'set.remove(elem) / list.remove(x)', insertText: 'remove()' },
  { label: 'join', kind: 'method', detail: 'separator.join(iterable)', insertText: 'join()' },
  { label: 'split', kind: 'method', detail: 'string.split(sep=None)', insertText: 'split()' },
  { label: 'sort', kind: 'method', detail: 'list.sort(key=None, reverse=False)', insertText: 'sort()' },
  { label: 'startswith', kind: 'method', detail: 'string.startswith(prefix)', insertText: 'startswith()' },
  { label: 'endswith', kind: 'method', detail: 'string.endswith(suffix)', insertText: 'endswith()' },

  // Algorithmic Snippets
  {
    label: 'two_pointers',
    kind: 'snippet',
    detail: 'DSA: Two Pointers Template (O(N))',
    insertText: `left, right = 0, len(nums) - 1
while left < right:
    # Logic here
    left += 1
    right -= 1`,
  },
  {
    label: 'sliding_window',
    kind: 'snippet',
    detail: 'DSA: Sliding Window Subarray Template',
    insertText: `window = {}
left = 0
for right in range(len(nums)):
    # expand
    while condition:
        # shrink
        left += 1`,
  },
  {
    label: 'binary_search',
    kind: 'snippet',
    detail: 'DSA: Binary Search Template O(log N)',
    insertText: `low, high = 0, len(nums) - 1
while low <= high:
    mid = low + (high - low) // 2
    if nums[mid] == target:
        return mid
    elif nums[mid] < target:
        low = mid + 1
    else:
        high = mid - 1
return -1`,
  },
  {
    label: 'frequency_map',
    kind: 'snippet',
    detail: 'DSA: Hash Map Counter Template',
    insertText: `counts = {}
for item in nums:
    counts[item] = counts.get(item, 0) + 1`,
  },
];

const PYTHON_KEYWORDS = new Set([
  'def', 'class', 'return', 'if', 'elif', 'else', 'while', 'for', 'in',
  'import', 'from', 'lambda', 'yield', 'pass', 'break', 'continue', 'raise',
  'assert', 'try', 'except', 'finally', 'with', 'as', 'global', 'nonlocal',
  'async', 'await', 'and', 'or', 'not', 'is',
]);

const PYTHON_BUILTINS = new Set([
  'print', 'len', 'range', 'enumerate', 'zip', 'sorted', 'min', 'max', 'sum',
  'abs', 'map', 'filter', 'list', 'dict', 'set', 'tuple', 'int', 'str',
  'float', 'bool', 'reversed', 'any', 'all', 'type', 'isinstance', 'input',
  'open', 'round', 'pow', 'chr', 'ord', 'id', 'iter', 'next', 'bin', 'hex',
]);

const PYTHON_CONSTANTS = new Set(['True', 'False', 'None']);

/**
 * Tokenize a single line of Python code with error annotations
 */
export function tokenizePythonLine(
  line: string,
  lineNum: number,
  diagnostics: CodeDiagnostic[]
): Token[] {
  const tokens: Token[] = [];
  if (line.length === 0) {
    return [{ text: ' ', type: 'whitespace' }];
  }

  // Find diagnostics relevant to this line
  const lineDiags = diagnostics.filter(d => d.line === lineNum);
  const missingColonDiag = lineDiags.find(d => d.rule === 'missing-colon');
  const bracketDiag = lineDiags.find(
    d => d.rule === 'unmatched-bracket' || d.rule === 'mismatched-bracket' || d.rule === 'unclosed-bracket'
  );

  let i = 0;
  const len = line.length;

  while (i < len) {
    const char = line[i];

    // 1. Whitespace (indentation, spaces, tabs)
    if (/\s/.test(char)) {
      let ws = '';
      while (i < len && /\s/.test(line[i])) {
        ws += line[i];
        i++;
      }
      tokens.push({ text: ws, type: 'whitespace' });
      continue;
    }

    // 2. Comments (# to end of line)
    if (char === '#') {
      const commentText = line.substring(i);
      tokens.push({ text: commentText, type: 'comment' });
      i = len;
      break;
    }

    // 3. String literals ("...", '...', f"...", f'...')
    if (char === '"' || char === "'" || ((char === 'f' || char === 'r' || char === 'b') && (line[i + 1] === '"' || line[i + 1] === "'"))) {
      let isPrefixed = false;
      let quoteChar = char;
      let stringStart = i;

      if (char === 'f' || char === 'r' || char === 'b') {
        isPrefixed = true;
        quoteChar = line[i + 1];
        i += 2;
      } else {
        i += 1;
      }

      // Check triple quotes
      const isTriple = line.substring(i - 1, i + 2) === quoteChar.repeat(3);
      if (isTriple) {
        i += 2;
        const closingIndex = line.indexOf(quoteChar.repeat(3), i);
        if (closingIndex !== -1) {
          i = closingIndex + 3;
        } else {
          i = len;
        }
      } else {
        while (i < len) {
          if (line[i] === '\\' && i + 1 < len) {
            i += 2; // skip escaped char
            continue;
          }
          if (line[i] === quoteChar) {
            i += 1;
            break;
          }
          i++;
        }
      }

      tokens.push({ text: line.substring(stringStart, i), type: 'string' });
      continue;
    }

    // 4. Numbers (decimal, float, hex, scientific)
    if (/\d/.test(char) || (char === '.' && i + 1 < len && /\d/.test(line[i + 1]))) {
      const numMatch = line.substring(i).match(/^(\d+(\.\d+)?([eE][+-]?\d+)?|0[xX][0-9a-fA-F]+)/);
      if (numMatch) {
        tokens.push({ text: numMatch[0], type: 'number' });
        i += numMatch[0].length;
        continue;
      }
    }

    // 5. Operators & Arrows (==, !=, <=, >=, ->, +=, -=, //, **, etc.)
    const opMatch = line.substring(i).match(/^(==|!=|<=|>=|\+=|-=|\*=|\/=|(\/\/)=|%=|->|\*\*|\/\/|[+\-*/%<>=&|^~])/);
    if (opMatch) {
      tokens.push({ text: opMatch[0], type: 'operator' });
      i += opMatch[0].length;
      continue;
    }

    // 6. Delimiters (brackets, parens, colons, commas)
    if (/[()[\]{},.:;]/.test(char)) {
      // Bracket error check
      let error: string | undefined = undefined;
      if (bracketDiag && /[()[\]{}]/.test(char)) {
        error = bracketDiag.message;
      }

      tokens.push({
        text: char,
        type: error ? 'error-trap' : 'punctuation',
        error,
      });
      i++;
      continue;
    }

    // 7. Words / Identifiers / Keywords / Student Traps
    const wordMatch = line.substring(i).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    if (wordMatch) {
      const word = wordMatch[0];
      const wordLen = word.length;

      // Check for JavaScript Traps (let, const, var, push)
      if (word === 'let' || word === 'const' || word === 'var') {
        tokens.push({
          text: word,
          type: 'error-trap',
          error: `Syntax Error: '${word}' is JavaScript. Python uses direct assignment (e.g. x = 0).`,
        });
        i += wordLen;
        continue;
      }

      // Check for uncapitalized booleans/null
      if (word === 'true' || word === 'false' || word === 'null') {
        tokens.push({
          text: word,
          type: 'warning-trap',
          warning: `Python uses '${word === 'null' ? 'None' : word[0].toUpperCase() + word.slice(1)}' (capitalized).`,
        });
        i += wordLen;
        continue;
      }

      // Check for .length trap
      if (word === 'length' && i > 0 && line[i - 1] === '.') {
        tokens.push({
          text: word,
          type: 'warning-trap',
          warning: `Use len(object) instead of '.length' in Python.`,
        });
        i += wordLen;
        continue;
      }

      // Check if function name following 'def '
      const beforeText = line.substring(0, i).trimEnd();
      if (beforeText.endsWith('def')) {
        tokens.push({ text: word, type: 'func-name' });
        i += wordLen;
        continue;
      }

      // Check if class name following 'class '
      if (beforeText.endsWith('class')) {
        tokens.push({ text: word, type: 'class-name' });
        i += wordLen;
        continue;
      }

      // Keyword check
      if (PYTHON_KEYWORDS.has(word)) {
        tokens.push({ text: word, type: 'keyword' });
        i += wordLen;
        continue;
      }

      // Built-in check
      if (PYTHON_BUILTINS.has(word)) {
        tokens.push({ text: word, type: 'builtin' });
        i += wordLen;
        continue;
      }

      // Constants
      if (PYTHON_CONSTANTS.has(word)) {
        tokens.push({ text: word, type: 'constant' });
        i += wordLen;
        continue;
      }

      // Special 'self' or 'cls'
      if (word === 'self' || word === 'cls') {
        tokens.push({ text: word, type: 'self' });
        i += wordLen;
        continue;
      }

      // Regular identifier
      tokens.push({ text: word, type: 'identifier' });
      i += wordLen;
      continue;
    }

    // Default fallback single character
    tokens.push({ text: char, type: 'text' });
    i++;
  }

  // If missing colon on this header line, mark the last non-whitespace token with squiggly error
  if (missingColonDiag && tokens.length > 0) {
    for (let k = tokens.length - 1; k >= 0; k--) {
      if (tokens[k].type !== 'whitespace' && tokens[k].type !== 'comment') {
        tokens[k].error = missingColonDiag.message;
        tokens[k].type = 'error-trap';
        break;
      }
    }
  }

  return tokens;
}

/**
 * Returns Tailwind CSS classes for the given token type and diagnostics
 */
export function getTokenClassName(type: TokenType, error?: string, warning?: string): string {
  if (error) {
    return 'text-rose-300 underline decoration-wavy decoration-rose-500 decoration-2 bg-rose-500/15 rounded-xs font-semibold cursor-help';
  }
  if (warning) {
    return 'text-amber-200 underline decoration-wavy decoration-amber-400 decoration-1 bg-amber-400/10 rounded-xs cursor-help';
  }

  switch (type) {
    case 'keyword':
      return 'text-[#C586C0] font-bold'; // Vibrant VS Code Magenta
    case 'builtin':
      return 'text-[#DCDCAA] font-medium'; // Golden Canary Yellow
    case 'func-name':
      return 'text-[#DCDCAA] font-bold underline decoration-[#DCDCAA]/30'; // Highlighted Function Header
    case 'class-name':
      return 'text-[#4EC9B0] font-bold'; // Emerald Teal
    case 'constant':
      return 'text-[#569CD6] font-bold'; // Electric Blue
    case 'self':
      return 'text-[#9CDCFE] italic'; // Cyan
    case 'string':
      return 'text-[#CE9178]'; // Warm Salmon Coral
    case 'number':
      return 'text-[#B5CEA8] font-mono'; // Soft Mint Green
    case 'comment':
      return 'text-[#6A9955] italic select-none'; // Olive Green
    case 'operator':
      return 'text-[#38BDF8]'; // Sky Blue
    case 'punctuation':
      return 'text-[#94A3B8]'; // Slate Delimiters
    case 'identifier':
      return 'text-[#E2E8F0]'; // Light Slate
    case 'error-trap':
      return 'text-rose-400 underline decoration-wavy decoration-rose-500 font-bold';
    case 'warning-trap':
      return 'text-amber-300 underline decoration-wavy decoration-amber-400';
    case 'whitespace':
    case 'text':
    default:
      return 'text-[#E2E8F0]';
  }
}
