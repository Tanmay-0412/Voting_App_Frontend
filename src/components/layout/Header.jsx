import React from 'react';

const Header = ({ role, handleRoleToggle }) => {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 z-10">
      <h2 className="text-xl font-semibold text-gray-800">
        {role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
      </h2>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Preview Role:</span>
          <button
            onClick={handleRoleToggle}
            className="px-3 py-1.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
          >
            Switch to {role === 'admin' ? 'User' : 'Admin'}
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shadow-sm">
            {role === 'admin' ? 'A' : 'U'}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">{role === 'admin' ? 'Admin User' : 'Voter'}</p>
            <p className="text-xs text-gray-500 capitalize">{role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
