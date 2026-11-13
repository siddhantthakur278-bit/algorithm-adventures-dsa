import React, { useState } from 'react';
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
} from 'lucide-react';
import { FlameIcon } from '../common/Icons';
import { NotificationBell } from '../common/NotificationBell';
import { LoFiRadioWidget } from '../common/LoFiRadioWidget';
import { HumanAvatar } from '../common/HumanAvatar';
import { getStoredUserProfile } from '../../utils/universalLeaderboardService';
import { GlobalOnboardingModal } from '../common/GlobalOnboardingModal';

export const TopHeaderBar: React.FC = () => {
  const {
    activeTab,
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
  const myProfile = getStoredUserProfile();

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
      quest: '5 AM Daily POTD Quests',
      leaderboard: 'World Leaderboard',
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
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <header className="sticky top-0 z-30 h-14 bg-[#07090e]/95 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-6 flex items-center justify-between gap-3 select-none">
      {/* Left: Mobile Menu + Desktop Sidebar Toggle + Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Mobile Hamburger Drawer Trigger */}
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="lg:hidden p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 transition cursor-pointer"
          title="Open Navigation Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Desktop Sidebar Collapse / Expand Icon Button */}
        <button
          onClick={() => setIsSidebarCollapsed((prev) => !prev)}
          className="hidden lg:flex p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition cursor-pointer"
          title={isSidebarCollapsed ? 'Expand Navigation Sidebar' : 'Collapse Navigation Sidebar'}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="w-4 h-4 text-amber-400" />
          ) : (
            <PanelLeftClose className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {/* Breadcrumbs Path */}
        <div className="flex items-center gap-1.5 text-xs truncate">
          <span className="font-extrabold text-amber-400 hidden sm:inline">ADA</span>
          <span className="text-slate-600 hidden sm:inline">/</span>
          <span className="text-slate-400 font-medium truncate max-w-[120px] sm:max-w-none">
            {getSagaTitle(activeSaga)}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <span className="font-bold text-white truncate max-w-[160px] sm:max-w-none">
            {getTabTitle(activeTab)}
          </span>
        </div>
      </div>

      {/* Center / Right: Quick Search + Notifications + Layout Switcher */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Universal Command Palette Trigger Button */}
        <button
          onClick={triggerCommandPalette}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0b0f19] hover:bg-slate-800/80 text-slate-400 hover:text-white border border-slate-800 text-xs transition cursor-pointer shadow-sm"
          title="Search Topics, Quests, Files & Commands (⌘K)"
        >
          <Search className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-300">Quick Search...</span>
          <kbd className="text-[10px] bg-slate-900 border border-slate-700/80 px-1.5 py-0.5 rounded text-slate-400 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Live Notification Bell */}
        <NotificationBell />

        {/* LoFi Radio Widget Dropdown Pill */}
        <div className="hidden sm:block">
          <LoFiRadioWidget />
        </div>

        {/* Layout Switcher Pill */}
        <button
          onClick={() => setLayoutMode(layoutMode === 'vertical-panel' ? 'top-bar' : 'vertical-panel')}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#0b0f19] hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition cursor-pointer"
          title="Switch to Classic Top Bar Navigation"
        >
          <Columns2 className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] text-slate-300">Vertical Panel</span>
        </button>

        {/* User Human Avatar Button */}
        <button
          onClick={() => setShowOnboardingModal(true)}
          className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl bg-[#0b0f19] hover:bg-[#121828] border border-slate-800 text-xs transition cursor-pointer shadow-sm group"
          title={`Logged in as ${myProfile.displayName} (@${myProfile.handle}) - Click to configure identity`}
        >
          <HumanAvatar
            seed={myProfile.handle}
            name={myProfile.displayName}
            avatarUrl={myProfile.avatarUrl}
            size="xs"
            showStatus={true}
          />
          <div className="hidden xl:flex flex-col text-left leading-tight">
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
