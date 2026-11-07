// Universal Theme Engine with Comic & High-Tech Cyber Presets
// Persists in localStorage and applies CSS root variables dynamically

export type ThemePresetId = 'cyber-cyan' | 'manga-amber' | 'matrix-emerald' | 'tokyo-violet' | 'crimson-neon';

export interface ThemePreset {
  id: ThemePresetId;
  name: string;
  tagline: string;
  icon: string;
  accent: string;
  accentSecondary: string;
  accentBg: string;
  accentBorder: string;
  accentGlow: string;
  badgeBg: string;
  badgeText: string;
}

export const THEME_PRESETS: Record<ThemePresetId, ThemePreset> = {
  'cyber-cyan': {
    id: 'cyber-cyan',
    name: 'Cyberpunk Neon',
    tagline: 'High-Tech Cyan & Electric Sky',
    icon: '⚡',
    accent: '#06B6D4',
    accentSecondary: '#38BDF8',
    accentBg: 'rgba(6, 182, 212, 0.12)',
    accentBorder: 'rgba(6, 182, 212, 0.4)',
    accentGlow: '0 0 25px rgba(6, 182, 212, 0.35)',
    badgeBg: 'bg-cyan-400',
    badgeText: 'text-slate-950',
  },
  'manga-amber': {
    id: 'manga-amber',
    name: 'Golden Manga',
    tagline: 'Classic Warm Amber & Solar Gold',
    icon: '🌟',
    accent: '#FBBF24',
    accentSecondary: '#FB923C',
    accentBg: 'rgba(251, 191, 36, 0.12)',
    accentBorder: 'rgba(251, 191, 36, 0.4)',
    accentGlow: '0 0 25px rgba(251, 191, 36, 0.35)',
    badgeBg: 'bg-amber-400',
    badgeText: 'text-slate-950',
  },
  'matrix-emerald': {
    id: 'matrix-emerald',
    name: 'Matrix Terminal',
    tagline: 'Cyber Emerald & Hacker Green',
    icon: '💻',
    accent: '#10B981',
    accentSecondary: '#34D399',
    accentBg: 'rgba(16, 185, 129, 0.12)',
    accentBorder: 'rgba(16, 185, 129, 0.4)',
    accentGlow: '0 0 25px rgba(16, 185, 129, 0.35)',
    badgeBg: 'bg-emerald-400',
    badgeText: 'text-slate-950',
  },
  'tokyo-violet': {
    id: 'tokyo-violet',
    name: 'Tokyo Midnight',
    tagline: 'Cosmic Violet & Royal Purple',
    icon: '🌌',
    accent: '#8B5CF6',
    accentSecondary: '#A78BFA',
    accentBg: 'rgba(139, 92, 246, 0.12)',
    accentBorder: 'rgba(139, 92, 246, 0.4)',
    accentGlow: '0 0 25px rgba(139, 92, 246, 0.35)',
    badgeBg: 'bg-purple-400',
    badgeText: 'text-slate-950',
  },
  'crimson-neon': {
    id: 'crimson-neon',
    name: 'Synthetix Rose',
    tagline: 'Neon Rose & High-Energy Crimson',
    icon: '🩸',
    accent: '#F43F5E',
    accentSecondary: '#FB7185',
    accentBg: 'rgba(244, 63, 94, 0.12)',
    accentBorder: 'rgba(244, 63, 94, 0.4)',
    accentGlow: '0 0 25px rgba(244, 63, 94, 0.35)',
    badgeBg: 'bg-rose-400',
    badgeText: 'text-slate-950',
  },
};

const THEME_STORAGE_KEY = 'ada_user_theme_preset';

export function getStoredTheme(): ThemePresetId {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemePresetId;
    if (saved && THEME_PRESETS[saved]) return saved;
  } catch {}
  return 'manga-amber'; // Default warm golden classic
}

export function applyTheme(id: ThemePresetId): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, id);
    const preset = THEME_PRESETS[id];
    if (!preset || typeof document === 'undefined') return;

    const root = document.documentElement;
    root.style.setProperty('--user-accent', preset.accent);
    root.style.setProperty('--user-accent-secondary', preset.accentSecondary);
    root.style.setProperty('--user-accent-bg', preset.accentBg);
    root.style.setProperty('--user-accent-border', preset.accentBorder);
    root.style.setProperty('--user-accent-glow', preset.accentGlow);
    root.setAttribute('data-theme', id);
  } catch (err) {
    console.error('Failed to apply theme', err);
  }
}
