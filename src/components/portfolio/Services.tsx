import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Brain, Bot, Workflow, Code2, Globe, AudioLines, Clapperboard, Megaphone, Search, ArrowRight, type LucideIcon } from "lucide-react";
import { useRef, type MouseEvent, memo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  index: number;
}

const TiltCard = ({ icon: Icon, title, desc, index }: ServiceCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: MouseEvent) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={isMobile ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="glass-card-hover p-6 sm:p-8 cursor-default group relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/45 to-transparent" />
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-md bg-muted border border-border flex items-center justify-center mb-4 sm:mb-5 group-hover:border-secondary/40 transition-colors duration-300">
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-secondary transition-colors duration-300" />
      </div>
      <h3 className="font-heading font-semibold text-base sm:text-lg text-foreground mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>
      <a
        href="#contact"
        aria-label={`Get a free demo for ${title}`}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-body text-primary hover:text-secondary transition-colors"
      >
        Get a free demo <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
};

const services = [
  { icon: Brain, title: "Generative AI & LLM Solutions", desc: "Custom AI apps and copilots that automate decisions and open new revenue." },
  { icon: Bot, title: "Custom RAG Chatbots & AI Agents", desc: "Chatbots trained on your business that answer customers 24/7 on your website and WhatsApp." },
  { icon: Workflow, title: "Workflow Automation", desc: "Bookings, follow-ups and CRM updates that run themselves — no extra hiring." },
  { icon: Code2, title: "Python Development & AI Integration", desc: "Production-grade Python backends and APIs that connect AI to the tools you already use." },
  { icon: Globe, title: "Website Development", desc: "Fast, conversion-focused websites and online stores that turn visitors into enquiries." },
  { icon: Search, title: "SEO & Local Search", desc: "Rank on Google and in AI answers from ChatGPT and Gemini when customers search near you." },
  { icon: AudioLines, title: "AI Voice Agents", desc: "AI receptionists that answer calls, qualify leads and book appointments while you work." },
  { icon: Clapperboard, title: "UGC Ads & Short-Form Video", desc: "UGC-style video ads that make your product clear, relatable and easy to buy." },
  { icon: Megaphone, title: "AI Marketing & Paid Ads", desc: "AI-assisted campaigns and ad creative for Facebook, Instagram, TikTok and Google — measured on leads and sales." },
];

const Services = memo(() => (
  <section id="services" className="section-padding relative scroll-mt-20">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16"
      >
        <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-secondary mb-3 font-body">What We Do</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">Everything your business needs to grow</h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">AI agents, websites, automation and SEO — built for small businesses, delivered live.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" style={{ perspective: 1000 }}>
        {services.map((s, i) => (
          <TiltCard key={s.title} {...s} index={i} />
        ))}
      </div>
    </div>
  </section>
));

Services.displayName = "Services";
export default Services;
