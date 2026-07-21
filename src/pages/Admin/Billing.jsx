import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Plus, Edit2, Trash2, Receipt,
  DollarSign, Clock, AlertTriangle, CreditCard, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import StatCard from '../../components/common/StatCard';

const MOCK_DATA = [
  { id: 'INV-2023-001', patient: 'John Doe', date: '2023-10-15', amount: 450.00, invoiceType: 'Consultation', paymentMethod: 'Credit Card', status: 'Paid', isDeleted: false },
  { id: 'INV-2023-002', patient: 'Jane Smith', date: '2023-10-16', amount: 120.00, invoiceType: 'Pharmacy', paymentMethod: 'N/A', status: 'Pending', isDeleted: false },
  { id: 'INV-2023-003', patient: 'Michael Johnson', date: '2023-09-28', amount: 3200.00, invoiceType: 'Surgery', paymentMethod: 'Insurance', status: 'Overdue', isDeleted: false },
  { id: 'INV-2023-004', patient: 'Emily Davis', date: '2023-10-18', amount: 85.00, invoiceType: 'Lab', paymentMethod: 'Cash', status: 'Paid', isDeleted: false },
];

const BillingSchema = Yup.object().shape({
  patient: Yup.string().required('Patient Name is required'),
  date: Yup.date().required('Date is required'),
  amount: Yup.number().min(0, 'Amount cannot be negative').required('Amount is required'),
  invoiceType: Yup.string().required('Invoice Type is required'),
  paymentMethod: Yup.string().required('Payment Method is required'),
  status: Yup.string().required('Status is required'),
});

const Billing = () => {
  const [data, setData] = useState(MOCK_DATA);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleSoftDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this invoice?")) {
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
      setData(data.map(item => item.id === selectedRecord.id ? { ...values, id: item.id, isDeleted: item.isDeleted } : item));
    } else {
      setData([{ ...values, id: `INV-2023-0${Math.floor(Math.random() * 900) + 100}`, isDeleted: false }, ...data]);
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

  const totalRevenue = data.filter(d => !d.isDeleted && d.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
  const pendingAmount = data.filter(d => !d.isDeleted && d.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0);
  const overdueAmount = data.filter(d => !d.isDeleted && d.status === 'Overdue').reduce((acc, curr) => acc + curr.amount, 0);
  const totalInvoices = data.filter(d => !d.isDeleted).length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Overdue':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-500';
      case 'Pending': return 'bg-amber-500';
      case 'Overdue': return 'bg-rose-500';
      default: return 'bg-slate-400';
    }
  };

  const columns = [
    {
      header: 'Invoice ID',
      accessor: 'id',
      render: (item) => <span className="font-medium text-slate-900">{item.id}</span>
    },
    {
      header: 'Patient',
      accessor: 'patient',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
            <Receipt className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-slate-900">{item.patient}</span>
        </div>
      )
    },
    { header: 'Date', accessor: 'date' },
    { header: 'Type', accessor: 'invoiceType' },
    { 
      header: 'Amount', 
      accessor: 'amount',
      render: (item) => <span className="font-medium text-slate-900">${item.amount.toFixed(2)}</span>
    },
    { header: 'Payment Method', accessor: 'paymentMethod' },
    {
      header: 'Status',
      accessor: 'status',
      render: (item) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(item.status)}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(item.status)}`}></div>
          {item.status}
        </span>
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
      
      {/* DEV NOTE */}
      <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl mb-6">
        <h3 className="text-indigo-800 font-semibold mb-1">Module Note: Billing & Invoicing</h3>
        <p className="text-indigo-600 text-sm"><strong>Flow/Usefulness:</strong> An integrated billing system auto-generates invoices based on pharmacy, lab, and consultation records. It ensures financial accuracy, speeds up insurance claims processing, and provides a transparent financial breakdown for patients.</p>
      </div>

      {/* HEADER & ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Billing & Invoicing</h1>
          <p className="text-slate-500 text-sm mt-1">Manage patient invoices and payments.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm shadow-primary-600/20">
            <Plus className="w-4 h-4" /> Create Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Invoices" value={totalInvoices} icon={Receipt} colorTheme="blue" />
        <StatCard title="Revenue (Paid)" value={`$${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} icon={DollarSign} colorTheme="emerald" />
        <StatCard title="Pending Amount" value={`$${pendingAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} icon={Clock} colorTheme="amber" />
        <StatCard title="Overdue Amount" value={`$${overdueAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} icon={AlertTriangle} colorTheme="rose" />
      </div>

      {/* FILTERS & SEARCH */}
      <div className="bg-white p-4 rounded-t-xl border border-slate-100 border-b-0 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search invoices..." 
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
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
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

      {/* CREATE / EDIT MODAL */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedRecord ? 'Edit Invoice' : 'Create Invoice'}
      >
        <Formik
          initialValues={selectedRecord || { patient: '', date: '', amount: 0, invoiceType: 'Consultation', paymentMethod: 'N/A', status: 'Pending' }}
          validationSchema={BillingSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, values, setFieldValue }) => (
            <Form className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
                  <Field
                    name="patient"
                    type="text"
                    placeholder="e.g. John Doe"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.patient && touched.patient ? 'border-red-500' : 'border-slate-200'}`}
                  />
                  <ErrorMessage name="patient" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                    <Field
                      name="date"
                      type="date"
                      className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.date && touched.date ? 'border-red-500' : 'border-slate-200'}`}
                    />
                    <ErrorMessage name="date" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Amount ($)</label>
                    <Field
                      name="amount"
                      type="number"
                      step="0.01"
                      className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.amount && touched.amount ? 'border-red-500' : 'border-slate-200'}`}
                    />
                    <ErrorMessage name="amount" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Invoice Type</label>
                    <Field
                      as="select"
                      name="invoiceType"
                      className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.invoiceType && touched.invoiceType ? 'border-red-500' : 'border-slate-200'}`}
                    >
                      <option value="Consultation">Consultation</option>
                      <option value="Pharmacy">Pharmacy</option>
                      <option value="Lab">Lab Test</option>
                      <option value="Surgery">Surgery</option>
                      <option value="Room">Room/Ward</option>
                    </Field>
                    <ErrorMessage name="invoiceType" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Payment Method</label>
                    <Field
                      as="select"
                      name="paymentMethod"
                      className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.paymentMethod && touched.paymentMethod ? 'border-red-500' : 'border-slate-200'}`}
                    >
                      <option value="N/A">N/A (Pending)</option>
                      <option value="Cash">Cash</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Insurance">Insurance</option>
                    </Field>
                    <ErrorMessage name="paymentMethod" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <Field
                    as="select"
                    name="status"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.status && touched.status ? 'border-red-500' : 'border-slate-200'}`}
                    onChange={(e) => {
                      setFieldValue('status', e.target.value);
                      if (e.target.value === 'Paid' && values.paymentMethod === 'N/A') {
                        setFieldValue('paymentMethod', 'Cash'); // Auto update default
                      }
                    }}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm shadow-primary-600/20 transition-colors disabled:opacity-70">
                  {isSubmitting ? 'Saving...' : (selectedRecord ? 'Update' : 'Create Invoice')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

    </div>
  );
};

export default Billing;
