import { memo } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah Mitchell", role: "CEO, DataFlow Inc.", text: "Adil built an AI chatbot that transformed our customer support. Response accuracy went up 85% and our team now focuses on high-value tasks." },
  { name: "Ahmed Khan", role: "Founder, AutoScale", text: "The WhatsApp automation system Adil created saves us 30+ hours per week. His n8n expertise is unmatched. Highly recommended!" },
  { name: "Emily Chen", role: "Marketing Director, TechVibe", text: "From SEO optimization to AI-driven analytics, Adil delivered results that exceeded our expectations. Our organic traffic tripled in 4 months." },
];

const Testimonials = memo(() => (
  <section className="section-padding relative">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16"
      >
        <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-neon-emerald mb-3 font-body">Testimonials</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold neon-text shimmer-text">Client Feedback</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card-hover p-5 sm:p-8 relative"
          >
            <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-neon-gold/20 absolute top-4 sm:top-6 right-4 sm:right-6" />
            <div className="flex gap-1 mb-3 sm:mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-neon-gold text-neon-gold" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-6">"{t.text}"</p>
            <div>
              <p className="font-heading font-semibold text-sm sm:text-base text-foreground">{t.name}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

Testimonials.displayName = "Testimonials";
export default Testimonials;
