"use client";

import * as React from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function InputArea({
  value,
  onChange,
  placeholder = "Enter your rough idea or draft...",
}: InputAreaProps) {
  return (
    <Field>
      <FieldLabel htmlFor="prompt-input">Draft Input</FieldLabel>
      <div className="relative">
        <Textarea
          id="prompt-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[120px] max-h-[320px] resize-y pb-6"
        />
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground pointer-events-none">
          {value.length} chars
        </div>
      </div>
    </Field>
  );
}
