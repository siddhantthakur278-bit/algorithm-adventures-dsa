// Coder Army Complete DSA Masterclass Curriculum Dataset
// Rohit Negi Complete DSA in C++ Series with Integrated Problem Simulator & Visual Tracing
// 17 Comprehensive Modules | 78 Consecutively Numbered Lectures (L1 to L78)
// Complete Dynamic Programming (DP) Mastery Track Included

import { SupportedLanguage } from '../utils/languageTemplates';

export interface CodeDebugStep {
  line: number;
  code: string;
  variables: Record<string, string | number | boolean | Array<any>>;
  callStack: string[];
  explanation: string;
}

export type DebugStep = CodeDebugStep;

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
  debugSteps?: CodeDebugStep[];
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
    "id": "mod-1",
    "title": "Module 1: C++ Basics & Flow of Program",
    "description": "Flowcharts, Pseudocode, Conditionals, Loops & Pattern Printing Masterclass",
    "icon": "⚡",
    "lecturesCount": 11,
    "totalDuration": "9 hrs 15 mins"
  },
  {
    "id": "mod-2",
    "title": "Module 2: Number Systems & Functions",
    "description": "Decimal-Binary Conversion, Functions, Scope & Bit Manipulation Tricks",
    "icon": "🔢",
    "lecturesCount": 3,
    "totalDuration": "2 hrs 15 mins"
  },
  {
    "id": "mod-3",
    "title": "Module 3: Arrays, Vectors & Kadane Algorithm",
    "description": "1D Arrays, Memory Layout, STL Vectors & Kadane Maximum Subarray",
    "icon": "🎯",
    "lecturesCount": 5,
    "totalDuration": "4 hrs 45 mins"
  },
  {
    "id": "mod-4",
    "title": "Module 4: Sorting Algorithms with Tracing",
    "description": "Selection, Bubble & Insertion Sort with State Step-by-Step Visualization",
    "icon": "📊",
    "lecturesCount": 3,
    "totalDuration": "2 hrs 15 mins"
  },
  {
    "id": "mod-5",
    "title": "Module 5: Binary Search Masterclass (1D & 2D)",
    "description": "Search Space, Rotated Sorted Array, Mountain Peak, Book Allocation & 2D Matrix Search",
    "icon": "🔍",
    "lecturesCount": 5,
    "totalDuration": "4 hrs 45 mins"
  },
  {
    "id": "mod-6",
    "title": "Module 6: 2D Arrays & Matrix Algorithms",
    "description": "Row-Major, Wave Print, Spiral Matrix & Rotate Matrix 90 Degrees",
    "icon": "📐",
    "lecturesCount": 3,
    "totalDuration": "2 hrs 40 mins"
  },
  {
    "id": "mod-7",
    "title": "Module 7: Strings & Pattern Matching Algorithms",
    "description": "Char Arrays, Palindromes, KMP Algorithm & Longest Prefix Suffix (LPS)",
    "icon": "🔤",
    "lecturesCount": 4,
    "totalDuration": "3 hrs 45 mins"
  },
  {
    "id": "mod-8",
    "title": "Module 8: Pointers & Dynamic Memory",
    "description": "Pointer Arithmetic, Array-Pointer Relationship & Dynamic Memory Layout",
    "icon": "📍",
    "lecturesCount": 1,
    "totalDuration": "51 mins"
  },
  {
    "id": "mod-9",
    "title": "Module 9: Recursion & Backtracking Deep Dive",
    "description": "Recursion Trees, Merge Sort Proof, Subsets, Target Sum & Permutations",
    "icon": "🔄",
    "lecturesCount": 7,
    "totalDuration": "6 hrs 20 mins"
  },
  {
    "id": "mod-10",
    "title": "Module 10: Object-Oriented Programming (OOPs)",
    "description": "Classes, Objects, Inheritance, Access Modifiers & Real-Life OOP Models",
    "icon": "🏛️",
    "lecturesCount": 1,
    "totalDuration": "58 mins"
  },
  {
    "id": "mod-11",
    "title": "Module 11: Linked Lists & LRU Cache",
    "description": "Singly, Doubly, Reverse in K-Groups, Merge K Sorted Lists & Flattening",
    "icon": "🔗",
    "lecturesCount": 3,
    "totalDuration": "2 hrs 55 mins"
  },
  {
    "id": "mod-12",
    "title": "Module 12: Stacks & Monotonic Stacks",
    "description": "Valid Parentheses, Next Greater Element, Stock Span & Two Stacks",
    "icon": "📚",
    "lecturesCount": 4,
    "totalDuration": "3 hrs 45 mins"
  },
  {
    "id": "mod-13",
    "title": "Module 13: Queues & Sliding Window Deques",
    "description": "Circular Queue, Queue using Two Stacks & Monotonic Deque Sliding Window",
    "icon": "⏳",
    "lecturesCount": 3,
    "totalDuration": "2 hrs 40 mins"
  },
  {
    "id": "mod-14",
    "title": "Module 14: Binary Trees Masterclass",
    "description": "Inorder/Preorder/Postorder/BFS, Tree Height, Balanced Trees, Construction & LCA",
    "icon": "🌳",
    "lecturesCount": 6,
    "totalDuration": "5 hrs 45 mins"
  },
  {
    "id": "mod-15",
    "title": "Module 15: Binary Search Trees (BST) & Heaps",
    "description": "BST Search/Insert/Delete, Min/Max Heap, Heapify Algorithm & Priority Queue",
    "icon": "⛰️",
    "lecturesCount": 5,
    "totalDuration": "5 hrs 15 mins"
  },
  {
    "id": "mod-16",
    "title": "Module 16: Graph Data Structures & Algorithms",
    "description": "Adjacency Lists, BFS/DFS, Cycle Detection, Kahn Topo Sort, Dijkstra & Kruskal DSU",
    "icon": "🕸️",
    "lecturesCount": 6,
    "totalDuration": "5 hrs 50 mins"
  },
  {
    "id": "mod-17",
    "title": "Module 17: Dynamic Programming (DP) Mastery",
    "description": "Memoization, Tabulation, 1D DP, 2D Grid DP, Knapsack, LCS, LIS, Stocks & MCM",
    "icon": "🧩",
    "lecturesCount": 8,
    "totalDuration": "7 hrs 45 mins"
  }
];

export const CODER_ARMY_LECTURES: CoderArmyLecture[] = [
  {
    "id": "ca-1",
    "lectureNumber": 1,
    "moduleId": "mod-1",
    "moduleName": "C++ Basics & Flow of Program",
    "title": "L1: Introduction to Programming, Flowcharts & Pseudocode",
    "duration": "42:15",
    "videoId": "y3OOaXrFy-Q",
    "topics": [
      "Computer Architecture",
      "Flowcharts",
      "Pseudocode",
      "Decision Blocks"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Coder Army: Welcome to Complete DSA Mastery!\" << endl;\n    cout << \"Step 1: Visualizing algorithm flow with pseudocode\" << endl;\n    \n    int a = 10, b = 20;\n    cout << \"Sum of \" << a << \" + \" << b << \" = \" << (a + b) << endl;\n    return 0;\n}\n",
      "python": "# Python Flow of Program\nprint(\"Coder Army: Welcome to Complete DSA Mastery!\")\na = 10\nb = 20\nprint(f\"Sum of {a} + {b} = {a + b}\")\n",
      "java": "class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Coder Army: Welcome to Complete DSA Mastery!\");\n        int a = 10, b = 20;\n        System.out.println(\"Sum of \" + a + \" + \" + b + \" = \" + (a + b));\n    }\n}\n"
    },
    "debugSteps": [
      {
        "line": 5,
        "code": "cout << \"Coder Army: Welcome to Complete DSA Mastery!\"",
        "variables": {
          "step": "Init"
        },
        "callStack": [
          "main()"
        ],
        "explanation": "Printing welcome message to standard output."
      },
      {
        "line": 8,
        "code": "int a = 10, b = 20;",
        "variables": {
          "a": 10,
          "b": 20
        },
        "callStack": [
          "main()"
        ],
        "explanation": "Allocating integer variables a=10 and b=20 on the stack frame."
      },
      {
        "line": 9,
        "code": "cout << (a + b);",
        "variables": {
          "a": 10,
          "b": 20,
          "sum": 30
        },
        "callStack": [
          "main()"
        ],
        "explanation": "Evaluating arithmetic addition expression and streaming to console."
      },
      {
        "line": 10,
        "code": "return 0;",
        "variables": {
          "exitCode": 0
        },
        "callStack": [
          "main()"
        ],
        "explanation": "Program terminated successfully with exit code 0."
      }
    ],
    "notes": "### Lecture 1: Flow of Program & Architecture\n- **Program Definition:** A sequential sequence of logical instructions executed by the CPU.\n- **Components:** CPU (ALU + Control Unit), RAM (Stack & Heap), Storage.\n- **Flowchart Symbols:**\n  - Oval: Start / End\n  - Parallelogram: Input / Output\n  - Rectangle: Processing / Assignment\n  - Diamond: Decision Condition (If / Else)"
  },
  {
    "id": "ca-2",
    "lectureNumber": 2,
    "moduleId": "mod-1",
    "moduleName": "C++ Basics & Flow of Program",
    "title": "L2: Flowcharts & Pseudocode in Programming",
    "duration": "48:30",
    "videoId": "H_9MSvTL74g",
    "topics": [
      "Flowchart Design",
      "Loop Visualization",
      "Pseudocode Standards",
      "Edge Cases"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int num;\n    cout << \"Enter a positive number: \";\n    num = 7; // Example input\n    \n    if (num % 2 == 0) {\n        cout << num << \" is EVEN\" << endl;\n    } else {\n        cout << num << \" is ODD\" << endl;\n    }\n    return 0;\n}\n",
      "python": "num = 7\nif num % 2 == 0:\n    print(f\"{num} is EVEN\")\nelse:\n    print(f\"{num} is ODD\")\n"
    },
    "debugSteps": [
      {
        "line": 5,
        "code": "int num = 7;",
        "variables": {
          "num": 7
        },
        "callStack": [
          "main()"
        ],
        "explanation": "Assigning candidate number."
      },
      {
        "line": 7,
        "code": "if (num % 2 == 0)",
        "variables": {
          "remainder": 1,
          "isEven": false
        },
        "callStack": [
          "main()"
        ],
        "explanation": "Evaluating modulo 2 predicate condition."
      },
      {
        "line": 10,
        "code": "cout << \"ODD\";",
        "variables": {
          "branch": "else"
        },
        "callStack": [
          "main()"
        ],
        "explanation": "Branching to odd case output."
      }
    ],
    "notes": "### Flowcharts In-Depth:\n1. Every algorithm can be converted into standard flow diagrams before writing a single line of code.\n2. Conditionals branch into True / False paths.\n3. Loops re-route control back to earlier decision diamonds."
  },
  {
    "id": "ca-3",
    "lectureNumber": 3,
    "moduleId": "mod-1",
    "moduleName": "C++ Basics & Flow of Program",
    "title": "L3: Start C++ from Zero and Write Your First Program",
    "duration": "50:10",
    "videoId": "2Gexv2eld4Y",
    "topics": [
      "C++ Syntax",
      "cin / cout",
      "Headers",
      "Compilation Model"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Namaste Coder Army!\" << endl;\n    cout << \"Size of int: \" << sizeof(int) << \" bytes\" << endl;\n    cout << \"Size of double: \" << sizeof(double) << \" bytes\" << endl;\n    return 0;\n}\n",
      "python": "print(\"Namaste Coder Army!\")\nprint(\"Python dynamic typing ready.\")\n"
    },
    "debugSteps": [
      {
        "line": 4,
        "code": "cout << \"Namaste Coder Army!\"",
        "variables": {
          "msg": "Namaste Coder Army!"
        },
        "callStack": [
          "main()"
        ],
        "explanation": "Initial print to stdout."
      },
      {
        "line": 5,
        "code": "sizeof(int)",
        "variables": {
          "intBytes": 4
        },
        "callStack": [
          "main()"
        ],
        "explanation": "Checking architecture size of integer on system."
      }
    ],
    "notes": "### C++ Compilation Stages:\n1. **Preprocessor:** Expands `#include` and macros.\n2. **Compiler:** Converts C++ to Assembly.\n3. **Assembler:** Converts Assembly to Object Code (`.o`).\n4. **Linker:** Combines object files into an executable binary."
  },
  {
    "id": "ca-4",
    "lectureNumber": 4,
    "moduleId": "mod-1",
    "moduleName": "C++ Basics & Flow of Program",
    "title": "L4: If Else Statement & Loops in C++",
    "duration": "46:25",
    "videoId": "gGaJJovz-4k",
    "topics": [
      "If-Else Ladder",
      "Nested Conditionals",
      "While Loop",
      "Counter Variables"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int marks = 85;\n    if (marks >= 90) cout << \"Grade: A+\" << endl;\n    else if (marks >= 80) cout << \"Grade: A\" << endl;\n    else if (marks >= 70) cout << \"Grade: B\" << endl;\n    else cout << \"Keep Practicing!\" << endl;\n    return 0;\n}\n",
      "python": "marks = 85\nif marks >= 90:\n    print(\"Grade: A+\")\nelif marks >= 80:\n    print(\"Grade: A\")\nelse:\n    print(\"Keep Practicing!\")\n"
    },
    "debugSteps": [
      {
        "line": 4,
        "code": "int marks = 85;",
        "variables": {
          "marks": 85
        },
        "callStack": [
          "main()"
        ],
        "explanation": "Student score initialized."
      },
      {
        "line": 5,
        "code": "if (marks >= 90)",
        "variables": {
          "marks": 85,
          "condition": false
        },
        "callStack": [
          "main()"
        ],
        "explanation": "85 < 90, falls through to next elif."
      },
      {
        "line": 6,
        "code": "else if (marks >= 80)",
        "variables": {
          "marks": 85,
          "condition": true
        },
        "callStack": [
          "main()"
        ],
        "explanation": "85 >= 80 is true! Outputs Grade A."
      }
    ],
    "notes": "### Conditional Execution:\n- In `if-else if-else`, only the **first** matching branch executes.\n- Remaining branches are skipped immediately without evaluation."
  },
  {
    "id": "ca-5",
    "lectureNumber": 5,
    "moduleId": "mod-1",
    "moduleName": "C++ Basics & Flow of Program",
    "title": "L5: For Loop in C++ Advance, Prime Number & Factorial",
    "duration": "55:10",
    "videoId": "7qINbIQK_J8",
    "topics": [
      "For Loop Anatomy",
      "Prime Check Invariants",
      "Factorial Loop",
      "Fibonacci Series"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nbool isPrime(int n) {\n    if (n <= 1) return false;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) return false;\n    }\n    return true;\n}\n\nint main() {\n    int n = 29;\n    cout << n << (isPrime(n) ? \" is a PRIME number\" : \" is NOT prime\") << endl;\n    return 0;\n}\n",
      "python": "def is_prime(n):\n    if n <= 1: return False\n    i = 2\n    while i * i <= n:\n        if n % i == 0: return False\n        i += 1\n    return True\n\nprint(\"29 is prime?\", is_prime(29))\n"
    },
    "debugSteps": [
      {
        "line": 4,
        "code": "isPrime(29)",
        "variables": {
          "n": 29
        },
        "callStack": [
          "isPrime()"
        ],
        "explanation": "Checking divisibility up to sqrt(29) ≈ 5."
      },
      {
        "line": 6,
        "code": "i = 2, 3, 4, 5",
        "variables": {
          "checked": "none divide 29"
        },
        "callStack": [
          "isPrime()"
        ],
        "explanation": "No factors found. Returns true in O(sqrt(N)) time."
      }
    ],
    "notes": "### Prime Checking Complexity Optimization:\n- Naive: Check from `2 to N-1` -> `O(N)`\n- Optimized: Factors always occur in pairs `(d, N/d)`. At least one factor is `<= sqrt(N)`.\n- Hence checking up to `i * i <= N` runs in `O(sqrt(N))` time!"
  },
  {
    "id": "ca-6",
    "lectureNumber": 6,
    "moduleId": "mod-1",
    "moduleName": "C++ Basics & Flow of Program",
    "title": "L6: Solve Any Pattern Problem With Simple Trick Part-1",
    "duration": "51:40",
    "videoId": "0LawAwK5OaI",
    "topics": [
      "Pattern Strategy",
      "Square Patterns",
      "Right Triangle",
      "Character Patterns"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = 5;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            cout << \"* \";\n        }\n        cout << endl;\n    }\n    return 0;\n}\n",
      "python": "n = 5\nfor i in range(1, n + 1):\n    print(\"* \" * i)\n"
    },
    "notes": "### Coder Army Pattern Trick:\n1. Outer loop runs `1 to n` for rows.\n2. Inner loop formula connects column `j` with row `i`."
  },
  {
    "id": "ca-7",
    "lectureNumber": 7,
    "moduleId": "mod-1",
    "moduleName": "C++ Basics & Flow of Program",
    "title": "L7: Pattern Problems With Simple Trick Part-2",
    "duration": "49:20",
    "videoId": "-o6MPFfGipU",
    "topics": [
      "Inverted Patterns",
      "Space Alignment",
      "Alphabet Diamonds"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = 5;\n    for (int i = 1; i <= n; i++) {\n        for (int space = 1; space <= n - i; space++) cout << \"  \";\n        for (int star = 1; star <= i; star++) cout << \"* \";\n        cout << endl;\n    }\n    return 0;\n}\n"
    },
    "notes": "### Space-Based Patterns:\nDivide row into two parts: leading spaces `(n - i)` and stars `(i)`."
  },
  {
    "id": "ca-8",
    "lectureNumber": 8,
    "moduleId": "mod-1",
    "moduleName": "C++ Basics & Flow of Program",
    "title": "L8: Solve Hard Pattern Print Problem with Simple Trick",
    "duration": "53:15",
    "videoId": "mtQwWAxWbDY",
    "topics": [
      "Pyramid Patterns",
      "Palindrome Number Pyramids",
      "Butterfly Pattern"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = 4;\n    for (int i = 1; i <= n; i++) {\n        for (int s = 1; s <= n - i; s++) cout << \" \";\n        for (int j = 1; j <= 2 * i - 1; j++) cout << \"*\";\n        cout << endl;\n    }\n    return 0;\n}\n"
    },
    "notes": "### Full Pyramid Logic:\nStars per row follow arithmetic progression: `2*i - 1`."
  },
  {
    "id": "ca-9",
    "lectureNumber": 9,
    "moduleId": "mod-1",
    "moduleName": "C++ Basics & Flow of Program",
    "title": "L9: Top 5 Advance Pattern Print Problems",
    "duration": "58:05",
    "videoId": "CaLtCuji8z0",
    "topics": [
      "Hollow Diamond",
      "Spiral Pattern",
      "Mathematical Number Rings"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n = 4;\n    // Number ring pattern: min distance to edge\n    for (int i = 0; i < 2 * n - 1; i++) {\n        for (int j = 0; j < 2 * n - 1; j++) {\n            int top = i, left = j, bottom = 2 * n - 2 - i, right = 2 * n - 2 - j;\n            int dist = min(min(top, bottom), min(left, right));\n            cout << (n - dist) << \" \";\n        }\n        cout << endl;\n    }\n    return 0;\n}\n"
    },
    "notes": "### Matrix Border Distance:\nFormula: `value = n - min({row, col, 2n-2-row, 2n-2-col})`."
  },
  {
    "id": "ca-10",
    "lectureNumber": 10,
    "moduleId": "mod-1",
    "moduleName": "C++ Basics & Flow of Program",
    "title": "L10: Operators in C++ with Implementation",
    "duration": "47:35",
    "videoId": "HI0mNthclGE",
    "topics": [
      "Arithmetic Operators",
      "Relational Operators",
      "Bitwise Operators",
      "Precedence"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 5, b = 9;\n    cout << \"a & b: \" << (a & b) << endl;\n    cout << \"a | b: \" << (a | b) << endl;\n    cout << \"a ^ b: \" << (a ^ b) << endl;\n    cout << \"Left Shift a << 1: \" << (a << 1) << endl;\n    return 0;\n}\n"
    },
    "notes": "### Operator Precedence:\nBitwise operations have lower precedence than arithmetic but higher than logical. Always use parentheses!"
  },
  {
    "id": "ca-11",
    "lectureNumber": 11,
    "moduleId": "mod-1",
    "moduleName": "C++ Basics & Flow of Program",
    "title": "L11: While, Do While, Switch, Break & Continue in C++",
    "duration": "52:10",
    "videoId": "kYbTxu1_H-o",
    "topics": [
      "While Loop",
      "Do While Loop",
      "Switch Case",
      "Break vs Continue"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int day = 3;\n    switch (day) {\n        case 1: cout << \"Monday\" << endl; break;\n        case 2: cout << \"Tuesday\" << endl; break;\n        case 3: cout << \"Wednesday - Midweek Focus!\" << endl; break;\n        default: cout << \"Other day\" << endl;\n    }\n    return 0;\n}\n"
    },
    "notes": "### Switch Statement Details:\nRemember to include `break;` after each case to avoid fall-through!"
  },
  {
    "id": "ca-12",
    "lectureNumber": 12,
    "moduleId": "mod-2",
    "moduleName": "Number Systems & Functions",
    "title": "L12: Binary to Decimal, Decimal to Binary & Octal Conversion",
    "duration": "45:30",
    "videoId": "iGRXq30nx6g",
    "topics": [
      "Base 2 to Base 10",
      "Base 10 to Base 2",
      "Bitwise Math",
      "Octal Conversion"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nint decimalToBinary(int n) {\n    int ans = 0, mul = 1;\n    while (n > 0) {\n        int rem = n % 2;\n        ans += rem * mul;\n        mul *= 10;\n        n /= 2;\n    }\n    return ans;\n}\n\nint main() {\n    int num = 13;\n    cout << \"Binary of \" << num << \" is: \" << decimalToBinary(num) << endl;\n    return 0;\n}\n"
    },
    "notes": "### Base Conversion:\nRepeated division by base `B` collects remainders from least significant to most significant."
  },
  {
    "id": "ca-13",
    "lectureNumber": 13,
    "moduleId": "mod-2",
    "moduleName": "Number Systems & Functions",
    "title": "L13: Write Your First Program On LeetCode",
    "duration": "40:15",
    "videoId": "0j7879JOgIU",
    "topics": [
      "LeetCode Environment",
      "Pass by Reference",
      "Constraints Analysis",
      "Edge Cases"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\n// LeetCode Problem 258: Add Digits\nint addDigits(int num) {\n    if (num == 0) return 0;\n    return 1 + (num - 1) % 9; // Digital root O(1)\n}\n\nint main() {\n    cout << \"Digital Root of 38: \" << addDigits(38) << endl;\n    return 0;\n}\n"
    },
    "notes": "### Digital Root Mathematical Trick:\nAny number mod 9 reveals its repeated digital sum in `O(1)` time!"
  },
  {
    "id": "ca-14",
    "lectureNumber": 14,
    "moduleId": "mod-2",
    "moduleName": "Number Systems & Functions",
    "title": "L14: Functions in C++, Pass by Value & Pass by Reference",
    "duration": "48:50",
    "videoId": "PnSgN5WOUC0",
    "topics": [
      "Function Signatures",
      "Pass by Value",
      "Pass by Reference (&)",
      "Stack Frames"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nvoid swapByRef(int& x, int& y) {\n    int temp = x;\n    x = y;\n    y = temp;\n}\n\nint main() {\n    int a = 10, b = 20;\n    cout << \"Before swap: a=\" << a << \", b=\" << b << endl;\n    swapByRef(a, b);\n    cout << \"After swap:  a=\" << a << \", b=\" << b << endl;\n    return 0;\n}\n"
    },
    "notes": "### Pass by Reference (`&`):\nAllows functions to modify caller's original variables without copying overhead!"
  },
  {
    "id": "ca-16",
    "lectureNumber": 15,
    "moduleId": "mod-3",
    "moduleName": "Arrays, Vectors & Kadane Algorithm",
    "title": "L15: Introduction To Arrays in C++",
    "duration": "52:00",
    "videoId": "moZNKL37w-s",
    "topics": [
      "Contiguous Memory",
      "Array Indexing",
      "Sizeof Array",
      "Linear Search"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    cout << \"Array elements: \";\n    for (int i = 0; i < n; i++) cout << arr[i] << \" \";\n    cout << endl;\n    return 0;\n}\n"
    },
    "notes": "### Arrays in Memory:\nArrays store elements in contiguous RAM addresses. `arr[i] = *(arr + i)`."
  },
  {
    "id": "ca-17",
    "lectureNumber": 16,
    "moduleId": "mod-3",
    "moduleName": "Arrays, Vectors & Kadane Algorithm",
    "title": "L16: Master Arrays By Solving Problems",
    "duration": "56:20",
    "videoId": "567332frcF0",
    "topics": [
      "Reverse Array",
      "Second Largest Element",
      "Rotate Array",
      "Missing Number"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint secondLargest(const vector<int>& arr) {\n    int largest = -1, second = -1;\n    for (int x : arr) {\n        if (x > largest) {\n            second = largest;\n            largest = x;\n        } else if (x > second && x != largest) {\n            second = x;\n        }\n    }\n    return second;\n}\n\nint main() {\n    vector<int> nums = {12, 35, 1, 10, 34, 1};\n    cout << \"Second Largest: \" << secondLargest(nums) << endl;\n    return 0;\n}\n"
    },
    "notes": "### Single Pass Second Largest:\nMaintain both largest and second largest pointers in one pass `O(N)`."
  },
  {
    "id": "ca-18",
    "lectureNumber": 17,
    "moduleId": "mod-3",
    "moduleName": "Arrays, Vectors & Kadane Algorithm",
    "title": "L17: Time and Space Complexity From Zero To Advance",
    "duration": "1:02:15",
    "videoId": "hUdqNPhXOh4",
    "topics": [
      "Big-O Notation",
      "Omega & Theta",
      "Space Complexity",
      "Loop Analysis"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\n// O(log N) Time Complexity\nint countSteps(int n) {\n    int steps = 0;\n    while (n > 1) {\n        n /= 2;\n        steps++;\n    }\n    return steps;\n}\n\nint main() {\n    int n = 1024;\n    cout << \"Steps to reduce \" << n << \" to 1: \" << countSteps(n) << \" (log2(1024) = 10)\" << endl;\n    return 0;\n}\n"
    },
    "notes": "### Big-O Master Rules:\n1. Ignore constants (`O(2N) = O(N)`).\n2. Drop lower order terms (`O(N^2 + N) = O(N^2)`).\n3. Logarithmic growth: when problem size is divided by a constant at each step."
  },
  {
    "id": "ca-27",
    "lectureNumber": 18,
    "moduleId": "mod-3",
    "moduleName": "Arrays, Vectors & Kadane Algorithm",
    "title": "L18: What is STL & Vector in C++",
    "duration": "48:10",
    "videoId": "-tDAAOYFehc",
    "topics": [
      "C++ STL",
      "std::vector",
      "Dynamic Resizing",
      "Iterators"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {10, 20, 30};\n    v.push_back(40);\n    cout << \"Size: \" << v.size() << \", Capacity: \" << v.capacity() << endl;\n    for (int x : v) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n"
    },
    "notes": "### Vector Geometric Growth:\nWhen capacity is exceeded, vector allocates double the capacity (`2x`), giving amortized `O(1)` push_back!"
  },
  {
    "id": "ca-29",
    "lectureNumber": 19,
    "moduleId": "mod-3",
    "moduleName": "Arrays, Vectors & Kadane Algorithm",
    "title": "L19: Kadane's Algorithm & Prefix / Suffix Sum",
    "duration": "54:15",
    "videoId": "2YksXVZitrE",
    "topics": [
      "Kadane's Algorithm",
      "Maximum Subarray Sum",
      "Prefix Sum",
      "Equal Sum Subarray"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <climits>\nusing namespace std;\n\nint maxSubArray(const vector<int>& nums) {\n    int maxSoFar = INT_MIN, currentSum = 0;\n    for (int x : nums) {\n        currentSum += x;\n        if (currentSum > maxSoFar) maxSoFar = currentSum;\n        if (currentSum < 0) currentSum = 0;\n    }\n    return maxSoFar;\n}\n\nint main() {\n    vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n    cout << \"Maximum contiguous sum: \" << maxSubArray(nums) << endl;\n    return 0;\n}\n"
    },
    "notes": "### Kadane's Principle:\nIf current running sum drops below 0, discard it because it cannot contribute positively to any subsequent subarray!"
  },
  {
    "id": "ca-19",
    "lectureNumber": 20,
    "moduleId": "mod-4",
    "moduleName": "Sorting Algorithms with Tracing",
    "title": "L20: Selection Sort Algorithm with Theory and Code",
    "duration": "45:20",
    "videoId": "9_B6TmAHveU",
    "topics": [
      "Selection Sort",
      "Min Element Selection",
      "In-Place Swap",
      "O(N^2) Proof"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid selectionSort(vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n - 1; i++) {\n        int minIdx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIdx]) minIdx = j;\n        }\n        swap(arr[i], arr[minIdx]);\n    }\n}\n\nint main() {\n    vector<int> nums = {64, 25, 12, 22, 11};\n    selectionSort(nums);\n    cout << \"Selection Sorted: \";\n    for (int x : nums) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n"
    },
    "notes": "### Selection Sort:\nAt each pass `i`, selects the minimum element in `arr[i..n-1]` and places it at index `i`."
  },
  {
    "id": "ca-20",
    "lectureNumber": 21,
    "moduleId": "mod-4",
    "moduleName": "Sorting Algorithms with Tracing",
    "title": "L21: Bubble Sort with Theory and Code",
    "duration": "44:10",
    "videoId": "V3vM_m2iFtk",
    "topics": [
      "Adjacent Swaps",
      "Bubble Up Invariant",
      "Early Termination Optimization"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid bubbleSort(vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n - 1; i++) {\n        bool swapped = false;\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                swap(arr[j], arr[j + 1]);\n                swapped = true;\n            }\n        }\n        if (!swapped) break; // Optimized O(N) best case\n    }\n}\n\nint main() {\n    vector<int> nums = {5, 1, 4, 2, 8};\n    bubbleSort(nums);\n    cout << \"Bubble Sorted: \";\n    for (int x : nums) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n"
    },
    "notes": "### Bubble Sort Invariant:\nLargest unsorted element bubbles to the end on each pass. `swapped` flag gives `O(N)` on already sorted arrays."
  },
  {
    "id": "ca-21",
    "lectureNumber": 22,
    "moduleId": "mod-4",
    "moduleName": "Sorting Algorithms with Tracing",
    "title": "L22: Insertion Sort with Theory and Code",
    "duration": "46:30",
    "videoId": "YpZUgiT1N94",
    "topics": [
      "Insertion Sort",
      "Card Deck Metaphor",
      "Adaptive Sorting",
      "Shifting Elements"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid insertionSort(vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}\n\nint main() {\n    vector<int> nums = {12, 11, 13, 5, 6};\n    insertionSort(nums);\n    cout << \"Insertion Sorted: \";\n    for (int x : nums) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n"
    },
    "notes": "### Insertion Sort:\nMaintains a sorted subarray on the left and inserts the next element in its correct position."
  },
  {
    "id": "ca-22",
    "lectureNumber": 23,
    "moduleId": "mod-5",
    "moduleName": "Binary Search Masterclass (1D & 2D)",
    "title": "L23: Binary Search with Theory and Code",
    "duration": "52:40",
    "videoId": "0Hwpzd-bSck",
    "topics": [
      "Binary Search",
      "Search Space",
      "O(log N)",
      "Monotonic Functions"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint binarySearch(const vector<int>& arr, int target) {\n    int low = 0, high = arr.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}\n\nint main() {\n    vector<int> nums = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};\n    int target = 23;\n    cout << \"Target \" << target << \" found at index: \" << binarySearch(nums, target) << endl;\n    return 0;\n}\n",
      "python": "def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = low + (high - low) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: low = mid + 1\n        else: high = mid - 1\n    return -1\n\nnums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\nprint(\"Index:\", binary_search(nums, 23))\n"
    },
    "debugSteps": [
      {
        "line": 6,
        "code": "low = 0, high = 9",
        "variables": {
          "low": 0,
          "high": 9
        },
        "callStack": [
          "binarySearch()"
        ],
        "explanation": "Setting initial pointers."
      },
      {
        "line": 8,
        "code": "mid = 4, arr[4] = 16",
        "variables": {
          "mid": 4,
          "val": 16
        },
        "callStack": [
          "binarySearch()"
        ],
        "explanation": "16 < 23, search in right half."
      },
      {
        "line": 10,
        "code": "low = 5, high = 9",
        "variables": {
          "low": 5,
          "high": 9,
          "mid": 7,
          "val": 56
        },
        "callStack": [
          "binarySearch()"
        ],
        "explanation": "56 > 23, search in left half."
      },
      {
        "line": 12,
        "code": "mid = 5, arr[5] = 23",
        "variables": {
          "mid": 5,
          "result": 5
        },
        "callStack": [
          "binarySearch()"
        ],
        "explanation": "Exact match at index 5!"
      }
    ],
    "notes": "### Binary Search Invariant:\n- Array must be monotonically sorted.\n- Prevent integer overflow with `mid = low + (high - low) / 2`."
  },
  {
    "id": "ca-23",
    "lectureNumber": 24,
    "moduleId": "mod-5",
    "moduleName": "Binary Search Masterclass (1D & 2D)",
    "title": "L24: Binary Search Problems: Search Insert & Sqrt(x)",
    "duration": "49:15",
    "videoId": "740PMblqK6o",
    "topics": [
      "Search Insert Position",
      "Integer Square Root",
      "First and Last Occurrence"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nint mySqrt(int x) {\n    if (x == 0) return 0;\n    long long low = 1, high = x, ans = 1;\n    while (low <= high) {\n        long long mid = low + (high - low) / 2;\n        if (mid * mid <= x) {\n            ans = mid;\n            low = mid + 1;\n        } else {\n            high = mid - 1;\n        }\n    }\n    return ans;\n}\n\nint main() {\n    cout << \"sqrt(28) = \" << mySqrt(28) << endl;\n    return 0;\n}\n"
    },
    "notes": "### Monotonic Answer Space:\nSquare root is monotonic over positive integers. Perfect candidate for binary search!"
  },
  {
    "id": "ca-24",
    "lectureNumber": 25,
    "moduleId": "mod-5",
    "moduleName": "Binary Search Masterclass (1D & 2D)",
    "title": "L25: Search in Rotated Array & Mountain Peak Index",
    "duration": "55:30",
    "videoId": "w2HOAYymS3A",
    "topics": [
      "Rotated Sorted Array",
      "Mountain Array Peak",
      "Inflection Point"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint peakIndexInMountainArray(const vector<int>& arr) {\n    int low = 0, high = arr.size() - 1;\n    while (low < high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] < arr[mid + 1]) low = mid + 1;\n        else high = mid;\n    }\n    return low;\n}\n\nint main() {\n    vector<int> mountain = {0, 2, 5, 10, 8, 4, 1};\n    cout << \"Peak index: \" << peakIndexInMountainArray(mountain) << endl;\n    return 0;\n}\n"
    },
    "notes": "### Mountain Array Property:\nSlope is positive (`arr[mid] < arr[mid+1]`) on the left, negative on the right. Peak is the crest!"
  },
  {
    "id": "ca-25",
    "lectureNumber": 26,
    "moduleId": "mod-5",
    "moduleName": "Binary Search Masterclass (1D & 2D)",
    "title": "L26: Book Allocation & Painter Partition Problem",
    "duration": "1:08:40",
    "videoId": "znIFTUyOQvI",
    "topics": [
      "Binary Search on Answer",
      "Book Allocation",
      "Painter Partition",
      "Greedy Feasibility"
    ],
    "difficulty": "Advanced",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <numeric>\n#include <algorithm>\nusing namespace std;\n\nbool isPossible(const vector<int>& arr, int m, int maxPages) {\n    int students = 1, sum = 0;\n    for (int p : arr) {\n        if (sum + p <= maxPages) sum += p;\n        else {\n            students++;\n            if (students > m || p > maxPages) return false;\n            sum = p;\n        }\n    }\n    return true;\n}\n\nint findPages(const vector<int>& arr, int m) {\n    if (m > arr.size()) return -1;\n    int low = *max_element(arr.begin(), arr.end());\n    int high = accumulate(arr.begin(), arr.end(), 0);\n    int ans = -1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (isPossible(arr, m, mid)) {\n            ans = mid;\n            high = mid - 1;\n        } else {\n            low = mid + 1;\n        }\n    }\n    return ans;\n}\n\nint main() {\n    vector<int> books = {12, 34, 67, 90};\n    cout << \"Minimum max pages for 2 students: \" << findPages(books, 2) << endl;\n    return 0;\n}\n"
    },
    "notes": "### Binary Search on Answer:\nWhen asked to minimize maximum or maximize minimum, test candidate answers monotonically in `O(N * log(sum))`."
  },
  {
    "id": "ca-34",
    "lectureNumber": 27,
    "moduleId": "mod-5",
    "moduleName": "Binary Search Masterclass (1D & 2D)",
    "title": "L27: Binary Search in 2D Arrays & Matrix Search",
    "duration": "58:20",
    "videoId": "BA1ppstdJi8",
    "topics": [
      "Matrix Search",
      "Row-Major Mapping",
      "Staircase Search",
      "O(log(M*N))"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nbool searchMatrix(const vector<vector<int>>& matrix, int target) {\n    if (matrix.empty()) return false;\n    int m = matrix.size(), n = matrix[0].size();\n    int low = 0, high = m * n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        int val = matrix[mid / n][mid % n];\n        if (val == target) return true;\n        else if (val < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return false;\n}\n\nint main() {\n    vector<vector<int>> matrix = {\n        {1, 3, 5, 7},\n        {10, 11, 16, 20},\n        {23, 30, 34, 60}\n    };\n    cout << \"Contains 16? \" << (searchMatrix(matrix, 16) ? \"YES\" : \"NO\") << endl;\n    return 0;\n}\n"
    },
    "notes": "### Virtual 1D Indexing in 2D Array:\nRow = `mid / cols`, Col = `mid % cols`. Treats entire matrix as a flat sorted 1D array in `O(log(M*N))`."
  },
  {
    "id": "ca-31",
    "lectureNumber": 28,
    "moduleId": "mod-6",
    "moduleName": "2D Arrays & Matrix Algorithms",
    "title": "L28: Introduction To 2D Arrays in C++",
    "duration": "51:15",
    "videoId": "kP5EoGyTHbA",
    "topics": [
      "Row Major Memory",
      "Matrix Storage",
      "Row Sum",
      "Diagonal Traversal"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int mat[3][3] = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    int diagonalSum = 0;\n    for (int i = 0; i < 3; i++) diagonalSum += mat[i][i];\n    cout << \"Primary Diagonal Sum: \" << diagonalSum << endl;\n    return 0;\n}\n"
    },
    "notes": "### Row-Major Layout:\nIn C++, row `i` is placed immediately after row `i-1` in linear memory. Address formula: `base + (i * cols + j) * sizeof(element)`."
  },
  {
    "id": "ca-32",
    "lectureNumber": 29,
    "moduleId": "mod-6",
    "moduleName": "2D Arrays & Matrix Algorithms",
    "title": "L29: 2D Arrays Interview Problems: Wave & Spiral Form",
    "duration": "59:40",
    "videoId": "Iow9P1QsjhE",
    "topics": [
      "Wave Form Traversal",
      "Spiral Matrix",
      "Boundary Pointers"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> spiralOrder(const vector<vector<int>>& matrix) {\n    vector<int> res;\n    if (matrix.empty()) return res;\n    int top = 0, bottom = matrix.size() - 1;\n    int left = 0, right = matrix[0].size() - 1;\n\n    while (top <= bottom && left <= right) {\n        for (int i = left; i <= right; i++) res.push_back(matrix[top][i]);\n        top++;\n        for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]);\n        right--;\n        if (top <= bottom) {\n            for (int i = right; i >= left; i--) res.push_back(matrix[bottom][i]);\n            bottom--;\n        }\n        if (left <= right) {\n            for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]);\n            left++;\n        }\n    }\n    return res;\n}\n\nint main() {\n    vector<vector<int>> mat = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    vector<int> spiral = spiralOrder(mat);\n    cout << \"Spiral: \";\n    for (int x : spiral) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n"
    },
    "notes": "### Spiral Order Invariants:\n4 boundary pointers: `top`, `bottom`, `left`, `right`. Advance clockwise and peel layers!"
  },
  {
    "id": "ca-33",
    "lectureNumber": 30,
    "moduleId": "mod-6",
    "moduleName": "2D Arrays & Matrix Algorithms",
    "title": "L30: Rotate Image by 90 Degrees & Matrix Transpose",
    "duration": "48:30",
    "videoId": "ZtSkN2aoCko",
    "topics": [
      "In-Place Matrix Rotation",
      "Matrix Transpose",
      "Row Reversal"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid rotate(vector<vector<int>>& matrix) {\n    int n = matrix.size();\n    // Step 1: Transpose\n    for (int i = 0; i < n; i++) {\n        for (int j = i + 1; j < n; j++) {\n            swap(matrix[i][j], matrix[j][i]);\n        }\n    }\n    // Step 2: Reverse each row\n    for (int i = 0; i < n; i++) {\n        reverse(matrix[i].begin(), matrix[i].end());\n    }\n}\n\nint main() {\n    vector<vector<int>> mat = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    rotate(mat);\n    cout << \"Rotated 90 deg:\" << endl;\n    for (auto& row : mat) {\n        for (int x : row) cout << x << \" \";\n        cout << endl;\n    }\n    return 0;\n}\n"
    },
    "notes": "### In-Place 90-Degree Rotation Proof:\n`Rotate 90 Clockwise = Transpose followed by Row Reversal!` Works in `O(N^2)` time and `O(1)` extra space."
  },
  {
    "id": "ca-36",
    "lectureNumber": 31,
    "moduleId": "mod-7",
    "moduleName": "Strings & Pattern Matching Algorithms",
    "title": "L31: Introductions To STRINGS in C++",
    "duration": "50:10",
    "videoId": "FkaIZAQKmWU",
    "topics": [
      "std::string",
      "Null Terminator \\0",
      "Reverse String",
      "Palindrome Check"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <string>\nusing namespace std;\n\nbool isPalindrome(const string& s) {\n    int l = 0, r = s.length() - 1;\n    while (l < r) {\n        if (s[l++] != s[r--]) return false;\n    }\n    return true;\n}\n\nint main() {\n    string word = \"racecar\";\n    cout << word << \" is palindrome? \" << (isPalindrome(word) ? \"YES\" : \"NO\") << endl;\n    return 0;\n}\n"
    },
    "notes": "### Two-Pointer Palindrome Invariant:\nSimultaneously compare characters from both ends converging towards the center in `O(N/2) = O(N)`."
  },
  {
    "id": "ca-38",
    "lectureNumber": 32,
    "moduleId": "mod-7",
    "moduleName": "Strings & Pattern Matching Algorithms",
    "title": "L32: Longest Palindrome & Sorting the Sentence",
    "duration": "47:20",
    "videoId": "U1OZQl1fU7g",
    "topics": [
      "Character Frequency",
      "Odd / Even Occurrences",
      "Greedy Palindrome"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <unordered_map>\nusing namespace std;\n\nint longestPalindrome(const string& s) {\n    unordered_map<char, int> count;\n    for (char c : s) count[c]++;\n    int length = 0;\n    bool hasOdd = false;\n    for (auto& pair : count) {\n        if (pair.second % 2 == 0) length += pair.second;\n        else {\n            length += pair.second - 1;\n            hasOdd = true;\n        }\n    }\n    return hasOdd ? length + 1 : length;\n}\n\nint main() {\n    cout << \"Longest palindrome from 'abccccdd': \" << longestPalindrome(\"abccccdd\") << endl;\n    return 0;\n}\n"
    },
    "notes": "### Palindrome Construction:\nAll even occurrences can be symmetrically placed. At most one character with odd frequency can sit in the exact center!"
  },
  {
    "id": "ca-40",
    "lectureNumber": 33,
    "moduleId": "mod-7",
    "moduleName": "Strings & Pattern Matching Algorithms",
    "title": "L33: Factorial of Large Number & Roman Numerals",
    "duration": "53:45",
    "videoId": "BXocVkXthOE",
    "topics": [
      "BigInt Multiplication",
      "Array Digits",
      "Roman to Integer Conversion"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <unordered_map>\nusing namespace std;\n\nint romanToInt(const string& s) {\n    unordered_map<char, int> val = {\n        {'I', 1}, {'V', 5}, {'X', 10},\n        {'L', 50}, {'C', 100}, {'D', 500}, {'M', 1000}\n    };\n    int ans = 0;\n    for (int i = 0; i < s.length(); i++) {\n        if (i + 1 < s.length() && val[s[i]] < val[s[i + 1]]) {\n            ans -= val[s[i]];\n        } else {\n            ans += val[s[i]];\n        }\n    }\n    return ans;\n}\n\nint main() {\n    cout << \"MCMXCIV in decimal: \" << romanToInt(\"MCMXCIV\") << endl;\n    return 0;\n}\n"
    },
    "notes": "### Subtractive Roman Numerals:\nIf a Roman symbol is followed by a larger symbol, its value is subtracted (e.g. `IV = 5 - 1 = 4`). Otherwise added."
  },
  {
    "id": "ca-42",
    "lectureNumber": 34,
    "moduleId": "mod-7",
    "moduleName": "Strings & Pattern Matching Algorithms",
    "title": "L34: KMP Algorithm & Longest Prefix Suffix (LPS)",
    "duration": "1:04:10",
    "videoId": "sODA1BzFvsE",
    "topics": [
      "KMP Algorithm",
      "LPS Array",
      "Pattern Matching",
      "Linear O(N+M)"
    ],
    "difficulty": "Advanced",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nvector<int> computeLPS(const string& pat) {\n    int m = pat.length();\n    vector<int> lps(m, 0);\n    int len = 0, i = 1;\n    while (i < m) {\n        if (pat[i] == pat[len]) {\n            len++;\n            lps[i] = len;\n            i++;\n        } else {\n            if (len != 0) len = lps[len - 1];\n            else { lps[i] = 0; i++; }\n        }\n    }\n    return lps;\n}\n\nint main() {\n    string pat = \"AAACAAAA\";\n    vector<int> lps = computeLPS(pat);\n    cout << \"LPS Array: \";\n    for (int x : lps) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n"
    },
    "notes": "### KMP Longest Prefix Suffix (LPS):\nAvoids backtracking in the text during string searching, achieving optimal `O(N + M)` linear time!"
  },
  {
    "id": "ca-45",
    "lectureNumber": 35,
    "moduleId": "mod-8",
    "moduleName": "Pointers & Dynamic Memory",
    "title": "L35: Pointers Relationship with Arrays & Pointer Arithmetic",
    "duration": "51:30",
    "videoId": "KA3XnH6eYpY",
    "topics": [
      "Pointer Arithmetic",
      "Pointers & Arrays",
      "Dereference *",
      "Address-of &"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[] = {10, 20, 30, 40};\n    int* ptr = arr; // Decay to pointer to arr[0]\n\n    cout << \"*ptr:     \" << *ptr << endl;\n    cout << \"*(ptr+1): \" << *(ptr + 1) << endl;\n    cout << \"*(ptr+2): \" << *(ptr + 2) << endl;\n    return 0;\n}\n"
    },
    "notes": "### Pointer Scaling:\n`ptr + 1` does not add 1 byte! It adds `1 * sizeof(*ptr)` bytes (4 bytes for int), pointing directly to the next array element."
  },
  {
    "id": "ca-51",
    "lectureNumber": 36,
    "moduleId": "mod-9",
    "moduleName": "Recursion & Backtracking Deep Dive",
    "title": "L36: Introduction To Recursion From Basic To Advance",
    "duration": "54:40",
    "videoId": "j_n1W5YgN_4",
    "topics": [
      "Call Stack",
      "Base Case",
      "Print 1 to N",
      "Recursive Tree"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nvoid print1toN(int n) {\n    if (n == 0) return; // Base Case\n    print1toN(n - 1);   // Recursive Call\n    cout << n << \" \";   // Self Work\n}\n\nint main() {\n    cout << \"1 to 5: \";\n    print1toN(5);\n    cout << endl;\n    return 0;\n}\n"
    },
    "notes": "### Head vs Tail Recursion:\nPrinting after the recursive call prints numbers in ascending order because output is triggered during stack unwinding!"
  },
  {
    "id": "ca-52",
    "lectureNumber": 37,
    "moduleId": "mod-9",
    "moduleName": "Recursion & Backtracking Deep Dive",
    "title": "L37: How To Solve Recursion Problem from 4 different Methods",
    "duration": "57:15",
    "videoId": "2OQ46x0Zka8",
    "topics": [
      "4 Recursion Methods",
      "Accumulator Pattern",
      "Divide & Conquer",
      "Tree Traversal"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\n// Method: Parameterized / Accumulator Recursion\nvoid sumN(int n, int currentSum) {\n    if (n == 0) {\n        cout << \"Sum: \" << currentSum << endl;\n        return;\n    }\n    sumN(n - 1, currentSum + n);\n}\n\nint main() {\n    sumN(10, 0);\n    return 0;\n}\n"
    },
    "notes": "### Functional vs Parameterized Recursion:\n- **Functional:** Returns value from bottom up (`n + sum(n-1)`).\n- **Parameterized:** Accumulates answer on the way down into arguments."
  },
  {
    "id": "ca-58",
    "lectureNumber": 38,
    "moduleId": "mod-9",
    "moduleName": "Recursion & Backtracking Deep Dive",
    "title": "L38: Time and Space Complexity in Recursion",
    "duration": "49:10",
    "videoId": "2Ekun-ocGnQ",
    "topics": [
      "Recurrence Relations",
      "Tree Method",
      "Auxiliary Stack Space",
      "Master Theorem"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\n// Fibonacci: 2^N tree branches\nint fib(int n) {\n    if (n <= 1) return n;\n    return fib(n - 1) + fib(n - 2);\n}\n\nint main() {\n    cout << \"fib(7) = \" << fib(7) << endl;\n    return 0;\n}\n"
    },
    "notes": "### Recursive Complexity:\n- **Time Complexity:** Total nodes in the recursion tree multiplied by work per node.\n- **Space Complexity:** Maximum depth of the recursion tree (height of call stack)."
  },
  {
    "id": "ca-59",
    "lectureNumber": 39,
    "moduleId": "mod-9",
    "moduleName": "Recursion & Backtracking Deep Dive",
    "title": "L39: Merge Sort Algorithm (Divide & Conquer Proof)",
    "duration": "50:15",
    "videoId": "86HOPLCgc00",
    "topics": [
      "Divide and Conquer",
      "Merge Step",
      "O(N log N)",
      "Stable Sorting"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid merge(vector<int>& arr, int low, int mid, int high) {\n    vector<int> temp;\n    int left = low, right = mid + 1;\n    while (left <= mid && right <= high) {\n        if (arr[left] <= arr[right]) temp.push_back(arr[left++]);\n        else temp.push_back(arr[right++]);\n    }\n    while (left <= mid) temp.push_back(arr[left++]);\n    while (right <= high) temp.push_back(arr[right++]);\n    for (int i = low; i <= high; i++) arr[i] = temp[i - low];\n}\n\nvoid mergeSort(vector<int>& arr, int low, int high) {\n    if (low >= high) return;\n    int mid = low + (high - low) / 2;\n    mergeSort(arr, low, mid);\n    mergeSort(arr, mid + 1, high);\n    merge(arr, low, mid, high);\n}\n\nint main() {\n    vector<int> data = {38, 27, 43, 3, 9, 82, 10};\n    mergeSort(data, 0, data.size() - 1);\n    cout << \"Merge Sorted: \";\n    for (int x : data) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n"
    },
    "notes": "### Merge Sort Complexity:\n- Recurrence: `T(N) = 2*T(N/2) + O(N)`\n- Time: `O(N log N)` in all cases.\n- Space: `O(N)` auxiliary space."
  },
  {
    "id": "ca-61",
    "lectureNumber": 40,
    "moduleId": "mod-9",
    "moduleName": "Recursion & Backtracking Deep Dive",
    "title": "L40: Recursion on Subsequences & Generate Parentheses",
    "duration": "56:20",
    "videoId": "VxFM14y1-v4",
    "topics": [
      "Subsequences",
      "Include / Exclude Pattern",
      "Valid Parentheses",
      "Backtracking"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nvoid generateParentheses(int open, int close, int n, string current) {\n    if (current.length() == 2 * n) {\n        cout << current << \" \";\n        return;\n    }\n    if (open < n) generateParentheses(open + 1, close, n, current + \"(\");\n    if (close < open) generateParentheses(open, close + 1, n, current + \")\");\n}\n\nint main() {\n    cout << \"Valid parentheses pairs for n=3:\" << endl;\n    generateParentheses(0, 0, 3, \"\");\n    cout << endl;\n    return 0;\n}\n"
    },
    "notes": "### Catalan Number of Parentheses:\nValid pairs for `n` is given by `C_n = (1/(n+1)) * (2n choose n)`. Backtracking prunes invalid branches early!"
  },
  {
    "id": "ca-62",
    "lectureNumber": 41,
    "moduleId": "mod-9",
    "moduleName": "Recursion & Backtracking Deep Dive",
    "title": "L41: Recursion on Subset Sum & Target Sum",
    "duration": "52:10",
    "videoId": "73X0vvmUNHE",
    "topics": [
      "Subset Sum",
      "Pick / Don't Pick",
      "Recursive Branching",
      "2^N Search Space"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nbool subsetSum(const vector<int>& arr, int i, int target) {\n    if (target == 0) return true;\n    if (i == arr.size() || target < 0) return false;\n    // Pick or Don't Pick\n    return subsetSum(arr, i + 1, target - arr[i]) || subsetSum(arr, i + 1, target);\n}\n\nint main() {\n    vector<int> nums = {3, 34, 4, 12, 5, 2};\n    cout << \"Subset with sum 9 exists? \" << (subsetSum(nums, 0, 9) ? \"YES\" : \"NO\") << endl;\n    return 0;\n}\n"
    },
    "notes": "### Pick / Don't Pick Template:\nAt each element, branching gives 2 choices: include element in sum, or leave it out. Explores all `2^N` subsets!"
  },
  {
    "id": "ca-65",
    "lectureNumber": 42,
    "moduleId": "mod-9",
    "moduleName": "Recursion & Backtracking Deep Dive",
    "title": "L42: Permutations with Repetition & Ways to Sum N",
    "duration": "48:30",
    "videoId": "CQOUIxwQmec",
    "topics": [
      "Permutations",
      "State Backtracking",
      "Combination Sum"
    ],
    "difficulty": "Advanced",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint countWays(int n) {\n    if (n == 0) return 1;\n    if (n < 0) return 0;\n    return countWays(n - 1) + countWays(n - 2) + countWays(n - 3);\n}\n\nint main() {\n    cout << \"Ways to climb 4 stairs with {1, 2, 3} steps: \" << countWays(4) << endl;\n    return 0;\n}\n"
    },
    "notes": "### Tribonacci Staircase:\n`Ways(N) = Ways(N-1) + Ways(N-2) + Ways(N-3)`. Foundation for dynamic programming memoization."
  },
  {
    "id": "ca-73",
    "lectureNumber": 43,
    "moduleId": "mod-10",
    "moduleName": "Object-Oriented Programming (OOPs)",
    "title": "L43: Inheritance, Access Modifiers & Real-Life Examples",
    "duration": "58:40",
    "videoId": "qq3BY4viEB4",
    "topics": [
      "Inheritance",
      "Public vs Private vs Protected",
      "Constructor Chaining",
      "Polymorphism"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Animal {\nprotected:\n    string name;\npublic:\n    Animal(string n) : name(n) {}\n    virtual void speak() { cout << name << \" makes a sound.\" << endl; }\n};\n\nclass Dog : public Animal {\npublic:\n    Dog(string n) : Animal(n) {}\n    void speak() override { cout << name << \" barks: Woof! Woof!\" << endl; }\n};\n\nint main() {\n    Animal* a = new Dog(\"Tommy\");\n    a->speak(); // Virtual dispatch\n    delete a;\n    return 0;\n}\n"
    },
    "notes": "### Virtual Functions & V-Table:\nThe `virtual` keyword instructs the compiler to generate runtime v-tables for dynamic polymorphism!"
  },
  {
    "id": "ca-78",
    "lectureNumber": 44,
    "moduleId": "mod-11",
    "moduleName": "Linked Lists & LRU Cache",
    "title": "L44: Introduction To Linked List, Traversal & Insertion",
    "duration": "54:20",
    "videoId": "CE150x4w0bo",
    "topics": [
      "Singly Linked List",
      "Node Struct",
      "Heap Allocation (new)",
      "Head & Tail Insertion"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* next;\n    Node(int val) : data(val), next(nullptr) {}\n};\n\nvoid insertAtHead(Node*& head, int val) {\n    Node* newNode = new Node(val);\n    newNode->next = head;\n    head = newNode;\n}\n\nvoid printList(Node* head) {\n    while (head) {\n        cout << head->data << (head->next ? \" -> \" : \"\");\n        head = head->next;\n    }\n    cout << endl;\n}\n\nint main() {\n    Node* head = nullptr;\n    insertAtHead(head, 30);\n    insertAtHead(head, 20);\n    insertAtHead(head, 10);\n    cout << \"Linked List: \";\n    printList(head);\n    return 0;\n}\n"
    },
    "notes": "### Linked List Memory:\nNodes are allocated non-contiguously on the Heap. Pointers connect each node to its successor. Insertion at head is `O(1)`."
  },
  {
    "id": "ca-86",
    "lectureNumber": 45,
    "moduleId": "mod-11",
    "moduleName": "Linked Lists & LRU Cache",
    "title": "L45: Add Two Numbers as Linked Lists & Reverse in K-Groups",
    "duration": "1:01:10",
    "videoId": "qiS7-e2OXDc",
    "topics": [
      "Add Two Numbers",
      "Carry Propagation",
      "Reverse in K Groups",
      "Dummy Nodes"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n    ListNode dummy(0);\n    ListNode* curr = &dummy;\n    int carry = 0;\n    while (l1 || l2 || carry) {\n        int sum = carry;\n        if (l1) { sum += l1->val; l1 = l1->next; }\n        if (l2) { sum += l2->val; l2 = l2->next; }\n        carry = sum / 10;\n        curr->next = new ListNode(sum % 10);\n        curr = curr->next;\n    }\n    return dummy.next;\n}\n\nint main() {\n    cout << \"Add Two Numbers dummy node pattern compiled successfully.\" << endl;\n    return 0;\n}\n"
    },
    "notes": "### Dummy Head Pattern:\nUsing a dummy head sentinel node eliminates special-casing the first node in linked list creation."
  },
  {
    "id": "ca-87",
    "lectureNumber": 46,
    "moduleId": "mod-11",
    "moduleName": "Linked Lists & LRU Cache",
    "title": "L46: Flattening a Linked List & Merge K Sorted Lists",
    "duration": "59:20",
    "videoId": "2DQJvLq-rm8",
    "topics": [
      "Flatten Linked List",
      "Merge K Sorted",
      "Priority Queue",
      "Bottom Pointers"
    ],
    "difficulty": "Advanced",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* next;\n    Node* bottom;\n    Node(int d) : data(d), next(nullptr), bottom(nullptr) {}\n};\n\nNode* merge(Node* a, Node* b) {\n    if (!a) return b;\n    if (!b) return a;\n    Node* res;\n    if (a->data < b->data) {\n        res = a;\n        res->bottom = merge(a->bottom, b);\n    } else {\n        res = b;\n        res->bottom = merge(a, b->bottom);\n    }\n    return res;\n}\n\nint main() {\n    cout << \"Flattening recursive merge algorithm active.\" << endl;\n    return 0;\n}\n"
    },
    "notes": "### Flattening Invariant:\nRecursively flatten the right list, then merge the current column with the flattened result like Merge Sort!"
  },
  {
    "id": "ca-90",
    "lectureNumber": 47,
    "moduleId": "mod-12",
    "moduleName": "Stacks & Monotonic Stacks",
    "title": "L47: STACK: Valid Parentheses & Reverse Array with Stack",
    "duration": "50:30",
    "videoId": "abQZotIl70g",
    "topics": [
      "Stack LIFO Principle",
      "Valid Parentheses",
      "Reverse Using Stack",
      "std::stack"
    ],
    "difficulty": "Beginner",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nbool isValid(const string& s) {\n    stack<char> st;\n    for (char c : s) {\n        if (c == '(' || c == '{' || c == '[') st.push(c);\n        else {\n            if (st.empty()) return false;\n            char top = st.top();\n            st.pop();\n            if ((c == ')' && top != '(') ||\n                (c == '}' && top != '{') ||\n                (c == ']' && top != '[')) return false;\n        }\n    }\n    return st.empty();\n}\n\nint main() {\n    cout << \"{[()]} valid? \" << (isValid(\"{[()]}\") ? \"YES\" : \"NO\") << endl;\n    cout << \"{[(])} valid? \" << (isValid(\"{[(])}\") ? \"YES\" : \"NO\") << endl;\n    return 0;\n}\n"
    },
    "notes": "### Stack LIFO Properties:\nLast In, First Out. Ideal for balancing nested brackets, undo operations, and expression evaluation."
  },
  {
    "id": "ca-91",
    "lectureNumber": 48,
    "moduleId": "mod-12",
    "moduleName": "Stacks & Monotonic Stacks",
    "title": "L48: Next Greater Element, Next Smaller & Stock Span Problem",
    "duration": "55:10",
    "videoId": "8dwjKE9GM30",
    "topics": [
      "Monotonic Stack",
      "Next Greater Element",
      "Stock Span",
      "O(N) Amortized"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <stack>\nusing namespace std;\n\nvector<int> nextGreaterElement(const vector<int>& arr) {\n    int n = arr.size();\n    vector<int> nge(n, -1);\n    stack<int> st;\n\n    for (int i = n - 1; i >= 0; i--) {\n        while (!st.empty() && st.top() <= arr[i]) {\n            st.pop();\n        }\n        if (!st.empty()) nge[i] = st.top();\n        st.push(arr[i]);\n    }\n    return nge;\n}\n\nint main() {\n    vector<int> nums = {4, 5, 2, 25, 7, 8};\n    vector<int> res = nextGreaterElement(nums);\n    cout << \"Next Greater: \";\n    for (int x : res) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n"
    },
    "notes": "### Monotonic Decreasing Stack:\nTraverse backwards from right to left. Elements in the stack remain strictly decreasing. Every element is pushed and popped at most once -> `O(N)`!"
  },
  {
    "id": "ca-94",
    "lectureNumber": 49,
    "moduleId": "mod-12",
    "moduleName": "Stacks & Monotonic Stacks",
    "title": "L49: Monotonic Stack: Maximum of Minimum for Every Window",
    "duration": "1:06:20",
    "videoId": "DCU3T-XqG_s",
    "topics": [
      "Maximum of Minimum",
      "Largest Rectangle in Histogram",
      "Previous Smaller",
      "Next Smaller"
    ],
    "difficulty": "Advanced",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <stack>\nusing namespace std;\n\nint largestRectangleArea(const vector<int>& heights) {\n    stack<int> st;\n    int maxArea = 0, n = heights.size();\n    for (int i = 0; i <= n; i++) {\n        int h = (i == n) ? 0 : heights[i];\n        while (!st.empty() && heights[st.top()] >= h) {\n            int height = heights[st.top()];\n            st.pop();\n            int width = st.empty() ? i : i - st.top() - 1;\n            maxArea = max(maxArea, height * width);\n        }\n        st.push(i);\n    }\n    return maxArea;\n}\n\nint main() {\n    vector<int> heights = {2, 1, 5, 6, 2, 3};\n    cout << \"Largest Rectangle in Histogram: \" << largestRectangleArea(heights) << endl;\n    return 0;\n}\n"
    },
    "notes": "### Histogram Maximum Rectangle:\nPop elements that are higher than current. Each popped bar calculates its maximum rectangle bounded between its previous smaller and next smaller bars."
  },
  {
    "id": "ca-95",
    "lectureNumber": 50,
    "moduleId": "mod-12",
    "moduleName": "Stacks & Monotonic Stacks",
    "title": "L50: Implement Two Stacks in an Array & N Stacks",
    "duration": "52:45",
    "videoId": "ktUYEWjqRI8",
    "topics": [
      "Two Stacks in One Array",
      "N Stacks Space Partitioning",
      "Array Indexing"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nclass TwoStacks {\n    int* arr;\n    int size, top1, top2;\npublic:\n    TwoStacks(int n) {\n        size = n;\n        arr = new int[n];\n        top1 = -1;\n        top2 = size;\n    }\n    void push1(int x) {\n        if (top1 < top2 - 1) arr[++top1] = x;\n        else cout << \"Stack Overflow\" << endl;\n    }\n    void push2(int x) {\n        if (top1 < top2 - 1) arr[--top2] = x;\n        else cout << \"Stack Overflow\" << endl;\n    }\n    int pop1() { return (top1 >= 0) ? arr[top1--] : -1; }\n    int pop2() { return (top2 < size) ? arr[top2++] : -1; }\n};\n\nint main() {\n    TwoStacks ts(6);\n    ts.push1(5);\n    ts.push2(10);\n    cout << \"Pop1: \" << ts.pop1() << \", Pop2: \" << ts.pop2() << endl;\n    return 0;\n}\n"
    },
    "notes": "### Two Stacks Space Efficiency:\nStack 1 starts from index 0 growing right; Stack 2 starts from `size - 1` growing left. They only overflow when they meet in the middle!"
  },
  {
    "id": "ca-96",
    "lectureNumber": 51,
    "moduleId": "mod-13",
    "moduleName": "Queues & Sliding Window Deques",
    "title": "L51: Introduction To Queue & Circular Queue Implementation",
    "duration": "53:15",
    "videoId": "Ah-ZDJf9QW0",
    "topics": [
      "Queue FIFO Principle",
      "Circular Queue",
      "Array Implementation",
      "Modulo Arithmetic"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nclass MyCircularQueue {\n    int* arr;\n    int front, rear, size, capacity;\npublic:\n    MyCircularQueue(int k) {\n        capacity = k;\n        arr = new int[k];\n        front = 0;\n        rear = -1;\n        size = 0;\n    }\n    bool enQueue(int value) {\n        if (size == capacity) return false;\n        rear = (rear + 1) % capacity;\n        arr[rear] = value;\n        size++;\n        return true;\n    }\n    bool deQueue() {\n        if (size == 0) return false;\n        front = (front + 1) % capacity;\n        size--;\n        return true;\n    }\n    int Front() { return (size == 0) ? -1 : arr[front]; }\n    int Rear() { return (size == 0) ? -1 : arr[rear]; }\n};\n\nint main() {\n    MyCircularQueue q(3);\n    q.enQueue(10);\n    q.enQueue(20);\n    q.enQueue(30);\n    cout << \"Front: \" << q.Front() << \", Rear: \" << q.Rear() << endl;\n    return 0;\n}\n"
    },
    "notes": "### Circular Queue Modulo Trick:\n`(index + 1) % capacity` wraps pointers seamlessly back to 0 when reaching the buffer boundary without shifting elements!"
  },
  {
    "id": "ca-96-b",
    "lectureNumber": 52,
    "moduleId": "mod-13",
    "moduleName": "Queues & Sliding Window Deques",
    "title": "L52: Implement Queue using Two Stacks & Deque in C++",
    "duration": "46:30",
    "videoId": "Ah-ZDJf9QW0",
    "topics": [
      "Amortized O(1) Push/Pop",
      "Two Stacks Technique",
      "Double Ended Queue (Deque)",
      "C++ STL deque"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <stack>\nusing namespace std;\n\nclass MyQueue {\n    stack<int> s1, s2;\npublic:\n    void push(int x) { s1.push(x); }\n    int pop() {\n        if (s2.empty()) {\n            while (!s1.empty()) { s2.push(s1.top()); s1.pop(); }\n        }\n        int val = s2.top(); s2.pop();\n        return val;\n    }\n};\n\nint main() {\n    MyQueue q;\n    q.push(1); q.push(2); q.push(3);\n    cout << \"Popped: \" << q.pop() << endl;\n    return 0;\n}\n"
    },
    "notes": "### Amortized Complexity:\nEach element is pushed into $s_1$ once, popped from $s_1$ once, pushed into $s_2$ once, and popped from $s_2$ once $\rightarrow$ exactly $4$ operations per element $implies$ **Amortized $O(1)$** time!"
  },
  {
    "id": "ca-96-c",
    "lectureNumber": 53,
    "moduleId": "mod-13",
    "moduleName": "Queues & Sliding Window Deques",
    "title": "L53: Sliding Window Maximum using Monotonic Deque",
    "duration": "52:15",
    "videoId": "Ah-ZDJf9QW0",
    "topics": [
      "Monotonic Decreasing Deque",
      "Sliding Window O(N) Technique",
      "Removing Out of Bound Indices",
      "First Negative in Window"
    ],
    "difficulty": "Advanced",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <deque>\nusing namespace std;\n\nvector<int> maxSlidingWindow(vector<int>& nums, int k) {\n    deque<int> dq;\n    vector<int> ans;\n    for (int i = 0; i < nums.size(); i++) {\n        if (!dq.empty() && dq.front() == i - k) dq.pop_front();\n        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();\n        dq.push_back(i);\n        if (i >= k - 1) ans.push_back(nums[dq.front()]);\n    }\n    return ans;\n}\n\nint main() {\n    vector<int> nums = {1, 3, -1, -3, 5, 3, 6, 7};\n    vector<int> res = maxSlidingWindow(nums, 3);\n    cout << \"Sliding Window Max: \";\n    for (int x : res) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n"
    },
    "notes": "### Monotonic Deque Invariant:\nIndices in the deque maintain values in strictly decreasing order. The front of the deque is ALWAYS the maximum element in the current window!"
  },
  {
    "id": "ca-97",
    "lectureNumber": 54,
    "moduleId": "mod-14",
    "moduleName": "Binary Trees Masterclass",
    "title": "L54: Introduction To Tree Data Structure & Binary Tree Representation",
    "duration": "52:40",
    "videoId": "_b0bfpO3b4I",
    "topics": [
      "Non-linear Data Structures",
      "Root, Node, Leaf, Internal",
      "Binary Tree Node Definition in C++",
      "Tree Creation using Pointers"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* left;\n    Node* right;\n    Node(int val) : data(val), left(nullptr), right(nullptr) {}\n};\n\nNode* buildTree() {\n    int val;\n    cout << \"Enter node value (-1 for null): \";\n    if (!(cin >> val) || val == -1) return nullptr;\n    Node* root = new Node(val);\n    cout << \"Left child of \" << val << \": \";\n    root->left = buildTree();\n    cout << \"Right child of \" << val << \": \";\n    root->right = buildTree();\n    return root;\n}\n\nint main() {\n    cout << \"Creating Binary Tree...\" << endl;\n    Node* root = new Node(10);\n    root->left = new Node(20);\n    root->right = new Node(30);\n    cout << \"Root: \" << root->data << \", Left: \" << root->left->data << \", Right: \" << root->right->data << endl;\n    return 0;\n}\n",
      "python": "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\nroot = TreeNode(10)\nroot.left = TreeNode(20)\nroot.right = TreeNode(30)\nprint(f\"Root: {root.val}, Left: {root.left.val}, Right: {root.right.val}\")\n"
    },
    "notes": "### Binary Tree Properties:\n1. Maximum nodes at level $L$: $2^L$ (root at $L=0$).\n2. Maximum nodes in a binary tree of height $H$: $2^H - 1$.\n3. For $N$ nodes, minimum height is $lceil log_2(N+1) \rceil$."
  },
  {
    "id": "ca-98",
    "lectureNumber": 55,
    "moduleId": "mod-14",
    "moduleName": "Binary Trees Masterclass",
    "title": "L55: Binary Tree Traversals: Inorder, Preorder, Postorder & Level Order (BFS)",
    "duration": "58:15",
    "videoId": "pMHXL46exp4",
    "topics": [
      "Depth First Traversals (DFS)",
      "Preorder (Root, L, R)",
      "Inorder (L, Root, R)",
      "Postorder (L, R, Root)",
      "Level Order Traversal with Queue"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <queue>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* left;\n    Node* right;\n    Node(int v) : data(v), left(nullptr), right(nullptr) {}\n};\n\nvoid inorder(Node* root) {\n    if (!root) return;\n    inorder(root->left);\n    cout << root->data << \" \";\n    inorder(root->right);\n}\n\nvoid levelOrder(Node* root) {\n    if (!root) return;\n    queue<Node*> q;\n    q.push(root);\n    while (!q.empty()) {\n        Node* curr = q.front();\n        q.pop();\n        cout << curr->data << \" \";\n        if (curr->left) q.push(curr->left);\n        if (curr->right) q.push(curr->right);\n    }\n}\n\nint main() {\n    Node* root = new Node(1);\n    root->left = new Node(2);\n    root->right = new Node(3);\n    root->left->left = new Node(4);\n    root->left->right = new Node(5);\n\n    cout << \"Inorder: \"; inorder(root); cout << endl;\n    cout << \"Level Order: \"; levelOrder(root); cout << endl;\n    return 0;\n}\n",
      "python": "from collections import deque\n\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef inorder(root):\n    if not root: return []\n    return inorder(root.left) + [root.val] + inorder(root.right)\n\ndef level_order(root):\n    if not root: return []\n    res, q = [], deque([root])\n    while q:\n        curr = q.popleft()\n        res.append(curr.val)\n        if curr.left: q.append(curr.left)\n        if curr.right: q.append(curr.right)\n    return res\n\nroot = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))\nprint(\"Inorder:\", inorder(root))\nprint(\"Level Order:\", level_order(root))\n"
    },
    "notes": "### DFS vs BFS Traversals:\n- **DFS** uses call stack / recursion ($O(H)$ extra space).\n- **BFS (Level Order)** uses explicit queue ($O(W)$ extra space where $W$ is max width of tree)."
  },
  {
    "id": "ca-99",
    "lectureNumber": 56,
    "moduleId": "mod-14",
    "moduleName": "Binary Trees Masterclass",
    "title": "L56: Binary Tree Size, Height, Maximum Node & Leaf Count",
    "duration": "47:20",
    "videoId": "T78jHD4fNgc",
    "topics": [
      "Recursive Tree Subproblem Decomposition",
      "Height of Tree (max(left, right) + 1)",
      "Total Node Count",
      "Counting Leaves"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* left;\n    Node* right;\n    Node(int v) : data(v), left(nullptr), right(nullptr) {}\n};\n\nint getHeight(Node* root) {\n    if (!root) return 0;\n    return 1 + max(getHeight(root->left), getHeight(root->right));\n}\n\nint countNodes(Node* root) {\n    if (!root) return 0;\n    return 1 + countNodes(root->left) + countNodes(root->right);\n}\n\nint main() {\n    Node* root = new Node(10);\n    root->left = new Node(20);\n    root->right = new Node(30);\n    root->left->left = new Node(40);\n    cout << \"Tree Height: \" << getHeight(root) << endl;\n    cout << \"Total Nodes: \" << countNodes(root) << endl;\n    return 0;\n}\n"
    },
    "notes": "### Tree Recursion Master Formula:\n`result(root) = combine(result(root->left), result(root->right), root->val)`"
  },
  {
    "id": "ca-100",
    "lectureNumber": 57,
    "moduleId": "mod-14",
    "moduleName": "Binary Trees Masterclass",
    "title": "L57: Check for Balanced Binary Tree & Mirror Trees",
    "duration": "54:30",
    "videoId": "f7IZ0IXLvhI",
    "topics": [
      "Height Balanced Condition (|h_L - h_R| <= 1)",
      "O(N) Optimized Height Check",
      "Symmetric / Mirror Trees",
      "Identical Tree Comparison"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <cmath>\n#include <algorithm>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* left;\n    Node* right;\n    Node(int v) : data(v), left(nullptr), right(nullptr) {}\n};\n\n// Returns height if balanced, -1 if unbalanced\nint checkBalance(Node* root) {\n    if (!root) return 0;\n    int lh = checkBalance(root->left);\n    if (lh == -1) return -1;\n    int rh = checkBalance(root->right);\n    if (rh == -1) return -1;\n    if (abs(lh - rh) > 1) return -1;\n    return 1 + max(lh, rh);\n}\n\nbool isBalanced(Node* root) {\n    return checkBalance(root) != -1;\n}\n\nint main() {\n    Node* root = new Node(1);\n    root->left = new Node(2);\n    root->right = new Node(3);\n    root->left->left = new Node(4);\n    cout << \"Is Balanced: \" << (isBalanced(root) ? \"Yes\" : \"No\") << endl;\n    return 0;\n}\n"
    },
    "notes": "### O(N) Balanced Check:\nReturn -1 immediately up the recursion call stack as soon as any subtree violates the balance condition!"
  },
  {
    "id": "ca-101",
    "lectureNumber": 58,
    "moduleId": "mod-14",
    "moduleName": "Binary Trees Masterclass",
    "title": "L58: Construct Binary Tree from Inorder & Preorder Traversal",
    "duration": "59:10",
    "videoId": "XGnLaRwh0bY",
    "topics": [
      "Unique Tree Construction Condition",
      "Root from Preorder",
      "Partitioning Inorder with Hash Map",
      "Boundary Index Math"
    ],
    "difficulty": "Advanced",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* left;\n    Node* right;\n    Node(int v) : data(v), left(nullptr), right(nullptr) {}\n};\n\nNode* build(vector<int>& pre, int preStart, int preEnd,\n            vector<int>& in, int inStart, int inEnd,\n            unordered_map<int, int>& inMap) {\n    if (preStart > preEnd || inStart > inEnd) return nullptr;\n    Node* root = new Node(pre[preStart]);\n    int inRoot = inMap[root->data];\n    int numsLeft = inRoot - inStart;\n\n    root->left = build(pre, preStart + 1, preStart + numsLeft, in, inStart, inRoot - 1, inMap);\n    root->right = build(pre, preStart + numsLeft + 1, preEnd, in, inRoot + 1, inEnd, inMap);\n    return root;\n}\n\nint main() {\n    vector<int> preorder = {3, 9, 20, 15, 7};\n    vector<int> inorder = {9, 3, 15, 20, 7};\n    unordered_map<int, int> inMap;\n    for (int i = 0; i < inorder.size(); i++) inMap[inorder[i]] = i;\n    Node* root = build(preorder, 0, preorder.size() - 1, inorder, 0, inorder.size() - 1, inMap);\n    cout << \"Tree successfully constructed! Root: \" << root->data << endl;\n    return 0;\n}\n"
    },
    "notes": "### Key Rule for Construction:\nPreorder tells you the **Root**. Inorder partitions that root's **Left Subtree** and **Right Subtree**."
  },
  {
    "id": "ca-102",
    "lectureNumber": 59,
    "moduleId": "mod-14",
    "moduleName": "Binary Trees Masterclass",
    "title": "L59: Vertical Traversal, Boundary View & Lowest Common Ancestor (LCA)",
    "duration": "1:02:15",
    "videoId": "aBqPnkXmvpY",
    "topics": [
      "Horizontal Distance (HD)",
      "Top View & Bottom View",
      "Boundary Clockwise Traversal",
      "Lowest Common Ancestor (LCA) in O(N)"
    ],
    "difficulty": "Advanced",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* left;\n    Node* right;\n    Node(int v) : data(v), left(nullptr), right(nullptr) {}\n};\n\nNode* lowestCommonAncestor(Node* root, Node* p, Node* q) {\n    if (!root || root == p || root == q) return root;\n    Node* left = lowestCommonAncestor(root->left, p, q);\n    Node* right = lowestCommonAncestor(root->right, p, q);\n    if (!left) return right;\n    if (!right) return left;\n    return root; // Both left and right found, current root is LCA\n}\n\nint main() {\n    Node* root = new Node(3);\n    root->left = new Node(5);\n    root->right = new Node(1);\n    root->left->left = new Node(6);\n    root->left->right = new Node(2);\n\n    Node* lca = lowestCommonAncestor(root, root->left->left, root->left->right);\n    cout << \"LCA of 6 and 2 is: \" << lca->data << endl;\n    return 0;\n}\n"
    },
    "notes": "### LCA Recursive Rule:\nIf root is p or q, return root. If both left and right calls return non-null, root is the LCA."
  },
  {
    "id": "ca-103",
    "lectureNumber": 60,
    "moduleId": "mod-15",
    "moduleName": "Binary Search Trees (BST) & Heaps",
    "title": "L60: Binary Search Tree (BST) – Implementation, Search, Insert & Delete",
    "duration": "57:45",
    "videoId": "Ir9Ni46g8Qo",
    "topics": [
      "BST Ordering Property",
      "Inorder of BST is Sorted",
      "Search in O(log N)",
      "Node Deletion (0, 1, and 2 children cases)"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int val;\n    Node* left;\n    Node* right;\n    Node(int v) : val(v), left(nullptr), right(nullptr) {}\n};\n\nNode* insertBST(Node* root, int val) {\n    if (!root) return new Node(val);\n    if (val < root->val) root->left = insertBST(root->left, val);\n    else root->right = insertBST(root->right, val);\n    return root;\n}\n\nNode* searchBST(Node* root, int val) {\n    if (!root || root->val == val) return root;\n    return val < root->val ? searchBST(root->left, val) : searchBST(root->right, val);\n}\n\nint main() {\n    Node* root = nullptr;\n    root = insertBST(root, 50);\n    insertBST(root, 30);\n    insertBST(root, 70);\n    insertBST(root, 20);\n    insertBST(root, 40);\n\n    Node* found = searchBST(root, 40);\n    cout << \"Search 40: \" << (found ? \"Found!\" : \"Not Found\") << endl;\n    return 0;\n}\n"
    },
    "notes": "### BST Deletion:\n- Leaf node: simply delete.\n- 1 child: replace with child.\n- 2 children: replace with Inorder Successor (smallest in right subtree), then delete successor."
  },
  {
    "id": "ca-104",
    "lectureNumber": 61,
    "moduleId": "mod-15",
    "moduleName": "Binary Search Trees (BST) & Heaps",
    "title": "L61: Lowest Common Ancestor (LCA) in BST & Range Search",
    "duration": "48:30",
    "videoId": "YKo8QaW02z8",
    "topics": [
      "BST LCA without extra space",
      "Range Sum in BST",
      "Check if Tree is Valid BST",
      "Inorder Predecessor & Successor"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int val;\n    Node* left;\n    Node* right;\n    Node(int v) : val(v), left(nullptr), right(nullptr) {}\n};\n\nNode* lcaBST(Node* root, int p, int q) {\n    if (!root) return nullptr;\n    if (p < root->val && q < root->val) return lcaBST(root->left, p, q);\n    if (p > root->val && q > root->val) return lcaBST(root->right, p, q);\n    return root; // Split point is the LCA!\n}\n\nint main() {\n    Node* root = new Node(6);\n    root->left = new Node(2);\n    root->right = new Node(8);\n    root->left->left = new Node(0);\n    root->left->right = new Node(4);\n\n    Node* lca = lcaBST(root, 0, 4);\n    cout << \"LCA of 0 and 4 in BST: \" << lca->val << endl;\n    return 0;\n}\n"
    },
    "notes": "### BST LCA Insight:\nIn a BST, the LCA is the first node where paths to p and q split (one goes left, one goes right)!"
  },
  {
    "id": "ca-105",
    "lectureNumber": 62,
    "moduleId": "mod-15",
    "moduleName": "Binary Search Trees (BST) & Heaps",
    "title": "L62: Heap Data Structure – Min Heap & Max Heap Insertion / Deletion",
    "duration": "56:20",
    "videoId": "ilz-VZBz5Vg",
    "topics": [
      "Complete Binary Tree (CBT)",
      "Array Representation (2i+1, 2i+2)",
      "Heap Property",
      "Push & Pop in O(log N)"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass MaxHeap {\n    vector<int> arr;\npublic:\n    void push(int val) {\n        arr.push_back(val);\n        int idx = arr.size() - 1;\n        while (idx > 0) {\n            int parent = (idx - 1) / 2;\n            if (arr[parent] < arr[idx]) {\n                swap(arr[parent], arr[idx]);\n                idx = parent;\n            } else break;\n        }\n    }\n    int top() { return arr.empty() ? -1 : arr[0]; }\n};\n\nint main() {\n    MaxHeap h;\n    h.push(10);\n    h.push(40);\n    h.push(30);\n    h.push(60);\n    cout << \"Max element: \" << h.top() << endl;\n    return 0;\n}\n"
    },
    "notes": "### Complete Binary Tree Array Indexing:\n- Parent: `(i - 1) / 2`\n- Left child: `2 * i + 1`\n- Right child: `2 * i + 2`"
  },
  {
    "id": "ca-106",
    "lectureNumber": 63,
    "moduleId": "mod-15",
    "moduleName": "Binary Search Trees (BST) & Heaps",
    "title": "L63: Heapify Algorithm & Heap Sort Implementation in C++",
    "duration": "52:10",
    "videoId": "kcGENCHENgY",
    "topics": [
      "Heapify in O(log N)",
      "Building Heap in O(N) Time Proof",
      "In-Place Heap Sort Algorithm",
      "Ascending vs Descending Sort"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid heapify(vector<int>& arr, int n, int i) {\n    int largest = i;\n    int left = 2 * i + 1, right = 2 * i + 2;\n    if (left < n && arr[left] > arr[largest]) largest = left;\n    if (right < n && arr[right] > arr[largest]) largest = right;\n    if (largest != i) {\n        swap(arr[i], arr[largest]);\n        heapify(arr, n, largest);\n    }\n}\n\nvoid heapSort(vector<int>& arr) {\n    int n = arr.size();\n    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);\n    for (int i = n - 1; i > 0; i--) {\n        swap(arr[0], arr[i]);\n        heapify(arr, i, 0);\n    }\n}\n\nint main() {\n    vector<int> arr = {12, 11, 13, 5, 6, 7};\n    heapSort(arr);\n    cout << \"Sorted array: \";\n    for (int x : arr) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n"
    },
    "notes": "### Heap Sort Complexity:\n- Time: $O(N log N)$ in all cases (best, average, worst).\n- Space: $O(1)$ auxiliary memory (in-place)."
  },
  {
    "id": "ca-107",
    "lectureNumber": 64,
    "moduleId": "mod-15",
    "moduleName": "Binary Search Trees (BST) & Heaps",
    "title": "L64: Priority Queues & Kth Largest Element",
    "duration": "49:15",
    "videoId": "pCsWDX2K06o",
    "topics": [
      "C++ STL priority_queue",
      "Min-Heap vs Max-Heap syntax",
      "Kth Largest using Min-Heap of size K",
      "Top K Frequent Elements"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nint findKthLargest(vector<int>& nums, int k) {\n    priority_queue<int, vector<int>, greater<int>> minHeap;\n    for (int num : nums) {\n        minHeap.push(num);\n        if (minHeap.size() > k) minHeap.pop();\n    }\n    return minHeap.top();\n}\n\nint main() {\n    vector<int> nums = {3, 2, 1, 5, 6, 4};\n    cout << \"2nd Largest: \" << findKthLargest(nums, 2) << endl;\n    return 0;\n}\n"
    },
    "notes": "### Top K Elements Pattern:\nTo find Kth **Largest**, maintain a **Min-Heap** of size $K$.\nTo find Kth **Smallest**, maintain a **Max-Heap** of size $K$."
  },
  {
    "id": "ca-109",
    "lectureNumber": 65,
    "moduleId": "mod-16",
    "moduleName": "Graph Data Structures & Algorithms",
    "title": "L65: Introduction To Graph Representation (Adjacency Matrix & List)",
    "duration": "55:30",
    "videoId": "gGlfzqPT-hE",
    "topics": [
      "Graph Terminology (Nodes, Edges, Weights)",
      "Directed vs Undirected",
      "Adjacency Matrix (O(V^2))",
      "Adjacency List (O(V + E))"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Graph {\n    int V;\n    vector<vector<int>> adj;\npublic:\n    Graph(int v) : V(v), adj(v) {}\n    void addEdge(int u, int v, bool directed = false) {\n        adj[u].push_back(v);\n        if (!directed) adj[v].push_back(u);\n    }\n    void print() {\n        for (int i = 0; i < V; i++) {\n            cout << i << \" -> \";\n            for (int neighbor : adj[i]) cout << neighbor << \" \";\n            cout << endl;\n        }\n    }\n};\n\nint main() {\n    Graph g(4);\n    g.addEdge(0, 1);\n    g.addEdge(0, 2);\n    g.addEdge(1, 2);\n    g.addEdge(2, 3);\n    g.print();\n    return 0;\n}\n"
    },
    "notes": "### Adjacency Representation Tradeoffs:\n- **Matrix**: $O(1)$ edge existence query, but $O(V^2)$ memory.\n- **List**: $O(V+E)$ memory, ideal for sparse real-world graphs."
  },
  {
    "id": "ca-110",
    "lectureNumber": 66,
    "moduleId": "mod-16",
    "moduleName": "Graph Data Structures & Algorithms",
    "title": "L66: Graph Traversals: Breadth-First Search (BFS) & Depth-First Search (DFS)",
    "duration": "1:01:20",
    "videoId": "bxbrUGvBCnY",
    "topics": [
      "BFS using Queue",
      "Visited Array to prevent infinite cycles",
      "DFS using Call Stack / Recursion",
      "Disconnected Components Handling"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nvoid bfs(int start, vector<vector<int>>& adj, vector<bool>& visited) {\n    queue<int> q;\n    visited[start] = true;\n    q.push(start);\n    while (!q.empty()) {\n        int u = q.front(); q.pop();\n        cout << u << \" \";\n        for (int v : adj[u]) {\n            if (!visited[v]) {\n                visited[v] = true;\n                q.push(v);\n            }\n        }\n    }\n}\n\nint main() {\n    int V = 5;\n    vector<vector<int>> adj(V);\n    adj[0] = {1, 2}; adj[1] = {0, 3}; adj[2] = {0, 4}; adj[3] = {1}; adj[4] = {2};\n    vector<bool> visited(V, false);\n    cout << \"BFS Traversal: \";\n    bfs(0, adj, visited);\n    cout << endl;\n    return 0;\n}\n"
    },
    "notes": "### Graph Traversal Complexities:\n- Time: $O(V + E)$ where $V$ is number of vertices and $E$ is number of edges.\n- Space: $O(V)$ for the visited array and traversal queue/stack."
  },
  {
    "id": "ca-111",
    "lectureNumber": 67,
    "moduleId": "mod-16",
    "moduleName": "Graph Data Structures & Algorithms",
    "title": "L67: Detect Cycle in Undirected Graph using BFS & DFS",
    "duration": "53:40",
    "videoId": "oz1EaP_Bw4s",
    "topics": [
      "Parent Pointer Tracking",
      "Visited Neighbor != Parent Condition",
      "BFS Cycle Detection with queue<pair<node, parent>>",
      "DFS Cycle Detection"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nbool detectCycleBFS(int src, vector<vector<int>>& adj, vector<bool>& vis) {\n    queue<pair<int, int>> q; // {node, parent}\n    vis[src] = true;\n    q.push({src, -1});\n    while (!q.empty()) {\n        int node = q.front().first;\n        int parent = q.front().second;\n        q.pop();\n        for (int adjNode : adj[node]) {\n            if (!vis[adjNode]) {\n                vis[adjNode] = true;\n                q.push({adjNode, node});\n            } else if (adjNode != parent) {\n                return true; // Cycle detected!\n            }\n        }\n    }\n    return false;\n}\n\nint main() {\n    int V = 4;\n    vector<vector<int>> adj(V);\n    adj[0] = {1, 2}; adj[1] = {0, 2}; adj[2] = {0, 1, 3}; adj[3] = {2};\n    vector<bool> vis(V, false);\n    cout << \"Has Cycle: \" << (detectCycleBFS(0, adj, vis) ? \"Yes\" : \"No\") << endl;\n    return 0;\n}\n"
    },
    "notes": "### Cycle in Undirected Graph:\nA cycle exists if we encounter a visited neighbor that is NOT the immediate parent from which we arrived!"
  },
  {
    "id": "ca-112",
    "lectureNumber": 68,
    "moduleId": "mod-16",
    "moduleName": "Graph Data Structures & Algorithms",
    "title": "L68: Detect Cycle in Directed Graph & Topological Sort (Kahn Algorithm)",
    "duration": "58:50",
    "videoId": "sPlN86EpjJA",
    "topics": [
      "Directed Acyclic Graph (DAG)",
      "Indegree Calculation",
      "Kahn Algorithm using BFS queue",
      "Topological Ordering for Dependency Graphs"
    ],
    "difficulty": "Advanced",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nvector<int> topoSort(int V, vector<vector<int>>& adj) {\n    vector<int> indegree(V, 0);\n    for (int i = 0; i < V; i++) {\n        for (int v : adj[i]) indegree[v]++;\n    }\n    queue<int> q;\n    for (int i = 0; i < V; i++) {\n        if (indegree[i] == 0) q.push(i);\n    }\n    vector<int> topo;\n    while (!q.empty()) {\n        int u = q.front(); q.pop();\n        topo.push_back(u);\n        for (int v : adj[u]) {\n            indegree[v]--;\n            if (indegree[v] == 0) q.push(v);\n        }\n    }\n    return topo;\n}\n\nint main() {\n    int V = 4;\n    vector<vector<int>> adj(V);\n    adj[0].push_back(1); adj[0].push_back(2);\n    adj[1].push_back(3); adj[2].push_back(3);\n    vector<int> order = topoSort(V, adj);\n    cout << \"Topological Order: \";\n    for (int x : order) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n"
    },
    "notes": "### Kahn's Algorithm Cycle Check:\nIf the topological sort output contains fewer than $V$ vertices, the graph contains a directed cycle!"
  },
  {
    "id": "ca-113",
    "lectureNumber": 69,
    "moduleId": "mod-16",
    "moduleName": "Graph Data Structures & Algorithms",
    "title": "L69: Shortest Path in Weighted Graph: Dijkstra Algorithm",
    "duration": "58:20",
    "videoId": "bxbrUGvBCnY",
    "topics": [
      "Greedy Shortest Path",
      "Min-Heap Priority Queue",
      "Edge Relaxation (dist[v] > dist[u] + w)",
      "Why Dijkstra Fails on Negative Weights"
    ],
    "difficulty": "Advanced",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nvector<int> dijkstra(int V, vector<vector<pair<int, int>>>& adj, int src) {\n    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;\n    vector<int> dist(V, 1e9);\n    dist[src] = 0;\n    pq.push({0, src});\n\n    while (!pq.empty()) {\n        int d = pq.top().first;\n        int u = pq.top().second;\n        pq.pop();\n        if (d > dist[u]) continue;\n\n        for (auto& edge : adj[u]) {\n            int v = edge.first, w = edge.second;\n            if (dist[u] + w < dist[v]) {\n                dist[v] = dist[u] + w;\n                pq.push({dist[v], v});\n            }\n        }\n    }\n    return dist;\n}\n\nint main() {\n    int V = 4;\n    vector<vector<pair<int, int>>> adj(V);\n    adj[0].push_back({1, 4}); adj[0].push_back({2, 1});\n    adj[2].push_back({1, 2}); adj[1].push_back({3, 1});\n    adj[2].push_back({3, 5});\n\n    vector<int> d = dijkstra(V, adj, 0);\n    cout << \"Shortest distance from 0 to 3: \" << d[3] << endl;\n    return 0;\n}\n"
    },
    "notes": "### Dijkstra Complexity:\n- Time: $O((V + E) log V)$ using Min-Heap priority queue.\n- Space: $O(V)$ for distance array and priority queue."
  },
  {
    "id": "ca-114",
    "lectureNumber": 70,
    "moduleId": "mod-16",
    "moduleName": "Graph Data Structures & Algorithms",
    "title": "L70: Disjoint Set Union (DSU) by Rank & Kruskal Minimum Spanning Tree",
    "duration": "1:02:10",
    "videoId": "gGlfzqPT-hE",
    "topics": [
      "Union by Rank / Size",
      "Path Compression Optimization",
      "Amortized O(alpha(V)) Ackermann Time",
      "Kruskal Greedy MST Algorithm"
    ],
    "difficulty": "Advanced",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass DSU {\n    vector<int> parent, rank;\npublic:\n    DSU(int n) : parent(n), rank(n, 0) {\n        for (int i = 0; i < n; i++) parent[i] = i;\n    }\n    int find(int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent[i]); // Path compression\n    }\n    bool unite(int i, int j) {\n        int root_i = find(i), root_j = find(j);\n        if (root_i == root_j) return false;\n        if (rank[root_i] < rank[root_j]) swap(root_i, root_j);\n        parent[root_j] = root_i;\n        if (rank[root_i] == rank[root_j]) rank[root_i]++;\n        return true;\n    }\n};\n\nint main() {\n    DSU d(5);\n    cout << \"Unite 0 and 1: \" << d.unite(0, 1) << endl;\n    cout << \"Unite 1 and 2: \" << d.unite(1, 2) << endl;\n    cout << \"Is 0 connected to 2: \" << (d.find(0) == d.find(2) ? \"Yes\" : \"No\") << endl;\n    return 0;\n}\n"
    },
    "notes": "### Disjoint Set Union:\nWith both **Path Compression** and **Union by Rank**, any sequence of $M$ operations on $N$ elements takes $O(M alpha(N))$ time, where $alpha$ is the Inverse Ackermann function (effectively constant $le 4$ for all practical inputs)."
  },
  {
    "id": "ca-115",
    "lectureNumber": 71,
    "moduleId": "mod-17",
    "moduleName": "Dynamic Programming (DP) Mastery",
    "title": "L71: Introduction to Dynamic Programming: Memoization vs Tabulation",
    "duration": "54:10",
    "videoId": "_kio3U6CV2c",
    "topics": [
      "Overlapping Subproblems",
      "Optimal Substructure",
      "Top-Down (Recursion + DP Array)",
      "Bottom-Up (Iterative Tabulation) & Space Optimization"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n// Space-optimized O(1) space Fibonacci DP\nint fib(int n) {\n    if (n <= 1) return n;\n    int prev2 = 0, prev = 1;\n    for (int i = 2; i <= n; i++) {\n        int curr = prev + prev2;\n        prev2 = prev;\n        prev = curr;\n    }\n    return prev;\n}\n\nint main() {\n    cout << \"Fibonacci(10) = \" << fib(10) << endl;\n    return 0;\n}\n",
      "python": "def fib(n: int) -> int:\n    if n <= 1: return n\n    prev2, prev = 0, 1\n    for _ in range(2, n + 1):\n        prev2, prev = prev, prev + prev2\n    return prev\n\nprint(\"Fibonacci(10) =\", fib(10))\n"
    },
    "notes": "### DP Golden Rule:\n1. Write brute-force recursive relation.\n2. Memoize overlapping calls with a state array `dp[state]`.\n3. Convert to iterative bottom-up table.\n4. Optimize space if only previous $k$ states are needed!"
  },
  {
    "id": "ca-116",
    "lectureNumber": 72,
    "moduleId": "mod-17",
    "moduleName": "Dynamic Programming (DP) Mastery",
    "title": "L72: 1D DP: Climbing Stairs & Frog Jump Problem",
    "duration": "51:40",
    "videoId": "9sr3aWtqpGA",
    "topics": [
      "Climbing Stairs Recurrence (f(n) = f(n-1) + f(n-2))",
      "Frog Jump with Minimum Energy",
      "State Transition Graph",
      "Space Optimization to O(1)"
    ],
    "difficulty": "Intermediate",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <cmath>\nusing namespace std;\n\nint frogJump(int n, vector<int>& heights) {\n    int prev = 0, prev2 = 0;\n    for (int i = 1; i < n; i++) {\n        int jumpOne = prev + abs(heights[i] - heights[i - 1]);\n        int jumpTwo = (i > 1) ? prev2 + abs(heights[i] - heights[i - 2]) : 1e9;\n        int curr = min(jumpOne, jumpTwo);\n        prev2 = prev;\n        prev = curr;\n    }\n    return prev;\n}\n\nint main() {\n    vector<int> heights = {10, 20, 30, 10};\n    cout << \"Min Energy: \" << frogJump(heights.size(), heights) << endl;\n    return 0;\n}\n"
    },
    "notes": "### Frog Jump Recurrence:\n`dp[i] = min(dp[i-1] + |h[i] - h[i-1]|, dp[i-2] + |h[i] - h[i-2]|)`"
  },
  {
    "id": "ca-118",
    "lectureNumber": 73,
    "moduleId": "mod-17",
    "moduleName": "Dynamic Programming (DP) Mastery",
    "title": "L73: 2D Grid DP: Unique Paths & 0/1 Knapsack Masterclass",
    "duration": "1:04:15",
    "videoId": "tGQ3XFZMHCQ",
    "topics": [
      "Grid DP (Paths from (0,0) to (m-1, n-1))",
      "0/1 Knapsack Problem",
      "Pick vs Not-Pick Choice Diagram",
      "Space Optimization with 1D Array"
    ],
    "difficulty": "Advanced",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint knapsack(int W, vector<int>& wt, vector<int>& val, int n) {\n    vector<int> dp(W + 1, 0);\n    for (int i = 0; i < n; i++) {\n        for (int w = W; w >= wt[i]; w--) {\n            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);\n        }\n    }\n    return dp[W];\n}\n\nint main() {\n    vector<int> val = {60, 100, 120};\n    vector<int> wt = {10, 20, 30};\n    int W = 50;\n    cout << \"Max Knapsack Value: \" << knapsack(W, wt, val, val.size()) << endl;\n    return 0;\n}\n"
    },
    "notes": "### Knapsack 1D Array Trick:\nLoop weights **backward** from `W` down to `wt[i]` to prevent reusing the same item multiple times in 0/1 Knapsack!"
  },
  {
    "id": "ca-119-b",
    "lectureNumber": 74,
    "moduleId": "mod-17",
    "moduleName": "Dynamic Programming (DP) Mastery",
    "title": "L74: Longest Common Subsequence (LCS) & String DP Patterns",
    "duration": "57:40",
    "videoId": "_kio3U6CV2c",
    "topics": [
      "2D DP on Strings",
      "Recurrence: match vs mismatch",
      "Printing the LCS String",
      "Edit Distance (Levenshtein Distance)"
    ],
    "difficulty": "Advanced",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint lcs(string& s1, string& s2) {\n    int m = s1.size(), n = s2.size();\n    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\n\n    for (int i = 1; i <= m; i++) {\n        for (int j = 1; j <= n; j++) {\n            if (s1[i - 1] == s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];\n            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);\n        }\n    }\n    return dp[m][n];\n}\n\nint main() {\n    string s1 = \"abcde\", s2 = \"ace\";\n    cout << \"LCS of 'abcde' and 'ace': \" << lcs(s1, s2) << endl;\n    return 0;\n}\n"
    },
    "notes": "### LCS Recurrence:\n$$\text{dp}[i][j] = \begin{cases} 1 + \text{dp}[i-1][j-1] & \text{if } s_1[i-1] == s_2[j-1] \\ max(\text{dp}[i-1][j], \text{dp}[i][j-1]) & \text{otherwise} end{cases}$$"
  },
  {
    "id": "ca-119-c",
    "lectureNumber": 75,
    "moduleId": "mod-17",
    "moduleName": "Dynamic Programming (DP) Mastery",
    "title": "L75: Longest Increasing Subsequence (LIS) in O(N log N) via Binary Search",
    "duration": "51:15",
    "videoId": "9sr3aWtqpGA",
    "topics": [
      "O(N^2) Tabulation Formulation",
      "Patience Sorting Concept",
      "Binary Search with std::lower_bound",
      "Printing LIS with Hash Parent Arrays"
    ],
    "difficulty": "Advanced",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint lengthOfLIS(vector<int>& nums) {\n    vector<int> tails;\n    for (int x : nums) {\n        auto it = lower_bound(tails.begin(), tails.end(), x);\n        if (it == tails.end()) tails.push_back(x);\n        else *it = x;\n    }\n    return tails.size();\n}\n\nint main() {\n    vector<int> nums = {10, 9, 2, 5, 3, 7, 101, 18};\n    cout << \"Length of LIS: \" << lengthOfLIS(nums) << endl;\n    return 0;\n}\n"
    },
    "notes": "### O(N log N) LIS Magic:\nMaintain an array `tails` where `tails[i]` is the smallest tail of all increasing subsequences of length $i+1$. Each incoming element replaces the first element $ge x$ via binary search!"
  },
  {
    "id": "ca-119-d",
    "lectureNumber": 76,
    "moduleId": "mod-17",
    "moduleName": "Dynamic Programming (DP) Mastery",
    "title": "L76: DP on Stocks: Buy and Sell with Cooldown & Transaction Fee",
    "duration": "48:30",
    "videoId": "nGJmxk6QWK4",
    "topics": [
      "State Machine DP",
      "Stock Buy and Sell with Cooldown",
      "Transaction Fee Recurrence",
      "Space Optimization to 4 Variables"
    ],
    "difficulty": "Advanced",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// LeetCode #309: Best Time to Buy and Sell Stock with Cooldown\nclass Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        int n = prices.size();\n        if (n <= 1) return 0;\n        \n        // buy: max profit ending with a stock bought\n        // sell: max profit ending with stock sold\n        // rest: max profit in cooldown/rest state\n        int buy = -prices[0], sell = 0, rest = 0;\n        for (int i = 1; i < n; i++) {\n            int prevBuy = buy;\n            buy = max(buy, rest - prices[i]);\n            rest = max(rest, sell);\n            sell = prevBuy + prices[i];\n        }\n        return max(sell, rest);\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> prices = {1, 2, 3, 0, 2};\n    cout << \"Max Profit with Cooldown: \" << sol.maxProfit(prices) << \" (Expected: 3)\" << endl;\n    return 0;\n}\n",
      "python": "# Best Time to Buy and Sell Stock with Cooldown\nclass Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        if not prices or len(prices) <= 1:\n            return 0\n        buy = -prices[0]\n        sell = 0\n        rest = 0\n        for price in prices[1:]:\n            prev_buy = buy\n            buy = max(buy, rest - price)\n            rest = max(rest, sell)\n            sell = prev_buy + price\n        return max(sell, rest)\n\nsol = Solution()\nprint(\"Max Profit with Cooldown:\", sol.maxProfit([1, 2, 3, 0, 2]))\n"
    },
    "debugSteps": [
      {
        "line": 8,
        "code": "int buy = -prices[0], sell = 0, rest = 0;",
        "variables": {
          "buy": -1,
          "sell": 0,
          "rest": 0
        },
        "callStack": [
          "maxProfit()"
        ],
        "explanation": "Initialize state machine base cases at day 0."
      },
      {
        "line": 11,
        "code": "buy = max(buy, rest - prices[i]);",
        "variables": {
          "day": 1,
          "price": 2,
          "buy": -1
        },
        "callStack": [
          "maxProfit()"
        ],
        "explanation": "Transitioning buy state: either hold or buy after rest."
      },
      {
        "line": 13,
        "code": "sell = prevBuy + prices[i];",
        "variables": {
          "day": 1,
          "price": 2,
          "sell": 1
        },
        "callStack": [
          "maxProfit()"
        ],
        "explanation": "Transitioning sell state: sold share bought at day 0 for profit of 1."
      },
      {
        "line": 15,
        "code": "return max(sell, rest);",
        "variables": {
          "result": 3
        },
        "callStack": [
          "maxProfit()"
        ],
        "explanation": "Optimal profit at the final day considering cooldown."
      }
    ],
    "notes": "### DP on Stocks: State Machine Architecture\n- **State Machine Nodes:**\n  - **Buy State:** You hold a stock. Transition: `buy[i] = max(buy[i-1], rest[i-1] - prices[i])`\n  - **Sell State:** You just sold today. Transition: `sell[i] = buy[i-1] + prices[i]`\n  - **Rest State:** Cooldown or holding cash. Transition: `rest[i] = max(rest[i-1], sell[i-1])`\n- **Time Complexity:** O(N) single pass.\n- **Space Complexity:** O(1) space with 3 primitive variables."
  },
  {
    "id": "ca-119-e",
    "lectureNumber": 77,
    "moduleId": "mod-17",
    "moduleName": "Dynamic Programming (DP) Mastery",
    "title": "L77: Coin Change & Unbounded Knapsack: Minimum Coins to Make Change",
    "duration": "52:10",
    "videoId": "ogwBE8NITcg",
    "topics": [
      "Unbounded Knapsack Pattern",
      "Coin Change I (Minimum Coins)",
      "State Transition Formula",
      "Infinite Supply Subsequence"
    ],
    "difficulty": "Advanced",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// LeetCode #322: Coin Change (Minimum Coins to form Amount)\nclass Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        vector<int> dp(amount + 1, 1e9);\n        dp[0] = 0;\n        \n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (i - coin >= 0 && dp[i - coin] != 1e9) {\n                    dp[i] = min(dp[i], 1 + dp[i - coin]);\n                }\n            }\n        }\n        return dp[amount] >= 1e9 ? -1 : dp[amount];\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> coins = {1, 2, 5};\n    int amount = 11;\n    cout << \"Minimum coins for \" << amount << \": \" << sol.coinChange(coins, amount) << \" (Expected: 3)\" << endl;\n    return 0;\n}\n",
      "python": "# Coin Change I: Minimum Coins\nclass Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        dp = [float('inf')] * (amount + 1)\n        dp[0] = 0\n        for i in range(1, amount + 1):\n            for coin in coins:\n                if i - coin >= 0:\n                    dp[i] = min(dp[i], 1 + dp[i - coin])\n        return dp[amount] if dp[amount] != float('inf') else -1\n\nsol = Solution()\nprint(\"Minimum coins:\", sol.coinChange([1, 2, 5], 11))\n"
    },
    "debugSteps": [
      {
        "line": 9,
        "code": "vector<int> dp(amount + 1, 1e9); dp[0] = 0;",
        "variables": {
          "amount": 11,
          "dp_0": 0
        },
        "callStack": [
          "coinChange()"
        ],
        "explanation": "Base case: 0 coins needed to make amount 0."
      },
      {
        "line": 14,
        "code": "dp[i] = min(dp[i], 1 + dp[i - coin]);",
        "variables": {
          "i": 5,
          "coin": 5,
          "dp_5": 1
        },
        "callStack": [
          "coinChange()"
        ],
        "explanation": "Optimal transition using single coin 5."
      },
      {
        "line": 17,
        "code": "return dp[amount] >= 1e9 ? -1 : dp[amount];",
        "variables": {
          "result": 3
        },
        "callStack": [
          "coinChange()"
        ],
        "explanation": "Result: 3 coins (5 + 5 + 1 = 11)."
      }
    ],
    "notes": "### Unbounded Knapsack & Coin Change\n- **Recurrence:**\n  `dp[a] = min(dp[a], 1 + dp[a - coin])` for every coin `<= a`.\n- **Infinite Supply:** We iterate target amount forward from 1 to `amount`, allowing multiple uses of the same coin denomination.\n- **Time Complexity:** O(N * amount)\n- **Space Complexity:** O(amount) 1D array optimization."
  },
  {
    "id": "ca-119-f",
    "lectureNumber": 78,
    "moduleId": "mod-17",
    "moduleName": "Dynamic Programming (DP) Mastery",
    "title": "L78: Matrix Chain Multiplication (MCM): Partition DP Masterclass",
    "duration": "55:40",
    "videoId": "vRVfmbCFW7Y",
    "topics": [
      "Partition DP Pattern",
      "Matrix Chain Multiplication Cost",
      "Optimal Parenthesization",
      "Burst Balloons Analogy"
    ],
    "difficulty": "Advanced",
    "starterCodes": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\n// Matrix Chain Multiplication: Minimum scalar multiplications\nclass Solution {\npublic:\n    int matrixMultiplication(vector<int>& arr) {\n        int n = arr.size();\n        vector<vector<int>> dp(n, vector<int>(n, 0));\n        \n        // len is chain length\n        for (int len = 2; len < n; len++) {\n            for (int i = 1; i < n - len + 1; i++) {\n                int j = i + len - 1;\n                dp[i][j] = 1e9;\n                for (int k = i; k < j; k++) {\n                    int cost = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];\n                    dp[i][j] = min(dp[i][j], cost);\n                }\n            }\n        }\n        return dp[1][n - 1];\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> arr = {10, 20, 30, 40, 30};\n    cout << \"Min Multiplications for MCM: \" << sol.matrixMultiplication(arr) << \" (Expected: 30000)\" << endl;\n    return 0;\n}\n",
      "python": "# Matrix Chain Multiplication: Partition DP\nclass Solution:\n    def matrixMultiplication(self, arr: list[int]) -> int:\n        n = len(arr)\n        dp = [[0] * n for _ in range(n)]\n        \n        for length in range(2, n):\n            for i in range(1, n - length + 1):\n                j = i + length - 1\n                dp[i][j] = float('inf')\n                for k in range(i, j):\n                    cost = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j]\n                    dp[i][j] = min(dp[i][j], cost)\n        return dp[1][n - 1]\n\nsol = Solution()\nprint(\"Min Multiplications:\", sol.matrixMultiplication([10, 20, 30, 40, 30]))\n"
    },
    "debugSteps": [
      {
        "line": 9,
        "code": "vector<vector<int>> dp(n, vector<int>(n, 0));",
        "variables": {
          "n": 5
        },
        "callStack": [
          "matrixMultiplication()"
        ],
        "explanation": "Initialize DP table where dp[i][j] is minimum multiplications for Ai...Aj."
      },
      {
        "line": 17,
        "code": "int cost = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];",
        "variables": {
          "i": 1,
          "j": 2,
          "k": 1,
          "cost": 6000
        },
        "callStack": [
          "matrixMultiplication()"
        ],
        "explanation": "Evaluating partition at split point k."
      },
      {
        "line": 22,
        "code": "return dp[1][n - 1];",
        "variables": {
          "result": 30000
        },
        "callStack": [
          "matrixMultiplication()"
        ],
        "explanation": "Optimal multiplication cost for complete chain of matrices."
      }
    ],
    "notes": "### Partition DP (Matrix Chain Multiplication)\n- **Concept:** Divide a problem into subproblems by trying every possible partition point `k` between `i` and `j`.\n- **Recurrence:**\n  `dp[i][j] = min_{i <= k < j} { dp[i][k] + dp[k+1][j] + arr[i-1] * arr[k] * arr[j] }`\n- **Time Complexity:** O(N^3)\n- **Space Complexity:** O(N^2)"
  }
];

export function getCoderArmyLectureById(id: string): CoderArmyLecture | undefined {
  return CODER_ARMY_LECTURES.find((l) => l.id === id);
}

export function getCoderArmyLecturesByModule(moduleId: string): CoderArmyLecture[] {
  return CODER_ARMY_LECTURES.filter((l) => l.moduleId === moduleId);
}
