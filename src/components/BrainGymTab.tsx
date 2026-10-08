import React, { useState, useEffect } from 'react';
import {
  Brain,
  Sliders,
  Anchor,
  Wind,
  Activity,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
} from 'lucide-react';
import { sound } from '../utils/audio';

interface BrainGymTabProps {
  initialExercise?: 'delay' | 'breath' | 'kegel' | 'scale';
}

export const BrainGymTab: React.FC<BrainGymTabProps> = ({ initialExercise = 'delay' }) => {
  const [activeModule, setActiveModule] = useState<'delay' | 'scale' | 'anchor' | 'breath' | 'kegel'>(
    initialExercise || 'delay'
  );

  // 10-Minute Urge Delay State
  const [delaySeconds, setDelaySeconds] = useState(600); // 10 mins
  const [isDelayRunning, setIsDelayRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isDelayRunning && delaySeconds > 0) {
      timer = setInterval(() => {
        setDelaySeconds((prev) => {
          if (prev <= 1) {
            sound.playVictory();
            return 0;
          }
          if (prev % 60 === 0) {
            sound.playChime(528);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isDelayRunning, delaySeconds]);

  // Arousal Scale 1-10 State
  const [arousalLevel, setArousalLevel] = useState<number>(7);

  // Anchoring Exercise State
  const [anchorStep, setAnchorStep] = useState<number>(1);
  const [anchorReps, setAnchorReps] = useState<number>(0);

  // Breathing Box 4-4-4 State
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [breathCount, setBreathCount] = useState<number>(4);
  const [isBreathRunning, setIsBreathRunning] = useState<boolean>(false);
  const [breathTotalSeconds, setBreathTotalSeconds] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isBreathRunning) {
      interval = setInterval(() => {
        setBreathTotalSeconds((s) => s + 1);
        setBreathCount((prev) => {
          if (prev > 1) return prev - 1;
          // Switch phase
          setBreathPhase((currentPhase) => {
            sound.playTick(currentPhase === 'inhale' || currentPhase === 'hold2');
            if (currentPhase === 'inhale') return 'hold1';
            if (currentPhase === 'hold1') return 'exhale';
            if (currentPhase === 'exhale') return 'hold2';
            return 'inhale';
          });
          return 4;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBreathRunning]);

  // Kegel 3-Set Trainer State
  // Reps: 10 per set. Contraction: 5s, Relax: 5s. Rest between sets: 30s.
  const [kegelSet, setKegelSet] = useState<number>(1);
  const [kegelRep, setKegelRep] = useState<number>(1);
  const [kegelState, setKegelState] = useState<'contract' | 'relax' | 'resting' | 'finished'>('relax');
  const [kegelTimer, setKegelTimer] = useState<number>(5);
  const [isKegelRunning, setIsKegelRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isKegelRunning && kegelState !== 'finished') {
      interval = setInterval(() => {
        setKegelTimer((prev) => {
          if (prev > 1) return prev - 1;

          // Transition logic
          if (kegelState === 'contract') {
            sound.playTick(false);
            setKegelState('relax');
            return 5;
          } else if (kegelState === 'relax') {
            sound.playTick(true);
            if (kegelRep < 10) {
              setKegelRep((r) => r + 1);
              setKegelState('contract');
              return 5;
            } else {
              // Finished 10 reps of this set
              if (kegelSet < 3) {
                sound.playChime(600);
                setKegelState('resting');
                return 30; // 30s rest
              } else {
                sound.playVictory();
                setKegelState('finished');
                return 0;
              }
            }
          } else if (kegelState === 'resting') {
            sound.playChime(528);
            setKegelSet((s) => s + 1);
            setKegelRep(1);
            setKegelState('contract');
            return 5;
          }
          return 5;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isKegelRunning, kegelState, kegelRep, kegelSet]);

  return (
    <div className="space-y-4 pb-24 pt-2">
      {/* Header Info */}
      <div className="px-1">
        <h2 className="text-xl font-black text-slate-900 dark:text-white">Phòng Luyện Phản Xạ Não Bộ</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Tái cấu trúc rãnh thần kinh, làm chủ xung động và rèn luyện cơ sàn chậu
        </p>
      </div>

      {/* Module Selector (Segmented Tabs) */}
      <div className="flex overflow-x-auto gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 scrollbar-none">
        <button
          onClick={() => setActiveModule('delay')}
          className={`flex-1 min-w-[76px] py-2 px-2 text-[11px] font-bold rounded-xl whitespace-nowrap transition-all ${
            activeModule === 'delay'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Trì Hoãn 10p
        </button>

        <button
          onClick={() => setActiveModule('scale')}
          className={`flex-1 min-w-[76px] py-2 px-2 text-[11px] font-bold rounded-xl whitespace-nowrap transition-all ${
            activeModule === 'scale'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Thang Đo 1-10
        </button>

        <button
          onClick={() => setActiveModule('anchor')}
          className={`flex-1 min-w-[76px] py-2 px-2 text-[11px] font-bold rounded-xl whitespace-nowrap transition-all ${
            activeModule === 'anchor'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Neo Tâm Lý
        </button>

        <button
          onClick={() => setActiveModule('breath')}
          className={`flex-1 min-w-[76px] py-2 px-2 text-[11px] font-bold rounded-xl whitespace-nowrap transition-all ${
            activeModule === 'breath'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Thở 4-4-4
        </button>

        <button
          onClick={() => setActiveModule('kegel')}
          className={`flex-1 min-w-[76px] py-2 px-2 text-[11px] font-bold rounded-xl whitespace-nowrap transition-all ${
            activeModule === 'kegel'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Kegel 3 Hiệp
        </button>
      </div>

      {/* MODULE 1: 10-MIN URGE DELAY (LƯỚT SÓNG XUNG ĐỘNG) */}
      {activeModule === 'delay' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Brain className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Bài Tập Trì Hoãn 10 Phút (Urge Surfing)
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Cơn thèm Dopamine giống như một cơn sóng biển. Thay vì chống cự làm sóng đập mạnh hơn, bạn hãy
              "lướt trên con sóng" bằng cách quan sát cảm giác cơ thể trong 10 phút.
            </p>

            {/* Big Countdown */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Đồng Hồ Đếm Ngược Não Bộ
              </span>
              <div className="text-5xl font-black font-mono tabular-nums text-slate-900 dark:text-white my-2 tracking-tight">
                {String(Math.floor(delaySeconds / 60)).padStart(2, '0')}:
                {String(delaySeconds % 60).padStart(2, '0')}
              </div>

              {/* Progress track */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mb-4">
                <div
                  className="bg-emerald-500 h-full transition-all duration-1000 ease-linear"
                  style={{ width: `${((600 - delaySeconds) / 600) * 100}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setIsDelayRunning(!isDelayRunning);
                    sound.playTick(true);
                  }}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-transform active:scale-95 ${
                    isDelayRunning
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
                  }`}
                >
                  {isDelayRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isDelayRunning ? 'Tạm Dừng' : 'Bắt Đầu Đếm Ngược'}</span>
                </button>
                <button
                  onClick={() => {
                    setDelaySeconds(600);
                    setIsDelayRunning(false);
                    sound.playTick(false);
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Đặt lại</span>
                </button>
              </div>
            </div>

            {/* Neurological instructions */}
            <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Quy Trình 3 Bước Trong 10 Phút:
              </h4>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                1. <strong>Nhận diện (Phút 1-3):</strong> Gọi tên cảm giác: "Tôi đang bồn chồn vì não đòi
                Dopamine, cơ thể tôi hoàn toàn an toàn".
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                2. <strong>Hạ nhiệt (Phút 4-7):</strong> Thở bụng sâu, tưởng tượng một làn nước mát dội từ đỉnh
                đầu xuống vùng bụng và xương chậu.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                3. <strong>Giải phóng (Phút 8-10):</strong> Cơn sóng đạt đỉnh và rút đi. Bạn đã bảo vệ được
                hàng triệu tế bào thần kinh quý giá!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: THANG ĐO KÍCH THÍCH 1-10 & NGƯỠNG 7 */}
      {activeModule === 'scale' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Thang Đo Kích Thích 1-10 & Quy Tắc Ngưỡng 7
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Xuất tinh sớm xảy ra khi bạn không nhận diện được lúc nào cơ thể vượt qua "Điểm không thể quay đầu"
              (Point of Inevitability). Hãy luyện tập điều chỉnh thanh trượt để học cách nhận diện:
            </p>

            {/* Interactive Slider */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-center">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-slate-500">Mức 1: Thư giãn</span>
                <span className="text-rose-500 font-bold">Mức 10: Xuất tinh</span>
              </div>

              {/* Range Input */}
              <input
                type="range"
                min="1"
                max="10"
                value={arousalLevel}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setArousalLevel(val);
                  sound.playTick(val >= 7);
                }}
                className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />

              {/* Large Indicator */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black font-mono text-white shadow-md ${
                    arousalLevel <= 3
                      ? 'bg-sky-500'
                      : arousalLevel <= 6
                      ? 'bg-emerald-500'
                      : arousalLevel === 7
                      ? 'bg-amber-500 animate-pulse ring-4 ring-amber-400/40'
                      : 'bg-rose-500'
                  }`}
                >
                  {arousalLevel}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {arousalLevel <= 3 && 'Giai đoạn 1-3: Thư giãn & Kiểm soát cao'}
                    {arousalLevel >= 4 && arousalLevel <= 6 && 'Giai đoạn 4-6: Hưng phấn tăng dần'}
                    {arousalLevel === 7 && 'MỨC 7: ĐIỂM DỪNG VÀNG (Stop-Start)'}
                    {arousalLevel >= 8 && 'Giai đoạn 8-10: Quá ngưỡng kiểm soát'}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {arousalLevel === 7 ? '⚠️ DỪNG KÍCH THÍCH NGAY LẬP TỨC 30 GIÂY' : 'Kéo thanh trượt để xem hướng dẫn'}
                  </div>
                </div>
              </div>
            </div>

            {/* Level 7 Deep Dive Alert */}
            <div
              className={`p-4 rounded-2xl border transition-all mt-4 ${
                arousalLevel === 7
                  ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300">
                    NGƯỠNG 7 - RANH GIỚI SINH TỬ CỦA BẢN LĨNH
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Ở mức 7, cơ đáy chậu bắt đầu co rút không tự chủ. Nếu tiếp tục kích thích lên mức 8, hệ thần
                    kinh giao cảm sẽ bắn tín hiệu xuất tinh qua tủy sống và không thể đảo ngược.
                  </p>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
                    ✓ Giải pháp tại Mức 7: Dừng chuyển động 30s + Thở bụng thật sâu + Thả lỏng toàn bộ cơ hậu
                    môn để hạ mức hưng phấn về 5.
                  </p>
                </div>
              </div>
            </div>

            {/* Comparative Breakdown Table */}
            <div className="mt-4 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Chi Tiết Từng Mức Trên Thang Đo
              </h4>
              <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/30 flex justify-between">
                  <span>
                    <strong>1 - 3:</strong> Nhịp thở đều, cơ thể thả lỏng
                  </span>
                  <span className="text-sky-500 font-medium">Phó giao cảm</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/30 flex justify-between">
                  <span>
                    <strong>4 - 6:</strong> Cương cứng tốt, khoái cảm tăng
                  </span>
                  <span className="text-emerald-500 font-medium">Làm chủ tốt</span>
                </div>
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 flex justify-between font-bold text-amber-600 dark:text-amber-400">
                  <span>
                    <strong>7:</strong> Thở dồn, tinh hoàn co rút
                  </span>
                  <span>BUỘC PHẢI DỪNG</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/30 flex justify-between text-rose-500">
                  <span>
                    <strong>8 - 10:</strong> Cơ PC giật bắn, xuất tinh
                  </span>
                  <span>Mất kiểm soát</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 3: BÀI TẬP NEO TÂM LÝ TỰ TIN (ANCHORING) */}
      {activeModule === 'anchor' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <Anchor className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Bài Tập Neo Tâm Lý Tự Tin (Neuro Anchoring)
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Kỹ thuật Lập trình Ngôn ngữ Tư duy (NLP) giúp gắn kết một hành động vật lý (bấm ngón tay) với trạng
              thái tâm lý bình thản, kiêu hãnh của bạn.
            </p>

            {/* Stepper */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Bước {anchorStep} / 4
                </span>
                <span className="text-xs text-slate-500 font-mono">Đã thực hiện: {anchorReps} lần</span>
              </div>

              {/* Step details */}
              {anchorStep === 1 && (
                <div className="space-y-2 animate-in fade-in">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    1. Gợi lại ký ức vinh quang nhất
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Nhắm mắt lại trong 30 giây. Nhớ về một khoảnh khắc bạn cảm thấy tự tin, tự hào và kiểm soát
                    mọi thứ tốt nhất trong đời (khi chiến thắng một cuộc thi, hoàn thành mục tiêu, hoặc được tôn trọng).
                  </p>
                </div>
              )}

              {anchorStep === 2 && (
                <div className="space-y-2 animate-in fade-in">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    2. Khuếch đại cảm xúc cơ thể
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Cảm nhận luồng nhiệt ấm dâng lên trong lồng ngực. Mắt sáng lên, vai mở rộng, hơi thở sâu và
                    vững vàng như một ngọn núi.
                  </p>
                </div>
              )}

              {anchorStep === 3 && (
                <div className="space-y-2 animate-in fade-in">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    3. Bấm chặt ngón cái và ngón trỏ tay trái
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Ngay tại đỉnh điểm của cảm xúc tự tin, siết chặt hai đầu ngón tay lại trong 5 giây. Đồng
                    thời hít một hơi thật sâu.
                  </p>
                </div>
              )}

              {anchorStep === 4 && (
                <div className="space-y-2 animate-in fade-in">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    4. Khẳng định thần kinh
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Nhủ thầm trong tâm trí: <em>"Tôi làm chủ năng lượng và bản lĩnh của chính mình"</em>. Sau đó
                    thả lỏng tay. Rãnh thần kinh phản xạ có điều kiện đã được củng cố!
                  </p>
                </div>
              )}

              {/* Next Step Button */}
              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => {
                    if (anchorStep < 4) {
                      setAnchorStep((s) => s + 1);
                      sound.playTick(true);
                    } else {
                      setAnchorStep(1);
                      setAnchorReps((r) => r + 1);
                      sound.playVictory();
                    }
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95 transition-transform"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{anchorStep < 4 ? 'Tiếp Theo' : 'Hoàn Thành 1 Lượt Neo (+1)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 4: TẬP THỞ 4-4-4 (BOX BREATHING / HRV) */}
      {activeModule === 'breath' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                <Wind className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Bộ Hướng Dẫn Thở Sâu 4-4-4 (Box Breathing)
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Kỹ thuật của lính đặc nhiệm Navy SEALs để lập tức đưa nhịp tim và hệ thần kinh về trạng thái cân bằng,
              triệt tiêu hoàn toàn phản xạ co giật vùng chậu khi lo âu.
            </p>

            {/* Pacing Visualizer */}
            <div className="py-8 px-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* Animated Pulsing Ring */}
                <div
                  className={`absolute rounded-full transition-all duration-1000 ease-in-out border-4 ${
                    breathPhase === 'inhale'
                      ? 'w-44 h-44 bg-sky-500/20 border-sky-500 scale-105'
                      : breathPhase === 'hold1'
                      ? 'w-44 h-44 bg-indigo-500/20 border-indigo-500 scale-100'
                      : breathPhase === 'exhale'
                      ? 'w-24 h-24 bg-emerald-500/20 border-emerald-500 scale-90'
                      : 'w-24 h-24 bg-amber-500/20 border-amber-500 scale-90'
                  }`}
                />

                {/* Inner Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {breathPhase === 'inhale' && 'Hít Vào Mũi'}
                    {breathPhase === 'hold1' && 'Giữ Hơi Thở'}
                    {breathPhase === 'exhale' && 'Thở Ra Chậm'}
                    {breathPhase === 'hold2' && 'Nín Thở'}
                  </span>
                  <span className="text-4xl font-black font-mono my-1 text-slate-900 dark:text-white">
                    {breathCount}s
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Tổng: {Math.floor(breathTotalSeconds / 60)}p {breathTotalSeconds % 60}s
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsBreathRunning(!isBreathRunning);
                    sound.playTick(true);
                  }}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-transform active:scale-95 ${
                    isBreathRunning
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20'
                  }`}
                >
                  {isBreathRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isBreathRunning ? 'Tạm Dừng' : 'Bắt Đầu Thở Cùng Nhịp'}</span>
                </button>
                <button
                  onClick={() => {
                    setIsBreathRunning(false);
                    setBreathPhase('inhale');
                    setBreathCount(4);
                    setBreathTotalSeconds(0);
                    sound.playTick(false);
                  }}
                  className="px-3 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 5: HUẤN LUYỆN KEGEL 3 HIỆP */}
      {activeModule === 'kegel' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Huấn Luyện Cơ Đáy Chậu Kegel (3 Hiệp Chuẩn Y Khoa)
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Lộ trình 3 hiệp: Mỗi hiệp 10 nhịp. Siết cơ PC 5 giây - Thả lỏng 5 giây. Nghỉ 30 giây giữa các
              hiệp. Giúp tăng sức mạnh van giữ tinh hoàn toàn tự chủ.
            </p>

            {/* Kegel Action Card */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-center">
              {/* Set and Rep Header */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-4 px-2">
                <span>HIỆP {kegelSet} / 3</span>
                <span>NHỊP {kegelRep} / 10</span>
              </div>

              {/* State Display */}
              <div
                className={`py-6 px-4 rounded-2xl transition-all duration-300 ${
                  kegelState === 'contract'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-102 ring-4 ring-purple-300 dark:ring-purple-900'
                    : kegelState === 'relax'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : kegelState === 'resting'
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-800 text-white'
                }`}
              >
                <div className="text-xs font-extrabold uppercase tracking-widest">
                  {kegelState === 'contract' && 'SIẾT CHẶT CƠ ĐÁY CHẬU (PC)'}
                  {kegelState === 'relax' && 'THẢ LỎNG HOÀN TOÀN CƠ PC'}
                  {kegelState === 'resting' && 'NGHỈ GIẢI LAO GIỮA CÁC HIỆP'}
                  {kegelState === 'finished' && 'ĐÃ HOÀN THÀNH XUẤT SẮC 3 HIỆP!'}
                </div>
                <div className="text-5xl font-black font-mono tabular-nums my-2">
                  {kegelState === 'finished' ? '✓' : `${kegelTimer}s`}
                </div>
                <div className="text-[11px] opacity-90">
                  {kegelState === 'contract' && 'Hóp hậu môn lên như đang nhịn tiểu, không nín thở'}
                  {kegelState === 'relax' && 'Thả lỏng toàn bộ cơ chậu, hít thở bụng sâu'}
                  {kegelState === 'resting' && 'Thư giãn cơ bắp, chuẩn bị cho hiệp kế tiếp'}
                  {kegelState === 'finished' && 'Bạn đã hoàn thành bài tập Kegel hôm nay!'}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3 mt-5">
                {kegelState !== 'finished' && (
                  <button
                    onClick={() => {
                      setIsKegelRunning(!isKegelRunning);
                      sound.playTick(true);
                    }}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-transform active:scale-95 ${
                      isKegelRunning
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20'
                    }`}
                  >
                    {isKegelRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isKegelRunning ? 'Tạm Dừng' : 'Bắt Đầu Tập'}</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setIsKegelRunning(false);
                    setKegelSet(1);
                    setKegelRep(1);
                    setKegelState('relax');
                    setKegelTimer(5);
                    sound.playTick(false);
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Đặt lại</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
