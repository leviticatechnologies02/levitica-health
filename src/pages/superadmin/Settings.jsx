import React, { useState } from 'react';
import { Shield, Bell, Save, Lock, Eye, EyeOff, ShieldCheck, CheckCircle2, Globe, Server, AlertTriangle } from 'lucide-react';

const Settings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [platformData, setPlatformData] = useState({
    name: 'Levitica Health',
    supportEmail: 'support@leviticahealth.com',
    currency: 'INR (₹)',
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 mx-auto pb-16 space-y-8">

      {/* Top Banner Area */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Platform Settings</h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Manage global platform configurations, security, and alerts.</p>
      </div>

      {/* 1. Global Platform Settings */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Globe className="text-primary-500" size={20} /> Global Configuration</h3>
          <p className="text-slate-500 text-sm mt-1">Core settings applied across the Levitica Health network.</p>
        </div>
        <form onSubmit={handleSave}>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Platform Name</label>
                <input
                  type="text"
                  value={platformData.name}
                  onChange={e => setPlatformData({ ...platformData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all bg-slate-50/50 hover:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Support Email</label>
                <input
                  type="email"
                  value={platformData.supportEmail}
                  onChange={e => setPlatformData({ ...platformData, supportEmail: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all bg-slate-50/50 hover:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Default Currency</label>
                <select
                  value={platformData.currency}
                  onChange={e => setPlatformData({ ...platformData, currency: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all bg-slate-50/50 hover:bg-white"
                >
                  <option value="INR (₹)">INR (₹)</option>
                  <option value="USD ($)">USD ($)</option>
                  <option value="EUR (€)">EUR (€)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4">
            {showSuccess && <span className="text-success-600 text-sm font-bold flex items-center gap-1.5 animate-in fade-in slide-in-from-right-4"><CheckCircle2 size={16} /> Saved Successfully</span>}
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-70 text-sm shadow-md"
            >
              {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save size={16} />}
              Save Configuration
            </button>
          </div>
        </form>
      </div>

      {/* 2. Security & Password */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Shield className="text-primary-500" size={20} /> Security Settings</h3>
            <p className="text-slate-500 text-sm mt-1">Manage your password and secure your admin account.</p>
          </div>
          <div className="flex items-center gap-3 bg-success-50 px-4 py-2 rounded-xl border border-success-100">
            <ShieldCheck className="text-success-500" size={20} />
            <span className="text-sm font-bold text-success-700">2FA is Recommended</span>
          </div>
        </div>
        <form onSubmit={handleSave}>
          <div className="p-8">
            <div className="max-w-xl space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your current password"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all bg-slate-50/50 hover:bg-white"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create new password"
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all bg-slate-50/50 hover:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all bg-slate-50/50 hover:bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4">
            {showSuccess && <span className="text-success-600 text-sm font-bold flex items-center gap-1.5 animate-in fade-in slide-in-from-right-4"><CheckCircle2 size={16} /> Updated Successfully</span>}
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-70 text-sm shadow-md"
            >
              {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save size={16} />}
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* 3. Notifications */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-10">
        <div className="px-8 py-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Bell className="text-primary-500" size={20} /> System Notification Preferences</h3>
          <p className="text-slate-500 text-sm mt-1">Control which system alerts and emails the admin team receives.</p>
        </div>

        <div className="p-8">
          <div className="space-y-2">
            {[
              { title: 'New Hospital Registrations', desc: 'Get notified instantly when a new hospital joins the platform.' },
              { title: 'Subscription & Billing Alerts', desc: 'Alerts for expiring plans, renewals, and failed payments.' },
              { title: 'System Errors & Outages', desc: 'Critical technical alerts that require immediate attention.' },
              { title: 'Weekly Analytics Reports', desc: 'Receive a summary of platform usage every Monday morning.' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start justify-between gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer mt-1 shrink-0">
                  <input type="checkbox" className="sr-only peer" defaultChecked={idx !== 3} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Settings;