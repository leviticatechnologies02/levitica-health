import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Plus, FileSpreadsheet, FileText, 
  MoreVertical, Edit2, Trash2, Eye, ShieldAlert, 
  ChevronLeft, ChevronRight, Activity, HeartPulse
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_DATA = [
  { id: 'DEPT-001', name: 'Cardiology', head: 'Dr. Smith A.', contact: '+1 555-0101', status: 'Active', isDeleted: false, createdAt: '2023-01-15' },
  { id: 'DEPT-002', name: 'Neurology', head: 'Dr. Johnson B.', contact: '+1 555-0102', status: 'Active', isDeleted: false, createdAt: '2023-02-20' },
  { id: 'DEPT-003', name: 'Pediatrics', head: 'Dr. Williams C.', contact: '+1 555-0103', status: 'Active', isDeleted: false, createdAt: '2023-03-10' },
  { id: 'DEPT-004', name: 'Orthopedics', head: 'Dr. Brown D.', contact: '+1 555-0104', status: 'Inactive', isDeleted: false, createdAt: '2023-04-05' },
  { id: 'DEPT-005', name: 'General Surgery', head: 'Dr. Jones A.', contact: '+1 555-0105', status: 'Active', isDeleted: false, createdAt: '2023-05-12' },
];

const Departments = () => {
  const [data, setData] = useState(MOCK_DATA);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formData, setFormData] = useState({ name: '', head: '', contact: '', status: 'Active' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleToggleStatus = (id) => {
    setData(data.map(item => item.id === id ? { ...item, status: item.status === 'Active' ? 'Inactive' : 'Active' } : item));
  };

  const handleSoftDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this department?")) {
      setData(data.map(item => item.id === id ? { ...item, isDeleted: true } : item));
    }
  };

  const openCreate = () => {
    setFormData({ name: '', head: '', contact: '', status: 'Active' });
    setSelectedRecord(null);
    setIsFormOpen(true);
  };

  const openEdit = (record) => {
    setFormData(record);
    setSelectedRecord(record);
    setIsFormOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (selectedRecord) {
      setData(data.map(item => item.id === selectedRecord.id ? { ...formData, id: item.id, isDeleted: item.isDeleted, createdAt: item.createdAt } : item));
    } else {
      setData([{ ...formData, id: `DEPT-00${Math.floor(Math.random() * 9) + 6}`, isDeleted: false, createdAt: new Date().toISOString().split('T')[0] }, ...data]);
    }
    setIsFormOpen(false);
  };

  const filteredData = useMemo(() => {
    return data
      .filter(item => !item.isDeleted)
      .filter(item => statusFilter === 'All' ? true : item.status === statusFilter)
      .filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) || 
        item.head.toLowerCase().includes(search.toLowerCase()) ||
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

  const totalActive = data.filter(d => !d.isDeleted && d.status === 'Active').length;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      
      {/* HEADER & ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Departments Management</h1>
          <p className="text-slate-500 text-sm mt-1">Configure and manage hospital medical departments.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm shadow-primary-600/20">
            <Plus className="w-4 h-4" /> Create Department
          </button>
        </div>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="bg-white p-4 rounded-t-xl border border-slate-100 border-b-0 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search departments..." 
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
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('id')}>Dept ID</th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('name')}>Department Name</th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('head')}>Head of Dept (HOD)</th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('createdAt')}>Created On</th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('status')}>Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.length > 0 ? paginatedData.map((dept) => (
              <tr key={dept.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">{dept.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                      <HeartPulse className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-900">{dept.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">{dept.head}</span>
                    <span className="text-xs text-slate-500">{dept.contact}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{dept.createdAt}</td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleToggleStatus(dept.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                      dept.status === 'Active' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${dept.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                    {dept.status}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(dept)} className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleSoftDelete(dept.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                  <p className="text-sm font-medium text-slate-900">No departments found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900">{selectedRecord ? 'Edit Department' : 'Create Department'}</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department Name</label>
                  <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Cardiology" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Head of Department</label>
                  <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" value={formData.head} onChange={e => setFormData({...formData, head: e.target.value})} placeholder="e.g. Dr. John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
                  <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} placeholder="+1 555-0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm shadow-primary-600/20 transition-colors">
                  {selectedRecord ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Departments;
