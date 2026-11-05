/**
 * VS Code Compiler Extensions Suite
 * 
 * Provides:
 * 1. PEP 8 / Code Formatter (Auto-Format)
 * 2. Error Lens & Live Syntax Linter (Bracket balancing, missing colons, Python syntax traps)
 * 3. Algorithmic Snippets & IntelliSense
 * 4. Custom Interactive I/O Runner
 * 5. Multi-language template engine
 */

export interface CodeDiagnostic {
  line: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
  rule: string;
}

export interface AlgorithmicSnippet {
  id: string;
  name: string;
  category: string;
  description: string;
  prefix: string;
  code: string;
}

export interface InstalledExtension {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  icon: string;
  enabled: boolean;
  category: 'Compiler' | 'Linter' | 'Formatter' | 'Snippets' | 'AI Assistant';
}

export const INSTALLED_EXTENSIONS: InstalledExtension[] = [
  {
    id: 'ext-pyodide',
    name: 'Python 3.12 WebAssembly Compiler',
    version: '0.26.4',
    author: 'Pyodide & Mozilla',
    description: 'In-browser Wasm execution engine for Python 3 with standard library support.',
    icon: '⚡',
    enabled: true,
    category: 'Compiler',
  },
  {
    id: 'ext-error-lens',
    name: 'Error Lens & Python Linter',
    version: '2.4.0',
    author: 'Algorithm Adventures',
    description: 'Real-time bracket matching, missing colon detection, and Python keyword diagnostics.',
    icon: '🔍',
    enabled: true,
    category: 'Linter',
  },
  {
    id: 'ext-prettier',
    name: 'Prettier Code Formatter (PEP 8)',
    version: '3.1.2',
    author: 'Prettier Dev Team',
    description: 'One-click auto-formatter enforcing 4-space indentation and clean operator spacing.',
    icon: '🎨',
    enabled: true,
    category: 'Formatter',
  },
  {
    id: 'ext-intellisense',
    name: 'DSA IntelliSense & Snippet Vault',
    version: '1.8.5',
    author: 'Prof. Algorismus',
    description: 'Ready-to-use snippets for Two Pointers, BFS, DFS, Sliding Window, Heap, and DP.',
    icon: '🔤',
    enabled: true,
    category: 'Snippets',
  },
  {
    id: 'ext-custom-io',
    name: 'Interactive Custom I/O & REPL',
    version: '2.0.1',
    author: 'Byte Studio',
    description: 'Run arbitrary arguments, view live stdout, measure execution time, and inspect memory.',
    icon: '🧪',
    enabled: true,
    category: 'Compiler',
  },
  {
    id: 'ext-copilot',
    name: 'Professor AI Live Copilot',
    version: '3.0.0',
    author: 'Google Gemini Pro',
    description: 'Context-aware algorithmic hints, Big-O proof engine, and Bugsy sabotage debugger.',
    icon: '🤖',
    enabled: true,
    category: 'AI Assistant',
  },
];

export const ALGORITHM_SNIPPETS: AlgorithmicSnippet[] = [
  {
    id: 'two-pointers',
    name: 'Two Pointers (Left & Right)',
    category: 'Arrays & Strings',
    description: 'Optimal O(N) sweep for sorted arrays, palindromes, and container water.',
    prefix: 'two_pointers',
    code: `# Two Pointers Pattern - O(N) Time, O(1) Space
left, right = 0, len(nums) - 1
while left < right:
    current_sum = nums[left] + nums[right]
    if current_sum == target:
        return [left, right]
    elif current_sum < target:
        left += 1
    else:
        right -= 1
return []`,
  },
  {
    id: 'sliding-window',
    name: 'Dynamic Sliding Window',
    category: 'Arrays & Substrings',
    description: 'Tracks contiguous subarrays or longest substrings with frequency map.',
    prefix: 'sliding_window',
    code: `# Dynamic Sliding Window - O(N) Time
window = {}
left = 0
max_len = 0

for right in range(len(s)):
    char = s[right]
    window[char] = window.get(char, 0) + 1
    
    # Contract window while invalid condition holds
    while len(window) > k:
        left_char = s[left]
        window[left_char] -= 1
        if window[left_char] == 0:
            del window[left_char]
        left += 1
        
    max_len = max(max_len, right - left + 1)
return max_len`,
  },
  {
    id: 'binary-search',
    name: 'Binary Search (Iterative)',
    category: 'Searching',
    description: 'O(log N) logarithmic search in sorted arrays with boundary guards.',
    prefix: 'binary_search',
    code: `# Binary Search Pattern - O(log N) Time, O(1) Space
low, high = 0, len(nums) - 1
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
    id: 'bfs-queue',
    name: 'Breadth-First Search (BFS)',
    category: 'Graphs & Trees',
    description: 'Level-order traversal and unweighted shortest path using collections.deque.',
    prefix: 'bfs_queue',
    code: `# BFS Graph Traversal - O(V + E) Time, O(V) Space
from collections import deque

queue = deque([start_node])
visited = {start_node}
distance = 0

while queue:
    level_size = len(queue)
    for _ in range(level_size):
        curr = queue.popleft()
        if curr == target:
            return distance
        for neighbor in graph.get(curr, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    distance += 1
return -1`,
  },
  {
    id: 'dfs-recursion',
    name: 'Depth-First Search (DFS)',
    category: 'Graphs & Trees',
    description: 'Exhaustive exploration, connected components, and cycle detection.',
    prefix: 'dfs_recursion',
    code: `# DFS Graph / Tree Traversal - O(V + E) Time
visited = set()

def dfs(node):
    if node in visited:
        return
    visited.add(node)
    for neighbor in graph.get(node, []):
        dfs(neighbor)

dfs(root_node)`,
  },
  {
    id: 'min-heap',
    name: 'Min-Heap / Top-K Elements',
    category: 'Heaps & Priority Queues',
    description: 'O(N log K) stream processing with Python heapq module.',
    prefix: 'min_heap',
    code: `# Min-Heap for Top-K Largest - O(N log K) Time, O(K) Space
import heapq

min_heap = []
for num in nums:
    heapq.heappush(min_heap, num)
    if len(min_heap) > k:
        heapq.heappop(min_heap)

return min_heap[0]  # kth largest element`,
  },
  {
    id: 'memoized-dp',
    name: 'Top-Down Memoized DP',
    category: 'Dynamic Programming',
    description: 'Subproblem caching with Python functools.lru_cache decorator.',
    prefix: 'memoized_dp',
    code: `# Top-Down DP with Memoization Cache
from functools import lru_cache

@lru_cache(maxsize=None)
def dp(i, remaining):
    # Base Cases
    if remaining == 0:
        return 0
    if remaining < 0 or i >= len(items):
        return float('inf')
        
    # Recurrence: Pick or Skip
    pick = 1 + dp(i, remaining - items[i])
    skip = dp(i + 1, remaining)
    
    return min(pick, skip)

result = dp(0, target)
return result if result != float('inf') else -1`,
  },
  {
    id: 'frequency-map',
    name: 'Frequency Counter Hash Map',
    category: 'Hashing',
    description: 'O(N) frequency tabulation using collections.Counter.',
    prefix: 'counter_map',
    code: `# Frequency Counter Pattern - O(N) Time, O(N) Space
from collections import Counter

counts = Counter(nums)
# counts[val] gives instant O(1) frequency lookups`,
  },
];

/**
 * Live Python Linter & Error Lens Analyzer
 */
export function lintPythonCode(code: string): CodeDiagnostic[] {
  const diagnostics: CodeDiagnostic[] = [];
  const lines = code.split('\n');

  // 1. Bracket balancing check
  const bracketStack: Array<{ char: string; line: number; col: number }> = [];
  const matchingPairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };

  lines.forEach((lineText, lineIdx) => {
    const lineNum = lineIdx + 1;
    const trimmed = lineText.trim();

    // Skip comment lines
    if (trimmed.startsWith('#')) return;

    // Check for missing colons in header statements
    const colonHeaders = /^(def\s+[a-zA-Z0-9_]+\s*\(.*?\)|class\s+[a-zA-Z0-9_]+(\(.*?\))?|if\s+.+|elif\s+.+|else|while\s+.+|for\s+.+\s+in\s+.+|try|except(\s+.+)?|finally|with\s+.+)$/;
    if (colonHeaders.test(trimmed) && !trimmed.endsWith(':')) {
      diagnostics.push({
        line: lineNum,
        message: `Syntax Error: Missing trailing colon ':' at end of header`,
        severity: 'error',
        rule: 'missing-colon',
      });
    }

    // Check for JavaScript syntax slip-ups (common student traps)
    if (/\blet\s+|\bconst\s+|\bvar\s+/.test(trimmed)) {
      diagnostics.push({
        line: lineNum,
        message: `JavaScript syntax detected ('let/const/var'). Python uses direct variable assignment (e.g. x = 0).`,
        severity: 'error',
        rule: 'invalid-keyword',
      });
    }

    if (/\.length\b/.test(trimmed) && !trimmed.startsWith('#')) {
      diagnostics.push({
        line: lineNum,
        message: `Use len(object) instead of '.length' in Python.`,
        severity: 'warning',
        rule: 'use-len',
      });
    }

    if (/\bpush\s*\(/.test(trimmed)) {
      diagnostics.push({
        line: lineNum,
        message: `Use .append() instead of .push() for Python lists.`,
        severity: 'warning',
        rule: 'use-append',
      });
    }

    if (/\btrue\b|\bfalse\b|\bnull\b/.test(trimmed)) {
      diagnostics.push({
        line: lineNum,
        message: `Python keywords are capitalized: 'True', 'False', and 'None'.`,
        severity: 'warning',
        rule: 'capitalize-booleans',
      });
    }

    // Bracket scanner (ignoring string contents)
    let inString: string | null = null;
    for (let colIdx = 0; colIdx < lineText.length; colIdx++) {
      const char = lineText[colIdx];

      if ((char === '"' || char === "'") && (colIdx === 0 || lineText[colIdx - 1] !== '\\')) {
        if (!inString) inString = char;
        else if (inString === char) inString = null;
        continue;
      }

      if (inString) continue;

      if (char === '(' || char === '[' || char === '{') {
        bracketStack.push({ char, line: lineNum, col: colIdx + 1 });
      } else if (char === ')' || char === ']' || char === '}') {
        const expected = matchingPairs[char];
        if (bracketStack.length === 0) {
          diagnostics.push({
            line: lineNum,
            message: `Syntax Error: Unmatched closing '${char}'`,
            severity: 'error',
            rule: 'unmatched-bracket',
          });
        } else {
          const top = bracketStack.pop()!;
          if (top.char !== expected) {
            diagnostics.push({
              line: lineNum,
              message: `Mismatched brackets: Opened '${top.char}' on line ${top.line}, but closed with '${char}' on line ${lineNum}`,
              severity: 'error',
              rule: 'mismatched-bracket',
            });
          }
        }
      }
    }
  });

  // Report unclosed brackets
  while (bracketStack.length > 0) {
    const unclosed = bracketStack.pop()!;
    diagnostics.push({
      line: unclosed.line,
      message: `Syntax Error: Unclosed bracket '${unclosed.char}' opened on line ${unclosed.line}`,
      severity: 'error',
      rule: 'unclosed-bracket',
    });
  }

  return diagnostics;
}

/**
 * PEP 8 Code Formatter for Python (Auto-Format)
 */
export function formatPythonCode(code: string): string {
  if (!code) return '';

  const lines = code.split('\n');
  const formattedLines: string[] = [];
  let inMultiString = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check multiline strings
    if (line.includes('"""') || line.includes("'''")) {
      inMultiString = !inMultiString;
    }

    if (inMultiString) {
      formattedLines.push(line);
      continue;
    }

    // Strip trailing whitespace
    let formatted = line.trimEnd();

    // Preserve empty lines
    if (formatted.trim() === '') {
      formattedLines.push('');
      continue;
    }

    // Replace tabs with 4 spaces
    const leadingWhitespaceMatch = formatted.match(/^(\s*)/);
    const leadingWhitespace = leadingWhitespaceMatch ? leadingWhitespaceMatch[1] : '';
    const spacesCount = leadingWhitespace.replace(/\t/g, '    ').length;
    const normalizedIndent = ' '.repeat(spacesCount);
    const body = formatted.trim();

    // Space after colons in dictionaries or statements (not double colon ::)
    let spacedBody = body
      .replace(/([^:\s]):([^\s:])/g, '$1: $2') // colons with space after
      .replace(/,([^\s])/g, ', $1'); // commas with space after

    // Spacing around binary operators if not already spaced
    // E.g. x=5 -> x = 5, but ignore ==, !=, <=, >=, +=, -=
    spacedBody = spacedBody
      .replace(/([a-zA-Z0-9_])\s*([+\-*/%])\s*([a-zA-Z0-9_])/g, '$1 $2 $3')
      .replace(/([a-zA-Z0-9_])\s*(==|!=|<=|>=|\+=|-=|\*=|\/=)\s*([a-zA-Z0-9_])/g, '$1 $2 $3');

    formattedLines.push(normalizedIndent + spacedBody);
  }

  // Remove multiple consecutive blank lines
  return formattedLines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd() + '\n';
}
