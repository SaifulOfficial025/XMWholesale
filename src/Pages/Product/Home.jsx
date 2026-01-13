import React from "react";
import Sidebar from "./Sidebar";
import ProductCard from "./ProductCard";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";

const products = Array(12).fill({
  title: "Monica Diara Party Dress",
  code: "Cf454t54",
  quantity: "24/120 ml",
  img: "/categorydummyimg.png",
});

const filters = ["All", "soap", "shampoo", "body lotion"];

function Home() {
  return (
    <section>
      <div className="bg-black py-8">
        <Header />
      </div>

      <div className="bg-white min-h-screen py-8 px-2 md:px-8 ">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/5 w-full">
            <Sidebar />
          </div>
          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="flex-1 flex items-center gap-2 mb-3">
              <input
                type="text"
                placeholder="Search Keywords..."
                className="max-w-5xl w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c0121a] bg-white text-gray-700"
              />
              {/* <button className="text-sm font-semibold text-white px-2 py-1 bg-red-600  hover:bg-red-700">
                SEARCH HERE
              </button> */}
            </div>
            {/* Filter Bar */}
            <div className="flex gap-2 flex-wrap mb-6">
              {filters.map((filter, idx) => (
                <button
                  key={filter}
                  className={`px-4 py-1 rounded-full border text-sm font-medium ${
                    idx === 0
                      ? "bg-[#c0121a] text-white border-[#c0121a]"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
              {products.map((product, idx) => (
                <ProductCard key={idx} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center gap-2 mt-10">
              <button className="px-3 py-2 rounded border border-gray-300 bg-red-100 text-gray-500 text-sm">
                &lt; &lt;
              </button>
              {[1, 2, 3, 4].map((num, idx) => (
                <button
                  key={num}
                  className={`px-3 py-2 rounded border text-sm font-semibold ${
                    num === 1
                      ? "bg-[#c0121a] text-white border-[#c0121a]"
                      : "bg-red-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {`0${num}`}
                </button>
              ))}
              <button className="px-3 py-2 rounded border border-gray-300 bg-red-100 text-gray-500 text-sm">
                &gt; &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Home;
