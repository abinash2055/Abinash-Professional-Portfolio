
import React from 'react'

// Import navigation links configuration
import navbarLinks from "../../data/navbar/NavLinks";

const NavLinks = () => {

  // Extract navigation title and links
  const { title, links } = navbarLinks;

  return (
    <>
      {/* Navbar entrance animation CSS */}
      <style>
        {`
        @keyframes navbarSlideDown {
          0% {
            opacity: 0;
            transform: translateY(-40px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .navbar-entrance {
          opacity: 0;
          animation: navbarSlideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .navbar-entrance {
            animation: none;
            opacity: 1;
          }
        }
        `}
      </style>

      {/* NavLink Content  */}
      <nav
        aria-label={title}
        className="flex items-center justify-center"
      >
        {/* Navigation links */}
        <ul className="flex items-center gap-2 lg:gap-4">
          {links.map((link) => (
            <li key={link.id}>

              {/* Individual navigation link */}
              <a
                href={link.path}
                className="
                group relative inline-block
                rounded-lg px-3 py-2
                text-base font-bold uppercase
                transition-all duration-300 ease-in-out
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-blue-500
              "
              >
                {link.name}

                {/* Animated underline */}
                <span
                  className="
                  absolute bottom-1 left-3 right-3
                  h-0.5 origin-left scale-x-0
                  rounded-full bg-blue-500
                  transition-transform duration-300
                  group-hover:scale-x-100
                "
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavLinks;
