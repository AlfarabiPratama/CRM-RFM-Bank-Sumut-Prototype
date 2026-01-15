import { ChevronRight } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';
import { menuItems } from '../../constants/menuItems';

export function Sidebar() {
  const { 
    activeMenu, 
    activeSubMenu, 
    sidebarExpanded, 
    setSidebarExpanded,
    navigate 
  } = useAppStore();

  const handleNavigation = (menuId: string, subMenuId: string = '') => {
    const menu = menuItems.find(m => m.id === menuId);
    if (subMenuId && menu?.subMenu) {
      const subMenu = menu.subMenu.find(s => s.id === subMenuId);
      navigate(menuId, subMenuId, menu.label, subMenu?.label || '');
    } else {
      navigate(menuId, '', menu?.label || '');
    }
  };

  return (
    <div 
      className={`bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 h-screen fixed left-0 top-0 shadow-2xl z-30 overflow-y-auto transition-all duration-300 ${
        sidebarExpanded ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">BS</span>
          </div>
          {sidebarExpanded && (
            <div>
              <h1 className="text-white font-bold text-lg">Bank Sumut</h1>
              <p className="text-slate-400 text-xs">CRM Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const IconComp = item.icon;
          const isActive = activeMenu === item.id;
          const hasSubMenu = item.subMenu && item.subMenu.length > 0;
          
          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  handleNavigation(item.id, '');
                  if (hasSubMenu && isActive) {
                    useAppStore.getState().setActiveMenu('');
                  }
                }}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComp size={20} />
                  {sidebarExpanded && <span className="font-medium text-sm">{item.label}</span>}
                </div>
                {sidebarExpanded && hasSubMenu && (
                  <ChevronRight 
                    size={16} 
                    className={`transition-transform ${isActive ? 'rotate-90' : ''}`} 
                  />
                )}
              </button>
              
              {/* Submenu */}
              {sidebarExpanded && hasSubMenu && isActive && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.subMenu?.map((sub) => {
                    const SubIcon = sub.icon;
                    const isSubActive = activeSubMenu === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => handleNavigation(item.id, sub.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all ${
                          isSubActive 
                            ? 'bg-blue-500 text-white font-medium' 
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <SubIcon size={16} />
                        {sub.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={() => setSidebarExpanded(!sidebarExpanded)}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white hover:shadow-xl shadow-lg transition-all"
      >
        <ChevronRight 
          size={18} 
          className={`transition-transform ${sidebarExpanded ? 'rotate-180' : ''}`} 
        />
      </button>
    </div>
  );
}
