import React, { useState } from 'react';
import { Pill, Search, CheckCircle2, AlertCircle, Plus, Filter, Clock } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import StatCard from '../../components/common/StatCard';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';

const MOCK_MEDS = Array.from({ length: 12 }, (_, i) => ({
  id: `MED-${1000 + i}`,
  patientId: `PAT-${1000 + i}`,
  patientName: `Patient ${['Smith', 'Johnson', 'Williams', 'Brown'][i % 4]}`,
  medication: ['Amoxicillin 500mg', 'Lisinopril 10mg', 'Ibuprofen 400mg', 'Metformin 500mg'][i % 4],
  route: ['Oral', 'Oral', 'IV', 'Oral'][i % 4],
  scheduledTime: `${9 + (i % 8)}:00 AM`,
  status: i % 3 === 0 ? 'Administered' : (i % 5 === 0 ? 'Missed' : 'Pending'),
}));

const Medications = () => {
  const [searchParams] = useSearchParams();
  const prefillPatientId = searchParams.get('patientId');
  const [data, setData] = useState(MOCK_MEDS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleAdminister = (id) => {
    setData(data.map(item => item.id === id ? { ...item, status: 'Administered' } : item));
  };

  const clearPatientFilter = () => {
    searchParams.delete('patientId');
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
    // A page reload isn't strictly necessary if we update state, but let's just trigger a re-render or navigate
    window.location.reload();
  };

  const filteredData = data
    .filter(item => prefillPatientId ? item.patientId === prefillPatientId : true)
    .filter(item => statusFilter === 'All' ? true : item.status === statusFilter)
    .filter(item => 
      item.patientName.toLowerCase().includes(search.toLowerCase()) || 
      item.patientId.toLowerCase().includes(search.toLowerCase()) || 
      item.medication.toLowerCase().includes(search.toLowerCase())
    );

  const columns = [
    { header: 'ID', accessor: 'id', render: (med) => <span className="font-medium text-slate-900">{med.id}</span> },
    { header: 'Patient', accessor: 'patientName', render: (med) => (
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-900">{med.patientName}</span>
        <span className="text-xs text-slate-500">{med.patientId}</span>
      </div>
    )},
    { header: 'Medication', accessor: 'medication', render: (med) => (
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-900">{med.medication}</span>
        <span className="text-xs text-slate-500">Route: {med.route}</span>
      </div>
    )},
    { header: 'Scheduled Time', accessor: 'scheduledTime', render: (med) => (
      <div className="flex items-center gap-1.5 text-slate-600">
        <Clock className="w-3.5 h-3.5" /> <span className="text-sm font-medium">{med.scheduledTime}</span>
      </div>
    )},
    { header: 'Status', accessor: 'status', render: (med) => (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium 
        ${med.status === 'Administered' ? 'bg-emerald-50 text-emerald-700' : 
          med.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
        {med.status}
      </span>
    )},
    { header: 'Actions', accessor: 'actions', render: (med) => (
      med.status === 'Pending' ? (
        <button 
          onClick={() => handleAdminister(med.id)} 
          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors text-xs font-medium"
        >
          <CheckCircle2 className="w-4 h-4" /> Give
        </button>
      ) : (
        <span className="text-xs text-slate-400 font-medium px-2">Completed</span>
      )
    )}
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Medication Administration</h1>
        <p className="text-slate-500 text-sm mt-1">Track and record patient medications.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Scheduled" value={filteredData.length} icon={Pill} colorTheme="blue" />
        <StatCard title="Administered" value={filteredData.filter(d => d.status === 'Administered').length} icon={CheckCircle2} colorTheme="green" />
        <StatCard title="Pending" value={filteredData.filter(d => d.status === 'Pending').length} icon={Clock} colorTheme="orange" />
      </div>

      {prefillPatientId && (
        <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-medium text-primary-900">Showing medications for Patient: <span className="font-bold">{prefillPatientId}</span></span>
          </div>
          <button onClick={clearPatientFilter} className="text-xs font-bold text-primary-700 bg-white border border-primary-200 px-3 py-1.5 rounded hover:bg-primary-50 transition-colors">
            Clear Filter
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search meds or patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm"
            />
          </div>
          <div className="flex p-1 bg-slate-100 rounded-lg w-full sm:w-auto">
            {['All', 'Pending', 'Administered', 'Missed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex-1 sm:flex-none ${statusFilter === status ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table columns={columns} data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default Medications;
