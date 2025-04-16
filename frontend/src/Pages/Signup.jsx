import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { connectSocket, signupUser, verifyOtp } from "../features/auth/authSlice";
import toast from "react-hot-toast";

const Signup = () => {
  const {isOtpStage,user} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [stage, setStage] = useState("signup");

  useEffect(()=>{
    if(user && user.isVerified){
      dispatch(connectSocket());
      navigate("/")
    }
  },[])

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [otp, setOtp] = useState("");

  const [error,setError] = useState("")

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };


  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(formData.password)) {
      setError(
        `Password must be at least 8 characters long,
         include uppercase, lowercase, 
         a number and a symbol.`
      );
      return;
    }

    if (formData.password !== formData.password2) {
      toast.error("Password does not match!");
      return;
    }

    const res = await dispatch(signupUser(formData));

  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(verifyOtp(otp))
      // navigate("/")
      
    } catch (err) {
      toast.error(err?.res?.data?.error || "OTP verification failed.");
    }
  };

  return (
      <div className="flex justify-center items-center border-pink-300 rounded-xl dark:border-blue-600 mx-auto p-6 min-h-[80vh] transition-colors duration-300 bg-gradient-to-r dark:from-blue-900/90 dark:to-black/90 from-purple-200 to-pink-300 dark:text-white text-black">
      <div className="backdrop-blur-lg backdrop-filter transition-all duration-300 ease-in-out bg-white-200 border-2 border-white dark:border-gray-600 p-8 hover:shadow-pink-600 dark:hover:shadow-blue-600 shadow-2xl rounded-lg w-96 dark:text-white bg-gradient-to-r dark:from-blue-900 dark:to-black from-pink-200  to-pink-400">
        {!isOtpStage ? (
          <>

                <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    {/* <label className="block fw-bold text-lg mb-2">
                      Username
                    </label> */}
                    <input
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      type="text"
                      className="w-full p-2 rounded-lg dark:bg-gray-700 text-black dark:text-white bg-white focus:outline-none focus:shadow-2xl focus:shadow-red-500 focus:scale-103 border-2 focus:dark:border-blue-600 border-white focus:border-pink-600"
                      placeholder="Choose a username"
                    />
                  </div>

                  <div className="mb-4">
                    {/* <label className="block fw-bold text-lg mb-2">Email</label> */}
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      className="w-full p-2 rounded-lg dark:bg-gray-700 text-black dark:text-white bg-white focus:outline-none focus:shadow-2xl focus:shadow-red-500 focus:scale-103 border-2 focus:dark:border-blue-600 border-white focus:border-pink-600"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="mb-4">
                    {/* <label className="block fw-bold text-lg mb-2">
                      Password
                    </label> */}
                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      type="password"
                      className="w-full p-2 rounded-lg dark:bg-gray-700 text-black dark:text-white bg-white focus:outline-none focus:shadow-2xl focus:shadow-red-500 focus:scale-103 border-2 focus:dark:border-blue-600 border-white focus:border-pink-600"
                      placeholder="Create a password"
                    />
                  </div>

                  <div className="mb-4">
                    {/* <label className="block fw-bold text-lg mb-2">
                      Confirm Password
                    </label> */}
                    <input
                      name="password2"
                      value={formData.password2}
                      onChange={handleChange}
                      type="password"
                      className="w-full p-2 rounded-lg dark:bg-gray-700 text-black dark:text-white bg-white focus:outline-none focus:shadow-2xl focus:shadow-red-500 focus:scale-103 border-2 focus:dark:border-blue-600 border-white focus:border-pink-600"
                      placeholder="Confirm your password"
                    />
                  </div>

                  {error && <p className="text-red-500 mb-2">{error}</p>}

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                  >
                    Sign Up
                  </button>
                </form>

                <p className="text-center mt-4 text-gray-500">
                  Already have an account?
                  <Link
                    to="/login"
                    className="text-blue-400 hover:underline ml-1"
                  >
                    Login
                  </Link>
                </p>
          </>
        ) : (
          <>

<div className="backdrop-blur-lg backdrop-filter transition-all duration-300 ease-in-out bg-white-200 border-2 border-white dark:bg-black/20 dark:border-gray-600 p-8 hover:shadow-pink-600 dark:hover:shadow-blue-600 shadow-2xl rounded-lg w-60 md:w-80 dark:text-white">

            <h2 className="text-3xl font-bold text-center mb-6">Verify OTP</h2>
            <form onSubmit={handleVerify}>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type="text"
                placeholder="Enter OTP"
                className="w-full mb-4 p-2 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-2 border-white focus:border-pink-600"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
              >
                Verify
              </button>
            </form>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
