import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logOut ,disconnectSocket} from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { BsChatSquareQuoteFill } from "react-icons/bs";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    await dispatch(disconnectSocket())
    await dispatch(logOut());
    setIsOpen(false);
    toast.success("logged out..");
  };

  return (
    <nav className="bg-gradient-to-r from-pink-50 to-pink-300 dark:from-gray-900 dark:to-black  p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="dark:text-white text-black md:text-xl text-sm font-bold">
          <BsChatSquareQuoteFill className="ml-6 xl:ml-8 md:text-xl" />  QuotLive
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6  dark:text-white ">
          <Link to="/search" className="hover:text-blue-500 hover:scale-105 font-bold">
          FindUser
          </Link>
          <Link to="/chat" className="hover:text-blue-500 hover:scale-105 font-bold">
            Chat
          </Link>
          <Link to="/profile" className="hover:text-blue-500 hover:scale-105 font-bold">
            Profile
          </Link>
          <Link to="/favorites" className="hover:text-blue-500 hover:scale-105 font-bold">
            Favorites
          </Link>
          <Link to="/about" className="hover:text-blue-500 hover:scale-105 font-bold">
            About
          </Link>
          {user ? (
            <button
              onClick={() => dispatch(logOut())}
              className="bg-red-800 py-[2px] border-2 text-white font-semibold px-3 rounded-sm  hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-black dark:bg-white dark:text-black py-[4px] text-white  font-semibold px-3 rounded-sm  hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Login
            </Link>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>






      {isOpen && (
        <div className="md:hidden z-20 absolute top-16 left-0 w-full bg-white dark:bg-black text-black dark:text-white shadow-xl rounded-lg p-4 space-y-3 transition-all duration-300">
          <Link
            to="/chat"
            className="block px-4 py-2 text-lg font-medium transition-transform duration-200 rounded-lg hover:scale-102 hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Chat
          </Link>
          <Link
            to="/search"
            className="block px-4 py-2 text-lg font-medium transition-transform duration-200 rounded-lg hover:scale-102 hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            FindUser
          </Link>
          <Link
            to="/profile"
            className="block px-4 py-2 text-lg font-medium transition-transform duration-200 rounded-lg hover:scale-102 hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/favorites"
            className="block px-4 py-2 text-lg font-medium transition-transform duration-200 rounded-lg hover:scale-102 hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Favorites
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 text-lg font-medium transition-transform duration-200 rounded-lg hover:scale-102 hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          {user ? (
            <button
              className="block px-4 py-2 text-red-600 text-lg font-medium transition-transform duration-200 rounded-lg hover:scale-102 hover:bg-gray-200 dark:hover:bg-gray-800"
              onClick={handleLogOut}
            >
              LogOut
            </button>
          ) : (
            <Link
              to="/login"
              className="block text-white  bg-blue-500  px-4 py-2 text-lg font-medium transition-transform duration-200 rounded-lg hover:scale-102 hover:bg-gray-200 dark:hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
