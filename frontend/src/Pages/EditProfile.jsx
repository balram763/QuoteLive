// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { fetchProfile, updateProfile} from "../features/quote/quoteSlice";
// // import { updateProfile } from "../features/auth/authSlice";

// const EditProfile = () => {
//   const { user ,isLoading } = useSelector((state) => state.auth);
//   const [profileLoaded, setProfileLoaded] = useState(false);

//   const { profile  } = useSelector((state) => state.quote);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     bio: "",
//     profilePic: "",
//   });

//   const [preview, setPreview] = useState("")



//   useEffect(() => {
//     if (user) {
//       dispatch(fetchProfile(user?.token)).finally(() => setProfileLoaded(true));
//     } else {
//       setProfileLoaded(true);
//     }
//   }, [user]);
  

//   useEffect(() => {
//     if (profileLoaded && (!user || !profile)) {
//       toast.error("Login required!");
//       navigate("/login");
//     }
//   }, [profileLoaded, user, profile]);
  

//   useEffect(() => {

//      setFormData({
//         bio: profile?.bio || "",
//         profilePic: profile?.profilePic || "",
//       });
//       setPreview(profile?.profilePic || "")
//   }, [user]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setFormData((prev) => ({
//       ...prev,
//       profilePic: file,
//     }));

//     const reader = new FileReader();
//     reader.onloadend = () => {

//       setPreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const res = await dispatch(updateProfile(formData));
//     console.log("Updated Data:", formData);
//     console.log(res.data)
//     toast.success("Profile updated!");
//     // navigate("/profile");
//   };

//   return (
//     <div className="max-w-md mx-auto mt-12 p-6 rounded-xl shadow-2xl border border-blue-pink bg-gradient-to-br from-pink-200 to-[#fa7ceb] dark:from-[#1e1e2f] dark:to-[#1e2a78] text-black dark:text-white transition-all duration-300">
//       <h2 className="text-3xl font-extrabold mb-6 text-center tracking-wide">
//         Edit Profile
//       </h2>
//       <form onSubmit={handleUpdate} className="space-y-6">
//         <div className="flex flex-col items-center">
//           <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105">
//             <img
//               src={
//                 preview ||
//                 `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.author?._id}`
//               }
//               alt="Profile"
//               className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover"
//             />
//             <label
//               htmlFor="profileUpload"
//               className="absolute bottom-0 right-0 bg-white text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-500 font-bold group-hover:scale-110 transition-transform"
//             >
//               ✎
//             </label>
//             <input
//               type="file"
//               id="profileUpload"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="hidden"
//             />
//           </div>
//           <p className="mt-2 text-sm text-white/90">
//             Click ✎ to change your photo
//           </p>
//         </div>

//         {/* Bio Input */}
//         <div>
//           <label className="block font-semibold mb-1">Bio</label>
//           <textarea
//             name="bio"
//             rows="3"
//             className="w-full p-3 rounded-md bg-white/20 border border-white/30 backdrop-blur-md text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white"
//             value={formData.bio}
//             onChange={handleChange}
//             placeholder="Tell us something about yourself..."
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-white text-blue-700 font-bold py-2 rounded-md hover:bg-blue-100 transition duration-200 tracking-wide"
//         >
//           Save Changes
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
import { fetchProfile, updateProfile } from "../features/quote/quoteSlice";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.quote);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bio: "",
    profilePic: "",
  });

  const [preview, setPreview] = useState("");
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Step 1: Fetch profile only if user exists
  useEffect(() => {
    if (user) {
      dispatch(fetchProfile(user?.token)).finally(() => {
        setProfileLoaded(true);
      });
    } else {
      setProfileLoaded(true); // even if user doesn't exist, let the loader complete
    }
  }, [user, dispatch]);

  // Step 2: Update local state once profile is fetched
  useEffect(() => {
    if (profile) {
      setFormData({
        bio: profile?.bio || "",
        profilePic: profile?.profilePic || "",
      });
      setPreview(profile?.profilePic || "");
    }
  }, [profile]);

  // Step 3: If not logged in, navigate after profile loading
  useEffect(() => {
    if (profileLoaded && (!user || !profile)) {
      toast.error("Login required!");
      navigate("/login");
    }
  }, [profileLoaded, user, profile, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      profilePic: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
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
    const res = await dispatch(updateProfile(formData));
    toast.success("Profile updated!");
  };

  // Loader while fetching profile
  if (!profileLoaded) {
    return <div className="text-center mt-20 text-white">Loading...</div>;
  }

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
