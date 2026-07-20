import React from 'react';
import StatCard from '../../components/common/StatCard';
import Table from '../../components/common/Table';
import { CreditCard, TrendingUp, AlertCircle, Search, Filter, Download } from 'lucide-react';

const Subscriptions = () => {
  const kpiData = [
    {
      title: 'Monthly Recurring Revenue',
      value: '₹2,90,000',
      icon: TrendingUp,
      colorTheme: 'green',
    },
    {
      title: 'Active Subscriptions',
      value: '6',
      icon: CreditCard,
      colorTheme: 'blue',
    },
    {
      title: 'Expiring This Month',
      value: '1',
      icon: AlertCircle,
      colorTheme: 'orange',
    },
  ];

  const subscriptionData = [
    { id: 1, hospital: 'Apollo Hospitals', plan: 'Enterprise Plan', status: 'Active', startDate: 'Jan 12, 2024', amount: '₹25,000/mo' },
    { id: 2, hospital: 'City Care Clinic', plan: 'Pro Plan', status: 'Expiring Soon', startDate: 'Feb 05, 2023', amount: '₹10,000/mo' },
    { id: 3, hospital: 'Sunrise Medical Center', plan: 'Basic Plan', status: 'Active', startDate: 'Mar 20, 2024', amount: '₹5,000/mo' },
    { id: 4, hospital: 'Green Valley Hospital', plan: 'Enterprise Plan', status: 'Inactive', startDate: 'Nov 10, 2022', amount: '₹25,000/mo' },
    { id: 5, hospital: 'Metro General Hospital', plan: 'Pro Plan', status: 'Active', startDate: 'Dec 01, 2023', amount: '₹10,000/mo' },
    { id: 6, hospital: 'Lakeside Care', plan: 'Basic Plan', status: 'Active', startDate: 'Jan 15, 2024', amount: '₹5,000/mo' },
  ];

  const columns = [
    {
      header: 'Hospital Name',
      accessor: 'hospital',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-50 border border-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm shadow-sm">
            {row.hospital.charAt(0)}
          </div>
          <span className="font-bold text-slate-800">{row.hospital}</span>
        </div>
      )
    },
    {
      header: 'Subscription Plan',
      accessor: 'plan',
      render: (row) => (
        <span className="font-medium text-slate-700">{row.plan}</span>
      )
    },
    {
      header: 'Billing Status',
      accessor: 'status',
      render: (row) => {
        let style = "bg-slate-100 text-slate-700 border-slate-200";
        if (row.status === 'Active') style = "bg-green-50 text-green-700 border-green-200";
        if (row.status === 'Expiring Soon') style = "bg-orange-50 text-orange-700 border-orange-200";
        if (row.status === 'Inactive') style = "bg-red-50 text-red-700 border-red-200";

        return (
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${style}`}>
            {row.status}
          </span>
        );
      }
    },
    {
      header: 'Start Date',
      accessor: 'startDate',
      render: (row) => <span className="text-slate-500">{row.startDate}</span>
    },
    {
      header: 'Monthly Amount',
      accessor: 'amount',
      render: (row) => <span className="font-bold text-slate-800">{row.amount}</span>
    },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-7xl mx-auto space-y-8 pb-10">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Subscriptions</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Monitor active plans, revenue metrics, and hospital billing statuses.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-bold">
          <Download size={16} />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiData.map((kpi, idx) => (
          <StatCard key={idx} {...kpi} />
        ))}
      </div>

      <div className="flex flex-col space-y-5">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 px-3 hidden md:block">Client Subscriptions</h2>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search hospitals or plans..."
                className="pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all w-full"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors shrink-0 text-sm font-bold">
              <Filter size={16} />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        <Table columns={columns} data={subscriptionData} />
      </div>

    </div>
  );
};

export default Subscriptions;