
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

// Owner specific pages
import BusinessAnalytics from "./pages/BusinessAnalytics";
import UserManagement from "./pages/UserManagement";
import SalesOverview from "./pages/SalesOverview";
import OperationsWorkflow from "./pages/OperationsWorkflow";
import Finances from "./pages/Finances";

// Agent specific pages
import LeadManagement from "./pages/agent/LeadManagement";
import MySchedule from "./pages/agent/MySchedule";
import SiteVisits from "./pages/agent/SiteVisits";
import AgentDocuments from "./pages/agent/AgentDocuments";
import MyCommissions from "./pages/agent/MyCommissions";

// Contractor specific pages
import ContractorProjects from "./pages/contractor/ContractorProjects";
import ContractorTasks from "./pages/contractor/ContractorTasks";
import ContractorTimeline from "./pages/contractor/ContractorTimeline";
import ContractorMaterials from "./pages/contractor/ContractorMaterials";
import ContractorLabor from "./pages/contractor/ContractorLabor";
import ContractorInvoices from "./pages/contractor/ContractorInvoices";
import ContractorPhotoEvidence from "./pages/contractor/ContractorPhotoEvidence";

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
            
            {/* Owner & Admin Routes */}
            <Route path="/analytics" element={<BusinessAnalytics />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/sales" element={<SalesOverview />} />
            <Route path="/operations" element={<OperationsWorkflow />} />
            <Route path="/finances" element={<Finances />} />
            
            {/* Agent Routes */}
            <Route path="/leads" element={<LeadManagement />} />
            <Route path="/schedule" element={<MySchedule />} />
            <Route path="/visits" element={<SiteVisits />} />
            <Route path="/documents" element={<AgentDocuments />} />
            <Route path="/commissions" element={<MyCommissions />} />
            
            {/* Contractor Routes */}
            <Route path="/projects" element={<ContractorProjects />} />
            <Route path="/tasks" element={<ContractorTasks />} />
            <Route path="/timeline" element={<ContractorTimeline />} />
            <Route path="/materials" element={<ContractorMaterials />} />
            <Route path="/labor" element={<ContractorLabor />} />
            <Route path="/invoices" element={<ContractorInvoices />} />
            <Route path="/evidence" element={<ContractorPhotoEvidence />} />
            
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
