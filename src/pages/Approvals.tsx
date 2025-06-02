
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  CheckSquare, Clock, X, Check, Calendar, MapPin,
  DollarSign, FileText, AlertCircle, Eye
} from "lucide-react";
import { useState } from "react";

const pendingApprovals = [
  {
    id: "1",
    type: "site_visit",
    title: "Site Visit Request",
    description: "Golden Heights Phase 2 - Client Meeting",
    requestedBy: {
      name: "Robert Wilson",
      avatar: "https://ui-avatars.com/api/?name=Robert+Wilson&background=38A169&color=fff",
      role: "Senior Agent"
    },
    details: {
      client: "James Miller",
      property: "Golden Heights Phase 2",
      date: "2024-06-05",
      time: "2:00 PM",
      reason: "Client interested in viewing the property for potential purchase"
    },
    requestedAt: "2 hours ago",
    priority: "high"
  },
  {
    id: "2",
    type: "expense",
    title: "Expense Reimbursement",
    description: "Client entertainment and travel costs",
    requestedBy: {
      name: "Lisa Anderson",
      avatar: "https://ui-avatars.com/api/?name=Lisa+Anderson&background=9F7AEA&color=fff",
      role: "Junior Agent"
    },
    details: {
      amount: 250,
      category: "Client Entertainment",
      date: "2024-06-01",
      receipts: 3,
      description: "Lunch meeting with potential buyers at Riverside Apartments"
    },
    requestedAt: "4 hours ago",
    priority: "medium"
  },
  {
    id: "3",
    type: "leave",
    title: "Leave Request",
    description: "Personal leave for 2 days",
    requestedBy: {
      name: "David Thompson",
      avatar: "https://ui-avatars.com/api/?name=David+Thompson&background=1A365D&color=fff",
      role: "Agent"
    },
    details: {
      startDate: "2024-06-10",
      endDate: "2024-06-11",
      type: "Personal",
      reason: "Family emergency"
    },
    requestedAt: "1 day ago",
    priority: "low"
  }
];

const approvedRequests = [
  {
    id: "4",
    type: "site_visit",
    title: "Site Visit - Approved",
    description: "Skyline Towers inspection",
    requestedBy: {
      name: "Robert Wilson",
      avatar: "https://ui-avatars.com/api/?name=Robert+Wilson&background=38A169&color=fff",
      role: "Senior Agent"
    },
    approvedAt: "Yesterday",
    approvedBy: "You"
  },
  {
    id: "5",
    type: "expense",
    title: "Marketing Budget - Approved",
    description: "$500 for property brochures",
    requestedBy: {
      name: "Lisa Anderson",
      avatar: "https://ui-avatars.com/api/?name=Lisa+Anderson&background=9F7AEA&color=fff",
      role: "Junior Agent"
    },
    approvedAt: "2 days ago",
    approvedBy: "You"
  }
];

const Approvals = () => {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "site_visit": return <MapPin className="h-4 w-4" />;
      case "expense": return <DollarSign className="h-4 w-4" />;
      case "leave": return <Calendar className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "site_visit": return "bg-blue-100 text-blue-800";
      case "expense": return "bg-green-100 text-green-800";
      case "leave": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Approvals</h1>
          <p className="text-muted-foreground">
            Review and manage team approval requests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{pendingApprovals.length}</span>
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                High Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">
                  {pendingApprovals.filter(r => r.priority === "high").length}
                </span>
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Approved Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">2</span>
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Response Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">4h</span>
                <CheckSquare className="h-6 w-6 text-estate-navy" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending ({pendingApprovals.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingApprovals.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={request.requestedBy.avatar} />
                        <AvatarFallback>{request.requestedBy.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{request.title}</h3>
                          <Badge className={getTypeColor(request.type)}>
                            {getTypeIcon(request.type)}
                            <span className="ml-1 capitalize">{request.type.replace('_', ' ')}</span>
                          </Badge>
                          <Badge className={getPriorityColor(request.priority)}>
                            {request.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {request.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Requested by: {request.requestedBy.name}</span>
                          <span>•</span>
                          <span>{request.requestedAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedRequest(request)}
                          >
                            <Eye className="mr-1 h-3 w-3" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{request.title}</DialogTitle>
                            <DialogDescription>
                              Review request details and take action
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Requested By</Label>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={request.requestedBy.avatar} />
                                    <AvatarFallback>{request.requestedBy.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm">{request.requestedBy.name}</span>
                                </div>
                              </div>
                              <div>
                                <Label>Request Time</Label>
                                <p className="text-sm mt-1">{request.requestedAt}</p>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Details</Label>
                              <div className="p-3 bg-muted rounded-lg space-y-2">
                                {Object.entries(request.details).map(([key, value]) => (
                                  <div key={key} className="flex justify-between text-sm">
                                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                    <span className="font-medium">{value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="approval-notes">Approval Notes (Optional)</Label>
                              <Textarea 
                                id="approval-notes"
                                placeholder="Add any notes or conditions..."
                              />
                            </div>

                            <div className="flex space-x-2">
                              <Button variant="outline" className="flex-1 text-red-600 border-red-200">
                                <X className="mr-2 h-4 w-4" />
                                Reject
                              </Button>
                              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                                <Check className="mr-2 h-4 w-4" />
                                Approve
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <X className="mr-1 h-3 w-3" />
                        Reject
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Check className="mr-1 h-3 w-3" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {approvedRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={request.requestedBy.avatar} />
                        <AvatarFallback>{request.requestedBy.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{request.title}</h3>
                          <Badge className="bg-green-100 text-green-800">
                            <Check className="h-3 w-3 mr-1" />
                            Approved
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {request.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Approved by: {request.approvedBy}</span>
                          <span>•</span>
                          <span>{request.approvedAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="rejected">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No rejected requests found.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Approvals;
