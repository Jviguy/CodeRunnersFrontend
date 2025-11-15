"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2 } from "lucide-react";

export function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6">
              <Code2 className="w-10 h-10 text-primary" />
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 text-balance font-mono">
            Ready for a <em className="italic text-primary">Real</em> Code
            Review?
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop wondering if your code is good enough. Get instant feedback
            from our AI-powered senior developer.
          </p>

          <motion.a
            href="/start"
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <Code2 className="w-6 h-6" />
            Test Your Ego
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
