import React from 'react';
import { NavLink } from 'react-router-dom';
import { SUPERADMIN_NAV } from '../../config/navigation';

const Sidebar = ({ role = 'superadmin', isCollapsed }) => {
  const navItems = role === 'superadmin' ? SUPERADMIN_NAV : [];

  return (
    <div className={`bg-white border-r border-secondary-100 flex flex-col h-screen fixed top-0 left-0 shadow-sm transition-all duration-300 z-20 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4">
        <div className={`bg-white rounded-xl shadow-sm border border-secondary-100 flex items-center justify-center transition-all duration-300 ${isCollapsed ? 'p-1 h-12' : 'p-1.5'}`}>
          <img
            src={isCollapsed ? "/levitica_logo.png" : "/sidebarlogo.png"}
            alt="Levitica Health"
            className={`w-full object-contain transition-all duration-300 ${isCollapsed ? 'max-h-8' : 'max-h-20'}`}
          />
        </div>
      </div>

      <div className={`px-6 py-3 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 h-0 overflow-hidden py-0' : 'opacity-100'}`}>
        <p className="text-[11px] font-bold text-secondary-400 tracking-wider whitespace-nowrap">Menu</p>
      </div>

      <nav className={`flex-1 pb-6 space-y-1.5 overflow-y-auto ${isCollapsed ? 'px-3' : 'px-4'}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/superadmin'}
              title={isCollapsed ? item.name : ''}
              className={({ isActive }) =>
                `flex items-center py-2.5 rounded-lg transition-all duration-200 overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'px-4 gap-3'} ${isActive
                  ? 'bg-primary-500 text-white font-medium shadow-md shadow-primary-500/20'
                  : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                }`
              }
            >
              <Icon size={isCollapsed ? 22 : 18} className="shrink-0" />
              {!isCollapsed && <span className="text-sm whitespace-nowrap">{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4">
        <button
          onClick={() => window.location.href = '/login'}
          title={isCollapsed ? "Logout" : ""}
          className={`flex items-center w-full py-2.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors font-medium group overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'px-4 gap-3'}`}
        >
          <svg className={`w-5 h-5 shrink-0 ${!isCollapsed && 'group-hover:-translate-x-1'} transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!isCollapsed && <span className="text-sm whitespace-nowrap">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
