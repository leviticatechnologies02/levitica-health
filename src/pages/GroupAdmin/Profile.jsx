import React from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, Briefcase, ShieldCheck } from 'lucide-react';
import { Formik, Form, Field } from 'formik';

const Profile = () => {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10 mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Profile</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your personal information and group administrative credentials.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-secondary-400 overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')" }}></div>
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>
          </div>
          <div className="absolute -bottom-12 left-8 z-10">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-secondary-100 flex items-center justify-center overflow-hidden shadow-md">
                <User className="w-12 h-12 text-primary-400" />
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-primary-600 hover:border-primary-200 shadow-sm transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-8">
          <Formik
            initialValues={{
              firstName: 'Sarah',
              lastName: 'Connor',
              email: 'sarah.c@levitica.com',
              phone: '+1 (555) 123-4567',
              role: 'Group Director',
              department: 'Operations',
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert('Profile details updated successfully!');
                setSubmitting(false);
              }, 500);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-primary-500" /> Personal Details
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                      <Field name="firstName" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                      <Field name="lastName" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Field name="email" type="email" className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Field name="phone" className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary-500" /> Administrative Role
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Official Title (Read-Only)</label>
                      <Field name="role" disabled className="w-full px-3 py-2 bg-slate-100 text-slate-500 border border-slate-200 rounded-lg text-sm cursor-not-allowed font-medium" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Department (Read-Only)</label>
                      <Field name="department" disabled className="w-full px-3 py-2 bg-slate-100 text-slate-500 border border-slate-200 rounded-lg text-sm cursor-not-allowed font-medium" />
                    </div>

                    <div className="p-4 bg-primary-50 border border-primary-100 rounded-lg mt-4">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-primary-800">Security Clearance Level: Group-Wide</p>
                          <p className="text-xs text-primary-600 mt-1">You have full read/write access to all branches and patient data within your designated group.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-slate-100">
                  <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white font-medium text-sm rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-500/20 transition-all shadow-sm disabled:opacity-70">
                    <Save className="w-4 h-4" />
                    Update Profile
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Profile;
