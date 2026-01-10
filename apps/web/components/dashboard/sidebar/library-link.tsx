"use client";

import * as React from "react";
import { Library } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { getMockPrompts } from "@/lib/mock-data";

export function LibraryLink() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const loadCount = async () => {
      const prompts = await getMockPrompts();
      setCount(prompts.length);
    };
    loadCount();
  }, []);

  const handleClick = () => {
    console.log("Navigate to library");
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleClick} tooltip="Library">
              <Library />
              <span>Library</span>
              <div className="ml-auto flex items-center gap-2">
                <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 group-data-[collapsible=icon]:hidden lg:inline-flex">
                  <span className="text-xs">⌘</span>L
                </kbd>
                <Badge
                  variant="secondary"
                  className="text-[10px] h-5 px-1.5 min-w-[20px] justify-center"
                >
                  {count}
                </Badge>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
