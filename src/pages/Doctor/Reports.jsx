import React, { useState } from 'react';
import { Search, Filter, FileText, Download, TrendingUp } from 'lucide-react';
import StatCard from '../../components/common/StatCard';

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const reports = [
    { id: 'REP-001', name: 'Monthly Clinical Outcomes', type: 'Clinical', date: '01 Nov 2023', status: 'Generated' },
    { id: 'REP-002', name: 'Patient Wait Times Analysis', type: 'Operational', date: '15 Oct 2023', status: 'Generated' },
    { id: 'REP-003', name: 'Department Quality Metrics', type: 'Quality', date: '01 Oct 2023', status: 'Generated' },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reports & Analytics</h1>
          <p className="text-slate-500 mt-1">View clinical and operational reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search reports..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm w-64"
            />
          </div>
          <button className="p-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Consultations" value="1,248" icon={FileText} colorTheme="blue" />
        <StatCard title="Avg Wait Time" value="14 min" icon={TrendingUp} colorTheme="emerald" />
        <StatCard title="Patient Satisfaction" value="4.8/5" icon={FileText} colorTheme="amber" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Recent Reports</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100 text-sm">
                <th className="py-4 px-6 font-semibold text-slate-600">Report ID</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Name</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Category</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Generated On</th>
                <th className="py-4 px-6 font-semibold text-slate-600 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 text-slate-500 font-medium">{report.id}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{report.name}</td>
                  <td className="py-4 px-6 text-slate-600">{report.type}</td>
                  <td className="py-4 px-6 text-slate-600">{report.date}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors inline-flex items-center justify-center">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
