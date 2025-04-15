
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Search, Filter, Plus, MoreHorizontal, Calendar, FilePenLine, Receipt,
  FileCheck, FileX, Clock, ArrowDownToLine, Eye, FileText
} from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface Invoice {
  id: string;
  invoice_number: string;
  project: string;
  unit: string;
  amount: number;
  date: string;
  due_date: string;
  status: 'draft' | 'submitted' | 'approved' | 'paid' | 'rejected';
  tasks: number;
  materials: boolean;
  labor: boolean;
}

const invoices: Invoice[] = [
  {
    id: "inv1",
    invoice_number: "INV-2025-001",
    project: "Riverside Tower",
    unit: "Block A",
    amount: 185000,
    date: "2025-03-15",
    due_date: "2025-04-14",
    status: "approved",
    tasks: 12,
    materials: true,
    labor: true
  },
  {
    id: "inv2",
    invoice_number: "INV-2025-002",
    project: "Valley Heights",
    unit: "Unit 3",
    amount: 92500,
    date: "2025-03-25",
    due_date: "2025-04-24",
    status: "submitted",
    tasks: 8,
    materials: true,
    labor: true
  },
  {
    id: "inv3",
    invoice_number: "INV-2025-003",
    project: "Green Villa",
    unit: "Villa 2",
    amount: 45000,
    date: "2025-04-01",
    due_date: "2025-05-01",
    status: "draft",
    tasks: 5,
    materials: true,
    labor: false
  },
  {
    id: "inv4",
    invoice_number: "INV-2025-004",
    project: "Riverside Tower",
    unit: "Block B",
    amount: 78500,
    date: "2025-04-05",
    due_date: "2025-05-05",
    status: "paid",
    tasks: 7,
    materials: false,
    labor: true
  },
  {
    id: "inv5",
    invoice_number: "INV-2025-005",
    project: "Valley Heights",
    unit: "Unit 4",
    amount: 64000,
    date: "2025-03-20",
    due_date: "2025-04-19",
    status: "rejected",
    tasks: 6,
    materials: true,
    labor: true
  }
];

const monthlyRevenueData = [
  { name: 'Jan', amount: 225000 },
  { name: 'Feb', amount: 310000 },
  { name: 'Mar', amount: 420500 },
  { name: 'Apr', amount: 185000 },
  { name: 'May', amount: 0 },
  { name: 'Jun', amount: 0 },
];

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  submitted: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  paid: 'bg-purple-100 text-purple-800',
  rejected: 'bg-red-100 text-red-800'
};

const statusIcons: Record<string, React.ReactNode> = {
  draft: <FilePenLine className="h-3 w-3 mr-1" />,
  submitted: <FileText className="h-3 w-3 mr-1" />,
  approved: <FileCheck className="h-3 w-3 mr-1" />,
  paid: <Receipt className="h-3 w-3 mr-1" />,
  rejected: <FileX className="h-3 w-3 mr-1" />
};

const ContractorInvoices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = searchQuery === '' || 
      invoice.invoice_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.project.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === '' || invoice.status === statusFilter;
    const matchesProject = projectFilter === '' || invoice.project === projectFilter;
    
    return matchesSearch && matchesStatus && matchesProject;
  });
  
  // Extract unique projects for filters
  const projects = Array.from(new Set(invoices.map(i => i.project)));
  
  // Calculate total invoice values by status
  const totalInvoiced = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalPaid = invoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalPending = invoices
    .filter(invoice => ['submitted', 'approved'].includes(invoice.status))
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoiced</CardTitle>
            <Receipt className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalInvoiced.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From {invoices.length} invoices</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Received</CardTitle>
            <FileCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalPaid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{((totalPaid/totalInvoiced) * 100).toFixed(0)}% of total invoiced</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payment</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{((totalPending/totalInvoiced) * 100).toFixed(0)}% of total invoiced</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Due</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyRevenueData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#4338ca" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-fit">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>{statusFilter || 'Status'}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-fit">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>{projectFilter || 'Project'}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Projects</SelectItem>
              {projects.map(project => (
                <SelectItem key={project} value={project}>{project}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Project / Unit</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">
                  {invoice.invoice_number}
                </TableCell>
                <TableCell>
                  <div>
                    {invoice.project}
                    <div className="text-xs text-muted-foreground">{invoice.unit}</div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">₹{invoice.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[invoice.status]}>
                    {statusIcons[invoice.status]}
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-xs">
                    <div>
                      <span className="text-muted-foreground">Created:</span>{" "}
                      {new Date(invoice.date).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Due:</span>{" "}
                      {new Date(invoice.due_date).toLocaleDateString()}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-xs">
                    <div className="mb-1">
                      <span className="font-medium">{invoice.tasks} tasks</span>
                    </div>
                    <div className="space-x-1">
                      {invoice.materials && (
                        <Badge variant="secondary" className="text-xs">Materials</Badge>
                      )}
                      {invoice.labor && (
                        <Badge variant="secondary" className="text-xs">Labor</Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-1">
                    <Button variant="ghost" size="icon" asChild>
                      <span className="cursor-pointer">
                        <Eye className="h-4 w-4" />
                      </span>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <span className="cursor-pointer">
                        <ArrowDownToLine className="h-4 w-4" />
                      </span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Invoice</DropdownMenuItem>
                        <DropdownMenuItem>Download PDF</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContractorInvoices;
