
import { Building, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const PublicFooter = () => {
  return (
    <footer className="bg-estate-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building className="h-8 w-8" />
              <span className="text-2xl font-bold">EstateCorp</span>
            </div>
            <p className="text-gray-300 mb-4">
              Building dreams, creating communities. Your trusted partner in real estate development.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-estate-gold cursor-pointer" />
              <Twitter className="h-5 w-5 hover:text-estate-gold cursor-pointer" />
              <Instagram className="h-5 w-5 hover:text-estate-gold cursor-pointer" />
              <Linkedin className="h-5 w-5 hover:text-estate-gold cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/public/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/public/properties" className="text-gray-300 hover:text-white">Properties</Link></li>
              <li><Link to="/public/completed-projects" className="text-gray-300 hover:text-white">Completed Projects</Link></li>
              <li><Link to="/public/ongoing-projects" className="text-gray-300 hover:text-white">Ongoing Projects</Link></li>
              <li><Link to="/public/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Residential Development</span></li>
              <li><span className="text-gray-300">Plot Sales</span></li>
              <li><span className="text-gray-300">Construction Services</span></li>
              <li><span className="text-gray-300">Property Management</span></li>
              <li><span className="text-gray-300">Investment Consultation</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="text-gray-300">123 Business District, City, State 12345</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="text-gray-300">+91 12345 67890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="text-gray-300">info@estatecorp.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 EstateCorp. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
