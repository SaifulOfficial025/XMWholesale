import React from "react";
import { Link } from "react-router-dom";

function ProductCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden max-w-xs mx-auto flex flex-col">
      <div className="aspect-[4/3] w-full bg-gray-100">
        <img
          src="/categorydummyimg.png"
          alt="Monica Diara Party Dress"
          className="object-cover w-full h-full"
          draggable="false"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg mb-2 text-gray-900">
          Monica Diara Party Dress
        </h3>
        <div className="mb-1 text-base">
          <span className="font-semibold text-gray-400">Code:</span>
          <span className="ml-2 text-black font-semibold">Cf454t54</span>
        </div>
        <div className="mb-4 text-base">
          <span className="font-semibold text-gray-400">Quantity:</span>
          <span className="ml-2 text-black font-semibold">24/120 ml</span>
        </div>
        <Link to="/checkout" className="w-full">
          <button className="w-full mt-auto bg-red-600 hover:bg-red-700 text-white font-semibold rounded border-2 py-2 text-base transition shadow-sm">
            ADD TO CART
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
