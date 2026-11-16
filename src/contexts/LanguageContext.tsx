import { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from "react";

export type LangCode = "en" | "ur" | "ar" | "hi" | "es" | "fr" | "de" | "zh" | "pt" | "ru";

export const LANGUAGES: { code: LangCode; label: string; native: string; flag: string; rtl?: boolean }[] = [
  { code: "en", label: "English", native: "English", flag: "🇬🇧" },
  { code: "ur", label: "Urdu", native: "اردو", flag: "🇵🇰", rtl: true },
  { code: "ar", label: "Arabic", native: "العربية", flag: "🇸🇦", rtl: true },
  { code: "hi", label: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "es", label: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "fr", label: "French", native: "Français", flag: "🇫🇷" },
  { code: "de", label: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "zh", label: "Chinese", native: "中文", flag: "🇨🇳" },
  { code: "pt", label: "Portuguese", native: "Português", flag: "🇵🇹" },
  { code: "ru", label: "Russian", native: "Русский", flag: "🇷🇺" },
];

const RTL_LANGS: LangCode[] = ["ur", "ar"];
const STORAGE_KEY = "site_lang";
const CACHE_PREFIX = "trcache_v1_";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const TRANSLATE_URL = SUPABASE_URL ? `${SUPABASE_URL}/functions/v1/translate` : "";

// Skip tags whose text shouldn't be touched
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "TEXTAREA", "INPUT"]);

// Country -> language guess (very small map for common cases)
const COUNTRY_TO_LANG: Record<string, LangCode> = {
  PK: "ur", IN: "hi", SA: "ar", AE: "ar", EG: "ar", QA: "ar", KW: "ar",
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es",
  FR: "fr", BE: "fr",
  DE: "de", AT: "de", CH: "de",
  CN: "zh", TW: "zh", HK: "zh",
  BR: "pt", PT: "pt",
  RU: "ru", BY: "ru",
};

function detectInitialLang(): LangCode {
  if (typeof window === "undefined") return "en";

  // 1. URL query param ?lang=xx (highest priority — matches hreflang URLs)
  try {
    const url = new URL(window.location.href);
    const q = (url.searchParams.get("lang") || "").toLowerCase() as LangCode;
    if (q && LANGUAGES.some((l) => l.code === q)) {
      localStorage.setItem(STORAGE_KEY, q);
      return q;
    }
  } catch { /* ignore */ }

  // 2. Saved preference
  const saved = localStorage.getItem(STORAGE_KEY) as LangCode | null;
  if (saved && LANGUAGES.some((l) => l.code === saved)) return saved;

  // 3. Browser language
  const browser = (navigator.language || "en").toLowerCase().split("-");
  const primary = browser[0] as LangCode;
  const region = (browser[1] || "").toUpperCase();
  if (LANGUAGES.some((l) => l.code === primary)) return primary;
  if (region && COUNTRY_TO_LANG[region]) return COUNTRY_TO_LANG[region];
  return "en";
}

type Ctx = {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  isTranslating: boolean;
};

const LanguageContext = createContext<Ctx>({ lang: "en", setLang: () => {}, isTranslating: false });

export const useLanguage = () => useContext(LanguageContext);

function readCache(lang: LangCode): Record<string, string> {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + lang);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}
function writeCache(lang: LangCode, cache: Record<string, string>) {
  try { localStorage.setItem(CACHE_PREFIX + lang, JSON.stringify(cache)); } catch { /* quota */ }
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<LangCode>("en");
  const [isTranslating, setIsTranslating] = useState(false);

  // Map: text node -> original text (to restore / re-translate)
  const originalsRef = useRef<WeakMap<Text, string>>(new WeakMap());
  // Track all known text nodes (so we can revisit on language switch)
  const knownNodesRef = useRef<Set<Text>>(new Set());
  const observerRef = useRef<MutationObserver | null>(null);
  const pendingTimerRef = useRef<number | null>(null);
  const currentLangRef = useRef<LangCode>("en");

  // Initial detection (after mount to avoid SSR mismatch)
  useEffect(() => {
    const initial = detectInitialLang();
    currentLangRef.current = initial;
    setLangState(initial);
  }, []);

  // Apply <html lang> and dir
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
  }, [lang]);

  const shouldSkipNode = (node: Text): boolean => {
    const parent = node.parentElement;
    if (!parent) return true;
    if (SKIP_TAGS.has(parent.tagName)) return true;
    if (parent.closest("[data-no-translate]")) return true;
    const text = node.nodeValue || "";
    const trimmed = text.trim();
    if (trimmed.length < 2) return true;
    // Skip pure numbers / symbols / urls / emails
    if (/^[\d\s\.,:;!?@#$%^&*()_+=\-/\\|<>"'`~]+$/.test(trimmed)) return true;
    if (/^https?:\/\//i.test(trimmed)) return true;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return true;
    return false;
  };

  const collectTextNodes = (root: Node): Text[] => {
    const out: Text[] = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => {
        const tn = n as Text;
        if (shouldSkipNode(tn)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    let n: Node | null;
    while ((n = walker.nextNode())) out.push(n as Text);
    return out;
  };

  const translateBatch = useCallback(async (texts: string[], target: LangCode): Promise<string[]> => {
    // No backend configured (e.g. a deploy without env vars): keep the
    // original text instead of calling a broken URL.
    if (!TRANSLATE_URL) return texts;
    const resp = await fetch(TRANSLATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ texts, target }),
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    return data.translations || texts;
  }, []);

  const applyTranslations = useCallback(async (nodes: Text[], target: LangCode) => {
    if (target === "en") {
      // Restore originals
      nodes.forEach((node) => {
        const orig = originalsRef.current.get(node);
        if (orig != null && node.nodeValue !== orig) node.nodeValue = orig;
      });
      return;
    }

    const cache = readCache(target);
    const toFetch: { text: string; nodes: Text[] }[] = [];
    const fetchMap: Map<string, Text[]> = new Map();

    nodes.forEach((node) => {
      let orig = originalsRef.current.get(node);
      if (orig == null) {
        orig = node.nodeValue || "";
        originalsRef.current.set(node, orig);
      }
      const key = orig.trim();
      if (!key) return;
      const cached = cache[key];
      if (cached) {
        // Preserve surrounding whitespace
        const leading = orig.match(/^\s*/)?.[0] || "";
        const trailing = orig.match(/\s*$/)?.[0] || "";
        node.nodeValue = leading + cached + trailing;
      } else {
        if (!fetchMap.has(key)) fetchMap.set(key, []);
        fetchMap.get(key)!.push(node);
      }
    });

    if (fetchMap.size === 0) return;

    const uniqueTexts = Array.from(fetchMap.keys());
    // Batch in chunks of 40 to avoid huge requests
    const CHUNK = 40;
    setIsTranslating(true);
    try {
      for (let i = 0; i < uniqueTexts.length; i += CHUNK) {
        const slice = uniqueTexts.slice(i, i + CHUNK);
        let translations: string[];
        try {
          translations = await translateBatch(slice, target);
        } catch (e) {
          console.warn("translate batch failed:", e);
          continue;
        }
        // Only apply if user hasn't switched language meanwhile
        if (currentLangRef.current !== target) return;
        slice.forEach((src, idx) => {
          const tr = translations[idx] || src;
          cache[src] = tr;
          const targets = fetchMap.get(src) || [];
          targets.forEach((node) => {
            const orig = originalsRef.current.get(node) || src;
            const leading = orig.match(/^\s*/)?.[0] || "";
            const trailing = orig.match(/\s*$/)?.[0] || "";
            node.nodeValue = leading + tr + trailing;
          });
        });
        writeCache(target, cache);
      }
    } finally {
      setIsTranslating(false);
    }
  }, [translateBatch]);

  // Translate the whole document on lang change
  useEffect(() => {
    currentLangRef.current = lang;
    const nodes = collectTextNodes(document.body);
    nodes.forEach((n) => knownNodesRef.current.add(n));
    applyTranslations(nodes, lang);
  }, [lang, applyTranslations]);

  // MutationObserver — translate any newly-added text nodes
  useEffect(() => {
    const debouncedHandle = (added: Text[]) => {
      if (pendingTimerRef.current) window.clearTimeout(pendingTimerRef.current);
      pendingTimerRef.current = window.setTimeout(() => {
        const target = currentLangRef.current;
        const fresh = added.filter((n) => n.isConnected && !shouldSkipNode(n));
        fresh.forEach((n) => knownNodesRef.current.add(n));
        if (target !== "en") applyTranslations(fresh, target);
      }, 250);
    };

    const observer = new MutationObserver((mutations) => {
      const added: Text[] = [];
      for (const m of mutations) {
        if (m.type === "childList") {
          m.addedNodes.forEach((n) => {
            if (n.nodeType === Node.TEXT_NODE) {
              added.push(n as Text);
            } else if (n.nodeType === Node.ELEMENT_NODE) {
              added.push(...collectTextNodes(n));
            }
          });
        } else if (m.type === "characterData") {
          const n = m.target as Text;
          // Only re-capture if the change wasn't ours (no original stored yet)
          if (!originalsRef.current.has(n)) added.push(n);
        }
      }
      if (added.length) debouncedHandle(added);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    observerRef.current = observer;
    return () => observer.disconnect();
  }, [applyTranslations]);

  const setLang = useCallback((l: LangCode) => {
    localStorage.setItem(STORAGE_KEY, l);
    currentLangRef.current = l;
    setLangState(l);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
};
