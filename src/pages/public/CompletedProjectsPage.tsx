
import PublicLayout from "@/components/layout/PublicLayout";
import PropertyListingCard from "@/components/public/PropertyListingCard";
import { CheckCircle, Users, Calendar, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CompletedProjectsPage = () => {
  const completedProjects = [
    {
      id: 1,
      title: "Green Valley Residences",
      location: "Sector 45, Gurgaon",
      type: "Completed",
      category: "Villa",
      price: "₹85 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["3-4 BHK", "Swimming Pool", "Clubhouse", "24/7 Security"],
      description: "Luxury villa project with modern amenities and beautiful landscaping. Completed in 2023."
    },
    {
      id: 4,
      title: "Metro Heights",
      location: "Whitefield, Bangalore",
      type: "Completed",
      category: "Apartment",
      price: "₹75 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["2-3 BHK", "Metro Connectivity", "Shopping Complex", "School"],
      description: "Premium apartments with excellent metro connectivity. Handed over in 2022."
    },
    {
      id: 5,
      title: "Coastal Breeze",
      location: "Bandra West, Mumbai",
      type: "Completed",
      category: "Villa",
      price: "₹2.5 Crores onwards",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["4-5 BHK", "Sea View", "Private Pool", "Concierge"],
      description: "Luxury sea-facing villas with premium amenities. Completed in 2023."
    }
  ];

  const stats = [
    { icon: CheckCircle, label: "Projects Completed", value: "25+", color: "text-green-500" },
    { icon: Users, label: "Happy Families", value: "500+", color: "text-blue-500" },
    { icon: Calendar, label: "Years of Delivery", value: "8+", color: "text-purple-500" },
    { icon: Award, label: "Quality Awards", value: "15+", color: "text-orange-500" },
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen">
        {/* Header */}
        <section className="bg-green-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4">Completed Projects</h1>
            <p className="text-xl">Experience the quality and craftsmanship in our delivered projects</p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Track Record</h2>
              <p className="text-gray-600">Numbers that speak for our commitment to excellence</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                    <div className="text-3xl font-bold text-estate-navy mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
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
              <h2 className="text-3xl font-bold mb-4">Our Completed Projects</h2>
              <p className="text-gray-600">Ready-to-move homes with proven quality</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {completedProjects.map((project) => (
                <PropertyListingCard key={project.id} property={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Completed Projects */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Completed Projects?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <h3 className="text-xl font-semibold mb-2">Immediate Possession</h3>
                  <p className="text-gray-600">Move in right away without waiting for construction completion</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Award className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                  <h3 className="text-xl font-semibold mb-2">Proven Quality</h3>
                  <p className="text-gray-600">See the actual construction quality and finishes before buying</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                  <h3 className="text-xl font-semibold mb-2">Established Community</h3>
                  <p className="text-gray-600">Join an existing community with established amenities</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default CompletedProjectsPage;
