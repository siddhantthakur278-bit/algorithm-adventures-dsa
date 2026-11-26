// ═══════════════════════════════════════════════════════════════════════════════
// 🔒 ADA HUB — Premium Gate Overlay
// ═══════════════════════════════════════════════════════════════════════════════
// Wraps any feature section with a premium gating overlay that shows a lock
// icon and "Upgrade to unlock" CTA if the user doesn't have the right plan.
// ═══════════════════════════════════════════════════════════════════════════════

import React from 'react';
import { Lock, Crown, Sparkles, ArrowRight } from 'lucide-react';
import {
  hasFeatureAccess,
  getCurrentPlan,
  SUBSCRIPTION_PLANS,
} from '../../utils/paymentService';

interface PremiumGateProps {
  feature: 'lectures' | 'potd' | 'planner' | 'premium' | 'interview' | 'duel' | 'hightech';
  children: React.ReactNode;
  /** Optional: custom label for what's being gated */
  label?: string;
  /** Optional: minimum plan required (shown in the upgrade prompt) */
  minPlan?: 'starter' | 'pro' | 'elite';
  /** If true, show a subtle badge instead of full overlay (for partial access) */
  softGate?: boolean;
}

export const PremiumGate: React.FC<PremiumGateProps> = ({
  feature,
  children,
  label,
  minPlan = 'starter',
  softGate = false,
}) => {
  const hasAccess = hasFeatureAccess(feature);
  const currentPlan = getCurrentPlan();
  const requiredPlan = SUBSCRIPTION_PLANS.find((p) => p.id === minPlan);

  if (hasAccess) {
    return <>{children}</>;
  }

  // Soft gate: show content with an overlay badge
  if (softGate) {
    return (
      <div className="relative">
        {children}
        <div className="absolute top-2 right-2 z-50">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-payment-sandbox'))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40
              text-amber-400 text-[10px] font-bold hover:bg-amber-500/30 transition-all backdrop-blur-sm"
          >
            <Crown className="w-3 h-3" />
            Upgrade for Full Access
          </button>
        </div>
      </div>
    );
  }

  // Full gate: overlay the content
  return (
    <div className="relative">
      {/* Blurred Content Preview */}
      <div className="filter blur-sm opacity-40 pointer-events-none select-none">
        {children}
      </div>

      {/* Lock Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <div className="text-center space-y-4 p-8 max-w-sm">
          {/* Lock Icon */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/30 flex items-center justify-center">
            <Lock className="w-7 h-7 text-amber-400" />
          </div>

          <div>
            <h3 className="text-lg font-black text-white mb-1">
              {label ?? 'Premium Feature'}
            </h3>
            <p className="text-xs text-slate-400">
              Upgrade to <span className="text-amber-400 font-bold">{requiredPlan?.name ?? 'Starter Pack'}</span>{' '}
              or higher to unlock this feature.
            </p>
          </div>

          {/* What you get */}
          {requiredPlan && (
            <div className="text-left space-y-1 px-4">
              {requiredPlan.features.slice(0, 4).map((f, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <Sparkles className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-payment-sandbox'))}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm
              bg-gradient-to-r from-amber-500 to-orange-500 text-black
              hover:from-amber-400 hover:to-orange-400 transition-all active:scale-95
              shadow-lg shadow-amber-500/20"
          >
            <Crown className="w-4 h-4" />
            Upgrade Now
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <p className="text-[10px] text-slate-500">
            Currently on: {currentPlan.badge} {currentPlan.name}
          </p>
        </div>
      </div>
    </div>
  );
};
