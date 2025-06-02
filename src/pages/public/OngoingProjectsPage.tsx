
import PublicLayout from "@/components/layout/PublicLayout";
import PropertyListingCard from "@/components/public/PropertyListingCard";
import { Construction, Clock, TrendingUp, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const OngoingProjectsPage = () => {
  const ongoingProjects = [
    {
      id: 2,
      title: "Sunrise Heights",
      location: "New Town, Kolkata",
      type: "Ongoing",
      category: "Apartment",
      price: "₹65 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["2-3 BHK", "Gym", "Garden", "Parking"],
      description: "Modern apartment complex with excellent connectivity. 75% completed, possession by Dec 2024."
    },
    {
      id: 6,
      title: "Tech Park Residency",
      location: "HITEC City, Hyderabad",
      type: "Ongoing",
      category: "Apartment",
      price: "₹55 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["1-2 BHK", "IT Hub", "Metro", "Food Court"],
      description: "Compact homes near major IT companies. 60% completed, possession by Jun 2025."
    },
    {
      id: 7,
      title: "Royal Gardens",
      location: "Sector 62, Noida",
      type: "Ongoing",
      category: "Villa",
      price: "₹1.2 Crores onwards",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["3-4 BHK", "Private Garden", "Club", "Security"],
      description: "Premium villa project with large gardens. 45% completed, possession by Mar 2025."
    }
  ];

  const projectProgress = [
    { name: "Sunrise Heights", progress: 75, expectedCompletion: "Dec 2024" },
    { name: "Tech Park Residency", progress: 60, expectedCompletion: "Jun 2025" },
    { name: "Royal Gardens", progress: 45, expectedCompletion: "Mar 2025" },
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen">
        {/* Header */}
        <section className="bg-yellow-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4">Ongoing Projects</h1>
            <p className="text-xl">Invest early and get the best prices on our under-construction projects</p>
          </div>
        </section>

        {/* Progress Tracking */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Project Progress Tracker</h2>
              <p className="text-gray-600">Stay updated with real-time construction progress</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projectProgress.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="text-sm text-gray-600">
                      <Clock className="inline h-4 w-4 mr-1" />
                      Expected Completion: {project.expectedCompletion}
                    </div>
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
              <h2 className="text-3xl font-bold mb-4">Current Ongoing Projects</h2>
              <p className="text-gray-600">Secure your home today at pre-launch prices</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ongoingProjects.map((project) => (
                <PropertyListingCard key={project.id} property={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits of Buying Ongoing Projects */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Benefits of Ongoing Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <h3 className="text-lg font-semibold mb-2">Lower Prices</h3>
                  <p className="text-gray-600 text-sm">Get pre-launch prices with attractive payment plans</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Construction className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                  <h3 className="text-lg font-semibold mb-2">Customization</h3>
                  <p className="text-gray-600 text-sm">Customize interiors and finishes to your preference</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                  <h3 className="text-lg font-semibold mb-2">Flexible Payment</h3>
                  <p className="text-gray-600 text-sm">Extended payment schedules linked to construction</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                  <h3 className="text-lg font-semibold mb-2">RERA Protection</h3>
                  <p className="text-gray-600 text-sm">All projects are RERA registered for your security</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default OngoingProjectsPage;
