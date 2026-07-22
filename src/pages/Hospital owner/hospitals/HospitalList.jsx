import React from 'react';
import Table from '../../../components/common/Table';
import { Building2, Plus, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HospitalList = () => {
  const navigate = useNavigate();

  const hospitalsColumns = [
    { header: 'Hospital Name', accessor: 'name' },
    { header: 'Location', accessor: 'location' },
    { header: 'Region', accessor: 'region' },
    { header: 'Group', accessor: 'group' },
    { header: 'Status', render: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
        {row.status}
      </span>
    ) },
    { header: 'Actions', render: () => (
      <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">Manage</button>
    ) }
  ];

  const hospitalsData = [
    { name: 'City General Hospital', location: 'Downtown', region: 'North Region', group: 'City Health Group', status: 'Active' },
    { name: 'Valley Medical Center', location: 'Westside', region: 'South Region', group: 'Valley Care Group', status: 'Active' },
    { name: 'Sunrise Clinic', location: 'Eastside', region: 'East Region', group: 'None', status: 'Pending' },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col h-full min-h-[calc(100vh-8rem)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Hospitals Management
          </h1>
          <p className="text-slate-500 mt-1">Manage all registered hospitals and healthcare facilities.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm font-medium text-sm">
            <Filter size={16} />
            Filters
          </button>
          <button 
            onClick={() => navigate('/hospital-owner/hospitals/create')}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all shadow-md font-medium text-sm"
          >
            <Plus size={16} />
            Add Hospital
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-t-2xl border-b border-slate-100 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search hospitals..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
          />
        </div>
      </div>

      <div className="flex-1">
        <Table columns={hospitalsColumns} data={hospitalsData} className="rounded-t-none border-t-0" />
      </div>
    </div>
  );
};

export default HospitalList;
