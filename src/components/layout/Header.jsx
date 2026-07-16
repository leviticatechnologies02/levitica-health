import React from 'react';
import { Bell, Search, UserCircle, Menu, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleDesktop, isDesktopCollapsed, toggleMobile, isMobileOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 sm:h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 sticky top-0 z-30 transition-all duration-300">
      <div className="flex items-center gap-3 sm:gap-6 w-full">
        {/* Mobile Toggle */}
        <button
          onClick={toggleMobile}
          className="md:hidden p-2 -ml-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors shrink-0"
        >
          <Menu size={24} />
        </button>

        {/* Desktop Toggle */}
        <button
          onClick={toggleDesktop}
          className="hidden md:block p-2 -ml-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors shrink-0"
          title={isDesktopCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isDesktopCollapsed ? <ChevronRight size={24} /> : <Menu size={24} />}
        </button>

        {/* Search */}
        <div className="flex-1 max-w-xl flex items-center gap-2 sm:gap-3 bg-gray-50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-gray-100 focus-within:border-orange-500/50 focus-within:bg-white transition-all">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-6 shrink-0 ml-4">
        <button className="relative p-2 text-gray-400 hover:text-orange-500 transition-colors rounded-full hover:bg-orange-50">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="hidden sm:flex items-center gap-3 cursor-pointer group">
          <UserCircle size={32} className="text-gray-300 group-hover:text-slate-900 transition-colors" />
          <div className="hidden lg:block text-left">
            <p className="text-sm font-semibold text-gray-800 leading-tight">System Admin</p>
            <p className="text-xs text-gray-500">Superadmin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
