import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";

import Dashboard from "../pages/Hospital owner/Dashboard";

import Regions from "../pages/Hospital owner/regions/Regions";
import RegionsAdmins from "../pages/Hospital owner/regions/RegionsAdmins";

import Groups from "../pages/Hospital owner/groups/Groups";
import GroupAdmins from "../pages/Hospital owner/groups/GroupAdmins";

import HospitalList from "../pages/Hospital owner/hospitals/HospitalList";
import CreateHospital from "../pages/Hospital owner/hospitals/CreateHospital";
import HospitalBranchHeads from "../pages/Hospital owner/hospitals/BranchHeads";

import Patients from "../pages/Hospital owner/Patients";

import Subscriptions from "../pages/Hospital owner/Subscriptions";

import RepOrganization from "../pages/Hospital owner/Reports";

import Notifications from "../pages/Hospital owner/Notifications";
import Settings from "../pages/Hospital owner/Settings";
import Profile from "../pages/Hospital owner/Profile";
import Reports from "../pages/Hospital owner/Reports";

const HospitalOwnerRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout role="hospitalOwner" />}>
                <Route index element={<Dashboard />} />

                <Route path="regions/list" element={<Regions />} />
                <Route path="regions/admins" element={<RegionsAdmins />} />

                <Route path="groups/list" element={<Groups />} />
                <Route path="groups/admins" element={<GroupAdmins />} />

                <Route path="hospitals/list" element={<HospitalList />} />
                <Route path="hospitals/create" element={<CreateHospital />} />
                <Route path="hospitals/branch-heads" element={<HospitalBranchHeads />} />

                <Route path="users" element={<Patients />} />

                <Route path="subscription" element={<Subscriptions />} />

                <Route path="reports" element={<Reports />} />

                <Route path="notifications" element={<Notifications />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
    );
};

export default HospitalOwnerRoutes;
