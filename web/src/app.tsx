import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { routes } from "./routes";

import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { env } from "@/env";

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="controle-financeiro">
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={env.VITE_GOOGLE_CLIENT_ID}>
          <RouterProvider router={routes} />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
