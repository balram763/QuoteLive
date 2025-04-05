import { useState, useEffect } from "react";
import { SlLike } from "react-icons/sl";
import toast from "react-hot-toast";
import axiosInstance from "../../hooks/axiosConfig";

const LikeButton = ({ quote, setQuote, user }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (user && quote.likes.includes(user.username)) {
      setIsLiked(true);
    }
  }, [quote, user]);

  const handleLike = async () => {
    if (!user) {
      toast.error("Login First..");
      return;
    }

    try {
      let response;
      if (isLiked) {
        response = await axiosInstance.delete(`/api/likes/${quote._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } else {
        response = await axiosInstance.post(
          `/api/likes/${quote._id}`,
          {},
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
      }

      setIsLiked(!isLiked);
      setQuote(response?.data?.quote);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error while liking/unliking:", error);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 px-3 mt-2 py-1 rounded-md transition ${
        isLiked ? "bg-red-500 hover:bg-white" : "bg-white hover:bg-red-600"
      } text-black`}
    >
      <SlLike /> {quote.likes.length}
    </button>
  );
};

export default LikeButton;
