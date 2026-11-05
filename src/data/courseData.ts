import { Chapter } from '../types';

export const courseChapters: Chapter[] = [
  // --- CHAPTER 1 ---
  {
    id: 1,
    title: 'Time Complexity & Master Theorem',
    tagline: 'How fast is fast? Predict the speed of code before you even run it!',
    color: '#FFDE59',
    comicDialogue: [
      { speaker: 'byte', text: 'My code took 10 seconds on 100,000 numbers! It is only a nested loop... what went wrong?!', reaction: 'zap' },
      { speaker: 'professor', text: 'Ah, Byte! Speed is not about seconds. It is about how the WORK GROWS when input grows. We call it complexity.', reaction: 'aha' },
      { speaker: 'bugsy', text: 'Heh heh... I live inside your n^2 loops, and I get fatter every time n doubles! MUAHA!', reaction: 'muaha' },
      { speaker: 'byte', text: 'So if n doubles, a quadratic loop does 4 times the work?!', reaction: 'gulp' },
      { speaker: 'professor', text: 'Exactly! Today: Big-O, loop counting, and the mighty MASTER THEOREM.', reaction: 'aha' }
    ],
    subtopics: [
      {
        id: '1.1',
        sectionNumber: '1.1',
        title: 'Big-O, Omega, Theta & Growth Rates',
        overview: 'An algorithm’s time complexity counts how many basic steps it performs as a function of the input size n. We never measure seconds, because seconds depend on your laptop, your language, and the weather. Steps do not.',
        keyIdea: 'We measure the rate of growth of steps as n approaches infinity. Notation: O (upper bound), Omega (lower bound), Theta (tight fit).',
        watchOut: 'Big-O is NOT the same thing as "worst case"! Worst, best, and average are about WHICH INPUT you feed the algorithm. Big-O, Omega, and Theta are mathematical curves that BOUND the growth.',
        trick: 'Computers do roughly 10^8 simple operations per second. So: n up to 10^5 needs O(n log n) or better; n up to 5,000 allows O(n^2); n up to 20 allows O(2^n); n up to 10 allows O(n!). Read problem constraints to identify the intended algorithm!',
        realLife: 'Finding a name in a phone book: reading every single page is O(n). Opening to the middle and halving again and again is O(log n). A book with 1,000,000 pages needs only about 20 halvings!',
        codeSnippets: [
          {
            title: 'Sum 1 to n in O(1)',
            code: `def sum_to(n):
    # Gauss formula: constant time, one multiplication, one division
    return n * (n + 1) // 2

print(sum_to(100)) # 5050`,
            explanation: 'Replaces an O(n) loop with a closed mathematical formula running in O(1) time.'
          },
          {
            title: 'Detect Duplicates in O(n) with a Set',
            code: `def has_duplicate(a):
    seen = set()
    for x in a:
        if x in seen:
            return True
        seen.add(x)
    return False`,
            explanation: 'Traded O(n) extra space to drop time from quadratic O(n^2) pair-checking to linear O(n).'
          }
        ],
        quizzes: [
          {
            id: 'q1-1',
            question: 'What is the Big-O of f(n) = 3n^2 + 10n + 100?',
            options: ['O(n)', 'O(n^2)', 'O(n^3)', 'O(100)'],
            correctAnswerIndex: 1,
            explanation: 'Rule 1: Drop constants. Rule 2: Keep only the highest degree term (3n^2 dominates 10n and 100 as n -> inf).'
          },
          {
            id: 'q1-2',
            question: 'Linear search for x in an array of n items. Which statement is correct?',
            options: [
              'Best case O(1), worst case O(n)',
              'Best case O(n), worst case O(n)',
              'Best case O(log n), worst case O(n)',
              'Worst case O(1)'
            ],
            correctAnswerIndex: 0,
            explanation: 'If x is the first element, it terminates in 1 step: O(1). If x is at the end or absent, it inspects all n items: O(n).'
          }
        ],
        mythBusters: [
          {
            myth: 'Big-O tells me the exact running time in milliseconds.',
            fact: 'Big-O only describes how time GROWS with n. An O(n) algorithm with huge constant overhead can be slower than O(n^2) for tiny inputs!'
          },
          {
            myth: 'O(2n) is slower than O(n).',
            fact: 'Constant multipliers are dropped in asymptotic analysis: O(2n) = O(n). They belong to the identical linear growth class.'
          }
        ],
        powerCard: [
          { topic: 'Rules', remember: 'Drop constants. Keep biggest term. Nested = multiply, sequential = add.' },
          { topic: 'Limits', remember: '10^5 -> O(n log n). 5000 -> O(n^2). 20 -> O(2^n). 10 -> O(n!).' }
        ]
      },
      {
        id: '1.2',
        sectionNumber: '1.2',
        title: 'Counting Loops, Recursion & Space',
        overview: 'To determine code complexity, calculate how many times the innermost bottleneck statement executes. For recursion, multiply number of recursive calls by work done per call.',
        keyIdea: 'Nested loops = multiply. Sequential loops = add (keep the max). Halving or doubling = logarithm log(n).',
        watchOut: 'Space complexity includes the call stack! A function that recurses n levels deep uses O(n) stack frames even if it allocates 0 arrays.',
        trick: 'Amortized analysis: Appending to a Python list occasionally doubles the internal buffer. But across n appends, the amortized cost per append is O(1).',
        codeSnippets: [
          {
            title: 'Fast Exponentiation in O(log n)',
            code: `def power(x, n):
    if n == 0:
        return 1
    half = power(x, n // 2)
    return half * half if n % 2 == 0 else half * half * x

# T(n) = T(n/2) + O(1) -> O(log n)`,
            explanation: 'Halving the exponent each step reduces multiplications from n down to log2(n).'
          }
        ],
        quizzes: [
          {
            id: 'q1-3',
            question: 'What is the time complexity of a loop: i = 1; while i < n: i *= 2 ?',
            options: ['O(n)', 'O(log n)', 'O(sqrt n)', 'O(n log n)'],
            correctAnswerIndex: 1,
            explanation: 'i doubles each step (1, 2, 4, 8... 2^k). Reaches n when k = log2(n), hence O(log n) iterations.'
          }
        ]
      },
      {
        id: '1.3',
        sectionNumber: '1.3',
        title: 'Recurrences & the Master Theorem',
        overview: 'Divide-and-conquer algorithms split problems into `a` subproblems each of size `n/b`, with `f(n)` split/merge cost: T(n) = a*T(n/b) + f(n).',
        keyIdea: 'Compare work at the bottom leaves (n^(log_b a)) with work at the top root f(n). Case 1: Leaves win -> Theta(n^c). Case 2: Tie -> Theta(n^c * log n). Case 3: Root wins -> Theta(f(n)).',
        watchOut: 'Master Theorem ONLY works for subproblems of size n/b! For subtractive recurrences like T(n) = T(n-1) + n, use the recursion tree (yields O(n^2)).',
        trick: 'The 4-Step Recipe: (1) Identify a, b, f(n). (2) Compute c = log_b(a). (3) Compare f(n) with n^c. (4) Pick Case 1, 2, or 3.',
        codeSnippets: [
          {
            title: 'Verifying n log n by instrumenting operations',
            code: `count = 0
def f(n):
    global count
    if n <= 1:
        return
    f(n // 2)
    f(n // 2)
    count += n

f(1024)
print(count) # 10240 = 1024 * 10 = n * log2(n)`,
            explanation: 'Directly mirrors Merge Sort recurrence T(n) = 2T(n/2) + n: Case 2 tie yields Theta(n log n).'
          }
        ],
        quizzes: [
          {
            id: 'q1-4',
            question: 'Solve T(n) = 2T(n/2) + n using Master Theorem.',
            options: ['Theta(n)', 'Theta(n log n)', 'Theta(n^2)', 'Theta(log n)'],
            correctAnswerIndex: 1,
            explanation: 'a=2, b=2, c=log2(2)=1. f(n) = n = n^1. Since f(n) == n^c, this is Case 2 (Tie): Theta(n log n).'
          }
        ]
      }
    ]
  },

  // --- CHAPTER 2 ---
  {
    id: 2,
    title: 'Quick Sort & Partitioning',
    tagline: 'Pick a pivot, split the crowd, repeat. The sorting algorithm interviewers love!',
    color: '#FF914D',
    comicDialogue: [
      { speaker: 'byte', text: 'Merge sort is O(n log n) but needs a whole extra array. Is there a lazier way?', reaction: 'oops' },
      { speaker: 'professor', text: 'Quick Sort! Pick a PIVOT. Put smaller items on its left, bigger on its right. Then repeat on both sides.', reaction: 'aha' },
      { speaker: 'byte', text: 'So after ONE pass the pivot is already in its final sorted spot?!', reaction: 'yeah' },
      { speaker: 'bugsy', text: 'And if you always pick the smallest pivot on an already sorted array... n^2 for you, hehe!', reaction: 'muaha' },
      { speaker: 'professor', text: 'That is why we randomize or choose median-of-three! Let us inspect the partition step.', reaction: 'aha' }
    ],
    subtopics: [
      {
        id: '2.1',
        sectionNumber: '2.1',
        title: 'Divide & Conquer & Merge Sort Warm-up',
        overview: 'Divide & conquer operates in three movements: Divide, Conquer, Combine. Merge sort does heavy lifting during combine (merging two sorted sublists). Quick sort does all work in divide (partitioning) with an empty combine.',
        keyIdea: 'Merge Sort is O(n log n) in ALL cases and is STABLE (preserves equal keys order), but requires O(n) auxiliary memory.',
        watchOut: 'Always remember the base case `if len(a) <= 1: return a` before halving.',
        codeSnippets: [
          {
            title: 'Merge Sort implementation',
            code: `def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    L = merge_sort(a[:mid])
    R = merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i < len(L) and j < len(R):
        if L[i] <= R[j]:
            out.append(L[i]); i += 1
        else:
            out.append(R[j]); j += 1
    return out + L[i:] + R[j:]`,
            explanation: 'Stable sort: using `<=` preserves relative order of duplicate elements.'
          }
        ],
        quizzes: [
          {
            id: 'q2-1',
            question: 'Merge sort worst-case running time is:',
            options: ['O(n log n)', 'O(n^2)', 'O(n)', 'O(log n)'],
            correctAnswerIndex: 0,
            explanation: 'Merge sort always splits cleanly in half regardless of data distribution: O(n log n) always.'
          }
        ]
      },
      {
        id: '2.2',
        sectionNumber: '2.2',
        title: 'Lomuto Partition & Quick Sort',
        overview: 'Lomuto partition sets pivot = a[hi]. Pointer i tracks boundary of elements smaller than pivot; pointer j scans ahead. Whenever a[j] <= pivot, increment i and swap a[i] with a[j]. Finally swap pivot to i+1.',
        keyIdea: 'After one partition call, the pivot is permanently in its FINAL sorted location!',
        watchOut: 'Quick sort is NOT stable due to long-distance swaps jumping across equal keys.',
        codeSnippets: [
          {
            title: 'Lomuto Partition & In-place Quick Sort',
            code: `def partition(a, lo, hi):
    pivot = a[hi]
    i = lo - 1
    for j in range(lo, hi):
        if a[j] <= pivot:
            i += 1
            a[i], a[j] = a[j], a[i]
    a[i + 1], a[hi] = a[hi], a[i + 1]
    return i + 1

def quick_sort(a, lo=0, hi=None):
    if hi is None: hi = len(a) - 1
    if lo < hi:
        p = partition(a, lo, hi)
        quick_sort(a, lo, p - 1)
        quick_sort(a, p + 1, hi)`,
            explanation: 'Sorts in-place with O(1) auxiliary space beyond recursion stack.'
          }
        ],
        quizzes: [
          {
            id: 'q2-2',
            question: 'What is the time cost of ONE partition call on an array of length n?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
            correctAnswerIndex: 2,
            explanation: 'Pointer j scans linearly from lo to hi: exactly linear O(n) work.'
          }
        ]
      },
      {
        id: '2.3',
        sectionNumber: '2.3',
        title: 'Quickselect: k-th Smallest in O(n) Average',
        overview: 'To find the k-th smallest element, we do NOT need to sort everything! Partition once: if pivot index == k, return pivot. If p < k, search only right side; else search only left side.',
        keyIdea: 'Work shrinks by half each round: n + n/2 + n/4 + ... <= 2n = O(n) expected time!',
        trick: 'Median-of-three or random pivot selection foils worst-case adversary inputs.',
        codeSnippets: [
          {
            title: 'Quickselect implementation',
            code: `import random

def quickselect(a, k): # 0-indexed k-th smallest
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        r = random.randint(lo, hi)
        a[r], a[hi] = a[hi], a[r]
        p = partition(a, lo, hi)
        if p == k: return a[p]
        elif p < k: lo = p + 1
        else: hi = p - 1`,
            explanation: 'Discards one entire half on every iteration: linear average time.'
          }
        ],
        quizzes: [
          {
            id: 'q2-3',
            question: 'Average time complexity of Quickselect is:',
            options: ['O(log n)', 'O(n)', 'O(n log n)', 'O(n^2)'],
            correctAnswerIndex: 1,
            explanation: 'Because it only recurses into one branch, the geometric series n + n/2 + n/4 = O(n).'
          }
        ]
      }
    ]
  },

  // --- CHAPTER 3 ---
  {
    id: 3,
    title: 'Binary Search Tree (BST)',
    tagline: 'Left is smaller, right is bigger. The tree that plays higher or lower with your data!',
    color: '#38B6FF',
    comicDialogue: [
      { speaker: 'byte', text: 'I have 1,000,000 items. Searching a linked list one by one takes forever!', reaction: 'oops' },
      { speaker: 'professor', text: 'Put them in a Binary Search Tree: left child smaller, right child bigger. Every comparison throws away half!', reaction: 'aha' },
      { speaker: 'bugsy', text: 'Unless you insert 1, 2, 3, 4, 5 in sorted order... then your tree is just a STICK! Hehehe.', reaction: 'muaha' },
      { speaker: 'professor', text: 'True! That is why balance matters. Let us see how traversals, rotations, and LCA work.', reaction: 'yeah' }
    ],
    subtopics: [
      {
        id: '3.1',
        sectionNumber: '3.1',
        title: 'The BST Property, Search & Insert',
        overview: 'For every node in a BST: all values in the entire left subtree are strictly smaller, and all values in the right subtree are strictly larger.',
        keyIdea: 'Search and insert cost O(h) where h is the tree height. Balanced tree: h = log2(n). Degenerate stick: h = n.',
        watchOut: 'The BST property applies to the ENTIRE subtree, not just local parent-child pairs!',
        codeSnippets: [
          {
            title: 'Validate BST with (lo, hi) Bounds',
            code: `def is_valid_bst(node, lo=float('-inf'), hi=float('inf')):
    if not node:
        return True
    if not (lo < node.val < hi):
        return False
    return (is_valid_bst(node.left, lo, node.val) and
            is_valid_bst(node.right, node.val, hi))`,
            explanation: 'Propagates strict bounds down the recursion to catch distant violations.'
          }
        ],
        quizzes: [
          {
            id: 'q3-1',
            question: 'What traversal of a BST always yields values in sorted ascending order?',
            options: ['Preorder', 'Inorder', 'Postorder', 'Level order'],
            correctAnswerIndex: 1,
            explanation: 'Inorder traversal visits (Left, Root, Right), which matches the BST sorting property.'
          }
        ]
      },
      {
        id: '3.2',
        sectionNumber: '3.2',
        title: 'Traversals & Deletion (3 Cases)',
        overview: 'Deleting a node from a BST has 3 cases: (1) Leaf node: delete directly. (2) One child: splice node with its child. (3) Two children: swap value with inorder successor (smallest in right subtree), then delete successor.',
        keyIdea: 'The inorder successor is the leftmost node in the right subtree: guaranteed to have at most one child.',
        codeSnippets: [
          {
            title: 'BST Delete Node implementation',
            code: `def delete_node(root, key):
    if not root: return None
    if key < root.val: root.left = delete_node(root.left, key)
    elif key > root.val: root.right = delete_node(root.right, key)
    else:
        if not root.left: return root.right
        if not root.right: return root.left
        succ = root.right
        while succ.left: succ = succ.left
        root.val = succ.val
        root.right = delete_node(root.right, succ.val)
    return root`,
            explanation: 'Handles zero, one, and two children scenarios cleanly.'
          }
        ],
        quizzes: [
          {
            id: 'q3-2',
            question: 'To delete a node with two children, replace it with its:',
            options: ['Left child', 'Inorder successor (or predecessor)', 'Right child', 'Parent'],
            correctAnswerIndex: 1,
            explanation: 'Only the inorder successor or predecessor maintains ordering across both subtrees.'
          }
        ]
      }
    ]
  },

  // --- CHAPTER 4 ---
  {
    id: 4,
    title: 'Heap & Priority Queue',
    tagline: 'The VIP line of data structures: the most important item is ALWAYS at the front!',
    color: '#7ED957',
    comicDialogue: [
      { speaker: 'byte', text: 'In the Emergency Room, patients keep arriving. Sorting everyone after each arrival is too slow!', reaction: 'oops' },
      { speaker: 'professor', text: 'Use a HEAP! The most urgent item sits at the top. Peek in O(1) and fix in O(log n).', reaction: 'aha' },
      { speaker: 'byte', text: 'So a heap is a sorted list?', reaction: 'gulp' },
      { speaker: 'professor', text: 'No! Only each parent beats its children. Just enough order, and cheap to maintain.', reaction: 'yeah' },
      { speaker: 'bugsy', text: 'And it hides inside a plain array! No pointers needed: children of i live at 2i+1 and 2i+2! SNEAKY!', reaction: 'muaha' }
    ],
    subtopics: [
      {
        id: '4.1',
        sectionNumber: '4.1',
        title: 'Heap Property & Array Representation',
        overview: 'A binary heap is a complete binary tree stored in an array without pointers. Parent of i: (i-1)//2. Left child: 2i+1. Right child: 2i+2. Leaves start at n//2.',
        keyIdea: 'Min-heap: every parent <= its children (min at root). Max-heap: every parent >= children (max at root).',
        watchOut: 'A heap is NOT sorted! Siblings have no order relationship between each other.',
        codeSnippets: [
          {
            title: 'MinHeap with Sift-Up and Sift-Down',
            code: `class MinHeap:
    def __init__(self):
        self.a = []
    def push(self, x):
        self.a.append(x)
        i = len(self.a) - 1
        while i > 0 and self.a[(i - 1) // 2] > self.a[i]:
            p = (i - 1) // 2
            self.a[p], self.a[i] = self.a[i], self.a[p]
            i = p
    def pop(self):
        top = self.a[0]
        last = self.a.pop()
        if self.a:
            self.a[0] = last
            self._sift_down(0)
        return top`,
            explanation: 'Push appends and sifts up; Pop extracts root, puts last element at root, and sifts down.'
          }
        ],
        quizzes: [
          {
            id: 'q4-1',
            question: 'In a 0-indexed heap array, what is the parent index of node at index 5?',
            options: ['1', '2', '3', '4'],
            correctAnswerIndex: 1,
            explanation: 'Formula: (5 - 1) // 2 = 4 // 2 = 2.'
          }
        ]
      },
      {
        id: '4.2',
        sectionNumber: '4.2',
        title: 'Build-Heap in O(n) & Top-K with Heap',
        overview: 'Building a heap by inserting n items one by one takes O(n log n). But bottom-up heapify by sifting down from n//2 - 1 down to 0 takes only O(n) time!',
        keyIdea: 'To find top K largest in a stream of n items, keep a MIN-heap of size K. Discard whenever size exceeds K. Runs in O(n log K) time and O(K) space.',
        codeSnippets: [
          {
            title: 'Top K Largest in a Stream',
            code: `import heapq

def k_largest(nums, k):
    h = []
    for x in nums:
        heapq.heappush(h, x)
        if len(h) > k:
            heapq.heappop(h) # throw away smallest
    return sorted(h, reverse=True)

print(k_largest([4, 9, 1, 7, 3, 8], 3)) # [9, 8, 7]`,
            explanation: 'Min-heap root always holds the k-th largest element seen so far.'
          }
        ],
        quizzes: [
          {
            id: 'q4-2',
            question: 'Building a binary heap from n unordered items with bottom-up heapify takes:',
            options: ['O(log n)', 'O(n)', 'O(n log n)', 'O(n^2)'],
            correctAnswerIndex: 1,
            explanation: 'Because most nodes are at the bottom and sift down very few levels, the summation converges to O(n).'
          }
        ]
      }
    ]
  },

  // --- CHAPTER 5 ---
  {
    id: 5,
    title: 'Backtracking & Pruning',
    tagline: 'Choose. Explore. UNDO. The art of trying everything... cleverly!',
    color: '#8C52FF',
    comicDialogue: [
      { speaker: 'byte', text: 'I must list every subset, arrangement, and valid board. Where do I even begin?!', reaction: 'oops' },
      { speaker: 'professor', text: 'Backtracking! Make a choice, explore deeper, and if it fails, UNDO the choice and try the next door.', reaction: 'aha' },
      { speaker: 'byte', text: 'So it is just brute force?', reaction: 'gulp' },
      { speaker: 'professor', text: 'Smart brute force! The moment a path cannot work, we abandon it. That is called PRUNING.', reaction: 'yeah' },
      { speaker: 'bugsy', text: 'And if you forget to undo your choice... I will eat your state! Muahaha!', reaction: 'muaha' }
    ],
    subtopics: [
      {
        id: '5.1',
        sectionNumber: '5.1',
        title: 'The Universal Backtracking Template',
        overview: 'Backtracking explores a state-space tree depth-first. At each decision point: (1) Choose option, (2) Recurse, (3) Un-choose (undo option).',
        keyIdea: 'Always save a copy when recording solutions: `res.append(path[:])`! If you append path directly, later pops will leave all results empty.',
        watchOut: 'Forgetting to undo shared state corrupts sibling branches.',
        codeSnippets: [
          {
            title: 'Universal Subsets Template',
            code: `def subsets(nums):
    res, path = [], []
    def bt(start):
        res.append(path[:])
        for i in range(start, len(nums)):
            path.append(nums[i]) # 1. Choose
            bt(i + 1)           # 2. Explore
            path.pop()          # 3. Un-choose
    bt(0)
    return res`,
            explanation: 'Generates all 2^n subsets by deciding whether each element comes next.'
          }
        ],
        quizzes: [
          {
            id: 'q5-1',
            question: 'Why do we call path.pop() after the recursive call?',
            options: ['To save memory', 'To restore state before exploring the next option', 'To sort the array', 'It is optional'],
            correctAnswerIndex: 1,
            explanation: 'The same array is shared across sibling branches; popping restores it to a clean slate.'
          }
        ]
      },
      {
        id: '5.2',
        sectionNumber: '5.2',
        title: 'N-Queens & Intelligent Pruning',
        overview: 'Place n queens on an n x n board so no two attack each other. Place one queen per row. For column c at row r: check conflicts in column set, r-c diagonal set, and r+c anti-diagonal set in O(1).',
        keyIdea: 'Pruning reduces placements from n^n down to a tiny fraction of valid paths.',
        codeSnippets: [
          {
            title: 'N-Queens Solver',
            code: `def solve_n_queens(n):
    cols, d1, d2 = set(), set(), set()
    board, res = [], []
    def bt(r):
        if r == n:
            res.append(board[:]); return
        for c in range(n):
            if c in cols or (r - c) in d1 or (r + c) in d2:
                continue # PRUNE
            cols.add(c); d1.add(r - c); d2.add(r + c); board.append(c)
            bt(r + 1)
            board.pop(); cols.remove(c); d1.remove(r - c); d2.remove(r + c)
    bt(0)
    return res`,
            explanation: 'Uses O(1) set membership to prune attacks along diagonals and columns.'
          }
        ],
        quizzes: [
          {
            id: 'q5-2',
            question: 'How many valid solutions exist for the 4-Queens problem?',
            options: ['1', '2', '4', '24'],
            correctAnswerIndex: 1,
            explanation: 'The 4-Queens problem has exactly 2 solutions: [1, 3, 0, 2] and [2, 0, 3, 1].'
          }
        ]
      }
    ]
  },

  // --- CHAPTER 6 ---
  {
    id: 6,
    title: 'Graphs: BFS, DFS & More',
    tagline: 'Cities, friends, web pages, maps: the world is one giant graph!',
    color: '#38B6FF',
    comicDialogue: [
      { speaker: 'byte', text: 'Maps, friends, web links, dependencies... is EVERYTHING a graph?!', reaction: 'zap' },
      { speaker: 'professor', text: 'Almost! Nodes and Edges. Two great explorers: BFS, the ripple in a pond, and DFS, the maze runner.', reaction: 'aha' },
      { speaker: 'bugsy', text: 'BFS uses a QUEUE. DFS uses a STACK (or recursion). Mix them up and I win! HAHA!', reaction: 'muaha' },
      { speaker: 'byte', text: 'And what about shortest paths with weights?', reaction: 'aha' },
      { speaker: 'professor', text: 'BFS for unweighted, Dijkstra for weighted. Plus topological sort and minimum spanning trees. Let us go!', reaction: 'yeah' }
    ],
    subtopics: [
      {
        id: '6.1',
        sectionNumber: '6.1',
        title: 'Graph Representation & Breadth-First Search (BFS)',
        overview: 'Graphs can be represented as an Adjacency List O(V + E) or Adjacency Matrix O(V^2). BFS explores in concentric rings using a FIFO queue: guarantees shortest path in unweighted graphs.',
        keyIdea: 'Mark vertices visited when you PUSH them into the queue, not when you pop! Marking on pop causes redundant enqueueing and queue explosion.',
        codeSnippets: [
          {
            title: 'BFS Shortest Path',
            code: `from collections import deque

def bfs(graph, start):
    dist = {start: 0}
    q = deque([start])
    while q:
        u = q.popleft()
        for v in graph[u]:
            if v not in dist:
                dist[v] = dist[u] + 1
                q.append(v)
    return dist`,
            explanation: 'Visits nodes in non-decreasing order of distance from start.'
          }
        ],
        quizzes: [
          {
            id: 'q6-1',
            question: 'For a sparse graph with 100,000 vertices, which representation is preferred?',
            options: ['Adjacency matrix', 'Adjacency list', '2D grid', 'Stack'],
            correctAnswerIndex: 1,
            explanation: 'Adjacency matrix requires 10^10 cells (gigabytes), whereas adjacency list only needs O(V + E).'
          }
        ]
      },
      {
        id: '6.2',
        sectionNumber: '6.2',
        title: 'Topological Sort & Dijkstra’s Algorithm',
        overview: 'Topological sort (Kahn’s algorithm) orders DAG vertices using in-degrees: enqueue all vertices with in-degree 0. Dijkstra uses a min-heap to finalize closest vertices for weighted graphs with non-negative edges.',
        keyIdea: 'Dijkstra runs in O((V + E) log V). If weights can be negative, Dijkstra fails; use Bellman-Ford O(V*E).',
        codeSnippets: [
          {
            title: 'Dijkstra Shortest Path with Priority Queue',
            code: `import heapq

def dijkstra(graph, src):
    dist = {src: 0}
    pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist.get(u, float('inf')):
            continue
        for v, w in graph[u]:
            if d + w < dist.get(v, float('inf')):
                dist[v] = d + w
                heapq.heappush(pq, (d + w, v))
    return dist`,
            explanation: 'Continually relaxes edges from the closest confirmed node.'
          }
        ],
        quizzes: [
          {
            id: 'q6-2',
            question: 'Under what condition does Dijkstra algorithm fail?',
            options: ['Cycles', 'Negative edge weights', 'Undirected edges', 'More than 100 nodes'],
            correctAnswerIndex: 1,
            explanation: 'Negative weights can make an already finalized vertex cheaper later, breaking the greedy assumption.'
          }
        ]
      }
    ]
  },

  // --- CHAPTER 7 ---
  {
    id: 7,
    title: 'Dynamic Programming',
    tagline: 'Never solve the same problem twice! Remember your answers and fly.',
    color: '#FF5757',
    comicDialogue: [
      { speaker: 'byte', text: 'My recursive Fibonacci needs 10 minutes for n = 50! My computer is crying.', reaction: 'oops' },
      { speaker: 'professor', text: 'It solves the same subproblems again and again. Write each answer in a notebook the first time. That is Dynamic Programming!', reaction: 'aha' },
      { speaker: 'byte', text: 'Just a notebook? That is it?', reaction: 'gulp' },
      { speaker: 'professor', text: 'Plus the skill of defining the right STATE and a RECURRENCE. 2^50 steps collapse into 50!', reaction: 'boom' },
      { speaker: 'bugsy', text: 'Pick the wrong state and your notebook is full of nonsense! Hehe.', reaction: 'muaha' }
    ],
    subtopics: [
      {
        id: '7.1',
        sectionNumber: '7.1',
        title: 'Memoization vs Tabulation & 1D DP',
        overview: 'DP applies when problems have: (1) Overlapping subproblems, (2) Optimal substructure. Memoization is top-down recursion + hash cache. Tabulation is bottom-up iterative table filling.',
        keyIdea: 'DP = State definition + Recurrence relation + Base cases + Evaluation order + Space optimization.',
        codeSnippets: [
          {
            title: 'House Robber with O(1) Space',
            code: `def rob(nums):
    prev, cur = 0, 0
    for x in nums:
        prev, cur = cur, max(cur, prev + x)
    return cur`,
            explanation: 'Only relies on the previous two answers, reducing space from O(n) to O(1).'
          }
        ],
        quizzes: [
          {
            id: 'q7-1',
            question: 'What is the time complexity of memoized Fibonacci?',
            options: ['O(1)', 'O(n)', 'O(2^n)', 'O(n^2)'],
            correctAnswerIndex: 1,
            explanation: 'Each of the n states is computed exactly once, taking O(1) work per state: O(n) total.'
          }
        ]
      },
      {
        id: '7.2',
        sectionNumber: '7.2',
        title: '2D DP: LCS, 0/1 Knapsack & Grid Paths',
        overview: '2D DP covers problems with two dimensions (two strings, item choice + remaining capacity, or 2D grid coordinates).',
        keyIdea: 'In 1D Knapsack space optimization: loop capacity DOWNWARDS so each item is taken at most once (0/1). Going upwards creates unbounded knapsack!',
        codeSnippets: [
          {
            title: '0/1 Knapsack 1D space optimized',
            code: `def knapsack(items, cap): # items = [(w, v)]
    dp = [0] * (cap + 1)
    for w, v in items:
        for c in range(cap, w - 1, -1): # loop downwards
            dp[c] = max(dp[c], dp[c - w] + v)
    return dp[cap]`,
            explanation: 'Traversing backwards ensures dp[c - w] represents results without the current item.'
          }
        ],
        quizzes: [
          {
            id: 'q7-2',
            question: 'In 1D 0/1 knapsack, why do we iterate capacity backwards?',
            options: ['To save time', 'To avoid using the same item twice', 'To sort the items', 'To avoid recursion'],
            correctAnswerIndex: 1,
            explanation: 'Iterating downwards prevents an item from contributing to its own updated subproblem.'
          }
        ]
      }
    ]
  },

  // --- CHAPTER 8 ---
  {
    id: 8,
    title: 'Greedy Algorithms',
    tagline: 'Always grab the best-looking choice right now... and (sometimes) be right forever!',
    color: '#FFDE59',
    comicDialogue: [
      { speaker: 'byte', text: 'My bag holds 50 kg. Gold, silver, bronze... Just take the most valuable per kilo first, right?', reaction: 'aha' },
      { speaker: 'professor', text: 'That is GREEDY: make the best local choice, never look back. Fast and simple, but only valid when provable!', reaction: 'aha' },
      { speaker: 'bugsy', text: 'Heh! Take gold bars you cannot cut and your greedy plan collapses! Muahaha!', reaction: 'muaha' },
      { speaker: 'professor', text: 'Greedy-choice property plus an exchange argument. We shall see it in action.', reaction: 'yeah' }
    ],
    subtopics: [
      {
        id: '8.1',
        sectionNumber: '8.1',
        title: 'Greedy Choice Property & Activity Selection',
        overview: 'Greedy works when a local optimum is globally safe. To schedule the maximum non-overlapping meetings: sort by EARLIEST FINISH TIME.',
        keyIdea: 'Exchange argument proof: Take any optimal solution; swap its first meeting with the earliest-finishing meeting. It finishes no later, preserving compatibility.',
        codeSnippets: [
          {
            title: 'Activity Selection / Non-overlapping intervals',
            code: `def max_activities(acts):
    acts.sort(key=lambda a: a[1]) # sort by finish time
    count, last_end = 0, float('-inf')
    for s, f in acts:
        if s >= last_end:
            count += 1
            last_end = f
    return count`,
            explanation: 'Greedily frees up the conference room as early as possible.'
          }
        ],
        quizzes: [
          {
            id: 'q8-1',
            question: 'To maximize the count of non-overlapping meetings, sort by:',
            options: ['Start time', 'Duration', 'Finish time', 'Random'],
            correctAnswerIndex: 2,
            explanation: 'Sorting by finish time leaves maximal room for subsequent meetings.'
          }
        ]
      }
    ]
  },

  // --- CHAPTER 9 ---
  {
    id: 9,
    title: 'Binary Search, Two Pointers & Windows',
    tagline: 'Three tiny tricks that turn slow O(n^2) loops into lightning-fast O(n) and O(log n) code!',
    color: '#38B6FF',
    comicDialogue: [
      { speaker: 'byte', text: 'My loop checks every pair in the array. 100,000 numbers... it will never finish!', reaction: 'gulp' },
      { speaker: 'professor', text: 'Sorted data is a gift. Binary search halves the range; two pointers walk inward; a window slides along.', reaction: 'aha' },
      { speaker: 'byte', text: 'Never re-examine what you already know?', reaction: 'yeah' },
      { speaker: 'bugsy', text: 'Careful with your off-by-one errors. Those are MY favourite snacks! NOM!', reaction: 'nom' }
    ],
    subtopics: [
      {
        id: '9.1',
        sectionNumber: '9.1',
        title: 'Binary Search on the Answer',
        overview: 'Binary search does not just find elements in arrays. Whenever a yes/no condition is monotonic (NO NO NO YES YES), binary search finds the optimal boundary in O(log range).',
        keyIdea: 'Use the `first_true(lo, hi, check)` template: while lo < hi: mid = (lo+hi)//2; if check(mid): hi = mid else: lo = mid + 1.',
        codeSnippets: [
          {
            title: 'Koko Eating Bananas (Binary Search on Answer)',
            code: `def min_speed(piles, h):
    lo, hi = 1, max(piles)
    while lo < hi:
        k = (lo + hi) // 2
        hours_needed = sum((p + k - 1) // k for p in piles)
        if hours_needed <= h:
            hi = k
        else:
            lo = k + 1
    return lo`,
            explanation: 'Monotonic property: faster eating speed always needs less or equal hours.'
          }
        ],
        quizzes: [
          {
            id: 'q9-1',
            question: 'Maximum comparisons needed to binary search in 1,000,000 sorted items is about:',
            options: ['20', '1,000', '500,000', '1,000,000'],
            correctAnswerIndex: 0,
            explanation: 'log2(1,000,000) ~ 20. Only 20 checks to pinpoint 1 item out of a million!'
          }
        ]
      }
    ]
  },

  // --- CHAPTER 10 ---
  {
    id: 10,
    title: 'The Toolkit: Stacks, Lists, Hashing & Bits',
    tagline: 'Everyday heroes behind almost every interview question!',
    color: '#7ED957',
    comicDialogue: [
      { speaker: 'byte', text: 'Stacks, linked lists, hash maps, bit tricks... they look small. Do they matter?', reaction: 'aha' },
      { speaker: 'professor', text: 'They are the screwdrivers and hammers of programming. Every big algorithm uses them.', reaction: 'aha' },
      { speaker: 'bugsy', text: 'A hash map makes lookup O(1)... until you hand it a terrible hash function! SNEAKY!', reaction: 'muaha' },
      { speaker: 'professor', text: 'Bits are the fastest language of the machine. Learn four tricks and look like a wizard!', reaction: 'yeah' }
    ],
    subtopics: [
      {
        id: '10.1',
        sectionNumber: '10.1',
        title: 'Monotonic Stacks & Next Greater Element',
        overview: 'A monotonic stack maintains elements in strictly increasing or decreasing order. Finds the next greater or smaller element for every position in amortized O(n) time.',
        keyIdea: 'Every index is pushed once and popped at most once: total inner loop work over all iterations is bounded by 2n.',
        codeSnippets: [
          {
            title: 'Next Greater Element with Monotonic Stack',
            code: `def next_greater(nums):
    res, stack = [-1] * len(nums), []
    for i, x in enumerate(nums):
        while stack and nums[stack[-1]] < x:
            res[stack.pop()] = x
        stack.append(i)
    return res

print(next_greater([2, 1, 2, 4, 3])) # [4, 2, 4, -1, -1]`,
            explanation: 'When x beats elements on the stack, x is their next greater element.'
          }
        ],
        quizzes: [
          {
            id: 'q10-1',
            question: 'What is the amortized time complexity of Next Greater Element using a monotonic stack?',
            options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(log n)'],
            correctAnswerIndex: 2,
            explanation: 'Each element is pushed once and popped at most once: amortized O(n).'
          }
        ]
      },
      {
        id: '10.2',
        sectionNumber: '10.2',
        title: 'Bit Manipulation Wizardry',
        overview: 'Bitwise operations are instant single-cycle CPU operations. The expression `n & (n - 1)` clears the lowest set bit of n! `x ^ x = 0` cancels duplicate pairs.',
        keyIdea: 'Power of two test: `n > 0 and (n & (n - 1)) == 0`. Kernighan bit count: loop `n &= n - 1` until n is 0.',
        codeSnippets: [
          {
            title: 'Kernighan Bit Count',
            code: `def count_bits(n):
    c = 0
    while n:
        n &= n - 1 # clears lowest set bit
        c += 1
    return c`,
            explanation: 'Loops only as many times as there are 1-bits in n.'
          }
        ],
        quizzes: [
          {
            id: 'q10-2',
            question: 'What is the result of n & (n - 1) when n = 12 (binary 1100)?',
            options: ['4 (0100)', '8 (1000)', '11 (1011)', '0'],
            correctAnswerIndex: 1,
            explanation: '12 (1100) & 11 (1011) = 8 (1000). The lowest set bit is cleared.'
          }
        ]
      }
    ]
  }
];
