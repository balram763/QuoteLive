import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SlLike } from "react-icons/sl";
import axiosInstance from "../hooks/axiosConfig";
import toast from "react-hot-toast";
import { fetchFavorite, fetchQuote } from "../features/quote/quoteSlice";

const QuoteCard = ({ quote }) => {
  const { favorites } = useSelector((state) => state.quote);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);


  useEffect(() => {
    if (favorites) {
      setIsFavorite(
        favorites.some((fav) => fav?._id.toString() === quote?._id.toString())
      );
    }
  }, [favorites, quote?._id]);

  const [like, setLike] = useState(quote?.likes || []);
  const [isliked, setisLiked] = useState(
    like.includes(user?.username) ? true : false
  );

  const handleFavorite = async (id) => {
    if (!user) {
      toast.error("Login First..");
      return;
    }

    try {
      if (isFavorite) {
        const res = await axiosInstance.delete(`/api/favorites/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        toast.success(res?.data?.message);
      } else {
        const res = await axiosInstance.post(
          `/api/favorites/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        toast.success(res.data.message);
      }

      setIsFavorite(!isFavorite);
      dispatch(fetchFavorite(user.token));
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleLike = async (id) => {
    if (!user) {
      toast.error("Login First..");
      return;
    }
    try {
      let response;
      if (isliked && user) {
        response = await axiosInstance.delete(`/api/likes/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setisLiked(false);
      } else {
        response = await axiosInstance.post(
          `/api/likes/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setisLiked(true);
      }
      setLike(response?.data?.quote?.likes);
      toast.success(response.data.message);
      dispatch(fetchQuote());
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <div
      className={`relative hover:shadow-pink-800 border-2 dark:hover:shadow-blue-600 shadow-2xl  p-6 rounded-xl mt-3 border-blue-500 border-b-8  overflow-hidden transition-transform transform hover:scale-101 bg-gradient-to-br dark:from-gray-600  dark:to-black dark:text-white  from-pink-200  to-pink-300 text-black`}
    >
      <p className="text-lg font-semibold text-center italic">
        "{quote?.text}"
      </p>

      <Link
        to={`/profile/${quote?.author?._id || quote?.author}`}
        className="block  text-blue-600 hover:underline text-sm mt-3 text-center"
      >
        - {quote?.author?.username || quote?.user}
      </Link>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handleLike(quote?._id)}
          className={`flex items-center gap-2 ${
            isliked ? "bg-red-500 hover:bg-white" : "bg-white hover:bg-red-600"
          } px-3 py-1 rounded-md  transition text-black`}
        >
          <SlLike /> {like.length}
        </button>

        <button
          onClick={() => handleFavorite(quote._id)}
          className={`px-3 py-1 rounded-lg shadow-md transition font-semibold ${
            isFavorite
              ? "bg-yellow-400 "
              : "dark:bg-gray-600 dark:text-white bg-gray-100"
          }`}
        >
          {isFavorite ? "⭐" : "☆"}
        </button>

        <Link
          to={`/quote/${quote?._id}`}
          className="bg-blue-600 px-2 py-1 rounded-lg shadow-md text-white font-semibold hover:bg-blue-700 transition"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default QuoteCard;
