"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code2, Trophy } from "lucide-react";

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    {
      icon: Brain,
      title: "Gemini-Powered Reviews",
      description:
        "Get an automated 'senior dev' on demand. Our Gemini-powered system gives you the brutally honest code review you've always wanted, 24/7.",
      color: "from-primary/20 to-primary/5",
    },
    {
      icon: Code2,
      title: "Real-World Scenarios",
      description:
        "No more 'two-sum' puzzles. Tackle problems you'd actually see on the job, from API log analysis to database migration.",
      color: "from-secondary/20 to-secondary/5",
    },
    {
      icon: Trophy,
      title: "Live 'Quality' Leaderboard",
      description:
        "It's not just about who's fastest. Compete for the #1 spot based on your 'Clean Code' score, as judged by our AI.",
      color: "from-primary/20 to-primary/5",
    },
  ];

  return (
    <section id="features" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 font-mono">
            Why The Crucible?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative flex flex-col p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="text-2xl font-semibold text-foreground mb-4 font-mono">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
