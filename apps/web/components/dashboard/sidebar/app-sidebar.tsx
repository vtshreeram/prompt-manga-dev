"use client";

import * as React from "react";
import {
  Ghost,
  Plus,
  FolderPlus,
  Search,
  Library,
  Clock,
  Folder,
  ChevronDown,
  MoreHorizontal,
  MessageSquare,
  FileText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useLibrary } from "@/lib/contexts/library-context";
import { CreateLibraryModal } from "@/components/dashboard/library/create-library-modal";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { libraries, createLibrary, isLoading } = useLibrary();
  const [isCreateLibraryOpen, setIsCreateLibraryOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleCreateLibrary = (name: string) => {
    createLibrary(name);
  };

  // Filter libraries based on search
  const filteredLibraries = React.useMemo(() => {
    if (!searchQuery.trim()) return libraries;
    const query = searchQuery.toLowerCase();
    return libraries.filter((lib) => lib.name.toLowerCase().includes(query));
  }, [libraries, searchQuery]);

  return (
    <>
      <Sidebar collapsible="icon" className="bg-background border-r" {...props}>
        <SidebarHeader className="pb-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center gap-2 px-2 py-3">
                <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                  <Ghost className="size-5" />
                </div>
                <div className="flex-1 text-left text-lg font-bold leading-tight group-data-[collapsible=icon]:hidden">
                  Prompt Manager
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>

          <div className="flex gap-2 px-2 py-2 group-data-[collapsible=icon]:hidden">
            <Button
              variant="outline"
              className="flex-1 justify-center border-primary/20 text-primary hover:bg-primary/10 hover:text-primary h-9 px-3"
            >
              <Plus className="mr-2 size-4" />
              New
            </Button>
            <Button
              variant="outline"
              className="flex-1 justify-center h-9 px-3"
              onClick={() => setIsCreateLibraryOpen(true)}
            >
              <FolderPlus className="mr-2 size-4" />
              Create Library
            </Button>
          </div>

          <div className="px-2 pb-4 group-data-[collapsible=icon]:hidden">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search prompts..."
                className="pl-9 h-9 bg-muted/50 border-muted-foreground/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          {/* My Prompt Libraries */}
          <SidebarGroup>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarGroupLabel
                asChild
                className="text-sm font-normal text-muted-foreground px-2 mb-1 cursor-pointer hover:text-foreground transition-colors"
              >
                <CollapsibleTrigger>
                  <ChevronDown className="mr-2 h-3 w-3 transition-transform group-data-[state=closed]/collapsible:-rotate-90" />
                  My Prompt Libraries
                  <Library className="ml-auto h-3 w-3 opacity-70" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  {isLoading ? (
                    <div className="px-4 py-2 text-sm text-muted-foreground">
                      Loading...
                    </div>
                  ) : filteredLibraries.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-muted-foreground">
                      {searchQuery
                        ? "No libraries found"
                        : "No libraries yet. Create one!"}
                    </div>
                  ) : (
                    <SidebarMenu>
                      {filteredLibraries.map((library) => (
                        <Collapsible
                          key={library.id}
                          className="group/library-collapsible"
                        >
                          <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton className="text-muted-foreground hover:text-foreground">
                                <ChevronDown className="mr-1 h-3 w-3 transition-transform group-data-[state=closed]/library-collapsible:-rotate-90" />
                                <Folder className="size-4" />
                                <span className="flex-1 truncate">
                                  {library.name}
                                </span>
                                <span className="text-xs opacity-60">
                                  {library.prompts.length}
                                </span>
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              {library.prompts.length === 0 ? (
                                <div className="pl-9 pr-2 py-1.5 text-xs text-muted-foreground/70">
                                  No prompts yet
                                </div>
                              ) : (
                                <SidebarMenu>
                                  {library.prompts.map((prompt) => (
                                    <SidebarMenuItem key={prompt.id}>
                                      <SidebarMenuButton className="h-auto py-1.5 pl-9 text-muted-foreground hover:text-foreground">
                                        <FileText className="size-3 mr-2" />
                                        <span className="truncate text-xs">
                                          {prompt.title}
                                        </span>
                                      </SidebarMenuButton>
                                    </SidebarMenuItem>
                                  ))}
                                </SidebarMenu>
                              )}
                            </CollapsibleContent>
                          </SidebarMenuItem>
                        </Collapsible>
                      ))}
                    </SidebarMenu>
                  )}
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>

          {/* My Prompt History */}
          <SidebarGroup className="mt-2">
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarGroupLabel
                asChild
                className="text-sm font-normal text-muted-foreground px-2 mb-1 cursor-pointer hover:text-foreground transition-colors"
              >
                <CollapsibleTrigger>
                  <ChevronDown className="mr-2 h-3 w-3 transition-transform group-data-[state=closed]/collapsible:-rotate-90" />
                  My Prompt History
                  <Clock className="ml-auto h-3 w-3 opacity-70" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <div className="px-2 py-2 text-xs text-muted-foreground/70 font-medium group-data-[collapsible=icon]:hidden">
                    Today
                  </div>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton className="h-auto py-1.5 text-muted-foreground hover:text-foreground">
                        <MessageSquare className="size-4" />
                        <span className="truncate">
                          Following this, I need to cre...
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton className="h-auto py-1.5 text-muted-foreground hover:text-foreground">
                        <MessageSquare className="size-4" />
                        <span className="truncate">
                          I need to outline a PRD whic...
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent"
                  >
                    <Avatar className="h-8 w-8 rounded-lg border bg-muted">
                      <AvatarFallback className="rounded-lg text-xs font-medium">
                        TM
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                      <span className="truncate font-semibold text-foreground">
                        Tharshini
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        tharshinidr@gmail.com
                      </span>
                    </div>
                    <MoreHorizontal className="ml-auto size-4 group-data-[collapsible=icon]:hidden text-muted-foreground" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* Create Library Modal */}
      <CreateLibraryModal
        open={isCreateLibraryOpen}
        onOpenChange={setIsCreateLibraryOpen}
        onCreateLibrary={handleCreateLibrary}
      />
    </>
  );
}
