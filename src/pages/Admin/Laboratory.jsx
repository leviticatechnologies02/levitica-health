import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Plus, Edit2, Trash2, FlaskConical, 
  Activity, Clock, AlertCircle, DollarSign, ClipboardList,
  ChevronLeft, ChevronRight, CheckCircle2, XCircle
} from 'lucide-react';
import Table from '../../components/common/Table';
import StatCard from '../../components/common/StatCard';

const MOCK_CATALOG = [
  { id: 'LAB-001', testName: 'Complete Blood Count', category: 'Hematology', price: '$45.00', tat: '24 Hours', status: 'Active', isDeleted: false },
  { id: 'LAB-002', testName: 'Lipid Panel', category: 'Biochemistry', price: '$60.00', tat: '12 Hours', status: 'Active', isDeleted: false },
  { id: 'LAB-003', testName: 'COVID-19 RT-PCR', category: 'Microbiology', price: '$80.00', tat: '48 Hours', status: 'Inactive', isDeleted: false },
];

const MOCK_ORDERS = [
  { id: 'ORD-101', patient: 'Sarah Connor', testName: 'Complete Blood Count', doctor: 'Dr. Smith A.', date: '2023-10-24', status: 'Completed', result: 'Normal', isDeleted: false },
  { id: 'ORD-102', patient: 'John Doe', testName: 'Lipid Panel', doctor: 'Dr. Johnson B.', date: '2023-10-25', status: 'Pending', result: '-', isDeleted: false },
  { id: 'ORD-103', patient: 'Emily Chen', testName: 'COVID-19 RT-PCR', doctor: 'Dr. Williams C.', date: '2023-10-25', status: 'Critical', result: 'Positive', isDeleted: false },
  { id: 'ORD-104', patient: 'Michael Chang', testName: 'Liver Function Test', doctor: 'Dr. Smith A.', date: '2023-10-25', status: 'Pending', result: '-', isDeleted: false },
];

const Laboratory = () => {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'catalog'
  
  // Catalog State
  const [catalogData, setCatalogData] = useState(MOCK_CATALOG);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogStatusFilter, setCatalogStatusFilter] = useState('All');
  
  // Orders State
  const [ordersData, setOrdersData] = useState(MOCK_ORDERS);
  const [ordersSearch, setOrdersSearch] = useState('');
  const [ordersStatusFilter, setOrdersStatusFilter] = useState('All');

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  
  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const initialForm = { testName: '', category: '', price: '', tat: '', status: 'Active' };
  const [formData, setFormData] = useState(initialForm);

  // Stats
  const stats = [
    { title: 'Total Orders', value: '24', icon: ClipboardList, colorTheme: 'blue', trendLabel: 'vs yesterday' },
    { title: 'Pending Results', value: '8', icon: Clock, colorTheme: 'orange', trendLabel: 'vs yesterday' },
    { title: 'Critical Alerts', value: '2', icon: AlertCircle, colorTheme: 'rose', trendLabel: 'vs yesterday' },
    { title: 'Catalog Tests', value: catalogData.length.toString(), icon: FlaskConical, colorTheme: 'green' },
  ];

  // --- Catalog Handlers ---
  const handleSoftDeleteCatalog = (id) => {
    if(window.confirm("Are you sure you want to delete this test?")) {
      setCatalogData(catalogData.map(item => item.id === id ? { ...item, isDeleted: true } : item));
    }
  };

  const openCreate = () => {
    setFormData(initialForm);
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
      setCatalogData(catalogData.map(item => item.id === selectedRecord.id ? { ...formData, id: item.id, isDeleted: item.isDeleted } : item));
    } else {
      setCatalogData([{ ...formData, id: `LAB-00${Math.floor(Math.random() * 90) + 10}`, isDeleted: false }, ...catalogData]);
    }
    setIsFormOpen(false);
  };

  // --- Filtering & Pagination ---
  const filteredCatalog = useMemo(() => {
    return catalogData
      .filter(item => !item.isDeleted)
      .filter(item => catalogStatusFilter === 'All' ? true : item.status === catalogStatusFilter)
      .filter(item => Object.values(item).some(val => String(val).toLowerCase().includes(catalogSearch.toLowerCase())));
  }, [catalogData, catalogSearch, catalogStatusFilter]);

  const filteredOrders = useMemo(() => {
    return ordersData
      .filter(item => !item.isDeleted)
      .filter(item => ordersStatusFilter === 'All' ? true : item.status === ordersStatusFilter)
      .filter(item => Object.values(item).some(val => String(val).toLowerCase().includes(ordersSearch.toLowerCase())));
  }, [ordersData, ordersSearch, ordersStatusFilter]);

  const currentData = activeTab === 'catalog' ? filteredCatalog : filteredOrders;
  const totalPages = Math.ceil(currentData.length / rowsPerPage);
  const paginatedData = currentData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Reset page when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  // --- Columns ---
  const catalogColumns = [
    { header: 'Test ID', accessor: 'id' },
    { 
      header: 'Test Name', 
      accessor: 'testName',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
            <FlaskConical className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-slate-900">{item.testName}</span>
        </div>
      )
    },
    { header: 'Category', accessor: 'category' },
    { header: 'Price', accessor: 'price' },
    { header: 'Turnaround (TAT)', accessor: 'tat' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (item) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
          item.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
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
          <button onClick={() => handleSoftDeleteCatalog(item.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const orderColumns = [
    { header: 'Order ID', accessor: 'id' },
    { 
      header: 'Patient', 
      accessor: 'patient',
      render: (item) => (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-900">{item.patient}</span>
        </div>
      )
    },
    { header: 'Test Requested', accessor: 'testName' },
    { header: 'Referred By', accessor: 'doctor', render: (item) => <span className="text-sm text-slate-600">{item.doctor}</span> },
    { header: 'Date', accessor: 'date' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (item) => {
        const getStyles = () => {
          switch(item.status) {
            case 'Completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dot-emerald-500';
            case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200 dot-amber-500';
            case 'Critical': return 'bg-rose-50 text-rose-700 border-rose-200 dot-rose-500';
            default: return 'bg-slate-100 text-slate-600 border-slate-200 dot-slate-500';
          }
        };
        const styles = getStyles();
        const parts = styles.split(' dot-');
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${parts[0]}`}>
            <div className={`w-1.5 h-1.5 rounded-full bg-${parts[1]}`}></div>
            {item.status}
          </span>
        )
      }
    },
    { 
      header: 'Result', 
      accessor: 'result',
      render: (item) => (
        <span className={`text-sm font-medium ${item.result === 'Critical' || item.result === 'Positive' ? 'text-rose-600' : 'text-slate-700'}`}>
          {item.result}
        </span>
      )
    }
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Laboratory Admin</h1>
          <p className="text-slate-500 text-sm mt-1">Manage laboratory orders, catalog, and view metrics.</p>
        </div>
        {activeTab === 'catalog' && (
          <div className="flex items-center gap-2">
            <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm shadow-primary-600/20">
              <Plus className="w-4 h-4" /> Add Test
            </button>
          </div>
        )}
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <StatCard
            key={i}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            colorTheme={stat.colorTheme}
            trend={stat.trend}
            trendLabel={stat.trendLabel}
          />
        ))}
      </div>

      {/* TABS */}
      <div className="flex border-b border-slate-200 mb-6">
        <button
          onClick={() => handleTabChange('orders')}
          className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'orders' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Lab Orders
        </button>
        <button
          onClick={() => handleTabChange('catalog')}
          className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'catalog' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Test Catalog
        </button>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="bg-white p-4 rounded-t-xl border border-slate-100 border-b-0 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder={`Search ${activeTab === 'catalog' ? 'tests' : 'orders'}...`} 
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
            value={activeTab === 'catalog' ? catalogSearch : ordersSearch}
            onChange={(e) => activeTab === 'catalog' ? setCatalogSearch(e.target.value) : setOrdersSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Status:</span>
          </div>
          <select 
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500 bg-slate-50"
            value={activeTab === 'catalog' ? catalogStatusFilter : ordersStatusFilter}
            onChange={(e) => { 
              if (activeTab === 'catalog') {
                setCatalogStatusFilter(e.target.value); 
              } else {
                setOrdersStatusFilter(e.target.value);
              }
              setPage(1); 
            }}
          >
            <option value="All">All</option>
            {activeTab === 'catalog' ? (
              <>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </>
            ) : (
              <>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Critical">Critical</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white rounded-b-xl border border-slate-100 border-t-0 shadow-sm overflow-hidden">
        <Table columns={activeTab === 'catalog' ? catalogColumns : orderColumns} data={paginatedData} className="border-0 shadow-none rounded-none" />
        
        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-900">{currentData.length > 0 ? (page - 1) * rowsPerPage + 1 : 0}</span> to <span className="font-medium text-slate-900">{Math.min(page * rowsPerPage, currentData.length)}</span> of <span className="font-medium text-slate-900">{currentData.length}</span> results
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

      {/* CREATE / EDIT MODAL FOR CATALOG */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900">{selectedRecord ? 'Edit Test' : 'Add Test'}</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Test Name</label>
                  <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" value={formData.testName} onChange={e => setFormData({...formData, testName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                    <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Turnaround Time</label>
                    <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" value={formData.tat} onChange={e => setFormData({...formData, tat: e.target.value})} />
                  </div>
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
                  {selectedRecord ? 'Update' : 'Add Test'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Laboratory;
