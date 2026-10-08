import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Lock,
  ChevronRight,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Award,
} from 'lucide-react';
import { ROADMAP_WEEKS } from '../data/roadmap';
import { UserProgress } from '../types';
import { generateStandaloneHTML } from '../standaloneTemplate';
import { sound } from '../utils/audio';

interface RoadmapTabProps {
  progress: UserProgress;
  onUpdateDay: (newDay: number) => void;
  onResetProgress: () => void;
}

export const RoadmapTab: React.FC<RoadmapTabProps> = ({
  progress,
  onUpdateDay,
  onResetProgress,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isEditingDay, setIsEditingDay] = useState(false);
  const [tempDay, setTempDay] = useState(progress.currentDay);

  const currentWeek = Math.min(12, Math.ceil(progress.currentDay / 7));

  const milestones = [
    { day: 7, label: '7 Ngày', title: 'Hạ nhiệt Amygdala & Cắt kích thích' },
    { day: 14, label: '14 Ngày', title: 'Thụ thể Dopamine bắt đầu tăng sinh' },
    { day: 30, label: '30 Ngày', title: 'Thùy trán kiểm soát 80% xung động' },
    { day: 60, label: '60 Ngày', title: 'Phản xạ cơ PC săn chắc & Ngưỡng 7' },
    { day: 84, label: '84 Ngày (12W)', title: 'Tốt nghiệp & Tái cấu trúc thần kinh' },
  ];

  const handleDownloadHTML = () => {
    try {
      const code = generateStandaloneHTML();
      const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'NeuroHealth_Coach_Offline.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      sound.playVictory();
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch {
      // Safe fallback
    }
  };

  const handleCopyHTML = () => {
    try {
      const code = generateStandaloneHTML();
      navigator.clipboard.writeText(code);
      setCopied(true);
      sound.playTick(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-4 pb-24 pt-2">
      {/* Header */}
      <div className="px-1">
        <h2 className="text-xl font-black text-slate-900 dark:text-white">Lộ Trình Phục Hồi 12 Tuần</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Quy trình y khoa tái cấu trúc hệ thần kinh (Neuroplasticity) và phục hồi bản lĩnh nam giới
        </p>
      </div>

      {/* Milestones horizontal bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-4 h-4 text-amber-500" />
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Các Cột Mốc Thần Kinh Trọng Yếu
          </h3>
        </div>

        <div className="space-y-2">
          {milestones.map((ms) => {
            const isReached = progress.currentDay >= ms.day;
            return (
              <div
                key={ms.day}
                className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                  isReached
                    ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 font-medium'
                    : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isReached
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {isReached ? '✓' : ms.day}
                  </div>
                  <div>
                    <span className="font-bold">{ms.label}:</span> {ms.title}
                  </div>
                </div>
                {isReached && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                    Đạt được
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 12-Week Cards List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider px-1">
          Chi Tiết Toàn Bộ 12 Tuần
        </h3>

        {ROADMAP_WEEKS.map((w) => {
          const isCurrent = w.week === currentWeek;
          const isPast = w.week < currentWeek;

          return (
            <div
              key={w.week}
              className={`p-4 rounded-2xl border transition-all ${
                isCurrent
                  ? 'bg-white dark:bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                  : isPast
                  ? 'bg-emerald-50/40 dark:bg-slate-900/60 border-emerald-200 dark:border-slate-800'
                  : 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/60 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-black px-2 py-0.5 rounded-lg ${
                        isCurrent
                          ? 'bg-emerald-500 text-white'
                          : isPast
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      TUẦN {w.week}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      Ngày {(w.week - 1) * 7 + 1} - {w.week * 7}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1.5">{w.title}</h4>
                </div>

                {isPast && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                {isCurrent && (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-full animate-pulse border border-emerald-300 dark:border-emerald-800">
                    ĐANG HỌC
                  </span>
                )}
                {!isPast && !isCurrent && <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-1" />}
              </div>

              <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                <p>
                  🧠 <strong>Thần kinh:</strong> {w.neuroFocus}
                </p>
                <p>
                  ⚡ <strong>Cơ thể:</strong> {w.bodyFocus}
                </p>
                <p>
                  💡 <strong>Thực hành:</strong> {w.dailyAdvice}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Adjustment & LocalStorage Management */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Quản Lý Dữ Liệu & Tùy Chỉnh Lộ Trình
        </h3>

        {/* Change Day Control */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Điều chỉnh Ngày Hiện Tại:
            </span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              Ngày {isEditingDay ? tempDay : progress.currentDay} / 84
            </span>
          </div>

          {isEditingDay ? (
            <div className="mt-3 space-y-2">
              <input
                type="range"
                min="1"
                max="84"
                value={tempDay}
                onChange={(e) => setTempDay(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg accent-emerald-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onUpdateDay(tempDay);
                    setIsEditingDay(false);
                    sound.playTick(true);
                  }}
                  className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
                >
                  Lưu ngày mới
                </button>
                <button
                  onClick={() => {
                    setIsEditingDay(false);
                    setTempDay(progress.currentDay);
                  }}
                  className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs"
                >
                  Hủy
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                setTempDay(progress.currentDay);
                setIsEditingDay(true);
              }}
              className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Nhấn để chuyển sang ngày khác
            </button>
          )}
        </div>

        {/* Single File HTML Export as requested */}
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
              Xuất File HTML Đơn Hoàn Chỉnh (Chạy Offline)
            </h4>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
            Bạn có thể tải về file mã nguồn đơn duy nhất này để mở trực tiếp trên điện thoại hoặc máy tính
            mà không cần mạng Internet hay máy chủ.
          </p>

          <div className="flex gap-2 pt-1">
            <button
              onClick={handleDownloadHTML}
              className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
            >
              {downloadSuccess ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloadSuccess ? 'Đã tải xuống!' : 'Tải File HTML Đơn'}</span>
            </button>

            <button
              onClick={handleCopyHTML}
              className="py-2 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition-transform"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã chép mã!' : 'Sao chép mã'}</span>
            </button>
          </div>
        </div>

        {/* Reset button */}
        <div className="pt-1 text-center">
          <button
            onClick={() => {
              if (
                window.confirm(
                  'Bạn có chắc chắn muốn đặt lại lộ trình về Ngày 1? Toàn bộ chuỗi ngày và checklist sẽ được xóa.'
                )
              ) {
                onResetProgress();
                sound.playTick(false);
              }
            }}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Đặt lại toàn bộ tiến trình về Ngày 1</span>
          </button>
        </div>
      </div>
    </div>
  );
};
