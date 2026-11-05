// Universal Code Execution Engine for Python, JavaScript, TypeScript, HTML/CSS, and SQL
import { runPythonCode, runPythonTests, RunResult } from './pythonRunner';
import { runSqlQuery } from './sqlRunner';
import { SqlQueryResult } from '../types/sqlTypes';

export type SupportedLanguage = 'python' | 'javascript' | 'typescript' | 'html' | 'css' | 'sql' | 'react';

export interface CodeExecutionOutcome {
  success: boolean;
  output: string;
  error?: string;
  executionTimeMs: number;
  domPreview?: string;
  sqlResult?: SqlQueryResult;
  testPassed?: boolean;
}

/**
 * Strips basic TypeScript type annotations for safe client-side execution in a sandbox.
 */
function stripTypeScript(tsCode: string): string {
  return tsCode
    .replace(/:\s*(string|number|boolean|any|void|string\[\]|number\[\]|Record<[^>]+>|Promise<[^>]+>)/g, '')
    .replace(/interface\s+\w+\s*\{[^}]*\}/g, '')
    .replace(/type\s+\w+\s*=\s*[^;]+;/g, '')
    .replace(/as\s+[A-Za-z0-9_<>]+/g, '')
    .replace(/<[A-Za-z0-9_,\s]+>(?=\()/g, '');
}

/**
 * Executes JavaScript / TypeScript code safely capturing console.log output.
 */
function executeJavaScript(code: string): CodeExecutionOutcome {
  const startTime = performance.now();
  const logs: string[] = [];

  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;

  try {
    const cleanCode = stripTypeScript(code);

    // Mock console to capture outputs
    const mockConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
      },
      warn: (...args: any[]) => {
        logs.push(`[WARN] ${args.join(' ')}`);
      },
      error: (...args: any[]) => {
        logs.push(`[ERROR] ${args.join(' ')}`);
      },
    };

    // Evaluate code inside closure with mocked console
    const runner = new Function('console', cleanCode);
    const returnValue = runner(mockConsole);

    const execTime = Math.round(performance.now() - startTime);

    let output = logs.join('\n');
    if (returnValue !== undefined && !output.includes(String(returnValue))) {
      output = output ? `${output}\n=> ${JSON.stringify(returnValue)}` : `=> ${JSON.stringify(returnValue)}`;
    }

    return {
      success: true,
      output: output || 'Code executed successfully (no stdout logged).',
      executionTimeMs: execTime,
    };
  } catch (err: any) {
    return {
      success: false,
      output: logs.join('\n'),
      error: err.message || String(err),
      executionTimeMs: Math.round(performance.now() - startTime),
    };
  } finally {
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;
  }
}

/**
 * Builds an interactive HTML sandbox preview with Tailwind CDN support.
 */
function executeHtmlCss(code: string, isTailwind: boolean = false): CodeExecutionOutcome {
  const startTime = performance.now();

  const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${isTailwind ? '<script src="https://cdn.tailwindcss.com"></script>' : ''}
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 16px; background: #0f172a; color: #f8fafc; }
  </style>
</head>
<body>
  ${code}
</body>
</html>`;

  const execTime = Math.round(performance.now() - startTime);

  return {
    success: true,
    output: 'HTML/CSS rendered successfully.',
    domPreview: fullHtml,
    executionTimeMs: execTime,
  };
}

/**
 * Main Universal Code Runner Entrypoint
 */
export async function executeUniversalCode(
  language: SupportedLanguage,
  code: string,
  options?: {
    expectedKeywords?: string[];
    expectedOutputSubstring?: string;
    testCases?: { input: string; expectedOutput: string }[];
  }
): Promise<CodeExecutionOutcome> {
  const startTime = performance.now();

  if (language === 'python') {
    if (options?.testCases && options.testCases.length > 0) {
      const testCases = options.testCases.map((tc, idx) => ({
        id: `tc-${idx}`,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
      }));

      const res: RunResult = await runPythonTests(code, testCases);
      const elapsed = Math.round(performance.now() - startTime);

      const outText =
        res.globalStdout ||
        res.results.map(r => r.actualOutput || r.stdout).filter(Boolean).join('\n') ||
        (res.success ? 'Python executed successfully.' : '');

      let testPassed = res.allPassed;
      if (options?.expectedOutputSubstring && outText) {
        testPassed = outText.toLowerCase().includes(options.expectedOutputSubstring.toLowerCase());
      }

      return {
        success: res.success,
        output: outText,
        error: res.syntaxError || res.results.find(r => r.error)?.error,
        executionTimeMs: res.totalTimeMs || elapsed,
        testPassed,
      };
    } else {
      const outText = await runPythonCode(code);
      const elapsed = Math.round(performance.now() - startTime);
      const isErr = outText.startsWith('Traceback') || outText.includes('Error:');

      let testPassed = !isErr;
      if (options?.expectedOutputSubstring && outText) {
        testPassed = outText.toLowerCase().includes(options.expectedOutputSubstring.toLowerCase());
      }

      return {
        success: !isErr,
        output: outText,
        error: isErr ? outText : undefined,
        executionTimeMs: elapsed,
        testPassed,
      };
    }
  }

  if (language === 'sql') {
    const sqlRes = runSqlQuery(code);
    const elapsed = Math.round(performance.now() - startTime);

    const success = !sqlRes.error;
    let testPassed = success;

    if (options?.expectedOutputSubstring && sqlRes.rows) {
      const stringified = JSON.stringify(sqlRes.rows);
      testPassed = stringified.toLowerCase().includes(options.expectedOutputSubstring.toLowerCase());
    }

    return {
      success,
      output: sqlRes.error ? '' : `Query executed successfully (${sqlRes.rowCount} rows returned in ${sqlRes.executionTimeMs}ms).`,
      error: sqlRes.error,
      sqlResult: sqlRes,
      executionTimeMs: sqlRes.executionTimeMs || elapsed,
      testPassed,
    };
  }

  if (language === 'javascript' || language === 'typescript' || language === 'react') {
    const jsRes = executeJavaScript(code);
    let testPassed = jsRes.success;

    if (options?.expectedKeywords && options.expectedKeywords.length > 0) {
      const missing = options.expectedKeywords.filter(kw => !code.toLowerCase().includes(kw.toLowerCase()));
      if (missing.length > 0) {
        testPassed = false;
        jsRes.output += `\n[Verification] Missing required concepts: ${missing.join(', ')}`;
      }
    }

    if (options?.expectedOutputSubstring && jsRes.output) {
      if (!jsRes.output.toLowerCase().includes(options.expectedOutputSubstring.toLowerCase())) {
        testPassed = false;
      }
    }

    return {
      ...jsRes,
      testPassed,
    };
  }

  if (language === 'html' || language === 'css') {
    const isTailwind = code.includes('class=') || code.includes('className=') || code.includes('@theme');
    const htmlRes = executeHtmlCss(code, isTailwind);

    let testPassed = true;
    if (options?.expectedKeywords && options.expectedKeywords.length > 0) {
      const missing = options.expectedKeywords.filter(kw => !code.toLowerCase().includes(kw.toLowerCase()));
      if (missing.length > 0) {
        testPassed = false;
        htmlRes.output = `Validation Note: Expected ${missing.join(', ')} to be used in your solution.`;
      }
    }

    return {
      ...htmlRes,
      testPassed,
    };
  }

  return {
    success: false,
    output: '',
    error: `Unsupported language: ${language}`,
    executionTimeMs: 0,
  };
}
