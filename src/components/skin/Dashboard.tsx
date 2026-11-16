import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Mic, Video, MessageSquare, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clearHistory, loadHistory, type HistoryEntry } from "@/lib/skinApi";
import { formatDistanceToNow } from "date-fns";

const ICONS = { image: Camera, voice: Mic, video: Video, chat: MessageSquare } as const;

export function Dashboard() {
  const [items, setItems] = useState<HistoryEntry[]>([]);
  useEffect(() => setItems(loadHistory()), []);
  const stats = {
    total: items.length,
    image: items.filter((i) => i.kind === "image").length,
    voice: items.filter((i) => i.kind === "voice").length,
    video: items.filter((i) => i.kind === "video").length,
    chat: items.filter((i) => i.kind === "chat").length,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard label="Total Analyses" value={stats.total} />
        <StatCard label="Images" value={stats.image} icon={Camera} />
        <StatCard label="Voice" value={stats.voice} icon={Mic} />
        <StatCard label="Videos" value={stats.video} icon={Video} />
        <StatCard label="Chats" value={stats.chat} icon={MessageSquare} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-300" /> Recent Consultations
          </h3>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                clearHistory();
                setItems([]);
              }}
            >
              <Trash2 className="w-4 h-4 mr-1.5" /> Clear
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            No consultations yet. Try Image, Voice, Video, or Chat to get started.
          </p>
        ) : (
          <ul className="divide-y divide-white/5">
            {items.map((it) => {
              const Icon = ICONS[it.kind];
              return (
                <motion.li
                  key={it.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="py-3 flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-sky-500/15 border border-sky-400/25 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-sky-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{it.title}</div>
                    {it.summary && (
                      <div className="text-xs text-muted-foreground truncate">{it.summary}</div>
                    )}
                  </div>
                  <div className="text-[11px] text-muted-foreground whitespace-nowrap">
                    {formatDistanceToNow(it.createdAt, { addSuffix: true })}
                  </div>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon?: any }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        {Icon && <Icon className="w-3.5 h-3.5 text-sky-300" />}
      </div>
      <div className="text-2xl font-heading font-bold">{value}</div>
    </div>
  );
}
