
import React, { useEffect, useState } from 'react';

// Import Get Hire Configuration
import getHireData from "../../data/navbar/GetHire";

const GetHire = () => {

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
    <a
      href={getHireData.path}
      className={`
        group relative inline-flex shrink-0
        items-center justify-center gap-2
        overflow-hidden rounded-xl
        border px-5 py-2.5
        text-sm font-semibold
        shadow-md
        transition-all duration-[2000ms] ease-out
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-offset-2
        ${loaded
          ? "translate-x-0 opacity-100"
          : "translate-x-32 opacity-0"
        }
      `}
    >
      <span>{getHireData.text}</span>

      {getHireData.showIcon && (
        <span className="
          inline-block transition-transform duration-300">
          →
        </span>
      )}
    </a>
  );
};

export default GetHire;
