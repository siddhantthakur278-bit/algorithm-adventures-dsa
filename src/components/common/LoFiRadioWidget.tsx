import React, { useState, useEffect } from 'react';
import { ambientRadio, AmbientMode } from '../../utils/ambientMusicEngine';
import { Headphones, Play, Pause, Volume2, VolumeX, Sparkles, Music2, Radio } from 'lucide-react';
import { sound } from '../../utils/soundEffects';

export const LoFiRadioWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mode, setMode] = useState<AmbientMode>('lofi');
  const [volume, setVolume] = useState<number>(0.3);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    ambientRadio.setVolume(volume);
  }, [volume]);

  const togglePlay = () => {
    sound.playPop();
    if (isPlaying) {
      ambientRadio.stop();
      setIsPlaying(false);
    } else {
      ambientRadio.start(mode);
      setIsPlaying(true);
    }
  };

  const handleSelectMode = (newMode: AmbientMode) => {
    sound.playPop();
    setMode(newMode);
    if (isPlaying) {
      ambientRadio.start(newMode);
    }
  };

  const modeDetails: Record<AmbientMode, { label: string; sub: string; icon: string; color: string }> = {
    lofi: {
      label: 'Lo-Fi Chill Chords',
      sub: 'Warm minor 9th chords & tape filter',
      icon: '☕',
      color: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
    },
    chiptune: {
      label: '8-Bit Retro Chiptune',
      sub: 'Classic GameBoy arpeggio groove',
      icon: '🕹️',
      color: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10',
    },
    cyberpunk: {
      label: 'Cyberpunk Dark Bass',
      sub: 'Analog detuned pulse & filter sweep',
      icon: '🌌',
      color: 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10',
    },
    rain: {
      label: 'Deep Focus Rain',
      sub: 'Pink noise & ambient rainfall acoustic',
      icon: '🌧️',
      color: 'text-blue-400 border-blue-400/40 bg-blue-400/10',
    },
  };

  return (
    <div className="relative font-comic">
      {/* Navbar Launcher Button */}
      <button
        onClick={() => {
          sound.playPop();
          setIsOpen(!isOpen);
        }}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border-2 text-xs font-bold transition shadow-comic-sm cursor-pointer ${
          isPlaying
            ? 'bg-purple-900/80 text-purple-200 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)] animate-pulse'
            : 'bg-[#151929] text-slate-300 border-[#232a42] hover:border-slate-400 hover:text-white'
        }`}
        title="Coding Radio (Generative Lo-Fi & Synthwave Web Audio)"
      >
        <Radio className={`w-3.5 h-3.5 ${isPlaying ? 'text-purple-300 animate-spin' : 'text-slate-400'}`} />
        <span className="hidden xl:inline">Radio</span>

        {/* Animated Equalizer Waves when active */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-3 ml-0.5">
            <span className="w-0.5 bg-purple-400 animate-bounce" style={{ height: '60%', animationDelay: '0ms' }} />
            <span className="w-0.5 bg-pink-400 animate-bounce" style={{ height: '100%', animationDelay: '150ms' }} />
            <span className="w-0.5 bg-cyan-400 animate-bounce" style={{ height: '75%', animationDelay: '300ms' }} />
          </div>
        ) : (
          <span className="text-[10px] text-slate-500 font-mono">OFF</span>
        )}
      </button>

      {/* Floating Cassette Mini-Player Modal */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-80 sm:w-88 bg-[#0c101d] border-3 border-black rounded-2xl p-4 shadow-comic-lg animate-fadeIn text-slate-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#1c243d]">
            <div className="flex items-center gap-2">
              <span className="text-xl">📻</span>
              <div>
                <h4 className="font-bangers text-base text-white tracking-wide flex items-center gap-1.5">
                  LO-FI CODING RADIO
                  <span className="text-[9px] font-mono px-1.5 py-0.2 bg-purple-500/20 text-purple-300 rounded border border-purple-500/40">
                    Wasm Synth
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400">Procedural 100% in-browser ambient soundscapes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-white text-xs font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Cassette Tape Deck UI */}
          <div className="my-3 p-3 bg-[#070a13] rounded-xl border-2 border-[#161d33] relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center text-xs ${isPlaying ? 'border-purple-400 animate-spin' : 'border-slate-700'}`}>
                  ⚙️
                </div>
                <div>
                  <div className="font-bangers text-sm text-yellow-300">
                    {modeDetails[mode].icon} {modeDetails[mode].label}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">
                    {modeDetails[mode].sub}
                  </div>
                </div>
              </div>

              {/* Master Play / Pause */}
              <button
                onClick={togglePlay}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 border-black font-bangers shadow-comic-sm transition cursor-pointer btn-comic-push ${
                  isPlaying
                    ? 'bg-rose-500 text-white'
                    : 'bg-emerald-400 text-slate-950 font-black'
                }`}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>
            </div>

            {/* Live equalizer visualizer bar */}
            {isPlaying && (
              <div className="flex items-center justify-between gap-1 mt-3 pt-2 border-t border-[#141b2e]">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full animate-pulse"
                    style={{
                      height: `${12 + Math.sin((i + Date.now() / 200)) * 14}px`,
                      animationDelay: `${i * 60}ms`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Mode Selector Radio Pills */}
          <div className="space-y-1.5 my-3">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Select Soundscape:
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(modeDetails) as AmbientMode[]).map(mKey => {
                const info = modeDetails[mKey];
                const isSelected = mode === mKey;
                return (
                  <button
                    key={mKey}
                    onClick={() => handleSelectMode(mKey)}
                    className={`p-2 rounded-xl border text-left transition cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? `${info.color} shadow-comic-sm font-bold`
                        : 'bg-[#101424] border-[#1d253d] text-slate-400 hover:text-white hover:bg-[#161c33]'
                    }`}
                  >
                    <span className="text-base">{info.icon}</span>
                    <div className="truncate">
                      <div className="text-xs font-bold truncate">{info.label.split(' ')[0]}</div>
                      <div className="text-[9px] opacity-75 font-mono truncate">{info.label.split(' ').slice(1).join(' ')}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Volume Slider & Footer */}
          <div className="pt-2 border-t border-[#1c243d] flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-1">
              {volume === 0 ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={e => setVolume(parseFloat(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer h-1.5 bg-[#171e33] rounded-lg"
              />
              <span className="text-[10px] font-mono text-slate-400 w-8 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
