import { useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import navbarLinks from "../../data/navbar/NavLinks";

/**
 * Props
 *  - orientation: "horizontal" (desktop bar) or "vertical" (mobile menu)
 *  - showTitle:   show the "Explore" heading, useful in the mobile menu
 *  - onNavigate:  called after a link is clicked, e.g. to close the mobile menu
 */
export default function NavLinks({ orientation = "horizontal", showTitle = false, onNavigate }) {
  const { title, links, animation } = navbarLinks;
  const [active, setActive] = useState(links[0]?.path);
  const pillId = useId();
  const vertical = orientation === "vertical";
  const animated = animation?.enabled;

  // Highlight the link whose section is currently in the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach(({ path }) => {
      const el = document.getElementById(path.replace("#", ""));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [links]);

  const handleClick = (e, path) => {
    const target = document.querySelector(path);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      setActive(path);
    }
    onNavigate?.();
  };

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: animation?.stagger ?? 0.08 } },
  };
  const item = {
    hidden: animated ? { opacity: 0, ...(vertical ? { x: -16 } : { y: -10 }) } : {},
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: animation?.duration ?? 0.3, ease: "easeOut" },
    },
  };

  return (
    <nav aria-label={title}>
      {showTitle && (
        <p
          style={{
            margin: "0 0 10px 14px",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-secondary, #64748B)",
          }}
        >
          {title}
        </p>
      )}
      <motion.ul
        variants={container}
        initial="hidden"
        animate="visible"
        style={{
          display: "flex",
          flexDirection: vertical ? "column" : "row",
          alignItems: vertical ? "stretch" : "center",
          gap: vertical ? 4 : 2,
          margin: 0,
          padding: 0,
          listStyle: "none",
        }}
      >
        {links.map(({ id, name, path }) => {
          const isActive = active === path;
          return (
            <motion.li key={id} variants={item} style={{ position: "relative" }}>
              <a
                href={path}
                onClick={(e) => handleClick(e, path)}
                aria-current={isActive ? "location" : undefined}
                style={{
                  position: "relative",
                  display: "block",
                  padding: vertical ? "12px 14px" : "8px 14px",
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  textDecoration: "none",
                  color: isActive
                    ? "var(--accent, #4338CA)"
                    : "var(--text-secondary, #64748B)",
                  transition: "color 0.25s ease",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId={`nav-pill-${pillId}`}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 999,
                      background: "var(--glow, rgba(129,140,248,0.25))",
                      zIndex: 0,
                    }}
                  />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{name}</span>
              </a>
            </motion.li>
          );
        })}
      </motion.ul>
    </nav>
  );
}