import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Building, Phone, Mail, MapPin, User, FileText, CheckCircle2, Hospital } from 'lucide-react';

const InputField = ({ label, name, type = "text", icon: Icon, placeholder, className = "", formik }) => (
    <div className={className}>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            {label} <span className="text-red-500">*</span>
        </label>
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                <Icon size={18} strokeWidth={2} />
            </div>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
                className={`block w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border transition-all duration-200 outline-none
          ${formik.touched[name] && formik.errors[name]
                        ? 'border-red-300 bg-red-50/30 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                        : 'border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 hover:border-slate-300'
                    }`}
            />
        </div>
        {formik.touched[name] && formik.errors[name] && (
            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1 font-medium">
                <span className="w-1 h-1 rounded-full bg-red-500 inline-block"></span>
                {formik.errors[name]}
            </p>
        )}
    </div>
);

const AddHospital = () => {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);

    const formik = useFormik({
        initialValues: {
            hospitalName: '',
            registrationNo: '',
            adminName: '',
            email: '',
            phone: '',
            address: '',
        },
        validationSchema: Yup.object({
            hospitalName: Yup.string().required('Required').min(3, 'Min 3 chars'),
            registrationNo: Yup.string().required('Required'),
            adminName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            phone: Yup.string().required('Required').matches(/^[0-9]{10}$/, '10-digit number required'),
            address: Yup.string().required('Required').min(10, 'Provide a detailed address'),
        }),
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                setSubmitting(false);
                setIsSuccess(true);
                setTimeout(() => navigate('/superadmin/hospitals'), 1500);
            }, 1000);
        },
    });

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/superadmin/hospitals')}
                        className="p-2.5 text-slate-500 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Add New Hospital</h1>
                        <p className="text-slate-500 text-sm mt-1">Onboard a new healthcare facility into the network.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden relative">
                <div className="h-32 bg-gradient-to-r from-secondary-600 to-secondary-400 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')" }}></div>
                    <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -top-16 -left-16 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>
                </div>

                <form onSubmit={formik.handleSubmit} className="px-6 sm:px-10 pb-10 pt-4 relative">

                    <div className="w-24 h-24 bg-white rounded-2xl shadow-md border-4 border-white flex items-center justify-center -mt-16 mb-8 relative z-10 mx-auto sm:mx-0">
                        <div className="w-full h-full bg-primary-50 rounded-xl flex items-center justify-center text-primary-500">
                            <Hospital size={40} strokeWidth={1.5} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        <div className="lg:col-span-2 space-y-8">

                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-5 pb-2 border-b border-slate-100">Facility Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <InputField formik={formik} label="Hospital Name" name="hospitalName" icon={Building} placeholder="Apollo Hospitals" />
                                    <InputField formik={formik} label="Registration No." name="registrationNo" icon={FileText} placeholder="REG-2024-991" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-5 pb-2 border-b border-slate-100">Contact Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <InputField formik={formik} label="Email Address" name="email" type="email" icon={Mail} placeholder="admin@hospital.com" />
                                    <InputField formik={formik} label="Phone Number" name="phone" icon={Phone} placeholder="10-digit number" />

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                            Complete Address <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute top-3 left-0 pl-3.5 flex items-start pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                                <MapPin size={18} strokeWidth={2} />
                                            </div>
                                            <textarea
                                                name="address"
                                                rows="3"
                                                placeholder="Enter the full facility address..."
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.address}
                                                className={`block w-full pl-11 pr-4 py-3 text-sm rounded-xl border transition-all duration-200 outline-none resize-none
                          ${formik.touched.address && formik.errors.address
                                                        ? 'border-red-300 bg-red-50/30 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                                                        : 'border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 hover:border-slate-300'
                                                    }`}
                                            ></textarea>
                                        </div>
                                        {formik.touched.address && formik.errors.address && (
                                            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1 font-medium">
                                                <span className="w-1 h-1 rounded-full bg-red-500 inline-block"></span>
                                                {formik.errors.address}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-5 pb-2 border-b border-slate-100">Administrator</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <InputField formik={formik} label="Primary Admin Name" name="adminName" icon={User} placeholder="Full Name" />
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 sticky top-28">
                                <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-5">
                                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                                        <FileText size={16} />
                                    </div>
                                    Quick Tips
                                </h4>
                                <ul className="space-y-4 text-sm text-slate-600">
                                    <li className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 shrink-0"></span>
                                        <p className="leading-relaxed">Ensure the <strong className="text-slate-800">Registration Number</strong> matches official government records exactly.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 shrink-0"></span>
                                        <p className="leading-relaxed">The <strong className="text-slate-800">Email Address</strong> provided will receive the initial login credentials.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 shrink-0"></span>
                                        <p className="leading-relaxed">Double-check the <strong className="text-slate-800">Phone Number</strong> as it will be used for two-factor authentication.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-slate-500 font-medium">
                            Fields marked with an asterisk (<span className="text-red-500 font-bold">*</span>) are required.
                        </p>
                        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                            <button
                                type="button"
                                onClick={() => navigate('/superadmin/hospitals')}
                                className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors text-sm w-full sm:w-auto text-center"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={formik.isSubmitting || isSuccess}
                                className={`flex items-center justify-center gap-2 px-8 py-2.5 rounded-xl font-bold transition-all text-sm w-full sm:w-auto
                  ${isSuccess
                                        ? 'bg-green-500 text-white'
                                        : 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/25'
                                    } disabled:opacity-80`}
                            >
                                {isSuccess ? (
                                    <>
                                        <CheckCircle2 size={18} />
                                        Saved Successfully!
                                    </>
                                ) : formik.isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Save Hospital
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddHospital;
