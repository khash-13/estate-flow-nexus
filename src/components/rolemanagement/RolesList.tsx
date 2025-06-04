
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Edit, Trash2, Users, Shield } from "lucide-react";

const existingRoles = [
  {
    id: "owner",
    name: "Owner",
    description: "Full system access and control",
    userCount: 1,
    color: "purple"
  },
  {
    id: "admin",
    name: "Administrator",
    description: "System administration and user management",
    userCount: 3,
    color: "red"
  },
  {
    id: "sales_manager",
    name: "Sales Manager",
    description: "Manage sales team and processes",
    userCount: 2,
    color: "blue"
  },
  {
    id: "team_lead",
    name: "Team Lead",
    description: "Lead and coordinate team activities",
    userCount: 5,
    color: "green"
  },
  {
    id: "agent",
    name: "Agent",
    description: "Handle customer interactions and sales",
    userCount: 25,
    color: "orange"
  },
  {
    id: "site_incharge",
    name: "Site Incharge",
    description: "Oversee construction site operations",
    userCount: 8,
    color: "teal"
  }
];

const RolesList = () => {
  const [roles, setRoles] = useState(existingRoles);
  const [editingRole, setEditingRole] = useState<any>(null);
  const [editForm, setEditForm] = useState({ name: "", description: "" });

  const handleEditRole = (role: any) => {
    setEditingRole(role);
    setEditForm({ name: role.name, description: role.description });
  };

  const handleSaveEdit = () => {
    setRoles(roles.map(role => 
      role.id === editingRole.id 
        ? { ...role, name: editForm.name, description: editForm.description }
        : role
    ));
    
    toast.success("Role updated successfully");
    setEditingRole(null);
  };

  const handleDeleteRole = (roleId: string, roleName: string) => {
    if (["owner", "admin"].includes(roleId)) {
      toast.error("Cannot delete system roles");
      return;
    }
    
    setRoles(roles.filter(role => role.id !== roleId));
    toast.success(`${roleName} role deleted successfully`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Existing Roles
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {roles.map(role => (
            <div key={role.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Badge className={`bg-${role.color}-500 text-white`}>
                  {role.name}
                </Badge>
                <div>
                  <p className="text-sm font-medium">{role.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{role.userCount} users</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditRole(role)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Role</DialogTitle>
                      <DialogDescription>
                        Update the role name and description.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Role Name</Label>
                        <Input
                          id="edit-name"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                          id="edit-description"
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleSaveEdit}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDeleteRole(role.id, role.name)}
                  disabled={["owner", "admin"].includes(role.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RolesList;
