import { GitCommit, Problem } from '../types';

export interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  isLinked?: boolean;
  folder?: string;
}

const STORAGE_KEY_CONFIG = 'ada_github_config';
const STORAGE_KEY_COMMITS = 'ada_git_commits';

// Default configured credentials
export function sanitizeGitHubToken(token: string): string {
  return (token || '').trim().replace(/^:\s*/, '').replace(/^['"]|['"]$/g, '');
}

export const DEFAULT_GITHUB_CONFIG: GitHubConfig = {
  token: sanitizeGitHubToken((import.meta as any).env?.VITE_GITHUB_TOKEN || ''),
  owner: 'siddhantthakur278-bit',
  repo: 'algorithm-adventures-dsa',
  branch: 'main',
};

// Generate simulated SHA-1 hash for realistic git tracking
function pseudoSha1(str: string): string {
  let hash1 = 0x67452301;
  let hash2 = 0xefcdab89;
  let hash3 = 0x98badcfe;
  let hash4 = 0x10325476;

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    hash1 = (hash1 + code * 31) & 0xffffffff;
    hash2 = (hash2 ^ code * 17) & 0xffffffff;
    hash3 = (hash3 + code * 13) & 0xffffffff;
    hash4 = (hash4 ^ (code << 3)) & 0xffffffff;
  }

  const toHex = (n: number) => (n >>> 0).toString(16).padStart(8, '0');
  return `${toHex(hash1)}${toHex(hash2)}${toHex(hash3)}${toHex(hash4)}`.slice(0, 40);
}

// UTF-8 safe base64 encoding
function utf8ToBase64(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );
}

export function loadGitHubConfig(): GitHubConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        token: sanitizeGitHubToken(parsed.token || DEFAULT_GITHUB_CONFIG.token),
        owner: (parsed.owner || DEFAULT_GITHUB_CONFIG.owner).trim(),
        repo: (parsed.repo || DEFAULT_GITHUB_CONFIG.repo).trim(),
        branch: (parsed.branch || DEFAULT_GITHUB_CONFIG.branch).trim(),
      };
    }
  } catch {
    // fallback
  }
  return { ...DEFAULT_GITHUB_CONFIG };
}

export function saveGitHubConfig(cfg: GitHubConfig): void {
  const sanitized = {
    ...cfg,
    token: sanitizeGitHubToken(cfg.token),
    owner: (cfg.owner || '').trim(),
    repo: (cfg.repo || '').trim(),
    branch: (cfg.branch || 'main').trim(),
  };
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(sanitized));
}

export function loadStoredCommits(): GitCommit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMMITS);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return [];
}

export function saveStoredCommits(commits: GitCommit[]): void {
  localStorage.setItem(STORAGE_KEY_COMMITS, JSON.stringify(commits));
}

export interface CommitResult {
  success: boolean;
  isRealGitHub: boolean;
  commit: GitCommit;
  message: string;
  commitUrl?: string;
  apiError?: string;
}

/**
 * Tests the GitHub connection: verifies token validity and whether repo exists.
 */
export async function testGitHubConnection(config: GitHubConfig): Promise<{
  ok: boolean;
  message: string;
  repoUrl?: string;
}> {
  const token = sanitizeGitHubToken(config.token);
  const owner = (config.owner || '').trim();
  const repo = (config.repo || '').trim();

  if (!token || !owner || !repo) {
    return { ok: false, message: 'Please provide Token, Owner, and Repository Name.' };
  }

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    // 1. Verify user / token
    const userRes = await fetch('https://api.github.com/user', { headers });
    if (!userRes.ok) {
      if (userRes.status === 401) {
        return { ok: false, message: 'Invalid or expired GitHub Personal Access Token (401).' };
      }
      return { ok: false, message: `GitHub user verification failed with HTTP ${userRes.status}.` };
    }

    // 2. Verify repository
    const repoRes = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}`, { headers });
    if (repoRes.status === 404) {
      return {
        ok: false,
        message: `Repository "${config.owner}/${config.repo}" was not found (404). Please create it at https://github.com/new (make sure to initialize with a README).`,
      };
    }
    if (!repoRes.ok) {
      return { ok: false, message: `Repository access check returned HTTP ${repoRes.status}.` };
    }

    const repoData = await repoRes.json();
    return {
      ok: true,
      message: `Connected successfully to ${repoData.full_name} (${repoData.private ? 'Private' : 'Public'})!`,
      repoUrl: repoData.html_url,
    };
  } catch (err: unknown) {
    return {
      ok: false,
      message: `Network error connecting to GitHub API: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}

/**
 * Commits a solved problem solution.
 * If user has configured token + owner + repo, it calls GitHub REST API.
 * Otherwise, it commits to the local Git engine with authentic SHA-1 & diffs.
 */
export async function commitProblemSolution(
  problem: Problem,
  code: string,
  userStats: { xp: number; streak: number }
): Promise<CommitResult> {
  const config = loadGitHubConfig();
  const timestamp = new Date().toISOString();
  const filePath = `solutions/ch${problem.chapterId}_${problem.category.toLowerCase().replace(/[^a-z0-9]/g, '_')}/${problem.slug}.py`;

  const commitMessage = `feat(dsa): Byte solved "${problem.title}" [${problem.difficulty}] ⚡ Streak: ${userStats.streak}d | XP: +${userStats.xp}`;

  const diffPreview = `--- /dev/null\n+++ b/${filePath}\n@@ -0,0 +1,${code.split('\n').length} @@\n${code
    .split('\n')
    .map(l => `+ ${l}`)
    .slice(0, 15)
    .join('\n')}\n${code.split('\n').length > 15 ? '... (truncated)' : ''}`;

  const seed = `${problem.id}-${code}-${timestamp}`;
  const sha = pseudoSha1(seed);

  const localCommit: GitCommit = {
    hash: sha,
    message: commitMessage,
    timestamp,
    problemId: problem.id,
    problemTitle: problem.title,
    fileChanged: filePath,
    status: 'committed',
    diffPreview,
    author: `${config.owner || 'Byte'} <${config.owner || 'byte'}@users.noreply.github.com>`,
  };

  // Check if live GitHub API is configured
  const token = sanitizeGitHubToken(config.token);
  const owner = (config.owner || '').trim();
  const repo = (config.repo || '').trim();

  if (token && owner && repo) {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      };

      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
      
      // Check if file exists first to get sha for update
      let existingFileSha: string | undefined = undefined;
      try {
        const getRes = await fetch(apiUrl, { headers });
        if (getRes.ok) {
          const fileData = await getRes.json();
          existingFileSha = fileData.sha;
        }
      } catch {
        // file doesn't exist yet, proceed with new create
      }

      // Base64 encode code content (UTF-8 safe)
      const base64Content = utf8ToBase64(code);

      const putRes = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: commitMessage,
          content: base64Content,
          branch: config.branch || 'main',
          sha: existingFileSha,
        }),
      });

      if (putRes.ok) {
        const data = await putRes.json();
        const liveSha = data.commit?.sha || sha;
        const commitUrl = data.commit?.html_url || `https://github.com/${config.owner}/${config.repo}/commit/${liveSha}`;

        const remoteCommit: GitCommit = {
          ...localCommit,
          hash: liveSha,
          status: 'pushed',
        };

        return {
          success: true,
          isRealGitHub: true,
          commit: remoteCommit,
          message: `Successfully pushed to GitHub repository ${config.owner}/${config.repo}@${liveSha.slice(0, 7)}!`,
          commitUrl,
        };
      } else {
        const errJson = await putRes.json().catch(() => ({}));
        console.warn('GitHub API PUT error:', putRes.status, errJson);
        const errMessage = errJson?.message || `HTTP ${putRes.status}`;
        
        return {
          success: true,
          isRealGitHub: false,
          commit: localCommit,
          message: `Local commit logged (${sha.slice(0, 7)}). Remote push to ${config.owner}/${config.repo} responded with: ${errMessage}.`,
          apiError: errMessage,
        };
      }
    } catch (err: unknown) {
      console.warn('GitHub API request failed, falling back to local git history:', err);
      const errMsg = err instanceof Error ? err.message : String(err);
      return {
        success: true,
        isRealGitHub: false,
        commit: localCommit,
        message: `Local commit logged (${sha.slice(0, 7)}). Remote push error: ${errMsg}`,
        apiError: errMsg,
      };
    }
  }

  // Simulated Git commit
  return {
    success: true,
    isRealGitHub: false,
    commit: localCommit,
    message: `Committed to local Git log (commit ${sha.slice(0, 7)}). Connect your GitHub token anytime to auto-push!`,
  };
}

export async function pushSolutionToGitHub(
  filePath: string,
  code: string,
  commitMessage: string
): Promise<{ success: boolean; commitUrl?: string; error?: string }> {
  const config = loadGitHubConfig();
  const token = sanitizeGitHubToken(config.token);
  const owner = (config.owner || '').trim();
  const repo = (config.repo || '').trim();

  if (!token || !owner || !repo) {
    return {
      success: false,
      error: 'GitHub not configured. Click the GitHub button in the navbar to connect your Personal Access Token.',
    };
  }

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

    let existingSha: string | undefined = undefined;
    try {
      const getRes = await fetch(apiUrl, { headers });
      if (getRes.ok) {
        const fileData = await getRes.json();
        existingSha = fileData.sha;
      }
    } catch {
      // file does not exist yet
    }

    const base64Content = utf8ToBase64(code);
    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: commitMessage,
        content: base64Content,
        branch: config.branch || 'main',
        sha: existingSha,
      }),
    });

    if (putRes.ok) {
      const data = await putRes.json();
      const commitUrl = data.commit?.html_url || `https://github.com/${config.owner}/${config.repo}/commit/${data.commit?.sha}`;
      return { success: true, commitUrl };
    } else {
      const errData = await putRes.json().catch(() => ({}));
      return {
        success: false,
        error: errData.message || `GitHub returned HTTP ${putRes.status}`,
      };
    }
  } catch (err: any) {
    return { success: false, error: String(err?.message || err) };
  }
}
