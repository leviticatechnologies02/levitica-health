import React from 'react';
import { Save, Settings as SettingsIcon, Bell, Shield, MapPin, Building2, Globe } from 'lucide-react';
import { Formik, Form, Field } from 'formik';

const Settings = () => {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Group Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Configure global preferences and policies for your entire group.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <Formik
          initialValues={{
            groupName: 'North America Group (HQ)',
            groupCode: 'GRP-NA-01',
            timezone: 'America/New_York',
            contactEmail: 'group.support@levitica.com',
            enableNotifications: true,
            strictDataCompliance: true,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert('Settings successfully updated!');
              setSubmitting(false);
            }, 500);
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div className="p-6 md:p-8 space-y-8">

                <section>
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <h2 className="text-lg font-bold text-slate-800">General Information</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Group Name</label>
                      <Field name="groupName" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Group Code (Read-Only)</label>
                      <Field name="groupCode" disabled className="w-full px-3 py-2 bg-slate-100 text-slate-500 border border-slate-200 rounded-lg text-sm cursor-not-allowed" />
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                    <Globe className="w-5 h-5 text-primary-500" />
                    <h2 className="text-lg font-bold text-slate-800">Localization</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">System Timezone</label>
                      <Field as="select" name="timezone" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm">
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      </Field>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Support Contact Email</label>
                      <Field type="email" name="contactEmail" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm" />
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                    <Shield className="w-5 h-5 text-primary-500" />
                    <h2 className="text-lg font-bold text-slate-800">Security & Preferences</h2>
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <Field type="checkbox" name="enableNotifications" className="mt-1 w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500" />
                      <div>
                        <span className="block text-sm font-medium text-slate-800 group-hover:text-primary-600 transition-colors">Enable Global Notifications</span>
                        <span className="block text-xs text-slate-500">Allow group-wide broadcast notifications to be sent to branch admins.</span>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <Field type="checkbox" name="strictDataCompliance" className="mt-1 w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500" />
                      <div>
                        <span className="block text-sm font-medium text-slate-800 group-hover:text-primary-600 transition-colors">Enforce Strict Data Compliance (HIPAA)</span>
                        <span className="block text-xs text-slate-500">Requires all branches to undergo secondary verification for data exports.</span>
                      </div>
                    </label>
                  </div>
                </section>

              </div>

              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-medium text-sm rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-500/20 transition-all shadow-sm disabled:opacity-70">
                  <Save className="w-4 h-4" />
                  Save Configuration
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Settings;
