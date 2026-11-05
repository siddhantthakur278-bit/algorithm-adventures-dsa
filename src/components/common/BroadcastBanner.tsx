import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { Radio, X, ArrowRight, Bell } from 'lucide-react';
import { ByteAvatar, ProfessorAvatar, BugsyAvatar } from '../characters/Characters';

export const BroadcastBanner: React.FC = () => {
  const { stats, markNotificationAsRead, setActiveTab } = useCourse();
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const notifications = stats.notifications || [];
  // Find latest unread notification that hasn't been locally dismissed in this session
  const latestUnread = notifications.find(n => !n.read && !dismissedIds.includes(n.id));

  if (!latestUnread) return null;

  const handleDismiss = () => {
    setDismissedIds(prev => [...prev, latestUnread.id]);
    markNotificationAsRead(latestUnread.id);
  };

  const handleAction = () => {
    markNotificationAsRead(latestUnread.id);
    if (latestUnread.actionTab) {
      setActiveTab(latestUnread.actionTab);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm sm:max-w-md w-full animate-bounce-once">
      <div className="bg-[#0c101d] border-3 border-black rounded-2xl p-4 shadow-comic-lg bg-halftone relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 pt-0.5">
            {latestUnread.speaker === 'byte' ? (
              <ByteAvatar size="sm" mood="shocked" />
            ) : latestUnread.speaker === 'bugsy' ? (
              <BugsyAvatar size="sm" mood="sneaky" />
            ) : (
              <ProfessorAvatar size="sm" mood="teaching" />
            )}
          </div>

          <div className="flex-1 min-w-0 pr-6">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-[#F43F5E] animate-ping" />
              <span className="text-[10px] font-bold text-[#F43F5E] uppercase tracking-wider">
                LIVE APP BROADCAST
              </span>
            </div>

            <h4 className="font-bangers text-sm sm:text-base text-white tracking-wide truncate">
              {latestUnread.title}
            </h4>

            <p className="text-xs text-slate-200 mt-1 line-clamp-2 leading-snug font-medium">
              {latestUnread.message}
            </p>

            <div className="flex items-center gap-2 mt-3">
              {latestUnread.actionTab && (
                <button
                  onClick={handleAction}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#FBBF24] text-black font-bangers text-xs border border-black shadow-comic-sm hover:bg-amber-300 transition cursor-pointer btn-comic-push"
                >
                  View Quest <ArrowRight className="w-3 h-3" />
                </button>
              )}

              <button
                onClick={handleDismiss}
                className="text-xs text-slate-400 hover:text-white font-medium cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-slate-400 hover:text-white font-bold text-xs cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
