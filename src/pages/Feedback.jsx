import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Feedback = () => {
  const { theme } = useContext(ThemeContext);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', feedback);
    setSubmitted(true);
    setFeedback('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0f0f0f] text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Send Feedback</h1>
        
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} mb-6`}>
          <h2 className="text-2xl font-semibold mb-4">We'd love to hear from you</h2>
          <p className="mb-4">Your feedback helps us improve YouTube Clone.</p>
          
          <form onSubmit={handleSubmit}>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className={`w-full p-3 rounded-lg mb-4 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
              rows="5"
              placeholder="What can we do better?"
              required
            />
            <button
              type="submit"
              className={`px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition`}
            >
              Send Feedback
            </button>
          </form>
          
          {submitted && (
            <div className={`mt-4 p-3 rounded-lg ${theme === 'dark' ? 'bg-green-800' : 'bg-green-100'} text-green-800 dark:text-green-200`}>
              Thank you for your feedback!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;