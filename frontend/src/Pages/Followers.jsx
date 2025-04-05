// // import { useSelector } from "react-redux";
// // import { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";

// // const FollowersPage = () => {
// //   const { user } = useSelector((state) => state.auth);
// //   const [followers, setFollowers] = useState([]);
// //   const [following, setFollowing] = useState([]);

// //   const dummyUser = {
// //     author: {
// //       _id: "user123",
// //       username: "balram_d",
// //       followers: [
// //         { _id: "follower1", username: "john_doe" },
// //         { _id: "follower2", username: "sneha_singh" },
// //         { _id: "follower3", username: "amit_raj" },
// //       ],
// //       following: [
// //         { _id: "following1", username: "dev_guru" },
// //         { _id: "following2", username: "priyanka_dev" },
// //       ],
// //     },
// //     token: "sample_token_123456",
// //   };

// //   useEffect(() => {
// //     if (dummyUser?.author) {
// //       setFollowers(dummyUser.author.followers || []);
// //       setFollowing(dummyUser.author.following || []);
// //     }
// //   }, [user]);

// //   const profilePic = (id) =>
// //     `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`;

// //   return (
// //     <div className="max-w-6xl mx-auto mt-10 p-6 border-2 rounded-2xl shadow-lg dark:shadow-blue-800 shadow-pink-400 border-pink-500 dark:border-blue-600 bg-gradient-to-r from-pink-100/90 to-purple-100/90 dark:from-blue-900/80 dark:to-black/80 text-gray-800 dark:text-white transition-all">
// //       <h2 className="text-3xl font-bold text-center mb-8">👥 Your Connections</h2>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //         {/* Following Section */}
// //         <div>
// //           <h3 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Following</h3>
// //           <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3">
// //             {following.length > 0 ? following.map((user) => (
// //               <Link
// //                 key={user._id}
// //                 to={`/profile/${user._id}`}
// //                 className="flex items-center gap-4 p-3 rounded-lg bg-white/70 dark:bg-gray-800/70 hover:bg-blue-100 dark:hover:bg-blue-900 transition-shadow hover:shadow-md"
// //               >
// //                 <img
// //                   src={profilePic(user._id)}
// //                   alt="Profile"
// //                   className="w-10 h-10 rounded-full border border-blue-500"
// //                 />
// //                 <span className="font-medium">{user.username}</span>
// //               </Link>
// //             )) : (
// //               <p className="text-gray-600 dark:text-gray-400">Not following anyone.</p>
// //             )}
// //           </div>
// //         </div>

// //         {/* Followers Section */}
// //         <div>
// //           <h3 className="text-2xl font-semibold mb-4 text-green-700 dark:text-green-300">Followers</h3>
// //           <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3">
// //             {followers.length > 0 ? followers.map((user) => (
// //               <Link
// //                 key={user._id}
// //                 to={`/profile/${user._id}`}
// //                 className="flex items-center gap-4 p-3 rounded-lg bg-white/70 dark:bg-gray-800/70 hover:bg-green-100 dark:hover:bg-green-900 transition-shadow hover:shadow-md"
// //               >
// //                 <img
// //                   src={profilePic(user._id)}
// //                   alt="Profile"
// //                   className="w-10 h-10 rounded-full border border-green-500"
// //                 />
// //                 <span className="font-medium">{user.username}</span>
// //               </Link>
// //             )) : (
// //               <p className="text-gray-600 dark:text-gray-400">No followers yet.</p>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FollowersPage;

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const FollowersPage = () => {
//   const [activeTab, setActiveTab] = useState("followers");
//   const [followers, setFollowers] = useState([]);
//   const [following, setFollowing] = useState([]);

//   const dummyUser = {
//     author: {
//       _id: "user123",
//       username: "balram_d",
//       followers: [
//         { _id: "follower1", username: "john_doe" },
//         { _id: "follower2", username: "sneha_singh" },
//         { _id: "follower3", username: "amit_raj" },
//       ],
//       following: [
//         { _id: "following1", username: "dev_guru" },
//         { _id: "following2", username: "priyanka_dev" },
//       ],
//     },
//   };

//   useEffect(() => {
//     if (dummyUser?.author) {
//       setFollowers(dummyUser.author.followers || []);
//       setFollowing(dummyUser.author.following || []);
//     }
//   }, []);

//   const profilePic = (id) =>
//     `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`;

//   const activeList = activeTab === "followers" ? followers : following;

//   return (
//     <div className="max-w-4xl mx-auto mt-10 px-6 py-8 bg-gradient-to-br from-pink-100/80 to-purple-100/80 dark:from-blue-900/80 dark:to-black/90 rounded-2xl shadow-lg border border-pink-400 dark:border-blue-500 transition-all">
//       <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
//         👥 {activeTab === "followers" ? "Your Followers" : "You’re Following"}
//       </h2>

//       <div className="flex justify-center mb-6">
//         <button
//           onClick={() => setActiveTab("followers")}
//           className={`px-6 py-2 rounded-l-full font-semibold transition-all duration-300 ${
//             activeTab === "followers"
//               ? "bg-pink-500 text-white"
//               : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
//           }`}
//         >
//           Followers
//         </button>
//         <button
//           onClick={() => setActiveTab("following")}
//           className={`px-6 py-2 rounded-r-full font-semibold transition-all duration-300 ${
//             activeTab === "following"
//               ? "bg-purple-600 text-white"
//               : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
//           }`}
//         >
//           Following
//         </button>
//       </div>

//       <div className="space-y-4 max-h-[400px] overflow-y-auto">
//         {activeList.length > 0 ? (
//           activeList.map((user) => (
//             <Link
//               key={user._id}
//               to={`/profile/${user._id}`}
//               className="flex items-center gap-4 p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 hover:shadow-md hover:bg-pink-100/60 dark:hover:bg-blue-900/60 transition-all"
//             >
//               <img
//                 src={profilePic(user._id)}
//                 alt="avatar"
//                 className="w-12 h-12 rounded-full border border-purple-400"
//               />
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   {user.username}
//                 </h4>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">View Profile</p>
//               </div>
//             </Link>
//           ))
//         ) : (
//           <p className="text-center text-gray-600 dark:text-gray-400">
//             {activeTab === "followers"
//               ? "No one is following you yet."
//               : "You’re not following anyone."}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FollowersPage;

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const FollowersPage = () => {
  const { profile } = useSelector((state) => state.quote);
  const location = useLocation();
  const { path } = location.state || "followers";
  const [activeTab, setActiveTab] = useState(path || "followers");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followingIds, setFollowingIds] = useState([]);

  useEffect(() => {
    if (profile) {
      console.log(profile);
      setFollowers(profile.followers || []);
      setFollowing(profile?.following || []);
      setFollowingIds(profile?.following.map((u) => u._id));
    }
  }, []);

  const handleFollowToggle = (userId) => {
    setFollowingIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const profilePic = (id) =>
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`;

  const activeList = activeTab === "followers" ? followers : following;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 py-8 bg-gradient-to-br from-pink-100/80 to-purple-100/80 dark:from-blue-900/80 dark:to-black/90 rounded-2xl shadow-lg border border-pink-400 dark:border-blue-500 transition-all">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        👥 {activeTab === "followers" ? "Your Followers" : "You’re Following"}
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
        {activeList.length > 0 ? (
          activeList.map((user) => {
            const isFollowing = followingIds.includes(user._id);
            return (
              <div
                key={user._id}
                className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 hover:shadow-md hover:bg-pink-100/60 dark:hover:bg-blue-900/60 transition-all"
              >
                <Link
                  to={`/profile/${user._id}`}
                  className="flex items-center gap-4"
                >
                  <img
                    src={profilePic(user._id)}
                    alt="avatar"
                    className="w-12 h-12 rounded-full border border-purple-400"
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
                <button
                  onClick={() => handleFollowToggle(user._id)}
                  className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                    isFollowing
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            );
          })
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
