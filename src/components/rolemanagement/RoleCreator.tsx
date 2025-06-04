
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Shield } from "lucide-react";

const RoleCreator = () => {
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    color: "blue"
  });

  const colorOptions = [
    { name: "blue", class: "bg-blue-500" },
    { name: "green", class: "bg-green-500" },
    { name: "purple", class: "bg-purple-500" },
    { name: "orange", class: "bg-orange-500" },
    { name: "red", class: "bg-red-500" },
    { name: "teal", class: "bg-teal-500" }
  ];

  const handleCreateRole = () => {
    if (!newRole.name.trim()) {
      toast.error("Role name is required");
      return;
    }

    toast.success("Role created successfully", {
      description: `${newRole.name} role has been created with default permissions.`
    });

    setNewRole({ name: "", description: "", color: "blue" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Role
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="roleName">Role Name</Label>
          <Input
            id="roleName"
            placeholder="e.g., Project Manager"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="roleDescription">Description</Label>
          <Textarea
            id="roleDescription"
            placeholder="Describe the role responsibilities..."
            value={newRole.description}
            onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Role Color</Label>
          <div className="flex gap-2">
            {colorOptions.map(color => (
              <button
                key={color.name}
                className={`w-8 h-8 rounded-full ${color.class} ${
                  newRole.color === color.name ? 'ring-2 ring-offset-2 ring-primary' : ''
                }`}
                onClick={() => setNewRole({ ...newRole, color: color.name })}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="p-3 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <Badge className={`bg-${newRole.color}-500 text-white`}>
                {newRole.name || "Role Name"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {newRole.description || "Role description will appear here..."}
            </p>
          </div>
        </div>

        <Button onClick={handleCreateRole} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoleCreator;
