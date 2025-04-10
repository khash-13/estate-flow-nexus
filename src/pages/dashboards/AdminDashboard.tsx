
import { useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import { Settings, Users, FileText, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data
const recentActivities = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=2C7A7B&color=fff",
    },
    action: "updated permissions for",
    target: "Team Lead role",
    timestamp: "30 minutes ago",
    type: "approval" as const,
  },
  {
    id: "2",
    user: {
      name: "Michael Brown",
      avatar: "https://ui-avatars.com/api/?name=Michael+Brown&background=ECC94B&color=1A365D",
    },
    action: "created a new user account for",
    target: "David Thompson",
    timestamp: "2 hours ago",
    type: "lead" as const,
  },
  {
    id: "3",
    user: {
      name: "Emily Davis",
      avatar: "https://ui-avatars.com/api/?name=Emily+Davis&background=718096&color=fff",
    },
    action: "published new content on",
    target: "Homepage",
    timestamp: "4 hours ago",
    type: "document" as const,
  },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Manage your system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="86"
          icon={<Users className="h-6 w-6 text-estate-navy" />}
        />
        <StatCard
          title="Active Properties"
          value="24"
          icon={<FileText className="h-6 w-6 text-estate-teal" />}
        />
        <StatCard
          title="System Updates"
          value="3"
          icon={<Settings className="h-6 w-6 text-estate-gold" />}
        />
        <StatCard
          title="Security Alerts"
          value="0"
          icon={<ShieldCheck className="h-6 w-6 text-estate-success" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                <Users className="h-16 w-16 text-estate-navy/20" />
                <p className="text-muted-foreground ml-2">User management interface</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <ActivityFeed activities={recentActivities} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center bg-muted/50 rounded-md">
              <FileText className="h-12 w-12 text-estate-navy/20" />
              <p className="text-muted-foreground ml-2">CMS access</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center bg-muted/50 rounded-md">
              <Settings className="h-12 w-12 text-estate-navy/20" />
              <p className="text-muted-foreground ml-2">System settings</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
