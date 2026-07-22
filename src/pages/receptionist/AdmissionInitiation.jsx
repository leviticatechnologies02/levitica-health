import React, { useState } from "react";
const AdmissionInitiation = () => {
  const [admission, setAdmission] = useState({
    uhid: "",
    patientName: "",
    doctor: "",
    department: "",
    bedType: "",
    reason: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setAdmission({
      ...admission,
      [e.target.name]: e.target.value,
    });
  };

  const submitAdmission = (e) => {
    e.preventDefault();

    const admissionId = "ADM-" + Math.floor(Math.random() * 10000);

    setMessage(`Admission Initiated Successfully. ID: ${admissionId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          Admission Initiation
        </h1>

        <form onSubmit={submitAdmission}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* UHID */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                UHID
              </label>
              <input
                type="text"
                name="uhid"
                value={admission.uhid}
                onChange={handleChange}
                placeholder="Enter UHID"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Patient Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Patient Name
              </label>
              <input
                type="text"
                name="patientName"
                value={admission.patientName}
                onChange={handleChange}
                placeholder="Enter patient name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Doctor */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Doctor Name
              </label>
              <input
                type="text"
                name="doctor"
                value={admission.doctor}
                onChange={handleChange}
                placeholder="Enter doctor name"
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
                value={admission.department}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select Department</option>
                <option>General Medicine</option>
                <option>Cardiology</option>
                <option>Orthopedics</option>
                <option>Neurology</option>
              </select>
            </div>

            {/* Bed Type */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Required Bed Type
              </label>
              <select
                name="bedType"
                value={admission.bedType}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select Bed Type</option>
                <option>General Ward</option>
                <option>Semi Private</option>
                <option>Private Room</option>
                <option>ICU</option>
              </select>
            </div>

            {/* Reason */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Admission Reason
              </label>
              <textarea
                name="reason"
                rows={4}
                value={admission.reason}
                onChange={handleChange}
                placeholder="Enter admission reason"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 rounded-lg bg-[#f95e09] px-8 py-3 font-semibold text-white transition hover:bg-[#e45508]"
          >
            Initiate Admission
          </button>
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

export default AdmissionInitiation;