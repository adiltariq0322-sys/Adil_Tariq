import { motion } from "framer-motion";
import {
  Camera,
  Mic,
  Video,
  MessageSquare,
  Microscope,
  Gauge,
  FileText,
  LayoutDashboard,
  Smartphone,
  MoonStar,
} from "lucide-react";

const features = [
  { icon: Camera, title: "Image Analysis", desc: "Upload a clear photo of the affected skin area." },
  { icon: Mic, title: "Voice Consultation", desc: "Describe your symptoms — we transcribe and analyze." },
  { icon: Video, title: "Video Analysis", desc: "Short clips analyzed frame-by-frame for lesions." },
  { icon: MessageSquare, title: "AI Chat Assistant", desc: "Streamed answers powered by Groq LLM." },
  { icon: Microscope, title: "Skin Disease Detection", desc: "Detects common dermatological conditions." },
  { icon: Gauge, title: "Confidence Score", desc: "Every prediction ships with a confidence value." },
  { icon: FileText, title: "Medical Report", desc: "Downloadable, printable consultation report." },
  { icon: LayoutDashboard, title: "History Dashboard", desc: "All past consultations in one place." },
  { icon: Smartphone, title: "Responsive Design", desc: "Fully mobile-first, touch-optimized." },
  { icon: MoonStar, title: "Dark / Light Mode", desc: "Comfortable at any hour of the day." },
];

export function Features() {
  return (
    <section className="mt-16 sm:mt-24">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold">Everything a modern skin consultation needs</h2>
        <p className="text-muted-foreground mt-3">
          Ten purpose-built capabilities designed for accuracy, clarity, and trust.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5 hover:border-sky-400/40 hover:bg-sky-500/[0.06] transition"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500/20 to-teal-500/20 border border-sky-400/30 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <f.icon className="w-5 h-5 text-sky-300" />
            </div>
            <h3 className="font-semibold text-sm">{f.title}</h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
