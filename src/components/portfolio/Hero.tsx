import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/adil-tariq-portrait.webp";


const titles = ["AI Voice Receptionists", "RAG Chatbots", "WhatsApp AI Agents", "Business Websites & Stores", "Workflow Automation", "SEO & Local Search"];

const Hero = memo(() => {
  const [displayText, setDisplayText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const current = titles[titleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex((i) => i + 1);
          if (charIndex + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(current.slice(0, charIndex - 1));
          setCharIndex((i) => i - 1);
          if (charIndex - 1 === 0) {
            setIsDeleting(false);
            setTitleIndex((i) => (i + 1) % titles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  return (
    <section className="relative min-h-[92svh] flex items-center overflow-hidden border-b border-border/70">
      <div className="absolute inset-0">
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/85 to-background" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-10 sm:pt-28 sm:pb-14">
        <div className="grid md:grid-cols-[1.15fr_0.85fr] items-center gap-8 md:gap-10 lg:gap-20">
          <motion.div
            className="text-left order-2 md:order-1"
            initial={{ opacity: 0, y: isMobile ? 14 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.45 : 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="flex items-center gap-3 mb-4 sm:mb-6"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <span className="h-px w-8 bg-secondary" />
              <p className="text-xs sm:text-sm font-heading font-semibold uppercase text-secondary">
                InnoVex · AI Agency for Small Businesses
              </p>
            </motion.div>

            <motion.h1
              className="max-w-3xl font-serif text-[2.55rem] sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.04] tracking-normal text-foreground"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.65 }}
            >
              We build AI that brings small businesses <span className="text-primary">more customers</span>.
            </motion.h1>

            <motion.p
              className="max-w-2xl mt-5 sm:mt-7 text-sm sm:text-base md:text-lg font-body text-foreground/70 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.55 }}
            >
              InnoVex is an AI agency in Lahore. We build AI agents, business websites and automation for clinics, restaurants, real estate and auto businesses — in Lahore, Dubai and worldwide. Every project starts with a free demo: you see the result before you pay anything.
            </motion.p>

            <motion.div
              className="mt-4 sm:mt-5 h-6 text-xs sm:text-sm font-heading font-medium text-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              aria-live="polite"
            >
              <span>{displayText}</span>
              <span className="typing-cursor ml-1">&nbsp;</span>
            </motion.div>

            <motion.div
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.55 }}
            >
              <Button asChild size="lg" className="group min-h-12 rounded-sm font-heading font-semibold">
                <a href="#contact">
                  Get a Free Demo
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-h-12 rounded-sm border-secondary/45 bg-background/40 text-foreground hover:bg-secondary/10 hover:text-secondary">
                <a href="#projects">
                  Explore Projects
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              className="hidden lg:grid grid-cols-3 gap-6 mt-10 pt-6 border-t border-border/70 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.55 }}
            >
              {[
                ["Projects delivered", "18"],
                ["Services", "9"],
                ["Free demo", "In 2 days"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="mt-1 text-sm font-heading font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative order-1 md:order-2 mx-auto md:mr-0 w-44 sm:w-64 md:w-full max-w-[390px] flex flex-col items-center sm:block"
            initial={{ opacity: 0, x: isMobile ? 0 : 24, y: isMobile ? 12 : 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t border-l border-primary/55" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b border-r border-secondary/60" />
            <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card shadow-elegant">
              <img
                src={portrait}
                alt="Hafiz Adil — Founder, InnoVex"
                width={800}
                height={1000}
                loading="eager"
                className="w-full h-full object-cover object-top grayscale-[20%] transition-all duration-700 hover:grayscale-0"
              />
            </div>
            <div className="relative mt-3 sm:mt-0 sm:absolute sm:left-3 sm:bottom-3 border border-border bg-background/95 px-4 py-2.5 shadow-elegant backdrop-blur-sm">
              <p className="text-xs text-muted-foreground">Current status</p>
              <p className="mt-1 flex items-center gap-2 text-xs sm:text-sm font-heading font-medium text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Now taking on new clients
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
