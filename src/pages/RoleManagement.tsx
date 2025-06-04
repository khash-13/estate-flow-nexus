
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PermissionMatrix from "@/components/rolemanagement/PermissionMatrix";
import RoleCreator from "@/components/rolemanagement/RoleCreator";
import UserRoleAssignment from "@/components/rolemanagement/UserRoleAssignment";
import RolesList from "@/components/rolemanagement/RolesList";
import { Shield, Users, Settings, Grid3X3 } from "lucide-react";

const RoleManagement = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Role Management</h1>
            <p className="text-muted-foreground">
              Manage user roles and permissions across the system
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">RBAC System</span>
          </div>
        </div>

        <Tabs defaultValue="permissions" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="permissions" className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              Permission Matrix
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Manage Roles
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Assignment
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              System Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Permission Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <PermissionMatrix />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RoleCreator />
              <RolesList />
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserRoleAssignment />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced RBAC configuration and audit settings will be available here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default RoleManagement;
