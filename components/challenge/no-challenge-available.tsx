import { motion } from "framer-motion";
import { Frown } from "lucide-react";
import Link from "next/link";

export function NoChallengeAvailable() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center"
      >
        <div className="bg-card border border-border rounded-3xl p-12">
          <Frown className="w-16 h-16 text-muted-foreground mx-auto mb-6" />

          <h1 className="text-4xl font-bold text-foreground mb-4 font-mono">
            No Challenge Available
          </h1>

          <p className="text-lg text-muted-foreground mb-8 font-sans leading-relaxed">
            There's currently no active challenge running. New challenges are
            posted regularly, so check back soon to test your skills!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground font-mono font-bold rounded-full hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </Link>

            <button
              onClick={() => window.location.reload()}
              className="inline-block px-8 py-3 bg-card border border-border text-foreground font-mono font-bold rounded-full hover:bg-accent transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
