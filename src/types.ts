export interface DailyTask {
  id: string;
  title: string;
  desc: string;
  category: 'abstinence' | 'brain' | 'breath' | 'kegel';
  targetMinutes?: number;
}

export interface DayChecklist {
  [taskId: string]: boolean;
}

export interface UserProgress {
  currentDay: number; // 1 to 84 (12 weeks * 7 days)
  streak: number;
  bestStreak: number;
  lastCheckinDate: string; // YYYY-MM-DD
  history: {
    [dateStr: string]: DayChecklist;
  };
  panicReliefCount: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'doctor';
  text: string;
  timestamp: string;
}

export interface WeekPlan {
  week: number;
  title: string;
  phase: string;
  neuroFocus: string;
  bodyFocus: string;
  dailyAdvice: string;
}
