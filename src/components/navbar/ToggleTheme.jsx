
import React, { useEffect, useState } from 'react';

// Import Lucide Icons
import { Sun, Moon } from 'lucide-react';

// Import Theme Configuration
import toggleThemeData from "../../data/navbar/ToggleTheme";

const ToggleTheme = () => {

  // Theme State
  const [isDark, setIsDark] = useState(false);

  // Get Current Theme
  const currentTheme = isDark
    ? toggleThemeData.themes.dark
    : toggleThemeData.themes.light;

  // Apply Theme to Website
  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", isDark);

    root.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );

    root.style.setProperty(
      "--theme-color",
      currentTheme.color
    );

    root.style.colorScheme = isDark ? "dark" : "light";

  }, [isDark, currentTheme.color]);

  // Toggle Theme
  const handleThemeToggle = () => {
    setIsDark((previousTheme) => !previousTheme);
  };

  return (
    <button
      type="button"
      onClick={handleThemeToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={currentTheme.name}
      className={`
        group relative inline-flex shrink-0
        items-center justify-center gap-2
        rounded-xl border px-3 py-2.5
        text-sm font-semibold shadow-md
        transition-all duration-500 ease-in-out
        hover:-translate-y-1
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-offset-2

        ${isDark
          ? `
              border-gray-700
              bg-black
              text-white
              shadow-black/30
              hover:bg-gray-900
              hover:border-gray-500
              focus-visible:ring-gray-500
            `
          : `
              border-blue-600
              bg-blue-600
              text-white
              shadow-blue-500/30
              hover:bg-blue-700
              hover:border-blue-700
              focus-visible:ring-blue-500
            `
        }
      `}
    >

      {/* Theme Icon */}
      <span
        className="
          inline-flex items-center justify-center
          transition-transform duration-500
          group-hover:rotate-45
        "
      >
        {isDark ? (
          <Moon size={20} strokeWidth={2} />
        ) : (
          <Sun size={20} strokeWidth={2} />
        )}
      </span>

    </button>
  );
};

export default ToggleTheme;
