import React, { useState } from 'react';
import { Search, Plus, LifeBuoy, Filter } from 'lucide-react';

const Tickets = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const tickets = [
    { id: 'TKT-1042', subject: 'EMR Login Issue', status: 'Open', priority: 'High', date: 'Today' },
    { id: 'TKT-1038', subject: 'Printer on 3rd Floor not working', status: 'In Progress', priority: 'Medium', date: 'Yesterday' },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">IT Helpdesk Support</h1>
          <p className="text-slate-500 mt-1">Submit and track your IT support requests.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search tickets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm w-64"
            />
          </div>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center gap-2 shadow-sm shadow-primary-500/20">
            <Plus size={18} /> New Ticket
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 flex items-center gap-2"><LifeBuoy className="w-5 h-5 text-primary-500"/> My Tickets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100 text-sm">
                <th className="py-4 px-6 font-semibold text-slate-600">Ticket ID</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Subject</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Status</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Priority</th>
                <th className="py-4 px-6 font-semibold text-slate-600">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 text-slate-500 font-medium">{ticket.id}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{ticket.subject}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      ticket.status === 'Open' ? 'bg-amber-100 text-amber-700' : 'bg-primary-100 text-primary-700'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-bold ${ticket.priority === 'High' ? 'text-rose-600' : 'text-amber-600'}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{ticket.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
