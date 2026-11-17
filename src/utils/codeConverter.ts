// High-Accuracy Bidirectional C++ <-> Python Code Converter & Template Generator
// Optimized for LeetCode & Striver's A2Z DSA Problem Schemas

import { SupportedLanguage } from './languageTemplates';

export interface ProblemMetadata {
  title?: string;
  difficulty?: string;
  subStep?: string;
  hint?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
}

/**
 * Generates an idiomatic, compilable starter template for any supported language.
 */
export function generateQuestionStarterCode(
  lang: SupportedLanguage,
  meta: ProblemMetadata
): string {
  const title = meta.title || 'DSA Problem Solution';
  const diff = meta.difficulty || 'Medium';
  const subStep = meta.subStep || 'Algorithm Masterclass';
  const tc = meta.timeComplexity || 'O(N)';
  const sc = meta.spaceComplexity || 'O(1)';
  const hint = meta.hint ? `Key Intuition: ${meta.hint}` : 'Optimal algorithmic approach.';

  switch (lang) {
    case 'python':
      return `# Striver's A2Z DSA Sheet: ${title}
# Difficulty: ${diff} | ${subStep}
# Time Complexity: ${tc} | Space Complexity: ${sc}
# ${hint}

from typing import List, Dict, Set, Optional
import collections
import heapq
import sys

class Solution:
    def solve(self) -> None:
        """
        Optimal solution implementation for ${title}.
        """
        print("Testing solution for ${title}...")

if __name__ == "__main__":
    sol = Solution()
    sol.solve()
`;

    case 'cpp':
      return `// Striver's A2Z DSA Sheet: ${title}
// Difficulty: ${diff} | ${subStep}
// Time Complexity: ${tc} | Space Complexity: ${sc}
// ${hint}

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <stack>
using namespace std;

class Solution {
public:
    void solve() {
        // Implement your optimal solution below:
        cout << "Testing solution for ${title}..." << endl;
    }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    Solution s;
    s.solve();
    return 0;
}
`;

    case 'java':
      return `// Striver's A2Z DSA Sheet: ${title}
// Difficulty: ${diff} | ${subStep}
// Time Complexity: ${tc} | Space Complexity: ${sc}
// ${hint}

import java.util.*;

public class Main {
    public static class Solution {
        public void solve() {
            // Implement your optimal solution below:
            System.out.println("Testing solution for ${title}...");
        }
    }

    public static void main(String[] args) {
        Solution s = new Solution();
        s.solve();
    }
}
`;

    case 'javascript':
      return `// Striver's A2Z DSA Sheet: ${title}
// Difficulty: ${diff} | ${subStep}
// Time Complexity: ${tc} | Space Complexity: ${sc}
// ${hint}

class Solution {
    /**
     * @return {void}
     */
    solve() {
        // Implement your optimal solution below:
        console.log("Testing solution for ${title}...");
    }
}

const sol = new Solution();
sol.solve();
`;

    case 'typescript':
      return `// Striver's A2Z DSA Sheet: ${title}
// Difficulty: ${diff} | ${subStep}
// Time Complexity: ${tc} | Space Complexity: ${sc}
// ${hint}

class Solution {
    solve(): void {
        // Implement your optimal solution below:
        console.log("Testing solution for ${title}...");
    }
}

const sol = new Solution();
sol.solve();
`;

    case 'c':
      return `// Striver's A2Z DSA Sheet: ${title}
// Difficulty: ${diff} | ${subStep}
// Time Complexity: ${tc} | Space Complexity: ${sc}
// ${hint}

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

void solve() {
    printf("Testing solution for ${title}...\\n");
}

int main() {
    solve();
    return 0;
}
`;

    case 'rust':
      return `// Striver's A2Z DSA Sheet: ${title}
// Difficulty: ${diff} | ${subStep}
// Time Complexity: ${tc} | Space Complexity: ${sc}
// ${hint}

struct Solution;

impl Solution {
    pub fn solve() {
        println!("Testing solution for ${title}...");
    }
}

fn main() {
    Solution::solve();
}
`;

    case 'go':
      return `// Striver's A2Z DSA Sheet: ${title}
// Difficulty: ${diff} | ${subStep}
// Time Complexity: ${tc} | Space Complexity: ${sc}
// ${hint}

package main

import "fmt"

func solve() {
    fmt.Println("Testing solution for ${title}...")
}

func main() {
    solve()
}
`;

    case 'sql':
      return `-- Striver's A2Z DSA Sheet: ${title}
-- Difficulty: ${diff} | ${subStep}
-- ${hint}

SELECT 'Testing solution for ${title}...' AS status;
`;

    default:
      return `# Solution for ${title}\nprint("Solution ready")\n`;
  }
}

/**
 * Intelligent C++ to Python Syntax Converter
 */
export function convertCppToPython(cppCode: string, title?: string): string {
  if (!cppCode || !cppCode.trim()) return '';

  let lines = cppCode.split('\n');
  let pyLines: string[] = [];
  let inClass = false;
  let inMethod = false;
  let indent = '';

  for (let rawLine of lines) {
    let line = rawLine.trim();

    // Skip C++ header includes and using namespace
    if (line.startsWith('#include') || line.startsWith('using namespace') || line.startsWith('#pragma')) {
      continue;
    }

    // Comments
    if (line.startsWith('//')) {
      pyLines.push(rawLine.replace('//', '#'));
      continue;
    }

    // Class Solution
    if (line.includes('class Solution')) {
      inClass = true;
      pyLines.push('class Solution:');
      continue;
    }

    if (line === 'public:' || line === 'private:' || line === 'protected:') {
      continue;
    }

    // Method detection (e.g. int solve(int n) or void solve())
    const methodMatch = line.match(/(?:int|void|bool|string|vector<[^>]+>|long\s+long)\s+([a-zA-Z0-9_]+)\s*\((.*)\)\s*\{?/);
    if (inClass && methodMatch && !line.includes('main()')) {
      const methodName = methodMatch[1];
      const rawParams = methodMatch[2];
      // Clean params
      const paramList = rawParams
        ? rawParams
            .split(',')
            .map((p) => p.trim().split(/\s+/).pop()?.replace(/&|\*/g, ''))
            .filter(Boolean)
        : [];

      const pyParams = ['self', ...paramList].join(', ');
      pyLines.push(`    def ${methodName}(${pyParams}):`);
      inMethod = true;
      continue;
    }

    // Ignore int main()
    if (line.includes('int main(') || line.includes('main()')) {
      pyLines.push('\nif __name__ == "__main__":');
      pyLines.push('    sol = Solution()');
      pyLines.push('    sol.solve()');
      break;
    }

    // Closing braces
    if (line === '};' || line === '}') {
      continue;
    }

    // Syntax replacements inside methods
    let converted = rawLine
      .replace(/cout\s*<<\s*([^;]+)\s*<<\s*endl\s*;/g, 'print($1)')
      .replace(/cout\s*<<\s*([^;]+);/g, 'print($1)')
      .replace(/;\s*$/g, '')
      .replace(/\btrue\b/g, 'True')
      .replace(/\bfalse\b/g, 'False')
      .replace(/\bNULL\b/g, 'None')
      .replace(/\bnullptr\b/g, 'None')
      .replace(/\bunordered_map<[^>]+>\s+([a-zA-Z0-9_]+)/g, '$1 = {}')
      .replace(/\bunordered_set<[^>]+>\s+([a-zA-Z0-9_]+)/g, '$1 = set()')
      .replace(/\bmap<[^>]+>\s+([a-zA-Z0-9_]+)/g, '$1 = {}')
      .replace(/\bset<[^>]+>\s+([a-zA-Z0-9_]+)/g, '$1 = set()')
      .replace(/\bvector<int>\s+([a-zA-Z0-9_]+)\s*=\s*\{([^}]+)\}/g, '$1 = [$2]')
      .replace(/\bvector<int>\s+([a-zA-Z0-9_]+)/g, '$1 = []')
      .replace(/\bvector<vector<int>>\s+([a-zA-Z0-9_]+)/g, '$1 = []')
      .replace(/\bfor\s*\(\s*int\s+([a-zA-Z0-9_]+)\s*=\s*0\s*;\s*\1\s*<\s*([^;]+)\s*;\s*\1\+\+\s*\)\s*\{?/g, 'for $1 in range($2):')
      .replace(/\bfor\s*\(\s*(?:int|auto|char)\s+([a-zA-Z0-9_]+)\s*:\s*([^)]+)\)\s*\{?/g, 'for $1 in $2:')
      .replace(/\belse\s+if\b/g, 'elif')
      .replace(/\s*&&\s*/g, ' and ')
      .replace(/\s*\|\|\s*/g, ' or ')
      .replace(/\bint\s+([a-zA-Z0-9_]+)\s*=\s*/g, '$1 = ')
      .replace(/\blong\s+long\s+([a-zA-Z0-9_]+)\s*=\s*/g, '$1 = ')
      .replace(/\bbool\s+([a-zA-Z0-9_]+)\s*=\s*/g, '$1 = ')
      .replace(/\bstring\s+([a-zA-Z0-9_]+)\s*=\s*/g, '$1 = ')
      .replace(/([a-zA-Z0-9_]+)\.size\(\)/g, 'len($1)')
      .replace(/([a-zA-Z0-9_]+)\.length\(\)/g, 'len($1)')
      .replace(/([a-zA-Z0-9_]+)\.push_back\(([^)]+)\)/g, '$1.append($2)')
      .replace(/([a-zA-Z0-9_]+)\.pop_back\(\)/g, '$1.pop()')
      .replace(/swap\(([a-zA-Z0-9_\[\]]+),\s*([a-zA-Z0-9_\[\]]+)\)/g, '$1, $2 = $2, $1')
      .replace(/max\(([^,]+),\s*([^)]+)\)/g, 'max($1, $2)')
      .replace(/min\(([^,]+),\s*([^)]+)\)/g, 'min($1, $2)');

    // Indentation adjustment
    if (inMethod) {
      if (!converted.startsWith('        ') && converted.trim().length > 0) {
        converted = '        ' + converted.trim();
      }
    }

    if (converted.trim().length > 0) {
      pyLines.push(converted);
    }
  }

  // Fallback if conversion produced nothing
  if (pyLines.length <= 3) {
    return generateQuestionStarterCode('python', { title });
  }

  return pyLines.join('\n') + '\n';
}

/**
 * Intelligent Python to C++ Syntax Converter
 */
export function convertPythonToCpp(pythonCode: string, title?: string): string {
  if (!pythonCode || !pythonCode.trim()) return '';

  let lines = pythonCode.split('\n');
  let cppLines: string[] = [
    '#include <iostream>',
    '#include <vector>',
    '#include <string>',
    '#include <algorithm>',
    '#include <unordered_map>',
    'using namespace std;\n',
    'class Solution {',
    'public:',
  ];

  let inMethod = false;

  for (let rawLine of lines) {
    let line = rawLine.trim();

    if (line.startsWith('from ') || line.startsWith('import ')) continue;

    if (line.startsWith('#')) {
      cppLines.push('    // ' + line.slice(1).trim());
      continue;
    }

    if (line.startsWith('class Solution:')) continue;

    // Method def (e.g. def solve(self, nums):)
    const defMatch = line.match(/def\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\):/);
    if (defMatch) {
      const methodName = defMatch[1];
      const params = defMatch[2]
        .split(',')
        .map((p) => p.trim())
        .filter((p) => p !== 'self' && p.length > 0)
        .map((p) => `int ${p}`)
        .join(', ');

      cppLines.push(`    void ${methodName}(${params}) {`);
      inMethod = true;
      continue;
    }

    if (line.startsWith('if __name__ ==')) break;

    // Syntax replacements
    let converted = line
      .replace(/print\((.*)\)/g, 'cout << $1 << endl;')
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false')
      .replace(/\bNone\b/g, 'nullptr')
      .replace(/\belif\b/g, 'else if')
      .replace(/\band\b/g, '&&')
      .replace(/\bor\b/g, '||')
      .replace(/\bnot\s+/g, '!')
      .replace(/for\s+([a-zA-Z0-9_]+)\s+in\s+range\(len\(([a-zA-Z0-9_]+)\)\):/g, 'for (int $1 = 0; $1 < $2.size(); $1++) {')
      .replace(/for\s+([a-zA-Z0-9_]+)\s+in\s+range\(([^)]+)\):/g, 'for (int $1 = 0; $1 < $2; $1++) {')
      .replace(/for\s+([a-zA-Z0-9_]+)\s+in\s+([a-zA-Z0-9_]+):/g, 'for (auto $1 : $2) {')
      .replace(/len\(([a-zA-Z0-9_]+)\)/g, '$1.size()')
      .replace(/([a-zA-Z0-9_]+)\.append\(([^)]+)\)/g, '$1.push_back($2)')
      .replace(/([a-zA-Z0-9_]+)\.pop\(\)/g, '$1.pop_back()');

    if (converted.length > 0) {
      if (!converted.endsWith(';') && !converted.endsWith('{') && !converted.endsWith('}')) {
        converted += ';';
      }
      cppLines.push('        ' + converted);
    }
  }

  cppLines.push('    }');
  cppLines.push('};\n');
  cppLines.push('int main() {');
  cppLines.push('    Solution s;');
  cppLines.push('    s.solve();');
  cppLines.push('    return 0;');
  cppLines.push('}\n');

  return cppLines.join('\n');
}

/**
 * Detect language of code snippet
 */
export function detectCodeLanguage(code: string): 'cpp' | 'python' | 'java' | 'other' {
  if (/#include\s*<|using\s+namespace\s+std;|std::|cout\s*<</.test(code)) return 'cpp';
  if (/def\s+[a-zA-Z0-9_]+\s*\(|import\s+sys|import\s+collections|class\s+Solution:/.test(code)) return 'python';
  if (/public\s+class|System\.out\.println|public\s+static\s+void\s+main/.test(code)) return 'java';
  return 'other';
}
