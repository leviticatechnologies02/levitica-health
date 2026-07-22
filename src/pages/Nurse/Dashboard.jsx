import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { Circle, UsersRound, Pill, Activity, AlertCircle } from 'lucide-react';
import StatCard from '../../components/common/StatCard';

const VITALS_TREND_DATA = [
  { time: '6AM', hr: 78, spo2: 98 },
  { time: '8AM', hr: 82, spo2: 97 },
  { time: '10AM', hr: 88, spo2: 96 },
  { time: '12PM', hr: 95, spo2: 95 },
  { time: '2PM', hr: 102, spo2: 94 },
  { time: '4PM', hr: 96, spo2: 95 },
  { time: '6PM', hr: 84, spo2: 97 },
  { time: '8PM', hr: 79, spo2: 98 },
];

const WARD_OCCUPANCY_DATA = [
  { name: 'ICU', value: 30, color: '#ef4444' }, // red-500
  { name: 'General Ward', value: 45, color: '#3b82f6' }, // blue-500
  { name: 'Pediatric', value: 25, color: '#10b981' }, // emerald-500
];

const LIVE_PATIENT_VITALS = [
  { id: 'PAT-1000', name: 'Patient Smith', ward: 'ICU', bed: 'W-01, B-01', hr: 118, bp: '150/95', spo2: 94, status: 'Critical' },
  { id: 'PAT-1001', name: 'Patient Johnson', ward: 'General Ward A', bed: 'W-01, B-02', hr: 78, bp: '120/80', spo2: 98, status: 'Stable' },
  { id: 'PAT-1002', name: 'Patient Williams', ward: 'General Ward A', bed: 'W-01, B-03', hr: 102, bp: '135/88', spo2: 96, status: 'Monitor' },
];

const MEDICATION_SCHEDULE = [
  { id: 'MED-1000', patientId: 'PAT-1000', name: 'Patient Smith', med: 'Amoxicillin 500mg', bed: 'W-01, B-01', time: '10:30 AM', timeStatus: 'overdue' },
  { id: 'MED-1001', patientId: 'PAT-1001', name: 'Patient Johnson', med: 'Lisinopril 10mg', bed: 'W-01, B-02', time: '11:15 AM', timeStatus: 'soon' },
  { id: 'MED-1002', patientId: 'PAT-1002', name: 'Patient Williams', med: 'Ibuprofen 400mg', bed: 'W-01, B-03', time: '12:00 PM', timeStatus: 'normal' },
  { id: 'MED-1003', patientId: 'PAT-1003', name: 'Patient Brown', med: 'Metformin 500mg', bed: 'W-01, B-04', time: '12:00 PM', timeStatus: 'normal' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-100 shadow-lg rounded-lg text-sm">
        <p className="font-semibold text-slate-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="font-medium">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10 space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Nurse Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Overview of your assigned patients and real-time vitals.</p>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Assigned Patients" value="12" icon={UsersRound} colorTheme="blue" />
        <StatCard title="Pending Meds" value="5" icon={Pill} colorTheme="orange" />
        <StatCard title="Vitals Due" value="3" icon={Activity} colorTheme="purple" />
        <StatCard title="Critical Alerts" value="1" icon={AlertCircle} colorTheme="red" />
      </div>

      {/* Top Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Vitals Trend Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-base font-bold text-slate-800">Vitals Trend (Today)</h2>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5"><Circle className="w-2 h-2 fill-red-500 text-red-500" /> <span className="text-slate-600">Heart Rate</span></div>
              <div className="flex items-center gap-1.5"><Circle className="w-2 h-2 fill-blue-500 text-blue-500" /> <span className="text-slate-600">SpO2</span></div>
            </div>
          </div>
          <div className="p-6 flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={VITALS_TREND_DATA} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} dy={10} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[70, 110]} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="hr" name="Heart Rate" stroke="#ef4444" strokeWidth={2.5} dot={false} activeDot={{ r: 6, fill: '#ef4444', stroke: '#fff', strokeWidth: 2 }} />
                <Line type="monotone" dataKey="spo2" name="SpO2" stroke="#3b82f6" strokeWidth={2.5} dot={false} activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ward Occupancy Radial Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-base font-bold text-slate-800">Ward Occupancy</h2>
          </div>
          <div className="p-6 flex-1 flex flex-col items-center justify-center relative min-h-0">
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none mt-[-20px]">
              <span className="text-sm font-semibold text-slate-800">Avg Occupancy</span>
              <span className="text-xl font-bold text-slate-500 mt-1">64%</span>
            </div>
            <ResponsiveContainer width="100%" height="100%" className="max-h-[250px]">
              <PieChart>
                {/* Outer Ring - ICU */}
                <Pie data={[{value: 100}]} dataKey="value" cx="50%" cy="50%" innerRadius="85%" outerRadius="100%" fill="#f1f5f9" stroke="none" />
                <Pie data={[{value: 80}, {value: 20}]} dataKey="value" cx="50%" cy="50%" innerRadius="85%" outerRadius="100%" fill="#ef4444" stroke="none" cornerRadius={4} startAngle={90} endAngle={-270}>
                  <Cell key="cell-0" fill="#ef4444" />
                  <Cell key="cell-1" fill="transparent" />
                </Pie>
                
                {/* Middle Ring - General Ward */}
                <Pie data={[{value: 100}]} dataKey="value" cx="50%" cy="50%" innerRadius="65%" outerRadius="80%" fill="#f1f5f9" stroke="none" />
                <Pie data={[{value: 65}, {value: 35}]} dataKey="value" cx="50%" cy="50%" innerRadius="65%" outerRadius="80%" fill="#3b82f6" stroke="none" cornerRadius={4} startAngle={90} endAngle={-270}>
                  <Cell key="cell-0" fill="#3b82f6" />
                  <Cell key="cell-1" fill="transparent" />
                </Pie>

                {/* Inner Ring - Pediatric */}
                <Pie data={[{value: 100}]} dataKey="value" cx="50%" cy="50%" innerRadius="45%" outerRadius="60%" fill="#f1f5f9" stroke="none" />
                <Pie data={[{value: 45}, {value: 55}]} dataKey="value" cx="50%" cy="50%" innerRadius="45%" outerRadius="60%" fill="#10b981" stroke="none" cornerRadius={4} startAngle={90} endAngle={-270}>
                  <Cell key="cell-0" fill="#10b981" />
                  <Cell key="cell-1" fill="transparent" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            <div className="flex items-center justify-center gap-4 text-xs font-medium mt-4">
              <div className="flex items-center gap-1.5"><Circle className="w-2 h-2 fill-red-500 text-red-500" /> <span className="text-slate-500">ICU</span></div>
              <div className="flex items-center gap-1.5"><Circle className="w-2 h-2 fill-blue-500 text-blue-500" /> <span className="text-slate-500">General Ward</span></div>
              <div className="flex items-center gap-1.5"><Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" /> <span className="text-slate-500">Pediatric</span></div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Row: Tables & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Patient Vitals */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-base font-bold text-slate-800">Live Patient Vitals</h2>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 border border-red-100 rounded-md">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide">Live</span>
            </div>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold text-slate-500 bg-white">
                  <th className="py-4 px-5">Patient</th>
                  <th className="py-4 px-5">Bed</th>
                  <th className="py-4 px-5">Heart Rate</th>
                  <th className="py-4 px-5">Blood Pressure</th>
                  <th className="py-4 px-5">SpO2</th>
                  <th className="py-4 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {LIVE_PATIENT_VITALS.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 font-bold text-sm">
                          {patient.name.replace('Patient ', '').charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{patient.name}</p>
                          <p className="text-xs text-slate-500">{patient.ward}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-sm text-slate-600">{patient.bed}</td>
                    <td className={`py-3 px-5 text-sm font-semibold ${patient.hr > 100 ? 'text-red-600' : 'text-slate-900'}`}>{patient.hr} bpm</td>
                    <td className="py-3 px-5 text-sm text-slate-600">{patient.bp}</td>
                    <td className="py-3 px-5 text-sm text-slate-600">{patient.spo2}%</td>
                    <td className="py-3 px-5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold
                        ${patient.status === 'Critical' ? 'bg-red-500 text-white' : 
                          patient.status === 'Stable' ? 'bg-emerald-500 text-white' : 
                          'bg-amber-500 text-white'}`}
                      >
                        {patient.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Medication Schedule */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-base font-bold text-slate-800">Medication Schedule</h2>
          </div>
          <div className="p-0 flex-1">
            <div className="divide-y divide-slate-100">
              {MEDICATION_SCHEDULE.map((item) => (
                <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{item.med} - Bed {item.bed}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white shrink-0
                    ${item.timeStatus === 'overdue' ? 'bg-red-500' : 
                      item.timeStatus === 'soon' ? 'bg-amber-500' : 
                      'bg-blue-500'}`}
                  >
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
            <button onClick={() => navigate('/nurse/medications')} className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              View Full Schedule
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
