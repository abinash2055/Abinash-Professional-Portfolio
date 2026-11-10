
import React from "react";

import {
  ArrowRight,
  Mail,
} from "lucide-react";

import connectData from "../../data/footer/Connect";

const FooterConnect = () => {
  return (
    <div>

      <h3 className="mb-5 text-sm font-semibold text-gray-900">
        {connectData.title}
      </h3>

      <p className="mb-5 text-sm leading-6 text-gray-500">
        {connectData.description}
      </p>

      <a
        href={`mailto:${connectData.email}`}
        className="flex items-center gap-3 rounded-full border border-gray-200 bg-white p-2 pl-4 transition-all hover:border-black"
      >

        <Mail size={15} className="text-gray-500" />

        <span className="flex-1 truncate text-xs text-gray-500">
          {connectData.email}
        </span>

        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
          <ArrowRight size={16} />
        </span>

      </a>

      <p className="mt-4 flex items-center gap-2 text-xs text-gray-500">

        <span className="h-2 w-2 rounded-full bg-green-500" />

        {connectData.availability}

      </p>

    </div>
  );
};

export default FooterConnect;
