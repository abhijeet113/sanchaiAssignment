import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Use dispatch and selector hooks
import { logout } from '../redux/authSlice'; // Import the logout action
import { useSocket } from '../hooks/useSocket';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const Navbar = () => {
  const { notification } = useSocket();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Get the user from Redux store
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

  // Handle logout action
  if(notification){
    alert(notification);
  }

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout to Redux store
    localStorage.removeItem('token'); // Optionally remove token from localStorage if used
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">WEBSITE NAME</Link>
        </div>
        <div>
          <ul className="flex space-x-6">
            <li><Link className="text-white" to="/">Home</Link></li>
            <li><Link className="text-white" to="/features">Features</Link></li> 
            <li><Link className="text-white" to="/notification">Notifications</Link></li> 
            <li><Link className="text-white" to="/chatlist">Chat</Link></li>

            {/* Conditional rendering: if user exists, show dropdown */}
            {user ? (
              <li className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown visibility
                  className="text-white focus:outline-none"
                >
                  Hello, {user.username}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                    <ul>
                      <li>
                        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-200"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              <li><Link className="text-white" to="/login">Login</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
