import { useState, useMemo } from 'react';
import { Plus, Filter, Eye, Send, TrendingUp, Users, DollarSign, Target, X, CheckCircle, XCircle } from 'lucide-react';
import { mockCampaigns, mockCustomersForCampaign, type Campaign } from '../../data/mockData';
import { 
  generateCampaignAnalytics, 
  formatIDR, 
  formatPercentage, 
  getROIColor, 
  getSegmentBgColor,
  type CampaignAnalytics 
} from '../../lib/campaignAnalytics';

interface CampaignWithAnalytics extends Campaign {
  analytics: CampaignAnalytics;
}

export function CampaignContent() {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Generate analytics for all campaigns
  const campaignsWithAnalytics = useMemo<CampaignWithAnalytics[]>(() => {
    return mockCampaigns.map(campaign => ({
      ...campaign,
      analytics: generateCampaignAnalytics(campaign, mockCustomersForCampaign),
    }));
  }, []);

  // Filter campaigns
  const filteredCampaigns = useMemo(() => {
    if (statusFilter === 'ALL') return campaignsWithAnalytics;
    return campaignsWithAnalytics.filter(c => c.status === statusFilter);
  }, [campaignsWithAnalytics, statusFilter]);

  const selectedCampaignData = selectedCampaign
    ? filteredCampaigns.find(c => c.id === selectedCampaign)
    : null;

  // Aggregate metrics
  const totalCampaigns = campaignsWithAnalytics.length;
  const executedCampaigns = campaignsWithAnalytics.filter(c => c.status === 'EXECUTED' || c.status === 'COMPLETED').length;
  const avgEligibility = campaignsWithAnalytics.reduce((sum, c) => sum + c.analytics.eligibility.eligibilityRate, 0) / totalCampaigns;
  const avgROI = campaignsWithAnalytics.reduce((sum, c) => sum + c.analytics.roi.roi, 0) / totalCampaigns;
  const totalProjectedRevenue = campaignsWithAnalytics.reduce((sum, c) => sum + c.analytics.roi.expectedRevenue, 0);

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-white text-2xl font-bold">Campaign Analytics</h2>
          <p className="text-slate-400">Track performance, eligibility, and ROI across campaigns</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-medium hover:shadow-xl flex items-center gap-2 transition-all">
          <Plus size={20} />
          New Campaign
        </button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-white bg-opacity-20 w-10 h-10 rounded-xl flex items-center justify-center">
              <Target size={20} className="text-white" />
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-20 text-white">
              {executedCampaigns} executed
            </span>
          </div>
          <p className="text-white text-opacity-80 text-sm">Total Campaigns</p>
          <p className="text-white text-2xl font-bold">{totalCampaigns}</p>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-500 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-white bg-opacity-20 w-10 h-10 rounded-xl flex items-center justify-center">
              <Users size={20} className="text-white" />
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-20 text-white`}>
              {avgEligibility >= 0.7 ? '↗' : avgEligibility >= 0.5 ? '→' : '↘'}
            </span>
          </div>
          <p className="text-white text-opacity-80 text-sm">Avg Eligibility</p>
          <p className="text-white text-2xl font-bold">{formatPercentage(avgEligibility, 1)}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-white bg-opacity-20 w-10 h-10 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} className="text-white" />
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-20 text-white">
              {avgROI >= 100 ? '↗' : avgROI >= 50 ? '→' : '↘'}
            </span>
          </div>
          <p className="text-white text-opacity-80 text-sm">Average ROI</p>
          <p className="text-white text-2xl font-bold">{avgROI.toFixed(0)}%</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-white bg-opacity-20 w-10 h-10 rounded-xl flex items-center justify-center">
              <DollarSign size={20} className="text-white" />
            </div>
          </div>
          <p className="text-white text-opacity-80 text-sm">Projected Revenue</p>
          <p className="text-white text-2xl font-bold">{formatIDR(totalProjectedRevenue)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <Filter size={16} className="text-slate-400" />
        <span className="text-sm font-medium text-slate-400">Status:</span>
        {['ALL', 'DRAFT', 'APPROVED', 'EXECUTED', 'COMPLETED'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              statusFilter === status
                ? 'bg-orange-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Campaign Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-750 border-b border-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Campaign</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Type</th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Status</th>
              <th className="px-4 py-4 text-right text-xs font-semibold text-slate-400 uppercase">Eligible</th>
              <th className="px-4 py-4 text-right text-xs font-semibold text-slate-400 uppercase">Proj. Conv.</th>
              <th className="px-4 py-4 text-right text-xs font-semibold text-slate-400 uppercase">ROI</th>
              <th className="px-4 py-4 text-center text-xs font-semibold text-slate-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {filteredCampaigns.map((campaign) => {
              const roiColor = getROIColor(campaign.analytics.roi.roi);
              return (
                <tr key={campaign.id} className="hover:bg-slate-750 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                        <Send size={18} className="text-orange-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{campaign.name}</p>
                        <p className="text-slate-500 text-xs">{campaign.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-purple-500 bg-opacity-20 text-purple-400 rounded text-xs font-medium">
                      {campaign.type}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      campaign.status === 'COMPLETED' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                      campaign.status === 'EXECUTED' ? 'bg-blue-500 bg-opacity-20 text-blue-400' :
                      campaign.status === 'APPROVED' ? 'bg-purple-500 bg-opacity-20 text-purple-400' :
                      'bg-slate-600 text-slate-300'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <p className="text-white font-medium">{campaign.analytics.eligibility.eligible}</p>
                    <p className="text-slate-500 text-xs">
                      {formatPercentage(campaign.analytics.eligibility.eligibilityRate, 0)}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <p className="text-green-400 font-bold">{campaign.analytics.roi.projectedConversions}</p>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <p className={`font-bold ${roiColor.text}`}>
                      {campaign.analytics.roi.roi >= 0 ? '+' : ''}{campaign.analytics.roi.roi.toFixed(0)}%
                    </p>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => setSelectedCampaign(campaign.id)}
                      className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center gap-1 mx-auto"
                    >
                      <Eye size={16} />
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedCampaignData && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-white text-xl font-bold">{selectedCampaignData.name}</h3>
                <p className="text-slate-400 text-sm mt-1">{selectedCampaignData.description}</p>
              </div>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Eligibility Breakdown */}
                <div className="bg-slate-750 rounded-xl p-5 border border-slate-600">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Users size={18} className="text-green-400" />
                    Eligibility Analysis
                  </h4>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 text-sm">
                        {selectedCampaignData.analytics.eligibility.eligible} / {selectedCampaignData.analytics.eligibility.totalCustomers} eligible
                      </span>
                      <span className={`font-bold ${
                        selectedCampaignData.analytics.eligibility.eligibilityRate >= 0.7 ? 'text-green-400' :
                        selectedCampaignData.analytics.eligibility.eligibilityRate >= 0.5 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {formatPercentage(selectedCampaignData.analytics.eligibility.eligibilityRate, 1)}
                      </span>
                    </div>
                    <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-600 to-green-500 rounded-full"
                        style={{ width: `${selectedCampaignData.analytics.eligibility.eligibilityRate * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-500 bg-opacity-10 rounded border border-green-500 border-opacity-30">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-green-400" />
                        <span className="text-slate-300 text-sm">Eligible</span>
                      </div>
                      <span className="text-green-400 font-bold">{selectedCampaignData.analytics.eligibility.eligible}</span>
                    </div>
                    
                    <div className="border-t border-slate-600 pt-2 mt-2">
                      <p className="text-slate-400 text-xs mb-2 flex items-center gap-1">
                        <XCircle size={12} />
                        Ineligible Breakdown
                      </p>
                      {selectedCampaignData.analytics.eligibility.ineligible.consentWithdrawn > 0 && (
                        <div className="flex items-center justify-between p-2 bg-slate-700 rounded text-sm mb-1">
                          <span className="text-slate-400">🚫 Consent Withdrawn (UU PDP)</span>
                          <span className="text-red-400 font-medium">{selectedCampaignData.analytics.eligibility.ineligible.consentWithdrawn}</span>
                        </div>
                      )}
                      {selectedCampaignData.analytics.eligibility.ineligible.caseActive > 0 && (
                        <div className="flex items-center justify-between p-2 bg-slate-700 rounded text-sm mb-1">
                          <span className="text-slate-400">⚠️ Active Case</span>
                          <span className="text-orange-400 font-medium">{selectedCampaignData.analytics.eligibility.ineligible.caseActive}</span>
                        </div>
                      )}
                      {selectedCampaignData.analytics.eligibility.ineligible.churnCritical > 0 && (
                        <div className="flex items-center justify-between p-2 bg-slate-700 rounded text-sm mb-1">
                          <span className="text-slate-400">🚨 Churn Critical</span>
                          <span className="text-red-400 font-medium">{selectedCampaignData.analytics.eligibility.ineligible.churnCritical}</span>
                        </div>
                      )}
                      {selectedCampaignData.analytics.eligibility.ineligible.segmentMismatch > 0 && (
                        <div className="flex items-center justify-between p-2 bg-slate-700 rounded text-sm">
                          <span className="text-slate-400">🎯 Segment Mismatch</span>
                          <span className="text-slate-400 font-medium">{selectedCampaignData.analytics.eligibility.ineligible.segmentMismatch}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ROI Summary */}
                <div className="bg-slate-750 rounded-xl p-5 border border-slate-600">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <DollarSign size={18} className="text-green-400" />
                    ROI Analysis
                  </h4>
                  
                  {/* Main ROI */}
                  <div className="text-center p-4 bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl mb-4">
                    <p className="text-slate-400 text-sm mb-1">Return on Investment</p>
                    <p className={`text-4xl font-bold ${getROIColor(selectedCampaignData.analytics.roi.roi).text}`}>
                      {selectedCampaignData.analytics.roi.roi >= 0 ? '+' : ''}{selectedCampaignData.analytics.roi.roi.toFixed(1)}%
                    </p>
                    <p className="text-slate-400 text-sm mt-1">{selectedCampaignData.analytics.roi.roiRatio.toFixed(2)}x multiplier</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-red-500 bg-opacity-10 rounded">
                      <span className="text-slate-400 text-sm">Total Cost</span>
                      <span className="text-red-400 font-bold">{formatIDR(selectedCampaignData.analytics.roi.totalCost)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-500 bg-opacity-10 rounded">
                      <span className="text-slate-400 text-sm">Expected Revenue</span>
                      <span className="text-green-400 font-bold">{formatIDR(selectedCampaignData.analytics.roi.expectedRevenue)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-500 bg-opacity-10 rounded">
                      <span className="text-slate-400 text-sm">Projected Conversions</span>
                      <span className="text-blue-400 font-bold">{selectedCampaignData.analytics.roi.projectedConversions}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-700 rounded text-xs">
                      <span className="text-slate-500">Cost per Conversion</span>
                      <span className="text-slate-300">{formatIDR(selectedCampaignData.analytics.roi.costPerConversion)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Segment Performance */}
              <div className="bg-slate-750 rounded-xl p-5 border border-slate-600">
                <h4 className="text-white font-semibold mb-4">Performance by RFM Segment</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Segment</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Targeted</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Est. Engagement</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Conv. Rate</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Proj. Conversions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {selectedCampaignData.analytics.segmentPerformance.map((perf) => (
                        <tr key={perf.segment}>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getSegmentBgColor(perf.segment)} text-white`}>
                              {perf.segment}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-white font-medium">{perf.targetedCount}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${perf.estimatedEngagement * 100}%` }} />
                              </div>
                              <span className="text-blue-400 font-medium text-sm">{formatPercentage(perf.estimatedEngagement, 0)}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right text-slate-300">{formatPercentage(perf.conversionRate, 0)}</td>
                          <td className="px-4 py-3 text-right text-green-400 font-bold">{perf.projectedConversions}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-slate-600">
                        <td className="px-4 py-3 text-white font-bold">Total</td>
                        <td className="px-4 py-3 text-right text-white font-bold">
                          {selectedCampaignData.analytics.segmentPerformance.reduce((sum, p) => sum + p.targetedCount, 0)}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-400 text-sm">-</td>
                        <td className="px-4 py-3 text-right text-slate-400 text-sm">-</td>
                        <td className="px-4 py-3 text-right text-green-400 font-bold">
                          {selectedCampaignData.analytics.segmentPerformance.reduce((sum, p) => sum + p.projectedConversions, 0)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
