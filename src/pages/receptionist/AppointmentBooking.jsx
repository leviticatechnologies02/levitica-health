import React, { useState } from "react";
const AppointmentBooking = () => {
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
    "General Medicine": ["Dr. Ravi Kumar", "Dr. Suresh"],
    Cardiology: ["Dr. Prasad", "Dr. Anil"],
    Orthopedics: ["Dr. Mahesh", "Dr. Kumar"],
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

    const appointmentId = "APT-" + Math.floor(Math.random() * 10000);

    setMessage(`Appointment Confirmed. ID: ${appointmentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          Appointment Booking
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Patient Name */}
            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Patient Name
              </label>
              <input
                type="text"
                name="patientName"
                value={appointment.patientName}
                onChange={handleChange}
                placeholder="Enter patient name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* UHID */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                UHID
              </label>
              <input
                type="text"
                name="uhid"
                value={appointment.uhid}
                onChange={handleChange}
                placeholder="Enter UHID"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Department */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Department
              </label>
              <select
                name="department"
                value={appointment.department}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select Department</option>
                <option>General Medicine</option>
                <option>Cardiology</option>
                <option>Orthopedics</option>
              </select>
            </div>

            {/* Doctor */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Doctor
              </label>
              <select
                name="doctor"
                value={appointment.doctor}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select Doctor</option>

                {appointment.department &&
                  doctors[appointment.department].map((doc) => (
                    <option key={doc}>{doc}</option>
                  ))}
              </select>
            </div>

            {/* Appointment Date */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Appointment Date
              </label>
              <input
                type="date"
                name="date"
                value={appointment.date}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Time Slot */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Time Slot
              </label>
              <select
                name="time"
                value={appointment.time}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select Time</option>

                {timeSlots.map((time) => (
                  <option key={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="rounded-lg bg-[#f95e09] px-8 py-3 font-semibold text-white transition hover:bg-[#e45508]"
            >
              Confirm Appointment
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-8 rounded-lg border border-green-200 bg-green-100 p-4 text-green-700">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;