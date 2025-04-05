import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProfile } from "../features/quote/quoteSlice";
import Loading from "../components/Loading";
import { FaUsers, FaUserSecret } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const SelfProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user?.author?._id;
  const dispatch = useDispatch();
  const { profile, quotes, isLoading, isError, message } = useSelector(
    (state) => state.quote
  );
  // let [userQuotes,setUserQuote] = useState([]);
  console.log(profile);
  let userQuotes = quotes.filter(
    (quote) => quote?.author?._id === profile?._id
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchProfile(user.token));
    }
  }, [user, dispatch, location.pathname]);

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
      <div className="flex items-center space-x-6 mb-6">
        <img
          src={profile?.profilePic || profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-red-600 bg-white shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{profile?.username}</h1>
          <p className="text-gray-700 dark:text-gray-300 italic">
            {profile?.bio || "this is my bio"}
          </p>
          <div className="flex space-x-4 mt-2 text-black dark:text-gray-400">
            <Link
              to={"/follower"}
              state={{ path: "followers" }}
              className="flex hover:bg-blue-600 cursor-pointer px-2 py-1 rounded-sm hover:text-white dark:text-white "
            >
              <FaUsers className="mt-1" />{" "}
              <b className="ml-2 mr-1"> {profile?.followers?.length}</b>
              Followers
            </Link>
            <Link
              to={"/follower"}
              state={{ path: "following" }}
              className="flex hover:bg-blue-600 cursor-pointer px-2 py-1 rounded-sm hover:text-white dark:text-white"
            >
              <FaUserSecret className="mt-1" />{" "}
              <b className="ml-2 mr-1">{profile?.following?.length}</b>{" "}
              Following
            </Link>
          </div>
        </div>
      </div>

      <Link
        to="/profile/edit"
        className="block w-full text-center p-1.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 bg-pink-800 hover:bg-red-600 text-white"
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
