import React, { useState, useEffect } from 'react';
import { ShieldAlert, Droplets, Dumbbell, Wind, X, CheckCircle2, Play, Pause, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface PanicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PanicModal: React.FC<PanicModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [secondsLeft, setSecondsLeft] = useState(180); // 3 minutes emergency cool-off
  const [isRunning, setIsRunning] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<{ [key: number]: boolean }>({});
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(180);
      setIsRunning(true);
      setCompletedSteps({});
      setShowCelebration(false);
      return;
    }

    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, isRunning, secondsLeft]);

  if (!isOpen) return null;

  const toggleStep = (stepIdx: number) => {
    setCompletedSteps((prev) => {
      const next = { ...prev, [stepIdx]: !prev[stepIdx] };
      sound.playTick(true);
      return next;
    });
  };

  const handleFinish = () => {
    sound.playVictory();
    sound.vibrate([100, 50, 200]);
    setShowCelebration(true);
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1800);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const progressPercent = ((180 - secondsLeft) / 180) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-rose-500/30 dark:border-rose-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-rose-500 px-5 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold leading-tight">Cấp Cứu Tâm Lý Khẩn Cấp</h2>
              <p className="text-xs text-rose-100">Bảo vệ thành quả & Làm chủ cơ thể</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Calming neurological prompt */}
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40">
            <h3 className="text-sm font-bold text-rose-800 dark:text-rose-300">
              DỪNG LẠI! CƠN THÈM CHỈ LÀ BẢN NĂNG TẠM THỜI
            </h3>
            <p className="text-xs text-rose-900/80 dark:text-rose-200/80 mt-1 leading-relaxed">
              Bạn không hề cô đơn. Não bạn đang hiểu nhầm sự buồn chán hoặc căng thẳng thành tín hiệu đòi hỏi Dopamine.
              Đỉnh xung động chỉ kéo dài tối đa <strong>7-10 phút</strong> và sẽ tự biến mất!
            </p>
          </div>

          {/* 3-Minute Cool Down Timer */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Thời Gian Hạ Nhiệt Não Bộ
            </span>
            <div className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums my-1">
              {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-3">
              <div
                className="bg-emerald-500 h-full transition-all duration-1000 ease-linear"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isRunning ? 'Tạm dừng' : 'Tiếp tục'}
              </button>
              <button
                onClick={() => {
                  setSecondsLeft(180);
                  setIsRunning(true);
                  sound.playTick();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Đặt lại 3 phút
              </button>
            </div>
          </div>

          {/* 3 Physical Rescue Steps */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              3 Bước Hành Động Cắt Đứt Xung Động
            </h4>

            {/* Step 1 */}
            <div
              onClick={() => toggleStep(1)}
              className={`p-3 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                completedSteps[1]
                  ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                  : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:border-slate-300'
              }`}
            >
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500 shrink-0 mt-0.5">
                <Droplets className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    1. Uống ngay 1 cốc nước thật lạnh
                  </span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                    completedSteps[1] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {completedSteps[1] && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Kích thích dây thần kinh phế vị (Vagus Nerve), hạ nhiệt cơ thể và làm dịu nhịp tim tức thì.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div
              onClick={() => toggleStep(2)}
              className={`p-3 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                completedSteps[2]
                  ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                  : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:border-slate-300'
              }`}
            >
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 shrink-0 mt-0.5">
                <Dumbbell className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    2. 15 cái chống đẩy hoặc rời khỏi phòng
                  </span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                    completedSteps[2] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {completedSteps[2] && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Hút dòng máu dồn từ vùng chậu về các nhóm cơ lớn và cắt đứt hoàn toàn hoàn cảnh kích thích.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div
              onClick={() => toggleStep(3)}
              className={`p-3 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                completedSteps[3]
                  ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                  : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:border-slate-300'
              }`}
            >
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                <Wind className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    3. Thở 4-7-8 làm dịu hạch hạnh nhân
                  </span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                    completedSteps[3] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {completedSteps[3] && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Hít 4s mũi - Giữ 7s - Thở ra 8s miệng. Lặp lại 4 lần để trục HPA ngừng tiết Adrenaline.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          {showCelebration ? (
            <div className="w-full py-3 bg-emerald-500 text-white font-bold text-sm rounded-xl text-center animate-bounce">
              🎉 TUYỆT VỜI! BẠN ĐÃ CHIẾN THẮNG BẢN THÂN!
            </div>
          ) : (
            <button
              onClick={handleFinish}
              className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-transform"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Tôi Đã Kiểm Soát Được Tình Hình</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
