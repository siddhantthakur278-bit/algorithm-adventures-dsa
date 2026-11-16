// Comprehensive Multi-Language Compiler & Boilerplate Definitions
// Supports Python 3.12, C++20, Java 22, C17, JavaScript, TypeScript, Rust 1.82, Go 1.23, SQL

export type SupportedLanguage =
  | 'python'
  | 'cpp'
  | 'java'
  | 'c'
  | 'javascript'
  | 'typescript'
  | 'rust'
  | 'go'
  | 'sql'
  | 'html'
  | 'css'
  | 'react';

export interface LanguageConfig {
  id: SupportedLanguage;
  name: string;
  version: string;
  icon: string;
  defaultFile: string;
  monacoLang: string;
  wandboxCompiler?: string;
  runnerType: 'wasm' | 'wandbox' | 'eval' | 'sql' | 'dom';
  description: string;
  color: string;
}

export const LANGUAGE_REGISTRY: Record<SupportedLanguage, LanguageConfig> = {
  python: {
    id: 'python',
    name: 'Python',
    version: '3.12',
    icon: '🐍',
    defaultFile: 'solution.py',
    monacoLang: 'python',
    wandboxCompiler: 'cpython-head',
    runnerType: 'wasm',
    description: 'Pyodide WASM In-Browser & Wandbox CPython 3.12',
    color: '#38BDF8',
  },
  cpp: {
    id: 'cpp',
    name: 'C++',
    version: 'C++20 (GCC 13.2)',
    icon: '⚡',
    defaultFile: 'solution.cpp',
    monacoLang: 'cpp',
    wandboxCompiler: 'gcc-13.2.0',
    runnerType: 'wandbox',
    description: 'High-performance GCC 13.2 compiler with C++20 standard',
    color: '#60A5FA',
  },
  java: {
    id: 'java',
    name: 'Java',
    version: '22 (OpenJDK)',
    icon: '☕',
    defaultFile: 'Solution.java',
    monacoLang: 'java',
    wandboxCompiler: 'openjdk-jdk-22+36',
    runnerType: 'wandbox',
    description: 'Modern OpenJDK 22 runtime with full standard library',
    color: '#F97316',
  },
  c: {
    id: 'c',
    name: 'C',
    version: 'C17 (GCC)',
    icon: '⚙️',
    defaultFile: 'solution.c',
    monacoLang: 'c',
    wandboxCompiler: 'gcc-head-c',
    runnerType: 'wandbox',
    description: 'Raw performance GCC C17 standard library',
    color: '#94A3B8',
  },
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    version: 'Node 20 / ES2024',
    icon: '🟨',
    defaultFile: 'solution.js',
    monacoLang: 'javascript',
    wandboxCompiler: 'nodejs-20.17.0',
    runnerType: 'eval',
    description: 'V8 Engine with modern ECMAScript standard',
    color: '#FACC15',
  },
  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    version: '5.6',
    icon: '🔷',
    defaultFile: 'solution.ts',
    monacoLang: 'typescript',
    wandboxCompiler: 'typescript-5.6.2',
    runnerType: 'eval',
    description: 'Strongly typed modern JavaScript engine',
    color: '#3B82F6',
  },
  rust: {
    id: 'rust',
    name: 'Rust',
    version: '1.82 (Cargo)',
    icon: '🦀',
    defaultFile: 'solution.rs',
    monacoLang: 'rust',
    wandboxCompiler: 'rust-1.82.0',
    runnerType: 'wandbox',
    description: 'Memory safe, zero-cost abstractions compiler',
    color: '#FB923C',
  },
  go: {
    id: 'go',
    name: 'Go',
    version: '1.23',
    icon: '🐹',
    defaultFile: 'solution.go',
    monacoLang: 'go',
    wandboxCompiler: 'go-1.23.2',
    runnerType: 'wandbox',
    description: 'Concurrent, lightning-fast Go 1.23 compiler',
    color: '#06B6D4',
  },
  sql: {
    id: 'sql',
    name: 'SQL',
    version: 'PostgreSQL 16',
    icon: '🗄️',
    defaultFile: 'query.sql',
    monacoLang: 'sql',
    runnerType: 'sql',
    description: 'In-browser relational engine with full SQL syntax',
    color: '#A855F7',
  },
  html: {
    id: 'html',
    name: 'HTML5',
    version: 'Living Standard',
    icon: '🌐',
    defaultFile: 'index.html',
    monacoLang: 'html',
    runnerType: 'dom',
    description: 'Interactive HTML/DOM preview with Tailwind support',
    color: '#E11D48',
  },
  css: {
    id: 'css',
    name: 'CSS3',
    version: 'Modern CSS',
    icon: '🎨',
    defaultFile: 'styles.css',
    monacoLang: 'css',
    runnerType: 'dom',
    description: 'Cascading stylesheets sandbox',
    color: '#818CF8',
  },
  react: {
    id: 'react',
    name: 'React',
    version: '19',
    icon: '⚛️',
    defaultFile: 'App.tsx',
    monacoLang: 'typescript',
    runnerType: 'eval',
    description: 'React JSX component environment',
    color: '#22D3EE',
  },
};

export const SELECTABLE_COMPILER_LANGUAGES: SupportedLanguage[] = [
  'python',
  'cpp',
  'java',
  'c',
  'javascript',
  'typescript',
  'rust',
  'go',
  'sql',
];

/**
 * Extracts method signature from Python starter code:
 * e.g. "def solve(self, nums: list) -> int:"
 */
export function parsePythonSignature(pythonCode: string): {
  methodName: string;
  params: { name: string; type: string }[];
  returnType: string;
} {
  const defaultRes = {
    methodName: 'solve',
    params: [{ name: 'nums', type: 'list' }],
    returnType: 'int',
  };

  if (!pythonCode) return defaultRes;

  const match = pythonCode.match(/def\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)(?:\s*->\s*([A-Za-z0-9_\[\],\s]+))?:/);
  if (!match) return defaultRes;

  const methodName = match[1];
  const rawParams = match[2];
  const rawReturn = (match[3] || 'any').trim();

  const params: { name: string; type: string }[] = [];
  const parts = rawParams.split(',');
  for (const p of parts) {
    const trimmed = p.trim();
    if (!trimmed || trimmed === 'self') continue;
    const [pName, pType] = trimmed.split(':');
    params.push({
      name: pName?.trim() || 'arg',
      type: pType?.trim() || 'any',
    });
  }

  if (params.length === 0) {
    params.push({ name: 'nums', type: 'list' });
  }

  return {
    methodName,
    params,
    returnType: rawReturn,
  };
}

/**
 * Generates starter code for any supported programming language.
 */
export function generateStarterCode(
  lang: SupportedLanguage,
  problemTitle: string = 'Problem Solution',
  pythonStarter: string = ''
): string {
  const { methodName, params, returnType } = parsePythonSignature(pythonStarter);
  const paramNames = params.map((p) => p.name).join(', ');

  // Sanitize pythonStarter: If it looks like C++ (#include, using namespace, cout, etc.), do not echo as Python
  const isActuallyCpp = /#include|using\s+namespace|std::|cout\s*<<|int\s+main/.test(pythonStarter);
  const cleanPythonStarter = isActuallyCpp ? '' : pythonStarter.trim();

  switch (lang) {
    case 'python':
      return (
        cleanPythonStarter ||
        `class Solution:\n    def ${methodName}(self, ${paramNames}):\n        # Write your Python 3 solution here\n        pass\n`
      );

    case 'cpp':
      return `#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <algorithm>

using namespace std;

class Solution {
public:
    int ${methodName}(vector<int>& ${params[0]?.name || 'nums'}) {
        // Write your C++20 solution here
        
        return 0;
    }
};

int main() {
    Solution sol;
    cout << "C++20 Solution Ready" << endl;
    return 0;
}
`;

    case 'java':
      return `import java.util.*;

class Solution {
    public int ${methodName}(int[] ${params[0]?.name || 'nums'}) {
        // Write your Java 22 solution here
        
        return 0;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println("Java 22 Solution Ready");
    }
}
`;

    case 'c':
      return `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

int ${methodName}(int* ${params[0]?.name || 'nums'}, int numsSize) {
    // Write your C17 solution here
    
    return 0;
}

int main() {
    printf("C17 Solution Ready\\n");
    return 0;
}
`;

    case 'javascript':
      return `/**
 * @param {number[]} ${params[0]?.name || 'nums'}
 * @return {number}
 */
var ${methodName} = function(${paramNames}) {
    // Write your JavaScript (ES2024) solution here
    
};
`;

    case 'typescript':
      return `function ${methodName}(${params.map((p) => `${p.name}: any`).join(', ')}): any {
    // Write your TypeScript 5.6 solution here
    
}
`;

    case 'rust':
      return `struct Solution;

impl Solution {
    pub fn ${methodName}(${params[0]?.name || 'nums'}: Vec<i32>) -> i32 {
        // Write your Rust 1.82 solution here
        0
    }
}

fn main() {
    println!("Rust 1.82 Solution Ready");
}
`;

    case 'go':
      return `package main

import "fmt"

func ${methodName}(${params[0]?.name || 'nums'} []int) int {
    // Write your Go 1.23 solution here
    return 0
}

func main() {
    fmt.Println("Go 1.23 Solution Ready")
}
`;

    case 'sql':
      return `-- PostgreSQL 16 Query for: ${problemTitle}
-- Write your SQL query below
SELECT 
    *
FROM 
    solution_table;
`;

    case 'html':
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${problemTitle}</title>
</head>
<body>
  <div class="container">
    <h1>${problemTitle}</h1>
    <p>Rendered with HTML5 & modern CSS</p>
  </div>
</body>
</html>
`;

    case 'css':
      return `/* Styles for ${problemTitle} */
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #0b0f19;
  color: #f8fafc;
}
`;

    case 'react':
      return `import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl">
      <h1 className="text-xl font-bold">${problemTitle}</h1>
      <button 
        onClick={() => setCount(c => c + 1)}
        className="mt-4 px-4 py-2 bg-amber-500 rounded-lg font-bold"
      >
        Count: {count}
      </button>
    </div>
  );
}
`;

    default:
      return pythonStarter;
  }
}
