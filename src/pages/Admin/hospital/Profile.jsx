import React, { useState } from 'react';
import { Save } from 'lucide-react';

const Profile = () => {
  const [formData, setFormData] = useState({
    hospitalName: 'Levitica Health General',
    email: 'contact@leviticahealth.com',
    phone: '+1 (555) 123-4567',
    address: '123 Health Ave, Medical City, HC 12345',
    licenseNumber: 'MED-987654321',
    capacity: '500 Beds'
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert('Hospital Profile updated successfully!');
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10 max-w-3xl">
      {/* DEV NOTE: To be removed later */}
      <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl mb-6">
        <h3 className="text-indigo-800 font-semibold mb-1">Module Note: Manage your hospital's core information, contact details, and branding.</h3>
        <p className="text-indigo-600 text-sm"><strong>Flow/Usefulness:</strong> Keeping the hospital profile updated ensures that patients see accurate contact numbers, operating hours, and official logos across all patient-facing portals and printed invoices. It acts as the digital identity of the institution.</p>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Hospital Profile</h1>
        <p className="text-slate-500 text-sm">Manage your hospital's core information and contact details.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Hospital Name</label>
              <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500" value={formData.hospitalName} onChange={e=>setFormData({...formData, hospitalName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">License Number</label>
              <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500" value={formData.licenseNumber} onChange={e=>setFormData({...formData, licenseNumber: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input required type="email" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
              <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500" value={formData.address} onChange={e=>setFormData({...formData, address: e.target.value})} />
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
