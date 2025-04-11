
import { cn } from "@/lib/utils";
import { Building, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarHeaderProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const SidebarHeader = ({ collapsed, toggleCollapsed }: SidebarHeaderProps) => {
  return (
    <div className={cn(
      "h-16 flex items-center px-3 border-b border-estate-blue/30",
      collapsed ? "justify-center" : "justify-between"
    )}>
      {!collapsed && (
        <Link to="/" className="flex items-center gap-2">
          <Building className="h-6 w-6 text-estate-mustard" />
          <span className="font-bold text-lg">EstateFlow</span>
        </Link>
      )}
      {collapsed && (
        <Building className="h-6 w-6 text-estate-mustard" />
      )}
      
      <button
        onClick={toggleCollapsed}
        className="p-1 rounded-md hover:bg-white/10 text-white"
      >
        {collapsed ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default SidebarHeader;
