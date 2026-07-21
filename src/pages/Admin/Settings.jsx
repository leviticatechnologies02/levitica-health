import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Lock, Globe, Database, Save } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    hospitalName: 'Levitica Health',
    email: 'admin@levitica.com',
    phone: '+1 800-555-0199',
    currency: 'USD ($)',
    timeZone: 'UTC-5 (Eastern Time)',
    emailNotifications: true,
    smsAlerts: false,
    twoFactor: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      
      {/* DEV NOTE */}
      <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl mb-6">
        <h3 className="text-indigo-800 font-semibold mb-1">Module Note: Hospital Settings</h3>
        <p className="text-indigo-600 text-sm"><strong>Flow/Usefulness:</strong> Settings provide the flexibility needed to tailor the platform to your hospital's specific operational workflows. You can configure shift timings, API keys for external labs, SMS gateways for patient reminders, and RBAC rules.</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Configure global preferences and system integrations.</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm shadow-primary-600/20">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR TABS */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-1">
          {[
            { id: 'general', label: 'General', icon: SettingsIcon },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'security', label: 'Security', icon: Lock },
            { id: 'localization', label: 'Localization', icon: Globe },
            { id: 'database', label: 'Data & Backup', icon: Database },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-primary-600 shadow-sm border border-slate-100' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 transparent'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-primary-600' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* SETTINGS CONTENT */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:p-8">
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-lg font-bold text-slate-900 mb-6">General Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Hospital Name</label>
                  <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Contact Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Contact Phone</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'localization' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Localization & Region</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Default Currency</label>
                  <select name="currency" value={formData.currency} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>INR (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Time Zone</label>
                  <select name="timeZone" value={formData.timeZone} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all">
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC-8 (Pacific Time)</option>
                    <option>UTC+0 (London)</option>
                    <option>UTC+5:30 (India)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'notifications' || activeTab === 'security' || activeTab === 'database') && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-lg font-bold text-slate-900 mb-6 capitalize">{activeTab} Preferences</h2>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div>
                    <h4 className="font-semibold text-slate-900">Email Notifications</h4>
                    <p className="text-sm text-slate-500 mt-0.5">Receive daily summaries via email.</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full transition-colors ease-in-out duration-200 focus:outline-none" style={{ backgroundColor: formData.emailNotifications ? '#0ea5e9' : '#cbd5e1' }}>
                    <input type="checkbox" name="emailNotifications" checked={formData.emailNotifications} onChange={handleChange} className="opacity-0 w-0 h-0" />
                    <span className={`inline-block w-4 h-4 mt-1 ml-1 rounded-full bg-white transform transition ease-in-out duration-200 ${formData.emailNotifications ? 'translate-x-6' : 'translate-x-0'}`} />
                  </div>
                </label>
                
                <label className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div>
                    <h4 className="font-semibold text-slate-900">Two-Factor Authentication (2FA)</h4>
                    <p className="text-sm text-slate-500 mt-0.5">Require 2FA for all admin accounts.</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full transition-colors ease-in-out duration-200 focus:outline-none" style={{ backgroundColor: formData.twoFactor ? '#0ea5e9' : '#cbd5e1' }}>
                    <input type="checkbox" name="twoFactor" checked={formData.twoFactor} onChange={handleChange} className="opacity-0 w-0 h-0" />
                    <span className={`inline-block w-4 h-4 mt-1 ml-1 rounded-full bg-white transform transition ease-in-out duration-200 ${formData.twoFactor ? 'translate-x-6' : 'translate-x-0'}`} />
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
