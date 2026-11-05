// Standardized Academic Curriculum Specification (CS 201: Data Structures & Algorithmic Analysis)

export interface AcademicModule {
  id: string;
  moduleNumber: number;
  code: string;
  title: string;
  shortTitle: string;
  category: 'Foundations' | 'Linear' | 'DivideConquer' | 'TreesHeaps' | 'Graphs' | 'DynamicProg' | 'Advanced' | 'Systems';
  estimatedHours: number;
  bloomsLevel: 'Remember & Understand' | 'Apply & Implement' | 'Analyze & Optimize' | 'Evaluate & Prove';
  description: string;
  prerequisites: string[];
  learningOutcomes: string[];
  keyInvariantsAndTheorems: string[];
  standardCoreProblems: {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    timeComplexity: string;
    spaceComplexity: string;
    description: string;
  }[];
  comicChapterRef: string;
  sagaRef?: 'dsa' | 'sql' | 'prisma' | 'linear-algebra' | 'web-dev';
}

export interface CoursePolicy {
  component: string;
  weight: number;
  description: string;
}

export const COURSE_GRADING_POLICIES: CoursePolicy[] = [
  {
    component: 'Daily Sequential Homework Quota',
    weight: 40,
    description: 'Pedagogical problem solving in strict sequential order before midnight (HW #1 ➔ HW #2 ➔ Weekend Rush +2).',
  },
  {
    component: '05:00 AM POTD Challenges & Git Commits',
    weight: 25,
    description: 'Authentic morning problem unlocks solved in CPython 3.12 WebAssembly and verified via GitHub Direct Commits.',
  },
  {
    component: 'Bug Hunt Arena & 1v1 Code Duels',
    weight: 15,
    description: 'Defeating Bugsy glitches, edge-case vulnerability exterminations, and live syntax battles.',
  },
  {
    component: 'Active Recall, MCQs & Power Cards',
    weight: 10,
    description: 'Spaced repetition flashcards, chapter review quizzes, and conceptual myth-busters.',
  },
  {
    component: 'Final Boss Battle & Technical Interview Exam',
    weight: 10,
    description: 'Comprehensive timed multi-part algorithmic examination against Bugsy Prime.',
  },
];

export const STANDARD_ACADEMIC_MODULES: AcademicModule[] = [
  {
    id: 'mod-1',
    moduleNumber: 1,
    code: 'CS201.01',
    title: 'Asymptotic Analysis & Mathematical Invariants',
    shortTitle: 'Big-O & Invariants',
    category: 'Foundations',
    estimatedHours: 3.5,
    bloomsLevel: 'Analyze & Optimize',
    description: 'Formalize time and space complexity independent of machine architecture. Master Big-O, Big-Omega, Big-Theta, loop invariants, and the Master Theorem for divide-and-conquer recurrences.',
    prerequisites: ['Basic Python Syntax', 'High School Algebra'],
    learningOutcomes: [
      'Derive worst-case, average-case, and amortized complexity bounds.',
      'State and prove loop invariants: Initialization, Maintenance, and Termination.',
      'Apply the Master Theorem T(N) = aT(N/b) + O(N^d) to recurrence relations in under 60 seconds.',
      'Differentiate auxiliary space from total space complexity.',
    ],
    keyInvariantsAndTheorems: [
      'Master Theorem: Compare log_b(a) with d to identify tree leaf vs root dominance.',
      'Loop Invariant Protocol: Invariant P holds before iteration k and is preserved for iteration k+1.',
      'Drop Constant Rule: O(c * N^k) = O(N^k) for any positive real constant c.',
    ],
    standardCoreProblems: [
      {
        id: 'p-big-o',
        title: 'Master Theorem Asymptotic Evaluation',
        difficulty: 'Easy',
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)',
        description: 'Classify recurrences into Master Theorem Cases 1, 2, or 3.',
      },
    ],
    comicChapterRef: 'Chapter 1: The Magic of Big-O & Complexity',
    sagaRef: 'dsa',
  },
  {
    id: 'mod-2',
    moduleNumber: 2,
    code: 'CS201.02',
    title: 'Contiguous Memory, Dynamic Arrays & Hash Tables',
    shortTitle: 'Arrays & Hashing',
    category: 'Linear',
    estimatedHours: 4.0,
    bloomsLevel: 'Apply & Implement',
    description: 'Explore hardware cache locality, dynamic array geometric amortized doubling, hash functions, collision resolution via chaining/open addressing, and O(1) average lookup patterns.',
    prerequisites: ['CS201.01'],
    learningOutcomes: [
      'Prove why geometric resizing yields O(1) amortized append cost via potential functions Φ(D_i).',
      'Implement complement hashing to reduce O(N^2) brute force searches to O(N) single-pass solutions.',
      'Analyze hash collision clustering under linear probing vs quadratic probing vs separate chaining.',
    ],
    keyInvariantsAndTheorems: [
      'Amortized Doubling: 1 + 2 + 4 + ... + N = 2N - 1 = O(N) total cost for N insertions.',
      'Hash Map Invariant: Key-value map stores previously observed elements for instant complement lookup.',
      'Cache Line Invariant: Contiguous array indexing achieves near 100% L1/L2 hardware prefetch hits.',
    ],
    standardCoreProblems: [
      {
        id: 'p1',
        title: 'Two Sum (Optimal Complement Hashing)',
        difficulty: 'Easy',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        description: 'Find two indices whose values sum to target in a single linear pass.',
      },
      {
        id: 'p-anagram',
        title: 'Valid Anagram (Frequency Vector Mapping)',
        difficulty: 'Easy',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        description: 'Determine if string s can be rearranged into string t using 26-element integer buckets.',
      },
    ],
    comicChapterRef: 'Chapter 2: Arrays & Strings Mastery',
    sagaRef: 'dsa',
  },
  {
    id: 'mod-3',
    moduleNumber: 3,
    code: 'CS201.03',
    title: 'Two Pointers & Sliding Window Constraints',
    shortTitle: 'Pointers & Windows',
    category: 'Linear',
    estimatedHours: 4.5,
    bloomsLevel: 'Analyze & Optimize',
    description: 'Transform quadratic pair searches and subarray optimizations into linear scans using inward converging pointers, fast-slow pointers, and dynamic window expansion/contraction.',
    prerequisites: ['CS201.02'],
    learningOutcomes: [
      'Identify monotonic search spaces that validate opposite-end pointer adjustments.',
      'Maintain continuous window invariants: expand right to satisfy, contract left to optimize.',
      'Solve maximum/minimum subarray length problems in strictly O(N) time with O(1) memory.',
    ],
    keyInvariantsAndTheorems: [
      'Opposite Ends Invariant: If array is sorted and nums[L] + nums[R] < target, no element with R can pair with L.',
      'Sliding Window Invariant: Window [L..R] maintains valid substring predicate at every rightward step.',
      'Fast-Slow Invariant: Slow pointer moves 1 step while fast moves 2 steps, detecting cycles in O(N).',
    ],
    standardCoreProblems: [
      {
        id: 'p2',
        title: 'Two Sum II - Input Array Is Sorted',
        difficulty: 'Medium',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        description: 'Two-pointer inward sweep on sorted numbers without auxiliary hash storage.',
      },
      {
        id: 'p3',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(min(N, M))',
        description: 'Dynamic sliding window maintaining unique character constraint with index map.',
      },
    ],
    comicChapterRef: 'Chapter 2: Arrays & Strings Mastery',
    sagaRef: 'dsa',
  },
  {
    id: 'mod-4',
    moduleNumber: 4,
    code: 'CS201.04',
    title: 'Sequential ADTs: Stacks, Monotonic Queues & Node Chains',
    shortTitle: 'Stacks & Queues',
    category: 'Linear',
    estimatedHours: 4.0,
    bloomsLevel: 'Apply & Implement',
    description: 'Master Last-In-First-Out (LIFO) and First-In-First-Out (FIFO) abstractions. Implement monotonic stacks for Next Greater Element in linear time and singly/doubly linked chains with sentinel dummy nodes.',
    prerequisites: ['CS201.02'],
    learningOutcomes: [
      'Construct a monotonic stack to resolve nearest greater/smaller problems in O(N).',
      'Eliminate null pointer edge cases using sentinel dummy head and tail nodes.',
      'Implement reverse linked list iteratively and recursively in O(N) time and O(1) space.',
    ],
    keyInvariantsAndTheorems: [
      'Monotonic Stack Invariant: Stack elements remain strictly increasing or decreasing from bottom to top.',
      'Amortized Stack Bound: Each of N elements is pushed once and popped at most once -> O(2N) = O(N).',
      'Dummy Head Invariant: dummy.next permanently points to list head, preventing null exception branching.',
    ],
    standardCoreProblems: [
      {
        id: 'p4',
        title: 'Valid Parentheses (Bracket Stack Matching)',
        difficulty: 'Easy',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        description: 'Verify balanced nesting of round, curly, and square brackets.',
      },
      {
        id: 'p-nge',
        title: 'Next Greater Element I (Monotonic Stack)',
        difficulty: 'Medium',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        description: 'Find next greater element for all array entries using monotonic decreasing stack.',
      },
    ],
    comicChapterRef: 'Chapter 4: Stacks, Queues & Monotonic Structures',
    sagaRef: 'dsa',
  },
  {
    id: 'mod-5',
    moduleNumber: 5,
    code: 'CS201.05',
    title: 'Divide & Conquer, Binary Search & Monotonic Predicates',
    shortTitle: 'Binary Search',
    category: 'DivideConquer',
    estimatedHours: 4.5,
    bloomsLevel: 'Analyze & Optimize',
    description: 'Deconstruct search spaces by cutting candidate regions in half. Generalize binary search beyond sorted arrays to monotonic boolean predicates (Binary Search on Answer).',
    prerequisites: ['CS201.01', 'CS201.02'],
    learningOutcomes: [
      'Write bug-free binary search implementations avoiding integer overflow `(low + high) // 2` -> `low + (high - low) // 2`.',
      'Identify the boundary index where boolean predicate P(x) transitions from False to True in O(log N).',
      'Search in rotated sorted arrays by locating the pivot partition in O(log N).',
    ],
    keyInvariantsAndTheorems: [
      'Loop Invariant: The target value (if present) is guaranteed to lie within the closed range [low..high].',
      'Integer Mid Invariant: `mid = (low + high) >> 1` prevents 32-bit integer overflow in C/Java while remaining O(1).',
      'Predicate Invariant: If P(k) is False for all k < X and True for all k >= X, binary search finds X in O(log N).',
    ],
    standardCoreProblems: [
      {
        id: 'p5',
        title: 'Binary Search (Standard & Rotated Arrays)',
        difficulty: 'Easy',
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)',
        description: 'Search for target in sorted integer array in at most log2(N) comparisons.',
      },
    ],
    comicChapterRef: 'Chapter 1: The Magic of Big-O & Complexity',
    sagaRef: 'dsa',
  },
  {
    id: 'mod-6',
    moduleNumber: 6,
    code: 'CS201.06',
    title: 'Hierarchical Trees, Binary Search Trees & Priority Heaps',
    shortTitle: 'Trees & Heaps',
    category: 'TreesHeaps',
    estimatedHours: 5.5,
    bloomsLevel: 'Evaluate & Prove',
    description: 'Explore non-linear hierarchical data structures. Master recursive subtree traversals (DFS Preorder/Inorder/Postorder) vs queue-based BFS Level Order, BST ordering invariants, and binary min/max heap arrays.',
    prerequisites: ['CS201.04'],
    learningOutcomes: [
      'Prove BST invariant: for all nodes, all keys in left subtree < node.key < all keys in right subtree.',
      'Compute tree depth, diameter, and balance factor in a single bottom-up postorder pass.',
      'Implement binary heap array index arithmetic: parent(i)=(i-1)//2, left(i)=2i+1, right(i)=2i+2.',
      'Extract Top-K elements using a Min-Heap of size K in O(N log K) time and O(K) space.',
    ],
    keyInvariantsAndTheorems: [
      'BST Inorder Theorem: Inorder traversal (Left, Root, Right) of any valid BST yields strictly sorted sequence.',
      'Heap Shape Invariant: A binary heap is always a complete binary tree filled top-down, left-to-right.',
      'Heap Order Invariant: node.val <= child.val (Min-Heap) or node.val >= child.val (Max-Heap) for all nodes.',
    ],
    standardCoreProblems: [
      {
        id: 'p6',
        title: 'Invert Binary Tree (Mirror Transformation)',
        difficulty: 'Easy',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(H)',
        description: 'Swap left and right children recursively for all nodes in the binary tree.',
      },
      {
        id: 'p-topk',
        title: 'Top K Frequent Elements (Heap vs Bucket Sort)',
        difficulty: 'Medium',
        timeComplexity: 'O(N log K)',
        spaceComplexity: 'O(N)',
        description: 'Return the k most frequent elements in array using Min-Heap priority queue.',
      },
    ],
    comicChapterRef: 'Chapter 5: Trees & Binary Search Trees',
    sagaRef: 'dsa',
  },
  {
    id: 'mod-7',
    moduleNumber: 7,
    code: 'CS201.07',
    title: 'Graph Traversals, Shortest Paths & Disjoint Sets',
    shortTitle: 'Graphs & Networks',
    category: 'Graphs',
    estimatedHours: 6.0,
    bloomsLevel: 'Analyze & Optimize',
    description: 'Model real-world networked systems with vertices and edges. Master Adjacency Lists, Breadth-First Search (BFS) for unweighted shortest paths, Depth-First Search (DFS) for connected components and cycle detection, Dijkstra with Min-Heap, and Kahn’s Topological Sort.',
    prerequisites: ['CS201.04', 'CS201.06'],
    learningOutcomes: [
      'Construct memory-efficient adjacency lists in O(V + E) space.',
      'Prove BFS guarantees the shortest path in unweighted graphs using distance layer invariant.',
      'Detect cycles in directed graphs via 3-color DFS (White, Gray, Black) or Kahn’s in-degree zero queue.',
      'Execute Dijkstra’s algorithm to compute single-source shortest path on positive weighted graphs in O((V + E) log V).',
    ],
    keyInvariantsAndTheorems: [
      'BFS Shortest Path Invariant: All nodes at distance d are popped from queue before any node at distance d+1.',
      'DAG Topological Sort Theorem: A directed graph possesses a topological ordering if and only if it is acyclic.',
      'Dijkstra Greedy Invariant: When node u is extracted from the priority queue, dist[u] is optimal and final.',
    ],
    standardCoreProblems: [
      {
        id: 'p7',
        title: 'Number of Islands (Grid Connected Components)',
        difficulty: 'Medium',
        timeComplexity: 'O(M * N)',
        spaceComplexity: 'O(M * N)',
        description: 'Count isolated land components in a 2D binary grid using BFS or DFS traversal.',
      },
      {
        id: 'p-courses',
        title: 'Course Schedule (Topological Cycle Detection)',
        difficulty: 'Medium',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V + E)',
        description: 'Verify whether all courses can be completed given prerequisites using Kahn’s in-degree queue.',
      },
    ],
    comicChapterRef: 'Chapter 8: Graphs, BFS, DFS & Shortest Paths',
    sagaRef: 'dsa',
  },
  {
    id: 'mod-8',
    moduleNumber: 8,
    code: 'CS201.08',
    title: 'Dynamic Programming & State Space Formulation',
    shortTitle: 'Dynamic Programming',
    category: 'DynamicProg',
    estimatedHours: 6.5,
    bloomsLevel: 'Evaluate & Prove',
    description: 'Transform exponential search trees O(2^N) into polynomial time O(N) or O(N*W) solutions by exploiting Optimal Substructure and Overlapping Subproblems. Formulate states, transitions, base cases, and optimize 2D tables into O(1) rolling arrays.',
    prerequisites: ['CS201.01', 'CS201.06'],
    learningOutcomes: [
      'Formulate precise state definitions dp[i] or dp[i][j] representing subproblem solutions.',
      'Construct recurrence relations transitioning from previous optimal subproblems to the current state.',
      'Eliminate duplicate work via Top-Down Memoization (hash map/cache) and Bottom-Up Tabulation.',
      'Apply space optimization: compress 2D matrix dp[i][w] to 1D rolling array dp[w] in knapsack problems.',
    ],
    keyInvariantsAndTheorems: [
      'Optimal Substructure: An optimal solution to the problem contains optimal solutions to subproblems.',
      'Overlapping Subproblems: The total number of distinct subproblems is polynomial despite exponential recursion trees.',
      'Rolling Array Invariant: If state dp[i] depends only on dp[i-1], space can be reduced from O(N*W) to O(W).',
    ],
    standardCoreProblems: [
      {
        id: 'p8',
        title: 'Climbing Stairs (Fibonacci Recurrence)',
        difficulty: 'Easy',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        description: 'Count distinct ways to reach top using dp[i] = dp[i-1] + dp[i-2] with 2 variables.',
      },
      {
        id: 'p9',
        title: 'Coin Change (Unbounded Knapsack Minimum Cost)',
        difficulty: 'Medium',
        timeComplexity: 'O(amount * coins)',
        spaceComplexity: 'O(amount)',
        description: 'Compute fewest coins needed to make up amount via dp[a] = min(dp[a - coin] + 1).',
      },
    ],
    comicChapterRef: 'Chapter 9: Dynamic Programming: Remember or Repeat',
    sagaRef: 'dsa',
  },
  {
    id: 'mod-9',
    moduleNumber: 9,
    code: 'CS201.09',
    title: 'Relational Database Engineering, SQL & Prisma ORM',
    shortTitle: 'SQL & ORM Systems',
    category: 'Systems',
    estimatedHours: 5.0,
    bloomsLevel: 'Apply & Implement',
    description: 'Bridge algorithms with durable persistent storage. Master relational algebra, multi-table JOINs, PostgreSQL 3-valued NULL logic, ACID transaction isolation levels, indexing (B-Tree vs Hash), and type-safe Prisma v7 ORM schemas.',
    prerequisites: ['CS201.02'],
    learningOutcomes: [
      'Execute multi-table INNER, LEFT, RIGHT, and FULL OUTER joins with aggregation and GROUP BY filtering.',
      'Handle NULL 3-valued logic correctly using `IS NULL`, `IS DISTINCT FROM`, and `COALESCE`.',
      'Model relational schemas with 1:1, 1:N, and N:M relationships with cascade deletes in Prisma.',
      'Prevent race conditions using atomic database transactions and guarded conditional updates.',
    ],
    keyInvariantsAndTheorems: [
      'Relational Completeness: Relational algebra operators (Select, Project, Join, Union, Difference) express all first-order queries.',
      'ACID Invariant: Atomicity, Consistency, Isolation, and Durability guarantee transaction integrity.',
      'B-Tree Index Invariant: Balanced B-Trees ensure O(log N) disk block reads for primary and secondary keys.',
    ],
    standardCoreProblems: [
      {
        id: 'p-sql-belt',
        title: 'Department Top Earners (SQL Window Functions)',
        difficulty: 'Medium',
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(N)',
        description: 'Identify top 3 highest earners per department using DENSE_RANK() OVER (PARTITION BY).',
      },
    ],
    comicChapterRef: 'SQL Saga & Prisma Hub',
    sagaRef: 'sql',
  },
  {
    id: 'mod-10',
    moduleNumber: 10,
    code: 'MATH210',
    title: 'Linear Algebra & Matrix Transformations for AI',
    shortTitle: 'Maths to AI Vectors',
    category: 'Advanced',
    estimatedHours: 5.0,
    bloomsLevel: 'Analyze & Optimize',
    description: 'Master the mathematical foundations powering graphics, game engines, and modern Machine Learning / LLMs. Vector spaces, linear combinations, dot products, matrix multiplication as space transformations, determinant scaling, and eigenvalues/eigenvectors.',
    prerequisites: ['High School Algebra'],
    learningOutcomes: [
      'Interpret matrix-vector multiplication A*x as transforming space: basis vectors i_hat and j_hat land on matrix columns.',
      'Calculate dot products as geometric projections and cross products as oriented area vectors.',
      'Compute matrix determinants as the signed volume scaling factor of spatial transformations.',
      'Find eigenvalues and eigenvectors representing invariant axes that only scale without rotation.',
    ],
    keyInvariantsAndTheorems: [
      'Transformation Invariant: Grid lines remain parallel and evenly spaced under any linear transformation.',
      'Determinant Scaling: det(A) = 0 indicates transformation squashes space into lower dimension (non-invertible).',
      'Eigenvector Invariant: A*v = lambda*v; the vector v stays on its own span during the transformation.',
    ],
    standardCoreProblems: [
      {
        id: 'p-matrix-dot',
        title: 'Dot Product & Cosine Similarity in High Dimensions',
        difficulty: 'Easy',
        timeComplexity: 'O(D)',
        spaceComplexity: 'O(1)',
        description: 'Calculate cosine similarity between embedding vectors in D-dimensional AI space.',
      },
    ],
    comicChapterRef: 'Linear Algebra Comic Adventure',
    sagaRef: 'linear-algebra',
  },
];

export interface StudyRoutineStep {
  stepNumber: number;
  timeEstimate: string;
  phase: string;
  title: string;
  description: string;
  actionLabel: string;
  targetTab: string;
  icon: string;
}

export const STANDARD_90MIN_STUDY_ROUTINE: StudyRoutineStep[] = [
  {
    stepNumber: 1,
    timeEstimate: '05:00 - 05:20 AM (20m)',
    phase: 'Morning Crucible',
    title: 'Solve Today’s 5:00 AM POTD Vault',
    description: 'The morning challenge unlocks at 5:00 AM. Implement in the Python VS Code IDE, run test cases, and automatically direct-commit to your live GitHub repository.',
    actionLabel: 'Launch Today’s POTD',
    targetTab: 'quest',
    icon: '🌅',
  },
  {
    stepNumber: 2,
    timeEstimate: '05:20 - 05:45 AM (25m)',
    phase: 'Conceptual Rigor',
    title: 'Theory, Invariant Proofs & Code Sandbox',
    description: 'Read the day’s curriculum lecture with Professor Algorismus and Byte. Review loop invariants, Master Theorem derivations, and experiment in the interactive subtopic IDE.',
    actionLabel: 'Open Theory Viewer',
    targetTab: 'theory',
    icon: '📖',
  },
  {
    stepNumber: 3,
    timeEstimate: '05:45 - 06:15 AM (30m)',
    phase: 'Sequential Application',
    title: 'Sequential Homework Quota (HW #1 ➔ HW #2)',
    description: 'Solve assigned homework quests in pedagogical sequence (HW #1 must be solved to unlock HW #2; +2 weekend rush on Sat/Sun). Each solve extends your verified streak.',
    actionLabel: 'Solve Homework Quota',
    targetTab: 'quest',
    icon: '📝',
  },
  {
    stepNumber: 4,
    timeEstimate: '06:15 - 06:30 AM (15m)',
    phase: 'Combat & Long-Term Retention',
    title: 'Bug Hunt Arena or 1v1 Battle vs Bugsy',
    description: 'Seal neurological memory by finding hidden edge-case bugs in the Bug Hunt Arena, or challenge Bugsy to a 3-minute 1v1 live code duel to test syntax speed under pressure.',
    actionLabel: 'Enter Combat Arena',
    targetTab: 'duel',
    icon: '⚔️',
  },
];
