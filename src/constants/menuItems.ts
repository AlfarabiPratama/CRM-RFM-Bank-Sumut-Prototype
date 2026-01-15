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

export const menuItems: MenuItem[] = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: Home 
  },
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
];
