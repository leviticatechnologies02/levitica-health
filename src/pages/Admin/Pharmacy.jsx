import React, { useState, useMemo } from 'react';
import {
  Search, Filter, Plus, FileSpreadsheet, FileText,
  MoreVertical, Edit2, Trash2, Eye, ShieldAlert,
  ChevronLeft, ChevronRight, Activity, Pill, AlertTriangle, CheckCircle, XCircle
} from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import StatCard from '../../components/common/StatCard';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';

const MOCK_DATA = Array.from({ length: 45 }, (_, i) => {
  const stock = Math.floor(Math.random() * 200);
  let status = 'In Stock';
  if (stock === 0) status = 'Out of Stock';
  else if (stock < 20) status = 'Low Stock';

  return {
    id: `DRUG-${1000 + i}`,
    name: ['Amoxicillin 500mg', 'Ibuprofen 400mg', 'Lisinopril 10mg', 'Metformin 500mg', 'Atorvastatin 20mg', 'Omeprazole 20mg', 'Azithromycin 250mg', 'Amlodipine 5mg'][i % 8],
    category: ['Antibiotic', 'Painkiller', 'Blood Pressure', 'Diabetes', 'Cholesterol', 'Antacid'][i % 6],
    stock: stock,
    price: `$${(Math.random() * 50 + 5).toFixed(2)}`,
    status: status,
    isDeleted: false,
    createdBy: 'Admin User',
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
  };
});

const DrugSchema = Yup.object().shape({
  name: Yup.string().required('Drug Name is required'),
  category: Yup.string().required('Category is required'),
  stock: Yup.number().min(0, 'Stock cannot be negative').required('Stock Level is required'),
  price: Yup.string().matches(/^\$\d+(\.\d{1,2})?$/, 'Must be a valid price, e.g., $15.00').required('Price is required'),
  status: Yup.string().required('Status is required'),
});

const Pharmacy = () => {
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

  const handleSoftDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
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
      setData([{ ...values, id: `DRUG-${Math.floor(Math.random() * 9000) + 1000}`, isDeleted: false, createdBy: 'Admin User', createdAt: new Date().toISOString().split('T')[0] }, ...data]);
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
        item.category.toLowerCase().includes(search.toLowerCase()) ||
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

  const totalDrugs = data.filter(d => !d.isDeleted).length;
  const inStock = data.filter(d => !d.isDeleted && d.status === 'In Stock').length;
  const lowStock = data.filter(d => !d.isDeleted && d.status === 'Low Stock').length;
  const outOfStock = data.filter(d => !d.isDeleted && d.status === 'Out of Stock').length;

  const columns = [
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('id')}>Drug ID</div>,
      accessor: 'id',
      render: (drug) => <span className="font-medium text-slate-900">{drug.id}</span>
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('name')}>Name & Category</div>,
      accessor: 'name',
      render: (drug) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-900">{drug.name}</span>
          <span className="text-xs text-slate-500">{drug.category}</span>
        </div>
      )
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('stock')}>Stock</div>,
      accessor: 'stock',
      render: (drug) => (
        <span className="font-medium text-slate-900">{drug.stock} units</span>
      )
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('price')}>Price</div>,
      accessor: 'price',
      render: (drug) => <span className="text-sm text-slate-600">{drug.price}</span>
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('status')}>Status</div>,
      accessor: 'status',
      render: (drug) => {
        let badgeColor = '';
        let dotColor = '';
        if (drug.status === 'In Stock') {
          badgeColor = 'bg-emerald-50 text-emerald-700';
          dotColor = 'bg-emerald-500';
        } else if (drug.status === 'Low Stock') {
          badgeColor = 'bg-amber-50 text-amber-700';
          dotColor = 'bg-amber-500';
        } else {
          badgeColor = 'bg-rose-50 text-rose-700';
          dotColor = 'bg-rose-500';
        }
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${badgeColor}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></div>
            {drug.status}
          </span>
        );
      }
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (drug) => (
        <div className="flex items-center gap-2">
          <button onClick={() => openView(drug)} className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="View Details">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => openEdit(drug)} className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => handleSoftDelete(drug.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Pharmacy Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage medicines, stock levels, and drug categories.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button onClick={() => handleExport('excel')} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
            <FileSpreadsheet className="w-4 h-4 text-green-600" /> <span className="whitespace-nowrap">Export Excel</span>
          </button>
          <button onClick={() => handleExport('pdf')} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
            <FileText className="w-4 h-4 text-red-500" /> <span className="whitespace-nowrap">Export PDF</span>
          </button>
          <button onClick={openCreate} className="w-full sm:w-auto flex justify-center items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm shadow-primary-600/20">
            <Plus className="w-4 h-4" /> <span className="whitespace-nowrap">Add Drug</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Medicines" value={totalDrugs} icon={Pill} colorTheme="blue" />
        <StatCard title="In Stock" value={inStock} icon={CheckCircle} colorTheme="green" />
        <StatCard title="Low Stock" value={lowStock} icon={AlertTriangle} colorTheme="amber" />
        <StatCard title="Out of Stock" value={outOfStock} icon={XCircle} colorTheme="rose" />
      </div>

      <div className="bg-white p-4 rounded-t-xl border border-slate-100 border-b-0 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, Name or Category..."
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
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500 bg-slate-50 w-full sm:w-auto"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          >
            <option value="All">All</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
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

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedRecord ? 'Edit Drug' : 'Add New Drug'}
      >
        <Formik
          initialValues={selectedRecord || { name: '', category: '', stock: 0, price: '$0.00', status: 'In Stock' }}
          validationSchema={DrugSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, setFieldValue, values }) => {

            // Auto-update status based on stock level
            React.useEffect(() => {
              if (values.stock === 0) {
                setFieldValue('status', 'Out of Stock');
              } else if (values.stock > 0 && values.stock < 20) {
                setFieldValue('status', 'Low Stock');
              } else {
                setFieldValue('status', 'In Stock');
              }
            }, [values.stock, setFieldValue]);

            return (
              <Form className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Drug Name</label>
                    <Field
                      name="name"
                      type="text"
                      placeholder="e.g. Amoxicillin 500mg"
                      className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.name && touched.name ? 'border-red-500' : 'border-slate-200'}`}
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <Field
                      as="select"
                      name="category"
                      className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.category && touched.category ? 'border-red-500' : 'border-slate-200'}`}
                    >
                      <option value="">Select Category...</option>
                      <option value="Antibiotic">Antibiotic</option>
                      <option value="Painkiller">Painkiller</option>
                      <option value="Blood Pressure">Blood Pressure</option>
                      <option value="Diabetes">Diabetes</option>
                      <option value="Cholesterol">Cholesterol</option>
                      <option value="Antacid">Antacid</option>
                    </Field>
                    <ErrorMessage name="category" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Stock Level</label>
                      <Field
                        name="stock"
                        type="number"
                        className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.stock && touched.stock ? 'border-red-500' : 'border-slate-200'}`}
                      />
                      <ErrorMessage name="stock" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                      <Field
                        name="price"
                        type="text"
                        placeholder="$0.00"
                        className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.price && touched.price ? 'border-red-500' : 'border-slate-200'}`}
                      />
                      <ErrorMessage name="price" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status (Auto-calculated)</label>
                    <Field
                      as="select"
                      name="status"
                      disabled
                      className={`w-full px-4 py-2 border rounded-lg text-sm bg-slate-50 text-slate-500 cursor-not-allowed outline-none ${errors.status && touched.status ? 'border-red-500' : 'border-slate-200'}`}
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </Field>
                    <ErrorMessage name="status" component="div" className="text-red-500 text-xs mt-1" />
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
                    {isSubmitting ? 'Saving...' : (selectedRecord ? 'Update Drug' : 'Add Drug')}
                  </button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </Modal>

      <Modal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Drug Details"
      >
        {selectedRecord && (
          <div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                  <Pill className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedRecord.name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{selectedRecord.category}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                <div>
                  <p className="text-slate-500 mb-1">Drug ID</p>
                  <p className="font-medium text-slate-900">{selectedRecord.id}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Status</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${selectedRecord.status === 'In Stock' ? 'bg-emerald-50 text-emerald-700' : selectedRecord.status === 'Low Stock' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>{selectedRecord.status}</span>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Stock Level</p>
                  <p className="font-medium text-slate-900">{selectedRecord.stock} units</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Unit Price</p>
                  <p className="font-medium text-slate-900">{selectedRecord.price}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Created At</p>
                  <p className="font-medium text-slate-900">{selectedRecord.createdAt}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Added By</p>
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

export default Pharmacy;
