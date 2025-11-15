"use client";

import { useRouter } from "next/navigation";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function NextStepsCard() {
  const router = useRouter();

  return (
    <div className="text-center">
      <Card className="p-8 border-primary/50">
        <Terminal className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="font-mono text-xl font-bold mb-2">
          Ready to Start Hacking?
        </h3>
        <p className="font-sans text-muted-foreground mb-6">
          Once installed, head back to the challenges page to join the live
          competition!
        </p>
        <Button
          size="lg"
          onClick={() => router.push("/challenges")}
          className="font-mono"
        >
          View Live Challenges
        </Button>
      </Card>
    </div>
  );
}
