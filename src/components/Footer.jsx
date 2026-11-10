
import { Link } from "react-router-dom";

import CopyRight from "./footer/CopyRight";

// Footer Sections
import FooterCTA from "./footer/FooterCTA";
import FooterBrand from "./footer/FooterBrand";
import FooterNavigation from "./footer/FooterNavigation";
import FooterSocials from "./footer/FooterSocials";
import FooterConnect from "./footer/FooterConnect";
import FooterBottom from "./footer/FooterBottom";


const Footer = () => {
  return (
    <>
      <footer className="w-full px-4 pb-5 pt-10 sm:px-6 lg:px-10">

        {/* Main Footer Container */}
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-gray-200 bg-[#f8f9fa] px-6 py-10 shadow-sm sm:px-10 lg:px-12">

          {/* CTA Section */}
          <FooterCTA />

          {/* Footer Sections */}
          <div className="grid grid-cols-1 gap-10 border-b border-gray-200 pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

            <FooterBrand />

            <FooterNavigation />

            <FooterSocials />

            <FooterConnect />

          </div>

          {/* Bottom Section */}
          <FooterBottom />

        </div>

      </footer>
    </>

  );
};

export default Footer;
