import React, { useState, useMemo } from 'react';
import {
  Search, FileSpreadsheet, FileText, Edit2, Trash2, Eye,
  Building2, Users, UsersRound, CheckCircle2,
  ChevronLeft, ChevronRight, Plus
} from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSearchParams, useNavigate } from 'react-router-dom';
import StatCard from '../../components/common/StatCard';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';

const MOCK_BRANCHES = Array.from({ length: 45 }, (_, i) => ({
  id: `BRN-${1000 + i}`,
  name: `${['City Center', 'North Wing', 'South Medical', 'East Campus', 'West General'][i % 5]} Branch`,
  groupId: `GRP-${1000 + (i % 10)}`,
  groupName: `${['Apollo', 'Fortis', 'Max', 'Medanta', 'Manipal'][i % 5]} Healthcare Group`,
  adminCount: Math.floor(Math.random() * 3) + 1,
  patientCount: Math.floor(Math.random() * 500) + 50,
  email: `branch${i}@hospital.com`,
  phone: `+1 555-03${i.toString().padStart(2, '0')}`,
  status: i % 8 === 0 ? 'Inactive' : 'Active',
  isDeleted: false,
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
}));

const BranchSchema = Yup.object().shape({
  name: Yup.string().required('Branch Name is required'),
  groupId: Yup.string().required('Associated Group is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone Number is required'),
  status: Yup.string().required('Status is required'),
});

const Branches = () => {
  const [searchParams] = useSearchParams();
  const filterGroupId = searchParams.get('groupId');
  const navigate = useNavigate();

  const [data, setData] = useState(MOCK_BRANCHES);
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
    if (window.confirm("Are you sure you want to delete this branch?")) {
      setData(data.map(item => item.id === id ? { ...item, isDeleted: true } : item));
    }
  };

  const handleExport = (format) => {
    alert(`Exporting branches as ${format.toUpperCase()}...`);
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
      setData(data.map(item => item.id === selectedRecord.id ? { ...values, id: item.id, groupName: item.groupName, adminCount: item.adminCount, patientCount: item.patientCount, createdAt: item.createdAt } : item));
    } else {
      setData([{ ...values, id: `BRN-${Math.floor(Math.random() * 9000) + 1000}`, groupName: 'New Linked Group', adminCount: 0, patientCount: 0, isDeleted: false, createdAt: new Date().toISOString().split('T')[0] }, ...data]);
    }
    setIsFormOpen(false);
    setSubmitting(false);
  };

  const filteredData = useMemo(() => {
    return data
      .filter(item => !item.isDeleted)
      .filter(item => filterGroupId ? item.groupId === filterGroupId : true)
      .filter(item => statusFilter === 'All' ? true : item.status === statusFilter)
      .filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.groupName.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [data, search, statusFilter, sortConfig, filterGroupId]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const columns = [
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('id')}>Branch ID</div>,
      accessor: 'id',
      render: (branch) => <span className="font-medium text-slate-900">{branch.id}</span>
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('name')}>Branch Name & Contact</div>,
      accessor: 'name',
      render: (branch) => (
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-900">{branch.name}</span>
          <span className="text-xs text-slate-500">{branch.email} | {branch.phone}</span>
        </div>
      )
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('groupName')}>Parent Group</div>,
      accessor: 'groupName',
      render: (branch) => (
        <div className="flex flex-col cursor-pointer group" onClick={() => navigate(`/regionAdmin/groups`)}>
          <span className="text-sm font-medium text-primary-600 group-hover:underline">{branch.groupName}</span>
          <span className="text-xs text-slate-500">{branch.groupId}</span>
        </div>
      )
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('patientCount')}>Patients</div>,
      accessor: 'patientCount',
      render: (branch) => (
        <div className="flex items-center gap-2 cursor-pointer hover:text-primary-600 group" onClick={() => navigate(`/regionAdmin/patients?branchId=${branch.id}`)}>
          <UsersRound className="w-4 h-4 text-secondary-400 group-hover:text-primary-500" />
          <span className="text-sm font-medium underline decoration-primary-300 underline-offset-2">{branch.patientCount}</span>
        </div>
      )
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('adminCount')}>Admins</div>,
      accessor: 'adminCount',
      render: (branch) => (
        <div className="flex items-center gap-2 cursor-pointer hover:text-primary-600 group" onClick={() => navigate(`/regionAdmin/branch-admins?branchId=${branch.id}`)}>
          <Users className="w-4 h-4 text-secondary-400 group-hover:text-primary-500" />
          <span className="text-sm font-medium underline decoration-primary-300 underline-offset-2">{branch.adminCount}</span>
        </div>
      )
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('status')}>Status</div>,
      accessor: 'status',
      render: (branch) => (
        <button
          onClick={() => handleToggleStatus(branch.id)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${branch.status === 'Active' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${branch.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
          {branch.status}
        </button>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (branch) => (
        <div className="flex items-center gap-2">
          <button onClick={() => openView(branch)} className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="View Details">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => openEdit(branch)} className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => handleSoftDelete(branch.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Branches Management</h1>
          {filterGroupId ? (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-medium bg-primary-50 text-primary-600 px-2 py-1 rounded-md">Filtered by Group: {filterGroupId}</span>
              <button onClick={() => navigate('/regionAdmin/branches')} className="text-xs text-slate-500 hover:text-slate-900 underline">Clear Filter</button>
            </div>
          ) : (
            <p className="text-slate-500 text-sm mt-1">Manage individual hospital branches across the region.</p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button onClick={() => handleExport('excel')} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
            <FileSpreadsheet className="w-4 h-4 text-green-600" /> <span className="whitespace-nowrap">Export</span>
          </button>
          <button onClick={openCreate} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm shadow-primary-600/20">
            <Building2 className="w-4 h-4" /> <span className="whitespace-nowrap">Add Branch</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Branches" value={data.filter(d => !d.isDeleted).length} icon={Building2} colorTheme="blue" />
        <StatCard title="Active Branches" value={data.filter(d => !d.isDeleted && d.status === 'Active').length} icon={CheckCircle2} colorTheme="green" />
        <StatCard title="Total Patients" value={data.filter(d => !d.isDeleted).reduce((acc, curr) => acc + curr.patientCount, 0)} icon={UsersRound} colorTheme="purple" />
        <StatCard title="Total Admins" value={data.filter(d => !d.isDeleted).reduce((acc, curr) => acc + curr.adminCount, 0)} icon={Users} colorTheme="orange" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search branches..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex p-1 bg-slate-100 rounded-lg">
              {['All', 'Active', 'Inactive'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${statusFilter === status ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table columns={columns} data={paginatedData} />
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
            <div className="text-sm text-slate-500 text-center sm:text-left">
              Showing <span className="font-medium text-slate-900">{((page - 1) * rowsPerPage) + 1}</span> to <span className="font-medium text-slate-900">{Math.min(page * rowsPerPage, filteredData.length)}</span> of <span className="font-medium text-slate-900">{filteredData.length}</span> results
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === p ? 'bg-primary-600 text-white shadow-sm shadow-primary-600/20' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={selectedRecord ? 'Edit Branch' : 'Add New Branch'} icon={Building2}>
        <Formik
          initialValues={selectedRecord || { name: '', groupId: filterGroupId || '', email: '', phone: '', status: 'Active' }}
          validationSchema={BranchSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Branch Name *</label>
                  <Field name="name" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm" placeholder="Enter branch name" />
                  <ErrorMessage name="name" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Parent Group (ID) *</label>
                  <Field name="groupId" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm" placeholder="e.g. GRP-1001" />
                  <ErrorMessage name="groupId" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                  <Field type="email" name="email" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm" placeholder="branch@example.com" />
                  <ErrorMessage name="email" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                  <Field name="phone" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm" placeholder="+1 234 567 890" />
                  <ErrorMessage name="phone" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <Field as="select" name="status" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-100">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm shadow-primary-600/20 disabled:opacity-50 flex items-center gap-2">
                  {selectedRecord ? 'Save Changes' : 'Add Branch'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Branch Details" icon={Eye}>
        {selectedRecord && (
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xl shrink-0">
                {selectedRecord.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedRecord.name}</h3>
                <p className="text-sm text-slate-500">{selectedRecord.id}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  {selectedRecord.status}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-slate-500 mb-1">Email</p><p className="text-sm font-medium text-slate-900">{selectedRecord.email}</p></div>
              <div><p className="text-xs text-slate-500 mb-1">Phone</p><p className="text-sm font-medium text-slate-900">{selectedRecord.phone}</p></div>
              <div className="col-span-2">
                <p className="text-xs text-slate-500 mb-1">Parent Group</p>
                <p className="text-sm font-medium text-primary-600 cursor-pointer hover:underline" onClick={() => { setIsViewOpen(false); navigate('/regionAdmin/groups'); }}>
                  {selectedRecord.groupName} ({selectedRecord.groupId})
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Patients</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-900">{selectedRecord.patientCount} Patients</p>
                  <button onClick={() => { setIsViewOpen(false); navigate(`/regionAdmin/patients?branchId=${selectedRecord.id}`); }} className="text-xs text-primary-600 hover:underline">View</button>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Admins</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-900">{selectedRecord.adminCount} Admins</p>
                  <button onClick={() => { setIsViewOpen(false); navigate(`/regionAdmin/branch-admins?branchId=${selectedRecord.id}`); }} className="text-xs text-primary-600 hover:underline">View</button>
                </div>
              </div>
              <div className="col-span-2"><p className="text-xs text-slate-500 mb-1">Added On</p><p className="text-sm font-medium text-slate-900">{selectedRecord.createdAt}</p></div>
            </div>
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button onClick={() => setIsViewOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Branches;
