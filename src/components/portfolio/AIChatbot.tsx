import { MessageResponse } from "@/components/ai-elements/message";
import { useState, useRef, useEffect, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Minimize2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const CHAT_URL = SUPABASE_URL ? `${SUPABASE_URL}/functions/v1/chat` : "";
const chatAvailable = Boolean(CHAT_URL);

const quickReplies = [
  { label: "💼 What services do you offer?", message: "What services do you offer?" },
  { label: "🚀 How can AI help my business?", message: "How can AI help my business?" },
  { label: "📂 Show me your projects", message: "Show me your projects" },
  { label: "💰 Get a custom quote", message: "I'd like to get a custom quote for a project." },
  { label: "🤖 Explain RAG simply", message: "Can you explain RAG simply?" },
];

function RichText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        let html = line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-secondary">$1</strong>');
        html = html.replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-secondary underline underline-offset-2 hover:text-foreground transition-colors">$1</a>'
        );
        if (!html.trim()) return <br key={i} />;
        return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />;
      })}
    </div>
  );
}

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (err: string) => void;
}) {
  try {
    if (!CHAT_URL) {
      onError("Chat is unavailable right now. Please email or WhatsApp me instead.");
      return;
    }
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!resp.ok) {
      const data = await resp.json().catch(() => ({}));
      onError(data.error || "Something went wrong. Please try again.");
      return;
    }

    if (!resp.body) {
      onError("No response received.");
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }

    if (buffer.trim()) {
      for (let raw of buffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch { /* ignore */ }
      }
    }

    onDone();
  } catch (e) {
    console.error("Stream error:", e);
    onError("Connection error. Please try again.");
  }
}

const WELCOME = "Hello! I'm **Hafiz Adil's AI Assistant**. I help with **Generative AI, RAG systems, intelligent automation, and Python solutions**.\n\nHow can I assist you today?";

const AIChatbot = memo(() => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: WELCOME }]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isStreaming]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      const userMsg: Msg = { role: "user", content: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsStreaming(true);

      let assistantSoFar = "";

      const upsertAssistant = (chunk: string) => {
        assistantSoFar += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && last.content === assistantSoFar.slice(0, -chunk.length)) {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
          }
          if (last?.role === "assistant" && assistantSoFar.length > chunk.length) {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
          }
          return [...prev, { role: "assistant", content: assistantSoFar }];
        });
      };

      streamChat({
        messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        onDelta: upsertAssistant,
        onDone: () => setIsStreaming(false),
        onError: (err) => {
          setMessages((prev) => [...prev, { role: "assistant", content: `⚠️ ${err}` }]);
          setIsStreaming(false);
        },
      });
    },
    [isStreaming, messages]
  );

  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input);
      }
    },
    [sendMessage, input]
  );

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50"
            aria-label="Open AI Chat"
          >
            <span className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-primary border border-primary/70 shadow-elegant">
              <Bot size={26} className="text-primary-foreground" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-background" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[82vh] sm:max-h-[620px] rounded-lg overflow-hidden flex flex-col bg-card border border-border shadow-elegant"
          >
            {/* Header */}
            <div
              className="relative px-5 py-4 shrink-0 border-b border-border bg-muted/45"
            >
              {/* subtle top highlight */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-md flex items-center justify-center bg-primary border border-primary/70">
                      <Bot size={18} className="text-primary-foreground" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-secondary rounded-full border-2 border-card" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-[15px] font-bold text-foreground">Hafiz Adil — AI Assistant</div>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${chatAvailable ? "bg-secondary" : "bg-muted-foreground"}`} />
                      AI Assistant · {isStreaming ? "Typing…" : chatAvailable ? "Online" : "Offline"}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted"
                  aria-label="Close chat"
                >
                  <Minimize2 size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-5 space-y-3.5 min-h-0 bg-background/60"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2 items-end`}
                >
                  {m.role === "assistant" && (
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 bg-muted border border-border"
                    >
                      <Bot size={13} className="text-secondary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] px-4 py-2.5 text-[13px] sm:text-sm leading-relaxed shadow-md ${
                      m.role === "user"
                        ? "text-primary-foreground rounded-lg rounded-br-sm bg-primary"
                        : "text-foreground rounded-lg rounded-bl-sm bg-card border border-border"
                    }`}
                  >
                    {m.role === "assistant" ? <MessageResponse>{m.content}</MessageResponse> : m.content}
                  </div>
                </motion.div>
              ))}

              {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start gap-2 items-end">
                    <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 bg-muted border border-border">
                      <Bot size={13} className="text-secondary" />
                  </div>
                  <div className="bg-card border border-border rounded-lg rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce [animation-delay:300ms]" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick replies */}
            {!isStreaming && (
              <div className="px-4 pb-2 shrink-0">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((qr) => (
                    <button
                      key={qr.label}
                      onClick={() => sendMessage(qr.message)}
                      className="whitespace-nowrap text-[11px] sm:text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground bg-muted/40 hover:text-foreground hover:border-secondary/50 transition-colors shrink-0"
                    >
                      {qr.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Composer */}
            <div className="p-3 border-t border-border shrink-0 bg-card">
              <div className="flex gap-2 items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask anything about AI, automation, services…"
                  className="flex-1 bg-background/60 border border-border rounded-md px-4 py-3 text-[13px] sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-secondary/60 focus:border-secondary/60 transition-all min-h-[46px]"
                  disabled={isStreaming}
                />
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => sendMessage(input)}
                  disabled={isStreaming || !input.trim()}
                  className="w-11 h-11 rounded-md flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-primary border border-primary"
                  aria-label="Send message"
                >
                  <Send size={16} className="text-primary-foreground" />
                </motion.button>
              </div>
              <div className="text-[10px] text-muted-foreground text-center mt-2">
                Powered by AI · Replies are AI-generated
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

AIChatbot.displayName = "AIChatbot";
export default AIChatbot;
