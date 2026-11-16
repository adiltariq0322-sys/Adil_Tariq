import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Loader2, Video as VideoIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { analyzeVideo, saveHistoryEntry, type VideoAnalysis } from "@/lib/skinApi";
import { toast } from "sonner";
import { ResultCard } from "./ResultCard";

export function VideoAnalysisPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VideoAnalysis | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const accept = (f?: File | null) => {
    if (!f) return;
    if (!f.type.startsWith("video/")) return toast.error("Please choose a video file.");
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setProgress(0);
  };

  const submit = async () => {
    if (!file) return;
    setLoading(true);
    setProgress(0);
    try {
      const r = await analyzeVideo(file, setProgress);
      setResult(r);
      saveHistoryEntry({
        kind: "video",
        title: r.disease ?? "Video analysis",
        summary: r.summary?.slice(0, 140),
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
        <h3 className="font-heading text-xl font-semibold mb-4">Upload short video clip</h3>
        <div
          onClick={() => inputRef.current?.click()}
          className="rounded-2xl border-2 border-dashed border-white/15 hover:border-white/30 bg-white/[0.02] p-8 text-center cursor-pointer"
        >
          {preview ? (
            <div className="relative">
              <video src={preview} controls className="mx-auto max-h-72 rounded-lg" playsInline>
                <track kind="captions" />
              </video>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  setPreview("");
                  setResult(null);
                }}
                className="absolute top-2 right-2 bg-black/60 rounded-full p-1"
                aria-label="Remove"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <UploadCloud className="w-10 h-10 mx-auto text-sky-400 mb-3" />
              <p className="font-medium">Click to select a video</p>
              <p className="text-xs text-muted-foreground mt-1">MP4, WEBM, MOV · keep it under 30 s for best speed</p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => accept(e.target.files?.[0])}
          />
        </div>

        {loading && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{progress < 100 ? "Uploading…" : "Analyzing frames…"}</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}

        <Button
          disabled={!file || loading}
          onClick={submit}
          className="w-full mt-4 bg-gradient-to-r from-sky-500 to-teal-500 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Working…
            </>
          ) : (
            <>
              <VideoIcon className="w-4 h-4 mr-2" /> Analyze Video
            </>
          )}
        </Button>

        {result?.frames && result.frames.length > 0 && (
          <div className="mt-6">
            <div className="text-xs uppercase text-muted-foreground mb-2">Extracted frames</div>
            <div className="grid grid-cols-4 gap-2">
              {result.frames.slice(0, 8).map((fr, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden border border-white/10">
                  <img src={fr.url} alt={fr.label ?? `frame ${i}`} className="w-full h-16 object-cover" />
                  {fr.confidence != null && (
                    <span className="absolute bottom-0 right-0 text-[10px] px-1 bg-black/70">
                      {Math.round((fr.confidence <= 1 ? fr.confidence * 100 : fr.confidence))}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      <ResultCard result={result} loading={loading} />
    </div>
  );
}
