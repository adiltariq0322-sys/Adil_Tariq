// Blog posts. Markdown bodies live in src/content/blog/*.md (imported raw);
// metadata is kept here so new posts only need a file + one entry.
// The daily blog cron writes drafts to ~/workspace/adil-tariq-ai/blog-drafts/;
// publishing a draft means copying its .md here and adding an entry below.
import ragChatbotMd from "../content/blog/what-is-a-rag-chatbot.md?raw";
import voiceMd from "../content/blog/ai-voice-receptionist.md?raw";
import whatsappMd from "../content/blog/whatsapp-ai-agent.md?raw";
import n8nMd from "../content/blog/automate-with-n8n.md?raw";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
};

const stripFrontmatter = (md: string) => md.replace(/^---[\s\S]*?---\s*/, "");

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-a-rag-chatbot",
    title: "What is a RAG chatbot — and why your business needs one",
    excerpt:
      "A RAG chatbot answers your customers using your own documents — your prices, policies and FAQs — so the answers are accurate, not guessed.",
    date: "2026-11-19",
    content: stripFrontmatter(ragChatbotMd),
  },
  {
    slug: "ai-voice-receptionist",
    title: "Never miss a customer call again: AI voice receptionists",
    excerpt:
      "An AI voice receptionist answers every call, takes bookings and messages, and hands over to a human when it matters — so a missed call stops being a lost customer.",
    date: "2026-11-19",
    content: stripFrontmatter(voiceMd),
  },
  {
    slug: "whatsapp-ai-agent",
    title: "WhatsApp AI agents: instant replies, bookings and follow-ups",
    excerpt:
      "Your customers already message you on WhatsApp. A WhatsApp AI agent replies instantly, takes bookings and follows up — even when your team is busy or off duty.",
    date: "2026-11-19",
    content: stripFrontmatter(whatsappMd),
  },
  {
    slug: "automate-with-n8n",
    title: "Automating the boring work: how small businesses save hours with n8n",
    excerpt:
      "n8n connects the apps you already use and moves routine work between them automatically — so enquiries, bookings and follow-ups stop depending on someone remembering to do them.",
    date: "2026-11-19",
    content: stripFrontmatter(n8nMd),
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
