export interface PrismaComicPanel {
  speaker: 'pri' | 'nova' | 'bug';
  speech: string;
  caption?: string;
}

export interface PrismaMCQ {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface PrismaCodingQuest {
  id: string;
  prompt: string;
  solution: string;
  steps: string[];
}

export interface PrismaMythTrap {
  id: string;
  statement: string;
  factCheck: string;
}

export interface PrismaTopic {
  id: string;
  code: string;
  level: number;
  title: string;
  difficulty: 1 | 2 | 3;
  examWeight: 1 | 2 | 3;
  xp: number;
  comicPanels: PrismaComicPanel[];
  inSimpleWords: {
    comparison: string;
    danger?: string;
  };
  detailedTheory: string;
  codeLab: {
    title: string;
    code: string;
    output?: string;
    explanation?: string;
  };
  didYouKnow: string;
  memoryTrick: string;
  remember: string[];
  mcqs: PrismaMCQ[];
  codingQuest: PrismaCodingQuest;
  mythTraps: PrismaMythTrap[];
}

export interface PrismaQuestLevel {
  level: number;
  day: number;
  title: string;
  subtitle: string;
  focus: string;
  topics: PrismaTopic[];
}

export interface PrismaBossChallenge {
  id: number;
  title: string;
  prompt: string;
  solutionCode: string;
  explanation: string;
}

export interface PrismaQuickFire {
  id: string;
  statement: string;
  isTrue: boolean;
  reason: string;
}

export interface PrismaFlashcard {
  id: string;
  topicCode: string;
  question: string;
  answer: string;
}

export interface PrismaMatchPair {
  id: number;
  term: string;
  definitionLetter: string;
  definition: string;
}

export interface PrismaPosterTable {
  id: string;
  title: string;
  subtitle: string;
  headers: string[];
  rows: string[][];
}
