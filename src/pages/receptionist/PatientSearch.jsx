import React, { useState } from "react";
const PatientSearch = () => {
  const [search, setSearch] = useState("");
  const [patient, setPatient] = useState(null);

  const patients = [
    {
      uhid: "LEV1001",
      name: "Ramesh Kumar",
      age: 35,
      gender: "Male",
      mobile: "9876543210",
      blood: "O+",
      lastVisit: "20-07-2026",
    },
    {
      uhid: "LEV1002",
      name: "Suresh Kumar",
      age: 42,
      gender: "Male",
      mobile: "9123456780",
      blood: "A+",
      lastVisit: "18-07-2026",
    },
  ];

  const handleSearch = () => {
    const result = patients.find(
      (item) =>
        item.uhid.toLowerCase() === search.toLowerCase() ||
        item.mobile === search ||
        item.name.toLowerCase() === search.toLowerCase()
    );

    setPatient(result || null);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto ">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Patient Search
          </h1>
          <p className="mt-2 text-gray-500">
            Search patient using UHID, Mobile Number or Name.
          </p>
        </div>

        {/* Search Card */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-3">
              <input
                type="text"
                placeholder="Search UHID / Mobile / Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <button
              onClick={handleSearch}
              className="rounded-lg bg-[#f95e09] px-5 py-3 font-semibold text-white transition hover:bg-[#e45508]"
            >
              Search Patient
            </button>
          </div>
        </div>

        {/* Patient Details */}
        {patient && (
          <div className="mt-8 rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">
              Patient Details
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="mb-3">
                  <span className="font-semibold text-gray-700">UHID:</span>{" "}
                  {patient.uhid}
                </p>

                <p className="mb-3">
                  <span className="font-semibold text-gray-700">Name:</span>{" "}
                  {patient.name}
                </p>

                <p className="mb-3">
                  <span className="font-semibold text-gray-700">Age:</span>{" "}
                  {patient.age}
                </p>

                <p className="mb-3">
                  <span className="font-semibold text-gray-700">Gender:</span>{" "}
                  {patient.gender}
                </p>
              </div>

              <div>
                <p className="mb-3">
                  <span className="font-semibold text-gray-700">Mobile:</span>{" "}
                  {patient.mobile}
                </p>

                <p className="mb-3">
                  <span className="font-semibold text-gray-700">
                    Blood Group:
                  </span>{" "}
                  {patient.blood}
                </p>

                <p className="mb-3">
                  <span className="font-semibold text-gray-700">
                    Last Visit:
                  </span>{" "}
                  {patient.lastVisit}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">
                Book Appointment
              </button>

              <button className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white transition hover:bg-yellow-600">
                Generate Token
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientSearch;