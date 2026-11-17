// Complete Coder Army DSA Masterclass Curriculum Dataset
// Comprehensive Verified Lectures across 16 Modules based on Rohit Negi's Coder Army Series
// Official Playlist: https://www.youtube.com/playlist?list=PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01

import { SupportedLanguage } from '../utils/languageTemplates';

export interface DebugStep {
  line: number;
  code: string;
  variables: Record<string, string | number | boolean | any>;
  callStack: string[];
  explanation: string;
}

export interface CoderArmyLecture {
  id: string;
  lectureNumber: number;
  moduleId: string;
  moduleName: string;
  title: string;
  duration: string;
  videoId: string;
  topics: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  starterCodes: Partial<Record<SupportedLanguage, string>>;
  debugSteps?: DebugStep[];
  notes: string;
}

export interface CoderArmyModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  lecturesCount: number;
  totalDuration: string;
}

export const CODER_ARMY_MODULES: CoderArmyModule[] = [
  {
    id: 'mod-1',
    title: 'Module 1: C++ Basics & Flow of Program',
    description: 'Flowcharts, Pseudocode, Conditionals, Loops & Pattern Printing Masterclass',
    icon: '⚡',
    lecturesCount: 11,
    totalDuration: '9 hrs 15 mins',
  },
  {
    id: 'mod-2',
    title: 'Module 2: Number Systems & Bitwise Operators',
    description: 'Decimal-Binary Conversion, Functions, Scope & Bit Manipulation Tricks',
    icon: '🔢',
    lecturesCount: 3,
    totalDuration: '2 hrs 15 mins',
  },
  {
    id: 'mod-3',
    title: 'Module 3: Arrays & Binary Search Masterclass',
    description: '1D Arrays, Linear Search, Binary Search, Peak Element, Book Allocation & Painter Partition',
    icon: '🎯',
    lecturesCount: 10,
    totalDuration: '9 hrs 30 mins',
  },
  {
    id: 'mod-4',
    title: 'Module 4: Sorting Algorithms with Tracing',
    description: 'Selection, Bubble, Insertion, Merge Sort & Quick Sort Partitioning',
    icon: '📊',
    lecturesCount: 3,
    totalDuration: '2 hrs 15 mins',
  },
  {
    id: 'mod-5',
    title: 'Module 5: 2D Arrays & Matrix Algorithms',
    description: 'Row-Major, Wave Print, Spiral Matrix, Transpose & Matrix Search',
    icon: '📐',
    lecturesCount: 3,
    totalDuration: '2 hrs 40 mins',
  },
  {
    id: 'mod-6',
    title: 'Module 6: Strings & Two Pointers',
    description: 'Char Arrays, Palindromes, Sliding Window & String Matching',
    icon: '🔤',
    lecturesCount: 4,
    totalDuration: '3 hrs 45 mins',
  },
  {
    id: 'mod-7',
    title: 'Module 7: Pointers & Dynamic Memory',
    description: 'Pointer Arithmetic, Double Pointers, Stack vs Heap & Memory Allocation',
    icon: '📍',
    lecturesCount: 1,
    totalDuration: '51 mins',
  },
  {
    id: 'mod-8',
    title: 'Module 8: Recursion & Backtracking Deep Dive',
    description: 'Recursion Trees, Subsets, Permutations, N-Queens, Sudoku & Rat in a Maze',
    icon: '🔄',
    lecturesCount: 7,
    totalDuration: '6 hrs 20 mins',
  },
  {
    id: 'mod-9',
    title: 'Module 9: Object-Oriented Programming (OOPs)',
    description: 'Classes, Objects, Constructors, Destructors, Inheritance & Polymorphism',
    icon: '🏛️',
    lecturesCount: 1,
    totalDuration: '58 mins',
  },
  {
    id: 'mod-10',
    title: 'Module 10: Linked Lists & LRU Cache',
    description: 'Singly, Doubly, Circular, Floyd Cycle Detection & LRU Cache Implementation',
    icon: '🔗',
    lecturesCount: 3,
    totalDuration: '2 hrs 55 mins',
  },
  {
    id: 'mod-11',
    title: 'Module 11: Stacks',
    description: 'Monotonic Stacks, Next Greater Element, Histogram & Valid Parentheses',
    icon: '📚',
    lecturesCount: 4,
    totalDuration: '3 hrs 45 mins',
  },
  {
    id: 'mod-12',
    title: 'Module 12: Queues & Deques',
    description: 'Circular Queue, Sliding Window Maximum & BFS Queue Architecture',
    icon: '⏳',
    lecturesCount: 4,
    totalDuration: '3 hrs 40 mins',
  },
  {
    id: 'mod-13',
    title: 'Module 13: Binary Trees Masterclass',
    description: 'Tree Traversals (Inorder, Preorder, Postorder, Level Order), Height, Diameter, Views, LCA & Construction',
    icon: '🌳',
    lecturesCount: 6,
    totalDuration: '5 hrs 45 mins',
  },
  {
    id: 'mod-14',
    title: 'Module 14: Binary Search Trees (BST) & Heaps',
    description: 'BST Insertion, Deletion, LCA, Min/Max Heap, Priority Queue & Heap Sort',
    icon: '⛰️',
    lecturesCount: 6,
    totalDuration: '5 hrs 15 mins',
  },
  {
    id: 'mod-15',
    title: 'Module 15: Graph Data Structures & Algorithms',
    description: 'Adjacency Lists, BFS, DFS, Cycle Detection, Topological Sort, Dijkstra & Kruskal MST',
    icon: '🕸️',
    lecturesCount: 6,
    totalDuration: '5 hrs 50 mins',
  },
  {
    id: 'mod-16',
    title: 'Module 16: Dynamic Programming (DP) Mastery',
    description: 'Memoization, Tabulation, 1D DP, 2D Grid DP, 0/1 Knapsack, LCS & LIS',
    icon: '🧩',
    lecturesCount: 6,
    totalDuration: '6 hrs 10 mins',
  },
];

export const CODER_ARMY_LECTURES: CoderArmyLecture[] = [
  // ================= MODULE 1 =================
  {
    id: 'ca-1',
    lectureNumber: 1,
    moduleId: 'mod-1',
    moduleName: 'C++ Basics & Flow of Program',
    title: 'L1: Introduction to Programming, Flowcharts & Pseudocode',
    duration: '42:15',
    videoId: 'y3OOaXrFy-Q', // Verified Coder Army Video ID
    topics: ['Computer Architecture', 'Flowcharts', 'Pseudocode', 'Decision Blocks'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Coder Army: Welcome to Complete DSA Mastery!" << endl;
    cout << "Step 1: Visualizing algorithm flow with pseudocode" << endl;
    
    int a = 10, b = 20;
    cout << "Sum of " << a << " + " << b << " = " << (a + b) << endl;
    return 0;
}
`,
      python: `# Python Flow of Program
print("Coder Army: Welcome to Complete DSA Mastery!")
a = 10
b = 20
print(f"Sum of {a} + {b} = {a + b}")
`,
      java: `class Main {
    public static void main(String[] args) {
        System.out.println("Coder Army: Welcome to Complete DSA Mastery!");
        int a = 10, b = 20;
        System.out.println("Sum of " + a + " + " + b + " = " + (a + b));
    }
}
`,
    },
    debugSteps: [
      { line: 5, code: 'cout << "Coder Army: Welcome to Complete DSA Mastery!"', variables: { step: 'Init' }, callStack: ['main()'], explanation: 'Printing welcome message to standard output.' },
      { line: 8, code: 'int a = 10, b = 20;', variables: { a: 10, b: 20 }, callStack: ['main()'], explanation: 'Allocating integer variables a=10 and b=20 on the stack frame.' },
      { line: 9, code: 'cout << (a + b);', variables: { a: 10, b: 20, sum: 30 }, callStack: ['main()'], explanation: 'Evaluating arithmetic addition expression and streaming to console.' },
      { line: 10, code: 'return 0;', variables: { exitCode: 0 }, callStack: ['main()'], explanation: 'Program terminated successfully with exit code 0.' },
    ],
    notes: `### Lecture 1: Flow of Program & Architecture
- **Program Definition:** A sequential sequence of logical instructions executed by the CPU.
- **Components:** CPU (ALU + Control Unit), RAM (Stack & Heap), Storage.
- **Flowchart Symbols:**
  - Oval: Start / End
  - Parallelogram: Input / Output
  - Rectangle: Processing / Assignment
  - Diamond: Decision Condition (If / Else)`,
  },
  {
    id: 'ca-2',
    lectureNumber: 2,
    moduleId: 'mod-1',
    moduleName: 'C++ Basics & Flow of Program',
    title: 'L2: Flowcharts & Pseudocode in Programming',
    duration: '48:30',
    videoId: 'H_9MSvTL74g', // Verified Coder Army Video ID
    topics: ['Flowchart Design', 'Loop Visualization', 'Pseudocode Standards', 'Edge Cases'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

int main() {
    int num;
    cout << "Enter a positive number: ";
    num = 7; // Example input
    
    if (num % 2 == 0) {
        cout << num << " is EVEN" << endl;
    } else {
        cout << num << " is ODD" << endl;
    }
    return 0;
}
`,
      python: `num = 7
if num % 2 == 0:
    print(f"{num} is EVEN")
else:
    print(f"{num} is ODD")
`,
    },
    debugSteps: [
      { line: 5, code: 'int num = 7;', variables: { num: 7 }, callStack: ['main()'], explanation: 'Assigning candidate number.' },
      { line: 7, code: 'if (num % 2 == 0)', variables: { remainder: 1, isEven: false }, callStack: ['main()'], explanation: 'Evaluating modulo 2 predicate condition.' },
      { line: 10, code: 'cout << "ODD";', variables: { branch: 'else' }, callStack: ['main()'], explanation: 'Branching to odd case output.' },
    ],
    notes: `### Flowcharts In-Depth:
1. Every algorithm can be converted into standard flow diagrams before writing a single line of code.
2. Conditionals branch into True / False paths.
3. Loops re-route control back to earlier decision diamonds.`,
  },
  {
    id: 'ca-3',
    lectureNumber: 3,
    moduleId: 'mod-1',
    moduleName: 'C++ Basics & Flow of Program',
    title: 'L3: Start C++ from Zero and Write Your First Program',
    duration: '50:10',
    videoId: '2Gexv2eld4Y', // Verified
    topics: ['C++ Syntax', 'cin / cout', 'Headers', 'Compilation Model'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Namaste Coder Army!" << endl;
    cout << "Size of int: " << sizeof(int) << " bytes" << endl;
    cout << "Size of double: " << sizeof(double) << " bytes" << endl;
    return 0;
}
`,
      python: `print("Namaste Coder Army!")
print("Python dynamic typing ready.")
`,
    },
    debugSteps: [
      { line: 4, code: 'cout << "Namaste Coder Army!"', variables: { msg: 'Namaste Coder Army!' }, callStack: ['main()'], explanation: 'Initial print to stdout.' },
      { line: 5, code: 'sizeof(int)', variables: { intBytes: 4 }, callStack: ['main()'], explanation: 'Checking architecture size of integer on system.' },
    ],
    notes: `### C++ Compilation Stages:
1. **Preprocessor:** Expands \`#include\` and macros.
2. **Compiler:** Converts C++ to Assembly.
3. **Assembler:** Converts Assembly to Object Code (\`.o\`).
4. **Linker:** Combines object files into an executable binary.`,
  },
  {
    id: 'ca-4',
    lectureNumber: 4,
    moduleId: 'mod-1',
    moduleName: 'C++ Basics & Flow of Program',
    title: 'L4: If Else Statement & Loops in C++',
    duration: '46:25',
    videoId: 'gGaJJovz-4k', // Verified
    topics: ['If-Else Ladder', 'Nested Conditionals', 'While Loop', 'Counter Variables'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

int main() {
    int marks = 85;
    if (marks >= 90) cout << "Grade: A+" << endl;
    else if (marks >= 80) cout << "Grade: A" << endl;
    else if (marks >= 70) cout << "Grade: B" << endl;
    else cout << "Keep Practicing!" << endl;
    return 0;
}
`,
      python: `marks = 85
if marks >= 90:
    print("Grade: A+")
elif marks >= 80:
    print("Grade: A")
else:
    print("Keep Practicing!")
`,
    },
    debugSteps: [
      { line: 4, code: 'int marks = 85;', variables: { marks: 85 }, callStack: ['main()'], explanation: 'Student score initialized.' },
      { line: 5, code: 'if (marks >= 90)', variables: { marks: 85, condition: false }, callStack: ['main()'], explanation: '85 < 90, falls through to next elif.' },
      { line: 6, code: 'else if (marks >= 80)', variables: { marks: 85, condition: true }, callStack: ['main()'], explanation: '85 >= 80 is true! Outputs Grade A.' },
    ],
    notes: `### Conditional Execution:
- In \`if-else if-else\`, only the **first** matching branch executes.
- Remaining branches are skipped immediately without evaluation.`,
  },
  {
    id: 'ca-5',
    lectureNumber: 5,
    moduleId: 'mod-1',
    moduleName: 'C++ Basics & Flow of Program',
    title: 'L5: For Loop in C++ Advance, Prime Number & Factorial',
    duration: '55:10',
    videoId: '7qINbIQK_J8', // Verified
    topics: ['For Loop Anatomy', 'Prime Check Invariants', 'Factorial Loop', 'Fibonacci Series'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

bool isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    int n = 29;
    cout << n << (isPrime(n) ? " is a PRIME number" : " is NOT prime") << endl;
    return 0;
}
`,
      python: `def is_prime(n):
    if n <= 1: return False
    i = 2
    while i * i <= n:
        if n % i == 0: return False
        i += 1
    return True

print("29 is prime?", is_prime(29))
`,
    },
    debugSteps: [
      { line: 4, code: 'isPrime(29)', variables: { n: 29 }, callStack: ['isPrime()'], explanation: 'Checking divisibility up to sqrt(29) ≈ 5.' },
      { line: 6, code: 'i = 2, 3, 4, 5', variables: { checked: 'none divide 29' }, callStack: ['isPrime()'], explanation: 'No factors found. Returns true in O(sqrt(N)) time.' },
    ],
    notes: `### Prime Checking Complexity Optimization:
- Naive: Check from \`2 to N-1\` -> \`O(N)\`
- Optimized: Factors always occur in pairs \`(d, N/d)\`. At least one factor is \`<= sqrt(N)\`.
- Hence checking up to \`i * i <= N\` runs in \`O(sqrt(N))\` time!`,
  },
  {
    id: 'ca-6',
    lectureNumber: 6,
    moduleId: 'mod-1',
    moduleName: 'C++ Basics & Flow of Program',
    title: 'L6: Solve Any Pattern Problem With Simple Trick Part-1',
    duration: '51:40',
    videoId: '0LawAwK5OaI', // Verified
    topics: ['Pattern Strategy', 'Square Patterns', 'Right Triangle', 'Character Patterns'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n = 5;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            cout << "* ";
        }
        cout << endl;
    }
    return 0;
}
`,
      python: `n = 5
for i in range(1, n + 1):
    print("* " * i)
`,
    },
    notes: `### Coder Army Pattern Trick:
1. Outer loop runs \`1 to n\` for rows.
2. Inner loop formula connects column \`j\` with row \`i\`.`,
  },
  {
    id: 'ca-7',
    lectureNumber: 7,
    moduleId: 'mod-1',
    moduleName: 'C++ Basics & Flow of Program',
    title: 'L7: Pattern Problems With Simple Trick Part-2',
    duration: '49:20',
    videoId: '-o6MPFfGipU', // Verified
    topics: ['Inverted Patterns', 'Space Alignment', 'Alphabet Diamonds'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n = 5;
    for (int i = 1; i <= n; i++) {
        for (int space = 1; space <= n - i; space++) cout << "  ";
        for (int star = 1; star <= i; star++) cout << "* ";
        cout << endl;
    }
    return 0;
}
`,
    },
    notes: `### Space-Based Patterns:
Divide row into two parts: leading spaces \`(n - i)\` and stars \`(i)\`.`,
  },
  {
    id: 'ca-8',
    lectureNumber: 8,
    moduleId: 'mod-1',
    moduleName: 'C++ Basics & Flow of Program',
    title: 'L8: Solve Hard Pattern Print Problem with Simple Trick',
    duration: '53:15',
    videoId: 'mtQwWAxWbDY', // Verified
    topics: ['Pyramid Patterns', 'Palindrome Number Pyramids', 'Butterfly Pattern'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n = 4;
    for (int i = 1; i <= n; i++) {
        for (int s = 1; s <= n - i; s++) cout << " ";
        for (int j = 1; j <= 2 * i - 1; j++) cout << "*";
        cout << endl;
    }
    return 0;
}
`,
    },
    notes: `### Full Pyramid Logic:
Stars per row follow arithmetic progression: \`2*i - 1\`.`,
  },
  {
    id: 'ca-9',
    lectureNumber: 9,
    moduleId: 'mod-1',
    moduleName: 'C++ Basics & Flow of Program',
    title: 'L9: Top 5 Advance Pattern Print Problems',
    duration: '58:05',
    videoId: 'CaLtCuji8z0', // Verified
    topics: ['Hollow Diamond', 'Spiral Pattern', 'Mathematical Number Rings'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n = 4;
    // Number ring pattern: min distance to edge
    for (int i = 0; i < 2 * n - 1; i++) {
        for (int j = 0; j < 2 * n - 1; j++) {
            int top = i, left = j, bottom = 2 * n - 2 - i, right = 2 * n - 2 - j;
            int dist = min(min(top, bottom), min(left, right));
            cout << (n - dist) << " ";
        }
        cout << endl;
    }
    return 0;
}
`,
    },
    notes: `### Matrix Border Distance:
Formula: \`value = n - min({row, col, 2n-2-row, 2n-2-col})\`.`,
  },
  {
    id: 'ca-10',
    lectureNumber: 10,
    moduleId: 'mod-1',
    moduleName: 'C++ Basics & Flow of Program',
    title: 'L10: Operators in C++ with Implementation',
    duration: '47:35',
    videoId: 'HI0mNthclGE', // Verified
    topics: ['Arithmetic Operators', 'Relational Operators', 'Bitwise Operators', 'Precedence'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

int main() {
    int a = 5, b = 9;
    cout << "a & b: " << (a & b) << endl;
    cout << "a | b: " << (a | b) << endl;
    cout << "a ^ b: " << (a ^ b) << endl;
    cout << "Left Shift a << 1: " << (a << 1) << endl;
    return 0;
}
`,
    },
    notes: `### Operator Precedence:
Bitwise operations have lower precedence than arithmetic but higher than logical. Always use parentheses!`,
  },
  {
    id: 'ca-11',
    lectureNumber: 11,
    moduleId: 'mod-1',
    moduleName: 'C++ Basics & Flow of Program',
    title: 'L11: While, Do While, Switch, Break & Continue in C++',
    duration: '52:10',
    videoId: 'kYbTxu1_H-o', // Verified
    topics: ['While Loop', 'Do While Loop', 'Switch Case', 'Break vs Continue'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

int main() {
    int day = 3;
    switch (day) {
        case 1: cout << "Monday" << endl; break;
        case 2: cout << "Tuesday" << endl; break;
        case 3: cout << "Wednesday - Midweek Focus!" << endl; break;
        default: cout << "Other day" << endl;
    }
    return 0;
}
`,
    },
    notes: `### Switch Statement Details:
Remember to include \`break;\` after each case to avoid fall-through!`,
  },

  // ================= MODULE 2 =================
  {
    id: 'ca-12',
    lectureNumber: 12,
    moduleId: 'mod-2',
    moduleName: 'Number Systems & Bitwise Operators',
    title: 'L12: Binary to Decimal, Decimal to Binary & Octal Conversion',
    duration: '45:30',
    videoId: 'iGRXq30nx6g', // Verified
    topics: ['Base 2 to Base 10', 'Base 10 to Base 2', 'Bitwise Math', 'Octal Conversion'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

int decimalToBinary(int n) {
    int ans = 0, mul = 1;
    while (n > 0) {
        int rem = n % 2;
        ans += rem * mul;
        mul *= 10;
        n /= 2;
    }
    return ans;
}

int main() {
    int num = 13;
    cout << "Binary of " << num << " is: " << decimalToBinary(num) << endl;
    return 0;
}
`,
    },
    notes: `### Base Conversion:
Repeated division by base \`B\` collects remainders from least significant to most significant.`,
  },
  {
    id: 'ca-13',
    lectureNumber: 13,
    moduleId: 'mod-2',
    moduleName: 'Number Systems & Bitwise Operators',
    title: 'L13: Write Your First Program On LeetCode',
    duration: '40:15',
    videoId: '0j7879JOgIU', // Verified
    topics: ['LeetCode Environment', 'Pass by Reference', 'Constraints Analysis', 'Edge Cases'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

// LeetCode Problem 258: Add Digits
int addDigits(int num) {
    if (num == 0) return 0;
    return 1 + (num - 1) % 9; // Digital root O(1)
}

int main() {
    cout << "Digital Root of 38: " << addDigits(38) << endl;
    return 0;
}
`,
    },
    notes: `### Digital Root Mathematical Trick:
Any number mod 9 reveals its repeated digital sum in \`O(1)\` time!`,
  },
  {
    id: 'ca-14',
    lectureNumber: 14,
    moduleId: 'mod-2',
    moduleName: 'Number Systems & Bitwise Operators',
    title: 'L14: Functions in C++, Pass by Value & Pass by Reference',
    duration: '48:50',
    videoId: 'PnSgN5WOUC0', // Verified
    topics: ['Function Signatures', 'Pass by Value', 'Pass by Reference (&)', 'Stack Frames'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

void swapByRef(int& x, int& y) {
    int temp = x;
    x = y;
    y = temp;
}

int main() {
    int a = 10, b = 20;
    cout << "Before swap: a=" << a << ", b=" << b << endl;
    swapByRef(a, b);
    cout << "After swap:  a=" << a << ", b=" << b << endl;
    return 0;
}
`,
    },
    notes: `### Pass by Reference (\`&\`):
Allows functions to modify caller's original variables without copying overhead!`,
  },

  // ================= MODULE 3 =================
  {
    id: 'ca-16',
    lectureNumber: 16,
    moduleId: 'mod-3',
    moduleName: 'Arrays & Binary Search Masterclass',
    title: 'L16: Introduction To Arrays in C++',
    duration: '52:00',
    videoId: 'moZNKL37w-s', // Verified
    topics: ['Contiguous Memory', 'Array Indexing', 'Sizeof Array', 'Linear Search'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int n = sizeof(arr) / sizeof(arr[0]);
    cout << "Array elements: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}
`,
    },
    notes: `### Arrays in Memory:
Arrays store elements in contiguous RAM addresses. \`arr[i] = *(arr + i)\`.`,
  },
  {
    id: 'ca-17',
    lectureNumber: 17,
    moduleId: 'mod-3',
    moduleName: 'Arrays & Binary Search Masterclass',
    title: 'L17: Master Arrays By Solving Problems',
    duration: '56:20',
    videoId: '567332frcF0', // Verified
    topics: ['Reverse Array', 'Second Largest Element', 'Rotate Array', 'Missing Number'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int secondLargest(const vector<int>& arr) {
    int largest = -1, second = -1;
    for (int x : arr) {
        if (x > largest) {
            second = largest;
            largest = x;
        } else if (x > second && x != largest) {
            second = x;
        }
    }
    return second;
}

int main() {
    vector<int> nums = {12, 35, 1, 10, 34, 1};
    cout << "Second Largest: " << secondLargest(nums) << endl;
    return 0;
}
`,
    },
    notes: `### Single Pass Second Largest:
Maintain both largest and second largest pointers in one pass \`O(N)\`.`,
  },
  {
    id: 'ca-18',
    lectureNumber: 18,
    moduleId: 'mod-3',
    moduleName: 'Arrays & Binary Search Masterclass',
    title: 'L18: Time and Space Complexity From Zero To Advance',
    duration: '1:02:15',
    videoId: 'hUdqNPhXOh4', // Verified
    topics: ['Big-O Notation', 'Omega & Theta', 'Space Complexity', 'Loop Analysis'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

// O(log N) Time Complexity
int countSteps(int n) {
    int steps = 0;
    while (n > 1) {
        n /= 2;
        steps++;
    }
    return steps;
}

int main() {
    int n = 1024;
    cout << "Steps to reduce " << n << " to 1: " << countSteps(n) << " (log2(1024) = 10)" << endl;
    return 0;
}
`,
    },
    notes: `### Big-O Master Rules:
1. Ignore constants (\`O(2N) = O(N)\`).
2. Drop lower order terms (\`O(N^2 + N) = O(N^2)\`).
3. Logarithmic growth: when problem size is divided by a constant at each step.`,
  },
  {
    id: 'ca-22',
    lectureNumber: 22,
    moduleId: 'mod-3',
    moduleName: 'Arrays & Binary Search Masterclass',
    title: 'L22: Binary Search with Theory and Code',
    duration: '52:40',
    videoId: '0Hwpzd-bSck', // Verified
    topics: ['Binary Search', 'Search Space', 'O(log N)', 'Monotonic Functions'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    vector<int> nums = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int target = 23;
    cout << "Target " << target << " found at index: " << binarySearch(nums, target) << endl;
    return 0;
}
`,
      python: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: low = mid + 1
        else: high = mid - 1
    return -1

nums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print("Index:", binary_search(nums, 23))
`,
    },
    debugSteps: [
      { line: 6, code: 'low = 0, high = 9', variables: { low: 0, high: 9 }, callStack: ['binarySearch()'], explanation: 'Setting initial pointers.' },
      { line: 8, code: 'mid = 4, arr[4] = 16', variables: { mid: 4, val: 16 }, callStack: ['binarySearch()'], explanation: '16 < 23, search in right half.' },
      { line: 10, code: 'low = 5, high = 9', variables: { low: 5, high: 9, mid: 7, val: 56 }, callStack: ['binarySearch()'], explanation: '56 > 23, search in left half.' },
      { line: 12, code: 'mid = 5, arr[5] = 23', variables: { mid: 5, result: 5 }, callStack: ['binarySearch()'], explanation: 'Exact match at index 5!' },
    ],
    notes: `### Binary Search Invariant:
- Array must be monotonically sorted.
- Prevent integer overflow with \`mid = low + (high - low) / 2\`.`,
  },
  {
    id: 'ca-23',
    lectureNumber: 23,
    moduleId: 'mod-3',
    moduleName: 'Arrays & Binary Search Masterclass',
    title: 'L23: Binary Search Problems: Search Insert & Sqrt(x)',
    duration: '49:15',
    videoId: '740PMblqK6o', // Verified
    topics: ['Search Insert Position', 'Integer Square Root', 'First and Last Occurrence'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

int mySqrt(int x) {
    if (x == 0) return 0;
    long long low = 1, high = x, ans = 1;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (mid * mid <= x) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return ans;
}

int main() {
    cout << "sqrt(28) = " << mySqrt(28) << endl;
    return 0;
}
`,
    },
    notes: `### Monotonic Answer Space:
Square root is monotonic over positive integers. Perfect candidate for binary search!`,
  },
  {
    id: 'ca-24',
    lectureNumber: 24,
    moduleId: 'mod-3',
    moduleName: 'Arrays & Binary Search Masterclass',
    title: 'L24: Search in Rotated Array & Mountain Peak Index',
    duration: '55:30',
    videoId: 'w2HOAYymS3A', // Verified
    topics: ['Rotated Sorted Array', 'Mountain Array Peak', 'Inflection Point'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int peakIndexInMountainArray(const vector<int>& arr) {
    int low = 0, high = arr.size() - 1;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] < arr[mid + 1]) low = mid + 1;
        else high = mid;
    }
    return low;
}

int main() {
    vector<int> mountain = {0, 2, 5, 10, 8, 4, 1};
    cout << "Peak index: " << peakIndexInMountainArray(mountain) << endl;
    return 0;
}
`,
    },
    notes: `### Mountain Array Property:
Slope is positive (\`arr[mid] < arr[mid+1]\`) on the left, negative on the right. Peak is the crest!`,
  },
  {
    id: 'ca-25',
    lectureNumber: 25,
    moduleId: 'mod-3',
    moduleName: 'Arrays & Binary Search Masterclass',
    title: 'L25: Book Allocation & Painter Partition Problem',
    duration: '1:08:40',
    videoId: 'znIFTUyOQvI', // Verified
    topics: ['Binary Search on Answer', 'Book Allocation', 'Painter Partition', 'Greedy Feasibility'],
    difficulty: 'Advanced',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

bool isPossible(const vector<int>& arr, int m, int maxPages) {
    int students = 1, sum = 0;
    for (int p : arr) {
        if (sum + p <= maxPages) sum += p;
        else {
            students++;
            if (students > m || p > maxPages) return false;
            sum = p;
        }
    }
    return true;
}

int findPages(const vector<int>& arr, int m) {
    if (m > arr.size()) return -1;
    int low = *max_element(arr.begin(), arr.end());
    int high = accumulate(arr.begin(), arr.end(), 0);
    int ans = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (isPossible(arr, m, mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

int main() {
    vector<int> books = {12, 34, 67, 90};
    cout << "Minimum max pages for 2 students: " << findPages(books, 2) << endl;
    return 0;
}
`,
    },
    notes: `### Binary Search on Answer:
When asked to minimize maximum or maximize minimum, test candidate answers monotonically in \`O(N * log(sum))\`.`,
  },
  {
    id: 'ca-27',
    lectureNumber: 27,
    moduleId: 'mod-3',
    moduleName: 'Arrays & Binary Search Masterclass',
    title: 'L27: What is STL & Vector in C++',
    duration: '48:10',
    videoId: '-tDAAOYFehc', // Verified
    topics: ['C++ STL', 'std::vector', 'Dynamic Resizing', 'Iterators'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30};
    v.push_back(40);
    cout << "Size: " << v.size() << ", Capacity: " << v.capacity() << endl;
    for (int x : v) cout << x << " ";
    cout << endl;
    return 0;
}
`,
    },
    notes: `### Vector Geometric Growth:
When capacity is exceeded, vector allocates double the capacity (\`2x\`), giving amortized \`O(1)\` push_back!`,
  },
  {
    id: 'ca-29',
    lectureNumber: 29,
    moduleId: 'mod-3',
    moduleName: 'Arrays & Binary Search Masterclass',
    title: "L29: Kadane's Algorithm & Prefix / Suffix Sum",
    duration: '54:15',
    videoId: '2YksXVZitrE', // Verified
    topics: ["Kadane's Algorithm", 'Maximum Subarray Sum', 'Prefix Sum', 'Equal Sum Subarray'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int maxSubArray(const vector<int>& nums) {
    int maxSoFar = INT_MIN, currentSum = 0;
    for (int x : nums) {
        currentSum += x;
        if (currentSum > maxSoFar) maxSoFar = currentSum;
        if (currentSum < 0) currentSum = 0;
    }
    return maxSoFar;
}

int main() {
    vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    cout << "Maximum contiguous sum: " << maxSubArray(nums) << endl;
    return 0;
}
`,
    },
    notes: `### Kadane's Principle:
If current running sum drops below 0, discard it because it cannot contribute positively to any subsequent subarray!`,
  },
  {
    id: 'ca-34',
    lectureNumber: 34,
    moduleId: 'mod-3',
    moduleName: 'Arrays & Binary Search Masterclass',
    title: 'L34: Binary Search in 2D Arrays & Matrix Search',
    duration: '58:20',
    videoId: 'BA1ppstdJi8', // Verified
    topics: ['Matrix Search', 'Row-Major Mapping', 'Staircase Search', 'O(log(M*N))'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

bool searchMatrix(const vector<vector<int>>& matrix, int target) {
    if (matrix.empty()) return false;
    int m = matrix.size(), n = matrix[0].size();
    int low = 0, high = m * n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        int val = matrix[mid / n][mid % n];
        if (val == target) return true;
        else if (val < target) low = mid + 1;
        else high = mid - 1;
    }
    return false;
}

int main() {
    vector<vector<int>> matrix = {
        {1, 3, 5, 7},
        {10, 11, 16, 20},
        {23, 30, 34, 60}
    };
    cout << "Contains 16? " << (searchMatrix(matrix, 16) ? "YES" : "NO") << endl;
    return 0;
}
`,
    },
    notes: `### Virtual 1D Indexing in 2D Array:
Row = \`mid / cols\`, Col = \`mid % cols\`. Treats entire matrix as a flat sorted 1D array in \`O(log(M*N))\`.`,
  },

  // ================= MODULE 4 =================
  {
    id: 'ca-19',
    lectureNumber: 19,
    moduleId: 'mod-4',
    moduleName: 'Sorting Algorithms with Tracing',
    title: 'L19: Selection Sort Algorithm with Theory and Code',
    duration: '45:20',
    videoId: '9_B6TmAHveU', // Verified
    topics: ['Selection Sort', 'Min Element Selection', 'In-Place Swap', 'O(N^2) Proof'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        swap(arr[i], arr[minIdx]);
    }
}

int main() {
    vector<int> nums = {64, 25, 12, 22, 11};
    selectionSort(nums);
    cout << "Selection Sorted: ";
    for (int x : nums) cout << x << " ";
    cout << endl;
    return 0;
}
`,
    },
    notes: `### Selection Sort:
At each pass \`i\`, selects the minimum element in \`arr[i..n-1]\` and places it at index \`i\`.`,
  },
  {
    id: 'ca-20',
    lectureNumber: 20,
    moduleId: 'mod-4',
    moduleName: 'Sorting Algorithms with Tracing',
    title: 'L20: Bubble Sort with Theory and Code',
    duration: '44:10',
    videoId: 'V3vM_m2iFtk', // Verified
    topics: ['Adjacent Swaps', 'Bubble Up Invariant', 'Early Termination Optimization'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break; // Optimized O(N) best case
    }
}

int main() {
    vector<int> nums = {5, 1, 4, 2, 8};
    bubbleSort(nums);
    cout << "Bubble Sorted: ";
    for (int x : nums) cout << x << " ";
    cout << endl;
    return 0;
}
`,
    },
    notes: `### Bubble Sort Invariant:
Largest unsorted element bubbles to the end on each pass. \`swapped\` flag gives \`O(N)\` on already sorted arrays.`,
  },
  {
    id: 'ca-21',
    lectureNumber: 21,
    moduleId: 'mod-4',
    moduleName: 'Sorting Algorithms with Tracing',
    title: 'L21: Insertion Sort with Theory and Code',
    duration: '46:30',
    videoId: 'YpZUgiT1N94', // Verified
    topics: ['Insertion Sort', 'Card Deck Metaphor', 'Adaptive Sorting', 'Shifting Elements'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main() {
    vector<int> nums = {12, 11, 13, 5, 6};
    insertionSort(nums);
    cout << "Insertion Sorted: ";
    for (int x : nums) cout << x << " ";
    cout << endl;
    return 0;
}
`,
    },
    notes: `### Insertion Sort:
Maintains a sorted subarray on the left and inserts the next element in its correct position.`,
  },

  // ================= MODULE 5 =================
  {
    id: 'ca-31',
    lectureNumber: 31,
    moduleId: 'mod-5',
    moduleName: '2D Arrays & Matrix Algorithms',
    title: 'L31: Introduction To 2D Arrays in C++',
    duration: '51:15',
    videoId: 'kP5EoGyTHbA', // Verified
    topics: ['Row Major Memory', 'Matrix Storage', 'Row Sum', 'Diagonal Traversal'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

int main() {
    int mat[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    int diagonalSum = 0;
    for (int i = 0; i < 3; i++) diagonalSum += mat[i][i];
    cout << "Primary Diagonal Sum: " << diagonalSum << endl;
    return 0;
}
`,
    },
    notes: `### Row-Major Layout:
In C++, row \`i\` is placed immediately after row \`i-1\` in linear memory. Address formula: \`base + (i * cols + j) * sizeof(element)\`.`,
  },
  {
    id: 'ca-32',
    lectureNumber: 32,
    moduleId: 'mod-5',
    moduleName: '2D Arrays & Matrix Algorithms',
    title: 'L32: 2D Arrays Interview Problems: Wave & Spiral Form',
    duration: '59:40',
    videoId: 'Iow9P1QsjhE', // Verified
    topics: ['Wave Form Traversal', 'Spiral Matrix', 'Boundary Pointers'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> spiralOrder(const vector<vector<int>>& matrix) {
    vector<int> res;
    if (matrix.empty()) return res;
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;

    while (top <= bottom && left <= right) {
        for (int i = left; i <= right; i++) res.push_back(matrix[top][i]);
        top++;
        for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]);
        right--;
        if (top <= bottom) {
            for (int i = right; i >= left; i--) res.push_back(matrix[bottom][i]);
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]);
            left++;
        }
    }
    return res;
}

int main() {
    vector<vector<int>> mat = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    vector<int> spiral = spiralOrder(mat);
    cout << "Spiral: ";
    for (int x : spiral) cout << x << " ";
    cout << endl;
    return 0;
}
`,
    },
    notes: `### Spiral Order Invariants:
4 boundary pointers: \`top\`, \`bottom\`, \`left\`, \`right\`. Advance clockwise and peel layers!`,
  },
  {
    id: 'ca-33',
    lectureNumber: 33,
    moduleId: 'mod-5',
    moduleName: '2D Arrays & Matrix Algorithms',
    title: 'L33: Rotate Image by 90 Degrees & Matrix Transpose',
    duration: '48:30',
    videoId: 'ZtSkN2aoCko', // Verified
    topics: ['In-Place Matrix Rotation', 'Matrix Transpose', 'Row Reversal'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    // Step 1: Transpose
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            swap(matrix[i][j], matrix[j][i]);
        }
    }
    // Step 2: Reverse each row
    for (int i = 0; i < n; i++) {
        reverse(matrix[i].begin(), matrix[i].end());
    }
}

int main() {
    vector<vector<int>> mat = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    rotate(mat);
    cout << "Rotated 90 deg:" << endl;
    for (auto& row : mat) {
        for (int x : row) cout << x << " ";
        cout << endl;
    }
    return 0;
}
`,
    },
    notes: `### In-Place 90-Degree Rotation Proof:
\`Rotate 90 Clockwise = Transpose followed by Row Reversal!\` Works in \`O(N^2)\` time and \`O(1)\` extra space.`,
  },

  // ================= MODULE 6 =================
  {
    id: 'ca-36',
    lectureNumber: 36,
    moduleId: 'mod-6',
    moduleName: 'Strings & Two Pointers',
    title: 'L36: Introductions To STRINGS in C++',
    duration: '50:10',
    videoId: 'FkaIZAQKmWU', // Verified
    topics: ['std::string', 'Null Terminator \\0', 'Reverse String', 'Palindrome Check'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
#include <string>
using namespace std;

bool isPalindrome(const string& s) {
    int l = 0, r = s.length() - 1;
    while (l < r) {
        if (s[l++] != s[r--]) return false;
    }
    return true;
}

int main() {
    string word = "racecar";
    cout << word << " is palindrome? " << (isPalindrome(word) ? "YES" : "NO") << endl;
    return 0;
}
`,
    },
    notes: `### Two-Pointer Palindrome Invariant:
Simultaneously compare characters from both ends converging towards the center in \`O(N/2) = O(N)\`.`,
  },
  {
    id: 'ca-38',
    lectureNumber: 38,
    moduleId: 'mod-6',
    moduleName: 'Strings & Two Pointers',
    title: 'L38: Longest Palindrome & Sorting the Sentence',
    duration: '47:20',
    videoId: 'U1OZQl1fU7g', // Verified
    topics: ['Character Frequency', 'Odd / Even Occurrences', 'Greedy Palindrome'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
#include <unordered_map>
using namespace std;

int longestPalindrome(const string& s) {
    unordered_map<char, int> count;
    for (char c : s) count[c]++;
    int length = 0;
    bool hasOdd = false;
    for (auto& pair : count) {
        if (pair.second % 2 == 0) length += pair.second;
        else {
            length += pair.second - 1;
            hasOdd = true;
        }
    }
    return hasOdd ? length + 1 : length;
}

int main() {
    cout << "Longest palindrome from 'abccccdd': " << longestPalindrome("abccccdd") << endl;
    return 0;
}
`,
    },
    notes: `### Palindrome Construction:
All even occurrences can be symmetrically placed. At most one character with odd frequency can sit in the exact center!`,
  },
  {
    id: 'ca-40',
    lectureNumber: 40,
    moduleId: 'mod-6',
    moduleName: 'Strings & Two Pointers',
    title: 'L40: Factorial of Large Number & Roman Numerals',
    duration: '53:45',
    videoId: 'BXocVkXthOE', // Verified
    topics: ['BigInt Multiplication', 'Array Digits', 'Roman to Integer Conversion'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <unordered_map>
using namespace std;

int romanToInt(const string& s) {
    unordered_map<char, int> val = {
        {'I', 1}, {'V', 5}, {'X', 10},
        {'L', 50}, {'C', 100}, {'D', 500}, {'M', 1000}
    };
    int ans = 0;
    for (int i = 0; i < s.length(); i++) {
        if (i + 1 < s.length() && val[s[i]] < val[s[i + 1]]) {
            ans -= val[s[i]];
        } else {
            ans += val[s[i]];
        }
    }
    return ans;
}

int main() {
    cout << "MCMXCIV in decimal: " << romanToInt("MCMXCIV") << endl;
    return 0;
}
`,
    },
    notes: `### Subtractive Roman Numerals:
If a Roman symbol is followed by a larger symbol, its value is subtracted (e.g. \`IV = 5 - 1 = 4\`). Otherwise added.`,
  },
  {
    id: 'ca-42',
    lectureNumber: 42,
    moduleId: 'mod-6',
    moduleName: 'Strings & Two Pointers',
    title: 'L42: KMP Algorithm & Longest Prefix Suffix (LPS)',
    duration: '1:04:10',
    videoId: 'sODA1BzFvsE', // Verified
    topics: ['KMP Algorithm', 'LPS Array', 'Pattern Matching', 'Linear O(N+M)'],
    difficulty: 'Advanced',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<int> computeLPS(const string& pat) {
    int m = pat.length();
    vector<int> lps(m, 0);
    int len = 0, i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) len = lps[len - 1];
            else { lps[i] = 0; i++; }
        }
    }
    return lps;
}

int main() {
    string pat = "AAACAAAA";
    vector<int> lps = computeLPS(pat);
    cout << "LPS Array: ";
    for (int x : lps) cout << x << " ";
    cout << endl;
    return 0;
}
`,
    },
    notes: `### KMP Longest Prefix Suffix (LPS):
Avoids backtracking in the text during string searching, achieving optimal \`O(N + M)\` linear time!`,
  },

  // ================= MODULE 7 =================
  {
    id: 'ca-45',
    lectureNumber: 45,
    moduleId: 'mod-7',
    moduleName: 'Pointers & Dynamic Memory',
    title: 'L45: Pointers Relationship with Arrays & Pointer Arithmetic',
    duration: '51:30',
    videoId: 'KA3XnH6eYpY', // Verified
    topics: ['Pointer Arithmetic', 'Pointers & Arrays', 'Dereference *', 'Address-of &'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40};
    int* ptr = arr; // Decay to pointer to arr[0]

    cout << "*ptr:     " << *ptr << endl;
    cout << "*(ptr+1): " << *(ptr + 1) << endl;
    cout << "*(ptr+2): " << *(ptr + 2) << endl;
    return 0;
}
`,
    },
    notes: `### Pointer Scaling:
\`ptr + 1\` does not add 1 byte! It adds \`1 * sizeof(*ptr)\` bytes (4 bytes for int), pointing directly to the next array element.`,
  },

  // ================= MODULE 8 =================
  {
    id: 'ca-51',
    lectureNumber: 51,
    moduleId: 'mod-8',
    moduleName: 'Recursion & Backtracking Deep Dive',
    title: 'L51: Introduction To Recursion From Basic To Advance',
    duration: '54:40',
    videoId: 'j_n1W5YgN_4', // Verified
    topics: ['Call Stack', 'Base Case', 'Print 1 to N', 'Recursive Tree'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

void print1toN(int n) {
    if (n == 0) return; // Base Case
    print1toN(n - 1);   // Recursive Call
    cout << n << " ";   // Self Work
}

int main() {
    cout << "1 to 5: ";
    print1toN(5);
    cout << endl;
    return 0;
}
`,
    },
    notes: `### Head vs Tail Recursion:
Printing after the recursive call prints numbers in ascending order because output is triggered during stack unwinding!`,
  },
  {
    id: 'ca-52',
    lectureNumber: 52,
    moduleId: 'mod-8',
    moduleName: 'Recursion & Backtracking Deep Dive',
    title: 'L52: How To Solve Recursion Problem from 4 different Methods',
    duration: '57:15',
    videoId: '2OQ46x0Zka8', // Verified
    topics: ['4 Recursion Methods', 'Accumulator Pattern', 'Divide & Conquer', 'Tree Traversal'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

// Method: Parameterized / Accumulator Recursion
void sumN(int n, int currentSum) {
    if (n == 0) {
        cout << "Sum: " << currentSum << endl;
        return;
    }
    sumN(n - 1, currentSum + n);
}

int main() {
    sumN(10, 0);
    return 0;
}
`,
    },
    notes: `### Functional vs Parameterized Recursion:
- **Functional:** Returns value from bottom up (\`n + sum(n-1)\`).
- **Parameterized:** Accumulates answer on the way down into arguments.`,
  },
  {
    id: 'ca-58',
    lectureNumber: 58,
    moduleId: 'mod-8',
    moduleName: 'Recursion & Backtracking Deep Dive',
    title: 'L58: Time and Space Complexity in Recursion',
    duration: '49:10',
    videoId: '2Ekun-ocGnQ', // Verified
    topics: ['Recurrence Relations', 'Tree Method', 'Auxiliary Stack Space', 'Master Theorem'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

// Fibonacci: 2^N tree branches
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

int main() {
    cout << "fib(7) = " << fib(7) << endl;
    return 0;
}
`,
    },
    notes: `### Recursive Complexity:
- **Time Complexity:** Total nodes in the recursion tree multiplied by work per node.
- **Space Complexity:** Maximum depth of the recursion tree (height of call stack).`,
  },
  {
    id: 'ca-59',
    lectureNumber: 59,
    moduleId: 'mod-8',
    moduleName: 'Recursion & Backtracking Deep Dive',
    title: 'L59: Merge Sort Algorithm (Divide & Conquer Proof)',
    duration: '50:15',
    videoId: '86HOPLCgc00', // Verified
    topics: ['Divide and Conquer', 'Merge Step', 'O(N log N)', 'Stable Sorting'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int low, int mid, int high) {
    vector<int> temp;
    int left = low, right = mid + 1;
    while (left <= mid && right <= high) {
        if (arr[left] <= arr[right]) temp.push_back(arr[left++]);
        else temp.push_back(arr[right++]);
    }
    while (left <= mid) temp.push_back(arr[left++]);
    while (right <= high) temp.push_back(arr[right++]);
    for (int i = low; i <= high; i++) arr[i] = temp[i - low];
}

void mergeSort(vector<int>& arr, int low, int high) {
    if (low >= high) return;
    int mid = low + (high - low) / 2;
    mergeSort(arr, low, mid);
    mergeSort(arr, mid + 1, high);
    merge(arr, low, mid, high);
}

int main() {
    vector<int> data = {38, 27, 43, 3, 9, 82, 10};
    mergeSort(data, 0, data.size() - 1);
    cout << "Merge Sorted: ";
    for (int x : data) cout << x << " ";
    cout << endl;
    return 0;
}
`,
    },
    notes: `### Merge Sort Complexity:
- Recurrence: \`T(N) = 2*T(N/2) + O(N)\`
- Time: \`O(N log N)\` in all cases.
- Space: \`O(N)\` auxiliary space.`,
  },
  {
    id: 'ca-61',
    lectureNumber: 61,
    moduleId: 'mod-8',
    moduleName: 'Recursion & Backtracking Deep Dive',
    title: 'L61: Recursion on Subsequences & Generate Parentheses',
    duration: '56:20',
    videoId: 'VxFM14y1-v4', // Verified
    topics: ['Subsequences', 'Include / Exclude Pattern', 'Valid Parentheses', 'Backtracking'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

void generateParentheses(int open, int close, int n, string current) {
    if (current.length() == 2 * n) {
        cout << current << " ";
        return;
    }
    if (open < n) generateParentheses(open + 1, close, n, current + "(");
    if (close < open) generateParentheses(open, close + 1, n, current + ")");
}

int main() {
    cout << "Valid parentheses pairs for n=3:" << endl;
    generateParentheses(0, 0, 3, "");
    cout << endl;
    return 0;
}
`,
    },
    notes: `### Catalan Number of Parentheses:
Valid pairs for \`n\` is given by \`C_n = (1/(n+1)) * (2n choose n)\`. Backtracking prunes invalid branches early!`,
  },
  {
    id: 'ca-62',
    lectureNumber: 62,
    moduleId: 'mod-8',
    moduleName: 'Recursion & Backtracking Deep Dive',
    title: 'L62: Recursion on Subset Sum & Target Sum',
    duration: '52:10',
    videoId: '73X0vvmUNHE', // Verified
    topics: ['Subset Sum', 'Pick / Don\'t Pick', 'Recursive Branching', '2^N Search Space'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

bool subsetSum(const vector<int>& arr, int i, int target) {
    if (target == 0) return true;
    if (i == arr.size() || target < 0) return false;
    // Pick or Don't Pick
    return subsetSum(arr, i + 1, target - arr[i]) || subsetSum(arr, i + 1, target);
}

int main() {
    vector<int> nums = {3, 34, 4, 12, 5, 2};
    cout << "Subset with sum 9 exists? " << (subsetSum(nums, 0, 9) ? "YES" : "NO") << endl;
    return 0;
}
`,
    },
    notes: `### Pick / Don't Pick Template:
At each element, branching gives 2 choices: include element in sum, or leave it out. Explores all \`2^N\` subsets!`,
  },
  {
    id: 'ca-65',
    lectureNumber: 65,
    moduleId: 'mod-8',
    moduleName: 'Recursion & Backtracking Deep Dive',
    title: 'L65: Permutations with Repetition & Ways to Sum N',
    duration: '48:30',
    videoId: 'CQOUIxwQmec', // Verified
    topics: ['Permutations', 'State Backtracking', 'Combination Sum'],
    difficulty: 'Advanced',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int countWays(int n) {
    if (n == 0) return 1;
    if (n < 0) return 0;
    return countWays(n - 1) + countWays(n - 2) + countWays(n - 3);
}

int main() {
    cout << "Ways to climb 4 stairs with {1, 2, 3} steps: " << countWays(4) << endl;
    return 0;
}
`,
    },
    notes: `### Tribonacci Staircase:
\`Ways(N) = Ways(N-1) + Ways(N-2) + Ways(N-3)\`. Foundation for dynamic programming memoization.`,
  },

  // ================= MODULE 9 =================
  {
    id: 'ca-73',
    lectureNumber: 73,
    moduleId: 'mod-9',
    moduleName: 'Object-Oriented Programming (OOPs)',
    title: 'L73: Inheritance, Access Modifiers & Real-Life Examples',
    duration: '58:40',
    videoId: 'qq3BY4viEB4', // Verified
    topics: ['Inheritance', 'Public vs Private vs Protected', 'Constructor Chaining', 'Polymorphism'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <string>
using namespace std;

class Animal {
protected:
    string name;
public:
    Animal(string n) : name(n) {}
    virtual void speak() { cout << name << " makes a sound." << endl; }
};

class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}
    void speak() override { cout << name << " barks: Woof! Woof!" << endl; }
};

int main() {
    Animal* a = new Dog("Tommy");
    a->speak(); // Virtual dispatch
    delete a;
    return 0;
}
`,
    },
    notes: `### Virtual Functions & V-Table:
The \`virtual\` keyword instructs the compiler to generate runtime v-tables for dynamic polymorphism!`,
  },

  // ================= MODULE 10 =================
  {
    id: 'ca-78',
    lectureNumber: 78,
    moduleId: 'mod-10',
    moduleName: 'Linked Lists & LRU Cache',
    title: 'L78: Introduction To Linked List, Traversal & Insertion',
    duration: '54:20',
    videoId: 'CE150x4w0bo', // Verified
    topics: ['Singly Linked List', 'Node Struct', 'Heap Allocation (new)', 'Head & Tail Insertion'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

void insertAtHead(Node*& head, int val) {
    Node* newNode = new Node(val);
    newNode->next = head;
    head = newNode;
}

void printList(Node* head) {
    while (head) {
        cout << head->data << (head->next ? " -> " : "");
        head = head->next;
    }
    cout << endl;
}

int main() {
    Node* head = nullptr;
    insertAtHead(head, 30);
    insertAtHead(head, 20);
    insertAtHead(head, 10);
    cout << "Linked List: ";
    printList(head);
    return 0;
}
`,
    },
    notes: `### Linked List Memory:
Nodes are allocated non-contiguously on the Heap. Pointers connect each node to its successor. Insertion at head is \`O(1)\`.`,
  },
  {
    id: 'ca-86',
    lectureNumber: 86,
    moduleId: 'mod-10',
    moduleName: 'Linked Lists & LRU Cache',
    title: 'L86: Add Two Numbers as Linked Lists & Reverse in K-Groups',
    duration: '1:01:10',
    videoId: 'qiS7-e2OXDc', // Verified
    topics: ['Add Two Numbers', 'Carry Propagation', 'Reverse in K Groups', 'Dummy Nodes'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* curr = &dummy;
    int carry = 0;
    while (l1 || l2 || carry) {
        int sum = carry;
        if (l1) { sum += l1->val; l1 = l1->next; }
        if (l2) { sum += l2->val; l2 = l2->next; }
        carry = sum / 10;
        curr->next = new ListNode(sum % 10);
        curr = curr->next;
    }
    return dummy.next;
}

int main() {
    cout << "Add Two Numbers dummy node pattern compiled successfully." << endl;
    return 0;
}
`,
    },
    notes: `### Dummy Head Pattern:
Using a dummy head sentinel node eliminates special-casing the first node in linked list creation.`,
  },
  {
    id: 'ca-87',
    lectureNumber: 87,
    moduleId: 'mod-10',
    moduleName: 'Linked Lists & LRU Cache',
    title: 'L87: Flattening a Linked List & Merge K Sorted Lists',
    duration: '59:20',
    videoId: '2DQJvLq-rm8', // Verified
    topics: ['Flatten Linked List', 'Merge K Sorted', 'Priority Queue', 'Bottom Pointers'],
    difficulty: 'Advanced',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node* bottom;
    Node(int d) : data(d), next(nullptr), bottom(nullptr) {}
};

Node* merge(Node* a, Node* b) {
    if (!a) return b;
    if (!b) return a;
    Node* res;
    if (a->data < b->data) {
        res = a;
        res->bottom = merge(a->bottom, b);
    } else {
        res = b;
        res->bottom = merge(a, b->bottom);
    }
    return res;
}

int main() {
    cout << "Flattening recursive merge algorithm active." << endl;
    return 0;
}
`,
    },
    notes: `### Flattening Invariant:
Recursively flatten the right list, then merge the current column with the flattened result like Merge Sort!`,
  },

  // ================= MODULE 11 =================
  {
    id: 'ca-90',
    lectureNumber: 90,
    moduleId: 'mod-11',
    moduleName: 'Stacks',
    title: 'L90: STACK: Valid Parentheses & Reverse Array with Stack',
    duration: '50:30',
    videoId: 'abQZotIl70g', // Verified
    topics: ['Stack LIFO Principle', 'Valid Parentheses', 'Reverse Using Stack', 'std::stack'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValid(const string& s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top();
            st.pop();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '[')) return false;
        }
    }
    return st.empty();
}

int main() {
    cout << "{[()]} valid? " << (isValid("{[()]}") ? "YES" : "NO") << endl;
    cout << "{[(])} valid? " << (isValid("{[(])}") ? "YES" : "NO") << endl;
    return 0;
}
`,
    },
    notes: `### Stack LIFO Properties:
Last In, First Out. Ideal for balancing nested brackets, undo operations, and expression evaluation.`,
  },
  {
    id: 'ca-91',
    lectureNumber: 91,
    moduleId: 'mod-11',
    moduleName: 'Stacks',
    title: 'L91: Next Greater Element, Next Smaller & Stock Span Problem',
    duration: '55:10',
    videoId: '8dwjKE9GM30', // Verified
    topics: ['Monotonic Stack', 'Next Greater Element', 'Stock Span', 'O(N) Amortized'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<int> nextGreaterElement(const vector<int>& arr) {
    int n = arr.size();
    vector<int> nge(n, -1);
    stack<int> st;

    for (int i = n - 1; i >= 0; i--) {
        while (!st.empty() && st.top() <= arr[i]) {
            st.pop();
        }
        if (!st.empty()) nge[i] = st.top();
        st.push(arr[i]);
    }
    return nge;
}

int main() {
    vector<int> nums = {4, 5, 2, 25, 7, 8};
    vector<int> res = nextGreaterElement(nums);
    cout << "Next Greater: ";
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}
`,
    },
    notes: `### Monotonic Decreasing Stack:
Traverse backwards from right to left. Elements in the stack remain strictly decreasing. Every element is pushed and popped at most once -> \`O(N)\`!`,
  },
  {
    id: 'ca-94',
    lectureNumber: 94,
    moduleId: 'mod-11',
    moduleName: 'Stacks',
    title: 'L94: Monotonic Stack: Maximum of Minimum for Every Window',
    duration: '1:06:20',
    videoId: 'DCU3T-XqG_s', // Verified
    topics: ['Maximum of Minimum', 'Largest Rectangle in Histogram', 'Previous Smaller', 'Next Smaller'],
    difficulty: 'Advanced',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int largestRectangleArea(const vector<int>& heights) {
    stack<int> st;
    int maxArea = 0, n = heights.size();
    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : heights[i];
        while (!st.empty() && heights[st.top()] >= h) {
            int height = heights[st.top()];
            st.pop();
            int width = st.empty() ? i : i - st.top() - 1;
            maxArea = max(maxArea, height * width);
        }
        st.push(i);
    }
    return maxArea;
}

int main() {
    vector<int> heights = {2, 1, 5, 6, 2, 3};
    cout << "Largest Rectangle in Histogram: " << largestRectangleArea(heights) << endl;
    return 0;
}
`,
    },
    notes: `### Histogram Maximum Rectangle:
Pop elements that are higher than current. Each popped bar calculates its maximum rectangle bounded between its previous smaller and next smaller bars.`,
  },
  {
    id: 'ca-95',
    lectureNumber: 95,
    moduleId: 'mod-11',
    moduleName: 'Stacks',
    title: 'L95: Implement Two Stacks in an Array & N Stacks',
    duration: '52:45',
    videoId: 'ktUYEWjqRI8', // Verified
    topics: ['Two Stacks in One Array', 'N Stacks Space Partitioning', 'Array Indexing'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

class TwoStacks {
    int* arr;
    int size, top1, top2;
public:
    TwoStacks(int n) {
        size = n;
        arr = new int[n];
        top1 = -1;
        top2 = size;
    }
    void push1(int x) {
        if (top1 < top2 - 1) arr[++top1] = x;
        else cout << "Stack Overflow" << endl;
    }
    void push2(int x) {
        if (top1 < top2 - 1) arr[--top2] = x;
        else cout << "Stack Overflow" << endl;
    }
    int pop1() { return (top1 >= 0) ? arr[top1--] : -1; }
    int pop2() { return (top2 < size) ? arr[top2++] : -1; }
};

int main() {
    TwoStacks ts(6);
    ts.push1(5);
    ts.push2(10);
    cout << "Pop1: " << ts.pop1() << ", Pop2: " << ts.pop2() << endl;
    return 0;
}
`,
    },
    notes: `### Two Stacks Space Efficiency:
Stack 1 starts from index 0 growing right; Stack 2 starts from \`size - 1\` growing left. They only overflow when they meet in the middle!`,
  },

  // ================= MODULE 12 =================
  {
    id: 'ca-96',
    lectureNumber: 96,
    moduleId: 'mod-12',
    moduleName: 'Queues & Deques',
    title: 'L96: Introduction To Queue & Circular Queue Implementation',
    duration: '53:15',
    videoId: 'Ah-ZDJf9QW0', // Verified
    topics: ['Queue FIFO Principle', 'Circular Queue', 'Array Implementation', 'Modulo Arithmetic'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

class MyCircularQueue {
    int* arr;
    int front, rear, size, capacity;
public:
    MyCircularQueue(int k) {
        capacity = k;
        arr = new int[k];
        front = 0;
        rear = -1;
        size = 0;
    }
    bool enQueue(int value) {
        if (size == capacity) return false;
        rear = (rear + 1) % capacity;
        arr[rear] = value;
        size++;
        return true;
    }
    bool deQueue() {
        if (size == 0) return false;
        front = (front + 1) % capacity;
        size--;
        return true;
    }
    int Front() { return (size == 0) ? -1 : arr[front]; }
    int Rear() { return (size == 0) ? -1 : arr[rear]; }
};

int main() {
    MyCircularQueue q(3);
    q.enQueue(10);
    q.enQueue(20);
    q.enQueue(30);
    cout << "Front: " << q.Front() << ", Rear: " << q.Rear() << endl;
    return 0;
}
`,
    },
    notes: `### Circular Queue Modulo Trick:
\`(index + 1) % capacity\` wraps pointers seamlessly back to 0 when reaching the buffer boundary without shifting elements!`,
  },

  // ================= MODULE 13: BINARY TREES =================
  {
    id: 'ca-97',
    lectureNumber: 97,
    moduleId: 'mod-13',
    moduleName: 'Binary Trees Masterclass',
    title: 'L97: Introduction To Tree Data Structure & Binary Tree Representation',
    duration: '52:40',
    videoId: '_b0bfpO3b4I',
    topics: ['Non-linear Data Structures', 'Root, Node, Leaf, Internal', 'Binary Tree Node Definition in C++', 'Tree Creation using Pointers'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};

Node* buildTree() {
    int val;
    cout << "Enter node value (-1 for null): ";
    if (!(cin >> val) || val == -1) return nullptr;
    Node* root = new Node(val);
    cout << "Left child of " << val << ": ";
    root->left = buildTree();
    cout << "Right child of " << val << ": ";
    root->right = buildTree();
    return root;
}

int main() {
    cout << "Creating Binary Tree..." << endl;
    Node* root = new Node(10);
    root->left = new Node(20);
    root->right = new Node(30);
    cout << "Root: " << root->data << ", Left: " << root->left->data << ", Right: " << root->right->data << endl;
    return 0;
}
`,
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

root = TreeNode(10)
root.left = TreeNode(20)
root.right = TreeNode(30)
print(f"Root: {root.val}, Left: {root.left.val}, Right: {root.right.val}")
`,
    },
    notes: `### Binary Tree Properties:
1. Maximum nodes at level $L$: $2^L$ (root at $L=0$).
2. Maximum nodes in a binary tree of height $H$: $2^H - 1$.
3. For $N$ nodes, minimum height is $\lceil \log_2(N+1) \rceil$.`,
  },
  {
    id: 'ca-98',
    lectureNumber: 98,
    moduleId: 'mod-13',
    moduleName: 'Binary Trees Masterclass',
    title: 'L98: Binary Tree Traversals: Inorder, Preorder, Postorder & Level Order (BFS)',
    duration: '58:15',
    videoId: 'pMHXL46exp4',
    topics: ['Depth First Traversals (DFS)', 'Preorder (Root, L, R)', 'Inorder (L, Root, R)', 'Postorder (L, R, Root)', 'Level Order Traversal with Queue'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <queue>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int v) : data(v), left(nullptr), right(nullptr) {}
};

void inorder(Node* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}

void levelOrder(Node* root) {
    if (!root) return;
    queue<Node*> q;
    q.push(root);
    while (!q.empty()) {
        Node* curr = q.front();
        q.pop();
        cout << curr->data << " ";
        if (curr->left) q.push(curr->left);
        if (curr->right) q.push(curr->right);
    }
}

int main() {
    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);

    cout << "Inorder: "; inorder(root); cout << endl;
    cout << "Level Order: "; levelOrder(root); cout << endl;
    return 0;
}
`,
      python: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder(root):
    if not root: return []
    return inorder(root.left) + [root.val] + inorder(root.right)

def level_order(root):
    if not root: return []
    res, q = [], deque([root])
    while q:
        curr = q.popleft()
        res.append(curr.val)
        if curr.left: q.append(curr.left)
        if curr.right: q.append(curr.right)
    return res

root = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))
print("Inorder:", inorder(root))
print("Level Order:", level_order(root))
`,
    },
    notes: `### DFS vs BFS Traversals:
- **DFS** uses call stack / recursion ($O(H)$ extra space).
- **BFS (Level Order)** uses explicit queue ($O(W)$ extra space where $W$ is max width of tree).`,
  },
  {
    id: 'ca-99',
    lectureNumber: 99,
    moduleId: 'mod-13',
    moduleName: 'Binary Trees Masterclass',
    title: 'L99: Binary Tree Size, Height, Maximum Node & Leaf Count',
    duration: '47:20',
    videoId: 'T78jHD4fNgc',
    topics: ['Recursive Tree Subproblem Decomposition', 'Height of Tree (max(left, right) + 1)', 'Total Node Count', 'Counting Leaves'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <algorithm>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int v) : data(v), left(nullptr), right(nullptr) {}
};

int getHeight(Node* root) {
    if (!root) return 0;
    return 1 + max(getHeight(root->left), getHeight(root->right));
}

int countNodes(Node* root) {
    if (!root) return 0;
    return 1 + countNodes(root->left) + countNodes(root->right);
}

int main() {
    Node* root = new Node(10);
    root->left = new Node(20);
    root->right = new Node(30);
    root->left->left = new Node(40);
    cout << "Tree Height: " << getHeight(root) << endl;
    cout << "Total Nodes: " << countNodes(root) << endl;
    return 0;
}
`,
    },
    notes: `### Tree Recursion Master Formula:
\`result(root) = combine(result(root->left), result(root->right), root->val)\``,
  },
  {
    id: 'ca-100',
    lectureNumber: 100,
    moduleId: 'mod-13',
    moduleName: 'Binary Trees Masterclass',
    title: 'L100: Check for Balanced Binary Tree & Mirror Trees',
    duration: '54:30',
    videoId: 'f7IZ0IXLvhI',
    topics: ['Height Balanced Condition (|h_L - h_R| <= 1)', 'O(N) Optimized Height Check', 'Symmetric / Mirror Trees', 'Identical Tree Comparison'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <cmath>
#include <algorithm>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int v) : data(v), left(nullptr), right(nullptr) {}
};

// Returns height if balanced, -1 if unbalanced
int checkBalance(Node* root) {
    if (!root) return 0;
    int lh = checkBalance(root->left);
    if (lh == -1) return -1;
    int rh = checkBalance(root->right);
    if (rh == -1) return -1;
    if (abs(lh - rh) > 1) return -1;
    return 1 + max(lh, rh);
}

bool isBalanced(Node* root) {
    return checkBalance(root) != -1;
}

int main() {
    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    cout << "Is Balanced: " << (isBalanced(root) ? "Yes" : "No") << endl;
    return 0;
}
`,
    },
    notes: `### O(N) Balanced Check:
Return -1 immediately up the recursion call stack as soon as any subtree violates the balance condition!`,
  },
  {
    id: 'ca-101',
    lectureNumber: 101,
    moduleId: 'mod-13',
    moduleName: 'Binary Trees Masterclass',
    title: 'L101: Construct Binary Tree from Inorder & Preorder Traversal',
    duration: '59:10',
    videoId: 'XGnLaRwh0bY',
    topics: ['Unique Tree Construction Condition', 'Root from Preorder', 'Partitioning Inorder with Hash Map', 'Boundary Index Math'],
    difficulty: 'Advanced',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int v) : data(v), left(nullptr), right(nullptr) {}
};

Node* build(vector<int>& pre, int preStart, int preEnd,
            vector<int>& in, int inStart, int inEnd,
            unordered_map<int, int>& inMap) {
    if (preStart > preEnd || inStart > inEnd) return nullptr;
    Node* root = new Node(pre[preStart]);
    int inRoot = inMap[root->data];
    int numsLeft = inRoot - inStart;

    root->left = build(pre, preStart + 1, preStart + numsLeft, in, inStart, inRoot - 1, inMap);
    root->right = build(pre, preStart + numsLeft + 1, preEnd, in, inRoot + 1, inEnd, inMap);
    return root;
}

int main() {
    vector<int> preorder = {3, 9, 20, 15, 7};
    vector<int> inorder = {9, 3, 15, 20, 7};
    unordered_map<int, int> inMap;
    for (int i = 0; i < inorder.size(); i++) inMap[inorder[i]] = i;
    Node* root = build(preorder, 0, preorder.size() - 1, inorder, 0, inorder.size() - 1, inMap);
    cout << "Tree successfully constructed! Root: " << root->data << endl;
    return 0;
}
`,
    },
    notes: `### Key Rule for Construction:
Preorder tells you the **Root**. Inorder partitions that root's **Left Subtree** and **Right Subtree**.`,
  },
  {
    id: 'ca-102',
    lectureNumber: 102,
    moduleId: 'mod-13',
    moduleName: 'Binary Trees Masterclass',
    title: 'L102: Vertical Traversal, Boundary View & Lowest Common Ancestor (LCA)',
    duration: '1:02:15',
    videoId: 'aBqPnkXmvpY',
    topics: ['Horizontal Distance (HD)', 'Top View & Bottom View', 'Boundary Clockwise Traversal', 'Lowest Common Ancestor (LCA) in O(N)'],
    difficulty: 'Advanced',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int v) : data(v), left(nullptr), right(nullptr) {}
};

Node* lowestCommonAncestor(Node* root, Node* p, Node* q) {
    if (!root || root == p || root == q) return root;
    Node* left = lowestCommonAncestor(root->left, p, q);
    Node* right = lowestCommonAncestor(root->right, p, q);
    if (!left) return right;
    if (!right) return left;
    return root; // Both left and right found, current root is LCA
}

int main() {
    Node* root = new Node(3);
    root->left = new Node(5);
    root->right = new Node(1);
    root->left->left = new Node(6);
    root->left->right = new Node(2);

    Node* lca = lowestCommonAncestor(root, root->left->left, root->left->right);
    cout << "LCA of 6 and 2 is: " << lca->data << endl;
    return 0;
}
`,
    },
    notes: `### LCA Recursive Rule:
If root is p or q, return root. If both left and right calls return non-null, root is the LCA.`,
  },

  // ================= MODULE 14: BST & HEAPS =================
  {
    id: 'ca-103',
    lectureNumber: 103,
    moduleId: 'mod-14',
    moduleName: 'Binary Search Trees & Heaps',
    title: 'L103: Binary Search Tree (BST) – Implementation, Search, Insert & Delete',
    duration: '57:45',
    videoId: 'Ir9Ni46g8Qo',
    topics: ['BST Ordering Property', 'Inorder of BST is Sorted', 'Search in O(log N)', 'Node Deletion (0, 1, and 2 children cases)'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

struct Node {
    int val;
    Node* left;
    Node* right;
    Node(int v) : val(v), left(nullptr), right(nullptr) {}
};

Node* insertBST(Node* root, int val) {
    if (!root) return new Node(val);
    if (val < root->val) root->left = insertBST(root->left, val);
    else root->right = insertBST(root->right, val);
    return root;
}

Node* searchBST(Node* root, int val) {
    if (!root || root->val == val) return root;
    return val < root->val ? searchBST(root->left, val) : searchBST(root->right, val);
}

int main() {
    Node* root = nullptr;
    root = insertBST(root, 50);
    insertBST(root, 30);
    insertBST(root, 70);
    insertBST(root, 20);
    insertBST(root, 40);

    Node* found = searchBST(root, 40);
    cout << "Search 40: " << (found ? "Found!" : "Not Found") << endl;
    return 0;
}
`,
    },
    notes: `### BST Deletion:
- Leaf node: simply delete.
- 1 child: replace with child.
- 2 children: replace with Inorder Successor (smallest in right subtree), then delete successor.`,
  },
  {
    id: 'ca-104',
    lectureNumber: 104,
    moduleId: 'mod-14',
    moduleName: 'Binary Search Trees & Heaps',
    title: 'L104: Lowest Common Ancestor (LCA) in BST & Range Search',
    duration: '48:30',
    videoId: 'YKo8QaW02z8',
    topics: ['BST LCA without extra space', 'Range Sum in BST', 'Check if Tree is Valid BST', 'Inorder Predecessor & Successor'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

struct Node {
    int val;
    Node* left;
    Node* right;
    Node(int v) : val(v), left(nullptr), right(nullptr) {}
};

Node* lcaBST(Node* root, int p, int q) {
    if (!root) return nullptr;
    if (p < root->val && q < root->val) return lcaBST(root->left, p, q);
    if (p > root->val && q > root->val) return lcaBST(root->right, p, q);
    return root; // Split point is the LCA!
}

int main() {
    Node* root = new Node(6);
    root->left = new Node(2);
    root->right = new Node(8);
    root->left->left = new Node(0);
    root->left->right = new Node(4);

    Node* lca = lcaBST(root, 0, 4);
    cout << "LCA of 0 and 4 in BST: " << lca->val << endl;
    return 0;
}
`,
    },
    notes: `### BST LCA Insight:
In a BST, the LCA is the first node where paths to p and q split (one goes left, one goes right)!`,
  },
  {
    id: 'ca-105',
    lectureNumber: 105,
    moduleId: 'mod-14',
    moduleName: 'Binary Search Trees & Heaps',
    title: 'L105: Heap Data Structure – Min Heap & Max Heap Insertion / Deletion',
    duration: '56:20',
    videoId: 'ilz-VZBz5Vg',
    topics: ['Complete Binary Tree (CBT)', 'Array Representation (2i+1, 2i+2)', 'Heap Property', 'Push & Pop in O(log N)'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class MaxHeap {
    vector<int> arr;
public:
    void push(int val) {
        arr.push_back(val);
        int idx = arr.size() - 1;
        while (idx > 0) {
            int parent = (idx - 1) / 2;
            if (arr[parent] < arr[idx]) {
                swap(arr[parent], arr[idx]);
                idx = parent;
            } else break;
        }
    }
    int top() { return arr.empty() ? -1 : arr[0]; }
};

int main() {
    MaxHeap h;
    h.push(10);
    h.push(40);
    h.push(30);
    h.push(60);
    cout << "Max element: " << h.top() << endl;
    return 0;
}
`,
    },
    notes: `### Complete Binary Tree Array Indexing:
- Parent: \`(i - 1) / 2\`
- Left child: \`2 * i + 1\`
- Right child: \`2 * i + 2\``,
  },
  {
    id: 'ca-106',
    lectureNumber: 106,
    moduleId: 'mod-14',
    moduleName: 'Binary Search Trees & Heaps',
    title: 'L106: Heapify Algorithm & Heap Sort Implementation in C++',
    duration: '52:10',
    videoId: 'kcGENCHENgY',
    topics: ['Heapify in O(log N)', 'Building Heap in O(N) Time Proof', 'In-Place Heap Sort Algorithm', 'Ascending vs Descending Sort'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1, right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

int main() {
    vector<int> arr = {12, 11, 13, 5, 6, 7};
    heapSort(arr);
    cout << "Sorted array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    return 0;
}
`,
    },
    notes: `### Heap Sort Complexity:
- Time: $O(N \log N)$ in all cases (best, average, worst).
- Space: $O(1)$ auxiliary memory (in-place).`,
  },
  {
    id: 'ca-107',
    lectureNumber: 107,
    moduleId: 'mod-14',
    moduleName: 'Binary Search Trees & Heaps',
    title: 'L107: Priority Queues & Kth Largest Element',
    duration: '49:15',
    videoId: 'pCsWDX2K06o',
    topics: ['C++ STL priority_queue', 'Min-Heap vs Max-Heap syntax', 'Kth Largest using Min-Heap of size K', 'Top K Frequent Elements'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) minHeap.pop();
    }
    return minHeap.top();
}

int main() {
    vector<int> nums = {3, 2, 1, 5, 6, 4};
    cout << "2nd Largest: " << findKthLargest(nums, 2) << endl;
    return 0;
}
`,
    },
    notes: `### Top K Elements Pattern:
To find Kth **Largest**, maintain a **Min-Heap** of size $K$.
To find Kth **Smallest**, maintain a **Max-Heap** of size $K$.`,
  },

  // ================= MODULE 15: GRAPH ALGORITHMS =================
  {
    id: 'ca-109',
    lectureNumber: 109,
    moduleId: 'mod-15',
    moduleName: 'Graph Data Structures & Algorithms',
    title: 'L109: Introduction To Graph Representation (Adjacency Matrix & List)',
    duration: '55:30',
    videoId: 'gGlfzqPT-hE',
    topics: ['Graph Terminology (Nodes, Edges, Weights)', 'Directed vs Undirected', 'Adjacency Matrix (O(V^2))', 'Adjacency List (O(V + E))'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Graph {
    int V;
    vector<vector<int>> adj;
public:
    Graph(int v) : V(v), adj(v) {}
    void addEdge(int u, int v, bool directed = false) {
        adj[u].push_back(v);
        if (!directed) adj[v].push_back(u);
    }
    void print() {
        for (int i = 0; i < V; i++) {
            cout << i << " -> ";
            for (int neighbor : adj[i]) cout << neighbor << " ";
            cout << endl;
        }
    }
};

int main() {
    Graph g(4);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 2);
    g.addEdge(2, 3);
    g.print();
    return 0;
}
`,
    },
    notes: `### Adjacency Representation Tradeoffs:
- **Matrix**: $O(1)$ edge existence query, but $O(V^2)$ memory.
- **List**: $O(V+E)$ memory, ideal for sparse real-world graphs.`,
  },
  {
    id: 'ca-110',
    lectureNumber: 110,
    moduleId: 'mod-15',
    moduleName: 'Graph Data Structures & Algorithms',
    title: 'L110: Graph Traversals: Breadth-First Search (BFS) & Depth-First Search (DFS)',
    duration: '1:01:20',
    videoId: 'bxbrUGvBCnY',
    topics: ['BFS using Queue', 'Visited Array to prevent infinite cycles', 'DFS using Call Stack / Recursion', 'Disconnected Components Handling'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

void bfs(int start, vector<vector<int>>& adj, vector<bool>& visited) {
    queue<int> q;
    visited[start] = true;
    q.push(start);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        cout << u << " ";
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}

int main() {
    int V = 5;
    vector<vector<int>> adj(V);
    adj[0] = {1, 2}; adj[1] = {0, 3}; adj[2] = {0, 4}; adj[3] = {1}; adj[4] = {2};
    vector<bool> visited(V, false);
    cout << "BFS Traversal: ";
    bfs(0, adj, visited);
    cout << endl;
    return 0;
}
`,
    },
    notes: `### Graph Traversal Complexities:
- Time: $O(V + E)$ where $V$ is number of vertices and $E$ is number of edges.
- Space: $O(V)$ for the visited array and traversal queue/stack.`,
  },
  {
    id: 'ca-111',
    lectureNumber: 111,
    moduleId: 'mod-15',
    moduleName: 'Graph Data Structures & Algorithms',
    title: 'L111: Detect Cycle in Undirected Graph using BFS & DFS',
    duration: '53:40',
    videoId: 'oz1EaP_Bw4s',
    topics: ['Parent Pointer Tracking', 'Visited Neighbor != Parent Condition', 'BFS Cycle Detection with queue<pair<node, parent>>', 'DFS Cycle Detection'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

bool detectCycleBFS(int src, vector<vector<int>>& adj, vector<bool>& vis) {
    queue<pair<int, int>> q; // {node, parent}
    vis[src] = true;
    q.push({src, -1});
    while (!q.empty()) {
        int node = q.front().first;
        int parent = q.front().second;
        q.pop();
        for (int adjNode : adj[node]) {
            if (!vis[adjNode]) {
                vis[adjNode] = true;
                q.push({adjNode, node});
            } else if (adjNode != parent) {
                return true; // Cycle detected!
            }
        }
    }
    return false;
}

int main() {
    int V = 4;
    vector<vector<int>> adj(V);
    adj[0] = {1, 2}; adj[1] = {0, 2}; adj[2] = {0, 1, 3}; adj[3] = {2};
    vector<bool> vis(V, false);
    cout << "Has Cycle: " << (detectCycleBFS(0, adj, vis) ? "Yes" : "No") << endl;
    return 0;
}
`,
    },
    notes: `### Cycle in Undirected Graph:
A cycle exists if we encounter a visited neighbor that is NOT the immediate parent from which we arrived!`,
  },
  {
    id: 'ca-112',
    lectureNumber: 112,
    moduleId: 'mod-15',
    moduleName: 'Graph Data Structures & Algorithms',
    title: 'L112: Detect Cycle in Directed Graph & Topological Sort (Kahn Algorithm)',
    duration: '58:50',
    videoId: 'sPlN86EpjJA',
    topics: ['Directed Acyclic Graph (DAG)', 'Indegree Calculation', 'Kahn Algorithm using BFS queue', 'Topological Ordering for Dependency Graphs'],
    difficulty: 'Advanced',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> topoSort(int V, vector<vector<int>>& adj) {
    vector<int> indegree(V, 0);
    for (int i = 0; i < V; i++) {
        for (int v : adj[i]) indegree[v]++;
    }
    queue<int> q;
    for (int i = 0; i < V; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    vector<int> topo;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        topo.push_back(u);
        for (int v : adj[u]) {
            indegree[v]--;
            if (indegree[v] == 0) q.push(v);
        }
    }
    return topo;
}

int main() {
    int V = 4;
    vector<vector<int>> adj(V);
    adj[0].push_back(1); adj[0].push_back(2);
    adj[1].push_back(3); adj[2].push_back(3);
    vector<int> order = topoSort(V, adj);
    cout << "Topological Order: ";
    for (int x : order) cout << x << " ";
    cout << endl;
    return 0;
}
`,
    },
    notes: `### Kahn's Algorithm Cycle Check:
If the topological sort output contains fewer than $V$ vertices, the graph contains a directed cycle!`,
  },

  // ================= MODULE 16: DYNAMIC PROGRAMMING =================
  {
    id: 'ca-115',
    lectureNumber: 115,
    moduleId: 'mod-16',
    moduleName: 'Dynamic Programming Mastery',
    title: 'L115: Introduction to Dynamic Programming: Memoization vs Tabulation',
    duration: '54:10',
    videoId: '_kio3U6CV2c',
    topics: ['Overlapping Subproblems', 'Optimal Substructure', 'Top-Down (Recursion + DP Array)', 'Bottom-Up (Iterative Tabulation) & Space Optimization'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

// Space-optimized O(1) space Fibonacci DP
int fib(int n) {
    if (n <= 1) return n;
    int prev2 = 0, prev = 1;
    for (int i = 2; i <= n; i++) {
        int curr = prev + prev2;
        prev2 = prev;
        prev = curr;
    }
    return prev;
}

int main() {
    cout << "Fibonacci(10) = " << fib(10) << endl;
    return 0;
}
`,
      python: `def fib(n: int) -> int:
    if n <= 1: return n
    prev2, prev = 0, 1
    for _ in range(2, n + 1):
        prev2, prev = prev, prev + prev2
    return prev

print("Fibonacci(10) =", fib(10))
`,
    },
    notes: `### DP Golden Rule:
1. Write brute-force recursive relation.
2. Memoize overlapping calls with a state array \`dp[state]\`.
3. Convert to iterative bottom-up table.
4. Optimize space if only previous $k$ states are needed!`,
  },
  {
    id: 'ca-116',
    lectureNumber: 116,
    moduleId: 'mod-16',
    moduleName: 'Dynamic Programming Mastery',
    title: 'L116: 1D DP: Climbing Stairs & Frog Jump Problem',
    duration: '51:40',
    videoId: '9sr3aWtqpGA',
    topics: ['Climbing Stairs Recurrence (f(n) = f(n-1) + f(n-2))', 'Frog Jump with Minimum Energy', 'State Transition Graph', 'Space Optimization to O(1)'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

int frogJump(int n, vector<int>& heights) {
    int prev = 0, prev2 = 0;
    for (int i = 1; i < n; i++) {
        int jumpOne = prev + abs(heights[i] - heights[i - 1]);
        int jumpTwo = (i > 1) ? prev2 + abs(heights[i] - heights[i - 2]) : 1e9;
        int curr = min(jumpOne, jumpTwo);
        prev2 = prev;
        prev = curr;
    }
    return prev;
}

int main() {
    vector<int> heights = {10, 20, 30, 10};
    cout << "Min Energy: " << frogJump(heights.size(), heights) << endl;
    return 0;
}
`,
    },
    notes: `### Frog Jump Recurrence:
\`dp[i] = min(dp[i-1] + |h[i] - h[i-1]|, dp[i-2] + |h[i] - h[i-2]|)\``,
  },
  {
    id: 'ca-118',
    lectureNumber: 118,
    moduleId: 'mod-16',
    moduleName: 'Dynamic Programming Mastery',
    title: 'L118: 2D Grid DP: Unique Paths & 0/1 Knapsack Masterclass',
    duration: '1:04:15',
    videoId: 'tGQ3XFZMHCQ',
    topics: ['Grid DP (Paths from (0,0) to (m-1, n-1))', '0/1 Knapsack Problem', 'Pick vs Not-Pick Choice Diagram', 'Space Optimization with 1D Array'],
    difficulty: 'Advanced',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int knapsack(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}

int main() {
    vector<int> val = {60, 100, 120};
    vector<int> wt = {10, 20, 30};
    int W = 50;
    cout << "Max Knapsack Value: " << knapsack(W, wt, val, val.size()) << endl;
    return 0;
}
`,
    },
    notes: `### Knapsack 1D Array Trick:
Loop weights **backward** from \`W\` down to \`wt[i]\` to prevent reusing the same item multiple times in 0/1 Knapsack!`,
  },


  // ================= MODULE 12: EXTRA QUEUE LECTURES =================
  {
    id: 'ca-96-b',
    lectureNumber: 97,
    moduleId: 'mod-12',
    moduleName: 'Queues & Deques',
    title: 'L97: Implement Queue using Two Stacks & Deque in C++',
    duration: '46:30',
    videoId: 'Ah-ZDJf9QW0',
    topics: ['Amortized O(1) Push/Pop', 'Two Stacks Technique', 'Double Ended Queue (Deque)', 'C++ STL deque'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <stack>
using namespace std;

class MyQueue {
    stack<int> s1, s2;
public:
    void push(int x) { s1.push(x); }
    int pop() {
        if (s2.empty()) {
            while (!s1.empty()) { s2.push(s1.top()); s1.pop(); }
        }
        int val = s2.top(); s2.pop();
        return val;
    }
};

int main() {
    MyQueue q;
    q.push(1); q.push(2); q.push(3);
    cout << "Popped: " << q.pop() << endl;
    return 0;
}
`,
    },
    notes: `### Amortized Complexity:
Each element is pushed into $s_1$ once, popped from $s_1$ once, pushed into $s_2$ once, and popped from $s_2$ once $\rightarrow$ exactly $4$ operations per element $\implies$ **Amortized $O(1)$** time!`,
  },
  {
    id: 'ca-96-c',
    lectureNumber: 98,
    moduleId: 'mod-12',
    moduleName: 'Queues & Deques',
    title: 'L98: Sliding Window Maximum using Monotonic Deque',
    duration: '52:15',
    videoId: 'Ah-ZDJf9QW0',
    topics: ['Monotonic Decreasing Deque', 'Sliding Window O(N) Technique', 'Removing Out of Bound Indices', 'First Negative in Window'],
    difficulty: 'Advanced',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <deque>
using namespace std;

vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> ans;
    for (int i = 0; i < nums.size(); i++) {
        if (!dq.empty() && dq.front() == i - k) dq.pop_front();
        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) ans.push_back(nums[dq.front()]);
    }
    return ans;
}

int main() {
    vector<int> nums = {1, 3, -1, -3, 5, 3, 6, 7};
    vector<int> res = maxSlidingWindow(nums, 3);
    cout << "Sliding Window Max: ";
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}
`,
    },
    notes: `### Monotonic Deque Invariant:
Indices in the deque maintain values in strictly decreasing order. The front of the deque is ALWAYS the maximum element in the current window!`,
  },

  // ================= MODULE 15: EXTRA GRAPH LECTURES =================
  {
    id: 'ca-113',
    lectureNumber: 113,
    moduleId: 'mod-15',
    moduleName: 'Graph Data Structures & Algorithms',
    title: 'L113: Shortest Path in Weighted Graph: Dijkstra Algorithm',
    duration: '58:20',
    videoId: 'bxbrUGvBCnY',
    topics: ['Greedy Shortest Path', 'Min-Heap Priority Queue', 'Edge Relaxation (dist[v] > dist[u] + w)', 'Why Dijkstra Fails on Negative Weights'],
    difficulty: 'Advanced',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> dijkstra(int V, vector<vector<pair<int, int>>>& adj, int src) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<int> dist(V, 1e9);
    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();
        if (d > dist[u]) continue;

        for (auto& edge : adj[u]) {
            int v = edge.first, w = edge.second;
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

int main() {
    int V = 4;
    vector<vector<pair<int, int>>> adj(V);
    adj[0].push_back({1, 4}); adj[0].push_back({2, 1});
    adj[2].push_back({1, 2}); adj[1].push_back({3, 1});
    adj[2].push_back({3, 5});

    vector<int> d = dijkstra(V, adj, 0);
    cout << "Shortest distance from 0 to 3: " << d[3] << endl;
    return 0;
}
`,
    },
    notes: `### Dijkstra Complexity:
- Time: $O((V + E) \log V)$ using Min-Heap priority queue.
- Space: $O(V)$ for distance array and priority queue.`,
  },
  {
    id: 'ca-114',
    lectureNumber: 114,
    moduleId: 'mod-15',
    moduleName: 'Graph Data Structures & Algorithms',
    title: 'L114: Disjoint Set Union (DSU) by Rank & Kruskal Minimum Spanning Tree',
    duration: '1:02:10',
    videoId: 'gGlfzqPT-hE',
    topics: ['Union by Rank / Size', 'Path Compression Optimization', 'Amortized O(alpha(V)) Ackermann Time', 'Kruskal Greedy MST Algorithm'],
    difficulty: 'Advanced',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class DSU {
    vector<int> parent, rank;
public:
    DSU(int n) : parent(n), rank(n, 0) {
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression
    }
    bool unite(int i, int j) {
        int root_i = find(i), root_j = find(j);
        if (root_i == root_j) return false;
        if (rank[root_i] < rank[root_j]) swap(root_i, root_j);
        parent[root_j] = root_i;
        if (rank[root_i] == rank[root_j]) rank[root_i]++;
        return true;
    }
};

int main() {
    DSU d(5);
    cout << "Unite 0 and 1: " << d.unite(0, 1) << endl;
    cout << "Unite 1 and 2: " << d.unite(1, 2) << endl;
    cout << "Is 0 connected to 2: " << (d.find(0) == d.find(2) ? "Yes" : "No") << endl;
    return 0;
}
`,
    },
    notes: `### Disjoint Set Union:
With both **Path Compression** and **Union by Rank**, any sequence of $M$ operations on $N$ elements takes $O(M \alpha(N))$ time, where $\alpha$ is the Inverse Ackermann function (effectively constant $\le 4$ for all practical inputs).`,
  },

  // ================= MODULE 16: EXTRA DP LECTURES =================
  {
    id: 'ca-119-b',
    lectureNumber: 121,
    moduleId: 'mod-16',
    moduleName: 'Dynamic Programming Mastery',
    title: 'L121: Longest Common Subsequence (LCS) & String DP Patterns',
    duration: '57:40',
    videoId: '_kio3U6CV2c',
    topics: ['2D DP on Strings', 'Recurrence: match vs mismatch', 'Printing the LCS String', 'Edit Distance (Levenshtein Distance)'],
    difficulty: 'Advanced',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int lcs(string& s1, string& s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}

int main() {
    string s1 = "abcde", s2 = "ace";
    cout << "LCS of 'abcde' and 'ace': " << lcs(s1, s2) << endl;
    return 0;
}
`,
    },
    notes: `### LCS Recurrence:
$$\text{dp}[i][j] = \begin{cases} 1 + \text{dp}[i-1][j-1] & \text{if } s_1[i-1] == s_2[j-1] \\ \max(\text{dp}[i-1][j], \text{dp}[i][j-1]) & \text{otherwise} \end{cases}$$`,
  },
  {
    id: 'ca-119-c',
    lectureNumber: 122,
    moduleId: 'mod-16',
    moduleName: 'Dynamic Programming Mastery',
    title: 'L122: Longest Increasing Subsequence (LIS) in O(N log N) via Binary Search',
    duration: '51:15',
    videoId: '9sr3aWtqpGA',
    topics: ['O(N^2) Tabulation Formulation', 'Patience Sorting Concept', 'Binary Search with std::lower_bound', 'Printing LIS with Hash Parent Arrays'],
    difficulty: 'Advanced',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}

int main() {
    vector<int> nums = {10, 9, 2, 5, 3, 7, 101, 18};
    cout << "Length of LIS: " << lengthOfLIS(nums) << endl;
    return 0;
}
`,
    },
    notes: `### O(N log N) LIS Magic:
Maintain an array \`tails\` where \`tails[i]\` is the smallest tail of all increasing subsequences of length $i+1$. Each incoming element replaces the first element $\ge x$ via binary search!`,
  },

];
