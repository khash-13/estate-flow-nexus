
import PublicLayout from "@/components/layout/PublicLayout";
import AboutSection from "@/components/public/AboutSection";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Target, Heart } from "lucide-react";

const PublicAboutPage = () => {
  const team = [
    {
      name: "John Smith",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "20+ years of experience in real estate development and construction."
    },
    {
      name: "Sarah Johnson",
      role: "Chief Operating Officer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Expert in operations management with a focus on quality delivery."
    },
    {
      name: "Michael Brown",
      role: "Head of Sales",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "15+ years in real estate sales with a track record of excellence."
    }
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-estate-navy text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">About EstateCorp</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Building dreams, creating communities, and delivering excellence in every project for over 15 years.
            </p>
          </div>
        </section>

        {/* Main About Section */}
        <AboutSection />

        {/* Mission, Vision, Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-estate-navy rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-gray-600">
                    To create exceptional living and working spaces that enhance the quality of life 
                    for our customers while contributing to sustainable community development.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-estate-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-gray-600">
                    To be the most trusted and preferred real estate developer, known for innovation, 
                    quality, and customer satisfaction in every project we undertake.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-estate-teal rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                  <p className="text-gray-600">
                    Integrity, quality, innovation, and customer-centricity guide everything we do. 
                    We believe in building lasting relationships and creating value for all stakeholders.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-estate-navy">Leadership Team</h2>
              <p className="text-xl text-gray-600">
                Meet the visionaries behind our success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-estate-navy font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-estate-navy text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-xl mb-8">
              Let's discuss how we can help you find your perfect property or investment opportunity.
            </p>
            <div className="flex justify-center gap-4">
              <a href="/public/contact" className="bg-estate-gold hover:bg-estate-gold/90 text-estate-navy px-8 py-3 rounded-lg font-semibold transition-colors">
                Contact Us Today
              </a>
              <a href="/public/properties" className="border border-white text-white hover:bg-white hover:text-estate-navy px-8 py-3 rounded-lg font-semibold transition-colors">
                View Properties
              </a>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default PublicAboutPage;
