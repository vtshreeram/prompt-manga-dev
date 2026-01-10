import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LibraryProvider } from "@/lib/contexts/library-context";
import { PromptProvider } from "@/lib/contexts/prompt-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LibraryProvider>
      <PromptProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-10">
              <div className="flex items-center gap-2 px-3">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </div>
            </header>
            <div className="flex flex-1 flex-col overflow-y-auto">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </PromptProvider>
    </LibraryProvider>
  );
}
