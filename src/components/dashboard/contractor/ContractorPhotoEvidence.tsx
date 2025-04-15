
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Search, Filter, Plus, MoreHorizontal, Calendar, 
  Camera, MapPin, CheckCircle, Eye, Upload, Image,
  Building, Clock, File, FileCheck
} from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface PhotoEvidence {
  id: string;
  title: string;
  project: string;
  unit: string;
  task_id: string;
  task_name: string;
  phase: string;
  date: string;
  location: string;
  verified: boolean;
  images: string[];
  tags: string[];
  comments: string;
}

// Sample data for photo evidence
const photoEvidences: PhotoEvidence[] = [
  {
    id: "pe1",
    title: "Foundation Concrete Pouring",
    project: "Riverside Tower",
    unit: "Block A",
    task_id: "t123",
    task_name: "Foundation Work",
    phase: "Groundwork and Foundation",
    date: "2025-03-15",
    location: "28.6139° N, 77.2090° E",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    ],
    tags: ["foundation", "concrete", "completed"],
    comments: "Concrete pouring completed as per specifications. Used M25 grade concrete."
  },
  {
    id: "pe2",
    title: "Column Reinforcement",
    project: "Riverside Tower",
    unit: "Block A",
    task_id: "t124",
    task_name: "Structural Framework",
    phase: "Structural Framework",
    date: "2025-04-05",
    location: "28.6139° N, 77.2090° E",
    verified: false,
    images: [
      "https://images.unsplash.com/photo-1621189378043-b3d3ff4f3cd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    ],
    tags: ["structural", "reinforcement", "in-progress"],
    comments: "Column reinforcement work in progress. Using Fe 500 grade steel."
  },
  {
    id: "pe3",
    title: "Electrical Conduit Installation",
    project: "Valley Heights",
    unit: "Unit 3",
    task_id: "t234",
    task_name: "Electrical Works",
    phase: "Electrical Works",
    date: "2025-03-25",
    location: "28.5244° N, 77.1855° E",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1558424087-896297a83aea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1631087683739-d62479f79ee4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1621905251189-08b45249be83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    ],
    tags: ["electrical", "conduit", "completed"],
    comments: "Electrical conduits installed as per drawing. All junction boxes placed."
  },
  {
    id: "pe4",
    title: "Wall Plastering",
    project: "Green Villa",
    unit: "Villa 2",
    task_id: "t345",
    task_name: "Masonry Work",
    phase: "Masonry Work",
    date: "2025-04-10",
    location: "28.4595° N, 77.0266° E",
    verified: false,
    images: [
      "https://images.unsplash.com/photo-1613144577614-e852d3d64f62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    ],
    tags: ["masonry", "plastering", "in-progress"],
    comments: "Wall plastering in progress. Using cement mortar 1:4 mix."
  },
  {
    id: "pe5",
    title: "Plumbing Fixtures Installation",
    project: "Valley Heights",
    unit: "Unit 4",
    task_id: "t456",
    task_name: "Plumbing Works",
    phase: "Plumbing Works",
    date: "2025-03-20",
    location: "28.5244° N, 77.1855° E",
    verified: true,
    images: [
      "https://images.unsplash.com/photo-1621889492122-8883d0ae5134?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
    ],
    tags: ["plumbing", "fixtures", "completed"],
    comments: "Bathroom fixtures installed. Pressure testing completed."
  }
];

const ContractorPhotoEvidence = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [selectedEvidence, setSelectedEvidence] = useState<PhotoEvidence | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const filteredEvidence = photoEvidences.filter(evidence => {
    const matchesSearch = searchQuery === '' || 
      evidence.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evidence.task_name.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesProject = projectFilter === '' || evidence.project === projectFilter;
    const matchesPhase = phaseFilter === '' || evidence.phase === phaseFilter;
    const matchesVerification = verificationFilter === 'all' || 
      (verificationFilter === 'verified' && evidence.verified) ||
      (verificationFilter === 'unverified' && !evidence.verified);
    
    return matchesSearch && matchesProject && matchesPhase && matchesVerification;
  });
  
  // Extract unique projects and phases for filters
  const projects = Array.from(new Set(photoEvidences.map(pe => pe.project)));
  const phases = Array.from(new Set(photoEvidences.map(pe => pe.phase)));
  
  const handleEvidenceClick = (evidence: PhotoEvidence) => {
    setSelectedEvidence(evidence);
    setIsDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <Camera className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{photoEvidences.length}</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Photos</CardTitle>
            <FileCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {photoEvidences.filter(pe => pe.verified).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {((photoEvidences.filter(pe => pe.verified).length / photoEvidences.length) * 100).toFixed(0)}% verification rate
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Images</CardTitle>
            <Image className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {photoEvidences.reduce((sum, pe) => sum + pe.images.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Avg {(photoEvidences.reduce((sum, pe) => sum + pe.images.length, 0) / photoEvidences.length).toFixed(1)} per submission
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">In the last 7 days</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search evidence..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-fit">
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2" />
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
          
          <Select value={phaseFilter} onValueChange={setPhaseFilter}>
            <SelectTrigger className="w-fit">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>{phaseFilter || 'Phase'}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Phases</SelectItem>
              {phases.map(phase => (
                <SelectItem key={phase} value={phase}>{phase}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Tabs value={verificationFilter} onValueChange={setVerificationFilter} className="mt-2 md:mt-0">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="verified">Verified</TabsTrigger>
              <TabsTrigger value="unverified">Unverified</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Button className="whitespace-nowrap">
          <Upload className="h-4 w-4 mr-2" />
          Upload Photos
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvidence.map((evidence) => (
          <Card key={evidence.id} className="overflow-hidden">
            <div className="relative">
              <AspectRatio ratio={16 / 9}>
                <img 
                  src={evidence.images[0]} 
                  alt={evidence.title}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              <div className="absolute top-2 right-2 flex space-x-1">
                {evidence.verified ? (
                  <Badge className="bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-white">Pending</Badge>
                )}
                {evidence.images.length > 1 && (
                  <Badge variant="outline" className="bg-white">
                    +{evidence.images.length - 1} more
                  </Badge>
                )}
              </div>
            </div>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="text-md">{evidence.title}</CardTitle>
              </div>
              <CardDescription className="flex flex-col space-y-1">
                <span className="text-muted-foreground">
                  {evidence.project} - {evidence.unit}
                </span>
                <span className="text-xs flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(evidence.date).toLocaleDateString()}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 mb-3">
                {evidence.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <div className="text-xs text-muted-foreground flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  GPS Tagged
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleEvidenceClick(evidence)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Evidence
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Evidence Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          {selectedEvidence && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEvidence.title}</DialogTitle>
                <DialogDescription>
                  Submitted on {new Date(selectedEvidence.date).toLocaleDateString()} for {selectedEvidence.project} - {selectedEvidence.unit}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {selectedEvidence.images.map((img, idx) => (
                      <div key={idx} className="relative rounded-md overflow-hidden">
                        <AspectRatio ratio={4 / 3}>
                          <img 
                            src={img} 
                            alt={`Evidence ${idx + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </AspectRatio>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="font-semibold mb-2">Comments</h4>
                    <p className="text-sm">{selectedEvidence.comments}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Task Information</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-3">
                      <div className="grid grid-cols-2 gap-y-2">
                        <div className="text-muted-foreground">Task Name:</div>
                        <div>{selectedEvidence.task_name}</div>
                        
                        <div className="text-muted-foreground">Task ID:</div>
                        <div>{selectedEvidence.task_id}</div>
                        
                        <div className="text-muted-foreground">Phase:</div>
                        <div>{selectedEvidence.phase}</div>
                        
                        <div className="text-muted-foreground">Location:</div>
                        <div>{selectedEvidence.location}</div>
                        
                        <div className="text-muted-foreground">Status:</div>
                        <div>
                          {selectedEvidence.verified ? (
                            <Badge className="bg-green-500">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline">Pending Verification</Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Metadata</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {selectedEvidence.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs space-y-1 mt-2">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          Captured on {new Date(selectedEvidence.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                          Location verified via GPS
                        </div>
                        <div className="flex items-center">
                          <File className="h-3 w-3 mr-1 text-muted-foreground" />
                          {selectedEvidence.images.length} images attached
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-between">
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload More
                    </Button>
                    <Button>Generate Report</Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {filteredEvidence.length === 0 && (
        <div className="border rounded-md p-12 flex flex-col items-center justify-center text-center">
          <Camera className="h-12 w-12 text-muted-foreground mb-2" />
          <h3 className="font-medium text-lg">No photo evidence found</h3>
          <p className="text-muted-foreground mb-4">
            No photos match your current filter criteria
          </p>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Photos
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContractorPhotoEvidence;
