import { memo } from "react";

const items = [
  "Python",
  "RAG",
  "LangChain",
  "LangGraph",
  "FastAPI",
  "MCP",
  "FastMCP",
  "Groq",
  "FAISS",
  "Qdrant",
  "Whisper",
  "Gradio",
  "Streamlit",
  "Scikit-learn",
  "Pandas",
  "REST APIs",
];

const Row = () => (
  <div className="flex shrink-0 items-center gap-8 sm:gap-12 px-4 sm:px-6" aria-hidden>
    {items.map((t) => (
      <span
        key={t}
        className="text-xs sm:text-sm font-body uppercase tracking-[0.2em] text-muted-foreground/70 whitespace-nowrap transition-colors duration-300 hover:text-neon-emerald"
      >
        {t}
      </span>
    ))}
  </div>
);

const TechMarquee = memo(() => (
  <section className="relative py-6 sm:py-8 border-y border-glass-border/60 overflow-hidden">
    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-background to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-background to-transparent" />
    <div className="flex marquee-track">
      <Row />
      <Row />
    </div>
    <span className="sr-only">Technologies: {items.join(", ")}</span>
  </section>
));

TechMarquee.displayName = "TechMarquee";
export default TechMarquee;
