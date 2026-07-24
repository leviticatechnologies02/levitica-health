import React, { useState, useMemo } from "react";
import {
  Users,
  Clock,
  Ticket,
  Search,
  Stethoscope,
  Filter,
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

  const [statusFilter, setStatusFilter] = useState("All");

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
    return queue.filter((item) => {
      const matchesSearch =
        item.token.toLowerCase().includes(search.toLowerCase()) ||
        item.uhid.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.doctor.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [queue, search, statusFilter]);

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
        <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
          {row.status}
        </span>
      ),
    },
  ];
    return (
    <div className="min-h-screen space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Token Generation
        </h1>

        <p className="mt-1 text-slate-500">
          Generate patient queue tokens quickly and efficiently.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

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

      {/* Patient Details */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-800">
            Patient Details
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Enter patient information to generate a queue token.
          </p>
        </div>

        <div className="p-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                UHID
              </label>

              <input
                type="text"
                name="uhid"
                value={patient.uhid}
                onChange={handleChange}
                placeholder="Enter UHID"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f95e09]/20 focus:border-[#f95e09]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Patient Name
              </label>

              <input
                type="text"
                name="name"
                value={patient.name}
                onChange={handleChange}
                placeholder="Enter Patient Name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f95e09]/20 focus:border-[#f95e09]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Doctor
              </label>

              <input
                type="text"
                name="doctor"
                value={patient.doctor}
                onChange={handleChange}
                placeholder="Enter Doctor Name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f95e09]/20 focus:border-[#f95e09]"
              />
            </div>

          </div>

          <div className="mt-8">
            <button
              onClick={generateToken}
              className="px-8 py-3 rounded-xl bg-[#f95e09] text-white font-semibold hover:bg-orange-600 transition-all shadow-sm"
            >
              Generate Token
            </button>
          </div>
                    {token && (
            <div className="mt-8 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-green-100 p-6 shadow-sm">

              <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                <div>
                  <h3 className="text-xl font-semibold text-green-700">
                    Token Generated Successfully
                  </h3>

                  <p className="mt-2 text-sm text-green-600">
                    Please ask the patient to wait until their token is called.
                  </p>
                </div>

                <div className="rounded-2xl bg-green-600 px-10 py-6 text-center shadow-lg">

                  <p className="text-xs uppercase tracking-widest text-green-100">
                    Token Number
                  </p>

                  <h1 className="mt-1 text-5xl font-bold text-white">
                    {token}
                  </h1>

                </div>

              </div>

            </div>
          )}

        </div>

      </div>

      {/* Queue List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        {/* Search & Filter */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">

          <div className="relative w-full md:w-80">

            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search Token, UHID, Patient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f95e09]/20 focus:border-[#f95e09]"
            />

          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Filter className="w-4 h-4" />
              <span className="font-medium">
                Status
              </span>
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:border-[#f95e09]"
            >
              <option value="All">All</option>
              <option value="Waiting">Waiting</option>
            </select>

          </div>

        </div>

        <Table
          columns={columns}
          data={filteredQueue}
          className="rounded-none border-0 shadow-none"
        />

      </div>
          </div>
  );
};

export default TokenGeneration;