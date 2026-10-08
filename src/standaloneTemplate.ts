// Generates the complete, standalone single-file HTML code with Tailwind CDN, embedded SVG icons and pure JavaScript
export function generateStandaloneHTML(): string {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>NeuroHealth Coach - Trợ Lý Phục Hồi Sinh Lý & Phản Xạ Não Bộ</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#ecfdf5',
              500: '#10b981',
              600: '#059669',
              700: '#047857',
            }
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    .scrollbar-none::-webkit-scrollbar { display: none; }
    .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col items-center">
  <div id="app" class="w-full max-w-md min-h-screen flex flex-col bg-slate-900 border-x border-slate-800 relative pb-20">
    <!-- Top Header -->
    <header class="sticky top-0 z-30 w-full backdrop-blur-md bg-slate-950/90 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/30">
          NH
        </div>
        <div>
          <h1 class="text-sm font-bold text-white leading-tight">NeuroHealth Coach</h1>
          <p id="headerStreak" class="text-[11px] text-amber-400 font-semibold">🔥 1 ngày kỷ luật · 12 Tuần</p>
        </div>
      </div>
      <button onclick="openPanicModal()" class="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/30 animate-pulse">
        CẤP CỨU
      </button>
    </header>

    <!-- Main Content Container -->
    <main id="mainContent" class="flex-1 p-4 overflow-y-auto space-y-4">
      <!-- Injected dynamically via JS -->
    </main>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 max-w-md w-full z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 grid grid-cols-4 h-16 items-center px-1">
      <button onclick="setTab('dashboard')" id="nav-dashboard" class="flex flex-col items-center justify-center text-emerald-400 py-1 font-semibold">
        <span class="text-base">📊</span>
        <span class="text-[10px] mt-0.5">Tiến độ</span>
      </button>
      <button onclick="setTab('braingym')" id="nav-braingym" class="flex flex-col items-center justify-center text-slate-400 py-1">
        <span class="text-base">🧠</span>
        <span class="text-[10px] mt-0.5">Luyện não</span>
      </button>
      <button onclick="setTab('aicoach')" id="nav-aicoach" class="flex flex-col items-center justify-center text-slate-400 py-1">
        <span class="text-base">🩺</span>
        <span class="text-[10px] mt-0.5">Bác sĩ AI</span>
      </button>
      <button onclick="setTab('roadmap')" id="nav-roadmap" class="flex flex-col items-center justify-center text-slate-400 py-1">
        <span class="text-base">🗺️</span>
        <span class="text-[10px] mt-0.5">Lộ trình</span>
      </button>
    </nav>

    <!-- Panic Emergency Modal -->
    <div id="panicModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div class="w-full max-w-md bg-slate-900 border border-rose-500/40 rounded-3xl p-5 shadow-2xl text-center space-y-4">
        <div class="w-12 h-12 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto text-2xl font-bold">
          ⚠️
        </div>
        <h2 class="text-lg font-black text-rose-400">DỪNG LẠI! HÃY HẠ NHIỆT NÃO BỘ</h2>
        <p class="text-xs text-slate-300 leading-relaxed">
          Cơn thèm chỉ là phản xạ đòi Dopamine trong 7-10 phút. Bạn hoàn toàn làm chủ!
        </p>
        <div class="p-3 rounded-2xl bg-slate-800/80 text-left space-y-2 text-xs">
          <p>💧 <strong>1. Uống ngay 1 cốc nước lạnh lớn</strong> (kích thích phó giao cảm)</p>
          <p>💪 <strong>2. Chống đẩy 15 cái</strong> (chuyển dòng máu khỏi vùng chậu)</p>
          <p>🌬️ <strong>3. Thở 4-7-8</strong> (hít 4s, giữ 7s, thở ra miệng 8s)</p>
        </div>
        <div class="text-3xl font-mono font-bold text-white" id="panicTimer">03:00</div>
        <button onclick="resolvePanic()" class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl">
          Tôi Đã Kiểm Soát Được Tình Hình
        </button>
        <button onclick="closePanicModal()" class="text-xs text-slate-400 hover:text-white">Đóng cửa sổ</button>
      </div>
    </div>
  </div>

  <script>
    // Audio synthesizer
    function playBeep(freq = 440) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        gain.gain.value = 0.1;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } catch (e) {}
    }

    // App state
    let state = {
      currentTab: 'dashboard',
      day: parseInt(localStorage.getItem('nh_day') || '1'),
      streak: parseInt(localStorage.getItem('nh_streak') || '1'),
      tasks: JSON.parse(localStorage.getItem('nh_tasks') || '{}'),
      panicReliefs: parseInt(localStorage.getItem('nh_panic') || '0'),
      gymModule: 'delay',
      delaySec: 600,
      delayRunning: false,
      delayTimerId: null,
      arousal: 7,
      chat: [
        { sender: 'doc', text: 'Chào bạn! Tôi là Bác sĩ Minh Triết. Bạn đang có câu hỏi hay cần hỗ trợ gì về lộ trình phục hồi thần kinh - sinh lý 12 tuần không?' }
      ]
    };

    function saveState() {
      localStorage.setItem('nh_day', state.day);
      localStorage.setItem('nh_streak', state.streak);
      localStorage.setItem('nh_tasks', JSON.stringify(state.tasks));
      localStorage.setItem('nh_panic', state.panicReliefs);
    }

    function setTab(tab) {
      state.currentTab = tab;
      ['dashboard', 'braingym', 'aicoach', 'roadmap'].forEach(t => {
        const el = document.getElementById('nav-' + t);
        if (el) {
          if (t === tab) {
            el.className = 'flex flex-col items-center justify-center text-emerald-400 py-1 font-semibold';
          } else {
            el.className = 'flex flex-col items-center justify-center text-slate-400 py-1';
          }
        }
      });
      render();
    }

    function toggleTask(taskId) {
      state.tasks[taskId] = !state.tasks[taskId];
      playBeep(520);
      saveState();
      render();
    }

    function advanceDay() {
      state.day = Math.min(84, state.day + 1);
      state.streak += 1;
      state.tasks = {};
      playBeep(660);
      saveState();
      alert('Tuyệt vời! Đã hoàn thành ngày và chuyển sang Ngày ' + state.day + '!');
      render();
    }

    // Panic modal handlers
    let panicInterval = null;
    let panicSecs = 180;
    function openPanicModal() {
      document.getElementById('panicModal').classList.remove('hidden');
      panicSecs = 180;
      clearInterval(panicInterval);
      panicInterval = setInterval(() => {
        if (panicSecs > 0) {
          panicSecs--;
          const m = String(Math.floor(panicSecs / 60)).padStart(2, '0');
          const s = String(panicSecs % 60).padStart(2, '0');
          document.getElementById('panicTimer').innerText = m + ':' + s;
        }
      }, 1000);
    }
    function closePanicModal() {
      document.getElementById('panicModal').classList.add('hidden');
      clearInterval(panicInterval);
    }
    function resolvePanic() {
      state.panicReliefs += 1;
      saveState();
      closePanicModal();
      alert('Chúc mừng bạn đã xuất sắc chiến thắng cơn thèm!');
      render();
    }

    function renderDashboard() {
      const week = Math.min(12, Math.ceil(state.day / 7));
      const tasks = [
        { id: 't1', title: 'Không xem phim khiêu dâm / Thủ dâm vô thức', desc: 'Bảo vệ thụ thể Dopamine não bộ' },
        { id: 't2', title: 'Hoàn thành bài tập Trì hoãn 10 phút (Chống thèm)', desc: 'Luyện thùy trán kiểm soát xung động' },
        { id: 't3', title: 'Tập hít thở sâu giảm căng thẳng (10 phút)', desc: 'Kích hoạt hệ thần kinh phó giao cảm' },
        { id: 't4', title: 'Hoàn thành 3 hiệp bài tập Kegel', desc: 'Tăng cường sức mạnh cơ đáy chậu' },
      ];

      return \`
        <div class="rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-950 p-5 border border-emerald-500/20 text-white">
          <div class="flex justify-between items-start">
            <div>
              <span class="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Lộ trình 12 tuần</span>
              <h2 class="text-2xl font-black">Ngày \${state.day} <span class="text-slate-400 text-sm">/ 84</span></h2>
              <p class="text-xs text-slate-300">Tuần \${week}: Giai đoạn tái cấu trúc phản xạ</p>
            </div>
            <div class="bg-white/10 px-3 py-1.5 rounded-xl text-center">
              <span class="text-lg font-black font-mono text-amber-400">\${state.streak}</span>
              <div class="text-[9px] text-slate-300">Chuỗi ngày</div>
            </div>
          </div>
          <div class="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
            <div class="bg-emerald-500 h-full" style="width: \${(state.day/84)*100}%"></div>
          </div>
        </div>

        <div class="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl text-xs text-emerald-300">
          💡 <em>"Cơn thèm chỉ là cơn sóng dopamine 10 phút, bạn hoàn toàn làm chủ cơ thể."</em>
        </div>

        <div class="space-y-2">
          <h3 class="text-xs font-bold uppercase text-slate-400 px-1">Checklist Nhiệm Vụ Hôm Nay</h3>
          \${tasks.map(t => {
            const done = !!state.tasks[t.id];
            return \`
              <div onclick="toggleTask('\${t.id}')" class="p-3 rounded-2xl border cursor-pointer flex items-start gap-3 \${done ? 'bg-emerald-950/20 border-emerald-800 text-emerald-200' : 'bg-slate-800/50 border-slate-700/60 text-white'}">
                <span class="text-lg">\${done ? '✅' : '⚪'}</span>
                <div>
                  <div class="text-xs font-bold \${done ? 'line-through text-slate-400' : ''}">\${t.title}</div>
                  <div class="text-[11px] text-slate-400">\${t.desc}</div>
                </div>
              </div>
            \`;
          }).join('')}
        </div>

        <button onclick="advanceDay()" class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg mt-3">
          Hoàn Thành Ngày Hôm Nay & Sang Ngày Mới
        </button>
      \`;
    }

    function renderBrainGym() {
      return \`
        <div class="space-y-4">
          <h2 class="text-lg font-bold text-white">Phòng Luyện Phản Xạ Não Bộ</h2>
          
          <!-- Module 1: 10 Min Delay -->
          <div class="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
            <h3 class="text-sm font-bold text-emerald-400">1. Bộ Đếm 10 Phút Trì Hoãn (Chống thèm)</h3>
            <p class="text-xs text-slate-300">Khi thèm, bấm chạy bộ đếm và ngồi thở sâu trong 10 phút để vượt đỉnh Dopamine.</p>
            <div class="text-4xl font-mono font-bold text-center text-white my-2" id="delayTimerDisplay">10:00</div>
            <div class="flex justify-center gap-2">
              <button onclick="toggleDelayTimer()" id="btnDelay" class="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl">Bắt Đầu</button>
              <button onclick="resetDelayTimer()" class="px-4 py-2 bg-slate-700 text-slate-300 text-xs rounded-xl">Đặt lại</button>
            </div>
          </div>

          <!-- Module 2: Scale 1-10 -->
          <div class="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
            <h3 class="text-sm font-bold text-indigo-400">2. Thang Đo Kích Thích (Ngưỡng 7 Điểm Dừng)</h3>
            <p class="text-xs text-slate-300">Kéo thang đo để xem ranh giới vàng:</p>
            <input type="range" min="1" max="10" value="\${state.arousal}" onchange="changeArousal(this.value)" class="w-full accent-emerald-500">
            <div class="p-3 rounded-xl \${state.arousal == 7 ? 'bg-amber-500/20 border border-amber-500 text-amber-200' : 'bg-slate-900 text-white'} text-xs">
              <strong>Mức \${state.arousal}/10:</strong> 
              \${state.arousal <= 3 ? 'Thư giãn, làm chủ hoàn toàn' : state.arousal <= 6 ? 'Hưng phấn tăng' : state.arousal == 7 ? '⚠️ ĐIỂM DỪNG: Dừng ngay 30s + Thở bụng để không vượt ngưỡng!' : 'Mất kiểm soát, phóng tinh'}
            </div>
          </div>

          <!-- Module 3: Anchoring -->
          <div class="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <h3 class="text-sm font-bold text-teal-400">3. Neo Tâm Lý Tự Tin</h3>
            <p class="text-xs text-slate-300">1. Nhớ lại lúc kiêu hãnh nhất. 2. Hít sâu đầy lồng ngực. 3. Bấm chặt ngón cái + ngón trỏ tay trái 5 giây và nhủ thầm: "Tôi làm chủ bản lĩnh".</p>
          </div>
        </div>
      \`;
    }

    function toggleDelayTimer() {
      if (state.delayRunning) {
        clearInterval(state.delayTimerId);
        state.delayRunning = false;
        document.getElementById('btnDelay').innerText = 'Tiếp Tục';
      } else {
        state.delayRunning = true;
        document.getElementById('btnDelay').innerText = 'Tạm Dừng';
        state.delayTimerId = setInterval(() => {
          if (state.delaySec > 0) {
            state.delaySec--;
            const m = String(Math.floor(state.delaySec / 60)).padStart(2, '0');
            const s = String(state.delaySec % 60).padStart(2, '0');
            const el = document.getElementById('delayTimerDisplay');
            if (el) el.innerText = m + ':' + s;
          } else {
            clearInterval(state.delayTimerId);
            state.delayRunning = false;
            playBeep(880);
            alert('Xuất sắc! Bạn đã vượt qua 10 phút trì hoãn thành công!');
          }
        }, 1000);
      }
    }

    function resetDelayTimer() {
      clearInterval(state.delayTimerId);
      state.delayRunning = false;
      state.delaySec = 600;
      const el = document.getElementById('delayTimerDisplay');
      if (el) el.innerText = '10:00';
      const btn = document.getElementById('btnDelay');
      if (btn) btn.innerText = 'Bắt Đầu';
    }

    function changeArousal(val) {
      state.arousal = parseInt(val);
      render();
    }

    function renderAICoach() {
      return \`
        <div class="space-y-3">
          <div class="p-3 bg-slate-800/80 rounded-2xl flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">BS</div>
            <div>
              <h3 class="text-xs font-bold text-white">BS. Minh Triết</h3>
              <p class="text-[10px] text-emerald-400">Cố vấn Phục hồi Nam học & Thần kinh</p>
            </div>
          </div>

          <div class="space-y-2 max-h-[50vh] overflow-y-auto p-1">
            \${state.chat.map(m => \`
              <div class="p-3 rounded-2xl text-xs leading-relaxed \${m.sender === 'doc' ? 'bg-slate-800 text-slate-200' : 'bg-emerald-600 text-white ml-auto max-w-[80%]' }">
                \${m.text}
              </div>
            \`).join('')}
          </div>

          <div class="flex gap-1.5 overflow-x-auto py-1 text-xs">
            <button onclick="askCoach('Tôi đang thèm thủ dâm, làm sao vượt qua?')" class="px-2.5 py-1 bg-slate-800 rounded-lg whitespace-nowrap text-slate-300">🔥 Đang rất thèm</button>
            <button onclick="askCoach('Hướng dẫn tôi bài tập trì hoãn')" class="px-2.5 py-1 bg-slate-800 rounded-lg whitespace-nowrap text-slate-300">⏳ Bài tập trì hoãn</button>
            <button onclick="askCoach('Mức 7 trên thang đo là gì?')" class="px-2.5 py-1 bg-slate-800 rounded-lg whitespace-nowrap text-slate-300">🎯 Mức 7 là gì?</button>
          </div>

          <div class="flex gap-2">
            <input id="chatInput" type="text" placeholder="Hỏi bác sĩ bất cứ điều gì..." class="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
            <button onclick="sendUserChat()" class="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl">Gửi</button>
          </div>
        </div>
      \`;
    }

    function askCoach(q) {
      document.getElementById('chatInput').value = q;
      sendUserChat();
    }

    function sendUserChat() {
      const input = document.getElementById('chatInput');
      const text = input ? input.value.trim() : '';
      if (!text) return;
      state.chat.push({ sender: 'user', text });
      input.value = '';
      render();

      setTimeout(() => {
        let reply = 'Bác sĩ rất hiểu chia sẻ của bạn. Khi phục hồi phản xạ thần kinh, bạn cần nhớ: Đừng tự trách mình khi có cơn thèm, hãy chuyển hướng cơ thể ngay bằng nước lạnh hoặc bài tập thở 4-4-4 nhé!';
        if (text.includes('thèm')) {
          reply = 'Cơn thèm Dopamine chỉ là xung động 7-10 phút. Bạn hãy thực hiện ngay 3 bước: 1. Uống cốc nước lạnh. 2. 15 cái chống đẩy. 3. Thở 4-7-8 làm dịu hạch hạnh nhân!';
        } else if (text.includes('trì hoãn')) {
          reply = 'Bài tập Trì hoãn 10 phút: Ngồi thẳng lưng, nhắm mắt quan sát cơn sóng ham muốn mà không hành động. Sau 10 phút, dopamine kích thích sẽ tự hạ nhiệt.';
        } else if (text.includes('mức 7')) {
          reply = 'Mức 7 là ngưỡng vàng! Nhận diện: thở dồn, cơ sàn chậu co rút. Hành động: DỪNG NGAY 30s + Thở bụng thả lỏng cơ đáy chậu.';
        }
        state.chat.push({ sender: 'doc', text: reply });
        render();
      }, 500);
    }

    function renderRoadmap() {
      return \`
        <div class="space-y-4">
          <h2 class="text-lg font-bold text-white">Lộ Trình Phục Hồi 12 Tuần</h2>
          <div class="space-y-2 text-xs">
            <div class="p-3 rounded-2xl bg-slate-800 border border-slate-700">
              <strong class="text-emerald-400">Tuần 1 - 2:</strong> Giải độc Dopamine & Cắt rãnh cũ
            </div>
            <div class="p-3 rounded-2xl bg-slate-800 border border-slate-700">
              <strong class="text-indigo-400">Tuần 3 - 4:</strong> Tái cân bằng thụ thể & Tăng nhạy cảm tự nhiên
            </div>
            <div class="p-3 rounded-2xl bg-slate-800 border border-slate-700">
              <strong class="text-teal-400">Tuần 5 - 8:</strong> Huấn luyện cơ đáy chậu (Kegel) & Ngưỡng 7
            </div>
            <div class="p-3 rounded-2xl bg-slate-800 border border-slate-700">
              <strong class="text-purple-400">Tuần 9 - 12:</strong> Làm chủ phản xạ não bộ & Bản lĩnh vững vàng
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-slate-800/40 border border-slate-700 text-center space-y-2">
            <div class="text-xs text-slate-400">Quản lý dữ liệu bộ nhớ máy</div>
            <button onclick="if(confirm('Đặt lại lộ trình về Ngày 1?')) { state.day=1; state.streak=1; state.tasks={}; saveState(); render(); }" class="px-3 py-1.5 bg-rose-900/40 text-rose-300 text-xs rounded-lg border border-rose-800">
              Đặt lại tiến trình
            </button>
          </div>
        </div>
      \`;
    }

    function render() {
      document.getElementById('headerStreak').innerText = '🔥 ' + state.streak + ' ngày kỷ luật · 12 Tuần';
      const container = document.getElementById('mainContent');
      if (state.currentTab === 'dashboard') {
        container.innerHTML = renderDashboard();
      } else if (state.currentTab === 'braingym') {
        container.innerHTML = renderBrainGym();
      } else if (state.currentTab === 'aicoach') {
        container.innerHTML = renderAICoach();
      } else if (state.currentTab === 'roadmap') {
        container.innerHTML = renderRoadmap();
      }
    }

    // Initial render
    render();
  </script>
</body>
</html>`;
}
