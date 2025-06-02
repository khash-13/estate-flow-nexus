
import PublicLayout from "@/components/layout/PublicLayout";
import EnquiryForm from "@/components/public/EnquiryForm";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const ContactPage = () => {
  const offices = [
    {
      name: "Head Office",
      address: "123 Business District, Corporate Tower, 15th Floor, Gurgaon, Haryana 122001",
      phone: "+91 124 456 7890",
      email: "info@estatecorp.com",
      hours: "Mon-Fri: 9:00 AM - 7:00 PM, Sat: 9:00 AM - 5:00 PM"
    },
    {
      name: "Bangalore Office",
      address: "456 Tech Park, Whitefield, Bangalore, Karnataka 560066",
      phone: "+91 80 2345 6789",
      email: "bangalore@estatecorp.com",
      hours: "Mon-Fri: 9:30 AM - 6:30 PM, Sat: 10:00 AM - 4:00 PM"
    },
    {
      name: "Mumbai Office",
      address: "789 Financial Center, Bandra Kurla Complex, Mumbai, Maharashtra 400051",
      phone: "+91 22 3456 7890",
      email: "mumbai@estatecorp.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 3:00 PM"
    }
  ];

  const quickContacts = [
    { label: "Sales Enquiry", phone: "+91 98765 43210", icon: Phone },
    { label: "Customer Support", phone: "+91 98765 43211", icon: MessageCircle },
    { label: "Site Visit Booking", phone: "+91 98765 43212", icon: MapPin },
    { label: "Investment Guidance", phone: "+91 98765 43213", icon: Mail }
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen">
        {/* Header */}
        <section className="bg-estate-navy text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl">Get in touch with our expert team for all your real estate needs</p>
          </div>
        </section>

        {/* Quick Contact Options */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Quick Contact</h2>
              <p className="text-gray-600">Choose the fastest way to reach us</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickContacts.map((contact, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <contact.icon className="h-8 w-8 mx-auto mb-3 text-estate-navy" />
                    <h3 className="font-semibold mb-2">{contact.label}</h3>
                    <a href={`tel:${contact.phone}`} className="text-estate-gold hover:underline">
                      {contact.phone}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <EnquiryForm />
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Offices</h2>
              <p className="text-gray-600">Visit us at any of our convenient locations</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-estate-navy">{office.name}</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-3 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{office.address}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-3 text-gray-500" />
                        <a href={`tel:${office.phone}`} className="text-estate-gold hover:underline">
                          {office.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-3 text-gray-500" />
                        <a href={`mailto:${office.email}`} className="text-estate-gold hover:underline">
                          {office.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-3 text-gray-500" />
                        <span className="text-gray-600 text-sm">{office.hours}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Find Us on Map</h2>
              <p className="text-gray-600">Locate our offices and project sites</p>
            </div>
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Interactive map will be integrated here</p>
                <p className="text-sm text-gray-500 mt-2">Showing all office locations and project sites</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">Quick answers to common queries</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What are your office hours?</h3>
                  <p className="text-gray-600">Our offices are open Monday to Friday from 9:00 AM to 7:00 PM, and Saturday from 9:00 AM to 5:00 PM. Sunday visits are by appointment only.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">How can I schedule a site visit?</h3>
                  <p className="text-gray-600">You can schedule a site visit by calling our site visit booking number, filling out the enquiry form, or visiting any of our offices. We provide free transportation for site visits.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Do you provide home loan assistance?</h3>
                  <p className="text-gray-600">Yes, we have tie-ups with leading banks and financial institutions. Our team will help you with documentation and loan processing at competitive interest rates.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default ContactPage;
