import React from 'react';
import StatCard from '../../components/common/StatCard';
import { Users, Activity, Building2, BellRing } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Users', value: '1,248', trend: '+12.5%', trendLabel: 'vs last month', icon: Users, theme: 'blue' },
    { title: 'Active Sessions', value: '142', trend: '+5.2%', trendLabel: 'vs last hour', icon: Activity, theme: 'green' },
    { title: 'Total Facilities', value: '18', trend: '0%', trendLabel: 'no change', icon: Building2, theme: 'purple' },
    { title: 'System Alerts', value: '3', trend: '-2', trendLabel: 'from yesterday', icon: BellRing, theme: 'rose' },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Superadmin Dashboard</h1>
        <p className="text-slate-500 text-sm mt-2 font-medium">Overview of the entire Levitica MediSphere system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            colorTheme={stat.theme}
          />
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm p-8 border border-slate-100 min-h-[400px] flex items-center justify-center relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 -translate-y-1/2 translate-x-1/4"></div>

        <div className="text-center relative z-10">
          <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner border border-slate-100">
            <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-slate-800 text-xl font-bold mb-2 tracking-tight">Detailed Analytics</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">This widget area is reserved for detailed charts and graphs for the superadmin view.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
