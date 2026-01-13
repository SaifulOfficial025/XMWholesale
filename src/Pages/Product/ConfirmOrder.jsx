import React from "react";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import { FaArrowRight } from "react-icons/fa6";

function ConfirmOrder() {
  return (
    <section>
      <div className="bg-black py-8">
        <Header />
      </div>

      <div className="bg-white min-h-screen py-8 px-2 md:px-8">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto w-full mb-2">
          <nav className="text-xs text-gray-500  gap-1 flex items-center ">
            <span>Product</span>
            <FaArrowRight className=" justify-center" />
            <span>Product Details</span>
            <FaArrowRight className=" justify-center" />
            <span>Product Confirmation</span>
          </nav>
        </div>
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center md:items-start gap-6 border">
              <img
                src="/categorydummyimg.png"
                alt="Product"
                className="w-24 h-24 object-cover rounded-lg mb-4 md:mb-0"
                draggable="false"
              />
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
                  <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-0">
                    [KH-16-E] GLASS RACK EXTENDER,
                    <br className="md:hidden" /> 4 X4 COMPARTMENT
                  </h2>
                  <div className="text-2xl font-bold text-gray-900">$120</div>
                </div>
                <div className="mt-2 text-base">
                  <span className="font-semibold">Quantity:</span>
                  <span className="ml-2 font-bold text-lg">5</span>
                  <span className="ml-1 text-gray-700">Boxes</span>
                </div>
              </div>
            </div>
          </div>
          {/* Address & Summary */}
          <div>
            <div className="bg-white rounded-xl shadow p-6 border flex flex-col gap-4">
              <div className="text-center mb-2">
                <div className="font-medium text-gray-700 mb-2">
                  Please Add Your Address Before Order
                </div>
                <button className="bg-black text-white font-semibold px-6 py-2 rounded shadow hover:bg-gray-800 transition">
                  Add address
                </button>
              </div>
              <div className="flex flex-col gap-1 mb-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Subtotal</span>
                  <span className="font-semibold">$859</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">$859</span>
                </div>
              </div>
              <div className="text-xs text-gray-600 mb-2">
                * Delivery Charges Might Vary Depending On Product Size And
                Weight.
              </div>
              <button className="bg-[#c0121a] text-white font-semibold px-6 py-3 rounded shadow hover:bg-[#a70c17] transition mt-2">
                Confirm Order
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

export default ConfirmOrder;
