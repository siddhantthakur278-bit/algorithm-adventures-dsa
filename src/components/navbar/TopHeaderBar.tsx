import React, { useState, useEffect } from 'react';
import { useCourse } from '../../context/CourseContext';
import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  MessagesSquare,
  Palette,
} from 'lucide-react';
import { NotificationBell } from '../common/NotificationBell';
import { LoFiRadioWidget } from '../common/LoFiRadioWidget';
import { HumanAvatar } from '../common/HumanAvatar';
import { getStoredUserProfile } from '../../utils/universalLeaderboardService';
import { GlobalOnboardingModal } from '../common/GlobalOnboardingModal';
import { ThemeSelectorModal } from '../common/ThemeSelectorModal';
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
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    setIsMobileSidebarOpen,
    realStreak,
    stats,
  } = useCourse();

  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);
  const [showThemeModal, setShowThemeModal] = useState<boolean>(false);
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

  const triggerCommandPalette = () => {
    sound.playPop();
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  // XP Progress Calculation
  const progressPercent = Math.max(15, Math.min(100, Math.round(((stats.xp % 300) / 300) * 100)));

  return (
    <header className="sticky top-0 z-30 h-14 bg-[#0a0b18]/85 backdrop-blur-xl border-b border-white/12 px-3 sm:px-5 flex items-center gap-2.5 sm:gap-3.5 select-none transition-colors shadow-lg overflow-x-clip min-w-0">
      {/* 1. Mobile Menu Trigger */}
      <button
        onClick={() => setIsMobileSidebarOpen(true)}
        className="lg:hidden p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white border border-white/15 transition cursor-pointer shrink-0"
        title="Open Navigation Menu"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* 2. Desktop Sidebar Collapse / Expand Button */}
      <button
        onClick={() => setIsSidebarCollapsed((prev) => !prev)}
        className="hidden lg:flex p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white border border-white/15 transition cursor-pointer shrink-0"
        title={isSidebarCollapsed ? 'Expand Navigation Sidebar' : 'Collapse Navigation Sidebar'}
      >
        {isSidebarCollapsed ? (
          <PanelLeftOpen className="w-4 h-4 text-amber-400" />
        ) : (
          <PanelLeftClose className="w-4 h-4 text-slate-400 hover:text-white" />
        )}
      </button>

      {/* 3. Glossy Brand Logo */}
      <div
        onClick={() => setActiveTab('problems')}
        className="logo cursor-pointer shrink-0"
        title="Algorithm Adventures - Click to go to Problem Library"
      >
        <b className="logo-badge">⚡</b>
        <span className="hidden sm:inline">Algorithm Adventures</span>
      </div>

      {/* 4. Glossy Quick Tabs Bar (Only on ultra-wide viewports to guarantee zero collision) */}
      <div className="hidden min-[1720px]:flex items-center shrink-0">
        <div className="tabs">
          <button
            onClick={() => setActiveTab('problems')}
            className={activeTab === 'problems' ? 'on' : ''}
          >
            Problems
          </button>
          <button
            onClick={() => setActiveTab('strivers-sheet')}
            className={activeTab === 'strivers-sheet' ? 'on' : ''}
          >
            A2Z Sheet
          </button>
          <button
            onClick={() => setActiveTab('quest')}
            className={activeTab === 'quest' ? 'on' : ''}
          >
            Sagas
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
            Duel
          </button>
        </div>
      </div>

      {/* 5. Fluid Flexible Spacer - Guarantees Left and Right NEVER touch or collide */}
      <div className="sp flex-1 min-w-[12px]" />

      {/* 6. Universal Command Palette Trigger (⌘K Search) */}
      <button
        type="button"
        onClick={triggerCommandPalette}
        className="k shrink-0 group"
        title="Search Topics, Quests, Files & Commands (⌘K)"
      >
        <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors" />
        <span>⌘K Search</span>
      </button>

      {/* 7. Theme Palette Switcher & Modal Trigger */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => {
            sound.playPop();
            setShowThemeModal(true);
          }}
          className="p-1.5 sm:px-2 sm:py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0"
          title="Open Theme & Palette Selector"
        >
          <Palette className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden xl:inline text-[11px] font-mono">Theme</span>
        </button>

        <div className="dots hidden lg:flex shrink-0" title="Click dot to switch glossy theme accent">
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
      </div>

      {/* 8. Streak Flame Badge */}
      <div
        className="stat hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 font-bold text-xs shrink-0"
        title={`Active Streak: ${realStreak.currentStreak} consecutive days`}
      >
        <span>🔥</span>
        <span className="font-mono">{realStreak.currentStreak} days</span>
      </div>

      {/* 9. Shimmering XP Bar with Ambient Sweep */}
      <div className="hidden 2xl:flex items-center gap-2 text-xs font-bold font-mono shrink-0">
        <div className="xp" title={`Level ${stats.level} Progress: ${progressPercent}%`}>
          <b style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="stat text-white font-bold whitespace-nowrap">
          {stats.xp.toLocaleString()} XP
        </div>
      </div>

      {/* 10. Live Notification Bell */}
      <div className="shrink-0">
        <NotificationBell />
      </div>

      {/* 11. Quick Community Chat Trigger */}
      <button
        onClick={() => setActiveTab('chat')}
        className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-full border transition cursor-pointer text-xs font-semibold shrink-0 flex items-center gap-1.5 ${
          activeTab === 'chat'
            ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-sm'
            : 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 border-white/15'
        }`}
        title="Open Community & Voice Chat Hub"
      >
        <MessagesSquare className={`w-3.5 h-3.5 ${activeTab === 'chat' ? 'text-slate-950' : 'text-amber-400'}`} />
        <span className="hidden 2xl:inline">Voice Chat</span>
      </button>

      {/* 12. LoFi Radio Widget Dropdown Pill */}
      <div className="hidden xl:block shrink-0">
        <LoFiRadioWidget />
      </div>

      {/* 13. User Human Avatar Button */}
      <button
        onClick={() => setShowOnboardingModal(true)}
        className="p-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs transition cursor-pointer shadow-sm group shrink-0 flex items-center"
        title={`Logged in as ${myProfile.displayName} (@${myProfile.handle}) - Click to configure identity`}
      >
        <HumanAvatar
          seed={myProfile.handle}
          name={myProfile.displayName}
          avatarUrl={myProfile.avatarUrl}
          size="xs"
          showStatus={true}
        />
      </button>

      {/* Identity & Verification Modal */}
      <GlobalOnboardingModal
        isOpen={showOnboardingModal}
        onClose={() => setShowOnboardingModal(false)}
      />

      {/* Theme & Palette Modal */}
      <ThemeSelectorModal
        isOpen={showThemeModal}
        onClose={() => setShowThemeModal(false)}
      />
    </header>
  );
};

