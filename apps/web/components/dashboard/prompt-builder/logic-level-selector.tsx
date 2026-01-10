"use client";

import * as React from "react";
import { Zap, Brain, Sparkles } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogicLevel } from "@/lib/types";

interface LogicLevelSelectorProps {
  value: LogicLevel;
  onChange: (value: LogicLevel) => void;
}

export function LogicLevelSelector({
  value,
  onChange,
}: LogicLevelSelectorProps) {
  const handleValueChange = (newValue: string) => {
    if (newValue) {
      console.log(`Logic level changed to: ${newValue}`);
      onChange(newValue as LogicLevel);
    }
  };

  return (
    <Field>
      <FieldLabel>Logic Level</FieldLabel>
      <TooltipProvider delayDuration={300}>
        <ToggleGroup
          type="single"
          value={value}
          onValueChange={handleValueChange}
          className="justify-start w-full bg-muted/50 p-1 rounded-lg border"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value="basic"
                aria-label="Basic Logic Level"
                className="flex-1 gap-2 data-[state=on]:bg-background data-[state=on]:shadow-sm data-[state=on]:text-primary"
              >
                <Zap className="h-4 w-4" />
                Basic
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>Simple, straightforward prompts</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value="advanced"
                aria-label="Advanced Logic Level"
                className="flex-1 gap-2 data-[state=on]:bg-background data-[state=on]:shadow-sm data-[state=on]:text-primary"
              >
                <Brain className="h-4 w-4" />
                Advanced
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refined prompts with structure</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value="pro"
                aria-label="Pro Logic Level"
                className="flex-1 gap-2 data-[state=on]:bg-background data-[state=on]:shadow-sm data-[state=on]:text-primary"
              >
                <Sparkles className="h-4 w-4" />
                Pro
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>Complex, multi-layered prompts</p>
            </TooltipContent>
          </Tooltip>
        </ToggleGroup>
      </TooltipProvider>
    </Field>
  );
}
