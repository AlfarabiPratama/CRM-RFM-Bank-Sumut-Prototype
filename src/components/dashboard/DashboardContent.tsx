import { 
  Users, 
  CheckCircle, 
  AlertCircle, 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Target,
  Headphones,
  UserPlus,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { useAppStore } from '../../stores/appStore';
import { gradientBgColors } from '../../constants/colors';
import { generateDashboardNBA, getNBAActionLabel, getNBAPriorityStyle, type NBARecommendation } from '../../lib/nba';

export function DashboardContent() {
  const { navigate } = useAppStore();

  const salesTrend = [
    { month: 'Jul', value: 85 },
    { month: 'Aug', value: 92 },
    { month: 'Sep', value: 78 },
    { month: 'Oct', value: 95 },
    { month: 'Nov', value: 88 },
    { month: 'Dec', value: 98 }
  ];

  const rfmSegments = [
    { name: 'Champions', count: 342, value: 'Rp 4.2B', color: 'from-green-600 to-green-500', percentage: 28 },
    { name: 'Loyal', count: 486, value: 'Rp 3.8B', color: 'from-blue-600 to-blue-500', percentage: 24 },
    { name: 'At Risk', count: 234, value: 'Rp 2.1B', color: 'from-orange-600 to-orange-500', percentage: 18 },
    { name: 'Lost', count: 156, value: 'Rp 0.8B', color: 'from-red-600 to-red-500', percentage: 12 }
  ];

  const pipelineStages = [
    { stage: 'Prospecting', deals: 284, value: 'Rp 45.2B', width: 100, color: 'blue' },
    { stage: 'Qualification', deals: 178, value: 'Rp 32.8B', width: 85, color: 'cyan' },
    { stage: 'Proposal', deals: 124, value: 'Rp 24.5B', width: 70, color: 'purple' },
    { stage: 'Negotiation', deals: 67, value: 'Rp 18.2B', width: 55, color: 'orange' },
    { stage: 'Closed Won', deals: 42, value: 'Rp 12.4B', width: 40, color: 'green' }
  ];

  const topSalesReps = [
    { rank: 1, name: 'Ahmad Rizki', avatar: 'AR', deals: 42, revenue: 'Rp 8.5B', quota: 112, trend: 'up' },
    { rank: 2, name: 'Siti Nurhaliza', avatar: 'SN', deals: 38, revenue: 'Rp 7.2B', quota: 98, trend: 'up' },
    { rank: 3, name: 'Budi Santoso', avatar: 'BS', deals: 34, revenue: 'Rp 6.8B', quota: 92, trend: 'up' },
    { rank: 4, name: 'Linda Kusuma', avatar: 'LK', deals: 29, revenue: 'Rp 5.4B', quota: 85, trend: 'down' },
    { rank: 5, name: 'Hendra Wijaya', avatar: 'HW', deals: 25, revenue: 'Rp 4.9B', quota: 78, trend: 'up' }
  ];

  const kpiCards = [
    { label: 'Active Customers', value: '2,847', change: '+12%', icon: Users, gradient: gradientBgColors.blue, trend: [65, 72, 68, 85, 78, 92] },
    { label: 'Today Tasks', value: '24', change: '8 urgent', icon: CheckCircle, gradient: gradientBgColors.orange, trend: [45, 52, 48, 55, 50, 58] },
    { label: 'SLA at Risk', value: '5', change: '2 critical', icon: AlertCircle, gradient: gradientBgColors.red, trend: [25, 28, 22, 30, 26, 24] },
    { label: 'Month Revenue', value: 'Rp 2.4B', change: '+8%', icon: DollarSign, gradient: gradientBgColors.green, trend: [70, 75, 72, 88, 82, 95] }
  ];

  const recentActivities = [
    { title: 'Campaign sent to 12,450 customers', time: '10 mins ago', icon: Target, color: 'orange', menu: 'marketing', sub: 'campaign' },
    { title: 'New lead: Ahmad Fadli', time: '25 mins ago', icon: TrendingUp, color: 'green', menu: 'sales', sub: 'leads' },
    { title: 'Ticket resolved: TKT-2847', time: '1 hour ago', icon: Headphones, color: 'purple', menu: 'service', sub: 'tickets' },
    { title: 'Deal closed: Rp 2.4B', time: '2 hours ago', icon: DollarSign, color: 'blue', menu: 'sales', sub: 'opportunities' },
    { title: 'New customer onboarded', time: '3 hours ago', icon: UserPlus, color: 'green', menu: 'sales', sub: 'accounts' }
  ];

  const topProducts = [
    { name: 'KPR Subsidi', sales: 245, revenue: 'Rp 850M' },
    { name: 'Credit Card', sales: 189, revenue: 'Rp 420M' },
    { name: 'Tabungan Premium', sales: 567, revenue: 'Rp 1.2B' },
    { name: 'Deposito', sales: 123, revenue: 'Rp 2.8B' }
  ];

  // Mock accounts for NBA generation
  const mockAccountsForNBA = [
    { id: '1', name: 'PT Maju Bersama', rfmSegment: 'Champions' as const, churnRisk: 'LOW' as const, churnScore: 1, productCount: 4, hasActiveCase: false, daysSinceLastTx: 1 },
    { id: '2', name: 'CV Sejahtera', rfmSegment: 'Loyal' as const, churnRisk: 'LOW' as const, churnScore: 2, productCount: 3, hasActiveCase: false, daysSinceLastTx: 3 },
    { id: '3', name: 'Budi Hartono', rfmSegment: 'Potential' as const, churnRisk: 'MEDIUM' as const, churnScore: 3, productCount: 2, hasActiveCase: false, daysSinceLastTx: 10 },
    { id: '4', name: 'PT Teknologi Nusantara', rfmSegment: 'At Risk' as const, churnRisk: 'HIGH' as const, churnScore: 5, productCount: 2, hasActiveCase: true, daysSinceLastTx: 61 },
    { id: '5', name: 'Toko Sari Rasa', rfmSegment: 'Loyal' as const, churnRisk: 'LOW' as const, churnScore: 1, productCount: 3, hasActiveCase: false, daysSinceLastTx: 1 },
    { id: '6', name: 'PT Karya Mandiri', rfmSegment: 'Hibernating' as const, churnRisk: 'CRITICAL' as const, churnScore: 7, productCount: 1, hasActiveCase: true, daysSinceLastTx: 118 }
  ];

  // Generate NBA recommendations
  const nbaRecommendations = generateDashboardNBA(mockAccountsForNBA);

  const handleNBAAction = (rec: NBARecommendation) => {
    const subMenu = rec.actionType === 'RETENTION_CALL' || rec.actionType === 'FINANCIAL_REVIEW' ? 'accounts' :
                    rec.actionType === 'CROSS_SELL_CAMPAIGN' || rec.actionType === 'WIN_BACK_CAMPAIGN' ? 'campaign' : 'main';
    navigate(rec.targetModule, subMenu, rec.targetModule.charAt(0).toUpperCase() + rec.targetModule.slice(1), subMenu.charAt(0).toUpperCase() + subMenu.slice(1));
  };

  const barColors = [
    'from-blue-500 to-cyan-400',
    'from-purple-500 to-pink-400',
    'from-green-500 to-emerald-400',
    'from-orange-500 to-yellow-400',
    'from-red-500 to-pink-400',
    'from-indigo-500 to-purple-400'
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      {/* Sales Pipeline & Top Sales */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Pipeline */}
        <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
          <div className="mb-6">
            <h3 className="text-white font-bold text-xl mb-1">Sales Pipeline by Stage</h3>
            <p className="text-slate-400 text-sm">Track deals through the sales funnel</p>
          </div>
          
          <div className="space-y-3">
            {pipelineStages.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-semibold text-sm">{item.stage}</span>
                    <span className="px-2 py-1 bg-blue-500 bg-opacity-20 text-blue-400 rounded-md text-xs font-bold">
                      {item.deals}
                    </span>
                  </div>
                  <span className="text-white font-bold text-sm">{item.value}</span>
                </div>
                <div className="relative h-12 bg-slate-750 rounded-lg overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${
                      item.color === 'blue' ? 'from-blue-600 to-blue-500' :
                      item.color === 'cyan' ? 'from-cyan-600 to-cyan-500' :
                      item.color === 'purple' ? 'from-purple-600 to-purple-500' :
                      item.color === 'orange' ? 'from-orange-600 to-orange-500' :
                      'from-green-600 to-green-500'
                    } rounded-lg transition-all duration-500 hover:opacity-80 cursor-pointer flex items-center justify-center`}
                    style={{ width: `${item.width}%` }}
                  >
                    <span className="text-white text-xs font-bold">{item.width}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-slate-400 text-xs mb-1">Total Pipeline</p>
              <p className="text-white text-lg font-bold">695 deals</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-xs mb-1">Pipeline Value</p>
              <p className="text-blue-400 text-lg font-bold">Rp 133.1B</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-xs mb-1">Conversion</p>
              <p className="text-green-400 text-lg font-bold">14.8%</p>
            </div>
          </div>
        </div>

        {/* Top Sales Reps */}
        <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
          <div className="mb-6">
            <h3 className="text-white font-bold text-xl mb-1">Top Sales Representatives</h3>
            <p className="text-slate-400 text-sm">Performance ranking this quarter</p>
          </div>

          <div className="space-y-3">
            {topSalesReps.map((rep) => (
              <div key={rep.rank} className="bg-slate-750 border border-slate-600 rounded-xl p-4 hover:border-green-500 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold text-lg ${
                    rep.rank === 1 ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white' : 
                    rep.rank === 2 ? 'bg-gradient-to-br from-slate-400 to-slate-500 text-white' : 
                    rep.rank === 3 ? 'bg-gradient-to-br from-orange-600 to-orange-700 text-white' : 
                    'bg-gradient-to-br from-green-600 to-green-500 text-white'
                  }`}>
                    {rep.rank === 1 ? '🥇' : rep.rank === 2 ? '🥈' : rep.rank === 3 ? '🥉' : rep.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-bold text-base">{rep.name}</h4>
                      {rep.trend === 'up' ? (
                        <TrendingUp size={14} className="text-green-400" />
                      ) : (
                        <TrendingDown size={14} className="text-red-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>{rep.deals} deals</span>
                      <span>•</span>
                      <span className="text-green-400 font-semibold">{rep.revenue}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      rep.quota >= 100 ? 'text-green-400' : 
                      rep.quota >= 80 ? 'text-blue-400' : 'text-orange-400'
                    }`}>
                      {rep.quota}%
                    </div>
                    <div className="text-slate-500 text-xs">quota</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {kpiCards.map((kpi, idx) => {
          const IconComp = kpi.icon;
          const maxVal = Math.max(...kpi.trend);
          return (
            <div 
              key={idx} 
              className={`${kpi.gradient} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white bg-opacity-20 w-12 h-12 rounded-xl flex items-center justify-center">
                  <IconComp size={24} className="text-white" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white bg-opacity-20 text-white">
                  {kpi.change}
                </span>
              </div>
              <p className="text-white text-opacity-80 text-sm mb-1">{kpi.label}</p>
              <p className="text-white text-3xl font-bold mb-3">{kpi.value}</p>
              <div className="flex items-end gap-1 h-8">
                {kpi.trend.map((val, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-white bg-opacity-30 rounded-t" 
                    style={{ height: `${(val / maxVal) * 100}%` }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales Performance Chart & RFM Segments */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 rounded-2xl p-8 shadow-2xl border-2 border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500 rounded-full opacity-5 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-white font-bold text-2xl mb-1 flex items-center gap-2">
                  <TrendingUp className="text-green-400" size={28} />
                  Sales Performance Trend
                </h3>
                <p className="text-slate-400 text-sm">Monthly achievement comparison</p>
              </div>
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-3 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp size={20} className="text-white" />
                  <div>
                    <p className="text-white text-xs opacity-80">Growth</p>
                    <p className="text-white text-lg font-bold">+18%</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bar Chart */}
            <div className="relative h-64">
              <div className="absolute inset-0 flex items-end justify-between gap-4">
                {salesTrend.map((item, idx) => {
                  const maxVal = Math.max(...salesTrend.map(s => s.value));
                  const height = (item.value / maxVal) * 100;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-3 group">
                      <div className="relative w-full">
                        <div 
                          className={`w-full bg-gradient-to-t ${barColors[idx]} rounded-t-2xl transition-all duration-500 hover:scale-105 cursor-pointer shadow-lg relative overflow-hidden`}
                          style={{ height: `${height}%`, minHeight: '50px' }}
                        >
                          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-bold text-lg drop-shadow-lg">{item.value}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-white font-bold text-sm bg-slate-700 px-3 py-1.5 rounded-lg group-hover:bg-slate-600 transition-colors">
                          {item.month}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-700 grid grid-cols-3 gap-4">
              <div className="bg-slate-750 rounded-xl p-4 border border-slate-600">
                <p className="text-slate-400 text-xs mb-1">Average</p>
                <p className="text-white text-2xl font-bold">89.5%</p>
              </div>
              <div className="bg-slate-750 rounded-xl p-4 border border-slate-600">
                <p className="text-slate-400 text-xs mb-1">Best Month</p>
                <p className="text-green-400 text-2xl font-bold">Dec (98%)</p>
              </div>
              <div className="bg-slate-750 rounded-xl p-4 border border-slate-600">
                <p className="text-slate-400 text-xs mb-1">Growth Rate</p>
                <p className="text-blue-400 text-2xl font-bold">+18%</p>
              </div>
            </div>
          </div>
        </div>

        {/* RFM Segments */}
        <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
          <h3 className="text-white font-bold text-lg mb-6">RFM Segments</h3>
          <div className="space-y-3">
            {rfmSegments.map((seg, idx) => (
              <div 
                key={idx} 
                className={`bg-gradient-to-r ${seg.color} rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-bold text-sm">{seg.name}</span>
                  <span className="text-white text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                    {seg.percentage}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-opacity-80 text-xs">{seg.count} customers</span>
                  <span className="text-white font-bold text-sm">{seg.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
          <h3 className="text-white font-bold text-lg mb-6">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, idx) => {
              const IconComp = activity.icon;
              return (
                <div 
                  key={idx} 
                  onClick={() => navigate(activity.menu, activity.sub, activity.menu.charAt(0).toUpperCase() + activity.menu.slice(1), activity.sub.charAt(0).toUpperCase() + activity.sub.slice(1))} 
                  className="flex items-center gap-4 p-4 bg-slate-700 rounded-xl hover:bg-slate-600 cursor-pointer transition-all border border-slate-600 hover:border-blue-500"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    activity.color === 'orange' ? 'bg-orange-500 bg-opacity-20 border-2 border-orange-500' :
                    activity.color === 'green' ? 'bg-green-500 bg-opacity-20 border-2 border-green-500' :
                    activity.color === 'purple' ? 'bg-purple-500 bg-opacity-20 border-2 border-purple-500' :
                    'bg-blue-500 bg-opacity-20 border-2 border-blue-500'
                  }`}>
                    <IconComp size={20} className={`${
                      activity.color === 'orange' ? 'text-orange-400' :
                      activity.color === 'green' ? 'text-green-400' :
                      activity.color === 'purple' ? 'text-purple-400' :
                      'text-blue-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{activity.title}</p>
                    <p className="text-slate-400 text-xs mt-1">{activity.time}</p>
                  </div>
                  <ArrowRight size={18} className="text-slate-400" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          {/* Top Products */}
          <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
            <h3 className="text-white font-bold text-lg mb-4">Top Products</h3>
            <div className="space-y-3">
              {topProducts.map((prod, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{prod.name}</p>
                    <p className="text-slate-400 text-xs">{prod.sales} sales</p>
                  </div>
                  <span className="text-green-400 font-bold text-sm">{prod.revenue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* NBA Recommendations Panel */}
          <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">📋 Next Best Actions</h3>
              <span className="text-slate-400 text-xs">{nbaRecommendations.length} recommendations</span>
            </div>
            
            {nbaRecommendations.length === 0 ? (
              <div className="text-center py-6 text-slate-500">
                <TrendingUp className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No urgent actions required</p>
              </div>
            ) : (
              <div className="space-y-3">
                {nbaRecommendations.slice(0, 4).map((rec) => {
                  const priorityStyle = getNBAPriorityStyle(rec.priority);
                  return (
                    <div 
                      key={rec.id}
                      className={`rounded-xl p-3 border-l-4 ${priorityStyle.border} ${priorityStyle.bgLight} hover:opacity-90 transition-all cursor-pointer`}
                      onClick={() => handleNBAAction(rec)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-semibold text-sm">{rec.title}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${priorityStyle.bgLight} ${priorityStyle.text} border ${priorityStyle.border}`}>
                          {rec.priority}
                        </span>
                      </div>
                      
                      <p className="text-slate-400 text-xs mb-2">{rec.description}</p>
                      
                      <div className="bg-slate-800 bg-opacity-50 rounded p-2 mb-2">
                        <p className="text-slate-500 text-xs">
                          <span className="font-medium text-slate-400">Why: </span>
                          {rec.reason.length > 80 ? rec.reason.substring(0, 80) + '...' : rec.reason}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <TrendingUp size={10} />
                            <span>{rec.estimatedImpact}</span>
                          </div>
                          {rec.dueDate && (
                            <div className="flex items-center gap-1">
                              <Calendar size={10} />
                              <span>Due: {new Date(rec.dueDate).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}</span>
                            </div>
                          )}
                        </div>
                        <button 
                          className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-all"
                          onClick={(e) => { e.stopPropagation(); handleNBAAction(rec); }}
                        >
                          {getNBAActionLabel(rec.actionType)}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {nbaRecommendations.length > 4 && (
              <button className="w-full mt-3 text-center text-blue-400 hover:text-blue-300 text-xs font-medium">
                View all {nbaRecommendations.length} recommendations →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
