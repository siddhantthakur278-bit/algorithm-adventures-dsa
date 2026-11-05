export type SqlBelt = 'white' | 'yellow' | 'blue' | 'black';

export interface SqlProblem {
  id: string;
  number: number;
  title: string;
  belt: SqlBelt;
  description: string;
  hint?: string;
  bugsyTrap?: string;
  solutionSql: string;
  expectedResultSummary: string;
  category: string;
  expectedRowsCount?: number;
}

export interface SqlTableColumn {
  name: string;
  type: string;
  isPk?: boolean;
  isFk?: boolean;
  nullable?: boolean;
  references?: string;
}

export interface SqlTable {
  name: string;
  columns: SqlTableColumn[];
  rows: Record<string, any>[];
  traps?: string[];
}

export interface SqlMCQ {
  id: string;
  question: string;
  options: string[];
  answerIndex: number; // 0-based
  explanation: string;
}

export interface SqlCodeLab {
  id: string;
  title: string;
  question: string;
  solutionSql: string;
  explanation: string;
}

export interface SqlSection {
  id: string;
  title: string;
  theory: string;
  dialogue?: {
    speaker: 'tuple' | 'sam' | 'nully' | 'bugsy';
    text: string;
  };
  codeSnippet?: string;
  resultHeaders?: string[];
  resultRows?: (string | number | null)[][];
  noteBox?: {
    type: 'protip' | 'watchout' | 'myth' | 'pgnote' | 'remember' | 'funfact';
    title: string;
    text: string;
  };
  mcqs?: SqlMCQ[];
  codeLab?: SqlCodeLab;
}

export interface SqlChapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  sections: SqlSection[];
  misunderstandingFixer?: { wrong: string; truth: string }[];
  cheatSheet?: string[];
}

export interface PostgreSqlErrorEntry {
  id: string;
  errorMessage: string;
  whatItReallyMeans: string;
  fix: string;
  bugsyConfession?: string;
  sampleBrokenQuery?: string;
  fixedQuery?: string;
}

export interface BossQuizQuestion {
  id: string;
  questionNumber: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface SqlQueryResult {
  columns: string[];
  rows: Record<string, any>[];
  rowCount: number;
  executionTimeMs: number;
  error?: string;
}
