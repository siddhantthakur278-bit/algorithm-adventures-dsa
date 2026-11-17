// Comprehensive Sub-Step Theory Masterclass Dataset for Striver's A2Z DSA Sheet
// Official Curriculum: Take U Forward (Raj Vikramaditya)
// Covering every exact sub-topic across all 18 Steps with formulas, recurrence relations,
// algorithmic invariants, C++20 and Python 3.12 verified code implementations.

export interface StriverSubStepTheory {
  subStepId: string;
  stepId: string;
  stepNumber: number;
  title: string;
  overview: string;
  coreIntuition: string;
  recurrenceOrFormula?: string;
  keyTechnique: string;
  timeComplexity: string;
  spaceComplexity: string;
  stepsToSolve: string[];
  cppSnippet: string;
  pythonSnippet: string;
  pitfalls: string[];
  topProblems: string[];
}

export const STRIVERS_SUBSTEP_THEORIES: Record<string, StriverSubStepTheory> = {
  "1.1": {
    "subStepId": "1.1",
    "stepId": "step-1",
    "stepNumber": 1,
    "title": "Things to Know in C++ / Python / Java: Syntax, I/O & Complexity",
    "overview": "Master the foundational syntax across C++, Python, and Java: fast I/O streams, primitive data types (integers, floats, doubles, characters, booleans), control structures (if-else, switch-case), loops (for, while, do-while), passing parameters by value vs. by reference, and formal Time and Space Complexity analysis using Big-O notation.",
    "coreIntuition": "Fast I/O: In C++, standard `cin` and `cout` are synchronized with C stdio. Use `ios_base::sync_with_stdio(false); cin.tie(NULL);` to eliminate synchronization overhead and avoid TLE on 10^6 inputs.",
    "recurrenceOrFormula": "\n       Memory Model & Parameter Passing:\n       • Pass by Value (Copy created):\n         int a = 10;\n         void modify(int x) { x += 5; } // 'a' in caller remains 10!\n\n       • Pass by Reference (Alias directly into memory address):\n         int a = 10;\n         void modify(int& x) { x += 5; } // 'a' in caller becomes 15!\n         * In Python, integers/strings are immutable, while lists/dicts are passed by object reference!\n    ",
    "keyTechnique": "Data Types & Overflow: Standard 32-bit `int` holds values from -2^31 to 2^31 - 1 (~2 * 10^9). If multiplication or sum exceeds this, use 64-bit `long long` in C++ or `long` in Java. Python 3 automatically handles arbitrary-precision integers.",
    "timeComplexity": "O(1) for basic operations, conditional branches, and primitive assignments.",
    "spaceComplexity": "O(1) auxiliary space.",
    "stepsToSolve": [
      "1. Configure Fast I/O: Insert `ios_base::sync_with_stdio(false); cin.tie(NULL);` at start of `main()`. In Python, use `sys.stdin.read` for bulk reading.",
      "2. Variable Bounds Checking: If inputs $N \\le 10^9$ and we multiply numbers, declare as `long long ans = (long long)a * b;` to prevent integer overflow wrap-around.",
      "3. Scope and Lifetime: Declare variables in the tightest possible block scope to assist compiler register allocation and avoid accidental cross-loop contamination."
    ],
    "cppSnippet": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n// Pass by reference demonstration\nvoid modifyReference(int& val, vector<int>& arr) {\n    val += 100;\n    arr.push_back(999);\n}\n\nint main() {\n    // Fast I/O\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int number = 42;\n    vector<int> numbers = {1, 2, 3};\n\n    modifyReference(number, numbers);\n\n    cout << \"Modified Value: \" << number << \"\n\";\n    cout << \"Vector Size: \" << numbers.size() << \"\n\";\n    return 0;\n}\n",
    "pythonSnippet": "import sys\n\ndef modify_references(val_box: list, arr: list):\n    \"\"\"Demonstrates mutable reference passing in Python.\"\"\"\n    val_box[0] += 100\n    arr.append(999)\n\nif __name__ == \"__main__\":\n    number_box = [42] # integers are immutable, box in list for reference\n    numbers = [1, 2, 3]\n\n    modify_references(number_box, numbers)\n    print(\"Modified Value:\", number_box[0])\n    print(\"List Size:\", len(numbers))\n",
    "pitfalls": [
      "Using `endl` instead of `\\n`: `endl` forces a full stream buffer flush on every line, drastically slowing down output to trigger TLE.",
      "32-bit Integer Overflow: Multiplying two 32-bit integers before casting to `long long` (e.g. `long long x = a * b;` overflows before assignment if `a` and `b` are `int`). Write `(1LL * a * b)`.",
      "Passing large vectors by value into recursive functions, turning an O(N) traversal into O(N^2) due to constant vector cloning."
    ],
    "topProblems": [
      "Always quote the Big-O time and space complexity immediately before and after writing any algorithm.",
      "Mention that amortized time complexity accounts for operations that are occasionally expensive but cheap on average (like vector `push_back` dynamic resizing)."
    ]
  },
  "1.2": {
    "subStepId": "1.2",
    "stepId": "step-1",
    "stepNumber": 1,
    "title": "Build-up Logical Thinking: Patterns Masterclass",
    "overview": "Pattern programming builds nested loop intuition and mental geometric coordinate models. Learn the universal formula for decomposing patterns into rows, spaces, stars, and numbers: identify row counts for the outer loop, and derive formulas for leading spaces and inner column elements.",
    "coreIntuition": "Outer Loop (Row Counter): Controls vertical lines from row 0 to total rows - 1.",
    "recurrenceOrFormula": "\n       Decomposing Symmetrical Diamond Pattern (N = 4):\n       Row i:   Leading Spaces (N - i - 1):   Stars (2*i + 1):\n       0:       \"   \" (3 spaces)               \"*\"\n       1:       \"  \"  (2 spaces)               \"***\"\n       2:       \" \"   (1 space)                \"*****\"\n       3:       \"\"    (0 spaces)               \"*******\"\n       Inverse rows then mirror from i = N-2 down to 0.\n    ",
    "keyTechnique": "Inner Loop 1 (Leading Spaces): Spaces align the characters horizontally. Derived as a function of row index `i` (e.g., `N - i - 1`).",
    "timeComplexity": "O(N^2) quadratic time as both dimensions scale with N.",
    "spaceComplexity": "O(1) auxiliary space printing directly to standard output.",
    "stepsToSolve": [
      "1. Pyramid Pattern: Outer loop `for (int i = 0; i < N; i++)`. Inner loop 1: print `N - i - 1` spaces. Inner loop 2: print `2 * i + 1` stars. Print newline.",
      "2. Inverted Pyramid: Outer loop `for (int i = 0; i < N; i++)`. Inner loop 1: print `i` spaces. Inner loop 2: print `2 * (N - i) - 1` stars. Print newline.",
      "3. Number Crown: Print left increasing numbers `1..i`, then middle spaces `2 * (N - i)`, then right decreasing numbers `i..1`."
    ],
    "cppSnippet": "#include <iostream>\nusing namespace std;\n\nvoid printDiamond(int n) {\n    // Upper half\n    for (int i = 0; i < n; i++) {\n        for (int s = 0; s < n - i - 1; s++) cout << \" \";\n        for (int star = 0; star < 2 * i + 1; star++) cout << \"*\";\n        cout << \"\n\";\n    }\n    // Lower half\n    for (int i = n - 2; i >= 0; i--) {\n        for (int s = 0; s < n - i - 1; s++) cout << \" \";\n        for (int star = 0; star < 2 * i + 1; star++) cout << \"*\";\n        cout << \"\n\";\n    }\n}\n\nint main() {\n    printDiamond(4);\n    return 0;\n}\n",
    "pythonSnippet": "def print_diamond(n: int):\n    \"\"\"Prints symmetrical star diamond using algebraic spacing.\"\"\"\n    # Upper half\n    for i in range(n):\n        spaces = \" \" * (n - i - 1)\n        stars = \"*\" * (2 * i + 1)\n        print(spaces + stars)\n    # Lower half\n    for i in range(n - 2, -1, -1):\n        spaces = \" \" * (n - i - 1)\n        stars = \"*\" * (2 * i + 1)\n        print(spaces + stars)\n\nif __name__ == \"__main__\":\n    print_diamond(4)\n",
    "pitfalls": [
      "Off-by-one errors on boundary rows (e.g. duplicating the center row of a diamond).",
      "Forgetting trailing newlines between consecutive rows."
    ],
    "topProblems": [
      "Explain patterns by expressing columns algebraically as linear equations of the row index: `stars = 2 * i + 1` and `spaces = n - i - 1`."
    ]
  },
  "1.3": {
    "subStepId": "1.3",
    "stepId": "step-1",
    "stepNumber": 1,
    "title": "Standard Template Library (STL) & Collections Framework",
    "overview": "The Standard Template Library (STL) in C++ and Collections Framework in Java / Python provide high-performance, battle-tested data structures and algorithms. Master Vectors, Pairs, Stacks, Queues, Priority Queues (Min/Max Heaps), Sets (Ordered, Unordered, Multi), Maps (Ordered, Unordered), Iterators, and Algorithms (`sort`, `lower_bound`, `upper_bound`).",
    "coreIntuition": "Sequential Containers: `vector` (dynamic array doubling capacity upon fill), `deque` (double-ended queue with O(1) push/pop at both ends), `list` (doubly linked list).",
    "recurrenceOrFormula": "\n       STL Container Hierarchy & Time Complexities:\n       ┌──────────────────┬─────────────────┬──────────────────┬────────────────────────┐\n       │ Container        │ Internal Struct │ Access / Search  │ Insertion / Deletion   │\n       ├──────────────────┼─────────────────┼──────────────────┼────────────────────────┤\n       │ vector           │ Dynamic Array   │ O(1) by index    │ O(1) amortized back    │\n       │ set / map        │ Red-Black Tree  │ O(log N)         │ O(log N)               │\n       │ unordered_set/map│ Hash Table      │ O(1) avg, O(N) wc│ O(1) avg, O(N) wc      │\n       │ priority_queue   │ Binary Heap     │ O(1) top         │ O(log N) push / pop    │\n       └──────────────────┴─────────────────┴──────────────────┴────────────────────────┘\n    ",
    "keyTechnique": "Container Adapters: `stack` (LIFO, wraps deque by default), `queue` (FIFO, wraps deque), `priority_queue` (Max-heap by default in C++; Min-heap declared with `greater<T>`). In Python, `heapq` is a Min-heap by default.",
    "timeComplexity": "Vector push_back: O(1) amortized. Set/Map operations: O(log N). Unordered set/map: O(1) average. Sort: O(N log N).",
    "spaceComplexity": "O(N) storing elements in dynamic heap allocations.",
    "stepsToSolve": [
      "1. Custom Comparator in Sorting: To sort pairs `{first, second}` ascending by second, define `bool comp(const pair<int,int>& a, const pair<int,int>& b) { return a.second < b.second; }`. Call `sort(v.begin(), v.end(), comp)`.",
      "2. Min-Heap Priority Queue: Declare `priority_queue<int, vector<int>, greater<int>> minH;`. `minH.push(x)` and `minH.top()` returns the smallest element.",
      "3. Binary Search with Lower Bound: `auto it = lower_bound(arr.begin(), arr.end(), target);` Check if `it != arr.end() && *it == target` to confirm presence."
    ],
    "cppSnippet": "#include <iostream>\n#include <vector>\n#include <queue>\n#include <algorithm>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    // 1. Vector and Sorting\n    vector<int> nums = {40, 10, 30, 20, 50};\n    sort(nums.begin(), nums.end()); // O(N log N)\n\n    // 2. Binary Search (Lower & Upper Bound)\n    auto it = lower_bound(nums.begin(), nums.end(), 30);\n    int index = distance(nums.begin(), it);\n    cout << \"Lower bound of 30 is at index: \" << index << \"\n\";\n\n    // 3. Min-Heap Priority Queue\n    priority_queue<int, vector<int>, greater<int>> minHeap;\n    minHeap.push(15);\n    minHeap.push(5);\n    minHeap.push(25);\n    cout << \"Min-Heap top (smallest): \" << minHeap.top() << \"\n\";\n\n    // 4. Hash Map Frequency Counting\n    unordered_map<string, int> freq;\n    freq[\"apple\"]++;\n    freq[\"banana\"] += 2;\n    cout << \"Apple count: \" << freq[\"apple\"] << \"\n\";\n\n    return 0;\n}\n",
    "pythonSnippet": "import heapq\nimport collections\nimport bisect\n\nif __name__ == \"__main__\":\n    # 1. List and Sorting\n    nums = [40, 10, 30, 20, 50]\n    nums.sort()\n\n    # 2. Binary Search (bisect_left = lower_bound)\n    idx = bisect.bisect_left(nums, 30)\n    print(\"Lower bound index of 30:\", idx)\n\n    # 3. Min-Heap (heapq is min-heap by default)\n    min_heap = []\n    heapq.heappush(min_heap, 15)\n    heapq.heappush(min_heap, 5)\n    heapq.heappush(min_heap, 25)\n    print(\"Min-Heap top:\", min_heap[0])\n\n    # 4. Frequency Counter\n    freq = collections.Counter([\"apple\", \"banana\", \"banana\"])\n    print(\"Banana count:\", freq[\"banana\"])\n",
    "pitfalls": [
      "Calling `lower_bound` on an unsorted vector: It assumes sorted order; unsorted ranges produce undefined behavior.",
      "Using `unordered_map` with custom structs without defining a custom hash function: C++ does not supply default hash functions for `std::pair` or custom classes.",
      "Modifying elements inside a `std::set` in-place: Elements in a set are `const` to preserve tree ordering invariant. Erase and re-insert instead."
    ],
    "topProblems": [
      "In competitive programming, mention that Codeforces testcases can trigger anti-hash collisions in `unordered_map`. Use `map` or a custom random split-mix hash.",
      "Know that `std::sort` uses Introsort (QuickSort falling back to HeapSort if recursion depth exceeds 2 * log N, and InsertionSort for tiny partitions)."
    ]
  },
  "1.4": {
    "subStepId": "1.4",
    "stepId": "step-1",
    "stepNumber": 1,
    "title": "Basic Maths for DSA: Euclidean GCD, Primes & Divisors",
    "overview": "Fundamental number theoretic algorithms: Digits extraction, reversing an integer with 32-bit overflow guards, Palindrome verification, Greatest Common Divisor (GCD) via Euclidean Algorithm in O(log(min(a, b))), Sieve of Eratosthenes prime generation, and finding all divisors in O(sqrt(N)).",
    "coreIntuition": "Digit Extraction: `digit = n % 10; n /= 10;`. Number of digits in N is `floor(log10(N)) + 1`.",
    "recurrenceOrFormula": "\n       1. Euclidean Algorithm for GCD:\n          gcd(a, b) = gcd(b, a % b) until b == 0.\n          gcd(52, 10):\n          52 % 10 = 2 -> gcd(10, 2)\n          10 % 2 = 0  -> gcd(2, 0) => GCD is 2!\n\n       2. All Divisors in O(sqrt(N)):\n          Divisors appear in pairs: if d divides N, then (N / d) also divides N!\n          Iterate d from 1 up to sqrt(N). If d * d != N, record both d and N / d.\n    ",
    "keyTechnique": "Euclidean Algorithm for GCD: `gcd(a, b) = b == 0 ? a : gcd(b, a % b)`. Runs in logarithmic time O(log(min(a, b))).",
    "timeComplexity": "GCD: O(log(min(a, b))). Divisors & Prime Check: O(sqrt(N)). Sieve: O(N log(log N)).",
    "spaceComplexity": "O(1) auxiliary space for GCD and Divisor routines; O(N) for Sieve table.",
    "stepsToSolve": [
      "1. Euclidean GCD: While `a > 0 && b > 0`: if `a > b` then `a = a % b` else `b = b % a`. Return `a == 0 ? b : a`.",
      "2. Print All Divisors: Loop `i` from 1 while `i * i <= N`: if `N % i == 0`: record `i`. If `N / i != i`: record `N / i`.",
      "3. Prime Check: If `N <= 1` return false. For `i = 2; i * i <= N; i++`: if `N % i == 0` return false. Return true."
    ],
    "cppSnippet": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass BasicMaths {\npublic:\n    // Euclidean GCD in O(log(min(a, b)))\n    long long gcd(long long a, long long b) {\n        while (a > 0 && b > 0) {\n            if (a > b) a %= b;\n            else b %= a;\n        }\n        return (a == 0) ? b : a;\n    }\n\n    // Check Prime in O(sqrt(N))\n    bool isPrime(int n) {\n        if (n <= 1) return false;\n        for (int i = 2; 1LL * i * i <= n; i++) {\n            if (n % i == 0) return false;\n        }\n        return true;\n    }\n\n    // Find all divisors in O(sqrt(N))\n    vector<int> getDivisors(int n) {\n        vector<int> divisors;\n        for (int i = 1; 1LL * i * i <= n; i++) {\n            if (n % i == 0) {\n                divisors.push_back(i);\n                if (n / i != i) {\n                    divisors.push_back(n / i);\n                }\n            }\n        }\n        sort(divisors.begin(), divisors.end());\n        return divisors;\n    }\n};\n\nint main() {\n    BasicMaths bm;\n    cout << \"GCD(52, 10): \" << bm.gcd(52, 10) << endl;\n    cout << \"Is 29 Prime: \" << (bm.isPrime(29) ? \"Yes\" : \"No\") << endl;\n    auto divs = bm.getDivisors(36);\n    cout << \"Divisors of 36: \";\n    for (int d : divs) cout << d << \" \";\n    cout << endl;\n    return 0;\n}\n",
    "pythonSnippet": "from typing import List\n\nclass BasicMaths:\n    def gcd(self, a: int, b: int) -> int:\n        \"\"\"Euclidean GCD in logarithmic time.\"\"\"\n        while a > 0 and b > 0:\n            if a > b:\n                a %= b\n            else:\n                b %= a\n        return b if a == 0 else a\n\n    def is_prime(self, n: int) -> bool:\n        \"\"\"Prime check in O(sqrt(N)).\"\"\"\n        if n <= 1:\n            return False\n        i = 2\n        while i * i <= n:\n            if n % i == 0:\n                return False\n            i += 1\n        return True\n\n    def get_divisors(self, n: int) -> List[int]:\n        \"\"\"All divisors in O(sqrt(N)).\"\"\"\n        divisors = []\n        i = 1\n        while i * i <= n:\n            if n % i == 0:\n                divisors.append(i)\n                if n // i != i:\n                    divisors.append(n // i)\n            i += 1\n        return sorted(divisors)\n\nif __name__ == \"__main__\":\n    bm = BasicMaths()\n    print(\"GCD(52, 10):\", bm.gcd(52, 10))\n    print(\"Is 29 Prime:\", bm.is_prime(29))\n    print(\"Divisors of 36:\", bm.get_divisors(36))\n",
    "pitfalls": [
      "In integer reversal, forgetting that `rev * 10 + digit` can overflow 32-bit signed limits (INT_MAX = 2147483647). Check bounds before multiplying.",
      "Checking prime up to N instead of `sqrt(N)`, resulting in O(N) TLE.",
      "Duplicating perfect square roots in divisor extraction (when `i * i == n`)."
    ],
    "topProblems": [
      "State that the Euclidean algorithm runs in worst case when calculating GCD of two consecutive Fibonacci numbers (taking O(log N) iterations with golden ratio phi)."
    ]
  },
  "1.5": {
    "subStepId": "1.5",
    "stepId": "step-1",
    "stepNumber": 1,
    "title": "Basic Recursion: Call Stack, Base Conditions & Backtracking",
    "overview": "Recursion is a programming technique where a function calls itself to solve smaller subproblems of the same type. Master the call stack, base conditions that stop recursion to prevent stack overflow, parameterized vs. functional recursion, two-pointer array reversals, and string palindrome checking.",
    "coreIntuition": "Base Case: The termination condition that returns a direct result without invoking another recursive call. Without a base case, recursion leads to Stack Overflow (`SIGSEGV`).",
    "recurrenceOrFormula": "\n       Recursion Call Stack & Backtracking (Factorial of 4):\n       fact(4) = 4 * fact(3)  [Waiting: 4 * 6 = 24]\n       fact(3) = 3 * fact(2)  [Waiting: 3 * 2 = 6]\n       fact(2) = 2 * fact(1)  [Waiting: 2 * 1 = 2]\n       fact(1) = 1 (Base Case reached! Unwinds call stack upwards)\n    ",
    "keyTechnique": "Parameterized vs Functional Recursion: Parameterized carries accumulator state down the call stack (`f(i, sum)`). Functional returns subproblem answers back up to the caller (`return n + f(n - 1)`).",
    "timeComplexity": "O(N) for linear recursion; O(2^N) for naive Fibonacci (reducible to O(N) via memoization).",
    "spaceComplexity": "O(N) recursion stack memory.",
    "stepsToSolve": [
      "1. Reverse Array Recursively: `reverseArr(l, r, arr)`: if `l >= r` return. `swap(arr[l], arr[r])`. Call `reverseArr(l + 1, r - 1, arr)`.",
      "2. String Palindrome: `isPal(i, s)`: if `i >= s.length() / 2` return true. If `s[i] != s[s.length() - i - 1]` return false. Return `isPal(i + 1, s)`.",
      "3. Fibonacci Numbers: `fib(n)`: if `n <= 1` return `n`. Return `fib(n - 1) + fib(n - 2)`."
    ],
    "cppSnippet": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass RecursionBasics {\npublic:\n    // In-place recursive array reversal\n    void reverseArray(int l, int r, vector<int>& arr) {\n        if (l >= r) return;\n        swap(arr[l], arr[r]);\n        reverseArray(l + 1, r - 1, arr);\n    }\n\n    // Recursive string palindrome check\n    bool isPalindrome(int i, const string& s) {\n        if (i >= s.length() / 2) return true;\n        if (s[i] != s[s.length() - i - 1]) return false;\n        return isPalindrome(i + 1, s);\n    }\n};\n\nint main() {\n    RecursionBasics rb;\n    vector<int> arr = {1, 2, 3, 4, 5};\n    rb.reverseArray(0, arr.size() - 1, arr);\n\n    cout << \"Reversed Array: \";\n    for (int x : arr) cout << x << \" \";\n    cout << \"\n\";\n\n    cout << \"Is 'radar' palindrome: \" << (rb.isPalindrome(0, \"radar\") ? \"Yes\" : \"No\") << \"\n\";\n    return 0;\n}\n",
    "pythonSnippet": "from typing import List\n\nclass RecursionBasics:\n    def reverse_array(self, l: int, r: int, arr: List[int]) -> None:\n        \"\"\"In-place recursive two-pointer array reversal.\"\"\"\n        if l >= r:\n            return\n        arr[l], arr[r] = arr[r], arr[l]\n        self.reverse_array(l + 1, r - 1, arr)\n\n    def is_palindrome(self, i: int, s: str) -> bool:\n        \"\"\"Recursive palindrome check.\"\"\"\n        if i >= len(s) // 2:\n            return True\n        if s[i] != s[len(s) - i - 1]:\n            return False\n        return self.is_palindrome(i + 1, s)\n\nif __name__ == \"__main__\":\n    rb = RecursionBasics()\n    arr = [1, 2, 3, 4, 5]\n    rb.reverse_array(0, len(arr) - 1, arr)\n    print(\"Reversed Array:\", arr)\n    print(\"Is 'radar' palindrome:\", rb.is_palindrome(0, \"radar\"))\n",
    "pitfalls": [
      "Missing base case or incorrect base case bounds resulting in infinite recursion and Segmentation Fault / StackOverflowError.",
      "In Python, exceeding default recursion limit (1000): Use `sys.setrecursionlimit(200000)` when handling deep recursion."
    ],
    "topProblems": [
      "Always draw the recursion tree during interviews to demonstrate branching factor and tree depth.",
      "Mention that any recursive algorithm can be converted to an iterative one using an explicit stack."
    ]
  },
  "1.6": {
    "subStepId": "1.6",
    "stepId": "step-1",
    "stepNumber": 1,
    "title": "Basic Hashing: Frequency Arrays, Collision Resolution & Map Queries",
    "overview": "Hashing enables O(1) average time search, insertion, and frequency counting. Learn Direct Address Tables (Frequency Arrays for characters and small integers), Hash Functions, Collision Resolution strategies (Separate Chaining with linked lists vs. Open Addressing with linear/quadratic probing), and when to use `unordered_map` vs. `map`.",
    "coreIntuition": "Direct Address Table: When keys are bounded in a small range (e.g. chars 0-255 or numbers <= 10^6), an array index provides deterministic O(1) lookup without any hash computation or memory overhead.",
    "recurrenceOrFormula": "\n       Direct Frequency Array vs Hash Table:\n       • Character Array (lowercase 'a'-'z'):\n         int freq[26] = {0};\n         freq[ch - 'a']++;  // O(1) guaranteed, no overhead, cache-friendly!\n\n       • Hash Table with Separate Chaining:\n         Hash(Key) % BucketCount -> Bucket Index\n         [0] -> (key1, val1) -> (key2, val2) [Linked List on collision]\n         [1] -> NULL\n         [2] -> (key3, val3)\n    ",
    "keyTechnique": "Hash Function: Maps large arbitrary keys into a bounded table index. A good hash function distributes keys uniformly across buckets.",
    "timeComplexity": "Direct Array: O(1) constant time. Unordered Map: O(1) average, O(N) worst-case. Ordered Map: O(log N).",
    "spaceComplexity": "O(U) where U is the number of unique elements.",
    "stepsToSolve": [
      "1. Character Frequency Array: Allocate `int freq[26] = {0}`. For each `char c` in string: `freq[c - 'a']++`. Look up any frequency in O(1).",
      "2. Find Highest and Lowest Frequency Element: Populate `unordered_map<int, int> freq`. Track `maxFreq = 0, minFreq = N, maxEl = -1, minEl = -1`. Loop through map pairs updating extrema."
    ],
    "cppSnippet": "#include <iostream>\n#include <vector>\n#include <unordered_map>\n#include <climits>\nusing namespace std;\n\nclass HashingBasics {\npublic:\n    // Frequency array for lowercase string characters\n    vector<int> charFrequencies(const string& s) {\n        vector<int> freq(26, 0);\n        for (char c : s) {\n            freq[c - 'a']++;\n        }\n        return freq;\n    }\n\n    // Find highest and lowest frequency elements\n    pair<int, int> getFreqExtremes(const vector<int>& nums) {\n        unordered_map<int, int> countMap;\n        for (int x : nums) countMap[x]++;\n\n        int maxFreq = 0, minFreq = INT_MAX;\n        int maxEl = -1, minEl = -1;\n\n        for (const auto& [el, f] : countMap) {\n            if (f > maxFreq) {\n                maxFreq = f;\n                maxEl = el;\n            }\n            if (f < minFreq) {\n                minFreq = f;\n                minEl = el;\n            }\n        }\n        return {maxEl, minEl};\n    }\n};\n\nint main() {\n    HashingBasics hb;\n    vector<int> nums = {1, 2, 2, 3, 3, 3, 4};\n    auto [maxEl, minEl] = hb.getFreqExtremes(nums);\n    cout << \"Most frequent element: \" << maxEl << \"\n\";\n    cout << \"Least frequent element: \" << minEl << \"\n\";\n    return 0;\n}\n",
    "pythonSnippet": "from typing import List, Tuple\nimport collections\n\nclass HashingBasics:\n    def get_freq_extremes(self, nums: List[int]) -> Tuple[int, int]:\n        \"\"\"Finds most and least frequent element via Counter.\"\"\"\n        counts = collections.Counter(nums)\n        max_el = max(counts.keys(), key=lambda k: counts[k])\n        min_el = min(counts.keys(), key=lambda k: counts[k])\n        return max_el, min_el\n\nif __name__ == \"__main__\":\n    hb = HashingBasics()\n    nums = [1, 2, 2, 3, 3, 3, 4]\n    max_el, min_el = hb.get_freq_extremes(nums)\n    print(\"Most frequent element:\", max_el)\n    print(\"Least frequent element:\", min_el)\n",
    "pitfalls": [
      "Declaring a frequency array inside `main()` with size > 10^6: Stack memory will overflow. Large frequency arrays (e.g. 10^7) must be declared globally or allocated on the heap via `vector`.",
      "Negative Number Hashing: Directly indexing an array with negative numbers causes out-of-bounds segfaults. Use an offset (e.g., `freq[num + 1000]`) or a hash map."
    ],
    "topProblems": [
      "Explain that direct frequency arrays outperform hash maps by a factor of 10x in execution speed due to CPU cache locality and absence of hashing functions."
    ]
  },
  "2.1": {
    "subStepId": "2.1",
    "stepId": "step-2",
    "stepNumber": 2,
    "title": "2.1: Sorting-I (Selection, Bubble, Insertion Sort)",
    "overview": "Foundational quadratic O(N^2) sorting algorithms with state invariants: Selection Sort selects minimums, Bubble Sort bubbles maximums via adjacent swaps, and Insertion Sort builds a sorted prefix by shifting.",
    "coreIntuition": "Understanding sorting mechanics begins with state invariants:\n- Selection Sort finds minimum element in unsorted region [i..N-1] and swaps it with arr[i].\n- Bubble Sort compares adjacent elements (arr[j], arr[j+1]); largest element bubbles to end in pass 1. With an `isSwapped` flag, already sorted arrays complete in O(N)!\n- Insertion Sort takes arr[i] and shifts larger sorted elements rightward to insert arr[i] in correct position.",
    "recurrenceOrFormula": "Bubble Sort Early Exit: if (!swapped) break; gives Best Case O(N)",
    "keyTechnique": "Sorted Prefix Expansion & Adjacent Inversion Swapping",
    "timeComplexity": "Selection: O(N^2) all cases; Bubble: O(N) best, O(N^2) worst; Insertion: O(N) best, O(N^2) worst",
    "spaceComplexity": "O(1) in-place auxiliary space",
    "stepsToSolve": [
      "Selection Sort: for each i from 0 to N-2, find minIndex in [i..N-1], swap arr[i] with arr[minIndex].",
      "Bubble Sort: for each pass from N-1 down to 1, compare adjacent pairs; if arr[j] > arr[j+1], swap. Track if any swap occurred.",
      "Insertion Sort: for each i from 1 to N-1, save key=arr[i]. Shift all arr[j] > key to j+1. Place key at j+1."
    ],
    "cppSnippet": "// Bubble Sort with O(N) Best-Case Optimization & Insertion Sort\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid bubbleSort(vector<int>& arr) {\n    int n = arr.size();\n    for (int i = n - 1; i >= 1; i--) {\n        bool didSwap = false;\n        for (int j = 0; j < i; j++) {\n            if (arr[j] > arr[j + 1]) {\n                swap(arr[j], arr[j + 1]);\n                didSwap = true;\n            }\n        }\n        if (!didSwap) break; // O(N) early exit if already sorted!\n    }\n}\n\nvoid insertionSort(vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}\n\nint main() {\n    vector<int> a = {64, 25, 12, 22, 11};\n    bubbleSort(a);\n    cout << \"Bubble Sorted: \";\n    for (int x : a) cout << x << \" \";\n    cout << \"\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Bubble Sort & Insertion Sort\ndef bubble_sort(arr: list[int]) -> None:\n    n = len(arr)\n    for i in range(n - 1, 0, -1):\n        swapped = False\n        for j in range(i):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swapped = True\n        if not swapped:\n            break\n\ndef insertion_sort(arr: list[int]) -> None:\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n\na = [64, 25, 12, 22, 11]\nbubble_sort(a)\nprint(\"Bubble Sorted:\", a)",
    "pitfalls": [
      "Selection sort is NOT stable in its standard swap form (swapping can reverse relative order of equal keys).",
      "Forgetting the `didSwap` flag in Bubble sort turns an already-sorted array into an unnecessary O(N^2) operation."
    ],
    "topProblems": [
      "Selection Sort Algorithm",
      "Bubble Sort Algorithm & Optimization",
      "Insertion Sort Algorithm"
    ]
  },
  "2.2": {
    "subStepId": "2.2",
    "stepId": "step-2",
    "stepNumber": 2,
    "title": "2.2: Sorting-II (Merge Sort, Quick Sort)",
    "overview": "Divide and conquer O(N log N) sorting algorithms: Merge Sort guarantees O(N log N) stable sorting via recursive subdivision and 2-pointer merging; Quick Sort achieves blistering in-place cache-friendly sorting via pivot partitioning.",
    "coreIntuition": "Divide and Conquer breaks array into halves:\n- Merge Sort divides unconditionally until size 1, then merges two sorted halves using 2 pointers. It requires O(N) temporary buffer but guarantees O(N log N) worst case.\n- Quick Sort picks a pivot and partitions array such that all elements <= pivot are on left and > pivot are on right. Pivot lands in its final sorted position. Average time is O(N log N) in-place!",
    "recurrenceOrFormula": "Merge Sort: T(N) = 2T(N/2) + O(N) -> O(N log N) by Master Theorem",
    "keyTechnique": "Divide & Conquer + Two-Pointer Merge / In-Place Partitioning",
    "timeComplexity": "Merge Sort: O(N log N) always; Quick Sort: O(N log N) average, O(N^2) worst if sorted without random pivot",
    "spaceComplexity": "Merge Sort: O(N) auxiliary; Quick Sort: O(log N) stack",
    "stepsToSolve": [
      "Merge Sort: Find mid = (l + r) / 2. Recurse mergeSort(l, mid) and mergeSort(mid + 1, r). Merge halves with temporary vector.",
      "Quick Sort Partition (Lomuto): Set pivot = arr[low]. Use i = low, j = high. Move i right while arr[i] <= pivot, move j left while arr[j] > pivot. Swap arr[i], arr[j]. Place pivot at j.",
      "Recurse quickSort(low, pIndex - 1) and quickSort(pIndex + 1, high)."
    ],
    "cppSnippet": "// Merge Sort & Quick Sort\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid merge(vector<int>& arr, int low, int mid, int high) {\n    vector<int> temp;\n    int left = low, right = mid + 1;\n    while (left <= mid && right <= high) {\n        if (arr[left] <= arr[right]) temp.push_back(arr[left++]);\n        else temp.push_back(arr[right++]);\n    }\n    while (left <= mid) temp.push_back(arr[left++]);\n    while (right <= high) temp.push_back(arr[right++]);\n    for (int i = low; i <= high; i++) arr[i] = temp[i - low];\n}\n\nvoid mergeSort(vector<int>& arr, int low, int high) {\n    if (low >= high) return;\n    int mid = low + (high - low) / 2;\n    mergeSort(arr, low, mid);\n    mergeSort(arr, mid + 1, high);\n    merge(arr, low, mid, high);\n}\n\nint partition(vector<int>& arr, int low, int high) {\n    int pivot = arr[low];\n    int i = low, j = high;\n    while (i < j) {\n        while (arr[i] <= pivot && i <= high - 1) i++;\n        while (arr[j] > pivot && j >= low + 1) j--;\n        if (i < j) swap(arr[i], arr[j]);\n    }\n    swap(arr[low], arr[j]);\n    return j;\n}\n\nvoid quickSort(vector<int>& arr, int low, int high) {\n    if (low < high) {\n        int pIndex = partition(arr, low, high);\n        quickSort(arr, low, pIndex - 1);\n        quickSort(arr, pIndex + 1, high);\n    }\n}\n\nint main() {\n    vector<int> a = {4, 2, 1, 6, 7, 3, 1, 5};\n    mergeSort(a, 0, a.size() - 1);\n    cout << \"Merge Sorted: \";\n    for (int x : a) cout << x << \" \";\n    cout << \"\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Merge Sort & Quick Sort in Python\ndef merge_sort(arr: list[int]) -> list[int]:\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    \n    merged = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            merged.append(left[i]); i += 1\n        else:\n            merged.append(right[j]); j += 1\n    merged.extend(left[i:])\n    merged.extend(right[j:])\n    return merged\n\nprint(\"Merge Sorted:\", merge_sort([4, 2, 1, 6, 7, 3, 1, 5]))",
    "pitfalls": [
      "Quick Sort worst-case O(N^2) on sorted arrays when choosing first/last element as pivot (mitigate via randomized pivot or median-of-three).",
      "Merge sort forgetting to copy temp array back to original array slice."
    ],
    "topProblems": [
      "Merge Sort Algorithm (Divide & Conquer)",
      "Recursive Bubble Sort",
      "Recursive Insertion Sort",
      "Quick Sort Algorithm"
    ]
  },
  "3.1": {
    "subStepId": "3.1",
    "stepId": "step-3",
    "stepNumber": 3,
    "title": "3.1: Easy Array Problems",
    "overview": "Mastering fundamental array techniques: single-pass linear scans, two-pointer tracking, in-place rotations, and array mathematical properties.",
    "coreIntuition": "Avoid unnecessary sorting when single linear scans achieve O(N) time with O(1) space. Use two pointers i and j to partition arrays in-place (e.g. removing duplicates or moving zeroes).",
    "recurrenceOrFormula": "Array Reversal Algorithm for Rotation: Reverse(0, k-1), Reverse(k, n-1), Reverse(0, n-1) => O(N) time, O(1) space!\nMissing Number: XOR sum of 1..N ^ XOR of array elements = missing element",
    "keyTechnique": "Two-Pointer In-Place Filtering & Three-Step Reversal Rotation",
    "timeComplexity": "O(N) single pass",
    "spaceComplexity": "O(1) auxiliary in-place memory",
    "stepsToSolve": [
      "1. Identify whether order must be preserved.",
      "2. For duplicate removal, maintain write pointer `i` that only advances on unique values.",
      "3. For rotation by K steps: Normalize k = k % n, then apply reversal algorithm.",
      "4. For missing number: Use XOR properties (x ^ x = 0, x ^ 0 = x) to avoid integer overflow of sum formulas."
    ],
    "cppSnippet": "// Remove Duplicates from Sorted Array in-place O(N) time, O(1) space\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint removeDuplicates(vector<int>& nums) {\n    if (nums.empty()) return 0;\n    int i = 0;\n    for (int j = 1; j < nums.size(); j++) {\n        if (nums[j] != nums[i]) {\n            nums[++i] = nums[j];\n        }\n    }\n    return i + 1;\n}\n\nint main() {\n    vector<int> nums = {1, 1, 2, 2, 3, 4, 4};\n    int k = removeDuplicates(nums);\n    cout << \"Unique count: \" << k << endl; // 4\n    return 0;\n}",
    "pythonSnippet": "# Remove Duplicates from Sorted Array in-place O(N) time, O(1) space\nfrom typing import List\n\ndef remove_duplicates(nums: List[int]) -> int:\n    if not nums:\n        return 0\n    i = 0\n    for j in range(1, len(nums)):\n        if nums[j] != nums[i]:\n            i += 1\n            nums[i] = nums[j]\n    return i + 1\n\nif __name__ == \"__main__\":\n    nums = [1, 1, 2, 2, 3, 4, 4]\n    print(f\"Unique count: {remove_duplicates(nums)}\") # 4",
    "pitfalls": [
      "Forgetting k = k % n when rotating by k (k can be larger than array size).",
      "Using extra arrays when in-place modification is required by interviewers."
    ],
    "topProblems": [
      "Largest & Second Largest Element",
      "Check if Array is Sorted and Rotated",
      "Remove Duplicates from Sorted Array (LeetCode #26)",
      "Rotate Array by K Places (LeetCode #189)",
      "Move Zeroes to End (LeetCode #283)",
      "Missing Number (LeetCode #268)",
      "Max Consecutive Ones (LeetCode #485)"
    ]
  },
  "3.2": {
    "subStepId": "3.2",
    "stepId": "step-3",
    "stepNumber": 3,
    "title": "3.2: Medium Array Problems",
    "overview": "The core interview array repertoire: Dutch National Flag Algorithm, Boyer-Moore Voting, Kadane’s Algorithm, Next Permutation, and 2D Matrix Rotations.",
    "coreIntuition": "Dutch National Flag partitions array into 3 regions using low, mid, and high pointers. Boyer-Moore cancels opposing votes because the majority element occurs > N/2 times. Kadane discards negative prefix sums because they only diminish subsequent subarray sums.",
    "recurrenceOrFormula": "Kadane: curSum = max(nums[i], curSum + nums[i])\nBoyer-Moore: If count == 0: cand = nums[i]. count += (nums[i] == cand ? 1 : -1)\nNext Permutation: Find pivot nums[i] < nums[i+1], swap with smallest greater element from right, reverse suffix",
    "keyTechnique": "Dutch National Flag 3-Way Partitioning & Boyer-Moore Majority Cancellation",
    "timeComplexity": "O(N) single pass for 1D, O(N^2) for 2D matrices",
    "spaceComplexity": "O(1) in-place auxiliary space",
    "stepsToSolve": [
      "1. Sort 0s, 1s, 2s: mid pointer scans. If nums[mid] == 0: swap(low++, mid++). If 1: mid++. If 2: swap(mid, high--).",
      "2. Kadane: Maintain running sum. Update maxSum = max(maxSum, curSum). If curSum < 0, reset curSum = 0.",
      "3. Rotate Matrix 90 deg: Transpose (swap m[i][j], m[j][i]), then reverse each row.",
      "4. Subarray Sum Equals K: Prefix sum hash map storing frequency of seen prefix sums."
    ],
    "cppSnippet": "// Dutch National Flag (Sort 0, 1, 2) in single pass O(N) time, O(1) space\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid sortColors(vector<int>& nums) {\n    int low = 0, mid = 0, high = nums.size() - 1;\n    while (mid <= high) {\n        if (nums[mid] == 0) {\n            swap(nums[low++], nums[mid++]);\n        } else if (nums[mid] == 1) {\n            mid++;\n        } else {\n            swap(nums[mid], nums[high--]);\n        }\n    }\n}\n\nint main() {\n    vector<int> nums = {2, 0, 2, 1, 1, 0};\n    sortColors(nums);\n    cout << \"Sorted: \";\n    for (int x : nums) cout << x << \" \";\n    cout << endl; // 0 0 1 1 2 2\n    return 0;\n}",
    "pythonSnippet": "# Dutch National Flag (Sort 0, 1, 2) in single pass O(N) time, O(1) space\nfrom typing import List\n\ndef sort_colors(nums: List[int]) -> None:\n    low, mid, high = 0, 0, len(nums) - 1\n    while mid <= high:\n        if nums[mid] == 0:\n            nums[low], nums[mid] = nums[mid], nums[low]\n            low += 1\n            mid += 1\n        elif nums[mid] == 1:\n            mid += 1\n        else:\n            nums[mid], nums[high] = nums[high], nums[mid]\n            high -= 1\n\nif __name__ == \"__main__\":\n    nums = [2, 0, 2, 1, 1, 0]\n    sort_colors(nums)\n    print(f\"Sorted: {nums}\") # [0, 0, 1, 1, 2, 2]",
    "pitfalls": [
      "In Dutch National Flag, when swapping with `high`, DO NOT increment `mid`! The swapped element from `high` has not been inspected yet.",
      "In Kadane’s algorithm, when all numbers are negative, resetting to 0 without recording the maximum negative number produces 0 instead of the maximum single element."
    ],
    "topProblems": [
      "2Sum Problem (LeetCode #1)",
      "Sort Colors (0, 1, 2 - LeetCode #75)",
      "Majority Element (> N/2 - LeetCode #169)",
      "Maximum Subarray Sum (Kadane - LeetCode #53)",
      "Rearrange Array by Sign (LeetCode #2149)",
      "Next Permutation (LeetCode #31)",
      "Leaders in an Array",
      "Longest Consecutive Sequence (LeetCode #128)",
      "Set Matrix Zeroes (LeetCode #73)",
      "Rotate Image by 90 Degrees (LeetCode #48)",
      "Spiral Matrix (LeetCode #54)",
      "Subarray Sum Equals K (LeetCode #560)"
    ]
  },
  "3.3": {
    "subStepId": "3.3",
    "stepId": "step-3",
    "stepNumber": 3,
    "title": "3.3: Hard Array Problems",
    "overview": "Advanced array manipulation: Pascal’s Triangle combinatorics, Majority Element II (> N/3), 3-Sum, 4-Sum, Merge Overlapping Intervals, Inversion Counting, and Maximum Product Subarray.",
    "coreIntuition": "For 3-Sum: Sort first, fix element i, and run Two Pointers on remaining [i+1..n-1] while skipping duplicate values. For Inversions: When merging two halves in Merge Sort and a[i] > a[j], every remaining element in left half (mid - i + 1) forms an inversion pair!",
    "recurrenceOrFormula": "Pascal Element: Row r, Col c = C(r-1, c-1)\nInversion Count: inv += (mid - i + 1) when a[i] > a[j] in merge step\nMax Product: Track both min_prod and max_prod because multiplying two negatives yields a positive",
    "keyTechnique": "Modified Merge Sort Counting & Sort-with-Duplicate-Skipping Two Pointers",
    "timeComplexity": "O(N log N) for inversion counting, O(N^2) for 3-Sum",
    "spaceComplexity": "O(1) extra space for 3-Sum / 4-Sum",
    "stepsToSolve": [
      "1. 3-Sum: Sort nums. Loop i from 0 to n-3. If nums[i] == nums[i-1] continue. Use two pointers left = i+1, right = n-1.",
      "2. Merge Intervals: Sort by start time. If current.start <= prev.end: prev.end = max(prev.end, current.end). Else append new interval.",
      "3. Missing & Repeating Number: Use x - y = diff1 and x^2 - y^2 = diff2 to solve algebraically in O(N) time and O(1) space."
    ],
    "cppSnippet": "// 3Sum with Duplicate Skipping O(N^2) time, O(1) extra space\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvector<vector<int>> threeSum(vector<int>& nums) {\n    vector<vector<int>> res;\n    sort(nums.begin(), nums.end());\n    int n = nums.size();\n\n    for (int i = 0; i < n - 2; i++) {\n        if (i > 0 && nums[i] == nums[i - 1]) continue;\n        int left = i + 1, right = n - 1;\n        while (left < right) {\n            int sum = nums[i] + nums[left] + nums[right];\n            if (sum == 0) {\n                res.push_back({nums[i], nums[left], nums[right]});\n                while (left < right && nums[left] == nums[left + 1]) left++;\n                while (left < right && nums[right] == nums[right - 1]) right--;\n                left++; right--;\n            } else if (sum < 0) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n    }\n    return res;\n}\n\nint main() {\n    vector<int> nums = {-1, 0, 1, 2, -1, -4};\n    auto ans = threeSum(nums);\n    cout << \"3Sum triplets: \" << ans.size() << endl; // 2\n    return 0;\n}",
    "pythonSnippet": "# 3Sum with Duplicate Skipping O(N^2) time, O(1) extra space\nfrom typing import List\n\ndef three_sum(nums: List[int]) -> List[List[int]]:\n    nums.sort()\n    res = []\n    n = len(nums)\n\n    for i in range(n - 2):\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n        left, right = i + 1, n - 1\n        while left < right:\n            s = nums[i] + nums[left] + nums[right]\n            if s == 0:\n                res.append([nums[i], nums[left], nums[right]])\n                while left < right and nums[left] == nums[left + 1]:\n                    left += 1\n                while left < right and nums[right] == nums[right - 1]:\n                    right -= 1\n                left += 1\n                right -= 1\n            elif s < 0:\n                left += 1\n            else:\n                right -= 1\n    return res\n\nif __name__ == \"__main__\":\n    nums = [-1, 0, 1, 2, -1, -4]\n    print(f\"3Sum triplets: {three_sum(nums)}\")",
    "pitfalls": [
      "In 3-Sum, incrementing left or right BEFORE checking `nums[left] == nums[left+1]` skips boundary elements.",
      "In Maximum Product Subarray, not swapping max_prod and min_prod when current element is negative."
    ],
    "topProblems": [
      "Pascal’s Triangle (LeetCode #118)",
      "Majority Element II (> N/3 - LeetCode #229)",
      "3Sum (LeetCode #15)",
      "4Sum (LeetCode #18)",
      "Largest Subarray with 0 Sum",
      "Merge Overlapping Intervals (LeetCode #56)",
      "Merge Sorted Array without Extra Space (LeetCode #88)",
      "Find Missing and Repeating Number",
      "Count Inversions in Array",
      "Reverse Pairs (LeetCode #493)",
      "Maximum Product Subarray (LeetCode #152)"
    ]
  },
  "4.1": {
    "subStepId": "4.1",
    "stepId": "step-4",
    "stepNumber": 4,
    "title": "4.1: Binary Search on 1D Arrays",
    "overview": "Binary search partitions the search space in half at every step. Key variants include Lower Bound, Upper Bound, Search in Rotated Sorted Arrays, and Peak Element.",
    "coreIntuition": "In a rotated sorted array, at least one half (left or right) is ALWAYS sorted! Check if target lies within the bounds of the sorted half. If yes, search there; if not, search the other half.",
    "recurrenceOrFormula": "mid = low + (high - low) / 2 (Prevents integer overflow)\nLower Bound: First index where arr[i] >= x\nUpper Bound: First index where arr[i] > x\nRotated Sorted: if (arr[low] <= arr[mid]) left is sorted, else right is sorted",
    "keyTechnique": "Sorted Half Elimination in Rotated Arrays & Monotonicity Exploitation",
    "timeComplexity": "O(log N) iterations",
    "spaceComplexity": "O(1) iterative",
    "stepsToSolve": [
      "1. Initialize low = 0, high = n - 1.",
      "2. Calculate mid = low + (high - low) / 2.",
      "3. In rotated array: Check if arr[low] <= arr[mid]. If yes, left half is sorted.",
      "4. Check if target lies in [arr[low] .. arr[mid]]. Narrow low/high accordingly.",
      "5. For duplicates (Rotated Array II), if arr[low] == arr[mid] == arr[high], shrink bounds: low++, high--."
    ],
    "cppSnippet": "// Search in Rotated Sorted Array O(log N) time, O(1) space\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint searchRotated(vector<int>& nums, int target) {\n    int low = 0, high = nums.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] == target) return mid;\n\n        // Check if left half is sorted\n        if (nums[low] <= nums[mid]) {\n            if (nums[low] <= target && target < nums[mid]) {\n                high = mid - 1;\n            } else {\n                low = mid + 1;\n            }\n        } else { // Right half is sorted\n            if (nums[mid] < target && target <= nums[high]) {\n                low = mid + 1;\n            } else {\n                high = mid - 1;\n            }\n        }\n    }\n    return -1;\n}\n\nint main() {\n    vector<int> nums = {4, 5, 6, 7, 0, 1, 2};\n    cout << \"Index of 0: \" << searchRotated(nums, 0) << endl; // 4\n    return 0;\n}",
    "pythonSnippet": "# Search in Rotated Sorted Array O(log N) time, O(1) space\nfrom typing import List\n\ndef search_rotated(nums: List[int], target: int) -> int:\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = low + (high - low) // 2\n        if nums[mid] == target:\n            return mid\n\n        if nums[low] <= nums[mid]:\n            if nums[low] <= target < nums[mid]:\n                high = mid - 1\n            else:\n                low = mid + 1\n        else:\n            if nums[mid] < target <= nums[high]:\n                low = mid + 1\n            else:\n                high = mid - 1\n    return -1\n\nif __name__ == \"__main__\":\n    nums = [4, 5, 6, 7, 0, 1, 2]\n    print(f\"Index of 0: {search_rotated(nums, 0)}\") # 4",
    "pitfalls": [
      "Using (low + high) / 2 in C++ can cause 32-bit signed integer overflow when low + high > 2^31 - 1. Always use low + (high - low) / 2.",
      "In Rotated Sorted Array II with duplicates [1, 0, 1, 1, 1], worst case degrades to O(N) because we must shrink low and high by 1."
    ],
    "topProblems": [
      "Binary Search Iterative & Recursive (LeetCode #704)",
      "Implement Lower Bound & Upper Bound",
      "Search Insert Position (LeetCode #35)",
      "First and Last Position of Element (LeetCode #34)",
      "Search in Rotated Sorted Array I (LeetCode #33)",
      "Search in Rotated Sorted Array II (LeetCode #81)",
      "Find Minimum in Rotated Sorted Array (LeetCode #153)",
      "Single Element in a Sorted Array (LeetCode #540)",
      "Find Peak Element (LeetCode #162)"
    ]
  },
  "4.2": {
    "subStepId": "4.2",
    "stepId": "step-4",
    "stepNumber": 4,
    "title": "4.2: Binary Search on Answers / Search Space",
    "overview": "When you need to find the minimum possible maximum (or maximum possible minimum) and the feasibility function is monotonic: if answer X is feasible, every value > X is also feasible.",
    "coreIntuition": "Instead of searching indices in an array, search the range of possible answer values [min_val, max_val]! Write a helper function `isPossible(mid)` that checks if `mid` satisfies problem constraints greedily in O(N) time. Binary search on `mid` takes O(log(range)) steps.",
    "recurrenceOrFormula": "Monotonic Predicate: F F F F T T T T\nKoko Bananas: Speed v in [1, max(piles)]. Hours = sum(ceil(p / v)) <= H\nAggressive Cows: Dist d in [1, max - min]. Greedily place cows with >= d distance\nBook Allocation: Pages in [max(pages), sum(pages)]. Greedily allocate to <= K students",
    "keyTechnique": "Master Template for BS on Answers: while (low <= high) { if (isPossible(mid)) { ans = mid; high = mid - 1; } else { low = mid + 1; } }",
    "timeComplexity": "O(N * log(max_val - min_val))",
    "spaceComplexity": "O(1) auxiliary space",
    "stepsToSolve": [
      "1. Identify monotonicity: If speed/capacity X is valid, is X+1 also valid?",
      "2. Establish exact search range: low = minimum possible value, high = maximum possible value.",
      "3. Write greedy validator function `isPossible(mid)`.",
      "4. If looking for MINIMUM valid answer: when isPossible(mid) == true, record ans = mid and search left (high = mid - 1).",
      "5. If looking for MAXIMUM valid answer: when isPossible(mid) == true, record ans = mid and search right (low = mid + 1)."
    ],
    "cppSnippet": "// Koko Eating Bananas O(N log(max_pile)) time, O(1) space\n#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <cmath>\nusing namespace std;\n\nbool canEatAll(vector<int>& piles, int speed, int h) {\n    long long hours = 0;\n    for (int p : piles) {\n        hours += (p + speed - 1) / speed; // Equivalent to ceil(p / speed)\n    }\n    return hours <= h;\n}\n\nint minEatingSpeed(vector<int>& piles, int h) {\n    int low = 1, high = *max_element(piles.begin(), piles.end());\n    int ans = high;\n\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (canEatAll(piles, mid, h)) {\n            ans = mid;\n            high = mid - 1; // Try smaller speed\n        } else {\n            low = mid + 1;  // Need faster speed\n        }\n    }\n    return ans;\n}\n\nint main() {\n    vector<int> piles = {3, 6, 7, 11};\n    cout << \"Min Speed: \" << minEatingSpeed(piles, 8) << endl; // 4\n    return 0;\n}",
    "pythonSnippet": "# Koko Eating Bananas O(N log(max_pile)) time, O(1) space\nimport math\nfrom typing import List\n\ndef can_eat_all(piles: List[int], speed: int, h: int) -> bool:\n    hours = sum(math.ceil(p / speed) for p in piles)\n    return hours <= h\n\ndef min_eating_speed(piles: List[int], h: int) -> int:\n    low, high = 1, max(piles)\n    ans = high\n\n    while low <= high:\n        mid = low + (high - low) // 2\n        if can_eat_all(piles, mid, h):\n            ans = mid\n            high = mid - 1\n        else:\n            low = mid + 1\n    return ans\n\nif __name__ == \"__main__\":\n    piles = [3, 6, 7, 11]\n    print(f\"Min Speed: {min_eating_speed(piles, 8)}\") # 4",
    "pitfalls": [
      "In Koko Bananas or Ship Capacity, `hours` can exceed 32-bit integer limit if speed is small and piles are huge. Use `long long` in C++.",
      "Using floating-point division without rounding up: use `(p + speed - 1) / speed` in integer arithmetic."
    ],
    "topProblems": [
      "Square Root of an Integer",
      "N-th Root of an Integer",
      "Koko Eating Bananas (LeetCode #875)",
      "Minimum Days to Make M Bouquets (LeetCode #1482)",
      "Find the Smallest Divisor Given a Threshold (LeetCode #1283)",
      "Capacity to Ship Packages within D Days (LeetCode #1011)",
      "Aggressive Cows",
      "Book Allocation Problem",
      "Split Array Largest Sum (LeetCode #410)",
      "Painter’s Partition Problem",
      "Median of Two Sorted Arrays (LeetCode #4)"
    ]
  },
  "4.3": {
    "subStepId": "4.3",
    "stepId": "step-4",
    "stepNumber": 4,
    "title": "4.3: Binary Search on 2D Arrays & Matrices",
    "overview": "Extending binary search to matrices: Fully sorted matrices (flattened index mapping), Row-and-column-wise sorted matrices (staircase search), Peak Element in 2D, and Matrix Median via range binary search.",
    "coreIntuition": "1. Fully Sorted Matrix (N x M): Treat as flattened 1D array of size N*M. Cell `mid` maps to `row = mid / M` and `col = mid % M`. Time is O(log(N * M)).\n2. Row and Column Sorted Matrix: Start at top-right corner (0, M-1). If `matrix[r][c] == target`, found! If `matrix[r][c] > target`, move left (`c--`). If `< target`, move down (`r++`). Time is O(N + M).\n3. Matrix Median: Binary search on value space [minVal..maxVal], counting how many numbers in each row are <= mid using `upper_bound`.",
    "recurrenceOrFormula": "1D Flattening: index `idx` -> row = idx / M, col = idx % M",
    "keyTechnique": "Top-Right Corner Staircase Traversal & Virtual 1D Indexing",
    "timeComplexity": "Fully Sorted: O(log(N*M)); Row/Col Sorted: O(N + M); Matrix Median: O(32 * N * log M)",
    "spaceComplexity": "O(1) auxiliary space",
    "stepsToSolve": [
      "For Search in 2D Matrix (LeetCode #74): low = 0, high = N * M - 1. While low <= high, mid = (low + high)/2. Access matrix[mid / M][mid % M].",
      "For Search in 2D Matrix II (LeetCode #240): r = 0, c = M - 1. While r < N and c >= 0, if match return true; if greater c--; else r++.",
      "For 2D Peak Element (LeetCode #1901): Binary search on columns. Find row with max in midCol. Compare with left & right neighbors."
    ],
    "cppSnippet": "// Search in 2D Matrix (Fully Sorted) & Staircase Search\n#include <iostream>\n#include <vector>\nusing namespace std;\n\n// LeetCode #74: Fully sorted matrix\nbool searchMatrix(vector<vector<int>>& matrix, int target) {\n    int n = matrix.size(), m = matrix[0].size();\n    int low = 0, high = n * m - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        int val = matrix[mid / m][mid % m];\n        if (val == target) return true;\n        if (val < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return false;\n}\n\n// LeetCode #240: Row-wise & Column-wise sorted matrix\nbool searchMatrixII(vector<vector<int>>& matrix, int target) {\n    int r = 0, c = matrix[0].size() - 1;\n    while (r < matrix.size() && c >= 0) {\n        if (matrix[r][c] == target) return true;\n        if (matrix[r][c] > target) c--;\n        else r++;\n    }\n    return false;\n}\n\nint main() {\n    vector<vector<int>> mat = {\n        {1, 3, 5, 7},\n        {10, 11, 16, 20},\n        {23, 30, 34, 60}\n    };\n    cout << \"Search 16: \" << (searchMatrix(mat, 16) ? \"Found\" : \"Not Found\") << \"\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Search in 2D Matrix\ndef search_matrix(matrix: list[list[int]], target: int) -> bool:\n    n, m = len(matrix), len(matrix[0])\n    low, high = 0, n * m - 1\n    while low <= high:\n        mid = (low + high) // 2\n        val = matrix[mid // m][mid % m]\n        if val == target: return True\n        if val < target: low = mid + 1\n        else: high = mid - 1\n    return False\n\nmat = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]\nprint(\"Search 16:\", search_matrix(mat, 16))",
    "pitfalls": [
      "Integer overflow in `mid / m` when matrix size exceeds 2^31 (use integer division with proper bounds).",
      "Starting staircase search from top-left (0,0) or bottom-right (N-1, M-1) where both directions either increase or decrease, giving no decision direction."
    ],
    "topProblems": [
      "Find Row with Maximum Number of 1s in Boolean Matrix",
      "Search in a 2D Matrix (Fully Sorted)",
      "Search in Row and Column Wise Sorted Matrix",
      "Find Peak Element (2D Matrix)",
      "Matrix Median in Row-Wise Sorted Matrix"
    ]
  },
  "5.1": {
    "subStepId": "5.1",
    "stepId": "step-5",
    "stepNumber": 5,
    "title": "5.1: Basic & Easy String Problems",
    "overview": "Core string manipulations: Word reversal in-place, outermost parentheses removal, largest odd number substring, longest common prefix, isomorphic character mapping, and rotation checks.",
    "coreIntuition": "Strings in C++ are mutable byte sequences; strings in Python/Java are immutable objects. Word reversal can be solved in O(1) auxiliary space by reversing each individual word and then reversing the entire string! Isomorphic checking requires bijection: `map1[c1] == c2` AND `map2[c2] == c1`.",
    "recurrenceOrFormula": "Rotation Check: `(s + s).find(goal) != string::npos` (if lengths match)",
    "keyTechnique": "Two-Pointer Reverse & Double-String Concatenation Trick",
    "timeComplexity": "O(N) linear scan",
    "spaceComplexity": "O(1) or O(N) depending on string mutability",
    "stepsToSolve": [
      "Reverse Words: Skip spaces. Copy non-space words. Reverse individual words, then reverse whole string.",
      "Isomorphic Strings: Maintain two arrays `m1[256]` and `m2[256]`. Verify that last seen position of `s[i]` equals `t[i]`.",
      "Check Rotation: Concatenate `s + s`. If `goal` is a rotation, it must exist as a substring inside `s + s` with matching lengths."
    ],
    "cppSnippet": "// Reverse Words in String & Rotation Check\n#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nstring reverseWords(string s) {\n    reverse(s.begin(), s.end());\n    int n = s.size(), idx = 0;\n    for (int start = 0; start < n; start++) {\n        if (s[start] != ' ') {\n            if (idx != 0) s[idx++] = ' ';\n            int end = start;\n            while (end < n && s[end] != ' ') s[idx++] = s[end++];\n            reverse(s.begin() + idx - (end - start), s.begin() + idx);\n            start = end;\n        }\n    }\n    s.erase(s.begin() + idx, s.end());\n    return s;\n}\n\nbool rotateString(string s, string goal) {\n    return s.size() == goal.size() && (s + s).find(goal) != string::npos;\n}\n\nint main() {\n    string str = \"  the sky  is blue  \";\n    cout << \"Reversed Words: '\" << reverseWords(str) << \"'\\n\";\n    cout << \"Is 'cdeab' rotation of 'abcde'? \" << (rotateString(\"abcde\", \"cdeab\") ? \"YES\" : \"NO\") << \"\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Pythonic String Operations\ndef reverse_words(s: str) -> str:\n    return \" \".join(s.split()[::-1])\n\ndef rotate_string(s: str, goal: str) -> bool:\n    return len(s) == len(goal) and goal in (s + s)\n\nprint(\"Reversed Words:\", reverse_words(\"  the sky  is blue  \"))\nprint(\"Is Rotation:\", rotate_string(\"abcde\", \"cdeab\"))",
    "pitfalls": [
      "Forgetting trailing or leading multiple spaces when splitting or trimming words.",
      "Failing to verify lengths before applying `(s + s).find(goal)`."
    ],
    "topProblems": [
      "Remove Outermost Parentheses",
      "Reverse Words in a String",
      "Largest Odd Number in String",
      "Longest Common Prefix",
      "Isomorphic Strings",
      "Check for Rotated Strings",
      "Valid Anagram"
    ]
  },
  "5.2": {
    "subStepId": "5.2",
    "stepId": "step-5",
    "stepNumber": 5,
    "title": "5.2: Medium String Problems",
    "overview": "Intermediate string algorithms: Character frequency sorting (Bucket Sort in O(N)), Roman to Integer, Integer to Roman, ATOI string-to-integer parser with clamp overflow, Longest Palindromic Substring via Expand Around Center, and Count Substrings with K Distinct Characters.",
    "coreIntuition": "1. Frequency Sorting: Bucket sort array of buckets where `bucket[freq]` stores characters with that frequency. Runs in O(N) time instead of O(N log N)!\n2. ATOI Parser: Handle whitespace, optional sign `+/-`, digit accumulation with 32-bit overflow guard `INT_MAX / 10`.\n3. Longest Palindromic Substring: Expand Around Center at 2N-1 centers (each character and each pair between characters) in O(N^2) time and O(1) memory.",
    "recurrenceOrFormula": "ATOI Clamp: if (ans > INT_MAX / 10 || (ans == INT_MAX / 10 && digit > 7)) return sign ? INT_MAX : INT_MIN",
    "keyTechnique": "Bucket Sort for Frequencies & Expand Around Center for Palindromes",
    "timeComplexity": "O(N) for Bucket Sort/ATOI, O(N^2) for Palindromic Substring",
    "spaceComplexity": "O(N) or O(1) auxiliary space",
    "stepsToSolve": [
      "Bucket Sort for Strings: Count frequency in hash table. Place characters in `buckets[count]`. Iterate buckets from N down to 1.",
      "Roman to Integer: Map symbols to values. If `val[s[i]] < val[s[i+1]]`, subtract `val[s[i]]`; else add it.",
      "Count Substrings with K Distinct: Exact(K) = AtMost(K) - AtMost(K - 1) via two sliding window passes!"
    ],
    "cppSnippet": "// Frequency Sort via Bucket Sort & Roman to Integer\n#include <iostream>\n#include <string>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nstring frequencySort(string s) {\n    unordered_map<char, int> freq;\n    for (char c : s) freq[c]++;\n    \n    int n = s.size();\n    vector<string> buckets(n + 1, \"\");\n    for (auto [ch, count] : freq) {\n        buckets[count].append(count, ch);\n    }\n    \n    string res = \"\";\n    for (int i = n; i >= 1; i--) {\n        if (!buckets[i].empty()) res += buckets[i];\n    }\n    return res;\n}\n\nint romanToInt(string s) {\n    unordered_map<char, int> m = {\n        {'I', 1}, {'V', 5}, {'X', 10}, {'L', 50},\n        {'C', 100}, {'D', 500}, {'M', 1000}\n    };\n    int total = 0, n = s.size();\n    for (int i = 0; i < n; i++) {\n        if (i < n - 1 && m[s[i]] < m[s[i + 1]]) total -= m[s[i]];\n        else total += m[s[i]];\n    }\n    return total;\n}\n\nint main() {\n    cout << \"Freq Sort 'tree': \" << frequencySort(\"tree\") << \"\\n\";\n    cout << \"Roman 'MCMXCIV': \" << romanToInt(\"MCMXCIV\") << \" (Expected: 1994)\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Frequency Sort & Roman To Integer\nfrom collections import Counter\n\ndef frequency_sort(s: str) -> str:\n    counts = Counter(s)\n    return \"\".join(ch * count for ch, count in counts.most_common())\n\ndef roman_to_int(s: str) -> int:\n    values = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}\n    total = 0\n    for i in range(len(s)):\n        if i + 1 < len(s) and values[s[i]] < values[s[i + 1]]:\n            total -= values[s[i]]\n        else:\n            total += values[s[i]]\n    return total\n\nprint(\"Freq Sort 'tree':\", frequency_sort(\"tree\"))\nprint(\"Roman 'MCMXCIV':\", roman_to_int(\"MCMXCIV\"))",
    "pitfalls": [
      "ATOI missing leading whitespaces or reading past non-digit characters.",
      "Calculating exact K distinct substrings with single sliding window (must use `atMost(K) - atMost(K-1)`)."
    ],
    "topProblems": [
      "Sort Characters by Frequency",
      "Maximum Nesting Depth of Parentheses",
      "Roman to Integer Conversion",
      "String to Integer (atoi)",
      "Count Number of Substrings with K Distinct Characters",
      "Longest Palindromic Substring",
      "Sum of Beauty of All Substrings"
    ]
  },
  "6.1": {
    "subStepId": "6.1",
    "stepId": "step-6",
    "stepNumber": 6,
    "title": "6.1: Learn 1D LinkedList",
    "overview": "Pointers, memory addresses, dynamic node allocation in heap, Node constructor struct, traversing a singly linked list, and safe insertion and deletion at head, tail, and arbitrary K-th index.",
    "coreIntuition": "Unlike arrays that demand contiguous heap blocks, a Linked List stores nodes in fragmented memory locations connected via pointers (`next`). Insertion and deletion at head is O(1) with no element shifts. A dummy head node eliminates null checks and edge cases when updating the head pointer.",
    "recurrenceOrFormula": "",
    "keyTechnique": "Dummy Head Sentinel Node & Safe Pointer Re-linking",
    "timeComplexity": "Access/Search: O(N); Insertion/Deletion at Head: O(1); Arbitrary K: O(K)",
    "spaceComplexity": "O(1) auxiliary space (O(N) for node storage)",
    "stepsToSolve": [
      "Define `struct ListNode { int val; ListNode* next; ListNode(int x) : val(x), next(nullptr) {} };`.",
      "For insertions at head: `newNode->next = head; return newNode;`.",
      "For deletions at head: `temp = head; head = head->next; delete temp; return head;`.",
      "For deletions of node with value X: keep a `prev` pointer. When `curr->val == X`, link `prev->next = curr->next`."
    ],
    "cppSnippet": "// 1D Singly Linked List Node Operations\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* arrayToList(const vector<int>& arr) {\n    if (arr.empty()) return nullptr;\n    ListNode* head = new ListNode(arr[0]);\n    ListNode* curr = head;\n    for (size_t i = 1; i < arr.size(); i++) {\n        curr->next = new ListNode(arr[i]);\n        curr = curr->next;\n    }\n    return head;\n}\n\nListNode* insertHead(ListNode* head, int val) {\n    ListNode* newNode = new ListNode(val);\n    newNode->next = head;\n    return newNode;\n}\n\nint main() {\n    ListNode* head = arrayToList({10, 20, 30});\n    head = insertHead(head, 5);\n    for (ListNode* p = head; p != nullptr; p = p->next) {\n        cout << p->val << \" -> \";\n    }\n    cout << \"NULL\\n\";\n    return 0;\n}",
    "pythonSnippet": "# 1D Linked List Node Operations\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef array_to_list(arr: list[int]) -> ListNode:\n    dummy = ListNode(0)\n    curr = dummy\n    for x in arr:\n        curr.next = ListNode(x)\n        curr = curr.next\n    return dummy.next\n\nhead = array_to_list([10, 20, 30])\ncurr = head\nres = []\nwhile curr:\n    res.append(str(curr.val))\n    curr = curr.next\nprint(\" -> \".join(res) + \" -> None\")",
    "pitfalls": [
      "Memory leak in C++: forgetting to delete unlinked nodes.",
      "Dereferencing `curr->next` when `curr` is null (Segmentation Fault)."
    ],
    "topProblems": [
      "Introduction to LinkedList & Node Struct",
      "Convert Array to Linked List",
      "Insert Node at Beginning, End & Kth Position",
      "Delete Node in a LinkedList",
      "Find the Length of a LinkedList",
      "Search an Element in a LinkedList"
    ]
  },
  "6.2": {
    "subStepId": "6.2",
    "stepId": "step-6",
    "stepNumber": 6,
    "title": "6.2: Learn Doubly LinkedList",
    "overview": "Bidirectional linked lists with `next` and `prev` pointers: Node insertion, node deletion, and in-place reversal in O(N) time and O(1) space by swapping `next` and `prev` on every node.",
    "coreIntuition": "A Doubly Linked List node has both `next` and `prev`. To reverse a DLL in-place, iterate through all nodes and swap `node->prev` with `node->next`! The last non-null node encountered becomes the new head of the reversed list.",
    "recurrenceOrFormula": "",
    "keyTechnique": "Bidirectional Pointer Swapping (node->prev <-> node->next)",
    "timeComplexity": "Reversal: O(N) time; Insertion/Deletion: O(1) given pointer",
    "spaceComplexity": "O(1) auxiliary space",
    "stepsToSolve": [
      "To reverse a DLL: start with `curr = head, prevNode = nullptr`.",
      "For every node: `swap(curr->next, curr->prev)`.",
      "Track `prevNode = curr->prev` (which was originally `curr->next` before swap).",
      "Advance to next node using `curr = curr->prev` (since pointer was inverted!).",
      "Return `prevNode` as new head."
    ],
    "cppSnippet": "// Doubly Linked List In-Place Reversal\n#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* next;\n    Node* prev;\n    Node(int val) : data(val), next(nullptr), prev(nullptr) {}\n};\n\nNode* reverseDLL(Node* head) {\n    if (!head || !head->next) return head;\n    Node* curr = head;\n    Node* prevNode = nullptr;\n    \n    while (curr != nullptr) {\n        prevNode = curr->prev;\n        curr->prev = curr->next;\n        curr->next = prevNode;\n        curr = curr->prev; // move to original next\n    }\n    return prevNode->prev;\n}\n\nint main() {\n    Node* n1 = new Node(1);\n    Node* n2 = new Node(2);\n    n1->next = n2; n2->prev = n1;\n    Node* newHead = reverseDLL(n1);\n    cout << \"Reversed DLL Head: \" << newHead->data << \" -> \" << newHead->next->data << \"\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Doubly Linked List Reversal\nclass DLLNode:\n    def __init__(self, val=0, prev=None, next=None):\n        self.val = val\n        self.prev = prev\n        self.next = next\n\ndef reverse_dll(head: DLLNode) -> DLLNode:\n    if not head or not head.next: return head\n    curr = head\n    last = None\n    while curr:\n        last = curr.prev\n        curr.prev, curr.next = curr.next, curr.prev\n        curr = curr.prev\n    return last.prev",
    "pitfalls": [
      "Moving forward using `curr = curr->next` after swapping pointers (leads to infinite loop; must use `curr = curr->prev`).",
      "Losing the head reference when deleting the first node of a DLL."
    ],
    "topProblems": [
      "Introduction to Doubly LinkedList & Reversal",
      "Insert Node in a Doubly Linked List",
      "Delete Node in a Doubly Linked List",
      "Reverse a Doubly Linked List"
    ]
  },
  "6.3": {
    "subStepId": "6.3",
    "stepId": "step-6",
    "stepNumber": 6,
    "title": "6.3: Medium Problems of LinkedList",
    "overview": "Classic interview patterns: Tortoise & Hare (Floyd’s Cycle Detection, Finding Middle Node), Reverse Linked List (Iterative 3-pointer vs Recursive), Palindrome Check, Odd-Even List Segregation, Remove N-th node from end, and Intersection of two lists.",
    "coreIntuition": "1. Tortoise & Hare: `slow` advances 1 step, `fast` advances 2 steps. When `fast` reaches end, `slow` is at the exact middle! If there is a cycle, `fast` laps and meets `slow` in O(N) time with O(1) space.\n2. Cycle Starting Node: Once `slow` meets `fast`, place `slow` at `head`. Move both 1 step at a time. Their meeting node is the cycle entrance!\n3. Palindrome Check: Find middle node, reverse the second half, and compare both halves node-by-node in O(1) space!",
    "recurrenceOrFormula": "Floyd Cycle Entrance Proof: Distance from head to cycle entrance == Distance from meeting point to cycle entrance",
    "keyTechnique": "Tortoise & Hare (Slow/Fast Pointers) + Sublist In-Place Reversal",
    "timeComplexity": "O(N) single or two-pass",
    "spaceComplexity": "O(1) auxiliary space (no hash sets needed!)",
    "stepsToSolve": [
      "Middle of LL: `while (fast && fast->next) { slow = slow->next; fast = fast->next->next; } return slow;`.",
      "Detect Cycle: If `fast == slow`, return true. If `fast` hits null, return false.",
      "Reverse List: Maintain `prev = null, curr = head`. While curr: `next = curr->next; curr->next = prev; prev = curr; curr = next;`.",
      "Remove N-th from End: Advance `fast` pointer by N steps. Then move `fast` and `slow` together until `fast->next` is null. Delete `slow->next`."
    ],
    "cppSnippet": "// Floyd's Cycle Detection & Middle Node\n#include <iostream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* findMiddle(ListNode* head) {\n    ListNode* slow = head;\n    ListNode* fast = head;\n    while (fast != nullptr && fast->next != nullptr) {\n        slow = slow->next;\n        fast = fast->next->next;\n    }\n    return slow;\n}\n\nbool hasCycle(ListNode* head) {\n    ListNode* slow = head;\n    ListNode* fast = head;\n    while (fast != nullptr && fast->next != nullptr) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) return true;\n    }\n    return false;\n}\n\nListNode* reverseList(ListNode* head) {\n    ListNode* prev = nullptr;\n    ListNode* curr = head;\n    while (curr != nullptr) {\n        ListNode* nextNode = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nextNode;\n    }\n    return prev;\n}\n\nint main() {\n    ListNode* head = new ListNode(1);\n    head->next = new ListNode(2);\n    head->next->next = new ListNode(3);\n    head->next->next->next = new ListNode(4);\n    head->next->next->next->next = new ListNode(5);\n    cout << \"Middle Node Val: \" << findMiddle(head)->val << \" (Expected: 3)\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Middle Node & In-Place Reversal\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef find_middle(head: ListNode) -> ListNode:\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow\n\ndef reverse_list(head: ListNode) -> ListNode:\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev",
    "pitfalls": [
      "Not checking `fast && fast->next` before advancing `fast->next->next`, triggering null pointer exception.",
      "Forgetting to restore the reversed second half when validating a Palindrome Linked List in-place."
    ],
    "topProblems": [
      "Find Middle Node of LinkedList (Tortoise & Hare)",
      "Reverse a LinkedList (Iterative & Recursive)",
      "Detect a Loop in LinkedList (Floyd's Cycle)",
      "Find the Starting Point of Loop in LinkedList",
      "Check if LinkedList is Palindrome",
      "Segregate Odd and Even Nodes in LinkedList",
      "Remove Nth Node from End of LinkedList",
      "Delete the Middle Node of LinkedList",
      "Intersection of Two LinkedLists",
      "Add Two Numbers as LinkedLists"
    ]
  },
  "6.4": {
    "subStepId": "6.4",
    "stepId": "step-6",
    "stepNumber": 6,
    "title": "6.4: Hard Problems of LinkedList",
    "overview": "Hard interview problems: Reverse Nodes in K-Group (LeetCode #25), Rotate List by K places, Flattening a multi-level child LinkedList, and Deep Cloning a list with Next and Random Pointers in O(1) space.",
    "coreIntuition": "1. Reverse in K-Group: Count if K nodes remain. If yes, reverse the K-segment and re-hook with previous segment and remaining list recursively or iteratively.\n2. Deep Copy with Random Pointers: Interleave cloned nodes directly between original nodes (`orig->next = clone`). Set `clone->random = orig->random->next`. Then separate both lists in O(1) auxiliary space!\n3. Flatten Multi-Level List: Merge bottom-pointers pairwise using the standard 2-pointer Merge Sort logic.",
    "recurrenceOrFormula": "Interleaving Clone Trick: `clone->random = orig->random ? orig->random->next : nullptr`",
    "keyTechnique": "Segment Re-hooking & In-Place Interleaved Node Weaving",
    "timeComplexity": "O(N) linear time",
    "spaceComplexity": "O(1) auxiliary space (no hash maps needed for cloning!)",
    "stepsToSolve": [
      "For K-Group Reversal: Find K-th node. If exists, break link `kth->next = null`, reverse K-group, link `prevGroup->next = reversedHead`, and repeat.",
      "For Clone with Random: Pass 1 weaves clones: `A -> A' -> B -> B'`. Pass 2 sets random: `curr->next->random = curr->random->next`. Pass 3 unweaves lists.",
      "For Flattening: Pairwise merge sorted `bottom` lists from right to left using standard 2-pointer list merge."
    ],
    "cppSnippet": "// Reverse Nodes in K-Group (LeetCode #25)\n#include <iostream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* getKthNode(ListNode* temp, int k) {\n    k -= 1;\n    while (temp != nullptr && k > 0) {\n        k--;\n        temp = temp->next;\n    }\n    return temp;\n}\n\nListNode* reverseList(ListNode* head) {\n    ListNode* prev = nullptr;\n    ListNode* curr = head;\n    while (curr) {\n        ListNode* nextNode = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nextNode;\n    }\n    return prev;\n}\n\nListNode* reverseKGroup(ListNode* head, int k) {\n    ListNode* temp = head;\n    ListNode* prevLast = nullptr;\n    while (temp != nullptr) {\n        ListNode* kthNode = getKthNode(temp, k);\n        if (kthNode == nullptr) {\n            if (prevLast) prevLast->next = temp;\n            break;\n        }\n        ListNode* nextNode = kthNode->next;\n        kthNode->next = nullptr;\n        reverseList(temp);\n        if (temp == head) head = kthNode;\n        else prevLast->next = kthNode;\n        prevLast = temp;\n        temp = nextNode;\n    }\n    return head;\n}\n\nint main() {\n    cout << \"K-Group Reversal Ready (O(N) Time, O(1) Space)\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Reverse Nodes in K-Group\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_k_group(head: ListNode, k: int) -> ListNode:\n    dummy = ListNode(0, head)\n    group_prev = dummy\n    \n    while True:\n        kth = group_prev\n        for _ in range(k):\n            kth = kth.next\n            if not kth:\n                return dummy.next\n        group_next = kth.next\n        \n        # reverse group\n        prev, curr = kth.next, group_prev.next\n        while curr != group_next:\n            tmp = curr.next\n            curr.next = prev\n            prev = curr\n            curr = tmp\n            \n        tmp = group_prev.next\n        group_prev.next = kth\n        group_prev = tmp",
    "pitfalls": [
      "Reversing the final group when it contains fewer than K nodes (problem specifies leaving remaining nodes intact).",
      "Severing the link to the rest of the list before capturing `nextNode`."
    ],
    "topProblems": [
      "Reverse Nodes in K-Group",
      "Rotate a LinkedList by K Places",
      "Flattening of a LinkedList",
      "Clone a LinkedList with Next and Random Pointer"
    ]
  },
  "7.1": {
    "subStepId": "7.1",
    "stepId": "step-7",
    "stepNumber": 7,
    "title": "7.1: Get a Strong Hold on Recursion",
    "overview": "Binary Exponentiation via Divide & Conquer: Computing x^N in O(log N) time with negative power handling and modulo arithmetic, and combinatorial recursive counts.",
    "coreIntuition": "Calculating x^N naively by multiplying N times takes O(N). By exploiting parity:\n- If N is even: x^N = (x^2)^(N/2)\n- If N is odd: x^N = x * (x^2)^((N-1)/2)\nEach multiplication halves the exponent, yielding logarithmic O(log N) time! When N is negative, invert `x = 1/x` and convert N to positive with 64-bit guard against `-INT_MIN` overflow.",
    "recurrenceOrFormula": "Pow(x, n) = (x^2)^(n/2) if n is even; x * (x^2)^((n-1)/2) if n is odd",
    "keyTechnique": "Binary Exponentiation (Exponent Halving)",
    "timeComplexity": "O(log N) operations",
    "spaceComplexity": "O(1) iterative or O(log N) recursive stack",
    "stepsToSolve": [
      "Cast power `n` to `long long nn = n` to safely negate INT_MIN.",
      "If `nn < 0`, negate `nn = -nn` and invert base `x = 1.0 / x`.",
      "Loop while `nn > 0`: if `nn % 2 == 1`, multiply result `ans *= x; nn -= 1;`.",
      "Otherwise, square base `x *= x; nn /= 2;`. Return ans."
    ],
    "cppSnippet": "// LeetCode #50: Pow(x, n) in O(log N)\n#include <iostream>\nusing namespace std;\n\ndouble myPow(double x, int n) {\n    long long nn = n;\n    if (nn < 0) {\n        x = 1.0 / x;\n        nn = -nn;\n    }\n    double ans = 1.0;\n    while (nn > 0) {\n        if (nn % 2 == 1) {\n            ans *= x;\n            nn -= 1;\n        } else {\n            x *= x;\n            nn /= 2;\n        }\n    }\n    return ans;\n}\n\nint main() {\n    cout << \"2.0^10: \" << myPow(2.0, 10) << \" (Expected: 1024.0)\\n\";\n    cout << \"2.0^-2: \" << myPow(2.0, -2) << \" (Expected: 0.25)\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Binary Exponentiation O(log N)\ndef my_pow(x: float, n: int) -> float:\n    if n < 0:\n        x = 1.0 / x\n        n = -n\n    ans = 1.0\n    while n > 0:\n        if n % 2 == 1:\n            ans *= x\n            n -= 1\n        else:\n            x *= x\n            n //= 2\n    return ans\n\nprint(\"2.0^10:\", my_pow(2.0, 10))\nprint(\"2.0^-2:\", my_pow(2.0, -2))",
    "pitfalls": [
      "Negating `n = -n` when `n = -2147483648` directly inside 32-bit int, causing signed integer overflow (must use `long long`)."
    ],
    "topProblems": [
      "Pow(x, n) using Binary Exponentiation",
      "Count Good Numbers (Modulo Exponentiation)"
    ]
  },
  "7.2": {
    "subStepId": "7.2",
    "stepId": "step-7",
    "stepNumber": 7,
    "title": "7.2: Subsequences & Combinations Pattern",
    "overview": "Universal Pick / Don’t Pick recursion tree archetype: Generating all subsequences (Power Set), Combination Sum I (infinite element reuse), Combination Sum II (handling duplicates with sort + skip), and Subset Sum.",
    "coreIntuition": "To generate all subsequences of an array:\nAt every index `i`, you have two recursive choices:\n1. PICK: Add `arr[i]` to current buffer, recurse on `i + 1` (or `i` if infinite reuse allowed).\n2. DONT PICK: Backtrack by popping `arr[i]`, recurse on `i + 1`.\nTo avoid duplicate subsets when input has duplicate numbers: SORT the array first, and at loop level skip if `i > start && arr[i] == arr[i-1]`.",
    "recurrenceOrFormula": "Subsequences Total: 2^N states. Combination Sum: try every candidate index `idx..N-1`",
    "keyTechnique": "Pick vs Non-Pick Backtracking + Sort & Skip for Deduplication",
    "timeComplexity": "O(2^N * K) where K is average combination length",
    "spaceComplexity": "O(K) auxiliary recursion stack space",
    "stepsToSolve": [
      "Sort candidates array if problem involves duplicates or requires lexicographical output.",
      "Define helper function `findCombinations(index, target, currentList)`.",
      "If target == 0, save copy of currentList to result. If index == N or target < 0, return.",
      "Loop `i` from `index` to `N-1`. Skip if `i > index && arr[i] == arr[i-1]`. Pick `arr[i]`, recurse, backtrack by popping."
    ],
    "cppSnippet": "// Combination Sum I & II (LeetCode #39 & #40)\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvoid findCombinations(int ind, int target, vector<int>& arr, vector<int>& ds, vector<vector<int>>& ans) {\n    if (target == 0) {\n        ans.push_back(ds);\n        return;\n    }\n    for (int i = ind; i < arr.size(); i++) {\n        if (i > ind && arr[i] == arr[i - 1]) continue; // Skip duplicates for unique combos\n        if (arr[i] > target) break; // Sorted array optimization\n        ds.push_back(arr[i]);\n        findCombinations(i + 1, target - arr[i], arr, ds, ans); // i+1 for single use\n        ds.pop_back(); // Backtrack\n    }\n}\n\nint main() {\n    vector<int> candidates = {10, 1, 2, 7, 6, 1, 5};\n    sort(candidates.begin(), candidates.end());\n    vector<vector<int>> ans;\n    vector<int> ds;\n    findCombinations(0, 8, candidates, ds, ans);\n    cout << \"Total unique combinations summing to 8: \" << ans.size() << \"\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Combination Sum II with Deduplication\ndef combination_sum_2(candidates: list[int], target: int) -> list[list[int]]:\n    candidates.sort()\n    ans = []\n    \n    def backtrack(start: int, rem: int, path: list[int]):\n        if rem == 0:\n            ans.append(list(path))\n            return\n        for i in range(start, len(candidates)):\n            if i > start and candidates[i] == candidates[i - 1]:\n                continue\n            if candidates[i] > rem:\n                break\n            path.append(candidates[i])\n            backtrack(i + 1, rem - candidates[i], path)\n            path.pop()\n            \n    backtrack(0, target, [])\n    return ans\n\nprint(\"Combinations summing to 8:\", len(combination_sum_2([10, 1, 2, 7, 6, 1, 5], 8)))",
    "pitfalls": [
      "Forgetting to sort before checking `i > start && arr[i] == arr[i-1]`.",
      "Forgetting to pop from the path after recursive call (corrupts subsequent branches)."
    ],
    "topProblems": [
      "Generate All Binary Strings of Length N without Consecutive 1s",
      "Generate Parentheses",
      "Print All Subsequences of a String / Array (Power Set)",
      "Combination Sum I (Infinite Element Use)",
      "Combination Sum II (Unique Combinations with Duplicates)",
      "Subset Sum I & II",
      "Letter Combinations of a Phone Number"
    ]
  },
  "7.3": {
    "subStepId": "7.3",
    "stepId": "step-7",
    "stepNumber": 7,
    "title": "7.3: Hard Backtracking Combos",
    "overview": "Complex state space exploration: N-Queens problem with O(1) hash sets for diagonals, Sudoku Solver (validating rows, columns, and 3x3 boxes), Rat in a Maze, Word Search on 2D board, and Palindrome Partitioning.",
    "coreIntuition": "Backtracking is Depth-First Search over a state-space tree. Whenever a constraint is violated, we prune the branch immediately. For N-Queens, a queen at (r, c) controls: row `r`, column `c`, main diagonal `r + c`, and anti-diagonal `r - c + (N - 1)`. By maintaining boolean lookup arrays for these 3 hashes, safety checks become O(1) instead of O(N)!",
    "recurrenceOrFormula": "Diagonals: Left-Diagonal index = `row + col`, Right-Diagonal index = `(N - 1) + (col - row)`",
    "keyTechnique": "O(1) Hash-Set Constraint Pruning & In-Place Board Mutation",
    "timeComplexity": "N-Queens: O(N!), Sudoku: O(9^(empty_cells)), Word Search: O(N * M * 4^L)",
    "spaceComplexity": "O(N) for board representation and recursion stack",
    "stepsToSolve": [
      "For N-Queens: place one queen per row. Loop through columns 0 to N-1. Check column, upper-left diagonal, and lower-left diagonal via bitsets.",
      "Place queen, mark flags, recurse on row + 1. Upon return, remove queen and unmark flags.",
      "For Sudoku: find first empty cell '.'. Try digits '1' through '9'. Validate row, column, and 3x3 block `(3*(r/3) + i/3, 3*(c/3) + i%3)`.",
      "For Word Search: mark current board cell with temporary character (e.g. '#') during search to prevent revisiting, and restore on backtrack."
    ],
    "cppSnippet": "// N-Queens with O(1) Diagonal Hashing (LeetCode #51)\n#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nvoid solveNQueens(int col, int n, vector<string>& board, vector<vector<string>>& ans,\n                  vector<int>& leftRow, vector<int>& upperDiag, vector<int>& lowerDiag) {\n    if (col == n) {\n        ans.push_back(board);\n        return;\n    }\n    for (int row = 0; row < n; row++) {\n        if (leftRow[row] == 0 && lowerDiag[row + col] == 0 && upperDiag[n - 1 + col - row] == 0) {\n            board[row][col] = 'Q';\n            leftRow[row] = 1;\n            lowerDiag[row + col] = 1;\n            upperDiag[n - 1 + col - row] = 1;\n            \n            solveNQueens(col + 1, n, board, ans, leftRow, upperDiag, lowerDiag);\n            \n            board[row][col] = '.';\n            leftRow[row] = 0;\n            lowerDiag[row + col] = 0;\n            upperDiag[n - 1 + col - row] = 0;\n        }\n    }\n}\n\nint main() {\n    int n = 4;\n    vector<vector<string>> ans;\n    vector<string> board(n, string(n, '.'));\n    vector<int> leftRow(n, 0), upperDiag(2 * n - 1, 0), lowerDiag(2 * n - 1, 0);\n    solveNQueens(0, n, board, ans, leftRow, upperDiag, lowerDiag);\n    cout << \"N-Queens Solutions for N=4: \" << ans.size() << \" (Expected: 2)\\n\";\n    return 0;\n}",
    "pythonSnippet": "# N-Queens Solver in Python\ndef solve_n_queens(n: int) -> list[list[str]]:\n    col_set = set()\n    pos_diag = set() # (r + c)\n    neg_diag = set() # (r - c)\n    res = []\n    board = [[\".\"] * n for _ in range(n)]\n    \n    def backtrack(r: int):\n        if r == n:\n            res.append([\"\".join(row) for row in board])\n            return\n        for c in range(n):\n            if c in col_set or (r + c) in pos_diag or (r - c) in neg_diag:\n                continue\n            col_set.add(c); pos_diag.add(r + c); neg_diag.add(r - c)\n            board[r][c] = \"Q\"\n            backtrack(r + 1)\n            col_set.remove(c); pos_diag.remove(r + c); neg_diag.remove(r - c)\n            board[r][c] = \".\"\n            \n    backtrack(0)\n    return res\n\nprint(\"N-Queens N=4 solutions:\", len(solve_n_queens(4)))",
    "pitfalls": [
      "Scanning the entire board on each queen placement in O(N) instead of using O(1) hash sets for diagonals.",
      "Failing to backtrack visited status when search returns false in Sudoku or Word Search."
    ],
    "topProblems": [
      "Palindrome Partitioning",
      "Word Search in 2D Board",
      "N-Queens Problem",
      "Sudoku Solver",
      "Rat in a Maze Problem",
      "M-Coloring Problem"
    ]
  },
  "8.1": {
    "subStepId": "8.1",
    "stepId": "step-8",
    "stepNumber": 8,
    "title": "8.1: Learn Bit Manipulation",
    "overview": "Bitwise operators (AND, OR, XOR, NOT, Left Shift, Right Shift), checking if i-th bit is set, setting/clearing/toggling bits, removing rightmost set bit via `n & (n - 1)`, power of 2 check, and Brian Kernighan bit-count algorithm.",
    "coreIntuition": "Computers represent data in binary. Bitwise operations execute in a single CPU clock cycle:\n1. Check i-th bit: `(n & (1 << i)) != 0`\n2. Set i-th bit: `n | (1 << i)`\n3. Clear i-th bit: `n & ~(1 << i)`\n4. Toggle i-th bit: `n ^ (1 << i)`\n5. Clear rightmost 1-bit: `n & (n - 1)`. Why? Subtracting 1 flips all bits after the lowest set bit. ANDing with original clears that bit!\n6. Check Power of 2: A power of 2 has exactly one set bit: `n > 0 && (n & (n - 1)) == 0`.",
    "recurrenceOrFormula": "Brian Kernighan: count = 0; while (n) { n &= (n - 1); count++; }",
    "keyTechnique": "Mask Generation `(1 << i)` & Rightmost Set Bit Manipulation `n & (n - 1)`",
    "timeComplexity": "O(1) per bit operation; O(number of set bits) for Kernighan",
    "spaceComplexity": "O(1) auxiliary space",
    "stepsToSolve": [
      "To check if bit `i` is 1: perform `(n >> i) & 1`.",
      "To turn on bit `i`: perform `n = n | (1 << i)`.",
      "To turn off bit `i`: perform `n = n & ~(1 << i)`.",
      "To count total set bits: repeatedly clear rightmost bit `n &= (n - 1)` until `n == 0`."
    ],
    "cppSnippet": "// Bitwise Tricks & Brian Kernighan Count\n#include <iostream>\nusing namespace std;\n\nbool isPowerOfTwo(int n) {\n    return n > 0 && (n & (n - 1)) == 0;\n}\n\nint countSetBits(int n) {\n    int count = 0;\n    while (n > 0) {\n        n &= (n - 1); // Clears lowest set bit in O(1)\n        count++;\n    }\n    return count;\n}\n\nint main() {\n    cout << \"Is 16 power of two? \" << (isPowerOfTwo(16) ? \"YES\" : \"NO\") << \"\\n\";\n    cout << \"Set bits in 29 (11101_2): \" << countSetBits(29) << \" (Expected: 4)\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Bit Manipulation Tricks\ndef is_power_of_two(n: int) -> bool:\n    return n > 0 and (n & (n - 1)) == 0\n\ndef count_set_bits(n: int) -> int:\n    count = 0\n    while n:\n        n &= (n - 1)\n        count += 1\n    return count\n\nprint(\"Is 16 power of two?\", is_power_of_two(16))\nprint(\"Set bits in 29:\", count_set_bits(29))",
    "pitfalls": [
      "Operator precedence: `1 << i + 1` evaluates as `1 << (i + 1)` because `+` has higher precedence than `<<`. Always use parentheses `(1 << i)`.",
      "Shifting past 31 on 32-bit integer: `1 << 35` causes undefined behavior; use `1ULL << 35`."
    ],
    "topProblems": [
      "Check if i-th Bit is Set or Not",
      "Set, Unset & Toggle the i-th Bit",
      "Remove the Last Set Bit (Rightmost 1)",
      "Check if a Number is Power of Two",
      "Count Total Set Bits in an Integer (Kernighan Algorithm)"
    ]
  },
  "8.2": {
    "subStepId": "8.2",
    "stepId": "step-8",
    "stepNumber": 8,
    "title": "8.2: Interview Bitwise Problems",
    "overview": "XOR properties (self-inverse `x ^ x = 0`, identity `x ^ 0 = x`), Single Number I (one unique, all others pairs), Single Number II (one unique, all others appear 3 times), Single Number III (two unique elements), and generating Power Set via binary bitmasks.",
    "coreIntuition": "1. Single Number I: XOR all numbers together. All pairs cancel to 0, leaving the lone unique number!\n2. Single Number III (Two Uniques A & B): XOR all numbers gives `xorVal = A ^ B`. Find any set bit in `xorVal` (e.g. `diff = xorVal & (-xorVal)`). This bit distinguishes A from B! Partition numbers into two groups based on this bit; XORing each group reveals A and B!\n3. Power Set via Bitmask: An array of size N has 2^N subsets. Numbers `0` to `2^N - 1` in binary represent every subset directly!",
    "recurrenceOrFormula": "Rightmost Set Bit Mask: `diff = xorVal & (-xorVal)`",
    "keyTechnique": "XOR Cancellation & Differentiating Bit Masking",
    "timeComplexity": "Single Number: O(N) time; Power Set: O(2^N * N)",
    "spaceComplexity": "O(1) auxiliary space",
    "stepsToSolve": [
      "Single Number III: compute `xorAll = XOR of all elements`.",
      "Isolate rightmost set bit: `mask = xorAll & (-xorAll)`.",
      "Initialize `a = 0, b = 0`. For each num: if `num & mask`, `a ^= num`; else `b ^= num`.",
      "Return `{a, b}`."
    ],
    "cppSnippet": "// Single Number III: Find two unique numbers\n#include <iostream>\n#include <vector>\nusing namespace std;\n\npair<int, int> singleNumberIII(const vector<int>& nums) {\n    long long xorVal = 0;\n    for (int x : nums) xorVal ^= x;\n    \n    // Isolate rightmost set bit\n    long long diff = xorVal & (-xorVal);\n    int a = 0, b = 0;\n    for (int x : nums) {\n        if (x & diff) a ^= x;\n        else b ^= x;\n    }\n    return {a, b};\n}\n\nint main() {\n    vector<int> nums = {1, 2, 1, 3, 2, 5};\n    auto [a, b] = singleNumberIII(nums);\n    cout << \"Two Unique Numbers: \" << a << \" and \" << b << \" (Expected: 3 and 5)\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Single Number III (Two Uniques)\ndef single_number_iii(nums: list[int]) -> list[int]:\n    xor_val = 0\n    for x in nums: xor_val ^= x\n    diff = xor_val & (-xor_val)\n    a = b = 0\n    for x in nums:\n        if x & diff: a ^= x\n        else: b ^= x\n    return [a, b]\n\nprint(\"Two Unique Numbers:\", single_number_iii([1, 2, 1, 3, 2, 5]))",
    "pitfalls": [
      "Integer overflow on `-xorVal` when `xorVal = INT_MIN` (use `long long` for mask computation)."
    ],
    "topProblems": [
      "Count Bits to Flip to Convert A to B",
      "Single Number I (One Unique, Others Twice)",
      "Single Number II (One Unique, Others Thrice)",
      "Single Number III (Two Unique Numbers)",
      "Power Set using Bit Manipulation (2^N Subsets)",
      "XOR of Numbers in a Given Range [L, R]"
    ]
  },
  "8.3": {
    "subStepId": "8.3",
    "stepId": "step-8",
    "stepNumber": 8,
    "title": "8.3: Advanced Maths & Prime Factorization",
    "overview": "Sieve of Eratosthenes up to N in O(N log log N), Smallest Prime Factor (SPF) precomputation for O(log N) prime factorization queries, and prime counting.",
    "coreIntuition": "1. Sieve of Eratosthenes: Start with boolean array `isPrime[N+1] = true`. For `i = 2` to `sqrt(N)`, if `isPrime[i]`, mark all its multiples `i*i, i*i + i, i*i + 2i...` as false. Total operations = N/2 + N/3 + N/5 + ... = O(N log log N) which is practically linear!\n2. SPF (Smallest Prime Factor): During Sieve, store `spf[x] = smallest prime dividing x`. Then, factorizing any query number `Q` takes just O(log Q) divisions: `while (Q > 1) { factors.push(spf[Q]); Q /= spf[Q]; }`!",
    "recurrenceOrFormula": "Sieve Multiples Start: `for (int j = i * i; j <= n; j += i)`",
    "keyTechnique": "Sieve of Eratosthenes & SPF Precomputation Table",
    "timeComplexity": "Precomputation: O(N log log N); Factorization Query: O(log Q)",
    "spaceComplexity": "O(N) for sieve table",
    "stepsToSolve": [
      "Create `spf` array of size `N + 1` where `spf[i] = i`.",
      "Loop `i` from 2 to `sqrt(N)`. If `spf[i] == i`, `i` is prime.",
      "For all multiples `j = i * i; j <= N; j += i`, if `spf[j] == j`, set `spf[j] = i`.",
      "To factorize any number `x`: while `x > 1`, output `spf[x]` and update `x /= spf[x]`."
    ],
    "cppSnippet": "// Sieve of Eratosthenes & O(log N) Factorization\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nconst int MAX = 100000;\nint spf[MAX + 1];\n\nvoid sieve() {\n    for (int i = 1; i <= MAX; i++) spf[i] = i;\n    for (int i = 2; i * i <= MAX; i++) {\n        if (spf[i] == i) {\n            for (int j = i * i; j <= MAX; j += i) {\n                if (spf[j] == j) spf[j] = i;\n            }\n        }\n    }\n}\n\nvector<int> getFactorization(int x) {\n    vector<int> ret;\n    while (x > 1) {\n        ret.push_back(spf[x]);\n        x /= spf[x];\n    }\n    return ret;\n}\n\nint main() {\n    sieve();\n    vector<int> factors = getFactorization(360);\n    cout << \"Prime Factors of 360: \";\n    for (int f : factors) cout << f << \" \";\n    cout << \"\\n\"; // 2 2 2 3 3 5\n    return 0;\n}",
    "pythonSnippet": "# Sieve of Eratosthenes\ndef sieve(n: int) -> list[int]:\n    is_prime = [True] * (n + 1)\n    is_prime[0] = is_prime[1] = False\n    p = 2\n    while p * p <= n:\n        if is_prime[p]:\n            for i in range(p * p, n + 1, p):\n                is_prime[i] = False\n        p += 1\n    return [i for i in range(2, n + 1) if is_prime[i]]\n\nprint(\"Primes up to 30:\", sieve(30))",
    "pitfalls": [
      "Starting inner loop at `2 * i` instead of `i * i` (multiples below `i * i` have already been marked by smaller prime factors).",
      "Integer overflow on `i * i` when `i > 46340` (cast to `1LL * i * i`)."
    ],
    "topProblems": [
      "Print all Prime Factors of a Given Number",
      "Sieve of Eratosthenes (Prime Numbers up to N)",
      "Find Prime Factorization of a Number using Sieve (SPF)",
      "Count Primes in a Range [L, R] using Segmented Sieve"
    ]
  },
  "9.1": {
    "subStepId": "9.1",
    "stepId": "step-9",
    "stepNumber": 9,
    "title": "9.1: Learning Stack & Queue",
    "overview": "LIFO (Last-In First-Out) and FIFO (First-In First-Out) data structure fundamentals: Array/LinkedList implementations, Circular Queue, implementing Stack using Queues, and Min-Stack supporting getMin() in O(1) time and O(1) auxiliary space.",
    "coreIntuition": "1. Min-Stack O(1) Space Trick: When pushing a value `val` strictly smaller than `minVal`, push encoded value `2 * val - minVal` onto stack and update `minVal = val`! Upon pop, if top < minVal, restore previous minimum `minVal = 2 * minVal - top`! Zero extra space.\n2. Stack using Queues: Keep one queue. After pushing `x`, rotate queue by popping and re-enqueueing the previous `size - 1` elements to invert order!",
    "recurrenceOrFormula": "Encoded Min-Stack: `pushVal = 2 * val - minVal`, `prevMin = 2 * minVal - top`",
    "keyTechnique": "State Encoding for O(1) Min-Stack & Queue Rotation",
    "timeComplexity": "All push, pop, top, getMin operations in O(1) amortized",
    "spaceComplexity": "O(N) for elements",
    "stepsToSolve": [
      "For MinStack: keep `long long minVal`. When `val < minVal`, push `2LL * val - minVal` and update `minVal = val`.",
      "When popping: if `st.top() < minVal`, restore `minVal = 2LL * minVal - st.top()`.",
      "For Valid Parentheses: use stack. Push opening brackets `(`, `{`, `[`. When closing bracket appears, check stack non-empty and matching pair."
    ],
    "cppSnippet": "// Min Stack in O(1) Auxiliary Space (LeetCode #155)\n#include <iostream>\n#include <stack>\nusing namespace std;\n\nclass MinStack {\n    stack<long long> st;\n    long long minVal;\npublic:\n    MinStack() { minVal = 1e18; }\n    \n    void push(int val) {\n        if (st.empty()) {\n            minVal = val;\n            st.push(val);\n        } else if (val >= minVal) {\n            st.push(val);\n        } else {\n            st.push(2LL * val - minVal); // Encoded value < val\n            minVal = val;\n        }\n    }\n    \n    void pop() {\n        if (st.empty()) return;\n        long long topVal = st.top();\n        st.pop();\n        if (topVal < minVal) {\n            minVal = 2LL * minVal - topVal; // Restore previous min\n        }\n    }\n    \n    int top() {\n        long long topVal = st.top();\n        if (topVal < minVal) return minVal;\n        return topVal;\n    }\n    \n    int getMin() {\n        return minVal;\n    }\n};\n\nint main() {\n    MinStack ms;\n    ms.push(5); ms.push(3); ms.push(7);\n    cout << \"Current Min: \" << ms.getMin() << \" (Expected: 3)\\n\";\n    ms.pop(); ms.pop();\n    cout << \"Min after popping: \" << ms.getMin() << \" (Expected: 5)\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Min Stack in Python\nclass MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n\n    def push(self, val: int) -> None:\n        self.stack.append(val)\n        val = min(val, self.min_stack[-1] if self.min_stack else val)\n        self.min_stack.append(val)\n\n    def pop(self) -> None:\n        self.stack.pop()\n        self.min_stack.pop()\n\n    def top(self) -> int:\n        return self.stack[-1]\n\n    def getMin(self) -> int:\n        return self.min_stack[-1]\n\nms = MinStack()\nms.push(5); ms.push(3); ms.push(7)\nprint(\"Current Min:\", ms.getMin())",
    "pitfalls": [
      "Popping from an empty stack (crashes program).",
      "32-bit integer overflow when calculating `2 * val - minVal` (must use 64-bit `long long`)."
    ],
    "topProblems": [
      "Implement Stack using Arrays & LinkedList",
      "Implement Queue using Arrays & LinkedList",
      "Implement Stack using Two Queues",
      "Implement Queue using Stacks",
      "Check for Balanced Parentheses",
      "Implement Min Stack in O(1) Space"
    ]
  },
  "9.2": {
    "subStepId": "9.2",
    "stepId": "step-9",
    "stepNumber": 9,
    "title": "9.2: Prefix, Infix, Postfix Conversions",
    "overview": "Arithmetic expression parsing using Operator Precedence and Associativity: Converting between Infix, Postfix (Reverse Polish Notation), and Prefix forms.",
    "coreIntuition": "Infix expressions `(A + B)` require parentheses to denote precedence. Postfix `A B +` and Prefix `+ A B` are parenthesis-free and naturally evaluated by CPU stacks. Higher precedence operators (`^` > `* /` > `+ -`) must be resolved before lower ones. When an operator of lower/equal precedence arrives, pop existing higher operators from the stack!",
    "recurrenceOrFormula": "Precedence Rank: ^ (3, Right-to-Left) > * / (2, Left-to-Right) > + - (1, Left-to-Right)",
    "keyTechnique": "Precedence Stack & Reverse Polish Notation Conversion",
    "timeComplexity": "O(N) single pass over characters",
    "spaceComplexity": "O(N) operator stack",
    "stepsToSolve": [
      "Operands (letters/digits): Append immediately to output.",
      "Opening parenthesis '(': Push directly to stack.",
      "Closing parenthesis ')': Pop stack to output until '(' is popped.",
      "Operators: While stack top has >= precedence (or > precedence for right-associative `^`), pop to output. Push current operator."
    ],
    "cppSnippet": "// Infix to Postfix Conversion\n#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nint prec(char c) {\n    if (c == '^') return 3;\n    if (c == '*' || c == '/') return 2;\n    if (c == '+' || c == '-') return 1;\n    return -1;\n}\n\nstring infixToPostfix(string s) {\n    stack<char> st;\n    string res = \"\";\n    for (char c : s) {\n        if (isalnum(c)) res += c;\n        else if (c == '(') st.push('(');\n        else if (c == ')') {\n            while (!st.empty() && st.top() != '(') {\n                res += st.top(); st.pop();\n            }\n            if (!st.empty()) st.pop();\n        } else {\n            while (!st.empty() && prec(st.top()) >= prec(c)) {\n                if (c == '^' && st.top() == '^') break; // Right associative\n                res += st.top(); st.pop();\n            }\n            st.push(c);\n        }\n    }\n    while (!st.empty()) { res += st.top(); st.pop(); }\n    return res;\n}\n\nint main() {\n    cout << \"Postfix of 'a+b*(c^d-e)': \" << infixToPostfix(\"a+b*(c^d-e)\") << \"\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Infix to Postfix Conversion\ndef infix_to_postfix(s: str) -> str:\n    prec = {'^': 3, '*': 2, '/': 2, '+': 1, '-': 1}\n    st = []\n    res = []\n    for c in s:\n        if c.isalnum():\n            res.append(c)\n        elif c == '(':\n            st.append('(')\n        elif c == ')':\n            while st and st[-1] != '(':\n                res.append(st.pop())\n            if st: st.pop()\n        else:\n            while st and st[-1] != '(' and prec.get(st[-1], 0) >= prec.get(c, 0):\n                if c == '^' and st[-1] == '^': break\n                res.append(st.pop())\n            st.append(c)\n    while st: res.append(st.pop())\n    return \"\".join(res)\n\nprint(\"Postfix:\", infix_to_postfix(\"a+b*(c^d-e)\"))",
    "pitfalls": [
      "Treating exponentiation `^` as left-associative (it is right-associative: `2^3^2 = 2^(3^2)`).",
      "Forgetting to check if stack is empty before checking `st.top()`."
    ],
    "topProblems": [
      "Infix to Postfix Conversion using Stack",
      "Prefix to Infix Conversion",
      "Prefix to Postfix Conversion",
      "Postfix to Prefix Conversion",
      "Postfix to Infix Conversion"
    ]
  },
  "9.3": {
    "subStepId": "9.3",
    "stepId": "step-9",
    "stepNumber": 9,
    "title": "9.3: Monotonic Stack / Queue (VVV Imp)",
    "overview": "The Monotonic Stack paradigm: Next Greater Element (NGE I & II Circular), Next Smaller Element, Largest Rectangle in Histogram, Trapping Rainwater in O(N) time and O(1) space, and Sum of Subarray Minimums.",
    "coreIntuition": "A Monotonic Stack maintains elements in strictly increasing or decreasing order. Every element enters and leaves the stack at most once, guaranteeing O(N) total runtime!\n- Next Greater Element: Traverse right to left. While `st.top() <= arr[i]`, pop! The remaining `st.top()` is the nearest greater element.\n- Largest Rectangle in Histogram: For each bar `h = heights[i]`, find previous smaller index `L` and next smaller index `R`. The width is `(R - L - 1)`. Area is `h * (R - L - 1)`.",
    "recurrenceOrFormula": "Histogram Width: `width = (rightSmaller - leftSmaller - 1)` -> `Area = height * width`",
    "keyTechnique": "Strict Monotonicity & Invariant Pruning",
    "timeComplexity": "O(N) linear time (every element pushed and popped at most once)",
    "spaceComplexity": "O(N) stack space",
    "stepsToSolve": [
      "NGE: Traverse array from `N - 1` down to 0. While `!st.empty() && st.top() <= arr[i]`, `st.pop()`. Set `ans[i] = st.empty() ? -1 : st.top()`. Push `arr[i]`.",
      "Circular Array NGE: Run loop from `2*N - 1` down to 0, accessing indices via modulo `i % N`.",
      "Histogram: Maintain monotonic increasing stack of indices. When a smaller bar arrives, pop and compute area with popped height as minimum height."
    ],
    "cppSnippet": "// Next Greater Element & Largest Rectangle in Histogram\n#include <iostream>\n#include <vector>\n#include <stack>\n#include <algorithm>\nusing namespace std;\n\n// LeetCode #84: Largest Rectangle in Histogram O(N)\nint largestRectangleArea(vector<int>& heights) {\n    stack<int> st;\n    int maxArea = 0, n = heights.size();\n    for (int i = 0; i <= n; i++) {\n        int h = (i == n) ? 0 : heights[i];\n        while (!st.empty() && h < heights[st.top()]) {\n            int height = heights[st.top()];\n            st.pop();\n            int width = st.empty() ? i : i - st.top() - 1;\n            maxArea = max(maxArea, height * width);\n        }\n        st.push(i);\n    }\n    return maxArea;\n}\n\nint main() {\n    vector<int> heights = {2, 1, 5, 6, 2, 3};\n    cout << \"Max Histogram Area: \" << largestRectangleArea(heights) << \" (Expected: 10)\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Largest Rectangle in Histogram (LeetCode #84)\ndef largest_rectangle_area(heights: list[int]) -> int:\n    stack = []\n    max_area = 0\n    heights.append(0)\n    for i, h in enumerate(heights):\n        while stack and h < heights[stack[-1]]:\n            height = heights[stack.pop()]\n            width = i if not stack else i - stack[-1] - 1\n            max_area = max(max_area, height * width)\n        stack.append(i)\n    return max_area\n\nprint(\"Max Histogram Area:\", largest_rectangle_area([2, 1, 5, 6, 2, 3]))",
    "pitfalls": [
      "Assuming nested loops in Monotonic Stack means O(N^2) (each element is pushed once and popped at most once -> O(2N) = O(N)).",
      "Failing to handle remaining elements in stack at the end of the histogram scan (append sentinel height 0)."
    ],
    "topProblems": [
      "Next Greater Element I",
      "Next Greater Element II (Circular Array)",
      "Next Smaller Element",
      "Trapping Rainwater (Two Pointers & Monotonic Stack)",
      "Largest Rectangle in Histogram",
      "Maximal Rectangle in 2D Binary Matrix",
      "Sum of Subarray Minimums",
      "Asteroid Collision"
    ]
  },
  "9.4": {
    "subStepId": "9.4",
    "stepId": "step-9",
    "stepNumber": 9,
    "title": "9.4: Implementation & Cache Problems",
    "overview": "Complex data structure designs: Sliding Window Maximum using Monotonic Deque in O(N), Online Stock Span, The Celebrity Problem, and LRU / LFU Cache design using Doubly Linked Lists and Hash Maps.",
    "coreIntuition": "1. Sliding Window Maximum: Maintain a deque of indices in strictly decreasing order of values. Front of deque is ALWAYS the maximum of the current window! Pop expired indices from front (`q.front() <= i - K`). Pop smaller elements from back (`nums[q.back()] <= nums[i]`).\n2. LRU Cache: Hash map maps key -> Node pointer in Doubly Linked List. Moving node to head takes O(1). Evicting from tail takes O(1). Both `get` and `put` run in true O(1) time!",
    "recurrenceOrFormula": "LRU: `map[key] = node`; node placed right after `dummyHead`",
    "keyTechnique": "Monotonic Deque Windowing & Hash Map + Doubly Linked List Cache",
    "timeComplexity": "Sliding Window: O(N) linear time; LRU Cache: O(1) for all ops",
    "spaceComplexity": "O(K) for window or cache capacity",
    "stepsToSolve": [
      "Sliding Window Max: Loop `i` from 0 to N-1. If `dq.front() <= i - k`, pop front.",
      "While `!dq.empty() && nums[dq.back()] <= nums[i]`, pop back. Push `i`. If `i >= k - 1`, record `nums[dq.front()]`.",
      "LRU Cache: Use dummy head & dummy tail. On `get(key)`: if found, delete node and insert at head, return val. On `put(key, val)`: if exists update & move to head; if capacity exceeded, remove node before tail."
    ],
    "cppSnippet": "// Sliding Window Maximum in O(N) (LeetCode #239)\n#include <iostream>\n#include <vector>\n#include <deque>\nusing namespace std;\n\nvector<int> maxSlidingWindow(vector<int>& nums, int k) {\n    deque<int> dq;\n    vector<int> ans;\n    for (int i = 0; i < nums.size(); i++) {\n        if (!dq.empty() && dq.front() <= i - k) dq.pop_front();\n        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();\n        dq.push_back(i);\n        if (i >= k - 1) ans.push_back(nums[dq.front()]);\n    }\n    return ans;\n}\n\nint main() {\n    vector<int> nums = {1, 3, -1, -3, 5, 3, 6, 7};\n    vector<int> res = maxSlidingWindow(nums, 3);\n    cout << \"Sliding Window Max (k=3): \";\n    for (int x : res) cout << x << \" \";\n    cout << \"\\n\"; // 3 3 5 5 6 7\n    return 0;\n}",
    "pythonSnippet": "# Sliding Window Maximum using collections.deque\nfrom collections import deque\n\ndef max_sliding_window(nums: list[int], k: int) -> list[int]:\n    dq = deque()\n    ans = []\n    for i, x in enumerate(nums):\n        if dq and dq[0] <= i - k:\n            dq.popleft()\n        while dq and nums[dq[-1]] <= x:\n            dq.pop()\n        dq.append(i)\n        if i >= k - 1:\n            ans.append(nums[dq[0]])\n    return ans\n\nprint(\"Sliding Window Max:\", max_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3))",
    "pitfalls": [
      "Storing element values in deque instead of indices (cannot determine if element has expired outside window).",
      "LRU Cache forgetting to erase from the hash map when evicting the tail node."
    ],
    "topProblems": [
      "Sliding Window Maximum (Monotonic Deque)",
      "Online Stock Span",
      "The Celebrity Problem",
      "LRU Cache Implementation (O(1) Get & Put)",
      "LFU (Least Frequently Used) Cache Implementation"
    ]
  },
  "10.1": {
    "subStepId": "10.1",
    "stepId": "step-10",
    "stepNumber": 10,
    "title": "10.1: Medium Sliding Window & Two Pointers",
    "overview": "Dynamic and Fixed-size Sliding Window patterns: Longest Substring Without Repeating Characters, Max Consecutive Ones III (flipping at most K zeroes), Fruit Into Baskets (at most 2 distinct elements), and Maximum Points from Cards.",
    "coreIntuition": "When asked for longest subarray/substring satisfying condition `C` on non-negative inputs, two nested loops take O(N^2). By expanding right pointer `r` to include elements and contracting left pointer `l` only when condition is violated, both pointers move at most N steps: O(2N) = O(N) total time!\nOptimized Window: Never shrink `l` more than necessary—maintain window size to find maximum without shrinking!",
    "recurrenceOrFormula": "Window Expansion: `for (int r = 0; r < n; r++) { add(arr[r]); while (!valid) { remove(arr[l++]); } maxLen = max(maxLen, r - l + 1); }`",
    "keyTechnique": "Dynamic Expand-and-Contract Window (Two Pointers)",
    "timeComplexity": "O(N) linear time",
    "spaceComplexity": "O(K) where K is character set or window elements",
    "stepsToSolve": [
      "Initialize `l = 0, r = 0, maxLen = 0`. Use hash map or frequency array.",
      "Expand window by incorporating `arr[r]`. Update state (e.g. zero count, distinct count).",
      "While state violates problem constraint, contract window by removing `arr[l]` and incrementing `l`.",
      "Update `maxLen = max(maxLen, r - l + 1)`."
    ],
    "cppSnippet": "// Longest Substring Without Repeating Characters (LeetCode #3)\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint lengthOfLongestSubstring(string s) {\n    vector<int> lastSeen(256, -1);\n    int maxLen = 0, l = 0;\n    for (int r = 0; r < s.size(); r++) {\n        if (lastSeen[s[r]] != -1) {\n            l = max(l, lastSeen[s[r]] + 1); // Jump left pointer forward\n        }\n        lastSeen[s[r]] = r;\n        maxLen = max(maxLen, r - l + 1);\n    }\n    return maxLen;\n}\n\nint main() {\n    cout << \"Longest Unique Substring in 'abcabcbb': \" << lengthOfLongestSubstring(\"abcabcbb\") << \" (Expected: 3)\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Longest Substring Without Repeating Characters\ndef length_of_longest_substring(s: str) -> int:\n    char_map = {}\n    l = max_len = 0\n    for r, c in enumerate(s):\n        if c in char_map and char_map[c] >= l:\n            l = char_map[c] + 1\n        char_map[c] = r\n        max_len = max(max_len, r - l + 1)\n    return max_len\n\nprint(\"Longest Unique Substring:\", length_of_longest_substring(\"abcabcbb\"))",
    "pitfalls": [
      "Moving left pointer `l` backward when `lastSeen[c]` was seen before current `l` (must use `l = max(l, lastSeen[c] + 1)`)."
    ],
    "topProblems": [
      "Longest Substring Without Repeating Characters",
      "Max Consecutive Ones III (At Most K Zeroes Flipped)",
      "Fruit Into Baskets (At Most 2 Types of Fruits)",
      "Longest Repeating Character Replacement",
      "Binary Subarrays with Sum",
      "Count Number of Nice Subarrays",
      "Maximum Points You Can Obtain from Cards"
    ]
  },
  "10.2": {
    "subStepId": "10.2",
    "stepId": "step-10",
    "stepNumber": 10,
    "title": "10.2: Hard Sliding Window Problems",
    "overview": "Hard two-pointer problems: Minimum Window Substring (LeetCode #76), Subarrays with K Different Integers (AtMost trick), and Minimum Window Subsequence.",
    "coreIntuition": "1. Subarrays with Exact K Different Integers: Direct sliding window cannot count exact K easily because shrinking `l` might miss other valid windows. The universal reduction trick:\n`Count(Exact K) = Count(At Most K) - Count(At Most K - 1)`!\nBoth `atMost(K)` and `atMost(K-1)` are monotone and solve in O(N)!\n2. Minimum Window Substring: Keep frequency requirement `need` of target string T. Track `matched` count. Once `matched == T.size()`, shrink left pointer `l` to minimize window length while preserving validity.",
    "recurrenceOrFormula": "Universal Sliding Window Identity: `Exact(K) = AtMost(K) - AtMost(K - 1)`",
    "keyTechnique": "Exact-to-AtMost Difference Transformation & Requirement Frequency Matching",
    "timeComplexity": "O(N) linear time",
    "spaceComplexity": "O(K) auxiliary map space",
    "stepsToSolve": [
      "For Exact K: Write helper `atMost(K)`. Sum `r - l + 1` at each step (all subarrays ending at `r` have <= K distinct elements). Return `atMost(k) - atMost(k - 1)`.",
      "For Min Window Substring: Populate `need[char]`. Keep `have` count. Increment `r`, if `need[s[r]] > 0` decrement `remainingRequired`. When 0, shrink `l` and update best [start, minLen]."
    ],
    "cppSnippet": "// LeetCode #76: Minimum Window Substring O(N)\n#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nstring minWindow(string s, string t) {\n    vector<int> map(128, 0);\n    for (char c : t) map[c]++;\n    int count = t.size(), l = 0, r = 0, minLen = 1e9, start = 0;\n    while (r < s.size()) {\n        if (map[s[r++]]-- > 0) count--;\n        while (count == 0) { // Valid window\n            if (r - l < minLen) {\n                minLen = r - l;\n                start = l;\n            }\n            if (map[s[l++]]++ == 0) count++; // make invalid to find next\n        }\n    }\n    return minLen == 1e9 ? \"\" : s.substr(start, minLen);\n}\n\nint main() {\n    cout << \"Min Window for 'ADOBECODEBANC' and 'ABC': \" << minWindow(\"ADOBECODEBANC\", \"ABC\") << \" (Expected: 'BANC')\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Minimum Window Substring (LeetCode #76)\nfrom collections import Counter\n\ndef min_window(s: str, t: str) -> str:\n    if not t or not s: return \"\"\n    dict_t = Counter(t)\n    required = len(dict_t)\n    l, r = 0, 0\n    formed = 0\n    window_counts = {}\n    ans = float(\"inf\"), None, None\n\n    while r < len(s):\n        char = s[r]\n        window_counts[char] = window_counts.get(char, 0) + 1\n        if char in dict_t and window_counts[char] == dict_t[char]:\n            formed += 1\n        while l <= r and formed == required:\n            if (r - l + 1) < ans[0]:\n                ans = (r - l + 1, l, r)\n            window_counts[s[l]] -= 1\n            if s[l] in dict_t and window_counts[s[l]] < dict_t[s[l]]:\n                formed -= 1\n            l += 1\n        r += 1\n    return \"\" if ans[0] == float(\"inf\") else s[ans[1] : ans[2] + 1]\n\nprint(\"Min Window:\", min_window(\"ADOBECODEBANC\", \"ABC\"))",
    "pitfalls": [
      "Attempting to solve exact K distinct subarrays with a single window without the `atMost(K) - atMost(K-1)` reduction.",
      "Off-by-one errors in substring extraction length (`r - l`)."
    ],
    "topProblems": [
      "Longest Substring with At Most K Distinct Characters",
      "Subarrays with K Different Integers (AtMost Trick)",
      "Minimum Window Substring",
      "Minimum Window Subsequence"
    ]
  },
  "11.1": {
    "subStepId": "11.1",
    "stepId": "step-11",
    "stepNumber": 11,
    "title": "11.1: Learning Heaps (Complete Binary Trees & Heapify)",
    "overview": "Heap data structure foundations: Complete binary tree representation in arrays (`left = 2i+1`, `right = 2i+2`, `parent = (i-1)/2`), Max-Heap and Min-Heap properties, Heapify Down in O(log N), Build-Heap in O(N) mathematical proof, and Heap Sort in O(N log N).",
    "coreIntuition": "A Binary Heap is a complete binary tree packed contiguously into an array with NO pointer overhead. In a Max-Heap, every parent node is >= its children. While inserting N items takes O(N log N), building a heap bottom-up starting from the lowest non-leaf node `(N/2 - 1)` down to 0 takes only O(N) time because lower levels have vastly more nodes but require minimal swap depth!",
    "recurrenceOrFormula": "Heap Indices: `left = 2*i + 1`, `right = 2*i + 2`, `parent = (i - 1) / 2`",
    "keyTechnique": "Bottom-Up Heapify (O(N) Build Heap) & Sift-Down Invariant Maintenance",
    "timeComplexity": "Build Heap: O(N); Push/Pop: O(log N); Heap Sort: O(N log N)",
    "spaceComplexity": "O(1) in-place auxiliary space",
    "stepsToSolve": [
      "To Heapify node `i`: find largest among `arr[i]`, `arr[left]`, `arr[right]`.",
      "If largest != `i`, swap `arr[i]` with `arr[largest]` and recursively call `heapify(arr, n, largest)`.",
      "To Build Max Heap: loop `i = n / 2 - 1` down to 0 and call `heapify(arr, n, i)`.",
      "For Heap Sort: repeatedly swap `arr[0]` (max) with `arr[i]`, shrink heap size, and `heapify(arr, i, 0)`."
    ],
    "cppSnippet": "// In-Place Heapify and Heap Sort\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid heapify(vector<int>& arr, int n, int i) {\n    int largest = i;\n    int l = 2 * i + 1;\n    int r = 2 * i + 2;\n    if (l < n && arr[l] > arr[largest]) largest = l;\n    if (r < n && arr[r] > arr[largest]) largest = r;\n    if (largest != i) {\n        swap(arr[i], arr[largest]);\n        heapify(arr, n, largest);\n    }\n}\n\nvoid heapSort(vector<int>& arr) {\n    int n = arr.size();\n    // Build Max-Heap in O(N)\n    for (int i = n / 2 - 1; i >= 0; i--) {\n        heapify(arr, n, i);\n    }\n    // Extract elements one by one\n    for (int i = n - 1; i > 0; i--) {\n        swap(arr[0], arr[i]);\n        heapify(arr, i, 0);\n    }\n}\n\nint main() {\n    vector<int> arr = {12, 11, 13, 5, 6, 7};\n    heapSort(arr);\n    cout << \"Heap Sorted: \";\n    for (int x : arr) cout << x << \" \";\n    cout << \"\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Heap Sort in Python\ndef heapify(arr: list[int], n: int, i: int):\n    largest = i\n    l = 2 * i + 1\n    r = 2 * i + 2\n    if l < n and arr[l] > arr[largest]: largest = l\n    if r < n and arr[r] > arr[largest]: largest = r\n    if largest != i:\n        arr[i], arr[largest] = arr[largest], arr[i]\n        heapify(arr, n, largest)\n\ndef heap_sort(arr: list[int]):\n    n = len(arr)\n    for i in range(n // 2 - 1, -1, -1):\n        heapify(arr, n, i)\n    for i in range(n - 1, 0, -1):\n        arr[i], arr[0] = arr[0], arr[i]\n        heapify(arr, i, 0)\n\na = [12, 11, 13, 5, 6, 7]\nheap_sort(a)\nprint(\"Heap Sorted:\", a)",
    "pitfalls": [
      "Assuming building a heap takes O(N log N) (standard bottom-up build takes strictly O(N) time).",
      "Off-by-one errors on child indices in 0-indexed arrays vs 1-indexed formulas."
    ],
    "topProblems": [
      "Introduction to Priority Queues & Heapify",
      "Check if Array Represents a Binary Min-Heap",
      "Convert Min Heap to Max Heap",
      "Heap Sort Implementation in O(N log N)"
    ]
  },
  "11.2": {
    "subStepId": "11.2",
    "stepId": "step-11",
    "stepNumber": 11,
    "title": "11.2: Medium Heap Problems",
    "overview": "Fixed-size priority queues for rank selection: Kth Largest element in an array in O(N log K), Kth Smallest element, sorting a K-Sorted (Nearly Sorted) array in O(N log K), and Task Scheduler.",
    "coreIntuition": "To find the K-th LARGEST element in an array of size N, maintaining a MIN-HEAP of size K is optimal! As you scan elements, push to min-heap. If heap size exceeds K, pop the smallest element. After checking all N elements, the min-heap holds the K largest elements, and the top element is the K-th largest! Time is O(N log K) and space is O(K) instead of sorting O(N log N).",
    "recurrenceOrFormula": "Kth Largest: Min-Heap of size K | Kth Smallest: Max-Heap of size K",
    "keyTechnique": "Fixed-Size K-Capacity Priority Queue Sifting",
    "timeComplexity": "O(N log K) time",
    "spaceComplexity": "O(K) auxiliary space",
    "stepsToSolve": [
      "Create `priority_queue<int, vector<int>, greater<int>> minHeap;`.",
      "Iterate through every element `x` in the array.",
      "Push `x` into `minHeap`.",
      "If `minHeap.size() > k`, pop the top element (eject smallest).",
      "Return `minHeap.top()` as the K-th largest element."
    ],
    "cppSnippet": "// LeetCode #215: Kth Largest Element in O(N log K)\n#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nint findKthLargest(vector<int>& nums, int k) {\n    priority_queue<int, vector<int>, greater<int>> minHeap;\n    for (int x : nums) {\n        minHeap.push(x);\n        if (minHeap.size() > k) {\n            minHeap.pop();\n        }\n    }\n    return minHeap.top();\n}\n\nint main() {\n    vector<int> nums = {3, 2, 1, 5, 6, 4};\n    cout << \"2nd Largest: \" << findKthLargest(nums, 2) << \" (Expected: 5)\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Kth Largest Element using heapq\nimport heapq\n\ndef find_kth_largest(nums: list[int], k: int) -> int:\n    min_heap = []\n    for x in nums:\n        heapq.heappush(min_heap, x)\n        if len(min_heap) > k:\n            heapq.heappop(min_heap)\n    return min_heap[0]\n\nprint(\"2nd Largest:\", find_kth_largest([3, 2, 1, 5, 6, 4], 2))",
    "pitfalls": [
      "Using a Max-Heap of size N for Kth largest when K << N (wastes memory and takes O(N + K log N) instead of O(N log K))."
    ],
    "topProblems": [
      "Kth Largest Element in an Array",
      "Kth Smallest Element in an Array",
      "Sort K-Sorted (Nearly Sorted) Array",
      "Replace Elements by its Rank in Array",
      "Task Scheduler (Greedy Heap + Frequency)",
      "Hands of Straights"
    ]
  },
  "11.3": {
    "subStepId": "11.3",
    "stepId": "step-11",
    "stepNumber": 11,
    "title": "11.3: Hard Heap & Stream Problems",
    "overview": "Continuous streaming algorithms: Find Median from Data Stream (Two Heaps pattern: Max-Heap for left half, Min-Heap for right half), Merge K Sorted Lists, Top K Frequent Elements, and Twitter System Feed Design.",
    "coreIntuition": "Finding median in real-time stream: The median divides elements into lower half and upper half. Maintain:\n1. `leftHeap` (Max-Heap): stores smaller half of numbers.\n2. `rightHeap` (Min-Heap): stores larger half of numbers.\nBalance invariant: `leftHeap.size() == rightHeap.size()` (even count) or `leftHeap.size() == rightHeap.size() + 1` (odd count). Pushing a number takes O(log N). Reading median takes O(1)!",
    "recurrenceOrFormula": "Median = (leftMax + rightMin) / 2.0 if balanced else leftMax",
    "keyTechnique": "Two-Heap Equilibrium (Max-Heap Lower Half + Min-Heap Upper Half)",
    "timeComplexity": "AddNum: O(log N); FindMedian: O(1); Merge K Lists: O(N log K)",
    "spaceComplexity": "O(N) total stored elements",
    "stepsToSolve": [
      "Always insert new number into `leftHeap` (Max-Heap).",
      "Transfer top of `leftHeap` to `rightHeap` to ensure ordering property `leftMax <= rightMin`.",
      "If `rightHeap.size() > leftHeap.size()`, rebalance by moving top of `rightHeap` back to `leftHeap`.",
      "To get median: if `leftHeap.size() > rightHeap.size()`, return `leftHeap.top()`; else return average of tops."
    ],
    "cppSnippet": "// LeetCode #295: Find Median from Data Stream\n#include <iostream>\n#include <queue>\nusing namespace std;\n\nclass MedianFinder {\n    priority_queue<int> maxHeap; // stores smaller half\n    priority_queue<int, vector<int>, greater<int>> minHeap; // stores larger half\npublic:\n    void addNum(int num) {\n        maxHeap.push(num);\n        minHeap.push(maxHeap.top());\n        maxHeap.pop();\n        if (minHeap.size() > maxHeap.size()) {\n            maxHeap.push(minHeap.top());\n            minHeap.pop();\n        }\n    }\n    \n    double findMedian() {\n        if (maxHeap.size() > minHeap.size()) return maxHeap.top();\n        return (maxHeap.top() + minHeap.top()) / 2.0;\n    }\n};\n\nint main() {\n    MedianFinder mf;\n    mf.addNum(1); mf.addNum(2);\n    cout << \"Median of [1, 2]: \" << mf.findMedian() << \" (Expected: 1.5)\\n\";\n    mf.addNum(3);\n    cout << \"Median of [1, 2, 3]: \" << mf.findMedian() << \" (Expected: 2.0)\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Median from Data Stream using Two Heaps\nimport heapq\n\nclass MedianFinder:\n    def __init__(self):\n        self.small = [] # Max-Heap (stored with inverted negative values)\n        self.large = [] # Min-Heap\n\n    def addNum(self, num: int) -> None:\n        heapq.heappush(self.small, -num)\n        heapq.heappush(self.large, -heapq.heappop(self.small))\n        if len(self.large) > len(self.small):\n            heapq.heappush(self.small, -heapq.heappop(self.large))\n\n    def findMedian(self) -> float:\n        if len(self.small) > len(self.large):\n            return -self.small[0]\n        return (-self.small[0] + self.large[0]) / 2.0\n\nmf = MedianFinder()\nmf.addNum(1); mf.addNum(2)\nprint(\"Median of [1, 2]:\", mf.findMedian())\nmf.addNum(3)\nprint(\"Median of [1, 2, 3]:\", mf.findMedian())",
    "pitfalls": [
      "Allowing size difference between the two heaps to exceed 1 (invalidates median index).",
      "Forgetting to invert numbers when using Python `heapq` as a Max-Heap."
    ],
    "topProblems": [
      "Design Twitter (News Feed & Follow Mechanism)",
      "Find Median from Data Stream (Two Heaps)",
      "Merge K Sorted Lists",
      "Top K Frequent Elements (Min-Heap vs Bucket Sort)"
    ]
  },
  "12.1": {
    "subStepId": "12.1",
    "stepId": "step-12",
    "stepNumber": 12,
    "title": "12.1: Easy Greedy Problems",
    "overview": "Greedy choice property: Making locally optimal choices that lead to a globally optimal solution. Assign Cookies, Fractional Knapsack, Greedy Coin Change, and Lemonade Change.",
    "coreIntuition": "Greedy algorithms make the best immediate decision at each step without backtracking. For Fractional Knapsack, sort items by value-to-weight ratio `val / wt` in descending order and greedily consume the densest items. If capacity remains, take the exact fraction of the next item. Proved optimal via exchange arguments!",
    "recurrenceOrFormula": "Knapsack Density Metric: `ratio = (double)val / wt`",
    "keyTechnique": "Value-to-Weight Density Sorting & Exchange Argument Proof",
    "timeComplexity": "O(N log N) dominated by sorting",
    "spaceComplexity": "O(1) auxiliary space",
    "stepsToSolve": [
      "Assign Cookies: Sort both greed factors `g` and cookie sizes `s`. Pointer `i=0, j=0`. If `s[j] >= g[i]`, child is satisfied (`i++`). Always increment `j++`. Return `i`.",
      "Fractional Knapsack: Sort items by `val / wt` descending. Consume full item while weight fits. If remaining capacity < item weight, add `ratio * remainingCapacity` and break."
    ],
    "cppSnippet": "// Fractional Knapsack Problem\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Item {\n    int value, weight;\n};\n\nbool compareItems(Item a, Item b) {\n    double r1 = (double)a.value / a.weight;\n    double r2 = (double)b.value / b.weight;\n    return r1 > r2;\n}\n\ndouble fractionalKnapsack(int W, vector<Item>& items) {\n    sort(items.begin(), items.end(), compareItems);\n    double totalVal = 0.0;\n    for (auto item : items) {\n        if (W >= item.weight) {\n            totalVal += item.value;\n            W -= item.weight;\n        } else {\n            totalVal += item.value * ((double)W / item.weight);\n            break;\n        }\n    }\n    return totalVal;\n}\n\nint main() {\n    vector<Item> items = {{60, 10}, {100, 20}, {120, 30}};\n    cout << \"Max Knapsack Value (W=50): \" << fractionalKnapsack(50, items) << \" (Expected: 240)\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Fractional Knapsack Problem\ndef fractional_knapsack(W: int, items: list[tuple[int, int]]) -> float:\n    # items as (value, weight)\n    items.sort(key=lambda x: x[0] / x[1], reverse=True)\n    total_val = 0.0\n    for val, wt in items:\n        if W >= wt:\n            total_val += val\n            W -= wt\n        else:\n            total_val += val * (W / wt)\n            break\n    return total_val\n\nitems = [(60, 10), (100, 20), (120, 30)]\nprint(\"Max Knapsack Value (W=50):\", fractional_knapsack(50, items))",
    "pitfalls": [
      "Applying greedy to 0/1 Knapsack where fractions are NOT allowed (0/1 Knapsack requires Dynamic Programming!).",
      "Integer division in ratio calculation: `(double)val / wt` instead of `val / wt`."
    ],
    "topProblems": [
      "Assign Cookies",
      "Fractional Knapsack Problem",
      "Find Minimum Number of Coins (Greedy Change)",
      "Lemonade Change (Greedy $5 and $10 tracking)"
    ]
  },
  "12.2": {
    "subStepId": "12.2",
    "stepId": "step-12",
    "stepNumber": 12,
    "title": "12.2: Medium / Hard Greedy Problems",
    "overview": "Classic interview greedy problems: N Meetings in One Room (Activity Selection), Minimum Platforms for Railway Station, Jump Game I & II, Job Sequencing with Deadlines, and Candy Problem.",
    "coreIntuition": "1. N Meetings in One Room: Sort meetings by END TIME! Finishing meetings earliest leaves maximum time for future meetings.\n2. Minimum Platforms: Sort arrival and departure times independently! Use two pointers `i` and `j`. If a train arrives (`arr[i] <= dep[j]`), we need an extra platform (`platforms++; i++`). When a train departs (`dep[j] < arr[i]`), a platform frees up (`platforms--; j++`). Track peak platforms!\n3. Jump Game I: Track `maxReach = max(maxReach, i + nums[i])`. If `i > maxReach`, return false.",
    "recurrenceOrFormula": "Minimum Platforms: if (arr[i] <= dep[j]) count++, i++; else count--, j++",
    "keyTechnique": "End-Time Activity Selection & Independent Event Time Sweepline",
    "timeComplexity": "O(N log N) sorting",
    "spaceComplexity": "O(1) or O(N) auxiliary space",
    "stepsToSolve": [
      "N Meetings: Pair `(start, end)`. Sort by `end` ascending. Pick first meeting. For subsequent meetings, if `curr.start > prev.end`, increment count and update `prev`.",
      "Minimum Platforms: Sort `arr` and `dep` vectors. Traverse with two pointers `i = 0, j = 0`. Track `currPlatforms` and `maxPlatforms`.",
      "Candy Problem: Left-to-right pass ensuring `ratings[i] > ratings[i-1]` gets `candies[i-1] + 1`. Right-to-left pass taking `max(candies[i], candies[i+1] + 1)`."
    ],
    "cppSnippet": "// Minimum Platforms for Railway Station (Two Pointer Sweepline)\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint findPlatform(vector<int>& arr, vector<int>& dep) {\n    sort(arr.begin(), arr.end());\n    sort(dep.begin(), dep.end());\n    int n = arr.size();\n    int plat_needed = 0, max_plat = 0;\n    int i = 0, j = 0;\n    \n    while (i < n && j < n) {\n        if (arr[i] <= dep[j]) {\n            plat_needed++;\n            i++;\n        } else {\n            plat_needed--;\n            j++;\n        }\n        max_plat = max(max_plat, plat_needed);\n    }\n    return max_plat;\n}\n\nint main() {\n    vector<int> arr = {900, 940, 950, 1100, 1500, 1800};\n    vector<int> dep = {910, 1200, 1120, 1130, 1900, 2000};\n    cout << \"Min Platforms Needed: \" << findPlatform(arr, dep) << \" (Expected: 3)\\n\";\n    return 0;\n}",
    "pythonSnippet": "# Minimum Platforms & Jump Game\ndef find_platforms(arr: list[int], dep: list[int]) -> int:\n    arr.sort()\n    dep.sort()\n    n = len(arr)\n    plat = max_plat = 0\n    i = j = 0\n    while i < n and j < n:\n        if arr[i] <= dep[j]:\n            plat += 1; i += 1\n        else:\n            plat -= 1; j += 1\n        max_plat = max(max_plat, plat)\n    return max_plat\n\narr = [900, 940, 950, 1100, 1500, 1800]\ndep = [910, 1200, 1120, 1130, 1900, 2000]\nprint(\"Min Platforms:\", find_platforms(arr, dep))",
    "pitfalls": [
      "Sorting meetings by start time instead of end time (counter-example: long meeting starting early blocks all short meetings).",
      "Forgetting that a train arriving at the exact same minute as another train departing requires an additional platform (`arr[i] <= dep[j]`)."
    ],
    "topProblems": [
      "N Meetings in One Room (Activity Selection)",
      "Jump Game I (Can Reach End)",
      "Jump Game II (Minimum Jumps to Reach End)",
      "Minimum Platforms for Railway Station",
      "Job Sequencing with Deadlines",
      "Candy Problem (LeetCode #135)"
    ]
  },
  "13.1": {
    "subStepId": "13.1",
    "stepId": "step-13",
    "stepNumber": 13,
    "title": "Traversals: Binary Trees & Representations",
    "overview": "Binary Trees are hierarchical non-linear data structures where each node has at most two children (left and right). Mastery of tree representations and traversals (Inorder, Preorder, Postorder, and Level Order BFS) forms the foundation of all advanced tree algorithms.",
    "coreIntuition": "Binary Tree Properties: A tree with N nodes has N-1 edges. In a full binary tree with L leaves, internal nodes = L - 1. Max nodes at depth d is 2^d.",
    "recurrenceOrFormula": "\n        Binary Tree Traversal Paths:\n                 1\n               /   \\\n              2     3\n             / \\   / \\\n            4   5 6   7\n\n      • Preorder  (Root, Left, Right):  1 -> 2 -> 4 -> 5 -> 3 -> 6 -> 7\n      • Inorder   (Left, Root, Right):  4 -> 2 -> 5 -> 1 -> 6 -> 3 -> 7\n      • Postorder (Left, Right, Root):  4 -> 5 -> 2 -> 6 -> 7 -> 3 -> 1\n      • Level Order BFS (Queue-based):  [1], [2, 3], [4, 5, 6, 7]\n    ",
    "keyTechnique": "Depth-First Search (DFS): Inorder, Preorder, and Postorder can be implemented recursively using the call stack, or iteratively using an explicit stack or Morris traversal.",
    "timeComplexity": "O(N) visiting each node exactly once.",
    "spaceComplexity": "O(H) recursion stack for DFS (O(N) skewed, O(log N) balanced) and O(W) for BFS queue where W is maximum width.",
    "stepsToSolve": [
      "1. Represent a node with `data`, `left*`, and `right*` pointers/references.",
      "2. For Level Order BFS: Initialize queue `q` with `root`. While `q` is not empty, get current level count `sz = q.size()`, loop `sz` times, dequeue node, append value to level list, and enqueue non-null left and right children.",
      "3. For Iterative Preorder: Push `root` to stack `st`. While `st` is not empty: pop `node`, record `node->val`, push `node->right` (if exists), then push `node->left` (if exists).",
      "4. For Iterative Inorder: Keep pointer `curr = root`. While `curr != null` or stack not empty: push all left nodes (`st.push(curr); curr = curr->left`). When null reached, pop from stack, process value, and move to `curr = popped->right`."
    ],
    "cppSnippet": "#include <iostream>\n#include <vector>\n#include <queue>\n#include <stack>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nclass TreeTraversals {\npublic:\n    // Level Order Traversal (BFS)\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        vector<vector<int>> result;\n        if (!root) return result;\n        queue<TreeNode*> q;\n        q.push(root);\n\n        while (!q.empty()) {\n            int levelSize = q.size();\n            vector<int> currentLevel;\n            for (int i = 0; i < levelSize; i++) {\n                TreeNode* node = q.front();\n                q.pop();\n                currentLevel.push_back(node->val);\n                if (node->left) q.push(node->left);\n                if (node->right) q.push(node->right);\n            }\n            result.push_back(currentLevel);\n        }\n        return result;\n    }\n\n    // Iterative Inorder Traversal (Left -> Root -> Right)\n    vector<int> inorderIterative(TreeNode* root) {\n        vector<int> inorder;\n        stack<TreeNode*> st;\n        TreeNode* curr = root;\n\n        while (curr != nullptr || !st.empty()) {\n            while (curr != nullptr) {\n                st.push(curr);\n                curr = curr->left;\n            }\n            curr = st.top();\n            st.pop();\n            inorder.push_back(curr->val);\n            curr = curr->right;\n        }\n        return inorder;\n    }\n};\n\nint main() {\n    TreeNode* root = new TreeNode(1);\n    root->left = new TreeNode(2);\n    root->right = new TreeNode(3);\n    root->left->left = new TreeNode(4);\n    root->left->right = new TreeNode(5);\n\n    TreeTraversals tt;\n    auto levels = tt.levelOrder(root);\n    cout << \"BFS Level Order: \";\n    for (const auto& lvl : levels) {\n        cout << \"[ \";\n        for (int v : lvl) cout << v << \" \";\n        cout << \"] \";\n    }\n    cout << endl;\n    return 0;\n}\n",
    "pythonSnippet": "from typing import Optional, List\nimport collections\n\nclass TreeNode:\n    def __init__(self, val: int = 0, left: Optional['TreeNode'] = None, right: Optional['TreeNode'] = None):\n        self.val = val\n        self.left = left\n        self.right = right\n\nclass TreeTraversals:\n    def level_order(self, root: Optional[TreeNode]) -> List[List[int]]:\n        \"\"\"Level order BFS traversal segregating nodes layer by layer.\"\"\"\n        if not root:\n            return []\n        result = []\n        q = collections.deque([root])\n\n        while q:\n            level = []\n            for _ in range(len(q)):\n                node = q.popleft()\n                level.append(node.val)\n                if node.left:\n                    q.append(node.left)\n                if node.right:\n                    q.append(node.right)\n            result.append(level)\n        return result\n\n    def inorder_iterative(self, root: Optional[TreeNode]) -> List[int]:\n        \"\"\"Iterative inorder using an explicit stack.\"\"\"\n        inorder = []\n        stack = []\n        curr = root\n\n        while curr or stack:\n            while curr:\n                stack.append(curr)\n                curr = curr.left\n            curr = stack.pop()\n            inorder.append(curr.val)\n            curr = curr.right\n        return inorder\n\nif __name__ == \"__main__\":\n    root = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))\n    tt = TreeTraversals()\n    print(\"BFS Level Order:\", tt.level_order(root))\n    print(\"Iterative Inorder:\", tt.inorder_iterative(root))\n",
    "pitfalls": [
      "Forgetting to check if `root == nullptr` at the entry point of BFS or DFS routines.",
      "Pushing `node->left` before `node->right` in iterative preorder, which causes right subtree to be visited first.",
      "Not capturing `q.size()` in a variable before the inner loop in level order traversal (queue size changes dynamically inside the loop)."
    ],
    "topProblems": [
      "For Morris Traversal, mention that threaded binary trees allow O(1) auxiliary space Inorder and Preorder traversals by connecting rightmost node of left subtree to current root.",
      "Always clarify whether tree nodes can have duplicate values and whether the tree is guaranteed to be balanced."
    ]
  },
  "13.2": {
    "subStepId": "13.2",
    "stepId": "step-13",
    "stepNumber": 13,
    "title": "Medium Binary Tree Problems: Views, Diameter & Balances",
    "overview": "Medium tree problems require synthesizing bottom-up subtree properties (height, diameter, balanced checks, max path sum) and coordinate-based horizontal distance mappings (vertical order, top view, bottom view, and boundary traversals).",
    "coreIntuition": "Bottom-Up DFS (Postorder): Compute subtree heights or sub-path sums first, then evaluate the property at the current node to achieve optimal O(N) single-pass solutions.",
    "recurrenceOrFormula": "\n       Coordinate Mapping for Vertical Order & Views:\n                   1 (col: 0, row: 0)\n                 /   \\\n      (-1, 1)  2       3 (+1, 1)\n             /   \\   /   \\\n    (-2, 2) 4     5 6     7 (+2, 2)\n                 (0, 2)\n\n      • Top View:    First node seen at each column [-2: 4, -1: 2, 0: 1, 1: 3, 2: 7]\n      • Bottom View: Last node seen at each column  [-2: 4, -1: 2, 0: 6, 1: 3, 2: 7]\n      • Boundary:    Root + Left Boundary (excluding leaves) + All Leaves (L to R) + Right Boundary (R to L, reversed)\n    ",
    "keyTechnique": "Diameter of Binary Tree: The longest path between any two nodes. At any node, `maxPathThroughNode = leftHeight + rightHeight`. Keep a global maximum and return `1 + max(leftHeight, rightHeight)`.",
    "timeComplexity": "O(N) for bottom-up checks and LCA. O(N log N) or O(N) for coordinate views depending on ordered vs unordered map with sorting.",
    "spaceComplexity": "O(H) recursion stack for tree height/diameter/LCA. O(N) for queue and map in view traversals.",
    "stepsToSolve": [
      "1. Balanced Tree Check: Write helper `dfsHeight(node)`. If `node == null` return 0. Recursively check `lh = dfsHeight(node->left)` and `rh = dfsHeight(node->right)`. If `lh == -1` or `rh == -1` or `abs(lh - rh) > 1`, return -1. Otherwise return `1 + max(lh, rh)`.",
      "2. Lowest Common Ancestor (LCA): `if (!root || root == p || root == q) return root;` Left LCA = `lowestCommonAncestor(root->left, p, q)`. Right LCA = `lowestCommonAncestor(root->right, p, q)`. If both non-null, return `root`. Otherwise return the non-null child.",
      "3. Top View: BFS with `queue<pair<TreeNode*, int>>` (node, col). Map `map<int, int> topViewMap`. Only insert `col` into map if `topViewMap.count(col) == 0`.",
      "4. Bottom View: Same BFS, but continuously overwrite `bottomViewMap[col] = node->val` so the lowest layer value persists."
    ],
    "cppSnippet": "#include <iostream>\n#include <vector>\n#include <map>\n#include <queue>\n#include <algorithm>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nclass MediumTreeSolutions {\npublic:\n    // Diameter of Binary Tree in single pass O(N)\n    int diameterOfBinaryTree(TreeNode* root) {\n        int diameter = 0;\n        height(root, diameter);\n        return diameter;\n    }\n\n    int height(TreeNode* node, int& diameter) {\n        if (!node) return 0;\n        int lh = height(node->left, diameter);\n        int rh = height(node->right, diameter);\n        diameter = max(diameter, lh + rh);\n        return 1 + max(lh, rh);\n    }\n\n    // Lowest Common Ancestor of a Binary Tree\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        if (!root || root == p || root == q) return root;\n        TreeNode* left = lowestCommonAncestor(root->left, p, q);\n        TreeNode* right = lowestCommonAncestor(root->right, p, q);\n        if (left && right) return root;\n        return left ? left : right;\n    }\n\n    // Top View of Binary Tree\n    vector<int> topView(TreeNode* root) {\n        vector<int> ans;\n        if (!root) return ans;\n        map<int, int> mpp; // col -> first node val\n        queue<pair<TreeNode*, int>> q;\n        q.push({root, 0});\n\n        while (!q.empty()) {\n            auto [node, col] = q.front();\n            q.pop();\n            if (mpp.find(col) == mpp.end()) {\n                mpp[col] = node->val;\n            }\n            if (node->left) q.push({node->left, col - 1});\n            if (node->right) q.push({node->right, col + 1});\n        }\n\n        for (auto& [col, val] : mpp) ans.push_back(val);\n        return ans;\n    }\n};\n\nint main() {\n    TreeNode* root = new TreeNode(1);\n    root->left = new TreeNode(2);\n    root->right = new TreeNode(3);\n    root->left->right = new TreeNode(4);\n\n    MediumTreeSolutions sol;\n    cout << \"Diameter: \" << sol.diameterOfBinaryTree(root) << endl;\n    return 0;\n}\n",
    "pythonSnippet": "from typing import Optional, List\nimport collections\n\nclass TreeNode:\n    def __init__(self, val: int = 0, left: Optional['TreeNode'] = None, right: Optional['TreeNode'] = None):\n        self.val = val\n        self.left = left\n        self.right = right\n\nclass MediumTreeSolutions:\n    def diameter_of_binary_tree(self, root: Optional[TreeNode]) -> int:\n        \"\"\"Finds length of longest path between any two nodes in O(N).\"\"\"\n        diameter = 0\n\n        def get_height(node: Optional[TreeNode]) -> int:\n            nonlocal diameter\n            if not node:\n                return 0\n            lh = get_height(node.left)\n            rh = get_height(node.right)\n            diameter = max(diameter, lh + rh)\n            return 1 + max(lh, rh)\n\n        get_height(root)\n        return diameter\n\n    def lowest_common_ancestor(self, root: Optional[TreeNode], p: TreeNode, q: TreeNode) -> Optional[TreeNode]:\n        \"\"\"Lowest common ancestor via postorder search.\"\"\"\n        if not root or root == p or root == q:\n            return root\n        left = self.lowest_common_ancestor(root.left, p, q)\n        right = self.lowest_common_ancestor(root.right, p, q)\n        if left and right:\n            return root\n        return left if left else right\n\n    def top_view(self, root: Optional[TreeNode]) -> List[int]:\n        \"\"\"Top view using horizontal distance BFS.\"\"\"\n        if not root:\n            return []\n        col_map = {} # col -> first node val\n        q = collections.deque([(root, 0)])\n\n        while q:\n            node, col = q.popleft()\n            if col not in col_map:\n                col_map[col] = node.val\n            if node.left:\n                q.append((node.left, col - 1))\n            if node.right:\n                q.append((node.right, col + 1))\n\n        return [col_map[c] for c in sorted(col_map.keys())]\n\nif __name__ == \"__main__\":\n    root = TreeNode(1, TreeNode(2, None, TreeNode(4)), TreeNode(3))\n    sol = MediumTreeSolutions()\n    print(\"Diameter:\", sol.diameter_of_binary_tree(root))\n    print(\"Top View:\", sol.top_view(root))\n",
    "pitfalls": [
      "Calculating height naively at every node in diameter/balanced checks, degrading time complexity to O(N^2) instead of O(N).",
      "For Top/Bottom view, using DFS instead of BFS: In DFS, depth order is not strictly increasing layer-by-layer, causing a deeper node visited earlier to shadow a shallower top view node.",
      "In boundary traversal, duplicating leaf nodes or the root node when joining boundary arrays."
    ],
    "topProblems": [
      "When asked for max path sum, mention that we prune negative paths using `max(0, leftPath)` so a negative subtree does not decrease our path sum.",
      "Always ask if edge counts or node counts define diameter (LeetCode defines diameter by edges = nodes - 1, whereas some portals define it by nodes)."
    ]
  },
  "13.3": {
    "subStepId": "13.3",
    "stepId": "step-13",
    "stepNumber": 13,
    "title": "Hard Binary Tree: Construction, Morris Traversal & Burning Tree",
    "overview": "Advanced tree problems feature non-trivial graph projections (Burning Tree / Distance K via parent pointers), unique reconstruction from traversal sequences (Preorder + Inorder), and O(1) auxiliary space Morris Traversal via Threaded Binary Trees.",
    "coreIntuition": "Parent Pointer Mapping: Binary trees only have child pointers. By performing an initial BFS to populate a `parent[node]` hash map, we can traverse upwards toward the parent, turning the tree into an undirected graph.",
    "recurrenceOrFormula": "\n      1. All Nodes at Distance K (Graph Projection via Parent Map):\n                   3 (target)\n                 /   \\\n                5     1\n               / \\   / \\\n              6   2 0   8\n          Parent map transforms directed tree into an undirected graph!\n          BFS radially outward up to radius K from target using visited set.\n\n      2. Morris Inorder Traversal (O(1) Space Threading):\n          curr = root\n          If curr->left is null: print(curr); curr = curr->right\n          Else: find rightmost node of curr->left (inorder predecessor)\n                If predecessor->right is null: thread it! (predecessor->right = curr; curr = curr->left)\n                Else: remove thread! (predecessor->right = null; print(curr); curr = curr->right)\n    ",
    "keyTechnique": "All Nodes at Distance K / Burning Tree: Run radial BFS from target / fire start. Enqueue left child, right child, and parent. Track visited set and increment time/distance per level.",
    "timeComplexity": "O(N) for Tree Construction, Distance K BFS, and Morris Traversal (each edge traversed at most 3 times).",
    "spaceComplexity": "O(1) auxiliary space for Morris Traversal! O(N) for parent map and tree construction index table.",
    "stepsToSolve": [
      "1. Construct Tree from Preorder & Inorder: Build hash map `inMap[val] = index` for O(1) index lookup. Recurse `build(preStart, preEnd, inStart, inEnd)`: `root = preorder[preStart]`. Root in inorder is `inRoot = inMap[root->val]`. Left subtree size `numsLeft = inRoot - inStart`. Recurse left: `(preStart + 1, preStart + numsLeft, inStart, inRoot - 1)`. Recurse right: `(preStart + numsLeft + 1, preEnd, inRoot + 1, inEnd)`.",
      "2. Morris Inorder Traversal: Set `curr = root`. While `curr != null`: if `curr->left == null`, record `curr->val`, `curr = curr->right`. Else find `prev = curr->left` and loop while `prev->right && prev->right != curr`. If `prev->right == null`, make thread `prev->right = curr` and move `curr = curr->left`. Else cut thread `prev->right = null`, record `curr->val`, and move `curr = curr->right`.",
      "3. Burning Tree: Map parents via BFS. Then BFS from target: each minute, expand to unvisited `left`, `right`, and `parent`. Total minutes = number of BFS rounds until queue empty."
    ],
    "cppSnippet": "#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nclass HardTreeSolutions {\npublic:\n    // Build Tree from Preorder and Inorder\n    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {\n        unordered_map<int, int> inMap;\n        for (int i = 0; i < inorder.size(); i++) inMap[inorder[i]] = i;\n        return build(preorder, 0, preorder.size() - 1, inorder, 0, inorder.size() - 1, inMap);\n    }\n\n    TreeNode* build(vector<int>& pre, int preStart, int preEnd,\n                    vector<int>& in, int inStart, int inEnd,\n                    unordered_map<int, int>& inMap) {\n        if (preStart > preEnd || inStart > inEnd) return nullptr;\n        TreeNode* root = new TreeNode(pre[preStart]);\n        int inRoot = inMap[root->val];\n        int numsLeft = inRoot - inStart;\n\n        root->left = build(pre, preStart + 1, preStart + numsLeft, in, inStart, inRoot - 1, inMap);\n        root->right = build(pre, preStart + numsLeft + 1, preEnd, in, inRoot + 1, inEnd, inMap);\n        return root;\n    }\n\n    // Morris Inorder Traversal - O(1) Auxiliary Space\n    vector<int> morrisInorder(TreeNode* root) {\n        vector<int> inorder;\n        TreeNode* curr = root;\n\n        while (curr != nullptr) {\n            if (curr->left == nullptr) {\n                inorder.push_back(curr->val);\n                curr = curr->right;\n            } else {\n                TreeNode* prev = curr->left;\n                while (prev->right != nullptr && prev->right != curr) {\n                    prev = prev->right;\n                }\n                if (prev->right == nullptr) {\n                    prev->right = curr; // establish temporary thread\n                    curr = curr->left;\n                } else {\n                    prev->right = nullptr; // remove thread\n                    inorder.push_back(curr->val);\n                    curr = curr->right;\n                }\n            }\n        }\n        return inorder;\n    }\n};\n\nint main() {\n    vector<int> pre = {3, 9, 20, 15, 7};\n    vector<int> in = {9, 3, 15, 20, 7};\n    HardTreeSolutions sol;\n    TreeNode* root = sol.buildTree(pre, in);\n    vector<int> morris = sol.morrisInorder(root);\n    cout << \"Morris Inorder: \";\n    for (int v : morris) cout << v << \" \";\n    cout << endl;\n    return 0;\n}\n",
    "pythonSnippet": "from typing import Optional, List, Dict\n\nclass TreeNode:\n    def __init__(self, val: int = 0, left: Optional['TreeNode'] = None, right: Optional['TreeNode'] = None):\n        self.val = val\n        self.left = left\n        self.right = right\n\nclass HardTreeSolutions:\n    def build_tree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:\n        \"\"\"Reconstructs unique binary tree from preorder and inorder sequences.\"\"\"\n        in_map = {val: idx for idx, val in enumerate(inorder)}\n\n        def helper(pre_start: int, pre_end: int, in_start: int, in_end: int) -> Optional[TreeNode]:\n            if pre_start > pre_end or in_start > in_end:\n                return None\n            root_val = preorder[pre_start]\n            root = TreeNode(root_val)\n            in_root = in_map[root_val]\n            nums_left = in_root - in_start\n\n            root.left = helper(pre_start + 1, pre_start + nums_left, in_start, in_root - 1)\n            root.right = helper(pre_start + nums_left + 1, pre_end, in_root + 1, in_end)\n            return root\n\n        return helper(0, len(preorder) - 1, 0, len(inorder) - 1)\n\n    def morris_inorder(self, root: Optional[TreeNode]) -> List[int]:\n        \"\"\"Morris Inorder Traversal achieving true O(1) auxiliary space.\"\"\"\n        inorder = []\n        curr = root\n\n        while curr:\n            if not curr.left:\n                inorder.append(curr.val)\n                curr = curr.right\n            else:\n                prev = curr.left\n                while prev.right and prev.right != curr:\n                    prev = prev.right\n                if not prev.right:\n                    prev.right = curr  # thread\n                    curr = curr.left\n                else:\n                    prev.right = None  # remove thread\n                    inorder.append(curr.val)\n                    curr = curr.right\n        return inorder\n\nif __name__ == \"__main__\":\n    sol = HardTreeSolutions()\n    root = sol.build_tree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])\n    print(\"Morris Inorder:\", sol.morris_inorder(root))\n",
    "pitfalls": [
      "Forgetting to remove threads in Morris traversal, which permanently corrupts the tree structure by introducing cycles.",
      "Linear search for inorder root index in Tree Construction: Always use a hash map `inMap` to achieve O(1) lookups; otherwise time complexity degrades to O(N^2).",
      "Missing the parent edge when expanding outward in Distance K / Burning Tree problems."
    ],
    "topProblems": [
      "Explain that Morris Traversal is preferred in embedded systems or ultra-constrained environments where stack overflow is prohibited.",
      "Show that for Distance K, using a `visited` set is mandatory because the parent pointer creates bidirectional cycles between child and parent nodes."
    ]
  },
  "14.1": {
    "subStepId": "14.1",
    "stepId": "step-14",
    "stepNumber": 14,
    "title": "Binary Search Tree (BST) Concepts: Search, Ceil, Floor, Insert & Delete",
    "overview": "A Binary Search Tree (BST) enforces the ordering invariant: for every node X, all values in X's left subtree are strictly smaller than X.val, and all values in X's right subtree are strictly greater than X.val. This invariant guarantees that BST Inorder traversal is strictly sorted and enables O(H) search, insertion, and deletion.",
    "coreIntuition": "BST Inorder Property: The inorder traversal of any valid BST is ALWAYS strictly sorted in non-decreasing order.",
    "recurrenceOrFormula": "\n       BST Invariant & Operations:\n                   8\n                 /   \\\n                3     10\n               / \\      \\\n              1   6      14\n                 / \\    /\n                4   7  13\n\n      • Inorder Traversal: 1, 3, 4, 6, 7, 8, 10, 13, 14 (Strictly Ascending!)\n      • Ceil of 5:  Smallest value >= 5 -> 6 (move left after recording candidate)\n      • Floor of 5: Largest value <= 5  -> 4 (move right after recording candidate)\n      • Delete Node with 2 children (e.g. 3):\n        Replace 3 with Inorder Successor (4) or Predecessor (1), then delete successor.\n    ",
    "keyTechnique": "Search in BST: Compare target with `node->val`. If equal, found. If target < `node->val`, go left. If target > `node->val`, go right. Time complexity is O(H).",
    "timeComplexity": "O(H) for search, ceil, floor, insert, and delete, where H is tree height (O(log N) balanced, O(N) worst-case skewed).",
    "spaceComplexity": "O(1) auxiliary space for iterative search/ceil/floor. O(H) recursion stack for recursive delete.",
    "stepsToSolve": [
      "1. Ceil Algorithm: Initialize `ceilVal = -1`. While `root != null`: if `root->val == key` return `key`. If `root->val > key`, update `ceilVal = root->val` and move `root = root->left`. Else move `root = root->right`.",
      "2. Floor Algorithm: Initialize `floorVal = -1`. While `root != null`: if `root->val == key` return `key`. If `root->val < key`, update `floorVal = root->val` and move `root = root->right`. Else move `root = root->left`.",
      "3. Insert into BST: If `root == null`, return new node. Traverse down using BST invariant. When the correct child pointer is null, attach the new node and break.",
      "4. Delete Node in BST: If `root == null` return null. If `key < root->val`, `root->left = delete(root->left, key)`. If `key > root->val`, `root->right = delete(root->right, key)`. If match: if left is null return right; if right is null return left; else find min in right subtree (`succ`), copy `root->val = succ->val`, and `root->right = delete(root->right, succ->val)`."
    ],
    "cppSnippet": "#include <iostream>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nclass BSTCore {\npublic:\n    int findCeil(TreeNode* root, int key) {\n        int ceilVal = -1;\n        while (root) {\n            if (root->val == key) return key;\n            if (root->val > key) {\n                ceilVal = root->val;\n                root = root->left;\n            } else {\n                root = root->right;\n            }\n        }\n        return ceilVal;\n    }\n\n    int findFloor(TreeNode* root, int key) {\n        int floorVal = -1;\n        while (root) {\n            if (root->val == key) return key;\n            if (root->val < key) {\n                floorVal = root->val;\n                root = root->right;\n            } else {\n                root = root->left;\n            }\n        }\n        return floorVal;\n    }\n\n    TreeNode* deleteNode(TreeNode* root, int key) {\n        if (!root) return nullptr;\n        if (key < root->val) {\n            root->left = deleteNode(root->left, key);\n        } else if (key > root->val) {\n            root->right = deleteNode(root->right, key);\n        } else {\n            if (!root->left) {\n                TreeNode* temp = root->right;\n                delete root;\n                return temp;\n            } else if (!root->right) {\n                TreeNode* temp = root->left;\n                delete root;\n                return temp;\n            }\n            // Two children: find inorder successor\n            TreeNode* succ = root->right;\n            while (succ->left) succ = succ->left;\n            root->val = succ->val;\n            root->right = deleteNode(root->right, succ->val);\n        }\n        return root;\n    }\n};\n\nint main() {\n    TreeNode* root = new TreeNode(8);\n    root->left = new TreeNode(3);\n    root->right = new TreeNode(10);\n    root->left->left = new TreeNode(1);\n    root->left->right = new TreeNode(6);\n\n    BSTCore bst;\n    cout << \"Ceil of 5: \" << bst.findCeil(root, 5) << endl;\n    cout << \"Floor of 5: \" << bst.findFloor(root, 5) << endl;\n    return 0;\n}\n",
    "pythonSnippet": "from typing import Optional\n\nclass TreeNode:\n    def __init__(self, val: int = 0, left: Optional['TreeNode'] = None, right: Optional['TreeNode'] = None):\n        self.val = val\n        self.left = left\n        self.right = right\n\nclass BSTCore:\n    def find_ceil(self, root: Optional[TreeNode], key: int) -> int:\n        \"\"\"Finds minimum value in BST >= key in O(H).\"\"\"\n        ceil_val = -1\n        while root:\n            if root.val == key:\n                return key\n            if root.val > key:\n                ceil_val = root.val\n                root = root.left\n            else:\n                root = root.right\n        return ceil_val\n\n    def find_floor(self, root: Optional[TreeNode], key: int) -> int:\n        \"\"\"Finds maximum value in BST <= key in O(H).\"\"\"\n        floor_val = -1\n        while root:\n            if root.val == key:\n                return key\n            if root.val < key:\n                floor_val = root.val\n                root = root.right\n            else:\n                root = root.left\n        return floor_val\n\n    def delete_node(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:\n        \"\"\"Deletes node with key and maintains BST invariant.\"\"\"\n        if not root:\n            return None\n        if key < root.val:\n            root.left = self.delete_node(root.left, key)\n        elif key > root.val:\n            root.right = self.delete_node(root.right, key)\n        else:\n            if not root.left:\n                return root.right\n            if not root.right:\n                return root.left\n            # Node with two children: replace with inorder successor\n            succ = root.right\n            while succ.left:\n                succ = succ.left\n            root.val = succ.val\n            root.right = self.delete_node(root.right, succ.val)\n        return root\n\nif __name__ == \"__main__\":\n    root = TreeNode(8, TreeNode(3, TreeNode(1), TreeNode(6)), TreeNode(10))\n    bst = BSTCore()\n    print(\"Ceil of 5:\", bst.find_ceil(root, 5))\n    print(\"Floor of 5:\", bst.find_floor(root, 5))\n",
    "pitfalls": [
      "In Ceil/Floor, moving in the wrong direction after recording a candidate: When searching for Ceil, if `root->val > key`, go LEFT to look for a smaller qualifying value.",
      "Memory leak in C++ when deleting nodes: Ensure `delete node` is properly invoked.",
      "Assuming balanced O(log N) performance for simple BST: If values are inserted in sorted order, BST degenerates into a linked list with O(N) operations (use AVL or Red-Black trees to balance)."
    ],
    "topProblems": [
      "Highlight the difference between Inorder Predecessor (max of left subtree) and Inorder Successor (min of right subtree). Both are valid replacements when deleting a two-child node.",
      "Mention that all basic operations can be implemented iteratively with O(1) space."
    ]
  },
  "14.2": {
    "subStepId": "14.2",
    "stepId": "step-14",
    "stepNumber": 14,
    "title": "Practice BST Problems: Validate BST, Kth Smallest, BST Iterator & Recover BST",
    "overview": "Master advanced BST interview questions by exploiting sorted inorder traversal properties. Validate BST using valid range intervals `(minVal, maxVal)`, find Kth smallest/largest in O(K) time, build an O(H) space BST Iterator, and recover a swapped BST using 2-pointer violation detection.",
    "coreIntuition": "Range Validation for BST: Checking `root->left->val < root->val` is insufficient because an entire subtree must satisfy the ancestor constraints. Maintain valid range `(minVal, maxVal)` passed down recursively.",
    "recurrenceOrFormula": "\n      1. Validate BST Range Checking:\n                10 (range: -INF to +INF)\n               /  \\\n     (-INF, 10) 5   15 (10, +INF)\n                   /  \\\n           (10, 15) 6   20 (15, +INF) -> 6 is INVALID! (6 not > 10)\n\n      2. Recover BST with Two Swapped Nodes:\n         Inorder: 1, 3, 2, 5, 4 (Swapped 3 and 2? or 3 and 4?)\n         First violation:  prev->val > curr->val -> first = prev, middle = curr\n         Second violation: prev->val > curr->val -> last = curr\n         If last exists, swap(first, last). Else swap(first, middle).\n    ",
    "keyTechnique": "Kth Smallest / Largest: Inorder traversal visits BST elements in sorted order. Maintain a counter `k`. The Kth element visited is the Kth smallest! For Kth largest, perform reverse inorder (Right -> Root -> Left).",
    "timeComplexity": "O(N) for validation, recovery, and largest BST. O(1) amortized per next() call in BST Iterator.",
    "spaceComplexity": "O(H) auxiliary space for recursion/stack (O(1) with Morris traversal).",
    "stepsToSolve": [
      "1. Validate BST: `isValid(node, minVal, maxVal)`: if `node == null` return true. If `node->val <= minVal || node->val >= maxVal` return false. Return `isValid(node->left, minVal, node->val) && isValid(node->right, node->val, maxVal)`.",
      "2. Kth Smallest Element: Perform inorder traversal. Decrement `k` on visiting each node. When `k == 0`, record `ans = node->val` and return.",
      "3. BST Iterator: On constructor, call `pushAll(root)` (push node and move left). On `next()`: pop node, call `pushAll(node->right)`, return `node->val`. On `hasNext()`: return `!stack.empty()`.",
      "4. Recover BST: Traverse inorder tracking `prev`. If `prev && prev->val > curr->val`: if `first == null`, set `first = prev; middle = curr;` else set `last = curr;`. After traversal: if `last` exists, `swap(first->val, last->val)`, else `swap(first->val, middle->val)`."
    ],
    "cppSnippet": "#include <iostream>\n#include <climits>\n#include <stack>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nclass BSTPractice {\npublic:\n    // Validate Binary Search Tree using 64-bit integer ranges\n    bool isValidBST(TreeNode* root) {\n        return validate(root, LONG_MIN, LONG_MAX);\n    }\n\n    bool validate(TreeNode* node, long long minVal, long long maxVal) {\n        if (!node) return true;\n        if (node->val <= minVal || node->val >= maxVal) return false;\n        return validate(node->left, minVal, node->val) &&\n               validate(node->right, node->val, maxVal);\n    }\n\n    // Kth Smallest Element in a BST\n    int kthSmallest(TreeNode* root, int k) {\n        int result = -1;\n        inorder(root, k, result);\n        return result;\n    }\n\n    void inorder(TreeNode* node, int& k, int& result) {\n        if (!node || k <= 0) return;\n        inorder(node->left, k, result);\n        k--;\n        if (k == 0) {\n            result = node->val;\n            return;\n        }\n        inorder(node->right, k, result);\n    }\n};\n\n// BST Iterator with O(H) Memory\nclass BSTIterator {\nprivate:\n    stack<TreeNode*> st;\n    void pushAll(TreeNode* node) {\n        while (node) {\n            st.push(node);\n            node = node->left;\n        }\n    }\npublic:\n    BSTIterator(TreeNode* root) {\n        pushAll(root);\n    }\n    int next() {\n        TreeNode* top = st.top();\n        st.pop();\n        pushAll(top->right);\n        return top->val;\n    }\n    bool hasNext() {\n        return !st.empty();\n    }\n};\n\nint main() {\n    TreeNode* root = new TreeNode(5);\n    root->left = new TreeNode(3);\n    root->right = new TreeNode(6);\n    root->left->left = new TreeNode(2);\n    root->left->right = new TreeNode(4);\n\n    BSTPractice practice;\n    cout << \"Is Valid BST: \" << (practice.isValidBST(root) ? \"Yes\" : \"No\") << endl;\n    cout << \"2nd Smallest: \" << practice.kthSmallest(root, 2) << endl;\n    return 0;\n}\n",
    "pythonSnippet": "from typing import Optional\nimport math\n\nclass TreeNode:\n    def __init__(self, val: int = 0, left: Optional['TreeNode'] = None, right: Optional['TreeNode'] = None):\n        self.val = val\n        self.left = left\n        self.right = right\n\nclass BSTPractice:\n    def is_valid_bst(self, root: Optional[TreeNode]) -> bool:\n        \"\"\"Validates BST using range constraints in O(N).\"\"\"\n        def validate(node: Optional[TreeNode], low: float, high: float) -> bool:\n            if not node:\n                return True\n            if not (low < node.val < high):\n                return False\n            return validate(node.left, low, node.val) and validate(node.right, node.val, high)\n\n        return validate(root, -math.inf, math.inf)\n\n    def kth_smallest(self, root: Optional[TreeNode], k: int) -> int:\n        \"\"\"Finds kth smallest element via early-exit inorder.\"\"\"\n        result = -1\n\n        def inorder(node: Optional[TreeNode]):\n            nonlocal k, result\n            if not node or k <= 0:\n                return\n            inorder(node.left)\n            k -= 1\n            if k == 0:\n                result = node.val\n                return\n            inorder(node.right)\n\n        inorder(root)\n        return result\n\nclass BSTIterator:\n    \"\"\"O(H) memory lazy iterator for BST inorder.\"\"\"\n    def __init__(self, root: Optional[TreeNode]):\n        self.stack = []\n        self._push_all(root)\n\n    def _push_all(self, node: Optional[TreeNode]):\n        while node:\n            self.stack.append(node)\n            node = node.left\n\n    def next(self) -> int:\n        top = self.stack.pop()\n        self._push_all(top.right)\n        return top.val\n\n    def has_next(self) -> bool:\n        return len(self.stack) > 0\n\nif __name__ == \"__main__\":\n    root = TreeNode(5, TreeNode(3, TreeNode(2), TreeNode(4)), TreeNode(6))\n    practice = BSTPractice()\n    print(\"Is Valid BST:\", practice.is_valid_bst(root))\n    print(\"2nd Smallest:\", practice.kth_smallest(root, 2))\n",
    "pitfalls": [
      "Using 32-bit INT_MIN and INT_MAX in range validation: Tree nodes can have values equal to INT_MIN or INT_MAX, causing false rejections. Use 64-bit `LONG_MIN` / `LONG_MAX` or null pointers.",
      "Traversing the entire tree in Kth smallest: Terminate immediately once `k == 0` to preserve O(H + K) performance.",
      "In BST Iterator, loading all N nodes into an array: The problem specification strictly requires O(H) auxiliary memory."
    ],
    "topProblems": [
      "Explain how BST Iterator amortizes to O(1) time per `next()` operation: each node is pushed and popped exactly once across the full traversal.",
      "For Recover BST, mention that Morris traversal solves it in O(1) auxiliary space without any recursion stack or array allocation."
    ]
  },
  "15.1": {
    "subStepId": "15.1",
    "stepId": "step-15",
    "stepNumber": 15,
    "title": "Learning Graphs: Representations, BFS & DFS Traversals",
    "overview": "A Graph G = (V, E) is a set of vertices (V) connected by edges (E). Graphs can be directed/undirected, weighted/unweighted, and cyclic/acyclic. Understanding optimal adjacency list representations, connected components, and both Breadth-First Search (BFS) and Depth-First Search (DFS) traversals is the cornerstone of graph theory.",
    "coreIntuition": "Adjacency List vs Matrix: Adjacency matrix takes O(V^2) space, which causes Memory Limit Exceeded (MLE) for sparse graphs where V = 10^5. Adjacency list takes O(V + 2E) for undirected graphs and O(V + E) for directed graphs.",
    "recurrenceOrFormula": "\n       Graph Representations & Traversals:\n           1 --- 2        Adjacency List (O(V + 2E) space):\n           |  \\  |        1: [2, 3, 4]\n           |   \\ |        2: [1, 3]\n           4 --- 3        3: [1, 2, 4]\n                          4: [1, 3]\n\n       • BFS Traversal (Queue FIFO): Starts at root, explores neighbors level by level.\n         Queue: [1] -> [2, 3, 4] -> complete\n       • DFS Traversal (Recursion Stack): Plunges deep down each path before backtracking.\n         Path: 1 -> 2 -> 3 -> 4 -> backtrack\n       • Connected Components: Outer loop `for (int i = 1; i <= V; i++) if (!vis[i]) bfs(i);`",
    "keyTechnique": "Connected Components: A graph may consist of multiple disconnected islands. To traverse all nodes, loop through vertices 1 to V and initiate BFS/DFS whenever `!visited[i]`.",
    "timeComplexity": "O(V + 2E) for undirected graph traversals (each vertex visited once, each edge traversed twice).",
    "spaceComplexity": "O(V) for visited array and queue/recursion stack.",
    "stepsToSolve": [
      "1. Graph Adjacency List Construction: For each undirected edge `(u, v)`, append `v` to `adj[u]` and `u` to `adj[v]`.",
      "2. BFS Algorithm: Create `queue<int> q` and `vector<bool> vis(V + 1, false)`. Mark `vis[start] = true` and `q.push(start)`. While `q` is not empty: pop `node`, record it in traversal. For each neighbor `it` in `adj[node]`: if `!vis[it]`, mark `vis[it] = true` and `q.push(it)`.",
      "3. DFS Algorithm: Helper `dfs(node, adj, vis, storeDfs)`: Mark `vis[node] = true` and add `node` to `storeDfs`. For each neighbor `it` in `adj[node]`: if `!vis[it]`, recursively call `dfs(it, adj, vis, storeDfs)`."
    ],
    "cppSnippet": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nclass GraphTraversal {\npublic:\n    // Breadth-First Search (BFS)\n    vector<int> bfsOfGraph(int V, vector<vector<int>>& adj) {\n        vector<int> bfs;\n        vector<bool> vis(V, false);\n        queue<int> q;\n\n        vis[0] = true;\n        q.push(0);\n\n        while (!q.empty()) {\n            int node = q.front();\n            q.pop();\n            bfs.push_back(node);\n\n            for (int neighbor : adj[node]) {\n                if (!vis[neighbor]) {\n                    vis[neighbor] = true;\n                    q.push(neighbor);\n                }\n            }\n        }\n        return bfs;\n    }\n\n    // Depth-First Search (DFS)\n    vector<int> dfsOfGraph(int V, vector<vector<int>>& adj) {\n        vector<int> dfsResult;\n        vector<bool> vis(V, false);\n        dfsHelper(0, adj, vis, dfsResult);\n        return dfsResult;\n    }\n\n    void dfsHelper(int node, vector<vector<int>>& adj, vector<bool>& vis, vector<int>& dfsResult) {\n        vis[node] = true;\n        dfsResult.push_back(node);\n        for (int neighbor : adj[node]) {\n            if (!vis[neighbor]) {\n                dfsHelper(neighbor, adj, vis, dfsResult);\n            }\n        }\n    }\n};\n\nint main() {\n    int V = 5;\n    vector<vector<int>> adj(V);\n    // Undirected graph edges: (0,1), (0,2), (0,3), (2,4)\n    adj[0] = {1, 2, 3};\n    adj[1] = {0};\n    adj[2] = {0, 4};\n    adj[3] = {0};\n    adj[4] = {2};\n\n    GraphTraversal gt;\n    auto bfs = gt.bfsOfGraph(V, adj);\n    cout << \"BFS Traversal: \";\n    for (int node : bfs) cout << node << \" \";\n    cout << endl;\n\n    auto dfs = gt.dfsOfGraph(V, adj);\n    cout << \"DFS Traversal: \";\n    for (int node : dfs) cout << node << \" \";\n    cout << endl;\n    return 0;\n}\n",
    "pythonSnippet": "from typing import List\nimport collections\n\nclass GraphTraversal:\n    def bfs_of_graph(self, V: int, adj: List[List[int]]) -> List[int]:\n        \"\"\"Breadth-First Search starting from vertex 0.\"\"\"\n        bfs = []\n        vis = [False] * V\n        q = collections.deque([0])\n        vis[0] = True\n\n        while q:\n            node = q.popleft()\n            bfs.append(node)\n            for neighbor in adj[node]:\n                if not vis[neighbor]:\n                    vis[neighbor] = True\n                    q.append(neighbor)\n        return bfs\n\n    def dfs_of_graph(self, V: int, adj: List[List[int]]) -> List[int]:\n        \"\"\"Depth-First Search starting from vertex 0.\"\"\"\n        dfs_res = []\n        vis = [False] * V\n\n        def dfs(node: int):\n            vis[node] = True\n            dfs_res.append(node)\n            for neighbor in adj[node]:\n                if not vis[neighbor]:\n                    dfs(neighbor)\n\n        dfs(0)\n        return dfs_res\n\nif __name__ == \"__main__\":\n    V = 5\n    adj = [[1, 2, 3], [0], [0, 4], [0], [2]]\n    gt = GraphTraversal()\n    print(\"BFS Traversal:\", gt.bfs_of_graph(V, adj))\n    print(\"DFS Traversal:\", gt.dfs_of_graph(V, adj))\n",
    "pitfalls": [
      "Marking a node as visited after popping it from the queue instead of at enqueue time: This allows multiple adjacent nodes to enqueue the same vertex, exploding queue memory to exponential size.",
      "Using 1-based indexing when the graph input is 0-based (or vice-versa), leading to array out-of-bounds segfaults.",
      "Forgetting the outer component loop when a graph has disconnected sub-islands."
    ],
    "topProblems": [
      "State the complexity cleanly: Time is O(V + 2E) for undirected and O(V + E) for directed graphs; Space is O(V) for visited array and stack/queue.",
      "Clarify whether edges are 0-indexed or 1-indexed, and check whether there can be self-loops or multi-edges."
    ]
  },
  "15.2": {
    "subStepId": "15.2",
    "stepId": "step-15",
    "stepNumber": 15,
    "title": "Problems on BFS & DFS: Connected Components, Cycles & Bipartite Graphs",
    "overview": "Apply BFS and DFS to solve classic grid and connectivity problems: Counting Provinces, Rotting Oranges multi-source BFS, Flood Fill, Undirected Cycle Detection (tracking parent pointers), and 2-Coloring Bipartite Graph testing.",
    "coreIntuition": "Multi-Source BFS: When multiple origins spread simultaneously (e.g. Rotting Oranges), initialize the queue with ALL sources at time t=0. BFS naturally processes level-by-level in lockstep time.",
    "recurrenceOrFormula": "\n      1. Undirected Cycle Detection (Tracking Parent):\n         1 --- 2\n         |     |      Traverse 1 -> 2 -> 3 -> 1\n         4 --- 3      When at 3, neighbor 1 is VISITED and 1 != parent (2)!\n                      => Cycle Detected!\n\n      2. Bipartite Graph (2-Coloring Check):\n         A graph is bipartite if its vertices can be partitioned into two independent sets\n         such that no two adjacent vertices have the same color.\n         * Observation: Any graph with an ODD-LENGTH CYCLE CANNOT be bipartite!\n    ",
    "keyTechnique": "Cycle in Undirected Graph: If during BFS/DFS traversal you encounter an adjacent node that is ALREADY visited and is NOT the parent of the current node, a cycle exists!",
    "timeComplexity": "O(V + 2E) for graph cycle detection and bipartite check; O(N * M) for grid problems.",
    "spaceComplexity": "O(V) or O(N * M) auxiliary space for visited array/queue.",
    "stepsToSolve": [
      "1. Undirected Cycle Detection (BFS): Queue stores `{node, parent}`. Mark `vis[start] = true`. For each `neighbor` of `node`: if `!vis[neighbor]`, mark visited and push `{neighbor, node}`. Else if `neighbor != parent`, return true (cycle detected).",
      "2. Rotting Oranges (Multi-source BFS): Scan grid. Count `freshOranges`. Enqueue all `(r, c, 0)` where `grid[r][c] == 2`. While queue not empty, pop `(r, c, time)`. Check 4 directions. If neighbor within bounds and `grid[nr][nc] == 1`, set `grid[nr][nc] = 2`, `fresh--`, and push `(nr, nc, time + 1)`. If `fresh == 0` return `maxTime`, else return -1.",
      "3. Bipartite Graph Check: For each unvisited component, color with 0 and run BFS/DFS. If any neighbor shares current node color, return false."
    ],
    "cppSnippet": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nclass BFSDFSProblems {\npublic:\n    // Detect cycle in undirected graph using BFS\n    bool isCycle(int V, vector<vector<int>>& adj) {\n        vector<bool> vis(V, false);\n        for (int i = 0; i < V; i++) {\n            if (!vis[i]) {\n                if (detectCycleBFS(i, adj, vis)) return true;\n            }\n        }\n        return false;\n    }\n\n    bool detectCycleBFS(int src, vector<vector<int>>& adj, vector<bool>& vis) {\n        vis[src] = true;\n        queue<pair<int, int>> q; // {node, parent}\n        q.push({src, -1});\n\n        while (!q.empty()) {\n            auto [node, parent] = q.front();\n            q.pop();\n\n            for (int neighbor : adj[node]) {\n                if (!vis[neighbor]) {\n                    vis[neighbor] = true;\n                    q.push({neighbor, node});\n                } else if (neighbor != parent) {\n                    return true; // Cycle found!\n                }\n            }\n        }\n        return false;\n    }\n\n    // Check if graph is Bipartite using 2-Coloring BFS\n    bool isBipartite(int V, vector<vector<int>>& adj) {\n        vector<int> color(V, -1);\n        for (int i = 0; i < V; i++) {\n            if (color[i] == -1) {\n                if (!colorBFS(i, adj, color)) return false;\n            }\n        }\n        return true;\n    }\n\n    bool colorBFS(int start, vector<vector<int>>& adj, vector<int>& color) {\n        queue<int> q;\n        color[start] = 0;\n        q.push(start);\n\n        while (!q.empty()) {\n            int node = q.front();\n            q.pop();\n\n            for (int neighbor : adj[node]) {\n                if (color[neighbor] == -1) {\n                    color[neighbor] = 1 - color[node];\n                    q.push(neighbor);\n                } else if (color[neighbor] == color[node]) {\n                    return false; // Same color on adjacent vertices\n                }\n            }\n        }\n        return true;\n    }\n};\n\nint main() {\n    int V = 4;\n    vector<vector<int>> adj(V);\n    // Cycle: 0-1-2-3-0\n    adj[0] = {1, 3};\n    adj[1] = {0, 2};\n    adj[2] = {1, 3};\n    adj[3] = {0, 2};\n\n    BFSDFSProblems prob;\n    cout << \"Cycle Exists: \" << (prob.isCycle(V, adj) ? \"Yes\" : \"No\") << endl;\n    cout << \"Is Bipartite: \" << (prob.isBipartite(V, adj) ? \"Yes\" : \"No\") << endl;\n    return 0;\n}\n",
    "pythonSnippet": "from typing import List\nimport collections\n\nclass BFSDFSProblems:\n    def is_cycle_undirected(self, V: int, adj: List[List[int]]) -> bool:\n        \"\"\"Cycle detection in undirected graph using BFS tracking parent.\"\"\"\n        vis = [False] * V\n\n        def bfs(start: int) -> bool:\n            vis[start] = True\n            q = collections.deque([(start, -1)])\n            while q:\n                node, parent = q.popleft()\n                for neighbor in adj[node]:\n                    if not vis[neighbor]:\n                        vis[neighbor] = True\n                        q.append((neighbor, node))\n                    elif neighbor != parent:\n                        return True\n            return False\n\n        for i in range(V):\n            if not vis[i]:\n                if bfs(i):\n                    return True\n        return False\n\n    def is_bipartite(self, V: int, adj: List[List[int]]) -> bool:\n        \"\"\"2-coloring BFS check for bipartite property.\"\"\"\n        color = [-1] * V\n\n        def bfs_color(start: int) -> bool:\n            color[start] = 0\n            q = collections.deque([start])\n            while q:\n                node = q.popleft()\n                for neighbor in adj[node]:\n                    if color[neighbor] == -1:\n                        color[neighbor] = 1 - color[node]\n                        q.append(neighbor)\n                    elif color[neighbor] == color[node]:\n                        return False\n            return True\n\n        for i in range(V):\n            if color[i] == -1:\n                if not bfs_color(i):\n                    return False\n        return True\n\nif __name__ == \"__main__\":\n    V = 4\n    adj = [[1, 3], [0, 2], [1, 3], [0, 2]]\n    prob = BFSDFSProblems()\n    print(\"Cycle Exists:\", prob.is_cycle_undirected(V, adj))\n    print(\"Is Bipartite:\", prob.is_bipartite(V, adj))\n",
    "pitfalls": [
      "In undirected cycle detection, treating the parent node as a cycle: Always verify `neighbor != parent` before asserting a cycle.",
      "In Rotting Oranges, initiating separate BFS runs for each rotten orange instead of multi-source BFS: Single-source BFS computes incorrect overlapping distances and causes TLE.",
      "Assuming bipartite graphs cannot have even cycles: Even-length cycles (length 4, 6, 8) ARE bipartite; only odd-length cycles violate 2-coloring."
    ],
    "topProblems": [
      "Explain the key theorem: A graph is bipartite if and only if it contains no odd-length cycles.",
      "Show that delta arrays `int delRow[] = {-1, 0, 1, 0}; int delCol[] = {0, 1, 0, -1};` keep grid traversals clean and bug-free."
    ]
  },
  "15.3": {
    "subStepId": "15.3",
    "stepId": "step-15",
    "stepNumber": 15,
    "title": "Topo Sort & Problems: Directed Acyclic Graphs (DAGs) & Kahn's Algorithm",
    "overview": "Topological Sort is a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, vertex u appears before vertex v in the ordering. Learn both the DFS stack-based approach and Kahn's BFS In-Degree algorithm to solve Course Schedule I & II, Directed Cycle Detection, and Alien Dictionary.",
    "coreIntuition": "DAG Requirement: Topological sorting exists IF AND ONLY IF the directed graph has NO cycles (it is a DAG).",
    "recurrenceOrFormula": "\n       Topological Sort in DAG:\n           5 ----> 0 <---- 4\n           |               |\n           v               v\n           2 ----> 3 ----> 1\n\n       • Kahn's Algorithm (BFS via In-Degree):\n         1. Compute in-degree: {0: 2, 1: 2, 2: 1, 3: 1, 4: 0, 5: 0}\n         2. Queue initial in-degree 0 nodes: [4, 5]\n         3. Pop node, add to topo result, decrement neighbors' in-degree.\n         4. If neighbor in-degree becomes 0, push to queue.\n         • Topo Order: [4, 5, 2, 0, 3, 1] (or 5, 4, 2, 3, 1, 0)\n         • Directed Cycle Detection: If result count < V, graph has a cycle!\n    ",
    "keyTechnique": "DFS Approach: Use a recursion stack. When all outgoing edges from node `u` are processed (backtracking point), push `u` onto a stack. The final stack popped from top to bottom yields the topological sort.",
    "timeComplexity": "O(V + E) for both DFS and Kahn's BFS topological sort.",
    "spaceComplexity": "O(V) for in-degree array, queue, and topological ordering output.",
    "stepsToSolve": [
      "1. Kahn's In-Degree Calculation: Create `vector<int> inDegree(V, 0)`. For each edge `u -> v`, increment `inDegree[v]++`.",
      "2. Initialize Queue: Push all vertices with `inDegree[i] == 0` into queue `q`.",
      "3. BFS Process: While `q` is not empty: pop `node`, append to `topo`. For each neighbor `it` of `node`: decrement `inDegree[it]--`. If `inDegree[it] == 0`, push `it` to `q`.",
      "4. Validation: If `topo.size() == V`, return `topo`. Otherwise, return empty array (cycle exists).",
      "5. Alien Dictionary: Compare adjacent words in dictionary. Find first differing character `word1[j] != word2[j]`. Add directed edge `word1[j] -> word2[j]`. Run Kahn's algorithm on the character graph."
    ],
    "cppSnippet": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nclass TopoSortAlgorithms {\npublic:\n    // Kahn's Algorithm for Topological Sort (BFS)\n    vector<int> topoSortKahns(int V, vector<vector<int>>& adj) {\n        vector<int> inDegree(V, 0);\n        for (int u = 0; u < V; u++) {\n            for (int v : adj[u]) inDegree[v]++;\n        }\n\n        queue<int> q;\n        for (int i = 0; i < V; i++) {\n            if (inDegree[i] == 0) q.push(i);\n        }\n\n        vector<int> topo;\n        while (!q.empty()) {\n            int node = q.front();\n            q.pop();\n            topo.push_back(node);\n\n            for (int neighbor : adj[node]) {\n                inDegree[neighbor]--;\n                if (inDegree[neighbor] == 0) {\n                    q.push(neighbor);\n                }\n            }\n        }\n\n        // Cycle check: if topo size < V, a directed cycle exists\n        if (topo.size() != V) return {};\n        return topo;\n    }\n\n    // Course Schedule: Can all courses be finished?\n    bool canFinishCourses(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<vector<int>> adj(numCourses);\n        for (const auto& pre : prerequisites) {\n            adj[pre[1]].push_back(pre[0]); // pre[1] -> pre[0]\n        }\n        auto topo = topoSortKahns(numCourses, adj);\n        return topo.size() == numCourses;\n    }\n};\n\nint main() {\n    int V = 6;\n    vector<vector<int>> adj(V);\n    adj[5].push_back(0);\n    adj[5].push_back(2);\n    adj[4].push_back(0);\n    adj[4].push_back(1);\n    adj[2].push_back(3);\n    adj[3].push_back(1);\n\n    TopoSortAlgorithms tsa;\n    auto topo = tsa.topoSortKahns(V, adj);\n    cout << \"Topological Order: \";\n    for (int node : topo) cout << node << \" \";\n    cout << endl;\n    return 0;\n}\n",
    "pythonSnippet": "from typing import List\nimport collections\n\nclass TopoSortAlgorithms:\n    def topo_sort_kahns(self, V: int, adj: List[List[int]]) -> List[int]:\n        \"\"\"Kahn's algorithm using in-degree array and BFS.\"\"\"\n        in_degree = [0] * V\n        for u in range(V):\n            for v in adj[u]:\n                in_degree[v] += 1\n\n        q = collections.deque([i for i in range(V) if in_degree[i] == 0])\n        topo = []\n\n        while q:\n            node = q.popleft()\n            topo.append(node)\n            for neighbor in adj[node]:\n                in_degree[neighbor] -= 1\n                if in_degree[neighbor] == 0:\n                    q.append(neighbor)\n\n        return topo if len(topo) == V else []\n\n    def can_finish_courses(self, num_courses: int, prerequisites: List[List[int]]) -> bool:\n        \"\"\"Determines if course dependency graph is acyclic.\"\"\"\n        adj = [[] for _ in range(num_courses)]\n        for course, pre in prerequisites:\n            adj[pre].append(course)\n        topo = self.topo_sort_kahns(num_courses, adj)\n        return len(topo) == num_courses\n\nif __name__ == \"__main__\":\n    V = 6\n    adj = [[], [], [3], [1], [0, 1], [0, 2]]\n    tsa = TopoSortAlgorithms()\n    print(\"Topological Order:\", tsa.topo_sort_kahns(V, adj))\n",
    "pitfalls": [
      "Applying Topological Sort to an undirected graph or a graph containing cycles without checking `topo.size() == V`.",
      "Reversing the directed edge in Course Schedule: `[a, b]` means course `b` is prerequisite for `a`, so directed edge is `b -> a`.",
      "In Alien Dictionary, missing the prefix violation case: If word1 starts with word2 but word1 is longer (e.g. \"abcd\" before \"ab\"), the dictionary ordering is invalid!"
    ],
    "topProblems": [
      "Always offer Kahn's BFS as the preferred solution in interviews because it naturally detects cycles without requiring a 3-state visited array (`0: unvisited, 1: visiting, 2: visited`).",
      "Mention that topological sorting represents task scheduling order, build dependency graphs (like Make/Gradle), and compiler optimization passes."
    ]
  },
  "15.4": {
    "subStepId": "15.4",
    "stepId": "step-15",
    "stepNumber": 15,
    "title": "Shortest Path Algorithms: Dijkstra, Bellman-Ford & Floyd-Warshall",
    "overview": "Master the complete hierarchy of shortest path algorithms: BFS for unit weights, DAG relaxation in topological order, Dijkstra's Greedy Min-Heap algorithm for non-negative weights, Bellman-Ford Dynamic Programming for negative weights and negative cycle detection, and Floyd-Warshall All-Pairs matrix relaxation.",
    "coreIntuition": "Edge Relaxation Principle: If `dist[u] + weight < dist[v]`, update `dist[v] = dist[u] + weight`. This triangle inequality forms the basis of all shortest path algorithms.",
    "recurrenceOrFormula": "\n       Shortest Path Algorithm Matrix:\n       ┌─────────────────┬───────────────────┬────────────────┬───────────────────────────┐\n       │ Algorithm       │ Weights           │ Time           │ Notes                     │\n       ├─────────────────┼───────────────────┼────────────────┼───────────────────────────┤\n       │ BFS             │ Unit (constant 1) │ O(V + E)       │ Queue FIFO                │\n       │ DAG Relaxation  │ Any (DAG only)    │ O(V + E)       │ Topo sort + 1-pass relax  │\n       │ Dijkstra        │ Non-negative (>=0)│ O(E log V)     │ Min-Heap Priority Queue   │\n       │ Bellman-Ford    │ Negative allowed  │ O(V * E)       │ Relax V-1 times; detects  │\n       │                 │                   │                │ negative cycles!          │\n       │ Floyd-Warshall  │ All-pairs         │ O(V^3)         │ 3 nested loops (via k)    │\n       └─────────────────┴───────────────────┴────────────────┴───────────────────────────┘\n    ",
    "keyTechnique": "Dijkstra's Algorithm: Uses a min-heap `priority_queue<pair<int, int>>` storing `{dist, node}`. Greedily pops the minimum distance node, relaxing its adjacent edges. Fails on negative weights because greedy assumption that popped distance is final is violated.",
    "timeComplexity": "Dijkstra: O(E log V). Bellman-Ford: O(V * E). Floyd-Warshall: O(V^3). BFS on Unit Weights: O(V + E).",
    "spaceComplexity": "O(V) for Dijkstra and Bellman-Ford distance arrays; O(V^2) for Floyd-Warshall distance matrix.",
    "stepsToSolve": [
      "1. Dijkstra's Algorithm: Initialize `dist` array with infinity, `dist[src] = 0`. Push `{0, src}` into min-heap `pq`. While `pq` not empty: pop `{d, u}`. If `d > dist[u]` continue (stale entry). For each `{v, wt}` in `adj[u]`: if `d + wt < dist[v]`, set `dist[v] = d + wt` and push `{dist[v], v}`.",
      "2. Bellman-Ford: Initialize `dist` with infinity, `dist[src] = 0`. Loop `V - 1` times: for each edge `(u, v, wt)`, if `dist[u] != inf && dist[u] + wt < dist[v]`, `dist[v] = dist[u] + wt`. To detect negative cycle: loop edges once more. If any edge can still relax, negative cycle exists.",
      "3. Floyd-Warshall: Initialize matrix with direct edge weights and 0 on diagonal. Loop `k` from 0 to V-1, loop `i` from 0 to V-1, loop `j` from 0 to V-1: `matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j])`."
    ],
    "cppSnippet": "#include <iostream>\n#include <vector>\n#include <queue>\n#include <climits>\nusing namespace std;\n\nclass ShortestPathSolvers {\npublic:\n    // Dijkstra's Algorithm using Min-Heap\n    vector<int> dijkstra(int V, vector<vector<pair<int, int>>>& adj, int src) {\n        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;\n        vector<int> dist(V, 1e9);\n\n        dist[src] = 0;\n        pq.push({0, src}); // {dist, node}\n\n        while (!pq.empty()) {\n            auto [d, u] = pq.top();\n            pq.pop();\n\n            if (d > dist[u]) continue; // Ignore stale heap records\n\n            for (auto& edge : adj[u]) {\n                int v = edge.first;\n                int wt = edge.second;\n\n                if (dist[u] + wt < dist[v]) {\n                    dist[v] = dist[u] + wt;\n                    pq.push({dist[v], v});\n                }\n            }\n        }\n        return dist;\n    }\n\n    // Bellman-Ford Algorithm with Negative Cycle Detection\n    vector<int> bellmanFord(int V, vector<vector<int>>& edges, int src) {\n        vector<int> dist(V, 1e8);\n        dist[src] = 0;\n\n        // Relax V - 1 times\n        for (int i = 0; i < V - 1; i++) {\n            for (auto& edge : edges) {\n                int u = edge[0], v = edge[1], wt = edge[2];\n                if (dist[u] != 1e8 && dist[u] + wt < dist[v]) {\n                    dist[v] = dist[u] + wt;\n                }\n            }\n        }\n\n        // V-th iteration to detect negative cycle\n        for (auto& edge : edges) {\n            int u = edge[0], v = edge[1], wt = edge[2];\n            if (dist[u] != 1e8 && dist[u] + wt < dist[v]) {\n                return {-1}; // Negative cycle detected!\n            }\n        }\n        return dist;\n    }\n};\n\nint main() {\n    int V = 5;\n    vector<vector<pair<int, int>>> adj(V);\n    // 0 -> 1 (wt 2), 0 -> 2 (wt 4), 1 -> 2 (wt 1), 1 -> 3 (wt 7), 2 -> 4 (wt 3)\n    adj[0].push_back({1, 2});\n    adj[0].push_back({2, 4});\n    adj[1].push_back({2, 1});\n    adj[1].push_back({3, 7});\n    adj[2].push_back({4, 3});\n\n    ShortestPathSolvers sp;\n    auto dist = sp.dijkstra(V, adj, 0);\n    cout << \"Dijkstra Distances from 0: \";\n    for (int d : dist) cout << d << \" \";\n    cout << endl;\n    return 0;\n}\n",
    "pythonSnippet": "from typing import List, Tuple\nimport heapq\n\nclass ShortestPathSolvers:\n    def dijkstra(self, V: int, adj: List[List[Tuple[int, int]]], src: int) -> List[int]:\n        \"\"\"Dijkstra's shortest path using binary min-heap.\"\"\"\n        dist = [float('inf')] * V\n        dist[src] = 0\n        pq = [(0, src)] # (dist, node)\n\n        while pq:\n            d, u = heapq.heappop(pq)\n            if d > dist[u]:\n                continue\n\n            for v, wt in adj[u]:\n                if dist[u] + wt < dist[v]:\n                    dist[v] = dist[u] + wt\n                    heapq.heappush(pq, (dist[v], v))\n\n        return dist\n\n    def bellman_ford(self, V: int, edges: List[List[int]], src: int) -> List[int]:\n        \"\"\"Bellman-Ford algorithm with negative cycle detection.\"\"\"\n        dist = [int(1e8)] * V\n        dist[src] = 0\n\n        # Relax V - 1 times\n        for _ in range(V - 1):\n            for u, v, wt in edges:\n                if dist[u] != int(1e8) and dist[u] + wt < dist[v]:\n                    dist[v] = dist[u] + wt\n\n        # Check negative cycle on Vth pass\n        for u, v, wt in edges:\n            if dist[u] != int(1e8) and dist[u] + wt < dist[v]:\n                return [-1]\n\n        return dist\n\nif __name__ == \"__main__\":\n    V = 5\n    adj = [[(1, 2), (2, 4)], [(2, 1), (3, 7)], [(4, 3)], [], []]\n    sp = ShortestPathSolvers()\n    print(\"Dijkstra Distances:\", sp.dijkstra(V, adj, 0))\n",
    "pitfalls": [
      "Applying Dijkstra's algorithm to graphs with negative edge weights: It can enter infinite loops or output incorrect distances.",
      "Forgetting to skip stale records in Dijkstra (`if (d > dist[u]) continue;`), which degrades heap operations from O(E log V) toward O(E log E).",
      "In Floyd-Warshall, ordering loops with `k` as the inner loop: The intermediate node `k` MUST be the OUTSIDE loop for dynamic programming state transition to hold."
    ],
    "topProblems": [
      "Explain why Bellman-Ford takes V - 1 iterations: The shortest simple path cannot exceed V - 1 edges without repeating a vertex (creating a cycle).",
      "For Unit Weight Graphs (e.g., Word Ladder or Shortest Path in Binary Matrix), emphasize that simple BFS achieves optimal O(V + E) without the log factor of Dijkstra."
    ]
  },
  "15.5": {
    "subStepId": "15.5",
    "stepId": "step-15",
    "stepNumber": 15,
    "title": "Minimum Spanning Tree (MST) & Disjoint Set Union (DSU)",
    "overview": "A Minimum Spanning Tree (MST) of a connected, undirected weighted graph is a tree that connects all V vertices using exactly V - 1 edges with the minimal possible total edge weight. Learn Prim's greedy vertex-growing algorithm and Kruskal's greedy edge-sorting algorithm empowered by Disjoint Set Union (DSU) with Path Compression and Union by Rank/Size.",
    "coreIntuition": "Spanning Tree Definition: A subgraph with V vertices and V - 1 edges that contains no cycles. An MST minimizes the sum of edge weights.",
    "recurrenceOrFormula": "\n       Disjoint Set Union (DSU) with Path Compression:\n              0 (rank 2)\n            /   \\\n           1     2       find(3):\n          /               Traverses 3 -> 1 -> 0, then compresses!\n         3                Directly attaches 3 -> 0 for future O(alpha(N)) = O(1)!\n\n       Kruskal's Algorithm:\n       1. Sort all edges ascending by weight: [(1, 2, wt:1), (2, 3, wt:2), ...]\n       2. Loop sorted edges: If find(u) != find(v), union(u, v) and add to MST.\n          Else skip (adding edge would form a cycle).\n    ",
    "keyTechnique": "Prim's Algorithm: Vertex-centric greedy approach. Starts from any node, maintains a min-heap of cut-crossing edges `{wt, node, parent}`, and greedily picks the minimum-weight edge connecting an unvisited vertex.",
    "timeComplexity": "Kruskal: O(E log E + E * alpha(V)). Prim: O(E log V). DSU operations: O(alpha(V)) ~ O(1) amortized.",
    "spaceComplexity": "O(V + E) for edges and DSU parent/rank arrays.",
    "stepsToSolve": [
      "1. DSU Class Implementation: Array `parent[i] = i`, array `rank[i] = 0` (or `size[i] = 1`). `find(u)`: `if (u == parent[u]) return u; return parent[u] = find(parent[u]);`. `unionByRank(u, v)`: find roots `ulp_u = find(u)`, `ulp_v = find(v)`. If same, return. If `rank[ulp_u] < rank[ulp_v]`, `parent[ulp_u] = ulp_v`; else if `rank[ulp_v] < rank[ulp_u]`, `parent[ulp_v] = ulp_u`; else `parent[ulp_v] = ulp_u; rank[ulp_u]++;`.",
      "2. Kruskal's Algorithm: Extract all edges `{wt, u, v}`. Sort edges by `wt`. Initialize `DSU(V)`. Total weight = 0. For each edge: if `dsu.find(u) != dsu.find(v)`, `dsu.union(u, v)`, `mstWeight += wt`.",
      "3. Prim's Algorithm: Min-heap `pq` storing `{wt, node}`. Array `vis(V, false)`. Push `{0, 0}`. While `pq` not empty: pop `{wt, node}`. If `vis[node]` continue. Mark `vis[node] = true`, `mstWeight += wt`. For each neighbor `{adjNode, edgeWt}`: if `!vis[adjNode]`, push `{edgeWt, adjNode}` to `pq`."
    ],
    "cppSnippet": "#include <iostream>\n#include <vector>\n#include <numeric>\n#include <algorithm>\nusing namespace std;\n\n// Disjoint Set Union (DSU) Data Structure\nclass DisjointSet {\npublic:\n    vector<int> parent, rank, size;\n    DisjointSet(int n) {\n        parent.resize(n + 1);\n        iota(parent.begin(), parent.end(), 0);\n        rank.assign(n + 1, 0);\n        size.assign(n + 1, 1);\n    }\n\n    int findUPar(int node) {\n        if (node == parent[node]) return node;\n        return parent[node] = findUPar(parent[node]); // Path Compression\n    }\n\n    bool unionBySize(int u, int v) {\n        int rootU = findUPar(u);\n        int rootV = findUPar(v);\n        if (rootU == rootV) return false; // Already in same set\n\n        if (size[rootU] < size[rootV]) {\n            parent[rootU] = rootV;\n            size[rootV] += size[rootU];\n        } else {\n            parent[rootV] = rootU;\n            size[rootU] += size[rootV];\n        }\n        return true;\n    }\n};\n\nclass MSTSolvers {\npublic:\n    // Kruskal's Minimum Spanning Tree Algorithm\n    int spanningTreeKruskal(int V, vector<vector<int>>& edges) {\n        // edges: {u, v, wt}\n        sort(edges.begin(), edges.end(), [](const vector<int>& a, const vector<int>& b) {\n            return a[2] < b[2];\n        });\n\n        DisjointSet ds(V);\n        int mstWeight = 0;\n        int edgesCount = 0;\n\n        for (const auto& edge : edges) {\n            int u = edge[0], v = edge[1], wt = edge[2];\n            if (ds.unionBySize(u, v)) {\n                mstWeight += wt;\n                edgesCount++;\n                if (edgesCount == V - 1) break;\n            }\n        }\n        return mstWeight;\n    }\n};\n\nint main() {\n    int V = 4;\n    // Edges: {u, v, wt}\n    vector<vector<int>> edges = {\n        {0, 1, 10}, {0, 2, 6}, {0, 3, 5},\n        {1, 3, 15}, {2, 3, 4}\n    };\n\n    MSTSolvers mst;\n    cout << \"Kruskal MST Total Weight: \" << mst.spanningTreeKruskal(V, edges) << endl;\n    return 0;\n}\n",
    "pythonSnippet": "from typing import List\n\nclass DisjointSet:\n    def __init__(self, n: int):\n        self.parent = list(range(n + 1))\n        self.size = [1] * (n + 1)\n\n    def find(self, u: int) -> int:\n        \"\"\"Find with path compression.\"\"\"\n        if self.parent[u] != u:\n            self.parent[u] = self.find(self.parent[u])\n        return self.parent[u]\n\n    def union_by_size(self, u: int, v: int) -> bool:\n        \"\"\"Union by size returning True if distinct sets merged.\"\"\"\n        root_u = self.find(u)\n        root_v = self.find(v)\n        if root_u == root_v:\n            return False\n\n        if self.size[root_u] < self.size[root_v]:\n            self.parent[root_u] = root_v\n            self.size[root_v] += self.size[root_u]\n        else:\n            self.parent[root_v] = root_u\n            self.size[root_u] += self.size[root_v]\n        return True\n\nclass MSTSolvers:\n    def kruskal_mst(self, V: int, edges: List[List[int]]) -> int:\n        \"\"\"Kruskal's MST algorithm sorting edges and merging with DSU.\"\"\"\n        edges.sort(key=lambda x: x[2]) # sort by weight\n        dsu = DisjointSet(V)\n        mst_weight = 0\n        edge_count = 0\n\n        for u, v, wt in edges:\n            if dsu.union_by_size(u, v):\n                mst_weight += wt\n                edge_count += 1\n                if edge_count == V - 1:\n                    break\n        return mst_weight\n\nif __name__ == \"__main__\":\n    V = 4\n    edges = [[0, 1, 10], [0, 2, 6], [0, 3, 5], [1, 3, 15], [2, 3, 4]]\n    sol = MSTSolvers()\n    print(\"Kruskal MST Weight:\", sol.kruskal_mst(V, edges))\n",
    "pitfalls": [
      "In Prim's algorithm, marking visited when pushing to heap instead of when popping: The heap can contain multiple paths to the same node; marking early prevents finding cheaper edges.",
      "Forgetting path compression in DSU `find()`: Without path compression, trees can skew into chains, degrading time from O(alpha(N)) to O(N).",
      "Forgetting that Kruskal's edge list must be sorted by weight before performing unions."
    ],
    "topProblems": [
      "Contrast Prim vs Kruskal: Prim is faster for dense graphs (E ~ V^2) when implemented with Fibonacci heaps or dense adjacency matrix; Kruskal is simpler and faster for sparse graphs (E ~ V).",
      "Mention that DSU is also widely used in dynamic connectivity, Accounts Merge, Making a Large Island, and Kruskal's MST."
    ]
  },
  "15.6": {
    "subStepId": "15.6",
    "stepId": "step-15",
    "stepNumber": 15,
    "title": "Other Graph Algorithms: Bridges, Articulation Points & Kosaraju's SCC",
    "overview": "Learn the crown jewels of graph algorithms: Bridges in Graph (Critical Connections via Tarjan's Low-Link discovery times), Articulation Points (cut vertices whose removal disconnects the graph), and Kosaraju's 3-step algorithm for identifying Strongly Connected Components (SCCs) in directed graphs.",
    "coreIntuition": "Time of Insertion (`tin`) and Lowest Time (`low`): `tin[node]` is the step counter at which `node` was first discovered in DFS. `low[node]` is the lowest `tin` reachable from `node` taking at most one back-edge.",
    "recurrenceOrFormula": "\n       1. Bridge in Graph (Tarjan's Low-Link Value):\n          Edge (u, v) is a bridge if: low[v] > tin[u]\n          Meaning: The lowest insertion time node reachable from v has insertion time > tin[u].\n          Therefore, there is NO BACK-EDGE from v's subtree to u or any ancestor of u!\n\n       2. Strongly Connected Components (Kosaraju's Algorithm):\n          Step 1: Sort nodes by finishing time (DFS + push to stack).\n          Step 2: Transpose the graph (reverse all directed edges).\n          Step 3: Pop stack and run DFS on reversed graph. Each DFS traversal = 1 SCC!\n    ",
    "keyTechnique": "Bridge Condition: An undirected edge `(u, v)` is a bridge iff `low[v] > tin[u]`. If `low[v] <= tin[u]`, there exists an alternative back-edge connecting `v` to `u` or an ancestor of `u`, so removing `(u, v)` does not disconnect the graph.",
    "timeComplexity": "O(V + 2E) for Tarjan's Bridge & Articulation Point algorithms. O(V + E) for Kosaraju's 3-step SCC algorithm.",
    "spaceComplexity": "O(V) for tin, low, visited, and stack structures.",
    "stepsToSolve": [
      "1. Tarjan's Bridge Detection: Helper `dfs(node, parent, tin, low, vis, bridges, timer)`: Mark `vis[node] = true`, set `tin[node] = low[node] = timer++`. For each neighbor `it`: if `it == parent` continue. If `!vis[it]`: recurse `dfs(it, node)`. `low[node] = min(low[node], low[it])`. If `low[it] > tin[node]`, record `{node, it}` as a bridge! Else (`it` visited): `low[node] = min(low[node], tin[it])`.",
      "2. Kosaraju's Algorithm for SCCs: Step 1: Run DFS on all components, pushing nodes to `stack` as they finish. Step 2: Invert all edges: for every `u -> v`, create `v -> u` in `adjT`. Step 3: Reset `vis` array. While `stack` not empty: pop `node`. If `!vis[node]`, run DFS on `adjT` to collect the entire SCC."
    ],
    "cppSnippet": "#include <iostream>\n#include <vector>\n#include <stack>\n#include <algorithm>\nusing namespace std;\n\nclass AdvancedGraphAlgorithms {\nprivate:\n    int timer = 1;\n    void dfsBridge(int node, int parent, vector<vector<int>>& adj,\n                   vector<int>& tin, vector<int>& low, vector<bool>& vis,\n                   vector<vector<int>>& bridges) {\n        vis[node] = true;\n        tin[node] = low[node] = timer++;\n\n        for (int neighbor : adj[node]) {\n            if (neighbor == parent) continue;\n            if (!vis[neighbor]) {\n                dfsBridge(neighbor, node, adj, tin, low, vis, bridges);\n                low[node] = min(low[node], low[neighbor]);\n                // Bridge Condition\n                if (low[neighbor] > tin[node]) {\n                    bridges.push_back({node, neighbor});\n                }\n            } else {\n                // Back-edge\n                low[node] = min(low[node], tin[neighbor]);\n            }\n        }\n    }\n\npublic:\n    // Tarjan's Critical Connections (Bridges)\n    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {\n        vector<vector<int>> adj(n);\n        for (const auto& edge : connections) {\n            adj[edge[0]].push_back(edge[1]);\n            adj[edge[1]].push_back(edge[0]);\n        }\n\n        vector<int> tin(n, 0), low(n, 0);\n        vector<bool> vis(n, false);\n        vector<vector<int>> bridges;\n\n        for (int i = 0; i < n; i++) {\n            if (!vis[i]) dfsBridge(i, -1, adj, tin, low, vis, bridges);\n        }\n        return bridges;\n    }\n\n    // Kosaraju's Strongly Connected Components\n    int kosarajuSCC(int V, vector<vector<int>>& adj) {\n        stack<int> st;\n        vector<bool> vis(V, false);\n\n        // Step 1: Push by finishing times\n        for (int i = 0; i < V; i++) {\n            if (!vis[i]) dfsFinish(i, adj, vis, st);\n        }\n\n        // Step 2: Reverse graph\n        vector<vector<int>> adjT(V);\n        for (int u = 0; u < V; u++) {\n            for (int v : adj[u]) adjT[v].push_back(u);\n        }\n\n        // Step 3: DFS on reversed graph\n        fill(vis.begin(), vis.end(), false);\n        int sccCount = 0;\n        while (!st.empty()) {\n            int node = st.top();\n            st.pop();\n            if (!vis[node]) {\n                sccCount++;\n                dfsCollect(node, adjT, vis);\n            }\n        }\n        return sccCount;\n    }\n\n    void dfsFinish(int node, vector<vector<int>>& adj, vector<bool>& vis, stack<int>& st) {\n        vis[node] = true;\n        for (int neighbor : adj[node]) {\n            if (!vis[neighbor]) dfsFinish(neighbor, adj, vis, st);\n        }\n        st.push(node);\n    }\n\n    void dfsCollect(int node, vector<vector<int>>& adjT, vector<bool>& vis) {\n        vis[node] = true;\n        for (int neighbor : adjT[node]) {\n            if (!vis[neighbor]) dfsCollect(neighbor, adjT, vis);\n        }\n    }\n};\n\nint main() {\n    AdvancedGraphAlgorithms adv;\n    vector<vector<int>> connections = {{0, 1}, {1, 2}, {2, 0}, {1, 3}};\n    auto bridges = adv.criticalConnections(4, connections);\n    cout << \"Critical Connections (Bridges): \";\n    for (const auto& b : bridges) cout << \"[\" << b[0] << \"-\" << b[1] << \"] \";\n    cout << endl;\n    return 0;\n}\n",
    "pythonSnippet": "from typing import List\n\nclass AdvancedGraphAlgorithms:\n    def critical_connections(self, n: int, connections: List[List[int]]) -> List[List[int]]:\n        \"\"\"Tarjan's algorithm to find all critical bridges in O(V + E).\"\"\"\n        adj = [[] for _ in range(n)]\n        for u, v in connections:\n            adj[u].append(v)\n            adj[v].append(u)\n\n        tin = [0] * n\n        low = [0] * n\n        vis = [False] * n\n        bridges = []\n        timer = 1\n\n        def dfs(node: int, parent: int):\n            nonlocal timer\n            vis[node] = True\n            tin[node] = low[node] = timer\n            timer += 1\n\n            for neighbor in adj[node]:\n                if neighbor == parent:\n                    continue\n                if not vis[neighbor]:\n                    dfs(neighbor, node)\n                    low[node] = min(low[node], low[neighbor])\n                    if low[neighbor] > tin[node]:\n                        bridges.append([node, neighbor])\n                else:\n                    low[node] = min(low[node], tin[neighbor])\n\n        for i in range(n):\n            if not vis[i]:\n                dfs(i, -1)\n        return bridges\n\n    def kosaraju_scc(self, V: int, adj: List[List[int]]) -> int:\n        \"\"\"Kosaraju's 3-step algorithm for counting strongly connected components.\"\"\"\n        stack = []\n        vis = [False] * V\n\n        def dfs_finish(node: int):\n            vis[node] = True\n            for neighbor in adj[node]:\n                if not vis[neighbor]:\n                    dfs_finish(neighbor)\n            stack.append(node)\n\n        for i in range(V):\n            if not vis[i]:\n                dfs_finish(i)\n\n        # Transpose graph\n        adj_t = [[] for _ in range(V)]\n        for u in range(V):\n            for v in adj[u]:\n                adj_t[v].append(u)\n\n        vis = [False] * V\n        scc_count = 0\n\n        def dfs_collect(node: int):\n            vis[node] = True\n            for neighbor in adj_t[node]:\n                if not vis[neighbor]:\n                    dfs_collect(neighbor)\n\n        while stack:\n            node = stack.pop()\n            if not vis[node]:\n                scc_count += 1\n                dfs_collect(node)\n\n        return scc_count\n\nif __name__ == \"__main__\":\n    adv = AdvancedGraphAlgorithms()\n    print(\"Bridges:\", adv.critical_connections(4, [[0, 1], [1, 2], [2, 0], [1, 3]]))\n",
    "pitfalls": [
      "In Tarjan's Bridge algorithm, updating `low[node] = min(low[node], low[it])` for already visited back-edges instead of `tin[it]`: A back-edge can only reach an ancestor's discovery time, not its transitive low value.",
      "In Articulation Points, forgetting the root special condition: The root of the DFS tree is an articulation point iff it has >= 2 children in the DFS tree.",
      "In Kosaraju, running DFS on the original graph in Step 3 instead of the transposed/reversed graph."
    ],
    "topProblems": [
      "Explain the difference between bridge condition `low[v] > tin[u]` and articulation point condition `low[v] >= tin[u]`. Equal means a back-edge reaches `u`, which saves `(u, v)` from being a bridge but leaves `u` as an articulation point.",
      "Tarjan's Bridge detection is LeetCode #1192 (\"Critical Connections in a Network\") and is frequently asked by Meta and Google."
    ]
  },
  "16.1": {
    "subStepId": "16.1",
    "stepId": "step-16",
    "stepNumber": 16,
    "title": "16.1: Introduction to Dynamic Programming",
    "overview": "Dynamic Programming is an optimization technique over plain recursion. Whenever a problem exhibits Overlapping Subproblems and Optimal Substructure, we cache past results to eliminate duplicate calculations.",
    "coreIntuition": "Those who cannot remember the past are condemned to repeat it. If you draw the recursion tree for Fibonacci, f(n-1) and f(n-2) repeatedly recompute f(n-3), f(n-4). By storing answers in a table (DP), we turn exponential O(2^N) time into linear O(N) time.",
    "recurrenceOrFormula": "Memoization: Top-Down (Recursive + Table) | Tabulation: Bottom-Up (Iterative Loop) | Space Optimization: Keep only required previous states",
    "keyTechnique": "3-Step Transition: Recursion ➔ Memoization (Cache) ➔ Tabulation ➔ Space Optimization",
    "timeComplexity": "O(N) for 1D states, O(N * M) for 2D states",
    "spaceComplexity": "O(1) auxiliary (space optimized) or O(N) table",
    "stepsToSolve": [
      "Step 1 (Represent State): Define dp[i] clearly in terms of what subproblem it solves.",
      "Step 2 (Identify Recurrence): Relate the answer for state i to answers of smaller subproblems (e.g. i-1, i-2).",
      "Step 3 (Base Cases): Identify boundary conditions that cannot be broken down further.",
      "Step 4 (Iterate Bottom-Up): Fill the DP table iteratively from base cases up to the target state.",
      "Step 5 (Space Optimize): If state i only depends on the previous 1 or 2 rows/elements, replace the array with variables."
    ],
    "cppSnippet": "// Fibonacci Space-Optimized Tabulation O(N) time, O(1) space\n#include <iostream>\nusing namespace std;\n\nint fibonacci(int n) {\n    if (n <= 1) return n;\n    int prev2 = 0, prev = 1;\n    for (int i = 2; i <= n; i++) {\n        int cur = prev + prev2;\n        prev2 = prev;\n        prev = cur;\n    }\n    return prev;\n}\n\nint main() {\n    cout << \"Fib(10) = \" << fibonacci(10) << endl; // 55\n    return 0;\n}",
    "pythonSnippet": "# Fibonacci Space-Optimized Tabulation O(N) time, O(1) space\ndef fibonacci(n: int) -> int:\n    if n <= 1:\n        return n\n    prev2, prev = 0, 1\n    for _ in range(2, n + 1):\n        cur = prev + prev2\n        prev2, prev = prev, cur\n    return prev\n\nif __name__ == \"__main__\":\n    print(f\"Fib(10) = {fibonacci(10)}\") # 55",
    "pitfalls": [
      "Confusing 0-indexed vs 1-indexed DP array sizes (causes out-of-bounds segfaults).",
      "Forgetting to initialize base cases in tabulation.",
      "Passing large DP tables by value in recursion instead of by reference (causes O(N) copy overhead)."
    ],
    "topProblems": [
      "Fibonacci Number",
      "Climbing Stairs",
      "Min Cost Climbing Stairs"
    ]
  },
  "16.2": {
    "subStepId": "16.2",
    "stepId": "step-16",
    "stepNumber": 16,
    "title": "16.2: 1D Dynamic Programming",
    "overview": "1D DP covers problems where the state is represented by a single dimension or index (e.g., reaching step i, jumping to stone i, or robbing houses up to i).",
    "coreIntuition": "At any index i, you evaluate the discrete choices available. For Climbing Stairs: you either arrive from step (i-1) taking 1 step, or step (i-2) taking 2 steps. For House Robber: you either rob house i (so you cannot rob i-1, gaining nums[i] + dp[i-2]), or skip house i (retaining dp[i-1]).",
    "recurrenceOrFormula": "Climbing Stairs: dp[i] = dp[i-1] + dp[i-2]\nFrog Jump: dp[i] = min(dp[i-1] + |h[i]-h[i-1]|, dp[i-2] + |h[i]-h[i-2]|)\nHouse Robber: dp[i] = max(dp[i-1], nums[i] + dp[i-2])\nHouse Robber II (Circle): max(rob(nums[0..n-2]), rob(nums[1..n-1]))",
    "keyTechnique": "Constant Space Optimization: Notice dp[i] only looks back 2 steps. Store in prev and prev2, reducing space from O(N) to O(1).",
    "timeComplexity": "O(N) single linear scan",
    "spaceComplexity": "O(1) auxiliary space (using two variables)",
    "stepsToSolve": [
      "1. Express problem in terms of index i.",
      "2. Do all possible choices on that index i.",
      "3. If question asks for Count Ways: Sum up choices (way1 + way2).",
      "4. If question asks for Min/Max: Take min() or max() across all valid transitions.",
      "5. Optimize space by observing that only the last 2 states are required."
    ],
    "cppSnippet": "// House Robber Space Optimized O(N) time, O(1) space\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rob(vector<int>& nums) {\n        int n = nums.size();\n        if (n == 0) return 0;\n        if (n == 1) return nums[0];\n\n        int prev2 = 0;\n        int prev = nums[0];\n\n        for (int i = 1; i < n; i++) {\n            int pick = nums[i] + prev2;\n            int notPick = prev;\n            int cur = max(pick, notPick);\n            prev2 = prev;\n            prev = cur;\n        }\n        return prev;\n    }\n};\n\nint main() {\n    Solution s;\n    vector<int> houses = {2, 7, 9, 3, 1};\n    cout << \"Max Robbery: \" << s.rob(houses) << endl; // 12\n    return 0;\n}",
    "pythonSnippet": "# House Robber Space Optimized O(N) time, O(1) space\nfrom typing import List\n\nclass Solution:\n    def rob(self, nums: List[int]) -> int:\n        if not nums:\n            return 0\n        if len(nums) == 1:\n            return nums[0]\n\n        prev2 = 0\n        prev = nums[0]\n\n        for i in range(1, len(nums)):\n            pick = nums[i] + prev2\n            not_pick = prev\n            cur = max(pick, not_pick)\n            prev2 = prev\n            prev = cur\n\n        return prev\n\nif __name__ == \"__main__\":\n    sol = Solution()\n    houses = [2, 7, 9, 3, 1]\n    print(f\"Max Robbery: {sol.rob(houses)}\") # 12",
    "pitfalls": [
      "In House Robber II (circular houses), forgetting that house 0 and house n-1 cannot both be robbed. Must run standard robber twice: on nums[0..n-2] and on nums[1..n-1].",
      "In Frog Jump with K Distances, inner loop must check that (i - j >= 0) to avoid negative indexing."
    ],
    "topProblems": [
      "Climbing Stairs (LeetCode #70)",
      "Frog Jump (GeeksforGeeks)",
      "Frog Jump with K Distances",
      "Maximum Sum of Non-Adjacent Elements (LeetCode #198)",
      "House Robber II (LeetCode #213)"
    ]
  },
  "16.3": {
    "subStepId": "16.3",
    "stepId": "step-16",
    "stepNumber": 16,
    "title": "16.3: 2D/3D Grid Dynamic Programming",
    "overview": "Grid DP models moving through matrices, 2D planes, or multi-agent states (e.g. Cherry Pickup 3D DP). Each cell (i, j) depends on its neighbors.",
    "coreIntuition": "To reach (i, j) in a grid allowing only Down and Right moves, you must have arrived either from top (i-1, j) or from left (i, j-1). Therefore, all paths to (i, j) is the sum dp[i-1][j] + dp[i][j-1].",
    "recurrenceOrFormula": "Unique Paths: dp[i][j] = dp[i-1][j] + dp[i][j-1]\nMin Path Sum: dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])\nTriangle: dp[i][j] = triangle[i][j] + min(dp[i+1][j], dp[i+1][j+1]) (Solve bottom-up!)\nNinja Training: dp[day][last] = max(points[day][task] + dp[day-1][task]) for task != last",
    "keyTechnique": "Space Optimization from O(M * N) to O(N): Because row i only requires row i-1, maintain a single 1D vector `prev` representing the previous row.",
    "timeComplexity": "O(M * N) for 2D grids, O(N * M * M) for 3D grids",
    "spaceComplexity": "O(N) space optimized (single row vector)",
    "stepsToSolve": [
      "1. Express state as (i, j) representing position in grid.",
      "2. Check boundary conditions: out-of-bounds returns 0 (or infinity for min problems).",
      "3. For obstacles, return 0 as paths cannot traverse blocked cells.",
      "4. Fill table iteratively: row by row, column by column.",
      "5. Space optimize by replacing previous 2D matrix with a 1D `prev` row."
    ],
    "cppSnippet": "// Unique Paths Space Optimized O(M * N) time, O(N) space\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nint uniquePaths(int m, int n) {\n    vector<int> prev(n, 1);\n    for (int i = 1; i < m; i++) {\n        vector<int> cur(n, 1);\n        for (int j = 1; j < n; j++) {\n            cur[j] = cur[j - 1] + prev[j];\n        }\n        prev = cur;\n    }\n    return prev[n - 1];\n}\n\nint main() {\n    cout << \"Unique Paths (3x7): \" << uniquePaths(3, 7) << endl; // 28\n    return 0;\n}",
    "pythonSnippet": "# Unique Paths Space Optimized O(M * N) time, O(N) space\ndef unique_paths(m: int, n: int) -> int:\n    prev = [1] * n\n    for i in range(1, m):\n        cur = [1] * n\n        for j in range(1, n):\n            cur[j] = cur[j - 1] + prev[j]\n        prev = cur\n    return prev[n - 1]\n\nif __name__ == \"__main__\":\n    print(f\"Unique Paths (3x7): {unique_paths(3, 7)}\") # 28",
    "pitfalls": [
      "In Min Path Sum, initializing boundaries with 0 instead of infinity causes incorrect minimum calculations.",
      "In Triangle DP, solving top-down requires handling varying row lengths. Solving bottom-up starting at base is much simpler and eliminates boundary checks."
    ],
    "topProblems": [
      "Ninja’s Training",
      "Grid Unique Paths (LeetCode #62)",
      "Unique Paths II with Obstacles (LeetCode #63)",
      "Minimum Path Sum (LeetCode #64)",
      "Triangle (LeetCode #120)",
      "Minimum Falling Path Sum (LeetCode #931)",
      "Cherry Pickup II (3D DP - LeetCode #1463)"
    ]
  },
  "16.4": {
    "subStepId": "16.4",
    "stepId": "step-16",
    "stepNumber": 16,
    "title": "16.4: DP on Subsequences & Knapsack",
    "overview": "The foundational subset pattern: At index i, you decide whether to \"Take\" or \"Not Take\" the current element towards a target sum or knapsack capacity.",
    "coreIntuition": "If you take nums[i], target decreases to (target - nums[i]). If you do not take nums[i], target remains the same. The choice tree branches into two: f(i-1, target) and f(i-1, target - nums[i]).",
    "recurrenceOrFormula": "0/1 Knapsack: dp[i][W] = max(dp[i-1][W], val[i] + dp[i-1][W - wt[i]])\nSubset Sum: dp[i][target] = dp[i-1][target] || dp[i-1][target - nums[i]]\nCoin Change II (Ways): dp[i][T] = dp[i-1][T] + dp[i][T - coins[i]] (Unbounded)\nPartition Difference: S1 + S2 = Total => S2 - S1 = Diff => Minimize |Total - 2*S1|",
    "keyTechnique": "1D Array Backwards Traversal for 0/1 Knapsack: Because dp[w] depends on previous row’s smaller capacity dp[w - wt[i]], traverse capacity from W down to wt[i] to avoid overwriting values from current row.",
    "timeComplexity": "O(N * Target)",
    "spaceComplexity": "O(Target) space optimized with single 1D vector",
    "stepsToSolve": [
      "1. Express state as f(ind, target).",
      "2. Base Case: If target == 0 return true/1. If ind == 0 return (nums[0] == target).",
      "3. Not Take: f(ind - 1, target).",
      "4. Take: nums[ind] <= target ? f(ind - 1, target - nums[ind]) : false.",
      "5. Combine choices: OR for existence, + for count ways, max/min for optimization."
    ],
    "cppSnippet": "// 0/1 Knapsack Space-Optimized O(N * W) time, O(W) space\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint knapsack(vector<int>& wt, vector<int>& val, int n, int W) {\n    vector<int> prev(W + 1, 0);\n    // Base condition for index 0\n    for (int w = wt[0]; w <= W; w++) prev[w] = val[0];\n\n    for (int i = 1; i < n; i++) {\n        for (int w = W; w >= 0; w--) {\n            int notTake = prev[w];\n            int take = (wt[i] <= w) ? val[i] + prev[w - wt[i]] : 0;\n            prev[w] = max(take, notTake);\n        }\n    }\n    return prev[W];\n}\n\nint main() {\n    vector<int> wt = {1, 2, 4, 5};\n    vector<int> val = {5, 4, 8, 6};\n    cout << \"Max Knapsack Value: \" << knapsack(wt, val, 4, 5) << endl; // 13\n    return 0;\n}",
    "pythonSnippet": "# 0/1 Knapsack Space-Optimized O(N * W) time, O(W) space\nfrom typing import List\n\ndef knapsack(wt: List[int], val: List[int], n: int, W: int) -> int:\n    prev = [0] * (W + 1)\n    for w in range(wt[0], W + 1):\n        prev[w] = val[0]\n\n    for i in range(1, n):\n        for w in range(W, -1, -1):\n            not_take = prev[w]\n            take = val[i] + prev[w - wt[i]] if wt[i] <= w else 0\n            prev[w] = max(take, not_take)\n\n    return prev[W]\n\nif __name__ == \"__main__\":\n    wt = [1, 2, 4, 5]\n    val = [5, 4, 8, 6]\n    print(f\"Max Knapsack Value: {knapsack(wt, val, 4, 5)}\") # 13",
    "pitfalls": [
      "In Unbounded Knapsack / Coin Change, an item can be picked multiple times. Therefore, the \"Take\" transition stays at the same index: f(ind, target - wt[ind]) instead of ind - 1.",
      "Traversing 1D array forwards in 0/1 knapsack turns it into an unbounded knapsack by accident!"
    ],
    "topProblems": [
      "Subset Sum Problem",
      "Partition Equal Subset Sum (LeetCode #416)",
      "Partition Set Into 2 Subsets With Min Absolute Sum Diff (LeetCode #2035)",
      "Count Subsets with Sum K",
      "0/1 Knapsack Problem",
      "Coin Change (Minimum Coins - LeetCode #322)",
      "Target Sum (LeetCode #494)",
      "Coin Change 2 (Ways - LeetCode #518)",
      "Unbounded Knapsack & Rod Cutting Problem"
    ]
  },
  "16.5": {
    "subStepId": "16.5",
    "stepId": "step-16",
    "stepNumber": 16,
    "title": "16.5: DP on Strings (LCS, Edit Distance)",
    "overview": "Dynamic Programming on two string sequences. State (i, j) compares prefixes s1[0..i-1] and s2[0..j-1] to find match, replace, insertion, or deletion transformations.",
    "coreIntuition": "Longest Common Subsequence (LCS) is the mother of all string DP problems. If s1[i-1] == s2[j-1], both characters match: 1 + dp[i-1][j-1]. If they do not match, take the best of skipping character from s1 (dp[i-1][j]) or s2 (dp[i][j-1]).",
    "recurrenceOrFormula": "LCS: dp[i][j] = (s1[i-1] == s2[j-1]) ? 1 + dp[i-1][j-1] : max(dp[i-1][j], dp[i][j-1])\nLongest Palindromic Subsequence: LCS(s, reverse(s))\nMin Insertions to Make Palindrome: len(s) - LPS(s)\nEdit Distance: If match: dp[i-1][j-1]. Else: 1 + min(Insert: dp[i][j-1], Delete: dp[i-1][j], Replace: dp[i-1][j-1])",
    "keyTechnique": "1-Based Indexing with Base Row 0: Shifting indices so row 0 represents an empty string \"\" makes base cases trivial (all 0s for LCS, or index counts for Edit Distance).",
    "timeComplexity": "O(M * N) where M and N are string lengths",
    "spaceComplexity": "O(N) space optimized (using 2 row vectors: prev and cur)",
    "stepsToSolve": [
      "1. Represent state as (i, j) indexing s1 and s2.",
      "2. Base cases: When i == 0 or j == 0, one string is exhausted.",
      "3. If characters match: Advance both pointers diagonally with +1.",
      "4. If characters differ: Explore insert, delete, or replace branches and take optimal.",
      "5. For printing string: Backtrack through the DP matrix starting from (m, n)."
    ],
    "cppSnippet": "// Longest Common Subsequence Space Optimized O(M * N) time, O(N) space\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint longestCommonSubsequence(string s1, string s2) {\n    int m = s1.length(), n = s2.length();\n    vector<int> prev(n + 1, 0), cur(n + 1, 0);\n\n    for (int i = 1; i <= m; i++) {\n        for (int j = 1; j <= n; j++) {\n            if (s1[i - 1] == s2[j - 1]) {\n                cur[j] = 1 + prev[j - 1];\n            } else {\n                cur[j] = max(prev[j], cur[j - 1]);\n            }\n        }\n        prev = cur;\n    }\n    return prev[n];\n}\n\nint main() {\n    cout << \"LCS('abcde', 'ace'): \" << longestCommonSubsequence(\"abcde\", \"ace\") << endl; // 3\n    return 0;\n}",
    "pythonSnippet": "# Longest Common Subsequence Space Optimized O(M * N) time, O(N) space\ndef longest_common_subsequence(s1: str, s2: str) -> int:\n    m, n = len(s1), len(s2)\n    prev = [0] * (n + 1)\n\n    for i in range(1, m + 1):\n        cur = [0] * (n + 1)\n        for j in range(1, n + 1):\n            if s1[i - 1] == s2[j - 1]:\n                cur[j] = 1 + prev[j - 1]\n            else:\n                cur[j] = max(prev[j], cur[j - 1])\n        prev = cur\n\n    return prev[n]\n\nif __name__ == \"__main__\":\n    print(f\"LCS('abcde', 'ace'): {longest_common_subsequence('abcde', 'ace')}\") # 3",
    "pitfalls": [
      "In Edit Distance, forgetting that insertion costs 1 + dp[i][j-1] (we stay at index i because character was inserted to match s2[j-1]).",
      "In Wildcard Matching, \"*\" can match empty string (dp[i-1][j]) OR any sequence (dp[i][j-1])."
    ],
    "topProblems": [
      "Longest Common Subsequence (LeetCode #1143)",
      "Print Longest Common Subsequence",
      "Longest Common Substring",
      "Longest Palindromic Subsequence (LeetCode #516)",
      "Minimum Insertions to Make String Palindrome (LeetCode #1312)",
      "Shortest Common Supersequence (LeetCode #1092)",
      "Distinct Subsequences (LeetCode #115)",
      "Edit Distance (LeetCode #72)",
      "Wildcard Matching (LeetCode #44)"
    ]
  },
  "16.6": {
    "subStepId": "16.6",
    "stepId": "step-16",
    "stepNumber": 16,
    "title": "16.6: DP on Stock Trading",
    "overview": "Stock trading problems optimize profit across day sequences under various constraints (at most 1, 2, K transactions, cooldown periods, or transaction fees).",
    "coreIntuition": "At any day i, you can only be in one of two states: You are looking to BUY (canBuy = 1), or you are looking to SELL (canBuy = 0). When you buy, your balance decreases by -prices[i]. When you sell, your balance increases by +prices[i].",
    "recurrenceOrFormula": "Stock II (Unlimited): If canBuy: max(-prices[i] + f(i+1, 0), f(i+1, 1)). If canSell: max(+prices[i] + f(i+1, 1), f(i+1, 0))\nStock with Cooldown: After selling on day i, next buy must be on day i + 2: +prices[i] + f(i+2, 1)\nStock with Fee: Deduct fee upon completing transaction: +prices[i] - fee + f(i+1, 1)",
    "keyTechnique": "Finite State Machine with 4 Variables: For Stock III (at most 2 transactions), you only have 4 states: Buy1, Sell1, Buy2, Sell2. Can be solved in O(N) time with O(1) space!",
    "timeComplexity": "O(N) for single or unlimited, O(N * K) for K transactions",
    "spaceComplexity": "O(1) auxiliary space (using rolling state variables)",
    "stepsToSolve": [
      "1. Express state as (day, canBuy, transactionsRemaining).",
      "2. If canBuy: Either Buy today (-prices[i] + transition) or Skip today (transition).",
      "3. If canSell: Either Sell today (+prices[i] + transition with cap - 1) or Hold.",
      "4. If cooldown: Jump index to day + 2 upon sell.",
      "5. Space optimize down to 2 or 4 scalar variables."
    ],
    "cppSnippet": "// Best Time to Buy and Sell Stock II O(N) time, O(1) space\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint maxProfit(vector<int>& prices) {\n    int aheadNotBuy = 0, aheadBuy = 0;\n    int curNotBuy, curBuy;\n\n    for (int i = prices.size() - 1; i >= 0; i--) {\n        curBuy = max(-prices[i] + aheadNotBuy, aheadBuy);\n        curNotBuy = max(prices[i] + aheadBuy, aheadNotBuy);\n        aheadBuy = curBuy;\n        aheadNotBuy = curNotBuy;\n    }\n    return aheadBuy;\n}\n\nint main() {\n    vector<int> p = {7, 1, 5, 3, 6, 4};\n    cout << \"Max Profit: \" << maxProfit(p) << endl; // 7\n    return 0;\n}",
    "pythonSnippet": "# Best Time to Buy and Sell Stock II O(N) time, O(1) space\nfrom typing import List\n\ndef max_profit(prices: List[int]) -> int:\n    ahead_not_buy = 0\n    ahead_buy = 0\n\n    for i in range(len(prices) - 1, -1, -1):\n        cur_buy = max(-prices[i] + ahead_not_buy, ahead_buy)\n        cur_not_buy = max(prices[i] + ahead_buy, ahead_not_buy)\n        ahead_buy = cur_buy\n        ahead_not_buy = cur_not_buy\n\n    return ahead_buy\n\nif __name__ == \"__main__\":\n    p = [7, 1, 5, 3, 6, 4]\n    print(f\"Max Profit: {max_profit(p)}\") # 7",
    "pitfalls": [
      "In Stock with Cooldown, accessing day + 2 when day == n-1 causes out-of-bounds array access if base condition is not handled.",
      "Decreasing transaction count twice (must only decrement `cap` once per completed round-trip buy + sell)."
    ],
    "topProblems": [
      "Best Time to Buy and Sell Stock (LeetCode #121)",
      "Best Time to Buy and Sell Stock II (LeetCode #122)",
      "Best Time to Buy and Sell Stock III (LeetCode #123)",
      "Best Time to Buy and Sell Stock IV (LeetCode #188)",
      "Best Time to Buy and Sell Stock with Cooldown (LeetCode #309)",
      "Best Time to Buy and Sell Stock with Transaction Fee (LeetCode #714)"
    ]
  },
  "16.7": {
    "subStepId": "16.7",
    "stepId": "step-16",
    "stepNumber": 16,
    "title": "16.7: DP on Longest Increasing Subsequence (LIS)",
    "overview": "Find the length of the longest strictly increasing subsequence in an array. Solvable via O(N^2) Tabulation or O(N log N) Patience Sorting with Binary Search.",
    "coreIntuition": "For O(N^2) Tabulation: dp[i] represents the length of LIS ending at index i. For every previous j < i with nums[j] < nums[i], we can extend the subsequence: dp[i] = max(dp[i], 1 + dp[j]).\nFor O(N log N) Patience Sorting: Maintain a list `tails`. For each number, binary search for the first element >= x (lower_bound) and replace it, or append if larger than all elements.",
    "recurrenceOrFormula": "Tabulation: dp[i] = 1 + max_{j < i, nums[j] < nums[i]}(dp[j])\nPatience Sort: lower_bound in tails vector: O(N log N)\nLongest Bitonic: max_i(LIS[i] + LDS[i] - 1)",
    "keyTechnique": "Printing the LIS via Backtracking Array: Maintain a `parent[i]` array storing the predecessor index that maximized dp[i]. Backtrack from the index of max(dp) to reconstruct the exact subsequence in reverse.",
    "timeComplexity": "O(N log N) with Binary Search, O(N^2) standard DP",
    "spaceComplexity": "O(N) for DP or tails vector",
    "stepsToSolve": [
      "1. Initialize dp array of size N filled with 1s (every single element is an LIS of length 1).",
      "2. Nested loop: for i from 0 to N-1, for j from 0 to i-1.",
      "3. If nums[j] < nums[i] and 1 + dp[j] > dp[i]: dp[i] = 1 + dp[j], parent[i] = j.",
      "4. For O(N log N): Keep sorted `tails` array. Use binary search (lower_bound) for insertion position."
    ],
    "cppSnippet": "// Longest Increasing Subsequence O(N log N) with Binary Search\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint lengthOfLIS(vector<int>& nums) {\n    vector<int> tails;\n    for (int x : nums) {\n        auto it = lower_bound(tails.begin(), tails.end(), x);\n        if (it == tails.end()) {\n            tails.push_back(x);\n        } else {\n            *it = x;\n        }\n    }\n    return tails.size();\n}\n\nint main() {\n    vector<int> nums = {10, 9, 2, 5, 3, 7, 101, 18};\n    cout << \"LIS Length: \" << lengthOfLIS(nums) << endl; // 4 ([2, 3, 7, 101])\n    return 0;\n}",
    "pythonSnippet": "# Longest Increasing Subsequence O(N log N) with Binary Search\nimport bisect\nfrom typing import List\n\ndef length_of_lis(nums: List[int]) -> int:\n    tails = []\n    for x in nums:\n        idx = bisect.bisect_left(tails, x)\n        if idx == len(tails):\n            tails.append(x)\n        else:\n            tails[idx] = x\n    return len(tails)\n\nif __name__ == \"__main__\":\n    nums = [10, 9, 2, 5, 3, 7, 101, 18]\n    print(f\"LIS Length: {length_of_lis(nums)}\") # 4",
    "pitfalls": [
      "In patience sorting, the `tails` array DOES NOT store the actual LIS elements! It only correctly computes the length of LIS. To print the subsequence, you must use the O(N^2) parent array or patience backpointers.",
      "For strictly increasing, use lower_bound (bisect_left). For non-decreasing, use upper_bound (bisect_right)."
    ],
    "topProblems": [
      "Longest Increasing Subsequence (LeetCode #300)",
      "Printing Longest Increasing Subsequence",
      "Largest Divisible Subset (LeetCode #368)",
      "Longest String Chain (LeetCode #1048)",
      "Longest Bitonic Subsequence",
      "Number of Longest Increasing Subsequence (LeetCode #673)"
    ]
  },
  "16.8": {
    "subStepId": "16.8",
    "stepId": "step-16",
    "stepNumber": 16,
    "title": "16.8: Matrix Chain Multiplication (MCM) / Partition DP",
    "overview": "Partition DP solves problems where a contiguous range [i, j] must be split into sub-segments at an optimal partition point k (i <= k < j) to minimize or maximize a combination metric.",
    "coreIntuition": "When multiplying matrices A1 * A2 * A3 * A4, you can place parentheses in multiple ways. The cost of multiplying chain [i..j] with partition at k is: Cost(i..k) + Cost(k+1..j) + Cost of combining the two resulting matrices (arr[i-1] * arr[k] * arr[j]). Try all k from i to j-1 and take min.",
    "recurrenceOrFormula": "MCM: f(i, j) = min_{i <= k < j} [ f(i, k) + f(k+1, j) + arr[i-1] * arr[k] * arr[j] ]\nBase case: If i == j, cost is 0 (single matrix).\nBurst Balloons: Reverse perspective! Pick which balloon bursts LAST in range [i..j]: nums[i-1] * nums[k] * nums[j+1] + f(i, k-1) + f(k+1, j)",
    "keyTechnique": "Reverse Thinking in Burst Balloons: If you burst a balloon first, its neighbors become adjacent, causing dependent subproblems. If you decide which balloon bursts LAST, the boundaries [i-1] and [j+1] remain fixed throughout the subproblem, ensuring independent subproblems!",
    "timeComplexity": "O(N^3) standard 3-loop range DP",
    "spaceComplexity": "O(N^2) 2D DP matrix",
    "stepsToSolve": [
      "1. Identify range boundaries i and j.",
      "2. Base condition: When i >= j, 0 cuts or multiplications remain.",
      "3. Loop partition point k from i to j-1.",
      "4. Recurse for left partition f(i, k) and right partition f(k+1, j).",
      "5. Add combine cost and minimize over all k."
    ],
    "cppSnippet": "// Matrix Chain Multiplication Tabulation O(N^3) time, O(N^2) space\n#include <iostream>\n#include <vector>\n#include <climits>\n#include <algorithm>\nusing namespace std;\n\nint matrixMultiplication(vector<int>& arr, int n) {\n    vector<vector<int>> dp(n, vector<int>(n, 0));\n\n    // l is length of chain\n    for (int l = 2; l < n; l++) {\n        for (int i = 1; i < n - l + 1; i++) {\n            int j = i + l - 1;\n            dp[i][j] = INT_MAX;\n            for (int k = i; k < j; k++) {\n                int cost = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];\n                dp[i][j] = min(dp[i][j], cost);\n            }\n        }\n    }\n    return dp[1][n - 1];\n}\n\nint main() {\n    vector<int> p = {10, 20, 30, 40, 30};\n    cout << \"Min Multiplications: \" << matrixMultiplication(p, p.size()) << endl; // 30000\n    return 0;\n}",
    "pythonSnippet": "# Matrix Chain Multiplication Tabulation O(N^3) time, O(N^2) space\nimport sys\nfrom typing import List\n\ndef matrix_multiplication(arr: List[int], n: int) -> int:\n    dp = [[0] * n for _ in range(n)]\n\n    for length in range(2, n):\n        for i in range(1, n - length + 1):\n            j = i + length - 1\n            dp[i][j] = sys.maxsize\n            for k in range(i, j):\n                cost = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j]\n                dp[i][j] = min(dp[i][j], cost)\n\n    return dp[1][n - 1]\n\nif __name__ == \"__main__\":\n    p = [10, 20, 30, 40, 30]\n    print(f\"Min Multiplications: {matrix_multiplication(p, len(p))}\") # 30000",
    "pitfalls": [
      "Wrong loop order in tabulation: You must iterate either by chain length (len = 2 to N) or iterate i from N-1 down to 1 and j from i+1 up to N-1.",
      "Forgetting that arr has N elements for N-1 matrices (matrix i has dimensions arr[i-1] x arr[i])."
    ],
    "topProblems": [
      "Matrix Chain Multiplication",
      "Minimum Cost to Cut a Stick (LeetCode #1547)",
      "Burst Balloons (LeetCode #312)",
      "Evaluate Boolean Expression to True",
      "Palindrome Partitioning II (LeetCode #132)",
      "Partition Array for Maximum Sum (LeetCode #1043)"
    ]
  },
  "17.1": {
    "subStepId": "17.1",
    "stepId": "step-17",
    "stepNumber": 17,
    "title": "Theory of Trie: Insert, Search, StartsWith & Trie II Implementation",
    "overview": "A Trie (Prefix Tree) is an efficient tree-like data structure used to store and retrieve keys in a dataset of strings. Unlike binary trees, no node in a trie stores the key itself; instead, its position in the tree defines the associated key. With O(L) search and insert complexity (where L is word length), Tries excel in autocomplete, spell checking, and prefix matching.",
    "coreIntuition": "Trie Node Structure: Each node contains an array of child links `Node* links[26]` (for lowercase English letters) and a boolean `flag` (`isEnd`) indicating the completion of a valid word.",
    "recurrenceOrFormula": "\n       Trie Representation for words: [\"apple\", \"app\", \"apt\", \"bat\"]\n\n                  (root)\n                 /      \\\n               'a'      'b'\n                |        |\n               'p'      'a'\n              /   \\      |\n            'p'   't'*  't'*\n            /\n          'l' (isEnd: false)\n          /\n        'e'* (isEnd: true)\n\n      • insert(\"app\"): traverse a -> p -> p, mark isEnd = true\n      • search(\"app\"): returns true (node exists and isEnd == true)\n      • startsWith(\"ap\"): returns true (node exists even if isEnd == false)\n      • Trie II additions: `countWordsEqualTo` (ew) and `countWordsStartingWith` (cp)\n    ",
    "keyTechnique": "Insertion: For each character in the word, calculate index `ch - 'a'`. If the link is null, instantiate a new Node. Move current pointer to child node. After the final character, set `flag = true`.",
    "timeComplexity": "O(L) for Insert, Search, and StartsWith where L is the length of the query string.",
    "spaceComplexity": "O(N * L * Sigma) where N is number of words, L is average length, and Sigma is alphabet size (26).",
    "stepsToSolve": [
      "1. Define TrieNode: `struct Node { Node* links[26]; bool isEnd = false; int cntPrefix = 0; int cntEndsWith = 0; };`.",
      "2. Insert(word): Set `curr = root`. For each char `c`: `idx = c - 'a'`. If `!curr->links[idx]`, `curr->links[idx] = new Node()`. Move `curr = curr->links[idx]`. Increment `curr->cntPrefix++`. After loop, set `curr->isEnd = true` and `curr->cntEndsWith++`.",
      "3. Search(word): Set `curr = root`. For each char `c`: `idx = c - 'a'`. If `!curr->links[idx]`, return false. Move `curr = curr->links[idx]`. Return `curr->isEnd`.",
      "4. StartsWith(prefix): Same as search, but return true immediately after consuming all characters.",
      "5. Erase(word): Traverse word decrementing `curr->cntPrefix--` at each step. On final node, decrement `curr->cntEndsWith--`."
    ],
    "cppSnippet": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nstruct Node {\n    Node* links[26] = {nullptr};\n    bool flag = false;\n    int cntEndsWith = 0;\n    int cntPrefix = 0;\n\n    bool containsKey(char ch) {\n        return links[ch - 'a'] != nullptr;\n    }\n    void put(char ch, Node* node) {\n        links[ch - 'a'] = node;\n    }\n    Node* get(char ch) {\n        return links[ch - 'a'];\n    }\n};\n\nclass Trie {\nprivate:\n    Node* root;\npublic:\n    Trie() {\n        root = new Node();\n    }\n\n    // Insert word into Trie\n    void insert(string word) {\n        Node* node = root;\n        for (char ch : word) {\n            if (!node->containsKey(ch)) {\n                node->put(ch, new Node());\n            }\n            node = node->get(ch);\n            node->cntPrefix++;\n        }\n        node->flag = true;\n        node->cntEndsWith++;\n    }\n\n    // Exact word search\n    bool search(string word) {\n        Node* node = root;\n        for (char ch : word) {\n            if (!node->containsKey(ch)) return false;\n            node = node->get(ch);\n        }\n        return node->flag;\n    }\n\n    // Prefix search\n    bool startsWith(string prefix) {\n        Node* node = root;\n        for (char ch : prefix) {\n            if (!node->containsKey(ch)) return false;\n            node = node->get(ch);\n        }\n        return true;\n    }\n\n    int countWordsEqualTo(string word) {\n        Node* node = root;\n        for (char ch : word) {\n            if (!node->containsKey(ch)) return 0;\n            node = node->get(ch);\n        }\n        return node->cntEndsWith;\n    }\n};\n\nint main() {\n    Trie trie;\n    trie.insert(\"apple\");\n    trie.insert(\"app\");\n    trie.insert(\"apt\");\n\n    cout << \"Search 'apple': \" << (trie.search(\"apple\") ? \"Found\" : \"Not Found\") << endl;\n    cout << \"Search 'appl': \" << (trie.search(\"appl\") ? \"Found\" : \"Not Found\") << endl;\n    cout << \"StartsWith 'app': \" << (trie.startsWith(\"app\") ? \"Yes\" : \"No\") << endl;\n    cout << \"Count 'apple': \" << trie.countWordsEqualTo(\"apple\") << endl;\n    return 0;\n}\n",
    "pythonSnippet": "class TrieNode:\n    def __init__(self):\n        self.links = {}\n        self.is_end = False\n        self.cnt_ends_with = 0\n        self.cnt_prefix = 0\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def insert(self, word: str) -> None:\n        \"\"\"Inserts word into Trie in O(L).\"\"\"\n        node = self.root\n        for ch in word:\n            if ch not in node.links:\n                node.links[ch] = TrieNode()\n            node = node.links[ch]\n            node.cnt_prefix += 1\n        node.is_end = True\n        node.cnt_ends_with += 1\n\n    def search(self, word: str) -> bool:\n        \"\"\"Exact word match search.\"\"\"\n        node = self.root\n        for ch in word:\n            if ch not in node.links:\n                return False\n            node = node.links[ch]\n        return node.is_end\n\n    def starts_with(self, prefix: str) -> bool:\n        \"\"\"Prefix check search.\"\"\"\n        node = self.root\n        for ch in prefix:\n            if ch not in node.links:\n                return False\n            node = node.links[ch]\n        return True\n\n    def count_words_equal_to(self, word: str) -> int:\n        \"\"\"Count words equal to word.\"\"\"\n        node = self.root\n        for ch in word:\n            if ch not in node.links:\n                return 0\n            node = node.links[ch]\n        return node.cnt_ends_with\n\nif __name__ == \"__main__\":\n    trie = Trie()\n    trie.insert(\"apple\")\n    trie.insert(\"app\")\n    print(\"Search 'apple':\", trie.search(\"apple\"))\n    print(\"Search 'appl':\", trie.search(\"appl\"))\n    print(\"StartsWith 'app':\", trie.starts_with(\"app\"))\n",
    "pitfalls": [
      "Returning true in `search()` when the characters match but `node->isEnd` is false (matching only a prefix, not a complete word).",
      "Forgetting to allocate child nodes with dynamic memory / constructor in C++, causing null pointer dereferences.",
      "In `erase()`, not decrementing prefix counts, which corrupts subsequent `countWordsStartingWith` queries."
    ],
    "topProblems": [
      "Compare Trie with Hash Table: A hash table has O(L) hashing, but encounters collisions, hash recalculations, and cannot perform efficient prefix range queries or sorted autocomplete.",
      "Mention that Tries can be compressed into Radix Trees / Patricia Tries where single-child chains are merged into multi-character edges."
    ]
  },
  "17.2": {
    "subStepId": "17.2",
    "stepId": "step-17",
    "stepNumber": 17,
    "title": "Bitwise Trie: Maximum XOR of Two Numbers & Offline Queries",
    "overview": "Bitwise Tries (Binary Tries) store binary representations of integers (usually 32 bits from MSB bit 31 down to LSB bit 0). Each node has at most two children: 0 and 1. By greedily choosing the opposite bit (1 - bit) at each position from left to right, we can find the maximum XOR pair in O(32 * N) time, drastically outperforming O(N^2) brute force.",
    "coreIntuition": "Binary Representation & MSB Priority: The most significant bit (MSB, bit 31) contributes 2^31 to the XOR sum, which is strictly greater than all lower bits combined (2^30 + 2^29 + ... + 2^0 = 2^31 - 1). Therefore, a greedy choice from MSB to LSB is guaranteed to yield the optimal global maximum.",
    "recurrenceOrFormula": "\n       Bitwise Trie Architecture (32-bit integers):\n                     (root)\n                    /      \\\n                  0          1\n                 /            \\\n                0              1\n               / \\            / \\\n              0   1          0   1\n\n      • Greedy XOR Principle:\n        To maximize `X ^ num`, for each bit of `num` from 31 down to 0:\n        - If `num` has bit 0: greedily seek branch 1 (because 0 ^ 1 = 1).\n        - If `num` has bit 1: greedily seek branch 0 (because 1 ^ 0 = 1).\n        If the desired opposite bit exists, traverse it and set bit in answer.\n        Else take the matching bit (yields 0 in XOR).\n    ",
    "keyTechnique": "Binary Trie Structure: Binary tree where `links[2]` holds pointer to bit 0 and bit 1 child nodes.",
    "timeComplexity": "O(32 * N) for Maximum XOR of Two Numbers, and O(Q log Q + N log N + 32 * (N + Q)) for constrained offline queries.",
    "spaceComplexity": "O(32 * N) for the binary trie nodes.",
    "stepsToSolve": [
      "1. Bitwise Node: `struct Node { Node* links[2] = {nullptr}; };`.",
      "2. Insert(num): Set `curr = root`. Loop `i` from 31 down to 0: `bit = (num >> i) & 1`. If `!curr->links[bit]`, `curr->links[bit] = new Node()`. `curr = curr->links[bit]`.",
      "3. GetMax(num): Set `curr = root`, `maxVal = 0`. Loop `i` from 31 down to 0: `bit = (num >> i) & 1`. `oppBit = 1 - bit`. If `curr->links[oppBit]` exists, `maxVal |= (1 << i)`, and move `curr = curr->links[oppBit]`. Else move `curr = curr->links[bit]`. Return `maxVal`.",
      "4. Offline Queries: Attach original query index to each query `[xi, mi, qIdx]`. Sort `queries` by `mi`. Sort `nums`. Use pointer `idx` into `nums`. For each query, while `idx < nums.size() && nums[idx] <= mi`, insert `nums[idx++]` into Trie. Query `trie.getMax(xi)` and store in `ans[qIdx]`."
    ],
    "cppSnippet": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct BinaryNode {\n    BinaryNode* links[2] = {nullptr};\n    bool containsKey(int bit) { return links[bit] != nullptr; }\n    BinaryNode* get(int bit) { return links[bit]; }\n    void put(int bit, BinaryNode* node) { links[bit] = node; }\n};\n\nclass BinaryTrie {\nprivate:\n    BinaryNode* root;\npublic:\n    BinaryTrie() { root = new BinaryNode(); }\n\n    void insert(int num) {\n        BinaryNode* node = root;\n        for (int i = 31; i >= 0; i--) {\n            int bit = (num >> i) & 1;\n            if (!node->containsKey(bit)) {\n                node->put(bit, new BinaryNode());\n            }\n            node = node->get(bit);\n        }\n    }\n\n    int getMax(int num) {\n        BinaryNode* node = root;\n        int maxVal = 0;\n        for (int i = 31; i >= 0; i--) {\n            int bit = (num >> i) & 1;\n            int oppBit = 1 - bit;\n            if (node->containsKey(oppBit)) {\n                maxVal |= (1 << i);\n                node = node->get(oppBit);\n            } else {\n                node = node->get(bit);\n            }\n        }\n        return maxVal;\n    }\n};\n\nint findMaximumXOR(vector<int>& nums) {\n    BinaryTrie trie;\n    for (int x : nums) trie.insert(x);\n    int maxXor = 0;\n    for (int x : nums) {\n        maxXor = max(maxXor, trie.getMax(x));\n    }\n    return maxXor;\n}\n\nint main() {\n    vector<int> nums = {3, 10, 5, 25, 2, 8};\n    cout << \"Maximum XOR of Two Numbers: \" << findMaximumXOR(nums) << endl;\n    return 0;\n}\n",
    "pythonSnippet": "from typing import List\n\nclass BinaryTrieNode:\n    def __init__(self):\n        self.links = [None, None]\n\nclass BinaryTrie:\n    def __init__(self):\n        self.root = BinaryTrieNode()\n\n    def insert(self, num: int):\n        node = self.root\n        for i in range(31, -1, -1):\n            bit = (num >> i) & 1\n            if not node.links[bit]:\n                node.links[bit] = BinaryTrieNode()\n            node = node.links[bit]\n\n    def get_max(self, num: int) -> int:\n        node = self.root\n        max_val = 0\n        for i in range(31, -1, -1):\n            bit = (num >> i) & 1\n            opp_bit = 1 - bit\n            if node.links[opp_bit]:\n                max_val |= (1 << i)\n                node = node.links[opp_bit]\n            else:\n                node = node.links[bit]\n        return max_val\n\ndef find_maximum_xor(nums: List[int]) -> int:\n    trie = BinaryTrie()\n    for x in nums:\n        trie.insert(x)\n    return max(trie.get_max(x) for x in nums)\n\nif __name__ == \"__main__\":\n    nums = [3, 10, 5, 25, 2, 8]\n    print(\"Maximum XOR:\", find_maximum_xor(nums))\n",
    "pitfalls": [
      "Iterating bits from 0 up to 31 instead of 31 down to 0: MSB bits MUST be prioritized for the greedy property to guarantee maximum XOR.",
      "Shifting signed integers: In C++, `1 << 31` on signed 32-bit integer is undefined behavior (overflows INT_MAX). Use `1U << i` or iterate from bit 30 if inputs are strictly non-negative.",
      "Not using offline sorting for range-limited queries, which leads to rebuilding the Trie for each query in O(Q * N)."
    ],
    "topProblems": [
      "Explain why the greedy choice works: In binary arithmetic, a single '1' at bit position k contributes more than all bits from 0 to k-1 combined.",
      "Mention that Bitwise Tries are also used to calculate maximum subarray XOR using prefix XOR sums."
    ]
  },
  "18.1": {
    "subStepId": "18.1",
    "stepId": "step-18",
    "stepNumber": 18,
    "title": "Advanced String Algorithms: KMP, Z-Algorithm & Rabin-Karp",
    "overview": "Advanced string matching algorithms search for occurrences of a pattern P (length M) within a text T (length N) in linear O(N + M) time. Learn the Knuth-Morris-Pratt (KMP) algorithm using the Longest Prefix Suffix (LPS) π-array, the Z-Algorithm using the Z-box `[L, R]`, and Rabin-Karp rolling hash.",
    "coreIntuition": "Knuth-Morris-Pratt (KMP): Prevents redundant text re-scans. The LPS table allows the pattern pointer `j` to fall back to `LPS[j - 1]` while the text pointer `i` continues strictly forward.",
    "recurrenceOrFormula": "\n       1. KMP Longest Prefix Suffix (LPS) Array:\n          Pattern: \"a b a b a c a\"\n          Index:    0 1 2 3 4 5 6\n          LPS:     [0,0,1,2,3,0,1]\n          LPS[i] = length of longest PROPER prefix of P[0..i] that is also a suffix of P[0..i].\n          When mismatch occurs at P[j], do not reset text index! Set j = LPS[j - 1]!\n\n       2. Z-Algorithm Z-Array:\n          Z[i] = length of the longest substring starting from s[i] that is also a prefix of s.\n          Construct string S = P + \"$\" + T.\n          Any index i with Z[i] == M indicates a full match of pattern P in text T!\n    ",
    "keyTechnique": "LPS Computation in O(M): Two pointers `len = 0` and `i = 1`. If `pat[i] == pat[len]`, `len++; lps[i] = len; i++;`. Else if `len != 0`, fallback `len = lps[len - 1]`. Else `lps[i] = 0; i++;`.",
    "timeComplexity": "O(N + M) linear time for both KMP and Z-Algorithm. O(M) for LPS preprocessing.",
    "spaceComplexity": "O(M) auxiliary space for KMP LPS array; O(N + M) for Z-array.",
    "stepsToSolve": [
      "1. Compute LPS Array: Initialize `lps` array of size M with 0. `len = 0`, `i = 1`. While `i < M`: if `pat[i] == pat[len]`, increment both and record `lps[i] = len`. Else if `len > 0`, `len = lps[len - 1]`. Else `lps[i] = 0; i++;`.",
      "2. KMP Pattern Search: Initialize `i = 0, j = 0`. While `i < N`: if `pat[j] == txt[i]`, `i++; j++;`. If `j == M`, match found at `i - M`! Set `j = lps[j - 1]`. Else if `i < N && pat[j] != txt[i]`, if `j != 0` set `j = lps[j - 1]`, else `i++`.",
      "3. Z-Algorithm: Compute Z-array for `P + \"$\" + T`. Scan `Z` array from `M + 1` to end. Wherever `Z[i] == M`, record match at `i - M - 1`."
    ],
    "cppSnippet": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass StringMatching {\npublic:\n    // Knuth-Morris-Pratt (KMP) Algorithm\n    vector<int> computeLPS(const string& pat) {\n        int m = pat.size();\n        vector<int> lps(m, 0);\n        int len = 0, i = 1;\n\n        while (i < m) {\n            if (pat[i] == pat[len]) {\n                len++;\n                lps[i] = len;\n                i++;\n            } else {\n                if (len != 0) {\n                    len = lps[len - 1]; // fallback without advancing i\n                } else {\n                    lps[i] = 0;\n                    i++;\n                }\n            }\n        }\n        return lps;\n    }\n\n    vector<int> searchKMP(const string& txt, const string& pat) {\n        vector<int> matches;\n        int n = txt.size(), m = pat.size();\n        if (m == 0 || n < m) return matches;\n\n        vector<int> lps = computeLPS(pat);\n        int i = 0, j = 0;\n\n        while (i < n) {\n            if (pat[j] == txt[i]) {\n                i++;\n                j++;\n            }\n\n            if (j == m) {\n                matches.push_back(i - j); // Match found!\n                j = lps[j - 1];\n            } else if (i < n && pat[j] != txt[i]) {\n                if (j != 0) {\n                    j = lps[j - 1];\n                } else {\n                    i++;\n                }\n            }\n        }\n        return matches;\n    }\n};\n\nint main() {\n    StringMatching sm;\n    string txt = \"ABABDABACDABABCABAB\";\n    string pat = \"ABABCABAB\";\n    auto matches = sm.searchKMP(txt, pat);\n    cout << \"KMP Match Indices: \";\n    for (int idx : matches) cout << idx << \" \";\n    cout << endl;\n    return 0;\n}\n",
    "pythonSnippet": "from typing import List\n\nclass StringMatching:\n    def compute_lps(self, pat: str) -> List[int]:\n        \"\"\"Computes Longest Prefix Suffix (LPS) table in O(M).\"\"\"\n        m = len(pat)\n        lps = [0] * m\n        length = 0\n        i = 1\n\n        while i < m:\n            if pat[i] == pat[length]:\n                length += 1\n                lps[i] = length\n                i += 1\n            else:\n                if length != 0:\n                    length = lps[length - 1]\n                else:\n                    lps[i] = 0\n                    i += 1\n        return lps\n\n    def search_kmp(self, txt: str, pat: str) -> List[int]:\n        \"\"\"Linear O(N + M) string matching via KMP.\"\"\"\n        n, m = len(txt), len(pat)\n        if m == 0 or n < m:\n            return []\n\n        lps = self.compute_lps(pat)\n        matches = []\n        i = j = 0\n\n        while i < n:\n            if pat[j] == txt[i]:\n                i += 1\n                j += 1\n\n            if j == m:\n                matches.append(i - j)\n                j = lps[j - 1]\n            elif i < n and pat[j] != txt[i]:\n                if j != 0:\n                    j = lps[j - 1]\n                else:\n                    i += 1\n\n        return matches\n\nif __name__ == \"__main__\":\n    sm = StringMatching()\n    print(\"KMP Matches:\", sm.search_kmp(\"ABABDABACDABABCABAB\", \"ABABCABAB\"))\n",
    "pitfalls": [
      "Incrementing `i` inside the fallback branch of LPS computation: `i` should ONLY increment when `len == 0` or characters match.",
      "Resetting `j = 0` after a successful pattern match: Always set `j = lps[j - 1]` to find overlapping occurrences.",
      "In Shortest Palindrome, forgetting the delimiter character `#` between `s` and `reverse(s)`, which allows prefix and suffix to bleed across boundaries."
    ],
    "topProblems": [
      "Explain how KMP never backtracks the text index `i`, making it ideal for streaming inputs where reading backward from a socket/pipe is impossible.",
      "Mention that Z-Algorithm is simpler to write in competitive programming for problems involving prefix matching and repeated patterns."
    ]
  }
};

export function getSubStepTheory(subStepId: string): StriverSubStepTheory | undefined {
  return STRIVERS_SUBSTEP_THEORIES[subStepId];
}
