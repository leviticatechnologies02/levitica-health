import React, { useState } from 'react';
import { Search, Filter, Eye, FileText, Activity, Pill, History, Calendar } from 'lucide-react';
import Modal from '../../components/common/Modal';

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const patients = [
    { id: 'PT-101', name: 'Sarah Jenkins', age: 34, gender: 'Female', lastVisit: '12 Oct 2023', condition: 'Hypertension', status: 'Active' },
    { id: 'PT-102', name: 'Michael Chang', age: 45, gender: 'Male', lastVisit: '05 Nov 2023', condition: 'Type 2 Diabetes', status: 'Active' },
    { id: 'PT-103', name: 'Emily Davis', age: 28, gender: 'Female', lastVisit: 'Today', condition: 'Routine', status: 'In Clinic' },
  ];

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setIsViewOpen(true);
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Patient Records</h1>
          <p className="text-slate-500 mt-1">Manage and view comprehensive patient medical records.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search patients..." 
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

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-sm">
                <th className="py-4 px-6 font-semibold text-slate-600">Patient ID</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Name</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Demographics</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Condition</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Last Visit</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Status</th>
                <th className="py-4 px-6 font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 text-slate-500 font-medium">{patient.id}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{patient.name}</td>
                  <td className="py-4 px-6 text-slate-600">{patient.gender}, {patient.age} yrs</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                      {patient.condition}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{patient.lastVisit}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      patient.status === 'In Clinic' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button onClick={() => handleView(patient)} className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors inline-flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Unified Medical Record" icon={Activity} maxWidth="max-w-5xl">
        {selectedPatient && (
          <div className="space-y-6">
            {/* Context Header */}
            <div className="flex items-center justify-between bg-primary-50 p-5 rounded-xl border border-primary-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-primary-600 font-bold text-xl shadow-sm">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary-900">{selectedPatient.name}</h2>
                  <p className="text-primary-700 text-sm">{selectedPatient.gender} • {selectedPatient.age} yrs • ID: {selectedPatient.id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-primary-600 font-bold uppercase mb-1">Current Vitals</p>
                <div className="flex gap-4 text-sm font-medium text-primary-800">
                  <span>BP: 120/80</span>
                  <span>HR: 72</span>
                  <span>Temp: 98.6°F</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Pane: History */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <History className="w-4 h-4 text-slate-400" /> Past Medical History
                </h3>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-600 space-y-2">
                  <p>• Diagnosed with Hypertension (2020)</p>
                  <p>• Appendectomy (2015)</p>
                  <p>• No known drug allergies</p>
                </div>
              </div>

              {/* Center Pane: Current Visit */}
              <div className="md:col-span-2 space-y-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-400" /> Current Consultation Notes
                </h3>
                <textarea 
                  className="w-full h-40 p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
                  placeholder="Enter subjective, objective, assessment, and plan (SOAP) notes here..."
                ></textarea>
                
                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <button className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <Pill className="w-4 h-4" /> e-Prescribe
                  </button>
                  <button className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <Activity className="w-4 h-4" /> Order Labs
                  </button>
                  <button className="flex-1 py-2.5 bg-primary-600 text-white font-bold text-sm rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 shadow-sm shadow-primary-500/20">
                    <Calendar className="w-4 h-4" /> Treatment Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Patients;
