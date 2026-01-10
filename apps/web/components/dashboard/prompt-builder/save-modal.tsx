"use client";

import * as React from "react";
import { X, Folder } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SavePromptData, Library } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SaveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: SavePromptData) => void;
  libraries: Library[];
  defaultContent?: string;
}

export function SaveModal({
  open,
  onOpenChange,
  onSave,
  libraries,
  defaultContent = "",
}: SaveModalProps) {
  const [title, setTitle] = React.useState("");
  const [selectedLibraryIds, setSelectedLibraryIds] = React.useState<string[]>(
    [],
  );
  const [tagInput, setTagInput] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  // Auto-generate title from content
  React.useEffect(() => {
    if (open && defaultContent && !title) {
      const firstLine = defaultContent.split("\n")[0];
      const truncated = firstLine.slice(0, 100);
      setTitle(truncated);
    }
  }, [open, defaultContent, title]);

  // Reset state when modal opens
  React.useEffect(() => {
    if (open) {
      setTitle("");
      setSelectedLibraryIds([]);
      setTagInput("");
      setTags([]);
      setError(null);
    }
  }, [open]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/,/g, "");
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleToggleLibrary = (libraryId: string) => {
    setSelectedLibraryIds((prev) =>
      prev.includes(libraryId)
        ? prev.filter((id) => id !== libraryId)
        : [...prev, libraryId],
    );
  };

  const handleSave = () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (selectedLibraryIds.length === 0) {
      setError("Please select at least one library");
      return;
    }

    const data: SavePromptData = {
      title: title.trim(),
      folderId: null,
      libraryIds: selectedLibraryIds,
      tags,
    };

    onSave(data);
    onOpenChange(false);
  };

  const charCount = title.length;
  const maxChars = 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Save Prompt</DialogTitle>
          <DialogDescription>
            Save your prompt to one or more libraries for easy access later.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Title Field */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="title">Prompt Title</Label>
              <span
                className={cn(
                  "text-xs",
                  charCount > maxChars
                    ? "text-destructive"
                    : "text-muted-foreground",
                )}
              >
                {charCount}/{maxChars}
              </span>
            </div>
            <Input
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g., Generate shadCN UI template"
              aria-invalid={!!error}
              maxLength={maxChars}
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>

          {/* Libraries Selection */}
          <div className="grid gap-2">
            <Label>Libraries</Label>
            {libraries.length === 0 ? (
              <div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
                No libraries yet. Create one from the sidebar.
              </div>
            ) : (
              <div className="space-y-2 max-h-50 overflow-y-auto rounded-lg border p-3">
                {libraries.map((library) => (
                  <div
                    key={library.id}
                    className={cn(
                      "flex items-center space-x-3 rounded-md p-2 transition-colors cursor-pointer hover:bg-muted",
                      selectedLibraryIds.includes(library.id) &&
                        "bg-primary/5 border border-primary/20",
                    )}
                    onClick={() => handleToggleLibrary(library.id)}
                  >
                    <input
                      type="checkbox"
                      id={`library-${library.id}`}
                      checked={selectedLibraryIds.includes(library.id)}
                      onChange={() => handleToggleLibrary(library.id)}
                      onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      className="h-4 w-4 rounded border-primary text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    />
                    <div className="flex-1 flex items-center gap-2">
                      <Folder className="h-4 w-4 text-muted-foreground" />
                      <label
                        htmlFor={`library-${library.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {library.name}
                      </label>
                      <span className="text-xs text-muted-foreground">
                        {library.prompts.length}{" "}
                        {library.prompts.length === 1 ? "prompt" : "prompts"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {selectedLibraryIds.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {selectedLibraryIds.length}{" "}
                {selectedLibraryIds.length === 1 ? "library" : "libraries"}{" "}
                selected
              </p>
            )}
          </div>

          {/* Tags Field */}
          <div className="grid gap-2">
            <Label htmlFor="tags">Tags (Optional)</Label>
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type tag and press Enter"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-2 py-0.5">
                    {tag}
                    <button
                      className="ml-1 hover:text-destructive focus:outline-hidden"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {tag}</span>
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={libraries.length === 0}>
            Save Prompt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
