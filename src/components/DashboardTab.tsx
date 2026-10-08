import React from 'react';
import { Flame, CheckCircle2, Circle, ArrowRight, ShieldCheck, Trophy, Sparkles, Brain, Wind, Activity } from 'lucide-react';
import { DAILY_TASKS, ROADMAP_WEEKS, DAILY_AFFIRMATIONS } from '../data/roadmap';
import { DayChecklist, UserProgress } from '../types';
import { sound } from '../utils/audio';

interface DashboardTabProps {
  progress: UserProgress;
  onToggleTask: (taskId: string) => void;
  onAdvanceDay: () => void;
  onGoToBrainGym: (exercise?: 'delay' | 'breath' | 'kegel' | 'scale') => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  progress,
  onToggleTask,
  onAdvanceDay,
  onGoToBrainGym,
}) => {
  const currentWeekNum = Math.min(12, Math.ceil(progress.currentDay / 7));
  const weekInfo = ROADMAP_WEEKS.find((w) => w.week === currentWeekNum) || ROADMAP_WEEKS[0];

  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks: DayChecklist = progress.history[todayStr] || {};

  const completedCount = DAILY_TASKS.filter((t) => todayTasks[t.id]).length;
  const isAllCompleted = completedCount === DAILY_TASKS.length;

  const affirmationIndex = (progress.currentDay - 1) % DAILY_AFFIRMATIONS.length;
  const todayAffirmation = DAILY_AFFIRMATIONS[affirmationIndex];

  return (
    <div className="space-y-4 pb-24 pt-2">
      {/* Top Hero / Streak Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-5 shadow-xl border border-emerald-500/20">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Lộ trình 12 tuần · {weekInfo.phase.split(':')[0]}
            </div>
            <h2 className="text-2xl font-black tracking-tight">
              Ngày {progress.currentDay}{' '}
              <span className="text-slate-400 text-lg font-normal">/ 84</span>
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Tuần {currentWeekNum}: {weekInfo.title}
            </p>
          </div>

          {/* Streak Badge */}
          <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl px-3.5 py-2 border border-white/10">
            <Flame className="w-6 h-6 text-amber-400 fill-amber-400 animate-pulse" />
            <span className="text-lg font-black font-mono leading-none mt-1">{progress.streak}</span>
            <span className="text-[10px] text-amber-200/80 font-medium">Chuỗi ngày</span>
          </div>
        </div>

        {/* Progress Bar (Overall 84 Days) */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1.5 font-medium">
            <span>Tiến độ tổng thể</span>
            <span className="font-mono text-emerald-400">{Math.round((progress.currentDay / 84) * 100)}%</span>
          </div>
          <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.max(2, (progress.currentDay / 84) * 100)}%` }}
            />
          </div>
        </div>

        {/* Quick Metrics Ribbon */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10 text-center">
          <div className="p-2 rounded-xl bg-white/5 flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400">Kỷ lục dài nhất</div>
              <div className="text-xs font-bold font-mono">{progress.bestStreak} ngày</div>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-white/5 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400">Vượt cơn thèm</div>
              <div className="text-xs font-bold font-mono">{progress.panicReliefCount} lần</div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Affirmation Card */}
      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Lời nhắc thần kinh hôm nay
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 italic leading-relaxed">
              "{todayAffirmation}"
            </p>
          </div>
        </div>
      </div>

      {/* Daily Checklist Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Nhiệm Vụ Kỷ Luật Hôm Nay
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Đã hoàn thành {completedCount}/{DAILY_TASKS.length} nhiệm vụ
            </p>
          </div>

          {/* Quick jump to Brain Gym */}
          <button
            onClick={() => onGoToBrainGym()}
            className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            Phòng Luyện Não <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Task Cards */}
        <div className="space-y-2.5">
          {DAILY_TASKS.map((task) => {
            const isDone = !!todayTasks[task.id];
            return (
              <div
                key={task.id}
                onClick={() => {
                  onToggleTask(task.id);
                  if (!isDone) {
                    sound.playTick(true);
                  }
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isDone
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  aria-label="Đánh dấu hoàn thành"
                  className="mt-0.5 text-slate-400 shrink-0 transition-transform active:scale-90"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold leading-tight ${
                        isDone
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {task.title}
                    </span>
                    {task.targetMinutes && (
                      <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-1">
                        {task.targetMinutes} phút
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {task.desc}
                  </p>

                  {/* Interactive Shortcut */}
                  {task.category === 'brain' && !isDone && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onGoToBrainGym('delay');
                      }}
                      className="mt-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/40"
                    >
                      <Brain className="w-3 h-3" /> Mở bộ đếm 10 phút chống thèm
                    </button>
                  )}

                  {task.category === 'breath' && !isDone && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onGoToBrainGym('breath');
                      }}
                      className="mt-2 text-[11px] font-semibold text-sky-600 dark:text-sky-400 inline-flex items-center gap-1 bg-sky-50 dark:bg-sky-950/40 px-2 py-1 rounded-lg border border-sky-200 dark:border-sky-800/40"
                    >
                      <Wind className="w-3 h-3" /> Bắt đầu bài tập thở 4-4-4
                    </button>
                  )}

                  {task.category === 'kegel' && !isDone && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onGoToBrainGym('kegel');
                      }}
                      className="mt-2 text-[11px] font-semibold text-purple-600 dark:text-purple-400 inline-flex items-center gap-1 bg-purple-50 dark:bg-purple-950/40 px-2 py-1 rounded-lg border border-purple-200 dark:border-purple-800/40"
                    >
                      <Activity className="w-3 h-3" /> Tập Kegel 3 hiệp ngay
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Advance Day / Check-in CTA Button */}
      <div className="pt-2">
        <button
          onClick={onAdvanceDay}
          className={`w-full h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] ${
            isAllCompleted
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25 ring-2 ring-emerald-400/50'
              : 'bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white shadow-slate-900/10'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>
            {isAllCompleted
              ? 'Đã xong 4 nhiệm vụ! Nhấn để sang Ngày tiếp theo'
              : 'Ghi nhận tiến độ & Hoàn thành ngày hôm nay'}
          </span>
        </button>
      </div>

      {/* Week Focus Summary */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
        <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Mục Tiêu Thần Kinh Tuần Này
        </h4>
        <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 leading-relaxed">
          <p>
            🧠 <strong>Tâm trí:</strong> {weekInfo.neuroFocus}
          </p>
          <p>
            ⚡ <strong>Thể chất:</strong> {weekInfo.bodyFocus}
          </p>
          <p>
            💡 <strong>Lời khuyên:</strong> {weekInfo.dailyAdvice}
          </p>
        </div>
      </div>
    </div>
  );
};
