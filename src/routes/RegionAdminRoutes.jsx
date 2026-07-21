import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";

import Dashboard from "../pages/RegionAdmin/Dashboard";
import Groups from "../pages/RegionAdmin/Groups";
import GroupAdmins from "../pages/RegionAdmin/GroupAdmins";
import Branches from "../pages/RegionAdmin/Branches";
import BranchAdmins from "../pages/RegionAdmin/BranchAdmins";
import Patients from "../pages/RegionAdmin/Patients";
import Reports from "../pages/RegionAdmin/Reports";
import Announcements from "../pages/RegionAdmin/Announcements";
import Settings from "../pages/RegionAdmin/Settings";
import Profile from "../pages/RegionAdmin/Profile";

const RegionAdminRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout role="regionAdmin" />}>
                <Route index element={<Dashboard />} />
                
                <Route path="groups" element={<Groups />} />
                <Route path="group-admins" element={<GroupAdmins />} />

                <Route path="branches" element={<Branches />} />
                <Route path="branch-admins" element={<BranchAdmins />} />

                <Route path="patients" element={<Patients />} />

                <Route path="reports" element={<Reports />} />

                <Route path="announcements" element={<Announcements />} />

                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
    );
};

export default RegionAdminRoutes;
