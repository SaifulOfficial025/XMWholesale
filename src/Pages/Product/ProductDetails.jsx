import React, { useState } from "react";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import { FaArrowRight } from "react-icons/fa6";

const images = [
  "/categorydummyimg.png",
  "/categorydummyimg.png",
  "/categorydummyimg.png",
];

function ProductDetails() {
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <section>
      <div className="bg-black py-8">
        <Header />
      </div>
      <div className="bg-white min-h-screen py-8 px-2 md:px-8">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto w-full  flex items-center justify-between mb-2">
          <nav className="text-xs text-gray-500  gap-1 flex items-center justify-center">
            <span>Product</span>
            <FaArrowRight className=" justify-center" />
            <span>Product Details</span>
          </nav>
          <hr className="my-4" />
        </div>
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Image Gallery */}
          <div>
            <div className="rounded-xl overflow-hidden bg-gray-100 mb-4 aspect-[4/3] w-full">
              <img
                src={images[selectedImg]}
                alt="Product"
                className="object-cover w-full h-full"
                draggable="false"
              />
            </div>
            <div className="flex gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(idx)}
                  className={`rounded-lg overflow-hidden border-2 aspect-square w-20 h-20 ${
                    selectedImg === idx
                      ? "border-[#c0121a]"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt="thumb"
                    className="object-cover w-full h-full"
                    draggable="false"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold mt-2 mb-2">
              [KH-16-E] GLASS RACK EXTENDER, 4 X4 COMPARTMENT
            </h1>
            <div className="text-2xl font-bold text-gray-900 mb-2">$120</div>
            <p className="text-gray-600 text-sm mb-2">
              Lorem ipsum dolor sit amet consectetur. Ipsum volutpat tellus eget
              integer tincidunt risus eu amet eleifend.Lorem ipsum dolor sit
              amet consectetur. Ipsum volutpat tellus eget integer tincidunt
              risus eu amet eleifend.
            </p>
            <div className=" gap-8 mb-2">
              <div className="text-sm text-gray-700">
                <span className="font-semibold">1 Box:</span>{" "}
                <span className="text-black font-semibold">25 item</span>
              </div>
              <div className="text-sm text-gray-700 mt-2">
                <span className="font-semibold">SKU:</span>{" "}
                <span className="text-black font-semibold">
                  UPC # 682353000151
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-base font-medium">Quantity:</span>
              <div className="flex items-center border rounded">
                <button
                  className="px-3 py-1 text-lg text-gray-700 hover:bg-gray-100"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="px-4 py-1 text-lg">{quantity}</span>
                <button
                  className="px-3 py-1 text-lg text-gray-700 hover:bg-gray-100"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
              <span className="ml-2 text-base font-medium">Boxes</span>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="bg-black text-white font-semibold px-7 py-3  shadow hover:bg-gray-800 transition">
                ADD TO CART
              </button>
              <button className="bg-[#c0121a] text-white font-semibold px-7 py-3  shadow hover:bg-[#a70c17] transition">
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-44">
        <Footer />
      </div>
    </section>
  );
}

export default ProductDetails;
