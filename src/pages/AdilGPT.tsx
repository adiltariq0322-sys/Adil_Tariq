import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  PlayCircle,
  Sparkles,
  Cpu,
  Database,
  Shield,
  Zap,
  FileText,
  Layers,
  Bot,
  Code2,
  Server,
  Lock,
  GitBranch,
  Rocket,
  Star,
  Copy,
  Share2,
  Mail,
  Boxes,
  Workflow,
  MessageSquare,
  Terminal,
  BookOpen,
  Cloud,
  Container,
  KeyRound,
  Search,
  Brain,
  Check,
} from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import ParticleField from "@/components/portfolio/ParticleField";
import heroImg from "@/assets/adilgpt-hero.jpg";

const REPO = "https://github.com/adiltariq234/AdilGPT";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const Section = ({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="section-padding relative">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="text-center mb-10 sm:mb-14"
      >
        {eyebrow && (
          <motion.p
            variants={fadeUp}
            className="text-xs sm:text-sm tracking-[0.3em] uppercase text-neon-emerald mb-3 font-body"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h2
          variants={fadeUp}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold neon-text"
        >
          {title}
        </motion.h2>
        {description && (
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground font-body leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
      {children}
    </div>
  </section>
);

const features = [
  { icon: Sparkles, label: "Multi-LLM Support", desc: "Route requests across Gemini, Groq & Mistral." },
  { icon: Bot, label: "LangGraph Agent", desc: "Deterministic tool-calling agent workflow." },
  { icon: Layers, label: "LangChain", desc: "Composable chains for RAG & tools." },
  { icon: Server, label: "FastAPI Backend", desc: "Async Python API with OpenAPI docs." },
  { icon: KeyRound, label: "JWT Authentication", desc: "Secure token-based auth & sessions." },
  { icon: Database, label: "SQLite + Alembic", desc: "Versioned schema, easy migrations." },
  { icon: MessageSquare, label: "Conversation History", desc: "Persistent multi-turn chats." },
  { icon: Brain, label: "Long-Term Memory", desc: "Per-user memory across sessions." },
  { icon: Search, label: "RAG Pipeline", desc: "Semantic retrieval over your docs." },
  { icon: Boxes, label: "ChromaDB Vectors", desc: "Fast local vector storage." },
  { icon: FileText, label: "PDF / DOCX / TXT", desc: "Ingest documents in seconds." },
  { icon: Zap, label: "Streaming Responses", desc: "Token-by-token SSE streaming." },
  { icon: Container, label: "Docker Ready", desc: "Docker Compose for one-cmd deploy." },
  { icon: Shield, label: "Security Middleware", desc: "Headers, request IDs, timing." },
  { icon: Lock, label: "Rate Limiting", desc: "Protect endpoints from abuse." },
  { icon: Code2, label: "Markdown + Code", desc: "Rich rendering with syntax highlight." },
  { icon: Cpu, label: "Regenerate & Copy", desc: "Polished chat UX controls." },
  { icon: Rocket, label: "Production Ready", desc: "Hardened for real workloads." },
];

const architecture = [
  "User", "Frontend", "FastAPI", "Authentication", "Database",
  "LangGraph Agent", "Selected LLM", "AI Tools", "Vector Database", "Response",
];

const tech = [
  "Python", "FastAPI", "LangGraph", "LangChain", "Google Gemini", "Groq",
  "Mistral AI", "SQLite", "Alembic", "Docker", "ChromaDB", "JWT",
  "HTML", "CSS", "JavaScript",
];

const files = [
  { name: "app.py", desc: "FastAPI entry point, routes & lifespan." },
  { name: "agent.py", desc: "LangGraph agent, tool routing & state." },
  { name: "auth.py", desc: "JWT auth, password hashing, sessions." },
  { name: "config.py", desc: "Env, model registry & settings." },
  { name: "database.py", desc: "SQLAlchemy models & engine." },
  { name: "middleware.py", desc: "Security, timing, rate limits, IDs." },
  { name: "rag.py", desc: "Loaders, chunking, embeddings, retrieval." },
  { name: "tools.py", desc: "Calculator, memory, search, RAG tools." },
  { name: "templates/", desc: "Server-rendered HTML shell." },
  { name: "alembic/", desc: "Database migrations." },
  { name: "Dockerfile", desc: "Production image build." },
  { name: "docker-compose.yml", desc: "Local & prod orchestration." },
  { name: "requirements.txt", desc: "Pinned Python dependencies." },
  { name: ".env.example", desc: "All required environment keys." },
];

const workflow = [
  "User sends prompt", "Authentication", "Database log", "LangGraph routing",
  "Selected AI Model", "Tool calling", "RAG retrieval", "Streaming tokens", "Frontend render",
];

const models = [
  { name: "Gemini 2.5 Flash", provider: "Google", tag: "Fast · Cheap" },
  { name: "Gemini 2.5 Pro", provider: "Google", tag: "Advanced reasoning" },
  { name: "Llama 3.3 70B", provider: "Groq", tag: "Ultra-low latency" },
  { name: "Llama 3.1 8B", provider: "Groq", tag: "Lightweight" },
  { name: "DeepSeek R1 Distill", provider: "Groq", tag: "Reasoning" },
  { name: "Mistral Small", provider: "Mistral", tag: "Balanced" },
  { name: "Mistral Large", provider: "Mistral", tag: "Flagship" },
];

const ragFlow = [
  "Upload Document", "Read File", "Chunking", "Embeddings",
  "ChromaDB", "Retriever", "Context Injection", "LLM", "Final Response",
];

const security = [
  { icon: KeyRound, label: "JWT Authentication" },
  { icon: Lock, label: "Password Hashing" },
  { icon: Shield, label: "Security Headers" },
  { icon: Zap, label: "Rate Limiting" },
  { icon: Terminal, label: "Timing Middleware" },
  { icon: GitBranch, label: "Request IDs" },
];

const dbTables = [
  { name: "Users", desc: "Accounts, hashed passwords, roles." },
  { name: "Conversations", desc: "Chat sessions per user, titles, timestamps." },
  { name: "Messages", desc: "Turn-by-turn history with model & tokens." },
  { name: "Long-Term Memory", desc: "Persistent user facts & preferences." },
];

const endpoints = [
  { m: "GET", p: "/health", d: "Liveness probe" },
  { m: "GET", p: "/ready", d: "Readiness with dependencies" },
  { m: "POST", p: "/auth/register", d: "Create account" },
  { m: "POST", p: "/auth/login", d: "Issue JWT" },
  { m: "GET", p: "/me", d: "Current user profile" },
  { m: "GET", p: "/conversations", d: "List conversation history" },
  { m: "PATCH", p: "/conversations/{id}", d: "Rename conversation" },
  { m: "DELETE", p: "/conversations/{id}", d: "Delete conversation" },
  { m: "POST", p: "/upload", d: "Ingest PDF / DOCX / TXT" },
  { m: "POST", p: "/chat/stream", d: "Server-Sent streaming chat" },
];

const metrics = [
  { v: "25+", l: "API Endpoints" },
  { v: "7", l: "AI Models" },
  { v: "20+", l: "Features" },
  { v: "100%", l: "Responsive" },
  { v: "Prod", l: "Ready" },
];

const challenges = [
  "Building Multi-LLM abstraction & routing",
  "Robust JWT authentication & sessions",
  "SSE streaming with backpressure",
  "Grounded RAG with document ingestion",
  "Long-term memory design",
  "Dockerized production deployment",
];

const learned = [
  "LangGraph", "AI Agents", "FastAPI", "Backend Engineering",
  "Authentication", "Docker", "Prompt Engineering",
  "Software Architecture", "Production AI Systems",
];

const roadmap = [
  "Redis cache", "PostgreSQL", "Qdrant", "Voice Assistant",
  "Vision Models", "Image Generation", "Analytics Dashboard",
  "Admin Panel", "OAuth Login", "Cloud Deployment", "CI/CD",
];

const methodBadge = (m: string) => {
  const map: Record<string, string> = {
    GET: "text-neon-emerald border-neon-emerald/40",
    POST: "text-neon-gold border-neon-gold/40",
    PATCH: "text-neon-teal border-neon-teal/40",
    DELETE: "text-neon-amber border-neon-amber/40",
  };
  return map[m] || "text-muted-foreground border-border";
};

const AdilGPT = () => {
  useEffect(() => {
    document.title = "AdilGPT — Production-Ready AI Assistant | Hafiz Adil";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta(
      "description",
      "AdilGPT — production-ready AI assistant built with FastAPI, LangGraph, LangChain, Gemini, Groq, Mistral AI, RAG, JWT auth and long-term memory."
    );
    const setOg = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setOg("og:title", "AdilGPT — Production-Ready AI Assistant | Hafiz Adil");
    setOg(
      "og:description",
      "AdilGPT — production-ready AI assistant built with FastAPI, LangGraph, LangChain, Gemini, Groq, Mistral AI, RAG, JWT auth and long-term memory."
    );
    setOg("og:url", "https://adil-tariq-ai.vercel.app/adilgpt");
    setMeta("twitter:title", "AdilGPT — Production-Ready AI Assistant | Hafiz Adil");
    setMeta(
      "twitter:description",
      "AdilGPT — production-ready AI assistant built with FastAPI, LangGraph, LangChain, Gemini, Groq, Mistral AI, RAG, JWT auth and long-term memory."
    );
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://adil-tariq-ai.vercel.app/adilgpt");
    else {
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", "https://adil-tariq-ai.vercel.app/adilgpt");
      document.head.appendChild(link);
    }
  }, []);

  const copyRepo = async () => {
    try {
      await navigator.clipboard.writeText(REPO);
    } catch {}
  };
  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "AdilGPT", url: REPO });
      } else {
        await navigator.clipboard.writeText(REPO);
      }
    } catch {}
  };

  return (
    <div className="gradient-bg-animated min-h-screen relative">
      <ParticleField />
      <Navbar />
      <main className="relative z-10 pt-24 sm:pt-28">
        {/* Back link */}
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
        </div>

        {/* HERO */}
        <section className="section-padding relative">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-neon-emerald font-body glass-card !py-1.5 !px-3 rounded-full"
              >
                <Sparkles size={12} /> Flagship Project
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold neon-text leading-[1.05]"
              >
                AdilGPT
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-4 text-base sm:text-lg text-foreground/90 font-body"
              >
                Production-Ready AI Assistant for Modern AI Applications.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mt-3 text-sm sm:text-base text-muted-foreground font-body leading-relaxed max-w-xl"
              >
                A scalable AI assistant built with FastAPI, LangGraph, LangChain, Gemini, Groq,
                Mistral AI, RAG, Long-Term Memory, Streaming Responses, and production-level
                backend architecture.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
                <a
                  href={REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon inline-flex items-center gap-2 text-sm"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
                <a
                  href={REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl border border-border text-foreground hover:border-neon-emerald/50 hover:text-neon-emerald transition-colors"
                >
                  <Github size={16} /> GitHub Repository
                </a>
                <a
                  href={REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl border border-border text-foreground hover:border-neon-gold/50 hover:text-neon-gold transition-colors"
                >
                  <PlayCircle size={16} /> Watch Demo
                </a>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
                {["FastAPI", "LangGraph", "Gemini", "Groq", "Mistral", "RAG", "Docker"].map((t) => (
                  <span
                    key={t}
                    className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-gradient-to-br from-neon-emerald/20 via-neon-gold/10 to-neon-teal/20 blur-3xl rounded-[3rem] pointer-events-none" />
              <div className="glass-card neon-border overflow-hidden rounded-2xl relative">
                <img
                  src={heroImg}
                  alt="AdilGPT premium dashboard mockup"
                  width={1408}
                  height={912}
                  className="w-full h-auto"
                />
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 glass-card !p-3 !py-2 rounded-xl flex items-center gap-2 text-xs text-foreground"
              >
                <Zap size={14} className="text-neon-emerald" /> Streaming
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-5 glass-card !p-3 !py-2 rounded-xl flex items-center gap-2 text-xs text-foreground"
              >
                <Brain size={14} className="text-neon-gold" /> RAG + Memory
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* OVERVIEW */}
        <Section
          eyebrow="Overview"
          title="Production-grade AI engineering in one project"
          description="AdilGPT demonstrates the full stack of building a real AI product — from streaming LLM inference and agentic tool use, to secure auth, migrations, RAG, and Dockerized deployment."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Server, t: "FastAPI backend", d: "Async, typed, OpenAPI-first." },
              { icon: Workflow, t: "LangGraph agent", d: "Deterministic tool routing." },
              { icon: Cloud, t: "Multi-LLM", d: "Gemini, Groq, Mistral in one." },
              { icon: Container, t: "Dockerized", d: "One-command deployment." },
            ].map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="glass-card-hover p-5"
              >
                <f.icon className="w-6 h-6 text-neon-emerald" />
                <h3 className="mt-3 font-heading font-semibold text-foreground">{f.t}</h3>
                <p className="text-xs text-muted-foreground mt-1 font-body">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* FEATURES */}
        <Section eyebrow="Features" title="Everything a modern AI product needs">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {features.map((f) => (
              <motion.div
                key={f.label}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="glass-card-hover p-5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-neon-emerald/20 flex items-center justify-center group-hover:border-neon-emerald/60 transition-colors">
                  <f.icon className="w-5 h-5 text-neon-emerald" />
                </div>
                <h3 className="mt-3 font-heading font-semibold text-sm sm:text-base text-foreground">
                  {f.label}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-body">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ARCHITECTURE */}
        <Section eyebrow="Architecture" title="How a request flows through AdilGPT">
          <div className="glass-card p-6 sm:p-10 neon-border rounded-2xl">
            <div className="flex flex-wrap justify-center gap-3">
              {architecture.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="px-4 py-2 rounded-xl text-xs sm:text-sm font-body border border-neon-emerald/30 text-foreground bg-background/40 backdrop-blur">
                    {step}
                  </span>
                  {i < architecture.length - 1 && (
                    <span className="text-neon-emerald/60">→</span>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="grid sm:grid-cols-3 gap-3 mt-8">
              {[
                { t: "LLMs", v: "Gemini · Groq · Mistral" },
                { t: "Tools", v: "Calculator · Memory · Search · RAG" },
                { t: "Store", v: "SQLite + ChromaDB" },
              ].map((x) => (
                <div key={x.t} className="glass-card p-4 text-center">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-neon-emerald font-body">{x.t}</p>
                  <p className="mt-1 text-sm text-foreground font-body">{x.v}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* TECH STACK */}
        <Section eyebrow="Tech Stack" title="Built with a modern, proven toolchain">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {tech.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                whileHover={{ y: -3 }}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-body border border-border bg-background/40 text-foreground hover:border-neon-emerald/60 hover:text-neon-emerald transition-colors"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </Section>

        {/* FILE STRUCTURE */}
        <Section eyebrow="Codebase" title="Clean, modular file structure">
          <div className="glass-card p-4 sm:p-6 rounded-2xl">
            <p className="text-xs sm:text-sm text-neon-emerald font-mono mb-3">adilgpt-complete/</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {files.map((f) => (
                <div
                  key={f.name}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors border border-transparent hover:border-neon-emerald/20"
                >
                  <FileText className="w-4 h-4 text-neon-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm font-mono text-foreground">{f.name}</p>
                    <p className="text-xs text-muted-foreground font-body">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* BACKEND WORKFLOW */}
        <Section eyebrow="Workflow" title="Backend request lifecycle">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-neon-emerald/60 via-neon-gold/40 to-transparent" />
            <div className="space-y-4">
              {workflow.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-4 pl-2"
                >
                  <span className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background border-2 border-neon-emerald/60 flex items-center justify-center text-xs font-mono text-neon-emerald">
                    {i + 1}
                  </span>
                  <span className="glass-card !py-3 !px-4 rounded-xl text-sm text-foreground font-body flex-1">
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* MODELS */}
        <Section eyebrow="AI Models" title="Seven supported models across three providers">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="glass-card-hover p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neon-gold font-body">{m.provider}</span>
                  <Sparkles size={14} className="text-neon-emerald" />
                </div>
                <h3 className="mt-2 font-heading font-semibold text-foreground">{m.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 font-body">{m.tag}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* RAG PIPELINE */}
        <Section eyebrow="RAG Pipeline" title="From a raw document to a grounded answer">
          <div className="glass-card p-6 sm:p-10 neon-border rounded-2xl">
            <div className="flex flex-wrap justify-center items-center gap-3">
              {ragFlow.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="px-4 py-2 rounded-full text-xs sm:text-sm font-body border border-neon-gold/40 text-foreground bg-background/40">
                    {s}
                  </span>
                  {i < ragFlow.length - 1 && <span className="text-neon-gold/60">→</span>}
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* SECURITY */}
        <Section eyebrow="Security" title="Hardened from day one">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {security.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card-hover p-5 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-neon-emerald/30 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-neon-emerald" />
                </div>
                <span className="font-heading font-medium text-foreground">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* DATABASE */}
        <Section eyebrow="Database" title="Simple schema, ready to scale">
          <div className="grid sm:grid-cols-2 gap-4">
            {dbTables.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card-hover p-5"
              >
                <div className="flex items-center gap-2">
                  <Database size={16} className="text-neon-emerald" />
                  <h3 className="font-heading font-semibold text-foreground">{t.name}</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-body">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* API ENDPOINTS */}
        <Section eyebrow="API" title="REST endpoints">
          <div className="glass-card p-2 sm:p-3 rounded-2xl overflow-hidden">
            <div className="divide-y divide-border/60">
              {endpoints.map((e) => (
                <div
                  key={e.p}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-muted/30 transition-colors"
                >
                  <span
                    className={`text-[10px] sm:text-xs font-mono px-2 py-1 rounded border ${methodBadge(e.m)}`}
                  >
                    {e.m}
                  </span>
                  <code className="text-xs sm:text-sm font-mono text-foreground truncate">{e.p}</code>
                  <span className="ml-auto text-[10px] sm:text-xs text-muted-foreground font-body hidden sm:inline">
                    {e.d}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* METRICS */}
        <Section eyebrow="Metrics" title="Built for real workloads">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {metrics.map((m, i) => (
              <motion.div
                key={m.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card p-5 text-center"
              >
                <p className="font-heading text-2xl sm:text-3xl font-bold neon-text">{m.v}</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground font-body mt-2">
                  {m.l}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* CHALLENGES */}
        <Section eyebrow="Challenges" title="Engineering problems solved">
          <div className="grid sm:grid-cols-2 gap-3">
            {challenges.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card p-4 flex items-center gap-3"
              >
                <Check size={16} className="text-neon-emerald shrink-0" />
                <span className="text-sm text-foreground font-body">{c}</span>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* WHAT I LEARNED */}
        <Section eyebrow="What I Learned" title="Skills sharpened building AdilGPT">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {learned.map((s) => (
              <span
                key={s}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-body border border-neon-gold/30 text-neon-gold bg-background/40"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>

        {/* ROADMAP */}
        <Section eyebrow="Roadmap" title="What's coming next">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {roadmap.map((r, i) => (
              <motion.div
                key={r}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="glass-card p-4 flex items-center gap-3"
              >
                <Rocket size={14} className="text-neon-teal" />
                <span className="text-sm text-foreground font-body">{r}</span>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* OPEN SOURCE / REPO CARD */}
        <Section eyebrow="Open Source" title="Explore, star, or fork the repository">
          <div className="glass-card neon-border p-6 sm:p-8 rounded-2xl max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-neon-emerald/30 flex items-center justify-center shrink-0">
                <Github className="w-6 h-6 text-neon-emerald" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-mono text-sm text-foreground truncate">adiltariq234/AdilGPT</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-neon-emerald/40 text-neon-emerald">
                    Public
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-body">
                  Production-ready AI assistant built with FastAPI, LangGraph, LangChain, Gemini,
                  Groq, Mistral AI, RAG, JWT auth, long-term memory and streaming responses.
                </p>
                <div className="flex flex-wrap gap-3 mt-4 text-xs text-muted-foreground font-body">
                  <span className="flex items-center gap-1"><Code2 size={12} className="text-neon-gold" /> Python</span>
                  <span className="flex items-center gap-1"><BookOpen size={12} className="text-neon-teal" /> MIT License</span>
                  <span className="flex items-center gap-1"><GitBranch size={12} className="text-neon-emerald" /> Actively maintained</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={REPO} target="_blank" rel="noopener noreferrer" className="btn-neon inline-flex items-center gap-2 text-sm">
                <Github size={16} /> View Source Code
              </a>
              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl border border-border text-foreground hover:border-neon-gold/50 hover:text-neon-gold transition-colors"
              >
                <Star size={16} /> Star on GitHub
              </a>
              <button
                onClick={copyRepo}
                className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl border border-border text-foreground hover:border-neon-emerald/50 hover:text-neon-emerald transition-colors"
              >
                <Copy size={16} /> Copy Link
              </button>
              <button
                onClick={share}
                className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl border border-border text-foreground hover:border-neon-teal/50 hover:text-neon-teal transition-colors"
              >
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <section className="section-padding relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card neon-border p-8 sm:p-12 rounded-3xl text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-emerald/10 via-transparent to-neon-gold/10 pointer-events-none" />
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold neon-text">
                  Interested in AI Development?
                </h2>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground font-body">
                  Let's build intelligent AI solutions together.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link to="/#contact" className="btn-neon inline-flex items-center gap-2 text-sm">
                    <Mail size={16} /> Hire Me
                  </Link>
                  <Link
                    to="/#contact"
                    className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl border border-border text-foreground hover:border-neon-gold/50 hover:text-neon-gold transition-colors"
                  >
                    Contact Me
                  </Link>
                  <Link
                    to="/#projects"
                    className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl border border-border text-foreground hover:border-neon-teal/50 hover:text-neon-teal transition-colors"
                  >
                    View More Projects
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default AdilGPT;
