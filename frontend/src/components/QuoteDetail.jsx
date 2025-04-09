import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../hooks/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import CommentSection from "../Pages/Quotedetail/CommentSection";
import LikeButton from "../Pages/Quotedetail/LikeButton";
import QuoteHeader from "../Pages/Quotedetail/QuoteHeader";
import NotFound from "./NotFound";
import { fetchQuote, 
  // handleSingleQuote

 } from "../features/quote/quoteSlice";

const QuoteDetail = () => {
  const { id } = useParams();
  const [quote, setQuote] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchById = async () => {
    try {
      const response = await axiosInstance.get(`/api/quotes/${id}`);
      setQuote(response.data);
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    fetchById();
  }, [id]);

  useEffect(() => {
    // dispatch(handleSingleQuote(quote));
    dispatch(fetchQuote());
  }, [quote]);

  if (!quote) {
    return <NotFound />;
  }

  return (
    <div
      className="max-w-3xl  border-pink-300 rounded-xl dark:border-blue-600 mx-auto p-6 transition-colors duration-300 
           bg-gradient-to-r dark:from-blue-900/90 dark:to-black/90 from-purple-200 to-red-300 dark:text-white text-black shadow-2xl hover:shadow-pink-600 dark:hover:shadow-blue-700"
    >
      <QuoteHeader quote={quote} />
      <LikeButton quote={quote} setQuote={setQuote} user={user} />
      <CommentSection quote={quote} setQuote={setQuote} user={user} />
    </div>
  );
};

export default QuoteDetail;
