import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import ReceptionistSidebar from "./ReceptionistSidebar";

const ReceptionistMainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <ReceptionistSidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <Header
  toggleDesktop={() => setIsCollapsed(!isCollapsed)}
  isDesktopCollapsed={isCollapsed}
  toggleMobile={() => setIsMobileOpen(!isMobileOpen)}
  isMobileOpen={isMobileOpen}
/>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ReceptionistMainLayout;