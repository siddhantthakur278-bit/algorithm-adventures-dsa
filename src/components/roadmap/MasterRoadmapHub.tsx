import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import {
  ROADMAP_PHASES,
  ROADMAP_PROJECT_LADDER,
  ROADMAP_WEEKLY_RHYTHM,
  READINESS_CHECKLIST,
  RoadmapPhase,
  ProjectLadderItem,
} from '../../data/roadmapData';
import {
  Compass,
  CheckCircle2,
  Circle,
  ExternalLink,
  Sparkles,
  Trophy,
  Calendar,
  Clock,
  Terminal,
  Globe,
  Database,
  Brain,
  Rocket,
  Briefcase,
  Copy,
  Check,
  ChevronRight,
  Flame,
  ArrowRight,
  Code2,
  Layers,
  Target,
  Wrench,
  BookOpen,
} from 'lucide-react';
import {
  ByteAvatar,
  ProfessorAvatar,
  NovaAvatar,
  PriAvatar,
  ProfTupleAvatar,
  ProfPivotAvatar,
  SidAvatar,
} from '../characters/Characters';
import { sound } from '../../utils/soundEffects';

export const MasterRoadmapHub: React.FC = () => {
  const {
    activeSaga,
    setActiveSaga,
    setActiveTab,
    addXP,
    triggerBurst,
    roadmapCheckedTopics,
    toggleRoadmapTopic,
    readinessChecked,
    toggleReadinessItem,
    projectStatuses,
    updateProjectStatus,
  } = useCourse();

  // Active view inside the Roadmap Hub
  const [subTab, setSubTab] = useState<'phases' | 'ladder' | 'rhythm' | 'skillmaps' | 'career'>('phases');
  const [trackFilter, setTrackFilter] = useState<'all' | 'core' | 'parallel' | 'career'>('all');
  const [selectedWeek, setSelectedWeek] = useState<number>(4);
  const [expandedPhaseId, setExpandedPhaseId] = useState<string>('phase-1');
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);
  const [pitchRecipientType, setPitchRecipientType] = useState<'founder' | 'lead' | 'freelance'>('founder');

  // Stats calculation
  const totalTopicsCount = ROADMAP_PHASES.reduce((acc, p) => acc + p.topics.length, 0);
  const completedTopicsCount = roadmapCheckedTopics.length;
  const topicProgressPct = Math.min(100, Math.round((completedTopicsCount / Math.max(1, totalTopicsCount)) * 100));

  const shippedProjectsCount = Object.values(projectStatuses).filter(s => s === 'shipped').length;
  const readinessCount = readinessChecked.length;
  const readinessPct = Math.round((readinessCount / READINESS_CHECKLIST.length) * 100);

  // Filtered phases
  const filteredPhases = ROADMAP_PHASES.filter(p => {
    if (trackFilter === 'all') return true;
    return p.track === trackFilter;
  });

  const handleTopicCheck = (topicId: string) => {
    sound.playPop();
    const isNowChecked = !roadmapCheckedTopics.includes(topicId);
    toggleRoadmapTopic(topicId);
    if (isNowChecked) {
      addXP(25);
      triggerBurst('+25 XP', 'Curriculum Mastered!', 'star');
    }
  };

  const handleProjectStatusCycle = (projectId: number) => {
    sound.playPop();
    const current = projectStatuses[projectId] || 'locked';
    let next: 'locked' | 'in-progress' | 'shipped';
    if (current === 'locked') next = 'in-progress';
    else if (current === 'in-progress') {
      next = 'shipped';
      addXP(150);
      sound.playFanfare();
      triggerBurst('PROJECT SHIPPED!', '+150 XP Gained', 'boom');
    } else {
      next = 'locked';
    }
    updateProjectStatus(projectId, next);
  };

  const handleReadinessToggle = (id: string) => {
    sound.playPop();
    toggleReadinessItem(id);
    if (!readinessChecked.includes(id)) {
      addXP(30);
      triggerBurst('+30 XP', 'Career Milestone Unlocked!', 'zap');
    }
  };

  const jumpToSaga = (saga: 'dsa' | 'sql' | 'prisma' | 'linear-algebra' | 'web-dev' | 'python-dsa') => {
    sound.playSwoosh();
    setActiveSaga(saga);
  };

  // Sample Cold Pitch Generator
  const getPitchText = () => {
    if (pitchRecipientType === 'founder') {
      return `Hi [Founder Name],

I came across [Company Name] and loved how you guys are tackling [specific problem]. 

Over the last 6 months, I've built and shipped several full-stack applications with TypeScript, Next.js, and PostgreSQL, including an API-driven real-time analytics app and an automated GitHub-connected developer portal.

I noticed [feature or small improvement] on your product. I put together a quick prototype demonstrating how [specific benefit] could work.

Are you open to a quick 10-minute chat this Thursday? Even if you're not hiring right now, I'd love to share the prototype and get your candid feedback.

Best,
Siddhant Thakur
GitHub: https://github.com/siddhantthakur278-bit
Portfolio: [Live Link]`;
    } else if (pitchRecipientType === 'lead') {
      return `Hi [Lead Name],

I've been following your engineering blogs on [Topic, e.g., PostgreSQL query optimization / distributed caching].

I recently wrapped up a project optimizing an Express + Prisma backend with Redis caching, bringing query latency down by 65% with strict ACID transaction guarantees and 85%+ test coverage with Vitest.

I'm actively seeking early-career software engineering roles where I can contribute to backend reliability and clean APIs. Would you be open to connecting or sharing any advice for a junior developer targeting your team?

Best,
Siddhant Thakur
LeetCode: https://leetcode.com/u/siddhantkthakur/
GitHub: https://github.com/siddhantthakur278-bit`;
    } else {
      return `Hi [Client Name],

I saw your requirement for [Project Need, e.g. a responsive Next.js landing page with Stripe / dynamic dashboard].

I specialize in building clean, fast web applications with TypeScript, Tailwind CSS, and Node.js. Here is a live example of a similar dashboard I shipped recently: [Link].

I can deliver your MVP in [X weeks] with:
1. Mobile-first responsive layout with sub-second page loads
2. Clean type-safe code that your team can easily extend
3. Full deployment setup on Vercel with automated CI tests

Would you like to schedule a 15-minute scoping call to review the exact deliverables?

Best regards,
Siddhant Thakur`;
    }
  };

  const handleCopyPitch = () => {
    sound.playPop();
    navigator.clipboard.writeText(getPitchText());
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Hero Comic Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0e1428] via-[#121938] to-[#0a0d1c] border-4 border-[#1e2746] shadow-comic p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-400 text-black font-bangers text-sm rounded-lg border-2 border-black shadow-comic-sm tracking-wide">
                40-WEEK MASTER ROADMAP
              </span>
              <span className="px-2.5 py-0.5 bg-cyan-500/20 text-cyan-300 font-bold text-xs rounded border border-cyan-500/40">
                150+ Clickable Resources
              </span>
              <span className="px-2.5 py-0.5 bg-purple-500/20 text-purple-300 font-bold text-xs rounded border border-purple-500/40">
                10 Phases • 6 Ladder Projects
              </span>
            </div>

            <h1 className="font-bangers text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              FULL-STACK DEVELOPER, CS FUNDAMENTALS &amp; AI
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              An accelerated, battle-tested 40-week architecture connecting the core build track (Linux &rarr; Web &rarr; React &rarr; Node &rarr; Prisma &rarr; SQL &rarr; Deploy) with daily parallel tracks in Python DSA, Computer Science Mathematics, and modern AI/LLMs.
            </p>

            {/* Comic Dialogue Strip */}
            <div className="flex items-center gap-3 bg-[#080b18]/80 backdrop-blur rounded-xl p-3 border-2 border-[#202947] shadow-comic-sm">
              <ProfessorAvatar size="sm" mood="wise" />
              <div className="text-xs">
                <span className="font-bold text-amber-300">Professor Algorismus: </span>
                <span className="text-slate-200">
                  &ldquo;Build in public. Practice your DSA daily at 05:00 AM. Review your mistakes every Sunday, and ship a real project every single month!&rdquo;
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3 w-full lg:w-64">
            <div className="bg-[#080c1e] p-3.5 rounded-xl border-2 border-[#1c2444] shadow-comic-sm">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Curriculum Progress</span>
                <span className="font-bold text-cyan-400">{topicProgressPct}%</span>
              </div>
              <div className="w-full bg-[#141b33] h-2 rounded-full overflow-hidden border border-black/50">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500"
                  style={{ width: `${topicProgressPct}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {completedTopicsCount} / {totalTopicsCount} Topics Mastered
              </span>
            </div>

            <div className="bg-[#080c1e] p-3.5 rounded-xl border-2 border-[#1c2444] shadow-comic-sm">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Project Ladder</span>
                <span className="font-bold text-amber-400">{shippedProjectsCount} / 6</span>
              </div>
              <div className="w-full bg-[#141b33] h-2 rounded-full overflow-hidden border border-black/50">
                <div
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-500"
                  style={{ width: `${(shippedProjectsCount / 6) * 100}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {6 - shippedProjectsCount} Projects Left to Ship
              </span>
            </div>

            <div className="bg-[#080c1e] p-3.5 rounded-xl border-2 border-[#1c2444] shadow-comic-sm col-span-2 sm:col-span-1">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Internship Readiness</span>
                <span className="font-bold text-emerald-400">{readinessPct}%</span>
              </div>
              <div className="w-full bg-[#141b33] h-2 rounded-full overflow-hidden border border-black/50">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-green-500 h-full transition-all duration-500"
                  style={{ width: `${readinessPct}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {readinessCount} / {READINESS_CHECKLIST.length} Milestones Hit
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 40-Week Timeline Scrubber */}
      <section className="bg-[#0c1020] rounded-2xl border-2 border-[#1e253e] p-5 shadow-comic space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h2 className="font-bangers text-2xl text-white tracking-wide">
              40-WEEK MASTER TIMELINE &amp; GANTT SCRUBBER
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Current Focused Week:</span>
            <span className="px-3 py-1 bg-amber-400 text-black font-bangers text-sm rounded-lg border border-black shadow-comic-sm">
              WEEK {selectedWeek}
            </span>
          </div>
        </div>

        {/* Visual Timeline Bars */}
        <div className="space-y-2 pt-2">
          {/* Week Markers Header */}
          <div className="flex justify-between text-[11px] text-slate-400 font-bold px-1">
            <span>W1</span>
            <span>W4</span>
            <span>W8</span>
            <span>W12</span>
            <span className="text-amber-400 underline decoration-amber-400">W16 (Apply)</span>
            <span>W20</span>
            <span>W24</span>
            <span>W28</span>
            <span>W32</span>
            <span>W36</span>
            <span>W40</span>
          </div>

          {/* Interactive Range Slider */}
          <input
            type="range"
            min="1"
            max="40"
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(Number(e.target.value))}
            className="w-full h-3 bg-[#161d36] rounded-lg appearance-none cursor-pointer accent-amber-400"
          />

          {/* Timeline Tracks */}
          <div className="space-y-1.5 pt-2 text-[11px] font-semibold">
            {/* Core Build Track */}
            <div className="flex items-center gap-2">
              <span className="w-28 text-slate-300 truncate">Core Build Track</span>
              <div className="flex-1 bg-[#12172a] h-6 rounded-md overflow-hidden flex relative border border-[#1e253e]">
                {/* W1-4 Linux */}
                <div
                  className="bg-blue-600/80 flex items-center justify-center text-white text-[10px] border-r border-[#0c1020]"
                  style={{ width: '10%' }}
                  title="Weeks 1-4: Linux, CLI, Git, Networking"
                >
                  Linux &amp; Git
                </div>
                {/* W3-12 Web */}
                <div
                  className="bg-amber-600/80 flex items-center justify-center text-white text-[10px] border-r border-[#0c1020]"
                  style={{ width: '22.5%' }}
                  title="Weeks 3-12: HTML, CSS, JS, TS"
                >
                  HTML/CSS/JS/TS
                </div>
                {/* W11-20 React */}
                <div
                  className="bg-cyan-600/80 flex items-center justify-center text-white text-[10px] border-r border-[#0c1020]"
                  style={{ width: '22.5%' }}
                  title="Weeks 11-20: React & Next.js"
                >
                  React + Next.js
                </div>
                {/* W18-30 Node + Prisma + SQL */}
                <div
                  className="bg-purple-600/80 flex items-center justify-center text-white text-[10px] border-r border-[#0c1020]"
                  style={{ width: '25%' }}
                  title="Weeks 18-30: Node, Express, Prisma & SQL"
                >
                  Node + Prisma + SQL
                </div>
                {/* W24-40 Ship & Deploy */}
                <div
                  className="bg-emerald-600/80 flex items-center justify-center text-white text-[10px]"
                  style={{ width: '20%' }}
                  title="Weeks 24-40: Projects, Testing, Deploy & Interviews"
                >
                  Ship &amp; Deploy
                </div>

                {/* Scrubber indicator line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-amber-400 z-10 shadow-[0_0_8px_#fbbf24]"
                  style={{ left: `${((selectedWeek - 1) / 39) * 100}%` }}
                />
              </div>
            </div>

            {/* Parallel Track: DSA in Python */}
            <div className="flex items-center gap-2">
              <span className="w-28 text-slate-300 truncate">DSA in Python</span>
              <div className="flex-1 bg-[#12172a] h-6 rounded-md overflow-hidden flex relative border border-[#1e253e]">
                <div
                  className="bg-rose-600/80 w-full flex items-center justify-center text-white text-[10px]"
                  title="Weeks 1-40: Daily Problem Solving in Python"
                >
                  Daily Problem Solving (NeetCode 150 + LeetCode Top 150 + POTD)
                </div>
                <div
                  className="absolute top-0 bottom-0 w-1 bg-amber-400 z-10 shadow-[0_0_8px_#fbbf24]"
                  style={{ left: `${((selectedWeek - 1) / 39) * 100}%` }}
                />
              </div>
            </div>

            {/* Parallel Track: Maths to AI */}
            <div className="flex items-center gap-2">
              <span className="w-28 text-slate-300 truncate">Maths &amp; AI</span>
              <div className="flex-1 bg-[#12172a] h-6 rounded-md overflow-hidden flex relative border border-[#1e253e]">
                <div
                  className="bg-teal-600/80 flex items-center justify-center text-white text-[10px] border-r border-[#0c1020]"
                  style={{ width: '70%' }}
                  title="Weeks 1-28: Discrete Maths, Linear Algebra, Calculus, Probability"
                >
                  Discrete Maths, LinAlg, Calc &amp; Probability
                </div>
                <div
                  className="bg-violet-600/80 flex items-center justify-center text-white text-[10px]"
                  style={{ width: '30%' }}
                  title="Weeks 28-40: AI, ML, Neural Nets, LLMs & RAG"
                >
                  AI / ML / LLMs / RAG
                </div>
                <div
                  className="absolute top-0 bottom-0 w-1 bg-amber-400 z-10 shadow-[0_0_8px_#fbbf24]"
                  style={{ left: `${((selectedWeek - 1) / 39) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Milestone Marker Summary for Selected Week */}
          <div className="mt-3 p-3 bg-[#080b18] rounded-xl border border-[#1e2746] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>
                {selectedWeek <= 4 && '🎯 Phase 1 Focus: Linux permissions, shell scripts, Git branches, and HTTP/TLS packet flow.'}
                {selectedWeek > 4 && selectedWeek <= 10 && '🎯 Phase 2 Focus: Semantic web layout, CSS Grid/Flexbox, DOM events, and modern TypeScript.'}
                {selectedWeek > 10 && selectedWeek <= 16 && '🎯 Phase 3 Focus: React state, hooks, TanStack Query, and Next.js App Router. (Apply Milestone in W16!)'}
                {selectedWeek > 16 && selectedWeek <= 24 && '🎯 Phase 4-5 Focus: REST APIs with Express, Prisma ORM relations, PostgreSQL transactions, and indexing.'}
                {selectedWeek > 24 && selectedWeek <= 32 && '🎯 Phase 10 Focus: Production testing with Vitest/Playwright, CI/CD Actions, and System Design.'}
                {selectedWeek > 32 && '🎯 Capstone Focus: AI RAG pipeline with vector embeddings, Gemini/Claude APIs, and full mock interviews.'}
              </span>
            </div>
            {selectedWeek >= 16 && (
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 font-bold rounded border border-amber-500/40 text-[11px] whitespace-nowrap">
                🚀 Ready for Internships &amp; Freelance
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Main Roadmap Sub-Tabs */}
      <div className="flex items-center gap-2 border-b-2 border-[#1c2237] pb-2 overflow-x-auto">
        <button
          onClick={() => setSubTab('phases')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bangers tracking-wide cursor-pointer transition ${
            subTab === 'phases'
              ? 'bg-[#FBBF24] text-black shadow-comic-sm'
              : 'bg-[#121626] text-slate-300 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          10 CURRICULUM PHASES
        </button>

        <button
          onClick={() => setSubTab('ladder')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bangers tracking-wide cursor-pointer transition ${
            subTab === 'ladder'
              ? 'bg-[#38BDF8] text-black shadow-comic-sm'
              : 'bg-[#121626] text-slate-300 hover:text-white'
          }`}
        >
          <Rocket className="w-4 h-4" />
          PROJECT LADDER (6 APPS)
        </button>

        <button
          onClick={() => setSubTab('rhythm')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bangers tracking-wide cursor-pointer transition ${
            subTab === 'rhythm'
              ? 'bg-[#10B981] text-black shadow-comic-sm'
              : 'bg-[#121626] text-slate-300 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          20H/WEEK RHYTHM &amp; RULES
        </button>

        <button
          onClick={() => setSubTab('skillmaps')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bangers tracking-wide cursor-pointer transition ${
            subTab === 'skillmaps'
              ? 'bg-[#A855F7] text-white shadow-comic-sm'
              : 'bg-[#121626] text-slate-300 hover:text-white'
          }`}
        >
          <Brain className="w-4 h-4" />
          DSA &amp; MATHS SKILL MAPS
        </button>

        <button
          onClick={() => setSubTab('career')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bangers tracking-wide cursor-pointer transition ${
            subTab === 'career'
              ? 'bg-[#F43F5E] text-white shadow-comic-sm'
              : 'bg-[#121626] text-slate-300 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          INTERNSHIP &amp; CAREER HUB
        </button>
      </div>

      {/* VIEW 1: 10 CURRICULUM PHASES */}
      {subTab === 'phases' && (
        <div className="space-y-6">
          {/* Phase Track Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Filter Track:</span>
              <button
                onClick={() => setTrackFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  trackFilter === 'all'
                    ? 'bg-white text-black'
                    : 'bg-[#151c33] text-slate-400 hover:text-white'
                }`}
              >
                All (10)
              </button>
              <button
                onClick={() => setTrackFilter('core')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  trackFilter === 'core'
                    ? 'bg-blue-500 text-white'
                    : 'bg-[#151c33] text-slate-400 hover:text-white'
                }`}
              >
                Core Build Track (5)
              </button>
              <button
                onClick={() => setTrackFilter('parallel')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  trackFilter === 'parallel'
                    ? 'bg-purple-500 text-white'
                    : 'bg-[#151c33] text-slate-400 hover:text-white'
                }`}
              >
                Parallel DSA &amp; Maths (4)
              </button>
              <button
                onClick={() => setTrackFilter('career')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  trackFilter === 'career'
                    ? 'bg-rose-500 text-white'
                    : 'bg-[#151c33] text-slate-400 hover:text-white'
                }`}
              >
                Ship &amp; Career (1)
              </button>
            </div>

            <div className="text-xs text-slate-400">
              Showing {filteredPhases.length} Phases • Click any phase to inspect details &amp; checklist
            </div>
          </div>

          {/* Phases Grid / Accordion */}
          <div className="space-y-4">
            {filteredPhases.map((phase) => {
              const isExpanded = expandedPhaseId === phase.id;
              const phaseCheckedCount = phase.topics.filter(t => roadmapCheckedTopics.includes(t.id)).length;
              const phasePct = Math.round((phaseCheckedCount / phase.topics.length) * 100);

              return (
                <div
                  key={phase.id}
                  className={`rounded-2xl border-2 transition-all ${
                    isExpanded
                      ? 'bg-[#0f1426] border-[#38BDF8]/60 shadow-comic'
                      : 'bg-[#0a0e1c] border-[#1b2238] hover:border-[#273252]'
                  }`}
                >
                  {/* Phase Header Strip */}
                  <div
                    onClick={() => {
                      sound.playPop();
                      setExpandedPhaseId(isExpanded ? '' : phase.id);
                    }}
                    className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="flex-shrink-0">
                        {phase.comicMentor === 'professor' && <ProfessorAvatar size="sm" mood="wise" />}
                        {phase.comicMentor === 'nova' && <NovaAvatar size="sm" mood="happy" />}
                        {phase.comicMentor === 'pri' && <PriAvatar size="sm" mood="teaching" />}
                        {phase.comicMentor === 'prof_tuple' && <ProfTupleAvatar size="sm" mood="wise" />}
                        {phase.comicMentor === 'prof_pivot' && <ProfPivotAvatar size="sm" mood="wise" />}
                        {phase.comicMentor === 'sid' && <SidAvatar size="sm" mood="happy" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bangers text-xl text-white tracking-wide">
                            {phase.title}
                          </span>
                          <span className="px-2.5 py-0.5 bg-[#1a2340] text-amber-300 font-bold text-xs rounded border border-[#2b3966]">
                            {phase.weeks}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-extrabold uppercase rounded border ${
                              phase.track === 'core'
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                : phase.track === 'parallel'
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            }`}
                          >
                            {phase.track === 'core' ? 'Core Build' : phase.track === 'parallel' ? 'Parallel Track' : 'Career'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium">{phase.tagline}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                      {/* Topic Progress in Phase */}
                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-300">
                          {phaseCheckedCount} / {phase.topics.length} Done ({phasePct}%)
                        </div>
                        <div className="w-28 bg-[#182038] h-1.5 rounded-full mt-1 overflow-hidden">
                          <div
                            className="bg-emerald-400 h-full transition-all duration-300"
                            style={{ width: `${phasePct}%` }}
                          />
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-5 h-5 text-slate-400 transition-transform ${
                          isExpanded ? 'rotate-90 text-cyan-400' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expanded Phase Content */}
                  {isExpanded && (
                    <div className="px-5 pb-6 pt-2 border-t border-[#1b2238] space-y-6">
                      {/* Comic Speech Quote */}
                      <div className="flex items-center gap-3 bg-[#070a16] p-3.5 rounded-xl border border-[#202947]">
                        <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <p className="text-xs text-slate-300 italic">
                          &ldquo;{phase.comicQuote}&rdquo;
                        </p>
                      </div>

                      {/* Goal & Milestone Badges */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#12182e] p-4 rounded-xl border border-[#222c4f] space-y-1.5">
                          <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                            <Target className="w-4 h-4" />
                            <span>Phase Goal</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">{phase.goal}</p>
                        </div>

                        <div className="bg-[#12182e] p-4 rounded-xl border border-[#222c4f] space-y-1.5">
                          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                            <Trophy className="w-4 h-4" />
                            <span>Milestone Proof (You Are Done When)</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">{phase.milestone}</p>
                        </div>
                      </div>

                      {/* Connected Saga Direct Jump */}
                      {phase.connectedSaga && (
                        <div className="flex items-center justify-between p-3.5 bg-gradient-to-r from-blue-950/60 to-cyan-950/40 rounded-xl border-2 border-cyan-500/30">
                          <div className="flex items-center gap-2.5">
                            <BookOpen className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs text-white font-medium">
                              Interactive Comic Companion available for this Phase!
                            </span>
                          </div>
                          <button
                            onClick={() => jumpToSaga(phase.connectedSaga!)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-black font-bangers text-xs rounded-lg border border-black shadow-comic-sm transition cursor-pointer"
                          >
                            <span>OPEN COMIC SAGA</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {/* What to Cover Checklist */}
                      <div className="space-y-3">
                        <h4 className="font-bangers text-lg text-white tracking-wide flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          TOPIC CHECKLIST (CHECK AS YOU MASTER)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {phase.topics.map((topic) => {
                            const isChecked = roadmapCheckedTopics.includes(topic.id);
                            return (
                              <div
                                key={topic.id}
                                onClick={() => handleTopicCheck(topic.id)}
                                className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
                                  isChecked
                                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                                    : 'bg-[#12172a] border-[#1d2642] text-slate-300 hover:border-slate-500'
                                }`}
                              >
                                <div className="mt-0.5">
                                  {isChecked ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                  )}
                                </div>
                                <div className="space-y-0.5 text-xs">
                                  <div className={`font-semibold ${isChecked ? 'line-through text-slate-400' : 'text-white'}`}>
                                    {topic.label}
                                  </div>
                                  <div className="text-[11px] text-slate-400">{topic.detail}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Clickable Resources Table */}
                      <div className="space-y-3">
                        <h4 className="font-bangers text-lg text-white tracking-wide flex items-center gap-2">
                          <Globe className="w-4 h-4 text-amber-400" />
                          CURATED CLICKABLE RESOURCES ({phase.resources.length})
                        </h4>
                        <div className="overflow-x-auto rounded-xl border border-[#1e253e]">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-[#141b33] text-slate-300 font-bold uppercase text-[10px]">
                              <tr>
                                <th className="px-4 py-2.5">Resource Name</th>
                                <th className="px-4 py-2.5">Why It Is Useful</th>
                                <th className="px-4 py-2.5">Category</th>
                                <th className="px-4 py-2.5 text-right">Link</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#182038] bg-[#0c1020]">
                              {phase.resources.map((res, i) => (
                                <tr key={i} className="hover:bg-[#141b33]/60 transition">
                                  <td className="px-4 py-2.5 font-semibold text-white flex items-center gap-2">
                                    <span>{res.name}</span>
                                    {res.isPrimary && (
                                      <span className="px-1.5 py-0.2 bg-amber-400/20 text-amber-300 text-[9px] font-extrabold rounded border border-amber-400/30">
                                        PRIMARY
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-4 py-2.5 text-slate-300">{res.description}</td>
                                  <td className="px-4 py-2.5">
                                    <span className="px-2 py-0.5 bg-[#182038] text-slate-300 rounded text-[10px] font-medium capitalize">
                                      {res.category || 'reference'}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2.5 text-right">
                                    <a
                                      href={res.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                                    >
                                      <span>Visit</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Practice Challenge */}
                      <div className="bg-[#080b18] p-3.5 rounded-xl border border-[#1d2642] flex items-center gap-3 text-xs text-slate-300">
                        <Terminal className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <div>
                          <span className="font-bold text-white">Suggested Practice Drill: </span>
                          <span>{phase.practice}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: THE 6-PROJECT LADDER */}
      {subTab === 'ladder' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-bangers text-2xl text-white tracking-wide">
              THE 6-PROJECT LADDER: FROM PORTFOLIO TO AI CAPSTONE
            </h3>
            <p className="text-xs text-slate-400 max-w-3xl">
              Each project adds one specific layer of difficulty. Deploy every single one, write a comprehensive README with screenshots, architecture trade-offs, and push real commits to GitHub!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ROADMAP_PROJECT_LADDER.map((project) => {
              const status = projectStatuses[project.id] || 'locked';

              return (
                <div
                  key={project.id}
                  className={`rounded-2xl border-2 p-5 flex flex-col justify-between space-y-4 transition ${
                    status === 'shipped'
                      ? 'bg-emerald-950/20 border-emerald-500/50 shadow-comic'
                      : status === 'in-progress'
                      ? 'bg-cyan-950/20 border-cyan-500/50 shadow-comic'
                      : 'bg-[#0b0f1e] border-[#1b2238]'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Row: Badge & Status */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 bg-amber-400 text-black font-bangers rounded-lg flex items-center justify-center text-sm border border-black shadow-comic-sm">
                          #{project.id}
                        </span>
                        <span className="text-xs font-bold text-slate-400">{project.weeks}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-extrabold uppercase rounded border ${
                            project.difficulty === 'Beginner'
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                              : project.difficulty === 'Intermediate'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : project.difficulty === 'Advanced'
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                              : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          }`}
                        >
                          {project.difficulty}
                        </span>

                        {/* Status Toggle Button */}
                        <button
                          onClick={() => handleProjectStatusCycle(project.id)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                            status === 'shipped'
                              ? 'bg-emerald-500 text-black border-black font-bangers shadow-comic-sm'
                              : status === 'in-progress'
                              ? 'bg-cyan-500 text-black border-black font-bangers shadow-comic-sm'
                              : 'bg-[#182038] text-slate-300 border-[#2b375b] hover:text-white'
                          }`}
                        >
                          {status === 'shipped' ? '🚀 SHIPPED' : status === 'in-progress' ? '⚡ IN PROGRESS' : '🔒 NOT STARTED'}
                        </button>
                      </div>
                    </div>

                    <h4 className="font-bangers text-xl text-white tracking-wide">
                      {project.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="bg-[#12172a] p-2.5 rounded-xl border border-[#1e2642] text-xs">
                      <span className="font-bold text-cyan-400">Stack: </span>
                      <span className="text-slate-300">{project.stack}</span>
                    </div>

                    {/* Key Deliverables */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Key Deliverables:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {project.deliverables.map((del, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Suggested Git Commit & Action */}
                  <div className="pt-3 border-t border-[#182038] space-y-2">
                    <div className="text-[11px] text-slate-400 font-mono bg-[#070a16] p-2 rounded border border-[#1b2238] truncate">
                      <span className="text-emerald-400 font-bold">git commit -m </span>
                      &quot;{project.gitCommitMsg}&quot;
                    </div>

                    <button
                      onClick={() => {
                        sound.playPop();
                        setActiveTab('ide');
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-2 bg-[#182038] hover:bg-[#202b4d] text-white rounded-xl text-xs font-bold border border-[#2c3860] transition cursor-pointer"
                    >
                      <Code2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Open Python IDE to Scaffold Code</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: WEEKLY 20-HOUR RHYTHM & RULES */}
      {subTab === 'rhythm' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-bangers text-2xl text-white tracking-wide">
              THE 20-HOUR WEEKLY RHYTHM: HOW TO BALANCE DSA, CORE BUILD &amp; LIFE
            </h3>
            <p className="text-xs text-slate-400 max-w-3xl">
              This schedule is designed for realistic consistency. Weekdays overlap 1 hour of daily DSA with 2 hours of core build work, while Saturdays provide 4 hours of deep project flow.
            </p>
          </div>

          {/* 5 Golden Rules Strip */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              { num: '01', title: 'Build With Every Concept', desc: 'Reading alone fades in days. Always code a small experiment.' },
              { num: '02', title: 'Never Skip Phase Milestones', desc: 'The proof of learning is the deployed artifact.' },
              { num: '03', title: 'Keep 1-Page Notes Per Phase', desc: 'Record: what broke, what fixed it, what you learned.' },
              { num: '04', title: 'Sunday 30-Min Audit', desc: 'What moved forward? What stalled? Adjust next week.' },
              { num: '05', title: 'One Primary Resource', desc: 'Finish it completely. Hoarding courses is not learning.' },
            ].map((rule, idx) => (
              <div key={idx} className="bg-[#0c1020] p-4 rounded-xl border border-[#1e253e] space-y-1.5">
                <span className="font-bangers text-amber-400 text-lg">RULE #{rule.num}</span>
                <h4 className="text-xs font-bold text-white">{rule.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>

          {/* Daily Timetable Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROADMAP_WEEKLY_RHYTHM.map((day, idx) => (
              <div key={idx} className="bg-[#0b0f1e] rounded-xl border border-[#1b2238] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-[#182038] pb-2">
                  <span className="font-bangers text-lg text-white tracking-wide">{day.day}</span>
                  <span className="px-2.5 py-0.5 bg-amber-400/20 text-amber-300 font-bold text-xs rounded border border-amber-400/30">
                    {day.hours} Hours Focus
                  </span>
                </div>

                <div className="space-y-2.5">
                  {day.activities.map((act, i) => (
                    <div key={i} className="bg-[#12172a] p-2.5 rounded-lg border border-[#1e2746] space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-cyan-400">{act.track}</span>
                        <span className="text-[11px] text-slate-400 font-semibold">{act.duration}</span>
                      </div>
                      <p className="text-xs text-slate-300">{act.focus}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: DSA & MATHS SKILL MAPS */}
      {subTab === 'skillmaps' && (
        <div className="space-y-8">
          {/* DSA Ladder */}
          <div className="space-y-4">
            <h3 className="font-bangers text-2xl text-white tracking-wide flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500" />
              DSA MASTERY LADDER (WEEKS 1 TO 40)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0e1326] p-5 rounded-2xl border-2 border-blue-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-blue-500 text-white font-bangers text-xs rounded">
                    LEVEL 1: FOUNDATIONS
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">Weeks 1–12</span>
                </div>
                <h4 className="font-bangers text-lg text-white">CORE PATTERNS &amp; BASICS</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {['Arrays & Strings', 'Hash Maps & Hash Sets', 'Two Pointers technique', 'Sliding Window', 'Stack & Monotonic Stack', 'Queue & Deque', 'Singly & Doubly Linked Lists'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0e1326] p-5 rounded-2xl border-2 border-amber-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-amber-500 text-black font-bangers text-xs rounded">
                    LEVEL 2: CORE INTERVIEW
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">Weeks 13–26</span>
                </div>
                <h4 className="font-bangers text-lg text-white">RECURSION, TREES &amp; GRAPHS</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {['Binary Trees & Binary Search Trees (BST)', 'Heaps & Priority Queues', 'Graph Traversal (BFS & DFS)', 'Topological Sort (Kahn\'s algorithm)', 'Dynamic Programming (1D & 2D)', 'Backtracking (Subsets, Permutations)', 'Binary Search Variations'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0e1326] p-5 rounded-2xl border-2 border-purple-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-purple-500 text-white font-bangers text-xs rounded">
                    LEVEL 3: ADVANCED CP
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">Weeks 27–40</span>
                </div>
                <h4 className="font-bangers text-lg text-white">HARD ALGORITHMS &amp; STRUCTURES</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {['Tries (Prefix Trees)', 'Disjoint Set Union (DSU / Union-Find)', 'Dijkstra & Shortest Path Algorithms', 'Minimum Spanning Trees (Prim / Kruskal)', 'Segment Tree & Binary Indexed Tree (BIT)', 'Bitmask DP & State Compression', 'Number Theory & Modulo Math'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Maths-to-AI Progression */}
          <div className="space-y-4 pt-4 border-t border-[#182038]">
            <h3 className="font-bangers text-2xl text-white tracking-wide flex items-center gap-2">
              <Brain className="w-5 h-5 text-violet-400" />
              THE MATHS-TO-AI ROADMAP: FROM LINEAR ALGEBRA TO LLMs
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {[
                { step: '01', title: 'Python & NumPy', sub: 'Vectors, broadcasting, matrices', col: 'border-blue-500/30' },
                { step: '02', title: 'Linear Algebra', sub: 'Transformations, eigenvalues, SVD', col: 'border-cyan-500/30' },
                { step: '03', title: 'Calculus', sub: 'Gradients, chain rule, descent', col: 'border-teal-500/30' },
                { step: '04', title: 'Probability', sub: 'Bayes, distributions, entropy', col: 'border-emerald-500/30' },
                { step: '05', title: 'Classical ML', sub: 'Scikit-learn, trees, ensembles', col: 'border-amber-500/30' },
                { step: '06', title: 'Deep Learning', sub: 'PyTorch, Transformers, RAG', col: 'border-violet-500/30' },
              ].map((node, i) => (
                <div key={i} className={`bg-[#0c1020] p-3.5 rounded-xl border ${node.col} space-y-1 text-center`}>
                  <span className="font-bangers text-xs text-slate-400">STEP {node.step}</span>
                  <h5 className="font-bangers text-base text-white">{node.title}</h5>
                  <p className="text-[11px] text-slate-400">{node.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: INTERNSHIP & CAREER COMMAND CENTER */}
      {subTab === 'career' && (
        <div className="space-y-8">
          {/* Readiness Checklist */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bangers text-2xl text-white tracking-wide flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-400" />
                INTERNSHIP &amp; FREELANCE READINESS CHECKLIST
              </h3>
              <span className="text-xs font-bold text-amber-400">
                {readinessCount} / {READINESS_CHECKLIST.length} Completed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {READINESS_CHECKLIST.map((item) => {
                const isChecked = readinessChecked.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleReadinessToggle(item.id)}
                    className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition ${
                      isChecked
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-100'
                        : 'bg-[#0e1326] border-[#1e2746] text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className={`font-bangers text-base tracking-wide ${isChecked ? 'line-through text-slate-400' : 'text-white'}`}>
                        {item.label}
                      </div>
                      <p className="text-slate-400 leading-relaxed text-[11px]">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cold Outreach Generator */}
          <div className="bg-[#0d1224] p-5 rounded-2xl border-2 border-[#1f294a] space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-bangers text-xl text-white tracking-wide">
                  COLD OUTREACH &amp; PITCH TEMPLATE GENERATOR
                </h4>
                <p className="text-xs text-slate-400">
                  Targeted, concise outreach messages customized for founders, engineering leads, or freelance clients.
                </p>
              </div>

              {/* Pitch Selector */}
              <div className="flex items-center gap-1.5 bg-[#141b33] p-1 rounded-xl border border-[#232e52]">
                <button
                  onClick={() => setPitchRecipientType('founder')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    pitchRecipientType === 'founder'
                      ? 'bg-amber-400 text-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Startup Founder
                </button>
                <button
                  onClick={() => setPitchRecipientType('lead')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    pitchRecipientType === 'lead'
                      ? 'bg-cyan-400 text-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Engineering Lead
                </button>
                <button
                  onClick={() => setPitchRecipientType('freelance')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    pitchRecipientType === 'freelance'
                      ? 'bg-emerald-400 text-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Freelance Client
                </button>
              </div>
            </div>

            <div className="relative">
              <textarea
                readOnly
                value={getPitchText()}
                rows={9}
                className="w-full bg-[#070914] text-slate-200 text-xs font-mono p-4 rounded-xl border border-[#1b2238] focus:outline-none resize-none"
              />
              <button
                onClick={handleCopyPitch}
                className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bangers rounded-lg border border-black shadow-comic-sm transition cursor-pointer"
              >
                {copiedPitch ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPitch ? 'COPIED!' : 'COPY TEMPLATE'}</span>
              </button>
            </div>
          </div>

          {/* Job Boards & Portals */}
          <div className="space-y-3">
            <h4 className="font-bangers text-lg text-white tracking-wide">
              WHERE TO FIND INTERNSHIPS, CONTRACTS &amp; OPEN SOURCE
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
              {[
                { name: 'Internshala', desc: 'College internships in India', url: 'https://internshala.com' },
                { name: 'Wellfound', desc: 'Global high-growth startups', url: 'https://wellfound.com' },
                { name: 'LinkedIn Jobs', desc: 'Direct corporate applications', url: 'https://www.linkedin.com/jobs' },
                { name: 'Good First Issue', desc: 'Curated open source issues', url: 'https://goodfirstissue.dev' },
                { name: 'GSoC', desc: 'Google Summer of Code', url: 'https://summerofcode.withgoogle.com' },
                { name: 'Upwork', desc: 'Freelance contracts & MVPs', url: 'https://www.upwork.com' },
                { name: 'Contra', desc: 'Commission-free freelance', url: 'https://contra.com' },
              ].map((site, i) => (
                <a
                  key={i}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0b0f1e] hover:bg-[#131a33] p-3 rounded-xl border border-[#1b2238] hover:border-cyan-500/50 flex flex-col justify-between space-y-1 transition text-left group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white group-hover:text-cyan-400">{site.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-400" />
                  </div>
                  <span className="text-[10px] text-slate-400">{site.desc}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
