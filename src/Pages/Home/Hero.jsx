import React from "react";
import { useTranslation } from "react-i18next";

function Hero() {
  const { t } = useTranslation();
  return (
    <section
      className="min-h-screen bg-cover bg-center relative flex items-center"
      // style={{ backgroundImage: "url(/herobg.png)" }}
    >
      <div className="absolute inset-0"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-6 py-24">
        {/* <h1 className="text-white font-extrabold tracking-tight text-[8rem] leading-[1] md:text-[12rem]">
          XM
        </h1>
        <div className="text-red-500 text-4xl font-bold -mt-2">Wholesale</div> */}

        <div className="mt-10">
          <a
            href="/products"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 shadow mt-96"
          >
            {t("hero_and_banners.see_all_products")}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
