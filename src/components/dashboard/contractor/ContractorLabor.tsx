import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { 
  Search, Filter, Plus, MoreHorizontal, 
  Users, UserCheck, Clock, Calendar, Hammer, Construction
} from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface LaborTeam {
  id: string;
  name: string;
  type: string;
  project: string;
  unit: string;
  size: number;
  supervisor: string;
  phone: string;
  status: 'active' | 'scheduled' | 'offsite' | 'completed';
  progress: number;
  start_date: string;
  end_date: string;
  cost_per_day: number;
}

const laborTeams: LaborTeam[] = [
  {
    id: "lt1",
    name: "Team Alpha",
    type: "Masonry",
    project: "Riverside Tower",
    unit: "Block A",
    size: 12,
    supervisor: "Ramesh Kumar",
    phone: "+91 98765 43210",
    status: "active",
    progress: 68,
    start_date: "2025-03-15",
    end_date: "2025-04-30",
    cost_per_day: 15000
  },
  {
    id: "lt2",
    name: "Team Bravo",
    type: "Electrical",
    project: "Riverside Tower",
    unit: "Block B",
    size: 8,
    supervisor: "Suresh Patel",
    phone: "+91 87654 32109",
    status: "scheduled",
    progress: 0,
    start_date: "2025-04-25",
    end_date: "2025-05-15",
    cost_per_day: 12000
  },
  {
    id: "lt3",
    name: "Team Charlie",
    type: "Plumbing",
    project: "Valley Heights",
    unit: "Unit 3",
    size: 6,
    supervisor: "Dinesh Sharma",
    phone: "+91 76543 21098",
    status: "active",
    progress: 42,
    start_date: "2025-03-25",
    end_date: "2025-04-20",
    cost_per_day: 9000
  },
  {
    id: "lt4",
    name: "Team Delta",
    type: "Concrete",
    project: "Green Villa",
    unit: "Villa 2",
    size: 15,
    supervisor: "Mahesh Joshi",
    phone: "+91 65432 10987",
    status: "completed",
    progress: 100,
    start_date: "2025-02-10",
    end_date: "2025-03-20",
    cost_per_day: 18000
  },
  {
    id: "lt5",
    name: "Team Echo",
    type: "Finishing",
    project: "Valley Heights",
    unit: "Unit 4",
    size: 10,
    supervisor: "Rajesh Singh",
    phone: "+91 54321 09876",
    status: "offsite",
    progress: 25,
    start_date: "2025-03-10",
    end_date: "2025-04-25",
    cost_per_day: 13500
  }
];

const laborDistributionData = [
  { name: "Masonry", value: 12 },
  { name: "Electrical", value: 8 },
  { name: "Plumbing", value: 6 },
  { name: "Concrete", value: 15 },
  { name: "Finishing", value: 10 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  scheduled: 'bg-blue-100 text-blue-800',
  offsite: 'bg-amber-100 text-amber-800',
  completed: 'bg-purple-100 text-purple-800'
};

const ContractorLabor = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredTeams = laborTeams.filter(team => {
    const matchesSearch = searchQuery === '' || 
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.supervisor.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesType = typeFilter === '' || team.type === typeFilter;
    const matchesProject = projectFilter === '' || team.project === projectFilter;
    const matchesStatus = statusFilter === 'all' || team.status === statusFilter;
    
    return matchesSearch && matchesType && matchesProject && matchesStatus;
  });
  
  const teamTypes = Array.from(new Set(laborTeams.map(t => t.type)));
  const projects = Array.from(new Set(laborTeams.map(t => t.project)));
  
  const totalWorkforce = laborTeams.reduce((sum, team) => sum + team.size, 0);
  const activeWorkforce = laborTeams
    .filter(team => team.status === 'active')
    .reduce((sum, team) => sum + team.size, 0);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workforce</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWorkforce}</div>
            <p className="text-xs text-muted-foreground">Across {laborTeams.length} teams</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeWorkforce}</div>
            <p className="text-xs text-muted-foreground">{((activeWorkforce/totalWorkforce) * 100).toFixed(0)}% of total workforce</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Labor Cost</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{laborTeams.reduce((sum, team) => sum + (team.status === 'active' ? team.cost_per_day : 0), 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Active teams only</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Teams</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{laborTeams.filter(team => team.status === 'scheduled').length}</div>
            <p className="text-xs text-muted-foreground">Starting this week</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Team Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setStatusFilter}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Teams</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="offsite">Offsite</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search teams or supervisors..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Construction className="h-4 w-4 mr-2" />
                      <span>{typeFilter || 'Team Type'}</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-types">All Types</SelectItem>
                    {teamTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={projectFilter} onValueChange={setProjectFilter}>
                  <SelectTrigger className="w-[180px]">
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
                
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team
                </Button>
              </div>
              
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team</TableHead>
                      <TableHead>Project / Unit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeams.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{team.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Hammer className="h-3 w-3 mr-1" />
                              {team.type}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              <span className="font-medium">Supervisor:</span> {team.supervisor}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{team.project}</div>
                            <div className="text-xs text-muted-foreground">{team.unit}</div>
                          </div>
                          <div className="text-xs font-medium mt-1">
                            Workers: {team.size}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusColors[team.status]}>
                            {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                          </Badge>
                          <div className="text-xs text-muted-foreground mt-1">
                            ₹{team.cost_per_day.toLocaleString()}/day
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-xs flex justify-between">
                              <span>Progress</span>
                              <span>{team.progress}%</span>
                            </div>
                            <Progress value={team.progress} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <div>
                              <span className="text-muted-foreground">Start:</span>{" "}
                              {new Date(team.start_date).toLocaleDateString()}
                            </div>
                            <div>
                              <span className="text-muted-foreground">End:</span>{" "}
                              {new Date(team.end_date).toLocaleDateString()}
                            </div>
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
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
                              <DropdownMenuItem>Attendance Record</DropdownMenuItem>
                              <DropdownMenuItem>Payment History</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Workforce Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={laborDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {laborDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} workers`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContractorLabor;
