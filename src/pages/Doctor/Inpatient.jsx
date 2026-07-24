import React, { useState } from 'react';
import { Search, Filter, BedDouble, Stethoscope, Activity, ClipboardList, Bed } from 'lucide-react';

const Inpatient = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const admittedPatients = [
    { id: '1', patient: 'Sarah Jenkins', ward: 'Cardiology (3A)', room: '302', bed: 'A', status: 'Stable', admitDate: '2 Days Ago' },
    { id: '2', patient: 'Michael Chang', ward: 'General (2B)', room: '210', bed: 'B', status: 'Critical', admitDate: 'Today' },
    { id: '3', patient: 'Emily Davis', ward: 'Maternity (4C)', room: '405', bed: 'A', status: 'Discharge Ready', admitDate: '3 Days Ago' },
    { id: '4', patient: 'David Smith', ward: 'General (2B)', room: '212', bed: 'A', status: 'Stable', admitDate: 'Yesterday' },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Inpatient Rounds</h1>
          <p className="text-slate-500 mt-1">Manage admitted patients and conduct ward rounds.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by patient or room..." 
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {admittedPatients.map((patient) => (
          <div key={patient.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group">
            {/* Status indicator bar at top */}
            <div className={`absolute top-0 left-0 w-full h-1 ${
              patient.status === 'Critical' ? 'bg-rose-500' :
              patient.status === 'Discharge Ready' ? 'bg-emerald-500' :
              'bg-primary-500'
            }`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  patient.status === 'Critical' ? 'bg-rose-50 text-rose-600' :
                  patient.status === 'Discharge Ready' ? 'bg-emerald-50 text-emerald-600' :
                  'bg-primary-50 text-primary-600'
                }`}>
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{patient.patient}</h4>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Admitted {patient.admitDate}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Location</span>
                <span className="text-sm font-medium text-slate-900">{patient.ward}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Room / Bed</span>
                <span className="text-sm font-bold text-slate-900">{patient.room} - {patient.bed}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-slate-500">Status</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                  patient.status === 'Critical' ? 'bg-rose-100 text-rose-700' :
                  patient.status === 'Discharge Ready' ? 'bg-emerald-100 text-emerald-700' :
                  'bg-primary-50 text-primary-700'
                }`}>
                  {patient.status}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-white border border-slate-200 text-slate-700 text-xs font-bold py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                <Activity size={14} /> Vitals
              </button>
              <button className="flex-1 bg-primary-50 text-primary-700 text-xs font-bold py-2 rounded-lg hover:bg-primary-100 transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                <ClipboardList size={14} /> Notes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inpatient;
