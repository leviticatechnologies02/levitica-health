import React, { useState } from 'react';
import { 
  UsersRound, FileText, ActivitySquare, MessageSquare, 
  Calendar, Clock, CheckCircle2, AlertCircle, 
  ChevronRight, ArrowRight
} from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data for the dashboard
  const upcomingAppointments = [
    { id: 'APT-101', patient: 'Sarah Jenkins', time: '09:00 AM', status: 'Checked In', type: 'Follow up' },
    { id: 'APT-102', patient: 'Michael Chang', time: '09:30 AM', status: 'Waiting', type: 'Consultation' },
    { id: 'APT-103', patient: 'Emily Davis', time: '10:15 AM', status: 'Scheduled', type: 'Routine Check' },
  ];

  const priorityAlerts = [
    { id: 1, type: 'lab', patient: 'Robert Wilson', message: 'Elevated HbA1c (8.2%)', time: '10 mins ago', urgent: true },
    { id: 2, type: 'message', patient: 'Nurse Clara', message: 'Patient in Room 4 is experiencing nausea.', time: '25 mins ago', urgent: false },
    { id: 3, type: 'lab', patient: 'Amanda Smith', message: 'Lipid panel results available', time: '1 hr ago', urgent: false },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome, Dr. Smith!</h1>
          <p className="text-slate-500 mt-1">Here is your clinical overview for today.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/doctor/appointment-tracking')} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm">
            View Schedule
          </button>
          <button onClick={() => navigate('/doctor/appointment-tracking')} className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-sm shadow-primary-500/20 flex items-center gap-2">
            <UsersRound size={18} />
            Start Consultations
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Patients Today" value="18" icon={UsersRound} colorTheme="blue" />
        <StatCard title="Pending Labs" value="5" icon={ActivitySquare} colorTheme="rose" />
        <StatCard title="Reports to Sign" value="12" icon={FileText} colorTheme="amber" />
        <StatCard title="Unread Messages" value="3" icon={MessageSquare} colorTheme="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-500" />
                Today's Schedule
              </h2>
              <button onClick={() => navigate('/doctor/schedule')} className="text-sm text-primary-600 font-medium hover:underline flex items-center">
                Full Calendar <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="p-0">
              {upcomingAppointments.map((apt, idx) => (
                <div key={apt.id} className={`p-4 flex items-center justify-between transition-colors hover:bg-slate-50 ${idx !== upcomingAppointments.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex flex-col items-center justify-center shrink-0">
                      <span className="text-xs font-bold">{apt.time.split(' ')[0]}</span>
                      <span className="text-[10px] text-slate-500 font-medium uppercase">{apt.time.split(' ')[1]}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{apt.patient}</h4>
                      <p className="text-sm text-slate-500">{apt.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      apt.status === 'Checked In' ? 'bg-emerald-100 text-emerald-700' : 
                      apt.status === 'Waiting' ? 'bg-amber-100 text-amber-700' : 
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {apt.status}
                    </span>
                    <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center mt-auto">
              <p className="text-sm text-slate-500">15 more appointments today.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-500" />
                Priority Alerts
              </h2>
            </div>
            <div className="p-4 space-y-4">
              {priorityAlerts.map(alert => (
                <div key={alert.id} className={`p-4 rounded-xl border ${alert.urgent ? 'border-rose-200 bg-rose-50/50' : 'border-slate-100 bg-white shadow-sm'}`}>
                  <div className="flex items-start justify-between mb-1">
                    <h4 className={`text-sm font-bold ${alert.urgent ? 'text-rose-900' : 'text-slate-900'}`}>{alert.patient}</h4>
                    <span className="text-[10px] font-medium text-slate-500">{alert.time}</span>
                  </div>
                  <p className={`text-sm ${alert.urgent ? 'text-rose-700' : 'text-slate-600'}`}>{alert.message}</p>
                  <div className="mt-3 flex gap-2">
                    <button className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${alert.urgent ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                      Review
                    </button>
                    {alert.type === 'lab' && (
                      <button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                        View Record
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
