import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Code2,
  Smile,
  Hash,
  Users,
  Sparkles,
  Bot,
  Trash2,
  Copy,
  Check,
  Search,
  Headphones,
  Radio,
  FileCode,
  Paperclip,
  CheckCheck,
  AudioLines,
  Flame,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import {
  ChatMessage,
  ChatChannel,
  CHAT_CHANNELS,
  getChannelMessages,
  saveChannelMessages,
  subscribeToRealtimeChat,
  broadcastChatMessage,
  checkAndTriggerAiReply,
} from '../../utils/communityChatService';
import {
  speakText,
  stopSpeaking,
  startSpeechToText,
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
  SpeechRecognitionController,
} from '../../utils/speechService';
import { getStoredUserProfile } from '../../utils/universalLeaderboardService';
import { HumanAvatar } from '../common/HumanAvatar';
import { sound } from '../../utils/soundEffects';

export const CommunityChatHub: React.FC = () => {
  const currentUser = getStoredUserProfile();

  const [activeChannelId, setActiveChannelId] = useState<string>('general-dsa');
  const [messages, setMessages] = useState<ChatMessage[]>(() => getChannelMessages('general-dsa'));
  const [inputText, setInputText] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileChannelsOpen, setIsMobileChannelsOpen] = useState<boolean>(false);

  // Voice Typing (Speech-to-Text) State
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognitionController | null>(null);

  // Text-to-Speech (Speaking Aloud) State
  const [currentlySpeakingMsgId, setCurrentlySpeakingMsgId] = useState<string | null>(null);

  // Voice Note Recording State
  const [isRecordingAudio, setIsRecordingAudio] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<any>(null);

  // Playing Audio Note state
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Code snippet modal / drawer
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);
  const [codeSnippetLang, setCodeSnippetLang] = useState<string>('python');
  const [codeSnippetContent, setCodeSnippetContent] = useState<string>('');

  // Copied feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeChannel = CHAT_CHANNELS.find((c) => c.id === activeChannelId) || CHAT_CHANNELS[0];

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load channel messages on channel switch
  useEffect(() => {
    const loaded = getChannelMessages(activeChannelId);
    setMessages(loaded);
    stopSpeaking();
    setCurrentlySpeakingMsgId(null);
  }, [activeChannelId]);

  // Subscribe to real-time broadcast events from other web peers via Supabase
  useEffect(() => {
    const unsubscribe = subscribeToRealtimeChat(activeChannelId, (incomingMessage) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === incomingMessage.id)) return prev;
        const updated = [...prev, incomingMessage];
        saveChannelMessages(activeChannelId, updated);
        sound.playPop();
        return updated;
      });
    });

    return () => {
      unsubscribe();
    };
  }, [activeChannelId]);

  // Handle Voice-to-Text Typing Toggle
  const toggleVoiceTyping = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      sound.playPop();
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      alert('Speech Recognition is not supported by your current browser. Please try Chrome, Edge, or Safari.');
      return;
    }

    sound.playSuccess();
    setIsListening(true);

    const controller = startSpeechToText({
      onStart: () => setIsListening(true),
      onResult: (transcript, isFinal) => {
        setInputText((prev) => {
          const trimmed = prev.trim();
          return trimmed ? `${trimmed} ${transcript}` : transcript;
        });
      },
      onError: (err) => {
        console.warn('Speech recognition warning:', err);
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      },
    });

    recognitionRef.current = controller;
  };

  // Handle Text-to-Speech (Read Aloud Message)
  const handleToggleSpeak = (msg: ChatMessage) => {
    if (currentlySpeakingMsgId === msg.id) {
      stopSpeaking();
      setCurrentlySpeakingMsgId(null);
      return;
    }

    stopSpeaking();
    setCurrentlySpeakingMsgId(msg.id);
    sound.playPop();

    speakText(msg.content, {
      onEnd: () => setCurrentlySpeakingMsgId(null),
      onError: () => setCurrentlySpeakingMsgId(null),
    });
  };

  // Handle Voice Note Recording (Audio clip)
  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64Audio = reader.result as string;
          sendVoiceNoteMessage(base64Audio, recordingSeconds);
        };
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecordingAudio(true);
      setRecordingSeconds(0);
      sound.playPop();

      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      alert('Microphone permission denied or microphone unavailable.');
      console.warn('Mic error:', err);
    }
  };

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current && isRecordingAudio) {
      mediaRecorderRef.current.stop();
      setIsRecordingAudio(false);
      clearInterval(recordingTimerRef.current);
      sound.playCelebration();
    }
  };

  const cancelAudioRecording = () => {
    if (mediaRecorderRef.current && isRecordingAudio) {
      mediaRecorderRef.current.stop();
      setIsRecordingAudio(false);
      clearInterval(recordingTimerRef.current);
      audioChunksRef.current = [];
      sound.playPop();
    }
  };

  // Send Voice Note as a chat message
  const sendVoiceNoteMessage = (audioUrl: string, durationSec: number) => {
    const newMessage: ChatMessage = {
      id: `msg-voice-${Date.now()}`,
      channelId: activeChannelId,
      senderHandle: currentUser.handle,
      senderDisplayName: currentUser.displayName,
      senderAvatarUrl: currentUser.avatarUrl,
      senderRole: 'Adventurer',
      content: `🎙️ Voice Note (${Math.max(1, durationSec)}s)`,
      audioNoteUrl: audioUrl,
      audioDurationSeconds: Math.max(1, durationSec),
      timestamp: 'Just now',
      reactions: { '🎙️': 1 },
    };

    setMessages((prev) => {
      const updated = [...prev, newMessage];
      saveChannelMessages(activeChannelId, updated);
      return updated;
    });

    broadcastChatMessage(newMessage);
  };

  // Play audio note
  const handlePlayAudioNote = (audioUrl: string, msgId: string) => {
    if (playingAudioId === msgId) {
      audioPlayerRef.current?.pause();
      setPlayingAudioId(null);
      return;
    }

    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }

    const audio = new Audio(audioUrl);
    audioPlayerRef.current = audio;
    setPlayingAudioId(msgId);

    audio.play();
    audio.onended = () => {
      setPlayingAudioId(null);
    };
  };

  // Send Text Message
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    // Turn off speech typing if active
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    const textToSend = inputText.trim();
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      channelId: activeChannelId,
      senderHandle: currentUser.handle,
      senderDisplayName: currentUser.displayName,
      senderAvatarUrl: currentUser.avatarUrl,
      senderRole: 'Adventurer',
      content: textToSend,
      timestamp: 'Just now',
      reactions: {},
    };

    // Update local state and cache
    setMessages((prev) => {
      const updated = [...prev, newMessage];
      saveChannelMessages(activeChannelId, updated);
      return updated;
    });

    setInputText('');
    sound.playPop();

    // Broadcast live across web to other users via Supabase
    broadcastChatMessage(newMessage);

    // Check if user mentioned @Professor or @Byte or @ai for automated mentor response
    checkAndTriggerAiReply(activeChannelId, textToSend, (aiMessage) => {
      setMessages((prev) => {
        const updated = [...prev, aiMessage];
        saveChannelMessages(activeChannelId, updated);
        sound.playCelebration();
        return updated;
      });
      broadcastChatMessage(aiMessage);
    });
  };

  // Send Code Snippet
  const handleSendCodeSnippet = () => {
    if (!codeSnippetContent.trim()) return;

    const newMessage: ChatMessage = {
      id: `msg-code-${Date.now()}`,
      channelId: activeChannelId,
      senderHandle: currentUser.handle,
      senderDisplayName: currentUser.displayName,
      senderAvatarUrl: currentUser.avatarUrl,
      senderRole: 'Adventurer',
      content: `Shared a ${codeSnippetLang.toUpperCase()} code solution:`,
      codeSnippet: {
        language: codeSnippetLang,
        code: codeSnippetContent.trim(),
      },
      timestamp: 'Just now',
      reactions: { '💡': 1, '🔥': 1 },
    };

    setMessages((prev) => {
      const updated = [...prev, newMessage];
      saveChannelMessages(activeChannelId, updated);
      return updated;
    });

    setShowCodeModal(false);
    setCodeSnippetContent('');
    sound.playSuccess();
    broadcastChatMessage(newMessage);
  };

  // Add emoji reaction
  const handleAddReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== messageId) return m;
        const currentCount = m.reactions[emoji] || 0;
        const nextReactions = { ...m.reactions, [emoji]: currentCount + 1 };
        return { ...m, reactions: nextReactions };
      })
    );
    sound.playPop();
  };

  // Copy code or message text
  const handleCopyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    sound.playPop();
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter messages by search query
  const filteredMessages = messages.filter((m) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.content.toLowerCase().includes(q) ||
      m.senderHandle.toLowerCase().includes(q) ||
      m.senderDisplayName.toLowerCase().includes(q) ||
      (m.codeSnippet?.code.toLowerCase().includes(q) ?? false)
    );
  });

  return (
    <div className="max-w-[1720px] mx-auto px-2 sm:px-4 py-4 space-y-4">
      {/* Community Hub Master Header */}
      <div className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-3 sm:p-4 shadow-comic flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-lg shadow-sm border border-amber-300">
            💬
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>Community &amp; Voice Chat Hub</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync
                </span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400">
              Chat in real time with fellow developers worldwide with <strong>Voice-to-Text</strong> typing and <strong>Text-to-Voice</strong> speech playback.
            </p>
          </div>
        </div>

        {/* Global Live Capabilities Pill */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#070a12] border border-slate-800 text-xs font-semibold text-slate-300">
            <Mic className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px]">Voice Typing</span>
            <span className="text-slate-600">•</span>
            <Volume2 className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[11px]">Read Aloud</span>
            <span className="text-slate-600">•</span>
            <Code2 className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[11px]">Code Proofs</span>
          </div>

          <button
            onClick={() => setIsMobileChannelsOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Chat Layout: Channels Sidebar + Message Thread Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch h-[calc(100vh-230px)] min-h-[580px]">
        {/* =================================================================== */}
        {/* LEFT PANEL: Room Channels & Community Members                       */}
        {/* =================================================================== */}
        <div
          className={`md:col-span-1 bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-3 flex flex-col space-y-3 shadow-comic overflow-hidden ${
            isMobileChannelsOpen ? 'block' : 'hidden md:flex'
          }`}
        >
          {/* Channels Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-extrabold text-white uppercase tracking-wider">
              <Hash className="w-4 h-4 text-amber-400" />
              <span>Channels</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              {CHAT_CHANNELS.length} Active
            </span>
          </div>

          {/* Channel List */}
          <div className="flex-1 overflow-y-auto space-y-1 pr-1 no-scrollbar">
            {CHAT_CHANNELS.map((ch) => {
              const isActive = ch.id === activeChannelId;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveChannelId(ch.id);
                    setIsMobileChannelsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition cursor-pointer text-left group ${
                    isActive
                      ? 'bg-amber-400/15 text-amber-300 border border-amber-400/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={`font-mono text-sm ${isActive ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
                      #
                    </span>
                    <span className="truncate">{ch.name}</span>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.2 rounded uppercase ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}
                  >
                    {ch.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Adventurers in Room */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-sky-400" /> Active Coders
              </span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>

            <div className="space-y-1.5 max-h-[140px] overflow-y-auto no-scrollbar">
              {[
                { name: currentUser.displayName, handle: currentUser.handle, role: 'You', isMe: true },
                { name: 'Gennady Tribute', handle: 'tourist_fan', role: 'Grandmaster' },
                { name: 'Sakura Tanaka', handle: 'sakura_algo', role: 'Grandmaster' },
                { name: 'Professor AI', handle: 'professor_ai', role: 'Mentor' },
              ].map((u, idx) => (
                <div key={idx} className="flex items-center gap-2 p-1.5 rounded-lg bg-[#070a12] border border-slate-800/80">
                  <HumanAvatar seed={u.handle} name={u.name} size="xs" showStatus={true} />
                  <div className="min-w-0 flex-1 leading-tight">
                    <div className="text-[11px] font-bold text-white truncate flex items-center justify-between">
                      <span className="truncate">{u.name}</span>
                      {u.isMe && (
                        <span className="text-[8px] font-mono bg-amber-400 text-slate-950 px-1 rounded font-black">
                          YOU
                        </span>
                      )}
                    </div>
                    <div className="text-[9px] font-mono text-slate-500">@{u.handle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* CENTER / RIGHT PANEL: Message Feed & Rich Voice/Text Composer       */}
        {/* =================================================================== */}
        <div className="md:col-span-3 bg-[#0b0f19] border border-slate-800/80 rounded-2xl flex flex-col shadow-comic overflow-hidden">
          {/* Active Room Channel Header */}
          <div className="px-4 py-2.5 bg-[#070a12] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-amber-400 font-extrabold">#</span>
              <span className="text-sm font-black text-white tracking-wide">{activeChannel.name}</span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">• {activeChannel.topic}</span>
            </div>

            {/* Quick Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages..."
                className="bg-[#0b0f19] text-xs text-slate-200 placeholder-slate-500 pl-8 pr-2 py-1 rounded-lg border border-slate-800 focus:outline-none focus:border-amber-400 w-36 sm:w-48"
              />
            </div>
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#070a12]">
            {filteredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-2 text-slate-500 py-12">
                <Hash className="w-10 h-10 text-slate-700" />
                <p className="text-xs font-mono">No messages yet in #{activeChannel.name}.</p>
                <p className="text-[11px] text-slate-600">Be the first to ask an algorithmic question or share a voice note!</p>
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isMe = msg.senderHandle === currentUser.handle;
                const isSpeaking = currentlySpeakingMsgId === msg.id;
                const isPlayingAudio = playingAudioId === msg.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 p-3 rounded-2xl border transition-all ${
                      msg.isAiResponse
                        ? 'bg-amber-400/5 border-amber-400/30'
                        : isMe
                        ? 'bg-[#0f1424] border-slate-800'
                        : 'bg-[#0b0f19] border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    {/* Simple Human Logo Avatar */}
                    <HumanAvatar
                      seed={msg.senderHandle}
                      name={msg.senderDisplayName}
                      avatarUrl={msg.senderAvatarUrl}
                      size="sm"
                      aura={msg.isAiResponse ? 'amber' : isMe ? 'cyan' : 'none'}
                      showStatus={true}
                    />

                    {/* Message Body */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      {/* Sender Header */}
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-white tracking-tight">
                            {msg.senderDisplayName}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            @{msg.senderHandle}
                          </span>
                          {msg.senderRole && (
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                                msg.isAiResponse
                                  ? 'bg-amber-400 text-slate-950'
                                  : msg.senderRole.includes('Master')
                                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                  : 'bg-slate-900 text-slate-400'
                              }`}
                            >
                              {msg.senderRole}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                          <span>{msg.timestamp}</span>

                          {/* 🔊 Text-to-Speech / Read Aloud Button */}
                          <button
                            onClick={() => handleToggleSpeak(msg)}
                            className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition cursor-pointer ${
                              isSpeaking
                                ? 'bg-amber-400 text-slate-950 font-bold'
                                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                            }`}
                            title={isSpeaking ? 'Stop voice speech' : 'Listen to message read aloud (Voice Text)'}
                          >
                            {isSpeaking ? (
                              <>
                                <AudioLines className="w-3 h-3 animate-pulse text-slate-950" />
                                <span>Speaking...</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3 h-3 text-sky-400" />
                                <span>Voice Text</span>
                              </>
                            )}
                          </button>

                          {/* Copy message button */}
                          <button
                            onClick={() => handleCopyMessage(msg.content, msg.id)}
                            className="text-slate-500 hover:text-white transition"
                            title="Copy message"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Text Content */}
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                        {msg.content}
                      </p>

                      {/* Code Snippet Box (if message includes code) */}
                      {msg.codeSnippet && (
                        <div className="bg-[#05070d] rounded-xl border border-slate-800 overflow-hidden my-2">
                          <div className="px-3 py-1 bg-[#090d16] border-b border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                            <span className="uppercase text-amber-400 font-bold">
                              {msg.codeSnippet.language}
                            </span>
                            <button
                              onClick={() => handleCopyMessage(msg.codeSnippet!.code, `${msg.id}-code`)}
                              className="hover:text-white flex items-center gap-1"
                            >
                              {copiedId === `${msg.id}-code` ? 'Copied!' : 'Copy Code'}
                            </button>
                          </div>
                          <pre className="p-3 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                            {msg.codeSnippet.code}
                          </pre>
                        </div>
                      )}

                      {/* Voice Note Audio Clip (if recorded voice note) */}
                      {msg.audioNoteUrl && (
                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#090d16] border border-amber-400/30 max-w-sm my-1">
                          <button
                            onClick={() => handlePlayAudioNote(msg.audioNoteUrl!, msg.id)}
                            className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-sm transition hover:bg-amber-300 cursor-pointer shrink-0"
                          >
                            {isPlayingAudio ? (
                              <Pause className="w-4 h-4 fill-slate-950" />
                            ) : (
                              <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-white flex items-center justify-between">
                              <span>Voice Note</span>
                              <span className="text-[10px] font-mono text-amber-300">
                                {msg.audioDurationSeconds || 3}s
                              </span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                              <div
                                className={`h-full bg-amber-400 rounded-full ${
                                  isPlayingAudio ? 'w-full transition-all duration-3000 animate-pulse' : 'w-1/3'
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Reaction Pills */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {Object.entries(msg.reactions).map(([emoji, count]) => (
                          <button
                            key={emoji}
                            onClick={() => handleAddReaction(msg.id, emoji)}
                            className="px-2 py-0.5 rounded-lg bg-[#0d121f] hover:bg-slate-800 border border-slate-800 text-xs font-mono transition cursor-pointer flex items-center gap-1"
                          >
                            <span>{emoji}</span>
                            <span className="text-slate-400 text-[10px] font-bold">{count}</span>
                          </button>
                        ))}

                        {/* Quick reaction triggers */}
                        {['👍', '🔥', '💡', '❤️'].map((em) => (
                          <button
                            key={em}
                            onClick={() => handleAddReaction(msg.id, em)}
                            className="opacity-0 group-hover:opacity-100 px-1 py-0.5 rounded hover:bg-slate-800 text-xs transition cursor-pointer"
                            title={`React ${em}`}
                          >
                            {em}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Active Voice Recording Audio Strip */}
          {isRecordingAudio && (
            <div className="px-4 py-2 bg-red-950/40 border-t border-red-500/40 flex items-center justify-between gap-3 animate-pulse">
              <div className="flex items-center gap-2 text-xs font-bold text-red-300">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span>Recording Voice Message... ({recordingSeconds}s)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={cancelAudioRecording}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={stopAudioRecording}
                  className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-sm cursor-pointer"
                >
                  Send Voice Note ➔
                </button>
              </div>
            </div>
          )}

          {/* Voice-to-Text Speech Recognition Listening Banner */}
          {isListening && (
            <div className="px-4 py-2 bg-amber-400/10 border-t border-amber-400/30 flex items-center justify-between gap-3 animate-pulse">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Mic className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>Listening... Speak into your microphone to type automatically.</span>
              </div>
              <button
                onClick={toggleVoiceTyping}
                className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-extrabold text-xs cursor-pointer shadow-sm"
              >
                Done Speaking
              </button>
            </div>
          )}

          {/* Bottom Chat Composer Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-[#090d16] border-t border-slate-800/80 flex items-center gap-2"
          >
            {/* 🎙️ Voice Typing Toggle Button (Speech-to-Text) */}
            <button
              type="button"
              onClick={toggleVoiceTyping}
              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                isListening
                  ? 'bg-red-600 text-white border-red-500 animate-pulse'
                  : 'bg-[#0d121f] text-slate-300 hover:text-white border-slate-800 hover:border-amber-400'
              }`}
              title={isListening ? 'Stop Voice Typing' : 'Start Voice Typing (Speech-to-Text)'}
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* 🎤 Record Voice Note Message Button */}
            <button
              type="button"
              onClick={isRecordingAudio ? stopAudioRecording : startAudioRecording}
              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                isRecordingAudio
                  ? 'bg-red-600 text-white border-red-500'
                  : 'bg-[#0d121f] text-slate-300 hover:text-white border-slate-800 hover:border-amber-400'
              }`}
              title="Record Voice Note Clip"
            >
              <Headphones className="w-4 h-4" />
            </button>

            {/* 💻 Share Code Snippet Button */}
            <button
              type="button"
              onClick={() => setShowCodeModal(true)}
              className="p-2.5 rounded-xl bg-[#0d121f] text-slate-300 hover:text-white border border-slate-800 hover:border-purple-400 transition cursor-pointer"
              title="Share formatted Code Snippet"
            >
              <Code2 className="w-4 h-4 text-purple-400" />
            </button>

            {/* Main Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message #${activeChannel.name}... (Type or use 🎙️ Voice. Ask @Professor for AI assistance)`}
              className="flex-1 bg-[#0d121f] text-xs sm:text-sm text-white placeholder-slate-500 px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-400 transition"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="btn-comic-push p-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition cursor-pointer shadow-sm disabled:opacity-40"
              title="Send message (Enter)"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Code Snippet Share Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl max-w-lg w-full p-5 shadow-comic space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-purple-400" />
                <h3 className="font-extrabold text-base text-white">Share Code Solution</h3>
              </div>
              <button onClick={() => setShowCodeModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-300">Language:</label>
                <select
                  value={codeSnippetLang}
                  onChange={(e) => setCodeSnippetLang(e.target.value)}
                  className="bg-[#070a12] text-xs text-white px-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-purple-400 uppercase font-mono"
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                  <option value="sql">SQL</option>
                </select>
              </div>

              <textarea
                value={codeSnippetContent}
                onChange={(e) => setCodeSnippetContent(e.target.value)}
                placeholder="Paste code snippet here..."
                rows={8}
                className="w-full bg-[#070a12] text-xs font-mono text-emerald-300 p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-purple-400 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCodeModal(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSendCodeSnippet}
                disabled={!codeSnippetContent.trim()}
                className="btn-comic-push px-4 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white text-xs font-bold transition shadow-sm disabled:opacity-40"
              >
                Send Code Solution
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
