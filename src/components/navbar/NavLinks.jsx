
// import { useEffect, useId, useState } from "react";
// import { motion } from "framer-motion";
// import navbarLinks from "../../data/navbar/NavLinks";

// export default function NavLinks({ orientation = "horizontal", showTitle = false, onNavigate }) {
//   const { title, links, animation } = navbarLinks;
//   const [active, setActive] = useState(links[0]?.path);
//   const pillId = useId();
//   const vertical = orientation === "vertical";
//   const animated = animation?.enabled;

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) setActive(`#${entry.target.id}`);
//         });
//       },
//       { rootMargin: "-45% 0px -50% 0px" }
//     );

//     links.forEach(({ path }) => {
//       const el = document.getElementById(path.replace("#", ""));
//       if (el) observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, [links]);

//   const handleClick = (e, path) => {
//     const target = document.querySelector(path);
//     if (target) {
//       e.preventDefault();
//       target.scrollIntoView({ behavior: "smooth" });
//       setActive(path);
//     }
//     onNavigate?.();
//   };

//   const container = {
//     hidden: {},
//     visible: {
//       transition: { staggerChildren: animation?.stagger ?? 0.08 },
//     },
//   };

//   const item = {
//     hidden: animated
//       ? { opacity: 0, ...(vertical ? { x: -16 } : { y: -10 }) }
//       : {},
//     visible: {
//       opacity: 1,
//       x: 0,
//       y: 0,
//       transition: {
//         duration: animation?.duration ?? 0.3,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <nav aria-label={title}>
//       {showTitle && (
//         <p
//           style={{
//             margin: "0 0 10px 14px",
//             fontSize: 13,
//             fontWeight: 600,
//             color: "var(--text-secondary, #64748B)",
//           }}
//         >
//           {title}
//         </p>
//       )}

//       <motion.ul
//         variants={container}
//         initial="hidden"
//         animate="visible"
//         style={{
//           display: "flex",
//           flexDirection: vertical ? "column" : "row",
//           alignItems: vertical ? "stretch" : "center",
//           gap: vertical ? 4 : 2,
//           margin: 0,
//           padding: 0,
//           listStyle: "none",
//         }}
//       >
//         {links.map(({ id, name, path }) => {
//           const isActive = active === path;

//           return (
//             <motion.li
//               key={id}
//               variants={item}
//               whileHover={{
//                 y: -5,
//                 scale: 1.1,
//                 transition: {
//                   duration: 0.22,
//                   ease: "easeOut",
//                 },
//               }}
//               whileTap={{ scale: 0.96 }}
//               style={{
//                 position: "relative",
//                 transformOrigin: "center",
//               }}
//             >
//               <a
//                 href={path}
//                 onClick={(e) => handleClick(e, path)}
//                 aria-current={isActive ? "location" : undefined}
//                 className="nav-link"
//                 style={{
//                   position: "relative",
//                   display: "block",
//                   padding: vertical ? "12px 14px" : "10px 14px",
//                   borderRadius: 999,
//                   fontSize: 16,
//                   fontWeight: 700,
//                   textTransform: "uppercase",
//                   letterSpacing: "0.5px",
//                   textDecoration: "none",
//                   color: isActive
//                     ? "var(--accent, #4338CA)"
//                     : "var(--text, #111827)",
//                   transition: "color 0.25s ease",
//                 }}
//               >
//                 {isActive && (
//                   <motion.span
//                     layoutId={`nav-pill-${pillId}`}
//                     transition={{
//                       type: "spring",
//                       stiffness: 380,
//                       damping: 32,
//                     }}
//                     style={{
//                       position: "absolute",
//                       inset: 0,
//                       borderRadius: 999,
//                       background: "var(--glow, rgba(129,140,248,0.25))",
//                       zIndex: 0,
//                     }}
//                   />
//                 )}

//                 <span
//                   className="nav-link-text"
//                   style={{
//                     position: "relative",
//                     zIndex: 1,
//                     display: "inline-block"
//                   }}
//                 >
//                   {name}
//                 </span>
//               </a>
//             </motion.li>
//           );
//         })}
//       </motion.ul>
//     </nav>
//   );
// }


import { useId, useState } from "react";
import { motion } from "framer-motion";
import navbarLinks from "../../data/navbar/NavLinks";

export default function NavLinks({
  orientation = "horizontal",
  showTitle = false,
  onNavigate,
}) {
  const { title, links, animation } = navbarLinks;

  const [active, setActive] = useState(links[0]?.path);

  const pillId = useId();

  const vertical = orientation === "vertical";
  const animated = animation?.enabled;

  // Change active link only when clicked
  const handleClick = (e, path) => {
    const target = document.querySelector(path);

    if (target) {
      e.preventDefault();

      setActive(path);

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    onNavigate?.();
  };

  // Parent animation
  const container = {
    hidden: {},

    visible: {
      transition: {
        staggerChildren: animation?.stagger ?? 0.08,
      },
    },
  };

  // Individual link animation
  const item = {
    hidden: animated
      ? {
        opacity: 0,
        ...(vertical ? { x: -16 } : { y: -10 }),
      }
      : {},

    visible: {
      opacity: 1,
      x: 0,
      y: 0,

      transition: {
        duration: animation?.duration ?? 0.3,
        ease: "easeOut",
      },
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
            <motion.li
              key={id}
              variants={item}
              whileHover={{
                y: -5,
                scale: 1.1,
                transition: {
                  duration: 0.22,
                  ease: "easeOut",
                },
              }}
              whileTap={{
                scale: 0.96,
              }}
              style={{
                position: "relative",
                transformOrigin: "center",
              }}
            >
              <a
                href={path}
                onClick={(e) => handleClick(e, path)}
                aria-current={isActive ? "location" : undefined}
                className="nav-link"
                style={{
                  position: "relative",
                  display: "block",
                  padding: vertical ? "12px 14px" : "10px 14px",
                  borderRadius: 999,
                  fontSize: 16,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  textDecoration: "none",
                  color: isActive
                    ? "var(--nav-active-text, var(--accent, #4338CA))"
                    : "var(--text, #111827)",

                  transition: "color 0.25s ease",
                }}
              >
                {/* Active background pill */}
                {isActive && (
                  <motion.span
                    layoutId={`nav-pill-${pillId}`}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 999,
                      background:
                        "var(--glow, rgba(129,140,248,0.25))",
                      zIndex: 0,
                    }}
                  />
                )}

                {/* Navigation text */}
                <span
                  className="nav-link-text"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "inline-block",
                  }}
                >
                  {name}
                </span>
              </a>
            </motion.li>
          );
        })}
      </motion.ul>
    </nav>
  );
}

