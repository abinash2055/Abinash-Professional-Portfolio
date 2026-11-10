
import React, { useEffect, useState } from "react";

// Import navbar title configuration
import navbarTitle from "../../data/navbar/Title";

const Title = () => {

  // Extract title information
  const { title } = navbarTitle;

  // Control entrance animation
  const [loaded, setLoaded] = useState(false);

  // Trigger animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    // Main title container
    <div
      className={`
        relative z-10 flex min-w-0 flex-col justify-center
        transition-all duration-[2500ms] ease-in-out
        ${loaded
          ? "translate-x-0 opacity-100"
          : "translate-x-32 opacity-0"
        }
      `}
    >

      {/* Portfolio Owner Name */}
      <h1 className="
        whitespace-nowrap
        text-base font-extrabold
        tracking-wide
        text-black
        sm:text-xl md:text-2xl
      ">
        {title.name}
      </h1>

      {/* Professional Designation */}
      <p className="
        mt-1
        text-[10px] font-semibold
        uppercase tracking-[0.2em]
        sm:text-xs md:text-sm
      ">
        {title.description}
      </p>

    </div>
  );
};

export default Title;
