import { memo } from "react";
import { motion } from "framer-motion";
import { Bot, Layers, Globe, Zap } from "lucide-react";
import portrait from "@/assets/adil-tariq-portrait.webp";

const highlights = [
  { icon: Bot, label: "Projects Delivered", value: "19" },
  { icon: Layers, label: "Services", value: "9" },
  { icon: Globe, label: "Live Websites", value: "4" },
  { icon: Zap, label: "Free Demo", value: "2 Days" },
];

const focusAreas = [
  "Retrieval-Augmented Generation (RAG)",
  "Agentic AI with LangGraph",
  "LangChain pipelines",
  "Multimodal AI (voice + image)",
  "MCP tooling for AI agents",
  "Python APIs with FastAPI & Flask",
];

const About = memo(() => (
  <section id="about" className="section-padding relative scroll-mt-20">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16"
      >
        <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-neon-emerald mb-3 font-body">About InnoVex</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold neon-text shimmer-text">
          The AI agency for small businesses
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-8 md:gap-12 items-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto w-full max-w-[320px]"
        >
          <div className="absolute -inset-3 rounded-lg bg-secondary/5 blur-xl" />
          <div className="relative glass-card overflow-hidden hover-lift">
            <img
              src={portrait}
              alt="Portrait of Hafiz Adil, AI Engineer"
              width={640}
              height={800}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-4">
              <p className="font-heading font-semibold text-foreground text-sm sm:text-base">Hafiz Adil</p>
              <p className="text-xs text-neon-emerald">Founder, InnoVex</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed space-y-4"
        >
          <p>
            <span className="text-foreground font-semibold">InnoVex</span> is an AI agency based in Lahore, Pakistan. We build AI agents,
            business websites and automation for small businesses — clinics, restaurants, real estate agencies and auto businesses in Lahore,
            Dubai and worldwide.
          </p>
          <p>
            We don't sell technology. We sell outcomes:{" "}
            <span className="text-neon-emerald">more calls, more bookings, more customers</span>. Every project starts with a free working
            demo — you see the result before you pay anything.
          </p>
          <p>
            Our work is already live: a Next.js storefront for EverShine, a scroll-cinematic villa website, and a website for Azeem
            Inspiration Institute — plus AI receptionists and WhatsApp agents built for{" "}
            <span className="text-neon-emerald">real businesses</span>.
          </p>
        </motion.div>
      </div>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 md:mb-16">
        {highlights.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="glass-card-hover p-4 sm:p-6 text-center"
          >
            <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-neon-emerald mx-auto mb-2 sm:mb-3" />
            <p className="text-lg sm:text-2xl md:text-3xl font-heading font-bold neon-text shimmer-text">{item.value}</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{item.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-card p-5 sm:p-8"
      >
        <h3 className="font-heading font-semibold text-base sm:text-lg text-foreground mb-4">Current Focus Areas</h3>
        <div className="flex flex-wrap gap-2">
          {focusAreas.map((f) => (
            <span
              key={f}
              className="text-xs sm:text-sm px-3 py-1.5 rounded-full neon-border text-neon-emerald"
            >
              {f}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
));

About.displayName = "About";
export default About;
