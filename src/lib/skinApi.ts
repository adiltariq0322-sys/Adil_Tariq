/**
 * AI Skin Specialist — API client
 * ---------------------------------
 * The Python backend lives in the user's repo:
 *   https://github.com/adiltariq234/intelligent-workflow-hub/tree/main/python/Ai%20skin%20specialist
 *
 * Set VITE_SKIN_API_BASE in .env (or override at runtime via localStorage key
 * `skin_api_base`) to point this frontend at the deployed backend.
 *
 * Endpoints assumed (adjust in ENDPOINTS if your backend differs):
 *   POST  {base}/analyze/image     multipart: file
 *   POST  {base}/analyze/voice     multipart: file
 *   POST  {base}/analyze/video     multipart: file
 *   POST  {base}/chat              json: { messages: [{role, content}] }  → SSE or json
 *   GET   {base}/health
 */

export const ENDPOINTS = {
  image: "/analyze/image",
  voice: "/analyze/voice",
  video: "/analyze/video",
  chat: "/chat",
  health: "/health",
} as const;

const LS_KEY = "skin_api_base";

export function getApiBase(): string {
  if (typeof window !== "undefined") {
    const override = window.localStorage.getItem(LS_KEY);
    if (override) return override.replace(/\/$/, "");
  }
  const env = (import.meta.env.VITE_SKIN_API_BASE as string | undefined) ?? "";
  return env.replace(/\/$/, "");
}

export function setApiBase(url: string) {
  window.localStorage.setItem(LS_KEY, url.replace(/\/$/, ""));
}

export class ApiNotConfiguredError extends Error {
  constructor() {
    super(
      "AI Skin Specialist backend URL is not configured. Open Settings and paste your deployed Python backend URL.",
    );
    this.name = "ApiNotConfiguredError";
  }
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const base = getApiBase();
  if (!base) throw new ApiNotConfiguredError();
  const res = await fetch(`${base}${path}`, init);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Backend error ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

// ---------- Types (best-effort — adjust to your Python response shape) ----------
export type ImageAnalysis = {
  disease?: string;
  confidence?: number; // 0-1 or 0-100
  explanation?: string;
  symptoms?: string[];
  causes?: string[];
  precautions?: string[];
  next_steps?: string[];
  disclaimer?: string;
  [k: string]: unknown;
};

export type VoiceAnalysis = {
  transcript?: string;
  response?: string;
  detected_problem?: string;
  recommendations?: string[];
  audio_url?: string;
  [k: string]: unknown;
};

export type VideoAnalysis = {
  disease?: string;
  confidence?: number;
  frames?: { url: string; label?: string; confidence?: number }[];
  summary?: string;
  recommendations?: string[];
  [k: string]: unknown;
};

export type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

// ---------- Calls ----------
export function analyzeImage(file: File): Promise<ImageAnalysis> {
  const fd = new FormData();
  fd.append("file", file);
  return request<ImageAnalysis>(ENDPOINTS.image, { method: "POST", body: fd });
}

export function analyzeVoice(blob: Blob, filename = "recording.webm"): Promise<VoiceAnalysis> {
  const fd = new FormData();
  fd.append("file", blob, filename);
  return request<VoiceAnalysis>(ENDPOINTS.voice, { method: "POST", body: fd });
}

export async function analyzeVideo(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<VideoAnalysis> {
  const base = getApiBase();
  if (!base) throw new ApiNotConfiguredError();
  // Use XHR for upload progress
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${base}${ENDPOINTS.video}`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch {
          reject(new Error("Invalid JSON from backend"));
        }
      } else {
        reject(new Error(`Backend error ${xhr.status}: ${xhr.responseText || xhr.statusText}`));
      }
    };
    xhr.onerror = () => reject(new Error("Network error uploading video"));
    const fd = new FormData();
    fd.append("file", file);
    xhr.send(fd);
  });
}

export async function chat(messages: ChatMessage[]): Promise<{ content: string }> {
  return request(ENDPOINTS.chat, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
}

/** Streaming variant. Backend should return `text/event-stream` with `data: {"delta":"..."}` lines. */
export async function chatStream(
  messages: ChatMessage[],
  onDelta: (chunk: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  const base = getApiBase();
  if (!base) throw new ApiNotConfiguredError();
  const res = await fetch(`${base}${ENDPOINTS.chat}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
    body: JSON.stringify({ messages, stream: true }),
    signal,
  });
  if (!res.ok || !res.body) {
    // Fall back to non-streaming
    const j = await chat(messages);
    onDelta(j.content);
    return j.content;
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let full = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (payload === "[DONE]") return full;
      try {
        const j = JSON.parse(payload);
        const delta = j.delta ?? j.content ?? j.text ?? "";
        if (delta) {
          full += delta;
          onDelta(delta);
        }
      } catch {
        // Plain text chunk
        full += payload;
        onDelta(payload);
      }
    }
  }
  return full;
}

export async function checkHealth(): Promise<boolean> {
  try {
    const base = getApiBase();
    if (!base) return false;
    const res = await fetch(`${base}${ENDPOINTS.health}`, { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
}

// ---------- Local history (dashboard) ----------
export type HistoryEntry = {
  id: string;
  kind: "image" | "voice" | "video" | "chat";
  createdAt: number;
  title: string;
  summary?: string;
  data: unknown;
};

const HIST_KEY = "skin_history_v1";

export function loadHistory(): HistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(HIST_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveHistoryEntry(entry: Omit<HistoryEntry, "id" | "createdAt">) {
  const all = loadHistory();
  const full: HistoryEntry = { ...entry, id: crypto.randomUUID(), createdAt: Date.now() };
  all.unshift(full);
  localStorage.setItem(HIST_KEY, JSON.stringify(all.slice(0, 100)));
  return full;
}

export function clearHistory() {
  localStorage.removeItem(HIST_KEY);
}
