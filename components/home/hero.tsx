"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Code2 } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10 flex-1 flex flex-col">
          <div className="mx-auto max-w-4xl text-center flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Badge
                variant="secondary"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm"
              >
                <Code2 className="h-4 w-4" />
                Gemini-Powered Code Reviews
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <h1
                id="main-title"
                className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance font-mono"
              >
                Your Code Works. But Is It{" "}
                <em className="italic text-primary">Good</em>?
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground text-balance leading-relaxed"
            >
              Stop solving abstract puzzles. The Crucible gives you real-world
              coding scenarios and uses Gemini for an instant, brutally honest
              'ego check' on your code quality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="flex items-center justify-center">
                <Link href="/challenges">
                  <div className="group cursor-pointer border border-border bg-card gap-2 h-[60px] flex items-center p-[10px] rounded-full hover:border-primary/50 transition-all">
                    <div className="border border-border bg-primary h-[40px] rounded-full flex items-center justify-center text-primary-foreground group-hover:bg-primary/90 transition-all">
                      <p className="font-medium tracking-tight mr-3 ml-3 flex items-center gap-2 justify-center text-base">
                        <Code2 className="h-5 w-5" />
                        Start Your First Challenge
                      </p>
                    </div>
                    <div className="text-muted-foreground group-hover:ml-4 ease-in-out transition-all size-[24px] flex items-center justify-center rounded-full border-2 border-border">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right group-hover:rotate-180 ease-in-out transition-all"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-auto pb-8"
          >
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-6">
                Powered by cutting-edge AI
              </p>
              <div className="flex items-center justify-center gap-8 flex-wrap">
                {/* Google Gemini */}
                <div className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                  <div className="text-foreground text-2xl font-bold">
                    Gemini
                  </div>
                </div>

                {/* Code Quality Badge */}
                <div className="opacity-60 hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <Code2 className="h-8 w-8 text-foreground" />
                    <span className="text-foreground font-semibold">
                      Clean Code
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
