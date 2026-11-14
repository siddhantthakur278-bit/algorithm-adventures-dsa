export interface DSAProblemIndexItem {
  id: number;
  frontend_id: number;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pattern_category: string;
  tags: string[];
  company_tags: string[];
  ac_rate: string;
  total_test_cases: number;
}

export interface DSATestCase {
  stdin: string;
  expected_stdout: string;
  is_hidden: boolean;
  order?: number;
}

export interface DSAProblemDetail extends DSAProblemIndexItem {
  statement: string;
  hints: string[];
  starter_code_python: string;
  example_test_cases: DSATestCase[];
  hidden_test_cases: DSATestCase[];
  num_example_test_cases: number;
  num_hidden_test_cases: number;
}

// In-memory caches
let cachedIndex: DSAProblemIndexItem[] | null = null;
const problemDetailCache = new Map<number, DSAProblemDetail>();

/**
 * Fetches the lightweight 1,010-problem index (~290 KB).
 */
export async function getDSAProblemsIndex(): Promise<DSAProblemIndexItem[]> {
  if (cachedIndex && cachedIndex.length > 0) {
    return cachedIndex;
  }

  try {
    const res = await fetch('/data/dsa_problems_index.json');
    if (!res.ok) {
      throw new Error(`Failed to load problems index: HTTP ${res.status}`);
    }
    const data: DSAProblemIndexItem[] = await res.json();
    cachedIndex = data;
    return data;
  } catch (err) {
    console.error('Error fetching dsa_problems_index.json:', err);
    return [];
  }
}

/**
 * Fetches the full problem statement, test cases, and starter code for a specific problem.
 */
export async function getDSAProblemDetail(id: number): Promise<DSAProblemDetail | null> {
  if (problemDetailCache.has(id)) {
    return problemDetailCache.get(id)!;
  }

  try {
    const res = await fetch(`/data/problems/${id}.json`);
    if (!res.ok) {
      throw new Error(`Failed to load problem ${id}: HTTP ${res.status}`);
    }
    const data: DSAProblemDetail = await res.json();
    problemDetailCache.set(id, data);
    return data;
  } catch (err) {
    console.error(`Error fetching /data/problems/${id}.json:`, err);
    return null;
  }
}

/**
 * Returns distinct company tags and problem counts across the dataset.
 */
export function getCompanyStats(problems: DSAProblemIndexItem[]): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of problems) {
    for (const c of p.company_tags) {
      map.set(c, (map.get(c) || 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Returns distinct pattern categories and problem counts across the dataset.
 */
export function getPatternStats(problems: DSAProblemIndexItem[]): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of problems) {
    const cat = p.pattern_category || 'general';
    map.set(cat, (map.get(cat) || 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Format category name for human display
 */
export function formatCategoryName(slug: string): string {
  const map: Record<string, string> = {
    'dp-general': 'Dynamic Programming',
    'arrays': 'Arrays & Hashing',
    'trees': 'Trees & Binary Trees',
    'recursion': 'Recursion & Backtracking',
    'strings': 'Strings & Text',
    'graphs': 'Graphs & BFS/DFS',
    'binary-search': 'Binary Search',
    'sorting': 'Sorting & Searching',
    'word-problems': 'Math & Word Problems',
    'bit-manipulation': 'Bit Manipulation',
    'two-pointers': 'Two Pointers',
    'trie': 'Trie (Prefix Trees)',
    'intervals': 'Intervals & Scheduling',
    'stack': 'Stack & Monotonic Stack',
    'linked-list': 'Linked Lists',
    'sliding-window': 'Sliding Window',
    'math': 'Math & Geometry',
    'heap': 'Heaps & Priority Queues',
    'greedy': 'Greedy Algorithms',
    'backtracking': 'Backtracking',
  };
  return map[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}
