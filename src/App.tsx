import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DistrictProfilePage from "./pages/DistrictProfilePage";
import VillageProfilePage from "./pages/VillageProfilePage";
import HouseholdListPage from "./pages/HouseholdListPage";
import MonevPage from "./pages/MonevPage";
import SimulasiPage from "./pages/SimulasiPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/district/:id" element={<DistrictProfilePage />} />
            <Route path="/village/:id" element={<VillageProfilePage />} />
            <Route path="/village/:id/households" element={<HouseholdListPage />} />
            <Route path="/monev" element={<MonevPage />} />
            <Route path="/simulasi" element={<SimulasiPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
