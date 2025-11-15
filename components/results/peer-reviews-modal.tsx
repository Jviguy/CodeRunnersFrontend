"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Star, User } from "lucide-react";

interface PeerReview {
  id: string;
  reviewer: string;
  rating: number;
  comment: string;
  timestamp: string;
}

interface PeerReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

export function PeerReviewsModal({
  isOpen,
  onClose,
  username,
}: PeerReviewsModalProps) {
  // Mock data - in production this would come from an API
  const mockReviews: PeerReview[] = [
    {
      id: "1",
      reviewer: "Anonymous Dev #1",
      rating: 4,
      comment:
        "Clean solution! The logic is solid and easy to follow. Could optimize the loop slightly, but overall well done.",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      reviewer: "Anonymous Dev #2",
      rating: 3,
      comment:
        "Works, but you're over-engineering this. The nested conditionals are unnecessary and hurt readability.",
      timestamp: "4 hours ago",
    },
    {
      id: "3",
      reviewer: "Anonymous Dev #3",
      rating: 5,
      comment:
        "Excellent work! Great variable naming, efficient algorithm, and well-structured code. This is how it should be done.",
      timestamp: "5 hours ago",
    },
    {
      id: "4",
      reviewer: "Anonymous Dev #4",
      rating: 2,
      comment:
        "Too verbose. You could achieve the same result with half the code. Also missing edge case handling.",
      timestamp: "6 hours ago",
    },
    {
      id: "5",
      reviewer: "Anonymous Dev #5",
      rating: 4,
      comment:
        "Nice approach! I like how you handled the frequency counting. Minor improvement: consider using Map instead of object.",
      timestamp: "7 hours ago",
    },
  ];

  const averageRating =
    mockReviews.reduce((sum, review) => sum + review.rating, 0) /
    mockReviews.length;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-primary text-primary"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-mono text-primary">
            Peer Reviews for {username}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Rating */}
          <Card className="bg-card border-primary/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-mono font-semibold text-foreground mb-2">
                  Overall Peer Rating
                </h3>
                <p className="text-sm font-sans text-muted-foreground">
                  Based on {mockReviews.length} peer reviews
                </p>
              </div>
              <div className="flex items-center gap-3">
                {renderStars(Math.round(averageRating))}
                <span className="font-mono text-3xl font-bold text-primary">
                  {averageRating.toFixed(1)}/5
                </span>
              </div>
            </div>
          </Card>

          {/* Reviews List */}
          <div className="space-y-3">
            <h3 className="text-lg font-mono font-semibold text-foreground">
              All Reviews ({mockReviews.length})
            </h3>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <Card key={review.id} className="bg-card border-border p-4">
                    <div className="space-y-3">
                      {/* Reviewer Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <User className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-mono text-sm font-semibold text-foreground">
                              {review.reviewer}
                            </p>
                            <p className="text-xs font-sans text-muted-foreground">
                              {review.timestamp}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {renderStars(review.rating)}
                          <span className="font-mono text-sm font-semibold text-foreground">
                            {review.rating}/5
                          </span>
                        </div>
                      </div>

                      {/* Review Comment */}
                      {review.comment && (
                        <p className="font-sans text-sm leading-relaxed text-muted-foreground pl-10">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
