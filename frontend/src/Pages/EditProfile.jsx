// // import { useState, useEffect } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import toast from "react-hot-toast";
// // // import { updateProfile } from "../features/auth/authSlice";

// // const EditProfile = () => {
// //   const { user } = useSelector((state) => state.auth);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const [formData, setFormData] = useState({
// //     username: "",
// //     bio: "",
// //   });

// //   useEffect(() => {
// //     if (!user?.author?._id) {
// //       toast.error("Login required!");
// //       // navigate("/login");
// //     } else {
// //       setFormData({
// //         username: user.author.username || "",
// //         bio: user.author.bio || "",
// //       });
// //     }
// //   }, [user, navigate]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleUpdate = async (e) => {
// //     e.preventDefault();
// //     // const res = await dispatch(updateProfile({ token: user.token, ...formData }));
// //     const res = { payload: { success: true } }; // temp for testing
// //     if (res?.payload?.success) {
// //       toast.success("Profile updated!");
// //       navigate("/self-profile");
// //     } else {
// //       toast.error(res?.payload?.message || "Update failed");
// //     }
// //   };

// //   return (
// //     <div className="max-w-xl mx-auto mt-10 p-8 rounded-2xl bg-gradient-to-br from-pink-200/70 to-purple-200/70 dark:from-slate-800 dark:to-gray-900 shadow-2xl border border-pink-400 dark:border-blue-500">
// //       <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
// //         ✍️ Edit Your Profile
// //       </h2>
// //       <form onSubmit={handleUpdate} className="space-y-6">
// //         <div>
// //           <label className="block mb-1 font-medium text-gray-800 dark:text-gray-300">Username</label>
// //           <input
// //             type="text"
// //             name="username"
// //             value={formData.username}
// //             onChange={handleChange}
// //             required
// //             className="w-full px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-blue-500 transition"
// //           />
// //         </div>
// //         <div>
// //           <label className="block mb-1 font-medium text-gray-800 dark:text-gray-300">Bio</label>
// //           <textarea
// //             name="bio"
// //             rows="4"
// //             value={formData.bio}
// //             onChange={handleChange}
// //             className="w-full px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-blue-500 transition resize-none"
// //           ></textarea>
// //         </div>
// //         <button
// //           type="submit"
// //           className="w-full py-2 font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-600 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
// //         >
// //           💾 Update Profile
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default EditProfile;
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// // import { updateProfile } from "../features/auth/authSlice";

// const EditProfile = () => {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     displayName: "",
//     bio: "",
//   });

//   useEffect(() => {
//     if (!user?.author?._id) {
//       toast.error("Login required!");
//       // navigate("/login");
//     } else {
//       setFormData({
//         displayName: user.author.displayName || "",
//         bio: user.author.bio || "",
//       });
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     // const res = await dispatch(updateProfile({ token: user.token, ...formData }));
//     console.log("g")
//     const res = { payload: { success: true } }; // testing
//     if (res?.payload?.success) {
//       toast.success("Profile updated!");
//       navigate("/self-profile");
//     } else {
//       toast.error(res?.payload?.message || "Update failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-12 p-6 bg-gradient-to-tr from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl shadow-2xl border dark:border-blue-600">
//       <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-6">Edit Your Profile</h2>

//       {/* Username (read-only) */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Username (unchangeable)</label>
//         <input
//           type="text"
//           value={user?.author?.username || ""}
//           disabled
//           className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-400 cursor-not-allowed"
//         />
//         <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Username is fixed and cannot be changed.</p>
//       </div>

//       <form onSubmit={handleUpdate} className="space-y-5">
//         {/* Display Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Name</label>
//           <input
//             type="text"
//             name="displayName"
//             value={formData.displayName}
//             onChange={handleChange}
//             className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-blue-500 transition"
//             placeholder="Enter your display name"
//           />
//         </div>

//         {/* Bio */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
//           <textarea
//             name="bio"
//             rows="3"
//             value={formData.bio}
//             onChange={handleChange}
//             className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-blue-500 transition"
//             placeholder="Write something about you..."
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition"
//         >
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditProfile;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { updateProfile } from "../features/auth/authSlice";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bio: "",
    profilePicture: "",
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!user?.author?._id) {
      toast.error("Login required!");
    } else {
      setFormData({
        bio: user.author.bio || "",
        profilePicture: user.author.profilePicture || "",
      });
      setPreview(user.author.profilePicture || "");
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        profilePicture: reader.result,
      }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // const res = await dispatch(updateProfile({ token: user.token, ...formData }));
    console.log("Updated Data:", formData);
    toast.success("Profile updated!");
    navigate("/self-profile");
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 rounded-xl shadow-2xl border border-blue-pink bg-gradient-to-br from-pink-200 to-[#fa7ceb] dark:from-[#1e1e2f] dark:to-[#1e2a78] text-black dark:text-white transition-all duration-300">
      <h2 className="text-3xl font-extrabold mb-6 text-center tracking-wide">
        Edit Profile
      </h2>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105">
            <img
              src={
                preview ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.author?._id}`
              }
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover"
            />
            <label
              htmlFor="profileUpload"
              className="absolute bottom-0 right-0 bg-white text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-500 font-bold group-hover:scale-110 transition-transform"
            >
              ✎
            </label>
            <input
              type="file"
              id="profileUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <p className="mt-2 text-sm text-white/90">
            Click ✎ to change your photo
          </p>
        </div>

        {/* Bio Input */}
        <div>
          <label className="block font-semibold mb-1">Bio</label>
          <textarea
            name="bio"
            rows="3"
            className="w-full p-3 rounded-md bg-white/20 border border-white/30 backdrop-blur-md text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us something about yourself..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-white text-blue-700 font-bold py-2 rounded-md hover:bg-blue-100 transition duration-200 tracking-wide"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
