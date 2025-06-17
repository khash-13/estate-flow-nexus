
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight, Home, Building } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  const featuredProperties = [
    {
      id: 1,
      title: "Green Valley Residences",
      location: "Sector 45, Gurgaon",
      type: "Completed",
      price: "₹85 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["3-4 BHK", "Swimming Pool", "Clubhouse", "24/7 Security"]
    },
    {
      id: 2,
      title: "Sunrise Heights",
      location: "New Town, Kolkata",
      type: "Ongoing",
      price: "₹65 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["2-3 BHK", "Gym", "Garden", "Parking"]
    },
    {
      id: 3,
      title: "Premium Plots - Phase 2",
      location: "Electronic City, Bangalore",
      type: "Open Plots",
      price: "₹45 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["1200-2400 sq ft", "Gated Community", "All Amenities", "Ready to Build"]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Completed":
        return "bg-green-500";
      case "Ongoing":
        return "bg-yellow-500";
      case "Open Plots":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-estate-navy">Featured Properties</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties designed for modern living
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className={`absolute top-4 right-4 ${getTypeColor(property.type)} text-white`}>
                  {property.type}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                <div className="text-2xl font-bold text-estate-navy mb-4">{property.price}</div>
                
                <div className="space-y-2 mb-4">
                  {property.features.map((feature, index) => (
                    <span key={index} className="inline-block bg-gray-100 text-sm px-2 py-1 rounded mr-2 mb-1">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <Button className="w-full" asChild>
                  <Link to={`/public/project/${property.id}`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links to Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" size="lg" className="h-20 flex-col" asChild>
            <Link to="/public/completed-projects">
              <Building className="h-6 w-6 mb-2" />
              Completed Projects
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="h-20 flex-col" asChild>
            <Link to="/public/ongoing-projects">
              <Home className="h-6 w-6 mb-2" />
              Ongoing Projects
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="h-20 flex-col" asChild>
            <Link to="/public/upcoming-projects">
              <Building className="h-6 w-6 mb-2" />
              Upcoming Projects
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="h-20 flex-col" asChild>
            <Link to="/public/open-plots">
              <MapPin className="h-6 w-6 mb-2" />
              Open Plots
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
