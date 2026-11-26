import { memo } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";

const experience = [
  {
    role: "Founder & AI Engineer",
    org: "InnoVex",
    period: "2026 – Present",
    points: [
      "Building and selling websites, AI agents and automation for small businesses in Lahore, Dubai and worldwide.",
      "Shipped a live Next.js + WooCommerce storefront for EverShine and a scroll-cinematic villa website.",
      "Running B2B cold-email outreach (TorqueTalk) and AI drone-video pitches for real estate brokers.",
      "Building AI voice receptionists, WhatsApp agents and RAG chatbots from demo to live product.",
    ],
  },
  {
    role: "AI Engineer Intern",
    org: "Decode Labs",
    period: "May 5 – Aug 5, 2026 · 3 Months",
    points: [
      "Assisted in building and testing AI-driven features.",
      "Contributed to RAG-based components under senior engineer guidance.",
      "Worked with Python and LangChain pipelines.",
      "Helped debug and improve existing AI workflows.",
      "Supported API integration and testing for agentic AI workflows.",
    ],
  },
  {
    role: "AI / RAG Intern (Structured Training)",
    org: "HopeToSkill",
    period: "May – Aug 2026",
    points: [
      "Learned and practiced Retrieval-Augmented Generation.",
      "Worked on small-scale RAG prototypes.",
      "Practiced LangChain concepts.",
      "Practiced prompt engineering and pipeline debugging.",
      "Worked under mentor supervision.",
    ],
  },
];

const certifications = [
  { title: "AI Engineer Course", org: "DigiSkills.pk" },
  { title: "Retrieval-Augmented Generation (RAG)", org: "HopeToSkill" },
  { title: "Agentic AI Systems", org: "HopeToSkill" },
  { title: "AI-Assisted Software Development (DSTP 3.0 Batch-05)", org: "DigiSkills.pk — In progress, started Dec 2026" },
];

const Experience = memo(() => (
  <section id="experience" className="section-padding relative">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16"
      >
        <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-neon-emerald mb-3 font-body">Background</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold neon-text shimmer-text">
          Experience &amp; Education
        </h2>
      </motion.div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 mb-6 sm:mb-8">
        {experience.map((e, i) => (
          <motion.article
            key={e.role}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass-card-hover p-5 sm:p-7"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 text-neon-emerald" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-base sm:text-lg text-foreground">{e.role}</h3>
                <p className="text-xs sm:text-sm text-neon-gold">{e.org}</p>
              </div>
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground mb-4">{e.period}</p>
            <ul className="space-y-2">
              {e.points.map((p) => (
                <li key={p} className="text-xs sm:text-sm text-muted-foreground flex gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-neon-emerald shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card-hover p-5 sm:p-7"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-neon-emerald" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-base sm:text-lg text-foreground">BS Computer Science</h3>
              <p className="text-xs sm:text-sm text-neon-gold">Leads University</p>
            </div>
          </div>
          <p className="text-[11px] sm:text-xs text-muted-foreground mb-4">In Progress — Expected March 2027</p>
          <div className="flex flex-wrap gap-2">
            {["Artificial Intelligence", "Machine Learning", "Data Structures & Algorithms"].map((t) => (
              <span key={t} className="text-[11px] sm:text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="glass-card-hover p-5 sm:p-7"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-neon-emerald" />
            </div>
            <h3 className="font-heading font-semibold text-base sm:text-lg text-foreground">
              Certifications &amp; Trainings
            </h3>
          </div>
          <ul className="space-y-3">
            {certifications.map((c) => (
              <li key={c.title} className="flex gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-neon-gold shrink-0" />
                <span className="text-xs sm:text-sm text-foreground">
                  {c.title}
                  <span className="text-muted-foreground"> — {c.org}</span>
                </span>
              </li>
            ))}
          </ul>
        </motion.article>
      </div>
    </div>
  </section>
));

Experience.displayName = "Experience";
export default Experience;
