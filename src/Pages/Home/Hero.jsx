import React from "react";
import { useTranslation } from "react-i18next";

function Hero() {
  const { t } = useTranslation();
  return (
    <section
      className="w-11/12 md:w-3/4 lg:w-2/3 mx-auto h-56 md:h-72 lg:h-96 bg-cover bg-center relative flex items-center justify-center rounded-lg overflow-hidden"
      style={{
        backgroundImage: "url(/herobg.png)",
      }}
    >
      <div className="absolute inset-0"></div>

      <div className="relative z-10 w-full max-w-3xl mx-auto text-center px-6 py-12">
        <div className="mt-0">
          <a
            href="/products"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 shadow"
          >
            {t("hero_and_banners.see_all_products")}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
