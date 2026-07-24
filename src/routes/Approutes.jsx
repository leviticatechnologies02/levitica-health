import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";

import SuperadminRoutes from "./SuperadminRoutes";
import AdminRoutes from "./AdminRoutes";
import HospitalOwnerRoutes from "./HospitalOwnerRoutes";
import RegionAdminRoutes from "./RegionAdminRoutes";
import GroupAdminRoutes from "./GroupAdminRoutes";
import ReceptionistRoutes from "./ReceptionistRoutes";
import DoctorRoutes from "./DoctorRoutes";
import NurseRoutes from "./NurseRoutes";

const Approutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />

            <Route path="/superadmin/*" element={<SuperadminRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/hospital-owner/*" element={<HospitalOwnerRoutes />} />
            <Route path="/regionAdmin/*" element={<RegionAdminRoutes />} />
            <Route path="/groupAdmin/*" element={<GroupAdminRoutes />} />
            <Route path="/receptionist/*" element={<ReceptionistRoutes />} />
            <Route path="/doctor/*" element={<DoctorRoutes />} />
            <Route path="/nurse/*" element={<NurseRoutes />} />
        </Routes>
    );
};

export default Approutes;
