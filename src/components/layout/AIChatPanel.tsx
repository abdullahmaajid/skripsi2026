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
  BookOpen,
  X,
  Lock,
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
      ? `${qId}-${selectedQuestion.selectedAnswer}-${selectedQuestion.isSecondChance}`
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
        } else if (selectedQuestion.isSecondChance) {
          setMessages([
            {
              role: "assistant",
              content: `Hai! Jawabanmu **(${selectedQuestion.selectedAnswer})** masih belum tepat. Jangan berkecil hati! Kamu masih punya 1 kesempatan lagi untuk mencoba.\n\nButuh petunjuk (hint), analogi, atau ingin berdiskusi dulu sebelum menjawab lagi? Tanya saja di sini!`,
            },
          ]);
        } else {
          setMessages([
            {
              role: "assistant",
              content: `Hai! Kamu ingin membahas soal:\n\n"${selectedQuestion.text}"\n\nJawabanmu: ${selectedQuestion.selectedAnswer}\nJawaban benar: ${selectedQuestion.correctAnswer}\n\nCeritakan kenapa kamu memilih jawaban itu. Aku akan bantu kamu memahami konsepnya!`,
            },
          ]);
        }
      } else {
        setMessages([
          {
            role: "assistant",
            content:
              "Hai! Aku adalah AI Tutor Lexica. Kamu bisa membahas soal dari luar (buku, bimbel, TO sekolah) dengan menyalin teksnya di sini, atau pilih salah satu soal salah di halaman Bahas Soal Luar!",
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
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
        if (data.nextLevel) setScaffoldLevel(data.nextLevel);
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
  };

  const quickPills = selectedQuestion
    ? ["Aku belum paham", "Berikan petunjuk", "Beri analogi", "Kenapa salah?"]
    : ["Tips belajar", "Strategi UTBK", "Materi hari ini"];

  if (isTryoutSession) {
    return (
      <aside className="w-full lg:w-[380px] h-full shrink-0 bg-slate-50 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] flex flex-col hidden lg:flex overflow-hidden border border-slate-100 relative">
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
    <aside className="w-full lg:w-[380px] h-full shrink-0 bg-slate-50 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] flex flex-col hidden lg:flex overflow-hidden border border-slate-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-5 border-b border-slate-900/5 flex items-center justify-between bg-white z-10 relative"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center shadow-sm">
            {selectedQuestion ? (
              <BookOpen className="w-5 h-5 text-white" />
            ) : (
              <Sparkles className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              {selectedQuestion ? "Tutor Soal" : "AI Tutor"}
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">
              {selectedQuestion
                ? selectedQuestion.subject
                : "Powered by Groq · Llama 3"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedQuestion && (
            <span className="text-[10px] px-2.5 py-1 rounded-full border font-semibold bg-rose-50 text-rose-600 border-rose-200">
              Pembahasan
            </span>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
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
            className={`flex gap-2.5 max-w-[92%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
          >
            <div
              className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white ${
                msg.role === "assistant"
                  ? "bg-[var(--accent)] shadow-[0_2px_10px_rgba(193,119,249,0.3)]"
                  : "bg-[var(--accent-secondary)] shadow-[0_2px_10px_rgba(52,186,250,0.3)]"
              }`}
            >
              {msg.role === "assistant" ? (
                <Bot className="w-3.5 h-3.5" />
              ) : (
                <User className="w-3.5 h-3.5" />
              )}
            </div>
            <div
              className={`px-3.5 py-2.5 rounded-2xl text-[14px] font-medium leading-relaxed shadow-sm ${
                msg.role === "assistant"
                  ? "bg-[var(--accent)] text-white rounded-tl-sm shadow-[0_4px_15px_rgba(193,119,249,0.2)]"
                  : "bg-[var(--accent-secondary)] text-white rounded-tr-sm shadow-[0_4px_15px_rgba(52,186,250,0.2)]"
              }`}
            >
              {msg.role === "assistant" ? (
                <MarkdownRenderer content={msg.content} variant="dark" />
              ) : (
                msg.content
              )}
            </div>
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
            className="flex gap-2.5"
          >
            <div className="shrink-0 w-7 h-7 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow-[0_2px_10px_rgba(193,119,249,0.3)]">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="px-3.5 py-2.5 bg-[var(--accent)] text-white shadow-[0_4px_15px_rgba(193,119,249,0.2)] rounded-2xl rounded-tl-sm flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Pills */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="px-4 py-2.5 flex gap-2 overflow-x-auto no-scrollbar border-t border-slate-900/5 bg-white z-10 relative"
      >
        {quickPills.map((pill, i) => {
          const pastels = [
            "bg-[var(--pastel-blue)] text-sky-700",
            "bg-[var(--pastel-orange)] text-orange-700",
            "bg-[var(--pastel-purple)] text-purple-700",
          ];
          const colorClass = pastels[i % pastels.length];
          return (
            <motion.button
              variants={scaleIn}
              key={pill}
              onClick={() => setInput(pill)}
              className={`shrink-0 text-[11px] font-medium px-3.5 py-1.5 rounded-full ${colorClass} hover:opacity-80 transition-opacity border border-transparent shadow-sm`}
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
        className="p-3 bg-white z-10 relative pb-4"
      >
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder={
              selectedQuestion ? "Balas AI Tutor..." : "Tanya sesuatu..."
            }
            disabled={loading}
            className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] outline-none text-sm text-slate-800 transition-all placeholder:text-slate-400 disabled:opacity-50 pr-11 font-medium"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square flex items-center justify-center bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] disabled:opacity-50 rounded-xl transition-all shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </aside>
  );
}
