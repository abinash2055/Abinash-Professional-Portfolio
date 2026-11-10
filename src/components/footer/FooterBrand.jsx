
import React from "react";

import brandData from "../../data/footer/Brand";

const FooterBrand = () => {
  return (
    <div>

      <a
        href="/#home"
        className="inline-flex items-center gap-3"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl">
          <img
            src={brandData.logo}
            alt={brandData.logoAlt}
            className="h-full w-full object-contain"
          />
        </div>

        <span className="text-base font-semibold tracking-tight text-gray-900">
          {brandData.name}
        </span>
      </a>

      <h3 className="mt-5 text-sm font-semibold text-gray-800">
        {brandData.tagline}
      </h3>

      <p className="mt-3 max-w-xs text-sm leading-6 text-gray-500">
        {brandData.description}
      </p>

    </div>
  );
};

export default FooterBrand;
