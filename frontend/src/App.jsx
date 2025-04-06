import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/Home/HomePage";
import Profile from "./Pages/Profile";
import QuoteDetail from "./components/QuoteDetail";
import Favorites from "./Pages/Favorites";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PostQuote from "./Pages/PostQuote";
import DarkModeBtn from "./components/DarkModeBtn";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isloggedin } from "./features/auth/authSlice";
import toast from "react-hot-toast";
import Loading from "./components/Loading";
import { fetchQuote } from "./features/quote/quoteSlice";
import SelfProfile from "./Pages/SelfProfile";
import EditProfile from "./Pages/EditProfile";
import FollowersPage from "./Pages/Followers";

function App() {
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );


  useEffect(() => {
    const userExist = localStorage.getItem("user");
    if (userExist) {
      dispatch(isloggedin(JSON.parse(userExist)));
    } else {
      dispatch(isloggedin(null));
    }
    setIsAuthChecked(true);
  }, []);



  console.log("unwanter rendering");

  useEffect(() => {
    dispatch(fetchQuote());
  }, []);


  useEffect(() => {
    if (user && (isError || message)) {
      toast.error(message || "Something wrong");
    }
  }, [isError, message, user]);
  

  if (!isAuthChecked || isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <div id="app" className=" dark:bg-gray-800 bg-gray-100  min-h-screen">
        <Navbar />
        <DarkModeBtn />
        <div className="max-w-4xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quote/:id" element={<QuoteDetail />} />
            <Route path="/profile" element={<SelfProfile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/post" element={<PostQuote />} />
            <Route path="/follower" element={<FollowersPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

