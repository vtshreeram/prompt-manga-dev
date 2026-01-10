"use client";

import * as React from "react";
import { Search, ArrowLeft, Crown, FolderOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ContextItem {
  id: string;
  title: string;
  content: string;
}

interface ContextManagerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeContext: ContextItem | null;
  onSelectContext: (context: ContextItem | null) => void;
  savedContexts: ContextItem[];
  onSaveContext: (context: Omit<ContextItem, "id">) => void;
}

type ViewMode = "list" | "create";

export function ContextManagerModal({
  open,
  onOpenChange,
  activeContext,
  onSelectContext,
  savedContexts,
  onSaveContext,
}: ContextManagerModalProps) {
  const [viewMode, setViewMode] = React.useState<ViewMode>("list");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [newContextTitle, setNewContextTitle] = React.useState("");
  const [newContextContent, setNewContextContent] = React.useState("");
  const [titleError, setTitleError] = React.useState<string | null>(null);
  const [contentError, setContentError] = React.useState<string | null>(null);

  // Reset state when modal opens
  React.useEffect(() => {
    if (open) {
      setViewMode("list");
      setSearchQuery("");
      setNewContextTitle("");
      setNewContextContent("");
      setTitleError(null);
      setContentError(null);
    }
  }, [open]);

  // Filter contexts based on search query
  const filteredContexts = React.useMemo(() => {
    if (!searchQuery.trim()) return savedContexts;
    const query = searchQuery.toLowerCase();
    return savedContexts.filter(
      (context) =>
        context.title.toLowerCase().includes(query) ||
        context.content.toLowerCase().includes(query),
    );
  }, [savedContexts, searchQuery]);

  const handleSelectContext = (context: ContextItem) => {
    onSelectContext(context);
    onOpenChange(false);
  };

  const handleCreateNew = () => {
    setViewMode("create");
    setNewContextTitle("");
    setNewContextContent("");
    setTitleError(null);
    setContentError(null);
  };

  const handleBackToList = () => {
    setViewMode("list");
    setNewContextTitle("");
    setNewContextContent("");
    setTitleError(null);
    setContentError(null);
  };

  const handleSaveNewContext = () => {
    let hasError = false;

    // Validate title
    if (!newContextTitle.trim()) {
      setTitleError("Context name is required");
      hasError = true;
    } else {
      setTitleError(null);
    }

    // Validate content
    if (!newContextContent.trim()) {
      setContentError("Context instructions are required");
      hasError = true;
    } else {
      setContentError(null);
    }

    if (hasError) return;

    // Save the new context
    const newContext = {
      title: newContextTitle.trim(),
      content: newContextContent.trim(),
    };

    onSaveContext(newContext);

    // Reset form and return to list view (don't close modal)
    // User can then select the newly created context if they want
    setViewMode("list");
    setNewContextTitle("");
    setNewContextContent("");
    // DO NOT close modal - let user explicitly select context or close via X/Cancel
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-135 max-h-[80vh] p-0 gap-0">
        {viewMode === "list" ? (
          <>
            {/* Header */}
            <DialogHeader className="p-6 pb-4 border-b">
              <DialogTitle className="text-lg font-semibold">
                Select Active Context
              </DialogTitle>
            </DialogHeader>

            {/* Search */}
            <div className="px-6 pt-4 pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search contexts..."
                  className="pl-9"
                />
              </div>
            </div>

            {/* Context List */}
            <div className="flex-1 overflow-y-auto px-6 pb-4 max-h-80">
              {filteredContexts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FolderOpen className="h-12 w-12 text-muted-foreground/30 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    {searchQuery
                      ? "No contexts found"
                      : "No contexts yet. Create your first one!"}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredContexts.map((context) => {
                    const isActive = activeContext?.id === context.id;
                    return (
                      <button
                        key={context.id}
                        onClick={() => handleSelectContext(context)}
                        className={cn(
                          "w-full text-left p-4 rounded-lg border transition-all hover:border-primary/50 hover:bg-accent/50 group",
                          isActive
                            ? "border-primary bg-primary/5"
                            : "border-border",
                        )}
                      >
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div
                            className={cn(
                              "shrink-0 mt-0.5",
                              isActive
                                ? "text-primary"
                                : "text-muted-foreground",
                            )}
                          >
                            <Crown className="h-5 w-5" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm mb-1">
                              {context.title}
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-2">
                              {context.content}
                            </div>
                          </div>

                          {/* Radio indicator */}
                          <div className="shrink-0 mt-1">
                            <div
                              className={cn(
                                "h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all",
                                isActive
                                  ? "border-primary bg-primary"
                                  : "border-muted-foreground/30 group-hover:border-primary/50",
                              )}
                            >
                              {isActive && (
                                <div className="h-1.5 w-1.5 rounded-full bg-white" />
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t p-6 pt-4">
              <Button
                onClick={handleCreateNew}
                className="w-full"
                variant="default"
              >
                + Create New Context
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Create View Header */}
            <DialogHeader className="p-6 pb-4 border-b">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleBackToList}
                  className="shrink-0"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
                <DialogTitle className="text-lg font-semibold">
                  New Context Memory
                </DialogTitle>
              </div>
            </DialogHeader>

            {/* Create Form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Context Name */}
              <div className="grid gap-2">
                <Label htmlFor="context-name">Context Name</Label>
                <Input
                  id="context-name"
                  value={newContextTitle}
                  onChange={(e) => {
                    setNewContextTitle(e.target.value);
                    if (titleError) setTitleError(null);
                  }}
                  placeholder="e.g., My Startup Pitch"
                  aria-invalid={!!titleError}
                />
                {titleError && (
                  <p className="text-xs text-destructive">{titleError}</p>
                )}
              </div>

              {/* Context Instructions */}
              <div className="grid gap-2">
                <Label htmlFor="context-content">Context Instructions</Label>
                <Textarea
                  id="context-content"
                  value={newContextContent}
                  onChange={(e) => {
                    setNewContextContent(e.target.value);
                    if (contentError) setContentError(null);
                  }}
                  placeholder="Describe your project background, brand voice, or rules here. This will be added to every prompt silently."
                  className="min-h-40 resize-none"
                  aria-invalid={!!contentError}
                />
                {contentError && (
                  <p className="text-xs text-destructive">{contentError}</p>
                )}
              </div>
            </div>

            {/* Create Footer */}
            <DialogFooter className="border-t p-6 pt-4">
              <Button variant="outline" onClick={handleBackToList}>
                Cancel
              </Button>
              <Button onClick={handleSaveNewContext}>Save Context</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
