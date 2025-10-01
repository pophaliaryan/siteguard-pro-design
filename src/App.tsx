import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "./contexts/RoleContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MobileChecklist from "./pages/MobileChecklist";
import SiteSelection from "./pages/SiteSelection";
import GeofenceManager from "./pages/GeofenceManager";
import Reports from "./pages/Reports";
import ReportDetail from "./pages/ReportDetail";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RoleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/site-selection" element={<SiteSelection />} />
            <Route path="/mobile-checklist" element={<MobileChecklist />} />
            <Route path="/geofence-manager" element={<GeofenceManager />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/report/:id" element={<ReportDetail />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </RoleProvider>
  </QueryClientProvider>
);

export default App;
