export interface BossQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  bugsyInsult: string;
  byteCounter: string;
  damage: number;
}

export const bossBattleQuestions: BossQuestion[] = [
  {
    id: 'bq-1',
    question: 'Bugsy throws an algorithm with recurrence T(N) = 8T(N/2) + O(N²)! What is its asymptotic time complexity?',
    options: ['O(N²)', 'O(N² log N)', 'O(N³)', 'O(2^N)'],
    correctIndex: 2,
    explanation: 'By Master Theorem: a=8, b=2, d=2. log_b(a) = log_2(8) = 3. Since 3 > 2, Case 1 gives O(N^3).',
    bugsyInsult: 'Hahaha! You will drown in cubic polynomial loops!',
    byteCounter: 'Professor taught me the Master Theorem! 8 subproblems at half size equals O(N³)!',
    damage: 25,
  },
  {
    id: 'bq-2',
    question: 'Bugsy claims you can sort an arbitrary comparison-based array of N items in O(N) worst-case time. Is he lying?',
    options: [
      'Yes, information-theoretic lower bound for comparison sort is Ω(N log N)',
      'No, QuickSort always achieves O(N)',
      'No, BubbleSort with early exit is O(N) worst-case',
      'Yes, because computers cannot compare numbers faster than O(N²)',
    ],
    correctIndex: 0,
    explanation: 'Any comparison-based sort must distinguish between N! permutations, requiring at least log2(N!) = Ω(N log N) comparisons.',
    bugsyInsult: 'My super secret sort does it in O(N)! Believe me or perish!',
    byteCounter: 'Busted! A decision tree with N! leaves has minimum depth Ω(N log N)!',
    damage: 25,
  },
  {
    id: 'bq-3',
    question: 'Bugsy hides a cycle inside your singly linked list. What is the optimal time and auxiliary space to detect it?',
    options: ['O(N) time, O(N) space', 'O(N) time, O(1) space', 'O(N log N) time, O(1) space', 'O(1) time, O(N) space'],
    correctIndex: 1,
    explanation: 'Floyd’s Cycle Finding Algorithm (Tortoise and Hare) uses two pointers in O(N) time and strictly O(1) auxiliary space.',
    bugsyInsult: 'You will spin round and round in my linked pointer whirlpool forever!',
    byteCounter: 'Tortoise and Hare will rendezvous inside your cycle in O(N) time and O(1) memory!',
    damage: 25,
  },
  {
    id: 'bq-4',
    question: 'Bugsy puts negative edge weights on your road map! Which algorithm must you use to find shortest paths without failing?',
    options: ['Dijkstra with Min-Heap', 'Kruskal’s Algorithm', 'Bellman-Ford Algorithm', 'Breadth-First Search'],
    correctIndex: 2,
    explanation: 'Dijkstra fails with negative weights because its greedy relaxation is irreversible. Bellman-Ford relaxes all edges |V|-1 times and detects negative cycles.',
    bugsyInsult: 'Step on my negative weight trap and watch your shortest path algorithm panic!',
    byteCounter: 'Bellman-Ford will relax all edges |V|-1 times and freeze your negative traps!',
    damage: 25,
  },
  {
    id: 'bq-5',
    question: 'Bugsy wants to find the 100th smallest element in a stream of 10,000,000 numbers. What data structure should you use?',
    options: ['A Max-Heap of size 100', 'A Min-Heap of size 10,000,000', 'An unsorted array', 'A linked list'],
    correctIndex: 0,
    explanation: 'A Max-Heap of size K (100) holds the smallest 100 elements seen so far. If a new number is smaller than the root (max of the 100), pop and push.',
    bugsyInsult: '10 million numbers will melt your memory into slag!',
    byteCounter: 'A Max-Heap of size 100 takes negligible memory and processes every stream token in O(log 100)!',
    damage: 25,
  },
];
