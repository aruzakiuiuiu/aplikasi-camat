import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Calendar, RefreshCw } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="h-12 flex items-center justify-between border-b border-border bg-card px-4 gap-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground" />
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider hidden sm:inline">
                Alat Bantu Kepemimpinan Wilayah
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground text-xs">
                <Calendar className="h-3.5 w-3.5" />
                <span>Februari 2026</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground text-xs">
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Diperbarui: 20 Feb 2026</span>
              </div>
              <button className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
              </button>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
