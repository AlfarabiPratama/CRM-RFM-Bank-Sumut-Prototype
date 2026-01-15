import { create } from 'zustand';
import { 
  Home, 
  Target, 
  TrendingUp, 
  Headphones, 
  Settings,
  Send,
  Briefcase,
  Zap,
  PieChart,
  Users,
  Package,
  Building2,
  Phone,
  Tag,
  FileText,
  MessageSquare,
  Clock,
  Bell,
  Repeat,
  Shield
} from 'lucide-react';
import type { MenuItem } from '../types';

interface NavigationState {
  activeMenu: string;
  activeSubMenu: string;
  sidebarExpanded: boolean;
  breadcrumbs: string[];
  menuItems: MenuItem[];
  
  // Actions
  navigate: (menuId: string, subMenuId?: string) => void;
  toggleSidebar: () => void;
  setSidebarExpanded: (expanded: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  activeMenu: 'dashboard',
  activeSubMenu: '',
  sidebarExpanded: true,
  breadcrumbs: ['Dashboard'],
  
  menuItems: [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { 
      id: 'marketing', 
      label: 'Marketing', 
      icon: Target, 
      subMenu: [
        { id: 'campaign', label: 'Campaigns', icon: Send },
        { id: 'project', label: 'Projects', icon: Briefcase },
        { id: 'digitalads', label: 'Digital Ads', icon: Zap },
        { id: 'analytics', label: 'Analytics', icon: PieChart }
      ]
    },
    { 
      id: 'sales', 
      label: 'Sales', 
      icon: TrendingUp, 
      subMenu: [
        { id: 'leads', label: 'Leads', icon: Users },
        { id: 'opportunities', label: 'Opportunities', icon: Package },
        { id: 'accounts', label: 'Accounts', icon: Building2 },
        { id: 'contacts', label: 'Contacts', icon: Phone }
      ]
    },
    { 
      id: 'service', 
      label: 'Service', 
      icon: Headphones, 
      subMenu: [
        { id: 'tickets', label: 'Tickets', icon: Tag },
        { id: 'knowledge', label: 'Knowledge Base', icon: FileText },
        { id: 'feedback', label: 'Customer Feedback', icon: MessageSquare },
        { id: 'history', label: 'History', icon: Clock }
      ]
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings,
      subMenu: [
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'integrations', label: 'Integrations', icon: Repeat },
        { id: 'security', label: 'Security', icon: Shield }
      ]
    }
  ],

  navigate: (menuId: string, subMenuId?: string) => {
    const { menuItems, activeMenu } = get();
    const menu = menuItems.find(m => m.id === menuId);
    
    // If clicking on the same menu with submenus and no submenu specified, toggle collapse
    if (menuId === activeMenu && menu?.subMenu && !subMenuId) {
      set({ activeMenu: '', activeSubMenu: '', breadcrumbs: ['Dashboard'] });
      return;
    }
    
    // Build breadcrumbs
    let newBreadcrumbs: string[] = [];
    if (subMenuId && menu?.subMenu) {
      const subMenu = menu.subMenu.find(s => s.id === subMenuId);
      newBreadcrumbs = [menu.label, subMenu?.label || ''];
    } else {
      newBreadcrumbs = [menu?.label || 'Dashboard'];
    }
    
    set({
      activeMenu: menuId,
      activeSubMenu: subMenuId || '',
      breadcrumbs: newBreadcrumbs
    });
  },

  toggleSidebar: () => {
    set(state => ({ sidebarExpanded: !state.sidebarExpanded }));
  },

  setSidebarExpanded: (expanded: boolean) => {
    set({ sidebarExpanded: expanded });
  }
}));
