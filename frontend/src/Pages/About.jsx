import { FaComment, FaHeart, FaStar, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="max-w-4xl hover:shadow-pink-600 dark:hover:shadow-blue-600 shadow-2xl mx-auto p-6 min-h-screen dark:border-blue-900 rounded-xl border-pink-200 border-3 bg-gradient-to-r dark:from-gray-900 dark:to-black from-purple-200 to-red-300 transition-colors duration-300 text-gray-900 dark:text-white">
      <div className="text-center mb-6">
        <img
          src="https://media.istockphoto.com/id/1267734530/photo/social-people.jpg?s=612x612&w=0&k=20&c=-0epoPBxaaQhttxXdVafCNTZao4IBTLM5Vt3TubiyVw="
          alt="Quote App"
          className="mx-auto rounded-lg shadow-lg border border-gray-300 dark:border-gray-700"
        />
        <h1 className="text-4xl font-bold mt-4">About QuoteApp</h1>
      </div>

      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        QuoteApp is a social platform for sharing and discovering inspirational
        quotes. Users can post their own quotes, like and comment on others'
        quotes, and engage with a vibrant community of thinkers and writers.
      </p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Key Features:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard
            icon={<FaHeart className="text-red-500" />}
            text="Like & engage with quotes."
          />
          <FeatureCard
            icon={<FaComment className="text-blue-400" />}
            text="Add and reply to comments."
          />
          <FeatureCard
            icon={<FaStar className="text-yellow-400" />}
            text="Save favorite quotes."
          />
          <FeatureCard
            icon={<FaUser className="text-green-400" />}
            text="View & follow user profiles."
          />
        </div>
      </div>

      <div className="text-center mt-6">
        <Link
          to="/"
          className="bg-blue-500 dark:bg-blue-600 px-5 py-2 rounded-lg text-white hover:bg-blue-600 dark:hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, text }) => (
  <div className="flex items-center bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 hover:scale-105 transition duration-300">
    <div className="text-2xl">{icon}</div>
    <p className="ml-3 text-lg text-gray-800 dark:text-gray-200">{text}</p>
  </div>
);

export default About;
