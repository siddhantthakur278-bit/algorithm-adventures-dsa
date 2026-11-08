import React, { useState, useEffect } from 'react';
import { useCourse } from '../../context/CourseContext';
import {
  STANDARD_ACADEMIC_MODULES,
  COURSE_GRADING_POLICIES,
  STANDARD_90MIN_STUDY_ROUTINE,
  AcademicModule,
} from '../../data/standardCurriculumData';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  Award,
  CheckCircle2,
  Lock,
  ChevronRight,
  Code2,
  FileText,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Info,
  Shield,
  Layers,
  ArrowRight,
  ExternalLink,
  Target,
} from 'lucide-react';
import { ProfessorAvatar, ByteAvatar, PriAvatar, ComicBubble } from '../characters/Characters';
import { sound } from '../../utils/soundEffects';

export const StandardSyllabusHub: React.FC = () => {
  const { stats, setActiveTab, setActiveSaga, loadProblemInIDE, scheduleState } = useCourse();
  const [activeSubTab, setActiveSubTab] = useState<'modules' | 'routine' | 'rubric' | 'syllabus-doc'>('modules');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('mod-1');

  // Pomodoro Study Block Timer State
  const [pomodoroSeconds, setPomodoroSeconds] = useState<number>(50 * 60); // 50 min standard focus block
  const [isPomodoroRunning, setIsPomodoroRunning] = useState<boolean>(false);
  const [pomodoroMode, setPomodoroMode] = useState<'focus' | 'rest'>('focus');

  useEffect(() => {
    let timer: number | null = null;
    if (isPomodoroRunning) {
      timer = window.setInterval(() => {
        setPomodoroSeconds((prev) => {
          if (prev <= 1) {
            sound.playFanfare();
            if (pomodoroMode === 'focus') {
              setPomodoroMode('rest');
              return 10 * 60; // 10 min recharge
            } else {
              setPomodoroMode('focus');
              return 50 * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPomodoroRunning, pomodoroMode]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const selectedModule =
    STANDARD_ACADEMIC_MODULES.find((m) => m.id === selectedModuleId) || STANDARD_ACADEMIC_MODULES[0];

  // Estimated Grade Calculation
  const hwPoints = Math.min(40, (stats.solvedProblemIds.length / 20) * 40);
  const potdPoints = Math.min(25, (stats.gitCommits.length / 10) * 25);
  const combatPoints = Math.min(15, (stats.bugHuntDefeated.length / 5) * 15);
  const recallPoints = Math.min(10, (stats.completedSubtopics.length / 10) * 10);
  const bossPoints = stats.bossBeaten ? 10 : 0;
  const currentTotalGrade = Math.round(hwPoints + potdPoints + combatPoints + recallPoints + bossPoints);

  const getLetterGrade = (score: number) => {
    if (score >= 93) return { grade: 'A+', gpa: '4.0', label: 'Summa Cum Laude' };
    if (score >= 90) return { grade: 'A', gpa: '4.0', label: 'Magna Cum Laude' };
    if (score >= 80) return { grade: 'B+', gpa: '3.3', label: 'Proficient Engineer' };
    if (score >= 70) return { grade: 'B', gpa: '3.0', label: 'Core Competency' };
    if (score >= 60) return { grade: 'C', gpa: '2.0', label: 'Foundational' };
    return { grade: 'In Progress', gpa: 'N/A', label: 'Active Cohort Study' };
  };

  const gradeInfo = getLetterGrade(currentTotalGrade);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Academic Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#12162a] via-[#1a223f] to-[#12162a] border-3 border-black shadow-comic-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider border border-black shadow-comic-sm flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" /> CS 201: Algorithmic Systems
            </span>
            <span className="text-xs text-amber-300 font-bold">Standard 10-Module Academic Curriculum</span>
            <span className="text-slate-500">•</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">Cohort Day {scheduleState.dayNumber} • {scheduleState.cohortStartDateStr}</span>
          </div>

          <h1 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
            DEFINITIVE ACADEMIC SYLLABUS &amp; STUDY COMMAND CENTER
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Engineered according to rigorous engineering and university accreditation standards (CLRS, Bloom’s Taxonomy, MIT 6.006). Every module, proof, and assignment follows a definitive progression path.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#0a0d18] p-4 rounded-2xl border border-slate-700">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Estimated Grade</span>
            <span className="font-bangers text-3xl text-amber-400 leading-none">{gradeInfo.grade}</span>
            <span className="text-[10px] text-emerald-400 font-mono block">{currentTotalGrade}/100 Pts ({gradeInfo.gpa} GPA)</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xl shadow-comic-sm border border-black">
            🎓
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'modules', label: '10 Standard Modules', icon: Layers },
          { id: 'routine', label: 'Standard 90-Min Daily Protocol', icon: Clock },
          { id: 'rubric', label: 'Academic Grading Rubric', icon: Award },
          { id: 'syllabus-doc', label: 'Official Syllabus Document', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSubTab(tab.id as any);
                sound.playPop();
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap border-2 transition cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-amber-400 text-slate-950 border-black shadow-comic-sm -translate-y-0.5'
                  : 'bg-[#121626] text-slate-300 border-slate-700 hover:text-white hover:border-slate-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: 10 Standard Academic Modules */}
      {activeSubTab === 'modules' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Module List (5 Cols) */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono px-1">
              Curriculum Modules (1 to 10)
            </div>

            {STANDARD_ACADEMIC_MODULES.map((mod) => {
              const isSelected = selectedModule.id === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => {
                    setSelectedModuleId(mod.id);
                    sound.playPop();
                  }}
                  className={`w-full p-3.5 rounded-2xl text-left transition-all border-2 cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#18213e] border-amber-400 shadow-comic-yellow -translate-y-0.5'
                      : 'bg-[#0f1424] hover:bg-[#161d33] border-[#1c243c] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-8 h-8 rounded-xl font-black text-xs font-mono flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      M{mod.moduleNumber}
                    </span>

                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-amber-400 font-bold">{mod.code}</span>
                        <span className="text-[10px] text-slate-500 font-mono">• {mod.estimatedHours}h</span>
                      </div>
                      <div className="text-xs font-bold text-white truncate">{mod.title}</div>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                </button>
              );
            })}
          </div>

          {/* Module Detailed Dossier (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-3xl bg-[#0c101d] border-2 border-black shadow-comic space-y-5">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#1b233a]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-amber-400 font-bold">{selectedModule.code}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                      Bloom’s: {selectedModule.bloomsLevel}
                    </span>
                  </div>
                  <h3 className="font-bangers text-2xl text-white mt-1">{selectedModule.title}</h3>
                </div>

                <div className="text-right font-mono text-xs">
                  <span className="text-slate-400 block text-[10px]">Academic Workload</span>
                  <span className="text-white font-bold">{selectedModule.estimatedHours} Lecture &amp; Lab Hours</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {selectedModule.description}
              </p>

              {/* Prerequisites */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Module Prerequisites:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedModule.prerequisites.map((pre, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-[#141b30] border border-[#222e50] text-xs font-mono text-slate-300"
                    >
                      {pre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Standardized Learning Outcomes (Bloom's Taxonomy) */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" /> Measurable Learning Competencies:
                </span>
                <div className="space-y-1.5">
                  {selectedModule.learningOutcomes.map((outcome, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-[#090d18] border border-[#1b233a] flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Invariants & Theorems */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Mathematical Invariants &amp; Theorems:
                </span>
                <div className="space-y-1.5">
                  {selectedModule.keyInvariantsAndTheorems.map((inv, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-[#0a1526] border border-sky-500/30 text-sky-200 text-xs font-mono leading-relaxed"
                    >
                      • {inv}
                    </div>
                  ))}
                </div>
              </div>

              {/* Standard Core Problems */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">
                  Assigned Benchmark Lab Challenges:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedModule.standardCoreProblems.map((prob) => (
                    <div
                      key={prob.id}
                      className="p-3 rounded-xl bg-[#11172a] border border-[#1e2a4a] flex flex-col justify-between space-y-2"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-amber-400 font-bold">{prob.difficulty}</span>
                          <span className="text-slate-400">{prob.timeComplexity}</span>
                        </div>
                        <h4 className="font-bold text-white text-xs mt-1 truncate">{prob.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">{prob.description}</p>
                      </div>

                      <button
                        onClick={() => {
                          sound.playPop();
                          setActiveTab('ide');
                        }}
                        className="w-full py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[10px] uppercase tracking-wider border border-slate-900 shadow-comic-sm flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Code2 className="w-3 h-3" /> Open in Python IDE &rarr;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Standard 90-Min Daily Study Routine & Pomodoro Block */}
      {activeSubTab === 'routine' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: 4-Phase Protocol (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-3xl bg-[#0c101d] border-2 border-black shadow-comic space-y-4">
              <div>
                <h3 className="font-bangers text-2xl text-white">THE STANDARD 90-MINUTE DAILY STUDY PROTOCOL</h3>
                <p className="text-xs text-slate-400">
                  Follow this standardized four-phase routine every morning starting at 05:00 AM for maximum memory consolidation and green GitHub contribution squares.
                </p>
              </div>

              <div className="space-y-3">
                {STANDARD_90MIN_STUDY_ROUTINE.map((r) => (
                  <div
                    key={r.stepNumber}
                    className="p-4 rounded-2xl bg-[#0f1424] border border-[#1c243a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                        {r.icon}
                      </span>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                            {r.phase}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{r.timeEstimate}</span>
                        </div>
                        <h4 className="font-bold text-white text-sm">{r.title}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">{r.description}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        sound.playPop();
                        setActiveTab(r.targetTab as any);
                      }}
                      className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider border border-black shadow-comic-sm shrink-0 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{r.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Built-In 50/10 Pomodoro Study Block Timer (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-[#0f1424] border-2 border-black shadow-comic space-y-5 text-center">
              <div className="flex items-center justify-center gap-2">
                <Timer className="w-5 h-5 text-amber-400" />
                <span className="font-bangers text-xl text-white">STANDARD FOCUS BLOCK TIMER</span>
              </div>

              {/* Mode Pill */}
              <div className="inline-flex p-1 rounded-xl bg-[#070a14] border border-[#1b233a] text-xs font-bold font-mono">
                <span
                  className={`px-3 py-1 rounded-lg ${
                    pomodoroMode === 'focus' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  50M Deep Coding
                </span>
                <span
                  className={`px-3 py-1 rounded-lg ${
                    pomodoroMode === 'rest' ? 'bg-emerald-400 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  10M Lo-Fi Rest
                </span>
              </div>

              {/* Digital Big Clock */}
              <div className="p-6 rounded-3xl bg-[#070912] border-2 border-[#1e2a4a] shadow-inner font-mono">
                <span className="text-5xl sm:text-6xl font-black text-amber-300 tracking-wider">
                  {formatTimer(pomodoroSeconds)}
                </span>
                <span className="block text-xs text-slate-400 font-sans mt-2">
                  {pomodoroMode === 'focus'
                    ? 'Deep Work: Zero distractions, live keystrokes tracked'
                    : 'Recharge: Rest your eyes, listen to Lo-Fi radio'}
                </span>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setIsPomodoroRunning((prev) => !prev);
                    sound.playPop();
                  }}
                  className="btn-comic-push px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider border-2 border-black shadow-comic flex items-center gap-2 cursor-pointer"
                >
                  {isPomodoroRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPomodoroRunning ? 'Pause Block' : 'Start Focus Block'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsPomodoroRunning(false);
                    setPomodoroSeconds(pomodoroMode === 'focus' ? 50 * 60 : 10 * 60);
                    sound.playPop();
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Comic Mentorship Tip */}
              <ComicBubble
                speaker="byte"
                text="50 minutes of deep focus beats 4 hours of distracted tab-switching! Every 50m block awards +100 bonus Focus XP."
                subtext="Byte's Study Hack"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Academic Grading Rubric & Transcript */}
      {activeSubTab === 'rubric' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 p-6 rounded-3xl bg-[#0c101d] border-2 border-black shadow-comic space-y-5">
            <div>
              <h3 className="font-bangers text-2xl text-white">OFFICIAL COURSE GRADING RUBRIC &amp; POLICY</h3>
              <p className="text-xs text-slate-400">
                Grading is criterion-referenced based on demonstrable problem solving, authentic Git pushes, and timed combat exams.
              </p>
            </div>

            <div className="space-y-3">
              {COURSE_GRADING_POLICIES.map((policy, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#0f1424] border border-[#1c243a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 font-black text-xs font-mono flex items-center justify-center">
                        {policy.weight}%
                      </span>
                      <h4 className="font-bold text-white text-sm truncate">{policy.component}</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{policy.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transcript Card (4 Cols) */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-[#0f1424] border-2 border-black shadow-comic space-y-4">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-amber-400" />
              <div>
                <span className="text-[10px] uppercase font-mono text-amber-400 font-bold">Academic Transcript</span>
                <h4 className="font-bangers text-2xl text-white">STUDENT STANDING</h4>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2.5 rounded-xl bg-[#090d18] border border-slate-800">
                <span className="text-slate-400">Homework Points (40%):</span>
                <span className="font-bold text-white">{hwPoints.toFixed(1)} / 40.0</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#090d18] border border-slate-800">
                <span className="text-slate-400">POTD &amp; Git Commits (25%):</span>
                <span className="font-bold text-white">{potdPoints.toFixed(1)} / 25.0</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#090d18] border border-slate-800">
                <span className="text-slate-400">Combat &amp; Duels (15%):</span>
                <span className="font-bold text-white">{combatPoints.toFixed(1)} / 15.0</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#090d18] border border-slate-800">
                <span className="text-slate-400">Active Recall Quizzes (10%):</span>
                <span className="font-bold text-white">{recallPoints.toFixed(1)} / 10.0</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#090d18] border border-slate-800">
                <span className="text-slate-400">Final Boss Exam (10%):</span>
                <span className="font-bold text-white">{bossPoints.toFixed(1)} / 10.0</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-400/10 border-2 border-amber-400/40 text-center space-y-1">
              <span className="text-xs uppercase font-mono font-bold text-amber-300">Composite Grade</span>
              <div className="text-4xl font-bangers text-amber-400">{gradeInfo.grade}</div>
              <span className="text-xs text-white font-bold block">{gradeInfo.label}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Official Syllabus Document */}
      {activeSubTab === 'syllabus-doc' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0c101d] border-2 border-black shadow-comic space-y-6 font-sans">
          <div className="border-b-2 border-slate-800 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Official Department Course Syllabus
              </span>
              <h2 className="font-bangers text-3xl text-white">
                CS 201: DATA STRUCTURES, ALGORITHMS &amp; COMPUTATIONAL SYSTEMS
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Term: Cohort Day {scheduleState.dayNumber} ({scheduleState.cohortStartDateStr}) • 4.0 Semester Units • Prerequisites: CS101 or Equivalent
              </p>
            </div>

            <button
              onClick={() => {
                window.print();
                sound.playPop();
              }}
              className="px-4 py-2 rounded-xl bg-[#18213e] hover:bg-[#202c52] text-white font-bold text-xs border border-slate-700 cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Print Official Syllabus</span>
            </button>
          </div>

          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4">
            <h3 className="font-bangers text-xl text-amber-400 tracking-wide">1. Course Description</h3>
            <p>
              An intensive, mathematically rigorous exploration of fundamental data structures, asymptotic algorithmic design, and full-stack software systems. Students master linear structures (arrays, hash maps, two pointers, sliding windows, monotonic stacks), non-linear hierarchies (binary trees, BSTs, heaps), graphs (BFS, DFS, Dijkstra, DAG topological sort), dynamic programming, relational databases (SQL, Prisma ORM), and vector mathematics for machine learning.
            </p>

            <h3 className="font-bangers text-xl text-amber-400 tracking-wide">2. Primary Textbooks &amp; Curricular Resources</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Algorithm Adventures DSA Comic Guide</strong>, Prof. Algorismus &amp; Byte (Primary Interactive Courseware).</li>
              <li><strong>Introduction to Algorithms (CLRS)</strong>, 4th Edition, Cormen, Leiserson, Rivest, Stein (Theoretical Reference).</li>
              <li><strong>Python Data Structures &amp; Algorithms Handbook</strong>, Interactive Browser Wasm Edition.</li>
              <li><strong>PostgreSQL 16 &amp; Prisma v7 Architecture Guide</strong>, Pri &amp; Prof. Tuple.</li>
            </ul>

            <h3 className="font-bangers text-xl text-amber-400 tracking-wide">3. Policy on AI Co-Pilots &amp; Direct Commits</h3>
            <p>
              Interactive assistance from <strong>Byte (AI Mentor)</strong> and <strong>Professor Algorismus</strong> is formally sanctioned for pedagogical explanations and edge-case discovery. Every student must independently implement their final code in the WebAssembly editor and authenticate solutions via the <strong>GitHub Direct Commit Engine</strong>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
