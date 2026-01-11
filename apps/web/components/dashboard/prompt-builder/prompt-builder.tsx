"use client";

import * as React from "react";
import { Crown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ContextManagerModal } from "./context-manager-modal";
import { GeneratedPromptCard } from "./generated-prompt-card";
import { SaveModal } from "./save-modal";
import { useLibrary } from "@/lib/contexts/library-context";
import { usePrompt } from "@/lib/contexts/prompt-context";
import type { SavePromptData } from "@/lib/types";

interface ContextItem {
  id: string;
  title: string;
  content: string;
}

const STORAGE_KEY_CONTEXTS = "prompt-manager-contexts";
const STORAGE_KEY_ACTIVE_CONTEXT = "prompt-manager-active-context";

export function PromptBuilder() {
  const [prompt, setPrompt] = React.useState("");
  const [generatedPrompt, setGeneratedPrompt] = React.useState<string | null>(
    null,
  );
  const [primerMode, setPrimerMode] = React.useState<
    "Basic" | "Advanced" | "Pro"
  >("Basic");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isContextModalOpen, setIsContextModalOpen] = React.useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = React.useState(false);
  const [savedContexts, setSavedContexts] = React.useState<ContextItem[]>([]);
  const [activeContext, setActiveContext] = React.useState<ContextItem | null>(
    null,
  );

  const { libraries, addPromptToLibraries } = useLibrary();
  const { onReset } = usePrompt();

  // Load saved contexts and active context from localStorage on mount
  React.useEffect(() => {
    try {
      const savedContextsData = localStorage.getItem(STORAGE_KEY_CONTEXTS);
      const activeContextId = localStorage.getItem(STORAGE_KEY_ACTIVE_CONTEXT);

      if (savedContextsData) {
        const contexts = JSON.parse(savedContextsData) as ContextItem[];
        setSavedContexts(contexts);

        // Restore active context if it exists in saved list
        if (activeContextId) {
          const active = contexts.find((c) => c.id === activeContextId);
          if (active) {
            setActiveContext(active);
          }
        }
      }
    } catch (error) {
      console.error("Failed to load contexts from localStorage:", error);
    }
  }, []);

  // Save contexts to localStorage whenever they change
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONTEXTS, JSON.stringify(savedContexts));
    } catch (error) {
      console.error("Failed to save contexts to localStorage:", error);
    }
  }, [savedContexts]);

  // Save active context ID to localStorage whenever it changes
  React.useEffect(() => {
    try {
      if (activeContext) {
        localStorage.setItem(STORAGE_KEY_ACTIVE_CONTEXT, activeContext.id);
      } else {
        localStorage.removeItem(STORAGE_KEY_ACTIVE_CONTEXT);
      }
    } catch (error) {
      console.error("Failed to save active context to localStorage:", error);
    }
  }, [activeContext]);

  // Register reset callback for when "New" button is clicked
  React.useEffect(() => {
    return onReset(() => {
      setPrompt("");
      setGeneratedPrompt(null);
      setPrimerMode("Basic");
      setActiveContext(null);
      setIsContextModalOpen(false);
      setIsSaveModalOpen(false);
    });
  }, [onReset]);

  const handleSaveContext = (newContext: Omit<ContextItem, "id">) => {
    const contextWithId: ContextItem = {
      id: `ctx_${Date.now()}`,
      ...newContext,
    };
    setSavedContexts((prev) => [...prev, contextWithId]);
    setActiveContext(contextWithId);
    setIsContextModalOpen(false);
  };

  const handleSelectContext = (context: ContextItem | null) => {
    setActiveContext(context);
  };

  const handleGeneratePrompt = () => {
    let finalPrompt = prompt;

    // Prepend context content if active context exists
    if (activeContext) {
      finalPrompt = activeContext.content + "\n\n" + prompt;
    }

    // Set the generated prompt for display
    setGeneratedPrompt(finalPrompt);

    console.log("Generated prompt:", finalPrompt);
    console.log("Active context:", activeContext?.title || "None");
    console.log("Primer mode:", primerMode);
  };

  const handleRegenerate = () => {
    // Regenerate with same inputs
    handleGeneratePrompt();
  };

  const handleSavePrompt = (data: SavePromptData) => {
    if (!generatedPrompt) return;

    // Create prompt object
    const promptData = {
      title: data.title,
      content: generatedPrompt,
      variables: [],
      logicLevel: primerMode.toLowerCase() as "basic" | "advanced" | "pro",
      contextId: activeContext?.id || null,
      folderId: data.folderId,
      libraryId: null,
      tags: data.tags,
      isQuickSaved: false,
    };

    // Add to selected libraries
    addPromptToLibraries(promptData, data.libraryIds);
    console.log("Prompt saved to libraries:", data.libraryIds);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Scrollable Content Area */}
      {/*
        This area takes the remaining height and handles its own scrolling.
        This creates the effect of a fixed footer without using position: fixed,
        which ensures better compatibility with the sidebar layout.
      */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
        <div className="grid-layout">
          <div className="col-span-4 md:col-span-8">
          {generatedPrompt && (
            <div className="w-full mb-8">
              <h2 className="text-body-small font-semibold text-muted-foreground mb-2">
                Generated Prompt
              </h2>
              <GeneratedPromptCard
                content={generatedPrompt}
                onRegenerate={handleRegenerate}
                onSave={() => setIsSaveModalOpen(true)}
              />
            </div>
          )}
          {/* Spacer or additional content can go here */}
          </div>
        </div>
      </div>

      {/* Static Footer Input Area */}
      {/*
         Stays at the bottom of the container (which is h-full).
         Acts as the "Fixed Footer" requested.
      */}
      <div className="flex-none p-4 bg-background border-t z-10">
        <div className="grid-layout">
          <div className="col-span-4 md:col-span-8">
          <div className="relative rounded-xl border bg-card shadow-sm transition-shadow focus-within:shadow-md focus-within:ring-1 focus-within:ring-ring">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enhance your conversations..."
              className="min-h-20 w-full resize-none border-0 bg-transparent px-4 py-3 text-body placeholder:text-muted-foreground/50 focus-visible:ring-0"
            />

            {/* Bottom Toolbar */}
            <div className="flex items-center justify-between px-4 pb-2 pt-0">
              <div className="flex items-center gap-2">
                <DropdownMenu
                  open={isDropdownOpen}
                  onOpenChange={setIsDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline-brand"
                      className="h-9 px-3"
                    >
                      <span className="mr-2 rounded-full border border-current p-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-current" />
                      </span>
                      {primerMode}
                      <ChevronDown className="ml-2 h-3 w-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setPrimerMode("Basic")}>
                      Basic {primerMode === "Basic" && "✓"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPrimerMode("Advanced")}>
                      Advanced {primerMode === "Advanced" && "✓"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPrimerMode("Pro")}>
                      Pro {primerMode === "Pro" && "✓"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="outline"
                  onClick={() => setIsContextModalOpen(true)}
                  className={
                    activeContext
                      ? "h-9 px-3 text-orange-600 dark:text-orange-500 border-orange-600/30 bg-orange-500/10 hover:bg-orange-500/20"
                      : "h-9 px-3 text-muted-foreground border-dashed border-muted-foreground/30 hover:bg-muted/50"
                  }
                >
                  <Crown
                    className={
                      activeContext
                        ? "mr-2 h-3 w-3 fill-current"
                        : "mr-2 h-3 w-3 text-primary"
                    }
                  />
                  {activeContext ? activeContext.title : "Context (Pro)"}
                </Button>
              </div>

              <Button
                className="h-9 font-medium px-6 shadow-sm"
                onClick={handleGeneratePrompt}
                disabled={!prompt.trim()}
              >
                Generate Prompt
              </Button>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Context Manager Modal */}
      <ContextManagerModal
        open={isContextModalOpen}
        onOpenChange={setIsContextModalOpen}
        activeContext={activeContext}
        onSelectContext={handleSelectContext}
        savedContexts={savedContexts}
        onSaveContext={handleSaveContext}
      />

      {/* Save Prompt Modal */}
      <SaveModal
        open={isSaveModalOpen}
        onOpenChange={setIsSaveModalOpen}
        onSave={handleSavePrompt}
        libraries={libraries}
        defaultContent={generatedPrompt || ""}
      />
    </div>
  );
}
