import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Gauge, ListChecks, Sparkles, Stethoscope } from "lucide-react";
import type { ImageAnalysis, VideoAnalysis } from "@/lib/skinApi";

function pct(v?: number) {
  if (v == null) return null;
  return v <= 1 ? Math.round(v * 100) : Math.round(v);
}

export function ResultCard({
  result,
  loading,
}: {
  result: ImageAnalysis | VideoAnalysis | null;
  loading?: boolean;
}) {
  const conf = pct(result?.confidence as number | undefined);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 min-h-[300px]">
      <h3 className="font-heading text-xl font-semibold mb-4 flex items-center gap-2">
        <Stethoscope className="w-5 h-5 text-teal-300" /> Analysis Result
      </h3>
      <AnimatePresence mode="wait">
        {!result && !loading && (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-muted-foreground"
          >
            Results will appear here after analysis.
          </motion.p>
        )}
        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-4 rounded bg-white/5 animate-pulse" style={{ width: `${90 - i * 15}%` }} />
            ))}
          </motion.div>
        )}
        {result && !loading && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5 text-sm"
          >
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Predicted condition</div>
              <div className="font-heading text-2xl font-bold text-sky-300">
                {result.disease ?? "Unspecified"}
              </div>
            </div>
            {conf !== null && (
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Gauge className="w-3.5 h-3.5" /> Confidence
                  </span>
                  <span className="font-semibold">{conf}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${conf}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-sky-400 to-teal-400"
                  />
                </div>
              </div>
            )}
            {result.explanation && (
              <Section icon={Sparkles} title="Explanation" text={result.explanation as string} />
            )}
            <ListBlock title="Symptoms" items={(result as ImageAnalysis).symptoms} />
            <ListBlock title="Possible Causes" items={(result as ImageAnalysis).causes} />
            <ListBlock title="Precautions" items={(result as ImageAnalysis).precautions} />
            <ListBlock title="Recommended Next Steps" items={(result as ImageAnalysis).next_steps} />
            {(result as VideoAnalysis).recommendations && (
              <ListBlock title="Recommendations" items={(result as VideoAnalysis).recommendations} />
            )}
            {(result as VideoAnalysis).summary && (
              <Section icon={Sparkles} title="Summary" text={(result as VideoAnalysis).summary!} />
            )}
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-200/90">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                {(result as ImageAnalysis).disclaimer ??
                  "This AI analysis is informational only and not a substitute for a licensed dermatologist."}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Section({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground mb-1">
        <Icon className="w-3.5 h-3.5" /> {title}
      </div>
      <p className="text-foreground/90 leading-relaxed">{text}</p>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
        <ListChecks className="w-3.5 h-3.5" /> {title}
      </div>
      <ul className="space-y-1">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-foreground/90">
            <span className="text-teal-400 mt-0.5">•</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
