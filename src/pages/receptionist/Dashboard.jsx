import React from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../../components/common/StatCard";
import Table from "../../components/common/Table";

import {
  Users,
  CalendarDays,
  Clock3,
  Building2,
  ClipboardList,
  CheckCircle,
  UserPlus,
  Ticket,
  Search,
  ArrowRight,
  Stethoscope,
  Activity,
  IndianRupee,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const dashboardCards = [
    {
      title: "Today's Patients",
      value: "120",
      trend: "+12%",
      trendLabel: "vs yesterday",
      icon: Users,
      theme: "blue",
    },
    {
      title: "Appointments",
      value: "80",
      trend: "+8%",
      trendLabel: "Today's bookings",
      icon: CalendarDays,
      theme: "green",
    },
    {
      title: "Waiting Queue",
      value: "25",
      trend: "-3",
      trendLabel: "Patients waiting",
      icon: Clock3,
      theme: "orange",
    },
    {
      title: "Admissions",
      value: "10",
      trend: "+2",
      trendLabel: "New admissions",
      icon: Building2,
      theme: "rose",
    },
    {
      title: "Pending Tasks",
      value: "15",
      trend: "0%",
      trendLabel: "No change",
      icon: ClipboardList,
      theme: "purple",
    },
    {
      title: "Completed Visits",
      value: "60",
      trend: "+15%",
      trendLabel: "Completed today",
      icon: CheckCircle,
      theme: "green",
    },
  ];

  const recentPatients = [
    {
      name: "Ravi Kumar",
      doctor: "Dr. Priya",
      appointment: "09:30 AM",
      status: "Checked In",
      uhid: "UH1001",
    },
    {
      name: "Suresh",
      doctor: "Dr. Ramesh",
      appointment: "10:00 AM",
      status: "Waiting",
      uhid: "UH1002",
    },
    {
      name: "Anitha",
      doctor: "Dr. Swetha",
      appointment: "10:30 AM",
      status: "Completed",
      uhid: "UH1003",
    },
    {
      name: "Kiran",
      doctor: "Dr. Ajay",
      appointment: "11:00 AM",
      status: "Waiting",
      uhid: "UH1004",
    },
    {
      name: "Lakshmi",
      doctor: "Dr. Rahul",
      appointment: "11:30 AM",
      status: "Checked In",
      uhid: "UH1005",
    },
  ];

  const quickActions = [
    {
      title: "Register Patient",
      subtitle: "Add a new patient",
      icon: UserPlus,
      color: "from-[#f95e09] to-orange-500",
      path: "/receptionist/patient-registration",
    },
    {
      title: "Book Appointment",
      subtitle: "Schedule consultation",
      icon: CalendarDays,
      color: "from-emerald-500 to-green-600",
      path: "/receptionist/appointment-booking",
    },
    {
      title: "Generate Token",
      subtitle: "Queue management",
      icon: Ticket,
      color: "from-amber-400 to-yellow-500",
      path: "/receptionist/token-generation",
    },
    {
      title: "Admission",
      subtitle: "Admit new patient",
      icon: Building2,
      color: "from-rose-500 to-red-600",
      path: "/receptionist/admission-initiation",
    },
  ];

  const columns = [
    {
      header: "Patient",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-orange-100 text-[#f95e09] flex items-center justify-center font-bold">
            {row.name.charAt(0)}
          </div>

          <div>
            <p className="font-semibold text-slate-800">{row.name}</p>
            <p className="text-xs text-slate-500">{row.uhid}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Doctor",
      accessor: "doctor",
    },
    {
      header: "Appointment",
      accessor: "appointment",
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            row.status === "Completed"
              ? "bg-green-100 text-green-700"
              : row.status === "Checked In"
              ? "bg-blue-100 text-blue-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen animate-in fade-in duration-500">

  {/* Header */}
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

    <div>
      <h1 className="text-3xl font-bold text-slate-800">
        Reception Dashboard
      </h1>

      <p className="text-slate-500 mt-2">
        Welcome back! Here's today's hospital overview.
      </p>
    </div>

    <div className="flex items-center gap-3">
      <button className="px-5 py-3 rounded-xl bg-[#f95e09] text-white font-semibold shadow-lg hover:shadow-xl transition-all">
        Today's Report
      </button>
    </div>

  </div>

  {/* Statistics */}
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

    {dashboardCards.map((card) => (
      <StatCard
        key={card.title}
        title={card.title}
        value={card.value}
        trend={card.trend}
        trendLabel={card.trendLabel}
        icon={card.icon}
        colorTheme={card.theme}
      />
    ))}

  </div>

  {/* Today's Summary */}
  {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm text-slate-500">
            New Registrations
          </p>

          <h2 className="text-3xl font-bold text-[#f95e09] mt-2">
            32
          </h2>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
          <UserPlus className="text-[#f95e09]" />
        </div>

      </div>

    </div>

    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm text-slate-500">
            Doctors Available
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            18
          </h2>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
          <Stethoscope className="text-green-600" />
        </div>

      </div>

    </div>

    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm text-slate-500">
            Lab Tests
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            54
          </h2>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
          <Activity className="text-blue-600" />
        </div>

      </div>

    </div>

    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm text-slate-500">
            Today's Revenue
          </p>

          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            ₹1.8L
          </h2>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
          <IndianRupee className="text-purple-600" />
        </div>

      </div>

    </div>

  </div> */}

  {/* Table + Quick Actions */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Recent Patients */}
<div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

  {/* Header */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b border-slate-100">

    <div>
      <h2 className="text-xl font-bold text-slate-800">
        Recent Patients
      </h2>

      <p className="text-sm text-slate-500">
        Today's patient registrations
      </p>
    </div>

    <div className="flex flex-col md:flex-row gap-3">

      <div className="relative">

        <Search
          size={18}
          className="absolute left-3 top-3 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search patient..."
          className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />

      </div>

      <button
        onClick={() => navigate("/receptionist/patient-search")}
        className="px-5 py-2 rounded-xl bg-[#f95e09] text-white font-medium hover:bg-orange-600 transition"
      >
        View All
      </button>

    </div>

  </div>

  {/* Table */}
  <div className="p-5">

    <Table
      columns={columns}
      data={recentPatients}
    />

  </div>

</div>

{/* Quick Actions */}
<div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

  <div className="p-6 border-b border-slate-100 bg-slate-50">

    <h2 className="text-xl font-bold text-slate-800">
      Quick Actions
    </h2>

    <p className="text-sm text-slate-500 mt-1">
      Frequently used receptionist operations
    </p>

  </div>

  <div className="p-6 space-y-4">

    {quickActions.map((action) => {
      const Icon = action.icon;

      return (
        <button
          key={action.title}
          onClick={() => navigate(action.path)}
          className={`group w-full flex items-center justify-between rounded-2xl bg-gradient-to-r ${action.color} p-4 text-white shadow hover:shadow-xl transition-all duration-300`}
        >

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon size={22} />
            </div>

            <div className="text-left">

              <h3 className="font-semibold">
                {action.title}
              </h3>

              <p className="text-xs opacity-90">
                {action.subtitle}
              </p>

            </div>

          </div>

          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />

        </button>
      );
    })}

  </div>

</div>

</div>
    </div>
  );
};

export default Dashboard;