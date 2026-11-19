import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, CalendarDays, MessageSquare } from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import ParticleField from "@/components/portfolio/ParticleField";
import { getPost } from "@/data/blog";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const markdownComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="font-heading font-bold text-2xl sm:text-3xl mt-10 mb-4">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="font-heading font-bold text-xl mt-8 mb-3">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-muted-foreground leading-relaxed my-4">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc pl-6 my-4 space-y-2 text-muted-foreground leading-relaxed">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal pl-6 my-4 space-y-2 text-muted-foreground leading-relaxed">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} className="text-secondary underline underline-offset-4 hover:opacity-80">
      {children}
    </a>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="text-foreground font-semibold">{children}</strong>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-2 border-secondary pl-4 my-6 text-muted-foreground italic">
      {children}
    </blockquote>
  ),
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden">
        <ParticleField />
        <Navbar />
        <main className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 pt-32 pb-20 text-center">
          <h1 className="font-heading font-bold text-3xl">Post not found</h1>
          <p className="text-muted-foreground mt-3">This blog post does not exist (yet).</p>
          <Link to="/blog" className="inline-flex items-center gap-2 mt-6 text-secondary font-heading font-semibold">
            <ArrowLeft size={16} /> Back to the blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden">
      <ParticleField />
      <Navbar />
      <main className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 pt-28 sm:pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} /> Back to the blog
          </Link>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl mt-6 leading-tight">
            {post.title}
          </h1>
          <p className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
            <CalendarDays size={15} /> {formatDate(post.date)} · Hafiz Adil
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mt-6 border-l-2 border-secondary pl-4">
            {post.excerpt}
          </p>
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-video object-cover rounded-2xl mt-8"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8"
        >
          <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
        </motion.div>

        <div className="glass-card rounded-2xl p-6 sm:p-8 mt-14">
          <h2 className="font-heading font-bold text-xl flex items-center gap-2">
            <MessageSquare size={20} className="text-secondary" /> Want this for your business?
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            I build RAG chatbots, AI voice receptionists, WhatsApp agents and workflow
            automation for small businesses. Tell me what takes up your team&apos;s time —
            I&apos;ll show you what an AI agent can take off their plate.
          </p>
          <Link
            to="/#contact"
            className="btn-neon inline-block mt-5 text-sm font-heading font-semibold"
          >
            Get in touch
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
