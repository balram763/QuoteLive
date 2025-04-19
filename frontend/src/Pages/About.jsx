// import { FaComment, FaHeart, FaStar, FaUser } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const About = () => {
//   return (
//     <div className="max-w-4xl hover:shadow-pink-600 dark:hover:shadow-blue-600 shadow-2xl mx-auto p-6 min-h-screen dark:border-blue-900 rounded-xl border-pink-200 border-3 bg-gradient-to-r dark:from-gray-900 dark:to-black from-purple-200 to-red-300 transition-colors duration-300 text-gray-900 dark:text-white">
//       <div className="text-center mb-6">
//         <img
//           src="https://media.istockphoto.com/id/1267734530/photo/social-people.jpg?s=612x612&w=0&k=20&c=-0epoPBxaaQhttxXdVafCNTZao4IBTLM5Vt3TubiyVw="
//           alt="Quote App"
//           className="mx-auto rounded-lg shadow-lg border border-gray-300 dark:border-gray-700"
//         />
//         <h1 className="text-4xl font-bold mt-4">About QuoteApp</h1>
//       </div>

//       <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
//         QuoteApp is a social platform for sharing and discovering inspirational
//         quotes. Users can post their own quotes, like and comment on others'
//         quotes, and engage with a vibrant community of thinkers and writers.
//       </p>

//       <div className="mt-6">
//         <h2 className="text-2xl font-semibold mb-4">Key Features:</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <FeatureCard
//             icon={<FaHeart className="text-red-500" />}
//             text="Like & engage with quotes."
//           />
//           <FeatureCard
//             icon={<FaComment className="text-blue-400" />}
//             text="Add and reply to comments."
//           />
//           <FeatureCard
//             icon={<FaStar className="text-yellow-400" />}
//             text="Save favorite quotes."
//           />
//           <FeatureCard
//             icon={<FaUser className="text-green-400" />}
//             text="View & follow user profiles."
//           />
//         </div>
//       </div>

//       <div className="text-center mt-6">
//         <Link
//           to="/"
//           className="bg-blue-500 dark:bg-blue-600 px-5 py-2 rounded-lg text-white hover:bg-blue-600 dark:hover:bg-blue-700 transition"
//         >
//           Back to Home
//         </Link>
//       </div>
//     </div>
//   );
// };

// const FeatureCard = ({ icon, text }) => (
//   <div className="flex items-center bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 hover:scale-105 transition duration-300">
//     <div className="text-2xl">{icon}</div>
//     <p className="ml-3 text-lg text-gray-800 dark:text-gray-200">{text}</p>
//   </div>
// );

// export default About;

// import { FaComment, FaHeart, FaStar, FaUser, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// const sliderImages = [
//   "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
//   "https://images.unsplash.com/photo-1521336575822-6da63fb45457",
//   "https://images.unsplash.com/photo-1533616688414-b7a585564566",
// ];

// const About = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const handleNext = () => {
//     setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
//   };

//   const handlePrev = () => {
//     setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
//   };

//   return (
//     <div className="max-w-4xl hover:shadow-pink-600 dark:hover:shadow-blue-600 shadow-2xl mx-auto p-6 min-h-screen dark:border-blue-900 rounded-xl border-pink-200 border-3 bg-gradient-to-r dark:from-gray-900 dark:to-black from-purple-200 to-red-300 transition-colors duration-300 text-gray-900 dark:text-white">

//       {/* Description */}
//       <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
//         QuotLive is a social platform for sharing and discovering inspirational
//         quotes and Shayari(poetry). Users can post their own posts, like and comment on others'
//         posts, and engage with a vibrant community of thinkers and writers.
//       </p>

//       {/* Slider Section */}
//       <div className="relative my-10">
//         <img
//           src={sliderImages[currentSlide]}
//           alt="Slider"
//           className="w-full h-64 object-cover rounded-lg shadow-md border border-gray-300 dark:border-gray-700"
//         />
//         <button
//           onClick={handlePrev}
//           className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:scale-105 transition"
//         >
//           ❮
//         </button>
//         <button
//           onClick={handleNext}
//           className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:scale-105 transition"
//         >
//           ❯
//         </button>
//       </div>

//       {/* Features */}
//       <div className="mt-6">
//         <h2 className="text-2xl font-semibold mb-4">Key Features:</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <FeatureCard icon={<FaHeart className="text-red-500" />} text="Like & engage with quotes." />
//           <FeatureCard icon={<FaComment className="text-blue-400" />} text="Add and reply to comments." />
//           <FeatureCard icon={<FaStar className="text-yellow-400" />} text="Save favorite quotes." />
//           <FeatureCard icon={<FaUser className="text-green-400" />} text="View & follow user profiles." />
//         </div>
//       </div>

//       {/* Back Home */}
//       <div className="text-center mt-6">
//         <Link
//           to="/"
//           className="bg-blue-500 dark:bg-blue-600 px-5 py-2 rounded-lg text-white hover:bg-blue-600 dark:hover:bg-blue-700 transition"
//         >
//           Back to Home
//         </Link>
//       </div>

//       {/* Footer */}
//       <footer className="mt-10 pt-6 border-t border-gray-300 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
//         <p>&copy; 2025 QuoteApp. All rights reserved.</p>
//         <div className="flex justify-center gap-4 mt-2 text-lg">
//           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//             <FaFacebook className="hover:text-blue-600" />
//           </a>
//           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//             <FaTwitter className="hover:text-blue-400" />
//           </a>
//           <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//             <FaInstagram className="hover:text-pink-500" />
//           </a>
//         </div>
//         <div className="mt-2">
//           <Link to="/contact" className="hover:underline mx-2">Contact</Link>
//           <Link to="/privacy" className="hover:underline mx-2">Privacy</Link>
//           <Link to="/terms" className="hover:underline mx-2">Terms</Link>
//         </div>
//       </footer>
//     </div>
//   );
// };

// const FeatureCard = ({ icon, text }) => (
//   <div className="flex items-center bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 hover:scale-105 transition duration-300">
//     <div className="text-2xl">{icon}</div>
//     <p className="ml-3 text-lg text-gray-800 dark:text-gray-200">{text}</p>
//   </div>
// );

// export default About;

import {
  FaComment,
  FaHeart,
  FaStar,
  FaUser,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaSnapchat,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const sliderImages = [
  "https://i.pinimg.com/originals/d8/a3/b4/d8a3b4e53021cdc56f17226299135693.gif",
  // "https://i.pinimg.com/originals/40/6c/97/406c97079295f8d532e205087d4bb931.gif",
  // "https://i.pinimg.com/originals/b1/1d/65/b11d65d7993038e0011df791e8906582.gif",
  "https://i.pinimg.com/originals/6f/45/d9/6f45d9dba4ada0b009b302be14a10491.gif",
  "https://i.pinimg.com/originals/46/cb/ed/46cbed8058f05079ed59631719978e90.gif",
  "https://i.pinimg.com/originals/e3/1b/75/e31b752875679b64fce009922f9f0dda.gif",
];

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const handlePrev = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen rounded-xl border border-pink-200 dark:border-blue-900 bg-gradient-to-r from-purple-200 to-pink-300 dark:from-gray-900 dark:to-black shadow-2xl text-gray-900 dark:text-white transition-colors duration-300">
      <h1 className="text-4xl font-bold text-center mb-6">About QuotLive</h1>

      <p className="md:text-lg shadow-pink-400 dark:shadow-blue-900 shadow-xl text-sm leading-relaxed text-start text-gray-700 dark:text-gray-300 mb-10 max-w-3xl border-2 rounded-2xl border-white p-3 mx-auto">
      QuotLive is a creative space to share quotes, Shayari, and connect with like-minded individuals.
Express your thoughts, discover inspiring content, like and comment on posts, and enjoy real-time chat with fellow creators to build a meaningful community.
      </p>

      {/* Image Slider */}
      <div className="relative w-full md:h-100 h-70 rounded-0 shadow-2xl shadow-pink-600 dark:shadow-blue-800 overflow-hidden mb-8">
        <img
          src={sliderImages[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="w-full md:h-130 h-full dark:invert-90  object-contain transition duration-500 rounded-lg"
        />
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:scale-110 transition"
        >
          ❮
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:scale-110 transition"
        >
          ❯
        </button>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
          {sliderImages.map((_, idx) => (
            <div
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                idx === currentSlide ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          <FeatureCard
            icon={<FaSnapchat className="text-green-400" />}
            text="Chat with Other make Friends."
          />
        </div>
      </div>

      {/* Back Home */}
      <div className="text-center mb-10">
        <Link
          to="/"
          className="bg-blue-500 dark:bg-blue-600 px-6 py-2 rounded-lg text-white font-medium hover:bg-blue-600 dark:hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>

      {/* Footer */}
      <footer className="border-t pt-6 border-gray-300 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
        <p className="mb-2">&copy; 2025 QuotLive. All rights reserved.</p>
        <div className="flex justify-center gap-6 text-lg mb-2">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="hover:text-blue-600" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="hover:text-blue-400" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="hover:text-pink-500" />
          </a>
        </div>
        <div className="mb-4">
          <Link to="/contact" className="hover:underline mx-2">
            Contact
          </Link>
          <Link to="/privacy" className="hover:underline mx-2">
            Frequenctly Asked Questions
          </Link>
          <Link to="/terms" className="hover:underline mx-2">
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, text }) => (
  <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-300 dark:border-gray-700 hover:scale-105 transition duration-300">
    <div className="text-xl">{icon}</div>
    <p className="ml-4 text-gray-800 dark:text-gray-200">{text}</p>
  </div>
);

export default About;
