import React, { useState, useEffect } from 'react';
import { useCourse } from '../../context/CourseContext';
import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  MessagesSquare,
} from 'lucide-react';
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
    stats,
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
    <header className="sticky top-0 z-30 h-16 bg-[#090b16]/90 backdrop-blur-xl border-b border-white/10 px-3 sm:px-5 flex items-center justify-between gap-2 sm:gap-4 select-none transition-colors shadow-lg">
      {/* Left: Mobile Menu + Desktop Sidebar Toggle + 3D Logo / Active Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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
          className="flex items-center gap-2 cursor-pointer group shrink-0"
          title="Algorithm Adventures - Click to go to Problem Library"
        >
          <b className="logo-badge">⚡</b>
          <span className="font-extrabold text-sm sm:text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-[var(--a2,#38BDF8)] bg-clip-text text-transparent hidden sm:inline">
            Algorithm Adventures
          </span>
        </div>

        {/* Active Tab Sub-label */}
        <div className="hidden xl:flex items-center gap-1.5 pl-2 border-l border-white/10 text-xs text-slate-400 shrink-0">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
            {getSagaTitle(activeSaga).split(' ')[0]}
          </span>
          <span className="text-slate-600">/</span>
          <span className="font-semibold text-slate-200 truncate max-w-[140px]">
            {getTabTitle(activeTab)}
          </span>
        </div>
      </div>

      {/* Center: Modern Glossy Developer Search Bar */}
      <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg min-w-0 mx-2 sm:mx-4 flex items-center justify-center">
        <button
          type="button"
          onClick={triggerCommandPalette}
          className="w-full flex items-center justify-between gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800/90 text-slate-400 hover:text-white border border-white/10 hover:border-amber-400/35 transition-all shadow-inner group cursor-pointer text-xs backdrop-blur-md"
          title="Search problems, quests, sagas & commands (⌘K or Ctrl+K)"
        >
          <div className="flex items-center gap-2 min-w-0 truncate">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors shrink-0" />
            <span className="truncate text-slate-400 group-hover:text-slate-200 text-xs hidden sm:inline">
              Search problems, sagas, algorithms...
            </span>
            <span className="truncate text-slate-400 group-hover:text-slate-200 text-xs sm:hidden inline">
              Search...
            </span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-300 bg-white/[0.08] group-hover:bg-amber-400/15 group-hover:text-amber-300 group-hover:border-amber-400/30 border border-white/15 rounded shadow-sm shrink-0 transition-colors">
            <span className="text-[11px]">⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Right: Theme Dots + Streak + XP Bar + Community & Controls */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Interactive 5-Dot Theme Palette Switcher */}
        <div className="dots hidden sm:flex shrink-0" title="Click dot to switch glossy theme accent">
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
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold text-xs shrink-0"
          title={`Active Streak: ${realStreak.currentStreak} consecutive days`}
        >
          <span>🔥</span>
          <span className="font-mono">{realStreak.currentStreak} days</span>
        </div>

        {/* Shimmering XP Bar */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-bold font-mono shrink-0">
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
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition cursor-pointer text-xs font-semibold shrink-0 ${
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
        <div className="hidden sm:block shrink-0">
          <LoFiRadioWidget />
        </div>

        {/* User Human Avatar Button */}
        <button
          onClick={() => setShowOnboardingModal(true)}
          className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs transition cursor-pointer shadow-sm group shrink-0"
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

