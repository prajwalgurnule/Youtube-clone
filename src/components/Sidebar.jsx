import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiTrendingUp, FiSave, FiPlay } from 'react-icons/fi';

const Sidebar = ({ sidebarOpen }) => {
  const links = [
    { to: '/', icon: <FiHome />, text: 'Home' },
    { to: '/trending', icon: <FiTrendingUp />, text: 'Trending' },
    { to: '/gaming', icon: <FiPlay />, text: 'Gaming' },
    { to: '/saved', icon: <FiSave />, text: 'Saved Videos' },
  ];

  return (
    <motion.aside
      initial={{ width: sidebarOpen ? '240px' : '80px' }}
      animate={{ width: sidebarOpen ? '240px' : '80px' }}
      transition={{ duration: 0.3 }}
      className={`h-full bg-white dark:bg-gray-800 shadow-md overflow-hidden flex-shrink-0`}
    >
      <div className="p-4">
        <ul className="space-y-2">
          {links.map((link) => (
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
      </div>
    </motion.aside>
  );
};

export default Sidebar;