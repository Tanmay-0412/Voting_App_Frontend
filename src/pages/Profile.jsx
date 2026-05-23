import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../config';
import { Edit2, Lock, Save, X } from 'lucide-react';
import { toast } from "react-toastify";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    age: '',
    aadharCardNumber: '',
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const URL = `${BASE_URL}/profile/view`;
      const response = await fetch(URL, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      
      if (data.success || data.data) {
        const user = data.data || data;
        setUserData(user);
        setFormData({
          username: user.username || '',
          email: user.email || '',
          mobile: user.mobile || '',
          age: user.age || '',
          aadharCardNumber: user.aadharCardNumber || '',
        });
      }
    } catch (err) {
      console.log('User profile not fetched', err.message);
      setMessage({ type: 'error', text: 'Failed to fetch profile data' });
    } finally {
      setLoading(false);
    }
  };

  // Handle edit profile
  const handleEditProfile = async (e) => {
    console.log("hii")
    e.preventDefault();
    console.log(userData)
    try {
      setSubmitting(true);
      const URL = `${BASE_URL}/profile/update/${userData._id}`;
      const response = await fetch(URL, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          mobile: formData.mobile,
          age: formData.age,
        }),
      });
      
      const data = await response.json();
      
      if (data.success || response.ok) {
        // setMessage({ type: 'success', text: '' });
        toast.success('Profile updated successfully!', {
        position: "top-right",
        theme: "colored",
        });
        setIsEditing(false);
        fetchUserProfile();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update profile' });
      }
    } catch (err) {
      console.log('Error updating profile', err.message);
      setMessage({ type: 'error', text: 'Error updating profile' });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle change password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    try {
      setSubmitting(true);
      const URL = `${BASE_URL}/profile/changePassword`;
      const response = await fetch(URL, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        }),
      });
      
      const data = await response.json();
      
      if (data.success || response.ok) {
        setMessage({ type: 'success', text: 'Password changed successfully!' });
        setShowPasswordModal(false);
        setPasswordData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to change password' });
      }
    } catch (err) {
      console.log('Error changing password', err.message);
      setMessage({ type: 'error', text: 'Error changing password' });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-8xl mx-auto">
        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Voter Profile</h1>

        {/* Main Container - Card and Edit Section Side by Side */}
        <div className="flex gap-6 items-start">
          {/* Voter ID Card Section */}
          <div className="w-106 h-132 flex-shrink-0">
            {/* Voter ID Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-6 text-white relative overflow-hidden h-full">
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-sm font-semibold opacity-80 tracking-wider">VOTER IDENTITY</h2>
                    <p className="text-xs opacity-60 mt-1">Official Voting Card</p>
                  </div>
                  <div className="bg-white text-blue-600 px-2 py-1 rounded text-xs font-bold">
                    {userData?.role?.toUpperCase()}
                  </div>
                </div>

                {/* Main Content */}
                <div className="space-y-4">
                  {/* Voter ID */}
                  <div>
                    <p className="text-xs opacity-70 mb-1 tracking-wider">VOTER ID</p>
                    <p className="text-lg font-bold font-mono tracking-wide">{userData?._id?.substring(0, 12).toUpperCase()}</p>
                  </div>

                  {/* Name */}
                  <div>
                    <p className="text-xs opacity-70 mb-1 tracking-wider">REGISTERED NAME</p>
                    <p className="text-2xl font-bold">{userData?.username}</p>
                  </div>

                  {/* Aadhar */}
                  <div>
                    <p className="text-xs opacity-70 mb-1 tracking-wider">AADHAR NUMBER</p>
                    <p className="text-sm font-mono tracking-widest">{userData?.aadharCardNumber}</p>
                  </div>

                  {/* Age */}
                  <div>
                    <p className="text-xs opacity-70 mb-1 tracking-wider">AGE</p>
                    <p className="text-sm font-bold">{userData?.age} years</p>
                  </div>

                  {/* Email */}
                  <div>
                    <p className="text-xs opacity-70 mb-1 tracking-wider">EMAIL</p>
                    <p className="text-xs break-all">{userData?.email}</p>
                  </div>

                  {/* Mobile */}
                  <div>
                    <p className="text-xs opacity-70 mb-1 tracking-wider">MOBILE</p>
                    <p className="text-sm font-mono">{userData?.mobile}</p>
                  </div>

                  {/* Voting Status */}
                  <div className="flex justify-between items-end pt-3 border-t border-white border-opacity-30">
                    <div>
                      <p className="text-xs opacity-70 mb-1 tracking-wider">VOTING STATUS</p>
                      <p className={`text-sm font-bold ${userData?.isVoted ? 'text-green-300' : 'text-yellow-300'}`}>
                        {userData?.isVoted ? '✓ VOTED' : 'PENDING'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-70 mb-1">Valid Date</p>
                      <p className="font-mono text-xs">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Section */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Profile Details</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
              >
                <Lock size={18} />
                Change Password
              </button>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                <Edit2 size={18} />
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
          </div>

          <form onSubmit={handleEditProfile} className="space-y-6 flex-col">
            <div className='grid grid-cols-2 gap-6'>
            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="Enter username"
                  required
                />
              ) : (
                <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-700 font-medium">
                  {userData?.username}
                </div>
              )}
            </div>

            {/* Aadhar Number Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Aadhar Card Number
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="aadharCardNumber"
                  value={formData.aadharCardNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="Enter Aadhar number"
                  required
                />
              ) : (
                <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-700 font-medium font-mono">
                  {userData?.aadharCardNumber}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="Enter email address"
                  required
                />
              ) : (
                <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-700 font-medium">
                  {userData?.email}
                </div>
              )}
            </div>

            {/* Mobile Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="Enter mobile number"
                  required
                />
              ) : (
                <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-700 font-medium">
                  {userData?.mobile}
                </div>
              )}
            </div>

            {/* Age Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Age
              </label>
              {isEditing ? (
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="Enter age"
                  required
                  min="18"
                  max="120"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-700 font-medium">
                  {userData?.age}
                </div>
              )}
            </div>

            {/* Role Field (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role
              </label>
              <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-700 font-medium">
                {userData?.role?.charAt(0).toUpperCase() + userData?.role?.slice(1)}
              </div>
            </div>
          </div>

            {/* Voting Status (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Voting Status
              </label>
              <div className={`px-4 py-3 border-2 rounded-lg font-medium ${userData?.isVoted ? 'bg-green-50 border-green-300 text-green-700' : 'bg-yellow-50 border-yellow-300 text-yellow-700'}`}>
                {userData?.isVoted ? '✓ You have already voted' : '○ You have not voted yet'}
              </div>
            </div>

            {/* Submit Button */}
            {isEditing && (
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-colors font-bold text-lg"
                >
                  <Save size={20} />
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-bold text-lg"
                >
                  <X size={20} />
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="Enter current password"
                  required
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="Enter new password"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="Confirm new password"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-colors font-bold"
                >
                  {submitting ? 'Changing...' : 'Change Password'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
