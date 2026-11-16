import { motion } from "framer-motion";
import { memo } from "react";

const faqs = [
  {
    q: "Who is Adil Tariq?",
    a: "Adil Tariq is a freelance Generative AI Engineer and founder of Innovex Solutions, specializing in RAG chatbots, LLM agents, n8n workflow automation, and Python development for clients worldwide.",
  },
  {
    q: "What services does Adil Tariq offer?",
    a: "Adil offers RAG chatbot development, LLM agent engineering, n8n workflow automation, custom Python AI applications, and AI integration consulting for businesses of all sizes.",
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
    q: "How do I hire Adil Tariq for an AI project?",
    a: "Use the contact form on the website, message on WhatsApp, or connect on LinkedIn. You'll get a free 15-minute consultation and a custom quote within 24 hours.",
  },
  {
    q: "Which languages does the website support?",
    a: "The website auto-detects your language and supports English, Urdu, Arabic, Hindi, Spanish, French, German, Chinese, Portuguese, and Russian — with a manual language switcher in the navigation.",
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
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">Answers about Adil Tariq, his AI engineering services, and how to hire him for your project.</p>
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
