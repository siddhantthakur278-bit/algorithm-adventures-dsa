import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  Play,
  Code2,
  Columns2,
  Rows,
  Sparkles,
  Terminal,
  CheckCircle2,
  Circle,
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ExternalLink,
  BookOpen,
  Bookmark,
  Bug,
  FileText,
  Sliders,
  RotateCcw,
  Maximize2,
  Minimize2,
  Download,
  Upload,
  Swords,
  Award,
} from 'lucide-react';
import { SupportedLanguage, generateStarterCode } from '../../utils/languageTemplates';
import {
  convertCppToPython,
  convertPythonToCpp,
  detectCodeLanguage,
} from '../../utils/codeConverter';
import {
  CODER_ARMY_MODULES,
  CODER_ARMY_LECTURES,
  CoderArmyLecture,
  CoderArmyModule,
} from '../../data/coderArmyData';
import { DebuggerSidePanel } from './DebuggerSidePanel';
import { sound } from '../../utils/soundEffects';

interface CuratedLecture {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  videoId: string;
  category: string;
  starterCode: string;
  starterLang: SupportedLanguage;
}

const CURATED_CS_LECTURES: CuratedLecture[] = [
  {
    id: 'abdul-bari-algorithms',
    title: 'Abdul Bari: Analysis of Algorithms & Asymptotic Notations',
    instructor: 'Abdul Bari',
    duration: '22:15',
    videoId: 'A03oI0znAoc',
    category: 'Algorithms',
    starterLang: 'cpp',
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

// O(N) Linear Time
int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

int main() {
    vector<int> nums = {10, 20, 30, 40, 50};
    cout << "Linear search result: " << linearSearch(nums, 30) << endl;
    return 0;
}
`,
  },
  {
    id: 'mit-peak-finding',
    title: 'MIT 6.006: Introduction to Algorithms & Peak Finding',
    instructor: 'MIT OpenCourseWare',
    duration: '48:30',
    videoId: 'ZA-tUyM_y7s',
    category: 'Algorithms',
    starterLang: 'python',
    starterCode: `def find_1d_peak(arr):
    # Divide & Conquer 1D Peak Finding: O(log N)
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        left_neighbor = arr[mid - 1] if mid > 0 else float('-inf')
        right_neighbor = arr[mid + 1] if mid < len(arr) - 1 else float('-inf')
        if arr[mid] >= left_neighbor and arr[mid] >= right_neighbor:
            return (mid, arr[mid])
        elif left_neighbor > arr[mid]:
            high = mid - 1
        else:
            low = mid + 1
    return (-1, -1)

data = [1, 3, 20, 4, 1, 0]
idx, val = find_1d_peak(data)
print(f"Peak detected at index {idx} with value {val}")
`,
  },
  {
    id: 'neetcode-two-sum',
    title: 'NeetCode: Two Sum - Visual Hash Map Proof',
    instructor: 'NeetCode',
    duration: '11:42',
    videoId: 'KLlXCFG5TnA',
    category: 'Core DSA',
    starterLang: 'cpp',
    starterCode: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(const vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.find(complement) != seen.end()) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> res = twoSum(nums, target);
    cout << "Indices: [" << res[0] << ", " << res[1] << "]" << endl;
    return 0;
}
`,
  },
];

const STORAGE_KEY_COMPLETED = 'ada_coder_army_completed_lectures';

export const LectureStudioHub: React.FC = () => {
  // Track Selection: 'coder-army' | 'curated' | 'custom'
  const [selectedTrack, setSelectedTrack] = useState<'coder-army' | 'curated' | 'custom'>('coder-army');

  // Coder Army Active Lecture
  const [selectedModuleId, setSelectedModuleId] = useState<string>('all');
  const [activeLectureId, setActiveLectureId] = useState<string>(CODER_ARMY_LECTURES[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Curated Lecture Active
  const [activeCuratedId, setActiveCuratedId] = useState<string>(CURATED_CS_LECTURES[0].id);

  // Custom Video URL
  const [customVideoUrl, setCustomVideoUrl] = useState<string>('');
  const [loadedCustomId, setLoadedCustomId] = useState<string>('KLlXCFG5TnA');
  const [embedMode, setEmbedMode] = useState<'single' | 'playlist'>('single');

  // Studio Layout Modes
  const [layoutMode, setLayoutMode] = useState<'horizontal' | 'vertical'>('horizontal');
  const [splitRatio, setSplitRatio] = useState<'balanced' | 'video-large' | 'code-large'>('balanced');
  const [isSyllabusDrawerOpen, setIsSyllabusDrawerOpen] = useState<boolean>(false);

  // Editor / Interpreter / Debugger State
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('cpp');
  const [code, setCode] = useState<string>(CODER_ARMY_LECTURES[0].starterCodes.cpp || '');

  // Completed Lectures Tracker
  const [completedLectures, setCompletedLectures] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPLETED);
      if (saved) return new Set(JSON.parse(saved));
    } catch {}
    return new Set<string>();
  });

  const activeLecture: CoderArmyLecture =
    CODER_ARMY_LECTURES.find((l) => l.id === activeLectureId) || CODER_ARMY_LECTURES[0];

  const activeCurated: CuratedLecture =
    CURATED_CS_LECTURES.find((c) => c.id === activeCuratedId) || CURATED_CS_LECTURES[0];

  // Sync starter code when active lecture or language changes
  const handleSelectCoderArmyLecture = (lecture: CoderArmyLecture) => {
    sound.playPop();
    setActiveLectureId(lecture.id);
    const newCode =
      lecture.starterCodes[currentLanguage] ||
      lecture.starterCodes.cpp ||
      lecture.starterCodes.python ||
      '';
    setCode(newCode);
  };

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    sound.playPop();
    const prevLang = currentLanguage;
    setCurrentLanguage(newLang);
    if (selectedTrack === 'coder-army') {
      if (activeLecture.starterCodes[newLang]) {
        setCode(activeLecture.starterCodes[newLang]!);
      } else {
        const isCpp = prevLang === 'cpp' || detectCodeLanguage(code) === 'cpp';
        const isPython = prevLang === 'python' || detectCodeLanguage(code) === 'python';
        if (newLang === 'python' && isCpp) {
          setCode(convertCppToPython(code, activeLecture.title));
        } else if (newLang === 'cpp' && isPython) {
          setCode(convertPythonToCpp(code, activeLecture.title));
        } else {
          setCode(generateStarterCode(newLang, activeLecture.title, ''));
        }
      }
    }
  };

  // Toggle Lecture Completed Status
  const toggleLectureCompleted = (id: string) => {
    sound.playSuccess();
    setCompletedLectures((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  // Next / Previous Lecture Navigation
  const currentIndex = CODER_ARMY_LECTURES.findIndex((l) => l.id === activeLectureId);
  const handleNextLecture = () => {
    if (currentIndex < CODER_ARMY_LECTURES.length - 1) {
      handleSelectCoderArmyLecture(CODER_ARMY_LECTURES[currentIndex + 1]);
    }
  };
  const handlePrevLecture = () => {
    if (currentIndex > 0) {
      handleSelectCoderArmyLecture(CODER_ARMY_LECTURES[currentIndex - 1]);
    }
  };

  // Custom Video ID Extractor
  const handleLoadCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customVideoUrl.trim()) return;
    sound.playPop();

    let id = customVideoUrl.trim();
    const match = id.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) id = match[1];
    setLoadedCustomId(id);
  };

  // Filter lectures based on module and search query
  const filteredLectures = CODER_ARMY_LECTURES.filter((lec) => {
    const matchesModule = selectedModuleId === 'all' || lec.moduleId === selectedModuleId;
    const matchesSearch =
      searchQuery.trim() === '' ||
      lec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lec.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesModule && matchesSearch;
  });

  // Calculate Active Video ID
  const activeVideoId =
    selectedTrack === 'coder-army'
      ? activeLecture.videoId
      : selectedTrack === 'curated'
      ? activeCurated.videoId
      : loadedCustomId;

  // Split width classes
  const getVideoWidthClass = () => {
    if (layoutMode === 'vertical') return 'w-full';
    switch (splitRatio) {
      case 'video-large':
        return 'w-full lg:w-[62%]';
      case 'code-large':
        return 'w-full lg:w-[38%]';
      case 'balanced':
      default:
        return 'w-full lg:w-1/2';
    }
  };

  const getCodeWidthClass = () => {
    if (layoutMode === 'vertical') return 'w-full';
    switch (splitRatio) {
      case 'video-large':
        return 'w-full lg:w-[38%]';
      case 'code-large':
        return 'w-full lg:w-[62%]';
      case 'balanced':
      default:
        return 'w-full lg:w-1/2';
    }
  };

  return (
    <div className="max-w-[1780px] mx-auto px-2 sm:px-4 pt-3 pb-6 space-y-4 font-sans select-none scroll-mt-20">
      {/* Studio Top Control Deck */}
      <div className="bg-[#0a0d18] border border-white/10 rounded-3xl p-3 sm:p-4 shadow-2xl flex flex-wrap items-center justify-between gap-3">
        {/* Left: Branding & Track Selector */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-lg shadow-md border border-amber-300">
            ⚔️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>Coder Army DSA Masterclass Studio</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
                  Full Syllabus
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Rohit Negi Complete DSA Curriculum with Integrated Interpreter, Debugger &amp; Terminal
            </p>
          </div>
        </div>

        {/* Center: Track Switcher (Coder Army vs Curated vs Custom) */}
        <div className="flex items-center gap-1 p-1 bg-white/[0.04] rounded-2xl border border-white/10 text-xs font-semibold">
          <button
            onClick={() => {
              sound.playPop();
              setSelectedTrack('coder-army');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer ${
              selectedTrack === 'coder-army'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Coder Army (Full Syllabus)</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setSelectedTrack('curated');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer ${
              selectedTrack === 'curated'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Curated Masters</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setSelectedTrack('custom');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer ${
              selectedTrack === 'custom'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Custom URL</span>
          </button>
        </div>

        {/* Right: Layout Switcher & Proportions */}
        <div className="flex items-center gap-2">
          {/* Orientation Toggle */}
          <div className="flex items-center gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/10 text-xs font-semibold">
            <button
              onClick={() => setLayoutMode('horizontal')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                layoutMode === 'horizontal' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Horizontal Side-by-Side Split"
            >
              <Columns2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLayoutMode('vertical')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                layoutMode === 'vertical' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Vertical Stacked Split"
            >
              <Rows className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Split Ratio Presets (for horizontal mode) */}
          {layoutMode === 'horizontal' && (
            <div className="hidden sm:flex items-center gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/10 text-xs font-semibold">
              <button
                onClick={() => setSplitRatio('balanced')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  splitRatio === 'balanced' ? 'bg-white/15 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="50% Video / 50% Debugger"
              >
                50 / 50
              </button>
              <button
                onClick={() => setSplitRatio('video-large')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  splitRatio === 'video-large' ? 'bg-white/15 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="62% Video / 38% Debugger"
              >
                Video 60%
              </button>
              <button
                onClick={() => setSplitRatio('code-large')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  splitRatio === 'code-large' ? 'bg-white/15 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="38% Video / 62% Debugger"
              >
                Code 60%
              </button>
            </div>
          )}

          {/* Toggle Syllabus Drawer Button */}
          {selectedTrack === 'coder-army' && (
            <button
              onClick={() => setIsSyllabusDrawerOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition cursor-pointer text-xs font-bold ${
                isSyllabusDrawerOpen
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/50 shadow-sm'
                  : 'bg-white/[0.06] text-slate-200 border-white/15 hover:text-white hover:bg-white/[0.10]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Syllabus Browser ({CODER_ARMY_LECTURES.length})</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isSyllabusDrawerOpen ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Coder Army Syllabus Drawer / Browser (Expandable) */}
      {selectedTrack === 'coder-army' && isSyllabusDrawerOpen && (
        <div className="bg-[#0b0e1a] border border-white/10 rounded-3xl p-4 shadow-xl space-y-3.5 animate-in fade-in duration-150">
          {/* Syllabus Header: Search & Progress Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 text-[11px] font-mono font-bold uppercase tracking-wider">
                Full 16-Module Curriculum
              </span>
              <span className="text-xs font-mono text-slate-400">
                Completed <strong className="text-white">{completedLectures.size}</strong> / {CODER_ARMY_LECTURES.length} ({Math.round((completedLectures.size / Math.max(1, CODER_ARMY_LECTURES.length)) * 100)}%)
              </span>
            </div>

            {/* Lecture Search Input */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lecture by title, topic or algorithm..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
              />
            </div>
          </div>

          {/* Module Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar text-xs">
            <button
              onClick={() => setSelectedModuleId('all')}
              className={`px-3 py-1 rounded-xl whitespace-nowrap transition cursor-pointer font-bold ${
                selectedModuleId === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10'
              }`}
            >
              All Modules ({CODER_ARMY_LECTURES.length})
            </button>
            {CODER_ARMY_MODULES.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setSelectedModuleId(mod.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl whitespace-nowrap transition cursor-pointer text-xs ${
                  selectedModuleId === mod.id
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10'
                }`}
              >
                <span>{mod.icon}</span>
                <span>{mod.title.split(':')[1]?.trim() || mod.title}</span>
              </button>
            ))}
          </div>

          {/* Lecture Cards Carousel / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto custom-scrollbar pr-1">
            {filteredLectures.map((lec) => {
              const isCurrent = lec.id === activeLectureId;
              const isCompleted = completedLectures.has(lec.id);

              return (
                <div
                  key={lec.id}
                  onClick={() => handleSelectCoderArmyLecture(lec)}
                  className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2 text-left ${
                    isCurrent
                      ? 'bg-amber-400/15 border-amber-400/50 shadow-md scale-[1.01]'
                      : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-amber-300">
                          L{lec.lectureNumber}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ⏱️ {lec.duration}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white truncate max-w-[200px]">
                        {lec.title.split(':')[1]?.trim() || lec.title}
                      </h4>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLectureCompleted(lec.id);
                      }}
                      className="p-1 text-slate-400 hover:text-emerald-400 transition"
                      title={isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400">
                    <span className="px-1.5 py-0.2 rounded bg-white/[0.06] border border-white/10">
                      {lec.difficulty}
                    </span>
                    <span className="truncate">{lec.topics.slice(0, 2).join(' • ')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Studio Arena: Video Player on Left, Side Panel Interpreter/Debugger on Right */}
      <div
        className={`flex ${
          layoutMode === 'vertical' ? 'flex-col space-y-4' : 'flex-col lg:flex-row gap-4'
        } items-stretch`}
      >
        {/* Left Pane: Embedded YouTube Player & Lecture Header */}
        <div className={`${getVideoWidthClass()} flex flex-col space-y-3`}>
          {/* Video Container Card */}
          <div className="bg-[#080b15] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            {/* Custom URL Input Bar (if on Custom tab) */}
            {selectedTrack === 'custom' && (
              <form onSubmit={handleLoadCustomVideo} className="p-3 bg-white/[0.03] border-b border-white/10 flex items-center gap-2">
                <input
                  type="text"
                  value={customVideoUrl}
                  onChange={(e) => setCustomVideoUrl(e.target.value)}
                  placeholder="Paste any YouTube Lecture URL (e.g., https://youtu.be/...)"
                  className="flex-1 bg-[#050812] px-3.5 py-1.5 text-xs text-white rounded-xl border border-white/10 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Embed Video
                </button>
              </form>
            )}

            {/* Responsive 16:9 Aspect Ratio Video Frame */}
            {/* Player Header Ribbon with Live Indicator & Quick Selector */}
            <div className="px-4 py-2.5 bg-white/[0.04] border-b border-white/10 flex flex-wrap items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                <span className="font-bold text-white text-xs truncate">
                  {selectedTrack === 'coder-army' ? 'Coder Army Masterclass' : selectedTrack === 'curated' ? activeCurated.instructor : 'Custom Stream'}
                </span>

                {selectedTrack === 'coder-army' && (
                  <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-white/10">
                    <span className="text-[10px] font-mono text-slate-400">Jump:</span>
                    <select
                      value={activeLectureId}
                      onChange={(e) => {
                        const target = CODER_ARMY_LECTURES.find((l) => l.id === e.target.value);
                        if (target) handleSelectCoderArmyLecture(target);
                      }}
                      className="bg-[#0b0e1b] text-slate-200 border border-white/15 text-[11px] rounded-lg px-2 py-0.5 focus:outline-none focus:border-amber-400 font-mono cursor-pointer"
                    >
                      {CODER_ARMY_LECTURES.map((lec) => (
                        <option key={lec.id} value={lec.id}>
                          L{lec.lectureNumber}: {lec.title.split(':')[1]?.trim() || lec.title} ({lec.duration})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={
                    selectedTrack === 'coder-army'
                      ? `https://www.youtube.com/watch?v=${activeVideoId}&list=PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01`
                      : `https://www.youtube.com/watch?v=${activeVideoId}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] transition cursor-pointer shadow-sm"
                  title="Watch on official YouTube channel (opens in new tab)"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>

                {selectedTrack === 'coder-army' && (
                  <a
                    href="https://www.youtube.com/playlist?list=PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white border border-white/10 text-[11px] font-semibold transition cursor-pointer"
                    title="Open full Coder Army 100+ playlist on YouTube"
                  >
                    <span>Full Playlist</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Video Frame */}
            <div className="relative w-full aspect-video bg-black overflow-hidden">
              <iframe
                key={`${embedMode}-${activeVideoId}`}
                title="lecture-video-player"
                src={
                  embedMode === 'playlist'
                    ? `https://www.youtube-nocookie.com/embed/videoseries?list=PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01&enablejsapi=1`
                    : `https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1`
                }
                className="absolute inset-0 w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {/* Direct Playback Fallback Ribbon */}
            <div className="px-3.5 py-2 bg-slate-900/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-medium">
                  {selectedTrack === 'coder-army'
                    ? `Rohit Negi · L${activeLecture.lectureNumber}: ${activeLecture.title.split(':')[1]?.trim() || activeLecture.title}`
                    : 'Curated Master Stream'}
                </span>
                {selectedTrack === 'coder-army' && (
                  <button
                    onClick={() => {
                      sound.playPop();
                      setEmbedMode((prev) => (prev === 'single' ? 'playlist' : 'single'));
                    }}
                    className="ml-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-amber-300 border border-white/10 transition cursor-pointer"
                    title="Switch between single lecture video and full playlist embed"
                  >
                    {embedMode === 'single' ? 'Switch to Playlist Player' : 'Switch to Single Video'}
                  </button>
                )}
              </div>
              <a
                href={
                  selectedTrack === 'coder-army'
                    ? `https://www.youtube.com/watch?v=${activeVideoId}&list=PLQEaRBV9gAFu4ovJ41PywklqI7IyXwr01`
                    : `https://www.youtube.com/watch?v=${activeVideoId}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 hover:text-white border border-amber-400/30 font-semibold transition cursor-pointer"
              >
                <span>Watch directly on YouTube ↗</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Video Footer Metadata & Navigation */}
            <div className="p-4 bg-white/[0.02] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-amber-300 font-bold">
                    {selectedTrack === 'coder-army'
                      ? `Lecture ${activeLecture.lectureNumber}`
                      : selectedTrack === 'curated'
                      ? activeCurated.instructor
                      : 'Custom Stream'}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 font-mono">
                    {selectedTrack === 'coder-army' ? activeLecture.duration : activeCurated.duration}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white truncate max-w-md">
                  {selectedTrack === 'coder-army'
                    ? activeLecture.title
                    : selectedTrack === 'curated'
                    ? activeCurated.title
                    : 'Custom YouTube Lecture'}
                </h3>
              </div>

              {/* Prev / Next / Complete Controls */}
              {selectedTrack === 'coder-army' && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handlePrevLecture}
                    disabled={currentIndex === 0}
                    className="p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-30 text-white transition cursor-pointer"
                    title="Previous Lecture"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => toggleLectureCompleted(activeLecture.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold text-xs transition cursor-pointer ${
                      completedLectures.has(activeLecture.id)
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 border-white/10'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{completedLectures.has(activeLecture.id) ? 'Completed' : 'Mark Done'}</span>
                  </button>

                  <button
                    onClick={handleNextLecture}
                    disabled={currentIndex === CODER_ARMY_LECTURES.length - 1}
                    className="p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-30 text-white transition cursor-pointer"
                    title="Next Lecture"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Pane: Multi-Compiler Interpreter, Step Debugger, Terminal & Notes */}
        <div className={`${getCodeWidthClass()} min-h-[580px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col`}>
          <DebuggerSidePanel
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            code={code}
            onCodeChange={setCode}
            debugSteps={activeLecture.debugSteps || []}
            lectureTitle={activeLecture.title}
            lectureNotes={activeLecture.notes}
          />
        </div>
      </div>
    </div>
  );
};
