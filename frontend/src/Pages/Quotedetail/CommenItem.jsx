import { RiDeleteBin6Fill } from "react-icons/ri";
// import axiosInstance from "../hooks/axiosConfig";
import toast from "react-hot-toast";
import axiosInstance from "../../hooks/axiosConfig";

const CommentItem = ({ comment, quoteId, setQuote, user }) => {
  const handleCommentDelete = async () => {
    if (!comment._id) return;

    try {
      const response = await axiosInstance.delete(
        `/api/comments/${quoteId}/${comment._id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setQuote(response.data.quote);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <p className="text-sm bg-gray-300 dark:bg-gray-800 p-2 rounded-md my-2 relative">
      <span className="font-semibold">{comment.commentBy}:</span> {comment.text}
      {user?.username === comment.commentBy && (
        <button
          onClick={handleCommentDelete}
          className="absolute text-2xl text-red-500 right-5"
        >
          <RiDeleteBin6Fill />
        </button>
      )}
    </p>
  );
};

export default CommentItem;
