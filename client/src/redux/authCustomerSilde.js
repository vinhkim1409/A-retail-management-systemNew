import { createSlice } from "@reduxjs/toolkit";

const authCustomerSlice = createSlice({
  name: "authCustomer",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
      tenantURL: null,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    loginCustomerStart: (state) => {
      state.login.isFetching = true;
    },
    loginCustomerSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload.user;
      state.login.tenantURL = action.payload.tenantURL;
      state.login.error = false;
    },
    loginCustomerFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerCustomerStart: (state) => {
      state.register.isFetching = true;
    },
    registerCustomerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.success = true;
      state.register.error = false;
    },
    registerCustomerFalied: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },
    logoutCustomerStart: (state) => {
      state.login.isFetching = true;
    },
    logoutCustomerSuccess: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.error = false;
    },
    logoutCustomerFalied: (state) => {
        state.login.isFetching = false;
        state.login.error = true;
      },
    updateCurrentAddressCustomer:(state,action)=>{
      state.login.currentUser.resCustomer.address=action.payload.address;
    }
  },
});
export const {
  loginCustomerStart,
  loginCustomerSuccess,
  loginCustomerFailed,
  registerCustomerStart,
  registerCustomerSuccess,
  registerCustomerFalied,
  logoutCustomerStart,
  logoutCustomerSuccess,
  logoutCustomerFalied,
  updateCurrentAddressCustomer
} = authCustomerSlice.actions;

export default authCustomerSlice.reducer;
