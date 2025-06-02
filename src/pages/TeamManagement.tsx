
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users, Target, DollarSign, Calendar, Phone, 
  Mail, UserPlus, Settings, BarChart3, Award
} from "lucide-react";
import { useState } from "react";

const teamMembers = [
  {
    id: "1",
    name: "Robert Wilson",
    role: "Senior Agent",
    email: "robert@example.com",
    phone: "+1 234-567-8901",
    avatar: "https://ui-avatars.com/api/?name=Robert+Wilson&background=38A169&color=fff",
    performance: {
      sales: 840000,
      target: 1000000,
      deals: 12,
      leads: 45,
      conversionRate: 26.7,
      lastActivity: "2 hours ago"
    },
    status: "active"
  },
  {
    id: "2",
    name: "Emily Davis",
    role: "Team Lead",
    email: "emily@example.com",
    phone: "+1 234-567-8902",
    avatar: "https://ui-avatars.com/api/?name=Emily+Davis&background=718096&color=fff",
    performance: {
      sales: 1200000,
      target: 1200000,
      deals: 18,
      leads: 62,
      conversionRate: 29.0,
      lastActivity: "1 hour ago"
    },
    status: "active"
  },
  {
    id: "3",
    name: "David Thompson",
    role: "Agent",
    email: "david@example.com",
    phone: "+1 234-567-8903",
    avatar: "https://ui-avatars.com/api/?name=David+Thompson&background=1A365D&color=fff",
    performance: {
      sales: 620000,
      target: 800000,
      deals: 8,
      leads: 38,
      conversionRate: 21.1,
      lastActivity: "5 hours ago"
    },
    status: "active"
  },
  {
    id: "4",
    name: "Lisa Anderson",
    role: "Junior Agent",
    email: "lisa@example.com",
    phone: "+1 234-567-8904",
    avatar: "https://ui-avatars.com/api/?name=Lisa+Anderson&background=9F7AEA&color=fff",
    performance: {
      sales: 350000,
      target: 600000,
      deals: 5,
      leads: 28,
      conversionRate: 17.9,
      lastActivity: "1 day ago"
    },
    status: "training"
  }
];

const TeamManagement = () => {
  const [sortBy, setSortBy] = useState("performance");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusColor = (status: string) => {
    const colors = {
      "active": "bg-green-100 text-green-800",
      "training": "bg-yellow-100 text-yellow-800",
      "inactive": "bg-red-100 text-red-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: "Excellent", color: "text-green-600" };
    if (percentage >= 75) return { level: "Good", color: "text-blue-600" };
    if (percentage >= 60) return { level: "Average", color: "text-yellow-600" };
    return { level: "Needs Improvement", color: "text-red-600" };
  };

  const totalTeamSales = teamMembers.reduce((sum, member) => sum + member.performance.sales, 0);
  const totalTeamTarget = teamMembers.reduce((sum, member) => sum + member.performance.target, 0);
  const teamPerformance = (totalTeamSales / totalTeamTarget) * 100;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Team Management</h1>
            <p className="text-muted-foreground">
              Manage your sales team and track their performance
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="sales">Sales Volume</SelectItem>
                <SelectItem value="deals">Deals Closed</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="training">Training</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Team Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{teamMembers.length}</span>
                <Users className="h-6 w-6 text-estate-navy" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Team Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{teamPerformance.toFixed(1)}%</span>
                <Target className="h-6 w-6 text-estate-teal" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Sales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">${(totalTeamSales / 1000000).toFixed(1)}M</span>
                <DollarSign className="h-6 w-6 text-estate-gold" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">
                  {teamMembers.filter(m => m.status === 'active').length}
                </span>
                <Award className="h-6 w-6 text-estate-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {teamMembers.map((member) => {
            const performancePercentage = (member.performance.sales / member.performance.target) * 100;
            const performanceLevel = getPerformanceLevel(performancePercentage);
            
            return (
              <Card key={member.id}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Sales</p>
                      <p className="font-semibold">${(member.performance.sales / 1000).toFixed(0)}k</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Target</p>
                      <p className="font-semibold">${(member.performance.target / 1000).toFixed(0)}k</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Deals</p>
                      <p className="font-semibold">{member.performance.deals}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Conversion</p>
                      <p className="font-semibold">{member.performance.conversionRate}%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Target Achievement</span>
                      <span className={performanceLevel.color}>{performanceLevel.level}</span>
                    </div>
                    <Progress value={performancePercentage} className="h-2" />
                    <p className="text-xs text-muted-foreground text-right">
                      {performancePercentage.toFixed(1)}% of target
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Last activity: {member.performance.lastActivity}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="mr-2 h-3 w-3" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Mail className="mr-2 h-3 w-3" />
                      Email
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <BarChart3 className="mr-2 h-3 w-3" />
                      Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-estate-navy" />
              Team Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium">Top Performers</h4>
                <div className="space-y-1">
                  {teamMembers
                    .sort((a, b) => (b.performance.sales / b.performance.target) - (a.performance.sales / a.performance.target))
                    .slice(0, 3)
                    .map((member, index) => (
                      <div key={member.id} className="flex items-center justify-between text-sm">
                        <span>{index + 1}. {member.name}</span>
                        <span className="font-medium">
                          {((member.performance.sales / member.performance.target) * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))
                  }
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Recent Activities</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>• Emily closed 2 deals yesterday</p>
                  <p>• Robert scheduled 5 site visits</p>
                  <p>• David added 8 new leads</p>
                  <p>• Lisa completed sales training</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Quick Actions</h4>
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-3 w-3" />
                    Schedule Team Meeting
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <BarChart3 className="mr-2 h-3 w-3" />
                    Generate Team Report
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Target className="mr-2 h-3 w-3" />
                    Set Team Goals
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TeamManagement;
