import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfile, postQuote } from "../features/quote/quoteSlice";
import Loading from "../components/Loading";

const categories = [
  "Motivation",
  "Love",
  "Life",
  "Friendship",
  "Success",
  "Humor",
];

const PostQuote = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError } = useSelector((state) => state.quote);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState(user?.username);
  const [category, setCategory] = useState(categories[0]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postQuote({ text: quote, category }));
    dispatch(fetchProfile(user.token));
    setQuote("");
    setAuthor("");
    setCategory(categories[0]);
    navigate("/");
  };

  if (isLoading) {
    <Loading />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen transition-colors duration-300 bg-gradient-to-r dark:from-blue-900/90 dark:to-black/90 from-purple-200 to-red-300 text-black dark:text-white">
      <div className="backdrop-blur-lg backdrop-filter bg-white-200 border-2 border-white dark:bg-black/20 dark:border-gray-600 p-8 hover:shadow-pink-600 dark:hover:shadow-blue-600 shadow-2xl rounded-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Post a Quote</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg mb-2">Quote</label>
            <textarea
              className="w-full p-3 rounded-lg dark:bg-gray-700 bg-white text-black dark:text-white border-2 dark:border-gray-600 border-white focus:outline-none focus:shadow-2xl focus:shadow-red-500 focus:dark:border-blue-600 focus:border-pink-600"
              placeholder="Write your quote..."
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg mb-2">Author</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg dark:bg-gray-700 bg-white text-black dark:text-white border-2 dark:border-gray-600 border-white focus:outline-none focus:shadow-2xl focus:shadow-red-500 focus:dark:border-blue-600 focus:border-pink-600"
              placeholder={user?.username}
              disabled
              value={author}
              // onChange={(e) => setAuthor(author)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg mb-2">Category</label>
            <select
              className="w-full p-3 rounded-lg dark:bg-gray-700 bg-white text-black dark:text-white border-2 dark:border-gray-600 border-white focus:outline-none focus:shadow-2xl focus:shadow-red-500 focus:dark:border-blue-600 focus:border-pink-600"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            Post Quote
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostQuote;
