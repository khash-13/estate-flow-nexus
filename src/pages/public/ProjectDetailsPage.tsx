
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Star, Bed, Bath, Car, Trees, Wifi, Dumbbell, ArrowLeft, Phone, Mail } from "lucide-react";
import { SiteVisitDialog } from "@/components/public/SiteVisitDialog";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);

  // Sample project data - in real app, this would come from API
  const projects = [
    {
      id: 1,
      title: "Sunrise Residency",
      location: "Whitefield, Bangalore",
      status: "Ongoing",
      completionDate: "December 2024",
      category: "Apartment",
      price: "₹45 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      features: ["2-3 BHK", "Swimming Pool", "Gym", "Garden", "Security", "Parking"],
      amenities: [
        { icon: Bed, name: "2-3 BHK Units" },
        { icon: Car, name: "Covered Parking" },
        { icon: Dumbbell, name: "Fitness Center" },
        { icon: Trees, name: "Landscaped Garden" },
        { icon: Wifi, name: "High-Speed Internet" },
        { icon: Bath, name: "Premium Fixtures" }
      ],
      description: "Sunrise Residency offers modern living spaces with premium amenities in the heart of Whitefield. Experience luxury at its finest with spacious apartments and world-class facilities.",
      specifications: {
        totalUnits: 120,
        floors: 15,
        launched: "January 2023",
        possession: "December 2024",
        approved: "RERA Approved",
        area: "1200-1800 sq ft"
      },
      developer: {
        name: "Urban Spaces Pvt Ltd",
        experience: "15+ years",
        projects: "50+ completed projects"
      }
    },
    {
      id: 8,
      title: "Infinity Towers",
      location: "Sector 150, Noida",
      status: "Upcoming",
      completionDate: "March 2025",
      category: "Apartment",
      price: "₹45 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      features: ["1-3 BHK", "Rooftop Pool", "Sky Lounge", "Smart Homes"],
      amenities: [
        { icon: Bed, name: "1-3 BHK Units" },
        { icon: Car, name: "Smart Parking" },
        { icon: Dumbbell, name: "Sky Lounge" },
        { icon: Trees, name: "Rooftop Garden" },
        { icon: Wifi, name: "Smart Home Tech" }
      ],
      description: "Ultra-modern apartments with smart home technology and premium amenities.",
      specifications: {
        totalUnits: 200,
        floors: 25,
        launched: "Coming Soon",
        possession: "March 2025",
        approved: "RERA Approved",
        area: "800-1500 sq ft"
      },
      developer: {
        name: "Tech Homes Ltd",
        experience: "10+ years",
        projects: "30+ completed projects"
      }
    }
  ];

  const project = projects.find(p => p.id === parseInt(id || ""));

  if (!project) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </PublicLayout>
    );
  }

  const handleSiteVisitSubmit = (data: any) => {
    console.log("Site visit scheduled:", data);
    // In real app, this would send data to backend
    setSiteVisitOpen(false);
  };

  return (
    <PublicLayout>
      <div className="min-h-screen">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>

        {/* Hero Section */}
        <section className="relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-end">
            <div className="container mx-auto px-4 pb-8 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className={project.status === "Ongoing" ? "bg-green-500" : "bg-blue-500"}>
                  {project.status}
                </Badge>
                <Badge variant="outline" className="text-white border-white">
                  {project.category}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
              <p className="text-xl flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                {project.location}
              </p>
            </div>
          </div>
        </section>

        {/* Project Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>About This Project</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{project.description}</p>
                  </CardContent>
                </Card>

                {/* Amenities */}
                <Card>
                  <CardHeader>
                    <CardTitle>Amenities & Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                          <amenity.icon className="h-5 w-5 text-blue-500" />
                          <span className="text-sm">{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Specifications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p><span className="font-medium">Total Units:</span> {project.specifications.totalUnits}</p>
                        <p><span className="font-medium">Number of Floors:</span> {project.specifications.floors}</p>
                        <p><span className="font-medium">Unit Size:</span> {project.specifications.area}</p>
                      </div>
                      <div className="space-y-2">
                        <p><span className="font-medium">Launch Date:</span> {project.specifications.launched}</p>
                        <p><span className="font-medium">Possession:</span> {project.specifications.possession}</p>
                        <p><span className="font-medium">Approval:</span> {project.specifications.approved}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Gallery */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.gallery.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${project.title} ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Price & CTA */}
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="text-3xl font-bold text-blue-600">{project.price}</div>
                      <div className="space-y-2">
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          onClick={() => setSiteVisitOpen(true)}
                        >
                          Schedule Site Visit
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Phone className="mr-2 h-4 w-4" />
                          Call Now
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Mail className="mr-2 h-4 w-4" />
                          Get Brochure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Key Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge className={project.status === "Ongoing" ? "bg-green-500" : "bg-blue-500"}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completion:</span>
                      <span>{project.completionDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span>{project.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Units Available:</span>
                      <span className="text-green-600 font-medium">Available</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Developer Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Developer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="font-medium">{project.developer.name}</p>
                    <p className="text-sm text-gray-600">{project.developer.experience}</p>
                    <p className="text-sm text-gray-600">{project.developer.projects}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Site Visit Dialog */}
        <SiteVisitDialog
          open={siteVisitOpen}
          onOpenChange={setSiteVisitOpen}
          onSubmit={handleSiteVisitSubmit}
          projectName={project.title}
        />
      </div>
    </PublicLayout>
  );
};

export default ProjectDetailsPage;
