"use client"

import * as React from "react"
import { Sparkles, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ActionButtonsProps {
  onGenerate: () => void
  onSave: () => void
  isGenerating: boolean
  canSave: boolean
}

export function ActionButtons({
  onGenerate,
  onSave,
  isGenerating,
  canSave,
}: ActionButtonsProps) {
  return (
    <div className="flex w-full items-center gap-2 pt-2">
      <Button
        onClick={onGenerate}
        disabled={!canSave || isGenerating}
        className="flex-1"
      >
        {isGenerating ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4" />
        )}
        {isGenerating ? "Optimizing..." : "Generate / Optimize"}
      </Button>
      <Button
        variant="outline"
        onClick={onSave}
        disabled={!canSave || isGenerating}
        className="flex-1"
      >
        <Save className="mr-2 h-4 w-4" />
        Save & Tag
      </Button>
    </div>
  )
}
