import { Link } from "react-router-dom";

const ProfileQuotes = ({ userQuotes, username }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-6 text-gray-900 dark:text-gray-100">📜 {username}'s Quotes</h2>
      {userQuotes.length > 0 ? (
        <div className="mt-4 space-y-4">
          {userQuotes.map((quote) => (
            <div
              key={quote._id}
              className="bg-gray-200 dark:bg-gray-900 p-4 rounded-lg shadow-md hover:scale-[1.02] transition duration-300 transform border border-gray-300 dark:border-gray-700"
            >
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">"{quote.text}"</p>
              <div className="flex justify-between items-center mt-3">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  ❤️ {quote?.likes.length} | 💬 {quote.comments?.length || 0}
                </p>
                <Link
                  to={`/quote/${quote._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-md"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300 mt-4">No quotes found for {username}.</p>
      )}
    </>
  );
};

export default ProfileQuotes;
