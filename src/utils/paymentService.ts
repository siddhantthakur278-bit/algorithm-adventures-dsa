// ═══════════════════════════════════════════════════════════════════════════════
// 💳 ADA HUB — Universal Payment Sandbox Engine
// ═══════════════════════════════════════════════════════════════════════════════
// Supports: Razorpay (INR) • PayPal (USD) • Stripe (USD/INR)
// Mode: SANDBOX ONLY — no real transactions ever processed
// Features gated: Lectures, POTD, Planner, Premium Content
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Subscription Plans ──────────────────────────────────────────────────────
export type PlanId = 'free' | 'starter' | 'pro' | 'elite';

export interface SubscriptionPlan {
  id: PlanId;
  name: string;
  priceINR: number;
  priceUSD: number;
  period: 'month' | 'year' | 'lifetime';
  badge: string;
  color: string;
  features: string[];
  lecturesUnlocked: 'basic' | 'all';
  potdAccess: boolean;
  plannerAccess: boolean;
  premiumContent: boolean;
  maxDownloads: number;
  aiMentorMinutes: number;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free Explorer',
    priceINR: 0,
    priceUSD: 0,
    period: 'month',
    badge: '🆓',
    color: '#94A3B8',
    features: [
      '5 Basic DSA Lectures',
      'Daily POTD (1 problem/day)',
      'Basic Planner',
      'Community Chat',
      'Leaderboard Access',
    ],
    lecturesUnlocked: 'basic',
    potdAccess: true,
    plannerAccess: true,
    premiumContent: false,
    maxDownloads: 0,
    aiMentorMinutes: 5,
  },
  {
    id: 'starter',
    name: 'Starter Pack',
    priceINR: 199,
    priceUSD: 2.99,
    period: 'month',
    badge: '⚡',
    color: '#38BDF8',
    features: [
      'All DSA + SQL Lectures',
      'Unlimited POTD',
      'Full Planner + Calendar',
      'Speed Blitz Arena',
      'Flashcard Deck',
      '15 AI Mentor Minutes/day',
    ],
    lecturesUnlocked: 'all',
    potdAccess: true,
    plannerAccess: true,
    premiumContent: false,
    maxDownloads: 10,
    aiMentorMinutes: 15,
  },
  {
    id: 'pro',
    name: 'Pro Warrior',
    priceINR: 499,
    priceUSD: 5.99,
    period: 'month',
    badge: '🔥',
    color: '#F59E0B',
    features: [
      'Everything in Starter',
      'All Saga Lectures (Calculus, Linear Algebra, Prisma, Web Dev)',
      'Premium Interview Room',
      'Code Duel Arena',
      'High-Tech Lab',
      'Unlimited AI Mentor',
      'Certificate of Completion',
    ],
    lecturesUnlocked: 'all',
    potdAccess: true,
    plannerAccess: true,
    premiumContent: true,
    maxDownloads: 50,
    aiMentorMinutes: 999,
  },
  {
    id: 'elite',
    name: 'Elite Legend',
    priceINR: 999,
    priceUSD: 11.99,
    period: 'month',
    badge: '👑',
    color: '#A78BFA',
    features: [
      'Everything in Pro',
      'Lifetime Access to All Content',
      'Exclusive Boss Battles',
      'Priority Leaderboard Placement',
      'Custom Themes & Badges',
      'Offline Downloads',
      '1-on-1 Mentor Sessions',
      'Early Access to New Modules',
    ],
    lecturesUnlocked: 'all',
    potdAccess: true,
    plannerAccess: true,
    premiumContent: true,
    maxDownloads: 999,
    aiMentorMinutes: 999,
  },
];

// ─── Payment Providers ───────────────────────────────────────────────────────
export type PaymentProvider = 'razorpay' | 'paypal' | 'stripe';

export interface PaymentConfig {
  provider: PaymentProvider;
  label: string;
  currency: string;
  icon: string;
  sandboxKeyId: string;
  color: string;
}

export const PAYMENT_PROVIDERS: PaymentConfig[] = [
  {
    provider: 'razorpay',
    label: 'Razorpay',
    currency: 'INR',
    icon: '🏦',
    sandboxKeyId: 'rzp_test_sandbox_demo_key',
    color: '#3395FF',
  },
  {
    provider: 'paypal',
    label: 'PayPal',
    currency: 'USD',
    icon: '🅿️',
    sandboxKeyId: 'sb-sandbox-demo-paypal-client-id',
    color: '#003087',
  },
  {
    provider: 'stripe',
    label: 'Stripe',
    currency: 'USD',
    icon: '💳',
    sandboxKeyId: 'pk_test_sandbox_demo_stripe_key',
    color: '#635BFF',
  },
];

// ─── Transaction & Receipt Types ─────────────────────────────────────────────
export type TransactionStatus = 'pending' | 'processing' | 'success' | 'failed' | 'refunded';

export interface PaymentTransaction {
  id: string;
  orderId: string;
  provider: PaymentProvider;
  plan: PlanId;
  amount: number;
  currency: string;
  status: TransactionStatus;
  createdAt: string;
  completedAt?: string;
  receiptUrl?: string;
  sandboxMode: boolean;
  userEmail?: string;
  metadata?: Record<string, string>;
}

export interface PaymentReceipt {
  transactionId: string;
  orderId: string;
  provider: PaymentProvider;
  plan: SubscriptionPlan;
  amount: number;
  currency: string;
  paidAt: string;
  validUntil: string;
  sandbox: true;
}

// ─── Local Storage Keys ──────────────────────────────────────────────────────
const STORAGE_KEY_SUBSCRIPTION = 'ada_active_subscription';
const STORAGE_KEY_TRANSACTIONS = 'ada_payment_transactions';
const STORAGE_KEY_RECEIPTS = 'ada_payment_receipts';

// ─── Subscription State Management ──────────────────────────────────────────
export interface ActiveSubscription {
  plan: PlanId;
  startedAt: string;
  expiresAt: string;
  provider: PaymentProvider;
  autoRenew: boolean;
  transactionId: string;
  sandbox: true;
}

export function getActiveSubscription(): ActiveSubscription | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SUBSCRIPTION);
    if (!raw) return null;
    const sub: ActiveSubscription = JSON.parse(raw);
    // Check if expired
    if (new Date(sub.expiresAt) < new Date()) {
      localStorage.removeItem(STORAGE_KEY_SUBSCRIPTION);
      return null;
    }
    return sub;
  } catch {
    return null;
  }
}

export function getCurrentPlanId(): PlanId {
  const sub = getActiveSubscription();
  return sub?.plan ?? 'free';
}

export function getCurrentPlan(): SubscriptionPlan {
  const planId = getCurrentPlanId();
  return SUBSCRIPTION_PLANS.find((p) => p.id === planId) ?? SUBSCRIPTION_PLANS[0];
}

export function isPremiumUser(): boolean {
  const plan = getCurrentPlanId();
  return plan !== 'free';
}

export function hasFeatureAccess(feature: 'lectures' | 'potd' | 'planner' | 'premium' | 'interview' | 'duel' | 'hightech'): boolean {
  const plan = getCurrentPlan();
  switch (feature) {
    case 'lectures':
      return plan.lecturesUnlocked === 'all';
    case 'potd':
      return plan.potdAccess;
    case 'planner':
      return plan.plannerAccess;
    case 'premium':
      return plan.premiumContent;
    case 'interview':
      return plan.id === 'pro' || plan.id === 'elite';
    case 'duel':
      return plan.id === 'pro' || plan.id === 'elite';
    case 'hightech':
      return plan.id === 'pro' || plan.id === 'elite';
    default:
      return false;
  }
}

// ─── Activate Subscription (after successful sandbox payment) ────────────────
export function activateSubscription(
  planId: PlanId,
  provider: PaymentProvider,
  transactionId: string
): ActiveSubscription {
  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId) ?? SUBSCRIPTION_PLANS[0];
  const now = new Date();
  const expiry = new Date(now);

  if (plan.period === 'month') expiry.setMonth(expiry.getMonth() + 1);
  else if (plan.period === 'year') expiry.setFullYear(expiry.getFullYear() + 1);
  else expiry.setFullYear(expiry.getFullYear() + 100); // lifetime

  const sub: ActiveSubscription = {
    plan: planId,
    startedAt: now.toISOString(),
    expiresAt: expiry.toISOString(),
    provider,
    autoRenew: plan.period !== 'lifetime',
    transactionId,
    sandbox: true,
  };

  localStorage.setItem(STORAGE_KEY_SUBSCRIPTION, JSON.stringify(sub));
  return sub;
}

export function cancelSubscription(): void {
  localStorage.removeItem(STORAGE_KEY_SUBSCRIPTION);
}

// ─── Transaction History ─────────────────────────────────────────────────────
export function getTransactionHistory(): PaymentTransaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTransaction(tx: PaymentTransaction): void {
  const history = getTransactionHistory();
  history.unshift(tx);
  localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(history.slice(0, 50)));
}

// ─── Receipt Management ──────────────────────────────────────────────────────
export function getReceipts(): PaymentReceipt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RECEIPTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveReceipt(receipt: PaymentReceipt): void {
  const receipts = getReceipts();
  receipts.unshift(receipt);
  localStorage.setItem(STORAGE_KEY_RECEIPTS, JSON.stringify(receipts.slice(0, 50)));
}

// ─── UUID Generator ──────────────────────────────────────────────────────────
function generateId(prefix: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = prefix + '_';
  for (let i = 0; i < 20; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

// ─── Sandbox Payment Simulation Engine ───────────────────────────────────────
// This simulates the full payment flow without any real API calls.
// In production, these would call your server-side endpoints.

export interface SimulatedPaymentResult {
  success: boolean;
  transaction: PaymentTransaction;
  receipt?: PaymentReceipt;
  subscription?: ActiveSubscription;
  error?: string;
}

/**
 * Simulate a Razorpay checkout flow (sandbox mode)
 */
export async function simulateRazorpayPayment(
  planId: PlanId,
  email?: string
): Promise<SimulatedPaymentResult> {
  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId);
  if (!plan) throw new Error('Invalid plan');

  const txId = generateId('txn_rzp');
  const orderId = generateId('order_rzp');

  const tx: PaymentTransaction = {
    id: txId,
    orderId,
    provider: 'razorpay',
    plan: planId,
    amount: plan.priceINR,
    currency: 'INR',
    status: 'processing',
    createdAt: new Date().toISOString(),
    sandboxMode: true,
    userEmail: email,
    metadata: { gateway: 'Razorpay Test', method: 'UPI/Card (Sandbox)' },
  };

  saveTransaction(tx);

  // Simulate network delay (1–2 seconds)
  await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));

  // 95% success rate in sandbox
  const success = Math.random() < 0.95;

  if (success) {
    tx.status = 'success';
    tx.completedAt = new Date().toISOString();
    tx.receiptUrl = `https://sandbox.razorpay.com/receipts/${txId}`;

    const now = new Date();
    const expiry = new Date(now);
    if (plan.period === 'month') expiry.setMonth(expiry.getMonth() + 1);
    else if (plan.period === 'year') expiry.setFullYear(expiry.getFullYear() + 1);
    else expiry.setFullYear(expiry.getFullYear() + 100);

    const receipt: PaymentReceipt = {
      transactionId: txId,
      orderId,
      provider: 'razorpay',
      plan,
      amount: plan.priceINR,
      currency: 'INR',
      paidAt: tx.completedAt,
      validUntil: expiry.toISOString(),
      sandbox: true,
    };

    saveTransaction(tx);
    saveReceipt(receipt);
    const sub = activateSubscription(planId, 'razorpay', txId);

    return { success: true, transaction: tx, receipt, subscription: sub };
  } else {
    tx.status = 'failed';
    tx.completedAt = new Date().toISOString();
    saveTransaction(tx);
    return { success: false, transaction: tx, error: 'Payment declined by sandbox gateway (simulated failure)' };
  }
}

/**
 * Simulate a PayPal checkout flow (sandbox mode)
 */
export async function simulatePayPalPayment(
  planId: PlanId,
  email?: string
): Promise<SimulatedPaymentResult> {
  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId);
  if (!plan) throw new Error('Invalid plan');

  const txId = generateId('txn_pp');
  const orderId = generateId('order_pp');

  const tx: PaymentTransaction = {
    id: txId,
    orderId,
    provider: 'paypal',
    plan: planId,
    amount: plan.priceUSD,
    currency: 'USD',
    status: 'processing',
    createdAt: new Date().toISOString(),
    sandboxMode: true,
    userEmail: email,
    metadata: { gateway: 'PayPal Sandbox', method: 'PayPal Balance (Sandbox)' },
  };

  saveTransaction(tx);
  await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

  const success = Math.random() < 0.95;

  if (success) {
    tx.status = 'success';
    tx.completedAt = new Date().toISOString();
    tx.receiptUrl = `https://sandbox.paypal.com/receipts/${txId}`;

    const now = new Date();
    const expiry = new Date(now);
    if (plan.period === 'month') expiry.setMonth(expiry.getMonth() + 1);
    else if (plan.period === 'year') expiry.setFullYear(expiry.getFullYear() + 1);
    else expiry.setFullYear(expiry.getFullYear() + 100);

    const receipt: PaymentReceipt = {
      transactionId: txId,
      orderId,
      provider: 'paypal',
      plan,
      amount: plan.priceUSD,
      currency: 'USD',
      paidAt: tx.completedAt,
      validUntil: expiry.toISOString(),
      sandbox: true,
    };

    saveTransaction(tx);
    saveReceipt(receipt);
    const sub = activateSubscription(planId, 'paypal', txId);

    return { success: true, transaction: tx, receipt, subscription: sub };
  } else {
    tx.status = 'failed';
    tx.completedAt = new Date().toISOString();
    saveTransaction(tx);
    return { success: false, transaction: tx, error: 'PayPal sandbox transaction declined (simulated failure)' };
  }
}

/**
 * Simulate a Stripe checkout flow (sandbox mode)
 */
export async function simulateStripePayment(
  planId: PlanId,
  email?: string
): Promise<SimulatedPaymentResult> {
  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId);
  if (!plan) throw new Error('Invalid plan');

  const txId = generateId('txn_str');
  const orderId = generateId('pi_str');

  const tx: PaymentTransaction = {
    id: txId,
    orderId,
    provider: 'stripe',
    plan: planId,
    amount: plan.priceUSD,
    currency: 'USD',
    status: 'processing',
    createdAt: new Date().toISOString(),
    sandboxMode: true,
    userEmail: email,
    metadata: { gateway: 'Stripe Test', method: 'Card 4242 (Sandbox)' },
  };

  saveTransaction(tx);
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));

  const success = Math.random() < 0.95;

  if (success) {
    tx.status = 'success';
    tx.completedAt = new Date().toISOString();
    tx.receiptUrl = `https://dashboard.stripe.com/test/payments/${txId}`;

    const now = new Date();
    const expiry = new Date(now);
    if (plan.period === 'month') expiry.setMonth(expiry.getMonth() + 1);
    else if (plan.period === 'year') expiry.setFullYear(expiry.getFullYear() + 1);
    else expiry.setFullYear(expiry.getFullYear() + 100);

    const receipt: PaymentReceipt = {
      transactionId: txId,
      orderId,
      provider: 'stripe',
      plan,
      amount: plan.priceUSD,
      currency: 'USD',
      paidAt: tx.completedAt,
      validUntil: expiry.toISOString(),
      sandbox: true,
    };

    saveTransaction(tx);
    saveReceipt(receipt);
    const sub = activateSubscription(planId, 'stripe', txId);

    return { success: true, transaction: tx, receipt, subscription: sub };
  } else {
    tx.status = 'failed';
    tx.completedAt = new Date().toISOString();
    saveTransaction(tx);
    return { success: false, transaction: tx, error: 'Stripe test card declined (simulated failure)' };
  }
}

/**
 * Universal payment dispatcher — picks the right simulator by provider
 */
export async function processPayment(
  planId: PlanId,
  provider: PaymentProvider,
  email?: string
): Promise<SimulatedPaymentResult> {
  switch (provider) {
    case 'razorpay':
      return simulateRazorpayPayment(planId, email);
    case 'paypal':
      return simulatePayPalPayment(planId, email);
    case 'stripe':
      return simulateStripePayment(planId, email);
    default:
      throw new Error(`Unsupported payment provider: ${provider}`);
  }
}
