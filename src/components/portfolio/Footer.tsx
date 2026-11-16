import { memo } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink } from "lucide-react";

const Footer = memo(() => (
  <footer className="border-t border-border/50 py-6 sm:py-8 md:py-10 px-4">
    <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:justify-between">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-heading font-bold text-lg neon-text"
      >
        Hafiz Adil
      </motion.p>

      <div className="flex items-center gap-3 sm:gap-4">
        {[
          { icon: Linkedin, href: "https://www.linkedin.com/in/innovex-marketing-41bb13392/", label: "LinkedIn" },
          { icon: ExternalLink, href: "#", label: "Fiverr" },
          { icon: Github, href: "#", label: "GitHub" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-neon-emerald hover:border-neon-emerald/50 transition-all duration-300 active:scale-95"
            aria-label={s.label}
          >
            <s.icon size={16} />
          </a>
        ))}
      </div>

      <p className="text-[10px] sm:text-xs text-muted-foreground">
        © {new Date().getFullYear()} Hafiz Adil. All rights reserved.
      </p>
    </div>
  </footer>
));

Footer.displayName = "Footer";
export default Footer;
