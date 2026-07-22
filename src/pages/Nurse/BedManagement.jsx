import React, { useState } from 'react';
import { BedDouble, CheckCircle2, User, AlertCircle, Search } from 'lucide-react';
import StatCard from '../../components/common/StatCard';

const MOCK_BEDS = Array.from({ length: 24 }, (_, i) => {
  const isOccupied = i % 3 !== 0;
  return {
    id: `B-${(i + 1).toString().padStart(2, '0')}`,
    ward: i < 12 ? 'General Ward A' : 'General Ward B',
    status: isOccupied ? 'Occupied' : (i % 7 === 0 ? 'Maintenance' : 'Available'),
    patient: isOccupied ? `Patient ${['Smith', 'Johnson', 'Williams', 'Brown'][i % 4]}` : null,
    admissionDate: isOccupied ? new Date(Date.now() - Math.random() * 1000000000).toISOString().split('T')[0] : null,
  };
});

const BedManagement = () => {
  const [data] = useState(MOCK_BEDS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredData = data
    .filter(bed => filter === 'All' ? true : bed.status === filter)
    .filter(bed => 
      bed.id.toLowerCase().includes(search.toLowerCase()) || 
      (bed.patient && bed.patient.toLowerCase().includes(search.toLowerCase()))
    );

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Bed Management</h1>
        <p className="text-slate-500 text-sm mt-1">Overview of bed occupancy in your assigned wards.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Beds" value={data.length} icon={BedDouble} colorTheme="blue" />
        <StatCard title="Available" value={data.filter(d => d.status === 'Available').length} icon={CheckCircle2} colorTheme="green" />
        <StatCard title="Occupied" value={data.filter(d => d.status === 'Occupied').length} icon={User} colorTheme="purple" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search bed or patient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm"
            />
          </div>
          <div className="flex p-1 bg-slate-100 rounded-lg w-full sm:w-auto">
            {['All', 'Available', 'Occupied', 'Maintenance'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex-1 sm:flex-none ${filter === status ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredData.map(bed => (
              <div key={bed.id} className={`relative p-4 rounded-xl border ${bed.status === 'Available' ? 'bg-emerald-50 border-emerald-200' : bed.status === 'Occupied' ? 'bg-blue-50 border-blue-200' : 'bg-slate-100 border-slate-200'} transition-all hover:shadow-md`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-bold text-slate-800">{bed.id}</span>
                  {bed.status === 'Available' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {bed.status === 'Occupied' && <User className="w-4 h-4 text-blue-600" />}
                  {bed.status === 'Maintenance' && <AlertCircle className="w-4 h-4 text-slate-500" />}
                </div>
                {bed.status === 'Occupied' ? (
                  <div className="mt-3">
                    <p className="text-[11px] font-semibold text-blue-900 truncate">{bed.patient}</p>
                    <p className="text-[10px] text-blue-600 truncate mt-0.5">Since {bed.admissionDate}</p>
                  </div>
                ) : (
                  <div className="mt-3">
                    <p className={`text-[11px] font-semibold ${bed.status === 'Available' ? 'text-emerald-700' : 'text-slate-600'}`}>{bed.status}</p>
                  </div>
                )}
                <div className="absolute top-0 right-0 w-2 h-2 rounded-bl-lg rounded-tr-xl bg-white/50"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BedManagement;
