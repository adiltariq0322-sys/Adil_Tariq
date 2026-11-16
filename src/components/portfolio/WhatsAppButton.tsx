import { memo } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "923706710778";

const WhatsAppButton = memo(() => (
  <motion.a
    href={`https://wa.me/${WHATSAPP_NUMBER}`}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 2, type: "spring", stiffness: 200 }}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 flex items-center gap-2 rounded-lg px-4 py-3 sm:px-5 bg-card border border-border text-foreground shadow-elegant cursor-pointer min-h-[44px]"
    aria-label="Chat on WhatsApp"
  >
    <motion.div
      transition={{ duration: 0.2 }}
    >
      <MessageCircle size={20} className="text-secondary" />
    </motion.div>
    <span className="font-semibold text-xs sm:text-sm hidden sm:inline">Chat on WhatsApp</span>
  </motion.a>
));

WhatsAppButton.displayName = "WhatsAppButton";
export default WhatsAppButton;
