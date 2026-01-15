// Churn Risk Scoring Utility
// Calculates customer churn risk based on RFM segment, activity, and service status

export type ChurnRisk = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type RFMSegment = 'Champions' | 'Loyal' | 'Potential' | 'At Risk' | 'Hibernating' | 'Lost';

export interface ChurnRiskResult {
  risk: ChurnRisk;
  score: number;
  factors: string[];
  recommendation: string;
}

// Priority weights for sorting
export const churnRiskPriority: Record<ChurnRisk, number> = {
  'CRITICAL': 1,
  'HIGH': 2,
  'MEDIUM': 3,
  'LOW': 4
};

// Churn risk colors for UI
export const churnRiskColors: Record<ChurnRisk, { bg: string; text: string; border: string }> = {
  'LOW': { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500' },
  'MEDIUM': { bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500' },
  'HIGH': { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500' },
  'CRITICAL': { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500' }
};

/**
 * Calculate churn risk based on multiple factors
 * @param rfmSegment - Customer's RFM segment
 * @param daysSinceLastTransaction - Days since last transaction
 * @param hasActiveCase - Whether customer has open support case
 * @param totalProducts - Number of products customer uses
 */
export function calculateChurnRisk(
  rfmSegment: RFMSegment,
  daysSinceLastTransaction: number,
  hasActiveCase: boolean = false,
  totalProducts: number = 1
): ChurnRiskResult {
  const factors: string[] = [];
  
  // 1. Segment-based base risk (0-4 points)
  const segmentRiskMap: Record<RFMSegment, number> = {
    'Champions': 0,
    'Loyal': 1,
    'Potential': 2,
    'At Risk': 3,
    'Hibernating': 4,
    'Lost': 5
  };
  const baseRisk = segmentRiskMap[rfmSegment] || 2;
  
  if (baseRisk >= 3) {
    factors.push(`${rfmSegment} segment indicates declining engagement`);
  }
  
  // 2. Inactivity penalty (0-3 points)
  let inactivityScore = 0;
  if (daysSinceLastTransaction > 90) {
    inactivityScore = 3;
    factors.push('No transactions in 90+ days');
  } else if (daysSinceLastTransaction > 60) {
    inactivityScore = 2;
    factors.push('No transactions in 60+ days');
  } else if (daysSinceLastTransaction > 30) {
    inactivityScore = 1;
    factors.push('No transactions in 30+ days');
  }
  
  // 3. Active case penalty (0-2 points)
  let caseScore = 0;
  if (hasActiveCase) {
    caseScore = 2;
    factors.push('Has unresolved support case');
  }
  
  // 4. Product stickiness bonus (-1 point for each product above 1, max -2)
  const productBonus = Math.min(0, -(totalProducts - 1));
  if (totalProducts >= 3) {
    factors.push(`${totalProducts} products increase retention`);
  }
  
  // Calculate total score
  const totalScore = Math.max(0, baseRisk + inactivityScore + caseScore + productBonus);
  
  // Determine risk level
  let risk: ChurnRisk;
  let recommendation: string;
  
  if (totalScore >= 6) {
    risk = 'CRITICAL';
    recommendation = 'Immediate intervention required. Schedule RM call within 24 hours.';
  } else if (totalScore >= 4) {
    risk = 'HIGH';
    recommendation = 'Proactive outreach needed. Prepare retention offer.';
  } else if (totalScore >= 2) {
    risk = 'MEDIUM';
    recommendation = 'Monitor closely. Consider re-engagement campaign.';
  } else {
    risk = 'LOW';
    recommendation = 'Healthy relationship. Focus on upsell opportunities.';
  }
  
  // Add positive factors for low risk customers
  if (factors.length === 0 && risk === 'LOW') {
    factors.push('Active and engaged customer');
  }
  
  return {
    risk,
    score: totalScore,
    factors,
    recommendation
  };
}

/**
 * Get days since last transaction from date string
 */
export function getDaysSince(dateString: string): number {
  const today = new Date();
  const lastDate = new Date(dateString);
  const diffTime = Math.abs(today.getTime() - lastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Batch calculate churn risk for multiple customers
 */
export function batchCalculateChurnRisk<T extends {
  rfmSegment: RFMSegment;
  lastTransaction: string;
  products?: string[];
  hasActiveCase?: boolean;
}>(customers: T[]): (T & { churnRisk: ChurnRiskResult })[] {
  return customers.map(customer => ({
    ...customer,
    churnRisk: calculateChurnRisk(
      customer.rfmSegment,
      getDaysSince(customer.lastTransaction),
      customer.hasActiveCase || false,
      customer.products?.length || 1
    )
  }));
}
