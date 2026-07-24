import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Clock, User, Calendar, Stethoscope, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppointmentTracking = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const waiting = [
    { id: '1', patient: 'Sarah Jenkins', time: '09:00 AM', type: 'Follow up', waitTime: '15 mins', urgency: 'routine' },
    { id: '2', patient: 'Emily Davis', time: '10:15 AM', type: 'Routine Check', waitTime: '5 mins', urgency: 'routine' },
  ];

  const inConsultation = [
    { id: '3', patient: 'Michael Chang', time: '09:30 AM', type: 'Consultation', duration: '22 mins', urgency: 'priority' },
  ];

  const completed = [
    { id: '4', patient: 'David Smith', time: '08:30 AM', type: 'Lab Review', duration: '15 mins', status: 'Prescribed' },
  ];

  const PatientCard = ({ data, stage }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer relative group" onClick={() => navigate('/doctor/patients')}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-slate-900">{data.patient}</h4>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreVertical size={16} />
        </button>
      </div>
      <div className="flex flex-col gap-2 mb-3">
        <span className="text-xs text-slate-500 flex items-center gap-1"><Clock size={12}/> {data.time}</span>
        <span className="text-xs text-slate-500 flex items-center gap-1"><User size={12}/> {data.type}</span>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
        {stage === 'waiting' && <span className="text-[11px] font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-md">Waiting: {data.waitTime}</span>}
        {stage === 'inConsultation' && <span className="text-[11px] font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-md">In Room: {data.duration}</span>}
        {stage === 'completed' && <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Done</span>}
        
        {stage !== 'completed' && (
          <button className="text-xs font-bold text-primary-600 hover:text-primary-700">Open Record</button>
        )}
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Live Appointment Tracking</h1>
          <p className="text-slate-500 mt-1">Manage your live clinic queue and ongoing consultations.</p>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-220px)] min-h-[500px]">
        
        {/* Waiting Room Column */}
        <div className="bg-slate-50/50 rounded-2xl border border-slate-100 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-white flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-500" />
              Waiting Room
            </h3>
            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">{waiting.length}</span>
          </div>
          <div className="p-3 overflow-y-auto flex-1 flex flex-col gap-3">
            {waiting.map(apt => <PatientCard key={apt.id} data={apt} stage="waiting" />)}
          </div>
        </div>

        {/* In Consultation Column */}
        <div className="bg-primary-50/30 rounded-2xl border border-primary-100 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-primary-100 bg-white flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-primary-500" />
              In Consultation
            </h3>
            <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-0.5 rounded-full">{inConsultation.length}</span>
          </div>
          <div className="p-3 overflow-y-auto flex-1 flex flex-col gap-3">
            {inConsultation.map(apt => <PatientCard key={apt.id} data={apt} stage="inConsultation" />)}
          </div>
        </div>

        {/* Completed Column */}
        <div className="bg-emerald-50/30 rounded-2xl border border-emerald-100 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-emerald-100 bg-white flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Completed Today
            </h3>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">{completed.length}</span>
          </div>
          <div className="p-3 overflow-y-auto flex-1 flex flex-col gap-3">
            {completed.map(apt => <PatientCard key={apt.id} data={apt} stage="completed" />)}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AppointmentTracking;
