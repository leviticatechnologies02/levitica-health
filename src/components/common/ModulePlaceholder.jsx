import React from 'react';
import { Info } from 'lucide-react';

const ModulePlaceholder = ({ title, icon: Icon, description, usefulness }) => {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 shadow-sm border border-primary-100">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
          <p className="text-slate-500 text-sm mt-1">{description}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative group">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
        
        <div className="p-8 relative z-10 flex flex-col items-center justify-center min-h-[300px] text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-slate-100 group-hover:scale-105 transition-transform duration-500">
            <Icon className="w-10 h-10 text-slate-400 group-hover:text-primary-500 transition-colors duration-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">Module Under Construction</h3>
          <p className="text-slate-500 max-w-md mx-auto leading-relaxed text-sm">
            The frontend UI for the <strong>{title}</strong> module is currently being built. This page will feature full CRUD operations, data tables, and advanced filtering.
          </p>
        </div>
        
        <div className="bg-blue-50/50 border-t border-blue-100 p-6 flex gap-4 items-start">
          <div className="shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Why is this useful for our Hospital?</h4>
            <p className="text-sm text-blue-800/80 leading-relaxed">
              {usefulness}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulePlaceholder;
