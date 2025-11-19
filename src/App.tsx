import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { StatusBar, Style } from "@capacitor/status-bar";
import { App as CapacitorApp } from "@capacitor/app";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const initializeCapacitor = async () => {
      try {
        // Ocultar la barra de estado
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: "#000000" });
        await StatusBar.setOverlaysWebView({ overlay: true });

        // Configurar la visualizacion a pantalla completa
        document.documentElement.style.width = "100vw";
        document.documentElement.style.height = "100vh";
        document.body.style.width = "100vw";
        document.body.style.height = "100vh";
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.overflow = "hidden";

        const root = document.getElementById("root");
        if (root) {
          root.style.width = "100%";
          root.style.height = "100%";
          root.style.overflow = "hidden";
        }
      } catch (error) {
        console.log("Capacitor no disponible o error al configurar", error);
      }
    };

    initializeCapacitor();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
