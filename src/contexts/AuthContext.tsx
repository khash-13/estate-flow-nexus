
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";

// Define user roles
export type UserRole = 
  | "owner" 
  | "admin" 
  | "sales_manager" 
  | "team_lead" 
  | "agent" 
  | "site_incharge" 
  | "contractor" 
  | "accountant" 
  | "customer_purchased" 
  | "customer_prospect";

// Define the user structure
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Define the context structure
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Sample users for demo purposes
const MOCK_USERS: Record<string, User & { password: string }> = {
  "owner@example.com": {
    id: "1",
    name: "John Smith",
    email: "owner@example.com",
    role: "owner",
    password: "password",
    avatar: "https://ui-avatars.com/api/?name=John+Smith&background=1A365D&color=fff",
  },
  "admin@example.com": {
    id: "2",
    name: "Sarah Johnson",
    email: "admin@example.com",
    role: "admin",
    password: "password",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=2C7A7B&color=fff",
  },
  "salesmanager@example.com": {
    id: "3",
    name: "Michael Brown",
    email: "salesmanager@example.com",
    role: "sales_manager",
    password: "password",
    avatar: "https://ui-avatars.com/api/?name=Michael+Brown&background=ECC94B&color=1A365D",
  },
  "teamlead@example.com": {
    id: "4",
    name: "Emily Davis",
    email: "teamlead@example.com",
    role: "team_lead",
    password: "password",
    avatar: "https://ui-avatars.com/api/?name=Emily+Davis&background=718096&color=fff",
  },
  "agent@example.com": {
    id: "5",
    name: "Robert Wilson",
    email: "agent@example.com",
    role: "agent",
    password: "password",
    avatar: "https://ui-avatars.com/api/?name=Robert+Wilson&background=38A169&color=fff",
  },
  "siteincharge@example.com": {
    id: "6",
    name: "Jennifer Martinez",
    email: "siteincharge@example.com",
    role: "site_incharge",
    password: "password",
    avatar: "https://ui-avatars.com/api/?name=Jennifer+Martinez&background=4299E1&color=fff",
  },
  "contractor@example.com": {
    id: "7",
    name: "David Williams",
    email: "contractor@example.com",
    role: "contractor",
    password: "password",
    avatar: "https://ui-avatars.com/api/?name=David+Williams&background=ED8936&color=fff",
  },
  "accountant@example.com": {
    id: "8",
    name: "Lisa Thompson",
    email: "accountant@example.com",
    role: "accountant",
    password: "password",
    avatar: "https://ui-avatars.com/api/?name=Lisa+Thompson&background=9F7AEA&color=fff",
  },
};

// Create the provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, you would call an API here
      // Simulating API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const mockUser = MOCK_USERS[email.toLowerCase()];
      
      if (mockUser && mockUser.password === password) {
        const { password: _, ...userWithoutPassword } = mockUser;
        setUser(userWithoutPassword);
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        toast.success(`Welcome back, ${userWithoutPassword.name}`);
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook for using the auth context
export const useAuth = () => useContext(AuthContext);
