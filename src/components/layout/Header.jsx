import React from 'react';
import { Bell, Search, UserCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Navigate back to login
    navigate('/login');
  };

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 bg-gray-50 px-4 py-2.5 rounded-full w-96 border border-gray-100 focus-within:border-orange-500/50 focus-within:bg-white transition-all">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search across the system..." 
          className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder:text-gray-400"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-400 hover:text-orange-500 transition-colors rounded-full hover:bg-orange-50">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-gray-200"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <UserCircle size={32} className="text-gray-300 group-hover:text-slate-900 transition-colors" />
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-gray-800 leading-tight">System Admin</p>
            <p className="text-xs text-gray-500">Superadmin</p>
          </div>
        </div>

        <button 
          onClick={handleLogout} 
          className="p-2 ml-2 text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50" 
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
