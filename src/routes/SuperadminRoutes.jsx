import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";

import Dashboard from "../pages/superadmin/Dashboard";
import Hospitals from "../pages/superadmin/Hospitals";
import AddHospital from "../pages/superadmin/AddHospital";
import Subscriptions from "../pages/superadmin/Subscriptions";
import Settings from "../pages/superadmin/Settings";
import Announcments from "../pages/superadmin/Announcments";
import Plans from "../pages/superadmin/Plans";
import SuperadminProfile from "../pages/superadmin/SuperadminProfile";

const SuperadminRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout role="superadmin" />}>
                <Route index element={<Dashboard />} />
                <Route path="hospitals" element={<Hospitals />} />
                <Route path="hospitals/add" element={<AddHospital />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="plans" element={<Plans />} />
                <Route path="announcements" element={<Announcments />} />
                <Route path="profile" element={<SuperadminProfile />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    );
};

export default SuperadminRoutes;
