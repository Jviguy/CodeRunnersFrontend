"use client";

import { useState } from "react";
import { Upload, X, FileCode, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitSolution, type SourceFile } from "@/lib/api";

interface SubmitCodeCardProps {
  userId: number;
}

export function SubmitCodeCard({ userId }: SubmitCodeCardProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
      setSubmitStatus("idle");
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
      setErrorMessage("Please select at least one file");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Read file contents
      const sourceFiles: SourceFile[] = await Promise.all(
        selectedFiles.map(async (file) => {
          const content = await file.text();
          return {
            Name: file.name,
            Code: content,
          };
        }),
      );

      // Submit to API
      const response = await submitSolution(userId, sourceFiles);
      console.log("[v0] Submission response:", response);

      setSubmitStatus("success");
      setSelectedFiles([]);

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("[v0] Submission error:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to submit solution",
      );
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-card border-2 border-primary/30 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-foreground mb-4 font-mono">
        Submit Your Code
      </h3>

      <div className="space-y-4">
        {/* File Upload Area */}
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            accept=".c,.cpp,.py,.js,.ts,.java,.go,.rs,.txt"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-foreground font-mono mb-1">
              Click to select files
            </p>
            <p className="text-xs text-muted-foreground font-sans">
              Choose your source code files
            </p>
          </label>
        </div>

        {/* Selected Files List */}
        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-sans mb-2">
              Selected files ({selectedFiles.length}):
            </p>
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-muted/30 border border-border rounded-lg p-3"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <FileCode className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-mono text-foreground truncate">
                    {file.name}
                  </span>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="ml-2 p-1 hover:bg-accent rounded transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || selectedFiles.length === 0}
          className="w-full font-mono"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Submitting...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Submit Solution
            </>
          )}
        </Button>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
            <p className="text-sm text-green-500 font-sans">
              Solution submitted successfully! Check the results page.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-500 font-sans">{errorMessage}</p>
          </div>
        )}

        <p className="text-xs text-muted-foreground font-sans">
          Tip: You can also use the CLI to submit your solution with `crucible
          submit`
        </p>
      </div>
    </div>
  );
}
