import { useState, useEffect } from 'react';
import { FiMenu, FiSearch, FiBell, FiMic, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { FaYoutube } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useNavigate } from 'react-router-dom';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [isPremium, setIsPremium] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.notification-dropdown')) {
        setShowNotifications(false);
      }
      if (!event.target.closest('.user-dropdown')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleSubscribe = () => {
    setIsPremium(true);
    setShowPremiumModal(false);
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
    <>
      <header className="sticky top-0 z-10 bg-white dark:bg-[#0f0f0f] shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Left section */}
          <div className="flex items-center space-x-4 md:space-x-6">
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
                className="flex items-center space-x-1 group"
              >
                <FaYoutube className="size-6 text-[#FF0000] group-hover:scale-110 transition-transform duration-200" />
                <span className="text-xl font-semibold text-black dark:text-white tracking-tighter hidden sm:block">
                  YouTube Clone
                </span>
              </a>
            </motion.div>
          </div>

          {/* Center search - hidden on mobile when search is expanded */}
          {!showMobileSearch && (
            <div className="hidden md:flex flex-1 max-w-2xl mx-4">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2 px-4 rounded-l-full border border-gray-300 dark:border-gray-600 dark:bg-[#121212] focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-r-full border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#222222] hover:bg-red-200 dark:hover:bg-[#333333]"
                  >
                    <FiSearch className="text-xl" />
                  </button>
                  <button
                    type="button"
                    onClick={handleVoiceSearch}
                    className={`ml-2 p-2 rounded-full ${isListening ? 'bg-red-100 dark:bg-red-900 animate-pulse' : 'hover:bg-gray-200 dark:hover:bg-red-700'}`}
                  >
                    <FiMic className="text-xl" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Mobile search - shown when search is expanded */}
          <AnimatePresence>
            {showMobileSearch && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute left-0 right-0 top-0 h-14 bg-white dark:bg-[#0f0f0f] flex items-center px-4 md:hidden"
              >
                <button
                  onClick={() => setShowMobileSearch(false)}
                  className="p-2 mr-2"
                >
                  <FiX className="text-xl" />
                </button>
                <form onSubmit={handleSearch} className="flex-1">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Search YouTube"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full py-2 px-4 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-[#121212] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleVoiceSearch}
                      className={`absolute right-3 p-1 ${isListening ? 'text-red-500' : 'text-gray-500'}`}
                    >
                      <FiMic className="text-xl" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Mobile search button */}
            <button
              onClick={() => setShowMobileSearch(true)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 md:hidden"
            >
              <FiSearch className="text-xl" />
            </button>

            <ThemeToggle />

            {isPremium ? (
              <div className="hidden sm:flex items-center space-x-1 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                <span className="text-yellow-500">★</span>
                <span>Premium</span>
              </div>
            ) : (
              <button 
                onClick={() => setShowPremiumModal(true)}
                className="hidden sm:flex items-center bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Get Premium
              </button>
            )}

            {/* Notification dropdown */}
            <div className="notification-dropdown relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative"
              >
                <FiBell className="text-xl" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#0f0f0f] rounded-md shadow-lg border dark:border-gray-700 z-50"
                  >
                    <div className="p-4 border-b dark:border-gray-700">
                      <h3 className="font-medium text-lg">Notifications</h3>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 text-red-500 mr-3">
                          <FaYoutube className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Welcome to YouTube Clone!</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            You're all set to start watching videos.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-2 border-t dark:border-gray-700 text-center">
                      <button className="text-sm text-red-600 dark:text-red-400 hover:underline">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User dropdown */}
            <div className="user-dropdown relative">
              <button 
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FiUser className="text-xl" />
              </button>
              
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#0f0f0f] rounded-md shadow-lg border dark:border-gray-700 z-50"
                  >
                    <div className="py-1">
                      <div className="px-4 py-2 border-b dark:border-gray-700">
                        <p className="text-sm">Signed in as</p>
                        <p className="text-sm font-medium">User</p>
                      </div>
                      {/* <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FiUser className="mr-3" />
                        Your Channel
                      </button> */}
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FiLogOut className="mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Modal */}
      <AnimatePresence>
        {showPremiumModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white dark:bg-[#0f0f0f] rounded-lg shadow-xl max-w-md w-full overflow-hidden border dark:border-gray-700"
            >
              <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {isPremium ? 'Premium Member' : 'YouTube Premium'}
                </h3>
                <button
                  onClick={() => setShowPremiumModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <FiX size={24} />
                </button>
              </div>

              {isPremium ? (
                <div className="p-6 text-center">
                  <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">★</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    You're a YouTube Premium Member!
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Enjoy ad-free videos, background play, and more.
                  </p>
                  <button
                    onClick={() => setShowPremiumModal(false)}
                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Continue Watching
                  </button>
                </div>
              ) : (
                <>
                  <div className="p-6">
                    <div className="flex justify-center mb-6">
                      <div className="inline-flex rounded-md shadow-sm">
                        <button
                          onClick={() => setSelectedPlan('monthly')}
                          className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                            selectedPlan === 'monthly'
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          Monthly
                        </button>
                        <button
                          onClick={() => setSelectedPlan('yearly')}
                          className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                            selectedPlan === 'yearly'
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          Yearly (Save 20%)
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Ad-free watching experience
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Download videos for offline viewing
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Background play
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          YouTube Music Premium included
                        </span>
                      </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 rounded-lg p-4 mb-6">
                      <div className="text-center">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          {selectedPlan === 'monthly' ? '$11.99' : '$119.99'}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          /{selectedPlan === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                      {selectedPlan === 'yearly' && (
                        <div className="text-center text-green-600 dark:text-green-400 text-sm mt-1">
                          Save $24 compared to monthly
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end">
                    <button
                      onClick={handleSubscribe}
                      className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Subscribe Now
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;