/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProgress, ChatMessage, DayChecklist } from './types';
import { TopNav } from './components/TopNav';
import { BottomNav, TabKey } from './components/BottomNav';
import { DashboardTab } from './components/DashboardTab';
import { BrainGymTab } from './components/BrainGymTab';
import { AICoachTab } from './components/AICoachTab';
import { RoadmapTab } from './components/RoadmapTab';
import { PanicModal } from './components/PanicModal';
import { sound } from './utils/audio';

const STORAGE_KEY_PROGRESS = 'neurohealth_progress_v1';
const STORAGE_KEY_THEME = 'neurohealth_theme_v1';
const STORAGE_KEY_CHAT = 'neurohealth_chat_v1';
const STORAGE_KEY_SOUND = 'neurohealth_sound_v1';

const INITIAL_PROGRESS: UserProgress = {
  currentDay: 1,
  streak: 1,
  bestStreak: 1,
  lastCheckinDate: new Date().toISOString().split('T')[0],
  history: {},
  panicReliefCount: 0,
};

const INITIAL_CHAT: ChatMessage[] = [
  {
    id: 'welcome_doc',
    sender: 'doctor',
    text: 'Xin chào bạn! Tôi là Bác sĩ Minh Triết - Cố vấn chuyên khoa Nam học & Phục hồi Phản xạ Thần kinh. Mọi cuộc trò chuyện tại đây hoàn toàn bảo mật và riêng tư. Tôi luôn ở đây để đồng hành, giải đáp khoa học và giúp bạn lấy lại bản lĩnh làm chủ cơ thể. Bạn đang gặp phải băn khoăn gì?',
    timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  },
];

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
      return savedTheme ? savedTheme === 'dark' : true; // Default dark
    }
    return true;
  });

  // Sound state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_SOUND);
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });

  // Progress state
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Fallback to initial
        }
      }
    }
    return INITIAL_PROGRESS;
  });

  // Chat history state
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_CHAT);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Fallback
        }
      }
    }
    return INITIAL_CHAT;
  });

  // Navigation and Modal states
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [isPanicOpen, setIsPanicOpen] = useState<boolean>(false);
  const [brainGymExercise, setBrainGymExercise] = useState<'delay' | 'breath' | 'kegel' | 'scale'>('delay');

  // Sync theme with DOM document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY_THEME, isDark ? 'dark' : 'light');
  }, [isDark]);

  // Sync sound settings with audio manager
  useEffect(() => {
    sound.enabled = soundEnabled;
    localStorage.setItem(STORAGE_KEY_SOUND, String(soundEnabled));
  }, [soundEnabled]);

  // Sync progress to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  }, [progress]);

  // Sync chat to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CHAT, JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Toggle Daily Task Checklist
  const handleToggleTask = (taskId: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    setProgress((prev) => {
      const currentTodayTasks: DayChecklist = prev.history[todayStr] || {};
      const updatedTodayTasks: DayChecklist = {
        ...currentTodayTasks,
        [taskId]: !currentTodayTasks[taskId],
      };

      return {
        ...prev,
        history: {
          ...prev.history,
          [todayStr]: updatedTodayTasks,
        },
      };
    });
  };

  // Complete day and advance
  const handleAdvanceDay = () => {
    setProgress((prev) => {
      const nextDay = Math.min(84, prev.currentDay + 1);
      const nextStreak = prev.streak + 1;
      const best = Math.max(prev.bestStreak, nextStreak);
      sound.playVictory();
      sound.vibrate([100, 100, 200]);
      return {
        ...prev,
        currentDay: nextDay,
        streak: nextStreak,
        bestStreak: best,
        lastCheckinDate: new Date().toISOString().split('T')[0],
      };
    });
  };

  // Panic Relief Success
  const handlePanicSuccess = () => {
    setProgress((prev) => ({
      ...prev,
      panicReliefCount: prev.panicReliefCount + 1,
    }));
  };

  // Manual update of current day
  const handleUpdateDay = (newDay: number) => {
    setProgress((prev) => ({
      ...prev,
      currentDay: Math.max(1, Math.min(84, newDay)),
    }));
  };

  // Reset entire progress
  const handleResetProgress = () => {
    setProgress({
      currentDay: 1,
      streak: 1,
      bestStreak: 1,
      lastCheckinDate: new Date().toISOString().split('T')[0],
      history: {},
      panicReliefCount: 0,
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors flex justify-center">
      {/* Mobile-First Frame container */}
      <div className="w-full max-w-md min-h-screen bg-white dark:bg-slate-950 border-x border-slate-200 dark:border-slate-800/80 relative flex flex-col shadow-2xl">
        {/* Top Navigation */}
        <TopNav
          streak={progress.streak}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          onOpenPanic={() => setIsPanicOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
        />

        {/* Screen View */}
        <main className="flex-1 px-4 pt-2">
          {activeTab === 'dashboard' && (
            <DashboardTab
              progress={progress}
              onToggleTask={handleToggleTask}
              onAdvanceDay={handleAdvanceDay}
              onGoToBrainGym={(ex) => {
                if (ex) setBrainGymExercise(ex);
                setActiveTab('brain_gym');
              }}
            />
          )}

          {activeTab === 'brain_gym' && (
            <BrainGymTab initialExercise={brainGymExercise} />
          )}

          {activeTab === 'ai_coach' && (
            <AICoachTab
              chatHistory={chatHistory}
              onUpdateChatHistory={setChatHistory}
            />
          )}

          {activeTab === 'roadmap' && (
            <RoadmapTab
              progress={progress}
              onUpdateDay={handleUpdateDay}
              onResetProgress={handleResetProgress}
            />
          )}
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            sound.playTick(true);
          }}
        />

        {/* Emergency Panic Modal */}
        <PanicModal
          isOpen={isPanicOpen}
          onClose={() => setIsPanicOpen(false)}
          onSuccess={handlePanicSuccess}
        />
      </div>
    </div>
  );
}
