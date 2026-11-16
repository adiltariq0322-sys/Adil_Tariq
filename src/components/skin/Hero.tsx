import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, PlayCircle } from "lucide-react";
import heroImg from "@/assets/skin-specialist-hero.jpg";

type Props = { onStart: () => void; onDemo: () => void };

export function Hero({ onStart, onDemo }: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/10 via-teal-500/5 to-transparent">
      <div className="grid md:grid-cols-2 gap-8 p-6 sm:p-10 lg:p-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Dermatology Assistant
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            AI Skin{" "}
            <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
              Specialist
            </span>
          </h1>
          <p className="mt-4 text-lg text-foreground/80">
            Voice, Image &amp; Video Based Skin Consultation Assistant powered by AI
          </p>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-xl">
            Upload an image, record your voice, or submit a short video to receive an AI-powered
            skin analysis. The assistant identifies possible skin conditions, explains symptoms,
            provides confidence scores, and suggests general skincare guidance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={onStart}
              className="bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white shadow-lg shadow-sky-500/20"
            >
              Start Diagnosis
            </Button>
            <Button size="lg" variant="outline" onClick={onDemo} className="border-white/20">
              <PlayCircle className="w-4 h-4 mr-2" />
              View Demo
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-sky-500/20 blur-3xl rounded-full" />
          <img
            src={heroImg}
            alt="AI skin analysis neural visualization"
            width={1600}
            height={1000}
            className="relative rounded-2xl border border-white/10 shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
