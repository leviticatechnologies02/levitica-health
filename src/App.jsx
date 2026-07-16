import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/superadmin/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Superadmin Protected Routes */}
        <Route path="/superadmin" element={<MainLayout role="superadmin" />}>
          {/* Index route for /superadmin matches to Dashboard */}
          <Route index element={<Dashboard />} />
          
          {/* Placeholder for future routes */}
          <Route path="users" element={<div className="p-4">User Management Coming Soon</div>} />
          <Route path="logs" element={<div className="p-4">Activity Logs Coming Soon</div>} />
          <Route path="settings" element={<div className="p-4">Settings Coming Soon</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
