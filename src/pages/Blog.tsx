import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, BookOpen } from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import ParticleField from "@/components/portfolio/ParticleField";
import { blogPosts } from "@/data/blog";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const Blog = () => (
  <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden">
    <ParticleField />
    <Navbar />
    <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-28 sm:pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-widest text-secondary">
          <BookOpen size={14} /> Blog
        </p>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl mt-3">
          AI, automation &amp; <span className="text-secondary">practical guides</span>
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
          Plain-English notes on RAG chatbots, AI voice receptionists, WhatsApp agents and
          business automation — written for small-business owners who want more customers,
          not more jargon.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {blogPosts.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 * i, ease: "easeOut" }}
            className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col"
          >
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays size={14} /> {formatDate(post.date)}
            </p>
            <h2 className="font-heading font-bold text-xl sm:text-2xl mt-3 leading-snug">
              <Link to={`/blog/${post.slug}`} className="hover:text-secondary transition-colors">
                {post.title}
              </Link>
            </h2>
            <p className="text-muted-foreground mt-3 leading-relaxed flex-1">{post.excerpt}</p>
            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 mt-6 text-sm font-heading font-semibold text-secondary hover:gap-3 transition-all"
            >
              Read the post <ArrowRight size={16} />
            </Link>
          </motion.article>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Blog;
