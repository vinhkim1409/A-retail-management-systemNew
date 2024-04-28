import axios from "axios";
import {api} from "../constant/constant"
import { loginFailed, loginStart, loginSuccess,registerStart } from "./authBusinessSlice";

export const loginBusiness= async(user,dispatch,navigate)=>{
    dispatch(loginStart());
    try {
        const res= await axios.post(`${api}business/login`,user);
        console.log(res)
        dispatch(loginSuccess({user:res.data,tenantURL:user.tenantURL}))

        navigate(`/${user.tenantURL}/business`)
    } catch (error) {
        dispatch(loginFailed())
    }
}
export const registerBusiness= async (user,dispatch,navigate)=>{
    dispatch(registerStart());
    try {
        const res= await axios.post(`${api}business/signup
        `,user);
        console.log(res)
    } catch (error) {
        
    }
}