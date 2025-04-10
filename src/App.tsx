
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import MessagingPage from "./pages/MessagingPage";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/Properties/PropertyDetails";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import Invoices from "./pages/Invoices";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/messaging" element={<MessagingPage />} />
            
            {/* Property Routes */}
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:propertyId" element={<PropertyDetails />} />
            
            {/* Accountant Routes */}
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/reports" element={<Reports />} />
            
            {/* Redirect index to dashboard */}
            <Route path="/index" element={<Navigate to="/" replace />} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
