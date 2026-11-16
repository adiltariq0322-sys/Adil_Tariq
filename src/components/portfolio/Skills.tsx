import { memo } from "react";
import { motion } from "framer-motion";

const groups = [
  {
    title: "AI / LLM",
    items: [
      "Generative AI",
      "Agentic AI",
      "Retrieval-Augmented Generation (RAG)",
      "Multimodal AI",
      "Prompt Engineering",
    ],
  },
  {
    title: "Frameworks",
    items: ["LangChain", "LangGraph", "FastAPI", "Flask", "Gradio", "Streamlit", "Scikit-learn"],
  },
  { title: "Programming", items: ["Python", "SQL"] },
  {
    title: "AI APIs",
    items: ["Groq API", "Whisper", "Vision-Language Models", "Deepgram", "MCP", "FastMCP"],
  },
  { title: "Data", items: ["NumPy", "Pandas", "Matplotlib", "Seaborn"] },
  { title: "Tools", items: ["Git", "GitHub", "Uvicorn", "ngrok", "uv", "REST APIs"] },
];

const Skills = memo(() => (
  <section id="skills" className="section-padding relative">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16"
      >
        <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-neon-emerald mb-3 font-body">Technical Skills</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold neon-text shimmer-text">Skills &amp; Tools</h2>
      </motion.div>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="glass-card-hover p-5 sm:p-6"
          >
            <h3 className="font-heading font-semibold text-sm sm:text-base text-neon-gold mb-4">{g.title}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="text-[11px] sm:text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

Skills.displayName = "Skills";
export default Skills;
