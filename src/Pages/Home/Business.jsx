import React from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram } from "react-icons/fa";

function Business() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#9f0712] max-w-7xl lg:mx-auto md:mx-auto mx-6 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between mt-16 mb-16">
      <div className="mb-4 md:mb-0 text-center md:text-left">
        <h2 className="text-white text-xl md:text-2xl font-bold mb-2">
          {t("hero_and_banners.talk_business_title")}
        </h2>
        <p className="text-white text-sm md:text-base opacity-90 max-w-md mx-auto md:mx-0">
          {t("hero_and_banners.talk_business_desc")}
        </p>
        <div className="flex gap-4 text-4xl mt-5">
          <a
            href="https://www.facebook.com/profile.php?id=61588029932534"
            className="text-[#fff] hover:opacity-80"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/xmwholesale"
            className="text-[#fff] hover:opacity-80"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
      <Link to="/contact">
        <button className="bg-white text-[#9f0712] font-semibold px-6 py-2  shadow text-sm md:text-base flex items-center gap-2 hover:bg-gray-100 transition w-full md:w-auto justify-center mt-4 md:mt-0">
          {t("buttons.contact_us")}
          <IoMdArrowRoundForward className="h-5 w-5" />
        </button>
      </Link>
    </div>
  );
}

export default Business;
