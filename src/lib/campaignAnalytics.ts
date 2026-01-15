/**
 * Campaign Analytics Engine
 * 
 * Provides:
 * - Eligibility analysis with compliance breakdown
 * - Segment performance estimation
 * - ROI calculation
 */

export type RFMSegment = 'Champions' | 'Loyal' | 'Potential' | 'At Risk' | 'Hibernating' | 'Lost';
export type ChurnRisk = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface EligibilityBreakdown {
  totalCustomers: number;
  eligible: number;
  ineligible: {
    consentWithdrawn: number;
    caseActive: number;
    segmentMismatch: number;
    churnCritical: number;
  };
  eligibilityRate: number;
}

export interface SegmentPerformance {
  segment: RFMSegment;
  targetedCount: number;
  sentCount: number;
  estimatedEngagement: number;
  projectedConversions: number;
  conversionRate: number;
}

export interface CampaignROI {
  totalCost: number;
  expectedRevenue: number;
  roi: number;
  roiRatio: number;
  breakEvenCount: number;
  projectedConversions: number;
  costPerConversion: number;
}

export interface CampaignAnalytics {
  eligibility: EligibilityBreakdown;
  segmentPerformance: SegmentPerformance[];
  roi: CampaignROI;
}

// Segment engagement propensity
const SEGMENT_ENGAGEMENT_RATES: Record<RFMSegment, number> = {
  'Champions': 0.85,
  'Loyal': 0.70,
  'Potential': 0.60,
  'At Risk': 0.30,
  'Hibernating': 0.15,
  'Lost': 0.05,
};

// Segment conversion propensity
const SEGMENT_CONVERSION_RATES: Record<RFMSegment, number> = {
  'Champions': 0.45,
  'Loyal': 0.35,
  'Potential': 0.25,
  'At Risk': 0.10,
  'Hibernating': 0.05,
  'Lost': 0.02,
};

/**
 * Calculate eligibility breakdown for campaign
 */
export function calculateEligibility(
  targetSegments: RFMSegment[],
  customers: Array<{
    rfmSegment: RFMSegment;
    consentMarketing?: 'GRANTED' | 'WITHDRAWN';
    hasActiveCase?: boolean;
    churnRisk?: ChurnRisk;
  }>
): EligibilityBreakdown {
  const ineligible = {
    consentWithdrawn: 0,
    caseActive: 0,
    segmentMismatch: 0,
    churnCritical: 0,
  };

  let eligible = 0;

  customers.forEach(customer => {
    if (!targetSegments.includes(customer.rfmSegment)) {
      ineligible.segmentMismatch++;
      return;
    }
    if (customer.consentMarketing === 'WITHDRAWN') {
      ineligible.consentWithdrawn++;
      return;
    }
    if (customer.hasActiveCase) {
      ineligible.caseActive++;
      return;
    }
    if (customer.churnRisk === 'CRITICAL') {
      ineligible.churnCritical++;
      return;
    }
    eligible++;
  });

  const totalCustomers = customers.length;
  const eligibilityRate = totalCustomers > 0 ? eligible / totalCustomers : 0;

  return { totalCustomers, eligible, ineligible, eligibilityRate };
}

/**
 * Calculate segment performance metrics
 */
export function calculateSegmentPerformance(
  targetSegments: RFMSegment[],
  customers: Array<{ rfmSegment: RFMSegment }>
): SegmentPerformance[] {
  const segmentCounts = new Map<RFMSegment, number>();

  customers.forEach(customer => {
    if (targetSegments.includes(customer.rfmSegment)) {
      segmentCounts.set(customer.rfmSegment, (segmentCounts.get(customer.rfmSegment) || 0) + 1);
    }
  });

  return targetSegments.map(segment => {
    const targetedCount = segmentCounts.get(segment) || 0;
    const estimatedEngagement = SEGMENT_ENGAGEMENT_RATES[segment] || 0.5;
    const conversionRate = SEGMENT_CONVERSION_RATES[segment] || 0.2;
    const projectedConversions = Math.round(targetedCount * estimatedEngagement * conversionRate);

    return {
      segment,
      targetedCount,
      sentCount: targetedCount,
      estimatedEngagement,
      projectedConversions,
      conversionRate,
    };
  });
}

/**
 * Calculate campaign ROI
 */
export function calculateCampaignROI(
  campaignType: 'EMAIL' | 'SMS' | 'WHATSAPP',
  eligibleCount: number,
  segmentPerformance: SegmentPerformance[],
  avgDealValue: number = 1500000
): CampaignROI {
  const COST_PER_MESSAGE: Record<string, number> = {
    EMAIL: 100,
    SMS: 200,
    WHATSAPP: 150,
  };

  const costPerMessage = COST_PER_MESSAGE[campaignType] || 150;
  const totalCost = eligibleCount * costPerMessage;
  const projectedConversions = segmentPerformance.reduce((sum, perf) => sum + perf.projectedConversions, 0);
  const expectedRevenue = projectedConversions * avgDealValue;
  const roiRatio = totalCost > 0 ? expectedRevenue / totalCost : 0;
  const roi = (roiRatio - 1) * 100;
  const breakEvenCount = totalCost > 0 ? Math.ceil(totalCost / avgDealValue) : 0;
  const costPerConversion = projectedConversions > 0 ? totalCost / projectedConversions : totalCost;

  return { totalCost, expectedRevenue, roi, roiRatio, breakEvenCount, projectedConversions, costPerConversion };
}

/**
 * Generate complete campaign analytics
 */
export function generateCampaignAnalytics(
  campaign: { type: 'EMAIL' | 'SMS' | 'WHATSAPP'; targetSegments: RFMSegment[] },
  customers: Array<{
    rfmSegment: RFMSegment;
    consentMarketing?: 'GRANTED' | 'WITHDRAWN';
    hasActiveCase?: boolean;
    churnRisk?: ChurnRisk;
  }>
): CampaignAnalytics {
  const eligibility = calculateEligibility(campaign.targetSegments, customers);
  const segmentPerformance = calculateSegmentPerformance(campaign.targetSegments, customers);
  const roi = calculateCampaignROI(campaign.type, eligibility.eligible, segmentPerformance);
  return { eligibility, segmentPerformance, roi };
}

/**
 * Format IDR currency
 */
export function formatIDR(amount: number): string {
  if (amount >= 1000000000) return `Rp ${(amount / 1000000000).toFixed(1)}B`;
  if (amount >= 1000000) return `Rp ${(amount / 1000000).toFixed(0)}M`;
  if (amount >= 1000) return `Rp ${(amount / 1000).toFixed(0)}K`;
  return `Rp ${amount.toFixed(0)}`;
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Get ROI color based on value
 */
export function getROIColor(roi: number): { text: string; bg: string } {
  if (roi >= 100) return { text: 'text-green-400', bg: 'bg-green-500' };
  if (roi >= 50) return { text: 'text-blue-400', bg: 'bg-blue-500' };
  if (roi >= 0) return { text: 'text-yellow-400', bg: 'bg-yellow-500' };
  return { text: 'text-red-400', bg: 'bg-red-500' };
}

/**
 * Get segment color
 */
export function getSegmentBgColor(segment: RFMSegment): string {
  const colors: Record<RFMSegment, string> = {
    'Champions': 'from-green-600 to-green-500',
    'Loyal': 'from-blue-600 to-blue-500',
    'Potential': 'from-purple-600 to-purple-500',
    'At Risk': 'from-orange-600 to-orange-500',
    'Hibernating': 'from-red-600 to-red-500',
    'Lost': 'from-slate-600 to-slate-500',
  };
  return colors[segment] || 'from-slate-600 to-slate-500';
}
