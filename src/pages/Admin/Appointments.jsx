import React, { useState, useMemo } from 'react';
import {
  Search, Filter, Calendar, ChevronLeft, ChevronRight
} from 'lucide-react';
import Table from '../../components/common/Table';

const MOCK_DATA = [
  { id: 'APT-001', patient: 'John Doe', doctor: 'Dr. Smith A.', date: '2023-10-15', time: '09:00 AM', type: 'Consultation', status: 'Scheduled', isDeleted: false },
  { id: 'APT-002', patient: 'Jane Smith', doctor: 'Dr. Johnson B.', date: '2023-10-15', time: '10:30 AM', type: 'Follow-up', status: 'Completed', isDeleted: false },
  { id: 'APT-003', patient: 'Michael Johnson', doctor: 'Dr. Williams C.', date: '2023-10-16', time: '02:00 PM', type: 'Checkup', status: 'Cancelled', isDeleted: false },
  { id: 'APT-004', patient: 'Emily Davis', doctor: 'Dr. Brown D.', date: '2023-10-17', time: '11:00 AM', type: 'Surgery', status: 'Scheduled', isDeleted: false },
  { id: 'APT-005', patient: 'David Wilson', doctor: 'Dr. Jones A.', date: '2023-10-18', time: '03:30 PM', type: 'Consultation', status: 'Scheduled', isDeleted: false },
  { id: 'APT-006', patient: 'Olivia Martinez', doctor: 'Dr. Garcia B.', date: '2023-10-19', time: '09:00 AM', type: 'Follow-up', status: 'Completed', isDeleted: false },
];

const Appointments = () => {
  const [data, setData] = useState(MOCK_DATA);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    return data
      .filter(item => !item.isDeleted)
      .filter(item => statusFilter === 'All' ? true : item.status === statusFilter)
      .filter(item =>
        Object.values(item).some(val => String(val).toLowerCase().includes(search.toLowerCase()))
      )
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [data, search, statusFilter, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Scheduled':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-500';
      case 'Scheduled': return 'bg-blue-500';
      case 'Cancelled': return 'bg-rose-500';
      default: return 'bg-slate-400';
    }
  };

  const columns = [
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('id')}>ID</div>,
      accessor: 'id',
      render: (item) => <span className="font-medium text-slate-900">{item.id}</span>
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('patient')}>Patient</div>,
      accessor: 'patient',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-slate-900">{item.patient}</span>
        </div>
      )
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('doctor')}>Doctor</div>,
      accessor: 'doctor',
      render: (item) => <span className="text-sm text-slate-600">{item.doctor}</span>
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('date')}>Date & Time</div>,
      accessor: 'date',
      render: (item) => (
        <div className="flex flex-col">
          <span className="text-sm text-slate-900 font-medium">{item.date}</span>
          <span className="text-xs text-slate-500">{item.time}</span>
        </div>
      )
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('type')}>Type</div>,
      accessor: 'type',
      render: (item) => <span className="text-sm text-slate-600">{item.type}</span>
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('status')}>Status</div>,
      accessor: 'status',
      render: (item) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(item.status)}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(item.status)}`}></div>
          {item.status}
        </span>
      )
    }
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Appointments</h1>
          <p className="text-slate-500 text-sm mt-1">View patient appointments and schedules.</p>
        </div>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="bg-white p-4 rounded-t-xl border border-slate-100 border-b-0 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search appointments..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Status:</span>
          </div>
          <select
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500 bg-slate-50"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          >
            <option value="All">All</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white rounded-b-xl border border-slate-100 border-t-0 shadow-sm overflow-hidden">
        <Table columns={columns} data={paginatedData} className="border-0 shadow-none rounded-none" />

        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <p className="text-sm text-slate-500">
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

export default Appointments;
