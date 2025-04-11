
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  UserPlus, Search, Filter, MoreVertical, 
  Edit, Trash2, User, Mail, Phone 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRole } from "@/contexts/AuthContext";

// Sample user data
const sampleUsers = [
  {
    id: "1",
    name: "John Smith",
    email: "owner@example.com",
    role: "owner",
    status: "active",
    lastLogin: "2 hours ago",
    phone: "+1 555-123-4567",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    lastLogin: "1 day ago",
    phone: "+1 555-234-5678",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "salesmanager@example.com",
    role: "sales_manager",
    status: "active",
    lastLogin: "3 hours ago",
    phone: "+1 555-345-6789",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "teamlead@example.com",
    role: "team_lead",
    status: "active",
    lastLogin: "5 hours ago",
    phone: "+1 555-456-7890",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "agent@example.com",
    role: "agent",
    status: "active",
    lastLogin: "2 days ago",
    phone: "+1 555-567-8901",
  },
  {
    id: "6",
    name: "Jennifer Martinez",
    email: "siteincharge@example.com",
    role: "site_incharge",
    status: "active",
    lastLogin: "1 week ago",
    phone: "+1 555-678-9012",
  },
  {
    id: "7",
    name: "David Anderson",
    email: "david.anderson@example.com",
    role: "agent",
    status: "inactive",
    lastLogin: "2 weeks ago",
    phone: "+1 555-789-0123",
  },
  {
    id: "8",
    name: "Lisa Taylor",
    email: "lisa.taylor@example.com",
    role: "accountant",
    status: "active",
    lastLogin: "1 day ago",
    phone: "+1 555-890-1234",
  },
  {
    id: "9",
    name: "James Garcia",
    email: "james.garcia@example.com",
    role: "contractor",
    status: "active",
    lastLogin: "4 days ago",
    phone: "+1 555-901-2345",
  }
];

const UserManagement = () => {
  const [users, setUsers] = useState(sampleUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "agent" as UserRole,
    phone: "",
  });

  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleAddUser = () => {
    const id = (users.length + 1).toString();
    const createdUser = {
      id,
      ...newUser,
      status: "active",
      lastLogin: "Never",
    };
    
    setUsers([...users, createdUser]);
    toast.success("User added successfully", {
      description: `${newUser.name} has been added as a ${newUser.role}`,
    });
    
    setShowAddUserDialog(false);
    setNewUser({
      name: "",
      email: "",
      role: "agent" as UserRole,
      phone: "",
    });
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success("User deleted", {
      description: `${userName} has been removed from the system`,
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100/80";
      case "admin":
        return "bg-red-100 text-red-800 hover:bg-red-100/80";
      case "sales_manager":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
      case "team_lead":
        return "bg-teal-100 text-teal-800 hover:bg-teal-100/80";
      case "agent":
        return "bg-green-100 text-green-800 hover:bg-green-100/80";
      case "site_incharge":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80";
      case "contractor":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100/80";
      case "accountant":
        return "bg-cyan-100 text-cyan-800 hover:bg-cyan-100/80";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "active" 
      ? "bg-green-100 text-green-800 hover:bg-green-100/80" 
      : "bg-red-100 text-red-800 hover:bg-red-100/80";
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">
              Manage users and their access levels
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account with role-based access.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid items-center gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid items-center gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="grid items-center gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                      placeholder="+1 555-123-4567"
                    />
                  </div>
                  <div className="grid items-center gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={newUser.role}
                      onValueChange={(value) => 
                        setNewUser({ ...newUser, role: value as UserRole })}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="sales_manager">Sales Manager</SelectItem>
                        <SelectItem value="team_lead">Team Lead</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                        <SelectItem value="site_incharge">Site Incharge</SelectItem>
                        <SelectItem value="contractor">Contractor</SelectItem>
                        <SelectItem value="accountant">Accountant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddUser} disabled={
                    !newUser.name || !newUser.email || !newUser.role || !newUser.phone
                  }>
                    Create User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="all-users" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all-users">All Users</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
            <TabsTrigger value="sales">Sales Team</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
          </TabsList>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
                <CardTitle>User Directory</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search users..."
                      className="pl-8 w-full md:w-[250px] bg-background"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon" title="Filter users">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No users found matching your search
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge className={getRoleBadgeColor(user.role)} variant="outline">
                              {user.role.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeColor(user.status)} variant="outline">
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="icon" variant="ghost" title="Edit user">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                title="Delete user"
                                onClick={() => handleDeleteUser(user.id, user.name)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost" title="More options">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default UserManagement;
