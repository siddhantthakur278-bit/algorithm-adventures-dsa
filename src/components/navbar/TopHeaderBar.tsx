import React, { useState, useEffect } from 'react';
import { useCourse } from '../../context/CourseContext';
import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Command,
  Radio,
  SlidersHorizontal,
  Flame,
  Shield,
  Columns2,
  ChevronRight,
  Sparkles,
  Trophy,
  MessagesSquare,
  Zap,
  BookOpen,
  Swords,
  Briefcase,
  Video,
} from 'lucide-react';
import { FlameIcon } from '../common/Icons';
import { NotificationBell } from '../common/NotificationBell';
import { LoFiRadioWidget } from '../common/LoFiRadioWidget';
import { HumanAvatar } from '../common/HumanAvatar';
import { getStoredUserProfile } from '../../utils/universalLeaderboardService';
import { GlobalOnboardingModal } from '../common/GlobalOnboardingModal';
import {
  QUICK_THEME_DOTS,
  applyTheme,
  getStoredTheme,
  ThemePresetId,
} from '../../utils/themeEngine';
import { sound } from '../../utils/soundEffects';

export const TopHeaderBar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    activeSaga,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    setIsMobileSidebarOpen,
    realStreak,
    dailyTargetStatus,
    stats,
    layoutMode,
    setLayoutMode,
  } = useCourse();

  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<ThemePresetId>(() => getStoredTheme());
  const myProfile = getStoredUserProfile();

  useEffect(() => {
    const handleThemeChange = (e: any) => {
      if (e?.detail?.id) setCurrentTheme(e.detail.id);
    };
    window.addEventListener('theme-changed', handleThemeChange);
    return () => window.removeEventListener('theme-changed', handleThemeChange);
  }, []);

  const handleSelectTheme = (id: ThemePresetId) => {
    sound.playPop();
    applyTheme(id);
    setCurrentTheme(id);
  };

  const getSagaTitle = (saga: string) => {
    switch (saga) {
      case 'dsa':
        return 'Advanced DSA Masterclass';
      case 'sql':
        return 'SQL & Postgres Engineering';
      case 'prisma':
        return 'Prisma ORM v7';
      case 'linear-algebra':
        return 'Linear Algebra & 3D Maths';
      case 'web-dev':
        return 'Full-Stack Web Dev';
      case 'python-dsa':
        return 'Python + DSA Adventures';
      case 'roadmap':
        return '40-Week Master Roadmap';
      default:
        return 'Curriculum';
    }
  };

  const getTabTitle = (tab: string) => {
    const titles: Record<string, string> = {
      problems: '1,000+ Problem Library',
      quest: '5 AM Daily POTD Quests',
      leaderboard: 'World Leaderboard',
      chat: 'Community & Voice Chat Hub',
      syllabus: 'Standard CS 201 Syllabus',
      profile: 'My Work & Live Stats',
      'lecture-studio': 'Lecture & VS Code Studio',
      ide: 'Python 3 Studio IDE',
      hightech: 'High-Tech Cyber Lab',
      visualizer: 'Algorithm Visualizer',
      benchmark: 'Big-O Profiler',
      duel: '1v1 Code Duel',
      interview: 'FAANG Mock Interview',
      bughunt: 'Bug Hunt Arena',
      blitz: 'Speed Blitz',
      boss: 'Boss Battle',
      skilltree: 'RPG Skill Tree',
      theory: 'Interactive Theory',
      inventory: 'Loot & Arsenal',
      flashcards: 'Power Flashcards',
      codeforces: 'Codeforces Live',
      cheatsheet: 'Mega Cheat Sheets',
    };
    return titles[tab] || tab.toUpperCase();
  };

  const triggerCommandPalette = () => {
    sound.playPop();
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  // XP Progress Calculation
  const progressPercent = Math.max(15, Math.min(100, Math.round(((stats.xp % 300) / 300) * 100)));

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#090b16]/90 backdrop-blur-xl border-b border-white/10 px-3 sm:px-5 flex items-center justify-between gap-3 select-none transition-colors shadow-lg">
      {/* Left: Mobile Menu + Desktop Sidebar Toggle + 3D Logo / Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Mobile Hamburger Drawer Trigger */}
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="lg:hidden p-2 rounded-xl bg-slate-900/90 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
          title="Open Navigation Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Desktop Sidebar Collapse / Expand Icon Button */}
        <button
          onClick={() => setIsSidebarCollapsed((prev) => !prev)}
          className="hidden lg:flex p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition cursor-pointer"
          title={isSidebarCollapsed ? 'Expand Navigation Sidebar' : 'Collapse Navigation Sidebar'}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="w-4 h-4 text-amber-400" />
          ) : (
            <PanelLeftClose className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {/* Glossy Brand Badge */}
        <div
          onClick={() => setActiveTab('problems')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <b className="logo-badge">⚡</b>
          <span className="font-extrabold text-sm sm:text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-[var(--a2,#38BDF8)] bg-clip-text text-transparent hidden sm:inline">
            Algorithm Adventures
          </span>
        </div>

        {/* Glossy Quick Tabs Bar (Problems, Quests, Studio, Duel, Interview) */}
        <div className="hidden xl:flex items-center ml-2">
          <div className="tabs-capsule">
            <button
              onClick={() => setActiveTab('problems')}
              className={activeTab === 'problems' ? 'on' : ''}
            >
              Problems
            </button>
            <button
              onClick={() => setActiveTab('quest')}
              className={activeTab === 'quest' ? 'on' : ''}
            >
              Quests
            </button>
            <button
              onClick={() => setActiveTab('lecture-studio')}
              className={activeTab === 'lecture-studio' ? 'on' : ''}
            >
              Studio
            </button>
            <button
              onClick={() => setActiveTab('duel')}
              className={activeTab === 'duel' ? 'on' : ''}
            >
              Duel Arena
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={activeTab === 'interview' ? 'on' : ''}
            >
              Interview
            </button>
          </div>
        </div>
      </div>

      {/* Center / Right: ⌘K Search + Theme Dots + Streak + XP Bar + Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Universal Command Palette Trigger Button (⌘K) */}
        <button
          onClick={triggerCommandPalette}
          className="glossy-k hidden md:inline-flex"
          title="Search Topics, Quests, Files & Commands (⌘K)"
        >
          <span>⌘K Search</span>
        </button>

        {/* Interactive 5-Dot Theme Palette Switcher */}
        <div className="dots hidden sm:flex" title="Click dot to switch glossy theme accent">
          {QUICK_THEME_DOTS.map((dot) => (
            <button
              key={dot.id}
              onClick={() => handleSelectTheme(dot.id)}
              style={{ background: dot.color, color: dot.color }}
              className={`theme-dot ${currentTheme === dot.id ? 'active-dot' : ''}`}
              title={dot.label}
              aria-label={dot.label}
            />
          ))}
        </div>

        {/* Streak Flame Badge */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold text-xs"
          title={`Active Streak: ${realStreak.currentStreak} consecutive days`}
        >
          <span>🔥</span>
          <span className="font-mono">{realStreak.currentStreak} days</span>
        </div>

        {/* Shimmering XP Bar */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-bold font-mono">
          <div className="xp-track" title={`Level ${stats.level} Progress: ${progressPercent}%`}>
            <div className="xp-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <span className="text-white font-bold whitespace-nowrap">
            {stats.xp.toLocaleString()} XP
          </span>
        </div>

        {/* Live Notification Bell */}
        <NotificationBell />

        {/* Quick Community Chat Trigger */}
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition cursor-pointer text-xs font-semibold ${
            activeTab === 'chat'
              ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-sm'
              : 'bg-white/[0.05] hover:bg-white/10 text-slate-300 border-white/10'
          }`}
          title="Open Community & Voice Chat Hub"
        >
          <MessagesSquare className={`w-3.5 h-3.5 ${activeTab === 'chat' ? 'text-slate-950' : 'text-amber-400'}`} />
          <span className="hidden xl:inline">Voice Chat</span>
        </button>

        {/* LoFi Radio Widget Dropdown Pill */}
        <div className="hidden sm:block">
          <LoFiRadioWidget />
        </div>

        {/* User Human Avatar Button */}
        <button
          onClick={() => setShowOnboardingModal(true)}
          className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs transition cursor-pointer shadow-sm group"
          title={`Logged in as ${myProfile.displayName} (@${myProfile.handle}) - Click to configure identity`}
        >
          <HumanAvatar
            seed={myProfile.handle}
            name={myProfile.displayName}
            avatarUrl={myProfile.avatarUrl}
            size="xs"
            showStatus={true}
          />
          <div className="hidden 2xl:flex flex-col text-left leading-tight">
            <span className="text-[11px] font-bold text-white group-hover:text-amber-300 transition truncate max-w-[90px]">
              {myProfile.displayName}
            </span>
            <span className="text-[9px] font-mono text-slate-400">
              @{myProfile.handle}
            </span>
          </div>
        </button>
      </div>

      {/* Identity & Verification Modal */}
      <GlobalOnboardingModal
        isOpen={showOnboardingModal}
        onClose={() => setShowOnboardingModal(false)}
      />
    </header>
  );
};

