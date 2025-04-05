const ProfileStats = ({ userQuotes }) => {
    const totalLikes = userQuotes.reduce((sum, q) => sum + (q.likes?.length || 0), 0);
    const totalComments = userQuotes.reduce((sum, q) => sum + (q.comments?.length || 0), 0);
  
    const stats = [
      { label: "Quotes", value: userQuotes.length },
      { label: "Total Likes", value: totalLikes },
      { label: "Total Comments", value: totalComments },
    ];
  
    return (
      <div className="grid grid-cols-3 gap-4 bg-gray-200 dark:bg-gray-800 p-4 rounded-lg mt-6 shadow-md text-center">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-3 hover:scale-115 transition duration-300 hover:bg-blue-500 rounded-lg bg-gray-100 dark:bg-gray-700 shadow-md"
          >
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default ProfileStats;
  