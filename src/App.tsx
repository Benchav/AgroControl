import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Cultivos from "./pages/Cultivos";
import Catalogo from "./pages/Catalogo";
import Riego from "./pages/Riego";
import Recomendaciones from "./pages/Recomendaciones";
import Comunidad from "./pages/Comunidad";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/cultivos" element={<AppLayout><Cultivos /></AppLayout>} />
          <Route path="/catalogo" element={<AppLayout><Catalogo /></AppLayout>} />
          <Route path="/riego" element={<AppLayout><Riego /></AppLayout>} />
          <Route path="/recomendaciones" element={<AppLayout><Recomendaciones /></AppLayout>} />
          <Route path="/comunidad" element={<AppLayout><Comunidad /></AppLayout>} />
          <Route path="/perfil" element={<AppLayout><Perfil /></AppLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
