
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, MessageSquare, Settings, User, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TopBar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="border-b bg-white shadow-sm z-10">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left section - usually empty or contains breadcrumbs */}
        <div className="flex items-center">
          {/* Breadcrumbs could go here */}
        </div>

        {/* Right section - notifications, messages, and user menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-estate-error text-white">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                {[1, 2, 3].map((i) => (
                  <DropdownMenuItem key={i} className="cursor-pointer py-3">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">New lead assigned</p>
                      <p className="text-xs text-muted-foreground">
                        John Doe has been assigned to you
                      </p>
                      <p className="text-xs text-muted-foreground">2 mins ago</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer justify-center text-estate-navy">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Messages */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <MessageSquare className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-estate-teal text-white">
                  2
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Messages</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                {[1, 2].map((i) => (
                  <DropdownMenuItem key={i} className="cursor-pointer py-3">
                    <div className="flex gap-3 items-start">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=User+${i}&background=2C7A7B&color=fff`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">User {i}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          Latest message from the user would appear here...
                        </p>
                        <p className="text-xs text-muted-foreground">5 mins ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer justify-center text-estate-navy">
                View all messages
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-4 hover:bg-muted">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs capitalize text-muted-foreground">
                    {user.role.replace("_", " ")}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="cursor-pointer text-estate-error">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
