import React, { useState } from 'react';
import { Save, Building2, Phone, MapPin, Award, Upload } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProfileSchema = Yup.object().shape({
  hospitalName: Yup.string().required('Hospital Name is required'),
  tagline: Yup.string(),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  emergencyPhone: Yup.string().required('Emergency Hotline is required'),
  website: Yup.string().url('Must be a valid URL'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State/Region is required'),
  zipCode: Yup.string().required('ZIP code is required'),
  licenseNumber: Yup.string().required('License Number is required'),
  establishedYear: Yup.number().min(1800).max(new Date().getFullYear()),
  capacity: Yup.number().min(1, 'Capacity must be at least 1')
});

const Profile = () => {
  const [initialValues, setInitialValues] = useState({
    hospitalName: 'Levitica Health General',
    tagline: 'Caring for life, one patient at a time.',
    email: 'contact@leviticahealth.com',
    phone: '+1 (555) 123-4567',
    emergencyPhone: '+1 (555) 911-0000',
    website: 'https://www.leviticahealth.com',
    address: '123 Health Ave, Medical City',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    licenseNumber: 'MED-987654321',
    establishedYear: 1998,
    capacity: 500
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setInitialValues(values);
      setSubmitting(false);
      alert('Hospital Profile updated successfully!');
    }, 800);
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10 max-w-5xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 mt-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Hospital Profile</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your institution's core identity, contact details, and accreditations.</p>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={ProfileSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-6">
            
            {/* BRANDING SECTION */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                  <Building2 className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Basic Information</h2>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                {/* Logo Upload Placeholder */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center bg-slate-50 text-slate-400 group hover:border-primary-500 hover:bg-primary-50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mb-2 group-hover:text-primary-600 transition-colors" />
                    <span className="text-xs font-medium group-hover:text-primary-600">Upload Logo</span>
                  </div>
                  <p className="text-xs text-slate-400 text-center max-w-[130px]">Recommended size: 256x256px (PNG/JPG)</p>
                </div>

                <div className="flex-1 grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Hospital Name <span className="text-red-500">*</span></label>
                    <Field name="hospitalName" type="text" className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all ${errors.hospitalName && touched.hospitalName ? 'border-red-500' : 'border-slate-200'}`} />
                    <ErrorMessage name="hospitalName" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tagline or Motto</label>
                    <Field name="tagline" type="text" placeholder="e.g. Caring for life..." className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* CONTACT DETAILS SECTION */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Phone className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Contact Details</h2>
              </div>
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Primary Email <span className="text-red-500">*</span></label>
                  <Field name="email" type="email" className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all ${errors.email && touched.email ? 'border-red-500' : 'border-slate-200'}`} />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Website URL</label>
                  <Field name="website" type="text" placeholder="https://" className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all ${errors.website && touched.website ? 'border-red-500' : 'border-slate-200'}`} />
                  <ErrorMessage name="website" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Primary Phone <span className="text-red-500">*</span></label>
                  <Field name="phone" type="text" className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all ${errors.phone && touched.phone ? 'border-red-500' : 'border-slate-200'}`} />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Hotline <span className="text-red-500">*</span></label>
                  <Field name="emergencyPhone" type="text" className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all ${errors.emergencyPhone && touched.emergencyPhone ? 'border-red-500' : 'border-slate-200'}`} />
                  <ErrorMessage name="emergencyPhone" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>
            </div>

            {/* LOCATION SECTION */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Location Details</h2>
              </div>
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Street Address <span className="text-red-500">*</span></label>
                  <Field name="address" type="text" className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all ${errors.address && touched.address ? 'border-red-500' : 'border-slate-200'}`} />
                  <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City <span className="text-red-500">*</span></label>
                  <Field name="city" type="text" className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all ${errors.city && touched.city ? 'border-red-500' : 'border-slate-200'}`} />
                  <ErrorMessage name="city" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">State/Region <span className="text-red-500">*</span></label>
                  <Field name="state" type="text" className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all ${errors.state && touched.state ? 'border-red-500' : 'border-slate-200'}`} />
                  <ErrorMessage name="state" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ZIP Code <span className="text-red-500">*</span></label>
                  <Field name="zipCode" type="text" className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all ${errors.zipCode && touched.zipCode ? 'border-red-500' : 'border-slate-200'}`} />
                  <ErrorMessage name="zipCode" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>
            </div>

            {/* ACCREDITATION SECTION */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                  <Award className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Accreditation & Capacity</h2>
              </div>
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">License Number <span className="text-red-500">*</span></label>
                  <Field name="licenseNumber" type="text" className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all ${errors.licenseNumber && touched.licenseNumber ? 'border-red-500' : 'border-slate-200'}`} />
                  <ErrorMessage name="licenseNumber" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Established Year</label>
                  <Field name="establishedYear" type="number" className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all ${errors.establishedYear && touched.establishedYear ? 'border-red-500' : 'border-slate-200'}`} />
                  <ErrorMessage name="establishedYear" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Total Bed Capacity</label>
                  <Field name="capacity" type="number" className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all ${errors.capacity && touched.capacity ? 'border-red-500' : 'border-slate-200'}`} />
                  <ErrorMessage name="capacity" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-4 sticky bottom-6 z-10 pt-4">
              <button
                type="button"
                onClick={() => setInitialValues(initialValues)}
                className="px-6 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
              >
                Discard Changes
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-600/20 transition-all font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? 'Saving...' : 'Save Profile'}
              </button>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
