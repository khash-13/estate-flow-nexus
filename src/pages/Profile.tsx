
import MainLayout from "@/components/layout/MainLayout";
import ProfileForm from "@/components/profile/ProfileForm";
import RoleSpecificStats from "@/components/profile/RoleSpecificStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Shield, 
  Calendar, 
  MapPin, 
  Clock,
  Settings,
  Bell,
  Lock,
  Activity
} from "lucide-react";

const Profile = () => {
  const { user } = useAuth();

  const getPermissions = () => {
    const permissions = {
      owner: ["Full System Access", "User Management", "Financial Reports", "System Settings"],
      admin: ["User Management", "Content Management", "System Configuration", "Reports"],
      sales_manager: ["Team Management", "Sales Reports", "Commission Management", "Lead Assignment"],
      team_lead: ["Team Coordination", "Task Assignment", "Performance Review", "Site Visits"],
      agent: ["Lead Management", "Client Communication", "Site Visits", "Commission Tracking"],
      site_incharge: ["Site Monitoring", "Quality Control", "Contractor Management", "Progress Reports"],
      contractor: ["Task Management", "Material Requests", "Invoice Creation", "Progress Updates"],
      accountant: ["Financial Management", "Tax Documents", "Budget Tracking", "Invoice Processing"],
      customer_purchased: ["Property Access", "Payment History", "Document Access", "Support"],
      customer_prospect: ["Property Browsing", "Site Visits", "Application Tracking", "Support"],
    };
    return permissions[user?.role as keyof typeof permissions] || [];
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Profile</h1>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProfileForm />
            <RoleSpecificStats />
          </div>

          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer">
                  <Bell className="h-4 w-4" />
                  <span className="text-sm">Notification Settings</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer">
                  <Lock className="h-4 w-4" />
                  <span className="text-sm">Change Password</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer">
                  <Activity className="h-4 w-4" />
                  <span className="text-sm">Activity Log</span>
                </div>
              </CardContent>
            </Card>

            {/* Permissions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Permissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {getPermissions().map((permission, index) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-2">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Member Since:</span>
                  <span>January 2024</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Account Status:</span>
                  <Badge variant="default" className="bg-green-500">Active</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Login:</span>
                  <span>Today, 9:30 AM</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
