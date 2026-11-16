import { memo } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Check } from "lucide-react";
import bankImg from "@/assets/project-bank.jpg";
import workflowImg from "@/assets/project-workflow.jpg";

const features = {
  bank: [
    "Account Creation System",
    "Deposit & Withdraw Functionality",
    "Data Storage using JSON",
    "CLI-based Banking Operations",
    "Error Handling & Validation",
  ],
  workflow: [
    "Task Automation",
    "Expense Tracking",
    "Smart Data Processing",
    "User-Friendly Interface",
  ],
};

const GITHUB_BANK_URL =
  "https://github.com/adiltariq234/intelligent-workflow-hub/tree/main/python/Bank_Mangment";
const GITHUB_WORKFLOW_URL =
  "https://github.com/adiltariq234/intelligent-workflow-hub";

const MyProjects = memo(() => {
  return (

    <section id="my-projects" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-neon-emerald mb-3 font-body">
            Showcase
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold neon-text shimmer-text">
            My Projects
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            Hand-picked Python &amp; AI projects built end-to-end — from CLI tools
            to production-ready Streamlit apps.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* === Project 1: Bank Management System === */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="glass-card-hover group overflow-hidden flex flex-col"
          >
            {/* Visual header */}
            <div className="relative overflow-hidden aspect-[16/10] border-b border-glass-border">
              <img
                src={bankImg}
                alt="Bank Management System — Python CLI app preview"
                loading="lazy"
                width={1280}
                height={800}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
              <span className="absolute top-3 right-3 text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-md border border-neon-emerald/40 text-neon-emerald font-body">
                Python · OOP
              </span>
            </div>

            <div className="p-5 sm:p-7 flex flex-col flex-1">
              <span className="text-xs font-body text-neon-gold tracking-wide">
                CLI Application
              </span>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground mt-1 group-hover:text-neon-emerald transition-colors">
                Bank Management System
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
                A Python-based Bank Management System that lets users create accounts,
                manage transactions, and persist data using JSON file handling.
                Demonstrates object-oriented programming and real-world banking
                operations.
              </p>

              {/* Features */}
              <ul className="mt-4 space-y-1.5">
                {features.bank.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                  >
                    <Check className="w-3.5 h-3.5 text-neon-emerald shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {["Python", "OOP", "JSON", "File I/O", "CLI"].map((t) => (
                  <span
                    key={t}
                    className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto pt-5">
                <a
                  href={GITHUB_BANK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-neon-emerald/40 text-neon-emerald hover:bg-neon-emerald/10 hover:border-neon-emerald hover:shadow-[0_0_20px_hsl(var(--neon-emerald)/0.25)] transition-all duration-300"
                >
                  <Github size={16} /> View on GitHub
                  <ExternalLink size={12} className="opacity-70" />
                </a>
              </div>
            </div>
          </motion.article>

          {/* === Project 2: Intelligent Workflow Hub === */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card-hover group overflow-hidden flex flex-col"
          >
            {/* Visual header */}
            <div className="relative overflow-hidden aspect-[16/10] border-b border-glass-border">
              <img
                src={workflowImg}
                alt="Intelligent Workflow Hub — AI dashboard preview"
                loading="lazy"
                width={1280}
                height={800}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
              <span className="absolute top-3 right-3 text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-md border border-neon-gold/40 text-neon-gold font-body">
                Python · Streamlit
              </span>
            </div>

            <div className="p-5 sm:p-7 flex flex-col flex-1">
              <span className="text-xs font-body text-neon-gold tracking-wide">
                AI Web Application
              </span>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground mt-1 group-hover:text-neon-emerald transition-colors">
                Intelligent Workflow Hub
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
                An AI-powered workflow automation web app built with Python &amp;
                Streamlit. Helps users automate repetitive tasks, track expenses, and
                manage workflows efficiently — all in one clean dashboard.
              </p>

              {/* Features */}
              <ul className="mt-4 space-y-1.5">
                {features.workflow.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                  >
                    <Check className="w-3.5 h-3.5 text-neon-emerald shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {["Python", "Streamlit", "AI", "Automation", "Pandas"].map((t) => (
                  <span
                    key={t}
                    className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto pt-5">
                <a
                  href={GITHUB_WORKFLOW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-neon-emerald/40 text-neon-emerald hover:bg-neon-emerald/10 hover:border-neon-emerald hover:shadow-[0_0_20px_hsl(var(--neon-emerald)/0.25)] transition-all duration-300"
                >
                  <Github size={16} /> View on GitHub
                  <ExternalLink size={12} className="opacity-70" />
                </a>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
});

MyProjects.displayName = "MyProjects";
export default MyProjects;
