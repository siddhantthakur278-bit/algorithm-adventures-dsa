export type WebDevBookId = 'html' | 'css' | 'tailwind' | 'react' | 'typescript';

export interface WebComicChapter {
  id: number;
  title: string;
  subtitle: string;
  sections: {
    heading: string;
    codeSnippet?: {
      language: string;
      code: string;
    };
    explanation: string[];
    bullets?: string[];
  }[];
  mcqZone: {
    id: string;
    question: string;
    options: { label: string; text: string }[];
    correct: string;
    explanation: string;
  }[];
  codeLab?: {
    task: string;
    solution: string;
    note?: string;
  };
  misunderstandings?: {
    myth: string;
    truth: string;
  }[];
  cheatSheet?: string[];
}

export interface ClassicProblem {
  id: number;
  title: string;
  problem: string;
  solution: string;
  note?: string;
}

export interface FinalBossQuestion {
  id: number;
  question: string;
  options: { label: string; text: string }[];
  correct: string;
  explanation: string;
}

export interface BugDictionaryEntry {
  bug: string;
  causeAndFix: string;
}

export interface WebDevBook {
  id: WebDevBookId;
  title: string;
  badge: string;
  color: string;
  accentBg: string;
  accentBorder: string;
  tagline: string;
  description: string;
  gangNotes: {
    tuple: string;
    sam: string;
    nully: string;
    bugsy: string;
  };
  chapters: WebComicChapter[];
  problems20: ClassicProblem[];
  finalBoss: FinalBossQuestion[];
  bugDictionary: BugDictionaryEntry[];
}
