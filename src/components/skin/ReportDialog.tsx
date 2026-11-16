import { useRef } from "react";
import { Printer, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { ImageAnalysis } from "@/lib/skinApi";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  result: ImageAnalysis | null;
  image: string;
};

export function ReportDialog({ open, onOpenChange, result, image }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const conf = result?.confidence != null ? Math.round((result.confidence <= 1 ? result.confidence * 100 : result.confidence)) : null;

  const printReport = () => {
    const html = ref.current?.outerHTML;
    if (!html) return;
    const w = window.open("", "_blank", "width=800,height=1000");
    if (!w) return;
    w.document.write(`<!doctype html><html><head><title>Skin Consultation Report</title>
      <style>
        body{font-family:Inter,system-ui,sans-serif;padding:32px;color:#0f172a;background:#fff;max-width:780px;margin:0 auto;}
        h1,h2,h3{font-family:Montserrat,system-ui,sans-serif;}
        h1{color:#0369a1;margin-bottom:4px;}
        .muted{color:#64748b;font-size:12px;}
        .card{border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin:12px 0;}
        img{max-width:100%;border-radius:12px;}
        ul{padding-left:20px;}
        .badge{display:inline-block;background:#0ea5e9;color:#fff;padding:4px 10px;border-radius:999px;font-size:12px;}
        @media print{ body{padding:0;} }
      </style></head><body>${html}</body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 400);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-heading text-2xl font-bold">Consultation Report</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={printReport}>
              <Printer className="w-4 h-4 mr-1.5" /> Print / Save PDF
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onOpenChange(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div ref={ref} className="space-y-4 p-2">
          <div>
            <h1 className="font-heading text-3xl font-bold text-sky-400">AI Skin Consultation Report</h1>
            <p className="muted text-xs text-muted-foreground">
              Generated {new Date().toLocaleString()} · AI Skin Specialist
            </p>
          </div>

          {image && (
            <div className="card rounded-xl border border-white/10 p-3">
              <div className="text-xs uppercase text-muted-foreground mb-2">Submitted Image</div>
              <img src={image} alt="Submitted skin sample" className="rounded-lg max-h-64" />
            </div>
          )}

          <div className="card rounded-xl border border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase text-muted-foreground">Detected condition</div>
                <div className="font-heading text-xl font-bold text-sky-400">
                  {result?.disease ?? "Unspecified"}
                </div>
              </div>
              {conf !== null && <span className="badge bg-sky-500 text-white px-3 py-1 rounded-full text-xs">{conf}% confidence</span>}
            </div>
          </div>

          {result?.symptoms && result.symptoms.length > 0 && (
            <Block title="Symptoms" items={result.symptoms} />
          )}
          {result?.next_steps && result.next_steps.length > 0 && (
            <Block title="Recommendations" items={result.next_steps} />
          )}
          {result?.explanation && (
            <div className="card rounded-xl border border-white/10 p-4">
              <div className="text-xs uppercase text-muted-foreground mb-1">Explanation</div>
              <p className="text-sm leading-relaxed">{result.explanation}</p>
            </div>
          )}

          <div className="text-[11px] text-muted-foreground border-t border-white/10 pt-3">
            <strong>Disclaimer:</strong> This report is AI-generated and is not a medical diagnosis. Always
            consult a licensed dermatologist for clinical assessment and treatment.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card rounded-xl border border-white/10 p-4">
      <div className="text-xs uppercase text-muted-foreground mb-1">{title}</div>
      <ul className="list-disc pl-5 text-sm space-y-0.5">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  );
}
