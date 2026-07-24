import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";

import Dashboard from "../pages/Nurse/Dashboard";
import Inpatients from "../pages/Nurse/Inpatients";
import Vitals from "../pages/Nurse/Vitals";
import Medications from "../pages/Nurse/Medications";
import BedManagement from "../pages/Nurse/BedManagement";
import Profile from "../pages/Nurse/Profile";

const NurseRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout role="nurse" />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="inpatients" element={<Inpatients />} />
        <Route path="vitals" element={<Vitals />} />
        <Route path="medications" element={<Medications />} />
        <Route path="bed-management" element={<BedManagement />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default NurseRoutes;
