import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProfile, fetchUser } from "../features/quote/quoteSlice";
import Loading from "../components/Loading";
import axiosInstance from "../hooks/axiosConfig";
import toast from "react-hot-toast";
import { FaUsers, FaUserSecret } from "react-icons/fa";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.quote);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(false);
  const { singleUser, quotes, isLoading } = useSelector((state) => state.quote);
  let userQuotes = quotes.filter((quote) => quote?.author?._id === userId);

  useEffect(() => {
    if (user) {
      dispatch(fetchProfile(user?.token));
    }

    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [user, userId, isFollowing]);

  console.log(singleUser);

  useEffect(() => {
    if (profile?.following && userId) {
      setIsFollowing(
        profile.following?.some((f) => f._id.toString() === userId)
      );
    }
  }, [profile, userId]);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        const response = await axiosInstance.post(
          `/api/users/${userId}/unfollow`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        if (response.data) {
          setIsFollowing(false);
          toast.success("Unfollowed");
        }
      } else {
        const response = await axiosInstance.post(
          `/api/users/${userId}/follow`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        if (response.data) {
          setIsFollowing(true);
          toast.success("Followed");
        }
      }
    } catch (error) {
      toast.error("something wenent wong");
    }
  };

  const profilePic = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`;

  const totalLikes = (userQuotes || []).reduce(
    (sum, quote) => sum + (quote.likes?.length || 0),
    0
  );
  const totalComments = (userQuotes || []).reduce(
    (sum, quote) => sum + (quote.comments?.length || 0),
    0
  );

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div className="max-w-3xl hover:shadow-pink-600 dark:hover:shadow-blue-600 shadow-2xl mx-auto p-6 border-2 border-pink-500 rounded-xl dark:border-blue-500 transition-colors duration-300 bg-gradient-to-r dark:from-blue-900/90 dark:to-black/90 from-purple-300/90 to-red-200/90 text-gray-900 dark:text-gray-100">
      {/* Profile Header */}

      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-10 p-4 bg-gray-200 dark:bg-gray-900 rounded-xl shadow-md">
        <div className="flex-shrink-0 mb-4 lg:mb-0">
          <img
            src={singleUser?.profilePic || profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-red-500 shadow-lg object-cover"
          />
        </div>

        {/* User Info */}
        <div className="text-center lg:text-left">
          <h1 className="text-xl font-bold text-blue-800 dark:text-white mb-1">
            {singleUser?.username}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 italic text-sm max-w-xl mx-auto lg:mx-0">
            {singleUser?.bio ||
              "Aspiring creator. Sharing thoughts, one quote at a time ✨"}
          </p>

          {/* Followers / Following */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
            <span className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-white hover:bg-blue-600 hover:text-white transition">
              <Link
                to={`/follower/${userId}`}
                state={{ path: "followers" }}
                className="flex text-md mt-1"
              >
                <FaUsers className="mr-2 mt-1" />
                <b>{singleUser?.followers?.length} </b> Followers
              </Link>
            </span>
            <span className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-white hover:bg-blue-600 hover:text-white transition">
              <Link
                to={`/follower/${userId}`}
                className="flex"
                state={{ path: "following" }}
              >
                <FaUserSecret className="mr-2 mt-1" />
                <b>{singleUser?.following?.length}</b> Following
              </Link>
            </span>
          </div>
        </div>
      </div>

      <button
        disabled={user?.username === singleUser?.username}
        onClick={handleFollow}
        className={`w-full py-2 mt-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-102 ${
          user?.username === singleUser?.username
            ? "bg-black hover:bg-red-600 text-white"
            : isFollowing
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {user?.username === singleUser?.username
          ? "Your Profile"
          : isFollowing
          ? "Unfollow "
          : "Follow "}
      </button>


      {user?.username === singleUser?.username 
      ? ""
            :<Link to={`/chat/${userId}`}>
            <button className="w-full py-2 mt-4 rounded-lg bg-green-600 text-center font-semibold transition-all duration-300 transform hover:scale-102">
               Chat
            </button>
            </Link>
            
            }


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
        📜 {singleUser?.username}'s Quotes
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
          No quotes found for {singleUser?.username}.
        </p>
      )}
    </div>
  );
};

export default Profile;
