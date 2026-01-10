"use client";

import * as React from "react";
import { FileQuestion, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LibraryEmptyState() {
  const handleCreateClick = () => {
    console.log("Navigate to prompt builder");
  };

  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <FileQuestion className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">No prompts yet</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You haven&apos;t created any prompts yet. Start by creating your first
          structured prompt.
        </p>
        <Button onClick={handleCreateClick}>
          <Plus className="mr-2 h-4 w-4" />
          Create your first prompt
        </Button>
      </div>
    </div>
  );
}
