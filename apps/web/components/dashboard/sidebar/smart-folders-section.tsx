"use client"

import * as React from "react"
import { Folder, ChevronRight, Plus, Loader2 } from "lucide-react"
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
import { SmartFolder } from "@/lib/types"
import { getMockFolders } from "@/lib/mock-data"

export function SmartFoldersSection() {
  const [folders, setFolders] = React.useState<SmartFolder[]>([])
  const [loading, setLoading] = React.useState(true)

  // Load mock data
  React.useEffect(() => {
    const loadFolders = async () => {
      try {
        const data = await getMockFolders()
        setFolders(data)
      } finally {
        setLoading(false)
      }
    }
    loadFolders()
  }, [])

  const handleCreateFolder = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log("Create folder clicked")
  }

  const handleFolderClick = (id: string) => {
    console.log(`Navigate to folder: ${id}`)
  }

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            <Folder className="mr-2 h-4 w-4" />
            Smart Folders
            <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {loading ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <>
                  {folders.map((folder) => (
                    <SidebarMenuItem key={folder.id}>
                      <SidebarMenuButton onClick={() => handleFolderClick(folder.id)}>
                        <Folder className="h-4 w-4" />
                        <span>{folder.name}</span>
                        <Badge variant="secondary" className="ml-auto text-[10px] h-5 px-1.5 min-w-[20px] justify-center">
                          {folder.promptCount}
                        </Badge>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleCreateFolder} className="text-muted-foreground hover:text-foreground">
                      <Plus className="h-4 w-4" />
                      <span>Create Folder</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}
