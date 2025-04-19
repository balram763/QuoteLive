import React from 'react'
import defaultImage from "../assets/defaultimage.svg"
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  return (
    <Link to={`/profile/${user._id}`}>
      <div className="relative group p-4 h-60 bg-gradient-to-br from-pink-100 to-purple-100 border rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 text-center dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">

        <div className="flex justify-center mb-3">
          <img
            src={user?.profilePic || defaultImage}
            alt={user?.username}
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transform transition-all duration-300"
          />
        </div>

        <h4 className="text-lg font-bold text-gray-800 dark:text-white">
          {user?.username}
        </h4>

        <p className="text-sm mt-1 text-gray-600 dark:text-gray-300 italic px-2">
          {user?.bio || "No bio yet."}
        </p>

        <div className="absolute inset-0 rounded-xl ring-4 ring-transparent group-hover:ring-pink-400 dark:group-hover:ring-purple-500 transition-all duration-300 pointer-events-none" />
      </div>
    </Link>
  );
};

export default UserCard;
