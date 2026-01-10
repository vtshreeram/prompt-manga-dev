"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ContextMemory } from "@/lib/types"

interface ContextEditorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  context?: ContextMemory
  onSave: (context: Omit<ContextMemory, 'id' | 'createdAt' | 'updatedAt'>) => void
}

export function ContextEditor({
  open,
  onOpenChange,
  context,
  onSave,
}: ContextEditorProps) {
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [type, setType] = React.useState<ContextMemory['type']>("custom")
  const [content, setContent] = React.useState("")
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  // Reset or pre-fill state when modal opens
  React.useEffect(() => {
    if (open) {
      if (context) {
        setName(context.name)
        setDescription(context.description)
        setType(context.type)
        setContent(context.content)
      } else {
        setName("")
        setDescription("")
        setType("custom")
        setContent("")
      }
      setErrors({})
    }
  }, [open, context])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!content.trim()) {
      newErrors.content = "Content is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validate()) return

    const contextData = {
      name: name.trim(),
      description: description.trim(),
      type,
      content: content.trim(),
    }

    console.log("Saving context data:", contextData)
    onSave(contextData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{context ? "Edit Context" : "New Context"}</DialogTitle>
          <DialogDescription>
            {context
              ? "Update your context memory block."
              : "Create a new context memory block to inject into your prompts."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors({...errors, name: ""})
              }}
              placeholder="e.g., Tech Startup Brand Guidelines"
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of what this context contains"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={type}
              onValueChange={(val) => setType(val as ContextMemory['type'])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="project-background">Project Background</SelectItem>
                <SelectItem value="brand-guideline">Brand Guideline</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="content">Context Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
                if (errors.content) setErrors({...errors, content: ""})
              }}
              placeholder="Paste your context text here..."
              className="min-h-[200px]"
            />
            {errors.content && <p className="text-xs text-destructive">{errors.content}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {context ? "Save Changes" : "Create Context"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
