import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import JourneySection from "@/components/JourneySection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import ThemeToggle from "@/components/ThemeToggle";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import { EntryExperience } from "@/components/entry/EntryExperience";

const Index = () => {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    // Force scroll to top on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {!hasEntered && <EntryExperience onComplete={() => setHasEntered(true)} />}
      <div className={`min-h-screen bg-background overflow-x-hidden ${!hasEntered ? "hidden h-screen overflow-hidden" : ""}`}>
        <CustomCursor />
        <ParticleBackground />
        <Navbar />
        <HeroSection />
        <JourneySection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />
        <ThemeToggle />
      </div>
    </>
  );
};

export default Index;
