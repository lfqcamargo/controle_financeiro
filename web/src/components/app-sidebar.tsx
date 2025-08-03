import {
  Home,
  TrendingUp,
  TrendingDown,
  PieChart,
  LogOut,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar";
import { ThemeToggle } from "./theme/theme-toggle";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: TrendingUp, label: "Receitas", path: "/income" },
  { icon: TrendingDown, label: "Despesas", path: "/expense" },
  { icon: PieChart, label: "Relatórios", path: "/transactions" },
];

export function AppSideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex items-center gap-3 text-xl font-semibold text-foreground px-4 py-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-income flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <span>Controle Financeiro</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <nav className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const path = item.path;
            return (
              <Button
                key={item.label}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start gap-3 h-12 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
                onClick={() => navigate(path)}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </SidebarContent>

      <SidebarFooter>
        <div className="space-y-2 px-4">
          <div className="flex items-center gap-2 ">
            <ThemeToggle />
            <span className="text-muted-foreground hover:text-foreground hover:bg-accent">
              Tema
            </span>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-12 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </Button>

          <footer className="text-xs text-muted-foreground pt-4 border-t border-border">
            Lucas Fernando Quinato de Camargo &copy; {new Date().getFullYear()}
          </footer>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
