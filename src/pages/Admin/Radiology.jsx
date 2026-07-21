import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Plus, Edit2, Trash2, Activity,
  Settings, CheckCircle, AlertTriangle, XCircle, Wrench, Eye,
  ChevronLeft, ChevronRight, FileSpreadsheet, FileText
} from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Table from '../../components/common/Table';
import StatCard from '../../components/common/StatCard';
import Modal from '../../components/common/Modal';

const MOCK_DATA = [
  { id: 'EQ-001', machineName: 'Optima MR360', equipmentType: 'MRI Scanner', condition: 'Operational', dailyUsage: 15, lastMaintenance: '2023-09-10', nextMaintenance: '2024-03-10', isDeleted: false },
  { id: 'EQ-002', machineName: 'Revolution CT', equipmentType: 'CT Scanner', condition: 'Maintenance', dailyUsage: 0, lastMaintenance: '2023-10-12', nextMaintenance: '2023-10-20', isDeleted: false },
  { id: 'EQ-003', machineName: 'Definium 8000', equipmentType: 'X-Ray', condition: 'Operational', dailyUsage: 45, lastMaintenance: '2023-08-05', nextMaintenance: '2024-02-05', isDeleted: false },
  { id: 'EQ-004', machineName: 'Voluson E10', equipmentType: 'Ultrasound', condition: 'Operational', dailyUsage: 25, lastMaintenance: '2023-07-20', nextMaintenance: '2024-01-20', isDeleted: false },
  { id: 'EQ-005', machineName: 'Discovery IQ', equipmentType: 'PET Scanner', condition: 'Out of Order', dailyUsage: 0, lastMaintenance: '2023-05-15', nextMaintenance: '2023-11-15', isDeleted: false },
];

const EquipmentSchema = Yup.object().shape({
  machineName: Yup.string().required('Machine Name is required'),
  equipmentType: Yup.string().required('Equipment Type is required'),
  condition: Yup.string().required('Condition is required'),
  dailyUsage: Yup.number().min(0, 'Must be 0 or more').required('Daily Usage is required'),
  lastMaintenance: Yup.date().required('Last Maintenance is required'),
  nextMaintenance: Yup.date().required('Next Maintenance is required').min(Yup.ref('lastMaintenance'), 'Next maintenance must be after last maintenance'),
});

const Radiology = () => {
  const [data, setData] = useState(MOCK_DATA);
  const [search, setSearch] = useState('');
  const [conditionFilter, setConditionFilter] = useState('All');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: 'machineName', direction: 'asc' });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleSoftDelete = (id) => {
    if(window.confirm("Are you sure you want to remove this equipment from the registry?")) {
      setData(data.map(item => item.id === id ? { ...item, isDeleted: true } : item));
    }
  };

  const handleExport = (format) => {
    alert(`Exporting radiology equipment data as ${format.toUpperCase()}...`);
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
      setData([{ ...values, id: `EQ-00${Math.floor(Math.random() * 90) + 10}`, isDeleted: false }, ...data]);
    }
    setIsFormOpen(false);
    setSubmitting(false);
  };

  const filteredData = useMemo(() => {
    return data
      .filter(item => !item.isDeleted)
      .filter(item => conditionFilter === 'All' ? true : item.condition === conditionFilter)
      .filter(item => 
        item.machineName.toLowerCase().includes(search.toLowerCase()) ||
        item.equipmentType.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [data, search, conditionFilter, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const totalEquipment = data.filter(d => !d.isDeleted).length;
  const operational = data.filter(d => !d.isDeleted && d.condition === 'Operational').length;
  const maintenance = data.filter(d => !d.isDeleted && d.condition === 'Maintenance').length;
  const outOfOrder = data.filter(d => !d.isDeleted && d.condition === 'Out of Order').length;

  const getConditionBadge = (condition) => {
    switch(condition) {
      case 'Operational': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Maintenance': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Out of Order': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getConditionDot = (condition) => {
    switch(condition) {
      case 'Operational': return 'bg-emerald-500';
      case 'Maintenance': return 'bg-amber-500';
      case 'Out of Order': return 'bg-rose-500';
      default: return 'bg-slate-400';
    }
  };

  const columns = [
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('id')}>ID</div>,
      accessor: 'id',
      render: (item) => <span className="font-medium text-slate-900">{item.id}</span>
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('machineName')}>Equipment Details</div>,
      accessor: 'machineName',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Activity className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">{item.machineName}</span>
            <span className="text-xs text-slate-500">{item.equipmentType}</span>
          </div>
        </div>
      )
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('condition')}>Condition</div>,
      accessor: 'condition',
      render: (item) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getConditionBadge(item.condition)}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${getConditionDot(item.condition)}`}></div>
          {item.condition}
        </span>
      )
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('dailyUsage')}>Usage</div>,
      accessor: 'dailyUsage',
      render: (item) => <span className="text-sm font-medium text-slate-700">{item.dailyUsage} scans/day</span>
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('nextMaintenance')}>Next Maintenance</div>,
      accessor: 'nextMaintenance',
      render: (item) => <span className="text-sm text-slate-600">{item.nextMaintenance}</span>
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (item) => (
        <div className="flex items-center gap-2">
          <button onClick={() => openView(item)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Details">
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Radiology Equipment</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor department machines, operational conditions, and maintenance schedules.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button onClick={() => handleExport('excel')} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
            <FileSpreadsheet className="w-4 h-4 text-green-600" /> <span className="whitespace-nowrap">Export Excel</span>
          </button>
          <button onClick={() => handleExport('pdf')} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
            <FileText className="w-4 h-4 text-red-500" /> <span className="whitespace-nowrap">Export PDF</span>
          </button>
          <button onClick={openCreate} className="w-full sm:w-auto flex justify-center items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm shadow-primary-600/20">
            <Plus className="w-4 h-4" /> <span className="whitespace-nowrap">Add Equipment</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Equipment" value={totalEquipment} icon={Settings} colorTheme="blue" />
        <StatCard title="Operational" value={operational} icon={CheckCircle} colorTheme="green" />
        <StatCard title="In Maintenance" value={maintenance} icon={Wrench} colorTheme="amber" />
        <StatCard title="Out of Order" value={outOfOrder} icon={XCircle} colorTheme="rose" />
      </div>

      {/* FILTERS & SEARCH */}
      <div className="bg-white p-4 rounded-t-xl border border-slate-100 border-b-0 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search equipment..." 
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Condition:</span>
          </div>
          <select 
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500 bg-slate-50 w-full sm:w-auto"
            value={conditionFilter}
            onChange={(e) => { setConditionFilter(e.target.value); setPage(1); }}
          >
            <option value="All">All Conditions</option>
            <option value="Operational">Operational</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Out of Order">Out of Order</option>
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
        title={selectedRecord ? 'Edit Equipment' : 'Add New Equipment'}
      >
        <Formik
          initialValues={selectedRecord || { machineName: '', equipmentType: '', condition: 'Operational', dailyUsage: 0, lastMaintenance: '', nextMaintenance: '' }}
          validationSchema={EquipmentSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Machine Name</label>
                  <Field
                    name="machineName"
                    type="text"
                    placeholder="e.g. MRI Scanner A"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.machineName && touched.machineName ? 'border-red-500' : 'border-slate-200'}`}
                  />
                  <ErrorMessage name="machineName" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Equipment Type</label>
                  <Field
                    as="select"
                    name="equipmentType"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.equipmentType && touched.equipmentType ? 'border-red-500' : 'border-slate-200'}`}
                  >
                    <option value="">Select Type...</option>
                    <option value="MRI Scanner">MRI Scanner</option>
                    <option value="CT Scanner">CT Scanner</option>
                    <option value="X-Ray">X-Ray</option>
                    <option value="Ultrasound">Ultrasound</option>
                    <option value="PET Scanner">PET Scanner</option>
                  </Field>
                  <ErrorMessage name="equipmentType" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Condition</label>
                    <Field
                      as="select"
                      name="condition"
                      className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.condition && touched.condition ? 'border-red-500' : 'border-slate-200'}`}
                    >
                      <option value="Operational">Operational</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Out of Order">Out of Order</option>
                    </Field>
                    <ErrorMessage name="condition" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Average Daily Usage</label>
                    <Field
                      name="dailyUsage"
                      type="number"
                      className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.dailyUsage && touched.dailyUsage ? 'border-red-500' : 'border-slate-200'}`}
                    />
                    <ErrorMessage name="dailyUsage" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Maintenance</label>
                    <Field
                      name="lastMaintenance"
                      type="date"
                      className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.lastMaintenance && touched.lastMaintenance ? 'border-red-500' : 'border-slate-200'}`}
                    />
                    <ErrorMessage name="lastMaintenance" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Next Maintenance</label>
                    <Field
                      name="nextMaintenance"
                      type="date"
                      className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none ${errors.nextMaintenance && touched.nextMaintenance ? 'border-red-500' : 'border-slate-200'}`}
                    />
                    <ErrorMessage name="nextMaintenance" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
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
                  {isSubmitting ? 'Saving...' : (selectedRecord ? 'Update Equipment' : 'Add Equipment')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Equipment Details"
      >
        {selectedRecord && (
          <div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-bold">
                  <Activity className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedRecord.machineName}</h3>
                  <p className="text-sm text-indigo-600 font-medium">{selectedRecord.equipmentType}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                <div>
                  <p className="text-slate-500 mb-1">Equipment ID</p>
                  <p className="font-medium text-slate-900">{selectedRecord.id}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Condition</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getConditionBadge(selectedRecord.condition)}`}>{selectedRecord.condition}</span>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Daily Usage Avg</p>
                  <p className="font-medium text-slate-900">{selectedRecord.dailyUsage} scans</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Last Maintenance</p>
                  <p className="font-medium text-slate-900">{selectedRecord.lastMaintenance}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Next Maintenance Due</p>
                  <p className={`font-medium ${new Date(selectedRecord.nextMaintenance) < new Date() ? 'text-rose-600' : 'text-slate-900'}`}>{selectedRecord.nextMaintenance}</p>
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

export default Radiology;
