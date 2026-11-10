import React, { useEffect, useState } from 'react';

// Import logo configuration and data
import navbarLogo from "../../data/navbar/Logo"


const Logo = () => {

  // Extract logo data from configuration
  const { logo } = navbarLogo;


  // State to control the initial logo entrance animation
  const [loaded, setLoaded] = useState(false);


  // Trigger entrance animation when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);


    // Clear timeout when component unmounts
    return () => clearTimeout(timer);
  }, []);


  return (
    // Logo container: clickable and navigates to homepage
    <a
      href='/'
      aria-label="Go to homepage"

      // Animate logo from left to its original position
      className={`
        group flex shrink-0 items-center justify-center transition-all duration-[2500ms] ease-in-out 
        ${loaded
          ? "translate-x-0 opacity-100"
          : "-translate-x-32 opacity-0"}`}>


      {/* Portfolio Logo Image */}
      <img
        src={logo.src}
        alt={logo.alt}

        // Logo size, continuous anticlockwise rotation,
        // pause rotation on hover and keyboard focus
        className="
          h-20 w-20 sm:h-24 sm:w-24 object-contain 
          motion-safe:animate-spin 
          motion-safe:[animation-direction:reverse] 
          group-hover:[animation-play-state:paused] 
          group-focus-visible:[animation-play-state:paused]"

        // Rotation speed: one complete revolution every 5 seconds
        style={{ animationDuration: "5s" }}
      />

      {/* Display logo name only when enabled in Logo.js */}
      {logo.showName && (
        <span className="ml-3 font-bold">
          {logo.name}
        </span>
      )}
    </a>
  );
};

export default Logo