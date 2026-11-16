import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Square, Loader2, Play, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { analyzeVoice, saveHistoryEntry, type VoiceAnalysis } from "@/lib/skinApi";
import { toast } from "sonner";

export function VoiceConsultationPanel() {
  const [recording, setRecording] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VoiceAnalysis | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timer = useRef<number | null>(null);

  useEffect(() => () => timer.current && window.clearInterval(timer.current), []);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4";
      const rec = new MediaRecorder(stream, { mimeType: mime });
      chunks.current = [];
      rec.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
      rec.onstop = () => {
        const b = new Blob(chunks.current, { type: mime });
        setBlob(b);
        setUrl(URL.createObjectURL(b));
        stream.getTracks().forEach((t) => t.stop());
      };
      rec.start();
      recRef.current = rec;
      setRecording(true);
      setElapsed(0);
      timer.current = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    } catch {
      toast.error("Microphone access denied.");
    }
  };
  const stop = () => {
    recRef.current?.stop();
    setRecording(false);
    if (timer.current) window.clearInterval(timer.current);
  };

  const submit = async () => {
    if (!blob) return;
    setLoading(true);
    try {
      const ext = blob.type.includes("mp4") ? "m4a" : "webm";
      const r = await analyzeVoice(blob, `voice.${ext}`);
      setResult(r);
      saveHistoryEntry({
        kind: "voice",
        title: r.detected_problem ?? "Voice consultation",
        summary: r.transcript?.slice(0, 140),
        data: r,
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
      >
        <h3 className="font-heading text-xl font-semibold mb-4">Record your consultation</h3>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-8 text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br from-sky-500 to-teal-500 ${
                recording ? "animate-ping" : ""
              } opacity-30`}
            />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-xl">
              <Mic className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="font-mono text-2xl mb-2">
            {String(Math.floor(elapsed / 60)).padStart(2, "0")}:{String(elapsed % 60).padStart(2, "0")}
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            {recording ? "Listening…" : blob ? "Recording ready to analyze." : "Tap the button to start recording."}
          </p>
          <div className="flex justify-center gap-3">
            {!recording ? (
              <Button onClick={start} className="bg-sky-500 hover:bg-sky-400 text-white">
                <Mic className="w-4 h-4 mr-2" /> Start
              </Button>
            ) : (
              <Button onClick={stop} variant="destructive">
                <Square className="w-4 h-4 mr-2" /> Stop
              </Button>
            )}
            {blob && !recording && (
              <Button onClick={submit} disabled={loading} variant="outline">
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                Analyze
              </Button>
            )}
          </div>
          {url && (
            <audio controls src={url} className="mt-4 w-full">
              <track kind="captions" />
            </audio>
          )}
        </div>
      </motion.div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 min-h-[300px]">
        <h3 className="font-heading text-xl font-semibold mb-4">AI Response</h3>
        {!result && !loading && (
          <p className="text-sm text-muted-foreground">Record and analyze to see the AI's response.</p>
        )}
        {loading && <div className="h-24 rounded bg-white/5 animate-pulse" />}
        {result && (
          <div className="space-y-4 text-sm">
            {result.transcript && (
              <div>
                <div className="text-xs uppercase text-muted-foreground mb-1">Transcript</div>
                <p className="italic text-foreground/80">"{result.transcript}"</p>
              </div>
            )}
            {result.detected_problem && (
              <div>
                <div className="text-xs uppercase text-muted-foreground mb-1">Detected concern</div>
                <div className="font-heading text-lg text-sky-300">{result.detected_problem}</div>
              </div>
            )}
            {result.response && (
              <div>
                <div className="text-xs uppercase text-muted-foreground mb-1">AI response</div>
                <p className="leading-relaxed">{result.response}</p>
              </div>
            )}
            {result.recommendations && result.recommendations.length > 0 && (
              <div>
                <div className="text-xs uppercase text-muted-foreground mb-1">Recommendations</div>
                <ul className="space-y-1">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-teal-400">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.audio_url && (
              <div>
                <div className="text-xs uppercase text-muted-foreground mb-1 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5" /> AI Voice
                </div>
                <audio controls src={result.audio_url} className="w-full">
                  <track kind="captions" />
                </audio>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
