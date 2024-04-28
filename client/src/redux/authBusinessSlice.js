import { createSlice } from "@reduxjs/toolkit";

const authBusinessSlice=createSlice({
    name:"authBusiness",
    initialState:{
        login:{
            currentUser:null,
            isFetching:false,
            error:false,
            tenantURL:null
        },
        register:{
            isFetching:false,
            error:false,
            success:false
        }
    },
    reducers:{
        loginStart:(state)=>{
            state.login.isFetching=true
        },
        loginSuccess:(state,action)=>{
            state.login.isFetching=false;
            state.login.currentUser=action.payload.user;
            state.login.tenantURL=action.payload.tenantURL;
            state.login.error=false;
        },
        loginFailed:(state)=>{
            state.login.isFetching=false;
            state.login.error=true
        }
        ,
        registerStart:(state)=>{
            state.register.isFetching=true
        },
        registerSuccess:(state)=>{
            state.register.isFetching=false;
            state.register.success=true;
            state.register.error=false;
        },
        registerFalied:(state)=>{
            state.register.isFetching=false;
            state.register.error=true;
            state.register.success=false;
        }
        ,

    }
})
export const {
    loginStart,loginSuccess,loginFailed,registerStart,registerSuccess,registerFalied
}=authBusinessSlice.actions

export default authBusinessSlice.reducer