import React, { useMemo, useState } from "react";
import {
  Users,
  Clock,
  CheckCircle,
  Stethoscope,
  Search,
  Filter,
} from "lucide-react";

import StatCard from "../../components/common/StatCard";
import Table from "../../components/common/Table";

export default function PatientQueue() {
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
      status: "Consultation Started",
    },
    {
      token: "T-004",
      uhid: "LEV1004",
      name: "Priya",
      doctor: "Dr Ravi Kumar",
      department: "Dermatology",
      status: "Completed",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => {
    return queue.filter((patient) => {
      const matchesSearch =
        patient.token.toLowerCase().includes(search.toLowerCase()) ||
        patient.uhid.toLowerCase().includes(search.toLowerCase()) ||
        patient.name.toLowerCase().includes(search.toLowerCase()) ||
        patient.doctor.toLowerCase().includes(search.toLowerCase()) ||
        patient.department.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || patient.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [queue, search, statusFilter]);

  const counts = {
    total: queue.length,
    waiting: queue.filter((x) => x.status === "Waiting").length,
    consult: queue.filter(
      (x) => x.status === "Consultation Started"
    ).length,
    completed: queue.filter((x) => x.status === "Completed").length,
  };

  const updateStatus = (index, status) => {
    setQueue((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, status } : item
      )
    );
  };

  const getBadgeColor = (status) => {
    switch (status) {
      case "Waiting":
        return "bg-yellow-100 text-yellow-700";

      case "Consultation Started":
        return "bg-blue-100 text-blue-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

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
      header: "Department",
      accessor: "department",
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(
            row.status
          )}`}
        >
          {row.status}
        </span>
      ),
    },
        {
      header: "Action",
      render: (row) => {
        const index = queue.findIndex(
          (item) => item.token === row.token
        );

        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                updateStatus(index, "Consultation Started")
              }
              className="px-3 py-2 rounded-lg bg-[#f95e09] text-white text-xs font-medium hover:bg-[#e25508] transition-colors"
            >
              Call
            </button>

            <button
              onClick={() =>
                updateStatus(index, "Completed")
              }
              className="px-3 py-2 rounded-lg bg-green-600 text-white text-xs font-medium hover:bg-green-700 transition-colors"
            >
              Complete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Patient Queue Management
        </h1>
        <p className="text-slate-500">
          Monitor and manage patient flow.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="Total Patients"
          value={counts.total}
          icon={Users}
          colorTheme="blue"
        />

        <StatCard
          title="Waiting"
          value={counts.waiting}
          icon={Clock}
          colorTheme="orange"
        />

        <StatCard
          title="In Consultation"
          value={counts.consult}
          icon={Stethoscope}
          colorTheme="purple"
        />

        <StatCard
          title="Completed"
          value={counts.completed}
          icon={CheckCircle}
          colorTheme="green"
        />
      </div>

      {/* Search + Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search Token, UHID, Patient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#f95e09] focus:ring-1 focus:ring-[#f95e09]"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Filter className="w-4 h-4" />
              <span className="font-medium">
                Status:
              </span>
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:border-[#f95e09]"
            >
              <option value="All">All</option>
              <option value="Waiting">Waiting</option>
              <option value="Consultation Started">
                Consultation Started
              </option>
              <option value="Completed">
                Completed
              </option>
            </select>

          </div>

        </div>

        <Table
          columns={columns}
          data={filtered}
          className="border-0 rounded-none shadow-none"
        />
      </div>
          </div>
  );
}