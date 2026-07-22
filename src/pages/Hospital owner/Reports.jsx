import React from 'react';
import Table from '../../components/common/Table';
import { BarChart2, Download, Search, Filter } from 'lucide-react';

const Reports = () => {
  const reportsColumns = [
    { header: 'Report Name', accessor: 'name' },
    { header: 'Type', accessor: 'type' },
    { header: 'Generated On', accessor: 'date' },
    { header: 'Status', render: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === 'Ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
        {row.status}
      </span>
    ) },
    { header: 'Actions', render: (row) => (
      <button disabled={row.status !== 'Ready'} className="flex items-center gap-1 text-primary-600 hover:text-primary-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
        <Download size={16} /> Download
      </button>
    ) }
  ];

  const reportsData = [
    { name: 'Monthly Financial Summary', type: 'Financial', date: 'Oct 31, 2023', status: 'Ready' },
    { name: 'Patient Admission Stats', type: 'Clinical', date: 'Oct 30, 2023', status: 'Ready' },
    { name: 'Q3 Regional Performance', type: 'Operational', date: 'Generating...', status: 'Processing' },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col h-full min-h-[calc(100vh-8rem)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Organization Reports
          </h1>
          <p className="text-slate-500 mt-1">View and download analytics and reports for your organization.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm font-medium text-sm">
            <Filter size={16} />
            Filters
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all shadow-md font-medium text-sm">
            Generate New Report
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-t-2xl border-b border-slate-100 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search reports..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
          />
        </div>
      </div>

      <div className="flex-1">
        <Table columns={reportsColumns} data={reportsData} className="rounded-t-none border-t-0" />
      </div>
    </div>
  );
};

export default Reports;
