import React, { useState, useMemo } from 'react';
import StatCard from '../../components/common/StatCard';
import Table from '../../components/common/Table';
import { Download, FileText, TrendingUp, Users, Activity, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const MOCK_REPORTS = [
  { id: 'RPT-001', title: 'Monthly Financial Summary', date: '2023-10-01', type: 'Finance', size: '2.4 MB', status: 'Ready' },
  { id: 'RPT-002', title: 'Patient Admissions Overview', date: '2023-09-30', type: 'Operations', size: '1.1 MB', status: 'Ready' },
  { id: 'RPT-003', title: 'Pharmacy Inventory Status', date: '2023-09-28', type: 'Inventory', size: '3.8 MB', status: 'Ready' },
  { id: 'RPT-004', title: 'Staff Performance Metrics', date: '2023-09-25', type: 'HR', size: '1.5 MB', status: 'Ready' },
  { id: 'RPT-005', title: 'Radiology Equipment Usage', date: '2023-09-22', type: 'Operations', size: '4.2 MB', status: 'Ready' },
  { id: 'RPT-006', title: 'Laboratory Test Turnover', date: '2023-09-20', type: 'Operations', size: '2.1 MB', status: 'Ready' },
]; AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer


const chartData = [
  { name: 'Jan', revenue: 42000, patients: 320 },
  { name: 'Feb', revenue: 38000, patients: 280 },
  { name: 'Mar', revenue: 55000, patients: 450 },
  { name: 'Apr', revenue: 62000, patients: 510 },
  { name: 'May', revenue: 58000, patients: 490 },
  { name: 'Jun', revenue: 75000, patients: 610 },
  { name: 'Jul', revenue: 84000, patients: 680 },
  { name: 'Aug', revenue: 79000, patients: 640 },
  { name: 'Sep', revenue: 92000, patients: 720 },
  { name: 'Oct', revenue: 104000, patients: 842 },
];

const Reports = () => {
  const [data] = useState(MOCK_REPORTS);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    return data
      .filter(item => typeFilter === 'All' ? true : item.type === typeFilter)
      .filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [data, search, typeFilter, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const columns = [
    {
      header: 'Report Title',
      accessor: 'title',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
            <FileText className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-slate-900">{item.title}</span>
        </div>
      )
    },
    { header: 'Type', accessor: 'type' },
    { header: 'Date Generated', accessor: 'date' },
    {
      header: 'File Size',
      accessor: 'size',
      render: (item) => <span className="text-sm text-slate-500">{item.size}</span>
    },
    {
      header: <div className="text-right">Action</div>,
      accessor: 'actions',
      render: (item) => (
        <div className="flex items-center justify-end">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-primary-600 transition-colors shadow-sm group">
            <Download className="w-4 h-4 group-hover:text-primary-600 transition-colors" /> Download
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl mb-6">
        <h3 className="text-indigo-800 font-semibold mb-1">Module Note: Hospital Reports</h3>
        <p className="text-indigo-600 text-sm"><strong>Flow/Usefulness:</strong> Analytics and reporting allow the administration to identify trends in patient admissions, revenue generation, and staff performance. It is essential for strategic planning, resource allocation, and optimizing hospital efficiency.</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Analytics & Reports</h1>
          <p className="text-slate-500 text-sm mt-1">View key metrics and download generated reports.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value="₹324,500" icon={TrendingUp} colorTheme="primary" />
        <StatCard title="New Patients" value="842" icon={Users} colorTheme="emerald" />
        <StatCard title="Lab Tests" value="1,204" icon={Activity} colorTheme="amber" />
        <StatCard title="Reports Generated" value="156" icon={FileText} colorTheme="blue" />
      </div>

      {/* CHART SECTION */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8">
        <div className="mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Revenue & Patient Growth Overview</h2>
            <p className="text-sm text-slate-500 mt-1">Monthly breakdown of key hospital metrics.</p>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-600"></div>
              <span className="text-slate-600">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-slate-600">Patients</span>
            </div>
          </div>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontWeight: '500' }}
              />
              <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
              <Area yAxisId="right" type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" name="Patients" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-t-xl border border-slate-100 border-b-0 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search reports..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Type:</span>
          </div>
          <select
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500 bg-slate-50"
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
          >
            <option value="All">All Types</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
            <option value="Inventory">Inventory</option>
            <option value="HR">HR</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-b-xl border border-slate-100 border-t-0 shadow-sm overflow-hidden">
        <Table columns={columns} data={paginatedData} className="border-0 shadow-none rounded-none" />

        <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
          <p className="text-sm text-slate-500 text-center sm:text-left">
            Showing <span className="font-medium text-slate-900">{filteredData.length > 0 ? (page - 1) * rowsPerPage + 1 : 0}</span> to <span className="font-medium text-slate-900">{Math.min(page * rowsPerPage, filteredData.length)}</span> of <span className="font-medium text-slate-900">{filteredData.length}</span> results
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-3 py-1.5 text-sm font-medium text-slate-700">
              Page {page} of {totalPages || 1}
            </div>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
