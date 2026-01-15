// Mock Data for CRM Bank Sumut
// This file contains sample data for development and demo purposes
// Replace with API calls in production

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
  lastContact: string;
  score: number;
  segment: string;
  notes: string;
}

export interface Opportunity {
  id: number;
  name: string;
  company: string;
  value: string;
  valueNum: number;
  stage: 'Prospecting' | 'Qualification' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  probability: number;
  expectedCloseDate: string;
  owner: string;
  product: string;
  source: string;
  nextAction: string;
  daysInStage: number;
}

export interface Account {
  id: number;
  name: string;
  type: 'Individual' | 'Corporate' | 'SME';
  industry: string;
  totalAssets: string;
  totalLiabilities: string;
  netWorth: string;
  rfmSegment: 'Champions' | 'Loyal' | 'Potential' | 'At Risk' | 'Hibernating' | 'Lost';
  rfmScore: { r: number; f: number; m: number };
  relationship: string;
  accountManager: string;
  products: string[];
  lastTransaction: string;
  status: 'Active' | 'Dormant' | 'Closed';
  hasActiveCase?: boolean;
}

export interface Contact {
  id: number;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  mobile: string;
  preferredChannel: 'Email' | 'Phone' | 'WhatsApp' | 'SMS';
  lastInteraction: string;
  totalInteractions: number;
  notes: string;
  tags: string[];
  avatar: string;
}

// ==================== LEADS DATA ====================
export const mockLeads: Lead[] = [
  {
    id: 1,
    name: 'Ahmad Fadli',
    company: 'PT Maju Bersama',
    email: 'ahmad.fadli@majubersama.co.id',
    phone: '+62 812-3456-7890',
    source: 'Website',
    status: 'Qualified',
    value: 'Rp 2.5B',
    probability: 75,
    assignedTo: 'Siti Nurhaliza',
    createdAt: '2025-01-10',
    lastContact: '2025-01-14',
    score: 85,
    segment: 'Corporate',
    notes: 'Interested in KPR for warehouse expansion'
  },
  {
    id: 2,
    name: 'Dewi Sartika',
    company: 'CV Sejahtera',
    email: 'dewi@sejahtera.com',
    phone: '+62 813-5678-1234',
    source: 'Referral',
    status: 'Proposal',
    value: 'Rp 850M',
    probability: 60,
    assignedTo: 'Ahmad Rizki',
    createdAt: '2025-01-08',
    lastContact: '2025-01-13',
    score: 72,
    segment: 'SME',
    notes: 'Looking for business loan for equipment upgrade'
  },
  {
    id: 3,
    name: 'Budi Hartono',
    company: 'Personal',
    email: 'budi.hartono@gmail.com',
    phone: '+62 815-9876-5432',
    source: 'Branch Walk-in',
    status: 'New',
    value: 'Rp 500M',
    probability: 30,
    assignedTo: 'Linda Kusuma',
    createdAt: '2025-01-14',
    lastContact: '2025-01-14',
    score: 45,
    segment: 'Individual',
    notes: 'First-time home buyer, needs financing consultation'
  },
  {
    id: 4,
    name: 'Rizky Pratama',
    company: 'PT Teknologi Nusantara',
    email: 'rizky@teknusa.co.id',
    phone: '+62 811-2233-4455',
    source: 'Digital Ads',
    status: 'Contacted',
    value: 'Rp 1.8B',
    probability: 45,
    assignedTo: 'Budi Santoso',
    createdAt: '2025-01-12',
    lastContact: '2025-01-13',
    score: 68,
    segment: 'Corporate',
    notes: 'Tech company looking for working capital'
  },
  {
    id: 5,
    name: 'Sari Indah',
    company: 'Toko Sari Rasa',
    email: 'sari.indah@sarirasa.com',
    phone: '+62 817-6655-4433',
    source: 'Campaign Email',
    status: 'Negotiation',
    value: 'Rp 350M',
    probability: 85,
    assignedTo: 'Siti Nurhaliza',
    createdAt: '2025-01-05',
    lastContact: '2025-01-14',
    score: 92,
    segment: 'SME',
    notes: 'Almost ready to close, waiting for document verification'
  },
  {
    id: 6,
    name: 'Michael Tanujaya',
    company: 'PT Global Trade',
    email: 'm.tanujaya@globaltrade.co.id',
    phone: '+62 812-8899-0011',
    source: 'Partner Referral',
    status: 'Won',
    value: 'Rp 5.2B',
    probability: 100,
    assignedTo: 'Ahmad Rizki',
    createdAt: '2024-12-20',
    lastContact: '2025-01-10',
    score: 98,
    segment: 'Corporate',
    notes: 'Successfully closed trade financing deal'
  }
];

// ==================== OPPORTUNITIES DATA ====================
export const mockOpportunities: Opportunity[] = [
  {
    id: 1,
    name: 'KPR Gudang Expansion',
    company: 'PT Maju Bersama',
    value: 'Rp 2.5B',
    valueNum: 2500000000,
    stage: 'Qualification',
    probability: 60,
    expectedCloseDate: '2025-02-28',
    owner: 'Siti Nurhaliza',
    product: 'KPR Commercial',
    source: 'Website Lead',
    nextAction: 'Site visit scheduled',
    daysInStage: 5
  },
  {
    id: 2,
    name: 'Business Loan Equipment',
    company: 'CV Sejahtera',
    value: 'Rp 850M',
    valueNum: 850000000,
    stage: 'Proposal',
    probability: 70,
    expectedCloseDate: '2025-02-15',
    owner: 'Ahmad Rizki',
    product: 'Kredit Modal Kerja',
    source: 'Referral',
    nextAction: 'Proposal review meeting',
    daysInStage: 3
  },
  {
    id: 3,
    name: 'Trade Financing Q1',
    company: 'PT Global Trade',
    value: 'Rp 8.5B',
    valueNum: 8500000000,
    stage: 'Negotiation',
    probability: 85,
    expectedCloseDate: '2025-01-30',
    owner: 'Ahmad Rizki',
    product: 'Trade Financing',
    source: 'Existing Customer',
    nextAction: 'Final terms negotiation',
    daysInStage: 7
  },
  {
    id: 4,
    name: 'KPR Subsidi Cluster',
    company: 'Developer Nusantara',
    value: 'Rp 12.4B',
    valueNum: 12400000000,
    stage: 'Prospecting',
    probability: 25,
    expectedCloseDate: '2025-04-30',
    owner: 'Linda Kusuma',
    product: 'KPR Subsidi',
    source: 'Partnership',
    nextAction: 'Initial meeting with developer',
    daysInStage: 2
  },
  {
    id: 5,
    name: 'SME Batch Financing',
    company: 'Koperasi Makmur',
    value: 'Rp 3.2B',
    valueNum: 3200000000,
    stage: 'Closed Won',
    probability: 100,
    expectedCloseDate: '2025-01-10',
    owner: 'Budi Santoso',
    product: 'Kredit UMKM',
    source: 'Government Program',
    nextAction: 'Disbursement in progress',
    daysInStage: 0
  }
];

// ==================== ACCOUNTS DATA ====================
export const mockAccounts: Account[] = [
  {
    id: 1,
    name: 'PT Maju Bersama',
    type: 'Corporate',
    industry: 'Manufacturing',
    totalAssets: 'Rp 45.8B',
    totalLiabilities: 'Rp 18.2B',
    netWorth: 'Rp 27.6B',
    rfmSegment: 'Champions',
    rfmScore: { r: 5, f: 5, m: 5 },
    relationship: '8 years',
    accountManager: 'Ahmad Rizki',
    products: ['Giro', 'Deposito', 'KMK', 'Trade Finance'],
    lastTransaction: '2026-01-14',
    status: 'Active',
    hasActiveCase: false
  },
  {
    id: 2,
    name: 'CV Sejahtera',
    type: 'SME',
    industry: 'Retail',
    totalAssets: 'Rp 2.4B',
    totalLiabilities: 'Rp 850M',
    netWorth: 'Rp 1.55B',
    rfmSegment: 'Loyal',
    rfmScore: { r: 4, f: 4, m: 3 },
    relationship: '5 years',
    accountManager: 'Siti Nurhaliza',
    products: ['Giro', 'KMK', 'POS Integration'],
    lastTransaction: '2026-01-12',
    status: 'Active',
    hasActiveCase: false
  },
  {
    id: 3,
    name: 'Budi Hartono',
    type: 'Individual',
    industry: 'Personal Banking',
    totalAssets: 'Rp 580M',
    totalLiabilities: 'Rp 0',
    netWorth: 'Rp 580M',
    rfmSegment: 'Potential',
    rfmScore: { r: 3, f: 2, m: 4 },
    relationship: '2 years',
    accountManager: 'Linda Kusuma',
    products: ['Tabungan', 'Deposito'],
    lastTransaction: '2026-01-05',
    status: 'Active',
    hasActiveCase: false
  },
  {
    id: 4,
    name: 'PT Teknologi Nusantara',
    type: 'Corporate',
    industry: 'Technology',
    totalAssets: 'Rp 18.5B',
    totalLiabilities: 'Rp 6.2B',
    netWorth: 'Rp 12.3B',
    rfmSegment: 'At Risk',
    rfmScore: { r: 2, f: 3, m: 4 },
    relationship: '4 years',
    accountManager: 'Budi Santoso',
    products: ['Giro', 'Virtual Account'],
    lastTransaction: '2025-11-15',
    status: 'Active',
    hasActiveCase: true
  },
  {
    id: 5,
    name: 'Toko Sari Rasa',
    type: 'SME',
    industry: 'Food & Beverage',
    totalAssets: 'Rp 890M',
    totalLiabilities: 'Rp 350M',
    netWorth: 'Rp 540M',
    rfmSegment: 'Loyal',
    rfmScore: { r: 5, f: 4, m: 3 },
    relationship: '3 years',
    accountManager: 'Siti Nurhaliza',
    products: ['Giro', 'EDC', 'QRIS'],
    lastTransaction: '2026-01-14',
    status: 'Active',
    hasActiveCase: false
  },
  {
    id: 6,
    name: 'PT Karya Mandiri',
    type: 'Corporate',
    industry: 'Construction',
    totalAssets: 'Rp 8.2B',
    totalLiabilities: 'Rp 4.5B',
    netWorth: 'Rp 3.7B',
    rfmSegment: 'Hibernating',
    rfmScore: { r: 1, f: 1, m: 3 },
    relationship: '6 years',
    accountManager: 'Ahmad Rizki',
    products: ['Giro'],
    lastTransaction: '2025-09-20',
    status: 'Dormant',
    hasActiveCase: true
  }
];

// ==================== CONTACTS DATA ====================
export const mockContacts: Contact[] = [
  {
    id: 1,
    name: 'Ahmad Fadli',
    position: 'CEO',
    company: 'PT Maju Bersama',
    email: 'ahmad.fadli@majubersama.co.id',
    phone: '+62 21-5678-9012',
    mobile: '+62 812-3456-7890',
    preferredChannel: 'WhatsApp',
    lastInteraction: '2025-01-14',
    totalInteractions: 24,
    notes: 'Decision maker for all financing needs',
    tags: ['VIP', 'Decision Maker', 'Corporate'],
    avatar: 'AF'
  },
  {
    id: 2,
    name: 'Dewi Sartika',
    position: 'Finance Manager',
    company: 'CV Sejahtera',
    email: 'dewi@sejahtera.com',
    phone: '+62 21-1234-5678',
    mobile: '+62 813-5678-1234',
    preferredChannel: 'Email',
    lastInteraction: '2025-01-13',
    totalInteractions: 15,
    notes: 'Handles all financial decisions, very detail-oriented',
    tags: ['Finance', 'SME'],
    avatar: 'DS'
  },
  {
    id: 3,
    name: 'Michael Tanujaya',
    position: 'Director',
    company: 'PT Global Trade',
    email: 'm.tanujaya@globaltrade.co.id',
    phone: '+62 21-9876-5432',
    mobile: '+62 812-8899-0011',
    preferredChannel: 'Phone',
    lastInteraction: '2025-01-10',
    totalInteractions: 42,
    notes: 'Long-term relationship, prefers phone calls for important matters',
    tags: ['VIP', 'Director', 'Trade Finance'],
    avatar: 'MT'
  },
  {
    id: 4,
    name: 'Rizky Pratama',
    position: 'CFO',
    company: 'PT Teknologi Nusantara',
    email: 'rizky@teknusa.co.id',
    phone: '+62 21-2233-4455',
    mobile: '+62 811-2233-4455',
    preferredChannel: 'Email',
    lastInteraction: '2025-01-13',
    totalInteractions: 8,
    notes: 'New contact, still building relationship',
    tags: ['Tech', 'CFO', 'New Lead'],
    avatar: 'RP'
  },
  {
    id: 5,
    name: 'Sari Indah',
    position: 'Owner',
    company: 'Toko Sari Rasa',
    email: 'sari.indah@sarirasa.com',
    phone: '+62 61-6655-4433',
    mobile: '+62 817-6655-4433',
    preferredChannel: 'WhatsApp',
    lastInteraction: '2025-01-14',
    totalInteractions: 31,
    notes: 'Very responsive, quick decision maker',
    tags: ['SME Owner', 'F&B', 'Quick Closer'],
    avatar: 'SI'
  }
];

// ==================== PIPELINE SUMMARY ====================
export const pipelineSummary = {
  totalValue: 'Rp 27.45B',
  totalDeals: 5,
  avgDealSize: 'Rp 5.49B',
  winRate: 20,
  avgCycleTime: 28,
  byStage: [
    { stage: 'Prospecting', count: 1, value: 'Rp 12.4B' },
    { stage: 'Qualification', count: 1, value: 'Rp 2.5B' },
    { stage: 'Proposal', count: 1, value: 'Rp 850M' },
    { stage: 'Negotiation', count: 1, value: 'Rp 8.5B' },
    { stage: 'Closed Won', count: 1, value: 'Rp 3.2B' }
  ]
};

// ==================== CAMPAIGNS DATA ====================
export type RFMSegment = 'Champions' | 'Loyal' | 'Potential' | 'At Risk' | 'Hibernating' | 'Lost';

export interface Campaign {
  id: string;
  name: string;
  type: 'EMAIL' | 'SMS' | 'WHATSAPP';
  status: 'DRAFT' | 'APPROVED' | 'EXECUTED' | 'COMPLETED';
  targetSegments: RFMSegment[];
  createdBy: string;
  createdAt: string;
  executedAt?: string;
  description: string;
}

export const mockCampaigns: Campaign[] = [
  {
    id: 'CMP001',
    name: 'Credit Card Cross-sell Campaign',
    type: 'EMAIL',
    status: 'EXECUTED',
    targetSegments: ['Potential', 'Champions'],
    createdBy: 'Marketing Team',
    createdAt: '2026-01-05',
    executedAt: '2026-01-10',
    description: 'Promote premium credit cards to high-potential customers',
  },
  {
    id: 'CMP002',
    name: 'Wealth Management Premium Offer',
    type: 'EMAIL',
    status: 'COMPLETED',
    targetSegments: ['Champions'],
    createdBy: 'Sales Team',
    createdAt: '2026-01-01',
    executedAt: '2026-01-08',
    description: 'Exclusive wealth management services for Champions segment',
  },
  {
    id: 'CMP003',
    name: 'Win-back Campaign - Hibernating',
    type: 'SMS',
    status: 'EXECUTED',
    targetSegments: ['Hibernating', 'At Risk'],
    createdBy: 'Retention Team',
    createdAt: '2026-01-12',
    executedAt: '2026-01-14',
    description: 'Special offers to reactivate dormant accounts',
  },
  {
    id: 'CMP004',
    name: 'Savings Account Upgrade',
    type: 'WHATSAPP',
    status: 'APPROVED',
    targetSegments: ['Loyal', 'Potential'],
    createdBy: 'Product Team',
    createdAt: '2026-01-14',
    description: 'Promote higher-tier savings accounts',
  },
  {
    id: 'CMP005',
    name: 'Digital Banking Onboarding',
    type: 'EMAIL',
    status: 'DRAFT',
    targetSegments: ['Potential', 'At Risk'],
    createdBy: 'Digital Team',
    createdAt: '2026-01-15',
    description: 'Drive mobile app adoption and digital features',
  },
];

// ==================== CUSTOMERS FOR CAMPAIGN ANALYTICS ====================
export interface CustomerForCampaign {
  id: string;
  name: string;
  rfmSegment: RFMSegment;
  consentMarketing: 'GRANTED' | 'WITHDRAWN';
  hasActiveCase: boolean;
  churnRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export const mockCustomersForCampaign: CustomerForCampaign[] = [
  { id: '1', name: 'PT Maju Bersama', rfmSegment: 'Champions', consentMarketing: 'GRANTED', hasActiveCase: false, churnRisk: 'LOW' },
  { id: '2', name: 'CV Sejahtera', rfmSegment: 'Loyal', consentMarketing: 'GRANTED', hasActiveCase: false, churnRisk: 'LOW' },
  { id: '3', name: 'Budi Hartono', rfmSegment: 'Potential', consentMarketing: 'GRANTED', hasActiveCase: false, churnRisk: 'MEDIUM' },
  { id: '4', name: 'PT Teknologi Nusantara', rfmSegment: 'At Risk', consentMarketing: 'GRANTED', hasActiveCase: true, churnRisk: 'HIGH' },
  { id: '5', name: 'Toko Sari Rasa', rfmSegment: 'Loyal', consentMarketing: 'GRANTED', hasActiveCase: false, churnRisk: 'LOW' },
  { id: '6', name: 'PT Karya Mandiri', rfmSegment: 'Hibernating', consentMarketing: 'GRANTED', hasActiveCase: true, churnRisk: 'CRITICAL' },
  { id: '7', name: 'Dewi Lestari', rfmSegment: 'Champions', consentMarketing: 'GRANTED', hasActiveCase: false, churnRisk: 'LOW' },
  { id: '8', name: 'PT Sukses Abadi', rfmSegment: 'Champions', consentMarketing: 'WITHDRAWN', hasActiveCase: false, churnRisk: 'LOW' },
  { id: '9', name: 'Ahmad Wijaya', rfmSegment: 'Potential', consentMarketing: 'GRANTED', hasActiveCase: false, churnRisk: 'MEDIUM' },
  { id: '10', name: 'Rina Susanti', rfmSegment: 'Loyal', consentMarketing: 'GRANTED', hasActiveCase: false, churnRisk: 'LOW' },
  { id: '11', name: 'PT Global Jaya', rfmSegment: 'Potential', consentMarketing: 'GRANTED', hasActiveCase: false, churnRisk: 'MEDIUM' },
  { id: '12', name: 'Hendra Kusuma', rfmSegment: 'At Risk', consentMarketing: 'GRANTED', hasActiveCase: false, churnRisk: 'HIGH' },
  { id: '13', name: 'CV Sentosa', rfmSegment: 'Hibernating', consentMarketing: 'GRANTED', hasActiveCase: false, churnRisk: 'CRITICAL' },
  { id: '14', name: 'Maya Putri', rfmSegment: 'Loyal', consentMarketing: 'WITHDRAWN', hasActiveCase: false, churnRisk: 'LOW' },
  { id: '15', name: 'PT Delta Mandiri', rfmSegment: 'Champions', consentMarketing: 'GRANTED', hasActiveCase: false, churnRisk: 'LOW' },
];

