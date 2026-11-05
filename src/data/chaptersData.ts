import { Chapter } from '../types';

export const chaptersData: Chapter[] = [
  {
    id: 1,
    title: 'The Magic of Big-O & Complexity',
    subtitle: 'Measure Speed & Space Without a Stopwatch',
    badge: 'Ch 1',
    color: '#FFDE59',
    description:
      'Byte and Professor explore how algorithms scale as inputs grow to infinity. Master time vs space trade-offs, loop analysis, and the legendary Master Theorem!',
    subtopics: [
      {
        id: '1-1',
        title: 'Why Big-O Matters: The Asymptotic Frontier',
        timeEstimate: '10 min',
        summary: 'Hardware changes, but growth orders are forever. Big-O gives an upper bound on worst-case operations.',
        content: `### Why Not Just Use a Stopwatch?
If Professor runs an algorithm on a supercomputer and Byte runs it on an old laptop, the times will differ wildly! Big-O measures the **rate of growth** of operations relative to the input size $N$, abstracting away hardware differences.

#### The Big Three Notations:
- **$O(g(N))$ (Big-O)**: Asymptotic Upper Bound (Worst-case guarantee). Never worse than this!
- **$\\\\Omega(g(N))$ (Big-Omega)**: Asymptotic Lower Bound (Best-case scenario).
- **$\\\\Theta(g(N))$ (Big-Theta)**: Tight Bound (When $O$ and $\\\\Omega$ match).

\`\`\`python
# Example: Linear Scan O(N)
def find_item(arr, target):
    for x in arr:        # Runs at most N times
        if x == target:
            return True
    return False
\`\`\``,
        keyTakeaway: 'Always analyze the worst-case scenario unless amortized or average-case is specified.',
        watchOut: 'Constants and lower-order terms drop: $O(3N^2 + 500N + 99999) = O(N^2)$.',
      },
      {
        id: '1-2',
        title: 'The Big-O Hierarchy & Growth Orders',
        timeEstimate: '12 min',
        summary: 'From lightning-fast O(1) to the universe-ending O(2^N) and O(N!).',
        content: `### The Ladder of Growth
From fastest to slowest:
1. **$O(1)$ Constant**: Instant hash table lookup, array index access.
2. **$O(\\\\log N)$ Logarithmic**: Halving search space (Binary Search).
3. **$O(N)$ Linear**: Single pass through an array of length $N$.
4. **$O(N \\\\log N)$ Linearithmic**: Optimal comparison sorts (Merge Sort, Quick Sort avg, Heap Sort).
5. **$O(N^2)$ Quadratic**: Nested loops (Bubble Sort, brute force pairs).
6. **$O(2^N)$ Exponential**: Generating all subsets / powerset.
7. **$O(N!)$ Factorial**: Generating all permutations (Traveling Salesperson brute force).

> **Professor Insight**: When $N = 100$, $N^2 = 10,000$ operations (a few microseconds), but $2^{100} \\approx 1.26 \\times 10^{30}$ operations (longer than the age of the universe)!`,
        keyTakeaway: 'Know your constraints! If $N \\le 10^5$, aim for $O(N)$ or $O(N \\log N)$. If $N \\le 20$, $O(2^N)$ is acceptable.',
      },
      {
        id: '1-3',
        title: 'The Master Theorem for Divide-and-Conquer',
        timeEstimate: '15 min',
        summary: 'Crack recurrences of the form T(N) = aT(N/b) + O(N^d) instantly!',
        content: `### The Formula
For divide-and-conquer recurrences:
$$T(N) = a T(N/b) + O(N^d)$$

Where:
- $a$: Number of subproblems in each step.
- $b$: Factor by which subproblem size divides.
- $d$: Exponent of work done outside recursive calls.

Compare $\\\\log_b(a)$ with $d$:
1. **Case 1**: If $\\\\log_b(a) > d \\implies T(N) = O(N^{\\\\log_b a})$ (Tree leaves dominate).
2. **Case 2**: If $\\\\log_b(a) == d \\implies T(N) = O(N^d \\\\log N)$ (Work balanced across levels).
3. **Case 3**: If $\\\\log_b(a) < d \\implies T(N) = O(N^d)$ (Root work dominates).

#### Classic Recurrence Check:
- **Merge Sort**: $T(N) = 2T(N/2) + O(N) \\implies a=2, b=2, d=1$. $\\\\log_2(2) = 1 == d \\implies O(N \\\\log N)$.
- **Binary Search**: $T(N) = 1T(N/2) + O(1) \\implies a=1, b=2, d=0$. $\\\\log_2(1) = 0 == d \\implies O(\\\\log N)$.
- **Karatsuba Multiplication**: $T(N) = 3T(N/2) + O(N) \\implies \\\\log_2(3) \\approx 1.585 > 1 \\implies O(N^{1.585})$.`,
        keyTakeaway: 'Master Theorem saves you from drawing massive recursion trees during exams and interviews.',
        codeSnippet: `def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])    # T(N/2)
    right = merge_sort(arr[mid:])   # T(N/2)
    return merge(left, right)       # O(N) split/merge -> O(N log N)`,
      },
    ],
    mythBusters: [
      {
        id: 'mb-1',
        myth: 'Two nested for loops always mean O(N²)!',
        reality:
          'Busted! If the inner loop variable doubles (j *= 2), the inner loop runs only log N times, yielding O(N log N). Or in Two Pointers, inner pointer only advances forwards, giving O(N) amortized!',
        comicDialogue: 'Bugsy thought he trapped Byte in O(N²), but Byte pointed out the inner loop was jumping by powers of 2!',
        character: 'byte',
      },
      {
        id: 'mb-2',
        myth: 'O(1) time means an algorithm takes 1 single machine instruction.',
        reality:
          'Busted! O(1) means constant time: independent of input size N. It could execute 1 instruction or 50,000 instructions—as long as it does not grow with N, it is O(1)!',
        comicDialogue: 'Professor adjusted his glasses: "Byte, whether it takes 1 microsecond or 1 second, if it stays flat as N hits a billion, it is O(1)!"',
        character: 'professor',
      },
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'What is the tight Big-O time complexity of: for i in range(N): for j in range(i, N): pass ?',
        options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(2^N)'],
        correctIndex: 2,
        explanation: 'Sum of (N - i) from i=0 to N-1 is N(N+1)/2, which asymptotically equals O(N²).',
        xpReward: 30,
      },
      {
        id: 'q1-2',
        question: 'According to Master Theorem, what is T(N) = 4T(N/2) + O(N)?',
        options: ['O(N log N)', 'O(N²)', 'O(N² log N)', 'O(N³)'],
        correctIndex: 1,
        explanation: 'a=4, b=2, d=1. log_b(a) = log_2(4) = 2. Since log_b(a) > d (2 > 1), T(N) = O(N^2).',
        xpReward: 40,
      },
    ],
    powerCards: [
      {
        id: 'pc-1',
        title: 'Master Theorem Shield',
        category: 'Analysis',
        rarity: 'Legendary',
        frontText: 'Solve any T(N) = aT(N/b) + O(N^d) recurrence instantly.',
        backDetail: 'Compare log_b(a) with d. Case 1: > d -> O(N^{log_b a}). Case 2: == d -> O(N^d log N). Case 3: < d -> O(N^d).',
        formula: 'log_b(a) vs d',
      },
      {
        id: 'pc-2',
        title: 'Space Complexity Decoder',
        category: 'Analysis',
        rarity: 'Rare',
        frontText: 'Remember: Recursive call stack counts towards Auxiliary Space!',
        backDetail: 'Max depth of recursion tree = stack frames allocated in memory. Balanced tree = O(log N), skewed tree = O(N).',
      },
    ],
  },
  {
    id: 2,
    title: 'Arrays & Strings Mastery',
    subtitle: 'Two Pointers, Sliding Windows & Prefix Sums',
    badge: 'Ch 2',
    color: '#38B6FF',
    description:
      'Continuous memory makes arrays cache-friendly and lightning fast. Learn how Two Pointers and Sliding Windows transform clunky O(N²) quadratic loops into sleek O(N) sweeps.',
    subtopics: [
      {
        id: '2-1',
        title: 'Two Pointers: Converging & Fast-Slow',
        timeEstimate: '12 min',
        summary: 'Opposite end pointers for sorted arrays; parallel fast/slow pointers for cycles and partition.',
        content: `### Converging Pointers Technique
When the array is sorted, place one pointer at the start (\`left = 0\`) and one at the end (\`right = n - 1\`). Move them inward based on comparison:
- If \`arr[left] + arr[right] < target\`: increment \`left\` to increase sum.
- If \`arr[left] + arr[right] > target\`: decrement \`right\` to decrease sum.
- If equal: target found!

\`\`\`python
def two_sum_sorted(nums: list[int], target: int) -> list[int]:
    left, right = 0, len(nums) - 1
    while left < right:
        curr = nums[left] + nums[right]
        if curr == target:
            return [left, right]
        elif curr < target:
            left += 1
        else:
            right -= 1
    return []
\`\`\``,
        keyTakeaway: 'Both pointers only move forward/inward; each element is visited at most twice -> O(N) total time.',
        watchOut: 'Remember: Two-pointer sum requires the array to be sorted first!',
      },
      {
        id: '2-2',
        title: 'Dynamic Sliding Window Protocol',
        timeEstimate: '15 min',
        summary: 'Maintain a contiguous window state across the array to find max/min substrings or subarrays.',
        content: `### The Golden Sliding Window Template
1. Initialize window pointers: \`left = 0\`, \`window_state = {}\`.
2. Expand \`right\` pointer from \`0\` to \`n - 1\`.
3. Add \`arr[right]\` to \`window_state\`.
4. While the window condition is violated, shrink by advancing \`left\` and removing \`arr[left]\`.
5. Update your global answer with current window length (\`right - left + 1\`).

\`\`\`python
def length_of_longest_substring(s: str) -> int:
    last_seen = {}
    max_len = 0
    left = 0
    for right, ch in enumerate(s):
        if ch in last_seen and last_seen[ch] >= left:
            left = last_seen[ch] + 1
        last_seen[ch] = right
        max_len = max(max_len, right - left + 1)
    return max_len
\`\`\``,
        keyTakeaway: 'Sliding window turns O(N²) substring problems into O(N) single-pass sweeps.',
      },
      {
        id: '2-3',
        title: 'Prefix Sums & Kadane’s Algorithm',
        timeEstimate: '14 min',
        summary: 'Answer range sum queries in O(1) and find maximum subarray sum in O(N).',
        content: `### Prefix Sum
Precompute cumulative sums: \`P[i] = P[i-1] + arr[i]\`.
Any range sum from \`L\` to \`R\` is:
$$\\\\text{Sum}(L, R) = P[R] - P[L - 1]$$

### Kadane’s Maximum Subarray
At each position, choose: start a fresh subarray or extend previous sum:
\`\`\`python
def max_sub_array(nums: list[int]) -> int:
    max_so_far = current_max = nums[0]
    for x in nums[1:]:
        current_max = max(x, current_max + x)
        max_so_far = max(max_so_far, current_max)
    return max_so_far
\`\`\``,
        keyTakeaway: 'Prefix Sum is the Swiss Army knife for subarray queries with hash maps (Subarray Sum Equals K).',
      },
    ],
    mythBusters: [
      {
        id: 'mb-3',
        myth: 'Python strings can be modified in place like lists.',
        reality:
          'Busted! Strings in Python are strictly immutable. Doing s += char inside an N-step loop creates a brand-new string each time, blowing up to O(N²)! Always collect in a list and join at the end.',
        comicDialogue: 'Bugsy giggled as Byte concatenating strings slowed his code down to a crawl! Professor shouted: "Use .join()!"',
        character: 'bugsy',
      },
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'What is the time complexity of building a prefix sum array of size N?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
        correctIndex: 2,
        explanation: 'Each element requires 1 addition: P[i] = P[i-1] + arr[i]. Running N steps = O(N).',
        xpReward: 30,
      },
    ],
    powerCards: [
      {
        id: 'pc-3',
        title: 'Sliding Window Compass',
        category: 'Technique',
        rarity: 'Epic',
        frontText: 'Contiguous subarray with min/max constraint? Slide it!',
        backDetail: 'Expand right to include, shrink left while invalid. Time O(N), Space O(K).',
      },
    ],
  },
  {
    id: 3,
    title: 'Linked Lists & Node Pointers',
    subtitle: 'Pointers, Floyd’s Cycle Detection & Reversals',
    badge: 'Ch 3',
    color: '#7ED957',
    description:
      'Break free from contiguous memory blocks! Traverse pointer nodes, reverse lists in-place with 3 pointers, and detect cycles with the Tortoise and Hare algorithm.',
    subtopics: [
      {
        id: '3-1',
        title: 'In-Place Linked List Reversal',
        timeEstimate: '10 min',
        summary: 'Reverse pointers in a single pass using prev, curr, and nxt.',
        content: `### The Three-Pointer Ballet
To reverse a singly linked list without extra memory:
1. Initialize \`prev = None\`, \`curr = head\`.
2. Save \`nxt = curr.next\`.
3. Reverse the link: \`curr.next = prev\`.
4. Step forward: \`prev = curr\`, \`curr = nxt\`.
5. Repeat until \`curr is None\`. Return \`prev\` as new head.

\`\`\`python
def reverse_list(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev
\`\`\``,
        keyTakeaway: 'Never lose the reference to curr.next before severing the link!',
      },
      {
        id: '3-2',
        title: 'Floyd’s Cycle Detection (Tortoise & Hare)',
        timeEstimate: '12 min',
        summary: 'Detect cycles in O(N) time and O(1) space with slow and fast pointers.',
        content: `### The Race
- **Slow pointer**: moves 1 step at a time.
- **Fast pointer**: moves 2 steps at a time.
If there is a cycle, the distance between them shrinks by 1 node every tick. They are guaranteed to meet inside the cycle!

#### Finding the Cycle Entry Node:
Once they meet, keep \`slow\` at the meeting point and reset \`fast\` to \`head\`. Now move both **1 step at a time**. The node where they meet again is the exact start of the cycle!`,
        keyTakeaway: 'Mathematically proven: distance from head to entry equals distance from meeting point to entry.',
      },
    ],
    mythBusters: [
      {
        id: 'mb-4',
        myth: 'Inserting in a Linked List is always O(1).',
        reality:
          'Busted! Inserting is O(1) ONLY if you already hold a pointer to the target node. If you have to search for the node by value first, finding it takes O(N)!',
        comicDialogue: 'Byte tried to insert at index 500 without traversing: "Wait, where is node 500?!" Professor chuckled: "No random access here!"',
        character: 'professor',
      },
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'Why does fast pointer moving at 2x guarantee a collision if a cycle exists?',
        options: [
          'Because the list length is always even',
          'Because the relative distance between fast and slow decreases by 1 every step',
          'Because Python caches pointer addresses',
          'It is only guaranteed if cycle length is prime',
        ],
        correctIndex: 1,
        explanation: 'At each step, relative distance changes by (2 - 1) = 1 node. It cannot hop over slow without hitting it.',
        xpReward: 35,
      },
    ],
    powerCards: [
      {
        id: 'pc-4',
        title: 'Sentinel Dummy Node',
        category: 'Pattern',
        rarity: 'Rare',
        frontText: 'Eliminate head-node edge cases forever.',
        backDetail: 'Create dummy = ListNode(0), dummy.next = head. Return dummy.next at the end.',
      },
    ],
  },
  {
    id: 4,
    title: 'Stacks, Queues & Monotonic Structures',
    subtitle: 'LIFO, FIFO & Next Greater Element',
    badge: 'Ch 4',
    color: '#FF914D',
    description:
      'Understand Last-In First-Out and First-In First-Out mechanics. Unlock the secret weapon of competitive programmers: the Monotonic Stack.',
    subtopics: [
      {
        id: '4-1',
        title: 'Monotonic Stack: Next Greater Element',
        timeEstimate: '15 min',
        summary: 'Find the next greater or smaller element for every item in an array in O(N) total time.',
        content: `### Why Monotonic Stack?
Brute force takes $O(N^2)$ to find the next greater element. A monotonic decreasing stack preserves candidate elements:
\`\`\`python
def next_greater_elements(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [-1] * n
    stack = [] # stores indices
    for i in range(n):
        while stack and nums[stack[-1]] < nums[i]:
            idx = stack.pop()
            res[idx] = nums[i]
        stack.append(i)
    return res
\`\`\`
Every index is pushed once and popped at most once -> **Amortized $O(N)$**!`,
        keyTakeaway: 'Use monotonic stack for histogram areas, daily temperatures, and stock spans.',
      },
    ],
    mythBusters: [
      {
        id: 'mb-5',
        myth: 'Using a Python list as a Queue with list.pop(0) is fine.',
        reality:
          'Busted! list.pop(0) shifts all remaining elements left by 1 position, taking O(N) time! For a real queue, always use collections.deque which gives O(1) popleft().',
        comicDialogue: 'Bugsy slipped a list.pop(0) inside Byte’s BFS loop, turning an O(V+E) search into an O(V²) disaster!',
        character: 'bugsy',
      },
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'What is the time complexity of popleft() on collections.deque in Python?',
        options: ['O(N)', 'O(log N)', 'O(1)', 'O(N²)'],
        correctIndex: 2,
        explanation: 'collections.deque is implemented as a doubly linked list of fixed-size blocks, ensuring O(1) appends and pops from both ends.',
        xpReward: 30,
      },
    ],
    powerCards: [
      {
        id: 'pc-5',
        title: 'Monotonic Stack Trap',
        category: 'Data Structure',
        rarity: 'Epic',
        frontText: 'Next Greater Element in O(N).',
        backDetail: 'Maintain stack of indices in strictly decreasing order. Pop when current element exceeds stack top.',
      },
    ],
  },
  {
    id: 5,
    title: 'Trees & Binary Search Trees',
    subtitle: 'Hierarchical Mastery & AVL Rotations',
    badge: 'Ch 5',
    color: '#8C52FF',
    description:
      'Traverse preorder, inorder, postorder and level-order. Explore Binary Search Tree properties, validate BSTs, and witness self-balancing AVL rotations.',
    subtopics: [
      {
        id: '5-1',
        title: 'Tree Traversals: DFS vs BFS',
        timeEstimate: '12 min',
        summary: 'In-order gives sorted sequence in BST; BFS reveals level-by-level relationships.',
        content: `### DFS Traversals
- **Pre-order (Root, Left, Right)**: Great for copying or serializing trees.
- **In-order (Left, Root, Right)**: Traverses BST in **strictly sorted order**!
- **Post-order (Left, Right, Root)**: Ideal for bottom-up computation (calculating subtree heights, deleting nodes).

### BFS Level Order:
Use a queue to process node by node, recording levels:
\`\`\`python
from collections import deque
def level_order(root):
    if not root: return []
    res, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res
\`\`\``,
        keyTakeaway: 'In-order traversal of a BST is always monotonically non-decreasing.',
      },
    ],
    mythBusters: [
      {
        id: 'mb-6',
        myth: 'To validate a BST, it suffices to check if node.left < node < node.right at each node.',
        reality:
          'Busted! This only checks immediate children! A node in the right subtree could still be smaller than the root ancestor! You must pass a valid range (min_val, max_val) down recursion.',
        comicDialogue: 'Bugsy hid a value 4 inside the right subtree of root 5! Byte caught it by checking the global bounds (min_val < val < max_val)!',
        character: 'byte',
      },
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'Which traversal of a Binary Search Tree produces values in strictly sorted order?',
        options: ['Pre-order', 'Post-order', 'In-order', 'Level-order'],
        correctIndex: 2,
        explanation: 'In-order visits Left subtree (< Root), then Root, then Right subtree (> Root).',
        xpReward: 30,
      },
    ],
    powerCards: [
      {
        id: 'pc-6',
        title: 'BST Range Guard',
        category: 'Recursion',
        rarity: 'Rare',
        frontText: 'Validate BST correctly with boundary pass-down.',
        backDetail: 'dfs(node, low, high) -> return low < node.val < high and dfs(left, low, val) and dfs(right, val, high).',
      },
    ],
  },
  {
    id: 6,
    title: 'Heaps & Priority Queues',
    subtitle: 'Top-K Elements & The Median Stream Engine',
    badge: 'Ch 6',
    color: '#FF5757',
    description:
      'Complete binary trees mapped onto simple arrays! Learn sift-up, sift-down, O(N) heapify, and the dual-heap median stream algorithm.',
    subtopics: [
      {
        id: '6-1',
        title: 'Heap Array Mapping: Math Made Elegant',
        timeEstimate: '10 min',
        summary: 'No node pointers needed! Parent at (i-1)//2, left child at 2i+1, right child at 2i+2.',
        content: `### Array-Based Binary Tree
For any zero-indexed element \`i\`:
- **Parent**: \`(i - 1) // 2\`
- **Left Child**: \`2 * i + 1\`
- **Right Child**: \`2 * i + 2\`

### Min-Heap Property
\`arr[parent] <= arr[child]\`. The minimum element is always at \`arr[0]\` in $O(1)$!
- \`heapq.heappush(heap, val)\`: $O(\\\\log N)$
- \`heapq.heappop(heap)\`: $O(\\\\log N)$
- \`heapq.heapify(list)\`: **$O(N)$** linear time!`,
        keyTakeaway: 'heapify is O(N), NOT O(N log N), because most nodes are near the leaves and travel very short sift-down distances.',
      },
    ],
    mythBusters: [
      {
        id: 'mb-7',
        myth: 'Building a heap from an array of N elements takes O(N log N).',
        reality:
          'Busted! Repeated insertions take O(N log N), but bottom-up heapify takes strictly O(N) time because half the elements are leaf nodes requiring 0 swaps!',
        comicDialogue: 'Professor smiled: "Byte, do not insert one by one! Run heapq.heapify() for a brisk O(N) setup!"',
        character: 'professor',
      },
    ],
    quiz: [
      {
        id: 'q6-1',
        question: 'What is the time complexity to find the top K largest elements in an array of size N using a min-heap of size K?',
        options: ['O(N log N)', 'O(N log K)', 'O(K log N)', 'O(N)'],
        correctIndex: 1,
        explanation: 'We iterate through N elements, keeping heap size <= K. Each push/pop takes log K -> total O(N log K).',
        xpReward: 35,
      },
    ],
    powerCards: [
      {
        id: 'pc-7',
        title: 'Dual Heap Balance',
        category: 'Algorithm',
        rarity: 'Legendary',
        frontText: 'Find running median in O(log N) insert, O(1) query.',
        backDetail: 'Maintain max_heap for lower half and min_heap for upper half. Balance sizes so len difference <= 1.',
      },
    ],
  },
  {
    id: 7,
    title: 'Hash Maps & Amortized Secrets',
    subtitle: 'Collision Resolution & The O(1) Promise',
    badge: 'Ch 7',
    color: '#FFDE59',
    description:
      'Hash functions, buckets, separate chaining vs open addressing, load factor thresholds, and why average O(1) can degrade to O(N) under Bugsy attack.',
    subtopics: [
      {
        id: '7-1',
        title: 'How Hash Tables Work Under the Hood',
        timeEstimate: '10 min',
        summary: 'Hash function maps keys to index buckets. Handled via chaining or open addressing.',
        content: `### The Magic of O(1)
A hash table uses a hash function:
$$\\\\text{index} = \\\\text{hash}(key) \\\\pmod{\\\\text{bucket\\\_count}}$$

#### Collision Resolution:
1. **Separate Chaining**: Each bucket stores a linked list or red-black tree of colliding entries.
2. **Open Addressing**: Probe to the next empty slot (linear probing, quadratic probing, double hashing).

#### Load Factor $\\\\alpha$:
$$\\\\alpha = \\\\frac{\\\\text{Number of elements}}{\\\\text{Number of buckets}}$$
When $\\\\alpha > 0.75$, the table automatically resizes (doubles) and rehashes all elements in $O(N)$ amortized time.`,
        keyTakeaway: 'Always choose immutable types as keys (strings, tuples, ints). Never mutable lists or dicts!',
      },
    ],
    mythBusters: [
      {
        id: 'mb-8',
        myth: 'Hash table lookups are guaranteed to always be O(1) in the worst case.',
        reality:
          'Busted! If Bugsy crafts malicious keys that all produce the exact same hash code (hash collision attack), all keys land in one bucket, degrading lookups to O(N)!',
        comicDialogue: 'Bugsy flooded the hash table with colliding keys! Byte defended with a randomized cryptographic salt to restore O(1)!',
        character: 'bugsy',
      },
    ],
    quiz: [
      {
        id: 'q7-1',
        question: 'What happens when the load factor of a hash table exceeds its threshold?',
        options: [
          'It throws an OverflowError',
          'It deletes the oldest entry',
          'It allocates a larger array (usually 2x) and rehashes elements',
          'It switches to a binary search tree automatically',
        ],
        correctIndex: 2,
        explanation: 'Resizing doubles capacity to keep the average number of elements per bucket small, preserving O(1) amortized performance.',
        xpReward: 30,
      },
    ],
    powerCards: [
      {
        id: 'pc-8',
        title: 'Prefix Sum + Hash Map Key',
        category: 'Combo',
        rarity: 'Epic',
        frontText: 'Count subarrays with sum = K in O(N).',
        backDetail: 'Store running prefix sums in dict: if (curr_sum - k) in seen, add seen[curr_sum - k] to answer.',
      },
    ],
  },
  {
    id: 8,
    title: 'Graphs, BFS, DFS & Shortest Paths',
    subtitle: 'Explore Mazes, Networks & Topologies',
    badge: 'Ch 8',
    color: '#38B6FF',
    description:
      'Adjacency lists, Breadth-First Search for unweighted shortest paths, Depth-First Search for cycles, Dijkstra’s algorithm, and Kahn’s Topological Sort.',
    subtopics: [
      {
        id: '8-1',
        title: 'BFS for Shortest Path in Unweighted Graphs',
        timeEstimate: '14 min',
        summary: 'Queue-based traversal explores layer by layer, guaranteeing shortest hop distance.',
        content: `### The BFS Rule of Law: Mark Visited on PUSH!
\`\`\`python
from collections import deque

def bfs_shortest_path(graph, start, target):
    q = deque([(start, 0)]) # (node, distance)
    visited = {start}       # Mark immediately when pushing!
    
    while q:
        curr, dist = q.popleft()
        if curr == target:
            return dist
        for neighbor in graph[curr]:
            if neighbor not in visited:
                visited.add(neighbor) # Push & mark!
                q.append((neighbor, dist + 1))
    return -1
\`\`\``,
        keyTakeaway: 'If you mark visited on POP instead of PUSH, duplicate nodes enter the queue exponentially!',
      },
    ],
    mythBusters: [
      {
        id: 'mb-9',
        myth: 'Dijkstra’s algorithm works on graphs with negative edge weights.',
        reality:
          'Busted! Dijkstra assumes that adding an edge can never decrease total path cost (greedy property). For negative weights, use Bellman-Ford or SPFA!',
        comicDialogue: 'Bugsy placed a -5 edge on the road! Byte took the detour and Dijkstra got stuck in an infinite negative loop! Professor shouted: "Call Bellman-Ford!"',
        character: 'professor',
      },
    ],
    quiz: [
      {
        id: 'q8-1',
        question: 'What is the time complexity of Dijkstra’s algorithm using a min-heap (priority queue)?',
        options: ['O(V²)', 'O(E log V)', 'O(V log E)', 'O(V + E)'],
        correctIndex: 1,
        explanation: 'Every edge is examined at most once, and heap updates take log V -> O((V + E) log V) or O(E log V).',
        xpReward: 40,
      },
    ],
    powerCards: [
      {
        id: 'pc-9',
        title: 'Topological Sort Kahn Engine',
        category: 'Graph',
        rarity: 'Epic',
        frontText: 'Order dependencies in Directed Acyclic Graphs (DAG).',
        backDetail: 'Compute in-degrees. Add in-degree 0 nodes to queue. Decrement neighbors. If processed != V, cycle detected!',
      },
    ],
  },
  {
    id: 9,
    title: 'Dynamic Programming: Remember or Repeat',
    subtitle: 'Overlapping Subproblems & Optimal Substructure',
    badge: 'Ch 9',
    color: '#FF5757',
    description:
      'Never recalculate what you already solved! Master top-down memoization, bottom-up tabulation, 0/1 Knapsack, and state space reduction.',
    subtopics: [
      {
        id: '9-1',
        title: 'The Two Pillars of Dynamic Programming',
        timeEstimate: '15 min',
        summary: 'Optimal Substructure + Overlapping Subproblems = DP Goldmine.',
        content: `### The DP Checklist
1. **Define State**: What parameters uniquely identify a subproblem? (e.g. \`dp(i, remaining_weight)\`).
2. **Transition Formula**: How does the answer relate to smaller subproblems?
3. **Base Cases**: When does the recursion terminate?
4. **Order of Computation**: For tabulation, solve smaller subproblems before larger ones.

#### 0/1 Knapsack Transition:
$$dp[i][w] = \\\\max(dp[i-1][w], \\\\; dp[i-1][w - weight[i]] + value[i])$$`,
        keyTakeaway: 'Always check if you can optimize space from 2D table dp[i][w] down to a 1D rolling array dp[w]!',
      },
    ],
    mythBusters: [
      {
        id: 'mb-10',
        myth: 'In 1D 0/1 Knapsack, you can iterate the weight capacity loop forwards from 0 to W.',
        reality:
          'Busted! Iterating forwards allows the same item to be picked multiple times (Unbounded Knapsack)! For 0/1 Knapsack, iterate weights backwards from W down to weight[i] to ensure items are used only once!',
        comicDialogue: 'Bugsy was cloning items by running the weight loop forwards! Byte reversed the loop (range(W, w-1, -1)) and stopped the duplication glitch!',
        character: 'byte',
      },
    ],
    quiz: [
      {
        id: 'q9-1',
        question: 'Why do we iterate weights in reverse (W down to w) in 1D array 0/1 Knapsack?',
        options: [
          'To make the code run faster',
          'To prevent using the current item more than once in the same step',
          'Because Python lists are indexed from right to left',
          'To save CPU cache lines',
        ],
        correctIndex: 1,
        explanation: 'Iterating backwards ensures dp[w - weight] reflects values from the previous item iteration, not the current one.',
        xpReward: 40,
      },
    ],
    powerCards: [
      {
        id: 'pc-10',
        title: 'State Compression Scroll',
        category: 'DP',
        rarity: 'Legendary',
        frontText: 'Reduce DP space complexity from O(N²) to O(N).',
        backDetail: 'If dp[i] only depends on dp[i-1], maintain two 1D rows: prev and curr, or a single backwards-updated row.',
      },
    ],
  },
  {
    id: 10,
    title: 'Greedy Algorithms & Backtracking',
    subtitle: 'Make Local Choices & Explore All Paths',
    badge: 'Ch 10',
    color: '#7ED957',
    description:
      'Greedy algorithms seize the best immediate choice; Backtracking systematically explores candidate solutions and undoes choices when reaching dead ends.',
    subtopics: [
      {
        id: '10-1',
        title: 'The Backtracking Blueprint: Choose, Explore, Unchoose',
        timeEstimate: '15 min',
        summary: 'Solve N-Queens, Subsets, and Permutations with graceful state restoration.',
        content: `### The Golden Backtracking Template
\`\`\`python
def backtrack(path, options):
    if is_solution(path):
        results.append(list(path))
        return
    for choice in options:
        if is_valid(choice):
            path.append(choice)      # 1. CHOOSE
            backtrack(path, next_ops) # 2. EXPLORE
            path.pop()               # 3. UNCHOOSE (Backtrack!)
\`\`\`
Forgetting to \`unchoose\` (undo) is the #1 bug in backtracking algorithms!`,
        keyTakeaway: 'Always pass a copy: results.append(list(path)), not results.append(path), otherwise you store empty lists after unchoosing!',
      },
    ],
    mythBusters: [
      {
        id: 'mb-11',
        myth: 'Greedy algorithms always yield the globally optimal solution.',
        reality:
          'Busted! Greedy algorithms only work if the problem exhibits the Greedy Choice Property. For example, greedy coin change fails with coin denominations [1, 3, 4] for amount 6 (Greedy picks 4+1+1 = 3 coins, but optimal is 3+3 = 2 coins)!',
        comicDialogue: 'Bugsy handed Byte coins of [1, 3, 4]! Byte grabbed the biggest 4 and got 3 coins. Professor smiled: "Dynamic programming gives 2 coins with 3 + 3!"',
        character: 'professor',
      },
    ],
    quiz: [
      {
        id: 'q10-1',
        question: 'What is the time complexity of generating all permutations of N unique elements?',
        options: ['O(N²)', 'O(2^N)', 'O(N!)', 'O(N^N)'],
        correctIndex: 2,
        explanation: 'There are N choices for the first position, N-1 for the second, etc. Total permutations = N * (N-1) * ... * 1 = N! -> O(N * N!).',
        xpReward: 40,
      },
    ],
    powerCards: [
      {
        id: 'pc-11',
        title: 'Interval Scheduling Sorter',
        category: 'Greedy',
        rarity: 'Epic',
        frontText: 'Maximize non-overlapping meetings.',
        backDetail: 'Sort intervals by END time! Always select the meeting that finishes earliest, leaving maximum room for future meetings.',
      },
    ],
  },
];
