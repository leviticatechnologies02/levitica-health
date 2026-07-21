import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Plus, Edit2, Trash2, DoorClosed,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Table from '../../../components/common/Table';
import Modal from '../../../components/common/Modal';

const MOCK_DATA = [
  { id: 'RM-101', number: '101', type: 'Private', ward: 'General Ward A', price: '$200/day', status: 'Available', isDeleted: false, createdAt: '2023-01-15' },
  { id: 'RM-102', number: '102', type: 'Semi-Private', ward: 'General Ward A', price: '$100/day', status: 'Occupied', isDeleted: false, createdAt: '2023-02-20' },
];

const RoomSchema = Yup.object().shape({
  number: Yup.string().required('Room Number is required'),
  type: Yup.string().required('Room Type is required'),
  ward: Yup.string().required('Ward is required'),
  price: Yup.string().required('Price is required'),
  status: Yup.string().required('Status is required'),
});

const Rooms = () => {
  const [data, setData] = useState(MOCK_DATA);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleToggleStatus = (id) => {
    setData(data.map(item => {
        if(item.id === id) {
            let newStatus = item.status === 'Active' ? 'Inactive' : (item.status === 'Available' ? 'Occupied' : (item.status === 'Occupied' ? 'Available' : 'Active'));
            return { ...item, status: newStatus };
        }
        return item;
    }));
  };

  const handleSoftDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this record?")) {
      setData(data.map(item => item.id === id ? { ...item, isDeleted: true } : item));
    }
  };

  const openCreate = () => {
    setSelectedRecord(null);
    setIsFormOpen(true);
  };

  const openEdit = (record) => {
    setSelectedRecord(record);
    setIsFormOpen(true);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (selectedRecord) {
      setData(data.map(item => item.id === selectedRecord.id ? { ...values, id: item.id, isDeleted: item.isDeleted, createdAt: item.createdAt } : item));
    } else {
      setData([{ ...values, id: `RM-${Math.floor(Math.random() * 900) + 100}`, isDeleted: false, createdAt: new Date().toISOString().split('T')[0] }, ...data]);
    }
    setIsFormOpen(false);
    setSubmitting(false);
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

  const columns = [
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('id')}>ID</div>,
      accessor: 'id',
      render: (item) => <span className="font-medium text-slate-900">{item.id}</span>
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('number')}>Room Number</div>,
      accessor: 'number',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
            <DoorClosed className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-slate-900">{item.number}</span>
        </div>
      )
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('type')}>Type</div>,
      accessor: 'type',
      render: (item) => <span className="text-sm text-slate-600">{item.type}</span>
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('ward')}>Ward</div>,
      accessor: 'ward',
      render: (item) => <span className="text-sm text-slate-600">{item.ward}</span>
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('price')}>Price</div>,
      accessor: 'price',
      render: (item) => <span className="text-sm text-slate-600">{item.price}</span>
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('status')}>Status</div>,
      accessor: 'status',
      render: (item) => (
        <button 
          onClick={() => handleToggleStatus(item.id)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
            item.status === 'Active' || item.status === 'Available' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Active' || item.status === 'Available' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
          {item.status}
        </button>
      )
    },
    {
      header: <div className="text-right">Actions</div>,
      accessor: 'actions',
      render: (item) => (
        <div className="flex items-center justify-end gap-2 group-hover:opacity-100 transition-opacity">
          <button onClick={() => openEdit(item)} className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => handleSoftDelete(item.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      
      {/* HEADER & ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Rooms Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage room allocations, types, and pricing configurations.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm shadow-primary-600/20">
            <Plus className="w-4 h-4" /> Create Record
          </button>
        </div>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="bg-white p-4 rounded-t-xl border border-slate-100 border-b-0 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search records..." 
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
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
          </select>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white rounded-b-xl border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
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

      {/* CREATE / EDIT MODAL */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedRecord ? 'Edit Record' : 'Create Record'}
      >
        <Formik
          initialValues={selectedRecord || { number: '', type: '', ward: '', price: '', status: 'Available' }}
          validationSchema={RoomSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Room Number</label>
                  <Field
                    name="number"
                    type="text"
                    placeholder="e.g. 101"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.number && touched.number ? 'border-red-500' : 'border-slate-200'}`}
                  />
                  <ErrorMessage name="number" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Room Type</label>
                  <Field
                    name="type"
                    type="text"
                    placeholder="e.g. Private"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.type && touched.type ? 'border-red-500' : 'border-slate-200'}`}
                  />
                  <ErrorMessage name="type" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ward</label>
                  <Field
                    name="ward"
                    type="text"
                    placeholder="e.g. General Ward A"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.ward && touched.ward ? 'border-red-500' : 'border-slate-200'}`}
                  />
                  <ErrorMessage name="ward" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                  <Field
                    name="price"
                    type="text"
                    placeholder="e.g. $200/day"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.price && touched.price ? 'border-red-500' : 'border-slate-200'}`}
                  />
                  <ErrorMessage name="price" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <Field
                    as="select"
                    name="status"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.status && touched.status ? 'border-red-500' : 'border-slate-200'}`}
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm shadow-primary-600/20 transition-colors disabled:opacity-70">
                  {isSubmitting ? 'Saving...' : (selectedRecord ? 'Update' : 'Create')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

    </div>
  );
};

export default Rooms;
