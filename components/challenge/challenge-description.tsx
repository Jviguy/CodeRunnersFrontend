import { type Challenge } from "@/lib/api";

interface ChallengeDescriptionProps {
  challenge: Challenge | null;
}

export function ChallengeDescription({ challenge }: ChallengeDescriptionProps) {
  if (!challenge) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8">
        <p className="text-muted-foreground">Loading challenge...</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 font-mono">
        {challenge.Title}
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4 font-mono">
          Description
        </h2>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {challenge.Description}
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-foreground mb-3 font-mono">
          Input Format
        </h3>
        <div className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-foreground font-mono whitespace-pre-wrap">
            {challenge.InputFormat}
          </pre>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4 font-mono">
          Output Requirements
        </h2>
        <div className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-foreground font-mono whitespace-pre-wrap">
            {challenge.OutputFormat}
          </pre>
        </div>
      </div>
    </div>
  );
}
