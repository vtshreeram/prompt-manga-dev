"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import { Prompt, LibraryFilters } from "@/lib/types"
import { getMockPrompts } from "@/lib/mock-data"
import { LibrarySearchBar } from "@/components/dashboard/library/search-bar"
import { PromptCard } from "@/components/dashboard/library/prompt-card"
import { LibraryEmptyState } from "@/components/dashboard/library/empty-state"
import { Separator } from "@/components/ui/separator"

export default function LibraryPage() {
  const [prompts, setPrompts] = React.useState<Prompt[]>([])
  const [filteredPrompts, setFilteredPrompts] = React.useState<Prompt[]>([])
  const [loading, setLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filters, setFilters] = React.useState<Omit<LibraryFilters, 'searchQuery'>>({
    logicLevel: 'all',
    folderId: 'all',
    quickSavedOnly: false,
  })

  // Load initial data
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getMockPrompts()
        setPrompts(data)
        setFilteredPrompts(data)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Handle filtering
  React.useEffect(() => {
    let result = [...prompts]

    // Text search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(query) ||
          p.content.toLowerCase().includes(query)
      )
    }

    // Logic Level filter
    if (filters.logicLevel !== 'all') {
      result = result.filter(p => p.logicLevel === filters.logicLevel)
    }

    // Folder filter
    if (filters.folderId !== 'all') {
      result = result.filter(p => p.folderId === filters.folderId)
    }

    // Quick Saved filter
    if (filters.quickSavedOnly) {
      result = result.filter(p => p.isQuickSaved)
    }

    setFilteredPrompts(result)
  }, [prompts, searchQuery, filters])

  const handleEdit = (id: string) => {
    console.log(`Edit prompt request: ${id}`)
  }

  const handleDelete = (id: string) => {
    console.log(`Deleting prompt: ${id}`)
    setPrompts(prev => prev.filter(p => p.id !== id))
  }

  const handleDuplicate = (id: string) => {
    console.log(`Duplicating prompt: ${id}`)
    const promptToDuplicate = prompts.find(p => p.id === id)
    if (promptToDuplicate) {
      const newPrompt = {
        ...promptToDuplicate,
        id: crypto.randomUUID(),
        title: `${promptToDuplicate.title} (Copy)`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setPrompts([newPrompt, ...prompts])
    }
  }

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Prompt Library</h1>
        <p className="text-muted-foreground">
          Manage, organize, and refine your collection of super prompts.
        </p>
      </div>
      <Separator />

      <div className="space-y-6">
        <LibrarySearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onFilterChange={setFilters}
        />

        {loading ? (
          <div className="flex h-[400px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
              />
            ))}
          </div>
        ) : (
          <LibraryEmptyState />
        )}
      </div>
    </div>
  )
}
