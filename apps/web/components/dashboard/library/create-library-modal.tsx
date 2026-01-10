"use client";

import * as React from "react";
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

interface CreateLibraryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateLibrary: (name: string) => void;
}

export function CreateLibraryModal({
  open,
  onOpenChange,
  onCreateLibrary,
}: CreateLibraryModalProps) {
  const [libraryName, setLibraryName] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (open) {
      setLibraryName("");
      setError(null);
    }
  }, [open]);

  const handleCreate = () => {
    // Validate library name
    if (!libraryName.trim()) {
      setError("Library name is required");
      return;
    }

    // Create library
    onCreateLibrary(libraryName.trim());

    // Close modal
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreate();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Library</DialogTitle>
          <DialogDescription>
            Create a library to organize and save your prompts
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="library-name">Library Name</Label>
            <Input
              id="library-name"
              value={libraryName}
              onChange={(e) => {
                setLibraryName(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="My Awesome Prompts"
              aria-invalid={!!error}
              autoFocus
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>New Library</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
