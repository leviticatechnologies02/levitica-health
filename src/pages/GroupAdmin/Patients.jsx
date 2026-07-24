import React, { useState, useMemo } from 'react';
import {
  Search, FileSpreadsheet, FileText, Edit2, Trash2, Eye,
  UsersRound, Activity, ChevronLeft, ChevronRight, ActivitySquare, CheckCircle2
} from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSearchParams, useNavigate } from 'react-router-dom';
import StatCard from '../../components/common/StatCard';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';

const MOCK_PATIENTS = Array.from({ length: 65 }, (_, i) => ({
  id: `PAT-${10000 + i}`,
  name: `Patient ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'][i % 8]}`,
  branchId: `BRN-${1000 + (i % 25)}`,
  branchName: `${['City Center', 'North Wing', 'South Medical', 'East Campus', 'West General'][i % 5]} Branch`,
  age: 20 + (i % 50),
  gender: i % 2 === 0 ? 'Male' : 'Female',
  phone: `+1 555-05${i.toString().padStart(2, '0')}`,
  status: ['Admitted', 'Discharged', 'Outpatient'][i % 3],
  isDeleted: false,
  registrationDate: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
}));

const PatientSchema = Yup.object().shape({
  name: Yup.string().required('Patient Name is required'),
  branchId: Yup.string().required('Associated Branch is required'),
  age: Yup.number().required('Age is required').min(0, 'Invalid age'),
  gender: Yup.string().required('Gender is required'),
  phone: Yup.string().required('Phone Number is required'),
  status: Yup.string().required('Status is required'),
});

const Patients = () => {
  const [searchParams] = useSearchParams();
  const filterBranchId = searchParams.get('branchId');
  const navigate = useNavigate();

  const [data, setData] = useState(MOCK_PATIENTS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [sortConfig, setSortConfig] = useState({ key: 'registrationDate', direction: 'desc' });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleSoftDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient record?")) {
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
      setData(data.map(item => item.id === selectedRecord.id ? { ...values, id: item.id, branchName: item.branchName, registrationDate: item.registrationDate } : item));
    } else {
      setData([{ ...values, id: `PAT-${Math.floor(Math.random() * 90000) + 10000}`, branchName: 'New Linked Branch', isDeleted: false, registrationDate: new Date().toISOString().split('T')[0] }, ...data]);
    }
    setIsFormOpen(false);
    setSubmitting(false);
  };

  const filteredData = useMemo(() => {
    return data
      .filter(item => !item.isDeleted)
      .filter(item => filterBranchId ? item.branchId === filterBranchId : true)
      .filter(item => statusFilter === 'All' ? true : item.status === statusFilter)
      .filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.branchName.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [data, search, statusFilter, sortConfig, filterBranchId]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const columns = [
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('id')}>Patient ID</div>,
      accessor: 'id',
      render: (patient) => <span className="font-medium text-slate-900">{patient.id}</span>
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('name')}>Patient Details</div>,
      accessor: 'name',
      render: (patient) => (
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-900">{patient.name}</span>
          <span className="text-xs text-slate-500">{patient.gender}, {patient.age} yrs | {patient.phone}</span>
        </div>
      )
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('branchName')}>Location</div>,
      accessor: 'branchName',
      render: (patient) => (
        <div className="flex flex-col cursor-pointer group" onClick={() => navigate('/groupAdmin/branches')}>
          <span className="text-sm font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md inline-block w-fit group-hover:bg-indigo-100 transition-colors">{patient.branchName}</span>
          <span className="text-[10px] text-slate-400 mt-1">{patient.branchId}</span>
        </div>
      )
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('registrationDate')}>Registration Date</div>,
      accessor: 'registrationDate',
      render: (patient) => <span className="text-sm text-slate-700">{patient.registrationDate}</span>
    },
    {
      header: <div className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => handleSort('status')}>Status</div>,
      accessor: 'status',
      render: (patient) => {
        let colorClass = 'bg-slate-100 text-slate-700';
        if (patient.status === 'Admitted') colorClass = 'bg-red-50 text-red-700';
        if (patient.status === 'Discharged') colorClass = 'bg-emerald-50 text-emerald-700';
        if (patient.status === 'Outpatient') colorClass = 'bg-blue-50 text-blue-700';

        return (
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}>
            {patient.status}
          </span>
        );
      }
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (patient) => (
        <div className="flex items-center gap-2">
          <button onClick={() => openView(patient)} className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="View Details">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => openEdit(patient)} className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => handleSoftDelete(patient.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Patient Records</h1>
          {filterBranchId ? (
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-sm font-medium bg-primary-50 text-primary-600 px-2 py-1 rounded-md">
                Filtered by Branch: {filterBranchId}
              </span>
              <button onClick={() => navigate('/groupAdmin/patients')} className="text-xs text-slate-500 hover:text-slate-900 underline whitespace-nowrap">Clear Filter</button>
            </div>
          ) : (
            <p className="text-slate-500 text-sm mt-1">Cross-branch patient registry and overview.</p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button onClick={() => handleExport('excel')} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
            <FileSpreadsheet className="w-4 h-4 text-green-600" /> <span className="whitespace-nowrap">Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Patients" value={data.filter(d => !d.isDeleted).length} icon={UsersRound} colorTheme="blue" />
        <StatCard title="Currently Admitted" value={data.filter(d => !d.isDeleted && d.status === 'Admitted').length} icon={ActivitySquare} colorTheme="rose" />
        <StatCard title="Recent Discharges" value={data.filter(d => !d.isDeleted && d.status === 'Discharged').length} icon={CheckCircle2} colorTheme="green" />
        <StatCard title="Outpatients" value={data.filter(d => !d.isDeleted && d.status === 'Outpatient').length} icon={Activity} colorTheme="purple" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm transition-all"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="flex flex-wrap p-1 bg-slate-100 rounded-lg">
              {['All', 'Admitted', 'Outpatient', 'Discharged'].map((status) => (
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

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="Edit Patient Details" icon={UsersRound}>
        <Formik
          initialValues={selectedRecord || { name: '', branchId: filterBranchId || '', age: '', gender: 'Male', phone: '', status: 'Outpatient' }}
          validationSchema={PatientSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name *</label>
                  <Field name="name" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm" />
                  <ErrorMessage name="name" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Age *</label>
                  <Field type="number" name="age" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm" />
                  <ErrorMessage name="age" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Gender *</label>
                  <Field as="select" name="gender" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage name="gender" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Associated Branch (ID) *</label>
                  <Field name="branchId" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm" />
                  <ErrorMessage name="branchId" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                  <Field name="phone" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm" />
                  <ErrorMessage name="phone" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <Field as="select" name="status" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm">
                    <option value="Outpatient">Outpatient</option>
                    <option value="Admitted">Admitted</option>
                    <option value="Discharged">Discharged</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-rose-500 text-xs mt-1" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-100">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm shadow-primary-600/20 disabled:opacity-50 flex items-center gap-2">
                  Save Changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Patient Record" icon={Eye}>
        {selectedRecord && (
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xl shrink-0">
                {selectedRecord.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedRecord.name}</h3>
                <p className="text-sm text-slate-500">{selectedRecord.id}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  {selectedRecord.status}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-slate-500 mb-1">Demographics</p><p className="text-sm font-medium text-slate-900">{selectedRecord.gender}, {selectedRecord.age} yrs</p></div>
              <div><p className="text-xs text-slate-500 mb-1">Phone</p><p className="text-sm font-medium text-slate-900">{selectedRecord.phone}</p></div>
              <div className="col-span-2">
                <p className="text-xs text-slate-500 mb-1">Registration Date</p>
                <p className="text-sm font-medium text-slate-900">{selectedRecord.registrationDate}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-slate-500 mb-1">Associated Location</p>
                <p className="text-sm font-medium text-primary-600 cursor-pointer hover:underline" onClick={() => { setIsViewOpen(false); navigate('/groupAdmin/branches'); }}>
                  {selectedRecord.branchName} ({selectedRecord.branchId})
                </p>
              </div>
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

export default Patients;
