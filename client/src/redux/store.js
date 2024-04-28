import {configureStore} from "@reduxjs/toolkit"
import authBusinessReducer from "./authBusinessSlice"

export default configureStore({
    reducer:{
        authBusiness:authBusinessReducer
    }
})