import {
  Banknote,
  Workflow,
  HeartPulse,
  Microscope,
  Wine,
  Bot,
  GraduationCap,
  Stethoscope,
  Sparkles,
  ShoppingBag,
  Building2,
  Globe,
  type LucideIcon,
} from "lucide-react";

import supportAgentImg from "@/assets/project-support-agent.jpg";
import supportAgentVideo from "@/assets/customer-support-agent-demo.webm";
import collegeAssistantImg from "@/assets/project-college-assistant.jpg";
import skinSpecialistImg from "@/assets/skin-specialist-hero.jpg";
import adilgptImg from "@/assets/adilgpt-hero.jpg";
import noirPantryImg from "@/assets/project-noir-pantry.jpg";
import realEstateImg from "@/assets/project-real-estate.jpg";
import realEstateVideo from "@/assets/real-estate-agent-demo.webm";

import bankImg from "@/assets/project-bank.jpg";
import workflowImg from "@/assets/project-workflow.jpg";
import heartImg from "@/assets/project-heart.jpg";
import cancerImg from "@/assets/project-cancer.jpg";
import wineImg from "@/assets/project-wine.jpg";
import azeemInstituteImg from "@/assets/azeem-institute-website.webp";
import niceBroastImg from "@/assets/nice-broast-website.webp";
import aurelleRestaurantImg from "@/assets/aurelle-restaurant-website.webp";
import marbrookEstatesImg from "@/assets/marbrook-estates-website.webp";

/**
 * Project categories — single source of truth used by both the data
 * and the filter UI. Add new categories here and they automatically
 * appear in the filter bar.
 */
export const PROJECT_CATEGORIES = [
  "All Projects",
  "Web Development",
  "Machine Learning",
  "Deep Learning",
  "Generative AI",
  "Multimodal AI",
  "Computer Vision",
  "NLP",
  "Data Science",
  "Python Projects",
] as const;

export type ProjectCategory = Exclude<(typeof PROJECT_CATEGORIES)[number], "All Projects">;

export type ProjectAccent = "emerald" | "gold" | "teal";

export type Project = {
  /** Stable slug — used as React key & for deep-linking later */
  id: string;
  title: string;
  /** Primary category (drives filter). A project can also list secondary categories. */
  category: ProjectCategory;
  secondaryCategories?: ProjectCategory[];
  tagline: string;
  /** 1–2 line summary for the card */
  shortDescription: string;
  /** Long-form description shown in the details modal */
  overview: string;
  problemStatement?: string;
  dataset?: string;
  modelArchitecture?: string;
  features: string[];
  tech: string[];
  /** Headline metric / outcome shown on the card */
  result?: string;
  /** Detailed metrics shown in the modal (key/value pairs) */
  metrics?: { label: string; value: string }[];
  /** Optional keyword tags to power search beyond title/tech */
  keywords?: string[];
  icon: LucideIcon;
  image?: string;
  imageAlt?: string;
  /** Additional screenshots shown in the details modal */
  screenshots?: { src: string; alt: string }[];
  badge: string;
  accent: ProjectAccent;
  gradient: string;
  github?: string;
  liveDemo?: string;
  /** Optional inline demo video URL (webm/mp4) shown in the details modal */
  demoVideo?: string;
  /** Show in the Featured strip at the top */
  featured?: boolean;
  /** Used for default ordering (higher first) */
  priority?: number;
};

/**
 * ====== PROJECT REGISTRY ======
 * Add new projects by appending to this array. The grid, filter bar,
 * search, and details modal will pick them up automatically.
 */
export const projects: Project[] = [
  {
    id: "ai-drone-video-real-estate",
    title: "AI Drone Video — Real Estate Walkthrough",
    category: "Generative AI",
    tagline: "AI Video · Property Walkthrough · 9:16 Vertical",
    shortDescription:
      "A cinematic AI drone-style walkthrough video made from listing photos — no filming or visit needed. Sample: 601 S Jupiter Rd, Allen, TX (7,262 sq ft).",
    overview:
      "A smooth, continuous AI-generated walkthrough video created from a property's existing listing photos. The camera glides from the street through the front door and into the living spaces, with the address and square footage shown as on-screen text. No filming, no visit, no drone on site — the whole video is made from photos the broker already has. This sample was made for 601 S Jupiter Rd, Allen, TX, a 7,262 sq ft home.",
    problemStatement:
      "Buyers skip listings with only still photos. Brokers need a video tour, but a real drone shoot costs time and money and needs a site visit.",
    features: [
      "Made entirely from the listing's existing photos",
      "Continuous cinematic walkthrough — exterior to interior",
      "On-screen address and square-footage text",
      "Vertical 9:16 format, ready for Instagram, TikTok and Reels",
      "No filming, no visit, no drone on site",
    ],
    tech: ["AI Video Generation", "Higgsfield", "Real Estate Marketing", "Vertical Video"],
    result: "Sample walkthrough video for a 7,262 sq ft home, made from photos only",
    metrics: [
      { label: "Property size", value: "7,262 sq ft" },
      { label: "Format", value: "9:16 vertical" },
      { label: "Filming needed", value: "None" },
    ],
    keywords: ["ai drone video", "real estate video", "property walkthrough", "listing video", "higgsfield", "vertical video", "broker marketing"],
    icon: Sparkles,
    image: "https://drive.google.com/thumbnail?id=1uI8hH_ETDUe7-kUZqvkBzx8BGHuEDSiE&sz=w1000",
    imageAlt: "AI drone-style walkthrough video sample — exterior of 601 S Jupiter Rd, Allen, TX",
    badge: "Generative AI · Real Estate Video",
    accent: "emerald",
    gradient: "from-neon-emerald/25 via-neon-teal/15 to-transparent",
    liveDemo: "https://drive.google.com/file/d/1uI8hH_ETDUe7-kUZqvkBzx8BGHuEDSiE/view?usp=drivesdk",
    featured: true,
    priority: 120,
  },
  {
    id: "nice-fast-food-broast-website",
    title: "NICE Fast Food & Broast",
    category: "Web Development",
    tagline: "Restaurant Website · Menu · WhatsApp Ordering",
    shortDescription:
      "A welcoming restaurant website showcasing the menu, local location, and direct WhatsApp ordering for NICE Fast Food in Kahna Nau.",
    overview:
      "Designed and built a restaurant website for NICE Fast Food & Broast. The experience introduces the local restaurant, presents popular menu items and special offers, and helps customers find the Kahna Nau location or ask about current prices and availability through WhatsApp.",
    problemStatement:
      "Local diners need a simple way to explore the menu, find the restaurant, and ask about current prices before placing an order.",
    features: [
      "Restaurant introduction and location details",
      "Popular menu items and special-offer sections",
      "Direct WhatsApp ordering links for menu enquiries",
      "Click-to-call contact information",
    ],
    tech: ["Responsive Web Design", "Restaurant Website", "Menu & Offers", "WhatsApp Ordering"],
    result: "Restaurant website with menu discovery and direct ordering enquiries",
    metrics: [
      { label: "Menu highlights", value: "8" },
      { label: "Service area", value: "Kahna Nau, Lahore" },
      { label: "Order enquiries", value: "WhatsApp" },
    ],
    keywords: ["nice fast food", "broast", "restaurant", "lahore", "menu", "whatsapp ordering", "web design"],
    icon: Globe,
    image: niceBroastImg,
    imageAlt: "NICE Fast Food and Broast restaurant website homepage",
    badge: "Web Development · Restaurant",
    accent: "gold",
    gradient: "from-neon-gold/25 via-neon-teal/15 to-transparent",
    liveDemo: "https://nice-broast-bites-lahore.lovable.app",
    featured: true,
    priority: 118,
  },
  {
    id: "aurelle-restaurant-website",
    title: "Aurelle Restaurant Experience",
    category: "Web Development",
    tagline: "Restaurant Website · Menu · Reservations",
    shortDescription:
      "An editorial restaurant website for a London kitchen and wine bar, with signature dishes, opening hours, reservations, and a digital dining concierge.",
    overview:
      "Designed and built an immersive restaurant website for Aurelle, a modern kitchen and wine bar concept in London. The site brings the dining atmosphere forward, makes signature dishes and opening hours easy to explore, and provides reservation links alongside a digital concierge for common menu questions.",
    problemStatement:
      "A restaurant's digital presence should communicate its atmosphere while making the menu, visit details, and booking path easy to find.",
    features: [
      "Full-screen restaurant introduction and visual identity",
      "Signature dishes and categorized menu browsing",
      "Reservation calls to action and visit information",
      "Opening hours and location details",
      "Digital concierge for menu and dining questions",
    ],
    tech: ["Responsive Web Design", "Restaurant Website", "Menu Discovery", "Reservations", "AI Concierge"],
    result: "Restaurant discovery experience connecting menu exploration to reservations",
    metrics: [
      { label: "Menu categories", value: "5" },
      { label: "Location", value: "London" },
      { label: "Guest journey", value: "Menu → Reservation" },
    ],
    keywords: ["aurelle", "restaurant", "dining", "wine bar", "london", "reservations", "digital concierge"],
    icon: Globe,
    image: aurelleRestaurantImg,
    imageAlt: "Aurelle restaurant website with a candle-lit dining room and reservation button",
    badge: "Web Development · Hospitality",
    accent: "gold",
    gradient: "from-neon-gold/25 via-neon-emerald/15 to-transparent",
    liveDemo: "https://golden-table-dining-guide.lovable.app",
    featured: true,
    priority: 116,
  },
  {
    id: "marbrook-estates-real-estate-website",
    title: "Marbrook Estates Property Experience",
    category: "Web Development",
    tagline: "Real Estate · Neighborhood Discovery · Property Tours",
    shortDescription:
      "A visual real-estate discovery experience connecting neighborhood context, verified listings, property tours, and the path to move-in.",
    overview:
      "Designed and built a real-estate website for Marbrook Estates, presenting the home-search journey as four connected stages: neighborhood discovery, verified property listings, immersive property tours, and move-in support. The experience highlights local context such as schools, commutes, parks, listing details, and tour options.",
    problemStatement:
      "Home seekers need more context than a listing photo alone; they want to understand the neighborhood, inspect a property, and know what comes next.",
    features: [
      "Four-stage neighborhood-to-move-in website experience",
      "Neighborhood context for schools, commutes, and parks",
      "Property listing and verification highlights",
      "3D tour, room dimensions, and light-study information",
      "Calls to action for browsing listings and contacting an agent",
    ],
    tech: ["Responsive Web Design", "Real Estate Website", "Property Discovery", "Neighborhood Guides", "Tour Experience"],
    result: "Guided real-estate discovery experience from neighborhood to move-in",
    metrics: [
      { label: "Journey stages", value: "4" },
      { label: "Markets presented", value: "40+" },
      { label: "Property journey", value: "Neighborhood → Move-in" },
    ],
    keywords: ["marbrook estates", "real estate", "property finder", "neighborhood", "home search", "3d tour"],
    icon: Building2,
    image: marbrookEstatesImg,
    imageAlt: "Marbrook Estates property discovery website showing a miniature neighborhood scene",
    badge: "Web Development · Real Estate",
    accent: "teal",
    gradient: "from-neon-teal/25 via-neon-gold/15 to-transparent",
    liveDemo: "https://real-estate-finder-16.lovable.app",
    featured: true,
    priority: 114,
  },
  {
    id: "azeem-inspiration-institute",
    title: "Azeem Inspiration Institute Website",
    category: "Web Development",
    tagline: "Education · Institute Website · Lahore",
    shortDescription:
      "A polished institute website introducing Azeem Inspiration, its academic programs, student-focused approach, and admission information.",
    overview:
      "Designed and built the public website for Azeem's Inspiration Institute in Kahna Nau, Lahore. The site introduces the academy and its leadership, presents programs for school, college, and ADP students, and helps families find key information about activities, fees, timings, location, and admissions.",
    problemStatement:
      "Students and families need a clear, welcoming place to understand the institute's programs and find practical admission details.",
    features: [
      "Institute introduction, leadership profile, and journey",
      "Program discovery for school, college, and ADP students",
      "Admission calls to action and contact information",
      "FAQs covering fees, schedules, programs, and location",
      "Student activities and learning approach",
    ],
    tech: ["Web Design", "Responsive Website", "Program Discovery", "Admissions Information"],
    result: "Complete public website for the institute",
    metrics: [
      { label: "Student levels", value: "9th–ADP" },
      { label: "Location", value: "Kahna Nau, Lahore" },
      { label: "Key journey", value: "Programs & admissions" },
    ],
    keywords: ["website development", "education", "academy", "school", "college", "admissions", "lahore"],
    icon: Globe,
    image: azeemInstituteImg,
    imageAlt: "Azeem Inspiration Institute website homepage with institute introduction and program links",
    badge: "Web Development · Education",
    accent: "teal",
    gradient: "from-neon-teal/25 via-neon-emerald/15 to-transparent",
    liveDemo: "https://www.azeeminspirationinstitute.com/",
    featured: true,
    priority: 120,
  },
  {
    id: "real-estate-ai-agent",
    title: "Real Estate AI Agent",
    category: "Generative AI",
    secondaryCategories: ["NLP", "Python Projects"],
    tagline: "FastAPI · RAG · Agentic Workflows · Multi-Role",
    shortDescription:
      "Full-stack real estate platform with an AI chat assistant (property search, mortgage calculator, streaming answers), listings, bookings, complaint triage and automatic worker assignment.",
    overview:
      "A production-style Real Estate AI Agent that combines a conversational AI layer with complete property operations. Visitors chat with an AI assistant that searches properties, runs mortgage calculations and answers questions with live streaming. Customers browse listings and book viewings with double-booking protection; tenants file maintenance complaints with photos that the AI auto-categorizes and prioritizes; the system auto-assigns the best worker by skill, location and workload; and every update triggers email/SMS/push notifications. Role-based access (customer, tenant, worker, manager, admin) keeps each user scoped to their own data.",
    problemStatement:
      "Real-estate operations juggle listings, leads, viewings, and maintenance across disconnected tools. This platform unifies them behind one AI agent and one API — grounded in a ChromaDB RAG knowledge base — so inquiries convert to bookings and complaints resolve automatically.",
    modelArchitecture:
      "Client → JWT Auth → FastAPI → AI Agent (Groq / Mistral) → Tools (Property Search, Mortgage Calculator, Complaint Triage, Worker Assignment) → ChromaDB RAG → SQLite/PostgreSQL → Email/SMS/Push notifications.",
    features: [
      "AI chat assistant — property search, mortgage calculator, live streaming answers",
      "Property listings with detail views and booking/inquiry flow",
      "Lead management — tracks every visitor inquiry",
      "Appointment booking with double-booking protection",
      "Maintenance/complaint tracking with photo upload",
      "AI auto-categorization & priority for complaints",
      "Automatic worker assignment by skill, location & workload",
      "Email / SMS / push notifications on every update",
      "Role-based access: customer, tenant, worker, manager, admin",
      "JWT authentication, Docker-ready deployment",
    ],
    tech: [
      "Python",
      "FastAPI",
      "Groq",
      "Mistral AI",
      "ChromaDB",
      "RAG",
      "SQLite",
      "PostgreSQL",
      "JWT",
      "HTML",
      "CSS",
      "JavaScript",
      "Docker",
    ],
    result: "End-to-end AI-powered real estate operations platform",
    metrics: [
      { label: "Roles", value: "5" },
      { label: "LLMs", value: "Groq + Mistral" },
      { label: "Deploy", value: "Docker" },
    ],
    keywords: [
      "real estate",
      "ai agent",
      "rag",
      "chromadb",
      "groq",
      "mistral",
      "fastapi",
      "mortgage calculator",
      "appointment booking",
      "lead management",
      "role based access",
      "docker",
      "generative ai",
    ],
    icon: Building2,
    image: realEstateImg,
    imageAlt: "Real Estate AI Agent — dashboard with listings, AI chat and booking preview",
    badge: "Gen AI · Full-Stack Agent",
    accent: "emerald",
    gradient: "from-neon-emerald/25 via-neon-teal/15 to-transparent",
    github: "https://github.com/adiltariq234/real-estate-ai-agent",
    demoVideo: realEstateVideo,
    featured: true,
    priority: 105,
  },
  {
    id: "adilgpt",
    title: "AdilGPT — Production-Ready AI Assistant",
    category: "Generative AI",
    secondaryCategories: ["NLP", "Python Projects"],
    tagline: "FastAPI · LangGraph · Multi-LLM · RAG",
    shortDescription:
      "Production-ready AI assistant with FastAPI, LangGraph, Gemini/Groq/Mistral, RAG, JWT auth, long-term memory and streaming responses.",
    overview:
      "AdilGPT is a scalable, production-ready AI assistant that demonstrates the full stack of modern AI engineering: FastAPI backend, LangGraph agent orchestration, multi-LLM routing across Gemini, Groq and Mistral, a full RAG pipeline over ChromaDB, JWT authentication, long-term memory, streaming responses, Docker deployment and hardened security middleware.",
    problemStatement:
      "Most AI demos never reach production — they lack auth, streaming, memory, RAG, migrations or deployment. AdilGPT is the reference architecture for shipping a real AI product end-to-end.",
    modelArchitecture:
      "User → Frontend → FastAPI → JWT Auth → LangGraph Agent → (Gemini | Groq | Mistral) → Tools (Calculator, Memory, Search, RAG over ChromaDB) → SSE streaming → Frontend.",
    features: [
      "Multi-LLM support (Gemini, Groq, Mistral)",
      "LangGraph agent with tool routing",
      "Full RAG pipeline with ChromaDB",
      "JWT authentication & sessions",
      "Long-term per-user memory",
      "Streaming (SSE) responses",
      "PDF / DOCX / TXT ingestion",
      "SQLite + Alembic migrations",
      "Dockerized production deployment",
      "Security headers & rate limiting",
    ],
    tech: [
      "Python",
      "FastAPI",
      "LangGraph",
      "LangChain",
      "Google Gemini",
      "Groq",
      "Mistral AI",
      "ChromaDB",
      "SQLite",
      "Alembic",
      "Docker",
      "JWT",
    ],
    result: "End-to-end production AI assistant reference architecture",
    metrics: [
      { label: "AI Models", value: "7" },
      { label: "Endpoints", value: "25+" },
      { label: "Deploy", value: "Docker" },
    ],
    keywords: [
      "adilgpt",
      "chatgpt clone",
      "fastapi",
      "langgraph",
      "langchain",
      "gemini",
      "groq",
      "mistral",
      "rag",
      "chromadb",
      "jwt",
      "streaming",
      "generative ai",
      "ai assistant",
    ],
    icon: Sparkles,
    image: adilgptImg,
    imageAlt: "AdilGPT premium AI assistant dashboard preview",
    badge: "Flagship · Gen AI",
    accent: "gold",
    gradient: "from-neon-gold/25 via-neon-emerald/15 to-transparent",
    github: "https://github.com/adiltariq234/AdilGPT",
    liveDemo: "/adilgpt",
    featured: true,
    priority: 110,
  },
  {
    id: "ai-customer-support-agent",
    title: "Production-Ready AI Customer Support Agent",
    category: "Generative AI",
    secondaryCategories: ["NLP", "Python Projects"],
    tagline: "LLM Engineering · RAG · AI Agent",
    shortDescription:
      "Enterprise-grade AI support agent using RAG, semantic search, and LangGraph orchestration over a Qdrant + Mistral stack.",
    overview:
      "A production-ready AI Customer Support Agent that answers customer questions using Retrieval-Augmented Generation, semantic search, and modern LLM orchestration. It ingests company documents (PDF, Markdown, TXT, Web URLs), retrieves the most relevant context from a Qdrant vector database, and generates accurate, low-hallucination responses via Mistral AI — served through a FastAPI backend and a LangGraph workflow.",
    problemStatement:
      "Customers wait too long for answers, support teams burn cycles on repetitive questions, and knowledge is scattered across documents. Traditional chatbots fail because they lack real context — this agent grounds every reply in the company's own knowledge base.",
    dataset:
      "Bring-your-own knowledge base — PDF, Markdown, TXT, and Web URL loaders feed a Recursive Character Text Splitter and Sentence-Transformers embeddings into Qdrant.",
    modelArchitecture:
      "User → FastAPI → LangGraph workflow → Retriever (MMR) → Qdrant vector search → Relevant chunks → Prompt construction → Mistral AI LLM → Grounded response.",
    features: [
      "Retrieval-Augmented Generation (RAG)",
      "Semantic search with MMR retrieval",
      "Multi-format ingestion (PDF, TXT, Markdown, Web)",
      "LangGraph agent workflow orchestration",
      "FastAPI REST backend, Docker-ready",
      "Low-hallucination, context-aware answers",
      "Scalable Qdrant vector database",
      "Prompt engineering & template control",
    ],
    tech: [
      "Python",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "Mistral AI",
      "Qdrant",
      "Sentence Transformers",
      "Docker",
    ],
    result: "Production-ready RAG backend with low-latency retrieval",
    metrics: [
      { label: "Architecture", value: "RAG + Agent" },
      { label: "Vector DB", value: "Qdrant" },
      { label: "LLM", value: "Mistral" },
    ],
    keywords: [
      "rag",
      "llm",
      "agent",
      "langgraph",
      "langchain",
      "qdrant",
      "mistral",
      "fastapi",
      "vector search",
      "semantic search",
      "generative ai",
      "customer support",
      "chatbot",
    ],
    icon: Bot,
    image: supportAgentImg,
    imageAlt:
      "Production-Ready AI Customer Support Agent — RAG architecture preview",
    badge: "Gen AI · RAG Agent",
    accent: "emerald",
    gradient: "from-neon-emerald/25 via-neon-gold/15 to-transparent",
    github:
      "https://github.com/adiltariq234/intelligent-workflow-hub/tree/main/python/Customers_support_agent",
    liveDemo:
      "https://drive.google.com/file/d/1Gg5xsNbOuwAnBXoh1Jk-NIdHAZQkFusY/view?usp=drive_link",
    demoVideo: supportAgentVideo,
    featured: true,
    priority: 100,
  },
  {
    id: "ai-college-assistant",
    title: "AI College Assistant",
    category: "Generative AI",
    secondaryCategories: ["NLP", "Python Projects"],
    tagline: "Conditional RAG · LangGraph · NLP",
    shortDescription:
      "Intelligent AI College Assistant using Conditional RAG and LangGraph to answer student queries from institutional knowledge with Groq LLM and Mistral embeddings.",
    overview:
      "An intelligent AI College Assistant built with Conditional RAG and LangGraph to answer student queries accurately using the institution's own knowledge base. The system intelligently decides when retrieval is required and generates fast, context-aware responses using Groq LLM and Mistral Embeddings — served through a FastAPI backend and a responsive HTML/CSS/JS frontend.",
    problemStatement:
      "Students struggle to get quick, accurate answers about courses, policies, deadlines and campus information scattered across PDFs and portals. This assistant routes each query intelligently — retrieving from the college knowledge base only when needed — for fast, grounded, context-aware answers.",
    dataset:
      "College knowledge base of PDF documents (handbooks, policies, prospectus, FAQs) chunked and embedded with Mistral Embeddings into a FAISS / ChromaDB vector store.",
    modelArchitecture:
      "Student query → FastAPI → LangGraph router → (Conditional) Retriever → FAISS/ChromaDB semantic search → Prompt construction → Groq LLM → Context-aware answer.",
    features: [
      "Conditional Retrieval-Augmented Generation (Conditional RAG)",
      "Intelligent query routing using LangGraph",
      "Semantic document retrieval",
      "Fast AI responses with Groq LLM",
      "Mistral embedding integration",
      "PDF knowledge base support",
      "Context-aware answer generation",
      "Modular production-ready architecture",
      "REST API with FastAPI",
      "Responsive frontend",
    ],
    tech: [
      "Python",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "Conditional RAG",
      "Groq API",
      "Mistral Embeddings",
      "FAISS",
      "ChromaDB",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    result: "Fast, grounded student Q&A with conditional retrieval",
    metrics: [
      { label: "Architecture", value: "Conditional RAG" },
      { label: "Orchestration", value: "LangGraph" },
      { label: "LLM", value: "Groq" },
    ],
    keywords: [
      "rag",
      "conditional rag",
      "langgraph",
      "langchain",
      "groq",
      "mistral",
      "embeddings",
      "faiss",
      "chromadb",
      "fastapi",
      "nlp",
      "generative ai",
      "college",
      "education",
      "assistant",
      "chatbot",
    ],
    icon: GraduationCap,
    image: collegeAssistantImg,
    imageAlt:
      "AI College Assistant — Conditional RAG and LangGraph architecture preview",
    badge: "Gen AI · Conditional RAG",
    accent: "gold",
    gradient: "from-neon-gold/25 via-neon-emerald/15 to-transparent",
    github:
      "https://github.com/adiltariq234/intelligent-workflow-hub/tree/main/python/College_Assistant",
    featured: true,
    priority: 95,
  },
  {
    id: "ai-skin-specialist",
    title: "AI Skin Specialist",
    category: "Multimodal AI",
    secondaryCategories: ["Generative AI", "Computer Vision", "NLP", "Python Projects"],
    tagline: "Voice · Image · Video Skin Consultation",
    shortDescription:
      "Multimodal AI dermatology assistant — analyze skin from images, voice notes, or short videos with confidence scores and grounded recommendations.",
    overview:
      "AI Skin Specialist is a multimodal skin consultation assistant. Users upload an image, record their voice, or submit a short video; the Python backend runs skin-condition classification and a Groq-powered LLM to produce symptoms, causes, precautions, next steps and a downloadable medical report. The frontend is a premium SaaS-style mini-app served at /ai-skin-specialist with a configurable backend URL.",
    problemStatement:
      "Access to fast, informed skin guidance is limited outside clinics. This assistant provides an educational triage layer with clear confidence scoring and disclaimers — never a substitute for a dermatologist, but a first look powered by modern multimodal AI.",
    features: [
      "Image analysis with drag-and-drop upload",
      "Voice consultation with in-browser recording",
      "Video analysis with frame-by-frame preview",
      "Streaming chatbot (Groq LLM)",
      "Confidence scores and precautions",
      "Printable / PDF medical report",
      "Local consultation history dashboard",
      "Configurable backend API base",
      "Responsive, dark-mode SaaS UI",
    ],
    tech: [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
      "ShadCN UI",
      "TanStack Query",
      "Python",
      "FastAPI",
      "Groq API",
    ],
    result: "End-to-end multimodal skin consultation experience",
    keywords: [
      "multimodal",
      "computer vision",
      "dermatology",
      "skin",
      "voice",
      "video",
      "groq",
      "rag",
      "healthcare",
    ],
    icon: Stethoscope,
    image: skinSpecialistImg,
    imageAlt: "AI Skin Specialist — multimodal dermatology assistant preview",
    badge: "Multimodal · Healthcare AI",
    accent: "teal",
    gradient: "from-neon-teal/25 via-neon-emerald/15 to-transparent",
    github:
      "https://github.com/adiltariq234/intelligent-workflow-hub/tree/main/python/Ai%20skin%20specialist",
    liveDemo: "/ai-skin-specialist",
    featured: true,
    priority: 98,
  },
  {
    id: "heart-disease-prediction",
    title: "Heart Disease Prediction System",
    category: "Machine Learning",
    secondaryCategories: ["Data Science"],
    tagline: "Healthcare AI",
    shortDescription:
      "ML system that analyzes patient health data to predict heart disease risk for early intervention.",
    overview:
      "An AI-powered Heart Disease Prediction System using supervised machine learning to analyze patient health indicators and predict the likelihood of heart disease. Designed to support early risk assessment and clinical decision-making with an interactive dashboard.",
    problemStatement:
      "Cardiovascular disease is the leading cause of death globally. Manual risk assessment is inconsistent — this project automates risk scoring from standard clinical inputs.",
    dataset:
      "UCI Heart Disease dataset (303 records, 14 features including age, cholesterol, resting BP, max heart rate, ST depression).",
    modelArchitecture:
      "Pipeline: StandardScaler → feature selection → Logistic Regression / Random Forest ensemble with cross-validated hyperparameter tuning.",
    features: [
      "Heart disease risk prediction",
      "Real-time prediction interface",
      "Data preprocessing & feature engineering",
      "ML model evaluation",
      "Interactive visualizations",
      "User-friendly dashboard",
    ],
    tech: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib"],
    metrics: [
      { label: "Accuracy", value: "88%" },
      { label: "ROC-AUC", value: "0.91" },
      { label: "Features", value: "14" },
    ],
    keywords: ["healthcare", "classification", "supervised", "risk", "medical"],
    icon: HeartPulse,
    image: heartImg,
    imageAlt: "Heart Disease Prediction System — ML healthcare illustration",
    badge: "ML · Healthcare",
    accent: "emerald",
    gradient: "from-neon-emerald/25 via-neon-teal/15 to-transparent",
    github:
      "https://github.com/adiltariq234/intelligent-workflow-hub/tree/main/python/Heart%20Disease%20Prediction%20App",
    featured: true,
    priority: 90,
  },
  {
    id: "cancer-prediction-model",
    title: "Cancer Prediction Model",
    category: "Machine Learning",
    secondaryCategories: ["Data Science"],
    tagline: "Predictive Healthcare ML",
    shortDescription:
      "ML system that analyzes medical diagnostic data to predict potential cancer cases with optimized performance.",
    overview:
      "A Machine Learning-based Cancer Prediction System designed to analyze medical diagnostic data and predict potential cancer cases. Demonstrates predictive analytics, healthcare AI, and end-to-end model optimization.",
    problemStatement:
      "Early cancer detection drastically improves survival rates. The model aids screening pipelines by flagging high-risk cases from diagnostic features.",
    dataset:
      "Breast Cancer Wisconsin Diagnostic dataset (569 samples, 30 numerical features from digitized FNA images).",
    modelArchitecture:
      "Pipeline: StandardScaler → PCA → Random Forest + Logistic Regression comparison with stratified k-fold CV.",
    features: [
      "Cancer risk prediction",
      "Medical data analysis",
      "Predictive modeling",
      "Model performance evaluation",
      "Data visualization",
      "Scalable architecture",
    ],
    tech: ["Python", "Pandas", "NumPy", "Scikit-Learn"],
    metrics: [
      { label: "Accuracy", value: "96%" },
      { label: "Precision", value: "0.97" },
      { label: "Recall", value: "0.95" },
    ],
    keywords: ["healthcare", "oncology", "classification", "diagnostic"],
    icon: Microscope,
    image: cancerImg,
    imageAlt: "Cancer Prediction Model — medical ML illustration",
    badge: "ML · Healthcare",
    accent: "gold",
    gradient: "from-neon-gold/25 via-neon-emerald/15 to-transparent",
    github:
      "https://github.com/adiltariq234/intelligent-workflow-hub/tree/main/python/cancer-predictor",
    featured: true,
    priority: 85,
  },
  {
    id: "wine-clustering-kmeans",
    title: "Wine Clustering Analysis Using K-Means",
    category: "Machine Learning",
    secondaryCategories: ["Data Science"],
    tagline: "Unsupervised Learning",
    shortDescription:
      "K-Means clustering project that groups wines by chemical properties and evaluates with Silhouette Score.",
    overview:
      "Wine Clustering Analysis using the K-Means algorithm to discover hidden patterns and group similar wines based on their chemical properties. Includes preprocessing, feature scaling, cluster & centroid visualization, and performance evaluation.",
    problemStatement:
      "Wineries need to group products by chemical profile for quality control and recommendation. Unsupervised clustering surfaces natural groupings without labels.",
    dataset:
      "UCI Wine dataset (178 samples, 13 chemical attributes such as alcohol, malic acid, flavanoids, color intensity).",
    modelArchitecture:
      "StandardScaler → K-Means (k=3) → Silhouette Score evaluation → 2D PCA projection for visualization.",
    features: [
      "Data preprocessing & EDA",
      "Feature scaling (StandardScaler)",
      "K-Means clustering (k=3)",
      "Cluster & centroid visualization",
      "Silhouette Score evaluation",
    ],
    tech: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib"],
    result: "Silhouette Score of 0.48 with 3 clusters",
    metrics: [
      { label: "Clusters", value: "3" },
      { label: "Silhouette", value: "0.48" },
      { label: "Features", value: "13" },
    ],
    keywords: ["unsupervised", "clustering", "kmeans", "eda"],
    icon: Wine,
    image: wineImg,
    imageAlt: "Wine Clustering Analysis — K-Means visualization preview",
    badge: "ML · Unsupervised",
    accent: "teal",
    gradient: "from-neon-teal/25 via-neon-emerald/15 to-transparent",
    github:
      "https://github.com/adiltariq234/intelligent-workflow-hub/blob/main/python/Machine_Learning/Wine_clustring_project.ipynb",
    priority: 70,
  },
  {
    id: "intelligent-workflow-hub",
    title: "Intelligent Workflow Hub",
    category: "Python Projects",
    secondaryCategories: ["Data Science"],
    tagline: "AI Web Application",
    shortDescription:
      "Streamlit-based AI workflow hub for automating tasks, tracking expenses and managing data pipelines.",
    overview:
      "An AI-powered workflow automation web app built with Python & Streamlit. Helps users automate repetitive tasks, track expenses, and manage workflows efficiently in a clean dashboard.",
    problemStatement:
      "Small teams juggle scattered tools for tasks, expenses and data work. This hub consolidates them into one AI-assisted dashboard.",
    features: [
      "Task automation",
      "Expense tracking",
      "Smart data processing",
      "User-friendly Streamlit UI",
    ],
    tech: ["Python", "Streamlit", "Pandas", "Automation"],
    keywords: ["streamlit", "automation", "dashboard", "productivity"],
    icon: Workflow,
    image: workflowImg,
    imageAlt: "Intelligent Workflow Hub — AI dashboard preview",
    badge: "Python · Streamlit",
    accent: "gold",
    gradient: "from-neon-gold/25 via-neon-emerald/15 to-transparent",
    github: "https://github.com/adiltariq234/intelligent-workflow-hub",
    priority: 60,
  },
  {
    id: "bank-management-system",
    title: "Bank Management System",
    category: "Python Projects",
    tagline: "CLI Application",
    shortDescription:
      "Python OOP-based CLI bank system with JSON persistence for accounts and transactions.",
    overview:
      "A Python-based Bank Management System that lets users create accounts, manage transactions, and persist data using JSON file handling. Demonstrates object-oriented programming and real-world banking operations.",
    problemStatement:
      "A teaching project showing how OOP, persistence and error handling come together in a real-world domain.",
    features: [
      "Account creation system",
      "Deposit & withdraw flow",
      "JSON-based persistence",
      "CLI banking operations",
      "Error handling & validation",
    ],
    tech: ["Python", "OOP", "JSON", "File I/O", "CLI"],
    keywords: ["python", "oop", "cli", "banking", "fundamentals"],
    icon: Banknote,
    image: bankImg,
    imageAlt: "Bank Management System — Python CLI app preview",
    badge: "Python · OOP",
    accent: "emerald",
    gradient: "from-neon-emerald/25 via-neon-teal/15 to-transparent",
    github:
      "https://github.com/adiltariq234/intelligent-workflow-hub/tree/main/python/Bank_Mangment",
    priority: 50,
  },
  {
    id: "noir-pantry-ai-shopping-agent",
    title: "Noir Pantry AI Shopping Agent",
    category: "Generative AI",
    secondaryCategories: ["Computer Vision", "Python Projects"],
    tagline: "LangChain Agent · Mistral AI · Vision · SQLite",
    shortDescription:
      "Conversational AI shopping assistant with tool-calling agent, multimodal photo search, SQLite catalogue and Streamlit UI.",
    overview:
      "Noir Pantry is an AI shopping assistant for a curated pantry catalogue. It combines natural-language interaction, an LLM-driven tool-calling agent, structured product data in SQLite, session-level conversational context, and image-based product lookup — all served through a single Streamlit web application.",
    problemStatement:
      "Traditional storefronts push the work onto the customer: search, then filter, then compare. Noir Pantry lets shoppers describe what they want in plain language, upload a photo, or ask follow-up questions — and the agent finds, rates, and checks out products for them.",
    modelArchitecture:
      "User → Streamlit UI → LangChain create_agent → ChatMistralAI (mistral-small-latest) → Tools (search_products, get_rating, describe_product_image, checkout) → SQLite store.db.",
    features: [
      "Conversational product discovery",
      "Tool-calling LangChain agent",
      "Filtered SQLite product search",
      "Ratings and review aggregation",
      "Photo search with vision model",
      "Off-topic image guard",
      "Session-scoped conversation memory",
      "Confirmation-gated checkout",
      "Password-protected admin orders view",
      "Deployed on Streamlit Cloud",
    ],
    tech: [
      "Python",
      "Streamlit",
      "LangChain",
      "langchain-mistralai",
      "Mistral AI",
      "SQLite",
      "python-dotenv",
      "Git",
    ],
    result: "End-to-end conversational AI shopping agent with vision search",
    metrics: [
      { label: "Agent Tools", value: "4" },
      { label: "Model", value: "mistral-small-latest" },
      { label: "Data Layer", value: "SQLite" },
    ],
    keywords: [
      "ai shopping agent",
      "langchain agent",
      "mistral ai",
      "vision",
      "multimodal",
      "sqlite",
      "streamlit",
      "ecommerce",
      "conversational ai",
      "tool calling",
    ],
    icon: ShoppingBag,
    image: noirPantryImg,
    imageAlt: "Noir Pantry AI Shopping Agent — LangChain and Mistral case study preview",
    badge: "Gen AI · Agent · Vision",
    accent: "teal",
    gradient: "from-neon-teal/25 via-neon-gold/15 to-transparent",
    github: "https://github.com/adiltariq234/-Noir-Pantry-AI-shopping-agent",
    liveDemo: "https://noir-pantry.streamlit.app/",
    featured: true,
    priority: 92,
  },
];

/** Filter helper used by the UI. */
export function filterProjects(
  list: Project[],
  category: (typeof PROJECT_CATEGORIES)[number],
  query: string,
): Project[] {
  const q = query.trim().toLowerCase();
  return list.filter((p) => {
    const inCategory =
      category === "All Projects" ||
      p.category === category ||
      p.secondaryCategories?.includes(category as ProjectCategory);
    if (!inCategory) return false;
    if (!q) return true;
    const haystack = [
      p.title,
      p.shortDescription,
      p.overview,
      p.category,
      ...(p.secondaryCategories ?? []),
      ...p.tech,
      ...(p.keywords ?? []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
