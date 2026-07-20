import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Plus, FileSpreadsheet, FileText, 
  MoreVertical, Edit2, Trash2, Eye, ShieldAlert, 
  ChevronLeft, ChevronRight, Activity, Users, UserCheck, UserX
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_DATA = Array.from({ length: 45 }, (_, i) => ({
  id: `DOC-${1000 + i}`,
  name: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'][i % 8]} ${['A.', 'B.', 'C.', 'D.'][i % 4]}`,
  department: ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'General Surgery'][i % 5],
  specialization: 'Senior Consultant',
  email: `doctor${i}@hospital.com`,
  phone: `+1 555-01${i.toString().padStart(2, '0')}`,
  status: i % 7 === 0 ? 'Inactive' : 'Active',
  isDeleted: false,
  createdBy: 'Admin User',
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
}));

const Doctors = () => {
  // --- STATE ---
  const [data, setData] = useState(MOCK_DATA);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Sorting
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Form State
  const [formData, setFormData] = useState({ name: '', department: '', email: '', phone: '', status: 'Active' });

  // --- HANDLERS ---
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleToggleStatus = (id) => {
    setData(data.map(item => item.id === id ? { ...item, status: item.status === 'Active' ? 'Inactive' : 'Active' } : item));
  };

  const handleSoftDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this record?")) {
      setData(data.map(item => item.id === id ? { ...item, isDeleted: true } : item));
    }
  };

  const handleExport = (format) => {
    alert(`Exporting data as ${format.toUpperCase()}... (Audit log recorded)`);
  };

  const openCreate = () => {
    setFormData({ name: '', department: '', email: '', phone: '', status: 'Active' });
    setSelectedRecord(null);
    setIsFormOpen(true);
  };

  const openEdit = (record) => {
    setFormData(record);
    setSelectedRecord(record);
    setIsFormOpen(true);
  };

  const openView = (record) => {
    setSelectedRecord(record);
    setIsViewOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (selectedRecord) {
      setData(data.map(item => item.id === selectedRecord.id ? { ...formData, id: item.id } : item));
    } else {
      setData([{ ...formData, id: `DOC-${Math.floor(Math.random() * 9000) + 1000}`, isDeleted: false, createdBy: 'Admin User', createdAt: new Date().toISOString().split('T')[0] }, ...data]);
    }
    setIsFormOpen(false);
  };

  // --- DERIVED DATA ---
  const filteredData = useMemo(() => {
    return data
      .filter(item => !item.isDeleted)
      .filter(item => statusFilter === 'All' ? true : item.status === statusFilter)
      .filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) || 
        item.department.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [data, search, statusFilter, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // --- DASHBOARD METRICS ---
  const totalActive = data.filter(d => !d.isDeleted && d.status === 'Active').length;
  const totalInactive = data.filter(d => !d.isDeleted && d.status === 'Inactive').length;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      
      {/* HEADER & ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Doctors Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage hospital doctors, roles, and access.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => handleExport('excel')} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
            <FileSpreadsheet className="w-4 h-4 text-green-600" /> Export Excel
          </button>
          <button onClick={() => handleExport('pdf')} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
            <FileText className="w-4 h-4 text-red-500" /> Export PDF
          </button>
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm shadow-primary-600/20">
            <Plus className="w-4 h-4" /> Add Doctor
          </button>
        </div>
      </div>

      {/* DASHBOARD METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Doctors</p>
            <p className="text-2xl font-bold text-slate-900">{data.filter(d => !d.isDeleted).length}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Active</p>
            <p className="text-2xl font-bold text-slate-900">{totalActive}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
            <UserX className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Inactive</p>
            <p className="text-2xl font-bold text-slate-900">{totalInactive}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Audit Logs</p>
            <p className="text-2xl font-bold text-slate-900">View</p>
          </div>
        </div>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="bg-white p-4 rounded-t-xl border border-slate-100 border-b-0 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by ID, Name or Dept..." 
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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white rounded-b-xl border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('id')}>Doctor ID</th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('name')}>Name & Contact</th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('department')}>Department</th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('createdAt')}>Added On</th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('status')}>Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.length > 0 ? paginatedData.map((doctor) => (
              <tr key={doctor.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">{doctor.id}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">{doctor.name}</span>
                    <span className="text-xs text-slate-500">{doctor.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                    {doctor.department}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  <div className="flex flex-col">
                    <span>{doctor.createdAt}</span>
                    <span className="text-[10px] text-slate-400 uppercase">By {doctor.createdBy}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleToggleStatus(doctor.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                      doctor.status === 'Active' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${doctor.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                    {doctor.status}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openView(doctor)} className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => openEdit(doctor)} className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleSoftDelete(doctor.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center">
                    <Search className="w-8 h-8 text-slate-300 mb-3" />
                    <p className="text-sm font-medium text-slate-900">No doctors found</p>
                    <p className="text-xs mt-1">Try adjusting your search or filters.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
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

      {/* CREATE / EDIT MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900">{selectedRecord ? 'Edit Doctor' : 'Add New Doctor'}</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Dr. John Doe" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                    <select required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                      <option value="">Select Dept...</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="General Surgery">General Surgery</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input required type="email" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="doctor@hospital.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+1 555-0000" />
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm shadow-primary-600/20 transition-colors">
                  {selectedRecord ? 'Update Record' : 'Save Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {isViewOpen && selectedRecord && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900">Doctor Details</h2>
              <button onClick={() => setIsViewOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-bold">
                  {selectedRecord.name.charAt(4)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedRecord.name}</h3>
                  <p className="text-sm text-indigo-600 font-medium">{selectedRecord.department}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                <div>
                  <p className="text-slate-500 mb-1">Doctor ID</p>
                  <p className="font-medium text-slate-900">{selectedRecord.id}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Status</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${selectedRecord.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{selectedRecord.status}</span>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Email</p>
                  <p className="font-medium text-slate-900">{selectedRecord.email}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Phone</p>
                  <p className="font-medium text-slate-900">{selectedRecord.phone}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Created At</p>
                  <p className="font-medium text-slate-900">{selectedRecord.createdAt}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Created By</p>
                  <p className="font-medium text-slate-900">{selectedRecord.createdBy}</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button onClick={() => setIsViewOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Doctors;
