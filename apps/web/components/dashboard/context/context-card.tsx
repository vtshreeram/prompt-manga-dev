"use client";

import * as React from "react";
import { MoreHorizontal, Edit, Trash, Calendar } from "lucide-react";
import { ContextMemory } from "@/lib/types";
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

interface ContextCardProps {
  context: ContextMemory;
  onEdit: (contextId: string) => void;
  onDelete: (contextId: string) => void;
}

export function ContextCard({ context, onEdit, onDelete }: ContextCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const handleEdit = () => {
    console.log(`Edit context: ${context.id}`);
    onEdit(context.id);
  };

  const handleDelete = () => {
    console.log(`Delete context: ${context.id}`);
    onDelete(context.id);
    setShowDeleteDialog(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  const getTypeBadge = (type: ContextMemory["type"]) => {
    switch (type) {
      case "project-background":
        return (
          <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">
            Project
          </Badge>
        );
      case "brand-guideline":
        return (
          <Badge
            variant="default"
            className="bg-purple-600 hover:bg-purple-700"
          >
            Brand
          </Badge>
        );
      case "custom":
        return <Badge variant="secondary">Custom</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <>
      <Card className="flex flex-col h-full transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="flex flex-col gap-2 min-w-0">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-semibold truncate">
                {context.name}
              </CardTitle>
              {getTypeBadge(context.type)}
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
        <CardContent className="flex-1 pb-2 space-y-2">
          <p className="text-sm font-medium leading-none text-muted-foreground">
            {context.description}
          </p>
          <div className="rounded-md bg-muted p-2 text-xs text-muted-foreground font-mono line-clamp-4">
            {context.content}
          </div>
        </CardContent>
        <CardFooter className="pt-2 text-xs text-muted-foreground">
          <Calendar className="mr-1 h-3 w-3" />
          Updated {formatDate(context.updatedAt)}
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              context &quot;{context.name}&quot; and remove it from our servers.
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
