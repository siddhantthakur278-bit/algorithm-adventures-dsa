import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, GitBranch, FolderGit2, KeyRound, ExternalLink, RefreshCw } from 'lucide-react';
import { useCourse } from '../../context/CourseContext';
import { GitHubConfig } from '../../types';
import { GithubIcon } from '../common/Icons';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubModal: React.FC<GitHubModalProps> = ({ isOpen, onClose }) => {
  const { githubConfig, updateGitHubConfig, recentCommits } = useCourse();

  const [form, setForm] = useState<GitHubConfig>({ ...githubConfig });
  const [testingStatus, setTestingStatus] = useState<{ loading: boolean; success?: boolean; message?: string }>({
    loading: false
  });

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    if (!form.token || !form.owner || !form.repo) {
      setTestingStatus({
        loading: false,
        success: false,
        message: 'Please provide Personal Access Token, Username, and Repository name.'
      });
      return;
    }

    setTestingStatus({ loading: true });
    try {
      const res = await fetch(`https://api.github.com/repos/${form.owner}/${form.repo}`, {
        headers: {
          'Authorization': `Bearer ${form.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        setTestingStatus({
          loading: false,
          success: true,
          message: `Connected successfully to ${data.full_name}! Direct commits enabled.`
        });
        updateGitHubConfig({ ...form, isLinked: true });
      } else {
        const err = await res.json().catch(() => ({}));
        setTestingStatus({
          loading: false,
          success: false,
          message: err.message || `Failed to connect (HTTP ${res.status}). Verify permissions.`
        });
      }
    } catch (e: any) {
      setTestingStatus({
        loading: false,
        success: false,
        message: `Network error: ${e.message || 'Could not reach GitHub API'}. Local simulated commits will continue.`
      });
    }
  };

  const handleSave = () => {
    updateGitHubConfig(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-[#171a29] border-2 border-black rounded-3xl shadow-comic overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 bg-[#121420] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <GithubIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bangers tracking-wider text-white">
                GITHUB DIRECT COMMIT CONFIGURATION
              </h2>
              <p className="text-xs text-slate-400">
                Automatically push every solved DSA question straight to your GitHub repository!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 font-sans">
          {/* Explanation Banner */}
          <div className="p-3.5 rounded-2xl bg-[#1e2235] border border-sky-500/30 flex items-start gap-3">
            <GitBranch className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-sky-300 block">Zero-Setup Simulated Git vs Live Remote</span>
              <p className="leading-relaxed">
                By default, Algorithm Adventures records every solve into a local Git commit tree with real SHA hashes. To push directly to your live GitHub profile, generate a GitHub Personal Access Token (classic with <code className="text-amber-400">repo</code> scope) and enter it below.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>GitHub Personal Access Token (PAT)</span>
              </label>
              <input
                type="password"
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                value={form.token}
                onChange={(e) => setForm({ ...form, token: e.target.value })}
                className="w-full bg-[#121420] border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-500"
              />
              <span className="text-[10px] text-slate-400 block">
                Required permissions: <code className="text-amber-300">repo</code> (contents:write)
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">GitHub Username / Owner</label>
              <input
                type="text"
                placeholder="e.g. johndoe"
                value={form.owner}
                onChange={(e) => setForm({ ...form, owner: e.target.value })}
                className="w-full bg-[#121420] border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">Repository Name</label>
              <input
                type="text"
                placeholder="e.g. algorithm-adventures-dsa"
                value={form.repo}
                onChange={(e) => setForm({ ...form, repo: e.target.value })}
                className="w-full bg-[#121420] border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-purple-400" />
                <span>Branch</span>
              </label>
              <input
                type="text"
                placeholder="main"
                value={form.branch}
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
                className="w-full bg-[#121420] border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Target Folder</span>
              </label>
              <input
                type="text"
                placeholder="solutions/"
                value={form.folder}
                onChange={(e) => setForm({ ...form, folder: e.target.value })}
                className="w-full bg-[#121420] border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Test Status feedback */}
          {testingStatus.message && (
            <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
              testingStatus.success
                ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                : 'bg-red-950/50 border-red-500/40 text-red-300'
            }`}>
              {testingStatus.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{testingStatus.message}</span>
            </div>
          )}

          {/* Recent Commits Stream */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="font-bold text-white uppercase font-mono text-[11px]">
              Recent Direct Commits ({recentCommits.length})
            </h4>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {recentCommits.map((c, i) => (
                <div key={c.sha || c.hash || i} className="p-2.5 rounded-xl bg-[#121420] border border-slate-800 text-xs font-mono flex items-center justify-between">
                  <div className="truncate pr-2">
                    <span className="text-purple-400 font-bold mr-2">[{c.sha || (c.hash ? c.hash.slice(0, 7) : 'git')}]</span>
                    <span className="text-slate-200">{c.message}</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ${
                    c.status === 'synced' ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#121420] border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handleTestConnection}
            disabled={testingStatus.loading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1e2235] hover:bg-[#282d47] border border-slate-700 text-xs font-bold text-slate-200 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testingStatus.loading ? 'animate-spin' : ''}`} />
            <span>Test Connection</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-comic-yellow hover:bg-yellow-400 text-black font-bangers text-sm tracking-wider shadow-comic-sm transition-all"
            >
              SAVE CONFIG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
