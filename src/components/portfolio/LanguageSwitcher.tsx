import { useState, useRef, useEffect } from "react";
import { Globe, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LANGUAGES, useLanguage, LangCode } from "@/contexts/LanguageContext";

const LanguageSwitcher = ({ compact = false }: { compact?: boolean }) => {
  const { lang, setLang, isTranslating } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  const handleSelect = (code: LangCode) => {
    setLang(code);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative" data-no-translate>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm ${
          compact ? "px-2.5 py-1.5 text-xs" : "px-3 py-1.5 text-sm"
        }`}
        aria-label="Change language"
      >
        {isTranslating ? (
          <Loader2 size={14} className="animate-spin text-neon-emerald" />
        ) : (
          <Globe size={14} className="text-neon-emerald" />
        )}
        <span className="text-base leading-none">{current.flag}</span>
        <span className="font-medium uppercase tracking-wide text-[11px] text-foreground/80">
          {current.code}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden z-[60]"
          >
            <div className="max-h-80 overflow-y-auto py-1">
              {LANGUAGES.map((l) => {
                const active = l.code === lang;
                return (
                  <button
                    key={l.code}
                    onClick={() => handleSelect(l.code)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-sm transition-colors ${
                      active ? "bg-neon-emerald/10 text-neon-emerald" : "hover:bg-white/5 text-foreground/90"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-base">{l.flag}</span>
                      <span className="flex flex-col items-start leading-tight">
                        <span className="font-medium">{l.native}</span>
                        <span className="text-[10px] text-muted-foreground">{l.label}</span>
                      </span>
                    </span>
                    {active && <Check size={14} />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
