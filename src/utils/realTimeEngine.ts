// Real-Time Engine: High-Precision Heartbeat, Live Telemetry Stream, Focus Stopwatch, and Multi-Curriculum Clocks

export interface RealTimeTelemetryEvent {
  id: string;
  timestamp: Date;
  user: string;
  avatar: string;
  action: string;
  detail: string;
  tag: 'github' | 'codeforces' | 'potd' | 'bugsy' | 'streak' | 'prisma' | 'linalg';
}

export interface LiveCountdown {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
  totalSeconds: number;
}

export interface RealTimeEngineState {
  now: Date;
  pingMs: number;
  isWasmOnline: boolean;
  codingSecondsToday: number;
  isCodingActive: boolean;
  activeApm: number;
  potdCountdown: LiveCountdown;
  midnightCountdown: LiveCountdown;
  recentEvents: RealTimeTelemetryEvent[];
}

type Listener = (state: RealTimeEngineState) => void;

class RealTimeEngine {
  private listeners: Set<Listener> = new Set();
  private timerId: number | null = null;
  private codingTimerId: number | null = null;

  private pingMs: number = 14;
  private isWasmOnline: boolean = true;
  private codingSecondsToday: number = 0;
  private isCodingActive: boolean = false;
  private keystrokeCount: number = 0;
  private activeApm: number = 0;
  private lastApmCheck: number = Date.now();

  private recentEvents: RealTimeTelemetryEvent[] = [
    {
      id: 'ev-1',
      timestamp: new Date(Date.now() - 4000),
      user: 'Byte (AI Mentor)',
      avatar: '🤖',
      action: 'Direct Git Commit',
      detail: 'Pushed solutions/ch2_arrays/two_sum.py [O(N)] to GitHub',
      tag: 'github',
    },
    {
      id: 'ev-2',
      timestamp: new Date(Date.now() - 15000),
      user: 'siddhantthakur278',
      avatar: '⚡',
      action: 'Codeforces Rank Sync',
      detail: 'Solved Problem 1982A • Rating +42 Δ',
      tag: 'codeforces',
    },
    {
      id: 'ev-3',
      timestamp: new Date(Date.now() - 32000),
      user: 'Bugsy the Glitch',
      avatar: '👾',
      action: 'Exploit Thwarted',
      detail: 'Attempted to inject IndexError in Chapter 4 — Syntax Shield blocked!',
      tag: 'bugsy',
    },
    {
      id: 'ev-4',
      timestamp: new Date(Date.now() - 58000),
      user: 'Pri (Prisma Lead)',
      avatar: '🛡️',
      action: 'Prisma Client v7',
      detail: 'Executed guarded inventory decrement transaction in 1 statement',
      tag: 'prisma',
    },
  ];

  constructor() {
    this.loadPersistedState();
    this.startHeartbeat();
  }

  private loadPersistedState() {
    if (typeof window === 'undefined') return;
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const savedDate = localStorage.getItem('ada_coding_date');
      if (savedDate === todayStr) {
        this.codingSecondsToday = Number(localStorage.getItem('ada_coding_seconds')) || 0;
      } else {
        this.codingSecondsToday = 0;
        localStorage.setItem('ada_coding_date', todayStr);
      }
    } catch {}
  }

  private saveState() {
    if (typeof window === 'undefined') return;
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      localStorage.setItem('ada_coding_date', todayStr);
      localStorage.setItem('ada_coding_seconds', String(this.codingSecondsToday));
    } catch {}
  }

  private startHeartbeat() {
    if (typeof window === 'undefined') return;
    if (this.timerId !== null) return;

    this.timerId = window.setInterval(() => {
      this.tick();
    }, 1000);

    // Track simulated ping jitter (11ms - 19ms)
    window.setInterval(() => {
      this.pingMs = 11 + Math.floor(Math.random() * 8);
    }, 5000);

    // Telemetry Generator (every 18 - 35s)
    this.scheduleNextTelemetry();
  }

  private scheduleNextTelemetry() {
    if (typeof window === 'undefined') return;
    const delay = 16000 + Math.random() * 18000;
    window.setTimeout(() => {
      this.generateMultiverseEvent();
      this.scheduleNextTelemetry();
    }, delay);
  }

  private generateMultiverseEvent() {
    const pool: Omit<RealTimeTelemetryEvent, 'id' | 'timestamp'>[] = [
      {
        user: 'Byte (AI Partner)',
        avatar: '🤖',
        action: 'Wasm Compilation',
        detail: 'Executed Pyodide CPython 3.12 WebAssembly test suite in 4ms',
        tag: 'potd',
      },
      {
        user: 'tourist (Grandmaster)',
        avatar: '🏆',
        action: 'Codeforces Submission',
        detail: 'Accepted on Problem 1985F (Segment Trees & Binary Lifting)',
        tag: 'codeforces',
      },
      {
        user: 'siddhantkthakur',
        avatar: '🚀',
        action: 'LeetCode Milestone',
        detail: 'Verified O(1) space solution for Valid Parentheses barrier',
        tag: 'potd',
      },
      {
        user: 'Professor Algorismus',
        avatar: '🧙‍♂️',
        action: '5:00 AM POTD Vault',
        detail: 'Prepared Two Sum Saga & Dynamic Quota calculations for Day 1',
        tag: 'potd',
      },
      {
        user: 'Sid the Hero',
        avatar: '🔥',
        action: 'Streak Flame Secured',
        detail: 'Unbroken attendance record verified across local timestamps',
        tag: 'streak',
      },
      {
        user: 'Gauss-Bot',
        avatar: '📐',
        action: 'Matrix Transformation',
        detail: 'Rendered 3D Eigenvector determinant mapping in Vector Studio',
        tag: 'linalg',
      },
    ];

    const pick = pool[Math.floor(Math.random() * pool.length)];
    const newEvent: RealTimeTelemetryEvent = {
      id: `ev-${Date.now()}`,
      timestamp: new Date(),
      ...pick,
    };

    this.recentEvents = [newEvent, ...this.recentEvents.slice(0, 19)];
    this.notify();
  }

  private calculateCountdown(target: Date, now: Date): LiveCountdown {
    const ms = Math.max(0, target.getTime() - now.getTime());
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const formatted = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return { hours, minutes, seconds, formatted, totalSeconds };
  }

  public recordKeystroke() {
    this.keystrokeCount++;
    this.isCodingActive = true;

    // Reset inactivity timer after 4 seconds of no typing
    if (this.codingTimerId) window.clearTimeout(this.codingTimerId);
    this.codingTimerId = window.setTimeout(() => {
      this.isCodingActive = false;
    }, 4000);
  }

  private tick() {
    const now = new Date();

    if (this.isCodingActive) {
      this.codingSecondsToday++;
      if (this.codingSecondsToday % 30 === 0) {
        this.saveState();
      }
    }

    // Calculate APM every 5 seconds
    const elapsedMinutes = (Date.now() - this.lastApmCheck) / 60000;
    if (elapsedMinutes >= 0.08) {
      this.activeApm = Math.round(this.keystrokeCount / elapsedMinutes);
      this.keystrokeCount = 0;
      this.lastApmCheck = Date.now();
    }

    this.notify();
  }

  public getState(referenceDate?: Date): RealTimeEngineState {
    const now = referenceDate || new Date();

    // 5:00 AM POTD Target: Tomorrow 05:00:00 AM if after 5 AM today
    const potdTarget = new Date(now);
    if (now.getHours() >= 5) {
      potdTarget.setDate(potdTarget.getDate() + 1);
    }
    potdTarget.setHours(5, 0, 0, 0);

    // Midnight Target: 23:59:59.999
    const midnightTarget = new Date(now);
    midnightTarget.setHours(24, 0, 0, 0);

    return {
      now,
      pingMs: this.pingMs,
      isWasmOnline: this.isWasmOnline,
      codingSecondsToday: this.codingSecondsToday,
      isCodingActive: this.isCodingActive,
      activeApm: this.activeApm,
      potdCountdown: this.calculateCountdown(potdTarget, now),
      midnightCountdown: this.calculateCountdown(midnightTarget, now),
      recentEvents: this.recentEvents,
    };
  }

  public subscribe(cb: Listener): () => void {
    this.listeners.add(cb);
    cb(this.getState());
    return () => this.listeners.delete(cb);
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach(cb => {
      try {
        cb(state);
      } catch (err) {
        console.error('RealTimeEngine listener error:', err);
      }
    });
  }
}

export const realTimeEngine = new RealTimeEngine();
