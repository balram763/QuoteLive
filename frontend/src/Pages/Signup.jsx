import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../features/auth/authSlice";
import toast from "react-hot-toast";

const Signup = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.password !== formData.password2) {
      toast.error("Password Not Match...");
    } else {
      dispatch(signupUser(formData));
    }
  };

  return (
    <div className="flex justify-center items-center border-pink-300 rounded-xl dark:border-blue-600 mx-auto p-6 min-h-screen transition-colors duration-300 bg-gradient-to-r dark:from-blue-900/90 dark:to-black/90 from-purple-200 to-red-300 dark:text-white text-black">
      <div className="backdrop-blur-lg backdrop-filter bg-white-200 border-2 border-white dark:bg-black/20 dark:border-gray-600 p-8 hover:shadow-pink-600 dark:hover:shadow-blue-600 shadow-2xl rounded-lg w-96 dark:text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label className="block fw-bold text-lg mb-2">Username</label>
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
            <label className="block fw-bold text-lg mb-2">Email</label>
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
            <label className="block fw-bold text-lg mb-2">Password</label>
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
            <label className="block fw-bold text-lg mb-2">
              Confirm Password
            </label>
            <input
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              type="password"
              className="w-full p-2 rounded-lg dark:bg-gray-700 text-black dark:text-white bg-white focus:outline-none focus:shadow-2xl focus:shadow-red-500 focus:scale-103 border-2 focus:dark:border-blue-600 border-white focus:border-pink-600"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-gray-500">
          Already have an account?
          <Link to="/login" className="text-blue-400 hover:underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
