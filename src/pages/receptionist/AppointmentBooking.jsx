import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  User,
  Calendar,
  Clock,
  Stethoscope,
  Building2,
  FileText,
  ClipboardPlus,
} from "lucide-react";

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

const AppointmentBooking = ({
  returnPath = "/receptionist/dashboard",
}) => {
  const navigate = useNavigate();

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [appointment, setAppointment] = useState({
    patientName: "",
    uhid: "",
    department: "",
    doctor: "",
    date: "",
    time: "",
  });

  const [message, setMessage] = useState("");

  const doctors = {
    "General Medicine": [
      "Dr. Ravi Kumar",
      "Dr. Suresh",
    ],
    Cardiology: [
      "Dr. Prasad",
      "Dr. Anil",
    ],
    Orthopedics: [
      "Dr. Mahesh",
      "Dr. Kumar",
    ],
  };

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
  ];

  const handleChange = (e) => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSaving(true);

    setTimeout(() => {
      const appointmentId =
        "APT-" + Math.floor(Math.random() * 10000);

      setMessage(
        `Appointment Confirmed. ID: ${appointmentId}`
      );

      setIsSaving(false);
      setShowSuccess(true);
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
          Appointment Booking
        </h1>

        <p className="text-slate-500 text-sm mt-1">
          Schedule a consultation with the preferred doctor.
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

          <ClipboardPlus size={40} strokeWidth={1.5} />

        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Side */}
        <div className="lg:col-span-2 space-y-8">

          {/* Patient Information */}
          <div>

            <h3 className="text-lg font-bold text-slate-900 mb-5 pb-2 border-b border-slate-100">
              Patient Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <InputField
                label="Patient Name"
                name="patientName"
                icon={User}
                placeholder="Enter patient name"
                value={appointment.patientName}
                onChange={handleChange}
              />

              <InputField
                label="UHID"
                name="uhid"
                icon={FileText}
                placeholder="Enter UHID"
                value={appointment.uhid}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* Appointment Details */}
          <div>

            <h3 className="text-lg font-bold text-slate-900 mb-5 pb-2 border-b border-slate-100">
              Appointment Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Department */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Department
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">

                  <div className="absolute left-3.5 top-3 text-slate-400">
                    <Building2 size={18} />
                  </div>

                  <select
                    name="department"
                    value={appointment.department}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-[#f95e09] focus:ring-4 focus:ring-orange-100"
                  >
                    <option value="">Select Department</option>
                    <option>General Medicine</option>
                    <option>Cardiology</option>
                    <option>Orthopedics</option>
                  </select>

                </div>

              </div>

              {/* Doctor */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Doctor
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">

                  <div className="absolute left-3.5 top-3 text-slate-400">
                    <Stethoscope size={18} />
                  </div>

                  <select
                    name="doctor"
                    value={appointment.doctor}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-[#f95e09] focus:ring-4 focus:ring-orange-100"
                  >
                    <option value="">Select Doctor</option>

                    {appointment.department &&
                      doctors[appointment.department].map((doc) => (
                        <option key={doc} value={doc}>
                          {doc}
                        </option>
                      ))}
                  </select>

                </div>

              </div>
                            {/* Appointment Date */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Appointment Date
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">

                  <div className="absolute left-3.5 top-3 text-slate-400">
                    <Calendar size={18} />
                  </div>

                  <input
                    type="date"
                    name="date"
                    value={appointment.date}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition-all duration-200 focus:border-[#f95e09] focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />

                </div>

              </div>

              {/* Time Slot */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Time Slot
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">

                  <div className="absolute left-3.5 top-3 text-slate-400">
                    <Clock size={18} />
                  </div>

                  <select
                    name="time"
                    value={appointment.time}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition-all duration-200 focus:border-[#f95e09] focus:bg-white focus:ring-4 focus:ring-orange-100"
                  >
                    <option value="">Select Time Slot</option>

                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}

                  </select>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="lg:col-span-1">

          <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 sticky top-28">

            <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-5">

              <div className="w-8 h-8 rounded-full bg-orange-100 text-[#f95e09] flex items-center justify-center">
                <ClipboardPlus size={16} />
              </div>

              Appointment Guidelines

            </h4>

            <ul className="space-y-4 text-sm text-slate-600">

              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f95e09] mt-2"></span>
                Verify the patient's UHID before booking.
              </li>

              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f95e09] mt-2"></span>
                Select the correct department before choosing a doctor.
              </li>

              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f95e09] mt-2"></span>
                Choose an available date and time slot only.
              </li>

              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f95e09] mt-2"></span>
                Review all appointment details before confirming.
              </li>

              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f95e09] mt-2"></span>
                Inform the patient to arrive at least 15 minutes early.
              </li>

            </ul>

          </div>

        </div>

      </div>
            {/* Footer */}
      <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">

        <p className="text-sm text-slate-500 font-medium">
          Fields marked with
          <span className="text-red-500 font-bold"> *</span>
          {" "}are required.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

          <button
            type="button"
            onClick={() => navigate(returnPath)}
            className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 hover:text-slate-900 transition-all"
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
                Appointment Confirmed!
              </>
            ) : isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Booking...
              </>
            ) : (
              <>
                <Save size={18} />
                Confirm Appointment
              </>
            )}
          </button>

        </div>

      </div>

    </form>

    {/* Success Message */}
    {message && (
      <div className="mx-6 sm:mx-10 mb-8 mt-2 rounded-2xl border border-green-200 bg-green-50 px-6 py-4">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2
              size={22}
              className="text-green-600"
            />
          </div>

          <div>

            <h4 className="font-bold text-green-700">
              Appointment Booked Successfully
            </h4>

            <p className="text-sm text-green-600 mt-1">
              {message}
            </p>

          </div>

        </div>

      </div>
    )}

  </div>

</div>
  );
};

export default AppointmentBooking;