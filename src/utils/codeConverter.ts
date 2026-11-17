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
export function convertCppToPython(cppCode: string, title: string = 'Solution'): string {
  if (!cppCode || !cppCode.trim()) return '';

  const lines = cppCode.split('\n');
  const pyLines: string[] = [];
  const headerComments: string[] = [];
  let inClass = false;
  let inMethod = false;

  for (let rawLine of lines) {
    let line = rawLine.trim();

    // Preserve comments as Python comments
    if (line.startsWith('//')) {
      headerComments.push('# ' + line.slice(2).trim());
      continue;
    }

    // Skip C++ header includes and namespaces
    if (
      line.startsWith('#include') ||
      line.startsWith('using namespace') ||
      line.startsWith('#pragma') ||
      line.startsWith('ios_base::') ||
      line.startsWith('cin.tie')
    ) {
      continue;
    }

    // Class Solution declaration
    if (line.includes('class Solution')) {
      inClass = true;
      continue;
    }

    if (line === 'public:' || line === 'private:' || line === 'protected:') {
      continue;
    }

    // Method detection with return type and parameters
    const methodMatch = line.match(
      /(?:(?:public|private|static)\s+)?(int|void|bool|string|vector<[^>]+>|long\s+long|double)\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*\{?/
    );
    if (inClass && methodMatch && !line.includes('main()')) {
      const returnType = methodMatch[1].trim();
      const methodName = methodMatch[2].trim();
      const rawParams = methodMatch[3].trim();

      const params: string[] = ['self'];
      if (rawParams) {
        for (const p of rawParams.split(',')) {
          const parts = p.trim().split(/\s+/);
          const paramName = parts.pop()?.replace(/&|\*/g, '') || '';
          const paramType = parts.join(' ').replace(/&|\*/g, '');
          let pyType = 'int';
          if (paramType.includes('vector<int>')) pyType = 'List[int]';
          else if (paramType.includes('vector<vector<int>>')) pyType = 'List[List[int]]';
          else if (paramType.includes('string')) pyType = 'str';
          else if (paramType.includes('bool')) pyType = 'bool';
          params.push(paramName + (paramType ? `: ${pyType}` : ''));
        }
      }

      let pyRet = 'None';
      if (returnType === 'int') pyRet = 'int';
      else if (returnType === 'bool') pyRet = 'bool';
      else if (returnType === 'string') pyRet = 'str';
      else if (returnType.includes('vector')) pyRet = 'List[int]';

      pyLines.push(`    def ${methodName}(${params.join(', ')}) -> ${pyRet}:`);
      inMethod = true;
      continue;
    }

    // Stop before int main()
    if (line.includes('int main(') || line.includes('main()')) {
      break;
    }

    // Class closing braces
    if (line === '};' || (line === '}' && !inMethod)) {
      inClass = false;
      continue;
    }

    if (line === '}') {
      continue;
    }

    // Code transformations
    let conv = line;

    // For loops: for (int i = start; i <= end; i++)
    conv = conv.replace(
      /for\s*\(\s*(?:int|long\s+long|auto)\s+([a-zA-Z0-9_]+)\s*=\s*([^;]+);\s*\1\s*<=\s*([^;]+);\s*\1\+\+\s*\)\s*\{?/g,
      'for $1 in range($2, ($3) + 1):'
    );
    // For loops: for (int i = start; i < end; i++)
    conv = conv.replace(
      /for\s*\(\s*(?:int|long\s+long|auto)\s+([a-zA-Z0-9_]+)\s*=\s*([^;]+);\s*\1\s*<\s*([^;]+);\s*\1\+\+\s*\)\s*\{?/g,
      'for $1 in range($2, $3):'
    );
    // For-each loops: for (auto x : arr)
    conv = conv.replace(
      /for\s*\(\s*(?:int|auto|const\s+auto&|char)\s+([a-zA-Z0-9_]+)\s*:\s*([^)]+)\)\s*\{?/g,
      'for $1 in $2:'
    );

    // If-else statements
    const ifSingleReturn = conv.match(/if\s*\((.*)\)\s*return\s+(.*);?/);
    if (ifSingleReturn) {
      conv = `if ${ifSingleReturn[1]}:\n            return ${ifSingleReturn[2].replace(/;$/, '')}`;
    } else {
      conv = conv.replace(/if\s*\((.*)\)\s*\{?/g, 'if $1:');
      conv = conv.replace(/else\s+if\s*\((.*)\)\s*\{?/g, 'elif $1:');
      conv = conv.replace(/else\s*\{?/g, 'else:');
    }

    // While loops
    conv = conv.replace(/while\s*\((.*)\)\s*\{?/g, 'while $1:');

    // Print statements
    conv = conv.replace(/cout\s*<<\s*(.*?)\s*<<\s*endl\s*;?/g, 'print($1)');
    conv = conv.replace(/cout\s*<<\s*(.*?);/g, 'print($1)');

    // Literals and logical operators
    conv = conv.replace(/\btrue\b/g, 'True');
    conv = conv.replace(/\bfalse\b/g, 'False');
    conv = conv.replace(/\bNULL\b/g, 'None');
    conv = conv.replace(/\bnullptr\b/g, 'None');
    conv = conv.replace(/\s*&&\s*/g, ' and ');
    conv = conv.replace(/\s*\|\|\s*/g, ' or ');
    conv = conv.replace(/!([a-zA-Z0-9_]+)/g, 'not $1');

    // Variable declarations
    conv = conv.replace(/\b(?:int|long\s+long|bool|string|double|auto)\s+([a-zA-Z0-9_]+)\s*=\s*/g, '$1 = ');

    // 1D and 2D vectors
    conv = conv.replace(/vector<int>\s+([a-zA-Z0-9_]+)\s*\(([^,]+),\s*([^)]+)\)/g, '$1 = [$3] * $2');
    conv = conv.replace(
      /vector<vector<int>>\s+([a-zA-Z0-9_]+)\s*\(([^,]+),\s*vector<int>\(([^,]+),\s*([^)]+)\)\)/g,
      '$1 = [[$4] * $3 for _ in range($2)]'
    );
    conv = conv.replace(/\bvector<int>\s+([a-zA-Z0-9_]+)\s*=\s*\{([^}]+)\}/g, '$1 = [$2]');
    conv = conv.replace(/\bvector<int>\s+([a-zA-Z0-9_]+)/g, '$1 = []');

    // Hash collections
    conv = conv.replace(/\bunordered_map<[^>]+>\s+([a-zA-Z0-9_]+)/g, '$1 = {}');
    conv = conv.replace(/\bunordered_set<[^>]+>\s+([a-zA-Z0-9_]+)/g, '$1 = set()');
    conv = conv.replace(/\bmap<[^>]+>\s+([a-zA-Z0-9_]+)/g, '$1 = {}');
    conv = conv.replace(/\bset<[^>]+>\s+([a-zA-Z0-9_]+)/g, '$1 = set()');

    // Methods
    conv = conv.replace(/([a-zA-Z0-9_]+)\.size\(\)/g, 'len($1)');
    conv = conv.replace(/([a-zA-Z0-9_]+)\.length\(\)/g, 'len($1)');
    conv = conv.replace(/([a-zA-Z0-9_]+)\.push_back\(([^)]+)\)/g, '$1.append($2)');
    conv = conv.replace(/([a-zA-Z0-9_]+)\.pop_back\(\)/g, '$1.pop()');
    conv = conv.replace(/swap\(([a-zA-Z0-9_\[\]]+),\s*([a-zA-Z0-9_\[\]]+)\)/g, '$1, $2 = $2, $1');

    // Semicolons and brackets cleanup
    conv = conv.replace(/;\s*$/g, '');
    conv = conv.replace(/\{$/, '');

    if (conv.trim().length > 0) {
      const splitSub = conv.split('\n');
      for (let s of splitSub) {
        let trimmed = s.trim();
        if (trimmed.length > 0) {
          pyLines.push('        ' + trimmed);
        }
      }
    }
  }

  const result: string[] = [];
  if (headerComments.length > 0) {
    result.push(headerComments.join('\n'));
    result.push('');
  }
  result.push('from typing import List, Dict, Set, Optional, Tuple');
  result.push('import collections');
  result.push('import heapq');
  result.push('import sys\n');
  result.push('class Solution:');
  if (pyLines.length === 0) {
    result.push('    def solve(self) -> None:');
    result.push(`        print("Testing solution for ${title}...")`);
  } else {
    result.push(...pyLines);
  }
  result.push('\nif __name__ == "__main__":');
  result.push('    sol = Solution()');
  result.push('    # sol.solve()');
  return result.join('\n') + '\n';
}

/**
 * Intelligent Python to C++ Syntax Converter
 */
export function convertPythonToCpp(pythonCode: string, title?: string): string {
  if (!pythonCode || !pythonCode.trim()) return '';

  const lines = pythonCode.split('\n');
  const cppBody: string[] = [];
  const headerComments: string[] = [];
  let inMethod = false;

  for (let rawLine of lines) {
    let line = rawLine.trim();

    if (line.startsWith('from ') || line.startsWith('import ')) continue;

    if (line.startsWith('#')) {
      headerComments.push('// ' + line.slice(1).trim());
      continue;
    }

    if (line.startsWith('class Solution:')) continue;

    // Method definition with optional return type: def climbStairs(self, n: int) -> int:
    const defMatch = line.match(/def\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)(?:\s*->\s*([^:]+))?\s*:/);
    if (defMatch) {
      const methodName = defMatch[1];
      const rawParams = defMatch[2];
      const rawRet = defMatch[3] ? defMatch[3].trim() : 'void';

      let cppRet = 'void';
      if (rawRet === 'int') cppRet = 'int';
      else if (rawRet === 'bool') cppRet = 'bool';
      else if (rawRet === 'str') cppRet = 'string';
      else if (rawRet.includes('List[int]')) cppRet = 'vector<int>';
      else if (rawRet.includes('List[List[int]]')) cppRet = 'vector<vector<int>>';
      else if (methodName !== 'solve') cppRet = 'int';

      const params = rawParams
        .split(',')
        .map((p) => p.trim())
        .filter((p) => p !== 'self' && p.length > 0)
        .map((p) => {
          if (p.includes(':')) {
            const [pName, pType] = p.split(':').map((s) => s.trim());
            if (pType.includes('List[int]')) return `vector<int>& ${pName}`;
            if (pType.includes('List[List[int]]')) return `vector<vector<int>>& ${pName}`;
            if (pType.includes('str')) return `string ${pName}`;
            if (pType.includes('bool')) return `bool ${pName}`;
            return `int ${pName}`;
          }
          return `int ${p}`;
        })
        .join(', ');

      cppBody.push(`    ${cppRet} ${methodName}(${params}) {`);
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
      .replace(/\band\b/g, '&&')
      .replace(/\bor\b/g, '||')
      .replace(/\bnot\s+/g, '!')
      .replace(/for\s+([a-zA-Z0-9_]+)\s+in\s+range\(len\(([a-zA-Z0-9_]+)\)\):/g, 'for (int $1 = 0; $1 < $2.size(); $1++) {')
      .replace(/for\s+([a-zA-Z0-9_]+)\s+in\s+range\(([^,]+),\s*([^)]+)\):/g, 'for (int $1 = $2; $1 < $3; $1++) {')
      .replace(/for\s+([a-zA-Z0-9_]+)\s+in\s+range\(([^)]+)\):/g, 'for (int $1 = 0; $1 < $2; $1++) {')
      .replace(/for\s+([a-zA-Z0-9_]+)\s+in\s+([a-zA-Z0-9_]+):/g, 'for (auto $1 : $2) {')
      .replace(/if\s+(.*?):/g, 'if ($1) {')
      .replace(/elif\s+(.*?):/g, '} else if ($1) {')
      .replace(/else:/g, '} else {')
      .replace(/while\s+(.*?):/g, 'while ($1) {')
      .replace(/len\(([a-zA-Z0-9_]+)\)/g, '$1.size()')
      .replace(/([a-zA-Z0-9_]+)\.append\(([^)]+)\)/g, '$1.push_back($2)')
      .replace(/([a-zA-Z0-9_]+)\.pop\(\)/g, '$1.pop_back()');

    if (converted.length > 0) {
      if (!converted.endsWith(';') && !converted.endsWith('{') && !converted.endsWith('}')) {
        converted += ';';
      }
      cppBody.push('        ' + converted);
    }
  }

  const result: string[] = [];
  if (headerComments.length > 0) {
    result.push(headerComments.join('\n'));
    result.push('');
  }
  result.push('#include <iostream>');
  result.push('#include <vector>');
  result.push('#include <string>');
  result.push('#include <algorithm>');
  result.push('#include <unordered_map>');
  result.push('#include <unordered_set>');
  result.push('#include <queue>');
  result.push('#include <stack>');
  result.push('#include <climits>');
  result.push('using namespace std;\n');
  result.push('class Solution {');
  result.push('public:');
  if (cppBody.length === 0) {
    result.push('    void solve() {');
    result.push(`        cout << "Testing solution for ${title || 'DSA'}..." << endl;`);
    result.push('    }');
  } else {
    result.push(...cppBody);
    result.push('    }');
  }
  result.push('};\n');
  result.push('int main() {');
  result.push('    ios_base::sync_with_stdio(false);');
  result.push('    cin.tie(NULL);');
  result.push('    Solution s;');
  result.push('    // s.solve();');
  result.push('    return 0;');
  result.push('}\n');

  return result.join('\n');
}

/**
 * Detect language of code snippet
 */
export function detectCodeLanguage(code: string): 'cpp' | 'python' | 'java' | 'other' {
  if (/#include\s*<|using\s+namespace\s+std;|std::|cout\s*<</.test(code)) return 'cpp';
  if (/def\s+[a-zA-Z0-9_]+\s*\(|import\s+sys|import\s+collections|class\s+Solution:|from\s+typing/.test(code)) return 'python';
  if (/public\s+class|System\.out\.println|public\s+static\s+void\s+main/.test(code)) return 'java';
  return 'other';
}
