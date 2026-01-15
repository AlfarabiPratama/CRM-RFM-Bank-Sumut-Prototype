import { Sidebar, TopBar } from './components/layout';
import { DashboardContent } from './components/dashboard';
import { 
  MarketingMain, 
  CampaignContent, 
  ProjectContent, 
  DigitalAdsContent, 
  AnalyticsContent 
} from './components/marketing';
import { 
  SalesMain, 
  LeadsContent, 
  OpportunitiesContent, 
  AccountsContent, 
  ContactsContent 
} from './components/sales';
import { 
  ServiceMain, 
  TicketsContent, 
  KnowledgeBaseContent, 
  CustomerFeedbackContent,
  HistoryContent
} from './components/service';
import { 
  SettingsMain, 
  UsersManagementContent, 
  NotificationsSettingsContent, 
  IntegrationsContent, 
  SecurityContent 
} from './components/settings';
import { useAppStore } from './stores/appStore';

function App() {
  const { activeMenu, activeSubMenu, sidebarExpanded } = useAppStore();

  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />
      <div className={`flex-1 transition-all duration-300 ${sidebarExpanded ? 'ml-64' : 'ml-20'}`}>
        <TopBar />
        <main>
          {/* Dashboard */}
          {activeMenu === 'dashboard' && <DashboardContent />}
          
          {/* Marketing */}
          {activeMenu === 'marketing' && activeSubMenu === '' && <MarketingMain />}
          {activeMenu === 'marketing' && activeSubMenu === 'campaign' && <CampaignContent />}
          {activeMenu === 'marketing' && activeSubMenu === 'project' && <ProjectContent />}
          {activeMenu === 'marketing' && activeSubMenu === 'digitalads' && <DigitalAdsContent />}
          {activeMenu === 'marketing' && activeSubMenu === 'analytics' && <AnalyticsContent />}
          
          {/* Sales */}
          {activeMenu === 'sales' && activeSubMenu === '' && <SalesMain />}
          {activeMenu === 'sales' && activeSubMenu === 'leads' && <LeadsContent />}
          {activeMenu === 'sales' && activeSubMenu === 'opportunities' && <OpportunitiesContent />}
          {activeMenu === 'sales' && activeSubMenu === 'accounts' && <AccountsContent />}
          {activeMenu === 'sales' && activeSubMenu === 'contacts' && <ContactsContent />}
          
          {/* Service */}
          {activeMenu === 'service' && activeSubMenu === '' && <ServiceMain />}
          {activeMenu === 'service' && activeSubMenu === 'tickets' && <TicketsContent />}
          {activeMenu === 'service' && activeSubMenu === 'knowledge' && <KnowledgeBaseContent />}
          {activeMenu === 'service' && activeSubMenu === 'feedback' && <CustomerFeedbackContent />}
          {activeMenu === 'service' && activeSubMenu === 'history' && <HistoryContent />}
          
          {/* Settings */}
          {activeMenu === 'settings' && activeSubMenu === '' && <SettingsMain />}
          {activeMenu === 'settings' && activeSubMenu === 'users' && <UsersManagementContent />}
          {activeMenu === 'settings' && activeSubMenu === 'notifications' && <NotificationsSettingsContent />}
          {activeMenu === 'settings' && activeSubMenu === 'integrations' && <IntegrationsContent />}
          {activeMenu === 'settings' && activeSubMenu === 'security' && <SecurityContent />}
        </main>
      </div>
    </div>
  );
}

export default App;
