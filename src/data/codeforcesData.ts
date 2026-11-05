import { Problem } from '../types';

export interface CodeforcesRawProblem {
  contestId: number;
  index: string;
  name: string;
  type: string;
  points?: number;
  rating?: number;
  tags: string[];
}

export const fallbackCodeforcesProblems: Problem[] = [
  {
    id: 'cf-4A',
    title: 'Watermelon (4A)',
    slug: 'watermelon-4a',
    chapterId: 1,
    category: 'Math & Brute Force',
    difficulty: 'Easy',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description:
      'One hot summer day Pete and his friend Billy decided to buy a watermelon. They want to divide the watermelon in two parts such that each part weighs an EVEN number of kilos. Can they do it?',
    examples: [
      { input: 'w = 8', output: '"YES"', explanation: 'Can divide into 2 and 6, or 4 and 4.' },
      { input: 'w = 2', output: '"NO"', explanation: 'Only 1 and 1, which are odd.' },
    ],
    constraints: ['1 <= w <= 100'],
    starterCode: `def solve_watermelon(w: int) -> str:
    # Return "YES" or "NO"
    pass`,
    solutionCode: `def solve_watermelon(w: int) -> str:
    return "YES" if w > 2 and w % 2 == 0 else "NO"`,
    testCases: [
      { id: '1', input: '8', expectedOutput: '"YES"' },
      { id: '2', input: '2', expectedOutput: '"NO"' },
      { id: '3', input: '10', expectedOutput: '"YES"' },
    ],
    hints: {
      byteHint: 'Check if the number is even and strictly greater than 2.',
      professorInsight: 'The smallest even division is 2 + 2 = 4 kilos.',
      bugsyTrap: 'Bugsy will feed you w = 2! 2 is even, but divides into 1 + 1 (odd)!',
    },
    tags: ['math', 'brute force', 'Codeforces-800'],
    codeforcesId: '4A',
    source: 'Codeforces',
  },
  {
    id: 'cf-71A',
    title: 'Way Too Long Words (71A)',
    slug: 'way-too-long-words-71a',
    chapterId: 2,
    category: 'Strings',
    difficulty: 'Easy',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description:
      'Sometimes some words like "localization" or "internationalization" are so long that writing them many times is tiresome. Let us abbreviate words strictly longer than 10 characters: first char + count of omitted chars + last char.',
    examples: [
      { input: 'word = "localization"', output: '"l10n"' },
      { input: 'word = "word"', output: '"word"' },
    ],
    constraints: ['1 <= len(word) <= 100'],
    starterCode: `def abbreviate(word: str) -> str:
    pass`,
    solutionCode: `def abbreviate(word: str) -> str:
    if len(word) > 10:
        return f"{word[0]}{len(word) - 2}{word[-1]}"
    return word`,
    testCases: [
      { id: '1', input: '"localization"', expectedOutput: '"l10n"' },
      { id: '2', input: '"word"', expectedOutput: '"word"' },
      { id: '3', input: '"internationalization"', expectedOutput: '"i18n"' },
    ],
    hints: {
      byteHint: 'Only abbreviate if len(word) > 10.',
      professorInsight: 'Count of omitted middle characters is len(word) - 2.',
      bugsyTrap: 'Do not abbreviate words with exactly 10 letters!',
    },
    tags: ['strings', 'Codeforces-800'],
    codeforcesId: '71A',
    source: 'Codeforces',
  },
  {
    id: 'cf-158A',
    title: 'Next Round (158A)',
    slug: 'next-round-158a',
    chapterId: 2,
    category: 'Arrays',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description:
      '"Contestant who earns a score equal to or greater than the k-th place finisher\'s score will advance to the next round, as long as the contestant earns a positive score..." Calculate how many participants will advance.',
    examples: [
      { input: 'n = 8, k = 5, scores = [10, 9, 8, 7, 7, 7, 5, 5]', output: '6' },
      { input: 'n = 4, k = 2, scores = [0, 0, 0, 0]', output: '0' },
    ],
    constraints: ['1 <= k <= n <= 50', '0 <= scores[i] <= 100'],
    starterCode: `def next_round(scores: list[int], k: int) -> int:
    pass`,
    solutionCode: `def next_round(scores: list[int], k: int) -> int:
    threshold = scores[k - 1]
    return sum(1 for s in scores if s >= threshold and s > 0)`,
    testCases: [
      { id: '1', input: '[10, 9, 8, 7, 7, 7, 5, 5], 5', expectedOutput: '6' },
      { id: '2', input: '[0, 0, 0, 0], 2', expectedOutput: '0' },
    ],
    hints: {
      byteHint: 'Get scores[k-1] and count how many are >= scores[k-1] and > 0.',
      professorInsight: 'Scores are sorted in non-increasing order.',
      bugsyTrap: 'A score of 0 can NEVER advance, even if k-th place also scored 0!',
    },
    tags: ['special problem', 'Codeforces-800'],
    codeforcesId: '158A',
    source: 'Codeforces',
  },
  {
    id: 'cf-231A',
    title: 'Team (231A)',
    slug: 'team-231a',
    chapterId: 1,
    category: 'Greedy & Counting',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description:
      'Three friends (Petya, Vasya, and Tonya) decide to write a contest problem if and only if at least two of them are sure about the solution. Given N problems and their confidence (1 or 0), count how many problems they will solve.',
    examples: [
      { input: 'problems = [[1, 1, 0], [1, 1, 1], [1, 0, 0]]', output: '2' },
    ],
    constraints: ['1 <= n <= 1000'],
    starterCode: `def count_team_problems(problems: list[list[int]]) -> int:
    pass`,
    solutionCode: `def count_team_problems(problems: list[list[int]]) -> int:
    return sum(1 for p in problems if sum(p) >= 2)`,
    testCases: [
      { id: '1', input: '[[1, 1, 0], [1, 1, 1], [1, 0, 0]]', expectedOutput: '2' },
      { id: '2', input: '[[1, 0, 0], [0, 1, 1]]', expectedOutput: '1' },
    ],
    hints: {
      byteHint: 'Sum up each row; if sum >= 2, increment count.',
      professorInsight: 'Simple boolean threshold counting.',
      bugsyTrap: 'Ensure you count problems with 3 confident friends too!',
    },
    tags: ['brute force', 'greedy', 'Codeforces-800'],
    codeforcesId: '231A',
    source: 'Codeforces',
  },
  {
    id: 'cf-489C',
    title: 'Given Length and Sum of Digits... (489C)',
    slug: 'given-length-and-sum-of-digits-489c',
    chapterId: 10,
    category: 'Greedy',
    difficulty: 'Medium',
    timeComplexity: 'O(M)',
    spaceComplexity: 'O(M)',
    description:
      'You are given length m and sum of digits s. Find the smallest and largest non-negative integers of length m with sum of digits s. The number cannot have leading zeroes (except single digit 0).',
    examples: [
      { input: 'm = 2, s = 15', output: '["69", "96"]' },
      { input: 'm = 3, s = 0', output: '["-1", "-1"]' },
    ],
    constraints: ['1 <= m <= 100', '0 <= s <= 900'],
    starterCode: `def find_min_max(m: int, s: int) -> list[str]:
    pass`,
    solutionCode: `def find_min_max(m: int, s: int) -> list[str]:
    if s == 0:
        return ["0", "0"] if m == 1 else ["-1", "-1"]
    if s > 9 * m:
        return ["-1", "-1"]

    # Max: greedy largest digits first
    max_digits = []
    rem = s
    for _ in range(m):
        d = min(9, rem)
        max_digits.append(str(d))
        rem -= d
    max_val = "".join(max_digits)

    # Min: greedy reverse of max with non-zero first digit
    min_digits = [0] * m
    rem = s - 1 # reserve 1 for first digit
    for i in range(m - 1, 0, -1):
        d = min(9, rem)
        min_digits[i] = d
        rem -= d
    min_digits[0] = 1 + rem
    min_val = "".join(map(str, min_digits))

    return [min_val, max_val]`,
    testCases: [
      { id: '1', input: '2, 15', expectedOutput: '["69", "96"]' },
      { id: '2', input: '3, 0', expectedOutput: '["-1", "-1"]' },
    ],
    hints: {
      byteHint: 'For maximum: greedily place 9s at the start. For minimum: greedily place 9s at the end.',
      professorInsight: 'Remember the constraint on leading zero: the first digit must be at least 1.',
      bugsyTrap: 's = 0 is only valid if m = 1! For m > 1, no number can have sum 0 without leading zero.',
    },
    tags: ['dp', 'greedy', 'Codeforces-1400'],
    codeforcesId: '489C',
    source: 'Codeforces',
  },
];

export async function fetchLiveCodeforcesProblems(): Promise<Problem[]> {
  try {
    const res = await fetch('https://codeforces.com/api/problemset.problems');
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    if (data.status !== 'OK' || !data.result?.problems) {
      return fallbackCodeforcesProblems;
    }

    const rawList: CodeforcesRawProblem[] = data.result.problems.slice(0, 30);
    const converted: Problem[] = rawList.map((p, idx) => {
      const diff: Problem['difficulty'] = (p.rating || 1000) < 1200 ? 'Easy' : (p.rating || 1000) < 1800 ? 'Medium' : 'Hard';
      return {
        id: `cf-${p.contestId}${p.index}`,
        title: `${p.name} (${p.contestId}${p.index})`,
        slug: `cf-${p.contestId}-${p.index}`.toLowerCase(),
        chapterId: (idx % 10) + 1,
        category: p.tags[0] ? p.tags[0].toUpperCase() : 'Competitive Programming',
        difficulty: diff,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        description: `Codeforces Contest ${p.contestId} Problem ${p.index}: ${p.name}. Tags: ${p.tags.join(', ')}. Official rating: ${p.rating || 'Unrated'}. Solve using standard I/O in Python.`,
        examples: [
          { input: '# See full problem on Codeforces at: https://codeforces.com/problemset/problem/' + p.contestId + '/' + p.index, output: 'Pass' },
        ],
        constraints: ['Codeforces Time Limit: 1.0s - 2.0s', 'Memory Limit: 256MB'],
        starterCode: `def solve_${p.contestId}_${p.index}():\n    # Read input and solve\n    pass`,
        solutionCode: `def solve_${p.contestId}_${p.index}():\n    return "Solved"`,
        testCases: [
          { id: '1', input: '', expectedOutput: '"Solved"' },
        ],
        hints: {
          byteHint: `Tags for this problem: ${p.tags.join(', ')}.`,
          professorInsight: `Check constraints and look for standard competitive programming patterns like ${p.tags[0] || 'greedy'}.`,
          bugsyTrap: 'Watch out for time limits on large test cases (N >= 2*10^5)!',
        },
        tags: [...p.tags, `Codeforces-${p.rating || 1000}`],
        codeforcesId: `${p.contestId}${p.index}`,
        source: 'Codeforces',
      };
    });

    return [...converted, ...fallbackCodeforcesProblems];
  } catch (err) {
    console.warn('Codeforces API unreachable or offline, using curated fallback set:', err);
    return fallbackCodeforcesProblems;
  }
}
