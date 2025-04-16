import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { connectSocket, loginUser, onlineUsers } from "../features/auth/authSlice";
import { useEffect, useState } from "react";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user && user.isVerified) {
      dispatch(connectSocket());
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const handleLoginUser = (e) => {
    e.preventDefault();

    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must be at least 8 characters long, include uppercase, lowercase, a number and a symbol."
      );
      return;
    }

    dispatch(loginUser(formData));
    // if(res.meta.requestStatus === 'fulfilled'){
    //   dispatch(connectSocket())
    // }
  };

  return (
    <div className="flex justify-center items-center border-pink-300 rounded-xl dark:border-blue-600 mx-auto min-h-[80vh] p-6 transition-colors duration-300 bg-gradient-to-r dark:from-blue-900/90 dark:to-black/90 from-purple-200  to-pink-300 dark:text-white text-black">
      <div className="backdrop-blur-lg backdrop-filter  border-2 border-white  dark:border-gray-600 p-8 hover:shadow-pink-600 dark:hover:shadow-blue-600 bg-gradient-to-r dark:from-blue-900 dark:to-black from-pink-200  to-pink-400 shadow-2xl rounded-lg w-96 dark:text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLoginUser}>
          <div className="mb-6">
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
            {/* <label className="block fw-bold text-lg mb-2">Password</label> */}
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              className="w-full p-2 rounded-lg dark:bg-gray-700 text-black dark:text-white bg-white focus:outline-none focus:shadow-2xl focus:shadow-red-500 focus:scale-103 border-2 focus:dark:border-blue-600 border-white focus:border-pink-600"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-500">
          Don't have an account?
          <Link to="/signup" className="text-blue-800 hover:underline ml-1">
            Sign Up
          </Link>
        </p>
      </div>

      {/* <div>
  <img src={loginImage} alt="" />
</div> */}
    </div>
  );
};

export default Login;
