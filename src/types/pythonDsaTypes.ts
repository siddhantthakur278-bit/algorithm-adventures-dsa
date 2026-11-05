export type PythonDsaWorldId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';

export interface PythonDsaComicDialogue {
  speaker: 'sid' | 'prof_py' | 'buggy';
  text: string;
  subtext?: string;
}

export interface PythonDsaSection {
  heading: string;
  theory: string;
  bulletPoints?: string[];
  diagramDescription?: string;
  diagramSvgType?: string;
  codeSnippet?: {
    code: string;
    explanation?: string;
    output?: string;
  };
}

export interface PythonDsaQuizMCQ {
  id: string; // e.g. "Q1.1"
  question: string;
  options: {
    label: string;
    text: string;
  }[];
  correct: string; // e.g. "B"
  explanation: string;
}

export interface PythonDsaFixItQuestion {
  id: string; // e.g. "Q1.4"
  question: string;
  options: {
    label: string;
    text: string;
  }[];
  correct: string;
  explanation: string;
}

export interface PythonDsaMythBuster {
  id: string;
  myth: string;
  truth: string;
}

export interface PythonDsaBrainBlast {
  id: string; // e.g. "B1.1"
  title: string;
  problem: string;
  hint: string;
  solutionCode?: string;
  solutionOutput?: string;
  explanation: string;
}

export interface PythonDsaChapter {
  id: number; // 0 to 14
  numberLabel: string; // "CHAPTER 0", "CHAPTER 1", etc.
  title: string;
  subtitle: string;
  timeEstimate: string;
  comicHook: PythonDsaComicDialogue[];
  sections: PythonDsaSection[];
  mythBusters: PythonDsaMythBuster[];
  quizzes: PythonDsaQuizMCQ[];
  fixItQuestion?: PythonDsaFixItQuestion;
  brainBlasts: PythonDsaBrainBlast[];
  answerVault: {
    quizAnswers: Record<string, string>;
    brainBlastAnswers: Record<string, { code?: string; output?: string; explanation: string }>;
  };
}

export interface PythonDsaClassicalProblem {
  id: number; // 1 to 80
  world: PythonDsaWorldId;
  worldName: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  difficultyStars: number; // 1, 2, or 3
  problem: string;
  example?: string;
  hint: string;
  idea: string;
  solutionCode: string;
  output: string;
}

export interface PythonDsaCheatSheet {
  dataStructureCostTable: {
    structure: string;
    access: string;
    search: string;
    insert: string;
    delete: string;
    notes?: string;
  }[];
  algorithmCostTable: {
    algorithm: string;
    time: string;
    space: string;
    remember: string;
  }[];
  pythonBuiltInCosts: {
    operation: string;
    cost: string;
  }[];
  patternSpotter: {
    clue: string;
    think: string;
  }[];
  bugSurvivalGuide: {
    symptom: string;
    cause: string;
    fix: string;
  }[];
  handyOneLiners: {
    title: string;
    code: string;
    comment: string;
  }[];
}

export interface PythonDsaBossQuestion {
  id: string; // "Q17.1"
  round: 1 | 2 | 3 | 4;
  roundName: string;
  question: string;
  options: {
    label: string;
    text: string;
  }[];
  correct: string;
  explanation: string;
  chapterRef: string;
}

export interface PythonDsaGlossaryItem {
  term: string;
  meaning: string;
}
