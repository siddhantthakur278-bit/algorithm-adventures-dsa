// ═══════════════════════════════════════════════════════════════════════════════
// 💳 ADA HUB — Payment Sandbox Modal
// ═══════════════════════════════════════════════════════════════════════════════
// Full payment sandbox with Razorpay, PayPal & Stripe simulation
// Gates: Lectures, POTD Vault, Planner, Premium Features
// ═══════════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import {
  X,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Crown,
  Zap,
  Shield,
  Star,
  ArrowRight,
  Receipt,
  History,
  XCircle,
  RefreshCw,
  Lock,
  Unlock,
  BookOpen,
  Target,
  Calendar,
  Download,
  Brain,
  Trophy,
  Gift,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';
import {
  SUBSCRIPTION_PLANS,
  PAYMENT_PROVIDERS,
  type PlanId,
  type PaymentProvider,
  type SubscriptionPlan,
  type SimulatedPaymentResult,
  processPayment,
  getCurrentPlan,
  getCurrentPlanId,
  getActiveSubscription,
  cancelSubscription,
  getTransactionHistory,
  getReceipts,
  isPremiumUser,
  type PaymentTransaction,
  type PaymentReceipt,
} from '../../utils/paymentService';
import { getStoredAuthSession } from '../../utils/authService';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface PaymentSandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewMode = 'plans' | 'checkout' | 'success' | 'history' | 'receipt';

// ─── Plan Card ───────────────────────────────────────────────────────────────
const PlanCard: React.FC<{
  plan: SubscriptionPlan;
  isActive: boolean;
  isCurrent: boolean;
  onSelect: (plan: SubscriptionPlan) => void;
}> = ({ plan, isActive, isCurrent, onSelect }) => {
  const isPopular = plan.id === 'pro';

  return (
    <div
      className={`relative flex flex-col rounded-2xl border-2 p-5 transition-all duration-300 cursor-pointer group
        ${isCurrent
          ? 'border-green-500/60 bg-green-950/20 ring-2 ring-green-500/20'
          : isPopular
            ? 'border-amber-400/60 bg-gradient-to-br from-amber-950/30 to-orange-950/20 ring-2 ring-amber-400/20 hover:ring-amber-400/40'
            : 'border-slate-700/60 bg-slate-900/40 hover:border-slate-500/60 hover:bg-slate-800/40'
        }
      `}
      onClick={() => !isCurrent && onSelect(plan)}
    >
      {/* Popular Badge */}
      {isPopular && !isCurrent && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[10px] font-black tracking-widest rounded-full uppercase shadow-lg">
          ⭐ Most Popular
        </div>
      )}

      {/* Current Plan Badge */}
      {isCurrent && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-black text-[10px] font-black tracking-widest rounded-full uppercase shadow-lg">
          ✓ Current Plan
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{plan.badge}</span>
        <div>
          <h3 className="font-black text-white text-base">{plan.name}</h3>
          <div className="flex items-baseline gap-1">
            {plan.priceINR > 0 ? (
              <>
                <span className="text-2xl font-black" style={{ color: plan.color }}>
                  ₹{plan.priceINR}
                </span>
                <span className="text-xs text-slate-400">/{plan.period}</span>
                <span className="text-xs text-slate-500 ml-1">(${plan.priceUSD})</span>
              </>
            ) : (
              <span className="text-2xl font-black text-slate-400">Free</span>
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-1.5 flex-1 mb-4">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Access Badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {plan.lecturesUnlocked === 'all' && (
          <span className="px-2 py-0.5 bg-blue-500/15 text-blue-400 text-[10px] font-bold rounded-full border border-blue-500/20">
            <BookOpen className="w-2.5 h-2.5 inline mr-0.5" /> All Lectures
          </span>
        )}
        {plan.potdAccess && (
          <span className="px-2 py-0.5 bg-purple-500/15 text-purple-400 text-[10px] font-bold rounded-full border border-purple-500/20">
            <Target className="w-2.5 h-2.5 inline mr-0.5" /> POTD
          </span>
        )}
        {plan.plannerAccess && (
          <span className="px-2 py-0.5 bg-green-500/15 text-green-400 text-[10px] font-bold rounded-full border border-green-500/20">
            <Calendar className="w-2.5 h-2.5 inline mr-0.5" /> Planner
          </span>
        )}
        {plan.premiumContent && (
          <span className="px-2 py-0.5 bg-amber-500/15 text-amber-400 text-[10px] font-bold rounded-full border border-amber-500/20">
            <Crown className="w-2.5 h-2.5 inline mr-0.5" /> Premium
          </span>
        )}
      </div>

      {/* CTA Button */}
      {!isCurrent && (
        <button
          className="w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2
            group-hover:scale-[1.02] active:scale-95"
          style={{
            backgroundColor: plan.color + '20',
            color: plan.color,
            border: `1.5px solid ${plan.color}50`,
          }}
        >
          {plan.priceINR > 0 ? (
            <>
              <CreditCard className="w-4 h-4" />
              Upgrade Now
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <Gift className="w-4 h-4" />
              Current Free Tier
            </>
          )}
        </button>
      )}
    </div>
  );
};

// ─── Checkout Panel ──────────────────────────────────────────────────────────
const CheckoutPanel: React.FC<{
  plan: SubscriptionPlan;
  onBack: () => void;
  onSuccess: (result: SimulatedPaymentResult) => void;
}> = ({ plan, onBack, onSuccess }) => {
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>('razorpay');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'provider' | 'confirm' | 'processing'>('provider');
  const session = getStoredAuthSession();

  const handlePay = async () => {
    setProcessing(true);
    setError(null);
    setStep('processing');
    sound.playPop();

    try {
      const result = await processPayment(plan.id, selectedProvider, session?.user.email);

      if (result.success) {
        sound.playSuccess();
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#3B82F6', '#8B5CF6', '#10B981'],
        });
        onSuccess(result);
      } else {
        setError(result.error ?? 'Payment failed');
        setStep('confirm');
        sound.playError();
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setStep('confirm');
      sound.playError();
    } finally {
      setProcessing(false);
    }
  };

  const providerConfig = PAYMENT_PROVIDERS.find((p) => p.provider === selectedProvider)!;
  const displayPrice = selectedProvider === 'razorpay'
    ? `₹${plan.priceINR}`
    : `$${plan.priceUSD}`;

  return (
    <div className="space-y-5">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        ← Back to Plans
      </button>

      {/* Selected Plan Summary */}
      <div className="p-4 rounded-xl border border-slate-700/60 bg-slate-800/40">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{plan.badge}</span>
          <div>
            <h3 className="font-black text-white">{plan.name}</h3>
            <p className="text-xs text-slate-400">
              {plan.features.length} features • {plan.period}ly billing
            </p>
          </div>
          <div className="ml-auto text-right">
            <div className="text-xl font-black" style={{ color: plan.color }}>
              ₹{plan.priceINR}
            </div>
            <div className="text-[10px] text-slate-500">${plan.priceUSD} USD</div>
          </div>
        </div>
      </div>

      {/* Provider Selection */}
      <div>
        <h4 className="text-sm font-bold text-white mb-3">Choose Payment Method</h4>
        <div className="grid grid-cols-3 gap-3">
          {PAYMENT_PROVIDERS.map((prov) => (
            <button
              key={prov.provider}
              onClick={() => { setSelectedProvider(prov.provider); sound.playPop(); }}
              className={`p-3 rounded-xl border-2 transition-all duration-200 text-center
                ${selectedProvider === prov.provider
                  ? 'border-blue-400/60 bg-blue-950/30 ring-2 ring-blue-400/20'
                  : 'border-slate-700/40 bg-slate-900/30 hover:border-slate-500/60'
                }
              `}
            >
              <span className="text-2xl block mb-1">{prov.icon}</span>
              <span className="text-xs font-bold text-white block">{prov.label}</span>
              <span className="text-[10px] text-slate-400">{prov.currency}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sandbox Notice */}
      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2">
        <Shield className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-amber-200">
          <strong>🔒 Sandbox Mode</strong> — No real money is charged. This is a simulated demo checkout using{' '}
          <span className="font-mono text-amber-400">{providerConfig.label} Test Keys</span>.
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
          <span className="text-xs text-red-300">{error}</span>
        </div>
      )}

      {/* Pay Button */}
      <button
        onClick={handlePay}
        disabled={processing}
        className="w-full py-3.5 rounded-xl font-black text-sm transition-all duration-200 flex items-center justify-center gap-2
          bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500
          disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-blue-500/20"
      >
        {processing ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            Processing via {providerConfig.label}...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4" />
            Pay {displayPrice} with {providerConfig.label}
            <ArrowRight className="w-3.5 h-3.5" />
          </>
        )}
      </button>

      {/* Test Card Info */}
      <div className="text-center">
        <p className="text-[10px] text-slate-500">
          {selectedProvider === 'razorpay' && 'Test Card: 4111 1111 1111 1111 • Expiry: Any Future • CVV: Any 3 digits'}
          {selectedProvider === 'paypal' && 'Sandbox: sb-buyer@business.example.com • Pass: sandbox123'}
          {selectedProvider === 'stripe' && 'Test Card: 4242 4242 4242 4242 • Expiry: Any Future • CVC: Any 3 digits'}
        </p>
      </div>
    </div>
  );
};

// ─── Success Screen ──────────────────────────────────────────────────────────
const SuccessScreen: React.FC<{
  result: SimulatedPaymentResult;
  onDone: () => void;
}> = ({ result, onDone }) => {
  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === result.transaction.plan)!;

  return (
    <div className="text-center space-y-5 py-4">
      {/* Big Check */}
      <div className="relative mx-auto w-20 h-20">
        <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-black text-white mb-1">Payment Successful! 🎉</h2>
        <p className="text-sm text-slate-400">Your {plan.name} plan is now active</p>
      </div>

      {/* Receipt Card */}
      {result.receipt && (
        <div className="p-4 rounded-xl border border-green-500/30 bg-green-950/20 text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-green-400">
            <Receipt className="w-3.5 h-3.5" />
            SANDBOX RECEIPT
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-500">Transaction ID</span>
              <p className="text-white font-mono text-[11px]">{result.transaction.id}</p>
            </div>
            <div>
              <span className="text-slate-500">Order ID</span>
              <p className="text-white font-mono text-[11px]">{result.transaction.orderId}</p>
            </div>
            <div>
              <span className="text-slate-500">Amount</span>
              <p className="text-white font-bold">
                {result.transaction.currency === 'INR' ? '₹' : '$'}
                {result.transaction.amount}
              </p>
            </div>
            <div>
              <span className="text-slate-500">Provider</span>
              <p className="text-white capitalize">{result.transaction.provider}</p>
            </div>
            <div>
              <span className="text-slate-500">Valid Until</span>
              <p className="text-white">{new Date(result.receipt.validUntil).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-slate-500">Mode</span>
              <p className="text-amber-400 font-bold">🔒 SANDBOX</p>
            </div>
          </div>
        </div>
      )}

      {/* Features Unlocked */}
      <div className="p-4 rounded-xl border border-slate-700/40 bg-slate-800/30 text-left">
        <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
          <Unlock className="w-3.5 h-3.5 text-amber-400" />
          Features Now Unlocked
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {plan.features.map((f, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[11px] text-green-400">
              <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onDone}
        className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-green-600 to-emerald-600
          hover:from-green-500 hover:to-emerald-500 text-white transition-all active:scale-95"
      >
        <Sparkles className="w-4 h-4 inline mr-1" />
        Start Exploring Premium Features
      </button>
    </div>
  );
};

// ─── Transaction History ─────────────────────────────────────────────────────
const TransactionHistoryPanel: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const transactions = getTransactionHistory();
  const receipts = getReceipts();

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        ← Back to Plans
      </button>

      <h3 className="text-base font-black text-white flex items-center gap-2">
        <History className="w-4 h-4 text-blue-400" />
        Transaction History
        <span className="text-[10px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded-full">
          SANDBOX
        </span>
      </h3>

      {transactions.length === 0 ? (
        <div className="text-center py-8">
          <CreditCard className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <p className="text-sm text-slate-500">No transactions yet</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-3 rounded-xl border border-slate-700/40 bg-slate-800/30 flex items-center gap-3"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold
                  ${tx.status === 'success' ? 'bg-green-600' : tx.status === 'failed' ? 'bg-red-600' : 'bg-amber-600'}
                `}
              >
                {tx.status === 'success' ? '✓' : tx.status === 'failed' ? '✗' : '…'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white capitalize">{tx.provider}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold
                    ${tx.status === 'success' ? 'bg-green-500/15 text-green-400' : tx.status === 'failed' ? 'bg-red-500/15 text-red-400' : 'bg-amber-500/15 text-amber-400'}
                  `}>
                    {tx.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono truncate">{tx.id}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-white">
                  {tx.currency === 'INR' ? '₹' : '$'}{tx.amount}
                </div>
                <div className="text-[10px] text-slate-500">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Main Payment Sandbox Modal ──────────────────────────────────────────────
export const PaymentSandboxModal: React.FC<PaymentSandboxModalProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<ViewMode>('plans');
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [paymentResult, setPaymentResult] = useState<SimulatedPaymentResult | null>(null);
  const [currentPlanId, setCurrentPlanId] = useState<PlanId>(getCurrentPlanId());
  const activeSub = getActiveSubscription();

  // Reset view when opened
  useEffect(() => {
    if (isOpen) {
      setView('plans');
      setSelectedPlan(null);
      setPaymentResult(null);
      setCurrentPlanId(getCurrentPlanId());
      sound.playPop();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    if (plan.id === 'free') return;
    setSelectedPlan(plan);
    setView('checkout');
    sound.playPop();
  };

  const handlePaymentSuccess = (result: SimulatedPaymentResult) => {
    setPaymentResult(result);
    setView('success');
    setCurrentPlanId(getCurrentPlanId());
  };

  const handleCancel = () => {
    cancelSubscription();
    setCurrentPlanId('free');
    sound.playPop();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700/60
          bg-gradient-to-br from-[#0F1629] via-[#0D1117] to-[#131B2E] shadow-2xl shadow-black/50
          scrollbar-thin scrollbar-thumb-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 px-6 py-4 border-b border-slate-800/60 bg-[#0D1117]/95 backdrop-blur-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">
                Payment Sandbox
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  🔒 SANDBOX MODE
                </span>
                {activeSub && (
                  <span className="text-[10px] text-green-400 font-mono bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                    ✓ {SUBSCRIPTION_PLANS.find(p => p.id === currentPlanId)?.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* History Button */}
            <button
              onClick={() => setView(view === 'history' ? 'plans' : 'history')}
              className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
              title="Transaction History"
            >
              <History className="w-4 h-4" />
            </button>
            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Active Subscription Banner */}
          {activeSub && view === 'plans' && (
            <div className="mb-5 p-4 rounded-xl border border-green-500/30 bg-green-950/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Active: {SUBSCRIPTION_PLANS.find(p => p.id === currentPlanId)?.name}{' '}
                    {SUBSCRIPTION_PLANS.find(p => p.id === currentPlanId)?.badge}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    via {activeSub.provider} • Expires {new Date(activeSub.expiresAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCancel}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/30
                  hover:bg-red-500/20 transition-colors"
              >
                <XCircle className="w-3 h-3 inline mr-1" />
                Cancel
              </button>
            </div>
          )}

          {/* Plans Grid */}
          {view === 'plans' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SUBSCRIPTION_PLANS.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  isActive={false}
                  isCurrent={plan.id === currentPlanId}
                  onSelect={handleSelectPlan}
                />
              ))}
            </div>
          )}

          {/* Checkout */}
          {view === 'checkout' && selectedPlan && (
            <CheckoutPanel
              plan={selectedPlan}
              onBack={() => setView('plans')}
              onSuccess={handlePaymentSuccess}
            />
          )}

          {/* Success */}
          {view === 'success' && paymentResult && (
            <SuccessScreen
              result={paymentResult}
              onDone={onClose}
            />
          )}

          {/* History */}
          {view === 'history' && (
            <TransactionHistoryPanel onBack={() => setView('plans')} />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800/40 bg-slate-900/30 text-center">
          <p className="text-[10px] text-slate-500">
            💡 This is a <strong className="text-amber-400">payment sandbox demo</strong>. No real transactions are processed.
            All providers use test/sandbox credentials. Data is stored in localStorage.
          </p>
        </div>
      </div>
    </div>
  );
};
