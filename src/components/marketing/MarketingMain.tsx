import { Send, TrendingUp, Activity, Award, Users } from 'lucide-react';

export function MarketingMain() {
  const stats = [
    { label: 'Active Campaigns', value: '57', change: '+8', icon: Send, gradient: 'from-orange-600 to-orange-500' },
    { label: 'Total Reach', value: '504K', change: '+18%', icon: Users, gradient: 'from-blue-600 to-blue-500' },
    { label: 'Avg Engagement', value: '67.5%', change: '+5%', icon: Activity, gradient: 'from-purple-600 to-purple-500' },
    { label: 'Conversion Rate', value: '20%', change: '+3%', icon: TrendingUp, gradient: 'from-green-600 to-green-500' },
    { label: 'Marketing ROI', value: '+208%', change: '+12%', icon: Award, gradient: 'from-yellow-600 to-yellow-500' }
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="grid grid-cols-5 gap-6 mb-8">
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

      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h3 className="text-white font-bold text-2xl mb-4">Marketing Hub</h3>
        <p className="text-slate-400">
          Kelola kampanye marketing, analitik, dan engagement pelanggan dari satu dashboard terpusat.
        </p>
      </div>
    </div>
  );
}
