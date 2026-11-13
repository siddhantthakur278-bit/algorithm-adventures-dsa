import React, { useState } from 'react';

export type HumanAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type HumanAvatarVariant = 'coder' | 'hoodie' | 'pro' | 'minimal' | 'adventurer';

export interface HumanAvatarProps {
  name?: string;
  seed?: string;
  avatarUrl?: string;
  size?: HumanAvatarSize;
  variant?: HumanAvatarVariant;
  className?: string;
  shape?: 'circle' | 'squircle' | 'rounded';
  aura?: 'amber' | 'cyan' | 'emerald' | 'purple' | 'none';
  showStatus?: boolean;
  statusColor?: string;
}

// 8 Distinct, High-Contrast Color Palettes for Diverse Human Avatars
const PALETTES = [
  {
    id: 'amber-gold',
    bgStart: '#1E1B18',
    bgEnd: '#0D0E12',
    skin: '#FCD34D',
    hair: '#78350F',
    cloth: '#F59E0B',
    accent: '#FDE68A',
    border: 'rgba(245, 158, 11, 0.4)',
  },
  {
    id: 'sapphire-sky',
    bgStart: '#101B2B',
    bgEnd: '#080E18',
    skin: '#FBBF24',
    hair: '#1E293B',
    cloth: '#0EA5E9',
    accent: '#7DD3FC',
    border: 'rgba(14, 165, 233, 0.4)',
  },
  {
    id: 'emerald-mint',
    bgStart: '#0F231D',
    bgEnd: '#071310',
    skin: '#FED7AA',
    hair: '#064E3B',
    cloth: '#10B981',
    accent: '#6EE7B7',
    border: 'rgba(16, 185, 129, 0.4)',
  },
  {
    id: 'violet-amethyst',
    bgStart: '#1C162E',
    bgEnd: '#0D0A17',
    skin: '#FDE68A',
    hair: '#4C1D95',
    cloth: '#8B5CF6',
    accent: '#C4B5FD',
    border: 'rgba(139, 92, 246, 0.4)',
  },
  {
    id: 'crimson-ruby',
    bgStart: '#261217',
    bgEnd: '#13080B',
    skin: '#FFEDD5',
    hair: '#881337',
    cloth: '#F43F5E',
    accent: '#FDA4AF',
    border: 'rgba(244, 63, 94, 0.4)',
  },
  {
    id: 'cyber-teal',
    bgStart: '#0E1F24',
    bgEnd: '#061013',
    skin: '#FEF08A',
    hair: '#134E4A',
    cloth: '#14B8A6',
    accent: '#5EEAD4',
    border: 'rgba(20, 184, 166, 0.4)',
  },
  {
    id: 'obsidian-slate',
    bgStart: '#1E293B',
    bgEnd: '#0F172A',
    skin: '#FDE047',
    hair: '#0F172A',
    cloth: '#64748B',
    accent: '#CBD5E1',
    border: 'rgba(100, 116, 139, 0.4)',
  },
  {
    id: 'sunset-orange',
    bgStart: '#2A1A12',
    bgEnd: '#140C08',
    skin: '#FED7AA',
    hair: '#7C2D12',
    cloth: '#F97316',
    accent: '#FDBA74',
    border: 'rgba(249, 115, 22, 0.4)',
  },
];

function stringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export const HumanAvatar: React.FC<HumanAvatarProps> = ({
  name = 'Adventurer',
  seed,
  avatarUrl,
  size = 'md',
  variant,
  className = '',
  shape = 'rounded',
  aura = 'none',
  showStatus = false,
  statusColor = '#10B981',
}) => {
  const [imgError, setImgError] = useState(false);

  // Deterministic seed resolution
  const seedString = (seed || name || 'human-adventurer').toLowerCase().trim();
  const hash = stringHash(seedString);
  const palette = PALETTES[hash % PALETTES.length];

  // Deterministic variant if not specified
  const effectiveVariant: HumanAvatarVariant =
    variant ||
    (['coder', 'hoodie', 'pro', 'minimal', 'adventurer'][hash % 5] as HumanAvatarVariant);

  // Size mapping
  const sizeMap: Record<HumanAvatarSize, { box: string; px: number; statusSize: string }> = {
    xs: { box: 'w-5 h-5 min-w-[20px]', px: 20, statusSize: 'w-1.5 h-1.5' },
    sm: { box: 'w-8 h-8 min-w-[32px]', px: 32, statusSize: 'w-2 h-2' },
    md: { box: 'w-10 h-10 min-w-[40px]', px: 40, statusSize: 'w-2.5 h-2.5' },
    lg: { box: 'w-14 h-14 min-w-[56px]', px: 56, statusSize: 'w-3 h-3' },
    xl: { box: 'w-20 h-20 min-w-[80px]', px: 80, statusSize: 'w-3.5 h-3.5' },
    '2xl': { box: 'w-28 h-28 min-w-[112px]', px: 112, statusSize: 'w-4 h-4' },
  };

  const { box, statusSize } = sizeMap[size] || sizeMap.md;

  const shapeClass =
    shape === 'circle'
      ? 'rounded-full'
      : shape === 'squircle'
      ? 'rounded-3xl'
      : 'rounded-2xl';

  const auraClass =
    aura === 'amber'
      ? 'ring-2 ring-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
      : aura === 'cyan'
      ? 'ring-2 ring-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
      : aura === 'emerald'
      ? 'ring-2 ring-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
      : aura === 'purple'
      ? 'ring-2 ring-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
      : '';

  // If a valid image URL is given and has not errored, render it with safe fallback
  const hasValidUrl = Boolean(avatarUrl && avatarUrl.trim() !== '' && !avatarUrl.includes('unsplash.com'));

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none overflow-hidden ${box} ${shapeClass} ${auraClass} ${className}`}
      style={{
        border: `1.5px solid ${palette.border}`,
        background: `linear-gradient(145deg, ${palette.bgStart}, ${palette.bgEnd})`,
      }}
      title={`${name} (@${seedString})`}
    >
      {hasValidUrl && !imgError ? (
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Vector Clean Human Logo */
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`bg-${seedString}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={palette.bgStart} />
              <stop offset="100%" stopColor={palette.bgEnd} />
            </linearGradient>
            <linearGradient id={`cloth-${seedString}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.cloth} />
              <stop offset="100%" stopColor={palette.hair} />
            </linearGradient>
            <filter id={`glow-${seedString}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Ambient Head Halo / Glow */}
          <circle cx="50" cy="40" r="28" fill={palette.cloth} opacity="0.18" />

          {/* Torso / Shoulders (Human Anatomy Curve) */}
          <path
            d="M 18 94 C 18 70, 32 60, 50 60 C 68 60, 82 70, 82 94 Z"
            fill={`url(#cloth-${seedString})`}
            stroke="#07090E"
            strokeWidth="3"
            filter={`url(#glow-${seedString})`}
          />

          {/* Neck */}
          <path
            d="M 43 56 L 50 66 L 57 56 Z"
            fill={palette.skin}
            stroke="#07090E"
            strokeWidth="1.5"
          />

          {/* Head (Clean Circle) */}
          <circle
            cx="50"
            cy="37"
            r="17"
            fill={palette.skin}
            stroke="#07090E"
            strokeWidth="3"
            filter={`url(#glow-${seedString})`}
          />

          {/* Ear Details */}
          <circle cx="32" cy="38" r="3" fill={palette.skin} stroke="#07090E" strokeWidth="1.5" />
          <circle cx="68" cy="38" r="3" fill={palette.skin} stroke="#07090E" strokeWidth="1.5" />

          {/* Variant: Coder (with developer glasses) */}
          {effectiveVariant === 'coder' && (
            <>
              {/* Hair (Sleek Crop) */}
              <path
                d="M 33 34 C 33 21, 67 21, 67 34 C 61 25, 39 25, 33 34 Z"
                fill={palette.hair}
              />
              {/* Glasses frame */}
              <rect x="36" y="33" width="11" height="8" rx="2.5" fill="none" stroke="#07090E" strokeWidth="2.5" />
              <rect x="53" y="33" width="11" height="8" rx="2.5" fill="none" stroke="#07090E" strokeWidth="2.5" />
              <line x1="47" y1="36" x2="53" y2="36" stroke="#07090E" strokeWidth="2.5" />
              {/* Lens shine */}
              <circle cx="44" cy="35" r="1.5" fill="#FFFFFF" opacity="0.8" />
              <circle cx="61" cy="35" r="1.5" fill="#FFFFFF" opacity="0.8" />
              {/* Smile */}
              <path d="M 45 46 Q 50 49 55 46" fill="none" stroke="#07090E" strokeWidth="2" strokeLinecap="round" />
            </>
          )}

          {/* Variant: Hoodie (Urban coder / cyber adventurer) */}
          {effectiveVariant === 'hoodie' && (
            <>
              {/* Hoodie cap over head */}
              <path
                d="M 31 38 C 31 18, 69 18, 69 38 C 65 24, 35 24, 31 38 Z"
                fill={palette.cloth}
                stroke="#07090E"
                strokeWidth="2.5"
              />
              {/* Eyes */}
              <circle cx="43" cy="36" r="2" fill="#07090E" />
              <circle cx="57" cy="36" r="2" fill="#07090E" />
              {/* Hoodie strings */}
              <line x1="45" y1="62" x2="45" y2="76" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              <line x1="55" y1="62" x2="55" y2="76" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              {/* Confident smirk */}
              <path d="M 46 45 Q 50 48 54 45" fill="none" stroke="#07090E" strokeWidth="2" strokeLinecap="round" />
            </>
          )}

          {/* Variant: Pro (Shirt & Collar) */}
          {effectiveVariant === 'pro' && (
            <>
              {/* Side-parted clean hair */}
              <path
                d="M 33 34 C 33 21, 67 21, 67 34 C 55 23, 40 28, 33 34 Z"
                fill={palette.hair}
              />
              {/* Eyes */}
              <circle cx="43" cy="37" r="2" fill="#07090E" />
              <circle cx="57" cy="37" r="2" fill="#07090E" />
              {/* Shirt V-neck collar */}
              <polygon points="50,68 42,59 50,60 58,59" fill="#FFFFFF" stroke="#07090E" strokeWidth="1.5" />
              {/* Smile */}
              <path d="M 44 46 Q 50 50 56 46" fill="none" stroke="#07090E" strokeWidth="2" strokeLinecap="round" />
            </>
          )}

          {/* Variant: Adventurer (Headband / DSA Master) */}
          {effectiveVariant === 'adventurer' && (
            <>
              {/* Headband */}
              <rect x="33" y="27" width="34" height="6" rx="2" fill="#EF4444" stroke="#07090E" strokeWidth="1.5" />
              {/* Emblem on headband */}
              <circle cx="50" cy="30" r="2" fill="#FEF08A" />
              {/* Spiky hair above headband */}
              <path d="M 34 27 L 39 19 L 45 25 L 50 17 L 55 25 L 61 19 L 66 27 Z" fill={palette.hair} />
              {/* Determined eyes */}
              <line x1="40" y1="36" x2="46" y2="38" stroke="#07090E" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="60" y1="36" x2="54" y2="38" stroke="#07090E" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="43" cy="39" r="2" fill="#07090E" />
              <circle cx="57" cy="39" r="2" fill="#07090E" />
              {/* Smile */}
              <path d="M 45 47 Q 50 51 55 47" fill="none" stroke="#07090E" strokeWidth="2" strokeLinecap="round" />
            </>
          )}

          {/* Variant: Minimal (Clean human silhouette) */}
          {effectiveVariant === 'minimal' && (
            <>
              {/* Minimalist modern human: clean head & shoulders with accent line */}
              <circle cx="50" cy="37" r="14" fill={palette.accent} opacity="0.9" />
              <path
                d="M 24 90 C 24 72, 36 64, 50 64 C 64 64, 76 72, 76 90 Z"
                fill={palette.cloth}
              />
            </>
          )}
        </svg>
      )}

      {/* Online / Active Telemetry Status Dot */}
      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 rounded-full border-2 border-[#07090E] ${statusSize}`}
          style={{ backgroundColor: statusColor }}
        />
      )}
    </div>
  );
};
