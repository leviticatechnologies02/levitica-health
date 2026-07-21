import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Plus, Edit2, Trash2, Megaphone,
  Bell, AlertCircle, Clock, CheckCircle2, ChevronLeft, ChevronRight, Eye
} from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import StatCard from '../../components/common/StatCard';

const MOCK_DATA = [
  { id: 'ANN-001', title: 'New COVID-19 Protocols', content: 'Please adhere to the new PPE guidelines in Ward B.', targetAudience: 'All Staff', priority: 'High', status: 'Active', datePosted: '2023-10-10', isDeleted: false },
  { id: 'ANN-002', title: 'Server Maintenance Downtime', content: 'The main hospital portal will be down from 2 AM to 4 AM on Sunday.', targetAudience: 'Doctors', priority: 'Normal', status: 'Draft', datePosted: '2023-10-15', isDeleted: false },
  { id: 'ANN-003', title: 'Flu Vaccination Drive', content: 'Free flu shots available for all patients this week.', targetAudience: 'Patients', priority: 'Low', status: 'Expired', datePosted: '2023-09-01', isDeleted: false },
  { id: 'ANN-004', title: 'Emergency Drill Schedule', content: 'Mandatory fire drill this Friday at 10 AM.', targetAudience: 'Nurses', priority: 'Urgent', status: 'Active', datePosted: '2023-10-18', isDeleted: false },
];

const AnnouncementSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  targetAudience: Yup.string().required('Target Audience is required'),
  priority: Yup.string().required('Priority is required'),
  status: Yup.string().required('Status is required'),
});

const Announcements = () => {
  const [data, setData] = useState(MOCK_DATA);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: 'datePosted', direction: 'desc' });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleSoftDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this announcement?")) {
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
      setData(data.map(item => item.id === selectedRecord.id ? { ...values, id: item.id, datePosted: item.datePosted, isDeleted: item.isDeleted } : item));
    } else {
      setData([{ ...values, id: `ANN-00${Math.floor(Math.random() * 90) + 10}`, datePosted: new Date().toISOString().split('T')[0], isDeleted: false }, ...data]);
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
        item.targetAudience.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [data, search, statusFilter, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const totalAnnouncements = data.filter(d => !d.isDeleted).length;
  const activeAnnouncements = data.filter(d => !d.isDeleted && d.status === 'Active').length;
  const urgentPriority = data.filter(d => !d.isDeleted && (d.priority === 'Urgent' || d.priority === 'High')).length;
  const draftAnnouncements = data.filter(d => !d.isDeleted && d.status === 'Draft').length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Draft': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Expired': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Urgent': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'High': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Normal': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Low': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const columns = [
    {
      header: 'ID',
      accessor: 'id',
      render: (item) => <span className="font-medium text-slate-900">{item.id}</span>
    },
    {
      header: 'Title',
      accessor: 'title',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
            <Megaphone className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-slate-900">{item.title}</span>
        </div>
      )
    },
    { header: 'Audience', accessor: 'targetAudience' },
    { 
      header: 'Priority', 
      accessor: 'priority',
      render: (item) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityBadge(item.priority)}`}>
          {item.priority}
        </span>
      )
    },
    { header: 'Date Posted', accessor: 'datePosted' },
    {
      header: 'Status',
      accessor: 'status',
      render: (item) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(item.status)}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Active' ? 'bg-emerald-500' : (item.status === 'Draft' ? 'bg-slate-500' : 'bg-amber-500')}`}></div>
          {item.status}
        </span>
      )
    },
    {
      header: <div className="text-right">Actions</div>,
      accessor: 'actions',
      render: (item) => (
        <div className="flex items-center justify-end gap-2 group-hover:opacity-100 transition-opacity">
          <button onClick={() => openView(item)} className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="View">
            <Eye className="w-4 h-4" />
          </button>
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 mt-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Announcements</h1>
          <p className="text-slate-500 text-sm mt-1">Broadcast important notices to hospital staff and patients.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm shadow-primary-600/20">
            <Plus className="w-4 h-4" /> New Announcement
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Announcements" value={totalAnnouncements} icon={Bell} colorTheme="blue" />
        <StatCard title="Active" value={activeAnnouncements} icon={CheckCircle2} colorTheme="emerald" />
        <StatCard title="High Priority" value={urgentPriority} icon={AlertCircle} colorTheme="rose" />
        <StatCard title="Drafts" value={draftAnnouncements} icon={Clock} colorTheme="amber" />
      </div>

      {/* FILTERS & SEARCH */}
      <div className="bg-white p-4 rounded-t-xl border border-slate-100 border-b-0 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search announcements..." 
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
            <option value="Draft">Draft</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
      </div>

      {/* DATA TABLE */}
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

      {/* VIEW MODAL */}
      <Modal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Announcement Details"
      >
        {selectedRecord && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{selectedRecord.title}</h3>
              <div className="flex items-center gap-3 text-sm">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium border ${getPriorityBadge(selectedRecord.priority)}`}>
                  {selectedRecord.priority} Priority
                </span>
                <span className="text-slate-500">Target: <span className="font-medium text-slate-700">{selectedRecord.targetAudience}</span></span>
                <span className="text-slate-500">Date: <span className="font-medium text-slate-700">{selectedRecord.datePosted}</span></span>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-slate-700 whitespace-pre-wrap">
              {selectedRecord.content}
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setIsViewOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Close</button>
            </div>
          </div>
        )}
      </Modal>

      {/* CREATE / EDIT MODAL */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedRecord ? 'Edit Announcement' : 'Create Announcement'}
      >
        <Formik
          initialValues={selectedRecord || { title: '', content: '', targetAudience: 'All Staff', priority: 'Normal', status: 'Active' }}
          validationSchema={AnnouncementSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <Field
                    name="title"
                    type="text"
                    placeholder="e.g. Server Maintenance Downtime"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.title && touched.title ? 'border-red-500' : 'border-slate-200'}`}
                  />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
                    <Field
                      as="select"
                      name="targetAudience"
                      className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.targetAudience && touched.targetAudience ? 'border-red-500' : 'border-slate-200'}`}
                    >
                      <option value="All Staff">All Staff</option>
                      <option value="Doctors">Doctors</option>
                      <option value="Nurses">Nurses</option>
                      <option value="Patients">Patients</option>
                    </Field>
                    <ErrorMessage name="targetAudience" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                    <Field
                      as="select"
                      name="priority"
                      className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.priority && touched.priority ? 'border-red-500' : 'border-slate-200'}`}
                    >
                      <option value="Low">Low</option>
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </Field>
                    <ErrorMessage name="priority" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Announcement Content</label>
                  <Field
                    as="textarea"
                    name="content"
                    rows="4"
                    placeholder="Write your message here..."
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none resize-none ${errors.content && touched.content ? 'border-red-500' : 'border-slate-200'}`}
                  />
                  <ErrorMessage name="content" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <Field
                    as="select"
                    name="status"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.status && touched.status ? 'border-red-500' : 'border-slate-200'}`}
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Expired">Expired</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm shadow-primary-600/20 transition-colors disabled:opacity-70">
                  {isSubmitting ? 'Saving...' : (selectedRecord ? 'Update' : 'Post Announcement')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

    </div>
  );
};

export default Announcements;
