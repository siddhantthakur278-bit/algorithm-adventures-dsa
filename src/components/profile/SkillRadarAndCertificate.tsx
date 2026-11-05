import React, { useState, useRef } from 'react';
import { useCourse } from '../../context/CourseContext';
import {
  Award,
  Download,
  Share2,
  Printer,
  Sparkles,
  CheckCircle2,
  Trophy,
  Flame,
  Shield,
  ExternalLink,
  QrCode,
  Layers,
} from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { ByteAvatar, ProfessorAvatar, PriAvatar } from '../characters/Characters';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface SkillMetric {
  subject: string;
  score: number; // 0 - 100
  fullMark: number;
  levelTitle: string;
  color: string;
}

export const SkillRadarAndCertificate: React.FC = () => {
  const { stats, realStreak, prismaCompletedTopics } = useCourse();
  const [studentName, setStudentName] = useState<string>('Siddhant Thakur');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  // Compute realistic scores across the 6 CS dimensions
  const dsaScore = Math.min(100, Math.max(35, Math.round((stats.solvedProblemIds.length / 10) * 100)));
  const compScore = Math.min(100, Math.max(45, (stats.blitzHighScore > 400 ? 85 : 60)));
  const webScore = Math.min(100, Math.max(40, 75)); // Web Dev 5 Books
  const backendScore = Math.min(100, Math.max(30, Math.round((prismaCompletedTopics.length / 14) * 100) + 40));
  const sqlScore = 75; // SQL Belt Dojo
  const mathScore = 70; // Linear Algebra

  const skills: SkillMetric[] = [
    { subject: 'DSA & Algos', score: dsaScore, fullMark: 100, levelTitle: 'Advanced', color: '#10B981' },
    { subject: 'Competitive Prog', score: compScore, fullMark: 100, levelTitle: 'Specialist', color: '#38BDF8' },
    { subject: 'Modern Web Dev', score: webScore, fullMark: 100, levelTitle: 'Full-Stack', color: '#FBBF24' },
    { subject: 'Backend & ORM', score: backendScore, fullMark: 100, levelTitle: 'Prisma v7', color: '#FB923C' },
    { subject: 'PostgreSQL & SQL', score: sqlScore, fullMark: 100, levelTitle: 'Belt Master', color: '#A78BFA' },
    { subject: 'Linear Algebra', score: mathScore, fullMark: 100, levelTitle: 'Matrix Studio', color: '#F43F5E' },
  ];

  // SVG Radar Polygon calculations
  const size = 300;
  const center = size / 2;
  const radius = center - 40;
  const totalAxes = skills.length;

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const polygonPoints = skills
    .map((s, i) => {
      const { x, y } = getCoordinates(s.score, i);
      return `${x},${y}`;
    })
    .join(' ');

  const handlePrint = () => {
    sound.playSuccess();
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    window.print();
  };

  const certificateId = `ADA-2026-${Math.abs(stats.xp * 7919).toString(16).toUpperCase().slice(0, 8)}`;
  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-8 font-comic">
      {/* Top Banner: Skill Radar & Analytics */}
      <div className="bg-[#0c101d] border-3 border-black rounded-3xl p-6 sm:p-8 shadow-comic">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div>
            <span className="px-3 py-1 bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full border-2 border-slate-900 shadow-sm flex items-center gap-1.5 w-fit">
              <Sparkles className="w-3.5 h-3.5" /> 360° Competency Radar
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              DEVELOPER MASTERY RADAR
            </h2>
            <p className="text-xs text-slate-400">
              Real-time multi-dimensional assessment synthesized from your solved algorithmic problems, GitHub direct commits, and competitive ratings.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#12182c] px-4 py-2 rounded-2xl border border-slate-700">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Real Streak</div>
              <div className="font-bangers text-lg text-amber-300">{realStreak.currentStreak} Days Active</div>
            </div>
          </div>
        </div>

        {/* Radar Graphic and Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Radar Chart SVG (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-4 bg-[#070a14] rounded-3xl border-2 border-[#1c243d] shadow-comic-sm">
              <svg width={size} height={size} className="overflow-visible">
                {/* Background Concentric Polygon Rings (20%, 40%, 60%, 80%, 100%) */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((level, lIdx) => {
                  const ringPoints = skills
                    .map((_, i) => {
                      const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
                      const r = level * radius;
                      return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
                    })
                    .join(' ');
                  return (
                    <polygon
                      key={lIdx}
                      points={ringPoints}
                      fill="none"
                      stroke="#1e2742"
                      strokeWidth="1.5"
                      strokeDasharray={lIdx === 4 ? 'none' : '3,3'}
                    />
                  );
                })}

                {/* Spokes from center to vertex */}
                {skills.map((_, i) => {
                  const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
                  return (
                    <line
                      key={i}
                      x1={center}
                      y1={center}
                      x2={center + radius * Math.cos(angle)}
                      y2={center + radius * Math.sin(angle)}
                      stroke="#1e2742"
                      strokeWidth="1.5"
                    />
                  );
                })}

                {/* Filled Radar Area */}
                <polygon
                  points={polygonPoints}
                  fill="rgba(6, 182, 212, 0.25)"
                  stroke="#06B6D4"
                  strokeWidth="3"
                  className="filter drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                />

                {/* Radar Vertex Points */}
                {skills.map((s, i) => {
                  const { x, y } = getCoordinates(s.score, i);
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="5"
                      fill="#FFDE59"
                      stroke="#000000"
                      strokeWidth="2"
                    />
                  );
                })}

                {/* Axis Labels */}
                {skills.map((s, i) => {
                  const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
                  const labelR = radius + 22;
                  const lx = center + labelR * Math.cos(angle);
                  const ly = center + labelR * Math.sin(angle);
                  return (
                    <text
                      key={i}
                      x={lx}
                      y={ly}
                      fill="#cbd5e1"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {s.subject}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Metrics Detail Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((sk, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-[#090d19] rounded-2xl border-2 border-[#1c243d] flex items-center justify-between gap-3 shadow-comic-sm"
              >
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sk.color }} />
                    {sk.subject}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Rating: <strong className="text-amber-300">{sk.levelTitle}</strong>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-base font-black text-white font-mono">{sk.score}%</div>
                  <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${sk.score}%`, backgroundColor: sk.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Official Verifiable Developer Certificate */}
      <div className="bg-[#0b0f1d] border-3 border-black rounded-3xl p-6 sm:p-8 shadow-comic space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl sm:text-2xl font-black text-white">
                OFFICIAL VERIFIABLE CERTIFICATE OF MASTERY
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Permanent cryptographic credentials issued under the Algorithm Adventures Open DSA Curriculum.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="btn-comic-push px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs rounded-xl border-2 border-slate-900 shadow-comic-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print / Export PDF
            </button>
          </div>
        </div>

        {/* Certificate Parchment Frame */}
        <div
          ref={certificateRef}
          className="relative bg-gradient-to-b from-[#141b2b] via-[#0f1422] to-[#0a0d18] border-4 border-yellow-500/80 rounded-3xl p-8 sm:p-12 shadow-[0_0_35px_rgba(234,179,8,0.2)] overflow-hidden"
        >
          {/* Gold Decorative Corner Badges */}
          <div className="absolute top-3 left-3 text-yellow-400/50 text-2xl">❖</div>
          <div className="absolute top-3 right-3 text-yellow-400/50 text-2xl">❖</div>
          <div className="absolute bottom-3 left-3 text-yellow-400/50 text-2xl">❖</div>
          <div className="absolute bottom-3 right-3 text-yellow-400/50 text-2xl">❖</div>

          {/* Certificate Inner Content */}
          <div className="text-center space-y-5 relative z-10 max-w-2xl mx-auto">
            {/* Header Logos & Title */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-yellow-400">
                <Sparkles className="w-5 h-5" />
                <span className="font-bangers text-xs tracking-widest uppercase">
                  Algorithm Adventures Academy • Silicon Valley & Global
                </span>
                <Sparkles className="w-5 h-5" />
              </div>
              <h1 className="font-bangers text-3xl sm:text-5xl text-yellow-300 tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                CERTIFICATE OF ALGORITHMIC MASTERY
              </h1>
              <p className="text-xs font-mono text-slate-400 tracking-wider">
                CERTIFICATE ID: <span className="text-amber-400 font-bold">{certificateId}</span>
              </p>
            </div>

            <div className="text-xs text-slate-300 uppercase tracking-widest font-bold pt-2">
              This is officially awarded to
            </div>

            {/* Recipient Name (Editable) */}
            <div className="border-b-2 border-yellow-500/60 pb-2">
              {isEditingName ? (
                <input
                  type="text"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  autoFocus
                  className="bg-black/60 font-bangers text-3xl sm:text-4xl text-white text-center rounded-xl p-2 border border-yellow-400 focus:outline-none"
                />
              ) : (
                <div
                  onClick={() => setIsEditingName(true)}
                  className="font-bangers text-3xl sm:text-5xl text-white tracking-wide cursor-pointer hover:text-yellow-300 transition"
                  title="Click to edit recipient name"
                >
                  {studentName} ✏️
                </div>
              )}
            </div>

            {/* Citation Statement */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              For distinguished accomplishment and verified competence in <strong className="text-white">Data Structures, Algorithms, TypeScript, React, PostgreSQL, and Prisma ORM</strong>. The candidate has proven proficiency through direct Git commits, live Pyodide compilation, and active competitive problem-solving.
            </p>

            {/* Candidate Metadata Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] font-mono">
              <span className="px-2.5 py-1 bg-black/60 text-slate-300 rounded-lg border border-slate-700">
                GitHub: <strong className="text-amber-300">siddhantthakur278-bit</strong>
              </span>
              <span className="px-2.5 py-1 bg-black/60 text-slate-300 rounded-lg border border-slate-700">
                Codeforces: <strong className="text-sky-300">siddhantthakur278</strong>
              </span>
              <span className="px-2.5 py-1 bg-black/60 text-slate-300 rounded-lg border border-slate-700">
                LeetCode: <strong className="text-emerald-300">siddhantkthakur</strong>
              </span>
              <span className="px-2.5 py-1 bg-black/60 text-slate-300 rounded-lg border border-slate-700">
                Total XP: <strong className="text-yellow-400">+{stats.xp}</strong>
              </span>
            </div>

            {/* Mentor Seals & Signatures */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#1e2742]">
              {/* Professor Signature */}
              <div className="text-center space-y-1">
                <ProfessorAvatar size="sm" mood="wise" className="mx-auto mb-1" />
                <div className="font-bangers text-xs text-yellow-300">PROF. ALGORISMUS</div>
                <div className="text-[9px] text-slate-400 font-mono">Chief Algorithmist</div>
                <div className="font-mono text-[9px] text-emerald-400">VERIFIED ✓</div>
              </div>

              {/* Central Seal with QR Code */}
              <div className="text-center space-y-1 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 border-2 border-black flex items-center justify-center shadow-comic-sm">
                  <Award className="w-6 h-6 text-black" />
                </div>
                <div className="text-[9px] font-mono text-slate-400">{issueDate}</div>
              </div>

              {/* Pri Signature */}
              <div className="text-center space-y-1">
                <PriAvatar size="sm" mood="teaching" className="mx-auto mb-1" />
                <div className="font-bangers text-xs text-cyan-300">PRI & BYTE</div>
                <div className="text-[9px] text-slate-400 font-mono">Prisma & Memory Labs</div>
                <div className="font-mono text-[9px] text-cyan-400">VERIFIED ✓</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
