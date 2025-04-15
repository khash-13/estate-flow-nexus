
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, Filter, Plus, MoreHorizontal, Calendar, Camera, Upload 
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PhotoEvidence {
  id: string;
  title: string;
  project: string;
  unit: string;
  task: string;
  date: string;
  category: string;
  status: 'completed' | 'in_progress' | 'pending_review';
  images: { url: string; caption: string }[];
}

const photos: PhotoEvidence[] = [
  {
    id: "pe1",
    title: "Foundation Complete",
    project: "Riverside Tower",
    unit: "Block A",
    task: "Foundation concrete pouring",
    date: "2025-03-20",
    category: "Foundation",
    status: "completed",
    images: [
      { url: "/placeholder.svg", caption: "North section complete" },
      { url: "/placeholder.svg", caption: "East section complete" }
    ]
  },
  {
    id: "pe2",
    title: "Wall Framing Progress",
    project: "Valley Heights",
    unit: "Unit 3",
    task: "Wall framing",
    date: "2025-04-05",
    category: "Framing",
    status: "in_progress",
    images: [
      { url: "/placeholder.svg", caption: "North wall framing" },
      { url: "/placeholder.svg", caption: "West wall framing" }
    ]
  },
  {
    id: "pe3",
    title: "Electrical Wiring",
    project: "Green Villa",
    unit: "Villa 2",
    task: "Electrical installation",
    date: "2025-04-10",
    category: "Electrical",
    status: "pending_review",
    images: [
      { url: "/placeholder.svg", caption: "Main panel wiring" },
      { url: "/placeholder.svg", caption: "Living room outlets" }
    ]
  },
  {
    id: "pe4",
    title: "Plumbing Fixtures",
    project: "Riverside Tower",
    unit: "Block B",
    task: "Bathroom fixtures installation",
    date: "2025-04-12",
    category: "Plumbing",
    status: "completed",
    images: [
      { url: "/placeholder.svg", caption: "Shower installation" },
      { url: "/placeholder.svg", caption: "Sink and toilet installation" }
    ]
  }
];

const statusColors: Record<string, string> = {
  completed: 'bg-green-100 text-green-800',
  in_progress: 'bg-amber-100 text-amber-800',
  pending_review: 'bg-blue-100 text-blue-800'
};

const ContractorPhotoEvidence = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = searchQuery === '' || 
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.task.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesProject = projectFilter === '' || photo.project === projectFilter;
    const matchesCategory = categoryFilter === '' || photo.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || photo.status === statusFilter;
    
    return matchesSearch && matchesProject && matchesCategory && matchesStatus;
  });
  
  // Extract unique projects and categories for filters
  const projects = Array.from(new Set(photos.map(p => p.project)));
  const categories = Array.from(new Set(photos.map(p => p.category)));
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Photo Submissions</CardTitle>
            <Camera className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{photos.length}</div>
            <p className="text-xs text-muted-foreground">Across {projects.length} projects</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Calendar className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{photos.filter(p => p.status === 'pending_review').length}</div>
            <p className="text-xs text-muted-foreground">Awaiting inspection</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Uploads</CardTitle>
            <Upload className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">In the last 24 hours</p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Tabs defaultValue="all" onValueChange={setStatusFilter}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Photos</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            <TabsTrigger value="pending_review">Pending Review</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search photo evidence..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
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
            </div>
            
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Upload Photos
            </Button>
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title & Task</TableHead>
                  <TableHead>Project / Unit</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Photos</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPhotos.map((photo) => (
                  <TableRow key={photo.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{photo.title}</div>
                        <div className="text-xs text-muted-foreground">{photo.task}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          <span className="font-medium">Category:</span> {photo.category}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{photo.project}</div>
                        <div className="text-xs text-muted-foreground">{photo.unit}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(photo.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[photo.status]}>
                        {photo.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {photo.images.slice(0, 2).map((image, idx) => (
                          <div key={idx} className="w-10 h-10 rounded overflow-hidden">
                            <img 
                              src={image.url} 
                              alt={image.caption} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {photo.images.length > 2 && (
                          <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-xs font-medium">
                            +{photo.images.length - 2}
                          </div>
                        )}
                      </div>
                    </TableCell>
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
                          <DropdownMenuItem>View All Photos</DropdownMenuItem>
                          <DropdownMenuItem>Add More Photos</DropdownMenuItem>
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          <DropdownMenuItem>Download All</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ContractorPhotoEvidence;

