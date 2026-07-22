import React, { useState } from "react";
const PatientRegistration = () => {
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
    console.log(patient);
    alert("Patient Registered Successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          Patient Registration
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Patient Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Patient Name
              </label>
              <input
                type="text"
                name="name"
                value={patient.name}
                onChange={handleChange}
                placeholder="Enter patient name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Age */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={patient.age}
                onChange={handleChange}
                placeholder="Enter age"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={patient.gender}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Mobile */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobile"
                value={patient.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={patient.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Blood Group */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={patient.bloodGroup}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>B+</option>
                <option>O+</option>
                <option>AB+</option>
              </select>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Address
              </label>
              <textarea
                name="address"
                value={patient.address}
                onChange={handleChange}
                rows={4}
                placeholder="Enter patient address"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="rounded-lg bg-[#f95e09] px-8 py-3 font-semibold text-white transition hover:bg-[#e45508]"
            >
              Register Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;