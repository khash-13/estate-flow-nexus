
import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Search, Filter, CheckCircle, XCircle, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface VerificationTask {
  id: string;
  title: string;
  project: string;
  unit: string;
  phase: string;
  contractor: string;
  submittedDate: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  evidence: {
    images: string[];
    notes: string;
  };
}

const sampleTasks: VerificationTask[] = [
  {
    id: 'v1',
    title: 'Foundation concrete pouring',
    project: 'Riverside Tower',
    unit: 'Block A',
    phase: 'Groundwork and Foundation',
    contractor: 'ABC Contractors',
    submittedDate: '2025-04-10',
    deadline: '2025-04-15',
    priority: 'high',
    evidence: {
      images: [
        'https://placehold.co/600x400/png?text=Foundation+Photo+1',
        'https://placehold.co/600x400/png?text=Foundation+Photo+2'
      ],
      notes: 'Concrete pouring completed for the entire foundation area. Used M25 grade concrete as per specifications.'
    }
  },
  {
    id: 'v2',
    title: 'Electrical conduiting - 2nd Floor',
    project: 'Valley Heights',
    unit: 'Block B',
    phase: 'Electrical Works',
    contractor: 'ElectraPro Services',
    submittedDate: '2025-04-09',
    deadline: '2025-04-12',
    priority: 'high',
    evidence: {
      images: [
        'https://placehold.co/600x400/png?text=Electrical+Conduit+Photo+1',
        'https://placehold.co/600x400/png?text=Electrical+Conduit+Photo+2'
      ],
      notes: 'All electrical conduits installed according to drawing E2-B. Used 25mm PVC conduits for main lines and 20mm for branches.'
    }
  },
  {
    id: 'v3',
    title: 'Wall plastering',
    project: 'Green Villa',
    unit: 'Villa 2',
    phase: 'Masonry Work',
    contractor: 'BuildRight Construction',
    submittedDate: '2025-04-08',
    deadline: '2025-04-16',
    priority: 'medium',
    evidence: {
      images: [
        'https://placehold.co/600x400/png?text=Wall+Plastering+Photo+1',
        'https://placehold.co/600x400/png?text=Wall+Plastering+Photo+2'
      ],
      notes: 'Completed interior wall plastering with 12mm cement mortar (1:6). All corners finished with aluminum corner beads.'
    }
  },
  {
    id: 'v4',
    title: 'Roof waterproofing',
    project: 'Valley Heights',
    unit: 'Unit 4',
    phase: 'Roofing',
    contractor: 'ABC Contractors',
    submittedDate: '2025-04-07',
    deadline: '2025-04-14',
    priority: 'high',
    evidence: {
      images: [
        'https://placehold.co/600x400/png?text=Waterproofing+Photo+1',
        'https://placehold.co/600x400/png?text=Waterproofing+Photo+2' 
      ],
      notes: 'Applied polymer-modified bitumen membrane waterproofing. Two layers applied with overlap as per specifications.'
    }
  }
];

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-amber-100 text-amber-800',
  low: 'bg-green-100 text-green-800'
};

const TaskVerificationList = () => {
  const [tasks] = useState<VerificationTask[]>(sampleTasks);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState<VerificationTask | null>(null);
  
  const filteredTasks = tasks.filter(task => {
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search verifications..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="high">High Priority</TabsTrigger>
          <TabsTrigger value="medium">Medium Priority</TabsTrigger>
          <TabsTrigger value="low">Low Priority</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Project / Unit</TableHead>
              <TableHead>Contractor</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>{task.project} / {task.unit}</TableCell>
                <TableCell>{task.contractor}</TableCell>
                <TableCell>{new Date(task.submittedDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(task.deadline).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={priorityColors[task.priority]}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedTask(task)}>
                        Review
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="sm:max-w-xl w-[90%]">
                      {selectedTask && (
                        <>
                          <SheetHeader>
                            <SheetTitle>Task Verification</SheetTitle>
                          </SheetHeader>
                          
                          <div className="py-6 space-y-6">
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold">{selectedTask.title}</h3>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={priorityColors[selectedTask.priority]}>
                                  {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)} Priority
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {selectedTask.project}, {selectedTask.unit}
                                </span>
                              </div>
                              <p className="text-sm">
                                <span className="font-medium">Contractor:</span> {selectedTask.contractor}
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Phase:</span> {selectedTask.phase}
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-semibold mb-2">Submitted Evidence</h4>
                              <p className="text-sm mb-3">{selectedTask.evidence.notes}</p>
                              
                              <div className="grid grid-cols-2 gap-3">
                                {selectedTask.evidence.images.map((image, index) => (
                                  <div key={index} className="border rounded-md overflow-hidden">
                                    <img src={image} alt={`Evidence ${index + 1}`} className="w-full h-auto" />
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <Card className="p-4 bg-blue-50">
                              <h4 className="text-sm font-semibold mb-2">Verification Actions</h4>
                              <div className="space-y-3">
                                <Button variant="outline" className="w-full justify-start">
                                  <Camera className="h-4 w-4 mr-2" />
                                  Take Verification Photos
                                </Button>
                                <div className="flex gap-2">
                                  <Button className="flex-1" variant="default">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Button className="flex-1" variant="destructive">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          </div>
                        </>
                      )}
                    </SheetContent>
                  </Sheet>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TaskVerificationList;
