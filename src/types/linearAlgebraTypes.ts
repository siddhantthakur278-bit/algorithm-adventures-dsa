export interface LinearAlgebraChapter {
  id: number;
  title: string;
  subtitle: string;
  comicDialogue: {
    speaker: 'pivot' | 'vee' | 'gaussbot';
    text: string;
    subtext?: string;
  }[];
  theory: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  bigIdea: {
    title: string;
    content: string;
  };
  workedExample: {
    title: string;
    steps: string[];
    result: string;
  };
  oopsCorner: {
    myth: string;
    truth: string;
  }[];
  iCanList: string[];
}

export interface LinearAlgebraMCQ {
  id: string;
  chapterId: number;
  question: string;
  options: { label: string; text: string }[];
  correctOption: string;
  explanation: string;
}

export interface LinearAlgebraBrainGym {
  id: number;
  title: string;
  scenario: string;
  solutionSteps: string[];
  finalAnswer: string;
}

export interface LinearAlgebraClassicalProblem {
  id: number;
  section: string;
  difficulty: 1 | 2 | 3; // 1 = warm-up, 2 = standard, 3 = brain-teaser
  problem: string;
  solution: string;
}

export interface MythBusterItem {
  myth: string;
  truth: string;
}

export interface GlossaryItem {
  term: string;
  meaning: string;
}
