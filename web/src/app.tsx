import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { routes } from "./routes";

import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "sonner";

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="controle-financeiro">
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
