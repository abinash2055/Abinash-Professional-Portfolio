import React, { useEffect, useState } from "react";
import "../styles/mouse.css";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [cursorType, setCursorType] = useState("default");
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });

      setVisible(true);

      const target = event.target;

      if (
        target.closest(
          "a, button, [role='button'], .cursor-pointer"
        )
      ) {
        setCursorType("pointer");
      } else if (
        target.closest("input, textarea, select")
      ) {
        setCursorType("input");
      } else if (target.closest("h1, h2, h3, p")) {
        setCursorType("text");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  const cursorSize = {
    default: "scale-100",
    pointer: "scale-[1.8]",
    input: "scale-75",
    text: "scale-150",
  };

  return (
    <div
      className={`custom-cursor pointer-events-none fixed left-0 top-0 z-[99999] hidden md:block ${visible ? "opacity-100" : "opacity-0"
        }`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {/* Outer Circular Cursor */}
      <div
        className={`
          custom-cursor-ring
          absolute -left-5 -top-5
          h-10 w-10 rounded-full
          ${cursorSize[cursorType]}
          ${isClicking ? "scale-75" : ""}
          ${cursorType === "pointer" ? "cursor-hover" : ""}
        `}
      />

      {/* Center Dot */}
      <div
        className={`
          custom-cursor-dot
          absolute -left-[3px] -top-[3px]
          h-[6px] w-[6px] rounded-full
          ${cursorType === "pointer" ? "scale-0" : "scale-100"}
          ${isClicking ? "scale-150" : ""}
        `}
      />

      {/* Click Ripple */}
      {isClicking && (
        <div className="custom-cursor-ripple absolute -left-5 -top-5 h-10 w-10 rounded-full" />
      )}
    </div>
  );
};

export default CustomCursor;