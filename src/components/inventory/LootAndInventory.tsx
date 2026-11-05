import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { initialBadges } from '../../data/gameData';
import { InventoryItem } from '../../types';
import { Package, Gift, Award, Sparkles, Shield, Check, Flame, Trophy } from 'lucide-react';
import { ByteAvatar, ProfessorAvatar } from '../characters/Characters';
import { sound } from '../../utils/soundEffects';

export const LootAndInventory: React.FC = () => {
  const { stats, openDailyLootChest, useInventoryItem, equipTitle, simulatedDate } = useCourse();

  const [activeTab, setActiveTab] = useState<'loot' | 'inventory' | 'badges' | 'wardrobe'>('loot');
  const [chestOpened, setChestOpened] = useState<{ item: InventoryItem; xp: number } | null>(null);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [selectedAura, setSelectedAura] = useState<string>(() => {
    return localStorage.getItem('ada_avatar_aura') || 'cyan';
  });

  const todayStr = (simulatedDate || new Date()).toISOString().split('T')[0];
  const canOpenChest = stats.lastLootChestDate !== todayStr;

  const handleOpenChest = () => {
    if (!canOpenChest || isOpening) return;
    setIsOpening(true);
    sound.playPop();

    setTimeout(() => {
      const drop = openDailyLootChest();
      setChestOpened(drop);
      setIsOpening(false);
    }, 900);
  };

  const getRarityBadge = (rarity: InventoryItem['rarity']) => {
    const colors = {
      Common: 'bg-gray-700 text-gray-200 border-gray-600',
      Rare: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      Epic: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      Legendary: 'bg-[#FFDE59]/20 text-[#FFDE59] border-[#FFDE59]/40',
    };
    return (
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${colors[rarity]}`}>
        {rarity}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#15192c] border-3 border-black rounded-3xl p-6 sm:p-8 shadow-comic-lg bg-halftone">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFDE59] text-black font-bangers text-xs border border-black shadow-comic-sm">
              <Package className="w-3.5 h-3.5" />
              TREASURE VAULT & ARSENAL
            </span>
            <h1 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
              DAILY LOOT CHEST & INVENTORY
            </h1>
            <p className="text-sm text-gray-300 max-w-xl">
              Open Professor's daily mystery chest for rare power cards, streak freeze shields, and
              XP potions. Equip comic titles and showcase your achievement badges!
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveTab('loot');
                sound.playPop();
              }}
              className={`px-4 py-2 rounded-xl font-bangers text-xs tracking-wider border-2 transition ${
                activeTab === 'loot'
                  ? 'bg-[#FFDE59] text-black border-black shadow-comic-sm'
                  : 'bg-[#1b2038] text-gray-300 border-gray-700'
              }`}
            >
              Daily Mystery Chest
            </button>
            <button
              onClick={() => {
                setActiveTab('inventory');
                sound.playPop();
              }}
              className={`px-4 py-2 rounded-xl font-bangers text-xs tracking-wider border-2 transition ${
                activeTab === 'inventory'
                  ? 'bg-[#38B6FF] text-black border-black shadow-comic-sm'
                  : 'bg-[#1b2038] text-gray-300 border-gray-700'
              }`}
            >
              Backpack Inventory ({stats.inventory.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('badges');
                sound.playPop();
              }}
              className={`px-4 py-2 rounded-xl font-bangers text-xs tracking-wider border-2 transition ${
                activeTab === 'badges'
                  ? 'bg-[#7ED957] text-black border-black shadow-comic-sm'
                  : 'bg-[#1b2038] text-gray-300 border-gray-700'
              }`}
            >
              Badges ({stats.badges.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('wardrobe');
                sound.playPop();
              }}
              className={`px-4 py-2 rounded-xl font-bangers text-xs tracking-wider border-2 transition flex items-center gap-1.5 ${
                activeTab === 'wardrobe'
                  ? 'bg-[#C084FC] text-black border-black shadow-comic-sm font-black'
                  : 'bg-[#1b2038] text-gray-300 border-gray-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Wardrobe & Auras
            </button>
          </div>
        </div>
      </div>

      {/* 1. DAILY MYSTERY CHEST */}
      {activeTab === 'loot' && (
        <div className="bg-[#121626] rounded-3xl border-3 border-black p-8 sm:p-12 shadow-comic-sm text-center space-y-6">
          <div className="max-w-md mx-auto space-y-2">
            <h2 className="font-bangers text-3xl text-white">PROFESSOR’S DAILY MYSTERY VAULT</h2>
            <p className="text-xs text-gray-400">
              Contains legendary items, streak shields, XP potions, and equippable titles!
            </p>
          </div>

          {/* Animated Chest Stage */}
          <div className="py-8 flex flex-col items-center justify-center">
            <div
              className={`w-36 h-36 rounded-3xl border-4 border-black flex items-center justify-center text-6xl shadow-comic-lg transition-transform ${
                isOpening ? 'scale-110 rotate-6 bg-[#FFDE59]' : 'bg-[#1e2540] hover:scale-105'
              }`}
            >
              {isOpening ? '💥' : chestOpened ? '🎁' : '🧰'}
            </div>

            {chestOpened ? (
              <div className="mt-6 p-4 bg-[#142318] rounded-2xl border-2 border-[#7ED957] max-w-sm w-full space-y-2 animate-bounce">
                <span className="text-xs font-bold text-[#7ED957] uppercase tracking-wider block">
                  YOU UNLOCKED:
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl">{chestOpened.item.icon}</span>
                  <div className="text-left">
                    <h4 className="font-bangers text-lg text-white">{chestOpened.item.name}</h4>
                    <span className="text-xs text-gray-300">+{chestOpened.xp} Bonus XP</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div>
            <button
              onClick={handleOpenChest}
              disabled={!canOpenChest || isOpening}
              className="px-8 py-3.5 rounded-2xl bg-[#FFDE59] hover:bg-[#ffe680] text-black font-bangers text-base border-3 border-black shadow-comic-sm transition active:translate-y-1 disabled:opacity-50"
            >
              {!canOpenChest
                ? 'VAULT OPENED TODAY (Next chest at 5:00 AM)'
                : isOpening
                ? 'UNLOCKING VAULT...'
                : 'OPEN TODAY’S MYSTERY CHEST! ✨'}
            </button>
          </div>
        </div>
      )}

      {/* 2. BACKPACK INVENTORY */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bangers text-2xl text-white">YOUR ARSENAL BACKPACK</h2>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <span>Equipped Title:</span>
              <strong className="text-[#FFDE59] bg-[#FFDE59]/10 px-2 py-0.5 rounded border border-[#FFDE59]/30">
                {stats.activeTitle}
              </strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.inventory.map(item => (
              <div
                key={item.id}
                className="bg-[#121626] rounded-2xl border-2 border-black p-5 shadow-comic-sm flex flex-col justify-between space-y-4 hover:border-[#38B6FF] transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{item.icon}</span>
                    {getRarityBadge(item.rarity)}
                  </div>

                  <h3 className="font-bold text-white text-base">{item.name}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                  <span className="font-mono text-xs text-gray-400">
                    Qty: <strong className="text-white">{item.quantity}</strong>
                  </span>

                  {item.type === 'title' ? (
                    <button
                      onClick={() => equipTitle(item.name.replace('Title: ', '').replace(/"/g, ''))}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-[#FFDE59] text-black hover:bg-[#ffe680] border border-black"
                    >
                      Equip Title
                    </button>
                  ) : (
                    <button
                      onClick={() => useInventoryItem(item.id)}
                      disabled={item.quantity <= 0}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-[#38B6FF] text-black hover:bg-[#52c2ff] border border-black disabled:opacity-50"
                    >
                      Use Item
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. ACHIEVEMENT BADGES */}
      {activeTab === 'badges' && (
        <div className="space-y-6">
          <h2 className="font-bangers text-2xl text-white">ACHIEVEMENT BADGES VAULT</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {initialBadges.map(badge => {
              const isUnlocked = stats.badges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`rounded-2xl border-2 p-5 shadow-comic-sm space-y-3 transition ${
                    isUnlocked
                      ? 'bg-[#15241b] border-[#7ED957]/50'
                      : 'bg-[#141829] border-gray-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{badge.icon}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isUnlocked
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-gray-800 text-gray-400'
                      }`}
                    >
                      {isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-white text-base">{badge.title}</h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{badge.description}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-[11px]">
                    <span className="text-gray-400">{badge.category}</span>
                    <span className="text-[#FFDE59] font-bold font-mono">+{badge.xpReward} XP</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. AVATAR WARDROBE & AURA GLOWS */}
      {activeTab === 'wardrobe' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Avatar Live Stage */}
          <div className="bg-[#121626] rounded-3xl border-3 border-black p-8 shadow-comic-lg flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 font-bold text-xs uppercase tracking-wider rounded-full border border-purple-500/40">
                Aura Dressing Room
              </span>
              <h2 className="font-bangers text-3xl text-white">CHARACTER AURA CUSTOMIZER</h2>
              <p className="text-xs text-gray-400 max-w-md">
                Equip glowing elemental auras and titles earned through streaks, duels, and problem completions.
              </p>
              <div className="pt-2 text-xs font-mono text-amber-300">
                Active Title: <strong>{stats.activeTitle}</strong>
              </div>
            </div>

            {/* Live Character Preview with chosen aura */}
            <div className="relative p-8 flex items-center justify-center">
              <div
                className={`p-6 rounded-3xl border-3 transition-all duration-500 flex items-center justify-center ${
                  selectedAura === 'cyan'
                    ? 'shadow-[0_0_40px_rgba(6,182,212,0.7)] border-cyan-400 bg-cyan-950/40 animate-pulse'
                    : selectedAura === 'fire'
                    ? 'shadow-[0_0_40px_rgba(251,146,60,0.8)] border-orange-500 bg-orange-950/40 animate-pulse'
                    : selectedAura === 'quantum'
                    ? 'shadow-[0_0_40px_rgba(168,85,247,0.8)] border-purple-500 bg-purple-950/40'
                    : selectedAura === 'gold'
                    ? 'shadow-[0_0_45px_rgba(250,204,21,0.9)] border-yellow-400 bg-yellow-950/40'
                    : 'border-slate-700 bg-slate-900/60'
                }`}
              >
                <ByteAvatar size="xl" mood="happy" />
              </div>
            </div>
          </div>

          {/* Aura Selection Cards */}
          <div className="space-y-3">
            <h3 className="font-bangers text-xl text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" /> SELECT ELEMENTAL AURA
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { id: 'none', label: 'Clean Standard', color: 'border-slate-700', desc: 'No special aura effect', icon: '⚪' },
                { id: 'cyan', label: 'Cyber Neon Pulse', color: 'border-cyan-400 text-cyan-300', desc: 'High-frequency WebAssembly glow', icon: '⚡' },
                { id: 'fire', label: 'Streak Super Saiyan', color: 'border-orange-500 text-orange-300', desc: 'Charged by 7+ day flaming streaks', icon: '🔥' },
                { id: 'quantum', label: 'Void Sorcerer', color: 'border-purple-500 text-purple-300', desc: 'Prisma v7 & Tree Whisperer energy', icon: '🔮' },
                { id: 'gold', label: 'Grandmaster Gold', color: 'border-yellow-400 text-yellow-300', desc: 'Legendary gilded aura of mastery', icon: '👑' },
              ].map(aur => {
                const isSelected = selectedAura === aur.id;
                return (
                  <button
                    key={aur.id}
                    onClick={() => {
                      setSelectedAura(aur.id);
                      localStorage.setItem('ada_avatar_aura', aur.id);
                      sound.playPop();
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'bg-[#1a1530] border-purple-400 shadow-comic-sm font-bold'
                        : 'bg-[#121626] border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{aur.icon}</span>
                      {isSelected && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                          EQUIPPED
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{aur.label}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{aur.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Titles Wardrobe */}
          <div className="space-y-3">
            <h3 className="font-bangers text-xl text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" /> EQUIP GAMER TITLE
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                'Byte Novice',
                'Recursion Apprentice',
                'Pointer Knight',
                'Tree Whisperer',
                'Graph Navigator',
                'DP Sorcerer',
                'Bugsy Slayer',
                'Algorithm Grandmaster',
              ].map(t => {
                const isEquipped = stats.activeTitle === t;
                return (
                  <button
                    key={t}
                    onClick={() => equipTitle(t)}
                    className={`p-3 rounded-xl border-2 text-left transition cursor-pointer flex items-center justify-between ${
                      isEquipped
                        ? 'bg-amber-400 text-slate-950 border-black font-bangers shadow-comic-sm text-sm'
                        : 'bg-[#101424] text-slate-300 border-[#1c243d] hover:text-white text-xs font-bold'
                    }`}
                  >
                    <span>{t}</span>
                    {isEquipped && <span>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
