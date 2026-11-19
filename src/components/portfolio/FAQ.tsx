import { motion } from "framer-motion";
import { memo } from "react";

const faqs = [
  {
    q: "Who is Hafiz Adil?",
    a: "Hafiz Adil is a freelance Generative AI Engineer and founder of Innovex Solutions, specializing in RAG chatbots, LLM agents, n8n workflow automation, and Python development for clients worldwide.",
  },
  {
    q: "What services does Hafiz Adil offer?",
    a: "Hafiz Adil offers RAG chatbot development, LLM agent engineering, n8n workflow automation, custom Python AI applications, and AI integration consulting for businesses of all sizes.",
  },
  {
    q: "What is a RAG chatbot and how can it help my business?",
    a: "A RAG (Retrieval-Augmented Generation) chatbot combines a large language model with your private knowledge base, so it answers customer or employee questions using your own documents — accurately and without hallucinations. It reduces support costs and provides 24/7 instant answers.",
  },
  {
    q: "How can AI automation help my business?",
    a: "AI automation removes repetitive manual work — lead capture, data entry, email replies, content generation, reporting — letting your team focus on growth. Typical clients save 10–40 hours per week.",
  },
  {
    q: "How do I hire Hafiz Adil for an AI project?",
    a: "Use the contact form on the website, message on WhatsApp, or connect on LinkedIn. You'll get a free 15-minute consultation and a custom quote within 24 hours.",
  },
  {
    q: "Which languages does the website support?",
    a: "The website auto-detects your language and supports English, Urdu, Arabic, Hindi, Spanish, French, German, Chinese, Portuguese, and Russian — with a manual language switcher in the navigation.",
  },
  {
    q: "Does Hafiz Adil work with clients outside Pakistan?",
    a: "Yes. He is based in Lahore, Pakistan, and works with clients in Dubai and worldwide, fully remote across time zones.",
  },
  {
    q: "Can Hafiz Adil build an AI voice agent or WhatsApp chatbot for my business?",
    a: "Yes. AI voice agents and chatbots are core services: voice assistants answer calls, handle common questions and qualify leads, and chatbots work across your website and WhatsApp, 24/7.",
  },
  {
    q: "What technologies does Hafiz Adil use?",
    a: "Python, LangChain, LangGraph, FastAPI, MCP, Groq and Qdrant, among others — the stack behind his RAG chatbots, AI agents and automation.",
  },
  {
    q: "How much experience does Hafiz Adil have?",
    a: "Hafiz Adil has 2 years of experience building RAG and agentic AI systems, with 2 AI internships and 3 certifications and trainings. He is completing a BS in Computer Science, expected in 2027.",
  },
  {
    q: "What projects has Hafiz Adil built?",
    a: "15 projects are listed on the site, including AdilGPT, an AI skin specialist, an AI customer support agent, and client websites for NICE Fast Food & Broast, Aurelle Restaurant, Marbrook Estates and Azeem Inspiration Institute.",
  },
  {
    q: "How can I contact Hafiz Adil?",
    a: "Email adiltariq0327@gmail.com, call 03706710778, or use the contact form on this page — you will get a reply within 24 hours.",
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
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">Answers about Hafiz Adil, his AI engineering services, and how to hire him for your project.</p>
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
