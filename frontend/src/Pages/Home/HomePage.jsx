import { useEffect, useState } from "react";
import QuoteCard from "../QuoteCard";
// import { quotes } from "../../data/quotes";
import AddPostBtn from "../../components/AddPostBtn";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorite } from "../../features/quote/quoteSlice";

const categories = [
  "All",
  "Motivation",
  "Love",
  "Life",
  "Friendship",
  "Success",
  "Humor",
];

const Home = () => {
  const [search, setsearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isTrending, setIsTrending] = useState(false);
  const [isFollowingTab, setIsFollowingTab] = useState(false);

  const { quotes,profile } = useSelector((state) => state.quote);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        dispatch(fetchFavorite(user?.token));
      }, 100);
    }
  }, [user]);

  const filteredQuotes = quotes
    ?.filter((quote) => {
      const matchesSearch = quote?.text
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || quote?.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .filter((quote) => {
      if (isTrending) {
        return Number(quote?.likes?.length || 0) > 1;
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a?.createdAt);
      const dateB = new Date(b?.createdAt);

      if (sortOrder === "newest") return dateB - dateA;
      else if (sortOrder === "oldest") return dateA - dateB;
      return 0;
    });

  // const followedQuotes = quotes?.filter((quote) =>
  //   user?.following?.includes(quote.author._id)
  // );

  const followedQuotes = quotes?.filter((quote) =>
    profile?.following?.some((followedUser) => followedUser._id === quote.author._id)
  );
  

  


  return (
    <div className="max-w-4xl hover:shadow-pink-600 dark:hover:shadow-blue-600 shadow-2xl border-3 border-pink-300 rounded-xl dark:border-blue-600 mx-auto p-6 min-h-screen transition-colors duration-300 bg-gradient-to-r dark:from-blue-900/90 dark:to-black/90 from-purple-200 to-red-300 dark:text-white text-black">
      

      <h1 className="text-4xl font-bold text-center mb-6 dark:text-white text-black">
        Quotes
      </h1>

      <AddPostBtn />

      {/* Search & Filter Section */}
      <div className="mb-4 flex flex-col md:flex-row gap-3 md:gap-4 justify-center">
        {/* Search Bar */}
        <input
          type="text"
          className="p-2 flex-1 min-w-[200px] max-w-full rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 dark:text-white text-black"
          placeholder="Search quotes..."
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />

        {/* Filter Dropdown */}
        <select
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 dark:text-white text-black"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Sort by Date Dropdown */}

        <select
          className="p-2 rounded-lg bg-gray-200  dark:bg-gray-700 border border-gray-400 dark:border-gray-600 dark:text-white text-black"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>

        {/* Trending Toggle */}
        <button
          onClick={() => setIsTrending(!isTrending)}
          className="p-2 bg-yellow-500 text-black dark:text-white rounded-lg hover:bg-yellow-600 transition"
        >
          {isTrending ? "Show All" : "Trending"}
        </button>
      </div>

      {/* Tabs for All Quotes / Following */}
      <div className="flex justify-center gap-3 md:gap-4 mb-6">
        <button
          onClick={() => setIsFollowingTab(false)}
          className={`p-2 rounded-lg ${
            !isFollowingTab
              ? "bg-blue-600 text-white"
              : "bg-gray-300 dark:bg-gray-600 dark:text-white text-black"
          }`}
        >
          All Quotes
        </button>
        <button
          onClick={() => setIsFollowingTab(true)}
          className={`p-2 rounded-lg ${
            isFollowingTab
              ? "bg-blue-600 text-white"
              : "bg-gray-300 dark:bg-gray-600 dark:text-white text-black"
          }`}
        >
          Following
        </button>
      </div>

      {isFollowingTab
        ? followedQuotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))
        : filteredQuotes.map((quote) => (
            <QuoteCard key={quote._id} quote={quote} />
          ))}
    </div>
  );
};

export default Home;
