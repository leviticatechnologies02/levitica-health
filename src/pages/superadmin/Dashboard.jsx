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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Hospitals Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800">Recent Onboardings</h2>
            <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold border-b border-slate-100">Hospital Name</th>
                  <th className="p-4 font-semibold border-b border-slate-100">Subscription Plan</th>
                  <th className="p-4 font-semibold border-b border-slate-100">Joined Date</th>
                  <th className="p-4 font-semibold border-b border-slate-100">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {[
                  { name: 'City General Hospital', plan: 'Enterprise Plan', date: 'Oct 12, 2024', status: 'Active' },
                  { name: 'Sunrise Medical Center', plan: 'Pro Plan', date: 'Oct 10, 2024', status: 'Active' },
                  { name: 'Lakeview Clinic', plan: 'Basic Plan', date: 'Oct 08, 2024', status: 'Pending' },
                  { name: 'Mercy Care', plan: 'Pro Plan', date: 'Oct 05, 2024', status: 'Active' },
                  { name: 'Oakwood Health', plan: 'Basic Plan', date: 'Oct 01, 2024', status: 'Active' },
                ].map((hospital, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-800">{hospital.name}</td>
                    <td className="p-4 text-slate-600 font-medium">{hospital.plan}</td>
                    <td className="p-4 text-slate-500">{hospital.date}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${hospital.status === 'Active' ? 'bg-success-50 text-success-600' : 'bg-warning-50 text-warning-600'}`}>
                        {hospital.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Activity Feed */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
          </div>
          <div className="p-6 space-y-6">
            {[
              { title: 'New Plan Subscription', desc: 'Sunrise Medical Center upgraded to Pro Plan.', time: '2 hours ago', icon: Building2, color: 'text-primary-500', bg: 'bg-primary-50' },
              { title: 'System Alert', desc: 'High CPU usage detected on server Node-3.', time: '5 hours ago', icon: BellRing, color: 'text-danger-500', bg: 'bg-danger-50' },
              { title: 'New User Registered', desc: 'Dr. Smith (City General) joined the platform.', time: '1 day ago', icon: Users, color: 'text-success-500', bg: 'bg-success-50' },
              { title: 'Database Backup', desc: 'Automated backup completed successfully.', time: '2 days ago', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
            ].map((activity, i) => {
              const Icon = activity.icon;
              return (
                <div key={i} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.bg}`}>
                    <Icon size={18} className={activity.color} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{activity.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{activity.desc}</p>
                    <span className="text-[10px] font-semibold text-slate-400 mt-1 block">{activity.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
