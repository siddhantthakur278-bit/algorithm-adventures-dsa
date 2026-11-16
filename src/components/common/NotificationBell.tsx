import React, { useState } from 'react';
import { useCourse } from '../../context/CourseContext';
import { Bell, Check, Trash2, Radio, Sparkles, ExternalLink, ShieldAlert } from 'lucide-react';
import { ByteAvatar, ProfessorAvatar, BugsyAvatar } from '../characters/Characters';
import { sound } from '../../utils/soundEffects';

export const NotificationBell: React.FC = () => {
  const {
    stats,
    markNotificationAsRead,
    clearAllNotifications,
    broadcastAlert,
    toggleBrowserNotifications,
    setActiveTab,
  } = useCourse();

  const [isOpen, setIsOpen] = useState(false);
  const notifications = stats.notifications || [];
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleToggle = () => {
    sound.playPop();
    setIsOpen(!isOpen);
  };

  const handleAction = (notifId: string, actionTab?: string) => {
    markNotificationAsRead(notifId);
    if (actionTab) {
      setActiveTab(actionTab);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={handleToggle}
        className="relative p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-slate-300 hover:text-white transition shadow-sm cursor-pointer backdrop-blur-md flex items-center justify-center"
        title="Broadcast Notification Center"
      >
        <Bell className="w-4 h-4 text-amber-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white/20 animate-pulse shadow-sm">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0c101d]/95 border border-white/15 rounded-2xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden text-slate-200">
            {/* Header */}
            <div className="bg-white/[0.04] px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                <h4 className="font-bold text-sm text-white tracking-wide">
                  APP BROADCAST STATION
                </h4>
              </div>

              <div className="flex items-center gap-2">
                {notifications.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-slate-400 hover:text-red-400 text-xs font-mono flex items-center gap-1 cursor-pointer transition"
                    title="Clear All Notifications"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer transition"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Browser Desktop Push Banner Toggle */}
            <div className="bg-[#171b2d] px-4 py-2 border-b border-gray-800 flex items-center justify-between text-xs">
              <span className="text-gray-300">Desktop Push Notifications</span>
              <button
                onClick={toggleBrowserNotifications}
                className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#FFDE59] text-black border border-black shadow-comic-sm hover:bg-[#ffe680]"
              >
                {stats.browserNotificationsEnabled ? 'Active ✓' : 'Enable OS Alerts'}
              </button>
            </div>

            {/* Quick Broadcast Simulators */}
            <div className="bg-[#0e111d] px-4 py-2 border-b border-gray-800 flex items-center gap-2 overflow-x-auto text-[11px] no-scrollbar">
              <span className="text-gray-400 font-bold whitespace-nowrap">Broadcast:</span>
              <button
                onClick={() => broadcastAlert('potd')}
                className="px-2 py-0.5 rounded bg-[#1f253a] hover:bg-[#2b334f] text-yellow-300 whitespace-nowrap border border-yellow-500/30"
              >
                ☀️ 5 AM POTD
              </button>
              <button
                onClick={() => broadcastAlert('streak')}
                className="px-2 py-0.5 rounded bg-[#1f253a] hover:bg-[#2b334f] text-red-300 whitespace-nowrap border border-red-500/30"
              >
                🔥 Streak Alert
              </button>
              <button
                onClick={() => broadcastAlert('weekend')}
                className="px-2 py-0.5 rounded bg-[#1f253a] hover:bg-[#2b334f] text-blue-300 whitespace-nowrap border border-blue-500/30"
              >
                🚀 Weekend Rush
              </button>
            </div>

            {/* Notification Items List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-gray-800/80">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-xs text-gray-400 italic">
                  No incoming broadcasts right now. Check back at 5:00 AM!
                </div>
              ) : (
                notifications.map(n => (
                  <div
                    key={n.id}
                    className={`p-3.5 space-y-2 transition ${
                      n.read ? 'bg-transparent opacity-75' : 'bg-[#181d30]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="flex-shrink-0 pt-0.5">
                        {n.speaker === 'byte' ? (
                          <ByteAvatar size="sm" mood="happy" />
                        ) : n.speaker === 'bugsy' ? (
                          <BugsyAvatar size="sm" mood="sneaky" />
                        ) : (
                          <ProfessorAvatar size="sm" mood="teaching" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="font-bangers text-xs sm:text-sm text-[#FFDE59] tracking-wide truncate">
                            {n.title}
                          </h5>
                          <span className="text-[9px] font-mono text-gray-400">
                            {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <p className="text-xs text-gray-300 mt-0.5 leading-snug">
                          {n.message}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          {n.actionTab && (
                            <button
                              onClick={() => handleAction(n.id, n.actionTab)}
                              className="px-2 py-0.5 rounded bg-[#38B6FF] text-black font-bangers text-[10px] tracking-wider border border-black shadow-comic-sm hover:bg-[#5bc4ff]"
                            >
                              Jump to Quest &rarr;
                            </button>
                          )}
                          {!n.read && (
                            <button
                              onClick={() => markNotificationAsRead(n.id)}
                              className="text-[10px] text-gray-400 hover:text-white flex items-center gap-1"
                            >
                              <Check className="w-3 h-3 text-green-400" />
                              Mark Read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
