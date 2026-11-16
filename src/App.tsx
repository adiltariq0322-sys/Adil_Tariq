import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

// Heavy sub-pages load on demand so the homepage bundle stays small.
const AiSkinSpecialist = lazy(() => import("./pages/AiSkinSpecialist.tsx"));
const AdilGPT = lazy(() => import("./pages/AdilGPT.tsx"));
const NoirPantry = lazy(() => import("./pages/NoirPantry.tsx"));

const queryClient = new QueryClient();

const isMobile =
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

const App = () => (
  <MotionConfig
    reducedMotion={isMobile ? "always" : "user"}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ai-skin-specialist" element={<AiSkinSpecialist />} />
              <Route path="/adilgpt" element={<AdilGPT />} />
              <Route path="/noir-pantry" element={<NoirPantry />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
  </MotionConfig>
);

export default App;
