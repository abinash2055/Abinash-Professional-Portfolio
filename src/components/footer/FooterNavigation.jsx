
import React from "react";
import { ArrowUpRight } from "lucide-react";

import navigationData from "../../data/footer/Navigation";

const FooterNavigation = () => {
  return (
    <div>

      <h3 className="mb-5 text-sm font-semibold text-gray-900">
        {navigationData.title}
      </h3>

      <ul className="space-y-3">

        {navigationData.links.map((link, index) => (
          <li key={index}>

            <a
              href={link.path}
              className="group inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-black"
            >
              {link.name}

              <ArrowUpRight
                size={12}
                className="opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
              />

            </a>

          </li>
        ))}

      </ul>

    </div>
  );
};

export default FooterNavigation;
