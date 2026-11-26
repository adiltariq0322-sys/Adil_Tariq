import { motion } from "framer-motion";
import { memo } from "react";

const faqs = [
  {
    q: "What is InnoVex?",
    a: "InnoVex is an AI agency in Lahore, Pakistan. We build AI agents, business websites and automation for small businesses — in Lahore, Dubai and worldwide.",
  },
  {
    q: "What services does InnoVex offer?",
    a: "AI voice receptionists, RAG chatbots and WhatsApp agents, business websites and online stores, workflow automation, SEO and UGC video ads.",
  },
  {
    q: "What is a RAG chatbot and how can it help my business?",
    a: "A RAG (Retrieval-Augmented Generation) chatbot combines a large language model with your private knowledge base, so it answers customer or employee questions using your own documents — accurately and without hallucinations. It provides 24/7 instant answers and takes pressure off your team.",
  },
  {
    q: "How can AI automation help my business?",
    a: "AI automation removes repetitive manual work — lead capture, data entry, email replies, content generation, reporting — so your team can focus on growth.",
  },
  {
    q: "How do we start working together?",
    a: "Use the contact form on the website or message us on WhatsApp. You'll get a free demo and a custom quote within 24 hours.",
  },
  {
    q: "Which languages does the website support?",
    a: "The website auto-detects your language and supports English, Urdu, Arabic, Hindi, Spanish, French, German, Chinese, Portuguese, and Russian — with a manual language switcher in the navigation.",
  },
  {
    q: "Do you work with clients outside Pakistan?",
    a: "Yes. We're based in Lahore, Pakistan, and work with clients in Dubai and worldwide, fully remote across time zones.",
  },
  {
    q: "Can you build an AI voice agent or WhatsApp chatbot for my business?",
    a: "Yes. AI voice agents and chatbots are core services: voice assistants answer calls, handle common questions and qualify leads, and chatbots work across your website and WhatsApp, 24/7.",
  },
  {
    q: "What technologies does InnoVex use?",
    a: "Python, LangChain, LangGraph, FastAPI, MCP, Groq and Qdrant, among others — the stack behind our RAG chatbots, AI agents and automation.",
  },
  {
    q: "What projects has InnoVex built?",
    a: "18 projects are listed on the site, including AdilGPT, an AI skin specialist, an AI customer support agent, and websites for EverShine, Azeem Inspiration Institute, NICE Fast Food & Broast, Aurelle Restaurant and Marbrook Estates.",
  },
  {
    q: "How can I contact InnoVex?",
    a: "Email adiltariq0327@gmail.com, WhatsApp 0370 6710778, or use the contact form on this page — you'll get a reply within 24 hours.",
  },
  {
    q: "What is AdilGPT?",
    a: "AdilGPT is a production-ready AI assistant built with FastAPI, LangGraph, LangChain, Gemini, Groq and Mistral AI, with RAG, JWT authentication, long-term memory and streaming responses.",
  },
];

const FAQ = memo(() => (
  <section id="faq" className="section-padding relative">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16"
      >
        <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-secondary mb-3 font-body">FAQ</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">Frequently Asked Questions</h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">Answers about InnoVex, our AI services, and how to work with us.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {faqs.map((f, i) => (
          <motion.div
            key={f.q}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            className="glass-card-hover p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/45 to-transparent" />
            <h3 className="font-heading font-semibold text-base sm:text-lg text-foreground mb-2">{f.q}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{f.a}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

FAQ.displayName = "FAQ";
export default FAQ;
