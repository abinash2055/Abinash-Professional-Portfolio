
import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
      setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed left-0 top-0 z-[99999] hidden md:block ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: "opacity 0.2s ease",
      }}
    >
      {/* Outer Circular Cursor */}
      <div className="absolute -left-4 -top-4 h-8 w-8 rounded-full border border-gray-500/80 dark:border-gray-300/80" />

      {/* Dark Center Point */}
      <div className="absolute -left-[3px] -top-[3px] h-[6px] w-[6px] rounded-full bg-black dark:bg-white" />
    </div>
  );
};

export default CustomCursor;
