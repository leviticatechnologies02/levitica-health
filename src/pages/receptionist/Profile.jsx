import React, { useState } from 'react';
import { User, Save, Mail, Phone, CheckCircle2, Camera, LogOut } from 'lucide-react';

const Profile = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [profile, setProfile] = useState({
    firstName: 'System',
    lastName: '',
    email: 'System@hospital.com',
    phone: '9876543210',
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
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">My Profile</h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Manage your personal information and account details.</p>
      </div>

      {/* 1. Profile Overview Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">

        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="relative group cursor-pointer shrink-0">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center text-4xl font-bold uppercase shadow-xl border-4 border-white">
            {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
          </div>

          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
            <Camera className="text-white" size={24} />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <h2 className="text-2xl font-bold text-slate-900">
            {profile.firstName} {profile.lastName}
          </h2>

          <p className="text-primary-600 font-bold text-sm mt-1 tracking-wide uppercase">
            Receptionist
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-5 text-sm text-slate-600 font-medium">

            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <Mail size={16} className="text-slate-400" />
              {profile.email}
            </span>

            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <Phone size={16} className="text-slate-400" />
              {profile.phone}
            </span>

          </div>
        </div>

        <div className="z-10 w-full md:w-auto">
          <button className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors text-sm border border-red-100">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>
            {/* 2. Personal Information Form */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <User className="text-primary-500" size={20} />
            Personal Information
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            Update your personal details and contact information.
          </p>
        </div>

        <form onSubmit={handleSave}>
          <div className="p-8 space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile({ ...profile, firstName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all bg-slate-50/50 hover:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile({ ...profile, lastName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all bg-slate-50/50 hover:bg-white"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />

                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all bg-slate-50/50 hover:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />

                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all bg-slate-50/50 hover:bg-white"
                  />
                </div>
              </div>

            </div>
                      </div>

          <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4">

            {showSuccess && (
              <span className="text-success-600 text-sm font-bold flex items-center gap-1.5 animate-in fade-in slide-in-from-right-4">
                <CheckCircle2 size={16} />
                Saved Successfully
              </span>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-70 text-sm shadow-md"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Save size={16} />
              )}

              Save Profile
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;