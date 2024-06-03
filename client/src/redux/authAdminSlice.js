import { createSlice } from "@reduxjs/toolkit";

const authAdminSlice = createSlice({
  name: "authAdmin",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    loginAdminStart: (state) => {
      state.login.isFetching = true;
    },
    loginAdminSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload.user;
      state.login.error = false;
    },
    loginAdminFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerAdminStart: (state) => {
      state.register.isFetching = true;
    },
    registerAdminSuccess: (state) => {
      state.register.isFetching = false;
      state.register.success = true;
      state.register.error = false;
    },
    registerAdminFalied: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },
    logoutAdminStart: (state) => {
      state.login.isFetching = true;
    },
    logoutAdminSuccess: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.error = false;
      state.login.tenantURL = null;
    },
    logoutAdminFalied: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});
export const {
  loginAdminStart,
  loginAdminSuccess,
  loginAdminFailed,
  registerAdminStart,
  registerAdminSuccess,
  registerAdminFalied,
  logoutAdminStart,
  logoutAdminSuccess,
  logoutAdminFalied,
} = authAdminSlice.actions;

export default authAdminSlice.reducer;
