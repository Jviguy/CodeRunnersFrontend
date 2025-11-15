"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LeaderboardEntry {
  rank: number;
  username: string;
  time?: string;
  geminiScore?: number;
  peerRating: number;
  code: string;
}

interface ReviewCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: LeaderboardEntry | null;
}

export function ReviewCodeModal({
  isOpen,
  onClose,
  user,
}: ReviewCodeModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    // In production, this would submit to an API
    toast({
      title: "Review Submitted",
      description: `Your ${rating}-star review for ${user?.username} has been recorded.`,
    });

    // Reset form and close
    setRating(0);
    setHoveredRating(0);
    setComment("");
    onClose();
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-mono text-primary">
            Reviewing {user.username}&apos;s Code
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto pr-2">
          {/* Code Viewer */}
          <div className="space-y-3">
            <h3 className="text-lg font-mono font-semibold text-foreground">
              Submitted Code
            </h3>
            <ScrollArea className="h-[300px] rounded-lg border border-border bg-muted/30">
              <pre className="p-4 font-mono text-sm text-foreground">
                <code>{user.code}</code>
              </pre>
            </ScrollArea>
          </div>

          {/* Review Form */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-lg font-mono font-semibold text-foreground">
              Leave Your Anonymous Review
            </h3>

            {/* Star Rating */}
            <div className="space-y-2">
              <label className="text-sm font-sans text-muted-foreground">
                Rate this code (1-5 stars):
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoveredRating || rating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Textarea */}
            <div className="space-y-2">
              <label className="text-sm font-sans text-muted-foreground">
                Your feedback (optional):
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Be honest, but helpful..."
                className="min-h-[120px] font-sans resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={onClose} className="font-mono">
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="font-mono">
                Submit Review
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
