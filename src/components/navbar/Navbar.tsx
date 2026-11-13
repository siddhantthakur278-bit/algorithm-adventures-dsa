import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { ByteAvatar, ProfessorAvatar, ProfTupleAvatar, PriAvatar, ProfPivotAvatar, ProfessorPyAvatar } from '../characters/Characters';
import { FlameIcon, GithubIcon } from '../common/Icons';
import { NotificationBell } from '../common/NotificationBell';
import {
  Volume2,
  VolumeX,
  Shield,
  BookOpen,
  Code2,
  Bug,
  Compass,
  Trophy,
  FileSpreadsheet,
  Globe,
  Layers,
  Settings,
  Sparkles,
  ExternalLink,
  Zap,
  Package,
  UserCheck,
  Database,
  Calculator,
  Swords,
  Gauge,
  GitBranch,
  GraduationCap,
  Briefcase,
  Cpu,
  Command,
} from 'lucide-react';
import { loadGitHubConfig, saveGitHubConfig, testGitHubConnection } from '../../utils/githubService';
import { AchievementsModal } from '../achievements/AchievementsModal';
import { LoFiRadioWidget } from '../common/LoFiRadioWidget';
import { GlobalOnboardingModal } from '../common/GlobalOnboardingModal';

export const Navbar: React.FC = () => {
  const { stats, activeTab, setActiveTab, soundEnabled, toggleSound, useShield, activeSaga, setActiveSaga, realStreak, dailyTargetStatus } = useCourse();
  const [showGitModal, setShowGitModal] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [gitToken, setGitToken] = useState(() => loadGitHubConfig().token);
  const [gitOwner, setGitOwner] = useState(() => loadGitHubConfig().owner);
  const [gitRepo, setGitRepo] = useState(() => loadGitHubConfig().repo);
  const [saveMsg, setSaveMsg] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string; repoUrl?: string } | null>(null);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    const cfg = {
      token: gitToken.trim(),
      owner: gitOwner.trim(),
      repo: gitRepo.trim() || 'algorithm-adventures-dsa',
      branch: 'main',
    };
    saveGitHubConfig(cfg);
    const res = await testGitHubConnection(cfg);
    setTestResult(res);
    setIsTesting(false);
  };

  // Level computation
  const currentLevel = stats.level;
  const currentLevelXp = (currentLevel - 1) * 300;
  const nextLevelXp = currentLevel * 300;
  const progressPercent = Math.min(
    100,
    Math.round(((stats.xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100)
  );

  const getLevelTitle = (lvl: number) => {
    if (lvl <= 1) return 'Byte Novice';
    if (lvl <= 2) return 'Recursion Apprentice';
    if (lvl <= 3) return 'Pointer Knight';
    if (lvl <= 4) return 'Tree Whisperer';
    if (lvl <= 5) return 'Graph Navigator';
    if (lvl <= 6) return 'DP Sorcerer';
    return 'Algorithm Grandmaster';
  };

  const tabs = [
    { id: 'quest', label: 'Quests', icon: Sparkles, badge: '5 AM POTD' },
    { id: 'leaderboard', label: 'World Leaderboard', icon: Trophy, badge: 'Live Global' },
    { id: 'syllabus', label: 'CS 201 Syllabus', icon: GraduationCap, badge: 'Standard 10-Mod' },
    { id: 'profile', label: 'My Work & Live Stats', icon: UserCheck, badge: 'GitHub • CF • LC' },
    { id: 'skilltree', label: 'Skill Tree', icon: GitBranch, badge: 'RPG Sphere' },
    { id: 'theory', label: 'Theory', icon: BookOpen },
    { id: 'visualizer', label: 'Visualizer', icon: Compass, badge: '8 Modes' },
    { id: 'benchmark', label: 'Big-O Profiler', icon: Gauge, badge: 'Live Speed' },
    { id: 'hightech', label: 'High-Tech Cyber Lab', icon: Cpu, badge: 'Wasm • Raft' },
    { id: 'duel', label: '1v1 Code Duel', icon: Swords, badge: 'VS Bugsy' },
    { id: 'interview', label: 'FAANG Interview', icon: Briefcase, badge: 'Live Mock' },
    { id: 'bughunt', label: 'Bug Hunt', icon: Bug, badge: `${stats.bugHuntDefeated.length}/5` },
    { id: 'ide', label: 'Python IDE', icon: Code2, badge: 'VS Code' },
    { id: 'blitz', label: 'Speed Blitz', icon: Zap, badge: '60s' },
    { id: 'inventory', label: 'Loot & Arsenal', icon: Package, badge: `${stats.inventory.length}` },
    { id: 'flashcards', label: 'Flashcards', icon: Layers, badge: 'SRS' },
    { id: 'codeforces', label: 'Codeforces', icon: Globe },
    { id: 'boss', label: 'Boss Battle', icon: Trophy, badge: stats.bossBeaten ? 'Vanquished!' : 'Bugsy' },
    { id: 'cheatsheet', label: 'Cheat Sheet', icon: FileSpreadsheet },
  ];

  const handleSaveGit = (e: React.FormEvent) => {
    e.preventDefault();
    saveGitHubConfig({
      token: gitToken.trim(),
      owner: gitOwner.trim(),
      repo: gitRepo.trim() || 'algorithm-adventures-dsa',
      branch: 'main',
    });
    setSaveMsg('GitHub settings saved! Solved problems will now direct-commit to your repository.');
    setTimeout(() => {
      setSaveMsg('');
      setShowGitModal(false);
    }, 1800);
  };

  return (
    <>
      <header className="bg-[#0c101c] border-b-2 border-[#1b2236] sticky top-0 z-40 shadow-comic">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Top Bar: Brand + Stats & Quick Actions */}
          <div className="flex items-center justify-between py-2.5 gap-4">
            {/* Logo */}
            <div
              onClick={() => {
                if (activeSaga === 'dsa') setActiveTab('quest');
              }}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              {activeSaga === 'dsa' ? (
                <ByteAvatar size="sm" mood="happy" className="transform group-hover:rotate-6 transition" />
              ) : activeSaga === 'sql' ? (
                <ProfTupleAvatar size="sm" mood="wise" className="transform group-hover:rotate-6 transition" />
              ) : activeSaga === 'prisma' ? (
                <PriAvatar size="sm" mood="teaching" className="transform group-hover:rotate-6 transition" />
              ) : activeSaga === 'linear-algebra' ? (
                <ProfPivotAvatar size="sm" mood="wise" className="transform group-hover:rotate-6 transition" />
              ) : activeSaga === 'python-dsa' ? (
                <ProfessorPyAvatar size="sm" mood="wise" className="transform group-hover:rotate-6 transition" />
              ) : activeSaga === 'roadmap' ? (
                <ProfessorAvatar size="sm" mood="wise" className="transform group-hover:rotate-6 transition" />
              ) : (
                <ProfTupleAvatar size="sm" mood="wise" className="transform group-hover:rotate-6 transition" />
              )}
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bangers text-2xl text-[#FBBF24] tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    {activeSaga === 'dsa'
                      ? 'ALGORITHM ADVENTURES'
                      : activeSaga === 'sql'
                      ? 'SQL & DATA ENGINEERING'
                      : activeSaga === 'prisma'
                      ? 'PRISMA ORM v7'
                      : activeSaga === 'linear-algebra'
                      ? 'LINEAR ALGEBRA'
                      : activeSaga === 'python-dsa'
                      ? 'PYTHON + DSA COMIC'
                      : activeSaga === 'roadmap'
                      ? '40-WEEK MASTER ROADMAP'
                      : 'WEB DEV UNIVERSE'}
                  </span>
                  <span
                    className={`text-white text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded border border-black shadow-comic-sm ${
                      activeSaga === 'dsa'
                        ? 'bg-[#F43F5E]'
                        : activeSaga === 'sql'
                        ? 'bg-[#8B5CF6]'
                        : activeSaga === 'prisma'
                        ? 'bg-[#06B6D4]'
                        : activeSaga === 'linear-algebra'
                        ? 'bg-[#10B981]'
                        : activeSaga === 'python-dsa'
                        ? 'bg-[#EAB308] text-black'
                        : activeSaga === 'roadmap'
                        ? 'bg-[#10B981]'
                        : 'bg-[#F59E0B]'
                    }`}
                  >
                    {activeSaga === 'dsa'
                      ? 'DSA Saga'
                      : activeSaga === 'sql'
                      ? 'Comic Classic'
                      : activeSaga === 'prisma'
                      ? 'Node & Express'
                      : activeSaga === 'linear-algebra'
                      ? 'Comic Adventure'
                      : activeSaga === 'python-dsa'
                      ? 'Vol. 1 Adventure'
                      : activeSaga === 'roadmap'
                      ? 'Full-Stack & AI'
                      : '5 Comic Books'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  {activeSaga === 'dsa'
                    ? 'Issue #1: Master Structures & Algorithms with Byte'
                    : activeSaga === 'sql'
                    ? 'Semester 3 Survival Guide • PostgreSQL Edition'
                    : activeSaga === 'prisma'
                    ? 'The Full Comic Book • Node.js + Express + Prisma v7'
                    : activeSaga === 'linear-algebra'
                    ? 'From Systems of Equations to the Four Fundamental Subspaces'
                    : activeSaga === 'python-dsa'
                    ? 'The Ultimate Study Adventure • Sid, Prof. Py & Buggy'
                    : activeSaga === 'roadmap'
                    ? '10 Phases • 6 Ladder Projects • 20h/Week Rhythm • 150+ Clickable Resources'
                    : 'HTML • CSS • Tailwind • React • TypeScript Comic Classics'}
                </p>
              </div>
            </div>

            {/* Comic Saga Switcher Pill */}
            <div className="flex items-center p-0.5 sm:p-1 bg-[#060810] rounded-xl border-2 border-[#1c2237] shadow-comic-sm">
              <button
                onClick={() => setActiveSaga('dsa')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeSaga === 'dsa'
                    ? 'bg-[#FBBF24] text-black shadow-comic-sm scale-105'
                    : 'text-slate-400 hover:text-white hover:scale-102'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">DSA (Python)</span>
                <span className="sm:hidden">DSA</span>
              </button>
              <button
                onClick={() => setActiveSaga('sql')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeSaga === 'sql'
                    ? 'bg-[#8B5CF6] text-white shadow-comic-sm scale-105'
                    : 'text-slate-400 hover:text-white hover:scale-102'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">SQL (Postgres)</span>
                <span className="sm:hidden">SQL</span>
              </button>
              <button
                onClick={() => setActiveSaga('prisma')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeSaga === 'prisma'
                    ? 'bg-[#06B6D4] text-black shadow-comic-sm scale-105'
                    : 'text-slate-400 hover:text-white hover:scale-102'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prisma v7 (Node)</span>
                <span className="sm:hidden">Prisma</span>
              </button>
              <button
                onClick={() => setActiveSaga('linear-algebra')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeSaga === 'linear-algebra'
                    ? 'bg-[#10B981] text-black shadow-comic-sm scale-105'
                    : 'text-slate-400 hover:text-white hover:scale-102'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Linear Algebra</span>
                <span className="sm:hidden">LinAlg</span>
              </button>
              <button
                onClick={() => setActiveSaga('web-dev')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeSaga === 'web-dev'
                    ? 'bg-[#38BDF8] text-black shadow-comic-sm scale-105'
                    : 'text-slate-400 hover:text-white hover:scale-102'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Web Dev (5 Books)</span>
                <span className="sm:hidden">WebDev</span>
              </button>
              <button
                onClick={() => setActiveSaga('python-dsa')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeSaga === 'python-dsa'
                    ? 'bg-[#EAB308] text-black shadow-comic-sm scale-105'
                    : 'text-slate-400 hover:text-white hover:scale-102'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Python + DSA Comic</span>
                <span className="sm:hidden">Py+DSA</span>
              </button>
              <button
                onClick={() => setActiveSaga('roadmap')}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeSaga === 'roadmap'
                    ? 'bg-[#10B981] text-black shadow-comic-sm scale-105'
                    : 'text-slate-400 hover:text-white hover:scale-102'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Master Roadmap</span>
                <span className="sm:hidden">Roadmap</span>
              </button>
            </div>

            {/* Gamification Stats: Streak, Shields, XP, Level */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Streak Flame */}
              <button
                onClick={() => setShowStreakModal(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#121626] hover:bg-[#1a2035] rounded-xl border-2 border-[#1e2538] hover:border-[#FB923C]/60 shadow-comic-sm transition cursor-pointer text-left"
                title="Click to view Real Streak Target status & policy"
              >
                <div className="animate-flame">
                  <FlameIcon className="w-5 h-5 text-[#FB923C]" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bangers text-lg text-[#FBBF24] leading-none">{realStreak.currentStreak}</span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Days</span>
                  </div>
                  <div className="text-[9px] text-[#FB923C] font-semibold flex items-center gap-1">
                    <span>{dailyTargetStatus.isTargetComplete ? '🔥 Secured' : '⚠️ Pending'}</span>
                  </div>
                </div>
              </button>

              {/* Streak Shield */}
              <button
                onClick={useShield}
                disabled={stats.shieldCount <= 0}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#121626] hover:bg-[#1b2137] rounded-xl border-2 border-[#1e2538] shadow-comic-sm transition disabled:opacity-60 cursor-pointer"
                title={`${stats.shieldCount} Streak Freeze Shields available. Protects your streak if you miss a day.`}
              >
                <Shield className="w-4 h-4 text-[#38BDF8]" />
                <span className="text-xs font-bold text-sky-300">{stats.shieldCount}</span>
              </button>

              {/* Level & XP Bar */}
              <div className="hidden md:flex flex-col w-36">
                <div className="flex justify-between items-center text-[11px] mb-1">
                  <span className="font-bold text-[#FBBF24]">Lv {currentLevel}</span>
                  <span className="text-slate-300 font-mono text-[10px]">{stats.xp} XP</span>
                </div>
                <div className="w-full bg-[#121626] h-2.5 rounded-full overflow-hidden border border-[#20273d] p-[1px] relative">
                  <div
                    className="bg-gradient-to-r from-[#FBBF24] via-[#FB923C] to-[#F43F5E] h-full rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <div className="absolute inset-0 animate-xp-shimmer" />
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 font-medium truncate mt-0.5">{getLevelTitle(currentLevel)}</span>
              </div>

              {/* Universal Command Palette Trigger (⌘K) */}
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-command-palette'));
                }}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-[#141b2e] hover:bg-[#1d2742] rounded-xl border-2 border-[#1f2b48] hover:border-cyan-400/50 shadow-comic-sm text-slate-200 font-medium text-xs transition cursor-pointer"
                title="Universal Command Palette (⌘K / Ctrl+K)"
              >
                <Command className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden xl:inline text-slate-300">Quick Actions</span>
                <kbd className="hidden sm:inline-block font-mono text-[9px] px-1.5 py-0.2 bg-[#090d18] text-cyan-300 rounded border border-cyan-500/30 font-bold">
                  ⌘K
                </kbd>
              </button>

              {/* Broadcast Notification Bell */}
              <NotificationBell />

              {/* Lo-Fi & Retro Ambient Radio Widget */}
              <LoFiRadioWidget />

              {/* Sound Toggle */}
              <button
                onClick={toggleSound}
                className="p-2 rounded-xl bg-[#1b1f33] hover:bg-[#252b47] border-2 border-black shadow-comic-sm text-gray-300 hover:text-white transition"
                title={soundEnabled ? 'Mute Procedural Web Audio' : 'Unmute Sound Effects'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-[#7ED957]" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
              </button>

              {/* GitHub Direct Commit Config Button */}
              <button
                onClick={() => setShowGitModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#24292e] hover:bg-[#2f363d] rounded-xl border-2 border-black shadow-comic-sm text-white font-medium text-xs transition cursor-pointer"
                title="Configure GitHub direct commits"
              >
                <GithubIcon className="w-4 h-4 text-[#FFDE59]" />
                <span className="hidden lg:inline">GitHub</span>
                {loadGitHubConfig().token && (
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                )}
              </button>

              {/* Achievements & Trophies Button */}
              <button
                onClick={() => setShowAchievementsModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 rounded-xl border-2 border-yellow-500/60 shadow-comic-sm text-yellow-300 font-bold text-xs transition cursor-pointer"
                title="Open Achievements & Trophies Vault"
              >
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="hidden lg:inline">Trophies</span>
                <span className="px-1.5 py-0.2 bg-yellow-400 text-black rounded text-[10px] font-black">
                  {stats.badges.length}
                </span>
              </button>

              {/* Universal Identity & Handles Button */}
              <button
                onClick={() => setShowOnboardingModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-sky-500/20 to-blue-500/20 hover:from-sky-500/30 hover:to-blue-500/30 rounded-xl border-2 border-sky-400/60 shadow-comic-sm text-sky-300 font-bold text-xs transition cursor-pointer"
                title="Configure Universal Handles & Leaderboard Identity"
              >
                <Globe className="w-4 h-4 text-sky-400" />
                <span className="hidden lg:inline">My Identity</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          {activeSaga === 'dsa' && (
            <nav className="flex items-center gap-1 overflow-x-auto py-2 no-scrollbar border-t border-[#1e2337]">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-medium text-xs whitespace-nowrap transition-all border-2 cursor-pointer ${
                      isActive
                        ? 'bg-[#FFDE59] text-black border-black font-bold shadow-comic-sm -translate-y-0.5 scale-102'
                        : 'bg-transparent text-gray-300 border-transparent hover:bg-[#1b1f33] hover:text-white hover:-translate-y-0.5'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-gray-400'}`} />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded transition ${
                          isActive ? 'bg-black text-[#FFDE59]' : 'bg-[#1b1f33] text-gray-400'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          )}

          {activeSaga === 'sql' && (
            <div className="flex items-center justify-between py-2 border-t border-[#1e2337] text-xs">
              <div className="flex items-center gap-2">
                <span className="bg-[#FFB703] text-black px-2 py-0.5 rounded font-bangers text-xs tracking-wider animate-pulse">
                  POSTGRESQL 16 EDITION ACTIVE
                </span>
                <span className="text-gray-400 hidden md:inline text-[11px]">
                  Prof. Tuple, Sam & Nully • 80 Belts • 13 Comic Chapters • In-Memory SQL Engine
                </span>
              </div>
              <button
                onClick={() => setActiveSaga('dsa')}
                className="text-xs text-[#38B6FF] hover:underline font-bold flex items-center gap-1 cursor-pointer transition hover:translate-x-1"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Return to DSA Saga (Python) →</span>
              </button>
            </div>
          )}

          {activeSaga === 'prisma' && (
            <div className="flex items-center justify-between py-2 border-t border-[#1e2337] text-xs">
              <div className="flex items-center gap-2">
                <span className="bg-[#06B6D4] text-black px-2 py-0.5 rounded font-bangers text-xs tracking-wider animate-pulse">
                  PRISMA ORM v7 EDITION ACTIVE
                </span>
                <span className="text-gray-400 hidden md:inline text-[11px]">
                  Pri, Nova & Bug • 14 Levels • Interactive Query Studio • 43 Flashcards • Word Search
                </span>
              </div>
              <button
                onClick={() => setActiveSaga('dsa')}
                className="text-xs text-[#38B6FF] hover:underline font-bold flex items-center gap-1 cursor-pointer transition hover:translate-x-1"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Return to DSA Saga (Python) →</span>
              </button>
            </div>
          )}

          {activeSaga === 'roadmap' && (
            <div className="flex items-center justify-between py-2 border-t border-[#1e2337] text-xs">
              <div className="flex items-center gap-2">
                <span className="bg-[#10B981] text-black px-2 py-0.5 rounded font-bangers text-xs tracking-wider animate-pulse">
                  40-WEEK MASTER ROADMAP ACTIVE
                </span>
                <span className="text-gray-400 hidden md:inline text-[11px]">
                  Full-Stack, CS Fundamentals &amp; AI • 10 Phases • 6 Ladder Projects • 150+ Resources
                </span>
              </div>
              <button
                onClick={() => setActiveSaga('dsa')}
                className="text-xs text-[#38B6FF] hover:underline font-bold flex items-center gap-1 cursor-pointer transition hover:translate-x-1"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Return to DSA Saga (Python) →</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* GitHub Configuration Modal */}
      {showGitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121624] border-3 border-black rounded-2xl max-w-md w-full p-6 shadow-comic-lg text-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <GithubIcon className="w-6 h-6 text-[#FFDE59]" />
                <h3 className="font-bangers text-xl text-white tracking-wide">GitHub Direct Commit Engine</h3>
              </div>
              <button
                onClick={() => setShowGitModal(false)}
                className="text-gray-400 hover:text-white font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-3 leading-relaxed">
              Every time you solve a DSA problem in the Python IDE, Byte will automatically commit your solution
              with commit messages, execution complexity notes, and streak stats directly to your GitHub repository!
            </p>

            <form onSubmit={handleSaveGit} className="space-y-3.5 mt-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  GitHub Personal Access Token (Classic with <code className="text-[#38B6FF]">repo</code> scope)
                </label>
                <input
                  type="password"
                  value={gitToken}
                  onChange={e => setGitToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  className="w-full bg-[#1a1f33] border border-gray-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#FFDE59]"
                />
                <span className="text-[10px] text-gray-500 mt-1 block">
                  Leave blank to use the realistic Built-in Local Git Engine (creates genuine SHA-1 commit hashes & diff logs).
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">GitHub Username / Owner</label>
                  <input
                    type="text"
                    value={gitOwner}
                    onChange={e => setGitOwner(e.target.value)}
                    placeholder="e.g. octocat"
                    className="w-full bg-[#1a1f33] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFDE59]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Repository Name</label>
                  <input
                    type="text"
                    value={gitRepo}
                    onChange={e => setGitRepo(e.target.value)}
                    placeholder="algorithm-adventures-dsa"
                    className="w-full bg-[#1a1f33] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFDE59]"
                  />
                </div>
              </div>

              {testResult && (
                <div
                  className={`p-2.5 rounded-lg text-xs font-semibold border ${
                    testResult.ok
                      ? 'bg-green-500/20 text-green-300 border-green-500/40'
                      : 'bg-red-500/20 text-red-300 border-red-500/40'
                  }`}
                >
                  <p>{testResult.message}</p>
                  {testResult.repoUrl && (
                    <a
                      href={testResult.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#38B6FF] underline text-[11px] mt-1 inline-flex items-center gap-1"
                    >
                      View Repo on GitHub <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}

              {saveMsg && (
                <div className="p-2.5 rounded-lg bg-green-500/20 text-green-300 text-xs font-semibold border border-green-500/30">
                  {saveMsg}
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTesting}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#38B6FF] text-black hover:bg-[#52c2ff] shadow-comic-sm border-2 border-black disabled:opacity-50"
                >
                  {isTesting ? 'Testing API...' : '⚡ Test Connection'}
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowGitModal(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 hover:text-white"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#FFDE59] text-black hover:bg-[#ebd04a] shadow-comic-sm border-2 border-black"
                  >
                    Save Config
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Real Streak & Daily Target Modal */}
      {showStreakModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-comic-pop">
          <div className="bg-[#0e1222] border-3 border-black rounded-3xl max-w-lg w-full p-6 shadow-comic-lg text-slate-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#202840]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#241308] border border-[#FB923C]/50">
                  <FlameIcon className="w-6 h-6 text-[#FB923C]" />
                </div>
                <div>
                  <h3 className="font-bangers text-2xl text-white tracking-wide">
                    REAL STREAK & DAILY TARGET ENGINE
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Strict, authentic daily streak verification policy.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowStreakModal(false)}
                className="text-slate-400 hover:text-white font-bangers text-xl px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Streak Status Hero Card */}
            <div className="p-4 rounded-2xl bg-[#090d19] border-2 border-[#1c253d] flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  GENUINE CONSECUTIVE STREAK
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-bangers text-4xl text-[#FBBF24]">
                    {realStreak.currentStreak}
                  </span>
                  <span className="text-sm font-bold text-slate-300">Days Consecutive</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  All-Time Best: <strong className="text-white">{realStreak.bestStreak}d</strong>
                </span>
              </div>

              <div className="text-right">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-bangers text-xs border ${
                    dailyTargetStatus.isTargetComplete
                      ? 'bg-[#071d14] text-[#34D399] border-[#10B981]'
                      : 'bg-[#241805] text-[#FBBF24] border-[#FBBF24]/50 animate-pulse'
                  }`}
                >
                  {dailyTargetStatus.isTargetComplete ? '🔥 TODAY SECURED' : '⏳ TARGET IN PROGRESS'}
                </span>
              </div>
            </div>

            {/* Strict Policy Explainer */}
            <div className="p-3.5 rounded-xl bg-[#13192e] border border-[#232f50] text-xs leading-relaxed space-y-1.5">
              <strong className="text-white block font-bold">📜 How Real Streaks Work:</strong>
              <p className="text-slate-300 text-[11px]">
                Streaks only count when you log in, solve your <strong>5:00 AM POTD quest</strong>, and complete your assigned <strong>dynamic daily homework quota</strong>. Activity alone does not grant a streak—both daily targets must be 100% completed!
              </p>
            </div>

            {/* Live Today's Checklist */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Today's Target Checklist ({dailyTargetStatus.tasksCompleted} / {dailyTargetStatus.totalTasks} Done)
              </span>

              {/* 5:00 AM POTD */}
              <div className="p-3 rounded-xl bg-[#090d19] border border-[#1b233a] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${dailyTargetStatus.isPotdSolved ? 'bg-[#10B981] text-black' : 'bg-slate-800 text-slate-400'}`}>
                    {dailyTargetStatus.isPotdSolved ? '✓' : '1'}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-white block">5:00 AM POTD: {dailyTargetStatus.potdTitle}</span>
                    <span className="text-[10px] text-slate-400">Day of the Question morning quest</span>
                  </div>
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${dailyTargetStatus.isPotdSolved ? 'bg-[#071d14] text-[#34D399] border-[#10B981]/40' : 'bg-[#241805] text-[#FBBF24] border-[#FBBF24]/40'}`}>
                  {dailyTargetStatus.isPotdSolved ? 'Solved' : 'Pending'}
                </span>
              </div>

              {/* Dynamic Homework */}
              <div className="p-3 rounded-xl bg-[#090d19] border border-[#1b233a] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${dailyTargetStatus.isHomeworkComplete ? 'bg-[#10B981] text-black' : 'bg-slate-800 text-slate-400'}`}>
                    {dailyTargetStatus.isHomeworkComplete ? '✓' : '2'}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-white block">Daily Dynamic Homework</span>
                    <span className="text-[10px] text-slate-400">{dailyTargetStatus.solvedHomeworkCount} / {dailyTargetStatus.homeworkQuota} problems solved</span>
                  </div>
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${dailyTargetStatus.isHomeworkComplete ? 'bg-[#071d14] text-[#34D399] border-[#10B981]/40' : 'bg-[#241805] text-[#FBBF24] border-[#FBBF24]/40'}`}>
                  {dailyTargetStatus.isHomeworkComplete ? 'Complete' : `${dailyTargetStatus.solvedHomeworkCount}/${dailyTargetStatus.homeworkQuota} Done`}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[#202840]">
              <div className="flex items-center gap-1.5 text-xs text-sky-300">
                <Shield className="w-4 h-4 text-[#38BDF8]" />
                <span>{stats.shieldCount} Freeze Shields available</span>
              </div>

              <button
                onClick={() => {
                  setShowStreakModal(false);
                  setActiveTab('quest');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FBBF24] hover:bg-[#f59e0b] text-black font-bangers border border-black shadow-comic-sm transition cursor-pointer"
              >
                Solve Today's Targets &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Achievements & Trophies Modal */}
      <AchievementsModal
        isOpen={showAchievementsModal}
        onClose={() => setShowAchievementsModal(false)}
      />

      {/* Universal Identity & Onboarding Modal */}
      <GlobalOnboardingModal
        isOpen={showOnboardingModal}
        onClose={() => setShowOnboardingModal(false)}
      />
    </>
  );
};
