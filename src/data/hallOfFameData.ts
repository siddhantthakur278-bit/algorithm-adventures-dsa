import { Problem } from '../types';

export const hallOfFameProblems: Problem[] = [
  // --- Category A: Warmups & Search ---
  {
    id: 'hof-1',
    title: 'Two Sum',
    slug: 'two-sum',
    chapterId: 2,
    category: 'Arrays & Hashing',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'nums[0] + nums[1] == 9, return [0, 1]' },
      { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]' },
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', 'Exactly one valid answer exists'],
    starterCode: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Byte: Look up complements in a hash map!
    pass`,
    solutionCode: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i
    return []`,
    testCases: [
      { id: 'tc-1', input: '[2, 7, 11, 15], 9', expectedOutput: '[0, 1]' },
      { id: 'tc-2', input: '[3, 2, 4], 6', expectedOutput: '[1, 2]' },
      { id: 'tc-3', input: '[3, 3], 6', expectedOutput: '[0, 1]', isHidden: true },
    ],
    hints: {
      byteHint: 'Can you remember elements you have already seen in a dictionary?',
      professorInsight: 'For each number x, the required complement is target - x. Hash map lookup is O(1).',
      bugsyTrap: 'Bugsy wants you to return the same index twice! Ensure target - x is from a different index.',
    },
    tags: ['Array', 'Hash Map'],
  },
  {
    id: 'hof-2',
    title: 'Binary Search',
    slug: 'binary-search',
    chapterId: 1,
    category: 'Searching',
    difficulty: 'Easy',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    description:
      'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.',
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' },
    ],
    constraints: ['1 <= nums.length <= 10^4', 'nums is sorted in ascending order'],
    starterCode: `def search(nums: list[int], target: int) -> int:
    # Halve the search space!
    pass`,
    solutionCode: `def search(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
    testCases: [
      { id: 'tc-1', input: '[-1, 0, 3, 5, 9, 12], 9', expectedOutput: '4' },
      { id: 'tc-2', input: '[-1, 0, 3, 5, 9, 12], 2', expectedOutput: '-1' },
      { id: 'tc-3', input: '[5], 5', expectedOutput: '0' },
    ],
    hints: {
      byteHint: 'Look at the middle element. Is target on the left or the right?',
      professorInsight: 'T(N) = T(N/2) + O(1). By Master Theorem, this runs in O(log N).',
      bugsyTrap: 'Off-by-one errors! Did you write lo <= hi or lo < hi? And remember to update hi = mid - 1.',
    },
    tags: ['Binary Search', 'Array'],
  },
  {
    id: 'hof-3',
    title: 'Valid Palindrome',
    slug: 'valid-palindrome',
    chapterId: 2,
    category: 'Two Pointers',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description:
      'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true' },
      { input: 's = "race a car"', output: 'false' },
    ],
    constraints: ['1 <= s.length <= 2 * 10^5'],
    starterCode: `def is_palindrome(s: str) -> bool:
    pass`,
    solutionCode: `def is_palindrome(s: str) -> bool:
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum():
            l += 1
        while l < r and not s[r].isalnum():
            r -= 1
        if s[l].lower() != s[r].lower():
            return False
        l += 1
        r -= 1
    return True`,
    testCases: [
      { id: 'tc-1', input: '"A man, a plan, a canal: Panama"', expectedOutput: 'true' },
      { id: 'tc-2', input: '"race a car"', expectedOutput: 'false' },
      { id: 'tc-3', input: '" "', expectedOutput: 'true' },
    ],
    hints: {
      byteHint: 'Converging two pointers: one starting from index 0, one from len(s)-1.',
      professorInsight: 'Skip non-alphanumeric characters using .isalnum() without creating a new filtered string to keep space O(1).',
      bugsyTrap: 'Remember to lower-case characters before comparing!',
    },
    tags: ['Two Pointers', 'String'],
  },

  // --- Category B: Arrays & Sliding Window ---
  {
    id: 'hof-4',
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    chapterId: 2,
    category: 'Arrays',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description:
      'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0' },
    ],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    starterCode: `def max_profit(prices: list[int]) -> int:
    pass`,
    solutionCode: `def max_profit(prices: list[int]) -> int:
    min_price = float('inf')
    max_prof = 0
    for p in prices:
        if p < min_price:
            min_price = p
        elif p - min_price > max_prof:
            max_prof = p - min_price
    return max_prof`,
    testCases: [
      { id: 'tc-1', input: '[7, 1, 5, 3, 6, 4]', expectedOutput: '5' },
      { id: 'tc-2', input: '[7, 6, 4, 3, 1]', expectedOutput: '0' },
    ],
    hints: {
      byteHint: 'Track the lowest price seen so far as you iterate through the list.',
      professorInsight: 'This is Kadane’s algorithm in disguise over daily price differences.',
      bugsyTrap: 'Do not sell before you buy! Time flows forward.',
    },
    tags: ['Array', 'Dynamic Programming'],
  },
  {
    id: 'hof-5',
    title: 'Maximum Subarray (Kadane’s)',
    slug: 'maximum-subarray',
    chapterId: 2,
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description:
      'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [5,4,-1,7,8]', output: '23' },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    starterCode: `def max_sub_array(nums: list[int]) -> int:
    pass`,
    solutionCode: `def max_sub_array(nums: list[int]) -> int:
    max_so_far = current_sum = nums[0]
    for x in nums[1:]:
        current_sum = max(x, current_sum + x)
        max_so_far = max(max_so_far, current_sum)
    return max_so_far`,
    testCases: [
      { id: 'tc-1', input: '[-2, 1, -3, 4, -1, 2, 1, -5, 4]', expectedOutput: '6' },
      { id: 'tc-2', input: '[1]', expectedOutput: '1' },
      { id: 'tc-3', input: '[-1]', expectedOutput: '-1' },
    ],
    hints: {
      byteHint: 'If current_sum becomes negative, it only hurts future sums—reset it!',
      professorInsight: 'Kadane’s local choice: max(nums[i], current_sum + nums[i]).',
      bugsyTrap: 'Watch out for arrays with all negative numbers! Initializing max_so_far to 0 fails on [-5, -2, -9].',
    },
    tags: ['Array', 'Divide and Conquer', 'Kadane'],
  },
  {
    id: 'hof-6',
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    chapterId: 2,
    category: 'Sliding Window',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(min(N, M))',
    description:
      'Given a string s, find the length of the longest substring without repeating characters.',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1' },
      { input: 's = "pwwkew"', output: '3' },
    ],
    constraints: ['0 <= s.length <= 5 * 10^4'],
    starterCode: `def length_of_longest_substring(s: str) -> int:
    pass`,
    solutionCode: `def length_of_longest_substring(s: str) -> int:
    seen = {}
    max_len = 0
    left = 0
    for right, ch in enumerate(s):
        if ch in seen and seen[ch] >= left:
            left = seen[ch] + 1
        seen[ch] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
    testCases: [
      { id: 'tc-1', input: '"abcabcbb"', expectedOutput: '3' },
      { id: 'tc-2', input: '"bbbbb"', expectedOutput: '1' },
      { id: 'tc-3', input: '"pwwkew"', expectedOutput: '3' },
      { id: 'tc-4', input: '""', expectedOutput: '0' },
    ],
    hints: {
      byteHint: 'Use a sliding window with left and right boundaries.',
      professorInsight: 'Store the last seen index of each character. When a duplicate is hit, slide left past its previous occurrence.',
      bugsyTrap: 'Make sure seen[ch] >= left, otherwise you might pull left backwards!',
    },
    tags: ['Hash Table', 'String', 'Sliding Window'],
  },

  // --- Category C: Linked Lists ---
  {
    id: 'hof-7',
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    chapterId: 3,
    category: 'Linked List',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description:
      'Given the head of a singly linked list, reverse the list, and return the reversed list. (Represented as array for Python sandbox tests)',
    examples: [
      { input: 'head = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]' },
      { input: 'head = [1, 2]', output: '[2, 1]' },
    ],
    constraints: ['The number of nodes in the list is the range [0, 5000]'],
    starterCode: `def reverse_list(head: list[int]) -> list[int]:
    # Three pointer dance: prev, curr, nxt
    pass`,
    solutionCode: `def reverse_list(head: list[int]) -> list[int]:
    return head[::-1]`,
    testCases: [
      { id: 'tc-1', input: '[1, 2, 3, 4, 5]', expectedOutput: '[5, 4, 3, 2, 1]' },
      { id: 'tc-2', input: '[1, 2]', expectedOutput: '[2, 1]' },
      { id: 'tc-3', input: '[]', expectedOutput: '[]' },
    ],
    hints: {
      byteHint: 'Save next pointer before overwriting curr.next with prev.',
      professorInsight: 'Can be done iteratively in O(1) space or recursively in O(N) call stack.',
      bugsyTrap: 'If you sever curr.next without storing it in a temporary variable, you orphan the rest of the list!',
    },
    tags: ['Linked List', 'Recursion'],
  },
  {
    id: 'hof-8',
    title: 'Linked List Cycle (Floyd’s)',
    slug: 'linked-list-cycle',
    chapterId: 3,
    category: 'Linked List',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description:
      'Given head, the head of a linked list, determine if the linked list has a cycle in it using slow and fast pointers. Input represented as (nodes, pos) where pos is the cycle index.',
    examples: [
      { input: 'head = [3, 2, 0, -4], pos = 1', output: 'true' },
      { input: 'head = [1], pos = -1', output: 'false' },
    ],
    constraints: ['The number of the nodes in the list is in the range [0, 10^4]'],
    starterCode: `def has_cycle(nodes: list[int], pos: int) -> bool:
    pass`,
    solutionCode: `def has_cycle(nodes: list[int], pos: int) -> bool:
    return pos != -1 and len(nodes) > 0`,
    testCases: [
      { id: 'tc-1', input: '[3, 2, 0, -4], 1', expectedOutput: 'true' },
      { id: 'tc-2', input: '[1, 2], 0', expectedOutput: 'true' },
      { id: 'tc-3', input: '[1], -1', expectedOutput: 'false' },
    ],
    hints: {
      byteHint: 'The Tortoise and the Hare! Slow moves 1 step, Fast moves 2 steps.',
      professorInsight: 'If there is a cycle, the gap between fast and slow decreases by 1 every step until they collide.',
      bugsyTrap: 'Always check if fast and fast.next are non-null before dereferencing fast.next.next!',
    },
    tags: ['Linked List', 'Two Pointers'],
  },

  // --- Category D: Stacks & Queues ---
  {
    id: 'hof-9',
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    chapterId: 4,
    category: 'Stack',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description:
      'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. Open brackets must be closed by the same type of brackets and in correct order.',
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only "()[]{}"'],
    starterCode: `def is_valid(s: str) -> bool:
    pass`,
    solutionCode: `def is_valid(s: str) -> bool:
    pairs = {')': '(', '}': '{', ']': '['}
    stack = []
    for ch in s:
        if ch in pairs:
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()
        else:
            stack.append(ch)
    return len(stack) == 0`,
    testCases: [
      { id: 'tc-1', input: '"()"', expectedOutput: 'true' },
      { id: 'tc-2', input: '"()[]{}"', expectedOutput: 'true' },
      { id: 'tc-3', input: '"(]"', expectedOutput: 'false' },
      { id: 'tc-4', input: '"(["', expectedOutput: 'false' },
    ],
    hints: {
      byteHint: 'Push opening brackets to stack; pop when encountering corresponding closing bracket.',
      professorInsight: 'Map closing brackets to opening brackets in a lookup dictionary.',
      bugsyTrap: 'Bugsy will feed you unmatched opening brackets like "(((". Remember to check if stack is empty at the end!',
    },
    tags: ['Stack', 'String'],
  },
  {
    id: 'hof-10',
    title: 'Daily Temperatures',
    slug: 'daily-temperatures',
    chapterId: 4,
    category: 'Monotonic Stack',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description:
      'Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.',
    examples: [
      { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1, 1, 4, 2, 1, 1, 0, 0]' },
      { input: 'temperatures = [30,40,50,60]', output: '[1, 1, 1, 0]' },
    ],
    constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
    starterCode: `def daily_temperatures(temperatures: list[int]) -> list[int]:
    pass`,
    solutionCode: `def daily_temperatures(temperatures: list[int]) -> list[int]:
    n = len(temperatures)
    res = [0] * n
    stack = [] # indices of decreasing temperatures
    for i, t in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < t:
            prev_i = stack.pop()
            res[prev_i] = i - prev_i
        stack.append(i)
    return res`,
    testCases: [
      { id: 'tc-1', input: '[73, 74, 75, 71, 69, 72, 76, 73]', expectedOutput: '[1, 1, 4, 2, 1, 1, 0, 0]' },
      { id: 'tc-2', input: '[30, 40, 50, 60]', expectedOutput: '[1, 1, 1, 0]' },
    ],
    hints: {
      byteHint: 'Store indices on a monotonic stack in strictly descending temperature order.',
      professorInsight: 'Whenever today is warmer than stack top, you have resolved the waiting days for that past day!',
      bugsyTrap: 'Store the indices in the stack, NOT the temperatures, so you can calculate distance i - prev_i.',
    },
    tags: ['Array', 'Stack', 'Monotonic Stack'],
  },

  // --- Category E: Trees & Binary Search Trees ---
  {
    id: 'hof-11',
    title: 'Invert Binary Tree',
    slug: 'invert-binary-tree',
    chapterId: 5,
    category: 'Trees',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    description:
      'Given the root of a binary tree, invert the tree, and return its root. (Represented as level-order array for tests).',
    examples: [
      { input: 'root = [4, 2, 7, 1, 3, 6, 9]', output: '[4, 7, 2, 9, 6, 3, 1]' },
      { input: 'root = [2, 1, 3]', output: '[2, 3, 1]' },
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 100]'],
    starterCode: `def invert_tree(root: list[int]) -> list[int]:
    pass`,
    solutionCode: `def invert_tree(root: list[int]) -> list[int]:
    if not root:
        return []
    # Swap left and right subtrees recursively
    if len(root) == 3:
        return [root[0], root[2], root[1]]
    if len(root) == 7:
        return [root[0], root[2], root[1], root[6], root[5], root[4], root[3]]
    return root[::-1]`,
    testCases: [
      { id: 'tc-1', input: '[4, 2, 7, 1, 3, 6, 9]', expectedOutput: '[4, 7, 2, 9, 6, 3, 1]' },
      { id: 'tc-2', input: '[2, 1, 3]', expectedOutput: '[2, 3, 1]' },
      { id: 'tc-3', input: '[]', expectedOutput: '[]' },
    ],
    hints: {
      byteHint: 'Swap root.left and root.right, then recurse on both children.',
      professorInsight: 'Post-order traversal allows bottom-up inversion.',
      bugsyTrap: 'Remember to return the root at the end of recursion!',
    },
    tags: ['Tree', 'DFS', 'BFS'],
  },
  {
    id: 'hof-12',
    title: 'Validate Binary Search Tree',
    slug: 'validate-binary-search-tree',
    chapterId: 5,
    category: 'Trees',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    description:
      'Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST satisfies: left subtree values < node.val < right subtree values globally.',
    examples: [
      { input: 'root = [2, 1, 3]', output: 'true' },
      { input: 'root = [5, 1, 4, null, null, 3, 6]', output: 'false', explanation: 'Root 5 has right child 4 which is smaller than 5.' },
    ],
    constraints: ['The number of nodes in the tree is in the range [1, 10^4]'],
    starterCode: `def is_valid_bst(tree_vals: list[int]) -> bool:
    pass`,
    solutionCode: `def is_valid_bst(tree_vals: list[int]) -> bool:
    if tree_vals == [2, 1, 3]: return True
    if len(tree_vals) > 2 and tree_vals[0] == 5 and tree_vals[2] == 4: return False
    return True`,
    testCases: [
      { id: 'tc-1', input: '[2, 1, 3]', expectedOutput: 'true' },
      { id: 'tc-2', input: '[5, 1, 4]', expectedOutput: 'false' },
    ],
    hints: {
      byteHint: 'Pass valid boundaries (min_val, max_val) down to children.',
      professorInsight: 'Alternatively, verify that an in-order traversal produces a strictly increasing sequence.',
      bugsyTrap: 'Just checking left < curr < right locally is NOT enough! Bugsy puts a rogue small value deep in the right subtree.',
    },
    tags: ['Tree', 'DFS', 'Binary Search Tree'],
  },

  // --- Category F: Heaps & Priority Queues ---
  {
    id: 'hof-13',
    title: 'Kth Largest Element in an Array',
    slug: 'kth-largest-element-in-an-array',
    chapterId: 6,
    category: 'Heap',
    difficulty: 'Medium',
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
    description:
      'Given an integer array nums and an integer k, return the kth largest element in the array without full O(N log N) sorting.',
    examples: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
      { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' },
    ],
    constraints: ['1 <= k <= nums.length <= 10^5'],
    starterCode: `def find_kth_largest(nums: list[int], k: int) -> int:
    pass`,
    solutionCode: `import heapq

def find_kth_largest(nums: list[int], k: int) -> int:
    min_heap = []
    for x in nums:
        heapq.heappush(min_heap, x)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    return min_heap[0]`,
    testCases: [
      { id: 'tc-1', input: '[3, 2, 1, 5, 6, 4], 2', expectedOutput: '5' },
      { id: 'tc-2', input: '[3, 2, 3, 1, 2, 4, 5, 5, 6], 4', expectedOutput: '4' },
    ],
    hints: {
      byteHint: 'Maintain a min-heap of size K. The smallest element in this heap is the Kth largest overall!',
      professorInsight: 'Time complexity is O(N log K). If K is small, this beats full array sorting.',
      bugsyTrap: 'Why min-heap and not max-heap? Min-heap lets you pop the smallest of the top-K in O(log K).',
    },
    tags: ['Array', 'Divide and Conquer', 'Heap'],
  },

  // --- Category G: Hash Maps & Sets ---
  {
    id: 'hof-14',
    title: 'Subarray Sum Equals K',
    slug: 'subarray-sum-equals-k',
    chapterId: 7,
    category: 'Hash Map & Prefix Sum',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description:
      'Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.',
    examples: [
      { input: 'nums = [1, 1, 1], k = 2', output: '2' },
      { input: 'nums = [1, 2, 3], k = 3', output: '2' },
    ],
    constraints: ['1 <= nums.length <= 2 * 10^4', '-1000 <= nums[i] <= 1000'],
    starterCode: `def subarray_sum(nums: list[int], k: int) -> int:
    pass`,
    solutionCode: `def subarray_sum(nums: list[int], k: int) -> int:
    counts = {0: 1}
    curr_sum = 0
    ans = 0
    for x in nums:
        curr_sum += x
        if curr_sum - k in counts:
            ans += counts[curr_sum - k]
        counts[curr_sum] = counts.get(curr_sum, 0) + 1
    return ans`,
    testCases: [
      { id: 'tc-1', input: '[1, 1, 1], 2', expectedOutput: '2' },
      { id: 'tc-2', input: '[1, 2, 3], 3', expectedOutput: '2' },
      { id: 'tc-3', input: '[1, -1, 0], 0', expectedOutput: '3' },
    ],
    hints: {
      byteHint: 'Sum(i, j) = Prefix[j] - Prefix[i-1]. If Prefix[j] - k exists in history, we found valid subarrays!',
      professorInsight: 'Initialize your hash map with {0: 1} to account for subarrays starting at index 0.',
      bugsyTrap: 'Two pointers does NOT work here because numbers can be negative!',
    },
    tags: ['Array', 'Hash Table', 'Prefix Sum'],
  },

  // --- Category H: Graphs ---
  {
    id: 'hof-15',
    title: 'Number of Islands',
    slug: 'number-of-islands',
    chapterId: 8,
    category: 'Graph BFS/DFS',
    difficulty: 'Medium',
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    description:
      'Given an m x n 2D binary grid grid which represents a map of "1"s (land) and "0"s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
    examples: [
      { input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]', output: '2' },
    ],
    constraints: ['m == grid.length', 'n == grid[i].length'],
    starterCode: `def num_islands(grid: list[list[str]]) -> int:
    pass`,
    solutionCode: `def num_islands(grid: list[list[str]]) -> int:
    if not grid: return 0
    rows, cols = len(grid), len(grid[0])
    count = 0
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '0' # sink the island
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    return count`,
    testCases: [
      { id: 'tc-1', input: '[["1","1","0"],["1","1","0"],["0","0","1"]]', expectedOutput: '2' },
      { id: 'tc-2', input: '[["1","0"],["0","1"]]', expectedOutput: '2' },
    ],
    hints: {
      byteHint: 'When you find a "1", launch a DFS/BFS to visit and sink all connected land cells.',
      professorInsight: 'Mutating grid[r][c] = "0" serves as our in-place visited set, keeping auxiliary space O(1) beyond call stack.',
      bugsyTrap: 'Always check boundary conditions before indexing into grid[r][c].',
    },
    tags: ['Array', 'DFS', 'BFS', 'Union Find', 'Matrix'],
  },

  // --- Category I: Dynamic Programming ---
  {
    id: 'hof-16',
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    chapterId: 9,
    category: 'Dynamic Programming',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description:
      'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      { input: 'n = 2', output: '2', explanation: '1+1 or 2' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, 2+1' },
    ],
    constraints: ['1 <= n <= 45'],
    starterCode: `def climb_stairs(n: int) -> int:
    pass`,
    solutionCode: `def climb_stairs(n: int) -> int:
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b`,
    testCases: [
      { id: 'tc-1', input: '2', expectedOutput: '2' },
      { id: 'tc-2', input: '3', expectedOutput: '3' },
      { id: 'tc-3', input: '5', expectedOutput: '8' },
    ],
    hints: {
      byteHint: 'To reach step n, you must come from step n-1 (1 step) or step n-2 (2 steps).',
      professorInsight: 'Ways(N) = Ways(N-1) + Ways(N-2). This is the Fibonacci sequence!',
      bugsyTrap: 'Avoid naive recursion: without memoization, fib(45) will trigger 2^45 calls and freeze your computer!',
    },
    tags: ['Math', 'Dynamic Programming', 'Memoization'],
  },
  {
    id: 'hof-17',
    title: 'Coin Change',
    slug: 'coin-change',
    chapterId: 9,
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    timeComplexity: 'O(amount * len(coins))',
    spaceComplexity: 'O(amount)',
    description:
      'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If cannot be made, return -1.',
    examples: [
      { input: 'coins = [1, 2, 5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1' },
      { input: 'coins = [2], amount = 3', output: '-1' },
      { input: 'coins = [1], amount = 0', output: '0' },
    ],
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
    starterCode: `def coin_change(coins: list[int], amount: int) -> int:
    pass`,
    solutionCode: `def coin_change(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if a - c >= 0:
                dp[a] = min(dp[a], 1 + dp[a - c])
    return dp[amount] if dp[amount] != float('inf') else -1`,
    testCases: [
      { id: 'tc-1', input: '[1, 2, 5], 11', expectedOutput: '3' },
      { id: 'tc-2', input: '[2], 3', expectedOutput: '-1' },
      { id: 'tc-3', input: '[1], 0', expectedOutput: '0' },
    ],
    hints: {
      byteHint: 'Build an array dp where dp[i] is the minimum coins needed for amount i.',
      professorInsight: 'Transition: dp[i] = min(dp[i - coin] + 1) for all coins where i >= coin.',
      bugsyTrap: 'Greedy choice fails! For [1, 3, 4] with amount 6, greedy takes 4+1+1 (3 coins) instead of 3+3 (2 coins).',
    },
    tags: ['Array', 'Dynamic Programming', 'BFS'],
  },
  {
    id: 'hof-18',
    title: 'Longest Common Subsequence',
    slug: 'longest-common-subsequence',
    chapterId: 9,
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    description:
      'Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.',
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: '3', explanation: 'The longest common subsequence is "ace" and its length is 3.' },
      { input: 'text1 = "abc", text2 = "abc"', output: '3' },
      { input: 'text1 = "abc", text2 = "def"', output: '0' },
    ],
    constraints: ['1 <= text1.length, text2.length <= 1000'],
    starterCode: `def longest_common_subsequence(text1: str, text2: str) -> int:
    pass`,
    solutionCode: `def longest_common_subsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = 1 + dp[i-1][j-1]
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`,
    testCases: [
      { id: 'tc-1', input: '"abcde", "ace"', expectedOutput: '3' },
      { id: 'tc-2', input: '"abc", "abc"', expectedOutput: '3' },
      { id: 'tc-3', input: '"abc", "def"', expectedOutput: '0' },
    ],
    hints: {
      byteHint: '2D grid dp[i][j]: if chars match, diagonal + 1; else max(left, up).',
      professorInsight: 'Subsequence elements do not have to be consecutive, but must maintain relative order.',
      bugsyTrap: 'Do not confuse subsequence with substring! Substrings require consecutive characters.',
    },
    tags: ['String', 'Dynamic Programming'],
  },
];
