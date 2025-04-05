import { Link } from "react-router-dom";

const QuoteHeader = ({ quote }) => {
  return (
    <div>
      <p className="text-lg font-semibold">"{quote.text}"</p>
      <Link
        to={`/profile/${quote?.author._id || quote?.author}`}
        className="text-sm dark:text-white text-gray-700 hover:underline"
      >
        - {quote?.author?.username || quote?.user}
      </Link>
    </div>
  );
};

export default QuoteHeader;
