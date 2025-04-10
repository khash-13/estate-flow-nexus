
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Filter, Search, Plus, MoreHorizontal, Calendar, 
  PhoneCall, Mail, MapPin, FileText, ChevronRight
} from "lucide-react";

const leadData = [
  {
    id: "1",
    name: "James Miller",
    email: "james.miller@example.com",
    phone: "+1 555-123-4567",
    status: "hot",
    source: "Website",
    property: "Golden Heights Phase 2",
    lastContact: "Today",
    notes: "Interested in 3BHK units, budget around $500,000",
  },
  {
    id: "2",
    name: "Patricia Garcia",
    email: "patricia.garcia@example.com",
    phone: "+1 555-234-5678",
    status: "warm",
    source: "Referral",
    property: "Skyline Towers",
    lastContact: "Yesterday",
    notes: "Looking for investment property, prefers city center location",
  },
  {
    id: "3",
    name: "Susan Rodriguez",
    email: "susan.r@example.com",
    phone: "+1 555-345-6789",
    status: "warm",
    source: "Property Exhibition",
    property: "Riverside Apartments",
    lastContact: "2 days ago",
    notes: "Wants to move in within 3 months, needs financing options",
  },
  {
    id: "4",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    phone: "+1 555-456-7890",
    status: "cold",
    source: "Social Media",
    property: "Parkview Residences",
    lastContact: "1 week ago",
    notes: "Initial inquiry only, follow up needed to qualify better",
  },
  {
    id: "5",
    name: "Elizabeth Taylor",
    email: "elizabeth.t@example.com",
    phone: "+1 555-567-8901",
    status: "hot",
    source: "Property Portal",
    property: "Downtown Lofts",
    lastContact: "3 days ago",
    notes: "Ready to make a decision soon, requested additional floor plans",
  }
];

const LeadManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedLead, setSelectedLead] = useState<typeof leadData[0] | null>(null);

  // Filter leads based on search and tab
  const filteredLeads = leadData.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.property.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && lead.status === activeTab;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Lead Management</h1>
            <p className="text-muted-foreground">Track and manage your sales leads</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Lead
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Lead</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new lead. All fields marked with * are required.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name *</label>
                      <Input id="name" placeholder="Full name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email *</label>
                      <Input id="email" type="email" placeholder="Email address" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Phone *</label>
                      <Input id="phone" placeholder="Phone number" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="source" className="text-sm font-medium">Source *</label>
                      <Input id="source" placeholder="Lead source" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="property" className="text-sm font-medium">Property Interest</label>
                    <Input id="property" placeholder="Property of interest" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-medium">Notes</label>
                    <Input id="notes" placeholder="Additional notes" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Lead</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader className="p-4 pb-0">
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Leads</TabsTrigger>
                <TabsTrigger value="hot">Hot</TabsTrigger>
                <TabsTrigger value="warm">Warm</TabsTrigger>
                <TabsTrigger value="cold">Cold</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Property</TableHead>
                  <TableHead className="hidden md:table-cell">Last Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => {
                  const statusColors = {
                    hot: "bg-estate-error/20 text-estate-error",
                    warm: "bg-estate-gold/20 text-estate-gold",
                    cold: "bg-estate-teal/20 text-estate-teal",
                  };

                  return (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={`https://ui-avatars.com/api/?name=${lead.name.replace(' ', '+')}&background=1A365D&color=fff`} />
                            <AvatarFallback>{lead.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{lead.name}</p>
                            <p className="text-xs text-muted-foreground">{lead.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[lead.status as keyof typeof statusColors]}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{lead.property}</TableCell>
                      <TableCell className="hidden md:table-cell">{lead.lastContact}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setSelectedLead(lead)}>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <PhoneCall className="mr-2 h-4 w-4" /> Call
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" /> Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" /> Schedule Visit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" /> View Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between p-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredLeads.length}</strong> of <strong>{leadData.length}</strong> leads
            </div>
          </CardFooter>
        </Card>

        {/* Lead Detail Dialog */}
        {selectedLead && (
          <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Lead Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${selectedLead.name.replace(' ', '+')}&background=1A365D&color=fff&size=60`} />
                    <AvatarFallback>{selectedLead.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{selectedLead.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedLead.source} • Added on June 10, 2023
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Contact Information</p>
                    <div className="text-sm flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{selectedLead.email}</span>
                    </div>
                    <div className="text-sm flex items-center gap-2">
                      <PhoneCall className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{selectedLead.phone}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Property Interest</p>
                    <div className="text-sm flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{selectedLead.property}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Notes</p>
                  <p className="text-sm">{selectedLead.notes}</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedLead(null)}>Close</Button>
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Site Visit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </MainLayout>
  );
};

export default LeadManagement;
