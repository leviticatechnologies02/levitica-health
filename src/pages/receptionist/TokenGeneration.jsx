import React, { useState, useMemo } from "react";
import {
  Users,
  Clock,
  Ticket,
  Search,
  UserRound,
  Stethoscope,
} from "lucide-react";

import StatCard from "../../components/common/StatCard";
import Table from "../../components/common/Table";

const TokenGeneration = () => {
  const [patient, setPatient] = useState({
    uhid: "",
    name: "",
    doctor: "",
  });

  const [token, setToken] = useState("");

  const [search, setSearch] = useState("");

  const [queue, setQueue] = useState([]);

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const generateToken = () => {
    if (
      !patient.uhid ||
      !patient.name ||
      !patient.doctor
    ) {
      alert("Please fill all fields.");
      return;
    }

    const tokenNumber =
      "T-" +
      (queue.length + 1)
        .toString()
        .padStart(3, "0");

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

  const filteredQueue = useMemo(() => {
    return queue.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [queue, search]);

  const totalPatients = queue.length;

  const waitingPatients = queue.filter(
    (p) => p.status === "Waiting"
  ).length;

  const totalDoctors = new Set(
    queue.map((p) => p.doctor)
  ).size;

  const columns = [
    {
      header: "Token",
      accessor: "token",
    },
    {
      header: "UHID",
      accessor: "uhid",
    },
    {
      header: "Patient",
      accessor: "name",
    },
    {
      header: "Doctor",
      accessor: "doctor",
    },
    {
      header: "Status",
      render: (row) => (
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Token Generation
          </h1>

          <p className="mt-1 text-slate-500">
            Generate patient queue tokens quickly and efficiently.
          </p>
        </div>

      </div>

      {/* Stat Cards */}

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Tokens"
          value={totalPatients}
          icon={Ticket}
          colorTheme="blue"
        />

        <StatCard
          title="Waiting Patients"
          value={waitingPatients}
          icon={Clock}
          colorTheme="orange"
        />

        <StatCard
          title="Doctors"
          value={totalDoctors}
          icon={Stethoscope}
          colorTheme="purple"
        />

        <StatCard
          title="Today's Queue"
          value={queue.length}
          icon={Users}
          colorTheme="green"
        />

      </div>

      {/* Token Form */}

      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">

        <h2 className="mb-6 text-xl font-semibold text-slate-700">
          Patient Details
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-600">
              UHID
            </label>

            <input
              type="text"
              name="uhid"
              value={patient.uhid}
              onChange={handleChange}
              placeholder="Enter UHID"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-[#f95e09] focus:outline-none focus:ring-2 focus:ring-orange-200"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Patient Name
            </label>

            <input
              type="text"
              name="name"
              value={patient.name}
              onChange={handleChange}
              placeholder="Enter Patient Name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-[#f95e09] focus:outline-none focus:ring-2 focus:ring-orange-200"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Doctor
            </label>

            <input
              type="text"
              name="doctor"
              value={patient.doctor}
              onChange={handleChange}
              placeholder="Enter Doctor Name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-[#f95e09] focus:outline-none focus:ring-2 focus:ring-orange-200"
            />

          </div>

        </div>

        <button
          onClick={generateToken}
          className="mt-8 rounded-xl bg-[#f95e09] px-8 py-3 font-semibold text-white shadow hover:bg-orange-600 transition"
        >
          Generate Token
        </button>
                {/* Generated Token */}

        {token && (
          <div className="mt-8 rounded-3xl border border-green-200 bg-gradient-to-r from-green-50 to-green-100 p-8 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-lg font-semibold text-green-700">
                  Token Generated Successfully
                </h3>

                <p className="mt-1 text-sm text-green-600">
                  Please ask the patient to wait until their token is called.
                </p>

              </div>

              <div className="rounded-2xl bg-green-600 px-8 py-5 text-center shadow">

                <p className="text-xs uppercase tracking-widest text-green-100">
                  Token
                </p>

                <h1 className="text-4xl font-bold text-white">
                  {token}
                </h1>

              </div>

            </div>

          </div>
        )}

        {/* Search */}

        <div className="mt-8 rounded-3xl bg-white p-5 shadow-sm border border-slate-200">

          <div className="relative max-w-md">

            <Search
              size={18}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search Token / UHID / Patient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 focus:border-[#f95e09] focus:outline-none focus:ring-2 focus:ring-orange-200"
            />

          </div>

        </div>

        {/* Queue Table */}

        <div className="mt-8">

          <Table
            columns={columns}
            data={filteredQueue}
          />

        </div>

      </div>
    </div>
  );
};

export default TokenGeneration;