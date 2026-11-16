import React, { useState, useEffect } from 'react';
import { X, Check, Palette, Sparkles, Moon, Sun, Monitor } from 'lucide-react';
import {
  THEME_PRESETS,
  ThemePresetId,
  applyTheme,
  getStoredTheme,
} from '../../utils/themeEngine';
import { sound } from '../../utils/soundEffects';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({ isOpen, onClose }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemePresetId>(() => getStoredTheme());

  useEffect(() => {
    const handleThemeChange = (e: any) => {
      if (e?.detail?.id) setCurrentTheme(e.detail.id);
    };
    window.addEventListener('theme-changed', handleThemeChange);
    return () => window.removeEventListener('theme-changed', handleThemeChange);
  }, []);

  if (!isOpen) return null;

  const handleSelectTheme = (id: ThemePresetId) => {
    sound.playPop();
    applyTheme(id);
    setCurrentTheme(id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0b0e1b] border border-white/15 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Theme & Color Aura</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.08] text-slate-300 font-semibold">
                  6 Presets
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Choose your obsidian glassmorphism aesthetic & accent glow
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Theme Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {(Object.keys(THEME_PRESETS) as ThemePresetId[]).map((themeKey) => {
            const preset = THEME_PRESETS[themeKey];
            const isSelected = currentTheme === themeKey;

            return (
              <div
                key={themeKey}
                onClick={() => handleSelectTheme(themeKey)}
                className={`group relative p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 text-left ${
                  isSelected
                    ? 'bg-white/[0.08] border-white/40 shadow-lg scale-[1.01]'
                    : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-white/20'
                }`}
                style={{
                  boxShadow: isSelected ? `0 0 24px color-mix(in srgb, ${preset.accent} 25%, transparent)` : undefined,
                }}
              >
                {/* Top line: Icon, Name & Active Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl select-none">{preset.icon}</span>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-200 transition">
                        {preset.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 leading-tight">
                        {preset.tagline}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow-sm"
                      style={{ background: preset.accent }}
                    >
                      <Check className="w-3.5 h-3.5 text-slate-950 font-black stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Color Swatches Palette Bar */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full shadow-inner inline-block"
                      style={{ background: preset.accent }}
                      title={`Primary Accent: ${preset.accent}`}
                    />
                    <span
                      className="w-4 h-4 rounded-full shadow-inner inline-block"
                      style={{ background: preset.accentSecondary }}
                      title={`Secondary Accent: ${preset.accentSecondary}`}
                    />
                    <span
                      className="w-4 h-4 rounded-full shadow-inner inline-block border border-white/20"
                      style={{ background: preset.accentBg }}
                      title="Background Tint"
                    />
                  </div>
                  <span
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: preset.accentBg,
                      color: preset.accent,
                      border: `1px solid ${preset.accentBorder}`,
                    }}
                  >
                    {isSelected ? 'Active Theme' : 'Apply'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-mono text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Applied instantly across all components & studios
          </span>
          <button
            onClick={() => {
              sound.playSuccess();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
