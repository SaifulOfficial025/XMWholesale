import React from "react";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";

function About() {
  return (
    <section>
      <div className="bg-black py-8">
        <Header />
      </div>

      <div className="bg-white min-h-screen py-10 px-2 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* About Us Title */}
          <h1 className="text-6xl font-bold text-[#c0121a] text-center mb-1">
            About Us
          </h1>
          <div className="text-center text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
            At Prospectus, we believe that finding the perfect home is more than
            just a transaction — it’s about the people and the community that
            make a house a home.
          </div>

          {/* Our Story Section */}
          <div className="flex flex-col md:flex-row items-center gap-16 mb-20 md:px-8 lg:px-16">
            <div className="flex-[1.2] flex justify-center">
              <div className="rounded-2xl flex items-center justify-center w-full ">
                <img
                  src="/about.png"
                  alt="Building"
                  className="object-cover w-full h-full rounded-2xl"
                />
              </div>
            </div>
            <div className="flex-[1.5]">
              <h2 className="text-4xl font-extrabold mb-6 text-[#c0121a]">
                Our Story
              </h2>
              <div className="text-gray-700 text-xl leading-relaxed mb-5">
                Founded in 2005, XM Design began as a family-owned wholesale
                business with a clear vision: to create high-quality,
                market-ready consumer products that deliver real value at
                retail. Based in Laval, Canada, we have grown steadily over
                nearly two decades by focusing on strong partnerships, hands-on
                leadership, and a deep understanding of the retail landscape.
              </div>
              <div className="text-gray-700 text-lg leading-relaxed">
                What started as a small operation has evolved into a trusted
                wholesale partner serving retailers across Canada and the United
                States. Throughout our growth, we have remained true to our
                roots — combining creativity, reliability, and long-term
                thinking to support our customers in an ever-changing market.
              </div>
            </div>
          </div>

          {/* Our Vision Section */}
          <div className="mb-2">
            <h2 className="text-4xl font-bold mb-1">Our Vision</h2>
            <div className="text-lg text-gray-500 mb-8">
              Our mission is to create and deliver innovative, market-ready
              products that help our retail partners succeed.
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="rounded-xl p-6 shadow-sm relative overflow-hidden"
              style={{
                backgroundImage: "url(/ourvisioncardbg.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-white/40"></div>
              <div className="relative z-10">
                <h3 className="font-semibold text-2xl mb-2 text-black">
                  Flexible Solutions
                </h3>
                <div className="text-gray-700 text-lg">
                  Offering flexible private label solutions and trusted licensed
                  programs tailored to meet diverse retail needs.
                </div>
              </div>
            </div>
            <div
              className="rounded-xl p-6 shadow-sm relative overflow-hidden"
              style={{
                backgroundImage: "url(/ourvisioncardbg.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-white/40"></div>
              <div className="relative z-10">
                <h3 className="font-semibold text-2xl mb-2 text-black">
                  Ethical Sourcing
                </h3>
                <div className="text-gray-700 text-lg">
                  Maintaining ethical sourcing practices, rigorous quality
                  control, and competitive pricing across all product lines.
                </div>
              </div>
            </div>
            <div
              className="rounded-xl p-6 shadow-sm relative overflow-hidden"
              style={{
                backgroundImage: "url(/ourvisioncardbg.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-white/40"></div>
              <div className="relative z-10">
                <h3 className="font-semibold text-2xl mb-2 text-black">
                  Quality & Innovation
                </h3>
                <div className="text-gray-700 text-lg">
                  Developing on-trend, high-quality private label and licensed
                  products across fashion and health & beauty to drive retail
                  success.
                </div>
              </div>
            </div>
            <div
              className="rounded-xl p-6 shadow-sm relative overflow-hidden"
              style={{
                backgroundImage: "url(/ourvisioncardbg.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-white/40"></div>
              <div className="relative z-10">
                <h3 className="font-semibold text-2xl mb-2 text-black">
                  Partnership Excellence
                </h3>
                <div className="text-gray-700 text-lg">
                  Providing exceptional service, reliability, and collaboration
                  to build lasting partnerships with our retail customers.
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
