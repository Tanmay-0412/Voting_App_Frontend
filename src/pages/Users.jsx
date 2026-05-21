import React from 'react';
import { BASE_URL } from '../../config';

const Users = () => {

  const userList = async () => {
    try {
      const URL = `${BASE_URL}/users/list`;
      const data = await fetch(URL);
      const response = await data.json();
      console.log(response);
    } catch (err) {
      console.error("User listing error:", err);
    }
  };
  
  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Users</h2>
      <p className="text-gray-600">Manage registered voters and admins here.</p>
    </div>
  );
};

export default Users;
