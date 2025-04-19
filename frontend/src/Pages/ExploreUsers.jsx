import { useEffect, useState } from "react";
import axiosInstance from "../hooks/axiosConfig";

import UserCard from "../components/UserCard";

const ExploreUsers = () => {
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/api/users/allusers");
        setAllUsers(res.data);
        const shuffled = res?.data.sort(() => 0.5 - Math.random());
        setRandomUsers(shuffled.slice(0, 6));
      } catch (error) {
        toast.error("something went wrong");
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    const filtered = allUsers.filter((user) =>
      user.username.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-pink-300 dark:from-blue-900 dark:to-black">
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Discover Creators
        </h2>

        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-2 rounded border-2 bg-white  dark:bg-gray-800 border-pink-600 dark:text-white dark:border-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {filteredUsers.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Search Results:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredUsers.map((user) => (
                <UserCard key={user._id} user={user} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Explore Random Users:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {randomUsers.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreUsers;
