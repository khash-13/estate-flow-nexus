
import { useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import { CheckSquare, FileText, Users, Truck, Building, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Sample data
const recentActivities = [
  {
    id: "1",
    user: {
      name: "Jennifer Martinez",
      avatar: "https://ui-avatars.com/api/?name=Jennifer+Martinez&background=4299E1&color=fff",
    },
    action: "completed inspection for",
    target: "Golden Heights Phase 2, Block A",
    timestamp: "1 hour ago",
    type: "approval" as const,
  },
  {
    id: "2",
    user: {
      name: "Mark Wilson",
      avatar: "https://ui-avatars.com/api/?name=Mark+Wilson&background=ED8936&color=fff",
    },
    action: "uploaded progress photos for",
    target: "Riverside Apartments, Foundation",
    timestamp: "3 hours ago",
    type: "document" as const,
  },
  {
    id: "3",
    user: {
      name: "Jennifer Martinez",
      avatar: "https://ui-avatars.com/api/?name=Jennifer+Martinez&background=4299E1&color=fff",
    },
    action: "approved invoice from",
    target: "ABC Construction Co.",
    timestamp: "yesterday",
    type: "payment" as const,
  },
];

const constructionUpdates = [
  {
    project: "Golden Heights Phase 2",
    block: "Block A",
    contractor: "ABC Construction Co.",
    milestone: "Foundation",
    progress: 85,
    dueDate: "Next Week",
    status: "on-track",
  },
  {
    project: "Riverside Apartments",
    block: "Tower 1",
    contractor: "XYZ Builders",
    milestone: "Structural Work",
    progress: 60,
    dueDate: "This Month",
    status: "delayed",
  },
  {
    project: "Parkview Residences",
    block: "Phase 1",
    contractor: "Premier Construction",
    milestone: "Interior Finishing",
    progress: 40,
    dueDate: "Next Month",
    status: "on-track",
  },
  {
    project: "Skyline Towers",
    block: "Tower 2",
    contractor: "Urban Developers",
    milestone: "Plumbing",
    progress: 75,
    dueDate: "This Week",
    status: "at-risk",
  },
];

const pendingApprovals = [
  {
    type: "inspection",
    project: "Golden Heights Phase 2",
    item: "Block B Electrical Work",
    contractor: "Electro Systems Inc.",
    requestedDate: "Today",
  },
  {
    type: "material",
    project: "Riverside Apartments",
    item: "Premium Marble Flooring",
    contractor: "XYZ Builders",
    requestedDate: "Yesterday",
  },
  {
    type: "invoice",
    project: "Parkview Residences",
    item: "Phase 1 Foundation Work",
    contractor: "Premier Construction",
    requestedDate: "2 days ago",
  },
];

const SiteInchargeDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Site Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor construction progress and manage quality assurance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Projects"
          value="4"
          icon={<Building className="h-6 w-6 text-estate-navy" />}
        />
        <StatCard
          title="Contractors"
          value="6"
          icon={<Users className="h-6 w-6 text-estate-teal" />}
        />
        <StatCard
          title="Pending Approvals"
          value="7"
          icon={<CheckSquare className="h-6 w-6 text-estate-gold" />}
        />
        <StatCard
          title="Today's Inspections"
          value="3"
          icon={<Camera className="h-6 w-6 text-estate-error" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Construction Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {constructionUpdates.map((project, index) => {
                  const statusColors = {
                    'on-track': "bg-estate-success/20 text-estate-success",
                    'delayed': "bg-estate-error/20 text-estate-error",
                    'at-risk': "bg-estate-warning/20 text-estate-warning",
                  };

                  return (
                    <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{project.project} - {project.block}</p>
                          <p className="text-sm text-muted-foreground">
                            {project.milestone} • {project.contractor}
                          </p>
                        </div>
                        <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                          {project.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} />
                        <p className="text-xs text-right text-muted-foreground">
                          Due: {project.dueDate}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        <ActivityFeed activities={recentActivities} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingApprovals.map((approval, index) => {
            const approvalIcons = {
              'inspection': <Camera className="h-5 w-5" />,
              'material': <Truck className="h-5 w-5" />,
              'invoice': <FileText className="h-5 w-5" />,
            };

            return (
              <div 
                key={index} 
                className="flex justify-between items-center p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors rounded-md"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-muted rounded-full">
                    {approvalIcons[approval.type as keyof typeof approvalIcons]}
                  </div>
                  <div>
                    <p className="font-medium">{approval.item}</p>
                    <p className="text-sm text-muted-foreground">
                      {approval.project} • {approval.contractor}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Requested: {approval.requestedDate}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="text-estate-error">
                    Reject
                  </Button>
                  <Button size="sm" className="bg-estate-navy hover:bg-estate-navy/90">
                    Approve
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteInchargeDashboard;
