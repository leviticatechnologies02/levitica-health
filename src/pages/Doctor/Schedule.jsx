import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';

const Schedule = () => {
  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Schedule Management</h1>
          <p className="text-slate-500 mt-1">Manage your availability and upcoming shifts.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1">
            <button className="p-1 hover:bg-slate-50 rounded text-slate-600"><ChevronLeft size={20} /></button>
            <span className="px-4 font-bold text-sm text-slate-700">Today, Nov 12</span>
            <button className="p-1 hover:bg-slate-50 rounded text-slate-600"><ChevronRight size={20} /></button>
          </div>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center gap-2 shadow-sm shadow-primary-500/20">
            <Plus size={18} /> Add Block
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 flex items-center gap-2"><CalendarIcon className="w-5 h-5 text-primary-500"/> Daily View</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {timeSlots.map((time, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-20 text-right text-xs font-bold text-slate-400 mt-2">{time}</div>
                <div className="flex-1 relative border-t border-slate-100 pt-2 pb-6">
                  {idx === 1 && (
                    <div className="absolute top-2 left-0 right-4 bg-primary-50 border border-primary-200 rounded-lg p-3">
                      <p className="text-sm font-bold text-primary-900">Morning Consultations</p>
                      <p className="text-xs text-primary-700 flex items-center gap-1 mt-1"><Clock size={12}/> 09:00 AM - 12:00 PM</p>
                    </div>
                  )}
                  {idx === 5 && (
                    <div className="absolute top-2 left-0 right-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-sm font-bold text-amber-900">Ward Rounds (Inpatient)</p>
                      <p className="text-xs text-amber-700 flex items-center gap-1 mt-1"><Clock size={12}/> 01:00 PM - 03:00 PM</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
