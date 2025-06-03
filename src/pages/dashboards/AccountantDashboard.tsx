
import { useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "@/components/dashboard/StatCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import { FileText, CreditCard, BarChart3, Calculator, Receipt, ClipboardList, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Sample data
const recentActivities = [
  {
    id: "1",
    user: {
      name: "John Smith",
      avatar: "https://ui-avatars.com/api/?name=John+Smith&background=1A365D&color=fff",
    },
    action: "approved",
    target: "Invoice #4832",
    timestamp: "1 hour ago",
    type: "approval" as const,
  },
  {
    id: "2",
    user: {
      name: "Sarah Johnson",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=2C7A7B&color=fff",
    },
    action: "processed payment for",
    target: "Golden Heights Phase 2",
    timestamp: "3 hours ago",
    type: "document" as const,
  },
  {
    id: "3",
    user: {
      name: "Robert Wilson",
      avatar: "https://ui-avatars.com/api/?name=Robert+Wilson&background=38A169&color=fff",
    },
    action: "generated monthly report for",
    target: "Q2 Financials",
    timestamp: "yesterday",
    type: "document" as const,
  },
];

const quickActions = [
  { title: "Budget Tracking", description: "Monitor budgets and cash flow", link: "/budgets", icon: ClipboardList },
  { title: "Tax Documents", description: "Manage GST, TDS, and Income Tax", link: "/taxes", icon: Calculator },
  { title: "Financial Reports", description: "Generate financial reports", link: "/reports", icon: BarChart3 },
  { title: "Invoice Management", description: "Create and manage invoices", link: "/invoices", icon: FileText },
];

const AccountantDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Finance Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to CSK - Real Manager financial overview
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto mt-4 md:mt-0">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pending Invoices"
          value="32"
          icon={<FileText className="h-6 w-6 text-estate-navy" />}
          trend={{ value: 5.2, isPositive: false }}
        />
        <StatCard
          title="Monthly Revenue"
          value="₹124.5L"
          icon={<CreditCard className="h-6 w-6 text-estate-teal" />}
          trend={{ value: 8.4, isPositive: true }}
        />
        <StatCard
          title="Overdue Payments"
          value="₹32.8L"
          icon={<Receipt className="h-6 w-6 text-estate-error" />}
          trend={{ value: 2.1, isPositive: false }}
        />
        <StatCard
          title="Budget Variance"
          value="+3.2%"
          icon={<Calculator className="h-6 w-6 text-estate-gold" />}
          trend={{ value: 1.8, isPositive: true }}
        />
      </div>

      {/* Quick Actions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.title} to={action.link}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <action.icon className="h-8 w-8 text-estate-navy" />
                      <div>
                        <h3 className="font-medium">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                <BarChart3 className="h-16 w-16 text-estate-navy/20" />
                <p className="text-muted-foreground ml-2">Monthly financial breakdown</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <ActivityFeed activities={recentActivities} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Invoices</CardTitle>
            <Link to="/invoices">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex flex-col gap-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Receipt className="h-5 w-5 text-estate-navy" />
                    <div>
                      <p className="text-sm font-medium">Invoice #{1000 + i}</p>
                      <p className="text-xs text-muted-foreground">Property: Skyline Towers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">₹{(Math.random() * 1000000).toFixed(0)}</p>
                    <p className="text-xs text-estate-teal">Pending</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Tax Compliance</CardTitle>
            <Link to="/taxes">
              <Button variant="outline" size="sm">Manage</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  <span className="text-sm">GST Returns</span>
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Filed</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">TDS Returns</span>
                </div>
                <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">Pending</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="text-sm">Income Tax</span>
                </div>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Completed</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">Audit Status</span>
                </div>
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">In Progress</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountantDashboard;
