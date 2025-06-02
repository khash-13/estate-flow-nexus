
import { Building, Users, Award, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  const stats = [
    { icon: Building, label: "Projects Completed", value: "150+" },
    { icon: Users, label: "Happy Families", value: "2000+" },
    { icon: Award, label: "Awards Won", value: "25+" },
    { icon: Clock, label: "Years Experience", value: "15+" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-estate-navy">
              About EstateCorp
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              With over 15 years of experience in real estate development, EstateCorp has been 
              at the forefront of creating exceptional residential and commercial spaces. Our 
              commitment to quality, innovation, and customer satisfaction has made us a trusted 
              name in the industry.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              We believe in building not just structures, but communities where families can 
              thrive and businesses can prosper. Every project we undertake reflects our 
              dedication to excellence and our vision of creating lasting value.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-estate-gold" />
                  <div className="text-2xl font-bold text-estate-navy">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="About EstateCorp"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-estate-gold p-6 rounded-lg shadow-lg">
              <div className="text-white">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-estate-navy">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-estate-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Quality Excellence</h4>
                <p className="text-gray-600">
                  We never compromise on quality, ensuring every project meets the highest standards.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-estate-navy rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Customer First</h4>
                <p className="text-gray-600">
                  Our customers are at the heart of everything we do, driving our commitment to service.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-estate-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Innovation</h4>
                <p className="text-gray-600">
                  We embrace new technologies and methods to create better living experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
