import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Mic, Video, MessageSquare, LayoutDashboard, FileText } from "lucide-react";
import { SkinShell } from "@/components/skin/SkinShell";
import { Hero } from "@/components/skin/Hero";
import { Features } from "@/components/skin/Features";
import { ImageAnalysisPanel } from "@/components/skin/ImageAnalysis";
import { VoiceConsultationPanel } from "@/components/skin/VoiceConsultation";
import { VideoAnalysisPanel } from "@/components/skin/VideoAnalysis";
import { ChatbotPanel } from "@/components/skin/Chatbot";
import { Dashboard } from "@/components/skin/Dashboard";
import { ReportDialog } from "@/components/skin/ReportDialog";
import type { ImageAnalysis } from "@/lib/skinApi";

const TABS = [
  { id: "image", label: "Image", icon: Camera },
  { id: "voice", label: "Voice", icon: Mic },
  { id: "video", label: "Video", icon: Video },
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
] as const;

type TabId = (typeof TABS)[number]["id"];

const AiSkinSpecialist = () => {
  const [tab, setTab] = useState<TabId>("image");
  const [reportOpen, setReportOpen] = useState(false);
  const [reportData, setReportData] = useState<ImageAnalysis | null>(null);
  const [reportImage, setReportImage] = useState("");
  const consultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "AI Skin Specialist — Voice, Image & Video Skin Consultation | Adil Tariq";
    const desc = document.querySelector('meta[name="description"]');
    const content =
      "AI-powered skin consultation assistant. Upload an image, record voice, or submit video for skin condition analysis with confidence scores and recommendations.";
    if (desc) desc.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  const scrollToConsult = () => consultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <SkinShell>
      <Hero onStart={scrollToConsult} onDemo={scrollToConsult} />
      <Features />

      <section ref={consultRef} className="mt-20 sm:mt-28 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">AI Consultation</h2>
          <p className="text-muted-foreground mt-3">Choose how you'd like to share your concern.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
                  active
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground border border-white/10 bg-white/[0.02]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tab === "image" && (
            <ImageAnalysisPanel
              onReport={(r, img) => {
                setReportData(r);
                setReportImage(img);
              }}
            />
          )}
          {tab === "voice" && <VoiceConsultationPanel />}
          {tab === "video" && <VideoAnalysisPanel />}
          {tab === "chat" && <ChatbotPanel />}
          {tab === "dashboard" && <Dashboard />}
        </motion.div>

        {reportData && tab === "image" && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setReportOpen(true)}
              className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              <FileText className="w-4 h-4" /> Generate Report
            </button>
          </div>
        )}
      </section>

      <ReportDialog
        open={reportOpen}
        onOpenChange={setReportOpen}
        result={reportData}
        image={reportImage}
      />
    </SkinShell>
  );
};

export default AiSkinSpecialist;
