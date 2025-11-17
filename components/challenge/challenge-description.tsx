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
      <div className="flex items-center justify-between mb-6">
        <span
          className={`inline-block px-4 py-2 rounded-full text-sm font-mono font-bold ${
            challenge.status === "Live"
              ? "bg-green-500/20 text-green-500"
              : challenge.status === "Upcoming"
                ? "bg-yellow-500/20 text-yellow-500"
                : "bg-red-500/20 text-red-500"
          }`}
        >
          {challenge.status === "Live" && "🔥 Live Now"}
          {challenge.status === "Upcoming" && "⏳ Coming Soon"}
          {challenge.status === "Ended" && "✅ Ended"}
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 font-mono">
        {challenge.title}
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4 font-mono">
          Challenge Prompt
        </h2>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {challenge.prompt}
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-foreground mb-3 font-mono">
          Input Data
        </h3>
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-3">
            Download the input file to start working on your solution:
          </p>
          <a
            href={challenge.input_file_url}
            download
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-mono text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Input File
          </a>
        </div>
      </div>
    </div>
  );
}
