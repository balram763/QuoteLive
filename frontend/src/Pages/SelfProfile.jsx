import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchProfile } from "../features/quote/quoteSlice";
import Loading from "../components/Loading";
import { FaUsers, FaUserSecret } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const SelfProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user?.author?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, quotes, isLoading } = useSelector((state) => state.quote);

  useEffect(() => {
    if (user) {
      dispatch(fetchProfile(user.token));
    } else {
      navigate("/login");
      toast.error("Login first!");
    }
  }, [user, dispatch, location.pathname]);

  let [userQuotes, setUserQuotes] = useState([]);

  useEffect(() => {
    if (profile && quotes.length > 0) {
      const filtered = quotes.filter(
        (quote) => quote?.author?._id === profile._id
      );
      setUserQuotes(filtered);
    }
    // console.log(quotes)
  }, [profile, quotes]);

  const profilePic = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`;

  const totalLikes = (userQuotes || []).reduce(
    (sum, quote) => sum + (quote.likes?.length || 0),
    0
  );
  const totalComments = (userQuotes || []).reduce(
    (sum, quote) => sum + (quote.comments?.length || 0),
    0
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-3xl hover:shadow-pink-600 dark:hover:shadow-blue-600 shadow-2xl mx-auto p-6 border-2 border-pink-500 rounded-xl dark:border-blue-500 transition-colors duration-300 bg-gradient-to-r dark:from-blue-900/90 dark:to-black/90 from-purple-300/90 to-red-200/90 text-gray-900 dark:text-gray-100">
      {/* Profile Header */}

      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-10 p-4 bg-gray-200 dark:bg-gray-900 rounded-xl shadow-md">
        <div className="flex-shrink-0 mb-4 lg:mb-0">
          <img
            src={profile?.profilePic || profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-red-500 shadow-lg object-cover"
          />
        </div>

        {/* User Info */}
        <div className="text-center lg:text-left">
          <h1 className="text-xl font-bold text-blue-800 dark:text-white mb-1">
            {profile?.username}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 italic text-sm max-w-xl mx-auto lg:mx-0">
            {profile?.bio ||
              "Aspiring creator. Sharing thoughts, one quote at a time ✨"}
          </p>

          {/* Followers / Following */}

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
            <span className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-white hover:bg-blue-600 hover:text-white transition">
              <Link
                to={"/follower"}
                state={{ path: "followers" }}
                className="flex text-md mt-1"
              >
                <FaUsers className="mr-2 mt-1" />
                <b>{profile?.followers?.length} </b> Followers
              </Link>
            </span>
            <span className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-white hover:bg-blue-600 hover:text-white transition">
              <Link
                to={"/follower"}
                className="flex"
                state={{ path: "following" }}
              >
                <FaUserSecret className="mr-2 mt-1" />
                <b>{profile?.following?.length}</b> Following
              </Link>
            </span>
          </div>
        </div>
      </div>

      <Link
        to="/profile/edit"
        className="block w-full text-center mt-3 p-1.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 bg-pink-800 hover:bg-red-600 text-white"
      >
        Your Profile
      </Link>

      <div className="grid grid-cols-3 gap-4 bg-gray-200 dark:bg-gray-800 p-4 rounded-lg mt-6 shadow-md text-center">
        {[
          { label: "Quotes", value: userQuotes?.length },
          { label: "Total Likes", value: totalLikes },
          { label: "Total Comments", value: totalComments },
        ].map((stat, index) => (
          <div
            key={index}
            className="p-3 hover:scale-115 transition duration-300 hover:bg-blue-500   rounded-lg bg-gray-100 dark:bg-gray-700 shadow-md"
          >
            <p className="text-2xl font-bold  text-gray-900 dark:text-white">
              {stat.value}
            </p>
            <p className="text-gray-600  dark:text-gray-300">{stat.label}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-6 text-gray-900 dark:text-gray-100">
        📜 {user?.username}'s Quotes
      </h2>
      {userQuotes.length > 0 ? (
        <div className="mt-4 space-y-4">
          {userQuotes.map((quote) => (
            <div
              key={quote._id}
              className="bg-gray-200 dark:bg-gray-900 p-4 rounded-lg shadow-md hover:scale-[1.02] transition duration-300 transform border border-gray-300 dark:border-gray-700"
            >
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                "{quote.text}"
              </p>
              <div className="flex justify-between items-center mt-3">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  ❤️ {quote?.likes.length} | 💬{" "}
                  {quote.comments ? quote.comments.length : 0}
                </p>
                <Link
                  to={`/quote/${quote._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-md"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300 mt-4">
          No quotes found for {profile?.username}.
        </p>
      )}
    </div>
  );
};

export default SelfProfile;
