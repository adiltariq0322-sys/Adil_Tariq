import { useState, memo } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Mail, MapPin, Loader2, Phone, Linkedin, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_NUMBER = "923706710778";

type FormFields = "name" | "email" | "subject" | "message";

const Contact = memo(() => {
  const [focused, setFocused] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<FormFields, string>>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const { name, email, subject, message } = formData;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return false;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.trim())) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      if (!supabase) {
        toast({
          title: "Couldn't send message",
          description: "The contact service isn't set up on this site yet. Please reach out on WhatsApp.",
          variant: "destructive",
        });
        return;
      }
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        },
      });

      if (error || (data as any)?.error) {
        throw new Error(error?.message || (data as any)?.error || "Failed to send");
      }

      toast({ title: "✅ Thank you! I'll reply within 24 hours.", description: "Your message is on its way to Hafiz Adil." });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setFocused(null);
      setSent(true);
      setTimeout(() => setSent(false), 6000);
    } catch (err) {
      console.error("Contact form error:", err);
      toast({
        title: "Couldn't send message",
        description: "Please try again or reach out on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: FormFields, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFocusedOrFilled = (field: FormFields) =>
    focused === field || formData[field]?.length > 0;

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-neon-emerald mb-3 font-body">Get In Touch</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold neon-text shimmer-text">Let's Work Together</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 sm:space-y-8"
          >
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
              Ready to bring AI-powered intelligence to your business? Let's discuss how I can help
              automate your workflows, build intelligent systems, and drive measurable results.
            </p>

            <div className="space-y-3 sm:space-y-4">
              {[
                { icon: Mail, label: "adiltariq0327@gmail.com", href: "mailto:adiltariq0327@gmail.com" },
                { icon: Phone, label: "03706710778", href: "tel:+923706710778" },
                { icon: Linkedin, label: "LinkedIn Profile", href: "https://www.linkedin.com/in/innovex-marketing-41bb13392/" },
                { icon: MessageCircle, label: "WhatsApp Available", href: `https://wa.me/${WHATSAPP_NUMBER}` },
                { icon: MapPin, label: "Available Worldwide", href: undefined },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-neon-emerald" />
                  </div>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-xs sm:text-sm text-muted-foreground">{item.label}</span>
                  )}
                </div>
              ))}
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon inline-flex items-center gap-2 pulse-glow text-sm sm:text-base"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5"
            onSubmit={handleSubmit}
          >
            {sent && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-neon-emerald/10 border border-neon-emerald/30">
                <CheckCircle2 className="w-5 h-5 text-neon-emerald shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Thank you! I'll reply within 24 hours.</p>
                  <p className="text-xs text-muted-foreground">Your message has been delivered to Hafiz Adil.</p>
                </div>
              </div>
            )}

            {(["name", "email", "subject", "message"] as const).map((field) => (
              <div key={field} className="relative">
                <label
                  className={`absolute left-3 sm:left-4 transition-all duration-300 text-xs sm:text-sm pointer-events-none z-10 ${
                    isFocusedOrFilled(field)
                      ? "-top-2.5 text-[10px] sm:text-xs text-neon-emerald bg-card px-1.5 sm:px-2"
                      : "top-3 text-muted-foreground"
                  }`}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field === "message" ? (
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    maxLength={5000}
                    className="w-full bg-transparent border border-border rounded-lg px-3 sm:px-4 py-3 text-xs sm:text-sm text-foreground focus:border-neon-emerald focus:outline-none transition-colors duration-300 resize-none"
                  />
                ) : (
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={formData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused(null)}
                    maxLength={field === "email" ? 255 : field === "subject" ? 200 : 100}
                    className="w-full bg-transparent border border-border rounded-lg px-3 sm:px-4 py-3 text-xs sm:text-sm text-foreground focus:border-neon-emerald focus:outline-none transition-colors duration-300"
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-neon w-full flex items-center justify-center gap-2 disabled:opacity-50 text-sm sm:text-base min-h-[44px]"
            >
              {isSubmitting ? (
                <><Loader2 size={16} className="animate-spin" /> Sending...</>
              ) : (
                <>Send Message <Send size={16} /></>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";
export default Contact;
