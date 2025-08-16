'use client';

import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../providers/ThemeContext/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
      {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
    </button>
  );
};
