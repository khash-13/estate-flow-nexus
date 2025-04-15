import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Search, Filter, Plus, MoreHorizontal, ArrowUpDown, Construction, Package, 
  Truck, AlertTriangle, CheckCircle
} from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface Material {
  id: string;
  name: string;
  category: string;
  project: string;
  unit: string;
  quantity: number;
  unit_type: string;
  status: 'in_stock' | 'ordered' | 'delayed' | 'low_stock';
  required: number;
  used: number;
  cost_per_unit: number;
  supplier: string;
  delivery_date?: string;
}

const materials: Material[] = [
  {
    id: "m1",
    name: "Cement OPC 53 Grade",
    category: "Concrete Materials",
    project: "Riverside Tower",
    unit: "Block A",
    quantity: 350,
    unit_type: "bags",
    status: "in_stock",
    required: 800,
    used: 450,
    cost_per_unit: 350,
    supplier: "BuildMart Materials"
  },
  {
    id: "m2", 
    name: "Steel Reinforcement 16mm",
    category: "Structural Materials",
    project: "Riverside Tower",
    unit: "Block A",
    quantity: 2.5,
    unit_type: "tons",
    status: "low_stock",
    required: 10,
    used: 7.5,
    cost_per_unit: 62500,
    supplier: "SteelX Industries"
  },
  {
    id: "m3",
    name: "Sand",
    category: "Concrete Materials",
    project: "Riverside Tower",
    unit: "Block B",
    quantity: 20,
    unit_type: "cubic meters",
    status: "in_stock",
    required: 50,
    used: 30,
    cost_per_unit: 1800,
    supplier: "GeoSupplies Ltd"
  },
  {
    id: "m4",
    name: "Bricks",
    category: "Masonry Materials",
    project: "Valley Heights",
    unit: "Unit 3",
    quantity: 8000,
    unit_type: "pieces",
    status: "ordered",
    required: 25000,
    used: 17000,
    cost_per_unit: 8,
    supplier: "Red Clay Brick Co",
    delivery_date: "2025-04-20"
  },
  {
    id: "m5",
    name: "Ceramic Floor Tiles",
    category: "Finishing Materials",
    project: "Green Villa",
    unit: "Villa 2",
    quantity: 120,
    unit_type: "boxes",
    status: "delayed",
    required: 120,
    used: 0,
    cost_per_unit: 1200,
    supplier: "Elite Ceramics",
    delivery_date: "2025-04-25"
  }
];

const materialUsageData = [
  { name: 'Cement', ordered: 800, used: 450, remaining: 350 },
  { name: 'Steel', ordered: 10, used: 7.5, remaining: 2.5 },
  { name: 'Sand', ordered: 50, used: 30, remaining: 20 },
  { name: 'Bricks', ordered: 25000, used: 17000, remaining: 8000 },
  { name: 'Tiles', ordered: 120, used: 0, remaining: 120 },
];

const statusColors: Record<string, string> = {
  in_stock: 'bg-green-100 text-green-800',
  ordered: 'bg-blue-100 text-blue-800',
  delayed: 'bg-red-100 text-red-800',
  low_stock: 'bg-amber-100 text-amber-800'
};

const ContractorMaterials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = searchQuery === '' || 
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.supplier.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = categoryFilter === '' || material.category === categoryFilter;
    const matchesProject = projectFilter === '' || material.project === projectFilter;
    
    return matchesSearch && matchesCategory && matchesProject;
  });
  
  const categories = Array.from(new Set(materials.map(m => m.category)));
  const projects = Array.from(new Set(materials.map(m => m.project)));
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Materials</CardTitle>
            <Construction className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Across 3 projects</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Material Value</CardTitle>
            <Package className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹436,500</div>
            <p className="text-xs text-muted-foreground">Total inventory value</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
            <Truck className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Expected this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Materials</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Materials Usage Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={materialUsageData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ordered" stackId="a" fill="#8884d8" name="Ordered" />
                <Bar dataKey="used" stackId="a" fill="#82ca9d" name="Used" />
                <Bar dataKey="remaining" stackId="a" fill="#ffc658" name="Remaining" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search materials..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-fit">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>{categoryFilter || 'Category'}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-categories">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
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
              <SelectItem value="all-projects">All Projects</SelectItem>
              {projects.map(project => (
                <SelectItem key={project} value={project}>{project}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Material
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center">
                  Material
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Project / Unit</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMaterials.map((material) => (
              <TableRow key={material.id}>
                <TableCell className="font-medium">
                  <div>
                    {material.name}
                    <div className="text-xs text-muted-foreground">{material.category}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {material.project}
                  <div className="text-xs text-muted-foreground">{material.unit}</div>
                </TableCell>
                <TableCell>
                  {material.quantity} {material.unit_type}
                  <div className="text-xs text-muted-foreground">
                    ₹{(material.cost_per_unit * material.quantity).toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-xs">
                      {material.used} / {material.required} {material.unit_type}
                    </div>
                    <Progress value={(material.used / material.required) * 100} className="h-2" />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[material.status]}>
                    {material.status === 'in_stock' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {material.status === 'ordered' && <Truck className="h-3 w-3 mr-1" />}
                    {material.status === 'delayed' && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {material.status === 'low_stock' && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {material.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Badge>
                  {material.delivery_date && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Delivery: {new Date(material.delivery_date).toLocaleDateString()}
                    </div>
                  )}
                </TableCell>
                <TableCell>{material.supplier}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Update Stock</DropdownMenuItem>
                      <DropdownMenuItem>Request Order</DropdownMenuItem>
                      <DropdownMenuItem>Track Delivery</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContractorMaterials;
