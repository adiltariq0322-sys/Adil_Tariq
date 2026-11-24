// Blog posts. Markdown bodies live in src/content/blog/*.md (imported raw);
// metadata is kept here so new posts only need a file + one entry.
// The daily blog cron writes drafts to ~/workspace/adil-tariq-ai/blog-drafts/;
// publishing a draft means copying its .md here and adding an entry below.
import ragChatbotMd from "../content/blog/what-is-a-rag-chatbot.md?raw";
import voiceMd from "../content/blog/ai-voice-receptionist.md?raw";
import whatsappMd from "../content/blog/whatsapp-ai-agent.md?raw";
import n8nMd from "../content/blog/automate-with-n8n.md?raw";
import chatgptBizMd from "../content/blog/businesses-in-chatgpt.md?raw";
import geminiTasksMd from "../content/blog/gemini-tasks-ai-calling-your-business.md?raw";
import smbAiMd from "../content/blog/two-thirds-of-small-businesses-now-use-ai.md?raw";
import shoppingAgentsMd from "../content/blog/ai-shopping-agents-checkout.md?raw";
import brandSearchMd from "../content/blog/google-ai-answers-your-brand-search.md?raw";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  // Real pixel size of the cover image (all current covers are 2048x1152);
  // rendered as width/height attributes so the browser reserves space.
  imageWidth: number;
  imageHeight: number;
  content: string;
};

const stripFrontmatter = (md: string) =>
  md
    .replace(/^---[\s\S]*?---\s*/, "")
    // Each .md body opens with "# <title>" and BlogPost.tsx already
    // renders post.title as the page <h1>; drop the duplicate so the
    // rendered post has exactly one H1 (crawler: multiple_h1_review).
    .replace(/^# .*\n+/, "");

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-a-rag-chatbot",
    title: "What is a RAG chatbot — and why your business needs one",
    excerpt:
      "A RAG chatbot answers your customers using your own documents — your prices, policies and FAQs — so the answers are accurate, not guessed.",
    date: "2026-11-19",
    image: "/images/blog/rag-chatbot.webp",
    imageWidth: 2048,
    imageHeight: 1152,
    content: stripFrontmatter(ragChatbotMd),
  },
  {
    slug: "ai-voice-receptionist",
    title: "Never miss a customer call again: AI voice receptionists",
    excerpt:
      "An AI voice receptionist answers every call, takes bookings and messages, and hands over to a human when it matters — so a missed call stops being a lost customer.",
    date: "2026-11-19",
    image: "/images/blog/ai-voice-receptionist.webp",
    imageWidth: 2048,
    imageHeight: 1152,
    content: stripFrontmatter(voiceMd),
  },
  {
    slug: "whatsapp-ai-agent",
    title: "WhatsApp AI agents: instant replies, bookings and follow-ups",
    excerpt:
      "Your customers already message you on WhatsApp. A WhatsApp AI agent replies instantly, takes bookings and follows up — even when your team is busy or off duty.",
    date: "2026-11-19",
    image: "/images/blog/whatsapp-ai-agent.webp",
    imageWidth: 2048,
    imageHeight: 1152,
    content: stripFrontmatter(whatsappMd),
  },
  {
    slug: "automate-with-n8n",
    title: "Automating the boring work: how small businesses save hours with n8n",
    excerpt:
      "n8n connects the apps you already use and moves routine work between them automatically — so enquiries, bookings and follow-ups stop depending on someone remembering to do them.",
    date: "2026-11-19",
    image: "/images/blog/automate-n8n.webp",
    imageWidth: 2048,
    imageHeight: 1152,
    content: stripFrontmatter(n8nMd),
  },
  {
    slug: "businesses-in-chatgpt",
    title: "ChatGPT just became a storefront — what your business should do about it",
    excerpt:
      "OpenAI launched Businesses in ChatGPT on November 10, 2026: businesses can now claim a verified profile inside ChatGPT, fix what the chatbot says about them, and — for eligible US sellers — run an AI sales agent. Here is what it means for a small business.",
    date: "2026-11-20",
    image: "/images/blog/businesses-in-chatgpt.webp",
    imageWidth: 2048,
    imageHeight: 1152,
    content: stripFrontmatter(chatgptBizMd),
  },
  {
    slug: "gemini-tasks-ai-calling-your-business",
    title: "Google's AI is now phoning your business — is your front desk ready?",
    excerpt:
      "On November 17, 2026, Google made Gemini Tasks free: its AI can now phone a business, wait on hold, and book an appointment on a customer's behalf. Your next caller may not be a person at all — here is what that means for a small business.",
    date: "2026-11-21",
    image: "/images/blog/gemini-tasks-ai-calling-your-business.webp",
    imageWidth: 2048,
    imageHeight: 1152,
    content: stripFrontmatter(geminiTasksMd),
  },
  {
    slug: "two-thirds-of-small-businesses-now-use-ai",
    title: "Two-thirds of small businesses now use AI — the question is no longer if, but how well",
    excerpt:
      "Gusto's 2026 State of Small Business report, released November 12, found 67% of small businesses now use AI tools — but only 1 in 5 use them deeply, and only a quarter have an AI policy. For a small business, that gap is the opportunity.",
    date: "2026-11-22",
    image: "/images/blog/two-thirds-of-small-businesses-now-use-ai.webp",
    imageWidth: 2048,
    imageHeight: 1152,
    content: stripFrontmatter(smbAiMd),
  },
  {
    slug: "ai-shopping-agents-checkout",
    title: "Your next customer might be an AI agent — and it is already checking out",
    excerpt:
      "On November 4, 2026, Amazon opened a free portal letting AI shopping agents buy from your store, and Google switched on agent checkout in Canada the same day. The shopper may never visit your website — the agent decides from your product feed. Here is what a small business should do about it.",
    date: "2026-11-23",
    image: "/images/blog/ai-shopping-agents-checkout.webp",
    imageWidth: 2048,
    imageHeight: 1152,
    content: stripFrontmatter(shoppingAgentsMd),
  },
  {
    slug: "google-ai-answers-your-brand-search",
    title: "Google's AI now answers for your business before you do",
    excerpt:
      "Someone searches your business by name — and before they see your website, Google's AI writes a short summary about you, built from sources you don't control. Studies put it on more than 8 in 10 brand searches. Here's what that means, and how to take your first impression back.",
    date: "2026-11-24",
    image: "/images/blog/google-ai-answers-your-brand-search.webp",
    imageWidth: 2048,
    imageHeight: 1152,
    content: stripFrontmatter(brandSearchMd),
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
