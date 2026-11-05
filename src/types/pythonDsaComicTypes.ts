export interface ComicDialogueLine {
  speaker: 'sid' | 'profpy' | 'buggy';
  text: string;
  subtext?: string;
}

export interface TheorySection {
  heading: string;
  explanation: string[];
  diagramAscii?: string;
  diagramSvgType?: 'boxcars' | 'heap' | 'tree' | 'hash_buckets' | 'sliding_window' | 'two_pointers' | 'big_o_chart' | 'stack_lifo' | 'queue_fifo' | 'graph_layers';
  bulletPoints?: string[];
}

export interface CodeBlock {
  title?: string;
  code: string;
  output: string;
  note?: string;
}

export interface MythBuster {
  myth: string;
  truth: string;
}

export interface QuickQuizQuestion {
  id: string; // e.g. "Q1.1"
  question: string;
  options: { label: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correct: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface FixItQuestion {
  id: string; // e.g. "Q1.4"
  title: string;
  codeOrQuestion: string;
  options: { label: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correct: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface BrainBlast {
  id: string; // e.g. "B1.1"
  title: string;
  scenario: string;
  hint: string;
  answerCode: string;
  answerOutput: string;
  explanation: string;
}

export interface PythonDsaSubtopic {
  id: string; // e.g. "1.1"
  title: string;
  theory: TheorySection;
  codeBlock: CodeBlock;
  mythBusters: MythBuster[];
  quiz: QuickQuizQuestion[];
  fixIt: FixItQuestion;
  brainBlast: BrainBlast;
}

export interface PythonDsaChapter {
  id: number; // 0 to 14
  title: string;
  subtitle: string;
  introDialogue: ComicDialogueLine[];
  subtopics: PythonDsaSubtopic[];
  chapterSummary?: string;
}

export interface BrainstormerProblem {
  id: number; // 1 to 80
  world: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
  worldName: string;
  difficulty: 1 | 2 | 3; // 1 = Easy, 2 = Medium, 3 = Hard
  difficultyLabel: 'EASY' | 'MEDIUM' | 'HARD';
  title: string;
  prompt: string;
  hint: string;
  idea: string;
  solutionCode: string;
  output: string;
  tags: string[];
}

export interface CheatSheetEntry {
  name: string;
  timeComplexity: string;
  spaceComplexity?: string;
  notes: string;
}

export interface PatternSpotterItem {
  clue: string;
  think: string;
}

export interface BugSurvivalItem {
  symptom: string;
  likelyCause: string;
  fix: string;
}

export interface BossQuizQuestion {
  id: number; // 1 to 20
  round: 1 | 2 | 3 | 4;
  roundName: string;
  question: string;
  options: { label: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correct: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  referencedChapter: number;
}

export interface GlossaryItem {
  term: string;
  meaning: string;
}
