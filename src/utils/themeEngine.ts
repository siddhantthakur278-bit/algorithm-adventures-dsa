// Universal Theme Engine with Classic Studio & High-Contrast Presets
// Persists in localStorage and applies CSS root variables dynamically

export type ThemePresetId = 'classic-gold' | 'cyber-cyan' | 'manga-amber' | 'matrix-emerald' | 'tokyo-violet' | 'crimson-neon';

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
  'classic-gold': {
    id: 'classic-gold',
    name: 'Classic Academy',
    tagline: 'Timeless Obsidian & Imperial Amber Gold',
    icon: '🏛️',
    accent: '#F59E0B',
    accentSecondary: '#38BDF8',
    accentBg: 'rgba(245, 158, 11, 0.08)',
    accentBorder: 'rgba(245, 158, 11, 0.35)',
    accentGlow: '0 0 30px rgba(245, 158, 11, 0.25)',
    badgeBg: 'bg-amber-400',
    badgeText: 'text-slate-950 font-bold',
  },
  'cyber-cyan': {
    id: 'cyber-cyan',
    name: 'Precision Cyan',
    tagline: 'High-Tech Cyan & Electric Sapphire',
    icon: '⚡',
    accent: '#06B6D4',
    accentSecondary: '#38BDF8',
    accentBg: 'rgba(6, 182, 212, 0.08)',
    accentBorder: 'rgba(6, 182, 212, 0.35)',
    accentGlow: '0 0 30px rgba(6, 182, 212, 0.25)',
    badgeBg: 'bg-cyan-400',
    badgeText: 'text-slate-950 font-bold',
  },
  'manga-amber': {
    id: 'manga-amber',
    name: 'Solar Amber',
    tagline: 'Warm Amber & Solar Gold',
    icon: '🌟',
    accent: '#FBBF24',
    accentSecondary: '#FB923C',
    accentBg: 'rgba(251, 191, 36, 0.08)',
    accentBorder: 'rgba(251, 191, 36, 0.35)',
    accentGlow: '0 0 30px rgba(251, 191, 36, 0.25)',
    badgeBg: 'bg-amber-400',
    badgeText: 'text-slate-950 font-bold',
  },
  'matrix-emerald': {
    id: 'matrix-emerald',
    name: 'Studio Emerald',
    tagline: 'Classic Jade & Clean Matrix Terminal',
    icon: '💻',
    accent: '#10B981',
    accentSecondary: '#34D399',
    accentBg: 'rgba(16, 185, 129, 0.08)',
    accentBorder: 'rgba(16, 185, 129, 0.35)',
    accentGlow: '0 0 30px rgba(16, 185, 129, 0.25)',
    badgeBg: 'bg-emerald-400',
    badgeText: 'text-slate-950 font-bold',
  },
  'tokyo-violet': {
    id: 'tokyo-violet',
    name: 'Midnight Royal',
    tagline: 'Cosmic Violet & Iris Slate',
    icon: '🌌',
    accent: '#8B5CF6',
    accentSecondary: '#A78BFA',
    accentBg: 'rgba(139, 92, 246, 0.08)',
    accentBorder: 'rgba(139, 92, 246, 0.35)',
    accentGlow: '0 0 30px rgba(139, 92, 246, 0.25)',
    badgeBg: 'bg-purple-400',
    badgeText: 'text-slate-950 font-bold',
  },
  'crimson-neon': {
    id: 'crimson-neon',
    name: 'Classic Ruby',
    tagline: 'Deep Crimson & Rose Gold',
    icon: '🩸',
    accent: '#F43F5E',
    accentSecondary: '#FB7185',
    accentBg: 'rgba(244, 63, 94, 0.08)',
    accentBorder: 'rgba(244, 63, 94, 0.35)',
    accentGlow: '0 0 30px rgba(244, 63, 94, 0.25)',
    badgeBg: 'bg-rose-400',
    badgeText: 'text-slate-950 font-bold',
  },
};

const THEME_STORAGE_KEY = 'ada_user_theme_preset';

export function getStoredTheme(): ThemePresetId {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemePresetId;
    if (saved && THEME_PRESETS[saved]) return saved;
  } catch {}
  return 'classic-gold'; // Default classic imperial obsidian & amber gold
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