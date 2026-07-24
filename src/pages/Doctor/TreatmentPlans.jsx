import React, { useState } from 'react';
import { Search, Filter, Plus, Calendar, Activity, CheckCircle2, Circle, AlertCircle, ChevronRight } from 'lucide-react';

const TreatmentPlans = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Treatment Plans</h1>
          <p className="text-slate-500 mt-1">Manage active care plans and track patient progress.</p>
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
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-sm shadow-primary-500/20 flex items-center gap-2">
            <Plus size={18} />
            New Plan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)] min-h-[500px]">
        {/* Left Side: Active Plans List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h2 className="font-bold text-slate-900">Active Plans (3)</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <div className="p-4 rounded-xl border border-primary-200 bg-primary-50 cursor-pointer">
              <h4 className="font-bold text-primary-900">Robert Wilson</h4>
              <p className="text-sm text-primary-700">Type 2 Diabetes Management</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs font-bold text-primary-600 bg-white px-2 py-1 rounded-md shadow-sm">Week 4 of 12</span>
                <span className="text-xs font-medium text-primary-600">60% Complete</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer transition-all">
              <h4 className="font-bold text-slate-900">Sarah Jenkins</h4>
              <p className="text-sm text-slate-500">Post-Operative Recovery</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">Week 2 of 6</span>
                <span className="text-xs font-medium text-slate-500">30% Complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Plan Timeline Viewer */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-slate-900">Type 2 Diabetes Management</h2>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
              </div>
              <p className="text-sm font-medium text-slate-600">Patient: <span className="font-bold text-primary-600">Robert Wilson</span></p>
            </div>
            <button className="px-4 py-2 border border-slate-200 text-slate-700 font-bold text-sm rounded-xl hover:bg-white shadow-sm transition-colors flex items-center gap-2">
              Edit Plan
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 relative">
            {/* Timeline Line */}
            <div className="absolute left-[39px] top-8 bottom-8 w-px bg-slate-200"></div>

            <div className="space-y-8 relative">
              {/* Phase 1: Completed */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 z-10 shadow-md shadow-emerald-500/20">
                  <CheckCircle2 size={16} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">Phase 1: Initial Assessment & Lifestyle</h4>
                  <p className="text-xs text-slate-500 mb-3">Completed on Oct 12, 2023</p>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                    <p className="text-sm text-slate-600 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Prescribe Metformin 500mg.</p>
                    <p className="text-sm text-slate-600 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Dietary consultation scheduled.</p>
                  </div>
                </div>
              </div>

              {/* Phase 2: Active */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center shrink-0 z-10 shadow-md shadow-primary-500/20 ring-4 ring-primary-50">
                  <Activity size={16} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary-900">Phase 2: Monitoring & Medication Adjustments</h4>
                  <p className="text-xs text-primary-600 font-bold mb-3">Current Phase (Weeks 3-6)</p>
                  <div className="p-4 bg-primary-50 rounded-xl border border-primary-100 space-y-3">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium text-primary-900 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-amber-500" /> Review 30-day HbA1c Lab Results.</p>
                      <button className="text-xs font-bold bg-white text-primary-700 border border-primary-200 px-3 py-1.5 rounded-lg shadow-sm hover:bg-primary-50">Pending Review</button>
                    </div>
                    <div className="flex items-start justify-between">
                      <p className="text-sm text-primary-800 flex items-center gap-2"><Circle className="w-4 h-4 text-primary-300" /> Weekly check-in appointment.</p>
                      <button className="text-xs font-bold bg-white text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm hover:bg-slate-50">Schedule</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 3: Upcoming */}
              <div className="flex gap-4 opacity-50">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-300 text-slate-400 flex items-center justify-center shrink-0 z-10">
                  <Calendar size={16} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-700">Phase 3: Long-term Maintenance</h4>
                  <p className="text-xs text-slate-500 mb-3">Scheduled for Dec 2023</p>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                    <p className="text-sm text-slate-600 italic">Objectives will be unlocked upon Phase 2 completion.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlans;
