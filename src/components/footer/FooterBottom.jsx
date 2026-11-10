
import React from "react";
import { ArrowUp } from "lucide-react";

import brandData from "../../data/footer/Brand";
import legalData from "../../data/footer/Legal";

const FooterBottom = () => {
  return (
    <div className="flex flex-col justify-between gap-5 pt-7 md:flex-row md:items-center">

      {/* Copyright */}
      <p className="text-xs leading-5 text-gray-500">
        © {new Date().getFullYear()} {brandData.name}.{" "}
        {legalData.copyright}
      </p>

      {/* Legal Links */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">

        {legalData.links.map((link, index) => (
          <a
            key={index}
            href={link.path}
            className="text-xs text-gray-500 transition-colors hover:text-black"
          >
            {link.name}
          </a>
        ))}

      </div>

      {/* Back To Top */}
      <a
        href="/#home"
        aria-label="Back to top"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all hover:bg-black hover:text-white"
      >
        <ArrowUp size={16} />
      </a>

    </div>
  );
};

export default FooterBottom;
