import React from "react";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();
  return (
    <section>
      <div className="bg-black py-8">
        <Header />
      </div>

      <div className="bg-white min-h-screen py-10 px-2 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* About Us Title */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#c0121a] text-center mb-1">
            {t("about.page_title")}
          </h1>
          <div className="text-center text-gray-500 text-sm sm:text-base md:text-lg mb-10 max-w-2xl mx-auto">
            {t("about.page_subtitle")}
          </div>

          {/* Our Story Section */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20 md:px-8 lg:px-16">
            <div className="flex-[1.2] flex justify-center">
              <div className="rounded-2xl flex items-center justify-center w-full ">
                <img
                  src="/about.png"
                  alt="Building"
                  className="object-cover w-full h-48 sm:h-64 md:h-full rounded-2xl"
                />
              </div>
            </div>
            <div className="flex-[1.5]">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-[#c0121a]">
                {t("about.our_story_title")}
              </h2>
              <div className="text-gray-700 text-sm sm:text-base md:text-xl leading-relaxed mb-5">
                {t("about.our_story_p1")}
              </div>
              <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                {t("about.our_story_p2")}
              </div>
            </div>
          </div>

          {/* Our Vision Section */}
          <div className="mb-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">
              {t("about.our_vision_title")}
            </h2>
            <div className="text-sm sm:text-base md:text-lg text-gray-500 mb-8">
              {t("about.our_vision_desc")}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div
              className="rounded-xl p-4 md:p-6 shadow-sm relative overflow-hidden"
              style={{
                backgroundImage: "url(/ourvisioncardbg.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-white/40"></div>
              <div className="relative z-10">
                <h3 className="font-semibold text-xl md:text-2xl mb-2 text-black">
                  {t("about.feature1_title")}
                </h3>
                <div className="text-gray-700 text-sm md:text-lg">
                  {t("about.feature1_desc")}
                </div>
              </div>
            </div>
            <div
              className="rounded-xl p-4 md:p-6 shadow-sm relative overflow-hidden"
              style={{
                backgroundImage: "url(/ourvisioncardbg.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-white/40"></div>
              <div className="relative z-10">
                <h3 className="font-semibold text-xl md:text-2xl mb-2 text-black">
                  {t("about.feature2_title")}
                </h3>
                <div className="text-gray-700 text-sm md:text-lg">
                  {t("about.feature2_desc")}
                </div>
              </div>
            </div>
            <div
              className="rounded-xl p-4 md:p-6 shadow-sm relative overflow-hidden"
              style={{
                backgroundImage: "url(/ourvisioncardbg.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-white/40"></div>
              <div className="relative z-10">
                <h3 className="font-semibold text-xl md:text-2xl mb-2 text-black">
                  {t("about.feature3_title")}
                </h3>
                <div className="text-gray-700 text-sm md:text-lg">
                  {t("about.feature3_desc")}
                </div>
              </div>
            </div>
            <div
              className="rounded-xl p-4 md:p-6 shadow-sm relative overflow-hidden"
              style={{
                backgroundImage: "url(/ourvisioncardbg.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-white/40"></div>
              <div className="relative z-10">
                <h3 className="font-semibold text-xl md:text-2xl mb-2 text-black">
                  {t("about.feature4_title")}
                </h3>
                <div className="text-gray-700 text-sm md:text-lg">
                  {t("about.feature4_desc")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default About;
