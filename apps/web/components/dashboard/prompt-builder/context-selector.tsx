"use client";

import * as React from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContextMemory } from "@/lib/types";

interface ContextSelectorProps {
  value: string | null;
  onChange: (contextId: string | null) => void;
  contexts: ContextMemory[];
}

export function ContextSelector({
  value,
  onChange,
  contexts,
}: ContextSelectorProps) {
  const selectedContext = contexts.find((c) => c.id === value);

  const handleValueChange = (newValue: string) => {
    if (newValue === "none") {
      onChange(null);
    } else {
      onChange(newValue);
    }
  };

  return (
    <Field>
      <FieldLabel>Context Genie</FieldLabel>
      <Select value={value || "none"} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select context..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">
            <span className="text-muted-foreground">None</span>
          </SelectItem>
          {contexts.map((context) => (
            <SelectItem key={context.id} value={context.id}>
              <div className="flex items-center gap-2">
                <span>{context.name}</span>
                <Badge variant="outline" className="text-[10px] h-4 px-1">
                  {context.type === "project-background"
                    ? "Project"
                    : context.type === "brand-guideline"
                      ? "Brand"
                      : "Custom"}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedContext && (
        <Card className="mt-2 bg-muted/50 border-dashed">
          <CardHeader className="py-3 px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                {selectedContext.name}
              </CardTitle>
              <Badge variant="secondary" className="text-[10px]">
                {selectedContext.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="py-3 px-4 text-xs text-muted-foreground">
            <p className="line-clamp-3">{selectedContext.content}</p>
          </CardContent>
        </Card>
      )}
    </Field>
  );
}
