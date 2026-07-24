import React, { useState } from 'react';
import { Search, Filter, Plus, Printer, RefreshCw, AlertCircle } from 'lucide-react';

const Prescriptions = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const prescriptions = [
    { id: 'RX-5021', patient: 'Sarah Jenkins', medication: 'Lisinopril 10mg', date: '12 Oct 2023', status: 'Active', refills: 2 },
    { id: 'RX-5022', patient: 'Michael Chang', medication: 'Metformin 500mg', date: '05 Nov 2023', status: 'Active', refills: 0 },
    { id: 'RX-5023', patient: 'Emily Davis', medication: 'Amoxicillin 250mg', date: '10 Nov 2023', status: 'Completed', refills: 0 },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Prescription Management</h1>
          <p className="text-slate-500 mt-1">Manage active prescriptions and authorize refills.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search medications..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm w-64"
            />
          </div>
          <button className="p-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter size={18} />
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-sm shadow-primary-500/20 flex items-center gap-2">
            <Plus size={18} />
            New e-Rx
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-amber-50/50 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-amber-900">1 Refill Request Pending</h3>
            <p className="text-xs text-amber-700 mt-1">Michael Chang requested a refill for Metformin 500mg. Authorization required.</p>
          </div>
          <button className="ml-auto px-4 py-1.5 bg-white border border-amber-200 text-amber-700 text-xs font-bold rounded-lg shadow-sm hover:bg-amber-50">
            Review Request
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-sm">
                <th className="py-4 px-6 font-semibold text-slate-600">Rx ID</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Patient</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Medication</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Prescribed On</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Refills Left</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Status</th>
                <th className="py-4 px-6 font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {prescriptions.map((rx) => (
                <tr key={rx.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 text-slate-500 font-medium">{rx.id}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{rx.patient}</td>
                  <td className="py-4 px-6 font-medium text-slate-700">{rx.medication}</td>
                  <td className="py-4 px-6 text-slate-600">{rx.date}</td>
                  <td className="py-4 px-6">
                    <span className={`font-bold ${rx.refills === 0 && rx.status === 'Active' ? 'text-rose-500' : 'text-slate-600'}`}>
                      {rx.refills}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      rx.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {rx.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button title="Print" className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center justify-center">
                      <Printer className="w-4 h-4" />
                    </button>
                    {rx.status === 'Active' && (
                      <button title="Refill" className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors inline-flex items-center justify-center">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
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

export default Prescriptions;
