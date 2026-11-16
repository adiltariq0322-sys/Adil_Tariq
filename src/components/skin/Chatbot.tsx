import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Send, Trash2, Copy, Loader2, Bot, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatStream, saveHistoryEntry, type ChatMessage } from "@/lib/skinApi";
import { toast } from "sonner";

const SUGGESTED = [
  "What causes sudden itchy red patches?",
  "How do I care for oily, acne-prone skin?",
  "Is this mole shape a concern?",
  "Daily routine for eczema-prone skin?",
];

const STORAGE = "skin_chat_v1";

export function ChatbotPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE) ?? "[]");
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [current, setCurrent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(messages));
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, current]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || streaming) return;
    const next: ChatMessage[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setStreaming(true);
    setCurrent("");
    try {
      let acc = "";
      const full = await chatStream(next, (d) => {
        acc += d;
        setCurrent(acc);
      });
      const finalAnswer = full || acc;
      const final: ChatMessage[] = [...next, { role: "assistant", content: finalAnswer }];
      setMessages(final);
      saveHistoryEntry({ kind: "chat", title: q.slice(0, 60), summary: finalAnswer.slice(0, 140), data: final });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Chat failed");
    } finally {
      setStreaming(false);
      setCurrent("");
    }
  };

  const clear = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col h-[70vh] min-h-[520px]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-semibold text-sm">AI Skin Assistant</div>
            <div className="text-[11px] text-muted-foreground">Groq · streaming</div>
          </div>
        </div>
        <Button size="sm" variant="ghost" onClick={clear} disabled={!messages.length}>
          <Trash2 className="w-4 h-4 mr-1.5" /> Clear
        </Button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.length === 0 && !streaming && (
          <div className="text-center py-8">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-sky-500/20 to-teal-500/20 border border-sky-400/30 flex items-center justify-center mb-3">
              <Bot className="w-7 h-7 text-sky-300" />
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Ask anything about skin concerns, routines or symptoms.
            </p>
            <div className="grid sm:grid-cols-2 gap-2 max-w-xl mx-auto">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left text-xs p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <MessageBubble key={i} m={m} />
        ))}

        {streaming && (
          <MessageBubble
            m={{ role: "assistant", content: current || "…" }}
            typing={!current}
          />
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-white/10 p-3 flex items-end gap-2"
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          placeholder="Type your question…"
          className="min-h-[44px] max-h-40 resize-none bg-black/30 border-white/10"
          disabled={streaming}
        />
        <Button type="submit" disabled={!input.trim() || streaming} className="bg-sky-500 hover:bg-sky-400">
          {streaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </form>
    </div>
  );
}

function MessageBubble({ m, typing }: { m: ChatMessage; typing?: boolean }) {
  const isUser = m.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center flex-shrink-0">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      <div className={`group max-w-[80%] ${isUser ? "order-1" : ""}`}>
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm ${
            isUser
              ? "bg-sky-500 text-white rounded-br-sm"
              : "bg-white/[0.04] border border-white/10 rounded-bl-sm"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{m.content}</p>
          ) : (
            <div className="prose prose-sm prose-invert max-w-none prose-p:my-1.5 prose-headings:mt-3 prose-headings:mb-1.5">
              <ReactMarkdown>{m.content}</ReactMarkdown>
              {typing && <span className="inline-block w-1.5 h-4 bg-sky-300 align-middle animate-pulse ml-0.5" />}
            </div>
          )}
        </div>
        {!isUser && !typing && (
          <button
            onClick={() => {
              navigator.clipboard.writeText(m.content);
              toast.success("Copied");
            }}
            className="opacity-0 group-hover:opacity-100 transition text-[11px] text-muted-foreground mt-1 flex items-center gap-1"
          >
            <Copy className="w-3 h-3" /> Copy
          </button>
        )}
      </div>
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-3.5 h-3.5" />
        </div>
      )}
    </motion.div>
  );
}
