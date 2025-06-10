import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp, Target, DollarSign, Users
} from "lucide-react";
import { useState } from "react";
import { Lead, FollowUp, LeadStage } from "@/types/lead";
import { AddLeadDialog } from "@/components/sales/AddLeadDialog";
import { ImportLeadsDialog } from "@/components/sales/ImportLeadsDialog";
import { ScheduleFollowUpDialog } from "@/components/sales/ScheduleFollowUpDialog";
import { SalesReportDialog } from "@/components/sales/SalesReportDialog";
import { LeadCard } from "@/components/sales/LeadCard";
import { UpcomingFollowUps } from "@/components/sales/UpcomingFollowUps";
import { formatIndianCurrency } from "@/lib/formatCurrency";
import { useToast } from "@/hooks/use-toast";

const initialLeads: Lead[] = [
  {
    id: "1",
    customerName: "John Smith",
    email: "john@example.com",
    phone: "9876543210",
    property: "Skyline Towers",
    value: 4500000,
    probability: 20,
    stage: "prospecting" as LeadStage,
    assignedAgent: "Robert Wilson",
    createdBy: "sales-manager",
    createdAt: "2024-01-15T10:00:00Z",
    lastContact: "2 days ago",
    nextFollowUp: "2024-01-20T14:00:00Z",
    notes: "Interested in 3BHK apartment",
    source: "website",
    priority: "medium"
  },
  {
    id: "2",
    customerName: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "9876543211",
    property: "Riverside Apartments",
    value: 3200000,
    probability: 15,
    stage: "prospecting" as LeadStage,
    assignedAgent: "Emily Davis",
    createdBy: "sales-manager",
    createdAt: "2024-01-14T09:00:00Z",
    lastContact: "1 week ago",
    notes: "Looking for 2BHK",
    source: "referral",
    priority: "low"
  },
  {
    id: "3",
    customerName: "Michael Brown",
    email: "michael@example.com",
    phone: "9876543212",
    property: "Golden Heights",
    value: 7800000,
    probability: 40,
    stage: "qualification" as LeadStage,
    assignedAgent: "David Thompson",
    createdBy: "sales-manager",
    createdAt: "2024-01-13T11:00:00Z",
    lastContact: "Yesterday",
    notes: "Interested in penthouse",
    source: "cold_call",
    priority: "high"
  },
  {
    id: "4",
    customerName: "Lisa Anderson",
    email: "lisa@example.com",
    phone: "9876543213",
    property: "Parkview Residences",
    value: 5200000,
    probability: 35,
    stage: "qualification" as LeadStage,
    assignedAgent: "Robert Wilson",
    createdBy: "sales-manager",
    createdAt: "2024-01-12T14:00:00Z",
    lastContact: "3 days ago",
    notes: "Looking for family home",
    source: "email",
    priority: "medium"
  },
  {
    id: "5",
    customerName: "David Wilson",
    email: "david@example.com",
    phone: "9876543214",
    property: "Riverside Apartments",
    value: 6900000,
    probability: 70,
    stage: "proposal" as LeadStage,
    assignedAgent: "Emily Davis",
    createdBy: "sales-manager",
    createdAt: "2024-01-11T16:00:00Z",
    lastContact: "Today",
    notes: "Reviewing the proposal",
    source: "social_media",
    priority: "high"
  },
  {
    id: "6",
    customerName: "Jennifer Martinez",
    email: "jennifer@example.com",
    phone: "9876543215",
    property: "Skyline Towers",
    value: 4100000,
    probability: 65,
    stage: "proposal" as LeadStage,
    assignedAgent: "Lisa Anderson",
    createdBy: "sales-manager",
    createdAt: "2024-01-10T10:00:00Z",
    lastContact: "Yesterday",
    notes: "Waiting for feedback on proposal",
    source: "advertisement",
    priority: "medium"
  },
  {
    id: "7",
    customerName: "Robert Taylor",
    email: "robert@example.com",
    phone: "9876543216",
    property: "Golden Heights",
    value: 8500000,
    probability: 85,
    stage: "negotiation" as LeadStage,
    assignedAgent: "David Thompson",
    createdBy: "sales-manager",
    createdAt: "2024-01-09T12:00:00Z",
    lastContact: "Today",
    notes: "Negotiating price",
    source: "walk_in",
    priority: "urgent"
  },
  {
    id: "8",
    customerName: "Mary Johnson",
    email: "mary@example.com",
    phone: "9876543217",
    property: "Parkview Residences",
    value: 7200000,
    probability: 95,
    stage: "closing" as LeadStage,
    assignedAgent: "Robert Wilson",
    createdBy: "sales-manager",
    createdAt: "2024-01-08T14:00:00Z",
    lastContact: "Today",
    notes: "Finalizing paperwork",
    source: "website",
    priority: "urgent"
  }
];

const initialFollowUps: FollowUp[] = [
  {
    id: "1",
    leadId: "1",
    title: "Property tour follow-up",
    description: "Follow up on the property tour scheduled for last week",
    scheduledDate: "2024-01-20T14:00:00Z",
    assignedTo: "Robert Wilson",
    completed: false,
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "2",
    leadId: "2",
    title: "Discuss financing options",
    description: "Discuss available financing options with the client",
    scheduledDate: "2024-01-22T11:00:00Z",
    assignedTo: "Emily Davis",
    completed: false,
    createdAt: "2024-01-16T09:00:00Z"
  },
  {
    id: "3",
    leadId: "3",
    title: "Finalize proposal details",
    description: "Finalize the proposal details and send it to the client",
    scheduledDate: "2024-01-25T15:00:00Z",
    assignedTo: "David Thompson",
    completed: false,
    createdAt: "2024-01-17T11:00:00Z"
  },
  {
    id: "4",
    leadId: "4",
    title: "Negotiate terms",
    description: "Negotiate the terms and conditions with the client",
    scheduledDate: "2024-01-28T10:00:00Z",
    assignedTo: "Lisa Anderson",
    completed: false,
    createdAt: "2024-01-18T13:00:00Z"
  },
  {
    id: "5",
    leadId: "5",
    title: "Complete paperwork",
    description: "Complete the necessary paperwork for closing the deal",
    scheduledDate: "2024-01-30T16:00:00Z",
    assignedTo: "Robert Wilson",
    completed: false,
    createdAt: "2024-01-19T15:00:00Z"
  }
];

const SalesPipeline = () => {
  const [timeFilter, setTimeFilter] = useState("all");
  const [agentFilter, setAgentFilter] = useState("all");
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [followUps, setFollowUps] = useState<FollowUp[]>(initialFollowUps);
  const { toast } = useToast();

  const handleAddLead = (newLead: Omit<Lead, 'id' | 'createdAt' | 'createdBy'>) => {
    const lead: Lead = {
      ...newLead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      createdBy: "sales-manager"
    };
    setLeads([...leads, lead]);
    toast({
      title: "Lead added successfully",
      description: `${lead.customerName} has been added to the pipeline`,
    });
  };

  const handleImportLeads = (importedLeads: Lead[]) => {
    setLeads([...leads, ...importedLeads]);
  };

  const handleScheduleFollowUp = (followUp: Omit<FollowUp, 'id' | 'createdAt'>) => {
    const newFollowUp: FollowUp = {
      ...followUp,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setFollowUps([...followUps, newFollowUp]);
    toast({
      title: "Follow-up scheduled",
      description: "Follow-up has been scheduled successfully",
    });
  };

  const handleCompleteFollowUp = (followUpId: string) => {
    setFollowUps(followUps.map(f => 
      f.id === followUpId ? { ...f, completed: true } : f
    ));
    toast({
      title: "Follow-up completed",
      description: "Follow-up marked as completed",
    });
  };

  const handleGenerateReport = (period: string) => {
    toast({
      title: "Report generated",
      description: `Sales report for ${period} has been generated`,
    });
  };

  const handleViewLead = (lead: Lead) => {
    toast({
      title: "Lead details",
      description: `Viewing details for ${lead.customerName}`,
    });
  };

  const handleEditLead = (lead: Lead) => {
    toast({
      title: "Edit lead",
      description: `Editing lead for ${lead.customerName}`,
    });
  };

  const handleCallLead = (lead: Lead) => {
    toast({
      title: "Calling customer",
      description: `Initiating call to ${lead.customerName} at ${lead.phone}`,
    });
  };

  const handleEmailLead = (lead: Lead) => {
    toast({
      title: "Sending email",
      description: `Opening email composer for ${lead.customerName}`,
    });
  };

  const getLeadsByStage = (stage: LeadStage) => {
    return leads.filter(lead => lead.stage === stage);
  };

  const getTotalValue = (stage: LeadStage) => {
    return getLeadsByStage(stage).reduce((sum, lead) => sum + lead.value, 0);
  };

  const getStageColor = (stage: LeadStage) => {
    const colors = {
      "prospecting": "bg-slate-100 text-slate-800",
      "qualification": "bg-blue-100 text-blue-800",
      "proposal": "bg-yellow-100 text-yellow-800",
      "negotiation": "bg-orange-100 text-orange-800",
      "closing": "bg-green-100 text-green-800",
      "won": "bg-green-500 text-white",
      "lost": "bg-red-500 text-white"
    };
    return colors[stage] || "bg-gray-100 text-gray-800";
  };

  const stages: LeadStage[] = ['prospecting', 'qualification', 'proposal', 'negotiation', 'closing'];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Sales Pipeline</h1>
            <p className="text-muted-foreground">
              Track and manage your sales opportunities
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Time Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
            <Select value={agentFilter} onValueChange={setAgentFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Agents" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="robert">Robert Wilson</SelectItem>
                <SelectItem value="emily">Emily Davis</SelectItem>
                <SelectItem value="david">David Thompson</SelectItem>
                <SelectItem value="lisa">Lisa Anderson</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stages.map((stage) => (
            <Card key={stage} className="h-fit">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge className={getStageColor(stage)}>
                    {stage.charAt(0).toUpperCase() + stage.slice(1)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {getLeadsByStage(stage).length} leads
                  </span>
                </div>
                <p className="text-lg font-semibold">
                  {formatIndianCurrency(getTotalValue(stage))}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {getLeadsByStage(stage).map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onView={handleViewLead}
                    onEdit={handleEditLead}
                    onCall={handleCallLead}
                    onEmail={handleEmailLead}
                  />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-estate-navy" />
                Pipeline Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-estate-navy">
                    {formatIndianCurrency(leads.reduce((sum, lead) => sum + lead.value, 0))}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Pipeline</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-estate-teal">{leads.length}</p>
                  <p className="text-sm text-muted-foreground">Active Leads</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-estate-gold">
                    {Math.round(leads.reduce((sum, lead) => sum + lead.probability, 0) / leads.length)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Avg. Probability</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-estate-success">28 days</p>
                  <p className="text-sm text-muted-foreground">Avg. Cycle</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <UpcomingFollowUps 
            followUps={followUps}
            onComplete={handleCompleteFollowUp}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5 text-estate-navy" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <AddLeadDialog onAddLead={handleAddLead} />
            <ImportLeadsDialog onImportLeads={handleImportLeads} />
            <ScheduleFollowUpDialog onScheduleFollowUp={handleScheduleFollowUp} />
            <SalesReportDialog onGenerateReport={handleGenerateReport} />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SalesPipeline;
