import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#1a1817] text-white py-12 px-4 md:px-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
        {/* Logo and Description */}
        <div className="flex flex-col gap-4">
          <img
            src="/xmlogo.png"
            alt="XM Wholesale"
            className="w-24 h-24 object-contain mb-2"
          />
          <p className="text-gray-300 text-sm leading-relaxed max-w-xs -mt-10">
            We are a B2B wholesale supplier specializing in health, beauty, and
            essential consumer products. Our platform is built to help retailers
            and distributors easily discover products, access transparent
            pricing, and build long-term business partnerships.
          </p>
        </div>

        {/* Head Office */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-base mb-1">Head Office</span>
          <span className="text-gray-300 text-sm">123 Business Street</span>
          <span className="text-gray-300 text-sm">Suite 400</span>
          <span className="text-gray-300 text-sm">Montreal, QC H3A 2B2</span>
          <span className="text-gray-300 text-sm">Canada</span>
        </div>

        {/* Information */}
        <div className="flex flex-col gap-2 md:items-end">
          <span className="font-semibold text-base mb-1 underline underline-offset-2">
            Information
          </span>
          <Link
            to="/"
            className="text-gray-300 text-sm hover:text-white transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-300 text-sm hover:text-white transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-300 text-sm hover:text-white transition"
          >
            Contact us
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
