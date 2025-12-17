import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  user: JSON.parse(localStorage.getItem("user")) || null, // Initialize from localStorage if available
  token: localStorage.getItem("token") || null, // Initialize from localStorage if available

};

const authSlice = createSlice({
  name: "auth",
  initialState,  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Persist the user and token in localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      // Remove user and token from localStorage when logging out
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
