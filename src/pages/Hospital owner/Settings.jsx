import React, { useState } from 'react';
import { Save, Building, Shield, BellRing, Key, Smartphone, Mail, AlertTriangle } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('organization');

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Settings
          </h1>
          <p className="text-slate-500 mt-1">Manage organizational configurations and preferences.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all shadow-sm font-medium text-sm">
          <Save size={16} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-3 space-y-1">
            <button 
              onClick={() => setActiveTab('organization')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${activeTab === 'organization' ? 'bg-primary-50 text-primary-700 font-bold border-primary-100' : 'text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900 border-transparent'}`}
            >
              <Building size={18} /> Organization
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${activeTab === 'security' ? 'bg-primary-50 text-primary-700 font-bold border-primary-100' : 'text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900 border-transparent'}`}
            >
              <Shield size={18} /> Security
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${activeTab === 'notifications' ? 'bg-primary-50 text-primary-700 font-bold border-primary-100' : 'text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900 border-transparent'}`}
            >
              <BellRing size={18} /> Notifications
            </button>
          </div>
        </div>

        <div className="md:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {activeTab === 'organization' && (
            <div className="animate-in fade-in duration-300">
              <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                <h2 className="font-bold text-slate-900">Organization Details</h2>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Organization Name</label>
                    <input type="text" defaultValue="Levitica Health" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Support Email</label>
                    <input type="email" defaultValue="support@levitica.com" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Headquarters Address</label>
                    <textarea className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 min-h-[100px]" defaultValue="123 Health Ave, Medical District, NY"></textarea>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-4">Regional Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Default Timezone</label>
                      <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                        <option>Eastern Time (ET)</option>
                        <option>Pacific Time (PT)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                      <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-in fade-in duration-300">
              <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                <h2 className="font-bold text-slate-900 flex items-center gap-2"><Key className="w-4 h-4 text-slate-500" /> Security & Access</h2>
              </div>
              <div className="p-6 space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Two-Factor Authentication (2FA)</h3>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50/50">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Smartphone size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">Authenticator App</p>
                        <p className="text-slate-500 text-sm mt-0.5">Protect your account with mobile verification.</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium text-sm hover:bg-slate-50">
                      Enable
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Password Policy</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">Require strong passwords</p>
                        <p className="text-slate-500 text-sm mt-0.5">Minimum 12 characters, numbers, and symbols.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">Password expiration</p>
                        <p className="text-slate-500 text-sm mt-0.5">Force password reset every 90 days.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="animate-in fade-in duration-300">
              <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                <h2 className="font-bold text-slate-900 flex items-center gap-2"><BellRing className="w-4 h-4 text-slate-500" /> Notification Preferences</h2>
              </div>
              <div className="p-6 space-y-6">
                
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><Mail size={16} className="text-slate-400" /> Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border border-slate-100 p-4 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">Weekly Reports</p>
                        <p className="text-slate-500 text-sm mt-0.5">Receive an overview of your organization's performance.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between border border-slate-100 p-4 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">Security Alerts</p>
                        <p className="text-slate-500 text-sm mt-0.5">Get notified about new logins and security risks.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2"><AlertTriangle size={16} className="text-slate-400" /> Critical Alerts</h3>
                  <div className="flex items-center justify-between border border-rose-100 bg-rose-50/30 p-4 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-900 text-sm">System Outages</p>
                      <p className="text-slate-500 text-sm mt-0.5">Always receive immediate notifications for major downtime.</p>
                    </div>
                    <span className="px-2.5 py-1 bg-slate-200 text-slate-600 rounded-md text-xs font-bold uppercase">Required</span>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
