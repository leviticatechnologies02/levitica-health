import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";

import Dashboard from "../pages/Doctor/Dashboard";
import AppointmentTracking from "../pages/Doctor/AppointmentTracking";
import Schedule from "../pages/Doctor/Schedule";
import Patients from "../pages/Doctor/Patients";
import TreatmentPlans from "../pages/Doctor/TreatmentPlans";
import Prescriptions from "../pages/Doctor/Prescriptions";
import Labs from "../pages/Doctor/Labs";
import Inpatient from "../pages/Doctor/Inpatient";
import Messages from "../pages/Doctor/Messages";
import Reports from "../pages/Doctor/Reports";
import Profile from "../pages/Doctor/Profile";
import Tickets from "../pages/Doctor/Tickets";

const DoctorRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout role="doctor" />}>
        <Route index element={<Dashboard />} />
        <Route path="appointment-tracking" element={<AppointmentTracking />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="patients" element={<Patients />} />
        <Route path="treatment-plans" element={<TreatmentPlans />} />
        <Route path="prescriptions" element={<Prescriptions />} />
        <Route path="labs" element={<Labs />} />
        <Route path="inpatient" element={<Inpatient />} />
        <Route path="messages" element={<Messages />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<Profile />} />
        <Route path="tickets" element={<Tickets />} />
      </Route>
    </Routes>
  );
};

export default DoctorRoutes;
