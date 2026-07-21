import React from 'react';
import StatCard from '../../components/common/StatCard';
import { Download, FileText, TrendingUp, Users, Activity } from 'lucide-react';

const Reports = () => {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl mb-6">
        <h3 className="text-indigo-800 font-semibold mb-1">Module Note: Hospital Reports</h3>
        <p className="text-indigo-600 text-sm"><strong>Flow/Usefulness:</strong> Analytics and reporting allow the administration to identify trends in patient admissions, revenue generation, and staff performance. It is essential for strategic planning, resource allocation, and optimizing hospital efficiency.</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Analytics & Reports</h1>
          <p className="text-slate-500 text-sm mt-1">View key metrics and download generated reports.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value="$124,500" trend="+12%" trendLabel="vs last month" icon={TrendingUp} colorTheme="primary" />
        <StatCard title="New Patients" value="842" trend="+5%" trendLabel="vs last month" icon={Users} colorTheme="emerald" />
        <StatCard title="Lab Tests" value="1,204" trend="-2%" trendLabel="vs last month" icon={Activity} colorTheme="amber" />
        <StatCard title="Reports Generated" value="156" trend="+18%" trendLabel="vs last month" icon={FileText} colorTheme="blue" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-900">Recent Reports</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { title: 'Monthly Financial Summary', date: 'Oct 01, 2023', type: 'Finance', size: '2.4 MB' },
            { title: 'Patient Admissions Overview', date: 'Sep 30, 2023', type: 'Operations', size: '1.1 MB' },
            { title: 'Pharmacy Inventory Status', date: 'Sep 28, 2023', type: 'Inventory', size: '3.8 MB' },
            { title: 'Staff Performance Metrics', date: 'Sep 25, 2023', type: 'HR', size: '1.5 MB' },
          ].map((report, idx) => (
            <div key={idx} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{report.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{report.type} • {report.date} • {report.size}</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
