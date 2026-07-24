import React from 'react';
import {
  Building2, Users, UsersRound, ActivitySquare, TrendingUp, AlertTriangle, ChevronRight, CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/common/StatCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DASHBOARD_DATA = [
  { name: 'Jan', patients: 4000, revenue: 2400 },
  { name: 'Feb', patients: 3000, revenue: 1398 },
  { name: 'Mar', patients: 2000, revenue: 9800 },
  { name: 'Apr', patients: 2780, revenue: 3908 },
  { name: 'May', patients: 1890, revenue: 4800 },
  { name: 'Jun', patients: 2390, revenue: 3800 },
  { name: 'Jul', patients: 3490, revenue: 4300 },
];

const RECENT_ACTIVITY = [
  { id: 1, title: 'New Branch Added', time: '2 hours ago', desc: 'Apollo South Wing was successfully registered.', type: 'success' },
  { id: 2, title: 'System Alert', time: '5 hours ago', desc: 'Server maintenance scheduled for tomorrow 2 AM.', type: 'warning' },
  { id: 3, title: 'High Patient Influx', time: '1 day ago', desc: 'Max Healthcare reported 120% capacity in emergency.', type: 'error' },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10 space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Group Overview</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back. Here's what's happening across your group today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Branches" value="24" icon={Building2} colorTheme="blue" />
        <StatCard title="Active Branches" value="22" icon={ActivitySquare} colorTheme="green" />
        <StatCard title="Registered Patients" value="8,450" icon={UsersRound} colorTheme="purple" />
        <StatCard title="Branch Admins" value="45" icon={Users} colorTheme="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="text-base font-bold text-slate-800">Growth Trends</h2>
              <p className="text-xs text-slate-500 mt-0.5">Patient admissions vs overall group revenue</p>
            </div>
            <button onClick={() => navigate('/groupAdmin/reports')} className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
              Full Report <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="p-6 h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DASHBOARD_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="patients" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorPatients)" />
                <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-base font-bold text-slate-800">Recent Activity</h2>
            <p className="text-xs text-slate-500 mt-0.5">Alerts & notifications from branches</p>
          </div>
          <div className="p-5 flex-1 overflow-y-auto">
            <div className="space-y-6">
              {RECENT_ACTIVITY.map((activity, index) => (
                <div key={activity.id} className="relative flex gap-4">
                  {index !== RECENT_ACTIVITY.length - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-[-24px] w-px bg-slate-200"></div>
                  )}

                  <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 border-white
                    ${activity.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                      activity.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                        'bg-rose-100 text-rose-600'}`}
                  >
                    {activity.type === 'success' ? <CheckCircle2 className="w-3.5 h-3.5" /> :
                      activity.type === 'warning' ? <AlertTriangle className="w-3.5 h-3.5" /> :
                        <TrendingUp className="w-3.5 h-3.5" />}
                  </div>

                  <div className="flex flex-col pb-1">
                    <span className="text-sm font-semibold text-slate-800">{activity.title}</span>
                    <span className="text-xs text-slate-400 mb-1">{activity.time}</span>
                    <p className="text-sm text-slate-600 leading-relaxed">{activity.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline">View All Notifications</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
