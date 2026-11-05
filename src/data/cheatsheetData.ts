export const sortingAlgorithmsData = [
  { name: 'Bubble / Insertion / Selection', best: 'n (ins.)', avg: 'n²', worst: 'n²', space: 'O(1)', stable: 'B, I yes; S no' },
  { name: 'Merge sort', best: 'n log n', avg: 'n log n', worst: 'n log n', space: 'O(n)', stable: 'Yes' },
  { name: 'Quick sort', best: 'n log n', avg: 'n log n', worst: 'n²', space: 'O(log n)', stable: 'No' },
  { name: 'Heap sort', best: 'n log n', avg: 'n log n', worst: 'n log n', space: 'O(1)', stable: 'No' },
  { name: 'Counting sort', best: 'n + k', avg: 'n + k', worst: 'n + k', space: 'O(k)', stable: 'Yes' },
];

export const dataStructuresData = [
  { structure: 'Array', access: 'O(1)', search: 'O(n)', insert: 'O(n)', delete: 'O(n)', notes: 'contiguous memory' },
  { structure: 'Linked list', access: 'O(n)', search: 'O(n)', insert: 'O(1)*', delete: 'O(1)*', notes: '*given node pointer' },
  { structure: 'Stack / Queue', access: '—', search: 'O(n)', insert: 'O(1)', delete: 'O(1)', notes: 'LIFO / FIFO' },
  { structure: 'Hash table', access: '—', search: 'O(1) avg', insert: 'O(1) avg', delete: 'O(1) avg', notes: 'unordered keys' },
  { structure: 'BST (balanced)', access: '—', search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)', notes: 'ordered keys' },
  { structure: 'Binary heap', access: '—', search: 'O(n)', insert: 'O(log n)', delete: 'O(log n)', notes: 'O(1) peek min/max' },
];

export const graphAlgorithmsData = [
  { algorithm: 'BFS / DFS', purpose: 'traversal, components, shortest path (BFS unweighted)', time: 'O(V + E)' },
  { algorithm: 'Topological sort (Kahn)', purpose: 'order a DAG by prerequisites', time: 'O(V + E)' },
  { algorithm: 'Dijkstra', purpose: 'shortest paths, weights >= 0', time: 'O((V + E) log V)' },
  { algorithm: 'Bellman-Ford', purpose: 'shortest paths with negative weights', time: 'O(V * E)' },
  { algorithm: 'Floyd-Warshall', purpose: 'all pairs shortest paths', time: 'O(V³)' },
  { algorithm: 'Kruskal / Prim', purpose: 'minimum spanning tree', time: 'O(E log E)' },
  { algorithm: 'Union-Find (DSU)', purpose: 'connectivity / cycle check', time: '~ O(1) per op' },
];

export const paradigmsData = [
  { paradigm: 'Divide & conquer', coreIdea: 'split, solve independently, combine', example: 'merge sort, quick sort, binary search' },
  { paradigm: 'Dynamic programming', coreIdea: 'store answers to overlapping subproblems', example: 'LCS, knapsack, coin change' },
  { paradigm: 'Greedy', coreIdea: 'best local choice, never undo', example: 'activity selection, Huffman, Dijkstra' },
  { paradigm: 'Backtracking', coreIdea: 'choose, explore, undo + prune', example: 'N-Queens, subsets, Sudoku' },
  { paradigm: 'Two pointers / window', coreIdea: 'move pointers monotonically', example: 'two-sum sorted, longest substring' },
];

export const glossaryData = [
  { term: 'Algorithm', meaning: 'A step-by-step recipe that solves a problem.' },
  { term: 'Big-O', meaning: 'Upper bound on how fast work grows with input size.' },
  { term: 'Amortized', meaning: 'Average cost per operation over a long sequence.' },
  { term: 'Recurrence', meaning: 'An equation defining a function by smaller versions of itself.' },
  { term: 'Pivot', meaning: 'The element quick sort uses to split the array.' },
  { term: 'Stable sort', meaning: 'Equal keys keep their original relative order.' },
  { term: 'Complete tree', meaning: 'Every level full except possibly last, filled left to right.' },
  { term: 'Heapify', meaning: 'Restore heap property by sifting a node up or down.' },
  { term: 'Subtree', meaning: 'A node together with all its descendants.' },
  { term: 'Pruning', meaning: 'Cutting off a search branch that cannot succeed.' },
  { term: 'State space', meaning: 'The set of all partial solutions a search can visit.' },
  { term: 'Adjacency list', meaning: 'For each vertex, the list of its immediate neighbours.' },
  { term: 'DAG', meaning: 'Directed Acyclic Graph: directed, no cycles.' },
  { term: 'Relaxation', meaning: 'Improving a distance estimate via a better connecting path.' },
  { term: 'Spanning tree', meaning: 'Tree that touches every vertex of a graph with V - 1 edges.' },
  { term: 'Memoization', meaning: 'Caching results of a recursive function call.' },
  { term: 'Optimal substructure', meaning: 'An optimal answer is constructed from optimal subproblems.' },
  { term: 'Exchange argument', meaning: 'A proof technique showing a greedy choice is safe.' },
  { term: 'Monotonic', meaning: 'Only ever changes in one direction (e.g. NO NO NO YES YES).' },
  { term: 'Prefix sum', meaning: 'Running totals that give any contiguous range sum in O(1).' },
  { term: 'Hash collision', meaning: 'Two distinct keys mapping to the same bucket slot.' }
];
