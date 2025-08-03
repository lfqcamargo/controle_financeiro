import { SidebarProvider } from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";
import { AppSideBar } from "@/components/app-sidebar";

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSideBar />
      <main className="flex flex-col bg-background p-6 overflow-auto w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
