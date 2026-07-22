import React, { useState, useMemo } from 'react';
import {
  Search, Edit2, Trash2, Eye,
  Bell, Send, Plus, Megaphone,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import StatCard from '../../components/common/StatCard';

const MOCK_ANNOUNCEMENTS = Array.from({ length: 15 }, (_, i) => ({
  id: `ANN-${1000 + i}`,
  title: [
    'Q3 Regional Audit Schedule',
    'New Infection Control Guidelines',
    'Staff Training Seminar - August',
    'System Maintenance Notice',
    'Updated Leave Policy for Nurses'
  ][i % 5],
  target: i % 3 === 0 ? 'All Branches' : 'Specific Groups',
  type: i % 4 === 0 ? 'Urgent' : 'Standard',
  status: i % 5 === 0 ? 'Draft' : 'Published',
  isDeleted: false,
  date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
}));

const AnnouncementSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  target: Yup.string().required('Target audience is required'),
  type: Yup.string().required('Type is required'),
  status: Yup.string().required('Status is required'),
});

const Announcements = () => {
  const [data, setData] = useState(MOCK_ANNOUNCEMENTS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleSoftDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
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

  const openView = (record) => {
    setSelectedRecord(record);
    setIsViewOpen(true);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (selectedRecord) {
      setData(data.map(item => item.id === selectedRecord.id ? { ...values, id: item.id, date: item.date } : item));
    } else {
      setData([{ ...values, id: `ANN-${Math.floor(Math.random() * 9000) + 1000}`, isDeleted: false, date: new Date().toISOString().split('T')[0] }, ...data]);
    }
    setIsFormOpen(false);
    setSubmitting(false);
  };

  const filteredData = useMemo(() => {
    return data
      .filter(item => !item.isDeleted)
      .filter(item => statusFilter === 'All' ? true : item.status === statusFilter)
      .filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
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

  const columns = [
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('id')}>ID</div>,
      accessor: 'id',
      render: (ann) => <span className="font-medium text-slate-900">{ann.id}</span>
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('title')}>Announcement Title</div>,
      accessor: 'title',
      render: (ann) => <span className="text-sm font-semibold text-slate-900">{ann.title}</span>
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('target')}>Audience</div>,
      accessor: 'target',
      render: (ann) => (
        <span className="text-sm text-slate-600">{ann.target}</span>
      )
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('type')}>Priority</div>,
      accessor: 'type',
      render: (ann) => {
        const isUrgent = ann.type === 'Urgent';
        return (
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${isUrgent ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
            {ann.type}
          </span>
        )
      }
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('date')}>Date</div>,
      accessor: 'date',
      render: (ann) => <span className="text-sm text-slate-600">{ann.date}</span>
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('status')}>Status</div>,
      accessor: 'status',
      render: (ann) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${ann.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${ann.status === 'Published' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
          {ann.status}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (ann) => (
        <div className="flex items-center gap-2">
          <button onClick={() => openView(ann)} className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="View">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => openEdit(ann)} className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => handleSoftDelete(ann.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Announcements</h1>
          <p className="text-slate-500 text-sm mt-1">Broadcast important information to groups and branches.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button onClick={openCreate} className="w-full sm:w-auto flex justify-center items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm shadow-primary-600/20">
            <Send className="w-4 h-4" /> <span className="whitespace-nowrap">Create Broadcast</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Broadcasts" value={data.filter(d => !d.isDeleted).length} icon={Megaphone} colorTheme="blue" />
        <StatCard title="Published" value={data.filter(d => !d.isDeleted && d.status === 'Published').length} icon={Send} colorTheme="green" />
        <StatCard title="Drafts" value={data.filter(d => !d.isDeleted && d.status === 'Draft').length} icon={Edit2} colorTheme="orange" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex p-1 bg-slate-100 rounded-lg">
              {['All', 'Published', 'Draft'].map((status) => (
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
          <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-900">{((page - 1) * rowsPerPage) + 1}</span> to <span className="font-medium text-slate-900">{Math.min(page * rowsPerPage, filteredData.length)}</span> of <span className="font-medium text-slate-900">{filteredData.length}</span> results
            </div>
            <div className="flex items-center gap-1.5">
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

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={selectedRecord ? 'Edit Announcement' : 'Create Broadcast'} icon={Bell}>
        <Formik
          initialValues={selectedRecord || { title: '', target: 'All Branches', type: 'Standard', status: 'Draft' }}
          validationSchema={AnnouncementSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Announcement Title *</label>
                <Field name="title" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm" placeholder="e.g. System Maintenance" />
                <ErrorMessage name="title" component="div" className="text-rose-500 text-xs mt-1" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience *</label>
                  <Field as="select" name="target" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm">
                    <option value="All Branches">All Branches</option>
                    <option value="Specific Groups">Specific Groups</option>
                  </Field>
                  <ErrorMessage name="target" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Priority Type *</label>
                  <Field as="select" name="type" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm">
                    <option value="Standard">Standard</option>
                    <option value="Urgent">Urgent</option>
                  </Field>
                  <ErrorMessage name="type" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <Field as="select" name="status" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm">
                    <option value="Draft">Save as Draft</option>
                    <option value="Published">Publish Now</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-100">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm shadow-primary-600/20 disabled:opacity-50 flex items-center gap-2">
                  {selectedRecord ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Announcement Details" icon={Bell}>
        {selectedRecord && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">{selectedRecord.title}</h3>
              <p className="text-sm text-slate-500">{selectedRecord.id}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${selectedRecord.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${selectedRecord.status === 'Published' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                  {selectedRecord.status}
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${selectedRecord.type === 'Urgent' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-200 text-slate-700'}`}>
                  {selectedRecord.type}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-slate-500 mb-1">Target Audience</p><p className="text-sm font-medium text-slate-900">{selectedRecord.target}</p></div>
              <div><p className="text-xs text-slate-500 mb-1">Date Created</p><p className="text-sm font-medium text-slate-900">{selectedRecord.date}</p></div>
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

export default Announcements;
