"use client"

import * as React from "react"
import { Brain, ChevronRight, Plus } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { ContextMemory } from "@/lib/types"
import { getMockContexts } from "@/lib/mock-data"

export function ContextMemorySection() {
  const [contexts, setContexts] = React.useState<ContextMemory[]>([])

  // Load mock data
  React.useEffect(() => {
    const loadContexts = async () => {
      const data = await getMockContexts()
      setContexts(data)
    }
    loadContexts()
  }, [])

  const handleAddContext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Add context clicked")
  }

  const handleContextClick = (id: string) => {
    console.log(`Context selected: ${id}`)
  }

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            <Brain className="mr-2 h-4 w-4" />
            Context Memory
            <div className="ml-auto flex items-center gap-1">
               <div
                role="button"
                tabIndex={0}
                onClick={handleAddContext}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleAddContext(e as unknown as React.MouseEvent);
                  }
                }}
                className="rounded-sm p-1 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-hidden"
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add Context</span>
              </div>
              <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </div>
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {contexts.map((context) => (
                <SidebarMenuItem key={context.id}>
                  <SidebarMenuButton
                    onClick={() => handleContextClick(context.id)}
                    className="h-auto flex-col items-start gap-1 whitespace-normal py-2"
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="font-medium truncate">{context.name}</span>
                      <Badge variant="outline" className="text-[10px] px-1 py-0 h-5 shrink-0">
                        {context.type === 'project-background' ? 'Project' :
                         context.type === 'brand-guideline' ? 'Brand' : 'Custom'}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground line-clamp-2 text-left">
                      {context.description}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {contexts.length === 0 && (
                <div className="px-2 py-4 text-center text-xs text-muted-foreground">
                  No contexts found
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}
