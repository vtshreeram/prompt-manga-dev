"use client";

import * as React from "react";
import { Copy, RotateCw, Save, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface GeneratedPromptCardProps {
  content: string;
  onCopy?: () => void;
  onRegenerate?: () => void;
  onSave?: () => void;
  className?: string;
}

export function GeneratedPromptCard({
  content,
  onCopy,
  onRegenerate,
  onSave,
  className,
}: GeneratedPromptCardProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (onCopy) {
      onCopy();
    }

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <Card
      className={cn(
        "relative border-primary/20 bg-gradient-to-br from-primary/5 to-transparent",
        className,
      )}
    >
      {/* Action Icons */}
      <div className="absolute top-3 right-3 flex items-center gap-1">
        <TooltipProvider>
          {/* Copy Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleCopy}
                className="h-8 w-8 hover:bg-background/80"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">Copy</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
            </TooltipContent>
          </Tooltip>

          {/* Regenerate Button */}
          {onRegenerate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onRegenerate}
                  className="h-8 w-8 hover:bg-background/80"
                >
                  <RotateCw className="h-4 w-4" />
                  <span className="sr-only">Regenerate</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Regenerate prompt</p>
              </TooltipContent>
            </Tooltip>
          )}

          {/* Save Button */}
          {onSave && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onSave}
                  className="h-8 w-8 hover:bg-background/80 hover:text-primary"
                >
                  <Save className="h-4 w-4" />
                  <span className="sr-only">Save to library</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save to library</p>
              </TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </div>

      <CardContent className="pt-6 pb-4 pr-20">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed">
            {content}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
