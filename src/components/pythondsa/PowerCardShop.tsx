import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { ShoppingBag, Coins, Shield, Sparkles, Check, Lock, Star, Coffee, Scroll } from 'lucide-react';

interface PowerCard {
  id: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  cost: number;
  effect: string;
  lore: string;
  icon: string;
  gradient: string;
}

interface Consumable {
  id: string;
  name: string;
  cost: number;
  effect: string;
  icon: any;
}

export const PowerCardShop: React.FC<{
  coins: number;
  onSpendCoins: (amount: number) => boolean;
  onAddXp?: (amount: number) => void;
}> = ({ coins, onSpendCoins, onAddXp }) => {
  const [purchasedCards, setPurchasedCards] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('ada_pydsa_cards') || '["card-floyd"]');
    } catch {
      return ['card-floyd'];
    }
  });

  const cardsList: PowerCard[] = [
    {
      id: 'card-floyd',
      name: 'Floyd Tortoise & Hare',
      rarity: 'Legendary',
      cost: 200,
      effect: 'O(1) space cycle detection in any linked structure.',
      lore: 'Fast pointer moves twice as fast as slow pointer. They meet at the loop entrance!',
      icon: '🐢🐇',
      gradient: 'from-amber-400 via-rose-500 to-purple-600',
    },
    {
      id: 'card-timsort',
      name: 'Timsort: The Run Hunter',
      rarity: 'Epic',
      cost: 150,
      effect: 'O(N) natural adaptive runs sorting.',
      lore: 'The brilliant hybrid of Merge Sort and Insertion Sort powering Python since 2.3.',
      icon: '⚡🏹',
      gradient: 'from-cyan-400 via-teal-500 to-emerald-600',
    },
    {
      id: 'card-monostack',
      name: 'Monotonic Skyline Guardian',
      rarity: 'Rare',
      cost: 100,
      effect: 'Find next greater element in strictly O(N) amortized time.',
      lore: 'Keeps elements sorted inside the stack; pops weaker elements as stronger ones enter.',
      icon: '🥞🏙️',
      gradient: 'from-blue-500 via-indigo-500 to-violet-600',
    },
    {
      id: 'card-hash',
      name: 'The Magic Hash Bucket',
      rarity: 'Rare',
      cost: 100,
      effect: 'O(1) average lookup and insertion guarantee.',
      lore: 'Hash functions scatter keys into buckets. Resolves collisions with chaining.',
      icon: '🗝️📦',
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
    },
    {
      id: 'card-memo',
      name: 'Memoization: Time Reversal',
      rarity: 'Legendary',
      cost: 250,
      effect: 'Turns exponential O(2^N) recursion into linear O(N) DP lookup.',
      lore: 'Those who do not remember the past are condemned to recompute it.',
      icon: '⏳🧠',
      gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
    },
    {
      id: 'card-dijkstra',
      name: "Dijkstra's Priority Compass",
      rarity: 'Epic',
      cost: 180,
      effect: 'Shortest path with min-heap priority queue in O(E log V).',
      lore: 'Greedily explores the closest frontier node, guaranteeing optimal distance.',
      icon: '🧭🗺️',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
    },
  ];

  const consumables: Consumable[] = [
    {
      id: 'shield',
      name: 'Buggy Repellent Shield',
      cost: 80,
      effect: '+1 Streak Freeze Shield & Boss Battle protection',
      icon: Shield,
    },
    {
      id: 'coffee',
      name: "Professor's Python Coffee",
      cost: 120,
      effect: '+200 Instant Quest XP & motivation booster',
      icon: Coffee,
    },
    {
      id: 'scroll',
      name: 'Golden Algorithm Scroll',
      cost: 60,
      effect: 'Unlocks hint & core idea on any brainstormer',
      icon: Scroll,
    },
  ];

  const handleBuyCard = (card: PowerCard) => {
    if (purchasedCards.includes(card.id)) return;
    if (coins < card.cost) {
      sound.playError();
      return;
    }
    const success = onSpendCoins(card.cost);
    if (!success) return;

    sound.playPowerUp();
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.65 } });
    const next = [...purchasedCards, card.id];
    setPurchasedCards(next);
    localStorage.setItem('ada_pydsa_cards', JSON.stringify(next));
  };

  const handleBuyConsumable = (c: Consumable) => {
    if (coins < c.cost) {
      sound.playError();
      return;
    }
    const success = onSpendCoins(c.cost);
    if (!success) return;

    sound.playCoin();
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    if (c.id === 'coffee' && onAddXp) {
      onAddXp(200);
    }
  };

  return (
    <div className="bg-[#0b1320] border-3 border-black rounded-3xl p-6 sm:p-8 shadow-comic relative overflow-hidden space-y-8">
      {/* Background glow */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-10 w-96 h-96 bg-purple-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#8B5CF6] text-white font-bangers text-xs border border-black shadow-comic-sm">
              Arsenal & Shop
            </span>
            <span className="text-xs font-mono text-purple-300 font-bold">
              Collectible Holographic Power Cards
            </span>
          </div>
          <h2 className="font-bangers text-2xl sm:text-4xl text-white tracking-wide mt-1">
            THE PYTHONIC ARSENAL & CARD SHOP
          </h2>
          <p className="text-xs text-slate-400">
            Spend your earned gold coins on rare collectible holographic cards, shields, and XP coffee!
          </p>
        </div>

        {/* Current Coins Wallet */}
        <div className="flex items-center gap-2 bg-[#070e17] px-4 py-2.5 rounded-2xl border-2 border-amber-500/40 shadow-comic-sm shrink-0">
          <Coins className="w-5 h-5 text-amber-400 animate-bounce" />
          <div className="text-left">
            <span className="text-[10px] font-mono text-slate-400 block leading-tight">HERO WALLET</span>
            <span className="font-bangers text-xl text-[#FBBF24] leading-none">{coins} Coins</span>
          </div>
        </div>
      </div>

      {/* Consumables Section */}
      <div className="space-y-3">
        <h3 className="font-bangers text-lg text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FBBF24]" />
          HERO SUPPLIES & POTIONS
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {consumables.map(c => {
            const Icon = c.icon;
            const canAfford = coins >= c.cost;

            return (
              <div
                key={c.id}
                className="bg-[#070e17] p-4 rounded-2xl border-2 border-[#1c2e44] flex flex-col justify-between space-y-3 shadow-comic-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#122336] text-[#FBBF24] border border-[#1e3450]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bangers text-sm sm:text-base text-white">{c.name}</h4>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{c.effect}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#152336]">
                  <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-amber-400" /> {c.cost}
                  </span>
                  <button
                    disabled={!canAfford}
                    onClick={() => handleBuyConsumable(c)}
                    className="px-3 py-1.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-black font-bangers text-xs border border-black shadow-comic-sm transition disabled:opacity-40 cursor-pointer"
                  >
                    Buy Item
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Holographic Power Cards Deck */}
      <div className="space-y-3 pt-2">
        <h3 className="font-bangers text-lg text-white flex items-center gap-2">
          <Star className="w-4 h-4 text-[#8B5CF6] fill-current" />
          COLLECTIBLE HOLOGRAPHIC POWER CARDS (3D TILT FOIL)
        </h3>
        <p className="text-xs text-slate-400">
          Unlock algorithmic superpowers! Hover over owned cards to see the holographic foil shine.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {cardsList.map(card => {
            const isOwned = purchasedCards.includes(card.id);
            const canAfford = coins >= card.cost;

            return (
              <motion.div
                key={card.id}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`rounded-3xl p-5 border-3 transition-all relative overflow-hidden shadow-comic-lg flex flex-col justify-between min-h-[290px] ${
                  isOwned
                    ? 'bg-[#0a121e] border-[#10B981] ring-2 ring-[#10B981]/30'
                    : 'bg-[#060b13] border-[#18283d] opacity-90'
                }`}
              >
                {/* Holographic Iridescent Shimmer Overlay on Owned Cards */}
                {isOwned && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-40 hover:opacity-80 transition" />
                )}

                <div>
                  {/* Top Bar: Icon & Rarity Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{card.icon}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bangers text-[10px] uppercase border border-black shadow-comic-sm ${
                        card.rarity === 'Legendary'
                          ? 'bg-[#FBBF24] text-black'
                          : card.rarity === 'Epic'
                          ? 'bg-[#8B5CF6] text-white'
                          : 'bg-[#38BDF8] text-black'
                      }`}
                    >
                      {card.rarity}
                    </span>
                  </div>

                  <h4 className="font-bangers text-lg sm:text-xl text-white tracking-wide mt-3">
                    {card.name}
                  </h4>

                  <p className="text-xs font-mono text-emerald-300 font-bold mt-1">
                    ⚡ {card.effect}
                  </p>

                  <p className="text-[11px] text-slate-400 font-sans italic mt-2 line-clamp-2">
                    "{card.lore}"
                  </p>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-4 border-t border-[#18283d] flex items-center justify-between">
                  {isOwned ? (
                    <span className="text-xs font-bangers text-emerald-400 flex items-center gap-1">
                      <Check className="w-4 h-4 stroke-[3]" /> OWNED & ACTIVE
                    </span>
                  ) : (
                    <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
                      <Coins className="w-4 h-4 text-amber-400" /> {card.cost} Coins
                    </span>
                  )}

                  {!isOwned && (
                    <button
                      disabled={!canAfford}
                      onClick={() => handleBuyCard(card)}
                      className="px-4 py-2 rounded-xl bg-[#FBBF24] hover:bg-amber-400 text-black font-bangers text-xs border border-black shadow-comic-sm disabled:opacity-40 cursor-pointer"
                    >
                      Unlock Card
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
