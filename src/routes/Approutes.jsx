import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";

import SuperadminRoutes from "./SuperadminRoutes";
import AdminRoutes from "./AdminRoutes";

const Approutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />

            <Route path="/superadmin/*" element={<SuperadminRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
    );
};

export default Approutes;
