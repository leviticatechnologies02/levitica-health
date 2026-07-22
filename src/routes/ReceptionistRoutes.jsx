import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";

import Dashboard from "../pages/receptionist/Dashboard";
import PatientRegistration from "../pages/receptionist/PatientRegistration";
import AppointmentBooking from "../pages/receptionist/AppointmentBooking";
import PatientCheckIn from "../pages/receptionist/PatientCheckIn";
import AdmissionInitiation from "../pages/receptionist/Admissioninitiation";
import PatientSearch from "../pages/receptionist/PatientSearch";
import PatientQueue from "../pages/receptionist/PatientQueue";
import TokenGeneration from "../pages/receptionist/TokenGeneration";
import Reports from "../pages/receptionist/Reports";
import Profile from "../pages/receptionist/Profile";
const ReceptionistRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout role="receptionist" />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route
          path="patient-registration"
          element={<PatientRegistration />}
        />
        <Route
          path="appointment-booking"
          element={<AppointmentBooking />}
        />
        <Route path="token-generation" element={<TokenGeneration />} />
        <Route path="patient-search" element={<PatientSearch />} />
        <Route path="patient-queue" element={<PatientQueue />} />
        <Route path="patient-checkin" element={<PatientCheckIn />} />
        <Route path="admission-initiation" element={<AdmissionInitiation />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default ReceptionistRoutes;