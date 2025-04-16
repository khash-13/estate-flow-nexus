
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarHeaderProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const SidebarHeader = ({
  collapsed,
  toggleCollapsed
}: SidebarHeaderProps) => {
  return <div className={cn("h-16 flex items-center px-3 border-b border-estate-blue/30", collapsed ? "justify-center" : "justify-between")}>
      {!collapsed && <Link to="/" className="flex items-center gap-2">
          <img 
            src="/public/lovable-uploads/30bdcab9-a5eb-4aa4-93cf-b6c08a16ec9b.png" 
            alt="CSK Realtors Logo" 
            className="h-8 w-auto"
          />
          <span className="font-bold text-lg text-estate-mustard">CSK REALTORS</span>
        </Link>}
      {collapsed && <img 
        src="/public/lovable-uploads/30bdcab9-a5eb-4aa4-93cf-b6c08a16ec9b.png" 
        alt="CSK Realtors Logo" 
        className="h-8 w-auto"
      />}
      
      <button onClick={toggleCollapsed} className="p-1 rounded-md hover:bg-white/10 text-white">
        {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </button>
    </div>;
};

export default SidebarHeader;
