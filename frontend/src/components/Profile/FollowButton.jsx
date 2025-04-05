import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../hooks/axiosConfig";
import toast from "react-hot-toast";

const FollowButton = ({ userId }) => {
  const { user } = useSelector(state => state.auth);
  const { profile } = useSelector(state => state.quote);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (profile?.following && userId) {
      setIsFollowing(profile.following.includes(userId));
    }
  }, [profile, userId]);

  const handleFollow = async () => {
    try {
      const endpoint = isFollowing ? "unfollow" : "follow";
      const res = await axiosInstance.post(
        `/api/users/${userId}/${endpoint}`,
        {},
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      if (res.data) {
        setIsFollowing(!isFollowing);
        toast.success(isFollowing ? "Unfollowed" : "Followed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      onClick={handleFollow}
      className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-102 ${
        isFollowing
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
