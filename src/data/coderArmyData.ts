// Complete Coder Army DSA Masterclass Curriculum Dataset
// Comprehensive 90+ Lectures across 16 Modules based on Rohit Negi's Coder Army Series

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
    lecturesCount: 7,
    totalDuration: '5 hrs 20 mins',
  },
  {
    id: 'mod-2',
    title: 'Module 2: Number Systems & Bitwise Operators',
    description: 'Decimal-Binary Conversion, Functions, Scope & Bit Manipulation Tricks',
    icon: '🔢',
    lecturesCount: 4,
    totalDuration: '3 hrs 45 mins',
  },
  {
    id: 'mod-3',
    title: 'Module 3: Arrays & Binary Search Masterclass',
    description: '1D Arrays, Linear Search, Binary Search, Peak Element, Book Allocation & Painter Partition',
    icon: '🎯',
    lecturesCount: 9,
    totalDuration: '8 hrs 10 mins',
  },
  {
    id: 'mod-4',
    title: 'Module 4: Sorting Algorithms with Tracing',
    description: 'Selection, Bubble, Insertion, Merge Sort & Quick Sort Partitioning',
    icon: '📊',
    lecturesCount: 5,
    totalDuration: '4 hrs 30 mins',
  },
  {
    id: 'mod-5',
    title: 'Module 5: 2D Arrays & Matrix Algorithms',
    description: 'Row-Major, Wave Print, Spiral Matrix, Transpose & Matrix Search',
    icon: '📐',
    lecturesCount: 4,
    totalDuration: '3 hrs 15 mins',
  },
  {
    id: 'mod-6',
    title: 'Module 6: Strings & Two Pointers',
    description: 'Char Arrays, Palindromes, Sliding Window & String Matching',
    icon: '🔤',
    lecturesCount: 4,
    totalDuration: '3 hrs 50 mins',
  },
  {
    id: 'mod-7',
    title: 'Module 7: Pointers & Dynamic Memory',
    description: 'Pointer Arithmetic, Double Pointers, Stack vs Heap & Memory Allocation',
    icon: '📍',
    lecturesCount: 3,
    totalDuration: '2 hrs 40 mins',
  },
  {
    id: 'mod-8',
    title: 'Module 8: Recursion & Backtracking Deep Dive',
    description: 'Recursion Trees, Subsets, Permutations, N-Queens, Sudoku & Rat in a Maze',
    icon: '🔄',
    lecturesCount: 9,
    totalDuration: '9 hrs 15 mins',
  },
  {
    id: 'mod-9',
    title: 'Module 9: Object-Oriented Programming (OOPs)',
    description: 'Classes, Objects, Constructors, Destructors, Inheritance & Polymorphism',
    icon: '🏛️',
    lecturesCount: 3,
    totalDuration: '2 hrs 50 mins',
  },
  {
    id: 'mod-10',
    title: 'Module 10: Linked Lists & LRU Cache',
    description: 'Singly, Doubly, Circular, Floyd Cycle Detection & LRU Cache Implementation',
    icon: '🔗',
    lecturesCount: 7,
    totalDuration: '6 hrs 30 mins',
  },
  {
    id: 'mod-11',
    title: 'Module 11: Stacks & Queues',
    description: 'Monotonic Stacks, Next Greater Element, Histogram & Circular Deques',
    icon: '📚',
    lecturesCount: 7,
    totalDuration: '6 hrs 10 mins',
  },
  {
    id: 'mod-12',
    title: 'Module 12: Binary Trees & BST',
    description: 'Tree Traversals, Views, LCA, Diameter, BST Construction & Validation',
    icon: '🌲',
    lecturesCount: 7,
    totalDuration: '7 hrs 25 mins',
  },
  {
    id: 'mod-13',
    title: 'Module 13: Heaps & Priority Queues',
    description: 'Heapify, Heap Sort, Kth Largest & Median in Data Stream',
    icon: '⛰️',
    lecturesCount: 4,
    totalDuration: '3 hrs 40 mins',
  },
  {
    id: 'mod-14',
    title: 'Module 14: Graph Algorithms & DSU',
    description: 'BFS, DFS, Cycle Detection, Topological Sort, Dijkstra, Bellman-Ford & Kruskal',
    icon: '🌐',
    lecturesCount: 9,
    totalDuration: '9 hrs 30 mins',
  },
  {
    id: 'mod-15',
    title: 'Module 15: Dynamic Programming (DP)',
    description: '1D DP, 2D Grid DP, 0/1 Knapsack, LCS, LIS & Matrix Chain Multiplication',
    icon: '🧩',
    lecturesCount: 6,
    totalDuration: '7 hrs 45 mins',
  },
  {
    id: 'mod-16',
    title: 'Module 16: Tries & Segment Trees',
    description: 'Prefix Trees, Autocomplete, Range Minimum Query & Segment Trees',
    icon: '🌲',
    lecturesCount: 2,
    totalDuration: '2 hrs 10 mins',
  },
];

export const CODER_ARMY_LECTURES: CoderArmyLecture[] = [
  // Module 1
  {
    id: 'ca-1',
    lectureNumber: 1,
    moduleId: 'mod-1',
    moduleName: 'C++ Basics & Flow of Program',
    title: 'L1: Introduction to Programming, Flowcharts & Pseudocode',
    duration: '42:15',
    videoId: '1vLqCekZKA4',
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
    title: 'L2: Variables, Data Types & Type Casting in C++',
    duration: '48:30',
    videoId: 'y3k0_e3hO_o',
    topics: ['Data Types', 'Size of Types', 'Type Casting', 'ASCII Table'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

int main() {
    int age = 22;
    char grade = 'A';
    float cgpa = 9.45f;
    bool isEnrolled = true;

    cout << "Size of int: " << sizeof(age) << " bytes" << endl;
    cout << "Size of char: " << sizeof(grade) << " byte" << endl;
    cout << "ASCII of 'A': " << (int)grade << endl;
    return 0;
}
`,
      python: `age = 22
grade = 'A'
cgpa = 9.45
print(f"ASCII of '{grade}': {ord(grade)}")
`,
    },
    debugSteps: [
      { line: 5, code: 'int age = 22;', variables: { age: 22 }, callStack: ['main()'], explanation: '4 bytes allocated on stack for age.' },
      { line: 6, code: "char grade = 'A';", variables: { age: 22, grade: 'A', ascii: 65 }, callStack: ['main()'], explanation: "1 byte allocated for character 'A'." },
      { line: 7, code: 'float cgpa = 9.45f;', variables: { age: 22, grade: 'A', cgpa: 9.45 }, callStack: ['main()'], explanation: 'Single-precision floating point number stored in memory.' },
    ],
    notes: `### Lecture 2: Data Types & Memory Bounds
| Data Type | Size | Range |
| :--- | :--- | :--- |
| \`int\` | 4 bytes | \`-2^31\` to \`2^31 - 1\` |
| \`char\` | 1 byte | \`-128\` to \`127\` (ASCII) |
| \`float\` | 4 bytes | 7 decimal digits precision |
| \`double\` | 8 bytes | 15 decimal digits precision |
| \`bool\` | 1 byte | \`true\` (1) or \`false\` (0) |`,
  },
  {
    id: 'ca-5',
    lectureNumber: 5,
    moduleId: 'mod-1',
    moduleName: 'C++ Basics & Flow of Program',
    title: 'L5: Pattern Printing Masterclass (Square, Triangle, Pyramid)',
    duration: '55:10',
    videoId: 'Yp9d1e4eHnI',
    topics: ['Nested Loops', 'Pattern Logic', 'Matrix Mapping', 'Index Geometry'],
    difficulty: 'Beginner',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n = 5;
    cout << "Right Half Pyramid:" << endl;
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
print("Right Half Pyramid:")
for i in range(1, n + 1):
    print("* " * i)
`,
    },
    debugSteps: [
      { line: 5, code: 'int n = 5;', variables: { n: 5, i: 1 }, callStack: ['main()'], explanation: 'Pattern dimension n initialized to 5 rows.' },
      { line: 7, code: 'for (int i = 1; i <= n; i++)', variables: { i: 1, j: 1 }, callStack: ['main()'], explanation: 'Starting outer loop row 1.' },
      { line: 9, code: 'cout << "* ";', variables: { i: 1, j: 1, printed: '*' }, callStack: ['main()'], explanation: 'Printing column 1 star.' },
      { line: 12, code: 'cout << endl;', variables: { i: 2, j: 1 }, callStack: ['main()'], explanation: 'Newline flushed, advancing to row 2.' },
    ],
    notes: `### Pattern Printing Rules of Thumb:
1. **Outer Loop:** Controls total number of rows (\`i = 1 to n\`).
2. **Inner Loop:** Controls items printed per row (\`j = 1 to i\` or \`j = 1 to n - i + 1\`).
3. **Space Calculation:** In symmetric pyramids, print \`n - i\` spaces followed by \`2*i - 1\` stars.`,
  },

  // Module 3: Binary Search Masterclass
  {
    id: 'ca-15',
    lectureNumber: 15,
    moduleId: 'mod-3',
    moduleName: 'Arrays & Binary Search Masterclass',
    title: 'L15: Master Binary Search Algorithm & Search Space Reduction',
    duration: '52:40',
    videoId: 'xSgm_w3m6wU',
    topics: ['Binary Search', 'Search Space', 'O(log N)', 'Monotonic Functions'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int low = 0;
    int high = arr.size() - 1;

    while (low <= high) {
        // Prevent integer overflow
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1; // Discard left half
        } else {
            high = mid - 1; // Discard right half
        }
    }
    return -1; // Not found
}

int main() {
    vector<int> nums = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int target = 23;
    int index = binarySearch(nums, target);

    cout << "Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]" << endl;
    cout << "Target: " << target << " found at index: " << index << endl;
    return 0;
}
`,
      python: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

nums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
target = 23
print(f"Target {target} found at index: {binary_search(nums, target)}")
`,
      java: `class Main {
    public static int binarySearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            else if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] nums = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        System.out.println("Found at: " + binarySearch(nums, 23));
    }
}
`,
    },
    debugSteps: [
      { line: 6, code: 'int low = 0, high = arr.size() - 1;', variables: { low: 0, high: 9, target: 23 }, callStack: ['binarySearch()'], explanation: 'Setting boundary pointers: low=0, high=9.' },
      { line: 10, code: 'int mid = low + (high - low) / 2;', variables: { low: 0, high: 9, mid: 4, 'arr[mid]': 16 }, callStack: ['binarySearch()'], explanation: 'Calculated mid index 4, element is 16.' },
      { line: 15, code: 'low = mid + 1;', variables: { low: 5, high: 9, 'arr[mid]': 16 }, callStack: ['binarySearch()'], explanation: '16 < 23: Target must be in right half. Adjusting low = 5.' },
      { line: 10, code: 'mid = low + (high - low) / 2;', variables: { low: 5, high: 9, mid: 7, 'arr[mid]': 56 }, callStack: ['binarySearch()'], explanation: 'Recalculating mid index 7, element is 56.' },
      { line: 17, code: 'high = mid - 1;', variables: { low: 5, high: 6, 'arr[mid]': 56 }, callStack: ['binarySearch()'], explanation: '56 > 23: Target must be in left half. Adjusting high = 6.' },
      { line: 10, code: 'mid = low + (high - low) / 2;', variables: { low: 5, high: 6, mid: 5, 'arr[mid]': 23 }, callStack: ['binarySearch()'], explanation: 'Mid index 5, element is 23.' },
      { line: 13, code: 'return mid;', variables: { result: 5, matched: true }, callStack: ['binarySearch()'], explanation: 'Exact match found! Returning index 5.' },
    ],
    notes: `### Binary Search Invariant & Proof:
- **Precondition:** Array must be monotonically sorted.
- **Search Space Reduction:** Halves candidate space at every iteration: \`N -> N/2 -> N/4 -> ... -> 1\`.
- **Complexity:**
  - Time Complexity: \`O(log N)\`
  - Space Complexity: \`O(1)\`
- **Integer Overflow Protection:**
  \`int mid = low + (high - low) / 2\` rather than \`(low + high) / 2\`.`,
  },
  {
    id: 'ca-18',
    lectureNumber: 18,
    moduleId: 'mod-3',
    moduleName: 'Arrays & Binary Search Masterclass',
    title: 'L18: Hard Binary Search: Book Allocation Problem (Google & Amazon)',
    duration: '58:20',
    videoId: 'thUd_aJmYJA',
    topics: ['Binary Search on Answer', 'Search Space Predicate', 'Book Allocation', 'Greedy Feasibility'],
    difficulty: 'Advanced',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

// Check if mid maxPages is feasible for m students
bool isPossible(const vector<int>& books, int m, int maxPages) {
    int studentsCount = 1;
    int currentPages = 0;

    for (int pages : books) {
        if (currentPages + pages <= maxPages) {
            currentPages += pages;
        } else {
            studentsCount++;
            if (studentsCount > m || pages > maxPages) {
                return false;
            }
            currentPages = pages;
        }
    }
    return true;
}

int findPages(const vector<int>& books, int m) {
    if (m > books.size()) return -1;

    int low = *max_element(books.begin(), books.end());
    int high = accumulate(books.begin(), books.end(), 0);
    int ans = -1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (isPossible(books, m, mid)) {
            ans = mid;
            high = mid - 1; // Try to minimize the maximum
        } else {
            low = mid + 1; // Feasibility failed, increase threshold
        }
    }
    return ans;
}

int main() {
    vector<int> books = {12, 34, 67, 90};
    int students = 2;
    int result = findPages(books, students);
    cout << "Minimum of maximum pages allocated to 2 students: " << result << endl;
    return 0;
}
`,
      python: `def is_possible(books, m, max_pages):
    students = 1
    current_pages = 0
    for pages in books:
        if current_pages + pages <= max_pages:
            current_pages += pages
        else:
            students += 1
            if students > m or pages > max_pages:
                return False
            current_pages = pages
    return True

def find_pages(books, m):
    if m > len(books): return -1
    low = max(books)
    high = sum(books)
    ans = -1
    while low <= high:
        mid = (low + high) // 2
        if is_possible(books, m, mid):
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans

books = [12, 34, 67, 90]
print("Min max pages:", find_pages(books, 2))
`,
    },
    debugSteps: [
      { line: 26, code: 'int low = max(books), high = sum(books);', variables: { low: 90, high: 203, students: 2 }, callStack: ['findPages()'], explanation: 'Search range established: minimum possible is single biggest book (90), maximum is sum of all books (203).' },
      { line: 30, code: 'int mid = low + (high - low) / 2;', variables: { low: 90, high: 203, mid: 146 }, callStack: ['findPages()'], explanation: 'Testing midpoint threshold maxPages = 146.' },
      { line: 32, code: 'isPossible(books, m, 146)', variables: { mid: 146, feasible: true, ans: 146 }, callStack: ['isPossible()'], explanation: 'Feasible for 2 students! Book 1+2+3 (113 pages), Book 4 (90 pages). Storing 146 as candidate.' },
      { line: 34, code: 'high = mid - 1;', variables: { low: 90, high: 145, ans: 146 }, callStack: ['findPages()'], explanation: 'Greedy search for an even tighter bound: high = 145.' },
      { line: 38, code: 'return ans;', variables: { ans: 113, optimal: true }, callStack: ['findPages()'], explanation: 'Converged to global minimum of maximum pages: 113.' },
    ],
    notes: `### Binary Search on Answer Pattern:
Whenever asked to **Minimize the Maximum** or **Maximize the Minimum**:
1. Identify the range \`[low, high]\` for the answer.
2. Implement predicate function \`isPossible(mid)\` in \`O(N)\`.
3. Binary search on the answer: \`O(N * log(sum - max))\`.`,
  },

  // Module 4: Sorting
  {
    id: 'ca-24',
    lectureNumber: 24,
    moduleId: 'mod-4',
    moduleName: 'Sorting Algorithms with Tracing',
    title: 'L24: Merge Sort Algorithm (Divide & Conquer Proof & Dry Run)',
    duration: '50:15',
    videoId: 'ogjf7ORKfd8',
    topics: ['Divide and Conquer', 'Merge Step', 'O(N log N)', 'Stable Sorting'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int low, int mid, int high) {
    vector<int> temp;
    int left = low;
    int right = mid + 1;

    while (left <= mid && right <= high) {
        if (arr[left] <= arr[right]) {
            temp.push_back(arr[left++]);
        } else {
            temp.push_back(arr[right++]);
        }
    }

    while (left <= mid) temp.push_back(arr[left++]);
    while (right <= high) temp.push_back(arr[right++]);

    for (int i = low; i <= high; i++) {
        arr[i] = temp[i - low];
    }
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
    cout << "Original: ";
    for (int x : data) cout << x << " ";
    cout << endl;

    mergeSort(data, 0, data.size() - 1);

    cout << "Sorted:   ";
    for (int x : data) cout << x << " ";
    cout << endl;
    return 0;
}
`,
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged

nums = [38, 27, 43, 3, 9, 82, 10]
print("Sorted:", merge_sort(nums))
`,
    },
    debugSteps: [
      { line: 26, code: 'mergeSort(arr, 0, 6)', variables: { low: 0, high: 6, mid: 3 }, callStack: ['main()', 'mergeSort(0, 6)'], explanation: 'Dividing array into left [0..3] and right [4..6].' },
      { line: 27, code: 'mergeSort(arr, 0, 3)', variables: { low: 0, high: 3, mid: 1 }, callStack: ['main()', 'mergeSort(0, 6)', 'mergeSort(0, 3)'], explanation: 'Recursive divide: left half [38, 27, 43, 3].' },
      { line: 6, code: 'merge(arr, 0, 1, 3)', variables: { temp: [27, 38], left: 0, right: 1 }, callStack: ['merge(0, 1, 3)'], explanation: 'Merge step comparing 38 and 27 -> outputs sorted [27, 38].' },
    ],
    notes: `### Merge Sort Complexity:
- **Recurrence Relation:** \`T(N) = 2*T(N/2) + O(N)\`
- **Time Complexity:** \`O(N log N)\` across Best, Average & Worst Case!
- **Space Complexity:** \`O(N)\` auxiliary memory for merge buffer.
- **Stability:** Stable sort (preserves relative order of equal keys).`,
  },

  // Module 8: Recursion & Backtracking
  {
    id: 'ca-37',
    lectureNumber: 37,
    moduleId: 'mod-8',
    moduleName: 'Recursion & Backtracking Deep Dive',
    title: 'L37: Recursion Basics, Stack Frames & Base Cases',
    duration: '46:30',
    videoId: '5boGk89e47c',
    topics: ['Call Stack', 'Base Case', 'Stack Overflow', 'Mathematical Induction'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

// Calculate factorial recursively
int factorial(int n) {
    // Base Case
    if (n <= 1) return 1;

    // Recursive Relation: n! = n * (n - 1)!
    return n * factorial(n - 1);
}

int main() {
    int n = 5;
    cout << "Factorial of " << n << " = " << factorial(n) << endl;
    return 0;
}
`,
      python: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print("Factorial of 5 =", factorial(5))
`,
    },
    debugSteps: [
      { line: 6, code: 'factorial(5)', variables: { n: 5 }, callStack: ['main()', 'factorial(5)'], explanation: 'Call stack frame 1: n = 5. Checking base case.' },
      { line: 9, code: '5 * factorial(4)', variables: { n: 5, waitingOn: 'factorial(4)' }, callStack: ['main()', 'factorial(5)', 'factorial(4)'], explanation: 'Call stack frame 2: n = 4 pushed onto stack.' },
      { line: 9, code: '4 * factorial(3)', variables: { n: 4, waitingOn: 'factorial(3)' }, callStack: ['main()', 'factorial(5)', 'factorial(4)', 'factorial(3)'], explanation: 'Call stack frame 3: n = 3.' },
      { line: 6, code: 'if (n <= 1) return 1;', variables: { n: 1, baseHit: true }, callStack: ['...all frames...', 'factorial(1)'], explanation: 'Base case reached! Returning 1 and unwinding stack.' },
      { line: 9, code: 'Unwinding: 5 * 24 = 120', variables: { result: 120 }, callStack: ['main()'], explanation: 'Final return value 120 calculated.' },
    ],
    notes: `### Three Pillars of Recursion:
1. **Base Case:** Stopping condition that halts recursion.
2. **Recursive Hypothesis:** Assume subproblem \`f(n-1)\` returns correct result.
3. **Self Work:** Combine subproblem result to solve current problem \`f(n)\`.`,
  },

  // Module 10: Linked List
  {
    id: 'ca-49',
    lectureNumber: 49,
    moduleId: 'mod-10',
    moduleName: 'Linked Lists & LRU Cache',
    title: 'L49: Singly Linked List: Node Construction, Pointer Traversal & Reversal',
    duration: '54:20',
    videoId: 'cr_1L_n89eI',
    topics: ['Linked List', 'Pointers', 'Reverse List', 'Tortoise and Hare'],
    difficulty: 'Intermediate',
    starterCodes: {
      cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

Node* reverseList(Node* head) {
    Node* prev = nullptr;
    Node* curr = head;

    while (curr != nullptr) {
        Node* nextNode = curr->next; // Store next
        curr->next = prev;           // Reverse pointer
        prev = curr;                 // Advance prev
        curr = nextNode;             // Advance curr
    }
    return prev;
}

void printList(Node* head) {
    while (head) {
        cout << head->data << (head->next ? " -> " : "");
        head = head->next;
    }
    cout << endl;
}

int main() {
    Node* head = new Node(10);
    head->next = new Node(20);
    head->next->next = new Node(30);
    head->next->next->next = new Node(40);

    cout << "Original List: ";
    printList(head);

    head = reverseList(head);

    cout << "Reversed List: ";
    printList(head);
    return 0;
}
`,
      python: `class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev
`,
    },
    debugSteps: [
      { line: 11, code: 'Node* prev = nullptr, curr = head;', variables: { prev: 'null', curr: 'Node(10)' }, callStack: ['reverseList()'], explanation: 'Pointers initialized. prev points to null, curr to head (10).' },
      { line: 15, code: 'Node* nextNode = curr->next;', variables: { prev: 'null', curr: '10', nextNode: '20' }, callStack: ['reverseList()'], explanation: 'Saved next pointer to prevent memory orphan.' },
      { line: 16, code: 'curr->next = prev;', variables: { '10->next': 'null' }, callStack: ['reverseList()'], explanation: 'Reversed: 10 now points back to null.' },
      { line: 17, code: 'prev = curr; curr = nextNode;', variables: { prev: '10', curr: '20' }, callStack: ['reverseList()'], explanation: 'Slid window forward: prev is 10, curr is 20.' },
    ],
    notes: `### Linked List In-Place Reversal:
- **Pointers needed:** 3 pointers (\`prev\`, \`curr\`, \`nextNode\`).
- **Time Complexity:** \`O(N)\` one pass.
- **Space Complexity:** \`O(1)\` constant auxiliary space.`,
  },

  // Module 14: Graphs
  {
    id: 'ca-74',
    lectureNumber: 74,
    moduleId: 'mod-14',
    moduleName: 'Graph Algorithms & DSU',
    title: 'L74: Graph Representation, Adjacency List & BFS / DFS Traversals',
    duration: '57:40',
    videoId: 'Ue0t7f2L9z0',
    topics: ['Adjacency List', 'BFS', 'DFS', 'Connected Components'],
    difficulty: 'Advanced',
    starterCodes: {
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Breadth First Search (BFS)
vector<int> bfsOfGraph(int V, const vector<vector<int>>& adj) {
    vector<int> bfs;
    vector<bool> visited(V, false);
    queue<int> q;

    visited[0] = true;
    q.push(0);

    while (!q.empty()) {
        int node = q.front();
        q.pop();
        bfs.push_back(node);

        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
    return bfs;
}

int main() {
    int V = 5;
    vector<vector<int>> adj(V);
    // Graph: 0-1, 0-2, 1-3, 2-4
    adj[0] = {1, 2};
    adj[1] = {0, 3};
    adj[2] = {0, 4};
    adj[3] = {1};
    adj[4] = {2};

    vector<int> res = bfsOfGraph(V, adj);
    cout << "BFS Traversal: ";
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}
`,
      python: `from collections import deque

def bfs(V, adj):
    visited = [False] * V
    q = deque([0])
    visited[0] = True
    order = []
    
    while q:
        node = q.popleft()
        order.append(node)
        for nbr in adj[node]:
            if not visited[nbr]:
                visited[nbr] = True
                q.append(nbr)
    return order
`,
    },
    debugSteps: [
      { line: 11, code: 'visited[0] = true; q.push(0);', variables: { q: '[0]', visited: '[true, false, false, false, false]' }, callStack: ['bfsOfGraph()'], explanation: 'Mark source vertex 0 visited and enqueue.' },
      { line: 14, code: 'int node = q.front(); q.pop();', variables: { node: 0, q: '[]', bfs: '[0]' }, callStack: ['bfsOfGraph()'], explanation: 'Popped 0, visiting neighbors 1 and 2.' },
      { line: 20, code: 'q.push(1); q.push(2);', variables: { q: '[1, 2]', visited: '[true, true, true, false, false]' }, callStack: ['bfsOfGraph()'], explanation: 'Neighbors 1 and 2 enqueued into FIFO queue.' },
    ],
    notes: `### Graph Representations:
1. **Adjacency Matrix:** \`O(V^2)\` space. Ideal for dense graphs.
2. **Adjacency List:** \`O(V + 2E)\` space. Ideal for sparse graphs.
- **BFS Traversal:** Uses FIFO Queue, visits nodes level by level. Time: \`O(V + E)\`.`,
  },
];
