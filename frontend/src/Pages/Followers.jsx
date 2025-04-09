import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchProfile, fetchUser } from "../features/quote/quoteSlice";

const FollowersPage = () => {
  const dispatch = useDispatch();
  const param = useParams()
  const { profile ,singleUser} = useSelector((state) => state.quote);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const { path } = location.state || "followers";
  const [activeTab, setActiveTab] = useState(path || "followers")

  let otherRoute = param.hasOwnProperty("id")


  const followers = otherRoute ? singleUser.followers : profile?.followers || [];
  const following = otherRoute ? singleUser.following : profile?.following || [];
  const activeList = activeTab === "followers" ? followers : following;

  useEffect(() => {
    if(!otherRoute){
      if (!profile && user?.token) {
      dispatch(fetchProfile(user.token))
      }
    }else{
      dispatch(fetchUser(param.id))
    }
  
  }, [dispatch, profile,user]);


  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 py-8 bg-gradient-to-br from-pink-100/80 to-purple-100/80 dark:from-blue-900/80 dark:to-black/90 rounded-2xl shadow-lg border border-pink-400 dark:border-blue-500 transition-all">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        👥 {activeTab === "followers" ? "Your Followers" : "Your Following"}
      </h2>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("followers")}
          className={`px-6 py-2 rounded-l-full font-semibold transition-all duration-300 ${
            activeTab === "followers"
              ? "bg-pink-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          Followers
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={`px-6 py-2 rounded-r-full font-semibold transition-all duration-300 ${
            activeTab === "following"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          Following
        </button>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {activeList?.length > 0 ? (
          activeList.map((user) => (
            <Link
              key={user._id}
              to={`/profile/${user._id}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 hover:shadow-md hover:bg-pink-100/60 dark:hover:bg-blue-900/60 transition-all"
            >
              <img
                src={user.profilePic}
                alt="avatar"
                className="w-12 h-12 object-cover rounded-full border border-purple-400"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user.username}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  View Profile
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            {activeTab === "followers"
              ? "No one is following you yet."
              : "You’re not following anyone."}
          </p>
        )}
      </div>
    </div>
  );
};

export default FollowersPage;
