import { configureStore } from "@reduxjs/toolkit"
import AuthReducer from "../features/Auth/hooks/AuthSlice.jsx"

console.log(AuthReducer);

export const Store = configureStore({
    reducer:{
        auth : AuthReducer
    }
})
console.log(Store.getState());

