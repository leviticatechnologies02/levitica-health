import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Filter, Plus, Edit2, Trash2, Package,
  ChevronLeft, ChevronRight, CheckCircle, AlertTriangle, XCircle
} from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import StatCard from '../../components/common/StatCard';

const MOCK_DATA = [
  { id: 'INV-001', itemName: 'Surgical Masks (Box of 50)', category: 'PPE', quantity: 450, unit: 'Boxes', minStock: 100, location: 'Main Store', status: 'In Stock', isDeleted: false },
  { id: 'INV-002', itemName: 'Latex Gloves (Large)', category: 'PPE', quantity: 20, unit: 'Boxes', minStock: 50, location: 'Ward A Storage', status: 'Low Stock', isDeleted: false },
  { id: 'INV-003', itemName: 'IV Fluids (500ml)', category: 'Consumables', quantity: 0, unit: 'Bags', minStock: 200, location: 'Emergency Store', status: 'Out of Stock', isDeleted: false },
  { id: 'INV-004', itemName: 'Gauze Pads (Sterile)', category: 'Surgical', quantity: 800, unit: 'Packs', minStock: 100, location: 'Main Store', status: 'In Stock', isDeleted: false },
  { id: 'INV-005', itemName: 'Defibrillator Pads', category: 'Equipment', quantity: 15, unit: 'Pairs', minStock: 20, location: 'Emergency Store', status: 'Low Stock', isDeleted: false },
];

const InventorySchema = Yup.object().shape({
  itemName: Yup.string().required('Item Name is required'),
  category: Yup.string().required('Category is required'),
  quantity: Yup.number().min(0, 'Quantity cannot be negative').required('Quantity is required'),
  unit: Yup.string().required('Unit is required'),
  minStock: Yup.number().min(0, 'Min Stock cannot be negative').required('Minimum Stock is required'),
  location: Yup.string().required('Location is required'),
  status: Yup.string().required('Status is required'),
});

const Inventory = () => {
  const [data, setData] = useState(MOCK_DATA);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: 'itemName', direction: 'asc' });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleSoftDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this item?")) {
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
      setData([{ ...values, id: `INV-00${Math.floor(Math.random() * 900) + 100}`, isDeleted: false }, ...data]);
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

  const totalItems = data.filter(d => !d.isDeleted).length;
  const inStock = data.filter(d => !d.isDeleted && d.status === 'In Stock').length;
  const lowStock = data.filter(d => !d.isDeleted && d.status === 'Low Stock').length;
  const outOfStock = data.filter(d => !d.isDeleted && d.status === 'Out of Stock').length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Low Stock':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Out of Stock':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-emerald-500';
      case 'Low Stock': return 'bg-amber-500';
      case 'Out of Stock': return 'bg-rose-500';
      default: return 'bg-slate-400';
    }
  };

  const columns = [
    { header: 'Item ID', accessor: 'id' },
    { 
      header: 'Item Name', 
      accessor: 'itemName',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
            <Package className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-slate-900">{item.itemName}</span>
        </div>
      )
    },
    { header: 'Category', accessor: 'category' },
    { 
      header: 'Quantity', 
      accessor: 'quantity',
      render: (item) => <span className="text-sm text-slate-600">{item.quantity} {item.unit}</span>
    },
    { 
      header: 'Min Stock', 
      accessor: 'minStock',
      render: (item) => <span className="text-sm text-slate-500">{item.minStock} {item.unit}</span>
    },
    { header: 'Location', accessor: 'location' },
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
      header: 'Actions', 
      accessor: 'actions',
      render: (item) => (
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Inventory Management</h1>
          <p className="text-slate-500 text-sm mt-1">Track medical supplies, equipment, and consumables.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm shadow-primary-600/20">
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Items" value={totalItems} icon={Package} colorTheme="blue" />
        <StatCard title="In Stock" value={inStock} icon={CheckCircle} colorTheme="green" />
        <StatCard title="Low Stock" value={lowStock} icon={AlertTriangle} colorTheme="amber" />
        <StatCard title="Out of Stock" value={outOfStock} icon={XCircle} colorTheme="rose" />
      </div>

      {/* FILTERS & SEARCH */}
      <div className="bg-white p-4 rounded-t-xl border border-slate-100 border-b-0 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search items..." 
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
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
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

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedRecord ? 'Edit Item' : 'Add Item'}
      >
        <Formik
          initialValues={selectedRecord || { itemName: '', category: '', quantity: 0, unit: '', minStock: 0, location: '', status: 'In Stock' }}
          validationSchema={InventorySchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, values, setFieldValue }) => {
            
            // Auto-update status
            useEffect(() => {
              if (values.quantity === 0) {
                setFieldValue('status', 'Out of Stock');
              } else if (values.quantity <= values.minStock) {
                setFieldValue('status', 'Low Stock');
              } else {
                setFieldValue('status', 'In Stock');
              }
            }, [values.quantity, values.minStock, setFieldValue]);

            return (
              <Form className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Item Name</label>
                    <Field
                      name="itemName"
                      type="text"
                      placeholder="e.g. Surgical Masks (Box of 50)"
                      className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.itemName && touched.itemName ? 'border-red-500' : 'border-slate-200'}`}
                    />
                    <ErrorMessage name="itemName" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                      <Field
                        as="select"
                        name="category"
                        className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.category && touched.category ? 'border-red-500' : 'border-slate-200'}`}
                      >
                        <option value="">Select Category...</option>
                        <option value="PPE">PPE</option>
                        <option value="Consumables">Consumables</option>
                        <option value="Surgical">Surgical</option>
                        <option value="Equipment">Equipment</option>
                      </Field>
                      <ErrorMessage name="category" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
                      <Field
                        name="unit"
                        type="text"
                        placeholder="e.g. Boxes, Packs"
                        className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.unit && touched.unit ? 'border-red-500' : 'border-slate-200'}`}
                      />
                      <ErrorMessage name="unit" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Current Quantity</label>
                      <Field
                        name="quantity"
                        type="number"
                        className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.quantity && touched.quantity ? 'border-red-500' : 'border-slate-200'}`}
                      />
                      <ErrorMessage name="quantity" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Min Stock Alert Level</label>
                      <Field
                        name="minStock"
                        type="number"
                        className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.minStock && touched.minStock ? 'border-red-500' : 'border-slate-200'}`}
                      />
                      <ErrorMessage name="minStock" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Location / Ward</label>
                    <Field
                      name="location"
                      type="text"
                      placeholder="e.g. Main Store"
                      className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.location && touched.location ? 'border-red-500' : 'border-slate-200'}`}
                    />
                    <ErrorMessage name="location" component="div" className="text-red-500 text-xs mt-1" />
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
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-sm shadow-primary-600/20 transition-colors disabled:opacity-70">
                    {isSubmitting ? 'Saving...' : (selectedRecord ? 'Update Item' : 'Add Item')}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>

    </div>
  );
};

export default Inventory;
