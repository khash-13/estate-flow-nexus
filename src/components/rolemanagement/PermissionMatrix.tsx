
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Save, RotateCcw } from "lucide-react";

// System modules and their available permissions
const systemModules = [
  { id: "dashboard", name: "Dashboard", category: "Core" },
  { id: "properties", name: "Properties", category: "Core" },
  { id: "users", name: "User Management", category: "Admin" },
  { id: "sales", name: "Sales Pipeline", category: "Sales" },
  { id: "team", name: "Team Management", category: "Sales" },
  { id: "leads", name: "Lead Management", category: "Sales" },
  { id: "commissions", name: "Commissions", category: "Sales" },
  { id: "projects", name: "Projects", category: "Operations" },
  { id: "tasks", name: "Task Management", category: "Operations" },
  { id: "quality", name: "Quality Control", category: "Operations" },
  { id: "inspections", name: "Site Inspections", category: "Operations" },
  { id: "contractors", name: "Contractors", category: "Operations" },
  { id: "materials", name: "Materials", category: "Operations" },
  { id: "labor", name: "Labor Management", category: "Operations" },
  { id: "invoices", name: "Invoices", category: "Finance" },
  { id: "payments", name: "Payments", category: "Finance" },
  { id: "budgets", name: "Budget Tracking", category: "Finance" },
  { id: "taxes", name: "Tax Documents", category: "Finance" },
  { id: "reports", name: "Reports", category: "Finance" },
  { id: "messaging", name: "Communications", category: "Communication" },
  { id: "content", name: "Content Management", category: "Admin" },
  { id: "settings", name: "System Settings", category: "Admin" },
];

const permissionTypes = ["read", "write", "edit", "delete", "view_only"];

const defaultRoles = [
  "owner", "admin", "sales_manager", "team_lead", "agent", 
  "site_incharge", "contractor", "accountant", "customer_purchased", "customer_prospect"
];

const PermissionMatrix = () => {
  const [selectedRole, setSelectedRole] = useState("admin");
  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>({});

  const handlePermissionToggle = (moduleId: string, permission: string) => {
    setPermissions(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [permission]: !prev[moduleId]?.[permission]
      }
    }));
  };

  const handleSavePermissions = () => {
    toast.success("Permissions updated successfully", {
      description: `Permissions for ${selectedRole} role have been saved.`
    });
  };

  const handleResetPermissions = () => {
    setPermissions({});
    toast.info("Permissions reset to default");
  };

  const getModulesByCategory = () => {
    const categories = systemModules.reduce((acc, module) => {
      if (!acc[module.category]) {
        acc[module.category] = [];
      }
      acc[module.category].push(module);
      return acc;
    }, {} as Record<string, typeof systemModules>);
    return categories;
  };

  const modulesByCategory = getModulesByCategory();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Select Role:</label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {defaultRoles.map(role => (
                  <SelectItem key={role} value={role}>
                    {role.replace('_', ' ').toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetPermissions}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSavePermissions}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(modulesByCategory).map(([category, modules]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="outline">{category}</Badge>
                <span className="text-lg">{category} Modules</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Module</th>
                      {permissionTypes.map(permission => (
                        <th key={permission} className="text-center p-3 font-medium min-w-20">
                          {permission.replace('_', ' ').toUpperCase()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map(module => (
                      <tr key={module.id} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">{module.name}</td>
                        {permissionTypes.map(permission => (
                          <td key={permission} className="p-3 text-center">
                            <Switch
                              checked={permissions[module.id]?.[permission] || false}
                              onCheckedChange={() => handlePermissionToggle(module.id, permission)}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PermissionMatrix;
