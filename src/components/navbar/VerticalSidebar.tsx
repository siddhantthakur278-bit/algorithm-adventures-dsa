import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import {
  Sparkles,
  Trophy,
  GraduationCap,
  UserCheck,
  GitBranch,
  BookOpen,
  Compass,
  Gauge,
  Cpu,
  Swords,
  Briefcase,
  Bug,
  Code2,
  Video,
  Zap,
  Package,
  Layers,
  Globe,
  FileSpreadsheet,
  Database,
  Calculator,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Shield,
  Volume2,
  VolumeX,
  Radio,
  SlidersHorizontal,
  Flame,
  Search,
  ExternalLink,
  Command,
  LayoutGrid,
  Columns2,
  MessagesSquare,
} from 'lucide-react';
import { FlameIcon } from '../common/Icons';
import { LoFiRadioWidget } from '../common/LoFiRadioWidget';
import { AchievementsModal } from '../achievements/AchievementsModal';
import { GlobalOnboardingModal } from '../common/GlobalOnboardingModal';
import { HumanAvatar } from '../common/HumanAvatar';
import { getStoredUserProfile } from '../../utils/universalLeaderboardService';

interface NavGroup {
  label: string;
  items: {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    highlight?: boolean;
  }[];
}

export const VerticalSidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    activeSaga,
    setActiveSaga,
    stats,
    realStreak,
    dailyTargetStatus,
    useShield,
    soundEnabled,
    toggleSound,
    layoutMode,
    setLayoutMode,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
  } = useCourse();

  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showSagaDropdown, setShowSagaDropdown] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const myProfile = getStoredUserProfile();

  const sagas = [
    { id: 'dsa', label: 'Advanced DSA Masterclass', badge: 'Core', icon: Sparkles, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { id: 'sql', label: 'SQL (PostgreSQL 16)', badge: '80 Belts', icon: Database, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { id: 'prisma', label: 'Prisma ORM v7', badge: 'v7 Capstone', icon: Code2, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { id: 'linear-algebra', label: 'Linear Algebra & 3D Math', badge: 'Maths', icon: Calculator, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: 'web-dev', label: 'Full-Stack Web Dev', badge: 'MERN', icon: Globe, color: 'text-sky-400', bg: 'bg-sky-400/10' },
    { id: 'python-dsa', label: 'Python + DSA Adventures', badge: 'PyWasm', icon: BookOpen, color: 'text-amber-300', bg: 'bg-amber-400/10' },
    { id: 'roadmap', label: '40-Week Master Roadmap', badge: 'AI & CS', icon: Compass, color: 'text-emerald-300', bg: 'bg-emerald-400/10' },
  ];

  const currentSagaObj = sagas.find((s) => s.id === activeSaga) || sagas[0];

  const navGroups: NavGroup[] = [
    {
      label: 'Curriculum & Live Track',
      items: [
        { id: 'quest', label: 'Daily POTD Quests', icon: Sparkles, badge: '5 AM' },
        { id: 'leaderboard', label: 'World Leaderboard', icon: Trophy, badge: 'Live' },
        { id: 'chat', label: 'Community & Voice Chat', icon: MessagesSquare, badge: 'Voice • Live', highlight: true },
        { id: 'syllabus', label: 'CS 201 Syllabus', icon: GraduationCap, badge: '10-Mod' },
        { id: 'profile', label: 'My Work & Live Stats', icon: UserCheck, badge: 'GH • CF • LC' },
      ],
    },
    {
      label: 'Studios & Compilers',
      items: [
        { id: 'lecture-studio', label: 'Lecture & VS Code Studio', icon: Video, badge: 'Vertical Panel', highlight: true },
        { id: 'ide', label: 'Python 3 Studio IDE', icon: Code2, badge: 'VS Code' },
        { id: 'hightech', label: 'High-Tech Cyber Lab', icon: Cpu, badge: 'Wasm' },
        { id: 'visualizer', label: 'Algorithm Visualizer', icon: Compass, badge: '8 Modes' },
        { id: 'benchmark', label: 'Big-O Profiler', icon: Gauge, badge: 'Live Speed' },
      ],
    },
    {
      label: 'Arenas & Challenges',
      items: [
        { id: 'duel', label: '1v1 Code Duel', icon: Swords, badge: 'VS Bugsy' },
        { id: 'interview', label: 'FAANG Mock Interview', icon: Briefcase, badge: 'Live' },
        { id: 'bughunt', label: 'Bug Hunt Arena', icon: Bug, badge: `${stats.bugHuntDefeated.length}/5` },
        { id: 'blitz', label: 'Speed Blitz 60s', icon: Zap, badge: 'High ' + stats.blitzHighScore },
        { id: 'boss', label: 'Boss Battle', icon: Trophy, badge: stats.bossBeaten ? 'Vanquished' : 'Ready' },
      ],
    },
    {
      label: 'Arsenal & Reference',
      items: [
        { id: 'skilltree', label: 'RPG Skill Tree', icon: GitBranch, badge: 'Spheres' },
        { id: 'theory', label: 'Interactive Theory', icon: BookOpen },
        { id: 'inventory', label: 'Loot & Arsenal', icon: Package, badge: `${stats.inventory.length}` },
        { id: 'flashcards', label: 'Power Flashcards', icon: Layers, badge: 'SRS' },
        { id: 'codeforces', label: 'Codeforces Live', icon: Globe },
        { id: 'cheatsheet', label: 'Mega Cheat Sheets', icon: FileSpreadsheet },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Vertical Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-[#07090e] border-r border-slate-800/80 flex flex-col transition-all duration-300 ease-in-out select-none shadow-2xl ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isSidebarCollapsed ? 'w-[72px]' : 'w-64'}`}
      >
        {/* Brand Insignia & Panel Header */}
        <div className="h-16 px-3.5 border-b border-slate-800/80 flex items-center justify-between gap-2 bg-[#090d16]">
          <div
            className="flex items-center gap-2.5 overflow-hidden cursor-pointer"
            onClick={() => setActiveTab('quest')}
            title="Algorithm Adventures Home"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-base shadow-sm border border-amber-300 shrink-0">
              ⚡
            </div>
            {!isSidebarCollapsed && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-extrabold text-xs sm:text-sm text-white tracking-tight truncate uppercase">
                    Algorithm Adventures
                  </h1>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                    v2.5 Vertical Hub
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Collapse/Expand Toggle Button (Desktop) */}
          <button
            onClick={() => setIsSidebarCollapsed((prev) => !prev)}
            className="hidden lg:flex w-7 h-7 rounded-lg items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/80 transition cursor-pointer shrink-0"
            title={isSidebarCollapsed ? 'Expand Sidebar (Ctrl+B)' : 'Collapse Sidebar (Ctrl+B)'}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-amber-400" />
            ) : (
              <PanelLeftClose className="w-4 h-4 text-slate-400 hover:text-amber-400" />
            )}
          </button>
        </div>

        {/* Saga Switcher Pill / Accordion */}
        <div className="p-2 border-b border-slate-800/80 bg-[#080b12]">
          <div className="relative">
            <button
              onClick={() => setShowSagaDropdown((prev) => !prev)}
              className={`w-full flex items-center gap-2 p-2 rounded-xl border transition cursor-pointer text-left ${
                isSidebarCollapsed ? 'justify-center px-0' : 'justify-between'
              } ${
                showSagaDropdown
                  ? 'bg-slate-800/90 border-amber-400/50'
                  : 'bg-[#0d121f] hover:bg-slate-800/60 border-slate-800'
              }`}
              title={`Active Saga: ${currentSagaObj.label}`}
            >
              <div className="flex items-center gap-2 truncate">
                <div className={`p-1 rounded-lg ${currentSagaObj.bg} ${currentSagaObj.color} shrink-0`}>
                  <currentSagaObj.icon className="w-4 h-4" />
                </div>
                {!isSidebarCollapsed && (
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-white truncate leading-tight">
                      {currentSagaObj.label}
                    </div>
                    <div className="text-[9px] text-amber-400 font-mono uppercase tracking-wider">
                      {currentSagaObj.badge} Active
                    </div>
                  </div>
                )}
              </div>
              {!isSidebarCollapsed && (
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                    showSagaDropdown ? 'rotate-180 text-amber-400' : ''
                  }`}
                />
              )}
            </button>

            {/* Saga Dropdown Menu */}
            {showSagaDropdown && (
              <div
                className={`absolute z-50 mt-1 bg-[#0b0f1a] border border-slate-700/80 rounded-xl shadow-2xl p-1.5 space-y-1 ${
                  isSidebarCollapsed ? 'left-full ml-2 w-64 top-0' : 'left-0 right-0 top-full'
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                  Switch Active Saga
                </div>
                {sagas.map((saga) => {
                  const Icon = saga.icon;
                  const isCurrent = saga.id === activeSaga;
                  return (
                    <button
                      key={saga.id}
                      onClick={() => {
                        setActiveSaga(saga.id as any);
                        setShowSagaDropdown(false);
                      }}
                      className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer text-left ${
                        isCurrent
                          ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-slate-950' : saga.color}`} />
                        <span className="truncate">{saga.label}</span>
                      </div>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                          isCurrent ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {saga.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Search Quick Filter (When Expanded) */}
        {!isSidebarCollapsed && (
          <div className="px-3 pt-2.5 pb-1">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Jump to tool or quest..."
                className="w-full bg-[#0b0f19] text-xs text-slate-200 placeholder-slate-500 pl-8 pr-2 py-1.5 rounded-lg border border-slate-800/80 focus:outline-none focus:border-amber-400 transition"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Vertical Navigation Scrollable Area */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-4 no-scrollbar">
          {navGroups.map((group, gIdx) => {
            const filteredItems = group.items.filter((item) =>
              item.label.toLowerCase().includes(searchFilter.toLowerCase())
            );

            if (filteredItems.length === 0) return null;

            return (
              <div key={gIdx} className="space-y-1">
                {!isSidebarCollapsed && (
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider px-2 py-1">
                    {group.label}
                  </div>
                )}
                <div className="space-y-0.5">
                  {filteredItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer group relative ${
                          isActive
                            ? 'bg-amber-400/15 text-amber-300 font-bold border border-amber-400/40 shadow-sm'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                        } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                        title={isSidebarCollapsed ? `${item.label} ${item.badge ? `(${item.badge})` : ''}` : undefined}
                      >
                        {/* Active vertical accent bar */}
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-amber-400 rounded-r-full" />
                        )}

                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive
                              ? 'text-amber-400'
                              : item.highlight
                              ? 'text-cyan-400 group-hover:text-cyan-300'
                              : 'text-slate-400 group-hover:text-white'
                          }`}
                        />

                        {!isSidebarCollapsed && (
                          <div className="flex-1 flex items-center justify-between gap-1.5 overflow-hidden text-left">
                            <span className="truncate">{item.label}</span>
                            {item.badge && (
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase tracking-wider shrink-0 transition ${
                                  isActive
                                    ? 'bg-amber-400 text-slate-950 border-amber-400'
                                    : item.highlight
                                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30 font-semibold'
                                    : 'bg-slate-900 text-slate-400 border-slate-800'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Bottom Executive Dock: Stats, Streak, Shields & Layout Switcher */}
        <div className="p-2.5 border-t border-slate-800/80 bg-[#080b13] space-y-2">
          {/* User Adventurer Identity Human Avatar Card */}
          <div
            onClick={() => setShowOnboardingModal(true)}
            className={`p-2 rounded-xl bg-[#0d121f] hover:bg-[#131b2e] border border-slate-800 transition cursor-pointer flex items-center gap-2.5 group ${
              isSidebarCollapsed ? 'justify-center p-1.5' : ''
            }`}
            title={`Adventurer: ${myProfile.displayName} (@${myProfile.handle}) - Click to edit profile`}
          >
            <HumanAvatar
              seed={myProfile.handle}
              name={myProfile.displayName}
              avatarUrl={myProfile.avatarUrl}
              size={isSidebarCollapsed ? 'xs' : 'sm'}
              showStatus={true}
            />
            {!isSidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white group-hover:text-amber-300 transition truncate flex items-center justify-between">
                  <span className="truncate">{myProfile.displayName}</span>
                  <span className="text-[9px] font-mono text-amber-400 bg-amber-400/15 px-1 rounded">
                    Lv.{stats.level}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 truncate">
                  @{myProfile.handle}
                </div>
              </div>
            )}
          </div>

          {/* Streak & Shields Compact Bar */}
          <div
            className={`flex items-center gap-1.5 bg-[#0d121f] p-1.5 rounded-xl border border-slate-800/90 ${
              isSidebarCollapsed ? 'flex-col justify-center' : 'justify-between'
            }`}
          >
            {/* Streak flame */}
            <div
              className="flex items-center gap-1.5 text-xs font-bold text-amber-300 cursor-pointer"
              title="Real Streak Calculation status"
            >
              <div className="animate-flame">
                <FlameIcon className="w-3.5 h-3.5 text-amber-400" />
              </div>
              {!isSidebarCollapsed && (
                <span>
                  {realStreak.currentStreak}d Streak{' '}
                  <span className="text-[9px] text-slate-400 font-mono">
                    ({dailyTargetStatus.isTargetComplete ? 'Done' : 'Pending'})
                  </span>
                </span>
              )}
            </div>

            {/* Shield button */}
            <button
              onClick={useShield}
              disabled={stats.shieldCount <= 0}
              className="flex items-center gap-1 text-[11px] font-bold text-sky-300 hover:text-white transition disabled:opacity-40 cursor-pointer"
              title={`${stats.shieldCount} Streak Freeze Shields Available`}
            >
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              <span>{stats.shieldCount}</span>
            </button>
          </div>

          {/* Quick Action Dock Buttons */}
          <div className={`flex items-center gap-1 ${isSidebarCollapsed ? 'flex-col' : 'justify-between'}`}>
            {/* Identity & Gmail Verification Modal Trigger */}
            <button
              onClick={() => setShowOnboardingModal(true)}
              className={`p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-400 border border-slate-800 transition cursor-pointer flex items-center justify-center ${
                isSidebarCollapsed ? 'w-full' : 'flex-1 gap-1 text-[11px] font-semibold text-slate-300'
              }`}
              title="Configure Universal Handle, Gmail OTP & Daily Schedule"
            >
              <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              {!isSidebarCollapsed && <span className="truncate">Identity</span>}
            </button>

            {/* Achievements Modal Trigger */}
            <button
              onClick={() => setShowAchievementsModal(true)}
              className={`p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 transition cursor-pointer flex items-center justify-center ${
                isSidebarCollapsed ? 'w-full' : 'flex-1 gap-1 text-[11px] font-semibold text-slate-300'
              }`}
              title="Achievements & Trophies Vault"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              {!isSidebarCollapsed && (
                <span className="truncate">
                  Trophies <span className="text-[9px] text-amber-400">({stats.badges.length})</span>
                </span>
              )}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition cursor-pointer"
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              )}
            </button>
          </div>

          {/* Layout Orientation Switcher: Vertical Panel ⇄ Top Bar */}
          <button
            onClick={() => setLayoutMode(layoutMode === 'vertical-panel' ? 'top-bar' : 'vertical-panel')}
            className={`w-full flex items-center gap-1.5 p-1.5 rounded-xl border transition cursor-pointer text-left ${
              isSidebarCollapsed ? 'justify-center' : 'justify-between'
            } ${
              layoutMode === 'vertical-panel'
                ? 'bg-amber-400/10 text-amber-300 border-amber-400/30'
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
            title="Toggle between Vertical Panel Layout (Sidebar) and Classic Top Bar Layout"
          >
            <div className="flex items-center gap-1.5">
              <Columns2 className="w-3.5 h-3.5 text-amber-400" />
              {!isSidebarCollapsed && (
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Vertical Panel Way
                </span>
              )}
            </div>
            {!isSidebarCollapsed && (
              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-400 text-slate-950 font-black">
                ACTIVE
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Achievements Modal */}
      <AchievementsModal
        isOpen={showAchievementsModal}
        onClose={() => setShowAchievementsModal(false)}
      />

      {/* Identity & Verification Modal */}
      <GlobalOnboardingModal
        isOpen={showOnboardingModal}
        onClose={() => setShowOnboardingModal(false)}
      />
    </>
  );
};
