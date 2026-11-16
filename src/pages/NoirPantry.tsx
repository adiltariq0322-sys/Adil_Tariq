import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  ShoppingBag,
  Bot,
  Database,
  Eye,
  MessageSquare,
  Layers,
  Shield,
  Search,
  Image as ImageIcon,
  Star,
  Leaf,
  Wrench,
  KeyRound,
  Terminal,
  Rocket,
  Server,
  Brain,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import heroImg from "@/assets/project-noir-pantry.jpg";

const REPO = "https://github.com/adiltariq234/-Noir-Pantry-AI-shopping-agent";
const LIVE = "https://noir-pantry.streamlit.app/";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };

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
        className="mb-10 sm:mb-12"
      >
        {eyebrow && (
          <motion.p
            variants={fadeUp}
            className="text-[11px] sm:text-xs tracking-[0.28em] uppercase text-neon-teal mb-3 font-body"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h2
          variants={fadeUp}
          className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground"
        >
          {title}
        </motion.h2>
        {description && (
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-3xl text-sm sm:text-base text-muted-foreground font-body leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
      {children}
    </div>
  </section>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={fadeUp}
    className={`rounded-2xl border border-glass-border bg-card/40 p-5 sm:p-6 hover-lift ${className}`}
  >
    {children}
  </motion.div>
);

const Grid = ({ children, cols = "sm:grid-cols-2 lg:grid-cols-3" }: { children: React.ReactNode; cols?: string }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-60px" }}
    variants={stagger}
    className={`grid gap-4 ${cols}`}
  >
    {children}
  </motion.div>
);

const Flow = ({ steps }: { steps: string[] }) => (
  <motion.ol
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-60px" }}
    variants={stagger}
    className="flex flex-col gap-2"
  >
    {steps.map((s, i) => (
      <motion.li key={s} variants={fadeUp} className="flex items-center gap-3">
        <span className="shrink-0 w-7 h-7 rounded-lg border border-neon-teal/40 text-neon-teal text-xs font-mono flex items-center justify-center">
          {i + 1}
        </span>
        <span className="flex-1 rounded-xl border border-glass-border bg-card/40 px-4 py-2.5 text-sm font-body text-foreground/90">
          {s}
        </span>
      </motion.li>
    ))}
  </motion.ol>
);

const metaTags = [
  "AI Shopping Agent",
  "LangChain Agent",
  "Mistral AI",
  "Vision (Multimodal)",
  "Conversational AI",
  "Streamlit",
  "SQLite",
  "Python",
];

const features = [
  { icon: MessageSquare, label: "Conversational Shopping", desc: "Customers describe what they want in plain language instead of using filters and keyword search." },
  { icon: Wrench, label: "Tool-Calling Agent", desc: "The agent exposes four tools: product search, rating lookup, image analysis and checkout." },
  { icon: Search, label: "Filtered Product Search", desc: "Keyword search across name, description and category with max price, organic and minimum-rating filters." },
  { icon: Star, label: "Ratings From Reviews", desc: "Average rating and review count are aggregated from the reviews table; products with no reviews return no rating rather than 0.0." },
  { icon: ImageIcon, label: "Photo Search", desc: "Upload a product photo — the vision model describes it and turns it into a search query." },
  { icon: Eye, label: "Off-Topic Image Guard", desc: "The vision step returns is_store_product; images outside the catalogue's categories are politely rejected." },
  { icon: Brain, label: "Conversation Context", desc: "The recent chat history is replayed to the agent, so follow-ups like \"cheaper ones\" still make sense." },
  { icon: ShoppingBag, label: "Confirmed Checkout", desc: "Orders are only written after an explicit user confirmation — the agent never orders on its own." },
  { icon: Database, label: "SQLite Catalogue", desc: "Products, reviews and orders live in a local store.db, queried with parameterised SQL." },
  { icon: Leaf, label: "Organic Filtering", desc: "Organic status is a first-class column and filter, enforced in Python rather than by the model." },
  { icon: Shield, label: "Hardened Uploads", desc: "Extension allow-list, 5 MB size cap, hashed filenames and a path-traversal guard on the uploads directory." },
  { icon: Server, label: "Streamlit App", desc: "The whole system ships as one interactive web app — sidebar search, photo upload, chat and an admin orders view." },
];

const aiArchitecture = [
  "User",
  "Streamlit UI (chat input, sidebar search, photo upload)",
  "LangChain agent (create_agent) with system prompt + tools",
  "ChatMistralAI — mistral-small-latest (text + vision)",
  "Tools: search_products · get_rating · describe_product_image · checkout",
  "Session conversation history (last turns replayed)",
  "SQLite store.db — products / reviews / orders",
  "Natural-language response rendered in Streamlit",
];

const systemLayers = [
  { layer: "Presentation Layer", detail: "Streamlit — chat UI, sidebar filters, image uploader, admin orders panel." },
  { layer: "Agent / Application Layer", detail: "Python + LangChain create_agent, system prompt with browsing / image / ordering rules." },
  { layer: "AI Layer", detail: "Mistral AI mistral-small-latest via langchain-mistralai — handles both text reasoning and image understanding." },
  { layer: "Context Layer", detail: "Streamlit session_state message list, converted to LangChain Human/AI messages per request." },
  { layer: "Tool Layer", detail: "search_products, get_rating, describe_product_image, and a checkout tool bound to the session user id." },
  { layer: "Data Layer", detail: "SQLite store.db — products, reviews, orders tables plus an uploads/ directory for images." },
];

const textFlow = [
  "User query (\"organic honey under $20 with 4.5+ rating\")",
  "Agent receives history + system prompt",
  "Model selects search_products and extracts query, max_price, is_organic, min_rating",
  "Python executes the SQL query and enforces the filters",
  "Structured JSON results are returned to the model",
  "Model formats a numbered plain-text product list with product IDs",
];

const visionFlow = [
  "User uploads JPG / PNG / WEBP (max 5 MB)",
  "File is hashed, validated and stored in uploads/",
  "describe_product_image base64-encodes the image into a HumanMessage",
  "mistral-small-latest returns JSON: is_store_product, product_type, search_query, is_organic, description",
  "Response is parsed and validated for required fields",
  "If it is a store product, search_query feeds search_products; otherwise the user is told what the image shows",
];

const memoryPoints = [
  {
    title: "Why memory matters",
    body: "\"Show me cheaper ones\" is meaningless without the previous turn. The agent needs to know which products \"ones\" refers to — and which product ID a \"yes\" is confirming.",
  },
  {
    title: "How it actually works",
    body: "Chat turns are stored in Streamlit's session_state. On every request the recent history is converted into LangChain HumanMessage / AIMessage objects and passed to the agent as its message list.",
  },
  {
    title: "Session, not long-term",
    body: "This is session-scoped conversational context, not persistent memory. Starting a new conversation or a new browser session clears it — there is no cross-session user profile.",
  },
  {
    title: "Memory vs. persistence",
    body: "The only data written to disk is orders (and uploaded images). Products and reviews are read-only reference data; conversation state never touches the database.",
  },
];

const dbTables = [
  { name: "products", cols: "id · name · category · price · description · is_organic", desc: "The catalogue the agent is allowed to sell from. Categories include honey, oil, nuts, seeds, grains, tea, coffee, snacks and dairy-alternatives." },
  { name: "reviews", cols: "id · product_id · rating · reviewer_name · review_text", desc: "Aggregated with AVG(rating) and COUNT(*) to produce an average rating and review count per product." },
  { name: "orders", cols: "id · product_id · product_name · price · ordered_at · user_id", desc: "Written by the checkout tool only after explicit confirmation. A startup migration adds user_id when it is missing." },
];

const agentWorkflow = [
  "User input — a natural-language request, a sidebar quick search, or an uploaded photo.",
  "Context assembly — recent session messages are converted into LangChain messages.",
  "Agent reasoning — the system prompt defines separate image-search, browsing and ordering flows.",
  "Tool call — the model picks search_products, get_rating, describe_product_image or checkout.",
  "Data access — Python runs parameterised SQLite queries and enforces price / organic / rating filters in code.",
  "Response generation — Mistral formats a numbered product list with IDs, or a confirmation message.",
  "UI render — Streamlit appends the answer to the chat and reruns the app.",
];

const decisions = [
  { q: "Why LangChain?", a: "create_agent gives a structured tool-calling loop, so the model can decide which capability to invoke while the tool bodies stay plain, testable Python." },
  { q: "Why Mistral AI?", a: "langchain-mistralai integrates cleanly and mistral-small-latest handles both natural-language reasoning and image input, so one API key covers text and vision." },
  { q: "Why one model for text and vision?", a: "Keeping a single ChatMistralAI instance removes a second provider dependency; the vision task is prompt-scoped to return strict JSON rather than free text." },
  { q: "Why SQLite?", a: "The catalogue is small, relational and read-heavy. A single file database ships with the repo, needs no server, and deploys to Streamlit Cloud unchanged." },
  { q: "Why Streamlit?", a: "It turns the Python agent into a usable web app — chat, uploads, sidebar filters and state — with no separate frontend to build or host." },
  { q: "Why enforce filters in Python?", a: "Price, organic and rating constraints are applied in SQL and code, not left to the model, so results are correct by construction and cannot be hallucinated." },
];

const challenges = [
  "Preventing the model from inventing products — the prompt forbids fabrication and every result comes from a tool call.",
  "Keeping follow-up turns coherent while only replaying a bounded slice of the conversation.",
  "Forcing strict JSON out of a vision call, then validating the required fields before trusting the response.",
  "Making sure the checkout tool can never be given a spoofed user id — it is bound through a closure instead of a model argument.",
  "Handling a schema that evolves: the orders table is migrated at startup if the user_id column is missing.",
  "Validating file uploads (type, size, path) before anything is written to disk or sent to the model.",
  "Degrading gracefully when the API key is missing or the database cannot be read, instead of showing a blank page.",
];

const security = [
  { icon: KeyRound, label: "MISTRAL_API_KEY", desc: "Loaded from the environment via python-dotenv; the app refuses to start without it and the value is never rendered." },
  { icon: Shield, label: "ADMIN_PASSWORD", desc: "The admin orders view compares input with hmac.compare_digest against an environment value." },
  { icon: Terminal, label: "Parameterised SQL", desc: "Every query uses bound parameters — no string-built SQL from user or model input." },
  { icon: Layers, label: "Upload validation", desc: "Allow-listed extensions, 5 MB cap, hashed filenames, and a resolved-path check against the uploads directory." },
  { icon: Bot, label: "No model-supplied identity", desc: "The session user id is injected by the application, never provided by the LLM." },
];

const currentState = [
  "Live Streamlit application deployed and publicly reachable",
  "Conversational product discovery over a real SQLite catalogue",
  "Price, organic and minimum-rating filters enforced in code",
  "Ratings and review counts aggregated from the reviews table",
  "Image upload with vision-based product identification and an off-topic guard",
  "Session-scoped conversation context for natural follow-ups",
  "Confirmation-gated checkout writing to the orders table",
  "Password-protected admin view of recent orders",
];

const roadmap = [
  "Vector database for semantic product search instead of LIKE matching",
  "Long-term, per-user memory and saved preferences",
  "Recommendation and ranking engine over purchase history",
  "Real authentication replacing pseudonymous session ids",
  "Managed cloud database in place of a local SQLite file",
  "Cart and multi-item order management",
  "Inventory and fulfilment integration",
  "Evaluation harness and response monitoring",
];

const stack = [
  { group: "AI / LLM", items: ["Mistral AI", "mistral-small-latest", "Multimodal (text + vision)"] },
  { group: "AI Framework", items: ["LangChain", "langchain-mistralai", "langchain-core"] },
  { group: "Application", items: ["Python", "Streamlit", "python-dotenv"] },
  { group: "Data", items: ["SQLite (store.db)", "products / reviews / orders"] },
  { group: "Development", items: ["Git", "GitHub", "Streamlit Community Cloud"] },
];

const NoirPantry = () => {
  useEffect(() => {
    document.title = "Noir Pantry AI Shopping Agent — Case Study | Hafiz Adil";
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute(
      "content",
      "Engineering case study: Noir Pantry, an AI shopping agent built with LangChain, Mistral AI (text + vision), SQLite and Streamlit by Hafiz Adil.",
    );
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <header className="relative overflow-hidden pt-28 sm:pt-32 pb-14 sm:pb-20 px-4 sm:px-6 md:px-8">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Noir Pantry AI shopping agent case study cover"
            width={1280}
            height={720}
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/90 to-background" />
        </div>

        <div className="max-w-6xl mx-auto">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to projects
          </Link>

          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p
              variants={fadeUp}
              className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-neon-teal font-body mb-4"
            >
              Case Study · AI Engineering
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold leading-[1.05] text-foreground max-w-4xl"
            >
              Noir Pantry <span className="neon-text">AI Shopping Agent</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-2xl text-sm sm:text-lg text-muted-foreground font-body leading-relaxed"
            >
              An AI-powered shopping assistant designed to understand products, answer customer
              questions, maintain conversational context, and provide an intelligent shopping
              experience.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-7">
              {metaTags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] sm:text-xs font-body px-3 py-1.5 rounded-full border border-glass-border bg-card/50 text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mt-9">
              <a href={LIVE} target="_blank" rel="noopener noreferrer" className="btn-neon text-sm text-center">
                <span className="inline-flex items-center gap-2">
                  <ExternalLink size={16} /> Live Demo
                </span>
              </a>
              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-neon text-sm text-center"
              >
                <span className="inline-flex items-center gap-2">
                  <Github size={16} /> View GitHub
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </header>

      <main>
        {/* OVERVIEW */}
        <Section
          eyebrow="01 — Overview"
          title="Project Overview"
          description="Noir Pantry is an AI shopping assistant for a curated pantry catalogue. It combines natural-language interaction, an LLM-driven tool-calling agent, structured product data in SQLite, session-level conversational context, and image-based product lookup — all served through a single Streamlit web application."
        >
          <Grid cols="sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Model</p>
              <p className="font-heading font-semibold text-foreground">mistral-small-latest</p>
              <p className="text-xs text-muted-foreground mt-1">Text + vision, temperature 0</p>
            </Card>
            <Card>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Agent tools</p>
              <p className="font-heading font-semibold text-foreground">4</p>
              <p className="text-xs text-muted-foreground mt-1">search · rating · vision · checkout</p>
            </Card>
            <Card>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Data layer</p>
              <p className="font-heading font-semibold text-foreground">SQLite</p>
              <p className="text-xs text-muted-foreground mt-1">products · reviews · orders</p>
            </Card>
            <Card>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Interface</p>
              <p className="font-heading font-semibold text-foreground">Streamlit</p>
              <p className="text-xs text-muted-foreground mt-1">Chat, filters, photo upload</p>
            </Card>
          </Grid>
        </Section>

        {/* PROBLEM + SOLUTION */}
        <Section eyebrow="02 — Context" title="The Problem & The Solution">
          <Grid cols="lg:grid-cols-2">
            <Card>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">The problem</h3>
              <ul className="space-y-2 text-sm text-muted-foreground font-body leading-relaxed">
                <li>• Traditional storefronts push the work onto the customer: search, then filter, then compare.</li>
                <li>• Keyword search does not understand intent like "something organic under twenty dollars that people actually rate well".</li>
                <li>• Product questions usually live away from the buying interface.</li>
                <li>• Nothing carries over between steps, so follow-up questions have to be re-typed in full.</li>
              </ul>
              <p className="mt-4 text-sm text-foreground/80 font-body">
                The engineering question: how can an assistant interpret natural-language shopping
                intent, ground its answers in real product data, keep conversational context, and
                still be safe enough to place an order?
              </p>
            </Card>
            <Card>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">The solution</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
                Noir Pantry puts a conversational agent on top of structured shopping data. The model
                never guesses inventory — it calls tools, and those tools query the database. Filters
                are applied in Python, so what the customer sees always satisfies what they asked for.
              </p>
              <Flow
                steps={[
                  "User",
                  "Streamlit interface",
                  "LangChain agent + Mistral",
                  "Tools (search · rating · vision · checkout)",
                  "SQLite product data",
                  "Grounded response",
                ]}
              />
            </Card>
          </Grid>
        </Section>

        {/* FEATURES */}
        <Section
          eyebrow="03 — Capabilities"
          title="Core Features"
          description="Every item below maps to code in the repository — no aspirational features."
        >
          <Grid>
            {features.map((f) => (
              <Card key={f.label}>
                <f.icon className="text-neon-teal mb-3" size={20} />
                <h3 className="font-heading font-semibold text-foreground mb-1.5">{f.label}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* AI ARCHITECTURE */}
        <Section
          eyebrow="04 — AI architecture"
          title="How the AI System Is Wired"
          description="A single Mistral model sits behind a LangChain tool-calling agent. All product knowledge enters through tools, and all tools read from SQLite."
        >
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="font-heading font-semibold text-foreground mb-4">Request flow</h3>
              <Flow steps={aiArchitecture} />
            </Card>
            <Card>
              <h3 className="font-heading font-semibold text-foreground mb-4">System layers</h3>
              <div className="space-y-3">
                {systemLayers.map((l) => (
                  <div key={l.layer} className="rounded-xl border border-glass-border bg-background/40 p-4">
                    <p className="text-sm font-heading font-semibold text-neon-teal">{l.layer}</p>
                    <p className="text-sm text-muted-foreground font-body mt-1 leading-relaxed">{l.detail}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Section>

        {/* LANGCHAIN + MISTRAL */}
        <Section eyebrow="05 — Framework & provider" title="LangChain and Mistral AI">
          <Grid cols="lg:grid-cols-2">
            <Card>
              <Layers className="text-neon-teal mb-3" size={20} />
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">LangChain</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-3">
                LangChain is the orchestration layer that turns a language model into an application.
                The agent is built with <code className="text-neon-teal font-mono text-xs">create_agent</code>,
                given a model, a system prompt and a list of tools decorated with{" "}
                <code className="text-neon-teal font-mono text-xs">@tool</code>.
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground font-body">
                <li>• Model integration through <span className="font-mono text-xs">langchain-mistralai</span></li>
                <li>• Prompt management — one system prompt encodes the browsing, image and ordering rules</li>
                <li>• Tool registration and automatic argument extraction from natural language</li>
                <li>• Message primitives (HumanMessage / AIMessage) used to replay conversation context</li>
                <li>• A per-session agent whose checkout tool is bound to the current user</li>
              </ul>
            </Card>
            <Card>
              <Bot className="text-neon-teal mb-3" size={20} />
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">Mistral AI</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-3">
                The project talks to Mistral over its API through{" "}
                <code className="text-neon-teal font-mono text-xs">ChatMistralAI</code>, configured with{" "}
                <code className="text-neon-teal font-mono text-xs">mistral-small-latest</code> and{" "}
                <code className="text-neon-teal font-mono text-xs">temperature=0</code> for predictable,
                repeatable shopping answers.
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground font-body">
                <li>• Authentication via the <span className="font-mono text-xs">MISTRAL_API_KEY</span> environment variable</li>
                <li>• Startup fails fast with a clear message when the key is absent</li>
                <li>• Prompt → model → tool call → tool result → model → response</li>
                <li>• The same client handles image messages, so vision needs no second provider</li>
                <li>• Application logic stays provider-agnostic behind the LangChain interface</li>
              </ul>
            </Card>
          </Grid>
        </Section>

        {/* TEXT + VISION */}
        <Section
          eyebrow="06 — Modalities"
          title="Text Model and Vision Model"
          description="Both paths use the same Mistral model, but they are separate responsibilities with different prompts and different output contracts."
        >
          <Grid cols="lg:grid-cols-2">
            <Card>
              <MessageSquare className="text-neon-teal mb-3" size={20} />
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">Text path</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
                Interprets shopping intent, extracts structured filter arguments, decides which tool to
                call, and turns JSON tool output into a readable numbered list with product IDs the
                customer can order by.
              </p>
              <Flow steps={textFlow} />
            </Card>
            <Card>
              <Eye className="text-neon-teal mb-3" size={20} />
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">Vision path</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
                Turns an uploaded photo into a strict JSON description of what the image shows and
                whether it belongs to the catalogue. It is a describe-and-route step — not object
                detection, OCR or classification against a product index.
              </p>
              <Flow steps={visionFlow} />
            </Card>
          </Grid>
        </Section>

        {/* MEMORY */}
        <Section
          eyebrow="07 — Context"
          title="Memory System"
          description="Shopping is a multi-turn activity. Without context, &quot;show me cheaper ones&quot; and &quot;yes, order it&quot; are both unanswerable."
        >
          <Grid cols="sm:grid-cols-2">
            {memoryPoints.map((m) => (
              <Card key={m.title}>
                <h3 className="font-heading font-semibold text-foreground mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{m.body}</p>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* DATABASE */}
        <Section
          eyebrow="08 — Data"
          title="SQLite Database"
          description="A single store.db file holds the catalogue. It is lightweight, relational, deploys with the repository, and needs no database server — the right fit for a small, read-heavy product set."
        >
          <div className="grid lg:grid-cols-3 gap-4">
            {dbTables.map((t) => (
              <motion.div
                key={t.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl border border-glass-border bg-card/40 p-5 hover-lift"
              >
                <p className="font-mono text-sm text-neon-teal mb-2">{t.name}</p>
                <p className="font-mono text-[11px] text-muted-foreground/80 mb-3 break-words">{t.cols}</p>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 max-w-xl">
            <Flow
              steps={[
                "Agent tool call",
                "Python application logic",
                "Parameterised SQLite query",
                "Product / review rows",
                "JSON back to the model",
                "Natural-language answer",
              ]}
            />
          </div>
        </Section>

        {/* STREAMLIT */}
        <Section
          eyebrow="09 — Interface"
          title="The Streamlit Application Layer"
          description="Streamlit exposes the Python agent as an interactive web app without a separate frontend stack."
        >
          <Grid>
            <Card>
              <h3 className="font-heading font-semibold text-foreground mb-2">Chat interface</h3>
              <p className="text-sm text-muted-foreground font-body">A chat input plus custom-styled user and assistant bubbles, with HTML-escaped message rendering.</p>
            </Card>
            <Card>
              <h3 className="font-heading font-semibold text-foreground mb-2">Sidebar quick search</h3>
              <p className="text-sm text-muted-foreground font-body">Product keyword, max price, minimum rating and an organic toggle are composed into a natural-language prompt for the agent.</p>
            </Card>
            <Card>
              <h3 className="font-heading font-semibold text-foreground mb-2">Photo upload</h3>
              <p className="text-sm text-muted-foreground font-body">JPG / PNG / WEBP up to 5 MB, saved under a hashed filename and handed to the vision tool.</p>
            </Card>
            <Card>
              <h3 className="font-heading font-semibold text-foreground mb-2">Session state</h3>
              <p className="text-sm text-muted-foreground font-body">Messages, the pseudonymous session user id and pending prompts all live in st.session_state; the agent itself is cached per user.</p>
            </Card>
            <Card>
              <h3 className="font-heading font-semibold text-foreground mb-2">Admin orders view</h3>
              <p className="text-sm text-muted-foreground font-body">A password-gated expander lists recent orders from the database in a table.</p>
            </Card>
            <Card>
              <h3 className="font-heading font-semibold text-foreground mb-2">Graceful errors</h3>
              <p className="text-sm text-muted-foreground font-body">Missing API key, database failures and unexpected exceptions each return a readable message instead of a stack trace.</p>
            </Card>
          </Grid>
        </Section>

        {/* WORKFLOW */}
        <Section eyebrow="10 — Runtime" title="Agent Workflow, Step by Step">
          <div className="max-w-3xl">
            <Flow steps={agentWorkflow} />
          </div>
        </Section>

        {/* STACK */}
        <Section eyebrow="11 — Stack" title="Technology Stack">
          <Grid cols="sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((s) => (
              <Card key={s.group}>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{s.group}</p>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <span
                      key={i}
                      className="text-xs font-body px-2.5 py-1 rounded-lg border border-glass-border bg-background/50 text-foreground/85"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* DECISIONS */}
        <Section eyebrow="12 — Rationale" title="Key Engineering Decisions">
          <Grid cols="sm:grid-cols-2">
            {decisions.map((d) => (
              <Card key={d.q}>
                <h3 className="font-heading font-semibold text-foreground mb-2">{d.q}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{d.a}</p>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* CHALLENGES */}
        <Section eyebrow="13 — Hard parts" title="Engineering Challenges">
          <Grid cols="sm:grid-cols-2">
            {challenges.map((c) => (
              <Card key={c}>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{c}</p>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* SECURITY */}
        <Section
          eyebrow="14 — Security"
          title="Secrets and Safety"
          description="Credentials are configuration, never code. No key, token or password value appears in the repository or in this case study."
        >
          <Grid>
            {security.map((s) => (
              <Card key={s.label}>
                <s.icon className="text-neon-gold mb-3" size={20} />
                <p className="font-mono text-sm text-foreground mb-1.5">{s.label}</p>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* UX */}
        <Section
          eyebrow="15 — Experience"
          title="What This Means for the Customer"
          description="The architecture exists to make one thing true: the customer can just say what they want."
        >
          <Grid>
            <Card>
              <h3 className="font-heading font-semibold text-foreground mb-2">Say it, don't filter it</h3>
              <p className="text-sm text-muted-foreground font-body">Budget, organic preference and quality bar go into one sentence instead of three controls.</p>
            </Card>
            <Card>
              <h3 className="font-heading font-semibold text-foreground mb-2">Follow-ups just work</h3>
              <p className="text-sm text-muted-foreground font-body">Refining a search or confirming an order uses the conversation, not a fresh query.</p>
            </Card>
            <Card>
              <h3 className="font-heading font-semibold text-foreground mb-2">Search by photo</h3>
              <p className="text-sm text-muted-foreground font-body">Not sure what something is called? Upload a picture and the assistant looks for the closest thing it stocks.</p>
            </Card>
            <Card>
              <h3 className="font-heading font-semibold text-foreground mb-2">Nothing happens by surprise</h3>
              <p className="text-sm text-muted-foreground font-body">Orders require an explicit confirmation, and every product shown is real stock from the catalogue.</p>
            </Card>
          </Grid>
        </Section>

        {/* CURRENT STATE */}
        <Section
          eyebrow="16 — Today"
          title="Current Implementation"
          description="What the deployed application demonstrates right now."
        >
          <Grid cols="sm:grid-cols-2">
            {currentState.map((c) => (
              <motion.div
                key={c}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex items-start gap-3 rounded-xl border border-glass-border bg-card/40 p-4"
              >
                <CheckCircle2 size={18} className="text-neon-emerald shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground font-body">{c}</span>
              </motion.div>
            ))}
          </Grid>
        </Section>

        {/* ROADMAP */}
        <Section
          eyebrow="17 — Next"
          title="Future Improvements"
          description="Planned directions — none of these are implemented today."
        >
          <Grid cols="sm:grid-cols-2 lg:grid-cols-4">
            {roadmap.map((r) => (
              <Card key={r}>
                <Rocket size={16} className="text-neon-gold mb-2" />
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{r}</p>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* CTA */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto text-center rounded-3xl border border-glass-border bg-card/40 p-8 sm:p-12">
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-foreground">
              Explore Noir Pantry
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground font-body max-w-xl mx-auto">
              Try the live shopping agent, or read the full implementation on GitHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <a href={LIVE} target="_blank" rel="noopener noreferrer" className="btn-neon text-sm">
                <span className="inline-flex items-center gap-2">
                  <ExternalLink size={16} /> Try Noir Pantry
                </span>
              </a>
              <a href={REPO} target="_blank" rel="noopener noreferrer" className="btn-outline-neon text-sm">
                <span className="inline-flex items-center gap-2">
                  <Github size={16} /> View Source Code
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NoirPantry;
