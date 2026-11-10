
import React from "react";
import { ArrowUpRight } from "lucide-react";

import brandData from "../../data/footer/Brand";
import connectData from "../../data/footer/Connect";

const FooterCTA = () => {
  return (
    <div className="mb-14 flex flex-col items-start justify-between gap-8 rounded-2xl bg-white p-7 shadow-sm sm:p-10 md:flex-row md:items-center">

      {/* CTA Content */}
      <div className="max-w-xl">
        <span className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
          Have a project in mind?
        </span>

        <h2 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
          Let's Build Something
          <span className="text-gray-400"> Great Together.</span>
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
          {connectData.description}
        </p>

        <a
          href={`mailto:${connectData.email}`}
          className="mt-6 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg"
        >
          {connectData.buttonText}
          <ArrowUpRight size={16} />
        </a>
      </div>

      {/* Decorative Circle */}
      <div className="relative hidden h-40 w-40 shrink-0 items-center justify-center rounded-full border border-gray-100 md:flex">

        <div className="absolute h-28 w-28 rounded-full border border-gray-200" />

        <div className="absolute h-16 w-16 rounded-full border border-gray-200" />

        <div className="z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white">
          <img
            src={brandData.logo}
            alt={brandData.logoAlt}
            className="h-full w-full object-contain"
          />
        </div>

        <span className="absolute right-4 top-2 h-3 w-3 rounded-full bg-gray-400" />

        <span className="absolute bottom-4 left-2 h-3 w-3 rounded-full bg-black" />

        <span className="absolute bottom-3 right-5 h-2 w-2 rounded-full bg-gray-300" />

      </div>
    </div>
  );
};

export default FooterCTA;
