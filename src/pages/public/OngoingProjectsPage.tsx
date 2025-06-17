
import { Link } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Star, Bell, Eye } from "lucide-react";

const OngoingProjectsPage = () => {
  const ongoingProjects = [
    {
      id: 1,
      title: "Sunrise Residency",
      location: "Whitefield, Bangalore",
      completionDate: "December 2024",
      category: "Apartment",
      price: "₹45 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["2-3 BHK", "Swimming Pool", "Gym", "Garden"],
      description: "Modern apartments with premium amenities in the heart of Whitefield.",
      progress: 75
    },
    {
      id: 2,
      title: "Metro Heights",
      location: "Gurgaon Sector 82",
      completionDate: "June 2025",
      category: "Apartment",
      price: "₹65 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["2-4 BHK", "Metro Access", "Mall", "School"],
      description: "Well-connected apartments near metro station with shopping and educational facilities.",
      progress: 60
    },
    {
      id: 3,
      title: "Garden Villas",
      location: "Hebbal, Bangalore",
      completionDate: "March 2025",
      category: "Villa",
      price: "₹1.2 Crores onwards",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["3-4 BHK", "Garden", "Private Pool", "Club House"],
      description: "Luxurious villas with private gardens and premium amenities.",
      progress: 85
    },
    {
      id: 4,
      title: "Tech Park Apartments",
      location: "Electronic City, Bangalore",
      completionDate: "August 2024",
      category: "Apartment",
      price: "₹55 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["1-3 BHK", "IT Hub", "Cafeteria", "Gym"],
      description: "Modern living spaces designed for IT professionals with excellent connectivity.",
      progress: 90
    },
    {
      id: 5,
      title: "Riverside Commons",
      location: "Pune Baner",
      completionDate: "November 2024",
      category: "Apartment",
      price: "₹70 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["2-3 BHK", "River View", "Jogging Track", "Kids Play"],
      description: "Serene apartments with river views and family-friendly amenities.",
      progress: 50
    },
    {
      id: 6,
      title: "Urban Square",
      location: "Noida Extension",
      completionDate: "February 2025",
      category: "Apartment",
      price: "₹40 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["1-2 BHK", "Shopping Mall", "Food Court", "Parking"],
      description: "Affordable housing with retail spaces and modern amenities.",
      progress: 40
    }
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen">
        {/* Header */}
        <section className="bg-green-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4">Ongoing Projects</h1>
            <p className="text-xl">Discover our current developments in progress</p>
          </div>
        </section>

        {/* Progress Alert */}
        <section className="py-8 bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-2">🏗️ Live Construction Updates Available!</h2>
            <p className="text-lg">Track real-time progress and schedule site visits to see the development</p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Projects Under Construction</h2>
              <p className="text-gray-600">Experience the future of living with our ongoing developments</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ongoingProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                      Under Construction
                    </Badge>
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
                      <Calendar className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm text-gray-600">Completion: {project.completionDate}</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">Construction Progress</span>
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {project.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="inline-block bg-gray-100 text-xs px-2 py-1 rounded mr-2 mb-1">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-2xl font-bold text-green-600 mb-4">{project.price}</div>
                    
                    <div className="space-y-2">
                      <Link to={`/public/project/${project.id}`} className="block">
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full">
                        <Bell className="mr-2 h-4 w-4" />
                        Get Updates
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Ongoing Projects */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our Ongoing Projects?</h2>
              <p className="text-gray-600">Benefits of investing in under-construction properties</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Early Bird Pricing</h3>
                <p className="text-gray-600">Get the best prices with pre-construction rates</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Payment</h3>
                <p className="text-gray-600">Easy payment plans linked to construction milestones</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Progress Updates</h3>
                <p className="text-gray-600">Regular updates and site visit opportunities</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default OngoingProjectsPage;
