import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { BASE_URL } from '../../../config';
import { toast } from 'react-toastify';

const AppLayout = () => {
  // Mock role management for preview purposes
  const [role, setRole] = useState(() => {
    return localStorage.getItem('Role') || 'user';
  });
  const navigate = useNavigate();

  const handleRoleToggle = () => {
    const newRole = role === 'admin' ? 'user' : 'admin';
    setRole(newRole);
    // localStorage.setItem('userRole', newRole);
    navigate('/home'); // Redirect to dashboard on role change
  };

  const handleLogout = async() => {
    try{
      const URL = `${BASE_URL}/logout`
      const response = await fetch(URL,{
        method:"POST",
        credentials:'include'
      }) 
      const data = await response.json()
      toast.info({
        position: "top-center",
        theme: "colored",
      })
    }catch(err){
      console.log('Logout Error !', err.message)
    }finally{
      localStorage.removeItem('Role');
      navigate('/');
    }
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
