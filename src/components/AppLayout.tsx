import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col w-full">
          <header className="h-16 border-b border-border bg-card flex items-center px-4 sticky top-0 z-10">
            <SidebarTrigger className="mr-4 hover:bg-green-600" />
            <h1 className="text-xl font-semibold text-foreground">Gestión de Huertas</h1>
            <div className="ml-auto flex items-center gap-4">
              {/* Placeholder for notifications and user menu */}
            </div>
          </header>
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
