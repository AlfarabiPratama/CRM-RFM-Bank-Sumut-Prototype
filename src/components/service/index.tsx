import { Headphones, Tag, Clock, AlertCircle } from 'lucide-react';

export function ServiceMain() {
  const stats = [
    { label: 'Open Tickets', value: '156', change: '-12%', icon: Tag },
    { label: 'Avg Response', value: '2.4h', change: '-18%', icon: Clock },
    { label: 'SLA at Risk', value: '5', change: '-2', icon: AlertCircle },
    { label: 'Satisfaction', value: '94%', change: '+3%', icon: Headphones }
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <div key={idx} className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl p-6 shadow-xl">
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
        <h3 className="text-white font-bold text-2xl mb-4">Service Hub</h3>
        <p className="text-slate-400">
          Kelola tiket, knowledge base, dan feedback pelanggan dari satu dashboard.
        </p>
      </div>
    </div>
  );
}

export function TicketsContent() {
  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-white text-2xl font-bold mb-4">Tickets</h2>
        <p className="text-slate-400">Manajemen tiket layanan pelanggan.</p>
      </div>
    </div>
  );
}

export function KnowledgeBaseContent() {
  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-white text-2xl font-bold mb-4">Knowledge Base</h2>
        <p className="text-slate-400">Artikel dan FAQ untuk self-service.</p>
      </div>
    </div>
  );
}

export function CustomerFeedbackContent() {
  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-white text-2xl font-bold mb-4">Customer Feedback</h2>
        <p className="text-slate-400">Feedback dan rating dari pelanggan.</p>
      </div>
    </div>
  );
}

export function HistoryContent() {
  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-white text-2xl font-bold mb-4">History</h2>
        <p className="text-slate-400">Riwayat interaksi pelanggan.</p>
      </div>
    </div>
  );
}
