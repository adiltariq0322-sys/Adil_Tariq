import { lazy, Suspense } from "react";
import CustomCursor from "@/components/portfolio/CustomCursor";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import WhatsAppButton from "@/components/portfolio/WhatsAppButton";
import SectionDivider from "@/components/portfolio/SectionDivider";
import TechMarquee from "@/components/portfolio/TechMarquee";

// Lazy load below-the-fold sections
const AIChatbot = lazy(() => import("@/components/portfolio/AIChatbot"));
const About = lazy(() => import("@/components/portfolio/About"));
const Services = lazy(() => import("@/components/portfolio/Services"));
const AllProjects = lazy(() => import("@/components/portfolio/AllProjects"));
const Skills = lazy(() => import("@/components/portfolio/Skills"));
const Testimonials = lazy(() => import("@/components/portfolio/Testimonials"));
const FAQ = lazy(() => import("@/components/portfolio/FAQ"));
const Contact = lazy(() => import("@/components/portfolio/Contact"));
const Footer = lazy(() => import("@/components/portfolio/Footer"));
const ParallaxSection = lazy(() => import("@/components/portfolio/ParallaxSection"));
const SectionReveal = lazy(() => import("@/components/portfolio/SectionReveal"));

const SectionFallback = () => <div className="min-h-[200px]" />;

const Index = () => (
  <div className="gradient-bg-animated min-h-screen relative md:cursor-none">
    <ScrollProgress />
    <CustomCursor />
    <Navbar />
    <main className="relative z-10">
      <Hero />
      <TechMarquee />

      <Suspense fallback={<SectionFallback />}>
        <SectionDivider />
        <SectionReveal variant="blur">
          <ParallaxSection speed={0.15}>
            <About />
          </ParallaxSection>
        </SectionReveal>

        <SectionDivider />
        <SectionReveal variant="scale">
          <Services />
        </SectionReveal>

        <SectionDivider />
        <SectionReveal variant="fade-up">
          <ParallaxSection speed={0.15}>
            <AllProjects />
          </ParallaxSection>
        </SectionReveal>

        <SectionDivider />
        <SectionReveal variant="slide-left">
          <Skills />
        </SectionReveal>

        <SectionDivider />
        <SectionReveal variant="slide-right">
          <ParallaxSection speed={0.1}>
            <Testimonials />
          </ParallaxSection>
        </SectionReveal>

        <SectionDivider />
        <SectionReveal variant="blur">
          <FAQ />
        </SectionReveal>

        <SectionDivider />
        <SectionReveal variant="blur">
          <Contact />
        </SectionReveal>

        <Footer />
      </Suspense>
    </main>
    <WhatsAppButton />
    <Suspense fallback={null}>
      <AIChatbot />
    </Suspense>
  </div>
);

export default Index;
