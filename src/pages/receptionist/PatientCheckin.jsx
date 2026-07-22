import React, { useState } from "react";
const PatientCheckIn = () => {
  const [search, setSearch] = useState("");
  const [patient, setPatient] = useState(null);

  const appointments = [
    {
      token: "T-001",
      uhid: "LEV1001",
      name: "Ramesh Kumar",
      doctor: "Dr Ravi Kumar",
      department: "General Medicine",
      status: "Booked",
    },
    {
      token: "T-002",
      uhid: "LEV1002",
      name: "Suresh Kumar",
      doctor: "Dr Prasad",
      department: "Cardiology",
      status: "Booked",
    },
  ];

  const handleSearch = () => {
    const result = appointments.find(
      (item) => item.token === search || item.uhid === search
    );

    setPatient(result || null);
  };

  const checkInPatient = () => {
    setPatient({
      ...patient,
      status: "Checked-in",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Patient Check-in
          </h1>
          <p className="mt-2 text-gray-500">
            Search a patient using UHID or Token Number and confirm check-in.
          </p>
        </div>

        {/* Search Card */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-3">
              <input
                type="text"
                placeholder="Enter UHID / Token Number"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <button
              onClick={handleSearch}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>

        {/* Patient Details */}
        {patient && (
          <div className="rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">
              Patient Details
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="mb-3">
                  <span className="font-semibold text-gray-700">Token:</span>{" "}
                  {patient.token}
                </p>

                <p className="mb-3">
                  <span className="font-semibold text-gray-700">UHID:</span>{" "}
                  {patient.uhid}
                </p>

                <p className="mb-3">
                  <span className="font-semibold text-gray-700">Name:</span>{" "}
                  {patient.name}
                </p>
              </div>

              <div>
                <p className="mb-3">
                  <span className="font-semibold text-gray-700">Doctor:</span>{" "}
                  {patient.doctor}
                </p>

                <p className="mb-3">
                  <span className="font-semibold text-gray-700">
                    Department:
                  </span>{" "}
                  {patient.department}
                </p>

                <p className="mb-3">
                  <span className="font-semibold text-gray-700">Status:</span>{" "}
                  <span
                    className={`ml-2 rounded-full px-3 py-1 text-sm font-semibold ${
                      patient.status === "Checked-in"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {patient.status}
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={checkInPatient}
              className="mt-8 rounded-lg bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Confirm Check-in
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientCheckIn;