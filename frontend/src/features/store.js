import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice"
import quoteReducer from "./quote/quoteSlice"

const store = configureStore({
    reducer : {
        auth : authReducer,
        quote : quoteReducer
    }
})

export default store