import React from 'react'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from "react-redux"; // ✅ Import Provider
import { store } from './redux/store'; // ✅ Import Redux store

import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProtectedRoute from './redux/ProtectedRoute';
import Profile from './components/auth/Profile'; // ✅ Fixed Capitalization

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/navbar",
    element: <Navbar />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  } 
]);

function App() {
  return (
    <Provider store={store}> {/* ✅ Wrapped App with Redux Provider */}
      <RouterProvider router={router} />
      <ToastContainer /> {/* ✅ Ensures Toast Notifications Work */}
    </Provider>
  );
}

export default App;
