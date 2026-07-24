import React, { useState } from 'react';
import { Search, Send, User, MoreVertical, Paperclip } from 'lucide-react';

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const contacts = [
    { id: 1, name: 'Nurse Clara (3A)', message: 'Patient in Room 302 needs...', time: '10:45 AM', unread: true },
    { id: 2, name: 'Dr. Emily Chen', message: 'Can you review the X-ray?', time: 'Yesterday', unread: false },
    { id: 3, name: 'Admin Staff', message: 'Your schedule for tomorrow is updated.', time: 'Monday', unread: false },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-4 h-[calc(100vh-100px)]">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Messaging</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex h-full overflow-hidden">
        {/* Contacts Sidebar */}
        <div className="w-1/3 border-r border-slate-100 flex flex-col bg-slate-50/30">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact, idx) => (
              <div key={contact.id} className={`p-4 border-b border-slate-50 cursor-pointer transition-colors flex gap-3 ${idx === 0 ? 'bg-primary-50/50' : 'hover:bg-slate-50'}`}>
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-slate-500" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-sm truncate pr-2 ${contact.unread ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>{contact.name}</h4>
                    <span className={`text-[10px] shrink-0 ${contact.unread ? 'text-primary-600 font-bold' : 'text-slate-400'}`}>{contact.time}</span>
                  </div>
                  <p className={`text-xs truncate ${contact.unread ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>{contact.message}</p>
                </div>
                {contact.unread && <div className="w-2.5 h-2.5 bg-primary-500 rounded-full mt-1.5 shrink-0"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="w-2/3 flex flex-col bg-white">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Nurse Clara (3A)</h3>
                <p className="text-xs text-emerald-500 font-medium">Online</p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreVertical size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/20">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0"></div>
              <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-sm text-sm text-slate-700">
                Doctor, the patient in Room 302 is reporting mild pain. Should we administer the prescribed painkiller early?
              </div>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">10:45 AM</span>
            </div>
          </div>
          
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors shrink-0">
                <Paperclip size={20} />
              </button>
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-primary-500 focus:bg-white text-sm"
              />
              <button className="p-2.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors shadow-sm shrink-0">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
