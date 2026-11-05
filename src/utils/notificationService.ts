import { AppNotification, Problem } from '../types';
import { sound } from './soundEffects';

export async function requestDesktopNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const perm = await Notification.requestPermission();
    return perm === 'granted';
  }

  return false;
}

export function fireDesktopNotification(title: string, body: string, iconUrl?: string) {
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: iconUrl || '/favicon.ico',
      });
    } catch (e) {
      console.warn('Desktop notification dispatch failed:', e);
    }
  }
}

export function createPotdBroadcast(potdProblem: Problem): AppNotification {
  sound.playFanfare();
  const notif: AppNotification = {
    id: 'notif-potd-' + Date.now(),
    title: '☀️ 5:00 AM POTD Vault Unlocked!',
    message: `Professor: "Today's Day of the Question '${potdProblem.title}' [${potdProblem.difficulty}] is live! Solve before midnight to preserve your streak flame!"`,
    timestamp: new Date().toISOString(),
    type: 'potd',
    read: false,
    actionTab: 'quest',
    speaker: 'professor',
  };

  fireDesktopNotification(
    notif.title,
    `Quest: ${potdProblem.title} [${potdProblem.difficulty}] is now available in Algorithm Adventures!`
  );

  return notif;
}

export function createStreakAlertBroadcast(hoursRemaining: number, streakDays: number): AppNotification {
  sound.playError();
  const notif: AppNotification = {
    id: 'notif-streak-' + Date.now(),
    title: '🔥 Midnight Approaches: Streak Alert!',
    message: `Byte: "Only ${hoursRemaining.toFixed(1)} hours left today! Solve at least 1 quest to protect your ${streakDays}-day streak flame!"`,
    timestamp: new Date().toISOString(),
    type: 'streak',
    read: false,
    actionTab: 'quest',
    speaker: 'byte',
  };

  fireDesktopNotification(
    notif.title,
    `Your ${streakDays}-day streak is in danger! Solve before midnight.`
  );

  return notif;
}

export function createWeekendRushBroadcast(): AppNotification {
  sound.playSuccess();
  const notif: AppNotification = {
    id: 'notif-weekend-' + Date.now(),
    title: '🚀 Weekend Rush Active (+2 Bonus Quests)!',
    message: 'Bugsy: "The weekend approaches! I added +2 bonus homework quests to your queue! Can you handle them?!"',
    timestamp: new Date().toISOString(),
    type: 'weekend',
    read: false,
    actionTab: 'quest',
    speaker: 'bugsy',
  };

  fireDesktopNotification(
    notif.title,
    'Weekend Rush: +2 Bonus homework problems added to your daily queue!'
  );

  return notif;
}
