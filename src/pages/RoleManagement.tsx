
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PermissionMatrix from "@/components/rolemanagement/PermissionMatrix";
import RoleCreator from "@/components/rolemanagement/RoleCreator";
import UserRoleAssignment from "@/components/rolemanagement/UserRoleAssignment";
import RolesList from "@/components/rolemanagement/RolesList";
import { Shield, Users, Settings, Grid3X3, Save, FileText } from "lucide-react";

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* RBAC Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    RBAC Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Role Inheritance</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable hierarchical role permissions
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Dynamic Permissions</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow runtime permission changes
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Default Role for New Users</Label>
                      <Select defaultValue="customer">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="agent">Agent</SelectItem>
                          <SelectItem value="contractor">Contractor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Session Timeout (minutes)</Label>
                      <Input type="number" defaultValue="480" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Maximum Failed Login Attempts</Label>
                      <Input type="number" defaultValue="5" />
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    Save RBAC Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Audit Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Audit Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Audit Logging</Label>
                        <p className="text-sm text-muted-foreground">
                          Track all system activities
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Real-time Monitoring</Label>
                        <p className="text-sm text-muted-foreground">
                          Monitor permissions in real-time
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Log Retention Period</Label>
                      <Select defaultValue="90">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 Days</SelectItem>
                          <SelectItem value="90">90 Days</SelectItem>
                          <SelectItem value="180">180 Days</SelectItem>
                          <SelectItem value="365">1 Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Audit Events</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="login-events" defaultChecked className="rounded" />
                          <Label htmlFor="login-events" className="text-sm">Login/Logout Events</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="permission-changes" defaultChecked className="rounded" />
                          <Label htmlFor="permission-changes" className="text-sm">Permission Changes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="role-assignments" defaultChecked className="rounded" />
                          <Label htmlFor="role-assignments" className="text-sm">Role Assignments</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="data-access" className="rounded" />
                          <Label htmlFor="data-access" className="text-sm">Data Access Events</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Save Audit Settings
                    </Button>
                    <Button variant="outline" className="w-full">
                      Export Audit Logs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Security Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Security Metrics & Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">127</div>
                    <div className="text-sm text-muted-foreground">Active Sessions</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div className="text-sm text-muted-foreground">Failed Logins (24h)</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">15</div>
                    <div className="text-sm text-muted-foreground">Permission Changes (7d)</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">8</div>
                    <div className="text-sm text-muted-foreground">Role Assignments (7d)</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Label className="text-base font-medium">Recent Security Events</Label>
                  <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">Role assigned to user</p>
                          <p className="text-xs text-muted-foreground">Admin assigned Agent role to John Doe</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">2 hours ago</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">User login</p>
                          <p className="text-xs text-muted-foreground">Sarah Wilson logged in successfully</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">4 hours ago</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">Permission modified</p>
                          <p className="text-xs text-muted-foreground">Agent role permissions updated</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">1 day ago</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">Failed login attempt</p>
                          <p className="text-xs text-muted-foreground">Multiple failed attempts for user@example.com</p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">2 days ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default RoleManagement;
