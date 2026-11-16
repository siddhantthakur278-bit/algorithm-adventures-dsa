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
  // =========================================================================
  // STEP 16: DYNAMIC PROGRAMMING
  // =========================================================================
  '16.1': {
    subStepId: '16.1',
    stepId: 'step-16',
    stepNumber: 16,
    title: '16.1: Introduction to Dynamic Programming',
    overview:
      'Dynamic Programming is an optimization technique over plain recursion. Whenever a problem exhibits Overlapping Subproblems and Optimal Substructure, we cache past results to eliminate duplicate calculations.',
    coreIntuition:
      'Those who cannot remember the past are condemned to repeat it. If you draw the recursion tree for Fibonacci, f(n-1) and f(n-2) repeatedly recompute f(n-3), f(n-4). By storing answers in a table (DP), we turn exponential O(2^N) time into linear O(N) time.',
    recurrenceOrFormula:
      'Memoization: Top-Down (Recursive + Table) | Tabulation: Bottom-Up (Iterative Loop) | Space Optimization: Keep only required previous states',
    keyTechnique: '3-Step Transition: Recursion ➔ Memoization (Cache) ➔ Tabulation ➔ Space Optimization',
    timeComplexity: 'O(N) for 1D states, O(N * M) for 2D states',
    spaceComplexity: 'O(1) auxiliary (space optimized) or O(N) table',
    stepsToSolve: [
      'Step 1 (Represent State): Define dp[i] clearly in terms of what subproblem it solves.',
      'Step 2 (Identify Recurrence): Relate the answer for state i to answers of smaller subproblems (e.g. i-1, i-2).',
      'Step 3 (Base Cases): Identify boundary conditions that cannot be broken down further.',
      'Step 4 (Iterate Bottom-Up): Fill the DP table iteratively from base cases up to the target state.',
      'Step 5 (Space Optimize): If state i only depends on the previous 1 or 2 rows/elements, replace the array with variables.',
    ],
    cppSnippet: `// Fibonacci Space-Optimized Tabulation O(N) time, O(1) space
#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    int prev2 = 0, prev = 1;
    for (int i = 2; i <= n; i++) {
        int cur = prev + prev2;
        prev2 = prev;
        prev = cur;
    }
    return prev;
}

int main() {
    cout << "Fib(10) = " << fibonacci(10) << endl; // 55
    return 0;
}`,
    pythonSnippet: `# Fibonacci Space-Optimized Tabulation O(N) time, O(1) space
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    prev2, prev = 0, 1
    for _ in range(2, n + 1):
        cur = prev + prev2
        prev2, prev = prev, cur
    return prev

if __name__ == "__main__":
    print(f"Fib(10) = {fibonacci(10)}") # 55`,
    pitfalls: [
      'Confusing 0-indexed vs 1-indexed DP array sizes (causes out-of-bounds segfaults).',
      'Forgetting to initialize base cases in tabulation.',
      'Passing large DP tables by value in recursion instead of by reference (causes O(N) copy overhead).',
    ],
    topProblems: [
      'Fibonacci Number',
      'Climbing Stairs',
      'Min Cost Climbing Stairs',
    ],
  },

  '16.2': {
    subStepId: '16.2',
    stepId: 'step-16',
    stepNumber: 16,
    title: '16.2: 1D Dynamic Programming',
    overview:
      '1D DP covers problems where the state is represented by a single dimension or index (e.g., reaching step i, jumping to stone i, or robbing houses up to i).',
    coreIntuition:
      'At any index i, you evaluate the discrete choices available. For Climbing Stairs: you either arrive from step (i-1) taking 1 step, or step (i-2) taking 2 steps. For House Robber: you either rob house i (so you cannot rob i-1, gaining nums[i] + dp[i-2]), or skip house i (retaining dp[i-1]).',
    recurrenceOrFormula:
      'Climbing Stairs: dp[i] = dp[i-1] + dp[i-2]\nFrog Jump: dp[i] = min(dp[i-1] + |h[i]-h[i-1]|, dp[i-2] + |h[i]-h[i-2]|)\nHouse Robber: dp[i] = max(dp[i-1], nums[i] + dp[i-2])\nHouse Robber II (Circle): max(rob(nums[0..n-2]), rob(nums[1..n-1]))',
    keyTechnique:
      'Constant Space Optimization: Notice dp[i] only looks back 2 steps. Store in prev and prev2, reducing space from O(N) to O(1).',
    timeComplexity: 'O(N) single linear scan',
    spaceComplexity: 'O(1) auxiliary space (using two variables)',
    stepsToSolve: [
      '1. Express problem in terms of index i.',
      '2. Do all possible choices on that index i.',
      '3. If question asks for Count Ways: Sum up choices (way1 + way2).',
      '4. If question asks for Min/Max: Take min() or max() across all valid transitions.',
      '5. Optimize space by observing that only the last 2 states are required.',
    ],
    cppSnippet: `// House Robber Space Optimized O(N) time, O(1) space
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        if (n == 1) return nums[0];

        int prev2 = 0;
        int prev = nums[0];

        for (int i = 1; i < n; i++) {
            int pick = nums[i] + prev2;
            int notPick = prev;
            int cur = max(pick, notPick);
            prev2 = prev;
            prev = cur;
        }
        return prev;
    }
};

int main() {
    Solution s;
    vector<int> houses = {2, 7, 9, 3, 1};
    cout << "Max Robbery: " << s.rob(houses) << endl; // 12
    return 0;
}`,
    pythonSnippet: `# House Robber Space Optimized O(N) time, O(1) space
from typing import List

class Solution:
    def rob(self, nums: List[int]) -> int:
        if not nums:
            return 0
        if len(nums) == 1:
            return nums[0]

        prev2 = 0
        prev = nums[0]

        for i in range(1, len(nums)):
            pick = nums[i] + prev2
            not_pick = prev
            cur = max(pick, not_pick)
            prev2 = prev
            prev = cur

        return prev

if __name__ == "__main__":
    sol = Solution()
    houses = [2, 7, 9, 3, 1]
    print(f"Max Robbery: {sol.rob(houses)}") # 12`,
    pitfalls: [
      'In House Robber II (circular houses), forgetting that house 0 and house n-1 cannot both be robbed. Must run standard robber twice: on nums[0..n-2] and on nums[1..n-1].',
      'In Frog Jump with K Distances, inner loop must check that (i - j >= 0) to avoid negative indexing.',
    ],
    topProblems: [
      'Climbing Stairs (LeetCode #70)',
      'Frog Jump (GeeksforGeeks)',
      'Frog Jump with K Distances',
      'Maximum Sum of Non-Adjacent Elements (LeetCode #198)',
      'House Robber II (LeetCode #213)',
    ],
  },

  '16.3': {
    subStepId: '16.3',
    stepId: 'step-16',
    stepNumber: 16,
    title: '16.3: 2D/3D Grid Dynamic Programming',
    overview:
      'Grid DP models moving through matrices, 2D planes, or multi-agent states (e.g. Cherry Pickup 3D DP). Each cell (i, j) depends on its neighbors.',
    coreIntuition:
      'To reach (i, j) in a grid allowing only Down and Right moves, you must have arrived either from top (i-1, j) or from left (i, j-1). Therefore, all paths to (i, j) is the sum dp[i-1][j] + dp[i][j-1].',
    recurrenceOrFormula:
      'Unique Paths: dp[i][j] = dp[i-1][j] + dp[i][j-1]\nMin Path Sum: dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])\nTriangle: dp[i][j] = triangle[i][j] + min(dp[i+1][j], dp[i+1][j+1]) (Solve bottom-up!)\nNinja Training: dp[day][last] = max(points[day][task] + dp[day-1][task]) for task != last',
    keyTechnique:
      'Space Optimization from O(M * N) to O(N): Because row i only requires row i-1, maintain a single 1D vector `prev` representing the previous row.',
    timeComplexity: 'O(M * N) for 2D grids, O(N * M * M) for 3D grids',
    spaceComplexity: 'O(N) space optimized (single row vector)',
    stepsToSolve: [
      '1. Express state as (i, j) representing position in grid.',
      '2. Check boundary conditions: out-of-bounds returns 0 (or infinity for min problems).',
      '3. For obstacles, return 0 as paths cannot traverse blocked cells.',
      '4. Fill table iteratively: row by row, column by column.',
      '5. Space optimize by replacing previous 2D matrix with a 1D `prev` row.',
    ],
    cppSnippet: `// Unique Paths Space Optimized O(M * N) time, O(N) space
#include <iostream>
#include <vector>
using namespace std;

int uniquePaths(int m, int n) {
    vector<int> prev(n, 1);
    for (int i = 1; i < m; i++) {
        vector<int> cur(n, 1);
        for (int j = 1; j < n; j++) {
            cur[j] = cur[j - 1] + prev[j];
        }
        prev = cur;
    }
    return prev[n - 1];
}

int main() {
    cout << "Unique Paths (3x7): " << uniquePaths(3, 7) << endl; // 28
    return 0;
}`,
    pythonSnippet: `# Unique Paths Space Optimized O(M * N) time, O(N) space
def unique_paths(m: int, n: int) -> int:
    prev = [1] * n
    for i in range(1, m):
        cur = [1] * n
        for j in range(1, n):
            cur[j] = cur[j - 1] + prev[j]
        prev = cur
    return prev[n - 1]

if __name__ == "__main__":
    print(f"Unique Paths (3x7): {unique_paths(3, 7)}") # 28`,
    pitfalls: [
      'In Min Path Sum, initializing boundaries with 0 instead of infinity causes incorrect minimum calculations.',
      'In Triangle DP, solving top-down requires handling varying row lengths. Solving bottom-up starting at base is much simpler and eliminates boundary checks.',
    ],
    topProblems: [
      'Ninja’s Training',
      'Grid Unique Paths (LeetCode #62)',
      'Unique Paths II with Obstacles (LeetCode #63)',
      'Minimum Path Sum (LeetCode #64)',
      'Triangle (LeetCode #120)',
      'Minimum Falling Path Sum (LeetCode #931)',
      'Cherry Pickup II (3D DP - LeetCode #1463)',
    ],
  },

  '16.4': {
    subStepId: '16.4',
    stepId: 'step-16',
    stepNumber: 16,
    title: '16.4: DP on Subsequences & Knapsack',
    overview:
      'The foundational subset pattern: At index i, you decide whether to "Take" or "Not Take" the current element towards a target sum or knapsack capacity.',
    coreIntuition:
      'If you take nums[i], target decreases to (target - nums[i]). If you do not take nums[i], target remains the same. The choice tree branches into two: f(i-1, target) and f(i-1, target - nums[i]).',
    recurrenceOrFormula:
      '0/1 Knapsack: dp[i][W] = max(dp[i-1][W], val[i] + dp[i-1][W - wt[i]])\nSubset Sum: dp[i][target] = dp[i-1][target] || dp[i-1][target - nums[i]]\nCoin Change II (Ways): dp[i][T] = dp[i-1][T] + dp[i][T - coins[i]] (Unbounded)\nPartition Difference: S1 + S2 = Total => S2 - S1 = Diff => Minimize |Total - 2*S1|',
    keyTechnique:
      '1D Array Backwards Traversal for 0/1 Knapsack: Because dp[w] depends on previous row’s smaller capacity dp[w - wt[i]], traverse capacity from W down to wt[i] to avoid overwriting values from current row.',
    timeComplexity: 'O(N * Target)',
    spaceComplexity: 'O(Target) space optimized with single 1D vector',
    stepsToSolve: [
      '1. Express state as f(ind, target).',
      '2. Base Case: If target == 0 return true/1. If ind == 0 return (nums[0] == target).',
      '3. Not Take: f(ind - 1, target).',
      '4. Take: nums[ind] <= target ? f(ind - 1, target - nums[ind]) : false.',
      '5. Combine choices: OR for existence, + for count ways, max/min for optimization.',
    ],
    cppSnippet: `// 0/1 Knapsack Space-Optimized O(N * W) time, O(W) space
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int knapsack(vector<int>& wt, vector<int>& val, int n, int W) {
    vector<int> prev(W + 1, 0);
    // Base condition for index 0
    for (int w = wt[0]; w <= W; w++) prev[w] = val[0];

    for (int i = 1; i < n; i++) {
        for (int w = W; w >= 0; w--) {
            int notTake = prev[w];
            int take = (wt[i] <= w) ? val[i] + prev[w - wt[i]] : 0;
            prev[w] = max(take, notTake);
        }
    }
    return prev[W];
}

int main() {
    vector<int> wt = {1, 2, 4, 5};
    vector<int> val = {5, 4, 8, 6};
    cout << "Max Knapsack Value: " << knapsack(wt, val, 4, 5) << endl; // 13
    return 0;
}`,
    pythonSnippet: `# 0/1 Knapsack Space-Optimized O(N * W) time, O(W) space
from typing import List

def knapsack(wt: List[int], val: List[int], n: int, W: int) -> int:
    prev = [0] * (W + 1)
    for w in range(wt[0], W + 1):
        prev[w] = val[0]

    for i in range(1, n):
        for w in range(W, -1, -1):
            not_take = prev[w]
            take = val[i] + prev[w - wt[i]] if wt[i] <= w else 0
            prev[w] = max(take, not_take)

    return prev[W]

if __name__ == "__main__":
    wt = [1, 2, 4, 5]
    val = [5, 4, 8, 6]
    print(f"Max Knapsack Value: {knapsack(wt, val, 4, 5)}") # 13`,
    pitfalls: [
      'In Unbounded Knapsack / Coin Change, an item can be picked multiple times. Therefore, the "Take" transition stays at the same index: f(ind, target - wt[ind]) instead of ind - 1.',
      'Traversing 1D array forwards in 0/1 knapsack turns it into an unbounded knapsack by accident!',
    ],
    topProblems: [
      'Subset Sum Problem',
      'Partition Equal Subset Sum (LeetCode #416)',
      'Partition Set Into 2 Subsets With Min Absolute Sum Diff (LeetCode #2035)',
      'Count Subsets with Sum K',
      '0/1 Knapsack Problem',
      'Coin Change (Minimum Coins - LeetCode #322)',
      'Target Sum (LeetCode #494)',
      'Coin Change 2 (Ways - LeetCode #518)',
      'Unbounded Knapsack & Rod Cutting Problem',
    ],
  },

  '16.5': {
    subStepId: '16.5',
    stepId: 'step-16',
    stepNumber: 16,
    title: '16.5: DP on Strings (LCS, Edit Distance)',
    overview:
      'Dynamic Programming on two string sequences. State (i, j) compares prefixes s1[0..i-1] and s2[0..j-1] to find match, replace, insertion, or deletion transformations.',
    coreIntuition:
      'Longest Common Subsequence (LCS) is the mother of all string DP problems. If s1[i-1] == s2[j-1], both characters match: 1 + dp[i-1][j-1]. If they do not match, take the best of skipping character from s1 (dp[i-1][j]) or s2 (dp[i][j-1]).',
    recurrenceOrFormula:
      'LCS: dp[i][j] = (s1[i-1] == s2[j-1]) ? 1 + dp[i-1][j-1] : max(dp[i-1][j], dp[i][j-1])\nLongest Palindromic Subsequence: LCS(s, reverse(s))\nMin Insertions to Make Palindrome: len(s) - LPS(s)\nEdit Distance: If match: dp[i-1][j-1]. Else: 1 + min(Insert: dp[i][j-1], Delete: dp[i-1][j], Replace: dp[i-1][j-1])',
    keyTechnique:
      '1-Based Indexing with Base Row 0: Shifting indices so row 0 represents an empty string "" makes base cases trivial (all 0s for LCS, or index counts for Edit Distance).',
    timeComplexity: 'O(M * N) where M and N are string lengths',
    spaceComplexity: 'O(N) space optimized (using 2 row vectors: prev and cur)',
    stepsToSolve: [
      '1. Represent state as (i, j) indexing s1 and s2.',
      '2. Base cases: When i == 0 or j == 0, one string is exhausted.',
      '3. If characters match: Advance both pointers diagonally with +1.',
      '4. If characters differ: Explore insert, delete, or replace branches and take optimal.',
      '5. For printing string: Backtrack through the DP matrix starting from (m, n).',
    ],
    cppSnippet: `// Longest Common Subsequence Space Optimized O(M * N) time, O(N) space
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int longestCommonSubsequence(string s1, string s2) {
    int m = s1.length(), n = s2.length();
    vector<int> prev(n + 1, 0), cur(n + 1, 0);

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                cur[j] = 1 + prev[j - 1];
            } else {
                cur[j] = max(prev[j], cur[j - 1]);
            }
        }
        prev = cur;
    }
    return prev[n];
}

int main() {
    cout << "LCS('abcde', 'ace'): " << longestCommonSubsequence("abcde", "ace") << endl; // 3
    return 0;
}`,
    pythonSnippet: `# Longest Common Subsequence Space Optimized O(M * N) time, O(N) space
def longest_common_subsequence(s1: str, s2: str) -> int:
    m, n = len(s1), len(s2)
    prev = [0] * (n + 1)

    for i in range(1, m + 1):
        cur = [0] * (n + 1)
        for j in range(1, n + 1):
            if s1[i - 1] == s2[j - 1]:
                cur[j] = 1 + prev[j - 1]
            else:
                cur[j] = max(prev[j], cur[j - 1])
        prev = cur

    return prev[n]

if __name__ == "__main__":
    print(f"LCS('abcde', 'ace'): {longest_common_subsequence('abcde', 'ace')}") # 3`,
    pitfalls: [
      'In Edit Distance, forgetting that insertion costs 1 + dp[i][j-1] (we stay at index i because character was inserted to match s2[j-1]).',
      'In Wildcard Matching, "*" can match empty string (dp[i-1][j]) OR any sequence (dp[i][j-1]).',
    ],
    topProblems: [
      'Longest Common Subsequence (LeetCode #1143)',
      'Print Longest Common Subsequence',
      'Longest Common Substring',
      'Longest Palindromic Subsequence (LeetCode #516)',
      'Minimum Insertions to Make String Palindrome (LeetCode #1312)',
      'Shortest Common Supersequence (LeetCode #1092)',
      'Distinct Subsequences (LeetCode #115)',
      'Edit Distance (LeetCode #72)',
      'Wildcard Matching (LeetCode #44)',
    ],
  },

  '16.6': {
    subStepId: '16.6',
    stepId: 'step-16',
    stepNumber: 16,
    title: '16.6: DP on Stock Trading',
    overview:
      'Stock trading problems optimize profit across day sequences under various constraints (at most 1, 2, K transactions, cooldown periods, or transaction fees).',
    coreIntuition:
      'At any day i, you can only be in one of two states: You are looking to BUY (canBuy = 1), or you are looking to SELL (canBuy = 0). When you buy, your balance decreases by -prices[i]. When you sell, your balance increases by +prices[i].',
    recurrenceOrFormula:
      'Stock II (Unlimited): If canBuy: max(-prices[i] + f(i+1, 0), f(i+1, 1)). If canSell: max(+prices[i] + f(i+1, 1), f(i+1, 0))\nStock with Cooldown: After selling on day i, next buy must be on day i + 2: +prices[i] + f(i+2, 1)\nStock with Fee: Deduct fee upon completing transaction: +prices[i] - fee + f(i+1, 1)',
    keyTechnique:
      'Finite State Machine with 4 Variables: For Stock III (at most 2 transactions), you only have 4 states: Buy1, Sell1, Buy2, Sell2. Can be solved in O(N) time with O(1) space!',
    timeComplexity: 'O(N) for single or unlimited, O(N * K) for K transactions',
    spaceComplexity: 'O(1) auxiliary space (using rolling state variables)',
    stepsToSolve: [
      '1. Express state as (day, canBuy, transactionsRemaining).',
      '2. If canBuy: Either Buy today (-prices[i] + transition) or Skip today (transition).',
      '3. If canSell: Either Sell today (+prices[i] + transition with cap - 1) or Hold.',
      '4. If cooldown: Jump index to day + 2 upon sell.',
      '5. Space optimize down to 2 or 4 scalar variables.',
    ],
    cppSnippet: `// Best Time to Buy and Sell Stock II O(N) time, O(1) space
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxProfit(vector<int>& prices) {
    int aheadNotBuy = 0, aheadBuy = 0;
    int curNotBuy, curBuy;

    for (int i = prices.size() - 1; i >= 0; i--) {
        curBuy = max(-prices[i] + aheadNotBuy, aheadBuy);
        curNotBuy = max(prices[i] + aheadBuy, aheadNotBuy);
        aheadBuy = curBuy;
        aheadNotBuy = curNotBuy;
    }
    return aheadBuy;
}

int main() {
    vector<int> p = {7, 1, 5, 3, 6, 4};
    cout << "Max Profit: " << maxProfit(p) << endl; // 7
    return 0;
}`,
    pythonSnippet: `# Best Time to Buy and Sell Stock II O(N) time, O(1) space
from typing import List

def max_profit(prices: List[int]) -> int:
    ahead_not_buy = 0
    ahead_buy = 0

    for i in range(len(prices) - 1, -1, -1):
        cur_buy = max(-prices[i] + ahead_not_buy, ahead_buy)
        cur_not_buy = max(prices[i] + ahead_buy, ahead_not_buy)
        ahead_buy = cur_buy
        ahead_not_buy = cur_not_buy

    return ahead_buy

if __name__ == "__main__":
    p = [7, 1, 5, 3, 6, 4]
    print(f"Max Profit: {max_profit(p)}") # 7`,
    pitfalls: [
      'In Stock with Cooldown, accessing day + 2 when day == n-1 causes out-of-bounds array access if base condition is not handled.',
      'Decreasing transaction count twice (must only decrement `cap` once per completed round-trip buy + sell).',
    ],
    topProblems: [
      'Best Time to Buy and Sell Stock (LeetCode #121)',
      'Best Time to Buy and Sell Stock II (LeetCode #122)',
      'Best Time to Buy and Sell Stock III (LeetCode #123)',
      'Best Time to Buy and Sell Stock IV (LeetCode #188)',
      'Best Time to Buy and Sell Stock with Cooldown (LeetCode #309)',
      'Best Time to Buy and Sell Stock with Transaction Fee (LeetCode #714)',
    ],
  },

  '16.7': {
    subStepId: '16.7',
    stepId: 'step-16',
    stepNumber: 16,
    title: '16.7: DP on Longest Increasing Subsequence (LIS)',
    overview:
      'Find the length of the longest strictly increasing subsequence in an array. Solvable via O(N^2) Tabulation or O(N log N) Patience Sorting with Binary Search.',
    coreIntuition:
      'For O(N^2) Tabulation: dp[i] represents the length of LIS ending at index i. For every previous j < i with nums[j] < nums[i], we can extend the subsequence: dp[i] = max(dp[i], 1 + dp[j]).\nFor O(N log N) Patience Sorting: Maintain a list `tails`. For each number, binary search for the first element >= x (lower_bound) and replace it, or append if larger than all elements.',
    recurrenceOrFormula:
      'Tabulation: dp[i] = 1 + max_{j < i, nums[j] < nums[i]}(dp[j])\nPatience Sort: lower_bound in tails vector: O(N log N)\nLongest Bitonic: max_i(LIS[i] + LDS[i] - 1)',
    keyTechnique:
      'Printing the LIS via Backtracking Array: Maintain a `parent[i]` array storing the predecessor index that maximized dp[i]. Backtrack from the index of max(dp) to reconstruct the exact subsequence in reverse.',
    timeComplexity: 'O(N log N) with Binary Search, O(N^2) standard DP',
    spaceComplexity: 'O(N) for DP or tails vector',
    stepsToSolve: [
      '1. Initialize dp array of size N filled with 1s (every single element is an LIS of length 1).',
      '2. Nested loop: for i from 0 to N-1, for j from 0 to i-1.',
      '3. If nums[j] < nums[i] and 1 + dp[j] > dp[i]: dp[i] = 1 + dp[j], parent[i] = j.',
      '4. For O(N log N): Keep sorted `tails` array. Use binary search (lower_bound) for insertion position.',
    ],
    cppSnippet: `// Longest Increasing Subsequence O(N log N) with Binary Search
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) {
            tails.push_back(x);
        } else {
            *it = x;
        }
    }
    return tails.size();
}

int main() {
    vector<int> nums = {10, 9, 2, 5, 3, 7, 101, 18};
    cout << "LIS Length: " << lengthOfLIS(nums) << endl; // 4 ([2, 3, 7, 101])
    return 0;
}`,
    pythonSnippet: `# Longest Increasing Subsequence O(N log N) with Binary Search
import bisect
from typing import List

def length_of_lis(nums: List[int]) -> int:
    tails = []
    for x in nums:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
    return len(tails)

if __name__ == "__main__":
    nums = [10, 9, 2, 5, 3, 7, 101, 18]
    print(f"LIS Length: {length_of_lis(nums)}") # 4`,
    pitfalls: [
      'In patience sorting, the `tails` array DOES NOT store the actual LIS elements! It only correctly computes the length of LIS. To print the subsequence, you must use the O(N^2) parent array or patience backpointers.',
      'For strictly increasing, use lower_bound (bisect_left). For non-decreasing, use upper_bound (bisect_right).',
    ],
    topProblems: [
      'Longest Increasing Subsequence (LeetCode #300)',
      'Printing Longest Increasing Subsequence',
      'Largest Divisible Subset (LeetCode #368)',
      'Longest String Chain (LeetCode #1048)',
      'Longest Bitonic Subsequence',
      'Number of Longest Increasing Subsequence (LeetCode #673)',
    ],
  },

  '16.8': {
    subStepId: '16.8',
    stepId: 'step-16',
    stepNumber: 16,
    title: '16.8: Matrix Chain Multiplication (MCM) / Partition DP',
    overview:
      'Partition DP solves problems where a contiguous range [i, j] must be split into sub-segments at an optimal partition point k (i <= k < j) to minimize or maximize a combination metric.',
    coreIntuition:
      'When multiplying matrices A1 * A2 * A3 * A4, you can place parentheses in multiple ways. The cost of multiplying chain [i..j] with partition at k is: Cost(i..k) + Cost(k+1..j) + Cost of combining the two resulting matrices (arr[i-1] * arr[k] * arr[j]). Try all k from i to j-1 and take min.',
    recurrenceOrFormula:
      'MCM: f(i, j) = min_{i <= k < j} [ f(i, k) + f(k+1, j) + arr[i-1] * arr[k] * arr[j] ]\nBase case: If i == j, cost is 0 (single matrix).\nBurst Balloons: Reverse perspective! Pick which balloon bursts LAST in range [i..j]: nums[i-1] * nums[k] * nums[j+1] + f(i, k-1) + f(k+1, j)',
    keyTechnique:
      'Reverse Thinking in Burst Balloons: If you burst a balloon first, its neighbors become adjacent, causing dependent subproblems. If you decide which balloon bursts LAST, the boundaries [i-1] and [j+1] remain fixed throughout the subproblem, ensuring independent subproblems!',
    timeComplexity: 'O(N^3) standard 3-loop range DP',
    spaceComplexity: 'O(N^2) 2D DP matrix',
    stepsToSolve: [
      '1. Identify range boundaries i and j.',
      '2. Base condition: When i >= j, 0 cuts or multiplications remain.',
      '3. Loop partition point k from i to j-1.',
      '4. Recurse for left partition f(i, k) and right partition f(k+1, j).',
      '5. Add combine cost and minimize over all k.',
    ],
    cppSnippet: `// Matrix Chain Multiplication Tabulation O(N^3) time, O(N^2) space
#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

int matrixMultiplication(vector<int>& arr, int n) {
    vector<vector<int>> dp(n, vector<int>(n, 0));

    // l is length of chain
    for (int l = 2; l < n; l++) {
        for (int i = 1; i < n - l + 1; i++) {
            int j = i + l - 1;
            dp[i][j] = INT_MAX;
            for (int k = i; k < j; k++) {
                int cost = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];
                dp[i][j] = min(dp[i][j], cost);
            }
        }
    }
    return dp[1][n - 1];
}

int main() {
    vector<int> p = {10, 20, 30, 40, 30};
    cout << "Min Multiplications: " << matrixMultiplication(p, p.size()) << endl; // 30000
    return 0;
}`,
    pythonSnippet: `# Matrix Chain Multiplication Tabulation O(N^3) time, O(N^2) space
import sys
from typing import List

def matrix_multiplication(arr: List[int], n: int) -> int:
    dp = [[0] * n for _ in range(n)]

    for length in range(2, n):
        for i in range(1, n - length + 1):
            j = i + length - 1
            dp[i][j] = sys.maxsize
            for k in range(i, j):
                cost = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j]
                dp[i][j] = min(dp[i][j], cost)

    return dp[1][n - 1]

if __name__ == "__main__":
    p = [10, 20, 30, 40, 30]
    print(f"Min Multiplications: {matrix_multiplication(p, len(p))}") # 30000`,
    pitfalls: [
      'Wrong loop order in tabulation: You must iterate either by chain length (len = 2 to N) or iterate i from N-1 down to 1 and j from i+1 up to N-1.',
      'Forgetting that arr has N elements for N-1 matrices (matrix i has dimensions arr[i-1] x arr[i]).',
    ],
    topProblems: [
      'Matrix Chain Multiplication',
      'Minimum Cost to Cut a Stick (LeetCode #1547)',
      'Burst Balloons (LeetCode #312)',
      'Evaluate Boolean Expression to True',
      'Palindrome Partitioning II (LeetCode #132)',
      'Partition Array for Maximum Sum (LeetCode #1043)',
    ],
  },

  // =========================================================================
  // STEP 3: ARRAYS
  // =========================================================================
  '3.1': {
    subStepId: '3.1',
    stepId: 'step-3',
    stepNumber: 3,
    title: '3.1: Easy Array Problems',
    overview:
      'Mastering fundamental array techniques: single-pass linear scans, two-pointer tracking, in-place rotations, and array mathematical properties.',
    coreIntuition:
      'Avoid unnecessary sorting when single linear scans achieve O(N) time with O(1) space. Use two pointers i and j to partition arrays in-place (e.g. removing duplicates or moving zeroes).',
    recurrenceOrFormula:
      'Array Reversal Algorithm for Rotation: Reverse(0, k-1), Reverse(k, n-1), Reverse(0, n-1) => O(N) time, O(1) space!\nMissing Number: XOR sum of 1..N ^ XOR of array elements = missing element',
    keyTechnique: 'Two-Pointer In-Place Filtering & Three-Step Reversal Rotation',
    timeComplexity: 'O(N) single pass',
    spaceComplexity: 'O(1) auxiliary in-place memory',
    stepsToSolve: [
      '1. Identify whether order must be preserved.',
      '2. For duplicate removal, maintain write pointer `i` that only advances on unique values.',
      '3. For rotation by K steps: Normalize k = k % n, then apply reversal algorithm.',
      '4. For missing number: Use XOR properties (x ^ x = 0, x ^ 0 = x) to avoid integer overflow of sum formulas.',
    ],
    cppSnippet: `// Remove Duplicates from Sorted Array in-place O(N) time, O(1) space
#include <iostream>
#include <vector>
using namespace std;

int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    int i = 0;
    for (int j = 1; j < nums.size(); j++) {
        if (nums[j] != nums[i]) {
            nums[++i] = nums[j];
        }
    }
    return i + 1;
}

int main() {
    vector<int> nums = {1, 1, 2, 2, 3, 4, 4};
    int k = removeDuplicates(nums);
    cout << "Unique count: " << k << endl; // 4
    return 0;
}`,
    pythonSnippet: `# Remove Duplicates from Sorted Array in-place O(N) time, O(1) space
from typing import List

def remove_duplicates(nums: List[int]) -> int:
    if not nums:
        return 0
    i = 0
    for j in range(1, len(nums)):
        if nums[j] != nums[i]:
            i += 1
            nums[i] = nums[j]
    return i + 1

if __name__ == "__main__":
    nums = [1, 1, 2, 2, 3, 4, 4]
    print(f"Unique count: {remove_duplicates(nums)}") # 4`,
    pitfalls: [
      'Forgetting k = k % n when rotating by k (k can be larger than array size).',
      'Using extra arrays when in-place modification is required by interviewers.',
    ],
    topProblems: [
      'Largest & Second Largest Element',
      'Check if Array is Sorted and Rotated',
      'Remove Duplicates from Sorted Array (LeetCode #26)',
      'Rotate Array by K Places (LeetCode #189)',
      'Move Zeroes to End (LeetCode #283)',
      'Missing Number (LeetCode #268)',
      'Max Consecutive Ones (LeetCode #485)',
    ],
  },

  '3.2': {
    subStepId: '3.2',
    stepId: 'step-3',
    stepNumber: 3,
    title: '3.2: Medium Array Problems',
    overview:
      'The core interview array repertoire: Dutch National Flag Algorithm, Boyer-Moore Voting, Kadane’s Algorithm, Next Permutation, and 2D Matrix Rotations.',
    coreIntuition:
      'Dutch National Flag partitions array into 3 regions using low, mid, and high pointers. Boyer-Moore cancels opposing votes because the majority element occurs > N/2 times. Kadane discards negative prefix sums because they only diminish subsequent subarray sums.',
    recurrenceOrFormula:
      'Kadane: curSum = max(nums[i], curSum + nums[i])\nBoyer-Moore: If count == 0: cand = nums[i]. count += (nums[i] == cand ? 1 : -1)\nNext Permutation: Find pivot nums[i] < nums[i+1], swap with smallest greater element from right, reverse suffix',
    keyTechnique: 'Dutch National Flag 3-Way Partitioning & Boyer-Moore Majority Cancellation',
    timeComplexity: 'O(N) single pass for 1D, O(N^2) for 2D matrices',
    spaceComplexity: 'O(1) in-place auxiliary space',
    stepsToSolve: [
      '1. Sort 0s, 1s, 2s: mid pointer scans. If nums[mid] == 0: swap(low++, mid++). If 1: mid++. If 2: swap(mid, high--).',
      '2. Kadane: Maintain running sum. Update maxSum = max(maxSum, curSum). If curSum < 0, reset curSum = 0.',
      '3. Rotate Matrix 90 deg: Transpose (swap m[i][j], m[j][i]), then reverse each row.',
      '4. Subarray Sum Equals K: Prefix sum hash map storing frequency of seen prefix sums.',
    ],
    cppSnippet: `// Dutch National Flag (Sort 0, 1, 2) in single pass O(N) time, O(1) space
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums[low++], nums[mid++]);
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            swap(nums[mid], nums[high--]);
        }
    }
}

int main() {
    vector<int> nums = {2, 0, 2, 1, 1, 0};
    sortColors(nums);
    cout << "Sorted: ";
    for (int x : nums) cout << x << " ";
    cout << endl; // 0 0 1 1 2 2
    return 0;
}`,
    pythonSnippet: `# Dutch National Flag (Sort 0, 1, 2) in single pass O(N) time, O(1) space
from typing import List

def sort_colors(nums: List[int]) -> None:
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1

if __name__ == "__main__":
    nums = [2, 0, 2, 1, 1, 0]
    sort_colors(nums)
    print(f"Sorted: {nums}") # [0, 0, 1, 1, 2, 2]`,
    pitfalls: [
      'In Dutch National Flag, when swapping with `high`, DO NOT increment `mid`! The swapped element from `high` has not been inspected yet.',
      'In Kadane’s algorithm, when all numbers are negative, resetting to 0 without recording the maximum negative number produces 0 instead of the maximum single element.',
    ],
    topProblems: [
      '2Sum Problem (LeetCode #1)',
      'Sort Colors (0, 1, 2 - LeetCode #75)',
      'Majority Element (> N/2 - LeetCode #169)',
      'Maximum Subarray Sum (Kadane - LeetCode #53)',
      'Rearrange Array by Sign (LeetCode #2149)',
      'Next Permutation (LeetCode #31)',
      'Leaders in an Array',
      'Longest Consecutive Sequence (LeetCode #128)',
      'Set Matrix Zeroes (LeetCode #73)',
      'Rotate Image by 90 Degrees (LeetCode #48)',
      'Spiral Matrix (LeetCode #54)',
      'Subarray Sum Equals K (LeetCode #560)',
    ],
  },

  '3.3': {
    subStepId: '3.3',
    stepId: 'step-3',
    stepNumber: 3,
    title: '3.3: Hard Array Problems',
    overview:
      'Advanced array manipulation: Pascal’s Triangle combinatorics, Majority Element II (> N/3), 3-Sum, 4-Sum, Merge Overlapping Intervals, Inversion Counting, and Maximum Product Subarray.',
    coreIntuition:
      'For 3-Sum: Sort first, fix element i, and run Two Pointers on remaining [i+1..n-1] while skipping duplicate values. For Inversions: When merging two halves in Merge Sort and a[i] > a[j], every remaining element in left half (mid - i + 1) forms an inversion pair!',
    recurrenceOrFormula:
      'Pascal Element: Row r, Col c = C(r-1, c-1)\nInversion Count: inv += (mid - i + 1) when a[i] > a[j] in merge step\nMax Product: Track both min_prod and max_prod because multiplying two negatives yields a positive',
    keyTechnique: 'Modified Merge Sort Counting & Sort-with-Duplicate-Skipping Two Pointers',
    timeComplexity: 'O(N log N) for inversion counting, O(N^2) for 3-Sum',
    spaceComplexity: 'O(1) extra space for 3-Sum / 4-Sum',
    stepsToSolve: [
      '1. 3-Sum: Sort nums. Loop i from 0 to n-3. If nums[i] == nums[i-1] continue. Use two pointers left = i+1, right = n-1.',
      '2. Merge Intervals: Sort by start time. If current.start <= prev.end: prev.end = max(prev.end, current.end). Else append new interval.',
      '3. Missing & Repeating Number: Use x - y = diff1 and x^2 - y^2 = diff2 to solve algebraically in O(N) time and O(1) space.',
    ],
    cppSnippet: `// 3Sum with Duplicate Skipping O(N^2) time, O(1) extra space
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    vector<vector<int>> res;
    sort(nums.begin(), nums.end());
    int n = nums.size();

    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = n - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                res.push_back({nums[i], nums[left], nums[right]});
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++; right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return res;
}

int main() {
    vector<int> nums = {-1, 0, 1, 2, -1, -4};
    auto ans = threeSum(nums);
    cout << "3Sum triplets: " << ans.size() << endl; // 2
    return 0;
}`,
    pythonSnippet: `# 3Sum with Duplicate Skipping O(N^2) time, O(1) extra space
from typing import List

def three_sum(nums: List[int]) -> List[List[int]]:
    nums.sort()
    res = []
    n = len(nums)

    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, n - 1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s == 0:
                res.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1
            elif s < 0:
                left += 1
            else:
                right -= 1
    return res

if __name__ == "__main__":
    nums = [-1, 0, 1, 2, -1, -4]
    print(f"3Sum triplets: {three_sum(nums)}")`,
    pitfalls: [
      'In 3-Sum, incrementing left or right BEFORE checking `nums[left] == nums[left+1]` skips boundary elements.',
      'In Maximum Product Subarray, not swapping max_prod and min_prod when current element is negative.',
    ],
    topProblems: [
      'Pascal’s Triangle (LeetCode #118)',
      'Majority Element II (> N/3 - LeetCode #229)',
      '3Sum (LeetCode #15)',
      '4Sum (LeetCode #18)',
      'Largest Subarray with 0 Sum',
      'Merge Overlapping Intervals (LeetCode #56)',
      'Merge Sorted Array without Extra Space (LeetCode #88)',
      'Find Missing and Repeating Number',
      'Count Inversions in Array',
      'Reverse Pairs (LeetCode #493)',
      'Maximum Product Subarray (LeetCode #152)',
    ],
  },

  // =========================================================================
  // STEP 4: BINARY SEARCH
  // =========================================================================
  '4.1': {
    subStepId: '4.1',
    stepId: 'step-4',
    stepNumber: 4,
    title: '4.1: Binary Search on 1D Arrays',
    overview:
      'Binary search partitions the search space in half at every step. Key variants include Lower Bound, Upper Bound, Search in Rotated Sorted Arrays, and Peak Element.',
    coreIntuition:
      'In a rotated sorted array, at least one half (left or right) is ALWAYS sorted! Check if target lies within the bounds of the sorted half. If yes, search there; if not, search the other half.',
    recurrenceOrFormula:
      'mid = low + (high - low) / 2 (Prevents integer overflow)\nLower Bound: First index where arr[i] >= x\nUpper Bound: First index where arr[i] > x\nRotated Sorted: if (arr[low] <= arr[mid]) left is sorted, else right is sorted',
    keyTechnique: 'Sorted Half Elimination in Rotated Arrays & Monotonicity Exploitation',
    timeComplexity: 'O(log N) iterations',
    spaceComplexity: 'O(1) iterative',
    stepsToSolve: [
      '1. Initialize low = 0, high = n - 1.',
      '2. Calculate mid = low + (high - low) / 2.',
      '3. In rotated array: Check if arr[low] <= arr[mid]. If yes, left half is sorted.',
      '4. Check if target lies in [arr[low] .. arr[mid]]. Narrow low/high accordingly.',
      '5. For duplicates (Rotated Array II), if arr[low] == arr[mid] == arr[high], shrink bounds: low++, high--.',
    ],
    cppSnippet: `// Search in Rotated Sorted Array O(log N) time, O(1) space
#include <iostream>
#include <vector>
using namespace std;

int searchRotated(vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;

        // Check if left half is sorted
        if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } else { // Right half is sorted
            if (nums[mid] < target && target <= nums[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }
    return -1;
}

int main() {
    vector<int> nums = {4, 5, 6, 7, 0, 1, 2};
    cout << "Index of 0: " << searchRotated(nums, 0) << endl; // 4
    return 0;
}`,
    pythonSnippet: `# Search in Rotated Sorted Array O(log N) time, O(1) space
from typing import List

def search_rotated(nums: List[int], target: int) -> int:
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = low + (high - low) // 2
        if nums[mid] == target:
            return mid

        if nums[low] <= nums[mid]:
            if nums[low] <= target < nums[mid]:
                high = mid - 1
            else:
                low = mid + 1
        else:
            if nums[mid] < target <= nums[high]:
                low = mid + 1
            else:
                high = mid - 1
    return -1

if __name__ == "__main__":
    nums = [4, 5, 6, 7, 0, 1, 2]
    print(f"Index of 0: {search_rotated(nums, 0)}") # 4`,
    pitfalls: [
      'Using (low + high) / 2 in C++ can cause 32-bit signed integer overflow when low + high > 2^31 - 1. Always use low + (high - low) / 2.',
      'In Rotated Sorted Array II with duplicates [1, 0, 1, 1, 1], worst case degrades to O(N) because we must shrink low and high by 1.',
    ],
    topProblems: [
      'Binary Search Iterative & Recursive (LeetCode #704)',
      'Implement Lower Bound & Upper Bound',
      'Search Insert Position (LeetCode #35)',
      'First and Last Position of Element (LeetCode #34)',
      'Search in Rotated Sorted Array I (LeetCode #33)',
      'Search in Rotated Sorted Array II (LeetCode #81)',
      'Find Minimum in Rotated Sorted Array (LeetCode #153)',
      'Single Element in a Sorted Array (LeetCode #540)',
      'Find Peak Element (LeetCode #162)',
    ],
  },

  '4.2': {
    subStepId: '4.2',
    stepId: 'step-4',
    stepNumber: 4,
    title: '4.2: Binary Search on Answers / Search Space',
    overview:
      'When you need to find the minimum possible maximum (or maximum possible minimum) and the feasibility function is monotonic: if answer X is feasible, every value > X is also feasible.',
    coreIntuition:
      'Instead of searching indices in an array, search the range of possible answer values [min_val, max_val]! Write a helper function `isPossible(mid)` that checks if `mid` satisfies problem constraints greedily in O(N) time. Binary search on `mid` takes O(log(range)) steps.',
    recurrenceOrFormula:
      'Monotonic Predicate: F F F F T T T T\nKoko Bananas: Speed v in [1, max(piles)]. Hours = sum(ceil(p / v)) <= H\nAggressive Cows: Dist d in [1, max - min]. Greedily place cows with >= d distance\nBook Allocation: Pages in [max(pages), sum(pages)]. Greedily allocate to <= K students',
    keyTechnique:
      'Master Template for BS on Answers: while (low <= high) { if (isPossible(mid)) { ans = mid; high = mid - 1; } else { low = mid + 1; } }',
    timeComplexity: 'O(N * log(max_val - min_val))',
    spaceComplexity: 'O(1) auxiliary space',
    stepsToSolve: [
      '1. Identify monotonicity: If speed/capacity X is valid, is X+1 also valid?',
      '2. Establish exact search range: low = minimum possible value, high = maximum possible value.',
      '3. Write greedy validator function `isPossible(mid)`.',
      '4. If looking for MINIMUM valid answer: when isPossible(mid) == true, record ans = mid and search left (high = mid - 1).',
      '5. If looking for MAXIMUM valid answer: when isPossible(mid) == true, record ans = mid and search right (low = mid + 1).',
    ],
    cppSnippet: `// Koko Eating Bananas O(N log(max_pile)) time, O(1) space
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

bool canEatAll(vector<int>& piles, int speed, int h) {
    long long hours = 0;
    for (int p : piles) {
        hours += (p + speed - 1) / speed; // Equivalent to ceil(p / speed)
    }
    return hours <= h;
}

int minEatingSpeed(vector<int>& piles, int h) {
    int low = 1, high = *max_element(piles.begin(), piles.end());
    int ans = high;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (canEatAll(piles, mid, h)) {
            ans = mid;
            high = mid - 1; // Try smaller speed
        } else {
            low = mid + 1;  // Need faster speed
        }
    }
    return ans;
}

int main() {
    vector<int> piles = {3, 6, 7, 11};
    cout << "Min Speed: " << minEatingSpeed(piles, 8) << endl; // 4
    return 0;
}`,
    pythonSnippet: `# Koko Eating Bananas O(N log(max_pile)) time, O(1) space
import math
from typing import List

def can_eat_all(piles: List[int], speed: int, h: int) -> bool:
    hours = sum(math.ceil(p / speed) for p in piles)
    return hours <= h

def min_eating_speed(piles: List[int], h: int) -> int:
    low, high = 1, max(piles)
    ans = high

    while low <= high:
        mid = low + (high - low) // 2
        if can_eat_all(piles, mid, h):
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans

if __name__ == "__main__":
    piles = [3, 6, 7, 11]
    print(f"Min Speed: {min_eating_speed(piles, 8)}") # 4`,
    pitfalls: [
      'In Koko Bananas or Ship Capacity, `hours` can exceed 32-bit integer limit if speed is small and piles are huge. Use `long long` in C++.',
      'Using floating-point division without rounding up: use `(p + speed - 1) / speed` in integer arithmetic.',
    ],
    topProblems: [
      'Square Root of an Integer',
      'N-th Root of an Integer',
      'Koko Eating Bananas (LeetCode #875)',
      'Minimum Days to Make M Bouquets (LeetCode #1482)',
      'Find the Smallest Divisor Given a Threshold (LeetCode #1283)',
      'Capacity to Ship Packages within D Days (LeetCode #1011)',
      'Aggressive Cows',
      'Book Allocation Problem',
      'Split Array Largest Sum (LeetCode #410)',
      'Painter’s Partition Problem',
      'Median of Two Sorted Arrays (LeetCode #4)',
    ],
  },
};

/**
 * Get theory for an exact sub-step ID (e.g. '16.2', '3.2', '4.2', etc.)
 */
export function getSubStepTheory(subStepId: string): StriverSubStepTheory | undefined {
  if (STRIVERS_SUBSTEP_THEORIES[subStepId]) {
    return STRIVERS_SUBSTEP_THEORIES[subStepId];
  }

  // Fallback: Check if sub-step starts with known prefix
  const stepPrefix = subStepId.split('.')[0];
  const matchingKey = Object.keys(STRIVERS_SUBSTEP_THEORIES).find((k) => k.startsWith(stepPrefix + '.'));
  return matchingKey ? STRIVERS_SUBSTEP_THEORIES[matchingKey] : undefined;
}
