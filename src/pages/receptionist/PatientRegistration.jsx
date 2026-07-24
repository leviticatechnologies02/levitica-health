import React, { useState } from "react";
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  User,
  Phone,
  Mail,
  MapPin,
 Droplets,
  Calendar,
  Users,
  HeartPulse,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const InputField = ({
  label,
  name,
  type = "text",
  icon: Icon,
  placeholder,
  value,
  onChange,
  className = "",
}) => (
  <div className={className}>
    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
      {label}
      <span className="text-red-500">*</span>
    </label>

    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
        <Icon size={18} />
      </div>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition-all duration-200 focus:border-[#f95e09] focus:bg-white focus:ring-4 focus:ring-orange-100"
      />
    </div>
  </div>
);

const PatientRegistration = ({
  returnPath = "/receptionist/dashboard",
}) => {
  const navigate = useNavigate();

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    bloodGroup: "",
  });

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSaving(true);

    setTimeout(() => {
      console.log(patient);

      setIsSaving(false);
      setShowSuccess(true);

      setTimeout(() => {
        alert("Patient Registered Successfully");
      }, 800);
    }, 1200);
  };

  return (<div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto pb-12">

  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
    <div className="flex items-center gap-4">

      <button
        type="button"
        onClick={() => navigate(returnPath)}
        className="p-2.5 text-slate-500 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-0.5 transition-transform"
        />
      </button>

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Patient Registration
        </h1>

        <p className="text-slate-500 text-sm mt-1">
          Register a new patient into the hospital management system.
        </p>
      </div>
    </div>
  </div>

  {/* Main Card */}
  <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">

    {/* Gradient Banner */}
    <div className="h-32 bg-gradient-to-r from-secondary-600 to-secondary-400 relative overflow-hidden">

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')",
        }}
      ></div>

      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

      <div className="absolute -top-16 -left-16 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>

    </div>

    <form
      onSubmit={handleSubmit}
      className="px-6 sm:px-10 pb-10 pt-4 relative"
    >

      {/* Floating Icon */}
      <div className="w-24 h-24 bg-white rounded-2xl shadow-md border-4 border-white flex items-center justify-center -mt-16 mb-8 relative z-10 mx-auto sm:mx-0">

        <div className="w-full h-full bg-orange-50 rounded-xl flex items-center justify-center text-[#f95e09]">

          <HeartPulse size={40} strokeWidth={1.5} />

        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Side */}
        <div className="lg:col-span-2 space-y-8">

          {/* Patient Details */}
          <div>

            <h3 className="text-lg font-bold text-slate-900 mb-5 pb-2 border-b border-slate-100">
              Patient Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <InputField
                label="Patient Name"
                name="name"
                icon={User}
                placeholder="Enter patient name"
                value={patient.name}
                onChange={handleChange}
              />

              <InputField
                label="Age"
                name="age"
                type="number"
                icon={Calendar}
                placeholder="Enter age"
                value={patient.age}
                onChange={handleChange}
              />

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Gender
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">

                  <div className="absolute left-3.5 top-3 text-slate-400">
                    <Users size={18} />
                  </div>

                  <select
                    name="gender"
                    value={patient.gender}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-[#f95e09] focus:ring-4 focus:ring-orange-100"
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>

                </div>

              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Blood Group
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">

                  <div className="absolute left-3.5 top-3 text-slate-400">
                    <Droplets size={18} />
                  </div>

                  <select
                    name="bloodGroup"
                    value={patient.bloodGroup}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-[#f95e09] focus:ring-4 focus:ring-orange-100"
                  >
                    <option value="">Select Blood Group</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>

                </div>

              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-5 pb-2 border-b border-slate-100">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <InputField
                label="Mobile Number"
                name="mobile"
                icon={Phone}
                placeholder="Enter mobile number"
                value={patient.mobile}
                onChange={handleChange}
              />

              <InputField
                label="Email Address"
                name="email"
                type="email"
                icon={Mail}
                placeholder="Enter email address"
                value={patient.email}
                onChange={handleChange}
              />

              <div className="sm:col-span-2">

                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Complete Address
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">

                  <div className="absolute top-3 left-3.5 text-slate-400">
                    <MapPin size={18} />
                  </div>

                  <textarea
                    rows={4}
                    name="address"
                    value={patient.address}
                    onChange={handleChange}
                    placeholder="Enter complete address..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm resize-none outline-none transition-all duration-200 focus:border-[#f95e09] focus:bg-white focus:ring-4 focus:ring-orange-100"
                  ></textarea>

                </div>

              </div>

            </div>
          </div>

          {/* Additional Information */}
          <div>

            <h3 className="text-lg font-bold text-slate-900 mb-5 pb-2 border-b border-slate-100">
              Additional Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <InputField
                label="Emergency Contact"
                name="emergencyContact"
                icon={Phone}
                placeholder="Emergency contact number"
                value={patient.emergencyContact || ""}
                onChange={handleChange}
              />

              <InputField
                label="Occupation"
                name="occupation"
                icon={FileText}
                placeholder="Occupation"
                value={patient.occupation || ""}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="lg:col-span-1">

          <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 sticky top-28">

            <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-5">

              <div className="w-8 h-8 rounded-full bg-orange-100 text-[#f95e09] flex items-center justify-center">
                <FileText size={16} />
              </div>

              Registration Guidelines

            </h4>

            <ul className="space-y-4 text-sm text-slate-600">

              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f95e09] mt-2"></span>
                Verify patient identity before registration.
              </li>

              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f95e09] mt-2"></span>
                Ensure the mobile number is active.
              </li>

              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f95e09] mt-2"></span>
                Check blood group carefully before saving.
              </li>

              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f95e09] mt-2"></span>
                Review all entered information before submission.
              </li>

            </ul>

          </div>

        </div>

      </div>
            {/* Footer */}
      <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">

        <p className="text-sm text-slate-500 font-medium">
          Fields marked with
          <span className="text-red-500 font-bold"> *</span> are required.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

          <button
            type="button"
            onClick={() => navigate(returnPath)}
            className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaving || showSuccess}
            className={`flex items-center justify-center gap-2 px-8 py-2.5 rounded-xl font-bold text-white transition-all duration-300
              ${
                showSuccess
                  ? "bg-green-500"
                  : "bg-[#f95e09] hover:bg-[#e45508] hover:shadow-lg hover:shadow-orange-200"
              }`}
          >
            {showSuccess ? (
              <>
                <CheckCircle2 size={18} />
                Registered Successfully!
              </>
            ) : isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Registering...
              </>
            ) : (
              <>
                <Save size={18} />
                Register Patient
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

export default PatientRegistration;