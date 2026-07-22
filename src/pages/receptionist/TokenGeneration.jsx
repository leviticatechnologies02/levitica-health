import React, { useState } from "react";
const TokenGeneration = () => {
  const [patient, setPatient] = useState({
    uhid: "",
    name: "",
    doctor: "",
  });

  const [token, setToken] = useState("");
  const [queue, setQueue] = useState([]);

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const generateToken = () => {
    const tokenNumber = "T-" + (queue.length + 1).toString().padStart(3, "0");

    const newPatient = {
      ...patient,
      token: tokenNumber,
      status: "Waiting",
    };

    setQueue([...queue, newPatient]);
    setToken(tokenNumber);

    setPatient({
      uhid: "",
      name: "",
      doctor: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Token Generation
          </h1>
          <p className="mt-2 text-gray-500">
            Generate queue tokens for patients.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-xl bg-white p-8 shadow-md">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                UHID
              </label>
              <input
                type="text"
                name="uhid"
                value={patient.uhid}
                onChange={handleChange}
                placeholder="Enter UHID"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

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

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Doctor
              </label>
              <input
                type="text"
                name="doctor"
                value={patient.doctor}
                onChange={handleChange}
                placeholder="Enter doctor name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <button
            onClick={generateToken}
            className="mt-8 rounded-lg bg-[#f95e09] px-8 py-3 font-semibold text-white transition hover:bg-[#e45508]"
          >
            Generate Token
          </button>
        </div>

        {/* Generated Token */}
        {token && (
          <div className="rounded-xl border border-green-200 bg-green-100 p-6 text-center shadow">
            <p className="text-lg font-medium text-green-700">
              Generated Token
            </p>

            <h2 className="mt-2 text-4xl font-bold text-green-800">
              {token}
            </h2>
          </div>
        )}

        {/* Queue Table */}
        <div className="overflow-hidden rounded-xl bg-white shadow-md">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Patient Queue
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-[#f95e09] text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Token</th>
                  <th className="px-6 py-3 text-left">UHID</th>
                  <th className="px-6 py-3 text-left">Patient Name</th>
                  <th className="px-6 py-3 text-left">Doctor</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {queue.length > 0 ? (
                  queue.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-semibold">
                        {item.token}
                      </td>

                      <td className="px-6 py-4">{item.uhid}</td>

                      <td className="px-6 py-4">{item.name}</td>

                      <td className="px-6 py-4">{item.doctor}</td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No patients in the queue.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenGeneration;