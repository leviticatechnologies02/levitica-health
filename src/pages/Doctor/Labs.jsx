import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, Eye, Check, Clock, FileText } from 'lucide-react';

const Labs = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const labResults = [
    { id: 'LAB-901', patient: 'Robert Wilson', test: 'HbA1c & Lipid Panel', date: 'Today, 09:30 AM', status: 'Unread', critical: true },
    { id: 'LAB-902', patient: 'Sarah Jenkins', test: 'Complete Blood Count (CBC)', date: 'Yesterday, 04:15 PM', status: 'Unread', critical: false },
    { id: 'LAB-903', patient: 'Michael Chang', test: 'Liver Function Test', date: '12 Nov 2023', status: 'Reviewed', critical: false },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10 h-full flex flex-col">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Lab Results Inbox</h1>
          <p className="text-slate-500 mt-1">Review incoming lab tests and diagnostics.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by patient or test..." 
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

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row h-[calc(100vh-220px)] min-h-[500px] overflow-hidden">
        {/* Left Side: Inbox List */}
        <div className="w-full md:w-1/3 border-r border-slate-100 flex flex-col bg-slate-50/30">
          <div className="p-4 border-b border-slate-100 flex gap-4 text-sm font-medium">
            <button className="text-primary-600 border-b-2 border-primary-600 pb-1">Unread (2)</button>
            <button className="text-slate-500 hover:text-slate-700 pb-1">Reviewed</button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {labResults.map(lab => (
              <div key={lab.id} className={`p-4 rounded-xl cursor-pointer transition-all ${
                lab.status === 'Unread' ? 'bg-white shadow-sm border border-slate-100' : 'bg-transparent border border-transparent hover:bg-slate-50'
              }`}>
                <div className="flex items-start justify-between mb-1">
                  <h4 className={`text-sm font-bold ${lab.status === 'Unread' ? 'text-slate-900' : 'text-slate-700'}`}>{lab.patient}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">{lab.date.split(',')[0]}</span>
                </div>
                <p className={`text-xs ${lab.critical ? 'text-rose-600 font-medium' : 'text-slate-500'}`}>{lab.test}</p>
                {lab.critical && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-rose-500 uppercase tracking-wider">
                    <AlertTriangle className="w-3 h-3" /> Critical Result
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Result Details Viewer */}
        <div className="flex-1 flex flex-col bg-slate-50/10">
          <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-white">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> CRITICAL
                </span>
                <span className="text-xs font-medium text-slate-500">ID: LAB-901</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Robert Wilson</h2>
              <p className="text-sm text-slate-600 mt-1">HbA1c & Lipid Panel • Collected Today, 08:00 AM</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Print
              </button>
              <button className="px-3 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 shadow-sm shadow-primary-500/20 flex items-center gap-2">
                <Check className="w-4 h-4" /> Mark as Reviewed
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-700">Hemoglobin A1c</div>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500">
                    <th className="p-4 font-medium">Test Name</th>
                    <th className="p-4 font-medium">Result</th>
                    <th className="p-4 font-medium">Reference Range</th>
                    <th className="p-4 font-medium">Flag</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-50">
                    <td className="p-4 text-slate-700">HbA1c</td>
                    <td className="p-4 font-bold text-rose-600">8.2 %</td>
                    <td className="p-4 text-slate-500">&lt; 5.7 %</td>
                    <td className="p-4"><span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded">HIGH</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 text-slate-700">Estimated Average Glucose</td>
                    <td className="p-4 font-bold text-rose-600">188 mg/dL</td>
                    <td className="p-4 text-slate-500">&lt; 117 mg/dL</td>
                    <td className="p-4"><span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded">HIGH</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">Doctor's Note / Interpretation</label>
              <textarea 
                className="w-full h-24 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none"
                placeholder="Type notes for the patient record here..."
              ></textarea>
              <button className="mt-3 px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-900 transition-colors">
                Save Note to Patient Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labs;
