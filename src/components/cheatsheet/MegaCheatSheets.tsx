import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { hallOfFameProblems } from '../../data/hallOfFameData';
import { FileSpreadsheet, Award, CheckCircle, Code, Printer, Download, Sparkles, Key, Shield, Lock, ExternalLink } from 'lucide-react';
import { ByteAvatar, ProfessorAvatar } from '../characters/Characters';
import { sound } from '../../utils/soundEffects';

export const MegaCheatSheets: React.FC = () => {
  const { stats, loadProblemInIDE, setActiveTab: setAppActiveTab } = useCourse();
  const [userName, setUserName] = useState('Adventurer Byte');
  const [activeTab, setActiveTab] = useState<'matrix' | 'masterTheorem' | 'hallOfFame' | 'certificate' | 'authMatrix'>('matrix');

  const printCertificate = () => {
    sound.playPop();
    window.print();
  };

  const dsTable = [
    { name: 'Array', access: 'O(1)', search: 'O(N)', insert: 'O(N)', delete: 'O(N)', space: 'O(N)' },
    { name: 'Singly Linked List', access: 'O(N)', search: 'O(N)', insert: 'O(1)*', delete: 'O(1)*', space: 'O(N)' },
    { name: 'Stack / Queue', access: 'O(N)', search: 'O(N)', insert: 'O(1)', delete: 'O(1)', space: 'O(N)' },
    { name: 'Hash Table', access: 'N/A', search: 'O(1) avg', insert: 'O(1) avg', delete: 'O(1) avg', space: 'O(N)' },
    { name: 'Binary Search Tree', access: 'O(log N)', search: 'O(log N)', insert: 'O(log N)', delete: 'O(log N)', space: 'O(N)' },
    { name: 'Binary Heap (Priority Queue)', access: 'O(1) min', search: 'O(N)', insert: 'O(log N)', delete: 'O(log N)', space: 'O(N)' },
    { name: 'Graph (Adjacency List)', access: 'N/A', search: 'O(V+E)', insert: 'O(1)', delete: 'O(deg)', space: 'O(V+E)' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Banner */}
      <div className="bg-[#0c101d] border-2 border-[#1c243a] rounded-3xl p-6 sm:p-8 shadow-comic-lg bg-halftone">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBBF24] text-black font-bangers text-xs border border-black shadow-comic-sm">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              ULTIMATE DEVELOPER ARSENAL
            </span>
            <h1 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
              MEGA CHEAT SHEETS & CERTIFICATE
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Instant recall tables for time/space complexities, Master Theorem cheat codes,
              Hall of Fame 80-problem tracker, and your official Certificate of Awesomeness!
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveTab('matrix');
                sound.playPop();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bangers tracking-wider border-2 transition ${
                activeTab === 'matrix'
                  ? 'bg-[#FBBF24] text-black border-black shadow-comic-sm'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              DS Complexity Matrix
            </button>
            <button
              onClick={() => {
                setActiveTab('masterTheorem');
                sound.playPop();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bangers tracking-wider border-2 transition ${
                activeTab === 'masterTheorem'
                  ? 'bg-[#38BDF8] text-black border-black shadow-comic-sm'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              Master Theorem
            </button>
            <button
              onClick={() => {
                setActiveTab('hallOfFame');
                sound.playPop();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bangers tracking-wider border-2 transition ${
                activeTab === 'hallOfFame'
                  ? 'bg-[#10B981] text-black border-black shadow-comic-sm'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              Hall of Fame Tracker ({stats.solvedProblemIds.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('certificate');
                sound.playPop();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bangers tracking-wider border-2 transition ${
                activeTab === 'certificate'
                  ? 'bg-[#F43F5E] text-white border-black shadow-comic-sm'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              Certificate
            </button>
            <button
              onClick={() => {
                setActiveTab('authMatrix');
                sound.playPop();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bangers tracking-wider border-2 transition flex items-center gap-1.5 ${
                activeTab === 'authMatrix'
                  ? 'bg-purple-600 text-white border-black shadow-comic-sm'
                  : 'bg-[#13182b] text-slate-300 border-[#222c48] hover:text-white'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              OAuth 2.0 &amp; JWT Matrix
            </button>
            <button
              onClick={() => {
                sound.playPop();
                window.dispatchEvent(new CustomEvent('open-auth-modal'));
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bangers tracking-wider border-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-300 border-amber-400/40 hover:from-amber-500/30 hover:to-purple-500/30 transition flex items-center gap-1.5"
            >
              <span>🛡️</span>
              Sign In / OTP Modal
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setAppActiveTab('calculus');
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bangers tracking-wider border-2 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-300 border-violet-400/40 hover:from-violet-500/30 hover:to-cyan-500/30 transition flex items-center gap-1.5"
            >
              <span>📐</span>
              Calculus 1 Arena (32 Ls)
            </button>
          </div>
        </div>
      </div>

      {/* 1. DATA STRUCTURES COMPLEXITY MATRIX */}
      {activeTab === 'matrix' && (
        <div className="bg-[#0c101d] rounded-2xl border-2 border-[#1c243a] p-6 shadow-comic-sm space-y-4">
          <h2 className="font-bangers text-2xl text-white">DATA STRUCTURES COMPLEXITY MATRIX</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#1b233a] text-slate-400">
                  <th className="py-3 px-4 font-bold text-white">Data Structure</th>
                  <th className="py-3 px-4">Access</th>
                  <th className="py-3 px-4">Search</th>
                  <th className="py-3 px-4">Insertion</th>
                  <th className="py-3 px-4">Deletion</th>
                  <th className="py-3 px-4">Space</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#182035] text-slate-200">
                {dsTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#13182b] transition">
                    <td className="py-3 px-4 font-bold text-[#FBBF24]">{row.name}</td>
                    <td className="py-3 px-4">{row.access}</td>
                    <td className="py-3 px-4">{row.search}</td>
                    <td className="py-3 px-4">{row.insert}</td>
                    <td className="py-3 px-4">{row.delete}</td>
                    <td className="py-3 px-4 text-[#38BDF8]">{row.space}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. MASTER THEOREM */}
      {activeTab === 'masterTheorem' && (
        <div className="bg-[#0c101d] rounded-2xl border-2 border-[#1c243a] p-6 shadow-comic-sm space-y-6">
          <h2 className="font-bangers text-2xl text-white">THE MASTER THEOREM FORMULA DECODER</h2>
          <div className="p-4 bg-[#080d19] rounded-xl border border-[#1b233a] font-mono text-xs text-slate-300 space-y-2">
            <div className="text-[#FBBF24] font-bold text-sm">T(N) = a T(N/b) + O(N^d)</div>
            <p className="text-slate-400">
              Where a &ge; 1 (subproblems), b &gt; 1 (division factor), d &ge; 0 (work exponent outside recursion).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border-2 border-[#10B981]/40 bg-[#071c14] space-y-2">
              <span className="font-bangers text-lg text-[#10B981]">CASE 1: LEAF HEAVY</span>
              <div className="font-mono text-xs text-white">log_b(a) &gt; d</div>
              <div className="text-xs font-bold text-[#FBBF24]">Complexity: O(N^(log_b a))</div>
              <p className="text-[11px] text-slate-300">
                Example: Strassen's Matrix (a=7, b=2, d=2) &rarr; O(N^2.807)
              </p>
            </div>

            <div className="p-4 rounded-xl border-2 border-[#38BDF8]/40 bg-[#081a2e] space-y-2">
              <span className="font-bangers text-lg text-[#38BDF8]">CASE 2: BALANCED</span>
              <div className="font-mono text-xs text-white">log_b(a) == d</div>
              <div className="text-xs font-bold text-[#FBBF24]">Complexity: O(N^d log N)</div>
              <p className="text-[11px] text-slate-300">
                Example: Merge Sort (a=2, b=2, d=1) &rarr; O(N log N)
              </p>
            </div>

            <div className="p-4 rounded-xl border-2 border-[#FB923C]/40 bg-[#241308] space-y-2">
              <span className="font-bangers text-lg text-[#FB923C]">CASE 3: ROOT HEAVY</span>
              <div className="font-mono text-xs text-white">log_b(a) &lt; d</div>
              <div className="text-xs font-bold text-[#FBBF24]">Complexity: O(N^d)</div>
              <p className="text-[11px] text-slate-300">
                Example: Quick Select partition step dominates &rarr; O(N)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. HALL OF FAME 80 CHECKLIST */}
      {activeTab === 'hallOfFame' && (
        <div className="bg-[#121626] rounded-2xl border-2 border-black p-6 shadow-comic-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bangers text-2xl text-white">
              CLASSIC PROBLEMS CATALOG ({stats.solvedProblemIds.length} Solved)
            </h2>
            <span className="text-xs font-mono text-gray-400">
              Categories A–I Curriculum
            </span>
          </div>

          <div className="space-y-2">
            {hallOfFameProblems.map((prob, idx) => {
              const isSolved = stats.solvedProblemIds.includes(prob.id);
              return (
                <div
                  key={prob.id}
                  onClick={() => loadProblemInIDE(prob)}
                  className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition ${
                    isSolved
                      ? 'bg-[#152e1a] border-[#7ED957]/50'
                      : 'bg-[#15192c] border-gray-800 hover:border-[#38B6FF]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-gray-400">#{idx + 1}</span>
                    <div>
                      <span className="font-bold text-sm text-white hover:underline">
                        {prob.title}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] text-gray-400">
                        <span>{prob.category}</span>
                        <span>•</span>
                        <span className="font-mono text-[#FFDE59]">{prob.timeComplexity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        prob.difficulty === 'Easy'
                          ? 'bg-green-500/10 text-green-400 border-green-500/30'
                          : prob.difficulty === 'Medium'
                          ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                          : 'bg-red-500/10 text-red-400 border-red-500/30'
                      }`}
                    >
                      {prob.difficulty}
                    </span>
                    {isSolved && <CheckCircle className="w-5 h-5 text-[#7ED957]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. CERTIFICATE OF AWESOMENESS */}
      {activeTab === 'certificate' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-[#141829] p-4 rounded-2xl border-2 border-black">
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-gray-300">Name on Certificate:</label>
              <input
                type="text"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                className="bg-[#0f121e] border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFDE59]"
              />
            </div>
            <button
              onClick={printCertificate}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFDE59] text-black font-bangers text-xs border-2 border-black shadow-comic-sm"
            >
              <Printer className="w-4 h-4" />
              Print / Save as PDF
            </button>
          </div>

          {/* Certificate Canvas Frame */}
          <div className="bg-[#fffef7] text-black rounded-3xl border-8 border-[#1a1a2e] p-8 sm:p-12 shadow-comic-lg relative overflow-hidden print:m-0 print:border-4">
            {/* Ornate Gold Border */}
            <div className="border-4 border-[#FFDE59] p-8 rounded-2xl relative space-y-6 text-center">
              <div className="flex justify-center items-center gap-4">
                <ByteAvatar size="md" mood="victory" />
                <div>
                  <span className="font-bangers text-lg text-[#FF914D] tracking-widest block">
                    ALGORITHM ADVENTURES DSA SAGA
                  </span>
                  <h1 className="font-bangers text-4xl sm:text-5xl text-[#1a1a2e] tracking-wider">
                    CERTIFICATE OF AWESOMENESS
                  </h1>
                </div>
                <ProfessorAvatar size="md" mood="proud" />
              </div>

              <p className="text-sm text-gray-600 font-serif italic">This certifies that</p>

              <div className="font-bangers text-3xl sm:text-4xl text-[#38B6FF] underline decoration-[#FFDE59] decoration-4 underline-offset-8">
                {userName}
              </div>

              <p className="text-xs sm:text-sm text-gray-700 max-w-xl mx-auto leading-relaxed">
                has valiantly defeated Bugsy, conquered the Master Theorem, mastered Two Pointers,
                navigated Graph Traversals, and demonstrated unstoppable algorithmic prowess!
              </p>

              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto pt-4 text-center font-mono text-xs border-t-2 border-gray-200">
                <div>
                  <span className="text-gray-500 block text-[10px]">TOTAL XP</span>
                  <strong className="text-base text-black font-bold">{stats.xp}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">SOLVED PROBLEMS</span>
                  <strong className="text-base text-black font-bold">{stats.solvedProblemIds.length}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">CURRENT STREAK</span>
                  <strong className="text-base text-black font-bold">{stats.streakCount} Days</strong>
                </div>
              </div>

              {/* Signatures */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-300 text-xs">
                <div className="text-left font-serif">
                  <div className="font-bold italic">Professor Algorismus</div>
                  <div className="text-gray-500 text-[10px]">Grandmaster of Algorithms</div>
                </div>

                <div className="w-16 h-16 rounded-full bg-[#FFDE59]/30 border-2 border-[#FFDE59] flex items-center justify-center font-bangers text-[11px] text-black">
                  OFFICIAL SEAL
                </div>

                <div className="text-right font-serif">
                  <div className="font-bold italic">Byte the Hero</div>
                  <div className="text-gray-500 text-[10px]">Algorithm Adventurer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. OAUTH 2.0 & JWT SECURITY MATRIX */}
      {activeTab === 'authMatrix' && (
        <div className="space-y-6">
          <div className="bg-[#0c101d] border-2 border-[#1c243a] rounded-2xl p-6 shadow-comic-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-bangers text-2xl text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <span>OAUTH 2.0 (RFC 6749) &amp; JWT (RFC 7519) ARCHITECTURE CHEAT SHEET</span>
                </h2>
                <p className="text-xs text-slate-300">
                  Comprehensive reference for identity tokens, authorization flows, PKCE math, claims, and storage security.
                </p>
              </div>

              <button
                onClick={() => {
                  sound.playPop();
                  setAppActiveTab('visualizer');
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bangers text-xs tracking-wider border border-black shadow-comic-sm transition cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Open Interactive OAuth &amp; JWT Visualizer</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Matrix 1: OAuth 2.0 PKCE vs Traditional Flows */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-amber-400 font-mono uppercase tracking-wider">
                1. OAuth 2.0 Grant Types Decision Matrix
              </h3>
              <div className="overflow-x-auto rounded-xl border border-gray-800">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#141829] text-gray-400 font-mono text-[11px] border-b border-gray-800">
                      <th className="p-3">Grant Type</th>
                      <th className="p-3">Client Type</th>
                      <th className="p-3">Client Secret?</th>
                      <th className="p-3">Use Case</th>
                      <th className="p-3">Security Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 font-mono text-slate-300">
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 font-bold text-emerald-400">Authorization Code + PKCE</td>
                      <td className="p-3">Public / Confidential</td>
                      <td className="p-3">No (uses verifier)</td>
                      <td className="p-3">SPAs (React/Vue), Mobile Apps, Next.js</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Gold Standard (RFC 7636)</span></td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 font-bold text-cyan-400">Client Credentials</td>
                      <td className="p-3">Confidential (Server)</td>
                      <td className="p-3">Yes (Secure Vault)</td>
                      <td className="p-3">Machine-to-Machine (M2M), Cron Daemons, Microservices</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">High (No User Involved)</span></td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 font-bold text-purple-400">Refresh Token Grant</td>
                      <td className="p-3">Both</td>
                      <td className="p-3">Depends</td>
                      <td className="p-3">Silent access token renewal without prompt</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">High (with Token Rotation)</span></td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] bg-red-950/10">
                      <td className="p-3 font-bold text-red-400 line-through">Implicit Grant</td>
                      <td className="p-3">Public</td>
                      <td className="p-3">No</td>
                      <td className="p-3">Deprecated legacy browser token return via URI hash fragment</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold">DEPRECATED &amp; INSECURE</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Matrix 2: JWT RFC 7519 Registered Claims */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-purple-400 font-mono uppercase tracking-wider">
                2. JWT Registered Claims Standard (RFC 7519)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                {[
                  { claim: 'sub', desc: 'Subject: Unique User Identifier (e.g. usr_10482)' },
                  { claim: 'iss', desc: 'Issuer: URL of Auth Server (e.g. https://auth.company.com)' },
                  { claim: 'exp', desc: 'Expiration: Unix timestamp in seconds after which token expires' },
                  { claim: 'iat', desc: 'Issued At: Timestamp when token was created' },
                  { claim: 'aud', desc: 'Audience: Intended recipient API (e.g. https://api.company.com)' },
                  { claim: 'nbf', desc: 'Not Before: Token cannot be accepted prior to this time' },
                  { claim: 'jti', desc: 'JWT ID: Unique nonce to prevent replay attacks' },
                  { claim: 'scope', desc: 'Permissions granted (e.g. read:profile write:orders)' },
                ].map(c => (
                  <div key={c.claim} className="p-3 rounded-xl bg-[#141829] border border-gray-800 space-y-1">
                    <span className="text-purple-400 font-bold text-sm">"{c.claim}"</span>
                    <p className="text-[11px] text-slate-300">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Matrix 3: Storage Security & Threat Defense */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-cyan-400 font-mono uppercase tracking-wider">
                3. Token Storage Security &amp; Attack Vector Comparison
              </h3>
              <div className="overflow-x-auto rounded-xl border border-gray-800">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#141829] text-gray-400 font-mono text-[11px] border-b border-gray-800">
                      <th className="p-3">Storage Location</th>
                      <th className="p-3">XSS Vulnerability</th>
                      <th className="p-3">CSRF Vulnerability</th>
                      <th className="p-3">Mitigation / Recommendation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 font-mono text-slate-300">
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 font-bold text-red-400">LocalStorage</td>
                      <td className="p-3 text-red-400">CRITICAL: Any script can read localStorage.token</td>
                      <td className="p-3 text-emerald-400">None: Not sent automatically by browser</td>
                      <td className="p-3">Never store sensitive long-lived tokens in localStorage.</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 font-bold text-emerald-400">HttpOnly + Secure Cookie</td>
                      <td className="p-3 text-emerald-400">IMMUNE: JavaScript (document.cookie) cannot read it</td>
                      <td className="p-3 text-amber-400">Protected with SameSite=Lax or anti-CSRF token</td>
                      <td className="p-3 font-bold text-emerald-300">Recommended for Refresh Tokens and Session Cookies.</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 font-bold text-cyan-400">In-Memory (React State / Closure)</td>
                      <td className="p-3 text-emerald-400">High: Token lost on page refresh, cannot be read from disk</td>
                      <td className="p-3 text-emerald-400">None: Must be manually added to Authorization header</td>
                      <td className="p-3 font-bold text-cyan-300">Recommended for Short-Lived Access Tokens (15m).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
