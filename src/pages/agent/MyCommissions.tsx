
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  IndianRupee, TrendingUp, Users, PieChart, Calendar, ChevronDown,
  Download, Filter, ArrowUpRight, FileText, Info
} from "lucide-react";
import { format } from "date-fns";

// Sample data
const commissionSummary = {
  totalEarned: "₹5,78,500",
  pendingAmount: "₹2,45,000",
  thisMonth: "₹85,000",
  lastMonth: "₹1,20,000",
  totalSales: 8,
  conversionRate: "42%"
};

const commissionHistory = [
  {
    id: "1",
    client: {
      name: "James Miller",
      avatar: "https://ui-avatars.com/api/?name=James+Miller&background=1A365D&color=fff",
    },
    property: {
      name: "Golden Heights Phase 2",
      unit: "A-1204",
      value: "₹1,25,00,000",
    },
    commissionAmount: "₹1,25,000",
    commissionPercent: "1.0%",
    saleDate: "2025-03-15T14:30:00",
    paymentDate: "2025-03-30T10:00:00",
    status: "paid",
  },
  {
    id: "2",
    client: {
      name: "Patricia Garcia",
      avatar: "https://ui-avatars.com/api/?name=Patricia+Garcia&background=718096&color=fff",
    },
    property: {
      name: "Skyline Towers",
      unit: "B-803",
      value: "₹95,00,000",
    },
    commissionAmount: "₹95,000",
    commissionPercent: "1.0%",
    saleDate: "2025-03-20T11:15:00",
    paymentDate: "2025-04-05T09:30:00", 
    status: "paid",
  },
  {
    id: "3",
    client: {
      name: "Susan Rodriguez",
      avatar: "https://ui-avatars.com/api/?name=Susan+Rodriguez&background=4299E1&color=fff",
    },
    property: {
      name: "Riverside Apartments",
      unit: "C-605",
      value: "₹85,00,000",
    },
    commissionAmount: "₹1,02,000",
    commissionPercent: "1.2%",
    saleDate: "2025-03-28T16:45:00",
    paymentDate: null,
    status: "pending",
  },
  {
    id: "4",
    client: {
      name: "Michael Johnson",
      avatar: "https://ui-avatars.com/api/?name=Michael+Johnson&background=38A169&color=fff",
    },
    property: {
      name: "Parkview Residences",
      unit: "D-1101",
      value: "₹1,45,00,000",
    },
    commissionAmount: "₹1,45,000",
    commissionPercent: "1.0%",
    saleDate: "2025-02-12T10:20:00",
    paymentDate: "2025-03-01T14:15:00",
    status: "paid",
  },
  {
    id: "5",
    client: {
      name: "Elizabeth Taylor",
      avatar: "https://ui-avatars.com/api/?name=Elizabeth+Taylor&background=ECC94B&color=fff",
    },
    property: {
      name: "Downtown Lofts",
      unit: "E-902",
      value: "₹1,10,00,000",
    },
    commissionAmount: "₹1,32,000",
    commissionPercent: "1.2%",
    saleDate: "2025-04-02T09:10:00",
    paymentDate: null,
    status: "pending",
  },
];

const monthlySummary = [
  { month: "January", sales: 2, amount: "₹1,35,000" },
  { month: "February", sales: 3, amount: "₹1,78,500" },
  { month: "March", sales: 3, amount: "₹2,65,000" },
  { month: "April", sales: 1, amount: "₹85,000" },
];

const MyCommissions = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCommission, setSelectedCommission] = useState<typeof commissionHistory[0] | null>(null);

  // Filter commissions based on tab
  const filteredCommissions = commissionHistory.filter(commission => {
    if (activeTab === "all") return true;
    return commission.status === activeTab;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Commissions</h1>
            <p className="text-muted-foreground">
              Track your earnings and payment history
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Commission Earned
              </CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{commissionSummary.totalEarned}</div>
              <p className="text-xs text-muted-foreground">
                From {commissionSummary.totalSales} property sales
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Payments
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{commissionSummary.pendingAmount}</div>
              <div className="flex items-center pt-1 text-estate-gold">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span className="text-xs">From 2 pending transactions</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                This Month
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{commissionSummary.thisMonth}</div>
              <div className="flex items-center pt-1 text-estate-success">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span className="text-xs">+12% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Earnings by Month</CardTitle>
            <CardDescription>
              Your commission earnings summary for the past 4 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <div className="grid grid-cols-4 gap-4 h-full">
                {monthlySummary.map((month, i) => {
                  // Calculate height percentage based on amount
                  const maxAmount = 265000; // Highest amount in data
                  const normalizedValue = parseInt(month.amount.replace(/[^\d]/g, '')) / maxAmount;
                  const barHeight = `${Math.max(normalizedValue * 80, 10)}%`;
                  
                  return (
                    <div key={i} className="flex flex-col items-center justify-end h-full">
                      <div 
                        className={`w-full max-w-[60px] bg-estate-navy rounded-t-md`} 
                        style={{ height: barHeight }}
                      ></div>
                      <div className="mt-2 text-center">
                        <p className="font-medium">{month.month}</p>
                        <p className="text-xs text-muted-foreground">{month.amount}</p>
                        <p className="text-xs text-muted-foreground">{month.sales} {month.sales === 1 ? 'sale' : 'sales'}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commission History</CardTitle>
            <CardDescription>
              Details of all your commission earnings to date
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead className="hidden md:table-cell">Sale Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCommissions.map((commission) => (
                      <TableRow key={commission.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={commission.client.avatar} />
                              <AvatarFallback>{commission.client.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{commission.client.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{commission.property.name}</p>
                            <p className="text-xs text-muted-foreground">Unit: {commission.property.unit}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{commission.commissionAmount}</p>
                            <p className="text-xs text-muted-foreground">
                              {commission.commissionPercent} of {commission.property.value}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {format(new Date(commission.saleDate), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            commission.status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }>
                            {commission.status === "paid" ? "Paid" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedCommission(commission)}
                          >
                            <Info className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              Showing {filteredCommissions.length} of {commissionHistory.length} transactions
            </div>
          </CardFooter>
        </Card>

        {/* Commission Details Dialog */}
        {selectedCommission && (
          <Dialog open={!!selectedCommission} onOpenChange={() => setSelectedCommission(null)}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Commission Details</DialogTitle>
                <DialogDescription>
                  Sale transaction information and payment details
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedCommission.client.avatar} />
                      <AvatarFallback>{selectedCommission.client.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedCommission.client.name}</p>
                      <p className="text-sm text-muted-foreground">Client</p>
                    </div>
                  </div>
                  <Badge className={
                    selectedCommission.status === "paid" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }>
                    {selectedCommission.status === "paid" ? "Paid" : "Pending"}
                  </Badge>
                </div>

                <div className="border-t border-b py-4">
                  <h3 className="font-medium mb-3">Property Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Property</p>
                      <p className="font-medium">{selectedCommission.property.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Unit</p>
                      <p className="font-medium">{selectedCommission.property.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sale Value</p>
                      <p className="font-medium">{selectedCommission.property.value}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sale Date</p>
                      <p className="font-medium">
                        {format(new Date(selectedCommission.saleDate), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-medium mb-3">Commission Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Commission Rate</p>
                      <p className="font-medium">{selectedCommission.commissionPercent}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Commission Amount</p>
                      <p className="font-medium">{selectedCommission.commissionAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Status</p>
                      <p className="font-medium">
                        {selectedCommission.status === "paid" ? "Paid" : "Pending"}
                      </p>
                    </div>
                    {selectedCommission.paymentDate && (
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Date</p>
                        <p className="font-medium">
                          {format(new Date(selectedCommission.paymentDate), "MMMM d, yyyy")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    Transaction ID: CSK-COM-{selectedCommission.id}
                  </p>
                  {selectedCommission.status === "pending" && (
                    <p className="text-sm text-estate-gold">
                      Expected payment by {format(
                        new Date(new Date(selectedCommission.saleDate).getTime() + 15 * 24 * 60 * 60 * 1000), 
                        "MMMM d, yyyy"
                      )}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedCommission(null)}>Close</Button>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  View Invoice
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </MainLayout>
  );
};

export default MyCommissions;
