import { useEffect, useState } from "react";
import QuoteCard from "./QuoteCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorite } from "../features/quote/quoteSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);
  const { favorites, loading } = useSelector((state) => state.quote);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorite(user?.token));
    }else{
      navigate("/login")
      toast.error("Login first!")
    }
  }, [user]);

  return (
    <div className="max-w-4xl border-2 hover:shadow-pink-600 dark:hover:shadow-blue-600 shadow-2xl border-pink-500 rounded-xl dark:border-blue-500 mx-auto p-6 transition-colors duration-300 bg-gradient-to-r dark:from-blue-900/90 dark:to-black/90 from-pink-200 to-pink-200 dark:text-white text-black">
      <h1 className="text-3xl font-bold dark:text-white text-center mb-6">
        Favorite Quotes
      </h1>

      {loading ? (
        <p className="text-center text-gray-300">Loading...</p>
      ) : favorites?.length > 0 ? (
        favorites.map((quote) => <QuoteCard key={quote?._id} quote={quote} />)
      ) : (
        <p className="text-white text-center">No favorite quotes yet.</p>
      )}
    </div>
  );
};

export default Favorites;
