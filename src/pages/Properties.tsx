import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Building, Filter, Search, Plus, MapPin, User, PanelLeft, LayoutGrid, CalendarClock, Banknote, CalendarCheck2, SlidersHorizontal, X } from "lucide-react";
import { toast } from "sonner";
import { PropertyCardDetailed } from "@/components/properties/PropertyCardDetailed";
import { PropertyDialog } from "@/components/properties/PropertyDialog";
import { PropertyDetails } from "@/components/properties/PropertyDetails";
import { useAuth } from "@/contexts/AuthContext";
import { Property } from "@/types/property";

// Sample data similar to the table structure required
const sampleProperties: Property[] = [{
  id: "1",
  memNo: "MEM001",
  projectName: "Skyline Towers",
  plotNo: "A-101",
  villaFacing: "North-East",
  extent: 1250,
  propertyType: "Villa",
  // Added missing propertyType
  customerName: "John Smith",
  customerStatus: "Purchased",
  status: "Sold",
  contractor: "ABC Builders",
  siteIncharge: "Robert Engineer",
  totalAmount: 450000,
  workCompleted: 100,
  deliveryDate: "2023-10-15",
  emiScheme: true,
  contactNo: "+1 (555) 123-4567",
  agentName: "Sarah Johnson",
  registrationStatus: "Completed",
  ratePlan: "Premium Plan",
  amountReceived: 450000,
  balanceAmount: 0,
  remarks: "Handover completed and all documents processed.",
  municipalPermission: true,
  googleMapsLocation: "https://maps.google.com/?q=40.7128,-74.0060",
  thumbnailUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
}, {
  id: "2",
  memNo: "MEM002",
  projectName: "Parkview Residences",
  plotNo: "B-202",
  villaFacing: "South",
  extent: 1800,
  propertyType: "Apartment",
  // Added missing propertyType
  customerName: "Emily Johnson",
  customerStatus: "Purchased",
  status: "Under Construction",
  contractor: "XYZ Construction",
  siteIncharge: "Michael Builder",
  totalAmount: 650000,
  workCompleted: 65,
  deliveryDate: "2024-06-30",
  emiScheme: true,
  contactNo: "+1 (555) 987-6543",
  agentName: "David Wilson",
  registrationStatus: "Completed",
  ratePlan: "Luxury Package",
  amountReceived: 450000,
  balanceAmount: 200000,
  remarks: "Construction progressing as per schedule.",
  municipalPermission: true,
  googleMapsLocation: "https://maps.google.com/?q=34.0522,-118.2437",
  thumbnailUrl: "https://images.unsplash.com/photo-1564013434775-f71db0030976?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
}, {
  id: "3",
  memNo: "MEM003",
  projectName: "Riverside Apartments",
  plotNo: "C-115",
  villaFacing: "West",
  extent: 950,
  propertyType: "Apartment",
  // Added missing propertyType
  customerName: "",
  customerStatus: "Open",
  status: "Available",
  contractor: "",
  siteIncharge: "",
  totalAmount: 380000,
  workCompleted: 90,
  deliveryDate: "2023-12-15",
  emiScheme: true,
  contactNo: "",
  agentName: "",
  registrationStatus: "Not Started",
  ratePlan: "Standard Plan",
  amountReceived: 0,
  balanceAmount: 380000,
  remarks: "Ready for viewing, showcase unit available.",
  municipalPermission: true,
  googleMapsLocation: "https://maps.google.com/?q=41.8781,-87.6298",
  thumbnailUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
}, {
  id: "4",
  memNo: "MEM004",
  projectName: "Golden Heights Phase 2",
  plotNo: "D-405",
  villaFacing: "North-West",
  extent: 2200,
  propertyType: "Villa",
  // Added missing propertyType
  customerName: "Michael Brown",
  customerStatus: "Blocked",
  status: "Reserved",
  contractor: "",
  siteIncharge: "",
  totalAmount: 850000,
  workCompleted: 0,
  deliveryDate: "2025-03-20",
  emiScheme: false,
  contactNo: "+1 (555) 222-3333",
  agentName: "Jennifer Martinez",
  registrationStatus: "Pending",
  ratePlan: "Executive Suite",
  amountReceived: 85000,
  balanceAmount: 765000,
  remarks: "Booking amount received, awaiting documentation.",
  municipalPermission: false,
  googleMapsLocation: "https://maps.google.com/?q=37.7749,-122.4194",
  thumbnailUrl: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
}, {
  id: "5",
  memNo: "MEM005",
  projectName: "Evergreen Villas",
  plotNo: "E-88",
  villaFacing: "South-East",
  extent: 3000,
  propertyType: "Villa",
  // Added missing propertyType
  customerName: "Robert Davis",
  customerStatus: "Purchased",
  status: "Under Construction",
  contractor: "Premier Builders",
  siteIncharge: "Jessica Engineer",
  totalAmount: 1200000,
  workCompleted: 35,
  deliveryDate: "2025-01-10",
  emiScheme: true,
  contactNo: "+1 (555) 444-5555",
  agentName: "Thomas Anderson",
  registrationStatus: "In Progress",
  ratePlan: "Premium Villa",
  amountReceived: 480000,
  balanceAmount: 720000,
  remarks: "Custom interior finishing as per customer request.",
  municipalPermission: true,
  googleMapsLocation: "https://maps.google.com/?q=51.5074,-0.1278",
  thumbnailUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
}, {
  id: "6",
  memNo: "MEM006",
  projectName: "Central Park Residences",
  plotNo: "F-77",
  villaFacing: "North",
  extent: 1100,
  propertyType: "Apartment",
  // Added missing propertyType
  customerName: "Kevin Martin",
  customerStatus: "Inquiry",
  status: "Available",
  contractor: "",
  siteIncharge: "",
  totalAmount: 520000,
  workCompleted: 100,
  deliveryDate: "2023-09-30",
  emiScheme: false,
  contactNo: "+1 (555) 777-8888",
  agentName: "Laura Wilson",
  registrationStatus: "Not Started",
  ratePlan: "Urban Living",
  amountReceived: 0,
  balanceAmount: 520000,
  remarks: "Interested client, follow-up scheduled next week.",
  municipalPermission: true,
  googleMapsLocation: "https://maps.google.com/?q=48.8566,2.3522",
  thumbnailUrl: "https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
}, {
  id: "7",
  memNo: "MEM007",
  projectName: "Lakeside Manor",
  plotNo: "G-22",
  villaFacing: "East",
  extent: 5000,
  propertyType: "Villa",
  // Added missing propertyType
  customerName: "Patricia Williams",
  customerStatus: "Purchased",
  status: "Sold",
  contractor: "Elite Constructions",
  siteIncharge: "Daniel Project",
  totalAmount: 2200000,
  workCompleted: 100,
  deliveryDate: "2023-05-15",
  emiScheme: false,
  contactNo: "+1 (555) 999-0000",
  agentName: "Christopher Lee",
  registrationStatus: "Completed",
  ratePlan: "Luxury Estate",
  amountReceived: 2200000,
  balanceAmount: 0,
  remarks: "Custom landscaping completed as per owner specifications.",
  municipalPermission: true,
  googleMapsLocation: "https://maps.google.com/?q=52.5200,13.4050",
  thumbnailUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
}, {
  id: "8",
  memNo: "MEM008",
  projectName: "Sunset Apartments",
  plotNo: "H-56",
  villaFacing: "West",
  extent: 1050,
  propertyType: "Apartment",
  // Added missing propertyType
  customerName: "Nancy Taylor",
  customerStatus: "Purchased",
  status: "Under Construction",
  contractor: "Modern Builders",
  siteIncharge: "Steven Manager",
  totalAmount: 495000,
  workCompleted: 45,
  deliveryDate: "2024-08-22",
  emiScheme: true,
  contactNo: "+1 (555) 111-2222",
  agentName: "Elizabeth Brown",
  registrationStatus: "In Progress",
  ratePlan: "Sunset View",
  amountReceived: 198000,
  balanceAmount: 297000,
  remarks: "Construction progressing with custom kitchen upgrades.",
  municipalPermission: true,
  googleMapsLocation: "https://maps.google.com/?q=35.6762,139.6503",
  thumbnailUrl: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
}];
const Properties = () => {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();

  // State for properties and UI controls
  const [properties, setProperties] = useState<Property[]>(sampleProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(sampleProperties);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [customerFilter, setCustomerFilter] = useState("all");
  const [viewMode, setViewMode] = useState("list"); // list or detail
  const [showFilters, setShowFilters] = useState(false);

  // State for property editing/creating
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<Property | undefined>(undefined);
  const [selectedProperty, setSelectedProperty] = useState<Property | undefined>(undefined);

  // Derived state for unique values in dropdown filters
  const uniqueProjects = Array.from(new Set(properties.map(p => p.projectName)));
  const canEdit = user && ["owner", "admin"].includes(user.role);

  // Apply filters whenever filter criteria changes
  useEffect(() => {
    let results = properties;

    // Apply search filter
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      results = results.filter(property => property.plotNo.toLowerCase().includes(lowercaseSearch) || property.projectName.toLowerCase().includes(lowercaseSearch) || property.memNo.toLowerCase().includes(lowercaseSearch) || property.customerName && property.customerName.toLowerCase().includes(lowercaseSearch));
    }

    // Apply project filter
    if (projectFilter !== "all") {
      results = results.filter(property => property.projectName === projectFilter);
    }

    // Apply status filter
    if (statusFilter !== "all") {
      results = results.filter(property => property.status === statusFilter);
    }

    // Apply customer status filter
    if (customerFilter !== "all") {
      results = results.filter(property => property.customerStatus === customerFilter);
    }
    setFilteredProperties(results);
  }, [searchTerm, projectFilter, statusFilter, customerFilter, properties]);

  // Handler for adding/editing properties
  const handlePropertySubmit = (data: any) => {
    if (currentProperty) {
      // Edit existing property
      const updatedProperties = properties.map(property => property.id === currentProperty.id ? {
        ...property,
        ...data,
        id: property.id
      } : property);
      setProperties(updatedProperties);
      toast.success("Property updated successfully");
    } else {
      // Add new property
      const newProperty = {
        ...data,
        id: `${properties.length + 1}`
      };
      setProperties([...properties, newProperty]);
      toast.success("Property added successfully");
    }
    setDialogOpen(false);
    setCurrentProperty(undefined);
  };

  // Handler for deleting a property
  const handleDeleteProperty = () => {
    if (!selectedProperty) return;
    const updatedProperties = properties.filter(property => property.id !== selectedProperty.id);
    setProperties(updatedProperties);
    setSelectedProperty(undefined);
    toast.success("Property deleted successfully");
  };

  // Helper function to clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setProjectFilter("all");
    setStatusFilter("all");
    setCustomerFilter("all");
  };

  // Helper function to determine if any filters are active
  const hasActiveFilters = () => {
    return searchTerm !== "" || projectFilter !== "all" || statusFilter !== "all" || customerFilter !== "all";
  };
  return <MainLayout>
      <div className="space-y-6">
        {/* If a property is selected, show its details */}
        {selectedProperty ? <PropertyDetails property={selectedProperty} onEdit={() => {
        setCurrentProperty(selectedProperty);
        setDialogOpen(true);
      }} onDelete={handleDeleteProperty} onBack={() => setSelectedProperty(undefined)} /> : <>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold flex items-center">
                  <Building className="mr-2 h-7 w-7" />
                  Properties
                </h1>
                <p className="text-muted-foreground">
                  Manage and track your real estate portfolio
                </p>
              </div>
              {canEdit && <Button onClick={() => {
            setCurrentProperty(undefined);
            setDialogOpen(true);
          }} className="bg-estate-navy hover:bg-estate-navy/90 text-slate-100 bg-slate-900 hover:bg-slate-800">
                  <Plus className="mr-2 h-4 w-4" /> Add New Property
                </Button>}
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Search and main filters */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search properties by plot no, project, mem. no..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Select value={projectFilter} onValueChange={setProjectFilter}>
                        <SelectTrigger className="w-[200px]">
                          <Building className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Projects</SelectItem>
                          {uniqueProjects.map(project => <SelectItem key={project} value={project}>{project}</SelectItem>)}
                        </SelectContent>
                      </Select>

                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[200px]">
                          <Filter className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="Available">Available</SelectItem>
                          <SelectItem value="Sold">Sold</SelectItem>
                          <SelectItem value="Under Construction">Under Construction</SelectItem>
                          <SelectItem value="Reserved">Reserved</SelectItem>
                          <SelectItem value="Blocked">Blocked</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button variant="outline" className="w-[50px] flex-shrink-0" onClick={() => setShowFilters(!showFilters)}>
                        <SlidersHorizontal className="h-4 w-4" />
                      </Button>

                      {hasActiveFilters() && <Button variant="ghost" className="flex-shrink-0" onClick={clearFilters}>
                          <X className="mr-2 h-4 w-4" /> Clear
                        </Button>}
                    </div>
                  </div>

                  {/* Additional filters section */}
                  {showFilters && <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Customer Status</p>
                            <Select value={customerFilter} onValueChange={setCustomerFilter}>
                              <SelectTrigger>
                                <User className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Customer Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Customers</SelectItem>
                                <SelectItem value="Purchased">Purchased</SelectItem>
                                <SelectItem value="Inquiry">Inquiry</SelectItem>
                                <SelectItem value="Blocked">Blocked</SelectItem>
                                <SelectItem value="Open">Open</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {/* Additional filter options could be added here */}
                        </div>
                      </CardContent>
                    </Card>}
                  
                  {/* View mode toggle */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
                    </div>
                    <Tabs value={viewMode} onValueChange={setViewMode} className="w-auto">
                      <TabsList>
                        <TabsTrigger value="list" className="flex items-center">
                          <PanelLeft className="mr-2 h-4 w-4" /> 
                          List
                        </TabsTrigger>
                        <TabsTrigger value="detail" className="flex items-center">
                          <LayoutGrid className="mr-2 h-4 w-4" />
                          Details
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Properties listing */}
            {filteredProperties.length === 0 ? <div className="flex flex-col items-center justify-center py-12">
                <Building className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-medium">No properties found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find properties.
                </p>
              </div> : <div className="space-y-4">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid grid-cols-5 mb-4">
                    <TabsTrigger value="all">All Properties</TabsTrigger>
                    <TabsTrigger value="available" className="flex items-center">
                      <Building className="mr-2 h-4 w-4" /> Available
                    </TabsTrigger>
                    <TabsTrigger value="construction" className="flex items-center">
                      <CalendarClock className="mr-2 h-4 w-4" /> Under Construction
                    </TabsTrigger>
                    <TabsTrigger value="sold" className="flex items-center">
                      <Banknote className="mr-2 h-4 w-4" /> Sold
                    </TabsTrigger>
                    <TabsTrigger value="upcoming" className="flex items-center">
                      <CalendarCheck2 className="mr-2 h-4 w-4" /> Upcoming
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all">
                    <div className="space-y-4">
                      {viewMode === "list" ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {filteredProperties.map(property => <div key={property.id} className="cursor-pointer" onClick={() => setSelectedProperty(property)}>
                              <div className="relative group">
                                {/* Thumbnail */}
                                <div className="relative h-48 overflow-hidden rounded-t-lg">
                                  {property.thumbnailUrl ? <img src={property.thumbnailUrl} alt={property.projectName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /> : <div className="w-full h-full flex items-center justify-center bg-muted">
                                      <Building className="h-12 w-12 text-muted-foreground/20" />
                                    </div>}
                                  
                                  {/* Status indicator */}
                                  <div className="absolute top-3 right-3">
                                    <Badge variant="outline" className={`
                                      ${property.status === 'Available' ? 'bg-green-500' : property.status === 'Sold' ? 'bg-blue-500' : property.status === 'Under Construction' ? 'bg-yellow-500' : property.status === 'Reserved' ? 'bg-purple-500' : 'bg-red-500'} text-white
                                    `}>
                                      {property.status}
                                    </Badge>
                                  </div>
                                </div>
                                
                                {/* Info section */}
                                <div className="p-4 border border-t-0 rounded-b-lg">
                                  <h3 className="font-medium text-lg">{property.projectName}</h3>
                                  <div className="flex items-center text-muted-foreground text-sm mt-1">
                                    <MapPin className="h-3.5 w-3.5 mr-1" />
                                    <span>Plot {property.plotNo}</span>
                                  </div>
                                  <div className="mt-3 flex justify-between items-center">
                                    <div className="font-medium">${property.totalAmount.toLocaleString()}</div>
                                    <div className="text-sm text-muted-foreground">Mem. {property.memNo}</div>
                                  </div>
                                </div>
                              </div>
                            </div>)}
                        </div> : <div className="space-y-4">
                          {filteredProperties.map(property => <PropertyCardDetailed key={property.id} property={property} onView={() => setSelectedProperty(property)} />)}
                        </div>}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="available">
                    <div className="space-y-4">
                      {filteredProperties.filter(property => property.status === 'Available').map(property => viewMode === "list" ? <div key={property.id} className="cursor-pointer" onClick={() => setSelectedProperty(property)}>
                              {/* Reuse the list item structure from above */}
                            </div> : <PropertyCardDetailed key={property.id} property={property} onView={() => setSelectedProperty(property)} />)}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="construction">
                    <div className="space-y-4">
                      {filteredProperties.filter(property => property.status === 'Under Construction').map(property => viewMode === "list" ? <div key={property.id} className="cursor-pointer" onClick={() => setSelectedProperty(property)}>
                              {/* Reuse the list item structure from above */}
                            </div> : <PropertyCardDetailed key={property.id} property={property} onView={() => setSelectedProperty(property)} />)}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="sold">
                    <div className="space-y-4">
                      {filteredProperties.filter(property => property.status === 'Sold').map(property => viewMode === "list" ? <div key={property.id} className="cursor-pointer" onClick={() => setSelectedProperty(property)}>
                              {/* Reuse the list item structure from above */}
                            </div> : <PropertyCardDetailed key={property.id} property={property} onView={() => setSelectedProperty(property)} />)}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="upcoming">
                    <div className="space-y-4">
                      {filteredProperties.filter(property => property.status === 'Reserved' || property.status === 'Blocked').map(property => viewMode === "list" ? <div key={property.id} className="cursor-pointer" onClick={() => setSelectedProperty(property)}>
                              {/* Reuse the list item structure from above */}
                            </div> : <PropertyCardDetailed key={property.id} property={property} onView={() => setSelectedProperty(property)} />)}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>}
          </>}
        
        {/* Dialog for creating/editing properties */}
        <PropertyDialog open={dialogOpen} onOpenChange={setDialogOpen} property={currentProperty} onSubmit={handlePropertySubmit} />
      </div>
    </MainLayout>;
};
export default Properties;