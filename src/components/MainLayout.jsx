import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';

const MainLayout = ({ role = 'superadmin' }) => {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Fixed Sidebar */}
      <Sidebar role={role} />

      {/* Main Content Area (offset by sidebar width) */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header />

        {/* The Outlet renders the child route components */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
