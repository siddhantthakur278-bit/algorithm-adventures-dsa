// Striver's A2Z DSA Sheet - Complete 18 Steps Theory & Concept Dataset
// Official Curriculum Reference: Take U Forward (Raj Vikramaditya)

export interface TheoryInvariant {
  title: string;
  formula?: string;
  explanation: string;
  example?: string;
}

export interface ComplexityItem {
  operation: string;
  best: string;
  average: string;
  worst: string;
  space: string;
  note?: string;
}

export interface TheoryCodeSnippet {
  title: string;
  language: 'cpp' | 'python' | 'java';
  code: string;
  explanation: string;
}

export interface TheoryQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TheoryInterviewQA {
  question: string;
  companyTags: string[];
  answer: string;
}

export interface StriverStepTheory {
  stepId: string;
  stepNumber: number;
  title: string;
  icon: string;
  tagline: string;
  readingTime: string;
  topics: string[];
  overview: string;
  keyConcepts: {
    title: string;
    description: string;
    bulletPoints: string[];
  }[];
  invariants: TheoryInvariant[];
  algorithmWalkthroughs: {
    algorithmName: string;
    intuition: string;
    steps: string[];
    pseudocode: string;
  }[];
  codeSnippets: TheoryCodeSnippet[];
  complexityMatrix: ComplexityItem[];
  commonPitfalls: string[];
  interviewTips: string[];
  interviewQAs: TheoryInterviewQA[];
  quiz: TheoryQuizQuestion[];
}

export const STRIVERS_A2Z_THEORIES: StriverStepTheory[] = [
  {
    "stepId": "step-1",
    "stepNumber": 1,
    "title": "Step 1: Learn the Basics & Foundations",
    "icon": "\u26a1",
    "tagline": "Language Syntax, Big-O Complexity, Recursion Trees, Basic Math & Hashing Mechanics",
    "readingTime": "15 min read",
    "topics": [
      "Time & Space Complexity (Big-O, Omega, Theta)",
      "Master Theorem & Recurrence Relations",
      "Recursion Call Stack & Stack Frames",
      "Euclidean Algorithm for GCD & Prime Sieve",
      "Hashing Techniques: Division, Chaining & Open Addressing"
    ],
    "overview": "Step 1 lays the mathematical and algorithmic groundwork for your entire DSA journey. Before attempting problem solving, you must master how compilers allocate memory on the call stack, how asymptotic complexity is rigorously evaluated, and how constant-time hashing transforms slow lookups into lightning-fast retrievals.",
    "keyConcepts": [
      {
        "title": "Asymptotic Analysis & Big-O Notation",
        "description": "Big-O represents the upper bound of runtime as input size N grows towards infinity. It ignores constant factors and lower-order terms to focus on the rate of growth.",
        "bulletPoints": [
          "O(1): Constant time (Hash map lookup, array indexing).",
          "O(log N): Logarithmic time (Binary Search, balanced tree operations).",
          "O(N): Linear time (Single loop through an array of size N).",
          "O(N log N): Linearithmic time (Merge Sort, Heap Sort, std::sort).",
          "O(N^2): Quadratic time (Nested loops, Bubble Sort, Selection Sort).",
          "O(2^N) and O(N!): Exponential and Factorial time (Power set, Permutations backtracking)."
        ]
      },
      {
        "title": "Memory Layout: Stack Frame vs Heap",
        "description": "Local variables and function call contexts live on the Call Stack. Dynamic allocations (pointers, vectors, new objects) live in the Heap memory.",
        "bulletPoints": [
          "Each recursive invocation pushes a new Stack Frame containing parameters, local variables, and the return instruction address.",
          "Stack Overflow occurs when recursion depth exceeds the allocated thread stack limit (~1MB to 8MB).",
          "Base Case guarantees the recursion unwinds and stack frames are popped in LIFO order."
        ]
      },
      {
        "title": "Hash Table Collisions & Load Factor",
        "description": "A hash function maps keys to buckets. When two distinct keys produce the same hash index, a collision occurs.",
        "bulletPoints": [
          "Separate Chaining: Each bucket holds a linked list or red-black tree (C++ unordered_map, Java HashMap).",
          "Open Addressing: Linear probing h(k, i) = (h(k) + i) % m, Quadratic probing, or Double Hashing.",
          "Load Factor alpha = N / M. When alpha > 0.75, rehashing doubles the table size to preserve O(1) amortized performance."
        ]
      }
    ],
    "invariants": [
      {
        "title": "Euclidean Algorithm for GCD",
        "formula": "gcd(a, b) = gcd(b, a % b) with gcd(a, 0) = a",
        "explanation": "If d divides a and b, then d also divides (a - q*b), where q is the quotient. Running time is bounded by O(log(min(a, b))) because the remainder decreases by at least half every two steps.",
        "example": "gcd(48, 18) -> gcd(18, 12) -> gcd(12, 6) -> gcd(6, 0) = 6."
      },
      {
        "title": "Sieve of Eratosthenes Complexity",
        "formula": "Time: O(N * log(log N)), Space: O(N)",
        "explanation": "Sum of reciprocal of primes up to N is proportional to log(log N). Starting cross-offs from p*p optimizes away redundant smaller multiples.",
        "example": "For prime 5, start marking false from 25, 30, 35... (since 2*5, 3*5, 4*5 were already cleared by 2, 3)."
      }
    ],
    "algorithmWalkthroughs": [
      {
        "algorithmName": "Euclidean Greatest Common Divisor (GCD)",
        "intuition": "Subtracting or modding the larger number by the smaller preserves all common factors while rapidly driving numbers toward zero.",
        "steps": [
          "While b != 0, compute rem = a % b.",
          "Assign a = b and b = rem.",
          "When b becomes 0, return a as the greatest common divisor."
        ],
        "pseudocode": "function gcd(a, b):\n    while b != 0:\n        a, b = b, a % b\n    return a"
      }
    ],
    "codeSnippets": [
      {
        "title": "Optimized GCD & Prime Sieve (C++)",
        "language": "cpp",
        "code": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nlong long gcd(long long a, long long b) {\n    while (b != 0) {\n        long long rem = a % b;\n        a = b;\n        b = rem;\n    }\n    return a;\n}\n\nvector<bool> sieve(int n) {\n    vector<bool> isPrime(n + 1, true);\n    isPrime[0] = isPrime[1] = false;\n    for (int p = 2; p * p <= n; p++) {\n        if (isPrime[p]) {\n            for (int i = p * p; i <= n; i += p) isPrime[i] = false;\n        }\n    }\n    return isPrime;\n}",
        "explanation": "Euclidean GCD executes in logarithmic time. Prime sieve starts from p*p for optimal O(N log log N) execution."
      },
      {
        "title": "Euclidean GCD & Prime Sieve (Python)",
        "language": "python",
        "code": "def gcd(a: int, b: int) -> int:\n    while b != 0:\n        a, b = b, a % b\n    return a\n\ndef sieve(n: int) -> list[bool]:\n    is_prime = [True] * (n + 1)\n    is_prime[0] = is_prime[1] = False\n    p = 2\n    while p * p <= n:\n        if is_prime[p]:\n            for i in range(p * p, n + 1, p):\n                is_prime[i] = False\n        p += 1\n    return is_prime",
        "explanation": "Pythonic implementation using tuple unpacking and list comprehension."
      }
    ],
    "complexityMatrix": [
      {
        "operation": "Array Index Access",
        "best": "O(1)",
        "average": "O(1)",
        "worst": "O(1)",
        "space": "O(1)",
        "note": "Direct memory offset calculation."
      },
      {
        "operation": "Hash Map Lookup (Unordered)",
        "best": "O(1)",
        "average": "O(1)",
        "worst": "O(N)",
        "space": "O(N)",
        "note": "Worst case happens during high collision degradation."
      },
      {
        "operation": "Euclidean GCD",
        "best": "O(1)",
        "average": "O(log(min(a,b)))",
        "worst": "O(log(min(a,b)))",
        "space": "O(1)",
        "note": "Worst case occurs with consecutive Fibonacci numbers."
      },
      {
        "operation": "Sieve of Eratosthenes",
        "best": "O(N log log N)",
        "average": "O(N log log N)",
        "worst": "O(N log log N)",
        "space": "O(N)",
        "note": "Computes all primes up to N simultaneously."
      }
    ],
    "commonPitfalls": [
      "Forgetting to check for base case in recursion resulting in SIGSEGV (Stack Overflow).",
      "Assuming unordered_map in C++ is always O(1) in competitive programming: adversarial testcases can degrade it to O(N)."
    ],
    "interviewTips": [
      "Always state both Time and Space complexity upfront before writing code.",
      "Explain the difference between Auxiliary Space and Total Space."
    ],
    "interviewQAs": [
      {
        "question": "What is the difference between Amortized O(1) and Strict O(1) time complexity?",
        "companyTags": [
          "Google",
          "Meta",
          "Amazon"
        ],
        "answer": "Strict O(1) means every operation takes constant time (e.g. array index). Amortized O(1) means that while an occasional operation takes longer (like dynamic array vector resizing or rehashing taking O(N)), the average cost per operation over N operations remains bounded by a constant O(1)."
      }
    ],
    "quiz": [
      {
        "id": "q1-1",
        "question": "What is the worst-case time complexity of Euclidean GCD for numbers a and b?",
        "options": [
          "O(N)",
          "O(log(min(a, b)))",
          "O(sqrt(a * b))",
          "O(min(a, b))"
        ],
        "correctIndex": 1,
        "explanation": "Euclidean GCD runs in O(log(min(a, b))) because the remainder decreases by at least half every two steps."
      }
    ]
  },
  {
    "stepId": "step-2",
    "stepNumber": 2,
    "title": "Step 2: Sorting Techniques & Invariants",
    "icon": "\ud83d\udcca",
    "tagline": "Selection, Bubble, Insertion, Merge Sort & Quick Sort Partitioning",
    "readingTime": "18 min read",
    "topics": [
      "Quadratic Sorting: Selection, Bubble, Insertion",
      "Divide & Conquer: Merge Sort Analysis & Stability Proof",
      "Quick Sort: Lomuto vs Hoare Partitioning & Pivot Strategies",
      "Worst-case O(N^2) degradation avoidance in Quick Sort",
      "Comparison vs Non-comparison sorting lower bounds (Omega(N log N))"
    ],
    "overview": "Sorting is the cornerstone of algorithm design. Mastering sorting is about internalizing the invariants that separate sorted and unsorted segments, understanding recursive divide-and-conquer recurrences, and analyzing stability.",
    "keyConcepts": [
      {
        "title": "Stability in Sorting",
        "description": "A sorting algorithm is stable if it preserves the relative order of elements with equal keys.",
        "bulletPoints": [
          "Stable: Merge Sort, Insertion Sort, Bubble Sort.",
          "Unstable: Quick Sort, Heap Sort, Selection Sort (due to long-distance swaps).",
          "Stability is critical when sorting records by multiple criteria."
        ]
      },
      {
        "title": "Merge Sort Recurrence & Invariant",
        "description": "Merge Sort splits the array at mid = low + (high - low)/2, recursively sorts both halves, and merges them using two pointers in O(N) linear time.",
        "bulletPoints": [
          "Recurrence: T(N) = 2*T(N/2) + O(N). By Master Theorem, T(N) = Theta(N log N).",
          "Guaranteed O(N log N) in all cases (Best, Average, and Worst).",
          "Requires O(N) auxiliary space for the temporary merge buffer."
        ]
      },
      {
        "title": "Quick Sort Partition Invariant",
        "description": "Quick Sort chooses a pivot and partitions the array such that all elements <= pivot are to its left, and all elements > pivot are to its right.",
        "bulletPoints": [
          "Average Time: O(N log N), Space: O(log N) stack frames.",
          "Worst Case: O(N^2) when the pivot is always the extreme minimum or maximum element.",
          "Mitigation: Randomized pivot selection or Median-of-Three pivot."
        ]
      }
    ],
    "invariants": [
      {
        "title": "Insertion Sort Loop Invariant",
        "formula": "Array subarray arr[0 .. i-1] is always sorted at the start of iteration i",
        "explanation": "In iteration i, arr[i] is picked and shifted leftward until it reaches its correct position among the sorted elements 0 to i-1.",
        "example": "If arr is [2, 5, 8, 3, 1], when i=3, subarray [2, 5, 8] is sorted. 3 shifts past 8 and 5 to produce [2, 3, 5, 8, 1]."
      }
    ],
    "algorithmWalkthroughs": [
      {
        "algorithmName": "Merge Sort",
        "intuition": "Divide the unsorted list into N sublists each of 1 element, then merge sublists repeatedly.",
        "steps": [
          "Find midpoint mid = low + (high - low) / 2.",
          "Recursively call mergeSort(low, mid) and mergeSort(mid + 1, high).",
          "Merge the two sorted halves into a temporary buffer using two pointers.",
          "Copy merged sorted elements back to original array."
        ],
        "pseudocode": "function mergeSort(arr, low, high):\n    if low >= high: return\n    mid = (low + high) // 2\n    mergeSort(arr, low, mid)\n    mergeSort(arr, mid + 1, high)\n    merge(arr, low, mid, high)"
      }
    ],
    "codeSnippets": [
      {
        "title": "Merge Sort with In-Place Copy (C++)",
        "language": "cpp",
        "code": "#include <vector>\nusing namespace std;\n\nvoid merge(vector<int>& arr, int low, int mid, int high) {\n    vector<int> temp;\n    int left = low, right = mid + 1;\n    while (left <= mid && right <= high) {\n        if (arr[left] <= arr[right]) temp.push_back(arr[left++]);\n        else temp.push_back(arr[right++]);\n    }\n    while (left <= mid) temp.push_back(arr[left++]);\n    while (right <= high) temp.push_back(arr[right++]);\n    for (int i = low; i <= high; i++) arr[i] = temp[i - low];\n}\n\nvoid mergeSort(vector<int>& arr, int low, int high) {\n    if (low >= high) return;\n    int mid = low + (high - low) / 2;\n    mergeSort(arr, low, mid);\n    mergeSort(arr, mid + 1, high);\n    merge(arr, low, mid, high);\n}",
        "explanation": "Guaranteed O(N log N) runtime using two-pointer merging."
      }
    ],
    "complexityMatrix": [
      {
        "operation": "Selection Sort",
        "best": "O(N^2)",
        "average": "O(N^2)",
        "worst": "O(N^2)",
        "space": "O(1)",
        "note": "Exactly N swaps."
      },
      {
        "operation": "Insertion Sort",
        "best": "O(N)",
        "average": "O(N^2)",
        "worst": "O(N^2)",
        "space": "O(1)",
        "note": "Fast on nearly sorted arrays."
      },
      {
        "operation": "Merge Sort",
        "best": "O(N log N)",
        "average": "O(N log N)",
        "worst": "O(N log N)",
        "space": "O(N)",
        "note": "Guaranteed O(N log N) & stable."
      },
      {
        "operation": "Quick Sort",
        "best": "O(N log N)",
        "average": "O(N log N)",
        "worst": "O(N^2)",
        "space": "O(log N)",
        "note": "In-place cache-friendly."
      }
    ],
    "commonPitfalls": [
      "Calculating mid as (low + high)/2 instead of low + (high - low)/2 leading to integer overflow.",
      "Choosing the first element as pivot in Quick Sort without randomization, causing O(N^2) on sorted inputs."
    ],
    "interviewTips": [
      "Quick Sort is practically faster than Merge Sort due to superior cache locality and zero memory allocations."
    ],
    "interviewQAs": [
      {
        "question": "Why is Merge Sort preferred for Linked Lists?",
        "companyTags": [
          "Amazon",
          "Microsoft"
        ],
        "answer": "In Linked Lists, sequential insertion and node pointer manipulation take O(1) extra space without needing random index access, so Merge Sort requires no O(N) array allocation on linked lists."
      }
    ],
    "quiz": [
      {
        "id": "q2-1",
        "question": "Which of the following sorting algorithms is STABLE by default?",
        "options": [
          "Quick Sort",
          "Heap Sort",
          "Merge Sort",
          "Selection Sort"
        ],
        "correctIndex": 2,
        "explanation": "Merge Sort preserves the relative order of duplicate elements because when arr[left] == arr[right], the left element is placed into the output buffer first."
      }
    ]
  },
  {
    "stepId": "step-3",
    "stepNumber": 3,
    "title": "Step 3: Array Mastery & Classic Invariants",
    "icon": "\ud83c\udfaf",
    "tagline": "Two Pointers, Kadane's Algorithm, Boyer-Moore Voting & Dutch National Flag",
    "readingTime": "22 min read",
    "topics": [
      "Dutch National Flag 3-Way Partitioning Invariant",
      "Boyer-Moore Majority Voting Algorithm Proof",
      "Kadane's Algorithm for Maximum Subarray Sum",
      "Pascal Triangle Row & Element Generation Math",
      "Next Permutation Lexicographical Order Algorithm",
      "Rotate Image 90 degrees In-Place Matrix Geometry"
    ],
    "overview": "Array problems form over 35% of all technical coding interviews. Step 3 teaches you linear-time algorithmic paradigms that replace naive O(N^2) or O(N^3) brute forces with elegant, mathematically sound O(N) solutions.",
    "keyConcepts": [
      {
        "title": "Dutch National Flag Algorithm (0s, 1s, 2s)",
        "description": "Maintains three pointers (low, mid, high) dividing the array into 4 distinct regions.",
        "bulletPoints": [
          "arr[0 .. low-1]: All 0s.",
          "arr[low .. mid-1]: All 1s.",
          "arr[mid .. high]: Unexplored elements.",
          "arr[high+1 .. n-1]: All 2s.",
          "Loop invariant: Process arr[mid] until mid > high in exactly O(N) time and O(1) space."
        ]
      },
      {
        "title": "Kadane's Algorithm Invariant",
        "description": "At each index i, the maximum subarray ending at i is max(arr[i], max_ending_here + arr[i]).",
        "bulletPoints": [
          "If the running sum becomes negative, it can never contribute positively to any subsequent subarray; hence reset running sum to 0.",
          "Tracks global maximum throughout the pass.",
          "Handles all-negative arrays by initializing max_so_far to the largest negative element."
        ]
      },
      {
        "title": "Boyer-Moore Majority Vote Proof",
        "description": "Finds an element that appears more than floor(N/2) times in O(N) time and O(1) space.",
        "bulletPoints": [
          "Pair each occurrence of the majority element with a distinct non-majority element.",
          "Since majority element occurs > N/2 times, after cancellations, it is guaranteed to remain.",
          "For N/3 majority (Hard), at most two candidates can exist simultaneously."
        ]
      }
    ],
    "invariants": [
      {
        "title": "Kadane's Running Sum Invariant",
        "formula": "current_sum = max(nums[i], current_sum + nums[i])",
        "explanation": "Extending a negative prefix is always strictly worse than starting a fresh subarray at index i.",
        "example": "[-2, 1, -3, 4, -1, 2, 1, -5, 4] -> Max contiguous subarray is [4, -1, 2, 1] with sum = 6."
      }
    ],
    "algorithmWalkthroughs": [
      {
        "algorithmName": "Dutch National Flag 3-Way Partition",
        "intuition": "Maintain partitioned boundaries and swap current element arr[mid] to its correct end while expanding the explored zone.",
        "steps": [
          "Initialize low = 0, mid = 0, high = n - 1.",
          "If arr[mid] == 0: swap(arr[low], arr[mid]), low++, mid++.",
          "If arr[mid] == 1: mid++.",
          "If arr[mid] == 2: swap(arr[mid], arr[high]), high--."
        ],
        "pseudocode": "while mid <= high:\n    if arr[mid] == 0: swap(arr[low], arr[mid]); low++; mid++\n    elif arr[mid] == 1: mid++\n    else: swap(arr[mid], arr[high]); high--"
      }
    ],
    "codeSnippets": [
      {
        "title": "Kadane's & Dutch National Flag (C++)",
        "language": "cpp",
        "code": "#include <vector>\n#include <climits>\nusing namespace std;\n\nint maxSubArray(const vector<int>& nums) {\n    int maxSoFar = INT_MIN, currSum = 0;\n    for (int x : nums) {\n        currSum += x;\n        if (currSum > maxSoFar) maxSoFar = currSum;\n        if (currSum < 0) currSum = 0;\n    }\n    return maxSoFar;\n}\n\nvoid sortColors(vector<int>& nums) {\n    int low = 0, mid = 0, high = nums.size() - 1;\n    while (mid <= high) {\n        if (nums[mid] == 0) swap(nums[low++], nums[mid++]);\n        else if (nums[mid] == 1) mid++;\n        else swap(nums[mid], nums[high--]);\n    }\n}",
        "explanation": "Both algorithms achieve strictly optimal linear time with O(1) memory."
      }
    ],
    "complexityMatrix": [
      {
        "operation": "Kadane's Max Subarray",
        "best": "O(N)",
        "average": "O(N)",
        "worst": "O(N)",
        "space": "O(1)",
        "note": "Replaces O(N^3) triple loop brute force."
      },
      {
        "operation": "Dutch National Flag Sort",
        "best": "O(N)",
        "average": "O(N)",
        "worst": "O(N)",
        "space": "O(1)",
        "note": "Exactly one pass through the array."
      },
      {
        "operation": "Boyer-Moore Voting",
        "best": "O(N)",
        "average": "O(N)",
        "worst": "O(N)",
        "space": "O(1)",
        "note": "Finds majority element with zero hashing."
      }
    ],
    "commonPitfalls": [
      "In Dutch National Flag, incrementing mid when swapping with high. The element swapped from high is uninspected!",
      "Initializing Kadane's max_so_far to 0 instead of INT_MIN, failing on all-negative arrays."
    ],
    "interviewTips": [
      "For in-place matrix 90-degree clockwise rotation: Remember Transpose, then Reverse every row!"
    ],
    "interviewQAs": [
      {
        "question": "How do you find the Next Permutation of an array in-place?",
        "companyTags": [
          "Google",
          "Meta",
          "Uber"
        ],
        "answer": "1. Find the first dip from right to left where arr[i] < arr[i + 1].\n2. If no dip, reverse the whole array.\n3. From the right end, find the smallest element > arr[i] and swap.\n4. Reverse the suffix from i + 1 to end."
      }
    ],
    "quiz": [
      {
        "id": "q3-1",
        "question": "In Dutch National Flag, why do we NOT increment 'mid' when swapping with 'high'?",
        "options": [
          "Because high is out of bounds",
          "Because the element swapped from high is unexamined and might be 0, 1, or 2",
          "Because mid must always lag behind low",
          "Because high is always guaranteed to be 1"
        ],
        "correctIndex": 1,
        "explanation": "When arr[mid] == 2, we swap with arr[high]. We do not know what was previously at arr[high], so we must re-evaluate arr[mid] on the next iteration."
      }
    ]
  },
  {
    "stepId": "step-4",
    "stepNumber": 4,
    "title": "Step 4: Binary Search & Search Space Reduction",
    "icon": "\ud83d\udd0d",
    "tagline": "Lower/Upper Bound, Search Space Monotonicity, Rotated Arrays & 2D Matrices",
    "readingTime": "24 min read",
    "topics": [
      "Binary Search Invariant: Search Space Shrinkage",
      "Lower Bound vs Upper Bound Invariants",
      "Rotated Sorted Array: Identifying the Sorted Half",
      "Binary Search on Answers: Monotonic Predicate Invariant",
      "Book Allocation, Aggressive Cows & Painter's Partition",
      "2D Matrix Virtual Index Mapping & Row-Col Elimination"
    ],
    "overview": "Binary Search is an optimization technique applied over answer search spaces where a monotonic boolean condition separates feasible and infeasible states.",
    "keyConcepts": [
      {
        "title": "Monotonicity Invariant",
        "description": "Binary search is applicable whenever a decision function P(x) is monotonic: false ... false true ... true.",
        "bulletPoints": [
          "If P(mid) is true, we record mid and search lower half.",
          "If P(mid) is false, all values <= mid are impossible; search upper half.",
          "Reduces a search space of size S to log2(S) iterations."
        ]
      },
      {
        "title": "Lower Bound vs Upper Bound",
        "description": "Boundaries of occurrences in a sorted sequence.",
        "bulletPoints": [
          "Lower Bound: First index i where arr[i] >= target.",
          "Upper Bound: First index i where arr[i] > target."
        ]
      }
    ],
    "invariants": [
      {
        "title": "2D Matrix Virtual 1D Index Mapping",
        "formula": "row = mid / cols, col = mid % cols",
        "explanation": "A strictly sorted M x N matrix can be treated as a 1D array of size M * N without extra memory allocation.",
        "example": "In a 3x4 matrix, index 7 maps to row = 7/4 = 1, col = 7%4 = 3 -> matrix[1][3]."
      }
    ],
    "algorithmWalkthroughs": [
      {
        "algorithmName": "Binary Search on Answer (Book Allocation)",
        "intuition": "Binary search between max(pages) and sum(pages).",
        "steps": [
          "low = max(pages), high = sum(pages).",
          "While low <= high: mid = low + (high - low) / 2.",
          "Count required students using greedy helper.",
          "If students <= k: feasible; high = mid - 1.",
          "Else: low = mid + 1."
        ],
        "pseudocode": "low = max(arr); high = sum(arr)\nwhile low <= high:\n    mid = (low + high) // 2\n    if canAllocate(arr, k, mid):\n        ans = mid; high = mid - 1\n    else:\n        low = mid + 1\nreturn ans"
      }
    ],
    "codeSnippets": [
      {
        "title": "Binary Search on Rotated Array (C++)",
        "language": "cpp",
        "code": "#include <vector>\nusing namespace std;\n\nint searchRotated(const vector<int>& nums, int target) {\n    int low = 0, high = nums.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[low] <= nums[mid]) {\n            if (target >= nums[low] && target < nums[mid]) high = mid - 1;\n            else low = mid + 1;\n        } else {\n            if (target > nums[mid] && target <= nums[high]) low = mid + 1;\n            else high = mid - 1;\n        }\n    }\n    return -1;\n}",
        "explanation": "Guarantees O(log N) search even with rotation by checking which half is sorted."
      }
    ],
    "complexityMatrix": [
      {
        "operation": "Standard Binary Search",
        "best": "O(1)",
        "average": "O(log N)",
        "worst": "O(log N)",
        "space": "O(1)",
        "note": "Halving of search space."
      },
      {
        "operation": "BS on Answer (Book Allocation)",
        "best": "O(N log(Sum - Max))",
        "average": "O(N log(Sum - Max))",
        "worst": "O(N log(Sum - Max))",
        "space": "O(1)",
        "note": "N time check function executed log(Range) times."
      }
    ],
    "commonPitfalls": [
      "Failing on duplicate elements in Rotated Sorted Array: when nums[low] == nums[mid] == nums[high], do low++ and high--."
    ],
    "interviewTips": [
      "'Minimize the Maximum' or 'Maximize the Minimum' is a 95% tell for Binary Search on Answers!"
    ],
    "interviewQAs": [
      {
        "question": "How do you handle duplicates in Rotated Sorted Array search?",
        "companyTags": [
          "Google",
          "Meta"
        ],
        "answer": "When nums[low] == nums[mid] == nums[high], both halves look identical and we shrink boundaries via low++ and high-- (worst-case O(N))."
      }
    ],
    "quiz": [
      {
        "id": "q4-1",
        "question": "What is the lower bound of an element X in a sorted array?",
        "options": [
          "The first index where arr[i] > X",
          "The first index where arr[i] >= X",
          "The last index where arr[i] <= X",
          "The last index where arr[i] == X"
        ],
        "correctIndex": 1,
        "explanation": "Lower bound is mathematically defined as the earliest index i where arr[i] >= X."
      }
    ]
  },
  {
    "stepId": "step-5",
    "stepNumber": 5,
    "title": "Step 5: String Algorithms & Pattern Matching",
    "icon": "\ud83d\udd24",
    "tagline": "Two Pointers, Sliding Window, Palindromes, KMP Failure Function & Rolling Hash",
    "readingTime": "20 min read",
    "topics": [
      "String Immutability & Memory Internals",
      "Longest Palindromic Substring: Expand Around Center",
      "Rabin-Karp Rolling Hash Algorithm with Modulo Arithmetic",
      "KMP Knuth-Morris-Pratt Algorithm & Pi-Table Computation",
      "Anagram Detection & Frequency Character Vector Optimization"
    ],
    "overview": "Strings combine array manipulation with character encoding and pattern matching. Step 5 covers efficient two-pointer palindromes, sliding window frequency tracking, and prefix matching.",
    "keyConcepts": [
      {
        "title": "Expand Around Center (Palindromes)",
        "description": "Every palindrome has a center: an odd-length palindrome centers on a single character (N centers), an even-length palindrome centers between two characters (N - 1 centers).",
        "bulletPoints": [
          "Total 2N - 1 possible centers.",
          "Expanding outward while s[left] == s[right] takes O(N^2) time and O(1) space.",
          "Beats O(N^3) brute force check."
        ]
      },
      {
        "title": "KMP Prefix Function (Pi Table)",
        "description": "Pi[i] stores the length of the longest proper prefix of s[0..i] that is also a suffix of s[0..i].",
        "bulletPoints": [
          "Allows pattern matching in O(N + M) time without backtracking the text pointer.",
          "When a mismatch occurs, shift pattern by pi[j - 1]."
        ]
      }
    ],
    "invariants": [
      {
        "title": "Rabin-Karp Rolling Hash Formula",
        "formula": "Hash(s[1..m]) = (Hash(s[0..m-1]) - s[0]*p^(m-1)) * p + s[m] (mod M)",
        "explanation": "Allows computing the hash of the next window in O(1) constant time from the previous window.",
        "example": "Window 'abc' -> 'bcd' subtracts 'a' and adds 'd' with base p = 31."
      }
    ],
    "algorithmWalkthroughs": [
      {
        "algorithmName": "Expand Around Center (Longest Palindromic Substring)",
        "intuition": "A palindrome mirrors across its center. Expand outwards from each of the 2N - 1 centers.",
        "steps": [
          "Loop through each index i from 0 to n - 1.",
          "Expand for odd palindrome: left = i, right = i.",
          "Expand for even palindrome: left = i, right = i + 1.",
          "Update max length and start index."
        ],
        "pseudocode": "for i in 0..n-1:\n    expand(i, i)       # odd\n    expand(i, i + 1)   # even"
      }
    ],
    "codeSnippets": [
      {
        "title": "Longest Palindromic Substring (C++)",
        "language": "cpp",
        "code": "#include <string>\nusing namespace std;\n\nstring longestPalindrome(string s) {\n    if (s.empty()) return \"\";\n    int start = 0, maxLen = 1, n = s.size();\n    auto expand = [&](int l, int r) {\n        while (l >= 0 && r < n && s[l] == s[r]) {\n            if (r - l + 1 > maxLen) { start = l; maxLen = r - l + 1; }\n            l--; r++;\n        }\n    };\n    for (int i = 0; i < n; i++) {\n        expand(i, i);\n        expand(i, i + 1);\n    }\n    return s.substr(start, maxLen);\n}",
        "explanation": "O(N^2) time, O(1) space expand around center solution."
      }
    ],
    "complexityMatrix": [
      {
        "operation": "Expand Around Center",
        "best": "O(N)",
        "average": "O(N^2)",
        "worst": "O(N^2)",
        "space": "O(1)",
        "note": "Optimal for general interviews."
      },
      {
        "operation": "KMP Pattern Matching",
        "best": "O(N + M)",
        "average": "O(N + M)",
        "worst": "O(N + M)",
        "space": "O(M)",
        "note": "Linear time string search."
      }
    ],
    "commonPitfalls": [
      "In Java/Python, string concatenation inside a loop `s += c` creates a new string object each time, leading to O(N^2) complexity. Use StringBuilder or list join."
    ],
    "interviewTips": [
      "Always clarify whether character sets contain only lowercase English letters (size 26) or full ASCII (size 128/256)."
    ],
    "interviewQAs": [
      {
        "question": "What is the time complexity of building KMP's Pi table?",
        "companyTags": [
          "Google",
          "Microsoft"
        ],
        "answer": "O(M) linear time where M is the pattern length, because the prefix length variable j increments at most M times and decrements at most M times."
      }
    ],
    "quiz": [
      {
        "id": "q5-1",
        "question": "How many potential centers exist in a string of length N for palindromic expansion?",
        "options": [
          "N",
          "2N - 1",
          "N^2",
          "N / 2"
        ],
        "correctIndex": 1,
        "explanation": "N odd centers (on characters) + (N - 1) even centers (between characters) = 2N - 1."
      }
    ]
  },
  {
    "stepId": "step-6",
    "stepNumber": 6,
    "title": "Step 6: Linked Lists Mastery & In-Place Reversal",
    "icon": "\ud83d\udd17",
    "tagline": "Floyd's Cycle Finding, Tortoise & Hare, In-Place Reversals & Doubly Linked Lists",
    "readingTime": "22 min read",
    "topics": [
      "Node Anatomy, Memory Pointers & Dummy Head Technique",
      "Floyd's Tortoise and Hare Cycle Finding Proof (2k - k = nL)",
      "Finding Middle Node in Exactly One Pass",
      "In-Place Linked List Reversal (Iterative 3-Pointer & Recursive)",
      "Detecting Starting Node of Loop in O(1) Memory",
      "LRU Cache Architecture with Doubly Linked List and Hash Map"
    ],
    "overview": "Linked Lists test your mastery of pointers and memory manipulation without the comfort of contiguous array indexing. Step 6 explores the mathematical proofs behind cycle detection and elegant multi-pointer rewiring.",
    "keyConcepts": [
      {
        "title": "Floyd's Tortoise and Hare Mathematical Proof",
        "description": "Slow pointer advances 1 step; fast pointer advances 2 steps.",
        "bulletPoints": [
          "Distance between slow and fast increases by 1 step per iteration.",
          "If a cycle of length C exists, they must meet within C iterations after slow enters the loop.",
          "To find the start of the loop: reset slow to head and keep fast at intersection point; advance both by 1 step. They meet exactly at the cycle entrance!"
        ]
      },
      {
        "title": "Dummy Head Invariant",
        "description": "Using a sentinel dummy node before the head eliminates all edge cases for insertion, deletion, and list merging.",
        "bulletPoints": [
          "Guarantees that `curr->next` is always well-defined.",
          "Returns `dummy->next` at the end."
        ]
      }
    ],
    "invariants": [
      {
        "title": "Cycle Entry Point Formula",
        "formula": "Distance to loop entry L1 = k*C - L2",
        "explanation": "When slow and fast meet, slow has traveled L1 + L2, fast has traveled L1 + L2 + k*C. Since fast traveled 2 * slow: 2(L1 + L2) = L1 + L2 + k*C => L1 = k*C - L2. Moving one pointer from head and one from intersection at equal speed meets at the cycle entrance.",
        "example": "Head -> 1 -> 2 -> [3 -> 4 -> 5 -> 3]. They meet at 5. Advancing from head (1) and meeting point (5) meets at node 3."
      }
    ],
    "algorithmWalkthroughs": [
      {
        "algorithmName": "In-Place Iterative Reversal",
        "intuition": "Maintain three pointers: prev, curr, and nextNode to reverse arrows without losing reference.",
        "steps": [
          "prev = NULL, curr = head.",
          "While curr != NULL: nextNode = curr->next; curr->next = prev; prev = curr; curr = nextNode.",
          "Return prev as the new head."
        ],
        "pseudocode": "prev = null; curr = head\nwhile curr:\n    nxt = curr.next\n    curr.next = prev\n    prev = curr\n    curr = nxt\nreturn prev"
      }
    ],
    "codeSnippets": [
      {
        "title": "Detect Cycle & Find Cycle Entry (C++)",
        "language": "cpp",
        "code": "struct ListNode { int val; ListNode *next; };\n\nListNode *detectCycle(ListNode *head) {\n    if (!head || !head->next) return nullptr;\n    ListNode *slow = head, *fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) {\n            ListNode *entry = head;\n            while (entry != slow) {\n                entry = entry->next;\n                slow = slow->next;\n            }\n            return entry;\n        }\n    }\n    return nullptr;\n}",
        "explanation": "Floyd's algorithm runs in O(N) time and strictly O(1) space."
      }
    ],
    "complexityMatrix": [
      {
        "operation": "Floyd's Cycle Detection",
        "best": "O(1)",
        "average": "O(N)",
        "worst": "O(N)",
        "space": "O(1)",
        "note": "Zero hash set allocation."
      },
      {
        "operation": "In-Place Reversal",
        "best": "O(N)",
        "average": "O(N)",
        "worst": "O(N)",
        "space": "O(1)",
        "note": "Reverses all next pointers in one pass."
      }
    ],
    "commonPitfalls": [
      "Accessing `fast->next->next` without verifying both `fast != NULL` and `fast->next != NULL`, causing segmentation faults."
    ],
    "interviewTips": [
      "Always initialize a `dummy` node when modifying the head of a linked list (e.g. Remove N-th node from end, Merge Two Sorted Lists)."
    ],
    "interviewQAs": [
      {
        "question": "How do you reverse nodes in k-Group?",
        "companyTags": [
          "Amazon",
          "Microsoft",
          "Meta"
        ],
        "answer": "Check if at least k nodes remain. If yes, reverse the k nodes and recursively or iteratively connect the previous group's tail to the reversed group's head."
      }
    ],
    "quiz": [
      {
        "id": "q6-1",
        "question": "Why does fast advance 2 steps and slow 1 step in cycle detection?",
        "options": [
          "To save memory",
          "Because relative speed is 1 step per iteration, ensuring they cannot hop over each other",
          "To prevent stack overflow",
          "It only works with 2 steps"
        ],
        "correctIndex": 1,
        "explanation": "The distance between slow and fast decreases by exactly 1 step per loop iteration, so fast can never 'jump over' slow inside the loop."
      }
    ]
  },
  {
    "stepId": "step-7",
    "stepNumber": 7,
    "title": "Step 7: Recursion & Backtracking Deep Dive",
    "icon": "\ud83d\udd04",
    "tagline": "Recursion Trees, State-Space Exploration, Subsets, Combinations & N-Queens",
    "readingTime": "24 min read",
    "topics": [
      "Recursion Tree Execution & Call Stack Unwinding",
      "Pick / Don't Pick (Include / Exclude) Subsets Pattern",
      "Permutations: Swapping Invariant vs Frequency Array",
      "Pruning Invariants in Backtracking",
      "N-Queens Problem: Column and Diagonal Bitmask Hashing",
      "Sudoku Solver: 9x9 Board Invariant Validation"
    ],
    "overview": "Recursion is the engine of combinatorial search. Step 7 transitions you from simple linear recursion to multi-branch state-space tree traversal, teaching you how to backtrack, prune dead ends, and solve NP-hard combinatorial puzzles.",
    "keyConcepts": [
      {
        "title": "Include / Exclude (Pick / Don't Pick)",
        "description": "At each index i, we make two recursive choices: include element arr[i] in current subset, or skip it.",
        "bulletPoints": [
          "Generates 2^N subsets (the Power Set).",
          "Base case: index == N.",
          "Used in 0/1 Knapsack, Subset Sum, and Combination Sum."
        ]
      },
      {
        "title": "Backtracking State Restoration",
        "description": "After exploring a choice recursively, undo the modification (pop from array, restore board cell to '.') before returning to the caller.",
        "bulletPoints": [
          "Ensures siblings in the recursion tree explore clean states.",
          "Pruning: If remaining elements cannot reach the target sum, return early."
        ]
      }
    ],
    "invariants": [
      {
        "title": "N-Queens Diagonal Hashing Invariant",
        "formula": "Anti-diagonal index: row + col, Main diagonal index: row - col + (N - 1)",
        "explanation": "All cells on the same anti-diagonal have constant row + col. All cells on the same main diagonal have constant row - col. This allows checking queen safety in O(1) time using boolean lookup arrays.",
        "example": "In 4x4 board, (1, 2) has anti-diag 1+2=3, main-diag 1-2+3=2."
      }
    ],
    "algorithmWalkthroughs": [
      {
        "algorithmName": "N-Queens Backtracking",
        "intuition": "Place one queen per row. If safe across column, anti-diagonal, and main diagonal, place and recurse to row + 1.",
        "steps": [
          "Base case: if row == N, add board configuration to result.",
          "For col in 0 to N - 1:",
          "Check if col, row + col, or row - col + (N - 1) are occupied.",
          "If safe: place 'Q', mark occupied, recurse(row + 1), unmark and backtrack."
        ],
        "pseudocode": "def solve(row):\n    if row == N: ans.append(board); return\n    for col in 0..N-1:\n        if isSafe(row, col):\n            placeQueen(row, col)\n            solve(row + 1)\n            removeQueen(row, col)"
      }
    ],
    "codeSnippets": [
      {
        "title": "N-Queens Solver (C++)",
        "language": "cpp",
        "code": "#include <vector>\n#include <string>\nusing namespace std;\n\nvoid solveNQueens(int row, int n, vector<string>& board, vector<vector<string>>& ans,\n                 vector<bool>& cols, vector<bool>& d1, vector<bool>& d2) {\n    if (row == n) { ans.push_back(board); return; }\n    for (int col = 0; col < n; col++) {\n        if (!cols[col] && !d1[row + col] && !d2[row - col + n - 1]) {\n            board[row][col] = 'Q';\n            cols[col] = d1[row + col] = d2[row - col + n - 1] = true;\n            solveNQueens(row + 1, n, board, ans, cols, d1, d2);\n            board[row][col] = '.';\n            cols[col] = d1[row + col] = d2[row - col + n - 1] = false;\n        }\n    }\n}",
        "explanation": "O(1) safety checks using boolean hash vectors for diagonals and columns."
      }
    ],
    "complexityMatrix": [
      {
        "operation": "Subsets Generation",
        "best": "O(2^N)",
        "average": "O(2^N)",
        "worst": "O(2^N)",
        "space": "O(N)",
        "note": "2^N subsets of length up to N."
      },
      {
        "operation": "Permutations Generation",
        "best": "O(N! * N)",
        "average": "O(N! * N)",
        "worst": "O(N! * N)",
        "space": "O(N)",
        "note": "N! permutations."
      },
      {
        "operation": "N-Queens Backtracking",
        "best": "O(N!)",
        "average": "O(N!)",
        "worst": "O(N!)",
        "space": "O(N^2)",
        "note": "Pruned recursion tree."
      }
    ],
    "commonPitfalls": [
      "Forgetting to undo the state (backtrack) before returning from recursive call, corrupting the board for sister branches."
    ],
    "interviewTips": [
      "Draw the recursion tree on the whiteboard for N=3 to clearly show include/exclude branches."
    ],
    "interviewQAs": [
      {
        "question": "What is the difference between Combination Sum I and Combination Sum II?",
        "companyTags": [
          "Google",
          "Amazon"
        ],
        "answer": "Combination Sum I allows each element to be chosen repeatedly (infinite supply). Combination Sum II requires each number to be used only once and the input contains duplicate numbers; we must sort the array and skip duplicate elements `if (i > start && arr[i] == arr[i - 1]) continue` to avoid duplicate combination sets."
      }
    ],
    "quiz": [
      {
        "id": "q7-1",
        "question": "How many total subsets exist for an array of size N?",
        "options": [
          "N^2",
          "2^N",
          "N!",
          "2 * N"
        ],
        "correctIndex": 1,
        "explanation": "Every element has 2 choices (include or exclude), yielding 2 * 2 * ... * 2 = 2^N total subsets."
      }
    ]
  },
  {
    "stepId": "step-8",
    "stepNumber": 8,
    "title": "Step 8: Bit Manipulation & Binary Math",
    "icon": "\ud83d\udd22",
    "tagline": "Two's Complement, Bitwise Tricks, Brian Kernighan, Power Set & XOR Invariants",
    "readingTime": "16 min read",
    "topics": [
      "Two's Complement Binary Representation & Sign Bit",
      "Bitwise Operators (&, |, ^, ~, <<, >>)",
      "Checking, Setting, Clearing & Toggling the i-th Bit",
      "Brian Kernighan's Algorithm for Counting Set Bits",
      "XOR Invariants: Self-Cancellation and Missing Element Tricks",
      "Generating Power Set via Bitmasking from 0 to (1 << N) - 1"
    ],
    "overview": "Computers run on bits. Bit manipulation allows solving algorithmic challenges at maximum hardware speed with O(1) space, bypassing memory overhead through pure ALU bitwise operations.",
    "keyConcepts": [
      {
        "title": "Brian Kernighan's Algorithm",
        "description": "Subtracting 1 from a number flips all bits from the rightmost set bit inclusive.",
        "bulletPoints": [
          "`n & (n - 1)` clears the lowest set bit in exactly one operation.",
          "Counting set bits runs in O(number of set bits), not O(32).",
          "Checking power of 2: `n > 0 && (n & (n - 1)) == 0`."
        ]
      },
      {
        "title": "XOR Cancellation Invariant",
        "description": "XOR represents addition without carry.",
        "bulletPoints": [
          "x ^ x = 0 (self-cancellation).",
          "x ^ 0 = x (identity).",
          "XOR is commutative and associative: order of operations does not matter.",
          "Find single number among pairs: XOR all elements in O(N) time and O(1) space."
        ]
      }
    ],
    "invariants": [
      {
        "title": "Rightmost Set Bit Extraction",
        "formula": "lowest_set_bit = n & (-n)",
        "explanation": "In Two's Complement, -n = ~n + 1. Performing bitwise AND between n and -n isolates only the lowest set bit as a power of 2.",
        "example": "12 (1100 in binary) -> -12 is (~12 + 1) = 0011 + 1 = 0100. 1100 & 0100 = 0100 (4)."
      }
    ],
    "algorithmWalkthroughs": [
      {
        "algorithmName": "Single Number (Find Element Appearing Once)",
        "intuition": "XOR every element together. Duplicates cancel out to 0, leaving only the unique element.",
        "steps": [
          "Initialize xorSum = 0.",
          "For each number x in array: xorSum ^= x.",
          "Return xorSum."
        ],
        "pseudocode": "xorSum = 0\nfor x in nums:\n    xorSum ^= x\nreturn xorSum"
      }
    ],
    "codeSnippets": [
      {
        "title": "Essential Bit Manipulation Operations (C++)",
        "language": "cpp",
        "code": "bool isBitSet(int n, int i)   { return (n & (1 << i)) != 0; }\nint setBit(int n, int i)      { return n | (1 << i); }\nint clearBit(int n, int i)    { return n & ~(1 << i); }\nint toggleBit(int n, int i)   { return n ^ (1 << i); }\nbool isPowerOfTwo(int n)      { return n > 0 && (n & (n - 1)) == 0; }\n\n// Brian Kernighan Count Set Bits\nint countSetBits(int n) {\n    int count = 0;\n    while (n > 0) {\n        n &= (n - 1);\n        count++;\n    }\n    return count;\n}",
        "explanation": "Hardware-level bit manipulation primitives executing in single clock cycles."
      }
    ],
    "complexityMatrix": [
      {
        "operation": "Check/Set/Clear/Toggle Bit",
        "best": "O(1)",
        "average": "O(1)",
        "worst": "O(1)",
        "space": "O(1)",
        "note": "Single CPU instruction."
      },
      {
        "operation": "Brian Kernighan Count",
        "best": "O(1)",
        "average": "O(K)",
        "worst": "O(32)",
        "space": "O(1)",
        "note": "K is the number of set bits."
      }
    ],
    "commonPitfalls": [
      "Operator precedence: Bitwise operators (`&`, `|`, `^`) have LOWER precedence than comparison operators (`==`, `!=`). Always wrap bit operations in parentheses: `(n & (1 << i)) != 0`."
    ],
    "interviewTips": [
      "Whenever asked for subsets generation and N <= 20, mention bitmasking `for mask in 0 .. (1 << N) - 1` as the cleanest O(1) space iterative solution."
    ],
    "interviewQAs": [
      {
        "question": "How do you find the two numbers that appear only once when all other numbers appear twice?",
        "companyTags": [
          "Amazon",
          "Google",
          "Meta"
        ],
        "answer": "1. XOR all numbers; result is X = a ^ b.\n2. Find any set bit in X (e.g. `X & (-X)`), which indicates a position where a and b differ.\n3. Partition the array into two buckets: those with that bit set, and those with it unset.\n4. XOR each bucket independently; the duplicates in each bucket cancel, revealing a and b."
      }
    ],
    "quiz": [
      {
        "id": "q8-1",
        "question": "What does the expression `n & (n - 1)` evaluate to?",
        "options": [
          "Clears the lowest set bit of n",
          "Sets the lowest unset bit of n",
          "Checks if n is odd",
          "Inverts all bits of n"
        ],
        "correctIndex": 0,
        "explanation": "n & (n - 1) clears the rightmost set bit."
      }
    ]
  },
  {
    "stepId": "step-9",
    "stepNumber": 9,
    "title": "Step 9: Stacks & Queues (Monotonic Mastery)",
    "icon": "\ud83d\udcda",
    "tagline": "Monotonic Stack Invariant, Next Greater Element, Histogram & Sliding Window Maximum",
    "readingTime": "24 min read",
    "topics": [
      "LIFO Stack vs FIFO Queue Invariants",
      "Infix, Prefix, and Postfix Operator Precedence & Evaluation",
      "Monotonic Stack Invariant: Strictly Increasing & Decreasing",
      "Next Greater Element & Previous Smaller Element Pattern",
      "Largest Rectangle in Histogram (O(N) Monotonic Geometry)",
      "Sliding Window Maximum with Monotonic Deque"
    ],
    "overview": "Stacks and Queues manage ordered data under strict access constraints. The Monotonic Stack is one of the most powerful interview patterns, reducing O(N^2) quadratic nested searches for next/previous elements into single-pass linear time.",
    "keyConcepts": [
      {
        "title": "Monotonic Stack Invariant",
        "description": "A stack where elements are kept in strictly increasing or strictly decreasing order.",
        "bulletPoints": [
          "Monotonic Decreasing: Used for Next Greater Element (NGE). When a larger element arrives, it pops smaller elements and serves as their NGE.",
          "Monotonic Increasing: Used for Next Smaller Element (NSE) and Histogram heights.",
          "Every element is pushed once and popped at most once, guaranteeing strictly O(N) amortized time."
        ]
      },
      {
        "title": "Largest Rectangle in Histogram",
        "description": "For each bar i, its maximum rectangular area extends left until the Previous Smaller Element and right until the Next Smaller Element.",
        "bulletPoints": [
          "`width = (next_smaller - prev_smaller - 1)`.",
          "`area = height * width`.",
          "Computed in a single pass with a monotonic increasing stack."
        ]
      }
    ],
    "invariants": [
      {
        "title": "Histogram Width Invariant",
        "formula": "width = (i - stack.top() - 1) after popping the current height",
        "explanation": "When popped, the bar at the top of the stack is strictly greater than the current bar (next smaller) and greater than the new top (previous smaller).",
        "example": "Heights [2, 1, 5, 6, 2, 3] -> Bar of height 5 bounded between index 1 and 4 has width 4 - 1 - 1 = 2 -> Area 5 * 2 = 10."
      }
    ],
    "algorithmWalkthroughs": [
      {
        "algorithmName": "Next Greater Element (NGE)",
        "intuition": "Traverse array from right to left. Maintain stack of potential greater candidates in decreasing order.",
        "steps": [
          "Loop from n - 1 down to 0.",
          "While stack is not empty and stack.top() <= arr[i]: pop stack.",
          "If stack is empty: NGE is -1; else NGE is stack.top().",
          "Push arr[i] to stack."
        ],
        "pseudocode": "for i in n-1 down to 0:\n    while stack and stack.top() <= arr[i]: stack.pop()\n    ans[i] = stack.top() if stack else -1\n    stack.push(arr[i])"
      }
    ],
    "codeSnippets": [
      {
        "title": "Largest Rectangle in Histogram (C++)",
        "language": "cpp",
        "code": "#include <vector>\n#include <stack>\nusing namespace std;\n\nint largestRectangleArea(const vector<int>& heights) {\n    stack<int> st;\n    int maxArea = 0, n = heights.size();\n    for (int i = 0; i <= n; i++) {\n        int h = (i == n) ? 0 : heights[i];\n        while (!st.empty() && heights[st.top()] >= h) {\n            int height = heights[st.top()];\n            st.pop();\n            int width = st.empty() ? i : (i - st.top() - 1);\n            maxArea = max(maxArea, height * width);\n        }\n        st.push(i);\n    }\n    return maxArea;\n}",
        "explanation": "Appends a dummy height 0 at index n to force flush all remaining bars from the stack."
      }
    ],
    "complexityMatrix": [
      {
        "operation": "Next Greater Element",
        "best": "O(N)",
        "average": "O(N)",
        "worst": "O(N)",
        "space": "O(N)",
        "note": "Each element pushed and popped at most once."
      },
      {
        "operation": "Largest Rectangle Histogram",
        "best": "O(N)",
        "average": "O(N)",
        "worst": "O(N)",
        "space": "O(N)",
        "note": "Single pass monotonic stack."
      }
    ],
    "commonPitfalls": [
      "In circular arrays (NGE II), forgetting to iterate 2N times modulo N."
    ],
    "interviewTips": [
      "Whenever a problem asks for 'nearest larger/smaller value to left/right', think Monotonic Stack immediately."
    ],
    "interviewQAs": [
      {
        "question": "How do you implement Min Stack with O(1) time and O(1) extra space?",
        "companyTags": [
          "Amazon",
          "Google",
          "Bloomberg"
        ],
        "answer": "Store encoded values. When pushing x < minVal, push `2 * x - minVal` (which is strictly less than x) and update minVal = x. When popping, if top < minVal, recover previous minVal as `2 * minVal - top`."
      }
    ],
    "quiz": [
      {
        "id": "q9-1",
        "question": "What is the amortized time complexity of processing an array of size N with a monotonic stack?",
        "options": [
          "O(N^2)",
          "O(N log N)",
          "O(N)",
          "O(1)"
        ],
        "correctIndex": 2,
        "explanation": "Every element is pushed to the stack exactly once and popped at most once, bounding total operations to 2N = O(N)."
      }
    ]
  },
  {
    "stepId": "step-10",
    "stepNumber": 10,
    "title": "Step 10: Sliding Window & Two Pointer Invariants",
    "icon": "\ud83e\ude9f",
    "tagline": "Dynamic Windows, Expanding/Contracting Invariants & The 'At Most K' Technique",
    "readingTime": "20 min read",
    "topics": [
      "Fixed Window vs Dynamic Window Invariants",
      "Sliding Window Expansion (right) & Contraction (left)",
      "Longest Substring Without Repeating Characters",
      "The 'At Most K' Subarray Count Trick: f(k) - f(k - 1)",
      "Minimum Window Substring Character Frequency Invariant"
    ],
    "overview": "Sliding window transforms O(N^2) brute forces into O(N) linear time by dynamically expanding and shrinking window boundaries [left .. right], preserving invariants as the right pointer advances.",
    "keyConcepts": [
      {
        "title": "Dynamic Sliding Window Pattern",
        "description": "Right pointer expands the window to include elements; Left pointer contracts the window when an invariant is violated.",
        "bulletPoints": [
          "Right expands: Add arr[right] to window frequency state.",
          "While window is invalid: Remove arr[left] from state, left++.",
          "Update answer (e.g. maxLen = max(maxLen, right - left + 1))."
        ]
      },
      {
        "title": "The 'At Most K' Mathematical Trick",
        "description": "Directly counting subarrays with 'Exactly K' distinct elements is hard. Instead compute `count(atMost(K)) - count(atMost(K - 1))`.",
        "bulletPoints": [
          "Number of valid subarrays ending at index right is `right - left + 1`.",
          "Subtracting yields the exact count with zero duplicate generation."
        ]
      }
    ],
    "invariants": [
      {
        "title": "Subarray Count by Window Right Invariant",
        "formula": "subarrays_ending_at_right = right - left + 1",
        "explanation": "If window [left .. right] satisfies the constraint, then every subarray starting from left, left+1, ... right and ending at right is also valid.",
        "example": "If [left..right] is [2, 3, 5], valid subarrays ending at 5 are [5], [3, 5], [2, 3, 5] (total 3 = 2 - 0 + 1)."
      }
    ],
    "algorithmWalkthroughs": [
      {
        "algorithmName": "Longest Substring Without Repeating Characters",
        "intuition": "Maintain last seen index of every character. If repeated character seen within current window, jump left pointer to lastIndex + 1.",
        "steps": [
          "Initialize left = 0, maxLen = 0, lastIndex map with -1.",
          "For right = 0 to n - 1:",
          "If char s[right] exists in map and lastIndex >= left: left = lastIndex + 1.",
          "Update map[s[right]] = right.",
          "maxLen = max(maxLen, right - left + 1)."
        ],
        "pseudocode": "left = 0\nfor right in 0..n-1:\n    if s[right] in map and map[s[right]] >= left:\n        left = map[s[right]] + 1\n    map[s[right]] = right\n    maxLen = max(maxLen, right - left + 1)"
      }
    ],
    "codeSnippets": [
      {
        "title": "Longest Substring Without Repeating Characters (C++)",
        "language": "cpp",
        "code": "#include <string>\n#include <vector>\nusing namespace std;\n\nint lengthOfLongestSubstring(string s) {\n    vector<int> lastIdx(256, -1);\n    int left = 0, maxLen = 0;\n    for (int right = 0; right < s.size(); right++) {\n        if (lastIdx[s[right]] >= left) left = lastIdx[s[right]] + 1;\n        lastIdx[s[right]] = right;\n        maxLen = max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}",
        "explanation": "Direct array index lookup provides O(N) runtime with O(1) 256-byte ASCII memory."
      }
    ],
    "complexityMatrix": [
      {
        "operation": "Dynamic Sliding Window",
        "best": "O(N)",
        "average": "O(N)",
        "worst": "O(N)",
        "space": "O(1) to O(K)",
        "note": "Left and right pointers each advance at most N times."
      }
    ],
    "commonPitfalls": [
      "Forgetting to check `map[char] >= left` before advancing left pointer, which can cause left to jump backward."
    ],
    "interviewTips": [
      "Whenever asked for 'Subarray with exactly K elements', immediately explain the 'At most K minus At most K-1' trick."
    ],
    "interviewQAs": [
      {
        "question": "Why is the time complexity of sliding window O(N) when there is a while loop inside a for loop?",
        "companyTags": [
          "Meta",
          "Google"
        ],
        "answer": "The right pointer increments N times across the entire algorithm. The left pointer also only increments forward and can move at most N times across all while-loop iterations combined. Total pointer moves = 2N = O(N)."
      }
    ],
    "quiz": [
      {
        "id": "q10-1",
        "question": "How do you calculate subarrays with EXACTLY K distinct elements using sliding window?",
        "options": [
          "AtMost(K) + AtMost(K - 1)",
          "AtMost(K) - AtMost(K - 1)",
          "AtLeast(K) - AtLeast(K - 1)",
          "AtMost(K) * AtMost(K - 1)"
        ],
        "correctIndex": 1,
        "explanation": "AtMost(K) includes subsets with 1..K distinct elements. Subtracting AtMost(K-1) cancels all subsets with 1..K-1 distinct elements, leaving exactly K."
      }
    ]
  },
  {
    "stepId": "step-11",
    "stepNumber": 11,
    "title": "Step 11: Heaps & Priority Queues",
    "icon": "\ud83c\udfd4\ufe0f",
    "tagline": "Complete Binary Trees, Heapify Proof, Top-K Elements & Dual Heap Median",
    "readingTime": "22 min read",
    "topics": [
      "Complete Binary Tree Array Representation (2i + 1, 2i + 2)",
      "Heap Invariant: Min-Heap vs Max-Heap",
      "Heapify Algorithm & O(N) Build Heap Mathematical Proof",
      "Top-K Frequent Elements using Min-Heap",
      "Continuous Median Finding with Dual Heaps (Max-Heap + Min-Heap)"
    ],
    "overview": "Heaps provide logarithmic insertion and deletion while guaranteeing immediate O(1) access to the maximum or minimum element.",
    "keyConcepts": [
      {
        "title": "Complete Binary Tree Array Invariant",
        "description": "For any node at index i: Left Child = 2*i + 1, Right Child = 2*i + 2, Parent = (i - 1) / 2.",
        "bulletPoints": [
          "No pointer overhead; stored in a flat contiguous array.",
          "Guaranteed height h = floor(log2(N))."
        ]
      },
      {
        "title": "O(N) Build Heap Proof",
        "description": "Building a heap by calling heapify from index n/2 down to 0 takes O(N) time, not O(N log N).",
        "bulletPoints": [
          "Nodes at height h have at most ceil(N / 2^(h+1)) elements.",
          "Work = sum(h / 2^h) for h=0 to infty. Since sum(h / 2^h) = 2, total cost = O(N)."
        ]
      }
    ],
    "invariants": [
      {
        "title": "Dual Heap Median Invariant",
        "formula": "max_heap.size() == min_heap.size() OR max_heap.size() == min_heap.size() + 1",
        "explanation": "Max-heap holds lower half of numbers; Min-heap holds upper half. If total size is odd, median is max_heap.top(). If even, median is (max_heap.top() + min_heap.top()) / 2.",
        "example": "Stream [5, 15, 1, 3] -> lower [3, 1], upper [5, 15]. Median = (3 + 5)/2 = 4."
      }
    ],
    "algorithmWalkthroughs": [
      {
        "algorithmName": "Find Median in a Data Stream",
        "intuition": "Split numbers into smaller half (Max-Heap) and larger half (Min-Heap). Balance sizes after each insertion.",
        "steps": [
          "Push num to maxHeap.",
          "Transfer top of maxHeap to minHeap to preserve ordering invariant.",
          "If minHeap.size() > maxHeap.size(), balance by moving top of minHeap to maxHeap.",
          "Return top of maxHeap (odd) or average of both tops (even)."
        ],
        "pseudocode": "maxHeap.push(x)\nminHeap.push(maxHeap.pop())\nif minHeap.size() > maxHeap.size():\n    maxHeap.push(minHeap.pop())"
      }
    ],
    "codeSnippets": [
      {
        "title": "MedianFinder Implementation (C++)",
        "language": "cpp",
        "code": "#include <queue>\nusing namespace std;\n\nclass MedianFinder {\n    priority_queue<int> maxHeap; // lower half\n    priority_queue<int, vector<int>, greater<int>> minHeap; // upper half\npublic:\n    void addNum(int num) {\n        maxHeap.push(num);\n        minHeap.push(maxHeap.top());\n        maxHeap.pop();\n        if (minHeap.size() > maxHeap.size()) {\n            maxHeap.push(minHeap.top());\n            minHeap.pop();\n        }\n    }\n    double findMedian() {\n        if (maxHeap.size() > minHeap.size()) return maxHeap.top();\n        return (maxHeap.top() + minHeap.top()) / 2.0;\n    }\n};",
        "explanation": "Maintains median in O(log N) insertion and O(1) query time."
      }
    ],
    "complexityMatrix": [
      {
        "operation": "Heap Insertion (Push)",
        "best": "O(1)",
        "average": "O(log N)",
        "worst": "O(log N)",
        "space": "O(1)",
        "note": "Percolate up."
      },
      {
        "operation": "Heap Deletion (Pop)",
        "best": "O(1)",
        "average": "O(log N)",
        "worst": "O(log N)",
        "space": "O(1)",
        "note": "Percolate down."
      },
      {
        "operation": "Build Heap (Bottom-up)",
        "best": "O(N)",
        "average": "O(N)",
        "worst": "O(N)",
        "space": "O(1)",
        "note": "Linear time mathematical proof."
      }
    ],
    "commonPitfalls": [
      "In C++, `priority_queue<int>` is a MAX-heap by default. For MIN-heap, must specify `priority_queue<int, vector<int>, greater<int>>`."
    ],
    "interviewTips": [
      "To find K-th largest: use MIN-heap of size K. To find K-th smallest: use MAX-heap of size K."
    ],
    "interviewQAs": [
      {
        "question": "Why is building a binary heap O(N) instead of O(N log N)?",
        "companyTags": [
          "Google",
          "Microsoft"
        ],
        "answer": "Most nodes are near the leaves where height is small (N/2 leaves have height 0, N/4 nodes have height 1, etc.). Summing work across levels yields a converging geometric series proportional to N."
      }
    ],
    "quiz": [
      {
        "id": "q11-1",
        "question": "What is the time complexity to find the median in a stream using dual heaps?",
        "options": [
          "O(1) insert, O(N) query",
          "O(log N) insert, O(1) query",
          "O(N) insert, O(1) query",
          "O(1) insert, O(log N) query"
        ],
        "correctIndex": 1,
        "explanation": "Dual heaps balance in O(log N) per insert, allowing O(1) median reading from tops."
      }
    ]
  },
  {
    "stepId": "step-12",
    "stepNumber": 12,
    "title": "Step 12: Greedy Algorithms & Exchange Arguments",
    "icon": "\ud83d\udcb0",
    "tagline": "Greedy Choice Property, Optimal Substructure, Activity Selection & Jump Game",
    "readingTime": "18 min read",
    "topics": [
      "Greedy Choice Property & Proof by Contradiction / Exchange Argument",
      "N Meetings in One Room (Sort by End Time Invariant)",
      "Fractional Knapsack (Value-to-Weight Ratio Sorting)",
      "Non-overlapping Intervals & Minimum Platforms for Trains",
      "Jump Game I & II: Max Reachable Boundary Invariant"
    ],
    "overview": "Greedy algorithms make the locally optimal choice at each step hoping it leads to a globally optimal solution. Proving correctness requires understanding the Exchange Argument.",
    "keyConcepts": [
      {
        "title": "Activity Selection (N Meetings)",
        "description": "Always pick the meeting that finishes earliest to leave the maximum possible time for future meetings.",
        "bulletPoints": [
          "Sort meetings by end time.",
          "If next meeting start time > current meeting end time, schedule it."
        ]
      },
      {
        "title": "Jump Game Reachability Invariant",
        "description": "Maintain `maxReach = max(maxReach, i + nums[i])` as you scan index by index.",
        "bulletPoints": [
          "If index i > maxReach, position i is unreachable; return false.",
          "If maxReach >= n - 1, destination is reachable; return true."
        ]
      }
    ],
    "invariants": [
      {
        "title": "Greedy Exchange Invariant",
        "formula": "Any optimal solution can be transformed into the greedy solution without reducing total value",
        "explanation": "If an optimal schedule O picks an activity finishing later than greedy choice G, replacing O's choice with G leaves at least as much remaining time.",
        "example": "Meeting ending at 2pm is strictly superior to meeting ending at 4pm if both start after current time."
      }
    ],
    "algorithmWalkthroughs": [
      {
        "algorithmName": "Jump Game I",
        "intuition": "Greedily update the furthest boundary reachable from any explored position.",
        "steps": [
          "maxReach = 0.",
          "For i in 0 to n - 1:",
          "If i > maxReach: return false.",
          "maxReach = max(maxReach, i + nums[i]).",
          "Return true."
        ],
        "pseudocode": "maxReach = 0\nfor i in 0..n-1:\n    if i > maxReach: return false\n    maxReach = max(maxReach, i + nums[i])\nreturn true"
      }
    ],
    "codeSnippets": [
      {
        "title": "Jump Game & N Meetings (C++)",
        "language": "cpp",
        "code": "#include <vector>\n#include <algorithm>\nusing namespace std;\n\nbool canJump(const vector<int>& nums) {\n    int maxReach = 0;\n    for (int i = 0; i < nums.size(); i++) {\n        if (i > maxReach) return false;\n        maxReach = max(maxReach, i + nums[i]);\n    }\n    return true;\n}",
        "explanation": "O(N) time and O(1) space reachability tracking."
      }
    ],
    "complexityMatrix": [
      {
        "operation": "Jump Game I",
        "best": "O(N)",
        "average": "O(N)",
        "worst": "O(N)",
        "space": "O(1)",
        "note": "Single pass greedy reach."
      },
      {
        "operation": "N Meetings in One Room",
        "best": "O(N log N)",
        "average": "O(N log N)",
        "worst": "O(N log N)",
        "space": "O(1)",
        "note": "Bounded by sorting by end times."
      }
    ],
    "commonPitfalls": [
      "Attempting to use Greedy on 0/1 Knapsack (where items cannot be divided); 0/1 Knapsack requires Dynamic Programming!"
    ],
    "interviewTips": [
      "Whenever proposing Greedy, briefly explain WHY the greedy choice does not cut off the optimal solution."
    ],
    "interviewQAs": [
      {
        "question": "Why does Fractional Knapsack work with Greedy while 0/1 Knapsack fails?",
        "companyTags": [
          "Amazon",
          "Microsoft"
        ],
        "answer": "In Fractional Knapsack, we can take fractions of items, so picking the item with the highest value-to-weight ratio is always optimal. In 0/1 Knapsack, taking a high-ratio item may leave empty space that cannot be filled, causing suboptimal totals."
      }
    ],
    "quiz": [
      {
        "id": "q12-1",
        "question": "In the Activity Selection problem, by what criteria must activities be sorted?",
        "options": [
          "Start Time",
          "Duration",
          "End Time",
          "Profit"
        ],
        "correctIndex": 2,
        "explanation": "Sorting by end time ensures we free up the room as early as possible."
      }
    ]
  },
  {
    "stepId": "step-13",
    "stepNumber": 13,
    "title": "Step 13: Binary Trees (Traversals & Properties)",
    "icon": "\ud83c\udf32",
    "tagline": "DFS, BFS, Diameter, LCA, Views & Morris Traversal O(1) Space",
    "readingTime": "24 min read",
    "topics": [
      "Tree Terminology: Depth, Height, Balanced & Degenerate Trees",
      "DFS: Inorder, Preorder, Postorder (Recursive & Stack Iterative)",
      "BFS: Level Order Traversal with Queue",
      "Diameter of Tree & Maximum Path Sum Invariants",
      "Lowest Common Ancestor (LCA) in Binary Tree",
      "Morris Traversal: Inorder Traversal in O(1) Space via Threaded Trees"
    ],
    "overview": "Binary Trees introduce hierarchical branching. Mastering trees requires thinking recursively about left and right subtrees and understanding threaded tree Morris traversal.",
    "keyConcepts": [
      {
        "title": "Lowest Common Ancestor (LCA) Invariant",
        "description": "The LCA of nodes p and q is the deepest node that has both p and q as descendants.",
        "bulletPoints": [
          "If root is p or q: return root.",
          "Recurse left and right.",
          "If both left and right return non-null: root is the LCA split point!",
          "If only one side returns non-null: return that non-null node."
        ]
      },
      {
        "title": "Morris Inorder Traversal (O(1) Space)",
        "description": "Uses Threaded Binary Trees: links the rightmost node of the left subtree to current root before traversing left.",
        "bulletPoints": [
          "Visits all nodes in O(N) time with strictly O(1) extra space.",
          "Restores original tree structure by removing threads on the second visit."
        ]
      }
    ],
    "invariants": [
      {
        "title": "Tree Diameter Invariant",
        "formula": "diameter = max(diameter, left_height + right_height)",
        "explanation": "The longest path passing through any node is the sum of the heights of its left and right subtrees. Diameter is the maximum such sum across all nodes.",
        "example": "Left height 3, right height 4 -> Longest path through this node is 7."
      }
    ],
    "algorithmWalkthroughs": [
      {
        "algorithmName": "Lowest Common Ancestor (LCA)",
        "intuition": "Postorder-style recursion: return node when found. If node receives answers from both subtrees, it is the LCA.",
        "steps": [
          "If root is null or root == p or root == q: return root.",
          "left = lowestCommonAncestor(root.left, p, q).",
          "right = lowestCommonAncestor(root.right, p, q).",
          "If left and right are both non-null: return root.",
          "Return left if left != null else right."
        ],
        "pseudocode": "def lca(root, p, q):\n    if not root or root == p or root == q: return root\n    left = lca(root.left, p, q)\n    right = lca(root.right, p, q)\n    if left and right: return root\n    return left or right"
      }
    ],
    "codeSnippets": [
      {
        "title": "LCA in Binary Tree (C++)",
        "language": "cpp",
        "code": "struct TreeNode { int val; TreeNode *left; TreeNode *right; };\n\nTreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    if (!root || root == p || root == q) return root;\n    TreeNode* left = lowestCommonAncestor(root->left, p, q);\n    TreeNode* right = lowestCommonAncestor(root->right, p, q);\n    if (left && right) return root;\n    return left ? left : right;\n}",
        "explanation": "O(N) time and O(H) recursive stack space."
      }
    ],
    "complexityMatrix": [
      {
        "operation": "DFS / BFS Traversal",
        "best": "O(N)",
        "average": "O(N)",
        "worst": "O(N)",
        "space": "O(H) to O(N)",
        "note": "H is tree height (log N balanced, N skewed)."
      },
      {
        "operation": "Morris Inorder Traversal",
        "best": "O(N)",
        "average": "O(N)",
        "worst": "O(N)",
        "space": "O(1)",
        "note": "Threaded binary tree."
      }
    ],
    "commonPitfalls": [
      "Confusing Binary Tree with Binary Search Tree (BST). In a generic Binary Tree, you must search both left and right branches."
    ],
    "interviewTips": [
      "Mention Morris Traversal if an interviewer asks: 'Can you traverse a binary tree without recursion and without a stack?'"
    ],
    "interviewQAs": [
      {
        "question": "Can you construct a unique binary tree given Preorder and Postorder traversals?",
        "companyTags": [
          "Google",
          "Amazon"
        ],
        "answer": "No. Preorder and Postorder alone cannot distinguish between a single left child or a single right child. To construct a unique binary tree, you MUST have Inorder traversal combined with either Preorder or Postorder."
      }
    ],
    "quiz": [
      {
        "id": "q13-1",
        "question": "What is the auxiliary space complexity of Morris Inorder Traversal?",
        "options": [
          "O(N)",
          "O(log N)",
          "O(1)",
          "O(H)"
        ],
        "correctIndex": 2,
        "explanation": "Morris traversal modifies tree pointers temporarily to traverse in O(1) extra space without recursion or stack."
      }
    ]
  },
  {
    "stepId": "step-14",
    "stepNumber": 14,
    "title": "Step 14: Binary Search Trees (BST Invariants)",
    "icon": "\u2696\ufe0f",
    "tagline": "BST Invariant, Inorder Sortedness, Deletion Cases, Floor/Ceil & Two Sum",
    "readingTime": "20 min read",
    "topics": [
      "BST Invariant: Left < Root < Right",
      "Inorder Traversal of BST is Strictly Sorted Invariant",
      "Search, Insert, and Deletion Cases (Leaf, 1 Child, 2 Children)",
      "Floor and Ceil in BST in O(H) Time",
      "Validating BST via [min, max] Range Constraints",
      "BST Iterator with O(H) Memory"
    ],
    "overview": "Binary Search Trees combine the fast search of binary search with the dynamic insertion and deletion of linked structures.",
    "keyConcepts": [
      {
        "title": "BST Invariant",
        "description": "For any node X, all values in X's left subtree are strictly < X.val, and all values in X's right subtree are strictly > X.val.",
        "bulletPoints": [
          "Inorder traversal always yields elements in strictly ascending order.",
          "Search time is O(H). In balanced BST (AVL, Red-Black), H = log2(N)."
        ]
      },
      {
        "title": "BST Node Deletion Cases",
        "description": "Deleting node X has 3 cases:",
        "bulletPoints": [
          "Case 1: X is a leaf -> Simply delete node.",
          "Case 2: X has 1 child -> Link parent of X directly to X's child.",
          "Case 3: X has 2 children -> Replace X's value with its Inorder Successor (smallest node in right subtree) and recursively delete successor."
        ]
      }
    ],
    "invariants": [
      {
        "title": "BST Validation Range Invariant",
        "formula": "min_allowed < node.val < max_allowed",
        "explanation": "Checking `left < root && right > root` locally is insufficient. A valid BST requires every node to respect inherited ancestral bounds.",
        "example": "Root 10 -> Left child 5's right child cannot exceed 10."
      }
    ],
    "algorithmWalkthroughs": [
      {
        "algorithmName": "Validate Binary Search Tree",
        "intuition": "Pass valid range `[minVal, maxVal]` down during recursion.",
        "steps": [
          "If node is null: return true.",
          "If node.val <= minVal or node.val >= maxVal: return false.",
          "Recurse left with range `[minVal, node.val]`.",
          "Recurse right with range `[node.val, maxVal]`."
        ],
        "pseudocode": "def isValid(node, minV, maxV):\n    if not node: return true\n    if node.val <= minV or node.val >= maxV: return false\n    return isValid(node.left, minV, node.val) and isValid(node.right, node.val, maxV)"
      }
    ],
    "codeSnippets": [
      {
        "title": "Validate BST (C++)",
        "language": "cpp",
        "code": "#include <climits>\nstruct TreeNode { int val; TreeNode *left; TreeNode *right; };\n\nbool isValidBST(TreeNode* root, long long minVal = LLONG_MIN, long long maxVal = LLONG_MAX) {\n    if (!root) return true;\n    if (root->val <= minVal || root->val >= maxVal) return false;\n    return isValidBST(root->left, minVal, root->val) && isValidBST(root->right, root->val, maxVal);\n}",
        "explanation": "Using long long bounds handles INT_MIN and INT_MAX node values."
      }
    ],
    "complexityMatrix": [
      {
        "operation": "BST Search / Insert",
        "best": "O(log N)",
        "average": "O(log N)",
        "worst": "O(N)",
        "space": "O(H)",
        "note": "Worst case O(N) when tree degrades into a linked list."
      }
    ],
    "commonPitfalls": [
      "Checking only immediate children `node.left < node && node.right > node` instead of ancestral bounds."
    ],
    "interviewTips": [
      "Remember: Inorder traversal of a BST is ALWAYS sorted. Use this property for K-th Smallest, Two Sum in BST, and BST validation."
    ],
    "interviewQAs": [
      {
        "question": "What is the Inorder Successor in a BST and how do you find it?",
        "companyTags": [
          "Amazon",
          "Microsoft"
        ],
        "answer": "The Inorder Successor is the node with the smallest key strictly greater than current node. If right subtree exists, it is the leftmost node in right subtree. If no right subtree, it is the lowest ancestor whose left subtree contains the node."
      }
    ],
    "quiz": [
      {
        "id": "q14-1",
        "question": "Which traversal of a Binary Search Tree produces elements in sorted order?",
        "options": [
          "Preorder",
          "Inorder",
          "Postorder",
          "Level Order"
        ],
        "correctIndex": 1,
        "explanation": "Inorder traversal (Left, Root, Right) outputs elements in strictly increasing sorted order."
      }
    ]
  },
  {
    "stepId": "step-15",
    "stepNumber": 15,
    "title": "Step 15: Graphs Mastery (Traversals, Topo, Shortest Paths & DSU)",
    "icon": "\ud83d\udd78\ufe0f",
    "tagline": "BFS/DFS, Topological Sort, Dijkstra, Bellman-Ford, Floyd-Warshall, Prim & Disjoint Set Union",
    "readingTime": "28 min read",
    "topics": [
      "Graph Representation: Adjacency List vs Adjacency Matrix",
      "BFS (Level-Order / Shortest Path in Unit Graph) & DFS",
      "Cycle Detection in Undirected vs Directed Graphs",
      "Topological Sort (DFS Stack & Kahn's In-Degree BFS)",
      "Dijkstra's Algorithm (Priority Queue O(E log V))",
      "Bellman-Ford (Negative Cycle Detection) & Floyd-Warshall O(V^3)",
      "Disjoint Set Union (DSU with Path Compression & Union by Rank)"
    ],
    "overview": "Graphs model networks, dependencies, and complex relations. Step 15 covers complete graph theory: traversals, topological sorting, shortest path algorithms, and minimum spanning trees.",
    "keyConcepts": [
      {
        "title": "Topological Sort & Kahn's Algorithm",
        "description": "Linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, u comes before v.",
        "bulletPoints": [
          "Kahn's algorithm: Push all vertices with in-degree 0 to a queue.",
          "Pop vertex u, append to topo sort, reduce in-degree of its neighbors by 1.",
          "If neighbor's in-degree hits 0, push to queue.",
          "If topo order length < V: Graph contains a cycle!"
        ]
      },
      {
        "title": "Dijkstra's Algorithm",
        "description": "Finds shortest paths from source to all vertices in a weighted graph with non-negative edge weights.",
        "bulletPoints": [
          "Uses Min-Heap storing pairs `(distance, node)`.",
          "Relaxation step: `if dist[u] + wt < dist[v]: dist[v] = dist[u] + wt`.",
          "Time Complexity: O(E log V)."
        ]
      },
      {
        "title": "Disjoint Set Union (DSU)",
        "description": "Maintains disjoint sets supporting two operations in near-constant O(4 alpha) time:",
        "bulletPoints": [
          "Find Parent with Path Compression: flattens the tree so subsequent lookups are O(1).",
          "Union by Rank / Size: attaches smaller tree beneath root of larger tree."
        ]
      }
    ],
    "invariants": [
      {
        "title": "Dijkstra's Greedy Invariant",
        "formula": "dist[u] is finalized when node u is popped from priority queue",
        "explanation": "Because edge weights are non-negative, any alternative path to u must pass through other unvisited nodes whose current distances are already >= dist[u], so no shorter path can exist.",
        "example": "Fails on negative weights because future negative edges can reduce total cost after finalization."
      }
    ],
    "algorithmWalkthroughs": [
      {
        "algorithmName": "Dijkstra's Shortest Path",
        "intuition": "Greedily visit the unvisited node with smallest provisional distance.",
        "steps": [
          "Initialize dist array with infinity, dist[src] = 0.",
          "Push (0, src) to priority_queue.",
          "While pq is not empty: pop (d, u).",
          "For each neighbor (v, wt) of u: if d + wt < dist[v], dist[v] = d + wt, push (dist[v], v)."
        ],
        "pseudocode": "pq.push((0, src)); dist[src] = 0\nwhile pq:\n    d, u = pq.pop()\n    for v, wt in adj[u]:\n        if d + wt < dist[v]:\n            dist[v] = d + wt\n            pq.push((dist[v], v))"
      }
    ],
    "codeSnippets": [
      {
        "title": "Disjoint Set Union Class (C++)",
        "language": "cpp",
        "code": "#include <vector>\nusing namespace std;\n\nclass DisjointSet {\n    vector<int> parent, rank;\npublic:\n    DisjointSet(int n) {\n        parent.resize(n + 1);\n        rank.assign(n + 1, 0);\n        for (int i = 0; i <= n; i++) parent[i] = i;\n    }\n    int findUPar(int node) {\n        if (node == parent[node]) return node;\n        return parent[node] = findUPar(parent[node]); // Path Compression\n    }\n    void unionByRank(int u, int v) {\n        int ulp_u = findUPar(u), ulp_v = findUPar(v);\n        if (ulp_u == ulp_v) return;\n        if (rank[ulp_u] < rank[ulp_v]) parent[ulp_u] = ulp_v;\n        else if (rank[ulp_v] < rank[ulp_u]) parent[ulp_v] = ulp_u;\n        else { parent[ulp_v] = ulp_u; rank[ulp_u]++; }\n    }\n};",
        "explanation": "Near O(1) amortized operations with path compression and union by rank."
      }
    ],
    "complexityMatrix": [
      {
        "operation": "BFS / DFS Traversal",
        "best": "O(V + E)",
        "average": "O(V + E)",
        "worst": "O(V + E)",
        "space": "O(V)",
        "note": "Standard graph exploration."
      },
      {
        "operation": "Dijkstra's Algorithm",
        "best": "O(E log V)",
        "average": "O(E log V)",
        "worst": "O(E log V)",
        "space": "O(V + E)",
        "note": "Min-heap relaxation."
      },
      {
        "operation": "Bellman-Ford Algorithm",
        "best": "O(V * E)",
        "average": "O(V * E)",
        "worst": "O(V * E)",
        "space": "O(V)",
        "note": "Handles negative weights & detects negative cycles."
      },
      {
        "operation": "Floyd-Warshall",
        "best": "O(V^3)",
        "average": "O(V^3)",
        "worst": "O(V^3)",
        "space": "O(V^2)",
        "note": "All-pairs shortest paths."
      }
    ],
    "commonPitfalls": [
      "Applying Dijkstra on graphs with negative weights or negative cycles; use Bellman-Ford instead!"
    ],
    "interviewTips": [
      "To detect cycles in a directed graph: use Kahn's Algorithm (BFS) or DFS with visited and pathVisited arrays."
    ],
    "interviewQAs": [
      {
        "question": "Why does Bellman-Ford relax all edges V - 1 times?",
        "companyTags": [
          "Google",
          "Amazon",
          "Microsoft"
        ],
        "answer": "In any simple shortest path in a graph of V vertices, there can be at most V - 1 edges. Each round of edge relaxation guarantees that paths of length k are calculated correctly. If a distance reduces in the V-th round, a negative weight cycle exists!"
      }
    ],
    "quiz": [
      {
        "id": "q15-1",
        "question": "What is the time complexity of Disjoint Set Union operations with Path Compression and Union by Rank?",
        "options": [
          "O(log N)",
          "O(N)",
          "O(alpha(N)) ~ O(1)",
          "O(N^2)"
        ],
        "correctIndex": 2,
        "explanation": "Path compression combined with union by rank guarantees O(alpha(N)) where alpha is the Inverse Ackermann function (practically <= 4)."
      }
    ]
  },
  {
    "stepId": "step-16",
    "stepNumber": 16,
    "title": "Step 16: Dynamic Programming (From Memoization to Space Optimization)",
    "icon": "\u26a1",
    "tagline": "Overlapping Subproblems, 1D/2D Grids, Knapsack, LCS, LIS & MCM Partition",
    "readingTime": "30 min read",
    "topics": [
      "Overlapping Subproblems & Optimal Substructure",
      "The 3-Step Recipe: Recursion -> Memoization -> Tabulation -> Space Optimization",
      "1D DP: Frog Jump, House Robber & Climbing Stairs",
      "2D/3D Grid DP: Unique Paths, Minimum Path Sum & Cherry Pickup",
      "DP on Subsequences & 0/1 Knapsack Family",
      "DP on Strings: Longest Common Subsequence (LCS) & Edit Distance",
      "Longest Increasing Subsequence (LIS) in O(N log N) via Binary Search",
      "Partition DP & Matrix Chain Multiplication (MCM)"
    ],
    "overview": "Dynamic Programming is the pinnacle of interview preparation. It replaces exponential brute-force searches by caching overlapping subproblem results and assembling solutions bottom-up.",
    "keyConcepts": [
      {
        "title": "The 3-Step DP Recipe",
        "description": "Never write DP bottom-up directly. Follow the structured progression:",
        "bulletPoints": [
          "Step 1: Express problem recursively in terms of indices.",
          "Step 2: Memoize with a DP table (Top-Down) to prune exponential branches.",
          "Step 3: Tabulate iteratively (Bottom-Up) from base cases.",
          "Step 4: Space optimize by observing that state i depends only on state i - 1."
        ]
      },
      {
        "title": "LIS in O(N log N) via Binary Search",
        "description": "Maintain an array `tails` where `tails[len]` stores the smallest tail element of all increasing subsequences of length `len`.",
        "bulletPoints": [
          "For each x in array: use `lower_bound` to find first element >= x in `tails`.",
          "If x > all elements in `tails`: append x (extends max length).",
          "Else: overwrite existing element to keep tails as small as possible."
        ]
      }
    ],
    "invariants": [
      {
        "title": "0/1 Knapsack Single-Array Invariant",
        "formula": "dp[w] = max(dp[w], val[i] + dp[w - wt[i]]) iterating backwards from W down to wt[i]",
        "explanation": "Iterating backwards prevents using the same item multiple times in the same round, compressing 2D DP table into 1D without state corruption.",
        "example": "If iterating forwards, dp[w - wt[i]] already includes current item i (Unbounded Knapsack)."
      }
    ],
    "algorithmWalkthroughs": [
      {
        "algorithmName": "Longest Common Subsequence (LCS)",
        "intuition": "If characters match, add 1 and shrink both strings. If they mismatch, take the max of shrinking string 1 or string 2.",
        "steps": [
          "If s1[i - 1] == s2[j - 1]: dp[i][j] = 1 + dp[i - 1][j - 1].",
          "Else: dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])."
        ],
        "pseudocode": "for i in 1..n:\n    for j in 1..m:\n        if s1[i-1] == s2[j-1]: dp[i][j] = 1 + dp[i-1][j-1]\n        else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])"
      }
    ],
    "codeSnippets": [
      {
        "title": "LIS in O(N log N) (C++)",
        "language": "cpp",
        "code": "#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint lengthOfLIS(const vector<int>& nums) {\n    vector<int> tails;\n    for (int x : nums) {\n        auto it = lower_bound(tails.begin(), tails.end(), x);\n        if (it == tails.end()) tails.push_back(x);\n        else *it = x;\n    }\n    return tails.size();\n}",
        "explanation": "Patience sorting / lower_bound achieves O(N log N) time and O(N) space."
      }
    ],
    "complexityMatrix": [
      {
        "operation": "1D DP (House Robber)",
        "best": "O(N)",
        "average": "O(N)",
        "worst": "O(N)",
        "space": "O(1)",
        "note": "Space optimized to 2 variables."
      },
      {
        "operation": "2D DP (LCS / Knapsack)",
        "best": "O(N * M)",
        "average": "O(N * M)",
        "worst": "O(N * M)",
        "space": "O(M)",
        "note": "Space optimized to previous row."
      },
      {
        "operation": "LIS via Binary Search",
        "best": "O(N log N)",
        "average": "O(N log N)",
        "worst": "O(N log N)",
        "space": "O(N)",
        "note": "Patience sorting."
      }
    ],
    "commonPitfalls": [
      "In 0/1 Knapsack 1D space optimization, iterating weight forwards instead of backwards, turning it into Unbounded Knapsack."
    ],
    "interviewTips": [
      "Always state the subproblem definition clearly: 'Let dp[i] represent the maximum answer using prefix 0 to i'."
    ],
    "interviewQAs": [
      {
        "question": "What is the difference between Memoization and Tabulation?",
        "companyTags": [
          "Google",
          "Meta",
          "Amazon"
        ],
        "answer": "Memoization is Top-Down: starts from original problem, recursively breaks it down, and caches results. Tabulation is Bottom-Up: starts from base cases, iteratively fills the table in topological order, avoiding recursion stack overhead."
      }
    ],
    "quiz": [
      {
        "id": "q16-1",
        "question": "Why must the 1D space-optimized 0/1 Knapsack inner loop run backwards from W down to wt[i]?",
        "options": [
          "To save cache memory",
          "To prevent using the current item more than once in the same transaction",
          "Because arrays are indexed backwards",
          "To avoid negative indices"
        ],
        "correctIndex": 1,
        "explanation": "Iterating backwards ensures dp[w - wt[i]] refers to values from the PREVIOUS item, preserving 0/1 constraint."
      }
    ]
  },
  {
    "stepId": "step-17",
    "stepNumber": 17,
    "title": "Step 17: Tries (Prefix Trees & Bitwise Tries)",
    "icon": "\ud83c\udf32",
    "tagline": "Prefix Matching, Trie Node Anatomy, Auto-Complete & Bitwise Maximum XOR",
    "readingTime": "18 min read",
    "topics": [
      "Trie Node Architecture & 26-Pointer Array Invariant",
      "Insert, Search, and StartsWith Operations in O(Length)",
      "Trie II: Frequency Counting with countWordsEqualTo & countWordsStartingWith",
      "Bitwise Trie: Maximum XOR of Two Numbers in O(32 * N)",
      "Offline Queries with Bitwise Trie"
    ],
    "overview": "Tries (Prefix Trees) provide optimal prefix search and string retrieval, operating strictly in O(word_length) time independent of the dictionary size.",
    "keyConcepts": [
      {
        "title": "Trie Node Structure",
        "description": "Each node contains an array of child pointers `children[26]` and a boolean `isEnd`.",
        "bulletPoints": [
          "Root represents the empty prefix.",
          "Common prefixes share nodes, saving space.",
          "Insert and Search take O(L) where L is the string length."
        ]
      },
      {
        "title": "Bitwise Trie for Maximum XOR",
        "description": "To maximize `X ^ Y`, for each bit of X from 31 down to 0, greedily take the opposite bit in the Trie if available.",
        "bulletPoints": [
          "If bit is 1, look for 0 in Trie. If bit is 0, look for 1.",
          "Guarantees the most significant bit possible is turned on."
        ]
      }
    ],
    "invariants": [
      {
        "title": "Bitwise Trie Greedy Choice Invariant",
        "formula": "Turning on bit i (value 2^i) contributes more than all lower bits 0 to i - 1 combined",
        "explanation": "Since sum(2^k for k < i) = 2^i - 1 < 2^i, a greedy choice at bit i is always mathematically optimal over any subsequent choices.",
        "example": "Turning on bit 4 (16) > turning on bits 3, 2, 1, 0 (8+4+2+1=15)."
      }
    ],
    "algorithmWalkthroughs": [
      {
        "algorithmName": "Trie Insert & Search",
        "intuition": "Walk through trie following character branches. Create nodes if missing.",
        "steps": [
          "Start at root.",
          "For char c in word: index = c - 'a'. If !node->children[index], create node. node = node->children[index].",
          "At end of word: mark node->isEnd = true."
        ],
        "pseudocode": "def insert(word):\n    node = root\n    for c in word:\n        if c not in node.children:\n            node.children[c] = Node()\n        node = node.children[c]\n    node.isEnd = true"
      }
    ],
    "codeSnippets": [
      {
        "title": "Standard Trie Implementation (C++)",
        "language": "cpp",
        "code": "#include <string>\nusing namespace std;\n\nstruct TrieNode {\n    TrieNode* children[26] = {nullptr};\n    bool isEnd = false;\n};\n\nclass Trie {\n    TrieNode* root;\npublic:\n    Trie() { root = new TrieNode(); }\n    void insert(const string& word) {\n        TrieNode* node = root;\n        for (char c : word) {\n            int idx = c - 'a';\n            if (!node->children[idx]) node->children[idx] = new TrieNode();\n            node = node->children[idx];\n        }\n        node->isEnd = true;\n    }\n    bool search(const string& word) {\n        TrieNode* node = root;\n        for (char c : word) {\n            int idx = c - 'a';\n            if (!node->children[idx]) return false;\n            node = node->children[idx];\n        }\n        return node->isEnd;\n    }\n    bool startsWith(const string& prefix) {\n        TrieNode* node = root;\n        for (char c : prefix) {\n            int idx = c - 'a';\n            if (!node->children[idx]) return false;\n            node = node->children[idx];\n        }\n        return true;\n    }\n};",
        "explanation": "Standard 26-ary tree implementation with O(L) operations."
      }
    ],
    "complexityMatrix": [
      {
        "operation": "Trie Insert / Search",
        "best": "O(L)",
        "average": "O(L)",
        "worst": "O(L)",
        "space": "O(L * Alphabet)",
        "note": "L is string length."
      },
      {
        "operation": "Max XOR Query",
        "best": "O(32)",
        "average": "O(32)",
        "worst": "O(32)",
        "space": "O(32 * N)",
        "note": "Independent of number of elements."
      }
    ],
    "commonPitfalls": [
      "In `search`, returning true when `node` is non-null instead of checking `node->isEnd` (which checks full word, not prefix)."
    ],
    "interviewTips": [
      "Whenever asked for Auto-Complete or Prefix Matching, recommend Trie immediately."
    ],
    "interviewQAs": [
      {
        "question": "How do you implement Maximum XOR of Two Numbers using Trie?",
        "companyTags": [
          "Google",
          "Meta"
        ],
        "answer": "Insert numbers into a binary trie (bits 0 and 1) from bit 31 down to 0. For each number X, traverse the trie trying to greedily choose the opposite bit (1 if X's bit is 0, and 0 if X's bit is 1). If opposite bit exists, add 2^bit to current XOR sum and branch there. Overall time is O(32 * N)."
      }
    ],
    "quiz": [
      {
        "id": "q17-1",
        "question": "What is the time complexity of searching a word of length L in a Trie containing N words?",
        "options": [
          "O(N * L)",
          "O(log N)",
          "O(L)",
          "O(N)"
        ],
        "correctIndex": 2,
        "explanation": "Trie search time depends ONLY on the length of the query string L, completely independent of N."
      }
    ]
  },
  {
    "stepId": "step-18",
    "stepNumber": 18,
    "title": "Step 18: Advanced Strings & Hard Algorithms",
    "icon": "\u26a1",
    "tagline": "KMP Full Theory, Rabin-Karp Rolling Hash, Z-Algorithm & Manacher's Algorithm",
    "readingTime": "24 min read",
    "topics": [
      "KMP Knuth-Morris-Pratt Full Proof & Pi-Table Invariants",
      "Z-Algorithm: Linear Time Z-Array Construction with [L, R] Box",
      "Rabin-Karp Rolling Hash Collision Probability & Modulo Arithmetic",
      "Manacher's Algorithm for Longest Palindromic Substring in O(N)",
      "Shortest Palindrome via KMP Prefix Function"
    ],
    "overview": "Step 18 concludes Striver's A2Z DSA journey with advanced string pattern matching algorithms, achieving strictly linear O(N) runtimes for problems that naively take O(N^2).",
    "keyConcepts": [
      {
        "title": "Z-Algorithm Invariant",
        "description": "Z[i] is the length of the longest substring starting from s[i] that is also a prefix of s.",
        "bulletPoints": [
          "Maintains a [L, R] window representing the rightmost segment matching a prefix.",
          "If i <= R, initialize Z[i] = min(R - i + 1, Z[i - L]).",
          "Allows pattern search in O(N + M) by analyzing `pattern + '$' + text`."
        ]
      },
      {
        "title": "Shortest Palindrome via KMP",
        "description": "To find the shortest palindrome by prepending characters: compute the longest palindromic prefix of s.",
        "bulletPoints": [
          "Construct string `s + '#' + reverse(s)`.",
          "The last value in KMP's pi table gives the length of the longest palindromic prefix!",
          "Reverse the remaining suffix and prepend it to s."
        ]
      }
    ],
    "invariants": [
      {
        "title": "Z-Box Matching Invariant",
        "formula": "s[L .. R] == s[0 .. R - L]",
        "explanation": "Inside the Z-box [L, R], characters are identical to the prefix s[0 .. R - L]. Hence index i inside the box corresponds directly to index i - L in the prefix.",
        "example": "If [L, R] is [3, 6], index 4 maps to index 4 - 3 = 1."
      }
    ],
    "algorithmWalkthroughs": [
      {
        "algorithmName": "KMP Pi-Table Construction",
        "intuition": "Compute longest proper prefix that is also a suffix using two pointers.",
        "steps": [
          "pi[0] = 0, j = 0.",
          "For i in 1 to n - 1:",
          "While j > 0 and s[i] != s[j]: j = pi[j - 1].",
          "If s[i] == s[j]: j++.",
          "pi[i] = j."
        ],
        "pseudocode": "j = 0\nfor i in 1..n-1:\n    while j > 0 and s[i] != s[j]: j = pi[j-1]\n    if s[i] == s[j]: j += 1\n    pi[i] = j"
      }
    ],
    "codeSnippets": [
      {
        "title": "Shortest Palindrome via KMP (C++)",
        "language": "cpp",
        "code": "#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstring shortestPalindrome(string s) {\n    string rev = s;\n    reverse(rev.begin(), rev.end());\n    string combined = s + \"#\" + rev;\n    int n = combined.size();\n    vector<int> pi(n, 0);\n    for (int i = 1; i < n; i++) {\n        int j = pi[i - 1];\n        while (j > 0 && combined[i] != combined[j]) j = pi[j - 1];\n        if (combined[i] == combined[j]) j++;\n        pi[i] = j;\n    }\n    int palLen = pi.back();\n    string toAdd = s.substr(palLen);\n    reverse(toAdd.begin(), toAdd.end());\n    return toAdd + s;\n}",
        "explanation": "Finds longest palindromic prefix using KMP in O(N) time and O(N) space."
      }
    ],
    "complexityMatrix": [
      {
        "operation": "KMP String Search",
        "best": "O(N + M)",
        "average": "O(N + M)",
        "worst": "O(N + M)",
        "space": "O(M)",
        "note": "Linear time pattern matching."
      },
      {
        "operation": "Z-Algorithm Search",
        "best": "O(N + M)",
        "average": "O(N + M)",
        "worst": "O(N + M)",
        "space": "O(N + M)",
        "note": "Z-box linear construction."
      }
    ],
    "commonPitfalls": [
      "Forgetting to insert a unique separator like '#' between pattern and text in KMP and Z-algorithm."
    ],
    "interviewTips": [
      "Conclude interviews with advanced string algorithms by comparing KMP (better memory O(M)) vs Z-algorithm (simpler to implement)."
    ],
    "interviewQAs": [
      {
        "question": "Why is Manacher's Algorithm able to find the longest palindromic substring in O(N) time?",
        "companyTags": [
          "Google",
          "Directi"
        ],
        "answer": "Manacher's algorithm inserts '#' between every character to unify odd and even palindromes, and uses a palindromic center C and right boundary R. Any position i < R mirrors a previously computed position i' = 2*C - i, skipping redundant comparisons."
      }
    ],
    "quiz": [
      {
        "id": "q18-1",
        "question": "What does KMP's Pi-table entry pi[i] represent?",
        "options": [
          "The number of vowels up to index i",
          "The length of the longest proper prefix of s[0..i] that is also a suffix of s[0..i]",
          "The index of the next matching character",
          "The hash of the substring"
        ],
        "correctIndex": 1,
        "explanation": "Pi[i] represents the length of the longest proper prefix of s[0..i] that is also a suffix of s[0..i]."
      }
    ]
  }
];

export const getTheoryByStepId = (stepId: string): StriverStepTheory | undefined => {
  return STRIVERS_A2Z_THEORIES.find((t) => t.stepId === stepId);
};

export const getTheoryByStepNumber = (stepNum: number): StriverStepTheory | undefined => {
  return STRIVERS_A2Z_THEORIES.find((t) => t.stepNumber === stepNum);
};
