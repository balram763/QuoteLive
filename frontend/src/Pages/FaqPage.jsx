import { useState } from "react";
import { Link } from "react-router-dom";

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      question: "What is QuotLive?",
      answer:
        "QuotLive is a social platform where users can share, explore, and engage with inspirational quotes. It’s built for creators and thinkers.",
    },
    {
      question: "How do I create an account?",
      answer:
        "Click the 'Login / Signup' button on the navbar. You can register using your email and password.",
    },
    {
      question: "How do I post a quote?",
      answer:
        "Once you're logged in, click the '+' icon or 'Post Quote' button on the home page. Add your quote, select a category, and click 'Post'.",
    },
    {
      question: "What is shown on my profile?",
      answer:
        "Your profile displays your username, bio, profile picture, total quotes, total likes on your quotes, followers, and following count.",
    },
    {
      question: "How do likes and comments work?",
      answer:
        "Users can like and comment on any quote. These interactions show up under the quote and count toward the creator's stats.",
    },
    {
      question: "Can I follow or unfollow other users?",
      answer:
        "Yes. Visit a user's profile and click 'Follow' or 'Unfollow'. Quotes from users you follow will show up in your feed under the 'Following' filter.",
    },
    {
      question: "How do I search for quotes or users?",
      answer:
        "Use the search bar on the home page to find quotes. On the Explore page, you can search and discover users by username.",
    },
    {
      question: "How do I update my profile?",
      answer:
        "Go to your profile and click 'Edit Profile'. You can update your username, bio, and profile picture from there.",
    },
    {
      question: "How can I save or favorite a quote?",
      answer:
        "Click the star icon on any quote to add it to your favorites. You can view all your saved quotes under the 'Favorite' tab.",
    },
    {
      question: "What are trending quotes?",
      answer:
        "Trending quotes are the most liked and engaged quotes across the platform. You can filter by 'Trending' from the home page.",
    },
    {
      question: "Can I chat with other users on QuotLive?",
      answer:
        "Yes! QuotLive supports 1-on-1 chat between users. Just visit a user's profile and click on the chat/message icon to start a conversation. Your messages are private and delivered in real-time.",
    },
    {
      question: "Is QuotLive free to use?",
      answer:
        "Yes, QuotLive is completely free. You can post, like, comment, and follow without any charges.",
    },
    {
      question: "Who can see my profile and quotes?",
      answer:
        "All profiles and quotes are public by default, so any user can discover and interact with your content.",
    },
    {
      question: "Is dark mode supported?",
      answer:
        "Yes! QuotLive supports light and dark mode. It automatically adjusts based on your system settings.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-4 py-10 max-w-3xl hover:shadow-pink-600 dark:hover:shadow-blue-600 shadow-2xl border-3 border-pink-300 rounded-xl dark:border-blue-600 mx-auto min-h-screen transition-colors duration-300 bg-gradient-to-r dark:from-blue-900/90 dark:to-black/90 from-purple-200 to-pink-300  dark:text-white text-black">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-purple-100 dark:bg-gray-800 dark:border-gray-700"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left text-lg font-medium text-gray-900 dark:text-white focus:outline-none"
            >
              {faq.question}
            </button>

            {openIndex === index && (
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
        <Link
          to="/"
          className="bg-pink-500 mt-15 dark:bg-blue-600 px-6 py-2 rounded-lg text-white font-medium hover:bg-blue-600 dark:hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default FaqPage;
