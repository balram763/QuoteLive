import { useState } from "react";
// import axiosInstance from "../hooks/axiosConfig";
import toast from "react-hot-toast";
import CommentItem from "./CommenItem";
import axiosInstance from "../../hooks/axiosConfig";
import { fetchQuote } from "../../features/quote/quoteSlice";
import { useDispatch } from "react-redux";
// import CommentItem from "./CommentItem";

const CommentSection = ({ quote, setQuote, user }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch()

  const handleComment = async () => {
    if (!user) {
      toast.error("Login First..");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/api/comments/${quote._id}`,
        { text: comment },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );

      setQuote(response?.data?.quote);
      dispatch(fetchQuote());
      toast.success(response?.data?.message);
      setComment("");
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-800 dark:text-white border"
      />
      <button
        onClick={handleComment}
        className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
      >
        Comment
      </button>

      <div className="mt-3">
        {quote.comments.length > 0 ? (
          quote.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              quoteId={quote._id}
              setQuote={setQuote}
              user={user}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm mt-2">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
