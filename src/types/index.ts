import type { LucideIcon } from 'lucide-react';

// Navigation Types
export interface SubMenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  subMenu?: SubMenuItem[];
}

// Customer Types
export interface Customer {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  segment: 'Premium' | 'Mass Market' | 'SME' | 'Corporate';
  status: string;
  lifetimeValue?: string;
  lastEngagement?: string;
  openRate?: number;
  clickRate?: number;
  conversionRate?: number;
  preferredChannel?: string;
  interests?: string[];
  campaignsReceived?: number;
  emailOpens?: number;
  clickThrough?: number;
  campaignHistory?: CampaignHistory[];
}

export interface CampaignHistory {
  campaign: string;
  date: string;
  action: string;
  channel: string;
}

// Marketing Types
export interface Campaign {
  id: number;
  name: string;
  type: 'Email' | 'SMS' | 'WhatsApp' | 'Social';
  status: 'Active' | 'Scheduled' | 'Completed' | 'Draft';
  sent: number;
  opened: number;
  clicked: number;
  budget: string;
  roi: string;
  endDate: string;
}

export interface ChannelPerformance {
  channel: string;
  campaigns: number;
  reach: number;
  engagement: number;
  conversion: number;
  color: string;
}

// Sales Types
export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  value: string;
  probability: number;
  assignedTo: string;
  createdAt: string;
}

export interface Opportunity {
  id: number;
  name: string;
  company: string;
  value: string;
  stage: string;
  probability: number;
  expectedCloseDate: string;
  owner: string;
}

export interface Account {
  id: number;
  name: string;
  industry: string;
  size: string;
  revenue: string;
  status: string;
  contacts: number;
  opportunities: number;
}

// Service Types
export interface Ticket {
  id: string;
  subject: string;
  customer: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Pending' | 'Resolved' | 'Closed';
  category: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeArticle {
  id: number;
  title: string;
  category: string;
  views: number;
  helpful: number;
  updatedAt: string;
}

export interface Feedback {
  id: number;
  customer: string;
  rating: number;
  comment: string;
  category: string;
  createdAt: string;
}

// RFM Types
export interface RFMSegment {
  name: string;
  rfm: string;
  count: number;
  value: string;
  color: string;
  growth: string;
}

// Settings Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
  avatar?: string;
}

export interface Integration {
  id: number;
  name: string;
  type: string;
  status: 'Connected' | 'Disconnected' | 'Error';
  lastSync?: string;
  icon: string;
}
