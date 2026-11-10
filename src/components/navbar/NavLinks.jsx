
import React from 'react';

// Import navigation links configuration
import navbarLinks from "../../data/navbar/NavLinks";

const NavLinks = () => {
  const { title, links } = navbarLinks;

  return (
    <>
      <style>{`
        @keyframes navSlideFromTop {
          from {
            opacity: 0;
            transform: translateY(-60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .nav-entrance-item {
          animation-name: navSlideFromTop;
          animation-duration: 2000ms;
          animation-timing-function: ease-out;
          animation-fill-mode: both;
        }
      `}</style>

      <nav
        aria-label={title}
        className="flex items-center justify-center"
      >
        <ul className="flex items-center gap-2 lg:gap-3">
          {links.map((link, index) => (
            <li
              key={link.id}
              className="nav-entrance-item"
              style={{
                animationDelay: `${index * 200}ms`,
              }}
            >
              <a
                href={link.path}
                className="
                  group relative inline-flex items-center
                  rounded-lg px-3 py-2
                  text-base font-bold uppercase
                  transition-colors duration-300
                  hover:text-blue-600
                  dark:hover:text-blue-400
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-blue-500
                "
              >
                {link.name}

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
