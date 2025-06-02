
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Car, Users, Calendar, MapPin, Clock, 
  Plus, Settings, Key, Fuel
} from "lucide-react";
import { useState } from "react";

const vehicles = [
  {
    id: "1",
    model: "Toyota Camry",
    licensePlate: "ABC-123",
    status: "available",
    assignedTo: null,
    fuelLevel: 85,
    mileage: 45250,
    lastService: "2024-01-15",
    location: "Main Office"
  },
  {
    id: "2",
    model: "Honda Accord",
    licensePlate: "XYZ-789",
    status: "assigned",
    assignedTo: {
      name: "Robert Wilson",
      avatar: "https://ui-avatars.com/api/?name=Robert+Wilson&background=38A169&color=fff",
      assignedUntil: "2024-06-05"
    },
    fuelLevel: 65,
    mileage: 38900,
    lastService: "2024-01-20",
    location: "Golden Heights Site"
  },
  {
    id: "3",
    model: "Nissan Altima",
    licensePlate: "DEF-456",
    status: "maintenance",
    assignedTo: null,
    fuelLevel: 20,
    mileage: 52100,
    lastService: "2024-01-10",
    location: "Service Center"
  }
];

const teamMembers = [
  {
    id: "1",
    name: "Robert Wilson",
    avatar: "https://ui-avatars.com/api/?name=Robert+Wilson&background=38A169&color=fff",
    role: "Senior Agent"
  },
  {
    id: "2",
    name: "Lisa Anderson",
    avatar: "https://ui-avatars.com/api/?name=Lisa+Anderson&background=9F7AEA&color=fff",
    role: "Junior Agent"
  },
  {
    id: "3",
    name: "David Thompson",
    avatar: "https://ui-avatars.com/api/?name=David+Thompson&background=1A365D&color=fff",
    role: "Agent"
  }
];

const CarAllocation = () => {
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusColor = (status: string) => {
    const colors = {
      "available": "bg-green-100 text-green-800",
      "assigned": "bg-blue-100 text-blue-800",
      "maintenance": "bg-red-100 text-red-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getFuelColor = (level: number) => {
    if (level > 50) return "text-green-600";
    if (level > 25) return "text-yellow-600";
    return "text-red-600";
  };

  const availableVehicles = vehicles.filter(v => v.status === "available").length;
  const assignedVehicles = vehicles.filter(v => v.status === "assigned").length;
  const maintenanceVehicles = vehicles.filter(v => v.status === "maintenance").length;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Car Allocation</h1>
            <p className="text-muted-foreground">
              Manage vehicle assignments and availability
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Vehicles</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Vehicle
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Vehicle</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="model">Vehicle Model</Label>
                    <Input id="model" placeholder="e.g., Toyota Camry" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">License Plate</Label>
                    <Input id="license" placeholder="e.g., ABC-123" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Current Mileage</Label>
                    <Input id="mileage" type="number" placeholder="e.g., 45000" />
                  </div>
                  <Button className="w-full">Add Vehicle</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Vehicles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{vehicles.length}</span>
                <Car className="h-6 w-6 text-estate-navy" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{availableVehicles}</span>
                <Key className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Assigned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{assignedVehicles}</span>
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{maintenanceVehicles}</span>
                <Settings className="h-6 w-6 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {vehicles
            .filter(vehicle => filterStatus === "all" || vehicle.status === filterStatus)
            .map((vehicle) => (
            <Card key={vehicle.id}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-estate-navy/10 flex items-center justify-center">
                      <Car className="h-6 w-6 text-estate-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{vehicle.model}</h3>
                      <p className="text-sm text-muted-foreground">{vehicle.licensePlate}</p>
                      <Badge className={getStatusColor(vehicle.status)}>
                        {vehicle.status}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {vehicle.assignedTo && (
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={vehicle.assignedTo.avatar} />
                      <AvatarFallback>{vehicle.assignedTo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{vehicle.assignedTo.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Until: {vehicle.assignedTo.assignedUntil}
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Fuel Level</p>
                    <p className={`font-semibold ${getFuelColor(vehicle.fuelLevel)}`}>
                      {vehicle.fuelLevel}%
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Mileage</p>
                    <p className="font-semibold">{vehicle.mileage.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Service</p>
                    <p className="font-semibold">{vehicle.lastService}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-semibold text-xs">{vehicle.location}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {vehicle.status === "available" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="flex-1">
                          <Users className="mr-2 h-3 w-3" />
                          Assign
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Assign Vehicle</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Select Team Member</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose team member" />
                              </SelectTrigger>
                              <SelectContent>
                                {teamMembers.map((member) => (
                                  <SelectItem key={member.id} value={member.id}>
                                    {member.name} - {member.role}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="assignment-date">Assignment End Date</Label>
                            <Input id="assignment-date" type="date" />
                          </div>
                          <Button className="w-full">Assign Vehicle</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  {vehicle.status === "assigned" && (
                    <Button size="sm" variant="outline" className="flex-1">
                      <Key className="mr-2 h-3 w-3" />
                      Unassign
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="flex-1">
                    <MapPin className="mr-2 h-3 w-3" />
                    Track
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-estate-navy" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Toyota Camry (ABC-123) returned by Robert Wilson</span>
                </div>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center space-x-3">
                  <Fuel className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Honda Accord (XYZ-789) fuel level low - 25%</span>
                </div>
                <span className="text-xs text-muted-foreground">5 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-3">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Nissan Altima (DEF-456) scheduled for maintenance</span>
                </div>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CarAllocation;
