import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";

import Dashboard from "../pages/GroupAdmin/Dashboard";
import Branches from "../pages/GroupAdmin/Branches";
import BranchAdmins from "../pages/GroupAdmin/BranchAdmins";
import Patients from "../pages/GroupAdmin/Patients";
import Reports from "../pages/GroupAdmin/Reports";
import Announcements from "../pages/GroupAdmin/Announcements";
import Settings from "../pages/GroupAdmin/Settings";
import Profile from "../pages/GroupAdmin/Profile";

const GroupAdminRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout role="groupAdmin" />}>
                <Route index element={<Dashboard />} />
                
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

export default GroupAdminRoutes;
