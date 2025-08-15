
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarContent } from "@/components/sidebar-content"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider as UISidebarProvider } from "@/components/ui/sidebar"
import { SidebarProvider } from "@/lib/sidebar-context"

export default function Dashboard() {
  return (
    <SidebarProvider>
      <UISidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader projectId="hello" />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <SidebarContent />
            </div>
          </div>
        </SidebarInset>
      </UISidebarProvider>
    </SidebarProvider>
  )
}
