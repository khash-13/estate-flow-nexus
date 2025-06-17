
import { Link } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Star, Bell, Gift, Users, Eye } from "lucide-react";
import EnquiryForm from "@/components/public/EnquiryForm";

const UpcomingProjectsPage = () => {
  const upcomingProjects = [
    {
      id: 8,
      title: "Infinity Towers",
      location: "Sector 150, Noida",
      launchDate: "March 2024",
      category: "Apartment",
      expectedPrice: "₹45 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["1-3 BHK", "Rooftop Pool", "Sky Lounge", "Smart Homes"],
      description: "Ultra-modern apartments with smart home technology and premium amenities.",
      preBooking: true
    },
    {
      id: 9,
      title: "Emerald Greens",
      location: "Sarjapur Road, Bangalore",
      launchDate: "June 2024",
      category: "Villa",
      expectedPrice: "₹95 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["3-4 BHK", "Golf Course", "Private Pool", "Helipad"],
      description: "Luxury villas adjacent to golf course with world-class amenities.",
      preBooking: true
    },
    {
      id: 10,
      title: "Coastal Paradise",
      location: "ECR, Chennai",
      launchDate: "September 2024",
      category: "Apartment",
      expectedPrice: "₹65 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["2-3 BHK", "Beach Access", "Infinity Pool", "Spa"],
      description: "Beachfront apartments with direct beach access and resort-style amenities.",
      preBooking: false
    }
  ];

  const benefits = [
    {
      icon: Star,
      title: "Early Bird Pricing",
      description: "Get the lowest prices with exclusive pre-launch offers"
    },
    {
      icon: Gift,
      title: "Special Offers",
      description: "Additional benefits like free upgrades and waived fees"
    },
    {
      icon: Users,
      title: "Priority Selection",
      description: "First choice of units, floors, and premium locations"
    },
    {
      icon: Bell,
      title: "VIP Treatment",
      description: "Exclusive updates and priority customer service"
    }
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen">
        {/* Header */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4">Upcoming Projects</h1>
            <p className="text-xl">Be the first to know about our exciting new developments</p>
          </div>
        </section>

        {/* Coming Soon Alert */}
        <section className="py-8 bg-gradient-to-r from-estate-gold to-yellow-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-2">🚀 Exclusive Pre-Launch Offers Available!</h2>
            <p className="text-lg">Register your interest now and save up to ₹5 Lakhs on select projects</p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Early Bird Benefits</h2>
              <p className="text-gray-600">Why register for upcoming projects?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <benefit.icon className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
              <p className="text-gray-600">Discover our upcoming developments</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover filter brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute top-4 right-4 bg-blue-500 text-white">
                      Coming Soon
                    </Badge>
                    {project.preBooking && (
                      <Badge className="absolute top-4 left-4 bg-green-500 text-white">
                        Pre-Booking Open
                      </Badge>
                    )}
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-lg font-semibold">{project.title}</div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {project.location}
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm text-gray-600">Launch: {project.launchDate}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {project.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="inline-block bg-gray-100 text-xs px-2 py-1 rounded mr-2 mb-1">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-2xl font-bold text-estate-navy mb-4">{project.expectedPrice}</div>
                    
                    <div className="space-y-2">
                      <Link to={`/public/project/${project.id}`} className="block">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </Link>
                      {project.preBooking ? (
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          Register Interest
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full">
                          Get Notified
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Register Your Interest</h2>
              <p className="text-gray-600">Be the first to know about our new launches and get exclusive benefits</p>
            </div>
            <EnquiryForm />
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default UpcomingProjectsPage;
