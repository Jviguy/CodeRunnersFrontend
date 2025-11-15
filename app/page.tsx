// app/page.tsx
import Hero from "@/components/home/hero";
import Features from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { ExampleChallenges } from "@/components/example-challenges";
import { FinalCTA } from "@/components/final-cta";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
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
    </>
  );
}