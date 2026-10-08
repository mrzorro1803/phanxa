import React from 'react';
import { ShieldAlert, Moon, Sun, Volume2, VolumeX, Flame } from 'lucide-react';
import { sound } from '../utils/audio';

interface TopNavProps {
  streak: number;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenPanic: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  streak,
  isDark,
  onToggleTheme,
  onOpenPanic,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-2.5 transition-colors">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Brand Zone */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-base border border-emerald-500/20">
            NH
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              NeuroHealth
            </h1>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                <Flame className="w-3 h-3 fill-amber-500" />
                {streak} ngày
              </span>
              <span>·</span>
              <span>12 Tuần Phục Hồi</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sound.playTick(true);
            }}
            aria-label="Bật/Tắt âm thanh"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Đổi giao diện sáng/tối"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* SOS Panic Button */}
          <button
            onClick={() => {
              sound.playChime(400);
              onOpenPanic();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs shadow-md shadow-rose-500/20 active:scale-95 transition-transform animate-pulse"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>CẤP CỨU</span>
          </button>
        </div>
      </div>
    </header>
  );
};
