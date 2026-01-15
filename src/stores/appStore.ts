import { create } from 'zustand';
import type { Customer, Campaign, Lead, Ticket } from '../types';

interface AppState {
  // Navigation
  activeMenu: string;
  activeSubMenu: string;
  sidebarExpanded: boolean;
  breadcrumbs: string[];
  
  // Selected items
  selectedCustomer: Customer | null;
  
  // Actions
  setActiveMenu: (menu: string) => void;
  setActiveSubMenu: (subMenu: string) => void;
  setSidebarExpanded: (expanded: boolean) => void;
  setBreadcrumbs: (crumbs: string[]) => void;
  setSelectedCustomer: (customer: Customer | null) => void;
  navigate: (menuId: string, subMenuId?: string, menuLabel?: string, subMenuLabel?: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  activeMenu: 'dashboard',
  activeSubMenu: '',
  sidebarExpanded: true,
  breadcrumbs: ['Dashboard'],
  selectedCustomer: null,
  
  // Actions
  setActiveMenu: (menu) => set({ activeMenu: menu }),
  setActiveSubMenu: (subMenu) => set({ activeSubMenu: subMenu }),
  setSidebarExpanded: (expanded) => set({ sidebarExpanded: expanded }),
  setBreadcrumbs: (crumbs) => set({ breadcrumbs: crumbs }),
  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),
  
  navigate: (menuId, subMenuId = '', menuLabel = '', subMenuLabel = '') => {
    set({
      activeMenu: menuId,
      activeSubMenu: subMenuId,
      breadcrumbs: subMenuId && subMenuLabel 
        ? [menuLabel, subMenuLabel] 
        : [menuLabel || menuId.charAt(0).toUpperCase() + menuId.slice(1)],
    });
  },
}));

// Customer Store
interface CustomerState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  setCustomers: (customers: Customer[]) => void;
  setSelectedCustomer: (customer: Customer | null) => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: [],
  selectedCustomer: null,
  setCustomers: (customers) => set({ customers }),
  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),
}));

// Campaign Store
interface CampaignState {
  campaigns: Campaign[];
  activeCampaigns: Campaign[];
  setCampaigns: (campaigns: Campaign[]) => void;
}

export const useCampaignStore = create<CampaignState>((set) => ({
  campaigns: [],
  activeCampaigns: [],
  setCampaigns: (campaigns) => set({ 
    campaigns,
    activeCampaigns: campaigns.filter(c => c.status === 'Active')
  }),
}));

// Lead Store
interface LeadState {
  leads: Lead[];
  setLeads: (leads: Lead[]) => void;
}

export const useLeadStore = create<LeadState>((set) => ({
  leads: [],
  setLeads: (leads) => set({ leads }),
}));

// Ticket Store
interface TicketState {
  tickets: Ticket[];
  openTickets: number;
  setTickets: (tickets: Ticket[]) => void;
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: [],
  openTickets: 0,
  setTickets: (tickets) => set({ 
    tickets,
    openTickets: tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length
  }),
}));
