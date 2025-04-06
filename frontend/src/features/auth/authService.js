import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../hooks/axiosConfig";


export const handleLogin = async (formData) => {
  const loginPromise = axiosInstance
    .post("/api/auth/login", formData)
    .then((response) => {
      const data = response.data;
      if (!data) {
        throw new Error("Invalid Credentials");
      }
      localStorage.setItem("user", JSON.stringify(data));
      console.log(data);
      return data;
    });
  const result = await toast.promise(loginPromise, {
    loading: "Logging in...",
    success: (data) => `Welcome ${user?.username || "Sir"}!`,
    error: (err) => err.response?.data?.message
  });

  return result;
};

// export const handleSignup = async() => {
//     const response = await axios.post("http://localhost:8080/api/auth/signup",formData)
//     const {data} = response.data
//     return data
// }

export const handleSignup = async (formData) => {
  const signupPromise = axiosInstance
    .post("/api/auth/signup", formData)
    .then((response) => {
      const data = response.data;
      if (!data) {
        throw new Error("Invalid Credentials");
      }
      console.log(data);
      return data;
    });

  const result = await toast.promise(signupPromise, {
    loading: "sign up...",
    success: (data) => `Welcome ${user?.username || " Sir!"}`,
    error: (err) => err?.response?.data?.message ,
  });
  console.log(result);
  return result;
};



