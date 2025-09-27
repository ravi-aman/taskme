import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your components
import Profile from './Profile';
import ChangePassword from './ChangePassword';
// Import your existing components
// import Dashboard from './Dashboard';
// import Login from './Login';

// Example of how to integrate the new components into your routing
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Your existing routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* New profile routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        
        {/* Redirect */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;