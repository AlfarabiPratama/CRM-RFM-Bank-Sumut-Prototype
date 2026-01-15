import { Search, Bell, ChevronDown, ChevronRight } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';

export function TopBar() {
  const { breadcrumbs, navigate } = useAppStore();

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 px-8 py-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white text-2xl font-bold">
          {breadcrumbs[breadcrumbs.length - 1]}
        </h2>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-80 px-4 py-2 pl-10 bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          </div>

          {/* Notifications */}
          <button className="relative p-2 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
            <Bell size={20} className="text-slate-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-700 rounded-xl cursor-pointer hover:bg-slate-600 transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">AD</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Admin User</p>
              <p className="text-slate-400 text-xs">Marketing Manager</p>
            </div>
            <ChevronDown size={16} className="text-slate-400" />
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, idx) => (
          <div key={idx} className="flex items-center gap-2">
            {idx > 0 && <ChevronRight size={14} className="text-slate-500" />}
            <span 
              className={`${
                idx === breadcrumbs.length - 1 
                  ? 'text-blue-400 font-medium' 
                  : 'text-slate-400 cursor-pointer hover:text-slate-300'
              }`}
              onClick={() => {
                if (idx === 0) navigate('dashboard', '', 'Dashboard');
              }}
            >
              {crumb}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
