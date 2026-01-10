"use client";

import * as React from "react";
import { MoreHorizontal, Edit, Copy, Trash, Zap, Braces } from "lucide-react";
import { Prompt } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PromptCardProps {
  prompt: Prompt;
  onEdit: (promptId: string) => void;
  onDelete: (promptId: string) => void;
  onDuplicate: (promptId: string) => void;
}

export function PromptCard({
  prompt,
  onEdit,
  onDelete,
  onDuplicate,
}: PromptCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const handleEdit = () => {
    console.log(`Edit prompt: ${prompt.id}`);
    onEdit(prompt.id);
  };

  const handleDuplicate = () => {
    console.log(`Duplicate prompt: ${prompt.id}`);
    onDuplicate(prompt.id);
  };

  const handleDelete = () => {
    console.log(`Delete prompt: ${prompt.id}`);
    onDelete(prompt.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Card className="flex flex-col h-full transition-colors hover:bg-accent/5">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="flex flex-col gap-1 min-w-0">
            <CardTitle className="text-sm font-medium leading-none truncate pr-2">
              {prompt.title}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant={
                  prompt.logicLevel === "pro"
                    ? "default"
                    : prompt.logicLevel === "advanced"
                      ? "secondary"
                      : "outline"
                }
                className="text-[10px] px-1.5 h-5 font-normal uppercase"
              >
                {prompt.logicLevel}
              </Badge>
              {prompt.isQuickSaved && (
                <Badge
                  variant="secondary"
                  className="text-[10px] px-1.5 h-5 gap-1 text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20"
                >
                  <Zap className="h-3 w-3" />
                  Quick Save
                </Badge>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicate}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-destructive focus:text-destructive"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex-1 pb-2">
          <p className="text-xs text-muted-foreground line-clamp-3">
            {prompt.content}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 pt-0 pb-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Braces className="h-3 w-3" />
            <span>{prompt.variables.length} variables</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {prompt.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground ring-1 ring-inset ring-gray-500/10"
              >
                #{tag}
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              prompt &quot;{prompt.title}&quot; and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
