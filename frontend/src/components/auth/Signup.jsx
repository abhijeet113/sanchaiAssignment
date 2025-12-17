import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import axios from "axios";
import apiConfig from "../endpoint/apiConfig";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple form validation
    if (password !== confirmPassword) {
      toast.warn("Password does not match");
      return;
    }

    if (!termsAccepted) {
      toast.warn("You must accept the terms and conditions.");
      return;
    }

    const userData = {
        email,
        password
      };
    

    try {
      const response = await axios.post(apiConfig.auth.signup, userData,{
        headers: {
            'Content-Type': 'application/json', // Ensure the request is in JSON format
          }
      });
      console.log(response);
      if (response.status === 201) {
        toast.success("Registered successfully!");
        navigate("/login"); // Use navigate instead of history.push
      } else {
        toast.error(response.message);
      }
    } catch (error) {
        console.log(error);
        
        toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-white leading-tight tracking-tight md:text-3xl">
            Create an Account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                  I accept the <a className="font-medium text-blue-600 hover:underline dark:text-blue-400" href="#">Terms and Conditions</a>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create an Account
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account? <Link className="text-black" to="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
      {/* ToastContainer for toast notifications */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Signup;
