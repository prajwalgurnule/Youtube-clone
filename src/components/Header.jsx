import { useState, useEffect } from 'react';
import { FiMenu, FiSearch, FiBell, FiUser, FiMic } from 'react-icons/fi';
import { FaYoutube } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useNavigate } from 'react-router-dom';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support voice recognition. Please try Chrome.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      navigate(`/?search=${encodeURIComponent(transcript)}`);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Voice recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Update search query when URL changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [window.location.search]);

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FiMenu className="text-xl" />
          </button>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <a
              href="/"
              className="flex items-center space-x-2 group"
            >
              <FaYoutube className="size-8 text-[#FF0000] group-hover:scale-110 transition-transform duration-200" />
              <h2 className="text-2xl font-semibold text-black dark:text-white font-[Poppins] tracking-tight">
                YouTube Clone
              </h2>
            </a>
          </motion.div>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-10 rounded-l-full border dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`p-2 rounded-r-full border border-l-0 dark:border-gray-600 ${isListening ? 'bg-red-100 dark:bg-red-900 animate-pulse' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            >
              <FiMic className="text-xl" />
            </button>
          </div>
        </form>

        <div className="flex items-center space-x-4">
          <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors">
            GET PREMIUM
          </button>
          <ThemeToggle />
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative">
            <FiBell className="text-xl" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button> 
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <FiUser className="text-xl" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;