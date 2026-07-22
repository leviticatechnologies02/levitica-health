import React from 'react';
import { ClipboardList, Check, Zap } from 'lucide-react';

const Subscriptions = () => {
  const plans = [
    { name: 'Basic', price: '$99', period: '/month', features: ['Up to 2 Hospitals', 'Basic Reporting', 'Email Support'], active: false },
    { name: 'Professional', price: '$299', period: '/month', features: ['Up to 10 Hospitals', 'Advanced Analytics', 'Priority Support', 'Custom Regions'], active: true, recommended: true },
    { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited Hospitals', 'Full API Access', 'Dedicated Account Manager', 'Custom Integration'], active: false }
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col h-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          Subscription Plans
        </h1>
        <p className="text-slate-500 mt-1">Manage your current subscription and view available plans.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full mt-4">
        {plans.map((plan, idx) => (
          <div key={idx} className={`relative flex flex-col bg-white rounded-3xl p-8 border-2 transition-all ${plan.recommended ? 'border-primary-500 shadow-xl scale-105' : 'border-slate-100 shadow-sm hover:border-primary-200'}`}>
            {plan.recommended && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 shadow-md">
                <Zap size={14} /> Most Popular
              </div>
            )}
            
            <h3 className="text-xl font-bold text-slate-800 mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
              <span className="text-slate-500 font-medium">{plan.period}</span>
            </div>
            
            <div className="flex-1 space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-emerald-100 text-emerald-600 rounded-full p-0.5">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="text-slate-600 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.active ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : plan.recommended ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg' : 'bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50'}`}>
              {plan.active ? 'Current Plan' : 'Upgrade Plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
