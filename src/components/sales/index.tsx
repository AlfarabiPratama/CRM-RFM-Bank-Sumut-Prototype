import { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Package, 
  Building2,
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  Star,
  ChevronRight,
  Users,
  Target,
  Award,
  XCircle,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { mockLeads, mockOpportunities, mockAccounts, mockContacts, pipelineSummary } from '../../data/mockData';

// ==================== SALES MAIN ====================
export function SalesMain() {
  const stats = [
    { label: 'Total Pipeline', value: 'Rp 133.1B', change: '+15%', icon: DollarSign, gradient: 'from-green-600 to-green-500' },
    { label: 'Open Deals', value: '695', change: '+12', icon: Package, gradient: 'from-blue-600 to-blue-500' },
    { label: 'This Month', value: 'Rp 24.5B', change: '+8%', icon: TrendingUp, gradient: 'from-purple-600 to-purple-500' },
    { label: 'Accounts', value: '2,847', change: '+28', icon: Building2, gradient: 'from-orange-600 to-orange-500' }
  ];

  const recentDeals = [
    { name: 'KPR Gudang Expansion', company: 'PT Maju Bersama', value: 'Rp 2.5B', stage: 'Qualification', color: 'blue' },
    { name: 'Trade Financing Q1', company: 'PT Global Trade', value: 'Rp 8.5B', stage: 'Negotiation', color: 'orange' },
    { name: 'SME Batch Financing', company: 'Koperasi Makmur', value: 'Rp 3.2B', stage: 'Closed Won', color: 'green' }
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <div key={idx} className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-105`}>
              <div className="bg-white bg-opacity-20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <IconComp size={24} className="text-white" />
              </div>
              <p className="text-white text-opacity-80 text-sm mb-1">{stat.label}</p>
              <p className="text-white text-3xl font-bold mb-2">{stat.value}</p>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white bg-opacity-20 text-white">{stat.change}</span>
            </div>
          );
        })}
      </div>

      {/* Recent Deals & Pipeline Summary */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-white font-bold text-xl mb-6">Recent Deals</h3>
          <div className="space-y-4">
            {recentDeals.map((deal, idx) => (
              <div key={idx} className="bg-slate-750 rounded-xl p-4 border border-slate-600 hover:border-green-500 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold">{deal.name}</h4>
                    <p className="text-slate-400 text-sm">{deal.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">{deal.value}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      deal.color === 'green' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                      deal.color === 'orange' ? 'bg-orange-500 bg-opacity-20 text-orange-400' :
                      'bg-blue-500 bg-opacity-20 text-blue-400'
                    }`}>{deal.stage}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-white font-bold text-xl mb-6">Pipeline Summary</h3>
          <div className="space-y-4">
            {pipelineSummary.byStage.map((stage, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    stage.stage === 'Closed Won' ? 'bg-green-500' :
                    stage.stage === 'Negotiation' ? 'bg-orange-500' :
                    stage.stage === 'Proposal' ? 'bg-purple-500' :
                    stage.stage === 'Qualification' ? 'bg-blue-500' :
                    'bg-slate-500'
                  }`}></div>
                  <span className="text-white">{stage.stage}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-sm mr-4">{stage.count} deals</span>
                  <span className="text-green-400 font-bold">{stage.value}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-slate-700 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-slate-400 text-xs">Total Value</p>
              <p className="text-white font-bold">{pipelineSummary.totalValue}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs">Win Rate</p>
              <p className="text-green-400 font-bold">{pipelineSummary.winRate}%</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs">Avg Cycle</p>
              <p className="text-blue-400 font-bold">{pipelineSummary.avgCycleTime} days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== LEADS CONTENT ====================
export function LeadsContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredLeads = mockLeads.filter(lead => {
    const matchSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Won': return 'bg-green-500 bg-opacity-20 text-green-400 border-green-500';
      case 'Negotiation': return 'bg-orange-500 bg-opacity-20 text-orange-400 border-orange-500';
      case 'Proposal': return 'bg-purple-500 bg-opacity-20 text-purple-400 border-purple-500';
      case 'Qualified': return 'bg-blue-500 bg-opacity-20 text-blue-400 border-blue-500';
      case 'Contacted': return 'bg-cyan-500 bg-opacity-20 text-cyan-400 border-cyan-500';
      case 'New': return 'bg-slate-500 bg-opacity-20 text-slate-400 border-slate-500';
      case 'Lost': return 'bg-red-500 bg-opacity-20 text-red-400 border-red-500';
      default: return 'bg-slate-500 bg-opacity-20 text-slate-400 border-slate-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-white text-2xl font-bold">Leads Management</h2>
          <p className="text-slate-400">Track and convert leads into opportunities</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-medium hover:shadow-xl flex items-center gap-2 transition-all">
          <Plus size={20} />
          Add Lead
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Total Leads', value: mockLeads.length, icon: Users, color: 'blue' },
          { label: 'New', value: mockLeads.filter(l => l.status === 'New').length, icon: Star, color: 'slate' },
          { label: 'Qualified', value: mockLeads.filter(l => l.status === 'Qualified').length, icon: Target, color: 'blue' },
          { label: 'Won', value: mockLeads.filter(l => l.status === 'Won').length, icon: Award, color: 'green' },
          { label: 'Lost', value: mockLeads.filter(l => l.status === 'Lost').length, icon: XCircle, color: 'red' }
        ].map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <div key={idx} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${stat.color}-500 bg-opacity-20`}>
                  <IconComp size={20} className={`text-${stat.color}-400`} />
                </div>
                <div>
                  <p className="text-slate-400 text-xs">{stat.label}</p>
                  <p className="text-white font-bold text-xl">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads by name or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-12 text-white placeholder-slate-400 focus:border-green-500 focus:outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-xl px-4 text-white focus:border-green-500 focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal">Proposal</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
        <button className="bg-slate-800 border border-slate-700 rounded-xl px-4 flex items-center gap-2 text-slate-400 hover:border-green-500 transition-all">
          <Filter size={18} />
          More Filters
        </button>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-750">
            <tr>
              <th className="text-left text-slate-400 font-medium text-sm py-4 px-6">Lead</th>
              <th className="text-left text-slate-400 font-medium text-sm py-4 px-4">Status</th>
              <th className="text-left text-slate-400 font-medium text-sm py-4 px-4">Value</th>
              <th className="text-left text-slate-400 font-medium text-sm py-4 px-4">Score</th>
              <th className="text-left text-slate-400 font-medium text-sm py-4 px-4">Assigned To</th>
              <th className="text-left text-slate-400 font-medium text-sm py-4 px-4">Last Contact</th>
              <th className="text-right text-slate-400 font-medium text-sm py-4 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-t border-slate-700 hover:bg-slate-750 transition-all cursor-pointer">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-white font-medium">{lead.name}</p>
                      <p className="text-slate-400 text-sm">{lead.company}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-green-400 font-bold">{lead.value}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${lead.score >= 80 ? 'bg-green-500' : lead.score >= 60 ? 'bg-blue-500' : lead.score >= 40 ? 'bg-orange-500' : 'bg-red-500'}`}
                        style={{ width: `${lead.score}%` }}
                      ></div>
                    </div>
                    <span className={`font-bold ${getScoreColor(lead.score)}`}>{lead.score}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-white">{lead.assignedTo}</td>
                <td className="py-4 px-4 text-slate-400">{lead.lastContact}</td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="w-8 h-8 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all">
                      <Phone size={16} className="text-blue-400" />
                    </button>
                    <button className="w-8 h-8 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all">
                      <Mail size={16} className="text-purple-400" />
                    </button>
                    <button className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center hover:bg-slate-500 transition-all">
                      <ChevronRight size={16} className="text-white" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==================== OPPORTUNITIES CONTENT ====================
export function OpportunitiesContent() {
  const stages = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];
  const stageColors: Record<string, string> = {
    'Prospecting': 'border-slate-500',
    'Qualification': 'border-blue-500',
    'Proposal': 'border-purple-500',
    'Negotiation': 'border-orange-500',
    'Closed Won': 'border-green-500',
    'Closed Lost': 'border-red-500'
  };

  const getOpportunitiesByStage = (stage: string) => {
    return mockOpportunities.filter(opp => opp.stage === stage);
  };

  const getTotalValueByStage = (stage: string) => {
    return getOpportunitiesByStage(stage).reduce((sum, opp) => sum + opp.valueNum, 0);
  };

  const formatValue = (value: number) => {
    if (value >= 1000000000) return `Rp ${(value / 1000000000).toFixed(1)}B`;
    if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(0)}M`;
    return `Rp ${value.toLocaleString()}`;
  };

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-white text-2xl font-bold">Sales Pipeline</h2>
          <p className="text-slate-400">Manage opportunities through the sales funnel</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-medium hover:shadow-xl flex items-center gap-2 transition-all">
          <Plus size={20} />
          New Opportunity
        </button>
      </div>

      {/* Pipeline Summary */}
      <div className="grid grid-cols-6 gap-4 mb-8">
        {stages.map((stage) => {
          const opps = getOpportunitiesByStage(stage);
          const totalValue = getTotalValueByStage(stage);
          return (
            <div key={stage} className={`bg-slate-800 rounded-xl p-4 border-t-4 ${stageColors[stage]}`}>
              <p className="text-slate-400 text-sm mb-1">{stage}</p>
              <p className="text-white font-bold text-lg">{opps.length} deals</p>
              <p className="text-green-400 text-sm">{formatValue(totalValue)}</p>
            </div>
          );
        })}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-5 gap-4 overflow-x-auto">
        {stages.filter(s => s !== 'Closed Lost').map((stage) => (
          <div key={stage} className="bg-slate-800 rounded-2xl p-4 border border-slate-700 min-w-[280px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold">{stage}</h3>
              <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded-full text-xs">
                {getOpportunitiesByStage(stage).length}
              </span>
            </div>
            
            <div className="space-y-3">
              {getOpportunitiesByStage(stage).map((opp) => (
                <div key={opp.id} className="bg-slate-750 rounded-xl p-4 border border-slate-600 hover:border-green-500 transition-all cursor-pointer">
                  <h4 className="text-white font-medium mb-1">{opp.name}</h4>
                  <p className="text-slate-400 text-sm mb-3">{opp.company}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-green-400 font-bold">{opp.value}</span>
                    <span className="text-slate-400 text-xs">{opp.probability}%</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar size={12} />
                    <span>{opp.expectedCloseDate}</span>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-slate-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {opp.owner.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-slate-400 text-xs">{opp.owner}</span>
                      </div>
                      <span className="text-slate-500 text-xs">{opp.daysInStage}d</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== ACCOUNTS CONTENT ====================
export function AccountsContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [churnFilter, setChurnFilter] = useState('all');

  // Import churn risk calculation
  const calculateChurnRisk = (
    rfmSegment: string, 
    lastTransaction: string, 
    hasActiveCase: boolean, 
    productsCount: number
  ) => {
    const segmentRiskMap: Record<string, number> = {
      'Champions': 0, 'Loyal': 1, 'Potential': 2, 'At Risk': 3, 'Hibernating': 4, 'Lost': 5
    };
    
    // Calculate days since last transaction
    const today = new Date();
    const lastDate = new Date(lastTransaction);
    const daysSince = Math.ceil(Math.abs(today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const baseRisk = segmentRiskMap[rfmSegment] || 2;
    const inactivityScore = daysSince > 90 ? 3 : daysSince > 60 ? 2 : daysSince > 30 ? 1 : 0;
    const caseScore = hasActiveCase ? 2 : 0;
    const productBonus = Math.min(0, -(productsCount - 1));
    
    const totalScore = Math.max(0, baseRisk + inactivityScore + caseScore + productBonus);
    
    let risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    let recommendation: string;
    const factors: string[] = [];
    
    if (baseRisk >= 3) factors.push(`${rfmSegment} segment`);
    if (daysSince > 60) factors.push(`${daysSince} days inactive`);
    if (hasActiveCase) factors.push('Open support case');
    if (productsCount >= 3) factors.push(`${productsCount} products`);
    
    if (totalScore >= 6) {
      risk = 'CRITICAL';
      recommendation = 'Immediate intervention required';
    } else if (totalScore >= 4) {
      risk = 'HIGH';
      recommendation = 'Proactive outreach needed';
    } else if (totalScore >= 2) {
      risk = 'MEDIUM';
      recommendation = 'Monitor closely';
    } else {
      risk = 'LOW';
      recommendation = 'Healthy relationship';
      if (factors.length === 0) factors.push('Active and engaged');
    }
    
    return { risk, score: totalScore, factors, recommendation };
  };

  // Enrich accounts with churn data
  const accountsWithChurn = mockAccounts.map(account => ({
    ...account,
    churnRisk: calculateChurnRisk(
      account.rfmSegment,
      account.lastTransaction,
      account.hasActiveCase || false,
      account.products.length
    )
  }));

  const filteredAccounts = accountsWithChurn.filter(account => {
    const matchSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchChurn = churnFilter === 'all' || account.churnRisk.risk === churnFilter;
    return matchSearch && matchChurn;
  });

  const getRfmColor = (segment: string) => {
    switch (segment) {
      case 'Champions': return 'from-green-600 to-green-500';
      case 'Loyal': return 'from-blue-600 to-blue-500';
      case 'Potential': return 'from-purple-600 to-purple-500';
      case 'At Risk': return 'from-orange-600 to-orange-500';
      case 'Hibernating': return 'from-red-600 to-red-500';
      case 'Lost': return 'from-slate-600 to-slate-500';
      default: return 'from-slate-600 to-slate-500';
    }
  };

  const getChurnRiskStyle = (risk: string) => {
    switch (risk) {
      case 'CRITICAL': return { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500', bgLight: 'bg-red-500 bg-opacity-20' };
      case 'HIGH': return { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500', bgLight: 'bg-orange-500 bg-opacity-20' };
      case 'MEDIUM': return { bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500', bgLight: 'bg-yellow-500 bg-opacity-20' };
      case 'LOW': return { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500', bgLight: 'bg-green-500 bg-opacity-20' };
      default: return { bg: 'bg-slate-500', text: 'text-slate-400', border: 'border-slate-500', bgLight: 'bg-slate-500 bg-opacity-20' };
    }
  };

  // Count by churn risk
  const churnCounts = {
    CRITICAL: accountsWithChurn.filter(a => a.churnRisk.risk === 'CRITICAL').length,
    HIGH: accountsWithChurn.filter(a => a.churnRisk.risk === 'HIGH').length,
    MEDIUM: accountsWithChurn.filter(a => a.churnRisk.risk === 'MEDIUM').length,
    LOW: accountsWithChurn.filter(a => a.churnRisk.risk === 'LOW').length
  };

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-white text-2xl font-bold">Account Management</h2>
          <p className="text-slate-400">Manage customer accounts with RFM & Churn Risk insights</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-medium hover:shadow-xl flex items-center gap-2 transition-all">
          <Plus size={20} />
          New Account
        </button>
      </div>

      {/* Churn Risk Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { risk: 'CRITICAL', label: 'Critical Risk', icon: '🚨' },
          { risk: 'HIGH', label: 'High Risk', icon: '⚠️' },
          { risk: 'MEDIUM', label: 'Medium Risk', icon: '📊' },
          { risk: 'LOW', label: 'Low Risk', icon: '✅' }
        ].map((item) => {
          const style = getChurnRiskStyle(item.risk);
          const count = churnCounts[item.risk as keyof typeof churnCounts];
          return (
            <div 
              key={item.risk}
              onClick={() => setChurnFilter(churnFilter === item.risk ? 'all' : item.risk)}
              className={`rounded-xl p-4 border-2 cursor-pointer transition-all ${
                churnFilter === item.risk ? style.border + ' ' + style.bgLight : 'border-slate-700 bg-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{item.label}</p>
                  <p className={`text-2xl font-bold ${style.text}`}>{count}</p>
                </div>
                <span className="text-2xl">{item.icon}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* RFM Segment Summary */}
      <div className="grid grid-cols-6 gap-3 mb-8">
        {['Champions', 'Loyal', 'Potential', 'At Risk', 'Hibernating', 'Lost'].map((segment) => {
          const count = mockAccounts.filter(a => a.rfmSegment === segment).length;
          return (
            <div key={segment} className={`bg-gradient-to-br ${getRfmColor(segment)} rounded-xl p-3`}>
              <p className="text-white text-opacity-80 text-xs">{segment}</p>
              <p className="text-white text-xl font-bold">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative max-w-md">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-12 text-white placeholder-slate-400 focus:border-green-500 focus:outline-none"
          />
        </div>
        {churnFilter !== 'all' && (
          <button 
            onClick={() => setChurnFilter('all')}
            className="px-4 py-2 bg-slate-700 text-slate-300 rounded-xl hover:bg-slate-600 transition-all"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {filteredAccounts.map((account) => {
          const churnStyle = getChurnRiskStyle(account.churnRisk.risk);
          return (
            <div key={account.id} className={`bg-slate-800 rounded-2xl p-6 border-2 transition-all cursor-pointer ${
              account.churnRisk.risk === 'CRITICAL' ? 'border-red-500 border-opacity-50' :
              account.churnRisk.risk === 'HIGH' ? 'border-orange-500 border-opacity-50' :
              'border-slate-700 hover:border-green-500'
            }`}>
              {/* Header with RFM & Churn badges */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${getRfmColor(account.rfmSegment)} rounded-xl flex items-center justify-center`}>
                    <Building2 size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{account.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-slate-400 text-sm">{account.type}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400 text-sm">{account.industry}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getRfmColor(account.rfmSegment)} text-white`}>
                    {account.rfmSegment}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${churnStyle.border} ${churnStyle.bgLight} ${churnStyle.text}`}>
                    {account.churnRisk.risk} RISK
                  </span>
                </div>
              </div>

              {/* Churn Risk Details */}
              <div className={`rounded-xl p-4 mb-4 ${churnStyle.bgLight}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-bold ${churnStyle.text}`}>Churn Score: {account.churnRisk.score}</span>
                  <span className="text-slate-400 text-xs">{account.churnRisk.recommendation}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {account.churnRisk.factors.map((factor, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-800 bg-opacity-50 text-slate-300 rounded text-xs">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>

              {/* RFM Score */}
              <div className="bg-slate-750 rounded-xl p-4 mb-4">
                <p className="text-slate-400 text-xs mb-2">RFM Score</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-400">Recency</span>
                      <span className="text-white font-bold">{account.rfmScore.r}/5</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${account.rfmScore.r * 20}%` }}></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-400">Frequency</span>
                      <span className="text-white font-bold">{account.rfmScore.f}/5</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${account.rfmScore.f * 20}%` }}></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-400">Monetary</span>
                      <span className="text-white font-bold">{account.rfmScore.m}/5</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${account.rfmScore.m * 20}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-slate-400 text-xs">Total Assets</p>
                  <p className="text-white font-bold">{account.totalAssets}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Net Worth</p>
                  <p className="text-green-400 font-bold">{account.netWorth}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Last Transaction</p>
                  <p className="text-blue-400 font-bold">{account.lastTransaction}</p>
                </div>
              </div>

              {/* Products & Actions */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {account.products.slice(0, 3).map((product, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-700 text-slate-300 rounded-lg text-xs">
                      {product}
                    </span>
                  ))}
                  {account.products.length > 3 && (
                    <span className="px-2 py-1 bg-slate-700 text-slate-400 rounded-lg text-xs">
                      +{account.products.length - 3}
                    </span>
                  )}
                </div>
                {(account.churnRisk.risk === 'CRITICAL' || account.churnRisk.risk === 'HIGH') && (
                  <button className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2">
                    <Phone size={14} />
                    Call Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==================== CONTACTS CONTENT ====================
export function ContactsContent() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'Email': return Mail;
      case 'Phone': return Phone;
      case 'WhatsApp': return MessageSquare;
      case 'SMS': return MessageSquare;
      default: return Mail;
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-white text-2xl font-bold">Contact Directory</h2>
          <p className="text-slate-400">Manage customer contacts and communication history</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-medium hover:shadow-xl flex items-center gap-2 transition-all">
          <Plus size={20} />
          Add Contact
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-12 text-white placeholder-slate-400 focus:border-green-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-3 gap-6">
        {filteredContacts.map((contact) => {
          const ChannelIcon = getChannelIcon(contact.preferredChannel);
          return (
            <div key={contact.id} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-green-500 transition-all cursor-pointer">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {contact.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{contact.name}</h3>
                  <p className="text-slate-400 text-sm">{contact.position}</p>
                  <p className="text-blue-400 text-sm">{contact.company}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-slate-400" />
                  <span className="text-slate-300">{contact.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-slate-400" />
                  <span className="text-slate-300">{contact.mobile}</span>
                </div>
              </div>

              <div className="bg-slate-750 rounded-xl p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ChannelIcon size={16} className="text-green-400" />
                    <span className="text-slate-400 text-sm">Preferred: {contact.preferredChannel}</span>
                  </div>
                  <span className="text-white font-bold">{contact.totalInteractions} interactions</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {contact.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-500 bg-opacity-20 text-blue-400 rounded-lg text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <span className="text-slate-400 text-xs">Last: {contact.lastInteraction}</span>
                <div className="flex gap-2">
                  <button className="w-8 h-8 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all">
                    <Phone size={16} className="text-blue-400" />
                  </button>
                  <button className="w-8 h-8 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all">
                    <Mail size={16} className="text-purple-400" />
                  </button>
                  <button className="w-8 h-8 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-all">
                    <MessageSquare size={16} className="text-green-400" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
