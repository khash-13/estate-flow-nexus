
import { cn } from "@/lib/utils";
import { useAuth, type UserRole } from "@/contexts/AuthContext";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, Building, Users, Home, FileText, MessageCircle, 
  Calendar, Settings, CreditCard, Map, CheckSquare, UserPlus, 
  ClipboardList, HelpCircle, ChevronRight, ChevronLeft, 
  LayoutDashboard, Briefcase
} from "lucide-react";

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  active = false,
  collapsed = false
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        active 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
};

// Define navigation items for each role
const navigationByRole: Record<UserRole, Array<{ to: string; icon: React.ElementType; label: string; }>> = {
  owner: [
    { to: "/", icon: LayoutDashboard, label: "Executive Dashboard" },
    { to: "/analytics", icon: BarChart3, label: "Business Analytics" },
    { to: "/properties", icon: Building, label: "Properties" },
    { to: "/users", icon: Users, label: "User Management" },
    { to: "/sales", icon: CreditCard, label: "Sales Overview" },
    { to: "/operations", icon: CheckSquare, label: "Operations" },
    { to: "/finances", icon: CreditCard, label: "Finances" },
    { to: "/messaging", icon: MessageCircle, label: "Communications" },
    { to: "/settings", icon: Settings, label: "System Settings" },
  ],
  admin: [
    { to: "/", icon: LayoutDashboard, label: "Admin Dashboard" },
    { to: "/users", icon: Users, label: "User Management" },
    { to: "/properties", icon: Building, label: "Properties" },
    { to: "/content", icon: FileText, label: "CMS" },
    { to: "/messaging", icon: MessageCircle, label: "Communications" },
    { to: "/settings", icon: Settings, label: "System Config" },
  ],
  sales_manager: [
    { to: "/", icon: LayoutDashboard, label: "Sales Dashboard" },
    { to: "/pipeline", icon: BarChart3, label: "Sales Pipeline" },
    { to: "/team", icon: Users, label: "Team Management" },
    { to: "/commissions", icon: CreditCard, label: "Commissions" },
    { to: "/properties", icon: Building, label: "Properties" },
    { to: "/reports", icon: FileText, label: "Sales Reports" },
    { to: "/messaging", icon: MessageCircle, label: "Communications" },
  ],
  team_lead: [
    { to: "/", icon: LayoutDashboard, label: "Team Dashboard" },
    { to: "/team", icon: Users, label: "My Team" },
    { to: "/visits", icon: Map, label: "Site Visits" },
    { to: "/vehicles", icon: Briefcase, label: "Car Allocation" },
    { to: "/approvals", icon: CheckSquare, label: "Approvals" },
    { to: "/properties", icon: Building, label: "Properties" },
    { to: "/messaging", icon: MessageCircle, label: "Communications" },
  ],
  agent: [
    { to: "/", icon: LayoutDashboard, label: "Agent Dashboard" },
    { to: "/leads", icon: UserPlus, label: "Lead Management" },
    { to: "/schedule", icon: Calendar, label: "My Schedule" },
    { to: "/visits", icon: Map, label: "Site Visits" },
    { to: "/documents", icon: FileText, label: "Documents" },
    { to: "/commissions", icon: CreditCard, label: "My Commissions" },
    { to: "/properties", icon: Building, label: "Properties" },
    { to: "/messaging", icon: MessageCircle, label: "Communications" },
  ],
  site_incharge: [
    { to: "/", icon: LayoutDashboard, label: "Site Dashboard" },
    { to: "/quality", icon: CheckSquare, label: "Quality Assurance" },
    { to: "/milestones", icon: ClipboardList, label: "Construction Milestones" },
    { to: "/contractors", icon: Users, label: "Contractors" },
    { to: "/inspections", icon: Map, label: "Site Inspections" },
    { to: "/documents", icon: FileText, label: "Documentation" },
    { to: "/invoices", icon: CreditCard, label: "Invoice Approvals" },
    { to: "/messaging", icon: MessageCircle, label: "Communications" },
  ],
  contractor: [
    { to: "/", icon: LayoutDashboard, label: "Projects Dashboard" },
    { to: "/projects", icon: Building, label: "My Projects" },
    { to: "/milestones", icon: ClipboardList, label: "Milestones" },
    { to: "/materials", icon: Briefcase, label: "Materials" },
    { to: "/invoices", icon: CreditCard, label: "Invoices" },
    { to: "/messaging", icon: MessageCircle, label: "Communications" },
  ],
  accountant: [
    { to: "/", icon: LayoutDashboard, label: "Finance Dashboard" },
    { to: "/invoices", icon: FileText, label: "Invoice Management" },
    { to: "/payments", icon: CreditCard, label: "Payments" },
    { to: "/reports", icon: BarChart3, label: "Financial Reports" },
    { to: "/budgets", icon: ClipboardList, label: "Budget Tracking" },
    { to: "/taxes", icon: FileText, label: "Tax Documents" },
    { to: "/messaging", icon: MessageCircle, label: "Communications" },
  ],
  customer_purchased: [
    { to: "/", icon: LayoutDashboard, label: "My Dashboard" },
    { to: "/properties", icon: Home, label: "My Properties" },
    { to: "/documents", icon: FileText, label: "My Documents" },
    { to: "/payments", icon: CreditCard, label: "Payment History" },
    { to: "/progress", icon: Building, label: "Construction Progress" },
    { to: "/support", icon: HelpCircle, label: "Support" },
    { to: "/messaging", icon: MessageCircle, label: "Messages" },
  ],
  customer_prospect: [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/browse", icon: Building, label: "Browse Properties" },
    { to: "/saved", icon: Home, label: "Saved Properties" },
    { to: "/visits", icon: Calendar, label: "Site Visits" },
    { to: "/documents", icon: FileText, label: "My Documents" },
    { to: "/status", icon: ClipboardList, label: "Application Status" },
    { to: "/support", icon: HelpCircle, label: "Support" },
  ],
};

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  if (!user) return null;
  
  // Get navigation items for the user's role
  const navigation = navigationByRole[user.role] || [];

  return (
    <div 
      className={cn(
        "bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col h-full transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo/Brand area */}
      <div className={cn(
        "h-16 flex items-center px-3 border-b border-sidebar-border",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <Building className="h-6 w-6 text-estate-gold" />
            <span className="font-bold text-lg">EstateFlow</span>
          </Link>
        )}
        {collapsed && (
          <Building className="h-6 w-6 text-estate-gold" />
        )}
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1 rounded-md hover:bg-sidebar-accent",
            collapsed ? "" : ""
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {navigation.map((item) => (
            <SidebarLink
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.to}
              collapsed={collapsed}
            />
          ))}
        </div>
      </nav>

      {/* Bottom area - could contain help section, version, etc. */}
      <div className={cn(
        "p-3 border-t border-sidebar-border",
        collapsed ? "text-center" : ""
      )}>
        <Link
          to="/help"
          className="flex items-center gap-2 text-sm text-sidebar-foreground/80 hover:text-sidebar-foreground rounded-md px-2 py-1.5"
        >
          <HelpCircle className="h-5 w-5" />
          {!collapsed && <span>Help & Support</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
