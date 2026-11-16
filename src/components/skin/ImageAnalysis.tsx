import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Loader2, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { analyzeImage, saveHistoryEntry, type ImageAnalysis } from "@/lib/skinApi";
import { toast } from "sonner";
import { ResultCard } from "./ResultCard";

export function ImageAnalysisPanel({ onReport }: { onReport: (r: ImageAnalysis, image: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImageAnalysis | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const accept = useCallback((f: File | undefined | null) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) return toast.error("Please choose an image file.");
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  }, []);

  const submit = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const r = await analyzeImage(file);
      setResult(r);
      saveHistoryEntry({
        kind: "image",
        title: r.disease ?? "Image analysis",
        summary: r.explanation?.slice(0, 140),
        data: r,
      });
      onReport(r, preview);
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
        <h3 className="font-heading text-xl font-semibold mb-4">Upload skin image</h3>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            accept(e.dataTransfer.files?.[0]);
          }}
          onClick={() => inputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed transition cursor-pointer p-8 text-center ${
            dragOver ? "border-sky-400 bg-sky-500/10" : "border-white/15 hover:border-white/30 bg-white/[0.02]"
          }`}
        >
          {preview ? (
            <div className="relative">
              <img src={preview} alt="Preview" className="mx-auto max-h-72 rounded-lg" />
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
              <p className="font-medium">Drop an image here or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP · up to 10 MB</p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => accept(e.target.files?.[0])}
          />
        </div>

        <Button
          disabled={!file || loading}
          onClick={submit}
          className="w-full mt-4 bg-gradient-to-r from-sky-500 to-teal-500 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing…
            </>
          ) : (
            <>
              <ImageIcon className="w-4 h-4 mr-2" /> Analyze Image
            </>
          )}
        </Button>
      </motion.div>

      <ResultCard result={result} loading={loading} />
    </div>
  );
}
