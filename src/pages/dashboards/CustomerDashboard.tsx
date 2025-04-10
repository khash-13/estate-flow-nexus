
import { useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import { Home, FileText, CreditCard, Building, MessageCircle, HelpCircle, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const isPurchasedCustomer = user?.role === "customer_purchased";
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {isPurchasedCustomer ? "My Properties Dashboard" : "Property Finder Dashboard"}
        </h1>
        <p className="text-muted-foreground">
          {isPurchasedCustomer 
            ? "Manage your properties and track construction progress" 
            : "Find your perfect property and track your applications"}
        </p>
      </div>

      {isPurchasedCustomer ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="My Properties"
              value="2"
              icon={<Home className="h-6 w-6 text-estate-navy" />}
            />
            <StatCard
              title="Documents"
              value="12"
              icon={<FileText className="h-6 w-6 text-estate-teal" />}
            />
            <StatCard
              title="Payments Made"
              value="5"
              icon={<CreditCard className="h-6 w-6 text-estate-gold" />}
            />
            <StatCard
              title="Support Tickets"
              value="1"
              icon={<HelpCircle className="h-6 w-6 text-estate-error" />}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>My Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video w-full">
                      <img 
                        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                        alt="Riverside Apartments" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">Riverside Apartments, Unit 305</h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>River District, Metro City</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm text-muted-foreground">Purchase Date</p>
                          <p className="font-medium">June 15, 2023</p>
                        </div>
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm text-muted-foreground">Status</p>
                          <Badge className="bg-estate-success/20 text-estate-success">Ready</Badge>
                        </div>
                      </div>
                      <Button className="w-full bg-estate-navy hover:bg-estate-navy/90">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video w-full">
                      <img 
                        src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                        alt="Golden Heights" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">Golden Heights, Villa 12</h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>North Hills, Metro City</span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center text-sm">
                          <span>Construction Progress</span>
                          <span>75%</span>
                        </div>
                        <Progress value={75} />
                        <p className="text-xs text-right text-muted-foreground">
                          Expected Completion: October 2025
                        </p>
                      </div>
                      <Button className="w-full bg-estate-navy hover:bg-estate-navy/90">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "July 1, 2023", amount: "$15,000", property: "Golden Heights, Villa 12", status: "completed" },
                    { date: "June 1, 2023", amount: "$15,000", property: "Golden Heights, Villa 12", status: "completed" },
                    { date: "May 1, 2023", amount: "$15,000", property: "Golden Heights, Villa 12", status: "completed" },
                    { date: "June 15, 2022", amount: "$250,000", property: "Riverside Apartments, Unit 305", status: "completed" },
                  ].map((payment, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                      <div>
                        <p className="font-medium">{payment.date}</p>
                        <p className="text-sm text-muted-foreground">{payment.property}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{payment.amount}</p>
                        <Badge className="bg-estate-success/20 text-estate-success">
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Purchase Agreement - Riverside Apt", date: "June 15, 2022", type: "legal" },
                    { name: "Floor Plan - Golden Heights", date: "April 10, 2023", type: "blueprint" },
                    { name: "Property Tax Receipt 2023", date: "March 15, 2023", type: "financial" },
                    { name: "Insurance Policy", date: "February 1, 2023", type: "legal" },
                  ].map((doc, index) => {
                    const typeIcons = {
                      legal: <FileText className="h-4 w-4 text-estate-navy" />,
                      blueprint: <Building className="h-4 w-4 text-estate-teal" />,
                      financial: <CreditCard className="h-4 w-4 text-estate-gold" />,
                    };

                    return (
                      <div key={index} className="flex justify-between items-center hover:bg-muted/50 p-2 rounded-md transition-colors">
                        <div className="flex items-center">
                          <div className="p-2 bg-muted rounded-full mr-3">
                            {typeIcons[doc.type as keyof typeof typeIcons]}
                          </div>
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">{doc.date}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        // Prospect Customer Dashboard
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Saved Properties"
              value="3"
              icon={<Home className="h-6 w-6 text-estate-navy" />}
            />
            <StatCard
              title="Scheduled Visits"
              value="1"
              icon={<Calendar className="h-6 w-6 text-estate-teal" />}
            />
            <StatCard
              title="Applications"
              value="2"
              icon={<FileText className="h-6 w-6 text-estate-gold" />}
            />
            <StatCard
              title="Inquiries"
              value="4"
              icon={<MessageCircle className="h-6 w-6 text-estate-error" />}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Featured Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Skyline Towers",
                    location: "Downtown, Metro City",
                    price: "$250,000 - $450,000",
                    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                    saved: true,
                  },
                  {
                    name: "Parkview Residences",
                    location: "East Side, Metro City",
                    price: "$320,000 - $550,000",
                    image: "https://images.unsplash.com/photo-1564013434775-f71db0030976?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                    saved: false,
                  },
                  {
                    name: "Riverside Apartments",
                    location: "River District, Metro City",
                    price: "$400,000 - $750,000",
                    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                    saved: true,
                  },
                ].map((property, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-video w-full relative">
                        <img 
                          src={property.image}
                          alt={property.name}
                          className="w-full h-full object-cover"
                        />
                        {property.saved && (
                          <Badge className="absolute top-2 right-2 bg-estate-gold text-black">
                            Saved
                          </Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg">{property.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground my-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{property.location}</span>
                        </div>
                        <p className="font-bold text-estate-navy mb-4">{property.price}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            {property.saved ? "Unsave" : "Save"}
                          </Button>
                          <Button className="flex-1 bg-estate-navy hover:bg-estate-navy/90">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Site Visits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold">Golden Heights Phase 2</h3>
                      <p className="text-sm text-muted-foreground">North Hills, Metro City</p>
                    </div>
                    <Badge className="bg-estate-success/20 text-estate-success">
                      Confirmed
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">April 15, 2025</p>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">10:00 AM</p>
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-md mb-4">
                    <p className="text-sm text-muted-foreground">Sales Agent</p>
                    <p className="font-medium">Robert Wilson</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">Reschedule</Button>
                    <Button variant="outline" className="flex-1 text-estate-error">Cancel</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-bold">Riverside Apartments, Unit 207</h3>
                        <p className="text-sm text-muted-foreground">Application #APL-2023-0042</p>
                      </div>
                      <Badge className="bg-estate-gold/20 text-estate-gold">In Progress</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span>Document Verification</span>
                        <span>2 of 3 Complete</span>
                      </div>
                      <Progress value={66} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-bold">Parkview Residences, Unit 105</h3>
                        <p className="text-sm text-muted-foreground">Application #APL-2023-0039</p>
                      </div>
                      <Badge className="bg-estate-error/20 text-estate-error">Incomplete</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span>Document Verification</span>
                        <span>1 of 3 Complete</span>
                      </div>
                      <Progress value={33} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerDashboard;
