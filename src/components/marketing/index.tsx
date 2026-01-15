export { MarketingMain } from './MarketingMain';
export { CampaignContent } from './CampaignContent';

// Placeholder exports - will be implemented later
export function ProjectContent() {
  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-white text-2xl font-bold mb-4">Projects</h2>
        <p className="text-slate-400">Kelola proyek marketing Anda.</p>
      </div>
    </div>
  );
}

export function DigitalAdsContent() {
  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-white text-2xl font-bold mb-4">Digital Ads</h2>
        <p className="text-slate-400">Monitor performa iklan digital Anda.</p>
      </div>
    </div>
  );
}

export function AnalyticsContent() {
  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-white text-2xl font-bold mb-4">Analytics</h2>
        <p className="text-slate-400">Analitik marketing dan insight pelanggan.</p>
      </div>
    </div>
  );
}
