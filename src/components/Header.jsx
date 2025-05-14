import { useState } from 'react';
import { FiMenu, FiSearch, FiBell, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality will be handled in the pages
  };

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
              
              <span className="text-2xl font-bold text-gray-800 dark:text-white"><span className="text-2xl font-bold text-red-600">NAT </span> WATCH</span>
            </motion.div>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-10 rounded-full border dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
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