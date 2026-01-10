"use client"

import * as React from "react"
import { Plus, Loader2 } from "lucide-react"
import { ContextMemory } from "@/lib/types"
import { getMockContexts } from "@/lib/mock-data"
import { ContextCard } from "@/components/dashboard/context/context-card"
import { ContextEditor } from "@/components/dashboard/context/context-editor"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function ContextPage() {
  const [contexts, setContexts] = React.useState<ContextMemory[]>([])
  const [loading, setLoading] = React.useState(true)
  const [isEditorOpen, setIsEditorOpen] = React.useState(false)
  const [editingContext, setEditingContext] = React.useState<ContextMemory | undefined>(undefined)

  // Load initial data
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getMockContexts()
        setContexts(data)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleAddClick = () => {
    setEditingContext(undefined)
    setIsEditorOpen(true)
  }

  const handleEditClick = (id: string) => {
    const contextToEdit = contexts.find(c => c.id === id)
    if (contextToEdit) {
      setEditingContext(contextToEdit)
      setIsEditorOpen(true)
    }
  }

  const handleDeleteClick = (id: string) => {
    setContexts(prev => prev.filter(c => c.id !== id))
  }

  const handleSave = (data: Omit<ContextMemory, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingContext) {
      // Update existing
      setContexts(prev => prev.map(c => {
        if (c.id === editingContext.id) {
          return {
            ...c,
            ...data,
            updatedAt: new Date()
          }
        }
        return c
      }))
    } else {
      // Create new
      const newContext: ContextMemory = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setContexts(prev => [newContext, ...prev])
    }
  }

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Context Memory Manager</h1>
          <p className="text-muted-foreground">
            Define reusable background context and brand guidelines for your prompts.
          </p>
        </div>
        <Button onClick={handleAddClick}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Context
        </Button>
      </div>
      <Separator />

      {loading ? (
        <div className="flex h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : contexts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {contexts.map((context) => (
            <ContextCard
              key={context.id}
              context={context}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-[400px] shrink-0 items-center justify-center rounded-md border border-dashed">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <h3 className="mt-4 text-lg font-semibold">No contexts defined</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              Create your first context memory to inject consistent backgrounds into your prompts.
            </p>
            <Button onClick={handleAddClick}>
              <Plus className="mr-2 h-4 w-4" />
              Add Context
            </Button>
          </div>
        </div>
      )}

      <ContextEditor
        open={isEditorOpen}
        onOpenChange={setIsEditorOpen}
        context={editingContext}
        onSave={handleSave}
      />
    </div>
  )
}
