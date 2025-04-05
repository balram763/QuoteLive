import { FaUsers, FaUserSecret } from "react-icons/fa";

const ProfileHeader = ({ user }) => {
  const profilePic = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?._id}`;
  
  return (
    <div className="flex items-center space-x-6 mb-6">
      <img
        src={user?.profilePic || profilePic}
        alt="Profile"
        className="w-24 h-24 rounded-full border-2 border-red-600 bg-white shadow-lg"
      />
      <div>
        <h1 className="text-3xl font-bold">{user?.username}</h1>
        <p className="text-gray-700 dark:text-gray-300 italic">{user?.bio || "this is my bio"}</p>
        <div className="flex space-x-4 mt-2 text-black dark:text-gray-400">
          <span className="flex hover:bg-blue-600 cursor-pointer px-2 py-1 rounded-sm hover:text-white dark:text-white ">
            <FaUsers className="mt-1" /> 
            <b className="ml-2 mr-1">{user?.followers?.length}</b> Followers
          </span>
          <span className="flex hover:bg-blue-600 cursor-pointer px-2 py-1 rounded-sm hover:text-white dark:text-white">
            <FaUserSecret className="mt-1" /> 
            <b className="ml-2 mr-1">{user?.following?.length}</b> Following
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
