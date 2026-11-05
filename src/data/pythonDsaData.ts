import {
  PythonDsaChapter,
  PythonDsaClassicalProblem,
  PythonDsaCheatSheet,
  PythonDsaBossQuestion,
  PythonDsaGlossaryItem,
} from '../types/pythonDsaTypes';

export const pythonDsaChapters: PythonDsaChapter[] = [
  {
    id: 0,
    numberLabel: 'CHAPTER 0',
    title: 'WELCOME, HERO!',
    subtitle: 'Read this first • 3 minutes • The 7-step loop',
    timeEstimate: '3 min read',
    comicHook: [
      {
        speaker: 'sid',
        text: 'Professor Py?! I always get lost in DSA. Lists, trees, graphs, Big-O... my brain says "404 Not Found".',
        subtext: 'Sid - The Learner',
      },
      {
        speaker: 'prof_py',
        text: 'Ssssimple! DSA is just two questions: HOW do I store data, and HOW do I process it fast? Everything else is a pattern.',
        subtext: 'Professor Py - Your Guide',
      },
      {
        speaker: 'sid',
        text: 'Patterns I can learn?',
      },
      {
        speaker: 'prof_py',
        text: 'Patterns you can SEE. This comic guide gives every idea a story, a diagram, runnable Python code, and quizzes to lock it in!',
      },
    ],
    sections: [
      {
        heading: 'The 7-Step Comic Learning Loop',
        theory:
          'Every single topic in this book follows the exact same pedagogical 7-step loop to guarantee retention:',
        bulletPoints: [
          '1. STORY: A comic panel gives the idea a relatable human face.',
          '2. THEORY + DIAGRAM: The core algorithmic concept explained visually with zero fluff.',
          '3. CODE + OUTPUT: Real executable Python 3 code with real terminal output.',
          '4. MYTH BUSTER: Buggy the myth monster states a misconception, and Professor Py fixes it.',
          '5. QUICK QUIZ: 3 instant multiple-choice questions to test your intuition.',
          '6. FIX-IT QUESTION: A targeted puzzle isolating the #1 confusion interviewees face.',
          '7. BRAIN BLAST: A word problem challenge to solve on paper before checking the Answer Vault.',
        ],
      },
      {
        heading: 'Your 30-Day Mission Map',
        theory:
          'Follow this structured syllabus to master Python and Data Structures in 30 days:',
        bulletPoints: [
          'Week 1 (Ch 1-4, 60-75 min/day): Python power-up, Big-O speed check, arrays/strings, recursion & backtracking.',
          'Week 2 (Ch 5-8, 60-75 min/day): Linear & binary search, sorting algorithms, linked lists, stacks.',
          'Week 3 (Ch 9-12, 60-90 min/day): Queues/deques, hashing, binary trees & BST, heaps & priority queues.',
          'Week 4 (Ch 13-14 + 80 Classics, 90 min/day): Graphs (BFS/DFS), Dynamic Programming, then conquer the 80 Classic Brainstormers!',
        ],
      },
    ],
    mythBusters: [
      {
        id: 'mb-0',
        myth: 'DSA requires intense competitive math and memorizing hundreds of algorithms.',
        truth:
          'False! Real DSA is about recognizing ~10 visual patterns (two pointers, sliding window, fast/slow runners, tree recursion, BFS levels, DP memoization).',
      },
    ],
    quizzes: [
      {
        id: 'Q0.1',
        question: 'What are the two fundamental questions of Data Structures & Algorithms?',
        options: [
          { label: 'A', text: 'Which programming language is fastest?' },
          { label: 'B', text: 'HOW do I store data, and HOW do I process it fast?' },
          { label: 'C', text: 'How do I pass unit tests with fewer lines of code?' },
          { label: 'D', text: 'How do I make recursive functions run indefinitely?' },
        ],
        correct: 'B',
        explanation: 'DSA boils down to choosing the optimal container (storage) and the optimal algorithm (processing).',
      },
      {
        id: 'Q0.2',
        question: 'What is the Golden Rule of the 7-Step Loop?',
        options: [
          { label: 'A', text: 'Always peek at the Answer Vault first before reading' },
          { label: 'B', text: 'Never write code on paper' },
          { label: 'C', text: 'Never read an answer before you have written your own guess on paper' },
          { label: 'D', text: 'Skip all myth busters to save time' },
        ],
        correct: 'C',
        explanation: 'A wrong guess written on paper teaches more than a lazy right one read passively.',
      },
    ],
    brainBlasts: [],
    answerVault: {
      quizAnswers: { 'Q0.1': 'B', 'Q0.2': 'C' },
      brainBlastAnswers: {},
    },
  },

  {
    id: 1,
    numberLabel: 'CHAPTER 1',
    title: 'PYTHON POWER-UP',
    subtitle: 'Variables, Types, Mutability, The Four Containers, Comprehensions',
    timeEstimate: '15 min read',
    comicHook: [
      {
        speaker: 'sid',
        text: 'Before DSA, do I really need to master Python inside out?',
      },
      {
        speaker: 'prof_py',
        text: 'You need the RIGHT 20% of Python! Names vs objects, mutable vs immutable, and the four containers. Learn those and half of all DSA bugs vanish!',
      },
      {
        speaker: 'buggy',
        text: 'Hehehe! I will make them alias lists and mutate default arguments without them noticing!',
      },
    ],
    sections: [
      {
        heading: '1.1 Variables, Types & Mutability',
        theory:
          'In Python, a variable is NOT a box that holds a value. It is a name tag stuck on an object in memory. Multiple names can point to the exact same object!',
        bulletPoints: [
          'Immutable objects can never change after creation: int, float, str, tuple, bool. Modifying them creates a NEW object.',
          'Mutable objects can be modified in place: list, dict, set. Anyone holding a reference sees the change immediately.',
          '== asks "do they have equal contents?". is asks "are they the very same object in memory?".',
          'b = a creates an alias (one list, two names). b = a.copy() or a[:] creates an independent second list.',
        ],
        codeSnippet: {
          code: `a = [1, 2, 3]
b = a          # alias, NOT a copy!
b.append(99)
print("a =", a) # a changed too: [1, 2, 3, 99]

c = a.copy()   # a real shallow copy
c.append(100)
print("a is b:", a is b, "| a is c:", a is c, "| a == c:", a == c)

s = "hello"
# s[0] = "J" -> Raises TypeError: 'str' object does not support item assignment
s = "J" + s[1:] # build a NEW string instead!
print(s)`,
          output: `a = [1, 2, 3, 99]
a is b: True | a is c: False | a == c: False
Jello`,
        },
      },
      {
        heading: '1.2 The Four Containers (list, tuple, dict, set)',
        theory:
          'Almost every DSA problem is conquered by picking the right container. Know their order, mutability, and costs:',
        bulletPoints: [
          'list: Ordered by index, mutable. a[i] is O(1), append is O(1) amortized, insert(0, x) and "x in list" are O(n).',
          'tuple: Ordered, IMMUTABLE. a[i] is O(1). Great for fixed records and dict keys.',
          'dict: Key-value lookup, mutable, preserves insertion order (Python 3.7+). get / set / in are O(1) average.',
          'set: Unordered, mutable, unique elements only. add / in / remove are O(1) average. Perfect for "have I seen this before?".',
        ],
        codeSnippet: {
          code: `nums = [4, 7, 4, 9, 7, 4]
print("Unique set:", set(nums))

# Frequency counting with dict
count = {}
for x in nums:
    count[x] = count.get(x, 0) + 1
print("Frequencies:", count)

point = (3, 5) # tuple unpacking
x, y = point
print("Unpacked sum:", x + y)`,
          output: `Unique set: {9, 4, 7}
Frequencies: {4: 3, 7: 2, 9: 1}
Unpacked sum: 8`,
        },
      },
      {
        heading: '1.3 Functions, Comprehensions & Handy Tricks',
        theory:
          'Write concise, Pythonic code with list comprehensions, sorting keys, floor division, and tuple swaps.',
        bulletPoints: [
          'List comprehensions build transformed lists in one readable, C-optimized loop.',
          'sorted(items, key=...) returns a new list sorted by the key function without mutating.',
          '// is FLOOR division: it rounds down toward minus infinity. -7 // 2 is -4, not -3! (a//b)*b + a%b == a.',
          'a, b = b, a swaps values cleanly without an explicit temporary variable.',
        ],
        codeSnippet: {
          code: `squares = [n*n for n in range(1, 8) if n % 2 == 1]
print("Odd squares:", squares)

names = ["Zoya", "amit", "Bela"]
print("Sorted case-insensitive:", sorted(names, key=str.lower))

print("-7 // 2 =", -7 // 2, "| -7 % 2 =", -7 % 2)

marks = [35, 72, 90, 18]
print("any < 20:", any(m < 20 for m in marks), "| all >= 18:", all(m >= 18 for m in marks))`,
          output: `Odd squares: [1, 9, 25, 49]
Sorted case-insensitive: ['amit', 'Bela', 'Zoya']
-7 // 2 = -4 | -7 % 2 = 1
any < 20: True | all >= 18: True`,
        },
      },
    ],
    mythBusters: [
      {
        id: 'mb-1-1',
        myth: 'b = a makes a separate copy of the list.',
        truth:
          'It copies only the name tag! Both names point to the same memory object. Use b = a.copy(), b = a[:] or list(a) for a shallow copy.',
      },
      {
        id: 'mb-1-2',
        myth: 'I can change one letter of a string with s[0] = "J".',
        truth:
          'Strings are immutable in Python. Build a new string with slicing s = "J" + s[1:], or convert to list, edit, then "".join(...).',
      },
      {
        id: 'mb-1-3',
        myth: 'The "in" operator is always fast.',
        truth:
          'On a list, "x in a" scans element by element in O(n) time. On a set or dict, it is O(1) on average. Same keyword, completely different cost!',
      },
      {
        id: 'mb-1-4',
        myth: '// just chops off the decimal part.',
        truth:
          '// is floor division: it rounds down to the next smaller integer. -7 // 2 is -4, not -3.',
      },
    ],
    quizzes: [
      {
        id: 'Q1.1',
        question: 'After x = [1, 2]; y = x; y.append(3), what is the value of x?',
        options: [
          { label: 'A', text: '[1, 2]' },
          { label: 'B', text: '[1, 2, 3]' },
          { label: 'C', text: '[3]' },
          { label: 'D', text: 'Error' },
        ],
        correct: 'B',
        explanation: 'x and y reference the exact same list in memory. Mutating y changes x.',
      },
      {
        id: 'Q1.2',
        question: 'Which of these Python objects is immutable?',
        options: [
          { label: 'A', text: 'list' },
          { label: 'B', text: 'dict' },
          { label: 'C', text: 'tuple' },
          { label: 'D', text: 'set' },
        ],
        correct: 'C',
        explanation: 'Tuples cannot be modified after creation. Lists, dicts, and sets are all mutable.',
      },
      {
        id: 'Q1.3',
        question: 'a = [1, 2]; b = [1, 2]. What are a == b and a is b?',
        options: [
          { label: 'A', text: 'True, True' },
          { label: 'B', text: 'True, False' },
          { label: 'C', text: 'False, True' },
          { label: 'D', text: 'False, False' },
        ],
        correct: 'B',
        explanation: 'They have equal contents (== is True), but are two distinct list objects in memory (is is False).',
      },
      {
        id: 'Q1.5',
        question: 'Which container provides O(1) average membership ("x in C") test?',
        options: [
          { label: 'A', text: 'list' },
          { label: 'B', text: 'tuple' },
          { label: 'C', text: 'set' },
          { label: 'D', text: 'string' },
        ],
        correct: 'C',
        explanation: 'Sets use hash tables, allowing O(1) average lookups compared to O(n) scans for lists and tuples.',
      },
      {
        id: 'Q1.6',
        question: 'Which is the cheapest operation on a list of n items?',
        options: [
          { label: 'A', text: 'insert(0, x)' },
          { label: 'B', text: 'pop(0)' },
          { label: 'C', text: 'append(x)' },
          { label: 'D', text: 'x in a' },
        ],
        correct: 'C',
        explanation: 'append at the end is amortized O(1). insert(0, x) and pop(0) must shift all n elements (O(n)).',
      },
      {
        id: 'Q1.10',
        question: 'What do 7 // 2 and 7 / 2 evaluate to in Python 3?',
        options: [
          { label: 'A', text: '3 and 3' },
          { label: 'B', text: '3 and 3.5' },
          { label: 'C', text: '4 and 3.5' },
          { label: 'D', text: '3.5 and 3' },
        ],
        correct: 'B',
        explanation: '// performs integer floor division (3), while / performs true float division (3.5).',
      },
    ],
    fixItQuestion: {
      id: 'Q1.4',
      question:
        'A function is defined as: def f(x, bag=[]): bag.append(x); return bag. What do f(1) and then f(2) return?',
      options: [
        { label: 'A', text: '[1] then [2]' },
        { label: 'B', text: '[1] then [1, 2]' },
        { label: 'C', text: '[1] then [1]' },
        { label: 'D', text: 'Error' },
      ],
      correct: 'B',
      explanation:
        'Default arguments in Python are evaluated ONCE when the function is defined! The same list is shared across calls. To fix: use bag=None and set bag = [] inside.',
    },
    brainBlasts: [
      {
        id: 'B1.1',
        title: 'The Shared-Rows Trap',
        problem:
          'Sid builds a 3x3 game board with grid = [[0]*3]*3 and then sets grid[0][0] = 1. He expects only the top-left cell to change. What gets printed, why, and how do you build the board correctly?',
        hint: 'How many different lists actually exist in the outer grid?',
        solutionCode: `# WRONG WAY (3 rows point to same inner list!):
bad = [[0]*3]*3
bad[0][0] = 1
print("Bad grid:", bad)

# CORRECT WAY (list comprehension creates a NEW row each time):
good = [[0]*3 for _ in range(3)]
good[0][0] = 1
print("Good grid:", good)`,
        solutionOutput: `Bad grid: [[1, 0, 0], [1, 0, 0], [1, 0, 0]]
Good grid: [[1, 0, 0], [0, 0, 0], [0, 0, 0]]`,
        explanation:
          '[[0]*3]*3 duplicates the reference to the single inner list [0, 0, 0] three times! Using [ [0]*3 for _ in range(3) ] creates 3 distinct list objects.',
      },
      {
        id: 'B1.2',
        title: 'Ticket Checker',
        problem:
          'A concert venue has 1,000,000 valid ticket IDs. At the gate, 1,000 attendees scan their IDs. If valid IDs are stored in a list vs a set, roughly how many comparisons are needed in the worst case? Which would you choose?',
        hint: 'Multiply queries by cost per query: 1,000 x O(n) vs 1,000 x O(1).',
        explanation:
          'List lookup takes O(n) per query: 1,000 x 1,000,000 = 1,000,000,000 comparisons (~10 seconds). Set lookup takes O(1) per query: ~1,000 comparisons (instantaneous). Always choose the set!',
      },
      {
        id: 'B1.3',
        title: 'Even Squares Report',
        problem:
          'A teacher has marks = [12, 45, 8, 33, 60, 7]. In ONE comprehension produce the squares of the even marks. Then count how many students passed (mark >= 33).',
        hint: 'Use a conditional list comprehension [m*m for m in marks if ...] and sum(1 for ...).',
        solutionCode: `marks = [12, 45, 8, 33, 60, 7]
even_sq = [m*m for m in marks if m % 2 == 0]
passed = sum(1 for m in marks if m >= 33)
print("Even squares:", even_sq, "| Passed count:", passed)`,
        solutionOutput: `Even squares: [144, 64, 3600] | Passed count: 3`,
        explanation:
          'The trailing "if m % 2 == 0" filters out odd marks. sum(1 for m in marks if m >= 33) counts passes cleanly in O(n) time and O(1) memory.',
      },
    ],
    answerVault: {
      quizAnswers: {
        'Q1.1': 'B',
        'Q1.2': 'C',
        'Q1.3': 'B',
        'Q1.4': 'B',
        'Q1.5': 'C',
        'Q1.6': 'C',
        'Q1.10': 'B',
      },
      brainBlastAnswers: {
        'B1.1': {
          code: `good = [[0]*3 for _ in range(3)]\ngood[0][0] = 1`,
          output: `[[1, 0, 0], [0, 0, 0], [0, 0, 0]]`,
          explanation: '[[0]*3]*3 duplicates references; use a list comprehension instead.',
        },
        'B1.2': {
          explanation: 'Set lookup takes 1,000 operations vs 1 billion for a list. Always choose set for membership.',
        },
        'B1.3': {
          code: `even_sq = [m*m for m in marks if m % 2 == 0]\npassed = sum(1 for m in marks if m >= 33)`,
          output: `[144, 64, 3600] 3`,
          explanation: 'Trailing if clause filters; sum of generator expression counts matches.',
        },
      },
    },
  },

  {
    id: 2,
    numberLabel: 'CHAPTER 2',
    title: 'BIG-O: SPEED CHECK',
    subtitle: 'How to Measure an Algorithm Without a Stopwatch • Time & Space Complexity',
    timeEstimate: '15 min read',
    comicHook: [
      {
        speaker: 'sid',
        text: 'My code works on 10 items. Why does it hang on 1,000,000?!',
      },
      {
        speaker: 'prof_py',
        text: 'Because growth matters! Big-O tells you how the work GROWS when the input size grows — the single most important DSA skill.',
      },
      {
        speaker: 'buggy',
        text: 'Mwahaha! I love nested loops! O(n^2) turns seconds into hours on 1,000,000 items!',
      },
    ],
    sections: [
      {
        heading: '2.1 What Big-O Really Says',
        theory:
          'Big-O describes how the number of steps grows as input size n grows. We ignore clock speed and minor constants, keeping only the shape of growth.',
        bulletPoints: [
          'O(1) Constant: Instantaneous (dict lookup, array index a[i]).',
          'O(log n) Logarithmic: Halving the problem each step (binary search). 1,000,000 items takes only 20 steps!',
          'O(n) Linear: One pass through the data (for loop).',
          'O(n log n) Linearithmic: Optimal comparison sorting (Merge Sort, Timsort).',
          'O(n^2) Quadratic: Nested loops over n items. Becomes slow very quickly.',
          'O(2^n) Exponential: Doubling work with every extra item (brute force subsets).',
        ],
        codeSnippet: {
          code: `def linear(n):
    return sum(1 for _ in range(n))

def quadratic(n):
    return sum(1 for _ in range(n) for _ in range(n))

def halving(n):
    steps = 0
    while n > 1:
        n //= 2
        steps += 1
    return steps

for n in (10, 100, 1000):
    print(f"n={n:<4} | linear={linear(n):<4} | quad={quadratic(n):<8} | log2={halving(n)}")`,
          output: `n=10   | linear=10   | quad=100      | log2=3
n=100  | linear=100  | quad=10000    | log2=6
n=1000 | linear=1000 | quad=1000000  | log2=9`,
        },
      },
      {
        heading: '2.2 Space, Best/Worst Case & Reading Code',
        theory:
          'Time complexity counts CPU steps; space complexity counts extra memory allocated. Often you trade memory to save time!',
        bulletPoints: [
          'Tradeoff example: checking duplicates by comparing all pairs is O(n^2) time with O(1) space, but using a set is O(n) time with O(n) space.',
          'Interviewers always mean worst-case unless specified otherwise.',
          'Recursion uses stack space! A function with recursion depth n holds n stack frames: O(n) extra memory even if no list is created.',
        ],
        codeSnippet: {
          code: `def has_dup_slow(a): # O(n^2) time, O(1) space
    for i in range(len(a)):
        for j in range(i + 1, len(a)):
            if a[i] == a[j]: return True
    return False

def has_dup_fast(a): # O(n) time, O(n) space
    seen = set()
    for x in a:
        if x in seen: return True
        seen.add(x)
    return False

data = [3, 1, 4, 1]
print("Slow check:", has_dup_slow(data), "| Fast check:", has_dup_fast(data))`,
          output: `Slow check: True | Fast check: True`,
        },
      },
    ],
    mythBusters: [
      {
        id: 'mb-2-1',
        myth: 'O(n) means exactly n steps.',
        truth:
          'Big-O is an asymptotic upper-bound growth rate, not an exact tick count. 3n + 10 and 0.5n steps are both O(n).',
      },
      {
        id: 'mb-2-2',
        myth: 'A faster algorithm always uses less memory.',
        truth:
          'Often the opposite! Fast algorithms frequently spend O(n) memory (hash tables, memo tables) to avoid recomputing work.',
      },
    ],
    quizzes: [
      {
        id: 'Q2.1',
        question: 'A single loop from 0 to n items is:',
        options: [
          { label: 'A', text: 'O(1)' },
          { label: 'B', text: 'O(n)' },
          { label: 'C', text: 'O(n^2)' },
          { label: 'D', text: 'O(log n)' },
        ],
        correct: 'B',
        explanation: 'The loop body executes n times in direct proportion to input size n.',
      },
      {
        id: 'Q2.2',
        question: 'Two nested loops, each running n times, have time complexity:',
        options: [
          { label: 'A', text: 'O(2n)' },
          { label: 'B', text: 'O(n)' },
          { label: 'C', text: 'O(n^2)' },
          { label: 'D', text: 'O(log n)' },
        ],
        correct: 'C',
        explanation: 'Nested loops multiply: n x n = n^2 total iterations.',
      },
      {
        id: 'Q2.3',
        question: 'Simplify the algebraic growth expression 4n^2 + 20n + 7:',
        options: [
          { label: 'A', text: 'O(n)' },
          { label: 'B', text: 'O(n^2)' },
          { label: 'C', text: 'O(4n^2)' },
          { label: 'D', text: 'O(n^3)' },
        ],
        correct: 'B',
        explanation: 'Drop leading coefficients (4) and lower order terms (20n and 7).',
      },
    ],
    fixItQuestion: {
      id: 'Q2.4',
      question:
        'Code: for i in range(n): for j in range(5): work(). What is the time complexity?',
      options: [
        { label: 'A', text: 'O(n^2)' },
        { label: 'B', text: 'O(5n) = O(n)' },
        { label: 'C', text: 'O(log n)' },
        { label: 'D', text: 'O(5)' },
      ],
      correct: 'B',
      explanation:
        'The inner loop runs a constant 5 times regardless of n. 5 x n = 5n, which simplifies to O(n).',
    },
    brainBlasts: [
      {
        id: 'B2.1',
        title: 'Million Users Challenge',
        problem:
          'A social app has n = 1,000,000 users. Algorithm A compares every pair of users: n^2 steps. Algorithm B uses a hash set: n steps. If a server does 10^8 operations/sec, how long does each take?',
        hint: 'Divide total steps by 10^8 steps per second.',
        explanation:
          'Algorithm A: (10^6)^2 = 10^12 steps. 10^12 / 10^8 = 10,000 seconds ≈ 2.8 hours!\nAlgorithm B: 10^6 / 10^8 = 0.01 seconds!\nA 1,000,000x difference — that is why Big-O matters!',
      },
    ],
    answerVault: {
      quizAnswers: { 'Q2.1': 'B', 'Q2.2': 'C', 'Q2.3': 'B', 'Q2.4': 'B' },
      brainBlastAnswers: {
        'B2.1': {
          explanation: 'Algorithm A takes ~2.8 hours; Algorithm B takes 0.01 seconds.',
        },
      },
    },
  },

  {
    id: 3,
    numberLabel: 'CHAPTER 3',
    title: 'ARRAYS & STRINGS',
    subtitle: 'Indexing, Slicing, Two Pointers, Sliding Windows & Prefix Sums',
    timeEstimate: '20 min read',
    comicHook: [
      {
        speaker: 'sid',
        text: 'Arrays feel too easy. Are they really asked in big tech interviews?',
      },
      {
        speaker: 'prof_py',
        text: 'Easy to store, tricky to use WELL! Most interview questions are secretly array tricks. Master two pointers, sliding windows, and prefix sums and you win!',
      },
    ],
    sections: [
      {
        heading: '3.1 Lists as Arrays: Indexing & Slicing',
        theory:
          'A Python list is a dynamic array storing contiguous references to objects. Jumping to index i is instant O(1).',
        bulletPoints: [
          'Negative indexes count from the back: a[-1] is the last element.',
          'Slicing a[start:stop:step] excludes stop. a[::-1] produces a reversed copy.',
          'CAUTION: a[i:j] creates a NEW list of size (j - i) and copies elements: O(j - i) time and memory. Inside loops this can silently cause O(n^2) performance!',
        ],
        codeSnippet: {
          code: `a = [10, 20, 30, 40, 50, 60, 70]
print("a[2]:", a[2], "| a[-1]:", a[-1])
print("a[2:5]:", a[2:5]) # [30, 40, 50] (index 5 excluded)
print("a[::-1] reversed:", a[::-1])

word = "level"
print("Palindrome check:", word == word[::-1])`,
          output: `a[2]: 30 | a[-1]: 70
a[2:5]: [30, 40, 50]
a[::-1] reversed: [70, 60, 50, 40, 30, 20, 10]
Palindrome check: True`,
        },
      },
      {
        heading: '3.2 Two Pointers, Sliding Window & Prefix Sums',
        theory:
          'Three patterns turn O(n^2) brute force into clean O(n) solutions:',
        bulletPoints: [
          'Two Pointers: One pointer at each end of a SORTED array; move inward based on comparison.',
          'Sliding Window: Maintain a running window; when sliding right, add the entering element and subtract the leaving element in O(1).',
          'Prefix Sums: Pre-calculate cumulative totals prefix[k] so any subarray sum nums[i..j] is prefix[j+1] - prefix[i] in O(1).',
        ],
        codeSnippet: {
          code: `def pair_sum_sorted(a, target):
    l, r = 0, len(a) - 1
    while l < r:
        s = a[l] + a[r]
        if s == target: return (a[l], a[r])
        elif s < target: l += 1
        else: r -= 1
    return None

def max_subarray_window(a, k):
    cur = sum(a[:k])
    best = cur
    for i in range(k, len(a)):
        cur += a[i] - a[i - k] # add new, subtract leaving
        best = max(best, cur)
    return best

print("Two sum pair for 12:", pair_sum_sorted([1, 3, 4, 6, 8, 11, 15], 12))
print("Max sum window of size 3:", max_subarray_window([2, 1, 5, 1, 3, 2, 4], 3))`,
          output: `Two sum pair for 12: (1, 11)
Max sum window of size 3: 9`,
        },
      },
    ],
    mythBusters: [
      {
        id: 'mb-3-1',
        myth: 'Slicing is free.',
        truth:
          'a[i:j] creates a brand new list and copies all (j - i) items: O(j - i) time and memory. Never slice inside a loop!',
      },
      {
        id: 'mb-3-2',
        myth: 'Two pointers works on any unsorted array.',
        truth:
          'The two-pointer pair-sum pattern strictly requires a sorted array. Sortedness is what tells you which pointer to advance.',
      },
    ],
    quizzes: [
      {
        id: 'Q3.1',
        question: 'a = [5, 6, 7, 8]; what does a[1:3] return?',
        options: [
          { label: 'A', text: '[5, 6]' },
          { label: 'B', text: '[6, 7]' },
          { label: 'C', text: '[6, 7, 8]' },
          { label: 'D', text: '[5, 6, 7]' },
        ],
        correct: 'B',
        explanation: 'Index 1 is 6, index 2 is 7. Stop index 3 is excluded.',
      },
      {
        id: 'Q3.5',
        question: 'Why is a sliding window O(n) instead of O(n x k)?',
        options: [
          { label: 'A', text: 'It skips elements' },
          { label: 'B', text: 'Each element enters and leaves the window once' },
          { label: 'C', text: 'It sorts the array first' },
          { label: 'D', text: 'It uses recursion' },
        ],
        correct: 'B',
        explanation: 'Instead of summing all k elements every time (k steps), it updates the total in O(1) with one add and one subtract.',
      },
    ],
    fixItQuestion: {
      id: 'Q3.4',
      question: 'a = [1, 2, 3, 4, 5]; a[1:3] = [9] makes a equal to:',
      options: [
        { label: 'A', text: '[1, 9, 3, 4, 5]' },
        { label: 'B', text: '[1, 9, 4, 5]' },
        { label: 'C', text: '[9, 4, 5]' },
        { label: 'D', text: 'Error' },
      ],
      correct: 'B',
      explanation: 'Slice assignment replaces elements at index 1 and 2 ([2, 3]) with [9].',
    },
    brainBlasts: [
      {
        id: 'B3.1',
        title: 'Playlist Rotation',
        problem:
          'A playlist is [A, B, C, D, E, F]. After pressing "skip 2 songs" the first 2 go to the back: [C, D, E, F, A, B]. Write code for any k, even if k is larger than the list.',
        hint: 'Use modulo: k %= len(a) and cut into two slices a[k:] + a[:k].',
        solutionCode: `def rotate_left(a, k):
    if not a: return a
    k %= len(a)
    return a[k:] + a[:k]

print(rotate_left(list("ABCDEF"), 2))
print(rotate_left(list("ABCDEF"), 8))`,
        solutionOutput: `['C', 'D', 'E', 'F', 'A', 'B']\n['C', 'D', 'E', 'F', 'A', 'B']`,
        explanation: 'k %= len(a) avoids wasted full rotations in O(n) time.',
      },
    ],
    answerVault: {
      quizAnswers: { 'Q3.1': 'B', 'Q3.5': 'B', 'Q3.4': 'B' },
      brainBlastAnswers: {
        'B3.1': {
          code: `def rotate_left(a, k):\n    k %= len(a)\n    return a[k:] + a[:k]`,
          output: `['C', 'D', 'E', 'F', 'A', 'B']`,
          explanation: 'k %= n avoids full cycle overhead.',
        },
      },
    },
  },

  {
    id: 4,
    numberLabel: 'CHAPTER 4',
    title: 'RECURSION & BACKTRACKING',
    subtitle: 'The Call Stack, Trusting Recursion, Choose-Explore-Undo',
    timeEstimate: '20 min read',
    comicHook: [
      {
        speaker: 'sid',
        text: 'Recursion makes my head spin! A function calling itself?!',
      },
      {
        speaker: 'prof_py',
        text: 'Think Russian dolls! Open a doll, find a smaller doll, repeat until the tiny solid one. That tiny doll is your BASE CASE.',
      },
    ],
    sections: [
      {
        heading: '4.1 Recursion & the Call Stack',
        theory:
          'Every recursive function requires: (1) Base Case (smallest problem answered directly), and (2) Recursive Case (shrink problem, call self, combine).',
        bulletPoints: [
          'Python holds pending function calls on the Call Stack in memory (LIFO order).',
          'Fast power: computing x^n in O(log n) by squaring x^(n//2).',
          'Recursion Recipe: (1) Answer smallest input. (2) Assume function works for smaller input. (3) Combine.',
        ],
        codeSnippet: {
          code: `def fact(n):
    if n <= 1: return 1
    return n * fact(n - 1)

def fast_power(x, n):
    if n == 0: return 1
    half = fast_power(x, n // 2)
    return half * half if n % 2 == 0 else half * half * x

print("fact(5) =", fact(5))
print("2^10 via fast power =", fast_power(2, 10))`,
          output: `fact(5) = 120\n2^10 via fast power = 1024`,
        },
      },
      {
        heading: '4.2 Backtracking: Choose, Explore, Undo',
        theory:
          'Backtracking builds candidate solutions step-by-step. If a candidate breaks a constraint, we PRUNE and undo the last step.',
        bulletPoints: [
          'Three beats of backtracking: CHOOSE an option, EXPLORE deeper, UNDO (pop) to restore state.',
          'Subsets of size n produce 2^n possibilities.',
          'CRITICAL FIX: Always append a COPY of path (e.g. res.append(path[:])), otherwise every entry in result points to the same mutable list!',
        ],
        codeSnippet: {
          code: `def subsets(items):
    res = []
    path = []
    def go(i):
        if i == len(items):
            res.append(path[:]) # MUST STORE COPY!
            return
        # Option 1: exclude items[i]
        go(i + 1)
        # Option 2: include items[i] (CHOOSE)
        path.append(items[i])
        go(i + 1)              # (EXPLORE)
        path.pop()             # (UNDO)
    go(0)
    return res

print("Subsets of [1, 2]:", subsets([1, 2]))`,
          output: `Subsets of [1, 2]: [[], [2], [1], [1, 2]]`,
        },
      },
    ],
    mythBusters: [
      {
        id: 'mb-4-1',
        myth: 'A recursive function stops by itself.',
        truth:
          'Without a base case, it calls until Python raises RecursionError (default recursion limit ~1000 frames).',
      },
      {
        id: 'mb-4-2',
        myth: 'Backtracking is just brute force with extra steps.',
        truth:
          'Brute force tests every single possibility. Backtracking PRUNES: the moment a constraint fails, it discards entire branches of millions of steps!',
      },
    ],
    quizzes: [
      {
        id: 'Q4.1',
        question: 'What is the base case of factorial fact(n)?',
        options: [
          { label: 'A', text: 'n * fact(n-1)' },
          { label: 'B', text: 'n <= 1 returns 1' },
          { label: 'C', text: 'n == 100' },
          { label: 'D', text: 'None' },
        ],
        correct: 'B',
        explanation: 'n <= 1 returns 1 without further recursion.',
      },
      {
        id: 'Q4.7',
        question: 'What are the three canonical steps of backtracking?',
        options: [
          { label: 'A', text: 'Read, write, run' },
          { label: 'B', text: 'Choose, explore, undo' },
          { label: 'C', text: 'Sort, search, stop' },
          { label: 'D', text: 'Push, pop, peek' },
        ],
        correct: 'B',
        explanation: 'Choose an option, explore recursively, undo the choice upon return.',
      },
    ],
    fixItQuestion: {
      id: 'Q4.8',
      question: 'Why does subsets code do res.append(path[:]) and NOT res.append(path)?',
      options: [
        { label: 'A', text: 'path[:] is faster' },
        { label: 'B', text: 'Without a copy, every stored answer is the same list that keeps mutating' },
        { label: 'C', text: 'Python forbids appending path directly' },
        { label: 'D', text: 'No reason' },
      ],
      correct: 'B',
      explanation: 'path is mutated in-place by append/pop. Storing references would leave all entries as empty lists.',
    },
    brainBlasts: [],
    answerVault: {
      quizAnswers: { 'Q4.1': 'B', 'Q4.7': 'B', 'Q4.8': 'B' },
      brainBlastAnswers: {},
    },
  },

  {
    id: 5,
    numberLabel: 'CHAPTER 5',
    title: 'SEARCHING',
    subtitle: 'Linear Search, Binary Search, and Search on Answer',
    timeEstimate: '18 min read',
    comicHook: [
      {
        speaker: 'sid',
        text: 'How do I find a name in a phone book with 1,000,000 entries?',
      },
      {
        speaker: 'prof_py',
        text: 'Open to the MIDDLE. Name comes later? Throw away the front half. Repeat! About 20 looks, not a million!',
      },
    ],
    sections: [
      {
        heading: '5.1 Linear Search vs Binary Search',
        theory:
          'Linear search scans O(n) items on any list. Binary search requires sorted data, eliminating half the candidates each check in O(log n).',
        bulletPoints: [
          'mid = (lo + hi) // 2 must use integer floor division.',
          'Loop condition: while lo <= hi handles single-element boundaries cleanly.',
          'log2(1,000,000) ≈ 20 checks maximum.',
        ],
        codeSnippet: {
          code: `def binary_search(a, target):
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if a[mid] == target: return mid
        elif a[mid] < target: lo = mid + 1
        else: hi = mid - 1
    return -1

arr = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91]
print("Index of 38:", binary_search(arr, 38))
print("Index of 40:", binary_search(arr, 40))`,
          output: `Index of 38: 6\nIndex of 40: -1`,
        },
      },
      {
        heading: '5.2 Binary Search Patterns: Search on Answer',
        theory:
          'Binary search is not just for finding array items. If a condition check is MONOTONIC (False...False True...True), you can binary search for the threshold value!',
        bulletPoints: [
          'Integer square root: find largest r such that r*r <= n.',
          'Capacity search (e.g. ship packages in D days): search for minimum capacity.',
        ],
        codeSnippet: {
          code: `def int_sqrt(n):
    lo, hi, ans = 0, n, 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if mid * mid <= n:
            ans = mid
            lo = mid + 1 # look for larger valid answer
        else:
            hi = mid - 1
    return ans

print("int_sqrt(50) =", int_sqrt(50))
print("int_sqrt(64) =", int_sqrt(64))`,
          output: `int_sqrt(50) = 7\nint_sqrt(64) = 8`,
        },
      },
    ],
    mythBusters: [
      {
        id: 'mb-5-1',
        myth: 'Binary search works on unsorted lists.',
        truth:
          'Unsorted data invalidates the "discard half" logic and will miss items. Sort first or use linear search.',
      },
      {
        id: 'mb-5-2',
        myth: 'mid = (lo + hi) / 2 is fine.',
        truth:
          '/ produces float indices (e.g. 2.5), causing TypeError. Always use // in Python.',
      },
    ],
    quizzes: [
      {
        id: 'Q5.1',
        question: 'Binary search on 1,024 sorted items needs at most how many checks?',
        options: [
          { label: 'A', text: '10 steps' },
          { label: 'B', text: '32 steps' },
          { label: 'C', text: '512 steps' },
          { label: 'D', text: '1,024 steps' },
        ],
        correct: 'A',
        explanation: '2^10 = 1024, so halving takes at most 10 steps.',
      },
    ],
    brainBlasts: [],
    answerVault: {
      quizAnswers: { 'Q5.1': 'A' },
      brainBlastAnswers: {},
    },
  },

  {
    id: 6,
    numberLabel: 'CHAPTER 6',
    title: 'SORTING',
    subtitle: 'Bubble, Selection, Insertion, Merge Sort, Quicksort & Timsort',
    timeEstimate: '20 min read',
    comicHook: [
      {
        speaker: 'sid',
        text: "Python already has sorted(). Why learn how sorting works under the hood?",
      },
      {
        speaker: 'prof_py',
        text: 'Because sorting ideas — compare, swap, divide, merge, partition — power half of all algorithms in computer science!',
      },
    ],
    sections: [
      {
        heading: '6.1 The Simple Sorts: Bubble, Selection, Insertion',
        theory:
          'Three foundational O(n^2) sorts with distinct mechanics:',
        bulletPoints: [
          'Bubble Sort: Swaps adjacent out-of-order items. The largest bubbles up to the end each pass.',
          'Selection Sort: Scans for the smallest remaining element and places it into the next slot.',
          'Insertion Sort: Builds a sorted prefix. Ideal for small or nearly sorted lists (O(n) best case).',
        ],
        codeSnippet: {
          code: `def insertion_sort(a):
    arr = a[:]
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

print("Sorted:", insertion_sort([5, 1, 4, 2, 8]))`,
          output: `Sorted: [1, 2, 4, 5, 8]`,
        },
      },
      {
        heading: '6.2 Divide and Conquer: Merge Sort & Quicksort',
        theory:
          'Divide the array into smaller pieces to achieve O(n log n) performance:',
        bulletPoints: [
          'Merge Sort: Halves array recursively, then merges sorted halves. Guaranteed O(n log n), stable, uses O(n) auxiliary memory.',
          'Quicksort: Selects a pivot and partitions smaller items left, larger items right. Average O(n log n), in-place.',
          'Python sorted() uses Timsort: an adaptive hybrid of Merge Sort & Insertion Sort.',
        ],
        codeSnippet: {
          code: `def merge_sort(a):
    if len(a) <= 1: return a
    mid = len(a) // 2
    L = merge_sort(a[:mid])
    R = merge_sort(a[mid:])
    out = []
    i = j = 0
    while i < len(L) and j < len(R):
        if L[i] <= R[j]: out.append(L[i]); i += 1
        else: out.append(R[j]); j += 1
    return out + L[i:] + R[j:]

print(merge_sort([38, 27, 43, 3, 9, 82, 10]))`,
          output: `[3, 9, 10, 27, 38, 43, 82]`,
        },
      },
    ],
    mythBusters: [
      {
        id: 'mb-6-1',
        myth: 'x = lst.sort() gives me the sorted list.',
        truth:
          'lst.sort() sorts the list in place and returns None! Use x = sorted(lst) if you want a new sorted copy.',
      },
    ],
    quizzes: [
      {
        id: 'Q6.5',
        question: 'What is the guaranteed worst-case time complexity of Merge Sort?',
        options: [
          { label: 'A', text: 'O(n)' },
          { label: 'B', text: 'O(n log n)' },
          { label: 'C', text: 'O(n^2)' },
          { label: 'D', text: 'O(log n)' },
        ],
        correct: 'B',
        explanation: 'Merge sort splits into log n levels with O(n) merge work per level.',
      },
    ],
    brainBlasts: [],
    answerVault: {
      quizAnswers: { 'Q6.5': 'B' },
      brainBlastAnswers: {},
    },
  },

  {
    id: 7,
    numberLabel: 'CHAPTER 7',
    title: 'LINKED LISTS',
    subtitle: 'Nodes, Pointer Rewiring, Reversal, Runner Technique, Cycle Detection',
    timeEstimate: '20 min read',
    comicHook: [
      {
        speaker: 'sid',
        text: 'If Python lists already exist, why learn linked lists?',
      },
      {
        speaker: 'prof_py',
        text: 'To master POINTERS — the soul of trees and graphs! Plus, inserting without shifting elements is a superpower.',
      },
    ],
    sections: [
      {
        heading: '7.1 Nodes & Basic Operations',
        theory:
          'A linked list is a chain of Node objects, each storing a value and a .next pointer. Reaching the k-th item requires walking k pointers (no random access).',
        bulletPoints: [
          'Inserting after a known node is O(1) — just rewire 2 pointers.',
          'Deleting a known node is O(1).',
        ],
        codeSnippet: {
          code: `class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

# Chain 10 -> 20 -> 30
head = Node(10, Node(20, Node(30)))

# Insert 15 between 10 and 20
new_node = Node(15, head.next)
head.next = new_node

cur = head
vals = []
while cur:
    vals.append(cur.val)
    cur = cur.next
print("Linked list:", vals)`,
          output: `Linked list: [10, 15, 20, 30]`,
        },
      },
      {
        heading: '7.2 Classic Tricks: Reverse, Middle, and Cycle Detection',
        theory:
          'Three essential interview patterns:',
        bulletPoints: [
          'In-place Reverse: Use 3 pointers (prev, cur, nxt) to flip arrows in O(n) time and O(1) space.',
          'Middle Finding: Slow moves 1 step, Fast moves 2 steps. When Fast reaches end, Slow is at middle.',
          'Floyd Cycle Detection: If Fast ever laps Slow, a cycle exists.',
        ],
        codeSnippet: {
          code: `def reverse_list(head):
    prev = None
    cur = head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev`,
          output: `Reverses any list in O(n) time and O(1) memory`,
        },
      },
    ],
    mythBusters: [
      {
        id: 'mb-7-1',
        myth: 'A Python list is a linked list.',
        truth:
          'No! Python list is a dynamic array with O(1) index access. Linked lists are built manually with node references.',
      },
    ],
    quizzes: [
      {
        id: 'Q7.6',
        question: "Floyd's cycle detection algorithm uses:",
        options: [
          { label: 'A', text: 'A hash set only' },
          { label: 'B', text: 'Two pointers at different speeds' },
          { label: 'C', text: 'Sorting' },
          { label: 'D', text: 'Recursion' },
        ],
        correct: 'B',
        explanation: 'A fast pointer (2 steps) and a slow pointer (1 step) will meet if a loop exists.',
      },
    ],
    brainBlasts: [],
    answerVault: {
      quizAnswers: { 'Q7.6': 'B' },
      brainBlastAnswers: {},
    },
  },

  {
    id: 8,
    numberLabel: 'CHAPTER 8',
    title: 'STACKS',
    subtitle: 'LIFO Plate Piles, Bracket Matching, Monotonic Next Greater Element',
    timeEstimate: '18 min read',
    comicHook: [
      {
        speaker: 'sid',
        text: 'Undo, browser back button, brackets in code... what do they have in common?',
      },
      {
        speaker: 'prof_py',
        text: 'A STACK! Last In, First Out (LIFO). Push on top, pop from top. Nothing else!',
      },
    ],
    sections: [
      {
        heading: '8.1 The Stack & Where It Hides',
        theory:
          'Use a standard Python list: append() to push and pop() to remove top in O(1).',
        bulletPoints: [
          'Never pop(0) on a stack: it costs O(n)! Always push and pop from the end.',
          'Valid parentheses problem is solved by pushing opening brackets and matching closing brackets.',
        ],
        codeSnippet: {
          code: `def is_balanced(s):
    pairs = {")": "(", "]": "[", "}": "{"}
    st = []
    for ch in s:
        if ch in "([{":
            st.append(ch)
        elif ch in pairs:
            if not st or st.pop() != pairs[ch]:
                return False
    return not st

print("Valid {[()]}:", is_balanced("{[()]}"))
print("Invalid ([)]: ", is_balanced("([)]"))`,
          output: `Valid {[()]}: True\nInvalid ([)]: False`,
        },
      },
      {
        heading: '8.2 Monotonic Stack: Next Greater Element',
        theory:
          'Keep a stack of elements that are still waiting for a larger neighbor.',
        bulletPoints: [
          'Linear time O(n) even with nested while loops because each element is pushed once and popped at most once.',
          'Powers temperature forecasting, stock span, and histogram questions.',
        ],
        codeSnippet: {
          code: `def daily_temperatures(t):
    ans = [0] * len(t)
    st = [] # holds indices waiting for a warmer day
    for i, temp in enumerate(t):
        while st and t[st[-1]] < temp:
            prev_idx = st.pop()
            ans[prev_idx] = i - prev_idx
        st.append(i)
    return ans

print("Days until warmer:", daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73]))`,
          output: `Days until warmer: [1, 1, 4, 2, 1, 1, 0, 0]`,
        },
      },
    ],
    mythBusters: [
      {
        id: 'mb-8-1',
        myth: 'pop() on an empty list returns None.',
        truth:
          'It raises IndexError! Always check if stack: before popping.',
      },
    ],
    quizzes: [
      {
        id: 'Q8.1',
        question: 'LIFO stands for:',
        options: [
          { label: 'A', text: 'Last In, First Out' },
          { label: 'B', text: 'Last In, Final Out' },
          { label: 'C', text: 'Late In, First Out' },
          { label: 'D', text: 'List In, First Out' },
        ],
        correct: 'A',
        explanation: 'Last item added is the first one removed.',
      },
    ],
    brainBlasts: [],
    answerVault: {
      quizAnswers: { 'Q8.1': 'A' },
      brainBlastAnswers: {},
    },
  },

  {
    id: 9,
    numberLabel: 'CHAPTER 9',
    title: 'QUEUES & DEQUES',
    subtitle: 'FIFO Canteen Lines, collections.deque, Level-by-Level Exploration',
    timeEstimate: '15 min read',
    comicHook: [
      {
        speaker: 'sid',
        text: 'So a queue is just the opposite of a stack?',
      },
      {
        speaker: 'prof_py',
        text: 'Exactly! First In, First Out (FIFO). Join at the back, leave from the front. Fair, like a canteen queue!',
      },
    ],
    sections: [
      {
        heading: '9.1 Queue, Deque & Simulations',
        theory:
          'In Python, never use a list as a queue because pop(0) is O(n). Always use collections.deque.',
        bulletPoints: [
          'deque provides O(1) append, appendleft, pop, and popleft.',
          'Forms the fundamental engine for Breadth-First Search (BFS).',
        ],
        codeSnippet: {
          code: `from collections import deque

q = deque()
q.append("Alice")
q.append("Bob")
q.append("Charlie")

print("Served first:", q.popleft())
print("Queue remaining:", list(q))`,
          output: `Served first: Alice\nQueue remaining: ['Bob', 'Charlie']`,
        },
      },
    ],
    mythBusters: [
      {
        id: 'mb-9-1',
        myth: 'A Python list is a perfectly good queue using pop(0).',
        truth:
          'pop(0) shifts every single remaining item in memory: O(n). With 100,000 items that is 10 billion operations. Use deque.popleft()!',
      },
    ],
    quizzes: [
      {
        id: 'Q9.1',
        question: 'FIFO stands for:',
        options: [
          { label: 'A', text: 'First In, First Out' },
          { label: 'B', text: 'Fast In, Fast Out' },
          { label: 'C', text: 'First In, Final Out' },
          { label: 'D', text: 'Last In, First Out' },
        ],
        correct: 'A',
        explanation: 'First In, First Out.',
      },
    ],
    brainBlasts: [],
    answerVault: {
      quizAnswers: { 'Q9.1': 'A' },
      brainBlastAnswers: {},
    },
  },

  {
    id: 10,
    numberLabel: 'CHAPTER 10',
    title: 'HASHING',
    subtitle: 'Hash Tables, Buckets, Collisions, Two-Sum, Anagrams, Subarray Sums',
    timeEstimate: '20 min read',
    comicHook: [
      {
        speaker: 'sid',
        text: 'How can a dictionary find any key instantly without scanning everything?',
      },
      {
        speaker: 'prof_py',
        text: 'A hash function turns the key into an integer bucket number. Go straight to that bucket — like a library shelf label!',
      },
    ],
    sections: [
      {
        heading: '10.1 How Hash Tables Work',
        theory:
          'index = hash(key) % num_buckets. When multiple keys share a bucket (collision), chaining links them together.',
        bulletPoints: [
          'Keys must be immutable and hashable: int, str, tuple. Lists and dicts cannot be keys.',
          'Average lookup/insert: O(1). Worst case: O(n) if all keys collide.',
        ],
        codeSnippet: {
          code: `from collections import defaultdict, Counter

freq = Counter("mississippi")
print("Top 2 characters:", freq.most_common(2))

anagram_groups = defaultdict(list)
for word in ["eat", "tea", "tan", "ate", "nat", "bat"]:
    key = "".join(sorted(word))
    anagram_groups[key].append(word)

print("Anagram groups:", list(anagram_groups.values()))`,
          output: `Top 2 characters: [('i', 4), ('s', 4)]\nAnagram groups: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]`,
        },
      },
      {
        heading: '10.2 Hashing Patterns: Two-Sum & Prefix Sums',
        theory:
          'Store what you have seen in the past into a hash map to answer queries in O(1).',
        bulletPoints: [
          'Two Sum: For current number x, check if (target - x) is in the dictionary.',
          'Subarray Sum Equals K: Count occurrences of (prefix_sum - k).',
        ],
        codeSnippet: {
          code: `def two_sum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        diff = target - x
        if diff in seen:
            return [seen[diff], i]
        seen[x] = i
    return []

print("Two sum indexes for 9:", two_sum([2, 7, 11, 15], 9))`,
          output: `Two sum indexes for 9: [0, 1]`,
        },
      },
    ],
    mythBusters: [
      {
        id: 'mb-10-1',
        myth: 'Two-Sum requires the array to be sorted.',
        truth:
          'A hash map solves Two-Sum on completely unsorted data in O(n) time while preserving original index positions.',
      },
    ],
    quizzes: [
      {
        id: 'Q10.2',
        question: 'Average cost of dict lookup d[key] is:',
        options: [
          { label: 'A', text: 'O(n)' },
          { label: 'B', text: 'O(log n)' },
          { label: 'C', text: 'O(1)' },
          { label: 'D', text: 'O(n log n)' },
        ],
        correct: 'C',
        explanation: 'Hash table lookup is O(1) on average.',
      },
    ],
    brainBlasts: [],
    answerVault: {
      quizAnswers: { 'Q10.2': 'C' },
      brainBlastAnswers: {},
    },
  },

  {
    id: 11,
    numberLabel: 'CHAPTER 11',
    title: 'TREES & BST',
    subtitle: 'Hierarchies, Traversals (In/Pre/Post/Level), Binary Search Trees',
    timeEstimate: '22 min read',
    comicHook: [
      {
        speaker: 'sid',
        text: 'Trees look like upside-down family charts!',
      },
      {
        speaker: 'prof_py',
        text: 'Exactly: one ROOT on top, branches below, LEAVES at the ends. Folder structures, HTML DOM, and decision trees are all trees.',
      },
    ],
    sections: [
      {
        heading: '11.1 Binary Trees & Traversals',
        theory:
          'Each node has at most two children: left and right.',
        bulletPoints: [
          'Inorder (Left, Node, Right): Traverses BST in ascending sorted order.',
          'Preorder (Node, Left, Right): Visits root first; great for cloning or serializing.',
          'Postorder (Left, Right, Node): Visits children before parent; great for bottom-up computation (height, delete).',
          'Level-order: Breadth-first using a queue.',
        ],
        codeSnippet: {
          code: `class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

root = TreeNode(8, TreeNode(3, TreeNode(1), TreeNode(6)), TreeNode(10, None, TreeNode(14)))

def inorder(node):
    return inorder(node.left) + [node.val] + inorder(node.right) if node else []

def max_depth(node):
    return 1 + max(max_depth(node.left), max_depth(node.right)) if node else 0

print("Inorder:", inorder(root))
print("Max Depth:", max_depth(root))`,
          output: `Inorder: [1, 3, 6, 8, 10, 14]\nMax Depth: 3`,
        },
      },
      {
        heading: '11.2 Binary Search Trees (BST)',
        theory:
          'Rule: left subtree < node < right subtree for EVERY node in the tree.',
        bulletPoints: [
          'Search, insert, and delete take O(h) where h is height.',
          'Balanced tree height is O(log n); degenerate stick is O(n).',
        ],
        codeSnippet: {
          code: `def search_bst(root, val):
    cur = root
    while cur:
        if cur.val == val: return True
        cur = cur.left if val < cur.val else cur.right
    return False

print("Found 6 in BST:", search_bst(root, 6))
print("Found 7 in BST:", search_bst(root, 7))`,
          output: `Found 6 in BST: True\nFound 7 in BST: False`,
        },
      },
    ],
    mythBusters: [
      {
        id: 'mb-11-1',
        myth: 'Inorder traversal always gives sorted output on any tree.',
        truth:
          'Only on a Binary SEARCH Tree (BST). General binary trees have no ordering guarantee.',
      },
    ],
    quizzes: [
      {
        id: 'Q11.6',
        question: 'Inorder traversal of a BST yields values in:',
        options: [
          { label: 'A', text: 'Random order' },
          { label: 'B', text: 'Sorted ascending order' },
          { label: 'C', text: 'Descending order' },
          { label: 'D', text: 'Level order' },
        ],
        correct: 'B',
        explanation: 'Left, Node, Right on a BST always produces strictly ascending order.',
      },
    ],
    brainBlasts: [],
    answerVault: {
      quizAnswers: { 'Q11.6': 'B' },
      brainBlastAnswers: {},
    },
  },

  {
    id: 12,
    numberLabel: 'CHAPTER 12',
    title: 'HEAPS & PRIORITY QUEUES',
    subtitle: 'Min-heaps, heapq, Array Representation, Emergency Room Triaging',
    timeEstimate: '18 min read',
    comicHook: [
      {
        speaker: 'sid',
        text: 'Emergency rooms treat the sickest patient first, not the earliest. How do computers do that?',
      },
      {
        speaker: 'prof_py',
        text: 'With a HEAP — a priority queue! The most urgent item is always on top, and restoring heap order takes only O(log n).',
      },
    ],
    sections: [
      {
        heading: '12.1 Heap Structure & Python heapq',
        theory:
          'A min-heap is a complete binary tree where parent <= children. Stored directly in a flat array:',
        bulletPoints: [
          'Parent index: (i - 1) // 2.',
          'Left child: 2*i + 1, Right child: 2*i + 2.',
          'Python heapq implements MIN-heap. For max-heap, push negative values!',
          'heapq.heapify(list) converts any list into a heap in O(n) linear time.',
        ],
        codeSnippet: {
          code: `import heapq

# Python min-heap
h = [5, 3, 8, 1, 9, 2]
heapq.heapify(h)
print("Smallest element h[0]:", h[0])
print("Popping smallest:", heapq.heappop(h))

# Max-heap trick via negation
max_h = []
for x in [4, 10, 7]:
    heapq.heappush(max_h, -x)
print("Max popped:", -heapq.heappop(max_h))`,
          output: `Smallest element h[0]: 1\nPopping smallest: 1\nMax popped: 10`,
        },
      },
    ],
    mythBusters: [
      {
        id: 'mb-12-1',
        myth: 'A heap is a fully sorted array.',
        truth:
          'A heap guarantees only parent <= children. h[0] is always the minimum, but h[1] is NOT necessarily the second smallest!',
      },
    ],
    quizzes: [
      {
        id: 'Q12.1',
        question: 'Cost of heappush and heappop operations:',
        options: [
          { label: 'A', text: 'O(1)' },
          { label: 'B', text: 'O(log n)' },
          { label: 'C', text: 'O(n)' },
          { label: 'D', text: 'O(n log n)' },
        ],
        correct: 'B',
        explanation: 'Bubbling up or down along a single root-to-leaf path takes O(log n) steps.',
      },
    ],
    brainBlasts: [],
    answerVault: {
      quizAnswers: { 'Q12.1': 'B' },
      brainBlastAnswers: {},
    },
  },

  {
    id: 13,
    numberLabel: 'CHAPTER 13',
    title: 'GRAPHS',
    subtitle: 'Adjacency Lists, BFS Shortest Paths, DFS Traversal, Cycle Detection',
    timeEstimate: '22 min read',
    comicHook: [
      {
        speaker: 'sid',
        text: 'A graph? Like a bar chart or line plot?',
      },
      {
        speaker: 'prof_py',
        text: 'Nope! A graph is DOTS (vertices) joined by LINES (edges). Social media friends, road networks, the internet!',
      },
    ],
    sections: [
      {
        heading: '13.1 Representing Graphs',
        theory:
          'Represent networks using Adjacency Lists (dict mapping vertex -> list of neighbors) or Adjacency Matrix.',
        bulletPoints: [
          'Adjacency List uses O(V + E) space — best for sparse graphs.',
          'Undirected edges (u, v) must be added in BOTH directions: adj[u].append(v) and adj[v].append(u).',
        ],
        codeSnippet: {
          code: `edges = [("A","B"), ("A","C"), ("B","D"), ("C","D"), ("C","E"), ("E","F"), ("D","F")]
adj = {}
for u, v in edges:
    adj.setdefault(u, []).append(v)
    adj.setdefault(v, []).append(u)
print("Neighbors of C:", adj["C"])`,
          output: `Neighbors of C: ['A', 'D', 'E']`,
        },
      },
      {
        heading: '13.2 BFS vs DFS',
        theory:
          'BFS finds the shortest path in unweighted graphs using a queue. DFS explores deep paths before backtracking using recursion or stack.',
        bulletPoints: [
          'CRITICAL: Both BFS and DFS require a "visited" set to prevent infinite loops on cycles!',
          'Mark nodes as visited when ENQUEUEING in BFS, not upon dequeue, to avoid duplicate exploration.',
        ],
        codeSnippet: {
          code: `from collections import deque

def bfs_shortest_path(adj, start, target):
    dist = {start: 0}
    q = deque([start])
    while q:
        u = q.popleft()
        if u == target: return dist[u]
        for v in adj.get(u, []):
            if v not in dist:
                dist[v] = dist[u] + 1
                q.append(v)
    return -1

print("Shortest hops from A to F:", bfs_shortest_path(adj, "A", "F"))`,
          output: `Shortest hops from A to F: 3`,
        },
      },
    ],
    mythBusters: [
      {
        id: 'mb-13-1',
        myth: 'DFS finds the shortest path.',
        truth:
          'DFS may wander deep down an arbitrary detour first. For the shortest path in unweighted graphs, always use BFS.',
      },
    ],
    quizzes: [
      {
        id: 'Q13.5',
        question: 'Breadth-First Search (BFS) uses which data structure?',
        options: [
          { label: 'A', text: 'Stack' },
          { label: 'B', text: 'Queue' },
          { label: 'C', text: 'Heap' },
          { label: 'D', text: 'Tree' },
        ],
        correct: 'B',
        explanation: 'BFS explores neighbors level-by-level using a FIFO queue.',
      },
    ],
    brainBlasts: [],
    answerVault: {
      quizAnswers: { 'Q13.5': 'B' },
      brainBlastAnswers: {},
    },
  },

  {
    id: 14,
    numberLabel: 'CHAPTER 14',
    title: 'DYNAMIC PROGRAMMING',
    subtitle: 'Overlapping Subproblems, Memoization (Top-Down), Tabulation (Bottom-Up)',
    timeEstimate: '25 min read',
    comicHook: [
      {
        speaker: 'sid',
        text: 'DP is the scariest word in coding interviews!',
      },
      {
        speaker: 'prof_py',
        text: 'It is only recursion with a NOTEBOOK! If you keep solving the exact same small problem again and again, write the answer down once and reuse it!',
      },
    ],
    sections: [
      {
        heading: '14.1 Memoization & Tabulation',
        theory:
          'DP applies when problems have: (1) Overlapping Subproblems, and (2) Optimal Substructure.',
        bulletPoints: [
          'Top-down Memoization: Recursion + cache (or @lru_cache).',
          'Bottom-up Tabulation: Fill an iterative array from base case up to target.',
          'Fibonacci naive is O(2^n). With DP it drops to O(n) time!',
        ],
        codeSnippet: {
          code: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib_memo(n):
    if n < 2: return n
    return fib_memo(n - 1) + fib_memo(n - 2)

def climb_stairs(n):
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b

print("fib(50) memoized =", fib_memo(50))
print("Climb 5 stairs ways =", climb_stairs(5))`,
          output: `fib(50) memoized = 12586269025\nClimb 5 stairs ways = 8`,
        },
      },
      {
        heading: '14.2 Classic DP: Coin Change & House Robber',
        theory:
          'Formulate the state equation in plain English first!',
        bulletPoints: [
          'Coin Change: dp[a] = minimum coins to make amount a: 1 + min(dp[a - coin]).',
          'House Robber: dp[i] = max(skip house i, rob house i + dp[i-2]).',
        ],
        codeSnippet: {
          code: `def min_coins(coins, amount):
    dp = [0] + [float("inf")] * amount
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                dp[a] = min(dp[a], dp[a - c] + 1)
    return dp[amount] if dp[amount] != float("inf") else -1

print("Fewest coins for 63 cents [1, 5, 10, 25]:", min_coins([1, 5, 10, 25], 63))`,
          output: `Fewest coins for 63 cents [1, 5, 10, 25]: 6`,
        },
      },
    ],
    mythBusters: [
      {
        id: 'mb-14-1',
        myth: 'Greedy (always pick the largest coin) is always optimal for coin change.',
        truth:
          'False! For coins [1, 3, 4] and target 6, greedy picks 4 + 1 + 1 (3 coins), but DP finds 3 + 3 (2 coins).',
      },
    ],
    quizzes: [
      {
        id: 'Q14.1',
        question: 'What are the two essential ingredients of Dynamic Programming?',
        options: [
          { label: 'A', text: 'Sorting and searching' },
          { label: 'B', text: 'Overlapping subproblems and optimal substructure' },
          { label: 'C', text: 'Stack and queue' },
          { label: 'D', text: 'Hashing and heaps' },
        ],
        correct: 'B',
        explanation: 'Overlapping subproblems allow caching; optimal substructure allows composing global optimum from sub-optima.',
      },
    ],
    brainBlasts: [],
    answerVault: {
      quizAnswers: { 'Q14.1': 'B' },
      brainBlastAnswers: {},
    },
  },
];

export const pythonDsa80Problems: PythonDsaClassicalProblem[] = [
  // World A: Arrays & Strings (1 - 10)
  {
    id: 1,
    world: 'A',
    worldName: 'Arrays & Strings',
    title: 'Two Sum',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'Given nums = [2, 7, 11, 15] and target = 9, return the indexes of the two numbers that add to target.',
    example: '[0, 1]',
    hint: 'What do you need to remember about numbers you have already seen?',
    idea: 'Hashing: store value -> index; for each x look up target - x in O(n).',
    solutionCode: `def two_sum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        if target - x in seen:
            return [seen[target - x], i]
        seen[x] = i
    return []`,
    output: '[0, 1]',
  },
  {
    id: 2,
    world: 'A',
    worldName: 'Arrays & Strings',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'Prices per day: [7, 1, 5, 3, 6, 4]. Buy once, sell later. Find maximum profit.',
    example: '5 (buy at 1, sell at 6)',
    hint: 'At each day, what is the cheapest price seen so far?',
    idea: 'Track minimum price so far and maximum (price - min). One pass, O(n).',
    solutionCode: `def max_profit(p):
    low, best = float("inf"), 0
    for x in p:
        low = min(low, x)
        best = max(best, x - low)
    return best`,
    output: '5',
  },
  {
    id: 3,
    world: 'A',
    worldName: 'Arrays & Strings',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'Return True if any value appears at least twice in [1, 2, 3, 1].',
    example: 'True',
    hint: 'Sets automatically discard duplicates.',
    idea: 'If len(set(a)) != len(a), there is a duplicate. O(n) time and O(n) space.',
    solutionCode: `def has_dup(a):
    return len(set(a)) != len(a)`,
    output: 'True',
  },
  {
    id: 4,
    world: 'A',
    worldName: 'Arrays & Strings',
    title: 'Move Zeroes',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'Move all 0s to the END of [0, 1, 0, 3, 12] keeping relative order of non-zeros, in place.',
    example: '[1, 3, 12, 0, 0]',
    hint: 'Keep a write pointer for the next non-zero position.',
    idea: 'Two pointers: copy non-zeros forward, then fill remaining suffix with zeros. O(n) time, O(1) space.',
    solutionCode: `def move_zeroes(a):
    w = 0
    for x in a:
        if x != 0:
            a[w] = x
            w += 1
    for i in range(w, len(a)):
        a[i] = 0
    return a`,
    output: '[1, 3, 12, 0, 0]',
  },
  {
    id: 5,
    world: 'A',
    worldName: 'Arrays & Strings',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'Ignoring case and non-alphanumeric characters, is "A man, a plan, a canal: Panama" a palindrome?',
    example: 'True',
    hint: 'Two pointers from both ends, skipping non-alphanumeric characters.',
    idea: 'Two pointers with isalnum(). O(n) time, O(1) extra space.',
    solutionCode: `def is_pal(s):
    i, j = 0, len(s) - 1
    while i < j:
        while i < j and not s[i].isalnum(): i += 1
        while i < j and not s[j].isalnum(): j -= 1
        if s[i].lower() != s[j].lower(): return False
        i += 1; j -= 1
    return True`,
    output: 'True',
  },
  {
    id: 6,
    world: 'A',
    worldName: 'Arrays & Strings',
    title: 'Reverse Words in a String',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'Reverse the order of words in " the sky is blue ". Multiple spaces must be collapsed to single space.',
    example: '"blue is sky the"',
    hint: 'split() with no argument handles consecutive whitespace.',
    idea: 'split, reverse, join in O(n) time.',
    solutionCode: `def rev_words(s):
    return " ".join(s.split()[::-1])`,
    output: "'blue is sky the'",
  },
  {
    id: 7,
    world: 'A',
    worldName: 'Arrays & Strings',
    title: 'Maximum Subarray (Kadane)',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Find contiguous subarray with largest sum in [-2, 1, -3, 4, -1, 2, 1, -5, 4].',
    example: '6 (from [4, -1, 2, 1])',
    hint: 'At each element: extend previous subarray or start fresh?',
    idea: "Kadane's algorithm: cur = max(x, cur + x); best = max(best, cur). Negative running sum is dead weight. O(n).",
    solutionCode: `def kadane(a):
    cur = best = a[0]
    for x in a[1:]:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best`,
    output: '6',
  },
  {
    id: 8,
    world: 'A',
    worldName: 'Arrays & Strings',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'For [1, 2, 3, 4] return an array where each cell is the product of all other elements, WITHOUT division.',
    example: '[24, 12, 8, 6]',
    hint: 'Product = (everything to left) x (everything to right).',
    idea: 'Prefix products from the left, then multiply by suffix products from the right. O(n) time, O(1) extra space.',
    solutionCode: `def product_except_self(a):
    n = len(a)
    out = [1] * n
    left = 1
    for i in range(n):
        out[i] = left
        left *= a[i]
    right = 1
    for i in range(n - 1, -1, -1):
        out[i] *= right
        right *= a[i]
    return out`,
    output: '[24, 12, 8, 6]',
  },
  {
    id: 9,
    world: 'A',
    worldName: 'Arrays & Strings',
    title: 'Rotate Array Right by k',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Rotate [1, 2, 3, 4, 5, 6, 7] right by k = 3 IN PLACE with O(1) extra space.',
    example: '[5, 6, 7, 1, 2, 3, 4]',
    hint: 'Reversing 3 distinct sections of an array rotates it in-place.',
    idea: 'Reverse entire array, reverse first k, reverse remaining n-k. O(n) time, O(1) space.',
    solutionCode: `def rotate(a, k):
    n = len(a); k %= n
    def rev(i, j):
        while i < j:
            a[i], a[j] = a[j], a[i]
            i += 1; j -= 1
    rev(0, n - 1)
    rev(0, k - 1)
    rev(k, n - 1)
    return a`,
    output: '[5, 6, 7, 1, 2, 3, 4]',
  },
  {
    id: 10,
    world: 'A',
    worldName: 'Arrays & Strings',
    title: 'Longest Common Prefix',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'Find the longest common prefix of ["flower", "flow", "flight"].',
    example: '"fl"',
    hint: 'Use the first word as baseline and shrink prefix until all words match.',
    idea: 'Horizontal/vertical prefix scanning in O(total characters).',
    solutionCode: `def lcp(words):
    if not words: return ""
    pre = words[0]
    for w in words[1:]:
        while not w.startswith(pre):
            pre = pre[:-1]
    return pre`,
    output: "'fl'",
  },

  // World B: Hashing, Two Pointers & Windows (11 - 20)
  {
    id: 11,
    world: 'B',
    worldName: 'Hashing, Two Pointers & Windows',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'Are "listen" and "silent" anagrams? (Same letters, same frequencies).',
    example: 'True',
    hint: 'Compare character frequency counts.',
    idea: 'Counter(a) == Counter(b) in O(n) time.',
    solutionCode: `from collections import Counter
def is_anagram(a, b):
    return Counter(a) == Counter(b)`,
    output: 'True',
  },
  {
    id: 12,
    world: 'B',
    worldName: 'Hashing, Two Pointers & Windows',
    title: 'Isomorphic Strings',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Can letters of "egg" be replaced to make "add"? What about "foo" and "bar"?',
    example: 'True for ("egg", "add"), False for ("foo", "bar")',
    hint: 'Mapping must be strictly bijection (one-to-one in BOTH directions).',
    idea: 'Two dictionaries: s->t and t->s; any mapping collision returns False. O(n).',
    solutionCode: `def is_isomorphic(s, t):
    m1, m2 = {}, {}
    for a, b in zip(s, t):
        if m1.setdefault(a, b) != b or m2.setdefault(b, a) != a:
            return False
    return True`,
    output: 'True False',
  },
  {
    id: 13,
    world: 'B',
    worldName: 'Hashing, Two Pointers & Windows',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Length of the longest substring of "abcabcbb" with all distinct characters.',
    example: '3 ("abc")',
    hint: 'Sliding window: when a repeat occurs, jump left boundary to last seen position + 1.',
    idea: 'Store last seen index of each char. O(n) time, O(min(m, n)) space.',
    solutionCode: `def longest_unique(s):
    last, left, best = {}, 0, 0
    for i, ch in enumerate(s):
        if ch in last and last[ch] >= left:
            left = last[ch] + 1
        last[ch] = i
        best = max(best, i - left + 1)
    return best`,
    output: '3',
  },
  {
    id: 14,
    world: 'B',
    worldName: 'Hashing, Two Pointers & Windows',
    title: 'Subarray Sum Equals K',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Count contiguous subarrays of [1, 1, 1] whose sum equals k = 2.',
    example: '2',
    hint: 'Prefix sums: sum(i..j) = prefix[j] - prefix[i-1].',
    idea: 'Map storing counts of prefix sums. At current prefix, add count[prefix - k]. O(n).',
    solutionCode: `def count_k(a, k):
    cnt = {0: 1} # empty prefix sum
    pre, ans = 0, 0
    for x in a:
        pre += x
        ans += cnt.get(pre - k, 0)
        cnt[pre] = cnt.get(pre, 0) + 1
    return ans`,
    output: '2',
  },
  {
    id: 15,
    world: 'B',
    worldName: 'Hashing, Two Pointers & Windows',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Heights [1, 8, 6, 2, 5, 4, 8, 3, 7]. Pick 2 lines forming a container with x-axis that holds maximum water.',
    example: '49',
    hint: 'Start with widest boundary. Which line restricts container capacity?',
    idea: 'Two pointers at ends: move the SHORTER pointer inward. O(n) time, O(1) space.',
    solutionCode: `def max_water(h):
    l, r, best = 0, len(h) - 1, 0
    while l < r:
        best = max(best, (r - l) * min(h[l], h[r]))
        if h[l] < h[r]: l += 1
        else: r -= 1
    return best`,
    output: '49',
  },
  {
    id: 16,
    world: 'B',
    worldName: 'Hashing, Two Pointers & Windows',
    title: '3Sum',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'Find all unique triplets in [-1, 0, 1, 2, -1, -4] that sum to 0.',
    example: '[[-1, -1, 2], [-1, 0, 1]]',
    hint: 'Sort array, fix first number, then solve Two-Sum with two pointers.',
    idea: 'Sort in O(n log n). For each i, run two pointers l and r. Skip duplicates. O(n^2).',
    solutionCode: `def three_sum(a):
    a.sort()
    res = []
    for i in range(len(a) - 2):
        if i and a[i] == a[i-1]: continue
        l, r = i + 1, len(a) - 1
        while l < r:
            s = a[i] + a[l] + a[r]
            if s < 0: l += 1
            elif s > 0: r -= 1
            else:
                res.append([a[i], a[l], a[r]])
                l += 1
                while l < r and a[l] == a[l-1]: l += 1
    return res`,
    output: '[[-1, -1, 2], [-1, 0, 1]]',
  },
  {
    id: 17,
    world: 'B',
    worldName: 'Hashing, Two Pointers & Windows',
    title: 'Majority Element',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'In [2, 2, 1, 1, 1, 2, 2] find the element appearing more than n/2 times using O(1) space.',
    example: '2',
    hint: 'Boyer-Moore Voting: pair off distinct elements; the true majority must survive.',
    idea: 'Boyer-Moore voting algorithm: maintain candidate and count. O(n) time, O(1) space.',
    solutionCode: `def majority(a):
    cand, cnt = None, 0
    for x in a:
        if cnt == 0: cand = x
        cnt += (1 if x == cand else -1)
    return cand`,
    output: '2',
  },
  {
    id: 18,
    world: 'B',
    worldName: 'Hashing, Two Pointers & Windows',
    title: 'Longest Consecutive Sequence',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'Length of the longest run of consecutive integers in [100, 4, 200, 1, 3, 2] in O(n) time.',
    example: '4 (sequence [1, 2, 3, 4])',
    hint: 'Only start counting if x is the START of a sequence (i.e. x - 1 is NOT in set).',
    idea: 'Put all numbers in a set. Only count streaks from streak starters. Every number visited at most twice: O(n).',
    solutionCode: `def longest_consecutive(a):
    s = set(a)
    best = 0
    for x in s:
        if x - 1 not in s: # streak starter!
            y = x
            while y + 1 in s:
                y += 1
            best = max(best, y - x + 1)
    return best`,
    output: '4',
  },
  {
    id: 19,
    world: 'B',
    worldName: 'Hashing, Two Pointers & Windows',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Return the 2 most frequent numbers in [1, 1, 1, 2, 2, 3].',
    example: '[1, 2]',
    hint: 'Count frequencies, then use a heap or Counter.most_common.',
    idea: 'Counter + heap or bucket sort in O(n log k).',
    solutionCode: `from collections import Counter
def top_k(a, k):
    return [x for x, _ in Counter(a).most_common(k)]`,
    output: '[1, 2]',
  },
  {
    id: 20,
    world: 'B',
    worldName: 'Hashing, Two Pointers & Windows',
    title: 'Find All Anagrams in a String',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'Starting indices of anagrams of p = "abc" inside s = "cbaebabacd".',
    example: '[0, 6]',
    hint: 'Fixed-size sliding window of length len(p); update character counts incrementally.',
    idea: 'Sliding window of size k: add new char, remove old char. Compare frequency maps in O(1). Overall O(n).',
    solutionCode: `from collections import Counter
def find_anagrams(s, p):
    need = Counter(p)
    win = Counter()
    k = len(p)
    res = []
    for i, ch in enumerate(s):
        win[ch] += 1
        if i >= k:
            old = s[i - k]
            win[old] -= 1
            if win[old] == 0: del win[old]
        if win == need:
            res.append(i - k + 1)
    return res`,
    output: '[0, 6]',
  },

  // World C: Recursion & Backtracking (21 - 30)
  {
    id: 21,
    world: 'C',
    worldName: 'Recursion & Backtracking',
    title: 'Reverse a String Recursively',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'Reverse "python" using recursion only.',
    example: '"nohtyp"',
    hint: 'Reverse of s = reverse of rest + first character.',
    idea: 'Base: len <= 1. Recursive: rev(s[1:]) + s[0].',
    solutionCode: `def rev(s):
    return s if len(s) <= 1 else rev(s[1:]) + s[0]`,
    output: "'nohtyp'",
  },
  {
    id: 22,
    world: 'C',
    worldName: 'Recursion & Backtracking',
    title: 'All Binary Strings of Length n',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'Generate all binary strings of length 3.',
    example: "['000', '001', '010', '011', '100', '101', '110', '111']",
    hint: 'At each position, branch into choice 0 and choice 1.',
    idea: '2^n leaves in binary decision tree.',
    solutionCode: `def bins(n, cur=""):
    if len(cur) == n: return [cur]
    return bins(n, cur + "0") + bins(n, cur + "1")`,
    output: "['000', '001', '010', '011', '100', '101', '110', '111']",
  },
  {
    id: 23,
    world: 'C',
    worldName: 'Recursion & Backtracking',
    title: 'Fast Power x^n',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Compute 2^10, 3^5, and 2^-2 in O(log n) time.',
    example: '1024, 243, 0.25',
    hint: 'x^n = (x^(n//2))^2. If n is odd, multiply extra x.',
    idea: 'Halve exponent each call: O(log n). Handle negative n by reciprocal.',
    solutionCode: `def power(x, n):
    if n < 0: return 1 / power(x, -n)
    if n == 0: return 1
    half = power(x, n // 2)
    return half * half * (x if n % 2 else 1)`,
    output: '1024 243 0.25',
  },
  {
    id: 24,
    world: 'C',
    worldName: 'Recursion & Backtracking',
    title: 'Subsets II (with duplicates)',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'List all UNIQUE subsets of [1, 2, 2]. Example: 6 subsets.',
    example: '[[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]',
    hint: 'Sort first; if current element equals previous at same recursive depth, skip it.',
    idea: 'Sort array. At loop level: if i > start and a[i] == a[i-1], continue. Prunes duplicate branches.',
    solutionCode: `def subsets2(a):
    a.sort()
    res = []
    def go(start, path):
        res.append(path[:])
        for i in range(start, len(a)):
            if i > start and a[i] == a[i-1]: continue
            path.append(a[i])
            go(i + 1, path)
            path.pop()
    go(0, [])
    return res`,
    output: '6 [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]',
  },
  {
    id: 25,
    world: 'C',
    worldName: 'Recursion & Backtracking',
    title: 'Combination Sum',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Using numbers from [2, 3, 6, 7] (reuse allowed) list all combinations that sum to 7.',
    example: '[[2, 2, 3], [7]]',
    hint: 'Choose a number, stay on the same index to allow reuse; prune when remaining < 0.',
    idea: 'Backtracking with pruning: pass remaining sum. Stay at index j to allow element reuse.',
    solutionCode: `def comb_sum(c, t):
    res = []
    def go(i, path, rem):
        if rem == 0: res.append(path[:]); return
        for j in range(i, len(c)):
            if c[j] <= rem:
                path.append(c[j])
                go(j, path, rem - c[j])
                path.pop()
    go(0, [], t)
    return res`,
    output: '[[2, 2, 3], [7]]',
  },
  {
    id: 26,
    world: 'C',
    worldName: 'Recursion & Backtracking',
    title: 'Generate Parentheses',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'All valid strings of n = 3 pairs of balanced parentheses.',
    example: "['((()))', '(()())', '(())()', '()(())', '()()()']",
    hint: 'Add "(" while open < n; add ")" only while close < open.',
    idea: 'Two pruning rules generate strictly valid sequences without post-filtering. Count = Catalan number.',
    solutionCode: `def gen_parens(n):
    res = []
    def go(s, o, c):
        if len(s) == 2 * n: res.append(s); return
        if o < n: go(s + "(", o + 1, c)
        if c < o: go(s + ")", o, c + 1)
    go("", 0, 0)
    return res`,
    output: "['((()))', '(()())', '(())()', '()(())', '()()()']",
  },
  {
    id: 27,
    world: 'C',
    worldName: 'Recursion & Backtracking',
    title: 'Phone Keypad Letter Combinations',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Digits "23" map to abc and def. List all 9 letter combinations.',
    example: "['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']",
    hint: 'Each digit represents one level in the recursion tree.',
    idea: 'Cartesian product of choices across keypad map.',
    solutionCode: `def letter_combinations(digits):
    if not digits: return []
    m = {"2":"abc","3":"def","4":"ghi","5":"jkl","6":"mno","7":"pqrs","8":"tuv","9":"wxyz"}
    res = [""]
    for d in digits:
        res = [p + ch for p in res for ch in m[d]]
    return res`,
    output: "9 ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']",
  },
  {
    id: 28,
    world: 'C',
    worldName: 'Recursion & Backtracking',
    title: 'N-Queens (Count)',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'How many ways can 6 queens be placed on a 6x6 chessboard without attacking each other?',
    example: '4',
    hint: 'One queen per row; track occupied columns and both diagonals (r - c and r + c).',
    idea: 'Backtracking with 3 hash sets for O(1) conflict validation.',
    solutionCode: `def total_n_queens(n):
    cols, d1, d2 = set(), set(), set()
    def go(r):
        if r == n: return 1
        total = 0
        for c in range(n):
            if c in cols or r - c in d1 or r + c in d2: continue
            cols.add(c); d1.add(r - c); d2.add(r + c)
            total += go(r + 1)
            cols.remove(c); d1.remove(r - c); d2.remove(r + c)
        return total
    return go(0)`,
    output: '4 (for n=6)',
  },
  {
    id: 29,
    world: 'C',
    worldName: 'Recursion & Backtracking',
    title: 'Palindrome Partitioning',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'Partition "aab" into substrings that are all palindromes.',
    example: "[['a', 'a', 'b'], ['aa', 'b']]",
    hint: 'Try every prefix; only recurse if prefix is a valid palindrome.',
    idea: 'Backtracking: slice candidate prefix. If piece == piece[::-1], recurse on suffix.',
    solutionCode: `def partition_pal(s):
    res = []
    def go(i, path):
        if i == len(s): res.append(path[:]); return
        for j in range(i + 1, len(s) + 1):
            piece = s[i:j]
            if piece == piece[::-1]:
                path.append(piece)
                go(j, path)
                path.pop()
    go(0, [])
    return res`,
    output: "[['a', 'a', 'b'], ['aa', 'b']]",
  },
  {
    id: 30,
    world: 'C',
    worldName: 'Recursion & Backtracking',
    title: 'Subset Sum Exists?',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Is there a subset of [3, 34, 4, 12, 5, 2] summing to 9? What about 30?',
    example: 'True (4 + 5 = 9), False for 30',
    hint: 'For each item: include it (target - val) or skip it.',
    idea: 'Include / exclude recursion. Foundation of the 0/1 knapsack.',
    solutionCode: `def can_sum(a, t, i=0):
    if t == 0: return True
    if i == len(a) or t < 0: return False
    return can_sum(a, t - a[i], i + 1) or can_sum(a, t, i + 1)`,
    output: 'True False',
  },

  // World D: Searching & Sorting (31 - 40)
  {
    id: 31,
    world: 'D',
    worldName: 'Searching & Sorting',
    title: 'Binary Search',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'Find 9 in [-1, 0, 3, 5, 9, 12]. Return index or -1.',
    example: '4',
    hint: 'Halve the search space each step.',
    idea: 'Standard while lo <= hi loop in O(log n).',
    solutionCode: `def bs(a, x):
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if a[mid] == x: return mid
        elif a[mid] < x: lo = mid + 1
        else: hi = mid - 1
    return -1`,
    output: '4',
  },
  {
    id: 32,
    world: 'D',
    worldName: 'Searching & Sorting',
    title: 'First and Last Position of Element',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'In [5, 7, 7, 8, 8, 10] find the first and last index of 8.',
    example: '[3, 4]',
    hint: 'Two binary searches: one for lower bound, one for upper bound.',
    idea: 'bisect_left and bisect_right - 1 in O(log n).',
    solutionCode: `from bisect import bisect_left, bisect_right
def search_range(a, x):
    i = bisect_left(a, x)
    if i == len(a) or a[i] != x: return [-1, -1]
    return [i, bisect_right(a, x) - 1]`,
    output: '[3, 4]',
  },
  {
    id: 33,
    world: 'D',
    worldName: 'Searching & Sorting',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: '[4, 5, 6, 7, 0, 1, 2] is a sorted array rotated. Find index of 0 in O(log n).',
    example: '4',
    hint: 'One half of the rotated array is ALWAYS strictly sorted.',
    idea: 'Determine whether left or right half is normally sorted, then check if target falls inside that range.',
    solutionCode: `def search_rotated(a, x):
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if a[mid] == x: return mid
        if a[lo] <= a[mid]: # left half is sorted
            if a[lo] <= x < a[mid]: hi = mid - 1
            else: lo = mid + 1
        else: # right half is sorted
            if a[mid] < x <= a[hi]: lo = mid + 1
            else: hi = mid - 1
    return -1`,
    output: '4',
  },
  {
    id: 34,
    world: 'D',
    worldName: 'Searching & Sorting',
    title: 'Find a Peak Element',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'A peak element is strictly greater than its neighbors. In [1, 2, 1, 3, 5, 6, 4] find any peak in O(log n).',
    example: 'Index 5 (value 6)',
    hint: 'Climb uphill: if a[mid] < a[mid+1], a peak is guaranteed to exist on the right.',
    idea: 'Binary search uphill climbing: always advance toward the higher neighbor. O(log n).',
    solutionCode: `def find_peak(a):
    lo, hi = 0, len(a) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] < a[mid + 1]: lo = mid + 1
        else: hi = mid
    return lo`,
    output: '5',
  },
  {
    id: 35,
    world: 'D',
    worldName: 'Searching & Sorting',
    title: 'Search a 2D Matrix',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Given sorted rows where each row starts after previous row, find 16 in [[1,3,5,7],[10,11,16,20],[23,30,34,60]].',
    example: 'True',
    hint: 'Treat the 2D matrix as one flattened sorted array of length R x C.',
    idea: 'Binary search with virtual index conversion: row = k // C, col = k % C. O(log(R*C)).',
    solutionCode: `def search_matrix(M, x):
    if not M or not M[0]: return False
    R, C = len(M), len(M[0])
    lo, hi = 0, R * C - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        val = M[mid // C][mid % C]
        if val == x: return True
        elif val < x: lo = mid + 1
        else: hi = mid - 1
    return False`,
    output: 'True',
  },
  {
    id: 36,
    world: 'D',
    worldName: 'Searching & Sorting',
    title: 'Merge Sorted Array (In-Place)',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'nums1 = [1,2,3,0,0,0], nums2 = [2,5,6]. Merge nums2 into nums1 in place.',
    example: '[1, 2, 2, 3, 5, 6]',
    hint: 'Fill from the BACK to avoid overwriting elements.',
    idea: 'Three pointers starting at the tail: m-1, n-1, and m+n-1. O(m + n) time, O(1) space.',
    solutionCode: `def merge_in_place(a, m, b, n):
    i, j, k = m - 1, n - 1, m + n - 1
    while j >= 0:
        if i >= 0 and a[i] > b[j]:
            a[k] = a[i]; i -= 1
        else:
            a[k] = b[j]; j -= 1
        k -= 1
    return a`,
    output: '[1, 2, 2, 3, 5, 6]',
  },
  {
    id: 37,
    world: 'D',
    worldName: 'Searching & Sorting',
    title: 'Sort Colors (Dutch National Flag)',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Sort [2, 0, 2, 1, 1, 0] containing only 0, 1, 2 in ONE pass without sort().',
    example: '[0, 0, 1, 1, 2, 2]',
    hint: 'Three pointers partition array into 0s | 1s | unexamined | 2s.',
    idea: 'Dijkstra Dutch National Flag: lo tracks 0s, mid tracks 1s, hi tracks 2s. O(n) one-pass.',
    solutionCode: `def sort_colors(a):
    lo, mid, hi = 0, 0, len(a) - 1
    while mid <= hi:
        if a[mid] == 0:
            a[lo], a[mid] = a[mid], a[lo]
            lo += 1; mid += 1
        elif a[mid] == 1:
            mid += 1
        else:
            a[mid], a[hi] = a[hi], a[mid]
            hi -= 1
    return a`,
    output: '[0, 0, 1, 1, 2, 2]',
  },
  {
    id: 38,
    world: 'D',
    worldName: 'Searching & Sorting',
    title: 'Kth Largest Element in an Array',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Find the 2nd largest in [3, 2, 1, 5, 6, 4].',
    example: '5',
    hint: 'Maintain a min-heap of size k.',
    idea: 'Min-heap of size k: root holds the k-th largest element seen so far. O(n log k).',
    solutionCode: `import heapq
def find_kth_largest(a, k):
    h = []
    for x in a:
        heapq.heappush(h, x)
        if len(h) > k: heapq.heappop(h)
    return h[0]`,
    output: '5',
  },
  {
    id: 39,
    world: 'D',
    worldName: 'Searching & Sorting',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Merge overlapping intervals in [[1,3],[2,6],[8,10],[15,18]].',
    example: '[[1, 6], [8, 10], [15, 18]]',
    hint: 'Sort by start time first.',
    idea: 'Sort by start time. Merge with last interval if curr.start <= prev.end. O(n log n).',
    solutionCode: `def merge_intervals(iv):
    iv.sort()
    out = [iv[0][:]]
    for s, e in iv[1:]:
        if s <= out[-1][1]:
            out[-1][1] = max(out[-1][1], e)
        else:
            out.append([s, e])
    return out`,
    output: '[[1, 6], [8, 10], [15, 18]]',
  },
  {
    id: 40,
    world: 'D',
    worldName: 'Searching & Sorting',
    title: 'Count Inversions',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'An inversion is a pair i < j with a[i] > a[j]. Count them in [2, 4, 1, 3, 5].',
    example: '3 ((2,1), (4,1), (4,3))',
    hint: 'Merge sort counts inversions whenever an element from right half jumps over left half.',
    idea: 'Modified merge sort: when R[j] < L[i], add remaining elements len(L) - i. O(n log n).',
    solutionCode: `def count_inversions(a):
    if len(a) <= 1: return a, 0
    m = len(a) // 2
    L, x = count_inversions(a[:m])
    R, y = count_inversions(a[m:])
    out = []
    i = j = 0
    cnt = x + y
    while i < len(L) and j < len(R):
        if L[i] <= R[j]:
            out.append(L[i]); i += 1
        else:
            out.append(R[j]); j += 1
            cnt += len(L) - i
    return out + L[i:] + R[j:], cnt`,
    output: '3',
  },

  // World E: Linked Lists, Stacks & Queues (41 - 50)
  {
    id: 41,
    world: 'E',
    worldName: 'Linked Lists, Stacks & Queues',
    title: 'Reverse a Linked List',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'Reverse 1 -> 2 -> 3 -> 4 -> 5 in place.',
    example: '5 -> 4 -> 3 -> 2 -> 1',
    hint: 'Three pointers: prev, cur, nxt.',
    idea: 'In-place pointer reversal in O(n) time and O(1) space.',
    solutionCode: `def reverse_list(head):
    prev = None
    cur = head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev`,
    output: '[5, 4, 3, 2, 1]',
  },
  {
    id: 42,
    world: 'E',
    worldName: 'Linked Lists, Stacks & Queues',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'Merge 1 -> 2 -> 4 and 1 -> 3 -> 4 into one sorted list.',
    example: '1 -> 1 -> 2 -> 3 -> 4 -> 4',
    hint: 'A dummy head node simplifies edge cases.',
    idea: 'Compare front values, append smaller to dummy chain. O(m + n).',
    solutionCode: `def merge_two_lists(a, b):
    dummy = tail = Node(0)
    while a and b:
        if a.val <= b.val:
            tail.next = a; a = a.next
        else:
            tail.next = b; b = b.next
        tail = tail.next
    tail.next = a or b
    return dummy.next`,
    output: '[1, 1, 2, 3, 4, 4]',
  },
  {
    id: 43,
    world: 'E',
    worldName: 'Linked Lists, Stacks & Queues',
    title: 'Remove Nth Node From End of List',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Remove 2nd node from end of 1 -> 2 -> 3 -> 4 -> 5. (One pass!)',
    example: '1 -> 2 -> 3 -> 5',
    hint: 'Advance fast pointer n steps ahead, then move both until fast hits the tail.',
    idea: 'Two pointers n nodes apart. Delete slow.next. O(n) one-pass.',
    solutionCode: `def remove_nth_from_end(head, n):
    dummy = Node(0, head)
    fast = slow = dummy
    for _ in range(n): fast = fast.next
    while fast.next:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next`,
    output: '[1, 2, 3, 5]',
  },
  {
    id: 44,
    world: 'E',
    worldName: 'Linked Lists, Stacks & Queues',
    title: 'Palindrome Linked List',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Is 1 -> 2 -> 2 -> 1 a palindrome? Use O(1) extra space.',
    example: 'True',
    hint: 'Find middle with slow/fast, reverse second half, compare both halves.',
    idea: 'Runner technique + in-place second-half reversal. O(n) time, O(1) space.',
    solutionCode: `def is_palindrome_list(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    prev = None
    while slow:
        nxt = slow.next
        slow.next = prev
        prev = slow
        slow = nxt
    left, right = head, prev
    while right:
        if left.val != right.val: return False
        left = left.next; right = right.next
    return True`,
    output: 'True',
  },
  {
    id: 45,
    world: 'E',
    worldName: 'Linked Lists, Stacks & Queues',
    title: 'Add Two Numbers (Digits Reversed)',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Add 2 -> 4 -> 3 (342) and 5 -> 6 -> 4 (465). Return sum list.',
    example: '7 -> 0 -> 8 (807)',
    hint: 'Add node by node with carry.',
    idea: 'divmod(sum + carry, 10) in O(max(m, n)).',
    solutionCode: `def add_two_numbers(a, b):
    dummy = tail = Node(0)
    carry = 0
    while a or b or carry:
        s = (a.val if a else 0) + (b.val if b else 0) + carry
        carry, d = divmod(s, 10)
        tail.next = Node(d)
        tail = tail.next
        a = a.next if a else None
        b = b.next if b else None
    return dummy.next`,
    output: '[7, 0, 8]',
  },
  {
    id: 46,
    world: 'E',
    worldName: 'Linked Lists, Stacks & Queues',
    title: 'Min Stack',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Design a stack supporting push, pop, and get_min all in O(1) time.',
    example: 'get_min() returns minimum element at any point',
    hint: 'Store (value, min_so_far) pairs on every push.',
    idea: 'Self-tracking minimum pair per stack frame in O(1).',
    solutionCode: `class MinStack:
    def __init__(self):
        self.s = []
    def push(self, x):
        cur_min = min(x, self.s[-1][1]) if self.s else x
        self.s.append((x, cur_min))
    def pop(self):
        return self.s.pop()[0]
    def get_min(self):
        return self.s[-1][1]`,
    output: 'O(1) all operations',
  },
  {
    id: 47,
    world: 'E',
    worldName: 'Linked Lists, Stacks & Queues',
    title: 'Queue Using Two Stacks',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Implement FIFO queue using only two LIFO stacks.',
    example: 'push(1), push(2), pop() -> 1',
    hint: 'One stack for enqueue, transfer to second stack on dequeue when empty.',
    idea: 'Lazy flip: transfer elements from in_stack to out_stack only when out_stack is empty. Amortized O(1).',
    solutionCode: `class MyQueue:
    def __init__(self):
        self.inp, self.out = [], []
    def push(self, x):
        self.inp.append(x)
    def pop(self):
        if not self.out:
            while self.inp:
                self.out.append(self.inp.pop())
        return self.out.pop()`,
    output: 'Amortized O(1)',
  },
  {
    id: 48,
    world: 'E',
    worldName: 'Linked Lists, Stacks & Queues',
    title: 'Next Greater Element',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'For each number in [4, 5, 2, 25] find next greater element to right (-1 if none).',
    example: '[5, 25, 25, -1]',
    hint: 'Monotonic stack of indices waiting for a greater number.',
    idea: 'Monotonic decreasing stack in O(n) time.',
    solutionCode: `def next_greater(a):
    res, st = [-1] * len(a), []
    for i, x in enumerate(a):
        while st and a[st[-1]] < x:
            res[st.pop()] = x
        st.append(i)
    return res`,
    output: '[5, 25, 25, -1]',
  },
  {
    id: 49,
    world: 'E',
    worldName: 'Linked Lists, Stacks & Queues',
    title: 'Decode String',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'Decode "3[a2[c]]": k[text] repeats text k times.',
    example: '"accaccacc"',
    hint: 'Stack remembers (current_string, repeat_k) when "[" opens.',
    idea: 'Stack push on "[", pop and multiply string when "]" closes.',
    solutionCode: `def decode_string(s):
    st, cur, num = [], "", 0
    for ch in s:
        if ch.isdigit():
            num = num * 10 + int(ch)
        elif ch == "[":
            st.append((cur, num))
            cur, num = "", 0
        elif ch == "]":
            prev, k = st.pop()
            cur = prev + cur * k
        else:
            cur += ch
    return cur`,
    output: "'accaccacc'",
  },
  {
    id: 50,
    world: 'E',
    worldName: 'Linked Lists, Stacks & Queues',
    title: 'Sliding Window Maximum',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'Window size 3 over [1, 3, -1, -3, 5, 3, 6, 7]. List each window max.',
    example: '[3, 3, 5, 5, 6, 7]',
    hint: 'A monotonic double-ended queue (deque) storing indices with decreasing values.',
    idea: 'Monotonic deque: drop smaller indices from back, drop out-of-window index from front. O(n).',
    solutionCode: `from collections import deque
def max_sliding_window(a, k):
    dq, res = deque(), []
    for i, x in enumerate(a):
        while dq and a[dq[-1]] <= x: dq.pop()
        dq.append(i)
        if dq[0] <= i - k: dq.popleft()
        if i >= k - 1: res.append(a[dq[0]])
    return res`,
    output: '[3, 3, 5, 5, 6, 7]',
  },

  // World F: Trees (51 - 60)
  {
    id: 51,
    world: 'F',
    worldName: 'Trees',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'Depth of tree [3, 9, 20, None, None, 15, 7].',
    example: '3',
    hint: '1 + max(left_depth, right_depth).',
    idea: 'Recursive post-order traversal in O(n).',
    solutionCode: `def max_depth(root):
    if not root: return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
    output: '3',
  },
  {
    id: 52,
    world: 'F',
    worldName: 'Trees',
    title: 'Invert a Binary Tree',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'Mirror tree [4, 2, 7, 1, 3, 6, 9] (swap left and right subtrees everywhere).',
    example: '[4, 7, 2, 9, 6, 3, 1]',
    hint: 'Swap children, recurse left and right.',
    idea: 'Pre-order child swap in O(n).',
    solutionCode: `def invert_tree(root):
    if root:
        root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root`,
    output: '[4, 7, 2, 9, 6, 3, 1]',
  },
  {
    id: 53,
    world: 'F',
    worldName: 'Trees',
    title: 'Symmetric Tree',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Is [1, 2, 2, 3, 4, 4, 3] a mirror of itself?',
    example: 'True',
    hint: 'Recursive helper: compare left.left with right.right and left.right with right.left.',
    idea: 'Dual tree mirror recursion in O(n).',
    solutionCode: `def is_symmetric(root):
    def same(a, b):
        if not a and not b: return True
        if not a or not b or a.val != b.val: return False
        return same(a.left, b.right) and same(a.right, b.left)
    return same(root.left, root.right) if root else True`,
    output: 'True',
  },
  {
    id: 54,
    world: 'F',
    worldName: 'Trees',
    title: 'Validate a BST',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Is [5, 1, 4, None, None, 3, 6] a valid BST? And [2, 1, 3]?',
    example: 'False for first, True for second',
    hint: 'Every node must fall inside an allowable (min_val, max_val) range.',
    idea: 'Pass allowable interval down during traversal: tighten on left (hi = val) and right (lo = val). O(n).',
    solutionCode: `def is_valid_bst(root, lo=float("-inf"), hi=float("inf")):
    if not root: return True
    if not (lo < root.val < hi): return False
    return is_valid_bst(root.left, lo, root.val) and is_valid_bst(root.right, root.val, hi)`,
    output: 'False True',
  },
  {
    id: 55,
    world: 'F',
    worldName: 'Trees',
    title: 'Level Order Rows',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Return tree values grouped row by row: [[3],[9,20],[15,7]].',
    example: '[[3], [9, 20], [15, 7]]',
    hint: 'BFS: iterate through exactly len(queue) nodes per level.',
    idea: 'Queue snapshot per level in O(n).',
    solutionCode: `from collections import deque
def level_order(root):
    if not root: return []
    q, out = deque([root]), []
    while q:
        row = []
        for _ in range(len(q)):
            n = q.popleft()
            row.append(n.val)
            if n.left: q.append(n.left)
            if n.right: q.append(n.right)
        out.append(row)
    return out`,
    output: '[[3], [9, 20], [15, 7]]',
  },
  {
    id: 56,
    world: 'F',
    worldName: 'Trees',
    title: 'Lowest Common Ancestor in a BST',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'In BST [6, 2, 8, 0, 4, 7, 9, None, None, 3, 5] find LCA of 2 and 8, and of 2 and 4.',
    example: '6 and 2',
    hint: 'Follow BST property: where do p and q split paths?',
    idea: 'If both < node, go left. If both > node, go right. Otherwise current node is LCA! O(h).',
    solutionCode: `def lca_bst(root, p, q):
    cur = root
    while cur:
        if p < cur.val and q < cur.val: cur = cur.left
        elif p > cur.val and q > cur.val: cur = cur.right
        else: return cur.val`,
    output: '6 2',
  },
  {
    id: 57,
    world: 'F',
    worldName: 'Trees',
    title: 'Path Sum',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'Does a root-to-leaf path in tree add up to 22?',
    example: 'True',
    hint: 'Subtract current node value as you go down; check leaf node.',
    idea: 'DFS: at leaf check target == node.val. O(n).',
    solutionCode: `def has_path_sum(root, target):
    if not root: return False
    if not root.left and not root.right:
        return root.val == target
    rem = target - root.val
    return has_path_sum(root.left, rem) or has_path_sum(root.right, rem)`,
    output: 'True',
  },
  {
    id: 58,
    world: 'F',
    worldName: 'Trees',
    title: 'Diameter of a Binary Tree',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'Diameter is longest path (in edges) between any two nodes. For [1, 2, 3, 4, 5] it is 3.',
    example: '3',
    hint: 'At each node, longest path passing through it is left_height + right_height.',
    idea: 'Post-order traversal computing heights while updating global diameter maximum. O(n).',
    solutionCode: `def diameter_of_tree(root):
    best = 0
    def h(n):
        nonlocal best
        if not n: return 0
        l, r = h(n.left), h(n.right)
        best = max(best, l + r)
        return 1 + max(l, r)
    h(root)
    return best`,
    output: '3',
  },
  {
    id: 59,
    world: 'F',
    worldName: 'Trees',
    title: 'Kth Smallest Element in a BST',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Find 3rd smallest element in BST [5, 3, 6, 2, 4, None, None, 1].',
    example: '3',
    hint: 'Inorder traversal visits BST in sorted ascending order.',
    idea: 'Iterative inorder traversal with stack: stop at k-th popped node. O(h + k).',
    solutionCode: `def kth_smallest(root, k):
    st, cur = [], root
    while st or cur:
        while cur:
            st.append(cur)
            cur = cur.left
        cur = st.pop()
        k -= 1
        if k == 0: return cur.val
        cur = cur.right`,
    output: '3',
  },
  {
    id: 60,
    world: 'F',
    worldName: 'Trees',
    title: 'Sorted Array to Balanced BST',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Convert [-10, -3, 0, 5, 9] into height-balanced BST.',
    example: 'Root 0, height 3',
    hint: 'Pick middle element as root; recursively build left and right subtrees.',
    idea: 'Divide and conquer at mid index: ensures perfect balance O(n).',
    solutionCode: `def sorted_array_to_bst(nums):
    if not nums: return None
    mid = len(nums) // 2
    root = TreeNode(nums[mid])
    root.left = sorted_array_to_bst(nums[:mid])
    root.right = sorted_array_to_bst(nums[mid+1:])
    return root`,
    output: 'Height 3',
  },

  // World G: Heaps & Graphs (61 - 70)
  {
    id: 61,
    world: 'G',
    worldName: 'Heaps & Graphs',
    title: 'Kth Largest in a Stream',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Maintain k-th largest of a stream. k = 3, initial [4, 5, 8, 2], then add 3, 5, 10, 9, 4.',
    example: '[4, 5, 5, 8, 8]',
    hint: 'Maintain min-heap of size k: the root is always the k-th largest.',
    idea: 'Min-heap of size k. add() runs in O(log k).',
    solutionCode: `import heapq
class KthLargest:
    def __init__(self, k, nums):
        self.k, self.h = k, []
        for x in nums: self.add(x)
    def add(self, val):
        heapq.heappush(self.h, val)
        if len(self.h) > self.k:
            heapq.heappop(self.h)
        return self.h[0]`,
    output: '[4, 5, 5, 8, 8]',
  },
  {
    id: 62,
    world: 'G',
    worldName: 'Heaps & Graphs',
    title: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'Merge [1, 4, 5], [1, 3, 4], and [2, 6] into one sorted list.',
    example: '[1, 1, 2, 3, 4, 4, 5, 6]',
    hint: 'Which of the k list heads is currently the smallest? Use a heap.',
    idea: 'Heap stores (value, list_idx, item_idx). Pop smallest, advance that list. O(N log k).',
    solutionCode: `import heapq
def merge_k_lists(lists):
    h = [(l[0], i, 0) for i, l in enumerate(lists) if l]
    heapq.heapify(h)
    out = []
    while h:
        val, i, j = heapq.heappop(h)
        out.append(val)
        if j + 1 < len(lists[i]):
            heapq.heappush(h, (lists[i][j+1], i, j + 1))
    return out`,
    output: '[1, 1, 2, 3, 4, 4, 5, 6]',
  },
  {
    id: 63,
    world: 'G',
    worldName: 'Heaps & Graphs',
    title: 'Last Stone Weight',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'Stones [2, 7, 4, 1, 8, 1]. Repeatedly smash 2 heaviest: equal vanish, else diff stays.',
    example: '1',
    hint: 'Always need 2 largest stones: max-heap.',
    idea: 'Max-heap via negatives in O(n log n).',
    solutionCode: `import heapq
def last_stone_weight(stones):
    h = [-s for s in stones]
    heapq.heapify(h)
    while len(h) > 1:
        s1 = -heapq.heappop(h)
        s2 = -heapq.heappop(h)
        if s1 != s2:
            heapq.heappush(h, -(s1 - s2))
    return -h[0] if h else 0`,
    output: '1',
  },
  {
    id: 64,
    world: 'G',
    worldName: 'Heaps & Graphs',
    title: 'Number of Islands',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Count islands (connected 1s) in [[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]].',
    example: '3',
    hint: 'Flood fill (sink) the whole island to 0 when you encounter a 1.',
    idea: 'Grid DFS/BFS sinking visited 1s to 0 in O(R x C).',
    solutionCode: `def num_islands(grid):
    if not grid: return 0
    R, C = len(grid), len(grid[0])
    cnt = 0
    def sink(r, c):
        if 0 <= r < R and 0 <= c < C and grid[r][c] == 1:
            grid[r][c] = 0
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                sink(r + dr, c + dc)
    for r in range(R):
        for c in range(C):
            if grid[r][c] == 1:
                cnt += 1
                sink(r, c)
    return cnt`,
    output: '3',
  },
  {
    id: 65,
    world: 'G',
    worldName: 'Heaps & Graphs',
    title: 'Flood Fill',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'Paint connected region of (1,1) in [[1,1,1],[1,1,0],[1,0,1]] with new color 2.',
    example: '[[2, 2, 2], [2, 2, 0], [2, 0, 1]]',
    hint: 'Same recursive idea as counting islands.',
    idea: 'DFS replacing old color with new color in O(cells).',
    solutionCode: `def flood_fill(img, r, c, new_color):
    old = img[r][c]
    if old == new_color: return img
    def dfs(i, j):
        if 0 <= i < len(img) and 0 <= j < len(img[0]) and img[i][j] == old:
            img[i][j] = new_color
            for di, dj in ((1,0),(-1,0),(0,1),(0,-1)):
                dfs(i + di, j + dj)
    dfs(r, c)
    return img`,
    output: '[[2, 2, 2], [2, 2, 0], [2, 0, 1]]',
  },
  {
    id: 66,
    world: 'G',
    worldName: 'Heaps & Graphs',
    title: 'Rotting Oranges',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'Grid: 0 empty, 1 fresh, 2 rotten. Each minute rot spreads 4 directions. Minutes until none fresh?',
    example: '4 for [[2,1,1],[1,1,0],[0,1,1]]',
    hint: 'Multi-source BFS: enqueue ALL rotten oranges simultaneously at time 0.',
    idea: 'Level-order multi-source BFS counting time elapsed in O(R x C).',
    solutionCode: `from collections import deque
def oranges_rotting(grid):
    R, C = len(grid), len(grid[0])
    q = deque()
    fresh = 0
    for r in range(R):
        for c in range(C):
            if grid[r][c] == 2: q.append((r, c, 0))
            elif grid[r][c] == 1: fresh += 1
    t = 0
    while q:
        r, c, t = q.popleft()
        for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 1:
                grid[nr][nc] = 2
                fresh -= 1
                q.append((nr, nc, t + 1))
    return t if fresh == 0 else -1`,
    output: '4',
  },
  {
    id: 67,
    world: 'G',
    worldName: 'Heaps & Graphs',
    title: 'Course Schedule',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'Prerequisites [1,0],[2,1],[3,2]. Can all 4 courses be finished?',
    example: 'True (cycle means False)',
    hint: "Kahn's Topological Sort: repeatedly take courses with in-degree 0.",
    idea: "Kahn's algorithm: BFS on vertices with in-degree 0. If processed count != total, cycle exists. O(V + E).",
    solutionCode: `from collections import defaultdict, deque
def can_finish(n, pre):
    g = defaultdict(list)
    indeg = [0] * n
    for a, b in pre:
        g[b].append(a)
        indeg[a] += 1
    q = deque(i for i in range(n) if indeg[i] == 0)
    done = 0
    while q:
        u = q.popleft()
        done += 1
        for v in g[u]:
            indeg[v] -= 1
            if indeg[v] == 0: q.append(v)
    return done == n`,
    output: 'True',
  },
  {
    id: 68,
    world: 'G',
    worldName: 'Heaps & Graphs',
    title: 'Connected Components in Undirected Graph',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'n = 6 nodes, edges [(0,1),(1,2),(3,4)]. How many connected components?',
    example: '3',
    hint: 'Union-Find with path compression or DFS.',
    idea: 'Disjoint Set Union (Union-Find): decrement component count on successful union. O(E alpha(V)).',
    solutionCode: `def count_components(n, edges):
    p = list(range(n))
    def find(x):
        while p[x] != x:
            p[x] = p[p[x]]
            x = p[x]
        return x
    cnt = n
    for u, v in edges:
        ru, rv = find(u), find(v)
        if ru != rv:
            p[ru] = rv
            cnt -= 1
    return cnt`,
    output: '3',
  },
  {
    id: 69,
    world: 'G',
    worldName: 'Heaps & Graphs',
    title: 'Is the Graph Bipartite?',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'Can nodes of [[1,3],[0,2],[1,3],[0,2]] be 2-colored so no adjacent nodes share a color?',
    example: 'True',
    hint: 'BFS 2-coloring: color neighbors with 1 - color.',
    idea: '2-Coloring via BFS: any adjacent conflict indicates odd cycle, returning False. O(V + E).',
    solutionCode: `from collections import deque
def is_bipartite(g):
    color = {}
    for s in range(len(g)):
        if s in color: continue
        color[s] = 0
        q = deque([s])
        while q:
            u = q.popleft()
            for v in g[u]:
                if v not in color:
                    color[v] = 1 - color[u]
                    q.append(v)
                elif color[v] == color[u]:
                    return False
    return True`,
    output: 'True',
  },
  {
    id: 70,
    world: 'G',
    worldName: 'Heaps & Graphs',
    title: 'Dijkstra: Cheapest Route',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'Roads (u,v,cost): A-B 4, A-C 1, C-B 2, B-D 1, C-D 5. Cheapest cost A to D?',
    example: '4 (A -> C -> B -> D)',
    hint: 'Like BFS, but always expand the node with minimum known distance using a heap.',
    idea: 'Dijkstra shortest path with min-heap priority queue. O((V + E) log V).',
    solutionCode: `from collections import defaultdict
import heapq
def dijkstra(edges, src, dst):
    g = defaultdict(list)
    for u, v, w in edges:
        g[u].append((v, w)); g[v].append((u, w))
    dist = {src: 0}
    h = [(0, src)]
    while h:
        d, u = heapq.heappop(h)
        if d > dist.get(u, float("inf")): continue
        if u == dst: return d
        for v, w in g[u]:
            if d + w < dist.get(v, float("inf")):
                dist[v] = d + w
                heapq.heappush(h, (d + w, v))
    return dist.get(dst, -1)`,
    output: '4',
  },

  // World H: Dynamic Programming & Greedy (71 - 80)
  {
    id: 71,
    world: 'H',
    worldName: 'Dynamic Programming & Greedy',
    title: 'Climbing Stairs (1, 2 or 3 steps)',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'How many ways to climb 5 stairs taking 1, 2, or 3 steps at a time?',
    example: '13',
    hint: 'dp[i] = dp[i-1] + dp[i-2] + dp[i-3].',
    idea: 'Tribonacci recurrence: sum of previous 3 step combinations. O(n).',
    solutionCode: `def stairs3(n):
    dp = [1, 1, 2] + [0] * max(0, n - 2)
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2] + dp[i-3]
    return dp[n]`,
    output: '13',
  },
  {
    id: 72,
    world: 'H',
    worldName: 'Dynamic Programming & Greedy',
    title: 'House Robber II (Circular)',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Houses are in a CIRCLE (first and last are neighbors). Money [2, 3, 2]; best loot?',
    example: '3',
    hint: 'Solve two linear problems: skip first house a[1:], or skip last house a[:-1].',
    idea: 'Circular decomposition into two linear House Robber runs in O(n).',
    solutionCode: `def rob_circle(a):
    if len(a) == 1: return a[0]
    def rob_line(m):
        p2 = p1 = 0
        for x in m:
            p2, p1 = p1, max(p1, p2 + x)
        return p1
    return max(rob_line(a[1:]), rob_line(a[:-1]))`,
    output: '3',
  },
  {
    id: 73,
    world: 'H',
    worldName: 'Dynamic Programming & Greedy',
    title: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Length of longest strictly increasing subsequence in [10, 9, 2, 5, 3, 7, 101, 18].',
    example: '4 ([2, 3, 7, 101])',
    hint: 'dp[i] = length of LIS ending at index i.',
    idea: 'dp[i] = 1 + max(dp[j] for j < i if a[j] < a[i]). O(n^2) DP or O(n log n) with patience binary search.',
    solutionCode: `def length_of_lis(a):
    if not a: return 0
    dp = [1] * len(a)
    for i in range(len(a)):
        for j in range(i):
            if a[j] < a[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)`,
    output: '4',
  },
  {
    id: 74,
    world: 'H',
    worldName: 'Dynamic Programming & Greedy',
    title: 'Longest Common Subsequence',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'LCS length of "abcde" and "ace".',
    example: '3 ("ace")',
    hint: 'Compare last characters: if equal, add 1 to diagonal; else take max(up, left).',
    idea: '2D DP table: equal characters increment diagonal; otherwise take max of top and left. O(m x n).',
    solutionCode: `def lcs(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]`,
    output: '3',
  },
  {
    id: 75,
    world: 'H',
    worldName: 'Dynamic Programming & Greedy',
    title: 'Edit Distance',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'Minimum insert/delete/replace operations to convert "horse" into "ros".',
    example: '3',
    hint: 'State = (prefix of a, prefix of b). Replace costs 1 if characters differ.',
    idea: 'Wagner-Fischer algorithm: 1 + min(insert, delete, replace) in O(m x n).',
    solutionCode: `def min_distance(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1): dp[i][0] = i
    for j in range(n + 1): dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    return dp[m][n]`,
    output: '3',
  },
  {
    id: 76,
    world: 'H',
    worldName: 'Dynamic Programming & Greedy',
    title: '0/1 Knapsack',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'Weights [1, 3, 4, 5], values [1, 4, 5, 7], max capacity 7. Best total value?',
    example: '9',
    hint: 'dp[w] = best value with capacity w. Loop capacity backwards so items are not reused.',
    idea: '1D space-optimized DP iterating capacity in reverse: O(n x W).',
    solutionCode: `def knapsack(wt, val, W):
    dp = [0] * (W + 1)
    for w, v in zip(wt, val):
        for c in range(W, w - 1, -1):
            dp[c] = max(dp[c], dp[c - w] + v)
    return dp[W]`,
    output: '9',
  },
  {
    id: 77,
    world: 'H',
    worldName: 'Dynamic Programming & Greedy',
    title: 'Unique Paths in a Grid',
    difficulty: 'Easy',
    difficultyStars: 1,
    problem: 'A robot moves only right or down from top-left of a 3 x 7 grid to bottom-right. How many unique paths?',
    example: '28',
    hint: 'Paths to a cell = paths from above + paths from left.',
    idea: 'Grid DP row by row in O(m x n), or combinatorics C(m+n-2, m-1).',
    solutionCode: `def unique_paths(m, n):
    row = [1] * n
    for _ in range(m - 1):
        for j in range(1, n):
            row[j] += row[j - 1]
    return row[-1]`,
    output: '28',
  },
  {
    id: 78,
    world: 'H',
    worldName: 'Dynamic Programming & Greedy',
    title: 'Partition Equal Subset Sum',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'Can [1, 5, 11, 5] be split into two subsets with equal sums?',
    example: 'True (sum = 22 -> target = 11)',
    hint: 'Total must be even; then find a subset with sum equal to total // 2.',
    idea: '0/1 Knapsack boolean subset sum in O(n x sum).',
    solutionCode: `def can_partition(a):
    t = sum(a)
    if t % 2: return False
    half = t // 2
    dp = [True] + [False] * half
    for x in a:
        for s in range(half, x - 1, -1):
            dp[s] = dp[s] or dp[s - x]
    return dp[half]`,
    output: 'True',
  },
  {
    id: 79,
    world: 'H',
    worldName: 'Dynamic Programming & Greedy',
    title: 'Word Break',
    difficulty: 'Hard',
    difficultyStars: 3,
    problem: 'Can "leetcode" be segmented into words from ["leet", "code"]?',
    example: 'True',
    hint: 'dp[i] is True if some prefix j has dp[j]==True and s[j:i] is in word set.',
    idea: '1D boolean DP with hash set lookup in O(n^2).',
    solutionCode: `def word_break(s, word_dict):
    words = set(word_dict)
    dp = [True] + [False] * len(s)
    for i in range(1, len(s) + 1):
        dp[i] = any(dp[j] and s[j:i] in words for j in range(i))
    return dp[-1]`,
    output: 'True',
  },
  {
    id: 80,
    world: 'H',
    worldName: 'Dynamic Programming & Greedy',
    title: 'Jump Game (Greedy)',
    difficulty: 'Medium',
    difficultyStars: 2,
    problem: 'Each number is max jump length. From index 0, can you reach last index in [2, 3, 1, 1, 4]?',
    example: 'True',
    hint: 'Greedy: maintain the farthest reachable index so far.',
    idea: 'Greedy reachability: if current index > farthest reached, you are stuck. O(n) time, O(1) space.',
    solutionCode: `def can_jump(a):
    far = 0
    for i, x in enumerate(a):
        if i > far: return False
        far = max(far, i + x)
    return True`,
    output: 'True',
  },
];

export const pythonDsaCheatSheets: PythonDsaCheatSheet = {
  dataStructureCostTable: [
    { structure: 'Array / list', access: 'O(1)', search: 'O(n)', insert: 'end O(1)*, middle O(n)', delete: 'middle O(n)', notes: '* amortized' },
    { structure: 'Linked list', access: 'O(n)', search: 'O(n)', insert: 'head O(1), after node O(1)', delete: 'O(1) with node', notes: 'extra pointer memory' },
    { structure: 'Stack (list)', access: 'top O(1)', search: 'O(n)', insert: 'push O(1)', delete: 'pop O(1)', notes: 'LIFO' },
    { structure: 'Queue (deque)', access: 'ends O(1)', search: 'O(n)', insert: 'O(1)', delete: 'popleft O(1)', notes: 'FIFO' },
    { structure: 'Hash table (dict/set)', access: '-', search: 'O(1) avg', insert: 'O(1) avg', delete: 'O(1) avg', notes: 'worst O(n)' },
    { structure: 'BST (balanced)', access: '-', search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)', notes: 'unbalanced: O(n)' },
    { structure: 'Min-heap', access: 'min O(1)', search: 'O(n)', insert: 'O(log n)', delete: 'pop O(log n)', notes: 'heapify O(n)' },
  ],
  algorithmCostTable: [
    { algorithm: 'Linear search', time: 'O(n)', space: 'O(1)', remember: 'works on any list' },
    { algorithm: 'Binary search', time: 'O(log n)', space: 'O(1)', remember: 'sorted only' },
    { algorithm: 'Bubble / selection / insertion', time: 'O(n^2)', space: 'O(1)', remember: 'insertion: O(n) if almost sorted' },
    { algorithm: 'Merge sort', time: 'O(n log n)', space: 'O(n)', remember: 'stable, always n log n' },
    { algorithm: 'Quicksort', time: 'O(n log n) avg', space: 'O(log n)', remember: 'worst O(n^2) with bad pivot' },
    { algorithm: 'Python sorted() (Timsort)', time: 'O(n log n)', space: 'O(n)', remember: 'stable hybrid' },
    { algorithm: 'BFS / DFS', time: 'O(V + E)', space: 'O(V)', remember: 'visited set mandatory' },
    { algorithm: 'Dijkstra (heap)', time: 'O((V+E) log V)', space: 'O(V)', remember: 'non-negative weights' },
    { algorithm: 'DP table', time: 'states x work per state', space: 'states', remember: 'define dp[i] in words first' },
  ],
  pythonBuiltInCosts: [
    { operation: 'lst.append(x)', cost: 'O(1)*' },
    { operation: 'lst.pop()', cost: 'O(1)' },
    { operation: 'x in lst', cost: 'O(n)' },
    { operation: 'a[i:j]', cost: 'O(j - i)' },
    { operation: 's += "x" in loop', cost: 'O(n^2) total' },
    { operation: 'len(a)', cost: 'O(1)' },
    { operation: 'heapq.heappush / heappop', cost: 'O(log n)' },
    { operation: 'lst.insert(0, x)', cost: 'O(n)' },
    { operation: 'lst.pop(0)', cost: 'O(n)' },
    { operation: 'x in set / dict', cost: 'O(1) avg' },
    { operation: 'sorted(a)', cost: 'O(n log n)' },
    { operation: '"".join(parts)', cost: 'O(n)' },
    { operation: 'deque.popleft()', cost: 'O(1)' },
    { operation: 'heapq.heapify', cost: 'O(n)' },
  ],
  patternSpotter: [
    { clue: 'Sorted array, pair or target', think: 'Two pointers / binary search' },
    { clue: 'Contiguous subarray or substring with condition', think: 'Sliding window / prefix sums' },
    { clue: 'Count, duplicates, "have I seen this?"', think: 'Hash set / dict' },
    { clue: 'All combinations, permutations, subsets, grid paths', think: 'Backtracking' },
    { clue: 'Fewest steps, level by level, unweighted shortest path', think: 'BFS' },
    { clue: 'Explore everything, connected components, cycle', think: 'DFS / union-find' },
    { clue: 'K largest / smallest, repeatedly take min/max', think: 'Heap' },
    { clue: 'Brackets, undo, next greater, nested structure', think: 'Stack (monotonic stack)' },
    { clue: 'Min / max / count of ways with repeating subproblems', think: 'Dynamic programming' },
    { clue: 'Minimise maximum or maximise minimum', think: 'Binary search on the answer' },
    { clue: 'Linked list middle, cycle, k-th from end', think: 'Fast and slow pointers' },
    { clue: 'Tree question', think: 'Recursion: use left and right answers' },
  ],
  bugSurvivalGuide: [
    { symptom: 'IndexError', cause: 'Index = len(a), or empty list', fix: 'Check bounds; indexes go 0..len-1' },
    { symptom: 'KeyError', cause: 'Key missing in dict', fix: 'd.get(k, default) or "in" check' },
    { symptom: 'RecursionError', cause: 'No base case or recursion too deep', fix: 'Add base case; consider a loop or stack' },
    { symptom: 'TypeError: unhashable', cause: 'List/set/dict used as dict key', fix: 'Convert to tuple or frozenset' },
    { symptom: 'Infinite loop', cause: 'Pointer or counter never changes', fix: 'Print values; check update line' },
    { symptom: 'Answer off by one', cause: '< vs <=, inclusive vs exclusive ends', fix: 'Test small n = 0, 1, 2' },
    { symptom: 'Original list changed', cause: 'Alias instead of copy', fix: 'a.copy(), a[:], copy.deepcopy' },
    { symptom: 'Results all identical', cause: 'Appended the same mutable object', fix: 'append(path[:])' },
    { symptom: 'Skipped items in for loop', cause: 'Modified list while looping over it', fix: 'Loop over a copy or build new list' },
  ],
  handyOneLiners: [
    { title: 'Multi-key sort (marks desc, name asc)', code: 'a.sort(key=lambda x: (-x[1], x[0]))', comment: 'Sort by score high-to-low, then name A-Z' },
    { title: 'Index + Value in for loop', code: 'for i, x in enumerate(a, 1): ...', comment: '1-based index numbering' },
    { title: 'Pairwise walk two lists', code: 'for x, y in zip(a, b): ...', comment: 'Traverse synchronously' },
    { title: 'Top K frequent items', code: 'Counter(a).most_common(k)', comment: 'O(n log k) frequency ranking' },
    { title: 'Filter count generator', code: 'sum(1 for x in a if condition(x))', comment: 'Count matches in O(1) memory' },
    { title: 'Safe 2D Grid initialization', code: '[[0]*m for _ in range(n)]', comment: 'Creates distinct row lists' },
    { title: '4-directional grid offsets', code: 'dirs = [(1,0),(-1,0),(0,1),(0,-1)]', comment: 'Down, Up, Right, Left' },
  ],
};

export const pythonDsaBossBattle: PythonDsaBossQuestion[] = [
  // Round 1: Foundations
  {
    id: 'Q17.1',
    round: 1,
    roundName: 'Round 1: Foundations',
    question: 'Binary search on n sorted items takes:',
    options: [
      { label: 'A', text: 'O(n)' },
      { label: 'B', text: 'O(log n)' },
      { label: 'C', text: 'O(n log n)' },
      { label: 'D', text: 'O(1)' },
    ],
    correct: 'B',
    explanation: 'Chapter 5: Halve the search range each step.',
    chapterRef: 'Chapter 5: Searching',
  },
  {
    id: 'Q17.2',
    round: 1,
    roundName: 'Round 1: Foundations',
    question: 'Which structure best supports an UNDO feature?',
    options: [
      { label: 'A', text: 'Queue' },
      { label: 'B', text: 'Stack' },
      { label: 'C', text: 'Set' },
      { label: 'D', text: 'Heap' },
    ],
    correct: 'B',
    explanation: 'Chapter 8: Last action done is the first one undone (LIFO).',
    chapterRef: 'Chapter 8: Stacks',
  },
  {
    id: 'Q17.3',
    round: 1,
    roundName: 'Round 1: Foundations',
    question: 'a = [1, 2]; b = a; b.append(3); len(a) is:',
    options: [
      { label: 'A', text: '2' },
      { label: 'B', text: '3' },
      { label: 'C', text: '1' },
      { label: 'D', text: 'Error' },
    ],
    correct: 'B',
    explanation: 'Chapter 1: b and a point to the exact same list in memory.',
    chapterRef: 'Chapter 1: Python Power-Up',
  },
  {
    id: 'Q17.4',
    round: 1,
    roundName: 'Round 1: Foundations',
    question: '-7 // 2 equals:',
    options: [
      { label: 'A', text: '-3' },
      { label: 'B', text: '-4' },
      { label: 'C', text: '3' },
      { label: 'D', text: '-3.5' },
    ],
    correct: 'B',
    explanation: 'Chapter 1: Floor division rounds down toward minus infinity.',
    chapterRef: 'Chapter 1: Python Power-Up',
  },
  {
    id: 'Q17.5',
    round: 1,
    roundName: 'Round 1: Foundations',
    question: 'Two nested loops over n items each: complexity is:',
    options: [
      { label: 'A', text: 'O(n)' },
      { label: 'B', text: 'O(n log n)' },
      { label: 'C', text: 'O(n^2)' },
      { label: 'D', text: 'O(2^n)' },
    ],
    correct: 'C',
    explanation: 'Chapter 2: n x n iterations = O(n^2).',
    chapterRef: 'Chapter 2: Big-O',
  },

  // Round 2: Structures
  {
    id: 'Q17.6',
    round: 2,
    roundName: 'Round 2: Structures',
    question: 'Average cost of dict lookup d[key]:',
    options: [
      { label: 'A', text: 'O(1)' },
      { label: 'B', text: 'O(log n)' },
      { label: 'C', text: 'O(n)' },
      { label: 'D', text: 'O(n^2)' },
    ],
    correct: 'A',
    explanation: 'Chapter 10: Hash function jumps straight to bucket in O(1).',
    chapterRef: 'Chapter 10: Hashing',
  },
  {
    id: 'Q17.7',
    round: 2,
    roundName: 'Round 2: Structures',
    question: 'Inserting at the head of a linked list costs:',
    options: [
      { label: 'A', text: 'O(1)' },
      { label: 'B', text: 'O(n)' },
      { label: 'C', text: 'O(log n)' },
      { label: 'D', text: 'O(n^2)' },
    ],
    correct: 'A',
    explanation: 'Chapter 7: Relink new node to old head in O(1).',
    chapterRef: 'Chapter 7: Linked Lists',
  },
  {
    id: 'Q17.8',
    round: 2,
    roundName: 'Round 2: Structures',
    question: 'Inorder traversal of a BST yields:',
    options: [
      { label: 'A', text: 'Random order' },
      { label: 'B', text: 'Sorted ascending order' },
      { label: 'C', text: 'Level order' },
      { label: 'D', text: 'Reverse order' },
    ],
    correct: 'B',
    explanation: 'Chapter 11: Left, Node, Right on a BST produces sorted order.',
    chapterRef: 'Chapter 11: Trees & BST',
  },
  {
    id: 'Q17.9',
    round: 2,
    roundName: 'Round 2: Structures',
    question: 'The root of a min-heap is always:',
    options: [
      { label: 'A', text: 'The largest item' },
      { label: 'B', text: 'The smallest item' },
      { label: 'C', text: 'The median' },
      { label: 'D', text: 'Random' },
    ],
    correct: 'B',
    explanation: 'Chapter 12: Min-heap guarantees parent <= children, so root is minimum.',
    chapterRef: 'Chapter 12: Heaps & Priority Queues',
  },
  {
    id: 'Q17.10',
    round: 2,
    roundName: 'Round 2: Structures',
    question: 'Hash collisions can be handled by:',
    options: [
      { label: 'A', text: 'Chaining' },
      { label: 'B', text: 'Sorting' },
      { label: 'C', text: 'Recursion' },
      { label: 'D', text: 'Slicing' },
    ],
    correct: 'A',
    explanation: 'Chapter 10: Chaining keeps a small linked list per bucket.',
    chapterRef: 'Chapter 10: Hashing',
  },

  // Round 3: Algorithms
  {
    id: 'Q17.11',
    round: 3,
    roundName: 'Round 3: Algorithms',
    question: 'Which sort guarantees O(n log n) even in the worst case?',
    options: [
      { label: 'A', text: 'Bubble sort' },
      { label: 'B', text: 'Quicksort (first pivot)' },
      { label: 'C', text: 'Merge sort' },
      { label: 'D', text: 'Insertion sort' },
    ],
    correct: 'C',
    explanation: 'Chapter 6: Merge sort divides in half every time, strictly O(n log n).',
    chapterRef: 'Chapter 6: Sorting',
  },
  {
    id: 'Q17.12',
    round: 3,
    roundName: 'Round 3: Algorithms',
    question: 'Which finds the fewest edges in an unweighted graph?',
    options: [
      { label: 'A', text: 'DFS' },
      { label: 'B', text: 'BFS' },
      { label: 'C', text: 'Binary search' },
      { label: 'D', text: 'Heapify' },
    ],
    correct: 'B',
    explanation: 'Chapter 13: BFS explores distance 1, then 2, then 3...',
    chapterRef: 'Chapter 13: Graphs',
  },
  {
    id: 'Q17.13',
    round: 3,
    roundName: 'Round 3: Algorithms',
    question: 'Backtracking 3-step pattern:',
    options: [
      { label: 'A', text: 'Sort, search, stop' },
      { label: 'B', text: 'Choose, explore, undo' },
      { label: 'C', text: 'Push, pop, peek' },
      { label: 'D', text: 'Read, write, run' },
    ],
    correct: 'B',
    explanation: 'Chapter 4: Choose an option, explore recursively, undo choice on return.',
    chapterRef: 'Chapter 4: Recursion & Backtracking',
  },
  {
    id: 'Q17.14',
    round: 3,
    roundName: 'Round 3: Algorithms',
    question: 'A sliding window of size k over n items takes:',
    options: [
      { label: 'A', text: 'O(nk)' },
      { label: 'B', text: 'O(n)' },
      { label: 'C', text: 'O(k)' },
      { label: 'D', text: 'O(log n)' },
    ],
    correct: 'B',
    explanation: 'Chapter 3: Updating window sum is O(1) per step: total O(n).',
    chapterRef: 'Chapter 3: Arrays & Strings',
  },
  {
    id: 'Q17.15',
    round: 3,
    roundName: 'Round 3: Algorithms',
    question: 'Two-pointer pair-sum strictly requires the array to be:',
    options: [
      { label: 'A', text: 'Sorted' },
      { label: 'B', text: 'Unique' },
      { label: 'C', text: 'Positive' },
      { label: 'D', text: 'Short' },
    ],
    correct: 'A',
    explanation: 'Chapter 3: Sortedness tells the algorithm which pointer to move.',
    chapterRef: 'Chapter 3: Arrays & Strings',
  },

  // Round 4: The Final Four
  {
    id: 'Q17.16',
    round: 4,
    roundName: 'Round 4: The Final Four',
    question: 'Dynamic Programming works best when a problem has:',
    options: [
      { label: 'A', text: 'Sorted data' },
      { label: 'B', text: 'Overlapping subproblems' },
      { label: 'C', text: 'Cycles' },
      { label: 'D', text: 'Duplicates' },
    ],
    correct: 'B',
    explanation: 'Chapter 14: Overlapping subproblems allow caching solutions.',
    chapterRef: 'Chapter 14: Dynamic Programming',
  },
  {
    id: 'Q17.17',
    round: 4,
    roundName: 'Round 4: The Final Four',
    question: 'Greedy coin change with coins [1, 3, 4] for amount 6 gives:',
    options: [
      { label: 'A', text: '2 coins' },
      { label: 'B', text: '3 coins' },
      { label: 'C', text: '4 coins' },
      { label: 'D', text: 'Error' },
    ],
    correct: 'B',
    explanation: 'Chapter 14: Greedy picks 4 + 1 + 1 (3 coins), whereas DP finds 3 + 3 (2 coins).',
    chapterRef: 'Chapter 14: Dynamic Programming',
  },
  {
    id: 'Q17.18',
    round: 4,
    roundName: 'Round 4: The Final Four',
    question: 'Building a heap from n items with heapq.heapify costs:',
    options: [
      { label: 'A', text: 'O(log n)' },
      { label: 'B', text: 'O(n)' },
      { label: 'C', text: 'O(n log n)' },
      { label: 'D', text: 'O(n^2)' },
    ],
    correct: 'B',
    explanation: 'Chapter 12: Bottom-up heapify runs in linear O(n) time.',
    chapterRef: 'Chapter 12: Heaps & Priority Queues',
  },
  {
    id: 'Q17.19',
    round: 4,
    roundName: 'Round 4: The Final Four',
    question: 'Every recursive function fundamentally requires a:',
    options: [
      { label: 'A', text: 'For loop' },
      { label: 'B', text: 'Base case' },
      { label: 'C', text: 'Global variable' },
      { label: 'D', text: 'Class definition' },
    ],
    correct: 'B',
    explanation: 'Chapter 4: Without a base case, recursion continues until RecursionError.',
    chapterRef: 'Chapter 4: Recursion & Backtracking',
  },
  {
    id: 'Q17.20',
    round: 4,
    roundName: 'Round 4: The Final Four',
    question: '"x in lst" for a plain Python list costs:',
    options: [
      { label: 'A', text: 'O(1)' },
      { label: 'B', text: 'O(n)' },
      { label: 'C', text: 'O(log n)' },
      { label: 'D', text: 'O(n log n)' },
    ],
    correct: 'B',
    explanation: 'Chapters 1 and 16: List membership scans item by item in O(n).',
    chapterRef: 'Chapter 1: Python Power-Up',
  },
];

export const pythonDsaGlossary: PythonDsaGlossaryItem[] = [
  { term: 'Algorithm', meaning: 'Step-by-step recipe to solve a problem with guaranteed termination.' },
  { term: 'Amortized', meaning: 'Average cost per operation over a long sequence (e.g. array resizing).' },
  { term: 'Base Case', meaning: 'Smallest recursion input answered directly without making another call.' },
  { term: 'Big-O', meaning: 'Asymptotic upper bound on the growth rate of execution time or memory space.' },
  { term: 'Collision', meaning: 'Two distinct keys mapping to the same hash bucket index.' },
  { term: 'Complete Tree', meaning: 'All levels fully filled except possibly the last, which is filled left to right.' },
  { term: 'Dynamic Programming', meaning: 'Recursion with caching / memoization to solve overlapping subproblems.' },
  { term: 'Edge / Vertex', meaning: 'A link / a node in a graph network.' },
  { term: 'Greedy', meaning: 'Taking the locally optimal choice at each step hoping for global optimum.' },
  { term: 'Hashable', meaning: 'An immutable object with a fixed hash value that can serve as a dict key.' },
  { term: 'Heap', meaning: 'A complete binary tree where parent <= children (min-heap) or parent >= children (max-heap).' },
  { term: 'Immutable / Mutable', meaning: 'Cannot / can be altered in place after creation in memory.' },
  { term: 'Memoization', meaning: 'Caching results of expensive recursive function calls to avoid recomputation.' },
  { term: 'Pivot', meaning: 'The partition element used in Quicksort to separate smaller and larger values.' },
  { term: 'Pruning', meaning: 'Abandoning a search branch in backtracking the moment constraints fail.' },
  { term: 'Stable Sort', meaning: 'A sorting algorithm that preserves the relative order of duplicate elements.' },
  { term: 'Subarray', meaning: 'A contiguous slice of an array.' },
  { term: 'Subsequence', meaning: 'Items appearing in original order, not necessarily contiguous.' },
  { term: 'Traversal', meaning: 'Systematically visiting every node in a tree or graph data structure.' },
];
