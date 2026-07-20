import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";

import AdminDashboard from "../pages/admin/Dashboard";
import AdminPatients from "../pages/admin/Patients";
import AdminAppointments from "../pages/admin/Appointments";
import AdminPharmacy from "../pages/admin/Pharmacy";
import AdminLaboratory from "../pages/admin/Laboratory";
import AdminRadiology from "../pages/admin/Radiology";
import AdminInventory from "../pages/admin/Inventory";
import AdminBilling from "../pages/admin/Billing";
import AdminAmbulance from "../pages/admin/Ambulance";
import AdminAnnouncements from "../pages/admin/Announcements";
import AdminReports from "../pages/admin/Reports";
import AdminSettings from "../pages/admin/Settings";
import AdminProfile from "../pages/admin/AdminProfile";

import AdminHospitalProfile from "../pages/admin/hospital/Profile";
import AdminHospitalDepartments from "../pages/admin/hospital/Departments";
import AdminHospitalBlocks from "../pages/admin/hospital/Blocks";
import AdminHospitalFloors from "../pages/admin/hospital/Floors";
import AdminHospitalWards from "../pages/admin/hospital/Wards";
import AdminHospitalRooms from "../pages/admin/hospital/Rooms";
import AdminHospitalBeds from "../pages/admin/hospital/Beds";

import AdminStaffDoctors from "../pages/admin/staff/Doctors";
import AdminStaffNurses from "../pages/admin/staff/Nurses";
import AdminStaffReceptionists from "../pages/admin/staff/Receptionists";
import AdminStaffPharmacists from "../pages/admin/staff/Pharmacists";
import AdminStaffEmployees from "../pages/admin/staff/Employees";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout role="admin" />}>
                <Route index element={<AdminDashboard />} />
                <Route path="hospital/profile" element={<AdminHospitalProfile />} />
                <Route path="hospital/departments" element={<AdminHospitalDepartments />} />
                <Route path="hospital/blocks" element={<AdminHospitalBlocks />} />
                <Route path="hospital/floors" element={<AdminHospitalFloors />} />
                <Route path="hospital/wards" element={<AdminHospitalWards />} />
                <Route path="hospital/rooms" element={<AdminHospitalRooms />} />
                <Route path="hospital/beds" element={<AdminHospitalBeds />} />
                
                <Route path="staff/doctors" element={<AdminStaffDoctors />} />
                <Route path="staff/nurses" element={<AdminStaffNurses />} />
                <Route path="staff/receptionists" element={<AdminStaffReceptionists />} />
                <Route path="staff/pharmacists" element={<AdminStaffPharmacists />} />
                <Route path="staff/employees" element={<AdminStaffEmployees />} />
                
                <Route path="patients" element={<AdminPatients />} />
                <Route path="appointments" element={<AdminAppointments />} />
                <Route path="pharmacy" element={<AdminPharmacy />} />
                <Route path="laboratory" element={<AdminLaboratory />} />
                <Route path="radiology" element={<AdminRadiology />} />
                <Route path="inventory" element={<AdminInventory />} />
                <Route path="billing" element={<AdminBilling />} />
                <Route path="ambulance" element={<AdminAmbulance />} />
                <Route path="announcements" element={<AdminAnnouncements />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="profile" element={<AdminProfile />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
