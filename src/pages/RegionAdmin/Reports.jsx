import React from 'react';
import {
  BarChart2, FileSpreadsheet, FileText, Download, TrendingUp, Users, DollarSign, Activity, ActivitySquare
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import StatCard from '../../components/common/StatCard';

const REGION_REVENUE_DATA = [
  { month: 'Jan', Apollo: 4000, Fortis: 2400, Max: 2400 },
  { month: 'Feb', Apollo: 3000, Fortis: 1398, Max: 2210 },
  { month: 'Mar', Apollo: 2000, Fortis: 9800, Max: 2290 },
  { month: 'Apr', Apollo: 2780, Fortis: 3908, Max: 2000 },
  { month: 'May', Apollo: 1890, Fortis: 4800, Max: 2181 },
  { month: 'Jun', Apollo: 2390, Fortis: 3800, Max: 2500 },
  { month: 'Jul', Apollo: 3490, Fortis: 4300, Max: 2100 },
];

const Reports = () => {
  const handleExport = (format) => {
    alert(`Generating regional ${format.toUpperCase()} report...`);
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Region Analytics & Reports</h1>
          <p className="text-slate-500 text-sm mt-1">Deep dive into performance metrics across all regional groups.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button onClick={() => handleExport('excel')} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
            <FileSpreadsheet className="w-4 h-4 text-green-600" /> <span className="whitespace-nowrap">Export Excel</span>
          </button>
          <button onClick={() => handleExport('pdf')} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
            <FileText className="w-4 h-4 text-red-500" /> <span className="whitespace-nowrap">Export PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Regional Revenue" value="$4.2M" icon={DollarSign} colorTheme="green" />
        <StatCard title="Patient Admission Rate" value="+12.4%" icon={TrendingUp} colorTheme="blue" />
        <StatCard title="Total Consultations" value="84,230" icon={ActivitySquare} colorTheme="orange" />
        <StatCard title="Average Wait Time" value="14 mins" icon={Activity} colorTheme="purple" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-slate-800">Group Revenue Comparison</h2>
            <p className="text-xs text-slate-500 mt-0.5">Monthly revenue breakdown by top healthcare groups</p>
          </div>
          <select className="bg-white border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary-500">
            <option>Last 7 Months</option>
            <option>This Year</option>
            <option>Last Year</option>
          </select>
        </div>
        <div className="p-6 h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={REGION_REVENUE_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ fill: '#f8fafc' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="Apollo" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="Fortis" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="Max" fill="#f97316" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
