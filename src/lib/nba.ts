/**
 * Next Best Action (NBA) Recommendation Engine
 * 
 * Generates actionable recommendations based on:
 * - RFM Segmentation
 * - Churn Risk Score
 * - Product Portfolio
 * - Customer Lifecycle
 * 
 * Compliance: Explainability required per UU PDP
 */

export type RFMSegment = 'Champions' | 'Loyal' | 'Potential' | 'At Risk' | 'Hibernating' | 'Lost';
export type ChurnRisk = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type NBAActionType = 
  | 'RETENTION_CALL'
  | 'WEALTH_MANAGEMENT_OFFER'
  | 'CROSS_SELL_CAMPAIGN'
  | 'WIN_BACK_CAMPAIGN'
  | 'PREMIUM_UPGRADE'
  | 'FINANCIAL_REVIEW'
  | 'THANK_YOU_GIFT'
  | 'ONBOARDING_SUPPORT';

export type NBAPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface NBARecommendation {
  id: string;
  customerId?: string;
  customerName?: string;
  actionType: NBAActionType;
  priority: NBAPriority;
  title: string;
  description: string;
  reason: string;
  estimatedImpact: string;
  targetModule: 'sales' | 'marketing' | 'service';
  dueDate?: string;
  metadata?: {
    rfmSegment?: RFMSegment;
    churnRisk?: ChurnRisk;
    productCount?: number;
  };
}

export interface NBAInput {
  customerId: string;
  customerName: string;
  rfmSegment: RFMSegment;
  churnRisk: ChurnRisk;
  churnScore: number;
  daysSinceLastTransaction: number;
  hasActiveCase: boolean;
  productCount: number;
  relationshipYears?: number;
}

// Priority weights for sorting
const PRIORITY_WEIGHT: Record<NBAPriority, number> = {
  CRITICAL: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

/**
 * Generate customer-specific NBA recommendation
 */
export function generateAccountNBA(input: NBAInput): NBARecommendation | null {
  const { 
    customerId, 
    customerName, 
    rfmSegment, 
    churnRisk, 
    churnScore, 
    daysSinceLastTransaction, 
    hasActiveCase,
    productCount 
  } = input;

  // Rule 1: CRITICAL Churn Prevention (Highest Priority)
  if (churnRisk === 'CRITICAL') {
    return {
      id: `nba-${customerId}-churn-critical`,
      customerId,
      customerName,
      actionType: 'RETENTION_CALL',
      priority: 'CRITICAL',
      title: '🚨 Urgent: Prevent Churn',
      description: 'Immediate senior RM intervention required',
      reason: `${rfmSegment} customer with CRITICAL churn risk (score: ${churnScore}). Inactive for ${daysSinceLastTransaction} days.`,
      estimatedImpact: 'Prevent potential CLV loss',
      targetModule: 'sales',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      metadata: { rfmSegment, churnRisk, productCount },
    };
  }

  // Rule 2: HIGH Churn Risk - Active Case (Service Recovery)
  if (churnRisk === 'HIGH' && hasActiveCase) {
    return {
      id: `nba-${customerId}-service-recovery`,
      customerId,
      customerName,
      actionType: 'RETENTION_CALL',
      priority: 'HIGH',
      title: '⚠️ Service Recovery Needed',
      description: 'Customer has active complaint + high churn risk',
      reason: `Active case with HIGH churn risk. Immediate resolution required to prevent churn.`,
      estimatedImpact: 'Service recovery can reduce churn by 40%',
      targetModule: 'service',
      dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      metadata: { rfmSegment, churnRisk, productCount },
    };
  }

  // Rule 3: Champions - Stable (Upsell Opportunity)
  if (rfmSegment === 'Champions' && churnRisk === 'LOW') {
    return {
      id: `nba-${customerId}-wealth-upsell`,
      customerId,
      customerName,
      actionType: 'WEALTH_MANAGEMENT_OFFER',
      priority: 'MEDIUM',
      title: '💎 Wealth Management Opportunity',
      description: 'Offer premium wealth management services',
      reason: `Champions segment with stable behavior (LOW churn risk). High-value customer ready for premium services.`,
      estimatedImpact: '+15-25% revenue potential',
      targetModule: 'sales',
      metadata: { rfmSegment, churnRisk, productCount },
    };
  }

  // Rule 4: Potential Loyalists with few products (Cross-sell)
  if (rfmSegment === 'Potential' && productCount < 3) {
    return {
      id: `nba-${customerId}-cross-sell`,
      customerId,
      customerName,
      actionType: 'CROSS_SELL_CAMPAIGN',
      priority: 'MEDIUM',
      title: '📈 Cross-sell Opportunity',
      description: 'Active customer with growth potential',
      reason: `Potential Loyalist with only ${productCount} product(s). Cross-sell can increase engagement and reduce churn.`,
      estimatedImpact: '+2 products = -30% churn risk',
      targetModule: 'marketing',
      metadata: { rfmSegment, churnRisk, productCount },
    };
  }

  // Rule 5: At Risk with HIGH churn (Re-engagement)
  if (rfmSegment === 'At Risk' && churnRisk === 'HIGH') {
    return {
      id: `nba-${customerId}-reactivation`,
      customerId,
      customerName,
      actionType: 'FINANCIAL_REVIEW',
      priority: 'HIGH',
      title: '🔔 Re-engagement Required',
      description: 'Schedule financial health review with RM',
      reason: `At Risk segment with declining activity (${daysSinceLastTransaction} days inactive). Personal touch needed.`,
      estimatedImpact: 'Personalized outreach recovers 35% of at-risk customers',
      targetModule: 'sales',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      metadata: { rfmSegment, churnRisk, productCount },
    };
  }

  // Rule 6: Hibernating (Win-back Campaign)
  if (rfmSegment === 'Hibernating') {
    return {
      id: `nba-${customerId}-winback`,
      customerId,
      customerName,
      actionType: 'WIN_BACK_CAMPAIGN',
      priority: 'MEDIUM',
      title: '🎁 Win-back Campaign',
      description: 'Special offer to re-activate dormant customer',
      reason: `Hibernating customer (${daysSinceLastTransaction} days inactive). Targeted incentive may reactivate.`,
      estimatedImpact: '15-20% win-back success rate',
      targetModule: 'marketing',
      metadata: { rfmSegment, churnRisk, productCount },
    };
  }

  // Rule 7: Loyal Customers (Thank You / Retention)
  if (rfmSegment === 'Loyal' && churnRisk === 'LOW') {
    return {
      id: `nba-${customerId}-loyalty-reward`,
      customerId,
      customerName,
      actionType: 'THANK_YOU_GIFT',
      priority: 'LOW',
      title: '🎉 Loyalty Appreciation',
      description: 'Send thank you gift or exclusive benefit',
      reason: `Loyal customer with consistent behavior. Appreciation gesture strengthens relationship.`,
      estimatedImpact: 'Reinforces loyalty, reduces future churn risk',
      targetModule: 'marketing',
      metadata: { rfmSegment, churnRisk, productCount },
    };
  }

  // Rule 8: At Risk but still Medium Churn (Proactive Outreach)
  if (rfmSegment === 'At Risk' && churnRisk === 'MEDIUM') {
    return {
      id: `nba-${customerId}-proactive-outreach`,
      customerId,
      customerName,
      actionType: 'FINANCIAL_REVIEW',
      priority: 'MEDIUM',
      title: '📊 Proactive Check-in',
      description: 'Schedule relationship review before risk escalates',
      reason: `At Risk customer with moderate churn indicators. Early intervention prevents escalation.`,
      estimatedImpact: 'Proactive outreach reduces HIGH churn by 50%',
      targetModule: 'sales',
      metadata: { rfmSegment, churnRisk, productCount },
    };
  }

  return null;
}

/**
 * Generate dashboard-level aggregate NBA recommendations
 */
export function generateDashboardNBA(
  accountsData: Array<{
    id: string;
    name: string;
    rfmSegment: RFMSegment;
    churnRisk: ChurnRisk;
    churnScore: number;
    productCount: number;
    hasActiveCase: boolean;
    daysSinceLastTx: number;
  }>
): NBARecommendation[] {
  const recommendations: NBARecommendation[] = [];

  // Count by category
  const criticalChurnCount = accountsData.filter(a => a.churnRisk === 'CRITICAL').length;
  const highChurnCount = accountsData.filter(a => a.churnRisk === 'HIGH').length;
  const championsCount = accountsData.filter(a => a.rfmSegment === 'Champions' && a.churnRisk === 'LOW').length;
  const potentialCount = accountsData.filter(a => a.rfmSegment === 'Potential' && a.productCount < 3).length;
  const hibernatingCount = accountsData.filter(a => a.rfmSegment === 'Hibernating').length;
  const atRiskCount = accountsData.filter(a => a.rfmSegment === 'At Risk').length;

  // Aggregate Recommendation 1: Critical Churn Alert
  if (criticalChurnCount > 0) {
    recommendations.push({
      id: 'nba-dashboard-critical-churn',
      actionType: 'RETENTION_CALL',
      priority: 'CRITICAL',
      title: `🚨 ${criticalChurnCount} Critical Churn Risk${criticalChurnCount > 1 ? 's' : ''}`,
      description: 'Immediate action required to prevent customer loss',
      reason: `${criticalChurnCount} customer(s) showing CRITICAL churn signals. Requires senior RM intervention within 24 hours.`,
      estimatedImpact: 'Prevent potential high-value customer loss',
      targetModule: 'sales',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  // Aggregate Recommendation 2: High Churn Alert
  if (highChurnCount > 0) {
    recommendations.push({
      id: 'nba-dashboard-high-churn',
      actionType: 'RETENTION_CALL',
      priority: 'HIGH',
      title: `⚠️ ${highChurnCount} High Churn Risk${highChurnCount > 1 ? 's' : ''}`,
      description: 'Proactive retention campaign needed',
      reason: `${highChurnCount} customer(s) with HIGH churn risk. Schedule retention calls this week.`,
      estimatedImpact: 'Early intervention can save 60% of at-risk customers',
      targetModule: 'sales',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  // Aggregate Recommendation 3: At Risk Segment Alert
  if (atRiskCount > 0) {
    recommendations.push({
      id: 'nba-dashboard-at-risk',
      actionType: 'FINANCIAL_REVIEW',
      priority: 'HIGH',
      title: `🔔 ${atRiskCount} At Risk Customer${atRiskCount > 1 ? 's' : ''}`,
      description: 'Schedule financial health reviews',
      reason: `${atRiskCount} customer(s) in At Risk segment. Personal engagement can recover 35%.`,
      estimatedImpact: 'Personalized outreach recovers at-risk customers',
      targetModule: 'sales',
    });
  }

  // Aggregate Recommendation 4: Champions Upsell
  if (championsCount > 0) {
    recommendations.push({
      id: 'nba-dashboard-champions-upsell',
      actionType: 'WEALTH_MANAGEMENT_OFFER',
      priority: 'MEDIUM',
      title: `💎 ${championsCount} Champions Ready for Premium`,
      description: 'Wealth management upsell opportunity',
      reason: `${championsCount} Champions customer(s) with stable behavior. High conversion potential for premium services.`,
      estimatedImpact: '+15-25% revenue per converted customer',
      targetModule: 'sales',
    });
  }

  // Aggregate Recommendation 5: Cross-sell Campaign
  if (potentialCount > 0) {
    recommendations.push({
      id: 'nba-dashboard-cross-sell',
      actionType: 'CROSS_SELL_CAMPAIGN',
      priority: 'MEDIUM',
      title: `📈 ${potentialCount} Cross-sell Opportunities`,
      description: 'Potential customers with <3 products',
      reason: `${potentialCount} Potential Loyalist(s) with room for product expansion.`,
      estimatedImpact: 'Each additional product reduces churn by 15%',
      targetModule: 'marketing',
    });
  }

  // Aggregate Recommendation 6: Win-back Campaign
  if (hibernatingCount > 0) {
    recommendations.push({
      id: 'nba-dashboard-winback',
      actionType: 'WIN_BACK_CAMPAIGN',
      priority: 'LOW',
      title: `🎁 ${hibernatingCount} Dormant Customer${hibernatingCount > 1 ? 's' : ''}`,
      description: 'Win-back campaign for hibernating segment',
      reason: `${hibernatingCount} Hibernating customer(s). Targeted incentive may reactivate 15-20%.`,
      estimatedImpact: 'Low-cost email campaign, moderate ROI',
      targetModule: 'marketing',
    });
  }

  return recommendations.sort((a, b) => 
    PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority]
  );
}

/**
 * Get action button text based on action type
 */
export function getNBAActionLabel(actionType: NBAActionType): string {
  const labels: Record<NBAActionType, string> = {
    RETENTION_CALL: 'Schedule Call',
    WEALTH_MANAGEMENT_OFFER: 'Create Offer',
    CROSS_SELL_CAMPAIGN: 'Launch Campaign',
    WIN_BACK_CAMPAIGN: 'Launch Campaign',
    PREMIUM_UPGRADE: 'Send Offer',
    FINANCIAL_REVIEW: 'Schedule Review',
    THANK_YOU_GIFT: 'Send Gift',
    ONBOARDING_SUPPORT: 'Schedule Call',
  };
  return labels[actionType];
}

/**
 * Get priority styles for UI
 */
export function getNBAPriorityStyle(priority: NBAPriority): {
  bg: string;
  text: string;
  border: string;
  bgLight: string;
} {
  switch (priority) {
    case 'CRITICAL': return { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500', bgLight: 'bg-red-500 bg-opacity-20' };
    case 'HIGH': return { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500', bgLight: 'bg-orange-500 bg-opacity-20' };
    case 'MEDIUM': return { bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500', bgLight: 'bg-yellow-500 bg-opacity-20' };
    case 'LOW': return { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500', bgLight: 'bg-blue-500 bg-opacity-20' };
  }
}
