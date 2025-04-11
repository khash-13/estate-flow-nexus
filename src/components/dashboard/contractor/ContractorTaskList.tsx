
import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Plus, Search, Filter, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  title: string;
  project: string;
  unit: string;
  phase: string;
  status: 'pending' | 'in_progress' | 'completed' | 'approved' | 'rejected';
  deadline: string;
  priority: 'high' | 'medium' | 'low';
}

const statusColors: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800'
};

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-amber-100 text-amber-800',
  low: 'bg-green-100 text-green-800'
};

const sampleTasks: Task[] = [
  {
    id: 't1',
    title: 'Foundation concrete pouring',
    project: 'Riverside Tower',
    unit: 'Block A',
    phase: 'Groundwork and Foundation',
    status: 'completed',
    deadline: '2025-04-15',
    priority: 'high'
  },
  {
    id: 't2',
    title: 'Structural column formwork',
    project: 'Riverside Tower',
    unit: 'Block B',
    phase: 'Structural Framework',
    status: 'in_progress',
    deadline: '2025-04-20',
    priority: 'high'
  },
  {
    id: 't3',
    title: 'Electrical conduiting - Ground Floor',
    project: 'Valley Heights',
    unit: 'Unit 3',
    phase: 'Electrical Works',
    status: 'pending',
    deadline: '2025-04-25',
    priority: 'medium'
  },
  {
    id: 't4',
    title: 'Wall plastering',
    project: 'Green Villa',
    unit: 'Villa 2',
    phase: 'Masonry Work',
    status: 'approved',
    deadline: '2025-04-10',
    priority: 'medium'
  },
  {
    id: 't5',
    title: 'Roof waterproofing',
    project: 'Valley Heights',
    unit: 'Unit 4',
    phase: 'Roofing',
    status: 'rejected',
    deadline: '2025-04-05',
    priority: 'high'
  }
];

const ContractorTaskList = () => {
  const [tasks] = useState<Task[]>(sampleTasks);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const form = useForm({
    defaultValues: {
      title: '',
      project: '',
      unit: '',
      phase: '',
      priority: 'medium',
      deadline: ''
    }
  });

  const filteredTasks = tasks.filter(task => {
    // Apply status filter
    if (filter !== 'all' && task.status !== filter) {
      return false;
    }
    
    // Apply search query
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
              placeholder="Search tasks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by Project</DropdownMenuLabel>
              <DropdownMenuItem>Riverside Tower</DropdownMenuItem>
              <DropdownMenuItem>Valley Heights</DropdownMenuItem>
              <DropdownMenuItem>Green Villa</DropdownMenuItem>
              <DropdownMenuItem>Urban Square</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter task title" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="project"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project</FormLabel>
                        <FormControl>
                          <Input placeholder="Select project" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <FormControl>
                          <Input placeholder="Select unit" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Construction Phase</FormLabel>
                        <FormControl>
                          <Input placeholder="Select phase" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deadline</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" type="button">Cancel</Button>
                  <Button type="submit">Create Task</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Project / Unit</TableHead>
              <TableHead>Phase</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>{task.project} / {task.unit}</TableCell>
                <TableCell>{task.phase}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[task.status]}>
                    {task.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(task.deadline).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={priorityColors[task.priority]}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Task</DropdownMenuItem>
                      <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                      <DropdownMenuItem>Upload Photos</DropdownMenuItem>
                      <DropdownMenuItem>Generate Invoice</DropdownMenuItem>
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

export default ContractorTaskList;
