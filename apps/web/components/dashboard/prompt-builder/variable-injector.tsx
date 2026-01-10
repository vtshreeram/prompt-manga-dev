"use client";

import * as React from "react";
import { Plus, X } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Variable } from "@/lib/types";

interface VariableInjectorProps {
  variables: Variable[];
  onAddVariable: (variable: Variable) => void;
  onRemoveVariable: (variableId: string) => void;
  onInsertVariable: (variableName: string) => void;
}

export function VariableInjector({
  variables,
  onAddVariable,
  onRemoveVariable,
  onInsertVariable,
}: VariableInjectorProps) {
  const [open, setOpen] = React.useState(false);
  const [newVariableName, setNewVariableName] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const validateVariableName = (name: string) => {
    if (!name) return "Name is required";
    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      return "Only letters, numbers, and underscores allowed";
    }
    if (variables.some((v) => v.name === name)) {
      return "Variable already exists";
    }
    return null;
  };

  const handleAdd = () => {
    const validationError = validateVariableName(newVariableName);
    if (validationError) {
      setError(validationError);
      return;
    }

    const newVariable: Variable = {
      id: crypto.randomUUID(),
      name: newVariableName,
    };

    onAddVariable(newVariable);
    setNewVariableName("");
    setError(null);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleBadgeClick = (name: string) => {
    console.log(`Insert variable: {{${name}}}`);
    onInsertVariable(name);
  };

  return (
    <Field>
      <FieldLabel>Dynamic Variables</FieldLabel>
      <div className="flex flex-wrap gap-2 items-center min-h-[44px] p-2 border rounded-lg bg-background shadow-xs">
        {variables.map((variable) => (
          <Badge
            key={variable.id}
            variant="secondary"
            className="cursor-pointer hover:bg-secondary/80 pr-1 flex items-center gap-1"
            onClick={() => handleBadgeClick(variable.name)}
          >
            {variable.name}
            <button
              className="ml-1 hover:bg-muted rounded-full p-0.5"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveVariable(variable.id);
              }}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {variable.name}</span>
            </button>
          </Badge>
        ))}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-muted-foreground border border-dashed hover:border-solid hover:text-foreground"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Variable
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <div className="p-4 grid gap-4">
              <div className="space-y-1">
                <h4 className="font-medium text-sm">New Variable</h4>
                <p className="text-xs text-muted-foreground">
                  Create a placeholder for dynamic content.
                </p>
              </div>
              <div className="grid gap-2">
                <InputGroup>
                  <InputGroupInput
                    value={newVariableName}
                    onChange={(e) => {
                      setNewVariableName(e.target.value);
                      if (error) setError(null);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="product_name"
                  />
                </InputGroup>
                {error && (
                  <p className="text-xs text-destructive font-medium">
                    {error}
                  </p>
                )}
                <Button size="sm" onClick={handleAdd} className="w-full">
                  Add Variable
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <FieldDescription>
        Click a variable to insert it into your prompt as{" "}
        <code>{"{{variable}}"}</code>.
      </FieldDescription>
    </Field>
  );
}
