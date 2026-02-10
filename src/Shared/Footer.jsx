import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#1a1817] text-white py-12 px-4 md:px-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo and Information (swapped: info moved under logo) */}
        <div className="flex flex-col gap-4">
          <img
            src="/xmlogo.png"
            alt="XM Wholesale"
            className="w-24 h-24 object-contain mb-2 -mt-4"
          />
          <div className="flex flex-col gap-2 -mt-7">
            {/* <span className="font-semibold text-base mb-1 underline underline-offset-2">
              {t("footer.info_title")}
            </span> */}
            <Link
              to="/"
              className="text-gray-300 text-sm hover:text-white transition"
            >
              {t("footer.link_home")}
            </Link>
            <Link
              to="/about"
              className="text-gray-300 text-sm hover:text-white transition"
            >
              {t("footer.link_about")}
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 text-sm hover:text-white transition"
            >
              {t("footer.link_contact_us")}
            </Link>
          </div>
        </div>

        {/* Head Office */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-base mb-1">
            {t("footer.head_office_title")}
          </span>
          <span className="text-gray-300 text-sm">
            {t("footer.address_line_1")}
          </span>
          <span className="text-gray-300 text-sm">
            {t("footer.address_line_2")}
          </span>
          <span className="text-gray-300 text-sm">
            {t("footer.address_city_zip")} H7I 5Z6
          </span>
          {/* <span className="text-gray-300 text-sm">
            {t("footer.address_country")}
          </span> */}
        </div>

        {/* Company Description (moved to third column) */}
        <div className="flex flex-col gap-4 md:items-end">
          <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
            {t("footer.company_desc")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
