import React from "react";
import StatCard from "../../components/common/StatCard";
import {
  Users,
  CalendarDays,
  Clock3,
  Building2,
  ClipboardList,
  CheckCircle,
  UserPlus,
  Ticket,
} from "lucide-react";

const Dashboard = () => {
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

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
          Reception Dashboard
        </h1>
        <p className="text-slate-500 text-sm mt-2 font-medium">
          Welcome to the Reception Management System.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
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

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Patients */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800">
              Recent Patients
            </h2>

            <button className="text-sm font-semibold text-[#f95e09] hover:text-orange-700">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold border-b border-slate-100">
                    Patient Name
                  </th>

                  <th className="p-4 font-semibold border-b border-slate-100">
                    Doctor
                  </th>

                  <th className="p-4 font-semibold border-b border-slate-100">
                    Appointment
                  </th>

                  <th className="p-4 font-semibold border-b border-slate-100">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm">
                {[
                  {
                    name: "Ravi Kumar",
                    doctor: "Dr. Priya",
                    time: "09:30 AM",
                    status: "Checked In",
                  },
                  {
                    name: "Suresh",
                    doctor: "Dr. Ramesh",
                    time: "10:00 AM",
                    status: "Waiting",
                  },
                  {
                    name: "Anitha",
                    doctor: "Dr. Swetha",
                    time: "10:30 AM",
                    status: "Completed",
                  },
                  {
                    name: "Kiran",
                    doctor: "Dr. Ajay",
                    time: "11:00 AM",
                    status: "Waiting",
                  },
                  {
                    name: "Lakshmi",
                    doctor: "Dr. Rahul",
                    time: "11:30 AM",
                    status: "Checked In",
                  },
                ].map((patient, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 font-semibold text-slate-800">
                      {patient.name}
                    </td>

                    <td className="p-4 text-slate-600">
                      {patient.doctor}
                    </td>

                    <td className="p-4 text-slate-500">
                      {patient.time}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold
                        ${
                          patient.status === "Completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : patient.status === "Checked In"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800">
              Quick Actions
            </h2>
          </div>

          <div className="p-6 space-y-4">

            <button className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#f95e09] py-3 text-white font-semibold hover:scale-105 transition">
              <UserPlus size={20} />
              Register Patient
            </button>

            <button className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 text-white font-semibold hover:scale-105 transition">
              <CalendarDays size={20} />
              Book Appointment
            </button>

            <button className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-500 py-3 text-white font-semibold hover:scale-105 transition">
              <Ticket size={20} />
              Generate Token
            </button>

            <button className="w-full flex items-center justify-center gap-2 rounded-2xl bg-rose-600 py-3 text-white font-semibold hover:scale-105 transition">
              <Building2 size={20} />
              Admission
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;