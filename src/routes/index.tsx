import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TrustSection } from "@/components/TrustSection";
import { AboutSection } from "@/components/AboutSection";
import { ForWhomSection } from "@/components/ForWhomSection";
import { MythsSection } from "@/components/MythsSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { EcosystemSection } from "@/components/EcosystemSection";
import { ResultsSection } from "@/components/ResultsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { TeamSection } from "@/components/TeamSection";
import { JoinSection } from "@/components/JoinSection";
import { LegalSection } from "@/components/LegalSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { FooterSection } from "@/components/FooterSection";
import { saveVisit } from "@/lib/storage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NovaBoost — Экосистема роста TikTok LIVE стримеров" },
      { name: "description", content: "NovaBoost — экосистема нового поколения для TikTok LIVE стримеров. Обучение, инструменты, поддержка и рост." },
      { property: "og:title", content: "NovaBoost — Экосистема роста TikTok LIVE стримеров" },
      { property: "og:description", content: "Мы не просто агентство. Мы создаём экосистему роста." },
    ],
  }),
  component: Index,
});

function Index() {
  const scrollToJoin = () => {
    document.getElementById("join")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    saveVisit({
      path: window.location.pathname,
      referrer: document.referrer || "direct",
      userAgent: window.navigator.userAgent,
      language: window.navigator.language,
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onJoinClick={scrollToJoin} />
      <HeroSection onJoinClick={scrollToJoin} />
      <TrustSection />
      <AboutSection />
      <ForWhomSection />
      <MythsSection />
      <BenefitsSection />
      <EcosystemSection />
      <ResultsSection />
      <TestimonialsSection />
      <WhyUsSection />
      <TeamSection />
      <JoinSection />
      <LegalSection />
      <FAQSection />
      <CTASection onJoinClick={scrollToJoin} />
      <FooterSection />
    </div>
  );
}
