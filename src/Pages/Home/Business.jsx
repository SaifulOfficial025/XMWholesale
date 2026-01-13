import React from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

function Business() {
  return (
    <div className="bg-[#9f0712] max-w-7xl mx-auto rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between mt-16 mb-16">
      <div className="mb-4 md:mb-0">
        <h2 className="text-white text-xl md:text-2xl font-bold mb-2">
          Let’s Talk Business
        </h2>
        <p className="text-white text-sm md:text-base opacity-90 max-w-md">
          Ready to elevate your inventory? Start a conversation
          <br className="hidden md:block" /> with our wholesale team today.
        </p>
      </div>
      <Link to="/contact">
        <button className="bg-white text-[#9f0712] font-semibold px-6 py-2  shadow text-sm md:text-base flex items-center gap-2 hover:bg-gray-100 transition">
          CONTACT US
          <IoMdArrowRoundForward className="h-5 w-5" />
        </button>
      </Link>
    </div>
  );
}

export default Business;
