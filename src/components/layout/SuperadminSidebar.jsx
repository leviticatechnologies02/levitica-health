import React from 'react';
import { NavLink } from 'react-router-dom';
import { SUPERADMIN_NAV } from '../../config/navigation';
import { LogOut } from 'lucide-react';

const SuperadminSidebar = ({ isCollapsed, isMobileOpen, setIsMobileOpen }) => {
  return (
    <>
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className={`bg-white border-r border-secondary-100 flex flex-col h-screen fixed top-0 left-0 shadow-sm transition-all duration-300 z-50
        ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full'} 
        md:translate-x-0 ${isCollapsed ? 'md:w-20' : 'md:w-64'}`}
      >
        <div className="p-4">
          <div className={`bg-white rounded-xl shadow-sm border border-secondary-100 flex items-center justify-center transition-all duration-300 ${isCollapsed ? 'md:p-1 md:h-12' : 'p-1.5'}`}>
            <img
              src={isCollapsed ? "/levitica_logo.png" : "/sidebarlogo.png"}
              alt="Levitica Health"
              className={`w-full object-contain transition-all duration-300 hidden md:block ${isCollapsed ? 'max-h-8' : 'max-h-20'}`}
            />
            <img
              src="/sidebarlogo.png"
              alt="Levitica Health"
              className="w-full object-contain transition-all duration-300 md:hidden max-h-16"
            />
          </div>
        </div>

        <div className={`px-6 py-3 transition-opacity duration-300 ${isCollapsed ? 'md:opacity-0 md:h-0 md:overflow-hidden md:py-0' : 'opacity-100'}`}>
          <p className="text-[11px] font-bold text-secondary-400 tracking-wider whitespace-nowrap">Menu</p>
        </div>

        <nav className={`flex-1 pb-6 space-y-1.5 overflow-y-auto px-4 ${isCollapsed ? 'md:px-3' : ''}`}>
          {SUPERADMIN_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end
                onClick={() => setIsMobileOpen(false)}
                title={isCollapsed ? item.name : ''}
                className={({ isActive }) =>
                  `flex items-center py-2.5 rounded-lg transition-all duration-200 overflow-hidden px-4 gap-3 ${isCollapsed ? 'md:justify-center md:px-0' : ''} ${isActive
                    ? 'bg-primary-500 text-white font-medium shadow-md shadow-primary-500/20'
                    : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                  }`
                }
              >
                <Icon className={`shrink-0 ${isCollapsed ? 'md:w-[22px] md:h-[22px] w-[18px] h-[18px]' : 'w-[18px] h-[18px]'}`} />
                <span className={`text-sm whitespace-nowrap ${isCollapsed ? 'md:hidden' : ''}`}>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-secondary-100">
          <button
            onClick={() => window.location.href = '/login'}
            title={isCollapsed ? "Logout" : ""}
            className={`flex items-center w-full py-2.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors font-medium group overflow-hidden px-4 gap-3 ${isCollapsed ? 'md:justify-center md:px-0' : ''}`}
          >
            <LogOut className={`shrink-0 w-5 h-5 transition-transform ${!isCollapsed ? 'group-hover:-translate-x-1' : ''}`} />
            <span className={`text-sm whitespace-nowrap ${isCollapsed ? 'md:hidden' : ''}`}>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SuperadminSidebar;
