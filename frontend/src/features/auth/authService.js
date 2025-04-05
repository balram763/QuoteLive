import axios from "axios";
import toast from "react-hot-toast";

export const handleLogin = async (formData) => {
  const loginPromise = axios
    .post("http://localhost:8080/api/auth/login", formData)
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
    success: (data) => `Welcome ${data?.user?.username || "Sir"}!`,
    error: (err) => err.response?.data?.message || "Something went wrong...",
  });

  return result;
};

// export const handleSignup = async() => {
//     const response = await axios.post("http://localhost:8080/api/auth/signup",formData)
//     const {data} = response.data
//     return data
// }

export const handleSignup = async (formData) => {
  const signupPromise = axios
    .post("http://localhost:8080/api/auth/signup", formData)
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
    success: (data) => `Welcome ${data?.user?.username || " Sir!"}`,
    error: (err) => err?.response?.data?.message || "something went wrong....",
  });
  console.log(result);
  return result;
};
