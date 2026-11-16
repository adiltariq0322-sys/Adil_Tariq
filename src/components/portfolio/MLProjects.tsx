import { memo } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Check, HeartPulse, Microscope } from "lucide-react";
import heartImg from "@/assets/project-heart.jpg";
import cancerImg from "@/assets/project-cancer.jpg";

const mlProjects = [
  {
    title: "Heart Disease Prediction System",
    category: "Healthcare AI",
    icon: HeartPulse,
    image: heartImg,
    imageAlt: "Heart Disease Prediction System — ML healthcare illustration",
    desc: "An AI-powered Heart Disease Prediction System developed using Machine Learning to analyze patient health data and predict the likelihood of heart disease. Performs data preprocessing, feature analysis, model training, and prediction to support early risk assessment and healthcare decision-making.",
    features: [
      "Heart disease risk prediction",
      "Real-time prediction interface",
      "Data preprocessing & feature engineering",
      "ML model evaluation",
      "Interactive visualizations",
      "User-friendly dashboard",
    ],
    tech: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Machine Learning"],
    accent: "emerald" as const,
    github:
      "https://github.com/adiltariq234/intelligent-workflow-hub/tree/main/python/Heart%20Disease%20Prediction%20App",
  },
  {
    title: "Cancer Prediction Model",
    category: "Predictive Healthcare ML",
    icon: Microscope,
    image: cancerImg,
    imageAlt: "Cancer Prediction Model — medical ML illustration",
    desc: "A Machine Learning-based Cancer Prediction System designed to analyze medical diagnostic data and predict potential cancer cases. Demonstrates expertise in predictive analytics, healthcare AI, model optimization, and intelligent decision-making.",
    features: [
      "Cancer risk prediction",
      "Medical data analysis",
      "Predictive modeling",
      "Model performance evaluation",
      "Data visualization",
      "Scalable architecture",
    ],
    tech: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Machine Learning"],
    accent: "gold" as const,
    github:
      "https://github.com/adiltariq234/intelligent-workflow-hub/tree/main/python/cancer-predictor",
  },
];

const MLProjects = memo(() => {
  return (
    <section id="ml-projects" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-neon-emerald mb-3 font-body">
            Machine Learning
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold neon-text shimmer-text">
            Machine Learning Projects
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            Production-grade ML systems applied to real-world healthcare problems —
            data preprocessing, model training, evaluation, and deployment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {mlProjects.map((p, i) => {
            const Icon = p.icon;
            const badgeBorder =
              p.accent === "emerald"
                ? "border-neon-emerald/40 text-neon-emerald"
                : "border-neon-gold/40 text-neon-gold";
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card-hover group overflow-hidden flex flex-col"
              >
                <div className="relative overflow-hidden aspect-[16/10] border-b border-glass-border">
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                  <span
                    className={`absolute top-3 right-3 text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-md border ${badgeBorder} font-body`}
                  >
                    ML · Healthcare
                  </span>
                  <div className="absolute bottom-3 left-3 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-background/70 backdrop-blur-md border border-glass-border flex items-center justify-center">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-neon-emerald" aria-hidden="true" />
                  </div>
                </div>

                <div className="p-5 sm:p-7 flex flex-col flex-1">
                  <span className="text-xs font-body text-neon-gold tracking-wide">
                    {p.category}
                  </span>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground mt-1 group-hover:text-neon-emerald transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
                    {p.desc}
                  </p>

                  <ul className="mt-4 grid sm:grid-cols-2 gap-x-3 gap-y-1.5">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                      >
                        <Check className="w-3.5 h-3.5 text-neon-emerald shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-5">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${p.title} on GitHub`}
                      className="w-full flex items-center justify-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-neon-emerald/40 text-neon-emerald hover:bg-neon-emerald/10 hover:border-neon-emerald hover:shadow-[0_0_20px_hsl(var(--neon-emerald)/0.25)] transition-all duration-300"
                    >
                      <Github size={16} /> View Project
                      <ExternalLink size={12} className="opacity-70" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
});

MLProjects.displayName = "MLProjects";
export default MLProjects;
