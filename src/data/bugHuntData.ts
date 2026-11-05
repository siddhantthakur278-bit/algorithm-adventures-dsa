import { BugHuntChallenge } from '../types';

export const bugHuntChallenges: BugHuntChallenge[] = [
  {
    id: 'bh-1',
    title: 'The Infinite Binary Search Trap',
    chapterTitle: 'Ch 1: Big-O & Searching',
    description: 'Bugsy wrote this binary search to find an element, but it freezes into an infinite loop on certain inputs!',
    bugType: 'Off-by-One / Infinite Loop',
    language: 'python',
    lineBugIndex: 7,
    buggyCode: `def binary_search(nums, target):
    lo = 0
    hi = len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid  # <-- BUG HERE!
        else:
            hi = mid
    return lo if nums[lo] == target else -1`,
    options: [
      {
        text: 'Change line 7 to: lo = mid + 1',
        isCorrect: true,
        explanation: 'When hi - lo == 1, (lo + hi) // 2 rounds down to lo. Setting lo = mid causes lo to never increase, triggering an infinite loop!',
      },
      {
        text: 'Change line 4 to: while lo <= hi:',
        isCorrect: false,
        explanation: 'Changing while loop condition without fixing lo = mid will make the infinite loop even worse!',
      },
      {
        text: 'Change line 9 to: hi = mid - 1',
        isCorrect: false,
        explanation: 'hi = mid is correct for the upper boundary in this variant, but lo = mid was the infinite stall.',
      },
    ],
    fixedCode: `def binary_search(nums, target):
    lo = 0
    hi = len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo if nums[lo] == target else -1`,
    bugsyComment: 'Hehehe! When lo=0 and hi=1, mid=0! lo stays 0 forever and ever!',
    xpReward: 60,
  },
  {
    id: 'bh-2',
    title: 'The Mutating Loop Disaster',
    chapterTitle: 'Ch 2: Arrays & Lists',
    description: 'Bugsy wanted to remove all even numbers from an array, but some evens mysteriously survived!',
    bugType: 'List Mutation During Iteration',
    language: 'python',
    lineBugIndex: 2,
    buggyCode: `def remove_evens(nums):
    for x in nums:  # <-- BUG HERE!
        if x % 2 == 0:
            nums.remove(x)
    return nums`,
    options: [
      {
        text: 'Use list comprehension: return [x for x in nums if x % 2 != 0]',
        isCorrect: true,
        explanation: 'Mutating a list while iterating over it shifts indices, causing elements adjacent to removed items to be skipped entirely!',
      },
      {
        text: 'Use nums.pop(x) instead of nums.remove(x)',
        isCorrect: false,
        explanation: 'pop() takes an index, not a value, and mutating during iteration is still broken.',
      },
      {
        text: 'Iterate with while len(nums) > 0',
        isCorrect: false,
        explanation: 'That would empty the entire list or run indefinitely.',
      },
    ],
    fixedCode: `def remove_evens(nums):
    return [x for x in nums if x % 2 != 0]`,
    bugsyComment: 'I love skipping elements! When you remove an item, the next item slides into the old index and gets missed!',
    xpReward: 50,
  },
  {
    id: 'bh-3',
    title: 'The Severed Linked List',
    chapterTitle: 'Ch 3: Linked Lists',
    description: 'Byte is reversing a singly linked list, but Bugsy severed the pointers, causing an AttributeError: NoneType has no attribute "next"!',
    bugType: 'Lost Reference in Pointer Swap',
    language: 'python',
    lineBugIndex: 5,
    buggyCode: `def reverse_linked_list(head):
    prev = None
    curr = head
    while curr:
        curr.next = prev  # <-- BUG: curr.next overwritten before saving!
        prev = curr
        curr = curr.next  # curr is now prev, infinite cycle!
    return prev`,
    options: [
      {
        text: 'Save nxt = curr.next first, then curr.next = prev, prev = curr, curr = nxt',
        isCorrect: true,
        explanation: 'You must cache curr.next before overwriting it; otherwise you lose access to the remaining nodes in the list!',
      },
      {
        text: 'Start prev with head instead of None',
        isCorrect: false,
        explanation: 'Starting prev as head causes the head to point to itself, creating an instant cycle.',
      },
      {
        text: 'Swap head and tail values without changing pointers',
        isCorrect: false,
        explanation: 'Singly linked lists do not support backward traversal without extra memory.',
      },
    ],
    fixedCode: `def reverse_linked_list(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
    bugsyComment: 'You lost your next pointer in the void! Good luck finding the rest of the list now!',
    xpReward: 65,
  },
  {
    id: 'bh-4',
    title: 'The Exponential BFS Memory Explosion',
    chapterTitle: 'Ch 8: Graphs & BFS',
    description: 'A standard BFS search was supposed to run in O(V + E), but memory consumption exploded and crashed the server!',
    bugType: 'Mark Visited on Pop vs Push',
    language: 'python',
    lineBugIndex: 7,
    buggyCode: `def bfs(graph, start):
    visited = set()
    queue = [start]
    while queue:
        node = queue.pop(0)
        visited.add(node)  # <-- BUG: Marked on pop instead of push!
        for neighbor in graph[node]:
            if neighbor not in visited:
                queue.append(neighbor)`,
    options: [
      {
        text: 'Mark neighbor as visited at the moment it is appended to the queue (and use collections.deque)',
        isCorrect: true,
        explanation: 'Marking visited only on pop allows duplicate instances of the same node to be appended thousands of times before the first one is popped!',
      },
      {
        text: 'Replace visited set with a list',
        isCorrect: false,
        explanation: 'A list has O(N) lookup instead of O(1), making it even slower!',
      },
      {
        text: 'Clear the queue after every level',
        isCorrect: false,
        explanation: 'Clearing the queue terminates the BFS prematurely before visiting all reachable nodes.',
      },
    ],
    fixedCode: `from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
    bugsyComment: 'My duplicate nodes swarmed your queue before you could even pop them! Muahaha!',
    xpReward: 75,
  },
  {
    id: 'bh-5',
    title: 'The Greedy 1D Knapsack Duplication Glitch',
    chapterTitle: 'Ch 9: Dynamic Programming',
    description: 'In a 0/1 Knapsack where each item can only be taken once, Bugsy managed to duplicate gold bars infinitely!',
    bugType: 'Forward Loop in 1D DP Space Optimization',
    language: 'python',
    lineBugIndex: 6,
    buggyCode: `def knapsack_01(weights, values, capacity):
    dp = [0] * (capacity + 1)
    for w, v in zip(weights, values):
        # BUG: looping forwards allows item to be reused!
        for cap in range(w, capacity + 1):
            dp[cap] = max(dp[cap], dp[cap - w] + v)
    return dp[capacity]`,
    options: [
      {
        text: 'Iterate cap backwards: range(capacity, w - 1, -1)',
        isCorrect: true,
        explanation: 'Iterating backwards ensures dp[cap - w] contains values from the PREVIOUS item, preventing the current item from being used multiple times!',
      },
      {
        text: 'Divide capacity by 2',
        isCorrect: false,
        explanation: 'That reduces capacity arbitrarily and produces the wrong answer.',
      },
      {
        text: 'Change max() to min()',
        isCorrect: false,
        explanation: 'We want to maximize value, not minimize it.',
      },
    ],
    fixedCode: `def knapsack_01(weights, values, capacity):
    dp = [0] * (capacity + 1)
    for w, v in zip(weights, values):
        for cap in range(capacity, w - 1, -1):
            dp[cap] = max(dp[cap], dp[cap - w] + v)
    return dp[capacity]`,
    bugsyComment: 'Thanks for the infinite gold bars! I used one bar 10 times in the same bag!',
    xpReward: 80,
  },
];
