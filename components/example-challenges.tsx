"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Database, Cog } from "lucide-react";

export function ExampleChallenges() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const challenges = [
    {
      title: "The 1GB Log Analyzer",
      description:
        "Parse and analyze a massive server log file efficiently. Test your skills in data processing, memory optimization, and performance.",
      icon: FileText,
      difficulty: "Intermediate",
      time: "2-3 hours",
    },
    {
      title: "The Legacy DB Migrator",
      description:
        "Migrate a legacy database schema to a modern structure while maintaining data integrity. Real-world refactoring at its finest.",
      icon: Database,
      difficulty: "Advanced",
      time: "3-4 hours",
    },
    {
      title: "The Factory Simulator",
      description:
        "Build a factory simulation system with proper design patterns. Show off your OOP skills and architectural thinking.",
      icon: Cog,
      difficulty: "Intermediate",
      time: "2-3 hours",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-accent/20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 font-mono">
            Ditch the Puzzles. Solve Real Problems.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our challenges are based on actual problems developers face in
            production
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative flex flex-col p-8 rounded-2xl border border-border bg-card backdrop-blur-sm hover:border-primary transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <challenge.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              <h3 className="text-2xl font-semibold text-foreground mb-3 font-mono">
                {challenge.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                {challenge.description}
              </p>

              <div className="flex items-center justify-between text-sm pt-4 border-t border-border/50">
                <span className="text-primary font-medium">
                  {challenge.difficulty}
                </span>
                <span className="text-muted-foreground">{challenge.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
