
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import PropertyCard, { PropertyCardProps } from "@/components/dashboard/PropertyCard";
import { Building, Filter, Search, Plus } from "lucide-react";

// Sample data
const properties: PropertyCardProps[] = [
  {
    id: "1",
    name: "Skyline Towers",
    location: "Downtown, Metro City",
    type: "Apartment Complex",
    units: 120,
    availableUnits: 45,
    price: "$250,000 - $450,000",
    status: "listed",
    thumbnailUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2",
    name: "Parkview Residences",
    location: "East Side, Metro City",
    type: "Condominiums",
    units: 80,
    availableUnits: 12,
    price: "$320,000 - $550,000",
    status: "under-construction",
    thumbnailUrl: "https://images.unsplash.com/photo-1564013434775-f71db0030976?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "3",
    name: "Riverside Apartments",
    location: "River District, Metro City",
    type: "Luxury Apartments",
    units: 60,
    availableUnits: 20,
    price: "$400,000 - $750,000",
    status: "listed",
    thumbnailUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "4",
    name: "Golden Heights Phase 2",
    location: "North Hills, Metro City",
    type: "Villas",
    units: 40,
    availableUnits: 28,
    price: "$600,000 - $1,200,000",
    status: "under-construction",
    thumbnailUrl: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "5",
    name: "Evergreen Villas",
    location: "West End, Metro City",
    type: "Luxury Villas",
    units: 25,
    availableUnits: 10,
    price: "$800,000 - $1,500,000",
    status: "listed",
    thumbnailUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "6",
    name: "Central Park Residences",
    location: "Central District, Metro City",
    type: "Premium Apartments",
    units: 90,
    availableUnits: 15,
    price: "$350,000 - $650,000",
    status: "unlisted",
    thumbnailUrl: "https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "7",
    name: "Lakeside Manor",
    location: "Lake District, Metro City",
    type: "Premium Houses",
    units: 15,
    availableUnits: 5,
    price: "$900,000 - $1,800,000",
    status: "completed",
    thumbnailUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "8",
    name: "Sunset Apartments",
    location: "Harbor View, Metro City",
    type: "Waterfront Apartments",
    units: 60,
    availableUnits: 25,
    price: "$450,000 - $850,000",
    status: "sold",
    thumbnailUrl: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
];

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter properties based on search and filters
  const filteredProperties = properties.filter((property) => {
    // Apply search filter
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply property type filter
    const matchesType = propertyType === "all" || property.type.includes(propertyType);
    
    // Apply status filter
    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Properties</h1>
            <p className="text-muted-foreground">
              Manage and track your real estate portfolio
            </p>
          </div>
          <Button className="bg-estate-navy hover:bg-estate-navy/90">
            <Plus className="mr-2 h-4 w-4" /> Add New Property
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search properties..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="w-[200px]">
                    <Building className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Apartment">Apartments</SelectItem>
                    <SelectItem value="Villa">Villas</SelectItem>
                    <SelectItem value="House">Houses</SelectItem>
                    <SelectItem value="Condominium">Condominiums</SelectItem>
                    <SelectItem value="Luxury">Luxury Properties</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[200px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="unlisted">Unlisted</SelectItem>
                    <SelectItem value="listed">Listed</SelectItem>
                    <SelectItem value="under-construction">Under Construction</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {filteredProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Building className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-medium">No properties found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find properties.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Properties;
