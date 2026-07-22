import React from "react";
import StatCard from "../../components/common/StatCard";
import {
  Users,
  UserPlus,
  CalendarDays,
  ClipboardCheck,
  Building2,
  ClipboardList,
  Download,
} from "lucide-react";

const Reports = () => {
  const summaryReports = [
    {
      title: "Total Patients Today",
      value: "120",
      trend: "+12%",
      trendLabel: "vs yesterday",
      icon: Users,
      theme: "blue",
    },
    {
      title: "New Registrations",
      value: "35",
      trend: "+8%",
      trendLabel: "Today's registrations",
      icon: UserPlus,
      theme: "green",
    },
    {
      title: "Appointments",
      value: "80",
      trend: "+10%",
      trendLabel: "Scheduled today",
      icon: CalendarDays,
      theme: "purple",
    },
    {
      title: "Patient Check-ins",
      value: "70",
      trend: "+6%",
      trendLabel: "Checked in",
      icon: ClipboardCheck,
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
      trend: "-2",
      trendLabel: "Need attention",
      icon: ClipboardList,
      theme: "purple",
    },
  ];

  const appointments = [
    {
      doctor: "Dr Ravi Kumar",
      department: "General Medicine",
      total: 30,
      completed: 25,
      pending: 5,
    },
    {
      doctor: "Dr Prasad",
      department: "Cardiology",
      total: 20,
      completed: 18,
      pending: 2,
    },
    {
      doctor: "Dr Swetha",
      department: "Neurology",
      total: 18,
      completed: 16,
      pending: 2,
    },
    {
      doctor: "Dr Ajay",
      department: "Orthopedics",
      total: 25,
      completed: 22,
      pending: 3,
    },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
          Reception Reports
        </h1>

        <p className="text-slate-500 text-sm mt-2 font-medium">
          View daily reception statistics and doctor appointment reports.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        {summaryReports.map((report) => (
          <StatCard
            key={report.title}
            title={report.title}
            value={report.value}
            trend={report.trend}
            trendLabel={report.trendLabel}
            icon={report.icon}
            colorTheme={report.theme}
          />
        ))}
      </div>

      {/* Doctor Appointment Report */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">
            Doctor Appointment Report
          </h2>

          <button className="flex items-center gap-2 rounded-xl bg-[#f95e09] px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition">
            <Download size={18} />
            Export Report
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold border-b border-slate-100">
                  Doctor
                </th>

                <th className="p-4 font-semibold border-b border-slate-100">
                  Department
                </th>

                <th className="p-4 text-center font-semibold border-b border-slate-100">
                  Total
                </th>

                <th className="p-4 text-center font-semibold border-b border-slate-100">
                  Completed
                </th>

                <th className="p-4 text-center font-semibold border-b border-slate-100">
                  Pending
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {appointments.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-4 font-semibold text-slate-800">
                    {item.doctor}
                  </td>

                  <td className="p-4 text-slate-600">
                    {item.department}
                  </td>

                  <td className="p-4 text-center font-bold text-slate-700">
                    {item.total}
                  </td>

                  <td className="p-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                      {item.completed}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
                      {item.pending}
                    </span>
                  </td>
                </tr>
              ))}

              {appointments.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-slate-500"
                  >
                    No report data available.
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

export default Reports;