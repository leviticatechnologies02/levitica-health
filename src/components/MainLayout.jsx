import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';

const MainLayout = ({ role = 'superadmin' }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-secondary-50">
      <Sidebar 
        role={role} 
        isCollapsed={isSidebarCollapsed} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ml-0 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        <Header
          toggleDesktop={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isDesktopCollapsed={isSidebarCollapsed}
          toggleMobile={() => setIsMobileOpen(!isMobileOpen)}
          isMobileOpen={isMobileOpen}
        />

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
