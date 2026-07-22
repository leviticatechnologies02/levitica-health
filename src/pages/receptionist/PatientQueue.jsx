import React, { useState } from "react";
const PatientQueue = () => {
  const [queue, setQueue] = useState([
    {
      token: "T-001",
      uhid: "LEV1001",
      name: "Ramesh Kumar",
      doctor: "Dr Ravi Kumar",
      department: "General Medicine",
      status: "Waiting",
    },
    {
      token: "T-002",
      uhid: "LEV1002",
      name: "Suresh Kumar",
      doctor: "Dr Prasad",
      department: "Cardiology",
      status: "Waiting",
    },
    {
      token: "T-003",
      uhid: "LEV1003",
      name: "Anil Kumar",
      doctor: "Dr Mahesh",
      department: "Orthopedics",
      status: "Waiting",
    },
  ]);

  const callPatient = (index) => {
    const updatedQueue = [...queue];
    updatedQueue[index].status = "Consultation Started";
    setQueue(updatedQueue);
  };

  const completePatient = (index) => {
    const updatedQueue = [...queue];
    updatedQueue[index].status = "Completed";
    setQueue(updatedQueue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Waiting":
        return "bg-yellow-100 text-yellow-700";
      case "Consultation Started":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          Patient Queue Management
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full overflow-hidden rounded-lg">
            <thead className="bg-[#f95e09] text-white">
              <tr>
                <th className="px-4 py-3 text-left">Token</th>
                <th className="px-4 py-3 text-left">UHID</th>
                <th className="px-4 py-3 text-left">Patient Name</th>
                <th className="px-4 py-3 text-left">Doctor</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {queue.map((patient, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-semibold">
                    {patient.token}
                  </td>

                  <td className="px-4 py-3">{patient.uhid}</td>

                  <td className="px-4 py-3">{patient.name}</td>

                  <td className="px-4 py-3">{patient.doctor}</td>

                  <td className="px-4 py-3">{patient.department}</td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(
                        patient.status
                      )}`}
                    >
                      {patient.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => callPatient(index)}
                        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                      >
                        Call
                      </button>

                      <button
                        onClick={() => completePatient(index)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                      >
                        Complete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {queue.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="py-8 text-center text-gray-500"
                  >
                    No patients in queue.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientQueue;