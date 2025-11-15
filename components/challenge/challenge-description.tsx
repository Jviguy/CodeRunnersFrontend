export function ChallengeDescription() {
  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 font-mono">
        Challenge: The 1GB Log Analyzer
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4 font-mono">Story</h2>
        <p className="text-muted-foreground leading-relaxed">
          Your company's API is failing. Requests are timing out, users are complaining, and your monitoring dashboard is useless. 
          The only clue is a massive 1GB log file sitting on the production server. 
          Your job: parse through the chaos and find the patterns that will save the day.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4 font-mono">Task</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Your job is to parse the <code className="bg-muted px-2 py-1 rounded text-primary font-mono">input.log</code> file 
          and extract meaningful insights. The log contains millions of API requests with timestamps, endpoints, response codes, 
          and latencies.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          You need to identify:
        </p>
        <ul className="list-disc list-inside text-muted-foreground leading-relaxed mt-2 space-y-1">
          <li>The top 10 slowest endpoints</li>
          <li>Error rate by endpoint</li>
          <li>Peak traffic hours</li>
          <li>Average response time by hour</li>
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-foreground mb-3 font-mono">Input Format</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Each line in <code className="bg-muted px-2 py-1 rounded text-primary font-mono">input.log</code> follows this format:
        </p>
        <div className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-foreground font-mono">
{`2024-01-15 14:23:45 [INFO] GET /api/users/123 200 145ms
2024-01-15 14:23:46 [ERROR] POST /api/orders 500 3204ms
2024-01-15 14:23:47 [INFO] GET /api/products 200 89ms`}
          </pre>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4 font-mono">Output Requirements</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          You must generate an <code className="bg-muted px-2 py-1 rounded text-primary font-mono">output.json</code> file 
          with the following structure:
        </p>
        <div className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-foreground font-mono">
{`{
  "slowest_endpoints": [
    { "endpoint": "/api/orders", "avg_latency": 3204 },
    { "endpoint": "/api/users/search", "avg_latency": 2890 }
  ],
  "error_rates": {
    "/api/orders": 0.15,
    "/api/payments": 0.08
  },
  "peak_hours": [14, 15, 16],
  "avg_response_by_hour": {
    "00": 120,
    "01": 110,
    "14": 450
  }
}`}
          </pre>
        </div>
      </div>

      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Note:</strong> The log file is 1GB in size. 
          Your solution will be evaluated on both correctness and performance. 
          Optimize for speed and memory efficiency.
        </p>
      </div>
    </div>
  )
}
