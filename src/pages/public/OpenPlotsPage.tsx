
import PublicLayout from "@/components/layout/PublicLayout";
import PropertyListingCard from "@/components/public/PropertyListingCard";
import { MapPin, Ruler, TreePine, Shield, Car, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const OpenPlotsPage = () => {
  const plotProjects = [
    {
      id: 3,
      title: "Premium Plots - Phase 2",
      location: "Electronic City, Bangalore",
      type: "Open Plots",
      category: "Plot",
      price: "₹45 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["1200-2400 sq ft", "Gated Community", "All Amenities", "Ready to Build"],
      description: "Prime residential plots in a well-planned gated community with all modern amenities."
    },
    {
      id: 11,
      title: "Lake View Plots",
      location: "Shamshabad, Hyderabad",
      type: "Open Plots",
      category: "Plot",
      price: "₹35 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["1000-2000 sq ft", "Lake View", "Airport Proximity", "Investment Grade"],
      description: "Scenic plots overlooking a pristine lake, perfect for luxury villa construction."
    },
    {
      id: 12,
      title: "Green Valley Plots",
      location: "Sohna Road, Gurgaon",
      type: "Open Plots",
      category: "Plot",
      price: "₹55 Lakhs onwards",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["1500-3000 sq ft", "Metro Extension", "Golf Course", "Premium Location"],
      description: "Premium plots near upcoming metro extension and championship golf course."
    }
  ];

  const amenities = [
    { icon: TreePine, title: "Landscaped Gardens", description: "Beautiful green spaces and parks" },
    { icon: Shield, title: "24/7 Security", description: "Gated community with round-the-clock security" },
    { icon: Car, title: "Wide Roads", description: "40-60 feet wide roads with proper street lighting" },
    { icon: Zap, title: "Utilities Ready", description: "Electricity, water, and sewage connections ready" },
    { icon: MapPin, title: "Prime Location", description: "Strategic locations with excellent connectivity" },
    { icon: Ruler, title: "DTCP Approved", description: "All necessary approvals and clear titles" }
  ];

  const plotSizes = [
    { size: "1000-1200 sq ft", ideal: "Compact Homes", price: "₹25-35 L" },
    { size: "1200-1800 sq ft", ideal: "Medium Villas", price: "₹35-55 L" },
    { size: "1800-2400 sq ft", ideal: "Large Villas", price: "₹55-75 L" },
    { size: "2400+ sq ft", ideal: "Luxury Estates", price: "₹75 L+" }
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen">
        {/* Header */}
        <section className="bg-purple-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4">Open Plots</h1>
            <p className="text-xl">Build your dream home on premium residential plots</p>
          </div>
        </section>

        {/* Plot Sizes Guide */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Plot Size Guide</h2>
              <p className="text-gray-600">Choose the perfect plot size for your dream home</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {plotSizes.map((plot, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-estate-navy mb-2">{plot.size}</div>
                    <div className="text-gray-600 mb-2">Ideal for {plot.ideal}</div>
                    <div className="text-lg font-semibold text-green-600">{plot.price}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Available Plots */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Available Plot Projects</h2>
              <p className="text-gray-600">Ready-to-build plots in prime locations</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plotProjects.map((plot) => (
                <PropertyListingCard key={plot.id} property={plot} />
              ))}
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Plot Community Amenities</h2>
              <p className="text-gray-600">World-class infrastructure and facilities</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {amenities.map((amenity, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <amenity.icon className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                    <h3 className="text-lg font-semibold mb-2">{amenity.title}</h3>
                    <p className="text-gray-600 text-sm">{amenity.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Our Plots */}
        <section className="py-16 bg-estate-navy text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our Plots?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-start">
                    <span className="text-estate-gold mr-3">✓</span>
                    DTCP approved layouts with clear titles
                  </li>
                  <li className="flex items-start">
                    <span className="text-estate-gold mr-3">✓</span>
                    Ready infrastructure - roads, electricity, water
                  </li>
                  <li className="flex items-start">
                    <span className="text-estate-gold mr-3">✓</span>
                    Flexible payment plans available
                  </li>
                  <li className="flex items-start">
                    <span className="text-estate-gold mr-3">✓</span>
                    Premium locations with high appreciation potential
                  </li>
                  <li className="flex items-start">
                    <span className="text-estate-gold mr-3">✓</span>
                    Support for home loan processing
                  </li>
                  <li className="flex items-start">
                    <span className="text-estate-gold mr-3">✓</span>
                    Construction support and architect recommendations
                  </li>
                </ul>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Plot Development"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default OpenPlotsPage;
