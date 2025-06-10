
export interface Lead {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  property: string;
  value: number;
  probability: number;
  stage: LeadStage;
  assignedAgent?: string;
  assignedTeamLead?: string;
  createdBy: string;
  createdAt: string;
  lastContact: string;
  nextFollowUp?: string;
  notes: string;
  source: LeadSource;
  priority: Priority;
}

export type LeadStage = 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closing' | 'won' | 'lost';

export type LeadSource = 'website' | 'referral' | 'cold_call' | 'email' | 'social_media' | 'advertisement' | 'walk_in';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface FollowUp {
  id: string;
  leadId: string;
  title: string;
  description: string;
  scheduledDate: string;
  assignedTo: string;
  completed: boolean;
  createdAt: string;
}

export interface SalesReport {
  period: string;
  totalLeads: number;
  totalValue: number;
  conversionRate: number;
  avgDealSize: number;
  pipelineValue: number;
  wonDeals: number;
  lostDeals: number;
  stageBreakdown: Record<LeadStage, number>;
}
