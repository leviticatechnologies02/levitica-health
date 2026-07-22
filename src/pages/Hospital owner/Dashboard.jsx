import React from 'react';
import StatCard from '../../components/common/StatCard';
import Table from '../../components/common/Table';
import { LayoutDashboard, Users, Building2, MapPin, Activity } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Hospitals', value: '12', trend: '+2', trendLabel: 'this month', icon: Building2, colorTheme: 'blue' },
    { title: 'Total Regions', value: '4', trend: '0', trendLabel: 'this month', icon: MapPin, colorTheme: 'purple' },
    { title: 'Total Patients', value: '8,423', trend: '+12%', trendLabel: 'this month', icon: Users, colorTheme: 'primary' },
    { title: 'Active Groups', value: '3', trend: '+1', trendLabel: 'this month', icon: Activity, colorTheme: 'emerald' },
  ];

  const recentHospitalsColumns = [
    { header: 'Hospital Name', accessor: 'name' },
    { header: 'Region', accessor: 'region' },
    { header: 'Status', render: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
        {row.status}
      </span>
    ) },
    { header: 'Date Added', accessor: 'date' },
  ];

  const recentHospitalsData = [
    { name: 'City General Hospital', region: 'North Region', status: 'Active', date: '2023-10-15' },
    { name: 'Valley Medical Center', region: 'South Region', status: 'Active', date: '2023-10-10' },
    { name: 'Sunrise Clinic', region: 'East Region', status: 'Pending', date: '2023-10-05' },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 ">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1">Overview of your hospitals, regions, and overall performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Recently Added Hospitals</h2>
        <Table columns={recentHospitalsColumns} data={recentHospitalsData} />
      </div>
    </div>
  );
};

export default Dashboard;
