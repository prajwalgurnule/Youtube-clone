import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      {theme === 'light' ? (
        <FiMoon className="text-xl" />
      ) : (
        <FiSun className="text-xl" />
      )}
    </button>
  );
};

export default ThemeToggle;