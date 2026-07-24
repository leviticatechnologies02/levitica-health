import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SuperadminSidebar from './layout/SuperadminSidebar';
import AdminSidebar from './layout/AdminSidebar';
import HospitalOwnerSidebar from './layout/HospitalOwnerSidebar';
import RegionAdminSidebar from './layout/RegionAdminSidebar';
import GroupAdminSidebar from './layout/GroupAdminSidebar';
import ReceptionistSidebar from './layout/ReceptionistSidebar';
import DoctorSidebar from './layout/DoctorSidebar';
import NurseSidebar from './layout/NurseSidebar';
import Header from './layout/Header';


const MainLayout = ({ role = 'superadmin' }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const renderSidebar = () => {
    switch (role) {
      case 'admin': return <AdminSidebar isCollapsed={isSidebarCollapsed} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />;
      case 'hospitalOwner': return <HospitalOwnerSidebar isCollapsed={isSidebarCollapsed} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />;
      case 'regionAdmin': return <RegionAdminSidebar isCollapsed={isSidebarCollapsed} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />;
      case 'groupAdmin': return <GroupAdminSidebar isCollapsed={isSidebarCollapsed} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />;
      case 'receptionist': return <ReceptionistSidebar isCollapsed={isSidebarCollapsed} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />;
      case 'doctor': return <DoctorSidebar isCollapsed={isSidebarCollapsed} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />;
      case 'nurse': return <NurseSidebar isCollapsed={isSidebarCollapsed} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />;
      default: return <SuperadminSidebar isCollapsed={isSidebarCollapsed} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-secondary-50">
      {renderSidebar()}

      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ml-0 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        <Header
          role={role}
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
