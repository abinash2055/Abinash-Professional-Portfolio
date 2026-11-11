
import { useEffect, useRef } from "react";
import "../styles/mouse.css";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  const tailRef = useRef(null);
  const tailPathRef = useRef(null);
  const tailShadowRef = useRef(null);
  const tailStartRef = useRef(null);

  const burstRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const points = useRef([]);

  const animationFrame = useRef(null);
  const hideTimeout = useRef(null);
  const clickTimeout = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;

    const tail = tailRef.current;
    const tailPath = tailPathRef.current;
    const tailShadow = tailShadowRef.current;
    const tailStart = tailStartRef.current;

    const burst = burstRef.current;

    if (
      !cursor ||
      !ring ||
      !dot ||
      !tail ||
      !tailPath ||
      !tailShadow ||
      !tailStart ||
      !burst
    ) {
      return;
    }

    let currentX = 0;
    let currentY = 0;
    let visible = false;

    // =================================
    // SMOOTH CURSOR MOVEMENT
    // =================================

    const updateCursor = () => {
      currentX += (mouse.current.x - currentX) * 0.22;
      currentY += (mouse.current.y - currentY) * 0.22;

      cursor.style.transform =
        `translate3d(${currentX}px, ${currentY}px, 0)`;

      animationFrame.current = requestAnimationFrame(updateCursor);
    };

    // =================================
    // CATMULL-ROM CURVE INTERPOLATION
    // =================================

    const getSmoothPoints = (inputPoints) => {
      if (inputPoints.length < 2) return [];

      const result = [];
      const segments = 5;

      for (let i = 0; i < inputPoints.length - 1; i++) {
        const p0 = inputPoints[Math.max(0, i - 1)];
        const p1 = inputPoints[i];
        const p2 = inputPoints[i + 1];
        const p3 =
          inputPoints[Math.min(inputPoints.length - 1, i + 2)];

        for (let j = 0; j < segments; j++) {
          const t = j / segments;
          const t2 = t * t;
          const t3 = t2 * t;

          const x =
            0.5 *
            (
              2 * p1.x +
              (-p0.x + p2.x) * t +
              (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
              (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
            );

          const y =
            0.5 *
            (
              2 * p1.y +
              (-p0.y + p2.y) * t +
              (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
              (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
            );

          result.push({ x, y });
        }
      }

      const last = inputPoints[inputPoints.length - 1];
      result.push(last);

      return result;
    };

    // =================================
    // VARIABLE-WIDTH LIQUID SHAPE
    // =================================

    const createLiquidPath = (inputPoints) => {
      if (inputPoints.length < 2) return "";

      const smoothPoints = getSmoothPoints(inputPoints);

      if (smoothPoints.length < 2) return "";

      const leftSide = [];
      const rightSide = [];

      const total = smoothPoints.length - 1;

      smoothPoints.forEach((point, index) => {
        const previous =
          smoothPoints[Math.max(0, index - 1)];

        const next =
          smoothPoints[Math.min(total, index + 1)];

        const dx = next.x - previous.x;
        const dy = next.y - previous.y;

        const length = Math.sqrt(dx * dx + dy * dy) || 1;

        // Perpendicular direction
        const normalX = -dy / length;
        const normalY = dx / length;

        const progress = index / total;

        // Wider near cursor, gradually thinner at tail end
        const radius =
          5.8 * Math.pow(1 - progress, 1.35);

        leftSide.push({
          x: point.x + normalX * radius,
          y: point.y + normalY * radius,
        });

        rightSide.push({
          x: point.x - normalX * radius,
          y: point.y - normalY * radius,
        });
      });

      // Build a closed liquid shape
      let path = `M ${leftSide[0].x} ${leftSide[0].y}`;

      for (let i = 1; i < leftSide.length; i++) {
        path += ` L ${leftSide[i].x} ${leftSide[i].y}`;
      }

      for (let i = rightSide.length - 1; i >= 0; i--) {
        path += ` L ${rightSide[i].x} ${rightSide[i].y}`;
      }

      path += " Z";

      return path;
    };

    // =================================
    // RENDER LIQUID TAIL
    // =================================

    const renderTail = () => {
      if (points.current.length < 2) return;

      const path = createLiquidPath(points.current);

      tailPath.setAttribute("d", path);
      tailShadow.setAttribute("d", path);

      // Rounded water bulb at cursor end
      tailStart.setAttribute("cx", points.current[0].x);
      tailStart.setAttribute("cy", points.current[0].y);
    };

    // =================================
    // MOUSE MOVE
    // =================================

    const handleMouseMove = (event) => {
      mouse.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (!visible) {
        currentX = event.clientX;
        currentY = event.clientY;

        visible = true;
        cursor.classList.add("cursor-visible");
      }

      points.current.unshift({
        x: event.clientX,
        y: event.clientY,
      });

      if (points.current.length > 24) {
        points.current.pop();
      }

      tail.classList.add("tail-visible");

      renderTail();

      clearTimeout(hideTimeout.current);

      hideTimeout.current = setTimeout(() => {
        tail.classList.remove("tail-visible");

        points.current = [];

        tailPath.setAttribute("d", "");
        tailShadow.setAttribute("d", "");
      }, 130);
    };

    // =================================
    // MOUSE CLICK
    // =================================

    const handleMouseDown = () => {
      ring.classList.add("cursor-clicking");
      dot.classList.add("dot-clicking");

      burst.style.left = `${mouse.current.x - 30}px`;
      burst.style.top = `${mouse.current.y - 15}px`;

      burst.classList.remove("snake-splitting");

      // Restart animation on every click
      void burst.offsetWidth;

      burst.classList.add("snake-splitting");

      clearTimeout(clickTimeout.current);

      clickTimeout.current = setTimeout(() => {
        ring.classList.remove("cursor-clicking");
        dot.classList.remove("dot-clicking");
      }, 180);
    };

    const handleMouseUp = () => {
      ring.classList.remove("cursor-clicking");
      dot.classList.remove("dot-clicking");
    };

    // =================================
    // HOVER EFFECT
    // =================================

    const interactiveSelector =
      "a, button, input, textarea, select, [role='button'], .cursor-pointer";

    const textSelector =
      "p, span, h1, h2, h3, h4, h5, h6, label, [contenteditable='true']";

    const handleMouseOver = (event) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      if (target.closest(interactiveSelector)) {
        cursor.classList.add("cursor-hover");
        cursor.classList.remove("cursor-text");
      } else if (target.closest(textSelector)) {
        cursor.classList.add("cursor-text");
        cursor.classList.remove("cursor-hover");
      } else {
        cursor.classList.remove("cursor-hover", "cursor-text");
      }
    };

    const handleMouseOut = (event) => {
      if (
        event.relatedTarget instanceof Element &&
        event.relatedTarget.closest(interactiveSelector)
      ) {
        return;
      }

      cursor.classList.remove("cursor-hover", "cursor-text");
    };

    // =================================
    // MOUSE LEAVE
    // =================================

    const handleMouseLeave = () => {
      cursor.classList.remove(
        "cursor-visible",
        "cursor-hover",
        "cursor-text"
      );

      tail.classList.remove("tail-visible");

      points.current = [];

      tailPath.setAttribute("d", "");
      tailShadow.setAttribute("d", "");

      visible = false;
    };

    // =================================
    // EVENT LISTENERS
    // =================================

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    document.addEventListener("mouseleave", handleMouseLeave);

    animationFrame.current = requestAnimationFrame(updateCursor);

    // =================================
    // CLEANUP
    // =================================

    return () => {
      cancelAnimationFrame(animationFrame.current);

      clearTimeout(hideTimeout.current);
      clearTimeout(clickTimeout.current);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);

      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* =================================
          LIQUID WATER TRAIL
      ================================= */}

      <svg
        ref={tailRef}
        className="cursor-tail"
        aria-hidden="true"
      >
        <defs>
          {/* Soft liquid glow */}
          <filter
            id="liquid-tail-glow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="7" />
          </filter>

          {/* Main neon glow */}
          <filter
            id="liquid-tail-neon"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* Blurred liquid shadow */}
        <path
          ref={tailShadowRef}
          className="tail-shadow"
          filter="url(#liquid-tail-glow)"
        />

        {/* Main variable-width liquid shape */}
        <path
          ref={tailPathRef}
          className="tail-main"
        />

        {/* Rounded water bulb */}
        <circle
          ref={tailStartRef}
          className="tail-start"
          r="5.8"
          filter="url(#liquid-tail-neon)"
        />
      </svg>

      {/* =================================
          MAIN CUSTOM CURSOR
      ================================= */}

      <div
        ref={cursorRef}
        className="custom-cursor"
      >
        <div
          ref={ringRef}
          className="cursor-ring"
        />

        <div
          ref={dotRef}
          className="cursor-dot"
        />
      </div>

      {/* =================================
          SNAKE SPLITTING CLICK EFFECT
      ================================= */}

      <div
        ref={burstRef}
        className="cursor-burst"
        aria-hidden="true"
      >
        {Array.from({ length: 8 }, (_, index) => (
          <svg
            key={index}
            className={`snake-piece piece-${index + 1}`}
            viewBox="0 0 60 30"
          >
            <path d="M 2 15 Q 15 0 30 15 T 58 15" />
          </svg>
        ))}
      </div>
    </>
  );
};

export default CustomCursor;
