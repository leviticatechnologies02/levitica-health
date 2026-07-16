import React from 'react';

const Dashboard = () => {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Superadmin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of the entire Levitica MediSphere system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Users', value: '1,248', trend: '+12%', color: 'border-blue-500' },
          { title: 'Active Sessions', value: '142', trend: '+5%', color: 'border-green-500' },
          { title: 'Total Facilities', value: '18', trend: '0%', color: 'border-purple-500' },
          { title: 'System Alerts', value: '3', trend: '-2', color: 'border-orange-500' },
        ].map((stat, idx) => (
          <div key={idx} className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 ${stat.color}`}>
            <h3 className="text-gray-500 text-sm font-medium mb-2">{stat.title}</h3>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
              <span className={`text-xs font-semibold ${stat.trend.startsWith('+') ? 'text-green-600' : stat.trend.startsWith('-') ? 'text-red-600' : 'text-gray-500'}`}>
                {stat.trend} this week
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-gray-700 font-medium mb-1">Detailed Analytics</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">This widget area is reserved for detailed charts and graphs for the superadmin view.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
