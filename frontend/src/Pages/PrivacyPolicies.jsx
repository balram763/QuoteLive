import React from 'react'

const PrivacyPolicies = () => {
  return (
    <div className="max-w-5xl  hover:shadow-pink-600 dark:hover:shadow-blue-600 shadow-2xl border-3 border-pink-300 rounded-xl dark:border-blue-600 mx-auto p-10 min-h-screen transition-colors duration-300 bg-gradient-to-r dark:from-blue-900/90 dark:to-black/90 from-purple-100 to-pink-200  dark:text-white text-black">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At <strong>QuotLive</strong>, your privacy is important to us. This
        Privacy Policy outlines how we collect, use, and protect your
        information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Username, email, and profile picture when you create an account.</li>
        <li>Quotes you post, likes, comments, and interactions on the platform.</li>
        <li>Messages sent through the chat feature.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>To display your content and profile to other users.</li>
        <li>To enable social interactions such as follows, likes, and chat.</li>
        <li>To improve the platform experience and suggest content you may like.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Chat Privacy</h2>
      <p className="mb-4">
        All messages sent via the chat feature are private between users. We do
        not share or sell chat data to any third parties.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
      <p className="mb-4">
        We implement secure protocols and encryption to protect your data. Your
        password is hashed and not visible to us.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Third-Party Services</h2>
      <p className="mb-4">
        We do not share your personal data with any third-party companies for
        marketing purposes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Account Control</h2>
      <p className="mb-4">
        You can update or delete your account at any time from the settings or
        edit profile page.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. You will be
        notified if any significant changes are made.
      </p>

      <p className="mt-6">
        If you have any questions or concerns, feel free to{" "}
        <a href="mailto:chat@quotlive.online" className="text-blue-600 dark:text-blue-400 underline">
          contact us
        </a>
        .
      </p>
    </div>
  );
}

export default PrivacyPolicies
