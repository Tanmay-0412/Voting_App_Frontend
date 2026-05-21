import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const AppLayout = () => {
  // Mock role management for preview purposes
  const [role, setRole] = useState(() => {
    return localStorage.getItem('userRole') || 'user';
  });
  const navigate = useNavigate();

  const handleRoleToggle = () => {
    const newRole = role === 'admin' ? 'user' : 'admin';
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
    navigate('/home'); // Redirect to dashboard on role change
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar role={role} handleLogout={handleLogout} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header role={role} handleRoleToggle={handleRoleToggle} />

        {/* Page Content (Outlet) */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-9xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
