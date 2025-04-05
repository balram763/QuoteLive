import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const dispath = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginUser = (e) => {
    e.preventDefault();
    console.log(formData);
    dispath(loginUser(formData));
  };

  return (
    <div className="flex justify-center   items-center border-pink-300 rounded-xl dark:border-blue-600 mx-auto p-6 min-h-screen transition-colors duration-300 bg-gradient-to-r dark:from-blue-900/90 dark:to-black/90 from-purple-200 to-red-300 dark:text-white text-black">
      <div
        className="backdrop-blur-lg backdrop-filter bg-white-200 border-2 border-white dark:bg-black/20  dark:border-gray-600 
 p-8 hover:shadow-pink-600 dark:hover:shadow-blue-600 shadow-2xl rounded-lg w-96 dark:text-white dark:textwhite"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={(e) => handleLoginUser(e)}>
          <div className="mb-6">
            <label className="block fw-bold text-lg mb-2">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full p-2 rounded-lg dark:bg-gray-700 text-black  dark:text-white bg-white focus:outline-none focus:shadow-2xl focus:shadow-red-500 focus:scale-103 border-2  focus:dark:border-blue-600 border-white focus:border-pink-600"
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
              className="w-full p-2 rounded-lg dark:bg-gray-700 text-black  dark:text-white bg-white focus:outline-none focus:shadow-2xl focus:shadow-red-500 focus:scale-103 border-2  focus:dark:border-blue-600 border-white focus:border-pink-600"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-500">
          Don't have an account?
          <Link to="/signup" className="text-blue-400 hover:underline ml-1">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
