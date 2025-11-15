"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Upload, Sparkles } from "lucide-react";

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const steps = [
    {
      number: "1",
      title: "Get Challenge",
      description:
        "Download a real-world scenario, like parsing a massive log file or refactoring a legacy script.",
      icon: Download,
    },
    {
      number: "2",
      title: "Submit Code",
      description:
        "Pass the automated checks, then submit your source code for review.",
      icon: Upload,
    },
    {
      number: "3",
      title: "Get Your 'Ego Check'",
      description:
        "Our Gemini-powered senior dev 'roasts' your code, giving you an instant, detailed review on readability, scalability, and maintainability.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 font-mono">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A simple 3-step process to test and improve your code quality
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="absolute top-4 left-4 text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                {step.number}
              </div>

              <div className="relative z-10 mb-6 mt-8">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-foreground mb-4 font-mono">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary/50"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
