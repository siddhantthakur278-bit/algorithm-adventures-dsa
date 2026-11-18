import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Shield,
  Mail,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  LogOut,
  Zap,
  Lock,
  Key,
  Globe,
  Sparkles,
  ArrowRight,
  UserCheck,
  Code2,
} from 'lucide-react';
import {
  AuthSession,
  getStoredAuthSession,
  sendEmailOtp,
  verifyEmailOtp,
  sendPhoneOtp,
  verifyPhoneOtp,
  signInWithGoogle,
  clearAuthSession,
  refreshAuthSession,
  verifyAndDecodeJwt,
  parseJwtUnverified,
} from '../../utils/authService';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'email' | 'phone' | 'google' | 'jwt';
}

const COUNTRY_CODES = [
  { code: '+1', country: 'United States / Canada', flag: '🇺🇸' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+7', country: 'Russia', flag: '🇷🇺' },
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'email',
}) => {
  const [activeTab, setActiveTab] = useState<'email' | 'phone' | 'google' | 'jwt'>(initialTab);
  const [currentSession, setCurrentSession] = useState<AuthSession | null>(getStoredAuthSession);

  // Email States
  const [emailInput, setEmailInput] = useState('');
  const [emailOtpDigits, setEmailOtpDigits] = useState(['', '', '', '', '', '']);
  const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);
  const [isVerifyingEmailOtp, setIsVerifyingEmailOtp] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailTimer, setEmailTimer] = useState(0);

  // Phone States
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const [phoneInput, setPhoneInput] = useState('');
  const [phoneOtpDigits, setPhoneOtpDigits] = useState(['', '', '', '', '', '']);
  const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
  const [isVerifyingPhoneOtp, setIsVerifyingPhoneOtp] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneTimer, setPhoneTimer] = useState(0);

  // Google OAuth States
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [showCustomGoogleForm, setShowCustomGoogleForm] = useState(false);

  // Feedback & Copy States
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [dispatchedSimulation, setDispatchedSimulation] = useState<{
    type: 'email' | 'phone';
    target: string;
    code: string;
  } | null>(null);
  const [hasCopiedJwt, setHasCopiedJwt] = useState(false);
  const [jwtVerifyResult, setJwtVerifyResult] = useState<{
    valid: boolean;
    message: string;
  } | null>(null);

  // Input refs for 6-digit OTP focus jumping
  const emailInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const phoneInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync session changes from window event
  useEffect(() => {
    const handleSessionChange = (e: any) => {
      setCurrentSession(e.detail || null);
    };
    const handleOtpDispatched = (e: any) => {
      if (e.detail) {
        setDispatchedSimulation(e.detail);
      }
    };

    window.addEventListener('auth-session-changed', handleSessionChange);
    window.addEventListener('auth-otp-dispatched', handleOtpDispatched);

    return () => {
      window.removeEventListener('auth-session-changed', handleSessionChange);
      window.removeEventListener('auth-otp-dispatched', handleOtpDispatched);
    };
  }, []);

  // Resend OTP countdown timers
  useEffect(() => {
    let interval: any;
    if (emailTimer > 0) {
      interval = setInterval(() => setEmailTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [emailTimer]);

  useEffect(() => {
    let interval: any;
    if (phoneTimer > 0) {
      interval = setInterval(() => setPhoneTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [phoneTimer]);

  if (!isOpen) return null;

  // Handle Digit Keying & Auto-advancing
  const handleDigitChange = (
    val: string,
    idx: number,
    type: 'email' | 'phone'
  ) => {
    const clean = val.replace(/\D/g, '').slice(-1);
    const targetDigits = type === 'email' ? [...emailOtpDigits] : [...phoneOtpDigits];
    const setDigits = type === 'email' ? setEmailOtpDigits : setPhoneOtpDigits;
    const refs = type === 'email' ? emailInputRefs : phoneInputRefs;

    targetDigits[idx] = clean;
    setDigits(targetDigits);

    if (clean && idx < 5) {
      refs.current[idx + 1]?.focus();
    }
  };

  const handleDigitKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number,
    type: 'email' | 'phone'
  ) => {
    const targetDigits = type === 'email' ? emailOtpDigits : phoneOtpDigits;
    const refs = type === 'email' ? emailInputRefs : phoneInputRefs;

    if (e.key === 'Backspace' && !targetDigits[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  const handlePasteDigits = (
    e: React.ClipboardEvent<HTMLInputElement>,
    type: 'email' | 'phone'
  ) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasteData) return;

    const setDigits = type === 'email' ? setEmailOtpDigits : setPhoneOtpDigits;
    const refs = type === 'email' ? emailInputRefs : phoneInputRefs;
    const newDigits = ['', '', '', '', '', ''];
    for (let i = 0; i < pasteData.length; i++) {
      newDigits[i] = pasteData[i];
    }
    setDigits(newDigits);
    const nextIdx = Math.min(pasteData.length, 5);
    refs.current[nextIdx]?.focus();
  };

  // 1. EMAIL FLOW
  const handleSendEmailCode = async () => {
    if (!emailInput || !emailInput.includes('@')) {
      sound.playThud?.();
      setFeedback({ ok: false, text: 'Please enter a valid email address.' });
      return;
    }
    setIsSendingEmailOtp(true);
    setFeedback(null);
    try {
      const res = await sendEmailOtp(emailInput);
      if (res.success) {
        setEmailOtpSent(true);
        setEmailTimer(60);
        sound.playPop();
        if (res.debugOtp) {
          // Pre-populate for fluid developer experience
          const d = res.debugOtp.split('');
          setEmailOtpDigits(d);
        }
        setFeedback({
          ok: true,
          text: res.debugOtp
            ? `⚡ Code [${res.debugOtp}] ready! Auto-filled below or check inbox.`
            : res.message,
        });
      } else {
        sound.playThud?.();
        setFeedback({ ok: false, text: res.message });
      }
    } finally {
      setIsSendingEmailOtp(false);
    }
  };

  const handleVerifyEmailCode = async () => {
    const code = emailOtpDigits.join('');
    if (code.length < 6) {
      sound.playThud?.();
      setFeedback({ ok: false, text: 'Please enter the complete 6-digit OTP.' });
      return;
    }
    setIsVerifyingEmailOtp(true);
    setFeedback(null);
    try {
      const res = await verifyEmailOtp(emailInput, code);
      if (res.success && res.session) {
        sound.playSuccess();
        confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
        setCurrentSession(res.session);
        setFeedback({
          ok: true,
          text: '🎉 Email successfully verified! JWT Access Token issued.',
        });
        setTimeout(() => setActiveTab('jwt'), 1200);
      } else {
        sound.playThud?.();
        setFeedback({ ok: false, text: res.error || 'Verification failed.' });
      }
    } finally {
      setIsVerifyingEmailOtp(false);
    }
  };

  // 2. PHONE FLOW
  const handleSendPhoneCode = async () => {
    const fullPhone = `${selectedCountryCode}${phoneInput.trim()}`;
    if (!phoneInput || phoneInput.trim().length < 6) {
      sound.playThud?.();
      setFeedback({ ok: false, text: 'Please enter a valid phone number.' });
      return;
    }
    setIsSendingPhoneOtp(true);
    setFeedback(null);
    try {
      const res = await sendPhoneOtp(fullPhone);
      if (res.success) {
        setPhoneOtpSent(true);
        setPhoneTimer(60);
        sound.playPop();
        if (res.debugOtp) {
          setPhoneOtpDigits(res.debugOtp.split(''));
        }
        setFeedback({
          ok: true,
          text: res.debugOtp
            ? `📱 SMS OTP [${res.debugOtp}] simulated for ${fullPhone}!`
            : res.message,
        });
      } else {
        sound.playThud?.();
        setFeedback({ ok: false, text: res.message });
      }
    } finally {
      setIsSendingPhoneOtp(false);
    }
  };

  const handleVerifyPhoneCode = async () => {
    const fullPhone = `${selectedCountryCode}${phoneInput.trim()}`;
    const code = phoneOtpDigits.join('');
    if (code.length < 6) {
      sound.playThud?.();
      setFeedback({ ok: false, text: 'Please enter the complete 6-digit SMS code.' });
      return;
    }
    setIsVerifyingPhoneOtp(true);
    setFeedback(null);
    try {
      const res = await verifyPhoneOtp(fullPhone, code);
      if (res.success && res.session) {
        sound.playSuccess();
        confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
        setCurrentSession(res.session);
        setFeedback({
          ok: true,
          text: '🎉 Phone number verified! Cryptographic credentials issued.',
        });
        setTimeout(() => setActiveTab('jwt'), 1200);
      } else {
        sound.playThud?.();
        setFeedback({ ok: false, text: res.error || 'Verification failed.' });
      }
    } finally {
      setIsVerifyingPhoneOtp(false);
    }
  };

  // 3. GOOGLE SIGN-IN FLOW
  const handleGoogleSignIn = async (accountType: 'default' | 'custom' = 'default') => {
    setIsGoogleSigningIn(true);
    setFeedback(null);
    sound.playPop();
    try {
      let customProfile = undefined;
      if (accountType === 'custom' && customGoogleEmail) {
        customProfile = {
          email: customGoogleEmail.trim().toLowerCase(),
          name: customGoogleName.trim() || customGoogleEmail.split('@')[0],
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
        };
      }
      const res = await signInWithGoogle(customProfile);
      if (res.success && res.session) {
        sound.playSuccess();
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setCurrentSession(res.session);
        setFeedback({
          ok: true,
          text: `✨ Signed in as ${res.session.user.displayName}! Google OAuth 2.0 session verified.`,
        });
        setTimeout(() => setActiveTab('jwt'), 1000);
      } else {
        sound.playThud?.();
        setFeedback({ ok: false, text: res.error || 'Google sign-in failed.' });
      }
    } finally {
      setIsGoogleSigningIn(false);
    }
  };

  // 4. JWT ACTIONS
  const handleRefreshToken = async () => {
    sound.playPop();
    const refreshed = await refreshAuthSession();
    if (refreshed) {
      setCurrentSession(refreshed);
      sound.playSuccess();
      setFeedback({ ok: true, text: '🔄 JWT Access Token refreshed successfully!' });
    } else {
      setFeedback({ ok: false, text: 'Could not refresh token. Session may have expired.' });
    }
  };

  const handleTestJwtCrypto = async () => {
    if (!currentSession?.accessToken) return;
    sound.playPop();
    const res = await verifyAndDecodeJwt(currentSession.accessToken);
    if (res.valid) {
      setJwtVerifyResult({
        valid: true,
        message: '✅ Web Crypto HMAC-SHA256 Signature VALID! Token authentic & untampered.',
      });
    } else {
      setJwtVerifyResult({
        valid: false,
        message: `❌ Signature verification failed: ${res.error}`,
      });
    }
  };

  const handleCopyJwt = () => {
    if (currentSession?.accessToken) {
      navigator.clipboard.writeText(currentSession.accessToken);
      setHasCopiedJwt(true);
      sound.playPop();
      setTimeout(() => setHasCopiedJwt(false), 2000);
    }
  };

  const handleSignOut = () => {
    sound.playPop();
    clearAuthSession();
    setCurrentSession(null);
    setFeedback({ ok: true, text: 'Signed out successfully. Returned to guest mode.' });
  };

  const parsedJwt = currentSession?.accessToken
    ? parseJwtUnverified(currentSession.accessToken)
    : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-[#0d1024] to-[#070914] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-violet-500 to-cyan-500" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 to-violet-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Authentication & JWT Security Hub
                {currentSession && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Authenticated
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-400">
                Email & Phone OTP Verification • Google OAuth 2.0 • HMAC-SHA256 JWT
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-5 pt-3 pb-2 border-b border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => {
              setActiveTab('email');
              sound.playPop();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'email'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>Email OTP</span>
            {currentSession?.user.isEmailVerified && (
              <Check className="w-3 h-3 text-emerald-400" />
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('phone');
              sound.playPop();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'phone'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            <span>Phone SMS OTP</span>
            {currentSession?.user.isPhoneVerified && (
              <Check className="w-3 h-3 text-emerald-400" />
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('google');
              sound.playPop();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'google'
                ? 'bg-red-500/20 text-red-300 border border-red-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-red-400" />
            <span>Sign In with Google</span>
            {currentSession?.user.provider === 'google' && (
              <Check className="w-3 h-3 text-emerald-400" />
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('jwt');
              sound.playPop();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ml-auto ${
              activeTab === 'jwt'
                ? 'bg-violet-500/20 text-violet-300 border border-violet-400/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-violet-400" />
            <span>JWT Inspector</span>
          </button>
        </div>

        {/* Live Notification & Dispatch Banner */}
        {dispatchedSimulation && (
          <div className="mx-4 sm:mx-5 mt-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-200 animate-in fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Simulated Dispatch:</strong> 6-Digit Code for{' '}
                <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300 font-mono">
                  {dispatchedSimulation.target}
                </code>{' '}
                is{' '}
                <strong className="text-white text-sm font-mono tracking-widest bg-amber-500/30 px-1.5 py-0.5 rounded">
                  {dispatchedSimulation.code}
                </strong>
              </span>
            </div>
            <button
              onClick={() => setDispatchedSimulation(null)}
              className="text-amber-400 hover:text-white text-xs underline cursor-pointer ml-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`mx-4 sm:mx-5 mt-3 p-3 rounded-xl border text-xs flex items-center gap-2 ${
              feedback.ok
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}
          >
            {feedback.ok ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Tab Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* ============================================================== */}
          {/* TAB 1: EMAIL OTP                                                */}
          {/* ============================================================== */}
          {activeTab === 'email' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    Email Address
                  </label>
                  {currentSession?.user.isEmailVerified && (
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified ({currentSession.user.email})
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.g. developer@gmail.com"
                    className="flex-1 bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                  />
                  <button
                    onClick={handleSendEmailCode}
                    disabled={isSendingEmailOtp || emailTimer > 0}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    {isSendingEmailOtp ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Zap className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {emailTimer > 0 ? `Resend (${emailTimer}s)` : emailOtpSent ? 'Resend Code' : 'Send Code'}
                    </span>
                  </button>
                </div>
              </div>

              {/* 6-Digit OTP Box */}
              {emailOtpSent && (
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">
                      Enter 6-Digit Verification Code
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Paste or type individual digits
                    </span>
                  </div>

                  <div className="flex justify-center gap-2 sm:gap-3">
                    {emailOtpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => {
                          emailInputRefs.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleDigitChange(e.target.value, idx, 'email')}
                        onKeyDown={(e) => handleDigitKeyDown(e, idx, 'email')}
                        onPaste={(e) => handlePasteDigits(e, 'email')}
                        className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold font-mono text-white bg-black/60 border border-white/20 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none transition"
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleVerifyEmailCode}
                    disabled={isVerifyingEmailOtp || emailOtpDigits.join('').length < 6}
                    className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 disabled:opacity-50 text-slate-950 font-bold text-sm transition cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    {isVerifyingEmailOtp ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    <span>Verify Code & Issue JWT (+100 XP)</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: PHONE OTP                                                */}
          {/* ============================================================== */}
          {activeTab === 'phone' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                    Mobile Phone Number
                  </label>
                  {currentSession?.user.isPhoneVerified && (
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified ({currentSession.user.phone})
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <select
                    value={selectedCountryCode}
                    onChange={(e) => setSelectedCountryCode(e.target.value)}
                    className="bg-black/40 border border-white/15 rounded-lg px-2 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 transition"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                        {c.flag} {c.code} ({c.country})
                      </option>
                    ))}
                  </select>

                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="98765 43210"
                    className="flex-1 bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                  />

                  <button
                    onClick={handleSendPhoneCode}
                    disabled={isSendingPhoneOtp || phoneTimer > 0}
                    className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    {isSendingPhoneOtp ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Zap className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {phoneTimer > 0 ? `Resend (${phoneTimer}s)` : phoneOtpSent ? 'Resend SMS' : 'Send SMS'}
                    </span>
                  </button>
                </div>
              </div>

              {/* 6-Digit SMS OTP Box */}
              {phoneOtpSent && (
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">
                      Enter 6-Digit SMS Security Code
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Sent to {selectedCountryCode} {phoneInput}
                    </span>
                  </div>

                  <div className="flex justify-center gap-2 sm:gap-3">
                    {phoneOtpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => {
                          phoneInputRefs.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleDigitChange(e.target.value, idx, 'phone')}
                        onKeyDown={(e) => handleDigitKeyDown(e, idx, 'phone')}
                        onPaste={(e) => handlePasteDigits(e, 'phone')}
                        className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold font-mono text-white bg-black/60 border border-white/20 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition"
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleVerifyPhoneCode}
                    disabled={isVerifyingPhoneOtp || phoneOtpDigits.join('').length < 6}
                    className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 disabled:opacity-50 text-slate-950 font-bold text-sm transition cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    {isVerifyingPhoneOtp ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    <span>Verify SMS & Issue JWT (+100 XP)</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: GOOGLE OAUTH                                             */}
          {/* ============================================================== */}
          {activeTab === 'google' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white flex items-center justify-center shadow-xl">
                  {/* Google 'G' SVG Logo */}
                  <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">
                    Sign in with Google Identity Services (OAuth 2.0)
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                    Connect with Google OAuth 2.0 PKCE. Verified Google email, profile name, and avatar are automatically mapped to your developer passport.
                  </p>
                </div>

                {/* Primary Google One-Tap Action */}
                <button
                  onClick={() => handleGoogleSignIn('default')}
                  disabled={isGoogleSigningIn}
                  className="w-full max-w-sm mx-auto py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition cursor-pointer flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  {isGoogleSigningIn ? (
                    <RefreshCw className="w-5 h-5 animate-spin text-slate-900" />
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                  )}
                  <span>Continue with Google</span>
                </button>

                {/* Custom Google Account Simulator Drawer */}
                <div className="pt-2">
                  <button
                    onClick={() => setShowCustomGoogleForm((prev) => !prev)}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    {showCustomGoogleForm
                      ? 'Hide Custom Google Account'
                      : 'Or test with a specific Google Account'}
                  </button>
                </div>

                {showCustomGoogleForm && (
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-left space-y-2 animate-in fade-in max-w-sm mx-auto">
                    <div>
                      <label className="text-[11px] text-slate-400">Google Email</label>
                      <input
                        type="email"
                        value={customGoogleEmail}
                        onChange={(e) => setCustomGoogleEmail(e.target.value)}
                        placeholder="siddhant.dev@gmail.com"
                        className="w-full bg-black/60 border border-white/15 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400">Google Display Name</label>
                      <input
                        type="text"
                        value={customGoogleName}
                        onChange={(e) => setCustomGoogleName(e.target.value)}
                        placeholder="Siddhant Sharma"
                        className="w-full bg-black/60 border border-white/15 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <button
                      onClick={() => handleGoogleSignIn('custom')}
                      disabled={isGoogleSigningIn || !customGoogleEmail}
                      className="w-full py-1.5 rounded bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold text-xs"
                    >
                      Authenticate Custom Google Account
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: JWT INSPECTOR                                            */}
          {/* ============================================================== */}
          {activeTab === 'jwt' && (
            <div className="space-y-4">
              {currentSession ? (
                <>
                  {/* Active Session Status Card */}
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          {currentSession.user.displayName}
                          <span className="text-xs text-slate-400 font-normal">
                            (@{currentSession.user.handle})
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>Provider: <strong className="text-amber-300 uppercase">{currentSession.user.provider}</strong></span>
                          <span>•</span>
                          <span>Expires: {new Date(currentSession.expiresAt).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleRefreshToken}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                        title="Refresh JWT Access Token"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Refresh</span>
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                        title="Sign Out"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Sign Out</span>
                      </button>
                    </div>
                  </div>

                  {/* Raw Encoded JWT Token Box */}
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5 text-violet-400" />
                        RFC 7519 Encoded JWT Access Token (Header.Payload.Signature)
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleTestJwtCrypto}
                          className="px-2 py-1 rounded bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 text-[11px] font-semibold border border-violet-400/30 flex items-center gap-1 cursor-pointer"
                        >
                          <Lock className="w-3 h-3" />
                          Verify Signature
                        </button>
                        <button
                          onClick={handleCopyJwt}
                          className="px-2 py-1 rounded bg-white/10 hover:bg-white/15 text-slate-300 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          {hasCopiedJwt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          {hasCopiedJwt ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black font-mono text-[11px] break-all leading-relaxed select-all border border-white/5">
                      <span className="text-rose-400">{currentSession.accessToken.split('.')[0]}</span>
                      <span className="text-white">.</span>
                      <span className="text-violet-400">{currentSession.accessToken.split('.')[1]}</span>
                      <span className="text-white">.</span>
                      <span className="text-cyan-400">{currentSession.accessToken.split('.')[2]}</span>
                    </div>

                    {jwtVerifyResult && (
                      <div
                        className={`p-2 rounded text-xs font-mono font-semibold flex items-center gap-1.5 ${
                          jwtVerifyResult.valid
                            ? 'bg-emerald-500/10 text-emerald-300'
                            : 'bg-rose-500/10 text-rose-300'
                        }`}
                      >
                        <span>{jwtVerifyResult.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Decoded Claims Viewer */}
                  {parsedJwt && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-black/40 border border-rose-500/20 space-y-1.5">
                        <div className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                          Header (Algorithm &amp; Token Type)
                        </div>
                        <pre className="text-slate-300 text-[11px] overflow-x-auto">
                          {JSON.stringify(parsedJwt.header, null, 2)}
                        </pre>
                      </div>

                      <div className="p-3 rounded-xl bg-black/40 border border-violet-500/20 space-y-1.5">
                        <div className="text-[11px] font-bold text-violet-400 uppercase tracking-wider">
                          Payload (Verified User Claims)
                        </div>
                        <pre className="text-slate-300 text-[11px] overflow-x-auto">
                          {JSON.stringify(parsedJwt.payload, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-8 rounded-xl bg-white/[0.03] border border-white/10 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">No Active Authenticated Session</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      Verify your Email or Phone with an OTP, or Sign In with Google to issue a cryptographic JWT session.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('email')}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
                  >
                    Start Verification Now
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-white/10 bg-black/30 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Web Crypto API HMAC-SHA256 Ready</span>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
