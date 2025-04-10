
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, MapPin, UserCircle, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, isSameDay, subDays } from "date-fns";

// Sample appointment data
const appointments = [
  {
    id: "1",
    title: "Site visit with Patricia Garcia",
    type: "site_visit",
    client: {
      name: "Patricia Garcia",
      avatar: "https://ui-avatars.com/api/?name=Patricia+Garcia&background=718096&color=fff",
    },
    property: "Skyline Towers",
    startTime: new Date(2025, 3, 10, 10, 30),
    endTime: new Date(2025, 3, 10, 12, 0),
    location: "123 Main Street, City Center",
    notes: "Client interested in 2BHK units on higher floors",
    status: "confirmed",
  },
  {
    id: "2",
    title: "Client consultation with Michael Johnson",
    type: "consultation",
    client: {
      name: "Michael Johnson",
      avatar: "https://ui-avatars.com/api/?name=Michael+Johnson&background=38A169&color=fff",
    },
    property: "Parkview Residences",
    startTime: new Date(2025, 3, 10, 14, 0),
    endTime: new Date(2025, 3, 10, 15, 0),
    location: "Office",
    notes: "Initial discussion about requirements and budget",
    status: "confirmed",
  },
  {
    id: "3",
    title: "Document signing with Susan Rodriguez",
    type: "document",
    client: {
      name: "Susan Rodriguez",
      avatar: "https://ui-avatars.com/api/?name=Susan+Rodriguez&background=4299E1&color=fff",
    },
    property: "Riverside Apartments",
    startTime: new Date(2025, 3, 11, 11, 0),
    endTime: new Date(2025, 3, 11, 12, 30),
    location: "Office",
    notes: "Sales agreement signing",
    status: "pending",
  },
  {
    id: "4",
    title: "Site visit with James Miller",
    type: "site_visit",
    client: {
      name: "James Miller",
      avatar: "https://ui-avatars.com/api/?name=James+Miller&background=1A365D&color=fff",
    },
    property: "Golden Heights Phase 2",
    startTime: new Date(2025, 3, 12, 9, 0),
    endTime: new Date(2025, 3, 12, 11, 0),
    location: "456 Park Avenue, Suburb",
    notes: "Client specifically interested in corner units",
    status: "confirmed",
  },
  {
    id: "5",
    title: "Team meeting",
    type: "meeting",
    startTime: new Date(2025, 3, 12, 15, 0),
    endTime: new Date(2025, 3, 12, 16, 0),
    location: "Conference Room",
    notes: "Weekly sales team catch-up",
    status: "confirmed",
  }
];

const MySchedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 3, 10)); // Using April 10, 2025
  const [view, setView] = useState<"day" | "calendar">("day");

  // Get today's appointments
  const todaysAppointments = appointments.filter(appointment => 
    date ? isSameDay(appointment.startTime, date) : false
  );

  const handlePreviousDay = () => {
    if (date) setDate(subDays(date, 1));
  };

  const handleNextDay = () => {
    if (date) setDate(addDays(date, 1));
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Schedule</h1>
            <p className="text-muted-foreground">
              Manage your appointments and meetings
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
              />
              <div className="flex justify-between w-full mt-4">
                <Button variant="outline" onClick={() => setView("calendar")}>
                  Month View
                </Button>
                <Button variant="outline" onClick={() => setView("day")}>
                  Day View
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Appointments for the selected day */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <CardTitle>
                  {date ? format(date, "EEEE, MMMM do, yyyy") : "Schedule"}
                </CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handlePreviousDay}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleNextDay}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {todaysAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No appointments scheduled for this day</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {todaysAppointments.map((appointment) => {
                    const typeIcons = {
                      site_visit: <MapPin className="h-4 w-4" />,
                      consultation: <UserCircle className="h-4 w-4" />,
                      document: <CalendarIcon className="h-4 w-4" />,
                      meeting: <UserCircle className="h-4 w-4" />,
                    };
                    
                    const typeColors = {
                      site_visit: "bg-estate-teal/20 text-estate-teal",
                      consultation: "bg-estate-navy/20 text-estate-navy",
                      document: "bg-estate-gold/20 text-estate-gold",
                      meeting: "bg-estate-success/20 text-estate-success",
                    };

                    const statusColors = {
                      confirmed: "bg-green-100 text-green-800",
                      pending: "bg-yellow-100 text-yellow-800",
                      cancelled: "bg-red-100 text-red-800",
                    };

                    return (
                      <div key={appointment.id} className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col items-center justify-center w-16 text-center">
                          <span className="text-sm font-medium">
                            {format(appointment.startTime, "h:mm")}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {format(appointment.startTime, "a")}
                          </span>
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h3 className="font-medium">{appointment.title}</h3>
                            <Badge className={statusColors[appointment.status as keyof typeof statusColors]}>
                              {appointment.status}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              <span>
                                {format(appointment.startTime, "h:mm a")} - {format(appointment.endTime, "h:mm a")}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-3 w-3" />
                              <span>{appointment.location}</span>
                            </div>
                          </div>

                          {appointment.client && (
                            <div className="flex items-center mt-2 gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={appointment.client.avatar} />
                                <AvatarFallback>{appointment.client.name[0]}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{appointment.client.name}</span>
                              {appointment.property && (
                                <>
                                  <span className="text-muted-foreground mx-1">•</span>
                                  <span className="text-sm">{appointment.property}</span>
                                </>
                              )}
                            </div>
                          )}

                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className={typeColors[appointment.type as keyof typeof typeColors]}>
                              <span className="flex items-center">
                                {typeIcons[appointment.type as keyof typeof typeIcons]}
                                <span className="ml-1 capitalize">
                                  {appointment.type.replace('_', ' ')}
                                </span>
                              </span>
                            </Badge>

                            <div className="flex-1"></div>

                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Reschedule</Button>
                              <Button variant="outline" size="sm">Details</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default MySchedule;
