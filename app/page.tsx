"use client";
import { useState, useEffect } from "react";
import Hero from "@/components/home/hero";
import Features from "@/components/features";
import { StickyFooter } from "@/components/sticky-footer";
import { HowItWorks } from "@/components/how-it-works";
import { ExampleChallenges } from "@/components/example-challenges";
import { FinalCTA } from "@/components/final-cta";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "system");
    root.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileNavClick = (elementId: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        const headerOffset = 120;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen w-full relative bg-black">
      {/* Pearl Mist Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #000000",
        }}
      />

      <SiteHeader />

      {/* Hero Section */}
      <Hero />

      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* Features Section */}
      <div id="features">
        <Features />
      </div>

      <div id="challenges">
        <ExampleChallenges />
      </div>

      <div className="pb-96">
        <FinalCTA />
      </div>

      {/* Sticky Footer */}
      <StickyFooter />
    </div>
  );
}
