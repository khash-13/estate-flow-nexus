
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Search, Plus, BadgeIndianRupee, FileText, ArrowDown, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample invoices data
const initialInvoices = [
  {
    id: "INV-2023-001",
    to: "CSK Realtors Ltd.",
    project: "Skyline Towers Construction",
    issueDate: "2023-06-15",
    dueDate: "2023-07-15",
    amount: 250000,
    gst: 18,
    totalAmount: 295000,
    status: "Paid",
    paymentDate: "2023-07-10",
  },
  {
    id: "INV-2023-002",
    to: "CSK Realtors Ltd.",
    project: "Green Valley Villas Phase 1",
    issueDate: "2023-06-25",
    dueDate: "2023-07-25",
    amount: 180000,
    gst: 18,
    totalAmount: 212400,
    status: "Paid",
    paymentDate: "2023-07-20",
  },
  {
    id: "INV-2023-003",
    to: "CSK Realtors Ltd.",
    project: "Skyline Towers Construction",
    issueDate: "2023-07-15",
    dueDate: "2023-08-15",
    amount: 320000,
    gst: 18,
    totalAmount: 377600,
    status: "Pending",
    paymentDate: null,
  },
  {
    id: "INV-2023-004",
    to: "CSK Realtors Ltd.",
    project: "Green Valley Villas Phase 1",
    issueDate: "2023-07-25",
    dueDate: "2023-08-25",
    amount: 220000,
    gst: 18,
    totalAmount: 259600,
    status: "Overdue",
    paymentDate: null,
  },
  {
    id: "INV-2023-005",
    to: "CSK Realtors Ltd.",
    project: "Riverside Apartments Foundation",
    issueDate: "2023-08-10",
    dueDate: "2023-09-10",
    amount: 150000,
    gst: 18,
    totalAmount: 177000,
    status: "Draft",
    paymentDate: null,
  },
];

// Sample invoice items
const sampleInvoiceItems = [
  {
    id: "1",
    description: "Foundation Work",
    quantity: 1,
    unit: "Job",
    rate: 120000,
    amount: 120000,
    taxRate: 18,
  },
  {
    id: "2",
    description: "Masonry Labor - Level 1",
    quantity: 45,
    unit: "Days",
    rate: 2000,
    amount: 90000,
    taxRate: 18,
  },
  {
    id: "3",
    description: "Electrical Wiring Installation",
    quantity: 1,
    unit: "Job",
    rate: 40000,
    amount: 40000,
    taxRate: 18,
  },
];

// Form schema
const invoiceSchema = z.object({
  to: z.string().min(2, "Client name is required"),
  project: z.string().min(2, "Project is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  gst: z.coerce.number().min(0, "GST rate must be positive").max(28, "GST rate cannot exceed 28%"),
  notes: z.string().optional(),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

// Invoice item schema
const invoiceItemSchema = z.object({
  description: z.string().min(2, "Description is required"),
  quantity: z.coerce.number().positive("Quantity must be positive"),
  unit: z.string().min(1, "Unit is required"),
  rate: z.coerce.number().positive("Rate must be positive"),
  taxRate: z.coerce.number().min(0, "Tax rate must be positive").max(28, "Tax rate cannot exceed 28%"),
});

type InvoiceItemFormValues = z.infer<typeof invoiceItemSchema>;

const ContractorInvoices = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewInvoiceDialogOpen, setViewInvoiceDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [invoiceItems, setInvoiceItems] = useState<any[]>([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      to: "CSK Realtors Ltd.",
      project: "Skyline Towers Construction",
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      gst: 18,
    },
  });

  const itemForm = useForm<InvoiceItemFormValues>({
    resolver: zodResolver(invoiceItemSchema),
    defaultValues: {
      unit: "Job",
      taxRate: 18,
    },
  });

  // Sample project list
  const projects = [
    "Skyline Towers Construction",
    "Green Valley Villas Phase 1",
    "Riverside Apartments Foundation",
  ];

  const handleSubmit = (data: InvoiceFormValues) => {
    if (invoiceItems.length === 0) {
      toast.error("Please add at least one item to the invoice");
      return;
    }

    // Calculate totals
    const subtotal = invoiceItems.reduce((total, item) => total + item.amount, 0);
    const gstAmount = subtotal * (data.gst / 100);
    const totalAmount = subtotal + gstAmount;
    
    // Create new invoice
    const newInvoice = {
      ...data,
      id: `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, '0')}`,
      amount: subtotal,
      totalAmount,
      status: "Draft" as const,
      paymentDate: null,
    };
    
    setInvoices([...invoices, newInvoice]);
    toast.success("Invoice created successfully");
    form.reset();
    setInvoiceItems([]);
    setCreateDialogOpen(false);
  };

  const addInvoiceItem = (data: InvoiceItemFormValues) => {
    const amount = data.quantity * data.rate;
    const newItem = {
      ...data,
      id: (invoiceItems.length + 1).toString(),
      amount,
    };
    
    setInvoiceItems([...invoiceItems, newItem]);
    itemForm.reset({
      unit: "Job",
      taxRate: 18,
    });
    setShowAddItem(false);
    toast.success("Item added to invoice");
  };

  const removeInvoiceItem = (id: string) => {
    setInvoiceItems(invoiceItems.filter(item => item.id !== id));
  };

  const viewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setViewInvoiceDialogOpen(true);
  };

  // Filter invoices based on search and active tab
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.project.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "paid") return matchesSearch && invoice.status === "Paid";
    if (activeTab === "pending") return matchesSearch && invoice.status === "Pending";
    if (activeTab === "overdue") return matchesSearch && invoice.status === "Overdue";
    if (activeTab === "draft") return matchesSearch && invoice.status === "Draft";
    
    return matchesSearch;
  });

  // Calculate statistics
  const totalInvoiceAmount = invoices.reduce((total, invoice) => total + invoice.totalAmount, 0);
  const paidInvoicesAmount = invoices
    .filter(invoice => invoice.status === "Paid")
    .reduce((total, invoice) => total + invoice.totalAmount, 0);
  const pendingInvoicesAmount = invoices
    .filter(invoice => invoice.status === "Pending" || invoice.status === "Overdue")
    .reduce((total, invoice) => total + invoice.totalAmount, 0);
  
  // Calculate subtotal of current invoice items
  const currentSubtotal = invoiceItems.reduce((total, item) => total + item.amount, 0);
  const currentGst = currentSubtotal * (form.watch("gst") / 100);
  const currentTotal = currentSubtotal + currentGst;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Invoiced</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BadgeIndianRupee className="h-4 w-4 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{totalInvoiceAmount.toLocaleString()}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              From {invoices.length} invoices
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BadgeIndianRupee className="h-4 w-4 text-green-500 mr-2" />
              <div className="text-2xl font-bold">{paidInvoicesAmount.toLocaleString()}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {invoices.filter(i => i.status === "Paid").length} invoices paid
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BadgeIndianRupee className="h-4 w-4 text-amber-500 mr-2" />
              <div className="text-2xl font-bold">{pendingInvoicesAmount.toLocaleString()}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {invoices.filter(i => i.status === "Pending" || i.status === "Overdue").length} invoices pending
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices by ID, project..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => {
          setCreateDialogOpen(true);
          setInvoiceItems([]);
        }}>
          <Plus className="mr-2 h-4 w-4" /> Create Invoice
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 w-[500px]">
            <TabsTrigger value="all">All Invoices</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount (₹)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No invoices found.
                </TableCell>
              </TableRow>
            ) : (
              filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={invoice.project}>
                    {invoice.project}
                  </TableCell>
                  <TableCell>{invoice.issueDate}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                      {invoice.totalAmount.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invoice.status === "Paid"
                          ? "default"
                          : invoice.status === "Overdue"
                          ? "destructive"
                          : invoice.status === "Draft"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => viewInvoice(invoice)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create Invoice Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-medium mb-2">Invoice Details</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="to"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client</FormLabel>
                          <FormControl>
                            <Input placeholder="Client name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="project"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select project" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {projects.map((project) => (
                                <SelectItem key={project} value={project}>
                                  {project}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium mb-2">Dates & GST</h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="issueDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issue Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Due Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gst"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GST Rate (%)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select GST Rate" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="0">0% - Exempt</SelectItem>
                              <SelectItem value="5">5% - GST</SelectItem>
                              <SelectItem value="12">12% - GST</SelectItem>
                              <SelectItem value="18">18% - GST</SelectItem>
                              <SelectItem value="28">28% - GST</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-medium">Invoice Items</h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowAddItem(true)}
                    disabled={showAddItem}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                  </Button>
                </div>

                {/* Add invoice item form */}
                {showAddItem && (
                  <Card className="p-4">
                    <Form {...itemForm}>
                      <form onSubmit={itemForm.handleSubmit(addInvoiceItem)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={itemForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Input placeholder="Item description" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={itemForm.control}
                              name="quantity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Quantity</FormLabel>
                                  <FormControl>
                                    <Input type="number" min="1" step="1" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={itemForm.control}
                              name="unit"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Unit</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select unit" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Job">Job</SelectItem>
                                      <SelectItem value="Day">Day</SelectItem>
                                      <SelectItem value="Hour">Hour</SelectItem>
                                      <SelectItem value="Sq. ft.">Sq. ft.</SelectItem>
                                      <SelectItem value="Piece">Piece</SelectItem>
                                      <SelectItem value="Unit">Unit</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={itemForm.control}
                            name="rate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Rate (₹)</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <BadgeIndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input className="pl-10" type="number" min="0" step="1" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={itemForm.control}
                            name="taxRate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tax Rate (%)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select tax rate" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="0">0% - Exempt</SelectItem>
                                    <SelectItem value="5">5% - GST</SelectItem>
                                    <SelectItem value="12">12% - GST</SelectItem>
                                    <SelectItem value="18">18% - GST</SelectItem>
                                    <SelectItem value="28">28% - GST</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowAddItem(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit">Add Item</Button>
                        </div>
                      </form>
                    </Form>
                  </Card>
                )}

                {/* Invoice items table */}
                <div className="border rounded-md overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Rate (₹)</TableHead>
                        <TableHead>Amount (₹)</TableHead>
                        <TableHead>Tax Rate</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoiceItems.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-16 text-center text-muted-foreground">
                            No items added yet. Click "Add Item" to add invoice items.
                          </TableCell>
                        </TableRow>
                      ) : (
                        invoiceItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>
                              {item.quantity} {item.unit}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                                {item.rate.toLocaleString()}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                                {item.amount.toLocaleString()}
                              </div>
                            </TableCell>
                            <TableCell>{item.taxRate}%</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeInvoiceItem(item.id)}
                              >
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Invoice summary */}
                {invoiceItems.length > 0 && (
                  <div className="flex justify-end">
                    <div className="w-full max-w-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span className="flex items-center font-medium">
                          <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                          {currentSubtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">GST ({form.watch("gst")}%):</span>
                        <span className="flex items-center font-medium">
                          <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                          {currentGst.toLocaleString()}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="font-medium">Total:</span>
                        <span className="flex items-center font-bold">
                          <BadgeIndianRupee className="h-4 w-4 mr-1" />
                          {currentTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter notes or payment instructions"
                        className="min-h-[80px]"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={invoiceItems.length === 0}>
                  Create Invoice
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* View Invoice Dialog */}
      {selectedInvoice && (
        <Dialog open={viewInvoiceDialogOpen} onOpenChange={setViewInvoiceDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>Invoice #{selectedInvoice.id}</span>
                <Badge
                  variant={
                    selectedInvoice.status === "Paid"
                      ? "default"
                      : selectedInvoice.status === "Overdue"
                      ? "destructive"
                      : selectedInvoice.status === "Draft"
                      ? "outline"
                      : "secondary"
                  }
                >
                  {selectedInvoice.status}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Billed To</h3>
                  <p className="font-medium">{selectedInvoice.to}</p>
                  <p className="text-muted-foreground mt-1">Project: {selectedInvoice.project}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Invoice Date:</span>
                    <span>{selectedInvoice.issueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Due Date:</span>
                    <span>{selectedInvoice.dueDate}</span>
                  </div>
                  {selectedInvoice.status === "Paid" && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Payment Date:</span>
                      <span>{selectedInvoice.paymentDate}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-base font-medium">Invoice Items</h3>
                <div className="border rounded-md overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Rate (₹)</TableHead>
                        <TableHead className="text-right">Amount (₹)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleInvoiceItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>
                            {item.quantity} {item.unit}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                              {item.rate.toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                              {item.amount.toLocaleString()}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-end">
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="flex items-center font-medium">
                        <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                        {selectedInvoice.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GST ({selectedInvoice.gst}%):</span>
                      <span className="flex items-center font-medium">
                        <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                        {(selectedInvoice.amount * (selectedInvoice.gst / 100)).toLocaleString()}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="font-medium">Total:</span>
                      <span className="flex items-center font-bold">
                        <BadgeIndianRupee className="h-4 w-4 mr-1" />
                        {selectedInvoice.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <h3 className="text-base font-medium">Payment Status</h3>
                <div className="bg-muted p-4 rounded-md">
                  {selectedInvoice.status === "Paid" ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <div>
                        <p className="font-medium">Paid on {selectedInvoice.paymentDate}</p>
                        <p className="text-sm">Thank you for your payment</p>
                      </div>
                    </div>
                  ) : selectedInvoice.status === "Overdue" ? (
                    <div className="flex items-center text-red-600">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <div>
                        <p className="font-medium">Payment Overdue</p>
                        <p className="text-sm">This invoice is past the due date</p>
                      </div>
                    </div>
                  ) : selectedInvoice.status === "Draft" ? (
                    <div className="flex items-center text-muted-foreground">
                      <FileText className="h-5 w-5 mr-2" />
                      <div>
                        <p className="font-medium">Draft Invoice</p>
                        <p className="text-sm">This invoice has not been finalized</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center text-amber-600">
                      <Clock className="h-5 w-5 mr-2" />
                      <div>
                        <p className="font-medium">Payment Pending</p>
                        <p className="text-sm">Due on {selectedInvoice.dueDate}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between space-x-2 pt-4">
                <Button variant="outline">
                  Download PDF
                </Button>
                {selectedInvoice.status === "Draft" && (
                  <Button>
                    Finalize & Send
                  </Button>
                )}
                {selectedInvoice.status === "Pending" && (
                  <Button>
                    Mark as Paid
                  </Button>
                )}
                {selectedInvoice.status === "Overdue" && (
                  <Button>
                    Send Reminder
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ContractorInvoices;
