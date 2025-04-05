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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isTrending, setIsTrending] = useState(false);
  const [isFollowingTab, setIsFollowingTab] = useState(false);
  const [followedUsers, setFollowedUsers] = useState(["user1", "user3"]);

  const { quotes } = useSelector((state) => state.quote);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (user?.token) {
  //     dispatch(fetchFavorite(user.token));
  //   }
  // }, [user]);

  const filteredQuotes = quotes
    .filter((quote) => {
      const matchesSearch = quote.text
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || quote.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .filter((quote) => {
      if (isTrending) {
        return quote.likes > 100;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortOrder === "oldest") {
        return new Date(a.date) - new Date(b.date);
      }
      // return 0;
    });

  const followedQuotes = filteredQuotes?.filter((quote) =>
    followedUsers.includes(quote.author)
  );

  return (
    <div className="max-w-4xl hover:shadow-pink-600 dark:hover:shadow-blue-600 shadow-2xl border-3 border-pink-300 rounded-xl dark:border-blue-600 mx-auto p-6 min-h-screen transition-colors duration-300 bg-gradient-to-r dark:from-blue-900/90 dark:to-black/90 from-purple-200 to-red-300 dark:text-white text-black">
      <AddPostBtn />

      <h1 className="text-4xl font-bold text-center mb-6 dark:text-white text-black">
        Quotes
      </h1>

      {/* Search & Filter Section */}
      <div className="mb-4 flex flex-col md:flex-row gap-3 md:gap-4 justify-center">
        {/* Search Bar */}
        <input
          type="text"
          className="p-2 flex-1 min-w-[200px] max-w-full rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 dark:text-white text-black"
          placeholder="Search quotes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import QuoteCard from "../QuoteCard";
// import { Link } from "react-router-dom";
// import { FaPlus, FaSun, FaMoon } from "react-icons/fa";
// import { quotes } from "../../data/quotes";
// import fetchData from "../../hooks/fetchData";

// const categories = ["All", "Motivation", "Love", "Life", "Friendship", "Success", "Humor"];

// const Home = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [sortOrder, setSortOrder] = useState("newest");
//   const [isTrending, setIsTrending] = useState(false);
//   const [isFollowingTab, setIsFollowingTab] = useState(false);
//   const [followedUsers, setFollowedUsers] = useState(["user1", "user3"]);

//   const { data } = fetchData();

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     if (!darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   };

//   const filteredQuotes = quotes
//     .filter((quote) => {
//       const matchesSearch = quote.text.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory = selectedCategory === "All" || quote.category === selectedCategory;
//       return matchesSearch && matchesCategory;
//     })
//     .filter((quote) => (isTrending ? quote.likes > 100 : true))
//     .sort((a, b) => (sortOrder === "newest" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)));

//   const followedQuotes = filteredQuotes.filter((quote) => followedUsers.includes(quote.author));

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className={`max-w-4xl mx-auto p-6 min-h-screen transition-colors duration-300 ${
//         darkMode ? "bg-gradient-to-r from-black via-black to-red-900 text-white" : "bg-gradient-to-r from-gray-900 to-black text-white"
//       }`}
//     >
//       <motion.h1 className="text-4xl font-bold text-center mb-6" initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
//         Quotes
//       </motion.h1>

//       <motion.div className="mb-4 flex gap-4 justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
//         <input
//           type="text"
//           className="p-2 w-1/3 rounded-lg text-white bg-gray-700 border border-gray-600"
//           placeholder="Search quotes..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <select
//           className="p-2 rounded-lg text-white bg-gray-700 border border-gray-600"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//         <select
//           className="p-2 rounded-lg text-white bg-gray-700 border border-gray-600"
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//         >
//           <option value="newest">Newest First</option>
//           <option value="oldest">Oldest First</option>
//         </select>
//         <motion.button
//           onClick={() => setIsTrending(!isTrending)}
//           className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
//           whileHover={{ scale: 1.1 }}
//         >
//           {isTrending ? "Show All" : "Trending"}
//         </motion.button>
//       </motion.div>

//       <div className="flex justify-center gap-4 mb-6">
//         <motion.button
//           onClick={() => setIsFollowingTab(false)}
//           className={`p-2 rounded-lg ${!isFollowingTab ? "bg-blue-600" : "bg-gray-600"} text-white`}
//           whileHover={{ scale: 1.05 }}
//         >
//           All Quotes
//         </motion.button>
//         <motion.button
//           onClick={() => setIsFollowingTab(true)}
//           className={`p-2 rounded-lg ${isFollowingTab ? "bg-blue-600" : "bg-gray-600"} text-white`}
//           whileHover={{ scale: 1.05 }}
//         >
//           Following
//         </motion.button>
//       </div>

//       <motion.div className="fixed bottom-6 right-20 flex flex-col items-center gap-4">
//         <motion.div whileHover={{ scale: 1.1 }}>
//           <Link to="/post-quote" className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition">
//             <FaPlus size={24} />
//           </Link>
//         </motion.div>
//         <motion.div whileHover={{ scale: 1.1 }}>
//           <button onClick={toggleDarkMode} className="bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition">
//             {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
//           </button>
//         </motion.div>
//       </motion.div>

//       {isFollowingTab
//         ? followedQuotes.map((quote) => <QuoteCard key={quote.id} quote={quote} darkMode={darkMode} />)
//         : filteredQuotes.map((quote) => <QuoteCard key={quote.id} quote={quote} darkMode={darkMode} />)}
//     </motion.div>
//   );
// };

// export default Home;
