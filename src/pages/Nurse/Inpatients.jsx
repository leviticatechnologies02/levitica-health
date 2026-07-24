import React, { useState, useMemo } from 'react';
import { Search, BedDouble, Activity, Pill, Eye, ChevronLeft, ChevronRight, UsersRound, MessageSquare, Send, Phone, Mail, Building2, Clock } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import StatCard from '../../components/common/StatCard';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';

const MOCK_INPATIENTS = Array.from({ length: 15 }, (_, i) => ({
  id: `PAT-${1000 + i}`,
  name: `Patient ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][i % 5]}`,
  age: 45 + (i % 30),
  gender: i % 2 === 0 ? 'Male' : 'Female',
  bed: `W-01, B-${(i + 1).toString().padStart(2, '0')}`,
  condition: i % 4 === 0 ? 'Critical' : 'Stable',
  admissionDate: new Date(Date.now() - Math.random() * 1000000000).toISOString().split('T')[0],
  lastVitals: `${Math.floor(Math.random() * 12 + 1)}:00 ${i % 2 === 0 ? 'AM' : 'PM'}`,
  doctorName: `Dr. ${['Adams', 'Baker', 'Clark', 'Davis', 'Evans'][i % 5]}`,
  doctorSpecialty: ['Cardiology', 'Neurology', 'General Surgery', 'Orthopedics', 'Internal Medicine'][i % 5],
  bloodType: ['O+', 'A+', 'B-', 'AB+', 'O-'][i % 5],
  weight: 60 + (i % 30) + ' kg',
  height: 150 + (i % 40) + ' cm',
  diagnosis: ['Pneumonia', 'Appendicitis', 'Concussion', 'Fractured Femur', 'Hypertension'][i % 5],
  allergies: i % 3 === 0 ? 'Penicillin, Peanuts' : 'None',
}));

const Inpatients = () => {
  const navigate = useNavigate();
  const [data] = useState(MOCK_INPATIENTS);
  const [search, setSearch] = useState('');
  const [conditionFilter, setConditionFilter] = useState('All');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [isDoctorChatOpen, setIsDoctorChatOpen] = useState(false);
  const [isDoctorProfileOpen, setIsDoctorProfileOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const openView = (record) => {
    setSelectedRecord(record);
    setIsViewOpen(true);
  };

  const openDoctorProfile = (record) => {
    setSelectedRecord(record);
    setIsDoctorProfileOpen(true);
  };

  const filteredData = useMemo(() => {
    return data
      .filter(item => conditionFilter === 'All' ? true : item.condition === conditionFilter)
      .filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.bed.toLowerCase().includes(search.toLowerCase())
      );
  }, [data, search, conditionFilter]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const columns = [
    {
      header: 'Patient ID',
      accessor: 'id',
      render: (patient) => <span className="font-medium text-slate-900">{patient.id}</span>
    },
    {
      header: 'Patient Details',
      accessor: 'name',
      render: (patient) => (
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-900">{patient.name}</span>
          <span className="text-xs text-slate-500">{patient.gender}, {patient.age} yrs</span>
        </div>
      )
    },
    {
      header: 'Bed / Location',
      accessor: 'bed',
      render: (patient) => (
        <div className="flex items-center gap-1.5 text-slate-700">
          <BedDouble className="w-4 h-4 text-secondary-400" />
          <span className="text-sm">{patient.bed}</span>
        </div>
      )
    },
    {
      header: 'Condition',
      accessor: 'condition',
      render: (patient) => (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${patient.condition === 'Critical' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
          {patient.condition}
        </span>
      )
    },
    {
      header: 'Last Vitals Recorded',
      accessor: 'lastVitals',
      render: (patient) => (
        <div className="flex items-center gap-1.5 text-slate-600">
          <Activity className="w-3.5 h-3.5" />
          <span className="text-sm">{patient.lastVitals}</span>
        </div>
      )
    },
    {
      header: 'Attending Physician',
      accessor: 'doctorName',
      render: (patient) => (
        <button
          onClick={() => openDoctorProfile(patient)}
          className="flex items-center gap-2.5 hover:bg-slate-50 p-1.5 rounded-lg transition-colors text-left group w-full"
        >
          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0 group-hover:bg-blue-200 transition-colors">
            {patient.doctorName.replace('Dr. ', '').charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{patient.doctorName}</span>
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">{patient.doctorSpecialty}</span>
          </div>
        </button>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (patient) => (
        <div className="flex items-center gap-2">
          <button onClick={() => openView(patient)} className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="View Patient File">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => navigate(`/nurse/vitals?patientId=${patient.id}`)} className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Record Vitals">
            <Activity className="w-4 h-4" />
          </button>
          <button onClick={() => navigate(`/nurse/medications?patientId=${patient.id}`)} className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Administer Meds">
            <Pill className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Inpatients</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and track admitted patients currently assigned to your care.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Assigned" value={data.length} icon={UsersRound} colorTheme="blue" />
        <StatCard title="Critical Condition" value={data.filter(d => d.condition === 'Critical').length} icon={Activity} colorTheme="red" />
        <StatCard title="Stable Condition" value={data.filter(d => d.condition === 'Stable').length} icon={BedDouble} colorTheme="green" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search patients, ID, or bed..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm transition-all"
            />
          </div>
          <div className="flex p-1 bg-slate-100 rounded-lg w-full sm:w-auto">
            {['All', 'Stable', 'Critical'].map((status) => (
              <button
                key={status}
                onClick={() => setConditionFilter(status)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex-1 sm:flex-none ${conditionFilter === status ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
              >
                {status}
              </button>
            ))}
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
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === p ? 'bg-primary-600 text-white shadow-sm shadow-primary-600/20' : 'text-slate-600 hover:bg-slate-100'}`}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Comprehensive Patient Profile" maxWidth="max-w-3xl">
        {selectedRecord && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-2xl shrink-0 border-2 border-white shadow-sm">
                  {selectedRecord.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedRecord.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-sm font-medium text-slate-600">{selectedRecord.id}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${selectedRecord.condition === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {selectedRecord.condition}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Admission Date</p>
                <p className="text-sm font-bold text-slate-900">{selectedRecord.admissionDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Demographics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-xs text-slate-500">Gender</span><span className="text-xs font-semibold text-slate-900">{selectedRecord.gender}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-slate-500">Age</span><span className="text-xs font-semibold text-slate-900">{selectedRecord.age} yrs</span></div>
                  <div className="flex justify-between"><span className="text-xs text-slate-500">Blood Type</span><span className="text-xs font-bold text-rose-600">{selectedRecord.bloodType}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-slate-500">Weight / Height</span><span className="text-xs font-semibold text-slate-900">{selectedRecord.weight} / {selectedRecord.height}</span></div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Clinical Data</h4>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-xs text-slate-500">Diagnosis</span><span className="text-xs font-semibold text-slate-900 text-right">{selectedRecord.diagnosis}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-slate-500">Allergies</span><span className={`text-xs font-semibold text-right ${selectedRecord.allergies !== 'None' ? 'text-red-600' : 'text-slate-900'}`}>{selectedRecord.allergies}</span></div>
                  <div className="flex justify-between mt-4"><span className="text-xs text-slate-500">Last Vitals</span><span className="text-xs font-semibold text-slate-900">{selectedRecord.lastVitals}</span></div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Location</h4>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-xs text-slate-500">Ward & Bed</span><span className="text-xs font-semibold text-slate-900">{selectedRecord.bed}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-slate-500">Status</span><span className="text-xs font-semibold text-slate-900">Inpatient</span></div>
                </div>
              </div>

            </div>

            <div className="p-4 bg-blue-50/80 border border-blue-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-200/50 text-blue-700 flex items-center justify-center font-bold text-xl shadow-sm border border-blue-200 shrink-0">
                  {selectedRecord.doctorName.replace('Dr. ', '').charAt(0)}
                </div>
                <div>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mb-0.5">Attending Physician</p>
                  <p className="text-base font-bold text-slate-900">{selectedRecord.doctorName}</p>
                  <p className="text-xs text-slate-600 font-medium">{selectedRecord.doctorSpecialty}</p>
                </div>
              </div>
              <button onClick={() => setIsDoctorChatOpen(true)} className="w-full sm:w-auto px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-100 hover:text-blue-800 transition-colors shadow-sm flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" /> Message Doctor
              </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setIsViewOpen(false)} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">Close Profile</button>
              <div className="flex gap-2">
                <button onClick={() => { setIsViewOpen(false); navigate(`/nurse/vitals?patientId=${selectedRecord.id}`); }} className="flex-1 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Activity className="w-4 h-4" /> Record Vitals
                </button>
                <button onClick={() => { setIsViewOpen(false); navigate(`/nurse/medications?patientId=${selectedRecord.id}`); }} className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shadow-sm flex items-center justify-center gap-2">
                  <Pill className="w-4 h-4" /> Medications
                </button>
              </div>
            </div>

          </div>
        )}
      </Modal>
      <Modal isOpen={isDoctorChatOpen} onClose={() => setIsDoctorChatOpen(false)} title="Direct Message: Attending Physician" maxWidth="max-w-xl">
        {selectedRecord && (
          <div className="flex flex-col h-[500px]">
            <div className="flex items-center gap-4 p-4 bg-blue-50/50 border-b border-blue-100 shrink-0">
              <div className="w-12 h-12 rounded-full bg-blue-200/50 text-blue-700 flex items-center justify-center font-bold text-xl shadow-sm border border-blue-200">
                {selectedRecord.doctorName.replace('Dr. ', '').charAt(0)}
              </div>
              <div>
                <p className="text-base font-bold text-slate-900">{selectedRecord.doctorName}</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <p className="text-xs text-slate-600 font-medium">Online • {selectedRecord.doctorSpecialty}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
              <div className="text-center text-xs text-slate-400 font-medium my-2">Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-3 max-w-[80%] shadow-sm">
                  <p className="text-sm text-slate-700">Hello, I am the attending physician for <span className="font-bold">{selectedRecord.name}</span>. How can I help you today?</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-slate-100 shrink-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder={`Message ${selectedRecord.doctorName} regarding ${selectedRecord.name}...`}
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && chatMessage.trim()) {
                      alert('Message sent successfully via internal comms.');
                      setChatMessage('');
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (chatMessage.trim()) {
                      alert('Message sent successfully via internal comms.');
                      setChatMessage('');
                    }
                  }}
                  className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!chatMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={isDoctorProfileOpen} onClose={() => setIsDoctorProfileOpen(false)} title="Physician Directory Profile" maxWidth="max-w-xl">
        {selectedRecord && (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white rounded-xl border border-blue-100 shadow-sm">
              <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-4xl shadow-md border-4 border-white mb-4">
                {selectedRecord.doctorName.replace('Dr. ', '').charAt(0)}
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{selectedRecord.doctorName}</h3>
              <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mt-1">{selectedRecord.doctorSpecialty}</p>
              <div className="mt-3 flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Available (On Shift)
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Contact Details</h4>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400" /> Ext. {4000 + parseInt(selectedRecord.id.split('-')[1])}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400" /> {selectedRecord.doctorName.split(' ')[1].toLowerCase()}@levitica.com
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Office & Schedule</h4>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Building2 className="w-4 h-4 text-slate-400" /> Main Wing, Office {200 + parseInt(selectedRecord.id.split('-')[1]) % 50}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400" /> Today: 08:00 AM - 06:00 PM
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-600">
              <p>Attending physician for your assigned patient: <span className="font-bold text-slate-900">{selectedRecord.name}</span> (Bed: {selectedRecord.bed}).</p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setIsDoctorProfileOpen(false)} className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">Close</button>
              <button
                onClick={() => {
                  setIsDoctorProfileOpen(false);
                  setIsDoctorChatOpen(true);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold shadow-sm flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Message Doctor
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Inpatients;
