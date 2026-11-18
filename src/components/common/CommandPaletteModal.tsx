import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Sparkles,
  Command,
  ArrowRight,
  Zap,
  GraduationCap,
  Cpu,
  Brain,
  Network,
  Briefcase,
  Swords,
  GitBranch,
  Gauge,
  UserCheck,
  Bug,
  Code2,
  FileSpreadsheet,
  Trophy,
  Layers,
  Palette,
  Volume2,
  Radio,
  Clock,
  Compass,
  Database,
  Calculator,
  Target,
  BookOpen,
  Video,
  Globe,
  RotateCcw,
  LayoutDashboard,
} from 'lucide-react';
import { useCourse } from '../../context/CourseContext';
import { sound } from '../../utils/soundEffects';
import { THEME_PRESETS, ThemePresetId, applyTheme, getStoredTheme } from '../../utils/themeEngine';
import { ambientRadio } from '../../utils/ambientMusicEngine';

interface PaletteItem {
  id: string;
  title: string;
  category: 'Navigation' | 'High-Tech Lab' | 'Saga' | 'Theme Accent' | 'Action' | 'Core CS Subjects';
  icon: React.ElementType | string;
  badge?: string;
  shortcut?: string;
  onSelect: () => void;
}

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({ isOpen, onClose }) => {
  const { setActiveTab, setActiveSaga, activeSaga } = useCourse();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<ThemePresetId>(getStoredTheme);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      sound.playPop();
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const items: PaletteItem[] = [
    // --- Navigation Tabs ---
    {
      id: 'tab-home',
      title: 'Command Center Home (Daily Quests, Curriculum Coverage, Live Stats, Smart To-Do)',
      category: 'Navigation',
      icon: LayoutDashboard,
      badge: 'Home Dashboard',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('home');
      },
    },
    {
      id: 'tab-strivers-sheet',
      title: "Striver's A2Z DSA Sheet (346+ Questions, 18 Steps)",
      category: 'Navigation',
      icon: Target,
      badge: 'Take U Forward',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('strivers-sheet');
      },
    },
    {
      id: 'tab-strivers-theory',
      title: "Striver's A2Z DSA Theory Masterclass (All 18 Steps & Mathematical Invariants)",
      category: 'Navigation',
      icon: BookOpen,
      badge: 'Theory & Proofs',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('strivers-sheet');
      },
    },
    {
      id: 'tab-quest',
      title: 'Quests & Daily 5 AM POTD',
      category: 'Navigation',
      icon: Sparkles,
      badge: 'Two Sum Day 1',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('quest');
      },
    },
    {
      id: 'tab-studio',
      title: 'Coder Army DSA Masterclass & Multi-Compiler Studio',
      category: 'Navigation',
      icon: Video,
      badge: '16 Modules • Debugger',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('lecture-studio');
      },
    },
    {
      id: 'tab-strivers',
      title: "Striver's A2Z DSA Sheet & Sub-Step Theories",
      category: 'Navigation',
      icon: Target,
      badge: '346 Qs • Take U Forward',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('strivers-sheet');
      },
    },
    {
      id: 'tab-os',
      title: 'Operating Systems (OS) Masterclass — Gate Smashers',
      category: 'Core CS Subjects',
      icon: Cpu,
      badge: 'CS 301 • 90+ Lectures',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('lecture-studio');
      },
    },
    {
      id: 'tab-dbms',
      title: 'Database Management Systems (DBMS) — Gate Smashers',
      category: 'Core CS Subjects',
      icon: Database,
      badge: 'CS 302 • 80+ Lectures',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('lecture-studio');
      },
    },
    {
      id: 'tab-cn',
      title: 'Computer Networks (CN) — Gate Smashers',
      category: 'Core CS Subjects',
      icon: Globe,
      badge: 'CS 303 • 90+ Lectures',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('lecture-studio');
      },
    },
    {
      id: 'tab-system-design',
      title: 'System Design (HLD) Masterclass — Gaurav Sen',
      category: 'Core CS Subjects',
      icon: Layers,
      badge: 'HLD • Distributed Systems',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('lecture-studio');
      },
    },
    {
      id: 'tab-lld',
      title: 'Low-Level Design (LLD) & OOPs — Concept && Coding',
      category: 'Core CS Subjects',
      icon: GitBranch,
      badge: 'LLD • SOLID • Design Patterns',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('lecture-studio');
      },
    },
    {
      id: 'tab-coa',
      title: 'Computer Organization & Architecture (COA) — Gate Smashers',
      category: 'Core CS Subjects',
      icon: Sparkles,
      badge: 'COA • Cache • Pipelines',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('lecture-studio');
      },
    },
    {
      id: 'tab-toc',
      title: 'Theory of Computation (TOC / Automata) — Gate Smashers',
      category: 'Core CS Subjects',
      icon: Cpu,
      badge: 'CS 401 • DFA, NFA, PDA, Turing',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('lecture-studio');
      },
    },
    {
      id: 'tab-compiler',
      title: 'Compiler Design (CD) — Gate Smashers',
      category: 'Core CS Subjects',
      icon: BookOpen,
      badge: 'CS 402 • Lexical, LL(1), LR(0)',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('lecture-studio');
      },
    },
    {
      id: 'tab-discrete-math',
      title: 'Discrete Mathematics (DM) — Gate Smashers',
      category: 'Core CS Subjects',
      icon: Calculator,
      badge: 'CS 202 • Logic, Relations, Graphs',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('lecture-studio');
      },
    },
    {
      id: 'tab-software-eng',
      title: 'Software Engineering (SE) — Gate Smashers',
      category: 'Core CS Subjects',
      icon: Layers,
      badge: 'CS 304 • SDLC, Agile Scrum, Testing',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('lecture-studio');
      },
    },
    {
      id: 'tab-devops',
      title: 'DevOps & Cloud Engineering — Kunal Kushwaha',
      category: 'Core CS Subjects',
      icon: Globe,
      badge: 'Docker • Kubernetes • CI/CD',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('lecture-studio');
      },
    },
    {
      id: 'tab-ml-ai',
      title: 'Machine Learning & AI Foundations — Krish Naik & 3B1B',
      category: 'Core CS Subjects',
      icon: Sparkles,
      badge: 'AI 401 • Regression, Trees, Neural Nets',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('lecture-studio');
      },
    },
    {
      id: 'tab-leaderboard',
      title: 'Global Algorithm Leaderboard & World Ranks',
      category: 'Navigation',
      icon: Trophy,
      badge: 'Worldwide Live',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('leaderboard');
      },
    },
    {
      id: 'tab-syllabus',
      title: 'CS 201 Standard 10-Module Syllabus',
      category: 'Navigation',
      icon: GraduationCap,
      badge: 'Academic Guide',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('syllabus');
      },
    },
    {
      id: 'tab-profile',
      title: 'My Work & Live Stats (GitHub Heatmap)',
      category: 'Navigation',
      icon: UserCheck,
      badge: '52-Week Streak',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('profile');
      },
    },
    {
      id: 'tab-skilltree',
      title: 'DSA RPG Skill Tree',
      category: 'Navigation',
      icon: GitBranch,
      badge: '12 Sphere Constellation',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('skilltree');
      },
    },
    {
      id: 'tab-benchmark',
      title: 'Big-O Microsecond Profiler & Wasm Benchmark',
      category: 'Navigation',
      icon: Gauge,
      badge: 'Live Curves',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('benchmark');
      },
    },
    {
      id: 'tab-hightech',
      title: 'High-Tech Cybernetics Lab',
      category: 'Navigation',
      icon: Cpu,
      badge: 'Wasm • Raft • AST',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('hightech');
      },
    },
    {
      id: 'tab-visualizer',
      title: 'Algorithm & RAM Memory Visualizer',
      category: 'Navigation',
      icon: Compass,
      badge: '8 Modes',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('visualizer');
      },
    },
    {
      id: 'tab-duel',
      title: '1v1 Code Duel vs Bugsy',
      category: 'Navigation',
      icon: Swords,
      badge: 'Live Boss',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('duel');
      },
    },
    {
      id: 'tab-interview',
      title: 'FAANG Technical Interview Room',
      category: 'Navigation',
      icon: Briefcase,
      badge: 'Live Mock Simulator',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('interview');
      },
    },
    {
      id: 'tab-ide',
      title: 'Full VS Code Wasm Python Editor',
      category: 'Navigation',
      icon: Code2,
      badge: 'CPython 3.12',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('ide');
      },
    },
    {
      id: 'tab-bughunt',
      title: 'Bug Hunt Arena',
      category: 'Navigation',
      icon: Bug,
      badge: '5 Glitches',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('bughunt');
      },
    },
    {
      id: 'tab-cheatsheet',
      title: 'Mega Cheat Sheet Studio',
      category: 'Navigation',
      icon: FileSpreadsheet,
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('cheatsheet');
      },
    },

    // --- Sagas ---
    {
      id: 'saga-dsa',
      title: 'Python DSA Saga (Issue #1)',
      category: 'Saga',
      icon: Zap,
      badge: 'DSA Track',
      onSelect: () => setActiveSaga('dsa'),
    },
    {
      id: 'saga-sql',
      title: 'SQL & Data Engineering Comic Classic',
      category: 'Saga',
      icon: Database,
      badge: 'PostgreSQL 16',
      onSelect: () => setActiveSaga('sql'),
    },
    {
      id: 'saga-prisma',
      title: 'Prisma ORM v7 Full Comic Book',
      category: 'Saga',
      icon: Code2,
      badge: 'Node & Express',
      onSelect: () => setActiveSaga('prisma'),
    },
    {
      id: 'saga-linear',
      title: 'Linear Algebra The Comic Adventure',
      category: 'Saga',
      icon: Calculator,
      badge: 'Matrices & Subspaces',
      onSelect: () => setActiveSaga('linear-algebra'),
    },
    {
      id: 'saga-webdev',
      title: 'Web Dev Universe (5 Comic Books)',
      category: 'Saga',
      icon: Compass,
      badge: 'HTML • CSS • React • TS',
      onSelect: () => setActiveSaga('web-dev'),
    },

    // --- High-Tech Lab Direct Actions ---
    {
      id: 'tech-bytecode',
      title: 'Open CPython 3.12 Bytecode Disassembler',
      category: 'High-Tech Lab',
      icon: Cpu,
      badge: 'Stack VM',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('hightech');
      },
    },
    {
      id: 'tech-neural',
      title: 'Open Neural Code Vector Space (AST Projection)',
      category: 'High-Tech Lab',
      icon: Brain,
      badge: '2D PCA Scatter',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('hightech');
      },
    },
    {
      id: 'tech-raft',
      title: 'Open Distributed Raft Consensus Simulator',
      category: 'High-Tech Lab',
      icon: Network,
      badge: '5-Node Cluster',
      onSelect: () => {
        setActiveSaga('dsa');
        setActiveTab('hightech');
      },
    },

    // --- Theme Accents ---
    {
      id: 'theme-cyan',
      title: 'Switch Accent: Cyberpunk Neon',
      category: 'Theme Accent',
      icon: '⚡',
      badge: '#06B6D4',
      onSelect: () => {
        applyTheme('cyber-cyan');
        setCurrentTheme('cyber-cyan');
        sound.playCelebration();
      },
    },
    {
      id: 'theme-amber',
      title: 'Switch Accent: Golden Manga (Default)',
      category: 'Theme Accent',
      icon: '🌟',
      badge: '#FBBF24',
      onSelect: () => {
        applyTheme('manga-amber');
        setCurrentTheme('manga-amber');
        sound.playCelebration();
      },
    },
    {
      id: 'theme-emerald',
      title: 'Switch Accent: Matrix Terminal',
      category: 'Theme Accent',
      icon: '💻',
      badge: '#10B981',
      onSelect: () => {
        applyTheme('matrix-emerald');
        setCurrentTheme('matrix-emerald');
        sound.playCelebration();
      },
    },
    {
      id: 'theme-violet',
      title: 'Switch Accent: Tokyo Midnight',
      category: 'Theme Accent',
      icon: '🌌',
      badge: '#8B5CF6',
      onSelect: () => {
        applyTheme('tokyo-violet');
        setCurrentTheme('tokyo-violet');
        sound.playCelebration();
      },
    },
    {
      id: 'theme-rose',
      title: 'Switch Accent: Synthetix Rose',
      category: 'Theme Accent',
      icon: '🩸',
      badge: '#F43F5E',
      onSelect: () => {
        applyTheme('crimson-neon');
        setCurrentTheme('crimson-neon');
        sound.playCelebration();
      },
    },

    // --- Quick Actions ---
    {
      id: 'action-radio',
      title: 'Toggle Lo-Fi Coding Radio',
      category: 'Action',
      icon: Radio,
      badge: ambientRadio.getIsPlaying() ? 'Playing' : 'Stopped',
      onSelect: () => {
        if (ambientRadio.getIsPlaying()) {
          ambientRadio.stop();
        } else {
          ambientRadio.start('lofi');
        }
        sound.playPop();
      },
    },
    {
      id: 'action-sound',
      title: 'Toggle Sound Effects Engine',
      category: 'Action',
      icon: Volume2,
      badge: 'Web Audio Synth',
      onSelect: () => {
        sound.toggle();
        sound.playPop();
      },
    },
    {
      id: 'action-reset-journey',
      title: 'Reset Journey to 0 XP (Start Over)',
      category: 'Action',
      icon: RotateCcw,
      badge: '0 XP Hard Reset',
      onSelect: () => {
        sound.playPop();
        window.dispatchEvent(new CustomEvent('open-reset-journey'));
      },
    },
  ];

  // Filter items
  const filtered = items.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.badge && item.badge.toLowerCase().includes(q))
    );
  });

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
        sound.playTick();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
        sound.playTick();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].onSelect();
          sound.playSwoosh();
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col font-sans bg-[#14152b]/95 border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/10 bg-[#0d0e1f]/70 font-mono">
          <span className="text-sm font-bold text-[var(--a2,#38BDF8)]">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, problem, or theme... (e.g. 'Binary Search', 'Theme', 'Raft')"
            className="flex-1 bg-transparent text-white font-medium text-sm sm:text-base outline-none placeholder:text-slate-400 font-sans"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-white/[0.08] text-slate-300 px-2 py-1 rounded border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-[55vh] overflow-y-auto p-2 space-y-1 divide-y divide-white/[0.04]"
        >
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Command className="w-8 h-8 mx-auto text-slate-500" />
              <p className="text-sm font-bold">No results found for "{query}"</p>
              <p className="text-xs">Try searching for 'binary search', 'interview', or 'theme'.</p>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.onSelect();
                    sound.playSwoosh();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition ${
                    isSelected
                      ? 'bg-gradient-to-r from-[var(--a,#8B5CF6)]/50 to-[var(--a2,#38BDF8)]/25 text-white border border-white/20 shadow-md'
                      : 'text-slate-300 hover:bg-white/[0.05] hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-gradient-to-br from-[var(--a2,#38BDF8)] to-[var(--a,#8B5CF6)] text-white border-white/40 shadow-sm font-bold'
                          : 'bg-white/[0.05] text-slate-400 border-white/10'
                      }`}
                    >
                      {typeof Icon === 'string' ? (
                        <span className="text-sm">{Icon}</span>
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold truncate">{item.title}</span>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                              isSelected
                                ? 'bg-white/20 text-white border border-white/20'
                                : 'bg-white/[0.08] text-slate-300'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isSelected && (
                      <span className="text-xs text-[var(--a2,#38BDF8)] font-bold flex items-center gap-1 font-mono">
                        Jump <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-5 py-2.5 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-[10px] text-slate-300">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-[10px] text-slate-300">↵</kbd> Select
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] text-slate-300 font-bold font-sans">
              Theme: {THEME_PRESETS[currentTheme].name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
