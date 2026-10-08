import React, { useState, useRef, useEffect } from 'react';
import { Stethoscope, Send, Sparkles, User, RotateCcw } from 'lucide-react';
import { ChatMessage } from '../types';
import { QUICK_PROMPTS, getDoctorResponse } from '../data/expertAdvice';
import { sound } from '../utils/audio';

interface AICoachTabProps {
  chatHistory: ChatMessage[];
  onUpdateChatHistory: (history: ChatMessage[]) => void;
}

export const AICoachTab: React.FC<AICoachTabProps> = ({
  chatHistory,
  onUpdateChatHistory,
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    sound.playTick(true);
    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [...chatHistory, userMsg];
    onUpdateChatHistory(updated);
    setInputText('');
    setIsTyping(true);

    // Simulate doctor thoughtful reply
    setTimeout(() => {
      const replyText = getDoctorResponse(text);
      const doctorMsg: ChatMessage = {
        id: 'msg_doc_' + Date.now(),
        sender: 'doctor',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      onUpdateChatHistory([...updated, doctorMsg]);
      setIsTyping(false);
      sound.playChime(600);
    }, 700);
  };

  const handleClearHistory = () => {
    const initial: ChatMessage[] = [
      {
        id: 'init_1',
        sender: 'doctor',
        text: 'Xin chào bạn! Tôi là Bác sĩ Minh Triết - Cố vấn chuyên khoa Nam học & Phục hồi Phản xạ Thần kinh. Mọi cuộc trò chuyện tại đây là hoàn toàn bảo mật và riêng tư. Tôi luôn ở đây để đồng hành, giải đáp khoa học và giúp bạn lấy lại bản lĩnh làm chủ cơ thể. Bạn đang gặp phải băn khoăn gì?',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    onUpdateChatHistory(initial);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] pb-16">
      {/* Doctor Header Banner */}
      <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 mb-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Stethoscope className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">BS. Minh Triết (AI Coach)</h3>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                Trực tuyến
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Chuyên khoa Thần kinh & Phục hồi Sinh lý Nam
            </p>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          title="Làm mới cuộc trò chuyện"
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Prompts Carousel */}
      <div className="shrink-0 mb-2 overflow-x-auto scrollbar-none py-1">
        <div className="flex gap-2">
          {QUICK_PROMPTS.map((qp) => (
            <button
              key={qp.id}
              onClick={() => handleSend(qp.query)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium whitespace-nowrap border border-slate-200 dark:border-slate-700/60 active:scale-95 transition-all"
            >
              {qp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {chatHistory.map((msg) => {
          const isDoc = msg.sender === 'doctor';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isDoc ? 'justify-start' : 'justify-end'}`}
            >
              {isDoc && (
                <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 text-xs font-bold mt-1">
                  BS
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                  isDoc
                    ? 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm'
                    : 'bg-emerald-600 text-white rounded-tr-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`text-[9px] mt-1 text-right ${
                    isDoc ? 'text-slate-400' : 'text-emerald-100'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {!isDoc && (
                <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic py-1 px-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Bác sĩ đang phân tích câu hỏi của bạn...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Hỏi bác sĩ về triệu chứng, bài tập, tâm lý..."
          className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white flex items-center justify-center transition-colors shrink-0 shadow-md shadow-emerald-600/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
