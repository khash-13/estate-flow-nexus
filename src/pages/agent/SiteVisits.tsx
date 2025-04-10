
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, Clock, Car, UserCircle, Info, Plus, CalendarClock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { format, addDays } from "date-fns";

// Sample data
const vehicles = [
  {
    id: "1",
    name: "Toyota Innova",
    type: "SUV",
    capacity: "7 persons",
    registrationNumber: "KA 01 AB 1234",
    status: "available",
    fuelLevel: "Full",
    lastMaintenance: "2025-03-01",
  },
  {
    id: "2",
    name: "Honda City",
    type: "Sedan",
    capacity: "4 persons",
    registrationNumber: "KA 01 CD 5678",
    status: "booked",
    fuelLevel: "3/4",
    lastMaintenance: "2025-02-15",
    bookedFor: [
      { date: "2025-04-10", time: "10:00 AM - 12:30 PM", agent: "Emily Davis" },
      { date: "2025-04-11", time: "02:00 PM - 04:00 PM", agent: "Robert Wilson" }
    ]
  },
  {
    id: "3",
    name: "Maruti Swift",
    type: "Hatchback",
    capacity: "4 persons",
    registrationNumber: "KA 01 EF 9012",
    status: "available",
    fuelLevel: "Half",
    lastMaintenance: "2025-03-20",
  },
  {
    id: "4",
    name: "Tata Nexon",
    type: "SUV",
    capacity: "5 persons",
    registrationNumber: "KA 01 GH 3456",
    status: "maintenance",
    fuelLevel: "1/4",
    lastMaintenance: "2025-04-05",
    maintenanceNotes: "Regular service, will be available from April 12"
  }
];

const upcomingVisits = [
  {
    id: "1",
    client: {
      name: "Patricia Garcia",
      avatar: "https://ui-avatars.com/api/?name=Patricia+Garcia&background=718096&color=fff",
    },
    property: "Skyline Towers",
    date: "Tomorrow",
    time: "10:00 AM",
    vehicle: "Honda City",
    status: "confirmed",
  },
  {
    id: "2",
    client: {
      name: "James Miller",
      avatar: "https://ui-avatars.com/api/?name=James+Miller&background=1A365D&color=fff",
    },
    property: "Golden Heights Phase 2",
    date: "Apr 12, 2025",
    time: "09:00 AM",
    vehicle: "Toyota Innova",
    status: "pending",
  },
  {
    id: "3",
    client: {
      name: "Susan Rodriguez",
      avatar: "https://ui-avatars.com/api/?name=Susan+Rodriguez&background=4299E1&color=fff",
    },
    property: "Riverside Apartments",
    date: "Apr 14, 2025",
    time: "11:30 AM",
    vehicle: "Maruti Swift",
    status: "pending",
  }
];

const completedVisits = [
  {
    id: "4",
    client: {
      name: "Michael Johnson",
      avatar: "https://ui-avatars.com/api/?name=Michael+Johnson&background=38A169&color=fff",
    },
    property: "Parkview Residences",
    date: "Apr 5, 2025",
    time: "02:00 PM",
    vehicle: "Honda City",
    status: "completed",
    notes: "Client showed interest in B-wing apartments",
  },
  {
    id: "5",
    client: {
      name: "Elizabeth Taylor",
      avatar: "https://ui-avatars.com/api/?name=Elizabeth+Taylor&background=ECC94B&color=fff",
    },
    property: "Downtown Lofts",
    date: "Mar 28, 2025",
    time: "11:00 AM",
    vehicle: "Maruti Swift",
    status: "completed",
    notes: "Client requested floor plans for 2BHK units",
  },
];

const SiteVisits = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehicles[0] | null>(null);
  const [bookingStep, setBookingStep] = useState(1);

  const handleVehicleSelect = (vehicle: typeof vehicles[0]) => {
    setSelectedVehicle(vehicle);
    setBookingStep(2);
  };

  const handleBookingComplete = () => {
    toast.success("Site visit scheduled successfully!");
    setIsBookingOpen(false);
    setSelectedVehicle(null);
    setBookingStep(1);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Site Visits</h1>
            <p className="text-muted-foreground">
              Schedule and manage property visits with clients
            </p>
          </div>
          <Button onClick={() => setIsBookingOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Book New Visit
          </Button>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Visits</TabsTrigger>
            <TabsTrigger value="completed">Completed Visits</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="upcoming">
              <div className="grid gap-6">
                {upcomingVisits.map((visit) => (
                  <VisitCard 
                    key={visit.id} 
                    visit={visit} 
                    buttonText="View Details" 
                    buttonVariant="outline" 
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <div className="grid gap-6">
                {completedVisits.map((visit) => (
                  <VisitCard 
                    key={visit.id} 
                    visit={visit} 
                    buttonText="View Details" 
                    buttonVariant="outline" 
                    showNotes
                  />
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center">
                <Car className="mr-2 h-5 w-5 text-estate-navy" />
                Vehicle Allocation
              </div>
            </CardTitle>
            <CardDescription>
              View and book available vehicles for your site visits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden md:table-cell">Registration</TableHead>
                  <TableHead className="hidden md:table-cell">Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => {
                  const statusColors = {
                    available: "bg-green-100 text-green-800",
                    booked: "bg-yellow-100 text-yellow-800",
                    maintenance: "bg-red-100 text-red-800",
                  };

                  return (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.name}</TableCell>
                      <TableCell>{vehicle.type}</TableCell>
                      <TableCell className="hidden md:table-cell">{vehicle.registrationNumber}</TableCell>
                      <TableCell className="hidden md:table-cell">{vehicle.capacity}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[vehicle.status as keyof typeof statusColors]}>
                          {vehicle.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setSelectedVehicle(vehicle)}
                          >
                            <Info className="mr-1 h-3 w-3" />
                            Details
                          </Button>
                          <Button 
                            size="sm" 
                            disabled={vehicle.status !== "available"}
                            onClick={() => {
                              setIsBookingOpen(true);
                              handleVehicleSelect(vehicle);
                            }}
                          >
                            <Calendar className="mr-1 h-3 w-3" />
                            Book
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Vehicle Details Dialog */}
        {selectedVehicle && (
          <Dialog open={!!selectedVehicle && !isBookingOpen} onOpenChange={(open) => {
            if (!open) setSelectedVehicle(null);
          }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Vehicle Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-estate-navy" />
                  <h3 className="text-lg font-medium">{selectedVehicle.name}</h3>
                  <Badge className={
                    selectedVehicle.status === "available" ? "bg-green-100 text-green-800" :
                    selectedVehicle.status === "booked" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }>
                    {selectedVehicle.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Type:</p>
                    <p>{selectedVehicle.type}</p>
                  </div>
                  <div>
                    <p className="font-medium">Capacity:</p>
                    <p>{selectedVehicle.capacity}</p>
                  </div>
                  <div>
                    <p className="font-medium">Registration:</p>
                    <p>{selectedVehicle.registrationNumber}</p>
                  </div>
                  <div>
                    <p className="font-medium">Fuel Level:</p>
                    <p>{selectedVehicle.fuelLevel}</p>
                  </div>
                  <div>
                    <p className="font-medium">Last Maintenance:</p>
                    <p>{selectedVehicle.lastMaintenance}</p>
                  </div>
                </div>

                {selectedVehicle.status === "booked" && selectedVehicle.bookedFor && (
                  <div className="space-y-2">
                    <p className="font-medium">Booked Slots:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedVehicle.bookedFor.map((booking, index) => (
                        <li key={index} className="text-sm">
                          {booking.date}: {booking.time} by {booking.agent}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedVehicle.status === "maintenance" && selectedVehicle.maintenanceNotes && (
                  <div>
                    <p className="font-medium">Maintenance Notes:</p>
                    <p className="text-sm">{selectedVehicle.maintenanceNotes}</p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedVehicle(null)}>Close</Button>
                {selectedVehicle.status === "available" && (
                  <Button 
                    onClick={() => {
                      setIsBookingOpen(true);
                      handleVehicleSelect(selectedVehicle);
                    }}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Book for Site Visit
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Booking Dialog */}
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Book a Site Visit</DialogTitle>
              <DialogDescription>
                Complete the form to book a vehicle for your client's site visit
              </DialogDescription>
            </DialogHeader>

            {bookingStep === 1 && !selectedVehicle && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">1. Select a Client</p>
                  <Input placeholder="Search clients..." />
                  <div className="h-[200px] overflow-y-auto border rounded-md p-4">
                    {/* Just a placeholder for client selection UI */}
                    <ClientSelectionItem
                      name="James Miller"
                      email="james.miller@example.com"
                      avatar="https://ui-avatars.com/api/?name=James+Miller&background=1A365D&color=fff"
                      onClick={() => {}}
                    />
                    <ClientSelectionItem
                      name="Patricia Garcia" 
                      email="patricia.garcia@example.com"
                      avatar="https://ui-avatars.com/api/?name=Patricia+Garcia&background=718096&color=fff"
                      onClick={() => {}}
                    />
                    <ClientSelectionItem
                      name="Susan Rodriguez"
                      email="susan.r@example.com"
                      avatar="https://ui-avatars.com/api/?name=Susan+Rodriguez&background=4299E1&color=fff"
                      onClick={() => {}}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">2. Select a Property</p>
                  <Input placeholder="Search properties..." />
                  <div className="h-[200px] overflow-y-auto border rounded-md p-4">
                    {/* Just a placeholder for property selection UI */}
                    <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-muted/50 px-2 rounded-md">
                      <div>
                        <p className="font-medium">Golden Heights Phase 2</p>
                        <p className="text-sm text-muted-foreground">City Center, 2 & 3 BHK</p>
                      </div>
                      <Button variant="ghost" size="sm">Select</Button>
                    </div>
                    <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-muted/50 px-2 rounded-md">
                      <div>
                        <p className="font-medium">Skyline Towers</p>
                        <p className="text-sm text-muted-foreground">Downtown, 3 & 4 BHK</p>
                      </div>
                      <Button variant="ghost" size="sm">Select</Button>
                    </div>
                    <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-muted/50 px-2 rounded-md">
                      <div>
                        <p className="font-medium">Riverside Apartments</p>
                        <p className="text-sm text-muted-foreground">Riverfront, 2 BHK</p>
                      </div>
                      <Button variant="ghost" size="sm">Select</Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">3. Select a Vehicle</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {vehicles.filter(v => v.status === "available").map((vehicle) => (
                      <Button 
                        key={vehicle.id} 
                        variant="outline" 
                        className="justify-start h-auto p-3"
                        onClick={() => handleVehicleSelect(vehicle)}
                      >
                        <div className="flex items-center">
                          <Car className="mr-2 h-4 w-4 text-estate-navy" />
                          <div className="text-left">
                            <p className="font-medium">{vehicle.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {vehicle.type} • {vehicle.capacity}
                            </p>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {bookingStep === 2 && selectedVehicle && (
              <div className="space-y-4">
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-estate-navy" />
                    <p className="font-medium">{selectedVehicle.name}</p>
                    <Badge className="bg-green-100 text-green-800">Available</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedVehicle.type} • {selectedVehicle.capacity} • {selectedVehicle.registrationNumber}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Visit Date & Time</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Date</p>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarClock className="mr-2 h-4 w-4" />
                        {format(addDays(new Date(), 1), "MMMM d, yyyy")}
                      </Button>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Time</p>
                      <Button variant="outline" className="w-full justify-start">
                        <Clock className="mr-2 h-4 w-4" />
                        10:00 AM - 12:00 PM
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Additional Information</p>
                  <Input placeholder="Special requests or notes" />
                </div>
              </div>
            )}

            <DialogFooter>
              {bookingStep === 1 ? (
                <div className="flex justify-between w-full">
                  <Button variant="outline" onClick={() => setIsBookingOpen(false)}>Cancel</Button>
                  <Button disabled={!selectedVehicle}>Next: Schedule Visit</Button>
                </div>
              ) : (
                <div className="flex justify-between w-full">
                  <Button variant="outline" onClick={() => setBookingStep(1)}>Back</Button>
                  <Button onClick={handleBookingComplete}>Confirm Booking</Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

// Component for visit cards
const VisitCard = ({ 
  visit, 
  buttonText = "View", 
  buttonVariant = "default", 
  showNotes = false 
}: { 
  visit: typeof upcomingVisits[0] | typeof completedVisits[0];
  buttonText?: string;
  buttonVariant?: "default" | "outline";
  showNotes?: boolean;
}) => {
  const statusColors = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={visit.client.avatar} />
              <AvatarFallback>{visit.client.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{visit.client.name}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-3 w-3" />
                {visit.property}
              </div>
            </div>
          </div>
          <Badge className={statusColors[visit.status as keyof typeof statusColors]}>
            {visit.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{visit.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{visit.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{visit.vehicle}</span>
          </div>
        </div>

        {'notes' in visit && showNotes && visit.notes && (
          <div className="mt-4 text-sm border-t pt-4">
            <p className="font-medium">Notes:</p>
            <p className="text-muted-foreground mt-1">{visit.notes}</p>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Button variant={buttonVariant as any}>{buttonText}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for client selection items
const ClientSelectionItem = ({ 
  name, 
  email, 
  avatar,
  onClick 
}: { 
  name: string;
  email: string;
  avatar: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="flex items-center justify-between py-2 cursor-pointer hover:bg-muted/50 px-2 rounded-md"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatar} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{email}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm">Select</Button>
    </div>
  );
};

export default SiteVisits;
