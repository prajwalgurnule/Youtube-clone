import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiTrendingUp, 
  FiSave, 
  FiPlay,
  FiSettings,
  FiThumbsUp,
  FiHelpCircle,
  FiFlag,
  FiSend
} from 'react-icons/fi';
import { useState, useEffect } from 'react';

const Sidebar = ({ sidebarOpen }) => {
  const [subscribedChannels, setSubscribedChannels] = useState([]);

  useEffect(() => {
    const loadSubscriptions = () => {
      try {
        const channels = JSON.parse(localStorage.getItem('subscribedChannels') || '[]');
        setSubscribedChannels(channels);
      } catch (error) {
        console.error('Error parsing subscribed channels:', error);
        setSubscribedChannels([]);
      }
    };

    // Load initial subscriptions
    loadSubscriptions();

    // Listen for storage updates
    window.addEventListener('storageUpdated', loadSubscriptions);

    return () => {
      window.removeEventListener('storageUpdated', loadSubscriptions);
    };
  }, []);

  const menuLinks = [
    { to: '/', icon: <FiHome />, text: 'Home' },
    { to: '/trending', icon: <FiTrendingUp />, text: 'Trending' },
    { to: '/gaming', icon: <FiPlay />, text: 'Gaming' },
    { to: '/saved', icon: <FiSave />, text: 'Saved Videos' },
    { to: '/liked', icon: <FiThumbsUp />, text: 'Liked Videos' },
  ];

  const settingsLinks = [
    { to: '/settings', icon: <FiSettings />, text: 'Settings' },
    { to: '/help', icon: <FiHelpCircle />, text: 'Help' },
    { to: '/feedback', icon: <FiSend />, text: 'Send feedback' },
    { to: '/report', icon: <FiFlag />, text: 'Report history' },
  ];

  return (
    <motion.aside
      initial={{ width: sidebarOpen ? '240px' : '80px' }}
      animate={{ width: sidebarOpen ? '240px' : '80px' }}
      transition={{ duration: 0.3 }}
      className={`h-full bg-white dark:bg-[#0f0f0f] shadow-md overflow-hidden flex-shrink-0 flex flex-col`}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* MENU Section */}
          {sidebarOpen && (
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2"
            >
              MENU
            </motion.h2>
          )}
          <ul className="space-y-1">
            {menuLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-red-100 text-red-600 dark:bg-gray-700 dark:text-red-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <span className="text-xl">{link.icon}</span>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="ml-3"
                    >
                      {link.text}
                    </motion.span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* SUBSCRIPTIONS Section - Only shown if there are subscriptions */}
          {subscribedChannels.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {sidebarOpen && (
                <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-6 mb-2">
                  SUBSCRIPTIONS
                </h2>
              )}
              <ul className="space-y-1">
                {subscribedChannels.map((channel) => (
                  <li key={channel.id}>
                    <NavLink
                      // to={`/channel/${channel.id}`}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <img 
                        src={channel.profile_image_url} 
                        alt={channel.name}
                        className="w-6 h-6 rounded-full"
                      />
                      {sidebarOpen && (
                        <span className="ml-3">
                          {channel.name}
                        </span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* SETTINGS Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {sidebarOpen && (
              <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-6 mb-2">
                SETTINGS
              </h2>
            )}
            <ul className="space-y-1">
              {settingsLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-red-100 text-red-600 dark:bg-gray-700 dark:text-red-400'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`
                    }
                  >
                    <span className="text-xl">{link.icon}</span>
                    {sidebarOpen && (
                      <span className="ml-3">
                        {link.text}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      {sidebarOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400"
        >
          <p>© 2025 YouTube</p>
          <p>All Rights Reserved</p>
        </motion.div>
      )}
    </motion.aside>
  );
};

export default Sidebar;