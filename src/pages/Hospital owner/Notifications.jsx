import React from 'react';
import { CheckCircle2, AlertTriangle, Info, Check, Trash2 } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    { id: 1, title: 'New Hospital Registered', message: 'Sunrise Clinic has been successfully registered.', time: '10 mins ago', type: 'success', unread: true },
    { id: 2, title: 'System Maintenance', message: 'Scheduled maintenance will occur on Nov 5th at 2:00 AM.', time: '2 hours ago', type: 'warning', unread: true },
    { id: 3, title: 'Report Generated', message: 'Your monthly financial summary is ready to download.', time: '1 day ago', type: 'info', unread: false },
    { id: 4, title: 'Subscription Renewed', message: 'Your professional plan has been renewed successfully.', time: '3 days ago', type: 'success', unread: false },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Notifications
          </h1>
          <p className="text-slate-500 mt-1">Stay updated with alerts and system messages.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm font-medium text-sm">
            <Check size={16} />
            Mark all as read
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {notifications.map((notif) => (
            <div key={notif.id} className={`p-5 flex gap-4 transition-colors hover:bg-slate-50 ${notif.unread ? 'bg-primary-50/30' : ''}`}>
              <div className="flex-shrink-0 mt-1">
                {notif.type === 'success' && <CheckCircle2 className="text-emerald-500" size={24} />}
                {notif.type === 'warning' && <AlertTriangle className="text-amber-500" size={24} />}
                {notif.type === 'info' && <Info className="text-blue-500" size={24} />}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-sm font-bold ${notif.unread ? 'text-slate-900' : 'text-slate-700'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{notif.time}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{notif.message}</p>
              </div>
              <div className="flex-shrink-0">
                <button className="text-slate-400 hover:text-rose-500 transition-colors p-1 rounded-md hover:bg-rose-50">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
