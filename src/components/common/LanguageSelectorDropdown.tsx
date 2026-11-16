import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Sparkles } from 'lucide-react';
import {
  SupportedLanguage,
  SELECTABLE_COMPILER_LANGUAGES,
  LANGUAGE_REGISTRY,
} from '../../utils/languageTemplates';
import { sound } from '../../utils/soundEffects';

interface LanguageSelectorDropdownProps {
  currentLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const LanguageSelectorDropdown: React.FC<LanguageSelectorDropdownProps> = ({
  currentLanguage,
  onSelectLanguage,
  className = '',
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLangConfig = LANGUAGE_REGISTRY[currentLanguage] || LANGUAGE_REGISTRY.python;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang: SupportedLanguage) => {
    sound.playPop();
    onSelectLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left z-30 ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group flex items-center gap-2 rounded-lg font-mono font-bold transition-all cursor-pointer border shadow-sm ${
          size === 'sm'
            ? 'px-2.5 py-1 text-xs'
            : 'px-3 py-1.5 text-xs'
        } bg-[#11162b] hover:bg-[#1a223f] border-slate-700/80 hover:border-amber-400/50 text-white`}
        title={`Active Compiler: ${activeLangConfig.name} ${activeLangConfig.version} (Click to switch)`}
      >
        <span className="text-sm select-none">{activeLangConfig.icon}</span>
        <span className="text-slate-100 font-semibold">{activeLangConfig.name}</span>
        <span className="text-[10px] text-amber-300/90 font-mono px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/20">
          {activeLangConfig.version.split(' ')[0]}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 rounded-xl bg-[#0c1020]/95 backdrop-blur-2xl border border-slate-700/80 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2.5 py-1.5 text-[10px] uppercase tracking-wider font-mono font-bold text-slate-400 border-b border-slate-800 flex items-center justify-between">
            <span>Selectable Compilers</span>
            <span className="text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> 9 Available
            </span>
          </div>

          <div className="max-h-72 overflow-y-auto py-1 space-y-0.5 custom-scrollbar">
            {SELECTABLE_COMPILER_LANGUAGES.map((langKey) => {
              const lang = LANGUAGE_REGISTRY[langKey];
              const isSelected = langKey === currentLanguage;

              return (
                <button
                  key={langKey}
                  type="button"
                  onClick={() => handleSelect(langKey)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-all cursor-pointer font-mono text-xs ${
                    isSelected
                      ? 'bg-amber-400/15 text-white border border-amber-400/30'
                      : 'hover:bg-white/[0.07] text-slate-300 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base select-none shrink-0">{lang.icon}</span>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-100">{lang.name}</span>
                        <span className="text-[10px] text-slate-400">{lang.version}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 truncate max-w-[150px]">
                        {lang.defaultFile}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-amber-400 shrink-0 ml-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
