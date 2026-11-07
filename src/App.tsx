import React, { useState, useEffect, Suspense } from 'react';
import { CourseProvider, useCourse } from './context/CourseContext';
import { Navbar } from './components/navbar/Navbar';
import { TimeTravelWidget } from './components/common/TimeTravelWidget';
import { RealTimeStatusBar } from './components/common/RealTimeStatusBar';
import { MasterClockHud } from './components/common/MasterClockHud';
import { CommandPaletteModal } from './components/common/CommandPaletteModal';
import { applyTheme, getStoredTheme } from './utils/themeEngine';
import { DailyQuestHub } from './components/daily/DailyQuestHub';
import { AiMentorDrawer } from './components/mentor/AiMentorDrawer';
import { BroadcastBanner } from './components/common/BroadcastBanner';
import { ActionBurst } from './components/common/ActionBurst';

// Lazy Loaded Sagas & Modules for Performance Optimization & Code Splitting
const SqlHub = React.lazy(() => import('./components/sql/SqlHub').then((m) => ({ default: m.SqlHub })));
const PrismaHub = React.lazy(() => import('./components/prisma/PrismaHub').then((m) => ({ default: m.PrismaHub })));
const LinearAlgebraHub = React.lazy(() => import('./components/linear/LinearAlgebraHub').then((m) => ({ default: m.LinearAlgebraHub })));
const WebDevHub = React.lazy(() => import('./components/webdev/WebDevHub').then((m) => ({ default: m.WebDevHub })));
const PythonDsaHub = React.lazy(() => import('./components/pythondsa/PythonDsaHub').then((m) => ({ default: m.PythonDsaHub })));
const MasterRoadmapHub = React.lazy(() => import('./components/roadmap/MasterRoadmapHub').then((m) => ({ default: m.MasterRoadmapHub })));

const StandardSyllabusHub = React.lazy(() => import('./components/syllabus/StandardSyllabusHub').then((m) => ({ default: m.StandardSyllabusHub })));
const LiveDeveloperProfile = React.lazy(() => import('./components/profile/LiveDeveloperProfile').then((m) => ({ default: m.LiveDeveloperProfile })));
const DsaSkillTree = React.lazy(() => import('./components/skilltree/DsaSkillTree').then((m) => ({ default: m.DsaSkillTree })));
const TheoryViewer = React.lazy(() => import('./components/theory/TheoryViewer').then((m) => ({ default: m.TheoryViewer })));
const AlgorithmVisualizer = React.lazy(() => import('./components/visualizer/AlgorithmVisualizer').then((m) => ({ default: m.AlgorithmVisualizer })));
const AlgorithmBenchmarkStudio = React.lazy(() => import('./components/benchmark/AlgorithmBenchmarkStudio').then((m) => ({ default: m.AlgorithmBenchmarkStudio })));
const HighTechLabHub = React.lazy(() => import('./components/hightech/HighTechLabHub').then((m) => ({ default: m.HighTechLabHub })));
const BugHuntArena = React.lazy(() => import('./components/bughunt/BugHuntArena').then((m) => ({ default: m.BugHuntArena })));
const VSCodeEditor = React.lazy(() => import('./components/editor/VSCodeEditor').then((m) => ({ default: m.VSCodeEditor })));
const SpeedBlitzArena = React.lazy(() => import('./components/blitz/SpeedBlitzArena').then((m) => ({ default: m.SpeedBlitzArena })));
const CodeDuelArena = React.lazy(() => import('./components/duel/CodeDuelArena').then((m) => ({ default: m.CodeDuelArena })));
const TechnicalInterviewRoom = React.lazy(() => import('./components/interview/TechnicalInterviewRoom').then((m) => ({ default: m.TechnicalInterviewRoom })));
const LootAndInventory = React.lazy(() => import('./components/inventory/LootAndInventory').then((m) => ({ default: m.LootAndInventory })));
const PowerCardDeck = React.lazy(() => import('./components/flashcards/PowerCardDeck').then((m) => ({ default: m.PowerCardDeck })));
const CodeforcesHub = React.lazy(() => import('./components/codeforces/CodeforcesHub').then((m) => ({ default: m.CodeforcesHub })));
const BossBattleModal = React.lazy(() => import('./components/boss/BossBattleModal').then((m) => ({ default: m.BossBattleModal })));
const MegaCheatSheets = React.lazy(() => import('./components/cheatsheet/MegaCheatSheets').then((m) => ({ default: m.MegaCheatSheets })));

const ComicSuspenseLoader: React.FC<{ label?: string }> = ({ label = 'Loading Adventure...' }) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-3 animate-fadeIn">
    <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xl border-2 border-black shadow-comic-sm animate-bounce">
      ⚡
    </div>
    <div className="font-bangers text-lg text-white tracking-wide flex items-center gap-2">
      <span>{label}</span>
      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
    </div>
    <p className="text-[11px] font-mono text-slate-400">
      Optimized WebAssembly &amp; Code Chunks
    </p>
  </div>
);
import {
  ByteAvatar,
  ProfessorAvatar,
  BugsyAvatar,
  ProfTupleAvatar,
  SamAvatar,
  NullyAvatar,
  PriAvatar,
  NovaAvatar,
  BugAvatar,
  ProfPivotAvatar,
  VeeAvatar,
  GaussBotAvatar,
  SidAvatar,
  ProfessorPyAvatar,
  BuggyAvatar,
} from './components/characters/Characters';
import { GithubIcon } from './components/common/Icons';

const MainContent: React.FC = () => {
  const { activeTab, activeSaga } = useCourse();

  return (
    <Suspense fallback={<ComicSuspenseLoader label="Unpacking Adventure Module..." />}>
      {activeSaga === 'sql' && (
        <main className="flex-1 pb-16">
          <SqlHub />
        </main>
      )}

      {activeSaga === 'prisma' && (
        <main className="flex-1 pb-16">
          <PrismaHub />
        </main>
      )}

      {activeSaga === 'linear-algebra' && (
        <main className="flex-1 pb-16">
          <LinearAlgebraHub />
        </main>
      )}

      {activeSaga === 'web-dev' && (
        <main className="flex-1 pb-16">
          <WebDevHub />
        </main>
      )}

      {activeSaga === 'python-dsa' && (
        <main className="flex-1 pb-16">
          <PythonDsaHub />
        </main>
      )}

      {activeSaga === 'roadmap' && (
        <main className="flex-1 pb-16">
          <MasterRoadmapHub />
        </main>
      )}

      {activeSaga === 'dsa' && (
        <main className="flex-1 pb-16">
          {activeTab === 'quest' && <DailyQuestHub />}
          {activeTab === 'syllabus' && <StandardSyllabusHub />}
          {activeTab === 'profile' && <LiveDeveloperProfile />}
          {activeTab === 'skilltree' && <DsaSkillTree />}
          {activeTab === 'theory' && <TheoryViewer />}
          {activeTab === 'visualizer' && <AlgorithmVisualizer />}
          {activeTab === 'benchmark' && <AlgorithmBenchmarkStudio />}
          {activeTab === 'hightech' && <HighTechLabHub />}
          {activeTab === 'bughunt' && <BugHuntArena />}
          {activeTab === 'ide' && <VSCodeEditor />}
          {activeTab === 'blitz' && <SpeedBlitzArena />}
          {activeTab === 'duel' && <CodeDuelArena />}
          {activeTab === 'interview' && <TechnicalInterviewRoom />}
          {activeTab === 'inventory' && <LootAndInventory />}
          {activeTab === 'flashcards' && <PowerCardDeck />}
          {activeTab === 'codeforces' && <CodeforcesHub />}
          {activeTab === 'boss' && <BossBattleModal />}
          {activeTab === 'cheatsheet' && <MegaCheatSheets />}
        </main>
      )}
    </Suspense>
  );
};

const FooterContent: React.FC = () => {
  const { activeSaga } = useCourse();

  return (
    <footer className="bg-[#0b0e18] border-t-2 border-[#1e2538] py-8 mt-auto text-xs text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {activeSaga === 'dsa' && (
          <>
            <div className="flex items-center gap-3">
              <ByteAvatar size="sm" mood="happy" />
              <div>
                <p className="font-bangers text-base text-white tracking-wide">
                  ALGORITHM ADVENTURES — THE COMIC GUIDE TO DSA
                </p>
                <p className="text-xs text-slate-400">
                  Issue #1: DSA Saga. Master Data Structures & Algorithms with Byte, Professor, and Bugsy!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-xs">
                Built with Python Pyodide Wasm & React
              </span>
              <div className="flex items-center gap-2">
                <ProfessorAvatar size="sm" mood="wise" />
                <BugsyAvatar size="sm" mood="sneaky" />
              </div>
            </div>
          </>
        )}

        {activeSaga === 'sql' && (
          <>
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2">
                <ProfTupleAvatar size="sm" mood="wise" />
                <SamAvatar size="sm" mood="curious" />
                <NullyAvatar size="sm" mood="floating" />
              </div>
              <div>
                <p className="font-bangers text-base text-white tracking-wide">
                  SQL & DATA ENGINEERING — THE COMIC CLASSIC
                </p>
                <p className="text-xs text-slate-400">
                  Semester 3 Survival Guide • PostgreSQL Edition. Featuring Prof. Tuple, Sam, Nully & Bugsy!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-xs">
                80 Belts • 13 Comic Chapters • PostgreSQL 16
              </span>
              <BugsyAvatar size="sm" mood="sneaky" />
            </div>
          </>
        )}

        {activeSaga === 'prisma' && (
          <>
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2">
                <PriAvatar size="sm" mood="teaching" />
                <NovaAvatar size="sm" mood="curious" />
                <BugAvatar size="sm" mood="sneaky" />
              </div>
              <div>
                <p className="font-bangers text-base text-white tracking-wide">
                  PRISMA ORM v7 — THE FULL COMIC BOOK
                </p>
                <p className="text-xs text-slate-400">
                  Node.js • Express • Prisma v7 • Featuring Pri, Nova, and Bug! 14 Quest Levels & Capstone
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-xs">
                Interactive Schema & Query Studio • 43 Flashcards • 16x16 Word Search
              </span>
              <div className="flex items-center gap-2">
                <PriAvatar size="sm" mood="teaching" />
                <BugAvatar size="sm" mood="sneaky" />
              </div>
            </div>
          </>
        )}

        {activeSaga === 'linear-algebra' && (
          <>
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2">
                <ProfPivotAvatar size="sm" mood="wise" />
                <VeeAvatar size="sm" mood="curious" />
                <GaussBotAvatar size="sm" mood="active" />
              </div>
              <div>
                <p className="font-bangers text-base text-[#FBBF24] tracking-wide">
                  LINEAR ALGEBRA — THE COMIC ADVENTURE
                </p>
                <p className="text-xs text-slate-400">
                  From Systems of Equations to the Four Fundamental Subspaces • 20 Chapters • 80 Problems
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-xs font-mono">
                Prof. Pivot • Vee • Gauss-bot • 60 MCQs & 20 Brain-Gym
              </span>
            </div>
          </>
        )}

        {activeSaga === 'web-dev' && (
          <>
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2">
                <ProfTupleAvatar size="sm" mood="wise" />
                <SamAvatar size="sm" mood="curious" />
                <NullyAvatar size="sm" mood="floating" />
              </div>
              <div>
                <p className="font-bangers text-base text-[#38BDF8] tracking-wide">
                  WEB DEV COMIC CLASSICS — 5 BOOKS
                </p>
                <p className="text-xs text-slate-400">
                  HTML • CSS • Tailwind • React • TypeScript • 100 Classic Problems & Live Sandboxes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-xs font-mono">
                Prof. Tuple • Sam • Nully • Bugsy
              </span>
              <BugsyAvatar size="sm" mood="sneaky" />
            </div>
          </>
        )}

        {activeSaga === 'python-dsa' && (
          <>
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2">
                <ProfessorPyAvatar size="sm" mood="wise" />
                <SidAvatar size="sm" mood="happy" />
                <BuggyAvatar size="sm" mood="sneaky" />
              </div>
              <div>
                <p className="font-bangers text-base text-[#38BDF8] tracking-wide">
                  🐍 PYTHON + DSA — THE COMIC GUIDE (VOL. 1)
                </p>
                <p className="text-xs text-slate-400">
                  The Ultimate Study Adventure • 15 Chapters • 80 Brainstormers • Cheat Sheets • Boss Battle
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-xs font-mono">
                Prof. Py • Sid • Buggy • 8 Worlds
              </span>
              <BuggyAvatar size="sm" mood="sneaky" />
            </div>
          </>
        )}

        {activeSaga === 'roadmap' && (
          <>
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2">
                <ProfessorAvatar size="sm" mood="wise" />
                <NovaAvatar size="sm" mood="happy" />
                <PriAvatar size="sm" mood="teaching" />
              </div>
              <div>
                <p className="font-bangers text-base text-[#FBBF24] tracking-wide">
                  🗺️ 40-WEEK MASTER ROADMAP — FULL-STACK, CS &amp; AI
                </p>
                <p className="text-xs text-slate-400">
                  10 Phases • 6 Ladder Projects • 150+ Curated Clickable Links • 20h/Week Rhythm
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-xs font-mono">
                Core Build Track • Daily DSA • Maths to AI • Career Command Center
              </span>
            </div>
          </>
        )}
      </div>
    </footer>
  );
};

export const AppContent: React.FC = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    applyTheme(getStoredTheme());

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = () => {
      setIsCommandPaletteOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#080a11] text-[#f1f5f9] flex flex-col font-sans selection:bg-[#FBBF24] selection:text-black relative">
      {/* Master Live Clock, Full Dates & Cohort Timeline Matrix */}
      <MasterClockHud />

      {/* Real-Time Live Telemetry Bar */}
      <RealTimeStatusBar />

      {/* Developer Time Engine Quick Controls */}
      <TimeTravelWidget />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Dynamic Tab Router */}
      <MainContent />

      {/* Floating AI Mentor Sanctuary Drawer (Ask Byte & Professor) */}
      <AiMentorDrawer />

      {/* Live In-App Broadcast Banner Toast */}
      <BroadcastBanner />

      {/* Comic Action Starburst Splash (POW! / ZAP! / BOOM!) */}
      <ActionBurst />

      {/* Universal Command Palette Modal (⌘K / Ctrl+K) */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Dynamic Comic Footer */}
      <FooterContent />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CourseProvider>
      <AppContent />
    </CourseProvider>
  );
};

export default App;
