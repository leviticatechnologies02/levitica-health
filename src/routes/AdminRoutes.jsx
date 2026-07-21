import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";

import AdminDashboard from "../pages/Admin/Dashboard";
import AdminPatients from "../pages/Admin/Patients";
import AdminAppointments from "../pages/Admin/Appointments";
import AdminPharmacy from "../pages/Admin/Pharmacy";
import AdminLaboratory from "../pages/Admin/Laboratory";
import AdminRadiology from "../pages/Admin/Radiology";
import AdminInventory from "../pages/Admin/Inventory";
import AdminBilling from "../pages/Admin/Billing";
import AdminAmbulance from "../pages/Admin/Ambulance";
import AdminAnnouncements from "../pages/Admin/Announcements";
import AdminReports from "../pages/Admin/Reports";
import AdminSettings from "../pages/Admin/Settings";
import AdminProfile from "../pages/Admin/AdminProfile";

import AdminHospitalProfile from "../pages/Admin/hospital/Profile";
import AdminHospitalDepartments from "../pages/Admin/hospital/Departments";
import AdminHospitalBlocks from "../pages/Admin/hospital/Blocks";
import AdminHospitalFloors from "../pages/Admin/hospital/Floors";
import AdminHospitalWards from "../pages/Admin/hospital/Wards";
import AdminHospitalRooms from "../pages/Admin/hospital/Rooms";
import AdminHospitalBeds from "../pages/Admin/hospital/Beds";

import AdminStaffDoctors from "../pages/Admin/staff/Doctors";
import AdminStaffNurses from "../pages/Admin/staff/Nurses";
import AdminStaffReceptionists from "../pages/Admin/staff/Receptionists";
import AdminStaffPharmacists from "../pages/Admin/staff/Pharmacists";
import AdminStaffEmployees from "../pages/Admin/staff/Employees";

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
