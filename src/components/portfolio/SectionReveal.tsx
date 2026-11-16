import { useRef, memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade-up" | "scale" | "slide-left" | "slide-right" | "blur";
}

const desktopVariants = {
  "fade-up": { initialY: 50, initialScale: 1, initialX: 0, initialBlur: 0 },
  scale: { initialY: 0, initialScale: 0.92, initialX: 0, initialBlur: 4 },
  "slide-left": { initialY: 0, initialScale: 1, initialX: -60, initialBlur: 0 },
  "slide-right": { initialY: 0, initialScale: 1, initialX: 60, initialBlur: 0 },
  blur: { initialY: 25, initialScale: 0.98, initialX: 0, initialBlur: 8 },
};

const mobileVariants = {
  "fade-up": { initialY: 24, initialScale: 1, initialX: 0, initialBlur: 0 },
  scale: { initialY: 0, initialScale: 0.96, initialX: 0, initialBlur: 0 },
  "slide-left": { initialY: 16, initialScale: 1, initialX: 0, initialBlur: 0 },
  "slide-right": { initialY: 16, initialScale: 1, initialX: 0, initialBlur: 0 },
  blur: { initialY: 16, initialScale: 0.99, initialX: 0, initialBlur: 0 },
};

const SectionReveal = memo(({ children, className = "", variant = "fade-up" }: SectionRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.45"],
  });

  const config = isMobile ? mobileVariants[variant] : desktopVariants[variant];
  // Buttery smooth spring: lower stiffness + higher damping = less bouncy, more elegant
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 28, mass: 0.8 });

  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const y = useTransform(progress, [0, 1], [config.initialY, 0]);
  const x = useTransform(progress, [0, 1], [config.initialX, 0]);
  const scale = useTransform(progress, [0, 1], [config.initialScale, 1]);
  const blur = useTransform(progress, [0, 1], [config.initialBlur, 0]);
  const filterStr = useTransform(blur, (v) => v > 0.5 ? `blur(${v}px)` : "none");

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ opacity, y, x, scale, filter: filterStr }}
        className="will-change-transform backface-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
});

SectionReveal.displayName = "SectionReveal";
export default SectionReveal;
