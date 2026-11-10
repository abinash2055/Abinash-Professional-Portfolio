
import React from "react";
import { ArrowUpRight } from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import socialsData from "../../data/footer/Social";

const socialIcons = {
  Github: FaGithub,
  Linkedin: FaLinkedinIn,
  Instagram: FaInstagram,
  Twitter: FaXTwitter,
};

const FooterSocials = () => {
  return (
    <div>
      <h3 className="mb-5 text-sm font-semibold text-gray-900">
        {socialsData.title}
      </h3>

      <ul className="space-y-4">
        {socialsData.links.map((social, index) => {
          const Icon = socialIcons[social.icon];

          return (
            <li key={index}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-sm text-gray-500 transition-colors hover:text-black"
              >
                {Icon && <Icon size={16} />}

                {social.name}

                <ArrowUpRight
                  size={12}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterSocials;