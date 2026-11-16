import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Bot, MessageCircle, Mail, LineChart, Cpu, Globe, Github } from "lucide-react";

const projects = [
  {
    title: "AI Customer Support Chatbot",
    category: "RAG / Generative AI",
    desc: "RAG-powered support chatbot trained on company knowledge base. Delivers instant, accurate, on-brand answers 24/7 with seamless human handoff for complex cases.",
    tech: ["Python", "LangChain", "OpenAI", "Pinecone", "FastAPI"],
    result: "Reduced support tickets by 60%",
    icon: Bot,
    gradient: "from-neon-emerald/20 to-neon-teal/20",
    liveUrl: "#",
    githubUrl: "https://github.com/adiltariq/ai-support-bot",
  },
  {
    title: "Intelligent Document Processing System",
    category: "AI Automation",
    desc: "End-to-end IDP pipeline that extracts, classifies, and validates data from invoices, contracts, and forms using LLMs and OCR — fully automated and human-in-the-loop ready.",
    tech: ["Python", "GPT-4", "Tesseract", "LangChain", "PostgreSQL"],
    result: "Cut manual data entry by 85%",
    icon: Mail,
    gradient: "from-neon-gold/20 to-neon-emerald/20",
    liveUrl: "#",
    githubUrl: "https://github.com/adiltariq/idp-system",
  },
  {
    title: "Automated Lead Qualification Agent",
    category: "AI Agent",
    desc: "Autonomous AI agent that qualifies inbound leads via WhatsApp & email, scores intent, books meetings, and syncs to CRM — replacing entire SDR workflows.",
    tech: ["OpenAI", "WhatsApp API", "Node.js", "HubSpot", "Supabase"],
    result: "3x more qualified meetings booked",
    icon: MessageCircle,
    gradient: "from-neon-teal/20 to-neon-gold/20",
    liveUrl: "#",
    githubUrl: "https://github.com/adiltariq/lead-agent",
  },
  {
    title: "Custom AI Analytics Dashboard",
    category: "AI + Data",
    desc: "AI-powered business analytics dashboard with natural-language querying, automated insight generation, and predictive forecasting — built for non-technical executives.",
    tech: ["Python", "GPT-4", "FastAPI", "React", "Recharts"],
    result: "Saves 15+ hours/week on reporting",
    icon: LineChart,
    gradient: "from-neon-amber/20 to-neon-gold/20",
    liveUrl: "#",
    githubUrl: "https://github.com/adiltariq/ai-dashboard",
  },
];

const Projects = memo(() => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-neon-emerald mb-3 font-body">Portfolio</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold neon-text shimmer-text">Featured Projects</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setSelected(i)}
              className="glass-card-hover cursor-pointer group overflow-hidden active:scale-[0.98] transition-transform"
            >
              <div className={`h-36 sm:h-48 bg-gradient-to-br ${p.gradient} flex items-center justify-center relative overflow-hidden`}>
                <p.icon className="w-12 h-12 sm:w-16 sm:h-16 text-foreground/20 group-hover:text-foreground/40 transition-all duration-500 group-hover:scale-110" />
              </div>
              <div className="p-4 sm:p-6">
                <span className="text-xs font-body text-neon-gold">{p.category}</span>
                <h3 className="font-heading font-semibold text-base sm:text-lg text-foreground mt-1 group-hover:text-neon-emerald transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2">{p.desc}</p>
                <p className="text-xs sm:text-sm text-neon-emerald font-semibold mt-3">✓ {p.result}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                  {p.tech.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-full bg-muted text-muted-foreground">
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 3 && (
                    <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-full bg-muted text-muted-foreground">
                      +{p.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
              onClick={() => setSelected(null)}
            >
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative glass-card w-full sm:max-w-lg p-6 sm:p-8 neon-border rounded-t-2xl sm:rounded-xl max-h-[85vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
                {(() => {
                  const p = projects[selected];
                  return (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <p.icon className="w-5 h-5 sm:w-6 sm:h-6 text-neon-emerald" />
                        </div>
                        <div>
                          <span className="text-xs text-neon-gold">{p.category}</span>
                          <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">{p.title}</h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">{p.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
                        {p.tech.map((t) => (
                          <span key={t} className="text-xs px-3 py-1 rounded-full neon-border text-neon-emerald">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        {p.liveUrl && p.liveUrl !== "#" && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-neon flex-1 flex items-center justify-center gap-2 text-sm"
                          >
                            Live Demo <ExternalLink size={14} />
                          </a>
                        )}
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-neon-emerald/50 transition-colors"
                        >
                          <Github size={14} /> Source Code
                        </a>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
});

Projects.displayName = "Projects";
export default Projects;
