import React, { useEffect, useState } from 'react';
import { CheckCircle, User, CreditCard } from 'lucide-react';
import { BASE_URL } from '../../config';

const Users = () => {
  const [users, setUsers] = useState([]);

  const userList = async () => {
    try {
      const URL = `${BASE_URL}/users/list`;
      const data = await fetch(URL, {
        method: "GET",
        credentials: "include",
      });
      const response = await data.json();
      console.log(response.data);
      if (response.data) {
        setUsers(response.data);
      }
    } catch (err) {
      console.error("User listing error:", err);
    }
  };

  useEffect(() => {
    userList();
  }, []);

  // Generate avatar from username
  const getAvatarColor = (username) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA15E'];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getInitials = (username) => {
    return username
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Registered Voters</h2>
        <p className="text-gray-600 mt-2">Manage all voters and admins in the system</p>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {users && users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Card Container */}
              <div className="flex">
                {/* Left Side - Avatar */}
                <div className="w-32 flex-shrink-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                    style={{ backgroundColor: getAvatarColor(user.username) }}
                  >
                    {getInitials(user.username)}
                  </div>
                </div>

                {/* Right Side - User Data */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  {/* User Info */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {user.username}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                      <CreditCard size={14} />
                      {user.aadharCardNumber}
                    </p>
                  </div>

                  {/* Status & Role */}
                  <div className="flex items-center gap-3">
                    {/* Role Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {user.role}
                    </span>

                    {/* Vote Status */}
                    {user.isVoted && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        <CheckCircle size={14} />
                        Voted
                      </span>
                    )}
                    {!user.isVoted && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        <User size={14} />
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-1 lg:col-span-2 bg-white rounded-xl shadow-md p-12 text-center">
            <User size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
