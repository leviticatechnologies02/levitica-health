import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import MainLayout from "../components/MainLayout";
import Dashboard from "../pages/superadmin/Dashboard";

const Approutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/superadmin" element={<MainLayout role="superadmin" />}>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<div className="p-4">User Management Coming Soon</div>} />
                <Route path="logs" element={<div className="p-4">Activity Logs Coming Soon</div>} />
                <Route path="settings" element={<div className="p-4">Settings Coming Soon</div>} />
            </Route>
        </Routes>
    );
};

export default Approutes;
