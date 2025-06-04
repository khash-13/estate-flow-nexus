
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { toast } from "sonner";
import { Search, UserPlus, Edit, Save, X } from "lucide-react";

const sampleUsers = [
  { id: "1", name: "John Smith", email: "john@example.com", currentRole: "owner", status: "active" },
  { id: "2", name: "Sarah Johnson", email: "sarah@example.com", currentRole: "admin", status: "active" },
  { id: "3", name: "Mike Wilson", email: "mike@example.com", currentRole: "sales_manager", status: "active" },
  { id: "4", name: "Emma Davis", email: "emma@example.com", currentRole: "team_lead", status: "active" },
  { id: "5", name: "James Brown", email: "james@example.com", currentRole: "agent", status: "active" },
  { id: "6", name: "Lisa Garcia", email: "lisa@example.com", currentRole: "accountant", status: "inactive" },
];

const availableRoles = [
  "owner", "admin", "sales_manager", "team_lead", "agent", 
  "site_incharge", "contractor", "accountant", "customer_purchased", "customer_prospect"
];

const UserRoleAssignment = () => {
  const [users, setUsers] = useState(sampleUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [newRole, setNewRole] = useState("");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.currentRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoleChange = (userId: string) => {
    if (!newRole) {
      toast.error("Please select a role");
      return;
    }

    setUsers(users.map(user => 
      user.id === userId ? { ...user, currentRole: newRole } : user
    ));
    
    toast.success("Role updated successfully");
    setEditingUser(null);
    setNewRole("");
  };

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      owner: "bg-purple-500",
      admin: "bg-red-500",
      sales_manager: "bg-blue-500",
      team_lead: "bg-green-500",
      agent: "bg-orange-500",
      site_incharge: "bg-teal-500",
      contractor: "bg-gray-500",
      accountant: "bg-indigo-500",
      customer_purchased: "bg-pink-500",
      customer_prospect: "bg-cyan-500",
    };
    return colors[role as keyof typeof colors] || "bg-gray-500";
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "active" 
      ? "bg-green-100 text-green-800 hover:bg-green-100/80" 
      : "bg-red-100 text-red-800 hover:bg-red-100/80";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            User Role Assignment
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Current Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {editingUser === user.id ? (
                      <Select value={newRole} onValueChange={setNewRole}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Select new role" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableRoles.map(role => (
                            <SelectItem key={role} value={role}>
                              {role.replace('_', ' ').toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge className={`${getRoleBadgeColor(user.currentRole)} text-white`}>
                        {user.currentRole.replace('_', ' ').toUpperCase()}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(user.status)} variant="outline">
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {editingUser === user.id ? (
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleRoleChange(user.id)}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setEditingUser(null);
                            setNewRole("");
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setEditingUser(user.id);
                          setNewRole(user.currentRole);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRoleAssignment;
