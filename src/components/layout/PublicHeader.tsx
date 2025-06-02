import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building, Menu, X, Phone, Mail } from "lucide-react";
const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigation = [{
    name: "Home",
    href: "/public"
  }, {
    name: "About",
    href: "/public/about"
  }, {
    name: "Properties",
    href: "/public/properties"
  }, {
    name: "Completed Projects",
    href: "/public/completed-projects"
  }, {
    name: "Ongoing Projects",
    href: "/public/ongoing-projects"
  }, {
    name: "Upcoming Projects",
    href: "/public/upcoming-projects"
  }, {
    name: "Open Plots",
    href: "/public/open-plots"
  }, {
    name: "Contact",
    href: "/public/contact"
  }];
  const isActive = (href: string) => location.pathname === href;
  return <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="border-b py-2 text-sm text-gray-600">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>+91 6300380596</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span>info@estatecorp.com</span>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Admin Login</Link>
            </Button>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between py-4">
          <Link to="/public" className="flex items-center space-x-2">
            <Building className="h-8 w-8 text-estate-navy" />
            <span className="text-2xl font-bold text-estate-navy">CSK REALTORS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map(item => <Link key={item.name} to={item.href} className={`text-sm font-medium transition-colors hover:text-estate-navy ${isActive(item.href) ? "text-estate-navy" : "text-gray-700"}`}>
                {item.name}
              </Link>)}
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="lg:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map(item => <Link key={item.name} to={item.href} className={`text-sm font-medium transition-colors hover:text-estate-navy ${isActive(item.href) ? "text-estate-navy" : "text-gray-700"}`} onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>)}
            </nav>
          </div>}
      </div>
    </header>;
};
export default PublicHeader;