import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">You need to be logged in to view this page.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome back, {user.username}!</h1>
        <div className="space-y-4">
          <div>
            <p className="text-xl text-gray-700">Email:</p>
            <p className="text-lg text-gray-600">{user.email}</p>
          </div>
          {/* Add more user details as needed */}
        </div>
        <div className="mt-6">
          <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
              Edit Profile
        </button>
        </div>
      </div>
    </div>
  );
};


export default Profile;