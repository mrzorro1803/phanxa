import React from 'react';
import { Activity, Brain, Stethoscope, Calendar } from 'lucide-react';

export type TabKey = 'dashboard' | 'brain_gym' | 'ai_coach' | 'roadmap';

interface BottomNavProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    {
      key: 'dashboard' as TabKey,
      label: 'Tiến độ',
      icon: Activity,
    },
    {
      key: 'brain_gym' as TabKey,
      label: 'Luyện não',
      icon: Brain,
    },
    {
      key: 'ai_coach' as TabKey,
      label: 'Bác sĩ AI',
      icon: Stethoscope,
    },
    {
      key: 'roadmap' as TabKey,
      label: 'Lộ trình',
      icon: Calendar,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-md mx-auto grid grid-cols-4 h-16 items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onSelectTab(tab.key)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] py-1 transition-all ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
