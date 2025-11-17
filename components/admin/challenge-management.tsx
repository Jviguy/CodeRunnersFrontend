"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Clock,
  FileText,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAllChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  type ChallengeFormData,
} from "@/lib/api";

interface ChallengeListItem {
  id: string;
  title: string;
  status: "Live" | "Ended" | "Scheduled";
  starts_at: string;
  ends_at: string;
  submissions: number;
}

export function ChallengeManagement() {
  const [challenges, setChallenges] = useState<ChallengeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingChallenge, setEditingChallenge] =
    useState<ChallengeListItem | null>(null);

  useEffect(() => {
    loadChallenges();
  }, []);

  async function loadChallenges() {
    try {
      const data = await getAllChallenges();
      setChallenges(data);
    } catch (error) {
      console.error("Failed to load challenges:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCreateNew() {
    setEditingChallenge(null);
    setIsDialogOpen(true);
  }

  function handleEdit(challenge: ChallengeListItem) {
    setEditingChallenge(challenge);
    setIsDialogOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this challenge?")) return;

    try {
      await deleteChallenge(id);
      await loadChallenges();
    } catch (error) {
      console.error("Failed to delete challenge:", error);
    }
  }

  async function handleSave(data: ChallengeFormData) {
    try {
      if (editingChallenge) {
        await updateChallenge(editingChallenge.id, data);
      } else {
        await createChallenge(data);
      }
      setIsDialogOpen(false);
      await loadChallenges();
    } catch (error) {
      console.error("Failed to save challenge:", error);
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Challenge Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-2xl">Challenge Management</CardTitle>
            <CardDescription>
              Create and manage coding challenges
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleCreateNew} className="gap-2">
                <Plus className="w-4 h-4" />
                New Challenge
              </Button>
            </DialogTrigger>
            <ChallengeDialog
              challenge={editingChallenge}
              onSave={handleSave}
              onCancel={() => setIsDialogOpen(false)}
            />
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Starts</TableHead>
                <TableHead>Ends</TableHead>
                <TableHead className="text-right">Submissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {challenges.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-8"
                  >
                    No challenges found. Create your first challenge to get
                    started.
                  </TableCell>
                </TableRow>
              ) : (
                challenges.map((challenge) => (
                  <TableRow key={challenge.id}>
                    <TableCell className="font-medium">
                      {challenge.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          challenge.status === "Live"
                            ? "default"
                            : challenge.status === "Scheduled"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {challenge.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(challenge.starts_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(challenge.ends_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {challenge.submissions}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(challenge)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(challenge.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function ChallengeDialog({
  challenge,
  onSave,
  onCancel,
}: {
  challenge: ChallengeListItem | null;
  onSave: (data: ChallengeFormData) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<ChallengeFormData>({
    title: challenge?.title || "",
    prompt: "",
    input_file_url: "",
    starts_at: challenge?.starts_at || "",
    ends_at: challenge?.ends_at || "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(formData);
  }

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {challenge ? "Edit Challenge" : "Create New Challenge"}
        </DialogTitle>
        <DialogDescription>
          {challenge
            ? "Update the challenge details below"
            : "Fill in the details to create a new coding challenge"}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Challenge Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="e.g., Binary Search Tree Implementation"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prompt">Challenge Prompt</Label>
          <Textarea
            id="prompt"
            value={formData.prompt}
            onChange={(e) =>
              setFormData({ ...formData, prompt: e.target.value })
            }
            placeholder="Describe the challenge requirements..."
            rows={8}
            required
          />
          <p className="text-xs text-muted-foreground">
            Supports Markdown formatting
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="input_file">Input File URL</Label>
          <Input
            id="input_file"
            value={formData.input_file_url}
            onChange={(e) =>
              setFormData({ ...formData, input_file_url: e.target.value })
            }
            placeholder="https://example.com/input.txt"
            required
          />
          <p className="text-xs text-muted-foreground">
            URL to download the challenge input file
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="starts_at">Start Date & Time</Label>
            <Input
              id="starts_at"
              type="datetime-local"
              value={formData.starts_at}
              onChange={(e) =>
                setFormData({ ...formData, starts_at: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ends_at">End Date & Time</Label>
            <Input
              id="ends_at"
              type="datetime-local"
              value={formData.ends_at}
              onChange={(e) =>
                setFormData({ ...formData, ends_at: e.target.value })
              }
              required
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {challenge ? "Update Challenge" : "Create Challenge"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
