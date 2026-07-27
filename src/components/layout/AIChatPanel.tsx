"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Bot,
  Send,
  User,
  Sparkles,
  FileText,
  Loader2,
  X,
  Lock,
  MoreVertical,
  Paperclip,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTutorChatStore } from "@/store/useTutorChatStore";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AttemptSummary {
  id: string;
  templateName: string;
  scaledScore: number;
  finishedAt: string;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
} as any;
const fadeLeft = {
  hidden: { opacity: 0, x: 15 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
} as any;
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
} as any;

export default function AIChatPanel({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const { selectedQuestion, scaffoldLevel, setScaffoldLevel } =
    useTutorChatStore();

  const isReviewPage = pathname?.includes("/review");
  const isTryoutSession =
    pathname?.startsWith("/tryout/") &&
    pathname !== "/tryout/list" &&
    !isReviewPage;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState<AttemptSummary[]>([]);
  const [loadingAttempts, setLoadingAttempts] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevQuestionRef = useRef<string | null>(null);

  useEffect(() => {
    async function fetchAttempts() {
      try {
        const res = await fetch("/api/tryout/history");
        if (res.ok) {
          const data = await res.json();
          setAttempts(data.attempts || []);
        }
      } catch (err) {
        console.error("Failed to load tryout history:", err);
      } finally {
        setLoadingAttempts(false);
      }
    }
    fetchAttempts();
  }, []);
  useEffect(() => {
    const qId = selectedQuestion?.questionId || null;
    const cacheKey = selectedQuestion
      ? `${qId}-${selectedQuestion.selectedAnswer}-${selectedQuestion.attemptCount}-${selectedQuestion.isReview}`
      : null;
    if (cacheKey !== prevQuestionRef.current) {
      prevQuestionRef.current = cacheKey;
      if (selectedQuestion) {
        if (selectedQuestion.autoTriggerExplanation) {
          const initMsg: Message = { role: "user", content: "Tolong berikan pembahasan lengkap untuk soal ini." };
          setMessages([initMsg]);
          setLoading(true);
          fetch("/api/tutor/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              questionId: selectedQuestion.questionId,
              question: selectedQuestion.text,
              studentAnswer: selectedQuestion.selectedAnswer,
              correctAnswer: selectedQuestion.correctAnswer,
              currentLevel: "SOLUTION",
              history: [initMsg],
            }),
          }).then(res => res.json()).then(data => {
            setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
            setScaffoldLevel("SOLUTION");
          }).catch(() => {
            setMessages(prev => [...prev, { role: "assistant", content: "Maaf, terjadi kesalahan koneksi." }]);
          }).finally(() => {
            setLoading(false);
          });
        } else if (selectedQuestion.isReview) {
          setMessages([
            {
              role: "assistant",
              content: `Hai! Kita sedang membahas soal ini.\n\nJawabanmu: ${selectedQuestion.selectedAnswer}\nJawaban benar: ${selectedQuestion.correctAnswer}\n\nAda yang ingin didiskusikan dari soal ini? Atau tekan tombol "Tanya Pembahasan" untuk melihat penjabaran lengkapnya!`,
            },
          ]);
          setScaffoldLevel("SOLUTION");
        } else if (selectedQuestion.attemptCount === 1) {
          setMessages([
            {
              role: "assistant",
              content: `Hai! Jawabanmu **(${selectedQuestion.selectedAnswer})** masih belum tepat. Kamu masih punya 1 kesempatan lagi untuk mencoba.\n\nCoba perhatikan baik-baik pertanyaan dan informasinya. Butuh petunjuk (hint)? Tanya saja di sini!`,
            },
          ]);
          setScaffoldLevel("HINT");
        } else if (selectedQuestion.attemptCount === 2) {
          setMessages([
            {
              role: "assistant",
              content: `Sayang sekali, jawabanmu **(${selectedQuestion.selectedAnswer})** masih salah. Kesempatanmu sudah habis untuk soal ini.\n\nMari kita bedah kenapa bisa salah. Coba jelaskan konsep yang kamu pakai untuk menjawab tadi, biar aku bantu koreksi!`,
            },
          ]);
          setScaffoldLevel("SOCRATIC");
        } else {
          setMessages([
            {
              role: "assistant",
              content: `Hai! Kamu ingin membahas soal:\n\n"${selectedQuestion.text}"\n\nJawabanmu: ${selectedQuestion.selectedAnswer}\nJawaban benar: ${selectedQuestion.correctAnswer}\n\nCeritakan kenapa kamu memilih jawaban itu. Aku akan bantu kamu memahami konsepnya!`,
            },
          ]);
          setScaffoldLevel("SOCRATIC");
        }
      } else {
        setMessages([
          {
            role: "assistant",
            content:
              "Hai! Ketik/Paste soal dari sekolah atau bimbel lain di bawah ini, atau pilih salah satu Arsip Soal di sebelah kiri untuk kita bahas kembali!",
          },
        ]);
      }
    }
  }, [selectedQuestion]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);



    try {
      let res: Response;
      if (selectedQuestion) {
        res = await fetch("/api/tutor/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questionId: selectedQuestion.questionId,
            question: selectedQuestion.text,
            studentAnswer: userMsg,
            correctAnswer: selectedQuestion.correctAnswer,
            currentLevel: scaffoldLevel,
            history: messages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Server error");
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response || "Maaf, tidak ada balasan dari AI." },
        ]);

      } else {
        res = await fetch("/api/tutor/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            freeMessage: userMsg,
            history: messages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Server error");
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.response || "Maaf, terjadi kesalahan.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Maaf, terjadi kesalahan koneksi. Coba lagi ya.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const levelBadge: Record<string, { label: string; color: string }> = {
    SOCRATIC: {
      label: "Socratic",
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    HINT: {
      label: "Hint",
      color: "bg-amber-50 text-amber-600 border-amber-200",
    },
    SOLUTION: {
      label: "Solution",
      color: "bg-rose-50 text-rose-600 border-rose-200",
    },
    DISCUSSION: {
      label: "Discussion",
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
  };

  const quickPills = selectedQuestion
    ? ["Aku belum paham", "Berikan petunjuk", "Beri analogi", "Kenapa salah?"]
    : ["Tips belajar", "Strategi UTBK", "Materi hari ini"];

  if (isTryoutSession) {
    return (
      <aside className="w-full lg:w-[380px] h-full shrink-0 bg-slate-50 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] flex flex-col overflow-hidden border border-slate-100 relative">
        <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center z-50">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-6 shadow-sm">
            <Lock className="w-8 h-8 text-rose-500 animate-pulse" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            AI Tutor Dikunci
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-[280px]">
            Untuk menjaga integritas dan kejujuran simulasi UTBK, AI Tutor
            dinonaktifkan sementara selama ujian berlangsung. Selamat berjuang!
          </p>
          <div className="mt-8 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
            <span className="text-[10px] uppercase tracking-wider text-slate-600 font-bold">
              Fokus Mode Ujian
            </span>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full lg:w-[380px] h-full shrink-0 bg-gradient-to-b from-[#f9edff] to-[#ffedf4] shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] flex flex-col overflow-hidden border border-white/50 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-5 py-5 flex items-center justify-between bg-white z-10 relative border-b border-purple-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)]"
      >
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[#d4b3f5] flex items-center justify-center text-white hover:opacity-80 transition-opacity shadow-sm mr-1"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          )}
          <div className="flex flex-col">
            <h3 className="text-[15px] font-bold text-slate-800 tracking-tight">
              {selectedQuestion ? "Tutor Soal" : "Chat with Lexica"}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5 justify-start">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <p className="text-[10px] text-slate-500 font-medium">
                Online
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedQuestion && (
            <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold shadow-sm ${levelBadge[scaffoldLevel]?.color || 'bg-white text-slate-600 border-slate-200'}`}>
              {levelBadge[scaffoldLevel]?.label || 'Tutor'}
            </span>
          )}
        </div>
      </motion.div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar"
      >
        {messages.map((msg, i) => (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            key={i}
            className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"} mb-4`}
          >
            <div
              className={`px-4 py-3 text-[14px] font-medium leading-relaxed shadow-[0_2px_10px_rgba(0,0,0,0.02)] ${
                msg.role === "assistant"
                  ? "bg-white text-slate-600 rounded-[1.25rem] rounded-bl-sm border border-white"
                  : "bg-[#b37be1] text-white rounded-[1.25rem] rounded-br-sm"
              }`}
            >
              {msg.role === "assistant" ? (
                <MarkdownRenderer content={msg.content} />
              ) : (
                msg.content
              )}
            </div>
            <span className="text-[9px] text-slate-400 font-semibold mt-1.5 px-1 tracking-wide">
              {msg.role === "assistant" ? "Lexica" : "Kamu"} · {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </motion.div>
        ))}

        {/* History Area */}
        {!selectedQuestion && messages.length <= 1 && (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-2 pt-2"
          >
            <motion.p
              variants={fadeLeft}
              className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold px-1"
            >
              Riwayat Try Out
            </motion.p>
            {loadingAttempts ? (
              <div className="flex justify-center py-4">
                <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
              </div>
            ) : attempts.length === 0 ? (
              <motion.div
                variants={scaleIn}
                className="p-4 rounded-2xl border border-slate-100 bg-white/50 text-center shadow-sm"
              >
                <p className="text-xs text-slate-500 mb-3 font-medium">
                  Belum ada Try Out yang dikerjakan.
                </p>
                <button
                  onClick={() => router.push("/tryout/list")}
                  className="text-xs px-4 py-2 rounded-xl bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors shadow-sm"
                >
                  Kerjakan Try Out
                </button>
              </motion.div>
            ) : (
              attempts.map((attempt) => (
                <motion.button
                  variants={fadeLeft}
                  key={attempt.id}
                  onClick={() => router.push(`/tutor/${attempt.id}`)}
                  className="w-full p-3.5 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-all text-left group flex items-center gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md"
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent)]/10 group-hover:border-[var(--accent)]/10 transition-colors">
                    <FileText className="w-4 h-4 text-slate-400 group-hover:text-[var(--accent)] transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-700 truncate group-hover:text-slate-900 transition-colors">
                      {attempt.templateName}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                      Skor: {Math.round(attempt.scaledScore)} ·{" "}
                      {new Date(attempt.finishedAt).toLocaleDateString(
                        "id-ID",
                        { day: "numeric", month: "short" },
                      )}
                    </p>
                  </div>
                  <span className="text-[10px] text-[var(--accent)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Bahas →
                  </span>
                </motion.button>
              ))
            )}
          </motion.div>
        )}

        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col max-w-[85%] mr-auto items-start mb-4"
          >
            <div className="px-4 py-4 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-[1.25rem] rounded-bl-sm flex items-center gap-1.5 border border-white">
              <div
                className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
            <span className="text-[9px] text-slate-400 font-semibold mt-1.5 px-1 tracking-wide">
              Lexica · Mengetik...
            </span>
          </motion.div>
        )}
      </div>

      {/* Quick Pills (Optional, keeping them if any, just transparent BG) */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="px-4 py-2.5 flex gap-2 overflow-x-auto no-scrollbar z-10 relative bg-transparent mt-auto"
      >
        {quickPills.map((pill, i) => {
          const pastels = [
            "bg-white/60 text-slate-700",
            "bg-white/60 text-slate-700",
            "bg-white/60 text-slate-700",
          ];
          const colorClass = pastels[i % pastels.length];
          return (
            <motion.button
              variants={scaleIn}
              key={pill}
              onClick={() => setInput(pill)}
              className={`shrink-0 text-[11px] font-medium px-4 py-2 rounded-full ${colorClass} backdrop-blur-sm border border-white/50 hover:bg-white/80 transition-colors shadow-sm`}
            >
              {pill}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="px-4 py-4 bg-white z-10 relative border-t border-purple-100 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] mt-auto"
      >
        <div className="flex items-center relative bg-slate-50/80 rounded-full p-1 border border-slate-100">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder={
              selectedQuestion ? "Balas AI Tutor..." : "Type your message..."
            }
            disabled={loading}
            className="flex-1 px-5 py-3 bg-transparent outline-none text-[13px] text-slate-800 placeholder:text-slate-400 disabled:opacity-50 font-medium"
          />
          <div className="flex items-center gap-0.5 pr-2">
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-2 text-slate-700 disabled:opacity-30 hover:text-[#b37be1] transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </aside>
  );
}
