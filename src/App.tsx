import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
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
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));

const queryClient = new QueryClient();

// Scroll to the element matching the URL hash after a route change (e.g.
// navbar link from /blog to /#services), or to the top when the new route
// has no hash. Without this, a hash link from another route lands on the
// homepage but never scrolls to the section. The homepage sections are
// lazy-loaded, so retry briefly until the target is mounted.
function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = hash.slice(1);
    let attempts = 0;
    let timer: number | undefined;
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      attempts += 1;
      if (attempts < 12) timer = window.setTimeout(attempt, 200);
    };
    timer = window.setTimeout(attempt, 100);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}

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
          <ScrollToHash />
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ai-skin-specialist" element={<AiSkinSpecialist />} />
              <Route path="/adilgpt" element={<AdilGPT />} />
              <Route path="/noir-pantry" element={<NoirPantry />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
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
