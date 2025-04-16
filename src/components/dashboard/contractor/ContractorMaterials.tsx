
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Search, Plus, BadgeIndianRupee, FileText, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample material data
const initialMaterials = [
  {
    id: "1",
    name: "Cement",
    type: "Construction",
    quantity: 500,
    unit: "Bags",
    supplier: "Ultratech Cement",
    rate: 350,
    totalCost: 175000,
    deliveryDate: "2023-06-15",
    project: "Skyline Towers Construction",
    status: "Delivered",
    poNumber: "PO-2023-001",
    invoiceNumber: "INV-2023-001",
  },
  {
    id: "2",
    name: "Steel Reinforcement",
    type: "Construction",
    quantity: 20,
    unit: "Tonnes",
    supplier: "JSW Steel",
    rate: 62000,
    totalCost: 1240000,
    deliveryDate: "2023-06-18",
    project: "Skyline Towers Construction",
    status: "Delivered",
    poNumber: "PO-2023-002",
    invoiceNumber: "INV-2023-002",
  },
  {
    id: "3",
    name: "Sand",
    type: "Construction",
    quantity: 30,
    unit: "Trucks",
    supplier: "Local Quarry",
    rate: 5000,
    totalCost: 150000,
    deliveryDate: "2023-06-20",
    project: "Green Valley Villas Phase 1",
    status: "Delivered",
    poNumber: "PO-2023-003",
    invoiceNumber: "INV-2023-003",
  },
  {
    id: "4",
    name: "Tiles",
    type: "Finishing",
    quantity: 1500,
    unit: "Sq. ft.",
    supplier: "Kajaria Ceramics",
    rate: 85,
    totalCost: 127500,
    deliveryDate: "2023-07-10",
    project: "Green Valley Villas Phase 1",
    status: "Ordered",
    poNumber: "PO-2023-004",
    invoiceNumber: "",
  },
  {
    id: "5",
    name: "Paint",
    type: "Finishing",
    quantity: 200,
    unit: "Gallons",
    supplier: "Asian Paints",
    rate: 550,
    totalCost: 110000,
    deliveryDate: "2023-08-05",
    project: "Green Valley Villas Phase 1",
    status: "Pending",
    poNumber: "PO-2023-005",
    invoiceNumber: "",
  },
];

// Form schema
const materialSchema = z.object({
  name: z.string().min(2, "Material name is required"),
  type: z.string().min(1, "Type is required"),
  quantity: z.coerce.number().positive("Quantity must be positive"),
  unit: z.string().min(1, "Unit is required"),
  supplier: z.string().min(2, "Supplier name is required"),
  rate: z.coerce.number().positive("Rate must be positive"),
  project: z.string().min(2, "Project is required"),
  deliveryDate: z.string().optional(),
  poNumber: z.string().optional(),
  invoiceNumber: z.string().optional(),
  remarks: z.string().optional(),
});

type MaterialFormValues = z.infer<typeof materialSchema>;

const ContractorMaterials = () => {
  const { user } = useAuth();
  const [materials, setMaterials] = useState(initialMaterials);
  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("all");

  const form = useForm<MaterialFormValues>({
    resolver: zodResolver(materialSchema),
    defaultValues: {
      type: "Construction",
      unit: "Units",
      project: "Skyline Towers Construction",
    },
  });

  // Sample project list
  const projects = [
    "Skyline Towers Construction",
    "Green Valley Villas Phase 1",
    "Riverside Apartments Foundation",
  ];

  const handleSubmit = (data: MaterialFormValues) => {
    // Calculate total cost
    const totalCost = data.quantity * data.rate;
    
    // Create new material entry
    const newMaterial = {
      ...data,
      id: (materials.length + 1).toString(),
      totalCost,
      status: "Pending" as const,
    };
    
    setMaterials([...materials, newMaterial]);
    toast.success("Material added successfully");
    form.reset();
    setAddDialogOpen(false);
  };

  const viewMaterial = (material: any) => {
    setSelectedMaterial(material);
    setViewDialogOpen(true);
  };

  // Filter materials based on search and active tab
  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.project.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "delivered") return matchesSearch && material.status === "Delivered";
    if (activeTab === "pending") return matchesSearch && material.status === "Pending";
    if (activeTab === "ordered") return matchesSearch && material.status === "Ordered";
    
    return matchesSearch;
  });

  // Calculate total cost of materials
  const totalMaterialCost = materials.reduce((total, material) => total + material.totalCost, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search materials, suppliers, projects..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Material
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-[400px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="ordered">Ordered</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Total Cost:</span>
          <span className="font-semibold flex items-center">
            <BadgeIndianRupee className="h-3.5 w-3.5" />
            {totalMaterialCost.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Material</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Rate (₹)</TableHead>
              <TableHead>Total (₹)</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMaterials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No materials found.
                </TableCell>
              </TableRow>
            ) : (
              filteredMaterials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell className="font-medium">{material.name}</TableCell>
                  <TableCell>{material.supplier}</TableCell>
                  <TableCell>
                    {material.quantity} {material.unit}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                      {material.rate.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                      {material.totalCost.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate" title={material.project}>
                    {material.project}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        material.status === "Delivered"
                          ? "default"
                          : material.status === "Ordered"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {material.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => viewMaterial(material)}
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

      {/* Add Material Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Material</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter material name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select material type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Construction">Construction</SelectItem>
                          <SelectItem value="Finishing">Finishing</SelectItem>
                          <SelectItem value="Electrical">Electrical</SelectItem>
                          <SelectItem value="Plumbing">Plumbing</SelectItem>
                          <SelectItem value="Flooring">Flooring</SelectItem>
                          <SelectItem value="Hardware">Hardware</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter quantity" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
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
                          <SelectItem value="Units">Units</SelectItem>
                          <SelectItem value="Bags">Bags</SelectItem>
                          <SelectItem value="Tonnes">Tonnes</SelectItem>
                          <SelectItem value="Kg">Kg</SelectItem>
                          <SelectItem value="Meters">Meters</SelectItem>
                          <SelectItem value="Sq. ft.">Sq. ft.</SelectItem>
                          <SelectItem value="Cu. ft.">Cu. ft.</SelectItem>
                          <SelectItem value="Gallons">Gallons</SelectItem>
                          <SelectItem value="Liters">Liters</SelectItem>
                          <SelectItem value="Trucks">Trucks</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rate (₹ per unit)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <BadgeIndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" type="number" placeholder="0" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supplier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter supplier name" {...field} />
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

                <FormField
                  control={form.control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Delivery Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="poNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchase Order Number</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., PO-2023-001" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="invoiceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invoice Number</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., INV-2023-001" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remarks</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any additional information"
                        className="resize-none"
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
                  onClick={() => setAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Material</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* View Material Dialog */}
      {selectedMaterial && (
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex justify-between">
                <span>Material Details</span>
                <Badge
                  variant={
                    selectedMaterial.status === "Delivered"
                      ? "default"
                      : selectedMaterial.status === "Ordered"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {selectedMaterial.status}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Material Name</h4>
                  <p className="text-base">{selectedMaterial.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
                  <p className="text-base">{selectedMaterial.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Quantity</h4>
                  <p className="text-base">
                    {selectedMaterial.quantity} {selectedMaterial.unit}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Rate</h4>
                  <p className="text-base flex items-center">
                    <BadgeIndianRupee className="h-3.5 w-3.5 mr-1" />
                    {selectedMaterial.rate.toLocaleString()} per {selectedMaterial.unit}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Total Cost</h4>
                  <p className="text-lg font-semibold flex items-center">
                    <BadgeIndianRupee className="h-4 w-4 mr-1" />
                    {selectedMaterial.totalCost.toLocaleString()}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Supplier</h4>
                  <p className="text-base">{selectedMaterial.supplier}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Project</h4>
                  <p className="text-base">{selectedMaterial.project}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Delivery Date</h4>
                  <p className="text-base">{selectedMaterial.deliveryDate || "Not specified"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">PO Number</h4>
                  <p className="text-base flex items-center">
                    {selectedMaterial.poNumber ? (
                      <>
                        <FileText className="h-4 w-4 mr-1" />
                        {selectedMaterial.poNumber}
                      </>
                    ) : (
                      "Not generated"
                    )}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Invoice Number</h4>
                  <p className="text-base flex items-center">
                    {selectedMaterial.invoiceNumber ? (
                      <>
                        <FileText className="h-4 w-4 mr-1" />
                        {selectedMaterial.invoiceNumber}
                      </>
                    ) : (
                      "Not available"
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button
                  type="button"
                  onClick={() => setViewDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ContractorMaterials;
