import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";

import Dashboard from "../pages/Hospital owner/Dashboard";
import OrgProfile from "../pages/Hospital owner/organization/Profile";
import OrgSettings from "../pages/Hospital owner/organization/Settings";
import OrgBranding from "../pages/Hospital owner/organization/Branding";

import RegionsList from "../pages/Hospital owner/regions/List";
import RegionsAdmins from "../pages/Hospital owner/regions/Admins";

import GroupsList from "../pages/Hospital owner/groups/List";
import GroupsAdmins from "../pages/Hospital owner/groups/Admins";

import HospitalList from "../pages/Hospital owner/hospitals/List";
import HospitalCreate from "../pages/Hospital owner/hospitals/Create";
import HospitalBranchHeads from "../pages/Hospital owner/hospitals/BranchHeads";

import OrgUsers from "../pages/Hospital owner/users/OrganizationUsers";
import RoleManagement from "../pages/Hospital owner/users/RoleManagement";
import PermissionManagement from "../pages/Hospital owner/users/PermissionManagement";

import SubPlans from "../pages/Hospital owner/subscription/Plans";
import SubBilling from "../pages/Hospital owner/subscription/Billing";
import SubLicenses from "../pages/Hospital owner/subscription/Licenses";

import RepOrganization from "../pages/Hospital owner/reports/Organization";
import RepHospital from "../pages/Hospital owner/reports/Hospital";
import RepRevenue from "../pages/Hospital owner/reports/Revenue";

import CompLicenses from "../pages/Hospital owner/compliance/Licenses";
import CompAuditLogs from "../pages/Hospital owner/compliance/AuditLogs";

import Notifications from "../pages/Hospital owner/Notifications";
import Integrations from "../pages/Hospital owner/Integrations";
import Settings from "../pages/Hospital owner/Settings";
import Profile from "../pages/Hospital owner/Profile";

const HospitalOwnerRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout role="hospitalOwner" />}>
                <Route index element={<Dashboard />} />
                
                <Route path="organization/profile" element={<OrgProfile />} />
                <Route path="organization/settings" element={<OrgSettings />} />
                <Route path="organization/branding" element={<OrgBranding />} />

                <Route path="regions/list" element={<RegionsList />} />
                <Route path="regions/admins" element={<RegionsAdmins />} />

                <Route path="groups/list" element={<GroupsList />} />
                <Route path="groups/admins" element={<GroupsAdmins />} />

                <Route path="hospitals/list" element={<HospitalList />} />
                <Route path="hospitals/create" element={<HospitalCreate />} />
                <Route path="hospitals/branch-heads" element={<HospitalBranchHeads />} />

                <Route path="users" element={<OrgUsers />} />

                <Route path="subscription" element={<SubPlans />} />

                <Route path="reports/organization" element={<RepOrganization />} />
                <Route path="reports/hospital" element={<RepHospital />} />
                <Route path="reports/revenue" element={<RepRevenue />} />

                <Route path="compliance/licenses" element={<CompLicenses />} />
                <Route path="compliance/audit-logs" element={<CompAuditLogs />} />

                <Route path="notifications" element={<Notifications />} />
                <Route path="integrations" element={<Integrations />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
    );
};

export default HospitalOwnerRoutes;
