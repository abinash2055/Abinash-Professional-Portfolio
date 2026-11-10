
import { Link } from "react-router-dom";

import CopyRight from "./footer/CopyRight";

const Footer = () => {
  return (
    <footer className="w-full">

      {/* Copyright and Legal Navigation */}
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 border-t border-gray-200 px-5 py-6 dark:border-gray-800 sm:flex-row sm:px-8 lg:px-12">

        {/* Copyright */}
        <CopyRight />

        {/* Legal Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-5 text-sm">

          <Link
            to="/terms-and-conditions">
            Terms & Conditions
          </Link>

          <Link
            to="/privacy-policy">
            Privacy Policy
          </Link>

          <Link
            to="/disclaimer">
            Disclaimer
          </Link>

        </nav>

      </div>

    </footer>
  );
};

export default Footer;
