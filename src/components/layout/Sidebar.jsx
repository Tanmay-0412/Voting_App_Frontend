import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ role, handleLogout }) => {
  const adminLinks = [
    { name: 'Dashboard', path: '/home' },
    { name: 'Candidates', path: '/candidates' },
    { name: 'Users', path: '/users' },
    { name: 'Profile', path: '/profile' },
  ];

  const userLinks = [
    { name: 'Dashboard', path: '/home' },
    { name: 'Voting Portal', path: '/voting' },
    { name: 'Profile', path: '/profile' },
  ];

  const navLinks = role === 'admin' ? adminLinks : userLinks;

  return (
    <aside className="w-64 bg-white text-gray-800 flex flex-col shadow-xl border-r border-gray-200">
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-2xl font-bold tracking-wider">
          VOTE<span className="text-blue-600">APP</span>
        </h1>
      </div>

      <div className="p-4 mb-2 text-sm text-gray-500 font-semibold tracking-wider uppercase">
        {role === 'admin' ? 'Admin Menu' : 'User Menu'}
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1'
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;