import React from 'react';
import { Building2, Plus, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hospitals = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col h-full min-h-[calc(100vh-8rem)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Hospitals Management</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage all registered hospitals and healthcare facilities.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm font-medium text-sm">
            <Filter size={16} />
            Filters
          </button>
          <button 
            onClick={() => navigate('/superadmin/hospitals/add')}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 font-medium text-sm"
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
            placeholder="Search hospitals by name, location, or ID..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all cursor-not-allowed"
            disabled
          />
        </div>
      </div>

      <div className="flex-1 bg-white rounded-b-2xl shadow-sm border border-t-0 border-slate-100 flex flex-col items-center justify-center p-12 relative overflow-hidden group">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-50 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>

        <div className="relative z-10 text-center max-w-sm mx-auto">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-100 relative">
            <div className="absolute inset-0 bg-primary-100 rounded-full scale-0 group-hover:scale-110 opacity-0 group-hover:opacity-50 transition-all duration-500 ease-out"></div>
            <Building2 size={40} className="text-slate-300 relative z-10" strokeWidth={1.5} />
          </div>
          
          <h3 className="text-slate-800 text-xl font-bold mb-3 tracking-tight">No Hospitals Found</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-8">
            There are currently no hospitals registered in the system. Get started by adding your first healthcare facility.
          </p>
          
          <button 
            onClick={() => navigate('/superadmin/hospitals/add')}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 font-medium text-sm"
          >
            <Plus size={16} />
            Register First Hospital
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hospitals;