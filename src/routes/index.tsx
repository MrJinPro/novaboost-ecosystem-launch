import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { MythsSection } from "@/components/MythsSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { EcosystemSection } from "@/components/EcosystemSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { TeamSection } from "@/components/TeamSection";
import { CTASection } from "@/components/CTASection";
import { JoinModal } from "@/components/JoinModal";
import { FooterSection } from "@/components/FooterSection";

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
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onJoinClick={openModal} />
      <HeroSection onJoinClick={openModal} />
      <AboutSection />
      <MythsSection />
      <BenefitsSection />
      <EcosystemSection />
      <WhyUsSection />
      <TeamSection />
      <CTASection onJoinClick={openModal} />
      <FooterSection />
      <JoinModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
