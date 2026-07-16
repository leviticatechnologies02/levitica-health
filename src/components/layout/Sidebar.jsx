import React from 'react';
import { NavLink } from 'react-router-dom';
import { SUPERADMIN_NAV } from '../../config/navigation';

const Sidebar = ({ role = 'superadmin' }) => {
  // Determine which navigation config to use based on role
  const navItems = role === 'superadmin' ? SUPERADMIN_NAV : [];

  return (
    <div className="w-64 bg-white border-r border-secondary-100 flex flex-col h-screen fixed top-0 left-0 shadow-sm">
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-1.5 flex items-center justify-center">
          <img src="/sidebarlogo.png" alt="Levitica Health" className="w-full max-h-20 object-contain" />
        </div>
      </div>

      <div className="px-6 py-3">
        <p className="text-[10px] font-bold text-secondary-400 tracking-wider uppercase">Menu</p>
      </div>

      <nav className="flex-1 px-4 pb-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/superadmin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-500 text-white font-medium shadow-md shadow-primary-500/20'
                    : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                }`
              }
            >
              <Icon size={18} className="shrink-0" />
              <span className="text-sm">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4">
        <button 
          onClick={() => window.location.href = '/login'}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors font-medium group"
        >
          <svg className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
