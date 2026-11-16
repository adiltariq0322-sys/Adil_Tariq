import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SectionDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div ref={ref} className="py-4 flex justify-center">
      <motion.div
        style={{ scaleX, opacity }}
        className="h-px w-2/3 max-w-xl origin-center"
        aria-hidden
      >
        <div className="h-full w-full bg-gradient-to-r from-transparent via-neon-emerald/50 to-transparent" />
      </motion.div>
    </div>
  );
};

export default SectionDivider;
