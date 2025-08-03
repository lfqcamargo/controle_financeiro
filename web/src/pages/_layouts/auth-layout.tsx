import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-foreground p-10 text-background dark:bg-background dark:text-foreground">
        <div className="flex items-center gap-3 text-lg">
          <span className="font-semibold">Controle Financeiro</span>
        </div>

        <footer className="text-sm">
          Lucas Fernando Quinato de Camargo &copy; Controle Financeiro -{" "}
          {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center bg-muted dark:bg-muted">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
