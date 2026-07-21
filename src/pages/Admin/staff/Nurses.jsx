import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Plus, FileSpreadsheet, FileText, 
  MoreVertical, Edit2, Trash2, Eye, ShieldAlert, 
  ChevronLeft, ChevronRight, Activity, Users, UserCheck, UserX, Stethoscope
} from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import StatCard from '../../../components/common/StatCard';
import Table from '../../../components/common/Table';
import Modal from '../../../components/common/Modal';

const MOCK_DATA = Array.from({ length: 65 }, (_, i) => ({
  id: `NUR-${1000 + i}`,
  name: `Nurse ${['Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'][i % 8]} ${['A.', 'B.', 'C.', 'D.'][i % 4]}`,
  ward: ['ICU', 'Emergency', 'Pediatrics Ward', 'General Ward', 'Maternity'][i % 5],
  specialization: 'Staff Nurse',
  email: `nurse${i}@hospital.com`,
  phone: `+1 555-02${i.toString().padStart(2, '0')}`,
  status: i % 8 === 0 ? 'Inactive' : 'Active',
  isDeleted: false,
  createdBy: 'Admin User',
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
}));

const NurseSchema = Yup.object().shape({
  name: Yup.string().required('Full Name is required'),
  ward: Yup.string().required('Ward is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone Number is required'),
  status: Yup.string().required('Status is required'),
});

const Nurses = () => {
  const [data, setData] = useState(MOCK_DATA);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

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
    setSelectedRecord(null);
    setIsFormOpen(true);
  };

  const openEdit = (record) => {
    setSelectedRecord(record);
    setIsFormOpen(true);
  };

  const openView = (record) => {
    setSelectedRecord(record);
    setIsViewOpen(true);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (selectedRecord) {
      setData(data.map(item => item.id === selectedRecord.id ? { ...values, id: item.id } : item));
    } else {
      setData([{ ...values, id: `NUR-${Math.floor(Math.random() * 9000) + 1000}`, isDeleted: false, createdBy: 'Admin User', createdAt: new Date().toISOString().split('T')[0] }, ...data]);
    }
    setIsFormOpen(false);
    setSubmitting(false);
  };

  const filteredData = useMemo(() => {
    return data
      .filter(item => !item.isDeleted)
      .filter(item => statusFilter === 'All' ? true : item.status === statusFilter)
      .filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) || 
        item.ward.toLowerCase().includes(search.toLowerCase()) ||
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
  const totalInactive = data.filter(d => !d.isDeleted && d.status === 'Inactive').length;

  const columns = [
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('id')}>Nurse ID</div>,
      accessor: 'id',
      render: (nurse) => <span className="font-medium text-slate-900">{nurse.id}</span>
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('name')}>Name & Contact</div>,
      accessor: 'name',
      render: (nurse) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-900">{nurse.name}</span>
          <span className="text-xs text-slate-500">{nurse.email}</span>
        </div>
      )
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('ward')}>Ward</div>,
      accessor: 'ward',
      render: (nurse) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700">
          {nurse.ward}
        </span>
      )
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('createdAt')}>Added On</div>,
      accessor: 'createdAt',
      render: (nurse) => (
        <div className="flex flex-col">
          <span>{nurse.createdAt}</span>
          <span className="text-[10px] text-slate-400 uppercase">By {nurse.createdBy}</span>
        </div>
      )
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('status')}>Status</div>,
      accessor: 'status',
      render: (nurse) => (
        <button 
          onClick={() => handleToggleStatus(nurse.id)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
            nurse.status === 'Active' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${nurse.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
          {nurse.status}
        </button>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (nurse) => (
        <div className="flex items-center gap-2">
          <button onClick={() => openView(nurse)} className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="View Details">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => openEdit(nurse)} className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => handleSoftDelete(nurse.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Nurses Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage hospital nursing staff, shift allocations, and ward assignments.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button onClick={() => handleExport('excel')} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
            <FileSpreadsheet className="w-4 h-4 text-green-600" /> <span className="whitespace-nowrap">Export Excel</span>
          </button>
          <button onClick={() => handleExport('pdf')} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
            <FileText className="w-4 h-4 text-red-500" /> <span className="whitespace-nowrap">Export PDF</span>
          </button>
          <button onClick={openCreate} className="w-full sm:w-auto flex justify-center items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm shadow-primary-600/20">
            <Plus className="w-4 h-4" /> <span className="whitespace-nowrap">Add Nurse</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Nurses" value={data.filter(d => !d.isDeleted).length} icon={Users} colorTheme="blue" />
        <StatCard title="Active" value={totalActive} icon={UserCheck} colorTheme="green" />
        <StatCard title="Inactive" value={totalInactive} icon={UserX} colorTheme="rose" />
        <StatCard title="Audit Logs" value="View" icon={ShieldAlert} colorTheme="amber" />
      </div>

      <div className="bg-white p-4 rounded-t-xl border border-slate-100 border-b-0 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by ID, Name or Ward..." 
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

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedRecord ? 'Edit Nurse' : 'Add New Nurse'}
      >
        <Formik
          initialValues={selectedRecord || { name: '', ward: '', email: '', phone: '', status: 'Active' }}
          validationSchema={NurseSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <Field 
                    name="name" 
                    type="text" 
                    placeholder="e.g. Nurse Jane Doe"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.name && touched.name ? 'border-red-500' : 'border-slate-200'}`}
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ward Assignment</label>
                    <Field 
                      as="select" 
                      name="ward"
                      className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.ward && touched.ward ? 'border-red-500' : 'border-slate-200'}`}
                    >
                      <option value="">Select Ward...</option>
                      <option value="ICU">ICU</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Pediatrics Ward">Pediatrics Ward</option>
                      <option value="General Ward">General Ward</option>
                      <option value="Maternity">Maternity</option>
                    </Field>
                    <ErrorMessage name="ward" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <Field 
                      as="select" 
                      name="status"
                      className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.status && touched.status ? 'border-red-500' : 'border-slate-200'}`}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Field>
                    <ErrorMessage name="status" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <Field 
                    name="email" 
                    type="email" 
                    placeholder="nurse@hospital.com"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.email && touched.email ? 'border-red-500' : 'border-slate-200'}`}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <Field 
                    name="phone" 
                    type="text" 
                    placeholder="+1 555-0000"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.phone && touched.phone ? 'border-red-500' : 'border-slate-200'}`}
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsFormOpen(false)} 
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm shadow-primary-600/20 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? 'Saving...' : (selectedRecord ? 'Update Record' : 'Save Record')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Nurse Details"
      >
        {selectedRecord && (
          <div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xl font-bold">
                  {selectedRecord.name.charAt(6)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedRecord.name}</h3>
                  <p className="text-sm text-teal-600 font-medium">{selectedRecord.ward}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                <div>
                  <p className="text-slate-500 mb-1">Nurse ID</p>
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
        )}
      </Modal>

    </div>
  );
};

export default Nurses;
