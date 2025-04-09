import toast from "react-hot-toast";
import axiosInstance from "../../hooks/axiosConfig";

export const handleLogin = async (formData) => {
  const loginPromise = axiosInstance.post("/api/auth/login", formData).then((response) => {
    const data = response.data;
    if (!data) throw new Error("Invalid Credentials");
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  });

  const result = await toast.promise(loginPromise, {
    loading: "Logging in...",
    success: (data) => `Welcome ${data?.username || "Sir"}!`,
    error: (err) => err.response?.data?.error || "Login failed",
  });

  return result;
};

export const handleSignup = async (formData) => {
  const signupPromise = axiosInstance.post("/api/auth/signup", formData).then((response) => {
    const data = response.data;
    if (!data) throw new Error("Invalid Credentials");
    return data;
  });

  const result = await toast.promise(signupPromise, {
    loading: "Signing up...",
    success: (data) => `OTP send please verify!`,
    error: (err) => err.response?.data?.error,
  });
  return result;
};

export const handleOtpVerify = async (formData) => {
  const otpPromise = axiosInstance.post("/api/auth/verify-otp", formData).then((response) => {
    const data = response.data;
    if (!data) throw new Error("OTP verification failed");
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  });

  const result = await toast.promise(otpPromise, {
    loading: "Verifying OTP...",
    success: (data) => `Verified! Welcome ${data?.username || "User"}`,
    error: (err) => err?.response?.data?.error,
  });

  return result;
};


