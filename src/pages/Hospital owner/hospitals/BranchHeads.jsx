import React from 'react';
import Table from '../../../components/common/Table';
import { UserCheck, Plus, Search, Filter } from 'lucide-react';

const HospitalBranchHeads = () => {
  const branchHeadsColumns = [
    { header: 'Branch Head Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Assigned Hospital', accessor: 'hospital' },
    { header: 'Status', render: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
        {row.status}
      </span>
    ) },
    { header: 'Actions', render: () => (
      <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">Manage</button>
    ) }
  ];

  const branchHeadsData = [
    { name: 'Dr. Emily Chen', email: 'emily.c@hospital.com', hospital: 'City General Hospital', status: 'Active' },
    { name: 'Dr. Michael Scott', email: 'michael.s@hospital.com', hospital: 'Valley Medical Center', status: 'Active' },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col h-full min-h-[calc(100vh-8rem)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Branch Heads
          </h1>
          <p className="text-slate-500 mt-1">Manage heads and administrators of different hospital branches.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm font-medium text-sm">
            <Filter size={16} />
            Filters
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all shadow-md font-medium text-sm">
            <Plus size={16} />
            Add Branch Head
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-t-2xl border-b border-slate-100 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search branch heads..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
          />
        </div>
      </div>

      <div className="flex-1">
        <Table columns={branchHeadsColumns} data={branchHeadsData} className="rounded-t-none border-t-0" />
      </div>
    </div>
  );
};

export default HospitalBranchHeads;
