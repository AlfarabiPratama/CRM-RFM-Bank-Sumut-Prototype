import { Users, Bell, Repeat, Shield } from 'lucide-react';

export function SettingsMain() {
  const settingSections = [
    { label: 'User Management', desc: 'Kelola pengguna dan roles', icon: Users, color: 'blue' },
    { label: 'Notifications', desc: 'Pengaturan notifikasi sistem', icon: Bell, color: 'orange' },
    { label: 'Integrations', desc: 'Koneksi dengan sistem lain', icon: Repeat, color: 'purple' },
    { label: 'Security', desc: 'Keamanan dan akses kontrol', icon: Shield, color: 'green' }
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="mb-8">
        <h2 className="text-white text-2xl font-bold mb-2">Settings</h2>
        <p className="text-slate-400">Konfigurasi sistem CRM Bank Sumut</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {settingSections.map((section, idx) => {
          const IconComp = section.icon;
          return (
            <div key={idx} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-500 transition-all cursor-pointer">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                section.color === 'blue' ? 'bg-blue-500 bg-opacity-20' :
                section.color === 'orange' ? 'bg-orange-500 bg-opacity-20' :
                section.color === 'purple' ? 'bg-purple-500 bg-opacity-20' :
                'bg-green-500 bg-opacity-20'
              }`}>
                <IconComp size={24} className={`${
                  section.color === 'blue' ? 'text-blue-400' :
                  section.color === 'orange' ? 'text-orange-400' :
                  section.color === 'purple' ? 'text-purple-400' :
                  'text-green-400'
                }`} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{section.label}</h3>
              <p className="text-slate-400 text-sm">{section.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function UsersManagementContent() {
  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-white text-2xl font-bold mb-4">User Management</h2>
        <p className="text-slate-400">Kelola pengguna, roles, dan permissions.</p>
      </div>
    </div>
  );
}

export function NotificationsSettingsContent() {
  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-white text-2xl font-bold mb-4">Notifications</h2>
        <p className="text-slate-400">Pengaturan notifikasi email, SMS, dan push.</p>
      </div>
    </div>
  );
}

export function IntegrationsContent() {
  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-white text-2xl font-bold mb-4">Integrations</h2>
        <p className="text-slate-400">Koneksi dengan Core Banking, SMS Gateway, dll.</p>
      </div>
    </div>
  );
}

export function SecurityContent() {
  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-white text-2xl font-bold mb-4">Security</h2>
        <p className="text-slate-400">Pengaturan keamanan, 2FA, dan audit log.</p>
      </div>
    </div>
  );
}
