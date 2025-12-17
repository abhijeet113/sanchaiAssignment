import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiConfig from "../endpoint/apiConfig";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for navigation
  const dispatch = useDispatch(); // useDispatch hook for Redux

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const userData = {
      email,
      password
    };
    try {
      const response = await axios.post(apiConfig.auth.login, userData, {
        headers: {
          'Content-Type': 'application/json', // Ensure the request is in JSON format
        }
      });
      if (response.status === 200) {
        toast.success("Login successful!");
        const { token, user } = response.data;

        // Dispatch loginSuccess to store token and user in the Redux store
        dispatch(loginSuccess({ token, user }));
        navigate("/"); // Navigate to home page
      } else {
        toast.error(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.message : "Error during login request");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-white leading-tight tracking-tight md:text-3xl">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
              </div>
              <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{' '}
              <Link className="text-black" to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
